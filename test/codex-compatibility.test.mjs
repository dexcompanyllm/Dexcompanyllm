import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { PassThrough } from "node:stream";
import test from "node:test";
import {
  analyzeCodexSchemas,
  assessCodexRelease,
  assertCodexCompatibility,
  compareCodexVersions,
  inspectCodexCompatibility,
  parseCodexVersion,
  runCodexCli,
} from "../workers/openai-codex/src/compatibility.mjs";
import { readCodexWorkerStatus } from "../workers/openai-codex/src/status.mjs";

const BASELINE_CLIENT_SCHEMA = JSON.stringify({
  oneOf: [
    { properties: { method: { const: "account/read" } } },
    { properties: { method: { const: "model/list" } } },
    { properties: { method: { const: "thread/start" } } },
    { properties: { method: { const: "turn/start" } } },
  ],
});

const LEGACY_MCP_STATUS_SCHEMA = JSON.stringify({
  definitions: {
    McpServerStatus: {
      properties: {
        name: { type: "string" },
      },
    },
  },
});

const RUNTIME_STATUS_SCHEMA = JSON.stringify({
  definitions: {
    McpServerConnectionStatus: {
      enum: [
        "notStarted",
        "starting",
        "connected",
        "authenticationRequired",
        "failed",
        "cancelled",
        "disabled",
      ],
    },
    McpServerStatus: {
      properties: {
        runtimeStatus: { $ref: "#/definitions/McpServerConnectionStatus" },
      },
    },
  },
});

test("Codex version parser accepts product-prefixed semantic versions", () => {
  assert.deepEqual(parseCodexVersion("codex-cli 0.149.1\n"), {
    raw: "0.149.1",
    major: 0,
    minor: 149,
    patch: 1,
  });
  assert.deepEqual(parseCodexVersion("codex-cli 0.151.0-alpha.9+build.1"), {
    raw: "0.151.0-alpha.9+build.1",
    major: 0,
    minor: 151,
    patch: 0,
  });
  assert.equal(parseCodexVersion("unknown"), null);
});

test("Codex semantic version comparison keeps prereleases below the stable release", () => {
  assert.equal(compareCodexVersions("0.149.1", "0.150.0"), -1);
  assert.equal(compareCodexVersions("0.151.0-alpha.9", "0.151.0"), -1);
  assert.equal(compareCodexVersions("0.151.0", "0.151.0"), 0);
  assert.equal(compareCodexVersions("0.152.0", "0.151.0"), 1);
  assert.throws(() => compareCodexVersions("not-a-version", "0.151.0"), /valid semantic versions/);
});

test("Dex keeps 0.150 as compatibility floor while recommending stable 0.151", () => {
  assert.deepEqual(assessCodexRelease("0.149.1"), {
    detected: "0.149.1",
    channel: "stable",
    compatibilityMinimum: "0.150.0",
    recommendedMinimum: "0.151.0",
    meetsCompatibilityMinimum: false,
    meetsRecommendedMinimum: false,
    upgradeRecommended: true,
    reason: "Upgrade the approved host to Codex 0.151.0 or newer stable; 0.150.0 remains the Dex compatibility floor.",
    trackingIssue: 17,
  });
  assert.deepEqual(assessCodexRelease("0.150.1"), {
    detected: "0.150.1",
    channel: "stable",
    compatibilityMinimum: "0.150.0",
    recommendedMinimum: "0.151.0",
    meetsCompatibilityMinimum: true,
    meetsRecommendedMinimum: false,
    upgradeRecommended: true,
    reason: "Installed Codex remains above the Dex compatibility floor, but upgrade the approved host to 0.151.0 or newer stable.",
    trackingIssue: 17,
  });
  assert.equal(assessCodexRelease("0.151.0").upgradeRecommended, false);
  assert.equal(assessCodexRelease("0.151.0").meetsCompatibilityMinimum, true);
  assert.equal(assessCodexRelease("0.151.0").meetsRecommendedMinimum, true);
  assert.equal(assessCodexRelease("0.152.0-alpha.1").upgradeRecommended, true);
  assert.match(assessCodexRelease("0.152.0-alpha.1").reason, /Prerelease/);
});

