# Codex Guardian first-REPL fast-start watch — 2026-08-30

## Scope

This evidence records the first meaningful OpenAI Codex upstream change observed after the Dex watch baseline at Wiki `main` `37fec4b6282d4ea25baab3860b467e1d66899b5f` / Runtime `main` `cde12997fd69aba114fa4f4bf518d4338339455d`.

## Finding

### First Node REPL `js` execution can proceed before Guardian classification finishes

- Classification: `confirmed`
- OpenAI PR: https://github.com/openai/codex/pull/41666
- OpenAI merge commit: https://github.com/openai/codex/commit/cefa060695594cdeebfb4306170cc27487c8a088
- Merged: 2026-08-30 13:04:30 UTC
- OpenAI states that Node REPL-backed browser/computer-use servers now fast-approve only the first `js` execution while the initial asynchronous Guardian classification remains pending.
- Setup/reset/module-directory tools do not consume the first-execution allowance.
- Subsequent `js` executions use the normal Guardian review policy.

## Why it matters

- Classification: `inference`
- This reduces first-action startup latency for browser/computer-use flows.
- It also deliberately permits one execution before Guardian classification completes, so the change is a security/performance tradeoff rather than an unconditional safety improvement.
- Dex already keeps Browser Developer Mode/full CDP and remote-control surfaces behind explicit security gates; this upstream behavior increases the importance of preserving those gates.

## Dex response

- Classification: `confirmed`
- Runtime PR #32 added `guardianFirstNodeReplFastStart` to capability tracking as `upstream-main / security-watch-disabled`.
- Runtime capability tracking schema advanced from `1.3` to `1.4`.
- Regression coverage requires the capability to remain disabled and tied to Runtime Issue #30.
- No Browser/Computer Use/full CDP capability was enabled.
- No permission or OAuth scope was expanded.
- No prerelease, paid API, automatic extra usage, destructive migration, or legacy Skill/Plugin removal was performed.

## Validation

### PASS

- Official OpenAI PR/merge evidence review
- Latest official stable check: Codex `0.151.0` remains the latest non-prerelease release
- Runtime main comparison
- Runtime PR #32 scope review: two files, tracking + regression test only
- Runtime GitHub Actions run `33314314330`
- Static checks, unit tests and smoke test
- Production dependency audit
- Runtime PR #32 merge: `71423af81669f4995aa618b9255dcecb60d72e05`
- Runtime Issue #30 tracking update

### FAIL

- None in the implemented/automated scope.

### Not Checked

- A stable Codex release containing PR #41666
- Approved-host browser/computer-use Guardian regression
- Browser Developer Mode/full CDP Dex threat model and E2E
- Remote Control Dex threat model and E2E

## Safety decision

Keep the behavior watch-only. Dex must not rely on first-REPL fast-start or enable Browser/Computer Use/full CDP until all of the following are true:

1. an official stable Codex release contains the behavior;
2. the existing explicit-approval, site-scope, audit/redaction, recovery and kill-switch requirements are satisfied;
3. approved-host regression confirms that only the intended first `js` execution can bypass the initial Guardian wait and subsequent executions return to normal review.

## Tracking

- Runtime Issue #30: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/30
- Runtime PR #32: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/32
