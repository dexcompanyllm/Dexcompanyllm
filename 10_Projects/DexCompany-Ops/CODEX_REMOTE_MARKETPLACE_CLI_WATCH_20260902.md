# Codex remote marketplace plugin CLI watch — 2026-09-02

## Summary

OpenAI Codex PR #42150 is a meaningful post-`0.152.1` plugin/marketplace change. Dex records it as future-stable supply-chain/auth/cache/network-egress evidence only; no remote marketplace discovery or plugin/Skill mutation is enabled.

Current operational ordering is unchanged: Runtime #28 Phase 3 remains active next; #34 Work/plugin and #35 worker expansion remain blocked until #28 passes.

## Official evidence

OpenAI Codex PR #42150 — `Support remote marketplaces in the plugin CLI`

- Official: https://github.com/openai/codex/pull/42150
- Merged: `2026-09-01T22:53:32Z`
- Merge commit: `6b59cefcbb35951c197a235dc94dbe700f2fbc7c`
- `codex plugin list` can include remote catalog entries with source, version, install policy and authentication policy in JSON output.
- Existing plugin CLI add/remove paths can operate on remote plugins.
- Remote catalog cache is scoped by scope and collection, prefers fresh cache and performs one forced refetch when an add request misses a plugin in an otherwise fresh cache.
- Unfiltered remote-listing failure preserves the local curated catalog, while explicitly selected remote marketplace failures are surfaced.
- Tests cover remote listing, install/remove, catalog fallback, cache refresh, collection isolation and install failure.
- Official stable `0.152.1`: **not included**; #42150 merged after that release.

## Classification

### confirmed

The upstream plugin CLI now understands remote catalog entries and can add/remove remote plugins. Its cache and fallback behavior is explicitly tested, but this is upstream-main evidence rather than an approved Dex-host capability.

### inference

The change can reduce manual plugin-discovery work and improve portability, but it increases the importance of marketplace provenance, remote authentication policy, identity-scoped cache isolation and bounded network egress. A remote provider catalog must not replace Dex canonical Skill/plugin provenance.

### proposal

Keep remote marketplace discovery and plugin add/remove disabled in Dex operational flows until a containing stable and approved-host security E2E pass. Any future adoption must keep explicit operator intent, allowlisted network origins, account/workspace/cache isolation, policy precedence, rollback evidence and Dex source/license/security/quality ingestion checks.

### unknown

- first official non-prerelease stable containing #42150
- final stable remote catalog cache/auth/install-policy contract
- approved Windows-host behavior
- Chat/Work desktop/mobile parity
- measured productivity benefit versus supply-chain/network complexity in Dex workloads

## Dex optimization applied

Runtime PR #92 adds one documentation-only watch file and merged after existing Runtime CI/security checks passed. Runtime Issue #90 was expanded from #42149-only Git marketplace tracking to a combined Git/remote marketplace security gate.

Runtime PR #88 had already merged immediately before PR #92 was branched and is the bounded Phase 3 local-bridge implementation baseline. This provider watch did not touch or revert PR #88 implementation files; approved Windows-host Phase 3 E2E remains Not Checked and #28 remains open.

This Wiki change adds only this canonical evidence file. It does not rewrite aggregate current-state/history documents because the operational Gate has not changed.

## Tracking / acceptance

Runtime Issue #90 now requires:

- first stable containing #42149/#42150
- bounded list provenance for source/version/install/auth policy with no credential leakage
- account/workspace/scope/collection cache isolation
- at most one bounded refetch on a fresh-cache miss and no stale/wrong plugin installation
- local curated catalog preservation on unfiltered remote failure and visible zero-mutation failure for explicit remote selection
- explicit operator intent for add/remove; no automatic plugin/Skill mutation
- install/auth/managed-policy precedence with no silent permission or alternate-account fallback
- selected-plugin-only remove; unrelated legacy Skills/plugins preserved
- allowlisted network origin plus Dex provenance/license/secret/script/security/duplicate-quality review before canonical ingestion
- approved Windows-host and Work/desktop/mobile PASS/FAIL/Not Checked before adoption

## Safety boundary

- remote marketplace enablement/network fetch: 0
- plugin/Skill install/add/remove/update/reconcile/delete: 0
- broader OAuth/filesystem/MCP permission: 0
- paid API/automatic paid fallback/extra paid usage: 0
- prerelease/experimental promotion: 0
- destructive migration/external messaging: 0
- GitHub Task/Result and Dex canonical Skill provenance remain authoritative

## Result

### PASS

- official #42150 PR metadata/content verified
- `0.152.1` non-inclusion verified
- latest Runtime/Wiki marketplace-watch baseline checked
- Runtime PR #92 one-file scope, CI/security and Vercel verified before merge
- Runtime Issue #90 updated with remote-marketplace gates
- Phase 3 PR #88 preserved — already merged in the Runtime baseline; provider-watch changes did not touch/revert its implementation

### FAIL

- none

### Not Checked

- Phase 3 approved Windows-host E2E / #28 completion
- first stable containing #42150
- approved Windows-host remote-marketplace CLI security E2E
- Work/mobile/desktop parity
- Runtime PR #92 merge-SHA separate GitHub Actions run if none is emitted

## Sources

- OpenAI Codex PR #42150: https://github.com/openai/codex/pull/42150
- OpenAI Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Runtime PR #88: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/88
- Runtime PR #92: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/92
- Runtime Issue #90: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/90
