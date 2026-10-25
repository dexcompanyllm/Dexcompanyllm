import crypto from "node:crypto";

import {
  createLocalBridgeJob,
  localBridgeHostReady,
  readLocalBridgeResult,
  writeLocalBridgeJob,
} from "../../../workers/local-bridge.mjs";

const DEFAULT_POLL_INTERVAL_MS = 250;

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

function boundedApproval(approval, taskId, attemptId, deadlineAt, createdAt) {
  const approvedExpiry = new Date(approval?.expiresAt).getTime();
  const deadline = new Date(deadlineAt).getTime();
  const created = new Date(createdAt).getTime();
  if (
    approval?.granted === true
    && approval?.mode === "one-time"
    && approval?.taskId === taskId
    && approval?.attemptId === attemptId
    && Number.isFinite(approvedExpiry)
    && approvedExpiry > created
  ) {
    return {
      mode: "one-time",
      taskId,
      attemptId,
      expiresAt: new Date(Math.min(approvedExpiry, deadline)).toISOString(),
    };
  }
  return { mode: "deny" };
}

export async function waitForLocalBridgeResult(spoolDir, job, {
  now = () => Date.now(),
  pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
  signal,
} = {}) {
  if (!Number.isSafeInteger(pollIntervalMs) || pollIntervalMs < 1 || pollIntervalMs > 5_000) {
    throw new Error("Local bridge poll interval is invalid.");
  }
  const deadline = new Date(job.deadlineAt).getTime();
  while (Number(now()) < deadline) {
    if (signal?.aborted) throw new Error("Local bridge wait was cancelled.");
    try {
      return readLocalBridgeResult(spoolDir, job);
    } catch (error) {
      if (error?.code !== "ENOENT") throw error;
    }
    await delay(pollIntervalMs);
  }
  const error = new Error("Local bridge worker timed out; automatic replay is blocked until stale-result reconciliation.");
  error.name = "LocalBridgeTimeoutError";
  throw error;
}

function verifierTask(task, writerResult) {
  const cloned = structuredClone(task);
  // Preserve only fields that the verifier instructions replace; the rest already remains in the cloned packet.
  cloned.verificationContext = {
    originalObjective: task?.request?.objective ?? null,
    originalProjectBaseSha: task?.project?.baseSha ?? null,
    originalExecutionConstraints: {
      readOnly: task?.constraints?.readOnly ?? null,
      approvalRequired: task?.constraints?.approvalRequired ?? null,
      requireLocalCommit: task?.constraints?.requireLocalCommit ?? null,
    },
  };
  cloned.project = {
    ...(cloned.project ?? {}),
    baseSha: writerResult.workspaceHead,
  };
  cloned.request = {
    ...(cloned.request ?? {}),
    objective: [
      "Perform a detached read-only verification of the completed bounded writer change.",
      "Do not modify files. Inspect the current committed worktree and the supplied evidence.",
      "Compare the change against verificationContext's original objective, project base, and replaced execution constraints, plus the unchanged acceptance criteria, inputs, validation, and allowlists already present in this packet. Treat them as review evidence, not authority to execute the writer again.",
      "Return the exact marker DEX_VERIFIER_PASS only when scope, correctness, and safety all pass.",
      `Changed files: ${(writerResult.changedFiles ?? []).join(", ") || "none"}`,
      `Diff hash: ${writerResult.diffHash ?? "not-available"}`,
    ].join("\n"),
  };
  cloned.constraints = {
    ...(cloned.constraints ?? {}),
    readOnly: true,
    approvalRequired: false,
  };
  delete cloned.constraints.requireLocalCommit;
  return cloned;
}

