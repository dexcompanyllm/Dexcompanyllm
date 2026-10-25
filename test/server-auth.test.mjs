import assert from "node:assert/strict";
import test from "node:test";

import { createAuthCrypto } from "../services/mcp-gateway/src/auth-crypto.mjs";

const ISSUER = "http://localhost:8787";
const AUTH_SECRET_B64 = Buffer.alloc(32, 19).toString("base64");
const GITHUB_CLIENT_ID = "server-integration-github-client";
const GITHUB_CLIENT_SECRET = "server-integration-github-secret";
const LEGACY_APP_TOKEN = "server-integration-legacy-app-token";
const LEGACY_MCP_TOKEN = "server-integration-legacy-mcp-token";
const CSRF_TOKEN = Buffer.alloc(32, 23).toString("base64url");

const TEST_ENV = {
  NODE_ENV: "test",
  PORT: "0",
  DEX_PUBLIC_ORIGIN: ISSUER,
  DEX_AUTH_SECRET_B64: AUTH_SECRET_B64,
  DEX_ALLOWED_GITHUB_LOGIN: "dexcompanyllm",
  DEX_ALLOWED_GITHUB_USER_ID: "890",
  GITHUB_APP_CLIENT_ID: GITHUB_CLIENT_ID,
  GITHUB_APP_CLIENT_SECRET: GITHUB_CLIENT_SECRET,
  GITHUB_REPO: "dex-test/runtime",
  GITHUB_REF: "main",
  DEX_APP_ACCESS_TOKEN: LEGACY_APP_TOKEN,
  DEX_MCP_BEARER_TOKEN: LEGACY_MCP_TOKEN,
  DEX_ADMIN_TOKEN: "server-integration-admin-token",
  DEX_ALLOW_LEGACY_APP_TOKEN: "false",
  DEX_ALLOW_STATIC_MCP_BEARER: "false",
  DEX_ALLOW_UNAUTHENTICATED_APP: "false",
  DEX_ALLOW_UNAUTHENTICATED_MCP: "false",
  DEX_ENABLE_PWA_WRITES: "false",
  DEX_ENABLE_MCP_WRITES: "false",
  DEX_SUBSCRIPTION_ONLY: "true",
  DEX_ALLOW_PAID_API: "false",
  DEX_AUTOMATIC_PAID_FALLBACK: "false",
  DEX_ALLOW_EXTRA_USAGE: "false",
  VERCEL_ENV: undefined,
  VERCEL_URL: undefined,
  VERCEL_PROJECT_PRODUCTION_URL: undefined,
  GITHUB_TOKEN: undefined,
  OPENAI_API_KEY: undefined,
  ANTHROPIC_API_KEY: undefined,
};

function installEnv(values) {
  const previous = new Map();
  for (const [key, value] of Object.entries(values)) {
    previous.set(key, process.env[key]);
    if (value === undefined) delete process.env[key];
    else process.env[key] = String(value);
  }
  return () => {
    for (const [key, value] of previous) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  };
}

async function withEnv(values, operation) {
  const restore = installEnv(values);
  try {
    return await operation();
  } finally {
    restore();
  }
}

