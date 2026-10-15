---
type: llm-wiki-source
status: active
title: "GitHub Copilot Custom Agents Configuration"
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
source: "https://docs.github.com/en/copilot/reference/custom-agents-configuration"
collectionPurpose: "Custom agent profile의 tool filtering, MCP namespacing, default tool exposure 위험을 덱스 컴퍼니 role/subagent 설계와 비교하기 위해 보존한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - agents
  - mcp
---

# GitHub Copilot Custom Agents Configuration

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 GitHub Docs의 custom agents configuration reference를 확인했고, 이 note는 agent tool 설정과 MCP 연동 판단에 필요한 요약만 보존한다.

## Easy Explanation

GitHub custom agent profile은 어떤 도구를 agent가 사용할 수 있는지 `tools`로 제어한다. 도구 목록을 생략하거나 `*`를 쓰면 사용 가능한 도구가 넓게 열릴 수 있고, 빈 목록은 도구를 비활성화한다. MCP server 도구는 server 이름을 붙여 구체적으로 제한할 수 있다.

## Dex Company Use

- 덱스 컴퍼니 role/subagent 설계도 역할별 tool scope를 작게 제한해야 한다.
- MCP tool은 server별 namespace를 사용해 필요한 도구만 허용한다.
- "자동화니까 알아서 다 허용"하는 방식은 excessive agency 리스크로 본다.

## Evidence Quality

- high: GitHub 공식 reference 문서다.
- cross-check: GitHub repository MCP configuration 문서, 기존 GitHub Copilot cloud agent best practices source note와 연결된다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: custom agent의 `tools` property는 built-in 및 MCP tools 노출 범위를 제어한다.
- Dex inference: 덱스 컴퍼니 역할 라우팅 문서에 tool scope 원칙을 더 명시하면 사고 가능성이 줄어든다.
- not checked: GitHub custom agent profile을 실제 생성하지 않았다.

