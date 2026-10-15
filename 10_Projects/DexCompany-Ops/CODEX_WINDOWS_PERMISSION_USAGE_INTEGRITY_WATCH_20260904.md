# Codex Windows Permission / Usage Integrity Watch — 2026-09-04

- Knowledge status: source-backed provider-watch evidence with bounded Dex inference/proposal.
- Previous completed provider-watch canonical checkpoint: Runtime PR #179 / Wiki PR #157.
- Quiet-window policy: no Dex Company search or monitoring from 23:00 through 05:59 Asia/Seoul. The 06:00 catch-up for this date was already reconciled before this checkpoint; all material items below appeared afterward.
- Runtime response: PR #180 merged as `9a5ee0dd1ab140d989d78611b99ba78b8c316be3`; branch validation `33830820156` PASS. Post-merge `main` validation run `33831030757` attempt 1 failed only at `Production dependency audit`; the single bounded rerun (attempt 2) PASSed install, static/unit/smoke and production dependency audit. Merge-SHA Vercel PASS. The connector did not expose the audit failure log, so the attempt-1 root cause is unknown; the immediate successful rerun is consistent with a transient external audit condition but does not prove one.

## Source-backed confirmed evidence

### OpenAI Codex issue #42659 — Windows read-only profile reportedly changes to Full Access

Official source: https://github.com/openai/codex/issues/42659

Created 2026-09-04 11:29:34 Asia/Seoul. GitHub labels the issue `bug`, `windows-os`, `sandbox`, `app`, and `session`.

Reporter scope:

- Windows x64 / Codex Desktop `26.901.20858`;
- bundled Codex CLI `0.153.0-alpha.5`;
- custom default permission profile extending `:read-only`, network disabled, approval `on-request`;
- after an ordinary turn and without a user-selected elevation, the reporter says the task UI switched to Full Access and the next effective turn arrived with `:danger-full-access`, disabled sandbox and approval `Never`;
- manually restoring the custom profile reportedly fixes one turn but can drift again.

**Evidence boundary:** confirmed public issue report only. Maintainer-confirmed root cause/fix, stable `0.153.2` applicability, standalone CLI/App Server applicability, and Ethan-approved-host reproduction are Not Checked.

### OpenAI Codex issue #42658 — quota display reportedly remains at 100% until exhaustion

Official source: https://github.com/openai/codex/issues/42658
Possible duplicate surfaced by repository automation: https://github.com/openai/codex/issues/42300

Created 2026-09-04 11:27:43 Asia/Seoul. Reporter scope is Windows 11 / Codex App `26.903.11416` / ChatGPT Plus. The reporter says the displayed remaining quota stayed at 100% and later the service abruptly reported an exhausted limit. GitHub labels it `bug`, `windows-os`, `rate-limits`, and `app`.

**Evidence boundary:** this supports a client/account-state mismatch signal; it does not establish a general server-side accounting defect or Ethan's current account state.

### OpenAI Codex issue #42660 — weekly quota/reset reconciliation reportedly changes without corresponding local activity

Official source: https://github.com/openai/codex/issues/42660

Created 2026-09-04 11:39:56 Asia/Seoul. Reporter scope is ChatGPT Plus with local CLI `0.151.0`. The reporter records a changed weekly reset anchor and later quota depletion while citing no corresponding local thread/log/rollout activity for the interval. The issue itself lists multiple possible explanations, including delayed reconciliation, server-side activity not represented locally, or incorrect attribution.

**Evidence boundary:** meaningful usage-integrity signal only. Backend ledger cause and broad reproduction are unknown.

### OpenAI Codex PR #42657 — generic fallback model name in status test

Official source: https://github.com/openai/codex/pull/42657

Merged 2026-09-04 11:26:41 Asia/Seoul. The changed file is one TUI status test; one fixture string changes from `mewfour` to `examplemodel`.

**Interpretation:** this is not evidence of model catalog availability, model retirement, model promotion or default-model routing change.

## Stable / model / pricing / usage-policy status

