# Codex Steer-Rollback Retained Answer / Remote Parity Watch — 2026-09-03

- Classification: provider update evidence
- Runtime companion: `docs/CODEX_STEER_RETAINED_ANSWER_REMOTE_PARITY_WATCH_20260903.md`
- Runtime PR: #113
- Activation: watch-only

## Confirmed

1. OpenAI Codex PR #42298 was merged to upstream `main` on 2026-09-02 15:47:52 UTC.
   - Source: https://github.com/openai/codex/pull/42298
   - Merge SHA: `8e3b180d49951c3e53140710b2baad09791cc999`.
   - A steer creates a new instruction boundary without creating a new turn ID. The change associates retained `request_user_input` answers with their originating function call/instruction boundary rather than treating the shared turn ID as sufficient rollback identity.
   - When only a later steer is rolled back, an earlier answer from the same turn survives if its source call survives; answers sourced from the rolled-back instruction are removed.
   - Tests cover live rollback/resume, compaction, rollout migration and delayed answers that share a turn ID but originate from different calls.
   - No unresolved review threads were observed for the merged PR during this watch.

2. OpenAI Codex issue #42301 is a current Android Remote ↔ Windows reasoning-effort parity signal.
   - Source: https://github.com/openai/codex/issues/42301
   - The report describes ChatGPT Android `1.2026.237` selecting the highest visible reasoning mode for GPT-5.6 Sol while the connected Windows Desktop can display `Medium`.
   - The report does not establish whether this is UI representation, normalization/mapping or an actual effective-effort downgrade. Root cause and fixed release remain unknown.

3. OpenAI Codex issue #42302 is a current Windows Desktop right-panel action/rendering signal.
   - Source: https://github.com/openai/codex/issues/42302
   - A Windows Desktop `26.831.2377.0` user reports local PDF/PNG and HTTPS right-panel actions remaining queued with blank content across restart/update and a forked task.
   - Root cause, prevalence and fixed release remain unknown.

4. Latest official non-prerelease Codex remains `0.152.1`.
   - Release: https://github.com/openai/codex/releases/tag/rust-v0.152.1
   - No new official model migration, pricing change or usage-limit policy change identified in this cutoff requires changing Dex subscription-first policy.

## Dex comparison

- `confirmed`: approved Wiki `main` remains the knowledge/policy/state authority, while Runtime code belongs to the approved Runtime `main`.
- `confirmed`: Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E Not Checked; #34 and #35 remain gated behind #28.
- `confirmed`: GitHub Task Bus, Task ID/`attemptId`, explicit approval scope, mutation lock, durable Result/receipt and independent verification remain higher authority than provider-retained answers, provider thread state, mobile/desktop selectors or Desktop UI queues.
- `confirmed`: prerelease/experimental capabilities, paid API/automatic fallback, broader permissions, `danger-full-access`, multi-writer, automatic merge/deploy, plugin/Skill auto-mutation and destructive migration remain disabled.

## Inference

- #42298 improves Zero User Re-entry by preserving a still-valid earlier answer when a later steer in the same running turn is rolled back, while still revoking answers that belong to the rolled-back instruction.
- The prior #42293 watch wording was over-broad where it described source-turn rollback as the revocation boundary. The more precise future gate is exact source call/instruction boundary.
- #42301 shows that controller UI labels cannot be treated as proof of the reasoning effort actually accepted or used by a connected Windows host.
- #42302 reinforces the existing Dex design in which Desktop presentation/action queues are convenience surfaces rather than canonical Task/artifact/result state.

## Proposal / tracked gates

Runtime #35 future stable/approved-host evidence should require:

- retained answer identity includes provider thread, turn ID, exact call ID/instruction boundary and canonical Dex Task ID/`attemptId`/account/workspace/project provenance;
- two `request_user_input` calls separated by a steer but sharing one turn ID remain distinguishable;
- rollback of only the newer steer removes only the newer-source answer while preserving an earlier surviving-source answer;
- rollback past the earlier source removes that answer before later mutation can consume it;
- delayed/duplicate/replayed/cross-thread answers cannot satisfy another call/instruction/Task/attempt;
- compaction → restart/resume → rollout migration preserves the same source-call ownership;
- child forks inherit neither parent-local retained answers nor parent-local approval evidence;
- retained answers never broaden destructive/publication/permission/billing/external-side-effect approval.

Runtime #34 future Remote/Work evidence should require:

- requested controller reasoning, normalized/mapped host value and effective per-turn runtime evidence are recorded separately when available;
- disagreement or unverifiable effective effort is `unknown`/`Not Checked`, not silent PASS;
- UI labels do not authorize model/reasoning/provider/permission/cost changes;
- no automatic model upgrade/downgrade, paid fallback or permission expansion is used to hide a parity mismatch;
- Remote handoff/reconnect preserves the same canonical Task ID, `attemptId`, approval and Result identity;
- Windows Desktop right-panel presentation failure cannot corrupt or replace canonical Task/artifact/result state.

## PASS / FAIL / Not Checked

| Check | Result |
|---|---|
| PR #42298 merge/body/diff verified | PASS |
| PR #42298 unresolved review-thread check | PASS — none observed |
| #42301 official issue scope/labels verified | PASS |
| #42302 official issue scope/labels verified | PASS |
| Latest official non-prerelease Codex release checked | PASS — `0.152.1` |
| Current approved Dex Wiki/Runtime mains and #34/#35 gates compared | PASS |
| Operational capability, permissions, reasoning defaults, billing or plugin state enabled | PASS — none |
| First stable containing #42298 | Not Checked |
| Approved-host steer/rollback/compaction/resume/migration retained-answer E2E | Not Checked |
| #42301 maintainer-confirmed root cause/fix and effective reasoning parity | Not Checked |
| #42302 maintainer-confirmed root cause/fix and Windows right-panel E2E | Not Checked |
| FAIL | none |

## Safety boundary

No prerelease/experimental enablement, automatic Codex upgrade, model/reasoning default mutation, broader OAuth/filesystem/network/MCP permission, automatic approval, paid API/fallback/extra usage/reset redemption, plugin/Skill automatic install/update/delete, multi-writer, automatic deployment/merge, destructive migration or external messaging is authorized by this evidence.
