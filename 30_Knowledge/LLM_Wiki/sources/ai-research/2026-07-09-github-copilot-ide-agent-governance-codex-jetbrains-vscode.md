---
type: llm-wiki-source
status: captured
title: "GitHub Copilot IDE Agent Governance - Codex in JetBrains and VS Code Agent Controls"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source:
  - "https://github.blog/changelog/2026-07-07-codex-as-agent-provider-and-agentic-enhancements-in-jetbrains-ides/"
  - "https://github.blog/changelog/2026-07-08-github-copilot-in-visual-studio-code-june-2026-releases/"
  - "https://github.blog/changelog/2026-07-07-add-review-cycles-and-time-to-adoption-phases-in-the-usage-api/"
publisher: "GitHub"
collectionPurpose: "IDE 안에서 Codex/Copilot/agent를 사용할 때 CLI 경로, admin policy, approval/autopilot mode, MCP server config, OAuth secret storage, browser/network proxy, cost visibility를 분리해서 승인/QA 체크리스트로 쓰기 위해 수집했다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - codex
  - jetbrains
  - vscode
  - agent-governance
---

# GitHub Copilot IDE Agent Governance - Codex in JetBrains and VS Code Agent Controls

## Original Content

- 수집 시각: 2026-07-09 06:04 KST
- 자료 유형: GitHub 공식 changelog
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 발표일, 확인 범위, 운영 판단, 위험 구분만 보존한다.
- 확인 범위: JetBrains IDE에서 Codex를 agent provider로 고르는 흐름, Codex CLI path 설정, Business/Enterprise editor preview policy, Copilot CLI approval modes, Agent Customizations 안의 hooks/MCP server 관리, workspace-level `.github/mcp.json`, VS Code agentic browser, remote browsing proxy, Marketplace model providers, session/subagent cost visibility, MCP OAuth secret storage, extension auto-update delay, Workspace Trust.

## Source-Backed Notes

- GitHub는 2026-07-07 JetBrains IDE에서 Codex를 public preview agent provider로 제공한다고 공지했다. 사용 흐름은 로컬 Codex CLI 설치, IDE 설정의 Codex enablement, Codex CLI path 설정, Copilot Chat agent picker 선택으로 설명되어 있다.
- Business/Enterprise 구독자는 관리자가 editor preview features policy를 켜야 사용할 수 있다는 조건이 붙어 있다.
- 같은 JetBrains 공지는 Agent Customizations에서 hooks와 MCP servers를 관리할 수 있고, workspace-level MCP server는 `.github/mcp.json`으로 정의할 수 있다고 설명한다.
- Copilot CLI sessions에는 Default Approvals, Bypass Approvals, Autopilot preview 같은 permission level이 노출된다. Bypass/Autopilot은 과도한 agency 위험이 있으므로 Dex Company에서는 기본값으로 두면 안 된다.
- 2026-07-08 VS Code June release changelog는 agentic browser tools GA, integrated browser permissions, screenshot/area screenshot context, remote workspace browsing proxy, parallel sessions, session/subagent cost visibility, Marketplace model providers, MCP OAuth credential secret storage, extension auto-update delay, Workspace Trust improvements를 함께 제시한다.
- 2026-07-07 usage API 공지는 AI adoption phase별 PR first-review latency와 review-cycle count를 추가했다. 이는 agent adoption을 실제 코드리뷰 병목과 연결해 보는 계측 후보가 된다.

## Dex Company Use Example

- 에던님이 JetBrains나 VS Code에서 Copilot/Codex agent를 쓰자고 하시면, "IDE에 agent가 보인다"를 "현재 로컬에서 안전하게 사용 가능하다"로 바로 판단하지 않는다.
- 승인 전에 다음을 분리한다: IDE/plugin version, Codex CLI path, GitHub plan/org policy, preview feature enablement, approval mode, hooks/MCP config, `.github/mcp.json`, OAuth credential storage, browser/network proxy, Workspace Trust, extension update delay, cost/session usage evidence.
- frontend QA에서 IDE integrated browser를 쓰는 경우, screenshot만 남기지 말고 browser permission, remote proxy 여부, web search/history/favorites scope, target repo trust state를 QA evidence로 남긴다.

## Evidence Quality

- quality: medium
- 이유: GitHub 공식 changelog 여러 개를 교차 확인했지만, 에던님의 실제 JetBrains/VS Code 설치 상태, GitHub plan/org policy, Copilot subscription, Codex CLI path, IDE plugin version, repo trust state, billing dashboard, usage API 접근 권한은 확인하지 않았다.
- 교차 검증: 기존 `2026-07-04-github-copilot-jetbrains-ai-assistant-acp.md` source note는 ACP/native agent picker와 capability limit를 다루며, 이번 source는 Codex provider, approval mode, MCP workspace config, IDE browser/cost/secret-storage 필드를 추가한다.

## Risk / License / Security

- 실제 설치 여부: 설치하지 않았다.
- 계정/권한 변경 여부: 변경하지 않았다.
- OWASP LLM 위험 기준: excessive agency, insecure plugin design, sensitive information disclosure, insecure output handling, overreliance, prompt injection.
- supply-chain / runtime risk: IDE plugin update, Marketplace model provider extension, MCP server command/HTTP config, hooks, CLI path, OAuth credentials, remote browsing proxy가 모두 별도 검토 대상이다.
- approval tier: knowledge-only / approval-not-ready until target IDE, target repo, org policy, CLI path, approval mode, MCP config, rollback, and validation command are known.

## Claim Split

- source-backed: GitHub 공식 changelog의 Codex agent provider, JetBrains setup 조건, approval modes, MCP management, VS Code integrated browser/cost/model/OAuth/Workspace Trust controls, usage API review metrics.
- Dex inference: Dex Company checklist에 IDE agent governance 필드로 반영해야 한다는 판단.
- not checked: 에던님 PC의 JetBrains/VS Code 상태, GitHub/Copilot 계정, IDE plugin version, Codex CLI path, `.github/mcp.json`, OAuth secret storage 실제 값, remote browsing proxy, billing/cost dashboard, usage API 응답.

## Bias Check

- Counter-argument: GitHub changelog는 제품 출시 관점의 공식 발표라 위험과 실패 사례를 충분히 드러내지 않을 수 있다.
- Data gap: 실제 IDE/plugin/runtime/account/org policy 확인 없이 adoption-ready로 판단할 수 없다.
