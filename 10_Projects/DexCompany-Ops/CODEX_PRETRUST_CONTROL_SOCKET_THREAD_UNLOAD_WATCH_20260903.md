# Codex pre-trust PATH, Windows control-channel, and App Server continuity watch — 2026-09-03

## Classification

### confirmed

- OpenAI Codex PR #42318 (`a94a5db6295a3c5b4e3e18da58a2f6b774900d0e`) merged 2026-09-02 17:54:37 UTC. Managed Codex launches prefer `packages/standalone/current/bin`, with legacy-layout fallback.
- OpenAI Codex PR #42320 (`5e26f7621c1c470fe62350d61c9eb4d6c772a0da`) merged 2026-09-02 18:21:17 UTC. App Server adds `thread_unload_delay_secs`; default unload delay changes from fixed 30 minutes to 60 seconds; zero is allowed, active turns remain protected, and unloaded ephemeral threads lose in-memory state.
- OpenAI Codex PR #42324 (`637c3227b3c5327d64a73fe0b3764ade139efd1f`) merged 2026-09-02 18:35:45 UTC. Pre-trust startup/`codex doctor` no longer executes helper programs merely because a repository-controlled `PATH` selects them; startup helper resolution and plugin-sync environments are hardened, terminal detection is environment-only, and update checks avoid `curl` execution.
- OpenAI Codex PR #42325 (`e6ff7495064372deab97e7b793f5b613d1a76309`) merged 2026-09-02 18:39:13 UTC. Replay snapshots omit superseded streaming deltas when a matching completed assistant item exists and render completed items as finalized history entries while preserving unfinished/barrier-separated content.
- OpenAI Codex PR #42326 (`73e94ee7a60704d4094142c543958f6a794f78e9`) merged 2026-09-02 18:44:26 UTC. Windows control-socket rendezvous directories receive protected current-user-only DACL handling, broader-permission rejection, junction/replacement resistance, and a same-user non-elevated peer check.
- OpenAI Codex issue #42323 is an official `bug/windows-os/app/session` report of repeated Windows 11 Desktop crashes during long-running work with repository/worktree state apparently intact but task/session recovery uncertain. The reporter later closed it as duplicate; no maintainer-confirmed root cause or fixed release is established.
- Latest official non-prerelease `openai/codex` release remains `0.152.1` (`rust-v0.152.1`, published 2026-09-01).
- Runtime PR #116 is merged as `8ca64cb25e9d9bc810bc97b2ffbcce1102110a08`. It is documentation-only and adds future-stable/approved-host gates without enabling capabilities. Branch validation `33669653078` PASS: dependency install, static/unit/smoke, production dependency audit. Branch Vercel PASS.

Official sources:
- https://github.com/openai/codex/pull/42318
- https://github.com/openai/codex/pull/42320
- https://github.com/openai/codex/pull/42324
- https://github.com/openai/codex/pull/42325
- https://github.com/openai/codex/pull/42326
- https://github.com/openai/codex/issues/42323
- https://github.com/openai/codex/releases/tag/rust-v0.152.1
- https://developers.openai.com/codex/changelog
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## inference

- #42324 is a meaningful pre-trust execution-boundary hardening. Dex has strong dedicated-account/project/credential boundaries, but current Runtime host preflight/evidence still invokes some host helpers by command name and the Codex adapter can use PATH discovery when `DEX_CODEX_CLI_PATH` is absent. Dex therefore must not claim protection from hostile workspace PATH selection until an approved-host canary passes or executable provenance is explicitly pinned/hardened.
- #42326 has the same security invariant as the Dex local filesystem spool: a local coordination/rendezvous path must not be replaceable or broadly writable by another identity while active. Current Dex anti-junction/exclusive-file controls are useful but Windows DACL/current-principal/replacement-resistance E2E remains unverified.
- #42320 means provider thread residency is more explicitly bounded and can be much shorter than earlier behavior. Dex durability must remain Task/Result/checkpoint based rather than relying on an unsubscribed App Server thread remaining in memory.
- #42325 improves transcript replay consistency, but provider replay remains presentation/provenance only and cannot become Task, approval, mutation, or publication authority.
- #42323 reinforces that Desktop availability cannot be a single recovery path; crash recovery should inspect canonical Task and Git/worktree/checkpoint evidence before any worker restart.

## proposal

### Runtime #28 future-stable/approved-host gates

- Prefer an absolute, approved, host-owned Codex executable/package provenance over workspace-controlled PATH discovery.
- Use a hostile-PATH fixture that supplies fake `codex`, `git`, `gh`, `curl`, `npm`, `tmux`, `where` or equivalent helpers and prove they cannot execute during preflight, doctor, startup, plugin sync, model discovery, or worker launch.
- PATH/helper ambiguity must fail closed with mutation 0; do not compensate with a broader sandbox, alternate paid provider, automatic updater, or API fallback.
- On Windows, prove the Dex spool/control directory has only the explicitly intended principals, rejects broad write ACLs, rejects junction/reparse/replacement attacks, and does not accept an unexpected/elevated peer merely because it can reach the rendezvous location.

### Runtime #34/#35 future-stable continuity gates

- Disconnect/unsubscribe beyond the effective App Server unload delay must not lose canonical Task/Result/checkpoint continuity or create duplicate execution.
- If an ephemeral provider thread is unloaded, a fresh bounded provider session may be used while preserving the same Dex Task ID and rejecting stale `attemptId` events.
- Replay duplicates/partials must not trigger duplicate Task submission, approval, mutation, or publication.
- A Windows Desktop crash must trigger read-only recovery against canonical Task + Git/worktree/checkpoint evidence before any restart; PWA/status-result remains the independent recovery surface and requirement re-entry remains zero.

## unknown / Not Checked

- First official non-prerelease stable containing #42318/#42320/#42324/#42325/#42326.
- Approved Windows-host hostile-PATH executable-selection E2E.
- Approved Windows-host Dex spool/control-directory DACL, principal isolation, and replacement-resistance E2E.
- App Server unload/replay continuity across Work/mobile/Desktop using the future stable.
- #42323 maintainer-confirmed root cause, affected build range, and fixed release.

## PASS / FAIL / Not Checked

| Item | Result |
|---|---|
| Official PR merge/scope verification for #42318/#42320/#42324/#42325/#42326 | PASS |
| Official issue #42323 state/labels/body verification | PASS |
| Latest non-prerelease Codex release | PASS — `0.152.1` |
| Current approved Wiki/Runtime main and #28/#34 boundaries compared | PASS |
| Runtime PR #116 branch validation `33669653078` | PASS |
| Runtime PR #116 static/unit/smoke/dependency audit | PASS |
| Runtime PR #116 branch Vercel | PASS |
| Runtime operational code/permission/sandbox/model/billing/plugin state changed | PASS — no operational change |
| First stable containing these upstream PRs | Not Checked |
| Approved-host hostile-PATH and Windows coordination ACL E2E | Not Checked |
| Future-stable unload/replay/Desktop recovery E2E | Not Checked |
| FAIL | none |

## Preserved safety boundaries

No prerelease/experimental activation, automatic upgrade, paid API, automatic paid fallback, extra paid usage/reset/credit consumption, broader filesystem/network/OAuth/MCP permission, `danger-full-access`, automatic approval, multi-writer, destructive migration, automatic merge/deploy/publication, plugin/Skill automatic install/update/delete/reconcile, or external messaging is enabled by this watch.

Canonical authority remains approved GitHub `main`, the GitHub Task Bus, bounded approval/mutation locks, durable Result/receipt, project registry, and independent verification.