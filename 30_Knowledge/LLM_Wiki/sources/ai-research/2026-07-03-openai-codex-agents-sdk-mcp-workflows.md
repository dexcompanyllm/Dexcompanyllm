---
type: llm-wiki-source
status: active
title: "OpenAI Codex with Agents SDK MCP Workflows"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: source-backed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://developers.openai.com/codex/guides/agents-sdk"
collectionPurpose: "Codex를 MCP server로 노출해 multi-agent workflow를 구성하는 공식 패턴을 덱스 컴퍼니 장기 후보로 보존하되, 실행 설치와 비밀값 저장은 분리한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - agents-sdk
  - mcp
---

# OpenAI Codex with Agents SDK MCP Workflows

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 OpenAI Developers의 Codex Agents SDK guide를 확인했고, 이 note는 Codex MCP server, multi-agent workflow, 설치 전제 조건의 요약만 보존한다.

## Easy Explanation

이 문서는 Codex CLI를 MCP server로 실행하고 OpenAI Agents SDK에서 호출하는 흐름을 보여준다. Codex MCP server는 새 Codex 세션을 시작하는 도구와 기존 thread를 이어가는 도구를 제공한다. 예시는 multi-agent handoff와 trace review를 포함하지만, 로컬 CLI, Python, Node, API key가 필요하다.

## Dex Company Use

- 덱스 컴퍼니의 10x scan을 병렬화할 때 장기 후보가 될 수 있다.
- 실제 적용 전에는 host, 승인 정책, sandbox, secret 처리, trace 저장 위치를 먼저 정해야 한다.
- 자동화가 비밀값을 파일에 쓰지 않도록 `.env.example`과 실제 `.env`를 분리해야 한다.

## Evidence Quality

- high: OpenAI 공식 문서다.
- cross-check: 기존 Codex MCP source note, Codex subagents source note, MCP 보안 source note와 교차 확인했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex CLI를 MCP server로 실행하고 Agents SDK에서 사용하는 공식 가이드가 있다.
- Dex inference: 덱스 컴퍼니 자동화 병렬화는 이 패턴을 참고할 수 있지만 바로 적용하면 권한과 비용 리스크가 커진다.
- not checked: 이번 실행에서 `codex mcp-server`, Agents SDK 설치, API key 설정, e2e workflow는 실행하지 않았다.

