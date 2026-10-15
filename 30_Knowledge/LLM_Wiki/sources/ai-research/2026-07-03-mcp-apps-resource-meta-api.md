---
type: llm-wiki-source
status: active
title: "MCP Apps UI Resource Metadata API"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: descriptive
evidenceScope: source-backed
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://apps.extensions.modelcontextprotocol.io/api/interfaces/app.McpUiResourceMeta.html"
collectionPurpose: "MCP Apps UI resource의 CSP, dedicated origin, permission metadata를 설치 심사와 보안 검토 기준으로 보존한다."
tags:
  - llm-wiki/source
  - mcp-apps
  - security
  - csp
  - install-audit
---

# MCP Apps UI Resource Metadata API

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 MCP Apps TypeDoc의 `McpUiResourceMeta` 인터페이스를 확인했고, 이 note는 metadata 필드와 덱스 컴퍼니 적용 범위만 보존한다.

## Easy Explanation

MCP Apps UI resource metadata에는 CSP, dedicated origin domain, permissions, border preference가 들어갈 수 있다. 특히 domain은 OAuth callback, CORS, API key allowlist처럼 origin 안정성이 필요한 경우에 연결된다. host마다 domain 형식과 검증 규칙은 다를 수 있다.

## Dex Company Use

- MCP Apps 후보는 CSP와 domain 값을 분리해서 평가한다.
- OAuth나 API allowlist가 필요한 app은 host별 domain 규칙 확인 전에는 조건부 후보로만 둔다.
- 외부 API 연결이 있으면 `insecure plugin design`, `sensitive information disclosure`, `insecure output handling`을 함께 본다.

## Evidence Quality

- high: MCP Apps 공식 API 문서다.
- cross-check: MCP Apps CSP/CORS source note와 `registerAppResource` 문서가 같은 metadata 구조를 사용한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: UI resource metadata에는 CSP, domain, permissions, prefersBorder 같은 렌더링/보안 설정이 포함된다.
- Dex inference: 덱스 컴퍼니는 MCP Apps를 "UI가 있는 MCP server"가 아니라 "브라우저 sandbox와 origin 정책까지 있는 설치 후보"로 심사해야 한다.
- not checked: Codex Desktop에서 MCP Apps host가 어떤 domain 형식을 요구하는지는 확인하지 못했다.

