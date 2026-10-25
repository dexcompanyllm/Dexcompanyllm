import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";

import { assertAttemptId } from "../packages/core/src/task-execution.mjs";
import { findSecretKinds } from "../scripts/check.mjs";

export const LOCAL_BRIDGE_SCHEMA_VERSION = "1.0";
export const LOCAL_BRIDGE_MAX_BYTES = 256 * 1024;
export const LOCAL_BRIDGE_MAX_LIFETIME_MS = 30 * 60_000;
export const LOCAL_BRIDGE_HEARTBEAT_MAX_AGE_MS = 30_000;

const JOB_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{7,127}$/;
const TASK_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,159}$/;
const ROLE_VALUES = new Set(["writer", "verifier"]);
const APPROVAL_MODES = new Set(["deny", "one-time"]);

function stableJson(value) {
  if (value === undefined || value === null) return "null";
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .filter(key => value[key] !== undefined)
      .sort()
      .map(key => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new Error("Local bridge payload contains an unsupported value.");
  return encoded;
}

function sha256(value) {
  return crypto.createHash("sha256").update(stableJson(value), "utf8").digest("hex");
}

function timestamp(value, name) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) throw new Error(`${name} is invalid.`);
  return date;
}

function positiveInteger(value, name, maximum = Number.MAX_SAFE_INTEGER) {
  if (!Number.isSafeInteger(value) || value < 1 || value > maximum) {
    throw new Error(`${name} must be a positive bounded integer.`);
  }
  return value;
}

function boundedString(value, name, maximum = 512) {
  const normalized = String(value ?? "").trim();
  if (!normalized || normalized.length > maximum) throw new Error(`${name} is invalid.`);
  return normalized;
}

function assertSecretFree(value, name) {
  const findings = findSecretKinds(JSON.stringify(value) ?? "");
  if (findings.length) throw new Error(`${name} was blocked by the secret-scan boundary.`);
  return value;
}

function normalizeTask(task) {
  if (!task || typeof task !== "object" || Array.isArray(task)) {
    throw new Error("Local bridge Task Packet must be an object.");
  }
  if (task.project && Object.hasOwn(task.project, "localPath")) {
    throw new Error("Local bridge Task Packet may not contain project.localPath.");
  }
  const taskId = boundedString(task?.task?.id, "Local bridge Task ID", 160);
  if (!TASK_ID_PATTERN.test(taskId)) throw new Error("Local bridge Task ID is invalid.");
  boundedString(task?.project?.name, "Local bridge project name", 80);
  return structuredClone(task);
}

function normalizeApproval(value, { taskId, attemptId, deadlineAt }) {
  const approval = value ?? { mode: "deny" };
  if (!approval || typeof approval !== "object" || Array.isArray(approval)) {
    throw new Error("Local bridge approval must be an object.");
  }
  const mode = String(approval.mode ?? "deny");
  if (!APPROVAL_MODES.has(mode)) throw new Error("Local bridge approval mode is invalid.");
  if (mode === "deny") return { mode: "deny" };

  const approvedTaskId = boundedString(approval.taskId, "Approved Task ID", 160);
  const approvedAttemptId = assertAttemptId(approval.attemptId);
  const expiresAt = timestamp(approval.expiresAt, "One-time approval expiry");
  if (approvedTaskId !== taskId || approvedAttemptId !== attemptId) {
    throw new Error("One-time approval is not bound to this Task and attempt.");
  }
  if (expiresAt.getTime() > timestamp(deadlineAt, "Local bridge deadline").getTime()) {
    throw new Error("One-time approval may not outlive the local bridge job.");
  }
  return {
    mode: "one-time",
    taskId: approvedTaskId,
    attemptId: approvedAttemptId,
    expiresAt: expiresAt.toISOString(),
    maxUses: 1,
  };
}

function bridgeJobHash(job) {
  const { jobHash: ignored, ...payload } = job;
  return sha256(payload);
}

