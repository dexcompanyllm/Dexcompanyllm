import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import test from "node:test";
import { buildSubscriptionWorkerEnvironment } from "../packages/core/src/policy.mjs";
import {
  resolveCodexCli,
  spawnCodexCli,
} from "../workers/openai-codex/src/adapter.mjs";
import {
  assertClaudeSubscriptionAuthStatus,
  ClaudeSubscriptionAdapter,
  resolveClaudeCli,
  spawnClaudeCli,
} from "../workers/anthropic-claude/src/adapter.mjs";

function captureSpawn() {
  const calls = [];
  return {
    calls,
    spawnImpl(command, args, options) {
      calls.push({ command, args, options });
      return { command, args, options };
    },
  };
}

function collectChild(child) {
  return new Promise((resolve, reject) => {
    let stdout = "";
    let stderr = "";
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", chunk => stdout += chunk);
    child.stderr.on("data", chunk => stderr += chunk);
    child.once("error", reject);
    child.once("exit", code => resolve({ code, stdout, stderr }));
  });
}

test("subscription worker environment fails closed for ambiguous or invalid input", () => {
  assert.throws(
    () => buildSubscriptionWorkerEnvironment("unknown", {}),
    /unknown subscription worker provider/i,
  );
  assert.throws(
    () => buildSubscriptionWorkerEnvironment("openai", { PATH: "one", Path: "two" }),
    /duplicate case-insensitive/i,
  );
  assert.throws(
    () => buildSubscriptionWorkerEnvironment("openai", { PATH: "safe\0unsafe" }),
    /NUL-free string/i,
  );
});

