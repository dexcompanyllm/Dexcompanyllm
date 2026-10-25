import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";

const port = 8791;
const origin = `http://127.0.0.1:${port}`;
const accessToken = "smoke-access-token";
const env = {
  ...process.env,
  PORT: String(port),
  GITHUB_REPO: "dexcompanyllm/Dexcompanyllm",
  GITHUB_REF: "main",
  GITHUB_TOKEN: "",
  DEX_PUBLIC_ORIGIN: origin,
  DEX_AUTH_SECRET_B64: Buffer.alloc(32, 7).toString("base64"),
  GITHUB_APP_CLIENT_ID: "smoke-github-app-client",
  GITHUB_APP_CLIENT_SECRET: "smoke-github-app-secret",
  DEX_ALLOW_UNAUTHENTICATED_APP: "false",
  DEX_ALLOW_LEGACY_APP_TOKEN: "true",
  DEX_APP_ACCESS_TOKEN: accessToken,
  DEX_ALLOW_UNAUTHENTICATED_MCP: "false",
  DEX_ALLOW_STATIC_MCP_BEARER: "false",
  DEX_ENABLE_PWA_WRITES: "false",
  DEX_ENABLE_MCP_WRITES: "false",
  DEX_SUBSCRIPTION_ONLY: "true",
  DEX_ALLOW_PAID_API: "false",
  DEX_AUTOMATIC_PAID_FALLBACK: "false",
  DEX_ALLOW_EXTRA_USAGE: "false",
};
delete env.OPENAI_API_KEY;
delete env.ANTHROPIC_API_KEY;

const child = spawn(process.execPath, ["services/mcp-gateway/src/server.mjs"], {
  cwd: fileURLToPath(new URL("..", import.meta.url)),
  env,
  stdio: ["ignore", "pipe", "pipe"],
});

let output = "";
child.stdout.setEncoding("utf8");
child.stderr.setEncoding("utf8");
child.stdout.on("data", chunk => output += chunk);
child.stderr.on("data", chunk => output += chunk);

async function waitForHealth() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${origin}/health`);
      if (response.ok) return response.json();
    } catch {}
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  throw new Error(`Server did not become healthy.\n${output}`);
}

try {
  const health = await waitForHealth();
  if (health.status !== "ok" || health.version !== "0.2.0" || health.costMode !== "subscription-only") {
    throw new Error(`Unexpected health payload: ${JSON.stringify(health)}`);
  }

  if (Object.hasOwn(health, "githubConfigured") || Object.hasOwn(health, "appAuthConfigured")) {
    throw new Error("Public health payload must not disclose credential configuration state.");
  }

  const sessionResponse = await fetch(`${origin}/api/session`);
  const session = await sessionResponse.json();
  if (!sessionResponse.ok || session.authConfigured !== true || session.authenticated !== false || session.csrfToken !== null) {
    throw new Error(`Unexpected anonymous session payload: ${JSON.stringify(session)}`);
  }

  const unauthenticatedStatus = await fetch(`${origin}/api/status`);
  if (unauthenticatedStatus.status !== 401) {
    throw new Error(`Unauthenticated PWA API must be rejected; received ${unauthenticatedStatus.status}.`);
  }

  const statusResponse = await fetch(`${origin}/api/status`, {
    headers: { "x-dex-access-token": accessToken },
  });
  const status = await statusResponse.json();
  if (!statusResponse.ok || status.subscriptionOnly !== true) {
    throw new Error(`Unexpected status payload: ${JSON.stringify(status)}`);
  }

  const rootResponse = await fetch(`${origin}/`, { redirect: "manual" });
  if (rootResponse.status !== 302 || rootResponse.headers.get("location") !== "/auth/github/start?returnTo=%2F") {
    throw new Error(`Private PWA root must start GitHub login; received ${rootResponse.status}.`);
  }

  const pwaResponse = await fetch(`${origin}/?legacy=1`);
  const pwa = await pwaResponse.text();
  if (!pwaResponse.ok || !pwa.includes("Dex Company")) {
    throw new Error("Explicit legacy PWA shell did not load.");
  }

  const metadataResponse = await fetch(`${origin}/.well-known/oauth-protected-resource/mcp`);
  const metadata = await metadataResponse.json();
  if (!metadataResponse.ok || metadata.resource !== `${origin}/mcp`) {
    throw new Error(`Unexpected protected-resource metadata: ${JSON.stringify(metadata)}`);
  }

  const registrationResponse = await fetch(`${origin}/oauth/register`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      client_name: "Dex smoke",
      redirect_uris: ["https://chatgpt.com/connector/oauth/callback"],
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code"],
      response_types: ["code"],
    }),
  });
  const registration = await registrationResponse.json();
  if (registrationResponse.status !== 201 || typeof registration.client_id !== "string") {
    throw new Error(`Dynamic client registration failed: ${JSON.stringify(registration)}`);
  }

  const authorizeUrl = new URL(`${origin}/oauth/authorize`);
  for (const [name, value] of Object.entries({
    client_id: registration.client_id,
    redirect_uri: registration.redirect_uris[0],
    response_type: "code",
    resource: `${origin}/mcp`,
    scope: "dex:read",
    state: "smoke-client-state",
    code_challenge: "A".repeat(43),
    code_challenge_method: "S256",
  })) authorizeUrl.searchParams.set(name, value);
  const consentResponse = await fetch(authorizeUrl, { redirect: "manual" });
  const consentHtml = await consentResponse.text();
  const consentState = consentHtml.match(/name="state" value="([A-Za-z0-9._-]+)"/)?.[1];
  const nonceCookie = consentResponse.headers.get("set-cookie")?.split(";", 1)[0];
  if (consentResponse.status !== 200 || consentResponse.headers.has("location") || !consentState || !nonceCookie) {
    throw new Error("MCP authorization must stop at explicit resource-owner consent before GitHub.");
  }
  const continueResponse = await fetch(`${origin}/oauth/authorize/continue`, {
    method: "POST",
    redirect: "manual",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      cookie: nonceCookie,
    },
    body: new URLSearchParams({ state: consentState, decision: "approve" }),
  });
  const githubAuthorize = new URL(continueResponse.headers.get("location"));
  if (continueResponse.status !== 302 || githubAuthorize.origin !== "https://github.com" || githubAuthorize.searchParams.get("code_challenge_method") !== "S256") {
    throw new Error("Approved MCP consent did not continue to GitHub with upstream PKCE.");
  }

  const mcpResponse = await fetch(`${origin}/mcp`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ method: "initialize", id: 1, params: { protocolVersion: "2025-06-18", capabilities: {}, clientInfo: { name: "smoke", version: "0.1.0" } } }),
  });
  if (mcpResponse.status !== 401) {
    throw new Error(`Unauthenticated MCP must be rejected; received ${mcpResponse.status}.`);
  }

  if (!mcpResponse.headers.get("www-authenticate")?.includes("oauth-protected-resource")) {
    throw new Error("Unauthenticated MCP response must advertise protected-resource metadata.");
  }

  console.log("PASS: minimal health, private PWA/API, OAuth discovery/DCR/consent/upstream PKCE, legacy emergency path, and MCP OAuth challenge.");
} finally {
  child.kill("SIGTERM");
  await new Promise(resolve => {
    const timer = setTimeout(resolve, 2_000);
    child.once("exit", () => { clearTimeout(timer); resolve(); });
  });
}