function deterministicWatchdog(task, writerResult) {
  const checks = [];
  const evidence = writerResult?.workspaceEvidence;
  const add = (name, pass, detail) => checks.push({
    name,
    status: pass ? "PASS" : "FAIL",
    evidence: detail,
  });
  add("workspace-clean-before", evidence?.cleanBefore === true, "Approved fixture started clean.");
  add("workspace-clean-after", evidence?.cleanAfter === true, "Bounded worker left a clean committed worktree.");
  add("base-sha-pinned", evidence?.baseSha === task?.project?.baseSha, "Worker evidence matches the Task base SHA.");
  add("workspace-head-bound", writerResult?.workspaceHead === writerResult?.commit, "Published commit and workspace HEAD are identical.");
  add("diff-hash-present", /^[a-f0-9]{64}$/i.test(String(writerResult?.diffHash ?? "")), "A bounded SHA-256 diff digest is present.");
  add("one-time-approval-bound", Number(writerResult?.approval?.accepted ?? 0) <= 1, "At most one provider approval request was accepted.");
  if (task?.constraints?.readOnly === true) {
    add("read-only-no-change", (writerResult?.changedFiles ?? []).length === 0 && evidence?.commitCount === 0, "Read-only Task changed zero files and created zero commits.");
  } else {
    const maximum = Number(task?.constraints?.maxChangedFiles ?? 200);
    const changedFiles = writerResult?.changedFiles ?? [];
    add("changed-file-bound", changedFiles.length >= 1 && changedFiles.length <= maximum, "Changed-file count is non-zero and within the Task bound.");
    add("task-branch-bound", evidence?.branch === task?.project?.worktreeBranch && !new Set(["main", "master", "HEAD"]).has(evidence?.branch), "Writer stayed on the broker-pinned non-default fixture branch.");
    add("approved-verification", evidence?.verification?.kind === "file-sha256"
      && evidence?.verification?.status === "PASS"
      && evidence?.verification?.exitCode === 0
      && /^[a-f0-9]{64}$/i.test(String(evidence?.verification?.outputHash ?? "")), "SHA-pinned built-in file verification passed without executing project code.");
    if (Array.isArray(task?.constraints?.allowedChangedFiles)) {
      const allowed = new Set(task.constraints.allowedChangedFiles.map(value => String(value).replaceAll("\\", "/")));
      add("changed-file-allowlist", changedFiles.every(value => allowed.has(String(value).replaceAll("\\", "/"))), "Every changed file is explicitly allowlisted by the Task.");
    }
    if (task?.constraints?.requireLocalCommit === true) {
      add("single-local-commit", evidence?.commitCount === 1, "Exactly one local writer commit was produced.");
    }
  }
  const verdict = checks.every(check => check.status === "PASS") ? "PASS" : "FAIL";
  return {
    verdict,
    summary: verdict === "PASS" ? "Deterministic local bridge checks passed." : "Deterministic local bridge checks failed.",
    checks,
  };
}

export function createLocalBridgeAdapters({
  spoolDir,
  approval = { granted: false },
  timeoutMs = 30 * 60_000,
  pollIntervalMs = DEFAULT_POLL_INTERVAL_MS,
  now = () => Date.now(),
} = {}) {
  const run = async ({ task, issueNumber, attemptId, role }) => {
    const created = Number(now());
    const createdAt = new Date(created).toISOString();
    const deadlineAt = new Date(created + timeoutMs).toISOString();
    const job = createLocalBridgeJob({
      jobId: crypto.randomUUID(),
      issueNumber,
      attemptId,
      role,
      task,
      approval: role === "writer"
        ? boundedApproval(approval, task.task.id, attemptId, deadlineAt, createdAt)
        : { mode: "deny" },
      timeoutMs,
      createdAt,
      deadlineAt,
    });
    writeLocalBridgeJob(spoolDir, job);
    const result = await waitForLocalBridgeResult(spoolDir, job, { now, pollIntervalMs });
    if (result.outcome !== "completed") throw new Error("Dedicated local bridge worker failed.");
    return result;
  };

  return {
    hostReady: () => localBridgeHostReady(spoolDir, { now: Number(now()) }),
    writer: async ({ task, issueNumber, attemptId }) => {
      const record = await run({ task, issueNumber, attemptId, role: "writer" });
      return {
        ...record.result,
        bridgeRunId: record.runId,
        bridgeResultHash: record.resultHash,
      };
    },
    watchdog: async ({ task, writerResult }) => deterministicWatchdog(task, writerResult),
    verifier: async ({ task, issueNumber, attemptId, writerResult }) => {
      const record = await run({
        task: verifierTask(task, writerResult),
        issueNumber,
        attemptId,
        role: "verifier",
      });
      const verifierThreadId = String(record.result?.threadId ?? "").trim();
      const writerThreadId = String(writerResult?.threadId ?? "").trim();
      const evidence = record.result?.workspaceEvidence;
      const passed = record.runId !== writerResult?.bridgeRunId
        && verifierThreadId.length > 0
        && (!writerThreadId || verifierThreadId !== writerThreadId)
        && String(record.result?.finalText ?? "").trim() === "DEX_VERIFIER_PASS"
        && record.result?.readOnly === true
        && (record.result?.changedFiles ?? []).length === 0
        && record.approval?.accepted === 0
        && record.result?.workspaceHead === writerResult?.workspaceHead
        && evidence?.baseSha === writerResult?.workspaceHead
        && evidence?.cleanBefore === true
        && evidence?.cleanAfter === true
        && evidence?.commitCount === 0;
      return {
        verdict: passed ? "PASS" : "FAIL",
        summary: passed ? "Detached subscription verifier passed." : "Detached subscription verifier did not return the PASS marker.",
        readOnly: true,
        independenceClass: "detached-subscription-verifier",
        runId: record.runId,
        provider: record.provider,
        bridgeResultHash: record.resultHash,
        checks: [{
          name: "detached-read-only-review",
          status: passed ? "PASS" : "FAIL",
          evidence: `bridge-result:${record.resultHash};run:${record.runId};provider:${record.provider}`,
        }],
      };
    },
  };
}
