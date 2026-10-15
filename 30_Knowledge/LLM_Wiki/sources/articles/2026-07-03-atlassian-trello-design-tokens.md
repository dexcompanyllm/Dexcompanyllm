---
type: llm-wiki-source
status: active
layer: source
title: "Atlassian Design Tokens in Trello Power-Ups"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://developer.atlassian.com/cloud/trello/power-ups/color-theme-compliance/using-atlassian-design-tokens/"
publisher: Atlassian Developer
collectionPurpose: "theme-aware design token 사용을 실제 iframe/app extension 맥락에서 설명한 공식 사례로 저장해 Dex Company UI extension QA에 재사용하기 위해 수집"
tags:
  - llm-wiki/source
  - design-systems
  - design-tokens
  - frontend
---

# Atlassian Design Tokens in Trello Power-Ups

## Original Content

- 원문 URL: https://developer.atlassian.com/cloud/trello/power-ups/color-theme-compliance/using-atlassian-design-tokens/
- 관련 공식 URL: https://atlassian.design/tokens/design-tokens
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터, 확인 범위, 짧은 요약만 보존합니다.
- 확인 범위: Trello Power-Up color theme compliance guide, Atlassian Design Tokens reference link, theme subscription and CSS variable usage sections를 확인했습니다.

## Source-Backed Notes

- Atlassian Developer 문서는 Trello Power-Up에서 Atlassian Design Tokens를 쓰면 light/dark theme에 맞춰 UI를 맞출 수 있다고 설명합니다.
- 색상 토큰은 실제 색 이름보다 component intent에 따라 명명되는 경우가 많습니다.
- CSS custom property와 JS token helper를 함께 다루며, theme 변화 구독을 통해 iframe UI가 현재 theme와 동기화되도록 안내합니다.

## Dex Company Use

- MCP Apps, browser extension, embedded UI 같은 iframe/app extension 후보를 평가할 때 token만 보는 것이 아니라 host theme sync, fallback value, unsubscribe, runtime theme loading 상태를 함께 봐야 합니다.
- 디자인 시스템 token은 "정적 스타일 값"보다 "상태/테마/host context와 연결된 contract"로 기록하는 것이 실무적으로 더 유용합니다.

## WCAG / Accessibility Mapping

- 직접 연결은 제한적입니다. 이 문서는 color theme compliance 중심이며 WCAG 체크리스트 문서는 아닙니다.
- Dex QA 기준: light/dark theme token 적용 후에도 WCAG 2.2 contrast, focus visible, forced-colors/high-contrast mode, keyboard interaction을 별도로 확인해야 합니다.

## Evidence Quality

- publisher: Atlassian official developer docs
- confidence: medium
- 이유: Trello 구현 가이드는 확인했지만 Atlassian Design Tokens reference page 자체는 이번 도구에서 본문 추출이 제한되었습니다.

## Cross Verification

- 기존 W3C Design Tokens, USWDS, Material tokens, GC Design System tokens source note와 비교해 "theme-aware token runtime" 사례로 쓸 수 있습니다.

## Risk / License / Install

- 설치 없음.
- Trello Power-Up, Atlassian package, design token package 사용은 host API 권한, iframe, CDN, package license, CSP를 별도로 점검해야 합니다.

## Claim Split

- source-backed: Trello Power-Up guide의 token, theme sync, CSS/JS usage 설명.
- Dex inference: MCP Apps와 embedded UI QA에도 theme sync 기준이 필요하다는 판단.
- not checked: Atlassian token reference 전체 목록, sample glitch project, package install, 실제 Trello runtime.
