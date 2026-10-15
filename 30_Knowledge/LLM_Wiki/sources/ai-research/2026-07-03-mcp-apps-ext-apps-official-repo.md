---
type: llm-wiki-source
status: captured
title: "MCP Apps ext-apps Official Repository"
sourceKind: github-repository
sourceUrl: "https://github.com/modelcontextprotocol/ext-apps/"
source:
  - "https://github.com/modelcontextprotocol/ext-apps/"
  - "https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx"
publisher: Model Context Protocol
capturedAt: 2026-07-03T17:04:28+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "MCP Apps may affect future Dex Company interactive tools, but executable skills and servers must remain installation candidates until Ethan approves."
confidence: medium
claimType: mixed
evidenceScope: official-repo
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - mcp
  - ai-agents
  - skill-candidate
  - automation
---

# MCP Apps ext-apps Official Repository

## Source Snapshot

- URL: https://github.com/modelcontextprotocol/ext-apps/
- Specification URL: https://github.com/modelcontextprotocol/ext-apps/blob/main/specification/2026-01-26/apps.mdx
- Publisher: Model Context Protocol
- License signal: repository shows an open license link; exact license text was not fully reviewed in this run.
- Captured for: future interactive MCP UI and skill-candidate review

## Key Notes

MCP Apps는 MCP 서버가 대화형 UI 리소스를 제공하고, 호스트가 이를 sandboxed iframe 등으로 렌더링하는 패턴을 제시한다. 저장소에는 SDK, examples, specification, agent skill 안내가 포함되어 있다.

## Why It Matters

Dex Company가 단순 텍스트 보고서보다 인터랙티브 대시보드, 폼, 디자인 캔버스, QA 화면을 Codex 안에서 쓰려면 MCP Apps가 장기 후보가 될 수 있다. 다만 이 저장소는 실행 코드와 설치 가능한 skills/server examples를 포함하므로 자동 설치 대상이 아니다.

## Dex Company Use Example

- "LLM Wiki source explorer"나 "growth scan review board"를 만들 때 MCP Apps를 참고 후보로 둔다.
- 외부 skill 설치가 필요하면 `ROLE_SKILL_INSTALL_AUDIT.md`에 README, license, scripts, package files, permissions, supply-chain risk를 먼저 기록한다.
- MCP Apps를 지금 바로 설치하지 않고, 공식 spec/source note로만 보존한다.

## Verification

- source-backed: 공식 GitHub repository, specification 폴더, README, release/license/security 링크의 존재를 확인했다.
- Dex inference: Dex Company interactive dashboard 후보라는 판단은 MCP Apps의 UI 리소스 목적을 운영 흐름에 적용한 것이다.
- not checked: npm package source, examples 실행, exact license text, security policy 전문, 설치 스크립트는 아직 검토하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 repository URL, specification URL, 설치 후보 판단, 미검토 리스크만 보존한다.
