import assert from "node:assert/strict";
import test from "node:test";

import {
  OAuthReplayStoreError,
  createMemoryOAuthReplayStore,
  createOAuthReplayStore,
  createUpstashOAuthReplayStore,
} from "../services/mcp-gateway/src/oauth-replay-store.mjs";

const ID = "a".repeat(22);

test("memory replay store atomically claims, compares, expires, and revokes", async () => {
  const nowRef = { value: 1_800_000_000 };
  const store = createMemoryOAuthReplayStore({ now: () => nowRef.value });

  assert.deepEqual(await store.claim("code", ID, "processing", 10), { claimed: true, existing: null });
  assert.deepEqual(await store.claim("code", ID, "processing", 10), { claimed: false, existing: "processing" });
  assert.equal(await store.compareAndSet("code", ID, "wrong", "issued:test", 10), false);
  assert.equal(await store.compareAndSet("code", ID, "processing", "issued:test", 10), true);
  assert.equal(await store.get("code", ID), "issued:test");

  await store.put("revoked", ID, "revoked", 2);
  assert.equal(await store.get("revoked", ID), "revoked");
  nowRef.value += 3;
  assert.equal(await store.get("revoked", ID), null);
  assert.equal(await store.increment("rate-limit", ID, 10), 1);
  assert.equal(await store.increment("rate-limit", ID, 10), 2);
  nowRef.value += 11;
  assert.equal(await store.increment("rate-limit", ID, 10), 1);
  await store.remove("code", ID);
  assert.equal(await store.get("code", ID), null);
});

test("memory replay store caps live keys and sweeps expired keys before refusing writes", async () => {
  const nowRef = { value: 1_800_000_000 };
  const store = createMemoryOAuthReplayStore({
    now: () => nowRef.value,
    maxEntries: 2,
  });
  const firstId = "A".repeat(22);
  const secondId = "B".repeat(22);
  const thirdId = "C".repeat(22);

  await store.put("state", firstId, "active", 30);
  await store.put("state", secondId, "active", 300);
  await assert.rejects(
    () => store.put("state", thirdId, "active", 300),
    (error) => error instanceof OAuthReplayStoreError && error.reason === "unavailable",
  );

  nowRef.value += 31;
  await store.put("state", thirdId, "active", 300);
  assert.equal(await store.get("state", firstId), null);
  assert.equal(await store.get("state", thirdId), "active");
});

test("Upstash replay store uses authenticated bounded REST commands and atomic Redis operations", async () => {
  const entries = new Map();
  const calls = [];
  const fetchImpl = async (_input, init) => {
    assert.equal(init.method, "POST");
    assert.equal(init.redirect, "error");
    assert.equal(init.cache, "no-store");
    assert.ok(init.signal instanceof AbortSignal);
    assert.equal(init.headers.Authorization, "Bearer upstash-unit-test-token");
    const command = JSON.parse(init.body);
    calls.push(command);
    const [name, key, value] = command;
    let result;
    if (name === "SET" && command.includes("NX")) {
      if (entries.has(key)) result = null;
      else {
        entries.set(key, value);
        result = "OK";
      }
    } else if (name === "SET") {
      entries.set(key, value);
      result = "OK";
    } else if (name === "GET") {
      result = entries.get(key) ?? null;
    } else if (name === "DEL") {
      result = entries.delete(key) ? 1 : 0;
    } else if (name === "EVAL" && String(command[1]).includes("INCR")) {
      const redisKey = command[3];
      const count = Number(entries.get(redisKey) ?? 0) + 1;
      entries.set(redisKey, String(count));
      result = count;
    } else if (name === "EVAL") {
      const redisKey = command[3];
      const expected = command[4];
      const next = command[5];
      if (entries.get(redisKey) === expected) {
        entries.set(redisKey, next);
        result = 1;
      } else {
        result = 0;
      }
    } else {
      throw new Error(`Unexpected Redis command: ${name}`);
    }
    return Response.json({ result });
  };
  const store = createUpstashOAuthReplayStore({
    restUrl: "https://example-unit-test.upstash.io",
    restToken: "upstash-unit-test-token",
    issuer: "https://dex.example.test",
    fetchImpl,
  });

  assert.deepEqual(await store.claim("callback", ID, "used", 30), { claimed: true, existing: null });
  assert.deepEqual(await store.claim("callback", ID, "used", 30), { claimed: false, existing: "used" });
  assert.equal(await store.compareAndSet("callback", ID, "used", "replayed", 30), true);
  assert.equal(await store.get("callback", ID), "replayed");
  await store.put("revoked", ID, "revoked", 30);
  assert.equal(await store.increment("rate-limit", ID, 30), 1);
  assert.equal(await store.increment("rate-limit", ID, 30), 2);
  await store.remove("revoked", ID);
  assert.ok(calls.some((command) => command[0] === "SET" && command.includes("NX")));
  assert.ok(calls.some((command) => command[0] === "EVAL" && String(command[1]).includes("INCR")));
  assert.ok(calls.some((command) => command[0] === "DEL"));
  assert.equal(JSON.stringify(calls).includes("upstash-unit-test-token"), false);
});

