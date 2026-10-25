import "dotenv/config";
import {
  registerAppResource,
  registerAppTool,
  RESOURCE_MIME_TYPE,
} from "@modelcontextprotocol/ext-apps/server";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { hostHeaderValidation } from "@modelcontextprotocol/sdk/server/middleware/hostHeaderValidation.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import cors from "cors";
import express from "express";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { z } from "zod";
import { GitHubStore } from "./github-store.mjs";
import { OAuthError, createOAuthService } from "./oauth-service.mjs";
import { GitHubTaskRunStore } from "./task-run-store.mjs";
import { validatePersonalTask, assertPersonalProject, buildTaskHandoff } from "./personal-workspace.mjs";
import { GitHubTaskHandoffStore, HandoffTargetSchema } from "./task-handoff-store.mjs";
import { routeTask } from "../../orchestrator/src/router.mjs";
import { envFlag, writePolicy } from "../../../packages/core/src/policy.mjs";
import { TaskContextFields, normalizeTaskContext } from "../../../packages/core/src/task-context.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "../../..");
const CONSOLE_DIR = path.join(ROOT_DIR, "apps/console/public");
const WIDGET_PATH = path.join(ROOT_DIR, "services/mcp-gateway/public/dex-dashboard-widget.html");
const MCP_APP_RUNTIME_PATH = fileURLToPath(import.meta.resolve("@modelcontextprotocol/ext-apps/app-with-deps"));
const MCP_APP_RUNTIME_ROUTE = "/assets/mcp-app-runtime-v1.7.5.js";
const DASHBOARD_URI = "ui://dex-company/dashboard-v2.html";
const SERVICE_VERSION = "0.2.0";
const PORT = Number(process.env.PORT ?? 8787);
const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const PUBLIC_ORIGIN = process.env.DEX_PUBLIC_ORIGIN
  ?? (vercelHost ? `https://${vercelHost}` : `http://localhost:${PORT}`);
const PUBLIC_URL = new URL(PUBLIC_ORIGIN);
export function localListenHost(env = process.env) {
  const configured = String(env.DEX_LISTEN_HOST ?? "").trim();
  return configured || "127.0.0.1";
}
export function claudeWidgetDomain(serverUrl) {
  const normalizedServerUrl = new URL(serverUrl).href;
  const digest = crypto.createHash("sha256").update(normalizedServerUrl).digest("hex").slice(0, 32);
  return `${digest}.claudemcpcontent.com`;
}
const CLAUDE_WIDGET_DOMAIN = claudeWidgetDomain(new URL("/mcp", PUBLIC_URL).href);
const MCP_APP_RUNTIME_URL = new URL(MCP_APP_RUNTIME_ROUTE, PUBLIC_URL).href;
const IS_HOSTED = process.env.NODE_ENV === "production" || Boolean(process.env.VERCEL_ENV);
const SESSION_COOKIE_NAME = PUBLIC_URL.protocol === "https:" ? "__Host-dex_session" : "dex_session";
const OAUTH_NONCE_COOKIE_NAME = PUBLIC_URL.protocol === "https:" ? "__Host-dex_oauth_nonce" : "dex_oauth_nonce";
const IDEMPOTENCY_KEY_PATTERN = /^[A-Za-z0-9][A-Za-z0-9._:-]{7,127}$/;
const MCP_READ_SECURITY = Object.freeze([{ type: "oauth2", scopes: ["dex:read"] }]);
const TASK_REFERENCE_PATTERN = /^(?:(?:issue:)?[1-9][0-9]*|[A-Za-z][A-Za-z0-9._:-]{0,127})$/;
const AnyObject = z.record(z.string(), z.unknown());
const AnyObjectArray = z.array(AnyObject);
const SearchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  url: z.string().url(),
});
const FetchResultSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  url: z.string().url(),
  metadata: AnyObject.optional(),
});

const store = new GitHubStore();
const taskRuns = new GitHubTaskRunStore(store);
const handoffs = new GitHubTaskHandoffStore(store, taskRuns);
const oauth = createOAuthService({ publicOrigin: PUBLIC_ORIGIN });

function dashboardWidgetHtml() {
  return fs.readFileSync(WIDGET_PATH, "utf8")
    .replaceAll("__DEX_MCP_APP_RUNTIME_URL__", MCP_APP_RUNTIME_URL)
    .replaceAll("__DEX_PWA_URL__", PUBLIC_URL.href);
}

function dashboardResourceMeta() {
  return {
    ui: {
      domain: CLAUDE_WIDGET_DOMAIN,
      prefersBorder: true,
      csp: { connectDomains: [], resourceDomains: [PUBLIC_URL.origin] },
    },
    "openai/widgetDescription": "Private Dex Company project, task, provider, and PWA fallback dashboard",
  };
}

const TaskPacketSchema = z.object({
  ...TaskContextFields,
  task: z.object({
    title: z.string().trim().min(1).max(160),
    priority: z.enum(["low", "normal", "high", "urgent"]).optional().default("normal"),
  }),
  project: z.object({
    name: z.string().trim().min(1).max(80).regex(/^[A-Za-z0-9._가-힣-]+$/),
    baseRef: z.string().trim().min(1).max(255).optional().default("main"),
  }),
  request: z.object({
    source: z.string().trim().min(1).max(80),
    clientPlatform: z.string().trim().max(80).optional(),
    objective: z.string().trim().min(1).max(4_000),
    originalText: z.string().trim().max(4_000).optional(),
  }),
  routing: z.object({
    role: z.string().trim().min(1).max(80).default("auto"),
    requiredCapabilities: z.array(z.string().trim().min(1).max(100)).max(30).default([]),
    preferredProvider: z.enum(["auto", "openai", "anthropic"]).default("auto"),
  }),
  acceptanceCriteria: z.array(z.string().trim().min(1).max(500)).max(30).default([]),
  constraints: z.record(z.string(), z.unknown()).optional(),
  execution: z.object({
    riskLevel: z.enum(["low", "medium", "high"]).optional().default("low"),
    idempotencyKey: z.string().regex(IDEMPOTENCY_KEY_PATTERN),
  }),
});

