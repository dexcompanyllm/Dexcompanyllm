# Codex Windows Startup / Chat Sync Watch — 2026-09-04

Supplemental cutoff: 2026-09-04 10:05 Asia/Seoul. These issue reports appeared after the primary 09:58 KST fresh check; the 23:00–05:59 quiet-window backlog had already been reconciled at 06:00.

## Source-backed facts

### Issue #42645 — Windows Store/MSIX bundled CLI present but not executable

Created at 10:00:50 KST for Codex Desktop `26.901.2854.0` on Windows x64. The reporter confirms `app/resources/codex.exe` exists, but direct execution returns `Access denied` while Desktop says the CLI cannot be located. File attributes report `Archive` only rather than `Encrypted`. No WindowsApps ACL change was intentionally made.

This is issue evidence, not a maintainer-confirmed root cause or fix.

Official source: https://github.com/openai/codex/issues/42645

### Issue #42644 — Linux `New chat` local-only / Work-style routing signal

Created at 09:59:54 KST for desktop package `26.901.20858` on Linux Mint with a Plus subscription. Existing cloud chats sync correctly and branching an existing cloud chat creates a cloud-backed branch, while `New chat` reportedly opens a Work-style composer and creates a local-only conversation absent from web/other devices.

This is issue evidence, not a maintainer-confirmed routing contract or cross-platform reproduction.

Official source: https://github.com/openai/codex/issues/42644

## Dex comparison and classification

Before this supplemental update:

- Runtime `main`: PR #177 `39d441ad55b1655680f02ab3393382b1c7a63315`.
- Wiki `main`: PR #155 `ebdf090fc1e8636ec150436a353fd59447989156`.
- #28 remains OPEN / approved Windows-host Phase 3 E2E Not Checked; #34 remains blocked until #28 PASS.
- Subscription-first auth, explicit worker executable identity, GitHub Task Bus authority, zero user re-entry and fail-closed diagnostics remain canonical.

### confirmed

- #42645 is a Windows startup issue report where bundled CLI existence does not imply executable readiness.
- #42644 is a Linux surface-continuity issue report where `New chat` persistence differs from existing/branched cloud chats.
- Neither has a maintainer-confirmed root cause/fix at this cutoff.

### inference

- Windows readiness must distinguish `missing`, `present`, `executable`, `launch denied`, `wrong version`, and App Server handshake states rather than treating file presence as PASS or all launch failures as `CLI missing`.
- Dex should not edit WindowsApps ACLs or auto-point `CODEX_CLI_PATH` at an unrelated binary to bypass a Store/MSIX failure.
- Provider UI labels and native chat/thread location are not proof of cloud persistence or canonical continuity; #34 must capability-detect local/cloud/surface behavior and fall back to PWA/GitHub Task Bus without requirement re-entry.

### proposal

- Add a bounded read-only executable/version/App Server launch probe to future approved Windows-host Doctor/compatibility validation.
- Preserve the existing approved standalone/subscription worker path if it remains healthy; do not switch executable source merely because the Desktop app is newer.
- Add `New chat` / branch / resume / Work↔Chat / local↔cloud / cross-device continuity to #34 E2E while keeping one canonical Task ID and zero duplicate submit/result.

### unknown

- Whether #42645 affects Ethan's approved Windows host, standalone CLI, or current Dex worker path.
- Root cause of #42645 and whether a newer app build fixes it.
- Whether #42644 reproduces on Windows/macOS/mobile/web.

## Dex optimization applied

Runtime PR #178 added the matching Windows executable-readiness and surface-continuity gates as documentation/tracking only.

- Runtime PR #178 branch head: `4ddeb6274e85a4782a9734bb754f406b5835f426`.
- Runtime validation `33824470417`: PASS on first attempt.
- Dependency install: PASS.
- Static checks, unit tests, and smoke test: PASS.
- Production dependency audit: PASS.
- Branch Vercel: PASS.
- Runtime PR #178 merged to `main`: `926a712360f80ad608437366dd2aea50f02565b4`.
- Runtime executable path/config/permissions/provider auth/model routing/billing changed: 0.
- Merge-SHA GitHub Actions and merge Vercel are verified separately in the final watch checkpoint; until recorded there, treat them as Not Checked in this evidence file.

Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/178
Runtime validation: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33824470417

## Safety and validation gate

- No automatic app/CLI upgrade or downgrade.
- No WindowsApps ACL/ownership mutation, binary extraction/copying or arbitrary `CODEX_CLI_PATH` override.
- No API key, paid fallback, extra usage, provider DB/cache repair, permission expansion, hosted write or #34 activation.
- Future Windows check must prove exact executable path, file existence, launch, official version identity and App Server handshake separately.
- Future #34 must prove persistence/surface capability explicitly and preserve canonical Task state outside any local-only provider conversation.

## Status

- `PASS`: official #42645 and #42644 issue evidence verified.
- `PASS`: current Runtime/Wiki heads and #28/#34 boundaries re-read before the change.
- `PASS`: Runtime PR #178 branch validation and branch Vercel.
- `PASS`: Runtime PR #178 merged after validation.
- `PASS`: documentation/tracking-only scope; no executable/config/permission/provider-auth behavior changed.
- `FAIL`: none remaining from this supplemental watch change.
- `Not Checked`: Runtime merge-SHA Actions/merge Vercel in this file, approved-host reproduction, maintainer-confirmed fixes, Wiki automated CI.
