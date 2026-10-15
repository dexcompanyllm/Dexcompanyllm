# Codex experimental discovery + Windows relocation watch — 2026-09-03

## Official sources

- https://github.com/openai/codex/pull/42425
- https://github.com/openai/codex/issues/42424

This is the final fresh-cutoff addendum to `CODEX_0153_STABLE_POST_RELEASE_WATCH_20260903.md`.

## confirmed — PR #42425 server-discovered experimental features

TUI `/experimental` can now discover beta features from the active App Server. Server names/descriptions/configured values are shown in server order; unmappable controls are read-only; only changed locally writable flags are persisted. Discovery is bounded with timeout, pagination/page caps, repeated-cursor detection, deduplication and cancellation.

### Dex inference

Capability discovery is useful, but server presence or `enabled=true` is not Dex authorization. It must not override canonical GitHub policy or standing bans on experimental activation.

### proposal — tracked only

Before Dex relies on this in a future stable:

- bind discovery to the active provider server/thread identity;
- keep unknown/new features or changed defaults read-only until exact local mapping exists;
- require explicit Ethan approval + Dex risk Gate for any experimental feature activation;
- opening/refreshing/cancelling/timing out without an explicit approved delta must write zero config changes;
- preserve unrelated config when an approved delta is persisted;
- never let discovery broaden filesystem/network/OAuth/MCP permissions, paid usage, updater, multi-writer, external messaging or deploy authority.

### unknown / Not Checked

- first non-prerelease stable containing #42425;
- approved-host behavior and Work/Desktop/mobile parity.

No experimental feature or user Codex config is changed by this watch.

## confirmed signal / unknown root cause — Issue #42424

A Windows `26.831.2377.0` report records roughly six minutes of cold startup while thousands of `cua_node` files were synchronously relocated after per-file copy failures; App Server handshake was fast once relocation completed. This corroborates the #42412 runtime-relocation family with a severe-latency mode even when fallback copying eventually succeeds.

### Dex consequence

- Desktop startup duration/UI state is diagnostic, not canonical worker readiness;
- slow cold relocation must not trigger parallel relaunches, duplicate workers/Task claims or destructive staging cleanup;
- distinguish package/runtime preparation, renderer state, App Server readiness and worker heartbeat;
- PWA/GitHub Task Bus/status-result remains fallback during Desktop ambiguity;
- do not auto-prewarm, copy WindowsApps resources, alter ACL/EFS/OS protections, use alternate launchers or delete staging data based on an unconfirmed workaround.

### proposal — approved-host negative E2E

- zero mutation until the required worker is actually ready;
- timeout/slow preparation produces waiting/blocked evidence rather than repair or broader fallback;
- one worker/session/Task attempt maximum for one canonical attempt;
- later readiness resumes the same Task idempotently.

## Runtime application

Runtime tracking is prepared in branch `codex/watch-experimental-discovery-windows-relocation-20260903`, Runtime PR #144, and #28 future-stable/Windows-host Gate. Runtime CI/merge must be confirmed separately before Wiki #55 records it as PASS.

## Safety boundary

No experimental activation/config edit, Windows runtime repair/prewarm, broader permissions, paid fallback/reset/credits, provider/model switch, extra worker, deploy or external messaging is enabled.

## Verification status

| Check | Result |
|---|---|
| PR #42425 merge/scope | PASS |
| Issue #42424 official Windows/app/performance signal | PASS |
| #42424 maintainer root cause/fixed release | Not Checked |
| First stable containing #42425 | Not Checked |
| Runtime PR #144 CI/merge | Not Checked at Wiki-file creation time |
| Approved-host negative E2E | Not Checked |
| Wiki change | docs-only |
