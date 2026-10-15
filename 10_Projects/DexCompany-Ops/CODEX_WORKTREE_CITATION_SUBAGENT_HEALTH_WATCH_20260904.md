# Codex Managed Worktree / File Citation / Subagent Health Watch — 2026-09-04

- Previous permitted provider-watch checkpoint: 2026-09-04 10:08 Asia/Seoul
- Quiet-window policy: no Dex Company search/monitoring from 23:00 through 05:59 Asia/Seoul; the 06:00 catch-up already reconciled that backlog.
- All material items below appeared after the previous permitted checkpoint.

## Source-backed facts

### OpenAI Codex PR #42652 — experimental managed worktrees for `codex exec`

Merged to upstream `main` at 2026-09-04 10:58:11 Asia/Seoul.

- Adds the experimental `worktrees` feature and `--worktree` for supported new/forked `codex exec` sessions.
- Allocates a managed Git worktree, uses it as the session cwd, and binds it to the new thread.
- Shares the worktree pool with Desktop; automatic cleanup remains disabled for CLI allocations.
- Rejects unsupported commands, remote execution, ignored user config, ephemeral sessions, and disabled-feature use before allocation.
- Tests allocation/thread ownership, feature gating, flag inheritance and rejected combinations.

This is experimental upstream-main evidence only, not a stable Dex capability.

Official source: https://github.com/openai/codex/pull/42652

### OpenAI Codex PR #42650 — assistant file citations as local links

Merged to upstream `main` at 2026-09-04 10:48:27 Asia/Seoul.

- Converts `codex-file-citation` directives into local-file links in assistant Markdown.
- Preserves Unicode, Markdown-significant characters, Windows separators and location suffixes.
- Applies to streaming/final messages, plans and resume-preview transcripts.
- Keeps directives literal in code/HTML/existing links/reference definitions/escaped text.
- Bounds repeated malformed-directive parsing work and adds path/rendering regression coverage.

Official source: https://github.com/openai/codex/pull/42650

### OpenAI Codex issue #42653 — Windows session-wide exec degradation after Luna subagents

Created at 2026-09-04 10:58:54 Asia/Seoul for Codex App `26.901.20858`, ChatGPT Plus and Windows x64.

The reporter says a Sol-medium parent session that uses explicitly configured Luna subagents can intermittently enter a state where command execution fails for the parent and all existing subagents with `helper_unknown_error: setup refresh had errors`. Some Luna subagents may have already completed successfully before the failure. A fresh session reportedly restores execution. Exact trigger, Terra applicability, maintainer-confirmed root cause and fix are unknown.

Official source: https://github.com/openai/codex/issues/42653

### OpenAI Codex issue #42649 — Windows Work composer continuity signal

Created at 2026-09-04 10:36:53 Asia/Seoul. The reporter says a long-running Windows ChatGPT Work task can continue showing progress while the message composer moves out of view or disappears, obstructing follow-up input. This is issue-report evidence only.

Official source: https://github.com/openai/codex/issues/42649

## Stable / policy check

- Latest official non-prerelease Codex release remains `0.153.2`.
- No newer stable was identified after the previous permitted checkpoint.
- No new general default-model promotion or newly dated general pricing/usage-limit policy change requiring a Dex operational change was identified in this interval.
- Subscription-first, paid API disabled, automatic paid fallback disabled and automatic extra paid usage disabled remain unchanged.

Official release: https://github.com/openai/codex/releases/tag/rust-v0.153.2
Official plan guidance: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Dex canonical comparison

Before this Wiki branch:

- prior Wiki approved `main`: PR #156 `43a24d482bd9305fc3a235d8ed7e7b8d96ade422`;
- Runtime PR #179 merged after branch validation as `177376e567c5a7af48c6b7d1cd5f70100db40bb8`;
- Runtime PR #179 branch validation `33828417062`: PASS — install, static checks, unit/smoke and production dependency audit all passed;
- Runtime PR #179 branch Vercel: PASS;
- #28 remains OPEN with approved Windows-host Phase 3 E2E Not Checked;
- #34/#35 remain blocked until #28 PASS;
- GitHub Task Bus remains canonical Task authority and same mutation scope remains single-writer.

Runtime evidence: `docs/CODEX_WORKTREE_CITATION_SUBAGENT_HEALTH_WATCH_20260904.md`
Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/179
Runtime validation: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33828417062

## Classification

### confirmed

- #42652 is merged upstream but explicitly experimental.
- #42650 is merged upstream and changes file-citation presentation plus parsing-work bounds.
- #42653 is a Windows multi-agent/session issue report, not a confirmed provider contract or root cause.
- #42649 is a Windows Work UI issue report, not a canonical Task-state failure.
- Latest stable remains `0.153.2`.

### inference

- Managed worktrees could improve checkout isolation and thread↔checkout binding, but enabling an experimental path with no automatic CLI cleanup would add lifecycle risk before stable/host evidence exists.
- #42653 shows that one provider session can become a shared failure domain across parent and sibling subagents. Canonical Task/attempt/checkpoint/evidence must therefore remain outside the provider session.
- A fresh provider session restoring command execution is not authorization to replay already-successful writes. Mutation ambiguity must be resolved first and any safe retry must use a new bounded attempt identity.
- File citation links are navigation projections only; structured artifact identity, path policy, approval and writable roots remain authoritative.
- Work composer loss must not force requirement re-entry or make the native surface the only route to status/result/control state.

### proposal / tracked gates

- Keep #42652 under Runtime #35 as a future-stable/approved-host managed-worktree isolation gate; do not enable the experimental feature.
- Future worktree validation must prove canonical repo/base SHA identity, one Task-attempt↔worktree/thread binding, one active writer per mutation scope, unsupported-mode fail-closed behavior, bounded cleanup/retention and zero duplicate mutation/Result.
- Add #42653 to #35 provider-session health tests: detect session-wide exec degradation, freeze new mutations, checkpoint successful evidence, classify mutation ambiguity before session replacement, and prevent replay of completed work.
- Validate Sol/Luna/Terra actual child model/session health separately when the relevant stable/provider build is eligible on the approved Windows host.
- Add #42650 to future cross-platform navigation diagnostics without granting link text any filesystem permission authority.
- Keep #42649 in #34 surface-continuity/fallback tests so PWA/GitHub status-result paths preserve one canonical Task and zero user requirement re-entry.

### unknown

- First stable containing #42652/#42650.
- Approved-host reproduction/fix status for #42653 and #42649.
- Stable public cleanup/retention contract for provider-managed worktrees.
- Actual approved-host Sol/Luna/Terra session behavior after future compatible stable adoption.

## Validation / safety status

- PASS: official #42652/#42650 upstream evidence verified.
- PASS: official #42653/#42649 issue evidence verified and bounded as reporter evidence.
- PASS: latest official stable checked as `0.153.2`.
- PASS: current Dex contract and #28/#34/#35 boundaries re-read.
- PASS: Runtime PR #179 documentation/tracking-only branch validation `33828417062` and branch Vercel.
- PASS: Runtime PR #179 merged after required branch checks.
- FAIL: none remaining in the Runtime watch change.
- Not Checked at this file creation: separate Runtime merge-SHA Actions run, final merge Vercel, Wiki automated CI, first stable containing #42652/#42650, approved-host E2E and maintainer-confirmed fixes.

No experimental worktree activation, prerelease activation, model-routing change, API key, paid API/fallback, extra paid usage, broader permission, multi-writer, hosted write, destructive cleanup, external messaging, provider DB/cache surgery, legacy Skill/Plugin deletion or automatic deployment is authorized by this evidence.
