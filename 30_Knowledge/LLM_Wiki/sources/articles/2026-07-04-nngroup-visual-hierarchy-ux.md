---
type: llm-wiki-source
status: active
layer: source
explored: false
title: "NN/g Visual Hierarchy in UX"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: high
claimType: descriptive
evidenceScope: expert-ux-article
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: expert-article
source: "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/"
collectionPurpose: "PPT와 frontend UI 모두에 적용 가능한 visual hierarchy 판단 기준을 Dex Company 디자인 QA에 보존한다."
tags:
  - llm-wiki/source
  - ux
  - ui
  - visual-hierarchy
  - ppt
  - frontend
---

# NN/g Visual Hierarchy in UX

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 15:03 KST에 Nielsen Norman Group의 visual hierarchy article을 확인했고, 이 note는 Dex Company의 PPT/frontend visual QA 기준만 보존한다.

## 핵심 내용

NN/g는 visual hierarchy가 사용자의 시선을 가장 중요한 요소로 안내한다고 설명한다. hierarchy는 color/contrast, scale, grouping 같은 방식으로 만들어지며, 모든 요소가 비슷하게 강조되면 사용자가 어디부터 봐야 할지 알기 어렵다.

## Dex Company 적용

- PPT 한 장은 화면 하나의 UI와 같다. 제목, 핵심 주장, 근거, 시각 자료, 행동 요청의 우선순위가 명확해야 한다.
- 프론트엔드 화면에서도 primary action, 상태, 입력, 오류, 보조 정보가 같은 강도로 경쟁하면 안 된다.
- 디자인 리뷰 때 "예쁜가"보다 "첫 시선이 어디로 가고, 다음 시선이 어디로 흐르는가"를 먼저 본다.

## PPT / Frontend QA 연결

- PPT: 제목 크기, 핵심 메시지 대비, 근거 그룹핑, 불필요한 장식 제거, 한 슬라이드 한 중심 메시지.
- Frontend: primary button, form hierarchy, card/list grouping, dashboard metric priority, empty/error/loading state 우선순위.
- 공통: color alone에 의존하지 않고 size, spacing, grouping, label을 함께 사용한다.

## Evidence Quality

- high: NN/g UX article이다.
- cross-check: Material typography, Carbon dashboard guidance, Microsoft/W3C presentation accessibility와 함께 사용 가능하다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: NN/g는 visual hierarchy를 color/contrast, scale, grouping으로 설명한다.
- Dex inference: PPT와 frontend는 모두 화면 위 정보의 우선순위를 설계한다는 점에서 같은 hierarchy QA를 공유할 수 있다.
- not checked: 실제 PPT나 UI 화면에 squint test, eye-tracking, user test를 수행하지 않았다.

## Bias Check

- NN/g article은 웹/UX 사례 중심이라 모든 발표 디자인 맥락을 직접 다루지는 않는다.
- visual hierarchy는 문화, 브랜드, 발표 목적에 따라 다른 해석이 가능하다.
