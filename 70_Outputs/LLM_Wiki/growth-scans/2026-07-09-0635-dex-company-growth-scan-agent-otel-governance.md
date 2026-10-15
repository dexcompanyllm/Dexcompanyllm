---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 06:35 KST"
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
  - "https://code.visualstudio.com/updates/v1_128"
  - "https://code.visualstudio.com/docs/agents/guides/monitoring-agents"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://developers.openai.com/codex/changelog"
  - "https://obsidian.md/changelog/"
  - "https://storybook.js.org/releases/10.4"
  - "https://www.figma.com/blog/"
  - "https://www.nngroup.com/articles/"
  - "https://www.w3.org/WAI/update/"
  - "https://playwright.dev/docs/release-notes"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료가 Dex Company 운영 체크리스트, 승인 필드, QA 필드, acceptance test를 실제로 바꾸는지 확인하고, 새 운영 필드가 생긴 경우에만 LLM Wiki에 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - vscode
  - github-copilot
  - opentelemetry
  - agent-governance
---

# Dex Company Growth Scan - 2026-07-09 06:35 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 06:33-06:39 KST
- 실행 모드: 30분 fast discovery / operational_scope.diff 확인.
- 검색 범위: OpenAI Codex changelog, GitHub July 2026 changelog/Copilot lane, VS Code 1.128 release notes, VS Code Copilot OpenTelemetry monitoring docs, Obsidian changelog, Storybook 10.4/releases, Figma blog/MCP/Motion, NN/g latest articles, W3C WAI update/RQTF snippets, Playwright release notes, Threads public search snippets.
- 변경 범위: source note 1개, Task Checklist 1개, LLM Wiki index/log, growth scan report 1개.
- 금지 준수: SDK, MCP server, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package, VS Code setting, OTel collector, Docker/backend를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 24 | 공개 URL/search surface와 기존 LLM Wiki coverage 대조 기준 |
| stored.count | 1 | VS Code Copilot agent OpenTelemetry managed export source note |
| duplicate.count | 18 | Codex remote/iOS, GitHub IDE governance, npm v12, Obsidian Bases, Storybook, Figma, NN/g, W3C, Playwright, Career Ops signals |
| deferred.count | 7 | GitHub/Copilot account/runtime, VS Code enterprise policy, OTel collector/backend, Storybook target repo, Figma account/file, Threads primary source, local trace payload |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | final `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-063301.md`
- free RAM: 1.53GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. VS Code 1.128은 Copilot telemetry export를 enterprise managed settings로 중앙 관리할 수 있다고 설명한다. 이 managed configuration은 Copilot Chat extension과 agent host process에 적용된다.
2. VS Code Copilot OTel guide는 agent interaction을 traces, metrics, events로 내보내며 LLM calls, tool executions, token usage, repo/branch/commit, org, agent type을 볼 수 있다고 설명한다.
3. 기본값으로 prompt/response/tool argument content는 capture하지 않지만, content capture를 켜면 code, file contents, prompts 같은 민감한 정보가 trace backend로 나갈 수 있다.
4. 기존 OpenTelemetry GenAI semantic conventions source note는 공통 vocabulary를 다루고 있었고, 이번 새 source는 VS Code/Copilot agent의 실제 managed export, content capture, precedence, privacy guardrail을 보강한다.
5. OpenAI, Obsidian, Storybook, Figma, NN/g, W3C, Playwright, Threads 신호는 이번 회차에서 대부분 기존 source/checklist coverage와 중복이거나 account/repo/runtime context가 필요했다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| VS Code Copilot OTel managed export | Microsoft VS Code / GitHub | official release notes/docs | stored-source | medium-high | source-backed: managed telemetry, content capture, precedence. not checked: Ethan VS Code/Copilot/collector |
| OpenTelemetry GenAI conventions | OpenTelemetry | official repo/docs | cross-check | medium | existing source covers vocabulary; this run adds runtime governance |
| GitHub Copilot July changelog lane | GitHub | official changelog | duplicate/currentness | high | IDE governance and npm v12 fields already stored; OTel field stored via VS Code docs |
| OpenAI Codex changelog | OpenAI | official docs | duplicate/currentness | high | existing Codex access/remote/mobile source notes cover fields |
| Obsidian changelog/Bases | Obsidian | official changelog | duplicate/currentness | high | existing Bases/Bases Toolbox notes cover mutation and approval gates |
| Storybook 10.4/releases | Storybook | official release | deferred/project-specific | medium | target repo/package/test/rollback absent |
| Figma MCP/Motion/Make/Slides | Figma | official blog/docs | duplicate/account-specific | medium | existing Figma checklist fields cover repo/deck/private context |
| NN/g latest articles | NN/g | research/practice index | duplicate/no-new-field | medium | design specs and AI explanations already stored |
| W3C WAI/RQTF snippets | W3C | official standards/work pages | duplicate/currentness | medium-high | existing PPT/frontend COGA/WCAG fields sufficient |
| Playwright release notes | Microsoft Playwright | official docs | duplicate-source | high | 01:04 refresh already added browser-QA evidence fields |
| Threads public snippets | Threads | public SNS snippets | deferred/discovery-only | low | snippets only; primary source/provenance weak |

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-vscode-copilot-agent-opentelemetry-managed-export.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0635-dex-company-growth-scan-agent-otel-governance.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: VS Code Copilot agent OTel governance source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: IDE/CLI agent observability gate 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source note 링크와 OTel observability 운영 규칙 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 실행 변경 이력 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue 직접 확인: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `audit-done=8`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| VS Code Copilot OTel export | knowledge-only / approval-not-ready | No | trace backend, prompt/code capture, auth header, retention, policy precedence |
| OTel collector/backend such as Aspire, Jaeger, Azure, Langfuse, Grafana | install-audit-next only with target project | No | Docker/cloud account/network egress/secret/header storage |
| VS Code managed telemetry settings | account/org-admin-specific | No | enterprise policy owner, developer override, local env precedence |
| GitHub Copilot IDE agent provider | carried/account-adjacent | No | IDE/plugin/CLI path/org policy/account/runtime not checked |
| Storybook/Playwright upgrades | deferred/project-specific | No | package/version delta, browser/CI evidence, rollback absent |

