---
type: llm-wiki-source
status: active
title: "Material Design Tokens"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: single-source
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://m3.material.io/foundations/design-tokens"
collectionPurpose: "Design tokens를 색상/타이포/모양의 재사용 가능한 결정 단위로 다루는 공식 design system 기준을 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - design-tokens
  - material-design
---

# Material Design Tokens

## Original Content

원문 전체는 복사하지 않는다. 2026-07-03 20:00 KST 기준 Material Design 3 design tokens 공식 문서의 URL, 확인 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Material Design tokens는 색상, 타입, shape 같은 디자인 결정을 이름 붙은 값으로 다뤄 제품과 코드 사이에서 일관성을 유지하게 한다. Dex Company의 frontend/design system 작업에서는 "색을 예쁘게 고르기"보다 "상태, 역할, 컴포넌트에 연결된 token으로 결정하기"가 더 재사용 가능하다.

## Dex Company Use

- 새 UI를 만들 때 raw color palette보다 semantic token 후보를 먼저 만든다.
- dark/light, hover/focus/disabled/error 상태를 token으로 분리한다.
- 디자인 시스템 후보를 볼 때 W3C Design Tokens, USWDS tokens, Material tokens를 함께 비교한다.

## Evidence Quality

- high: Material Design 공식 문서다.
- cross-check: 기존 W3C Design Tokens first stable source와 USWDS design tokens source가 있다.

## WCAG / Accessibility QA Link

Design token은 접근성을 자동 보장하지 않는다. Dex Company에서는 color token을 만들 때 WCAG 2.2의 contrast, non-text contrast, focus visible, target size 관련 검사를 UI 상태별로 별도 수행해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Material Design은 design tokens를 제품 전반에 적용 가능한 스타일 결정 단위로 제시한다.
- Dex inference: Dex Company UI 산출물은 semantic token을 먼저 정의하면 QA와 재사용성이 좋아진다.
- not checked: Material token 파일 다운로드나 특정 프로젝트 적용 테스트는 하지 않았다.

