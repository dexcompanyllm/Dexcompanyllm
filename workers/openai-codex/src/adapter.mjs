import { spawn } from "node:child_process";
import fs from "node:fs";
import { EventEmitter } from "node:events";
import path from "node:path";
import { pathToFileURL } from "node:url";
import {
  assertSubscriptionOnlyEnvironment,
  buildSubscriptionWorkerEnvironment,
  redact,
} from "../../../packages/core/src/policy.mjs";
import {
  assessModelCatalog,
  resolveModelSelection,
  resolveReasoningEffortSelection,
} from "./model-policy.mjs";

const CODEX_CLI_PATH_ENV = "DEX_CODEX_CLI_PATH";
const CODEX_PACKAGE_ENTRY = path.join("node_modules", "@openai", "codex", "bin", "codex.js");
const WINDOWS_DIRECT_EXTENSIONS = new Set([".exe", ".com"]);
const WINDOWS_SHIM_EXTENSIONS = new Set([".cmd", ".bat", ".ps1"]);
const WINDOWS_PATH_EXTENSIONS = [".exe", ".com", ".cmd", ".bat", ".ps1", ".js", ".mjs"];
const MODEL_LIST_PAGE_SIZE = 100;
const MODEL_LIST_MAX_PAGES = 20;
const MODEL_LIST_MAX_MODELS = 1_000;
const CODEX_THREAD_SANDBOX_MODES = new Set(["read-only", "workspace-write"]);
const ASTRA_MODEL = "gpt-6-astra";
const ASTRA_STABLE_CLI_MINIMUM = "0.153.0";
const CLI_VERSION_TIMEOUT_MS = 10_000;
const CLI_VERSION_OUTPUT_LIMIT_BYTES = 64 * 1024;

function environmentValue(env, name) {
  const key = Object.keys(env).find(candidate => candidate.toLowerCase() === name.toLowerCase());
  return key ? env[key] : undefined;
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
    const packageEntry = path.join(path.dirname(candidate), CODEX_PACKAGE_ENTRY);
    if (isFile(packageEntry)) {
      return { command: nodeExecutable, prefixArgs: [packageEntry] };
    }
  }
  return null;
}

function codexCliDiagnostic() {
  return "Codex subscription CLI was not found in PATH. Install/sign in to Codex, or set DEX_CODEX_CLI_PATH to an absolute codex executable or codex.js path. API keys are not used.";
}

export function resolveCodexCli({
  env = process.env,
  platform = process.platform,
  nodeExecutable = process.execPath,
} = {}) {
  const override = environmentValue(env, CODEX_CLI_PATH_ENV);
  if (override) {
    if (!path.isAbsolute(override) || !isFile(override)) {
      throw new Error(`${CODEX_CLI_PATH_ENV} must point to an existing absolute file.`);
    }
    const overrideExtension = path.extname(override).toLowerCase();
    if (overrideExtension === ".js" || overrideExtension === ".mjs") {
      return { command: nodeExecutable, prefixArgs: [override] };
    }
    if (platform !== "win32") return { command: override, prefixArgs: [] };
    const spec = shellFreeWindowsSpec(override, nodeExecutable);
    if (spec) return spec;
    throw new Error(`${CODEX_CLI_PATH_ENV} must point to a shell-free .exe, .com, .js, or .mjs file, or to the official npm shim.`);
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
        const candidate = path.join(directory, `codex${extension}`);
        if (!isFile(candidate)) continue;
        const spec = shellFreeWindowsSpec(candidate, nodeExecutable);
        if (spec) return spec;
      }
    }
  } else {
    for (const directory of directories) {
      const candidate = path.join(directory, "codex");
      if (isFile(candidate)) return { command: candidate, prefixArgs: [] };
    }
  }

  throw new Error(codexCliDiagnostic());
}

export function spawnCodexCli(args, {
  env = process.env,
  platform = process.platform,
  nodeExecutable = process.execPath,
  resolveCli = resolveCodexCli,
  spawnImpl = spawn,
} = {}) {
  const { command, prefixArgs } = resolveCli({ env, platform, nodeExecutable });
  const childEnv = buildSubscriptionWorkerEnvironment("openai", env, platform);
  return spawnImpl(command, [...prefixArgs, ...args], {
    stdio: ["pipe", "pipe", "pipe"],
    shell: false,
    env: childEnv,
  });
}

function parseCliVersion(value) {
  const match = String(value ?? "").match(/\b(\d+)\.(\d+)\.(\d+)(?:-([0-9A-Za-z.-]+))?\b/);
  if (!match) return null;
  return {
    raw: match[0],
    major: Number(match[1]),
    minor: Number(match[2]),
    patch: Number(match[3]),
    prerelease: match[4] ?? null,
  };
}

