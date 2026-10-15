---
type: llm-wiki-source
status: captured
title: "OpenAI agent evals and evaluation best practices"
sourceKind: official-doc
sourceUrl: "https://developers.openai.com/api/docs/guides/agent-evals"
source:
  - "https://developers.openai.com/api/docs/guides/agent-evals"
  - "https://developers.openai.com/api/docs/guides/evaluation-best-practices"
publisher: OpenAI
capturedAt: 2026-07-03T16:37:55+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "growth scan report의 품질을 정성 감상이 아니라 반복 가능한 평가 기준과 evidence로 판단하기 위해 사용한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-doc
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - evals
  - agent-workflows
  - report-quality
---

# OpenAI agent evals and evaluation best practices

## Source Snapshot

- Agent workflow evals: https://developers.openai.com/api/docs/guides/agent-evals
- Evaluation best practices: https://developers.openai.com/api/docs/guides/evaluation-best-practices

## Key Notes

OpenAI 문서는 agent workflow를 traces, graders, datasets, eval runs로 평가하고 개선하는 접근을 설명한다. evaluation best practices는 AI 시스템의 비결정성을 다루기 위해 구조화된 테스트가 필요하다는 기준을 제공한다.

## Why It Matters

growth scan report는 "좋아 보인다"가 아니라 필수 섹션 충족, source-backed 비율, 미확인 항목 분리, lint 결과, 개선 반영 여부 같은 기준으로 평가되어야 한다.

## Dex Company Use Example

- 보고서마다 `Report QA Scorecard`를 둔다.
- 필수 항목: source-backed count, inbox-only count, duplicate count, blocked count, lint/status 결과, prompt/template change 여부.

## Verification

- source-backed: OpenAI official docs
- not checked: 실제 OpenAI Evals API 실행

## Original Content

원문 전체를 복사하지 않고, 공식 문서 URL과 growth scan report 평가 기준으로 쓸 핵심만 보존한다.

