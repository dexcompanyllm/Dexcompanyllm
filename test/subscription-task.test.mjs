import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";

import { executeSubscriptionTask } from "../workers/subscription-task.mjs";

function command(cwd, args) {
  const result = spawnSync("git", args, { cwd, encoding: "utf8", shell: false });
  if (result.status !== 0) throw new Error(result.stderr || `git ${args[0]} failed`);
  return String(result.stdout ?? "").trim();
}

async function fixture(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-subscription-task-"));
  const profile = path.join(root, "profile");
  const codexHome = path.join(profile, ".codex-worker");
  const repository = path.join(root, "fixture");
  fs.mkdirSync(codexHome, { recursive: true });
  fs.mkdirSync(repository, { recursive: true });
  command(repository, ["init", "-b", "phase3-test"]);
  command(repository, ["config", "user.name", "Dex Phase3 Fixture"]);
  command(repository, ["config", "user.email", "phase3-fixture@example.invalid"]);
  fs.writeFileSync(path.join(repository, "phase3.txt"), "baseline\n", "utf8");
  command(repository, ["add", "phase3.txt"]);
  command(repository, ["commit", "-m", "fixture: baseline"]);
  const baseSha = command(repository, ["rev-parse", "HEAD"]);
  const registryPath = path.join(root, "registry.json");
  const registry = `${JSON.stringify({
    schemaVersion: 1,
    projects: {
      "Phase3-Fixture": {
        path: repository,
        verification: {
          kind: "file-sha256",
          file: "phase3.txt",
          expectedSha256: "7edbdd592f732c24bf4e2ed3da52e98eef4feaa454290dfb8776e7f6fa217c50",
        },
      },
    },
  }, null, 2)}\n`;
  fs.writeFileSync(registryPath, registry, "utf8");
  const registrySha256 = crypto.createHash("sha256").update(registry, "utf8").digest("hex");
  const env = {
    PATH: process.env.PATH,
    HOME: profile,
    USERPROFILE: profile,
    USER: "DexWorkerTest",
    LOGNAME: "DexWorkerTest",
    DEX_WORKER_ACCOUNT: os.userInfo().username,
    CODEX_HOME: codexHome,
    DEX_PROJECT_REGISTRY_PATH: registryPath,
    DEX_PROJECT_REGISTRY_SHA256: registrySha256,
    DEX_OPENAI_SUBSCRIPTION_READY: "true",
    DEX_ANTHROPIC_SUBSCRIPTION_READY: "false",
  };
  try { return await run({ root, repository, baseSha, env }); }
  finally { fs.rmSync(root, { recursive: true, force: true }); }
}

function task(baseSha, constraints) {
  return {
    schemaVersion: "2.0",
    task: { id: "DC-PHASE3-WORKSPACE", title: "Workspace evidence", status: "queued" },
    project: { name: "Phase3-Fixture", baseSha, worktreeBranch: "phase3-test" },
    request: { objective: "Run the bounded fixture task." },
    routing: { requiredCapabilities: ["edit-repository"], preferredProvider: "openai" },
    constraints,
    execution: { riskLevel: "low", idempotencyKey: "workspace-test" },
  };
}

function fakeAdapter(run, { planType = "pro" } = {}) {
  return {
    async run(options) {
      const executionPolicy = options.executionPolicySelector
        ? await options.executionPolicySelector({
          planType,
          modelCatalog: { retirementReady: true },
        })
        : null;
      const result = await run({
        ...options,
        ...(executionPolicy ? {
          model: executionPolicy.model,
          effort: executionPolicy.reasoningEffort,
        } : {}),
      });
      return { ...result, executionPolicy };
    },
    approvalStats() { return { requested: 0, accepted: 0, declined: 0 }; },
    close() {},
  };
}

function isolatedSpawnSync(commandName, args, options) {
  const isCredentialProbe = commandName === "gh"
    || commandName === "cmdkey.exe"
    || (commandName === "git" && args[0] === "config" && ["--global", "--system"].includes(args[1]));
  return isCredentialProbe
    ? { status: 1, stdout: "", stderr: "" }
    : spawnSync(commandName, args, options);
}

