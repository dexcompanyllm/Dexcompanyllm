const WORKLOAD_ALIASES = Object.freeze({
  simple: "routine",
  routine: "routine",
  standard: "standard",
  everyday: "standard",
  complex: "complex",
  hard: "complex",
  critical: "critical",
  hardest: "critical",
});

const BALANCED_POLICY = Object.freeze({
  routine: Object.freeze({ model: "gpt-5.6-sol", reasoningEffort: "low" }),
  standard: Object.freeze({ model: "gpt-5.6-sol", reasoningEffort: "medium" }),
  complex: Object.freeze({ model: "gpt-5.6-sol", reasoningEffort: "high" }),
  critical: Object.freeze({ model: "gpt-6-astra", reasoningEffort: "medium" }),
});

const PLUS_EFFICIENT_POLICY = Object.freeze({
  routine: Object.freeze({ model: "gpt-5.6-luna", reasoningEffort: "low" }),
  standard: Object.freeze({ model: "gpt-5.6-terra", reasoningEffort: "medium" }),
  complex: Object.freeze({ model: "gpt-5.6-sol", reasoningEffort: "medium" }),
  critical: Object.freeze({ model: "gpt-5.6-sol", reasoningEffort: "high" }),
});

const INFRASTRUCTURE_FAILURES = new Set(["authentication", "network", "permission", "missing-input"]);

function normalized(value) {
  return String(value ?? "").trim().toLowerCase();
}

function normalizedPlanType(value) {
  return normalized(value).replace(/[^a-z0-9]+/g, "");
}

function planProfile(planType) {
  return new Set(["plus", "chatgptplus"]).has(normalizedPlanType(planType))
    ? "plus-efficient"
    : "balanced";
}

function workloadClass(task) {
  const supplied = task?.routing?.workloadClass ?? task?.execution?.complexity;
  if (supplied !== undefined && supplied !== null && String(supplied).trim() !== "") {
    const value = WORKLOAD_ALIASES[normalized(supplied)];
    if (!value) throw new Error(`Unknown OpenAI workload class: ${supplied}.`);
    return value;
  }

  const riskLevel = normalized(task?.execution?.riskLevel);
  if (riskLevel === "high" || riskLevel === "critical") return "critical";
  if (riskLevel === "medium") return "complex";
  return "standard";
}

function isHighRisk(task) {
  return new Set(["high", "critical"]).has(normalized(task?.execution?.riskLevel));
}

function escalation(task) {
  const reason = normalized(task?.routing?.modelEscalationReason);
  if (!reason) return null;
  if (INFRASTRUCTURE_FAILURES.has(reason)) {
    throw new Error(`OpenAI model escalation cannot resolve an infrastructure failure: ${reason}.`);
  }
  if (reason !== "reasoning-validation-failure") {
    throw new Error(`Unknown OpenAI model escalation reason: ${reason}.`);
  }
  return reason;
}

export function selectOpenAIExecutionPolicy(task, providerContext = {}) {
  const detectedPlanType = String(providerContext?.planType ?? "").trim() || null;
  const profile = planProfile(detectedPlanType);
  const explicitModel = String(task?.routing?.requestedModel ?? "").trim();
  const explicitEffort = normalized(task?.routing?.reasoningEffort);
  if (explicitModel || explicitEffort) {
    if (!explicitModel || !explicitEffort) {
      throw new Error("Explicit OpenAI routing requires both routing.requestedModel and routing.reasoningEffort.");
    }
    return {
      mode: "explicit",
      profile,
      planType: detectedPlanType,
      workloadClass: null,
      model: explicitModel,
      reasoningEffort: explicitEffort,
      reason: "Task Packet explicitly selected the model and reasoning effort.",
    };
  }

  const selectedWorkload = workloadClass(task);
  const escalationReason = escalation(task);
  const automaticPolicy = profile === "plus-efficient" ? PLUS_EFFICIENT_POLICY : BALANCED_POLICY;
  const selected = escalationReason ? BALANCED_POLICY.critical : automaticPolicy[selectedWorkload];
  const reasoningEffort = selected.model === "gpt-6-astra" && isHighRisk(task)
    ? "high"
    : selected.reasoningEffort;

  return {
    mode: escalationReason ? "escalated" : "automatic",
    profile,
    planType: detectedPlanType,
    workloadClass: selectedWorkload,
    model: selected.model,
    reasoningEffort,
    reason: escalationReason
      ? "A recorded reasoning validation failure escalated this checkpoint to Astra."
      : profile === "plus-efficient"
        ? `${selectedWorkload} workload selected by the ChatGPT Plus efficient profile.`
        : `${selectedWorkload} workload selected from Task Packet complexity or risk metadata.`,
  };
}
