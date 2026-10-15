---
type: llm-wiki-source
status: captured
title: "Anthropic - Building Effective Agents"
sourceKind: official-engineering-blog
sourceUrl: "https://www.anthropic.com/engineering/building-effective-agents"
source:
  - "https://www.anthropic.com/engineering/building-effective-agents"
publisher: Anthropic
capturedAt: 2026-07-03T17:27:12+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company의 역할형 에이전트 운영을 복잡한 프레임워크보다 단순하고 검증 가능한 workflow/agent 패턴으로 설계하기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-blog
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ai-agents
  - automation
  - workflow
  - architecture
---

# Anthropic - Building Effective Agents

## Source Snapshot

- URL: https://www.anthropic.com/engineering/building-effective-agents
- Publisher: Anthropic
- Published: 2024-12-19
- Captured for: Dex Company agent/workflow design, role routing, complexity control

## Key Notes

Anthropic 글은 agentic system을 workflows와 agents로 나누고, 가능한 가장 단순한 해법부터 시작하라고 권한다. routing, parallelization, orchestrator-workers, evaluator-optimizer 같은 패턴을 설명하며, autonomy가 커질수록 비용, 지연, 오류 누적 위험과 guardrail 필요성이 커진다고 본다.

## Why It Matters

Dex Company는 역할형 운영체계이기 때문에 모든 문제를 "큰 자율 에이전트"로 풀려는 유혹이 생길 수 있다. 이 자료는 역할 라우팅, QA, 검증, 사용자 승인 지점을 단순한 workflow로 먼저 만들고, 필요할 때만 autonomy를 높이는 기준이 된다.

## Dex Company Use Example

- 반복되는 성장 스캔은 full autonomous agent가 아니라 predefined workflow로 유지한다.
- 보류 후보 판단, security gate, lint 실패 수리는 evaluator-optimizer 패턴으로 다룬다.
- 여러 분야 자료를 병렬로 모으되, 최종 저장 판단은 evidence table과 QA scorecard로 합친다.

## Security and Complexity Gate

- framework나 agent SDK를 추가하기 전에 "단일 LLM call + retrieval + in-context examples"로 충분한지 확인한다.
- autonomous agent가 필요한 경우 stopping condition, sandbox, human checkpoint, tool documentation을 먼저 둔다.

## Verification

- source-backed: Anthropic 공식 engineering blog를 확인했다.
- Dex inference: Dex Company 역할 라우팅과 성장 스캔에 적용한 운영 원칙은 글의 agent/workflow 구분을 내부 운영으로 해석한 것이다.
- not checked: Anthropic cookbook sample implementations, PDF/resource 전문, 최신 Anthropic API 변화.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, 주요 패턴, Dex Company 적용 포인트만 보존한다.
