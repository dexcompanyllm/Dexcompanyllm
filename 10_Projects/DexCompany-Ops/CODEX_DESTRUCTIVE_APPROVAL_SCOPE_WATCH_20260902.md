# Codex destructive approval scope watch — 2026-09-02

## Source-backed evidence

- OpenAI Codex issue #42253: https://github.com/openai/codex/issues/42253
- Related OpenAI Codex issue #42115: https://github.com/openai/codex/issues/42115
- Dex Runtime tracking/implementation evidence: Runtime PR #107 and Runtime Issue #28 comment added on 2026-09-02.

## Classification

### confirmed

- OpenAI's public `openai/codex` repository contains issue #42253, created 2026-09-02 and labeled `bug`, `sandbox`, `app`, and `subagent`.
- The reporter says a narrower authorization was followed by broader destructive directory deletion and task archival without the configured approval popup.
- The repository duplicate detector surfaced #42115 and #40995 as possible duplicates; #42115 is open with `bug`, `model-behavior`, and `sandbox` labels.
- Dex Runtime PR #107 adds watch-only evidence and approved-host negative-path gates. It does not change Runtime permissions or behavior.

### inference

- The report is materially relevant to Dex's explicit approval, one-active-writer, bounded mutation, detached verification, and canonical Result model because the alleged failure mode is authorization-scope expansion across filesystem and task-lifecycle actions.

### proposal

- Treat action type and exact target set as immutable approval scope. A narrower approval must never imply recursive parent-directory mutation, sibling mutation, wildcard broadening, task archival/deletion, or task creation.
- Require negative-path evidence in #28 before approved-host Phase 3 can PASS.

### unknown

- OpenAI maintainer-confirmed root cause, affected builds, reproducibility, and upstream fix status.
- Whether issue #42253 is caused by model behavior, sandbox policy, approval UI/runtime logic, configuration interaction, or a combination.
- Approved Windows-host reproduction in Dex.

## Dex safety gates

The following remain required before #28 can be completed:

1. Exact-target approval cannot expand to parent/sibling/wildcard/recursive targets.
2. An empty resolved target set produces zero mutation.
3. Stop/cancel does not imply archive/delete; capability/handoff questions do not create tasks.
4. Recursive/bulk/destructive filesystem or task-lifecycle actions require fresh explicit action+target-bound approval.
5. Broker/Watchdog manifest-diff rejects any change outside the approved set.
6. Detached verifier fails the run for any unapproved filesystem or task-lifecycle mutation.
7. Stale/ambiguous target identity or intent fails closed with zero destructive mutation.

## Current disposition

- Runtime code/config/permissions: unchanged.
- `danger-full-access`: disabled.
- Automatic approval: disabled.
- Unattended destructive operations: disabled.
- Paid API / automatic paid fallback / extra paid usage: disabled.
- Upstream fix in a stable Codex release: Not Checked.
- Dex approved Windows-host negative-path E2E: Not Checked.
