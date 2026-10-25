import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";

import { CodexSubscriptionAdapter } from "../workers/openai-codex/src/adapter.mjs";

class FakeRpc extends EventEmitter {
  constructor({ complete = false, hangInitialize = false, hangThreadStart = false } = {}) {
    super();
    this.complete = complete;
    this.hangInitialize = hangInitialize;
    this.hangThreadStart = hangThreadStart;
    this.notifications = [];
    this.responses = [];
    this.requests = [];
    this.closed = false;
  }
  async start() {}
  async request(method, params) {
    this.requests.push({ method, params });
    if (method === "initialize") {
      if (this.hangInitialize) return new Promise(() => {});
      return {};
    }
    if (method === "account/read") return { account: { type: "chatgpt", planType: "pro" } };
    if (method === "model/list") return { data: [{ id: "gpt-5.6-sol", isDefault: true }], nextCursor: null };
    if (method === "thread/start") {
      if (this.hangThreadStart) return new Promise(() => {});
      return { thread: { id: "thread-1", ephemeral: true } };
    }
    if (method === "turn/start") {
      if (this.complete) queueMicrotask(() => this.emit("notification", {
        method: "turn/completed",
        params: { threadId: "thread-1", turn: { id: "turn-1" } },
      }));
      return { turn: { id: "turn-1" } };
    }
    if (method === "turn/interrupt") return {};
    throw new Error(`Unexpected RPC request: ${method}`);
  }
  notify(method, params) { this.notifications.push({ method, params }); }
  respond(id, result) { this.responses.push({ id, result }); }
  close() { this.closed = true; }
}

test("Codex connection timeout stops an App Server that never initializes", async () => {
  const rpc = new FakeRpc({ hangInitialize: true });
  const adapter = new CodexSubscriptionAdapter({ rpcFactory: () => rpc });
  await assert.rejects(
    adapter.run({ cwd: process.cwd(), prompt: "no-op", sandbox: "read-only", timeoutMs: 20 }),
    /connection timed out.*stopped/i,
  );
  assert.equal(rpc.closed, true);
});

test("Codex timeout interrupts the turn, stops App Server, and ignores late completion", async () => {
  const rpc = new FakeRpc();
  const adapter = new CodexSubscriptionAdapter({ rpcFactory: () => rpc });
  await adapter.connect();
  await assert.rejects(
    adapter.run({ cwd: process.cwd(), prompt: "no-op", sandbox: "read-only", timeoutMs: 20 }),
    /timed out.*stopped/i,
  );
  assert.equal(rpc.closed, true);
  assert.equal(rpc.responses.length, 0);
  assert.equal(rpc.requests.some(item => item.method === "turn/interrupt"
    && item.params.threadId === "thread-1"
    && item.params.turnId === "turn-1"), true);
  rpc.emit("notification", { method: "turn/completed", params: { threadId: "thread-1" } });
});

test("Codex deadline also stops an App Server stuck before turn creation", async () => {
  const rpc = new FakeRpc({ hangThreadStart: true });
  const adapter = new CodexSubscriptionAdapter({ rpcFactory: () => rpc });
  await assert.rejects(
    adapter.run({ cwd: process.cwd(), prompt: "no-op", sandbox: "read-only", timeoutMs: 20 }),
    /thread start timed out.*stopped/i,
  );
  assert.equal(rpc.closed, true);
});

test("Codex approval handler accepts at most one request and environment cannot blanket-accept", async () => {
  const rpc = new FakeRpc({ complete: true });
  let uses = 0;
  const adapter = new CodexSubscriptionAdapter({
    rpcFactory: () => rpc,
    approvalHandler: async () => (uses++ === 0 ? "accept" : "decline"),
  });
  await adapter.connect();
  rpc.emit("request", { id: 1, method: "item/commandExecution/requestApproval", params: { command: "sensitive" } });
  rpc.emit("request", { id: 2, method: "item/commandExecution/requestApproval", params: { command: "sensitive" } });
  await new Promise(resolve => setImmediate(resolve));
  assert.deepEqual(rpc.responses.map(item => item.result.decision), ["accept", "decline"]);
  assert.deepEqual(adapter.approvalStats(), { requested: 2, accepted: 1, declined: 1 });
  adapter.close();

  const deniedRpc = new FakeRpc();
  const original = process.env.DEX_APPROVAL_MODE;
  process.env.DEX_APPROVAL_MODE = "accept";
  try {
    const denied = new CodexSubscriptionAdapter({ rpcFactory: () => deniedRpc });
    await denied.connect();
    deniedRpc.emit("request", { id: 3, method: "item/commandExecution/requestApproval" });
    await new Promise(resolve => setImmediate(resolve));
    assert.equal(deniedRpc.responses[0].result.decision, "decline");
    denied.close();
  } finally {
    if (original === undefined) delete process.env.DEX_APPROVAL_MODE;
    else process.env.DEX_APPROVAL_MODE = original;
  }
});
