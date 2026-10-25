const TRUE_VALUES = new Set(["true", "1", "yes", "on"]);
const FALSE_VALUES = new Set(["false", "0", "no", "off", ""]);

const COMMON_SUBSCRIPTION_WORKER_ENV = Object.freeze([
  "PATH",
  "PATHEXT",
  "SYSTEMROOT",
  "WINDIR",
  "COMSPEC",
  "TEMP",
  "TMP",
  "TMPDIR",
  "HOME",
  "USERPROFILE",
  "HOMEDRIVE",
  "HOMEPATH",
  "APPDATA",
  "LOCALAPPDATA",
  "PROGRAMDATA",
  "PROGRAMFILES",
  "PROGRAMFILES(X86)",
  "PROGRAMW6432",
  "USER",
  "USERNAME",
  "LOGNAME",
  "LANG",
  "LC_ALL",
  "LC_CTYPE",
  "TZ",
  "TERM",
  "COLORTERM",
  "NO_COLOR",
  "FORCE_COLOR",
  "SHELL",
  "XDG_CONFIG_HOME",
  "XDG_CACHE_HOME",
  "XDG_DATA_HOME",
  "XDG_STATE_HOME",
  "OS",
  "PROCESSOR_ARCHITECTURE",
  "NUMBER_OF_PROCESSORS",
]);

const WINDOWS_SUBSCRIPTION_WORKER_ENV = Object.freeze([
  "LOGONSERVER",
  "SYSTEMDRIVE",
  "USERDOMAIN",
]);

const PROVIDER_SUBSCRIPTION_WORKER_ENV = Object.freeze({
  openai: Object.freeze(["CODEX_HOME"]),
  anthropic: Object.freeze(["CLAUDE_CONFIG_DIR"]),
});

const NODE_FORCED_COVERAGE_ENV = "NODE_V8_COVERAGE";

export const PROHIBITED_ANTHROPIC_WORKER_ENV = Object.freeze([
  "ANTHROPIC_API_KEY",
  "ANTHROPIC_AUTH_TOKEN",
  "ANTHROPIC_BASE_URL",
  "ANTHROPIC_CUSTOM_HEADERS",
  "ANTHROPIC_AWS_API_KEY",
  "ANTHROPIC_AWS_BASE_URL",
  "ANTHROPIC_AWS_WORKSPACE_ID",
  "ANTHROPIC_BEDROCK_BASE_URL",
  "ANTHROPIC_BEDROCK_MANTLE_BASE_URL",
  "ANTHROPIC_FOUNDRY_API_KEY",
  "ANTHROPIC_FOUNDRY_AUTH_TOKEN",
  "ANTHROPIC_FOUNDRY_BASE_URL",
  "ANTHROPIC_FOUNDRY_RESOURCE",
  "ANTHROPIC_VERTEX_BASE_URL",
  "ANTHROPIC_VERTEX_PROJECT_ID",
  "ANTHROPIC_PROFILE",
  "ANTHROPIC_FEDERATION_RULE_ID",
  "ANTHROPIC_IDENTITY_TOKEN_FILE",
  "ANTHROPIC_ORGANIZATION_ID",
  "ANTHROPIC_WORKSPACE_ID",
  "AWS_BEARER_TOKEN_BEDROCK",
  "CLAUDE_CODE_OAUTH_TOKEN",
  "CLAUDE_CODE_PROVIDER_MANAGED_BY_HOST",
  "CLAUDE_CODE_USE_ANTHROPIC_AWS",
  "CLAUDE_CODE_USE_BEDROCK",
  "CLAUDE_CODE_USE_FOUNDRY",
  "CLAUDE_CODE_USE_MANTLE",
  "CLAUDE_CODE_USE_VERTEX",
]);

function presentEnvironmentNames(names, env = process.env) {
  const prohibited = new Set(names.map(name => name.toLowerCase()));
  return Object.entries(env)
    .filter(([name, value]) => prohibited.has(name.toLowerCase()) && String(value ?? "").trim() !== "")
    .map(([name]) => name);
}

