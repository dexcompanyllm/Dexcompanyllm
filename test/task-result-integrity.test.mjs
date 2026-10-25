import test from "node:test";
import assert from "node:assert/strict";

import {
  createTaskResultRecord,
  formatTaskExecutionComment,
  formatTaskResultComment,
  parseTaskResultComment,
  taskResultHash,
} from "../packages/core/src/task-execution.mjs";
import { GitHubTaskRunStore } from "../services/mcp-gateway/src/task-run-store.mjs";
import { createMemoryOAuthReplayStore } from "../services/mcp-gateway/src/oauth-replay-store.mjs";

function taskBody() {
  return [
    "Dex Company Task Packet",
    "",
    "```yaml",
    'schemaVersion: "2.0"',
    "task:",
    "  id: DC-INTEGRITY-TEST",
    "  title: Integrity test",
    "  status: queued",
    "project:",
    "  name: DexCompany-Runtime",
    "request:",
    "  source: test",
    "  objective: Verify result and issue guards.",
    "routing:",
    "  requiredCapabilities: []",
    "execution:",
    "  riskLevel: low",
    "  idempotencyKey: integrity-test",
    "```",
  ].join("\n");
}

function createStore({ comments = [], githubState = "open" } = {}) {
  const issue = {
    number: 28,
    title: "[DEX-TASK] Integrity test",
    state: githubState,
    html_url: "https://github.com/octo/example/issues/28",
    body: taskBody(),
  };
  const idempotencyStore = createMemoryOAuthReplayStore();
  const repositoryStore = {
    owner: "octo",
    name: "example",
    idempotencyStore,
    async idempotencyOperation(operation) { return operation(); },
    async request(path, init = {}) {
      if (path === "/repos/octo/example/issues/28" && !init.method) return structuredClone(issue);
      if (path === "/repos/octo/example/issues/28/comments?per_page=100" && !init.method) return structuredClone(comments);
      if (path === "/repos/octo/example/issues/28/comments" && init.method === "POST") {
        const body = JSON.parse(init.body).body;
        comments.push({ id: comments.length + 1, body });
        return { id: comments.length, body };
      }
      throw new Error(`Unexpected request: ${init.method ?? "GET"} ${path}`);
    },
  };
  return { issue, comments, idempotencyStore, store: new GitHubTaskRunStore(repositoryStore) };
}

test("canonical result identity is stable across attempts and JSON round trips", () => {
  const result = {
    outcome: "PASS",
    writer: {
      finalText: "ok",
      optional: undefined,
      modelSelection: { effectiveModel: "gpt-test", migration: undefined },
    },
  };
  const firstHash = taskResultHash({
    taskId: "DC-INTEGRITY-TEST",
    issueNumber: 28,
    attemptId: "attempt_hash_001",
    result,
  });
  const secondHash = taskResultHash({
    taskId: "DC-INTEGRITY-TEST",
    issueNumber: 28,
    attemptId: "attempt_hash_002",
    result: JSON.parse(JSON.stringify(result)),
  });
  assert.equal(firstHash, secondHash);

  const record = createTaskResultRecord({
    taskId: "DC-INTEGRITY-TEST",
    issueNumber: 28,
    attemptId: "attempt_hash_001",
    statusVersion: 7,
    result,
  });
  const reparsed = parseTaskResultComment(formatTaskResultComment(record));
  assert.equal(reparsed.resultHash, firstHash);
});

test("a prematurely closed GitHub issue fails closed before any execution claim", async () => {
  const { store } = createStore({ githubState: "closed" });
  await assert.rejects(
    () => store.claimAttempt(28, "attempt_closed_001"),
    (error) => error?.code === "TASK_ISSUE_STATE_CONFLICT" && error?.status === 409,
  );
});

test("execution event secret scan blocks before a GitHub comment is written", async () => {
  const harness = createStore();
  await harness.store.claimAttempt(28, "attempt_secret_001");
  const fakeSecretMaterial = ["Alpha7", "Beta9", "Gamma4", "Delta8", "Epsilon6"].join("");
  const fakeSecret = ["sk", "proj", fakeSecretMaterial].join("-");
  await assert.rejects(
    () => harness.store.publishEvent(28, "attempt_secret_001", {
      to: "resolving-context",
      details: { evidence: fakeSecret },
    }),
    (error) => error?.code === "TASK_EVENT_SECRET_DETECTED" && !error.message.includes(fakeSecret),
  );
  assert.equal(harness.comments.length, 0);
});

test("canonical result secret scan blocks before result reservation or publication", async () => {
  const comments = [
    { body: formatTaskExecutionComment({ taskId: "DC-INTEGRITY-TEST", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 1, from: "queued", to: "resolving-context" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-INTEGRITY-TEST", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 2, from: "resolving-context", to: "planning" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-INTEGRITY-TEST", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 3, from: "planning", to: "executing", kind: "writer-start" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-INTEGRITY-TEST", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 4, from: "executing", to: "executing", kind: "writer-finish", details: { writerResult: { finalText: "safe", eventCount: 1 } } }) },
    { body: formatTaskExecutionComment({ taskId: "DC-INTEGRITY-TEST", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 5, from: "executing", to: "verifying" }) },
  ];
  const harness = createStore({ comments });
  await harness.store.claimAttempt(28, "attempt_secret_002");
  const fakeSecretMaterial = ["Ab7x9", "Qp4Lm", "N8v2Z", "R5tY6", "K3cWd", "P9sUa"].join("");
  const fakeSecret = ["ghp", fakeSecretMaterial].join("_");
  await assert.rejects(
    () => harness.store.publishResult(28, "attempt_secret_002", {
      outcome: "PASS",
      verifier: { evidence: fakeSecret },
    }),
    (error) => error?.code === "TASK_RESULT_SECRET_DETECTED" && !error.message.includes(fakeSecret),
  );
  assert.equal(harness.comments.length, 5);
});
