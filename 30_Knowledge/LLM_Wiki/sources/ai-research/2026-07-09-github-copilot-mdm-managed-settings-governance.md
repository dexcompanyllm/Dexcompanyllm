---
type: llm-wiki-source
status: captured
title: "GitHub Copilot MDM Managed Settings Governance"
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
sourceKind: official-docs
source:
  - "https://github.blog/changelog/2026-07-08-deploy-managed-copilot-settings-via-mdm-in-vs-code-and-cli/"
  - "https://github.blog/changelog/2026-07-08-enterprise-managed-opentelemetry-export-for-vs-code-and-cli/"
  - "https://docs.github.com/en/copilot"
  - "https://code.visualstudio.com/docs/agents/guides/monitoring-agents"
publisher: "GitHub / Microsoft Visual Studio Code"
collectionPurpose: "Copilot CLI와 VS Code agent 설정을 계정 또는 사용자 설정이 아니라 device-level MDM/file/server channel로 강제할 때 확인해야 할 배포 경로, precedence, registry/file path, plugin/marketplace/telemetry key를 Dex Company 승인 체크리스트로 분리하기 위해 수집했다."
tags:
  - llm-wiki/source
  - github-copilot
  - mdm
  - managed-settings
  - agent-governance
  - governance
---

# GitHub Copilot MDM Managed Settings Governance

## Original Content

- 수집 시각: 2026-07-09 07:34 KST
- 자료 유형: GitHub official changelog / official docs cross-check
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 발표일, 확인 범위, 운영 판단, 미확인 항목만 보존한다.
- 확인 범위: 2026-07-08 GitHub Copilot MDM managed settings changelog, 같은 날 OTel managed export changelog, 기존 06:35 OTel source note, 기존 07:10 Copilot CLI plugin/MCP governance note.

## Source-Backed Notes

- GitHub는 Enterprise administrators가 Copilot managed settings를 native MDM, file-based configuration, server-managed channel로 배포할 수 있다고 발표했다.
- 대상 surface는 GitHub Copilot CLI와 VS Code이다. device-level 설정은 개발자가 어떤 계정으로 로그인했는지와 별도로 적용될 수 있다.
- Windows native MDM 경로는 `HKEY_LOCAL_MACHINE\SOFTWARE\Policies\GitHubCopilot` registry key이고, macOS는 `com.github.copilot` managed preferences domain이다.
- file-based configuration은 OS별 well-known path의 `managed-settings.json`을 사용하며, root ownership, non-world-writable, no-symlink 같은 조건이 붙는다.
- precedence는 native MDM, server-managed, file-based 순서로 설명된다.
- 같은 managed setting key surface에는 permission bypass disable, model, enabled plugins, known marketplace, strict marketplace, telemetry 설정이 포함된다.
- OTel managed export changelog는 telemetry exporter headers가 tool subprocess environment로 흘러가지 않도록 분리된다고 설명한다.

## Dex Company Use Example

Copilot CLI, VS Code agent, 또는 비슷한 IDE/CLI agent를 프로젝트에 도입할 때는 "내 계정에서 켜진다"와 "조직이 강제 관리한다"를 분리해야 한다.

```yaml
managed_agent_settings_gate:
  target_surface: VS Code | Copilot CLI | both
  delivery_channel: native_mdm | server_managed | file_based | not_checked
  precedence_order_checked: not_checked
  windows_registry_policy_path: not_checked
  macos_managed_preferences_domain: not_checked
  file_path_owner_and_symlink_rules: not_checked
  permission_bypass_disabled: not_checked
  enabled_plugins_policy: not_checked
  marketplace_allowlist_policy: not_checked
  telemetry_block_owner: not_checked
  exporter_header_secret_boundary: not_checked
  local_user_override_allowed: not_checked
  rollback_owner: not_checked
  decision: approval_not_ready
```

## Evidence Quality

- quality: medium
- 이유: GitHub official changelog 두 건과 기존 VS Code/GitHub OTel governance source를 교차 확인했다. 다만 에던님의 실제 GitHub Enterprise/Business org policy, Windows registry, managed-settings file, VS Code/Copilot CLI 설치 상태는 확인하지 않았다.
- 기존 자료와의 차이: 06:35 OTel note는 telemetry collector/content capture/privacy를, 07:10 CLI plugin/MCP note는 plugin dashboard/sandbox/fetch approval을 다룬다. 이 note는 managed settings의 device-level deployment channel과 precedence를 별도 운영 필드로 보강한다.

## Risk / License / Security

- 실제 설치 여부: 설치하지 않았다.
- 계정/권한 변경 여부: 변경하지 않았다.
- 실행 코드 여부: Copilot CLI, VS Code setting, registry, MDM, file-based config를 실행하거나 변경하지 않았다.
- OWASP LLM 위험 기준: excessive agency, insecure plugin design, sensitive information disclosure, insecure output handling, prompt injection, supply-chain risk.
- risk: MDM 또는 file policy가 permission bypass, plugins, marketplace, telemetry를 강제할 수 있으므로 local user preference만 보고 안전하다고 판단하면 안 된다.
- approval tier: knowledge-only / approval-not-ready until target org, device management owner, policy channel, concrete keys, rollback owner, and validation command are known.

## Claim Split

- source-backed: GitHub official changelog의 MDM/file/server delivery channel, precedence, supported setting keys, registry/file path, OTel header boundary.
- Dex inference: Dex Company checklist에 agent managed settings deployment gate를 추가해야 한다는 판단.
- not checked: 에던님 PC의 Copilot CLI/VS Code version, GitHub org policy, Windows registry policy, managed-settings file, MDM owner, actual enabled plugins, marketplace allowlist, telemetry block.

