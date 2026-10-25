import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import YAML from "yaml";

import { envFlag } from "../packages/core/src/policy.mjs";
import { routeTask } from "../services/orchestrator/src/router.mjs";
import {
  assertBrokerOnlyCredentialBoundary,
  assertCodexHomeBoundary,
  assertDedicatedWorkerAccount,
  assertSafeWorkerResult,
  loadApprovedProjectRegistry,
  resolveApprovedProjectPath,
} from "./host-security.mjs";
import { CodexSubscriptionAdapter } from "./openai-codex/src/adapter.mjs";
import { selectOpenAIExecutionPolicy } from "./openai-codex/src/routing-policy.mjs";
import { ClaudeSubscriptionAdapter } from "./anthropic-claude/src/adapter.mjs";

const GIT_OUTPUT_MAX_BYTES = 1024 * 1024;
const CHANGED_FILE_MAX = 200;
const VERIFICATION_FILE_MAX_BYTES = 1024 * 1024;

function providerStatus(env = process.env) {
  return {
    openai: {
      available: true,
      subscriptionReady: envFlag("DEX_OPENAI_SUBSCRIPTION_READY", false, env),
    },
    anthropic: {
      available: true,
      subscriptionReady: envFlag("DEX_ANTHROPIC_SUBSCRIPTION_READY", false, env),
    },
  };
}

function git(cwd, args, spawnSyncImpl = spawnSync) {
  const result = spawnSyncImpl("git", args, {
    cwd,
    encoding: "utf8",
    windowsHide: true,
    shell: false,
    maxBuffer: GIT_OUTPUT_MAX_BYTES,
  });
  if (result?.status !== 0) throw new Error(`Worker Git evidence command failed: git ${args[0]}.`);
  return String(result.stdout ?? "");
}

function nulList(value) {
  return String(value ?? "").split("\0").filter(Boolean);
}

function runApprovedVerification(cwd, plan) {
  if (plan?.kind !== "file-sha256" || typeof plan.file !== "string") {
    throw new Error("Bounded mutation requires a host-approved verification plan.");
  }
  const startedAt = Date.now();
  const root = fs.realpathSync.native(cwd);
  const candidate = path.resolve(root, plan.file);
  const real = fs.realpathSync.native(candidate);
  const left = process.platform === "win32" ? candidate.toLowerCase() : candidate;
  const right = process.platform === "win32" ? real.toLowerCase() : real;
  if (left !== right) throw new Error("Host-approved verification file may not traverse a symlink or junction.");
  const relative = path.relative(root, real);
  if (!relative || relative === ".." || relative.startsWith(`..${path.sep}`) || path.isAbsolute(relative)) {
    throw new Error("Host-approved verification file escaped the approved project root.");
  }
  const stat = fs.lstatSync(real);
  if (!stat.isFile() || stat.isSymbolicLink() || stat.size > VERIFICATION_FILE_MAX_BYTES) {
    throw new Error("Host-approved verification file is invalid or oversized.");
  }
  const actualSha256 = crypto.createHash("sha256").update(fs.readFileSync(real)).digest("hex");
  const passed = crypto.timingSafeEqual(
    Buffer.from(actualSha256, "hex"),
    Buffer.from(plan.expectedSha256, "hex"),
  );
  const evidence = {
    kind: "file-sha256",
    status: passed ? "PASS" : "FAIL",
    exitCode: passed ? 0 : 1,
    durationMs: Math.max(0, Date.now() - startedAt),
    outputHash: actualSha256,
  };
  if (evidence.status !== "PASS") {
    throw new Error(`Host-approved verification failed with exit code ${evidence.exitCode}.`);
  }
  return evidence;
}

