---
type: llm-wiki-source
status: active
layer: source
title: "Microsoft Semantic Kernel Agent Framework"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/"
publisher: Microsoft Learn
collectionPurpose: "agent를 단일 만능 실행자가 아니라 modular components, human input, workflow orchestration으로 보는 기준을 덱스 컴퍼니 agent 운영에 재사용하기 위해 수집"
tags:
  - llm-wiki/source
  - ai-agents
  - microsoft
  - semantic-kernel
---

# Microsoft Semantic Kernel Agent Framework

## Original Content

- 원문 URL: https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/
- 교차 확인 URL: https://learn.microsoft.com/en-us/agent-framework/migration-guide/from-semantic-kernel/
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터와 확인 범위만 보존합니다.
- 확인 범위: Semantic Kernel Agent Framework 개요, agent collaboration, human-agent collaboration, migration guide의 namespace/session/tool registration 변화 일부를 확인했습니다.

## Source-Backed Notes

- Semantic Kernel Agent Framework는 모델, 도구, human input, 사용자 정의 컴포넌트가 함께 메시지를 주고받는 agent 구성을 설명합니다.
- Microsoft 문서는 agent를 modular components, collaboration, human-agent collaboration, process orchestration 관점에서 설명합니다.
- Migration guide는 Microsoft Agent Framework 쪽으로 API 단순화, unified interface, session creation, tool registration 변화가 있음을 보여줍니다.

## Dex Company Use

- 덱스 컴퍼니의 역할형 운영은 agent를 "모든 것을 알아서 하는 단일 개체"가 아니라 역할별 module과 검증 가능한 workflow로 분리하는 쪽이 맞습니다.
- Growth Scan의 후보도 `source`, `workflow`, `install candidate`, `runtime tool`을 분리해 적어야 overreliance를 줄일 수 있습니다.

## Evidence Quality

- publisher: Microsoft Learn
- confidence: medium
- 이유: 공식 문서이지만 일부 migration page는 authorization notice가 함께 노출되어 전체 문서 범위는 partial입니다.

## Cross Verification

- 기존 `2026-07-03-microsoft-agent-framework-overview` source note와 상호 보완됩니다.
- OpenAI Agents SDK, Codex subagents, GitHub custom agents source note와 비교할 agent architecture 기준으로 사용할 수 있습니다.

## Risk / License / Install

- 설치 없음.
- 실제 Microsoft Agent Framework 또는 Semantic Kernel 패키지 설치는 project-specific dependency, credential, telemetry, data boundary 검토가 필요합니다.
- Azure/OpenAI credential 예시는 노트에 저장하지 않습니다.

## Claim Split

- source-backed: Microsoft 공식 문서의 agent framework 설명과 migration guide 일부.
- Dex inference: Dex Company role/workflow 분리에 적용할 수 있다는 판단.
- not checked: 실제 SDK 설치, sample 실행, Azure/Foundry credential 흐름, 최신 package compatibility.
