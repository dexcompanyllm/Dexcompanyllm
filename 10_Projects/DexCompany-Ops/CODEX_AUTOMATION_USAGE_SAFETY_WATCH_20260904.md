# Codex Automation Usage / Safety Watch — 2026-09-04

## Source cutoff

- Previous canonical provider-watch mirror: Wiki PR #163 / Runtime PR #185, covering official Codex signals through approximately 17:16 Asia/Seoul.
- This supplemental mirror covers meaningful official OpenAI/Codex signals observed after that cutoff through approximately 18:00 Asia/Seoul.
- The 23:00–05:59 Asia/Seoul quiet-window backlog was already reconciled by the earlier 06:00 catch-up.
- Classification: source-backed provider-watch evidence. No Dex capability activation is authorized by this note.

## Confirmed official signals

### OpenAI Codex Issue #42700 — safety termination after local work

Official source: https://github.com/openai/codex/issues/42700

Opened 2026-09-04 17:19:23 Asia/Seoul. The reporter describes 13 `cyber_policy` terminations during benign local-only TDD/review workflows in Codex Desktop. The report says a termination can occur after local work and can prevent delivery of the final assistant response.

- `confirmed`: official-repository reporter signal and metadata.
- `inference`: safety/policy termination must be preserved as a distinct terminal provider outcome. Recovery begins from canonical Task/attempt state and durable receipts, not blind replay.
- `proposal`: reconcile already-performed mutation postconditions before any retry/failover/new attempt; never change wording/model/provider/permissions for the purpose of bypassing a safety decision.
- `unknown`: maintainer-confirmed cause/fix and approved-host reproduction.

Runtime #35 already records the corresponding fail-closed recovery semantics. This does not weaken OpenAI safety controls.

### OpenAI Codex Issue #42702 — scheduled automation context replay / usage spike

Official source: https://github.com/openai/codex/issues/42702

Opened 2026-09-04 17:22:43 Asia/Seoul. Reporter environment: Codex Desktop 26.901.22334, embedded CLI `0.153.0`, Windows, paid ChatGPT plan. A small scheduled heartbeat attached to an older thread reportedly made 8 model rounds in about 54 seconds, repeatedly carrying roughly 128K–146K input context and reaching 1,082,471 cumulative tokens. Most input was reported as cached/replayed historical/tool context; the run used Browser/Computer Use.

- `confirmed`: official-repository reporter signal, labels, environment, and reported usage/context observations.
- `inference`: a long-lived provider thread is a shared-allowance cost-risk surface. Scheduled work should not depend on arbitrary historical transcript replay for canonical authority.
- `proposal`: future scheduled-work readiness should use a bounded canonical Task envelope, observe repeated no-progress context replay, stop/degrade on anomalous cost growth, preserve durable checkpoints, and keep paid escape hatches prohibited.
- `unknown`: maintainer-confirmed root cause/fix, exact backend accounting semantics, platform scope, and approved-host reproduction.

Future stable + approved-host acceptance tracked in Runtime #30:

1. Small scheduled checks regain authority from bounded canonical Task state rather than arbitrary full provider-thread history.
2. Useful progress versus repeated replay/model-tool rounds is observable without exposing private content.
3. Repeated no-progress context/tool cycles stop or enter `degraded/cost-risk` rather than consuming allowance indefinitely.
4. Large Browser/Computer Use/tool results are bounded/summarized for subsequent rounds where supported.
5. An old/high-context-thread heartbeat E2E verifies proportionate model/context growth, at-most-once mutation, canonical continuity, and durable Result/receipt.
6. Conflicting/unknown usage surfaces preserve the Task and avoid duplicate/high-cost launches.
7. No automatic API key, paid API/fallback, extra paid usage, credit purchase, plan upgrade, banked reset, or permission expansion.

Reporter-local model/compaction changes are not treated as an OpenAI-supported fix and are not applied by Dex. Browser/Computer Use remains disabled/not checked.

