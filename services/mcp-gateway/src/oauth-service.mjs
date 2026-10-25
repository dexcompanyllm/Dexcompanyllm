import { randomBytes } from "node:crypto";
import {
  AuthCryptoError,
  createAuthCrypto,
  secureEqual,
  sha256Base64Url,
} from "./auth-crypto.mjs";
import { GITHUB_API_VERSION } from "./github-auth.mjs";
import {
  OAuthReplayStoreError,
  createOAuthReplayStore,
} from "./oauth-replay-store.mjs";

const DEFAULT_ALLOWED_LOGIN = "dexcompanyllm";
const DEFAULT_ALLOWED_USER_ID = 338_038_398;
const REQUIRED_SCOPE = "dex:read";
const OFFLINE_SCOPE = "offline_access";
const AUTHORIZATION_SCOPES = Object.freeze([REQUIRED_SCOPE, OFFLINE_SCOPE]);
const ALLOWED_SCOPE_SET = new Set(AUTHORIZATION_SCOPES);
const GITHUB_AUTHORIZE_ENDPOINT = "https://github.com/login/oauth/authorize";
const GITHUB_TOKEN_ENDPOINT = "https://github.com/login/oauth/access_token";
const GITHUB_USER_ENDPOINT = "https://api.github.com/user";
const LOCAL_NONCE_COOKIE_NAME = "dex_oauth_nonce";
const HOST_NONCE_COOKIE_NAME = "__Host-dex_oauth_nonce";
const PKCE_VERIFIER_PATTERN = /^[A-Za-z0-9\-._~]{43,128}$/;
const PKCE_CHALLENGE_PATTERN = /^[A-Za-z0-9_-]{43}$/;
const RANDOM_ID_PATTERN = /^[A-Za-z0-9_-]{22}$/;
const JWT_ID_PATTERN = /^[A-Za-z0-9_-]{22}$/;
const MAX_GITHUB_RESPONSE_BYTES = 64 * 1_024;
const DEFAULT_GITHUB_TIMEOUT_MS = 8_000;
const DEFAULT_REFRESH_TOKEN_TTL_SECONDS = 7 * 24 * 60 * 60;
const DEFAULT_REFRESH_FAMILY_TTL_SECONDS = 30 * 24 * 60 * 60;
const MAX_CLIENT_ID_BYTES = 16_384;
const MAX_REGISTERED_REDIRECT_BYTES = 8_192;

export class OAuthError extends Error {
  constructor(code, description, status = 400, options = {}) {
    super(description, options);
    this.name = "OAuthError";
    this.code = code;
    this.description = description;
    this.status = status;
  }

  toJSON() {
    return {
      error: this.code,
      error_description: this.description,
    };
  }
}

function fail(code, description, status = 400) {
  throw new OAuthError(code, description, status);
}

function normalizeOrigin(value) {
  let url;
  try {
    url = new URL(String(value ?? ""));
  } catch {
    throw new OAuthError("server_error", "DEX_PUBLIC_ORIGIN is invalid.", 500);
  }
  const localHttp = url.protocol === "http:" && ["localhost", "127.0.0.1", "::1"].includes(url.hostname);
  if ((url.protocol !== "https:" && !localHttp) || url.username || url.password || url.search || url.hash || url.pathname !== "/") {
    throw new OAuthError("server_error", "DEX_PUBLIC_ORIGIN must be an HTTPS origin (or localhost HTTP).", 500);
  }
  return url.origin;
}

function positiveInteger(value, fallback, name, { min = 1, max = 31_536_000 } = {}) {
  const candidate = value === undefined ? fallback : Number(value);
  if (!Number.isSafeInteger(candidate) || candidate < min || candidate > max) {
    throw new OAuthError("server_error", `${name} is invalid.`, 500);
  }
  return candidate;
}

function requiredPositiveId(value) {
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id <= 0) {
    throw new OAuthError("server_error", "DEX_ALLOWED_GITHUB_USER_ID must be a positive integer.", 500);
  }
  return id;
}

function field(source, name) {
  if (source instanceof URLSearchParams) {
    const values = source.getAll(name);
    if (values.length > 1) fail("invalid_request", `${name} must occur exactly once.`);
    return values.length === 0 ? undefined : values[0];
  }
  const value = source?.[name];
  if (Array.isArray(value)) fail("invalid_request", `${name} must occur exactly once.`);
  return value;
}

function requiredString(source, name, { min = 1, max = 4_096 } = {}) {
  const value = field(source, name);
  if (typeof value !== "string" || value.length < min || value.length > max || /[\u0000-\u001f\u007f]/.test(value)) {
    fail("invalid_request", `${name} is invalid.`);
  }
  return value;
}

function assertOnlyValue(values, expected, errorCode = "invalid_client_metadata") {
  return Array.isArray(values) && values.length === 1 && values[0] === expected
    ? values
    : fail(errorCode, `Only ${expected} is supported.`);
}

function validateGrantTypes(values, errorCode = "invalid_client_metadata") {
  const requested = values ?? ["authorization_code"];
  if (
    !Array.isArray(requested)
    || requested.length < 1
    || requested.length > 2
    || new Set(requested).size !== requested.length
    || !requested.includes("authorization_code")
    || requested.some((value) => !["authorization_code", "refresh_token"].includes(value))
  ) {
    fail(errorCode, "Only authorization_code with optional refresh_token is supported.");
  }
  return [...requested];
}

function validateApplicationType(value) {
  const applicationType = value ?? "web";
  if (!["web", "native"].includes(applicationType)) {
    fail("invalid_client_metadata", "application_type must be web or native.");
  }
  return applicationType;
}

function parseScope(value, { requireOffline = false, errorCode = "invalid_scope" } = {}) {
  if (typeof value !== "string" || value.length < 1 || value.length > 128 || /[\u0000-\u0020\u007f]/.test(value.replaceAll(" ", ""))) {
    fail(errorCode, "The OAuth scope is invalid.");
  }
  const scopes = value.split(" ");
  if (
    scopes.some((scope) => !scope)
    || new Set(scopes).size !== scopes.length
    || !scopes.includes(REQUIRED_SCOPE)
    || (requireOffline && !scopes.includes(OFFLINE_SCOPE))
    || scopes.some((scope) => !ALLOWED_SCOPE_SET.has(scope))
  ) {
    fail(errorCode, `Only ${REQUIRED_SCOPE} with optional ${OFFLINE_SCOPE} is supported.`);
  }
  return scopes.includes(OFFLINE_SCOPE) ? `${REQUIRED_SCOPE} ${OFFLINE_SCOPE}` : REQUIRED_SCOPE;
}

