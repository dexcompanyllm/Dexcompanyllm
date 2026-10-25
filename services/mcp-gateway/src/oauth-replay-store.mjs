import { createHash } from "node:crypto";

const DEFAULT_TIMEOUT_MS = 5_000;
const MAX_RESPONSE_BYTES = 64 * 1_024;
const MAX_TTL_SECONDS = 31 * 24 * 60 * 60;
const DEFAULT_MEMORY_MAX_ENTRIES = 10_000;
const NAMESPACE_PATTERN = /^[a-z][a-z0-9-]{0,31}$/;
const ID_PATTERN = /^[A-Za-z0-9_-]{22,128}$/;
const VALUE_PATTERN = /^[A-Za-z0-9:._-]{1,256}$/;

export class OAuthReplayStoreError extends Error {
  constructor(message, reason = "unavailable", options = {}) {
    super(message, options);
    this.name = "OAuthReplayStoreError";
    this.reason = reason;
  }
}

function envFlag(value, fallback = false) {
  if (value === undefined || value === null || value === "") return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (["1", "true", "yes", "on"].includes(normalized)) return true;
  if (["0", "false", "no", "off"].includes(normalized)) return false;
  throw new OAuthReplayStoreError("The durable OAuth state requirement flag is invalid.", "configuration");
}

function positiveInteger(value, fallback, name, { max = Number.MAX_SAFE_INTEGER } = {}) {
  const candidate = value === undefined ? fallback : Number(value);
  if (!Number.isSafeInteger(candidate) || candidate <= 0 || candidate > max) {
    throw new OAuthReplayStoreError(`${name} is invalid.`, "configuration");
  }
  return candidate;
}

function normalizeRedisUrl(value) {
  let url;
  try {
    url = new URL(String(value ?? "").trim());
  } catch {
    throw new OAuthReplayStoreError("UPSTASH_REDIS_REST_URL is invalid.", "configuration");
  }
  if (url.protocol !== "https:" || url.username || url.password || url.search || url.hash) {
    throw new OAuthReplayStoreError("UPSTASH_REDIS_REST_URL must be an HTTPS URL without credentials, query, or fragment.", "configuration");
  }
  return url.href.replace(/\/+$/, "");
}

function validateToken(value) {
  const token = String(value ?? "").trim();
  if (!token || token.length > 4_096 || /[\u0000-\u001f\u007f]/.test(token)) {
    throw new OAuthReplayStoreError("UPSTASH_REDIS_REST_TOKEN is invalid.", "configuration");
  }
  return token;
}

function validatePart(value, pattern, name) {
  const normalized = String(value ?? "");
  if (!pattern.test(normalized)) {
    throw new OAuthReplayStoreError(`${name} is invalid.`, "configuration");
  }
  return normalized;
}

function validateTtl(value) {
  return positiveInteger(value, undefined, "OAuth replay-store TTL", { max: MAX_TTL_SECONDS });
}

async function readBoundedJson(response) {
  const contentLength = Number(response?.headers?.get?.("content-length"));
  if (Number.isFinite(contentLength) && contentLength > MAX_RESPONSE_BYTES) {
    throw new OAuthReplayStoreError("The OAuth replay store returned an oversized response.");
  }

  let body;
  if (response?.body?.getReader) {
    const reader = response.body.getReader();
    const chunks = [];
    let length = 0;
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        length += value.byteLength;
        if (length > MAX_RESPONSE_BYTES) {
          await reader.cancel();
          throw new OAuthReplayStoreError("The OAuth replay store returned an oversized response.");
        }
        chunks.push(value);
      }
    } finally {
      reader.releaseLock();
    }
    body = Buffer.concat(chunks.map((chunk) => Buffer.from(chunk)), length).toString("utf8");
  } else {
    const bytes = Buffer.from(await response.arrayBuffer());
    if (bytes.length > MAX_RESPONSE_BYTES) {
      throw new OAuthReplayStoreError("The OAuth replay store returned an oversized response.");
    }
    body = bytes.toString("utf8");
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new OAuthReplayStoreError("The OAuth replay store returned an invalid response.");
  }
}

