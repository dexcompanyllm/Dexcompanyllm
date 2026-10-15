---
type: llm-wiki-source
status: captured
title: "Model Context Protocol security best practices"
sourceKind: official-doc
sourceUrl: "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
source:
  - "https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices"
  - "https://www.nsa.gov/Portals/75/documents/Cybersecurity/CSI_MCP_SECURITY.pdf"
publisher: Model Context Protocol / NSA
capturedAt: 2026-07-03T16:19:28+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "MCP 서버와 외부 도구를 덱스 컴퍼니에 흡수할 때 공급망/권한/승인 게이트를 강화하기 위한 보안 기준으로 사용한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-doc-security
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - mcp
  - security
  - ai-agents
  - automation
---

# Model Context Protocol security best practices

## Source Snapshot

- MCP security best practices: https://modelcontextprotocol.io/docs/tutorials/security/security_best_practices
- NSA MCP security design considerations PDF: https://www.nsa.gov/Portals/75/documents/Cybersecurity/CSI_MCP_SECURITY.pdf
- Related source: [[2026-07-03-openai-apps-sdk-mcp-server]]

## Key Notes

MCP는 agent와 외부 tool/resource를 연결하는 강력한 방식이지만, 권한, 인증, tool invocation, data exposure, supply-chain risk를 명확히 다뤄야 한다. 덱스 컴퍼니에서는 MCP/스킬/플러그인을 자동 설치하지 않고 후보 검토와 승인 게이트를 유지해야 한다.

## Why It Matters

세 번째 테스트에서 가장 중요한 학습은 "좋은 MCP 자료를 찾았다"가 아니라, MCP가 덱스 컴퍼니 성장 경로가 될수록 보안 게이트가 더 중요해진다는 점이다.

## Dex Company Use Example

- 새 MCP server 후보는 `source-backed`, `license`, `permission scope`, `network access`, `secret handling`, `install path`, `rollback path`를 확인한 뒤 승인한다.
- LLM Wiki source note에는 실행 코드 설치 여부와 미확인 보안 항목을 반드시 분리한다.
- API 키나 토큰을 요구하는 도구는 노트에 비밀값을 저장하지 않는다.

## Verification

- source-backed: MCP official security best practices, NSA PDF 검색/확인
- partial: 실제 PDF 전문 검토는 이번 테스트 범위 밖
- not checked: 특정 MCP server에 대한 threat model 작성

## Original Content

원문 전체를 복사하지 않고, 공식 보안 문서 URL과 덱스 컴퍼니 승인 게이트 적용 포인트만 보존한다.

