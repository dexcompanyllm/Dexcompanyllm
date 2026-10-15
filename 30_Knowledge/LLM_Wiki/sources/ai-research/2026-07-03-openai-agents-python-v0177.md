---
type: llm-wiki-source
status: captured
title: "OpenAI Agents SDK Python v0.17.7 release"
sourceKind: github-release
sourceUrl: "https://github.com/openai/openai-agents-python/releases/tag/v0.17.7"
source:
  - "https://github.com/openai/openai-agents-python/releases/tag/v0.17.7"
  - "https://github.com/openai/openai-agents-python/releases.atom"
publisher: OpenAI GitHub
capturedAt: 2026-07-03T15:52:53+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Agents SDK 최신 변경사항 중 덱스 컴퍼니 자동화 안정성, 세션 원자성, guardrail/task 취소, tool streaming에 영향을 줄 수 있는 항목을 추적한다."
confidence: medium
claimType: descriptive
evidenceScope: github-release-rss
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - openai-agents-sdk
  - github-release
  - ai-agents
---

# OpenAI Agents SDK Python v0.17.7 release

## Source Snapshot

- URL: https://github.com/openai/openai-agents-python/releases/tag/v0.17.7
- RSS: https://github.com/openai/openai-agents-python/releases.atom
- 확인된 최신 릴리스: v0.17.7, 2026-06-24T05:15:03Z

## Key Notes

릴리스에는 websocket max_size 설정, Chat Completions tool-call streaming, sandbox buffering, SQLite session atomicity, guardrail task cancellation, duplicated MCP server tool name 힌트 등 런타임 안정성과 디버깅에 직접 연결되는 변경이 포함되어 있다.

## Why It Matters

덱스 컴퍼니가 장기 자동화나 멀티 에이전트 워크플로우를 실험할 때, 세션 저장 원자성, tool streaming, guardrail cancellation은 "작업이 조용히 꼬이는 문제"를 줄이는 데 중요하다.

## Dex Company Use Example

- 성장 스캔 자동화가 후보별로 병렬 검토를 수행한다면 tool-call streaming과 guardrail task 처리 방식을 참고한다.
- LLM Wiki 저장을 agent session으로 감싼다면 AdvancedSQLiteSession 관련 수정 사항을 확인한다.

## Verification

- source-backed: GitHub 릴리스 페이지와 RSS feed에서 확인
- cross-check: OpenAI Agents SDK 공식 문서
- not checked: 패키지 설치 및 회귀 테스트

## Original Content

원문 전체를 복사하지 않고, 릴리스 페이지와 RSS에서 확인한 메타데이터를 보존한다. v0.17.7은 2026-06-24에 공개됐고, tool-call streaming, sandbox buffering, SQLite session atomicity, guardrail task cancellation 관련 변경을 포함한다.
