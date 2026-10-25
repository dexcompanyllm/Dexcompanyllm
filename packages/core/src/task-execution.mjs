import { createHash } from "node:crypto";
import { assertTransition, TASK_STATES } from "./state-machine.mjs";

export const TASK_EXECUTION_MARKER = "<!-- dex-task-execution-v1 -->";
export const TASK_RESULT_MARKER = "<!-- dex-task-result-v1 -->";
export const TASK_EXECUTION_COMMENT_MAX_BYTES = 64 * 1024;

const ATTEMPT_ID_PATTERN = /^[A-Za-z0-9][A-Za-z0-9_-]{7,127}$/;
const EVENT_KIND_PATTERN = /^[a-z][a-z0-9-]{0,39}$/;

function stableJson(value) {
  if (value === undefined || value === null) return "null";
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value)
      .filter((key) => value[key] !== undefined)
      .sort()
      .map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`)
      .join(",")}}`;
  }
  const encoded = JSON.stringify(value);
  if (encoded === undefined) throw new Error("Task result contains an unsupported value.");
  return encoded;
}

function assertPositiveInteger(value, name) {
  if (!Number.isSafeInteger(value) || value <= 0) throw new Error(`${name} must be a positive safe integer.`);
}

export function assertAttemptId(value) {
  const normalized = String(value ?? "");
  if (!ATTEMPT_ID_PATTERN.test(normalized)) throw new Error("Invalid task attempt id.");
  return normalized;
}

function assertTaskState(value) {
  const normalized = String(value ?? "");
  if (!TASK_STATES.includes(normalized)) throw new Error(`Unknown task state: ${normalized}`);
  return normalized;
}

function boundedDetails(value) {
  if (value === undefined || value === null) return undefined;
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    throw new Error("Task event details must be an object.");
  }
  const encoded = stableJson(value);
  if (Buffer.byteLength(encoded, "utf8") > 24 * 1024) throw new Error("Task event details are too large.");
  return value;
}

export function createTaskExecutionEvent({
  taskId,
  issueNumber,
  attemptId,
  statusVersion,
  from,
  to,
  kind = "transition",
  details,
  createdAt = new Date().toISOString(),
} = {}) {
  const normalizedTaskId = String(taskId ?? "").trim();
  if (!normalizedTaskId || normalizedTaskId.length > 160) throw new Error("Invalid task id.");
  assertPositiveInteger(issueNumber, "Task issue number");
  const normalizedAttemptId = assertAttemptId(attemptId);
  assertPositiveInteger(statusVersion, "Task status version");
  const normalizedFrom = assertTaskState(from);
  const normalizedTo = assertTaskState(to);
  const normalizedKind = String(kind ?? "");
  if (!EVENT_KIND_PATTERN.test(normalizedKind)) throw new Error("Invalid task event kind.");
  if (normalizedFrom !== normalizedTo) assertTransition(normalizedFrom, normalizedTo);
  if (normalizedKind === "transition" && normalizedFrom === normalizedTo) {
    throw new Error("Transition events must change task state.");
  }
  const timestamp = new Date(createdAt);
  if (Number.isNaN(timestamp.getTime())) throw new Error("Invalid task event timestamp.");

  return {
    schemaVersion: "1.0",
    type: "task-execution-event",
    taskId: normalizedTaskId,
    issueNumber,
    attemptId: normalizedAttemptId,
    statusVersion,
    from: normalizedFrom,
    to: normalizedTo,
    kind: normalizedKind,
    createdAt: timestamp.toISOString(),
    ...(details === undefined ? {} : { details: boundedDetails(details) }),
  };
}

export function taskResultHash({ taskId, issueNumber, attemptId, result }) {
  const normalizedTaskId = String(taskId ?? "").trim();
  if (!normalizedTaskId) throw new Error("Invalid task id.");
  assertPositiveInteger(issueNumber, "Task issue number");
  assertAttemptId(attemptId);
  return createHash("sha256")
    .update(stableJson({ taskId: normalizedTaskId, issueNumber, result }), "utf8")
    .digest("hex");
}