test("0.149-style App Server schema passes the baseline while optional features remain disabled", () => {
  const report = analyzeCodexSchemas({
    clientRequestSchema: BASELINE_CLIENT_SCHEMA,
    mcpStatusSchema: LEGACY_MCP_STATUS_SCHEMA,
  });
  assert.equal(report.baseline.compatible, true);
  assert.equal(report.optional.mcpRuntimeStatus.supported, false);
  assert.equal(report.optional.mcpRuntimeStatus.enabled, false);
  assert.equal(report.optional.mcpRuntimeStatus.activationState, "unsupported");
  assert.equal(report.optional.mcpRuntimeStatus.stableSince, "0.150.0");
  assert.equal(report.optional.mcpRuntimeStatus.trackingIssue, 18);
  assert.equal(report.optional.unfinishedTurnSuspension.supported, false);
  assert.equal(report.optional.unfinishedTurnSuspension.enabled, false);
  assert.equal(report.optional.paginatedThreadHistory.supported, false);
  assert.equal(report.optional.paginatedThreadHistory.enabled, false);
  assert.equal(report.optional.paginatedThreadHistory.experimental, true);
});

test("0.150+ stable runtimeStatus schema is detected but stays tracked-disabled", () => {
  const report = analyzeCodexSchemas({
    clientRequestSchema: BASELINE_CLIENT_SCHEMA,
    mcpStatusSchema: RUNTIME_STATUS_SCHEMA,
  });
  assert.equal(report.baseline.compatible, true);
  assert.deepEqual(report.optional.mcpRuntimeStatus, {
    supported: true,
    enabled: false,
    maturity: "stable-schema",
    activationState: "tracked-disabled",
    stableSince: "0.150.0",
    trackingIssue: 18,
    evidence: "runtimeStatus and all known connection states are exported by the installed stable schema.",
  });
});

test("schema inspection detects optional features without enabling them", () => {
  const clientSchema = JSON.stringify({
    oneOf: [
      ...JSON.parse(BASELINE_CLIENT_SCHEMA).oneOf,
      {
        properties: {
          method: { const: "turn/suspend" },
          result: { $ref: "#/definitions/SuspendTurnOutcome" },
        },
      },
      { properties: { method: { const: "thread/turns/list" } } },
      { properties: { method: { const: "thread/items/list" } } },
    ],
  });
  const report = analyzeCodexSchemas({
    clientRequestSchema: clientSchema,
    mcpStatusSchema: RUNTIME_STATUS_SCHEMA,
  });
  assert.equal(report.optional.mcpRuntimeStatus.supported, true);
  assert.equal(report.optional.mcpRuntimeStatus.enabled, false);
  assert.equal(report.optional.unfinishedTurnSuspension.supported, true);
  assert.equal(report.optional.unfinishedTurnSuspension.enabled, false);
  assert.equal(report.optional.unfinishedTurnSuspension.trackingIssue, 21);
  assert.deepEqual(report.optional.unfinishedTurnSuspension.exportedMethods, ["turn/suspend"]);
  assert.equal(report.optional.paginatedThreadHistory.supported, true);
  assert.equal(report.optional.paginatedThreadHistory.enabled, false);
  assert.equal(report.optional.paginatedThreadHistory.experimental, true);
  assert.equal(report.optional.paginatedThreadHistory.trackingIssue, 21);
});

test("compatibility gate fails closed when model discovery or execution methods are absent", () => {
  const report = analyzeCodexSchemas({
    clientRequestSchema: JSON.stringify({ method: "thread/start" }),
  });
  assert.throws(
    () => assertCodexCompatibility(report),
    /account\/read, model\/list, turn\/start/,
  );
});

