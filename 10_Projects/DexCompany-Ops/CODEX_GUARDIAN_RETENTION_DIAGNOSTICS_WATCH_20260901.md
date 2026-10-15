# Codex Guardian retention parity and diagnostic-report watch — 2026-09-01

## Scope

This canonical evidence records meaningful OpenAI Codex changes merged after the prior Dex watch cutoff and the corresponding low-risk Dex response. It does not enable prerelease features, diagnostic upload, paid API/fallback, broader permissions, plugin auto-change, Browser/Computer Use, Voice/Realtime, external messaging, or legacy Skill/Plugin deletion.

## Official sources

- Codex changelog: https://developers.openai.com/codex/changelog
- Codex 0.152.0 release: https://github.com/openai/codex/releases/tag/rust-v0.152.0
- OpenAI PR #41931: https://github.com/openai/codex/pull/41931
- OpenAI PR #42031: https://github.com/openai/codex/pull/42031
- OpenAI PR #42033: https://github.com/openai/codex/pull/42033

## confirmed

### Codex 0.152.0 Guardian budget correction

OpenAI's official 0.152.0 changelog confirms that automatic approval reviews retain longer messages and a larger conversation transcript. PR #41931 is therefore in the 0.152 stable code line, not merely future-stable evidence.

The tracked limits are:
- user-message transcript: 20,000 tokens
- per-user-message entry: 5,000 tokens
- tool transcript: 10,000 tokens
- ordinary tool entry: 1,000 tokens
- Node REPL result: 6,000 tokens

Stable inclusion does not make the behavior an approved-host Dex dependency. The approved Windows host still requires the existing 0.152 Guardian regression gate.

### OpenAI PR #42031 — shared Guardian user-message retention

Merge: `82099786163f3c05facf09078136679e18b64279`, 2026-09-01 10:42:22 UTC.

- Core Guardian prompt rendering and Guardian V2 async scoring now use the same `select_user_messages` helper.
- The first genuine user message remains anchored even when it alone exceeds the message budget.
- Remaining messages are considered newest-to-oldest while the total fits the configured budget.
- Tests cover empty/single transcripts, over-budget anchors, and multiple token budgets.
- This helper is absent from the `rust-v0.152.0` release tree, so #42031 is post-0.152 upstream-main evidence, not a 0.152 stable contract.

### OpenAI PR #42033 — richer bounded Guardian diagnostics

Merge: `2e5ee418ad6bef8b418ba1a809cfa53a56ae4aee`, 2026-09-01 11:16:40 UTC.

For log-enabled `feedback/upload`:
- the reported thread is always preserved in bounded rollout selection;
- descendants with retained failed Guardian reviews are prioritized before newest-child fallback;
- at most 8 rollout threads are selected;
- each selected thread's available Guardian trunk rollout can be attached alongside the conversation rollout;
- `feedback-thread-index.json` records selected filenames, retained-failure thread IDs, omission metadata, and the process-wide discarded-review-record count;
- failed-review records can link to the reviewed turn and target item;
- selection metadata is not proof of successful upload delivery, and missing process-local evidence does not prove no denial occurred.

The new feedback-thread-index implementation is absent from the `rust-v0.152.0` release tree, so #42033 is also post-0.152 upstream-main evidence.

### Stable/model/pricing status

- Latest official non-prerelease Codex CLI remains `0.152.0`.
- `0.153.0-alpha.*` is prerelease and is not Dex activation evidence.
- No new Codex model, subscription pricing, or usage-limit change requiring a Dex policy change was identified after the prior watch cutoff.

## inference

- #42031 should reduce Guardian decision drift caused by core and async review paths selecting different user-message subsets under token pressure. This is beneficial for long-running, instruction-dense, approval-sensitive work and should lower review/reproduction rework.
- #42033 should improve diagnosis of deny/invalid review failures, but it broadens the diagnostic data-egress surface from failed-review JSONL to conversation rollouts, Guardian rollouts, and thread-index metadata. The security gate must therefore cover the complete attachment bundle.

## proposal applied

Runtime `main` already contains the bounded response via PR #65:
- Runtime PR #65 merge: `2edcd406e50b5be42206de10230c4753f3ae96f3`
- branch Runtime validation run `33504049198`: PASS
- branch Vercel: PASS
- merge-commit Vercel: PASS
- changed Runtime files: watch/tracking documentation only; no runtime behavior activation

Runtime Issue #25 was updated to preserve a single tracking authority with these future gates:
- future stable containing #42031: core/V2 retention parity, first-message anchor, newest-first fill, rollback/reset/new-user invalidation, latency/token impact, and Runtime #28 long-task regression;
- future stable containing #42033: explicit user-initiated egress only, with pre-upload secret/sensitive-context review across all selected conversation rollouts, Guardian rollouts, `auto-review-failures.jsonl`, and `feedback-thread-index.json`;
- absence of process-local diagnostic evidence is never security proof.

## unknown / Not Checked

- Which future stable first includes #42031 and #42033: unknown.
- Approved Windows-host 0.152 Guardian E2E: Not Checked.
- Final stable/public consent, upload-preview, retention and telemetry contract for the expanded diagnostic bundle: Not Checked.

## Canonical state note

Current Runtime `main` for this evidence is `2edcd406e50b5be42206de10230c4753f3ae96f3`.

Root `CURRENT_STATE.md`, `10_Projects/DexCompany-Ops/CURRENT.md`, and `PROJECT_CONFIG.md` contain older point-in-time Runtime pointers in their current sections. This drift is already tracked by Wiki Issue #55 and must be reconciled without deleting historical sections or unrelated user changes. Until that targeted cleanup is merged, this evidence plus Runtime `main` is the current provider-watch proof; the stale pointer text must not be used to roll Runtime backward.

## PASS / FAIL / Not Checked

- Official Codex changelog and 0.152 stable classification: PASS
- PR #42031 official PR/patch review: PASS
- PR #42033 official PR/patch review: PASS
- Post-0.152 classification for #42031/#42033: PASS
- Runtime current-main comparison and PR #65 scope check: PASS
- Runtime PR #65 branch CI/security: PASS
- Runtime behavior activation: intentionally unchanged
- FAIL: none identified
- Approved Windows-host E2E: Not Checked
- Future stable inclusion: unknown