function constantTimeEqual(left, right) {
  const a = Buffer.from(String(left ?? ""));
  const b = Buffer.from(String(right ?? ""));
  return a.length === b.length && crypto.timingSafeEqual(a, b);
}

function bearerToken(req) {
  const match = req.get("authorization")?.match(/^Bearer\s+([^\s]+)$/i);
  return match?.[1] ?? "";
}

function parseCookies(req) {
  const cookies = {};
  for (const pair of String(req.get("cookie") ?? "").split(";")) {
    const index = pair.indexOf("=");
    if (index < 1) continue;
    const name = pair.slice(0, index).trim();
    const value = pair.slice(index + 1).trim();
    if (!name || Object.hasOwn(cookies, name)) continue;
    try { cookies[name] = decodeURIComponent(value); } catch { cookies[name] = ""; }
  }
  return cookies;
}

function serializeCookie({ name, value, maxAgeSeconds, httpOnly = true, secure = false, sameSite = "lax", path: cookiePath = "/" }) {
  const parts = [`${name}=${encodeURIComponent(String(value ?? ""))}`, `Path=${cookiePath}`, `SameSite=${sameSite[0].toUpperCase()}${sameSite.slice(1)}`];
  if (Number.isFinite(maxAgeSeconds)) parts.push(`Max-Age=${Math.max(0, Math.floor(maxAgeSeconds))}`);
  if (httpOnly) parts.push("HttpOnly");
  if (secure) parts.push("Secure");
  return parts.join("; ");
}

function setCookie(res, payload) {
  res.append("Set-Cookie", serializeCookie(payload));
}

function clearCookie(res, name, { cookiePath = "/", secure = PUBLIC_URL.protocol === "https:" } = {}) {
  setCookie(res, { name, value: "", maxAgeSeconds: 0, httpOnly: true, secure, sameSite: "lax", path: cookiePath });
}

function noStore(res) {
  res.set({ "Cache-Control": "no-store", Pragma: "no-cache" });
}

function safeLogError(error) {
  return {
    name: String(error?.name ?? "Error").slice(0, 80),
    code: String(error?.code ?? "UNEXPECTED").slice(0, 120),
    status: Number.isInteger(error?.status) ? error.status : 500,
  };
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;",
  })[character]);
}

function audit(event, req, details = {}) {
  const record = {
    time: new Date().toISOString(),
    event,
    actor: req.dexIdentity?.login ?? req.dexIdentity?.mode ?? "anonymous",
    requestId: req.get("x-vercel-id") ?? crypto.randomUUID(),
    ...details,
  };
  console.info(JSON.stringify(record));
}

const TASK_CREATE_AUDIT_OUTCOMES = new Set([
  "created",
  "duplicate",
  "denied",
  "rate_limited",
  "validation_failed",
  "failed",
]);

function isTaskCreateRequest(req) {
  return req.method === "POST" && (req.path === "/api/tasks" || /^\/api\/tasks\/[^/]+\/handoff$/.test(req.path));
}

function auditTaskCreate(req, outcome, { code, task, issueNumber } = {}) {
  const safeOutcome = TASK_CREATE_AUDIT_OUTCOMES.has(outcome) ? outcome : "failed";
  const details = { outcome: safeOutcome };
  const candidateCode = String(code ?? "");
  if (candidateCode) {
    details.code = /^[A-Z][A-Z0-9_]{0,119}$/.test(candidateCode)
      ? candidateCode
      : "TASK_CREATE_FAILED";
  }
  if (task?.project?.name) details.project = task.project.name;
  if (Number.isSafeInteger(issueNumber)) details.issueNumber = issueNumber;
  if (task?.execution?.idempotencyKey) {
    details.idempotencyKeyHash = crypto
      .createHash("sha256")
      .update(task.execution.idempotencyKey)
      .digest("hex")
      .slice(0, 16);
  }
  audit(req.path.endsWith('/handoff') ? 'handoff.store' : 'task.create', req, details);
}

function hostedUnsafeFlag(name) {
  return envFlag(name, false) && !IS_HOSTED;
}

function legacyAppAvailable() {
  return !IS_HOSTED && envFlag("DEX_ALLOW_LEGACY_APP_TOKEN", false) && Boolean(process.env.DEX_APP_ACCESS_TOKEN);
}

function legacyMcpAvailable() {
  return !IS_HOSTED && envFlag("DEX_ALLOW_STATIC_MCP_BEARER", false) && Boolean(process.env.DEX_MCP_BEARER_TOKEN);
}

async function sessionClaims(req) {
  if (!oauth.configured) return null;
  const token = parseCookies(req)[SESSION_COOKIE_NAME];
  if (!token) return null;
  try {
    return await oauth.verifySessionTokenActive(token);
  } catch (error) {
    if (error instanceof OAuthError && error.status === 503) throw error;
    return null;
  }
}

function legacyAppAuthenticated(req) {
  return legacyAppAvailable()
    && constantTimeEqual(process.env.DEX_APP_ACCESS_TOKEN, req.get("x-dex-access-token"));
}

async function requireAppAccess(req, res, next) {
  try {
    const claims = await sessionClaims(req);
    if (claims) {
      req.dexIdentity = { mode: "session", login: claims.github_login, claims };
      return next();
    }
    if (legacyAppAuthenticated(req)) {
      req.dexIdentity = { mode: "legacy", login: "legacy-preview" };
      return next();
    }
    if (hostedUnsafeFlag("DEX_ALLOW_UNAUTHENTICATED_APP")) {
      req.dexIdentity = { mode: "local-development", login: "local-development" };
      return next();
    }
    if (isTaskCreateRequest(req)) {
      auditTaskCreate(req, "denied", { code: "AUTHENTICATION_REQUIRED" });
    }
    return res.status(401).json({
      error: "GitHub login is required.",
      code: "AUTHENTICATION_REQUIRED",
      loginUrl: oauth.configured ? "/auth/github/start?returnTo=%2F" : null,
    });
  } catch (error) {
    if (isTaskCreateRequest(req)) {
      auditTaskCreate(req, "failed", { code: error?.code ?? "AUTHENTICATION_CHECK_FAILED" });
    }
    return next(error);
  }
}

