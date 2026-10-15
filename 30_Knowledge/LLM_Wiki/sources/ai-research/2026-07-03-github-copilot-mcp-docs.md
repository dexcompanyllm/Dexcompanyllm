---
type: llm-wiki-source
status: captured
title: "GitHub Copilot MCP Documentation"
sourceKind: official-docs
sourceUrl: "https://docs.github.com/en/copilot/concepts/context/mcp"
source:
  - "https://docs.github.com/en/copilot/concepts/context/mcp"
  - "https://modelcontextprotocol.io/docs/getting-started/intro"
  - "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
publisher: GitHub
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "MCP Apps를 후보로만 유지하기로 한 결정의 상위 MCP 맥락과 보안 경계를 기록하기 위해 보존한다."
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - mcp
  - github
  - security
  - automation
---

# GitHub Copilot MCP Documentation

## Source Snapshot

- URL: https://docs.github.com/en/copilot/concepts/context/mcp
- Cross-check: https://modelcontextprotocol.io/docs/getting-started/intro
- Security cross-check: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
- Publisher: GitHub / Model Context Protocol
- Captured for: MCP candidate governance in Dex Company

## Key Notes

GitHub Docs는 MCP를 LLM 애플리케이션이 data source와 tools를 연결하는 open standard로 설명한다. MCP는 여러 Copilot surface에서 쓰일 수 있지만, 서버 설정과 권한은 별도 관리가 필요하다. MCP security best practices는 tool poisoning, rug pull, secret handling, consent 같은 위험을 다룬다.

## Why It Matters

에던님이 "MCP Apps는 후보로만 두라"고 결정하셨기 때문에, Dex Company는 MCP를 유용한 통합 표준으로 보되 설치/연결/권한 부여는 승인 전 단계로 남겨야 한다.

## Dex Company Use Example

- MCP Apps, MCP server, connector가 발견되면 source note에는 저장하되 active tool로 연결하지 않는다.
- 설치 후보 표에는 data access, tool permissions, secret handling, install commands, license/security policy를 넣는다.
- MCP가 꼭 필요한지, 파일-first Obsidian/Codex workflow로 충분한지 먼저 판단한다.

## Verification

- source-backed: GitHub MCP docs, MCP intro, MCP security best practices를 확인했다.
- Dex inference: MCP 후보 governance는 GitHub/MCP 문서를 Dex Company 설치 승인 규칙으로 해석한 것이다.
- not checked: GitHub MCP Registry나 특정 MCP server package를 감사하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, MCP 개념, 보안 경계, Dex Company 적용 포인트만 보존한다.
