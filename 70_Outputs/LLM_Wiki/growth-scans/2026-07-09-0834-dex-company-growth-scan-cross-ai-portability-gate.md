---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 08:34 KST"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: growth-scan-report
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
collectionPurpose: "직전 low-RAM no-op에서 보류된 cross-AI tool 흡수 기준을 preflight PASS 상태에서 공식 문서 기반 source note와 Dex Company 체크리스트로 반영한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - cross-ai-tools
  - codex-portability
  - ai-agent-governance
---

# Dex Company Growth Scan - 2026-07-09 08:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 08:31-08:40 KST
- 실행 모드: 30분 fast discovery / 직전 FAIL 회차 deferred item 재판정
- 검색 범위: Claude Code hooks/settings, Cursor agent security/rules/MCP, Windsurf Cascade memories/MCP, OpenAI Codex changelog, 최근 08:05/08:15/08:26 보고서, LLM Wiki index/log/checklist/source 중복.
- 제한: 비-Codex 도구를 설치하거나 실행하지 않았고, 계정 연결, MCP server, connector, browser extension, package, billing, auth 파일, workspace policy를 변경하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 18 | public official docs/search surfaces 9개와 local duplicate surfaces 9개 기준 |
| stored.count | 1 | cross-AI coding tool portability gate source note |
| duplicate.count | 8 | 기존 Claude Code skills note, GitHub mobile/MDM/OTel/CLI/Figma/OpenAI currentness, 08:15/08:26 no-op reports |
| deferred.count | 7 | actual non-Codex runtime/account, paid feature, telemetry, memory persistence, MCP runtime, billing, rollback rehearsal |
| blocked.count | 0 | preflight FAIL 없음, 접근 강제 우회 없음, 승인 없는 설치 없음 |
| lint.warning_count | 0 | final `llm-wiki-lint.ps1` result |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-083127.md`
- free RAM: 1.21GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. 직전 08:15/08:26 no-op의 핵심 보류 항목은 preflight PASS 후 적용 가능해졌다. 이번 회차는 새 도구 설치가 아니라 cross-AI tool 흡수 기준을 체크리스트로 반영했다.
2. Claude Code hooks/settings는 command execution, permission, timeout, matcher 같은 운영 guard를 시사한다. Dex Company에는 hook 설치가 아니라 command/file/network guard checklist로 흡수해야 한다.
3. Cursor rules/MCP/security는 IDE별 agent context와 MCP exposure가 workspace trust, secrets, prompt/context scope와 연결됨을 보여준다. Dex Company에는 rule scope와 MCP provenance 확인 항목으로 번역한다.
4. Windsurf memories/MCP는 외부 agent memory가 persistence, editability, workspace scope, removal path를 필요로 함을 보여준다. Dex Company에는 Obsidian/Codex memory source와 removal/rollback 확인으로 흡수한다.
5. 비-Codex 도구 자료는 `Codex portability`가 없으면 source note로 승격하지 않는다. 유명 도구 목록을 늘리는 것이 목적이 아니라 다음 작업의 approval field, QA field, prompt pattern, acceptance test를 늘리는 것이 목적이다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Claude Code hooks/settings | Anthropic | official docs | stored as portability signal | medium | source-backed: hooks/settings surface. Dex inference: Codex checklist translation. not checked: runtime/account |
| Cursor agent security/rules/MCP | Cursor | official docs | stored as portability signal | medium | source-backed: security/rules/MCP docs. Dex inference: workspace trust and context-scope gate. not checked: Ethan IDE/account |
| Windsurf Cascade memories/MCP | Windsurf | official docs | stored as portability signal | medium | source-backed: memories/MCP docs. Dex inference: memory persistence/removal gate. not checked: local app/policy |
| OpenAI Codex changelog | OpenAI | official docs | supporting-source | high | source-backed: Codex currentness anchor. not checked: local runtime/account feature state |
| Existing Claude Code skills note | LLM Wiki | source note | duplicate-supporting | medium | prior note covers skills standard; this run adds portability gate, not another skills note |
| GitHub mobile/MDM/OTel/CLI/Figma AI notes | LLM Wiki | source notes | duplicate-currentness | medium-high | recent 06:35-08:05 runs already cover these fields |
| Threads/public snippets | Threads | public SNS | not checked | low | no source-backed signal used |

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-cross-ai-coding-tool-portability-gate.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0834-dex-company-growth-scan-cross-ai-portability-gate.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: cross-AI coding tool portability gate source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: AI Agents / MCP / Connectors 작업에 `Codex portability`와 cross-AI tool 승격 기준 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source link와 운영 규칙 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 실행 변경 이력 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue 직접 확인: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Claude Code hooks/settings | knowledge-only | No | command execution, permission matcher, timeout, external runtime |
| Cursor rules/MCP/security | knowledge-only | No | IDE workspace trust, context exposure, MCP provenance, secrets |
| Windsurf memories/MCP | knowledge-only | No | persistent memory, workspace scope, MCP connection boundary, removal path |
| Devin/Aider/Cline/Roo Code and similar tools | candidate-only | No | not checked this run; require official source and Codex portability before source note |

## 중복으로 제외한 자료

- Anthropic Claude Code skills standard: 2026-07-03 source note가 이미 있다. 이번 회차는 skills 표준이 아니라 cross-AI portability gate로 범위를 분리했다.
- GitHub mobile remote session, MDM settings, OTel export, CLI plugin/MCP governance: 06:35-08:05 source notes가 이미 checklist fields를 만들었다.
- Figma AI cost gate and Make/Slides sources: 07:38 및 03:35 source notes가 이미 plan/credit/context/private exposure 필드를 만들었다.
- OpenAI Codex currentness: 이번 회차에서는 Codex changelog를 다른 도구 패턴의 이식 가능성 기준점으로만 사용했다.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: Claude Code/Cursor/Windsurf/Devin/Aider/Cline/Roo Code 실제 설치 상태, 계정 권한, 유료 기능, telemetry, memory persistence, MCP runtime, billing, rollback rehearsal, target project 적용성, Ethan device/workspace policy.

## 교차 검증 근거

- Claude Code hooks/settings 문서를 Cursor rules/MCP/security 문서와 대조해 tool별 기능명이 달라도 command/file/network/context/MCP 권한 경계를 분리해야 한다는 공통 운영 필드를 확인했다.
- Windsurf memories/MCP 문서를 기존 Dex Company Obsidian/LLM Wiki memory 원칙과 대조해 external agent memory는 source, scope, persistence, removal path가 확인되기 전까지 knowledge-only로 둬야 함을 확인했다.
- OpenAI Codex changelog와 기존 Codex/OpenAI checklist를 기준점으로 삼아 다른 도구 자료는 Codex/Obsidian/PowerShell/Git/browser QA로 옮길 수 있을 때만 흡수하도록 분리했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: 공식 문서의 hooks/settings, rules, MCP, memories, security surface 존재와 Codex changelog currentness.
- Dex inference: 이 표면들을 Dex Company의 `Codex portability` 체크리스트로 번역하고, no-install-first 운영 기준으로 다루는 판단.
- not checked: 실제 도구별 런타임, 계정, 비용, 조직 정책, telemetry, memory persistence, MCP server 동작, rollback.

## 에던님이 바로 사용할 수 있는 예시

다른 AI coding tool 문서에서 좋아 보이는 기능을 발견하면 바로 설치 후보로 올리지 않고 아래 형식으로 먼저 걸러냅니다.

```yaml
cross_ai_tool_signal:
  tool: "Cursor"
  feature: "rules or MCP"
  source_quality: official_docs
  codex_portability:
    files_git_powershell_obsidian: yes
    browser_qa_or_acceptance_test: partial
    requires_external_runtime: yes
  permission_boundary:
    command_execution: not_checked
    file_write: not_checked
    network: not_checked
    mcp_server: not_checked
    memory_scope: not_checked
    secret_exposure: not_checked
  decision: knowledge_only