test("bounded read-only subscription task produces zero-mutation workspace evidence", async () => fixture(async ({ baseSha, env }) => {
  const result = await executeSubscriptionTask({
    task: task(baseSha, { readOnly: true }),
    env,
    spawnSyncImpl: isolatedSpawnSync,
    captureWorkspace: true,
    openaiAdapterFactory: () => fakeAdapter(async ({ sandbox, model, effort, prompt }) => {
      assert.match(prompt, /minimum referenced files/i);
      assert.match(prompt, /reuse supplied evidence/i);
      assert.match(prompt, /deterministic checks first/i);
      return {
        finalText: "DEX_WORKER_E2E_PASS",
        eventCount: 1,
        threadId: "thread_readonly",
        sandbox,
        model,
        effort,
      };
    }),
  });
  assert.equal(result.readOnly, true);
  assert.equal(result.model, "gpt-5.6-sol");
  assert.equal(result.effort, "medium");
  assert.equal(result.modelRouting.mode, "automatic");
  assert.deepEqual(result.changedFiles, []);
  assert.equal(result.workspaceEvidence.cleanBefore, true);
  assert.equal(result.workspaceEvidence.cleanAfter, true);
  assert.equal(result.workspaceEvidence.commitCount, 0);
}));

test("Plus subscription plan automatically selects the efficient profile after account detection", async () => fixture(async ({ baseSha, env }) => {
  const packet = task(baseSha, { readOnly: true });
  packet.routing.workloadClass = "standard";
  const result = await executeSubscriptionTask({
    task: packet,
    env,
    spawnSyncImpl: isolatedSpawnSync,
    captureWorkspace: true,
    openaiAdapterFactory: () => fakeAdapter(async ({ model, effort }) => ({
      finalText: "DEX_PLUS_PROFILE_PASS",
      eventCount: 1,
      threadId: "thread_plus",
      model,
      effort,
    }), { planType: "plus" }),
  });
  assert.equal(result.model, "gpt-5.6-terra");
  assert.equal(result.effort, "medium");
  assert.equal(result.modelRouting.profile, "plus-efficient");
  assert.equal(result.modelRouting.planType, "plus");
}));

test("bounded mutation enforces one allowed file and exactly one clean local commit", async () => fixture(async ({ repository, baseSha, env }) => {
  const result = await executeSubscriptionTask({
    task: task(baseSha, {
      readOnly: false,
      allowedChangedFiles: ["phase3.txt"],
      maxChangedFiles: 1,
      requireLocalCommit: true,
    }),
    env,
    spawnSyncImpl: isolatedSpawnSync,
    captureWorkspace: true,
    openaiAdapterFactory: () => fakeAdapter(async ({ cwd, sandbox }) => {
      fs.writeFileSync(path.join(cwd, "phase3.txt"), "bounded mutation\n", "utf8");
      command(cwd, ["add", "phase3.txt"]);
      command(cwd, ["commit", "-m", "test: bounded phase3 mutation"]);
      return { finalText: "mutation complete", eventCount: 2, threadId: "thread_writer", sandbox };
    }),
  });
  assert.equal(result.readOnly, false);
  assert.deepEqual(result.changedFiles, ["phase3.txt"]);
  assert.equal(result.workspaceEvidence.commitCount, 1);
  assert.equal(result.workspaceEvidence.verification.status, "PASS");
  assert.equal(result.workspaceHead, command(repository, ["rev-parse", "HEAD"]));
}));

test("bounded mutation rejects a committed file outside the Task allowlist", async () => fixture(async ({ baseSha, env }) => {
  await assert.rejects(executeSubscriptionTask({
    task: task(baseSha, {
      readOnly: false,
      allowedChangedFiles: ["phase3.txt"],
      maxChangedFiles: 2,
      requireLocalCommit: true,
    }),
    env,
    spawnSyncImpl: isolatedSpawnSync,
    captureWorkspace: true,
    openaiAdapterFactory: () => fakeAdapter(async ({ cwd }) => {
      fs.writeFileSync(path.join(cwd, "phase3.txt"), "bounded mutation\n", "utf8");
      fs.writeFileSync(path.join(cwd, "unexpected.txt"), "not allowed\n", "utf8");
      command(cwd, ["add", "phase3.txt", "unexpected.txt"]);
      command(cwd, ["commit", "-m", "test: out-of-scope mutation"]);
      return { finalText: "unexpected", eventCount: 2 };
    }),
  }), /outside the Task allowlist/i);
}));

