import YAML from "yaml";
import { createHash, randomUUID } from "node:crypto";
import { normalizeTaskContext } from "../../../packages/core/src/task-context.mjs";
import {
  GITHUB_API_VERSION,
  createGitHubAuth,
  redactGitHubMessage,
} from "./github-auth.mjs";
import {
  OAuthReplayStoreError,
  createOAuthReplayStore,
} from "./oauth-replay-store.mjs";

const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{0,127}$/;
const GITHUB_REQUEST_TIMEOUT_MS = 8_000;
const GITHUB_RESPONSE_MAX_BYTES = 2 * 1024 * 1024;
const GITHUB_PROJECT_FETCH_CONCURRENCY = 4;
const GITHUB_PROJECT_LIMIT = 250;
const TASK_LOCK_TTL_SECONDS = 300;
const TASK_RESULT_TTL_SECONDS = 31 * 24 * 60 * 60;
const TASK_LOCK_VALUE_PATTERN = /^(pending|posting|created):([A-Za-z0-9_-]{43})(?::([1-9][0-9]*))?$/;

function parseRepo(value) {
  const [owner, repo] = String(value ?? "").split("/");
  if (!owner || !repo) throw new Error("GITHUB_REPO must use owner/repo format.");
  return { owner, repo };
}

function assertSafePath(path) {
  if (!path || path.includes("..") || path.startsWith("/")) {
    throw new Error("Unsafe repository path.");
  }
}

function decodeContent(payload) {
  if (payload.encoding !== "base64") throw new Error("Unsupported GitHub content encoding.");
  return Buffer.from(payload.content.replace(/\n/g, ""), "base64").toString("utf8");
}

function githubErrorCode(status, path) {
  if (status === 401) return "GITHUB_AUTH_FAILED";
  if (status === 403) return "GITHUB_PERMISSION_DENIED";
  if (status === 404 && path.includes("/git/ref/")) return "GITHUB_REF_NOT_FOUND";
  if (status === 404 && path.includes("/contents/10_Projects/Company-Ops/CURRENT.md")) {
    return "GITHUB_CURRENT_DOCUMENT_NOT_FOUND";
  }
  if (status === 404 && path.includes("/contents/10_Projects")) return "GITHUB_PROJECTS_NOT_FOUND";
  if (status === 404 && path.includes("/contents/")) return "GITHUB_CONTENT_NOT_FOUND";
  if (status === 404) return "GITHUB_REPOSITORY_NOT_FOUND";
  if (status === 422) return "GITHUB_REF_OR_REQUEST_INVALID";
  return "GITHUB_REQUEST_FAILED";
}

function publicError(code, message, status = 500) {
  const error = new Error(message);
  error.status = status;
  error.source = "github";
  error.code = code;
  return error;
}

function boundedPositiveInteger(value, ceiling) {
  const parsed = Number(value);
  if (!Number.isSafeInteger(parsed) || parsed <= 0) return ceiling;
  return Math.min(parsed, ceiling);
}

async function readBoundedResponseText(response, maxBytes) {
  const contentLength = response.headers?.get?.("content-length");
  if (contentLength !== null && contentLength !== undefined) {
    const normalized = String(contentLength).trim();
    if (!/^\d+$/.test(normalized)) {
      throw publicError(
        "GITHUB_RESPONSE_INVALID",
        "GitHub API returned an invalid response.",
        502,
      );
    }
    const declaredBytes = Number(normalized);
    if (!Number.isSafeInteger(declaredBytes) || declaredBytes > maxBytes) {
      throw publicError(
        "GITHUB_RESPONSE_TOO_LARGE",
        "GitHub API response exceeded the allowed size.",
        502,
      );
    }
  }

  if (!response.body) return "";
  if (typeof response.body.getReader !== "function") {
    throw publicError(
      "GITHUB_RESPONSE_INVALID",
      "GitHub API returned an invalid response.",
      502,
    );
  }

  const reader = response.body.getReader();
  const chunks = [];
  let receivedBytes = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = Buffer.from(value);
      receivedBytes += chunk.byteLength;
      if (receivedBytes > maxBytes) {
        await reader.cancel().catch(() => {});
        throw publicError(
          "GITHUB_RESPONSE_TOO_LARGE",
          "GitHub API response exceeded the allowed size.",
          502,
        );
      }
      chunks.push(chunk);
    }
  } finally {
    reader.releaseLock?.();
  }
  return Buffer.concat(chunks, receivedBytes).toString("utf8");
}

