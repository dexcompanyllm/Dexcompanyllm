const REPOSITORY_CAPABILITIES = new Set([
  "edit-repository",
  "run-shell",
  "run-tests",
  "debugging",
]);

const ARTIFACT_CAPABILITIES = new Set([
  "create-pptx",
  "create-docx",
  "create-xlsx",
  "create-pdf",
]);

export function routeTask(task, providerStatus = {}) {
  const required = new Set(task?.routing?.requiredCapabilities ?? task?.requiredCapabilities ?? []);
  const requestedProvider = task?.routing?.preferredProvider ?? task?.preferredProvider ?? "auto";
  const clientPlatform = String(task?.request?.clientPlatform ?? task?.clientPlatform ?? "auto");
  const needsRepository = [...required].some(item => REPOSITORY_CAPABILITIES.has(item));
  const needsArtifact = [...required].some(item => ARTIFACT_CAPABILITIES.has(item));
  const candidates = requestedProvider === "auto" ? ["openai", "anthropic"] : [requestedProvider];
  const reasons = [];
  let selectedProvider = null;
  let selectedSurface = null;
  let availabilityClass = "queued";

  // Routing proposes an available surface. Worker identity, permissions, cost,
  // task approval and host acceptance remain separate execution gates.
  for (const provider of candidates) {
    if (!["openai", "anthropic"].includes(provider)) continue;
    const status = providerStatus[provider];
    if (needsRepository) {
      if (status?.subscriptionReady !== true || status?.available === false) continue;
      selectedProvider = provider;
      selectedSurface = provider === "openai" ? "codex-app-server" : "claude-code";
      availabilityClass = "local-runner";
      reasons.push("repository work requires a ready subscription worker and independent execution gates");
    } else if (needsArtifact) {
      if (provider !== "openai" || status?.available !== true) continue;
      selectedProvider = provider;
      selectedSurface = "work-or-artifact-worker";
      availabilityClass = "interactive-only";
      reasons.push("artifact work requires an available compatible artifact surface");
    } else {
      if (status?.available !== true) continue;
      selectedProvider = provider;
      selectedSurface = "interactive-reasoning";
      availabilityClass = "interactive-only";
      reasons.push("general reasoning routed by provider availability");
    }
    break;
  }
  if (!selectedProvider) reasons.push("no compatible requested subscription surface is currently ready");
  const platformFallback = /mobile|android|galaxy|iphone|ipad|ios/i.test(clientPlatform) ? "pwa" : null;
  if (platformFallback) reasons.push("mobile client keeps runtime.invalid as the universal fallback");
  return {
    selectedProvider,
    selectedSurface,
    availabilityClass,
    platformFallback,
    reasons,
    costPolicy: {
      mode: "subscription-only",
      paidApiAllowed: false,
      automaticPaidFallback: false,
    },
  };
}