function requireWriteAuthorization(req, res, next) {
  if (req.dexIdentity?.mode === "session") {
    const supplied = req.get("x-csrf-token");
    if (!constantTimeEqual(req.dexIdentity.claims.csrf, supplied)) {
      if (isTaskCreateRequest(req)) auditTaskCreate(req, "denied", { code: "CSRF_FAILED" });
      return res.status(403).json({ error: "CSRF validation failed.", code: "CSRF_FAILED" });
    }
    return next();
  }
  if (req.dexIdentity?.mode === "legacy") {
    const supplied = req.get("x-dex-admin-token");
    if (!process.env.DEX_ADMIN_TOKEN || !constantTimeEqual(process.env.DEX_ADMIN_TOKEN, supplied)) {
      if (isTaskCreateRequest(req)) auditTaskCreate(req, "denied", { code: "ADMIN_AUTHENTICATION_REQUIRED" });
      return res.status(401).json({ error: "Legacy admin authentication is required.", code: "ADMIN_AUTHENTICATION_REQUIRED" });
    }
    return next();
  }
  if (req.dexIdentity?.mode === "local-development") return next();
  if (isTaskCreateRequest(req)) auditTaskCreate(req, "denied", { code: "AUTHENTICATION_REQUIRED" });
  return res.status(401).json({ error: "Authentication is required.", code: "AUTHENTICATION_REQUIRED" });
}

async function requireMcpAccess(req, res, next) {
  const supplied = bearerToken(req);
  if (oauth.configured && supplied) {
    try {
      const claims = await oauth.verifyAccessTokenActive(supplied);
      req.dexIdentity = { mode: "oauth", login: claims.github_login, claims };
      return next();
    } catch (error) {
      if (error instanceof OAuthError && error.status === 503) return next(error);
      if (!legacyMcpAvailable() || !constantTimeEqual(process.env.DEX_MCP_BEARER_TOKEN, supplied)) {
        res.set("WWW-Authenticate", oauth.wwwAuthenticate(error));
        return res.status(401).json({ error: "invalid_token", error_description: "The bearer access token is invalid or expired." });
      }
    }
  }
  if (legacyMcpAvailable() && constantTimeEqual(process.env.DEX_MCP_BEARER_TOKEN, supplied)) {
    req.dexIdentity = { mode: "static-mcp", login: "legacy-mcp" };
    return next();
  }
  if (hostedUnsafeFlag("DEX_ALLOW_UNAUTHENTICATED_MCP")) {
    req.dexIdentity = { mode: "local-development", login: "local-development" };
    return next();
  }
  if (oauth.configured) res.set("WWW-Authenticate", oauth.wwwAuthenticate());
  return res.status(401).json({ error: "invalid_token", error_description: "OAuth bearer authentication is required." });
}

function rateLimit(namespace, { max, windowMs }) {
  return async (req, res, next) => {
    try {
      const forwarded = IS_HOSTED ? String(req.get("x-vercel-forwarded-for") ?? "").split(",")[0].trim() : "";
      const identity = (req.dexIdentity?.claims?.sub ?? forwarded) || req.ip || req.socket?.remoteAddress || "unknown";
      const bucket = await oauth.consumeRateLimit(namespace, identity, {
        max,
        windowSeconds: Math.max(1, Math.ceil(windowMs / 1_000)),
      });
      res.set("RateLimit-Limit", String(bucket.limit));
      res.set("RateLimit-Remaining", String(Math.max(0, bucket.limit - bucket.count)));
      if (!bucket.allowed) {
        const nowSeconds = Math.floor(Date.now() / 1_000);
        res.set("Retry-After", String(Math.max(1, bucket.resetAt - nowSeconds)));
        if (namespace === "task-create") auditTaskCreate(req, "rate_limited", { code: "RATE_LIMITED" });
        return res.status(429).json({ error: "Too many requests.", code: "RATE_LIMITED" });
      }
      return next();
    } catch (error) {
      if (namespace === "task-create") {
        auditTaskCreate(req, "failed", { code: error?.code ?? "RATE_LIMIT_CHECK_FAILED" });
      }
      return next(error);
    }
  };
}

function parseTaskPacket(body) {
  const result = TaskPacketSchema.safeParse(body);
  if (!result.success) {
    const error = new Error("Task packet validation failed.");
    error.name = "ValidationError";
    error.code = "TASK_PACKET_INVALID";
    error.status = 400;
    error.details = result.error.issues.slice(0, 12).map((issue) => ({
      path: issue.path.join("."),
      message: issue.message,
    }));
    throw error;
  }
  const task = result.data;
  Object.assign(task, normalizeTaskContext(task));
  task.request.originalText ??= task.request.objective;
  return validatePersonalTask(task);
}

function providerStatus() {
  return {
    openai: {
      available: true,
      subscriptionReady: envFlag("DEX_OPENAI_SUBSCRIPTION_READY", false),
      worker: "codex-app-server",
      authMode: "chatgpt-managed",
      note: "Run npm run codex:status on the worker host.",
    },
    anthropic: {
      available: true,
      subscriptionReady: envFlag("DEX_ANTHROPIC_SUBSCRIPTION_READY", false),
      worker: "claude-code",
      authMode: "claude-subscription",
      note: "Run npm run claude:status on the worker host.",
    },
  };
}

function textResult(text, structuredContent = {}) {
  return { content: [{ type: "text", text }], structuredContent };
}

