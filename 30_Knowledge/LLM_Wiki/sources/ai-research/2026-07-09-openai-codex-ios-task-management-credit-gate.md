---
type: source-note
status: active
aliases:
  - Codex iOS task management and credit gate
description: "OpenAI Codex iOS task controls, mobile connection, usage-limit, and credit visibility guardrails for Dex Company."
author: Dex
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: official-changelog-and-docs
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://openai.com/index/work-with-codex-from-anywhere/"
  - "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan"
  - "https://developers.openai.com/codex/pricing"
collectionPurpose: "Codex 모바일에서 작업 생성/관리, SSH host 연결, 사용량/크레딧 표시가 강화되면서 Dex Company 모바일 원격 작업 승인과 비용 확인 체크리스트에 필요한 필드를 보존한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - mobile
  - automation
  - cost-governance
---

# OpenAI Codex iOS Task Management and Credit Gate

## Original Content

- Source 1: https://developers.openai.com/codex/changelog
- Source 2: https://openai.com/index/work-with-codex-from-anywhere/
- Source 3: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Source 4: https://developers.openai.com/codex/pricing
- Publisher: OpenAI
- Collected: 2026-07-09 09:03 KST
- Preserved scope: URL, release/date metadata, short summary, Dex Company operating fit, and verification limits. Full source text was not copied.

## Summary

OpenAI Codex changelog lists a 2026-07-06 ChatGPT for iOS 1.2026.181 update that adds Codex task creation/search/open/fork/manage from a conversation, staged/unstaged/branch/last-turn filters, transcript-to-composer transfer, attachment previews, SSH host connection support, usage limits and credit details in the task menu, and clearer `Needs input` task state.

OpenAI's Codex mobile article frames the mobile app as a way to monitor, steer, approve, and continue Codex work while files, credentials, permissions, and local setup stay on the machine where Codex is operating. OpenAI help/pricing pages state that Codex limits and credits vary by plan and that credits can extend usage after included limits are reached.

## Dex Company Use

Dex Company should treat Codex mobile as a remote work-control surface, not as proof that a task is safe or cheap to continue. Before mobile steering or approval, record:

- mobile app/version and account/workspace match
- host machine online/awake state and connection path
- task source, branch, staged/unstaged/last-turn diff filter used
- whether the task is `Needs input`
- approval scope and command/file/network risk
- SSH host credential type, without storing private keys
- visible usage-limit/credit state before starting or continuing long work
- final desktop-side verification before declaring completion

## Evidence Quality

- source-backed: OpenAI Codex changelog, OpenAI Codex mobile article, OpenAI Help Center Codex plan guidance, and OpenAI Codex pricing page.
- Dex inference: Dex Company converts mobile task controls into approval, cost, diff-review, and desktop verification checklist fields.
- not checked: Ethan's ChatGPT iOS version, Android parity for this exact release, current account plan, credit balance, host connection state, local Codex app version, SSH host setup, and actual task menu behavior.

## Risk / QA

- No mobile setting, SSH host, account connection, credit purchase, plugin, connector, MCP server, package, or Codex update was changed.
- Security risk: mobile approval can hide command/file/network blast radius if the desktop diff and task state are not reviewed.
- Cost risk: long Codex runs can consume plan limits or credits; task-level visible cost state must be checked before continuing.
- Secret risk: SSH private keys or credentials must not be copied into notes, prompts, reports, or LLM Wiki.

## WCAG / UX Link

This is not primarily a UI accessibility source. For mobile task-management UI or frontend output reviewed from mobile, Dex Company should still verify readable task status, clear confirmation controls, focus/target behavior, and final artifact accessibility using the existing PPT/frontend checklist and WCAG 2.2 anchors.
