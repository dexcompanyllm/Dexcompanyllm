# Codex CLI 0.155.0 stable response — 2026-09-18

## Result

- Classification: Confirmed release; candidate-only Dex adoption.
- Official source: https://github.com/openai/codex/releases/tag/rust-v0.155.0
- Runtime implementation: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/238
- Existing provider-update owner: Issue #191.

OpenAI published Codex CLI 0.155.0 as a stable release. The official release notes include Windows restricted-WSL escape blocking, shell-snapshot credential hardening, account-switch invalidation, approval evidence preservation, macOS Touch ID verification for MCP, daemon update/recovery changes, and experimental `/voice`.

## Dex decision boundary

This release is recorded as an observed stable candidate only.

- Recommended Codex CLI: 0.151.0 — unchanged.
- Compatibility floor: 0.150.0 — unchanged.
- Experimental capabilities: disabled.
- Automatic install/update, daemon migration, account/provider switch, permission expansion, paid API/extra usage, and credit/reset consumption: prohibited.
- Windows, macOS, and Linux host validation: Not Checked independently.
- Android and iOS remain access surfaces unless they execute the workload.

`CURRENT.md` and `DECISIONS.md` were not changed because the approved operational target and authority boundary did not change.

## Applied optimization

Runtime PR #238 records 0.155.0 as the latest observed stable release, updates the matching contract assertions, and adds a source-backed assessment. All tracked capabilities remain disabled.

## Verification

- Runtime static checks, unit tests, smoke tests, production dependency audit: PASS.
- Runtime Vercel check: PASS.
- Runtime PR merged to main: PASS.
- Wiki generated snapshots remain byte-exact and are not edited by this response.
- Wiki branch content/authority invariant review: PASS.
- Wiki operations consistency CI is required to PASS before merge; the final result is retained on PR #203.
- Physical Windows/macOS/Linux behavior and Ethan account availability: Not Checked.
