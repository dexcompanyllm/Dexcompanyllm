# Codex Retained Answer / Guardian / Windows-WSL Resume Watch — 2026-09-03

- Classification: provider update evidence
- Runtime companion: `docs/CODEX_RETAINED_ANSWER_WSL_RESUME_WATCH_20260903.md`
- Runtime PR: #112
- Activation: watch-only

## Confirmed

1. OpenAI Codex PR #42290 was merged to upstream `main` on 2026-09-02 14:59:53 UTC.
   - Source: https://github.com/openai/codex/pull/42290
   - It expands App Server integration coverage for synchronous and asynchronous Guardian review through compaction, server restart/thread resume and rollback.
   - The tests verify compatible/incompatible checkpoint delivery, retained-evidence fallback, removal of rolled-back input/evidence and preservation of the original user restriction plus MCP tool output in compaction.
   - The upstream change is test hardening in one changed file; it is not by itself a new stable Dex capability.

2. OpenAI Codex PR #42293 was merged to upstream `main` on 2026-09-02 15:08:28 UTC.
   - Source: https://github.com/openai/codex/pull/42293
   - It adds bounded, model-invisible retained context for host-verified `request_user_input` answers.
   - Retained answers persist through rollout events and compaction checkpoints, restore on resume, are bounded/deduplicated, and are removed when their source turns are rolled back.
   - Parent-local retained answers are not inherited by child forks. The fork path also strips parent-local Guardian approval evidence.

3. OpenAI issues #42292 and #42211 are current Windows/WSL path-integrity signals.
   - Sources: https://github.com/openai/codex/issues/42292 and https://github.com/openai/codex/issues/42211
   - #42292 reports `/mnt/<drive>/...` cwd data being persisted into an invalid Windows-side thread-index path while rollout metadata remains correct, with native-Windows resume failure and successful WSL-side resume.
   - The reporter also observes SQLite WAL/shared-memory I/O failure when Windows-side `CODEX_HOME` state databases are accessed through WSL DrvFs. This is reporter evidence/inference, not a maintainer-confirmed root cause.
   - GitHub duplicate detection links #42292 to #42211, which independently reports incorrect Windows↔WSL workspace path conversion in Codex Desktop.
   - Root cause, affected range, supported repair and fixed stable remain unknown.

4. OpenAI issue #42295 reports Windows Desktop build `26.831.2377.0` starting without a usable window on one Windows 11 machine even after clean reinstall/state reset.
   - Source: https://github.com/openai/codex/issues/42295
   - This is an official-repository signal with unknown prevalence/root cause, not evidence of a product-wide outage.

5. Latest official non-prerelease Codex remains `0.152.1`. Official model documentation continues to recommend GPT-5.6 Sol / Terra / Luna. No new official pricing or usage-limit policy change was identified in this cutoff that requires changing Dex subscription-first policy.
   - Release: https://github.com/openai/codex/releases/tag/rust-v0.152.1
   - Models: https://learn.chatgpt.com/docs/models
   - Usage: https://help.openai.com/en/articles/11369540

## Dex comparison

- `confirmed`: approved Wiki `main`, GitHub Task Bus and durable canonical Result/receipt remain authoritative. Provider-retained answers, Guardian history, Desktop renderer state, local thread indexes and WSL path state are not canonical authority.
- `confirmed`: Runtime #28 remains open with approved Windows-host E2E Not Checked. Runtime #35 remains gated behind #28.
- `confirmed`: current Dex approved-host design does not require WSL execution mode.
- `confirmed`: paid API/automatic fallback, automatic extra usage, broader permissions, `danger-full-access`, multi-writer, automatic deploy/merge and destructive state migration remain disabled.

## Inference

- #42293 can reduce Zero User Re-entry after compaction/resume because verified answers can survive outside the model history window.
- The security-relevant part is equally important: rollback can revoke retained answers and child forks do not inherit parent-local answers/approval evidence. This aligns with Dex's Task/attempt-scoped authorization model.
- #42290 increases confidence in the intended Guardian evidence lifecycle but should not change Dex policy because its upstream change is test-only.
- #42292/#42211 justify keeping Windows Native as the approved worker path and treating WSL execution/resume as Not Checked until a stable fix plus explicit host E2E exists.
- #42295 reinforces the existing architecture in which Desktop UI is a convenience surface, not a single point of failure; PWA/GitHub Task Bus and direct CLI/App Server execution remain independent fallbacks.

## Proposal / tracked gates

Runtime #35 future-stable/approved-host evidence should require:

- retained answers bound to the exact provider question/thread plus canonical Dex Task ID, `attemptId`, account/workspace/project provenance;
- duplicate, replayed, delayed or cross-thread answers cannot satisfy another question/newer attempt;
- compaction/resume preserves only bounded owning-thread answers;
- source-turn rollback revokes the retained answer before any later mutation;
- child forks inherit neither parent-local retained answers nor parent-local approval evidence;
- retained factual/parameter answers cannot broaden destructive/publication/permission/billing/external-side-effect approval;
- provider retention failure cannot create duplicate workers, stale approval reuse or a newer canonical Result overwrite;
- deterministic Watchdog and independent Dex verifier remain completion authorities.

Runtime #28 future Windows/WSL evidence should require:

- keep Windows Native as the current approved worker path; no automatic WSL switch;
- if WSL is later proposed, canonical project realpath/digest and provider cwd must agree after translation;
- invalid `/mnt/<drive>`→Windows mappings or rollout/index cwd disagreement fail closed with zero mutation/publication;
- `CODEX_HOME` state is not trusted through an unsafe locking/WAL filesystem mode;
- misleading provider/config errors cannot trigger automatic config/model/permission changes;
- no SQLite/thread-index repair, rewrite or migration is performed without a separate reviewed repair plan and evidence.

## PASS / FAIL / Not Checked

| Check | Result |
|---|---|
| PR #42290 merge/scope and test-hardening semantics verified | PASS |
| PR #42293 merge/scope and retained-answer lifecycle verified | PASS |
| #42292/#42211 Windows/WSL report scope verified | PASS |
| #42295 Windows Desktop report scope verified | PASS |
| Latest official non-prerelease release checked | PASS — `0.152.1` |
| Official recommended model family checked | PASS — GPT-5.6 Sol / Terra / Luna |
| Current Dex #28/#35 boundaries compared against approved mains | PASS |
| Operational capability, permission, WSL mode, billing or plugin mutation enabled | PASS — none |
| First stable containing #42290/#42293 | Not Checked |
| Approved-host retained-answer compaction/resume/rollback/fork E2E | Not Checked |
| #42292/#42211 maintainer-confirmed root cause/fix | Not Checked |
| Approved Windows-host WSL path/index/database E2E | Not Checked |
| #42295 maintainer-confirmed root cause/fix/prevalence | Not Checked |
| FAIL | none |

## Safety boundary

No prerelease/experimental enablement, automatic Codex upgrade, WSL environment switch, SQLite repair/migration, broader OAuth/filesystem/network/MCP permission, automatic approval, plugin/Skill auto-mutation, paid API/fallback/extra usage/reset redemption, multi-writer, automatic deploy/merge, destructive migration or external messaging is authorized by this evidence.
