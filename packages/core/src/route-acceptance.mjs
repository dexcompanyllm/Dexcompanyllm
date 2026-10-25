// Pure assessment for release planning. This does not authorize execution,
// install software, enable providers or replace broker/worker security checks.
const COMMON = {
  read: ["identity", "canonical-state", "cost-policy"],
  submit: ["identity", "canonical-state", "cost-policy", "approval-scope", "idempotency"],
  execute: ["identity", "canonical-state", "cost-policy", "approval-scope", "idempotency",
    "single-writer", "original-intent-verification", "durable-result", "recovery"],
};

export function assessRouteAcceptance(route, records, { now = Date.now() } = {}) {
  if (!Object.hasOwn(COMMON, route?.operation) || !Array.isArray(records) || !Number.isFinite(now)) {
    return { eligible: false, missing: ["invalid-assessment-input"], executionAuthorized: false };
  }
  const dimensions = ["client", "revision"];
  if (route.operation === "execute") dimensions.push("provider", "environment", "environmentRevision");
  if (dimensions.some(key => typeof route[key] !== "string" || !route[key].trim())) {
    return { eligible: false, missing: ["missing-route-binding"], executionAuthorized: false };
  }
  const required = [
    ...COMMON[route.operation].map(gate => ({ gate, scope: "common", revision: route.revision })),
    { gate: route.operation === "read" ? "read-access" : "control-access", scope: "client:" + route.client, revision: route.revision },
  ];
  if (route.operation === "execute") required.push({
    gate: "bounded-execution", scope: "execution:" + route.provider + ":" + route.environment,
    revision: route.environmentRevision,
  });
  const missing = required.filter(requirement => {
    const matches = records.filter(record => record?.gate === requirement.gate && record.scope === requirement.scope);
    // Ambiguous, stale, revoked, missing or unreviewed records never pass.
    if (matches.length !== 1) return true;
    const record = matches[0];
    const verifiedAt = Date.parse(record.verifiedAt);
    const validUntil = Date.parse(record.validUntil);
    return record.status !== "PASS" || record.revoked === true || record.revision !== requirement.revision
      || !Number.isFinite(verifiedAt) || !Number.isFinite(validUntil)
      || verifiedAt > now || validUntil <= now || validUntil <= verifiedAt
      || typeof record.evidence !== "string" || !record.evidence.trim()
      || typeof record.reviewedBy !== "string" || !record.reviewedBy.trim();
  }).map(requirement => requirement.scope + "/" + requirement.gate);
  return { eligible: missing.length === 0, missing, executionAuthorized: false };
}
