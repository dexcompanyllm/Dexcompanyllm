import assert from "node:assert/strict";
import { EventEmitter } from "node:events";
import test from "node:test";
import {
  assertAstraCliVersion,
  CodexSubscriptionAdapter,
} from "../workers/openai-codex/src/adapter.mjs";
import {
  assessModelCatalog,
  indexModelCatalog,
  resolveModelSelection,
  resolveReasoningEffortSelection,
} from "../workers/openai-codex/src/model-policy.mjs";

function model(id, options = {}) {
  return {
    id,
    model: id,
    displayName: id,
    description: id,
    hidden: false,
    isDefault: false,
    defaultReasoningEffort: "medium",
    supportedReasoningEfforts: [],
    ...options,
  };
}

const HEALTHY_MODELS = [
  model("gpt-5.6-luna"),
  model("gpt-5.6-terra", { isDefault: true }),
  model("gpt-5.6-sol"),
];

test("model catalog indexes both id and model aliases and rejects collisions", () => {
  const entry = model("catalog-id", { model: "provider-model" });
  const index = indexModelCatalog([entry]);
  assert.equal(index.get("catalog-id"), entry);
  assert.equal(index.get("provider-model"), entry);
  assert.throws(
    () => indexModelCatalog([
      model("one", { model: "shared" }),
      model("two", { model: "shared" }),
    ]),
    /duplicate identifier: shared/,
  );
});

test("healthy 5.6 catalog keeps the server default and is retirement ready", () => {
  const report = assessModelCatalog(HEALTHY_MODELS);
  assert.equal(report.total, 3);
  assert.deepEqual(report.defaultModels, ["gpt-5.6-terra"]);
  assert.equal(report.defaultModelOverride, null);
  assert.equal(report.retirementReady, true);
  assert.deepEqual(resolveModelSelection({ models: HEALTHY_MODELS }), {
    requestedModel: null,
    effectiveModel: null,
    mode: "server-default",
    migration: null,
  });
});

test("plan-limited catalog is ready when an unavailable retired model was never exposed", () => {
  const report = assessModelCatalog([
    model("gpt-5.6-terra", { isDefault: true }),
  ]);
  assert.equal(report.retirementReady, true);
  const miniMigration = report.migrations.find(item => item.source === "gpt-5.4-mini");
  assert.equal(miniMigration.sourceAvailable, false);
  assert.equal(miniMigration.replacementAvailable, false);
  assert.equal(miniMigration.blocksReadiness, false);
});

test("catalog is not ready when it exposes a retired model without its official replacement", () => {
  const report = assessModelCatalog([
    model("gpt-5.4-mini"),
    model("gpt-5.6-terra", { isDefault: true }),
  ]);
  assert.equal(report.retirementReady, false);
  const miniMigration = report.migrations.find(item => item.source === "gpt-5.4-mini");
  assert.equal(miniMigration.sourceAvailable, true);
  assert.equal(miniMigration.replacementAvailable, false);
  assert.equal(miniMigration.blocksReadiness, true);
});

test("legacy GPT-5.4 explicit selection deterministically migrates to Terra", () => {
  const models = [model("gpt-5.4"), ...HEALTHY_MODELS];
  const result = resolveModelSelection({ requestedModel: "GPT-5.4", models });
  assert.equal(result.effectiveModel, "gpt-5.6-terra");
  assert.equal(result.mode, "retirement-migration");
  assert.deepEqual(result.migration, {
    source: "gpt-5.4",
    replacement: "gpt-5.6-terra",
    retirementDate: "2026-08-31",
    replacementAvailable: true,
  });
});

test("legacy GPT-5.4 mini explicit selection deterministically migrates to Luna", () => {
  const models = [model("gpt-5.4-mini"), ...HEALTHY_MODELS];
  const result = resolveModelSelection({ requestedModel: "gpt-5.4-mini", models });
  assert.equal(result.effectiveModel, "gpt-5.6-luna");
  assert.equal(result.mode, "retirement-migration");
});

test("legacy default model is overridden only when the official replacement is present", () => {
  const models = [
    model("gpt-5.4", { isDefault: true }),
    model("gpt-5.6-terra"),
  ];
  const report = assessModelCatalog(models);
  assert.equal(report.defaultModelOverride, "gpt-5.6-terra");
  assert.equal(report.defaultMigration.source, "gpt-5.4");
  assert.deepEqual(resolveModelSelection({
    models,
    defaultModelOverride: report.defaultModelOverride,
  }), {
    requestedModel: null,
    effectiveModel: "gpt-5.6-terra",
    mode: "migrated-default",
    migration: null,
  });
});