function jsonResult(structuredContent) {
  return { content: [{ type: "text", text: JSON.stringify(structuredContent) }], structuredContent };
}

function readHandler(identity, handler) {
  if (!["oauth", "static-mcp", "local-development"].includes(identity.mode)) {
    throw new Error("MCP authorization invariant violated.");
  }
  return handler;
}

function normalizeSearchResult(result) {
  return {
    id: String(result.id),
    title: String(result.title ?? result.path ?? result.id),
    url: String(result.url),
  };
}

function normalizeFetchResult(resource, requestedId) {
  const metadata = Object.fromEntries(Object.entries({
    path: resource.path,
    sha: resource.sha,
    repository: resource.repository,
    ref: resource.ref,
  }).filter(([, value]) => value !== undefined && value !== null && value !== ""));
  return {
    id: String(resource.id ?? requestedId),
    title: String(resource.title ?? resource.path ?? requestedId),
    text: String(resource.text ?? resource.content ?? ""),
    url: String(resource.url),
    ...(Object.keys(metadata).length > 0 ? { metadata } : {}),
  };
}

export function canonicalTaskStatusView(status) {
  const lastEvent = status.events?.at?.(-1) ?? null;
  return {
    schemaVersion: "1.0",
    taskId: status.taskId,
    issueNumber: status.issueNumber,
    title: status.title,
    state: status.state,
    statusVersion: status.statusVersion,
    createdAt: status.createdAt ?? null,
    updatedAt: status.updatedAt ?? null,
    latestAttemptId: status.latestAttemptId ?? null,
    resultAvailable: Boolean(status.resultAvailable),
    resultHash: status.resultHash ?? null,
    unresolvedWriter: Boolean(status.unresolvedWriter),
    progress: {
      checkpoint: lastEvent?.kind ?? status.packet?.execution?.checkpoint ?? null,
      eventCount: status.events?.length ?? 0,
      lastEvent: lastEvent ? {
        kind: lastEvent.kind,
        state: lastEvent.to,
        createdAt: lastEvent.createdAt,
      } : null,
    },
    url: status.url,
  };
}