export function createLocalBridgeJob({
  jobId = crypto.randomUUID(),
  issueNumber,
  attemptId,
  role = "writer",
  task,
  approval,
  timeoutMs = 30 * 60_000,
  createdAt = new Date().toISOString(),
  deadlineAt,
} = {}) {
  const normalizedJobId = boundedString(jobId, "Local bridge job ID", 128);
  if (!JOB_ID_PATTERN.test(normalizedJobId)) throw new Error("Local bridge job ID is invalid.");
  positiveInteger(issueNumber, "Local bridge issue number");
  const normalizedAttemptId = assertAttemptId(attemptId);
  const normalizedRole = String(role ?? "");
  if (!ROLE_VALUES.has(normalizedRole)) throw new Error("Local bridge role is invalid.");
  positiveInteger(timeoutMs, "Local bridge timeout", LOCAL_BRIDGE_MAX_LIFETIME_MS);
  const normalizedTask = normalizeTask(task);
  const taskId = normalizedTask.task.id;
  const created = timestamp(createdAt, "Local bridge creation time");
  const deadline = deadlineAt
    ? timestamp(deadlineAt, "Local bridge deadline")
    : new Date(created.getTime() + timeoutMs);
  const lifetime = deadline.getTime() - created.getTime();
  if (lifetime < 1 || lifetime > LOCAL_BRIDGE_MAX_LIFETIME_MS) {
    throw new Error("Local bridge lifetime is outside the allowed bound.");
  }

  const record = {
    schemaVersion: LOCAL_BRIDGE_SCHEMA_VERSION,
    type: "local-bridge-job",
    jobId: normalizedJobId,
    issueNumber,
    attemptId: normalizedAttemptId,
    role: normalizedRole,
    taskId,
    taskHash: sha256(normalizedTask),
    task: normalizedTask,
    approval: normalizeApproval(approval, {
      taskId,
      attemptId: normalizedAttemptId,
      deadlineAt: deadline.toISOString(),
    }),
    timeoutMs,
    createdAt: created.toISOString(),
    deadlineAt: deadline.toISOString(),
  };
  const job = { ...record, jobHash: bridgeJobHash(record) };
  return assertSecretFree(job, "Local bridge job");
}

export function verifyLocalBridgeJob(value, { now = Date.now(), allowExpired = false } = {}) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Local bridge job is invalid.");
  }
  const validated = createLocalBridgeJob({
    jobId: value.jobId,
    issueNumber: value.issueNumber,
    attemptId: value.attemptId,
    role: value.role,
    task: value.task,
    approval: value.approval,
    timeoutMs: value.timeoutMs,
    createdAt: value.createdAt,
    deadlineAt: value.deadlineAt,
  });
  if (value.schemaVersion !== LOCAL_BRIDGE_SCHEMA_VERSION || value.type !== "local-bridge-job") {
    throw new Error("Local bridge job schema is unsupported.");
  }
  if (validated.taskHash !== value.taskHash || validated.jobHash !== value.jobHash) {
    throw new Error("Local bridge job hash verification failed.");
  }
  if (!allowExpired && timestamp(value.deadlineAt, "Local bridge deadline").getTime() <= Number(now)) {
    throw new Error("Local bridge job is stale.");
  }
  return validated;
}

function bridgeResultHash(result) {
  const { resultHash: ignored, ...payload } = result;
  return sha256(payload);
}

function normalizeApprovalStats(value = {}) {
  const requested = Number(value.requested ?? 0);
  const accepted = Number(value.accepted ?? 0);
  const declined = Number(value.declined ?? (requested - accepted));
  for (const [name, count] of Object.entries({ requested, accepted, declined })) {
    if (!Number.isSafeInteger(count) || count < 0) throw new Error(`Approval ${name} count is invalid.`);
  }
  if (accepted > 1 || accepted > requested || declined !== requested - accepted) {
    throw new Error("Local bridge approval counts violate the one-time boundary.");
  }
  return { requested, accepted, declined };
}

export function createLocalBridgeResult({
  job,
  runId = crypto.randomUUID(),
  provider = "openai",
  workerClass = "dedicated-subscription-worker",
  outcome = "completed",
  result,
  approvalStats,
  startedAt = new Date().toISOString(),
  completedAt = new Date().toISOString(),
} = {}) {
  const validatedJob = verifyLocalBridgeJob(job, { now: timestamp(startedAt, "Worker start time").getTime() });
  if (!result || typeof result !== "object" || Array.isArray(result)) {
    throw new Error("Local bridge worker result must be an object.");
  }
  const started = timestamp(startedAt, "Worker start time");
  const completed = timestamp(completedAt, "Worker completion time");
  if (completed.getTime() < started.getTime()) throw new Error("Worker completion precedes its start.");
  if (completed.getTime() > timestamp(validatedJob.deadlineAt, "Local bridge deadline").getTime()) {
    throw new Error("Local bridge worker result arrived after the job deadline.");
  }
  const record = {
    schemaVersion: LOCAL_BRIDGE_SCHEMA_VERSION,
    type: "local-bridge-result",
    jobId: validatedJob.jobId,
    jobHash: validatedJob.jobHash,
    issueNumber: validatedJob.issueNumber,
    attemptId: validatedJob.attemptId,
    taskId: validatedJob.taskId,
    taskHash: validatedJob.taskHash,
    role: validatedJob.role,
    runId: boundedString(runId, "Local bridge run ID", 128),
    provider: boundedString(provider, "Local bridge provider", 80),
    workerClass: boundedString(workerClass, "Local bridge worker class", 120),
    outcome: boundedString(outcome, "Local bridge outcome", 80),
    approval: normalizeApprovalStats(approvalStats),
    startedAt: started.toISOString(),
    completedAt: completed.toISOString(),
    result: structuredClone(result),
  };
  const output = { ...record, resultHash: bridgeResultHash(record) };
  return assertSecretFree(output, "Local bridge result");
}

