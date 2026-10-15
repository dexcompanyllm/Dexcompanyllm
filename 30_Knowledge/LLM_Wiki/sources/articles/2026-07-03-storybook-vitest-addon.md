---
type: llm-wiki-source
status: active
title: "Storybook Vitest Addon"
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
sourceKind: official-docs
source: "https://storybook.js.org/docs/writing-tests/integrations/vitest-addon"
collectionPurpose: "Dex Company frontend QA에서 stories를 component test와 coverage 흐름으로 연결하는 공식 Storybook/Vitest 기준을 저장한다."
tags:
  - llm-wiki/source
  - frontend
  - storybook
  - vitest
  - testing
---

# Storybook Vitest Addon

## Original Content

원문 전체를 복사하지 않는다. Storybook 공식 Vitest addon 문서 URL과 Dex Company frontend QA 적용 범위만 보존한다.

## Easy Explanation

Storybook Vitest addon은 stories를 브라우저 기반 component test로 실행하게 해준다. UI 상태를 문서로만 두지 않고 테스트 가능한 단위로 바꾸는 흐름이다.

## Dex Company Use

- 프론트엔드 산출물에서 Storybook stories를 QA evidence로 승격할 때 참고한다.
- 접근성 테스트 source와 함께 component state, interaction, coverage를 검증한다.
- 디자인 시스템 컴포넌트가 실제 상태별로 동작하는지 확인하는 후보 도구로 둔다.

## Evidence Quality

- high: Storybook 공식 문서.
- cross-check: Storybook accessibility testing source, Storybook Next.js Vite docs, Vitest release docs와 연결 가능.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Storybook Vitest addon이 stories를 component tests로 변환하고 browser environment에서 test를 수행한다는 점.
- Dex inference: Dex Company frontend QA 기준으로 쓰는 판단.
- not checked: 현재 Dex Company 프로젝트에 Storybook/Vitest를 설치하지 않았다.
