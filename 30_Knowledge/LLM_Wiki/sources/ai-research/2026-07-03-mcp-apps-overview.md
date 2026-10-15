---
type: llm-wiki-source
status: active
title: "MCP Apps Overview"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: definition
evidenceScope: single-source
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://apps.extensions.modelcontextprotocol.io/api/documents/overview.html"
collectionPurpose: "MCP Apps의 기본 개념, host/server/view 관계, sandboxed iframe, postMessage 통신 모델을 설치 판단과 Dex Company UI 후보 판단에 연결한다."
tags:
  - llm-wiki/source
  - mcp
  - mcp-apps
  - ui
---

# MCP Apps Overview

## Original Content

원문 전체를 복사하지 않는다. MCP Apps 공식 overview URL과 설치 판단에 필요한 핵심 개념만 보존한다.

## Easy Explanation

MCP Apps는 MCP 서버가 대화 안에 보여줄 UI를 선언하고, host가 이 UI를 안전한 iframe 안에서 렌더링하게 하는 확장이다. tool 결과가 텍스트만으로 부족할 때 chart, form, canvas, dashboard 같은 UI를 제공할 수 있다.

## Dex Company Use

- LLM Wiki source explorer 또는 Growth Scan dashboard의 장기 UI 후보로 둔다.
- MCP Apps를 설치할 때 server, host, view, CSP, permissions를 분리해 감사한다.
- "SDK-only 조건부 가능" 판단의 개념 근거로 쓴다.

## Evidence Quality

- high: MCP Apps 공식 문서.
- cross-check: MCP Apps GitHub repo, CSP/CORS 문서, permissions API 문서와 교차 검증 가능.

## Source-Backed / Dex Inference / Not Checked

- source-backed: MCP Apps가 MCP server UI resource를 host가 iframe으로 렌더링하는 모델이라는 점.
- Dex inference: Dex Company dashboard 후보로 보는 판단.
- not checked: 실제 UI rendering은 이번 실행에서 테스트하지 않았다.
