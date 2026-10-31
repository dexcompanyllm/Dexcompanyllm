import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import test from "node:test";
import { JsonRpcProcess, CODEX_RPC_LINE_LIMIT_BYTES, CodexSubscriptionAdapter } from "../workers/openai-codex/src/adapter.mjs";
import { runClaudeProcess } from "../workers/anthropic-claude/src/adapter.mjs";

class Child extends EventEmitter {
  stdout = new PassThrough();
  stderr = new PassThrough();
  stdin = new PassThrough();
  kills = 0;
  kill() { this.kills++; return true; }
}
async function rpcFor(limit) {
  const child = new Child();
  const rpc = new JsonRpcProcess([], { lineLimitBytes: limit, spawnProcess: () => {
    queueMicrotask(() => child.emit("spawn"));
    return child;
  } });
  await rpc.start();
  return { child, rpc };
}
test("Codex rejects unterminated oversized UTF-8 lines, clears buffers and ignores late output", async () => {
  const { child, rpc } = await rpcFor(8);
  const pending = rpc.request("initialize");
  const rejected = assert.rejects(pending, /exceeded 8 bytes/);
  child.stdout.emit("data", "한글ab");
  assert.equal(rpc.bufferBytes, 8);
  child.stdout.emit("data", "c");
  await rejected;
  assert.equal(child.kills, 1);
  assert.equal(rpc.buffer, "");
  assert.equal(rpc.pending.size, 0);
  child.stdout.emit("data", "late".repeat(1000));
  assert.equal(rpc.buffer, "");
  await assert.rejects(rpc.request("late"), /exceeded 8 bytes/);
});
test("Codex applies its default bound before retaining a 16MiB+1 no-newline frame", async () => {
  const { child, rpc } = await rpcFor(CODEX_RPC_LINE_LIMIT_BYTES);
  child.stdout.emit("data", "x".repeat(CODEX_RPC_LINE_LIMIT_BYTES));
  assert.equal(rpc.bufferBytes, CODEX_RPC_LINE_LIMIT_BYTES);
  child.stdout.emit("data", "x");
  assert.equal(child.kills, 1);
  assert.equal(rpc.bufferBytes, 0);
});
test("Codex accepts coalesced bounded messages even when the whole chunk exceeds the per-line limit", async () => {
  const line = JSON.stringify({ method: "notice", params: { text: "한글" } });
  const { child, rpc } = await rpcFor(Buffer.byteLength(line));
  let count = 0;
  rpc.on("notification", () => count++);
  child.stdout.emit("data", `${line}\n${line}\n`);
  assert.equal(count, 2);
  assert.equal(child.kills, 0);
  assert.equal(rpc.bufferBytes, 0);
  const pending = rpc.request("read");
  child.stdout.emit("data", '{"id":1,"res');
  child.stdout.emit("data", 'ult":{"ok":true}}\n');
  assert.deepEqual(await pending, { ok: true });
  rpc.close();
});
for (const channel of ["stdout", "stderr"]) {
  test(`Claude bounds ${channel} in UTF-8 bytes and cannot resolve a truncated success`, async () => {
    const child = new Child();
    const job = runClaudeProcess([], { spawnProcess: () => child, stdoutLimitBytes: 8, stderrLimitBytes: 8 });
    const rejected = assert.rejects(job, new RegExp(`Claude ${channel} exceeded 8 bytes`));
    child[channel].emit("data", "한글ab");
    child[channel].emit("data", "c");
    await rejected;
    child[channel].emit("data", "late".repeat(1000));
    child.emit("close", 0);
    assert.equal(child.kills, 1);
  });
}
test("Claude drains output through close and handles timeout and late success once", async () => {
  const child = new Child();
  const job = runClaudeProcess([], { spawnProcess: () => child });
  child.stdout.emit("data", '{"ok":');
  child.emit("exit", 0);
  child.stdout.emit("data", "true}");
  child.emit("close", 0);
  assert.equal((await job).stdout, '{"ok":true}');
  const stalled = new Child();
  const timeout = runClaudeProcess([], { spawnProcess: () => stalled, timeoutMs: 10 });
  await assert.rejects(timeout, /timed out/);
  stalled.emit("close", 0);
  assert.equal(stalled.kills, 1);
});
test("Codex run fails immediately on transport failure after turn creation and releases listeners", async () => {
  class Rpc extends EventEmitter {
    closed = false;
    async request(method) {
      if (method === "thread/start") return { thread: { id: "test-thread", ephemeral: true } };
      if (method === "turn/start") {
        setImmediate(() => this.emit("failure", new Error("synthetic transport failure")));
        return { turn: { id: "test-turn" } };
      }
      throw new Error(method);
    }
    close() { this.closed = true; }
  }
  const rpc = new Rpc();
  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = rpc;
  adapter.models = [{ id: "gpt-5.6-sol", isDefault: true }];
  await assert.rejects(adapter.run({ cwd: process.cwd(), prompt: "no-op", sandbox: "read-only", timeoutMs: 1000 }), /synthetic transport failure/);
  assert.equal(rpc.listenerCount("failure"), 0);
  assert.equal(rpc.listenerCount("notification"), 0);
});

test("Codex preserves event counts and final text without retaining turn notification payloads", async () => {
  class Rpc extends EventEmitter {
    async request(method) {
      if (method === "thread/start") return { thread: { id: "count-thread", ephemeral: true } };
      if (method === "turn/start") {
        queueMicrotask(() => {
          for (let i = 0; i < 2000; i++) this.emit("notification", { method: "item/agentMessage/delta", params: { threadId: "count-thread", delta: "한" } });
          this.emit("notification", { method: "item/completed", params: { threadId: "count-thread", item: { type: "agentMessage", text: "완료" } } });
          this.emit("notification", { method: "turn/completed", params: { threadId: "count-thread" } });
        });
        return { turn: { id: "count-turn" } };
      }
      throw new Error(method);
    }
  }
  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = new Rpc();
  adapter.models = [{ id: "gpt-5.6-sol", isDefault: true }];
  const result = await adapter.run({ cwd: process.cwd(), prompt: "no-op", sandbox: "read-only" });
  assert.equal(result.eventCount, 2002);
  assert.equal(result.finalText, "완료");
});
