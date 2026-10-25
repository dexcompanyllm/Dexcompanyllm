import test from "node:test";
import assert from "node:assert/strict";

import {
  formatTaskExecutionComment,
  formatTaskResultComment,
} from "../packages/core/src/task-execution.mjs";
import { executeBoundedTaskAttempt } from "../services/orchestrator/src/task-executor.mjs";
import { GitHubTaskRunStore } from "../services/mcp-gateway/src/task-run-store.mjs";
import { createMemoryOAuthReplayStore } from "../services/mcp-gateway/src/oauth-replay-store.mjs";

function taskBody() {
  return [
    "Dex Company Task Packet",
    "",
    "```yaml",
    'schemaVersion: "2.0"',
    "task:",
    "  id: DC-CLOSE-RECOVERY",
    "  title: Recover completed task close",
    "  status: queued",
    "project:",
    "  name: DexCompany-Runtime",
    "request:",
    "  source: test",
    "  objective: Recover issue close without replay.",
    "routing:",
    "  role: developer",
    "  requiredCapabilities: []",
    "  preferredProvider: openai",
    "execution:",
    "  riskLevel: low",
    "  idempotencyKey: close-recovery-test",
    "```",
  ].join("\n");
}

test("completed canonical result with an open GitHub issue is closed without replaying writer", async () => {
  const comments = [
    { body: formatTaskExecutionComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 1, from: "queued", to: "resolving-context" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 2, from: "resolving-context", to: "planning" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 3, from: "planning", to: "executing", kind: "writer-start" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 4, from: "executing", to: "executing", kind: "writer-finish", details: { writerResult: { finalText: "done", eventCount: 1 } } }) },
    { body: formatTaskExecutionComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 5, from: "executing", to: "verifying" }) },
    { body: formatTaskResultComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 6, result: { outcome: "PASS", writer: { finalText: "done", eventCount: 1 } } }) },
    { body: formatTaskExecutionComment({ taskId: "DC-CLOSE-RECOVERY", issueNumber: 28, attemptId: "attempt_old_001", statusVersion: 7, from: "verifying", to: "completed" }) },
  ];
  const issue = {
    number: 28,
    title: "[DEX-TASK] Recover completed task close",
    state: "open",
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
      if (path === "/repos/octo/example/issues/28" && init.method === "PATCH") {
        issue.state = JSON.parse(init.body).state;
        return structuredClone(issue);
      }
      throw new Error(`Unexpected request: ${init.method ?? "GET"} ${path}`);
    },
  };
  const store = new GitHubTaskRunStore(repositoryStore);
  let writerCalls = 0;
  const result = await executeBoundedTaskAttempt({
    store,
    issueNumber: 28,
    attemptId: "attempt_recover_002",
    writer: async () => { writerCalls += 1; return { finalText: "must not run", eventCount: 0 }; },
    watchdog: async () => ({ verdict: "PASS", summary: "unused", checks: [] }),
    verifier: async () => ({ verdict: "PASS", summary: "unused", checks: [], readOnly: true }),
  });

  assert.equal(result.outcome, "completed");
  assert.equal(result.recovered, true);
  assert.equal(result.callbackDelivered, false);
  assert.equal(writerCalls, 0);
  assert.equal(issue.state, "closed");
  assert.equal((await store.getTaskStatus(28)).state, "completed");
});
