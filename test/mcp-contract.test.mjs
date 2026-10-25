import assert from "node:assert/strict";
import test from "node:test";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

const TEST_ENV = {
  NODE_ENV: "test",
  DEX_PUBLIC_ORIGIN: "http://localhost:8787",
  DEX_AUTH_SECRET_B64: Buffer.alloc(32, 41).toString("base64"),
  GITHUB_APP_CLIENT_ID: "mcp-contract-client",
  [["GITHUB", "APP", "CLIENT", "SECRET"].join("_")]: "mcp-contract-secret",
  DEX_ALLOWED_GITHUB_LOGIN: "dexcompanyllm",
  DEX_ALLOWED_GITHUB_USER_ID: "890",
  GITHUB_REPO: "dex-test/runtime",
  DEX_ENABLE_MCP_WRITES: "false",
};

function installEnv(values) {
  const previous = new Map();
  for (const [key, value] of Object.entries(values)) {
    previous.set(key, process.env[key]);
    process.env[key] = value;
  }
  return () => {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

test("enabled MCP task creation preserves optional source and validation context", async (t) => {
  const restoreEnv = installEnv({ ...TEST_ENV, DEX_ENABLE_MCP_WRITES: "true" });
  const moduleUrl = new URL("../services/mcp-gateway/src/server.mjs", import.meta.url);
  moduleUrl.searchParams.set("mcp-context-test", `${process.pid}-${Date.now()}`);
  const { createMcpServer } = await import(moduleUrl.href);
  const captured = [];
  const server = createMcpServer({ mode: "static-mcp" }, {
    async createTaskIssue(task) {
      captured.push(task);
      return { id: "DC-CONTEXT", existing: false };
    },
  });
  const client = new Client({ name: "mcp-context-test", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  t.after(async () => {
    await Promise.allSettled([client.close(), server.close()]);
    restoreEnv();
  });
  await server.connect(serverTransport);
  await client.connect(clientTransport);
  const listed = await client.listTools();
  const creation = listed.tools.find(tool => tool.name === "create_task");
  assert.ok(creation.inputSchema.properties.inputs);
  assert.ok(creation.inputSchema.properties.validation);
  assert.equal(creation.inputSchema.required.includes("inputs"), false);
  assert.equal(creation.inputSchema.required.includes("validation"), false);
  const args = {
    title: "Reuse existing definition",
    project: "Company-Ops",
    objective: "Verify the recorded definition without requesting another form.",
    idempotencyKey: "mcp-context-001",
    inputs: { files: ["CURRENT.md"], sourceNotes: ["Use the existing task-level denominator."] },
    validation: { required: ["Compare the result to the original task."], status: "not-checked" },
  };
  const result = await client.callTool({ name: "create_task", arguments: args });
  assert.notEqual(result.isError, true);
  assert.deepEqual(captured[0].inputs, args.inputs);
  assert.deepEqual(captured[0].validation, args.validation);
  const invalid = await client.callTool({ name: "create_task", arguments: {
    ...args, inputs: { files: "not-an-array" },
  } });
  assert.equal(invalid.isError, true);
  assert.equal(captured.length, 1);
});

test("search and fetch follow the OpenAI company-knowledge MCP contract", async (t) => {
  const restoreEnv = installEnv(TEST_ENV);
  const moduleUrl = new URL("../services/mcp-gateway/src/server.mjs", import.meta.url);
  moduleUrl.searchParams.set("mcp-contract-test", `${process.pid}-${Date.now()}`);
  const { createMcpServer } = await import(moduleUrl.href);

  const calls = [];
  const repositoryStore = {
    async search(query, limit) {
      calls.push(["search", query, limit]);
      return [{
        id: "10_Projects/Company-Ops/CURRENT.md",
        title: "Company-Ops current state",
        path: "10_Projects/Company-Ops/CURRENT.md",
        repository: "dexcompanyllm/Dexcompanyllm",
        url: "https://github.com/dexcompanyllm/Dexcompanyllm/blob/main/10_Projects/Company-Ops/CURRENT.md",
      }];
    },
    async fetchResource(id) {
      calls.push(["fetch", id]);
      return {
        id,
        path: id,
        sha: "abc123",
        repository: "dexcompanyllm/Dexcompanyllm",
        content: "# Current\n\nCanonical project state.",
        url: `https://github.com/dexcompanyllm/Dexcompanyllm/blob/main/${id}`,
      };
    },
    async listProjects() { return []; },
    async listTasks() { return []; },
  };
  const taskRunReader = {
    async getTaskStatus(taskId) {
      calls.push(["get_task_status", taskId]);
      return {
        taskId: "DC-20260901-ABC123",
        issueNumber: 42,
        title: "Canonical retrieval",
        state: "completed",
        statusVersion: 5,
        createdAt: "2026-09-01T00:00:00.000Z",
        updatedAt: "2026-09-01T00:05:00.000Z",
        latestAttemptId: "attempt-1",
        resultAvailable: true,
        resultHash: "a".repeat(64),
        unresolvedWriter: false,
        packet: { execution: { checkpoint: "result-persisted" } },
        events: [{ kind: "verification-pass", to: "completed", createdAt: "2026-09-01T00:05:00.000Z" }],
        url: "https://github.com/dex-test/runtime/issues/42",
      };
    },
    async getTaskResult(taskId) {
      calls.push(["get_task_result", taskId]);
      return {
        taskId: "DC-20260901-ABC123",
        issueNumber: 42,
        state: "completed",
        statusVersion: 5,
        resultHash: "a".repeat(64),
        createdAt: "2026-09-01T00:04:00.000Z",
        result: { verdict: "PASS", evidence: ["ci:123"] },
        url: "https://github.com/dex-test/runtime/issues/42",
      };
    },
  };
  const server = createMcpServer(
    { mode: "oauth", login: "dexcompanyllm" },
    repositoryStore,
    taskRunReader,
  );
  const client = new Client({ name: "mcp-contract-test", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();

  t.after(async () => {
    await Promise.allSettled([client.close(), server.close()]);
    restoreEnv();
  });

  await server.connect(serverTransport);
  await client.connect(clientTransport);

  const listed = await client.listTools();
  const searchTool = listed.tools.find((tool) => tool.name === "search");
  const fetchTool = listed.tools.find((tool) => tool.name === "fetch");
  const taskStatusTool = listed.tools.find((tool) => tool.name === "get_task_status");
  const taskResultTool = listed.tools.find((tool) => tool.name === "get_task_result");
  assert.deepEqual(Object.keys(searchTool.inputSchema.properties), ["query"]);
  assert.deepEqual(Object.keys(searchTool.outputSchema.properties), ["results"]);
  assert.deepEqual(Object.keys(fetchTool.outputSchema.properties), ["id", "title", "text", "url", "metadata"]);
  assert.deepEqual(Object.keys(taskStatusTool.inputSchema.properties), ["taskId"]);
  assert.deepEqual(Object.keys(taskResultTool.inputSchema.properties), ["taskId"]);
  assert.equal(taskStatusTool.annotations.readOnlyHint, true);
  assert.equal(taskResultTool.annotations.readOnlyHint, true);

  const search = await client.callTool({ name: "search", arguments: { query: "current state" } });
  assert.deepEqual(calls[0], ["search", "current state", 10]);
  assert.deepEqual(search.structuredContent, {
    results: [{
      id: "10_Projects/Company-Ops/CURRENT.md",
      title: "Company-Ops current state",
      url: "https://github.com/dexcompanyllm/Dexcompanyllm/blob/main/10_Projects/Company-Ops/CURRENT.md",
    }],
  });
  assert.equal(search.content[0].text, JSON.stringify(search.structuredContent));

  const fetch = await client.callTool({
    name: "fetch",
    arguments: { id: "10_Projects/Company-Ops/CURRENT.md" },
  });
  assert.deepEqual(calls[1], ["fetch", "10_Projects/Company-Ops/CURRENT.md"]);
  assert.deepEqual(fetch.structuredContent, {
    id: "10_Projects/Company-Ops/CURRENT.md",
    title: "10_Projects/Company-Ops/CURRENT.md",
    text: "# Current\n\nCanonical project state.",
    url: "https://github.com/dexcompanyllm/Dexcompanyllm/blob/main/10_Projects/Company-Ops/CURRENT.md",
    metadata: {
      path: "10_Projects/Company-Ops/CURRENT.md",
      sha: "abc123",
      repository: "dexcompanyllm/Dexcompanyllm",
    },
  });
  assert.equal(fetch.content[0].text, JSON.stringify(fetch.structuredContent));

  const status = await client.callTool({
    name: "get_task_status",
    arguments: { taskId: "DC-20260901-ABC123" },
  });
  assert.deepEqual(calls[2], ["get_task_status", "DC-20260901-ABC123"]);
  assert.equal(status.structuredContent.status.state, "completed");
  assert.equal(status.structuredContent.status.resultAvailable, true);
  assert.deepEqual(status.structuredContent.status.progress, {
    checkpoint: "verification-pass",
    eventCount: 1,
    lastEvent: {
      kind: "verification-pass",
      state: "completed",
      createdAt: "2026-09-01T00:05:00.000Z",
    },
  });

  const result = await client.callTool({
    name: "get_task_result",
    arguments: { taskId: "issue:42" },
  });
  assert.deepEqual(calls[3], ["get_task_result", "issue:42"]);
  assert.equal(result.structuredContent.result.resultHash, "a".repeat(64));
  assert.deepEqual(result.structuredContent.result.result, { verdict: "PASS", evidence: ["ci:123"] });
});
