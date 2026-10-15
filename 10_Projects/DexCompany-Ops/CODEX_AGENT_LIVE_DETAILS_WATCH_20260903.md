# Codex agent command-center live-task details watch — 2026-09-03

- Claim type: `source-backed + Dex inference/proposal`
- Operational effect: evidence/future gate only; no capability activation

## Official source

OpenAI Codex PR #42455 — https://github.com/openai/codex/pull/42455

`confirmed`: merged 2026-09-03T05:35:28Z. Agent command center now shows bounded selected-task previews for pending approval/user-input requests, live reasoning headings and latest agent messages; prefers the most urgent useful child-task detail; hydrates historical last messages from existing thread reads and live details from already-delivered events without extra thread attachment; clears stale previews after reverts, event-stream gaps, reconnects and thread lifecycle changes.

`inference`: this can improve multi-agent supervision and reduce missed blocked work without extra attachment overhead, but provider command-center previews remain UI projections. They are not canonical Dex Task state, approval, completion, priority or mutation authority.

`proposal`: future Runtime #35 E2E must bind displayed detail to canonical Task/attempt provenance; keep approval and completion gates independent; treat urgency as presentation only; revalidate after gaps/reconnect/revert/lifecycle changes; ensure historical previews do not cause extra attachments, duplicate workers, repeated reads or mutation replay.

`unknown`: first non-prerelease stable containing #42455 and Work/Desktop/mobile/TUI parity.

## Safety boundary

No change enables multi-writer, auto-approval, broader permission, prerelease/experimental functionality, paid API/fallback/credit use, extra thread attachments, external messaging, plugin/Skill mutation, deploy or destructive migration.

## Verification

| Check | Result |
|---|---|
| #42455 merged PR scope | PASS |
| latest official non-prerelease Codex | PASS — `0.153.0` |
| operational behavior/config/cost change | none; evidence only |
| containing stable | Not Checked |
| surface parity E2E | Not Checked |