test("Codex compatibility command uses literal arguments and an exact child-env allowlist", async () => {
  const calls = [];
  const spawnImpl = (command, args, options) => {
    calls.push({ command, args, options });
    const child = new EventEmitter();
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = () => {};
    queueMicrotask(() => {
      child.stdout.end("codex-cli 0.151.0\n");
      child.stderr.end();
      child.emit("close", 0);
    });
    return child;
  };

  const result = await runCodexCli(["--version", "& whoami"], {
    env: {
      Path: "C:\\safe",
      SystemRoot: "C:\\Windows",
      SYSTEMDRIVE: "C:",
      TEMP: "C:\\Temp",
      HOME: "C:\\Users\\worker",
      LOGONSERVER: "\\\\WORKER-HOST",
      USERDOMAIN: "WORKER-HOST",
      CODEX_HOME: "C:\\Users\\worker\\.codex",
      OPENAI_API_KEY: "secret-canary",
      OpenAi_Base_Url: "https://external.invalid",
      GitHub_App_Private_Key_B64: "replace_me",
      DEX_AUTH_SECRET_B64: "replace_me",
      UPSTASH_REDIS_REST_TOKEN: "replace_me",
      KV_REST_API_TOKEN: "replace_me",
      NODE_OPTIONS: "--require=untrusted.js",
      HTTPS_PROXY: "https://credential@proxy.invalid",
      GIT_ASKPASS: "untrusted-helper",
      SSH_AUTH_SOCK: "untrusted-socket",
      SAFE_MARKER: "must-not-propagate",
      CUSTOM_SECRET: "secret-canary",
    },
    platform: "win32",
    resolveCli: () => ({ command: "C:\\safe\\node.exe", prefixArgs: ["C:\\safe\\codex.js"] }),
    spawnImpl,
  });

  assert.equal(result.stdout, "codex-cli 0.151.0\n");
  assert.equal(calls[0].options.shell, false);
  assert.deepEqual(calls[0].args, ["C:\\safe\\codex.js", "--version", "& whoami"]);
  assert.deepEqual(
    Object.keys(calls[0].options.env).sort(),
    [
      "Path",
      "SystemRoot",
      "SYSTEMDRIVE",
      "TEMP",
      "HOME",
      "LOGONSERVER",
      "USERDOMAIN",
      "CODEX_HOME",
    ].sort(),
  );
});

test("inspection uses generated stable schemas and reports 0.151 as recommended target", async () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "dex-codex-compat-test-"));
  const calls = [];
  try {
    const report = await inspectCodexCompatibility({
      env: {},
      tempRoot,
      async runCliImpl(args) {
        calls.push(args);
        if (args[0] === "--version") {
          return { stdout: "codex-cli 0.151.0\n", stderr: "", code: 0 };
        }
        const outIndex = args.indexOf("--out");
        const output = args[outIndex + 1];
        fs.mkdirSync(path.join(output, "v2"), { recursive: true });
        fs.writeFileSync(path.join(output, "ClientRequest.json"), BASELINE_CLIENT_SCHEMA, "utf8");
        fs.writeFileSync(
          path.join(output, "v2", "ListMcpServerStatusResponse.json"),
          RUNTIME_STATUS_SCHEMA,
          "utf8",
        );
        return { stdout: "", stderr: "", code: 0 };
      },
    });
    assert.equal(report.probeVersion, 4);
    assert.equal(report.cliVersion, "0.151.0");
    assert.deepEqual(report.releasePolicy, {
      detected: "0.151.0",
      channel: "stable",
      compatibilityMinimum: "0.150.0",
      recommendedMinimum: "0.151.0",
      meetsCompatibilityMinimum: true,
      meetsRecommendedMinimum: true,
      upgradeRecommended: false,
      reason: "Installed Codex meets the Dex recommended stable target.",
      trackingIssue: 17,
    });
    assert.equal(report.schemaProbe, "pass");
    assert.equal(report.baseline.compatible, true);
    assert.equal(report.optional.mcpRuntimeStatus.supported, true);
    assert.equal(report.optional.mcpRuntimeStatus.enabled, false);
    assert.deepEqual(calls[1].slice(0, 3), ["app-server", "generate-json-schema", "--out"]);
    assert.deepEqual(fs.readdirSync(tempRoot), []);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});

