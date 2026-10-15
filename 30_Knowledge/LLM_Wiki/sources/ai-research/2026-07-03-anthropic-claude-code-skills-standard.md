---
type: llm-wiki-source
status: captured
title: "Anthropic Claude Code Skills and Agent Skills Standard"
sourceKind: official-docs
sourceUrl: "https://code.claude.com/docs/en/skills"
source:
  - "https://code.claude.com/docs/en/skills"
  - "https://docs.anthropic.com/en/docs/claude-code/sub-agents"
publisher: Anthropic
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company local skill 설계가 tool-agnostic instruction package로 발전할 수 있는지 참고하기 위해 보존하되, 기본 실행 모델은 Codex-only로 유지한다."
confidence: medium
claimType: mixed
evidenceScope: official-docs
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - skills
  - ai-agents
  - candidate-only
---

# Anthropic Claude Code Skills and Agent Skills Standard

## Source Snapshot

- URL: https://code.claude.com/docs/en/skills
- Cross-check: https://docs.anthropic.com/en/docs/claude-code/sub-agents
- Publisher: Anthropic
- Captured for: skill design reference only

## Key Notes

Anthropic 문서는 Claude Code skills가 Agent Skills open standard를 따른다고 설명하고, invocation control, subagent execution, dynamic context injection 같은 확장을 언급한다.

## Why It Matters

Dex Company의 기본 실행은 Codex-only다. 다만 skill package를 어떻게 작게 유지하고, 언제 동적으로 맥락을 넣고, 언제 subagent를 분리하는지에 대한 설계 참고로는 가치가 있다.

## Dex Company Use Example

- 외부 Claude runtime을 기본 흐름에 넣지 않는다.
- skill 후보를 만들 때 `SKILL.md`, scripts, references, assets 구조를 더 엄격히 본다.
- subagent는 큰 문제가 아니라 "분리하면 context/QA가 좋아지는 작업"에만 제한한다.

## Verification

- source-backed: Anthropic Claude Code skills docs와 subagents docs를 확인했다.
- Dex inference: Dex Company skill 설계 참고로 쓰되 Codex-only 실행 모델을 유지하는 부분은 에던님 운영 원칙과 공식 문서의 제한적 적용이다.
- not checked: Agent Skills open standard 전문과 실제 Claude Code runtime은 확인하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, skill 설계 참고점, Codex-only 경계만 보존한다.
