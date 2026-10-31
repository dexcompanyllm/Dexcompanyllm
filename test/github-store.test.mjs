import test from "node:test";
import assert from "node:assert/strict";
import { generateKeyPairSync, verify } from "node:crypto";
import { createAppAuth as createOfficialAppAuth } from "@octokit/auth-app";

import {
  createGitHubAuth,
  decodeGitHubAppPrivateKey,
} from "../services/mcp-gateway/src/github-auth.mjs";
import { GitHubStore } from "../services/mcp-gateway/src/github-store.mjs";
import { createMemoryOAuthReplayStore } from "../services/mcp-gateway/src/oauth-replay-store.mjs";

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const TEST_PRIVATE_KEY = privateKey.export({ type: "pkcs8", format: "pem" });
const TEST_PRIVATE_KEY_B64 = Buffer.from(TEST_PRIVATE_KEY, "utf8").toString("base64");

function jsonResponse(payload, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function injectedAuth({ token = "installation-secret", configuration } = {}) {
  return {
    configured: true,
    mode: "app",
    getConfigurationDiagnostic() {
      return configuration ?? {
        ok: true,
        status: 200,
        code: "GITHUB_APP_CONFIGURED",
        message: "GitHub App configuration is valid.",
      };
    },
    async getToken() {
      return token;
    },
  };
}

test("GitHub App private key decoding accepts a real PEM and rejects invalid input without echoing it", () => {
  assert.equal(decodeGitHubAppPrivateKey(TEST_PRIVATE_KEY_B64), TEST_PRIVATE_KEY);

  const invalid = "not-a-private-key-secret";
  assert.throws(
    () => decodeGitHubAppPrivateKey(Buffer.from(invalid).toString("base64")),
    (error) => {
      assert.equal(error.code, "GITHUB_APP_PRIVATE_KEY_INVALID");
      assert.equal(error.message.includes(invalid), false);
      return true;
    },
  );

  const { privateKey: ecPrivateKey } = generateKeyPairSync("ec", { namedCurve: "P-256" });
  const ecPrivateKeyB64 = Buffer.from(
    ecPrivateKey.export({ type: "pkcs8", format: "pem" }),
    "utf8",
  ).toString("base64");
  assert.throws(
    () => decodeGitHubAppPrivateKey(ecPrivateKeyB64),
    (error) => error.code === "GITHUB_APP_PRIVATE_KEY_INVALID",
  );
});

test("official Octokit GitHub App auth creates a verifiable short-lived RS256 JWT", async () => {
  const auth = createOfficialAppAuth({ appId: 123, privateKey: TEST_PRIVATE_KEY });
  const authentication = await auth({ type: "app" });
  const [encodedHeader, encodedPayload, encodedSignature] = authentication.token.split(".");
  const header = JSON.parse(Buffer.from(encodedHeader, "base64url").toString("utf8"));
  const payload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));

  assert.equal(authentication.type, "app");
  assert.equal(header.alg, "RS256");
  assert.equal(String(payload.iss), "123");
  assert.ok(payload.exp > payload.iat);
  assert.ok(payload.exp - payload.iat <= 600);
  assert.equal(verify(
    "RSA-SHA256",
    Buffer.from(`${encodedHeader}.${encodedPayload}`, "ascii"),
    publicKey,
    Buffer.from(encodedSignature, "base64url"),
  ), true);
  assert.equal(JSON.stringify(authentication).includes(TEST_PRIVATE_KEY), false);
});

