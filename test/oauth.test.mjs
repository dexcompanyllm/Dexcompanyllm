import assert from "node:assert/strict";
import { createHash, createHmac, hkdfSync, randomBytes } from "node:crypto";
import test from "node:test";
import { createAuthCrypto } from "../services/mcp-gateway/src/auth-crypto.mjs";
import {
  OAuthError,
  createOAuthService,
} from "../services/mcp-gateway/src/oauth-service.mjs";
import { createMemoryOAuthReplayStore } from "../services/mcp-gateway/src/oauth-replay-store.mjs";

const ORIGIN = "https://dex.example.test";
const REDIRECT_URI = "https://client.example.test/oauth/callback";
const SECRET_B64 = randomBytes(48).toString("base64");

function pkce(verifier = "a".repeat(64)) {
  return {
    verifier,
    challenge: createHash("sha256").update(verifier, "ascii").digest("base64url"),
  };
}

function nonCanonicalBase64UrlVariant(value) {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
  const last = value.at(-1);
  const index = alphabet.indexOf(last);
  for (let candidateIndex = 0; candidateIndex < alphabet.length; candidateIndex += 1) {
    if (candidateIndex === index) continue;
    const candidate = `${value.slice(0, -1)}${alphabet[candidateIndex]}`;
    if (Buffer.from(candidate, "base64url").equals(Buffer.from(value, "base64url"))) return candidate;
  }
  throw new Error("No non-canonical variant exists for this fixture.");
}

function signRawAccessJwt(claims) {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" }), "utf8").toString("base64url");
  const payload = Buffer.from(JSON.stringify(claims), "utf8").toString("base64url");
  const key = Buffer.from(hkdfSync(
    "sha256",
    Buffer.from(SECRET_B64, "base64"),
    Buffer.from("dex-company-auth/v1", "utf8"),
    Buffer.from("dex-company/jwt/access", "utf8"),
    32,
  ));
  const input = `${header}.${payload}`;
  const signature = createHmac("sha256", key).update(input, "ascii").digest("base64url");
  return `${input}.${signature}`;
}

function createGitHubFetch({
  user = { login: "dexcompanyllm", id: 338_038_398 },
  failSecondExchange = false,
} = {}) {
  const exchangedCodes = new Set();
  const calls = [];
  const githubToken = "github-token-must-never-escape";

  const fetchImpl = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, init });

    if (url === "https://github.com/login/oauth/access_token") {
      const body = new URLSearchParams(init.body);
      const code = body.get("code");
      if (!code || (failSecondExchange && exchangedCodes.has(code))) {
        return Response.json({
          error: "bad_verification_code",
          error_description: "The code passed is incorrect or expired.",
        });
      }
      exchangedCodes.add(code);
      return Response.json({ access_token: githubToken, token_type: "bearer" });
    }

    if (url === "https://api.github.com/user") {
      assert.equal(init.headers.Authorization, `Bearer ${githubToken}`);
      return Response.json(user);
    }

    throw new Error(`Unexpected external request: ${url}`);
  };

  return { fetchImpl, calls, githubToken };
}

function createService({ nowRef = { value: 1_800_000_000 }, fetchOptions, ...overrides } = {}) {
  const github = createGitHubFetch(fetchOptions);
  const service = createOAuthService({
    secretB64: SECRET_B64,
    publicOrigin: ORIGIN,
    githubClientId: "github-app-client-id",
    githubClientSecret: "github-app-client-secret",
    allowedGitHubLogin: "dexcompanyllm",
    fetchImpl: github.fetchImpl,
    now: () => nowRef.value,
    ...overrides,
  });
  return { service, github, nowRef };
}

function registerClient(service, redirectUri = REDIRECT_URI) {
  return service.registerClient({
    client_name: "OAuth test client",
    application_type: "web",
    redirect_uris: [redirectUri],
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
  });
}

function beginMcp(service, client, { browserNonce, verifier = "a".repeat(64), scope = "dex:read offline_access", ...overrides } = {}) {
  const proof = pkce(verifier);
  const result = service.beginMcpAuthorization({
    client_id: client.client_id,
    redirect_uri: client.redirect_uris[0],
    response_type: "code",
    resource: `${ORIGIN}/mcp`,
    scope,
    state: "mcp-client-state",
    code_challenge: proof.challenge,
    code_challenge_method: "S256",
    ...overrides,
  }, browserNonce ? { browserNonce } : undefined);
  return { ...result, verifier: proof.verifier };
}

function approveMcp(service, authorization) {
  return service.continueMcpAuthorization({
    state: authorization.opaqueState,
    browserNonce: authorization.stateCookiePayload.value,
    decision: "approve",
  });
}

