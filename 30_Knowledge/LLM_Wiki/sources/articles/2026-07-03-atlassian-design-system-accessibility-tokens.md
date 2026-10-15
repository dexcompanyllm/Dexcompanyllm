---
type: llm-wiki-source
status: active
title: "Atlassian Design System Accessibility and Tokens"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://atlassian.design/foundations/tokens"
  - "https://developer.atlassian.com/platform/forge/design-tokens-and-theming/"
  - "https://www.atlassian.com/blog/design/behind-the-screens-accessible-design-is-good-design"
collectionPurpose: "Atlassian Design System을 collaboration/enterprise workflow UI 기준으로 볼 때 token theming, host sync, accessibility-by-default 주장을 분리해 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - atlassian
  - design-tokens
  - accessibility
---

# Atlassian Design System Accessibility and Tokens

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 21:03 KST 기준 Atlassian Design System tokens, Forge design tokens/theming, Atlassian accessibility blog의 URL, 확인 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Atlassian Design System은 tokens를 design/code 양쪽에서 쓰는 기반으로 제공한다. Forge 문서는 parent Atlassian app의 theme과 동기화되는 theming API를 설명하고, 접근성 글은 accessibility를 별도 compliance 항목이 아니라 design quality의 일부로 다룬다.

## Dex Company Use

- Jira/Confluence/Trello 같은 협업 도구 UI를 참고할 때 token library, theming sync, host app integration, accessibility automation을 한 세트로 본다.
- iframe/host 기반 앱을 만들 때 theme sync가 단순 dark mode가 아니라 parent app과의 일관성, contrast, focus state에 영향을 준다는 점을 QA에 넣는다.
- accessibility를 마지막 수동 점검으로만 두지 않고 component/foundation/tooling 단계에 배치한다.

## Evidence Quality

- high: Atlassian 공식 design system, developer docs, company blog를 확인했다.
- cross-check: 기존 Atlassian Trello token source note, WCAG 2.2, GitLab accessibility tests, MCP Apps CSP/CORS source notes와 연결 가능하다.
- risk: Atlassian blog의 6,000건 이슈 해결 수치는 Atlassian 자체 보고이며 독립 검증은 하지 않았다.

## WCAG / Accessibility QA Link

직접 연결된다. Atlassian 자료는 접근성을 component/foundation/workflow/tooling으로 끌어올리는 사례다. Dex Company에서는 WCAG 2.2 체크를 token/theme 변경, component state, keyboard path, validation message, live region noise, focus order에 연결해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Atlassian은 design tokens, host theming sync, accessibility foundation/tooling을 공식 자료에서 설명한다.
- Dex inference: Dex Company의 iframe/MCP/app-shell UI에서도 host theme sync와 접근성 QA를 함께 봐야 한다.
- not checked: Atlassian package 설치, Forge app runtime, accessibility tooling 실행은 하지 않았다.
