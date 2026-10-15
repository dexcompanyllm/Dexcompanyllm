# Codex compaction, usage, Desktop, and Terra watch — 2026-09-03

Status: source-backed watch evidence / future approved-host gates. No capability, model routing, config write, paid usage, permission, browser/computer-use, provider fallback, external messaging, or deployment behavior is enabled by this evidence.

## Cutoff

Previous Dex cutoff: OpenAI Codex PR #42458 / Issue #42463. Fresh official merged-PR and commit checks found no merge after #42458. Latest non-prerelease release remains Codex `0.153.0`.

## Source-backed findings

### #42468 — Windows Desktop compaction/config regression signal

Classification: **confirmed official issue signal / root cause and fix unknown**.

OpenAI Issue #42468 is open with `bug`, `windows-os`, `context`, `app`, and `config` labels. The reporter says Windows Desktop 26.901 with ChatGPT auth and explicit `[features] remote_compaction_v2=false` routes compaction to legacy `/responses/compact`, receives 404, and then repeatedly fails once the thread is over the compaction threshold. The reporter's workaround (`true` or remove the override) and source-level root-cause analysis are not maintainer-confirmed.

Dex inference: stale user config can become operationally significant after a Desktop/runtime update. Before long-running Codex promotion, record effective compaction config/capability and fail closed on known-incompatible or ambiguous state. Do not auto-edit user `config.toml`; provider thread failure must recover through canonical GitHub Task/checkpoint/Result without duplicate worker or requirement re-entry.

Official source: https://github.com/openai/codex/issues/42468

### #42464 — stuck browser/tool call with reported allowance depletion

Classification: **confirmed official issue signal / usage causality unknown**.

OpenAI Issue #42464 is open with `bug`, `windows-os`, `rate-limits`, `tool-calls`, `app`, and `browser` labels. A Plus/Windows user reports a browser wait call remaining active for roughly 14 hours while 5-hour and weekly allowance decreased. There is no maintainer-confirmed attribution tying elapsed wall time or the stuck call to the reported metering.

Current OpenAI Help says Work/Codex usage depends on model, execution location, complexity, context, reasoning, speed, and tools; long-running work can use more than short requests, and an active turn may continue after a limit is reached subject to fair-use limits. Local wall time/token/tool counts are therefore diagnostics, not a billing formula.

Dex inference: preserve bounded deadline/interrupt/checkpoint behavior, add a no-progress tool canary to the approved-host E2E, and never use a suspected metering anomaly to authorize credits, resets, paid API, or automatic paid fallback.

Official sources:
- https://github.com/openai/codex/issues/42464
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

### #42472 — Windows Desktop submit/session regression signal

Classification: **confirmed official issue signal / root cause and fix unknown**.

OpenAI Issue #42472 is open with `bug`, `windows-os`, `app`, and `session` labels. The reporter says Desktop 26.901.20858 can leave an existing conversation's send control disabled/loading; a new conversation may send once but surface output associated with a previous prompt.

Dex inference: native composer state and provider thread output are UI/provenance only. Ambiguous submit must query canonical Task/idempotency/result before retry. Stale/previous-prompt output cannot satisfy current Task acceptance without Task/attempt/payload evidence. Track this in #34 before Work/Desktop/mobile intake is unblocked.

Official source: https://github.com/openai/codex/issues/42472

### #42476 — GPT-5.6 Terra early turn termination signal

Classification: **confirmed official issue signal / model-level causality unknown**.

OpenAI Issue #42476 is open with `bug`, `model-behavior`, and `app` labels. A Pro user reports Terra repeatedly ending a long task before an explicit completion condition while acknowledging remaining work. It is a single report and does not establish a model-policy change or fix.

Dex inference: provider turn end is never Dex completion. Acceptance criteria, deterministic evidence, and verifier verdict remain authoritative. Incomplete recoverable work continues/checkpoints under the same Task without user re-entry. Do not blanket-disable Terra or auto-switch models from this signal; add a representative long-task canary before changing routing. Current official guidance still positions GPT-5.6 Sol for flagship complex reasoning/coding and Terra for intelligence/cost balance.

Official sources:
- https://github.com/openai/codex/issues/42476
- https://developers.openai.com/api/docs/models

## Screened / not promoted

- #42471 custom Responses provider silently dropping custom tool calls on Windows: portability evidence only because Dex API-key/custom paid-provider execution remains prohibited. Future approval would require a dedicated tool-loop canary.
- #42466 and #42474 Browser/Computer Use reports: no current Dex permission or capability change because those paths remain separately gated/disabled.
- #42470 global task-authority fencing request: proposal only, not an OpenAI capability. Dex keeps GitHub Task Bus + one-writer claim + idempotency/attempt fencing + canonical Result and does not introduce a second authority.

## Approved-host / future gates

### Runtime #28

- record exact Desktop/App, running Codex, target stable, auth, effective feature/config summary, and approved host identity;
- detect explicit `remote_compaction_v2=false` or known-incompatible/ambiguous compaction route and fail closed without editing user config;
- prove representative compaction/recovery preserves one Task/attempt/writer and cannot repeat mutation or falsely complete;
- prove a synthetic stalled/unsupported tool call reaches bounded interrupt/cancel/checkpoint rather than unattended indefinite execution;
- keep account Usage state authoritative over local wall-time/token/tool diagnostics and preserve zero automatic paid fallback/reset/credit use.

### Runtime #34

- disabled/stuck native send outcome creates no duplicate Task and uses canonical status/idempotency lookup before resend;
- stale previous-prompt output cannot attach to the current Task without matching Task/attempt/payload evidence;
- Work/Desktop/mobile delivery remains non-canonical.

### Runtime #35

- Terra provider-turn termination cannot transition to `completed` before acceptance/evidence/verifier PASS;
- incomplete recoverable work resumes under the same Task ID without requirement re-entry or duplicate writer;
- any Sol↔Terra routing change needs representative workload evidence, stable/effective-model provenance, and subscription-first cost review.

## Explicitly not enabled

Automatic `config.toml` rewriting, `remote_compaction_v2` toggle, prerelease/experimental context, Browser/Computer Use/full CDP, broader filesystem/network/OAuth/MCP permissions, API-key/custom provider, paid API/fallback/credits/reset, automatic model switching, blanket Terra disablement, duplicate worker/fork recovery, provider SQLite/history deletion, destructive migration, external messaging, merge/deploy automation.

## Verification state

- Official issue existence/open state/labels for #42468/#42464/#42472/#42476: **PASS**
- Fresh merged-PR/commit check after #42458: **PASS — no newer merge at cutoff**
- Latest non-prerelease Codex: **PASS — 0.153.0**
- Maintainer-confirmed root cause/fix: **Not Checked**
- Approved Windows-host compaction/no-progress E2E: **Not Checked**
- Work/Desktop/mobile stale-submit parity: **Not Checked**
- Terra long-task canary: **Not Checked**
