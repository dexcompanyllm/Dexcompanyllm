# Codex origin, delegation, and Windows boundary evidence — 2026-09-03

- Evidence type: provider watch
- Source: official `openai/codex` repository
- Runtime effect: none; watch and future-stable / approved-host gates only
- Latest non-prerelease release observed: `0.153.0`
- Previous watch cutoff: PR #42455 / Issue #42456

## Confirmed upstream change

### PR #42458 — thread originators through App Server

Merged commit: `728cb12fe5794b0c3a8e776fb4994b1650b973a8`

OpenAI adds the creation-time thread `originator` to thread responses and `thread/started`, preserves the first recorded value through list/read/resume/rollout/SQLite, and adds a hosted-backend `originators` allowlist for `thread/list`.

Dex classification: **confirmed**.

Dex boundary: originator is routing/audit provenance only. It is not Task identity, approval, authorization, billing authority, mutation ownership, or proof of canonical payload delivery.

Source: https://github.com/openai/codex/pull/42458

## Official issue signals

### #42457 — remote daemon cwd can identify the wrong project

The report says `--remote` plugin hooks and App Server thread metadata use the daemon startup cwd instead of the client/session project cwd. The report targets CLI/App Server `0.152.1` on macOS.

Dex classification: **confirmed signal / root cause and current-stable applicability unknown**.

Dex boundary: project identity must come from the Dex canonical repository/project registry plus executor-native realpath, not hook/thread cwd. Mismatch is fail-closed before mutation and must not leak project-scoped plugin state across projects.

Source: https://github.com/openai/codex/issues/42457

### #42460 — Windows cross-thread delegation card without destination model prompt

The report says Windows Desktop can render a `send_message_to_thread` / `codex_delegation` card while the destination model context does not contain the delegated prompt, allowing stale output or false completion.

Dex classification: **confirmed signal / root cause and fix unknown**.

Dex boundary: provider dispatch/UI success is not handoff success. A delegated worker must prove receipt of the current Task ID, attempt ID, payload/instruction hash and capability scope before mutation. Missing receipt means zero mutation and canonical Task recovery without user re-entry or duplicate writer execution.

Source: https://github.com/openai/codex/issues/42460

### #42463 — Windows sandbox setup refresh blocks existing-file edits and browser initialization

The report uses Windows App `26.831.2377.0` and shows `apply_patch` verification for existing files and browser-control startup failing with `windows sandbox failed: helper_unknown_error: setup refresh had errors`, while read-only PowerShell remained usable.

Dex classification: **confirmed signal / root cause and fix unknown**.

Dex boundary: approved-host readiness must prove existing-file read/edit plus disposable create/read/delete under the sandbox. Browser/computer use, when required, gets a separate synthetic init canary. Failure stays fail-closed without elevated/out-of-sandbox fallback, ACL/system weakening, destructive state repair, or broader permissions.

Source: https://github.com/openai/codex/issues/42463

### #42461 → #41463 — Windows/WSL project path migration

#42461 supplied a current reproduction and was closed by the reporter as a duplicate of still-open #41463. The specific implementation-level root-cause explanation remains reporter inference.

Dex classification: **confirmed duplicate signal / root cause and fix unknown**.

Dex boundary: future WSL/remote support must normalize project roots to the selected executor's path convention before import/create. Windows drive paths, UNC/WSL paths and Linux paths are not interchangeable. Failure stays blocked; no provider SQLite/project-registry deletion or destructive migration is allowed as an automatic workaround.

Sources:
- https://github.com/openai/codex/issues/42461
- https://github.com/openai/codex/issues/41463

### #42462 — Windows VS Code archived-chat UI parity

The report says archived local chats cannot be surfaced/restored through the Windows VS Code extension UI, while CLI `codex unarchive <session-id>` works.

Dex classification: **confirmed signal / screened**.

Dex boundary: provider archive/sidebar UI is non-canonical. No new execution authority or automatic repair is introduced; canonical Task/Result state remains GitHub-backed.

Source: https://github.com/openai/codex/issues/42462

## Dex proposal adopted as tracking only

### Runtime #28

- validate synthetic existing-file read/edit and create/read/delete before approved Windows-host mutation;
- validate browser/computer-control init only when a Task actually requires it;
- reject elevated/out-of-sandbox or destructive recovery after sandbox setup failure;
- bind remote/daemon/WSL project identity to canonical project registry + executor-native realpath rather than provider cwd;
- fail closed on Windows↔WSL path-conversion ambiguity.

### Runtime #35

- retain App Server `originator` as provenance only;
- require destination worker receipt of Task ID + attempt ID + payload/instruction hash + capability scope before delegated mutation;
- UI/delegation dispatch without destination receipt cannot satisfy completion;
- recover through the same canonical Task Bus/status-result path without asking Ethan to restate the task or spawning a duplicate writer.

## Explicit non-actions

No prerelease/experimental capability, daemon/updater, cross-thread or external messaging transport, broader filesystem/network/OAuth/MCP permission, destructive migration/registry repair, Plugin/Skill mutation, paid API/automatic paid fallback/reset/credit consumption, multi-writer, merge/deploy automation, or production mutation is enabled by this watch.

## Verification status

- official source review: PASS
- docs-only scope: PASS
- operational behavior/config mutation: 0
- Codex `0.153.0` approved Windows-host E2E: Not Checked
- #42458 first stable inclusion: Not Checked
- #42457/#42460/#42463 maintainer-confirmed fixes: Not Checked
- #41463 fix/release: Not Checked
