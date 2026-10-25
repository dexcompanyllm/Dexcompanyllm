import test from "node:test";
import assert from "node:assert/strict";
import { routeTask } from "../services/orchestrator/src/router.mjs";
import { canTransition, assertTransition } from "../packages/core/src/state-machine.mjs";
import { assertSubscriptionOnlyEnvironment, writePolicy } from "../packages/core/src/policy.mjs";

function withEnv(values, fn) {
  const previous = {};
  for (const [key, value] of Object.entries(values)) {
    previous[key] = process.env[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = String(value);
  }
  try { return fn(); }
  finally {
    for (const [key, value] of Object.entries(previous)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
}

test("repository work prefers a ready Codex subscription worker", () => {
  const route = routeTask(
    { routing: { requiredCapabilities: ["edit-repository"], preferredProvider: "auto" }, request: { clientPlatform: "desktop" } },
    { openai: { available: true, subscriptionReady: true }, anthropic: { available: true, subscriptionReady: true } },
  );
  assert.equal(route.selectedProvider, "openai");
  assert.equal(route.selectedSurface, "codex-app-server");
  assert.equal(route.availabilityClass, "local-runner");
  assert.equal(route.costPolicy.paidApiAllowed, false);
});

test("repository work fails over to Claude subscription worker", () => {
  const route = routeTask(
    { routing: { requiredCapabilities: ["run-tests"], preferredProvider: "auto" }, request: { clientPlatform: "mobile-web" } },
    { openai: { available: true, subscriptionReady: false }, anthropic: { available: true, subscriptionReady: true } },
  );
  assert.equal(route.selectedProvider, "anthropic");
  assert.equal(route.selectedSurface, "claude-code");
  assert.equal(route.platformFallback, "pwa");
});

test("repository work is queued when no subscription worker is ready", () => {
  const route = routeTask(
    { routing: { requiredCapabilities: ["debugging"], preferredProvider: "auto" }, request: { clientPlatform: "desktop" } },
    { openai: { available: true, subscriptionReady: false }, anthropic: { available: true, subscriptionReady: false } },
  );
  assert.equal(route.selectedProvider, null);
  assert.equal(route.availabilityClass, "queued");
});

test("task state machine allows only declared transitions", () => {
  assert.equal(canTransition("queued", "resolving-context"), true);
  assert.equal(canTransition("queued", "completed"), false);
  assert.doesNotThrow(() => assertTransition("executing", "verifying"));
  assert.throws(() => assertTransition("completed", "executing"), /Invalid task transition/);
});

test("subscription-only policy blocks paid API credentials", () => {
  withEnv({
    DEX_SUBSCRIPTION_ONLY: "true",
    DEX_ALLOW_PAID_API: "false",
    DEX_AUTOMATIC_PAID_FALLBACK: "false",
    DEX_ALLOW_EXTRA_USAGE: "false",
    OPENAI_API_KEY: undefined,
    ANTHROPIC_API_KEY: undefined,
  }, () => {
    assert.doesNotThrow(() => assertSubscriptionOnlyEnvironment("openai"));
    assert.doesNotThrow(() => assertSubscriptionOnlyEnvironment("anthropic"));
    assert.deepEqual(writePolicy(), {
      pwaEnabled: false,
      mcpEnabled: false,
      paidApiAllowed: false,
      automaticPaidFallback: false,
    });
  });

  withEnv({
    DEX_SUBSCRIPTION_ONLY: "true",
    DEX_ALLOW_PAID_API: "false",
    OPENAI_API_KEY: "present",
  }, () => {
    assert.throws(() => assertSubscriptionOnlyEnvironment("openai"), /paid API credentials/);
  });

  for (const name of [
    "ANTHROPIC_AUTH_TOKEN",
    "ANTHROPIC_BASE_URL",
    "ANTHROPIC_CUSTOM_HEADERS",
    "CLAUDE_CODE_USE_BEDROCK",
    "CLAUDE_CODE_USE_VERTEX",
    "CLAUDE_CODE_USE_FOUNDRY",
    "CLAUDE_CODE_USE_MANTLE",
    "ANTHROPIC_PROFILE",
  ]) {
    withEnv({ [name]: "should-not-leak-value" }, () => {
      assert.throws(
        () => assertSubscriptionOnlyEnvironment("anthropic"),
        error => error instanceof Error
          && error.message.includes(name)
          && !error.message.includes("should-not-leak-value"),
      );
    });
  }

  withEnv({ Anthropic_Auth_Token: "mixed-case-secret" }, () => {
    assert.throws(
      () => assertSubscriptionOnlyEnvironment("anthropic"),
      error => error instanceof Error
        && error.message.includes("Anthropic_Auth_Token")
        && !error.message.includes("mixed-case-secret"),
    );
  });

  withEnv({ Anthropic_Custom_Headers: "X-Api-Key: mixed-case-secret" }, () => {
    assert.throws(
      () => assertSubscriptionOnlyEnvironment("anthropic"),
      error => error instanceof Error
        && error.message.includes("Anthropic_Custom_Headers")
        && !error.message.includes("mixed-case-secret"),
    );
  });
});

test("client devices do not determine the execution worker", () => {
  for (const clientPlatform of ["Galaxy Android", "iPhone iOS", "Windows", "macOS", "mobile-web"]) {
    const route = routeTask(
      { requiredCapabilities: ["edit-repository"], clientPlatform },
      { openai: { subscriptionReady: true, available: true } },
    );
    assert.equal(route.selectedProvider, "openai");
    assert.equal(route.selectedSurface, "codex-app-server");
    assert.equal(route.availabilityClass, "local-runner");
    assert.equal(route.costPolicy.automaticPaidFallback, false);
  }
});

test("unavailable, unsupported, or explicitly unavailable providers stay queued", () => {
  for (const task of [
    {},
    { requiredCapabilities: ["create-pptx"] },
    { preferredProvider: "openai", requiredCapabilities: ["run-tests"] },
    { preferredProvider: "anthropic", requiredCapabilities: ["create-pptx"] },
    { preferredProvider: "gemini" },
  ]) {
    const route = routeTask(task, {
      openai: { available: false, subscriptionReady: false },
      anthropic: { available: false, subscriptionReady: false },
    });
    assert.equal(route.selectedProvider, null);
    assert.equal(route.availabilityClass, "queued");
    assert.equal(route.costPolicy.paidApiAllowed, false);
  }
  assert.equal(routeTask({ preferredProvider: "openai", requiredCapabilities: ["run-tests"] }, {
    openai: { available: false, subscriptionReady: true }, anthropic: { available: true, subscriptionReady: true },
  }).selectedProvider, null, "explicit preference must not silently change provider");
  assert.equal(routeTask({ preferredProvider: "anthropic", requiredCapabilities: ["run-tests"] }, {
    anthropic: { available: true, subscriptionReady: true },
  }).selectedSurface, "claude-code");
});
