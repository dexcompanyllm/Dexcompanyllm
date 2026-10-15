# Codex managed-worktree + history-projection evidence — 2026-09-03

## Official upstream evidence

Sources:

- https://github.com/openai/codex/pull/42366
- https://github.com/openai/codex/pull/42369
- https://github.com/openai/codex/releases/tag/rust-v0.152.1

### confirmed — PR #42366

OpenAI merged PR #42366 on 2026-09-02 21:25:54 UTC. `WorktreeManager::list` now returns managed linked worktrees associated with the repository containing a requested working directory. It preserves the requested repository-relative working directory and excludes the primary checkout, unrelated repositories, paths outside the managed layout, unsafe working directories, aliases, and stale or mismatched Git registrations. Upstream tests cover repository filtering, native paths, nested working directories, stale registrations, aliases, and layout validation.

### confirmed — PR #42369

OpenAI merged PR #42369 on 2026-09-02 21:32:19 UTC. SQLite thread-history projection now advances past malformed or discontinuous rollout records instead of allowing one invalid record to block all later valid history. The projection skips malformed JSON, unknown records, missing or regressed ordinals, ordinal gaps, and invalid timestamps while recording anomaly/outcome counters. Unknown-record ordinals remain available for a later valid retry. Upstream tests cover malformed lines, missing/duplicate/forward-gap ordinals, and valid retry after unknown records.

## Dex comparison

### confirmed

- Runtime approved `main` before this follow-up watch was PR #127 merge `8e3e714cb360980e0b5eab40901658f2caff0cc8`.
- Runtime PR #128 adds one watch-only Markdown file and merged as `2cc7608108da2a28d5e0b09bdb762ea72a52fafd`.
- Runtime PR #128 scope: **1 file / +96 / -0**. No executable Runtime code, configuration, permissions, model routing, billing, Plugin/Skill state, or deployment configuration changed.
- Runtime validation `33686385427` PASS: dependency installation, static checks/unit tests/smoke test, and production dependency audit all PASS. Branch and merge Vercel deployment status PASS.
- Runtime #28 now tracks future-stable managed-worktree listing against Dex project→canonical repository→realpath and one-writer invariants.
- Runtime #34 now tracks future-stable provider-history projection/reconnect behavior while keeping GitHub Task/Result/attempt state authoritative.
- Latest official non-prerelease Codex remains `0.152.1`; PR #42366/#42369 are upstream-main/future-stable evidence only.

### inference

Repository-scoped managed-worktree discovery can reduce worker misrouting and unsafe cleanup because stale, aliased, unrelated, unsafe, or out-of-layout registrations are filtered before a client sees them. This aligns with Dex's dedicated worker and canonical-realpath design, but the provider list remains discovery evidence only; it cannot authorize mutation or select a different repository by itself.

The history-projection change improves provider-local continuity after corrupted or discontinuous rollout records, but it makes explicit that local SQLite history is a derived projection that can contain gaps and anomalies. If provider-local history conflicts with the canonical GitHub Task/Result/attempt chain, GitHub must continue to win. Recovery must not resurrect a stale approval, attempt, or mutation intent.

### proposal — tracked, not enabled

Runtime #28 future-stable approved-host worktree gate now requires:

- nested requested cwd returns only managed linked worktrees belonging to the same canonical repository and preserves the requested repository-relative cwd;
- primary checkout, unrelated repository, stale registration, alias/symlink ambiguity, path outside managed layout, and unsafe working directory are excluded;
- every returned candidate is re-bound to Dex project→canonical repository→expected realpath/worktree identity before claim or mutation;
- provider worktree inventory remains discovery evidence and never grants write approval or bypasses mutation lock;
- stale/mismatched registrations cause no automatic cleanup/deletion;
- multiple valid managed worktrees cannot create multiple active writers for the same Task/mutation scope;
- restart/reconnect revalidates worktree registry and Task attempt before mutation resumes.

Runtime #34 future-stable provider-history gate now requires:

- malformed JSON, unknown records, missing/duplicate/regressed/gap ordinals, and invalid timestamps cannot block later valid provider history;
- skipped/anomalous records remain observable and are never rewritten as successful Dex Task events;
- unknown-record retry cannot replay protected approval, create a duplicate Task/worker, or reapply stale mutation intent;
- provider SQLite/rollout conflict with GitHub Task/Result/attempt state resolves to GitHub authority and provider state becomes stale/unknown;
- projection gaps do not force user requirement re-entry when the requirement is already durable in the canonical Task packet/result chain;
- account/workspace/thread identity remains bound through resume/reconnect and cross-identity projected records are rejected;
- Dex does not automatically repair, migrate, rewrite, or delete provider SQLite history because an anomaly exists.

## unknown / Not Checked

- first official non-prerelease stable containing PR #42366/#42369;
- approved Windows-host managed-worktree listing E2E against Dex's canonical project/realpath registry;
- Work/Desktop/mobile provider-history projection/reconnect E2E;
- crash/restart behavior with a real malformed rollout followed by later valid records;
- whether a future public App Server/SDK surface exposes managed-worktree listing directly to Dex-relevant clients.

## Safety boundary

No worktree was created, deleted, moved, cleaned, or re-registered. No SQLite database was repaired, edited, migrated, rewritten, or deleted. No prerelease/experimental capability, broader permission, paid API/automatic paid fallback, Plugin/Skill mutation, multi-writer execution, destructive migration, deployment change, or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42366 merge/scope | PASS |
| OpenAI PR #42369 merge/scope | PASS |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #128 scope | PASS — docs-only, 1 file / +96 / -0 |
| Runtime validation `33686385427` | PASS |
| Runtime branch/merge Vercel | PASS |
| Runtime #28/#34 tracking | PASS |
| Approved-host managed-worktree E2E | Not Checked |
| Provider-history projection/reconnect E2E | Not Checked |
| Wiki automated CI | Not Checked — no workflow evidence expected for this one-file evidence change |

No FAIL is introduced.