export function createMcpServer(
  identity = { mode: "anonymous" },
  repositoryStore = store,
  taskRunReader = null,
) {
  const server = new McpServer({ name: "dex-company", version: SERVICE_VERSION });
  let resolvedTaskRunReader = taskRunReader;
  const getTaskRunReader = () => {
    resolvedTaskRunReader ??= new GitHubTaskRunStore(repositoryStore);
    return resolvedTaskRunReader;
  };
  const getHandoffs = () => new GitHubTaskHandoffStore(repositoryStore, getTaskRunReader());

  server.registerTool("search", {
    title: "Search Dex Company",
    description: "Search canonical GitHub-backed Dex Company projects, policies, decisions, tasks, and knowledge notes. Use before fetch when the exact path is unknown.",
    inputSchema: {
      query: z.string().trim().min(1).max(500).describe("Search query"),
    },
    outputSchema: { results: z.array(SearchResultSchema) },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ query }) => {
    const results = (await repositoryStore.search(query, 10)).map(normalizeSearchResult);
    return jsonResult({ results });
  }));

  server.registerTool("fetch", {
    title: "Fetch Dex Company Resource",
    description: "Read one canonical GitHub repository path or task issue in full. Pass a search result id, repository path, or issue:<number>.",
    inputSchema: { id: z.string().trim().min(1).max(500).describe("Repository path or issue:<number>") },
    outputSchema: FetchResultSchema.shape,
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ id }) => {
    const resource = normalizeFetchResult(await repositoryStore.fetchResource(id), id);
    return jsonResult(resource);
  }));

  server.registerTool("list_projects", {
    title: "List Dex Company Projects",
    description: "List projects from the canonical 10_Projects directory with concise CURRENT.md state summaries.",
    inputSchema: {},
    outputSchema: { projects: AnyObjectArray },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async () => {
    const projects = await repositoryStore.listProjects();
    return textResult(`Loaded ${projects.length} projects.`, { projects });
  }));

  server.registerTool("get_project_state", {
    title: "Get Project State",
    description: "Read PROJECT_CONFIG, CURRENT, SESSION_HANDOFF, DECISIONS, and QA_REPORT for one canonical Dex Company project.",
    inputSchema: { project: z.string().trim().min(1).max(80) },
    outputSchema: { state: AnyObject },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ project }) => {
    const projectState = await repositoryStore.getProjectState(project);
    return textResult(`Loaded canonical state for ${project}.`, { state: projectState });
  }));

  server.registerTool("list_tasks", {
    title: "List Dex Tasks",
    description: "List open, closed, or all GitHub Issues whose title begins with [DEX-TASK].",
    inputSchema: { state: z.enum(["open", "closed", "all"]).optional() },
    outputSchema: { tasks: AnyObjectArray },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ state }) => {
    const tasks = await repositoryStore.listTasks(state ?? "open");
    return textResult(`Loaded ${tasks.length} Dex tasks.`, { tasks });
  }));

  server.registerTool("get_task_status", {
    title: "Get Canonical Task Status",
    description: "Read one Dex Task's bounded canonical execution state and progress by canonical Task ID, issue:<number>, or issue number. GitHub open/closed state is not treated as task completion.",
    inputSchema: {
      taskId: z.string().trim().min(1).max(128).regex(TASK_REFERENCE_PATTERN),
    },
    outputSchema: { status: AnyObject },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ taskId }) => {
    const status = canonicalTaskStatusView(await getTaskRunReader().getTaskStatus(taskId));
    return textResult(`Loaded canonical status for ${status.taskId}.`, { status });
  }));

  server.registerTool("get_task_result", {
    title: "Get Canonical Task Result",
    description: "Read the durable canonical Result/receipt and acceptance evidence for one Dex Task. This never starts or retries a worker.",
    inputSchema: {
      taskId: z.string().trim().min(1).max(128).regex(TASK_REFERENCE_PATTERN),
    },
    outputSchema: { result: AnyObject },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ taskId }) => {
    const result = await getTaskRunReader().getTaskResult(taskId);
    return textResult(`Loaded canonical result for ${result.taskId}.`, { result });
  }));

  server.registerTool("list_handoffs", {
    title: "Find Shared Dex Handoffs",
    description: "At cross-AI continuation, find GitHub-backed handoffs for this AI without asking the user to copy text. Target is a routing label, not identity verification. Follow nextPage when needed; entries are not execution approvals or delivery acknowledgements.",
    inputSchema: { target: HandoffTargetSchema, page: z.number().int().min(1).max(100).optional() },
    outputSchema: { items: AnyObjectArray, warnings: AnyObjectArray, page: z.number(), nextPage: z.number().nullable(), truncated: z.boolean(), receiverStatus: z.string(), executionAuthorized: z.boolean() },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async input => jsonResult(await getHandoffs().list(input))));

  server.registerTool("get_task_handoff", {
    title: "Continue a Shared Dex Task",
    description: "Load the same Task's latest objective, sources, acceptance criteria, state, result and verified main revision. Read this after list_handoffs or with a known Task ID. Revalidates saved snapshots; never starts a worker, takes ownership or writes a receipt.",
    inputSchema: { taskId: z.string().trim().min(1).max(128).regex(TASK_REFERENCE_PATTERN), target: HandoffTargetSchema.optional() },
    outputSchema: { handoff: AnyObject, delivery: AnyObject.nullable(), currentState: z.string(), statusVersion: z.number(), unresolvedWriter: z.boolean(), executionAuthorized: z.boolean(), instructions: z.string() },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async ({ taskId, target }) => jsonResult(await getHandoffs().get(taskId, target))));

  server.registerTool("get_provider_status", {
    title: "Get Provider and Platform Status",
    description: "Report the configured subscription workers, client surfaces, and server-side write policy without invoking paid APIs.",
    inputSchema: {},
    outputSchema: {
      providers: AnyObject,
      writePolicy: AnyObject,
      pwa: z.string().url(),
    },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
  }, readHandler(identity, async () => textResult("Loaded provider and platform status.", {
    providers: providerStatus(),
    writePolicy: writePolicy(),
    pwa: PUBLIC_ORIGIN,
  })));

  registerAppTool(server, "render_dashboard", {
    title: "Open Dex Company Dashboard",
    description: "Render an interactive project, task, and provider overview. Use the dedicated read tools first when detailed source content is required.",
    inputSchema: { project: z.string().trim().max(80).optional() },
    outputSchema: {
      project: z.string().optional(),
      projects: AnyObjectArray,
      tasks: AnyObjectArray,
      providers: AnyObject,
      pwaUrl: z.string().url(),
    },
    securitySchemes: MCP_READ_SECURITY,
    annotations: { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false },
    _meta: { securitySchemes: MCP_READ_SECURITY, ui: { resourceUri: DASHBOARD_URI } },
  }, readHandler(identity, async ({ project }) => {
    const [projects, tasks] = await Promise.all([repositoryStore.listProjects(), repositoryStore.listTasks("open")]);
    return textResult("The Dex Company dashboard is ready.", {
      project,
      projects,
      tasks,
      providers: providerStatus(),
      pwaUrl: PUBLIC_ORIGIN,
    });
  }));

  if (writePolicy().mcpEnabled && ["static-mcp", "local-development"].includes(identity.mode)) {
    server.registerTool("create_task", {
    title: "Create Dex Task",
    description: "Create an idempotent [DEX-TASK] GitHub Issue only when MCP writes are explicitly enabled. OAuth connectors are read-only by default; use the authenticated PWA for writes.",
    inputSchema: {
      ...TaskContextFields,
      title: z.string().trim().min(1).max(160),
      project: z.string().trim().min(1).max(80),
      objective: z.string().trim().min(1).max(4_000),
      requiredCapabilities: z.array(z.string().trim().min(1).max(100)).max(30).optional(),
      acceptanceCriteria: z.array(z.string().trim().min(1).max(500)).max(30).optional(),
      idempotencyKey: z.string().regex(IDEMPOTENCY_KEY_PATTERN),
    },
    securitySchemes: MCP_READ_SECURITY,
    _meta: { securitySchemes: MCP_READ_SECURITY },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true },
    }, async (input) => {
      const created = await repositoryStore.createTaskIssue({
        task: { title: input.title },
        project: { name: input.project, baseRef: "main" },
        request: { source: "mcp", objective: input.objective, originalText: input.objective },
        routing: { role: "auto", requiredCapabilities: input.requiredCapabilities ?? [], preferredProvider: "auto" },
        acceptanceCriteria: input.acceptanceCriteria ?? [],
        ...normalizeTaskContext(input),
        execution: { idempotencyKey: input.idempotencyKey },
      });
      return textResult(created.existing ? `Returned existing Dex task ${created.id}.` : `Created Dex task ${created.id}.`, {
        created,
        duplicate: Boolean(created.existing),
      });
    });
  }

  registerAppResource(server, "Dex Company Dashboard", DASHBOARD_URI, {
    mimeType: RESOURCE_MIME_TYPE,
    description: "Responsive Dex Company project and task dashboard",
    _meta: dashboardResourceMeta(),
  }, async () => ({
    contents: [{
      uri: DASHBOARD_URI,
      mimeType: RESOURCE_MIME_TYPE,
      text: dashboardWidgetHtml(),
      _meta: dashboardResourceMeta(),
    }],
  }));

  return server;
}

function hostname(value) {
  if (!value) return null;
  try { return new URL(value.includes("://") ? value : `https://${value}`).hostname; } catch { return null; }
}

