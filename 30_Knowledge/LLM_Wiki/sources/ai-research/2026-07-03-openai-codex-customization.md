---
type: llm-wiki-source
status: active
title: "OpenAI Codex Customization Concepts"
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
source: "https://developers.openai.com/codex/concepts/customization"
collectionPurpose: "Dex Company에서 AGENTS.md, skills, MCP, subagents를 같은 층위로 섞지 않고 역할별 운영 규칙으로 분리하기 위한 공식 Codex customization 근거를 보존한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - customization
  - dex-company
---

# OpenAI Codex Customization Concepts

## Original Content

원문 전체는 복사하지 않는다. 2026-07-03 20:00 KST 기준 OpenAI Developers의 Codex customization 문서에서 제목, URL, 확인 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Codex customization은 Codex가 팀의 방식대로 일하도록 만드는 여러 층의 조합이다. 공식 문서는 project guidance, skills, MCP, subagents를 함께 다루며, Dex Company 관점에서는 이 네 요소를 한 프롬프트에 몰아넣기보다 역할 라우팅, 반복 workflow, 외부 도구 권한, 병렬 실행 단위로 나누는 근거가 된다.

## Dex Company Use

- `AGENTS.md`는 프로젝트와 Vault의 장기 운영 규칙으로 둔다.
- 반복 가능한 절차는 skill 후보로 분리하되, 실행 코드 설치는 Ethan 승인 전까지 하지 않는다.
- MCP는 권한과 도구 경계가 필요한 경우에만 검토한다.
- subagents는 대량 성장 스캔 같은 병렬 조사 후보로 보되, 결과 병합과 출처 검증 책임은 Dex가 유지한다.

## Evidence Quality

- high: OpenAI 공식 Codex 문서다.
- cross-check: 기존 Codex prompting, agent skills, MCP, automations, subagents source note와 개념이 일관된다.

## Security / Install Risk

- 문서형 자료라 저장은 가능하다.
- MCP, skill, subagent를 실제 프로젝트에 적용할 때는 OWASP LLM 기준의 supply chain, excessive agency, sensitive information disclosure, prompt injection 검토가 필요하다.
- 이번 실행에서는 설치나 설정 변경을 하지 않았다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex customization은 project guidance, skills, MCP, subagents 같은 층으로 구성된다.
- Dex inference: Dex Company에서는 이 층들을 역할 라우팅과 QA 기록으로 분리해 관리하는 편이 안전하다.
- not checked: 현재 로컬 Codex Desktop에서 해당 문서의 모든 기능 조합을 런타임 테스트하지 않았다.

