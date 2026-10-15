# Codex plugin / MCP / hook / live reviewer watch — 2026-09-02

## Scope

Previous Dex provider-watch cutoff was OpenAI Codex PR #42113. This watch records the meaningful upstream changes merged after that point: PR #42114, #42117, #42118, and #42121.

Compared canonical Dex state:
- Wiki `main` at watch start: `3d01ad83de8366746d64d124bf1d5c624a064657`
- Runtime `main` at watch start: `bbdf6ec6abaa4bd7f7297a6dc4ce6e8f1fcf1de1`
- Canonical operating gate remains Runtime #28 Phase 3 approved Windows-host broker↔DexWorker E2E; #34/#35 remain gated behind #28 completion.
- Official latest non-prerelease Codex release remains `0.152.0`; the four PRs below are upstream-main/future-stable evidence, not approved-host capability evidence.

No prerelease/experimental feature, plugin mutation, reviewer mutation, permission expansion, paid usage path, external messaging, or destructive migration was enabled by this watch.

## Official upstream evidence

### #42114 — Centralize remote plugin mutations in `PluginsManager`

Official PR: https://github.com/openai/codex/pull/42114

- Merged `2026-09-01T18:37:20Z`, commit `ef76e6ac30990071b10c8ae7f2bcaf55dc447afc`.
- Remote plugin install/uninstall orchestration moves into shared `PluginsManager` APIs.
- Installed-plugin sync gate coordinates cache/backend mutations.
- Backend uninstall failure preserves the local cache; successful uninstall refreshes installed state.
- Structured operation outcomes/errors allow callers to retain JSON-RPC mapping, telemetry, cache refresh, and OAuth setup behavior.

### #42117 — Fix relative MCP server spawning on macOS

Official PR: https://github.com/openai/codex/pull/42117

- Merged `2026-09-01T18:55:26Z`, commit `ea7e0714daeee7ebad9a0061ed44483a8c2a50e8`.
- Relative macOS MCP executables with configured cwd use direct `posix_spawn` for the affected path rather than Rust's `fork` fallback.
- Configured path, `argv[0]`, cwd, environment, stdio, and process group are preserved.
- Cancellation-safe wait/cleanup kills and reaps dropped children.
- Existing PATH lookup and executable-text-without-shebang launcher behavior remains separate.

### #42118 — Refine hook activity rendering in the TUI

Official PR: https://github.com/openai/codex/pull/42118

- Merged `2026-09-01T19:08:52Z`, commit `bc39b0ed59a85c47b2e9c267cdd57bb1018bc5f2`.
- Revealed running hooks move to the bottom activity area; fast hooks can stay hidden and concurrent hooks can collapse to a summary.
- Durable output favors user-facing actionable failure/block/stop states.
- Model-facing context and quiet successful completion output are suppressed from TUI history surfaces.

### #42121 — Allow updating the approval reviewer for active turns

Official PR: https://github.com/openai/codex/pull/42121

- Merged `2026-09-01T19:22:12Z`, commit `91125641141fcd8a4b026931d49e352f6626ffaa`.
- Adds `approvalsReviewer` to the **experimental** `turn/settings/update` API.
- A live reviewer update affects subsequently captured steps and new background approval requests.
- Existing pending approvals and future-thread defaults remain distinct state.
- Managed reviewer restrictions and model-required automatic review continue to apply.
- Upstream tests cover live user/automatic reviewer switching, future-turn isolation, and managed-authority rejection.

## Dex classification

### confirmed

- All four changes are merged to OpenAI Codex upstream `main` after official stable `0.152.0`.
- #42114 improves provider-managed plugin mutation serialization/failure consistency; Dex automatic plugin install/update/reconcile/delete remains disabled.
- #42117 is a macOS child-process reliability/cleanup change; it does not alter the current approved Windows worker baseline or prove equivalent sandbox security.
- #42118 is a presentation/history-surface change; TUI visibility is not authorization or execution/audit authority.
- #42121 is explicitly experimental and does not qualify for Dex operational adoption.

### inference

- #42114 can reduce cache/backend divergence, wrong-Skill loading, and recovery rework once a stable approved-host plugin mutation path is validated.
- #42117 can reduce MCP startup/cancellation/orphan-process rework on a future approved macOS worker.
- #42118 can reduce operator transcript noise, but hidden/quiet hooks require independent bounded audit evidence because UI absence does not prove execution absence.
- #42121 can reduce approval friction in long-running turns, but dynamic reviewer timing creates a new authority boundary that must not retroactively affect pending approvals or bypass managed policy.

### proposal

