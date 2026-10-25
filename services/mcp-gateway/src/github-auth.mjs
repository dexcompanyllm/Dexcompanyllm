import { createPrivateKey } from "node:crypto";
import { request as octokitRequest } from "@octokit/request";

export const GITHUB_API_VERSION = "2026-03-10";

const GITHUB_INSTALLATION_REQUEST_TIMEOUT_MS = 8_000;
const GITHUB_INSTALLATION_RESPONSE_MAX_BYTES = 2 * 1024 * 1024;
const TRUE_VALUES = new Set(["1", "true", "yes", "on"]);
const FALSE_VALUES = new Set(["", "0", "false", "no", "off"]);
const PRIVATE_KEY_PATTERN = /^-----BEGIN (RSA PRIVATE KEY|PRIVATE KEY)-----\r?\n[\s\S]+\r?\n-----END \1-----\r?\n?$/;
const REPOSITORY_OWNER_PATTERN = /^(?=.{1,39}$)[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?$/;
const REPOSITORY_NAME_PATTERN = /^[A-Za-z0-9._-]{1,100}$/;

function authError(code, message, status = 500) {
  const error = new Error(message);
  error.code = code;
  error.status = status;
  error.source = "github";
  return error;
}

function boundedPositiveInteger(value, ceiling) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return ceiling;
  return Math.min(parsed, ceiling);
}

function transportErrorInChain(error) {
  const seen = new Set();
  let current = error;
  for (let depth = 0; current && depth < 8 && !seen.has(current); depth += 1) {
    seen.add(current);
    if (
      current.code === "GITHUB_INSTALLATION_TOKEN_TIMEOUT"
      || current.code === "GITHUB_INSTALLATION_TOKEN_RESPONSE_TOO_LARGE"
      || current.code === "GITHUB_INSTALLATION_TOKEN_INVALID_RESPONSE"
    ) {
      return current;
    }
    current = current.cause;
  }
  return null;
}

async function readBoundedResponseBytes(response, maxBytes) {
  const contentLength = response?.headers?.get?.("content-length");
  if (contentLength !== null && contentLength !== undefined) {
    const normalized = String(contentLength).trim();
    if (!/^\d+$/.test(normalized)) {
      throw authError(
        "GITHUB_INSTALLATION_TOKEN_INVALID_RESPONSE",
        "GitHub App installation authentication returned an invalid response.",
        502,
      );
    }
    const declaredBytes = Number(normalized);
    if (!Number.isSafeInteger(declaredBytes) || declaredBytes > maxBytes) {
      throw authError(
        "GITHUB_INSTALLATION_TOKEN_RESPONSE_TOO_LARGE",
        "GitHub App installation authentication exceeded the allowed response size.",
        502,
      );
    }
  }

  if (!response?.body) return Buffer.alloc(0);
  if (typeof response.body.getReader !== "function") {
    throw authError(
      "GITHUB_INSTALLATION_TOKEN_INVALID_RESPONSE",
      "GitHub App installation authentication returned an invalid response.",
      502,
    );
  }

  const reader = response.body.getReader();
  const chunks = [];
  let receivedBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = Buffer.from(value);
      receivedBytes += chunk.byteLength;
      if (receivedBytes > maxBytes) {
        await reader.cancel().catch(() => {});
        throw authError(
          "GITHUB_INSTALLATION_TOKEN_RESPONSE_TOO_LARGE",
          "GitHub App installation authentication exceeded the allowed response size.",
          502,
        );
      }
      chunks.push(chunk);
    }
  } finally {
    reader.releaseLock?.();
  }
  return Buffer.concat(chunks, receivedBytes);
}

