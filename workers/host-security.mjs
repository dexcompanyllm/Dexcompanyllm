import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { findSecretKinds } from "../scripts/check.mjs";

const REGISTRY_MAX_BYTES = 64 * 1024;
const PROJECT_NAME_PATTERN = /^[A-Za-z0-9._가-힣-]{1,80}$/u;
const SHA256_PATTERN = /^[a-f0-9]{64}$/i;
const VERIFICATION_FILE_PATTERN = /^[A-Za-z0-9._/-]{1,240}$/;
const PRIVATE_KEY_EXCLUSIONS = new Set([
  "authorized_keys",
  "config",
  "known_hosts",
  "known_hosts.old",
]);
const FORBIDDEN_CREDENTIAL_ENV = Object.freeze([
  "GITHUB_TOKEN",
  "GH_TOKEN",
  "GITHUB_APP_PRIVATE_KEY_B64",
  "GITHUB_APP_CLIENT_SECRET",
  "GIT_ASKPASS",
  "GIT_SSH_COMMAND",
  "SSH_AUTH_SOCK",
]);

function environmentValue(env, name) {
  const key = Object.keys(env ?? {}).find(candidate => candidate.toLowerCase() === name.toLowerCase());
  return key ? env[key] : undefined;
}

function nonEmptyEnvironmentNames(names, env = process.env) {
  return names.filter(name => String(environmentValue(env, name) ?? "").trim() !== "");
}

function normalizeAccount(value) {
  return String(value ?? "").trim().replaceAll("/", "\\").toLowerCase();
}

function pathInside(parentPath, childPath, platform = process.platform) {
  const parent = platform === "win32" ? parentPath.toLowerCase() : parentPath;
  const child = platform === "win32" ? childPath.toLowerCase() : childPath;
  const relative = path.relative(parent, child);
  return relative !== "" && relative !== ".." && !relative.startsWith(`..${path.sep}`) && !path.isAbsolute(relative);
}

function sha256Hex(content) {
  return crypto.createHash("sha256").update(content).digest("hex");
}

function workerIdentity(platform, {
  spawnSyncImpl = spawnSync,
  userInfoImpl = os.userInfo,
  systemRoot = process.env.SystemRoot ?? process.env.WINDIR,
} = {}) {
  if (platform !== "win32") {
    const user = userInfoImpl({ encoding: "utf8" });
    if (typeof user?.username !== "string" || !user.username.trim()
      || !Number.isSafeInteger(user.uid) || user.uid < 0) {
      throw new Error("The effective OS worker identity could not be verified.");
    }
    return { account: user.username, id: String(user.uid) };
  }
  if (!systemRoot || !path.win32.isAbsolute(systemRoot)) {
    throw new Error("Windows system directory is unavailable for OS identity verification.");
  }
  const executable = path.win32.join(systemRoot, "System32", "WindowsPowerShell", "v1.0", "powershell.exe");
  const script = [
    "$ErrorActionPreference = 'Stop'",
    "[Console]::OutputEncoding = New-Object System.Text.UTF8Encoding($false)",
    "$identity = [System.Security.Principal.WindowsIdentity]::GetCurrent()",
    "@{ account = $identity.Name; id = $identity.User.Value } | ConvertTo-Json -Compress",
  ].join("; ");
  const result = spawnSyncImpl(executable, ["-NoProfile", "-NonInteractive", "-Command", script], {
    encoding: "utf8", shell: false, windowsHide: true, timeout: 5_000, maxBuffer: 8192,
  });
  if (result?.status !== 0 || result?.error || result?.signal) {
    throw new Error("The effective Windows worker identity could not be verified.");
  }
  let identity;
  try { identity = JSON.parse(String(result.stdout ?? "").trim()); }
  catch { throw new Error("Windows worker identity returned invalid data."); }
  if (typeof identity?.account !== "string" || !/^[^\\\r\n]+\\[^\\\r\n]+$/.test(identity.account)
    || !/^S-\d+(?:-\d+)+$/i.test(String(identity?.id ?? ""))) {
    throw new Error("Windows worker identity returned invalid data.");
  }
  return identity;
}

