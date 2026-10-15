---
type: llm-wiki-source
status: active
title: "Storybook 9 Component Testing"
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
sourceKind: official-blog
source: "https://storybook.js.org/blog/storybook-9/"
collectionPurpose: "Dex Company frontend QA에서 Storybook stories를 UI 상태, interaction, accessibility, visual test의 실행 단위로 보는 근거를 보존한다."
tags:
  - llm-wiki/source
  - frontend
  - storybook
  - testing
  - accessibility
---

# Storybook 9 Component Testing

## Original Content

원문 전체는 복사하지 않는다. 2026-07-03 20:00 KST 기준 Storybook 9 공식 블로그의 release positioning, component testing 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Storybook 9는 stories가 UI의 여러 상태를 이미 표현하기 때문에, 이를 interaction test, accessibility test, visual test, coverage report의 기반으로 삼을 수 있다고 설명한다. Dex Company의 frontend QA에서는 "화면이 보인다"보다 "상태별 story가 있고 테스트로 검증된다"가 더 강한 증거다.

## Dex Company Use

- 정적 HTML이나 React UI를 만들 때 empty/loading/error/disabled/focus 상태를 story 단위로 분리하는 기준으로 쓴다.
- 접근성 테스트는 Storybook/axe 신호를 출발점으로 삼되, 수동 keyboard/focus 확인을 QA_REPORT에 남긴다.
- 반복되는 UI QA는 Playwright 스크린샷만이 아니라 component state coverage까지 확인하도록 템플릿을 보강한다.

## Evidence Quality

- high: Storybook 공식 블로그이며 관련 공식 Vitest addon과 accessibility testing docs가 이미 LLM Wiki에 있다.
- cross-check: 기존 `2026-07-03-storybook-vitest-addon`, `2026-07-03-storybook-accessibility-testing`, `2026-07-03-gitlab-storybook-accessibility-tests` source note와 연결된다.

## WCAG / Accessibility QA Link

Storybook 9 문서는 accessibility tests가 WCAG violations를 탐지할 수 있다고 설명하지만, 자동 탐지는 전체 WCAG 2.2 준수를 보장하지 않는다. Dex Company QA에서는 자동 a11y 결과, keyboard navigation, focus order, visible focus, error message, name/role/value를 분리해 기록해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Storybook 9는 stories 기반 component testing과 accessibility/visual/interaction test를 강조한다.
- Dex inference: Dex Company frontend QA 템플릿은 story state coverage를 요구하는 방향으로 개선할 수 있다.
- not checked: 이번 실행에서 Storybook 9 프로젝트를 설치하거나 테스트하지 않았다.

