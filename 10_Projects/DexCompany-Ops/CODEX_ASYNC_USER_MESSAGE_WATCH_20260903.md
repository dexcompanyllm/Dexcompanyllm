# Codex asynchronous user-message evidence — 2026-09-03

## Official evidence

Classification: **confirmed**.

Source: https://github.com/openai/codex/pull/42354

OpenAI Codex PR #42354 merged to upstream `main` on 2026-09-02 20:43:03 UTC as `d6350e24be4d8151a090dd74811774618fe9ecd7`.

The PR adds `send_message_to_user_async`, a built-in control tool that lets an ongoing root-agent turn emit a concise free-form question or update without ending the turn or waiting for a reply. The item is emitted for asynchronous delivery; any reply arrives later as a separate user message. Empty messages are rejected.

Exposure is bounded upstream: only root agents can receive the tool, subagents cannot, and the active model catalog must explicitly opt into the exact experimental supported-tool name. The tool is independent of `request_user_input_async`. Upstream tests cover root/subagent gating, exact catalog opt-in, asynchronous emission without ending the turn, empty-message rejection and continued execution.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was PR #124 merge `dad41e4a4be2cd0bf5c637b9f058de7427d0f122`.
- Runtime PR #125 added one docs-only watch file and merged as `104cc47a3b6df08986afebfe3a74515330853335`.
- Runtime PR #125 scope: **1 file / +71 / -0**; no Runtime code, model catalog, messaging integration, permission, billing, Plugin/Skill or deploy behavior changed.
- Runtime validation `33681086652` PASS: dependency install, static checks/unit tests/smoke and production dependency audit all PASS.
- Runtime PR #125 branch Vercel and merge-SHA Vercel PASS.
- Runtime #34 and #35 remain tracked-disabled behind #28 approved Windows-host E2E.
- Dex canonical Task/Result/receipt and explicit approval broker remain authoritative; provider chat messages are not Task or approval authority.
- Latest official non-prerelease Codex remains `0.152.1`; #42354 is future-stable evidence only.

### inference

A root-only asynchronous attention channel could improve long-running Dex workflows by letting the Accountable Lead report a critical blocker, answer an in-flight status question or request missing information without ending the active turn. That can reduce unnecessary interruption and user re-entry.

The same feature is unsafe if delivery is confused with canonical state. Messages may arrive late or twice after reconnect, a reply may arrive after the originating attempt is stale, and an approval-like question could be mistaken for authorization even though the root turn continues immediately. The root-only/subagent-denied upstream boundary aligns with Dex's Accountable Lead architecture and should be preserved.

### proposal — tracked in Runtime #34/#35

Before Dex depends on a stable containing #42354:

- identify the first official non-prerelease stable and confirm actual model-catalog opt-in before treating the tool as available;
- do not force-enable the capability via prerelease, model-catalog mutation or provider recommendation;
- preserve Accountable Lead/root as the only Dex attention-message originator; reader/writer/verifier subagents must not independently create competing questions or approval prompts;
- bind each message to TaskId, attemptId, provider thread/turn/call identity, account/workspace/project and bounded purpose metadata without secrets or sensitive local paths;
- treat delivery status only as presentation evidence, never `completed`, `approved`, `cancelled`, `failed` or another canonical Task transition;
- delivery failure, replay, reconnect or surface parity failure must not rerun a worker or duplicate an underlying mutation;
- deduplicate/coalesce equivalent questions or blockers so fan-out does not spam the user or waste shared allowance;
- reject mutation from replies whose originating attempt is stale, cancelled, superseded or rolled back until the reply is revalidated against the current Task attempt;
- missing-information replies may become bounded continuity input, but delete/publish/permission/cost/external-side-effect actions still require the existing explicit Dex approval scope and mutation lock;
- a free-form async message cannot create, broaden or satisfy approval by itself;
- active-task status can be answered asynchronously, but canonical Result/receipt remains authoritative and recoverable from PWA/status-result fallback;
- completion/reconnect races cannot create a second completion callback or new Task;
- if the tool is unavailable on the current model/surface, use existing canonical Task/PWA/user-input/approval paths with no paid API, provider or permission fallback.

### unknown / Not Checked

- first stable containing #42354
- production model catalogs that opt into the tool
- ChatGPT desktop/Work/mobile rendering, notification and reply-binding behavior
- approved-host E2E across reconnect, stale-attempt, rollback, cancellation and completion races

## Safety boundary

No asynchronous messaging capability or model-catalog opt-in was enabled. No prerelease/experimental capability, external messaging, broader permission, paid API/automatic paid fallback, Plugin/Skill mutation, destructive migration or deployment was introduced.

## Validation

| Check | Result |
|---|---|
| OpenAI #42354 merge/scope | PASS |
| Root-only + exact catalog opt-in semantics | PASS — upstream implementation/tests inspected |
| Latest official non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #125 scope | PASS — docs-only, 1 file / +71 / -0 |
| Runtime validation `33681086652` | PASS |
| Runtime branch + merge Vercel | PASS |
| Runtime #34/#35 tracking | PASS |
| First stable/model-catalog opt-in containing #42354 | Not Checked |
| Approved-host/surface async-message E2E | Not Checked |

No FAIL is introduced.
