---
type: llm-wiki-source
status: captured
title: "OpenAI API Deprecations - Agent Builder and Assistants API"
sourceKind: official-docs
sourceUrl: "https://developers.openai.com/api/docs/deprecations"
source:
  - "https://developers.openai.com/api/docs/deprecations"
  - "https://developers.openai.com/api/docs/guides/migrate-to-responses"
publisher: OpenAI
capturedAt: 2026-07-03T17:04:28+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "OpenAI API, Agents SDK, ChatKit, and Dex Company automation migration decisions need current official deprecation dates."
confidence: medium
claimType: historical
evidenceScope: official-docs
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - openai-api
  - ai-agents
  - automation
---

# OpenAI API Deprecations - Agent Builder and Assistants API

## Source Snapshot

- URL: https://developers.openai.com/api/docs/deprecations
- Cross-check: https://developers.openai.com/api/docs/guides/migrate-to-responses
- Publisher: OpenAI
- Captured for: Dex Company API migration and automation routing

## Key Notes

OpenAI의 현재 deprecations 문서는 Agent Builder와 Assistants API의 종료 일정을 Responses API, Conversations API, Agents SDK, ChatGPT Workspace Agents 쪽으로 이동하는 신호로 다룬다.

## Why It Matters

Dex Company에서 OpenAI 기반 에이전트 설계나 자동화를 만들 때, 오래된 Assistants/Agent Builder 중심 설계를 새로 확장하면 마이그레이션 부채가 생긴다. 새 설계는 Responses API, Agents SDK, ChatKit 또는 Workspace Agents 문서를 우선 확인해야 한다.

## Dex Company Use Example

- OpenAI API 자동화 설계 시 "Assistants API 기반으로 만들까요?"라는 질문이 나오면 기본값을 Responses API/Agents SDK 검토로 바꾼다.
- 기존 Agent Builder 자료가 나오면 2026-11-30 종료 일정 때문에 장기 운영 지식으로는 partial 또는 migration-needed로 표시한다.
- 기존 Assistants API 구현은 2026-08-26 종료 일정 전에 교체 후보로 분류한다.

## Verification

- source-backed: OpenAI 공식 deprecations 문서와 migrate-to-Responses 가이드를 확인했다.
- Dex inference: Dex Company의 신규 설계 기본값을 Responses API/Agents SDK로 두는 것은 공식 종료 일정에서 도출한 운영 판단이다.
- not checked: 실제 에던 프로젝트에 Assistants API 또는 Agent Builder 사용 코드가 남아 있는지는 이번 실행에서 검사하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, 종료 일정의 운영 의미, 교차 확인 경로만 보존한다.
