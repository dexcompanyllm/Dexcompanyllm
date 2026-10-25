import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { EventEmitter } from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { CodexSubscriptionAdapter } from "../workers/openai-codex/src/adapter.mjs";

function model(id, options = {}) {
  return {
    id,
    model: id,
    displayName: id,
    description: id,
    hidden: false,
    isDefault: false,
    defaultReasoningEffort: "medium",
    supportedReasoningEfforts: [],
    ...options,
  };
}

function fakeRpc(requests) {
  const rpc = new EventEmitter();
  rpc.request = async (method, params) => {
    requests.push({ method, params });
    if (method === "thread/start") return { thread: { id: "thread-1", ephemeral: true } };
    if (method === "turn/start") {
      queueMicrotask(() => rpc.emit("notification", {
        method: "turn/completed",
        params: { threadId: "thread-1", turn: { id: "turn-1" } },
      }));
      return { turn: { id: "turn-1" } };
    }
    throw new Error(`Unexpected method: ${method}`);
  };
  return rpc;
}

test("Codex adapter forwards the bounded read-only sandbox to thread/start", async () => {
  const requests = [];
  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = fakeRpc(requests);
  adapter.models = [model("gpt-5.6-sol", { isDefault: true })];

  await adapter.run({
    cwd: "/workspace",
    prompt: "read only",
    sandbox: "read-only",
    timeoutMs: 1_000,
  });

  assert.deepEqual(requests[0], {
    method: "thread/start",
    params: {
      cwd: "/workspace",
      approvalPolicy: "on-request",
      sandbox: "read-only",
      ephemeral: true,
    },
  });
});

test("Codex adapter refuses danger-full-access and unknown sandbox values", async () => {
  const adapter = new CodexSubscriptionAdapter();
  for (const sandbox of ["danger-full-access", "workspaceWrite", "unknown"]) {
    await assert.rejects(
      () => adapter.run({ cwd: "/workspace", prompt: "blocked", sandbox }),
      /sandbox must be one of: read-only, workspace-write/i,
    );
  }
});

test("subscription task maps readOnly and defers model routing until plan detection", () => {
  const source = fs.readFileSync(new URL("../workers/subscription-task.mjs", import.meta.url), "utf8");
  assert.match(source, /constraints\?\.readOnly === true \? "read-only" : "workspace-write"/);
  assert.match(source, /executionPolicySelector: providerContext => selectOpenAIExecutionPolicy\(task, providerContext\)/);
  assert.match(source, /raw\.modelRouting = raw\.executionPolicy/);
});

test("subscription adapters do not load repository dotenv state when imported by the bridge", () => {
  for (const relative of [
    "../workers/openai-codex/src/adapter.mjs",
    "../workers/anthropic-claude/src/adapter.mjs",
  ]) {
    const source = fs.readFileSync(new URL(relative, import.meta.url), "utf8");
    assert.doesNotMatch(source, /^import "dotenv\/config";/m);
    assert.match(source, /async function main\(\) \{\s+await import\("dotenv\/config"\);/);
  }

  const temporary = fs.mkdtempSync(path.join(os.tmpdir(), "dex-bridge-dotenv-"));
  try {
    fs.writeFileSync(path.join(temporary, ".env"), "DEX_DOTENV_IMPORT_SENTINEL=loaded\n", "utf8");
    const moduleUrl = new URL("../workers/subscription-task.mjs", import.meta.url).href;
    const script = [
      "delete process.env.DEX_DOTENV_IMPORT_SENTINEL;",
      `await import(${JSON.stringify(moduleUrl)});`,
      'process.stdout.write(process.env.DEX_DOTENV_IMPORT_SENTINEL ?? "absent");',
    ].join("\n");
    const child = spawnSync(process.execPath, ["--input-type=module", "--eval", script], {
      cwd: temporary,
      encoding: "utf8",
      shell: false,
      env: { ...process.env },
    });
    assert.equal(child.status, 0, child.stderr);
    assert.equal(child.stdout, "absent");
  } finally {
    fs.rmSync(temporary, { recursive: true, force: true });
  }
});