export function currentWorkerAccount(_env = process.env, platform = process.platform, options = {}) {
  return workerIdentity(platform, options).account;
}

export function assertDedicatedWorkerAccount(env = process.env, platform = process.platform, options = {}) {
  const expected = String(environmentValue(env, "DEX_WORKER_ACCOUNT") ?? "").trim();
  if (!expected) {
    throw new Error("DEX_WORKER_ACCOUNT must name the dedicated subscription-worker OS account before execution.");
  }
  const identity = workerIdentity(platform, options);
  const current = identity.account;
  let matches = expected === current;
  if (platform === "win32") {
    const normalizedExpected = normalizeAccount(expected);
    const normalizedCurrent = normalizeAccount(current);
    const [domain, user] = normalizedCurrent.split("\\");
    const machine = (options.hostnameImpl ?? os.hostname)().toLowerCase();
    matches = normalizedExpected.includes("\\")
      ? normalizedExpected === normalizedCurrent
      : normalizedExpected === user && domain === machine;
  }
  const expectedId = environmentValue(env, platform === "win32" ? "DEX_WORKER_SID" : "DEX_WORKER_UID");
  if (!matches || (expectedId !== undefined && String(expectedId).trim() !== identity.id)) {
    throw new Error("Subscription worker must run as the configured dedicated OS account and identity.");
  }
  return { expected, current };
}

export function assertCodexHomeBoundary({
  env = process.env,
  platform = process.platform,
  fsImpl = fs,
  profilePath = environmentValue(env, platform === "win32" ? "USERPROFILE" : "HOME") ?? os.homedir(),
  codexHome = environmentValue(env, "CODEX_HOME"),
} = {}) {
  const configuredProfile = String(profilePath ?? "").trim();
  const configuredCodexHome = String(codexHome ?? "").trim();
  if (!configuredProfile || !path.isAbsolute(configuredProfile)) {
    throw new Error("Worker profile path must be an absolute path.");
  }
  if (!configuredCodexHome || !path.isAbsolute(configuredCodexHome)) {
    throw new Error("CODEX_HOME must be an absolute path inside the dedicated worker profile.");
  }
  const realProfile = fsImpl.realpathSync.native(configuredProfile);
  const realCodexHome = fsImpl.realpathSync.native(configuredCodexHome);
  if (!fsImpl.statSync(realCodexHome).isDirectory()) {
    throw new Error("CODEX_HOME must resolve to a directory.");
  }
  if (!pathInside(realProfile, realCodexHome, platform)) {
    throw new Error("CODEX_HOME must resolve inside the dedicated worker profile and must not reuse a shared personal auth home.");
  }
  return { profilePath: realProfile, codexHome: realCodexHome };
}

function assertRegistryObject(registry) {
  if (!registry || typeof registry !== "object" || Array.isArray(registry)) {
    throw new Error("Dex project registry must be a JSON object.");
  }
  if (registry.schemaVersion !== 1) {
    throw new Error("Dex project registry schemaVersion must be 1.");
  }
  if (!registry.projects || typeof registry.projects !== "object" || Array.isArray(registry.projects)) {
    throw new Error("Dex project registry must contain a projects object.");
  }
}

function normalizeRegistryVerification(entry, projectName) {
  const value = typeof entry === "object" && entry !== null ? entry.verification : undefined;
  if (value === undefined) return null;
  if (!value || typeof value !== "object" || Array.isArray(value) || value.kind !== "file-sha256") {
    throw new Error(`Dex project registry verification for ${projectName} must use kind=file-sha256.`);
  }
  const file = String(value.file ?? "").replaceAll("\\", "/");
  if (
    !VERIFICATION_FILE_PATTERN.test(file)
    || file.startsWith("/")
    || file.includes(":")
    || file.split("/").some(segment => !segment || segment === "." || segment === "..")
  ) {
    throw new Error(`Dex project registry verification file for ${projectName} is invalid.`);
  }
  const expectedSha256 = String(value.expectedSha256 ?? "").trim().toLowerCase();
  if (!SHA256_PATTERN.test(expectedSha256)) {
    throw new Error(`Dex project registry verification SHA-256 for ${projectName} is invalid.`);
  }
  return Object.freeze({ kind: "file-sha256", file, expectedSha256 });
}