function requireMcpOrigin(req, res, next) {
  const originHeader = req.get("origin");
  if (!originHeader) return next();

  let requestOrigin;
  try {
    requestOrigin = new URL(originHeader).origin;
  } catch {
    requestOrigin = null;
  }
  if (requestOrigin !== PUBLIC_URL.origin) {
    return res.status(403).json({
      error: "invalid_origin",
      code: "MCP_ORIGIN_REJECTED",
    });
  }
  return next();
}

const allowedHosts = [...new Set([
  PUBLIC_URL.hostname,
  hostname(process.env.VERCEL_URL),
  hostname(process.env.VERCEL_PROJECT_PRODUCTION_URL),
  "localhost",
  "127.0.0.1",
  "[::1]",
].filter(Boolean))];

const app = express();
app.disable("x-powered-by");
app.use(hostHeaderValidation(allowedHosts));
app.use(cors({ origin: false }));
app.use((req, res, next) => {
  res.set({
    "X-Content-Type-Options": "nosniff",
    "Referrer-Policy": "no-referrer",
    "Permissions-Policy": "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    "Content-Security-Policy": "default-src 'self'; base-uri 'none'; object-src 'none'; frame-ancestors 'none'; form-action 'self' https://github.com; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'",
  });
  if (PUBLIC_URL.protocol === "https:") res.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  if (req.path === "/mcp" || req.path.startsWith("/api/") || req.path.startsWith("/auth/") || req.path.startsWith("/oauth/") || req.path.startsWith("/.well-known/")) noStore(res);
  next();
});
app.use("/mcp", requireMcpOrigin);
app.use(express.json({ limit: "64kb", type: ["application/json", "application/*+json"] }));
app.use(express.urlencoded({ extended: false, limit: "32kb" }));

app.get("/health", (_req, res) => res.json({
  status: "ok",
  service: "dex-company-runtime",
  version: SERVICE_VERSION,
  runtime: `node-${process.versions.node}`,
  costMode: "subscription-only",
}));

app.get(["/.well-known/oauth-protected-resource", "/.well-known/oauth-protected-resource/mcp"], (_req, res, next) => {
  try { res.json(oauth.protectedResourceMetadata()); } catch (error) { next(error); }
});

app.get("/.well-known/oauth-authorization-server", (_req, res, next) => {
  try { res.json(oauth.authorizationServerMetadata()); } catch (error) { next(error); }
});

app.post("/oauth/register", rateLimit("oauth-register", { max: 30, windowMs: 60_000 }), (req, res, next) => {
  try {
    const registered = oauth.registerClient(req.body);
    res.status(201).json(registered);
  } catch (error) { next(error); }
});

app.get("/oauth/authorize", rateLimit("oauth-authorize", { max: 30, windowMs: 60_000 }), (req, res, next) => {
  try {
    const started = oauth.beginMcpAuthorization(req.query, {
      browserNonce: parseCookies(req)[OAUTH_NONCE_COOKIE_NAME],
    });
    setCookie(res, started.stateCookiePayload);
    const clientName = escapeHtml(started.consent.clientName);
    const redirectUri = escapeHtml(started.consent.redirectUri);
    const requestedScope = escapeHtml(started.consent.scope);
    const opaqueState = escapeHtml(started.opaqueState);
    const offlineNotice = started.consent.offlineAccess
      ? `<p><strong>지속 연결:</strong> 이 요청은 <code>offline_access</code>를 포함합니다. 승인하면 각 refresh token은 최대 ${Math.ceil(started.consent.refreshTokenMaxAgeSeconds / 86_400)}일 동안 일회용으로 회전하며, 최초 승인 후 최대 ${Math.ceil(started.consent.refreshFamilyMaxAgeSeconds / 86_400)}일까지 Ethan님이 자리에 없어도 연결을 갱신할 수 있습니다. 재사용이 감지되면 해당 token family 전체를 폐기합니다.</p>`
      : "<p>이 요청은 refresh token을 발급하지 않으며 access token 만료 후 다시 승인이 필요합니다.</p>";
    res.status(200).type("html").send(`<!doctype html>
<html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Dex Company 연결 승인</title><style>body{font-family:system-ui,sans-serif;max-width:42rem;margin:8vh auto;padding:1.5rem;line-height:1.55;color:#111827}main{border:1px solid #d1d5db;border-radius:16px;padding:1.5rem}code{overflow-wrap:anywhere}form{display:flex;gap:.75rem;margin-top:1.5rem}button{padding:.7rem 1rem;border-radius:10px;border:1px solid #9ca3af;background:#fff;cursor:pointer}button[value=approve]{background:#111827;color:#fff}</style></head>
  <body><main><h1>Dex Company 읽기 권한 승인</h1><p><strong>${clientName}</strong> 클라이언트가 Ethan님의 private Dex Company GitHub 지식과 작업 상태를 읽도록 요청했습니다.</p><p>반환 주소: <code>${redirectUri}</code></p><p>요청 범위: <code>${requestedScope}</code>. 승인하면 GitHub에서 본인 계정을 확인한 뒤 읽기 전용 access token을 발급합니다.</p>${offlineNotice}<p>신뢰하지 않는 주소라면 거부해 주세요.</p>
<form method="post" action="/oauth/authorize/continue"><input type="hidden" name="state" value="${opaqueState}"><button type="submit" name="decision" value="deny">거부</button><button type="submit" name="decision" value="approve">GitHub로 계속</button></form></main></body></html>`);
  } catch (error) { next(error); }
});

app.post("/oauth/authorize/continue", rateLimit("oauth-consent", { max: 30, windowMs: 60_000 }), async (req, res, next) => {
  try {
    const continued = await oauth.continueMcpAuthorization({
      state: req.body.state,
      decision: req.body.decision,
      browserNonce: parseCookies(req)[OAUTH_NONCE_COOKIE_NAME],
    });
    if (!continued.approved) clearCookie(res, OAUTH_NONCE_COOKIE_NAME, { cookiePath: "/" });
    res.redirect(302, continued.redirectUrl);
  } catch (error) { next(error); }
});

