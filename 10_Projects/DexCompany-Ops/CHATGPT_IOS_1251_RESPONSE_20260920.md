# ChatGPT for iOS 1.2026.251 response — 2026-09-20

## Result

- Classification: Confirmed stable iOS app update; access-surface optimization only.
- Official changelog: https://learn.chatgpt.com/docs/changelog
- Release date: 2026-09-18; exact publication and rollout time unpublished.
- Discovery: 2026-09-20 06:08 KST.
- Affected surface: ChatGPT for iOS/iPadOS.
- Unaffected by this evidence: ChatGPT Web, Android, Windows, macOS, Work, Codex CLI/IDE, and the execution host.

OpenAI added folder creation from the iOS file picker, writing blocks, per-project memory for worktree mode and setup environment, more reliable queued prompts and task reopening, and voice-call resilience during temporary connection interruptions.

## Dex decision boundary

This update improves the iPhone/iPad access surface but does not prove that a Dex execution worker, plugin write path, or physical device is ready.

- Use iOS for task intake, queued follow-up prompts, folder/file organization, result review, and approvals when the feature is present.
- Preserve the same Task ID and canonical GitHub state; remembered worktree mode or setup environment is client convenience, not task authority.
- Keep execution-host, account, permission, sandbox, and provider checks independent from the access device.
- Do not extend this release to Android, Windows, macOS, ChatGPT Web, Work, or Codex CLI/IDE.
- Do not automatically install or update the app, enable plugins, widen permissions, or change paid usage.
- If queued prompts or reopened tasks appear stale, confirm the canonical Task/Result state before retrying to avoid duplicate execution.

## Applied optimization

Dex now records the iOS app as a more capable access surface while retaining GitHub main and Task/Result packets as the source of truth. The practical routing is:

1. iPhone/iPad may capture and queue work with less repeated setup.
2. The Orchestrator still selects a verified execution environment separately.
3. Reopened mobile tasks reconcile against canonical state before any mutation.
4. Android and desktop paths retain their own support and verification status.

No Runtime change is required because the update does not alter the Codex App Server, authentication, model routing, execution protocol, or permission contract.

## Verification

- Official source and dated feature list: PASS.
- Surface separation against `AI_CONTRACT.md` and `DEVICE_INDEPENDENT_EXECUTION.md`: PASS.
- Canonical GitHub authority, subscription-first cost rules, and existing #28/#34/#35 gates preserved: PASS.
- Automatic installation, account connection, permission expansion, paid fallback, credit/reset use, and Runtime mutation: Not Performed.
- Actual iPhone/iPad app version, account rollout, plugin behavior, queued-prompt recovery, voice reconnection, and physical-device E2E: Not Checked.
- Android, Windows, macOS, Web, Work, and Codex execution behavior: Not Changed by this source.
