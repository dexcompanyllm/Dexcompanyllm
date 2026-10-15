---
type: llm-wiki-source
status: active
title: "OpenAI Codex Model Context Protocol"
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
source: "https://developers.openai.com/codex/mcp"
collectionPurpose: "Dex Company에서 MCP 서버, MCP Apps, skills를 설치하거나 연결할 때 Codex 공식 MCP 경계를 기준으로 판단한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - mcp
  - security
---

# OpenAI Codex Model Context Protocol

## Original Content

원문 전체를 복사하지 않는다. OpenAI Developers Codex MCP 문서 URL, 핵심 운영 의미, Dex Company 적용 범위만 보존한다.

## Easy Explanation

Codex에서 MCP는 외부 tool, resource, prompt를 연결하는 방식이다. 강한 능력을 연결하는 만큼, 각 MCP 서버의 instruction, tool scope, rate limit, trust boundary를 분리해 봐야 한다.

## Dex Company Use

- MCP Apps SDK-only 조건부 설치 판단의 공식 OpenAI 쪽 근거로 쓴다.
- MCP 서버 후보를 source note와 install audit로 분리한다.
- MCP 서버 instruction 첫 부분에 핵심 제약을 넣는 기준으로 활용한다.

## Evidence Quality

- high: OpenAI 공식 Codex MCP 문서.
- cross-check: GitHub MCP docs, MCP Apps docs, MCP security source와 교차 검증 가능.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex에서 MCP가 tool/resource/prompt 연결 경계라는 점.
- Dex inference: MCP Apps 설치 게이트와 연결하는 운영 판단.
- not checked: 실제 Codex MCP server 실행은 이번 source note에서 수행하지 않았다.