- Keep all four changes watch-only until their first official stable is identified and relevant approved-host E2E passes.
- Keep Dex-owned plugin/Skill source and provenance in Git as canonical; provider cache/materialized bundle state remains derived.
- Validate macOS MCP spawn reliability separately from sandbox, credential, project realpath/digest, and `CODEX_HOME` isolation.
- Treat hook TUI rendering separately from persistence/export/audit evidence.
- Do not enable experimental live reviewer updates. If an equivalent stable public contract appears, bind any reviewer change to authenticated account/workspace + canonical Task ID + `attemptId`, prevent retroactive pending-approval mutation, preserve managed/model-required review precedence, and record only bounded audit evidence.

### unknown

- First official stable containing #42114/#42117/#42118/#42121.
- Whether #42121 graduates from experimental `turn/settings/update` unchanged.
- Approved macOS-host MCP relative-spawn/cancel/cleanup behavior in Dex.
- Final stable hook persistence/export/audit semantics after #42118.
- Final plugin mutation lifecycle/rollback behavior across App Server, desktop, Work, and mobile surfaces.

## Dex optimization actually applied

Runtime branch `watch/codex-plugin-mcp-reviewer-20260902` was created from exact current Runtime `main` `bbdf6ec6abaa4bd7f7297a6dc4ce6e8f1fcf1de1`.

Runtime PR #79:
https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/79

- Change scope: one new documentation file, `docs/CODEX_PLUGIN_MCP_REVIEWER_WATCH_20260902.md`.
- Diff: `+132 / -0`; no Runtime executable code, config, permissions, plugin state, reviewer state, or paid usage setting changed.
- PR branch validation run `33550042855`: PASS.
  - dependency install: PASS
  - static checks, unit tests, smoke test: PASS
  - production dependency audit: PASS
- Branch Vercel deployment: PASS.
- PR #79 merged under AI Contract §12.1 standing provider-optimization approval.
- Runtime final `main`: `8f265bead9a796feff8ee25c0ec88f7a60521591`.
- Post-merge Runtime validation run `33550165655`: PASS.
- Merge-commit Vercel deployment: PASS.

Tracking updates:
- Runtime #75: added #42114 plugin install/uninstall mutation-gate, cache-preservation, structured-error leakage, and identity-isolation future gates.
- Runtime #78: added #42118 hook-rendering vs execution/persistence/audit separation gates.
- Runtime #25: added #42121 experimental live-reviewer future-stable gates; reviewer update remains disabled.
- Runtime #80 created: future stable / approved-macOS MCP relative-spawn, cancellation, cleanup, orphan-process, and isolation validation.

No aggregate `CURRENT_STATE.md`, `PROJECT_CONFIG.md`, `CURRENT.md`, handoff, or decision history was mass-rewritten in this provider-watch because the operational gate did not change. This preserves unrelated historical/user changes; the watch evidence and tracking issues are the appropriate minimal canonical delta.

## Safety boundary preserved

- Prerelease/experimental activation: 0
- `turn/settings/update` reviewer mutation: 0
- automatic approve/reviewer reassignment: 0
- plugin/Skill install/uninstall/update/reconcile/delete: 0
- legacy Skill/Plugin deletion: 0
- MCP executable/config/cwd mutation: 0
- broader filesystem/OAuth/MCP/app/workspace permissions: 0
- paid API / automatic paid fallback / extra paid usage / credit-reset-plan change: 0
- external messaging: 0
- destructive migration: 0
- GitHub Task ID, `attemptId`, approval evidence, mutation lock, durable Result/receipt, and detached verifier remain authority.

## PASS / FAIL / Not Checked

| Check | Result |
|---|---|
| Official #42114 evidence | PASS |
| Official #42117 evidence | PASS |
| Official #42118 evidence | PASS |
| Official #42121 evidence | PASS |
| Latest non-prerelease release remains `0.152.0` | PASS |
| Runtime PR #79 one-file diff / unrelated-change preservation | PASS |
| Runtime PR branch validation `33550042855` | PASS |
| Runtime branch Vercel | PASS |
| Runtime PR #79 merge | PASS |
| Runtime post-merge validation `33550165655` | PASS |
| Runtime merge Vercel | PASS |
| Future stable inclusion | Not Checked |
| Approved macOS MCP spawn/cancel/cleanup E2E | Not Checked |
| Stable live-reviewer approved-host E2E | Not Checked |
| Work/mobile/desktop plugin mutation/hook/reviewer parity | Not Checked |
| FAIL | none |

## Sources

- OpenAI Codex PR #42114: https://github.com/openai/codex/pull/42114
- OpenAI Codex PR #42117: https://github.com/openai/codex/pull/42117
- OpenAI Codex PR #42118: https://github.com/openai/codex/pull/42118
- OpenAI Codex PR #42121: https://github.com/openai/codex/pull/42121
- OpenAI Codex releases: https://github.com/openai/codex/releases
- OpenAI Codex changelog: https://developers.openai.com/codex/changelog
- Dex Runtime PR #79: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/79
- Dex Runtime #25: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/25
- Dex Runtime #75: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/75
- Dex Runtime #78: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/78
- Dex Runtime #80: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/80