test("hosted OAuth state fails closed when durable Redis credentials are absent or incomplete", async () => {
  for (const env of [
    { NODE_ENV: "production" },
    { NODE_ENV: "production", DEX_REQUIRE_DURABLE_OAUTH_STATE: "false" },
    { VERCEL_ENV: "preview", UPSTASH_REDIS_REST_URL: "https://example-unit-test.upstash.io" },
    { DEX_REQUIRE_DURABLE_OAUTH_STATE: "true" },
    {
      NODE_ENV: "production",
      UPSTASH_REDIS_REST_URL: "https://direct-unit-test.upstash.io",
      UPSTASH_REDIS_REST_TOKEN: "direct-unit-test-token",
      KV_REST_API_URL: "https://marketplace-unit-test.upstash.io",
      KV_REST_API_TOKEN: "marketplace-unit-test-token",
    },
    {
      NODE_ENV: "production",
      UPSTASH_REDIS_REST_URL: "https://direct-unit-test.upstash.io",
      KV_REST_API_TOKEN: "mixed-unit-test-token",
    },
  ]) {
    const store = createOAuthReplayStore({ env, issuer: "https://dex.example.test" });
    assert.equal(store.configured, false);
    assert.equal(store.mode, "unavailable");
    await assert.rejects(
      () => store.claim("code", ID, "processing", 30),
      (error) => error instanceof OAuthReplayStoreError,
    );
  }
});

test("Vercel Marketplace KV_REST_API aliases configure the same durable replay backend", async () => {
  const calls = [];
  const store = createOAuthReplayStore({
    env: {
      NODE_ENV: "production",
      KV_REST_API_URL: "https://marketplace-unit-test.upstash.io",
      KV_REST_API_TOKEN: "marketplace-unit-test-token",
    },
    issuer: "https://dex.example.test",
    fetchImpl: async (input, init) => {
      calls.push({ input: String(input), init });
      return Response.json({ result: "OK" });
    },
  });
  assert.equal(store.configured, true);
  assert.equal(store.durable, true);
  assert.deepEqual(await store.claim("code", ID, "processing", 30), { claimed: true, existing: null });
  assert.equal(calls[0].input, "https://marketplace-unit-test.upstash.io");
  assert.equal(calls[0].init.headers.Authorization, "Bearer marketplace-unit-test-token");
});

test("Upstash replay store rejects redirects and oversized responses without exposing its credential", async () => {
  const credential = "credential-that-must-not-appear-in-errors";
  const store = createUpstashOAuthReplayStore({
    restUrl: "https://example-unit-test.upstash.io",
    restToken: credential,
    fetchImpl: async () => new Response("x".repeat(64 * 1_024 + 1), {
      headers: { "content-type": "application/json" },
    }),
  });
  await assert.rejects(
    () => store.get("code", ID),
    (error) => error instanceof OAuthReplayStoreError && !error.message.includes(credential),
  );
});
