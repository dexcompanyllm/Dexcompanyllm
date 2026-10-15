# Codex 0.152.0 stable response — 2026-09-01

## Status

- Classification: `confirmed` release + `inference` impact + `proposal` gates
- OpenAI release: `0.152.0`
- Release channel: stable / non-prerelease
- Published: 2026-09-01T01:58:32Z
- Release commit: `316795b3cf2a45e90d121d9f46499d4658b2645c`
- Current Dex operational target before approved-host revalidation: `0.151.0`
- 0.152.0 role in Dex: next approved-host validation candidate, not auto-promoted

## Official sources

- https://github.com/openai/codex/releases/tag/rust-v0.152.0
- https://github.com/openai/codex/commit/316795b3cf2a45e90d121d9f46499d4658b2645c
- https://developers.openai.com/codex/changelog
- Post-release upstream watch: https://github.com/openai/codex/pull/41953

## Confirmed

OpenAI published Codex 0.152.0 as a non-prerelease stable release. Dex-relevant official release notes include:

- package-style MCP server names using `:`, `@`, `/`, `.` across CLI/auth
- per-tool MCP `output_token_limit` with resume-consistent truncation
- configurable App Server `thread/shellCommand` timeouts longer than one hour
- Guardian/automatic approval evidence, user instructions and answers preserved across compaction
- resumed cwd restoration and filesystem-permission preservation during metadata updates
- MCP tool availability across cache/remote-plugin refresh plus refreshed auth-helper headers
- Windows Microsoft Store PowerShell sandbox compatibility and terminal/JediTerm fixes
- cloud task backend URL/redirect hardening to protect saved credentials
- `update_plan` opt-in/default-off in stable
- stable Vim draft search
- actionable rate-limit banners for usage/credits/reset/plan management
- plugin-recommendation startup preloading

The full 0.152 release list also contains first-Node-REPL Guardian fast-start (#41666). Dex continues to treat it as security-sensitive and disabled.

The official Codex changelog now also lists `Codex CLI 0.152.0` under 2026-09-01. It briefly lagged the GitHub release during this run, then caught up before completion.

OpenAI PR #41953 (`633ab199cfd724aa78013c006b27a2b3d049fc3b`) merged after the 0.152 release commit. It strengthens Git-source allowlist enforcement for OpenAI-curated plugin catalogs across discovery, install, cached activation, Skill loading and startup sync. It is not classified as part of 0.152.0 and stays watch-only pending a later stable.

No new model, subscription pricing, usage-limit or paid-API policy change requiring a Dex cost-policy change was identified in this run.

## Inference

0.152.0 is a strong next candidate for Dex because it collects several improvements already tracked for Windows reliability, long-running App Server work, MCP interoperability, Guardian evidence continuity and cloud credential safety.

Immediate auto-promotion would still be premature. The approved Windows worker has not yet supplied the new stable's doctor/schema/model/host E2E evidence, and Dex's reliability objective favors one controlled revalidation before changing the recommended operational target.

The >1h shell timeout and MCP output limit can lower false timeout/rework and runaway-output cost respectively, but both need bounded cancellation/recovery/evidence tests before Dex changes defaults.

## Proposal applied

- Keep compatibility floor `0.150.0` unchanged for now.
- Keep operational recommended target `0.151.0` until Runtime #17 validates 0.152.0 on the approved Windows host.
- Treat 0.152.0 as the next stable validation candidate.
- Stable-included package-style MCP names/output limits remain gated by Runtime #18 E2E.
- Stable Guardian/update_plan/Vim behavior remains governed by Runtime #25 acceptance and Dex approval semantics.
- Long shell timeout behavior is added to Runtime #28 reliability/idempotency gates.
- Rate-limit banner actions remain read-only signals for Dex: no credit purchase, reset use, plan change, paid API or automatic paid fallback.
- First Node REPL fast-start remains disabled despite stable inclusion.
- PR #41953 curated marketplace policy remains Runtime #34 watch-only; do not auto-reconcile/install/update/delete plugins or broaden Git sources.

## Runtime application

Runtime PR #57 records the stable response and post-release curated marketplace watch, and Runtime PR #58 synchronizes the official changelog confirmation. Existing tracking Issues #17, #18, #25, #28 and #34 were extended non-destructively with future stable/approved-host acceptance checks.

No Codex installation, production capability, permission, paid usage, plugin mutation, deployment or Task authority was changed by this response.

## PASS / FAIL / Not Checked

- Official 0.152.0 stable verification: PASS
- Official changelog 0.152.0 entry verification: PASS
- Release-note / release-cutoff analysis: PASS
- Current Dex main comparison: PASS
- Runtime PR branch validation: PASS
- Runtime PR merge: PASS
- Approved Windows 0.152 doctor/compatibility/status: Not Checked
- Authenticated 0.152 schema/model-list E2E: Not Checked
- Windows Store PowerShell / terminal-query regression: Not Checked
- Package-style MCP and output-limit E2E: Not Checked
- Guardian compaction regression on approved host: Not Checked
- Long shell timeout cancel/recovery/idempotency: Not Checked
- PR #41953 future-stable inclusion: Not Checked
- FAIL: none in the documentation/tracking change

## Safety boundary

Do not auto-install/promote 0.152.0, enable prerelease/experimental features, broaden filesystem or marketplace permissions, use `plugin/reconcile`, install/update/delete provider plugins automatically, enable Browser/Computer Use/full CDP/Voice/Realtime, use paid API/fallback, purchase credits, consume banked resets, change plans or send external messages because of this release.
