---
type: llm-wiki-source
status: active
title: "MCP Apps Issues and Discussions Maturity Audit"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03T22:04:00+09:00
verifiedBy: Dex
disputed: false
sourceKind: github-issue-discussion-audit
source:
  - https://github.com/modelcontextprotocol/ext-apps/issues
  - https://github.com/modelcontextprotocol/ext-apps/issues/684
  - https://github.com/modelcontextprotocol/ext-apps/discussions/474
  - https://github.com/modelcontextprotocol/ext-apps/discussions/606
  - https://modelcontextprotocol.io/specification/draft/changelog
  - https://modelcontextprotocol.io/seps/2577-deprecate-roots-sampling-and-logging
collectionPurpose: "MCP Apps를 Dex Company에 설치하거나 운영 UI 후보로 볼 때, 공식 이슈와 디스커션이 보여주는 성숙도, UX 한계, 프로토콜 변경 리스크를 설치 없이 판단한다."
tags:
  - llm-wiki/source
  - mcp-apps
  - install-audit
  - ai-agents
  - automation
---

# MCP Apps Issues and Discussions Maturity Audit

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 22:04 KST 기준으로 GitHub 공개 이슈/디스커션 페이지, GitHub REST issue API, MCP 공식 draft changelog, SEP-2577 문서를 확인했고, Dex Company 설치 판단에 필요한 메타데이터와 요약만 보존한다.

## Source Metadata

| Item | Current evidence | Dex Company judgment |
|---|---|---|
| ext-apps issues list | GitHub issue list shows 93 open issues and recent open issues in June/July 2026. | `audit-done`; repository is active, but open issues are enough to require project-specific runtime QA before adoption. |
| Issue #684 Pinned or Split Screen MCP Apps | Open enhancement, opened 2026-06-03, updated 2026-06-11, 1 comment, 3 positive reactions. | `audit-done`; persistent/split UI is a real UX gap for long-running app context. Do not assume host UX supports it. |
| Discussion #474 MCP App Sampling | Started 2026-02-19, 1 comment. Proposal asks iframe views to request host LLM completions. | `audit-done`; useful capability idea, but official MCP draft/SEP-2577 deprecates core Sampling, so do not build new Dex Company defaults on host sampling. |
| Discussion #606 JSON-LD Web Markup for MCP App Discovery | Started 2026-04-09, 2 comments and 1 reply. Proposes JSON-LD discovery for MCP Apps and platform links. | `audit-done`; useful discovery idea, but discussion-only and not a current Dex Company implementation basis. |

## Easy Explanation

MCP Apps는 “대화 안에 UI를 띄우는 MCP”로 가능성이 큽니다. 하지만 공개 이슈를 보면 아직 host마다 화면을 고정하거나 split screen으로 오래 유지하는 UX가 명확하지 않습니다. 또한 app UI가 host 모델에게 직접 completion을 요청하는 sampling 아이디어는 매력적이지만, MCP 공식 draft와 SEP-2577 쪽에서는 Sampling을 새 구현 기본값으로 삼지 말라는 방향이 확인됩니다.

## Dex Company Use

- Growth Scan dashboard, LLM Wiki source explorer, PDF review board처럼 인터랙티브 UI 후보를 설계할 때 “UI가 보인다”와 “대화 전체에서 상태를 유지한다”를 분리해서 QA한다.
- MCP App 후보를 설치하기 전 `host UX capability`, `state persistence`, `permissions`, `CSP/CORS`, `file/network access`, `model-provider access`를 별도 체크리스트로 둔다.
- discovery 자동화를 만들 때 JSON-LD proposal은 참고하되, 공식 spec 또는 registry 문서로 안정화되기 전까지는 source-backed rule로 쓰지 않는다.

## Evidence Quality

- source-backed: GitHub issue list의 open issue count, #684 open enhancement metadata, #474/#606 discussion metadata와 본문 요약, MCP draft changelog의 deprecated feature guidance, SEP-2577의 Sampling deprecation rationale.
- Dex inference: Dex Company가 MCP Apps를 “설치 후보”가 아니라 “프로젝트별 보안/UX 감사가 필요한 UI 후보”로 계속 두어야 한다는 판단.
- not checked: GitHub 로그인 뒤 보이는 전체 reaction/detail, issue comments 전체 GraphQL metadata, 실제 MCP host별 split screen 지원, Codex Desktop MCP Apps 호환성, package/runtime install.

## Cross Verification

- GitHub issue #684은 GitHub REST issue API와 공개 HTML 페이지를 함께 확인했다.
- Sampling discussion #474는 MCP draft changelog와 SEP-2577의 Sampling deprecation 근거로 교차 검증했다.
- JSON-LD discovery discussion #606은 아직 discussion-only이므로 공식 specification rule로 승격하지 않았다.
- MCP Apps 관련 기존 LLM Wiki source notes: overview, CSP/CORS, permissions API, resource metadata API, registerAppResource, Agent Skills/convert-web-app audit, PDF server audit.

## Security and Install Risk

| OWASP LLM risk lens | Risk |
|---|---|
| Supply chain | ext-apps examples and packages are installable code; no install was run in this scan. |
| Insecure plugin design | iframe UI, app resources, host capabilities, and model access must be scoped. |
| Excessive agency | app UI requesting host LLM completions could blur user-approved model/tool boundaries. |
| Sensitive information disclosure | JSON-LD discovery must never expose secrets; platform links and endpoint domains require validation. |
| Prompt injection | app UI content and remote resources can influence model context. |
| Insecure output handling | generated UI actions and file/write flows must be validated outside the model. |
| Overreliance | discussion proposals are not stable enough to become operating defaults. |

## Accessibility / WCAG Mapping

Issue #684 is not an accessibility standard, but persistent/split UI affects keyboard focus, reading order, and context continuity. Any Dex Company MCP App UI should be tested against WCAG 2.2 focus order, visible focus, keyboard operation, and name/role/value expectations when the app is embedded in a chat host.

## Decision

MCP Apps remains `install-audit-conditional` for project-specific prototypes and `no default install` for Dex Company. The remaining issue/discussion queue items are now audited enough to close as `audit-done`; future work should start from a concrete Dex Company MCP App use case, not more broad source collection.
