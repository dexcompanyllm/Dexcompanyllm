import { createServer } from "node:http";

const port = 8792;
const origin = `http://127.0.0.1:${port}`;
const accessToken = "smoke-access-token";

process.env.NODE_ENV = "test";
process.env.GITHUB_REPO = "dexcompanyllm/Dexcompanyllm";
process.env.GITHUB_REF = "main";
process.env.GITHUB_TOKEN = "";
process.env.DEX_ALLOW_UNAUTHENTICATED_APP = "false";
process.env.DEX_ALLOW_LEGACY_APP_TOKEN = "true";
process.env.DEX_APP_ACCESS_TOKEN = `  \"${accessToken}\"\r\n`;
process.env.DEX_ALLOW_UNAUTHENTICATED_MCP = "false";
process.env.DEX_ALLOW_STATIC_MCP_BEARER = "false";
process.env.DEX_ENABLE_PWA_WRITES = "false";
process.env.DEX_ENABLE_MCP_WRITES = "false";
process.env.DEX_SUBSCRIPTION_ONLY = "true";
process.env.DEX_ALLOW_PAID_API = "false";
process.env.DEX_AUTOMATIC_PAID_FALLBACK = "false";
process.env.DEX_ALLOW_EXTRA_USAGE = "false";
delete process.env.OPENAI_API_KEY;
delete process.env.ANTHROPIC_API_KEY;

const { default: handler } = await import("../api/index.mjs");

const server = createServer((req, res) => {
  const incoming = new URL(req.url ?? "/", origin);
  const originalPath = incoming.pathname;
  const rewritten = new URL("/api/index", origin);
  rewritten.searchParams.set("__dex_path", originalPath);
  for (const [key, value] of incoming.searchParams.entries()) rewritten.searchParams.append(key, value);

  req.url = `${rewritten.pathname}${rewritten.search}`;
  req.query = Object.fromEntries(rewritten.searchParams.entries());
  return handler(req, res);
});

await new Promise((resolve, reject) => {
  server.once("error", reject);
  server.listen(port, "127.0.0.1", resolve);
});

try {
  const healthResponse = await fetch(`${origin}/health`);
  const health = await healthResponse.json();
  if (!healthResponse.ok || health.status !== "ok" || health.service !== "dex-company-runtime") {
    throw new Error(`Unexpected /health payload: ${JSON.stringify(health)}`);
  }

  const rootResponse = await fetch(`${origin}/`);
  const root = await rootResponse.text();
  if (!rootResponse.ok || !root.includes("Dex Company")) {
    throw new Error("Explicit Vercel adapter did not expose the PWA shell.");
  }

  const assetResponse = await fetch(`${origin}/app.js`);
  if (!assetResponse.ok || !(await assetResponse.text()).includes("taskPayload")) {
    throw new Error("Explicit Vercel adapter did not expose PWA static assets.");
  }

  const unauthenticatedStatus = await fetch(`${origin}/api/status`);
  if (unauthenticatedStatus.status !== 401) {
    throw new Error(`Explicit Vercel adapter must reject missing Access token; received ${unauthenticatedStatus.status}.`);
  }

  const statusResponse = await fetch(`${origin}/api/status`, {
    headers: { "x-dex-access-token": accessToken },
  });
  const status = await statusResponse.json();
  if (!statusResponse.ok || status.subscriptionOnly !== true) {
    throw new Error(`Secret normalization failed for /api/status: ${JSON.stringify(status)}`);
  }

  const mcpResponse = await fetch(`${origin}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      method: "initialize",
      id: 1,
      params: {
        protocolVersion: "2025-06-18",
        capabilities: {},
        clientInfo: { name: "vercel-explicit-adapter-smoke", version: "0.1.0" }
      }
    }),
  });
  if (mcpResponse.status !== 401) {
    throw new Error(`Explicit Vercel adapter must preserve the MCP auth gate; received ${mcpResponse.status}.`);
  }

  console.log("PASS: explicit Vercel adapter normalizes secret whitespace/quotes and preserves PWA/API/MCP routing.");
} finally {
  await new Promise(resolve => server.close(resolve));
}