test("combined worker status does not connect when the compatibility gate fails", async () => {
  const calls = [];
  const adapter = {
    async connect() { calls.push("connect"); return { provider: "openai" }; },
    async rateLimits() { calls.push("limits"); return null; },
    close() { calls.push("close"); },
  };
  await assert.rejects(
    () => readCodexWorkerStatus({
      adapter,
      async inspectCompatibilityImpl() { throw new Error("incompatible schema"); },
    }),
    /incompatible schema/,
  );
  assert.deepEqual(calls, ["close"]);
});

test("combined worker status reports readiness, compatibility, account, limits, and closes the adapter", async () => {
  const calls = [];
  const compatibility = {
    baseline: { compatible: true },
    releasePolicy: { upgradeRecommended: false },
  };
  const adapter = {
    async connect() {
      calls.push("connect");
      return {
        provider: "openai",
        authMode: "chatgpt",
        modelCatalog: { total: 3, retirementReady: true },
      };
    },
    async rateLimits() { calls.push("limits"); return { primary: { usedPercent: 10 } }; },
    close() { calls.push("close"); },
  };
  const result = await readCodexWorkerStatus({
    adapter,
    async inspectCompatibilityImpl() { calls.push("compatibility"); return compatibility; },
  });
  assert.deepEqual(result, {
    provider: "openai",
    authMode: "chatgpt",
    modelCatalog: { total: 3, retirementReady: true },
    limits: { primary: { usedPercent: 10 } },
    compatibility,
    ready: true,
  });
  assert.deepEqual(calls, ["compatibility", "connect", "limits", "close"]);
});

test("combined worker status remains not ready when an official replacement model is missing", async () => {
  const adapter = {
    async connect() {
      return {
        provider: "openai",
        authMode: "chatgpt",
        modelCatalog: { total: 2, retirementReady: false },
      };
    },
    async rateLimits() { return null; },
    close() {},
  };
  const result = await readCodexWorkerStatus({
    adapter,
    async inspectCompatibilityImpl() {
      return {
        baseline: { compatible: true },
        releasePolicy: { upgradeRecommended: false },
      };
    },
  });
  assert.equal(result.ready, false);
});

test("Codex compatibility command kills an oversized child response", async () => {
  let killed = false;
  const spawnImpl = () => {
    const child = new EventEmitter();
    child.stdout = new PassThrough();
    child.stderr = new PassThrough();
    child.kill = () => { killed = true; };
    queueMicrotask(() => child.stdout.write("x".repeat(32)));
    return child;
  };
  await assert.rejects(
    () => runCodexCli(["--version"], {
      env: {},
      outputLimitBytes: 16,
      resolveCli: () => ({ command: "codex", prefixArgs: [] }),
      spawnImpl,
    }),
    /exceeded 16 bytes/,
  );
  assert.equal(killed, true);
});

test("schema generation failures still remove the temporary probe directory", async () => {
  const tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), "dex-codex-compat-fail-"));
  try {
    await assert.rejects(
      () => inspectCodexCompatibility({
        env: {},
        tempRoot,
        async runCliImpl(args) {
          if (args[0] === "--version") {
            return { stdout: "codex-cli 0.151.0\n", stderr: "", code: 0 };
          }
          throw new Error("schema generation failed");
        },
      }),
      /schema generation failed/,
    );
    assert.deepEqual(fs.readdirSync(tempRoot), []);
  } finally {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  }
});
