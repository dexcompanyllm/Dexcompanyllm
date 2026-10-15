---
type: llm-wiki-source
status: active
title: "GitLab Storybook Accessibility Tests"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: source-backed
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://docs.gitlab.com/development/fe_guide/accessibility/storybook_tests/"
collectionPurpose: "Storybook component QA를 axe/Playwright 접근성 검사와 연결하는 실무 사례를 덱스 컴퍼니 frontend QA 기준으로 보존한다."
tags:
  - llm-wiki/source
  - gitlab
  - frontend
  - accessibility
  - storybook
  - wcag
---

# GitLab Storybook Accessibility Tests

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 GitLab Docs의 Accessibility Storybook tests 문서를 확인했고, 이 note는 component-level accessibility QA 흐름만 보존한다.

## Easy Explanation

GitLab은 Storybook test-runner와 axe-playwright로 Vue component의 접근성 위반을 자동 검사하는 흐름을 문서화한다. 테스트는 story를 순회하고 accessibility violation, runtime error, severity, affected element, suggested fix를 보고한다. 개발 중, merge request 전, CI에서 component state를 빠르게 확인하는 실무 패턴이다.

## Dex Company Use

- 프론트엔드 산출물은 Storybook이 없어도 component state, focus, disabled, error, empty state를 검사해야 한다.
- Storybook이 있는 프로젝트라면 axe/Playwright 결과를 QA_REPORT에 증거로 남긴다.
- WCAG 2.2 연결: axe rule은 WCAG 기준 일부를 자동 점검하지만 전체 접근성 준수 증명은 아니다. 키보드 흐름, focus visible, contrast, name/role/value, 오류 안내 같은 수동 확인을 병행한다.

## Evidence Quality

- high: GitLab 공식 engineering documentation이다.
- cross-check: 기존 Storybook accessibility testing source note, Storybook Vitest addon source note, WCAG 2.2 source note와 연결된다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitLab은 Storybook test-runner와 axe-playwright를 사용해 component accessibility violations를 자동 검사하는 절차를 문서화한다.
- Dex inference: 덱스 컴퍼니 frontend QA는 screenshot만으로 끝내지 말고 component state와 accessibility evidence를 함께 남겨야 한다.
- not checked: 이번 실행에서 실제 Storybook test-runner나 axe-playwright를 실행하지 않았다.

