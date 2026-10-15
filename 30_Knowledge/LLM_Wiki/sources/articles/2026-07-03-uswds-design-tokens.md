---
type: llm-wiki-source
status: active
title: "USWDS Design Tokens"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: definition
evidenceScope: single-source
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://designsystem.digital.gov/design-tokens/"
collectionPurpose: "Dex Company frontend/design-system 작업에서 design token을 제한된 선택지와 공통 언어로 쓰는 기준을 보존한다."
tags:
  - llm-wiki/source
  - design-system
  - design-tokens
  - frontend
---

# USWDS Design Tokens

## Original Content

원문 전체를 복사하지 않는다. U.S. Web Design System design tokens 문서 URL과 핵심 적용 의미만 보존한다.

## Easy Explanation

USWDS는 design token을 모든 가능한 값이 아니라, 팀이 반복해서 쓸 제한된 선택지로 다룬다. 색, 간격, typography 같은 값을 공통 언어로 만들면 디자인과 구현의 차이가 줄어든다.

## Dex Company Use

- UI를 만들 때 임의 색상/간격을 늘리지 않고 token 기반 선택지를 만든다.
- design system 후보를 평가할 때 token이 문서와 코드 양쪽에서 쓰이는지 본다.
- Obsidian/LLM Wiki UI 도구가 생기면 token naming과 accessibility 기준을 함께 검토한다.

## Evidence Quality

- high: USWDS 공식 design system 문서.
- cross-check: W3C Design Tokens, VA.gov tokens, Material Design tokens와 비교 가능.

## Source-Backed / Dex Inference / Not Checked

- source-backed: USWDS가 design token을 시각 디자인의 discrete choices로 설명한다는 점.
- Dex inference: Dex Company UI 기준으로 흡수하는 판단.
- not checked: USWDS token package 설치나 code import는 수행하지 않았다.