async function completeMcp(service, client, { githubCode = "github-code-once", browserNonce, scope = "dex:read offline_access" } = {}) {
  const authorization = beginMcp(service, client, { browserNonce, scope });
  const consent = await approveMcp(service, authorization);
  const callback = await service.handleGitHubCallback({
    code: githubCode,
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  const clientCallback = new URL(callback.redirectUrl);
  const token = await service.exchangeToken(new URLSearchParams({
    grant_type: "authorization_code",
    code: clientCallback.searchParams.get("code"),
    client_id: client.client_id,
    redirect_uri: client.redirect_uris[0],
    code_verifier: authorization.verifier,
    resource: `${ORIGIN}/mcp`,
  }));
  return { authorization, callback, token };
}

function refreshBody(client, refreshToken, overrides = {}) {
  return {
    grant_type: "refresh_token",
    refresh_token: refreshToken,
    client_id: client.client_id,
    resource: `${ORIGIN}/mcp`,
    ...overrides,
  };
}

function expectOAuthError(fn, code, status) {
  return assert.rejects(fn, (error) => {
    assert.ok(error instanceof OAuthError);
    assert.equal(error.code, code);
    if (status !== undefined) assert.equal(error.status, status);
    assert.deepEqual(error.toJSON(), {
      error: code,
      error_description: error.description,
    });
    return true;
  });
}

test("publishes RFC 8414 and RFC 9728 metadata with an exact MCP resource", () => {
  const { service } = createService();

  assert.equal(service.configured, true);
  assert.deepEqual(service.config, {
    issuer: ORIGIN,
    resource: `${ORIGIN}/mcp`,
    allowedLogin: "dexcompanyllm",
    allowedUserId: 338_038_398,
    authorizationCodeTtlSeconds: 90,
    accessTokenTtlSeconds: 600,
    refreshTokenTtlSeconds: 604_800,
    refreshFamilyTtlSeconds: 2_592_000,
    sessionTtlSeconds: 28_800,
    clockSkewSeconds: 5,
  });
  assert.deepEqual(service.authorizationServerMetadata(), {
    issuer: ORIGIN,
    authorization_endpoint: `${ORIGIN}/oauth/authorize`,
    token_endpoint: `${ORIGIN}/oauth/token`,
    registration_endpoint: `${ORIGIN}/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: ["dex:read", "offline_access"],
    authorization_response_iss_parameter_supported: true,
  });
  assert.deepEqual(service.protectedResourceMetadata(), {
    resource: `${ORIGIN}/mcp`,
    authorization_servers: [ORIGIN],
    bearer_methods_supported: ["header"],
    scopes_supported: ["dex:read"],
  });
  assert.match(service.wwwAuthenticate(), /^Bearer resource_metadata="https:\/\/dex\.example\.test\/\.well-known\/oauth-protected-resource", scope="dex:read"$/);
});

test("rejects non-canonical base64url variants for opaque values and JWT signatures", () => {
  const authCrypto = createAuthCrypto({ secretB64: SECRET_B64, issuer: ORIGIN, now: () => 1_800_000_000 });
  const opaque = authCrypto.sealOpaque("state", { flow: "test" }, { ttlSeconds: 60 });
  const [opaqueVersion, opaqueBody] = opaque.split(".");
  const opaqueVariant = `${opaqueVersion}.${nonCanonicalBase64UrlVariant(opaqueBody)}`;
  assert.throws(() => authCrypto.openOpaque("state", opaqueVariant));

  const jwt = authCrypto.signJwt("access", { aud: `${ORIGIN}/mcp`, scope: "dex:read" }, { ttlSeconds: 60 });
  const [header, payload, signature] = jwt.split(".");
  const jwtVariant = `${header}.${payload}.${nonCanonicalBase64UrlVariant(signature)}`;
  assert.throws(() => authCrypto.verifyJwt("access", jwtVariant, { audience: `${ORIGIN}/mcp` }));
});

test("DCR issues a stateless opaque public client and enforces exact safe redirects", () => {
  const { service } = createService();
  const client = registerClient(service);

  assert.match(client.client_id, /^v1\.[A-Za-z0-9_-]+$/);
  assert.deepEqual(client.redirect_uris, [REDIRECT_URI]);
  assert.equal(client.application_type, "web");
  assert.deepEqual(client.grant_types, ["authorization_code", "refresh_token"]);
  assert.equal(client.token_endpoint_auth_method, "none");
  assert.ok(Buffer.byteLength(client.client_id, "utf8") <= 16_384);
  assert.equal(JSON.stringify(client).includes("github-app-client-secret"), false);

  assert.throws(
    () => service.registerClient({
      application_type: "web",
      redirect_uris: Array.from({ length: 10 }, (_, index) => (
        `https://client.example.test/${"a".repeat(1_900)}${index}`
      )),
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
    }),
    (error) => error instanceof OAuthError && error.code === "invalid_client_metadata",
  );

  assert.throws(
    () => registerClient(service, "https://client.example.test/oauth/callback#fragment"),
    (error) => error instanceof OAuthError && error.code === "invalid_redirect_uri",
  );
  assert.throws(
    () => registerClient(service, "http://evil.example.test/callback"),
    (error) => error instanceof OAuthError && error.code === "invalid_redirect_uri",
  );
  assert.throws(
    () => registerClient(service, "https://client.example.test/oauth/callback?code=confused"),
    (error) => error instanceof OAuthError && error.code === "invalid_redirect_uri",
  );
  for (const redirectUri of [
    "http://localhost:6274/oauth/callback",
    "http://127.0.0.1:6276/oauth/callback",
    "http://127.9.8.7:6276/oauth/callback",
    "http://[::1]:6276/oauth/callback",
  ]) {
    const nativeClient = service.registerClient({
      application_type: "native",
      redirect_uris: [redirectUri],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
    });
    assert.deepEqual(nativeClient.redirect_uris, [redirectUri]);
  }
  assert.throws(
    () => registerClient(service, "http://127.0.0.1:6276/oauth/callback"),
    (error) => error instanceof OAuthError && error.code === "invalid_redirect_uri",
  );
  assert.throws(
    () => service.registerClient({
      application_type: "native",
      redirect_uris: ["http://127.0.0.1.example.test:6276/oauth/callback"],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
    }),
    (error) => error instanceof OAuthError && error.code === "invalid_redirect_uri",
  );
  const { service: loopbackDisabledService } = createService({ allowHttpLoopbackRedirect: false });
  assert.throws(
    () => loopbackDisabledService.registerClient({
      application_type: "native",
      redirect_uris: ["http://127.0.0.1:6276/oauth/callback"],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
    }),
    (error) => error instanceof OAuthError && error.code === "invalid_redirect_uri",
  );
  assert.throws(
    () => service.registerClient({
      application_type: "service",
      redirect_uris: [REDIRECT_URI],
      grant_types: ["authorization_code", "refresh_token"],
      response_types: ["code"],
    }),
    (error) => error instanceof OAuthError && error.code === "invalid_client_metadata",
  );
  assert.throws(
    () => service.registerClient({
      application_type: "web",
      redirect_uris: [REDIRECT_URI],
      grant_types: ["refresh_token"],
      response_types: ["code"],
    }),
    (error) => error instanceof OAuthError && error.code === "invalid_client_metadata",
  );
});

