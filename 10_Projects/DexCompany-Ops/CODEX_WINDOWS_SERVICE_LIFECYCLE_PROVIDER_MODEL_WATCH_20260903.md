# Codex Windows sandbox service lifecycle / provider-model picker evidence — 2026-09-03

## Official evidence

### OpenAI Codex PR #42341

Classification: **confirmed**.

Source: https://github.com/openai/codex/pull/42341

PR #42341 merged to upstream `main` on 2026-09-02 19:52:20 UTC as `501931b3995983c1eb888933bd79adfd18fccc1e`.

OpenAI adds the Windows-only `codex-windows-sandbox-service` crate and integrates `CodexSandboxService` with the Windows Service Control Manager. The service owns start/stop/shutdown/status reporting and bounded event-log handling. Service mode is the default, debug builds may use `--foreground`, and provisioning IPC is intentionally disabled in this PR until authenticated request handling is installed. No unresolved PR review thread was observed after merge.

### OpenAI Codex issue #42340

Classification: **confirmed signal / unknown root cause and generality**.

Source: https://github.com/openai/codex/issues/42340

The issue was created 2026-09-02 19:46:15 UTC and is labeled `bug`, `extension`, and `aws-bedrock`. The report says the VS Code Codex model picker can replace Amazon Bedrock's provider-native model ID, for example `openai.gpt-5.6-sol`, with generic `gpt-5.6-sol`, after which requests and remote compaction fail with a provider-side 404. This is a user report rather than a maintainer-confirmed generalized product contract or root cause.

## Dex comparison

### confirmed

- Approved Runtime `main` before this watch was PR #120 merge `9e1ed6691f65741b685c87a2f8966b5b41afc0e5`.
- Runtime PR #121 added only `docs/CODEX_WINDOWS_SERVICE_LIFECYCLE_PROVIDER_MODEL_WATCH_20260903.md` and merged as `39ab5683306f6760b1ed818c734bf9d1d98e24bd`.
- Runtime PR #121 scope: **docs-only, 1 file / +92 / -0**.
- Runtime branch validation `33676893576` PASS: dependency install, static checks/unit tests/smoke, and production dependency audit all PASS.
- Runtime branch Vercel PASS and merge-SHA Vercel PASS. No separate merge-SHA GitHub Actions run was emitted, so that specific post-merge Actions check is Not Checked.
- Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E **Not Checked**.
- Runtime #34 remains blocked on #28; hosted submit/control and real cross-surface plugin/provider E2E remain disabled.
- GitHub Task Bus + Task/attempt/Result/receipt remains canonical. Provider service state, UI model labels and provider-specific model IDs cannot grant Dex approval, mutation, publication, OAuth, GitHub credential or paid-usage authority.

### inference

#42341 is a meaningful continuation of OpenAI's new Windows sandbox provisioning architecture. A Windows service can improve deterministic lifecycle and recovery, but service installation/startup identity, SCM permissions, executable integrity, restart semantics, event-log handling, and the boundary from lifecycle scaffolding to authenticated provisioning become security-critical. Because provisioning IPC is explicitly disabled in #42341, the change is not evidence to enable or operationally depend on the service yet.

#42340 reinforces a provider-adapter invariant: a model display choice is not sufficient execution authority. The effective model identifier must be validated in the context of the active provider before a turn, compaction, retry or resume. Dex remains OpenAI ChatGPT-subscription-first, so this report does not justify enabling Amazon Bedrock, API-key authentication or automatic provider fallback.

### proposal — tracked in Runtime #28

Before Dex relies on a stable containing #42341 on the approved Windows host:

- identify the first official non-prerelease stable containing #42341;
- verify service executable path/signature/provenance, service name and SCM configuration match the approved installation before startup;
- verify service start/stop/shutdown/restart transitions are bounded and do not create duplicate sandbox identities, network grants, Task attempts, approvals, writers or mutations;
- verify a missing/stopped/crashed service yields a bounded unavailable/blocked state with zero workspace mutation and no `danger-full-access`, permission broadening, WSL/Remote or paid fallback;
- verify release builds reject debug-only foreground mode and no development-only path is operationally required;
- verify event-log evidence is bounded and secret-safe and cannot become Task/approval authority;
- verify lifecycle availability is not treated as provisioning readiness while IPC remains disabled;
- after authenticated IPC is available, re-run the #42334/#42337 service-identity, framing, ACL/profile separation, proxy-policy and retry-idempotency gates together;
- keep Dex explicit approval, mutation lock, canonical Result/receipt and independent verifier above the provider service boundary.

### proposal — tracked in Runtime #34

For any future non-OpenAI provider integration or IDE/provider parity test:

- bind model selection to provider identity + provider-native model ID + normalized model family + reasoning settings + Dex Task/attempt, not a display label alone;
- verify the effective model ID is accepted by the active provider before turn/compaction/resume; incompatible or ambiguous mapping is `Not Checked/blocked`, not an automatic provider/model fallback;
- prevent a UI picker change from silently persisting an incompatible thread override across retry/resume/remote compaction;
- never use a provider/model mismatch to enable API keys, Amazon Bedrock, automatic paid/provider fallback or broader credentials;
- record requested vs normalized vs effective provider-model provenance without secrets;
- require web/desktop/IDE/mobile parity evidence before Dex depends on provider-specific picker behavior.

### unknown / Not Checked

- first official non-prerelease stable containing #42341
- approved Windows-host service lifecycle and authenticated-provisioning E2E
- maintainer-confirmed root cause/fix and affected-version range for #42340
- Dex non-OpenAI provider model-ID mapping E2E

## Stable / models / usage

Latest official non-prerelease Codex release remains `0.152.1`. The official ChatGPT & Codex changelog still has September 1 as the latest September release date. Current GPT-5.6 Codex model guidance and shared allowance/credit-pool usage guidance remain unchanged in this cutoff. No new official pricing or usage-limit change requires changing Dex subscription-first cost policy.

## Safety boundary

No Windows sandbox service installation/enablement, provisioning IPC activation, elevated sandbox, Amazon Bedrock, API-key auth, automatic provider/model fallback, broader filesystem/network/OAuth/MCP permission, prerelease/experimental capability, Plugin/Skill mutation, paid API/fallback/extra usage, reset/credit use, multi-writer, destructive migration, deploy or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI #42341 merge/scope | PASS |
| #42341 unresolved review threads | PASS — none observed |
| #42340 issue/labels/scope | PASS |
| Latest official non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #121 scope | PASS — docs-only, 1 file / +92 / -0 |
| Runtime validation `33676893576` | PASS |
| Runtime branch Vercel | PASS |
| Runtime merge Vercel | PASS |
| Runtime #28/#34 tracking | PASS |
| Runtime merge-SHA separate GitHub Actions | Not Checked — no separate run emitted |
| First stable containing #42341 | Not Checked |
| Approved Windows-host service lifecycle/provisioning E2E | Not Checked |
| #42340 maintainer-confirmed root cause/fix | Not Checked |
| Dex non-OpenAI provider model mapping E2E | Not Checked |

No FAIL is introduced.
