---
type: llm-wiki-source
status: active
layer: source
title: "GitHub Copilot Agent Mode with MCP Tutorial"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://docs.github.com/en/copilot/tutorials/enhance-agent-mode-with-mcp"
publisher: GitHub Docs
collectionPurpose: "MCP를 agent mode에 붙일 때 목표, 경계, 권한, 보안 확인을 어떻게 나눠야 하는지 덱스 컴퍼니 운영 기준으로 재사용하기 위해 수집"
tags:
  - llm-wiki/source
  - ai-agents
  - mcp
  - github
  - security
---

# GitHub Copilot Agent Mode with MCP Tutorial

## Original Content

- 원문 URL: https://docs.github.com/en/copilot/tutorials/enhance-agent-mode-with-mcp
- 수집 시각: 2026-07-03 20:33 KST
- 보존 방식: 원문 전체 복사 없이 메타데이터, 확인 범위, 짧은 지정 요약만 보존합니다.
- 확인 범위: GitHub Docs의 MCP agent mode tutorial 본문 중 prompt boundary, MCP server use, security considerations, accessibility compliance example을 확인했습니다.

## Source-Backed Notes

- GitHub 문서는 agent mode와 MCP를 함께 쓸 때 목표를 구체화하고, 컨텍스트를 제공하고, 작업 경계를 지정하고, 큰 변경 전 확인을 요청하라고 안내합니다.
- MCP 서버는 워크플로우에 맞는 서버만 고르고, 단순한 구성부터 시작하며, agent 작업 전에 연결성을 테스트해야 합니다.
- 보안 고려사항으로 OAuth 선호, 최소 권한, 연결 감사, 활동 모니터링, secret leak 방지가 제시됩니다.
- 문서 예시는 accessibility compliance를 MCP 기반 agent workflow로 연구, 계획, 구현, 검증 단계로 나누는 흐름을 보여줍니다.

## Dex Company Use

- 덱스 컴퍼니의 MCP 후보는 "설치 가능"이 아니라 "목표/도구/권한/확인 지점이 분리된 작업 흐름"으로 검토해야 합니다.
- 자동화나 subagent를 쓸 때 prompt에는 `목표`, `허용 도구`, `금지 작업`, `중요 변경 전 확인`, `검증 명령`을 분리해서 적는 것이 좋습니다.

## Evidence Quality

- publisher: GitHub official docs
- confidence: medium
- 이유: 공식 문서이지만 Copilot 전용 튜토리얼이므로 Codex에 직접 적용할 때는 Dex inference가 필요합니다.

## Cross Verification

- 기존 LLM Wiki의 GitHub Copilot MCP, repository MCP config, custom agents configuration source note와 같은 방향입니다.
- OWASP LLM Top 10 기준으로는 excessive agency, sensitive information disclosure, insecure plugin design 리스크를 줄이는 근거로 쓸 수 있습니다.

## Risk / License / Install

- 설치 없음.
- MCP 서버 추가는 별도 승인과 project-specific 권한 검토가 필요합니다.
- secret, token, OAuth scope는 노트에 저장하지 않습니다.

## Claim Split

- source-backed: GitHub Docs가 제시한 MCP agent mode 운영 및 보안 기준.
- Dex inference: Codex/Dex Company에서도 같은 MCP 경계 원칙을 적용해야 한다는 판단.
- not checked: 실제 Copilot MCP 서버 구성, OAuth 흐름, 접근 권한, GitHub enterprise policy.
