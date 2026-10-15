# Codex safety-block recovery / usage watch — 2026-09-03 final cutoff

- verificationStatus: source-backed / watch-only
- claimType: provider update evidence
- verifiedAt: 2026-09-03
- verifiedBy: Jenny / ChatGPT automation
- operationalActivation: none

## Canonical context

Runtime #28 remains OPEN: Phase 1 PASS / Phase 2 PASS / Phase 3 implementation merged / approved Windows-host E2E Not Checked. Runtime Draft PR #157 remains open/draft and unmodified with physical Windows FAIL and Not Checked evidence. Runtime #34/#35 remain blocked behind #28. Subscription-first remains mandatory.

Latest official non-prerelease Codex remains `0.153.0`; upstream `openai/codex` `main` still has no merged commit after PR #42458 at this cutoff.

## #42523 — Windows task cannot resume after safety block

Source: https://github.com/openai/codex/issues/42523

Classification:

- confirmed: open issue with `bug`, `windows-os`, `app`, `safety-check`, `session` labels.
- confirmed: reporter says a Windows Desktop task stopped with provider message `Potentially unintended activity` after some local reports/backups/templates/code changes had already been saved.
- confirmed: the task was found archived and successfully unarchived, but the reporter explicitly says archival causality is unknown.
- confirmed: a follow-up asking to inspect saved state, avoid duplicates, preserve user data and respect safeguards reportedly hit the same safety block before a new assistant response or tool marker; saved local files reportedly remained readable.
- unknown: exact triggering operation, false-positive vs intended safety outcome vs session-recovery defect, supported remediation, maintainer fix, and approved Dex-worker applicability. App build/model were not verified.
- inference: a safety block is a control-plane boundary and must not trigger mutation replay, fresh-thread fork, automatic provider failover, permission broadening or safeguard bypass. Canonical Task/checkpoint/artifact evidence must survive provider session failure.
- proposal: use existing canonical `blocked` state with bounded/redacted safety reason; preserve same Task/attempt/checkpoint; publish only already-verified durable evidence; require duplicate worker/mutation 0 in recovery; keep provider thread/archive state non-canonical; only a provider-supported actionable remediation may request minimal new user action without re-entering original requirements.

## #42522 — Pro weekly usage reported exhausted in about four hours

Source: https://github.com/openai/codex/issues/42522

Classification:

- confirmed: open issue with `bug`, `rate-limits`, `app`; reporter identifies Desktop `26.825.51511` and says a ChatGPT Pro weekly allowance was exhausted in approximately four hours.
- confirmed: report includes a feedback ID but no detailed workload/model/context/tool mix, usage-page evidence or reproducible metering trace.
- unknown: metering defect, exact entitlement/workload factors, and any new official rate-limit or pricing formula.
- inference: elapsed wall-clock time is not an authoritative usage formula. Reporter/local estimates cannot supersede official OpenAI guidance and the account Usage UI.
- proposal: preserve subscription-first, bounded retry/no-progress and durable checkpoints; if Usage UI and expected workload appear inconsistent, classify `unknown` and stop at subscription boundary rather than buying credits, using a reset automatically, switching to paid API or spawning duplicate workers.

## Dex optimization decision

1. Track #42523 under #28 as a safety/recovery negative Gate without changing the existing state machine or attempting a safeguard workaround.
2. Treat #42522 as a meaningful cost signal but not a confirmed billing policy change; no routing or paid-use policy is changed.
3. Keep Runtime #28 open and #34/#35 blocked; preserve Draft PR #157 and unrelated user changes.
4. Keep aggregate current-state/QA/handoff files unchanged under Wiki #55 bounded-drift policy because this is watch-only evidence rather than a functional Gate transition.

## Verification status

- #42523 source/labels/reported sequence: PASS;
- #42523 root cause, supported remediation and approved-host reproduction: Not Checked;
- #42522 source/labels/reporter claim: PASS;
- #42522 metering defect/new formula: Not Checked;
- latest non-prerelease Codex: PASS — `0.153.0`;
- latest upstream merged `main`: PASS — PR #42458 remains latest;
- safeguard bypass, paid path, credit/reset consumption or broader permission activated: 0;
- FAIL introduced by this watch: none.

## Official sources

- OpenAI Codex issue #42523: https://github.com/openai/codex/issues/42523
- OpenAI Codex issue #42522: https://github.com/openai/codex/issues/42522
- OpenAI Codex releases: https://github.com/openai/codex/releases
- OpenAI Codex repository: https://github.com/openai/codex
