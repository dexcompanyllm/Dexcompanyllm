# Codex Windows provisioning file-hardening evidence — 2026-09-03

## Official evidence

Classification: **confirmed**.

Source: https://github.com/openai/codex/pull/42342

OpenAI Codex PR #42342 merged to upstream `main` on 2026-09-02 20:06:03 UTC as `add870a4bf226d87e0201b4e28ee6a159a49aed1`.

The change hardens privileged Windows sandbox provisioning beneath a requested Codex home. It adds no-reparse directory opens, path validation/guards, and handle-relative atomic file replacement; uses fresh or retained handles for provisioning logs, sandbox credentials, setup markers and error reports; and adds service-side validation for framed provisioning requests, proxy settings, fixed-drive Codex homes and pinned sandbox directories. Tests cover junction/unsafe-path rejection, hard-link-safe output replacement, retained output handles, request framing/normalization and ancestor pinning. No unresolved PR review thread was observed after merge.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was PR #121 merge `39ab5683306f6760b1ed818c734bf9d1d98e24bd`.
- Runtime PR #122 added only `docs/CODEX_WINDOWS_PROVISIONING_FILE_HARDENING_WATCH_20260903.md` and merged as `9338c0cc0aa7073fb9a81b41a5f0bf12f0390c94`.
- Runtime PR #122 scope: **docs-only, 1 file / +63 / -0**.
- Runtime validation `33677380119` PASS: dependency install, static checks/unit tests/smoke and production dependency audit all PASS; branch Vercel PASS.
- Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E **Not Checked**.
- Latest official non-prerelease Codex remains `0.152.1`; #42342 is upstream `main` evidence only and is not auto-installed/promoted.
- Dex project→realpath binding, one active writer, explicit approval, mutation lock, secret-safe evidence and independent verification remain higher-level safety boundaries.

### inference

#42342 materially reduces TOCTOU/reparse/hard-link risk in the new privileged Windows provisioning path. A caller-controlled junction, reparse point, ancestor replacement or hard link could otherwise redirect privileged writes away from the object that was validated. The upstream hardening improves the provider boundary but does not replace Dex's canonical project registry, approval or output verification.

The fixed-drive and pinned-directory validation also implies that unsupported/removable/network/custom filesystem layouts may be rejected rather than normalized. Dex should prefer a clear blocked/unsupported state over weakening those checks or relocating privileged provisioning to an unverified path.

### proposal — tracked in Runtime #28

Before Dex relies on a stable containing #42342, approved Windows-host E2E must prove:

- identify the first official non-prerelease stable containing #42342;
- requested `CODEX_HOME` and provisioning roots resolve to the approved fixed local drive and expected dedicated-worker profile;
- junction/reparse/mount/unsafe ancestor replacement/path-normalization ambiguity is rejected before privileged mutation;
- validated directory handles remain pinned through security mutations and output creation so path replacement cannot swap the validated object;
- provisioning logs, sandbox credentials, setup markers and error reports cannot be redirected through caller-controlled hard links and use atomic/handle-relative replacement as intended;
- malformed/truncated/oversized framed requests, unsupported proxy settings, unexpected drive type or unpinned sandbox directory causes zero workspace/Task mutation and a bounded blocked state;
- retry/restart after a rejected or interrupted request creates no duplicate credential, marker, identity, Task attempt, approval or mutation;
- service/provisioning logs and error reports remain bounded and secret-safe;
- Dex project→canonical realpath registry and output diff/secret scan independently confirm the final mutation target; provider path validation is not Dex authorization authority;
- rejected provisioning paths never trigger broader permission, `danger-full-access`, alternate WSL/Remote path, paid-provider fallback or destructive filesystem migration.

### unknown / Not Checked

- first official non-prerelease stable containing #42342
- approved Windows-host reparse/junction/hard-link/fixed-drive provisioning E2E
- behavior on unsupported/removable/network/custom filesystem layouts in the eventual stable

## Safety boundary

No Windows sandbox service/provisioning capability was enabled. No filesystem permission was broadened, no `CODEX_HOME` was moved/migrated, no WSL/Remote fallback was enabled, no prerelease was installed, and no paid API/provider fallback, Plugin/Skill mutation, deploy, destructive migration or external messaging was introduced.

## Validation

| Check | Result |
|---|---|
| OpenAI #42342 merge/scope | PASS |
| #42342 unresolved review threads | PASS — none observed |
| Latest official non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #122 scope | PASS — docs-only, 1 file / +63 / -0 |
| Runtime validation `33677380119` | PASS |
| Runtime branch Vercel | PASS |
| Runtime #28 tracking | PASS |
| First stable containing #42342 | Not Checked |
| Approved Windows-host provisioning file-hardening E2E | Not Checked |

No FAIL is introduced.
