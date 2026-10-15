---
type: llm-wiki-guide
status: active
layer: wiki
explored: false
title: "Dex Company Approval-Ready Install Audit Model"
created: 2026-07-04
updated: 2026-07-09
dateCreated: 2026-07-04
dateModified: 2026-07-09
confidence: high
claimType: prescriptive
evidenceScope: local-policy-and-source-backed-synthesis
verificationStatus: partial
verifiedAt: 2026-07-05
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/wiki
  - dex-company
  - install-audit
  - approval
  - security
---

# Dex Company Approval-Ready Install Audit Model

## 목적

덱스는 에던님에게 흐릿한 설치 후보를 넘기지 않는다. 실행 코드, connector, MCP server, SDK, 브라우저 확장, npm package, GitHub workflow, skill을 승인 요청으로 올리기 전에, 덱스가 먼저 "정말 에던님은 승인만 하면 되는가"를 판단한다.

## Source Notes

- [[2026-07-05-owasp-agentic-skills-top10-install-audit]]
- [[2026-07-09-openai-codex-0143-remote-plugin-proxy-audit]]
- [[2026-07-09-github-npm-v12-install-time-security]]

## Decision Labels

| Label | 의미 | 에던님께 승인 요청? |
|---|---|---|
| `approval-ready-pass` | 대상 프로젝트, package/runtime metadata, 권한, secret, data access, network origin, rollback, validation plan을 확인했다. 에던님은 지정된 작업을 승인만 하면 된다. | 예 |
| `approval-ready-conditional` | 가능한 범위까지 확인했고, 특정 조건만 맞으면 승인 가능하다. 예: 특정 repo 안에서만, 특정 버전에서만, 특정 권한을 끄고만 가능하다. | 조건부 예 |
| `approval-not-ready` | 유용할 수는 있지만 대상 프로젝트, 계정, 권한 범위, 비용, runtime, rollback 중 중요한 정보가 비어 있다. | 아니요 |
| `install-audit-blocked` | 현재 기준에서 피할 수 있는 위험, 과한 범위, 호환성 문제, 약한 provenance, 더 안전한 대안이 있다. | 아니요 |
| `knowledge-only` | 설치 대상이 아니라 운영 규칙, checklist, template, QA 기준으로만 흡수한다. | 설치 승인 불필요 |

## Minimum Approval Packet

승인 요청 전 덱스는 최소한 다음 항목을 채운다.

- 정확한 target project path 또는 account/workspace
- 정확한 package/tool/connector 이름과 version
- 공식 source URL과 최소 1개 이상의 cross-check
- license와 dependency 범위
- 실행할 install command와 변경될 파일
- permission, secret, token, billing, network, data-access 범위
- skill permissions: file read/write paths, identity-file write access, shell access, network allowlist, external upload/webhook behavior
- provenance: publisher identity, version pin, content hash or signed release, scan status, update policy
- OWASP LLM risk 분류
- OWASP Agentic Skills risk 분류: malicious skill, supply-chain compromise, over-privileged skill, insecure metadata, untrusted external instructions, weak isolation, update drift, poor scanning, no governance, cross-platform reuse
- rollback 또는 제거 방법
- validation command 또는 manual QA 단계
- 설치하지 않는 더 안전한 대안
- 최종 추천 한 문장

## Codex Remote Plugin And MCP Fields

Codex, MCP, connector, plugin 후보가 remote catalog, marketplace source, system proxy, pairing, or session authentication을 포함하면 approval packet에 다음을 분리해서 기록한다.

```yaml
codex_remote_plugin_audit:
  codex_version: checked | not_checked
  remote_plugins_default_state: enabled | disabled | not_checked
  plugin_catalog_source: official | npm_marketplace | local | mixed | not_checked
  remote_local_version_visible: checked | not_checked
  publisher_identity: checked | not_checked
  version_pin_or_hash: checked | not_checked
  system_proxy_route: none | macos | windows | pac | wpad | not_checked
  auth_or_api_traffic_proxy_scope: checked | not_checked
  remote_control_daemon: running | not_running | not_checked
  manual_pairing_code_flow: checked | not_checked | not_applicable
  mcp_tool_search_default: checked | not_checked
  mcp_session_auth_scope: checked | not_checked | not_applicable
```

완료 기준: local Codex/Desktop version, target project, plugin source, proxy settings, pairing flow, and MCP session-auth scope가 확인되기 전에는 `approval-not-ready` 또는 `knowledge-only`로 둔다.

## npm Install-Time Security Fields

Node/npm package, frontend tooling, CLI, MCP server, or skill 후보가 npm install을 요구하면 다음을 기록한다.

