---
type: llm-wiki-source
status: captured
title: "zeroheight Design Systems Report 2026"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: interpretive
evidenceScope: single-source-with-cross-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: vendor-industry-report
source:
  - "https://report.zeroheight.com/"
publisher: "zeroheight"
collectionPurpose: "Design system 운영 역할이 UX, engineering, DesignOps, accessibility로 확장되는 신호를 Dex Company UI/QA/운영 역할 분리 기준으로 저장한다."
tags:
  - llm-wiki/source
  - design-systems
  - designops
  - accessibility
  - frontend
  - ux-research
---

# zeroheight Design Systems Report 2026

## Original Content

- 수집 시각: 2026-07-04 01:34 KST
- 자료 유형: vendor industry report
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 공개 수치, 운영 판단, bias caveat, 미확인 범위만 보존한다.
- 확인 범위: design system roles 비중, engineering/management/DesignOps/accessibility/content roles 증가 신호, in-house 중심 운영 신호.

## Source-Backed Notes

- zeroheight report 공개 페이지는 design system 참여 역할에서 Product design & UX, software engineering, management, DesignOps, hybrid design & engineering, content design, accessibility 등 역할 분포를 제시한다.
- 2026년 software engineering 비중은 2025년보다 높게 제시되어 design system이 디자이너만의 산출물이 아니라 구현/운영 역할과 더 결합되는 신호로 볼 수 있다.
- report는 design system이 성숙할수록 accessibility, content, DesignOps, management 같은 전문 역할이 더 많이 들린다고 설명한다.

## Dex Company Use Example

- Dex Company에서 디자인 시스템을 만들 때 `/디자이너`만의 산출물로 두지 않고 `/퍼블리셔`, `/개발자`, `/QA`, `/PM` 역할을 함께 묶는다.
- 디자인 시스템 source note를 저장할 때 `token.owner`, `component.owner`, `a11y.owner`, `content.owner`, `release.owner`, `qa.owner`를 분리하면 다음 프로젝트에서 재사용하기 쉽다.
- 이번 실행에서는 zeroheight 도구, 계정, 템플릿, 플러그인, 디자인 시스템 SaaS를 설치하거나 연결하지 않았다.

## WCAG / Accessibility Link

- 이 자료는 WCAG conformance 자료가 아니며 vendor industry report다.
- 다만 accessibility 역할이 design system 운영에 포함되는 신호로 사용할 수 있다. Dex Company 실무 QA에서는 WCAG 2.2의 focus, keyboard, target size, contrast, error identification, name/role/value 검증을 컴포넌트 release gate에 묶어야 한다.

## Evidence Quality

- quality: medium
- 이유: 공개 수치와 업계 신호는 유용하지만 zeroheight가 발행한 vendor report라 제품/시장 narrative bias가 있다.
- 교차 검증: 기존 USWDS, GOV.UK, Carbon, Atlassian, Shopify Polaris accessibility/token source note와 design system 운영이 접근성/구현/문서화를 함께 요구한다는 방향이 일치한다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance.
- 운영 제한: vendor report 수치를 절대 benchmark로 쓰지 말고, Dex Company 내부 프로젝트에서는 실제 component coverage, accessibility defects, adoption, release cadence로 검증해야 한다.

## Claim Split

- source-backed: zeroheight report의 공개 역할 분포와 design system 역할 확장 설명.
- Dex inference: Dex Company design system 작업에 owner matrix와 WCAG-linked release gate를 둬야 한다는 판단.
- not checked: 원자료 전체 methodology, respondent sourcing, 지역/기업 규모 편향, zeroheight 제품 기능, pricing, license.

