# Codex 0.152.0-alpha.6 prerelease watch — 2026-08-31

## Scope

Official OpenAI/Codex sources were checked after the prior post-0.151 watch. This note records a new prerelease packaging milestone only. It does **not** promote a prerelease to Dex stable capability evidence and does not change the approved stable target.

## Findings

### confirmed

- OpenAI published Codex `0.152.0-alpha.5` on 2026-08-31 and then `0.152.0-alpha.6` at 2026-08-31 02:12:53 UTC.
- `0.152.0-alpha.6` is explicitly marked `prerelease: true`; its release commit is `d2a6bad21bbda8098520f5605ba523758ff10e94`.
- The alpha.6 ancestry packages several changes already tracked by Dex from upstream `main`, including:
  - PR #41700 / `94cbbddafc1776d5e377bca1b05932c697e82238`: package-style MCP server names.
  - PR #41742 / `79b04f1ab5079d65e84e6a8006255a9c2cf9944e`: actionable rate-limit banners, identity filtering, stale-response recovery, and optional provider-directed fallback-model selection.
  - PR #41743 / `b7cd519c767c8fd4bc3581d9bc92fbab37a768c1`: core-owned `history_ingest_requested` turn metadata.
  - PR #41744 / `a9519cbcdd2d664530edb2469224ee03c1056799`: `update_plan` opt-in/default-false behavior.
- OpenAI `main` has no commit newer than PR #41744 at this check.
- The latest official non-prerelease Codex release remains `0.151.0`; no newer stable release was confirmed.
- No new Codex model, included-plan pricing/usage-limit reduction, paid-policy change, Windows stable contract, or stable App Server/SDK/MCP/Skill/Plugin change was confirmed in this check.

### inference

- Moving previously watched commits into an official `0.152.0` alpha increases confidence that OpenAI is testing them together as part of the 0.152 release train, but it does not guarantee that every behavior will ship unchanged in the next stable.
- The most consequential Dex boundary remains PR #41742: provider-owned recovery UI can improve reliability, but billing/reset actions or provider-selected model fallback must not become authority to bypass Dex subscription-first/model policy.

### proposal — adopted

- Keep approved/recommended Codex stable target at `0.151.0` until an official newer stable is published and verified.
- Treat `0.152.0-alpha.6` as **prerelease evidence only**. Do not install, enable, promote, or make Dex Runtime depend on it.
- Keep package-style MCP names, actionable rate-limit recovery, history-ingestion metadata, and `update_plan` behavior in their existing watch/tracked-disabled gates.
- Reuse existing Runtime Issues #18, #25, and #37 rather than creating duplicate tracking work.
- When 0.152 stable is published, compare its generated schema/config/tool surface to the watched alpha evidence and run only the approved-host E2E required by those issues.

### unknown

- Which alpha.6 behaviors will ship unchanged in the next stable Codex release.
- The next stable version and publication time.
- The exact stable generated App Server schema for actionable rate-limit banners.
- Approved-host behavior for package-style MCP add/get/list/remove + OAuth lookup, `update_plan` explicit enable/disable, rate-limit recovery, and history-ingestion metadata.

## Dex implementation response

- Runtime execution code: unchanged.
- Runtime stable reference: unchanged at `0.151.0`.
- Prerelease/experimental activation: none.
- Paid API, automatic paid fallback, automatic extra usage, reset redemption, plan upgrade: none.
- Permissions/OAuth scopes: unchanged.
- Legacy Skill/Plugin deletion: none.
- Existing tracking is reused:
  - Runtime #18 — MCP runtime diagnostics/package-style names.
  - Runtime #25 — post-0.151 workflow/Guardian/history metadata.
  - Runtime #37 — actionable rate-limit banner/fallback safety.

No Runtime code change was made because the new information is a prerelease packaging milestone for behaviors already gated in Runtime. Adding executable dependencies or changing capability defaults before stable evidence would increase churn and rework without user benefit.

## Verification

### PASS

- Official OpenAI `openai/codex` release metadata confirms `0.152.0-alpha.5` and `0.152.0-alpha.6` are prereleases.
- alpha.6 tag resolves to release commit `d2a6bad21bbda8098520f5605ba523758ff10e94`.
- Commit ancestry/diff review confirms the already-watched #41700, #41742, #41743, and #41744 changes are included in the alpha.6 release line.
- Current OpenAI `main` head remains #41744.
- Latest official non-prerelease target remains `0.151.0`.
- Current Dex Runtime `main` remains `2015c87e40ccfa649418500332ebb2e5a9b116eb`; no Runtime mutation was required.

### FAIL

- None in the checked scope.

### Not Checked

- Any prerelease host installation or E2E — intentionally not performed.
- Future 0.152 stable generated schema/config/tool surface.
- Future approved-host stable E2E for Issues #18, #25, and #37.

## Official sources

- https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.6
- https://github.com/openai/codex/commit/d2a6bad21bbda8098520f5605ba523758ff10e94
- https://github.com/openai/codex/commit/94cbbddafc1776d5e377bca1b05932c697e82238
- https://github.com/openai/codex/commit/79b04f1ab5079d65e84e6a8006255a9c2cf9944e
- https://github.com/openai/codex/commit/b7cd519c767c8fd4bc3581d9bc92fbab37a768c1
- https://github.com/openai/codex/commit/a9519cbcdd2d664530edb2469224ee03c1056799
- https://developers.openai.com/codex/changelog
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Tracking

- Runtime #18: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/18
- Runtime #25: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/25
- Runtime #37: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/37
