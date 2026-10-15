# Codex WSL / Code Mode / App Server watch — 2026-09-03 23:32 KST

## Purpose

Source-backed watch evidence for official OpenAI/Codex developments after the previous cutoff (#42523). This note does not activate any capability.

Canonical heads at intake:
- Dex Wiki `main`: `ce2bf607f6dad4e3875092c50d6ac0a0d877ae41`
- Dex Runtime `main`: `12cac2f70e7c90d3607fe817982a1cfd10622a89`

## Confirmed

### OpenAI Codex #42528 — WSL2 device-auth final token exchange DNS divergence

Official source: https://github.com/openai/codex/issues/42528

- Reporter reproduced on `codex-cli 0.152.1` and `0.153.0` under WSL2.
- Device-code issuance, polling and browser approval succeed.
- Packet-level evidence shows the final OAuth token exchange resolving `auth.openai.com` through `127.0.0.1:53` rather than the configured WSL resolver; no listener exists there and the exchange fails before TCP connection establishment.
- The lower-level reason for the resolver choice is explicitly unresolved.

Classification: **confirmed signal / root cause unknown / fix Not Checked**.

### OpenAI Codex #42527 — Code Mode queue saturation treated as fatal disconnect

Official source: https://github.com/openai/codex/issues/42527

- Reporter observed `code-mode host outgoing queue is full` during long-running parallel-subagent work.
- The report states latest stable `0.153.0` and upstream `main` at `728cb12fe5794b0c3a8e776fb4994b1650b973a8` still contain the relevant `try_send` paths that turn transient `Full` into connection failure/recycle behavior.
- The reporter supplied an external patch and local tests, but no OpenAI maintainer merge/fix is confirmed.

Classification: **confirmed signal / reporter-supported code-path analysis / maintainer fix Not Checked**.

### OpenAI Codex #42526 — App Server fresh host input at sampling boundaries

Official source: https://github.com/openai/codex/issues/42526

- Feature request for an opt-in App Server capability allowing a running turn to ask its embedding host for fresh typed input immediately before model sampling and finalization.
- The proposal is intended to reduce races around `turn/steer`, external state, IDE diagnostics, CI updates and remote control.
- It is not implemented or released.

Classification: **proposal only**.

### Official release state

Official source: https://github.com/openai/codex/releases

- `0.153.0` remains marked Latest/non-prerelease.
- `0.154.0-alpha.1` is an official prerelease, released 2026-09-03; it is not an approved Dex operational target.

Classification: `0.153.0` **confirmed stable**; `0.154.0-alpha.1` **confirmed prerelease / operationally disabled**.

## Screened

- #42524 — rename threads from `/resume` picker: UX proposal; no canonical Dex state or execution contract impact.
- #42525 — Jira attachment upload integration: feature request outside the current Dex canonical path.

## Dex inference

1. A WSL device-auth approval event is not enough to prove usable subscription authentication. Dex must verify the final token exchange and authenticated CLI/App Server operation before accepting a WSL worker.
2. In high fan-out Code Mode, bounded queue saturation can be a provider backpressure condition rather than a canonical Task failure. Dex must preserve Task/attempt/checkpoint identity and must not start a duplicate writer merely because the provider host recycles.
3. #42526 is architecturally compatible with Zero User Re-entry and host-owned durable context, but Dex must not depend on it until OpenAI ships a stable, documented capability and approved-host E2E passes.

## Dex proposal / standing optimization application

- Keep prerelease/experimental Code Mode and broad multi-agent activation disabled.
- If WSL becomes an approved worker surface, require final OAuth exchange + authenticated command/App Server E2E; no DNS/proxy rewrite or API-key fallback is automatic.
- Add Code Mode/backpressure negative E2E to worker-expansion Gate: bounded fan-out, no lost/duplicated canonical Result, no second writer, checkpoint durability, deterministic reconciliation after host recycle.
- Track #42526 only as a future App Server simplification candidate; current GitHub Task Bus/idempotency/receipt authority remains unchanged.
- Do not import the reporter's external patch for #42527 unless OpenAI merges an official fix or Ethan separately approves a controlled fork review.

## Cost / security decision

No official pricing or usage-limit change requiring a Dex policy adjustment was confirmed in this cutoff. Subscription-first remains canonical. Paid API, automatic paid fallback, automatic credit/reset use, broader permissions, external messaging and destructive state repair remain disabled.

## Verification status

- Official #42526/#42527/#42528 source review: **PASS**.
- Upstream latest observed `main` commit: **PASS** — #42458 / `728cb12fe5794b0c3a8e776fb4994b1650b973a8`.
- Latest non-prerelease release: **PASS** — `0.153.0`.
- `0.154.0-alpha.1` prerelease existence: **PASS**; Dex activation **Not Checked / disabled**.
- Maintainer-confirmed fixes for #42527/#42528: **Not Checked**.
- Approved WSL auth E2E: **Not Checked**.
- Code Mode high-fan-out/backpressure E2E: **Not Checked / disabled**.

## Provenance

This note distinguishes official source facts from Dex inference/proposal. No model, config, permission, billing, Plugin/Skill, deployment or destructive mutation was changed by this watch.
