---
type: llm-wiki-source
status: active
title: "OpenAI Codex Automations"
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
source: "https://developers.openai.com/codex/app/automations"
collectionPurpose: "Dex Company Growth Scan 자동화가 recurring task, inbox result, project availability, skills 조합을 어떻게 다뤄야 하는지 공식 기준을 저장한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - automations
---

# OpenAI Codex Automations

## Original Content

원문 전체를 복사하지 않는다. OpenAI Developers Codex app automations 문서 URL과 Dex Company 자동화 적용 범위만 보존한다.

## Easy Explanation

Codex automations는 반복 작업을 배경에서 실행하고 결과를 inbox에 남기는 기능이다. 로컬 프로젝트 자동화는 Codex 앱, 머신 전원, 프로젝트 경로 같은 실행 조건에 영향을 받는다.

## Dex Company Use

- Growth Scan이 결과를 inbox/report/source로 남겨야 하는 이유를 공식 기능 모델과 연결한다.
- 자동화가 안 돌았을 때 전원, 앱 실행, 프로젝트 경로를 먼저 확인한다.
- skills와 automations를 함께 쓸 때 설치 후보와 지식 흡수를 분리한다.

## Evidence Quality

- high: OpenAI 공식 Codex app automation 문서.
- cross-check: Codex best practices와 현재 자동화 memory/report 구조로 확인 가능.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex automations가 recurring task를 실행하고 inbox에 findings를 남기는 기능이라는 점.
- Dex inference: Dex Company Growth Scan memory/report 구조에 적용하는 판단.
- not checked: 현재 자동화 스케줄 DB 상태는 이번 source note에서 확인하지 않았다.