test("GitHub App auth creates one cached Octokit strategy and requests installation credentials", async () => {
  const strategyCalls = [];
  const authCalls = [];
  const auth = createGitHubAuth({
    env: {
      GITHUB_APP_ID: "123",
      GITHUB_APP_INSTALLATION_ID: "456",
      GITHUB_APP_PRIVATE_KEY_B64: TEST_PRIVATE_KEY_B64,
      GITHUB_REPO: "octo/example",
    },
    createAppAuth(options) {
      strategyCalls.push(options);
      return async (request) => {
        authCalls.push(request);
        return {
          token: "installation-token",
          repositorySelection: "selected",
          repositoryNames: ["example"],
          permissions: { contents: "read", metadata: "read", issues: "read" },
        };
      };
    },
  });

  assert.equal(auth.mode, "app");
  assert.equal(auth.configured, true);
  assert.equal(auth.getConfigurationDiagnostic().code, "GITHUB_APP_CONFIGURED");
  assert.equal(await auth.getToken(), "installation-token");
  assert.equal(await auth.getToken(), "installation-token");
  assert.equal(strategyCalls.length, 1);
  assert.equal(strategyCalls[0].appId, "123");
  assert.equal(strategyCalls[0].installationId, 456);
  assert.equal(strategyCalls[0].privateKey, TEST_PRIVATE_KEY);
  assert.deepEqual(authCalls, [
    {
      type: "installation",
      installationId: 456,
      repositoryNames: ["example"],
      permissions: { contents: "read", metadata: "read", issues: "read" },
    },
    {
      type: "installation",
      installationId: 456,
      repositoryNames: ["example"],
      permissions: { contents: "read", metadata: "read", issues: "read" },
    },
  ]);
});

test("token fallback requires explicit opt-in and is unavailable in production", async () => {
  const local = createGitHubAuth({
    env: {
      DEX_ALLOW_GITHUB_TOKEN_FALLBACK: "true",
      GITHUB_TOKEN: "local-only-token",
      NODE_ENV: "development",
    },
  });
  assert.equal(local.mode, "token-fallback");
  assert.equal(await local.getToken(), "local-only-token");

  const production = createGitHubAuth({
    env: {
      DEX_ALLOW_GITHUB_TOKEN_FALLBACK: "true",
      GITHUB_TOKEN: "must-not-be-used",
      VERCEL_ENV: "production",
    },
  });
  assert.equal(production.configured, false);
  assert.equal(production.getConfigurationDiagnostic().code, "GITHUB_APP_CONFIGURATION_MISSING");
  await assert.rejects(production.getToken(), (error) => {
    assert.equal(error.code, "GITHUB_APP_CONFIGURATION_MISSING");
    assert.equal(error.message.includes("must-not-be-used"), false);
    return true;
  });

  const vercelPreview = createGitHubAuth({
    env: {
      DEX_ALLOW_GITHUB_TOKEN_FALLBACK: "true",
      GITHUB_TOKEN: "must-not-be-used-in-preview",
      VERCEL_ENV: "preview",
    },
  });
  assert.equal(vercelPreview.configured, false);
  assert.equal(vercelPreview.getConfigurationDiagnostic().code, "GITHUB_APP_CONFIGURATION_MISSING");
});

test("GitHub requests use injected auth and the 2026-03-10 REST API version", async () => {
  const calls = [];
  const store = new GitHubStore({
    repo: "octo/example",
    ref: "main",
    auth: injectedAuth(),
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      return jsonResponse({
        sha: "abc123",
        encoding: "base64",
        content: Buffer.from("# Current\n").toString("base64"),
        html_url: "https://github.com/octo/example/blob/main/CURRENT.md",
      });
    },
  });

  const document = await store.fetchDocument("CURRENT.md");
  assert.equal(document.content, "# Current\n");
  assert.equal(calls.length, 1);
  assert.equal(calls[0].init.headers.Authorization, "Bearer installation-secret");
  assert.equal(calls[0].init.headers["X-GitHub-Api-Version"], "2026-03-10");
  assert.equal(calls[0].init.redirect, "error");
  assert.equal(calls[0].init.signal instanceof AbortSignal, true);
});

test("GitHub requests time out with a generic error and never expose fetch credentials or errors", async () => {
  const leakedSecret = "installation-secret-that-must-not-leak";
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth({ token: leakedSecret }),
    requestTimeoutMs: 10,
    fetchImpl: async (_url, init) => new Promise((_resolve, reject) => {
      assert.equal(init.redirect, "error");
      init.signal.addEventListener("abort", () => {
        reject(new Error(`network failure for Bearer ${leakedSecret}`));
      }, { once: true });
    }),
  });

  await assert.rejects(store.request("/repos/octo/example"), (error) => {
    assert.equal(error.code, "GITHUB_REQUEST_TIMEOUT");
    assert.equal(error.status, 504);
    assert.equal(error.message.includes(leakedSecret), false);
    assert.equal(error.message.includes("network failure"), false);
    return true;
  });
});

