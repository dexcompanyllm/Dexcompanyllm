# Codex git-clean destructive-scope evidence — 2026-09-03

## Official repository signal

Classification: **confirmed signal / unknown root cause**.

Source: https://github.com/openai/codex/issues/42355

OpenAI Codex Issue #42355 opened on 2026-09-02 20:46:49 UTC and reports **Codex CLI 0.152.1 on Windows**. The reporter says a request to remove specific nested ignored skill directories led to a command equivalent to `git clean -fdX -- config/<nested-paths>`, but Git's ignored-parent behavior caused the whole ignored `config/` parent to be removed, including local secrets and operational scripts outside the intended subset. The report states that no destructive warning, resolved-scope confirmation or reviewed `git clean -ndX` dry-run preceded execution.

This confirms the existence and content of the report in the official OpenAI Codex repository. It does **not** establish a maintainer-confirmed Codex root cause, prevalence or fixed release. No secret values were attached to the report.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was PR #125 merge `104cc47a3b6df08986afebfe3a74515330853335`.
- Runtime PR #126 added one docs-only watch file and merged as `575d426264303814e06f7484f110aa506a84dab2`.
- Runtime PR #126 scope: **1 file / +67 / -0**; no deletion command, Runtime code, permission, model, billing, Plugin/Skill state or deployment changed.
- Runtime validation `33681472275` PASS: dependency install, static checks/unit tests/smoke and production dependency audit all PASS; branch Vercel PASS.
- Runtime #28 already requires exact approval scope, mutation locking, one active writer, stale-attempt rejection and independent verification, and now explicitly tracks ignored/untracked destructive-clean manifest validation.
- Latest official non-prerelease Codex remains `0.152.1`; #42355 reports that version but its root cause/fix is unknown.

### inference

Recursive cleanup of ignored/untracked content is a high-risk destructive class because the effective deletion set can be broader than the nested path arguments visible in a command. A post-action diff cannot restore local ignored files or credentials. The safe object of approval is therefore the **resolved pre-action deletion manifest**, not the command-line string alone.

A partial backup of intended child paths is also insufficient if Git can remove a larger ignored parent. Dex should prove backup completeness against the same resolved manifest used for approval, then invalidate approval if repository/worktree state changes before execution.

### proposal — tracked in Runtime #28

For `git clean` and equivalent destructive cleanup on an approved host:

- treat force/directory/ignored/untracked recursive cleanup (`-f`, `-d`, `-x`, `-X` and equivalents) as high-risk destructive mutation;
- run a non-mutating dry-run with the same flags/pathspec and normalize the candidate deletion manifest before approval;
- require every candidate realpath to be contained in the explicitly approved literal targets; parent/sibling/wildcard/unrelated ignored or secret-bearing candidates fail closed with mutation 0;
- resolve actual Git ignore/pathspec behavior from the repository/worktree instead of assuming nested CLI arguments bound the deletion scope;
- if an ignored parent can be removed while only children were requested, require a safer literal deletion plan and fresh approval;
- prefer individually validated literal deletion for bounded targeted removals rather than recursive clean flags;
- if backup/rollback is part of the approved plan, verify backup coverage for the **entire effective deletion manifest** before mutation;
- treat local secret/config/operational paths as deny-by-default unless exact targets plus recovery are separately approved, and never persist secret values in GitHub evidence;
- revalidate repository/worktree identity, mutation lock and candidate manifest immediately before execution; drift invalidates the prior approval;
- after execution, verify only approved candidates disappeared and unrelated tracked/untracked/ignored user files remain;
- timeout, path ambiguity, Git-semantic uncertainty, dry-run mismatch or ambiguous execution result fails closed; retries require checkpoint reconciliation and cannot blindly repeat deletion.

### unknown / Not Checked

- OpenAI maintainer-confirmed root cause for #42355
- prevalence across 0.152.1 Windows environments
- upstream fix or first fixed stable
- approved Dex Windows-host dry-run-manifest-vs-execution negative E2E

## Safety boundary

No files were deleted, no cleanup command was executed, and no secrets were read or copied. No permission broadening, prerelease/experimental capability, paid API/automatic paid fallback, Plugin/Skill mutation, destructive migration, deployment or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI #42355 official repo signal | PASS |
| Root cause/fixed release | Not Checked |
| Latest official non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #126 scope | PASS — docs-only, 1 file / +67 / -0 |
| Runtime validation `33681472275` | PASS |
| Runtime #28 tracking | PASS |
| Approved-host destructive-clean negative E2E | Not Checked |

No FAIL is introduced.
