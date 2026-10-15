# Codex 0.153 Windows execution and sandbox watch — 2026-09-03 final cutoff

Status: source-backed provider watch / approved-host Gate hardening. This note enables no elevated sandbox, Defender exclusion, sandbox bypass, provider-state reset, reinstall/downgrade, prerelease/experimental capability, broader permission, paid API, automatic paid fallback, destructive migration, or deployment behavior.

## Scope

A final fresh official `openai/codex` issue check after the #42509–#42511 watch surfaced two additional Windows signals that are directly relevant to Runtime #28. Upstream `main` still has no merged commit after PR #42458, and the latest official non-prerelease release remains Codex `0.153.0`.

## Findings

### confirmed issue signal / causal root cause unknown — #42512: current stable 0.153.0 CLI can exit during tool execution on Windows

OpenAI Issue #42512 is open with `bug`, `windows-os`, `sandbox`, `CLI`, and `tool-calls` labels. The reporter uses Windows 11, standalone Codex CLI `0.153.0`, ChatGPT Pro, and GPT-5.6 Sol max. `codex doctor --json` reportedly completes with an overall warning while installation, auth, network, config, readable sandbox configuration, state databases, history integrity, and disk checks are otherwise healthy; the reported warning is that endpoint-protection exclusions are unverified.

The reporter says Codex exits back to PowerShell while running a Python unittest suite, while the exact same Python executable and command complete normally when launched manually from PowerShell in the same project directory. They also report the problem after a clean standalone reinstall and with both unelevated and elevated/default sandbox troubleshooting. This is a user report, not a maintainer-confirmed root cause; Microsoft Defender interference is only a possible factor, not established causality.

Dex inference:

- a successful Doctor/preflight is necessary evidence but not sufficient proof that the actual Codex shell/tool execution path is reliable on an approved Windows worker;
- #28 must include a real bounded child-process execution canary through the exact approved Codex/App Server route, capture deterministic exit/receipt evidence, and distinguish provider-process failure from the child command's exit;
- differential success of the same command outside Codex is useful diagnostic evidence but does not by itself prove the failure layer or justify bypassing the Codex sandbox;
- if the Codex process exits while a child command may still be running, Dex must reconcile child/descendant liveness, lease, checkpoint, mutation state, and result before retry; ambiguous execution forbids a second writer or automatic provider failover;
- repeated elevated-sandbox setup prompts, a Doctor warning, or a crash report do not authorize elevation, Defender exclusions, sandbox weakening, reinstall/reset loops, or broader permissions.

Official source: https://github.com/openai/codex/issues/42512

### confirmed correlated issue signal / root cause and fix unknown — #42513: Windows sandbox setup-refresh failure can persist across new tasks and explicit elevation

OpenAI Issue #42513 is open for Windows Desktop `26.901.20858` on Windows build `26200`. The reporter says repository read/edit attempts repeatedly fail before the target files are read with `windows sandbox failed: helper_unknown_error: setup refresh had errors`. The failure reportedly reproduced in a long-running task and a new clean-context task. A single explicitly authorized elevated `apply_patch` limited to five approved paths also failed during sandbox/helper initialization before reading the first file, and no repository changes were applied.

This is strongly correlated with previously tracked Windows sandbox/setup-refresh reports, including #42463, but the current issue does not yet have a maintainer-confirmed root cause or fix.

Dex inference:

- a fresh thread/task does not prove a fresh or healthy sandbox/runtime state, so repeated task creation is not a remediation and must not create duplicate canonical Tasks;
- explicit one-time elevation that still fails before file access is evidence that “try elevated” is not a reliable recovery strategy and must never become an automatic Dex fallback;
- #28 must separately prove sandbox/helper initialization, bounded read, synthetic create/read/delete or scoped edit, diff validation, and mutation 0 on setup failure;
- repeated identical setup-refresh failure should trip the existing no-progress circuit breaker and preserve the same canonical Task/checkpoint rather than retrying via additional write mechanisms;
- no sandbox setup/reset, provider-state cleanup, filesystem permission relaxation, endpoint-protection exclusion, or out-of-sandbox mutation is authorized by this signal.

Official source: https://github.com/openai/codex/issues/42513

## Proposal / Runtime #28 final Windows execution Gate additions

- [ ] Record exact approved Windows OS build, standalone CLI version, Desktop version if used, App Server/executor route, sandbox mode, worker identity, and current Runtime/fixture SHAs before execution.
- [ ] `codex doctor --json`/preflight result and actual execution-path canary are separate evidence fields; Doctor PASS/WARNING cannot substitute for command/tool E2E.
- [ ] Run a bounded no-op/read canary and a deterministic child-process/test canary through the exact Codex execution route; capture provider process survival, child PID/descendant cleanup, exit code, stdout/stderr hash/bounds, deadline, and receipt.
- [ ] If the provider exits before terminal tool evidence, mark execution ambiguous/FAIL, reconcile child liveness and mutation state, and create no second writer, automatic retry, or provider failover.
- [ ] Reproduce sandbox helper initialization and a disposable synthetic scoped edit/create-read-delete canary; setup failure before file read must produce mutation 0 and bounded stop.
- [ ] Repeated setup-refresh failure across a new provider thread/task must not create a new canonical Dex Task or broaden permissions.
- [ ] Elevated sandbox/setup, Defender exclusions, reinstall/reset, out-of-sandbox fallback, and permission relaxation remain manual/high-risk and are not part of standing optimization.

## Concurrent work preservation

Runtime Draft PR #157 remains the user-owned review-only Phase 3 safety-hardening branch. Its recorded automated checks are PASS, while physical Windows evidence contains FAIL and Not Checked items. This watch does not edit, rebase, approve, close, or merge PR #157. These new upstream signals are tracking input for the eventual approved-host E2E, not justification to change PR #157 behind the user's work.

## Status

- Latest official non-prerelease Codex: PASS — `0.153.0`.
- Fresh official upstream merged `main`: PASS — PR #42458 remains latest at this cutoff.
- #42512 issue existence/version/labels: PASS; root cause, Defender causality, and maintainer fix: Not Checked.
- #42513 issue existence/reported setup-refresh behavior: PASS; root cause and maintainer fix: Not Checked.
- Approved-host `0.153.0` actual command/tool execution canary: Not Checked.
- Approved-host sandbox/helper init and synthetic edit E2E: Not Checked.
- Runtime Draft PR #157 physical Windows evidence: FAIL / Not Checked per its existing record; preserved unmodified.
- Runtime behavior/config/model/permission/billing mutation from this watch: 0.
