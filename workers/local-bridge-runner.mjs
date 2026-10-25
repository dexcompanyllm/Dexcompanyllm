import {
  assertBrokerOnlyCredentialBoundary,
  assertCodexHomeBoundary,
  assertDedicatedWorkerAccount,
  loadApprovedProjectRegistry,
} from "./host-security.mjs";
import {
  claimLocalBridgeJob,
  createLocalBridgeApprovalHandler,
  createLocalBridgeResult,
  publishLocalBridgeResult,
  listLocalBridgeJobIds,
  writeLocalBridgeHeartbeat,
} from "./local-bridge.mjs";
import { executeSubscriptionTask } from "./subscription-task.mjs";

function hostPreflight() {
  assertDedicatedWorkerAccount();
  assertBrokerOnlyCredentialBoundary();
  assertCodexHomeBoundary();
  loadApprovedProjectRegistry();
}

async function work(spoolDir, jobId) {
  hostPreflight();
  writeLocalBridgeHeartbeat(spoolDir);
  const { job } = claimLocalBridgeJob(spoolDir, jobId);
  const approvalHandler = createLocalBridgeApprovalHandler(job);
  const startedAt = new Date().toISOString();
  let outcome = "completed";
  let result;
  try {
    result = await executeSubscriptionTask({
      task: job.task,
      approvalHandler,
      timeoutMs: job.timeoutMs,
      captureWorkspace: true,
    });
  } catch (error) {
    outcome = "failed";
    result = {
      errorClass: String(error?.name ?? "Error").slice(0, 80),
      summary: "Dedicated worker execution failed; inspect the host-local bounded log.",
    };
  }
  const record = createLocalBridgeResult({
    job,
    outcome,
    result,
    approvalStats: approvalHandler.snapshot(),
    startedAt,
    completedAt: new Date().toISOString(),
  });
  publishLocalBridgeResult(spoolDir, job, record);
  console.log(JSON.stringify({
    jobId: record.jobId,
    taskId: record.taskId,
    attemptId: record.attemptId,
    role: record.role,
    outcome: record.outcome,
    resultHash: record.resultHash,
    approval: record.approval,
  }, null, 2));
  if (outcome !== "completed") process.exitCode = 1;
}

function delay(milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
}

async function loop(spoolDir, maxJobs, idleTimeoutMs) {
  if (!Number.isSafeInteger(maxJobs) || maxJobs < 1 || maxJobs > 4) {
    throw new Error("Local bridge maxJobs must be an integer from 1 to 4.");
  }
  if (!Number.isSafeInteger(idleTimeoutMs) || idleTimeoutMs < 1_000 || idleTimeoutMs > 30 * 60_000) {
    throw new Error("Local bridge idle timeout is invalid.");
  }
  hostPreflight();
  const deadline = Date.now() + idleTimeoutMs;
  let completed = 0;
  while (completed < maxJobs && Date.now() < deadline) {
    writeLocalBridgeHeartbeat(spoolDir);
    const [jobId] = listLocalBridgeJobIds(spoolDir);
    if (!jobId) {
      await delay(500);
      continue;
    }
    await work(spoolDir, jobId);
    completed += 1;
  }
  console.log(JSON.stringify({ completed, maxJobs, idleTimeoutReached: completed < maxJobs }, null, 2));
}

async function main() {
  const command = process.argv[2];
  const spoolDir = process.argv[3];
  if (command === "heartbeat") {
    hostPreflight();
    console.log(JSON.stringify(writeLocalBridgeHeartbeat(spoolDir), null, 2));
    return;
  }
  if (command === "work") {
    const jobId = process.argv[4];
    if (!jobId) throw new Error("Local bridge job ID is required.");
    await work(spoolDir, jobId);
    return;
  }
  if (command === "loop") {
    const maxJobs = Number(process.argv[4] ?? 2);
    const idleTimeoutMs = Number(process.argv[5] ?? 30 * 60_000);
    await loop(spoolDir, maxJobs, idleTimeoutMs);
    return;
  }
  throw new Error("Use heartbeat, work, or loop with an absolute spool path.");
}

main().catch(error => {
  console.error(String(error?.message ?? error));
  process.exitCode = 1;
});