async function mapWithConcurrency(items, concurrency, mapper) {
  const results = new Array(items.length);
  let nextIndex = 0;
  let firstError = null;

  const worker = async () => {
    while (!firstError) {
      const index = nextIndex;
      nextIndex += 1;
      if (index >= items.length) return;
      try {
        results[index] = await mapper(items[index], index);
      } catch (error) {
        firstError ??= error;
      }
    }
  };

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, () => worker()),
  );
  if (firstError) throw firstError;
  return results;
}

function encodePath(value) {
  return String(value).split("/").map(encodeURIComponent).join("/");
}

function diagnosticCheck(name, diagnostic) {
  return {
    name,
    ok: Boolean(diagnostic?.ok),
    status: Number.isInteger(diagnostic?.status) ? diagnostic.status : 500,
    code: String(diagnostic?.code ?? "UNKNOWN"),
    message: redactGitHubMessage(diagnostic?.message ?? "Unknown GitHub error"),
  };
}

function assertIdempotencyKey(value) {
  if (!IDEMPOTENCY_KEY_PATTERN.test(String(value ?? ""))) {
    throw publicError(
      "GITHUB_IDEMPOTENCY_KEY_INVALID",
      "Idempotency key must be 1-128 safe ASCII characters.",
      400,
    );
  }
}

function idempotencyMarker(value) {
  return `<!-- dex-idempotency-key:${value} -->`;
}

function stableJson(value) {
  if (Array.isArray(value)) return `[${value.map(stableJson).join(",")}]`;
  if (value && typeof value === "object") {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableJson(value[key])}`).join(",")}}`;
  }
  return JSON.stringify(value);
}

function taskRequestFingerprint(task, idempotencyKey) {
  const canonical = {
    task: {
      title: task?.task?.title ?? task?.title ?? "Untitled task",
      priority: task?.task?.priority ?? "normal",
    },
    project: task?.project ?? { name: "Company-Ops", baseRef: "main" },
    request: task?.request ?? { source: "runtime.invalid", objective: "", originalText: "" },
    routing: task?.routing ?? { role: "auto", requiredCapabilities: [], preferredProvider: "auto" },
    constraints: task?.constraints ?? {},
    acceptanceCriteria: task?.acceptanceCriteria ?? [],
    ...normalizeTaskContext(task),
    execution: {
      riskLevel: task?.execution?.riskLevel ?? "low",
      idempotencyKey,
    },
  };
  return createHash("sha256").update(stableJson(canonical), "utf8").digest("base64url");
}

function taskLockId(idempotencyKey) {
  return createHash("sha256").update(String(idempotencyKey), "utf8").digest("base64url");
}

function parseTaskLock(value) {
  const match = String(value ?? "").match(TASK_LOCK_VALUE_PATTERN);
  if (!match) return null;
  return {
    state: match[1],
    requestHash: match[2],
    issueNumber: match[3] === undefined ? null : Number(match[3]),
  };
}

function parseTaskPacket(body) {
  const match = String(body ?? "").match(/```ya?ml\s*\r?\n([\s\S]*?)\r?\n```/i);
  if (!match) return null;
  try {
    const packet = YAML.parse(match[1]);
    return packet && typeof packet === "object" ? packet : null;
  } catch {
    return null;
  }
}

