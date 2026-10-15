---
type: llm-wiki-source
status: captured
title: "GitHub Copilot CLI 1.0.69 Plugin, MCP, Sandbox Governance"
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
  - "https://github.com/github/copilot-cli/blob/main/changelog.md"
  - "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers"
  - "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools"
publisher: "GitHub"
collectionPurpose: "Copilot CLI 1.0.69의 plugin, MCP, sandbox, auto-approval 변경을 Dex Company의 CLI agent 승인/운영 체크리스트 필드로 분리하기 위해 수집했다."
tags:
  - llm-wiki/source
  - github
  - copilot-cli
  - mcp
  - plugin-governance
  - sandbox
  - agent-governance
---

# GitHub Copilot CLI 1.0.69 Plugin, MCP, Sandbox Governance

## Original Content

- 수집 시각: 2026-07-09 07:10 KST
- 자료 유형: GitHub official changelog / GitHub Docs
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 발표일, 확인 범위, 운영 판단, 미확인 항목만 보존한다.
- 확인 범위: Copilot CLI 1.0.69 changelog의 plugin/MCP/sandbox/auto-approval 변경, Copilot CLI Docs의 sandbox와 automatic approval risk, MCP server 추가/관리 방식, command reference의 `copilot mcp`와 `copilot plugin`, permission reset guidance.

## Source-Backed Notes

- GitHub Copilot CLI changelog는 2026-07-07 `1.0.69`에서 installed plugin extensions를 세션 재시작 없이 reload할 수 있고, `/plugins` dashboard로 installed plugins를 관리할 수 있다고 기록한다.
- 같은 changelog는 repo-scoped plugin MCP server가 repo에서 disabled 되거나 세션이 declaring repository를 떠나면 disconnect된다고 설명한다.
- `1.0.69`는 `/mcp list`로 attached MCP servers와 status를 보여주고, agent가 작업 중일 때도 `/mcp list`와 `/plugin list`를 실행할 수 있게 했다.
- `1.0.69`는 `/mcp manager`에서 turn이 진행 중일 때도 서버 enable/disable을 열 수 있지만 add/edit/delete/re-auth는 turn 종료까지 보류한다고 설명한다.
- `1.0.69`는 active sandbox network policy를 `web_fetch`에 반영하고, host가 허용한 경우 one-time bypass approval을 fetch prompt에서 받을 수 있게 했다.
- `1.0.69`는 auto allow-all mode를 추가했다. LLM judge가 acceptable로 평가한 요청을 자동 승인하는 흐름이므로 Dex Company에서는 기본 허용이 아니라 별도 과도한 agency 위험으로 다뤄야 한다.
- GitHub Docs는 automatic approval options가 사전 승인 없이 shell command나 tool action을 실행할 수 있어 data loss, corruption, security issue 위험을 높인다고 설명한다.
- GitHub Docs는 `/sandbox enable`로 local sandboxing을 켜서 filesystem, network, system capability 접근을 제한할 수 있다고 설명한다.
- GitHub Docs는 Copilot CLI에 MCP server를 추가할 때 registry/allowlist policy가 적용될 수 있고, server type, command/args, environment variables, HTTP headers, allowed tools를 분리해 설정한다고 설명한다.
- GitHub Docs command reference는 `copilot mcp`가 MCP server configuration을 관리하고, `copilot plugin`이 plugins and plugin marketplaces를 관리한다고 설명한다.
- GitHub Docs는 `/reset-allowed-tools`가 interactive session에서 부여한 permission과 `/allow-all` 또는 `/yolo` permission을 되돌리고, current location의 saved approvals도 지운다고 설명한다.

## Dex Company Use Example

Copilot CLI, Codex CLI, 또는 유사한 터미널 agent를 프로젝트에 도입하려면 다음처럼 "설치 가능 여부"보다 먼저 운영면을 나눠 보셔야 합니다.

```yaml
cli_agent_plugin_mcp_gate:
  cli_name: GitHub Copilot CLI | Codex CLI | other
  cli_version: not_checked
  plugin_dashboard_available: not_checked
  plugin_reload_without_restart: not_checked
  repo_scoped_plugin_mcp_disconnect: not_checked
  mcp_list_status_available: not_checked
  mcp_enable_disable_during_turn: not_checked
  mcp_add_edit_delete_reauth_paused_until_turn_end: not_checked
  sandbox_network_policy_applies_to_fetch: not_checked
  fetch_one_time_bypass_allowed: no
  auto_allow_all_or_yolo: blocked_by_default
  reset_allowed_tools_path: not_checked
  saved_approval_file_scope: not_checked
  decision: approval_not_ready
```

## Evidence Quality

- quality: medium
- 이유: GitHub official changelog와 GitHub Docs 여러 페이지로 교차 확인했다. 다만 에던님의 실제 GitHub plan, Copilot CLI version, org policy, sandbox mode, MCP registry/allowlist, plugin marketplace, local config files, permission files, billing과 audit log는 확인하지 않았다.
- 기존 자료와의 차이: 2026-07-04 Copilot CLI Actions note는 workflow token/billing을, 2026-07-09 IDE governance note는 IDE/approval/MCP/OAuth/Workspace Trust를, 2026-07-09 OTel note는 telemetry/content capture를 다룬다. 이 note는 terminal CLI의 plugin/MCP dashboard, repo-scoped plugin MCP disconnect, sandbox fetch policy, auto allow-all, permission reset을 별도 운영 필드로 보강한다.

## Risk / License / Security

- 실제 설치 여부: 설치하지 않았다.
- 계정/권한 변경 여부: 변경하지 않았다.
- 실행 코드 여부: Copilot CLI, plugin, MCP server, registry, sandbox, fetch, OAuth를 실행하지 않았다.
- OWASP LLM 위험 기준: excessive agency, insecure plugin design, sensitive information disclosure, prompt injection, insecure output handling, overreliance, supply-chain risk.
- approval tier: knowledge-only / approval-not-ready until target CLI version, project path, plugin source, MCP config, registry/allowlist, sandbox policy, permission reset path, rollback, validation command, and billing/audit owner are known.

## Claim Split

- source-backed: GitHub official changelog의 Copilot CLI 1.0.69 plugin/MCP/sandbox/auto-approval 변경, GitHub Docs의 automatic approval risk, sandboxing, MCP add/manage, command reference, permission reset behavior.
- Dex inference: 이 변경을 Dex Company CLI agent approval checklist에 별도 운영 필드로 반영해야 한다는 판단.
- not checked: 에던님의 Copilot CLI 설치 여부, 버전, GitHub org policy, local sandbox, plugin marketplace, MCP registry/allowlist, config files, saved approvals, billing/audit logs.

## Bias Check

- Counter-argument: Copilot CLI changelog는 기능 변경의 공식 기록이지만, 실제 enterprise policy 적용이나 실패 사례를 충분히 설명하지 않을 수 있다.
- Data gap: local runtime, actual config files, plugin source review, MCP server list, saved permission files, sandbox enforcement evidence는 이 회차에서 확인하지 않았다.
