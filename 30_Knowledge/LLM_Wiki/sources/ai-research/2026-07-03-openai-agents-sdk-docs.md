---
type: llm-wiki-source
status: captured
title: "OpenAI Agents SDK official documentation"
sourceKind: official-doc
sourceUrl: "https://developers.openai.com/api/docs/guides/agents"
source:
  - "https://developers.openai.com/api/docs/guides/agents"
publisher: OpenAI
capturedAt: 2026-07-03T15:52:53+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "덱스 컴퍼니에서 에이전트 오케스트레이션, tool approval, state, handoff 설계를 판단할 때 공식 기준으로 사용한다."
confidence: medium
claimType: descriptive
evidenceScope: official-doc
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ai-agents
  - openai
  - automation
---

# OpenAI Agents SDK official documentation

## Source Snapshot

- URL: https://developers.openai.com/api/docs/guides/agents
- 검색/확인 경로: OpenAI 공식 문서 + OpenAI Agents SDK GitHub 저장소와 교차 확인
- 핵심 내용: OpenAI는 단일 모델 호출과 앱 소유 로직이면 Responses API를, 오케스트레이션/도구 실행/승인/상태를 앱이 소유해야 하면 Agents SDK를 쓰는 기준으로 설명한다.

## Why It Matters

덱스 컴퍼니 자동화가 점점 복잡해질수록 "그냥 Responses API로 충분한가, 아니면 Agents SDK형 런타임이 필요한가"를 구분해야 한다. 이 문서는 에이전트 설계 판단의 공식 기준점이다.

## Dex Company Use Example

- 단발성 문서 요약이나 LLM Wiki query: Responses API형 단순 루프
- 매일 성장 스캔처럼 검색, 후보 평가, 저장, 검증, 보고가 이어지는 작업: Agents SDK형 오케스트레이션 후보
- 스킬 설치처럼 승인 게이트가 필요한 작업: tool approval과 state를 명시해야 함

## Verification

- source-backed: OpenAI 공식 문서에서 확인
- cross-check: https://github.com/openai/openai-agents-python
- not checked: 실제 SDK 샘플 실행

## Original Content

원문 전체를 복사하지 않고, 공개 문서에서 확인한 핵심 메타데이터와 요지를 보존한다. 공식 문서는 Agents SDK를 multi-step agent orchestration, tool execution, approval, state가 필요한 경우의 고수준 런타임으로 설명한다.
