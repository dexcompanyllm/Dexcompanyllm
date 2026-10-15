# Codex replay input preservation watch — 2026-09-03

## Official source

https://github.com/openai/codex/pull/42399

## confirmed

OpenAI Codex PR #42399 is merged after the earlier provider-watch cutoff.

It fixes thread replay after a later turn has continued beyond an earlier `MisalignmentPolicyViolation`: older resolved misalignment errors are omitted during replay, while an error on the latest turn remains active. The latest turn is tracked independently of the bounded replay buffer, restored composer drafts and queued follow-up input are preserved, and interrupted tool calls from the older turn remain visible in history.

Upstream tests cover restored draft/queue preservation, buffer eviction, current-turn violations and interrupted tool rendering.

Latest official non-prerelease Codex remains `0.152.1`; #42399 is future-stable evidence only.

## inference

This is directly favorable to Dex's `Zero User Re-entry` goal because reconnect/replay is less likely to discard already-entered user input. The safety constraint is that a current unresolved policy violation must remain active, and restored provider input is continuity state rather than Dex approval or Task authority.

## proposal / future-stable gate

After a non-prerelease stable contains #42399, Runtime #35/#34 should verify:

- [ ] an older resolved misalignment error does not clear a restored draft or queued follow-up after a later completed turn;
- [ ] a current/latest unresolved violation remains active and cannot be discarded merely to preserve draft state;
- [ ] bounded replay-buffer eviction does not resurrect stale policy errors or drop valid current input;
- [ ] interrupted tool-call history remains visible without being replayed as new execution;
- [ ] restored draft/queue is bound to the same account/workspace/thread and Dex Task context;
- [ ] reconnect/resume/replay produces at most one submit mutation for one queued user action and cannot duplicate worker execution or canonical Result;
- [ ] restored/autosent provider input never creates permission, billing, destructive action, merge/deploy or external-side-effect approval;
- [ ] GitHub canonical requirements/checkpoints remain authoritative even when provider replay preserves input successfully.

## unknown / Not Checked

- first official non-prerelease stable containing #42399;
- Work/Desktop/mobile parity;
- approved-host long-thread replay/resume E2E;
- interaction with issue #42393 remote-compaction failure and future context-management behavior.

## safety boundary

No replay/autosend capability is activated by this watch. No prerelease/experimental feature, broader permission, automatic approval, paid API/fallback, Plugin/Skill mutation, external messaging, multi-writer, automatic merge/deploy or destructive migration is enabled.

## status

| Check | Result |
|---|---|
| OpenAI PR #42399 merge/scope | PASS |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Wiki change | evidence-only |
| First stable containing #42399 | Not Checked |
| Approved-host replay/input E2E | Not Checked |