test("Codex worker executes an npm Windows shim through Node without a shell", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-codex-cli-"));
  const entry = path.join(root, "node_modules", "@openai", "codex", "bin", "codex.js");
  fs.mkdirSync(path.dirname(entry), { recursive: true });
  fs.writeFileSync(path.join(root, "codex.cmd"), "@echo off\r\n", "utf8");
  fs.writeFileSync(entry, "", "utf8");

  try {
    assert.deepEqual(
      resolveCodexCli({
        env: { PATH: root },
        platform: "win32",
        nodeExecutable: process.execPath,
      }),
      { command: process.execPath, prefixArgs: [entry] },
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Codex worker keeps arguments literal and passes only an allowlisted environment", () => {
  const dangerous = "status & node -e \"process.exit(99)\" | whoami";
  const capture = captureSpawn();
  spawnCodexCli(["app-server", "--stdio", dangerous], {
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
    nodeExecutable: "C:\\safe\\node.exe",
    resolveCli: () => ({ command: "C:\\safe\\node.exe", prefixArgs: ["C:\\safe\\codex.js"] }),
    spawnImpl: capture.spawnImpl,
  });

  assert.equal(capture.calls.length, 1);
  assert.equal(capture.calls[0].options.shell, false);
  assert.deepEqual(capture.calls[0].args, ["C:\\safe\\codex.js", "app-server", "--stdio", dangerous]);
  assert.deepEqual(
    Object.keys(capture.calls[0].options.env).sort(),
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

test("Codex worker passes metacharacters literally to a real child process", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-codex-argv-"));
  const entry = path.join(root, "codex.mjs");
  const marker = path.join(root, "injected.txt");
  fs.writeFileSync(entry, "process.stdout.write(JSON.stringify(process.argv.slice(2)));\n", "utf8");
  const markerLiteral = marker.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
  const dangerous = `safe & "${process.execPath}" -e "require('fs').writeFileSync('${markerLiteral}','owned')"`;

  try {
    const child = spawnCodexCli(["app-server", dangerous], {
      env: { ...process.env, DEX_CODEX_CLI_PATH: entry },
    });
    const result = await collectChild(child);
    assert.equal(result.code, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout), ["app-server", dangerous]);
    assert.equal(fs.existsSync(marker), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Windows-only required variables do not expand the POSIX worker allowlist", () => {
  const parentEnvironment = {
    PATH: "/usr/bin",
    CODEX_HOME: "/home/worker/.codex",
    LOGONSERVER: "must-not-propagate",
    SYSTEMDRIVE: "must-not-propagate",
    USERDOMAIN: "must-not-propagate",
  };

  assert.deepEqual(
    Object.keys(buildSubscriptionWorkerEnvironment("openai", parentEnvironment, "linux")).sort(),
    ["PATH", "CODEX_HOME"].sort(),
  );
  assert.deepEqual(
    Object.keys(buildSubscriptionWorkerEnvironment("openai", parentEnvironment, "win32")).sort(),
    ["PATH", "CODEX_HOME", "LOGONSERVER", "SYSTEMDRIVE", "USERDOMAIN"].sort(),
  );
});

test("subscription worker environment suppresses Node forced coverage propagation", () => {
  const childEnvironment = buildSubscriptionWorkerEnvironment("openai", {
    PATH: "C:\\safe",
    NODE_V8_COVERAGE: "C:\\untrusted-coverage",
  });

  assert.equal(Object.hasOwn(childEnvironment, "NODE_V8_COVERAGE"), true);
  assert.equal(childEnvironment.NODE_V8_COVERAGE, undefined);
  assert.equal(Object.keys(childEnvironment).includes("NODE_V8_COVERAGE"), false);
});

test("subscription worker fails closed under the Node permission model", async () => {
  const policyUrl = new URL("../packages/core/src/policy.mjs", import.meta.url).href;
  const probe = `
    const { buildSubscriptionWorkerEnvironment } = await import(${JSON.stringify(policyUrl)});
    let blocked = false;
    try {
      buildSubscriptionWorkerEnvironment("openai", { PATH: process.env.PATH ?? "" }, process.platform);
    } catch (error) {
      blocked = /permission model/i.test(error.message);
    }
    process.stdout.write(JSON.stringify({ blocked }));
  `;
  const child = spawn(process.execPath, [
    "--permission",
    `--allow-fs-read=${path.resolve("packages/core/src")}`,
    "--input-type=module",
    "--no-warnings",
    "-e",
    probe,
  ], {
    cwd: process.cwd(),
    env: { ...process.env },
    shell: false,
    stdio: ["ignore", "pipe", "pipe"],
  });

  const result = await collectChild(child);
  assert.equal(result.code, 0, result.stderr);
  assert.deepEqual(JSON.parse(result.stdout), { blocked: true });
});

test("Codex worker real Windows child receives only the explicit OS/profile allowlist", {
  skip: process.platform !== "win32",
}, async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-codex-env-"));
  const entry = path.join(root, "codex.mjs");
  fs.writeFileSync(entry, "process.stdout.write(JSON.stringify(Object.keys(process.env).sort()));\n", "utf8");

  const forbidden = [
    "DEX_CHILD_ENV_CANARY",
    "GITHUB_TOKEN",
    "REDIS_URL",
    "OAUTH_CLIENT_SECRET",
    "HTTPS_PROXY",
    "GIT_SSH_COMMAND",
    "SSH_AUTH_SOCK",
    "CUSTOM_SECRET",
    "NODE_OPTIONS",
    "NODE_V8_COVERAGE",
    "OPENAI_API_KEY",
  ];
  const allowed = new Set([
    "PATH", "PATHEXT", "SYSTEMROOT", "WINDIR", "COMSPEC", "TEMP", "TMP", "TMPDIR",
    "HOME", "USERPROFILE", "HOMEDRIVE", "HOMEPATH", "APPDATA", "LOCALAPPDATA",
    "PROGRAMDATA", "PROGRAMFILES", "PROGRAMFILES(X86)", "PROGRAMW6432", "USER", "USERNAME",
    "USERDOMAIN", "LOGONSERVER", "LOGNAME", "LANG", "LC_ALL", "LC_CTYPE", "TZ", "TERM",
    "COLORTERM", "NO_COLOR", "FORCE_COLOR", "SHELL", "XDG_CONFIG_HOME", "XDG_CACHE_HOME",
    "XDG_DATA_HOME", "XDG_STATE_HOME", "OS", "SYSTEMDRIVE", "PROCESSOR_ARCHITECTURE",
    "NUMBER_OF_PROCESSORS", "CODEX_HOME",
  ].map(name => name.toLowerCase()));

  const originalCoverage = process.env.NODE_V8_COVERAGE;
  try {
    process.env.NODE_V8_COVERAGE = path.join(root, "coverage-canary");
    const env = {
      ...process.env,
      DEX_CODEX_CLI_PATH: entry,
      CODEX_HOME: path.join(root, ".codex"),
    };
    for (const name of forbidden) env[name] = "secret-canary";

    const result = await collectChild(spawnCodexCli([], { env }));
    assert.equal(result.code, 0, result.stderr);
    const names = JSON.parse(result.stdout);
    const normalized = names.map(name => name.toLowerCase());
    assert.deepEqual(
      forbidden.filter(name => normalized.includes(name.toLowerCase())),
      [],
    );
    assert.deepEqual(
      names.filter(name => !allowed.has(name.toLowerCase())),
      [],
    );
    assert.equal(normalized.includes("codex_home"), true);
  } finally {
    if (originalCoverage === undefined) delete process.env.NODE_V8_COVERAGE;
    else process.env.NODE_V8_COVERAGE = originalCoverage;
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Claude worker executes an npm Windows shim through Node without a shell", () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-claude-cli-"));
  const entry = path.join(root, "node_modules", "@anthropic-ai", "claude-code", "cli.js");
  fs.mkdirSync(path.dirname(entry), { recursive: true });
  fs.writeFileSync(path.join(root, "claude.cmd"), "@echo off\r\n", "utf8");
  fs.writeFileSync(entry, "", "utf8");

  try {
    assert.deepEqual(
      resolveClaudeCli({
        env: { PATH: root },
        platform: "win32",
        nodeExecutable: process.execPath,
      }),
      { command: process.execPath, prefixArgs: [entry] },
    );
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Claude worker keeps a prompt literal and passes only an allowlisted environment", () => {
  const dangerous = "review this & powershell -Command Remove-Item marker | whoami";
  const capture = captureSpawn();
  spawnClaudeCli(["-p", dangerous, "--output-format", "json"], {
    cwd: process.cwd(),
    env: {
      PATH: "C:\\safe",
      SystemRoot: "C:\\Windows",
      SYSTEMDRIVE: "C:",
      TEMP: "C:\\Temp",
      HOME: "C:\\Users\\worker",
      LOGONSERVER: "\\\\WORKER-HOST",
      USERDOMAIN: "WORKER-HOST",
      CLAUDE_CONFIG_DIR: "C:\\Users\\worker\\.claude",
      ANTHROPIC_API_KEY: "secret-canary",
      Anthropic_Base_Url: "https://external.invalid",
      CLAUDE_CODE_OAUTH_TOKEN: "secret-canary",
      GitHub_App_Client_Secret: "replace_me",
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
    nodeExecutable: "C:\\safe\\node.exe",
    resolveCli: () => ({ command: "C:\\safe\\node.exe", prefixArgs: ["C:\\safe\\claude.js"] }),
    spawnImpl: capture.spawnImpl,
  });

  assert.equal(capture.calls.length, 1);
  assert.equal(capture.calls[0].options.shell, false);
  assert.deepEqual(capture.calls[0].args, [
    "C:\\safe\\claude.js",
    "-p",
    dangerous,
    "--output-format",
    "json",
  ]);
  assert.deepEqual(
    Object.keys(capture.calls[0].options.env).sort(),
    [
      "PATH",
      "SystemRoot",
      "SYSTEMDRIVE",
      "TEMP",
      "HOME",
      "LOGONSERVER",
      "USERDOMAIN",
      "CLAUDE_CONFIG_DIR",
    ].sort(),
  );
});

test("Claude worker passes a command-injection prompt literally to a real child process", async () => {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), "dex-claude-argv-"));
  const entry = path.join(root, "claude.mjs");
  const marker = path.join(root, "injected.txt");
  fs.writeFileSync(entry, "process.stdout.write(JSON.stringify(process.argv.slice(2)));\n", "utf8");
  const markerLiteral = marker.replaceAll("\\", "\\\\").replaceAll("'", "\\'");
  const dangerous = `review & "${process.execPath}" -e "require('fs').writeFileSync('${markerLiteral}','owned')"`;

  try {
    const child = spawnClaudeCli(["-p", dangerous, "--output-format", "json"], {
      env: { ...process.env, DEX_CLAUDE_CLI_PATH: entry },
    });
    const result = await collectChild(child);
    assert.equal(result.code, 0, result.stderr);
    assert.deepEqual(JSON.parse(result.stdout), ["-p", dangerous, "--output-format", "json"]);
    assert.equal(fs.existsSync(marker), false);
  } finally {
    fs.rmSync(root, { recursive: true, force: true });
  }
});

test("Claude missing CLI error gives a subscription-safe path diagnostic", () => {
  assert.throws(
    () => resolveClaudeCli({ env: { PATH: "" }, platform: "win32" }),
    error => error instanceof Error
      && error.message.includes("DEX_CLAUDE_CLI_PATH")
      && error.message.includes("subscription CLI")
      && error.message.includes("API keys are not used"),
  );
});

test("Claude auth status accepts only first-party stored subscription credentials", () => {
  assert.deepEqual(
    assertClaudeSubscriptionAuthStatus({
      loggedIn: true,
      authMethod: "claude.ai",
      apiProvider: "firstParty",
      subscriptionType: "max",
    }),
    { authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "max" },
  );
  assert.throws(
    () => assertClaudeSubscriptionAuthStatus({
      loggedIn: true,
      authMethod: "oauth_token",
      apiProvider: "firstParty",
    }, { env: { CLAUDE_CODE_OAUTH_TOKEN: "secret-canary" } }),
    /subscription/i,
  );

  for (const status of [
    { loggedIn: false, authMethod: "none", apiProvider: "firstParty" },
    { loggedIn: true, authMethod: "api_key", apiProvider: "firstParty" },
    { loggedIn: true, authMethod: "oauth_token", apiProvider: "firstParty" },
    { loggedIn: true, authMethod: "oauth_token", apiProvider: "firstParty", apiKeySource: "profile" },
    { loggedIn: true, authMethod: "claude.ai", apiProvider: "bedrock" },
    { loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: null },
    { loggedIn: true, authMethod: "claude.ai", apiProvider: "firstParty", subscriptionType: "api" },
    {
      loggedIn: true,
      authMethod: "claude.ai",
      apiProvider: "firstParty",
      subscriptionType: "max",
      apiKeySource: "/login managed key",
    },
    {
      loggedIn: true,
      authMethod: "claude.ai",
      apiProvider: "firstParty",
      subscriptionType: "max",
      forcedLoginMethod: "console",
    },
  ]) {
    assert.throws(
      () => assertClaudeSubscriptionAuthStatus(status, { env: {} }),
      /subscription/i,
    );
  }
});

test("Claude worker verifies subscription auth immediately before inference", async () => {
  const calls = [];
  const adapter = new ClaudeSubscriptionAdapter({
    env: {},
    async runProcessImpl(args) {
      calls.push(args);
      if (args[0] === "auth") {
        return {
          stdout: JSON.stringify({
            loggedIn: true,
            authMethod: "claude.ai",
            apiProvider: "firstParty",
            subscriptionType: "pro",
          }),
          stderr: "",
        };
      }
      return { stdout: JSON.stringify({ result: "ok" }), stderr: "" };
    },
  });

  const result = await adapter.run({ cwd: process.cwd(), prompt: "safe prompt" });
  assert.deepEqual(calls, [
    ["auth", "status"],
    ["-p", "safe prompt", "--output-format", "json"],
  ]);
  assert.deepEqual(result.output, { result: "ok" });
});

test("Claude worker refuses inference when active auth is not subscription-backed", async () => {
  const calls = [];
  const adapter = new ClaudeSubscriptionAdapter({
    env: {},
    async runProcessImpl(args) {
      calls.push(args);
      return {
        stdout: JSON.stringify({ loggedIn: true, authMethod: "api_key", apiProvider: "firstParty" }),
        stderr: "",
      };
    },
  });

  await assert.rejects(
    () => adapter.run({ cwd: process.cwd(), prompt: "must not run" }),
    /not a verified Claude subscription login/i,
  );
  assert.deepEqual(calls, [["auth", "status"]]);
});
