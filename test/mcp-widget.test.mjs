import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import test from "node:test";

import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { InMemoryTransport } from "@modelcontextprotocol/sdk/inMemory.js";

const SECRET_ENV_KEY = ["GITHUB", "APP", "CLIENT", "SECRET"].join("_");
const SECRET_SENTINEL = "mcp-widget-sensitive-sentinel";
const TEST_ENV = {
  NODE_ENV: "test",
  PORT: "0",
  DEX_PUBLIC_ORIGIN: "http://localhost:8787",
  DEX_AUTH_SECRET_B64: Buffer.alloc(32, 71).toString("base64"),
  DEX_ALLOWED_GITHUB_LOGIN: "dexcompanyllm",
  DEX_ALLOWED_GITHUB_USER_ID: "890",
  GITHUB_APP_CLIENT_ID: "mcp-widget-client",
  [SECRET_ENV_KEY]: SECRET_SENTINEL,
  GITHUB_REPO: "dex-test/runtime",
  DEX_ENABLE_MCP_WRITES: "false",
};

test("Vercel bundles the pinned portable MCP Apps runtime", () => {
  const vercelConfig = JSON.parse(fs.readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
  const includeFiles = vercelConfig.functions?.["api/index.mjs"]?.includeFiles ?? "";
  assert.match(
    includeFiles,
    /node_modules\/@modelcontextprotocol\/ext-apps\/dist\/src\/app-with-deps\.js/,
  );
});

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

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

test("dashboard resource uses the portable MCP Apps bridge and a safe public runtime", async (t) => {
  const restoreEnv = installEnv(TEST_ENV);
  const moduleUrl = new URL("../services/mcp-gateway/src/server.mjs", import.meta.url);
  moduleUrl.searchParams.set("mcp-widget-test", `${process.pid}-${Date.now()}`);
  const { claudeWidgetDomain, createMcpServer, default: app } = await import(moduleUrl.href);

  const repositoryStore = {
    async search() { return []; },
    async fetchResource() { throw new Error("not used"); },
    async listProjects() { return []; },
    async listTasks() { return []; },
    async getProjectState() { return {}; },
  };
  const mcpServer = createMcpServer({ mode: "oauth", login: "dexcompanyllm" }, repositoryStore);
  const client = new Client({ name: "mcp-widget-test", version: "1.0.0" });
  const [clientTransport, serverTransport] = InMemoryTransport.createLinkedPair();
  let httpServer;

  t.after(async () => {
    await Promise.allSettled([
      client.close(),
      mcpServer.close(),
      httpServer?.listening ? closeServer(httpServer) : Promise.resolve(),
    ]);
    restoreEnv();
  });

  await mcpServer.connect(serverTransport);
  await client.connect(clientTransport);

  const listed = await client.listResources();
  const descriptor = listed.resources.find((resource) => resource.uri === "ui://dex-company/dashboard-v2.html");
  assert.ok(descriptor, "dashboard resource descriptor must be registered");
  assert.equal(descriptor.mimeType, "text/html;profile=mcp-app");
  assert.equal(
    descriptor._meta?.ui?.domain,
    "1e7037d0e74fbc84d7746b9da9adb5bc.claudemcpcontent.com",
  );
  const previewMcpUrl = "https://dex-company-runtime-preview.example/mcp";
  const expectedPreviewDomain = `${crypto.createHash("sha256").update(previewMcpUrl).digest("hex").slice(0, 32)}.claudemcpcontent.com`;
  assert.equal(claudeWidgetDomain(previewMcpUrl), expectedPreviewDomain);
  assert.equal(
    claudeWidgetDomain("https://runtime.invalid/mcp"),
    "c4a26a37435b50ac574d43f4846349cb.claudemcpcontent.com",
  );
  assert.deepEqual(descriptor._meta?.ui?.csp, {
    connectDomains: [],
    resourceDomains: ["http://localhost:8787"],
  });

  const read = await client.readResource({ uri: descriptor.uri });
  const content = read.contents[0];
  const widget = content?.text ?? "";
  assert.deepEqual(content?._meta?.ui, descriptor._meta?.ui);
  assert.equal(
    content?._meta?.["openai/widgetDescription"],
    descriptor._meta?.["openai/widgetDescription"],
  );
  assert.match(widget, /from "http:\/\/localhost:8787\/assets\/mcp-app-runtime-v1\.7\.5\.js"/);
  assert.match(widget, /new App\(/);
  assert.match(widget, /mcpApp\.ontoolresult/);
  assert.match(widget, /mcpApp\.connect\(\)/);
  assert.match(widget, /mcpApp\.openLink\(\{ url: pwaUrl \}\)/);
  assert.match(widget, /window\.openai\?\.toolOutput/);
  assert.match(widget, /safeAreaInsets/);
  assert.match(widget, /min-height:\s*44px/);
  assert.match(widget, /background:\s*transparent/);
  assert.doesNotMatch(widget, /applyHostFonts/);
  assert.doesNotMatch(widget, /__DEX_MCP_APP_RUNTIME_URL__/);
  assert.doesNotMatch(widget, /__DEX_PWA_URL__/);
  assert.match(widget, /const trustedPwaUrl = 'http:\/\/localhost:8787\/';/);
  assert.match(widget, /url\.origin === trustedPwaOrigin/);
  assert.ok(!widget.includes(SECRET_SENTINEL));
  assert.ok(!widget.includes(TEST_ENV.DEX_AUTH_SECRET_B64));

  httpServer = await new Promise((resolve, reject) => {
    const candidate = app.listen(0, "127.0.0.1", () => resolve(candidate));
    candidate.once("error", reject);
  });
  const address = httpServer.address();
  assert.ok(address && typeof address === "object");
  const response = await fetch(`http://127.0.0.1:${address.port}/assets/mcp-app-runtime-v1.7.5.js`, {
    signal: AbortSignal.timeout(5_000),
  });
  const runtime = await response.text();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^application\/javascript\b/);
  assert.equal(response.headers.get("access-control-allow-origin"), "*");
  assert.equal(response.headers.get("cross-origin-resource-policy"), "cross-origin");
  assert.match(response.headers.get("cache-control") ?? "", /immutable/);
  assert.ok(runtime.length > 100_000, "the self-contained ext-apps browser runtime must be served");
  assert.match(runtime, /ui\/initialize/);
  assert.match(runtime, /ui\/open-link/);
  assert.match(runtime, /\bas App\b/);
  assert.ok(!runtime.includes(SECRET_SENTINEL));
  assert.ok(!runtime.includes(TEST_ENV.DEX_AUTH_SECRET_B64));
});