function createBoundedInstallationFetch({ fetchImpl, requestTimeoutMs, maxResponseBytes }) {
  return async (url, init = {}) => {
    if (typeof fetchImpl !== "function") {
      throw authError(
        "GITHUB_INSTALLATION_TOKEN_FAILED",
        "GitHub App installation token could not be acquired.",
        502,
      );
    }

    const controller = new AbortController();
    const signals = [controller.signal];
    if (init.signal) signals.push(init.signal);
    const signal = signals.length === 1 ? controller.signal : AbortSignal.any(signals);
    let timeout;
    const timeoutFailure = new Promise((_, reject) => {
      timeout = setTimeout(() => {
        controller.abort();
        reject(authError(
          "GITHUB_INSTALLATION_TOKEN_TIMEOUT",
          "GitHub App installation authentication timed out.",
          504,
        ));
      }, requestTimeoutMs);
      timeout.unref?.();
    });

    const operation = (async () => {
      const response = await fetchImpl(url, {
        ...init,
        redirect: "error",
        signal,
      });
      if (!response || !Number.isInteger(response.status) || !response.headers) {
        throw authError(
          "GITHUB_INSTALLATION_TOKEN_INVALID_RESPONSE",
          "GitHub App installation authentication returned an invalid response.",
          502,
        );
      }
      const bytes = await readBoundedResponseBytes(response, maxResponseBytes);
      return new Response(
        response.status === 204 || response.status === 205 ? null : bytes,
        {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
        },
      );
    })();

    try {
      return await Promise.race([operation, timeoutFailure]);
    } finally {
      clearTimeout(timeout);
    }
  };
}

function isEnabled(value) {
  return TRUE_VALUES.has(String(value ?? "").trim().toLowerCase());
}

function securityFlag(env, name) {
  const normalized = String(env[name] ?? "").trim().toLowerCase();
  if (TRUE_VALUES.has(normalized)) return true;
  if (FALSE_VALUES.has(normalized)) return false;
  throw authError(
    "GITHUB_SECURITY_FLAG_INVALID",
    `${name} must be true, false, 1, 0, yes, no, on, off, or empty.`,
  );
}

function isHostedRuntime(env) {
  return env.NODE_ENV === "production" || Boolean(env.VERCEL_ENV) || isEnabled(env.VERCEL);
}

function validPositiveInteger(value) {
  if (!/^[1-9]\d*$/.test(String(value ?? ""))) return false;
  return Number.isSafeInteger(Number(value));
}

function parseRepository(value) {
  const candidate = String(value ?? "").trim();
  const parts = candidate.split("/");
  if (
    parts.length !== 2
    || !REPOSITORY_OWNER_PATTERN.test(parts[0])
    || !REPOSITORY_NAME_PATTERN.test(parts[1])
    || parts[1] === "."
    || parts[1] === ".."
  ) {
    throw authError("GITHUB_REPO_INVALID", "GITHUB_REPO must use a valid owner/repo format.");
  }
  return { owner: parts[0], name: parts[1], fullName: candidate };
}

function hasOwn(object, key) {
  return Object.prototype.hasOwnProperty.call(object, key);
}

function sameRepositoryName(left, right) {
  return String(left).toLowerCase() === String(right).toLowerCase();
}

function invalidInstallationScope() {
  return authError(
    "GITHUB_INSTALLATION_TOKEN_SCOPE_INVALID",
    "GitHub App installation authentication returned a scope outside the configured repository or permissions.",
    502,
  );
}

function assertPermissionCeiling(authentication, requiredPermissions) {
  if (!hasOwn(authentication, "permissions")) throw invalidInstallationScope();
  const permissions = authentication.permissions;
  if (!permissions || typeof permissions !== "object" || Array.isArray(permissions)) {
    throw invalidInstallationScope();
  }

  for (const [permission, access] of Object.entries(permissions)) {
    const ceiling = requiredPermissions[permission];
    if (!ceiling || !["read", "write"].includes(access)) throw invalidInstallationScope();
    if (ceiling === "read" && access !== "read") throw invalidInstallationScope();
  }
  for (const [permission, access] of Object.entries(requiredPermissions)) {
    // GitHub's official installation-token response example omits the
    // implicit read-only metadata permission even when the request includes it.
    if (permission === "metadata" && !hasOwn(permissions, permission)) continue;
    if (!hasOwn(permissions, permission) || permissions[permission] !== access) {
      throw invalidInstallationScope();
    }
  }
}

function assertRepositoryNames(repositoryNames, repository) {
  if (
    !Array.isArray(repositoryNames)
    || repositoryNames.length !== 1
    || !sameRepositoryName(repositoryNames[0], repository.name)
  ) {
    throw invalidInstallationScope();
  }
}