```yaml
npm_install_security:
  npm_major_version: checked | not_checked
  allow_scripts_policy: reviewed | not_checked
  pending_install_scripts: none | listed | not_checked
  git_dependency_allowance: none | scoped | not_checked
  remote_url_dependency_allowance: none | scoped | not_checked
  native_build_approval: reviewed | not_checked | not_applicable
  allowlist_committed: yes | no | not_checked
  ci_strict_install_policy: checked | not_checked
  publish_token_type: none | trusted_publishing_oidc | granular_token | not_checked
  human_2fa_publish_or_stage_gate: checked | not_checked | not_applicable
```

완료 기준: install script allowlist, git/remote dependency allowance, native build approval, CI policy, and token/publish path가 확인되기 전에는 package install을 승인하지 않는다.

## Hard Rules

- `MCP Apps`, `Storybook`, `Figma MCP`처럼 큰 범주만으로 승인 요청하지 않는다.
- 전체 예제 repository를 전역 설치하지 않는다. 가능하면 project-local SDK/package만 검토한다.
- GitHub, Figma, Google, Slack, browser extension처럼 계정과 연결되는 시스템은 account/workspace permission review 없이 연결하지 않는다.
- vendor thought leadership, Threads snippet, package popularity만으로 설치 근거를 삼지 않는다.
- approval packet이 완성되지 않았으면 "에던님 승인만 남았습니다"라고 말하지 않는다.
- `AGENTS.md`, `MEMORY.md`, `SOUL.md`, `.env`, token store, browser profile, Obsidian Vault 같은 identity 또는 sensitive file에 쓰기 권한을 요구하는 skill은 기본값을 `approval-not-ready` 또는 `install-audit-blocked`로 둔다.
- network egress가 있는 skill은 "인터넷 가능"으로 뭉뚱그리지 않고 domain allowlist, webhook, telemetry, external upload 여부를 분리한다.
- scanner 결과만으로 pass 처리하지 않는다. 자연어 instruction, hidden script, update drift, runtime behavior를 함께 확인한다.

## Dex Company Defaults

- 문서, checklist, report template, QA 기준은 보통 `knowledge-only`로 바로 흡수 가능하다.
- Storybook a11y 같은 frontend tooling은 실제 frontend repository 안에서만 `approval-ready-conditional`이 될 수 있다. Dex setup 폴더에는 설치하지 않는다.
- MCP Apps SDK는 특정 MCP UI 프로젝트 안에서는 `approval-ready-conditional`이 될 수 있지만, full repository, global skill, system-monitor example은 기본적으로 `install-audit-blocked`다.
- GitHub Copilot, Figma MCP, connector workflow는 정확한 repo/workspace, permission scope, human review path, billing/account context가 확인될 때까지 `approval-not-ready`다.

## 쉬운 예시

- `knowledge-only`: "Storybook 접근성 테스트 기준을 보고서 QA 기준에 반영"은 설치가 아니라 지식 반영이므로 바로 가능하다.
- `approval-ready-conditional`: "이미 Storybook이 있는 프론트엔드 repo에 `@storybook/addon-a11y` dev dependency를 추가"는 package.json, Storybook version, rollback, test command를 확인한 뒤 조건부 승인 가능하다.
- `approval-not-ready`: "GitHub Copilot code review를 켜자"는 어느 repo인지, 권한이 read인지 write인지, billing이 걸리는지 모르면 아직 승인 요청을 하면 안 된다.
- `install-audit-blocked`: "system monitor 예제를 전역 MCP server로 설치"는 로컬 시스템 정보 접근과 과한 실행 범위 때문에 현재 기본값은 차단이다.

## Bias Check

- 이 가이드는 실행 코드와 계정 연동을 보수적으로 다룬다. 잘못 승인하면 파일, secret, billing, 외부 workspace에 영향을 줄 수 있기 때문이다.
- 너무 보수적이면 좋은 도구 도입이 늦어질 수 있다. 따라서 정확한 project/account context와 approval packet이 확보되면 `approval-not-ready`를 `approval-ready-conditional`로 재판정해야 한다.
- vendor documentation, package metadata, 이전 local audit은 시간이 지나면 바뀔 수 있다. 승인 요청 직전에는 공식 source와 local runtime을 다시 확인한다.

## Not Checked

- 이 문서는 현재 승인 판단 모델이며, 모든 후보 도구의 최신 package audit을 영구 보증하지 않는다.
- 실제 설치는 각 target project에서 별도 검증해야 한다.
- OWASP Agentic Skills Top 10은 active development / proposal 성격이 있으므로 최종 표준처럼 단정하지 않고, skill install audit 강화용 보안 프레임워크로만 사용한다.

## Original Content

이 가이드는 이전 growth-scan 설치 감사, OWASP 기반 보안 점검, 공식 package metadata 확인, Windows local runtime 확인을 종합한 Dex Company 운영 규칙이다.

2026-07-05 update: OWASP Agentic Skills Top 10을 knowledge-only source로 흡수해 skill-specific permission, provenance, network egress, identity-file, scanning, update drift, governance fields를 approval packet에 추가했다.
