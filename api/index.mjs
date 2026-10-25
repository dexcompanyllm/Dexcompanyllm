const NORMALIZED_ENV_KEYS = [
  "DEX_AUTH_SECRET_B64",
  "DEX_ALLOWED_GITHUB_LOGIN",
  "DEX_ALLOWED_GITHUB_USER_ID",
  "DEX_APP_ACCESS_TOKEN",
  "DEX_MCP_BEARER_TOKEN",
  "DEX_ADMIN_TOKEN",
  "DEX_ALLOW_LEGACY_APP_TOKEN",
  "DEX_ALLOW_STATIC_MCP_BEARER",
  "DEX_ALLOW_UNAUTHENTICATED_APP",
  "DEX_ALLOW_UNAUTHENTICATED_MCP",
  "DEX_ALLOW_GITHUB_TOKEN_FALLBACK",
  "DEX_ENABLE_PWA_WRITES",
  "DEX_ENABLE_MCP_WRITES",
  "DEX_SUBSCRIPTION_ONLY",
  "DEX_ALLOW_PAID_API",
  "DEX_AUTOMATIC_PAID_FALLBACK",
  "DEX_ALLOW_EXTRA_USAGE",
  "DEX_REQUIRE_DURABLE_OAUTH_STATE",
  "GITHUB_APP_ID",
  "GITHUB_APP_INSTALLATION_ID",
  "GITHUB_APP_PRIVATE_KEY_B64",
  "GITHUB_APP_CLIENT_ID",
  "GITHUB_APP_CLIENT_SECRET",
  "GITHUB_TOKEN",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
  "KV_REST_API_URL",
  "KV_REST_API_TOKEN",
  "GITHUB_REPO",
  "GITHUB_REF",
  "DEX_PUBLIC_ORIGIN",
];

function normalizeEnvValue(value) {
  let normalized = String(value ?? "").trim();
  if (normalized.length >= 2) {
    const first = normalized[0];
    const last = normalized[normalized.length - 1];
    if ((first === '"' && last === '"') || (first === "'" && last === "'")) {
      normalized = normalized.slice(1, -1).trim();
    }
  }
  return normalized.normalize("NFC");
}

for (const key of NORMALIZED_ENV_KEYS) {
  if (process.env[key] !== undefined) process.env[key] = normalizeEnvValue(process.env[key]);
}

const { default: app } = await import("../services/mcp-gateway/src/server.mjs");

export const config = {
  maxDuration: 300,
};

function normalizePath(value) {
  if (Array.isArray(value)) return value[0] || "/";
  if (typeof value !== "string" || value.length === 0) return "/";
  return value.startsWith("/") ? value : `/${value}`;
}

export default function handler(req, res) {
  const rewrittenPath = normalizePath(req.query?.__dex_path);
  const rewrittenUrl = new URL(req.url ?? "/", "http://dex.local");
  rewrittenUrl.searchParams.delete("__dex_path");

  const search = rewrittenUrl.searchParams.toString();
  req.url = search ? `${rewrittenPath}?${search}` : rewrittenPath;

  return app(req, res);
}