function assertRepositoryIds(repositoryIds) {
  if (!Array.isArray(repositoryIds) || repositoryIds.length !== 1) throw invalidInstallationScope();
  const [repositoryId] = repositoryIds;
  if (typeof repositoryId === "bigint") {
    if (repositoryId <= 0n) throw invalidInstallationScope();
    return;
  }
  if (!Number.isSafeInteger(repositoryId) || repositoryId <= 0) throw invalidInstallationScope();
}

function assertRawRepositories(repositories, repository) {
  if (!Array.isArray(repositories) || repositories.length !== 1) throw invalidInstallationScope();
  const [returned] = repositories;
  if (typeof returned === "string") {
    if (
      !sameRepositoryName(returned, repository.name)
      && !sameRepositoryName(returned, repository.fullName)
    ) {
      throw invalidInstallationScope();
    }
    return;
  }
  if (!returned || typeof returned !== "object" || Array.isArray(returned)) {
    throw invalidInstallationScope();
  }
  if (hasOwn(returned, "name") && !sameRepositoryName(returned.name, repository.name)) {
    throw invalidInstallationScope();
  }
  if (hasOwn(returned, "full_name") && !sameRepositoryName(returned.full_name, repository.fullName)) {
    throw invalidInstallationScope();
  }
  if (hasOwn(returned, "fullName") && !sameRepositoryName(returned.fullName, repository.fullName)) {
    throw invalidInstallationScope();
  }
  const returnedOwner = returned.owner?.login ?? returned.owner?.name;
  if (returnedOwner !== undefined && !sameRepositoryName(returnedOwner, repository.owner)) {
    throw invalidInstallationScope();
  }
  if (!hasOwn(returned, "name") && !hasOwn(returned, "full_name") && !hasOwn(returned, "fullName")) {
    throw invalidInstallationScope();
  }
}

function assertInstallationScope(authentication, repository, requiredPermissions) {
  let hasRepositorySelection = false;
  for (const key of ["repositorySelection", "repository_selection"]) {
    if (hasOwn(authentication, key)) {
      hasRepositorySelection = true;
      if (authentication[key] !== "selected") throw invalidInstallationScope();
    }
  }
  if (!hasRepositorySelection) throw invalidInstallationScope();

  let hasRepositoryIdentity = false;
  for (const key of ["repositoryNames", "repository_names"]) {
    if (hasOwn(authentication, key)) {
      hasRepositoryIdentity = true;
      assertRepositoryNames(authentication[key], repository);
    }
  }
  if (hasOwn(authentication, "repositoryIds")) assertRepositoryIds(authentication.repositoryIds);
  if (hasOwn(authentication, "repository_ids")) assertRepositoryIds(authentication.repository_ids);
  if (hasOwn(authentication, "repositories")) {
    hasRepositoryIdentity = true;
    assertRawRepositories(authentication.repositories, repository);
  }
  if (!hasRepositoryIdentity) throw invalidInstallationScope();
  assertPermissionCeiling(authentication, requiredPermissions);
}

function validInstallationToken(value) {
  return typeof value === "string" && value.length >= 1 && value.length <= 1_024 && /^[\x21-\x7e]+$/.test(value);
}

