# Codex MCP OAuth refresh coordination watch — 2026-09-02

## Status

- `confirmed`: OpenAI Codex PR #42128 merged to upstream `main` on `2026-09-01T20:29:17Z`, after official stable `0.152.0`.
- `confirmed`: PR #42128 adds `mcp_oauth_refresh_coordination` as **UnderDevelopment / default false**, pins refresh mode to MCP connections, and includes refresh mode in connection identity/reconciliation.
- `confirmed`: Dex Runtime PR #84 merged documentation-only watch evidence at `3b96984d66071d562152b10609d25ca719b82eb7`; Runtime Issue #83 tracks future stable/security/approved-host gates.
- `confirmed`: Dex did not enable coordinated refresh, broaden OAuth/MCP permissions, change hosted MCP writes, upgrade Codex, or alter canonical Task/Result authority.

## Official sources

- OpenAI Codex PR #42128: https://github.com/openai/codex/pull/42128
- Codex changelog: https://developers.openai.com/codex/changelog
- Latest stable release checked: https://github.com/openai/codex/releases/tag/rust-v0.152.0

## Dex classification

### confirmed

Upstream groundwork now carries the selected OAuth refresh mode through managed MCP and event-stream connection setup, and treats a mode change as connection-identity change requiring replacement/reconnect. The capability is not stable-approved for Dex because it remains UnderDevelopment and disabled by default.

Dex authority stays unchanged: GitHub Task ID, `attemptId`, explicit approval where required, mutation lock, project realpath/digest, durable Result/receipt and detached verifier remain canonical.

### inference

Coordinated refresh ownership could reduce concurrent refresh races, stale credential reuse and reconnect/re-auth churn in long-lived MCP and future Work submit/status/result flows. The corresponding risk is cross-identity credential reuse or duplicate event/Task replay if refresh ownership or reconnection is not correctly bound to account/workspace/server/task identity.

### proposal

After a non-prerelease stable contains #42128 and a stable/public contract exists:

1. Verify one effective refresh owner under concurrent token expiry.
2. Verify account/workspace/server/runtime identity changes cannot reuse another identity's credentials.
3. Verify legacy/coordinated mode changes reconnect deterministically with no duplicate Task execution, event replay, stale connection reuse or duplicate Result publication.
4. Verify expired/revoked credentials fail closed without broader scope, alternate-account, paid API or hidden-auth fallback.
5. Verify access/refresh tokens, authorization headers and raw OAuth/provider payloads do not enter Dex logs, diagnostics, canonical receipts or user-visible errors.
6. Verify MCP event reconnect preserves idempotency, `attemptId`, monotonic status and GitHub Task Bus authority.
7. Record approved Windows-host and Work web/desktop/mobile PASS/FAIL/Not Checked before any enablement.

### unknown

- First non-prerelease stable containing #42128.
- Final stable refresh-owner/locking/retry contract.
- Approved Windows-host behavior.
- Work/mobile/desktop parity and lifecycle under reconnect/revoke/account rotation.
- Measured re-auth/reconnect reduction for Dex workloads.

## Runtime tracking

- Runtime PR #84: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/84
- Runtime Issue #83: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/83

## Verification

| Check | Result |
|---|---|
| Official PR #42128 metadata/diff | PASS |
| UnderDevelopment/default-disabled maturity | PASS |
| Latest official stable | PASS — `0.152.0` |
| Runtime PR #84 branch validation | PASS |
| Runtime PR #84 branch Vercel | PASS |
| Runtime change scope | PASS — documentation only |
| First stable inclusion | Not Checked |
| Approved Windows-host coordination E2E | Not Checked |
| Work/mobile/desktop parity | Not Checked |
| FAIL | none |

## Safety boundary

No `mcp_oauth_refresh_coordination` enablement, prerelease/experimental activation, Codex upgrade, broader filesystem/OAuth/MCP/app/workspace permission, hosted MCP write activation, paid API/automatic paid fallback/extra paid usage, plugin/Skill mutation, destructive migration or external messaging was performed.
