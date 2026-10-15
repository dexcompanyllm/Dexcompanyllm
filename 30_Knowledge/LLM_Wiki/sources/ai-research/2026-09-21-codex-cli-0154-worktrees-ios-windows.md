---
title: Codex CLI 0.154.0 worktrees and cross-device workflow updates
claimType: CAPABILITY
evidenceScope: provider-specific
verificationStatus: source-backed
verifiedAt: 2026-09-21
verifiedBy: ChatGPT automation run 11
explored: false
disputed: false
---

# Codex CLI 0.154.0 worktrees and cross-device workflow updates

## Confirmed

- ChatGPT Business release notes dated 2026-09-09 state that Codex CLI 0.154.0 adds **experimental** support for starting or forking tasks in separate Git worktrees, browsing/resuming those worktrees, and answering questions inline while Codex continues working.
- The same release note states that the update preserves formatting when copying responses and refreshes plugin tools in existing sessions.
- ChatGPT Business release notes dated 2026-09-08 state that ChatGPT for iOS 1.2026.244 can reference another task with `@`, answer Codex questions while work continues, preserve file-browsing position, and choose a branch or include current local changes when starting a remote worktree.
- The same iOS note states that remote work requires a connected computer and follows workspace settings; background setup via Live Activity is limited to iOS 26.
- ChatGPT Business release notes dated 2026-09-11 state that Windows Appshots are available and Quick Chats are available in the desktop app. Appshots share the frontmost app window with ChatGPT and include screenshot plus app-provided text; workspace Appshots settings still apply.

## Dex interpretation

- `confirmed`: These are provider capability updates, not evidence that Dex may enable experimental worktrees, remote execution, Appshots, or background control automatically.
- `inference`: Separate Git worktrees may reduce branch collision risk for parallel Codex tasks, but only after Dex validates Task ownership, repository realpath, lease/counter/result binding, cleanup boundaries, and the existing one-writer rule.
- `proposal`: Track Codex CLI 0.154.0 as a compatibility candidate. Do not auto-install, auto-promote, or activate experimental worktrees in Dex.
- `proposal`: Track iOS remote-worktree and Windows Appshots as optional surface-specific capabilities. Keep actual host verification and permission checks separate from mobile access or desktop UI availability.

## Not checked

- Actual Codex CLI version installed on any approved Dex worker or user device.
- Approved-host E2E for worktree creation, resume, cleanup, stale-result rejection, and sibling-sentinel preservation.
- Actual availability for Ethan's ChatGPT Pro account, Galaxy/Android, iPhone/iOS, Windows, or macOS surfaces.
- Any Runtime code change or production deployment.

## Sources

- https://help.openai.com/en/articles/11391654-chatgpt-business-julkaisutiedot
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan(.pdf)
