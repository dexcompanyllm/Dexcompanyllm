# Codex Windows App Server daemon watch — 2026-09-03

## Source

- Official OpenAI Codex PR #42405: https://github.com/openai/codex/pull/42405
- Dex Runtime evidence: `docs/CODEX_WINDOWS_APPSERVER_DAEMON_WATCH_20260903.md`, Runtime PR #141

## confirmed

- OpenAI Codex PR #42405 merged on 2026-09-03 01:28:55 UTC.
- Managed App Server daemon lifecycle/discovery and `codex agents` startup are enabled upstream for Windows.
- Windows daemon startup is non-elevated; implicit AF_UNIX discovery verifies socket directory/peer before session traffic.
- Detached-process support is preflighted; daemon/updater cwd is moved outside the launching project; process-scoped path settings are preserved before cwd changes.
- Implicit daemon connection failure may fall back to embedded App Server. Explicit remote endpoints remain authoritative, and `CODEX_EXEC_SERVER_URL` bypasses implicit daemon reuse.
- Shared clients inherit the environment captured when the daemon started; later terminal environment changes do not isolate or refresh the running daemon.
- Standalone `bootstrap` can launch an hourly installer/updater loop and restart App Server onto a refreshed binary. Dex does not approve or enable this automatically.
- Latest official non-prerelease Codex remains `0.152.1`.
- Runtime PR #141 is docs-only and merged after validation `33704320178` PASS; static/unit/smoke/dependency audit and branch Vercel passed.

## inference

The Windows daemon can reduce repeated startup and improve resume portability, but stale daemon-start environment is a new provenance hazard. Implicit daemon→embedded fallback is also safe only if the canonical Task/attempt and mutation outcome are unambiguous.

## proposal — tracked only

After the first stable containing #42405, Runtime #28 approved Windows-host E2E must verify non-elevated identity, private socket/peer validation, canonical path/alias handling, detached-process support, project-cwd isolation, daemon-start environment provenance, explicit-vs-implicit fallback behavior, executor preservation, one Task/attempt with no duplicate mutation/Result, and separate approval before any `bootstrap`/automatic updater activation.

## unknown / Not Checked

- first stable containing #42405;
- approved Windows-host daemon E2E;
- Work/Desktop/mobile parity;
- operational behavior under material daemon-start/client-start environment drift;
- whether Dex should ever approve automatic `bootstrap` rather than explicit version-managed restarts.

## PASS / FAIL / Not Checked

| Item | Result |
|---|---|
| OpenAI #42405 merge/scope | PASS |
| Runtime PR #141 scope | PASS — 1 docs file / +85 / -0 |
| Runtime validation `33704320178` | PASS |
| Runtime static/unit/smoke/dependency audit | PASS |
| Runtime branch Vercel | PASS |
| approved-host daemon E2E | Not Checked |
| automatic updater/bootstrap | Not Checked / disabled |
| FAIL | none |

## Safety boundary

No managed daemon, `bootstrap`, automatic updater, remote endpoint, broader permission, provider/API-key route, paid API/fallback, Plugin/Skill mutation, multi-writer, destructive migration or deployment was enabled.
