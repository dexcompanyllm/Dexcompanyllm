---
type: llm-wiki-source
status: active
title: "Microsoft Agent Framework Overview"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: descriptive
evidenceScope: source-backed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://learn.microsoft.com/en-us/agent-framework/overview/"
collectionPurpose: "Agent와 workflow를 구분하는 enterprise agent framework 기준을 덱스 컴퍼니 multi-agent/automation 설계 비교 자료로 보존한다."
tags:
  - llm-wiki/source
  - microsoft
  - ai-agents
  - workflows
  - mcp
---

# Microsoft Agent Framework Overview

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 Microsoft Learn의 Agent Framework overview를 확인했고, 이 note는 agent/workflow 구분, MCP/tool 통합, third-party risk 경고만 보존한다.

## Easy Explanation

Microsoft Agent Framework는 agent와 workflow를 구분한다. agent는 open-ended 또는 conversational task에 적합하고, workflow는 단계가 잘 정의된 multi-step process에 적합하다고 설명한다. 또한 third-party server, agent, code, non-Azure direct model 사용은 별도 책임과 검토가 필요하다고 경고한다.

## Dex Company Use

- 덱스 컴퍼니 자동화는 대부분 open-ended agent보다 명확한 workflow에 가깝다.
- Growth Scan은 수집, 중복 검사, 승격, 보고, lint처럼 단계가 정해져 있으므로 workflow checklists가 맞다.
- 외부 agent framework 설치는 이 note만으로 승인할 수 없고, dependency, cost, data boundary 검토가 필요하다.

## Evidence Quality

- medium: Microsoft 공식 문서지만 일부 Learn 페이지는 authorization notice가 함께 표시되어 접근 범위가 부분적이다.
- cross-check: Semantic Kernel Agent Framework, Microsoft MCP tools guide, 기존 OpenAI Agents SDK source note와 비교 후보로 쓴다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Agent Framework는 agent와 graph-based workflow를 모두 제공하며, tool/MCP integration과 third-party risk 경고를 포함한다.
- Dex inference: 덱스 컴퍼니에서는 "agent를 늘리는 것"보다 "workflow를 검증 가능하게 만드는 것"이 우선이다.
- not checked: Microsoft Agent Framework package 설치, sample 실행, license/dependency audit는 하지 않았다.

