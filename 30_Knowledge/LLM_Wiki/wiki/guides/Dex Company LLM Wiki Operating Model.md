---
type: llm-wiki-guide
status: active
aliases:
  - Dex LLM Wiki model
description: 'Dex Company operating model for LLM Wiki inbox, ingest, query, verify, audit, and lint'
author: Dex
created: 2026-07-02
updated: 2026-07-04
dateCreated: 2026-07-02
dateModified: 2026-07-04
confidence: medium
layer: guides
related:
  - [[LLM Wiki Pattern]]
source:
  - [[2026-07-02-kist-llm-wiki-lecture]]
  - [[LLM Wiki Pattern]]
explored: false
claimType: prescriptive
evidenceScope: local-test
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/guide
  - dex-company
  - codex
  - obsidian
---

# Dex Company LLM Wiki Operating Model

## 목적

이 guide는 덱스가 덱스 컴퍼니 안에서 LLM Wiki 계층을 어떻게 써야 하는지 설명합니다.

## Operating Split

| Area | Folder | Rule |
|---|---|---|
| Active project state | `10_Projects/<ProjectName>/` | PRD, SPEC, CURRENT, QA, handoff, code link를 둠 |
| Pre-ingest queue | `00_Inbox/LLM_Wiki/` | provenance와 purpose가 아직 약한 source candidate를 둠 |
| Reusable knowledge | `30_Knowledge/LLM_Wiki/` | future project에 도움이 되는 source-backed knowledge만 승격 |
| Global operating rules | `20_Codex_Handoff/` | role routing, setup QA, prompt library, LLM Wiki guide를 둠 |
| External tool outputs | `70_Outputs/LLM_Wiki/` | Graphify/formatter/extraction output을 source/wiki/query 밖에 둠 |

## Workflow

1. 에던님이 source, lecture, repo, article, repeated project lesson을 제공합니다.
2. 덱스가 project-specific인지 reusable인지 판단합니다.
3. reusable이면 `sources/<kind>/` 아래 source note를 만듭니다.
4. source, purpose, confidence, not-checked items를 기록합니다.
5. source note가 생긴 뒤에만 wiki note를 만들거나 갱신합니다.
6. 새 wiki note는 `explored: false`로 시작하고 v5 verification fields를 기록합니다.
7. `index.md`와 `log.md`를 갱신합니다.
8. 위험도에 따라 `llm-wiki-verify.ps1`, `llm-wiki-audit.ps1`, `llm-wiki-lint.ps1`를 실행합니다.

## Role Command

추천 명령:

```text
/지식관리 이 자료를 LLM Wiki에 원본 보존, 위키 합성, 질의 가능 구조, lint 기준으로 흡수해주세요.
```

## 덱스가 하지 말아야 할 것

- 긴 저작권 transcript를 vault에 그대로 복사하지 않습니다.
- 자동 caption metadata를 verified lecture speech로 취급하지 않습니다.
- active project handoff와 reusable wiki note를 섞지 않습니다.
- credential이나 sensitive private material을 저장하지 않습니다.
- 에던님이 명시적으로 승인하지 않으면 upstream harness files를 bulk install하지 않습니다.

## Source Notes

- [[2026-07-02-kist-llm-wiki-lecture]]
- [[LLM Wiki Pattern]]
- `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md`
- `D:\Program Files\Codex\skills\llm-wiki\SKILL.md`

## Current Implementation Status

- LLM Wiki folders exist.
- `llm-wiki` local skill exists.
- `/지식관리` is registered in role routing.
- status, lint, verify, audit scripts exist.
- v5 verification schema is installed.
- Vault health check passes.
