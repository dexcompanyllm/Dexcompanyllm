# Codex Model Retirement Plan-Aware Readiness

- Date: 2026-08-26
- Status: Implemented / approved-host E2E Not Checked
- Runtime merge: `d691f7accc86c26cc32f20204f216688903b71cc`
- Runtime PR: `#16`
- Validation run: `32913301010`

## Context

OpenAI's current Codex plan table indicates that Plus, Pro, Business and Enterprise can use GPT-5.6 Sol, Terra and Luna, while Free and Go can use Terra. The 2026-08-31 retirement mapping remains:

- `gpt-5.4` → `gpt-5.6-terra`
- `gpt-5.4-mini` → `gpt-5.6-luna`

The first Runtime implementation required both replacement models to be present before reporting `retirementReady: true`. That is correct for Ethan's Pro catalog expectation but would incorrectly block a valid Free/Go catalog that never exposed GPT-5.4 mini or Luna.

## Decision

`retirementReady` is plan-aware and catalog-evidence-based.

A retirement mapping blocks readiness only when:

1. the authenticated `model/list` exposes the retired source model; and
2. its official replacement is absent.

A model pair that the account plan never exposed does not block readiness.

The following fail-closed rules remain unchanged:

- an explicit request for a retired model requires its official replacement
- a retired default model requires its official replacement
- an unknown explicit model is rejected
- invalid catalog responses, cursor cycles and bounds violations are rejected
- no arbitrary fallback model is selected
- no provider API key or paid fallback is used

## Consequences

- Ethan's Pro host should still expose Sol, Terra and Luna and pass the original migration expectation.
- Free/Go portability no longer produces a false `ready: false` solely because Luna is unavailable.
- A catalog that still exposes `gpt-5.4-mini` without Luna correctly reports `blocksReadiness: true`.
- Explicitly asking for `gpt-5.4-mini` without Luna still fails closed, even when the source is absent from the current catalog.

## Changes

- Runtime `workers/openai-codex/src/model-policy.mjs`
  - adds `blocksReadiness`
  - computes readiness from exposed retired sources rather than universal replacement presence
- Runtime `test/codex-model-policy.test.mjs`
  - adds plan-limited catalog PASS case
  - adds exposed-retired-source/missing-replacement blocking case
- Runtime `docs/CODEX_APP_SERVER_COMPATIBILITY.md`
  - defines plan-aware semantics and plan availability

## QA

### PASS

- Official plan availability and retirement mapping cross-checked.
- Plan-limited catalog without an unavailable retired source: `retirementReady: true`.
- Catalog exposing retired mini without Luna: `retirementReady: false`, `blocksReadiness: true`.
- Explicit/default retired-model missing-replacement fail-closed behavior preserved.
- Runtime validation run `32913301010`: PASS.
- Static checks: 13 required files, 39 JavaScript syntax checks, JSON/dependency/secret scan PASS.
- Node tests: 165/165 PASS.
- New plan-aware edge tests: 2/2 PASS.
- Runtime smoke: PASS.
- Vercel adapter smoke: PASS.
- Rollback guard: PASS.
- Production dependency audit: 0 vulnerabilities.
- Runtime PR #16 unresolved review thread: 0.
- Runtime PR #16 merge: PASS.

### FAIL

- None in the implemented and automated verification scope.

### Not Checked

- Ethan's approved Pro host real `model/list`.
- `npm run codex:compatibility` and `npm run codex:status` on the approved host.
- Post-merge direct Production HTTP smoke.
- Plugin marketplace install and fresh-session Skill invocation.

## Handoff

On the approved Pro host:

```powershell
npm run codex:compatibility
npm run codex:status
```

Expected:

- `compatibility.baseline.compatible: true`
- `modelCatalog.retirementReady: true`
- `ready: true`
- Sol, Terra and Luna present for the Pro plan

For a plan-limited account, readiness may still be true when a model family was never available. Judge migration coverage from each `migrations[]` entry's `sourceAvailable`, `replacementAvailable` and `blocksReadiness` values rather than requiring every known replacement globally.

## Sources

- OpenAI Help, Codex rate card and plan availability: `https://help.openai.com/en/articles/11369540`
- Runtime PR #16: `https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/16`
- Runtime validation run: `32913301010`

## Watchdog Verdict

`PASS_WITH_WARNINGS` — the portability edge case is fixed without weakening retired-model fail-closed behavior. The approved-host real catalog remains Not Checked.
