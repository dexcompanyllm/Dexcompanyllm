---
type: llm-wiki-source
status: active
layer: source
title: "VA.gov Design System Design Tokens"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://design.va.gov/foundation/design-tokens"
publisher: VA.gov Design System
collectionPurpose: "공공 서비스 디자인 시스템에서 tokens와 accessibility documentation이 함께 운영되는 방식을 Dex Company frontend QA 기준으로 재사용하기 위해 수집"
tags:
  - llm-wiki/source
  - design-systems
  - design-tokens
  - accessibility
---

# VA.gov Design System Design Tokens

## Original Content

- 원문 URL: https://design.va.gov/foundation/design-tokens
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터, 확인 범위, 요약만 보존합니다.
- 확인 범위: design tokens page, release metadata, navigation에 포함된 accessibility tests/library/focus management 항목을 확인했습니다.

## Source-Backed Notes

- VA.gov Design System은 design tokens를 foundation 영역으로 다루며, 같은 문서 체계 안에 component accessibility tests, accessibility test library, focus management 같은 QA 항목을 둡니다.
- 확인 시점의 페이지에는 Component Library v56.6.2, Guidance Sprint 2 등 최신 release metadata가 표시되었습니다.

## Dex Company Use

- 디자인 토큰 source note는 색/간격 이름만 저장하면 부족합니다. 토큰이 실제 컴포넌트 접근성 테스트, focus management, release 추적과 연결되는지까지 봐야 합니다.
- 퍼블리셔/QA 작업에서는 "토큰 적용"과 "WCAG/키보드/focus/스크린리더 검증"을 별도 체크로 분리해야 합니다.

## WCAG / Accessibility Mapping

- 직접 연결: VA.gov 문서 체계는 accessibility tests와 focus management를 별도 항목으로 둡니다.
- Dex QA 기준: token adoption은 WCAG 적합성의 충분조건이 아니며, WCAG 2.2의 keyboard focus, contrast, error handling, status message 등을 컴포넌트와 flow 단위로 확인해야 합니다.

## Evidence Quality

- publisher: official government design system
- confidence: medium
- 이유: 공식 문서이나 이 source note에서는 세부 token 목록 전체와 개별 accessibility test 결과를 완전 검토하지 않았습니다.

## Cross Verification

- 기존 USWDS design tokens, GOV.UK accessibility, Carbon accessibility, WCAG 2.2 source note와 함께 공공 디자인 시스템 QA 기준으로 비교 가능합니다.

## Risk / License / Install

- 설치 없음.
- 디자인 시스템 패키지나 web component를 실제 프로젝트에 채택하려면 license, package, browser support, accessibility regression 확인이 필요합니다.

## Claim Split

- source-backed: VA.gov Design System에 design tokens와 accessibility 관련 문서 영역이 존재한다는 점.
- Dex inference: Dex Company QA에서 token adoption과 WCAG 검증을 분리해야 한다는 판단.
- not checked: 모든 token 값, 모든 component accessibility test 결과, 실제 npm package 실행.
