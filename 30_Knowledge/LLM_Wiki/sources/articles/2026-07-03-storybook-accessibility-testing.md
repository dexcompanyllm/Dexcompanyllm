---
type: llm-wiki-source
status: captured
title: "Storybook Accessibility Testing"
sourceKind: official-doc
sourceUrl: "https://storybook.js.org/docs/writing-tests/accessibility-testing"
source:
  - "https://storybook.js.org/docs/writing-tests/accessibility-testing"
  - "https://storybook.js.org/addons/%40storybook/addon-a11y"
  - "https://github.com/storybookjs/storybook/commits/next.atom"
publisher: Storybook
capturedAt: 2026-07-03T17:27:12+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company frontend/design systems 산출물에 컴포넌트 단위 접근성 테스트 루프를 붙이기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-doc
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - frontend
  - design-systems
  - accessibility
  - qa
---

# Storybook Accessibility Testing

## Source Snapshot

- Docs: https://storybook.js.org/docs/writing-tests/accessibility-testing
- Addon page: https://storybook.js.org/addons/%40storybook/addon-a11y
- GitHub commit feed checked: https://github.com/storybookjs/storybook/commits/next.atom
- Publisher: Storybook
- Captured for: frontend QA, design system component checks, WCAG-linked testing

## Key Notes

Storybook 접근성 테스트 문서는 a11y addon이 Deque axe-core 기반으로 렌더링된 DOM을 검사하고, 컴포넌트 스토리에서 violations, passes, incomplete 결과를 보여준다고 설명한다. Storybook addon 페이지도 WCAG compliance testing을 위한 공식 addon으로 제시한다.

## Why It Matters

Dex Company가 UI를 만들 때 WCAG 2.2를 원칙으로만 저장해 두면 실제 구현 QA로 이어지기 어렵다. Storybook a11y는 디자인 시스템 컴포넌트를 story 단위로 점검하게 해 주므로, 버튼, 입력, 탭, 모달 같은 반복 UI의 품질을 재사용 가능하게 확인할 수 있다.

## Dex Company Use Example

- 디자인 시스템을 만들 때 각 컴포넌트 story에 a11y panel 확인 결과를 QA_REPORT에 남긴다.
- WCAG 기준 중 색 대비, 키보드 접근, ARIA 이름, 폼 라벨, 오류 메시지는 Storybook a11y 결과와 수동 확인을 함께 사용한다.
- addon 설치는 프로젝트별 package 변경이므로 자동 설치하지 않고, 해당 frontend repo 작업 때만 에던 승인 또는 명시 요청 후 적용한다.

## WCAG Mapping

- WCAG 2.2 source note와 연결된다.
- 자동 검사는 첫 QA 라인으로 유용하지만, keyboard flow, screen reader 맥락, 복잡한 interaction은 수동 확인이 필요하다.

## Verification

- source-backed: Storybook official docs, Storybook addon page, Storybook GitHub commit Atom feed 접근을 확인했다.
- Dex inference: Dex Company QA_REPORT에 남길 항목은 Storybook 기능을 운영 템플릿으로 해석한 것이다.
- not checked: 실제 프로젝트에 addon 설치, Vitest integration 실행, axe-core 결과 검증.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, addon 위치, WCAG 연결, Dex Company QA 적용 포인트만 보존한다.
