import assert from 'node:assert/strict';
import test from 'node:test';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { InMemoryTransport } from '@modelcontextprotocol/sdk/inMemory.js';
import { GitHubStore } from '../services/mcp-gateway/src/github-store.mjs';
import { createMemoryOAuthReplayStore } from '../services/mcp-gateway/src/oauth-replay-store.mjs';
import { GitHubTaskHandoffStore, parseHandoffComment } from '../services/mcp-gateway/src/task-handoff-store.mjs';

function fixture() {
  const comments = [], calls = [];
  let loseResponse = false, hideComments = false, commit = 'a'.repeat(40), lost = false;
  const packet = { task: { id: 'DC-HANDOFF', status: 'queued', title: '같은 작업' }, project: { name: 'Company-Ops', baseRef: 'main' }, request: { objective: '다른 AI에서 이어가요.' }, acceptanceCriteria: ['중복 실행 없음'], constraints: {}, execution: {} };
  const status = { taskId: 'DC-HANDOFF', issueNumber: 42, state: 'queued', statusVersion: 0, unresolvedWriter: false, packet };
  const store = new GitHubStore({ repo: 'example/wiki', env: { NODE_ENV: 'test' }, idempotencyStore: createMemoryOAuthReplayStore() });
  store.request = async (path, options = {}) => {
    calls.push({ path, method: options.method || 'GET' });
    if (path.endsWith('/commits/main')) return { sha: commit };
    if (path.endsWith('/issues/42/comments') && options.method === 'POST') {
      const comment = { id: 501 + comments.length, body: JSON.parse(options.body).body };
      comments.push(comment);
      if (loseResponse && !lost) { lost = true; throw new Error('Synthetic response loss after GitHub accepted it'); }
      return comment;
    }
    if (/\/issues\/comments\/\d+$/.test(path)) return comments.find(c => c.id === Number(path.split('/').at(-1)));
    if (path.includes('/issues?')) return [{ number: 42, title: '[DEX-TASK] 같은 작업' }];
    throw new Error('Unexpected request: ' + path);
  };
  const runs = {
    async resolveIssueNumber(reference) { assert.ok([42, '42', 'issue:42', 'DC-HANDOFF'].includes(reference)); return 42; },
    async listTaskComments() { return hideComments ? [] : comments; },
    async getTaskStatus() { return status; },
  };
  return { store, runs, comments, calls, status, handoffs: new GitHubTaskHandoffStore(store, runs),
    loseResponse() { loseResponse = true; }, hideComments(value) { hideComments = value; },
    newCommit() { commit = 'b'.repeat(40); },
  };
}
const input = (key = 'handoff-test-001', target = 'claude') => ({ target, idempotencyKey: key });

test('GitHub delivery persists once; retry after task/main progress recovers the original receipt; reads return fresh context', async () => {
  const f = fixture();
  const created = await f.handoffs.publish('issue:42', input());
  assert.equal(created.duplicate, false);
  assert.equal(created.receiverStatus, 'not-confirmed');
  assert.equal(created.executionStarted, false);
  const record = parseHandoffComment(f.comments[0]);
  assert.equal(record.taskId, 'DC-HANDOFF');
  assert.equal(record.target, 'claude');
  f.status.state = 'executing'; f.status.statusVersion = 2; f.status.unresolvedWriter = true; f.newCommit();
  const duplicate = await f.handoffs.publish('42', input());
  assert.equal(duplicate.commentId, created.commentId);
  assert.equal(duplicate.duplicate, true);
  assert.equal(f.comments.length, 1);
  const received = await f.handoffs.get('DC-HANDOFF', 'claude');
  assert.equal(received.delivery.snapshotChanged, true);
  assert.equal(received.currentState, 'executing');
  assert.equal(received.unresolvedWriter, true);
  assert.equal(received.executionAuthorized, false);
  assert.match(received.handoff.text, /"state": "executing"/);
  assert.equal(received.handoff.commitSha, 'b'.repeat(40));
  assert.equal(f.calls.filter(c => c.method === 'POST').length, 1);
  await assert.rejects(f.handoffs.publish('42', input('handoff-test-001', 'gemini')), e => e.code === 'HANDOFF_KEY_CONFLICT');
});

