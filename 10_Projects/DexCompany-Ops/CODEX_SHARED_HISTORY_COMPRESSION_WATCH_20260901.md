# Codex shared-history rollout compression watch — 2026-09-01

## Scope

This canonical evidence records OpenAI Codex PR #42039, merged after the prior Dex provider-watch cutoff, and the corresponding low-risk Dex response. It does not enable prerelease or under-development capabilities, paid API/fallback, broader permissions, destructive migration, plugin auto-change, Browser/Computer Use, Voice/Realtime, external messaging, or legacy Skill/Plugin deletion.

## Official sources

- Codex changelog: https://developers.openai.com/codex/changelog
- Codex 0.152.0 release: https://github.com/openai/codex/releases/tag/rust-v0.152.0
- OpenAI PR #42039: https://github.com/openai/codex/pull/42039

## confirmed

### OpenAI PR #42039 — shared/forked rollout compression behavior is unified

Merge: `9d0eae74cd3d543c40dcdfa4e4007b43445e6543`, 2026-09-01 12:25:40 UTC.

- `local_thread_store_compression` now compresses cold rollout files across shared and forked histories without a separate compression mode.
- `local_thread_store_shared_compression` is retired as a behavior switch. Strict configuration still accepts the legacy key for compatibility, but it no longer changes compression behavior.
- `codex exec resume` reads rollout history through the compressed-rollout reader when resolving the latest turn working directory.
- Upstream tests cover compression/restoration of an archived fork chain and cwd-based resume selection when only the compressed rollout remains.

### Stable / maturity boundary

- Latest official non-prerelease Codex CLI remains `0.152.0`.
- The `rust-v0.152.0` release tree has both `local_thread_store_compression` and `local_thread_store_shared_compression` as `Stage::UnderDevelopment`, both default-disabled.
- At the #42039 merge tree, `local_thread_store_compression` remains `Stage::UnderDevelopment` / default false; only the legacy shared-compression flag becomes `Stage::Removed`.
- Therefore #42039 is post-0.152 upstream-main evidence and not an approved stable Dex dependency.

## inference

- #42039 should improve recovery consistency for future capability-routed reader/verifier sessions that fork or share Codex local history and later resume after cold-history compression.
- This can reduce recovery/rework for long-running or forked execution, but local Codex rollout history still must not replace Dex GitHub Task state, `attemptId`, canonical Result/receipt, mutation locks, or verifier evidence.
- Because enabling compression changes on-disk representation, every reader sharing the same `CODEX_HOME` must understand compressed shared histories. Dex's profile-local `CODEX_HOME` isolation therefore remains an important safety boundary.

## proposal applied

Runtime PR #66 applied only a watch/tracking response:
- Runtime PR #66 merge: `0685415f9406b7a8139448d3d80e654087a65710`
- branch Runtime validation run `33507879749`: PASS
- branch Vercel: PASS
- changed Runtime files: 1 watch document only; no runtime behavior activation

Runtime Issues #28 and #35 were updated with future stable/approved-host gates. Before any Dex activation of shared-history compression, the gate requires:
- stable inclusion and generated feature/schema confirmation;
- plain↔compressed resume parity;
- archived fork-chain restoration;
- `codex exec resume --last` cwd selection with only compressed rollout remaining;
- crash/restart behavior that does not duplicate execution or produce stale resume;
- prevention of mixed-version workers sharing one `CODEX_HOME`;
- unchanged canonical GitHub Task/Result state and verifier authority;
- measured storage/recovery benefit before activation is proposed.

The legacy `local_thread_store_shared_compression` key is compatibility-only and must not be added to Dex managed configuration.

## unknown / Not Checked

- Which future stable first contains #42039: unknown.
- Final stable/public support contract for shared-history compression: unknown.
- Approved Windows-host compressed shared-history E2E: Not Checked.
- Measurable Dex storage/recovery benefit after stabilization: Not Checked.

## Canonical state note

Runtime `main` for this evidence is `0685415f9406b7a8139448d3d80e654087a65710`.

Root `CURRENT_STATE.md`, `10_Projects/DexCompany-Ops/CURRENT.md`, and `PROJECT_CONFIG.md` contain older point-in-time Runtime pointers in current sections. That drift is already tracked by Wiki Issue #55 and must be reconciled without deleting historical sections or unrelated user changes. This watch does not use stale pointer text to roll Runtime backward.

## PASS / FAIL / Not Checked

- #42039 official PR/patch/merge verification: PASS
- Official `rust-v0.152.0` feature-stage check: PASS
- #42039 merge-tree feature-stage check: PASS
- Latest non-prerelease release check: PASS (`0.152.0`)
- Dex approved-main comparison: PASS
- Runtime PR #66 changed-file/security scope: PASS
- Runtime PR #66 branch CI/security: PASS
- Runtime behavior activation: intentionally unchanged
- FAIL: none identified
- Approved Windows-host E2E: Not Checked
- Future stable inclusion: unknown
