---
type: llm-wiki-source
status: captured
title: "Playwright release notes as web testing source"
sourceKind: official-doc
sourceUrl: "https://playwright.dev/docs/release-notes"
source:
  - "https://playwright.dev/docs/release-notes"
  - "https://github.com/microsoft/playwright/releases.atom"
publisher: Microsoft Playwright
capturedAt: 2026-07-03T16:19:28+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-09
collectionPurpose: "덱스 컴퍼니의 프론트엔드/브라우저 QA에서 Playwright 기능 변화와 테스트 전략을 공식 출처로 추적한다."
confidence: medium
claimType: descriptive
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - frontend
  - qa
  - playwright
  - automation
---

# Playwright release notes as web testing source

## Source Snapshot

- Release notes: https://playwright.dev/docs/release-notes
- GitHub releases RSS: https://github.com/microsoft/playwright/releases.atom

## Key Notes

Playwright release notes는 브라우저 테스트와 자동화의 최신 기능을 확인하는 기준점이다. 이번 테스트에서 GitHub releases RSS도 HTTP 200/feed 구조로 확인됐다.

## 2026-07-09 Currentness Update

- source-backed: Playwright official release notes now show Version 1.61 as the current docs section, with WebAuthn passkey test support, direct local/session storage APIs, video retention modes aligned with trace modes, Ubuntu 26.04 support, and HAR/trace WebSocket coverage.
- source-backed: Version 1.60 added first-class HAR tracing, `locator.drop()` for drag-and-drop/file upload zones, page-level ARIA snapshots, ARIA snapshot bounding boxes for AI consumption, accessible-description role matching, and richer error context.
- cross-check: GitHub `microsoft/playwright` releases list shows v1.61.1 as latest and v1.60.0 release details including the Drop API. Some GitHub release page sections showed loading errors, so the Playwright docs page remains the primary source.
- Dex inference: frontend QA templates should treat upload/drop zones, passkey login flows, local/session storage state, WebSocket-backed UI, full-page accessibility snapshots, and flaky-failure video retention as explicit evidence candidates.

## Why It Matters

덱스가 웹앱이나 UI 도구를 만들 때 "브라우저에서 확인했다"는 말만으로는 부족하다. Playwright의 최신 기능, 브라우저 런타임 변화, trace/screenshot/video 정책을 알고 QA를 설계해야 한다.

## Dex Company Use Example

- UI 구현 후 desktop/mobile screenshot, interaction test, console error check를 Playwright로 고정한다.
- 새 Playwright 기능이 테스트 안정성을 높이면 프로젝트 템플릿에 반영한다.
- 파일 업로드, drag-and-drop, passkey login, storage-dependent onboarding, WebSocket status UI, 전체 accessibility tree regression, flaky UI failure는 각각 `locator.drop`, credentials/storage APIs, HAR/WebSocket trace, ARIA snapshot, video retention evidence로 분리한다.

## Verification

- source-backed: Playwright official release notes
- cross-check: GitHub releases page and earlier RSS source
- not checked: 현재 workspace Playwright 버전, 프로젝트별 dependency upgrade, 실제 Playwright test 실행

## Original Content

원문 전체를 복사하지 않고, 공식 release notes와 GitHub release/RSS URL, 덱스 컴퍼니 QA 적용 포인트만 보존한다. 2026-07-09에는 Version 1.60/1.61에서 확인한 passkey, storage, HAR/WebSocket, drag-and-drop, ARIA snapshot, video retention evidence 항목만 추가했다.