function isLoopbackHostname(hostname) {
  if (hostname === "localhost" || hostname === "[::1]") return true;
  const octets = hostname.split(".");
  return octets.length === 4
    && octets[0] === "127"
    && octets.every((octet) => /^\d{1,3}$/.test(octet) && Number(octet) <= 255);
}

function validateRedirectUri(value, { allowHttpLoopback }) {
  if (typeof value !== "string" || value.length > 2_048) {
    fail("invalid_redirect_uri", "redirect_uri is invalid.");
  }
  let url;
  try {
    url = new URL(value);
  } catch {
    fail("invalid_redirect_uri", "redirect_uri must be an absolute URL.");
  }
  const httpLoopback = url.protocol === "http:" && isLoopbackHostname(url.hostname) && allowHttpLoopback;
  if ((url.protocol !== "https:" && !httpLoopback) || url.username || url.password || url.hash) {
    fail("invalid_redirect_uri", "redirect_uri must use HTTPS (or an HTTP loopback URI for a native client) and must not contain credentials or a fragment.");
  }
  if (url.href !== value) {
    fail("invalid_redirect_uri", "redirect_uri must use its canonical exact form.");
  }
  for (const reserved of ["code", "state", "iss", "error", "error_description"]) {
    if (url.searchParams.has(reserved)) {
      fail("invalid_redirect_uri", `redirect_uri must not contain the reserved ${reserved} parameter.`);
    }
  }
  return value;
}

function validateReturnTo(value, issuer) {
  const requested = value === undefined ? "/" : value;
  if (typeof requested !== "string" || !requested.startsWith("/") || requested.startsWith("//") || requested.includes("\\") || /[\u0000-\u001f\u007f]/.test(requested)) {
    fail("invalid_request", "returnTo must be a same-origin absolute path.");
  }
  const url = new URL(requested, issuer);
  if (url.origin !== issuer) fail("invalid_request", "returnTo must stay on the Dex Company origin.");
  return url.href;
}

function validateBrowserNonce(value, { generate = false } = {}) {
  if ((value === undefined || value === null || value === "") && generate) {
    return randomBytes(32).toString("base64url");
  }
  if (typeof value !== "string" || !/^[A-Za-z0-9_-]{32,128}$/.test(value)) {
    fail("invalid_request", "The browser OAuth nonce cookie is missing or invalid.");
  }
  return value;
}

