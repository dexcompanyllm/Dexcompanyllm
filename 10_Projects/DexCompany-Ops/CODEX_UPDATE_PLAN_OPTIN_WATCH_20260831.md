# Codex `update_plan` opt-in watch — 2026-08-31

## Scope

This note records a meaningful OpenAI Codex upstream correction after the previous Dex watch baseline. It supersedes the **current interpretation** of the `update_plan` section in `CODEX_POST_0151_WATCH_20260830.md` while preserving that older note as historical chronology. Upstream `main` remains future-direction evidence, not installed stable capability evidence.

## Findings

### 1. `update_plan` is now opt-in on upstream `main`

- Classification: `confirmed`
- OpenAI PR #41744 / merge commit: https://github.com/openai/codex/commit/a9519cbcdd2d664530edb2469224ee03c1056799
- The current upstream default for `tools.update_plan.enabled` is `false`.
- Users must explicitly enable the setting to expose `update_plan`.
- When the tool is disabled, bundled `update_plan` guidance is removed from model, collaboration-mode, multi-agent, compaction, prewarm, and goal-continuation prompts.
- Custom base instructions, model catalog instructions, collaboration policies, and user goal text are preserved even when they mention planning or `update_plan`.

### Chronology

- Earlier PR #41630 / commit `28327355b861ab6cc76b01c7248663eb1be440cf` temporarily made the upstream-main default `true`.
- PR #41744 / commit `a9519cbcdd2d664530edb2469224ee03c1056799` supersedes that behavior and restores an explicit opt-in model.
- Therefore the older Dex statement that upstream `main` currently has `update_plan` default-on is no longer current.

### Why it matters to Dex

- Classification: `inference`
- The provider default changed twice before reaching a newer stable release. Binding Dex workflow logic to an upstream default would create avoidable drift and rework.
- Explicit opt-in is safer for Dex because tool exposure remains intentional and testable.
- The prompt-cleanup behavior is also relevant: disabling the tool should not leave stale bundled planning guidance that implies a tool exists, while user/Dex instructions must remain intact.

### Dex action

- Classification: `confirmed`
- Runtime Issue #25 now records the default-on → opt-in chronology and stable activation gate.
- Runtime PR #39 updated `config/codex-capability-tracking.json` schema to `1.7`.
- `updatePlanDefault` remains `upstream-main / watch-disabled / enabled:false`.
- The current upstream commit is `a9519cbcdd2d664530edb2469224ee03c1056799`; the earlier #41630 commit is retained as superseded history.
- Regression tests require the opt-in/default-false contract, prompt-guidance removal, and preservation of custom instructions/user goal text to remain documented.
- Runtime validation run `33347689531` passed static checks, unit tests, smoke test, and production dependency audit.
- Runtime PR #39 merged to `main` as `9231c9c7ea94a3551e29fdbb0da3468c2e70c4ed`.

### 2. History-ingestion request metadata appears on upstream `main`

- Classification: `confirmed`
- OpenAI PR #41743 / commit: https://github.com/openai/codex/commit/b7cd519c767c8fd4bc3581d9bc92fbab37a768c1
- When the history-notes token-budget extension is enabled, Codex sets core-owned Responses turn metadata `history_ingest_requested=true`.
- Caller-provided metadata cannot override that core-owned key, and the key is omitted when the extension is disabled.

### Why it matters to Dex

- Classification: `inference`
- This may become useful observability for long-context/history workflows, but it is not yet a stable public Dex integration contract.

### Dex action

- Classification: `proposal`
- Keep it watch-only under Runtime Issue #25.
- Do not add Runtime behavior until a non-prerelease stable/public contract and a concrete Dex observability use case exist.

## Stable / model / pricing check

- Classification: `confirmed`
- Latest non-prerelease Codex release remains `0.151.0`, published 2026-08-29.
- No newer stable release is treated as available in this check.
- No new model, pricing, or included usage-limit change requiring a Dex policy change was confirmed in this check.

## Safety and cost boundaries

- No prerelease/alpha installation or promotion.
- No `update_plan` activation.
- No paid API, automatic paid fallback, or extra paid usage.
- No permission or OAuth-scope expansion.
- No hosted MCP write enablement.
- No legacy Skill/Plugin removal.
- GitHub Task Bus remains canonical task authority.

## Verification

### PASS

- Official OpenAI Codex upstream commit review for #41744 and #41743
- Latest non-prerelease release check: `0.151.0`
- Runtime `main` comparison and stale default-on assumption identification
- Runtime capability tracking correction to schema `1.7`
- Runtime regression coverage update
- Runtime validation run `33347689531`
- Static checks, unit tests, smoke test, production dependency audit
- Runtime PR #39 merge — `9231c9c7ea94a3551e29fdbb0da3468c2e70c4ed`
- Runtime Issue #25 correction and activation-gate update

### FAIL

- None in the implemented/automated verification scope.

### Not Checked

- A future stable release containing PR #41744
- Approved Windows host default-false / explicit-enable tool-surface E2E
- Approved-host prompt regression across collaboration, multi-agent, compaction, prewarm, and goal continuation
- Stable/public contract and practical Dex value for `history_ingest_requested`

## Handoff

Do not enable `update_plan` based on upstream `main`. When a newer official stable includes the behavior, verify on the approved host that:

1. omitted `tools.update_plan.enabled` leaves the tool absent,
2. explicit `true` exposes the tool,
3. disabled mode removes bundled tool-specific guidance,
4. Dex/custom instructions and user goal text remain unchanged,
5. no permission, cost, or Task Bus authority changes are introduced.

## Tracking

- Runtime Issue #25: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/25
- Runtime PR #39: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/39
- Historical predecessor: `10_Projects/DexCompany-Ops/CODEX_POST_0151_WATCH_20260830.md`