test("rejects duplicated OAuth parameters and treats absent form fields as absent", () => {
  const { service } = createService();
  const client = registerClient(service);
  const proof = pkce();
  const params = new URLSearchParams({
    client_id: client.client_id,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    resource: `${ORIGIN}/mcp`,
    scope: "dex:read",
    state: "client-state",
    code_challenge: proof.challenge,
    code_challenge_method: "S256",
  });
  params.append("response_type", "token");
  assert.throws(
    () => service.beginMcpAuthorization(params),
    (error) => error instanceof OAuthError && error.code === "invalid_request",
  );
  assert.equal(new URLSearchParams().getAll("client_secret").length, 0);
});

test("MCP authorization uses PKCE and delays GitHub exchange until the token request", async () => {
  const { service, github } = createService();
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  assert.equal(authorization.redirectUrl, undefined);
  assert.equal(authorization.consent.scope, "dex:read offline_access");
  assert.equal(authorization.consent.offlineAccess, true);
  assert.equal(authorization.consent.refreshTokenMaxAgeSeconds, 604_800);
  assert.equal(authorization.consent.refreshFamilyMaxAgeSeconds, 2_592_000);
  assert.equal(authorization.stateCookiePayload.name, "__Host-dex_oauth_nonce");
  assert.equal(authorization.stateCookiePayload.secure, true);
  assert.equal(authorization.stateCookiePayload.path, "/");
  const consent = await approveMcp(service, authorization);

  const githubAuthorize = new URL(consent.redirectUrl);
  assert.equal(githubAuthorize.origin, "https://github.com");
  assert.equal(githubAuthorize.pathname, "/login/oauth/authorize");
  assert.equal(githubAuthorize.searchParams.get("client_id"), "github-app-client-id");
  assert.equal(githubAuthorize.searchParams.get("redirect_uri"), `${ORIGIN}/auth/github/callback`);
  assert.ok(githubAuthorize.searchParams.get("state"));
  assert.equal(githubAuthorize.searchParams.get("code_challenge_method"), "S256");
  assert.match(githubAuthorize.searchParams.get("code_challenge"), /^[A-Za-z0-9_-]{43}$/);
  assert.equal(github.calls.length, 0);

  await expectOAuthError(
    () => service.handleGitHubCallback({
      code: "github-code-before-consent",
      state: authorization.opaqueState,
      browserNonce: authorization.stateCookiePayload.value,
    }),
    "invalid_request",
    400,
  );
  const callback = await service.handleGitHubCallback({
    code: "github-code-once",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  assert.equal(callback.flow, "mcp");
  assert.equal(github.calls.length, 0);
  assert.equal(new URL(callback.redirectUrl).searchParams.get("state"), "mcp-client-state");
  assert.equal(new URL(callback.redirectUrl).searchParams.get("iss"), ORIGIN);

  const token = await service.exchangeToken({
    grant_type: "authorization_code",
    code: new URL(callback.redirectUrl).searchParams.get("code"),
    client_id: client.client_id,
    redirect_uri: REDIRECT_URI,
    code_verifier: authorization.verifier,
    resource: `${ORIGIN}/mcp`,
  });
  assert.deepEqual(Object.keys(token).sort(), ["access_token", "expires_in", "refresh_token", "scope", "token_type"]);
  assert.equal(token.token_type, "Bearer");
  assert.equal(token.scope, "dex:read offline_access");
  assert.match(token.refresh_token, /^v1\.[A-Za-z0-9_-]+$/);
  assert.equal(github.calls.filter((call) => call.url.includes("access_token")).length, 1);
  assert.equal(github.calls.filter((call) => call.url.endsWith("/user")).length, 1);
  assert.match(new URLSearchParams(github.calls[0].init.body).get("code_verifier"), /^[A-Za-z0-9._~-]{43,128}$/);
  for (const call of github.calls) {
    assert.equal(call.init.redirect, "error");
    assert.equal(call.init.cache, "no-store");
    assert.ok(call.init.signal instanceof AbortSignal);
  }

  const claims = service.verifyAccessToken(token.access_token);
  assert.equal(claims.iss, ORIGIN);
  assert.equal(claims.aud, `${ORIGIN}/mcp`);
  assert.equal(claims.scope, "dex:read offline_access");
  assert.match(claims.token_family, /^[A-Za-z0-9_-]{22}$/);
  assert.equal(claims.github_login, "dexcompanyllm");
  assert.equal(JSON.stringify({ authorization, callback, token }).includes(github.githubToken), false);
  assert.throws(
    () => service.verifyAccessToken(`${token.access_token}!`),
    (error) => error instanceof OAuthError && error.code === "invalid_token",
  );
});

test("rejects an invalid upstream state and a mismatched browser nonce cookie", async () => {
  const { service } = createService();
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const state = authorization.opaqueState;

  await expectOAuthError(
    () => service.handleGitHubCallback({ code: "github-code", state: `${state}tampered`, browserNonce: authorization.stateCookiePayload.value }),
    "invalid_request",
    400,
  );
  await expectOAuthError(
    () => service.handleGitHubCallback({ code: "github-code", state, browserNonce: "wrong-browser-cookie-value" }),
    "invalid_request",
    400,
  );
});

test("returns an upstream MCP denial to the exact registered client without issuing a code", async () => {
  const { service, github } = createService();
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const consent = await approveMcp(service, authorization);
  const callback = await service.handleGitHubCallback({
    error: "access_denied",
    error_description: "untrusted upstream detail",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  const redirect = new URL(callback.redirectUrl);

  assert.equal(callback.flow, "mcp");
  assert.equal(callback.authorizationCodeExpiresAt, null);
  assert.equal(redirect.origin + redirect.pathname, REDIRECT_URI);
  assert.equal(redirect.searchParams.get("error"), "access_denied");
  assert.equal(redirect.searchParams.get("state"), "mcp-client-state");
  assert.equal(redirect.searchParams.get("iss"), ORIGIN);
  assert.equal(redirect.searchParams.has("code"), false);
  assert.equal(redirect.href.includes("untrusted"), false);
  assert.equal(github.calls.length, 0);
});

test("explicit MCP consent denial returns to the registered client without contacting GitHub", async () => {
  const { service, github } = createService();
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const denied = await service.continueMcpAuthorization({
    state: authorization.opaqueState,
    browserNonce: authorization.stateCookiePayload.value,
    decision: "deny",
  });
  const redirect = new URL(denied.redirectUrl);

  assert.equal(denied.approved, false);
  assert.equal(redirect.origin + redirect.pathname, REDIRECT_URI);
  assert.equal(redirect.searchParams.get("error"), "access_denied");
  assert.equal(redirect.searchParams.get("state"), "mcp-client-state");
  assert.equal(redirect.searchParams.has("code"), false);
  assert.equal(github.calls.length, 0);
});

test("consent and GitHub callback state are each accepted only once", async () => {
  const { service, github } = createService();
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const consent = await approveMcp(service, authorization);

  await expectOAuthError(() => approveMcp(service, authorization), "invalid_request", 400);
  const callbackInput = {
    code: "single-use-callback-code",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  };
  await service.handleGitHubCallback(callbackInput);
  await expectOAuthError(() => service.handleGitHubCallback(callbackInput), "invalid_request", 400);
  assert.equal(github.calls.length, 0);
});

test("rejects an authorization redirect that is not exactly registered", () => {
  const { service } = createService();
  const client = registerClient(service);

  assert.throws(
    () => beginMcp(service, client, { redirect_uri: `${REDIRECT_URI}/other` }),
    (error) => error instanceof OAuthError && error.code === "invalid_request" && error.status === 400,
  );
});

test("rejects the wrong PKCE verifier without contacting GitHub", async () => {
  const { service, github } = createService();
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const consent = await approveMcp(service, authorization);
  const callback = await service.handleGitHubCallback({
    code: "github-code",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });

  await expectOAuthError(
    () => service.exchangeToken({
      grant_type: "authorization_code",
      code: new URL(callback.redirectUrl).searchParams.get("code"),
      client_id: client.client_id,
      redirect_uri: REDIRECT_URI,
      code_verifier: "b".repeat(64),
      resource: `${ORIGIN}/mcp`,
    }),
    "invalid_grant",
    400,
  );
  assert.equal(github.calls.length, 0);
});

test("rejects an expired Dex authorization code before contacting GitHub", async () => {
  const nowRef = { value: 1_800_000_000 };
  const { service, github } = createService({ nowRef });
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const consent = await approveMcp(service, authorization);
  const callback = await service.handleGitHubCallback({
    code: "github-code",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  nowRef.value += service.config.authorizationCodeTtlSeconds + service.config.clockSkewSeconds + 1;

  await expectOAuthError(
    () => service.exchangeToken({
      grant_type: "authorization_code",
      code: new URL(callback.redirectUrl).searchParams.get("code"),
      client_id: client.client_id,
      redirect_uri: REDIRECT_URI,
      code_verifier: authorization.verifier,
      resource: `${ORIGIN}/mcp`,
    }),
    "invalid_grant",
    400,
  );
  assert.equal(github.calls.length, 0);
});

test("an authorization-code replay is blocked locally and revokes the previously issued access token", async () => {
  const { service, github } = createService({ fetchOptions: { failSecondExchange: true } });
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const consent = await approveMcp(service, authorization);
  const callback = await service.handleGitHubCallback({
    code: "one-time-github-code",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  const body = {
    grant_type: "authorization_code",
    code: new URL(callback.redirectUrl).searchParams.get("code"),
    client_id: client.client_id,
    redirect_uri: REDIRECT_URI,
    code_verifier: authorization.verifier,
    resource: `${ORIGIN}/mcp`,
  };

  const first = await service.exchangeToken(body);
  assert.equal((await service.verifyAccessTokenActive(first.access_token)).token_use, "access");
  await expectOAuthError(() => service.exchangeToken(body), "invalid_grant", 400);
  await expectOAuthError(() => service.verifyAccessTokenActive(first.access_token), "invalid_token", 401);
  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, first.refresh_token)),
    "invalid_grant",
    400,
  );
  assert.equal(github.calls.filter((call) => call.url.includes("access_token")).length, 1);
  assert.equal(github.calls.filter((call) => call.url.endsWith("/user")).length, 1);
});

test("refresh tokens rotate without persisting or reusing a GitHub user token, and family replay revokes every access token", async () => {
  const { service, github } = createService();
  const client = registerClient(service);
  const { token: initial } = await completeMcp(service, client, { githubCode: "refresh-family-code" });
  const rotated = await service.exchangeToken(refreshBody(client, initial.refresh_token, {
    scope: "offline_access dex:read",
  }));

  assert.notEqual(rotated.refresh_token, initial.refresh_token);
  assert.equal(initial.scope, "dex:read offline_access");
  assert.equal(rotated.scope, initial.scope);
  const initialClaims = await service.verifyAccessTokenActive(initial.access_token);
  const rotatedClaims = await service.verifyAccessTokenActive(rotated.access_token);
  assert.equal(initialClaims.token_use, "access");
  assert.equal(rotatedClaims.token_use, "access");
  assert.equal(rotatedClaims.token_family, initialClaims.token_family);
  assert.equal(rotatedClaims.token_family_expires_at, initialClaims.token_family_expires_at);
  assert.equal(github.calls.filter((call) => call.url.includes("access_token")).length, 1);
  assert.equal(github.calls.filter((call) => call.url.endsWith("/user")).length, 1);
  assert.equal(JSON.stringify({ initial, rotated }).includes(github.githubToken), false);

  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, initial.refresh_token)),
    "invalid_grant",
    400,
  );
  await expectOAuthError(() => service.verifyAccessTokenActive(initial.access_token), "invalid_token", 401);
  await expectOAuthError(() => service.verifyAccessTokenActive(rotated.access_token), "invalid_token", 401);
  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, rotated.refresh_token)),
    "invalid_grant",
    400,
  );
});