test('concurrent retries and ambiguous POST outcomes never issue another comment', async () => {
  const concurrent = fixture();
  const results = await Promise.allSettled([concurrent.handoffs.publish('42', input()), concurrent.handoffs.publish('42', input())]);
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(concurrent.comments.length, 1);
  const f = fixture(); f.loseResponse();
  await assert.rejects(f.handoffs.publish('42', input()), /response loss/);
  f.hideComments(true);
  await assert.rejects(f.handoffs.publish('42', input()), e => e.code === 'HANDOFF_UNCERTAIN');
  assert.equal(f.comments.length, 1);
  f.hideComments(false);
  const retry = await f.handoffs.publish('42', input());
  assert.equal(retry.duplicate, true);
  assert.equal(f.comments.length, 1);
});

test('receipt recovery after Redis loss, latest target selection and bounded inbox pagination', async () => {
  const f = fixture();
  await f.handoffs.publish('42', input());
  f.store.idempotencyStore = createMemoryOAuthReplayStore();
  assert.equal((await f.handoffs.publish('42', input())).duplicate, true);
  assert.equal(f.comments.length, 1);
  await f.handoffs.publish('42', input('handoff-test-002', 'gemini'));
  const old = await f.handoffs.publish('42', input());
  assert.equal(old.superseded, true);
  assert.equal(old.currentTarget, 'gemini');
  assert.equal((await f.handoffs.list({ target: 'claude' })).items.length, 0);
  assert.equal((await f.handoffs.list({ target: 'gemini' })).items[0].taskId, 'DC-HANDOFF');
  await assert.rejects(f.handoffs.get('42', 'claude'), e => e.code === 'HANDOFF_NOT_FOUND');
  const original = f.store.request;
  f.store.request = (path, options) => path.includes('/issues?') ? Array.from({ length: 20 }, (_, i) => ({ number: i + 1, title: 'unrelated' })) : original(path, options);
  const page = await f.handoffs.list({ target: 'gemini', page: 2 });
  assert.deepEqual(page.items, []);
  assert.equal(page.nextPage, 3);
  assert.equal(page.truncated, false);
});

test('publication rejects secret context, malformed destinations and exhausted comment budgets', async () => {
  const f = fixture();
  await assert.rejects(f.handoffs.publish('42', { ...input(), email: 'someone@example.com' }), e => e.code === 'HANDOFF_INPUT_INVALID');
  await assert.rejects(f.handoffs.publish('42', input('handoff-test-000', 'email')), e => e.code === 'HANDOFF_INPUT_INVALID');
  f.status.packet.request.objective = ['DEX_ADMIN_TOKEN', '=', 'sensitive-fixture-value'].join('');
  await assert.rejects(f.handoffs.publish('42', input()), e => e.code === 'HANDOFF_SENSITIVE_CONTENT');
  assert.equal(f.comments.length, 0);
  f.status.packet.request.objective = '안전한 작업';
  f.comments.push(...Array.from({ length: 80 }, (_, i) => ({ id: i + 1, body: 'existing execution evidence' })));
  await assert.rejects(f.handoffs.publish('42', input('handoff-test-002')), e => e.code === 'HANDOFF_LIMIT_REACHED');
  assert.equal(f.calls.filter(c => c.method === 'POST').length, 0);
});

test('different keys serialize one Task, preserve the five-record cap, and a lost publication lease cannot POST', async () => {
  const f = fixture();
  for (let i = 0; i < 4; i++) await f.handoffs.publish('42', input(`handoff-limit-${i}`));
  const attempts = await Promise.allSettled([f.handoffs.publish('42', input('handoff-limit-a')), f.handoffs.publish('42', input('handoff-limit-b'))]);
  assert.equal(attempts.filter(r => r.status === 'fulfilled').length, 1);
  assert.equal(f.comments.length, 5);
  await assert.rejects(f.handoffs.publish('42', input('handoff-limit-c')), e => e.code === 'HANDOFF_LIMIT_REACHED');
  const lost = fixture(), memory = lost.store.idempotencyStore;
  lost.store.idempotencyStore = { ...memory, async compareAndSet(namespace, id, expected, next, ttl) {
    if (namespace === 'handoff-publication' && next.startsWith('posting:')) return false;
    return memory.compareAndSet(namespace, id, expected, next, ttl);
  } };
  await assert.rejects(lost.handoffs.publish('42', input()), e => e.code === 'HANDOFF_LEASE_LOST');
  assert.equal(lost.comments.length, 0);
});

