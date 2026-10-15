# Codex Windows sandbox, Remote route, Voice packaging evidence — 2026-09-03

## Scope

This evidence records meaningful official OpenAI Codex changes discovered after the approved reasoning-provenance watch. It is watch-only: no prerelease, Voice, Remote Control, broader permission, paid path, Plugin/Skill mutation, destructive action, or external messaging is enabled.

Canonical execution authority remains Dex GitHub Task Bus + durable Result/receipt. Runtime #28 approved Windows-host E2E remains pending and #34/#35 remain blocked behind it.

## Confirmed official evidence

### PR #42330 — Windows sandbox runner integrity

- Source: https://github.com/openai/codex/pull/42330
- Merged: 2026-09-02 19:05:54 UTC
- Merge SHA: `f59905647a5ca8681b87c5900036081955fb8750`
- OpenAI protects `.sandbox-bin` from inherited writable ACEs by applying a protected DACL to the runner directory.
- The change covers full and provision-only setup and runner files created before/after locking.
- Post-merge review-thread check: PASS — no unresolved review thread observed.

### Issue #42331 — Remote Control route hydration mismatch

- Source: https://github.com/openai/codex/issues/42331
- Status: open official-repo signal; labels `bug`, `app`, `app-server`, `remote`.
- A reporter shows an exact Remote Control `threadId`/`hostId` can succeed through `list_threads` and `read_thread` while explicit-host `wait_threads` temporarily says no thread exists.
- A read-only discovery without `hostId` can rehydrate the route and the explicit-host wait can then work again while the underlying task remains present.
- Maintainer-confirmed root cause, affected range, and fixed release: **unknown**.

### PR #42332 — package prepared Voice runtimes

- Source: https://github.com/openai/codex/pull/42332
- Merged: 2026-09-02 19:15:54 UTC
- Merge SHA: `dc0dc4f15d2a5be395b6fa3deb2aca898f8a94d5`
- Voice package assembly can optionally include a prepared runtime after validating target, pinned source-manifest digest, plugin inventory, paths and file hashes; only declared files are copied and hashes are rechecked after copy.
- Linux/macOS/Windows layouts, invalid receipts/paths, modified inputs, symlinks and copy-time changes are tested.
- OpenAI explicitly says the development receipt is not authenticated release proof and native loading, media/privacy controls, SDK linking and actual audio proof remain later stages.
- Post-merge review-thread check: PASS — no unresolved review thread observed.

## Classification

### confirmed

- PR #42330 and PR #42332 are merged to upstream `main`.
- Issue #42331 is a current official-repository bug signal.
- Latest official non-prerelease Codex remains `0.152.1`; the new merges are not automatically available in that stable.
- Runtime PR #118 is docs-only and merged as `8e7eeda32ec6699b958e4d4e2734601fc98b703d`.
- Runtime PR #118 branch validation `33672890032` PASS: dependency install, static/unit/smoke, and production dependency audit all PASS; branch and merge Vercel PASS.

### inference

- #42330 is directly relevant to Dex dedicated Windows worker integrity: a workspace capability must never be able to modify the runner enforcing the sandbox through inherited ACLs.
- #42331 means provider route lookup failure cannot safely be treated as task loss; effectful work must not be replayed until canonical Task/Result/checkpoint and exact host/thread identity are reconciled.
- #42332 improves future Voice package provenance, but does not establish a trusted release, user-facing Voice contract, microphone/privacy safety, or approved-host readiness.

### proposal — already tracked in Runtime

- Runtime #28: future stable/approved-host gate for protected runner DACL, no inherited workspace write/delete access, full/provision-only parity, junction/path-replacement failure, and zero broader-sandbox fallback.
- Runtime #34: bounded read-only Remote route reconciliation; exact thread/host/account/workspace revalidation; never duplicate Task/worker/mutation/publication because `wait_threads` is ambiguous.
- Runtime #30: extend the Voice preparation gate through package inventory/hash/receipt validation while keeping Voice, microphone permissions and native runtime installation disabled until release authenticity, loader, privacy and audio E2E all pass.

### unknown / Not Checked

- first official non-prerelease stable containing #42330/#42332
- #42331 maintainer-confirmed root cause and fixed release
- approved Windows-host `.sandbox-bin` protected-DACL runner-integrity E2E
- approved Remote Control route-hydration/reconciliation E2E
- official user-facing Voice contract, release authenticity/signing, microphone/privacy/media lifecycle and real audio E2E

## Safety and cost boundary

No automatic Codex upgrade, prerelease/experimental capability, Voice/Remote activation, broader filesystem/network/OAuth/MCP permission, `danger-full-access`, automatic approval, multi-writer, Plugin/Skill install/update/delete/reconcile, paid API, automatic paid fallback, extra paid usage, credit/reset redemption, destructive migration, deployment/publication, or external messaging is enabled.

Subscription-first remains unchanged. Provider thread/route/runtime receipts are provenance only and cannot replace Dex Task ID, `attemptId`, explicit approval, mutation lock, project/account/workspace binding, canonical Result/receipt, or independent verification.

## Validation status

| Check | Result |
|---|---|
| OpenAI #42330 scope/merge reviewed | PASS |
| OpenAI #42331 official signal reviewed | PASS |
| OpenAI #42332 scope/merge reviewed | PASS |
| Runtime PR #118 docs-only diff/security scope | PASS — one file, +122/-0 |
| Runtime validation `33672890032` | PASS |
| Runtime branch/merge Vercel | PASS |
| Runtime #28/#34/#30 tracking updated | PASS |
| Current operational capability/permissions/cost behavior changed | PASS — no |
| First stable + approved-host E2E items above | Not Checked |

No operational FAIL was introduced by this watch.