test("refresh rotation is bound to the registered client, exact resource, and authorized scope without consuming valid input on mismatch", async () => {
  const { service } = createService();
  const client = registerClient(service);
  const otherClient = service.registerClient({
    client_name: "Other OAuth test client",
    application_type: "native",
    redirect_uris: ["https://other.example.test/callback"],
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code", "refresh_token"],
    response_types: ["code"],
  });
  const { token } = await completeMcp(service, client, { githubCode: "refresh-binding-code" });

  await expectOAuthError(
    () => service.exchangeToken(refreshBody(otherClient, token.refresh_token)),
    "invalid_grant",
    400,
  );
  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, token.refresh_token, { resource: "https://other.example.test/mcp" })),
    "invalid_target",
    400,
  );
  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, token.refresh_token, { scope: "dex:read" })),
    "invalid_scope",
    400,
  );

  const rotated = await service.exchangeToken(refreshBody(client, token.refresh_token));
  assert.equal(rotated.scope, "dex:read offline_access");
  assert.ok(rotated.refresh_token);
});

test("refresh rotation preserves a 30-day absolute family deadline and shortens each new credential/store TTL to the remaining lifetime", async () => {
  const nowRef = { value: 1_800_000_000 };
  const memory = createMemoryOAuthReplayStore({ now: () => nowRef.value });
  const refreshClaimTtls = [];
  const replayStore = {
    configured: true,
    durable: false,
    mode: "test-memory-spy",
    claim: async (namespace, id, value, ttlSeconds) => {
      if (namespace === "refresh") refreshClaimTtls.push(ttlSeconds);
      return memory.claim(namespace, id, value, ttlSeconds);
    },
    get: (...args) => memory.get(...args),
    compareAndSet: (...args) => memory.compareAndSet(...args),
    put: (...args) => memory.put(...args),
    remove: (...args) => memory.remove(...args),
  };
  const { service } = createService({
    nowRef,
    replayStore,
    refreshTokenTtlSeconds: 10,
    refreshFamilyTtlSeconds: 30,
    clockSkewSeconds: 0,
  });
  const client = registerClient(service);
  let { token } = await completeMcp(service, client, { githubCode: "absolute-family-code" });
  const initialClaims = service.verifyAccessToken(token.access_token);
  assert.equal(initialClaims.token_family_expires_at, 1_800_000_030);

  for (const seconds of [9, 9, 9]) {
    nowRef.value += seconds;
    token = await service.exchangeToken(refreshBody(client, token.refresh_token));
    const claims = service.verifyAccessToken(token.access_token);
    assert.equal(claims.token_family_expires_at, initialClaims.token_family_expires_at);
  }
  assert.deepEqual(refreshClaimTtls, [10, 10, 10, 3]);

  nowRef.value = initialClaims.token_family_expires_at + 1;
  assert.throws(
    () => service.verifyAccessToken(token.access_token),
    (error) => error instanceof OAuthError && error.code === "invalid_token",
  );
  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, token.refresh_token)),
    "invalid_grant",
    400,
  );
});

