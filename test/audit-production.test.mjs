import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { AUDIT_ARGS, MAX_ATTEMPTS, PROCESS_TIMEOUT_MS, classifyAudit, executeAudit, runAudit } from "../scripts/audit-production.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
function report(overrides = {}) {
  return JSON.stringify({ auditReportVersion: 2, vulnerabilities: {}, metadata: { vulnerabilities: { info: 0, low: 0, moderate: 0, high: 0, critical: 0, total: 0 } }, ...overrides });
}
const healthy = () => ({ stdout: report(), status: 0 });

test("audit requires a complete successful report and retains the high severity threshold", () => {
  assert.equal(classifyAudit(healthy()).status, "PASS");
  const low = JSON.parse(report());
  low.metadata.vulnerabilities.low = low.metadata.vulnerabilities.total = 1;
  low.vulnerabilities.example = { severity: "low" };
  assert.equal(classifyAudit({ stdout: JSON.stringify(low), status: 0 }).status, "PASS");
  for (const severity of ["high", "critical"]) {
    const vulnerable = JSON.parse(report());
    vulnerable.metadata.vulnerabilities[severity] = vulnerable.metadata.vulnerabilities.total = 1;
    vulnerable.vulnerabilities.example = { severity };
    const result = classifyAudit({ stdout: JSON.stringify(vulnerable), status: 1 });
    assert.equal(result.status, "FAIL");
    assert.equal(result.retryable, false);
    assert.equal(result.exitCode, 1);
  }
});

test("empty, malformed, incomplete, contradictory and nonzero reports never pass", () => {
  for (const stdout of ["", "not-json", "null", "[]", "{}", report({ auditReportVersion: 1 }), report({ metadata: {} }), report({ vulnerabilities: [] })]) {
    assert.equal(classifyAudit({ stdout, status: 0 }).exitCode, 2);
  }
  for (const invalid of [-1, 1.5, "0", null]) {
    const value = JSON.parse(report());
    value.metadata.vulnerabilities.high = invalid;
    assert.equal(classifyAudit({ stdout: JSON.stringify(value), status: 0 }).status, "Not Checked");
  }
  const inconsistent = JSON.parse(report());
  inconsistent.vulnerabilities.example = { severity: "high" };
  assert.equal(classifyAudit({ stdout: JSON.stringify(inconsistent), status: 0 }).status, "Not Checked");
  assert.equal(classifyAudit({ stdout: report(), status: 1 }).exitCode, 2);
});

test("only transient service failures receive one bounded retry", async () => {
  let calls = 0;
  const delays = [];
  const events = [];
  const result = await runAudit({
    run: () => ++calls === 1 ? { stdout: JSON.stringify({ error: { code: "E503", summary: "private diagnostic" } }), status: 1 } : healthy(),
    wait: async ms => delays.push(ms), emit: event => events.push(event),
  });
  assert.equal(calls, 2);
  assert.equal(result.status, "PASS");
  assert.deepEqual(delays, [2000]);
  assert.equal(events[0].status, "Not Checked");
  assert.doesNotMatch(JSON.stringify(events), /private diagnostic/);
});

test("two timeouts remain unavailable and cannot produce a third attempt or PASS", async () => {
  let calls = 0;
  const result = await runAudit({ run: () => { calls += 1; return { errorCode: "ETIMEDOUT" }; }, wait: async () => {}, emit: () => {} });
  assert.equal(calls, MAX_ATTEMPTS);
  assert.equal(calls, 2);
  assert.equal(result.status, "Not Checked");
  assert.equal(result.exitCode, 2);
});

