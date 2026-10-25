import assert from "node:assert/strict";
import test from "node:test";

import YAML from "yaml";
import {
  formatTaskExecutionComment,
  formatTaskResultComment,
} from "../packages/core/src/task-execution.mjs";
import { GitHubTaskRunStore } from "../services/mcp-gateway/src/task-run-store.mjs";

const TASK_ID = "DC-20260901-ABC123";
const ISSUE_NUMBER = 42;
const ATTEMPT_ID = "attempt-01";

function taskIssue(number = ISSUE_NUMBER, taskId = TASK_ID) {
  const packet = {
    schemaVersion: "2.0",
    task: {
      id: taskId,
      title: "Canonical status-result retrieval",
      status: "queued",
    },
    execution: { checkpoint: "intake" },
  };
  return {
    number,
    title: "[DEX-TASK] Canonical status-result retrieval",
    body: `Dex Company Task Packet\n\n\`\`\`yaml\n${YAML.stringify(packet).trim()}\n\`\`\``,
    state: "closed",
    created_at: "2026-09-01T00:00:00.000Z",
    updated_at: "2026-09-01T00:06:00.000Z",
    html_url: `https://github.com/dex-test/runtime/issues/${number}`,
  };
}

function timelineComments() {
  const events = [
    { statusVersion: 1, from: "queued", to: "resolving-context", kind: "transition" },
    { statusVersion: 2, from: "resolving-context", to: "planning", kind: "transition" },
    { statusVersion: 3, from: "planning", to: "executing", kind: "writer-start" },
    { statusVersion: 4, from: "executing", to: "verifying", kind: "writer-finish" },
  ].map((event) => ({
    body: formatTaskExecutionComment({
      taskId: TASK_ID,
      issueNumber: ISSUE_NUMBER,
      attemptId: ATTEMPT_ID,
      createdAt: `2026-09-01T00:0${event.statusVersion}:00.000Z`,
      ...event,
    }),
  }));
  const result = {
    body: formatTaskResultComment({
      taskId: TASK_ID,
      issueNumber: ISSUE_NUMBER,
      attemptId: ATTEMPT_ID,
      statusVersion: 5,
      createdAt: "2026-09-01T00:05:00.000Z",
      result: {
        verdict: "PASS",
        acceptance: [{ criterion: "status/result retrieval", verdict: "PASS", evidence: "ci:test" }],
      },
    }),
  };
  const completed = {
    body: formatTaskExecutionComment({
      taskId: TASK_ID,
      issueNumber: ISSUE_NUMBER,
      attemptId: ATTEMPT_ID,
      statusVersion: 6,
      from: "verifying",
      to: "completed",
      kind: "verification-pass",
      createdAt: "2026-09-01T00:06:00.000Z",
    }),
  };
  return [...events, result, completed];
}

function repositoryStore({ searchItems = [taskIssue()], comments = timelineComments() } = {}) {
  const calls = [];
  return {
    calls,
    owner: "dex-test",
    name: "runtime",
    idempotencyStore: {},
    async idempotencyOperation(operation) { return operation(); },
    async request(path) {
      calls.push(path);
      if (path.startsWith("/search/issues?")) return { items: searchItems };
      if (path === `/repos/dex-test/runtime/issues/${ISSUE_NUMBER}`) return taskIssue();
      if (path === `/repos/dex-test/runtime/issues/${ISSUE_NUMBER}/comments?per_page=100`) return comments;
      throw new Error(`Unexpected GitHub path: ${path}`);
    },
  };
}

test("canonical Task ID and issue reference return the same bounded status and result", async () => {
  const repository = repositoryStore();
  const store = new GitHubTaskRunStore(repository);

  const status = await store.getTaskStatus(TASK_ID);
  assert.equal(status.taskId, TASK_ID);
  assert.equal(status.issueNumber, ISSUE_NUMBER);
  assert.equal(status.state, "completed");
  assert.equal(status.statusVersion, 6);
  assert.equal(status.resultAvailable, true);
  assert.equal(status.events.length, 5);
  assert.equal(status.packet.execution.checkpoint, "intake");

  const result = await store.getTaskResult(`issue:${ISSUE_NUMBER}`);
  assert.equal(result.taskId, TASK_ID);
  assert.equal(result.state, "completed");
  assert.equal(result.statusVersion, 6);
  assert.equal(result.result.verdict, "PASS");
  assert.equal(result.result.acceptance[0].evidence, "ci:test");
  assert.match(result.resultHash, /^[a-f0-9]{64}$/);

  assert.equal(repository.calls.filter((path) => path.startsWith("/search/issues?")).length, 1);
});

test("duplicate canonical Task IDs fail closed before a result is returned", async () => {
  const repository = repositoryStore({ searchItems: [taskIssue(42), taskIssue(43)] });
  const store = new GitHubTaskRunStore(repository);

  await assert.rejects(
    store.getTaskStatus(TASK_ID),
    (error) => error.code === "TASK_ID_CONFLICT" && error.status === 409,
  );
});

test("malformed issue references are rejected without a GitHub request", async () => {
  const repository = repositoryStore();
  const store = new GitHubTaskRunStore(repository);

  await assert.rejects(
    store.getTaskStatus("issue:0"),
    (error) => error.code === "TASK_REFERENCE_INVALID" && error.status === 400,
  );
  assert.equal(repository.calls.length, 0);
});