test('one unreadable Task returns a bounded warning while healthy inbox entries remain available', async () => {
  const f = fixture();
  await f.handoffs.publish('42', input());
  const original = f.store.request, list = f.runs.listTaskComments;
  f.store.request = (path, options) => path.includes('/issues?')
    ? [{ number: 99, title: '[DEX-TASK] overflow' }, { number: 42, title: '[DEX-TASK] healthy' }] : original(path, options);
  f.runs.listTaskComments = number => {
    if (number === 99) throw Object.assign(new Error('Do not expose raw data'), { code: 'TASK_EVENT_LIMIT_EXCEEDED' });
    return list(number);
  };
  const inbox = await f.handoffs.list({ target: 'claude' });
  assert.equal(inbox.items.length, 1);
  assert.deepEqual(inbox.warnings, [{ issueNumber: 99, code: 'TASK_EVENT_LIMIT_EXCEEDED' }]);
});

test('coordination failure before POST releases publication ownership, while a lost receipt key reconciles without reposting', async () => {
  const f = fixture(); let now = Math.floor(Date.now() / 1000), failOnce = true;
  const memory = createMemoryOAuthReplayStore({ now: () => now });
  f.store.idempotencyStore = { ...memory, async put(namespace, id, value, ttl) {
    if (namespace === 'task-handoff' && value.startsWith('posting:') && failOnce) {
      failOnce = false; throw new Error('Synthetic coordination failure before POST');
    }
    return memory.put(namespace, id, value, ttl);
  } };
  await assert.rejects(f.handoffs.publish('42', input()), /coordination failure/);
  assert.equal(f.comments.length, 0);
  now += 301;
  assert.equal((await f.handoffs.publish('42', input())).status, 'stored');
  assert.equal(f.comments.length, 1);

  const lost = fixture(); lost.loseResponse();
  await assert.rejects(lost.handoffs.publish('42', input()), /response loss/);
  const original = lost.store.idempotencyStore;
  lost.store.idempotencyStore = { ...original, async get(namespace, id) {
    return namespace === 'task-handoff' ? null : original.get(namespace, id);
  } };
  assert.equal((await lost.handoffs.publish('42', input())).duplicate, true);
  assert.equal(lost.comments.length, 1);

  const responseLost = fixture(); let clock = 1000, loseCasOnce = true;
  const casMemory = createMemoryOAuthReplayStore({ now: () => clock });
  responseLost.store.idempotencyStore = { ...casMemory, async compareAndSet(namespace, id, expected, next, ttl) {
    const result = await casMemory.compareAndSet(namespace, id, expected, next, ttl);
    if (namespace === 'handoff-publication' && next.startsWith('posting:') && loseCasOnce) {
      loseCasOnce = false; throw new Error('Synthetic CAS response loss');
    }
    return result;
  } };
  await assert.rejects(responseLost.handoffs.publish('42', input()), /CAS response loss/);
  assert.equal(responseLost.comments.length, 0);
  clock += 301;
  assert.equal((await responseLost.handoffs.publish('42', input())).status, 'stored');
  assert.equal(responseLost.comments.length, 1);
});

test('MCP receiver retrieves shared GitHub context without a user copy or any mutation', async t => {
  const previous = process.env.GITHUB_REPO;
  process.env.GITHUB_REPO = 'example/wiki';
  t.after(() => { if (previous === undefined) delete process.env.GITHUB_REPO; else process.env.GITHUB_REPO = previous; });
  const f = fixture();
  await f.handoffs.publish('42', input());
  const writesBefore = f.calls.filter(c => c.method !== 'GET').length;
  const { createMcpServer } = await import('../services/mcp-gateway/src/server.mjs?handoff-mcp');
  const server = createMcpServer({ mode: 'oauth' }, f.store, f.runs);
  const client = new Client({ name: 'synthetic-receiving-ai', version: '1.0.0' });
  const [a, b] = InMemoryTransport.createLinkedPair();
  t.after(async () => { await Promise.allSettled([client.close(), server.close()]); });
  await server.connect(b); await client.connect(a);
  const listed = await client.listTools();
  for (const name of ['list_handoffs', 'get_task_handoff']) assert.equal(listed.tools.find(t => t.name === name).annotations.readOnlyHint, true);
  assert.equal(listed.tools.some(t => t.name === 'publish_handoff'), false);
  const inbox = await client.callTool({ name: 'list_handoffs', arguments: { target: 'claude' } });
  assert.equal(inbox.isError, undefined);
  const taskId = inbox.structuredContent.items[0].taskId;
  const context = await client.callTool({ name: 'get_task_handoff', arguments: { taskId, target: 'claude' } });
  assert.equal(context.isError, undefined);
  assert.match(context.structuredContent.handoff.text, /다른 AI에서 이어가요/);
  assert.equal(context.structuredContent.delivery.receiverStatus, 'not-confirmed');
  assert.equal(context.structuredContent.executionAuthorized, false);
  assert.equal(f.calls.filter(c => c.method !== 'GET').length, writesBefore);
});
