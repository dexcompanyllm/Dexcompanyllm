---
type: llm-wiki-source
status: active
title: "MCP Apps UI Resource Permissions API"
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
source: "https://apps.extensions.modelcontextprotocol.io/api/interfaces/app.McpUiResourcePermissions.html"
collectionPurpose: "MCP Apps 설치/실사 후보의 browser capability permission 범위를 판단하기 위한 공식 API 근거를 보존한다."
tags:
  - llm-wiki/source
  - mcp-apps
  - security
  - permissions
  - install-audit
---

# MCP Apps UI Resource Permissions API

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 MCP Apps TypeDoc의 `McpUiResourcePermissions` 인터페이스를 확인했고, 이 note는 권한 항목과 설치 심사 의미만 보존한다.

## Easy Explanation

MCP Apps UI resource는 camera, microphone, geolocation, clipboard write 같은 browser capability를 요청할 수 있다. host가 iframe allow 정책으로 이를 반영할 수 있지만, app은 권한이 항상 부여된다고 가정하면 안 된다.

## Dex Company Use

- MCP Apps 후보는 요청 권한을 설치 전 체크리스트에 반드시 적는다.
- camera, microphone, geolocation, clipboard write가 있으면 `excessive agency`와 `sensitive information disclosure` 위험을 높게 본다.
- 권한 요청이 없더라도 host별 정책 확인 전에는 install-audit-pass로 올리지 않는다.

## Evidence Quality

- high: MCP Apps 공식 API 문서이며 GitHub source definition 링크가 함께 제공된다.
- cross-check: 기존 MCP Apps CSP/CORS source note, MCP Apps install audit note와 연결된다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: MCP Apps UI resource permission에는 camera, microphone, geolocation, clipboard write 요청이 포함될 수 있다.
- Dex inference: 덱스 컴퍼니의 설치 후보 평가는 browser permission을 OWASP LLM risk checklist에 연결해야 한다.
- not checked: 이번 실행에서 특정 MCP App이 실제로 어떤 권한을 요청하는지는 검사하지 않았다.

