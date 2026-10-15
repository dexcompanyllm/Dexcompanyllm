# Codex authenticated provisioning / remote plugin OAuth evidence — 2026-09-03

## Official evidence

### OpenAI Codex PR #42337

Classification: **confirmed**.

Source: https://github.com/openai/codex/pull/42337

PR #42337 merged to upstream `main` on 2026-09-02 19:35:57 UTC as `dcfcb570b2cd0a2500b1d47a7b04a7cb1b0a0bd2`.

OpenAI adds an authenticated client for the packaged Windows sandbox provisioning service. Before exchanging the versioned provisioning request, the client verifies that the named-pipe server belongs to the running `CodexSandboxService` process. Absent/busy/timed-out/disconnected service states are treated as unavailable, while provisioning/authentication failures remain surfaced. The client sends the complete provisioning settings, separately classifies inherited HTTP and SOCKS proxy listeners, and shares bounded frame-readiness handling with the runner path. No unresolved PR review thread was observed after merge.

### OpenAI Codex issue #42336

Classification: **confirmed signal / unknown generality and product contract**.

Source: https://github.com/openai/codex/issues/42336

The issue reports that a third-party Kling CLI plugin running in a remote ChatGPT Work/Codex runtime exposes a loopback OAuth callback (`127.0.0.1`) that resolves on the user's local device instead of the remote runtime, preventing the CLI from receiving/storing the token. It is an open enhancement/auth/connectivity/skills report, not a maintainer-confirmed generalized plugin authentication contract or root cause.

## Dex comparison

### confirmed

- Runtime approved `main` before this response was PR #119 `0c3d2ca17966e3ca708afc535db25d40b1d4bf05`; PR #120 then added only the new watch evidence and merged as `9e1ed6691f65741b685c87a2f8966b5b41afc0e5`.
- Runtime PR #120 branch validation `33675116165` PASS: dependency install, static checks/unit tests/smoke, and production dependency audit all PASS; branch Vercel PASS.
- Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E Not Checked.
- Runtime #34 remains blocked on #28; hosted submit/control writes and real cross-surface Dex plugin E2E remain disabled.
- GitHub Task Bus + Task/attempt/Result/receipt remains canonical. Provider provisioning/auth state cannot grant Dex approval, mutation, publication, OAuth, GitHub credential, or paid-usage authority.

### inference

#42337 meaningfully strengthens the machine-wide provisioning boundary introduced by #42334 by authenticating the named-pipe endpoint against the actual Windows service process and separating normal service unavailability from authentication/provisioning failure. This can improve spoofing resistance and deterministic recovery, but service-process identity, restart/replacement behavior, proxy-policy derivation, IPC framing, and retry semantics become security-critical.

#42336 demonstrates a portability edge case: an authentication method that works for an interactive local CLI may not work inside a headless remote Work runtime. Dex should depend only on authentication transports officially supported by the actual remote surface and fail closed when no such transport is available.

### proposal — tracked in Runtime #28

Before Dex relies on a stable containing #42337, approved Windows-host E2E must prove:

- the named-pipe server PID belongs to the currently running expected `CodexSandboxService` before provisioning;
- service mismatch/replacement/restart/stale endpoint/auth failure causes zero Task/workspace mutation;
- absent/busy/timeout/disconnect becomes bounded unavailable/blocked state with no permission, sandbox, WSL/Remote, provider or paid fallback broadening;
- protocol version and frame size are validated before deserialization and malformed/truncated/oversized IPC causes zero mutation;
- effective proxy/local-binding policy exactly matches the intended permission profile and unknown proxy protocols do not silently widen access;
- retry/reconnect re-authenticates and stays idempotent with no duplicate identities, network grants, Task attempts, approvals or mutations;
- machine-wide provisioning remains separate from per-task ACL and Dex authorization authority;
- logs/evidence remain bounded and secret-safe;
- the first official non-prerelease stable containing #42337 is identified and approved-host E2E passes.

### proposal — tracked in Runtime #34

Before Dex enables remote Work/Chat plugin authentication:

- the auth method must be officially supported in the real remote/headless surface and bound to the expected account/workspace/connection;
- loopback callbacks are not assumed reachable from remote runtimes unless the provider explicitly supplies/verifies the transport;
- unsupported auth flow causes zero submit/control mutation and returns a bounded fallback state;
- no ad-hoc public ingress, SSH/port forwarding, broader network permission, or automatic secret/API-key fallback is created as a workaround;
- any managed OAuth/device-code flow must prove anti-replay, account/workspace binding, token redaction/revocation and retry idempotency;
- authentication never becomes Task approval, destructive control, publication, merge/deploy or paid-usage authority;
- web/desktop/mobile/remote parity is recorded before operational dependency.

### unknown / Not Checked

- first official non-prerelease stable containing #42337
- approved Windows-host authenticated provisioning E2E
- generalized resolution/product contract for #42336
- Dex remote plugin managed-OAuth/device-code E2E

## Stable / models / usage

Latest official non-prerelease Codex remains `0.152.1`. The official changelog still has September 1 as the latest September release date. Current model guidance remains GPT-5.6 Sol/Terra/Luna, and current plan guidance continues to use shared five-hour/local-cloud allowance semantics with additional weekly limits possible. No new official change in this cutoff requires changing Dex model routing or subscription-first cost policy.

## Safety boundary

No provisioning service, elevated sandbox, remote plugin login, public ingress/port forwarding, broader filesystem/network/OAuth permission, prerelease/experimental capability, model/reasoning change, Plugin/Skill mutation, paid API/fallback/extra usage, reset/credit use, multi-writer, destructive migration, deploy or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI #42337 merge/scope | PASS |
| #42337 review threads | PASS — none observed |
| #42336 issue/labels/scope | PASS |
| Runtime PR #120 scope | PASS — docs-only, 1 file / +98 / -0 |
| Runtime validation `33675116165` | PASS |
| Runtime branch Vercel | PASS |
| Runtime #28/#34 tracking | PASS |
| First stable containing #42337 | Not Checked |
| Approved Windows-host authenticated provisioning E2E | Not Checked |
| #42336 generalized remote auth resolution | Not Checked |
| Dex remote plugin auth E2E | Not Checked |

No FAIL is introduced.
