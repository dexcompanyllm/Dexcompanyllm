# Codex Managed Worktree Watch — 2026-09-02

- Status: Canonical provider-watch evidence
- Upstream: OpenAI Codex PR #42196
- Latest official non-prerelease Codex at cutoff: `0.152.1`
- Dex operational gate change: none

## Official sources

- OpenAI Codex PR #42196 — Add managed worktree creation: https://github.com/openai/codex/pull/42196
- Official Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Official ChatGPT & Codex changelog: https://learn.chatgpt.com/docs/changelog

## confirmed

OpenAI merged PR #42196 on 2026-09-02T03:48:43Z. It adds `WorktreeManager::create` for detached Desktop-compatible managed worktrees from current `HEAD` or an explicit base while preserving the source cwd relative to the repository root.

The implementation and upstream tests show that managed creation:

- requires an absolute managed root and canonicalizes the source cwd/repository;
- resolves the requested base to an exact commit SHA before checkout;
- isolates Git worktree operations from inherited repository selectors/config overrides, repository hooks, filesystem monitors and configured clean/smudge/process filters;
- creates a clean detached destination without intentionally altering a dirty source checkout or shared source Git configuration;
- preserves nested source cwd in the destination;
- rejects a destination cwd escaping through a symlink;
- rolls back incomplete worktrees and empty allocation buckets after failure;
- covers HEAD/explicit-base/annotated-tag selection, Git environment isolation, filter suppression, source preservation, unsafe symlinks and rollback in tests.

No upstream review threads were returned for PR #42196 at this cutoff.

## inference

Managed worktrees can reduce checkout/file collision and source-tree rework when Dex later expands capability-routed readers and independent verifiers. Suppressing hooks, fsmonitor helpers and content filters during materialization also lowers the chance that checkout creation itself invokes repository-configured helper programs.

A worktree is an isolation mechanism for repository state, not authorization or sandbox evidence. Multiple worktrees must never imply multiple active writers for the same Dex mutation scope.

## proposal

Keep Runtime #35 blocked behind #28 and preserve `One Task ID / One Accountable Lead / one active writer per mutationLockKey / One Canonical Result`.

After an official stable includes #42196 and the relevant surface exposes it intentionally, evaluate managed worktrees first for read-only readers/verifiers. Bind each worktree to canonical project realpath/digest, Task ID, `attemptId`, exact base SHA, worker identity and mutation scope. Require bounded disk lifecycle, cleanup, path-escape rejection and hook/filter/fsmonitor suppression before any writer use.

## unknown

- first official non-prerelease stable containing #42196;
- final stable App/Desktop/App Server exposure contract;
- approved Windows-host junction/reparse/symlink behavior;
- concurrent creation, retention, garbage-collection and crash-recovery semantics;
- measured Dex productivity/storage tradeoff.

## Dex optimization applied

Runtime PR #103 added one documentation-only gate file and was merged after Runtime validation PASS.

- Runtime PR #103: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/103
- Runtime validation `33588817432`: PASS — install, static checks, unit tests, smoke test and production dependency audit passed.
- Runtime merge: `03d9ebe75bae2cf71f778c8e3eb79d7ef566241d`.
- Runtime Issue #35 was extended with #42196 stable/surface/host acceptance gates.

No managed-worktree runtime use, multi-writer activation, mutation-lock relaxation, broader permission, Git hook/filter enabling, provider paid path, plugin/Skill mutation or destructive cleanup was enabled.

## Acceptance gates

- [ ] official stable containing #42196 and intentionally exposed target surface identified;
- [ ] source project realpath/digest + cwd validated before allocation;
- [ ] exact base SHA recorded with Task ID/`attemptId`;
- [ ] dirty source files, branch and shared Git config preserved;
- [ ] inherited Git repository selectors/config overrides cannot redirect creation;
- [ ] hooks/fsmonitor/clean-smudge-process filters do not execute during managed creation;
- [ ] symlink/junction/reparse/path traversal cannot escape managed root on approved hosts;
- [ ] allocation/add/checkout/cwd-validation/cancel/crash failure leaves no incomplete registered worktree;
- [ ] worktree count/age/disk use and garbage collection are bounded and cannot delete unrelated paths;
- [ ] multiple worktrees do not relax one active writer per mutation scope;
- [ ] verifier worktree remains mutation-free to the reviewed target;
- [ ] provider worktree/thread identifiers remain provenance only, not authorization/idempotency/Task authority;
- [ ] approved Windows-host and intended Work/Desktop E2E recorded PASS/FAIL/Not Checked before #35 relies on it.

## Verification state

- Official #42196 metadata/diff: **PASS**
- Upstream security-oriented test coverage review: **PASS**
- Upstream review-thread scan: **PASS — none returned at cutoff**
- Latest official non-prerelease stable: **PASS — 0.152.1**
- Runtime PR #103 scope/validation/merge: **PASS**
- FAIL: **none**
- Runtime merge Vercel: **Not Checked at document authoring cutoff**
- Runtime merge-SHA separate post-merge GitHub Actions: **Not Checked unless separately emitted**
- #42196 containing stable: **Not Checked**
- stable public/exposed surface: **Not Checked**
- approved Windows-host / multi-worker E2E: **Not Checked**

## Canonical state

The operational sequence is unchanged: Runtime #28 approved Windows-host Phase 3 E2E remains the active blocking gate; #34 Work/mobile integration and #35 worker expansion remain blocked behind it. Aggregate head-pointer reconciliation remains tracked in Wiki Issue #55 rather than rewriting large current-state documents on every provider-watch merge.