function createUnavailableStore({ required, reason }) {
  const unavailable = async () => {
    throw new OAuthReplayStoreError("Durable OAuth replay protection is not configured.", reason);
  };
  return Object.freeze({
    configured: false,
    durable: false,
    required,
    mode: "unavailable",
    claim: unavailable,
    get: unavailable,
    compareAndSet: unavailable,
    increment: unavailable,
    put: unavailable,
    remove: unavailable,
  });
}

export function createMemoryOAuthReplayStore({
  now = () => Math.floor(Date.now() / 1_000),
  maxEntries = DEFAULT_MEMORY_MAX_ENTRIES,
} = {}) {
  const entries = new Map();
  const entryLimit = positiveInteger(
    maxEntries,
    DEFAULT_MEMORY_MAX_ENTRIES,
    "OAuth memory replay-store entry limit",
    { max: 100_000 },
  );
  let writesSinceSweep = 0;

  function currentTime() {
    const value = Number(now());
    if (!Number.isSafeInteger(value) || value < 0) {
      throw new OAuthReplayStoreError("The OAuth replay-store clock is invalid.", "configuration");
    }
    return value;
  }

  function key(namespace, id) {
    return `${validatePart(namespace, NAMESPACE_PATTERN, "OAuth replay-store namespace")}:${validatePart(id, ID_PATTERN, "OAuth replay-store id")}`;
  }

  function existing(keyValue) {
    const entry = entries.get(keyValue);
    if (entry && entry.expiresAt > currentTime()) return entry;
    if (entry) entries.delete(keyValue);
    return null;
  }

  function sweepExpired() {
    const timestamp = currentTime();
    for (const [keyValue, entry] of entries) {
      if (entry.expiresAt <= timestamp) entries.delete(keyValue);
    }
  }

  function assertWriteCapacity(keyValue) {
    writesSinceSweep += 1;
    if (writesSinceSweep >= 128 || entries.size >= entryLimit) {
      sweepExpired();
      writesSinceSweep = 0;
    }
    if (!entries.has(keyValue) && entries.size >= entryLimit) {
      throw new OAuthReplayStoreError("The OAuth memory replay store reached its entry limit.");
    }
  }

  return Object.freeze({
    configured: true,
    durable: false,
    required: false,
    mode: "memory",
    async claim(namespace, id, value, ttlSeconds) {
      const keyValue = key(namespace, id);
      const normalizedValue = validatePart(value, VALUE_PATTERN, "OAuth replay-store value");
      const ttl = validateTtl(ttlSeconds);
      const prior = existing(keyValue);
      if (prior) return { claimed: false, existing: prior.value };
      assertWriteCapacity(keyValue);
      entries.set(keyValue, { value: normalizedValue, expiresAt: currentTime() + ttl });
      return { claimed: true, existing: null };
    },
    async get(namespace, id) {
      return existing(key(namespace, id))?.value ?? null;
    },
    async compareAndSet(namespace, id, expectedValue, nextValue, ttlSeconds) {
      const keyValue = key(namespace, id);
      const expected = validatePart(expectedValue, VALUE_PATTERN, "OAuth replay-store expected value");
      const next = validatePart(nextValue, VALUE_PATTERN, "OAuth replay-store next value");
      const ttl = validateTtl(ttlSeconds);
      const prior = existing(keyValue);
      if (!prior || prior.value !== expected) return false;
      entries.set(keyValue, { value: next, expiresAt: currentTime() + ttl });
      return true;
    },
    async increment(namespace, id, ttlSeconds) {
      const keyValue = key(namespace, id);
      const ttl = validateTtl(ttlSeconds);
      const prior = existing(keyValue);
      const count = prior ? Number(prior.value) + 1 : 1;
      if (!Number.isSafeInteger(count) || count <= 0) {
        throw new OAuthReplayStoreError("The OAuth replay-store counter is invalid.");
      }
      assertWriteCapacity(keyValue);
      entries.set(keyValue, {
        value: String(count),
        expiresAt: prior?.expiresAt ?? (currentTime() + ttl),
      });
      return count;
    },
    async put(namespace, id, value, ttlSeconds) {
      const keyValue = key(namespace, id);
      const normalizedValue = validatePart(value, VALUE_PATTERN, "OAuth replay-store value");
      const ttl = validateTtl(ttlSeconds);
      assertWriteCapacity(keyValue);
      entries.set(keyValue, { value: normalizedValue, expiresAt: currentTime() + ttl });
    },
    async remove(namespace, id) {
      entries.delete(key(namespace, id));
    },
  });
}

