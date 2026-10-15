---
type: llm-wiki-source
status: captured
title: "NN/g Design Specs Handoff Guidance"
created: 2026-07-08
updated: 2026-07-08
dateCreated: 2026-07-08
dateModified: 2026-07-08
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-08
verifiedBy: Dex
disputed: false
sourceKind: expert-ux-video
source:
  - "https://www.nngroup.com/videos/what-are-design-specs/"
  - "https://www.nngroup.com/videos/mistakes-when-creating-design-specs/"
publisher: "Nielsen Norman Group"
collectionPurpose: "PPT/frontend handoff에서 디자인 파일만 넘기는 위험을 줄이고, layout, interaction, requirements, scope, behavior, appearance, functionality, development issue context를 체크리스트화한다."
tags:
  - llm-wiki/source
  - ux-research
  - design-process
  - frontend
  - ppt
  - handoff
---

# NN/g Design Specs Handoff Guidance

## Original Content

- 수집 시각: 2026-07-08 22:34 KST
- 자료 유형: NN/g 공개 영상 메타데이터와 요약
- 주요 URL:
  - https://www.nngroup.com/videos/what-are-design-specs/
  - https://www.nngroup.com/videos/mistakes-when-creating-design-specs/
- 보존 범위: 공개 URL, 게시자, 날짜, 요약, Dex Company 적용 기준, 미확인 범위. 원문 전체나 영상 transcript는 복사하지 않았다.

## 핵심 내용 쉬운 설명

NN/g의 2026 design specs 영상은 디자인이 개발 리뷰에서 반려되는 이유 중 하나를 "구현에 필요한 specification 누락"으로 본다. design spec은 화면 모양만이 아니라 layout, interaction, requirements, project scope를 개발자가 판단 가능한 형태로 설명해야 한다.

2025년 NN/g design specs 실수 영상은 spec 작업에서 파일 정리, 개발자 협업 시점, 업데이트 명확성, 대화 위치, 암묵적 가정이 흔한 실패 지점이라고 설명한다.

## Dex Company 사용 예시

- PPT나 frontend 화면을 넘길 때 디자인 파일 링크만 남기지 않고, 화면별 handoff note에 `layout`, `interaction`, `requirement`, `scope`, `behavior`, `appearance`, `functionality`, `dev issue context`를 채운다.
- 비어 있는 필드는 개발 착수 전 보완 대상으로 표시한다.
- QA_REPORT에는 "디자인 handoff 맥락 누락으로 인한 리워크 위험"을 별도 not checked 또는 risk로 남긴다.

## Evidence Quality

- source-backed: NN/g 공개 페이지에서 2026 design specs 영상의 날짜, 주제, 요약 범위를 확인했다.
- source-backed: NN/g 2025 design specs mistakes 영상에서 협업/정리/업데이트/대화/가정 관련 실패 유형을 확인했다.
- Dex inference: Dex Company의 `PPT Frontend Visual Communication Checklist`에 handoff context 필드를 추가하는 것은 NN/g 내용을 운영 체크리스트로 번역한 것이다.
- not checked: 2026 영상 전체 transcript, 유료 course 자료, 실제 에던님 Figma/PRD/GitHub issue handoff 품질은 확인하지 않았다.

## Cross-Check

- 기존 `PPT Frontend Visual Communication Checklist`는 이미 화면별 hierarchy, 상태, 접근성, large UI, form/table/status QA를 요구한다.
- 기존 Storybook 10.3/10.4 source notes는 frontend agent가 실제 component, story, docs, tests, accessibility checks를 봐야 한다는 방향을 보존한다.
- 이번 NN/g source는 "구현 전 handoff context가 충분한가"를 묻는 상위 체크로 연결된다.

## License / Security / Install Risk

- 설치 여부: 없음.
- connector/MCP/SDK/브라우저 확장 변경: 없음.
- 보안 리스크: 없음. 단, 실제 handoff에 프로젝트 비밀값, 고객명, 계정 정보, 토큰이 들어가지 않도록 redaction이 필요하다.

## WCAG / Frontend QA Link

이 자료는 WCAG conformance 문서가 아니다. 다만 접근성 QA가 개발 단계에서 누락되지 않게 하려면 handoff context에 interaction, state, label, focus, error, responsive scope가 명시되어야 하므로 WCAG 2.2 기반 frontend QA의 선행 조건으로 사용할 수 있다.