## 중복으로 제외한 자료

- OpenAI Codex iOS/remote/Developer mode: 기존 Codex access/remote source notes와 최근 보고서가 local availability와 account/runtime caveat를 다룬다.
- GitHub Copilot JetBrains/VS Code IDE governance: 06:04 source note가 CLI path, approval mode, MCP, OAuth, Workspace Trust, browser proxy, cost visibility를 이미 저장했다.
- GitHub npm v12 install-time security: 03:04 source note와 install checklist가 이미 반영했다.
- Obsidian Bases/changelog/Bases Toolbox: 05:05 source note와 checklist가 vault mutation approval fields를 다룬다.
- Figma Motion/MCP/Make/Slides: 02:34/03:35 source notes와 PPT/frontend checklist가 already cover.
- NN/g design specs/AI explanations, W3C WAI updates, Playwright release notes: 기존 PPT/frontend checklist fields와 중복.
- Threads snippets: discovery-only, source-backed promotion 불가.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: 에던님 VS Code/Copilot version, GitHub/Copilot plan/org policy, enterprise managed settings, collector endpoint/protocol, auth header storage, content capture setting, local DB/file export, OTel backend, retention/redaction, actual trace payload, Storybook target repo, Figma account/file, Threads primary confirmation.

## 교차 검증 근거

- VS Code 1.128 release notes와 VS Code Copilot OpenTelemetry monitoring guide를 교차 확인해 managed export와 runtime trace fields를 분리했다.
- 기존 `2026-07-03-opentelemetry-genai-semantic-conventions.md` source note와 비교해 공통 semantic convention과 VS Code/Copilot runtime governance를 분리했다.
- GitHub July changelog와 06:04 IDE agent governance source note를 대조해 이번 새 필드가 telemetry/content-capture/collector governance임을 확인했다.
- OpenAI/Obsidian/Figma/NN-g/W3C/Playwright/Storybook currentness는 최근 2-4회 보고서와 LLM Wiki index/source hit로 중복 여부를 확인했다.
- Threads는 public search snippet만 확인했으며, source-backed evidence로 승격하지 않았다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: VS Code official docs의 OTel signals, content capture default, managed settings precedence, runtime filtering, local DB/file export options, security/privacy caveat.
- Dex inference: Dex Company AI Agents/MCP checklist에 IDE/CLI agent observability gate를 추가해야 한다는 판단.
- Not checked: 에던님 로컬 VS Code/Copilot/collector/backend/account/runtime 상태와 실제 trace payload.

## 에던님이 PPT 또는 Frontend 작업에서 바로 사용할 수 있는 예시

AI agent를 이용해 frontend QA를 하면서 trace를 남기려면 아래처럼 먼저 분리하시면 됩니다.

```yaml
agent_observability_gate:
  ide_or_cli: VS Code | Copilot CLI | other
  otel_enabled: not_checked
  managed_policy_owner: none | github_enterprise | local | not_checked
  collector_endpoint: not_checked
  protocol: otlp_http | otlp_grpc | file | console | not_checked
  content_capture: false
  prompt_response_capture_allowed: no
  tool_argument_capture_allowed: no
  auth_header_storage: not_checked
  local_db_or_file_export_path: not_checked
  agent_type_filter: foreground | cli | claude | not_checked
  retention_redaction: not_checked
  decision: approval_not_ready
```

실무 의미: frontend QA 증거를 풍부하게 만들 수는 있지만, source code와 prompt가 외부 trace backend로 나갈 수 있으므로 collector와 content capture를 먼저 잠가야 합니다.