export function verifyLocalBridgeResult(job, value) {
  const validatedJob = verifyLocalBridgeJob(job, { allowExpired: true });
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Local bridge result is invalid.");
  }
  if (value.schemaVersion !== LOCAL_BRIDGE_SCHEMA_VERSION || value.type !== "local-bridge-result") {
    throw new Error("Local bridge result schema is unsupported.");
  }
  for (const name of ["jobId", "jobHash", "attemptId", "taskId", "taskHash", "role"]) {
    if (value[name] !== validatedJob[name]) throw new Error(`Local bridge result ${name} does not match the job.`);
  }
  if (value.issueNumber !== validatedJob.issueNumber) {
    throw new Error("Local bridge result issueNumber does not match the job.");
  }
  createLocalBridgeResult({
    job: validatedJob,
    runId: value.runId,
    provider: value.provider,
    workerClass: value.workerClass,
    outcome: value.outcome,
    result: value.result,
    approvalStats: value.approval,
    startedAt: value.startedAt,
    completedAt: value.completedAt,
  });
  if (bridgeResultHash(value) !== value.resultHash) {
    throw new Error("Local bridge result hash verification failed.");
  }
  return assertSecretFree(structuredClone(value), "Local bridge result");
}

function assertSpoolDirectory(spoolDir, fsImpl = fs) {
  const configured = String(spoolDir ?? "").trim();
  if (!configured || !path.isAbsolute(configured)) throw new Error("Local bridge spool path must be absolute.");
  const stat = fsImpl.lstatSync(configured);
  if (!stat.isDirectory() || stat.isSymbolicLink()) throw new Error("Local bridge spool must be a real directory.");
  const resolved = path.resolve(configured);
  const real = fsImpl.realpathSync.native(configured);
  const left = process.platform === "win32" ? resolved.toLowerCase() : resolved;
  const right = process.platform === "win32" ? real.toLowerCase() : real;
  if (left !== right) throw new Error("Local bridge spool may not traverse a symbolic link or junction.");
  return real;
}

function bridgePath(spoolDir, jobId, suffix, fsImpl = fs) {
  const real = assertSpoolDirectory(spoolDir, fsImpl);
  if (!JOB_ID_PATTERN.test(String(jobId ?? ""))) throw new Error("Local bridge job ID is invalid.");
  return path.join(real, `${jobId}.${suffix}.json`);
}

function writeBoundedExclusive(targetPath, value, fsImpl = fs) {
  const encoded = `${JSON.stringify(value, null, 2)}\n`;
  if (Buffer.byteLength(encoded, "utf8") > LOCAL_BRIDGE_MAX_BYTES) {
    throw new Error("Local bridge file exceeds the bounded size.");
  }
  const temporary = `${targetPath}.${crypto.randomUUID()}.tmp`;
  fsImpl.writeFileSync(temporary, encoded, { encoding: "utf8", flag: "wx", mode: 0o600 });
  try {
    fsImpl.linkSync(temporary, targetPath);
  } finally {
    try { fsImpl.unlinkSync(temporary); } catch {}
  }
  return targetPath;
}

function readBoundedJson(filePath, fsImpl = fs) {
  const stat = fsImpl.statSync(filePath);
  if (!stat.isFile() || stat.size < 1 || stat.size > LOCAL_BRIDGE_MAX_BYTES) {
    throw new Error("Local bridge file size is invalid.");
  }
  return JSON.parse(fsImpl.readFileSync(filePath, "utf8"));
}

