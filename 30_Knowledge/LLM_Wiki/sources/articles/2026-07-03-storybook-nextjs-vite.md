---
type: llm-wiki-source
status: active
layer: source
title: "Storybook for Next.js with Vite"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: high
claimType: prescriptive
evidenceScope: single-source
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://storybook.js.org/docs/get-started/frameworks/nextjs-vite"
publisher: Storybook
collectionPurpose: "Next.js UI 컴포넌트를 Storybook/Vite 기반으로 격리 개발 및 테스트할 때 필요한 조건과 한계를 Dex Company frontend QA 기준으로 재사용하기 위해 수집"
tags:
  - llm-wiki/source
  - frontend
  - storybook
  - nextjs
  - vite
---

# Storybook for Next.js with Vite

## Original Content

- 원문 URL: https://storybook.js.org/docs/get-started/frameworks/nextjs-vite
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터, 확인 범위, 요약만 보존합니다.
- 확인 범위: recommended framework statement, install guidance, requirements, Vite/Webpack choice, supported Next.js features, known limitations/troubleshooting sections를 확인했습니다.

## Source-Backed Notes

- Storybook 문서는 `@storybook/nextjs-vite`를 Next.js UI 컴포넌트 격리 개발 및 테스트용 권장 framework로 설명합니다.
- 요구조건은 Next.js 14.1 이상, Vite 5 이상입니다.
- Vite 기반 framework는 빠른 build, modern tooling, Vitest addon support, simpler configuration을 장점으로 제시합니다.
- 문서는 Next.js image/font/routing/module mocking을 지원하지만, server-only module이 포함된 page import는 Storybook Vite build에서 깨질 수 있다고 주의합니다.

## Dex Company Use

- Next.js 프로젝트 QA에서는 "Storybook 사용"만으로 충분하지 않고, `nextjs-vite` 채택 가능 여부를 Babel/Webpack custom config, server component import, image/font mock, sharp dependency 기준으로 사전 점검해야 합니다.
- 컴포넌트 QA는 Storybook stories, Vitest addon, accessibility testing, visual regression을 연결하는 방향이 좋습니다.

## WCAG / Accessibility Mapping

- 직접 연결: 이 문서는 WCAG 문서가 아니라 Storybook/Next/Vite integration 문서입니다.
- Dex QA 기준: Storybook으로 상태별 story를 만들고, 기존 Storybook accessibility testing 및 WCAG 2.2 source note를 연결해 keyboard/focus/name/role/value/error state를 검증해야 합니다.

## Evidence Quality

- publisher: Storybook official docs
- confidence: high
- 이유: 공식 문서 본문과 요구조건, 제한사항을 직접 확인했습니다.

> [!note] Bias Check
> Counter-argument: Storybook 공식 문서는 Storybook 채택 이점을 강조하므로 프로젝트별 setup cost를 낮게 보일 수 있습니다.
> Data gap: 실제 Dex Company 프로젝트에 설치해 build/test 시간을 측정하지 않았습니다.

## Cross Verification

- 기존 Storybook 9, Storybook Vitest addon, Storybook accessibility testing, GitLab Storybook accessibility tests source note와 연결됩니다.

## Risk / License / Install

- 설치 없음.
- 실제 설치는 package audit, lockfile diff, Next.js version, Vite version, CI build, accessibility tests, rollback plan 검토 후 에던님 승인 필요입니다.

## Claim Split

- source-backed: 공식 Storybook `nextjs-vite` 문서의 권장 상태, 요구조건, 장점, 제한사항.
- Dex inference: Dex Company frontend QA에 사전 점검표로 반영해야 한다는 판단.
- not checked: 실제 프로젝트 설치, CI 실행, Chromatic/Playwright 연동.
