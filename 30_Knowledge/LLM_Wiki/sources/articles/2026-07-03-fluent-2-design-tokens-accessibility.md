---
type: llm-wiki-source
status: active
title: "Fluent 2 Design Tokens and Accessibility"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://fluent2.microsoft.design/design-tokens"
  - "https://fluent2.microsoft.design/accessibility"
collectionPurpose: "Microsoft Fluent 2를 Dex Company 디자인 시스템 평가 기준으로 사용할 때 token taxonomy와 접근성 QA 연결 방식을 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - fluent
  - design-tokens
  - accessibility
---

# Fluent 2 Design Tokens and Accessibility

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 21:03 KST 기준 Microsoft Fluent 2 공식 design tokens와 accessibility 문서의 URL, 확인 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Fluent 2는 색상, 타이포그래피, 간격, elevation 같은 스타일 결정을 하드코딩하지 않고 token으로 다루며, global token과 alias token 계층을 구분한다. 접근성 문서는 Fluent 구성 요소가 WCAG 2.1 AA 이상을 접근 가능한 기반으로 삼는다고 설명하지만, 실제 제품이 접근 가능하려면 정보 구조, 계층, 탐색, 키보드/포커스 흐름을 프로젝트 단위로 확인해야 한다.

## Dex Company Use

- Windows, Microsoft 365, enterprise admin UI를 만들 때 Fluent를 단순 색상 팔레트가 아니라 token taxonomy와 접근성 체크포인트의 묶음으로 본다.
- 디자인 시스템 QA에서 `global token`, `alias token`, component state, focus/keyboard behavior를 분리해 검사한다.
- 덱스 컴퍼니의 frontend QA 보고서에 WCAG 2.2 기준을 적용할 때 Fluent 문서의 WCAG 2.1 AA 주장을 그대로 완료 증거로 쓰지 않고, 프로젝트 흐름별 검증 항목으로 확장한다.

## Evidence Quality

- high: Microsoft Fluent 2 공식 문서다.
- cross-check: 기존 WCAG 2.2 source note, USWDS/VA/GC/GOV.UK/Carbon design system source notes와 함께 비교 가능하다.
- risk: Fluent의 WCAG 언급은 component foundation 수준이다. 실제 앱의 WCAG 2.2 준수는 별도 테스트가 필요하다.

## WCAG / Accessibility QA Link

직접 연결된다. Fluent 접근성 문서는 WCAG 2.1 AA를 언급한다. Dex Company에서는 WCAG 2.2 AA 기준으로 heading structure, keyboard navigation, focus visible, non-text contrast, error identification, target size를 별도 확인해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Fluent 2는 global/alias token 계층과 접근성 체크포인트를 공식 문서로 제공한다.
- Dex inference: Dex Company 디자인 시스템 실사에서는 token taxonomy와 WCAG QA 연결 여부를 한 묶음으로 평가해야 한다.
- not checked: Fluent UI package 설치, React/Web Components runtime, 실제 Microsoft app 적용 결과는 확인하지 않았다.
