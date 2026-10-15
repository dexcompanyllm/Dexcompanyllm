# Codex deferred-environment provisioning recovery evidence — 2026-09-03

## Official source
- https://github.com/openai/codex/pull/42388
- https://github.com/openai/codex/releases/tag/rust-v0.152.1

## confirmed
OpenAI Codex PR #42388 merged on 2026-09-02 23:51:01 UTC. A deferred environment can recover from provisioning failure when a later valid Ready report arrives while preserving the same environment instance. Provisioning failure becomes retryable for reconnect when stale startup failure state exists; `status()` can report failure without starting a connection; and late failure does not replace Ready. Tests cover failed/invalid provisioning recovery, capability-root resolution, and Ready-vs-stale-failure races.

Latest official non-prerelease Codex remains `0.152.1`; this is post-stable evidence and is not promoted automatically.

## Dex comparison
### confirmed
- Runtime #35 remains the capability-routed worker/environment gate and is blocked behind #28.
- Runtime PR #135 is docs-only, one Markdown file, +64/-0.
- Runtime validation `33697032151` PASS: dependency install, static checks, unit tests, smoke test, production dependency audit.
- Runtime branch Vercel PASS; PR #135 merged at `e0516dbcc7a55931351fa29c80776a9aa3ec755e`.
- Canonical Task/attempt, environment/project registry, mutation lock, approval, actual executor readiness, Result and verifier remain authoritative.

### inference
Same-environment recovery can reduce abandoned workers, duplicate setup, user re-entry and rework. Safety depends on ensuring a later validated Ready supersedes only stale provider failure state without changing Dex Task/attempt, environment identity, capability roots or authorization.

### proposal — tracked only
After the first non-prerelease stable containing #42388, Runtime #35 should verify non-mutating failure status, same-environment identity recovery, invalid-Ready rejection, late-failure non-downgrade, validated capability-root remapping, bounded/idempotent reconnect, monotonic Ready/failure race handling, stale-attempt rejection, zero duplicate mutation/approval/callback/Result, and fail-closed handling when identity/root/account/workspace/executor/path changes during recovery.

## unknown / Not Checked
- first stable containing #42388;
- approved Windows/remote environment recovery E2E;
- production surface parity and retry/backoff contract;
- interaction with experimental `Thread.environments` before stable;
- Runtime PR #135 merge-SHA separate GitHub Actions;
- Wiki automated CI.

## Safety boundary
No remote environment, automatic retry policy, experimental capability, broader permission, provider/model switch, API key, paid API/fallback, Plugin/Skill mutation, multi-writer, external messaging, destructive migration or deployment was enabled.

## Validation
| Check | Result |
|---|---|
| OpenAI PR #42388 merge/scope | PASS |
| Latest stable | PASS — `0.152.1` |
| Runtime PR #135 scope | PASS — docs-only, +64/-0 |
| Runtime validation `33697032151` | PASS |
| Runtime branch Vercel | PASS |
| Approved-host environment recovery E2E | Not Checked |
| Wiki automated CI | Not Checked |

Aggregate state/QA/handoff/source files remain bounded-drift because the functional Gate is unchanged; DexCompany-Ops Issue #55 tracks the current validated heads.