function workspaceSnapshot(cwd, baseSha = null, spawnSyncImpl = spawnSync, { requireHeadMatch = true } = {}) {
  const root = fs.realpathSync.native(git(cwd, ["rev-parse", "--show-toplevel"], spawnSyncImpl).trim());
  const expectedRoot = fs.realpathSync.native(cwd);
  const left = process.platform === "win32" ? root.toLowerCase() : root;
  const right = process.platform === "win32" ? expectedRoot.toLowerCase() : expectedRoot;
  if (left !== right) throw new Error("Approved project registry path must resolve to the Git worktree root.");

  const head = git(cwd, ["rev-parse", "HEAD"], spawnSyncImpl).trim();
  if (baseSha && requireHeadMatch && head !== baseSha) {
    throw new Error("Worker worktree HEAD does not match the broker-pinned base SHA.");
  }
  const branch = git(cwd, ["rev-parse", "--abbrev-ref", "HEAD"], spawnSyncImpl).trim();
  const status = git(cwd, ["status", "--porcelain=v1", "-z"], spawnSyncImpl);
  const diffBase = baseSha ?? head;
  const tracked = nulList(git(cwd, ["diff", "--name-only", "-z", diffBase], spawnSyncImpl));
  const untracked = nulList(git(cwd, ["ls-files", "--others", "--exclude-standard", "-z"], spawnSyncImpl));
  const changedFiles = [...new Set([...tracked, ...untracked])].sort();
  if (changedFiles.length > CHANGED_FILE_MAX) throw new Error("Worker changed-file evidence exceeds the bounded count.");
  const diff = git(cwd, ["diff", "--binary", "--no-ext-diff", diffBase], spawnSyncImpl);
  const commitCount = baseSha
    ? Number(git(cwd, ["rev-list", "--count", `${baseSha}..HEAD`], spawnSyncImpl).trim())
    : 0;
  if (!Number.isSafeInteger(commitCount) || commitCount < 0) throw new Error("Worker commit-count evidence is invalid.");

  return {
    head,
    branch,
    clean: status.length === 0,
    statusHash: crypto.createHash("sha256").update(status, "utf8").digest("hex"),
    diffHash: crypto.createHash("sha256").update(diff, "utf8").digest("hex"),
    changedFiles,
    commitCount,
  };
}

function validateWorkspacePreflight(task, before) {
  if (!before.clean) throw new Error("Worker worktree must be clean before bounded execution.");
  if (task?.constraints?.readOnly === true) return;
  const branch = String(task?.project?.worktreeBranch ?? "").trim();
  if (!branch || branch !== before.branch || new Set(["main", "master", "HEAD"]).has(branch)) {
    throw new Error("Bounded mutation requires a broker-pinned non-default project.worktreeBranch.");
  }
  const maximum = Number(task?.constraints?.maxChangedFiles ?? CHANGED_FILE_MAX);
  if (!Number.isSafeInteger(maximum) || maximum < 1 || maximum > CHANGED_FILE_MAX) {
    throw new Error("Task maxChangedFiles is invalid.");
  }
  const allowed = task?.constraints?.allowedChangedFiles;
  if (allowed !== undefined && (!Array.isArray(allowed) || allowed.length === 0
    || allowed.length > CHANGED_FILE_MAX
    || allowed.some(value => typeof value !== "string" || !value.trim()
      || /[:\x00-\x1f\x7f]/.test(value)
      || value.replaceAll("\\", "/").split("/").some(part => !part || part === "." || part === ".." || part.toLowerCase() === ".git")))) {
    throw new Error("Task allowedChangedFiles is invalid.");
  }
}

function validateWorkspaceOutcome(task, before, after) {
  const readOnly = task?.constraints?.readOnly === true;
  if (!before.clean) throw new Error("Worker worktree must be clean before bounded execution.");
  if (after.branch !== before.branch) throw new Error("Worker changed the approved worktree branch during execution.");
  if (readOnly) {
    if (before.head !== after.head || before.statusHash !== after.statusHash || !after.clean) {
      throw new Error("Read-only worker changed the approved worktree.");
    }
    return;
  }

  const expectedBranch = String(task?.project?.worktreeBranch ?? "").trim();
  if (!expectedBranch || expectedBranch !== before.branch || new Set(["main", "master", "HEAD"]).has(expectedBranch)) {
    throw new Error("Bounded mutation requires a broker-pinned non-default project.worktreeBranch.");
  }

  const maximum = Number(task?.constraints?.maxChangedFiles ?? CHANGED_FILE_MAX);
  if (!Number.isSafeInteger(maximum) || maximum < 1 || maximum > CHANGED_FILE_MAX) {
    throw new Error("Task maxChangedFiles is invalid.");
  }
  if (after.changedFiles.length > maximum) throw new Error("Worker changed more files than the Task permits.");
  if (after.changedFiles.length === 0) throw new Error("Bounded mutation must produce at least one changed file.");
  const allowed = task?.constraints?.allowedChangedFiles;
  if (allowed !== undefined) {
    if (!Array.isArray(allowed) || allowed.length === 0 || allowed.length > CHANGED_FILE_MAX) {
      throw new Error("Task allowedChangedFiles is invalid.");
    }
    const allowedSet = new Set(allowed.map(value => String(value).replaceAll("\\", "/")));
    for (const changed of after.changedFiles) {
      if (!allowedSet.has(changed.replaceAll("\\", "/"))) {
        throw new Error("Worker changed a file outside the Task allowlist.");
      }
    }
  }
  if (task?.constraints?.requireLocalCommit === true) {
    if (after.commitCount !== 1 || !after.clean) {
      throw new Error("Task requires exactly one clean local writer commit.");
    }
  }
}

