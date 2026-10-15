---
type: llm-wiki-source
status: active
title: "MCP Apps registerAppResource Helper"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: descriptive
evidenceScope: source-backed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://apps.extensions.modelcontextprotocol.io/api/functions/server-helpers.registerAppResource.html"
collectionPurpose: "MCP Apps project-specific 구현 후보를 평가할 때 resource registration, MIME type, CSP, origin allowlist 흐름을 확인하기 위한 공식 helper 문서를 보존한다."
tags:
  - llm-wiki/source
  - mcp-apps
  - implementation
  - security
  - install-audit
---

# MCP Apps registerAppResource Helper

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 MCP Apps `registerAppResource` helper 문서를 확인했고, 이 note는 helper의 목적과 보안 적용 포인트만 보존한다.

## Easy Explanation

`registerAppResource`는 MCP server에 app resource를 등록하는 helper다. 기본 MIME type을 MCP app용 HTML profile로 맞추고, resource URI와 UI metadata를 함께 다룬다. 예시는 외부 API 연결을 위한 CSP 설정과 stable origin 사용을 보여준다.

## Dex Company Use

- MCP Apps를 실제 프로젝트에 붙이려면 tool 등록뿐 아니라 app resource URI, MIME type, CSP, domain 설계를 함께 검토해야 한다.
- 외부 API 호출이 있으면 `connectDomains`와 CORS allowlist를 별도 승인 항목으로 둔다.
- 코드 예시는 참고만 하고, 실행 설치는 프로젝트별 dependency audit 후 진행한다.

## Evidence Quality

- high: MCP Apps 공식 API 문서다.
- cross-check: MCP Apps resource meta와 CSP/CORS source note가 같은 보안 경계를 설명한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: helper는 app resource 등록을 단순화하고, CSP와 stable origin이 resource metadata에 연결될 수 있다.
- Dex inference: 덱스 컴퍼니의 MCP Apps 후보는 "설치 가능"보다 "resource boundary가 설명 가능한가"를 먼저 봐야 한다.
- not checked: helper 코드를 로컬에서 실행하거나 package audit을 새로 수행하지 않았다.