test("bounded mutation rejects an empty commit", async () => fixture(async ({ baseSha, env }) => {
  await assert.rejects(executeSubscriptionTask({
    task: task(baseSha, {
      readOnly: false,
      allowedChangedFiles: ["phase3.txt"],
      maxChangedFiles: 1,
      requireLocalCommit: true,
    }),
    env,
    spawnSyncImpl: isolatedSpawnSync,
    captureWorkspace: true,
    openaiAdapterFactory: () => fakeAdapter(async ({ cwd }) => {
      command(cwd, ["commit", "--allow-empty", "-m", "test: empty mutation"]);
      return { finalText: "empty", eventCount: 1 };
    }),
  }), /at least one changed file/i);
}));

test("bounded mutation rejects a default-branch target", async () => fixture(async ({ baseSha, env }) => {
  const defaultBranchTask = task(baseSha, {
    readOnly: false,
    allowedChangedFiles: ["phase3.txt"],
    maxChangedFiles: 1,
    requireLocalCommit: true,
  });
  defaultBranchTask.project.worktreeBranch = "main";
  await assert.rejects(executeSubscriptionTask({
    task: defaultBranchTask,
    env,
    spawnSyncImpl: isolatedSpawnSync,
    captureWorkspace: true,
    openaiAdapterFactory: () => fakeAdapter(async ({ cwd }) => {
      fs.writeFileSync(path.join(cwd, "phase3.txt"), "bounded mutation\n", "utf8");
      command(cwd, ["add", "phase3.txt"]);
      command(cwd, ["commit", "-m", "test: default branch target"]);
      return { finalText: "default branch", eventCount: 1 };
    }),
  }), /non-default project\.worktreeBranch/i);
}));

for (const scenario of ["default-branch", "dirty-read", "dirty-write", "invalid-limit", "invalid-allowlist", "parent-path", "absolute-path", "drive-path", "git-metadata"]) {
  test(`bounded preflight rejects ${scenario} before adapter creation and preserves the worktree`, async () => fixture(async ({ repository, baseSha, env }) => {
    const packet = task(baseSha, {
      readOnly: scenario === "dirty-read", allowedChangedFiles: ["phase3.txt"],
      maxChangedFiles: 1, requireLocalCommit: true,
    });
    if (scenario === "default-branch") {
      command(repository, ["branch", "-m", "main"]);
      packet.project.worktreeBranch = "main";
    }
    if (scenario.startsWith("dirty-")) fs.writeFileSync(path.join(repository, "phase3.txt"), "user's pending edit\n");
    if (scenario === "invalid-limit") packet.constraints.maxChangedFiles = 0;
    if (scenario === "invalid-allowlist") packet.constraints.allowedChangedFiles = [];
    if (scenario === "parent-path") packet.constraints.allowedChangedFiles = ["../outside.txt"];
    if (scenario === "absolute-path") packet.constraints.allowedChangedFiles = ["/outside.txt"];
    if (scenario === "drive-path") packet.constraints.allowedChangedFiles = ["C:/outside.txt"];
    if (scenario === "git-metadata") packet.constraints.allowedChangedFiles = [".git/config"];
    const before = fs.readFileSync(path.join(repository, "phase3.txt"), "utf8");
    const statusBefore = command(repository, ["status", "--porcelain=v1"]);
    let adapterCreations = 0;
    await assert.rejects(executeSubscriptionTask({
      task: packet, env, spawnSyncImpl: isolatedSpawnSync, captureWorkspace: true,
      openaiAdapterFactory: () => {
        adapterCreations += 1;
        return fakeAdapter(async () => {
          fs.writeFileSync(path.join(repository, "phase3.txt"), "must never execute\n");
          return { finalText: "unexpected" };
        });
      },
    }), /clean before|non-default|maxChangedFiles|allowedChangedFiles/);
    assert.equal(adapterCreations, 0);
    assert.equal(command(repository, ["rev-parse", "HEAD"]), baseSha);
    assert.equal(command(repository, ["status", "--porcelain=v1"]), statusBefore);
    assert.equal(fs.readFileSync(path.join(repository, "phase3.txt"), "utf8"), before);
  }));
}
