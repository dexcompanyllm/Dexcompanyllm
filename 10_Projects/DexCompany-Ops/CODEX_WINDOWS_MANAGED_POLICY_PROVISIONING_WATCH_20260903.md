# Codex Windows managed-policy provisioning evidence — 2026-09-03

## Official evidence

Classification: **confirmed**.

Official upstream sequence:

- https://github.com/openai/codex/pull/42344 — managed-policy validation preparation; merged 2026-09-02 20:09:31 UTC as `c4ea7294b989827862eed6972d130233459161f4`.
- https://github.com/openai/codex/pull/42348 — packaged-client and Windows-user authentication; merged 2026-09-02 20:17:06 UTC as `4fdf4c11131ec901a303f68e5ad8962469697bb6`.
- https://github.com/openai/codex/pull/42351 — authenticated local named-pipe provisioning listener; merged 2026-09-02 20:28:21 UTC as `7e45bdb5fd0e6cae3aeb14330deed7861bb516da`.
- https://github.com/openai/codex/pull/42353 — default-off experimental App Server integration; merged 2026-09-02 20:33:04 UTC as `830363bd7ca7bd6d98c7a766da0ce2684730985c`.

### #42344 — policy preparation

OpenAI prepared managed-policy validation under the provisioning client's impersonated identity, including elevated/network/local-binding/HTTP-SOCKS restrictions and a fresh one-shot cloud-policy read that bypasses the normal disk cache without mutating it.

### #42348 — authenticated caller boundary

OpenAI bound provisioning to the installed Codex package and the actual interactive named Windows user. The service keeps the client process open while authenticating, impersonates the caller, requires token/user consistency, rejects non-interactive service identities and sandbox-group members, pins the requested Codex home, then validates machine policy under that caller token. Request handling was still disconnected from transport at this step.

### #42351 — authenticated provisioning IPC enabled

OpenAI enabled framed local named-pipe provisioning. Packaged clients are authenticated before request handling; requests and machine policy are validated; responses and Windows event-log outcomes are bounded. Validated directory handles are retained into the setup helper so filesystem protections survive an unexpected service exit. Configuration-parse failures can return `unavailable`, explicitly allowing client fallback to the existing elevated setup helper.

### #42353 — default-off experimental integration

OpenAI integrated the service behind `windows_sandbox_service`, an App Server experimental feature whose feature stage is **UnderDevelopment** and whose default is **off**. When explicitly enabled for elevated Windows sandbox setup, Codex attempts service provisioning using the effective proxy/listener roles and then continues through the shared existing setup path. Unsupported proxy/listener configuration, service unavailability and unsupported Codex-home drives can fall back to the elevated helper. Workload-identity auth does not use this service path. The shared setup path still performs the non-elevated workspace ACL refresh.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was PR #123 merge `3a98ef08566c471dcad775106a813ef421450279`.
- Runtime PR #124 expanded the existing watch file only and merged as `dad41e4a4be2cd0bf5c637b9f058de7427d0f122`.
- Runtime PR #124 scope: **1 existing file / +54 / -27**; no Runtime code/config/permission/model/billing/plugin/Skill/deploy behavior was changed.
- Runtime validation `33680553220` PASS: dependency install, static checks/unit tests/smoke test and production dependency audit all PASS.
- Runtime PR #124 branch Vercel PASS and merge-SHA Vercel PASS.
- Runtime #28 remains **OPEN / Phase 3 implementation merged / approved Windows-host E2E Not Checked**.
- Latest official non-prerelease Codex remains `0.152.1`; #42348/#42351/#42353 are future-stable evidence only.
- Dex subscription-first policy, explicit approval, one active writer, mutation lock, canonical Task/Result and independent verification remain authoritative.

### inference

#42348/#42351 materially improve the privileged Windows provisioning boundary because callers are bound to installed package identity and an interactive named Windows identity, policy is checked while impersonating that caller, and validated filesystem objects remain pinned across helper handoff.

The main Dex risk is #42351/#42353 fallback semantics. Upstream intentionally treats some service failures or unsupported configurations as `unavailable` and may route setup back through the elevated helper. That is a reliability feature, but Dex cannot treat fallback as new authorization. Fallback must preserve the exact effective permission profile, authenticated identity, managed-policy/network restrictions and Dex approval scope; otherwise Dex should fail closed as `blocked`/Not Checked with zero mutation.

Because #42353 is explicitly UnderDevelopment and default-off, the best current optimization is to keep it disabled and track the behavior as a future-stable/approved-host E2E gate.

### proposal — tracked in Runtime #28

Before Dex depends on a stable containing #42348/#42351/#42353, approved Windows-host E2E must prove:

- identify the first official non-prerelease stable containing all three PRs;
- `windows_sandbox_service` remains disabled unless separately approved and is never enabled automatically through recovery, capability discovery or provider recommendation;
- named-pipe callers are restricted to the expected installed Codex package and unpackaged/foreign processes are rejected before request handling;
- the authenticated process, impersonated token and resolved named Windows user match the expected approved identity; non-interactive and sandbox identities produce zero provisioning mutation;
- requested `CODEX_HOME` and relevant ancestors remain pinned to the validated filesystem objects through service and helper execution; service exit/reconnect cannot swap them after validation;
- framing/version/size bounds, pipe security, malformed requests, remote-client attempts and disconnect races fail safely without partial provisioning;
- managed-policy validation still runs under the authenticated caller and policy failure/ambiguity never becomes successful authorization;
- any `unavailable` → elevated-helper fallback preserves identical permission, identity, managed-policy, network/local-binding and explicit approval semantics. If equivalence cannot be proven, fallback is blocked and mutation remains zero;
- unsupported home drives or proxy/listener layouts do not cause automatic home relocation, network opening, listener substitution or sandbox-mode escalation;
- workload-identity selection does not substitute a paid/API credential route for Dex's approved subscription worker path;
- service provisioning, helper fallback, ACL refresh and retry/reconnect are bounded/idempotent with no duplicate identity, grant, Task attempt, approval or mutation;
- event-log/metrics evidence is bounded and redacted and does not become Dex Task/approval authority;
- service lifecycle, authenticated IPC, file/path hardening, managed-policy validation, helper fallback and ACL refresh pass together before operational dependency.

### unknown / Not Checked

- first official non-prerelease stable containing #42348/#42351/#42353
- approved Windows-host authenticated-service E2E
- helper-fallback equivalence under managed policy, network policy and explicit Dex approval
- eventual stable installer/service lifecycle behavior

## Safety boundary

No experimental Windows sandbox service, managed-policy integration, elevated sandbox, broader network/filesystem permission, `danger-full-access`, workload-identity/API-key route, provider fallback, prerelease, Plugin/Skill mutation, paid API/extra usage, destructive migration, deploy or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI #42344 merge/scope | PASS |
| OpenAI #42348 authentication merge/scope | PASS |
| OpenAI #42351 authenticated IPC merge/scope | PASS |
| OpenAI #42353 default-off experimental integration merge/scope | PASS |
| Fresh upstream merged-PR check after #42353 | PASS — none observed at cutoff |
| Latest official non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #124 scope | PASS — 1 existing docs file / +54 / -27 |
| Runtime validation `33680553220` | PASS |
| Runtime branch + merge Vercel | PASS |
| Runtime #28 tracking | PASS |
| First stable containing #42348/#42351/#42353 | Not Checked |
| Approved Windows-host authenticated-service/fallback E2E | Not Checked |

No FAIL is introduced.
