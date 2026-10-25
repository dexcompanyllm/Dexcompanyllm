import assert from "node:assert/strict";
import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import {
  assertBrokerOnlyCredentialBoundary,
  assertCodexHomeBoundary,
  assertDedicatedWorkerAccount,
  assertSafeWorkerResult,
  inspectBrokerOnlyCredentialBoundary,
  loadApprovedProjectRegistry,
  resolveApprovedProjectPath,
} from "../workers/host-security.mjs";

function withTempRoot(run) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-host-security-"));
  try { return run(root); }
  finally { fs.rmSync(root, { recursive: true, force: true }); }
}

function writeRegistry(registryPath, payload) {
  const content = JSON.stringify(payload);
  fs.writeFileSync(registryPath, content, "utf8");
  return crypto.createHash("sha256").update(content).digest("hex");
}

function spawnFixture({ ghStatus = 1, globalHelper = "", systemHelper = "manager-core", cmdkey = "" } = {}) {
  return (command, args) => {
    const joined = `${command} ${args.join(" ")}`;
    if (joined === "gh auth status") return { status: ghStatus, stdout: "", stderr: "" };
    if (joined === "git config --global --get-all credential.helper") {
      return { status: globalHelper ? 0 : 1, stdout: globalHelper, stderr: "" };
    }
    if (joined === "git config --system --get-all credential.helper") {
      return { status: systemHelper ? 0 : 1, stdout: systemHelper, stderr: "" };
    }
    if (joined === "cmdkey.exe /list") return { status: 0, stdout: cmdkey, stderr: "" };
    return { status: 1, stdout: "", stderr: "", error: { code: "ENOENT" } };
  };
}

function windowsIdentity(account = "LOCAL-PC\\DexWorker", id = "S-1-5-21-123-1001") {
  return {
    systemRoot: "C:\\Windows",
    hostnameImpl: () => "LOCAL-PC",
    spawnSyncImpl(command, args, options) {
      assert.equal(command, "C:\\Windows\\System32\\WindowsPowerShell\\v1.0\\powershell.exe");
      assert.deepEqual(args.slice(0, 3), ["-NoProfile", "-NonInteractive", "-Command"]);
      assert.equal(options.shell, false);
      assert.equal(options.timeout, 5000);
      return { status: 0, stdout: JSON.stringify({ account, id }) };
    },
  };
}

test("worker identity comes from the OS and qualified Windows domains must match", () => {
  const env = { USERNAME: "forged", USERDOMAIN: "forged", DEX_WORKER_ACCOUNT: "dexworker" };
  assert.deepEqual(assertDedicatedWorkerAccount(env, "win32", windowsIdentity()),
    { expected: "dexworker", current: "LOCAL-PC\\DexWorker" });
  assert.throws(() => assertDedicatedWorkerAccount({
    ...env, DEX_WORKER_ACCOUNT: "APPROVED\\DexWorker",
  }, "win32", windowsIdentity("DIFFERENT\\DexWorker")), /dedicated OS account/);
  assert.throws(() => assertDedicatedWorkerAccount(env, "win32", windowsIdentity("DOMAIN\\DexWorker")),
    /dedicated OS account/);
  assert.doesNotThrow(() => assertDedicatedWorkerAccount({
    ...env, DEX_WORKER_ACCOUNT: "DOMAIN\\DexWorker", DEX_WORKER_SID: "S-1-5-21-123-1001",
  }, "win32", windowsIdentity("DOMAIN\\DexWorker")));
  assert.throws(() => assertDedicatedWorkerAccount({
    ...env, DEX_WORKER_SID: "S-1-5-21-123-1002",
  }, "win32", windowsIdentity()), /dedicated OS account/);
  assert.throws(() => assertDedicatedWorkerAccount({}, "win32", windowsIdentity()), /DEX_WORKER_ACCOUNT/);
});

test("Windows identity lookup failure never falls back to environment usernames", () => {
  const env = { USERNAME: "DexWorker", DEX_WORKER_ACCOUNT: "DexWorker" };
  for (const result of [{ status: 1 }, { status: 0, stdout: "not json" },
    { status: 0, stdout: '{"account":"LOCAL-PC\\\\DexWorker","id":"bad"}' }]) {
    assert.throws(() => assertDedicatedWorkerAccount(env, "win32", {
      ...windowsIdentity(), spawnSyncImpl: () => result,
    }), /identity/);
  }
});

test("macOS and other POSIX workers use effective UID and preserve account case", () => {
  const env = { USER: "forged", LOGNAME: "forged", DEX_WORKER_ACCOUNT: "DexWorker", DEX_WORKER_UID: "501" };
  const options = { userInfoImpl: () => ({ username: "DexWorker", uid: 501 }) };
  assert.deepEqual(assertDedicatedWorkerAccount(env, "darwin", options),
    { expected: "DexWorker", current: "DexWorker" });
  assert.throws(() => assertDedicatedWorkerAccount({ ...env, DEX_WORKER_ACCOUNT: "dexworker" }, "darwin", options),
    /dedicated OS account/);
  assert.throws(() => assertDedicatedWorkerAccount({ ...env, DEX_WORKER_UID: "502" }, "darwin", options),
    /dedicated OS account/);
  assert.throws(() => assertDedicatedWorkerAccount(env, "darwin", {
    userInfoImpl: () => ({ username: "DexWorker", uid: -1 }),
  }), /OS worker identity/);
});

