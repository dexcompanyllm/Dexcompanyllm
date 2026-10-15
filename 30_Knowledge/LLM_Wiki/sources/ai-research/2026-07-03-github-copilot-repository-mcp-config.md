---
type: llm-wiki-source
status: active
title: "GitHub Copilot Repository MCP Configuration"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: source-backed
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers"
collectionPurpose: "Repository-scoped MCP configuration, tool allowlist, secret prefix 규칙을 덱스 컴퍼니 MCP 설치 심사와 비교하기 위해 보존한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - mcp
  - security
---

# GitHub Copilot Repository MCP Configuration

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 GitHub Docs의 repository MCP configuration 문서를 확인했고, 이 note는 JSON 구조, tool allowlist, secret 처리 요약만 보존한다.

## Easy Explanation

GitHub는 repository 설정에서 MCP server를 JSON 형식으로 구성할 수 있게 한다. 문서는 `mcpServers` 객체, server type, command/args, tools allowlist를 설명한다. 특히 tool을 구체적으로 allowlist하는 것을 권장하고, secret/variable은 `COPILOT_MCP_` prefix가 붙은 Agents secret 또는 variable을 쓰도록 한다.

## Dex Company Use

- 덱스 컴퍼니 MCP 후보도 `tools: ["*"]`를 기본값으로 두면 안 된다.
- secret은 note나 source에 저장하지 않고, prefix와 주입 경로만 문서화한다.
- repository 단위 설정과 개인/전역 설정을 분리해서 rollback 가능하게 둔다.

## Evidence Quality

- high: GitHub 공식 문서다.
- cross-check: GitHub custom agents configuration, MCP security best practices, OWASP LLM Top 10 source note와 교차 확인했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitHub repository MCP 설정은 JSON으로 관리되고, tool allowlist와 secret prefix 규칙이 있다.
- Dex inference: 덱스 컴퍼니에서도 MCP server 후보는 repo/project scoped configuration을 기본으로 삼아야 한다.
- not checked: GitHub repository settings에서 실제 MCP 설정을 저장하거나 검증하지 않았다.

