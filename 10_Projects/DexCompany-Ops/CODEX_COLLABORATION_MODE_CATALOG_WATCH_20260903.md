# Codex collaboration-mode catalog watch — 2026-09-03

## Official source

https://github.com/openai/codex/pull/42401

## confirmed

OpenAI Codex PR #42401 is merged.

The TUI now requests `collaborationMode/list` from the App Server during startup and reconnect and uses the returned catalog for visible collaboration-mode selection. Discovery is optional and bounded by a two-second timeout, so unsupported/invalid/failed discovery does not block ordinary bootstrap.

Discovered modes survive ordinary model-catalog refresh. Selecting a server-provided mode clears restored developer-instruction overrides, and a `/plan` draft is retained when plan mode is unavailable instead of being silently submitted under another mode.

Latest official non-prerelease Codex remains `0.152.1`; #42401 is future-stable evidence only.

## inference

Server-owned collaboration-mode discovery can improve portability and reduce hard-coded TUI assumptions as planning/collaboration capabilities evolve. It also creates a new provenance boundary because a server mode can carry model/reasoning/developer-instruction defaults.

Dex should treat the catalog as capability metadata, not routing, permission, approval, billing or Task authority. Missing plan mode must preserve user intent rather than silently changing mode.

## proposal / future-stable gate

Runtime #35/#34 should verify after a containing stable:

- [ ] discovery timeout/error/unsupported/invalid response leaves bootstrap usable and creates no duplicate Task/worker;
- [ ] collaboration catalog is account/workspace/App-Server bound and refreshed on reconnect without identity bleed;
- [ ] model-catalog refresh preserves valid collaboration modes and does not silently change the effective mode;
- [ ] selecting a server mode clears stale restored developer-instruction overrides according to the stable contract;
- [ ] provider mode model/reasoning/developer-instruction defaults are revalidated against Dex model, cost, security and Task policies before protected execution;
- [ ] unavailable plan mode preserves the `/plan` draft and does not submit it in Default/another mode;
- [ ] mode switching cannot broaden filesystem/network/OAuth/MCP permissions, approval scope, paid route, plugin state or writer count;
- [ ] reconnect/mode refresh cannot replay submitted prompts, duplicate workers or replace canonical Task requirements;
- [ ] Work/Desktop/mobile/TUI parity is recorded PASS/FAIL/Not Checked before dependency.

## unknown / Not Checked

- first official non-prerelease stable containing #42401;
- actual production mode catalog for the approved account/workspace;
- Work/Desktop/mobile parity;
- approved-host reconnect/mode-selection E2E;
- final interaction with future Dex capability-routed workers and provider multi-agent features.

## safety boundary

No collaboration/multi-agent/planning mode, model/reasoning override, prerelease/experimental capability, broader permission, paid API/fallback, Plugin/Skill mutation, hosted write, external messaging, multi-writer or automatic merge/deploy is enabled by this watch.

## status

| Check | Result |
|---|---|
| OpenAI PR #42401 merge/scope | PASS |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Wiki change | evidence-only |
| First stable containing #42401 | Not Checked |
| Approved-host collaboration-mode E2E | Not Checked |
