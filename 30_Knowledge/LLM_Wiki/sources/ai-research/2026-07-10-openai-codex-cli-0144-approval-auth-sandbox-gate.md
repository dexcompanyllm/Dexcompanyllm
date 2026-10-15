---
type: llm-wiki-source
status: captured
title: "OpenAI Codex CLI 0.144.0 approval, auth, and sandbox gate"
sourceKind: official-release-notes
source:
  - "https://developers.openai.com/codex/changelog"
publisher: OpenAI
capturedAt: 2026-07-10T04:32:00+09:00
created: 2026-07-10
updated: 2026-07-10
dateCreated: 2026-07-10
dateModified: 2026-07-10
collectionPurpose: "Codex CLI 0.144.0의 app approval mode, MCP interactive auth, usage-limit credit visibility, Windows sandbox behavior changes를 Dex Company 승인/검증 체크리스트로 흡수한다."
confidence: medium
claimType: mixed
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-10
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - openai
  - cli
  - security
  - approval-gate
---

# OpenAI Codex CLI 0.144.0 approval, auth, and sandbox gate

## Source Snapshot

- Publisher: OpenAI
- Source: https://developers.openai.com/codex/changelog
- Release: Codex CLI `0.144.0`
- Release date shown by changelog: 2026-07-09
- Capture time: 2026-07-10 04:32 KST

## Key Points

- Codex CLI 0.144.0 adds a `writes` app-approval mode: declared read-only actions may run, while write actions still prompt.
- MCP tools can request authentication interactively without the earlier experimental opt-in.
- Usage-limit reset credits now expose more detail, including credit type and expiration, and allow selecting which credit to redeem.
- Windows sandbox sessions changed around writable-root deletion and managed primary runtime access.
- Device-code login guidance was improved to help users recognize and stop phishing attempts.

## Dex Company Use

This source is not approval to upgrade or install Codex. It changes the precheck for Codex CLI, MCP, plugin, automation, and Windows runtime work:

- record the actual Codex CLI version before relying on `writes` approval behavior;
- classify approval mode as `read-only`, `writes`, `full/write`, `bypass`, or `not checked` instead of assuming one generic approval policy;
- pause MCP work when interactive authentication appears, and record host, account, token/credential scope, and rollback before continuing;
- capture usage-limit reset credit type, expiration, and selected redemption only as local evidence, not from release notes alone;
- verify Windows sandbox writable roots and delete behavior with a disposable test path before trusting cleanup or mutation workflows;
- treat device-code login as phishing-sensitive and stop if the URL, account, or device-code prompt provenance is unclear.

## Evidence Quality

- source-backed: OpenAI official Codex changelog lists Codex CLI 0.144.0 and its approval, MCP authentication, usage-limit, Windows sandbox, and login-warning changes.
- Dex inference: Dex Company should convert these release notes into local runtime verification gates before changing Codex configuration, MCP tools, plugins, or automation behavior.
- not checked: Ethan's local Codex CLI version, current app approval mode availability, MCP auth prompts, usage-limit credit UI, Windows sandbox behavior on this machine, and device-code login flow.

## Risk Notes

- Excessive agency: `writes` approval mode may reduce friction for read-only actions, but write prompts still require local verification and clear user approval boundaries.
- Sensitive information disclosure: MCP interactive auth and device-code login flows can expose account or token context if provenance is unclear.
- Insecure plugin design: plugin/MCP tool surfaces must remain approval-gated until tool identity, auth scope, and rollback are known.
- Insecure output handling: Windows sandbox delete behavior should be verified on a disposable path before any cleanup automation relies on it.
- Overreliance: release notes do not prove Ethan's local CLI or desktop app has the feature.

## Original Content

This note preserves source metadata, short paraphrases, and Dex Company verification scope from the public OpenAI Codex changelog. It does not copy the full release text and does not claim local runtime availability.