test("GitHub response Content-Length is rejected before an oversized body is read", async () => {
  let bodyReaderRequested = false;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    maxResponseBytes: 32,
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      headers: { get: (name) => name === "content-length" ? "33" : null },
      body: {
        getReader() {
          bodyReaderRequested = true;
          throw new Error("oversized body must not be read");
        },
      },
    }),
  });

  await assert.rejects(store.request("/repos/octo/example"), (error) => {
    assert.equal(error.code, "GITHUB_RESPONSE_TOO_LARGE");
    assert.equal(error.status, 502);
    return true;
  });
  assert.equal(bodyReaderRequested, false);
});

test("GitHub streamed responses are bounded even without Content-Length", async () => {
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    maxResponseBytes: 32,
    fetchImpl: async () => new Response("x".repeat(33), {
      status: 200,
      headers: { "content-type": "application/json" },
    }),
  });

  await assert.rejects(store.request("/repos/octo/example"), (error) => {
    assert.equal(error.code, "GITHUB_RESPONSE_TOO_LARGE");
    assert.equal(error.status, 502);
    return true;
  });
});

test("listProjects preserves order while limiting CURRENT.md requests to four at a time", async () => {
  const entries = Array.from({ length: 9 }, (_, index) => ({
    type: "dir",
    name: `Project-${index}`,
    path: `10_Projects/Project-${index}`,
    html_url: `https://github.com/octo/example/tree/main/10_Projects/Project-${index}`,
  }));
  let active = 0;
  let maxActive = 0;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async (url) => {
      if (url.includes("/contents/10_Projects?ref=")) return jsonResponse(entries);
      const project = decodeURIComponent(url.match(/10_Projects%2FProject-\d+|10_Projects\/Project-\d+/)?.[0] ?? "")
        .replace("10_Projects/", "");
      active += 1;
      maxActive = Math.max(maxActive, active);
      await new Promise((resolve) => setTimeout(resolve, 5));
      active -= 1;
      return jsonResponse({
        sha: `sha-${project}`,
        encoding: "base64",
        content: Buffer.from(`# ${project}\n`).toString("base64"),
        html_url: `https://github.com/octo/example/blob/main/10_Projects/${project}/CURRENT.md`,
      });
    },
  });

  const projects = await store.listProjects();
  assert.equal(maxActive, 4);
  assert.deepEqual(projects.map((project) => project.name), entries.map((entry) => entry.name));
  assert.deepEqual(projects.map((project) => project.summary), entries.map((entry) => `# ${entry.name}\n`));
});

test("listProjects rejects an oversized repository instead of silently truncating it", async () => {
  const entries = Array.from({ length: 251 }, (_, index) => ({
    type: "dir",
    name: `Project-${index}`,
    path: `10_Projects/Project-${index}`,
    html_url: `https://github.com/octo/example/tree/main/10_Projects/Project-${index}`,
  }));
  let calls = 0;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async () => {
      calls += 1;
      return jsonResponse(entries);
    },
  });

  await assert.rejects(store.listProjects(), (error) => {
    assert.equal(error.code, "GITHUB_PROJECT_LIMIT_EXCEEDED");
    assert.equal(error.status, 502);
    return true;
  });
  assert.equal(calls, 1);
});

test("listTasks exposes the canonical Task ID without replacing the fetchable issue id", async () => {
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async () => jsonResponse([{
      number: 42,
      title: "[DEX-TASK] Canonical retrieval",
      body: "Dex Company Task Packet\n\n```yaml\ntask:\n  id: DC-20260901-ABC123\n  title: Canonical retrieval\n  status: queued\n```",
      state: "open",
      html_url: "https://github.com/octo/example/issues/42",
      updated_at: "2026-09-01T00:00:00.000Z",
    }]),
  });

  const tasks = await store.listTasks("all");
  assert.equal(tasks.length, 1);
  assert.equal(tasks[0].id, "issue:42");
  assert.equal(tasks[0].taskId, "DC-20260901-ABC123");
});