test("missing official replacement fails closed instead of silently choosing another model", () => {
  assert.throws(
    () => resolveModelSelection({
      requestedModel: "gpt-5.4",
      models: [model("gpt-5.4")],
    }),
    /replacement gpt-5\.6-terra is not present/i,
  );
  assert.throws(
    () => assessModelCatalog([model("gpt-5.4", { isDefault: true })]),
    /default model gpt-5\.4.*replacement gpt-5\.6-terra/i,
  );
});

test("unknown explicit model fails closed against the current model/list catalog", () => {
  assert.throws(
    () => resolveModelSelection({ requestedModel: "gpt-does-not-exist", models: HEALTHY_MODELS }),
    /not present in the current model\/list catalog/,
  );
});

test("reasoning effort is validated against authenticated model metadata", () => {
  const models = [model("gpt-5.6-sol", { supportedReasoningEfforts: [
    { reasoningEffort: "low" }, { reasoningEffort: "medium" },
  ] })];
  assert.equal(resolveReasoningEffortSelection({
    effectiveModel: "gpt-5.6-sol", requestedEffort: "medium", models,
  }).effectiveEffort, "medium");
  assert.throws(() => resolveReasoningEffortSelection({
    effectiveModel: "gpt-5.6-sol", requestedEffort: "high", models,
  }), /does not support reasoning effort high/i);
  assert.throws(() => resolveReasoningEffortSelection({
    effectiveModel: "gpt-5.6-sol", requestedEffort: "low", models: HEALTHY_MODELS,
  }), /did not publish supported reasoning efforts/i);
});

test("Astra requires stable Codex CLI 0.153.0 or newer without blocking Sol", async () => {
  assert.equal(assertAstraCliVersion("codex-cli 0.153.0"), "0.153.0");
  assert.equal(assertAstraCliVersion("0.154.0", "gpt-6-astra"), "0.154.0");
  assert.equal(assertAstraCliVersion("unknown", "gpt-5.6-sol"), "unknown");
  assert.throws(() => assertAstraCliVersion("0.152.9"), /requires stable Codex CLI 0\.153\.0 or newer/i);
  assert.throws(() => assertAstraCliVersion("0.153.0-alpha.1"), /requires stable Codex CLI 0\.153\.0 or newer/i);

  const adapter = new CodexSubscriptionAdapter({ versionReader: async () => "0.152.9" });
  adapter.rpc = new EventEmitter();
  adapter.rpc.request = async () => {
    throw new Error("Astra CLI gate should run before thread/start.");
  };
  adapter.models = [model("gpt-6-astra", {
    isDefault: true,
    supportedReasoningEfforts: [{ reasoningEffort: "medium" }],
  })];
  adapter.modelCatalog = assessModelCatalog(adapter.models);
  await assert.rejects(() => adapter.run({
    cwd: "/workspace",
    prompt: "critical task",
    model: "gpt-6-astra",
    effort: "medium",
    timeoutMs: 1_000,
  }), /Detected: 0\.152\.9.*Use GPT-5\.6 Sol/i);
});

test("Codex adapter paginates model/list with hidden models included", async () => {
  const calls = [];
  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = {
    async request(method, params) {
      calls.push({ method, params });
      if (params.cursor === null) {
        return { data: [model("gpt-5.6-luna")], nextCursor: "next" };
      }
      return { data: [model("gpt-5.6-terra")], nextCursor: null };
    },
  };
  const result = await adapter.listModels({ includeHidden: true, pageSize: 50 });
  assert.deepEqual(result.map(item => item.id), ["gpt-5.6-luna", "gpt-5.6-terra"]);
  assert.deepEqual(calls, [
    { method: "model/list", params: { cursor: null, includeHidden: true, limit: 50 } },
    { method: "model/list", params: { cursor: "next", includeHidden: true, limit: 50 } },
  ]);
});

test("Codex adapter rejects repeated cursors, invalid responses, and catalog overflow", async () => {
  const repeated = new CodexSubscriptionAdapter();
  repeated.rpc = {
    async request() { return { data: [], nextCursor: "same" }; },
  };
  await assert.rejects(() => repeated.listModels(), /repeated pagination cursor/);

  const invalid = new CodexSubscriptionAdapter();
  invalid.rpc = {
    async request() { return { models: [] }; },
  };
  await assert.rejects(() => invalid.listModels(), /without data\[\]/);

  const overflow = new CodexSubscriptionAdapter();
  overflow.rpc = {
    async request() { return { data: [model("one"), model("two")], nextCursor: null }; },
  };
  await assert.rejects(() => overflow.listModels({ maxModels: 1 }), /exceeded the 1-model safety bound/);
});

