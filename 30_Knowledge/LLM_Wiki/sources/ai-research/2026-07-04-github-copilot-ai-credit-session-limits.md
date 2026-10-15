---
type: llm-wiki-source
status: captured
title: "GitHub Copilot AI credit session limits"
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
source: "https://github.blog/changelog/2026-07-01-set-ai-credit-session-limits-in-copilot-cli-and-sdk/"
publisher: "GitHub"
collectionPurpose: "무인 자동화와 agent SDK 실행에서 비용/작업량 한도를 세션 단위로 제한하는 운영 패턴을 Dex Company 자동화 기준에 반영한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - automation
  - cost-control
---

# GitHub Copilot AI credit session limits

## Original Content

- 수집 시각: 2026-07-04 00:04 KST
- 자료 유형: 공식 changelog
- 핵심 내용 쉬운 설명: Copilot CLI와 GitHub Copilot SDK에서 세션별 AI credit 한도를 설정해 agent가 무제한으로 비용을 쓰지 않게 하는 public preview 기능입니다. 한도에 도달하면 현재 응답은 마친 뒤 agent가 정리하고 종료합니다.
- Dex Company 사용 예시: 30분 자동화나 비동기 agent 작업에는 "목표", "파일 변경 범위", "토큰/비용/시간 예산", "중단 시 정리 규칙"을 함께 기록해야 한다는 근거로 쓸 수 있습니다.
- source-backed: `/limits`, `--max-ai-credits`, public preview 범위, 지원 CLI/SDK 버전은 GitHub changelog에 근거합니다.
- Dex inference: Dex Company의 자동화 보고서 Metrics에 비용/예산 필드를 추가하는 후보는 이 자료에서 유도한 운영 해석입니다.
- not checked: Copilot CLI 1.0.66+, SDK 1.0.5+, 실제 credit 사용량 측정, 개인/Business/Enterprise 계정 적용 여부는 확인하지 않았습니다.

## Evidence Quality

- quality: medium
- 이유: 공식 changelog이지만 public preview이고 GitHub Copilot 제품군에 한정됩니다.
- 교차 검증: Dex Company automation memory의 30분 반복 실행 과잉 저장 방지 원칙과 방향이 맞습니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, excessive agency.
- 운영 제한: session limit는 soft cap이므로 실제 사용량이 약간 초과될 수 있습니다. 전체 예산과 사용자 승인 절차를 대체하지 않습니다.
