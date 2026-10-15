# Codex session, Windows crash, and hook lifecycle watch — 2026-09-03 late cutoff

Status: source-backed provider watch / future-stable and approved-host/surface gates. This note enables no prerelease/experimental capability, paid API, automatic paid fallback, broader permission, provider-state repair, Code Mode hook bypass, Side Chat recovery surgery, app downgrade/reinstall, external messaging, destructive migration, or deployment behavior.

## Scope and cutoff

This addendum starts after the prior provider watch that screened through OpenAI Issue #42501. A fresh official `openai/codex` check found no merged `main` commit after PR #42458. The latest official non-prerelease release remains Codex `0.153.0`.

Fresh issue candidates were screened before selection:

- #42504 — SharePoint connector `list_folder_items` Graph 400 report. Current Dex has no SharePoint dependency, so no operational gate is added.
- #42505 — IDE `Edit Message` / `Fork Message` UI regression. This does not change canonical Task authority.
- #42506 — withdrawn and superseded by #42507.
- #42507 — native Windows CLI Remote Control request on `0.152.1`; this reinforces the already-tracked Windows daemon/stable-promotion gap associated with upstream PR #42405 and does not justify a duplicate Dex gate or capability activation.
- #42508 — history-notes instruction concern. Dex experimental context management/history-notes remains disabled, so no production behavior changes.
- #42509 — Side Chat/subagent session exists locally but can be inaccessible from Desktop UI.
- #42510 — Windows Desktop main-process crash report with recent chat entries disappearing.
- #42511 — cancelled nested Code Mode tool calls can leave stale `PreToolUse` hook activity displayed as Running.

## Findings

### confirmed issue signal / current-stable applicability unknown — #42509: Side Chat visibility can diverge from persisted subagent state

OpenAI Issue #42509 is open with `bug`, `app`, `subagent`, and `session` labels. The reporter uses macOS Desktop `26.825.51511` with bundled Codex `0.151.0-alpha.7.2` and paginated history. They report Side Chats that cannot be opened because the renderer treats the conversation as unknown even though the session JSONL exists, the child record exists in `state_5.sqlite`, and the parent-child spawn edge exists. The reporter observed parent threads with many child records still marked open, but explicitly labels the root-cause explanation as a hypothesis.

Dex inference:

- provider Side Chat visibility, renderer registration, and local session state are provenance/recovery evidence, not canonical Task completion or result authority;
- a selected child/subagent must remain bound to canonical `taskId`, `attemptId`, parent/dependency identity, capability, and a durable bounded result/receipt independent of whether the provider UI can reopen that child conversation;
- inability to reopen a child conversation is a provider-surface FAIL/unknown condition, not evidence that the Task should be recreated or the worker rerun;
- child/subagent fan-out must stay bounded and each spawned worker must have a reconciled terminal outcome before the parent can claim a complete worker manifest;
- automatic repair/delete/rebuild of provider SQLite, JSONL, spawn-edge state, or conversation catalogs is not an approved remediation.

Official source: https://github.com/openai/codex/issues/42509

### confirmed correlated issue signal / root cause and fix unknown — #42510: Windows Desktop crash can also remove recent visible chat entries

OpenAI Issue #42510 is open with `bug`, `windows-os`, and `app` labels. The reporter uses Windows Desktop `26.901.20858` and reports recurrent main-process crashes, including Crashpad evidence with `capture_kind: crash` and `ptype: browser`, followed by loss of recent visible chat entries. The reporter says crashes can occur while idle or around application switching. No exact faulting function or causal trigger is established. GitHub automation identified #42477 and #41268 as possible duplicates; #42477 is already tracked by Dex as a Windows crash/restart signal.

Dex inference:

- this strengthens, rather than replaces, the existing #28 crash/restart gate: provider UI/history loss must not erase or redefine canonical Task/checkpoint/result state;
- approved-host crash recovery must prove that an active or idle provider crash cannot create a second writer, duplicate Task, duplicate mutation, duplicate result publication, or automatic failover after an ambiguous mutation;
- on restart, Dex must reconcile the existing canonical `taskId`/`attemptId`, lease, checkpoint, commit/diff evidence, and durable result before any retry;
- missing recent provider chat entries must be treated as surface/history loss. They are not a reason to ask the user to re-enter an already accepted requirement when canonical context is available;
- automatic app downgrade/reinstall, Crashpad manipulation, provider-history repair, SQLite/JSONL deletion, or protected-runtime workaround remains prohibited.

Official source: https://github.com/openai/codex/issues/42510

### confirmed issue signal / causal fix unknown — #42511: hook Running state can outlive the actual hook process after cancellation

OpenAI Issue #42511 is open with `bug`, `TUI`, `CLI`, `tool-calls`, and `hooks` labels. The reporter uses CLI `0.152.1`, ChatGPT Pro, GPT-5.6 Luna, and Linux. During concurrent nested Code Mode tool calls, one denied call can cancel a sibling after `hook/started` has been emitted but before the matching `hook/completed`; the TUI can then continue showing a `PreToolUse` hook as Running after the subprocess has exited. The reporter points to a possible cancellation hole in current source, but no maintainer-confirmed root cause or fix exists at this cutoff.

