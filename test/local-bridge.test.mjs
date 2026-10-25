import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";

import {
  claimLocalBridgeJob,
  createLocalBridgeApprovalHandler,
  createLocalBridgeJob,
  createLocalBridgeResult,
  listLocalBridgeJobIds,
  localBridgeHostReady,
  publishLocalBridgeResult,
  readLocalBridgeResult,
  verifyLocalBridgeJob,
  verifyLocalBridgeResult,
  writeLocalBridgeHeartbeat,
  writeLocalBridgeJob,
} from "../workers/local-bridge.mjs";

function withSpool(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-local-bridge-"));
  try { return run(root); }
  finally { fs.rmSync(root, { recursive: true, force: true }); }
}

function taskPacket() {
  return {
    schemaVersion: "2.0",
    task: { id: "DC-PHASE3-TEST", title: "Phase 3 bridge test", status: "queued" },
    project: { name: "Phase3-Fixture", baseSha: "a".repeat(40) },
    request: { objective: "Verify the bounded local bridge." },
    routing: { requiredCapabilities: ["edit-repository"], preferredProvider: "openai" },
    constraints: { readOnly: true },
    execution: { riskLevel: "low", idempotencyKey: "phase3-test" },
  };
}

function bridgeJob(overrides = {}) {
  const {
    createdAt = new Date().toISOString(),
    deadlineAt = new Date(Date.parse(createdAt) + 60_000).toISOString(),
    ...rest
  } = overrides;
  return createLocalBridgeJob({
    jobId: "phase3_job_001",
    issueNumber: 91,
    attemptId: "phase3_attempt_001",
    task: taskPacket(),
    timeoutMs: 60_000,
    createdAt,
    deadlineAt,
    ...rest,
  });
}

test("local bridge binds Task, attempt, deadline, and one-time approval into hashes", async () => {
  const created = Date.now();
  const createdAt = new Date(created).toISOString();
  const deadlineAt = new Date(created + 60_000).toISOString();
  const approvalExpiry = new Date(created + 30_000).toISOString();
  const activeNow = created + 10_000;
  const job = bridgeJob({
    createdAt,
    deadlineAt,
    approval: {
      mode: "one-time",
      taskId: "DC-PHASE3-TEST",
      attemptId: "phase3_attempt_001",
      expiresAt: approvalExpiry,
    },
  });
  assert.equal(verifyLocalBridgeJob(job, { now: activeNow }).jobHash, job.jobHash);
  const approval = createLocalBridgeApprovalHandler(job, { now: () => activeNow });
  assert.equal(await approval(), "accept");
  assert.equal(await approval(), "decline");
  assert.deepEqual(approval.snapshot(), { requested: 2, accepted: 1, declined: 1 });

  const tampered = structuredClone(job);
  tampered.task.request.objective = "tampered";
  assert.throws(() => verifyLocalBridgeJob(tampered, { now: activeNow }), /hash verification/i);
  assert.throws(() => verifyLocalBridgeJob(job, { now: created + 120_000 }), /stale/i);
});

test("local bridge file claim is atomic across ten consumers", () => withSpool(spool => {
  const job = bridgeJob();
  writeLocalBridgeJob(spool, job);
  assert.deepEqual(listLocalBridgeJobIds(spool), [job.jobId]);
  let claimed = 0;
  for (let index = 0; index < 10; index += 1) {
    try {
      claimLocalBridgeJob(spool, job.jobId, `worker_${String(index).padStart(3, "0")}`);
      claimed += 1;
    } catch (error) {
      assert.equal(error.code, "ENOENT");
    }
  }
  assert.equal(claimed, 1);
  assert.deepEqual(listLocalBridgeJobIds(spool), []);
}));

test("local bridge rejects stale, conflicting, secret-bearing, and tampered results", () => withSpool(spool => {
  const job = bridgeJob({
    createdAt: "2026-09-02T00:00:00.000Z",
    deadlineAt: "2026-09-02T00:01:00.000Z",
  });
  const result = createLocalBridgeResult({
    job,
    runId: "phase3_run_001",
    result: { finalText: "DEX_WORKER_E2E_PASS", eventCount: 4, readOnly: true, changedFiles: [] },
    startedAt: "2026-09-02T00:00:10.000Z",
    completedAt: "2026-09-02T00:00:20.000Z",
  });
  publishLocalBridgeResult(spool, job, result);
  assert.equal(readLocalBridgeResult(spool, job).resultHash, result.resultHash);

  const tampered = structuredClone(result);
  tampered.result.finalText = "changed";
  assert.throws(() => verifyLocalBridgeResult(job, tampered), /hash verification/i);
  assert.throws(() => createLocalBridgeResult({
    job,
    result: { finalText: "late" },
    startedAt: "2026-09-02T00:00:10.000Z",
    completedAt: "2026-09-02T00:02:00.000Z",
  }), /deadline/i);
  assert.throws(() => createLocalBridgeJob({
    issueNumber: 91,
    attemptId: "phase3_attempt_002",
    task: {
      ...taskPacket(),
      request: { objective: ["ghp", "abcdefghijklmnopqrstuvwxyz123456"].join("_") },
    },
  }), /secret-scan/i);
}));

test("local bridge heartbeat is bounded and expires closed", () => withSpool(spool => {
  writeLocalBridgeHeartbeat(spool, { updatedAt: "2026-09-02T00:00:00.000Z" });
  assert.equal(localBridgeHostReady(spool, { now: Date.parse("2026-09-02T00:00:10.000Z") }), true);
  assert.equal(localBridgeHostReady(spool, { now: Date.parse("2026-09-02T00:01:00.000Z") }), false);
}));
