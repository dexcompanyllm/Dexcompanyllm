# Codex permission-profile discovery and generated CUA config watch — 2026-09-03

- Claim type: `source-backed + Dex inference/proposal`
- Verification: upstream reviewed; containing stable/approved-host E2E not checked
- Operational effect: tracking only; no permission/profile/browser/MCP activation

## PR #42453 — App Server permission-profile discovery

Official source: https://github.com/openai/codex/pull/42453

`confirmed`: merged 2026-09-03T05:26:50Z. The TUI permissions menu asynchronously discovers permission profiles and configuration requirements from the active App Server scope using the active thread working directory. Upstream covers loading/retry/empty/unsupported states, bounded pagination/request time, malformed-catalog rejection, stale-response rejection across account/thread/modal changes, and legacy fallback when explicit profiles are not configured. Server-rejected/unavailable profiles are disabled; remote custom profiles can be shown but are not yet selectable.

`inference`: provider permission catalogs improve portability and UX but are capability/configuration evidence, not Dex authorization. Availability must never broaden standing approval, Task/attempt scope, mutation lock, filesystem/network/OAuth/MCP scope or billing policy.

`proposal`: future #28/#34 E2E must verify active account/workspace/thread/cwd, server catalog/requirements and actual effective permission state separately; stale catalog responses are rejected; legacy fallback cannot widen permission; remote custom profiles remain non-operational until a later stable and explicit Dex approval/E2E cover them.

## Issue #42454 — generated cua_repl environment override persistence

Official source: https://github.com/openai/codex/issues/42454

`confirmed signal / root cause-fix unknown`: a macOS Desktop alpha report says generated `cua_repl` startup configuration replaces user-supplied configuration, so proxy-related environment overrides no longer reach the generated runtime after migration from `node_repl`. A copied full manual `cua_repl` definition can temporarily restore behavior but is fragile because executable/plugin paths are app-version-specific and startup regeneration replaces configuration. The reporter requests a stable environment-only override layer or non-destructive merge behavior.

`inference`: full generated-config replacement is an unsafe Dex workaround. It risks version-path drift and ambiguous browser/network boundaries.

`proposal`: do not automatically edit generated `cua_repl`, downgrade the app, broaden network permission or copy private proxy/credential data. If a proxy-required browser/computer-use route is later approved, require a supported stable overlay/merge mechanism and verify effective executor/network/Task identity after restart/update using synthetic non-secret fixtures.

## Stable/model/cost boundary

`confirmed`: latest official non-prerelease Codex at this cutoff remains `0.153.0`.

No model-routing or general pricing/usage policy change is required. Subscription-first, `paidApiAllowed=false`, `automaticPaidFallback=false`, and no automatic credit/reset use remain unchanged.

## Safety boundary

No action in this evidence:

- selects or enables a discovered permission profile;
- enables browser/computer-use or `cua_repl`;
- edits generated MCP/proxy configuration or inspects private proxy/browser credentials;
- enables prerelease/experimental functions, remote custom permission profiles or broader filesystem/network/OAuth/MCP access;
- installs/updates/deletes plugins or Skills;
- enables paid API/fallback, multi-writer, external messaging, automatic deploy or destructive migration.

## Verification matrix

| Check | Result |
|---|---|
| #42453 merged PR scope | PASS |
| #42454 official issue signal | PASS |
| latest non-prerelease Codex | PASS — `0.153.0` |
| operational permission/browser/config change | none; evidence only |
| first stable containing #42453 | Not Checked |
| #42454 maintainer-confirmed root cause/fix | Not Checked |
| approved-host/surface permission-profile and CUA E2E | Not Checked |
