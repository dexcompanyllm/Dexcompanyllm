---
type: llm-wiki-source
status: captured
title: "NN/g AI explainability for enterprise roles"
sourceKind: ux-research-article
sourceUrl: "https://www.nngroup.com/articles/crafting-ai-explanations/"
source:
  - "https://www.nngroup.com/articles/crafting-ai-explanations/"
  - "https://www.nngroup.com/articles/ai-explanations/"
  - "https://doi.org/10.48550/arXiv.1909.03012"
  - "https://www.w3.org/TR/WCAG22/"
publisher: "Nielsen Norman Group"
capturedAt: 2026-07-04T08:33:12+09:00
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
collectionPurpose: "Dex Company에서 AI agent, 자동화, LLM Wiki, 운영 대시보드를 설계할 때 한 가지 설명 방식으로 모든 사용자를 설득하지 않고, governance lead, builder, domain expert별로 다른 설명/감사/피드백 정보를 요구하는 QA 기준으로 쓰기 위해 보존한다."
confidence: medium
claimType: analytical
evidenceScope: expert-ux-source-with-research-cross-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ux-research
  - ai-explainability
  - ai-agents
  - enterprise-ai
  - dex-company
---

# NN/g AI Explainability For Enterprise Roles

## Source Snapshot

- URL: https://www.nngroup.com/articles/crafting-ai-explanations/
- Publisher: Nielsen Norman Group
- Authors: Katie Schmidt, Jessa Anderson, Hayley Mortin
- Published: 2026-07-03
- Captured: 2026-07-04 08:33 KST
- Cross-checks:
  - NN/g sidebar: https://www.nngroup.com/articles/ai-explanations/
  - AIX360 taxonomy paper: https://doi.org/10.48550/arXiv.1909.03012
  - WCAG 2.2 baseline: https://www.w3.org/TR/WCAG22/

## Key Notes

NN/g는 enterprise AI 설명 가능성을 한 가지 UI 문구나 일반적인 "투명성"으로 처리하면 부족하다고 설명한다. AI consultant/governance lead, builder, domain expert는 같은 AI 시스템을 보더라도 서로 다른 결정을 내려야 하므로 필요한 설명의 수준과 형태가 달라진다.

- governance lead: 전체 시스템 패턴, 실패 모드, 보안/거버넌스 상태, human oversight 필요 지점, audit-ready summary가 필요하다.
- builder: 특정 출력이 왜 나왔는지, prompt/data/integration/configuration 중 무엇이 영향을 줬는지, 평가 지표와 오류 상태를 어떻게 고칠지 이해해야 한다.
- domain expert: 기술 내부 구조보다 업무 규칙, 정책 근거, 유사 사례, 잘못된 사실/오래된 정책을 표시할 수 있는 간단한 피드백 장치가 필요하다.

## Dex Company Use Example

- Growth Scan 보고서의 `source-backed`, `Dex inference`, `not checked` 구분은 domain expert에게는 쉬운 정책/결정 근거로, builder에게는 재현 가능한 검증 로그로, governance 관점에는 반복 가능한 감사 항목으로 분리해서 써야 한다.
- AI agent나 MCP/connector 실사 보고서에는 `explanation.audience`, `trace.level`, `audit.summary`, `configuration.cause`, `domain_feedback.channel`, `human_review.required`를 추가하면 다음 실행자가 왜 승인/차단/보류했는지 더 빠르게 이해할 수 있다.
- LLM Wiki source note를 쓸 때 "이 자료가 좋다"로 끝내지 않고, 누가 어떤 결정을 내리는 데 쓰는 설명인지 명시하면 중복 저장과 과잉 신뢰를 줄일 수 있다.

## WCAG / Frontend QA Connection

이 자료 자체는 WCAG 문서가 아니라 enterprise AI 설명 설계에 관한 UX 자료다. 다만 Dex Company가 설명 가능성 UI, 감사 대시보드, 피드백 버튼, 상태 메시지를 구현할 때는 WCAG 2.2와 연결된다.

- explanation panel, feedback widget, audit status, confidence/status message는 보조기술 사용자가 이해할 수 있도록 name/role/value, status message, keyboard access, focus visible, error identification 기준을 확인해야 한다.
- domain expert용 "Wrong facts / Outdated policy / Unclear" 같은 피드백 버튼은 시각적 라벨만이 아니라 접근 가능한 이름과 상태를 가져야 한다.
- AI 설명이 이미지/차트/색상으로만 제공되면 governance lead나 domain expert가 같은 판단 근거를 얻지 못할 수 있으므로 텍스트 대체와 구조화된 요약이 필요하다.

## Evidence Quality

- quality: medium
- source-backed: 제목, 저자, 발행일, 역할별 설명 요구, 관련 sidebar와 AIX360 taxonomy는 공개 페이지에서 확인했다.
- cross-check: NN/g sidebar는 local/global, static/interactive, model/data-based explanation taxonomy를 별도로 설명하고, arXiv/AIX360 paper는 이해관계자별 설명 요구와 taxonomy 필요성을 연구 근거로 제시한다.
- Dex inference: `explanation.audience`와 Dex Company 감사 필드를 운영 템플릿에 추가하는 것은 원문 그대로가 아니라 Dex Company workflow에 맞춘 적용이다.
- not checked: NN/g의 유료 강의 자료, ServiceNow 내부 사례, 에던님의 실제 enterprise AI 배포 환경, 실제 사용자 연구 데이터는 확인하지 않았다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- 라이선스/저작권: 원문 전체를 복사하지 않고 공개 URL, 메타데이터, 요약, 확인 범위만 보존한다.
- OWASP LLM risk: overreliance, sensitive information disclosure, excessive agency, insecure output handling.
- 운영 제한: 설명 가능성은 신뢰 보조 장치이지 실행 승인 자체가 아니다. 실제 agent/connector/tool adoption에는 별도의 권한, 데이터, 비용, human review, rollback 검증이 필요하다.

## Claim Split

- source-backed: 역할별로 필요한 AI 설명 유형이 다르며, governance lead/builders/domain experts는 서로 다른 설명 근거와 수준을 필요로 한다.
- Dex inference: Dex Company 보고서와 실사 템플릿에 `explanation.audience`, `trace.level`, `domain_feedback.channel` 같은 필드를 추가하면 다음 실행 품질이 좋아진다.
- not checked: 실제 에던님 조직의 사용자군, 배포 시스템, 감사 요구사항, 법무/보안 정책은 확인하지 않았다.

## Original Content

원문 전체를 복사하지 않았다. 공개 URL, 출처 메타데이터, 핵심 요약, Dex Company 적용 기준, 교차 검증 근거, 확인하지 못한 범위만 보존한다.
