---
type: llm-wiki-source
status: active
layer: source
explored: false
title: "Microsoft PowerPoint Accessibility Guidance"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: high
claimType: descriptive
evidenceScope: official-microsoft-support
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-support
source: "https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities"
collectionPurpose: "PPT 제작 품질을 Microsoft PowerPoint의 실제 접근성 기능과 검증 항목으로 연결하기 위해 보존한다."
tags:
  - llm-wiki/source
  - powerpoint
  - ppt
  - accessibility
  - microsoft
  - presentation
---

# Microsoft PowerPoint Accessibility Guidance

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 15:03 KST에 Microsoft Support의 PowerPoint accessibility guidance를 확인했고, 이 note는 Dex Company PPT 제작 QA에 필요한 항목만 보존한다.

## 핵심 내용

Microsoft는 PowerPoint 발표 자료를 접근 가능하게 만들기 위한 항목으로 작업 중 accessibility check, accessible slides, table 회피, visual alt text, accessible hyperlink text, readable font/color, caption/subtitle/alternative audio, 다른 format 저장, screen reader test를 제시한다.

## Dex Company 적용

- PPT 산출물은 "예뻐 보이는가"만 보지 않고 PowerPoint Accessibility Checker와 screen reader 관점의 구조를 확인한다.
- slide title, reading order, alt text, hyperlink text, color contrast, caption, PDF export tag를 QA 항목으로 둔다.
- 템플릿을 만들 때는 slide master/layout 단계에서 접근성을 설계한다.

## PPT QA Checklist

- 각 슬라이드에 고유하고 의미 있는 title이 있는가?
- 읽기 순서가 발표 흐름과 일치하는가?
- 이미지, 도형, 차트에 필요한 alt text 또는 설명이 있는가?
- 링크 텍스트가 단독으로 이해 가능한가?
- 색 대비와 폰트 크기가 발표 환경에서도 읽히는가?
- 영상/오디오에는 caption, subtitle, transcript, alternative audio가 있는가?
- PDF로 내보낼 때 accessibility tag가 유지되는가?

## Evidence Quality

- high: Microsoft PowerPoint 공식 지원 문서다.
- cross-check: W3C WAI accessible presentations guidance와 함께 PPT 접근성 QA 기준으로 사용할 수 있다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Microsoft는 PowerPoint 접근성 작업 항목과 검사/테스트 절차를 공식 문서로 제공한다.
- Dex inference: Dex Company PPT 템플릿은 디자인 시스템처럼 slide master, title, reading order, contrast, component reuse 기준을 가져야 한다.
- not checked: 이번 실행에서 PowerPoint 앱이나 실제 PPT 파일을 열어 Accessibility Checker를 실행하지 않았다.

## Bias Check

- Microsoft 문서는 PowerPoint 기능 중심이므로 Google Slides, Keynote, HTML deck에는 그대로 적용되지 않을 수 있다.
- 도구의 accessibility checker 통과가 실제 사용자 경험을 완전히 보장하지는 않는다.