- Latest official non-prerelease Codex release remains `0.153.2`: https://github.com/openai/codex/releases/tag/rust-v0.153.2
- No newer official stable was identified in this interval.
- No newly dated general pricing or usage-limit policy change requiring a Dex cost-policy change was identified.
- Existing official plan guidance remains the reference for usage UI, `/status`, allowance/reset behavior and support escalation: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Dex subscription-first policy, paid API disabled, automatic paid fallback disabled, automatic extra paid usage disabled and Ethan-controlled banked reset remain unchanged.

## Dex classification

### confirmed

- #42659 is a security-relevant Windows Desktop issue report of unexpected permission-state broadening between turns.
- #42658 and #42660 are fresh official-repository reports of disputed/inconsistent quota display or reconciliation behavior in the reporters' environments.
- #42657 has no real model-routing effect.
- Current official stable remains `0.153.2`.

### inference

- Saved profile/UI labels should not be the mutation authorization source after resume, rehydration, restart or surface transitions. The effective sandbox/approval state should be checked against the canonical Task's approved risk envelope before mutation.
- Conflicting usage surfaces should be treated as uncertain operational data rather than guessed remaining allowance. This reduces surprise interruption, duplicate work and pressure to use paid fallback.

### proposal

- On approved Windows-host E2E, verify effective sandbox/approval on new, resumed, rehydrated and continued mutating turns. Unexpected `danger-full-access`, disabled sandbox, `approval=never`, broader network/filesystem grants or an unknown profile must fail closed before mutation.
- When Usage UI, `/status`, provider rate-limit metadata or actual service behavior materially conflict, record remaining allowance/reset state as `unknown`, preserve Task/checkpoint, avoid optional duplicate/high-cost starts and do not auto-use reset/credit/plan/API fallback.
- Any future support package must be sanitized and external submission remains subject to Ethan's decision.

### unknown

- Ethan-approved-host reproduction of #42659.
- Stable `0.153.2` / standalone CLI/App Server applicability of #42659.
- Maintainer-confirmed root causes/fixes for #42659/#42658/#42660.
- Ethan's current account/workspace usage ledger and exact reset state.
- Exact root cause of Runtime validation `33831030757` attempt-1 dependency-audit failure; attempt 2 passed.

## Dex operational effect

No operational Gate changes are authorized by this watch:

- Runtime #28 remains OPEN: Phase 3 implementation merged, approved Windows-host E2E Not Checked.
- Runtime #34/#35 remain blocked until #28 PASS.
- GitHub Task Bus remains canonical Task authority.
- Provider UI/session/profile state remains non-canonical.
- No prerelease/experimental activation, permission expansion, API key, paid API/fallback, banked reset use, credit/plan change, external messaging, destructive migration or provider-database repair is authorized.

## Validation record

- PASS: official #42659 source/labels/reporter scope verified and bounded to reporter evidence.
- PASS: official #42658/#42660 source and reported quota symptoms verified and bounded to reporter evidence.
- PASS: #42658 possible-duplicate relation to #42300 verified.
- PASS: PR #42657 changed-file scope verified; no actual model/default change.
- PASS: current official non-prerelease release remains `0.153.2`.
- PASS: Runtime PR #180 changes exactly one documentation file and does not alter executable/config/model-routing/permission/billing/capability code.
- PASS: Runtime PR #180 branch validation `33830820156`; install, static/unit/smoke and production dependency audit all succeeded.
- PASS: Runtime PR #180 branch Vercel deployment status succeeded.
- FAIL (attempt 1, superseded by bounded retry): Runtime post-merge validation `33831030757` attempt 1 failed only at `Production dependency audit` after install and static/unit/smoke PASS; exact root cause Not Checked because failure logs were not available through the read connector.
- PASS: Runtime post-merge validation `33831030757` attempt 2; install, static/unit/smoke and production dependency audit all succeeded.
- PASS: Runtime merge-SHA Vercel deployment status succeeded.
- Not Checked: approved-host permission-continuity E2E, Ethan-specific usage state, maintainer-confirmed fixes.
- Final unresolved FAIL: none in this source/tracking batch.