test("Codex run records and applies the official legacy model migration", async () => {
  const requests = [];
  const rpc = new EventEmitter();
  rpc.request = async (method, params) => {
    requests.push({ method, params });
    if (method === "thread/start") return { thread: { id: "thread-1", ephemeral: true } };
    if (method === "turn/start") {
      queueMicrotask(() => rpc.emit("notification", {
        method: "turn/completed",
        params: { threadId: "thread-1", turn: { id: "turn-1" } },
      }));
      return { turn: { id: "turn-1" } };
    }
    throw new Error(`Unexpected method: ${method}`);
  };

  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = rpc;
  adapter.models = [model("gpt-5.4"), ...HEALTHY_MODELS];
  adapter.modelCatalog = assessModelCatalog(adapter.models);

  const result = await adapter.run({
    cwd: "/workspace",
    prompt: "safe task",
    model: "gpt-5.4",
    timeoutMs: 1_000,
  });
  assert.equal(requests[0].method, "thread/start");
  assert.equal(requests[0].params.cwd, "/workspace");
  assert.equal(requests[0].params.approvalPolicy, "on-request");
  assert.equal(requests[0].params.sandbox, "workspace-write");
  assert.equal(requests[0].params.ephemeral, true);
  assert.equal(requests[0].params.model, "gpt-5.6-terra");
  assert.equal(result.modelSelection.mode, "retirement-migration");
  assert.equal(result.modelSelection.effectiveModel, "gpt-5.6-terra");
});

test("Codex run sends the validated reasoning effort on turn start", async () => {
  const requests = [];
  const rpc = new EventEmitter();
  rpc.request = async (method, params) => {
    requests.push({ method, params });
    if (method === "thread/start") return { thread: { id: "thread-effort", ephemeral: true } };
    if (method === "turn/start") {
      queueMicrotask(() => rpc.emit("notification", {
        method: "turn/completed",
        params: { threadId: "thread-effort", turn: { id: "turn-effort" } },
      }));
      return { turn: { id: "turn-effort" } };
    }
    throw new Error(`Unexpected method: ${method}`);
  };

  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = rpc;
  adapter.models = [model("gpt-5.6-sol", {
    supportedReasoningEfforts: [{ reasoningEffort: "low" }, { reasoningEffort: "medium" }],
  })];
  adapter.modelCatalog = assessModelCatalog(adapter.models);

  const result = await adapter.run({
    cwd: "/workspace", prompt: "safe task", model: "gpt-5.6-sol", effort: "medium", timeoutMs: 1_000,
  });
  assert.equal(requests[0].params.model, "gpt-5.6-sol");
  assert.equal(requests[1].params.effort, "medium");
  assert.equal(result.reasoningEffortSelection.effectiveEffort, "medium");
});

test("Codex run selects the execution policy after reading the authenticated plan", async () => {
  const requests = [];
  const rpc = new EventEmitter();
  rpc.request = async (method, params) => {
    requests.push({ method, params });
    if (method === "thread/start") return { thread: { id: "thread-plan", ephemeral: true } };
    if (method === "turn/start") {
      queueMicrotask(() => rpc.emit("notification", {
        method: "turn/completed",
        params: { threadId: "thread-plan", turn: { id: "turn-plan" } },
      }));
      return { turn: { id: "turn-plan" } };
    }
    throw new Error(`Unexpected method: ${method}`);
  };

  const terra = model("gpt-5.6-terra", {
    isDefault: true,
    supportedReasoningEfforts: [{ reasoningEffort: "medium" }],
  });
  const adapter = new CodexSubscriptionAdapter();
  adapter.rpc = rpc;
  adapter.account = { type: "chatgpt", planType: "plus" };
  adapter.models = [terra];
  adapter.modelCatalog = assessModelCatalog(adapter.models);
  let selectorContext = null;
  const selectedPolicy = {
    profile: "plus-efficient",
    model: "gpt-5.6-terra",
    reasoningEffort: "medium",
  };

  const result = await adapter.run({
    cwd: "/workspace",
    prompt: "plan-aware task",
    executionPolicySelector(context) {
      selectorContext = context;
      return selectedPolicy;
    },
    timeoutMs: 1_000,
  });

  assert.equal(selectorContext.planType, "plus");
  assert.equal(selectorContext.modelCatalog.retirementReady, true);
  assert.equal(requests[0].params.model, "gpt-5.6-terra");
  assert.equal(requests[1].params.effort, "medium");
  assert.equal(result.executionPolicy, selectedPolicy);
  await assert.rejects(() => adapter.run({
    cwd: "/workspace",
    prompt: "ambiguous task",
    model: "gpt-5.6-terra",
    executionPolicySelector: () => selectedPolicy,
    timeoutMs: 1_000,
  }), /cannot be combined with explicit model or effort/i);
});
