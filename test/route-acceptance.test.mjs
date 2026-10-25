import assert from "node:assert/strict";
import test from "node:test";
import { assessRouteAcceptance } from "../packages/core/src/route-acceptance.mjs";

const now = Date.parse("2026-09-12T12:00:00Z");
const route = { operation: "execute", client: "iphone", provider: "openai", environment: "mac",
  revision: "core-v1", environmentRevision: "mac-account-config-cli-v1" };
function record(gate, scope = "common", revision = route.revision) {
  return { gate, scope, revision, status: "PASS", evidence: "test:fixture",
    reviewedBy: "fixture-reviewer", verifiedAt: "2026-09-12T10:00:00Z", validUntil: "2026-09-13T10:00:00Z" };
}
function evidence() {
  return ["identity", "canonical-state", "cost-policy", "approval-scope", "idempotency",
    "single-writer", "original-intent-verification", "durable-result", "recovery"]
    .map(gate => record(gate)).concat([
      record("control-access", "client:iphone"),
      record("bounded-execution", "execution:openai:mac", route.environmentRevision),
      { ...record("bounded-execution", "execution:openai:windows", "windows-v1"), status: "Not Checked" },
    ]);
}
test("a verified iPhone-to-Mac route does not require Windows execution acceptance", () => {
  const result = assessRouteAcceptance(route, evidence(), { now });
  assert.equal(result.eligible, true);
  assert.equal(result.executionAuthorized, false);
  assert.deepEqual(result.missing, []);
  assert.equal(assessRouteAcceptance({ ...route, environment: "windows", environmentRevision: "windows-v1" }, evidence(), { now }).eligible, false);
});
test("core and selected host failures cannot be bypassed by another passing device", () => {
  for (const gate of ["cost-policy", "original-intent-verification", "bounded-execution"]) {
    const records = evidence();
    records.find(item => item.gate === gate).status = "FAIL";
    assert.equal(assessRouteAcceptance(route, records, { now }).eligible, false, gate);
  }
  assert.equal(assessRouteAcceptance({ ...route, provider: "anthropic" }, evidence(), { now }).eligible, false);
  assert.equal(assessRouteAcceptance({ ...route, client: "galaxy" }, evidence(), { now }).eligible, false);
});
test("read access has no execution host dependency", () => {
  const records = ["identity", "canonical-state", "cost-policy"].map(gate => record(gate));
  records.push(record("read-access", "client:iphone"));
  assert.equal(assessRouteAcceptance({ operation: "read", client: "iphone", revision: "core-v1" }, records, { now }).eligible, true);
  assert.equal(assessRouteAcceptance({ operation: "submit", client: "iphone", revision: "core-v1" }, records, { now }).eligible, false);
});
test("stale, future, expired, duplicate, revoked, or unreviewed evidence fails closed", () => {
  for (const replacement of [
    { revision: "old" }, { status: "Not Checked" }, { evidence: "" }, { reviewedBy: "" },
    { revoked: true }, { verifiedAt: "2026-09-14T00:00:00Z" },
    { validUntil: "2026-09-11T00:00:00Z" }, { validUntil: "bad" },
  ]) {
    const records = evidence();
    records[0] = { ...records[0], ...replacement };
    assert.equal(assessRouteAcceptance(route, records, { now }).eligible, false);
  }
  const duplicate = evidence();
  duplicate.push({ ...duplicate[0] });
  assert.equal(assessRouteAcceptance(route, duplicate, { now }).eligible, false);
  for (const operation of [undefined, "constructor", "toString", "__proto__", "unknown"]) {
    assert.equal(assessRouteAcceptance({ operation }, [], { now }).eligible, false);
  }
});