export function envFlag(name, fallback = false, env = process.env) {
  if (typeof fallback !== "boolean") {
    throw new TypeError(`The fallback for ${name} must be a boolean.`);
  }
  const value = env[name];
  if (value === undefined) return fallback;
  const normalized = String(value).trim().toLowerCase();
  if (TRUE_VALUES.has(normalized)) return true;
  if (FALSE_VALUES.has(normalized)) return false;
  throw new Error(`${name} must be true, false, 1, 0, yes, no, on, off, or empty.`);
}

export function assertSubscriptionOnlyEnvironment(provider, env = process.env) {
  if (!envFlag("DEX_SUBSCRIPTION_ONLY", true, env)) {
    throw new Error("DEX_SUBSCRIPTION_ONLY must remain enabled.");
  }
  if (envFlag("DEX_ALLOW_PAID_API", false, env)) {
    throw new Error("Paid API execution is disabled by Dex Company policy.");
  }
  if (envFlag("DEX_AUTOMATIC_PAID_FALLBACK", false, env)) {
    throw new Error("Automatic paid fallback is disabled by Dex Company policy.");
  }
  if (envFlag("DEX_ALLOW_EXTRA_USAGE", false, env)) {
    throw new Error("Automatic extra usage is disabled by Dex Company policy.");
  }

  const prohibited = provider === "openai"
    ? ["OPENAI_API_KEY"]
    : provider === "anthropic"
      ? PROHIBITED_ANTHROPIC_WORKER_ENV
      : [];

  const detected = presentEnvironmentNames(prohibited, env);
  if (detected.length) {
    throw new Error(
      `Subscription-only worker refused to start because paid API credentials are present: ${detected.join(", ")}`
    );
  }
}

export function buildSubscriptionWorkerEnvironment(
  provider,
  env = process.env,
  platform = process.platform,
) {
  if (process.permission !== undefined) {
    throw new Error(
      "Node permission model is unsupported for subscription workers because Node forces permission flags into child NODE_OPTIONS. Start the Runtime without --permission or --permission-audit.",
    );
  }
  const providerEnvironment = PROVIDER_SUBSCRIPTION_WORKER_ENV[provider];
  if (!providerEnvironment) {
    throw new Error(`Unknown subscription worker provider: ${provider}`);
  }

  const allowed = new Set(
    [
      ...COMMON_SUBSCRIPTION_WORKER_ENV,
      ...(platform === "win32" ? WINDOWS_SUBSCRIPTION_WORKER_ENV : []),
      ...providerEnvironment,
    ].map(name => name.toLowerCase())
  );
  const childEnvironment = {};
  const copiedNames = new Set();
  for (const [name, value] of Object.entries(env ?? {})) {
    const normalizedName = name.toLowerCase();
    if (!allowed.has(normalizedName) || value === undefined) continue;
    if (copiedNames.has(normalizedName)) {
      throw new Error(`Duplicate case-insensitive subscription worker environment variable: ${name}`);
    }
    if (typeof value !== "string" || value.includes("\0")) {
      throw new Error(`Subscription worker environment variable ${name} must be a NUL-free string.`);
    }
    copiedNames.add(normalizedName);
    childEnvironment[name] = value;
  }
  // Node otherwise copies this parent variable even when options.env is an allowlist.
  // An own, non-enumerable undefined value suppresses that special propagation while
  // keeping it out of the environment block sent to the child.
  Object.defineProperty(childEnvironment, NODE_FORCED_COVERAGE_ENV, {
    value: undefined,
    enumerable: false,
    writable: false,
    configurable: false,
  });
  return childEnvironment;
}

export function redact(value) {
  if (typeof value !== "string") return value;
  return value
    .replace(/sk-[A-Za-z0-9_-]{10,}/g, "[REDACTED_OPENAI_KEY]")
    .replace(/sk-ant-[A-Za-z0-9_-]{10,}/g, "[REDACTED_ANTHROPIC_KEY]")
    .replace(/gh[pousr]_[A-Za-z0-9]{10,}/g, "[REDACTED_GITHUB_TOKEN]");
}

export function writePolicy() {
  return {
    pwaEnabled: envFlag("DEX_ENABLE_PWA_WRITES", false),
    mcpEnabled: envFlag("DEX_ENABLE_MCP_WRITES", false),
    paidApiAllowed: false,
    automaticPaidFallback: false,
  };
}