export function redactGitHubMessage(value, secrets = []) {
  let message = String(value ?? "Unknown GitHub error");
  for (const secret of [...secrets].filter(Boolean).sort((left, right) => right.length - left.length)) {
    message = message.split(String(secret)).join("[REDACTED]");
  }
  message = message
    .replace(/-----BEGIN (?:RSA )?PRIVATE KEY-----[\s\S]*?-----END (?:RSA )?PRIVATE KEY-----/g, "[REDACTED PRIVATE KEY]")
    .replace(/\b(?:github_pat_|gh[pousr]_|ghs_)[A-Za-z0-9_]+\b/g, "[REDACTED TOKEN]")
    .replace(/\bBearer\s+[^\s,;]+/gi, "Bearer [REDACTED]")
    .replace(/\beyJ[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\.[A-Za-z0-9_-]+\b/g, "[REDACTED JWT]");
  return message.slice(0, 300) || "Unknown GitHub error";
}

export function decodeGitHubAppPrivateKey(value) {
  const encoded = String(value ?? "").trim();
  const normalized = encoded.replace(/=+$/, "");
  if (!encoded || !/^[A-Za-z0-9+/]+={0,2}$/.test(encoded)) {
    throw authError(
      "GITHUB_APP_PRIVATE_KEY_INVALID",
      "GITHUB_APP_PRIVATE_KEY_B64 must contain a valid base64-encoded PEM private key.",
    );
  }

  let decoded;
  try {
    const bytes = Buffer.from(encoded, "base64");
    if (!bytes.length || bytes.toString("base64").replace(/=+$/, "") !== normalized) throw new Error("Invalid base64");
    decoded = new TextDecoder("utf-8", { fatal: true }).decode(bytes);
  } catch {
    throw authError(
      "GITHUB_APP_PRIVATE_KEY_INVALID",
      "GITHUB_APP_PRIVATE_KEY_B64 must contain a valid base64-encoded PEM private key.",
    );
  }

  if (!PRIVATE_KEY_PATTERN.test(decoded)) {
    throw authError(
      "GITHUB_APP_PRIVATE_KEY_INVALID",
      "GITHUB_APP_PRIVATE_KEY_B64 must decode to a valid PEM private key.",
    );
  }

  try {
    const privateKey = createPrivateKey(decoded);
    if (privateKey.asymmetricKeyType !== "rsa") throw new Error("GitHub App keys must be RSA");
  } catch {
    throw authError(
      "GITHUB_APP_PRIVATE_KEY_INVALID",
      "GITHUB_APP_PRIVATE_KEY_B64 must decode to a valid PEM private key.",
    );
  }
  return decoded;
}

async function importCreateAppAuth() {
  const module = await import("@octokit/auth-app");
  if (typeof module.createAppAuth !== "function") {
    throw authError("GITHUB_AUTH_LIBRARY_INVALID", "GitHub App authentication library is unavailable.");
  }
  return module.createAppAuth;
}

export function createGitHubAuth({
  env = process.env,
  createAppAuth,
  fetchImpl = globalThis.fetch,
  requestTimeoutMs = GITHUB_INSTALLATION_REQUEST_TIMEOUT_MS,
  maxResponseBytes = GITHUB_INSTALLATION_RESPONSE_MAX_BYTES,
} = {}) {
  const appId = String(env.GITHUB_APP_ID ?? "").trim();
  const installationIdValue = String(env.GITHUB_APP_INSTALLATION_ID ?? "").trim();
  const privateKeyB64 = String(env.GITHUB_APP_PRIVATE_KEY_B64 ?? "").trim();
  const repositoryValue = String(env.GITHUB_REPO ?? "").trim();
  const fallbackToken = String(env.GITHUB_TOKEN ?? "").trim();
  const appValues = [appId, installationIdValue, privateKeyB64];
  const hasAnyAppConfiguration = appValues.some(Boolean);
  const hasCompleteAppConfiguration = appValues.every(Boolean);
  const allowLocalFallback = securityFlag(env, "DEX_ALLOW_GITHUB_TOKEN_FALLBACK") && !isHostedRuntime(env);
  const pwaWritesEnabled = securityFlag(env, "DEX_ENABLE_PWA_WRITES");
  const mcpWritesEnabled = securityFlag(env, "DEX_ENABLE_MCP_WRITES");
  const boundedRequestTimeoutMs = boundedPositiveInteger(
    requestTimeoutMs,
    GITHUB_INSTALLATION_REQUEST_TIMEOUT_MS,
  );
  const boundedMaxResponseBytes = boundedPositiveInteger(
    maxResponseBytes,
    GITHUB_INSTALLATION_RESPONSE_MAX_BYTES,
  );

  let mode = "unconfigured";
  let configurationError = null;
  let privateKey = null;
  let installationId = null;
  let repository = null;

  if (hasCompleteAppConfiguration) {
    if (!validPositiveInteger(appId)) {
      configurationError = authError("GITHUB_APP_ID_INVALID", "GITHUB_APP_ID must be a positive integer.");
    } else if (!validPositiveInteger(installationIdValue)) {
      configurationError = authError(
        "GITHUB_APP_INSTALLATION_ID_INVALID",
        "GITHUB_APP_INSTALLATION_ID must be a positive integer.",
      );
    } else {
      try {
        repository = parseRepository(repositoryValue);
        privateKey = decodeGitHubAppPrivateKey(privateKeyB64);
        installationId = Number(installationIdValue);
        mode = "app";
      } catch (error) {
        configurationError = error;
      }
    }
  } else if (hasAnyAppConfiguration) {
    configurationError = authError(
      "GITHUB_APP_CONFIGURATION_INCOMPLETE",
      "GitHub App configuration is incomplete.",
    );
  } else if (allowLocalFallback && fallbackToken) {
    mode = "token-fallback";
  } else {
    configurationError = authError(
      "GITHUB_APP_CONFIGURATION_MISSING",
      "GitHub App credentials are required on the server.",
    );
  }

  let strategyPromise;
  const requiredPermissions = Object.freeze({
    contents: "read",
    metadata: "read",
    issues: pwaWritesEnabled || mcpWritesEnabled ? "write" : "read",
  });
  const getStrategy = async () => {
    if (!strategyPromise) {
      strategyPromise = (async () => {
        const factory = createAppAuth ?? await importCreateAppAuth();
        if (typeof factory !== "function") {
          throw authError("GITHUB_AUTH_LIBRARY_INVALID", "GitHub App authentication library is unavailable.");
        }
        // @octokit/auth-app owns the installation-token cache and refresh lifecycle.
        const request = octokitRequest.defaults({
          headers: { "x-github-api-version": GITHUB_API_VERSION },
          request: {
            fetch: createBoundedInstallationFetch({
              fetchImpl,
              requestTimeoutMs: boundedRequestTimeoutMs,
              maxResponseBytes: boundedMaxResponseBytes,
            }),
            redirect: "error",
          },
        });
        return factory({ appId, privateKey, installationId, request });
      })();
    }
    return strategyPromise;
  };

  return {
    mode,
    configured: mode !== "unconfigured",
    getConfigurationDiagnostic() {
      if (configurationError) {
        return {
          ok: false,
          status: configurationError.status,
          code: configurationError.code,
          message: configurationError.message,
        };
      }
      if (mode === "token-fallback") {
        return {
          ok: true,
          status: 200,
          code: "GITHUB_TOKEN_FALLBACK_CONFIGURED",
          message: "Explicit local GitHub token fallback is configured.",
        };
      }
      return {
        ok: true,
        status: 200,
        code: "GITHUB_APP_CONFIGURED",
        message: "GitHub App configuration is valid.",
      };
    },
    async getToken() {
      if (configurationError) {
        throw authError(configurationError.code, configurationError.message, configurationError.status);
      }
      if (mode === "token-fallback") return fallbackToken;

      try {
        const strategy = await getStrategy();
        const authentication = await strategy({
          type: "installation",
          installationId,
          repositoryNames: [repository.name],
          permissions: { ...requiredPermissions },
        });
        if (!authentication || !validInstallationToken(authentication.token)) {
          throw authError(
            "GITHUB_INSTALLATION_TOKEN_INVALID_RESPONSE",
            "GitHub App installation authentication returned an invalid response.",
            502,
          );
        }
        assertInstallationScope(authentication, repository, requiredPermissions);
        return authentication.token;
      } catch (error) {
        const transportError = transportErrorInChain(error);
        if (transportError) {
          strategyPromise = undefined;
          throw authError(transportError.code, transportError.message, transportError.status);
        }
        if (error?.code === "GITHUB_INSTALLATION_TOKEN_SCOPE_INVALID") {
          // @octokit/auth-app caches the raw installation response before this
          // application-level scope check. Drop the entire strategy so a cache
          // hit cannot reconstruct trusted-looking metadata for a rejected token.
          strategyPromise = undefined;
          throw error;
        }
        if (String(error?.code ?? "").startsWith("GITHUB_")) throw error;
        throw authError(
          "GITHUB_INSTALLATION_TOKEN_FAILED",
          "GitHub App installation token could not be acquired.",
          Number.isInteger(error?.status) ? error.status : 502,
        );
      }
    },
  };
}
