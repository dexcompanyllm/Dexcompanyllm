import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const modulePath = fileURLToPath(import.meta.url);
const root = path.resolve(path.dirname(modulePath), "..");
const required = [
  ".node-version",
  "package.json",
  "local-server.mjs",
  "api/index.mjs",
  "vercel.json",
  "apps/console/public/index.html",
  "apps/console/public/manifest.webmanifest",
  "services/mcp-gateway/src/server.mjs",
  "services/mcp-gateway/public/dex-dashboard-widget.html",
  "services/orchestrator/src/router.mjs",
  "workers/openai-codex/src/adapter.mjs",
  "workers/anthropic-claude/src/adapter.mjs",
  "docs/SECURITY.md",
];

export const EXCLUDED_DIRECTORY_NAMES = new Set([
  ".cache",
  ".git",
  ".next",
  ".nuxt",
  ".output",
  ".parcel-cache",
  ".turbo",
  ".vercel",
  "build",
  "cache",
  "coverage",
  "dist",
  "node_modules",
  "out",
  "playwright-report",
  "temp",
  "test-results",
  "tmp",
]);

export function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    if (entry.isSymbolicLink()) return [];
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      return EXCLUDED_DIRECTORY_NAMES.has(entry.name.toLowerCase()) ? [] : walk(full);
    }
    return entry.isFile() ? [full] : [];
  });
}

function isPlaceholder(value) {
  const normalized = String(value).trim().toLowerCase();
  if (!normalized || /^(?:""|'')$/.test(normalized)) return true;
  if (/^<[^>\r\n]+>$/.test(normalized)) return true;
  if (/^[|>][-+]?$/.test(normalized)) return true;
  if (/^\$\{\{?[\s\S]*\}?\}$/.test(normalized)) return true;
  if (/^(?:(?:github_pat_|gh[pousr]_|sk-(?:ant|proj)-))?(?:change[-_]?me|dummy|example|not[-_]?set|placeholder|redacted|replace[-_]?me|sample|your)(?:[-_][a-z0-9]+)*$/.test(normalized)) {
    return true;
  }
  if (/^(?:smoke|server[-_]integration|synthetic[-_]fixture|test[-_]fixture|(?:direct|marketplace|mixed)[-_]unit[-_]test)(?:[-_][a-z0-9]+)*$/.test(normalized)) {
    return true;
  }

  const material = normalized
    .replace(/^(?:github_pat_|gh[pousr]_|sk-(?:ant|proj)-)/, "")
    .replace(/[^a-z0-9]/g, "");
  return material.length >= 12 && new Set(material).size <= 2;
}

const SENSITIVE_ENV_NAMES = Object.freeze([
  "DEX_ADMIN_TOKEN",
  "DEX_APP_ACCESS_TOKEN",
  "DEX_AUTH_SECRET_B64",
  "DEX_MCP_BEARER_TOKEN",
  "GITHUB_APP_CLIENT_SECRET",
  "KV_REST_API_TOKEN",
  "UPSTASH_REDIS_REST_TOKEN",
]);

const SENSITIVE_ENV_NAME_PATTERN = SENSITIVE_ENV_NAMES.join("|");
const DOTENV_ASSIGNMENT = new RegExp(
  `^[\\t ]*(?:(?:export|set|ENV)[\\t ]+|\\$env:)?(${SENSITIVE_ENV_NAME_PATTERN})[\\t ]*=[\\t ]*(.*)$`,
  "gim",
);
const PROCESS_ENV_LITERAL_ASSIGNMENT = new RegExp(
  `\\bprocess\\.env\\.(${SENSITIVE_ENV_NAME_PATTERN})[\\t ]*=[\\t ]*(["'\\x60])([^\\r\\n]*?)\\2[\\t ]*;?`,
  "gi",
);
const PROCESS_ENV_BRACKET_LITERAL_ASSIGNMENT = new RegExp(
  `\\bprocess\\.env[\\t ]*\\[[\\t ]*(["'])(${SENSITIVE_ENV_NAME_PATTERN})\\1[\\t ]*\\][\\t ]*=[\\t ]*(["'\\x60])([^\\r\\n]*?)\\3[\\t ]*;?`,
  "gi",
);
const DOCKER_ENV_SPACE_ASSIGNMENT = new RegExp(
  `^[\\t ]*ENV[\\t ]+(${SENSITIVE_ENV_NAME_PATTERN})[\\t ]+([^\\r\\n]+)$`,
  "gim",
);
const COLON_QUOTED_LITERAL_ASSIGNMENT = new RegExp(
  `(?:^|[,{\\r\\n])[\\t ]*["']?(${SENSITIVE_ENV_NAME_PATTERN})["']?[\\t ]*:[\\t ]*((?:"[^"\\r\\n]*"|'[^'\\r\\n]*'))`,
  "gi",
);
const YAML_PLAIN_ASSIGNMENT = new RegExp(
  `^[\\t ]*(?:-[\\t ]+)?(${SENSITIVE_ENV_NAME_PATTERN})[\\t ]*:[\\t ]*([^\\r\\n#]*?)[\\t ]*(?:#.*)?$`,
  "gim",
);