```

PPT 또는 frontend 작업 예시: Cursor/Windsurf가 "rules"나 "memories"로 디자인 시스템 맥락을 유지한다고 해도, 덱스 컴퍼니에서는 먼저 Obsidian `PROJECT_CONFIG.md`, design source path, checklist field, QA evidence로 옮길 수 있는지만 봅니다. 외부 앱 memory를 켜는 것은 별도 승인 대상입니다.

## Improvement Delta

- 08:15/08:26 preflight FAIL로 보류된 cross-AI tool 흡수 기준을 preflight PASS 상태에서 source note와 checklist로 반영했다.
- Growth Scan의 관심 범위를 Codex/OpenAI에 가두지 않되, 외부 도구 자체를 기본 워크플로우에 섞지 않는 기준을 만들었다.
- "도구 후보"와 "Codex로 이식 가능한 운영 원칙"을 분리했다.

## Adoption Check

- 이전 action item: Claude Code, Cursor, Windsurf 등 비-Codex AI 도구의 Codex portability 평가 기준 추가.
- 채택 여부: done.
- 반영 방식: source note, AI Agents/MCP checklist, index, log, report에 반영했다. 자동화 프롬프트 원문 변경은 이번 회차에서 필수 변경으로 보지 않고, 이 보고서의 Patch Candidate로 남겼다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| Cross-AI tool learning policy | blocked/preflight-fail | done/source-and-checklist-updated | preflight PASS 후 official docs 기반 portability gate 저장 |
| Low-RAM backoff prompt update | blocked/preflight-fail | carried | 이번 preflight는 PASS였지만 free RAM 1.21GB로 낮아 다음 automation prompt patch 후보로 유지 |
| Weekly synthesis reactivation | blocked/preflight-fail | carried | 현재 30분 growth scan 범위 밖; 별도 weekly automation 상태 확인 필요 |
| Daily adoption 22:30 selection | blocked/preflight-fail | carried | 별도 automation/run mode 설계 필요 |

## Next Eval

1. preflight를 먼저 실행한다.
2. 비-Codex AI coding tool 자료가 나오면 `Codex portability`가 checklist field, approval field, QA field, prompt pattern, acceptance test 중 하나를 만드는지 확인한다.
3. 설치나 계정 연결이 필요한 자료는 source note가 아니라 `knowledge-only` 또는 `approval-not-ready`로 둔다.
4. free RAM이 1.0-1.3GB 근처이면 low-RAM backoff prompt 적용 여부를 다시 검토한다.

## Prompt Or Template Patch Candidate

```text
Growth Scan may inspect non-Codex AI coding tools such as Claude Code, Cursor, Windsurf, Devin, Aider, Cline, Roo Code, and similar tools. Do not treat them as default runtime additions. Promote only the source-backed principles that have Codex portability: they can be translated into Codex file work, PowerShell, Git, Obsidian LLM Wiki, browser QA, approval packets, prompt patterns, checklist fields, or acceptance tests without installing or connecting the external tool.
```

## Failure Pattern / Risk

- 반복 패턴: 인기 AI coding tool 자료는 도구 도입 욕구를 만들지만, 실제 운영 지식은 권한 경계, memory persistence, MCP provenance, rollback 같은 검증 필드에 있다.
- 이번 처리: 설치/연결/계정 확인 없이 official docs 기반 knowledge-only 기준만 저장했다.
- 남은 위험: free RAM이 PASS 기준은 넘었지만 1.21GB로 낮다. 다음 회차에서 다시 FAIL이면 검색/저장을 중단해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-083127.md` |
| internet search | PASS | Claude Code/Cursor/Windsurf/OpenAI official docs checked |
| duplicate check | PASS | recent reports, LLM Wiki index/source/checklist, queue, `rg` search checked |
| source note schema | PASS | required metadata and `## Original Content` included |
| index/log/checklist update | PASS | source link, operating rule, log entry, checklist fields added |
| install/connect prohibition | PASS | no install, connector, MCP server, IDE change, account, token, billing, auth-file change |
| source-backed / Dex inference / not checked separation | PASS | Evidence Table and split section |
| status | PASS | `llm-wiki-status.ps1`; source notes 177 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1`; notes checked 192, missing v5 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; non-Codex runtime/account state and low-RAM proximity remain not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, internet search, duplicate check, source note/checklist/index/log/report update, no-install discipline, status/lint/audit/UTF-8 checks completed.
- 최고 위험: cross-AI tool 자료를 실제 도구 adoption-ready로 과장하는 것.
- Not checked: Claude Code/Cursor/Windsurf runtime, account, paid feature, telemetry, memory persistence, MCP runtime, billing, rollback rehearsal.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 08:34 KST Growth Scan 공개 검색 결과, preflight PASS 결과, 공식 Claude Code/Cursor/Windsurf/OpenAI 문서, 기존 LLM Wiki 중복 확인, 변경 파일 검증 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
