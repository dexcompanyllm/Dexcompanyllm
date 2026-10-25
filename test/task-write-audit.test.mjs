import assert from "node:assert/strict";
import crypto from "node:crypto";
import test from "node:test";

import { createAuthCrypto } from "../services/mcp-gateway/src/auth-crypto.mjs";

const ISSUER = "http://localhost:8789";
const AUTH_SECRET_B64 = Buffer.alloc(32, 29).toString("base64");
const GITHUB_CLIENT_SECRET = "audit-github-client-secret-must-not-log";
const CSRF_TOKEN = Buffer.alloc(32, 31).toString("base64url");
const WRONG_CSRF_TOKEN = "audit-wrong-csrf-must-not-log";
const BEARER_TOKEN = "audit-bearer-token-must-not-log";
const RAW_TITLE = "audit-raw-title-must-not-log";
const RAW_OBJECTIVE = "audit-raw-objective-must-not-log";
const RAW_PAYLOAD_SECRET = "audit-payload-credential-must-not-log";
const OVERSIZED_PAYLOAD_SECRET = "audit-oversized-payload-must-not-log";
const IDEMPOTENCY_KEY = "audit-idempotency-key-must-not-log";

const TEST_ENV = {
  NODE_ENV: "test",
  PORT: "0",
  DEX_PUBLIC_ORIGIN: ISSUER,
  DEX_AUTH_SECRET_B64: AUTH_SECRET_B64,
  DEX_ALLOWED_GITHUB_LOGIN: "dexcompanyllm",
  DEX_ALLOWED_GITHUB_USER_ID: "890",
  GITHUB_APP_CLIENT_ID: "audit-github-client-id",
  GITHUB_APP_CLIENT_SECRET: GITHUB_CLIENT_SECRET,
  GITHUB_REPO: "dex-test/runtime",
  GITHUB_REF: "main",
  DEX_ALLOW_LEGACY_APP_TOKEN: "false",
  DEX_ALLOW_STATIC_MCP_BEARER: "false",
  DEX_ALLOW_UNAUTHENTICATED_APP: "false",
  DEX_ALLOW_UNAUTHENTICATED_MCP: "false",
  DEX_ENABLE_PWA_WRITES: "false",
  DEX_ENABLE_MCP_WRITES: "false",
  VERCEL_ENV: undefined,
  VERCEL_URL: undefined,
  GITHUB_APP_ID: undefined,
  GITHUB_APP_INSTALLATION_ID: undefined,
  GITHUB_APP_PRIVATE_KEY: undefined,
  GITHUB_APP_PRIVATE_KEY_B64: undefined,
  GITHUB_TOKEN: undefined,
  KV_REST_API_URL: undefined,
  KV_REST_API_TOKEN: undefined,
  UPSTASH_REDIS_REST_URL: undefined,
  UPSTASH_REDIS_REST_TOKEN: undefined,
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

function taskPacket() {
  return {
    task: { title: RAW_TITLE },
    project: { name: "AuditProject" },
    request: { source: "audit-test", objective: RAW_OBJECTIVE },
    routing: {},
    constraints: { credential: RAW_PAYLOAD_SECRET },
    execution: { idempotencyKey: IDEMPOTENCY_KEY },
  };
}

function parseAuditRecords(lines) {
  return lines.flatMap((line) => {
    try {
      const parsed = JSON.parse(line);
      return parsed?.event === "task.create" ? [parsed] : [];
    } catch {
      return [];
    }
  });
}

test("PWA task writes emit bounded audit outcomes without recording request secrets", async (t) => {
  const restoreEnv = installEnv(TEST_ENV);
  const originalInfo = console.info;
  const originalError = console.error;
  const auditLines = [];
  const errorLines = [];
  console.info = (...values) => auditLines.push(values.map(String).join(" "));
  console.error = (...values) => errorLines.push(values.map((value) => (
    typeof value === "string" ? value : JSON.stringify(value)
  )).join(" "));

  let server;
  t.after(async () => {
    try {
      if (server?.listening) await closeServer(server);
    } finally {
      console.info = originalInfo;
      console.error = originalError;
      restoreEnv();
    }
  });

  const serverUrl = new URL("../services/mcp-gateway/src/server.mjs", import.meta.url);
  serverUrl.searchParams.set("task-write-audit-test", `${process.pid}-${Date.now()}`);
  const { default: app } = await import(serverUrl.href);
  server = await new Promise((resolve, reject) => {
    const candidate = app.listen(0, "127.0.0.1", () => resolve(candidate));
    candidate.once("error", reject);
  });
  const address = server.address();
  assert.ok(address && typeof address === "object");
  const baseUrl = `http://127.0.0.1:${address.port}`;

  async function request(init = {}) {
    return fetch(`${baseUrl}/api/tasks`, {
      method: "POST",
      redirect: "manual",
      signal: AbortSignal.timeout(5_000),
      ...init,
    });
  }

  const authCrypto = createAuthCrypto({ secretB64: AUTH_SECRET_B64, issuer: ISSUER });
  const sessionToken = authCrypto.signJwt("session", {
    sub: "github:890",
    aud: `${ISSUER}/app`,
    github_login: "dexcompanyllm",
    github_id: 890,
    csrf: CSRF_TOKEN,
    token_use: "session",
  }, { ttlSeconds: 600 });
  const sessionCookie = `dex_session=${sessionToken}`;
  const jsonHeaders = { "content-type": "application/json" };

  await t.test("authentication and CSRF denials are attributed to task.create", async () => {
    const unauthenticated = await request({
      headers: { ...jsonHeaders, authorization: `Bearer ${BEARER_TOKEN}` },
      body: JSON.stringify(taskPacket()),
    });
    assert.equal(unauthenticated.status, 401);

    const csrfDenied = await request({
      headers: {
        ...jsonHeaders,
        cookie: sessionCookie,
        "x-csrf-token": WRONG_CSRF_TOKEN,
      },
      body: JSON.stringify(taskPacket()),
    });
    assert.equal(csrfDenied.status, 403);

    const records = parseAuditRecords(auditLines);
    assert.ok(records.some((record) => record.outcome === "denied" && record.code === "AUTHENTICATION_REQUIRED"));
    assert.ok(records.some((record) => record.outcome === "denied" && record.code === "CSRF_FAILED"));
  });

  await t.test("the disabled write gate, validation, and downstream failure are audited", async () => {
    const disabled = await request({
      headers: { ...jsonHeaders, cookie: sessionCookie, "x-csrf-token": CSRF_TOKEN },
      body: JSON.stringify(taskPacket()),
    });
    assert.equal(disabled.status, 403);
    assert.equal((await disabled.json()).code, "PWA_WRITE_DISABLED");

    await withEnv({ DEX_ENABLE_PWA_WRITES: "true" }, async () => {
      const invalid = await request({
        headers: { ...jsonHeaders, cookie: sessionCookie, "x-csrf-token": CSRF_TOKEN },
        body: JSON.stringify({ task: { title: RAW_TITLE }, hidden: RAW_PAYLOAD_SECRET }),
      });
      assert.equal(invalid.status, 400);
      assert.equal((await invalid.json()).code, "TASK_PACKET_INVALID");

      const failed = await request({
        headers: { ...jsonHeaders, cookie: sessionCookie, "x-csrf-token": CSRF_TOKEN },
        body: JSON.stringify(taskPacket()),
      });
      assert.ok(failed.status >= 400);
    });

    const records = parseAuditRecords(auditLines);
    assert.ok(records.some((record) => record.outcome === "denied" && record.code === "PWA_WRITE_DISABLED"));
    assert.ok(records.some((record) => record.outcome === "validation_failed" && record.code === "TASK_PACKET_INVALID"));
    const failedRecord = records.find((record) => record.outcome === "failed" && record.project === "AuditProject");
    assert.ok(failedRecord);
    assert.equal(failedRecord.idempotencyKeyHash, crypto.createHash("sha256").update(IDEMPOTENCY_KEY).digest("hex").slice(0, 16));
  });

  await t.test("oversized task bodies return a generic 413 and a validation audit without logging payload data", async () => {
    const previousRecordCount = parseAuditRecords(auditLines).length;
    const oversized = await request({
      headers: { ...jsonHeaders, cookie: sessionCookie, "x-csrf-token": CSRF_TOKEN },
      body: JSON.stringify({
        hidden: `${OVERSIZED_PAYLOAD_SECRET}${"x".repeat(70 * 1024)}`,
      }),
    });

    assert.equal(oversized.status, 413);
    assert.deepEqual(await oversized.json(), {
      error: "Request body is too large.",
      code: "PAYLOAD_TOO_LARGE",
    });
    const newRecords = parseAuditRecords(auditLines).slice(previousRecordCount);
    assert.ok(newRecords.some((record) => (
      record.outcome === "validation_failed" && record.code === "PAYLOAD_TOO_LARGE"
    )));
  });

  await t.test("rate-limit rejection has its own audit outcome", async () => {
    let limited;
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const response = await request({
        headers: { ...jsonHeaders, cookie: sessionCookie, "x-csrf-token": CSRF_TOKEN },
        body: JSON.stringify(taskPacket()),
      });
      if (response.status === 429) {
        limited = response;
        break;
      }
    }
    assert.ok(limited, "Expected the bounded task-create rate limit to reject a request.");
    assert.equal((await limited.json()).code, "RATE_LIMITED");
    assert.ok(parseAuditRecords(auditLines).some((record) => (
      record.outcome === "rate_limited" && record.code === "RATE_LIMITED"
    )));
  });

  await t.test("audit and safe error output exclude payload and credential values", () => {
    const output = [...auditLines, ...errorLines].join("\n");
    for (const forbidden of [
      AUTH_SECRET_B64,
      GITHUB_CLIENT_SECRET,
      CSRF_TOKEN,
      WRONG_CSRF_TOKEN,
      BEARER_TOKEN,
      sessionToken,
      RAW_TITLE,
      RAW_OBJECTIVE,
      RAW_PAYLOAD_SECRET,
      OVERSIZED_PAYLOAD_SECRET,
      IDEMPOTENCY_KEY,
    ]) {
      assert.equal(output.includes(forbidden), false, `Sensitive value was logged: ${forbidden}`);
    }

    for (const record of parseAuditRecords(auditLines)) {
      for (const forbiddenField of ["task", "request", "payload", "csrf", "idempotencyKey", "authorization", "cookie"]) {
        assert.equal(Object.hasOwn(record, forbiddenField), false);
      }
    }
  });
});
