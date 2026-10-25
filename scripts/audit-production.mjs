import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
import { pathToFileURL } from "node:url";

export const AUDIT_ARGS = Object.freeze([
  "audit", "--omit=dev", "--audit-level=high", "--json",
  "--fetch-timeout=30000", "--fetch-retries=0",
]);
export const MAX_ATTEMPTS = 2;
export const PROCESS_TIMEOUT_MS = 45000;
const MAX_OUTPUT_BYTES = 4 * 1024 * 1024;
const SEVERITIES = ["info", "low", "moderate", "high", "critical"];
const TRANSIENT_CODES = new Set([
  "ETIMEDOUT", "ESOCKETTIMEDOUT", "ECONNRESET", "EAI_AGAIN",
  "ECONNREFUSED", "E429", "E502", "E503", "E504",
]);

function unavailable(reason, retryable = false) {
  return { status: "Not Checked", reason, retryable, exitCode: 2 };
}

// Only a complete, successful npm report can pass. Raw errors never leave this module.
export function classifyAudit({ stdout = "", status = null, errorCode = null } = {}) {
  if (errorCode) {
    return unavailable(
      TRANSIENT_CODES.has(errorCode) ? "audit-service-unavailable" : "audit-process-failed",
      TRANSIENT_CODES.has(errorCode),
    );
  }
  let report;
  try { report = JSON.parse(stdout); } catch { return unavailable("invalid-audit-report"); }
  if (!report || typeof report !== "object" || Array.isArray(report)) {
    return unavailable("invalid-audit-report");
  }
  // npm's audit-error formatter reports HTTP failures at the top level.
  // Auth/config errors take precedence over a contradictory transient status.
  if (report.error || report.statusCode !== undefined) {
    const code = String(report.error?.code ?? "");
    const httpStatus = report.statusCode;
    const retryable = code
      ? TRANSIENT_CODES.has(code)
      : Number.isInteger(httpStatus) && [429, 502, 503, 504].includes(httpStatus);
    return unavailable(
      retryable ? "audit-service-unavailable" : "audit-request-failed",
      retryable,
    );
  }
  const counts = report.metadata?.vulnerabilities;
  const validCounts = counts && [...SEVERITIES, "total"].every(key =>
    Number.isSafeInteger(counts[key]) && counts[key] >= 0,
  );
  if (report.auditReportVersion !== 2 || !validCounts ||
      !report.vulnerabilities || typeof report.vulnerabilities !== "object" ||
      Array.isArray(report.vulnerabilities) ||
      counts.total !== SEVERITIES.reduce((sum, key) => sum + counts[key], 0)) {
    return unavailable("invalid-audit-report");
  }
  const entries = Object.values(report.vulnerabilities);
  if (entries.length !== counts.total || entries.some(entry => !entry || !SEVERITIES.includes(entry.severity))) {
    return unavailable("invalid-audit-report");
  }
  // A high/critical entry cannot be hidden by inconsistent summary counts.
  if (entries.some(entry => ["high", "critical"].includes(entry.severity)) &&
      counts.high + counts.critical === 0) {
    return unavailable("inconsistent-audit-report");
  }
  const safeCounts = Object.fromEntries([...SEVERITIES, "total"].map(key => [key, counts[key]]));
  if (counts.high + counts.critical > 0) {
    return { status: "FAIL", reason: "high-or-critical-vulnerabilities", retryable: false, exitCode: 1, counts: safeCounts };
  }
  if (status !== 0) return unavailable("audit-exit-report-mismatch");
  return { status: "PASS", reason: "no-high-or-critical-vulnerabilities", retryable: false, exitCode: 0, counts: safeCounts };
}

export function executeAudit({ npmCli, cwd = process.cwd(), execute = execFileSync } = {}) {
  if (!npmCli || !path.isAbsolute(npmCli) || path.basename(npmCli) !== "npm-cli.js") {
    return { errorCode: "INVALID_NPM_LAUNCHER" };
  }
  try {
    const stdout = execute(process.execPath, [npmCli, ...AUDIT_ARGS], {
      cwd, encoding: "utf8", shell: false, windowsHide: true,
      timeout: PROCESS_TIMEOUT_MS, killSignal: "SIGKILL", maxBuffer: MAX_OUTPUT_BYTES,
      stdio: ["ignore", "pipe", "pipe"],
    });
    return { stdout, status: 0 };
  } catch (error) {
    return {
      stdout: typeof error.stdout === "string" ? error.stdout : "",
      status: Number.isInteger(error.status) ? error.status : null,
      errorCode: typeof error.code === "string" ? error.code : null,
    };
  }
}

export async function runAudit({ run, wait = sleep, emit = value => console.log(JSON.stringify(value)) }) {
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt += 1) {
    let execution;
    try { execution = await run(); } catch { execution = { errorCode: "AUDIT_RUNNER_FAILED" }; }
    const result = classifyAudit(execution);
    emit({ check: "production-dependency-audit", attempt, status: result.status, reason: result.reason, ...(result.counts ? { counts: result.counts } : {}) });
    if (!result.retryable || attempt === MAX_ATTEMPTS) return { ...result, attempts: attempt };
    await wait(2000);
  }
  throw new Error("unreachable audit state");
}

async function main() {
  const npmCli = process.env.npm_execpath;
  let launcherReady = false;
  try { launcherReady = Boolean(npmCli && fs.statSync(npmCli).isFile()); } catch { /* fail closed */ }
  const result = await runAudit({ run: () => launcherReady ? executeAudit({ npmCli }) : { errorCode: "INVALID_NPM_LAUNCHER" } });
  process.exitCode = result.exitCode;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  main().catch(() => {
    console.error("Production dependency audit unavailable; required security check did not pass.");
    process.exitCode = 2;
  });
}
