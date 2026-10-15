---
type: llm-wiki-source
status: active
title: "OpenAI Codex Prompting"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: source-backed
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://developers.openai.com/codex/prompting"
collectionPurpose: "덱스 컴퍼니 자동화와 역할 작업 프롬프트가 검증 가능한 완료 기준, 작은 작업 단위, 컨텍스트 제공 원칙을 따르도록 공식 Codex prompting 기준을 보존한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - prompting
  - automation
---

# OpenAI Codex Prompting

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 OpenAI Developers의 Codex Prompting 문서를 확인했고, 이 note는 URL, 수집 목적, 핵심 요약, 검증 범위만 보존한다.

## Easy Explanation

Codex는 사용자의 요청을 바탕으로 파일 읽기, 파일 수정, 도구 호출을 반복하며 작업을 끝낸다. 문서는 재현 단계, 검증 방법, lint나 pre-commit 같은 확인 절차를 프롬프트에 넣으면 결과 품질이 좋아진다고 설명한다. 복잡한 일은 작게 나누는 편이 테스트와 리뷰에 유리하다는 점도 강조한다.

## Dex Company Use

- 자동화 프롬프트에는 완료 기준, 검증 명령, 미확인 항목 보고 규칙을 반드시 넣는다.
- 장기 작업은 한 번에 모든 것을 요구하지 말고 후보 수집, 승격, 중복 제거, 검증으로 나눈다.
- Growth Scan 보고서는 "무엇을 찾았는지"보다 "어떻게 검증했는지"를 먼저 남긴다.

## Evidence Quality

- high: OpenAI 공식 Codex 문서다.
- cross-check: 기존 source note인 Codex best practices, Codex Goals, Codex automations와 같은 방향의 운영 원칙이다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex는 프롬프트에 따라 작업 루프를 수행하며, 재현/검증/작업 분할 정보가 품질에 영향을 준다.
- Dex inference: 덱스 컴퍼니의 자동화 보고 템플릿에 "검증 가능한 완료 기준"을 더 강하게 넣어야 한다.
- not checked: 이 문서를 바탕으로 자동화 prompt를 이번 실행에서 직접 수정하지는 않았다.

