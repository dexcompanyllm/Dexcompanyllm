---
type: llm-wiki-source
status: active
layer: source
explored: false
title: "reveal.js Web Presentation Framework"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: descriptive
evidenceScope: official-project-site
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-site
source: "https://revealjs.com/"
collectionPurpose: "웹 기술 기반 발표 자료를 frontend 산출물로 만들 때 참고할 수 있는 reveal.js의 장점과 설치 경계를 보존한다."
tags:
  - llm-wiki/source
  - revealjs
  - presentation
  - frontend
  - deck-as-code
---

# reveal.js Web Presentation Framework

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 15:03 KST에 reveal.js 공식 사이트를 확인했고, 이 note는 Dex Company PPT/frontend 성장 관점에서 웹 기반 발표 프레임워크의 판단 기준을 보존한다.

## 핵심 내용

reveal.js는 open web technologies 기반의 HTML presentation framework로 소개된다. CSS, iframe, JavaScript API 같은 웹 기능을 발표 자료 안에 사용할 수 있어 interactive deck이나 web-native presentation에 적합하다.

## Dex Company 적용

- 웹 포트폴리오, product demo, interactive prototype, live dashboard 발표에는 HTML deck이 PPT보다 자연스러울 수 있다.
- CSS/JS를 활용할 수 있어 motion, responsive layout, embedded prototype이 필요한 발표에서 후보가 된다.
- 일반 PPT 제출이나 비기술 협업에서는 export/호환성 요구를 먼저 확인해야 한다.

## Approval Decision

- status: `approval-ready-conditional`
- install: No
- 조건: target repo, static hosting/export 방식, dependency risk, accessibility QA, reduced motion, keyboard navigation, rollback이 확인되어야 한다.

## Evidence Quality

- medium: 공식 project site와 GitHub project를 확인했다.
- cross-check: Slidev official site와 함께 web presentation 후보로 비교 가능하다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: reveal.js는 HTML presentation framework이고 open web technologies 기반이라고 설명한다.
- Dex inference: 에던님이 프론트엔드 역량을 PPT 산출물에 녹일 때 HTML deck은 강력한 선택지가 될 수 있다.
- not checked: 로컬 설치, export, browser QA, accessibility conformance, 실제 PPT 변환 품질은 확인하지 않았다.

## Bias Check

- 웹 발표 도구는 브라우저와 네트워크/호스팅 환경에 의존할 수 있다.
- 발표 장소가 PowerPoint 파일 제출을 요구하면 web deck은 부적합할 수 있다.
