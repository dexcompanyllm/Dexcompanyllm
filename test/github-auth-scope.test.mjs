import assert from "node:assert/strict";
import { generateKeyPairSync } from "node:crypto";
import test from "node:test";

import { createGitHubAuth } from "../services/mcp-gateway/src/github-auth.mjs";

const { privateKey } = generateKeyPairSync("rsa", { modulusLength: 2048 });
const TEST_PRIVATE_KEY_B64 = Buffer.from(
  privateKey.export({ type: "pkcs8", format: "pem" }),
  "utf8",
).toString("base64");

function appEnv(overrides = {}) {
  return {
    GITHUB_APP_ID: "123",
    GITHUB_APP_INSTALLATION_ID: "456",
    GITHUB_APP_PRIVATE_KEY_B64: TEST_PRIVATE_KEY_B64,
    GITHUB_REPO: "dexcompanyllm/Dexcompanyllm",
    DEX_ENABLE_PWA_WRITES: "false",
    ...overrides,
  };
}

function scopedResponse(overrides = {}) {
  return {
    token: "scope-test-token",
    repositorySelection: "selected",
    repositoryNames: ["dex-company-wiki"],
    repositoryIds: [987654],
    permissions: {
      contents: "read",
      metadata: "read",
      issues: "read",
    },
    ...overrides,
  };
}

function authReturning(response, envOverrides = {}, calls = []) {
  return createGitHubAuth({
    env: appEnv(envOverrides),
    createAppAuth() {
      return async (options) => {
        calls.push(options);
        return response;
      };
    },
  });
}

test("installation token request is limited to one repository and read permissions by default", async () => {
  const calls = [];
  const auth = authReturning(scopedResponse(), {}, calls);

  assert.equal(await auth.getToken(), "scope-test-token");
  assert.deepEqual(calls, [{
    type: "installation",
    installationId: 456,
    repositoryNames: ["dex-company-wiki"],
    permissions: {
      contents: "read",
      metadata: "read",
      issues: "read",
    },
  }]);
});

test("issues write permission is requested only when PWA writes are explicitly enabled", async () => {
  const calls = [];
  const auth = authReturning(
    scopedResponse({
      permissions: {
        contents: "read",
        metadata: "read",
        issues: "write",
      },
    }),
    { DEX_ENABLE_PWA_WRITES: "true" },
    calls,
  );

  assert.equal(await auth.getToken(), "scope-test-token");
  assert.equal(calls[0].permissions.issues, "write");
});

test("MCP-only writes request issues write permission for the explicit local compatibility path", async () => {
  const calls = [];
  const auth = authReturning(
    scopedResponse({
      permissions: {
        contents: "read",
        metadata: "read",
        issues: "write",
      },
    }),
    { DEX_ENABLE_PWA_WRITES: "false", DEX_ENABLE_MCP_WRITES: "true" },
    calls,
  );

  assert.equal(await auth.getToken(), "scope-test-token");
  assert.equal(calls[0].permissions.issues, "write");
});

test("GitHub auth security flags reject unknown values instead of silently changing scope", () => {
  for (const name of ["DEX_ENABLE_PWA_WRITES", "DEX_ENABLE_MCP_WRITES", "DEX_ALLOW_GITHUB_TOKEN_FALLBACK"]) {
    assert.throws(
      () => createGitHubAuth({ env: appEnv({ [name]: "flase" }) }),
      (error) => error.code === "GITHUB_SECURITY_FLAG_INVALID" && !error.message.includes("flase"),
    );
  }
});

test("invalid owner/repo configuration fails before an installation strategy is created", async (t) => {
  for (const value of ["", "owner", "owner/repo/extra", "/repo", "owner/", "owner name/repo", "owner/.."]) {
    await t.test(value || "empty", async () => {
      let factoryCalled = false;
      const auth = createGitHubAuth({
        env: appEnv({ GITHUB_REPO: value }),
        createAppAuth() {
          factoryCalled = true;
          return async () => scopedResponse();
        },
      });

      assert.equal(auth.mode, "unconfigured");
      assert.equal(auth.getConfigurationDiagnostic().code, "GITHUB_REPO_INVALID");
      await assert.rejects(auth.getToken(), (error) => {
        assert.equal(error.code, "GITHUB_REPO_INVALID");
        assert.equal(error.message.includes(TEST_PRIVATE_KEY_B64), false);
        return true;
      });
      assert.equal(factoryCalled, false);
    });
  }
});