function buildWorkerPrompt(task) {
  return [
    "Read AI_CONTRACT.md and the supplied Task Packet, then execute only the requested scope.",
    "Load only the minimum referenced files required for the current step; do not scan unrelated repository content.",
    "Reuse supplied evidence and canonical references. Do not refetch unchanged evidence or ask the user to repeat information already present.",
    "Run the narrowest deterministic checks first, then expand only when a failure requires it.",
    "Do not use paid API credentials or automatic paid fallback.",
    "Do not use GitHub CLI authentication, personal Git credentials, SSH credentials, or git push. Leave publication to the approved broker.",
    "Do not change files outside constraints.allowedChangedFiles when that allowlist is present.",
    YAML.stringify(task),
  ].join("\n\n");
}

export async function executeSubscriptionTask({
  task,
  env = process.env,
  approvalHandler = null,
  timeoutMs = 30 * 60_000,
  captureWorkspace = false,
  openaiAdapterFactory = options => new CodexSubscriptionAdapter(options),
  claudeAdapterFactory = () => new ClaudeSubscriptionAdapter(),
  spawnSyncImpl = spawnSync,
} = {}) {
  if (!task || typeof task !== "object" || Array.isArray(task)) throw new Error("Task Packet is required.");
  const route = routeTask(task, providerStatus(env));
  if (!route.selectedProvider) {
    throw new Error("No subscription worker is marked ready. Run the provider status command, then set the matching DEX_*_SUBSCRIPTION_READY flag only after it passes.");
  }
  if (captureWorkspace && route.selectedProvider !== "openai") {
    throw new Error("Bounded local bridge execution currently requires the OpenAI Codex subscription adapter.");
  }

  assertDedicatedWorkerAccount(env);
  assertBrokerOnlyCredentialBoundary({ env, spawnSyncImpl });
  const projectRegistry = loadApprovedProjectRegistry({ env });
  const cwd = resolveApprovedProjectPath(task, projectRegistry);
  const projectEntry = projectRegistry.projects[String(task?.project?.name ?? "").trim()];
  const baseSha = captureWorkspace ? String(task?.project?.baseSha ?? "").trim() : null;
  if (captureWorkspace && !/^[a-f0-9]{40}$/i.test(baseSha)) {
    throw new Error("Bounded bridge execution requires project.baseSha.");
  }
  const before = captureWorkspace ? workspaceSnapshot(cwd, baseSha, spawnSyncImpl) : null;
  const mutationVerification = captureWorkspace && task?.constraints?.readOnly !== true
    ? projectEntry?.verification
    : null;
  if (captureWorkspace && task?.constraints?.readOnly !== true && !mutationVerification) {
    throw new Error("Bounded mutation requires a verification plan in the SHA-pinned host registry.");
  }
  if (captureWorkspace) validateWorkspacePreflight(task, before);
  const prompt = buildWorkerPrompt(task);

  let adapter;
  let raw;
  let approval = { requested: 0, accepted: 0, declined: 0 };
  let verification = null;
  if (route.selectedProvider === "openai") {
    assertCodexHomeBoundary({ env });
    adapter = openaiAdapterFactory({ approvalHandler });
    const sandbox = task?.constraints?.readOnly === true ? "read-only" : "workspace-write";
    try {
      raw = await adapter.run({
        cwd,
        prompt,
        sandbox,
        timeoutMs,
        executionPolicySelector: providerContext => selectOpenAIExecutionPolicy(task, providerContext),
      });
      if (!raw?.executionPolicy) {
        throw new Error("OpenAI subscription adapter did not return the selected execution policy.");
      }
      raw.modelRouting = raw.executionPolicy;
      delete raw.executionPolicy;
      approval = adapter.approvalStats?.() ?? approval;
    } finally {
      adapter.close();
    }
  } else {
    adapter = claudeAdapterFactory();
    try { raw = await adapter.run({ cwd, prompt }); }
    finally { adapter.close?.(); }
  }

  const after = captureWorkspace
    ? workspaceSnapshot(cwd, baseSha, spawnSyncImpl, { requireHeadMatch: false })
    : null;
  if (captureWorkspace) validateWorkspaceOutcome(task, before, after);
  if (mutationVerification) {
    verification = runApprovedVerification(cwd, mutationVerification);
  }
  const result = {
    ...raw,
    provider: route.selectedProvider,
    readOnly: task?.constraints?.readOnly === true,
    approval,
    ...(captureWorkspace ? {
      commit: after.head,
      workspaceHead: after.head,
      diffHash: after.diffHash,
      changedFiles: after.changedFiles,
      workspaceEvidence: {
        baseSha,
        branch: after.branch,
        cleanBefore: before.clean,
        cleanAfter: after.clean,
        commitCount: after.commitCount,
        verification,
      },
    } : {}),
  };
  return assertSafeWorkerResult(result);
}
