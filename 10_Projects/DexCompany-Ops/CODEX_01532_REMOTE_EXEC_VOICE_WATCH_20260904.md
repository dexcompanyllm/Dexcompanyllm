# Codex 0.153.2 / Remote Exec / Voice Watch — 2026-09-04

- Verification cutoff: 2026-09-04 08:09 Asia/Seoul
- Previous permitted cutoff: 2026-09-04 06:51 Asia/Seoul
- Evidence class: source-backed provider watch
- Operational activation: none

## Confirmed

### OpenAI Codex PR #42623

Merged to upstream `main` at 2026-09-04 07:18:05 KST.

- Authenticated Noise handshake must complete before JSON-RPC `initialize`.
- The handshake and initialization RPC share the configured initialization timeout.
- Failed handshake readiness terminates transport tasks.
- Tests cover stalled handshake timeouts, cleanup and shared-budget timeout reporting.

Source: https://github.com/openai/codex/pull/42623

### OpenAI Codex PR #42631

Merged to upstream `main` at 2026-09-04 07:55:00 KST.

- Adds Voice-host `initializeRuntime` for packaged GStreamer without opening audio devices.
- Loads runtime/plugins from physical package paths.
- Restricts plugin discovery, registry and native-library search paths.
- Uses a dedicated deadline and terminates the owned helper on cancellation/failure.

Source: https://github.com/openai/codex/pull/42631

### OpenAI Codex PR #42632

Merged to `release/0.153` at 2026-09-04 08:02:31 KST.

- Explicitly targets a `0.153.2` patch release.
- Changes only the GPT-6 Astra Fast description from `1.5x speed, increased usage` to `2x speed, increased usage`.
- OpenAI states that the text change does not alter execution and does not guarantee an exact speedup.
- Latest public non-prerelease release at this cutoff remains `0.153.1`; `0.153.2` is not yet published.

Sources:
- https://github.com/openai/codex/pull/42632
- https://github.com/openai/codex/releases

### Screened issue signals

- #42630 reports a macOS Desktop main-thread freeze while Markdown-parsing pathological ~24.8M-character task-preview metadata for sidebar titles. Reporter-tested bounding improved the local case, but latest-build reproduction and maintainer-confirmed fix are absent.
- #42628 reports stale unified-thread-catalog entries after deleted cloud chats or missing local rollouts. Manual provider-database surgery was used only as reporter recovery evidence and is not an approved Dex recovery pattern.

Sources:
- https://github.com/openai/codex/issues/42630
- https://github.com/openai/codex/issues/42628

## Classification

- `confirmed`: #42623 is meaningful reliability/security groundwork for future Remote execution.
- `confirmed`: #42631 is meaningful package/runtime-isolation groundwork for future Voice support.
- `confirmed`: #42632 establishes an intended `0.153.2` wording patch, not a published stable release or measured 2x guarantee.
- `inference`: one bounded authenticated startup budget plus cleanup on handshake failure reduces ambiguous startup/orphan-session risk.
- `inference`: Dex UI/task projections should stay bounded and reconstructable from canonical Task/Result state so pathological local metadata cannot become authority or cause task loss.
- `proposal`: first stable containing #42623 must pass stalled-handshake/shared-timeout/cleanup and duplicate writer/result = 0 E2E before Remote adoption.
- `proposal`: first stable containing #42631 must pass package-path isolation, environment filtering, no-audio-device preflight and helper cleanup before Voice adoption.
- `proposal`: evaluate `0.153.2` only after official non-prerelease publication; keep Astra Fast off by default until actual subscription account/effective-tier/value evidence exists.
- `unknown`: first stable containing #42623/#42631, final 0.153.2 contents, approved Windows-host behavior, Astra Fast quality/latency/allowance value for Ethan's account.

## Dex policy impact

No operational Gate is opened by these sources.

- Runtime #28 remains OPEN with approved Windows-host Phase 3 E2E Not Checked.
- #34/#35 remain blocked until #28 PASS.
- Remote execution, Voice, Browser/Computer Use and broader permissions remain disabled/tracked.
- Latest public stable remains `0.153.1` and is only a validation candidate until approved-host Doctor/compatibility/status/model-list/canary PASS.
- Astra/Fast must not be auto-selected from bundled catalog or descriptive speed text.
- API key, paid API, automatic paid fallback, extra paid usage and automatic credit/reset consumption remain prohibited.
- Provider DB/cache edits remain manual specialist recovery only; canonical GitHub Task/Result state remains authoritative.

## Validation

- PASS: #42623/#42631/#42632 official merge evidence verified.
- PASS: official releases cross-check shows `0.153.1` remains latest non-prerelease at cutoff.
- PASS: current Dex Runtime/Wiki main and minimum canonical contract/current-state context were re-read before this watch response.
- FAIL: none introduced by this evidence-only update.
- Not Checked: published `0.153.2`; first stable containing #42623/#42631; approved-host Remote/Voice E2E; Astra Fast account/effective-tier/value canary; maintainer fixes for #42630/#42628.

## Safety boundary

This evidence does not authorize prerelease or branch builds, Astra/Fast auto-selection, paid API/fallback, broader OAuth/MCP/filesystem/network permissions, Remote or Voice activation, Browser/Computer Use, provider database/cache surgery, destructive migration, legacy Skill/Plugin deletion, duplicate workers, external messaging or automatic deployment.
