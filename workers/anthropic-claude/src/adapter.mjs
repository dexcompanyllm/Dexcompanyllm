import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  assertSubscriptionOnlyEnvironment,
  buildSubscriptionWorkerEnvironment,
  redact,
} from "../../../packages/core/src/policy.mjs";

const CLAUDE_CLI_PATH_ENV = "DEX_CLAUDE_CLI_PATH";
const CLAUDE_PACKAGE_ENTRY = path.join("node_modules", "@anthropic-ai", "claude-code", "cli.js");
const WINDOWS_DIRECT_EXTENSIONS = new Set([".exe", ".com"]);
const WINDOWS_SHIM_EXTENSIONS = new Set([".cmd", ".bat", ".ps1"]);
const WINDOWS_PATH_EXTENSIONS = [".exe", ".com", ".cmd", ".bat", ".ps1", ".js", ".mjs"];
const CLAUDE_SUBSCRIPTION_AUTH_METHOD = "claude.ai";
const CLAUDE_SUBSCRIPTION_TYPES = new Set(["pro", "max", "team", "enterprise"]);

function environmentValue(env, name) {
  const key = Object.keys(env).find(candidate => candidate.toLowerCase() === name.toLowerCase());
  return key ? env[key] : undefined;
}

export function assertClaudeSubscriptionAuthStatus(rawStatus, { env = process.env } = {}) {
  let status;
  try {
    status = typeof rawStatus === "string" ? JSON.parse(rawStatus) : rawStatus;
  } catch {
    throw new Error("Claude subscription authentication status was not valid JSON.");
  }

  if (!status || typeof status !== "object" || Array.isArray(status)) {
    throw new Error("Claude subscription authentication status was invalid.");
  }
  if (status.loggedIn !== true) {
    throw new Error("Claude subscription login is required before this worker can run.");
  }

  const authMethod = String(status.authMethod ?? "").trim();
  const apiProvider = String(status.apiProvider ?? "").trim();
  const subscriptionType = typeof status.subscriptionType === "string"
    ? status.subscriptionType.trim().toLowerCase()
    : null;
  const apiKeySourceAbsent = !Object.hasOwn(status, "apiKeySource") || status.apiKeySource === null;
  const forcedLoginMethodAllowed = !Object.hasOwn(status, "forcedLoginMethod")
    || status.forcedLoginMethod === null
    || status.forcedLoginMethod === "claudeai";
  const subscriptionLogin = authMethod === CLAUDE_SUBSCRIPTION_AUTH_METHOD
    && CLAUDE_SUBSCRIPTION_TYPES.has(subscriptionType)
    && apiKeySourceAbsent;
  if (apiProvider !== "firstParty" || !forcedLoginMethodAllowed || !subscriptionLogin) {
    throw new Error(
      "Claude worker refused to run because the active credential is not a verified Claude subscription login."
    );
  }

  return {
    authMethod,
    apiProvider,
    subscriptionType,
  };
}

function isFile(filePath) {
  try {
    return fs.statSync(filePath).isFile();
  } catch {
    return false;
  }
}

function shellFreeWindowsSpec(candidate, nodeExecutable) {
  const extension = path.extname(candidate).toLowerCase();
  if (WINDOWS_DIRECT_EXTENSIONS.has(extension)) {
    return { command: candidate, prefixArgs: [] };
  }
  if (extension === ".js" || extension === ".mjs") {
    return { command: nodeExecutable, prefixArgs: [candidate] };
  }
  if (WINDOWS_SHIM_EXTENSIONS.has(extension)) {
    const packageEntry = path.join(path.dirname(candidate), CLAUDE_PACKAGE_ENTRY);
    if (isFile(packageEntry)) {
      return { command: nodeExecutable, prefixArgs: [packageEntry] };
    }
  }
  return null;
}

function claudeCliDiagnostic() {
  return "Claude subscription CLI was not found. Install and sign in to Claude Code, add it to PATH, or set DEX_CLAUDE_CLI_PATH to an absolute claude executable or cli.js path. API keys are not used.";
}