test("Codex auth home must live inside the dedicated worker profile", () => withTempRoot(root => {
  const profile = path.join(root, "worker-profile");
  const codexHome = path.join(profile, "AppData", "Local", "DexCompany", "Codex");
  const sharedHome = path.join(root, "shared-codex");
  fs.mkdirSync(codexHome, { recursive: true });
  fs.mkdirSync(sharedHome, { recursive: true });

  assert.equal(
    assertCodexHomeBoundary({ profilePath: profile, codexHome, platform: process.platform }).codexHome,
    fs.realpathSync.native(codexHome),
  );
  assert.throws(
    () => assertCodexHomeBoundary({ profilePath: profile, codexHome: sharedHome, platform: process.platform }),
    /inside the dedicated worker profile/i,
  );
}));

test("approved project registry resolves only broker-pinned real paths", () => withTempRoot(root => {
  const project = path.join(root, "project");
  fs.mkdirSync(project);
  const registryPath = path.join(root, "registry.json");
  const registrySha256 = writeRegistry(registryPath, {
    schemaVersion: 1,
    projects: {
      "Company-Ops": { path: project },
    },
  });

  const registry = loadApprovedProjectRegistry({ registryPath, registrySha256 });
  assert.equal(registry.registrySha256, registrySha256);
  assert.equal(registry.projects["Company-Ops"].realPath, fs.realpathSync.native(project));
  assert.equal(
    resolveApprovedProjectPath({ project: { name: "Company-Ops" } }, registry),
    fs.realpathSync.native(project),
  );
  assert.throws(
    () => resolveApprovedProjectPath({ project: { name: "Company-Ops", localPath: root } }, registry),
    /localPath is forbidden/i,
  );
  assert.throws(
    () => resolveApprovedProjectPath({ project: { name: "Unknown" } }, registry),
    /not present/i,
  );
}));

test("project registry rejects duplicate real paths, missing pins, mismatched pins, and relative input", () => withTempRoot(root => {
  const project = path.join(root, "project");
  fs.mkdirSync(project);
  const registryPath = path.join(root, "registry.json");
  const registrySha256 = writeRegistry(registryPath, {
    schemaVersion: 1,
    projects: {
      One: { path: project },
      Two: { path: project },
    },
  });
  assert.throws(() => loadApprovedProjectRegistry({ registryPath, registrySha256 }), /same real path/i);
  assert.throws(() => loadApprovedProjectRegistry({ env: {}, registryPath }), /DEX_PROJECT_REGISTRY_SHA256/i);
  assert.throws(
    () => loadApprovedProjectRegistry({ registryPath, registrySha256: "0".repeat(64) }),
    /does not match/i,
  );
  assert.throws(
    () => loadApprovedProjectRegistry({ registryPath: "relative.json", registrySha256 }),
    /absolute host-local JSON/i,
  );
  const unsafeVerificationSha = writeRegistry(registryPath, {
    schemaVersion: 1,
    projects: {
      One: {
        path: project,
        verification: {
          kind: "file-sha256",
          file: "../escape.txt",
          expectedSha256: "a".repeat(64),
        },
      },
    },
  });
  assert.throws(
    () => loadApprovedProjectRegistry({ registryPath, registrySha256: unsafeVerificationSha }),
    /verification file/i,
  );
}));

test("broker-only credential preflight tolerates a system helper but rejects user credentials", () => withTempRoot(root => {
  fs.mkdirSync(path.join(root, ".ssh"));
  const safe = inspectBrokerOnlyCredentialBoundary({
    env: {},
    platform: "win32",
    homePath: root,
    spawnSyncImpl: spawnFixture(),
  });
  assert.equal(safe.safe, true);
  assert.equal(safe.details.systemCredentialHelperCount, 1);
  assert.equal(safe.details.globalCredentialHelperCount, 0);
  assert.equal(safe.details.ghAuthenticated, false);

  const unsafe = inspectBrokerOnlyCredentialBoundary({
    env: { GH_TOKEN: "secret" },
    platform: "win32",
    homePath: root,
    spawnSyncImpl: spawnFixture({
      ghStatus: 0,
      globalHelper: "!gh auth git-credential",
      cmdkey: "Target: LegacyGeneric:target=git:https://github.com",
    }),
  });
  assert.equal(unsafe.safe, false);
  assert.match(unsafe.reasons.join(" "), /GitHub CLI/i);
  assert.match(unsafe.reasons.join(" "), /credential environment/i);
  assert.throws(
    () => assertBrokerOnlyCredentialBoundary({
      env: { GH_TOKEN: "secret" },
      platform: "win32",
      homePath: root,
      spawnSyncImpl: spawnFixture({ ghStatus: 0 }),
    }),
    /not broker-only/i,
  );

  const appSecretName = ["GITHUB", "APP", "CLIENT", "SECRET"].join("_");
  assert.equal(inspectBrokerOnlyCredentialBoundary({
    env: { [appSecretName]: "test_fixture" },
    platform: "win32",
    homePath: root,
    spawnSyncImpl: spawnFixture(),
  }).safe, false);
}));

test("worker result secret scan fails closed without echoing the credential", () => {
  const safe = { finalText: "completed", eventCount: 3 };
  assert.equal(assertSafeWorkerResult(safe), safe);
  const fakeCredential = ["sk", "proj", "abcdefghijklmnopqrstuvwxyz0123456789"].join("-");
  assert.throws(
    () => assertSafeWorkerResult({ finalText: fakeCredential }),
    /output secret scan: openai-api-key/i,
  );
});
