---
type: llm-wiki-source
status: active
title: "Carbon Design System Accessibility"
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
source: "https://carbondesignsystem.com/guidelines/accessibility/overview/"
collectionPurpose: "Enterprise design system에서 WCAG AA, Section 508, European standards를 accessibility checklist에 연결하는 실무 기준을 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - accessibility
  - carbon
  - wcag
---

# Carbon Design System Accessibility

## Original Content

원문 전체는 복사하지 않는다. 2026-07-03 20:00 KST 기준 Carbon Design System accessibility overview의 표준 연결, 확인 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Carbon은 IBM Accessibility Checklist가 WCAG AA, Section 508, European standards에 기반한다고 설명한다. 또 개별 element와 component가 accessible하더라도, 접근 가능한 product를 만들려면 조합과 사용 맥락까지 설계해야 한다.

## Dex Company Use

- enterprise dashboard나 운영툴 UI에서 Carbon을 참고할 때 component accessibility와 product accessibility를 분리한다.
- 색상/차트/데이터 시각화는 color-only encoding을 피하고, 표나 텍스트 대체 설명을 함께 검토한다.
- accessibility QA는 component status, page flow, content, interaction을 따로 기록한다.

## Evidence Quality

- high: IBM Carbon 공식 design system 문서다.
- cross-check: GOV.UK accessibility, WCAG 2.2, GitLab Storybook accessibility tests source note와 연결된다.

## WCAG / Accessibility QA Link

직접 연결된다. Carbon은 WCAG AA 기반 checklist를 언급하며, Dex Company는 WCAG 2.2 AA 관점에서 contrast, keyboard operation, screen reader labeling, chart/data alternatives, error recovery를 프로젝트별로 확인해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Carbon은 accessibility checklist와 WCAG AA 기반을 명시한다.
- Dex inference: Dex Company 운영형 UI QA는 Carbon식 component status와 GOV.UK식 service-level 검증을 함께 쓰면 좋다.
- not checked: Carbon React component 패키지는 설치하거나 실행하지 않았다.