app.post("/oauth/token", rateLimit("oauth-token", { max: 60, windowMs: 60_000 }), async (req, res, next) => {
  try {
    const token = await oauth.exchangeToken(req.body);
    noStore(res);
    res.json(token);
  } catch (error) { next(error); }
});

app.get("/auth/github/start", rateLimit("pwa-login", { max: 20, windowMs: 60_000 }), (req, res, next) => {
  try {
    const started = oauth.beginPwaLogin({
      browserNonce: parseCookies(req)[OAUTH_NONCE_COOKIE_NAME],
      returnTo: req.query.returnTo,
    });
    setCookie(res, started.stateCookiePayload);
    res.redirect(302, started.redirectUrl);
  } catch (error) { next(error); }
});

app.get("/auth/github/callback", rateLimit("github-callback", { max: 40, windowMs: 60_000 }), async (req, res, next) => {
  try {
    const result = await oauth.handleGitHubCallback({
      ...req.query,
      browserNonce: parseCookies(req)[OAUTH_NONCE_COOKIE_NAME],
    });
    clearCookie(res, OAUTH_NONCE_COOKIE_NAME, { cookiePath: "/" });
    if (result.flow === "pwa") {
      setCookie(res, {
        name: SESSION_COOKIE_NAME,
        value: result.sessionToken,
        maxAgeSeconds: Math.max(1, result.sessionExpiresAt - Math.floor(Date.now() / 1_000)),
        httpOnly: true,
        secure: PUBLIC_URL.protocol === "https:",
        sameSite: "lax",
        path: "/",
      });
      audit("pwa.login", req, { outcome: "success" });
    }
    res.redirect(302, result.redirectUrl);
  } catch (error) {
    clearCookie(res, OAUTH_NONCE_COOKIE_NAME, { cookiePath: "/" });
    next(error);
  }
});

app.get("/api/session", async (req, res, next) => {
  try {
    const claims = await sessionClaims(req);
    const legacyAuthenticated = legacyAppAuthenticated(req);
    const localDevelopment = hostedUnsafeFlag("DEX_ALLOW_UNAUTHENTICATED_APP");
    if (!claims && parseCookies(req)[SESSION_COOKIE_NAME]) clearCookie(res, SESSION_COOKIE_NAME);
    res.json({
      authConfigured: oauth.configured,
      authenticated: Boolean(claims || legacyAuthenticated || localDevelopment),
      login: claims?.github_login ?? (legacyAuthenticated ? "legacy-preview" : localDevelopment ? "local-development" : null),
      csrfToken: claims?.csrf ?? null,
      loginUrl: oauth.configured ? "/auth/github/start?returnTo=%2F" : null,
      legacyAvailable: legacyAppAvailable(),
    });
  } catch (error) {
    next(error);
  }
});

app.post("/auth/logout", requireAppAccess, requireWriteAuthorization, async (req, res, next) => {
  try {
    if (req.dexIdentity?.mode === "session") {
      await oauth.revokeSessionToken(parseCookies(req)[SESSION_COOKIE_NAME]);
    }
    clearCookie(res, SESSION_COOKIE_NAME);
    audit("pwa.logout", req, { outcome: "success" });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
});

app.get("/api/status", requireAppAccess, (_req, res) => res.json({
  githubConnected: store.configured,
  providers: providerStatus(),
  writes: writePolicy(),
  subscriptionOnly: true,
  publicOrigin: PUBLIC_ORIGIN,
  authMode: "github-oauth",
}));

app.get("/api/github-diagnostics", requireAppAccess, async (_req, res, next) => {
  try { res.json(await store.diagnose()); } catch (error) { next(error); }
});

app.get("/api/platform-capabilities", requireAppAccess, (_req, res) => {
  const payload = JSON.parse(fs.readFileSync(path.join(ROOT_DIR, "config/platform-capabilities.json"), "utf8"));
  res.json(payload);
});

app.get("/api/projects", requireAppAccess, async (_req, res, next) => {
  try { res.json({ projects: await store.listProjects() }); } catch (error) { next(error); }
});

app.get("/api/tasks", requireAppAccess, async (req, res, next) => {
  try {
    const state = ["open", "closed", "all"].includes(req.query.state) ? req.query.state : "open";
    res.json({ tasks: await store.listTasks(state) });
  } catch (error) { next(error); }
});

app.get("/api/tasks/:taskReference/status", requireAppAccess, rateLimit("task-read", { max: 120, windowMs: 60_000 }), async (req, res, next) => {
  try {
    res.json({ status: canonicalTaskStatusView(await taskRuns.getTaskStatus(req.params.taskReference)) });
  } catch (error) { next(error); }
});

app.get("/api/tasks/:taskReference/result", requireAppAccess, rateLimit("task-read", { max: 120, windowMs: 60_000 }), async (req, res, next) => {
  try {
    res.json({ result: await taskRuns.getTaskResult(req.params.taskReference) });
  } catch (error) { next(error); }
});

app.get("/api/tasks/:taskReference/handoff", requireAppAccess, rateLimit("task-read", { max: 120, windowMs: 60_000 }), async (req, res, next) => {
  try {
    const status = await taskRuns.getTaskStatus(req.params.taskReference);
    const commit = await store.request(`/repos/${store.owner}/${store.name}/commits/main`);
    res.json({ handoff: buildTaskHandoff(status, { repository: `${store.owner}/${store.name}`, commitSha: commit.sha }) });
  } catch (error) { next(error); }
});

app.post("/api/tasks/:taskReference/handoff", requireAppAccess, requireWriteAuthorization, rateLimit("task-create", { max: 12, windowMs: 60_000 }), async (req, res, next) => {
  try {
    if (!writePolicy().pwaEnabled) {
      auditTaskCreate(req, 'denied', { code: 'PWA_WRITE_DISABLED' });
      return res.status(403).json({ error: "PWA writes are disabled.", code: "PWA_WRITE_DISABLED" });
    }
    const delivery = await handoffs.publish(req.params.taskReference, req.body);
    auditTaskCreate(req, delivery.duplicate ? 'duplicate' : 'created', { issueNumber: delivery.issueNumber });
    res.status(delivery.duplicate ? 200 : 201).json({ delivery });
  } catch (error) {
    auditTaskCreate(req, error?.code === 'HANDOFF_INPUT_INVALID' ? 'validation_failed' : 'failed', { code: error?.code ?? 'HANDOFF_FAILED' });
    next(error);
  }
});

app.post("/api/tasks/preview", requireAppAccess, rateLimit("task-preview", { max: 60, windowMs: 60_000 }), async (req, res, next) => {
  try {
    const task = parseTaskPacket(req.body);
    await assertPersonalProject(task, store);
    res.json({ route: routeTask(task, providerStatus()), task });
  } catch (error) { next(error); }
});

app.post("/api/tasks", requireAppAccess, requireWriteAuthorization, rateLimit("task-create", { max: 12, windowMs: 60_000 }), async (req, res, next) => {
  let task;
  try {
    if (!writePolicy().pwaEnabled) {
      auditTaskCreate(req, "denied", { code: "PWA_WRITE_DISABLED" });
      return res.status(403).json({ error: "PWA writes are disabled.", code: "PWA_WRITE_DISABLED" });
    }
    task = parseTaskPacket(req.body);
    const created = await store.createTaskIssue(task, task.constraints?.personalWorkspace
      ? { validateNew: () => assertPersonalProject(task, store) } : {});
    auditTaskCreate(req, created.existing ? "duplicate" : "created", {
      task,
      issueNumber: created.issueNumber,
    });
    res.status(created.existing ? 200 : 201).json({ ...created, duplicate: Boolean(created.existing) });
  } catch (error) {
    auditTaskCreate(req, error?.code === "TASK_PACKET_INVALID" ? "validation_failed" : "failed", {
      code: error?.code ?? "TASK_CREATE_FAILED",
      task,
    });
    next(error);
  }
});

app.all("/mcp", requireMcpAccess, rateLimit("mcp", { max: 180, windowMs: 60_000 }), async (req, res) => {
  const server = createMcpServer(req.dexIdentity);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
  res.on("close", () => {
    transport.close().catch(() => {});
    server.close().catch(() => {});
  });
  try {
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP request failed", safeLogError(error));
    if (!res.headersSent) {
      res.status(500).json({ jsonrpc: "2.0", error: { code: -32603, message: "Internal server error" }, id: null });
    }
  }
});

app.get("/logged-out", (_req, res) => {
  noStore(res);
  res.sendFile(path.join(CONSOLE_DIR, "logged-out.html"));
});

app.get(MCP_APP_RUNTIME_ROUTE, (_req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Cache-Control": "public, max-age=31536000, immutable",
    "Cross-Origin-Resource-Policy": "cross-origin",
    "X-Content-Type-Options": "nosniff",
  });
  res.type("application/javascript");
  res.sendFile(MCP_APP_RUNTIME_PATH, (error) => {
    if (error) next(error);
  });
});

