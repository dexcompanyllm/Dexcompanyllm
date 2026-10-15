---
type: llm-wiki-source
status: captured
title: "GitHub Mobile Copilot CLI Remote Session Control"
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
  - "https://github.blog/changelog/2026-07-08-github-mobile-live-notifications-for-copilot-cli-sessions/"
  - "https://github.blog/changelog/2026-07-08-github-mobile-fix-merge-conflicts-with-copilot-cloud-agent/"
  - "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-remote-control"
  - "https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/manage-and-track-agents"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/chronicle"
publisher: "GitHub"
collectionPurpose: "GitHub Mobile과 GitHub.com에서 Copilot CLI 원격 세션을 모니터링, 응답, 승인, 중지, 로그 확인할 때 필요한 정책, 프라이버시, 세션 동기화, 알림 필드를 Dex Company agent 운영 체크리스트로 분리하기 위해 수집했다."
tags:
  - llm-wiki/source
  - github
  - copilot-cli
  - github-mobile
  - remote-control
  - session-governance
  - agent-governance
---

# GitHub Mobile Copilot CLI Remote Session Control

## Original Content

- 수집 시각: 2026-07-09 08:05 KST
- 자료 유형: GitHub official changelog / GitHub Docs
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 발표일, 확인 범위, 운영 판단, 미확인 항목만 보존한다.
- 확인 범위: GitHub Mobile의 Copilot CLI remote session live notifications, Copilot cloud agent mobile merge conflict flow, Copilot CLI remote-control docs, agent session management docs, Copilot CLI session data docs.

## Source-Backed Notes

- GitHub Mobile live notifications는 remote Copilot CLI session에 대해 진행 중, 사용자 입력 대기, idle, 완료 상태를 표시할 수 있다고 발표했다.
- 같은 GitHub Mobile 공지는 iOS Live Activities와 Android live update notifications를 통해 session detail, current status, session logs 진입점을 제공한다고 설명한다.
- GitHub는 remote Copilot CLI session live notification이 Copilot CLI, VS Code, 기타 지원 surface에서 시작된 remote session을 모바일에서 모니터링하는 경로라고 설명한다.
- live notification은 settings에서 끌 수 있고, 첫 live notification에도 quick opt-out 버튼이 있다고 설명한다.
- 별도 GitHub Mobile 공지는 PR merge conflict가 있을 때 mobile pull request merge box에서 "Fix with Copilot" workflow를 시작하고, prefilled prompt로 Copilot cloud agent를 실행할 수 있다고 설명한다.
- GitHub Docs는 Copilot CLI remote control이 GitHub.com 또는 GitHub Mobile에서 CLI session을 모니터링하고 조종하는 기능이라고 설명한다.
- remote control prerequisite에는 organization/enterprise policy인 "Store local sessions in the Cloud"가 "View and control"이어야 한다는 조건, local machine online 상태, interactive session 조건이 포함된다.
- remote interface에서는 permission request 승인/거절, 질문 응답, plan approval, 새 prompt 제출, mode switch, current operation cancel을 할 수 있다.
- remote control이 켜지면 conversation message, tool execution event, permission request 같은 session event가 local machine에서 GitHub로 전송되고, remote command가 GitHub에서 CLI로 polling되어 local session에 주입된다.
- GitHub Docs는 local CLI 자체와 shell command, file operation, tool execution은 session을 시작한 local machine에서 계속 실행된다고 설명한다.
- organization/enterprise owner는 session syncing과 remote control availability를 policy로 제어하며, disabled 또는 unconfigured 상태에서는 remote control이 제공되지 않는다고 설명한다.
- Agent session docs는 session logs에서 agent progress, token usage, session length, internal reasoning, tool use, validation work를 볼 수 있고, steering message가 AI credits를 소비한다고 설명한다.
- session data docs는 Copilot CLI session data가 local machine에 저장되고 기본적으로 GitHub account에 sync되며, `/chronicle`과 session query가 past prompts, responses, file changes, usage patterns를 사용할 수 있다고 설명한다.

## Dex Company Use Example

원격 세션이나 모바일 알림이 "편리한 확인 수단"으로 보일 때도, 에던님 환경에서는 아래처럼 먼저 분리해야 합니다.

```yaml
remote_agent_session_gate:
  agent_surface: Copilot CLI | VS Code | GitHub Mobile | GitHub.com
  local_machine_online_awake: not_checked
  interactive_session_only: not_checked
  store_local_sessions_policy: disabled | view_from_cloud | view_and_control | not_checked
  mobile_app_version: not_checked
  os_notification_permission: not_checked
  live_update_opt_out_path: not_checked
  supported_session_states: in_progress | waiting_for_input | idle | finished | not_checked
  remote_permission_approval_allowed: not_checked
  session_events_sent_to_github: yes
  local_shell_file_tool_execution_boundary: local_machine
  session_logs_visibility: not_checked
  session_data_sync_enabled: not_checked
  chronicle_or_session_query_scope: not_checked
  steering_credit_cost_visible: not_checked
  stop_cancel_path: not_checked
  rollback_or_restore_path: not_checked
  decision: approval_not_ready
```

## Evidence Quality

- quality: medium
- 이유: GitHub official changelog 2개와 GitHub Docs 여러 페이지로 교차 확인했다. 다만 에던님의 GitHub account, Copilot plan, organization policy, mobile app install/version, notification permission, local Copilot CLI session state, session sync setting, billing/credit dashboard, session logs contents는 확인하지 않았다.
- 기존 자료와의 차이: 2026-07-03 OpenAI Codex remote connection note는 Codex host pairing과 remote host boundary를 다룬다. 이번 note는 GitHub Copilot CLI session의 mobile notification, remote permission approval, session event sync, session log visibility, session query/Chronicle risk를 별도 운영 필드로 보강한다.

## Risk / License / Security

- 실제 설치 여부: 설치하지 않았다.
- 계정/권한 변경 여부: 변경하지 않았다.
- 실행 코드 여부: Copilot CLI, GitHub Mobile, remote control, cloud agent, session sync, notification setting을 실행하거나 변경하지 않았다.
- OWASP LLM 위험 기준: excessive agency, sensitive information disclosure, insecure output handling, overreliance, prompt injection, insecure plugin design.
- risk: mobile notification과 remote approval은 편리하지만, session event, prompt, tool execution event, permission request, file changes, session logs가 GitHub 계정과 mobile surface로 이동하거나 노출될 수 있다.
- approval tier: knowledge-only / approval-not-ready until target account, org policy, local CLI version, mobile app version, session sync, notification permission, log visibility, billing/credit, stop/rollback, and validation evidence are known.

## Claim Split

- source-backed: GitHub official changelog와 Docs의 mobile live notification state, session logs entry, remote-control prerequisites, remote actions, session event sync, policy control, session data and query behavior.
- Dex inference: Dex Company AI agent checklist에 remote/mobile session governance gate를 추가해야 한다는 판단.
- not checked: 에던님의 GitHub/Copilot account, org/enterprise policy, local Copilot CLI runtime, GitHub Mobile app, notification permission, session sync, actual logs, credit/billing, rollback evidence.

## Bias Check

- Counter-argument: GitHub official docs는 기능의 의도된 동작을 설명하지만, mobile notification privacy나 enterprise policy edge case의 실제 실패 사례까지 충분히 보여주지는 않는다.
- Data gap: local runtime, mobile app UI, live notification payload, remote approval flow, organization policy screen, session logs contents, credit usage evidence는 이 회차에서 확인하지 않았다.
