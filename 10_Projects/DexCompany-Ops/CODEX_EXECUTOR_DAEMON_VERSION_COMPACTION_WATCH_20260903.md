# Codex executor/daemon/version/long-task watch — 2026-09-03

## Scope

Previous canonical provider-watch cutoff: OpenAI Codex PR #42388.

Official sources reviewed after that cutoff:

- https://github.com/openai/codex/pull/42391
- https://github.com/openai/codex/pull/42392
- https://github.com/openai/codex/pull/42395
- https://github.com/openai/codex/issues/42393
- https://github.com/openai/codex/issues/42398
- https://github.com/openai/codex/issues/42394

Latest official non-prerelease Codex remains `0.152.1`. No prerelease is promoted by this watch.

## confirmed

### PR #42391 — executor-context `apply_patch` authorization

OpenAI merged executor-native patch authorization. Patch targets are evaluated as `PathUri` against the active filesystem policy context and selected executor path convention, including workspace roots. Executor-managed and local platform sandbox routes are distinguished, and full-disk/special-path policy checks follow the selected Windows/POSIX convention.

Dex relevance: future remote/Windows execution can avoid host-path projection mistakes when deciding writable roots and additional permissions.

### PR #42392 — managed daemon updates on Windows

OpenAI merged Windows managed-daemon update support using a non-interactive PowerShell installer, managed App Server restart and updater readiness handoff. Windows Job containment, rollback, inaccessible-process handling and PID reuse protection are included in upstream tests.

Dex relevance: potentially lower recovery/restart work for a future managed Windows worker, but unattended self-update is not enabled.

### PR #42395 — running Codex version provenance

OpenAI merged `CODEX_VERSION` injection into shell/Unified Exec and a reserved `codex_version` field in MCP turn metadata. The value comes from the running package version and overrides stale shell-policy/snapshot values; caller metadata cannot replace the reserved field.

Dex relevance: useful execution provenance for Task receipts and cross-surface diagnosis, but it is not authorization or billing authority.

## confirmed signal / unknown root cause

### Issue #42393 — remote compaction v2 failure

The official issue is open with `bug`, `context` and `app` labels. A Plus/macOS report says long `/goal` work can fail during remote compaction and pressing Continue can reproduce the same failure.

Unknown: maintainer-confirmed root cause, prevalence, fixed stable and Dex-host reproduction.

### Issue #42398 — nested read-only `codex exec` startup blocker

The official issue is open with `bug`, `sandbox`, `exec`, `CLI` and `app-server` labels. A `0.151.0` reporter reproduced startup failure when an existing `~/.codex/installation_id` was readable but not writable in the enclosing sandbox. The report also identifies the same read/write/create resolver implementation in inspected `0.152.0` source.

Unknown: maintainer-confirmed fix, sufficiency of the proposed resolver change, current approved-Dex-host reproduction and first fixed stable.

### Issue #42394 — spreadsheet render/export mutation

The official issue reports a synthetic XLSX where `SpreadsheetFile.render()` followed by export changes explicit rich-text font sizes from `11` to `1100`, while import/export without rendering preserves `11`. The reported environment includes Codex CLI `0.152.1` and the Spreadsheets plugin.

Unknown: maintainer-confirmed root cause/fix and fixed plugin/artifact-tool release. The reporter's points-vs-hundredths explanation is an inference.

## inference

1. #42391 is directly aligned with Dex's project→realpath/environment and mutation-scope security model. The benefit only holds if executor identity, workspace roots, path convention and sandbox route are verified before any protected mutation.
2. #42392 can improve availability, but automatic self-update would introduce supply-chain/version drift during long-running work. Controlled stable promotion remains preferable until maintenance E2E exists.
3. #42395 can reduce version ambiguity after reconnect/resume or multiple surfaces. `codex_version` should be recorded as provenance, never trusted as Task identity, approval, permission, model-selection or billing authority.
4. #42393 strengthens the need to treat provider compaction/history as recoverable execution state rather than canonical Task state. Continue/retry must not replay successful mutation.
5. #42398 exposes an implicit host-state write prerequisite that can defeat a nominally read-only nested worker. Dex must not broaden `CODEX_HOME` writes merely to make a reader/verifier start.
6. #42394 is outside the current Dex Runtime dependency path, but it is a relevant artifact integrity edge if Dex later uses the Spreadsheets plugin for canonical XLSX production.

