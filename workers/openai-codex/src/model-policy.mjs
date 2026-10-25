const MODEL_RETIREMENTS = Object.freeze({
  "gpt-5.4": Object.freeze({
    replacement: "gpt-5.6-terra",
    retirementDate: "2026-08-31",
  }),
  "gpt-5.4-mini": Object.freeze({
    replacement: "gpt-5.6-luna",
    retirementDate: "2026-08-31",
  }),
});

export const CODEX_MODEL_RETIREMENTS = MODEL_RETIREMENTS;

export function normalizeModelId(value) {
  return String(value ?? "").trim().toLowerCase();
}

function modelNames(entry) {
  return [entry?.id, entry?.model]
    .map(normalizeModelId)
    .filter(Boolean);
}

export function indexModelCatalog(models) {
  if (!Array.isArray(models)) throw new Error("Codex model catalog must be an array.");
  const index = new Map();
  for (const entry of models) {
    if (!entry || typeof entry !== "object") throw new Error("Codex model catalog contains a non-object entry.");
    const names = modelNames(entry);
    if (!names.length) throw new Error("Codex model catalog entry is missing both id and model.");
    for (const name of names) {
      const existing = index.get(name);
      if (existing && existing !== entry) {
        throw new Error(`Codex model catalog contains a duplicate identifier: ${name}.`);
      }
      index.set(name, entry);
    }
  }
  return index;
}

function canonicalModelName(entry) {
  return String(entry?.model ?? entry?.id ?? "").trim();
}

function retirementFor(value) {
  return MODEL_RETIREMENTS[normalizeModelId(value)] ?? null;
}

function replacementEntry(index, retirement) {
  return index.get(normalizeModelId(retirement.replacement)) ?? null;
}

function migrationRecord(source, retirement, replacement) {
  return {
    source,
    replacement: retirement.replacement,
    retirementDate: retirement.retirementDate,
    replacementAvailable: Boolean(replacement),
  };
}

export function assessModelCatalog(models) {
  const index = indexModelCatalog(models);
  const defaults = models.filter(model => model?.isDefault === true);
  const visibleModels = models.filter(model => model?.hidden !== true);
  const migrations = Object.entries(MODEL_RETIREMENTS).map(([source, retirement]) => {
    const sourceEntry = index.get(source) ?? null;
    const replacement = replacementEntry(index, retirement);
    const sourceAvailable = Boolean(sourceEntry);
    const replacementAvailable = Boolean(replacement);
    return {
      ...migrationRecord(source, retirement, replacement),
      sourceAvailable,
      sourceIsDefault: Boolean(sourceEntry?.isDefault),
      blocksReadiness: sourceAvailable && !replacementAvailable,
    };
  });

  let defaultModelOverride = null;
  let defaultMigration = null;
  for (const entry of defaults) {
    const source = modelNames(entry).find(name => retirementFor(name));
    if (!source) continue;
    const retirement = retirementFor(source);
    const replacement = replacementEntry(index, retirement);
    if (!replacement) {
      throw new Error(
        `Codex default model ${source} is scheduled for retirement on ${retirement.retirementDate}, `
        + `but replacement ${retirement.replacement} is not present in model/list. Update Codex or refresh the account catalog.`,
      );
    }
    defaultModelOverride = canonicalModelName(replacement);
    defaultMigration = migrationRecord(source, retirement, replacement);
    break;
  }

  return {
    total: models.length,
    visible: visibleModels.length,
    hidden: models.length - visibleModels.length,
    defaultModels: defaults.map(canonicalModelName),
    defaultModelOverride,
    defaultMigration,
    migrations,
    retirementReady: migrations.every(item => !item.blocksReadiness),
  };
}

export function resolveModelSelection({ requestedModel, models, defaultModelOverride = null }) {
  const index = indexModelCatalog(models);
  const normalizedRequested = normalizeModelId(requestedModel);

  if (!normalizedRequested) {
    if (defaultModelOverride) {
      const replacement = index.get(normalizeModelId(defaultModelOverride));
      if (!replacement) {
        throw new Error(`Codex default model override ${defaultModelOverride} is not present in model/list.`);
      }
      return {
        requestedModel: null,
        effectiveModel: canonicalModelName(replacement),
        mode: "migrated-default",
        migration: null,
      };
    }
    return {
      requestedModel: null,
      effectiveModel: null,
      mode: "server-default",
      migration: null,
    };
  }

  const retirement = retirementFor(normalizedRequested);
  if (retirement) {
    const replacement = replacementEntry(index, retirement);
    if (!replacement) {
      throw new Error(
        `Codex model ${requestedModel} is scheduled for retirement on ${retirement.retirementDate}. `
        + `Replacement ${retirement.replacement} is not present in model/list; update Codex or refresh the account catalog.`,
      );
    }
    return {
      requestedModel: String(requestedModel),
      effectiveModel: canonicalModelName(replacement),
      mode: "retirement-migration",
      migration: migrationRecord(normalizedRequested, retirement, replacement),
    };
  }

  const selected = index.get(normalizedRequested);
  if (!selected) {
    throw new Error(`Requested Codex model ${requestedModel} is not present in the current model/list catalog.`);
  }

  return {
    requestedModel: String(requestedModel),
    effectiveModel: canonicalModelName(selected),
    mode: "explicit",
    migration: null,
  };
}

export function resolveReasoningEffortSelection({ effectiveModel, requestedEffort, models }) {
  const normalizedEffort = normalizeModelId(requestedEffort);
  if (!normalizedEffort) {
    return { requestedEffort: null, effectiveEffort: null, mode: "model-default" };
  }
  const entry = indexModelCatalog(models).get(normalizeModelId(effectiveModel));
  if (!entry) throw new Error(`Effective Codex model ${effectiveModel} is not present in model/list.`);
  const supported = Array.isArray(entry.supportedReasoningEfforts)
    ? entry.supportedReasoningEfforts.map(item => normalizeModelId(item?.reasoningEffort ?? item)).filter(Boolean)
    : [];
  if (!supported.length) {
    throw new Error(`Codex model ${effectiveModel} did not publish supported reasoning efforts.`);
  }
  if (!supported.includes(normalizedEffort)) {
    throw new Error(`Codex model ${effectiveModel} does not support reasoning effort ${requestedEffort}.`);
  }
  return { requestedEffort: String(requestedEffort), effectiveEffort: normalizedEffort, mode: "explicit" };
}
