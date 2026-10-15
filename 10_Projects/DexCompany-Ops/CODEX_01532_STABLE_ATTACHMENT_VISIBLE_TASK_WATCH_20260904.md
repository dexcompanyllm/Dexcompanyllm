# Codex 0.153.2 Stable / Attachment Store / Visible-Task Routing Watch — 2026-09-04

- Verification scope: official OpenAI/Codex sources plus current approved Dex Runtime/Wiki `main`
- Cutoff: 2026-09-04 09:08 Asia/Seoul
- Previous permitted cutoff: 2026-09-04 08:09 Asia/Seoul
- Quiet window: no Dex Company search/monitoring from 23:00 through 05:59 Asia/Seoul; the prior 06:00 catch-up already reconciled that backlog. All findings below occurred after 08:09.

## Source-backed facts

### Codex CLI 0.153.2 is published stable

OpenAI GitHub release metadata now shows `rust-v0.153.2` / `0.153.2` with `draft:false`, `prerelease:false`, published at `2026-09-03T23:53:12Z` = 2026-09-04 08:53:12 Asia/Seoul.

Official source: https://github.com/openai/codex/releases/tag/rust-v0.153.2

At this cutoff, the official ChatGPT & Codex changelog page still ends its CLI release section at 0.153.1 and has not yet published a separate 0.153.2 entry. Previously verified OpenAI PR #42632 targets the 0.153.2 patch and changes the GPT-6 Astra Fast catalog description from `1.5x speed, increased usage` to `2x speed, increased usage`; the PR explicitly states that the wording change does not change request execution and does not guarantee an exact speedup.

Sources:
- https://developers.openai.com/codex/changelog
- https://github.com/openai/codex/pull/42632

### OpenAI Codex PR #42634 — injectable attachment store

PR #42634 merged to upstream `main` at 2026-09-04 08:23:13 Asia/Seoul as `03467026f2426fafd3d33bbdfc78ec5f9d79f6f0`.

Confirmed scope:
- new `codex-attachment-store` crate with storage-neutral attachment metadata/references/errors and async persistence interface;
- inline implementation keeps attachment bytes as media-typed base64 data URLs;
- store injection into `ThreadManager` with inline storage remaining the default for current entry points;
- round-trip tests for binary/text/PNG/JPEG;
- attachment Debug output test that redacts URLs while preserving file IDs.

Official source: https://github.com/openai/codex/pull/42634

### OpenAI Codex issue #42637 — Windows visible-task orchestration regression signal

Issue #42637 was created at 2026-09-04 08:59:26 Asia/Seoul for ChatGPT Desktop powered by Codex & OWL `26.901.22334` on Windows 11 x64.

The reporter says a repository-authored workflow explicitly requiring separate visible Codex tasks through `codex_app.create_thread` stopped after the Desktop update because the session treated a developer-level routing rule as preferring internal multi-agent/subagent tools for generic subtasks. Native task tools were available. The workflow resumed only after the user sent another top-level message explicitly restating that the slices were separate visible tasks/conversations.

This is issue-report evidence only. Maintainer-confirmed root cause, product contract, general reproduction and fix are not established.

Official source: https://github.com/openai/codex/issues/42637

## Current Dex canonical comparison

At branch start:

- Wiki approved `main`: `95b663f145b3e5fbd42dfd48f4feaeca4bfd7491` — Wiki PR #153.
- Runtime approved `main`: `9da021c3db15ef021326cb96905867b40b9bf130` — Runtime PR #175.
- GitHub Task Bus remains the canonical Task authority.
- Provider-native chat/thread/task IDs remain execution references, not canonical Task state.
- Canonical orchestration remains `One Task ID / One Accountable Lead / Capability-Routed Workers / Risk-Based Independent Verification / One Canonical Result / Zero User Re-entry`.
- Runtime #28 remains OPEN: Phase 3 implementation merged; approved Windows-host E2E Not Checked.
- #34 Work/mobile plugin and #35 multi-worker expansion remain blocked until #28 PASS.
- Work file ingest remains disabled pending its independent MIME/size/malware/retention/account-workspace/redaction/integrity gates.
- Subscription-first remains mandatory; paid API, automatic paid fallback, extra paid usage and automatic credit/reset consumption remain disabled.

## Dex inference

