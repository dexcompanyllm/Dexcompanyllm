---
title: Codex CLI 0.154.0 worktrees and workflow improvements
claimType: CAPABILITY
evidenceScope: Codex CLI
verificationStatus: source-backed
verifiedAt: 2026-09-23T20:14:01+09:00
verifiedBy: ChatGPT web + GitHub source review
explored: false
disputed: false
---

# Codex CLI 0.154.0 worktrees and workflow improvements

## Confirmed

- OpenAI release notes record experimental support in Codex CLI 0.154.0 for starting or forking tasks in separate Git worktrees.
- Users can browse and resume those worktrees while Codex continues working, and answer questions inline during the task.
- The same release note says response-copy formatting is preserved and plugin tools can be refreshed in existing sessions.

## Operational interpretation

- This is a capability update, not permission to enable experimental worktree behavior automatically.
- Separate worktrees can reduce branch collision risk for parallel Dex tasks, but actual safety still depends on the selected host, repository state, and existing one-writer rules.
- Do not treat availability in the ChatGPT release note as proof that the feature is enabled for Ethan's account, device, workspace, or runtime.

## Device and execution boundary

- Surface: Codex CLI; exact OS/device availability is not checked here.
- ChatGPT Web, Work, Android, iOS, Windows, macOS, and Dex Runtime rollout: Not Checked.
- No permissions, provider routing, paid usage, automatic fallback, reset, or credit settings were changed.

## Source

- OpenAI Business release notes, September 9, 2026: Codex CLI 0.154.0 worktrees and workflow improvements.

## Follow-up

- Verify installed Codex CLI version and test only in an isolated, non-production repository before adopting.
- Keep the existing branch -> verify -> PR -> merge flow and one-active-writer rule.
