---
type: llm-wiki-source
status: active
layer: source
explored: false
title: "Slidev Developer Presentations"
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
source: "https://sli.dev/"
collectionPurpose: "PPT와 frontend를 연결하는 deck-as-code 후보로 Slidev의 지식만 보존하고, 설치는 project-specific approval 대상으로 분리한다."
tags:
  - llm-wiki/source
  - slidev
  - presentation
  - frontend
  - deck-as-code
---

# Slidev Developer Presentations

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 15:03 KST에 Slidev 공식 사이트와 GitHub search 결과를 확인했고, 이 note는 Dex Company의 PPT/frontend 성장 관점에서 deck-as-code 가능성과 승인 경계를 보존한다.

## 핵심 내용

Slidev는 developers를 위한 presentation slides 도구로 소개된다. Markdown 기반 콘텐츠와 frontend 기술을 결합해 코드 하이라이트, Vue 컴포넌트, 테마, 라이브 코딩 같은 발표 경험을 구성할 수 있는 방향이다.

## Dex Company 적용

- PPT를 단발 파일이 아니라 재사용 가능한 frontend artifact로 만들 때 후보가 될 수 있다.
- 기술 발표, 제품 데모, 코드 예시가 많은 deck에서는 Markdown + component 방식이 유지보수에 유리할 수 있다.
- 다만 실제 설치, theme 도입, npm 실행은 package 변경이므로 자동 흡수하지 않는다.

## Approval Decision

- status: `approval-ready-conditional`
- install: No
- 조건: 실제 presentation repo, Node/package manager, theme, export target, hosting/export path, rollback, accessibility QA가 있어야 한다.

## Evidence Quality

- medium: 공식 project site와 GitHub metadata를 확인했다.
- cross-check: reveal.js official site와 함께 web presentation framework 후보로 비교 가능하다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Slidev는 presentation slides for developers로 소개되며 MIT license project다.
- Dex inference: 에던님의 PPT와 frontend 작업을 연결하는 데 deck-as-code 방식이 도움이 될 수 있다.
- not checked: 로컬 설치, theme 품질, export 결과, PowerPoint 호환성, 접근성 결과는 확인하지 않았다.

## Bias Check

- 개발자 친화 도구라 비개발자 협업이나 일반 PPT 제출 환경에는 불편할 수 있다.
- 오픈소스 도구의 유지보수 상태와 dependency risk는 설치 직전에 다시 확인해야 한다.
