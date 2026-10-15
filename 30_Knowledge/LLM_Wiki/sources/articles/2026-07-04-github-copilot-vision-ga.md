---
type: llm-wiki-source
status: captured
title: "GitHub Copilot Vision generally available"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: official-docs-cross-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source:
  - "https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview"
  - "https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate"
publisher: "GitHub"
collectionPurpose: "이미지와 PDF를 AI 코딩/리뷰 맥락에 넣는 기능이 일반 제공으로 바뀐 신호를 덱스 컴퍼니의 화면 QA, PDF 검토, PR 리뷰 운영 기준에 반영한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - vision
  - frontend
  - qa
  - career-ops
---

# GitHub Copilot Vision generally available

## Original Content

- 수집 시각: 2026-07-04 06:34 KST
- 자료 유형: 공식 changelog 및 GitHub Docs 교차 확인
- 핵심 내용 쉬운 설명: GitHub는 2026-07-01 Copilot Vision을 일반 제공으로 발표했다. Copilot Chat에 이미지와 PDF를 붙여 코드 맥락과 함께 해석하게 할 수 있으며, GitHub.com, VS Code, Copilot CLI 등 여러 표면에서 동작한다고 설명한다.
- Dex Company 사용 예시: 화면 QA에서 스크린샷을 곧바로 분석시키거나, 이력서/포트폴리오 PDF를 검토하거나, PR 이슈 본문에 디자인 스케치 이미지를 붙여 구현 계획을 세우는 흐름을 설계할 때 참고할 수 있다.
- source-backed: GitHub changelog는 이미지와 PDF 첨부, 지원 표면, 모든 Copilot plan 제공을 명시한다. Copilot CLI 문서는 이미지/PDF 첨부 방식과 지원 확장자를 별도로 설명한다. Copilot cloud agent 문서는 task description에 스크린샷, 스케치, 디자인 이미지를 넣을 수 있다고 설명한다.
- Dex inference: 덱스 컴퍼니에서는 이 기능을 "문서/이미지 입력이 가능하다"는 기능 신호로만 흡수하고, 실제 판단 품질은 별도 QA와 원문 확인으로 보강해야 한다.
- not checked: 에던님의 GitHub 계정, Copilot plan, 조직 정책, VS Code/CLI 버전, 실제 이미지/PDF 첨부 동작은 확인하지 않았다.

## Evidence Quality

- quality: medium
- 근거: primary source가 GitHub 공식 changelog이고, GitHub Docs의 Copilot CLI 및 cloud agent 문서로 교차 확인했다.
- 한계: 검색 결과에는 예전 preview 상태를 언급한 community discussion도 남아 있어, 실제 사용자 환경에서는 plan, client, staged rollout, 조직 정책을 별도로 확인해야 한다.

## WCAG / Accessibility Link

- 직접 연결: Copilot Vision 자체가 WCAG 2.2 준수를 증명하지는 않는다.
- 실무 QA 연결: 화면 스크린샷을 분석할 수 있더라도 WCAG 2.2의 keyboard access, focus visible, contrast, labels/name-role-value, error identification 기준은 사람이 확인하거나 브라우저/axe/Playwright 검증과 함께 확인해야 한다.
- 운영 기준: 이미지 기반 분석 결과는 보조 증거로만 쓰고, 최종 접근성 판단에는 재현 가능한 브라우저 QA와 소스/DOM 검사를 남긴다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: sensitive information disclosure, overreliance, insecure output handling, prompt injection via image/PDF content.
- 보안 주의: 스크린샷과 PDF에는 개인정보, 토큰, 고객 데이터, 내부 문서가 포함될 수 있다. 업로드 전 민감정보 제거, 조직 정책 확인, 첨부 파일 보존 범위 확인이 필요하다.
- 라이선스/권한: GitHub Copilot plan 및 조직 정책에 따라 사용 가능성이 달라질 수 있다.

## Dex Company Operating Takeaway

- 화면 QA: 스크린샷 입력이 가능하더라도 "봤다"와 "검증했다"를 분리한다.
- Career Ops: 이력서/PDF 검토에는 편리하지만, 개인정보와 제출처 약관을 먼저 확인한다.
- PR 리뷰: 디자인 이미지/스케치를 첨부한 이슈 기반 planning은 유용하지만, 구현 결정은 repo 권한, human review, diff 검토와 연결한다.