export function createTaskResultRecord({
  taskId,
  issueNumber,
  attemptId,
  statusVersion,
  result,
  createdAt = new Date().toISOString(),
} = {}) {
  assertPositiveInteger(statusVersion, "Task result status version");
  if (!result || typeof result !== "object" || Array.isArray(result)) throw new Error("Task result must be an object.");
  const timestamp = new Date(createdAt);
  if (Number.isNaN(timestamp.getTime())) throw new Error("Invalid task result timestamp.");
  const record = {
    schemaVersion: "1.0",
    type: "task-result",
    taskId: String(taskId ?? "").trim(),
    issueNumber,
    attemptId: assertAttemptId(attemptId),
    statusVersion,
    createdAt: timestamp.toISOString(),
    resultHash: taskResultHash({ taskId, issueNumber, attemptId, result }),
    result,
  };
  if (!record.taskId) throw new Error("Invalid task id.");
  return record;
}

function markedComment(marker, payload) {
  const encoded = JSON.stringify(payload, null, 2);
  const body = `${marker}\n\n\`\`\`json\n${encoded}\n\`\`\``;
  if (Buffer.byteLength(body, "utf8") > TASK_EXECUTION_COMMENT_MAX_BYTES) {
    throw new Error("Task execution comment exceeds the allowed size.");
  }
  return body;
}

export function formatTaskExecutionComment(event) {
  return markedComment(TASK_EXECUTION_MARKER, createTaskExecutionEvent(event));
}

export function formatTaskResultComment(record) {
  return markedComment(TASK_RESULT_MARKER, createTaskResultRecord(record));
}

function parseMarkedComment(body, marker) {
  const text = String(body ?? "");
  const markerIndex = text.indexOf(marker);
  if (markerIndex < 0) return null;
  const fenceStart = text.indexOf("```json", markerIndex + marker.length);
  if (fenceStart < 0) throw new Error("Malformed task execution comment.");
  const payloadStart = text.indexOf("\n", fenceStart);
  if (payloadStart < 0) throw new Error("Malformed task execution comment.");
  const fenceEnd = text.indexOf("\n```", payloadStart + 1);
  if (fenceEnd < 0) throw new Error("Malformed task execution comment.");
  const payload = text.slice(payloadStart + 1, fenceEnd);
  if (Buffer.byteLength(payload, "utf8") > TASK_EXECUTION_COMMENT_MAX_BYTES) {
    throw new Error("Task execution comment exceeds the allowed size.");
  }
  try {
    return JSON.parse(payload);
  } catch {
    throw new Error("Malformed task execution JSON.");
  }
}

export function parseTaskExecutionComment(body) {
  const parsed = parseMarkedComment(body, TASK_EXECUTION_MARKER);
  return parsed ? createTaskExecutionEvent(parsed) : null;
}

export function parseTaskResultComment(body) {
  const parsed = parseMarkedComment(body, TASK_RESULT_MARKER);
  if (!parsed) return null;
  const validated = createTaskResultRecord(parsed);
  if (validated.resultHash !== parsed.resultHash) throw new Error("Task result hash verification failed.");
  return validated;
}

export function buildTaskTimeline(comments, { initialState = "queued", taskId, issueNumber } = {}) {
  const normalizedInitial = assertTaskState(initialState);
  const records = [];
  for (const comment of comments ?? []) {
    const event = parseTaskExecutionComment(comment?.body);
    if (event) records.push({ kind: "event", value: event });
    const result = parseTaskResultComment(comment?.body);
    if (result) records.push({ kind: "result", value: result });
  }
  records.sort((left, right) => left.value.statusVersion - right.value.statusVersion);

  const seenVersions = new Set();
  const events = [];
  let result = null;
  let state = normalizedInitial;
  let statusVersion = 0;
  let latestAttemptId = null;

  for (const record of records) {
    const value = record.value;
    if (taskId && value.taskId !== taskId) throw new Error("Task execution record belongs to a different task.");
    if (issueNumber && value.issueNumber !== issueNumber) throw new Error("Task execution record belongs to a different issue.");
    if (seenVersions.has(value.statusVersion) || value.statusVersion <= statusVersion) {
      throw new Error("Task status version is not strictly monotonic.");
    }
    seenVersions.add(value.statusVersion);
    statusVersion = value.statusVersion;
    latestAttemptId = value.attemptId;

    if (record.kind === "event") {
      if (value.from !== state) throw new Error(`Task execution timeline diverged at statusVersion ${value.statusVersion}.`);
      if (value.from !== value.to) assertTransition(value.from, value.to);
      state = value.to;
      events.push(value);
      continue;
    }

    if (state !== "verifying") throw new Error("Task result must be persisted while the task is verifying.");
    if (result && value.resultHash !== result.resultHash) throw new Error("Multiple conflicting task results were published.");
    result = value;
  }

  return {
    state,
    statusVersion,
    latestAttemptId,
    events,
    result,
  };
}