function safeQuotedHeaderValue(value) {
  return String(value).replace(/["\\\r\n]/g, "");
}

export function buildAuthorizationServerMetadata(issuer) {
  return {
    issuer,
    authorization_endpoint: `${issuer}/oauth/authorize`,
    token_endpoint: `${issuer}/oauth/token`,
    registration_endpoint: `${issuer}/oauth/register`,
    response_types_supported: ["code"],
    grant_types_supported: ["authorization_code", "refresh_token"],
    code_challenge_methods_supported: ["S256"],
    token_endpoint_auth_methods_supported: ["none"],
    scopes_supported: AUTHORIZATION_SCOPES,
    authorization_response_iss_parameter_supported: true,
  };
}

export function buildProtectedResourceMetadata(issuer, resource) {
  return {
    resource,
    authorization_servers: [issuer],
    bearer_methods_supported: ["header"],
    scopes_supported: [REQUIRED_SCOPE],
  };
}

export function buildWwwAuthenticate(resourceMetadataUrl, { error, description } = {}) {
  const parts = [
    `Bearer resource_metadata="${safeQuotedHeaderValue(resourceMetadataUrl)}"`,
    `scope="${REQUIRED_SCOPE}"`,
  ];
  if (error) parts.push(`error="${safeQuotedHeaderValue(error)}"`);
  if (description) parts.push(`error_description="${safeQuotedHeaderValue(description)}"`);
  return parts.join(", ");
}

export function createOAuthService({
  env = process.env,
  secretB64 = env.DEX_AUTH_SECRET_B64,
  publicOrigin = env.DEX_PUBLIC_ORIGIN ?? "http://localhost:8787",
  githubClientId = env.GITHUB_APP_CLIENT_ID,
  githubClientSecret = env.GITHUB_APP_CLIENT_SECRET,
  allowedGitHubLogin = env.DEX_ALLOWED_GITHUB_LOGIN ?? DEFAULT_ALLOWED_LOGIN,
  allowedGitHubUserId = env.DEX_ALLOWED_GITHUB_USER_ID ?? DEFAULT_ALLOWED_USER_ID,
  fetchImpl = globalThis.fetch,
  now = () => Math.floor(Date.now() / 1000),
  replayStore: suppliedReplayStore,
  allowHttpLoopbackRedirect = true,
  upstreamStateTtlSeconds: requestedStateTtl,
  authorizationCodeTtlSeconds: requestedCodeTtl,
  clientRegistrationTtlSeconds: requestedClientTtl,
  accessTokenTtlSeconds: requestedAccessTtl,
  refreshTokenTtlSeconds: requestedRefreshTtl,
  refreshFamilyTtlSeconds: requestedRefreshFamilyTtl,
  sessionTtlSeconds: requestedSessionTtl,
  clockSkewSeconds: requestedClockSkew,
  githubRequestTimeoutMs: requestedGitHubTimeout,
} = {}) {
  const issuer = normalizeOrigin(publicOrigin);
  const resource = `${issuer}/mcp`;
  const sessionAudience = `${issuer}/app`;
  const allowedLogin = String(allowedGitHubLogin ?? "").trim().toLowerCase();
  if (!/^[a-z0-9](?:[a-z0-9-]{0,37}[a-z0-9])?$/.test(allowedLogin)) {
    throw new OAuthError("server_error", "DEX_ALLOWED_GITHUB_LOGIN is invalid.", 500);
  }
  const allowedUserId = requiredPositiveId(allowedGitHubUserId);
  const clockSkewSeconds = positiveInteger(requestedClockSkew, 5, "clockSkewSeconds", { min: 0, max: 30 });
  const upstreamStateTtlSeconds = positiveInteger(requestedStateTtl, 600, "upstreamStateTtlSeconds", { max: 1_800 });
  const authorizationCodeTtlSeconds = positiveInteger(requestedCodeTtl, 90, "authorizationCodeTtlSeconds", { max: 300 });
  const clientRegistrationTtlSeconds = positiveInteger(requestedClientTtl, 31_536_000, "clientRegistrationTtlSeconds");
  const accessTokenTtlSeconds = positiveInteger(requestedAccessTtl, 600, "accessTokenTtlSeconds", { max: 3_600 });
  const refreshTokenTtlSeconds = positiveInteger(requestedRefreshTtl, DEFAULT_REFRESH_TOKEN_TTL_SECONDS, "refreshTokenTtlSeconds", { max: 2_592_000 });
  const refreshFamilyTtlSeconds = positiveInteger(requestedRefreshFamilyTtl, DEFAULT_REFRESH_FAMILY_TTL_SECONDS, "refreshFamilyTtlSeconds", { max: DEFAULT_REFRESH_FAMILY_TTL_SECONDS });
  const sessionTtlSeconds = positiveInteger(requestedSessionTtl, 28_800, "sessionTtlSeconds", { max: 604_800 });
  const githubRequestTimeoutMs = positiveInteger(requestedGitHubTimeout, DEFAULT_GITHUB_TIMEOUT_MS, "githubRequestTimeoutMs", { max: 30_000 });
  const requiresDurableReplayStore = env.NODE_ENV === "production"
    || Boolean(env.VERCEL_ENV)
    || ["1", "true", "yes", "on"].includes(String(env.DEX_REQUIRE_DURABLE_OAUTH_STATE ?? "").trim().toLowerCase());
  const replayStore = suppliedReplayStore ?? createOAuthReplayStore({ env, issuer, fetchImpl, now });
  const replayStoreReady = Boolean(replayStore?.configured && (!requiresDurableReplayStore || replayStore.durable));
  const configured = Boolean(secretB64 && githubClientId && githubClientSecret && typeof fetchImpl === "function" && replayStoreReady);
  let authCrypto = null;
  if (secretB64) {
    try {
      authCrypto = createAuthCrypto({ secretB64, issuer, now, clockSkewSeconds });
    } catch (error) {
      throw new OAuthError("server_error", "DEX_AUTH_SECRET_B64 is invalid.", 500, { cause: error });
    }
  }
  const config = Object.freeze({
    issuer,
    resource,
    allowedLogin,
    allowedUserId,
    authorizationCodeTtlSeconds,
    accessTokenTtlSeconds,
    refreshTokenTtlSeconds,
    refreshFamilyTtlSeconds,
    sessionTtlSeconds,
    clockSkewSeconds,
  });

  function currentTime() {
    const value = Number(now());
    if (!Number.isSafeInteger(value) || value < 0) throw new OAuthError("server_error", "The OAuth clock is invalid.", 500);
    return value;
  }

  function randomId() {
    return randomBytes(16).toString("base64url");
  }

  function assertRandomId(value, description = "The authorization request state is invalid.") {
    if (typeof value !== "string" || !RANDOM_ID_PATTERN.test(value)) {
      fail("invalid_request", description);
    }
    return value;
  }

  async function replayOperation(operation) {
    try {
      return await operation();
    } catch (error) {
      if (error instanceof OAuthReplayStoreError) {
        fail("temporarily_unavailable", "OAuth replay protection is temporarily unavailable.", 503);
      }
      throw error;
    }
  }

  async function claimOnce(namespace, id, value, ttlSeconds, { code = "invalid_request", description = "The OAuth credential has already been used." } = {}) {
    const claim = await replayOperation(() => replayStore.claim(namespace, id, value, ttlSeconds));
    if (!claim.claimed) fail(code, description);
    return claim;
  }

  function assertIdentityClaims(claims, { tokenUse, maxTtlSeconds, requireCsrf = false } = {}) {
    if (
      claims.token_use !== tokenUse
      || typeof claims.jti !== "string"
      || !JWT_ID_PATTERN.test(claims.jti)
      || !Number.isSafeInteger(claims.github_id)
      || claims.github_id <= 0
      || claims.github_id !== allowedUserId
      || typeof claims.sub !== "string"
      || !secureEqual(claims.sub, `github:${claims.github_id}`)
      || typeof claims.github_login !== "string"
      || claims.github_login.toLowerCase() !== allowedLogin
      || claims.exp - claims.iat > maxTtlSeconds
    ) {
      throw new AuthCryptoError("Invalid identity token claims.");
    }
    if (requireCsrf && (typeof claims.csrf !== "string" || !/^[A-Za-z0-9_-]{43}$/.test(claims.csrf))) {
      throw new AuthCryptoError("Invalid session CSRF claim.");
    }
    return claims;
  }

  function assertConfigured() {
    if (!configured || !authCrypto) {
      fail("temporarily_unavailable", "OAuth is not configured.", 503);
    }
  }

  function openOpaque(purpose, token, errorCode, status = 400) {
    try {
      return authCrypto.openOpaque(purpose, token);
    } catch (error) {
      if (error instanceof AuthCryptoError) {
        fail(errorCode, error.reason === "expired" ? "The credential has expired." : "The credential is invalid.", status);
      }
      throw error;
    }
  }

  function decodeClient(clientId, errorCode = "invalid_client") {
    const client = openOpaque("client-id", clientId, errorCode, errorCode === "invalid_client" ? 401 : 400);
    if (
      !client
      || !Array.isArray(client.redirectUris)
      || client.redirectUris.length === 0
      || client.tokenEndpointAuthMethod !== "none"
      || !["web", "native"].includes(client.applicationType)
      || !Array.isArray(client.grantTypes)
      || client.grantTypes.length < 1
      || client.grantTypes.length > 2
      || new Set(client.grantTypes).size !== client.grantTypes.length
      || !client.grantTypes.includes("authorization_code")
      || client.grantTypes.some((grant) => !["authorization_code", "refresh_token"].includes(grant))
      || !Number.isSafeInteger(client.issuedAt)
    ) {
      fail(errorCode, "The OAuth client is invalid.", errorCode === "invalid_client" ? 401 : 400);
    }
    return client;
  }

  function stateCookiePayload(nonce) {
    return Object.freeze({
      name: issuer.startsWith("https://") ? HOST_NONCE_COOKIE_NAME : LOCAL_NONCE_COOKIE_NAME,
      value: nonce,
      maxAgeSeconds: upstreamStateTtlSeconds,
      httpOnly: true,
      secure: issuer.startsWith("https://"),
      sameSite: "lax",
      path: "/",
    });
  }

  function githubAuthorizationRedirect(opaqueState, githubCodeChallenge) {
    const url = new URL(GITHUB_AUTHORIZE_ENDPOINT);
    url.searchParams.set("client_id", githubClientId);
    url.searchParams.set("redirect_uri", `${issuer}/auth/github/callback`);
    url.searchParams.set("state", opaqueState);
    url.searchParams.set("code_challenge", githubCodeChallenge);
    url.searchParams.set("code_challenge_method", "S256");
    return url.href;
  }

  function createUpstreamState(flow, data, browserNonce) {
    const nonce = validateBrowserNonce(browserNonce, { generate: true });
    const githubCodeVerifier = randomBytes(64).toString("base64url");
    const opaqueState = authCrypto.sealOpaque("state", {
      flow,
      callbackId: randomId(),
      nonceHash: sha256Base64Url(nonce),
      githubCodeVerifier,
      ...data,
    }, { ttlSeconds: upstreamStateTtlSeconds });
    return {
      redirectUrl: githubAuthorizationRedirect(opaqueState, sha256Base64Url(githubCodeVerifier)),
      opaqueState,
      stateCookiePayload: stateCookiePayload(nonce),
    };
  }

  function registerClient(metadata) {
    assertConfigured();
    if (!metadata || typeof metadata !== "object" || Array.isArray(metadata)) {
      fail("invalid_client_metadata", "Client metadata must be an object.");
    }
    const redirectUris = metadata.redirect_uris;
    if (!Array.isArray(redirectUris) || redirectUris.length < 1 || redirectUris.length > 10 || new Set(redirectUris).size !== redirectUris.length) {
      fail("invalid_redirect_uri", "One to ten unique redirect_uris are required.");
    }
    const applicationType = validateApplicationType(metadata.application_type);
    const validatedRedirects = redirectUris.map((uri) => validateRedirectUri(uri, {
      allowHttpLoopback: Boolean(allowHttpLoopbackRedirect) && applicationType === "native",
    }));
    if (Buffer.byteLength(validatedRedirects.join("\n"), "utf8") > MAX_REGISTERED_REDIRECT_BYTES) {
      fail("invalid_client_metadata", "The combined redirect_uris are too large.");
    }
    const grantTypes = validateGrantTypes(metadata.grant_types);
    assertOnlyValue(metadata.response_types ?? ["code"], "code");
    if ((metadata.token_endpoint_auth_method ?? "none") !== "none" || metadata.client_secret !== undefined) {
      fail("invalid_client_metadata", "Only public clients using token_endpoint_auth_method none are supported.");
    }
    if (metadata.client_name !== undefined && (typeof metadata.client_name !== "string" || metadata.client_name.length < 1 || metadata.client_name.length > 100)) {
      fail("invalid_client_metadata", "client_name is invalid.");
    }
    const issuedAt = currentTime();
    const client = {
      redirectUris: validatedRedirects,
      tokenEndpointAuthMethod: "none",
      clientName: metadata.client_name ?? "Unidentified MCP client",
      applicationType,
      grantTypes,
      issuedAt,
    };
    const clientId = authCrypto.sealOpaque("client-id", client, { ttlSeconds: clientRegistrationTtlSeconds });
    if (Buffer.byteLength(clientId, "utf8") > MAX_CLIENT_ID_BYTES) {
      fail("invalid_client_metadata", "The registered client metadata is too large.");
    }
    return {
      client_id: clientId,
      client_id_issued_at: issuedAt,
      client_name: metadata.client_name,
      application_type: applicationType,
      redirect_uris: validatedRedirects,
      token_endpoint_auth_method: "none",
      grant_types: grantTypes,
      response_types: ["code"],
    };
  }

  function beginMcpAuthorization(params, { browserNonce } = {}) {
    assertConfigured();
    const clientId = requiredString(params, "client_id", { max: 16_384 });
    const client = decodeClient(clientId, "invalid_request");
    const redirectUri = requiredString(params, "redirect_uri", { max: 2_048 });
    if (!client.redirectUris.some((registered) => secureEqual(registered, redirectUri))) {
      fail("invalid_request", "redirect_uri is not registered for this client.");
    }
    if (field(params, "response_type") !== "code") fail("unsupported_response_type", "Only response_type=code is supported.");
    if (field(params, "resource") !== resource) fail("invalid_target", "The requested resource is invalid.");
    const scope = parseScope(requiredString(params, "scope", { max: 128 }));
    if (scope.includes(OFFLINE_SCOPE) && !client.grantTypes.includes("refresh_token")) {
      fail("invalid_scope", "offline_access requires a client registered for refresh_token.");
    }
    const clientState = requiredString(params, "state", { max: 1_024 });
    const challenge = requiredString(params, "code_challenge", { max: 128 });
    if (!PKCE_CHALLENGE_PATTERN.test(challenge) || field(params, "code_challenge_method") !== "S256") {
      fail("invalid_request", "PKCE S256 is required.");
    }

    const { redirectUrl: _upstreamRedirect, ...started } = createUpstreamState("mcp", {
      clientId,
      redirectUri,
      clientState,
      resource,
      scope,
      codeChallenge: challenge,
    }, browserNonce);
    return {
      ...started,
      consent: {
        clientName: client.clientName,
        redirectUri,
        scope,
        offlineAccess: scope.includes(OFFLINE_SCOPE),
        refreshTokenMaxAgeSeconds: scope.includes(OFFLINE_SCOPE) ? Math.min(refreshTokenTtlSeconds, refreshFamilyTtlSeconds) : null,
        refreshFamilyMaxAgeSeconds: scope.includes(OFFLINE_SCOPE) ? refreshFamilyTtlSeconds : null,
      },
    };
  }

  async function continueMcpAuthorization({ state, browserNonce, decision } = {}) {
    assertConfigured();
    const opaqueState = requiredString({ state }, "state", { max: 32_768 });
    const savedState = openOpaque("state", opaqueState, "invalid_request");
    const nonce = validateBrowserNonce(browserNonce);
    if (typeof savedState?.nonceHash !== "string" || !secureEqual(savedState.nonceHash, sha256Base64Url(nonce))) {
      fail("invalid_request", "The browser OAuth nonce cookie does not match the authorization request.");
    }
    if (savedState.flow !== "mcp") fail("invalid_request", "The authorization request flow is invalid.");
    assertRandomId(savedState.callbackId);
    const client = decodeClient(savedState.clientId, "invalid_request");
    if (!client.redirectUris.some((registered) => secureEqual(registered, savedState.redirectUri))) {
      fail("invalid_request", "The authorization redirect is no longer registered.");
    }
    const savedScope = parseScope(savedState.scope, { errorCode: "invalid_request" });
    if (
      savedState.resource !== resource
      || savedState.scope !== savedScope
      || !PKCE_CHALLENGE_PATTERN.test(savedState.codeChallenge)
      || !PKCE_VERIFIER_PATTERN.test(savedState.githubCodeVerifier)
    ) {
      fail("invalid_request", "The authorization request state is invalid.");
    }
    if (!["approve", "deny"].includes(decision)) {
      fail("invalid_request", "The authorization decision is invalid.");
    }
    await claimOnce("consent", savedState.callbackId, decision, upstreamStateTtlSeconds, {
      description: "The authorization consent request has already been used.",
    });
    if (!secureEqual(decision, "approve")) {
      const redirect = new URL(savedState.redirectUri);
      redirect.searchParams.set("error", "access_denied");
      redirect.searchParams.set("error_description", "The resource owner denied the authorization request.");
      redirect.searchParams.set("state", savedState.clientState);
      redirect.searchParams.set("iss", issuer);
      return { approved: false, redirectUrl: redirect.href };
    }
    const consentedState = authCrypto.sealOpaque("state", {
      ...savedState,
      callbackId: randomId(),
      consentedAt: currentTime(),
    }, { ttlSeconds: upstreamStateTtlSeconds });
    return {
      approved: true,
      redirectUrl: githubAuthorizationRedirect(consentedState, sha256Base64Url(savedState.githubCodeVerifier)),
    };
  }

  function beginPwaLogin({ browserNonce, returnTo } = {}) {
    assertConfigured();
    return createUpstreamState("pwa", {
      returnTo: validateReturnTo(returnTo, issuer),
    }, browserNonce);
  }

  async function responseJson(response) {
    const contentLength = Number(response?.headers?.get?.("content-length"));
    if (Number.isFinite(contentLength) && contentLength > MAX_GITHUB_RESPONSE_BYTES) {
      fail("temporarily_unavailable", "GitHub returned an oversized authentication response.", 503);
    }
    let bytes;
    try {
      if (response?.body?.getReader) {
        const reader = response.body.getReader();
        const chunks = [];
        let length = 0;
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            length += value.byteLength;
            if (length > MAX_GITHUB_RESPONSE_BYTES) {
              await reader.cancel();
              fail("temporarily_unavailable", "GitHub returned an oversized authentication response.", 503);
            }
            chunks.push(value);
          }
        } finally {
          reader.releaseLock();
        }
        bytes = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)), length);
      } else {
        bytes = Buffer.from(await response.arrayBuffer());
        if (bytes.length > MAX_GITHUB_RESPONSE_BYTES) {
          fail("temporarily_unavailable", "GitHub returned an oversized authentication response.", 503);
        }
      }
      return JSON.parse(bytes.toString("utf8"));
    } catch (error) {
      if (error instanceof OAuthError) throw error;
      fail("temporarily_unavailable", "GitHub returned an invalid authentication response.", 503);
    }
  }

  async function fetchGitHub(url, init, unavailableDescription) {
    try {
      const response = await fetchImpl(url, {
        ...init,
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(githubRequestTimeoutMs),
      });
      if (!response || typeof response.ok !== "boolean" || !Number.isInteger(response.status) || typeof response.arrayBuffer !== "function") {
        fail("temporarily_unavailable", unavailableDescription, 503);
      }
      return response;
    } catch (error) {
      if (error instanceof OAuthError) throw error;
      fail("temporarily_unavailable", unavailableDescription, 503);
    }
  }

  async function exchangeGitHubCode(githubCode, githubCodeVerifier) {
    if (!PKCE_VERIFIER_PATTERN.test(String(githubCodeVerifier ?? ""))) {
      fail("invalid_grant", "The upstream PKCE verifier is invalid.");
    }
    const tokenResponse = await fetchGitHub(GITHUB_TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Dex-Company-Runtime",
      },
      body: new URLSearchParams({
        client_id: githubClientId,
        client_secret: githubClientSecret,
        code: githubCode,
        redirect_uri: `${issuer}/auth/github/callback`,
        code_verifier: githubCodeVerifier,
      }).toString(),
    }, "GitHub authentication is temporarily unavailable.");
    const tokenPayload = await responseJson(tokenResponse);
    if (!tokenResponse.ok && tokenResponse.status >= 500) {
      fail("temporarily_unavailable", "GitHub authentication is temporarily unavailable.", 503);
    }
    if (
      !tokenResponse.ok
      || tokenPayload?.error
      || typeof tokenPayload?.access_token !== "string"
      || tokenPayload.access_token.length < 1
      || tokenPayload.access_token.length > 4_096
      || /[\u0000-\u0020\u007f]/.test(tokenPayload.access_token)
    ) {
      fail("invalid_grant", "The authorization code is invalid or has already been used.");
    }

    const userResponse = await fetchGitHub(GITHUB_USER_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${tokenPayload.access_token}`,
        "User-Agent": "Dex-Company-Runtime",
        "X-GitHub-Api-Version": GITHUB_API_VERSION,
      },
    }, "GitHub identity verification is temporarily unavailable.");
    const user = await responseJson(userResponse);
    if (!userResponse.ok && userResponse.status >= 500) {
      fail("temporarily_unavailable", "GitHub identity verification is temporarily unavailable.", 503);
    }
    if (!userResponse.ok || typeof user?.login !== "string" || !Number.isSafeInteger(user?.id) || user.id <= 0) {
      fail("access_denied", "GitHub identity verification failed.", 403);
    }
    if (user.login.toLowerCase() !== allowedLogin || (allowedUserId !== null && user.id !== allowedUserId)) {
      fail("access_denied", "This GitHub account is not allowed to access Dex Company.", 403);
    }
    return Object.freeze({ login: user.login, id: user.id });
  }

  async function handleGitHubCallback({ code, state, browserNonce, error } = {}) {
    assertConfigured();
    const opaqueState = requiredString({ state }, "state", { max: 32_768 });
    const savedState = openOpaque("state", opaqueState, "invalid_request");
    const upstreamError = error === undefined ? undefined : requiredString({ error }, "error", { max: 256 });
    const nonce = validateBrowserNonce(browserNonce);
    if (typeof savedState?.nonceHash !== "string" || !secureEqual(savedState.nonceHash, sha256Base64Url(nonce))) {
      fail("invalid_request", "The browser OAuth nonce cookie does not match the authorization request.");
    }
    if (savedState.flow === "mcp") {
      assertRandomId(savedState.callbackId);
      const client = decodeClient(savedState.clientId, "invalid_request");
      if (!client.redirectUris.some((registered) => secureEqual(registered, savedState.redirectUri))) {
        fail("invalid_request", "The authorization redirect is no longer registered.");
      }
      const savedScope = parseScope(savedState.scope, { errorCode: "invalid_request" });
      if (
        !Number.isSafeInteger(savedState.consentedAt)
        || savedState.consentedAt > currentTime() + clockSkewSeconds
        || savedState.resource !== resource
        || savedState.scope !== savedScope
        || !PKCE_CHALLENGE_PATTERN.test(savedState.codeChallenge)
        || !PKCE_VERIFIER_PATTERN.test(savedState.githubCodeVerifier)
      ) {
        fail("invalid_request", "The authorization request state is invalid.");
      }
      const githubCode = upstreamError === undefined ? requiredString({ code }, "code", { max: 2_048 }) : null;
      await claimOnce("callback", savedState.callbackId, "used", upstreamStateTtlSeconds, {
        description: "The GitHub authorization callback has already been used.",
      });
      if (upstreamError) {
        const redirect = new URL(savedState.redirectUri);
        redirect.searchParams.set("error", upstreamError === "access_denied" ? "access_denied" : "server_error");
        redirect.searchParams.set("error_description", upstreamError === "access_denied"
          ? "GitHub authorization was denied."
          : "GitHub authorization failed.");
        redirect.searchParams.set("state", savedState.clientState);
        redirect.searchParams.set("iss", issuer);
        return { flow: "mcp", redirectUrl: redirect.href, authorizationCodeExpiresAt: null };
      }
      const authorizationCode = authCrypto.sealOpaque("code", {
        codeId: randomId(),
        githubCode,
        clientId: savedState.clientId,
        redirectUri: savedState.redirectUri,
        resource,
        scope: savedScope,
        codeChallenge: savedState.codeChallenge,
        githubCodeVerifier: savedState.githubCodeVerifier,
      }, { ttlSeconds: authorizationCodeTtlSeconds });
      const redirect = new URL(savedState.redirectUri);
      redirect.searchParams.set("code", authorizationCode);
      redirect.searchParams.set("state", savedState.clientState);
      redirect.searchParams.set("iss", issuer);
      return {
        flow: "mcp",
        redirectUrl: redirect.href,
        authorizationCodeExpiresAt: currentTime() + authorizationCodeTtlSeconds,
      };
    }

    if (savedState.flow === "pwa") {
      assertRandomId(savedState.callbackId);
      const returnTo = validateReturnTo(new URL(savedState.returnTo).pathname + new URL(savedState.returnTo).search + new URL(savedState.returnTo).hash, issuer);
      if (!PKCE_VERIFIER_PATTERN.test(savedState.githubCodeVerifier)) {
        fail("invalid_request", "The authorization request state is invalid.");
      }
      const githubCode = upstreamError === undefined ? requiredString({ code }, "code", { max: 2_048 }) : null;
      await claimOnce("callback", savedState.callbackId, "used", upstreamStateTtlSeconds, {
        description: "The GitHub authorization callback has already been used.",
      });
      if (upstreamError) {
        fail(upstreamError === "access_denied" ? "access_denied" : "server_error", upstreamError === "access_denied"
          ? "GitHub authorization was denied."
          : "GitHub authorization failed.", upstreamError === "access_denied" ? 403 : 502);
      }
      const user = await exchangeGitHubCode(githubCode, savedState.githubCodeVerifier);
      const expiresAt = currentTime() + sessionTtlSeconds;
      const sessionToken = authCrypto.signJwt("session", {
        sub: `github:${user.id}`,
        aud: sessionAudience,
        github_login: user.login,
        github_id: user.id,
        csrf: randomBytes(32).toString("base64url"),
        token_use: "session",
      }, { ttlSeconds: sessionTtlSeconds });
      return {
        flow: "pwa",
        redirectUrl: returnTo,
        sessionToken,
        sessionExpiresAt: expiresAt,
      };
    }

    fail("invalid_request", "The authorization request flow is invalid.");
  }

  async function revokeAccessTokenId(jti) {
    if (typeof jti !== "string" || !JWT_ID_PATTERN.test(jti)) return;
    await replayOperation(() => replayStore.put(
      "revoked",
      jti,
      "revoked",
      accessTokenTtlSeconds + clockSkewSeconds + 1,
    ));
  }

  function validateFamilyExpiration(value, { errorCode = "invalid_grant" } = {}) {
    const expiresAt = Number(value);
    const current = currentTime();
    if (
      !Number.isSafeInteger(expiresAt)
      || expiresAt <= current
      || expiresAt > current + refreshFamilyTtlSeconds
    ) {
      fail(errorCode, "The refresh-token family lifetime is invalid or expired.");
    }
    return { expiresAt, remainingSeconds: expiresAt - current };
  }

  async function revokeTokenFamily(familyId, familyExpiresAt) {
    if (typeof familyId !== "string" || !RANDOM_ID_PATTERN.test(familyId)) return;
    const expiresAt = Number(familyExpiresAt);
    const remainingSeconds = Number.isSafeInteger(expiresAt)
      ? Math.min(refreshFamilyTtlSeconds, expiresAt - currentTime())
      : 0;
    if (remainingSeconds <= 0) return;
    await replayOperation(() => replayStore.put(
      "family-revoked",
      familyId,
      "revoked",
      remainingSeconds,
    ));
  }

  async function tokenFamilyIsRevoked(familyId) {
    if (typeof familyId !== "string" || !RANDOM_ID_PATTERN.test(familyId)) return true;
    return (await replayOperation(() => replayStore.get("family-revoked", familyId))) !== null;
  }

  async function revokeIssuedValue(value) {
    if (typeof value !== "string" || !value.startsWith("issued:")) return;
    const [, jti, familyId, familyExpiresAt, extra] = value.split(":");
    if (extra !== undefined || !JWT_ID_PATTERN.test(String(jti ?? ""))) return;
    await revokeAccessTokenId(jti);
    if (familyId !== undefined) await revokeTokenFamily(familyId, Number(familyExpiresAt));
  }

  async function recordAuthorizationCodeReplay(codeId, existingValue) {
    let value = existingValue;
    if (value === null || value === undefined) {
      value = await replayOperation(() => replayStore.get("code", codeId));
    }
    if (typeof value === "string" && value.startsWith("issued:")) {
      await revokeIssuedValue(value);
      return;
    }
    if (value === "processing") {
      const marked = await replayOperation(() => replayStore.compareAndSet(
        "code",
        codeId,
        "processing",
        "replayed",
        authorizationCodeTtlSeconds + clockSkewSeconds + 1,
      ));
      if (!marked) {
        const latest = await replayOperation(() => replayStore.get("code", codeId));
        if (typeof latest === "string" && latest.startsWith("issued:")) {
          await revokeIssuedValue(latest);
        }
      }
    }
  }

  function signAccessToken(user, scope, familyId, familyExpiresAt) {
    return authCrypto.signJwt("access", {
      sub: `github:${user.id}`,
      aud: resource,
      scope,
      github_login: user.login,
      github_id: user.id,
      token_use: "access",
      ...(familyId ? {
        token_family: familyId,
        token_family_expires_at: familyExpiresAt,
      } : {}),
    }, { ttlSeconds: accessTokenTtlSeconds });
  }

  function tokenResponse(accessToken, scope, refreshToken) {
    return {
      access_token: accessToken,
      token_type: "Bearer",
      expires_in: accessTokenTtlSeconds,
      scope,
      ...(refreshToken ? { refresh_token: refreshToken } : {}),
    };
  }

  async function createRefreshCredential({
    clientId,
    scope,
    user,
    familyId = randomId(),
    familyExpiresAt = currentTime() + refreshFamilyTtlSeconds,
  }) {
    const familyLifetime = validateFamilyExpiration(familyExpiresAt);
    const credentialTtlSeconds = Math.min(refreshTokenTtlSeconds, familyLifetime.remainingSeconds);
    const tokenId = randomId();
    const claim = await replayOperation(() => replayStore.claim(
      "refresh",
      tokenId,
      "active",
      credentialTtlSeconds,
    ));
    if (!claim.claimed) fail("server_error", "A refresh-token identifier collision occurred.", 500);
    const refreshToken = authCrypto.sealOpaque("refresh", {
      tokenId,
      familyId,
      familyExpiresAt: familyLifetime.expiresAt,
      clientId,
      resource,
      scope,
      githubLogin: user.login,
      githubId: user.id,
    }, { ttlSeconds: credentialTtlSeconds });
    return {
      refreshToken,
      tokenId,
      familyId,
      familyExpiresAt: familyLifetime.expiresAt,
      expiresIn: credentialTtlSeconds,
    };
  }

  async function exchangeAuthorizationCode(params) {
    const code = requiredString(params, "code", { max: 32_768 });
    const clientId = requiredString(params, "client_id", { max: 16_384 });
    const redirectUri = requiredString(params, "redirect_uri", { max: 2_048 });
    const verifier = requiredString(params, "code_verifier", { max: 128 });
    if (!PKCE_VERIFIER_PATTERN.test(verifier)) fail("invalid_grant", "The PKCE verifier is invalid.");
    if (field(params, "resource") !== resource) fail("invalid_target", "The requested resource is invalid.");

    const client = decodeClient(clientId);
    const authorization = openOpaque("code", code, "invalid_grant");
    const authorizationScope = parseScope(authorization?.scope, { errorCode: "invalid_grant" });
    if (
      typeof authorization?.clientId !== "string"
      || !secureEqual(authorization.clientId, clientId)
      || typeof authorization.redirectUri !== "string"
      || !secureEqual(authorization.redirectUri, redirectUri)
      || !client.redirectUris.some((registered) => secureEqual(registered, redirectUri))
      || authorization.resource !== resource
      || authorization.scope !== authorizationScope
      || (authorizationScope.includes(OFFLINE_SCOPE) && !client.grantTypes.includes("refresh_token"))
      || typeof authorization.githubCode !== "string"
      || typeof authorization.codeChallenge !== "string"
      || typeof authorization.codeId !== "string"
      || !RANDOM_ID_PATTERN.test(authorization.codeId)
      || !PKCE_VERIFIER_PATTERN.test(authorization.githubCodeVerifier)
    ) {
      fail("invalid_grant", "The authorization code does not match this token request.");
    }
    const actualChallenge = sha256Base64Url(verifier);
    if (!secureEqual(actualChallenge, authorization.codeChallenge)) {
      fail("invalid_grant", "The PKCE verifier is invalid.");
    }

    const codeClaim = await replayOperation(() => replayStore.claim(
      "code",
      authorization.codeId,
      "processing",
      authorizationCodeTtlSeconds + clockSkewSeconds + 1,
    ));
    if (!codeClaim.claimed) {
      await recordAuthorizationCodeReplay(authorization.codeId, codeClaim.existing);
      fail("invalid_grant", "The authorization code has already been used.");
    }

    const user = await exchangeGitHubCode(authorization.githubCode, authorization.githubCodeVerifier);
    const refreshEnabled = authorizationScope.includes(OFFLINE_SCOPE) && client.grantTypes.includes("refresh_token");
    const refreshCredential = refreshEnabled
      ? await createRefreshCredential({ clientId, scope: authorizationScope, user })
      : null;
    const accessToken = signAccessToken(
      user,
      authorizationScope,
      refreshCredential?.familyId,
      refreshCredential?.familyExpiresAt,
    );
    const claims = verifyAccessToken(accessToken);
    const markedIssued = await replayOperation(() => replayStore.compareAndSet(
      "code",
      authorization.codeId,
      "processing",
      `issued:${claims.jti}${refreshCredential ? `:${refreshCredential.familyId}:${refreshCredential.familyExpiresAt}` : ""}`,
      authorizationCodeTtlSeconds + clockSkewSeconds + 1,
    ));
    if (!markedIssued) {
      await revokeAccessTokenId(claims.jti);
      if (refreshCredential) await revokeTokenFamily(refreshCredential.familyId, refreshCredential.familyExpiresAt);
      fail("invalid_grant", "The authorization code was replayed during token issuance.");
    }
    return tokenResponse(accessToken, authorizationScope, refreshCredential?.refreshToken);
  }

  async function exchangeRefreshToken(params) {
    const clientId = requiredString(params, "client_id", { max: 16_384 });
    const suppliedRefreshToken = requiredString(params, "refresh_token", { max: 32_768 });
    if (field(params, "resource") !== resource) fail("invalid_target", "The requested resource is invalid.");
    const requestedScope = field(params, "scope");
    const client = decodeClient(clientId);
    if (!client.grantTypes.includes("refresh_token")) fail("unauthorized_client", "This client is not registered for refresh_token.");
    const refresh = openOpaque("refresh", suppliedRefreshToken, "invalid_grant");
    const refreshScope = parseScope(refresh?.scope, { requireOffline: true, errorCode: "invalid_grant" });
    const familyLifetime = validateFamilyExpiration(refresh?.familyExpiresAt);
    if (requestedScope !== undefined) {
      const normalizedRequestedScope = parseScope(requestedScope);
      if (!secureEqual(normalizedRequestedScope, refreshScope)) fail("invalid_scope", "The refresh-token scope cannot be changed.");
    }
    if (
      typeof refresh?.tokenId !== "string"
      || !RANDOM_ID_PATTERN.test(refresh.tokenId)
      || typeof refresh.familyId !== "string"
      || !RANDOM_ID_PATTERN.test(refresh.familyId)
      || refresh.familyExpiresAt !== familyLifetime.expiresAt
      || typeof refresh.clientId !== "string"
      || !secureEqual(refresh.clientId, clientId)
      || refresh.resource !== resource
      || refresh.scope !== refreshScope
      || typeof refresh.githubLogin !== "string"
      || refresh.githubLogin.toLowerCase() !== allowedLogin
      || !Number.isSafeInteger(refresh.githubId)
      || refresh.githubId !== allowedUserId
    ) {
      fail("invalid_grant", "The refresh token does not match this token request.");
    }
    if (await tokenFamilyIsRevoked(refresh.familyId)) {
      fail("invalid_grant", "The refresh-token family has been revoked.");
    }
    const rotating = await replayOperation(() => replayStore.compareAndSet(
      "refresh",
      refresh.tokenId,
      "active",
      "rotating",
      Math.min(refreshTokenTtlSeconds, familyLifetime.remainingSeconds),
    ));
    if (!rotating) {
      await revokeTokenFamily(refresh.familyId, familyLifetime.expiresAt);
      fail("invalid_grant", "Refresh-token reuse was detected; the token family has been revoked.");
    }

    const user = Object.freeze({ login: refresh.githubLogin, id: refresh.githubId });
    const next = await createRefreshCredential({
      clientId,
      scope: refreshScope,
      user,
      familyId: refresh.familyId,
      familyExpiresAt: familyLifetime.expiresAt,
    });
    const accessToken = signAccessToken(user, refreshScope, refresh.familyId, familyLifetime.expiresAt);
    const claims = verifyAccessToken(accessToken);
    const rotated = await replayOperation(() => replayStore.compareAndSet(
      "refresh",
      refresh.tokenId,
      "rotating",
      `rotated:${next.tokenId}`,
      Math.min(refreshTokenTtlSeconds, familyLifetime.remainingSeconds),
    ));
    if (
      !rotated
      || currentTime() >= familyLifetime.expiresAt
      || await tokenFamilyIsRevoked(refresh.familyId)
    ) {
      await revokeAccessTokenId(claims.jti);
      await revokeTokenFamily(refresh.familyId, familyLifetime.expiresAt);
      fail("invalid_grant", "Refresh-token reuse was detected; the token family has been revoked.");
    }
    return tokenResponse(accessToken, refreshScope, next.refreshToken);
  }

  async function exchangeToken(params) {
    assertConfigured();
    if (field(params, "client_secret") !== undefined) fail("invalid_client", "This is a public OAuth client.", 401);
    const grantType = field(params, "grant_type");
    if (grantType === "authorization_code") return exchangeAuthorizationCode(params);
    if (grantType === "refresh_token") return exchangeRefreshToken(params);
    fail("unsupported_grant_type", "Only authorization_code and refresh_token are supported.");
  }

  function verifyAccessToken(token) {
    assertConfigured();
    try {
      const claims = authCrypto.verifyJwt("access", token, {
        audience: resource,
        requiredScope: REQUIRED_SCOPE,
        maxTtlSeconds: accessTokenTtlSeconds,
      });
      assertIdentityClaims(claims, { tokenUse: "access", maxTtlSeconds: accessTokenTtlSeconds });
      let normalizedScope;
      try {
        normalizedScope = parseScope(claims.scope);
      } catch {
        throw new AuthCryptoError("Invalid access-token scope.");
      }
      const offline = normalizedScope.includes(OFFLINE_SCOPE);
      const validFamilyLifetime = Number.isSafeInteger(claims.token_family_expires_at)
        && claims.token_family_expires_at > claims.iat
        && claims.token_family_expires_at <= claims.iat + refreshFamilyTtlSeconds
        && claims.token_family_expires_at > currentTime();
      if (
        claims.scope !== normalizedScope
        || (offline && (typeof claims.token_family !== "string" || !RANDOM_ID_PATTERN.test(claims.token_family)))
        || (offline && !validFamilyLifetime)
        || (!offline && (claims.token_family !== undefined || claims.token_family_expires_at !== undefined))
      ) {
        throw new AuthCryptoError("Invalid access token.");
      }
      return claims;
    } catch (error) {
      if (error instanceof OAuthError) throw error;
      throw new OAuthError("invalid_token", "The bearer access token is invalid or expired.", 401, { cause: error });
    }
  }

  async function verifyAccessTokenActive(token) {
    const claims = verifyAccessToken(token);
    const revoked = await replayOperation(() => replayStore.get("revoked", claims.jti));
    if (revoked !== null) {
      throw new OAuthError("invalid_token", "The bearer access token has been revoked.", 401);
    }
    if (claims.token_family && await tokenFamilyIsRevoked(claims.token_family)) {
      throw new OAuthError("invalid_token", "The bearer access-token family has been revoked.", 401);
    }
    return claims;
  }

  function verifySessionToken(token) {
    assertConfigured();
    try {
      const claims = authCrypto.verifyJwt("session", token, {
        audience: sessionAudience,
        maxTtlSeconds: sessionTtlSeconds,
      });
      assertIdentityClaims(claims, { tokenUse: "session", maxTtlSeconds: sessionTtlSeconds, requireCsrf: true });
      return claims;
    } catch (error) {
      if (error instanceof OAuthError) throw error;
      throw new OAuthError("invalid_token", "The browser session is invalid or expired.", 401, { cause: error });
    }
  }

  async function verifySessionTokenActive(token) {
    const claims = verifySessionToken(token);
    const revoked = await replayOperation(() => replayStore.get("session-revoked", claims.jti));
    if (revoked !== null) {
      throw new OAuthError("invalid_token", "The browser session has been revoked.", 401);
    }
    return claims;
  }

  async function revokeSessionToken(token) {
    const claims = verifySessionToken(token);
    const remainingSeconds = claims.exp + clockSkewSeconds + 1 - currentTime();
    if (remainingSeconds > 0) {
      await replayOperation(() => replayStore.put("session-revoked", claims.jti, "revoked", remainingSeconds));
    }
    return claims;
  }

  async function consumeRateLimit(namespace, identity, { max, windowSeconds }) {
    if (!/^[a-z][a-z0-9-]{0,31}$/.test(String(namespace ?? ""))) {
      throw new OAuthError("server_error", "The rate-limit namespace is invalid.", 500);
    }
    const limit = positiveInteger(max, undefined, "rateLimitMax", { max: 100_000 });
    const duration = positiveInteger(windowSeconds, undefined, "rateLimitWindowSeconds", { max: 86_400 });
    const nowSeconds = currentTime();
    const windowId = Math.floor(nowSeconds / duration);
    const keyId = sha256Base64Url(`${namespace}\n${String(identity ?? "unknown").slice(0, 512)}\n${windowId}`);
    const count = await replayOperation(() => replayStore.increment("rate-limit", keyId, duration + 1));
    return Object.freeze({
      allowed: count <= limit,
      count,
      limit,
      resetAt: (windowId + 1) * duration,
    });
  }

  function authorizationServerMetadata() {
    assertConfigured();
    return buildAuthorizationServerMetadata(issuer);
  }

  function protectedResourceMetadata() {
    assertConfigured();
    return buildProtectedResourceMetadata(issuer, resource);
  }

  function wwwAuthenticate(error) {
    return buildWwwAuthenticate(`${issuer}/.well-known/oauth-protected-resource`, error && {
      error: error.code ?? "invalid_token",
      description: error.description ?? error.message,
    });
  }

  return Object.freeze({
    configured,
    config,
    authorizationServerMetadata,
    protectedResourceMetadata,
    registerClient,
    beginMcpAuthorization,
    continueMcpAuthorization,
    beginPwaLogin,
    handleGitHubCallback,
    exchangeToken,
    verifyAccessToken,
    verifyAccessTokenActive,
    verifySessionToken,
    verifySessionTokenActive,
    revokeSessionToken,
    consumeRateLimit,
    wwwAuthenticate,
  });
}
