---
type: llm-wiki-source
status: active
title: "Adobe Spectrum 2 Inclusive Design"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://s2.spectrum.adobe.com/"
  - "https://spectrum.adobe.com/page/inclusive-design/"
collectionPurpose: "Adobe Spectrum 2를 creative/pro tool UI 기준으로 참고할 때 접근성, 개인화, 플랫폼 적응성의 실무 판단 기준을 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - spectrum
  - accessibility
  - inclusive-design
---

# Adobe Spectrum 2 Inclusive Design

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 21:03 KST 기준 Adobe Spectrum 2와 Spectrum inclusive design 공식 문서의 공개 확인 범위, URL, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Spectrum 2는 Adobe 제품군의 차세대 디자인 시스템 방향으로, 더 현대적이고 접근 가능하며 사용자 맥락에 맞게 적응하는 경험을 강조한다. 특히 크기, scale, 색상, 대비 같은 개인 선호와 다양한 플랫폼 컨벤션을 고려한다는 점이 pro tool UI 평가에 유용하다.

## Dex Company Use

- 이미지 편집, 문서 편집, 대시보드처럼 고밀도 도구 UI를 만들 때 "멋진 화면"보다 tool density, focus, personalization, reduced motion, contrast 선택권을 같이 본다.
- Spectrum 계열 자료는 creative/pro tool 디자인 기준으로 참고하되, extractable text가 제한된 페이지는 high confidence로 승격하지 않는다.
- 덱스 컴퍼니 UI QA에서 personalization이나 theme 옵션이 있을 때 WCAG 대비/텍스트 크기/동작 감소와 충돌하지 않는지 확인한다.

## Evidence Quality

- medium: Adobe 공식 자료지만 일부 Spectrum 문서는 JavaScript 의존도가 높아 텍스트 추출이 제한됐다.
- cross-check: Spectrum 2 공식 페이지, Spectrum inclusive design 공식 페이지, 기존 WCAG 2.2 source note와 교차 확인했다.
- risk: 상세 component accessibility checklist와 package implementation은 이번 실행에서 확인하지 않았다.

## WCAG / Accessibility QA Link

간접 연결된다. Spectrum 2는 inclusive/accessibility 방향을 말하지만, 이번에 확인한 공개 추출 범위만으로 WCAG 항목별 준수는 증명할 수 없다. Dex Company에서는 color contrast, reflow, text spacing, focus order, reduced motion, keyboard operation을 실제 화면에서 별도 테스트해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Spectrum 2는 접근성, 개인화, 플랫폼 적응성을 차세대 방향으로 제시한다.
- Dex inference: pro tool UI에서는 UI 밀도와 접근성 선호를 동시에 설계해야 한다.
- not checked: Spectrum package 설치, React Spectrum/Web Components runtime, Adobe 내부 접근성 테스트 결과는 확인하지 않았다.
