---
type: llm-wiki-source
status: captured
title: "GitHub Copilot browser tools in VS Code generally available"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source: "https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/"
publisher: "GitHub"
collectionPurpose: "agent browser QA의 권한 경계, 격리 세션, domain allow/deny 관리, screenshot/console evidence 기준을 Dex Company frontend QA에 반영한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - frontend
  - browser-qa
  - accessibility
---

# GitHub Copilot browser tools in VS Code generally available

## Original Content

- 수집 시각: 2026-07-04 00:04 KST
- 자료 유형: 공식 changelog
- 핵심 내용 쉬운 설명: VS Code의 GitHub Copilot browser tools가 GA가 되었고, agent가 실제 브라우저에서 페이지 이동, 클릭, 입력, 콘솔 오류 확인, 스크린샷 캡처를 수행할 수 있습니다. 일반 사용자 탭은 기본적으로 비공개이고, agent가 연 탭은 별도 세션으로 격리됩니다.
- Dex Company 사용 예시: frontend QA 보고서에서 "브라우저 확인"이라고만 쓰지 말고 URL, 시나리오, 콘솔 오류, screenshot, 권한 승인 여부, 네트워크 domain 제한을 기록하는 기준으로 쓸 수 있습니다.
- source-backed: browser actions, console/screenshot, private tabs, isolated agent tabs, sensitive permission approval, enterprise domain controls는 GitHub changelog에 근거합니다.
- Dex inference: Dex Company frontend QA gate에 "agent browser 권한/격리 확인" 항목을 추가하는 것은 이 자료에서 유도한 운영 해석입니다.
- not checked: VS Code Copilot browser tools를 설치하거나 실행하지 않았고, Dex Company 프로젝트에서 실제 browser QA를 수행하지 않았습니다.

## WCAG / Accessibility Link

- 연결 기준: WCAG 2.2 자체는 이 GitHub 기능의 conformance를 증명하지 않습니다. 다만 agent browser가 콘솔 오류, screenshot, 상호작용 흐름을 확인할 수 있으므로 Dex Company frontend QA에서 keyboard access, focus visibility, error messages 같은 WCAG 2.2 관련 수동 점검의 증거 수집 방식으로 연결할 수 있습니다.

## Evidence Quality

- quality: medium
- 이유: 공식 GA 문서이지만 GitHub Copilot/VS Code 환경에 한정됩니다.
- 교차 검증: 기존 Storybook/Playwright/accessibility source note와 같은 방향의 runtime evidence 강화 신호입니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, sensitive information disclosure, insecure output handling.
- 운영 제한: agent에게 공유한 탭, clipboard, location, camera, mic, notification 권한을 사람이 통제해야 하며, enterprise domain allow/deny 정책이 필요합니다.