test("refresh tokens with an impossible future family deadline fail closed before state consumption", async () => {
  const nowRef = { value: 1_800_000_000 };
  const { service } = createService({
    nowRef,
    refreshTokenTtlSeconds: 10,
    refreshFamilyTtlSeconds: 30,
    clockSkewSeconds: 0,
  });
  const client = registerClient(service);
  const crypto = createAuthCrypto({ secretB64: SECRET_B64, issuer: ORIGIN, now: () => nowRef.value, clockSkewSeconds: 0 });
  const impossibleRefresh = crypto.sealOpaque("refresh", {
    tokenId: "t".repeat(22),
    familyId: "f".repeat(22),
    familyExpiresAt: nowRef.value + 31,
    clientId: client.client_id,
    resource: `${ORIGIN}/mcp`,
    scope: "dex:read offline_access",
    githubLogin: "dexcompanyllm",
    githubId: 338_038_398,
  }, { ttlSeconds: 10 });

  await expectOAuthError(
    () => service.exchangeToken(refreshBody(client, impossibleRefresh)),
    "invalid_grant",
    400,
  );
  assert.throws(
    () => createOAuthService({
      secretB64: SECRET_B64,
      publicOrigin: ORIGIN,
      githubClientId: "github-app-client-id",
      githubClientSecret: "github-app-client-secret",
      refreshFamilyTtlSeconds: 2_592_001,
    }),
    (error) => error instanceof OAuthError && error.code === "server_error",
  );
});

