---
type: llm-wiki-source
status: captured
title: "Figma ISO 42001 AI governance certification"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-blog-and-standard
source:
  - "https://www.figma.com/blog/figma-is-now-iso-42001-certified/"
  - "https://www.iso.org/standard/42001"
  - "https://www.iso.org/home/insights-news/resources/iso-42001-explained-what-it-is.html"
publisher: "Figma, ISO"
collectionPurpose: "Figma 같은 AI 디자인 도구를 Dex Company에서 검토할 때 vendor trust claim을 홍보 문구가 아니라 AI governance audit evidence로 분리해 판단하기 위한 기준으로 저장한다."
tags:
  - llm-wiki/source
  - figma
  - ai-governance
  - iso-42001
  - vendor-risk
---

# Figma ISO 42001 AI Governance Certification

## Original Content

- 수집 시각: 2026-07-04 05:04 KST
- 자료 유형: Figma 공식 블로그 + ISO 공식 표준 설명
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단, 미확인 범위만 보존한다.
- 확인 범위: Figma의 ISO 42001 인증 발표, ISO/IEC 42001의 AI management system 목적, vendor risk assessment에서 인증을 evidence로 다루는 방법.

## Source-Backed Notes

- Figma는 2026-07-01에 자사 AI 거버넌스가 ISO 42001 인증을 받았다고 발표했다.
- Figma는 이 인증을 vendor risk assessment, board reporting, regulatory submission에서 참조 가능한 독립 evidence로 설명한다.
- ISO는 ISO/IEC 42001을 AI management system 표준으로 설명하며, AI 시스템의 risk, transparency, governance, continual improvement를 구조적으로 관리하는 데 쓰인다고 밝힌다.
- ISO 42001 인증은 Figma Agent, Figma Make, Figma MCP 같은 기능의 실제 로컬 사용 가능성이나 보안 안전성을 자동 보장하지 않는다.

## Dex Company Use Example

- Figma 또는 다른 AI 디자인 도구를 도입 검토할 때 `vendor.ai_governance_evidence=ISO 42001`, `certificate.scope`, `auditor.accredited`, `feature.scope`, `data_retention.checked`, `workspace.permission`, `human_review.required`를 분리해 기록한다.
- 디자인 시스템/AI 도구 실사에서 "AI를 책임 있게 쓴다"는 마케팅 주장보다 제3자 인증, 인증 범위, 실제 기능별 데이터 처리 범위를 먼저 확인한다.
- Dex Company의 Figma 관련 note와 연결할 때는 기능 도입 승인으로 쓰지 말고 vendor governance evidence로만 사용한다.

## Evidence Quality

- quality: medium
- 이유: Figma와 ISO 공식 출처로 교차 검증했다. 다만 Figma의 실제 인증서 범위, 심사기관 세부 정보, Ethan 계정/워크스페이스 적용 여부는 확인하지 않았다.
- 교차 검증: Figma 공식 발표와 ISO 공식 ISO/IEC 42001 설명이 같은 AI management system framing을 공유한다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, sensitive information disclosure, insecure plugin design, supply chain risk.
- 운영 제한: 인증은 vendor-level governance evidence다. MCP, plugin, connector, AI feature, workspace data access, billing, model provider, export path는 프로젝트별로 별도 검토해야 한다.

## Accessibility / WCAG Link

- 이 자료는 인증/거버넌스 자료라 WCAG 2.2의 특정 success criterion에 직접 대응하지 않는다.
- Dex Company 적용 시 AI 디자인 도구가 만든 산출물은 별도로 WCAG 2.2 기준의 keyboard, focus, contrast, target size, error/help, reduced motion 검사를 통과해야 한다.

## Claim Split

- source-backed: Figma의 ISO 42001 인증 발표와 ISO/IEC 42001의 AI management system 목적.
- Dex inference: Dex Company vendor risk template에 `vendor.ai_governance_evidence`, `certificate.scope`, `human_review.required`를 추가하면 AI 도구 실사 품질이 좋아진다는 판단.
- not checked: Figma 인증서 원문, 인증기관 세부 범위, Ethan 계정의 Figma 기능 가용성, 실제 Figma 파일/워크스페이스 보안 설정, ISO 표준 전문 유료 문서 세부 조항.

