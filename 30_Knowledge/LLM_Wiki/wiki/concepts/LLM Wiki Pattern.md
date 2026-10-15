---
type: llm-wiki-concept
status: active
aliases:
  - LLM Wiki
description: 'Reusable concept for source-backed AI-readable knowledge compilation'
author: Dex
created: 2026-07-02
updated: 2026-07-04
dateCreated: 2026-07-02
dateModified: 2026-07-04
confidence: medium
layer: concepts
related:
  - [[Dex Company LLM Wiki Operating Model]]
source:
  - [[2026-07-02-kist-llm-wiki-lecture]]
  - https://github.com/johnfkoo951/cmds-llm-wiki
  - https://llm-wiki.cmdspace.work/
explored: false
claimType: definition
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/concept
  - dex-company
---

# LLM Wiki Pattern

## 정의

LLM Wiki는 AI agent가 원본 자료를 따로 보존한 뒤, 그 자료에서 다시 쓸 수 있는 지식을 위키 형태로 정리하는 file-first knowledge-base 패턴입니다.

핵심은 “요약을 많이 쌓는 것”이 아니라, 나중에 AI가 다시 읽고 판단할 수 있도록 **출처, 목적, 불확실성, 재사용 지식**을 분리하는 것입니다.

## Core Layers

| Layer | 덱스 컴퍼니에서의 의미 |
|---|---|
| Raw Sources | source URL, metadata, 안전한 범위의 excerpt, screenshot, transcript reference, repo link |
| Wiki | source를 바탕으로 정리한 concepts, entities, guides, maps, reusable patterns |
| Schema | 운영 규칙, templates, `index.md`, `log.md`, lint checks, role routing |

## Core Operations

| Operation | 덱스 컴퍼니에서의 사용 |
|---|---|
| Inbox | 출처와 목적이 아직 약한 source candidate를 대기시킴 |
| Ingest | synthesis 전에 source-backed note를 먼저 만듦 |
| Query | graph 모양이 아니라 실제 source/wiki note를 읽고 답함 |
| Verify | 한 note의 claim/evidence metadata를 확인함 |
| Audit | drift, unexplored page, stale claim, disputed claim을 전체 점검함 |
| Lint | provenance, traceability, folder health, unsafe content risk를 확인함 |

## 왜 중요한가

프로젝트 노트는 덱스가 현재 작업을 이어가기 위한 기억입니다.
LLM Wiki는 프로젝트를 거듭할수록 덱스가 더 나은 판단을 하도록 돕는 장기 지식입니다.

차이는 다음과 같습니다.

- Project notes: “이 프로젝트에서 지금 무엇을 하고 있나요?”
- LLM Wiki: “다음 프로젝트에서도 다시 쓸 지식은 무엇인가요?”

## Source Notes

- [[2026-07-02-kist-llm-wiki-lecture]]
- https://github.com/johnfkoo951/cmds-llm-wiki
- https://llm-wiki.cmdspace.work/
- https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## Dex Rule

모든 노트를 LLM Wiki로 승격하지 않습니다. 출처가 있고, 한 프로젝트를 넘어 다시 쓸 수 있는 지식만 승격합니다.