test("normalized Octokit scope metadata outside the requested ceiling fails closed", async (t) => {
  const cases = [
    ["missing all scope metadata", { repositorySelection: undefined, repositoryNames: undefined, repositoryIds: undefined, permissions: undefined }],
    ["missing repository selection", { repositorySelection: undefined }],
    ["missing repository identity", { repositoryNames: undefined, repositoryIds: undefined }],
    ["missing permissions", { permissions: undefined }],
    ["missing one non-implicit requested permission", { permissions: { metadata: "read", issues: "read" } }],
    ["all repositories", { repositorySelection: "all" }],
    ["multiple repository names", { repositoryNames: ["dex-company-wiki", "another-repo"] }],
    ["different repository name", { repositoryNames: ["another-repo"] }],
    ["multiple repository ids", { repositoryIds: [987654, 987655] }],
    ["contents write", { permissions: { contents: "write", metadata: "read", issues: "read" } }],
    ["metadata write", { permissions: { contents: "read", metadata: "write", issues: "read" } }],
    ["issues write while PWA writes are disabled", {
      permissions: { contents: "read", metadata: "read", issues: "write" },
    }],
    ["unexpected permission", {
      permissions: { contents: "read", metadata: "read", issues: "read", pull_requests: "read" },
    }],
  ];

  for (const [name, override] of cases) {
    await t.test(name, async () => {
      const auth = authReturning(scopedResponse(override));
      await assert.rejects(auth.getToken(), (error) => {
        assert.equal(error.code, "GITHUB_INSTALLATION_TOKEN_SCOPE_INVALID");
        assert.equal(error.status, 502);
        assert.equal(error.message.includes("scope-test-token"), false);
        assert.equal(error.message.includes(TEST_PRIVATE_KEY_B64), false);
        return true;
      });
    });
  }
});

test("installation tokens reject control characters and oversized values", async () => {
  for (const token of [`line-one${String.fromCharCode(10)}line-two`, "x".repeat(1_025)]) {
    const auth = authReturning(scopedResponse({ token }));
    await assert.rejects(auth.getToken(), (error) => {
      assert.equal(error.code, "GITHUB_INSTALLATION_TOKEN_INVALID_RESPONSE");
      assert.equal(error.message.includes(token), false);
      return true;
    });
  }
});

test("a rejected installation scope discards the strategy cache before a retry", async () => {
  let factoryCalls = 0;
  const auth = createGitHubAuth({
    env: appEnv(),
    createAppAuth() {
      factoryCalls += 1;
      let firstCall = true;
      return async (options) => {
        if (firstCall) {
          firstCall = false;
          return scopedResponse({
            token: "must-never-escape",
            repositoryNames: ["different-repository"],
          });
        }
        // This models @octokit/auth-app reconstructing metadata from the request
        // options on an internal cache hit after caching the raw bad response.
        return scopedResponse({
          token: "must-never-escape",
          repositoryNames: [...options.repositoryNames],
          permissions: { ...options.permissions },
        });
      };
    },
  });

  await assert.rejects(auth.getToken(), { code: "GITHUB_INSTALLATION_TOKEN_SCOPE_INVALID" });
  await assert.rejects(auth.getToken(), { code: "GITHUB_INSTALLATION_TOKEN_SCOPE_INVALID" });
  assert.equal(factoryCalls, 2);
});

