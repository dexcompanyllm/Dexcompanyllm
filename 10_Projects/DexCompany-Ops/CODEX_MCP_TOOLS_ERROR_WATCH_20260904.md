# Codex MCP tool-discovery status watch — 2026-09-04

- Claim type: provider capability watch
- Evidence scope: official OpenAI/Codex upstream after Runtime PR #170 / Wiki PR #148
- Runtime baseline: `272c6fb14efdee8a31dacc91d7f178a44ec0f056`
- Wiki baseline: `436cc42e19455bf032044d51ce5915ee50e533bf`
- Latest official non-prerelease Codex release at this cutoff: `0.153.0`
- Verification status: source-backed where marked confirmed; host behavior remains Not Checked

## Source-backed confirmed

OpenAI Codex PR #42598, merged `2026-09-03T18:38:15Z` as `8f31b64c7f9ef67d8f966bff5ddf9e08eafe0b4d`, adds nullable `toolsError` to `mcpServerStatus/list`.

The merged contract distinguishes:

- a successfully returned catalog, including a legitimately empty or cached catalog: `toolsError == null`;
- startup or tool-list discovery failure with no returned catalog: `toolsError` contains the failure text;
- mixed health: a broken server can report `toolsError` while healthy servers remain in the same status response;
- backward compatibility: older servers may omit `toolsError` and clients must preserve their prior behavior when the field is absent.

The upstream change updates protocol schemas/generated TypeScript types and adds an App Server integration test with one broken and one healthy MCP server.

Official source: https://github.com/openai/codex/pull/42598

## Additional official tracker screen

- Issue #42599 reports loss of the Windows Desktop `Approve for me` / Guardian auto-review option for one reporter on app `26.901.1978.0` / bundled `0.153.0-alpha.5`. OpenAI's issue automation points to older issue #42442 as a potential duplicate. There is no maintainer-confirmed cause, entitlement contract or fix at this cutoff. Source: https://github.com/openai/codex/issues/42599
- Issue #42600 requests an entropy-backed random-number function. It is an enhancement request rather than an implemented provider contract and does not change Dex state. Source: https://github.com/openai/codex/issues/42600

## Dex inference

1. `tools == {}` alone is ambiguous. A future Dex MCP diagnostic adapter should separately represent inventory outcome, `toolsError`, `runtimeStatus` and `authStatus` rather than collapsing them into one healthy/unhealthy flag.
2. PR #42598 can reduce false-positive readiness: a failed discovery no longer looks identical to a legitimate empty catalog.
3. It can also reduce unnecessary remediation: a healthy empty catalog should not trigger reconnect/reinstall/config mutation just because it contains zero tools.
4. Preserving healthy server inventory when another server fails fits Dex capability routing; one broken optional MCP server should not erase evidence for unrelated healthy capabilities.
5. Because #42598 is merged after `0.153.0`, this is future-stable evidence only and must not be required from the currently approved Dex host yet.

## Dex proposal

Track PR #42598 under Runtime issue #18 (`tracked-disabled` MCP runtime diagnostics) and require the following before activation:

- first official non-prerelease stable containing #42598 identified;
- approved-host read-only E2E for healthy non-empty, healthy empty, failed discovery and mixed healthy/broken server cases;
- backward-compatibility behavior when `toolsError` is absent;
- no server start/reconnect/login/config mutation triggered merely to collect diagnostics;
- bounded/redacted error text before Dex Console/evidence persistence, with tokens, secrets, local absolute paths, raw environment values and full stderr excluded;
- inventory, `toolsError`, `runtimeStatus` and `authStatus` stored as separate evidence dimensions.

## Unknown / Not Checked

- First official stable containing #42598.
- Real approved-host Windows behavior for the four diagnostic cases.
- Exact error-string shape/redaction guarantees outside the merged test fixtures.
- Whether #42599 is a rollout/entitlement change, a regression or only a duplicate/corroboration of #42442.

## PASS / FAIL / Not Checked

| Check | Result |
|---|---|
| Official latest stable | PASS — `0.153.0` |
| PR #42598 merged upstream | PASS |
| Protocol/schema has nullable `toolsError` | PASS |
| Healthy server inventory preserved alongside broken server | PASS — upstream integration test |
| Current Dex stable contains #42598 | Not Checked — future stable |
| Approved-host Windows MCP diagnostic E2E | Not Checked |
| Error redaction contract in Dex | Not Checked — adapter not active |
| New Dex runtime capability activated by this watch | PASS — none |
| FAIL | none |

## Safety / cost boundary

No prerelease/experimental promotion, paid API, automatic paid fallback, credit/reset use, broader filesystem/network/OAuth/MCP permission, hosted MCP write, automatic MCP reconnect/login, plugin/Skill mutation, destructive provider-state repair, duplicate worker/fork, external messaging, destructive migration or automatic deploy is authorized by this evidence.
