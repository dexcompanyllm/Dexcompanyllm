# Codex CLI 0.155.1 stable hotfix response — 2026-09-19

## Result

- Classification: Confirmed stable hotfix; candidate-only Dex adoption.
- Official changelog: https://learn.chatgpt.com/docs/changelog
- Official release: https://github.com/openai/codex/releases/tag/rust-v0.155.1
- Runtime implementation: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/239
- Existing provider-update owner: Issue #191.

OpenAI published Codex CLI 0.155.1 on 2026-09-18. New local TUI sessions now leave reasoning summaries disabled by default, preventing request rejection by providers that do not support them. Explicit reasoning-summary settings remain respected.

## Dex decision boundary

This release supersedes 0.155.0 as the observed stable validation candidate only.

- Recommended Codex CLI: 0.151.0 — unchanged.
- Compatibility floor: 0.150.0 — unchanged.
- Explicit reasoning-summary configuration: preserved.
- Automatic install/update, provider/account switch, permission expansion, experimental enablement, paid API/extra usage, and credit/reset consumption: prohibited.
- Windows, macOS, Linux, and provider-specific execution: Not Checked independently.
- ChatGPT Web, Work, Android, and iOS access surfaces are not changed by this CLI hotfix.

`CURRENT.md` and `DECISIONS.md` are not changed because the approved operational target and authority boundary remain unchanged.

## Applied optimization

Runtime PR #239 records 0.155.1 as the latest observed stable release, updates matching contract assertions, and adds a source-backed assessment. The operational recommendation and cost/security boundaries remain unchanged.

## Verification

- Runtime JSON parse and tracking invariants: PASS.
- Runtime stable reference, compatibility floor, and cost guards unchanged: PASS.
- Runtime repository CI/security checks: required before merge.
- Wiki generated snapshots remain untouched.
- Wiki operations consistency CI: required before merge.
- Physical Windows/macOS/Linux behavior, installed versions, account availability, and provider-specific operation: Not Checked.