test("raw GitHub scope metadata is checked when an injected strategy provides it", async () => {
  const accepted = authReturning({
    token: "raw-scope-test-token",
    repository_selection: "selected",
    repositories: [{
      name: "Dex-Company-Wiki",
      full_name: "dexcompanyllm/Dex-Company-Wiki",
      owner: { login: "dexcompanyllm" },
    }],
    permissions: {
      contents: "read",
      metadata: "read",
      issues: "read",
    },
  });
  assert.equal(await accepted.getToken(), "raw-scope-test-token");

  const rejected = authReturning({
    token: "raw-scope-test-token",
    repository_selection: "selected",
    repositories: [{
      name: "dex-company-wiki",
      full_name: "different-owner/dex-company-wiki",
      owner: { login: "different-owner" },
    }],
    permissions: {
      contents: "read",
      metadata: "read",
      issues: "read",
    },
  });
  await assert.rejects(rejected.getToken(), { code: "GITHUB_INSTALLATION_TOKEN_SCOPE_INVALID" });
});

test("official Octokit installation-token response preserves the required scope evidence", async () => {
  let calls = 0;
  const auth = createGitHubAuth({
    env: appEnv({ GITHUB_APP_INSTALLATION_ID: "700004" }),
    fetchImpl: async (url, init) => {
      calls += 1;
      assert.equal(url, "https://api.github.com/app/installations/700004/access_tokens");
      assert.equal(init.method, "POST");
      assert.equal(init.redirect, "error");
      const requestBody = JSON.parse(init.body);
      assert.deepEqual(requestBody.repositories, ["dex-company-wiki"]);
      assert.deepEqual(requestBody.permissions, {
        contents: "read",
        metadata: "read",
        issues: "read",
      });
      return new Response(JSON.stringify({
        token: "installation-fixture-token",
        expires_at: "2099-01-01T00:00:00Z",
        repository_selection: "selected",
        repositories: [{
          id: 987654,
          name: "dex-company-wiki",
          full_name: "dexcompanyllm/Dexcompanyllm",
        }],
        permissions: {
          contents: "read",
          issues: "read",
        },
      }), {
        status: 201,
        headers: { "content-type": "application/json" },
      });
    },
  });

  assert.equal(await auth.getToken(), "installation-fixture-token");
  assert.equal(calls, 1);
});

test("official installation-token transport rejects an oversized Content-Length before reading", async () => {
  let called = false;
  const auth = createGitHubAuth({
    env: appEnv({ GITHUB_APP_INSTALLATION_ID: "700001" }),
    maxResponseBytes: 32,
    fetchImpl: async (_url, init) => {
      called = true;
      assert.equal(init.redirect, "error");
      assert.equal(init.signal instanceof AbortSignal, true);
      return new Response("{}", {
        status: 201,
        headers: {
          "content-length": "33",
          "content-type": "application/json",
        },
      });
    },
  });

  await assert.rejects(auth.getToken(), (error) => {
    assert.equal(error.code, "GITHUB_INSTALLATION_TOKEN_RESPONSE_TOO_LARGE");
    assert.equal(error.status, 502);
    assert.equal(error.message.includes(TEST_PRIVATE_KEY_B64), false);
    return true;
  });
  assert.equal(called, true);
});

test("official installation-token transport bounds a streamed body without Content-Length", async () => {
  const auth = createGitHubAuth({
    env: appEnv({ GITHUB_APP_INSTALLATION_ID: "700002" }),
    maxResponseBytes: 32,
    fetchImpl: async () => new Response("x".repeat(33), {
      status: 201,
      headers: { "content-type": "application/json" },
    }),
  });

  await assert.rejects(auth.getToken(), {
    code: "GITHUB_INSTALLATION_TOKEN_RESPONSE_TOO_LARGE",
    status: 502,
  });
});

test("official installation-token transport times out even if a fetch ignores abort", async () => {
  const auth = createGitHubAuth({
    env: appEnv({ GITHUB_APP_INSTALLATION_ID: "700003" }),
    requestTimeoutMs: 10,
    fetchImpl: async (_url, init) => new Promise(() => {
      assert.equal(init.redirect, "error");
      assert.equal(init.signal instanceof AbortSignal, true);
    }),
  });

  await assert.rejects(auth.getToken(), (error) => {
    assert.equal(error.code, "GITHUB_INSTALLATION_TOKEN_TIMEOUT");
    assert.equal(error.status, 504);
    assert.equal(error.message.includes(TEST_PRIVATE_KEY_B64), false);
    return true;
  });
});
