---
type: llm-wiki-source
status: active
layer: source
title: "GC Design System Design Tokens"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: high
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://design-system.canada.ca/en/styles/design-tokens/"
publisher: Government of Canada / GC Design System
collectionPurpose: "design decisions를 code token으로 문서화하고 component/global/base token을 구분하는 기준을 Dex Company 디자인 시스템 평가에 재사용하기 위해 수집"
tags:
  - llm-wiki/source
  - design-systems
  - design-tokens
  - accessibility
---

# GC Design System Design Tokens

## Original Content

- 원문 URL: https://design-system.canada.ca/en/styles/design-tokens/
- 교차 확인 URL: https://design-system.canada.ca/en/start-to-use/
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터, 확인 범위, 요약만 보존합니다.
- 확인 범위: design tokens page의 token definition, component/global/base token 구분, start-to-use page의 accessibility/build 기준을 확인했습니다.

## Source-Backed Notes

- GC Design System은 design tokens를 가장 작은 building block으로 설명하고 GitHub repo 및 Figma library가 있다고 안내합니다.
- 토큰은 design decisions를 code variable로 문서화하며 hard-coded value를 대체합니다.
- component tokens, global tokens, base tokens를 구분하고, component token의 오용은 예기치 않은 변경을 만들 수 있다고 설명합니다.
- start-to-use 문서는 accessible components, bilingual component library, framework-agnostic web components, GC accessibility standards를 함께 강조합니다.

## Dex Company Use

- Dex Company 디자인 시스템 평가표에는 token을 `component`, `global`, `base`로 나누고, component token의 외부 재사용 여부를 별도 위험 항목으로 넣을 수 있습니다.
- 코드 구현에서는 hard-coded color/spacing을 바로 금지하기보다, 의도에 맞는 semantic/global token이 있는지 먼저 확인하도록 QA 기준을 세우는 것이 좋습니다.

## WCAG / Accessibility Mapping

- 직접 연결: GC Design System은 접근 가능한 컴포넌트와 GC accessibility standards를 운영 목표로 제시합니다.
- Dex QA 기준: token은 WCAG를 자동으로 통과시키지 않습니다. 색상 대비, focus visible, text spacing, language/bilingual content, error identification은 별도 테스트가 필요합니다.

## Evidence Quality

- publisher: official government design system
- confidence: high
- 이유: 공식 token page와 start-to-use page를 함께 확인했습니다.

> [!note] Bias Check
> Counter-argument: 정부 디자인 시스템은 특정 공공서비스 맥락에 최적화되어 민간 SaaS UI에 그대로 맞지 않을 수 있습니다.
> Data gap: 실제 프로젝트별 token adoption 비용과 migration effort는 확인하지 않았습니다.

## Cross Verification

- 기존 W3C Design Tokens, USWDS design tokens, GOV.UK accessibility, WCAG 2.2 source note와 교차 사용 가능합니다.

## Risk / License / Install

- 설치 없음.
- 실제 컴포넌트 사용은 package license, framework compatibility, bilingual content needs, accessibility regression을 확인해야 합니다.

## Claim Split

- source-backed: GC Design System의 token definition, token type 구분, accessibility orientation.
- Dex inference: Dex Company 디자인 QA 표에 token type misuse를 추가할 수 있다는 판단.
- not checked: GitHub token repo contents, Figma library contents, npm package install.