export class GitHubStore {
  constructor({
    repo = process.env.GITHUB_REPO,
    ref = process.env.GITHUB_REF ?? "main",
    auth,
    fetchImpl = globalThis.fetch,
    env = process.env,
    createAppAuth,
    token,
    allowTokenFallback,
    requestTimeoutMs = GITHUB_REQUEST_TIMEOUT_MS,
    maxResponseBytes = GITHUB_RESPONSE_MAX_BYTES,
    projectFetchConcurrency = GITHUB_PROJECT_FETCH_CONCURRENCY,
    projectLimit = GITHUB_PROJECT_LIMIT,
    idempotencyStore,
  } = {}) {
    this.repo = repo;
    this.ref = ref;
    const authEnv = { ...env };
    if (token !== undefined) authEnv.GITHUB_TOKEN = token;
    if (allowTokenFallback !== undefined) {
      authEnv.DEX_ALLOW_GITHUB_TOKEN_FALLBACK = String(allowTokenFallback);
    }
    this.auth = auth ?? createGitHubAuth({ env: authEnv, createAppAuth });
    this.fetchImpl = fetchImpl;
    this.requestTimeoutMs = boundedPositiveInteger(requestTimeoutMs, GITHUB_REQUEST_TIMEOUT_MS);
    this.maxResponseBytes = boundedPositiveInteger(maxResponseBytes, GITHUB_RESPONSE_MAX_BYTES);
    this.projectFetchConcurrency = boundedPositiveInteger(
      projectFetchConcurrency,
      GITHUB_PROJECT_FETCH_CONCURRENCY,
    );
    this.projectLimit = boundedPositiveInteger(projectLimit, GITHUB_PROJECT_LIMIT);
    this.idempotencyStore = idempotencyStore ?? createOAuthReplayStore({
      env: authEnv,
      issuer: env.DEX_PUBLIC_ORIGIN ?? "dex-company-task-idempotency",
      fetchImpl,
    });
    this.requireDurableIdempotency = env.NODE_ENV === "production" || Boolean(env.VERCEL_ENV);
    const { owner, repo: name } = parseRepo(repo);
    this.owner = owner;
    this.name = name;
  }

  get configured() {
    return Boolean(this.repo && this.auth?.configured);
  }

