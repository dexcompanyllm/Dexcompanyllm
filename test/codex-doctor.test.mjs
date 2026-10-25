import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import { PassThrough } from "node:stream";
import test from "node:test";
import { runCodexDoctor } from "../workers/openai-codex/src/doctor.mjs";

function fakeChild({ report, code = 0, stderr = "" }) {
  const child = new EventEmitter();
  child.stdout = new PassThrough();
  child.stderr = new PassThrough();
  child.kill = () => {};
  queueMicrotask(() => {
    child.stdout.end(JSON.stringify(report));
    child.stderr.end(stderr);
    child.emit("close", code, null);
  });
  return child;
}

const healthyReport = {
  schemaVersion: 1,
  generatedAt: "2026-08-30T12:00:00Z",
  overallStatus: "warning",
  codexVersion: "0.151.0",
  checks: [
    {
      id: "auth.credentials",
      category: "auth",
      status: "ok",
      summary: "ChatGPT authentication is configured",
      details: [],
      issues: [],
      remediation: null,
      durationMs: 1,
    },
  ],
};

const stableCheck = {
  id: "auth.credentials",
  category: "auth",
  status: "ok",
  summary: "ChatGPT authentication is configured",
  details: {},
  remediation: null,
  durationMs: 1,
};

test("Codex doctor preflight uses the official JSON diagnostic command and accepts warnings", async () => {
  let receivedArgs;
  let policyProvider;
  const result = await runCodexDoctor({
    assertPolicy(provider) {
      policyProvider = provider;
    },
    spawnCli(args) {
      receivedArgs = args;
      return fakeChild({ report: healthyReport });
    },
  });

  assert.equal(policyProvider, "openai");
  assert.deepEqual(receivedArgs, ["doctor", "--json"]);
  assert.equal(result.readyForDexValidation, true);
  assert.equal(result.report.codexVersion, "0.151.0");
  assert.equal(result.report.overallStatus, "warning");
});

test("Codex doctor preflight accepts stable check maps keyed by diagnostic id", async () => {
  const report = {
    ...healthyReport,
    checks: {
      "auth.credentials": stableCheck,
    },
  };

  const result = await runCodexDoctor({
    assertPolicy() {},
    spawnCli() {
      return fakeChild({ report });
    },
  });

  assert.equal(result.readyForDexValidation, true);
  assert.equal(result.report.checks["auth.credentials"].status, "ok");
});

test("Codex doctor preflight rejects malformed stable check maps", async () => {
  const malformedMaps = [
    {},
    { "auth.credentials": null },
    { "auth.credentials": { ...stableCheck, id: "other.check" } },
    { "auth.credentials": { ...stableCheck, status: "unknown" } },
  ];

  for (const checks of malformedMaps) {
    await assert.rejects(
      runCodexDoctor({
        assertPolicy() {},
        spawnCli() {
          return fakeChild({ report: { ...healthyReport, checks } });
        },
      }),
      /checks/,
    );
  }
});

test("Codex doctor preflight preserves a structured failing report and fails closed", async () => {
  const result = await runCodexDoctor({
    assertPolicy() {},
    spawnCli() {
      return fakeChild({
        report: { ...healthyReport, overallStatus: "fail" },
        code: 1,
        stderr: "diagnostic failure",
      });
    },
  });

  assert.equal(result.readyForDexValidation, false);
  assert.equal(result.exitCode, 1);
  assert.equal(result.report.overallStatus, "fail");
  assert.equal(result.stderr, "diagnostic failure");
});

test("Codex doctor preflight fails closed on report failure even when the CLI exits zero", async () => {
  const result = await runCodexDoctor({
    assertPolicy() {},
    spawnCli() {
      return fakeChild({ report: { ...healthyReport, overallStatus: "fail" } });
    },
  });

  assert.equal(result.readyForDexValidation, false);
  assert.equal(result.exitCode, 0);
  assert.equal(result.report.overallStatus, "fail");
});

test("Codex doctor preflight fails closed on a nonzero CLI exit even when the report is a warning", async () => {
  const result = await runCodexDoctor({
    assertPolicy() {},
    spawnCli() {
      return fakeChild({ report: healthyReport, code: 1 });
    },
  });

  assert.equal(result.readyForDexValidation, false);
  assert.equal(result.exitCode, 1);
  assert.equal(result.report.overallStatus, "warning");
});

test("Codex doctor preflight rejects malformed reports", async () => {
  await assert.rejects(
    runCodexDoctor({
      assertPolicy() {},
      spawnCli() {
        return fakeChild({ report: { unexpected: true } });
      },
    }),
    /schemaVersion/,
  );
});
