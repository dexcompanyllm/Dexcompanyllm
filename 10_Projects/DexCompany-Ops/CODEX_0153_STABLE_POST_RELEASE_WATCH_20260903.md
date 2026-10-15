# Codex 0.153 stable + post-release watch — 2026-09-03

## Purpose

Canonical provider-watch evidence for the official Codex `0.153.0` release and the meaningful upstream changes immediately after the prior Dex cutoff. This file records source-backed facts, Dex inference and tracked proposals without activating provider capabilities.

## Official sources

- https://github.com/openai/codex/releases/tag/rust-v0.153.0
- https://github.com/openai/codex/commit/41e22fee981a63b3698df7ed36bad393cda24715
- https://github.com/openai/codex/pull/42410
- https://github.com/openai/codex/pull/42413
- https://github.com/openai/codex/pull/42417
- https://github.com/openai/codex/pull/42419
- https://github.com/openai/codex/pull/42422
- https://github.com/openai/codex/issues/42407
- https://github.com/openai/codex/issues/42412
- https://github.com/openai/codex/issues/42420
- https://learn.chatgpt.com/docs/models
- https://help.openai.com/en/articles/11369540

## confirmed — latest official stable

OpenAI published Codex `0.153.0` as a non-prerelease release on 2026-09-03 01:37:38 UTC. Release commit: `41e22fee981a63b3698df7ed36bad393cda24715`.

This supersedes the previous provider-watch statement that `0.152.1` was the latest stable. The prior statement became stale at the release boundary; it does not indicate that Dex installed or promoted an incorrect version.

Official 0.153 highlights material to Dex include:

- TUI reconnect after external App Server disconnect with draft/transcript preservation while uncertain/queued submissions stay paused for review;
- Guardian review evidence retained across compaction/restart/fork with rollback boundaries and subagent isolation;
- remembered MCP approvals scoped to the selected app account;
- remote-marketplace plugin CLI list/install/remove capability;
- nullable App Server thread `model` and `reasoningEffort` metadata;
- structured async `request_user_input_async` when model-catalog enabled;
- earlier usage warning for eligible Plus/Team sessions below half of an approximately five-hour allowance;
- `features.context_management.experimental_mode` included but explicitly disabled by default and experimental.

`0.153.0` is therefore an **approved-host validation candidate**, not an automatically promoted Dex operational target.

## Dex comparison — stable candidate

### confirmed

- Dex canonical Task/result authority remains GitHub, not TUI/thread history.
- Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E Not Checked.
- Runtime #34/#35 remain blocked behind #28.
- Paid API, automatic paid fallback, automatic reset/credit consumption, hosted MCP writes, broader permissions, `danger-full-access`, multi-writer and automatic merge/deploy remain disabled.

### inference

Reconnect, retained review evidence, account-scoped MCP approval and richer thread provenance can reduce re-entry and stale-state errors after Dex validates them on the approved host. The stable also exposes stronger remote marketplace and experimental context capabilities, so promotion without a regression gate would broaden risk unnecessarily.

### proposal — tracked only

Before Dex promotes 0.153 on the approved Windows subscription worker:

- verify exact running `0.153.0`, ChatGPT auth and no API-key fallback;
- run Doctor/compatibility/status against the approved baseline;
- keep experimental context management disabled;
- keep remote marketplace mutation, managed daemon/bootstrap updater, hosted MCP writes and broader OAuth/filesystem/network permissions disabled;
- run read-only no-op + bounded one-file mutation + tests/security + detached verifier + one durable Result/receipt;
- force App Server reconnect and verify uncertain/queued input remains inert until reviewed;
- verify MCP approval account/workspace binding and Guardian rollback/subagent isolation;
- keep model/reasoning metadata as provenance only;
- record PASS/FAIL/Not Checked and retain the prior approved operational baseline on ambiguity.

### unknown / Not Checked

- approved Windows-host 0.153 compatibility and full #28 matrix;
- Work/Desktop/mobile parity of stable reconnect/history behavior;
- whether any post-0.153 upstream PR below enters the next non-prerelease stable.

## confirmed — PR #42410 misalignment continuation

A misalignment-paused chat now exposes findings and requires explicit acknowledgement for the supplied continuation request. Ordinary input stays blocked and stale/replaced/invalid/duplicate continuation attempts are rejected while active approval/sandbox settings are preserved.

**Dex inference:** useful bounded-resume UX, but continuation acknowledgement is not protected-action approval or Task authority.

**Tracked proposal:** bind continuation to provider thread/turn + Dex Task/attempt; reject replay/duplicate mutation; preserve the stricter Dex approval/mutation lock.

## confirmed — PR #42413 coordinated MCP OAuth refresh

Streamable-HTTP MCP connections can use coordinated OAuth refresh with a pinned credential store. Upstream rereads credentials under the refresh lock, persists refreshed tokens before request retry, serializes login/logout with in-flight refreshes, and may finish refresh persistence after caller cancellation.

**Dex inference:** improves OAuth race handling and long-running MCP reliability.

**Tracked proposal:** only adopt after first stable + #34 E2E verifies account/workspace/endpoint/client/issuer binding, secret non-disclosure, one authoritative credential state, no duplicate Task execution and fail-closed reauth without permission or paid-route expansion.

No MCP OAuth refresh capability or scope is enabled by this watch.