export function createUpstashOAuthReplayStore({
  restUrl,
  restToken,
  issuer = "dex-company",
  fetchImpl = globalThis.fetch,
  timeoutMs = DEFAULT_TIMEOUT_MS,
} = {}) {
  const url = normalizeRedisUrl(restUrl);
  const token = validateToken(restToken);
  if (typeof fetchImpl !== "function") {
    throw new OAuthReplayStoreError("A fetch implementation is required for the OAuth replay store.", "configuration");
  }
  const requestTimeoutMs = positiveInteger(timeoutMs, DEFAULT_TIMEOUT_MS, "OAuth replay-store request timeout", { max: 30_000 });
  const prefix = `dex:oauth:${createHash("sha256").update(String(issuer), "utf8").digest("hex").slice(0, 20)}`;

  function key(namespace, id) {
    return `${prefix}:${validatePart(namespace, NAMESPACE_PATTERN, "OAuth replay-store namespace")}:${validatePart(id, ID_PATTERN, "OAuth replay-store id")}`;
  }

  async function command(parts) {
    let response;
    try {
      response = await fetchImpl(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parts),
        redirect: "error",
        cache: "no-store",
        signal: AbortSignal.timeout(requestTimeoutMs),
      });
    } catch (error) {
      throw new OAuthReplayStoreError("The OAuth replay store is temporarily unavailable.", "unavailable", { cause: error });
    }
    if (!response || typeof response.ok !== "boolean" || !Number.isInteger(response.status) || typeof response.arrayBuffer !== "function") {
      throw new OAuthReplayStoreError("The OAuth replay store returned an invalid response.");
    }
    let payload;
    try {
      payload = await readBoundedJson(response);
    } catch (error) {
      if (error instanceof OAuthReplayStoreError) throw error;
      throw new OAuthReplayStoreError("The OAuth replay store returned an invalid response.", "unavailable", { cause: error });
    }
    if (!response.ok || payload?.error || !Object.hasOwn(payload ?? {}, "result")) {
      throw new OAuthReplayStoreError("The OAuth replay store rejected the request.");
    }
    return payload.result;
  }

  return Object.freeze({
    configured: true,
    durable: true,
    required: true,
    mode: "upstash-redis-rest",
    async claim(namespace, id, value, ttlSeconds) {
      const keyValue = key(namespace, id);
      const normalizedValue = validatePart(value, VALUE_PATTERN, "OAuth replay-store value");
      const ttl = validateTtl(ttlSeconds);
      const result = await command(["SET", keyValue, normalizedValue, "NX", "EX", String(ttl)]);
      if (result === "OK") return { claimed: true, existing: null };
      if (result !== null) throw new OAuthReplayStoreError("The OAuth replay store returned an unexpected claim result.");
      const existing = await command(["GET", keyValue]);
      return { claimed: false, existing: typeof existing === "string" ? existing : null };
    },
    async get(namespace, id) {
      const result = await command(["GET", key(namespace, id)]);
      if (result !== null && typeof result !== "string") {
        throw new OAuthReplayStoreError("The OAuth replay store returned an unexpected value.");
      }
      return result;
    },
    async compareAndSet(namespace, id, expectedValue, nextValue, ttlSeconds) {
      const expected = validatePart(expectedValue, VALUE_PATTERN, "OAuth replay-store expected value");
      const next = validatePart(nextValue, VALUE_PATTERN, "OAuth replay-store next value");
      const ttl = validateTtl(ttlSeconds);
      const script = 'if redis.call("GET", KEYS[1]) == ARGV[1] then redis.call("SET", KEYS[1], ARGV[2], "EX", ARGV[3]); return 1 else return 0 end';
      const result = await command(["EVAL", script, "1", key(namespace, id), expected, next, String(ttl)]);
      if (result !== 0 && result !== 1) {
        throw new OAuthReplayStoreError("The OAuth replay store returned an unexpected compare-and-set result.");
      }
      return result === 1;
    },
    async increment(namespace, id, ttlSeconds) {
      const ttl = validateTtl(ttlSeconds);
      const script = 'local current = redis.call("INCR", KEYS[1]); if current == 1 then redis.call("EXPIRE", KEYS[1], ARGV[1]); end; return current';
      const result = await command(["EVAL", script, "1", key(namespace, id), String(ttl)]);
      if (!Number.isSafeInteger(result) || result <= 0) {
        throw new OAuthReplayStoreError("The OAuth replay store returned an unexpected counter result.");
      }
      return result;
    },
    async put(namespace, id, value, ttlSeconds) {
      const result = await command([
        "SET",
        key(namespace, id),
        validatePart(value, VALUE_PATTERN, "OAuth replay-store value"),
        "EX",
        String(validateTtl(ttlSeconds)),
      ]);
      if (result !== "OK") throw new OAuthReplayStoreError("The OAuth replay store returned an unexpected write result.");
    },
    async remove(namespace, id) {
      const result = await command(["DEL", key(namespace, id)]);
      if (result !== 0 && result !== 1) throw new OAuthReplayStoreError("The OAuth replay store returned an unexpected delete result.");
    },
  });
}

