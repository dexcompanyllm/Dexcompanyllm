# Codex app-link approval, session lineage and prewarm watch — 2026-09-02

## Status

- Evidence class: official-source provider watch
- OpenAI upstream scope: PR #42132, #42133, #42134, #42135, #42137 and follow-up #42140
- Latest confirmed non-prerelease Codex CLI stable at review time: `0.152.0`
- Dex Runtime implementation/evidence PR: #86
- Dex Runtime approved `main` after PR #86: `70eebc56b71210c3960105afc0167b1f5984b30a`
- Runtime tracking: Issue #85; Vim redo follow-up recorded on Issue #25
- Wiki comparison base: `b5f29e6e7e8776b7cebbdca077e1074833e1a41c`

This watch does not promote upstream-main behavior to approved Dex capability. Runtime #28 Phase 3 remains the active operational gate and #34/#35 remain gated behind #28.

## Confirmed

### PR #42132 — bounded Git-root metadata discovery

Official: https://github.com/openai/codex/pull/42132

- Merged `2026-09-01T20:43:51Z`, merge commit `8436b749a410133c58ec61fe89db07496ca22033`.
- Shared `GitRootDiscovery` coalesces concurrent probes for one working directory and bounds cross-directory probes.
- Probes run on detached threads; in-flight work survives caller cancellation; completed results are discarded instead of cached.
- Turn/memory metadata enrichment uses the service; memory metadata wait is bounded to one second.
- Tests cover sharing, capacity, cancellation, fresh discovery, shutdown, timeouts and repositories restored after prewarming.

### PR #42133 — session MCP approvals scoped to app account links

Official: https://github.com/openai/codex/pull/42133

- Merged `2026-09-01T20:48:37Z`, merge commit `2393b5c9208aab4233cf5e9b1c57d1a17425bef6`.
- Selected app `link_id` becomes part of the remembered session MCP approval key.
- An approval remembered for one account link is not reused for another link or for a no-selector call.
- Integration coverage includes two link IDs and the legacy no-selector case.

### PR #42134 — app-link metadata in MCP approval elicitations

Official: https://github.com/openai/codex/pull/42134

- Merged `2026-09-01T20:56:46Z`, merge commit `a30fa3d830475ce83bd1b4e4e584e40e135436e9`.
- Native MCP approval requests preserve selected `link_id`.
- Elicitation metadata adds `link_id` and `link_is_implicit`; reserved prefix `implicit_link::` identifies implicit links.
- Tests cover default, explicit and implicit account links.

### PR #42135 — thread forks from symlinked managed session roots

Official: https://github.com/openai/codex/pull/42135

- Merged `2026-09-01T21:05:19Z`, merge commit `c5b5fa8089954219302092c03b8efc2024d33df6`.
- Rollout lineage is validated against canonical managed `sessions` / `archived_sessions` roots.
- Symlinked managed roots are accepted, while nested symlink paths that escape those roots are rejected.

### PR #42137 — Shell Snapshot V2 prewarm

Official: https://github.com/openai/codex/pull/42137

- Merged `2026-09-01T21:18:32Z`, merge commit `612e6491d50ffb80ffc4330edc4024b86e51e4bf`.
- Eligible turns can begin one asynchronous shell snapshot after turn hooks accept the turn.
- Snapshot capture uses resolved tools, permissions, sandbox, environment and shell configuration and skips unsupported/network-managed cases.
- Shutdown cancels outstanding prewarm; failed speculative capture remains retryable by a real command without consuming its retry budget.
- Tests cover reuse, failure recovery, sandbox/permission isolation, shutdown cancellation, hook-stopped turns and concurrency.

### PR #42140 — Vim composer redo

Official: https://github.com/openai/codex/pull/42140

- Merged `2026-09-01T21:32:47Z`, merge commit `b192442fc7f56aebbe065030561263cd67ffa44b`.
- Adds a bounded redo stack for complete composer drafts, including paste payloads and image attachments.
- Vim normal-mode `Ctrl+R` redoes the last undone edit; configurable `vim_normal.redo` is added.
- New edits clear stale redo history and pending edit snapshots do not consume the shared committed undo/redo byte budget.
- This is a TUI productivity improvement, not a Dex runtime security or orchestration dependency.

## Dex inference

- #42133/#42134 materially strengthen per-connected-account approval isolation for future Work/plugin flows. This reduces the risk that a session approval for one selected account is silently reused when another account is selected.
- #42132 can reduce metadata-induced stalls and shutdown delay while allowing later turns to observe repository topology changes instead of relying on stale cached discovery.
- #42135 improves portability for managed/profile-local session roots while keeping an explicit symlink-escape rejection boundary.
- #42137 can reduce first-command latency in eligible local turns, but speculative work is beneficial only if sandbox/permission/environment identity stays exact and no duplicate side effect can arise.
- #42140 can reduce manual draft rework for Vim-mode users but does not justify changing Dex routing, approval or cost policy.

## Proposal

Keep current Dex authority unchanged. After the first official non-prerelease stable containing the relevant changes is identified:

1. Verify same-tool approval isolation across explicit link A/link B, implicit links, no-selector calls, revoke/reconnect and account rotation.
2. Treat `link_id` / `link_is_implicit` as bounded provider provenance, never as Dex Task identity or standalone authorization authority; redact/token-scan persisted evidence.
3. Verify Git-root discovery remains bounded under concurrency/cancellation/shutdown and detects repositories created or restored after earlier probes.
4. Verify resume/fork under an approved managed symlink root while nested escape fails closed; retain Dex project→realpath/digest checks independently.
5. Measure Shell Snapshot V2 prewarm only when available in stable and already eligible; prove exact tools/permissions/sandbox/environment binding and zero duplicate commands, retries or side effects.
6. Treat Vim redo as an optional local productivity feature after stable inclusion; do not alter keymaps automatically.
7. Keep #34/#35 behind #28 and their own account/workspace/security E2E gates.

## Unknown

- First official non-prerelease stable containing #42132/#42133/#42134/#42135/#42137/#42140.
- Approved Windows-host behavior and Chat/Work desktop/mobile parity for app-link approvals.
- Final stable retention/lifecycle contract for implicit app-link approval metadata.
- Measured Shell Snapshot V2 latency/rework benefit in Dex workloads.
- Whether Vim redo materially improves the user's Codex TUI workflow.

## Safety boundary

- No prerelease/experimental capability enabled.
- No Shell Snapshot setting or keymap changed.
- No OAuth scope, account selection, MCP write capability, filesystem permission, sandbox mode or approval policy broadened.
- No plugin/Skill install, update, reconcile, disable or deletion performed.
- No Codex version installed, upgraded or promoted.
- No paid API, automatic paid fallback, extra paid usage, credit/reset or plan change performed.
- No external messaging or destructive migration performed.
- GitHub Task ID, `attemptId`, explicit approval where required, mutation lock, canonical Result/receipt, project identity and detached verifier remain authoritative.

## Validation status

- Official upstream PR metadata/content: **PASS**
- Current latest official stable check: **PASS — `0.152.0`**
- Dex Runtime PR #86 single-file documentation scope and branch validation: **PASS**
- Runtime behavior/config/permission/version mutation by this watch: **PASS — none**
- Safety-boundary review: **PASS**
- FAIL: **none**
- First stable inclusion: **Not Checked**
- Approved Windows-host account-link/session/prewarm E2E: **Not Checked**
- Work/mobile/desktop parity: **Not Checked**

## Dex references

- Runtime PR #86: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/86
- Runtime Issue #85: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/85
- Existing operational gates: Runtime #28, #34, #35
