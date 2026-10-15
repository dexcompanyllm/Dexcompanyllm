# Codex App Server thread model metadata watch — 2026-09-02

## Summary

OpenAI Codex PR #42151 adds nullable configured `model` and `reasoningEffort` to App Server thread metadata. It merged after stable `0.152.1`, so Dex keeps it future-stable/read-only evidence only.

Operational order remains #28 Phase 3 → #34 → #35. No model, reasoning effort, Codex version, routing, permission, paid usage or thread state was changed.

## Official evidence

- PR: https://github.com/openai/codex/pull/42151
- Merged: `2026-09-01T22:58:39Z`
- Commit: `986ff1cc7ced0081ec5014b700a376333d87f869`
- Adds nullable `model` / `reasoningEffort` to shared Thread schemas.
- Loaded threads expose current configured settings; unloaded threads expose latest persisted settings when available.
- Read/list/start/resume/rollback/metadata-update/notification paths carry the fields.
- Legacy/unavailable values remain nullable.
- Metadata can be read without loading a thread or dispatching queued work.
- Upstream explicitly documents that these are configured settings, **not per-turn execution telemetry**.
- `0.152.1`: not included.

## Classification

### confirmed
App Server gains read-oriented visibility into configured thread model/effort across loaded and persisted lifecycle states.

### inference
This can reduce wrong-model/wrong-effort resume errors and support cheaper #28/#34 preflight checks. Persisted metadata can be stale, so it must not be treated as proof of what executed on a specific turn.

### proposal
After stable inclusion and approved-host E2E, use the fields only as bounded preflight/advisory evidence. Keep requested settings, configured thread settings and actual execution/result evidence separate; fail closed on mismatches rather than silently substituting a model or paid route.

### unknown
- first stable containing #42151
- approved Windows-host lifecycle behavior
- restart/resume/rollback/model-change consistency
- Work/desktop/mobile parity

## Dex optimization applied

- Runtime Issue #93 created with stable/approved-host acceptance gates.
- Runtime PR #94: one documentation file only; branch validation PASS; merged after checks.
- Runtime PR #88 was already merged in the branch baseline as the bounded Phase 3 local-bridge implementation; PR #94 did not touch or revert its implementation files. Approved Windows-host Phase 3 E2E remains Not Checked and #28 remains open.
- This Wiki PR adds only this canonical evidence file; no aggregate state rewrite because the operational Gate did not change.

## Safety / status

- Codex/model/reasoning mutation: 0
- thread load/resume/start: 0
- paid API/fallback/extra usage: 0
- broader permission/hosted write: 0
- plugin/Skill mutation: 0
- GitHub Task ID, `attemptId`, approval/mutation lock and canonical Result/receipt remain authoritative

PASS: official evidence, `0.152.1` non-inclusion, Runtime branch CI/security, Phase 3 PR #88 implementation preservation.

FAIL: none.

Not Checked: Phase 3 approved Windows-host E2E / #28 completion, first containing stable, approved Windows-host App Server E2E, Work/mobile/desktop parity, separate Runtime merge-SHA Actions if none is emitted.

## Sources

- OpenAI Codex PR #42151: https://github.com/openai/codex/pull/42151
- OpenAI Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Runtime PR #88: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/88
- Runtime PR #94: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/94
- Runtime Issue #93: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/93
