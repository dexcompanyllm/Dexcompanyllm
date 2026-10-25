import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";

import {
  buildTaskTimeline,
  formatTaskExecutionComment,
  formatTaskResultComment,
} from "../packages/core/src/task-execution.mjs";
import { executeBoundedTaskAttempt } from "../services/orchestrator/src/task-executor.mjs";
import { GitHubTaskRunStore } from "../services/mcp-gateway/src/task-run-store.mjs";
import { createMemoryOAuthReplayStore } from "../services/mcp-gateway/src/oauth-replay-store.mjs";

function taskBody({ riskLevel = "low", approvalRequired = false } = {}) {
  return [
    "Dex Company Task Packet",
    "",
    "```yaml",
    'schemaVersion: "2.0"',
    "task:",
    "  id: DC-ISSUE28-TEST",
    "  title: Bounded task test",
    "  status: queued",
    "project:",
    "  name: DexCompany-Runtime",
    "  baseRef: main",
    "request:",
    "  source: test",
    "  objective: Verify bounded execution.",
    "routing:",
    "  role: developer",
    "  requiredCapabilities:",
    "    - edit-repository",
    "  preferredProvider: openai",
    "constraints:",
    `  approvalRequired: ${approvalRequired ? "true" : "false"}`,
    "execution:",
    `  riskLevel: ${riskLevel}`,
    "  idempotencyKey: issue28-test-idem",
    "```",
  ].join("\n");
}

function createHarness(options = {}) {
  const nowRef = { value: 1_800_000_000 };
  const comments = [];
  const issue = {
    number: 28,
    title: "[DEX-TASK] Bounded task test",
    state: "open",
    html_url: "https://github.com/octo/example/issues/28",
    body: taskBody(options),
  };
  const idempotencyStore = options.idempotencyStore ?? createMemoryOAuthReplayStore({ now: () => nowRef.value });
  const owner = options.owner ?? "octo";
  const name = options.repositoryName ?? "example";
  const issuePath = `/repos/${owner}/${name}/issues/28`;
  const repositoryStore = {
    owner,
    name,
    idempotencyStore,
    async idempotencyOperation(operation) { return operation(); },
    async request(path, init = {}) {
      if (path === issuePath && !init.method) return structuredClone(issue);
      if (path === `${issuePath}/comments?per_page=100` && !init.method) {
        return structuredClone(comments);
      }
      if (path === `${issuePath}/comments` && init.method === "POST") {
        const body = JSON.parse(init.body).body;
        comments.push({ id: comments.length + 1, body });
        return { id: comments.length, body };
      }
      if (path === issuePath && init.method === "PATCH") {
        issue.state = JSON.parse(init.body).state;
        return structuredClone(issue);
      }
      throw new Error(`Unexpected request: ${init.method ?? "GET"} ${path}`);
    },
  };
  return {
    nowRef,
    comments,
    issue,
    repositoryStore,
    store: new GitHubTaskRunStore(repositoryStore),
    advance(seconds = 2) { nowRef.value += seconds; },
  };
}

function passWatchdog() {
  return {
    verdict: "PASS",
    summary: "Deterministic checks passed.",
    checks: [{ name: "tests", status: "PASS", evidence: "fake deterministic evidence" }],
  };
}

function passVerifier() {
  return {
    verdict: "PASS",
    summary: "Detached read-only review passed.",
    readOnly: true,
    checks: [{ name: "review", status: "PASS", evidence: "separate review run" }],
  };
}

test("task timeline validates one monotonic canonical result between verifying and completed", () => {
  const comments = [
    { body: formatTaskExecutionComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 1, from: "queued", to: "resolving-context" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 2, from: "resolving-context", to: "planning" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 3, from: "planning", to: "executing", kind: "writer-start" }) },
    { body: formatTaskExecutionComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 4, from: "executing", to: "executing", kind: "writer-finish", details: { writerResult: { finalText: "ok", eventCount: 1 } } }) },
    { body: formatTaskExecutionComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 5, from: "executing", to: "verifying" }) },
    { body: formatTaskResultComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 6, result: { outcome: "PASS" } }) },
    { body: formatTaskExecutionComment({ taskId: "DC-1", issueNumber: 7, attemptId: "attempt_001", statusVersion: 7, from: "verifying", to: "completed" }) },
  ];
  const timeline = buildTaskTimeline(comments, { taskId: "DC-1", issueNumber: 7 });
  assert.equal(timeline.state, "completed");
  assert.equal(timeline.statusVersion, 7);
  assert.equal(timeline.result.result.outcome, "PASS");
  assert.match(timeline.result.resultHash, /^[a-f0-9]{64}$/);
});

