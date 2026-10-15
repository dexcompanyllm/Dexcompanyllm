---
type: llm-wiki-source
status: captured
title: "Cross-AI Coding Tool Portability Gate for Dex Company"
sourceKind: official-docs
source:
  - "https://code.claude.com/docs/en/hooks-guide"
  - "https://docs.anthropic.com/en/docs/claude-code/hooks"
  - "https://docs.anthropic.com/en/docs/claude-code/settings"
  - "https://cursor.com/docs/agent/security"
  - "https://cursor.com/docs/context/rules"
  - "https://cursor.com/docs/context/mcp"
  - "https://docs.windsurf.com/windsurf/cascade/memories"
  - "https://docs.windsurf.com/windsurf/cascade/mcp"
  - "https://developers.openai.com/codex/changelog"
publisher: "Anthropic, Cursor, Windsurf, OpenAI"
capturedAt: 2026-07-09T08:34:00+09:00
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
collectionPurpose: "Codex/OpenAI 자료에만 갇히지 않고 다른 AI coding/agent 도구의 공개 운영 패턴 중 Dex Company에 이식 가능한 체크리스트 필드만 흡수하기 위한 기준을 보존한다."
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ai-agents
  - codex-portability
  - cross-ai-tools
  - governance
---

# Cross-AI Coding Tool Portability Gate for Dex Company

## Source Snapshot

- 수집 시각: 2026-07-09 08:34 KST
- 자료 유형: official docs / product docs / security docs
- 확인한 도구군: Claude Code, Cursor, Windsurf, OpenAI Codex
- 실제 설치/실행 여부: 하지 않음

## Key Notes

- Claude Code 문서는 hooks와 settings를 통해 tool call 전후의 명령 실행, matcher, timeout, permission 관련 동작을 구성할 수 있음을 보여준다. Dex Company에서는 이 신호를 "훅을 설치하자"가 아니라 "명령 실행 전후 guard, timeout, permission prompt, failure handling을 체크리스트로 분리하자"로 흡수한다.
- Cursor 문서는 agent security, rules, MCP context를 별도 surface로 다룬다. Dex Company에서는 IDE별 기능을 그대로 도입하지 않고 workspace trust, rule scope, MCP server provenance, prompt/context exposure, secrets handling을 Codex 작업 전 확인 항목으로 옮긴다.
- Windsurf 문서는 Cascade memories와 MCP를 제공한다. Dex Company에서는 외부 memory 기능을 켜는 것이 아니라 memory source, editability, workspace scope, removal path, MCP connection boundary를 Obsidian/Codex 운영 체크로 번역한다.
- OpenAI Codex changelog는 Codex 자체의 기능과 제한을 최신 기준으로 확인해야 함을 유지한다. 다른 도구의 패턴은 Codex에서 재현 가능한 운영 원칙일 때만 흡수한다.

## Codex Portability Gate

비-Codex AI coding 도구의 자료는 다음 조건을 만족할 때만 Dex Company 운영 지식으로 승격한다.

| Field | Pass Signal | Not Ready Signal |
|---|---|---|
| workflow portability | Codex의 파일 기반 작업, PowerShell, Git, Obsidian 기록으로 옮길 수 있다 | 특정 앱 UI나 계정 기능 없이는 재현 불가 |
| source quality | 공식 문서, 릴리스 노트, GitHub, 고품질 기술 문서로 확인된다 | SNS 단독 주장, vendor marketing only, 출처 약함 |
| permission boundary | command, file, network, MCP, memory, browser, secret 접근 범위가 분리된다 | 권한 범위가 모호하거나 broad agent 권한만 제시 |
| no-install-first | 설치 없이 체크리스트, prompt, QA/eval, approval packet으로 먼저 적용 가능하다 | 실행 코드, extension, MCP server 설치가 선행 조건 |
| Dex Company fit | PPT, frontend, UX/UI, automation, career ops 품질을 실제로 높인다 | 흥미롭지만 현재 운영 산출물의 검증 기준을 늘리지 않음 |
| rollback evidence | 끄기, 제거, 복구, 기록 삭제 또는 비활성화 경로가 있다 | memory/rule/hook/MCP가 남는 범위를 확인하지 못함 |

## Dex Company Use Example

비-Codex 도구의 "rules", "memories", "hooks", "MCP" 자료를 발견하면 다음처럼 평가한다.

```yaml
cross_ai_tool_signal:
  tool: "Claude Code / Cursor / Windsurf / other"
  source_quality: official_docs
  codex_portability: partial
  install_required_to_learn: no
  permission_boundary_checked:
    command_execution: not_checked
    file_write: not_checked
    network: not_checked
    mcp_server: not_checked
    memory_scope: not_checked
    secret_exposure: not_checked
  dex_company_absorption:
    checklist_field: yes
    source_note: only_if_new_operational_field
    install_candidate: no
  decision: knowledge_only
```

## Approval / Install Decision

| Candidate | Decision | Actual Install | Reason |
|---|---|---:|---|
| Claude Code hooks/settings | knowledge-only | No | Codex에 그대로 설치할 대상이 아니라 hook/permission/timeout guard를 체크리스트로 이식할 자료 |
| Cursor rules/MCP/security | knowledge-only | No | IDE/agent security surface는 유용하지만 target workspace/account 없이 adoption-ready 아님 |
| Windsurf memories/MCP | knowledge-only | No | memory/MCP 경계는 Obsidian/Codex 운영 기준으로 번역할 수 있으나 외부 app state는 not checked |
| Other AI coding tools | candidate-only | No | official source와 Codex portability가 확인될 때만 재판정 |

## Verification

- source-backed: 각 도구의 공식 문서에서 hooks/settings, security/rules/MCP, memories/MCP, Codex changelog를 확인했다.
- Dex inference: "다른 AI coding tool 자료를 Codex로 옮길 수 있는 운영 원칙만 흡수한다"는 판단은 Dex Company의 Codex-only 운영 계약과 no-install-first 정책을 적용한 것이다.
- not checked: Claude Code, Cursor, Windsurf, Devin, Aider, Cline, Roo Code 등의 실제 로컬 설치 상태, 계정 권한, 유료 기능, workspace policy, telemetry, memory persistence, MCP runtime, billing, rollback rehearsal은 확인하지 않았다.

## Failure Pattern / Risk

- 도구 이름이 유명하다는 이유로 source note를 만들면 LLM Wiki가 도구 목록으로 오염된다.
- 비-Codex 도구의 hook, memory, MCP는 편의 기능이 아니라 command execution, persistence, context exposure, network boundary와 연결될 수 있다.
- 따라서 이번 자료는 설치 후보가 아니라 Growth Scan 후보 평가 기준이다.

## Original Content

원문 전체를 복사하지 않고 공식 URL, 확인한 기능 범위, Dex Company에 이식 가능한 판단 기준, 미확인 항목만 보존한다.
