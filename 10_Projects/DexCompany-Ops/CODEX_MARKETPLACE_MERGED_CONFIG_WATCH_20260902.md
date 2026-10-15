# Codex merged-config Git marketplace watch — 2026-09-02

## Summary

OpenAI Codex PR #42149 is a meaningful post-`0.152.1` plugin/marketplace change. Dex records it as future-stable supply-chain/network-egress evidence only; no marketplace, plugin or Skill mutation is enabled.

Baseline at intake:

- Wiki `main`: PR #75 `f7f429bea3e69c0b550a47ec522cb9df131d83e0`
- Runtime `main`: PR #89 `dac9cc32383718ddb54cc47638f192f39c970b30`
- #28 Phase 3 remains active next; #34/#35 remain blocked.

## Official evidence

OpenAI Codex PR #42149 — `Upgrade Git marketplaces from merged configuration`

- Official: https://github.com/openai/codex/pull/42149
- Merged: `2026-09-01T22:39:44Z`
- Commit: `68c9556cdf14c069e289904ed087f62205c4ba91`
- Marketplace source, ref and sparse-path settings now come from effective merged configuration for startup synchronization and explicit upgrades, rather than only user config.
- The initiating operation's configuration loader and overrides are retained for the reload performed before activation.
- Activation rolls back if the marketplace definition changes or configuration can no longer be loaded.
- This path does not copy merged/system/override definitions into user config.
- Tests cover system-defined marketplaces, CLI overrides, invalid-user-config startup fallback and rollback after configuration changes.
- `0.152.1`: **not included**; #42149 merged after that release.

## Classification

### confirmed

The upstream change broadens which config layers can define a Git marketplace eligible for synchronization/upgrade, while improving reload/rollback consistency.

### inference

This may improve portability for centrally managed plugin catalogs, but effective merged config becomes a more important supply-chain and network-egress boundary because the marketplace definition may originate outside user-local config.

### proposal

Keep external Git marketplaces and automatic marketplace mutation disabled for Dex operational flows until a containing stable and approved-host security E2E pass. Any later adoption must bind source/ref/sparse-path and config-layer provenance, require approved/allowlisted origins, preserve rollback evidence, and still pass Dex provenance/license/secret/script/security/duplicate-quality review before canonical Skill/plugin ingestion.

### unknown

- first official stable containing #42149
- final stable startup-sync and merged-layer precedence contract
- approved Windows-host network/rollback behavior
- Chat/Work desktop/mobile parity

## Tracking / acceptance

Runtime Issue #90 tracks:

- effective source/ref/sparse-path provenance and initiating config context
- deterministic system/managed/CLI override precedence and cross-task isolation
- fail-closed rollback if definition/reload changes before activation
- prior known-good snapshot preservation
- no silent merged-definition copy into user config
- no Production external Git fetch without approved/allowlisted origin/ref
- Dex Skill provenance/license/security/quality ingestion gates remain mandatory
- unrelated legacy Skill/plugin deletion or silent disablement 0
- credential/private Git URL/token/local path leakage 0
- approved-host positive/negative E2E before adoption

## Safety boundary

- marketplace enablement/network fetch: 0
- plugin/Skill install/update/reconcile/delete: 0
- broader OAuth/filesystem/MCP permission: 0
- paid API/automatic paid fallback/extra paid usage: 0
- prerelease/experimental promotion: 0
- destructive migration/external messaging: 0

## Result

### PASS

- official #42149 PR metadata/content verified
- `0.152.1` non-inclusion verified by merge timing/release boundary
- current Dex approved-main baseline checked
- Runtime Issue #90 created with supply-chain/security acceptance gate
- unrelated canonical history preserved

### FAIL

- none

### Not Checked

- first stable containing #42149
- approved Windows-host marketplace upgrade/security E2E
- Work/mobile/desktop parity

## Sources

- OpenAI Codex PR #42149: https://github.com/openai/codex/pull/42149
- OpenAI Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Runtime Issue #90: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/90
