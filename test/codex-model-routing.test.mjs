import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";
import { selectOpenAIExecutionPolicy } from "../workers/openai-codex/src/routing-policy.mjs";

function task(workloadClass, riskLevel = "low") {
  return { routing: { workloadClass }, execution: { riskLevel } };
}

test("balanced routing remains the default when the subscription plan is not Plus", () => {
  assert.deepEqual(selectOpenAIExecutionPolicy({}), {
    mode: "automatic",
    profile: "balanced",
    planType: null,
    workloadClass: "standard",
    model: "gpt-5.6-sol",
    reasoningEffort: "medium",
    reason: "standard workload selected from Task Packet complexity or risk metadata.",
  });
  assert.equal(selectOpenAIExecutionPolicy(task("routine")).reasoningEffort, "low");
  assert.equal(selectOpenAIExecutionPolicy(task("complex")).reasoningEffort, "high");
});

test("Plus routing uses Luna and Terra for common work while reserving Sol for harder work", () => {
  const plus = { planType: "plus" };
  assert.deepEqual(selectOpenAIExecutionPolicy(task("routine"), plus), {
    mode: "automatic",
    profile: "plus-efficient",
    planType: "plus",
    workloadClass: "routine",
    model: "gpt-5.6-luna",
    reasoningEffort: "low",
    reason: "routine workload selected by the ChatGPT Plus efficient profile.",
  });
  assert.equal(selectOpenAIExecutionPolicy(task("standard"), plus).model, "gpt-5.6-terra");
  assert.deepEqual(
    {
      model: selectOpenAIExecutionPolicy(task("complex"), plus).model,
      effort: selectOpenAIExecutionPolicy(task("complex"), plus).reasoningEffort,
    },
    { model: "gpt-5.6-sol", effort: "medium" },
  );
  assert.deepEqual(
    {
      model: selectOpenAIExecutionPolicy(task("critical", "high"), plus).model,
      effort: selectOpenAIExecutionPolicy(task("critical", "high"), plus).reasoningEffort,
    },
    { model: "gpt-5.6-sol", effort: "high" },
  );
  assert.equal(
    selectOpenAIExecutionPolicy(task("standard"), { planType: "ChatGPT Plus" }).profile,
    "plus-efficient",
  );
});

test("risk metadata supplies an automatic class when complexity is absent", () => {
  const mediumRisk = selectOpenAIExecutionPolicy({ execution: { riskLevel: "medium" } });
  assert.equal(mediumRisk.workloadClass, "complex");
  assert.equal(mediumRisk.model, "gpt-5.6-sol");
  assert.equal(mediumRisk.reasoningEffort, "high");

  const highRisk = selectOpenAIExecutionPolicy({ execution: { riskLevel: "high" } });
  assert.equal(highRisk.workloadClass, "critical");
  assert.equal(highRisk.model, "gpt-6-astra");
  assert.equal(highRisk.reasoningEffort, "high");
});

test("balanced Astra routing and Plus reasoning-failure escalation stay risk bounded", () => {
  assert.deepEqual(selectOpenAIExecutionPolicy(task("critical")), {
    mode: "automatic",
    profile: "balanced",
    planType: null,
    workloadClass: "critical",
    model: "gpt-6-astra",
    reasoningEffort: "medium",
    reason: "critical workload selected from Task Packet complexity or risk metadata.",
  });
  assert.equal(selectOpenAIExecutionPolicy(task("critical", "high")).reasoningEffort, "high");

  const escalated = selectOpenAIExecutionPolicy({
    routing: { workloadClass: "complex", modelEscalationReason: "reasoning-validation-failure" },
    execution: { riskLevel: "low" },
  }, { planType: "plus" });
  assert.equal(escalated.mode, "escalated");
  assert.equal(escalated.profile, "plus-efficient");
  assert.equal(escalated.model, "gpt-6-astra");
  assert.equal(escalated.reasoningEffort, "medium");
});

test("infrastructure failures never trigger a larger model", () => {
  assert.throws(() => selectOpenAIExecutionPolicy({
    routing: { modelEscalationReason: "network" },
  }, { planType: "plus" }), /cannot resolve an infrastructure failure/i);
});

test("explicit model routing is complete and unknown metadata fails closed", () => {
  const selected = selectOpenAIExecutionPolicy({ routing: {
    requestedModel: "gpt-5.6-sol", reasoningEffort: "low",
  } }, { planType: "plus" });
  assert.equal(selected.mode, "explicit");
  assert.equal(selected.profile, "plus-efficient");
  assert.throws(() => selectOpenAIExecutionPolicy({ routing: { requestedModel: "gpt-6-astra" } }), /requires both/i);
  assert.throws(() => selectOpenAIExecutionPolicy(task("mystery")), /unknown openai workload class/i);
});

test("provider configuration matches both executable routing profiles", () => {
  const providers = JSON.parse(fs.readFileSync(new URL("../config/providers.json", import.meta.url), "utf8"));
  const configured = providers.providers.openai.optimization;
  assert.equal(configured.defaultProfile, "balanced");
  assert.equal(configured.standardSpeedOnly, true);
  for (const workload of ["routine", "standard", "complex", "critical"]) {
    const balanced = selectOpenAIExecutionPolicy(task(workload));
    assert.deepEqual(configured[workload], {
      model: balanced.model,
      reasoningEffort: balanced.reasoningEffort,
    });
    const plus = selectOpenAIExecutionPolicy(task(workload), { planType: "plus" });
    assert.deepEqual(configured.plusEfficient[workload], {
      model: plus.model,
      reasoningEffort: plus.reasoningEffort,
    });
  }
  const balancedHighRisk = selectOpenAIExecutionPolicy(task("critical", "high"));
  assert.deepEqual(configured.criticalHighRisk, {
    model: balancedHighRisk.model,
    reasoningEffort: balancedHighRisk.reasoningEffort,
  });
  const plusHighRisk = selectOpenAIExecutionPolicy(task("critical", "high"), { planType: "plus" });
  assert.deepEqual(configured.plusEfficient.criticalHighRisk, {
    model: plusHighRisk.model,
    reasoningEffort: plusHighRisk.reasoningEffort,
  });
});
