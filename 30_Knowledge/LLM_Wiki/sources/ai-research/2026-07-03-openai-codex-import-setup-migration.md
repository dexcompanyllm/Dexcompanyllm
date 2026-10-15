---
type: source-note
status: active
confidence: medium
claimType: prescriptive
evidenceScope: single-source-primary
verificationStatus: partial
disputed: false
sourceKind: official-docs
source: "https://developers.openai.com/codex/import"
collectionPurpose: "다른 agent 설정을 Codex로 가져올 때 감사/승인 경계를 분리하기 위한 공식 근거로 보존한다."
dateCreated: 2026-07-03
dateModified: 2026-07-03
created: 2026-07-03
updated: 2026-07-03
verifiedAt: 2026-07-03
verifiedBy: Dex
tags: [llm-wiki/source, codex, import, setup, migration]
---

# OpenAI Codex import setup migration

## Original Content

- Source: https://developers.openai.com/codex/import
- Publisher: OpenAI
- Collected: 2026-07-03 23:35 KST
- Preserved scope: URL, metadata, short summary, operational fit, and verification limits. Full source text was not copied.

## Summary

Codex import can bring over instruction files, settings, skills, plugins, projects, recent chats, MCP configuration, hooks, slash commands, and subagents. The official doc says import leaves existing setup unchanged and may require manual follow-up for plugins or connections.

## Dex Company Use

Use import as a migration aid, not trust approval. Imported hooks, MCP, plugins, skills, and settings should be listed as candidates and audited before activation.

## Evidence Quality

- source-backed: OpenAI official docs list importable item types and follow-up behavior.
- Dex inference: Dex Company should create an import audit report before enabling imported resources.
- not checked: live desktop import UI, supported source agents, and Ethan's setup.

## Risk / QA

No import was run. OWASP LLM risks include supply chain, insecure plugin design, prompt injection, excessive agency, and sensitive information disclosure.

## WCAG Link

Not a UI accessibility source. If imported workflows create UI, WCAG 2.2 checks apply to the produced UI, not to the import process.
