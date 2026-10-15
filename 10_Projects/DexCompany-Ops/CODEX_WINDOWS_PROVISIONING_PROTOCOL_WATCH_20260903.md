# Codex Windows sandbox provisioning protocol evidence — 2026-09-03

## Official evidence

OpenAI Codex PR #42334 is **confirmed** merged to upstream `main` on 2026-09-02 19:25:16 UTC as `301a7c5e011a57111d82575de6db5e0142fdd9e6`.

Source: https://github.com/openai/codex/pull/42334

OpenAI adds a versioned, length-prefixed JSON request/response protocol for a machine-wide Windows sandbox provisioning service, including named-pipe and network setup parameters. A readiness check compares recorded proxy ports and local-binding policy with requested provisioning settings. Framed JSON I/O, sandbox-group creation and SID resolution are shared with the existing elevated setup path. Post-merge review-thread check found no unresolved thread.

Latest official non-prerelease Codex remains `0.152.1`, so this is future-stable evidence and is not automatically promoted.

## Dex classification

### confirmed

- Dex does not currently depend on this machine-wide provisioning service as canonical control state.
- Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E Not Checked.
- Runtime PR #119 records the future-stable gate and merged as `0c3d2ca17966e3ca708afc535db25d40b1d4bf05`.
- Runtime validation `33673637104` PASS: dependency install, static/unit/smoke, and production dependency audit all PASS; branch and merge Vercel PASS.

### inference

A persistent machine-level provisioning service can reduce repeated setup/elevation and improve repeatability, but raises a new local trust boundary. Protocol versions, IPC framing, named-pipe ownership/ACL, peer identity, request replay, network-policy drift, stale readiness state and separation from per-task workspace ACLs become security-critical.

Provider readiness is capability/provenance evidence only. It cannot grant Dex Task approval, project/workspace access, OAuth scope, GitHub credentials, mutation or publication authority.

### proposal — tracked in Runtime #28

Before Dex depends on a stable containing the service, approved Windows-host E2E must prove:

- incompatible protocol versions fail closed;
- malformed/truncated/oversized framed JSON causes zero mutation;
- named-pipe owner/DACL/peer identity is restricted to expected principals and broad Users/Everyone access is rejected;
- stale/replaced/reparse/aliased endpoints cannot impersonate the service/client;
- readiness requires exact requested proxy-port and local-binding policy plus expected sandbox identities/groups;
- policy drift becomes Not Ready/blocked instead of stale reuse;
- retry/reconnect is idempotent and cannot duplicate users/groups/network setup/grants/Task/worker/approval/mutation;
- machine-level provisioning never retains per-task workspace read/write/deny roots as machine-wide authority;
- logs/evidence remain bounded and secret-safe;
- failure never enables `danger-full-access`, broader permission, WSL/Remote fallback, paid API/provider or destructive repair.

### unknown / Not Checked

- first official stable containing #42334
- final public service lifecycle/security contract
- approved Windows-host named-pipe/protocol/readiness E2E

## Secondary fresh signals

- #42333: macOS Desktop startup freeze across two builds; reporter notes bundled plugin reconciliation as the last relevant event while standalone Codex CLI remains usable. **confirmed signal / root cause unknown**. Existing Dex Desktop-independent recovery and Plugin reconcile fail-closed policy are sufficient for now.
- #42335: macOS Desktop false terminal workspace-mismatch warning for equivalent `/.` path. **confirmed signal / suspected cause**. Dex project→canonical-realpath/digest binding remains authoritative; UI warning is presentation evidence only.

No new operational Dex capability is enabled from either issue.

## Safety boundary

No provisioning service, named pipe, sandbox broadening, Remote/WSL/Voice activation, prerelease, model/reasoning change, paid API/fallback/extra usage, Plugin/Skill mutation, destructive migration, publication/deploy or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI #42334 merge/scope reviewed | PASS |
| #42334 review-thread check | PASS — none observed |
| Runtime PR #119 scope | PASS — docs-only, 1 file / +77 / -0 |
| Runtime validation `33673637104` | PASS |
| Runtime branch/merge Vercel | PASS |
| Runtime #28 tracking updated | PASS |
| #42333/#42335 triage | PASS |
| Stable inclusion + approved-host provisioning E2E | Not Checked |

No FAIL was introduced.