test("diagnostics always return every independent stage in order with redacted errors", async () => {
  const fetched = [];
  const leakedSecret = "ghs_LEAKED_INSTALLATION_TOKEN";
  const store = new GitHubStore({
    repo: "octo/example",
    ref: "main",
    auth: injectedAuth({ token: leakedSecret }),
    fetchImpl: async (url) => {
      fetched.push(url);
      if (url.endsWith("/repos/octo/example")) {
        return new Response(`Denied: Bearer ${leakedSecret}`, { status: 404 });
      }
      return jsonResponse({ ok: true });
    },
  });

  const result = await store.diagnose();
  assert.deepEqual(result.checks.map((check) => check.name), [
    "app_configuration",
    "installation_token",
    "repository",
    "ref",
    "10_Projects",
    "current_document",
    "issues",
  ]);
  assert.deepEqual(result.checks.map((check) => typeof check.ok), Array(7).fill("boolean"));
  assert.deepEqual(result.checks.map((check) => typeof check.status), Array(7).fill("number"));
  assert.deepEqual(result.checks.map((check) => typeof check.code), Array(7).fill("string"));
  assert.deepEqual(result.checks.map((check) => typeof check.message), Array(7).fill("string"));
  assert.equal(result.checks[2].ok, false);
  assert.equal(result.checks[2].status, 404);
  assert.equal(result.checks.slice(3).every((check) => check.ok), true);
  assert.equal(fetched.length, 5);
  assert.equal(JSON.stringify(result).includes(leakedSecret), false);
});

test("diagnostics remain complete when configuration and installation authentication both fail", async () => {
  const leakedSecret = "github_pat_SHOULD_NEVER_APPEAR";
  const auth = {
    configured: false,
    mode: "unconfigured",
    getConfigurationDiagnostic() {
      const error = new Error(`Invalid private key ${leakedSecret}`);
      error.code = "GITHUB_APP_CONFIGURATION_FAILED";
      error.status = 500;
      throw error;
    },
    async getToken() {
      const error = new Error(`Authentication rejected ${leakedSecret}`);
      error.code = "GITHUB_INSTALLATION_TOKEN_FAILED";
      error.status = 401;
      throw error;
    },
  };
  const store = new GitHubStore({
    repo: "octo/example",
    auth,
    fetchImpl: async () => {
      throw new Error("fetch must not be reached when auth fails");
    },
  });

  const result = await store.diagnose();
  assert.equal(result.checks.length, 7);
  assert.equal(result.checks.every((check) => check.ok === false), true);
  assert.equal(result.checks[0].code, "GITHUB_APP_CONFIGURATION_FAILED");
  assert.equal(result.checks[1].code, "GITHUB_INSTALLATION_TOKEN_FAILED");
  assert.equal(JSON.stringify(result).includes(leakedSecret), false);
});

test("createTaskIssue returns the existing exact idempotency marker match without posting", async () => {
  const marker = "<!-- dex-idempotency-key:idem-123 -->";
  const existingPacket = {
    schemaVersion: "2.0",
    task: { id: "DC-EXISTING", title: "Existing task" },
    execution: { idempotencyKey: "idem-123" },
  };
  const calls = [];
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async (url, init) => {
      calls.push({ url, init });
      assert.equal(url.includes("/search/issues?"), true);
      return jsonResponse({
        items: [{
          number: 42,
          title: "[DEX-TASK] Existing task",
          html_url: "https://github.com/octo/example/issues/42",
          body: [
            "Dex Company Task Packet",
            "",
            "```yaml",
            YAMLForTest(existingPacket),
            "```",
            "",
            marker,
          ].join("\n"),
        }],
      });
    },
  });

  const result = await store.createTaskIssue({
    task: { title: "Existing task" },
    execution: { idempotencyKey: "idem-123" },
  });
  assert.equal(result.existing, true);
  assert.equal(result.issueNumber, 42);
  assert.equal(result.id, "DC-EXISTING");
  assert.equal(result.packet.execution.idempotencyKey, "idem-123");
  assert.equal(calls.length, 1);
});

