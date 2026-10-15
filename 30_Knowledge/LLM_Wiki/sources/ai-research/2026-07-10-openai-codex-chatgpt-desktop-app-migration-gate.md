---
type: llm-wiki-source
status: captured
title: "OpenAI Codex ChatGPT Desktop App Migration Gate"
aliases:
  - Codex joins the ChatGPT desktop app
description: "OpenAI Codex changelog item captured as a Dex Company desktop-app update and migration verification gate."
author: Dex
created: 2026-07-10
updated: 2026-07-10
dateCreated: 2026-07-10
dateModified: 2026-07-10
confidence: medium
claimType: mixed
evidenceScope: single-source-primary
verificationStatus: partial
verifiedAt: 2026-07-10
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source:
  - "https://developers.openai.com/codex/changelog"
collectionPurpose: "OpenAI's July 9, 2026 Codex changelog changes the desktop app surface by putting Codex inside the ChatGPT desktop app. Dex Company should absorb this as a local migration/update verification gate, not as proof that Ethan's installed app has already updated."
tags:
  - llm-wiki/source
  - dex-company
  - openai
  - codex
  - desktop-app
  - migration
  - governance
---

# OpenAI Codex ChatGPT Desktop App Migration Gate

## Source Metadata

- Publisher: OpenAI
- Captured at: 2026-07-10 02:04 KST
- Source published: 2026-07-09
- Type: official changelog
- Keywords: Codex, ChatGPT desktop app, Windows, macOS, app update, default view, projects, settings, workflows, plugins
- Actual install/connect: No. No app update, app install, account connection, plugin change, MCP/server change, API call, token use, billing action, automation rewrite, or auth-file change was performed.

## Short Explanation

OpenAI announced that Codex is now part of the ChatGPT desktop app on macOS and Windows. The changelog says existing Codex app users can update normally and keep projects, settings, and workflows. It also says users can make Codex the default view, and that plugin management has moved into Settings.

For Dex Company this is useful as a desktop-runtime verification gate. When Ethan asks whether Codex is current, whether the app path changed, or why plugin settings moved, Dex should verify the local app version, launch path, default view, project/settings/workflow persistence, and plugin-management location before making availability or migration claims.

## Source-Backed Findings

- OpenAI presents Codex as part of the ChatGPT desktop app on macOS and Windows.
- The changelog says existing Codex app users can update as usual and keep projects, settings, and workflows.
- The changelog says Codex can be made the default view.
- The changelog says plugin management was simplified by moving it into Settings.
- The changelog also lists PR review in the sidebar, multi-repository projects, Computer Use performance, task activity/progress improvements, and mobile connection reliability improvements.

## Dex Company Use

When checking Codex Desktop after this update, verify:

- installed app identity: ChatGPT desktop app vs standalone Codex app, Windows package name, executable path, shortcut target, and version
- migration state: projects, settings, workflows, local environments, and recent threads are still visible after update
- default view: whether Codex is the default view or only reachable inside ChatGPT desktop navigation
- plugin settings: plugin list, install source, enabled state, sharing/admin policy, and any moved Settings location
- repository scope: multi-repository project boundaries, local folder scope, unrelated diff risk, and rollback path
- runtime evidence: local app screen, command output, logs, or screenshots before reporting the update as active on Ethan's machine

## Cross-Verification

- Local duplicate search across `30_Knowledge/LLM_Wiki`, `00_Inbox/LLM_Wiki`, and recent Growth Scan reports found no existing note for `Codex joins the ChatGPT desktop app`, `ChatGPT desktop app`, or moved Codex plugin management.
- The item was checked against the OpenAI Codex changelog page.
- Related prior Dex Company memory covers Codex launch-path and shortcut diagnosis, but not this July 9, 2026 app-surface change.

## Codex Portability

- Portability: high as a local update verification checklist.
- Install required to learn: no.
- Codex adaptation: use local file/process/app evidence plus Obsidian reporting before claiming that Ethan's current Codex runtime has migrated.
- Non-portable part: OpenAI's specific desktop UI and account/app rollout behavior can only be confirmed live on Ethan's machine.

## Risk And Approval Notes

- Approval decision: knowledge-only.
- No install or app update was performed.
- Security/ops risk: confusing the public changelog with local availability could cause wrong launch-path repair, wrong shortcut assumptions, plugin-setting confusion, or mistaken claims that projects/settings/workflows migrated.
- OWASP LLM risk mapping: overreliance on public release notes, excessive agency if an app update is triggered without approval, sensitive information disclosure if app/account state is copied into notes, and insecure plugin/tool design if plugin settings are assumed safe.
- Not checked: Ethan's installed app version, actual ChatGPT desktop UI, Windows package identity, local shortcut target, plugin settings, account/workspace rollout, project persistence, PR sidebar behavior, multi-repository project behavior, or mobile connection behavior.

## Bias Check

- Counter-argument: OpenAI's changelog is authoritative for the public feature announcement, but it is not proof that the feature is already present in Ethan's local Windows app.
- Data gap: Dex did not open the local desktop app, inspect the Windows package, compare pre/post-update settings, or test project/workflow persistence in this run.

## Original Content

This note preserves the official source URL, capture purpose, source-backed findings, Dex inference, and not-checked limits from OpenAI's Codex changelog. It does not copy the full source text.
