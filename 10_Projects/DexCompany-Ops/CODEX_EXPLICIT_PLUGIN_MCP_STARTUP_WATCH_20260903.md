# Codex explicit plugin/MCP startup watch — 2026-09-03

## Source

- Official OpenAI Codex PR #42406: https://github.com/openai/codex/pull/42406
- Dex Runtime evidence: `docs/CODEX_EXPLICIT_PLUGIN_MCP_STARTUP_WATCH_20260903.md`, Runtime PR #142

## confirmed

- OpenAI Codex PR #42406 merged on 2026-09-03 01:35:52 UTC.
- Explicitly mentioned selected plugin/MCP servers must now finish startup before the turn's model tool catalog is captured; unmentioned selected servers remain optional after the normal startup grace.
- Explicit mention identity persists across later samples, steering and same-turn restarts.
- Linked and structured plugin mentions are supported; `plugin://` identity is matched independently of display name.
- Targeting query parameters such as `app` and `browserFamily` are ignored for plugin **identity** matching.
- Latest official non-prerelease Codex remains `0.152.1`.
- Runtime PR #142 is docs-only and merged after validation `33704464594` PASS; static/unit/smoke/dependency audit and branch Vercel passed.

## Dex comparison

### confirmed

- Runtime #34 remains the future Work/mobile/plugin integration gate and stays blocked behind #28.
- Explicit plugin/MCP mention is routing intent only. It does not authorize install/enable/update, OAuth/MCP/filesystem/network scope, protected mutation, paid usage, provider switch or Task completion.
- Canonical Task/attempt, account/workspace, approved plugin package/version/endpoint, permission scope, mutation lock, explicit protected-action approval and canonical Result remain authoritative.

### inference

This change should reduce false “requested plugin unavailable” outcomes when startup or selected-environment attachment is slow, lowering user re-entry. The main risk is conflating identity normalization with target authorization or allowing an explicit mention to become an unbounded wait/implicit permission grant.

### proposal — tracked only

After the first stable containing #42406, Runtime #34 supported-surface E2E must verify bounded waiting for explicitly mentioned approved capabilities, non-blocking unmentioned servers, identity consistency across links/structured mentions/display-name changes, same Task/attempt across steering/restart, separate validation of `app`/`browserFamily` target scope, no implicit install/scope/paid/provider changes, clear blocked-capability behavior on startup failure, no similar-name substitution, and no duplicate calls/approvals/mutations/Results.

## unknown / Not Checked

- first stable containing #42406;
- exact bounded timeout/failure UX across Work/Desktop/mobile/CLI;
- supported-surface parity of steering/restart mention tracking;
- future marketplace/remote-environment interactions;
- target-query metadata parity across plugin surfaces.

## PASS / FAIL / Not Checked

| Item | Result |
|---|---|
| OpenAI #42406 merge/scope | PASS |
| Runtime PR #142 scope | PASS — 1 docs file / +71 / -0 |
| Runtime validation `33704464594` | PASS |
| Runtime static/unit/smoke/dependency audit | PASS |
| Runtime branch Vercel | PASS |
| supported-surface explicit-mention E2E | Not Checked |
| first stable containing #42406 | Not Checked |
| FAIL | none |

## Safety boundary

No plugin/MCP install, enable, update, deletion, marketplace mutation, OAuth/filesystem/network scope expansion, remote environment, provider/API-key route, paid API/fallback, model change, multi-writer, destructive migration or deployment was enabled.
