import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import { createLocalBridgeAdapters } from "../services/orchestrator/src/local-bridge-adapter.mjs";
import {
  claimLocalBridgeJob,
  createLocalBridgeResult,
  listLocalBridgeJobIds,
  publishLocalBridgeResult,
  writeLocalBridgeHeartbeat,
} from "../workers/local-bridge.mjs";

async function waitForJob(spool) {
  for (let index = 0; index < 100; index += 1) {
    const [jobId] = listLocalBridgeJobIds(spool);
    if (jobId) return claimLocalBridgeJob(spool, jobId, `test_worker_${index}`);
    await new Promise(resolve => setTimeout(resolve, 2));
  }
  assert.fail("Local bridge job was not created.");
}

async function withSpool(run) {
  const spool = fs.mkdtempSync(path.join(os.tmpdir(), "dex-bridge-adapter-"));
  try { return await run(spool); }
  finally { fs.rmSync(spool, { recursive: true, force: true }); }
}

function taskPacket() {
  return {
    schemaVersion: "2.0",
    task: { id: "DC-PHASE3-ADAPTER", title: "Bridge adapter", status: "queued" },
    project: { name: "Phase3-Fixture", baseSha: "a".repeat(40), worktreeBranch: "phase3-fixture" },
    request: { objective: "Mutate one fixture file." },
    routing: { requiredCapabilities: ["edit-repository"], preferredProvider: "openai" },
    constraints: {
      readOnly: false,
      allowedChangedFiles: ["phase3.txt"],
      maxChangedFiles: 1,
      requireLocalCommit: true,
    },
    execution: { riskLevel: "low", idempotencyKey: "phase3-adapter" },
  };
}

test("local bridge adapters connect writer, deterministic Watchdog, and detached verifier", async () => withSpool(async spool => {
  writeLocalBridgeHeartbeat(spool);
  const task = taskPacket();
  task.request.objective = "Keep the campaign budget exactly 123 units; this requirement occurs only here.";
  task.request.acceptanceCriteria = ["Preserve the attribution window"];
  task.inputs = { sourceNotes: ["business-rules.md@rev1; same attribution window"] };
  task.validation = { required: ["Reuse the saved definition"], status: "not-checked" };
  const original = structuredClone(task);
  const adapters = createLocalBridgeAdapters({ spoolDir: spool, timeoutMs: 2_000, pollIntervalMs: 2 });
  assert.equal(adapters.hostReady(), true);

  const writerPromise = adapters.writer({ task, issueNumber: 99, attemptId: "phase3_adapter_001" });
  const { job: writerJob } = await waitForJob(spool);
  const writerRecord = createLocalBridgeResult({
    job: writerJob,
    runId: "phase3_writer_run",
    result: {
      finalText: "writer complete",
      eventCount: 5,
      threadId: "thread-writer",
      readOnly: false,
      commit: "b".repeat(40),
      workspaceHead: "b".repeat(40),
      diffHash: "c".repeat(64),
      changedFiles: ["phase3.txt"],
      workspaceEvidence: {
        baseSha: "a".repeat(40),
        branch: "phase3-fixture",
        cleanBefore: true,
        cleanAfter: true,
        commitCount: 1,
        verification: {
          kind: "file-sha256",
          status: "PASS",
          exitCode: 0,
          durationMs: 10,
          outputHash: "d".repeat(64),
        },
      },
    },
  });
  publishLocalBridgeResult(spool, writerJob, writerRecord);
  const writerResult = await writerPromise;
  assert.equal(writerResult.bridgeResultHash, writerRecord.resultHash);
  const watchdog = await adapters.watchdog({ task, writerResult });
  assert.equal(watchdog.verdict, "PASS");

  const verifierPromise = adapters.verifier({
    task,
    issueNumber: 99,
    attemptId: "phase3_adapter_001",
    writerResult,
  });
  const { job: verifierJob } = await waitForJob(spool);
  assert.equal(verifierJob.role, "verifier");
  assert.equal(verifierJob.task.constraints.readOnly, true);
  assert.equal(verifierJob.task.verificationContext.originalTask, undefined);
  assert.equal(verifierJob.task.verificationContext.originalObjective, original.request.objective);
  assert.equal(verifierJob.task.verificationContext.originalProjectBaseSha, "a".repeat(40));
  assert.deepEqual(verifierJob.task.verificationContext.originalExecutionConstraints, {
    readOnly: false,
    approvalRequired: null,
    requireLocalCommit: true,
  });
  assert.deepEqual(verifierJob.task.request.acceptanceCriteria, original.request.acceptanceCriteria);
  assert.deepEqual(verifierJob.task.inputs, original.inputs);
  assert.deepEqual(verifierJob.task.validation, original.validation);
  assert.deepEqual(verifierJob.task.constraints.allowedChangedFiles, original.constraints.allowedChangedFiles);
  assert.deepEqual(task, original);
  assert.match(verifierJob.task.request.objective, /verificationContext/);
  const legacyPacket = structuredClone(verifierJob.task);
  legacyPacket.verificationContext = { originalTask: original };
  assert.ok(JSON.stringify(verifierJob.task).length < JSON.stringify(legacyPacket).length);
  const verifierRecord = createLocalBridgeResult({
    job: verifierJob,
    runId: "phase3_verifier_run",
    result: {
      finalText: "DEX_VERIFIER_PASS",
      eventCount: 3,
      threadId: "thread-verifier",
      readOnly: true,
      changedFiles: [],
      workspaceHead: "b".repeat(40),
      diffHash: "d".repeat(64),
      workspaceEvidence: {
        baseSha: "b".repeat(40),
        branch: "phase3-fixture",
        cleanBefore: true,
        cleanAfter: true,
        commitCount: 0,
      },
    },
  });
  publishLocalBridgeResult(spool, verifierJob, verifierRecord);
  const verifier = await verifierPromise;
  assert.equal(verifier.verdict, "PASS");
  assert.equal(verifier.independenceClass, "detached-subscription-verifier");
  assert.equal(verifier.runId, "phase3_verifier_run");
  assert.notEqual(verifier.runId, writerResult.bridgeRunId);
}));

