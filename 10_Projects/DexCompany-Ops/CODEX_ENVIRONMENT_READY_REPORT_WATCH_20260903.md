# Codex accepted environment readiness report watch — 2026-09-03

## Source

- Official OpenAI Codex PR #42403: https://github.com/openai/codex/pull/42403
- Adjacent screened PR #42404: https://github.com/openai/codex/pull/42404
- Dex Runtime evidence: `docs/CODEX_ENVIRONMENT_READY_REPORT_WATCH_20260903.md`, Runtime PR #140

## confirmed

- OpenAI Codex PR #42403 merged on 2026-09-03 01:14:54 UTC.
- `Environment::last_ready_info()` now returns the most recently accepted `EnvironmentReadyInfo` snapshot.
- `None` means no Ready report has been accepted. An accepted Ready report with zero capability roots is a distinct state.
- Upstream explicitly states that the snapshot does **not** indicate whether the environment connection is healthy.
- Tests cover pending, ordinary, failed, recovered, replaced, empty and invalid readiness reports, plus snapshot immutability after later reports.
- This extends the environment-recovery line tracked from PR #42388 without turning readiness provenance into a liveness or authorization signal.
- Latest official non-prerelease Codex remains `0.152.1`; #42403 is not auto-promoted.
- PR #42404 merged on 2026-09-03 01:25:27 UTC and hardens Voice-helper frame parsing. Dex does not currently depend on the Voice-helper transport, so it was screened but does not create a Dex activation gate.

## Dex comparison

### confirmed

- Canonical GitHub Task/attempt, approved project/environment mapping, actual executor/connection checks, capability validation, mutation lock, explicit approval, Result and verifier evidence remain higher authority than provider environment metadata.
- Runtime #35 remains blocked behind #28 and is the correct future worker/environment E2E gate.
- Runtime PR #140 is docs-only and merged after Runtime validation `33704053473` PASS. Install dependencies, static/unit/smoke checks and production dependency audit passed; branch Vercel passed.

### inference

The new snapshot can reduce recovery ambiguity and repeated setup because Dex can distinguish “no accepted readiness evidence” from “accepted Ready with no capability roots.” The main risk is false confidence if the last accepted report is treated as live connection state after the environment later becomes unhealthy.

### proposal — tracked only

After the first non-prerelease stable containing #42403, #35 approved-host/remote-environment E2E should prove:

- [ ] no accepted report stays distinct from accepted zero-root Ready;
- [ ] invalid reports do not replace accepted evidence or install roots;
- [ ] captured readiness snapshots remain immutable evidence;
- [ ] newer Ready evidence does not change Dex Task/attempt, account/workspace, executor or approval scope silently;
- [ ] `last_ready_info()` is never used as liveness, authorization, billing or mutation authority;
- [ ] actual connection/executor readiness is checked immediately before protected execution;
- [ ] accepted roots map to the approved Dex project/environment registry;
- [ ] reconnect/recovery is bounded and idempotent with no duplicate worker, mutation, approval, callback or Result;
- [ ] contradictory readiness/connection/surface evidence yields `unknown` / Not Checked and mutation 0.

## unknown / Not Checked

- first stable containing #42403;
- approved Windows/remote readiness-provenance E2E;
- Work/Desktop/mobile parity or exposure;
- production retention/lifetime contract for accepted readiness snapshots.

## PASS / FAIL / Not Checked

| Item | Result |
|---|---|
| OpenAI #42403 merge and semantics | PASS |
| #42404 relevance screening | PASS — no Dex gate |
| latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #140 scope | PASS — 1 docs file / +78 / -0 |
| Runtime validation `33704053473` | PASS |
| Runtime static/unit/smoke/dependency audit | PASS |
| Runtime branch Vercel | PASS |
| approved-host readiness E2E | Not Checked |
| first stable containing #42403 | Not Checked |
| FAIL | none |

## Safety boundary

No remote environment, experimental capability, automatic reconnect policy, broader filesystem/network/OAuth/MCP permission, provider/API-key route, paid API, automatic paid fallback, Plugin/Skill mutation, multi-writer, external messaging, destructive migration or deployment was enabled.