test("createTaskIssue searches before create and embeds an exact idempotency marker", async () => {
  const calls = [];
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async (url, init = {}) => {
      calls.push({ url, init });
      if (url.includes("/search/issues?")) return jsonResponse({ items: [] });
      assert.equal(url.endsWith("/repos/octo/example/issues"), true);
      assert.equal(init.method, "POST");
      const posted = JSON.parse(init.body);
      assert.equal(posted.body.includes("<!-- dex-idempotency-key:idem-new -->"), true);
      return jsonResponse({
        number: 43,
        html_url: "https://github.com/octo/example/issues/43",
        body: posted.body,
      }, 201);
    },
  });

  const result = await store.createTaskIssue({
    task: { id: "DC-NEW", title: "New task" },
    execution: { idempotencyKey: "idem-new" },
  });
  assert.equal(result.issueNumber, 43);
  assert.equal(result.packet.execution.idempotencyKey, "idem-new");
  assert.equal(calls.length, 2);

  // Durable claim/result records are covered by the concurrent regression below.
});

test("createTaskIssue uses an atomic claim so concurrent and conflicting retries cannot duplicate", async () => {
  let releaseSearch;
  let markSearchStarted;
  const searchGate = new Promise((resolve) => { releaseSearch = resolve; });
  const searchStarted = new Promise((resolve) => { markSearchStarted = resolve; });
  let postedBody = null;
  let postCount = 0;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async (url, init = {}) => {
      if (url.includes("/search/issues?")) {
        markSearchStarted();
        await searchGate;
        return jsonResponse({ items: [] });
      }
      if (url.endsWith("/repos/octo/example/issues") && init.method === "POST") {
        postCount += 1;
        postedBody = JSON.parse(init.body).body;
        return jsonResponse({
          number: 77,
          html_url: "https://github.com/octo/example/issues/77",
          body: postedBody,
        }, 201);
      }
      if (url.endsWith("/repos/octo/example/issues/77")) {
        return jsonResponse({
          number: 77,
          html_url: "https://github.com/octo/example/issues/77",
          body: postedBody,
        });
      }
      throw new Error(`Unexpected request: ${url}`);
    },
  });
  const task = {
    task: { id: "DC-CONCURRENT", title: "One atomic task" },
    project: { name: "Company-Ops", baseRef: "main" },
    request: { source: "test", objective: "Prove concurrency safety.", originalText: "Prove concurrency safety." },
    routing: { role: "auto", requiredCapabilities: [], preferredProvider: "auto" },
    acceptanceCriteria: [],
    execution: { riskLevel: "low", idempotencyKey: "idem-concurrent-001" },
  };

  const first = store.createTaskIssue(task);
  await searchStarted;
  await assert.rejects(
    () => store.createTaskIssue(task),
    (error) => error.code === "GITHUB_TASK_CREATION_IN_PROGRESS" && error.status === 409,
  );
  releaseSearch();
  const created = await first;
  assert.equal(created.existing, false);
  assert.equal(postCount, 1);

  const retried = await store.createTaskIssue(task);
  assert.equal(retried.existing, true);
  assert.equal(retried.issueNumber, 77);
  assert.equal(postCount, 1);

  await assert.rejects(
    () => store.createTaskIssue({ ...task, task: { ...task.task, title: "Different task" } }),
    (error) => error.code === "GITHUB_IDEMPOTENCY_KEY_CONFLICT" && error.status === 409,
  );
  assert.equal(postCount, 1);
});

test("an ambiguous committed POST stays uncertain for the bounded reconciliation TTL", async () => {
  const nowRef = { value: 1_800_000_000 };
  const idempotencyStore = createMemoryOAuthReplayStore({ now: () => nowRef.value });
  let postCount = 0;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    idempotencyStore,
    fetchImpl: async (url, init = {}) => {
      if (url.includes("/search/issues?")) return jsonResponse({ items: [] });
      if (url.endsWith("/repos/octo/example/issues") && init.method === "POST") {
        postCount += 1;
        throw new Error("connection lost after upstream commit");
      }
      throw new Error(`Unexpected request: ${url}`);
    },
  });
  const task = {
    task: { title: "Ambiguous create" },
    execution: { idempotencyKey: "idem-ambiguous-001" },
  };

  await assert.rejects(
    () => store.createTaskIssue(task),
    (error) => error.code === "GITHUB_NETWORK_ERROR",
  );
  nowRef.value += 2_600_000;
  await assert.rejects(
    () => store.createTaskIssue(task),
    (error) => error.code === "GITHUB_TASK_CREATION_UNCERTAIN" && error.status === 409,
  );
  assert.equal(postCount, 1);
});

