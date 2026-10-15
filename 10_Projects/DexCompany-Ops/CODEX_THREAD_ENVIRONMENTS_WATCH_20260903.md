# Codex experimental Thread.environments evidence — 2026-09-03

## Official source

- https://github.com/openai/codex/pull/42386
- https://github.com/openai/codex/releases/tag/rust-v0.152.1

## confirmed

OpenAI Codex PR #42386 merged on 2026-09-02 23:43:36 UTC. It adds an **experimental** App Server `Thread.environments` field carrying each selected environment's environment ID, working directory, and runtime workspace roots for loaded threads. The field is populated from live thread state in start, resume, read, list, and unarchive responses. `null` indicates an unloaded thread, while an empty list indicates a loaded thread with no environment selection.

Upstream explicitly states that `Thread.environments` reports **selection, not connection status**, and does not change executor selection or resume behavior.

Latest official non-prerelease Codex remains `0.152.1`; this change is post-stable upstream evidence and is not enabled or promoted by Dex.

## Dex comparison

### confirmed

- Runtime #34 remains the future App Server/Work/mobile surface portability gate and stays blocked behind #28.
- Dex canonical Task/attempt, approved project→repository→realpath registry, explicit approval, mutation lock, actual executor/host verification, durable Result and independent verifier remain authoritative.
- Runtime PR #134 is docs-only and adds the stable/surface gate for #42386. Branch validation `33696760507` PASS: dependency install, static checks, unit tests, smoke test and production dependency audit all PASS. Branch Vercel PASS.

### inference

Exposing selected environments in ordinary thread responses can reduce stale UI reconstruction and improve portability/debugging across resume/list/unarchive flows. The main safety risk is treating selected metadata as proof that an environment is connected, eligible, authenticated, authorized, or the executor that will handle a turn.

### proposal — tracked only

After the first non-prerelease stable containing #42386, Runtime #34 should verify that `null`, empty, and populated selection states remain distinct; selected ID/cwd/workspace roots are mapped to the Dex approved project/realpath registry before mutation; selected metadata never substitutes for connection/readiness, account/workspace, executor identity/version, sandbox mode, or host trust; stale selection after reconnect/replacement cannot revive an attempt or route to an unapproved host; Windows/POSIX/remote path ambiguity fails closed; and Work/Desktop/mobile parity creates no duplicate Task/approval/worker/callback/Result.

Environment metadata should remain bounded/redacted and must not place credentials, secret values, or unnecessary local path details in canonical Result/telemetry.

## unknown / Not Checked

- first non-prerelease stable containing #42386;
- Work/Desktop/mobile surface parity;
- approved Windows-host environment selection vs connection/executor E2E;
- retention/privacy behavior beyond the App Server response contract;
- whether the field changes before stable release;
- Runtime PR #134 merge-SHA separate GitHub Actions;
- Wiki automated CI.

## Safety boundary

No experimental capability, environment selection, remote-host/executor switch, broader filesystem/network/OAuth permission, paid API/fallback, Plugin/Skill mutation, multi-writer, external messaging, destructive migration, automatic merge/deploy, or other high-risk side effect is enabled by this watch.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42386 merge/scope | PASS |
| Experimental status recognized / not enabled | PASS |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #134 scope | PASS — docs-only, 1 file, +64/-0 |
| Runtime validation `33696760507` | PASS |
| Runtime static/unit/smoke/dependency audit | PASS |
| Runtime branch Vercel | PASS |
| Stable App Server environment E2E | Not Checked |
| Wiki automated CI | Not Checked |

## Documentation policy

Aggregate current-state/QA/handoff/source files are not rewritten in this watch because the operational Gate is unchanged. DexCompany-Ops Issue #55 continues to track bounded provider-watch head drift until a functional Gate or meaningful batch-sync boundary changes.
