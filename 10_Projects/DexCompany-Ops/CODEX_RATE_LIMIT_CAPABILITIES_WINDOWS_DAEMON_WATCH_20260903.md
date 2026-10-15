# Codex usage-capability + Windows daemon evidence — 2026-09-03

## Official upstream evidence

Sources:

- https://github.com/openai/codex/pull/42358
- https://github.com/openai/codex/pull/42364
- https://github.com/openai/codex/issues/42357
- https://github.com/openai/codex/releases/tag/rust-v0.152.1
- https://help.openai.com/en/articles/20001499-luna-reserve-in-codex-and-chatgpt-work
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

### confirmed — PR #42358

OpenAI merged PR #42358 on 2026-09-02 21:03:27 UTC. `account/rateLimits/read` gains optional client usage capabilities and an identity-filtered ordinary-usage decision:

- `supportsLunaReserve` can be forwarded for eligible ChatGPT sessions;
- `excludeResetCreditDetails` permits lightweight background polling to skip the separate reset-credit detail lookup while preserving the available reset count in usage data;
- `ordinaryUsageAllowed` is returned only when backend account/user identity matches the active session. Upstream schema states that `null` means unavailable and clients must not infer recovery from percentages or reset times.

OpenAI's official Luna Reserve guidance says Reserve is available only to selected personal Plus/Pro accounts and provides additional GPT-5.6 Luna usage after regular allowance is exhausted. It is a fallback mode, not a separate purchase, does not add API credits, does not restore ordinary allowance, and has its own finite allowance. Availability can change by account and supported app version.

### confirmed — PR #42364

OpenAI merged PR #42364 on 2026-09-02 21:22:23 UTC. Detached Windows App Server daemons can now observe `CODEX_DAEMON_SHUTDOWN_FILE` for a shutdown request addressed to the current process PID. Windows daemon shutdown races this control request with Ctrl-C; unmanaged launches retain the existing console-signal path. Upstream tests cover graceful/forced WebSocket shutdown and reject inherited or malformed control requests from consuming another process's shutdown request.

### confirmed signal / unknown root cause — Issue #42357

Issue #42357 reports Codex CLI `0.152.1`, ChatGPT sign-in, and GPT-5.6 Sol usage where the displayed 5-hour meter moved from 0% to 98% in about 2h14m while most input telemetry was cached and a very long accumulated context was present. The report also describes a possible account/workspace meter mismatch. It is labeled `bug`, `rate-limits`, and `CLI`.

This report is not evidence of an official OpenAI quota/pricing change. OpenAI's current plan guide says usage varies with model, execution location, complexity, context, reasoning, speed, and tools, and directs users to Settings/Usage or `/status` for current allowance state.

## Dex comparison

### confirmed

- Runtime approved `main` before this response was PR #126 merge `575d426264303814e06f7484f110aa506a84dab2`.
- Runtime PR #127 adds one watch-only file and merged as `8e3e714cb360980e0b5eab40901658f2caff0cc8`.
- Runtime PR #127 scope: **1 file / +120 / -0**. No Runtime executable code, configuration, model routing, Plugin/Skill state, permission, billing, or deployment behavior changed.
- Runtime validation `33685810838` PASS: dependency install, static checks/unit tests/smoke, and production dependency audit all PASS. Branch and merge Vercel deployment status PASS.
- Runtime #37 now tracks future-stable identity-bound `ordinaryUsageAllowed`, Luna Reserve capability/model transition, lightweight polling, and rate-limit telemetry mismatch handling.
- Runtime #28 now tracks future-stable PID-bound Windows daemon stop/restart/resume negative E2E.
- Dex remains subscription-first and does not allow automatic paid API fallback, automatic extra usage, automatic credit purchase, or automatic banked-reset redemption.
- Latest official non-prerelease Codex remains `0.152.1`; PR #42358/#42364 are future-stable evidence only.

### inference

When available from a verified stable App Server and bound to the exact authenticated account/user, `ordinaryUsageAllowed` is a stronger readiness signal than inferring recovery from counters or timestamps. This can reduce false resumes and duplicate attempts. It still cannot authorize billing, reset consumption, model changes, or broader permissions.

Luna Reserve can potentially improve subscription utilization for an eligible personal Plus/Pro account because it extends agentic usage without API credits. But it changes the effective model to GPT-5.6 Luna. Dex should therefore treat Reserve as a capability/model transition and re-evaluate task requirements before continuing rather than hiding it as transparent fallback.

PID-bound Windows daemon shutdown can improve worker lifecycle reliability only if stop/restart preserves Task/attempt provenance, one-writer guarantees, checkpoint durability, and stale-result rejection.

### proposal — tracked, not enabled

Runtime #37 future-stable gate now requires:

- stable schema evidence for `ordinaryUsageAllowed`, `supportsLunaReserve`, and `excludeResetCreditDetails` or stable equivalents;
- exact active account/user identity match before trusting `ordinaryUsageAllowed`; null/absent/stale/mismatch/contradictory state => `unknown` / fail-closed;
- lightweight polls preserve reset availability/count and never consume a reset;
- Luna Reserve remains disabled in Dex until non-prerelease stable + account eligibility + model/capability E2E;
- any later approved Reserve continuation records the actual effective model/allowance and re-runs capability routing;
- no credit purchase, banked-reset redemption, plan upgrade, paid API/automatic paid fallback, hidden model substitution, or quota-arbitrage duplicate worker;
- unexplained rapid usage depletion/account-meter mismatch checkpoints as `unknown` or `blocked-quota` rather than spending money or quota to mask inconsistency.

Runtime #28 future-stable approved-host gate now requires:

- shutdown request bound to intended daemon PID plus current Task/attempt provenance;
- stale/inherited/malformed/foreign-PID requests cannot terminate another process;
- graceful stop checkpoints canonical state and cannot fabricate `completed`;
- forced stop occurs only after a bounded graceful window and retains stale-result rejection;
- stop→restart/resume reconciles the same Task ID before new mutation;
- reconnect creates no duplicate worker, writer lease, commit, canonical Result, or callback;
- unmanaged/manual App Server launch remains compatible without the shutdown-file control path;
- ambiguous process identity fails closed and does not broaden process-control permission.

## unknown / Not Checked

- first official non-prerelease stable containing PR #42358/#42364;
- current account's Luna Reserve eligibility/remaining reserve allowance;
- approved-host stable schema/account-identity/Luna Reserve capability E2E;
- approved Windows-host daemon graceful/forced shutdown and resume E2E;
- maintainer-confirmed root cause/fix for #42357;
- whether #42357 is a product defect or expected long-context consumption behavior.

## Safety boundary

No Luna Reserve capability was enabled. No prerelease/experimental capability, paid API, automatic paid fallback, credit purchase, banked reset use, automatic model switch, broader permission, hosted MCP write, multi-writer execution, destructive migration, deployment change, or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42358 merge/scope | PASS |
| OpenAI PR #42364 merge/scope | PASS |
| OpenAI #42357 official issue signal | PASS |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #127 scope | PASS — docs-only, 1 file / +120 / -0 |
| Runtime validation `33685810838` | PASS |
| Runtime branch/merge Vercel | PASS |
| Runtime #37/#28 tracking | PASS |
| Approved-host usage/Luna Reserve E2E | Not Checked |
| Approved Windows-host daemon shutdown E2E | Not Checked |
| #42357 root cause/fixed release | Not Checked |
| Wiki automated CI | Not Checked — no workflow evidence expected for this one-file evidence change |

No FAIL is introduced.