export function writeLocalBridgeJob(spoolDir, job, { fsImpl = fs } = {}) {
  const validated = verifyLocalBridgeJob(job);
  return writeBoundedExclusive(bridgePath(spoolDir, validated.jobId, "request", fsImpl), validated, fsImpl);
}

export function listLocalBridgeJobIds(spoolDir, { fsImpl = fs } = {}) {
  const real = assertSpoolDirectory(spoolDir, fsImpl);
  const ids = [];
  for (const entry of fsImpl.readdirSync(real, { withFileTypes: true })) {
    if (!entry.isFile()) continue;
    const match = entry.name.match(/^([A-Za-z0-9][A-Za-z0-9_-]{7,127})\.request\.json$/);
    if (match) ids.push(match[1]);
    if (ids.length > 100) throw new Error("Local bridge request queue exceeds the bounded count.");
  }
  return ids.sort();
}

export function claimLocalBridgeJob(spoolDir, jobId, workerNonce = crypto.randomUUID(), { fsImpl = fs } = {}) {
  const source = bridgePath(spoolDir, jobId, "request", fsImpl);
  const nonce = boundedString(workerNonce, "Local bridge worker nonce", 128);
  if (!JOB_ID_PATTERN.test(nonce)) throw new Error("Local bridge worker nonce is invalid.");
  const target = bridgePath(spoolDir, jobId, `running.${nonce}`, fsImpl);
  fsImpl.renameSync(source, target);
  const job = verifyLocalBridgeJob(readBoundedJson(target, fsImpl));
  return { job, runningPath: target };
}

export function publishLocalBridgeResult(spoolDir, job, result, { fsImpl = fs } = {}) {
  const validated = verifyLocalBridgeResult(job, result);
  return writeBoundedExclusive(bridgePath(spoolDir, validated.jobId, "result", fsImpl), validated, fsImpl);
}

export function readLocalBridgeResult(spoolDir, job, { fsImpl = fs } = {}) {
  const validatedJob = verifyLocalBridgeJob(job, { allowExpired: true });
  const value = readBoundedJson(bridgePath(spoolDir, validatedJob.jobId, "result", fsImpl), fsImpl);
  return verifyLocalBridgeResult(validatedJob, value);
}

export function createLocalBridgeApprovalHandler(job, { now = () => Date.now() } = {}) {
  const validated = verifyLocalBridgeJob(job);
  let requested = 0;
  let accepted = 0;
  const handler = async () => {
    requested += 1;
    if (
      validated.approval.mode === "one-time"
      && accepted === 0
      && Number(now()) < timestamp(validated.approval.expiresAt, "One-time approval expiry").getTime()
    ) {
      accepted += 1;
      return "accept";
    }
    return "decline";
  };
  handler.snapshot = () => ({ requested, accepted, declined: requested - accepted });
  return handler;
}

export function writeLocalBridgeHeartbeat(spoolDir, {
  workerClass = "dedicated-subscription-worker",
  updatedAt = new Date().toISOString(),
  fsImpl = fs,
} = {}) {
  const real = assertSpoolDirectory(spoolDir, fsImpl);
  const heartbeat = assertSecretFree({
    schemaVersion: LOCAL_BRIDGE_SCHEMA_VERSION,
    type: "local-bridge-heartbeat",
    workerClass: boundedString(workerClass, "Local bridge worker class", 120),
    updatedAt: timestamp(updatedAt, "Local bridge heartbeat time").toISOString(),
  }, "Local bridge heartbeat");
  const encoded = `${JSON.stringify(heartbeat, null, 2)}\n`;
  fsImpl.writeFileSync(path.join(real, "heartbeat.json"), encoded, { encoding: "utf8", mode: 0o600 });
  return heartbeat;
}

export function localBridgeHostReady(spoolDir, {
  now = Date.now(),
  maxAgeMs = LOCAL_BRIDGE_HEARTBEAT_MAX_AGE_MS,
  fsImpl = fs,
} = {}) {
  positiveInteger(maxAgeMs, "Local bridge heartbeat maximum age", 5 * 60_000);
  try {
    const real = assertSpoolDirectory(spoolDir, fsImpl);
    const heartbeat = readBoundedJson(path.join(real, "heartbeat.json"), fsImpl);
    if (heartbeat.schemaVersion !== LOCAL_BRIDGE_SCHEMA_VERSION || heartbeat.type !== "local-bridge-heartbeat") return false;
    const age = Number(now) - timestamp(heartbeat.updatedAt, "Local bridge heartbeat time").getTime();
    return age >= 0 && age <= maxAgeMs;
  } catch {
    return false;
  }
}