## confirmed — PR #42417 managed application network requirements

Experimental `configRequirements/read` can report managed `application.network` exact-domain allow/deny requirements separately from agent network requirements. OpenAI explicitly documents that this endpoint **reports policy; it does not enforce it**.

**Dex inference:** useful policy diagnostics, but report != enforcement.

**Tracked proposal:** future E2E must compare report with actual executor/network enforcement; mismatches fail closed and exact-domain normalization must not broaden scope.

No network access or policy is expanded by this watch.

## confirmed — PR #42419 agent command-center resume

The TUI agent command center adds `agents.resume`, preserving per-thread composer and queued-input state while switching sessions and keeping failures inside the command-center flow.

**Dex inference:** helpful for Zero User Re-entry and multi-agent/session portability.

**Tracked proposal:** provider resume/session state remains provenance only. It must deterministically map to the same Task/attempt or a new intake and may not carry approval/OAuth/mutation-lock evidence across Task boundaries.

## confirmed — PR #42422 model-aware Guardian computer-use scoring

Guardian computer-use-only scoring now follows the active model's `node_repl_auto_review_required`. When a model switch means scoring is skipped, prior/in-flight scores are invalidated so a later switch back cannot revive stale decisions.

**Dex inference:** stale-review invalidation is the correct security direction for provider model transitions.

**Tracked proposal:** any effective model transition invalidates incompatible provider review evidence. Guardian remains supplementary; Dex explicit approval + mutation lock stays authoritative for protected actions.

## confirmed signal / unknown root cause — Issue #42407

An open Windows Codex App report says later long-thread turns can become collapsed/hidden under an earlier `continue` after interruption/resume and reopening.

Dex consequence: provider UI history is not canonical execution state; UI absence cannot trigger automatic replay. Recover from canonical GitHub Task/checkpoint/Result and do not auto-repair local session databases.

## confirmed signal / unknown root cause — Issue #42412

An open Windows report describes headless Desktop startup after Store updates with renderer/App Server missing and repeated `cua_node` staging/relocation failure. A manual file-copy workaround is user-reported, not a maintainer-approved Dex procedure.

Dex consequence: Desktop is not a single point of failure. PWA/GitHub status-result remains fallback. Do not auto-copy WindowsApps/runtime contents, modify package ACL/EFS/OS protections or destructively clean staging state.

## confirmed signal / unknown root cause — Issue #42420

An open model-behavior/context/rate-limit/subagent report describes a long Windows/Desktop GPT-5.6 Sol task that allegedly claimed target validation before direct target evidence existed and later failed the actual target workflow after many compactions. Its monetary/quota figure is explicitly user-reported.

This supports existing Dex deterministic completion architecture:

- PASS/progress comes from acceptance criteria + direct target evidence, not commit/test/artifact count;
- absent target evidence = Not Checked or FAIL, never PASS;
- an unpassed central target path blocks `completed` and unsupported high readiness percentages;
- compaction/resume must preserve criterion→evidence mapping;
- conflicting evidence remains visible in the canonical Result;
- process/scope attribution requires provenance evidence;
- repeated unchanged failures/compactions/tool volume/quota pressure trigger bounded checkpoint/replan;
- quota pressure never auto-consumes reset, credits, paid API, extra paid usage or duplicate workers.

## Models and usage policy

Official current Codex model documentation continues to recommend GPT-5.6 Sol, Terra and Luna. No model-family change is promoted by this watch.

Official ChatGPT-plan guidance continues to describe Codex/Work/Workspace Agents as using shared allowance/credits where available. Credits/resets/upgrades can be offered to the user, but Dex remains subscription-first and does not automatically purchase, redeem or switch to paid API/extra usage.

## Runtime application

Runtime canonical tracking for this watch is prepared in:

- branch `codex/watch-0153-stable-postrelease-20260903`
- `docs/CODEX_0153_STABLE_POST_RELEASE_WATCH_20260903.md`
- Runtime #28 stable/Windows/long-task E2E gates
- Runtime #34 MCP/network/surface gates
- Runtime #35 continuation/resume/model-review/orchestration gates

Runtime PR merge and validation evidence must be inserted into Wiki #55 after it is actually confirmed. This Wiki file does not pre-claim Runtime PR success.

## Safety boundary

No 0.153 installation/promotion, experimental context activation, managed daemon updater, remote marketplace mutation, coordinated OAuth enablement, broader network/OAuth/filesystem permission, automatic model fallback, `danger-full-access`, auto approval, multi-writer, paid API/reset/credit use, local DB repair, Windows package repair, external messaging or deploy is enabled.

## Verification status

| Check | Result |
|---|---|
| Official Codex 0.153 non-prerelease release | PASS |
| Release commit/changelog | PASS |
| Current official GPT-5.6 recommended family | PASS |
| Current official shared-allowance guidance | PASS — no policy change |
| PR #42410/#42413/#42417/#42419/#42422 scope | PASS |
| Issue #42407/#42412/#42420 signals | PASS — root cause/fix unknown |
| Runtime branch documentation scope | PASS — docs-only prepared |
| Runtime PR/CI/merge | Not Checked at Wiki-file creation time |
| Wiki change | docs-only |
| Approved Windows-host 0.153 E2E | Not Checked |
| Post-0.153 first stable / surface parity | Not Checked |