export function loadApprovedProjectRegistry({
  env = process.env,
  fsImpl = fs,
  registryPath = environmentValue(env, "DEX_PROJECT_REGISTRY_PATH"),
  registrySha256 = environmentValue(env, "DEX_PROJECT_REGISTRY_SHA256"),
} = {}) {
  const configuredPath = String(registryPath ?? "").trim();
  if (!configuredPath || !path.isAbsolute(configuredPath)) {
    throw new Error("DEX_PROJECT_REGISTRY_PATH must point to an absolute host-local JSON file.");
  }
  const expectedSha256 = String(registrySha256 ?? "").trim().toLowerCase();
  if (!SHA256_PATTERN.test(expectedSha256)) {
    throw new Error("DEX_PROJECT_REGISTRY_SHA256 must pin the approved registry with a 64-character SHA-256 digest.");
  }
  const stat = fsImpl.statSync(configuredPath);
  if (!stat.isFile()) throw new Error("Dex project registry path must be a regular file.");
  if (stat.size > REGISTRY_MAX_BYTES) {
    throw new Error(`Dex project registry exceeds the ${REGISTRY_MAX_BYTES}-byte safety bound.`);
  }
  const registryBytes = fsImpl.readFileSync(configuredPath);
  const actualSha256 = sha256Hex(registryBytes);
  if (!crypto.timingSafeEqual(Buffer.from(actualSha256, "hex"), Buffer.from(expectedSha256, "hex"))) {
    throw new Error("Dex project registry SHA-256 does not match the broker-approved digest.");
  }
  let registry;
  try {
    registry = JSON.parse(registryBytes.toString("utf8"));
  } catch (error) {
    throw new Error(`Dex project registry is not valid JSON: ${error.message}`);
  }
  assertRegistryObject(registry);

  const projects = {};
  const seenRealPaths = new Set();
  for (const [name, entry] of Object.entries(registry.projects)) {
    if (!PROJECT_NAME_PATTERN.test(name)) {
      throw new Error(`Dex project registry contains an invalid project name: ${name}`);
    }
    const configuredProjectPath = typeof entry === "string" ? entry : entry?.path;
    if (typeof configuredProjectPath !== "string" || !path.isAbsolute(configuredProjectPath)) {
      throw new Error(`Dex project registry path for ${name} must be absolute.`);
    }
    const realPath = fsImpl.realpathSync.native(configuredProjectPath);
    const projectStat = fsImpl.statSync(realPath);
    if (!projectStat.isDirectory()) {
      throw new Error(`Dex project registry path for ${name} must resolve to a directory.`);
    }
    const collisionKey = platformPathKey(realPath);
    if (seenRealPaths.has(collisionKey)) {
      throw new Error(`Dex project registry maps multiple project names to the same real path: ${realPath}`);
    }
    seenRealPaths.add(collisionKey);
    projects[name] = Object.freeze({
      path: configuredProjectPath,
      realPath,
      verification: normalizeRegistryVerification(entry, name),
    });
  }
  if (Object.keys(projects).length === 0) {
    throw new Error("Dex project registry must approve at least one project.");
  }
  return Object.freeze({
    schemaVersion: 1,
    registryPath: fsImpl.realpathSync.native(configuredPath),
    registrySha256: actualSha256,
    projects: Object.freeze(projects),
  });
}

function platformPathKey(realPath, platform = process.platform) {
  return platform === "win32" ? realPath.toLowerCase() : realPath;
}

export function resolveApprovedProjectPath(task, registry) {
  if (task?.project && Object.hasOwn(task.project, "localPath")) {
    throw new Error("Task-supplied project.localPath is forbidden; use the host-local approved project registry.");
  }
  const name = String(task?.project?.name ?? "").trim();
  if (!name) throw new Error("Task project.name is required for worker execution.");
  const approved = registry?.projects?.[name];
  if (!approved?.realPath) {
    throw new Error(`Task project ${name} is not present in the approved host-local project registry.`);
  }
  return approved.realPath;
}

