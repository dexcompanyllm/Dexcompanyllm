# Codex official incident + MCP auth challenge watch — 2026-09-04

## Scope

Source-backed follow-up after Runtime PR #166 / Wiki PR #144. This note records the official OpenAI incident acknowledgement, continued Codex 404 corroboration, and upstream MCP authentication challenge/no-replay behavior. It does not activate any Runtime capability.

## Official sources

- OpenAI Status incident: https://status.openai.com/incidents/01M1KWEDH417T2CF44YYHZDFCR
  - `Elevated errors across ChatGPT and Codex`.
  - Investigating at 2026-09-03 14:58 UTC.
  - Mitigation applied / Monitoring at 2026-09-03 15:22 UTC.
- OpenAI Codex PR #42552: https://github.com/openai/codex/pull/42552
  - merged 2026-09-03 15:14:23 UTC.
  - preserves `WWW-Authenticate` challenges as MCP `mcp/www_authenticate` error metadata.
  - preserves multiple challenges.
  - keeps successful silent refresh but does not automatically replay the rejected tool call when silent refresh fails.
- Continuing official issue corroboration:
  - #42559 https://github.com/openai/codex/issues/42559
  - #42561 https://github.com/openai/codex/issues/42561
  - #42563 https://github.com/openai/codex/issues/42563
  - #42564 https://github.com/openai/codex/issues/42564
- Latest official non-prerelease release: https://github.com/openai/codex/releases/tag/rust-v0.153.0

## Classification

### confirmed

- OpenAI now officially acknowledges elevated errors affecting both ChatGPT and Codex. This supersedes the previous cutoff's `current incident unknown` state.
- OpenAI says mitigation was applied and the incident is being monitored; full resolution is not yet confirmed at this cutoff.
- The same responses-route 404 continued across multiple OS/client/version/model combinations in the official Codex repository.
- PR #42552 is merged upstream and explicitly preserves MCP auth challenges while preventing automatic replay after failed silent refresh.
- Latest non-prerelease Codex remains `0.153.0`.

### inference

- The official incident acknowledgement strongly supports the prior provider/service-side interpretation of the clustered 404s, but OpenAI has not published a root cause.
- Provider health must be evaluated per relevant endpoint/capability. #42559 reports rate-limit account reads working while the responses route fails.
- PR #42552's no-replay behavior aligns with Dex one-writer/idempotency safety and should become a stable conformance requirement rather than an experimental dependency.

### proposal applied

- Keep the same canonical Task ID, attempt/checkpoint and durable result during provider incidents; do not create duplicate Tasks, writers, forks or results.
- Keep retries bounded. Exhausted retry leaves the same Task recoverably blocked with mutation 0.
- `Monitoring` on aggregate status does not alone authorize mutation resumption. Recheck authenticated capability health and resume the same Task/checkpoint once.
- Do not map route-level 404s to quota exhaustion or paid recovery actions.
- When a future stable contains PR #42552, treat `mcp/www_authenticate` as challenge metadata only; never as permission to broaden OAuth/MCP scopes.
- Failed silent MCP refresh must yield zero automatic replay of a rejected mutation-bearing call and zero duplicate mutation/result.

### unknown / Not Checked

- Incident root cause and full resolution.
- Exact affected tiers/models/regions.
- First stable containing PR #42552.
- Approved Windows-host provider blocked→same-Task recovery E2E.
- Stable MCP auth challenge/no-replay E2E.

## Dex implementation evidence

- Runtime PR #167: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/167
- Runtime merge SHA: `fb57ccf0945f8e632bf72bc937df8747cc96349a`.
- Runtime PR #167 scope: docs-only one file, +91 / -0.
- Runtime validation `33773059570`: **PASS** — dependency install, static checks, unit/smoke tests and production dependency audit all PASS.
- Runtime branch Vercel: **PASS**.
- Runtime merge Vercel: pending at the moment this source note was authored; verify before final completion reporting.
- Runtime #28 tracking updated for official-incident negative/recovery E2E.
- Runtime #34 tracking updated for future-stable MCP auth-challenge/no-replay conformance.
- Runtime executable/config/model/permission/billing changes: **PASS — none**.

## Safety / policy

GitHub canonical state, One Task ID / One Active Writer / One Canonical Result / Zero User Re-entry and subscription-first remain unchanged. No prerelease/experimental activation, paid API, automatic paid fallback, credit/reset action, broader permission, reinstall/downgrade, provider-state deletion, duplicate worker/fork, destructive migration, external messaging or automatic deploy is authorized by this watch.

Aggregate current-state/handoff/QA pointer files remain intentionally batch-synced under Wiki Issue #55 because this update does not change the operational #28/#34/#35 Gate: #28 approved Windows-host E2E remains Not Checked and #34/#35 remain blocked.
