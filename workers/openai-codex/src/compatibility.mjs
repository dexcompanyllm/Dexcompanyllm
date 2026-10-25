import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  assertSubscriptionOnlyEnvironment,
  buildSubscriptionWorkerEnvironment,
  redact,
} from "../../../packages/core/src/policy.mjs";
import { resolveCodexCli } from "./adapter.mjs";

const PROBE_VERSION = 4;
const DEFAULT_TIMEOUT_MS = 30_000;
const DEFAULT_OUTPUT_LIMIT_BYTES = 1_048_576;
const COMPATIBILITY_STABLE_MINIMUM = "0.150.0";
const RECOMMENDED_STABLE_TARGET = "0.151.0";
const REQUIRED_APP_SERVER_METHODS = Object.freeze([
  "account/read",
  "model/list",
  "thread/start",
  "turn/start",
]);
const MCP_RUNTIME_STATUS_VALUES = Object.freeze([
  "notStarted",
  "starting",
  "connected",
  "authenticationRequired",
  "failed",
  "cancelled",
  "disabled",
]);
const EXPERIMENTAL_PAGINATED_HISTORY_METHODS = Object.freeze([
  "thread/turns/list",
  "thread/items/list",
]);

function collectStrings(value, output = new Set()) {
  if (typeof value === "string") {
    output.add(value);
    return output;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, output);
    return output;
  }
  if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      output.add(key);
      collectStrings(item, output);
    }
  }
  return output;
}

function parseSchema(raw, label) {
  try {
    return JSON.parse(raw);
  } catch (error) {
    throw new Error(`Codex ${label} schema is not valid JSON: ${error.message}`);
  }
}

