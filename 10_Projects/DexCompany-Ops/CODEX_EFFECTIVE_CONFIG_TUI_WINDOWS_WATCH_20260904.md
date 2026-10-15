# Codex Effective Config / TUI Windows Watch — 2026-09-04

Cutoff reviewed: 2026-09-04 09:58 Asia/Seoul.
Previous permitted cutoff: 2026-09-04 09:08 Asia/Seoul.
Quiet-window policy: no Dex Company search or monitoring from 23:00 through 05:59 Asia/Seoul. The prior 06:00 catch-up already reconciled that quiet-window backlog; all material items below occurred after the previous permitted cutoff.

## Source-backed facts

### OpenAI Codex PR #42639 — saved model defaults can be overridden

Merged to `openai/codex` `main` at 2026-09-04 09:26:03 Asia/Seoul.

- A model-default config write can succeed even when a higher-priority configuration layer overrides the saved value.
- Codex now warns when saved model, reasoning-effort, or service-tier defaults are overridden.
- The active conversation's explicit selection is preserved while the saved default's effective status is reported.
- Tests cover successful, overridden, and rejected writes against the App Server target config profile.

Official source: https://github.com/openai/codex/pull/42639

### OpenAI Codex PR #42640 — assistant markup and Windows file-link hardening

Merged to `openai/codex` `main` at 2026-09-04 09:33:08 Asia/Seoul.

- Adds one parser for assistant directives with quoted/unquoted attributes, embedded braces, escaped quotes, and malformed input.
- Applies it to Git action receipts and code comments.
- Parses `file://` links through `PathUri`, including Windows drive and UNC paths across host path conventions while preserving line/column anchors.
- Adds directive grammar and foreign-Windows-path regression coverage.

Official source: https://github.com/openai/codex/pull/42640

### OpenAI Codex PR #42641 — inline TUI recovery after full-screen overlays

Merged to `openai/codex` `main` at 2026-09-04 09:41:29 Asia/Seoul.

- Invalidates the restored inline viewport after leaving the alternate screen.
- Reflows transcript history once when returning from a full-height overlay to the shorter chat layout.
- Adds regression coverage for repainting the composer and rebuilding history once.

Official source: https://github.com/openai/codex/pull/42641

### OpenAI Codex PR #42638 — Astra Fast description sync

Merged to `main` at 2026-09-04 09:14:37 Asia/Seoul and describes the `gpt-6-astra` Fast tier as `2x speed` with increased usage. This is synchronization of already-recorded evidence: the previous permitted watch recorded official Codex `0.153.2` and release-branch PR #42632, which explicitly stated that the wording change did not change request execution or guarantee an exact speedup.

Official source: https://github.com/openai/codex/pull/42638

### OpenAI Codex issue #42643 — duplicate commentary rendering signal

Created at 2026-09-04 09:54:56 Asia/Seoul. The reporter says macOS Codex Desktop renders commentary/progress messages twice while structured `thread/read` reconstructs one commentary item and one final-answer item. The report uses an API key with a custom Responses-compatible provider and bundled app-server `0.153.0-alpha.5`.

This is issue evidence only, not a maintainer-confirmed root cause or a Dex-supported authentication path.

Official source: https://github.com/openai/codex/issues/42643

## Stable / model / pricing / usage check

- Latest observed official non-prerelease Codex release remains `0.153.2`.
- No newer official stable appeared after the previous permitted cutoff.
- No new general model-default promotion, ChatGPT-plan pricing change, Codex usage-limit policy change, or subscription-first policy change requiring a Dex operational change was identified in this interval.
- Official plan guidance continues to state that Codex, ChatGPT Work, ChatGPT for Excel, and Workspace Agents can share an allowance/credit pool when available on the plan, with usage varying by model, execution location, complexity, context, reasoning, speed, and tools.

Official release: https://github.com/openai/codex/releases/tag/rust-v0.153.2
Official plan guidance: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Dex canonical comparison

Before this watch update:

- Wiki approved `main`: `20caf8f418ec48b13e64990af235b0e7e759c231` — PR #154.
- Runtime approved `main`: `67d0b06b3bf659e9118eb476e39d3a2480c7aa67` — PR #176.
- `AI_CONTRACT.md` keeps Wiki `main` as Source of Truth and permits low-risk provider compatibility, diagnostics, security, Windows-compatibility, tracking and regression-guard updates through standing approval.
- Actual model readiness is based on authenticated App Server/effective runtime state rather than remembered model names or UI text.
- GitHub Task Bus and canonical Task/Result evidence remain authoritative over provider transcript/TUI projections.
- Runtime #28 remains OPEN with approved Windows-host Phase 3 E2E Not Checked; #34/#35 remain blocked until #28 PASS.
- Paid API, automatic paid fallback, extra paid usage, hosted MCP writes, `danger-full-access`, multi-writer, and automatic experimental/provider-capability activation remain disabled.

## Dex classification

### confirmed

