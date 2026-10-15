# Codex steer continuity, long-task and quota watch — 2026-09-03

- Claim type: `source-backed + Dex inference/proposal`
- Verification status: `source reviewed / host E2E not checked`
- Evidence scope: OpenAI official `openai/codex` PRs/issues and official Codex release/pricing/help surfaces
- Current Dex operational effect: tracking and future gates only; no capability activation

## Source-backed findings

### PR #42445 — plugin measurement originator

Official source: https://github.com/openai/codex/pull/42445

`confirmed`: merged 2026-09-03T04:40:14Z. Plugin measurement inputs/events now include the turn `originator`, and upstream tests verify preservation in event payloads.

Dex interpretation: useful provenance/analytics metadata, but not authentication, authorization, approval, billing, Task identity or mutation ownership.

### PR #42451 — pending TUI steer acknowledgement by submission ID

Official source: https://github.com/openai/codex/pull/42451

`confirmed`: merged 2026-09-03T05:17:39Z. TUI submissions receive client message IDs, turn-start/steer requests carry them, pending IDs persist across input snapshots, and completion receipts prefer ID matching. Inactive-thread matching receipts are acknowledged before notifications can be discarded. Older App Servers retain content-based compatibility matching.

Dex inference: this directly improves provider-local idempotency for identical messages and cross-thread navigation, but provider submission IDs remain provenance. Canonical Dex authority stays GitHub Task ID + `attemptId` + idempotency key + payload hash + mutation lock + durable Result.

### Issue #42443 — no machine-readable clean Codex Web review completion signal

Official source: https://github.com/openai/codex/issues/42443

`confirmed signal / proposal-only upstream`: when Codex Web automatic review finds no issues, the reporter observes a reaction-only 👍 signal without a webhook/Actions completion event or reviewed commit SHA. The issue requests a machine-readable review/comment/check signal.

Dex inference: reaction-only clean-review state cannot be deterministic merge evidence. Existing detached verifier, CI and commit/diff-bound evidence remain authoritative.

### Issue #42444 — Windows Desktop repeated tool-call loop

Official source: https://github.com/openai/codex/issues/42444

`confirmed signal / root cause unknown`: Windows Desktop report with `bug`, `windows-os`, `mcp`, `tool-calls`, `app` labels describes repeated identical tool/connection actions and reconnect loops, including reproductions after a third-party MCP route was disabled.

Dex inference: bounded no-progress detection is required independently of provider UI so repeated provider calls cannot multiply side effects or burn shared allowance indefinitely.

### Issue #42447 — fresh CODEX_HOME concurrent first-run thread-index loss

Official source: https://github.com/openai/codex/issues/42447

`confirmed signal / current-stable applicability unknown`: reporter used CLI 0.150.1 on macOS. Six concurrent first-run sessions against a fresh `CODEX_HOME` sometimes produced only 1 or 5 rows in `state_5.threads`, while all rollout JSONL session files remained present and all processes exited successfully. A warmed home did not reproduce in the reporter's tests.

Dex inference: parallel reader/verifier fan-out must not race first-run state initialization. Provider SQLite thread indexes are recovery metadata, not canonical Task existence.

### Issue #42448 — quota-consumption anomaly report

Official source: https://github.com/openai/codex/issues/42448

`confirmed signal / causal claim unknown`: reporter on ChatGPT Pro with CLI 0.152.1 observed the same 11% usage-band movement with materially less locally measured token-weighted work and asked OpenAI to investigate. This is not maintainer-confirmed quota-formula or billing-policy evidence.

Dex inference: diagnose allowance anomalies with official Usage/rate-limit evidence plus bounded task/model/reasoning telemetry. Do not infer billing from local token counts or compensate with duplicate workers/paid fallback.

### Issue #42449 — compaction protocol/tool mismatch

Official source: https://github.com/openai/codex/issues/42449

`confirmed signal / current stable applicability unknown`: Desktop report with bundled CLI 0.150.0-alpha.8 says injected compaction guidance required `notes`/`history` tools that were not actually provisioned; `new_context` then discarded operational context, causing repeated external reads and token-heavy work.

Dex inference: experimental context management remains disabled. If tested later, declared checkpoint/recovery capabilities must exist before reset; otherwise fail closed while preserving the canonical Dex checkpoint.

### Issue #42450 — >1 MiB historical tool argument bricks task/fork

Official source: https://github.com/openai/codex/issues/42450

