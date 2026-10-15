---
type: llm-wiki-source
status: captured
title: "OpenAI agent improvement loop with traces, evals, and Codex"
sourceKind: official-cookbook
sourceUrl: "https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop"
source:
  - "https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop"
publisher: OpenAI
capturedAt: 2026-07-03T16:37:55+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "llm-wiki-growth-scan-report를 단순 요약이 아니라 trace, feedback, eval, Codex 변경 제안으로 이어지는 개선 루프의 입력물로 만들기 위해 사용한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-cookbook
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - agent-evals
  - codex
  - growth-scan
  - report-quality
---

# OpenAI agent improvement loop with traces, evals, and Codex

## Source Snapshot

- URL: https://developers.openai.com/cookbook/examples/agents_sdk/agent_improvement_loop
- Publisher: OpenAI

## Key Notes

OpenAI cookbook의 agent improvement loop는 실제 traces에서 시작해 feedback을 붙이고, 그 feedback을 eval로 바꾸고, Codex가 다음 harness 변경을 제안하도록 만드는 flywheel을 설명한다.

## Why It Matters

덱스 컴퍼니의 growth scan report도 같은 방향으로 개선할 수 있다. 보고서는 "오늘 찾은 자료"만 적는 문서가 아니라, 실패 패턴, 중복 패턴, 다음 eval, 프롬프트/템플릿 변경 제안을 남기는 trace가 되어야 한다.

## Dex Company Use Example

- 각 growth scan report에 `Improvement Delta`, `Failure Pattern`, `Next Eval`, `Prompt/Template Patch Candidate` 섹션을 둔다.
- 반복 실패가 2회 이상 나오면 자동화 프롬프트나 템플릿 보정 후보로 승격한다.

## Verification

- source-backed: OpenAI cookbook page
- not checked: notebook 실행, 실제 OpenAI eval run 생성

## Original Content

원문 전체를 복사하지 않고, 공식 cookbook URL과 growth scan report 개선에 필요한 적용 포인트만 보존한다.

