import { pathToFileURL } from "node:url";
import { assertSubscriptionOnlyEnvironment, redact } from "../../../packages/core/src/policy.mjs";
import { spawnCodexCli } from "./adapter.mjs";

const DEFAULT_TIMEOUT_MS = 60_000;
const DEFAULT_OUTPUT_LIMIT_BYTES = 2_097_152;
const DOCTOR_STATUSES = new Set(["ok", "warning", "fail"]);

function appendBounded(current, chunk, limit, label) {
  const next = current + chunk;
  if (Buffer.byteLength(next, "utf8") > limit) {
    throw new Error(`Codex doctor ${label} exceeded ${limit} bytes.`);
  }
  return next;
}

function isValidCheckMap(checks) {
  if (!checks || typeof checks !== "object" || Array.isArray(checks)) return false;
  const entries = Object.entries(checks);
  return entries.length > 0 && entries.every(([id, check]) => (
    id.length > 0
    && check
    && typeof check === "object"
    && !Array.isArray(check)
    && check.id === id
    && DOCTOR_STATUSES.has(check.status)
  ));
}

function parseDoctorReport(raw) {
  let report;
  try {
    report = JSON.parse(raw);
  } catch (error) {
    throw new Error(`Codex doctor did not return valid JSON: ${error.message}`);
  }
  if (!report || typeof report !== "object") {
    throw new Error("Codex doctor returned an invalid report object.");
  }
  if (!Number.isInteger(report.schemaVersion) || report.schemaVersion < 1) {
    throw new Error("Codex doctor report is missing a valid schemaVersion.");
  }
  if (!DOCTOR_STATUSES.has(report.overallStatus)) {
    throw new Error("Codex doctor report has an unknown overallStatus.");
  }
  if (typeof report.codexVersion !== "string" || !report.codexVersion.trim()) {
    throw new Error("Codex doctor report is missing codexVersion.");
  }
  const checksAreMap = isValidCheckMap(report.checks);
  if (!Array.isArray(report.checks) && !checksAreMap) {
    throw new Error("Codex doctor report is missing checks.");
  }
  return report;
}

export async function runCodexDoctor({
  spawnCli = spawnCodexCli,
  assertPolicy = assertSubscriptionOnlyEnvironment,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  outputLimitBytes = DEFAULT_OUTPUT_LIMIT_BYTES,
} = {}) {
  assertPolicy("openai");
  const child = spawnCli(["doctor", "--json"]);
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");

  let stdout = "";
  let stderr = "";

  return await new Promise((resolve, reject) => {
    let settled = false;
    const finish = (callback) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      callback();
    };

    const timer = setTimeout(() => {
      child.kill();
      finish(() => reject(new Error(`Codex doctor timed out after ${timeoutMs} ms.`)));
    }, timeoutMs);

    child.stdout.on("data", chunk => {
      try {
        stdout = appendBounded(stdout, chunk, outputLimitBytes, "stdout");
      } catch (error) {
        child.kill();
        finish(() => reject(error));
      }
    });
    child.stderr.on("data", chunk => {
      try {
        stderr = appendBounded(stderr, chunk, outputLimitBytes, "stderr");
      } catch (error) {
        child.kill();
        finish(() => reject(error));
      }
    });
    child.once("error", error => {
      finish(() => reject(error));
    });
    child.once("close", (code, signal) => {
      finish(() => {
        try {
          const safeStdout = redact(stdout);
          const safeStderr = redact(stderr).trim();
          const report = parseDoctorReport(safeStdout);
          resolve({
            readyForDexValidation: code === 0 && report.overallStatus !== "fail",
            exitCode: code,
            signal: signal ?? null,
            report,
            stderr: safeStderr || null,
          });
        } catch (error) {
          reject(error);
        }
      });
    });
  });
}

async function main() {
  try {
    const result = await runCodexDoctor();
    console.log(JSON.stringify(result, null, 2));
    if (!result.readyForDexValidation) process.exitCode = 1;
  } catch (error) {
    console.error(redact(error?.message ?? String(error)));
    process.exitCode = 1;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
