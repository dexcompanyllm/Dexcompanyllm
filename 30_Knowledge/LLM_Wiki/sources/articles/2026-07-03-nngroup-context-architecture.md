---
type: llm-wiki-source
status: captured
title: "NN/g - Context Architecture"
sourceKind: article
sourceUrl: "https://www.nngroup.com/articles/context-architecture/"
source:
  - "https://www.nngroup.com/articles/context-architecture/"
  - "https://www.nngroup.com/topic/ai/"
publisher: Nielsen Norman Group
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company context packet, LLM Wiki retrieval, AGENTS.md, project handoff 구조를 정보 구조 설계 관점에서 개선하기 위해 보존한다."
confidence: medium
claimType: interpretive
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ux-research
  - context-engineering
  - ai-agents
---

# NN/g - Context Architecture

## Source Snapshot

- URL: https://www.nngroup.com/articles/context-architecture/
- Cross-check: https://www.nngroup.com/topic/ai/
- Publisher: Nielsen Norman Group
- Captured for: Dex Company context structure and AI UX quality

## Key Notes

NN/g는 context architecture를 AI 시스템이 정보를 해석하고 사용자 의도에 맞는 결과를 만들도록 돕는 정보 구조 관점으로 설명한다.

## Why It Matters

Dex Company에서 덱스가 좋은 결과를 내려면 "파일이 많다"보다 "어떤 순서로 어떤 맥락을 읽어야 하는가"가 더 중요하다. Context architecture는 Vault index, project CONTEXT_MAP, LLM Wiki index, automation memory를 설계 대상으로 보게 만든다.

## Dex Company Use Example

- 프로젝트 시작 시 `CONTEXT_MAP.md`를 단순 링크 목록이 아니라 읽기 순서와 판단 기준으로 만든다.
- Growth Scan 보고서는 next run context를 자동화 메모리에 압축해 다음 실행이 다시 길을 잃지 않게 한다.
- LLM Wiki index는 중요한 note를 분야별이 아니라 "다음 판단에 쓰이는 경로"로 묶을 수 있다.

## Verification

- source-backed: NN/g article과 AI topic index의 존재와 summary를 확인했다.
- Dex inference: Dex Company context packet 설계로 바꾸는 부분은 UX research 개념을 운영 구조에 적용한 것이다.
- not checked: NN/g article 전문의 모든 세부 사례는 이번 실행에서 완전 분석하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, 핵심 요지, Dex Company 적용 포인트만 보존한다.