## Improvement Delta

- 개선된 점: 기존 IDE agent governance를 실행/승인/비용 중심에서 observability/privacy 중심으로 확장했다.
- 운영 변경: `Dex Company Task Checklists from Growth Scans`의 AI Agents/MCP/Connectors 섹션에 OTel collector, content capture, managed precedence, auth header, local export, runtime filtering, retention/redaction 필드를 추가했다.
- 중복 방지: OpenTelemetry semantic conventions는 기존 source로 유지하고, 이번에는 VS Code/Copilot runtime-specific governance만 새 note로 저장했다.

## Adoption Check

- 이전 action item: IDE agent 관련 자료가 다시 나오면 CLI path, approval mode, MCP config, OAuth storage, Workspace Trust, browser proxy, cost/usage metric 중 새 필드를 만들지 않으면 duplicate/no-new-signal로 둔다.
- 채택 여부: done.
- 반영 방식: GitHub IDE agent governance 자체는 중복으로 처리했고, 새로 확인된 OTel managed export/content capture/collector governance만 좁게 저장했다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent with OTel fields adopted | public OTel fields adopted; local account/runtime still not checked |
| JetBrains/Codex/VS Code IDE agent governance | done/updated-by-new-source | done/extended-by-observability-source | telemetry/content capture fields added as separate source |
| Storybook/Playwright setup | deferred/project-specific | deferred/project-specific | target repo/package/browser evidence still absent |
| Figma Agent/MCP/Slides/Make/Motion | carried/account-and-file-specific | carried/account-and-file-specific | no new checklist field beyond existing repo/deck/motion fields |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | snippets only; primary source and provenance weak |
| Obsidian Bases Toolbox | carried/approval-not-ready | carried/approval-not-ready | install still requires backup/test-vault/source/dependency/rollback evidence |

## Next Eval

1. preflight를 먼저 실행한다.
2. IDE/CLI agent observability 자료가 다시 나오면 기존 OpenTelemetry/VScode/Copilot coverage를 `rg`로 확인한다.
3. 새 자료가 collector endpoint, content capture, managed precedence, auth header, local export, runtime filtering, retention/redaction, rollback 중 새 필드를 만들지 않으면 duplicate/no-new-signal로 둔다.
4. 실제 adoption은 target IDE/account/org policy, collector/backend, content-capture policy, retention/redaction, validation command가 있을 때만 검토한다.

## Prompt Or Template Patch Candidate

```text
"Agent telemetry" signals are not approval-ready by default. Before storing or enabling them, require operational_scope.diff across OTel enabled state, collector endpoint/protocol, managed policy owner, policy/env/user precedence, content capture, prompt/response/tool-argument privacy, auth header storage, local DB/file export path, agent runtime filtering, retention/redaction, rollback, and validation command. If these fields are already covered, record duplicate/no-new-signal.
```

## Failure Pattern / Risk

- 반복 패턴: agent observability는 "좋은 QA evidence"처럼 보이지만, content capture가 켜지면 code, prompts, file contents, tool arguments가 외부 backend로 이동할 수 있다.
- 이번 처리: 설치/설정 변경 없이 source-backed note와 checklist fields만 추가했다.
- 남은 위험: VS Code docs는 public official source지만 에던님 계정/조직/로컬 설정을 증명하지 않는다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-063301.md` |
| internet search | PASS | OpenAI/GitHub/VS Code/Obsidian/Storybook/Figma/NN-g/W3C/Playwright/Threads checked |
| duplicate check | PASS | `rg` across LLM Wiki sources, wiki guides, reports, and candidate queue |
| source note schema | PASS | required metadata and `## Original Content` included; final lint returned 0 warnings |
| index/log update | PASS | source note and run entry added |
| install/connect prohibition | PASS | no install, connector, SDK, MCP, browser extension, token, billing, OTel collector/backend change |
| source-backed / Dex inference / not checked separation | PASS | Evidence Table and split section |
| status | PASS | `llm-wiki-status.ps1`; source notes 172 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1`; notes checked 187, missing v5 0, high-confidence-without-Bias-Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; local VS Code/Copilot/collector/runtime state remains not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, internet search, duplicate check, source note/checklist/index/log/report update, no-install discipline, status/lint/audit/UTF-8 checks completed.
- 최고 위험: agent telemetry를 QA 증거로 쓰려다가 prompt/code/tool arguments를 외부 collector로 보내는 privacy leak.
- Not checked: VS Code/Copilot version, GitHub org policy, managed settings, collector/backend, content capture, actual trace payload, retention/redaction.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 06:35 KST Growth Scan 공개 검색 결과, preflight PASS 결과, VS Code/GitHub/OpenTelemetry 공식 자료, OpenAI/Obsidian/Figma/W3C/NN-g/Playwright/Storybook/Threads 중복 확인, 기존 LLM Wiki coverage를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.