## proposal / tracked gates

### Runtime #28 — executor and Windows-host safety

After the first official non-prerelease stable containing #42391/#42392/#42395:

- [ ] patch targets are evaluated in executor-native Windows/POSIX convention, not controller convention;
- [ ] workspace roots and executor identity remain bound to the approved Dex project/environment registry;
- [ ] full-disk/special-path aliases and explicit denies cannot be weakened by normalization;
- [ ] executor-managed sandbox availability is proven before it can justify patch auto-approval;
- [ ] ambiguous executor/path/sandbox/permission state fails closed with mutation 0;
- [ ] actual patch manifest remains inside the Dex-approved mutation scope and detached verification rejects drift;
- [ ] managed-daemon update remains disabled until installer provenance, readiness handoff, rollback, Job containment and PID-reuse behavior pass on the approved host;
- [ ] no updater may silently alter model/provider/permission/paid route/plugin state or create a second active writer;
- [ ] `codex_version` is cross-checked against the approved running binary and mismatch is recorded as unknown/blocked for protected execution rather than auto-upgrading.

### Runtime #35 — long-task/read-only worker reliability

- [ ] remote-compaction failure/Continue does not duplicate Task, worker, mutation or canonical Result;
- [ ] checkpoint/evidence and canonical user requirements survive recovery independently from provider recap/history;
- [ ] unrecoverable provider context blocks/fails explicitly rather than fabricating continuity;
- [ ] valid existing installation ID can be reused under an outer read-only worker boundary without broadening profile writes, or fails bounded with zero mutation;
- [ ] missing/invalid ID creation/repair is tested only in a disposable writable profile;
- [ ] no automatic ACL/chmod/sandbox weakening, personal-profile reuse, paid/provider fallback or less-isolated identity promotion is allowed as a workaround;
- [ ] maintainer-confirmed fixes and first fixed stable for #42393/#42398 are recorded before dependency.

### Spreadsheet artifact guard — only if the capability is adopted

Until #42394 is fixed and verified, a future Dex spreadsheet workflow should export the canonical workbook before rendering, render only a disposable re-imported QA copy, never re-export that rendered QA instance as canonical output, and compare semantic workbook data plus visual QA before publication.

## filtered candidates

- PR #42397: TUI submodule extraction/refactor with stated behavior preservation — no operational Dex change.
- Issue #42389: recap-language bug — user-facing quality signal but no current Dex canonical/security gate change.
- Issue #42396: request to update curated Vercel plugin — feature request, not evidence that the managed package has been updated.

## safety boundary

No change in this watch enables:

- prerelease/experimental capability;
- managed-daemon automatic self-update;
- broader filesystem/network/OAuth/MCP permission;
- automatic patch approval outside current Dex policy;
- paid API, automatic paid fallback, extra paid usage, reset/credit spending or plan upgrade;
- Plugin/Skill automatic install/update/delete/reconciliation;
- hosted MCP writes, multi-writer, automatic merge/deploy, external messaging or destructive migration.

GitHub Task ID, attempt identity, approved project/environment mapping, explicit approval where required, mutation lock, deterministic checks, detached verifier and canonical Result/receipt remain authoritative.

## status

| Check | Result |
|---|---|
| OpenAI #42391/#42392/#42395 merge and scope | PASS |
| Official issue signals #42393/#42398/#42394 | PASS — signal confirmed only |
| Latest official non-prerelease Codex | PASS — `0.152.1` |
| Runtime/Wiki watch change | docs/evidence only |
| First containing/fixed stable | Not Checked |
| Approved-host executor/daemon/version/compaction/read-only E2E | Not Checked |
| Maintainer-confirmed issue root causes/fixes | Not Checked |