- `0.153.2` should supersede `0.153.1` as the next official stable validation candidate, but should not automatically become the approved/recommended installed target without the existing approved Windows-host validation matrix.
- #42634 is directionally useful for future attachment portability and leakage reduction because persistence is abstracted and debug URL redaction has regression coverage. It is not proof of a durable external store, malware safety, cross-device retention semantics or Dex Work-file readiness.
- #42637 supports Dex's provider-independent authority model: provider-native routing defaults may change, so whether a work unit must be separately visible/reviewable/evidenced must remain in Dex Task/worker-plan acceptance data rather than being delegated implicitly to a provider session default.
- A provider refusing the requested visible-task primitive should fail closed or use an already-approved Dex/PWA/GitHub fallback when acceptance criteria permit. It must not silently substitute a hidden subagent when separate visibility is part of the requirement.

## Proposal / tracked gates

### Runtime #25 — stable 0.153.2 candidate

Before recommended-target promotion:

- verify official installed `0.153.2` on the approved Windows host;
- `codex doctor -> codex compatibility -> codex status` PASS under the approved profile;
- authenticated `model/list` captured and compared rather than trusting bundled/remembered model names;
- bounded no-op/read-only canary PASS before mutation canary;
- one-writer, approval, sandbox, subscription-first and secret-scan boundaries remain unchanged;
- Astra/Fast or other optional capabilities are not auto-enabled from release metadata.

### Runtime #34 — attachment/file-ingest gate

Before attachment ingestion is enabled:

- stable artifact/file ID and explicit persisted/ready state;
- URL/token/credential redaction from debug output, receipts and canonical evidence;
- MIME/extension/size/hash/integrity and malware boundary;
- retention/deletion policy and account/workspace/project binding;
- copy/upload success is not treated as persistence readiness;
- ambiguous persistence => mutation 0 and original artifact preserved;
- cross-host retrieval maps to one canonical artifact reference;
- no automatic provider registry/database/cache surgery.

### Runtime #35 — visible task vs internal subagent routing

Before multi-worker expansion:

- worker plan records whether a child work unit requires a separate user-visible provider task or may be an internal subagent when that distinction affects reviewability, navigation or reuse;
- provider-native routing cannot override canonical Task ID, attempt identity, mutation lock or acceptance criteria;
- explicit separate-visible-task requirements are never silently downgraded to hidden subagents;
- provider routing conflicts preserve the canonical Task and produce a bounded blocked/surface-constraint state or approved fallback instead of duplicate execution;
- user requirement re-entry stays zero unless a provider requires an unavoidable fresh direct action that no approved fallback can satisfy;
- duplicate canonical Task, writer, mutation and Result remain zero across retry/fallback;
- #35 remains disabled until #28 PASS.

## Classification

- `confirmed`: 0.153.2 is an official non-prerelease GitHub release.
- `confirmed`: #42634 merged to upstream `main` with the attachment-store abstraction and URL-redaction tests described above.
- `confirmed`: #42637 exists as an open Windows Desktop issue report with the stated version/platform/workaround.
- `confirmed`: no new general OpenAI pricing/usage-limit or model-default policy requiring a Dex cost/routing change was found after the previous permitted cutoff.
- `inference`: 0.153.2 is the next stable validation candidate; attachment abstraction and explicit task-presentation semantics are favorable Dex hardening targets.
- `proposal`: update Runtime #25/#34/#35 tracking and preserve all capability activation blocks until stable/approved-host E2E passes.
- `unknown`: complete official 0.153.2 changelog text beyond current release metadata and prior #42632 evidence; approved-host 0.153.2 behavior; first stable containing #42634; #42637 maintainer-confirmed root cause/fix and applicability to the approved host.

## Validation

- PASS: official 0.153.2 release metadata verified.
- PASS: #42634 merged PR scope/tests verified.
- PASS: #42637 issue evidence verified and explicitly bounded as reporter evidence.
- PASS: current approved Runtime/Wiki heads and canonical authority/cost/safety boundaries re-read before the change.
- FAIL: none introduced by this evidence note.
- Not Checked: approved Windows-host 0.153.2 E2E; Astra account/model-list/tier behavior; first stable containing #42634; #42637 maintainer resolution/general reproduction; Wiki automated CI.

## Safety boundary

No capability is enabled by this note. It does not authorize prerelease/experimental activation, Astra/Fast auto-selection, API keys, paid API, automatic paid fallback, extra paid usage, credit/reset consumption, broader permissions, file ingest, Remote/Voice/Browser/Computer Use, external messaging, provider database/cache surgery, destructive migration, legacy Skill/Plugin deletion, duplicate workers or automatic deployment.