app.use(express.static(CONSOLE_DIR, {
  extensions: ["html"],
  index: false,
  setHeaders(res, assetPath) {
    if (/\.(?:js|css|png|svg|webmanifest)$/i.test(assetPath)) res.set("Cache-Control", "public, max-age=0, must-revalidate");
  },
}));

app.get("/", async (req, res, next) => {
  try {
    noStore(res);
    const authenticated = Boolean(await sessionClaims(req));
    const legacyRequested = req.query.legacy === "1" && legacyAppAvailable();
    if (oauth.configured && !authenticated && !legacyRequested && !hostedUnsafeFlag("DEX_ALLOW_UNAUTHENTICATED_APP")) {
      return res.redirect(302, "/auth/github/start?returnTo=%2F");
    }
    return res.sendFile(path.join(CONSOLE_DIR, "index.html"));
  } catch (error) {
    return next(error);
  }
});

app.use((error, req, res, _next) => {
  console.error("Request failed", safeLogError(error));
  noStore(res);
  if (error instanceof OAuthError) {
    if (error.status === 401 && oauth.configured) res.set("WWW-Authenticate", oauth.wwwAuthenticate(error));
    return res.status(error.status).json(error.toJSON());
  }
  if (error?.type === "entity.too.large") {
    if (isTaskCreateRequest(req)) auditTaskCreate(req, "validation_failed", { code: "PAYLOAD_TOO_LARGE" });
    return res.status(413).json({ error: "Request body is too large.", code: "PAYLOAD_TOO_LARGE" });
  }
  if (error?.type === "entity.parse.failed") {
    if (isTaskCreateRequest(req)) auditTaskCreate(req, "validation_failed", { code: "INVALID_JSON" });
    return res.status(400).json({ error: "Request body is not valid JSON.", code: "INVALID_JSON" });
  }
  if (error?.code === "TASK_PACKET_INVALID") {
    return res.status(400).json({ error: error.message, code: error.code, details: error.details });
  }
  if (error?.source === "github") {
    return res.status(error.status ?? 502).json({
      error: error.message ?? "GitHub request failed.",
      code: error.code ?? "GITHUB_REQUEST_FAILED",
      source: "github",
    });
  }
  return res.status(Number.isInteger(error?.status) ? error.status : 500).json({
    error: Number.isInteger(error?.status) && error.status < 500 ? String(error.message ?? "Request failed.") : "Internal server error.",
    code: String(error?.code ?? "INTERNAL_ERROR"),
  });
});

export default app;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const listenHost = localListenHost();
  app.listen(PORT, listenHost, () => {
    console.log(`Dex Company PWA: ${PUBLIC_ORIGIN}`);
    console.log(`Dex MCP endpoint: ${PUBLIC_ORIGIN}/mcp`);
    console.log(`Local listener: ${listenHost}:${PORT}`);
  });
}
