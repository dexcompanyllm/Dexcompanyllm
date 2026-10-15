# Codex backend 404 cluster watch — 2026-09-04

## Source scope

This note preserves source-backed evidence that arrived after the previous provider-watch cutoff at OpenAI Codex #42531. It does not authorize a new Runtime capability or provider route.

## Official sources

- OpenAI Codex #42532 — https://github.com/openai/codex/issues/42532
- OpenAI Codex #42533 — https://github.com/openai/codex/issues/42533
- OpenAI Codex #42534 — https://github.com/openai/codex/issues/42534
- OpenAI Codex #42536 — https://github.com/openai/codex/issues/42536
- OpenAI Codex #42537 — https://github.com/openai/codex/issues/42537
- OpenAI Codex #42538 — https://github.com/openai/codex/issues/42538
- OpenAI Codex #42541 — https://github.com/openai/codex/issues/42541
- OpenAI Status — https://status.openai.com/
- Official ChatGPT & Codex changelog — https://developers.openai.com/codex/changelog
- Official Codex release — https://github.com/openai/codex/releases/tag/rust-v0.153.0

## Confirmed

- #42532 reports Windows standalone Codex CLI `0.153.0`, ChatGPT Pro and `gpt-5.6-sol` failing against `https://chatgpt.com/backend-api/codex/responses` with HTTP 404 after updating; the report also shows the ChatGPT-auth usage endpoint and `codex_apps` MCP initialization returning HTTP 404.
- #42533 reports the same Codex responses-endpoint 404 from the current macOS VS Code extension and a login route error.
- #42534 reports the same endpoint 404 from macOS Desktop and states that ChatGPT web is affected on the same account.
- #42536 and #42537 report the same endpoint 404 from macOS arm64/Desktop. #42537 says all models and both existing and newly created conversations fail after an app upgrade.
- #42538 and #42541 add the same responses-endpoint 404 signature from additional Cloudflare edge identifiers.
- The reports span Windows CLI, macOS Desktop and IDE surfaces and multiple edge locations within a short cutoff window.
- At this cutoff OpenAI Status says systems are fully operational and no current issue is known.
- The official changelog/latest GitHub release still identifies Codex CLI `0.153.0` (2026-09-03) as the latest non-prerelease stable; no 2026-09-04 stable entry is present.

Classification: **confirmed multi-surface issue cluster / provider-wide root cause unknown / maintainer fix Not Checked**.

## Dex inference

A shared backend routing/service condition is more plausible than independent local corruption because distinct clients, OSes and edge identifiers report the same backend path at nearly the same time. This remains an inference: OpenAI has not published a matching current status incident or maintainer-confirmed root cause at this cutoff.

The simultaneous 404 of inference, usage and MCP/app paths in #42532 is not evidence that the user's allowance is exhausted. Provider connectivity, authenticated entitlement/usage, and local client readiness must stay separate evidence fields.

## Dex proposal applied to tracking

- Preserve the existing canonical Task ID, attempt/checkpoint and durable result evidence when this signature occurs.
- Treat it as a recoverable provider-connectivity block using the existing Runtime `blocked` state/reason mechanism; do not invent a new state enum in a watch-only change.
- Use bounded retry only. The same failed method/signature may be attempted at most twice without materially new evidence; then stop with mutation 0 and retain the Task for recovery.
- Do not create a duplicate Task, worker, fork or result as a connectivity workaround.
- Do not interpret an aggregate green status page as proof that a specific account/surface is healthy; likewise do not label the cluster a confirmed outage without OpenAI acknowledgement.
- Do not respond with reinstall/downgrade, `CODEX_HOME` reset, cache/provider-state deletion, repeated re-login, model switching, broader permissions, API-key routing, paid API, credit purchase/reset, or automatic paid fallback.
- After provider recovery, resume the same Task/checkpoint and verify stale attempt/result rejection before any mutation.
- Add a future approved-host negative/recovery E2E: provider 404 => bounded retries, mutation 0, durable blocked/checkpoint; recovery => same Task resumes once and produces one canonical result.

## Unknown / Not Checked

- OpenAI maintainer-confirmed root cause, scope, incident ID, mitigation or fix.
- Whether status publication is delayed, the condition is account/surface-specific, or it is a broader backend incident.
- Full geographic/build impact.
- Approved Dex Windows-host reproduction/recovery E2E.

## Verification state

- Previous canonical cutoff at Runtime PR #165 / Wiki PR #143: **PASS**.
- #42532 official details: **PASS**.
- #42534 official details: **PASS**.
- #42537 official details: **PASS**.
- #42533/#42536/#42538/#42541 same-signature corroboration: **PASS**.
- OpenAI aggregate status at cutoff: **PASS — green/fully operational**.
- Latest stable/changelog: **PASS — `0.153.0`; no newer stable identified**.
- Maintainer-confirmed root cause/fix: **Not Checked**.
- Approved-host provider-404 negative/recovery E2E: **Not Checked**.

## Safety and cost decision

Keep subscription-first, One Task / One Writer / One Canonical Result, zero automatic paid fallback and zero automatic credit/reset. Do not enable prerelease/experimental features, broader permissions, destructive repair, external messaging, provider failover after ambiguous mutation, or automatic deploy because of this signal.