  async request(path, init = {}) {
    if (!this.auth || typeof this.auth.getToken !== "function") {
      throw publicError("GITHUB_AUTH_PROVIDER_INVALID", "GitHub authentication provider is unavailable.");
    }
    const token = await this.auth.getToken();
    const { signal: callerSignal, ...requestInit } = init;
    const controller = new AbortController();
    let timedOut = false;
    const abortFromCaller = () => controller.abort(callerSignal.reason);
    if (callerSignal?.aborted) {
      abortFromCaller();
    } else {
      callerSignal?.addEventListener("abort", abortFromCaller, { once: true });
    }
    const timeout = setTimeout(() => {
      timedOut = true;
      controller.abort();
    }, this.requestTimeoutMs);
    timeout.unref?.();

    let response;
    try {
      response = await this.fetchImpl(`https://api.github.com${path}`, {
        ...requestInit,
        redirect: "error",
        signal: controller.signal,
        headers: {
          Accept: "application/vnd.github+json",
          ...(requestInit.body ? { "Content-Type": "application/json" } : {}),
          ...(requestInit.headers ?? {}),
          Authorization: `Bearer ${token}`,
          "X-GitHub-Api-Version": GITHUB_API_VERSION,
          "User-Agent": "dex-company-runtime",
        },
      });
    } catch {
      clearTimeout(timeout);
      callerSignal?.removeEventListener?.("abort", abortFromCaller);
      if (timedOut) {
        throw publicError("GITHUB_REQUEST_TIMEOUT", "GitHub API request timed out.", 504);
      }
      throw publicError("GITHUB_NETWORK_ERROR", "GitHub API request could not be completed.", 502);
    }

    let text;
    try {
      text = await readBoundedResponseText(response, this.maxResponseBytes);
    } catch (error) {
      if (error?.source === "github") throw error;
      if (timedOut) {
        throw publicError("GITHUB_REQUEST_TIMEOUT", "GitHub API request timed out.", 504);
      }
      throw publicError("GITHUB_RESPONSE_READ_FAILED", "GitHub API response could not be read.", 502);
    } finally {
      clearTimeout(timeout);
      callerSignal?.removeEventListener?.("abort", abortFromCaller);
    }

    let payload = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch {
        if (response.ok) {
          throw publicError("GITHUB_RESPONSE_INVALID", "GitHub API returned an invalid response.", 502);
        }
      }
    }
    if (!response.ok) {
      throw publicError(
        githubErrorCode(response.status, path),
        redactGitHubMessage(payload?.message ?? `GitHub request failed with status ${response.status}.`, [token]),
        response.status,
      );
    }
    return payload;
  }

  async idempotencyOperation(operation) {
    if (
      !this.idempotencyStore?.configured
      || (this.requireDurableIdempotency && !this.idempotencyStore.durable)
    ) {
      throw publicError(
        "GITHUB_IDEMPOTENCY_STORE_UNAVAILABLE",
        "Task idempotency protection is unavailable.",
        503,
      );
    }
    try {
      return await operation();
    } catch (error) {
      if (error instanceof OAuthReplayStoreError) {
        throw publicError(
          "GITHUB_IDEMPOTENCY_STORE_UNAVAILABLE",
          "Task idempotency protection is unavailable.",
          503,
        );
      }
      throw error;
    }
  }

  async diagnose() {
    const checks = [];
    let configuration;
    try {
      configuration = typeof this.auth?.getConfigurationDiagnostic === "function"
        ? await this.auth.getConfigurationDiagnostic()
        : {
            ok: Boolean(this.auth?.configured),
            status: this.auth?.configured ? 200 : 500,
            code: this.auth?.configured ? "GITHUB_AUTH_CONFIGURED" : "GITHUB_AUTH_NOT_CONFIGURED",
            message: this.auth?.configured
              ? "GitHub authentication is configured."
              : "GitHub authentication is not configured.",
          };
    } catch (error) {
      configuration = {
        ok: false,
        status: error.status,
        code: error.code,
        message: error.message,
      };
    }
    checks.push(diagnosticCheck("app_configuration", configuration));

    const run = async (name, operation, successCode, successMessage) => {
      try {
        await operation();
        checks.push({
          name,
          ok: true,
          status: 200,
          code: successCode,
          message: successMessage,
        });
      } catch (error) {
        checks.push(diagnosticCheck(name, {
          ok: false,
          status: error.status,
          code: error.code ?? "UNKNOWN",
          message: error.message,
        }));
      }
    };

    await run(
      "installation_token",
      () => this.auth.getToken(),
      this.auth?.mode === "token-fallback" ? "GITHUB_TOKEN_FALLBACK_READY" : "GITHUB_INSTALLATION_TOKEN_READY",
      this.auth?.mode === "token-fallback"
        ? "Local GitHub token fallback is ready."
        : "GitHub App installation authentication is ready.",
    );
    await run(
      "repository",
      () => this.request(`/repos/${this.owner}/${this.name}`),
      "GITHUB_REPOSITORY_READY",
      "GitHub repository is accessible.",
    );

    const normalizedRef = String(this.ref).startsWith("refs/")
      ? String(this.ref).slice("refs/".length)
      : `heads/${this.ref}`;
    await run(
      "ref",
      () => this.request(`/repos/${this.owner}/${this.name}/git/ref/${encodePath(normalizedRef)}`),
      "GITHUB_REF_READY",
      "Configured Git ref is accessible.",
    );
    await run(
      "10_Projects",
      () => this.request(
        `/repos/${this.owner}/${this.name}/contents/10_Projects?ref=${encodeURIComponent(this.ref)}`,
      ),
      "GITHUB_PROJECTS_READY",
      "10_Projects is accessible.",
    );
    await run(
      "current_document",
      () => this.request(
        `/repos/${this.owner}/${this.name}/contents/10_Projects/Company-Ops/CURRENT.md?ref=${encodeURIComponent(this.ref)}`,
      ),
      "GITHUB_CURRENT_DOCUMENT_READY",
      "Company-Ops/CURRENT.md is accessible.",
    );
    await run(
      "issues",
      () => this.request(`/repos/${this.owner}/${this.name}/issues?state=open&per_page=1`),
      "GITHUB_ISSUES_READY",
      "GitHub Issues are accessible.",
    );

    return {
      ok: checks.every((check) => check.ok),
      configured: this.configured,
      repository: this.repo,
      ref: this.ref,
      checks,
    };
  }

  async listDirectory(path) {
    assertSafePath(path);
    const encoded = path.split("/").map(encodeURIComponent).join("/");
    return this.request(`/repos/${this.owner}/${this.name}/contents/${encoded}?ref=${encodeURIComponent(this.ref)}`);
  }

  async fetchDocument(path) {
    assertSafePath(path);
    const encoded = path.split("/").map(encodeURIComponent).join("/");
    const payload = await this.request(`/repos/${this.owner}/${this.name}/contents/${encoded}?ref=${encodeURIComponent(this.ref)}`);
    if (Array.isArray(payload)) throw new Error("Path points to a directory.");
    return {
      id: path,
      path,
      sha: payload.sha,
      content: decodeContent(payload),
      url: payload.html_url,
    };
  }

  async listProjects() {
    const entries = await this.listDirectory("10_Projects");
    const projects = entries.filter((entry) => entry.type === "dir");
    // Refuse oversized repositories instead of silently truncating the project
    // list. This caps outbound work while preserving every project on success.
    if (projects.length > this.projectLimit) {
      throw publicError(
        "GITHUB_PROJECT_LIMIT_EXCEEDED",
        "GitHub repository contains more projects than can be processed safely.",
        502,
      );
    }
    return mapWithConcurrency(projects, this.projectFetchConcurrency, async (entry) => {
      let current = null;
      try {
        current = await this.fetchDocument(`${entry.path}/CURRENT.md`);
      } catch (error) {
        if (error.status !== 404) throw error;
      }
      return {
        name: entry.name,
        path: entry.path,
        url: entry.html_url,
        summary: current?.content.slice(0, 600) ?? "CURRENT.md not found",
      };
    });
  }

  async getProjectState(project) {
    if (!/^[A-Za-z0-9._가-힣-]+$/.test(project)) throw new Error("Invalid project name.");
    const candidates = [
      "PROJECT_CONFIG.md",
      "CURRENT.md",
      "SESSION_HANDOFF.md",
      "DECISIONS.md",
      "QA_REPORT.md",
    ];
    // These read-only documents are independent. Reuse the existing bounded
    // mapper to overlap network waits while preserving candidate order.
    const documents = await mapWithConcurrency(candidates, this.projectFetchConcurrency, async (file) => {
      try {
        return await this.fetchDocument(`10_Projects/${project}/${file}`);
      } catch (error) {
        if (error.status !== 404) throw error;
        return null;
      }
    });
    return { project, documents: documents.filter(document => document !== null) };
  }

  async search(query, limit = 10) {
    const q = String(query ?? "").trim();
    if (!q) return [];
    const searchQuery = encodeURIComponent(`${q} repo:${this.owner}/${this.name}`);
    try {
      const payload = await this.request(`/search/code?q=${searchQuery}&per_page=${Math.min(limit, 20)}`);
      return payload.items.map((item) => ({
        id: item.path,
        title: item.name,
        path: item.path,
        url: item.html_url,
        repository: item.repository.full_name,
      }));
    } catch (error) {
      if (![403, 404, 422].includes(error.status)) throw error;
      const fallbackPaths = [
        "AI_CONTRACT.md",
        "CURRENT_STATE.md",
        "DECISIONS.md",
        "HANDOFF.md",
        "LLM_CONTEXT.md",
      ];
      const results = [];
      for (const path of fallbackPaths) {
        try {
          const doc = await this.fetchDocument(path);
          if (doc.content.toLowerCase().includes(q.toLowerCase())) {
            results.push({ id: path, title: path, path, url: doc.url });
          }
        } catch {}
      }
      return results.slice(0, limit);
    }
  }

  async listTasks(state = "open") {
    const payload = await this.request(
      `/repos/${this.owner}/${this.name}/issues?state=${encodeURIComponent(state)}&per_page=50&sort=updated&direction=desc`
    );
    return payload
      .filter((issue) => !issue.pull_request && issue.title.startsWith("[DEX-TASK]"))
      .map((issue) => {
        const packet = parseTaskPacket(issue.body);
        return {
          id: `issue:${issue.number}`,
          taskId: packet?.task?.id ?? null,
          projectName: packet?.project?.name ?? null,
          requestKind: packet?.constraints?.personalWorkspace?.kind ?? 'task',
          requestedProject: packet?.constraints?.personalWorkspace?.registration?.name ?? null,
          number: issue.number,
          title: issue.title.replace(/^\[DEX-TASK\]\s*/, ""),
          state: issue.state,
          url: issue.html_url,
          updatedAt: issue.updated_at,
          body: issue.body,
        };
      });
  }

  async fetchResource(id) {
    if (String(id).startsWith("issue:")) {
      const number = Number(String(id).split(":")[1]);
      if (!Number.isInteger(number)) throw new Error("Invalid issue id.");
      const issue = await this.request(`/repos/${this.owner}/${this.name}/issues/${number}`);
      return {
        id,
        title: issue.title,
        content: issue.body ?? "",
        url: issue.html_url,
      };
    }
    return this.fetchDocument(String(id));
  }

  async findTaskIssueByIdempotencyKey(key, expectedRequestHash) {
    assertIdempotencyKey(key);
    const marker = idempotencyMarker(key);
    const searchQuery = encodeURIComponent(
      `repo:${this.owner}/${this.name} is:issue in:body "${key}"`,
    );
    const payload = await this.request(`/search/issues?q=${searchQuery}&per_page=10`);
    const issue = (payload?.items ?? []).find((item) => (
      !item.pull_request && String(item.body ?? "").includes(marker)
    ));
    if (!issue) return null;

    return this.taskIssueResult(issue, key, expectedRequestHash, { existing: true });
  }

  taskIssueResult(issue, key, expectedRequestHash, { existing }) {
    if (!Number.isSafeInteger(issue?.number) || issue.number <= 0) {
      throw publicError("GITHUB_IDEMPOTENCY_RESULT_INVALID", "The stored task result is invalid.", 503);
    }
    let htmlUrl;
    try {
      htmlUrl = new URL(String(issue.html_url ?? ""));
    } catch {
      throw publicError("GITHUB_IDEMPOTENCY_RESULT_INVALID", "The stored task result is invalid.", 503);
    }
    const expectedPath = `/${this.owner}/${this.name}/issues/${issue.number}`.toLowerCase();
    if (
      htmlUrl.origin !== "https://github.com"
      || htmlUrl.pathname.toLowerCase() !== expectedPath
      || htmlUrl.search
      || htmlUrl.hash
    ) {
      throw publicError("GITHUB_IDEMPOTENCY_RESULT_INVALID", "The stored task result is invalid.", 503);
    }
    if (!String(issue.body ?? "").includes(idempotencyMarker(key))) {
      throw publicError("GITHUB_IDEMPOTENCY_RESULT_INVALID", "The stored task result is invalid.", 503);
    }
    const packet = parseTaskPacket(issue.body);
    if (!packet || packet.execution?.idempotencyKey !== key) {
      throw publicError("GITHUB_IDEMPOTENCY_RESULT_INVALID", "The stored task result is invalid.", 503);
    }
    if (expectedRequestHash && taskRequestFingerprint(packet, key) !== expectedRequestHash) {
      throw publicError(
        "GITHUB_IDEMPOTENCY_KEY_CONFLICT",
        "The idempotency key is already associated with a different task request.",
        409,
      );
    }
    return {
      id: packet?.task?.id ?? `issue:${issue.number}`,
      issueNumber: issue.number,
      url: issue.html_url,
      packet,
      existing,
    };
  }

  async createTaskIssue(task, { validateNew } = {}) {
    const context = normalizeTaskContext(task);
    task = { ...task, ...context };
    const requestedIdempotencyKey = task?.execution?.idempotencyKey ?? randomUUID();
    assertIdempotencyKey(requestedIdempotencyKey);
    const requestHash = taskRequestFingerprint(task, requestedIdempotencyKey);
    const lockId = taskLockId(requestedIdempotencyKey);
    let newRequestValidated = false;
    // Mutable project availability must not block recovery of an already
    // accepted request. Exact key/payload validation still happens below.
    if (validateNew) {
      const prior = await this.idempotencyOperation(() => this.idempotencyStore.get('task-idempotency', lockId));
      if (prior === null) {
        const existing = await this.findTaskIssueByIdempotencyKey(requestedIdempotencyKey, requestHash);
        if (!existing) {
          await validateNew();
          newRequestValidated = true;
        }
      }
    }
    const pendingValue = `pending:${requestHash}`;
    const claim = await this.idempotencyOperation(() => this.idempotencyStore.claim(
      "task-idempotency",
      lockId,
      pendingValue,
      TASK_LOCK_TTL_SECONDS,
    ));
    if (!claim.claimed) {
      const prior = parseTaskLock(claim.existing);
      if (!prior || prior.requestHash !== requestHash) {
        throw publicError(
          "GITHUB_IDEMPOTENCY_KEY_CONFLICT",
          "The idempotency key is already associated with a different task request.",
          409,
        );
      }
      if (prior.state === "pending") {
        throw publicError(
          "GITHUB_TASK_CREATION_IN_PROGRESS",
          "A task with this idempotency key is still being created; retry later.",
          409,
        );
      }
      let reconciled;
      if (Number.isSafeInteger(prior.issueNumber)) {
        const issue = await this.request(`/repos/${this.owner}/${this.name}/issues/${prior.issueNumber}`);
        reconciled = this.taskIssueResult(issue, requestedIdempotencyKey, requestHash, { existing: true });
      } else if (prior.state === "posting") {
        reconciled = await this.findTaskIssueByIdempotencyKey(requestedIdempotencyKey, requestHash);
      }
      if (!reconciled) {
        if (prior.state === "posting") {
          await this.idempotencyOperation(() => this.idempotencyStore.put(
            "task-idempotency",
            lockId,
            `posting:${requestHash}${prior.issueNumber ? `:${prior.issueNumber}` : ""}`,
            TASK_RESULT_TTL_SECONDS,
          ));
        }
        throw publicError(
          "GITHUB_TASK_CREATION_UNCERTAIN",
          "GitHub may have accepted this task; retrying creation is blocked until the exact issue is reconciled.",
          409,
        );
      }
      if (prior.state === "posting") {
        await this.idempotencyOperation(() => this.idempotencyStore.put(
          "task-idempotency",
          lockId,
          `created:${requestHash}:${reconciled.issueNumber}`,
          TASK_RESULT_TTL_SECONDS,
        ));
      }
      return reconciled;
    }

    const existing = await this.findTaskIssueByIdempotencyKey(requestedIdempotencyKey, requestHash);
    if (existing) {
      await this.idempotencyOperation(() => this.idempotencyStore.put(
        "task-idempotency",
        lockId,
        `created:${requestHash}:${existing.issueNumber}`,
        TASK_RESULT_TTL_SECONDS,
      ));
      return existing;
    }

    // A previously observed lock can expire before claim(). Every fresh create
    // still needs project validation, while receipt recovery stays read-only.
    if (validateNew && !newRequestValidated) await validateNew();

    const taskId = task?.task?.id ?? `DC-${new Date().toISOString().slice(0, 10).replaceAll("-", "")}-${randomUUID().slice(0, 6).toUpperCase()}`;
    const normalized = {
      schemaVersion: "2.0",
      task: {
        id: taskId,
        title: task?.task?.title ?? task?.title ?? "Untitled task",
        createdAt: new Date().toISOString(),
        createdBy: "Ethan",
        status: "queued",
        priority: task?.task?.priority ?? "normal",
      },
      project: task?.project ?? { name: "Company-Ops", baseRef: "main" },
      request: task?.request ?? { source: "runtime.invalid", objective: "", originalText: "" },
      routing: task?.routing ?? { role: "auto", requiredCapabilities: [], preferredProvider: "auto" },
      costPolicy: {
        mode: "subscription-only",
        paidApiAllowed: false,
        automaticPaidFallback: false,
        extraUsageAllowed: false,
        budgetLimit: 0,
      },
      constraints: task?.constraints ?? {},
      acceptanceCriteria: task?.acceptanceCriteria ?? [],
      ...context,
      execution: {
        mode: "prepare-changes",
        riskLevel: task?.execution?.riskLevel ?? "low",
        approvalPolicy: "policy-based",
        idempotencyKey: requestedIdempotencyKey,
        checkpoint: "intake",
      },
    };
    const yaml = YAML.stringify(normalized);
    const body = [
      "Dex Company Task Packet",
      "",
      "```yaml",
      yaml.trim(),
      "```",
      "",
      `PWA: ${process.env.DEX_PUBLIC_ORIGIN ?? "https://runtime.invalid"}`,
      "",
      idempotencyMarker(requestedIdempotencyKey),
    ].join("\n");
    await this.idempotencyOperation(() => this.idempotencyStore.put(
      "task-idempotency",
      lockId,
      `posting:${requestHash}`,
      TASK_RESULT_TTL_SECONDS,
    ));
    const issue = await this.request(`/repos/${this.owner}/${this.name}/issues`, {
      method: "POST",
      body: JSON.stringify({
        title: `[DEX-TASK] ${normalized.task.title}`,
        body,
      }),
    });
    if (!Number.isSafeInteger(issue?.number) || issue.number <= 0) {
      throw publicError("GITHUB_TASK_RESULT_INVALID", "GitHub returned an invalid task issue.", 502);
    }
    await this.idempotencyOperation(() => this.idempotencyStore.put(
      "task-idempotency",
      lockId,
      `posting:${requestHash}:${issue.number}`,
      TASK_RESULT_TTL_SECONDS,
    ));
    const validated = this.taskIssueResult(issue, requestedIdempotencyKey, requestHash, { existing: false });
    await this.idempotencyOperation(() => this.idempotencyStore.put(
      "task-idempotency",
      lockId,
      `created:${requestHash}:${issue.number}`,
      TASK_RESULT_TTL_SECONDS,
    ));
    return validated;
  }
}
