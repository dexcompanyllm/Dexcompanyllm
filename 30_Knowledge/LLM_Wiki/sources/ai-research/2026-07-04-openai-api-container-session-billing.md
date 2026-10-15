---
type: llm-wiki-source
status: active
title: "OpenAI API Container Session Per-Minute Billing"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: source-backed
evidenceScope: official-changelog
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source: "https://developers.openai.com/api/docs/changelog"
collectionPurpose: "자동화와 agent runtime 비용/세션 예산 기록 기준을 보강하기 위한 OpenAI API 공식 변경 신호"
tags:
  - llm-wiki/source
  - openai
  - api
  - cost-control
---

# OpenAI API Container Session Per-Minute Billing

## Original Content

- Source title: Changelog | OpenAI API
- URL: https://developers.openai.com/api/docs/changelog
- Publisher: OpenAI Developers
- Collected at: 2026-07-04 KST
- Preserved excerpt: "eligible container sessions will be billed per minute with a 5-minute minimum"
- Confirmation scope: Checked the official API changelog entry that says eligible container sessions move from a full 20-minute session charge to per-minute billing with a 5-minute minimum starting 2026-06-02.

## Easy Summary

OpenAI API의 일부 container session 비용 구조가 더 짧은 세션에 맞게 바뀌었다. 덱스 컴퍼니에서는 "툴을 실행할 수 있다"와 "비용/세션 예산을 기록했다"를 분리해야 한다.

## Dex Company Use

- 코드 실행, hosted shell, container, agent runtime 자료를 저장할 때 `billing.unit`, `minimum.charge`, `session.timeout`, `budget.owner`, `cost.checked_at`을 기록한다.
- 자동화가 긴 조사나 코드 실행을 제안할 때는 실제 비용 표를 확인하기 전까지 비용 절감으로 단정하지 않는다.
- 보고서 Metrics에 `runtime.cost_checked` 또는 `not checked`를 명시한다.

## Evidence Quality

- High: OpenAI 공식 API changelog다.
- Cross-check: 기존 GitHub Copilot AI credit/billing notes와 함께 agentic 작업의 비용 소유자 분리 원칙을 강화한다.
- Not checked: 현재 OpenAI 가격표 전체, 에던님 계정의 조직/프로젝트 가격, 실제 container session 과금 내역은 확인하지 않았다.

## Risk / Security

- 문서 흡수만 했고 API 호출, container, shell, token, billing API는 실행하지 않았다.
- 비용 문서는 자주 바뀌므로 실제 실행 전 최신 pricing docs를 다시 확인해야 한다.

## Source Classification

- source-backed: OpenAI API changelog의 container session billing change.
- Dex inference: Growth Scan template의 비용/세션 필드 후보.
- not checked: live account billing, actual metered usage, current pricing table beyond changelog.