export function createOAuthReplayStore({
  env = process.env,
  issuer,
  fetchImpl = globalThis.fetch,
  now,
} = {}) {
  const hosted = env.NODE_ENV === "production" || Boolean(env.VERCEL_ENV);
  const required = hosted || envFlag(
    env.DEX_REQUIRE_DURABLE_OAUTH_STATE,
    false,
  );
  const restUrl = String(env.UPSTASH_REDIS_REST_URL ?? "").trim();
  const restToken = String(env.UPSTASH_REDIS_REST_TOKEN ?? "").trim();
  const kvUrl = String(env.KV_REST_API_URL ?? "").trim();
  const kvToken = String(env.KV_REST_API_TOKEN ?? "").trim();
  const hasUpstashConfig = Boolean(restUrl || restToken);
  const hasKvConfig = Boolean(kvUrl || kvToken);

  if (hasUpstashConfig && hasKvConfig) {
    return createUnavailableStore({ required, reason: "configuration" });
  }
  if (hasUpstashConfig || hasKvConfig) {
    const selectedUrl = hasUpstashConfig ? restUrl : kvUrl;
    const selectedToken = hasUpstashConfig ? restToken : kvToken;
    if (!selectedUrl || !selectedToken) return createUnavailableStore({ required, reason: "configuration" });
    try {
      return createUpstashOAuthReplayStore({ restUrl: selectedUrl, restToken: selectedToken, issuer, fetchImpl });
    } catch (error) {
      if (error instanceof OAuthReplayStoreError) return createUnavailableStore({ required, reason: error.reason });
      throw error;
    }
  }
  if (required) return createUnavailableStore({ required, reason: "configuration" });
  return createMemoryOAuthReplayStore({ now });
}