test("an expired ambiguous state searches GitHub and reconciles before another POST", async () => {
  const nowRef = { value: 1_800_000_000 };
  const idempotencyStore = createMemoryOAuthReplayStore({ now: () => nowRef.value });
  let postedBody = null;
  let postCount = 0;
  let searchCount = 0;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    idempotencyStore,
    fetchImpl: async (url, init = {}) => {
      if (url.includes("/search/issues?")) {
        searchCount += 1;
        if (searchCount === 1) return jsonResponse({ items: [] });
        return jsonResponse({
          items: [{
            number: 91,
            html_url: "https://github.com/octo/example/issues/91",
            body: postedBody,
          }],
        });
      }
      if (url.endsWith("/repos/octo/example/issues") && init.method === "POST") {
        postCount += 1;
        postedBody = JSON.parse(init.body).body;
        throw new Error("connection lost after upstream commit");
      }
      throw new Error(`Unexpected request: ${url}`);
    },
  });
  const task = {
    task: { title: "Reconcile after TTL" },
    execution: { idempotencyKey: "idem-expired-reconcile-001" },
  };

  await assert.rejects(
    () => store.createTaskIssue(task),
    (error) => error.code === "GITHUB_NETWORK_ERROR",
  );
  nowRef.value += 2_700_000;
  const reconciled = await store.createTaskIssue(task);
  assert.equal(reconciled.existing, true);
  assert.equal(reconciled.issueNumber, 91);
  assert.equal(postCount, 1);
  assert.equal(searchCount, 2);
});

test("a create response is not committed as idempotent success until its issue body is verified", async () => {
  let postCount = 0;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    fetchImpl: async (url, init = {}) => {
      if (url.includes("/search/issues?")) return jsonResponse({ items: [] });
      if (url.endsWith("/repos/octo/example/issues") && init.method === "POST") {
        postCount += 1;
        return jsonResponse({
          number: 88,
          html_url: "https://github.com/octo/example/issues/88",
          body: "missing the idempotency marker",
        }, 201);
      }
      if (url.endsWith("/repos/octo/example/issues/88")) {
        return jsonResponse({
          number: 88,
          html_url: "https://github.com/octo/example/issues/88",
          body: "still missing the idempotency marker",
        });
      }
      throw new Error(`Unexpected request: ${url}`);
    },
  });
  const task = {
    task: { title: "Verify create boundary" },
    execution: { idempotencyKey: "idem-verify-result-001" },
  };

  await assert.rejects(
    () => store.createTaskIssue(task),
    (error) => error.code === "GITHUB_IDEMPOTENCY_RESULT_INVALID" && error.status === 503,
  );
  await assert.rejects(
    () => store.createTaskIssue(task),
    (error) => error.code === "GITHUB_IDEMPOTENCY_RESULT_INVALID" && error.status === 503,
  );
  assert.equal(postCount, 1);
});

test("hosted task creation refuses a non-durable idempotency store even when a flag requests memory", async () => {
  let fetchCalled = false;
  const store = new GitHubStore({
    repo: "octo/example",
    auth: injectedAuth(),
    env: {
      NODE_ENV: "production",
      DEX_REQUIRE_DURABLE_OAUTH_STATE: "false",
      GITHUB_REPO: "octo/example",
    },
    idempotencyStore: createMemoryOAuthReplayStore(),
    fetchImpl: async () => {
      fetchCalled = true;
      return jsonResponse({ items: [] });
    },
  });

  await assert.rejects(
    () => store.createTaskIssue({
      task: { title: "Hosted durability guard" },
      execution: { idempotencyKey: "idem-hosted-durable-001" },
    }),
    (error) => error.code === "GITHUB_IDEMPOTENCY_STORE_UNAVAILABLE" && error.status === 503,
  );
  assert.equal(fetchCalled, false);
});

function YAMLForTest(packet) {
  return [
    `schemaVersion: "${packet.schemaVersion}"`,
    "task:",
    `  id: ${packet.task.id}`,
    `  title: ${packet.task.title}`,
    "execution:",
    `  idempotencyKey: ${packet.execution.idempotencyKey}`,
  ].join("\n");
}


