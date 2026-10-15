---
type: llm-wiki-source
status: active
title: "MCP Apps CSP and CORS"
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
source: "https://apps.extensions.modelcontextprotocol.io/api/documents/csp-and-cors.html"
collectionPurpose: "MCP Apps 설치 후보를 판단할 때 external origin, network request, stable origin, CORS allowlist를 어떻게 확인해야 하는지 저장한다."
tags:
  - llm-wiki/source
  - mcp
  - mcp-apps
  - security
  - csp
  - cors
---

# MCP Apps CSP and CORS

## Original Content

원문 전체를 복사하지 않는다. MCP Apps 공식 CSP/CORS 문서 URL과 Dex Company 설치 감사에 필요한 범위만 보존한다.

## Easy Explanation

MCP Apps UI는 일반 웹페이지처럼 같은 서버에서 뜨는 것이 아니라 sandboxed iframe 안에서 동작한다. 그래서 fetch, WebSocket, 이미지, 스크립트, 폰트 같은 외부 origin은 CSP에 명시해야 하고, API 서버 쪽 CORS 정책도 별도로 맞아야 한다.

## Dex Company Use

- MCP Apps SDK-only 설치 전 `connectDomains`, `resourceDomains`, `frameDomains`, stable domain 필요 여부를 표로 만든다.
- 외부 API를 쓰는 MCP App은 설치 전 CORS 허용 방식과 secret 노출 가능성을 검토한다.
- `localhost` 개발 origin도 누락하면 앱이 조용히 실패할 수 있음을 QA 기준에 넣는다.

## Evidence Quality

- high: MCP Apps 공식 security 문서.
- cross-check: MCP Apps overview, permissions API, install audit note와 연결된다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: MCP Apps에서 네트워크 요청과 리소스 로드는 CSP/CORS 설정을 필요로 한다는 점.
- Dex inference: Dex Company install gate 항목으로 승격하는 판단.
- not checked: 특정 Dex Company MCP App의 실제 CSP 표는 아직 없다.