## Screened signals

- #42701: sparse Voice failure report; insufficient verified scope for a new Dex Gate. Voice remains disabled/not checked.
- #42704: unexpected recap language change; continuity/presentation defect only for this batch.
- #42691: request for GPT-5.6 Sol Pro selection; feature request, not availability/default-model evidence.

## Stable / models / usage policy

- Latest official non-prerelease Codex release remains `0.153.2`.
- The official Codex changelog still lists 2026-09-03 `0.153.2` as the latest CLI release; its Astra Fast change is display text only and does not change request execution.
- No new default-model promotion or newly dated general pricing/usage-limit policy change requiring a Dex policy change was identified in this interval.
- OpenAI's current plan guidance says Codex, ChatGPT Work, ChatGPT for Excel, and Workspace Agents use a shared allowance/credit pool when those features are available, and usage varies with model, execution location, complexity, context, reasoning, speed, and tools.
- Subscription-first remains mandatory; API keys, paid API, automatic paid fallback, automatic extra paid usage, credit purchase, plan upgrade, and automatic banked-reset use remain disabled.

Official release: https://github.com/openai/codex/releases/tag/rust-v0.153.2
Official changelog: https://developers.openai.com/codex/changelog
Official plan guidance: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Dex canonical state and implementation result

Current approved heads before this Wiki mirror:

- Runtime `main`: PR #185 / `c3e6acf76722feebca0bf9c5efe30b09e552c1a1`.
- Wiki `main`: PR #163 / `06534f9898d8abaa5faf3d91bbc92d7bbc80723a`.
- #28 remains OPEN with approved Windows-host Phase 3 E2E `Not Checked`; #34/#35 remain blocked until #28 PASS.

Runtime PR #186 was prepared as a one-file documentation/tracking batch for #42700/#42702 but is **not merged**:

- Runtime validation `33855153338` attempt 1: install PASS; static/unit/smoke PASS; production dependency audit FAIL after 5 minutes.
- Attempt 2 (the maximum allowed retry): install PASS; static/unit/smoke PASS; production dependency audit FAIL again after 5 minutes.
- Runtime branch Vercel: PASS.
- npm public status reported a Partial System Outage during validation, making an external registry/audit dependency problem plausible, but the exact CI failure cause is not proven from available step metadata.
- No third same-method retry was performed. Fail-closed policy therefore keeps Runtime PR #186 open/unmerged and Runtime `main` at PR #185.

Runtime #30 has a source-backed #42702 tracking comment and validation follow-up. Runtime #35 already has the #42700 safety-termination recovery comment.

Existing aggregate current-state/QA/handoff pointer drift remains governed separately by Wiki #55; this source-only mirror does not rewrite aggregate files because no operational Gate transitioned.

## PASS / FAIL / Not Checked

- PASS: #42700/#42702 official source verification.
- PASS: latest official non-prerelease Codex remains `0.153.2`.
- PASS: Runtime #30/#35 tracking semantics preserve fail-closed, subscription-first, one-writer/canonical Task boundaries.
- PASS: Runtime PR #186 install and static/unit/smoke checks in both attempts; branch Vercel PASS.
- FAIL: Runtime PR #186 production dependency audit in both allowed attempts; PR remains unmerged.
- Not Checked: maintainer-confirmed fixes, first stable containing fixes, approved-host scheduled-work cost E2E, approved-host safety-termination recovery E2E, Browser/Computer Use readiness, and Wiki automated CI.

## Safety boundary

This note does not authorize prerelease/experimental activation, Browser/Computer Use, Voice, Remote Control, model/service-tier changes, broader permissions, API keys, paid API/fallback, extra paid usage, credit purchase, plan upgrade, banked resets, safety-control bypass, duplicate writers, external messaging, destructive migration, vendor package surgery, or legacy Skill/Plugin deletion.