Dex inference:

- provider hook/TUI `Running` state is a lifecycle projection, not sufficient process-liveness, mutation ownership, approval, or Task-state evidence;
- if hooks/Code Mode are used by a future Dex worker, every started hook must either receive a terminal lifecycle event or be deterministically reconciled from tool-attempt identity, cancellation state, actual process/child liveness, and canonical Task state within a bounded window;
- an unmatched `hook/started` cannot block a Task indefinitely, authorize a retry, cause a second worker, relax a policy, or be treated as evidence that the protected command is still executing;
- hook denial remains fail-closed. Stale UI state is not a reason to bypass hooks or broaden filesystem/network/approval permissions.

Official source: https://github.com/openai/codex/issues/42511

## Proposal / future gates

### Runtime #28 — approved Windows-host crash/restart recovery

- [ ] Exercise a bounded provider Desktop/app-container crash or equivalent synthetic termination in both idle and active Task phases without touching operational repositories.
- [ ] Prove canonical Task/checkpoint/result survive provider UI/history loss and restart with the same `taskId` and valid `attemptId` lineage.
- [ ] Prove crash/restart produces duplicate writer 0, duplicate mutation 0, duplicate result publication 0, and no provider failover after ambiguous mutation.
- [ ] Reconcile provider process/session/UI state against canonical lease/checkpoint before retry; native recent-chat loss does not trigger user requirement re-entry when canonical context exists.
- [ ] Record the actual Desktop and CLI/App Server versions independently; an older/bundled alpha report does not establish a current stable regression without approved-host evidence.

### Runtime #35 — subagent result durability and bounded lifecycle

- [ ] Every selected subagent/Side Chat has canonical parent Task, `attemptId`, dependency/capability identity, and a bounded terminal result or explicitly preserved FAIL/Not Checked state.
- [ ] Provider inability to reopen a Side Chat cannot erase completed evidence, hide conflicting evidence, or cause automatic respawn/re-execution.
- [ ] Fan-out is bounded; stale `open`/unknown provider child projections do not count as live workers without process/lease evidence.
- [ ] Independent verifier consumes canonical artifacts/result evidence rather than relying on the provider's Side Chat renderer or local conversation catalog.
- [ ] Provider SQLite/JSONL/conversation-catalog repair or deletion is never automatic.

### Future hook / Code Mode lifecycle gate

- [ ] Before any Dex operational dependency on provider hooks or nested Code Mode, identify an official stable containing the relevant lifecycle behavior or fix.
- [ ] For every emitted hook start, observe a terminal completion/cancellation event or deterministic bounded reconciliation tied to exact tool/run identity.
- [ ] TUI hook activity alone never establishes live process, approval, mutation ownership, or Task status.
- [ ] Cancellation/denial fault injection proves no stuck Task, duplicate execution, policy bypass, or permission expansion.

## Current concurrent Dex work preserved

Runtime Draft PR #157 (`codex/issue-28-windows-phase3-20260903`) is an existing user-owned review-only Phase 3 safety-hardening change. At this cutoff it remains Draft/open with PASS automated checks but explicit physical Windows FAIL and Not Checked items. This watch does not edit, rebase, close, approve, or merge PR #157 and does not alter its branch. Issue #28 must remain open until its approved-host evidence passes.

## Explicitly not enabled

- Side Chat/subagent provider-state repair, SQLite/JSONL deletion/rebuild, or conversation-catalog surgery;
- hook bypass, hook auto-approval, permission relaxation, or broader filesystem/network/OAuth/MCP access;
- app downgrade/reinstall, Crashpad manipulation, protected-runtime workaround, or duplicate-worker recovery;
- prerelease/experimental context management, Code Mode, or multi-agent capability activation;
- paid API, automatic paid fallback, credit purchase, banked reset use, or plan change;
- external messaging, destructive migration, automatic merge/deploy.

## Status

- Fresh official `openai/codex` `main`: PASS — PR #42458 remains the latest merged commit at this cutoff.
- Latest official non-prerelease Codex: PASS — `0.153.0`.
- #42509/#42510/#42511 issue existence and open state: PASS.
- #42509 current `0.153.0` / current Desktop reproduction and maintainer-confirmed fix: Not Checked.
- #42510 root cause, current-version reproduction, and maintainer-confirmed fix: Not Checked.
- #42511 root cause/fix and current `0.153.0` reproduction: Not Checked.
- Approved Windows-host crash/history-loss E2E: Not Checked.
- Side Chat/subagent canonical-result recovery E2E: Not Checked.
- Hook cancellation reconciliation E2E: Not Checked.
- Runtime Draft PR #157 physical Windows Gate: FAIL / Not Checked as recorded by that PR and Issue #28; preserved unmodified.
- Runtime behavior/config/model/permission/billing mutation from this watch: 0.
