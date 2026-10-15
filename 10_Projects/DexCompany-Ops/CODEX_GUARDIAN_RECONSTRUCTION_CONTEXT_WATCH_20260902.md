# Codex Guardian reconstruction/context watch — 2026-09-02

## Summary

OpenAI Codex upstream `main` added two Guardian hardening changes after the previous Dex cutoff at PR #42056. Both are favorable to long-running and future multi-agent Dex workflows, but neither is treated as an approved stable capability yet.

No new Codex stable, model transition, or meaningful pricing/usage-limit policy change was identified in the same interval. Latest official non-prerelease remains Codex CLI `0.152.0`.

## Official sources

### OpenAI Codex PR #42065 — Preserve Guardian history across thread reconstruction

- https://github.com/openai/codex/pull/42065
- Merge commit: `28097e98ebcb5e7eaa2e14534e60337f209a8a80`
- Merged: 2026-09-01 14:39:03 UTC

Confirmed upstream behavior:

- bounded, model-invisible Guardian review history is checkpointed alongside compacted rollout history and may be restored from the newest surviving checkpoint during replay;
- rollback trims the retained review history and clears it when the relevant boundary has already been evicted;
- supported user-initiated forks preserve the checkpoint according to the upstream reconstruction path;
- spawned subagents explicitly drop parent-local Guardian history, preventing parent review evidence from becoming child authorization;
- the rollout field remains optional for compatibility with older compacted records/readers;
- upstream tests cover compaction, restart, paginated/pathless stores, rollback, bounded replay, serialization, user forks, and subagent forks.

### OpenAI Codex PR #42076 — Unify Guardian context section collection

- https://github.com/openai/codex/pull/42076
- Merge commit: `2350823caa2bd3c4a6c7ef46deb390425ca7d5e1`
- Merged: 2026-09-01 15:24:44 UTC

Confirmed upstream behavior:

- Core Guardian and asynchronous Guardian V2 share typed context-section collection for root-conversation evidence, trusted user answers, and conversation transcript context;
- source-role labeling is preserved while authorization evidence is supplied in the intended user-role context;
- Guardian V2 fails closed when context collection fails;
- upstream tests verify shared section ordering/roles and that trusted user answers appear exactly once in the Guardian V2 approval flow.

## Dex classification

### confirmed

- Both changes are merged into OpenAI Codex upstream `main` after the `0.152.0` release cutoff.
- Latest official non-prerelease Codex release remains `0.152.0`.
- Dex Runtime PR #71 records these changes as watch-only acceptance/security evidence and does not alter runtime behavior or capability activation.
- Runtime PR #71 merged to `main` as `2058b99819525792e0ffb607a9e0a8f7bc71a3d0`.
- Runtime PR #71 branch validation run `33526492030` passed dependency install, static checks, unit/smoke tests, and production dependency audit; branch Vercel and merge-commit Vercel are PASS.
- Runtime Issue #25 and #35 tracking were extended for future stable/approved-host Guardian reconstruction, context parity, and subagent isolation tests.

### inference

- #42065 can reduce redundant re-review after compaction/restart while strengthening multi-agent isolation because spawned children do not inherit parent-local Guardian review evidence.
- #42076 can reduce disagreement between synchronous Core Guardian and asynchronous Guardian V2 caused by different context shaping, and fail-closed collection behavior is safer than reviewing incomplete evidence.
- These changes are especially relevant to #28 long-running Unified Task work and the later #35 capability-routed reader/verifier expansion.

### proposal applied

- Keep #42065/#42076 watch-only until a future stable includes them and approved Windows-host E2E passes.
- Require compaction/restart/fork/rollback reconstruction tests, stale-evidence invalidation, Core Guardian/Guardian V2 context-section parity, exactly-once trusted-user-answer checks, and zero-mutation fail-closed behavior on context collection error.
- Require spawned subagents/readers/verifiers to receive no parent-local Guardian approval/review checkpoint as authorization.
- Continue to treat GitHub Task ID, attemptId, explicit approval record, mutation lock, durable Result/receipt, verifier evidence, OAuth scope and Dex policy as higher authority than provider-local Guardian history.
- Do not change the current recommended stable target or Guardian settings based on upstream-main evidence alone.

### unknown

- the first stable release that includes #42065 and #42076;
- the final public/stable Guardian checkpoint serialization and retention contract;
- approved Windows-host and Chat/Work/mobile behavior parity;
- whether stable diagnostics can expose sufficient reconstruction/context failure evidence without sensitive-data overcollection.

## Validation and safety status

| Check | Result |
|---|---|
| #42065 official PR/merge/body/diff | PASS |
| #42076 official PR/merge/body/diff | PASS |
| Latest official non-prerelease release | PASS — `0.152.0` |
| Runtime PR #71 one-file documentation scope | PASS |
| Runtime validation `33526492030` | PASS |
| Runtime branch Vercel | PASS |
| Runtime merge Vercel | PASS |
| Runtime post-merge GitHub Actions run | Not Checked — no merge-SHA run returned |
| Future stable containing #42065/#42076 | Not Checked |
| Approved Windows-host reconstruction/context E2E | Not Checked |
| Chat/Work/mobile Guardian parity | Not Checked |
| FAIL | none |

## Safety boundary

The following remain unchanged/disabled: prerelease or experimental activation, Guardian/Guardian V2 setting changes, automatic approval, broader OAuth/filesystem/MCP/plugin permissions, paid API, automatic paid fallback, extra paid usage, credit/banked-reset/plan changes, plugin/Skill auto-install/update/reconcile/delete, Browser/CDP, Computer Use, Remote Control, Voice/Realtime, diagnostic auto-upload, external messaging, destructive migration, and legacy Skill/Plugin deletion.

## Canonical-state note

At this watch, Runtime `main` has advanced to PR #71 (`2058b99819525792e0ffb607a9e0a8f7bc71a3d0`) while large aggregate Wiki current-pointer sections still show the earlier PR #67 snapshot. Wiki Issue #55 has been reopened to reconcile those aggregate pointers in a bounded documentation pass rather than mass-rewriting historical sections during this provider-watch change. This preserves unrelated user/history content while explicitly tracking the drift.