function compareStableCliVersions(left, right) {
  for (const key of ["major", "minor", "patch"]) {
    if (left[key] !== right[key]) return left[key] < right[key] ? -1 : 1;
  }
  return 0;
}

export function assertAstraCliVersion(version, model = ASTRA_MODEL) {
  if (String(model ?? "").trim().toLowerCase() !== ASTRA_MODEL) return version;
  const detected = parseCliVersion(version);
  const minimum = parseCliVersion(ASTRA_STABLE_CLI_MINIMUM);
  if (!detected || detected.prerelease !== null || compareStableCliVersions(detected, minimum) < 0) {
    throw new Error(
      `GPT-6 Astra requires stable Codex CLI ${ASTRA_STABLE_CLI_MINIMUM} or newer on the execution host. Detected: ${detected?.raw ?? "unknown"}. Use GPT-5.6 Sol until an approved stable CLI upgrade is verified.`,
    );
  }
  return detected.raw;
}

export async function readCodexCliVersion({
  env = process.env,
  platform = process.platform,
  nodeExecutable = process.execPath,
  spawnImpl = spawn,
  timeoutMs = CLI_VERSION_TIMEOUT_MS,
  outputLimitBytes = CLI_VERSION_OUTPUT_LIMIT_BYTES,
} = {}) {
  const child = spawnCodexCli(["--version"], {
    env,
    platform,
    nodeExecutable,
    spawnImpl,
  });
  return new Promise((resolve, reject) => {
    let output = "";
    let settled = false;
    let timer;

    const finish = (error, value = null) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      if (error) reject(error);
      else resolve(value);
    };
    const append = chunk => {
      output += chunk;
      if (Buffer.byteLength(output, "utf8") > outputLimitBytes) {
        child.kill();
        finish(new Error(`Codex CLI version output exceeded ${outputLimitBytes} bytes.`));
      }
    };

    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", append);
    child.stderr.on("data", append);
    child.once("error", error => finish(codexLaunchError(error)));
    child.once("close", code => {
      if (settled) return;
      if (code !== 0) {
        finish(new Error(`Codex CLI version check failed with code ${code}.`));
        return;
      }
      const parsed = parseCliVersion(output);
      if (!parsed) {
        finish(new Error("Codex CLI version could not be parsed before Astra routing."));
        return;
      }
      finish(null, parsed.raw);
    });

    timer = setTimeout(() => {
      child.kill();
      finish(new Error(`Codex CLI version check timed out after ${timeoutMs}ms.`));
    }, timeoutMs);
    timer.unref?.();
  });
}

function codexLaunchError(error) {
  if (["ENOENT", "EACCES", "EPERM"].includes(error?.code)) {
    return new Error(codexCliDiagnostic(), { cause: error });
  }
  return error;
}

class JsonRpcProcess extends EventEmitter {
  constructor(args) {
    super();
    this.args = args;
    this.nextId = 1;
    this.pending = new Map();
    this.buffer = "";
    this.child = null;
  }

  async start() {
    this.child = spawnCodexCli(this.args);
    this.child.stdout.setEncoding("utf8");
    this.child.stderr.setEncoding("utf8");
    this.child.stdout.on("data", chunk => this.#onData(chunk));
    this.child.stderr.on("data", chunk => this.emit("stderr", redact(chunk)));
    this.child.on("exit", (code) => {
      for (const { reject } of this.pending.values()) reject(new Error(`Codex app-server exited with code ${code}.`));
      this.pending.clear();
      this.emit("exit", code);
    });
    await new Promise((resolve, reject) => {
      this.child.once("spawn", resolve);
      this.child.once("error", error => reject(codexLaunchError(error)));
    });
  }

  #onData(chunk) {
    this.buffer += chunk;
    while (this.buffer.includes("\n")) {
      const index = this.buffer.indexOf("\n");
      const line = this.buffer.slice(0, index).trim();
      this.buffer = this.buffer.slice(index + 1);
      if (!line) continue;
      let message;
      try { message = JSON.parse(line); } catch { this.emit("protocol-error", line); continue; }
      if (message.id !== undefined && !message.method) {
        const pending = this.pending.get(message.id);
        if (pending) {
          this.pending.delete(message.id);
          if (message.error) pending.reject(new Error(message.error.message ?? "Codex RPC error"));
          else pending.resolve(message.result);
        }
        continue;
      }
      if (message.id !== undefined && message.method) {
        this.emit("request", message);
        continue;
      }
      this.emit("notification", message);
    }
  }

