import "dotenv/config";

import crypto from "node:crypto";
import { spawnSync } from "node:child_process";

import { GitHubStore } from "../services/mcp-gateway/src/github-store.mjs";
import { GitHubTaskRunStore } from "../services/mcp-gateway/src/task-run-store.mjs";
import { createFileCoordinationStore } from "../services/orchestrator/src/file-coordination-store.mjs";
import { createLocalBridgeAdapters } from "../services/orchestrator/src/local-bridge-adapter.mjs";
import { executeBoundedTaskAttempt } from "../services/orchestrator/src/task-executor.mjs";

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

function flag(name) {
  return process.argv.includes(name);
}

function positiveInteger(value, name) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed < 1) throw new Error(`${name} is invalid.`);
  return parsed;
}

function ghBrokerAuth({ spawnSyncImpl = spawnSync, env = process.env } = {}) {
  const result = spawnSyncImpl("gh", ["auth", "token"], {
    encoding: "utf8",
    windowsHide: true,
    shell: false,
    env: { ...env, GH_PROMPT_DISABLED: "1" },
    maxBuffer: 16 * 1024,
  });
  const token = String(result?.stdout ?? "").trim();
  if (result?.status !== 0 || !token || token.length > 4_096 || /\s/.test(token)) {
    throw new Error("Approved broker GitHub CLI authentication is unavailable.");
  }
  return Object.freeze({
    configured: true,
    mode: "gh-cli-broker",
    async getToken() { return token; },
  });
}

function safeSummary(run) {
  return {
    outcome: run.outcome,
    attemptId: run.attemptId,
    state: run.status?.state ?? null,
    statusVersion: run.status?.statusVersion ?? null,
    taskId: run.status?.taskId ?? null,
    issueNumber: run.status?.issueNumber ?? null,
    resultAvailable: run.status?.resultAvailable ?? false,
    resultHash: run.status?.resultHash ?? null,
    callbackDelivered: run.callbackDelivered ?? null,
  };
}

function coordinationId(repository, issueNumber, purpose) {
  return crypto.createHash("sha256")
    .update(`${purpose}:${repository}:${issueNumber}`, "utf8")
    .digest("base64url");
}

function processAlive(pid) {
  if (!Number.isSafeInteger(pid) || pid < 1) return false;
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return error?.code !== "ESRCH";
  }
}

async function acquireBrokerSession(coordination, repository, issueNumber, timeoutMs) {
  const id = coordinationId(repository, issueNumber, "broker-session");
  const nonce = crypto.randomUUID().replaceAll("-", "");
  const owner = `pid-${process.pid}-${nonce}`;
  const ttlSeconds = Math.ceil((timeoutMs + 60_000) / 1_000);
  const claimed = await coordination.claim("broker-session", id, owner, ttlSeconds);
  if (!claimed.claimed) {
    const priorPid = Number(String(claimed.existing ?? "").match(/^pid-([1-9][0-9]*)-/)?.[1]);
    if (processAlive(priorPid)) throw new Error("Another local broker process already owns this Task.");
    const replaced = await coordination.compareAndSet("broker-session", id, claimed.existing, owner, ttlSeconds);
    if (!replaced) throw new Error("The local broker session changed during stale-owner reconciliation.");
  }
  return {
    async release() {
      await coordination.compareAndSet("broker-session", id, owner, `released-${nonce}`, 1);
    },
  };
}

async function persistentAttemptId(coordination, repository, issueNumber) {
  const id = coordinationId(repository, issueNumber, "task-attempt");
  const proposed = `phase3_${crypto.randomUUID().replaceAll("-", "")}`;
  const claimed = await coordination.claim("task-attempt", id, proposed, 31 * 24 * 60 * 60);
  return claimed.claimed ? proposed : claimed.existing;
}

async function main() {
  const repository = arg("--repo") ?? process.env.GITHUB_REPO;
  if (!/^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/.test(String(repository ?? ""))) {
    throw new Error("Use --repo owner/name for the canonical Task repository.");
  }
  const issueNumber = positiveInteger(arg("--issue"), "Task issue number");
  const spoolDir = arg("--spool");
  if (!spoolDir) throw new Error("Use --spool with the absolute local bridge directory.");
  const coordinationDir = arg("--coordination");
  if (!coordinationDir) throw new Error("Use --coordination with an absolute broker-only directory.");
  const timeoutMs = positiveInteger(arg("--timeout-ms") ?? 30 * 60_000, "Task timeout");
  if (timeoutMs > 30 * 60_000) throw new Error("Task timeout may not exceed 30 minutes.");

  const coordination = createFileCoordinationStore(coordinationDir);
  const brokerSession = await acquireBrokerSession(coordination, repository, issueNumber, timeoutMs);
  try {

    const repositoryStore = new GitHubStore({
      repo: repository,
      auth: ghBrokerAuth(),
      env: { ...process.env, GITHUB_REPO: repository },
      idempotencyStore: coordination,
    });
    const store = new GitHubTaskRunStore(repositoryStore);
    const initial = await store.getTaskStatus(issueNumber);
    const attemptId = await persistentAttemptId(coordination, repository, issueNumber);
    const approval = flag("--approve-once") ? {
      granted: true,
      mode: "one-time",
      taskId: initial.taskId,
      attemptId,
      expiresAt: new Date(Date.now() + timeoutMs).toISOString(),
    } : { granted: false };
    const bridge = createLocalBridgeAdapters({ spoolDir, approval, timeoutMs });
    const run = await executeBoundedTaskAttempt({
      store,
      issueNumber,
      attemptId,
      hostReady: bridge.hostReady(),
      quotaReady: flag("--quota-ready"),
      approval,
      writer: bridge.writer,
      watchdog: bridge.watchdog,
      verifier: bridge.verifier,
    });
    console.log(JSON.stringify(safeSummary(run), null, 2));
  } finally {
    await brokerSession.release();
  }
}

main().catch(error => {
  console.error(String(error?.message ?? error));
  process.exitCode = 1;
});
