---
type: llm-wiki-source
status: active
title: "OpenAI Codex Subagents"
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
source: "https://developers.openai.com/codex/subagents"
collectionPurpose: "10배 성장 스캔처럼 병렬 탐색이 유리한 작업에서 Codex subagents를 언제 후보로 볼지 공식 기준을 저장한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - subagents
  - automation
---

# OpenAI Codex Subagents

## Original Content

원문 전체를 복사하지 않는다. OpenAI Developers Codex subagents 문서 URL과 Dex Company 적용 범위만 보존한다.

## Easy Explanation

Subagents는 여러 전문 agent를 병렬로 실행하고 결과를 모으는 방식이다. 10배 스캔처럼 검색 lane이 많은 작업에서 쓸 수 있지만, 최종 저장과 설치 판단은 한 번 더 합쳐 검증해야 한다.

## Dex Company Use

- 10배 큐를 90-120개까지 확장할 때 분야별 subagent 후보로 본다.
- design systems, OpenAI/Codex, MCP/security, frontend, UX research를 병렬 lane으로 나눌 수 있다.
- 최종 보고서에는 subagent 산출물을 source-backed, Dex inference, not checked로 다시 분류한다.

## Evidence Quality

- high: OpenAI 공식 Codex subagents 문서.
- cross-check: Codex best practices, automations, Goal mode 문서와 함께 적용 가능.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex가 subagent workflows를 통해 병렬 전문 agent 결과를 모을 수 있다는 점.
- Dex inference: Growth Scan 10x lane 병렬화에 활용하는 판단.
- not checked: 이번 실행에서 실제 subagent를 spawn하지는 않았다.