function commandResult(command, args, options = {}, spawnSyncImpl = spawnSync) {
  const result = spawnSyncImpl(command, args, {
    encoding: "utf8",
    windowsHide: true,
    shell: false,
    ...options,
  });
  return {
    status: result?.status,
    errorCode: result?.error?.code ?? null,
    stdout: String(result?.stdout ?? ""),
    stderr: String(result?.stderr ?? ""),
  };
}

function privateSshKeys(homePath, fsImpl = fs) {
  const sshDir = path.join(homePath, ".ssh");
  if (!fsImpl.existsSync(sshDir)) return [];
  return fsImpl.readdirSync(sshDir, { withFileTypes: true })
    .filter(entry => entry.isFile())
    .map(entry => entry.name)
    .filter(name => !name.endsWith(".pub") && !PRIVATE_KEY_EXCLUSIONS.has(name.toLowerCase()));
}

export function inspectBrokerOnlyCredentialBoundary({
  env = process.env,
  platform = process.platform,
  fsImpl = fs,
  spawnSyncImpl = spawnSync,
  homePath = environmentValue(env, "USERPROFILE") ?? environmentValue(env, "HOME") ?? os.homedir(),
} = {}) {
  const forbiddenEnv = nonEmptyEnvironmentNames(FORBIDDEN_CREDENTIAL_ENV, env);
  const globalHelper = commandResult("git", ["config", "--global", "--get-all", "credential.helper"], {}, spawnSyncImpl);
  const systemHelper = commandResult("git", ["config", "--system", "--get-all", "credential.helper"], {}, spawnSyncImpl);
  const gh = commandResult("gh", ["auth", "status"], { env }, spawnSyncImpl);
  const sshKeys = privateSshKeys(String(homePath), fsImpl);

  let windowsCredentialTargets = 0;
  if (platform === "win32") {
    const cmdkey = commandResult("cmdkey.exe", ["/list"], {}, spawnSyncImpl);
    if (cmdkey.status === 0) {
      windowsCredentialTargets = (cmdkey.stdout.match(/github(?:\.com)?|git:https:\/\/github\.com/gi) ?? []).length;
    }
  }

  const globalCredentialHelpers = globalHelper.status === 0
    ? globalHelper.stdout.split(/\r?\n/).map(value => value.trim()).filter(Boolean)
    : [];
  const systemCredentialHelpers = systemHelper.status === 0
    ? systemHelper.stdout.split(/\r?\n/).map(value => value.trim()).filter(Boolean)
    : [];
  const ghAuthenticated = gh.status === 0;

  const reasons = [];
  if (forbiddenEnv.length) reasons.push(`credential environment present: ${forbiddenEnv.join(", ")}`);
  if (globalCredentialHelpers.length) reasons.push("global Git credential helper configured for worker account");
  if (ghAuthenticated) reasons.push("GitHub CLI is authenticated for worker account");
  if (sshKeys.length) reasons.push("private SSH key files exist in worker profile");
  if (windowsCredentialTargets > 0) reasons.push("GitHub-related Windows Credential Manager targets exist for worker account");

  return {
    safe: reasons.length === 0,
    reasons,
    details: {
      forbiddenCredentialEnvironmentCount: forbiddenEnv.length,
      globalCredentialHelperCount: globalCredentialHelpers.length,
      systemCredentialHelperCount: systemCredentialHelpers.length,
      ghAuthenticated,
      sshPrivateKeyFileCount: sshKeys.length,
      windowsGitHubCredentialTargetCount: windowsCredentialTargets,
    },
  };
}

export function assertBrokerOnlyCredentialBoundary(options = {}) {
  const result = inspectBrokerOnlyCredentialBoundary(options);
  if (!result.safe) {
    throw new Error(`Subscription worker credential boundary is not broker-only: ${result.reasons.join("; ")}.`);
  }
  return result;
}

export function assertSafeWorkerResult(result) {
  const serialized = JSON.stringify(result) ?? "";
  const findings = findSecretKinds(serialized);
  if (findings.length) {
    throw new Error(`Worker result blocked by output secret scan: ${findings.join(", ")}.`);
  }
  return result;
}
