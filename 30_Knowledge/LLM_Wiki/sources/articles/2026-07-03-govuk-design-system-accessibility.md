---
type: llm-wiki-source
status: active
title: "GOV.UK Design System Accessibility"
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
source: "https://design-system.service.gov.uk/accessibility/"
collectionPurpose: "Design system을 사용해도 서비스 접근성이 자동 보장되지 않는다는 공공 서비스 기준을 Dex Company frontend QA 원칙으로 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - accessibility
  - govuk
  - wcag
---

# GOV.UK Design System Accessibility

## Original Content

원문 전체는 복사하지 않는다. 2026-07-03 20:00 KST 기준 GOV.UK Design System accessibility 문서의 핵심 메시지와 Dex Company 적용 판단만 보존한다.

## Easy Explanation

GOV.UK Design System은 접근 가능한 style, component, pattern을 써도 서비스 전체가 자동으로 접근 가능해지는 것은 아니라고 말한다. 실제 서비스에서는 추가 research, design, development, testing이 필요하다.

## Dex Company Use

- design system 사용 여부와 별개로 QA_REPORT에 접근성 확인 항목을 남긴다.
- 컴포넌트 자체가 검증돼도 조합, 콘텐츠, form flow, error handling, keyboard path는 프로젝트별로 다시 확인한다.
- 공공/운영형 UI 작업에서는 "디자인 시스템을 썼다"를 접근성 완료 증거로 쓰지 않는다.

## Evidence Quality

- high: UK Government Digital Service의 공식 design system 문서다.
- cross-check: 기존 WCAG 2.2 source, GitLab Storybook accessibility tests, Carbon accessibility source와 함께 접근성 QA 원칙을 보강한다.

## WCAG / Accessibility QA Link

직접 연결된다. 이 자료는 design system 사용이 접근성 보장을 대체하지 않는다고 말하며, Dex Company는 WCAG 2.2 기준으로 페이지/flow 단위의 keyboard, focus, labels, errors, contrast, responsive behavior를 별도 검증해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GOV.UK는 design system 사용만으로 서비스 접근성이 자동 보장되지 않는다고 설명한다.
- Dex inference: Dex Company QA 템플릿에는 design system adoption과 service-level accessibility verification을 분리해야 한다.
- not checked: GOV.UK의 개별 component implementation은 이번 실행에서 테스트하지 않았다.