`confirmed signal / root cause-fix unknown`: macOS Desktop report shows backend validation rejecting historical tool-call `arguments` above 1,048,576 characters. Follow-ups, compaction and same-history fork all repeat the invalid item and fail before a model turn; a clean new task with sanitized summary is the reported workaround.

Dex inference: large provider-history payloads should be bounded/externalized. A corrupted provider thread must never cause successful Dex mutations to replay; recovery must bind a clean provider attempt to the same canonical Task only after checkpoint/result reconciliation.

## Stable, models and cost

`confirmed`: latest official non-prerelease Codex release checked for this watch is `0.153.0`.

`confirmed`: official OpenAI pricing/help continues to state that Codex and ChatGPT Work share plan allowance/credits, and usage depends on model, location, complexity, context, reasoning, speed and tools. This watch found no general pricing or usage-limit policy change that requires changing Dex subscription-first policy.

`proposal`: preserve `paidApiAllowed=false`, `automaticPaidFallback=false`, no automatic credit/reset use, and treat official Usage UI/rate-limit state as the cost authority.

## Dex future gates

### Runtime #28

- repeated equivalent no-progress tool calls must trip a bounded circuit breaker before unbounded retries;
- ambiguous mutation state must block rather than auto-retry, switch provider/model, or broaden permission;
- fresh profile-local `CODEX_HOME` initialization must be verified before parallel fan-out uses that home;
- provider SQLite/session projection must reconcile with durable rollout/session evidence and cannot create duplicate canonical Tasks;
- provider history/tool arguments must remain bounded; large payloads use bounded artifacts/references where supported;
- corrupted provider history recovery must persist a canonical checkpoint, reconcile prior mutations/results, then start a clean provider attempt without replaying successful side effects;
- approved Windows-host 0.153.0 negative E2E must record PASS/FAIL/Not Checked.

### Runtime #34

- plugin `originator` remains bounded provenance only and cannot broaden OAuth/MCP/filesystem/network permission or approval;
- Codex Web reaction-only clean review cannot satisfy merge/completion Gate; evidence must be machine-readable and commit/diff-bound, or Dex uses its own deterministic verifier/CI;
- stale review/reaction evidence is invalid after HEAD changes;
- cross-account/workspace/task plugin telemetry isolation is required.

### Runtime #35

- provider submission ID is bound to canonical Task ID, `attemptId`, idempotency key and payload hash;
- identical prompt text with different submission IDs cannot acknowledge/resubmit each other;
- inactive-thread receipt, reconnect, task switch and agent overview restoration cannot create duplicate canonical submission/mutation;
- old-App-Server content matching is weaker compatibility evidence and cannot authorize durable mutation without Dex idempotency confirmation;
- parallel readers/verifier must not fan out on an uninitialized shared `CODEX_HOME`;
- context reset is blocked if its required checkpoint/recovery capability is missing;
- provider history truncation/compaction failure cannot force repeated completed external reads or mutations.

### Runtime #37

- #42448 remains an anomaly signal only;
- allowance diagnostics separate official provider Usage/rate-limit state from local usage telemetry;
- material unexpected allowance consumption may checkpoint work but cannot trigger automatic credit purchase, banked reset, plan upgrade, extra paid usage, API key or duplicate-worker quota workaround.

## Safety boundary

No change in this evidence enables or performs:

- Codex prerelease/experimental activation or experimental context management;
- paid API/API-key/custom-provider execution, automatic paid fallback, credit/reset use or extra paid usage;
- broader filesystem/network/OAuth/MCP permissions, Guardian auto-approval or full/elevated/`danger-full-access`;
- plugin/Skill install/update/delete, remote marketplace mutation or legacy package deletion;
- multi-writer, external messaging, automatic merge/deploy or destructive migration;
- provider session DB/history repair, delete or truncate.

## Verification matrix

| Check | Result |
|---|---|
| PR #42445 merge/scope | PASS |
| PR #42451 merge/scope | PASS |
| #42443/#42444/#42447/#42448/#42449/#42450 official issue signals | PASS |
| latest official non-prerelease release | PASS — `0.153.0` |
| general pricing/usage policy requiring Dex change | none confirmed |
| maintainer-confirmed issue root causes/fixes | Not Checked |
| first stable containing #42445/#42451 | Not Checked |
| approved Windows-host / Work / Desktop / mobile E2E | Not Checked |
| operational Runtime capability/config/permission/cost change | none; tracking only |
