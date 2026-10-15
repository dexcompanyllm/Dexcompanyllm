---
type: llm-wiki-source
status: active
layer: source
title: "Vitest 4.1 Browser Trace Improvements"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: historical
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: release-blog
source: "https://vitest.dev/blog/vitest-4-1.html"
publisher: Vitest
collectionPurpose: "browser mode trace와 UI test debugging 개선을 Dex Company frontend QA 증거 수집 방식에 반영할 수 있는지 평가하기 위해 수집"
tags:
  - llm-wiki/source
  - frontend
  - vitest
  - testing
---

# Vitest 4.1 Browser Trace Improvements

## Original Content

- 원문 URL: https://vitest.dev/blog/vitest-4-1.html
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터, 확인 범위, release 요약만 보존합니다.
- 확인 범위: browser mode, UI browser details panel, Playwright Trace Viewer integration, marker API, HTML coverage reporting sections를 확인했습니다.

## Source-Backed Notes

- Vitest 4.1은 Browser UI의 details panel 위치 설정을 추가했고 작은 화면에서 bottom panel을 쓸 수 있다고 설명합니다.
- Browser mode trace view가 개선되어 click, fill, expect.element 같은 browser interaction이 trace timeline에 그룹화되고 test line과 연결됩니다.
- `page.mark`와 `locator.mark` API로 custom annotation을 trace에 남길 수 있습니다.
- HTML coverage viewing은 UI mode, HTML reporter, browser mode, subpath deployment에서 더 안정적으로 동작한다고 설명합니다.

## Dex Company Use

- 프론트 QA 보고서에는 "테스트 통과"뿐 아니라 trace, interaction grouping, custom marker, coverage artifact를 남기는 방향이 좋습니다.
- 실패 재현이 어려운 UI bug는 Playwright trace와 Vitest browser trace를 함께 비교하는 후보로 둘 수 있습니다.

## WCAG / Accessibility Mapping

- 직접 연결은 제한적입니다. Vitest 4.1은 test runtime/reporter release입니다.
- Dex QA 기준: WCAG 2.2 검증은 axe, keyboard navigation, focus order, accessible name/role/value assertions로 별도 구성하고, Vitest trace는 증거 보존 수단으로 사용합니다.

## Evidence Quality

- publisher: Vitest official blog
- confidence: medium
- 이유: 공식 release blog이지만 실제 프로젝트에서 browser mode를 실행하지 않았습니다.

## Cross Verification

- 기존 Storybook Vitest addon, Storybook Next.js with Vite, Playwright release notes source note와 함께 frontend test evidence model에 사용합니다.

## Risk / License / Install

- 설치 없음.
- Vitest upgrade는 package install이므로 lockfile diff, browser provider, Node version, CI artifact storage, rollback plan 검토가 필요합니다.

## Claim Split

- source-backed: Vitest 4.1 release blog의 browser trace/reporting 개선 설명.
- Dex inference: Dex Company QA evidence에 trace marker를 반영할 수 있다는 판단.
- not checked: 실제 browser mode 실행, Playwright provider 설정, CI artifact upload.
