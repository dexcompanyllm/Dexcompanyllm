import { createHash } from "node:crypto";
import YAML from "yaml";
import {
  assertAttemptId,
  buildTaskTimeline,
  createTaskExecutionEvent,
  createTaskResultRecord,
  formatTaskExecutionComment,
  formatTaskResultComment,
  parseTaskExecutionComment,
  parseTaskResultComment,
  taskResultHash,
} from "../../../packages/core/src/task-execution.mjs";
import { findSecretKinds } from "../../../scripts/check.mjs";

const TASK_ATTEMPT_LEASE_SECONDS = 60 * 60;
const TASK_EXECUTION_TTL_SECONDS = 31 * 24 * 60 * 60;
const TASK_COMMENT_LIMIT = 100;
const TASK_REFERENCE_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;

function taskStoreError(code, message, status = 500) {
  const error = new Error(message);
  error.name = "TaskRunStoreError";
  error.code = code;
  error.status = status;
  error.source = "github";
  return error;
}

function assertSafePublication(body, code) {
  const findings = findSecretKinds(String(body ?? ""));
  if (findings.length) {
    throw taskStoreError(code, "Task execution publication was blocked by the secret-scan boundary.", 409);
  }
  return body;
}

function assertIssueNumber(value) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) {
    throw taskStoreError("TASK_ISSUE_INVALID", "Task issue number is invalid.", 400);
  }
  return parsed;
}

function assertTaskReference(value) {
  if (Number.isSafeInteger(value) && value > 0) return value;
  const normalized = String(value ?? "").trim();
  const issueReference = normalized.match(/^issue:([1-9][0-9]*)$/);
  if (issueReference) return Number(issueReference[1]);
  if (normalized.startsWith("issue:")) {
    throw taskStoreError("TASK_REFERENCE_INVALID", "Task ID or issue reference is invalid.", 400);
  }
  if (/^[1-9][0-9]*$/.test(normalized)) return assertIssueNumber(normalized);
  if (!TASK_REFERENCE_PATTERN.test(normalized)) {
    throw taskStoreError("TASK_REFERENCE_INVALID", "Task ID or issue reference is invalid.", 400);
  }
  return normalized;
}

function taskStoreId(prefix, issueNumber, repositoryScope = "") {
  return createHash("sha256")
    .update(`${prefix}:${repositoryScope ? `${repositoryScope}:` : ""}${assertIssueNumber(issueNumber)}`, "utf8")
    .digest("base64url");
}

function parseTaskPacket(body) {
  const match = String(body ?? "").match(/```ya?ml\s*\r?\n([\s\S]*?)\r?\n```/i);
  if (!match) return null;
  try {
    const packet = YAML.parse(match[1]);
    return packet && typeof packet === "object" ? packet : null;
  } catch {
    return null;
  }
}

function validateTaskIssue(issue, issueNumber) {
  if (
    issue?.pull_request
    || issue?.number !== issueNumber
    || !String(issue?.title ?? "").startsWith("[DEX-TASK]")
  ) {
    throw taskStoreError("TASK_ISSUE_NOT_FOUND", "The requested Dex task issue was not found.", 404);
  }
  const packet = parseTaskPacket(issue.body);
  if (!packet?.task?.id || !packet?.task?.status) {
    throw taskStoreError("TASK_PACKET_INVALID", "The Dex task issue contains an invalid Task Packet.", 409);
  }
  return packet;
}

function latestEvent(events, kind) {
  for (let index = events.length - 1; index >= 0; index -= 1) {
    if (events[index].kind === kind) return events[index];
  }
  return null;
}

function boundedLease(value) {
  const parsed = Number(value ?? TASK_ATTEMPT_LEASE_SECONDS);
  if (!Number.isSafeInteger(parsed) || parsed < 60 || parsed > TASK_ATTEMPT_LEASE_SECONDS) {
    throw taskStoreError("TASK_ATTEMPT_LEASE_INVALID", "Task attempt lease is invalid.", 400);
  }
  return parsed;
}

export class GitHubTaskRunStore {
  constructor(repositoryStore) {
    if (!repositoryStore?.request || !repositoryStore?.idempotencyOperation || !repositoryStore?.idempotencyStore) {
      throw new TypeError("GitHubTaskRunStore requires a GitHubStore instance.");
    }
    if (![repositoryStore.owner, repositoryStore.name].every(value =>
      typeof value === "string" && /^[A-Za-z0-9_.-]+$/.test(value) && value !== "." && value !== "..")) {
      throw new TypeError("Task coordination requires an explicit repository owner and name.");
    }
    this.coordinationScope = `${repositoryStore.owner}/${repositoryStore.name}`.toLowerCase();
    this.repositoryStore = repositoryStore;
    this.idempotencyStore = repositoryStore.idempotencyStore;
  }

