---
type: llm-wiki-source
status: active
title: "OpenAI API GPT-5.5 Prompt Guidance"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: source-backed
evidenceScope: official-doc
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-documentation
source: "https://developers.openai.com/api/docs/guides/prompt-guidance"
collectionPurpose: "덱스 컴퍼니 자동화/역할 프롬프트를 최신 OpenAI API 프롬프트 가이드에 맞춰 점검하기 위한 기준"
tags:
  - llm-wiki/source
  - openai
  - prompt-engineering
  - automation
---

# OpenAI API GPT-5.5 Prompt Guidance

## Original Content

- Source title: Prompt guidance | OpenAI API
- URL: https://developers.openai.com/api/docs/guides/prompt-guidance
- Publisher: OpenAI Developers
- Collected at: 2026-07-04 KST
- Preserved excerpt: "GPT-5.5 is strongest when the prompt defines the target outcome, success criteria, constraints, and available context"
- Confirmation scope: Checked the official OpenAI prompt guidance page for GPT-5.5 behavior, outcome-first prompts, stopping conditions, verbosity controls, grounding, tool-use safety, and migration notes.

## Easy Summary

OpenAI의 최신 프롬프트 가이드는 긴 절차 나열보다 목표, 성공 기준, 제약, 멈춤 조건을 분명히 쓰는 쪽을 권장한다. 덱스 컴퍼니에는 "단계가 많을수록 좋은 프롬프트"가 아니라 "검증 가능한 완료 기준이 있는 짧은 프롬프트"가 더 적합하다는 신호다.

## Dex Company Use

- 자동화 프롬프트가 너무 길어질 때는 운영 불변 규칙과 실행 체크리스트를 분리한다.
- Growth Scan 보고서에는 `success.criteria`, `stop.condition`, `retrieval.budget`, `not.checked.behavior`를 남긴다.
- 역할 라우팅 문서는 절차를 과도하게 고정하지 말고, 안전/비밀/삭제/외부 실행 같은 진짜 불변 규칙만 `must`로 둔다.

## Evidence Quality

- High: OpenAI 공식 개발자 문서다.
- Cross-check: 기존 LLM Wiki의 Codex prompting, Codex goals, agent improvement loop, Growth Scan improvement model과 같은 방향이다.
- Not checked: 실제 GPT-5.5 API 호출, 비용, 에던님 계정의 모델 접근 가능 여부, 프롬프트 A/B eval은 실행하지 않았다.

## Risk / Security

- 이 자료 자체는 문서라 설치 리스크는 없다.
- Dex inference: "긴 자동화 프롬프트 축소"는 공식 문서의 일반 가이드를 덱스 컴퍼니에 적용한 판단이다.
- OpenAI Docs Skill 자동 migration 명령은 문서에 언급되지만, 이번 실행에서는 다운로드/설치/실행하지 않았다.

## Source Classification

- source-backed: GPT-5.5 prompt guidance, outcome-first prompt, stopping condition, tool-use and grounding guidance.
- Dex inference: 덱스 컴퍼니 자동화 템플릿에 적용할 필드 후보.
- not checked: live model behavior, local Codex/OpenAI account availability, actual prompt migration result.
