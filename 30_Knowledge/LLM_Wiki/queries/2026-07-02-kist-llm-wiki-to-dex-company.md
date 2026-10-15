---
type: llm-wiki-query
status: answered
aliases:
  - KIST LLM Wiki to Dex Company
description: 'Reusable answer for how KIST and public LLM Wiki material changes Dex Company'
author: Dex
created: 2026-07-02
updated: 2026-07-02
dateCreated: 2026-07-02
dateModified: 2026-07-02
confidence: mixed
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-02
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/query
  - dex-company
---

# How should the KIST LLM Wiki material change Dex Company?

## Short Answer

Dex Company should not copy the upstream LLM Wiki vault wholesale. It should absorb the operating pattern as a Codex-native knowledge layer:

- source note first
- wiki synthesis second
- query reuse third
- verify/audit/lint after meaningful changes

## Source-Backed Findings

- The public LLM Wiki template is organized around Raw Sources, Wiki, and Schema.
- The public LLM Wiki template names Ingest, Query, and Lint as core operations.
- The public LLM Wiki template uses `index.md` and `log.md` as central coordination files.
- The KIST video page and sample frames confirm the lecture topic and speaker context, but full lecture speech was not verified.

## Dex Inference

Dex Company should treat LLM Wiki as the long-term reusable knowledge layer, not as the active project folder.

This gives a clean split:

- `10_Projects/`: execution state
- `20_Codex_Handoff/`: operating rules
- `30_Knowledge/LLM_Wiki/`: reusable source-backed knowledge

## Not Checked

- Full lecture transcript
- Exact spoken claims from the lecturer
- Complete slide order

## Resulting Local Changes

- Added local Codex skill: `llm-wiki`
- Added role command: `/지식관리`
- Added guide: `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md`
- Added helper scripts: `new-llm-wiki-source.ps1`, `llm-wiki-status.ps1`, `llm-wiki-lint.ps1`
- Added reinforced scripts: `new-llm-wiki-inbox.ps1`, `llm-wiki-verify.ps1`, `llm-wiki-audit.ps1`
- Added this query note and related wiki pages

## Source Notes

- [[2026-07-02-kist-llm-wiki-lecture]]
- [[LLM Wiki Pattern]]
- [[Dex Company LLM Wiki Operating Model]]

