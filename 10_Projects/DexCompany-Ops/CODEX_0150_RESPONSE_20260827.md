# Codex 0.150.0 Response and Capability Tracking

- Date: 2026-08-27
- Status: Runtime merged / approved-host and capability E2E pending
- Runtime PR: `#22`
- Runtime merge: `b156bc6cc2dec8963e1f43d5e066c11fda8ee84d`
- Runtime validation run: `33022962598`
- Owner: Ethan

## 1. Request

Apply the Dex Company response in priority order for Codex stable `0.150.0` and create durable tracking for work that cannot or should not be enabled immediately.

## 2. Official evidence

### Confirmed

- Codex CLI stable `0.150.0` was published on 2026-08-26.
- The stable App Server `ListMcpServerStatusResponse.json` exports `runtimeStatus` with:
  - `notStarted`
  - `starting`
  - `connected`
  - `authenticationRequired`
  - `failed`
  - `cancelled`
  - `disabled`
- Codex `0.150.0` adds terminal task `@` mentions and task read/create/message workflow support.
- Codex `0.150.0` adds the `Interrupt` hook event with command or MCP tool handlers.
- Unfinished-turn suspension exists in Codex Core/release history, but a stable public App Server request for Dex Runtime use is not confirmed.
- `thread/turns/list` and `thread/items/list` remain experimental in the official App Server documentation.
- No additional official new model, pricing, or default usage-limit change was identified with this release.

### Official sources

- OpenAI Codex changelog: `https://developers.openai.com/codex/changelog`
- Codex stable release: `https://github.com/openai/codex/releases/tag/rust-v0.150.0`
- App Server documentation: `https://developers.openai.com/codex/app-server`
- Stable runtime-status schema: `https://github.com/openai/codex/blob/rust-v0.150.0/codex-rs/app-server-protocol/schema/json/v2/ListMcpServerStatusResponse.json`
- Stable hook configuration source: `https://github.com/openai/codex/blob/rust-v0.150.0/codex-rs/config/src/hook_config.rs`

## 3. Priority response

| Priority | Capability | Decision | Tracking |
|---|---|---|---|
| P0 | Approved-host Codex upgrade and worker validation | Execute only on approved local host; subscription login only | Runtime Issue #17 |
| P1 | MCP `runtimeStatus` | Stable schema support confirmed; keep read-only and disabled until thread-scoped E2E | Runtime Issue #18 |
| P2 | Task `@` mentions | Evaluate as execution reference only; GitHub Task Bus remains canonical | Runtime Issue #19 |
| P2 | `Interrupt` hook | Security prototype only; no hook config or side effect yet | Runtime Issue #20 |
| WATCH | Unfinished-turn suspension | Public stable App Server request not confirmed; disabled | Runtime Issue #21 |
| WATCH | Paginated thread history | Experimental; Production `experimentalApi` remains disabled | Runtime Issue #21 |

## 4. Runtime implementation

### Compatibility probe v3

- Adds tested stable minimum `0.150.0`.
- Distinguishes stable and prerelease SemVer.
- A prerelease does not satisfy the approved stable-host gate.
- Version recommendation is separate from generated-schema capability evidence.
- Older compatible schemas can still be inspected, but report `upgradeRecommended: true`.

### MCP runtime-status maturity

When the complete `0.150.0` schema is detected, Runtime reports:

```json
{
  "supported": true,
  "enabled": false,
  "maturity": "stable-schema",
  "activationState": "tracked-disabled",
  "stableSince": "0.150.0",
  "trackingIssue": 18
}
```

This does not start, reconnect, authenticate, or expose an MCP server. It records support only.

### Authority separation

- Dex MCP Gateway health is one authority.
- Codex worker's internal MCP runtime connection is another authority.
- Tool inventory must not be interpreted as a live connection.
- `null` runtime status is not automatically an error; it may mean no thread context or changed configuration.

### Tracking configuration

Runtime file:

`config/codex-capability-tracking.json`

Every new capability is currently `enabled: false` and linked to an open GitHub Issue.

## 5. Tracking Issues

- Runtime #17 — approved host upgrade to Codex 0.150.0 and worker validation
- Runtime #18 — read-only MCP runtime-status diagnostics
- Runtime #19 — task mention mapping to GitHub Task Bus
- Runtime #20 — Interrupt hook security prototype
- Runtime #21 — stable App Server contract watch for suspension and pagination

## 6. Security and cost boundary

- `Sign in with ChatGPT` subscription auth only.
- `OPENAI_API_KEY` and automatic paid fallback remain prohibited.
- Hosted MCP write policy is unchanged.
- No `Interrupt` hook is configured.
- No command, MCP, deployment, external-message, or payment side effect was added.
- Experimental App Server capability is not enabled.
- Codex task state is not canonical Dex state.
- Legacy Skill/Plugin removal is outside this response and remains blocked by approved-host forward tests and unique-content comparison.

## 7. Verification

### PASS

- Official stable release and schema reviewed.
- Runtime PR #22 merged to `main`.
- Static checks: 13 required files, 40 JavaScript syntax checks, JSON/dependency/secret scan PASS.
- Runtime tests: 171/171 PASS.
- Codex capability-tracking tests: 3/3 PASS.
- 0.149-style backward-compatible schema test PASS.
- 0.150 runtime-status stable-schema / tracked-disabled test PASS.
- Stable/prerelease version-ordering and release-policy tests PASS.
- Runtime smoke PASS.
- Vercel adapter smoke PASS.
- Rollback guard PASS.
- Production dependency audit: 0 vulnerabilities.
- Unresolved PR review threads: 0.
- Runtime `main` contains the capability-tracking configuration.

### FAIL

- None in the implemented and automated verification scope.

### Not Checked

- Approved physical host installation of Codex `0.150.0` or newer stable.
- Real generated schema on Ethan's approved host.
- Real authenticated `npm run codex:status` result.
- Thread-scoped `mcpServerStatus/list` E2E.
- Dex Console rendering of worker MCP status.
- Task mention mapping prototype and benefit measurement.
- Manual `Interrupt` hook security prototype and interruption E2E.
- Stable public App Server suspension contract.
- Stable paginated-history maturity.
- Post-merge direct Production HTTP smoke.

## 8. Approved-host handoff

Runtime Issue #17 is the next executable gate.

```powershell
npm install -g @openai/codex@0.150.0
codex --version

git pull --ff-only origin main
npm ci --no-audit --no-fund
npm run codex:compatibility
npm run codex:status
```

Expected evidence:

- stable Codex `0.150.0` or newer
- `compatibility.baseline.compatible: true`
- `releasePolicy.upgradeRecommended: false`
- `optional.mcpRuntimeStatus.supported: true`
- `optional.mcpRuntimeStatus.enabled: false`
- `modelCatalog.retirementReady: true`
- worker `ready: true`

## 9. Watchdog verdict

`PASS_WITH_WARNINGS` — stable support, defensive activation gates, automated validation, issue tracking and Runtime merge are complete. Host-dependent execution and side-effectful capability prototypes remain explicitly disabled and Not Checked.