  async fetchTaskIssue(issueNumber) {
    const number = assertIssueNumber(issueNumber);
    const issue = await this.repositoryStore.request(
      `/repos/${this.repositoryStore.owner}/${this.repositoryStore.name}/issues/${number}`,
    );
    const packet = validateTaskIssue(issue, number);
    return { issue, packet };
  }

  async listTaskComments(issueNumber) {
    const number = assertIssueNumber(issueNumber);
    const comments = await this.repositoryStore.request(
      `/repos/${this.repositoryStore.owner}/${this.repositoryStore.name}/issues/${number}/comments?per_page=${TASK_COMMENT_LIMIT}`,
    );
    if (!Array.isArray(comments)) {
      throw taskStoreError("TASK_COMMENTS_INVALID", "GitHub returned invalid task comments.", 502);
    }
    if (comments.length >= TASK_COMMENT_LIMIT) {
      throw taskStoreError(
        "TASK_EVENT_LIMIT_EXCEEDED",
        "The bounded Task execution event limit was reached; manual reconciliation is required.",
        409,
      );
    }
    return comments;
  }

  async resolveIssueNumber(taskReference) {
    const reference = assertTaskReference(taskReference);
    if (Number.isSafeInteger(reference)) return reference;

    const query = encodeURIComponent(
      `repo:${this.repositoryStore.owner}/${this.repositoryStore.name} is:issue in:body "${reference}"`,
    );
    const payload = await this.repositoryStore.request(`/search/issues?q=${query}&per_page=10`);
    if (!Array.isArray(payload?.items)) {
      throw taskStoreError("TASK_SEARCH_INVALID", "GitHub returned an invalid task search result.", 502);
    }

    const matches = [];
    for (const issue of payload.items) {
      if (issue?.pull_request || !Number.isSafeInteger(issue?.number)) continue;
      try {
        const packet = validateTaskIssue(issue, issue.number);
        if (packet.task.id === reference) matches.push(issue.number);
      } catch {
        // GitHub search can return partial or unrelated matches. Only an exact,
        // fully validated canonical Task Packet is eligible for retrieval.
      }
    }
    if (matches.length === 0) {
      throw taskStoreError("TASK_ISSUE_NOT_FOUND", "The requested Dex task issue was not found.", 404);
    }
    if (matches.length > 1) {
      throw taskStoreError(
        "TASK_ID_CONFLICT",
        "Multiple GitHub issues claim the same canonical Task ID; manual reconciliation is required.",
        409,
      );
    }
    return matches[0];
  }

  async getTaskStatus(taskReference) {
    const number = await this.resolveIssueNumber(taskReference);
    const [{ issue, packet }, comments] = await Promise.all([
      this.fetchTaskIssue(number),
      this.listTaskComments(number),
    ]);
    let timeline;
    try {
      timeline = buildTaskTimeline(comments, {
        initialState: packet.task.status,
        taskId: packet.task.id,
        issueNumber: number,
      });
    } catch (error) {
      throw taskStoreError("TASK_TIMELINE_INVALID", error.message, 409);
    }

    const writerStarted = latestEvent(timeline.events, "writer-start");
    const writerFinished = latestEvent(timeline.events, "writer-finish");
    const unresolvedWriter = timeline.state === "executing"
      && writerStarted
      && (!writerFinished || writerFinished.statusVersion < writerStarted.statusVersion);

    return {
      issueNumber: number,
      taskId: packet.task.id,
      title: packet.task.title,
      githubState: issue.state,
      createdAt: issue.created_at,
      updatedAt: issue.updated_at,
      state: timeline.state,
      statusVersion: timeline.statusVersion,
      latestAttemptId: timeline.latestAttemptId,
      resultAvailable: Boolean(timeline.result),
      resultHash: timeline.result?.resultHash ?? null,
      unresolvedWriter: Boolean(unresolvedWriter),
      packet,
      events: timeline.events,
      resultRecord: timeline.result,
      url: issue.html_url,
    };
  }

  async getTaskResult(taskReference) {
    const status = await this.getTaskStatus(taskReference);
    if (!status.resultRecord) {
      throw taskStoreError("TASK_RESULT_NOT_READY", "The task result is not available yet.", 404);
    }
    return {
      issueNumber: status.issueNumber,
      taskId: status.taskId,
      state: status.state,
      statusVersion: status.statusVersion,
      resultHash: status.resultRecord.resultHash,
      createdAt: status.resultRecord.createdAt,
      result: status.resultRecord.result,
      url: status.url,
    };
  }