test("local bridge timeout fails closed and a late worker result cannot be created", async () => withSpool(async spool => {
  const adapters = createLocalBridgeAdapters({ spoolDir: spool, timeoutMs: 250, pollIntervalMs: 2 });
  const pending = adapters.writer({ task: taskPacket(), issueNumber: 100, attemptId: "phase3_timeout_001" });
  const { job } = await waitForJob(spool);
  await assert.rejects(pending, error => error?.name === "LocalBridgeTimeoutError");
  await new Promise(resolve => setTimeout(resolve, 5));
  assert.throws(() => createLocalBridgeResult({
    job,
    runId: "phase3_late_run",
    result: { finalText: "late" },
  }), /stale|deadline/i);
}));

test("local bridge never extends a one-time approval beyond its broker expiry", async () => withSpool(async spool => {
  const created = Date.now();
  const approvalExpiry = new Date(created + 5_000).toISOString();
  const task = taskPacket();
  const adapters = createLocalBridgeAdapters({
    spoolDir: spool,
    approval: {
      granted: true,
      mode: "one-time",
      taskId: task.task.id,
      attemptId: "phase3_approval_001",
      expiresAt: approvalExpiry,
    },
    timeoutMs: 10_000,
    pollIntervalMs: 2,
    now: () => created,
  });
  const pending = adapters.writer({ task, issueNumber: 101, attemptId: "phase3_approval_001" });
  const { job } = await waitForJob(spool);
  assert.equal(job.approval.expiresAt, approvalExpiry);
  const record = createLocalBridgeResult({
    job,
    runId: "phase3_approval_run",
    result: {
      finalText: "writer complete",
      readOnly: false,
      commit: "b".repeat(40),
      workspaceHead: "b".repeat(40),
      diffHash: "c".repeat(64),
      changedFiles: ["phase3.txt"],
      workspaceEvidence: {
        baseSha: "a".repeat(40),
        branch: "phase3-fixture",
        cleanBefore: true,
        cleanAfter: true,
        commitCount: 1,
        verification: {
          kind: "file-sha256",
          status: "PASS",
          exitCode: 0,
          durationMs: 10,
          outputHash: "d".repeat(64),
        },
      },
    },
    startedAt: new Date(created + 1_000).toISOString(),
    completedAt: new Date(created + 2_000).toISOString(),
  });
  publishLocalBridgeResult(spool, job, record);
  await pending;
}));
