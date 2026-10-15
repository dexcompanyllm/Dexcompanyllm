# Codex Guardian thread-context final cutoff — 2026-09-03

## Provenance correction

This note supersedes only the earlier same-day observation in `CODEX_WSL_CODEMODE_APPSERVER_WATCH_20260903.md` that PR #42458 was the newest observed OpenAI Codex `main` commit. OpenAI subsequently merged PR #42529 during the final cutoff.

## Confirmed

OpenAI Codex PR #42529 / commit `6d7f6dcd2285de70a3892d4f05b2a8ff44aa3350` adds the disabled, under-development `guardian_thread_context` feature flag.

Official source: https://github.com/openai/codex/commit/6d7f6dcd2285de70a3892d4f05b2a8ff44aa3350

The upstream commit states and shows:
- `Stage::UnderDevelopment`;
- `default_enabled: false`;
- selection of thread-owned context for both Guardian reviewers;
- config-only status until reviewer wiring lands;
- generated config schema exposure;
- tests for default/base/profile override resolution.

Classification: **confirmed upstream / under-development / disabled by default**.

## Inference

Thread-owned Guardian context could improve reviewer provenance and thread isolation when fully implemented, but it also changes the context boundary used for security/approval review. Therefore the existence of the flag cannot be treated as approval, authorization, stable reviewer semantics or safe context isolation.

Classification: **inference**.

## Proposal

Keep the feature disabled and track it through the existing Guardian stable-release gate. Future Dex promotion requires:
- first official non-prerelease stable with completed reviewer wiring;
- approved-host generated schema and default-false verification;
- base/profile/thread resolution tests;
- resume/compaction/rollback/restart/delegated-worker context-isolation E2E;
- stale-context rejection as approval evidence;
- preservation of canonical Task/attempt/evidence and explicit Dex approval authority.

Classification: **proposal**.

## Unknown / Not Checked

- first stable containing completed reviewer wiring: **Not Checked**;
- final public semantics and platform support: **Not Checked**;
- approved-host Guardian thread-context E2E: **Not Checked**;
- inclusion in already-published `0.154.0-alpha.1`: **Not Checked** and not inferred.

## Release / cost / safety state

Latest approved non-prerelease Codex target remains `0.153.0`. The official `0.154.0-alpha.1` is prerelease-only and remains disabled. No pricing/usage-limit policy change requiring Dex modification was confirmed in this cutoff. Subscription-first, paid API disabled, automatic paid fallback disabled and automatic credit/reset use disabled remain canonical.

No model, config, Guardian flag, permission, MCP, Plugin/Skill, external messaging, destructive state or deployment behavior is enabled by this note.

## Verification

- #42529 commit and configuration details: **PASS**.
- under-development/default-false status: **PASS**.
- Dex operational activation: **PASS — none**.
- stable maintainer contract: **Not Checked**.
- approved-host E2E: **Not Checked**.