  async claimAttempt(issueNumber, attemptId, { leaseSeconds = TASK_ATTEMPT_LEASE_SECONDS } = {}) {
    const number = assertIssueNumber(issueNumber);
    const normalizedAttemptId = assertAttemptId(attemptId);
    // Old keys did not identify their repository. Never adopt or clear an old lease.
    // All consumers must be stopped/drained before this key migration is deployed.
    const legacyAttempt = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.get(
      "task-execution", taskStoreId("task-execution", number),
    ));
    if (legacyAttempt !== null) {
      throw taskStoreError("TASK_LEGACY_COORDINATION_PRESENT",
        "Legacy task coordination requires stopped consumers and lease reconciliation before execution.", 409);
    }
    const statusBefore = await this.getTaskStatus(number);
    if (statusBefore.githubState === "closed" && !["completed", "cancelled"].includes(statusBefore.state)) {
      throw taskStoreError(
        "TASK_ISSUE_STATE_CONFLICT",
        "The GitHub task issue is closed before the canonical task state is terminal.",
        409,
      );
    }
    const fullyTerminal = statusBefore.state === "cancelled"
      || (statusBefore.state === "completed" && statusBefore.githubState === "closed");
    if (fullyTerminal) {
      return { claimed: false, terminal: true, status: statusBefore, reconciliationRequired: false };
    }

