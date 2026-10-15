# Codex GPT-6 Astra / App Server / Remote watch — 2026-09-04

- Evidence type: source-backed provider watch
- Runtime implementation reference: PR #172 / merge `091538c2a566417e42e16d5707c0b1504d28a03d`
- Prior canonical Wiki baseline: `74dbafa9107ff9dea25e11ecec86088bbec31648`
- Operational activation change: none

## Summary

OpenAI introduced GPT-6 Astra and Codex upstream merged model-catalog support plus a `release/0.153` backport described as intended for a `0.153.1` hotfix. At this cutoff, official Codex GitHub releases still show `0.153.0` as the latest published non-prerelease stable, so Astra is **not** promoted as a current approved Dex worker capability solely from upstream source evidence.

The same cutoff also contains an App Server deprecation for detached review delivery, trusted-header support for remote exec WebSockets, condensed TUI startup warnings, and a multi-agent restart/history desynchronization issue. Dex records these as future-stable and approved-host gates without enabling broader permissions, Remote, Browser/Computer Use, prerelease code, paid API, credits, or automatic paid fallback.

## Official sources

### GPT-6 Astra

- Model page: https://developers.openai.com/api/docs/models/gpt-6-astra
- Work/Codex rollout and plan usage: https://help.openai.com/en/articles/20001275-chatgpt-work-and-codex
- Business/Enterprise/Edu Work/Codex rate card: https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu
- Safety / Preparedness: https://openai.com/index/path-to-astra/
- Codex main catalog: https://github.com/openai/codex/pull/42607
- Codex `release/0.153` backport: https://github.com/openai/codex/pull/42605
- Current release page: https://github.com/openai/codex/releases/tag/rust-v0.153.0

### App Server / Remote / workflow

- Detached review deprecation: https://github.com/openai/codex/pull/42602
- Trusted remote-exec WebSocket headers: https://github.com/openai/codex/pull/42606
- Condensed TUI startup warnings: https://github.com/openai/codex/pull/42609
- Multi-agent Goal restart/history desync signal: https://github.com/openai/codex/issues/42604

## Classification

### confirmed

- OpenAI describes GPT-6 Astra as its most capable model for difficult end-to-end work and is rolling it out first to selected enterprise access, with Plus, Pro, Business and Enterprise access coming in following days.
- Once Astra is available, Work/Codex uses the plan's included allowance; OpenAI warns Astra can consume allowance faster than GPT-5.6 Sol.
- Buying credits does not provide early rollout access.
- The published flexible Work/Codex credit rate card makes Astra materially more expensive per token than Sol/Terra/Luna and lists Astra Fast at 2.5x Standard for Work/Codex credit usage.
- OpenAI says Astra meets the Critical cybersecurity capability threshold under its Preparedness Framework.
- Codex PR #42607 is merged to `main` with a hidden `gpt-6-astra` bundled model entry; generic TUI snapshots remain pinned to `gpt-5.6-sol`, so the PR is not evidence of a visible/default model switch.
- PR #42605 is merged to `release/0.153` and explicitly says the release line needs the Astra catalog update for a `0.153.1` hotfix.
- At the cutoff, the latest published non-prerelease Codex GitHub release remains `0.153.0`.
- PR #42602 deprecates `review/start` with `delivery:"detached"` while preserving compatibility and pointing callers to a separate `thread/start` plus inline review.
- PR #42606 adds trusted host-owned HTTP header support to remote exec WebSocket handshakes, reconnect retention, redaction, header validation, non-loopback `wss://` enforcement and loopback restrictions.
- PR #42609 changes TUI warning presentation without removing full transcript warning details.
- Issue #42604 reports durable rollout/history-projection divergence after restart in a large multi-agent Goal workload on bundled CLI `0.152.0`.

### inference

- Astra can reduce rework for the hardest tasks, but making it a blanket default would likely reduce subscription efficiency because Work/Codex allowance can be consumed faster.
- Astra's Critical cyber capability designation strengthens the case for Dex's existing least-privilege, explicit approval, one-writer, independent verification and fail-closed boundaries; it is not a reason to relax them.
- Provider UI history/projection cannot be the sole durable authority for multi-agent execution; GitHub Task/attempt/result state remains canonical.
- Trusted remote headers can improve authenticated remote portability, but model/user-controlled header values or cross-destination forwarding would create a credential boundary risk.
- TUI layout should not be parsed as canonical diagnostics because upstream presentation can change independently of structured App Server/Doctor state.

### proposal

- Keep Astra `tracked-rollout` until both the actual authenticated Codex `model/list` exposes it and an official non-prerelease stable containing the model catalog is installed/validated on the approved host.
- After those conditions, run a bounded representative canary and compare quality/rework plus usage evidence against Sol before changing model-routing preference.
- Do not set Astra as the global default from model name or source-code evidence alone.
- Keep Astra Fast off by default unless concrete latency value justifies higher usage and current account Usage evidence has been checked.
- Continue subscription-first ChatGPT sign-in. Do not use an API key, buy credits, enable auto-reload or automatic paid fallback to get Astra or extend usage.
- Preserve sandbox, filesystem/network/OAuth/MCP scope and independent verification when using a stronger model.
- If provider-specific review integration is added after a containing stable, prefer `thread/start` + inline review rather than deprecated detached delivery. Preserve rollback/legacy compatibility until a separate migration decision.
- If trusted remote headers are ever adopted, require host-owned allowlists, secret-grade redaction, exact destination binding, reconnect isolation and approved-host E2E before activation.
- Require #35 multi-agent restart/resume fault injection with stale-turn rejection, bounded fan-out, no duplicate writer/result/mutation and no continued work after explicit stop/pause.

### unknown / Not Checked

- Exact first published non-prerelease Codex stable containing #42602/#42606/#42607/#42609.
- Publication and final contents of the stated `0.153.1` hotfix.
- Astra availability in the user's actual authenticated Codex catalog.
- Approved Windows-host Astra execution and quality/allowance comparison.
- Approved-host trusted-header behavior.
- Whether issue #42604 reproduces on `0.153.0` or later, and its maintainer-confirmed root cause/fix.

## Dex impact

### Applied now

- Runtime PR #172 merged a docs-only future-stable/approved-host gate.
- No operational model switch or provider capability was activated.
- No current #28/#34/#35 Gate was promoted.
- No paid API, credits, automatic fallback, prerelease, broader permission, Remote, Browser/Computer Use, plugin/Skill mutation, external messaging or destructive migration was enabled.

### Required future evidence

1. Official non-prerelease stable containing Astra catalog support.
2. Actual authenticated account `model/list` visibility for `gpt-6-astra`.
3. Bounded subscription-only canary with requested/observed model, reasoning, quality/rework and usage evidence.
4. Stable App Server review migration contract before any provider-specific detached review dependency.
5. Remote trusted-header threat-model/E2E before any adoption.
6. Multi-agent restart/resume recovery evidence before Runtime #35 activation.

## Validation state

- Official provider/source comparison: **PASS**
- Runtime PR #172 docs-only scope: **PASS**
- Runtime branch validation `33803279683`: **PASS** — dependency install, static checks, unit/smoke tests and production dependency audit
- Runtime branch Vercel: **PASS**
- Runtime merge-SHA GitHub Actions: **Not Checked** — no separate run observed at merge time
- Runtime merge Vercel: **pending at Wiki intake; recheck before final report**
- Wiki automated CI: **Not Checked** unless a workflow appears for this branch/PR
- Operational Astra / remote-header / multi-agent restart E2E: **Not Checked**
- FAIL: **none from the applied docs-only change**