test("ten concurrent consumers produce exactly one execution claim", async () => {
  const harness = createHarness();
  const claims = await Promise.all(Array.from({ length: 10 }, (_, index) => (
    harness.store.claimAttempt(28, `attempt_${String(index).padStart(3, "0")}`)
  )));
  assert.equal(claims.filter((claim) => claim.claimed).length, 1);
  assert.equal(claims.filter((claim) => claim.busy).length, 9);
});

test("bounded engine persists result before callback and callback loss never replays writer", async () => {
  const harness = createHarness();
  let writerCalls = 0;
  let callbackCalls = 0;
  const first = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_success_001",
    writer: async () => {
      writerCalls += 1;
      return { finalText: "writer complete", eventCount: 12, commit: "abc123" };
    },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
    onResult: async () => {
      callbackCalls += 1;
      throw new Error("callback transport lost");
    },
  });
  assert.equal(first.outcome, "completed");
  assert.equal(first.callbackDelivered, false);
  assert.equal(writerCalls, 1);
  assert.equal(callbackCalls, 1);
  assert.equal(harness.issue.state, "closed");
  const status = await harness.store.getTaskStatus(28);
  assert.equal(status.state, "completed");
  assert.equal(status.resultAvailable, true);
  assert.equal(status.resultRecord.result.writer.commit, "abc123");

  harness.advance();
  const retry = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_success_002",
    writer: async () => { writerCalls += 1; return { finalText: "must not run", eventCount: 0 }; },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(retry.outcome, "terminal");
  assert.equal(writerCalls, 1);
});