  request(method, params = {}) {
    const id = this.nextId++;
    const promise = new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
    this.child.stdin.write(`${JSON.stringify({ method, id, params })}\n`);
    return promise;
  }

  notify(method, params = {}) {
    this.child.stdin.write(`${JSON.stringify({ method, params })}\n`);
  }

  respond(id, result) {
    this.child.stdin.write(`${JSON.stringify({ id, result })}\n`);
  }

  close() {
    for (const { reject } of this.pending.values()) reject(new Error("Codex app-server was closed."));
    this.pending.clear();
    this.child?.kill();
  }
}

export class CodexSubscriptionAdapter {
  constructor({ approvalHandler = null, rpcFactory = null, versionReader = readCodexCliVersion } = {}) {
    if (approvalHandler !== null && typeof approvalHandler !== "function") {
      throw new TypeError("Codex approvalHandler must be a function.");
    }
    if (rpcFactory !== null && typeof rpcFactory !== "function") {
      throw new TypeError("Codex rpcFactory must be a function.");
    }
    if (typeof versionReader !== "function") {
      throw new TypeError("Codex versionReader must be a function.");
    }
    this.approvalHandler = approvalHandler;
    this.rpcFactory = rpcFactory ?? (() => new JsonRpcProcess(["app-server", "--stdio"]));
    this.versionReader = versionReader;
    this.cliVersion = null;
    this.approvalRequestCount = 0;
    this.approvalAcceptedCount = 0;
  }

