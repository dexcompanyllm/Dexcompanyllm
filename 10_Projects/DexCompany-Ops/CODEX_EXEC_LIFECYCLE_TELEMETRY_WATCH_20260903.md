# Codex attributed exec lifecycle telemetry evidence — 2026-09-03

## Official upstream evidence

Source:

- https://github.com/openai/codex/pull/42373

### confirmed

OpenAI merged PR #42373 on 2026-09-02 22:01:18 UTC. Exec Server/unified exec gain optional `ExecMetadata` plus bounded process/network-policy lifecycle telemetry.

The merged change:

- carries optional `threadId` and `toolCallId` from unified exec into Exec Server metadata;
- explicitly documents this metadata as attribution, not authorization;
- emits bounded OpenTelemetry lifecycle events for process start, spawn failure, sandbox denial, and exit;
- correlates those events to launch trace and registry-issued executor identity;
- preserves launch attribution across long-running processes and reconnects and attaches the same attribution to network-policy audit events;
- excludes arguments, paths, environment values, output, and error text from these lifecycle events;
- remains backward compatible when metadata is omitted;
- prevents invalid trace headers from inheriting an unrelated active span.

Latest official non-prerelease Codex remains `0.152.1`; this upstream-main change is future-stable evidence only.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was PR #130 merge `cb5872dbdbe3d5da38653fc88e11bc07b355c40e`.
- Runtime PR #131 merged as `a5e29030d54af3fe619c4728a7a4cf419bc68c56`.
- Runtime PR #131 scope is docs-only: one new Markdown watch file plus a tracking comment on Runtime #28; no executable/configuration change, telemetry export activation, external logging destination, permission, billing, Plugin/Skill, or deployment logic change.
- Runtime validation `33688427922` PASS: dependency install, static checks/unit tests/smoke, and production dependency audit all PASS.
- Runtime branch Vercel PASS before merge.
- Runtime #28 now tracks future-stable Task/attempt ↔ thread/tool-call ↔ executor attribution, reconnect lineage, payload-exclusion, malformed-trace rejection, and evidence-only semantics.
- Dex canonical authority remains Task/attempt, one active writer, explicit approval, mutation lock, canonical Result/receipt, and independent verification; provider telemetry cannot authorize mutation, publication, permission expansion, billing, or completion.

### inference

This upstream telemetry can improve Dex reliability and security diagnostics by making process/sandbox/network events attributable across long-running tasks and reconnects while avoiding command/environment payload capture. That can reduce ambiguous failure analysis and rework.

The useful property is inseparable from the privacy boundary. If later stable clients add argv, cwd/path, environment values, stdout/stderr, error text, credentials, or unrelated trace context, the same telemetry channel could create a data-leak risk. Dex should validate both attribution and negative payload exclusion before treating it as approved evidence.

### proposal — tracked, not enabled

After the first non-prerelease stable containing PR #42373, approved-host E2E should require:

- expected Task/attempt lineage matches provider thread/tool-call metadata and registry-issued executor identity for protected execs;
- reconnect/resume preserves launch attribution with no duplicate worker, process intent, mutation, Result, or callback;
- process-start/spawn-failure/sandbox-denial/exit and network-policy audit events correlate to the same expected lineage where applicable;
- omitted/legacy metadata remains compatible but is `unknown` / reduced observability, never inferred from unrelated tasks;
- malformed, stale, cross-task, or invalid trace headers cannot attach to another active span;
- lifecycle telemetry contains no command/argv, cwd/path, environment values, output/stdout/stderr, error text, credentials/tokens/private keys, or customer secrets;
- attribution metadata never bypasses approval, mutation lock, sandbox/network policy, cost controls, or canonical Result verification;
- missing/contradictory attribution cannot convert a protected failure into `completed`;
- any telemetry storage/export remains bounded and cannot introduce a paid/external destination without separate approval.

## unknown / Not Checked

- first official non-prerelease stable containing PR #42373;
- approved Windows-host/App Server telemetry schema and lifecycle E2E;
- reconnect attribution parity across CLI/Desktop/Work/mobile-mediated execution;
- actual retention/export destination and retention period on supported surfaces;
- whether future stable releases preserve the current payload-exclusion contract;
- Runtime PR #131 merge-SHA post-merge deployment status at evidence-file creation time;
- Wiki automated CI for this one-file evidence change.

## Safety boundary

No telemetry export, new external logging, prerelease/experimental feature, paid telemetry service, paid API/fallback, broader filesystem/network/OAuth/MCP permission, Plugin/Skill mutation, multi-writer execution, destructive migration, deploy change, or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42373 merge/scope | PASS |
| `ExecMetadata` attribution-not-authorization contract | PASS |
| Upstream payload-exclusion contract | PASS |
| Runtime PR #131 scope | PASS — docs-only, one file |
| Runtime validation `33688427922` | PASS |
| Runtime branch Vercel | PASS |
| Runtime PR #131 merge | PASS — `a5e29030d54af3fe619c4728a7a4cf419bc68c56` |
| Approved-host lifecycle/reconnect E2E | Not Checked |
| Telemetry retention/export policy | Not Checked |
| Wiki automated CI | Not Checked |