- PR #42639 distinguishes successful persistence of a default from whether that default is actually effective under higher-priority configuration.
- PR #42640 hardens directive parsing and cross-platform Windows drive/UNC file-link rendering.
- PR #42641 fixes inline TUI repaint/history reflow after overlay closure.
- PR #42638 repeats the Astra Fast wording already captured in the prior `0.153.2` watch.
- Issue #42643 is a real custom-provider/prerelease-app-server projection bug report, but not current Dex subscription-path evidence.
- Latest official non-prerelease Codex release remains `0.153.2` at this cutoff.

### inference

- Dex should never interpret `saved successfully` or a model picker/TUI label as proof that a desired model, reasoning effort, or service tier is the effective runtime setting.
- Requested, saved, and effective model/config values should be independently distinguishable in diagnostics; material precedence mismatch should fail closed for a readiness/promotion claim.
- TUI-rendered links, Git receipts, comments, progress messages, and transcript layout are presentation projections only. They do not become filesystem permission, approval, mutation, Task, or Result authority.
- UI duplicate/reflow/repaint problems must not produce a second worker run, mutation, callback, or canonical Result.

### proposal

- Extend future stable/approved-host readiness tests to capture requested/saved/effective model, reasoning, and service-tier values and to detect higher-priority override layers.
- Validate Windows drive/UNC/foreign-host file links for navigation only; authorization and mutation continue to use structured target-native path semantics.
- Keep transcript/UI dedup and repaint behavior separate from canonical Task/Result idempotency.
- Treat #42643 as watch-only unless it reproduces on ChatGPT subscription authentication and a stable App Server relevant to the approved Dex host.

### unknown

- First official stable containing PR #42639, #42640, or #42641.
- Approved Windows-host behavior of these changes once stable.
- Whether #42643 reproduces on ChatGPT subscription auth, current stable App Server, Windows, or the Dex-approved host.
- Whether a future stable structured API exposes requested/saved/effective configuration in one contract suitable for Dex diagnostics.

## Validation gates

### Effective configuration

- Record requested model, reasoning effort, and service tier.
- Record saved/default state where available.
- Independently record effective authenticated App Server/runtime values.
- Detect managed/profile/workspace/session override precedence.
- Treat a successful write with an unexplained effective mismatch as `FAIL` or `Not Checked`, not PASS.
- Do not silently rewrite global/workspace defaults to force a conversation's explicit selection.
- Do not use override warnings to authorize Astra/Fast, API-key fallback, paid usage, reset/credit consumption, or broader permissions.

### Windows/TUI presentation

- Validate Windows drive and UNC `file://` links preserve target-native path plus line/column identity.
- Malformed assistant markup must not change the canonical interpretation of Git actions or code comments.
- Rendered links and receipts remain advisory.
- Permission and filesystem-write checks continue to use structured approval data and target-native path normalization.
- Foreign-host path rendering must never broaden writable roots or grants.

### Projection idempotency

- Canonical Task ID, attempt ID, mutation lock, evidence/commit identity, Result, and callback receipt remain authoritative.
- UI repaint/reflow, duplicated commentary display, or item projection changes create zero new mutation or Result.
- If UI and structured task/thread state disagree, preserve canonical data and mark the presentation layer degraded rather than replaying work.

## Dex optimization applied

Runtime PR #177 added the matching provider-watch gate as a documentation/tracking-only change.

- Runtime PR #177 branch head: `f6a7cb5df69a748b92d305699839f3577617ec4b`
- Branch validation `33824180812`: PASS on first attempt.
- Dependency install: PASS.
- Static checks, unit tests, and smoke test: PASS.
- Production dependency audit: PASS.
- Branch Vercel: PASS.
- Runtime PR #177 merged to `main`: `39d441ad55b1655680f02ab3393382b1c7a63315`.
- Merge Vercel: PASS.
- Separate merge-SHA GitHub Actions run: Not Checked because no run was emitted at verification time.
- Runtime code/config/model routing/permission/billing/provider-auth behavior changed: 0.

Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/177
Runtime validation: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33824180812

## Status

- `PASS`: official PR #42639/#42640/#42641 merge metadata and scope verified.
- `PASS`: PR #42638 screened as already-covered Astra Fast wording evidence.
- `PASS`: issue #42643 screened as custom-provider/prerelease projection evidence only.
- `PASS`: latest official non-prerelease release remains `0.153.2`.
- `PASS`: minimum canonical Dex contract, Runtime/Wiki heads, #28/#34/#35 gates, and subscription-first boundaries re-read.
- `PASS`: Runtime PR #177 branch validation and branch/merge Vercel.
- `PASS`: Runtime PR #177 merged after validation.
- `FAIL`: none remaining in this watch change.
- `Not Checked`: separate Runtime merge-SHA GitHub Actions; first stable containing #42639/#42640/#42641; approved-host E2E for those changes; #42643 subscription/stable applicability.

## Safety boundary

This evidence does not authorize prerelease/experimental activation, Astra/Fast auto-selection, API keys, custom paid providers, paid API, automatic paid fallback, extra paid usage, credit/reset consumption, broader OAuth/MCP/filesystem/network permission, Remote/Voice/Browser/Computer Use, hosted writes, destructive migration, legacy Skill/Plugin deletion, external messaging, duplicate workers, provider database/cache repair, or automatic deployment beyond the low-risk provider-watch workflow approved by `AI_CONTRACT.md` §12.1.