export function resolveClaudeCli({
  env = process.env,
  platform = process.platform,
  nodeExecutable = process.execPath,
} = {}) {
  const override = environmentValue(env, CLAUDE_CLI_PATH_ENV);
  if (override) {
    if (!path.isAbsolute(override) || !isFile(override)) {
      throw new Error(`${CLAUDE_CLI_PATH_ENV} must point to an existing absolute file.`);
    }
    const overrideExtension = path.extname(override).toLowerCase();
    if (overrideExtension === ".js" || overrideExtension === ".mjs") {
      return { command: nodeExecutable, prefixArgs: [override] };
    }
    if (platform !== "win32") return { command: override, prefixArgs: [] };
    const spec = shellFreeWindowsSpec(override, nodeExecutable);
    if (spec) return spec;
    throw new Error(`${CLAUDE_CLI_PATH_ENV} must point to a shell-free .exe, .com, .js, or .mjs file, or to the official npm shim.`);
  }

  const pathValue = environmentValue(env, "PATH") ?? "";
  const delimiter = platform === "win32" ? ";" : ":";
  const directories = pathValue
    .split(delimiter)
    .map(directory => directory.trim().replace(/^"|"$/g, ""))
    .filter(Boolean);

  if (platform === "win32") {
    for (const directory of directories) {
      for (const extension of WINDOWS_PATH_EXTENSIONS) {
        const candidate = path.join(directory, `claude${extension}`);
        if (!isFile(candidate)) continue;
        const spec = shellFreeWindowsSpec(candidate, nodeExecutable);
        if (spec) return spec;
      }
    }
  } else {
    for (const directory of directories) {
      const candidate = path.join(directory, "claude");
      if (isFile(candidate)) return { command: candidate, prefixArgs: [] };
    }
  }

  throw new Error(claudeCliDiagnostic());
}

export function spawnClaudeCli(args, {
  cwd = process.cwd(),
  env = process.env,
  platform = process.platform,
  nodeExecutable = process.execPath,
  resolveCli = resolveClaudeCli,
  spawnImpl = spawn,
} = {}) {
  const { command, prefixArgs } = resolveCli({ env, platform, nodeExecutable });
  const childEnv = buildSubscriptionWorkerEnvironment("anthropic", env, platform);
  return spawnImpl(command, [...prefixArgs, ...args], {
    cwd,
    shell: false,
    env: childEnv,
    stdio: ["pipe", "pipe", "pipe"],
  });
}

function claudeLaunchError(error) {
  if (["ENOENT", "EACCES", "EPERM"].includes(error?.code)) {
    return new Error(claudeCliDiagnostic(), { cause: error });
  }
  return error;
}

function runProcess(args, { cwd = process.cwd(), input = null, timeoutMs = 30 * 60_000 } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawnClaudeCli(args, { cwd });
    let stdout = "";
    let stderr = "";
    const timer = setTimeout(() => { child.kill(); reject(new Error("Claude worker timed out.")); }, timeoutMs);
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", chunk => stdout += chunk);
    child.stderr.on("data", chunk => stderr += redact(chunk));
    child.on("error", error => { clearTimeout(timer); reject(claudeLaunchError(error)); });
    child.on("exit", code => {
      clearTimeout(timer);
      if (code === 0) resolve({ stdout, stderr, code });
      else reject(new Error(`Claude exited with code ${code}: ${stderr}`));
    });
    if (input) child.stdin.write(input);
    child.stdin.end();
  });
}

export class ClaudeSubscriptionAdapter {
  constructor({ runProcessImpl = runProcess, env = process.env } = {}) {
    this.runProcessImpl = runProcessImpl;
    this.env = env;
  }

  async subscriptionStatus() {
    const result = await this.runProcessImpl(["auth", "status"], { timeoutMs: 20_000 });
    return assertClaudeSubscriptionAuthStatus(result.stdout, { env: this.env });
  }

  async status() {
    assertSubscriptionOnlyEnvironment("anthropic");
    const subscription = await this.subscriptionStatus();
    const version = await this.runProcessImpl(["--version"], { timeoutMs: 20_000 });
    return {
      provider: "anthropic",
      authMode: "claude-subscription",
      authMethod: subscription.authMethod,
      subscriptionType: subscription.subscriptionType,
      version: version.stdout.trim() || version.stderr.trim(),
      policyNote: "Claude subscription authentication is verified immediately before execution.",
    };
  }

  async run({ cwd, prompt, model = undefined }) {
    assertSubscriptionOnlyEnvironment("anthropic");
    await this.subscriptionStatus();
    const args = ["-p", prompt, "--output-format", "json"];
    if (model) args.push("--model", model);
    const result = await this.runProcessImpl(args, { cwd });
    let output;
    try { output = JSON.parse(result.stdout); } catch { output = { text: result.stdout }; }
    return { output, stderr: result.stderr };
  }
}

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  await import("dotenv/config");
  const command = process.argv[2] ?? "status";
  const adapter = new ClaudeSubscriptionAdapter();
  if (command === "status") {
    console.log(JSON.stringify(await adapter.status(), null, 2));
    return;
  }
  if (command === "run") {
    const promptFile = arg("--prompt-file");
    const prompt = promptFile ? fs.readFileSync(promptFile, "utf8") : arg("--prompt");
    if (!prompt) throw new Error("Use --prompt or --prompt-file.");
    console.log(JSON.stringify(await adapter.run({ cwd: arg("--cwd") ?? process.cwd(), prompt, model: arg("--model") }), null, 2));
    return;
  }
  throw new Error(`Unknown command: ${command}`);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(error.message); process.exitCode = 1; });
}