test("task references and validation survive persistence, exact retries and definition conflicts", async () => {
  let postedBody;
  let posts = 0;
  const store = new GitHubStore({ repo:"octo/example", auth:injectedAuth(), fetchImpl:async (url,init={}) => {
    if (url.includes("/search/issues?")) return jsonResponse({items:[]});
    if (init.method === "POST") { posts++; postedBody=JSON.parse(init.body).body; }
    return jsonResponse({number:88,html_url:"https://github.com/octo/example/issues/88",body:postedBody});
  }});
  const task = {
    task:{title:"Reuse business definitions"}, execution:{idempotencyKey:"context-reuse-001"},
    inputs:{ files:["definitions/metrics.md"],urls:["https://example.invalid/report"],issues:["issue:12"],pullRequests:[],sourceNotes:["metrics.md@rev1; UTC; count tasks, not attempts"] },
    validation:{required:["Reuse the period and denominator"],status:"not-checked"},
  };
  const first = await store.createTaskIssue(task);
  assert.deepEqual(first.packet.inputs,task.inputs);
  assert.deepEqual(first.packet.validation,task.validation);
  assert.equal((await store.createTaskIssue(structuredClone(task))).existing,true);
  for (const changed of [
    {...task,inputs:{...task.inputs,sourceNotes:["metrics.md@rev2; changed period"]}},
    {...task,validation:{...task.validation,required:["Use a different denominator"]}},
  ]) await assert.rejects(() => store.createTaskIssue(changed),error=>error.code==="GITHUB_IDEMPOTENCY_KEY_CONFLICT");
  assert.equal(posts,1);
});


test("legacy requests keep their pre-change idempotency fingerprint", async () => {
  const memory = { ...createMemoryOAuthReplayStore() };
  const claim = memory.claim.bind(memory);
  let observed;
  memory.claim = async (...args) => { observed = args[2]; return claim(...args); };
  const store = new GitHubStore({
    repo:"octo/example", auth:injectedAuth(), idempotencyStore:memory,
    fetchImpl:async (url,init={}) => url.includes("/search/issues?") ? jsonResponse({items:[]})
      : jsonResponse({number:90,html_url:"https://github.com/octo/example/issues/90",body:JSON.parse(init.body).body}),
  });
  const result = await store.createTaskIssue({task:{title:"Legacy definition"},execution:{idempotencyKey:"legacy-context-001"}});
  // Golden reproduced on public distribution dca864f with its runtime.invalid source.
  assert.equal(observed,"pending:2n3AVaOuzPAG-wjx1lTWKXculFm6kaT8QclyNNu80AQ");
  assert.equal(Object.hasOwn(result.packet,"inputs"),false);
  assert.equal(Object.hasOwn(result.packet,"validation"),false);
});

test("invalid, oversized or secret-bearing references fail before coordination or network writes", async () => {
  let networkCalls = 0;
  let claims = 0;
  const memory = { ...createMemoryOAuthReplayStore() };
  const claim = memory.claim.bind(memory);
  memory.claim = async (...args) => { claims++; return claim(...args); };
  const store = new GitHubStore({repo:"octo/example",auth:injectedAuth(),idempotencyStore:memory,fetchImpl:async () => { networkCalls++; throw new Error("Unexpected network"); }});
  const fakeSecret = ["ghp",["A4pxT7","K9mzR2","B6qjS8","V3ncL5","D8wfH1","E7uyP2"].join("")].join("_");
  for (const [context, code] of [
    [{inputs:{sourceNotes:"invalid scalar"}},"TASK_CONTEXT_INVALID"],
    [{inputs:{sourceNotes:Array(50).fill("한".repeat(100))}},"TASK_CONTEXT_INVALID"],
    [{validation:{required:[{}]}},"TASK_CONTEXT_INVALID"],
    [{inputs:{sourceNotes:[fakeSecret]}},"TASK_CONTEXT_SECRET_DETECTED"],
  ]) await assert.rejects(() => store.createTaskIssue({task:{title:"Invalid context"},execution:{idempotencyKey:"invalid-context-001"},...context}),error=>error.code===code && !error.message.includes(fakeSecret));
  assert.equal(networkCalls,0);
  assert.equal(claims,0);
});
