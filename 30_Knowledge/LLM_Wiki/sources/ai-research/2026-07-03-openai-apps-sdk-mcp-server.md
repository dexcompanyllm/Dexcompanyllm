---
type: llm-wiki-source
status: captured
title: "OpenAI Apps SDK MCP server concept"
sourceKind: official-doc
sourceUrl: "https://developers.openai.com/apps-sdk/concepts/mcp-server"
source:
  - "https://developers.openai.com/apps-sdk/concepts/mcp-server"
publisher: OpenAI
capturedAt: 2026-07-03T16:19:28+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "ChatGPT Apps SDK와 MCP 서버가 덱스 컴퍼니 도구/인터페이스 확장에 어떤 의미를 갖는지 공식 기준으로 보존한다."
confidence: medium
claimType: descriptive
evidenceScope: official-doc
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - openai
  - apps-sdk
  - mcp
  - ai-agents
---

# OpenAI Apps SDK MCP server concept

## Source Snapshot

- URL: https://developers.openai.com/apps-sdk/concepts/mcp-server
- Publisher: OpenAI
- Related local sources: [[2026-07-03-openai-agents-sdk-docs]], [[2026-07-03-openai-api-changelog-responses-migration]]

## Key Notes

OpenAI Apps SDK 문서는 MCP server를 ChatGPT 앱/도구와 연결되는 핵심 개념으로 설명한다. MCP server는 모델이 호출할 수 있는 tools와 resources를 노출하고, Apps SDK에서는 결과와 함께 인터페이스를 렌더링하는 흐름까지 연결된다.

## Why It Matters

덱스 컴퍼니가 나중에 Obsidian/LLM Wiki, career ops, design review, QA dashboard를 ChatGPT 또는 Codex UI 안에서 interactive tool로 제공하려면 MCP server와 Apps SDK 개념을 분리해서 이해해야 한다.

## Dex Company Use Example

- LLM Wiki query를 단순 파일 검색이 아니라 MCP tool로 노출하는 후보를 검토한다.
- design review 결과를 inline UI로 보여주는 Apps SDK형 도구를 장기 후보로 둔다.
- 실행 코드 설치 전에는 MCP 보안 source와 함께 승인 게이트를 둔다.

## Verification

- source-backed: OpenAI 공식 Apps SDK 문서
- cross-check: MCP security best practices source와 함께 검토 필요
- not checked: 실제 Apps SDK server 구현 또는 배포

## Original Content

원문 전체를 복사하지 않고, 공식 문서 URL과 덱스 컴퍼니 적용 포인트만 보존한다.