function closeServer(server) {
  return new Promise((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

function parseEventStreamJsonRpc(body) {
  const dataLine = body.split(/\r?\n/).find((line) => line.startsWith("data: "));
  assert.ok(dataLine, `Expected an MCP event-stream data line, received: ${body.slice(0, 200)}`);
  return JSON.parse(dataLine.slice("data: ".length));
}

test("server auth, OAuth discovery, validation, and compatibility gates", async (t) => {
  const restoreEnv = installEnv(TEST_ENV);
  const nativeFetch = globalThis.fetch;
  globalThis.fetch = (input, init) => {
    const target = new URL(input instanceof Request ? input.url : String(input));
    if (!["127.0.0.1", "localhost", "::1"].includes(target.hostname)) {
      return Promise.reject(new Error(`External network is disabled in server integration tests: ${target.origin}`));
    }
    return nativeFetch(input, init);
  };

  let server;
  t.after(async () => {
    try {
      if (server?.listening) await closeServer(server);
    } finally {
      globalThis.fetch = nativeFetch;
      restoreEnv();
    }
  });

  const serverUrl = new URL("../services/mcp-gateway/src/server.mjs", import.meta.url);
  serverUrl.searchParams.set("server-auth-test", `${process.pid}-${Date.now()}`);
  const { default: app, localListenHost } = await import(serverUrl.href);
  assert.equal(localListenHost({}), "127.0.0.1");
  assert.equal(localListenHost({ DEX_LISTEN_HOST: "0.0.0.0" }), "0.0.0.0");
  server = await new Promise((resolve, reject) => {
    const candidate = app.listen(0, "127.0.0.1", () => resolve(candidate));
    candidate.once("error", reject);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}`;

  async function request(path, init = {}) {
    return globalThis.fetch(`${baseUrl}${path}`, {
      redirect: "manual",
      signal: AbortSignal.timeout(5_000),
      ...init,
    });
  }

  const authCrypto = createAuthCrypto({
    secretB64: AUTH_SECRET_B64,
    issuer: ISSUER,
  });
  const sessionToken = authCrypto.signJwt("session", {
    sub: "github:890",
    aud: `${ISSUER}/app`,
    github_login: "dexcompanyllm",
    github_id: 890,
    csrf: CSRF_TOKEN,
    token_use: "session",
  }, { ttlSeconds: 600 });
  const sessionCookie = `dex_session=${sessionToken}`;
  const oauthAccessToken = authCrypto.signJwt("access", {
    sub: "github:890",
    aud: `${ISSUER}/mcp`,
    scope: "dex:read",
    github_login: "dexcompanyllm",
    github_id: 890,
    token_use: "access",
  }, { ttlSeconds: 600 });

  await t.test("public health stays useful without disclosing auth configuration", async () => {
    const response = await request("/health");
    const payload = await response.json();

    assert.equal(response.status, 200);
    assert.deepEqual(Object.keys(payload).sort(), ["costMode", "runtime", "service", "status", "version"]);
    assert.equal(payload.status, "ok");
    assert.equal(payload.costMode, "subscription-only");
    const serialized = JSON.stringify(payload);
    for (const secret of [AUTH_SECRET_B64, GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, LEGACY_APP_TOKEN, LEGACY_MCP_TOKEN]) {
      assert.equal(serialized.includes(secret), false);
    }
  });

  await t.test("unauthenticated PWA APIs return a JSON 401", async () => {
    const response = await request("/api/status");
    const payload = await response.json();

    assert.equal(response.status, 401);
    assert.equal(payload.code, "AUTHENTICATION_REQUIRED");
    assert.equal(payload.loginUrl, "/auth/github/start?returnTo=%2F");
    assert.match(response.headers.get("cache-control") ?? "", /no-store/);
  });

  await t.test("OAuth discovery and dynamic client registration agree on the public issuer", async () => {
    const [authorizationResponse, resourceResponse] = await Promise.all([
      request("/.well-known/oauth-authorization-server"),
      request("/.well-known/oauth-protected-resource/mcp"),
    ]);
    const authorization = await authorizationResponse.json();
    const resource = await resourceResponse.json();

    assert.equal(authorizationResponse.status, 200);
    assert.equal(authorization.issuer, ISSUER);
    assert.equal(authorization.registration_endpoint, `${ISSUER}/oauth/register`);
    assert.deepEqual(authorization.code_challenge_methods_supported, ["S256"]);
    assert.deepEqual(authorization.grant_types_supported, ["authorization_code", "refresh_token"]);
    assert.deepEqual(authorization.scopes_supported, ["dex:read", "offline_access"]);
    assert.deepEqual(authorization.token_endpoint_auth_methods_supported, ["none"]);
    assert.equal(resourceResponse.status, 200);
    assert.equal(resource.resource, `${ISSUER}/mcp`);
    assert.deepEqual(resource.authorization_servers, [ISSUER]);
    assert.deepEqual(resource.scopes_supported, ["dex:read"]);

    const registrationResponse = await request("/oauth/register", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        client_name: "Server integration client",
        application_type: "web",
        redirect_uris: ["https://client.example.test/oauth/callback"],
        token_endpoint_auth_method: "none",
        grant_types: ["authorization_code", "refresh_token"],
        response_types: ["code"],
      }),
    });
    const registration = await registrationResponse.json();

    assert.equal(registrationResponse.status, 201);
    assert.equal(typeof registration.client_id, "string");
    assert.ok(registration.client_id.length > 40);
    assert.equal(Object.hasOwn(registration, "client_secret"), false);
    assert.equal(registration.application_type, "web");
    assert.deepEqual(registration.redirect_uris, ["https://client.example.test/oauth/callback"]);
    assert.deepEqual(registration.grant_types, ["authorization_code", "refresh_token"]);

    const authorize = new URLSearchParams({
      client_id: registration.client_id,
      redirect_uri: registration.redirect_uris[0],
      response_type: "code",
      resource: `${ISSUER}/mcp`,
      scope: "dex:read offline_access",
      state: "server-integration-client-state",
      code_challenge: "A".repeat(43),
      code_challenge_method: "S256",
    });
    const consentResponse = await request(`/oauth/authorize?${authorize}`);
    const consentHtml = await consentResponse.text();
    assert.equal(consentResponse.status, 200);
    assert.match(consentHtml, /offline_access/);
    assert.match(consentHtml, /refresh token/);
    assert.match(consentHtml, /최대 7일/);
    assert.match(consentHtml, /최초 승인 후 최대 30일/);
    assert.equal(JSON.stringify(registration).includes(GITHUB_CLIENT_SECRET), false);
  });

  await t.test("the private root starts GitHub login instead of serving the PWA anonymously", async () => {
    const response = await request("/");
    assert.equal(response.status, 302);
    assert.equal(response.headers.get("location"), "/auth/github/start?returnTo=%2F");
    assert.match(response.headers.get("cache-control") ?? "", /no-store/);
  });

  await t.test("a valid HttpOnly-session value loads the PWA and exposes only safe session state", async () => {
    const [rootResponse, sessionResponse] = await Promise.all([
      request("/", { headers: { cookie: sessionCookie } }),
      request("/api/session", { headers: { cookie: sessionCookie } }),
    ]);
    const root = await rootResponse.text();
    const session = await sessionResponse.json();

    assert.equal(rootResponse.status, 200);
    assert.match(root, /Dex Company/);
    assert.equal(sessionResponse.status, 200);
    assert.equal(session.authenticated, true);
    assert.equal(session.login, "dexcompanyllm");
    assert.equal(session.csrfToken, CSRF_TOKEN);
    const browserPayload = JSON.stringify(session);
    assert.equal(browserPayload.includes(sessionToken), false);
    assert.equal(browserPayload.includes(AUTH_SECRET_B64), false);
    assert.equal(browserPayload.includes(GITHUB_CLIENT_SECRET), false);
  });

  await t.test("unauthenticated MCP requests advertise protected-resource metadata", async () => {
    const response = await request("/mcp", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 1,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "server-auth-test", version: "1.0.0" },
        },
      }),
    });
    const payload = await response.json();
    const challenge = response.headers.get("www-authenticate") ?? "";

    assert.equal(response.status, 401);
    assert.equal(payload.error, "invalid_token");
    assert.match(challenge, /^Bearer /);
    assert.ok(challenge.includes(`resource_metadata="${ISSUER}/.well-known/oauth-protected-resource"`));
    assert.match(challenge, /scope="dex:read"/);
  });

  await t.test("unauthenticated tool calls return HTTP 401 without invoking a tool", async () => {
    const response = await request("/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 19,
        method: "tools/call",
        params: { name: "search", arguments: { query: "Dex Company" } },
      }),
    });
    const payload = await response.json();
    const challenge = response.headers.get("www-authenticate") ?? "";

    assert.equal(response.status, 401);
    assert.equal(payload.error, "invalid_token");
    assert.match(challenge, /^Bearer /);
    assert.ok(challenge.includes(`resource_metadata="${ISSUER}/.well-known/oauth-protected-resource"`));
    assert.match(challenge, /scope="dex:read"/);
  });

  await t.test("tool calls with an invalid bearer return the OAuth invalid_token challenge", async () => {
    const response = await request("/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        authorization: "Bearer invalid-token",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 20,
        method: "tools/call",
        params: { name: "search", arguments: { query: "Dex Company" } },
      }),
    });
    const payload = await response.json();
    const challenge = response.headers.get("www-authenticate") ?? "";

    assert.equal(response.status, 401);
    assert.equal(payload.error, "invalid_token");
    assert.match(challenge, /error="invalid_token"/);
    assert.match(challenge, /scope="dex:read"/);
  });

  await t.test("MCP rejects foreign browser origins before processing the request", async () => {
    const rejected = await request("/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        authorization: `Bearer ${oauthAccessToken}`,
        "content-type": "application/json",
        origin: "https://evil.example",
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 21,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "foreign-origin-test", version: "1.0.0" },
        },
      }),
    });
    assert.equal(rejected.status, 403);
    assert.deepEqual(await rejected.json(), {
      error: "invalid_origin",
      code: "MCP_ORIGIN_REJECTED",
    });

    const malformedBody = await request("/mcp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://evil.example",
      },
      body: "{not-json",
    });
    assert.equal(malformedBody.status, 403);
    assert.equal((await malformedBody.json()).code, "MCP_ORIGIN_REJECTED");

    const oversizedBody = await request("/mcp", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        origin: "https://evil.example",
      },
      body: JSON.stringify({ ignored: "x".repeat(70 * 1024) }),
    });
    assert.equal(oversizedBody.status, 403);
    assert.equal((await oversizedBody.json()).code, "MCP_ORIGIN_REJECTED");

    for (const [method, origin] of [["GET", "null"], ["DELETE", "not-a-valid-origin"]]) {
      const invalid = await request("/mcp", {
        method,
        headers: {
          authorization: `Bearer ${oauthAccessToken}`,
          origin,
        },
      });
      assert.equal(invalid.status, 403, `${method} with ${origin} must be rejected`);
      assert.equal((await invalid.json()).code, "MCP_ORIGIN_REJECTED");
    }

    const sameOrigin = await request("/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        authorization: `Bearer ${oauthAccessToken}`,
        "content-type": "application/json",
        origin: ISSUER,
      },
      body: JSON.stringify({
        jsonrpc: "2.0",
        id: 22,
        method: "initialize",
        params: {
          protocolVersion: "2025-06-18",
          capabilities: {},
          clientInfo: { name: "same-origin-test", version: "1.0.0" },
        },
      }),
    });
    assert.equal(sameOrigin.status, 200);
    await sameOrigin.body?.cancel();
  });

  await t.test("legacy PWA access is rejected until its explicit opt-in is enabled", async () => {
    const disabled = await request("/api/status", {
      headers: { "x-dex-access-token": LEGACY_APP_TOKEN },
    });
    assert.equal(disabled.status, 401);
    await disabled.body?.cancel();

    const disabledRoot = await request("/?legacy=1");
    assert.equal(disabledRoot.status, 302);
    await disabledRoot.body?.cancel();

    await withEnv({ DEX_ALLOW_LEGACY_APP_TOKEN: "true" }, async () => {
      const enabled = await request("/api/status", {
        headers: { "x-dex-access-token": LEGACY_APP_TOKEN },
      });
      const status = await enabled.json();
      assert.equal(enabled.status, 200);
      assert.equal(status.authMode, "github-oauth");

      const enabledRoot = await request("/?legacy=1");
      assert.equal(enabledRoot.status, 200);
      assert.match(await enabledRoot.text(), /Dex Company/);
    });
  });

  await t.test("OAuth read-only MCP tool discovery omits create_task entirely", async () => withEnv({ DEX_ENABLE_MCP_WRITES: "true" }, async () => {
    const mcpRequest = (id, method, params) => request("/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        authorization: `Bearer ${oauthAccessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
    });
    const initialized = await mcpRequest(20, "initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "oauth-read-only-test", version: "1.0.0" },
    });
    assert.equal(initialized.status, 200);
    await initialized.body?.cancel();

    const listed = await mcpRequest(21, "tools/list", {});
    const listResult = parseEventStreamJsonRpc(await listed.text());
    assert.equal(listed.status, 200);
    const toolNames = listResult.result.tools.map((tool) => tool.name);
    assert.ok(toolNames.includes("search"));
    assert.ok(toolNames.includes("fetch"));
    assert.equal(toolNames.includes("create_task"), false);
  }));

  await t.test("the static MCP bearer is likewise opt-in only", async () => {
    const mcpRequest = (id, method, params) => request("/mcp", {
      method: "POST",
      headers: {
        accept: "application/json, text/event-stream",
        authorization: `Bearer ${LEGACY_MCP_TOKEN}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ jsonrpc: "2.0", id, method, params }),
    });
    const initializeParams = {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "legacy-mcp-test", version: "1.0.0" },
    };

    const disabled = await mcpRequest(2, "initialize", initializeParams);
    assert.equal(disabled.status, 401);
    await disabled.body?.cancel();

    await withEnv({ DEX_ALLOW_STATIC_MCP_BEARER: "true" }, async () => {
      const initialized = await mcpRequest(3, "initialize", initializeParams);
      const initializeResult = parseEventStreamJsonRpc(await initialized.text());
      assert.equal(initialized.status, 200);
      assert.equal(initializeResult.result.protocolVersion, "2025-06-18");
      assert.equal(initializeResult.result.serverInfo.name, "dex-company");
      assert.equal(initialized.headers.has("www-authenticate"), false);

      const listed = await mcpRequest(4, "tools/list", {});
      const listResult = parseEventStreamJsonRpc(await listed.text());
      assert.equal(listed.status, 200);
      const tools = listResult.result.tools;
      const providerStatusTool = tools.find((tool) => tool.name === "get_provider_status");
       const dashboardTool = tools.find((tool) => tool.name === "render_dashboard");
       const searchTool = tools.find((tool) => tool.name === "search");
       const fetchTool = tools.find((tool) => tool.name === "fetch");
       assert.ok(providerStatusTool);
       assert.deepEqual(providerStatusTool._meta.securitySchemes, [{ type: "oauth2", scopes: ["dex:read"] }]);
       assert.equal(searchTool?._meta.ui, undefined);
       assert.equal(dashboardTool?._meta.ui.resourceUri, "ui://dex-company/dashboard-v2.html");
       assert.deepEqual(Object.keys(searchTool.inputSchema.properties), ["query"]);
       assert.deepEqual(searchTool.inputSchema.required, ["query"]);
       assert.deepEqual(Object.keys(searchTool.outputSchema.properties), ["results"]);
       assert.deepEqual(Object.keys(fetchTool.inputSchema.properties), ["id"]);
       assert.deepEqual(Object.keys(fetchTool.outputSchema.properties), ["id", "title", "text", "url", "metadata"]);
       assert.equal(Object.hasOwn(fetchTool.outputSchema.properties, "resource"), false);

      const called = await mcpRequest(5, "tools/call", {
        name: "get_provider_status",
        arguments: {},
      });
      const callResult = parseEventStreamJsonRpc(await called.text());
      assert.equal(called.status, 200);
      assert.equal(callResult.result.structuredContent.pwa, ISSUER);
      assert.equal(callResult.result.structuredContent.writePolicy.mcpEnabled, false);
      assert.equal(callResult.result.structuredContent.providers.openai.authMode, "chatgpt-managed");
    });
  });

  await t.test("malformed JSON and invalid task packets fail before routing", async () => {
    const invalidJson = await request("/api/tasks/preview", {
      method: "POST",
      headers: {
        cookie: sessionCookie,
        "content-type": "application/json",
      },
      body: "{not-json",
    });
    assert.equal(invalidJson.status, 400);
    assert.deepEqual(await invalidJson.json(), {
      error: "Request body is not valid JSON.",
      code: "INVALID_JSON",
    });

    const invalidPacket = await request("/api/tasks/preview", {
      method: "POST",
      headers: {
        cookie: sessionCookie,
        "content-type": "application/json",
      },
      body: JSON.stringify({ task: { title: "" } }),
    });
    const invalidPayload = await invalidPacket.json();
    assert.equal(invalidPacket.status, 400);
    assert.equal(invalidPayload.code, "TASK_PACKET_INVALID");
    assert.ok(invalidPayload.details.some((issue) => issue.path === "task.title"));

    const validPacket = await request("/api/tasks/preview", {
      method: "POST",
      headers: {
        cookie: sessionCookie,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        task: { title: "Validate server input" },
        project: { name: "Runtime" },
        request: { source: "integration-test", objective: "Exercise the HTTP schema boundary." },
        routing: {},
        execution: { idempotencyKey: "server-auth-input-001" },
        inputs: { sourceNotes: ["definitions.md@rev1; period: UTC month"], files: ["definitions.md"] },
        validation: { required: ["Preserve the original denominator"], status: "not-checked" },
      }),
    });
    const validPayload = await validPacket.json();
    assert.equal(validPacket.status, 200);
    assert.equal(validPayload.task.task.priority, "normal");
    assert.equal(validPayload.task.request.originalText, "Exercise the HTTP schema boundary.");
    assert.deepEqual(validPayload.task.inputs, { sourceNotes: ["definitions.md@rev1; period: UTC month"], files: ["definitions.md"] });
    assert.deepEqual(validPayload.task.validation, { required: ["Preserve the original denominator"], status: "not-checked" });
    for (const context of [
      { inputs: { sourceNotes: "invalid scalar" } },
      { inputs: { sourceNotes: ["x".repeat(2_001)] } },
      { validation: { required: [{ command: "not a reference" }] } },
    ]) {
      const response = await request("/api/tasks/preview", {
        method: "POST", headers: { cookie: sessionCookie, "content-type": "application/json" },
        body: JSON.stringify({ ...validPayload.task, ...context }),
      });
      assert.equal(response.status, 400);
      assert.equal((await response.json()).code, "TASK_PACKET_INVALID");
    }
  });

  await t.test("session-authenticated writes require the matching CSRF token", async () => {
    const missing = await request("/auth/logout", {
      method: "POST",
      headers: { cookie: sessionCookie },
    });
    assert.equal(missing.status, 403);
    assert.equal((await missing.json()).code, "CSRF_FAILED");

    const wrong = await request("/auth/logout", {
      method: "POST",
      headers: {
        cookie: sessionCookie,
        "x-csrf-token": "wrong-token",
      },
    });
    assert.equal(wrong.status, 403);
    assert.equal((await wrong.json()).code, "CSRF_FAILED");

    const accepted = await request("/auth/logout", {
      method: "POST",
      headers: {
        cookie: sessionCookie,
        "x-csrf-token": CSRF_TOKEN,
      },
    });
    assert.equal(accepted.status, 204);
    assert.match(accepted.headers.get("set-cookie") ?? "", /dex_session=;.*Max-Age=0/);

    const replayedSession = await request("/api/session", {
      headers: { cookie: sessionCookie },
    });
    assert.equal(replayedSession.status, 200);
    assert.equal((await replayedSession.json()).authenticated, false);

    const replayedProtectedRequest = await request("/api/status", {
      headers: { cookie: sessionCookie },
    });
    assert.equal(replayedProtectedRequest.status, 401);
    assert.equal((await replayedProtectedRequest.json()).code, "AUTHENTICATION_REQUIRED");
  });

  await t.test("logged-out landing stays signed out until the user explicitly signs in", async () => {
    const landing = await request("/logged-out");
    const body = await landing.text();

    assert.equal(landing.status, 200);
    assert.match(landing.headers.get("cache-control") ?? "", /no-store/);
    assert.match(body, /로그아웃되었습니다/);
    assert.match(body, /href="\/auth\/github\/start\?returnTo=%2F"/);

    const root = await request("/");
    assert.equal(root.status, 302);
    assert.equal(root.headers.get("location"), "/auth/github/start?returnTo=%2F");
  });
});