test("findings, auth errors, invalid output and runner exceptions are not retried", async () => {
  const vulnerable = JSON.parse(report());
  vulnerable.metadata.vulnerabilities.high = vulnerable.metadata.vulnerabilities.total = 1;
  vulnerable.vulnerabilities.example = { severity: "high" };
  for (const response of [
    { stdout: JSON.stringify(vulnerable), status: 1 },
    { stdout: JSON.stringify({ error: { code: "E401", summary: "do not expose" } }), status: 1 },
    { stdout: "do not expose", status: 1 },
    { errorCode: "ENOBUFS" },
  ]) {
    let calls = 0;
    const result = await runAudit({ run: () => { calls += 1; return response; }, emit: () => {} });
    assert.equal(calls, 1);
    assert.notEqual(result.exitCode, 0);
  }
  const events = [];
  const result = await runAudit({ run: () => { throw new Error("private diagnostic"); }, emit: value => events.push(value) });
  assert.equal(result.attempts, 1);
  assert.doesNotMatch(JSON.stringify(events), /private diagnostic/);
});

test("audit uses Node with literal npm arguments, no shell, bounded process/output, and no fix", () => {
  const npmCli = path.resolve(root, "fixture-npm", "npm-cli.js");
  let called = false;
  const result = executeAudit({ npmCli, cwd: root, execute: (executable, args, options) => {
    called = true;
    assert.equal(executable, process.execPath);
    assert.deepEqual(args, [npmCli, ...AUDIT_ARGS]);
    assert.equal(options.shell, false);
    assert.equal(options.timeout, PROCESS_TIMEOUT_MS);
    assert.equal(options.killSignal, "SIGKILL");
    assert.equal(options.maxBuffer, 4 * 1024 * 1024);
    assert.deepEqual(options.stdio, ["ignore", "pipe", "pipe"]);
    assert.equal(options.cwd, root);
    return report();
  } });
  assert.ok(called);
  assert.equal(classifyAudit(result).status, "PASS");
  assert.equal(executeAudit({ npmCli: "npm; unwanted" }).errorCode, "INVALID_NPM_LAUNCHER");
  assert.ok(AUDIT_ARGS.includes("--omit=dev"));
  assert.ok(AUDIT_ARGS.includes("--audit-level=high"));
  assert.ok(AUDIT_ARGS.includes("--fetch-retries=0"));
  assert.ok(!AUDIT_ARGS.includes("fix"));
  const timedOut = executeAudit({ npmCli, execute: () => { const error = new Error("private stderr"); error.code = "ETIMEDOUT"; throw error; } });
  assert.equal(classifyAudit(timedOut).retryable, true);
});

test("required CI audit cannot silently skip, soften findings or expand permissions", () => {
  const workflow = fs.readFileSync(path.join(root, ".github/workflows/ci.yml"), "utf8");
  const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
  assert.equal(packageJson.scripts["audit:production"], "node scripts/audit-production.mjs");
  assert.match(workflow, /name: Production dependency audit\s+run: npm run audit:production/);
  assert.match(workflow, /permissions:\s*\n\s+contents: read/);
  assert.doesNotMatch(workflow, /continue-on-error|contents: write|\|\|\s*(true|exit 0)|--audit-level=(critical|none)/);
});

test("npm top-level transient HTTP status is retried once without leaking response data", async () => {
  for (const statusCode of [429, 502, 503, 504]) {
    for (const withError of [false, true]) {
      const events = [];
      let calls = 0;
      const failure = { statusCode, message: "private endpoint", body: "private response", ...(withError ? { error: { summary: "audit endpoint returned an error" } } : {}) };
      const result = await runAudit({
        run: () => ++calls === 1 ? { stdout: JSON.stringify(failure), status: 1 } : healthy(),
        wait: async () => {}, emit: value => events.push(value),
      });
      assert.equal(calls, 2);
      assert.equal(result.status, "PASS");
      assert.doesNotMatch(JSON.stringify(events), /private endpoint|private response/);
    }
  }
  for (const statusCode of [400, 401, 403, 404, "503", null]) {
    const result = await runAudit({ run: () => ({ stdout: JSON.stringify({ statusCode }), status: 1 }), emit: () => {} });
    assert.equal(result.attempts, 1);
    assert.equal(result.exitCode, 2);
  }
  const contradictory = classifyAudit({ stdout: JSON.stringify({ statusCode: 503, error: { code: "E401" } }), status: 1 });
  assert.equal(contradictory.retryable, false);
});
