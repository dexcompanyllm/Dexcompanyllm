import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { envFlag, writePolicy } from "../packages/core/src/policy.mjs";

function withEnv(name, value, fn) {
  const previous = process.env[name];
  if (value === undefined) delete process.env[name];
  else process.env[name] = value;
  try {
    return fn();
  } finally {
    if (previous === undefined) delete process.env[name];
    else process.env[name] = previous;
  }
}

test("envFlag accepts only explicit boolean spellings and preserves boolean defaults", () => {
  const name = "DEX_TEST_BOOLEAN_FLAG";
  for (const value of ["true", "1", "yes", "on", " TRUE ", "On"]) {
    withEnv(name, value, () => assert.equal(envFlag(name, false), true));
  }
  for (const value of ["false", "0", "no", "off", "", "   ", " FALSE ", "Off"]) {
    withEnv(name, value, () => assert.equal(envFlag(name, true), false));
  }
  withEnv(name, undefined, () => {
    assert.equal(envFlag(name), false);
    assert.equal(envFlag(name, true), true);
    assert.throws(() => envFlag(name, "false"), /fallback.*boolean/i);
  });
});

test("security-sensitive flag typos fail closed with a configuration error", () => {
  const names = [
    "DEX_ENABLE_PWA_WRITES",
    "DEX_ENABLE_MCP_WRITES",
    "DEX_ALLOW_LEGACY_APP_TOKEN",
    "DEX_ALLOW_STATIC_MCP_BEARER",
    "DEX_ALLOW_UNAUTHENTICATED_APP",
    "DEX_ALLOW_UNAUTHENTICATED_MCP",
    "DEX_OPENAI_SUBSCRIPTION_READY",
    "DEX_SUBSCRIPTION_ONLY",
  ];
  for (const name of names) {
    withEnv(name, "treu", () => {
      assert.throws(
        () => envFlag(name, false),
        error => error instanceof Error && error.message.includes(name) && !error.message.includes("treu"),
      );
    });
  }
});

test("write policy remains disabled when write flags are unset or explicitly false", () => {
  withEnv("DEX_ENABLE_PWA_WRITES", undefined, () => withEnv("DEX_ENABLE_MCP_WRITES", undefined, () => {
    assert.deepEqual(writePolicy(), {
      pwaEnabled: false,
      mcpEnabled: false,
      paidApiAllowed: false,
      automaticPaidFallback: false,
    });
  }));
  withEnv("DEX_ENABLE_PWA_WRITES", "no", () => withEnv("DEX_ENABLE_MCP_WRITES", "0", () => {
    assert.equal(writePolicy().pwaEnabled, false);
    assert.equal(writePolicy().mcpEnabled, false);
  }));
});

test("Claude remote MCP capability remains read-only", () => {
  const capabilities = JSON.parse(
    fs.readFileSync(new URL("../config/platform-capabilities.json", import.meta.url), "utf8"),
  );
  const claude = capabilities.platforms?.["claude-remote-mcp"];

  assert.ok(claude, "claude-remote-mcp capability must be declared");
  assert.equal(claude.mcpRead, true);
  assert.equal(claude.mcpWrite, false);
});
