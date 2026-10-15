---
type: llm-wiki-source
status: active
layer: source
explored: false
title: "W3C WAI Accessible Presentations Checklist"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: high
claimType: descriptive
evidenceScope: official-w3c-guidance
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-guidance
source: "https://www.w3.org/WAI/teach-advocate/accessible-presentations/"
collectionPurpose: "PPT, 발표 자료, frontend presentation UI를 접근성 기준과 연결하기 위해 W3C WAI 발표 접근성 체크리스트를 보존한다."
tags:
  - llm-wiki/source
  - accessibility
  - presentation
  - ppt
  - w3c
  - ux
---

# W3C WAI Accessible Presentations Checklist

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 15:03 KST에 W3C WAI의 accessible presentations checklist를 확인했고, 이 note는 Dex Company의 PPT/발표/프론트엔드 발표형 UI QA에 필요한 확인 범위만 보존한다.

## 핵심 내용

W3C WAI는 발표와 회의가 시각, 청각, 이동, 발화, 인지 차이를 가진 사람들에게 포용적이어야 한다고 설명한다. 발표자는 슬라이드의 중요한 시각 정보를 말로 설명하고, 자료를 사전에 제공하며, slide/share 화면에만 의존하지 않아야 한다.

슬라이드 준비 기준으로는 한 슬라이드에 너무 많은 텍스트를 넣지 않기, 뒤에서도 읽을 수 있는 크기, 읽기 쉬운 글꼴, 충분한 색 대비, 불필요하거나 위험한 motion/flash 회피가 강조된다.

## Dex Company 적용

- PPT 제작 시 `읽을 수 있는 크기`, `충분한 대비`, `간결한 텍스트`, `중요 시각 정보 설명`, `자료 사전 제공`을 QA checklist에 넣는다.
- frontend 기반 deck이나 interactive presentation을 만들 때도 WCAG와 presentation accessibility를 함께 적용한다.
- 발표 자료를 PDF만으로 배포하지 말고, 가능하면 HTML, 문서, speaker notes, transcript 같은 재사용 가능한 형태를 고려한다.

## PPT / Frontend QA 연결

- PPT: slide title, reading order, contrast, alt text, caption/transcript, speaker notes.
- Frontend: semantic heading, keyboard navigation, responsive layout, visual description, caption/transcript, reduced motion.
- 공통: 사용자가 "슬라이드를 볼 수 없다"는 가정에서도 핵심 메시지를 얻을 수 있어야 한다.

## Evidence Quality

- high: W3C WAI 공식 guidance다.
- cross-check: Microsoft PowerPoint accessibility guidance, WCAG overview, existing W3C G73 long-description QA note와 함께 사용 가능하다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: W3C WAI는 발표자가 시각 정보를 설명하고, 접근 가능한 자료를 제공하고, 슬라이드 텍스트/크기/대비/motion을 관리해야 한다고 안내한다.
- Dex inference: Dex Company PPT 산출물과 frontend presentation UI는 같은 visual communication QA 기준으로 점검할 수 있다.
- not checked: 이번 실행에서 실제 PPT 파일이나 웹 deck을 접근성 도구로 검사하지 않았다.

## Bias Check

- W3C guidance는 접근성 중심이므로 미적 완성도나 persuasive storytelling 기준을 직접 다루지는 않는다.
- 발표 환경, 청중, 매체에 따라 적용 우선순위가 달라질 수 있다.