function parseVersionParts(value) {
  const match = String(value ?? "").match(
    /\b(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?(?:\+([0-9A-Za-z.-]+))?\b/,
  );
  if (!match) return null;
  return {
    raw: match[0],
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? null,
    build: match[5] ?? null,
  };
}

export function parseCodexVersion(raw) {
  const version = parseVersionParts(raw);
  if (!version) return null;
  return {
    raw: version.raw,
    major: version.major,
    minor: version.minor,
    patch: version.patch,
  };
}

function comparePrerelease(left, right) {
  if (left === right) return 0;
  if (left === null) return 1;
  if (right === null) return -1;
  const leftParts = left.split(".");
  const rightParts = right.split(".");
  const length = Math.max(leftParts.length, rightParts.length);
  for (let index = 0; index < length; index += 1) {
    const leftPart = leftParts[index];
    const rightPart = rightParts[index];
    if (leftPart === undefined) return -1;
    if (rightPart === undefined) return 1;
    if (leftPart === rightPart) continue;
    const leftNumeric = /^\d+$/.test(leftPart);
    const rightNumeric = /^\d+$/.test(rightPart);
    if (leftNumeric && rightNumeric) return Number(leftPart) < Number(rightPart) ? -1 : 1;
    if (leftNumeric !== rightNumeric) return leftNumeric ? -1 : 1;
    return leftPart < rightPart ? -1 : 1;
  }
  return 0;
}

export function compareCodexVersions(left, right) {
  const leftVersion = parseVersionParts(left?.raw ?? left);
  const rightVersion = parseVersionParts(right?.raw ?? right);
  if (!leftVersion || !rightVersion) {
    throw new Error("Codex versions must contain valid semantic versions.");
  }
  for (const key of ["major", "minor", "patch"]) {
    if (leftVersion[key] !== rightVersion[key]) {
      return leftVersion[key] < rightVersion[key] ? -1 : 1;
    }
  }
  return comparePrerelease(leftVersion.prerelease, rightVersion.prerelease);
}

export function assessCodexRelease(version) {
  const parsed = parseVersionParts(version?.raw ?? version);
  if (!parsed) throw new Error("Codex CLI version could not be assessed.");
  const stableChannel = parsed.prerelease === null;
  const meetsCompatibilityMinimum = stableChannel
    && compareCodexVersions(parsed.raw, COMPATIBILITY_STABLE_MINIMUM) >= 0;
  const meetsRecommendedMinimum = stableChannel
    && compareCodexVersions(parsed.raw, RECOMMENDED_STABLE_TARGET) >= 0;
  return {
    detected: parsed.raw,
    channel: stableChannel ? "stable" : "prerelease",
    compatibilityMinimum: COMPATIBILITY_STABLE_MINIMUM,
    recommendedMinimum: RECOMMENDED_STABLE_TARGET,
    meetsCompatibilityMinimum,
    meetsRecommendedMinimum,
    upgradeRecommended: !meetsRecommendedMinimum,
    reason: meetsRecommendedMinimum
      ? "Installed Codex meets the Dex recommended stable target."
      : stableChannel && meetsCompatibilityMinimum
        ? `Installed Codex remains above the Dex compatibility floor, but upgrade the approved host to ${RECOMMENDED_STABLE_TARGET} or newer stable.`
        : stableChannel
          ? `Upgrade the approved host to Codex ${RECOMMENDED_STABLE_TARGET} or newer stable; ${COMPATIBILITY_STABLE_MINIMUM} remains the Dex compatibility floor.`
          : `Prerelease Codex builds do not satisfy the Dex stable-host gate; install ${RECOMMENDED_STABLE_TARGET} or newer stable.`,
    trackingIssue: 17,
  };
}

export function analyzeCodexSchemas({ clientRequestSchema, mcpStatusSchema = null }) {
  const clientSchema = parseSchema(clientRequestSchema, "ClientRequest");
  const clientStrings = collectStrings(clientSchema);
  const missingMethods = REQUIRED_APP_SERVER_METHODS.filter(method => !clientStrings.has(method));

  let mcpRuntimeStatus = false;
  let mcpRuntimeStatusEvidence = "ListMcpServerStatusResponse schema was not generated.";
  if (mcpStatusSchema !== null) {
    const statusSchema = parseSchema(mcpStatusSchema, "ListMcpServerStatusResponse");
    const statusStrings = collectStrings(statusSchema);
    const hasField = statusStrings.has("runtimeStatus");
    const missingValues = MCP_RUNTIME_STATUS_VALUES.filter(value => !statusStrings.has(value));
    mcpRuntimeStatus = hasField && missingValues.length === 0;
    mcpRuntimeStatusEvidence = mcpRuntimeStatus
      ? "runtimeStatus and all known connection states are exported by the installed stable schema."
      : `runtimeStatus schema support is incomplete${hasField ? `; missing states: ${missingValues.join(", ")}` : "; field absent"}.`;
  }

  const suspensionMethods = [...clientStrings]
    .filter(value => /^[A-Za-z][A-Za-z0-9._-]*\/[A-Za-z0-9._/-]*suspend[A-Za-z0-9._/-]*$/i.test(value))
    .sort();
  const hasSuspensionOutcome = [...clientStrings].some(value => /SuspendTurnOutcome/i.test(value));
  const unfinishedTurnSuspension = suspensionMethods.length > 0 && hasSuspensionOutcome;
  const missingPaginatedHistoryMethods = EXPERIMENTAL_PAGINATED_HISTORY_METHODS
    .filter(method => !clientStrings.has(method));
  const paginatedThreadHistory = missingPaginatedHistoryMethods.length === 0;

  return {
    baseline: {
      compatible: missingMethods.length === 0,
      requiredMethods: [...REQUIRED_APP_SERVER_METHODS],
      missingMethods,
    },
    optional: {
      mcpRuntimeStatus: {
        supported: mcpRuntimeStatus,
        enabled: false,
        maturity: mcpRuntimeStatus ? "stable-schema" : "unavailable",
        activationState: mcpRuntimeStatus ? "tracked-disabled" : "unsupported",
        stableSince: "0.150.0",
        trackingIssue: 18,
        evidence: mcpRuntimeStatusEvidence,
      },
      unfinishedTurnSuspension: {
        supported: unfinishedTurnSuspension,
        enabled: false,
        activationState: "watch-disabled",
        trackingIssue: 21,
        exportedMethods: suspensionMethods,
        evidence: unfinishedTurnSuspension
          ? "An App Server suspension request and SuspendTurnOutcome are exported."
          : "No usable unfinished-turn suspension request is exported by App Server; Core-only support is not enough.",
      },
      paginatedThreadHistory: {
        supported: paginatedThreadHistory,
        enabled: false,
        experimental: true,
        activationState: "watch-disabled",
        trackingIssue: 21,
        requiredMethods: [...EXPERIMENTAL_PAGINATED_HISTORY_METHODS],
        missingMethods: missingPaginatedHistoryMethods,
        evidence: paginatedThreadHistory
          ? "Experimental paginated thread history requests are exported, but Dex keeps experimentalApi disabled."
          : "The complete experimental paginated thread history request set is not exported.",
      },
    },
  };
}

export function assertCodexCompatibility(report) {
  if (!report?.baseline?.compatible) {
    const missing = report?.baseline?.missingMethods?.join(", ") || "unknown baseline methods";
    throw new Error(`Codex App Server is incompatible with Dex Company. Missing schema methods: ${missing}.`);
  }
  return report;
}

export async function runCodexCli(args, {
  env = process.env,
  platform = process.platform,
  timeoutMs = DEFAULT_TIMEOUT_MS,
  outputLimitBytes = DEFAULT_OUTPUT_LIMIT_BYTES,
  resolveCli = resolveCodexCli,
  spawnImpl = spawn,
} = {}) {
  const { command, prefixArgs } = resolveCli({ env, platform });
  const child = spawnImpl(command, [...prefixArgs, ...args], {
    stdio: ["ignore", "pipe", "pipe"],
    shell: false,
    env: buildSubscriptionWorkerEnvironment("openai", env, platform),
  });

  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    let settled = false;
    let timer = null;

    const finish = (error, result = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) reject(error);
      else resolve(result);
    };
    const append = (current, chunk, streamName) => {
      const next = current + chunk;
      if (Buffer.byteLength(next, "utf8") > outputLimitBytes) {
        child.kill();
        finish(new Error(`Codex ${streamName} exceeded ${outputLimitBytes} bytes during compatibility inspection.`));
        return current;
      }
      return next;
    };

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", chunk => { stdout = append(stdout, chunk, "stdout"); });
    child.stderr.on("data", chunk => { stderr = append(stderr, redact(chunk), "stderr"); });
    child.once("error", error => finish(error));
    child.once("close", code => {
      if (settled) return;
      if (code !== 0) {
        finish(new Error(`Codex CLI compatibility command failed with code ${code}: ${stderr.trim() || "no stderr"}`));
        return;
      }
      finish(null, { stdout, stderr, code });
    });

    timer = setTimeout(() => {
      child.kill();
      finish(new Error(`Codex CLI compatibility command timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
  });
}

function findGeneratedFile(root, fileName) {
  const stack = [root];
  while (stack.length) {
    const current = stack.pop();
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const target = path.join(current, entry.name);
      if (entry.isSymbolicLink()) continue;
      if (entry.isDirectory()) stack.push(target);
      else if (entry.isFile() && entry.name === fileName) return target;
    }
  }
  return null;
}

export async function inspectCodexCompatibility({
  env = process.env,
  runCliImpl = runCodexCli,
  tempRoot = os.tmpdir(),
} = {}) {
  assertSubscriptionOnlyEnvironment("openai", env);
  const versionResult = await runCliImpl(["--version"], { env });
  const version = parseCodexVersion([versionResult.stdout, versionResult.stderr].join("\n"));
  if (!version) {
    throw new Error("Codex CLI version could not be parsed from `codex --version` output.");
  }

  const schemaDirectory = fs.mkdtempSync(path.join(tempRoot, "dex-codex-schema-"));
  try {
    await runCliImpl(["app-server", "generate-json-schema", "--out", schemaDirectory], {
      env,
      timeoutMs: 60_000,
    });
    const clientRequestPath = findGeneratedFile(schemaDirectory, "ClientRequest.json");
    if (!clientRequestPath) {
      throw new Error("Codex App Server did not generate ClientRequest.json.");
    }
    const mcpStatusPath = findGeneratedFile(schemaDirectory, "ListMcpServerStatusResponse.json");
    const report = analyzeCodexSchemas({
      clientRequestSchema: fs.readFileSync(clientRequestPath, "utf8"),
      mcpStatusSchema: mcpStatusPath ? fs.readFileSync(mcpStatusPath, "utf8") : null,
    });
    return assertCodexCompatibility({
      probeVersion: PROBE_VERSION,
      cliVersion: version.raw,
      releasePolicy: assessCodexRelease(version.raw),
      schemaProbe: "pass",
      ...report,
    });
  } finally {
    fs.rmSync(schemaDirectory, { recursive: true, force: true });
  }
}

async function main() {
  const report = await inspectCodexCompatibility();
  console.log(JSON.stringify(report, null, 2));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => {
    console.error(redact(error.message));
    process.exitCode = 1;
  });
}