test("authorization without offline_access remains short-lived and clients without refresh grant cannot request it", async () => {
  const { service } = createService();
  const client = service.registerClient({
    client_name: "Short-lived OAuth test client",
    application_type: "web",
    redirect_uris: [REDIRECT_URI],
    token_endpoint_auth_method: "none",
    grant_types: ["authorization_code"],
    response_types: ["code"],
  });
  assert.throws(
    () => beginMcp(service, client, { scope: "dex:read offline_access" }),
    (error) => error instanceof OAuthError && error.code === "invalid_scope",
  );
  const { token } = await completeMcp(service, client, { githubCode: "short-lived-code", scope: "dex:read" });
  assert.equal(token.scope, "dex:read");
  assert.equal(Object.hasOwn(token, "refresh_token"), false);
  assert.equal(service.verifyAccessToken(token.access_token).token_family, undefined);
});

test("a concurrent authorization-code replay prevents either request from receiving a token", async () => {
  let releaseGitHub;
  let notifyGitHubStarted;
  const githubStarted = new Promise((resolve) => { notifyGitHubStarted = resolve; });
  const githubGate = new Promise((resolve) => { releaseGitHub = resolve; });
  const calls = [];
  const fetchImpl = async (input, init) => {
    const url = String(input);
    calls.push({ url, init });
    if (url.endsWith("/login/oauth/access_token")) {
      notifyGitHubStarted();
      await githubGate;
      return Response.json({ access_token: "concurrent-private-github-token" });
    }
    if (url.endsWith("/user")) {
      return Response.json({ login: "dexcompanyllm", id: 338_038_398 });
    }
    throw new Error(`Unexpected external request: ${url}`);
  };
  const { service } = createService({ fetchImpl });
  const client = registerClient(service);
  const authorization = beginMcp(service, client);
  const consent = await approveMcp(service, authorization);
  const callback = await service.handleGitHubCallback({
    code: "concurrent-github-code",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  const body = {
    grant_type: "authorization_code",
    code: new URL(callback.redirectUrl).searchParams.get("code"),
    client_id: client.client_id,
    redirect_uri: REDIRECT_URI,
    code_verifier: authorization.verifier,
    resource: `${ORIGIN}/mcp`,
  };

  const first = service.exchangeToken(body);
  await githubStarted;
  await expectOAuthError(() => service.exchangeToken(body), "invalid_grant", 400);
  releaseGitHub();
  await expectOAuthError(() => first, "invalid_grant", 400);
  assert.equal(calls.filter((call) => call.url.endsWith("/login/oauth/access_token")).length, 1);
  assert.equal(calls.filter((call) => call.url.endsWith("/user")).length, 1);
});

test("access token verification rejects expiry and a wrong audience with minimal skew", async () => {
  const nowRef = { value: 1_800_000_000 };
  const { service } = createService({ nowRef });
  const client = registerClient(service);
  const { token } = await completeMcp(service, client);
  nowRef.value += service.config.accessTokenTtlSeconds + service.config.clockSkewSeconds + 1;

  assert.throws(
    () => service.verifyAccessToken(token.access_token),
    (error) => error instanceof OAuthError && error.code === "invalid_token" && error.status === 401,
  );

  const crypto = createAuthCrypto({ secretB64: SECRET_B64, issuer: ORIGIN, now: () => 1_800_000_000 });
  const wrongAudience = crypto.signJwt("access", {
    sub: "github:338038398",
    aud: "https://other.example.test/mcp",
    scope: "dex:read",
    github_login: "dexcompanyllm",
    github_id: 338_038_398,
    token_use: "access",
  }, { ttlSeconds: 60 });
  assert.throws(
    () => service.verifyAccessToken(wrongAudience),
    (error) => error instanceof OAuthError && error.code === "invalid_token" && error.status === 401,
  );
});

test("access and session JWTs require exact identity, use, scope, subject, JTI, and bounded lifetime claims", () => {
  const { service } = createService();
  const crypto = createAuthCrypto({ secretB64: SECRET_B64, issuer: ORIGIN, now: () => 1_800_000_000 });
  const base = {
    sub: "github:338038398",
    aud: `${ORIGIN}/mcp`,
    scope: "dex:read",
    github_login: "dexcompanyllm",
    github_id: 338_038_398,
    token_use: "access",
  };
  const invalidTokens = [
    crypto.signJwt("access", { ...base, sub: "github:1" }, { ttlSeconds: 60 }),
    crypto.signJwt("access", { ...base, github_id: 1 }, { ttlSeconds: 60 }),
    crypto.signJwt("access", { ...base, github_login: "mallory" }, { ttlSeconds: 60 }),
    crypto.signJwt("access", { ...base, token_use: "session" }, { ttlSeconds: 60 }),
    crypto.signJwt("access", { ...base, scope: "dex:read extra" }, { ttlSeconds: 60 }),
    crypto.signJwt("access", { ...base, scope: "dex:read offline_access" }, { ttlSeconds: 60 }),
    crypto.signJwt("access", { ...base, token_family: "a".repeat(22) }, { ttlSeconds: 60 }),
    crypto.signJwt("access", {
      ...base,
      scope: "dex:read offline_access",
      token_family: "a".repeat(22),
      token_family_expires_at: 1_800_000_000 + 2_592_001,
    }, { ttlSeconds: 60 }),
    crypto.signJwt("access", base, { ttlSeconds: service.config.accessTokenTtlSeconds + 1 }),
    signRawAccessJwt({
      ...base,
      iss: ORIGIN,
      iat: 1_800_000_000,
      exp: 1_800_000_060,
      jti: "too-short",
    }),
  ];
  for (const token of invalidTokens) {
    assert.throws(
      () => service.verifyAccessToken(token),
      (error) => error instanceof OAuthError && error.code === "invalid_token",
    );
  }
});

test("session logout revokes its JTI and rate limits are atomic in the shared replay store", async () => {
  const nowRef = { value: 1_800_000_000 };
  const { service } = createService({ nowRef });
  const crypto = createAuthCrypto({ secretB64: SECRET_B64, issuer: ORIGIN, now: () => nowRef.value });
  const session = crypto.signJwt("session", {
    sub: "github:338038398",
    aud: `${ORIGIN}/app`,
    github_login: "dexcompanyllm",
    github_id: 338_038_398,
    csrf: "c".repeat(43),
    token_use: "session",
  }, { ttlSeconds: 600 });

  assert.equal((await service.verifySessionTokenActive(session)).token_use, "session");
  await service.revokeSessionToken(session);
  await assert.rejects(
    () => service.verifySessionTokenActive(session),
    (error) => error instanceof OAuthError && error.code === "invalid_token" && error.status === 401,
  );
  nowRef.value += 601;
  await assert.rejects(
    () => service.verifySessionTokenActive(session),
    (error) => error instanceof OAuthError && error.code === "invalid_token" && error.status === 401,
  );

  assert.equal((await service.consumeRateLimit("oauth-test", "client-a", { max: 2, windowSeconds: 60 })).allowed, true);
  assert.equal((await service.consumeRateLimit("oauth-test", "client-a", { max: 2, windowSeconds: 60 })).allowed, true);
  assert.equal((await service.consumeRateLimit("oauth-test", "client-a", { max: 2, windowSeconds: 60 })).allowed, false);
  assert.equal((await service.consumeRateLimit("oauth-test", "client-b", { max: 2, windowSeconds: 60 })).allowed, true);
  nowRef.value += 60;
  assert.equal((await service.consumeRateLimit("oauth-test", "client-a", { max: 2, windowSeconds: 60 })).allowed, true);
});

test("rejects a GitHub identity outside the login and required numeric-id allowlist", async () => {
  const wrongLogin = createService({ fetchOptions: { user: { login: "mallory", id: 338_038_398 } } });
  const client = registerClient(wrongLogin.service);
  const authorization = beginMcp(wrongLogin.service, client);
  const consent = await approveMcp(wrongLogin.service, authorization);
  const callback = await wrongLogin.service.handleGitHubCallback({
    code: "wrong-login-code",
    state: new URL(consent.redirectUrl).searchParams.get("state"),
    browserNonce: authorization.stateCookiePayload.value,
  });
  await expectOAuthError(
    () => wrongLogin.service.exchangeToken({
      grant_type: "authorization_code",
      code: new URL(callback.redirectUrl).searchParams.get("code"),
      client_id: client.client_id,
      redirect_uri: REDIRECT_URI,
      code_verifier: authorization.verifier,
      resource: `${ORIGIN}/mcp`,
    }),
    "access_denied",
    403,
  );

  const wrongId = createService({
    allowedGitHubUserId: 999,
    fetchOptions: { user: { login: "dexcompanyllm", id: 890 } },
  });
  const pwa = wrongId.service.beginPwaLogin();
  await expectOAuthError(
    () => wrongId.service.handleGitHubCallback({
      code: "wrong-id-code",
      state: new URL(pwa.redirectUrl).searchParams.get("state"),
      browserNonce: pwa.stateCookiePayload.value,
    }),
    "access_denied",
    403,
  );
});

test("PWA callback exchanges immediately and returns an HttpOnly-cookie session payload", async () => {
  const { service, github } = createService();
  const login = service.beginPwaLogin({ returnTo: "/projects?view=active" });
  const callback = await service.handleGitHubCallback({
    code: "pwa-github-code",
    state: new URL(login.redirectUrl).searchParams.get("state"),
    browserNonce: login.stateCookiePayload.value,
  });

  assert.equal(callback.flow, "pwa");
  assert.equal(callback.redirectUrl, `${ORIGIN}/projects?view=active`);
  assert.equal(typeof callback.sessionToken, "string");
  assert.equal(callback.sessionExpiresAt, 1_800_000_000 + service.config.sessionTtlSeconds);
  assert.equal(github.calls.length, 2);
  assert.equal(JSON.stringify(callback).includes(github.githubToken), false);
  const claims = service.verifySessionToken(callback.sessionToken);
  assert.equal(claims.github_login, "dexcompanyllm");
  assert.equal(claims.aud, `${ORIGIN}/app`);
  assert.match(claims.csrf, /^[A-Za-z0-9_-]{43}$/);

  assert.throws(
    () => service.beginPwaLogin({ returnTo: "https://evil.example.test/steal" }),
    (error) => error instanceof OAuthError && error.code === "invalid_request",
  );

  await expectOAuthError(
    () => service.handleGitHubCallback({
      code: "pwa-github-code-replayed",
      state: new URL(login.redirectUrl).searchParams.get("state"),
      browserNonce: login.stateCookiePayload.value,
    }),
    "invalid_request",
    400,
  );
});

test("oversized GitHub OAuth responses fail closed before identity data is accepted", async () => {
  const service = createOAuthService({
    secretB64: SECRET_B64,
    publicOrigin: ORIGIN,
    githubClientId: "github-app-client-id",
    githubClientSecret: "github-app-client-secret",
    allowedGitHubLogin: "dexcompanyllm",
    fetchImpl: async (_input, init) => {
      assert.equal(init.redirect, "error");
      assert.ok(init.signal instanceof AbortSignal);
      return new Response("x".repeat(64 * 1_024 + 1));
    },
  });
  const login = service.beginPwaLogin();
  await expectOAuthError(
    () => service.handleGitHubCallback({
      code: "oversized-response-code",
      state: new URL(login.redirectUrl).searchParams.get("state"),
      browserNonce: login.stateCookiePayload.value,
    }),
    "temporarily_unavailable",
    503,
  );
});

test("production OAuth fails closed without a durable replay store", () => {
  const service = createOAuthService({
    env: { NODE_ENV: "production" },
    secretB64: SECRET_B64,
    publicOrigin: ORIGIN,
    githubClientId: "github-app-client-id",
    githubClientSecret: "github-app-client-secret",
    fetchImpl: async () => { throw new Error("must not fetch"); },
  });
  assert.equal(service.configured, false);
  assert.throws(
    () => service.beginPwaLogin(),
    (error) => error instanceof OAuthError && error.code === "temporarily_unavailable" && error.status === 503,
  );
});

test("missing secrets leave the service explicitly unconfigured", () => {
  const service = createOAuthService({
    secretB64: "",
    publicOrigin: ORIGIN,
    githubClientId: "",
    githubClientSecret: "",
    fetchImpl: async () => { throw new Error("must not fetch"); },
  });

  assert.equal(service.configured, false);
  assert.equal(service.config.issuer, ORIGIN);
  assert.throws(
    () => service.authorizationServerMetadata(),
    (error) => error instanceof OAuthError && error.code === "temporarily_unavailable" && error.status === 503,
  );
});