  async connect() {
    assertSubscriptionOnlyEnvironment("openai");
    this.rpc = this.rpcFactory();
    this.rpc.on("request", request => this.#handleServerRequest(request));
    await this.rpc.start();
    await this.rpc.request("initialize", {
      clientInfo: { name: "dex_company_runtime", title: "Dex Company Runtime", version: "0.2.0" },
      capabilities: {},
    });
    this.rpc.notify("initialized", {});
    const account = await this.rpc.request("account/read", { refreshToken: false });
    if (account?.account?.type !== "chatgpt") {
      throw new Error("Codex is not authenticated with a ChatGPT-managed subscription. Run `codex` and choose Sign in with ChatGPT.");
    }
    this.account = account.account;
    this.models = await this.listModels({ includeHidden: true });
    this.modelCatalog = assessModelCatalog(this.models);
    return {
      provider: "openai",
      authMode: "chatgpt",
      planType: this.account.planType ?? null,
      modelCatalog: this.modelCatalog,
    };
  }

  async listModels({
    includeHidden = true,
    pageSize = MODEL_LIST_PAGE_SIZE,
    maxPages = MODEL_LIST_MAX_PAGES,
    maxModels = MODEL_LIST_MAX_MODELS,
  } = {}) {
    if (!this.rpc) throw new Error("Codex App Server is not connected.");
    if (!Number.isInteger(pageSize) || pageSize < 1 || pageSize > MODEL_LIST_PAGE_SIZE) {
      throw new Error(`Codex model/list pageSize must be an integer from 1 to ${MODEL_LIST_PAGE_SIZE}.`);
    }
    if (!Number.isInteger(maxPages) || maxPages < 1 || maxPages > MODEL_LIST_MAX_PAGES) {
      throw new Error(`Codex model/list maxPages must be an integer from 1 to ${MODEL_LIST_MAX_PAGES}.`);
    }
    if (!Number.isInteger(maxModels) || maxModels < 1 || maxModels > MODEL_LIST_MAX_MODELS) {
      throw new Error(`Codex model/list maxModels must be an integer from 1 to ${MODEL_LIST_MAX_MODELS}.`);
    }

    const models = [];
    const seenCursors = new Set();
    let cursor = null;
    for (let page = 0; page < maxPages; page += 1) {
      const response = await this.rpc.request("model/list", {
        cursor,
        includeHidden,
        limit: pageSize,
      });
      if (!Array.isArray(response?.data)) {
        throw new Error("Codex model/list returned an invalid response without data[].");
      }
      models.push(...response.data);
      if (models.length > maxModels) {
        throw new Error(`Codex model/list exceeded the ${maxModels}-model safety bound.`);
      }

      const nextCursor = typeof response.nextCursor === "string" && response.nextCursor
        ? response.nextCursor
        : null;
      if (!nextCursor) return models;
      if (seenCursors.has(nextCursor)) {
        throw new Error("Codex model/list returned a repeated pagination cursor.");
      }
      seenCursors.add(nextCursor);
      cursor = nextCursor;
    }
    throw new Error(`Codex model/list exceeded the ${maxPages}-page safety bound.`);
  }

  async rateLimits() {
    return this.rpc.request("account/rateLimits/read", {});
  }

  async run({
    cwd,
    prompt,
    model = undefined,
    effort = undefined,
    executionPolicySelector = null,
    sandbox = "workspace-write",
    timeoutMs = 30 * 60_000,
    signal,
  }) {
    if (!CODEX_THREAD_SANDBOX_MODES.has(sandbox)) {
      throw new Error(`Codex sandbox must be one of: ${[...CODEX_THREAD_SANDBOX_MODES].join(", ")}.`);
    }
    if (!Number.isSafeInteger(timeoutMs) || timeoutMs < 1 || timeoutMs > 30 * 60_000) {
      throw new Error("Codex turn timeout must be a positive integer no greater than 30 minutes.");
    }
    if (signal?.aborted) throw new Error("Codex turn was cancelled before start.");
    if (executionPolicySelector !== null && typeof executionPolicySelector !== "function") {
      throw new TypeError("Codex executionPolicySelector must be a function.");
    }
    if (executionPolicySelector && (model !== undefined || effort !== undefined)) {
      throw new Error("Codex execution policy selection cannot be combined with explicit model or effort.");
    }
    const runStartedAt = Date.now();
    const withinDeadline = async (promise, stage) => {
      const remaining = timeoutMs - (Date.now() - runStartedAt);
      if (remaining < 1) {
        this.rpc?.close();
        throw new Error(`Codex ${stage} timed out and the App Server process was stopped.`);
      }
      let stageTimer;
      let stageAbortListener;
      const stopped = new Promise((resolve, reject) => {
        stageTimer = setTimeout(() => {
          reject(new Error(`Codex ${stage} timed out and the App Server process was stopped.`));
          this.rpc?.close();
        }, remaining);
        stageTimer.unref?.();
        stageAbortListener = () => {
          reject(new Error(`Codex ${stage} was cancelled and the App Server process was stopped.`));
          this.rpc?.close();
        };
        signal?.addEventListener?.("abort", stageAbortListener, { once: true });
      });
      try {
        return await Promise.race([promise, stopped]);
      } finally {
        clearTimeout(stageTimer);
        signal?.removeEventListener?.("abort", stageAbortListener);
      }
    };
    if (!this.rpc) await withinDeadline(this.connect(), "connection");
    if (!Array.isArray(this.models)) {
      this.models = await withinDeadline(this.listModels({ includeHidden: true }), "model discovery");
      this.modelCatalog = assessModelCatalog(this.models);
    }
    let executionPolicy = null;
    if (executionPolicySelector) {
      executionPolicy = await withinDeadline(
        Promise.resolve().then(() => executionPolicySelector({
          planType: this.account?.planType ?? null,
          modelCatalog: this.modelCatalog,
        })),
        "execution policy selection",
      );
      if (
        !executionPolicy
        || typeof executionPolicy !== "object"
        || !String(executionPolicy.model ?? "").trim()
        || !String(executionPolicy.reasoningEffort ?? "").trim()
      ) {
        throw new Error("Codex executionPolicySelector must return a model and reasoningEffort.");
      }
      model = executionPolicy.model;
      effort = executionPolicy.reasoningEffort;
    }
    const modelSelection = resolveModelSelection({
      requestedModel: model,
      models: this.models,
      defaultModelOverride: this.modelCatalog?.defaultModelOverride ?? null,
    });
    const reasoningEffortSelection = resolveReasoningEffortSelection({
      effectiveModel: modelSelection.effectiveModel,
      requestedEffort: effort,
      models: this.models,
    });
    if (modelSelection.effectiveModel === ASTRA_MODEL) {
      if (!this.cliVersion) {
        this.cliVersion = await withinDeadline(
          Promise.resolve(this.versionReader()),
          "Astra CLI version check",
        );
      }
      assertAstraCliVersion(this.cliVersion, modelSelection.effectiveModel);
    }
    const threadParams = {
      cwd,
      approvalPolicy: "on-request",
      sandbox,
      ephemeral: true,
    };
    if (modelSelection.effectiveModel) threadParams.model = modelSelection.effectiveModel;

    const started = await withinDeadline(this.rpc.request("thread/start", threadParams), "thread start");
    if (started?.thread?.ephemeral !== true) {
      throw new Error("Codex App Server did not honor the required ephemeral thread boundary.");
    }
    const remainingTimeoutMs = timeoutMs - (Date.now() - runStartedAt);
    if (remainingTimeoutMs < 1) {
      this.rpc?.close();
      throw new Error("Codex turn timed out and the App Server process was stopped.");
    }
    const threadId = started.thread.id;
    let finalText = "";
    const events = [];
    let settled = false;
    let resolveCompleted;
    let rejectCompleted;
    let timer;
    let abortListener;
    let turnId = null;
    const completed = new Promise((resolve, reject) => {
      resolveCompleted = resolve;
      rejectCompleted = reject;
    });
    const cleanup = () => {
      clearTimeout(timer);
      this.rpc?.off("notification", handler);
      signal?.removeEventListener?.("abort", abortListener);
    };
    const finish = (error, value) => {
      if (settled) return;
      settled = true;
      cleanup();
      if (error) rejectCompleted(error);
      else resolveCompleted(value);
    };
    const interrupt = (message) => {
      if (settled) return;
      const rpc = this.rpc;
      if (turnId) {
        try { void rpc?.request("turn/interrupt", { threadId, turnId }).catch(() => {}); } catch {}
      }
      rpc?.close();
      finish(new Error(message));
    };
    const handler = message => {
      if (message?.params?.threadId && message.params.threadId !== threadId) return;
      events.push(message);
      if (message.method === "item/agentMessage/delta") finalText += message.params?.delta ?? "";
      if (message.method === "item/completed" && message.params?.item?.type === "agentMessage") {
        finalText = message.params.item.text ?? finalText;
      }
      if (message.method === "turn/completed") finish(null, message.params);
    };
    this.rpc.on("notification", handler);
    timer = setTimeout(() => interrupt("Codex turn timed out and the App Server process was stopped."), remainingTimeoutMs);
    timer.unref?.();
    abortListener = () => interrupt("Codex turn was cancelled and the App Server process was stopped.");
    signal?.addEventListener?.("abort", abortListener, { once: true });

    const turnParams = {
      threadId,
      input: [{ type: "text", text: prompt }],
    };
    if (reasoningEffortSelection.effectiveEffort) turnParams.effort = reasoningEffortSelection.effectiveEffort;
    const turnStart = this.rpc.request("turn/start", turnParams).then(value => {
      turnId = String(value?.turn?.id ?? "").trim();
      if (!turnId) throw new Error("Codex turn/start did not return a turn ID.");
      return value;
    }).catch(error => {
      finish(error);
      return null;
    });
    try {
      await Promise.race([turnStart, completed]);
      const turn = await completed;
      return {
        threadId,
        turn,
        finalText,
        eventCount: events.length,
        modelSelection,
        reasoningEffortSelection,
        executionPolicy,
      };
    } finally {
      cleanup();
    }
  }

  #handleServerRequest(request) {
    const method = String(request.method ?? "");
    if (method.includes("requestApproval")) {
      this.approvalRequestCount += 1;
      void Promise.resolve()
        .then(() => this.approvalHandler?.({ method }) ?? "decline")
        .then(value => {
          const decision = value === "accept" ? "accept" : "decline";
          if (decision === "accept") this.approvalAcceptedCount += 1;
          this.rpc?.respond(request.id, { decision });
        })
        .catch(() => {
          try { this.rpc?.respond(request.id, { decision: "decline" }); } catch {}
        });
      return;
    }
    if (method === "item/tool/requestUserInput") {
      this.rpc.respond(request.id, { answers: {} });
      return;
    }
    this.rpc.respond(request.id, { decision: "decline" });
  }

  approvalStats() {
    return {
      requested: this.approvalRequestCount,
      accepted: this.approvalAcceptedCount,
      declined: this.approvalRequestCount - this.approvalAcceptedCount,
    };
  }

  close() { this.rpc?.close(); }
}

function arg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function main() {
  await import("dotenv/config");
  const command = process.argv[2] ?? "status";
  const adapter = new CodexSubscriptionAdapter();
  try {
    const status = await adapter.connect();
    if (command === "status") {
      const limits = await adapter.rateLimits().catch(() => null);
      console.log(JSON.stringify({ ...status, limits }, null, 2));
      return;
    }
    if (command === "run") {
      const cwd = arg("--cwd") ?? process.cwd();
      const promptFile = arg("--prompt-file");
      const prompt = promptFile ? fs.readFileSync(promptFile, "utf8") : arg("--prompt");
      if (!prompt) throw new Error("Use --prompt or --prompt-file.");
      console.log(JSON.stringify(await adapter.run({ cwd, prompt, model: arg("--model") }), null, 2));
      return;
    }
    throw new Error(`Unknown command: ${command}`);
  } finally {
    adapter.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(error => { console.error(redact(error.message)); process.exitCode = 1; });
}