    const id = taskStoreId("task-execution", number, this.coordinationScope);
    const value = `active:${normalizedAttemptId}`;
    const claim = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.claim(
      "task-execution",
      id,
      value,
      boundedLease(leaseSeconds),
    ));
    if (!claim.claimed && claim.existing !== value) {
      return { claimed: false, terminal: false, busy: true, status: statusBefore, reconciliationRequired: false };
    }

    const status = await this.getTaskStatus(number);
    return {
      claimed: true,
      existing: !claim.claimed,
      terminal: false,
      busy: false,
      status,
      reconciliationRequired: Boolean(status.unresolvedWriter),
    };
  }

  async assertActiveAttempt(issueNumber, attemptId) {
    const number = assertIssueNumber(issueNumber);
    const normalizedAttemptId = assertAttemptId(attemptId);
    const id = taskStoreId("task-execution", number, this.coordinationScope);
    const active = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.get(
      "task-execution",
      id,
    ));
    if (active !== `active:${normalizedAttemptId}`) {
      throw taskStoreError("TASK_ATTEMPT_STALE", "The task attempt is no longer active.", 409);
    }
    return true;
  }

  async renewAttempt(issueNumber, attemptId, { leaseSeconds = TASK_ATTEMPT_LEASE_SECONDS } = {}) {
    const number = assertIssueNumber(issueNumber);
    const normalizedAttemptId = assertAttemptId(attemptId);
    const id = taskStoreId("task-execution", number, this.coordinationScope);
    const value = `active:${normalizedAttemptId}`;
    const renewed = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.compareAndSet(
      "task-execution",
      id,
      value,
      value,
      boundedLease(leaseSeconds),
    ));
    if (!renewed) throw taskStoreError("TASK_ATTEMPT_STALE", "The task attempt is no longer active.", 409);
    return true;
  }

  async releaseAttempt(issueNumber, attemptId) {
    const number = assertIssueNumber(issueNumber);
    const normalizedAttemptId = assertAttemptId(attemptId);
    const id = taskStoreId("task-execution", number, this.coordinationScope);
    const released = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.compareAndSet(
      "task-execution",
      id,
      `active:${normalizedAttemptId}`,
      `released:${normalizedAttemptId}`,
      1,
    ));
    if (!released) throw taskStoreError("TASK_ATTEMPT_STALE", "The task attempt is no longer active.", 409);
    return true;
  }

  async nextStatusVersion(issueNumber, currentVersion) {
    const number = assertIssueNumber(issueNumber);
    const id = taskStoreId("task-status", number, this.coordinationScope);
    const existing = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.get(
      "task-status",
      id,
    ));
    if (existing === null && currentVersion > 0) {
      const seeded = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.claim(
        "task-status",
        id,
        String(currentVersion),
        TASK_EXECUTION_TTL_SECONDS,
      ));
      if (!seeded.claimed && Number(seeded.existing) < currentVersion) {
        throw taskStoreError(
          "TASK_STATUS_COUNTER_STALE",
          "The durable task status counter is stale; manual reconciliation is required.",
          409,
        );
      }
    } else if (existing !== null && Number(existing) < currentVersion) {
      throw taskStoreError(
        "TASK_STATUS_COUNTER_STALE",
        "The durable task status counter is stale; manual reconciliation is required.",
        409,
      );
    }
    const next = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.increment(
      "task-status",
      id,
      TASK_EXECUTION_TTL_SECONDS,
    ));
    if (!Number.isSafeInteger(next) || next <= currentVersion) {
      throw taskStoreError(
        "TASK_STATUS_COUNTER_STALE",
        "The durable task status counter is stale; manual reconciliation is required.",
        409,
      );
    }
    return next;
  }

  async publishEvent(issueNumber, attemptId, { to, kind = "transition", details } = {}) {
    const number = assertIssueNumber(issueNumber);
    const normalizedAttemptId = assertAttemptId(attemptId);
    await this.assertActiveAttempt(number, normalizedAttemptId);
    assertSafePublication(JSON.stringify(details ?? {}), "TASK_EVENT_SECRET_DETECTED");
    const status = await this.getTaskStatus(number);
    const statusVersion = await this.nextStatusVersion(number, status.statusVersion);
    const event = createTaskExecutionEvent({
      taskId: status.taskId,
      issueNumber: number,
      attemptId: normalizedAttemptId,
      statusVersion,
      from: status.state,
      to: to ?? status.state,
      kind,
      details,
    });
    const body = assertSafePublication(formatTaskExecutionComment(event), "TASK_EVENT_SECRET_DETECTED");
    const comment = await this.repositoryStore.request(
      `/repos/${this.repositoryStore.owner}/${this.repositoryStore.name}/issues/${number}/comments`,
      { method: "POST", body: JSON.stringify({ body }) },
    );
    const published = parseTaskExecutionComment(comment?.body);
    if (!published || published.statusVersion !== event.statusVersion || published.attemptId !== normalizedAttemptId) {
      throw taskStoreError("TASK_EVENT_PUBLICATION_INVALID", "GitHub returned an invalid task execution event.", 502);
    }
    return published;
  }

  async publishResult(issueNumber, attemptId, result) {
    const number = assertIssueNumber(issueNumber);
    const normalizedAttemptId = assertAttemptId(attemptId);
    await this.assertActiveAttempt(number, normalizedAttemptId);
    assertSafePublication(JSON.stringify(result), "TASK_RESULT_SECRET_DETECTED");
    const status = await this.getTaskStatus(number);
    if (status.state !== "verifying") {
      throw taskStoreError("TASK_RESULT_STATE_INVALID", "Task results may only be persisted while verifying.", 409);
    }
    const hash = taskResultHash({
      taskId: status.taskId,
      issueNumber: number,
      attemptId: normalizedAttemptId,
      result,
    });
    if (status.resultRecord) {
      if (status.resultRecord.resultHash === hash) return status.resultRecord;
      throw taskStoreError("TASK_RESULT_CONFLICT", "A different canonical task result already exists.", 409);
    }
    const resultId = taskStoreId("task-result", number, this.coordinationScope);
    const resultClaim = await this.repositoryStore.idempotencyOperation(() => this.idempotencyStore.claim(
      "task-result",
      resultId,
      hash,
      TASK_EXECUTION_TTL_SECONDS,
    ));
    if (!resultClaim.claimed) {
      if (resultClaim.existing !== hash) {
        throw taskStoreError("TASK_RESULT_CONFLICT", "A different canonical task result already exists.", 409);
      }
      const reconciled = await this.getTaskStatus(number);
      if (reconciled.resultRecord?.resultHash === hash) return reconciled.resultRecord;
      throw taskStoreError(
        "TASK_RESULT_PUBLICATION_UNCERTAIN",
        "The canonical result may have been published; automatic writer replay is blocked until reconciliation.",
        409,
      );
    }

    const statusVersion = await this.nextStatusVersion(number, status.statusVersion);
    const record = createTaskResultRecord({
      taskId: status.taskId,
      issueNumber: number,
      attemptId: normalizedAttemptId,
      statusVersion,
      result,
    });
    const body = assertSafePublication(formatTaskResultComment(record), "TASK_RESULT_SECRET_DETECTED");
    const comment = await this.repositoryStore.request(
      `/repos/${this.repositoryStore.owner}/${this.repositoryStore.name}/issues/${number}/comments`,
      { method: "POST", body: JSON.stringify({ body }) },
    );
    const published = parseTaskResultComment(comment?.body);
    if (!published || published.resultHash !== record.resultHash) {
      throw taskStoreError("TASK_RESULT_PUBLICATION_INVALID", "GitHub returned an invalid canonical task result.", 502);
    }
    return published;
  }

  async closeCompletedIssue(issueNumber, attemptId) {
    const number = assertIssueNumber(issueNumber);
    await this.assertActiveAttempt(number, attemptId);
    const status = await this.getTaskStatus(number);
    if (status.state !== "completed" || !status.resultAvailable) {
      throw taskStoreError("TASK_COMPLETION_INVALID", "A task cannot close before a canonical completed result exists.", 409);
    }
    if (status.githubState === "closed") return status;
    await this.repositoryStore.request(
      `/repos/${this.repositoryStore.owner}/${this.repositoryStore.name}/issues/${number}`,
      { method: "PATCH", body: JSON.stringify({ state: "closed" }) },
    );
    return this.getTaskStatus(number);
  }
}