function assignedValue(rawValue) {
  let value = String(rawValue).trim();
  if (!value) return "";

  const quote = value[0];
  if (quote === '"' || quote === "'" || quote === "`") {
    const closing = value.lastIndexOf(quote);
    if (closing > 0) return value.slice(1, closing).trim();
  }

  value = value.replace(/[\\t ]+#.*$/, "").trim();
  return value;
}

function findSensitiveEnvAssignments(content) {
  const findings = new Set();
  for (const match of content.matchAll(DOTENV_ASSIGNMENT)) {
    if (!isPlaceholder(assignedValue(match[2]))) findings.add(`env-secret:${match[1].toUpperCase()}`);
  }
  for (const match of content.matchAll(PROCESS_ENV_LITERAL_ASSIGNMENT)) {
    if (match[2] === "`" && match[3].includes("${")) continue;
    if (!isPlaceholder(match[3])) findings.add(`env-secret:${match[1].toUpperCase()}`);
  }
  for (const match of content.matchAll(PROCESS_ENV_BRACKET_LITERAL_ASSIGNMENT)) {
    if (match[3] === "`" && match[4].includes("${")) continue;
    if (!isPlaceholder(match[4])) findings.add(`env-secret:${match[2].toUpperCase()}`);
  }
  for (const match of content.matchAll(DOCKER_ENV_SPACE_ASSIGNMENT)) {
    if (!isPlaceholder(assignedValue(match[2]))) findings.add(`env-secret:${match[1].toUpperCase()}`);
  }
  for (const match of content.matchAll(COLON_QUOTED_LITERAL_ASSIGNMENT)) {
    if (!isPlaceholder(assignedValue(match[2]))) findings.add(`env-secret:${match[1].toUpperCase()}`);
  }
  for (const match of content.matchAll(YAML_PLAIN_ASSIGNMENT)) {
    if (/[,;][\t ]*$/.test(match[2])) continue;
    if (!isPlaceholder(assignedValue(match[2]))) findings.add(`env-secret:${match[1].toUpperCase()}`);
  }
  return findings;
}

function decodedJwtPart(segment) {
  try {
    return JSON.parse(Buffer.from(segment, "base64url").toString("utf8"));
  } catch {
    return null;
  }
}

function hasPrivateKeyPem(content) {
  const variants = [content, content.replace(/\\r\\n|\\n/g, "\n")];
  for (const variant of variants) {
    const pattern = /-----BEGIN ((?:(?:DSA|EC|ENCRYPTED|OPENSSH|RSA) )?PRIVATE KEY)-----([\s\S]*?)-----END \1-----/g;
    for (const match of variant.matchAll(pattern)) {
      const body = match[2].replace(/\s/g, "");
      if (body.length >= 80 && /^[A-Za-z0-9+/]+={0,2}$/.test(body) && !isPlaceholder(body)) return true;
    }
  }
  return false;
}

function hasEncodedGitHubAppPrivateKey(content) {
  const assignment = /\bGITHUB_APP_PRIVATE_KEY_B64\b\s*(?:=|:)\s*["']?([A-Za-z0-9+/_-]{256,}={0,2})["']?/gi;
  for (const match of content.matchAll(assignment)) {
    const value = match[1];
    if (isPlaceholder(value)) continue;
    try {
      const decoded = Buffer.from(value.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString("utf8");
      if (/-----BEGIN (?:(?:DSA|EC|ENCRYPTED|OPENSSH|RSA) )?PRIVATE KEY-----/.test(decoded)) return true;
    } catch {
      // Invalid Base64 is not a GitHub App private key.
    }
  }
  return false;
}

function hasJwt(content) {
  const candidates = content.match(/\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{32,}\b/g) ?? [];
  return candidates.some((candidate) => {
    const [encodedHeader, encodedPayload] = candidate.split(".");
    const header = decodedJwtPart(encodedHeader);
    const payload = decodedJwtPart(encodedPayload);
    if (!header || !payload || typeof header.alg !== "string" || header.alg.toLowerCase() === "none") return false;
    return !isPlaceholder(JSON.stringify({ header, payload }));
  });
}

export function findSecretKinds(content) {
  const findings = findSensitiveEnvAssignments(content);
  const tokenPatterns = [
    ["openai-api-key", /\bsk-(?!ant-)[A-Za-z0-9_-]{20,}\b/g],
    ["anthropic-api-key", /\bsk-ant-[A-Za-z0-9_-]{20,}\b/g],
    ["github-token", /\b(?:gh[pousr]_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,})\b/g],
  ];

  for (const [kind, pattern] of tokenPatterns) {
    const matches = content.match(pattern) ?? [];
    if (matches.some((candidate) => !isPlaceholder(candidate))) findings.add(kind);
  }
  if (hasPrivateKeyPem(content)) findings.add("private-key-pem");
  if (hasEncodedGitHubAppPrivateKey(content)) findings.add("github-app-private-key-b64");
  if (hasJwt(content)) findings.add("jwt");
  return [...findings].sort();
}

function minimumVersion(spec) {
  const match = String(spec ?? "").match(/(\d+)\.(\d+)\.(\d+)/);
  return match ? match.slice(1).map(Number) : null;
}

export function runChecks(checkRoot = root) {
  const failures = [];
  for (const rel of required) {
    if (!fs.existsSync(path.join(checkRoot, rel))) failures.push(`missing: ${rel}`);
  }
  if (fs.existsSync(path.join(checkRoot, "index.mjs"))) {
    failures.push("root index.mjs must not exist because it conflicts with the Vercel root route and can expose source text.");
  }

  let packageJson = null;
  let vercelJson = null;
  for (const rel of ["package.json", "vercel.json", "config/providers.json", "config/platform-capabilities.json", "apps/console/public/manifest.webmanifest"]) {
    try {
      const parsed = JSON.parse(fs.readFileSync(path.join(checkRoot, rel), "utf8"));
      if (rel === "package.json") packageJson = parsed;
      if (rel === "vercel.json") vercelJson = parsed;
    } catch (error) {
      failures.push(`invalid JSON: ${rel} (${error.message})`);
    }
  }

  if (!vercelJson?.functions?.["api/index.mjs"]) {
    failures.push("vercel.json must configure api/index.mjs as the explicit Vercel Function.");
  }
  const rootRewrite = vercelJson?.rewrites?.find((item) => item.source === "/");
  if (rootRewrite?.destination !== "/api/index?__dex_path=/") {
    failures.push("vercel.json must route the root path through api/index.mjs explicitly.");
  }
  const catchAll = vercelJson?.rewrites?.find((item) => item.source === "/(.*)");
  if (catchAll?.destination !== "/api/index?__dex_path=/$1") {
    failures.push("vercel.json must route the catch-all path through api/index.mjs with __dex_path preservation.");
  }
  if (packageJson?.scripts?.start !== "node local-server.mjs" || packageJson?.scripts?.dev !== "node --watch local-server.mjs") {
    failures.push("local start/dev scripts must use local-server.mjs, not a root index.mjs.");
  }
  if (packageJson?.engines?.node !== "24.x") {
    failures.push('package.json engines.node must be pinned to "24.x".');
  }
  try {
    if (fs.readFileSync(path.join(checkRoot, ".node-version"), "utf8").trim() !== "24") {
      failures.push('.node-version must contain "24".');
    }
  } catch {
    // The required-file check reports a missing .node-version.
  }

  const mcpSdkVersion = minimumVersion(packageJson?.dependencies?.["@modelcontextprotocol/sdk"]);
  if (!mcpSdkVersion || mcpSdkVersion[0] !== 1 || mcpSdkVersion[1] < 26) {
    failures.push("@modelcontextprotocol/sdk must be pinned to a patched v1 release >= 1.26.0 and below v2 pre-alpha.");
  }

  const extAppsVersion = minimumVersion(packageJson?.dependencies?.["@modelcontextprotocol/ext-apps"]);
  if (!extAppsVersion || extAppsVersion[0] < 1) {
    failures.push("@modelcontextprotocol/ext-apps must use stable v1 or newer.");
  }

  const repositoryFiles = walk(checkRoot);
  const sourceFiles = repositoryFiles.filter((file) => /\.(mjs|js)$/.test(file));
  for (const file of sourceFiles) {
    const result = spawnSync(process.execPath, ["--check", file], { encoding: "utf8" });
    if (result.status !== 0) failures.push(`syntax: ${path.relative(checkRoot, file)} (${result.stderr.trim()})`);
  }

  for (const rel of [
    "workers/openai-codex/src/adapter.mjs",
    "workers/openai-codex/src/compatibility.mjs",
    "workers/anthropic-claude/src/adapter.mjs",
  ]) {
    const adapterPath = path.join(checkRoot, rel);
    if (!fs.existsSync(adapterPath)) continue;
    const adapterSource = fs.readFileSync(adapterPath, "utf8");
    if (!adapterSource.includes("buildSubscriptionWorkerEnvironment(")) {
      failures.push(`worker environment allowlist missing: ${rel}`);
    }
    if (/\{\s*\.\.\.\s*(?:env|process\.env)\s*\}/.test(adapterSource)
      || /\benv\s*:\s*process\.env\b/.test(adapterSource)) {
      failures.push(`raw parent environment propagation is forbidden: ${rel}`);
    }
  }

  for (const file of repositoryFiles) {
    const content = fs.readFileSync(file);
    if (content.includes(0)) continue;
    const findings = findSecretKinds(content.toString("utf8"));
    if (findings.length) failures.push(`possible secret (${findings.join(", ")}): ${path.relative(checkRoot, file)}`);
  }

  return { failures, sourceFiles };
}

if (process.argv[1] && path.resolve(process.argv[1]) === modulePath) {
  const { failures, sourceFiles } = runChecks();
  if (failures.length) {
    console.error(failures.join("\n"));
    process.exit(1);
  }
  console.log(`PASS: ${required.length} required files, no root index.mjs exposure, explicit Vercel adapter contract, Node 24 config, ${sourceFiles.length} JavaScript syntax checks, JSON parse, dependency floor, and secret-pattern scan.`);
}