test("high-risk approval and offline host paths create zero writer calls", async () => {
  const approvalHarness = createHarness({ riskLevel: "high" });
  let writerCalls = 0;
  const awaiting = await executeBoundedTaskAttempt({
    store: approvalHarness.store,
    issueNumber: 28,
    attemptId: "attempt_approval_001",
    approval: { granted: false },
    writer: async () => { writerCalls += 1; return { finalText: "unexpected", eventCount: 0 }; },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(awaiting.outcome, "awaiting-approval");
  assert.equal(writerCalls, 0);
  assert.equal((await approvalHarness.store.getTaskStatus(28)).state, "awaiting-approval");

  const offlineHarness = createHarness();
  const waiting = await executeBoundedTaskAttempt({
    store: offlineHarness.store,
    issueNumber: 28,
    attemptId: "attempt_offline_001",
    hostReady: false,
    writer: async () => { writerCalls += 1; return { finalText: "unexpected", eventCount: 0 }; },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(waiting.outcome, "waiting-for-host");
  assert.equal(writerCalls, 0);
});

test("high-risk execution accepts only a Task-and-attempt-bound one-time approval", async () => {
  const harness = createHarness({ riskLevel: "high" });
  let writerCalls = 0;
  const pending = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_bound_approval_001",
    approval: { granted: true },
    writer: async () => { writerCalls += 1; return { finalText: "unexpected", eventCount: 0 }; },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(pending.outcome, "awaiting-approval");
  assert.equal(writerCalls, 0);

  harness.advance();
  const approvedAttemptId = "attempt_bound_approval_002";
  const approved = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: approvedAttemptId,
    approval: {
      granted: true,
      mode: "one-time",
      taskId: "DC-ISSUE28-TEST",
      attemptId: approvedAttemptId,
      expiresAt: "2099-01-01T00:00:00.000Z",
    },
    writer: async () => { writerCalls += 1; return { finalText: "approved", eventCount: 1 }; },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(approved.outcome, "completed");
  assert.equal(writerCalls, 1);
});

test("status counter safely reseeds from the canonical timeline after a local broker restart", async () => {
  const harness = createHarness();
  await harness.store.claimAttempt(28, "attempt_restart_001");
  await harness.store.publishEvent(28, "attempt_restart_001", { to: "resolving-context" });
  await harness.store.releaseAttempt(28, "attempt_restart_001");

  const restartedRepositoryStore = {
    ...harness.repositoryStore,
    idempotencyStore: createMemoryOAuthReplayStore({ now: () => harness.nowRef.value + 2 }),
  };
  const restarted = new GitHubTaskRunStore(restartedRepositoryStore);
  await restarted.claimAttempt(28, "attempt_restart_002");
  const event = await restarted.publishEvent(28, "attempt_restart_002", { to: "planning" });
  assert.equal(event.statusVersion, 2);
  assert.equal((await restarted.getTaskStatus(28)).state, "planning");
});

test("writer error blocks automatic replay and requires reconciliation", async () => {
  const harness = createHarness();
  let writerCalls = 0;
  const failed = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_writer_error_001",
    writer: async () => {
      writerCalls += 1;
      throw new Error("connection lost after possible mutation");
    },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(failed.outcome, "reconciliation-required");
  assert.equal(writerCalls, 1);
  assert.equal((await harness.store.getTaskStatus(28)).state, "blocked");

  harness.advance();
  const retry = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_writer_error_002",
    writer: async () => { writerCalls += 1; return { finalText: "must not replay", eventCount: 0 }; },
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  assert.equal(retry.outcome, "blocked");
  assert.equal(writerCalls, 1);
});

test("failed verifier resumes from durable writer checkpoint without replaying writer", async () => {
  const harness = createHarness();
  let writerCalls = 0;
  let verifierCalls = 0;
  const first = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_verify_001",
    writer: async () => {
      writerCalls += 1;
      return { finalText: "writer checkpoint", eventCount: 5, diffHash: "diff-001" };
    },
    watchdog: async () => passWatchdog(),
    verifier: async () => {
      verifierCalls += 1;
      return { ...passVerifier(), verdict: "FAIL", summary: "review failed" };
    },
  });
  assert.equal(first.outcome, "verification-failed");
  assert.equal(writerCalls, 1);
  assert.equal((await harness.store.getTaskStatus(28)).state, "failed");

  harness.advance();
  const second = await executeBoundedTaskAttempt({
    store: harness.store,
    issueNumber: 28,
    attemptId: "attempt_verify_002",
    writer: async () => {
      writerCalls += 1;
      return { finalText: "must not replay", eventCount: 0 };
    },
    watchdog: async () => passWatchdog(),
    verifier: async () => {
      verifierCalls += 1;
      return passVerifier();
    },
  });
  assert.equal(second.outcome, "completed");
  assert.equal(writerCalls, 1);
  assert.equal(verifierCalls, 2);
  assert.equal(second.result.writer.diffHash, "diff-001");
});

test("shared coordination isolates repository leases and counters for identical issue numbers", async () => {
  const left = createHarness();
  const right = createHarness({ owner: "another-owner", repositoryName: "other", idempotencyStore: left.repositoryStore.idempotencyStore });
  assert.equal((await left.store.claimAttempt(28, "left_attempt")).claimed, true);
  assert.equal((await right.store.claimAttempt(28, "right_attempt")).claimed, true);
  assert.equal(await left.store.nextStatusVersion(28, 0), 1);
  assert.equal(await right.store.nextStatusVersion(28, 0), 1);
  await assert.rejects(right.store.assertActiveAttempt(28, "left_attempt"), /no longer active/);
  await left.store.releaseAttempt(28, "left_attempt");
  assert.equal(await right.store.assertActiveAttempt(28, "right_attempt"), true);
});

test("legacy unscoped leases block migration without being deleted or adopted", async () => {
  const harness = createHarness();
  const legacyId = createHash("sha256").update("task-execution:28").digest("base64url");
  await harness.repositoryStore.idempotencyStore.claim("task-execution", legacyId, "active:old_attempt", 3600);
  await assert.rejects(harness.store.claimAttempt(28, "new_attempt"),
    error => error.code === "TASK_LEGACY_COORDINATION_PRESENT");
  assert.equal(await harness.repositoryStore.idempotencyStore.get("task-execution", legacyId), "active:old_attempt");
});

test("identical issue numbers in different repositories publish independent durable results", async () => {
  const left = createHarness();
  const right = createHarness({ repositoryName: "another-repository", idempotencyStore: left.repositoryStore.idempotencyStore });
  const run = (harness, marker) => executeBoundedTaskAttempt({
    store: harness.store, issueNumber: 28, attemptId: "attempt_shared_001",
    writer: async () => ({ finalText: marker, eventCount: 1 }),
    watchdog: async () => passWatchdog(),
    verifier: async () => passVerifier(),
  });
  const outcomes = await Promise.all([run(left, "left-only"), run(right, "right-only")]);
  assert.deepEqual(outcomes.map(value => value.outcome), ["completed", "completed"]);
  const [leftResult, rightResult] = await Promise.all([
    left.store.getTaskResult(28), right.store.getTaskResult(28),
  ]);
  assert.equal(leftResult.result.writer.finalText, "left-only");
  assert.equal(rightResult.result.writer.finalText, "right-only");
  assert.notEqual(leftResult.resultHash, rightResult.resultHash);
  assert.equal(leftResult.statusVersion, rightResult.statusVersion);
  assert.equal(left.issue.state, "closed");
  assert.equal(right.issue.state, "closed");
});

test("repository capitalization cannot create a second execution lease", async () => {
  const left = createHarness();
  const alias = createHarness({ owner: "OCTO", repositoryName: "EXAMPLE",
    idempotencyStore: left.repositoryStore.idempotencyStore });
  assert.equal((await left.store.claimAttempt(28, "attempt_lowercase")).claimed, true);
  assert.equal((await alias.store.claimAttempt(28, "attempt_uppercase")).busy, true);
});


for (const stage of ["watchdog", "verifier"]) {
  test(`a ${stage} PASS cannot hide a failed check; recheck never replays the writer`, async () => {
    const harness = createHarness();
    let writes = 0;
    const adapters = {
      writer: async () => { writes++; return { finalText: "done", eventCount: 1 }; },
      watchdog: async () => passWatchdog(),
      verifier: async () => passVerifier(),
    };
    const first = await executeBoundedTaskAttempt({
      store: harness.store, issueNumber: 28, attemptId: `attempt_conflict_${stage}_001`,
      ...adapters,
      [stage]: async () => ({ ...passVerifier(), checks: [{ name: "required evidence", status: "FAIL", evidence: "artifact mismatch" }] }),
    });
    assert.equal(first.outcome, "verification-failed");
    assert.equal(first.status.resultAvailable, false);
    assert.equal(harness.issue.state, "open");
    assert.equal(first[stage].verdict, "FAIL");
    assert.equal(first[stage].coverage.failed, 1);
    harness.advance();
    const retried = await executeBoundedTaskAttempt({
      store: harness.store, issueNumber: 28, attemptId: `attempt_conflict_${stage}_002`, ...adapters,
    });
    assert.equal(retried.outcome, "completed");
    assert.equal(writes, 1);
    assert.equal(harness.comments.filter(c => c.body.includes('"kind": "writer-start"')).length, 1);
    assert.equal(harness.comments.filter(c => c.body.includes('"to": "awaiting-approval"')).length, 0);
  });
}

test("workers and reviewers reuse the original task and cannot rewrite one another's evidence", async () => {
  const harness = createHarness();
  harness.issue.body = harness.issue.body.replace("routing:", [
    "inputs:", "  sourceNotes: ['rules.md@revision-1: monthly scope']",
    "validation:", "  required: ['Use the original monthly definition']", "  status: PASS",
    "acceptanceCriteria: ['Keep the original calculation period']", "routing:",
  ].join("\n"));
  const original = (await harness.store.getTaskStatus(28)).packet;
  const calls = { writer: 0, watchdog: 0, verifier: 0 };
  const returned = { finalText: "original result", eventCount: 1, modelSelection: { effectiveModel: "fixture-model" } };
  const result = await executeBoundedTaskAttempt({
    store: harness.store, issueNumber: 28, attemptId: "attempt_definition_001",
    writer: async ({ task }) => {
      calls.writer++;
      assert.deepEqual(task, original);
      task.request.objective = "Use a different definition";
      task.inputs.sourceNotes[0] = "untrusted-summary";
      task.validation.required.length = 0;
      task.acceptanceCriteria.length = 0;
      return returned;
    },
    watchdog: async ({ task, writerResult }) => {
      calls.watchdog++;
      assert.deepEqual(task, original);
      assert.equal(writerResult.finalText, "original result");
      task.validation.required.length = 0;
      writerResult.finalText = "rewritten evidence";
      returned.modelSelection.effectiveModel = "changed after return";
      return passWatchdog();
    },
    verifier: async ({ task, writerResult }) => {
      calls.verifier++;
      assert.deepEqual(task, original);
      assert.equal(writerResult.finalText, "original result");
      assert.equal(writerResult.modelSelection.effectiveModel, "fixture-model");
      writerResult.finalText = "reviewer rewrite";
      return passVerifier();
    },
  });
  assert.equal(result.outcome, "completed");
  assert.deepEqual(calls, { writer: 1, watchdog: 1, verifier: 1 });
  assert.equal(result.result.writer.finalText, "original result");
  assert.equal(result.result.writer.modelSelection.effectiveModel, "fixture-model");
  assert.deepEqual(result.status.packet, original);
});

test("check coverage preserves optional unknowns and empty legacy records without inventing evidence", async () => {
  for (const checks of [[], [{ name:"optional host", status:"Not Checked", evidence:"" }], [
    { name:"known", status:"PASS", evidence:"existing evidence" },
    { name:"optional host", status:"Not Checked", evidence:"not in scope" },
  ]]) {
    const harness = createHarness();
    const result = await executeBoundedTaskAttempt({
      store:harness.store, issueNumber:28, attemptId:"attempt_coverage_001",
      writer:async () => ({finalText:"done",eventCount:1}),
      watchdog:async () => ({verdict:"PASS",checks}), verifier:async () => passVerifier(),
    });
    assert.equal(result.outcome,"completed");
    assert.deepEqual(result.result.watchdog.checks,checks);
    assert.deepEqual(result.result.watchdog.coverage,{
      unit:"check", total:checks.length, passed:checks.filter(c=>c.status==="PASS").length,
      failed:0, notChecked:checks.filter(c=>c.status==="Not Checked").length,
    });
  }
});
