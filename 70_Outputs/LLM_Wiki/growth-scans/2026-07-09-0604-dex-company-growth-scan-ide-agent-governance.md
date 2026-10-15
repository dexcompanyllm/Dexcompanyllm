---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 06:04 KST"
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
  - "https://github.blog/changelog/2026-07-07-codex-as-agent-provider-and-agentic-enhancements-in-jetbrains-ides/"
  - "https://github.blog/changelog/2026-07-08-github-copilot-in-visual-studio-code-june-2026-releases/"
  - "https://github.blog/changelog/2026-07-07-add-review-cycles-and-time-to-adoption-phases-in-the-usage-api/"
  - "https://developers.openai.com/codex/changelog"
  - "https://github.blog/changelog/label/copilot/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://www.figma.com/blog/"
  - "https://playwright.dev/docs/release-notes"
collectionPurpose: "30분 fast discovery 회차에서 공개 공식 자료가 Dex Company의 체크리스트, 승인 필드, QA 필드, acceptance test를 실제로 바꾸는지 확인하고, 새 운영 필드가 생긴 경우에만 LLM Wiki에 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - github
  - copilot
  - codex
  - agent-governance
---

# Dex Company Growth Scan - 2026-07-09 06:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 06:02-06:08 KST
- 실행 모드: 30분 fast discovery / operational_scope.diff 확인.
- 검색 범위: OpenAI Codex changelog, GitHub Copilot changelog, GitHub Copilot in VS Code June releases, GitHub Codex as JetBrains agent provider, GitHub usage API review metrics, Obsidian changelog, Storybook, W3C WAI update, NN/g articles, Figma blog/MCP/Motion, Playwright release notes, Threads public search snippets.
- 변경 범위: source note 1개, Task Checklist 1개, LLM Wiki index/log, growth scan report 1개.
- 금지 준수: SDK, MCP server, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package, IDE plugin을 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 18 | 공식 URL/search surface와 Threads discovery surface 기준 |
| stored.count | 1 | GitHub Copilot IDE agent governance source note |
| duplicate.count | 13 | OpenAI Codex Remote, Obsidian Bases, Figma MCP/Slides/Make/Motion, Playwright 1.61, W3C/NN-g/Storybook currentness, Threads weak snippets 등 |
| deferred.count | 6 | GitHub/Codex/JetBrains/VS Code account-runtime, Storybook target repo, Figma account/file, Career Ops account/app, Threads primary source, usage API access |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-report `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-060226.md`
- free RAM: 1.54GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. GitHub의 2026-07-07 JetBrains 공지는 Codex를 JetBrains IDE의 public preview agent provider로 다룬다. 기존 JetBrains ACP note와 겹치지만, 이번에는 Codex CLI path, editor preview policy, approval mode, hooks, workspace MCP config가 명확해져 새 승인 필드를 만든다.
2. GitHub의 2026-07-08 VS Code release 정리는 agentic browser GA, remote browsing proxy, screenshot context, session/subagent cost visibility, Marketplace model provider, MCP OAuth secret storage, Workspace Trust, extension auto-update delay를 묶어서 IDE agent governance surface로 보여준다.
3. GitHub usage API의 review latency/review-cycle metric은 AI adoption을 review bottleneck과 연결해 볼 수 있는 운영 지표 후보가 된다. 실제 API 접근은 확인하지 않았다.
4. OpenAI Codex, Obsidian, Figma, W3C, NN/g, Playwright, Storybook 신호는 이번 회차에서 대부분 기존 source/checklist coverage와 중복이었다.
5. Threads는 Obsidian/LLM Wiki/Codex 관련 discovery snippet은 있었지만 1차 근거로 승격할 만큼 출처/맥락이 충분하지 않아 discovery-only로 유지했다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Codex as JetBrains agent provider | GitHub | official changelog | stored-source | medium-high | source-backed: setup and policy fields. not checked: local IDE/Codex CLI/GitHub account |
| Copilot in VS Code June releases | GitHub | official changelog | stored-source as same governance note | medium-high | source-backed: browser/cost/model/OAuth/Trust controls. not checked: local VS Code/Copilot state |
| Usage API review metrics | GitHub | official changelog | stored-source as supporting source | medium | source-backed: field names and metric scope. not checked: API access/data quality |
| Codex changelog/currentness | OpenAI | official docs | duplicate/currentness | high | existing Codex source notes cover remote/plugin/access fields |
| Obsidian changelog/Bases | Obsidian | official changelog | duplicate/currentness | high | existing Bases/Bases Toolbox notes cover mutation and approval gates |
| Figma MCP/Slides/Make/Motion | Figma | official blog/docs | duplicate/account-specific | medium | existing checklist covers source freshness, repo handoff, motion/private context |
| W3C/NN-g/Storybook/Playwright | Standards/research/docs | official/high-quality pages | duplicate/no-new-field | medium-high | existing PPT/frontend checklist already has actionable QA fields |
| Threads public snippets | Threads | public SNS snippets | deferred/discovery-only | low | not checked: primary source, provenance, durable operational value |

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-github-copilot-ide-agent-governance-codex-jetbrains-vscode.md`
- wiki checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0604-dex-company-growth-scan-ide-agent-governance.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: GitHub IDE agent governance source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: IDE agent provider 승인 필드 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source note 링크와 IDE agent governance 운영 규칙 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 실행 변경 이력 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue 직접 확인: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `audit-done=8`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Codex as JetBrains agent provider | knowledge-only / approval-not-ready | No | Codex CLI path, GitHub policy, IDE plugin, approval mode, workspace files |
| VS Code agentic browser and model providers | knowledge-only / approval-not-ready | No | browser permissions, remote proxy, Marketplace extensions, Workspace Trust |
| Workspace MCP config `.github/mcp.json` | approval-not-ready | No | command/HTTP server source, OAuth credentials, repo trust, rollback |
| Copilot Bypass Approvals / Autopilot | install-audit-risk field | No | excessive agency, auto-approved tool calls, unclear human checkpoint |
| Usage API review metrics | carried/account-api-specific | No | enterprise/org report access, metric definition, adoption phase cohort quality |

## 중복으로 제외한 자료

- OpenAI Codex Remote/DigitalOcean/plugin currentness: existing Codex remote/plugin source notes and recent reports cover it.
- Obsidian Bases/changelog/Bases Toolbox: 05:05 source note and checklist fields cover vault mutation approval gates.
- Figma MCP/Slides/Make/Motion: 02:34 and 03:35 source notes plus PPT/frontend checklist cover repo/deck/private-context fields.
- W3C WAI update and Playwright release notes: existing accessibility/browser-QA checklist fields are sufficient for this run.
- NN/g design specs/AI critique: existing design specs and critique notes already cover handoff and review behavior.
- Threads snippets: discovery-only, no source-backed promotion.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: 에던님 PC의 JetBrains/VS Code 설치 상태, Codex CLI path, GitHub/Copilot plan/org policy, editor preview policy, IDE plugin version, `.github/mcp.json`, MCP server source, OAuth secret storage, Workspace Trust state, remote browsing proxy, billing/cost dashboard, usage API data, Threads primary backing source.

## 교차 검증 근거

- GitHub JetBrains changelog를 기존 2026-07-04 JetBrains ACP source note와 비교해 "이미 있던 capability boundary"와 "이번에 새로 생긴 approval/MCP/CLI fields"를 분리했다.
- GitHub VS Code release changelog와 GitHub usage API changelog를 같은 IDE/agent governance note 안의 supporting source로 묶어 cost, review, browser, secret-storage control을 확인했다.
- OpenAI/Obsidian/Figma/W3C/NN-g/Playwright/Storybook currentness는 최근 2-4회 보고서와 LLM Wiki index/source hit로 중복 여부를 확인했다.
- Threads는 public search snippet만 확인했으며, source-backed evidence로 승격하지 않았다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: GitHub 공식 changelog의 JetBrains Codex provider, Codex CLI path, admin policy, approval modes, Agent Customizations, MCP management, VS Code integrated browser, remote browsing proxy, model provider marketplace, cost visibility, MCP OAuth secret storage, Workspace Trust, usage API review metrics.
- Dex inference: 이 항목들을 Dex Company approval checklist에 IDE agent governance 필드로 흡수해야 한다는 판단.
- Not checked: 로컬 IDE, GitHub account/org, Codex CLI, 실제 MCP config, secret storage, billing, usage API, remote browser network path.

## 에던님이 PPT 또는 Frontend 작업에서 바로 사용할 수 있는 예시

IDE 안의 agent/browser를 QA 도구처럼 쓸 때는 아래처럼 먼저 분리하시면 됩니다.

```yaml
ide_agent_governance_gate:
  ide: VS Code | JetBrains
  plugin_version: not_checked
  agent_provider: Codex | Copilot | Claude | other
  codex_cli_path: not_checked
  admin_policy_required: yes
  approval_mode: default_only
  bypass_or_autopilot_allowed: no
  mcp_config_source: .github/mcp.json | none | not_checked
  oauth_secret_storage: not_checked
  remote_browser_proxy: not_checked
  workspace_trust: not_checked
  session_cost_visibility: not_checked
  decision: approval_not_ready
```

## Improvement Delta

- 개선된 점: 기존 "IDE agent integration"을 넓은 candidate로 두지 않고, Codex CLI path, admin preview policy, approval mode, hooks, workspace MCP, OAuth secret storage, browser proxy, Workspace Trust, cost visibility로 쪼갰다.
- 운영 변경: `Dex Company Task Checklists from Growth Scans`의 AI Agents/MCP/Connectors 섹션에 IDE agent provider 필드를 추가했다.
- 중복 방지: JetBrains ACP 기존 source note는 유지하고, 이번 source는 2026-07-07/07-08 GitHub changelog의 새 운영 필드만 기록했다.

## Adoption Check

- 이전 action item: "반복 currentness는 operational_scope.diff가 있을 때만 저장한다."
- 채택 여부: done.
- 반영 방식: 대부분의 OpenAI/Obsidian/Figma/W3C/Playwright/Threads 신호는 duplicate/no-new-signal로 처리했고, GitHub IDE agent governance만 새 checklist field를 만들어 source note로 저장했다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent with adopted IDE fields | public source fields adopted; local account/runtime still not checked |
| JetBrains ACP/Copilot integration | done/source-backed | done/updated-by-new-source | Codex provider and approval/MCP fields added as separate 2026-07-09 source |
| Storybook/Playwright setup | deferred/project-specific | deferred/project-specific | target repo/package/browser evidence still absent |
| Figma Agent/MCP/Slides/Make/Motion | carried/account-and-file-specific | carried/account-and-file-specific | no new checklist field beyond existing deck/codebase fields |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | snippets only; primary source and provenance weak |
| Obsidian Bases Toolbox | carried/approval-not-ready | carried/approval-not-ready | install still requires backup/test-vault/source/dependency/rollback evidence |

## Next Eval

1. preflight를 먼저 실행한다.
2. IDE agent 관련 자료가 다시 나오면 새 source note를 만들기 전에 `rg`로 JetBrains/VS Code/Copilot/Codex provider coverage를 확인한다.
3. 새 자료가 CLI path, approval mode, MCP config, OAuth storage, Workspace Trust, browser proxy, cost/usage metric 중 새 필드를 만들지 않으면 duplicate/no-new-signal로 둔다.
4. 실제 adoption은 JetBrains/VS Code 설치 상태, GitHub org policy, Copilot subscription, Codex CLI path, target repo, `.github/mcp.json`, approval mode, rollback, validation command가 있을 때만 검토한다.

## Prompt Or Template Patch Candidate

```text
"IDE agent" signals are not adoption-ready by default. Before storing or approving them, require operational_scope.diff across IDE/plugin version, agent provider, CLI path, admin policy, approval mode, hooks, MCP config, OAuth secret storage, Workspace Trust, browser/network proxy, cost visibility, rollback, and validation command. If these fields are already covered, record duplicate/no-new-signal.
```

## Failure Pattern / Risk

- 반복 패턴: GitHub/OpenAI/Figma changelog는 빠르게 바뀌므로 "최신"이라는 이유만으로 source note가 늘어날 위험이 있다.
- 이번 처리: 새 checklist field를 만든 GitHub IDE agent governance만 저장했다.
- 남은 위험: GitHub changelog는 제품 발표이며 실제 에던님 계정/런타임/비용/권한 상태를 증명하지 않는다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-060226.md` |
| internet search | PASS | OpenAI/GitHub/Obsidian/Storybook/W3C/NN-g/Figma/Playwright/Threads checked |
| duplicate check | PASS | `rg` across LLM Wiki, inbox, and recent reports |
| source note schema | PASS | required metadata and `## Original Content` included; lint returned 0 warnings |
| index/log update | PASS | source note and run entry added |
| install/connect prohibition | PASS | no install, connector, SDK, MCP, browser extension, token, billing change |
| source-backed / Dex inference / not checked separation | PASS | Evidence Table and split section |
| status | PASS | `llm-wiki-status.ps1`; source notes 171 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1`; notes checked 186, missing v5 0, high-confidence-without-Bias-Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; local IDE/account/runtime state remains not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, internet search, duplicate check, source note/checklist/index/log/report update, no-install discipline, status/lint/audit/UTF-8 checks completed.
- 최고 위험: GitHub official changelog는 local IDE/account/runtime availability 증거가 아니므로 adoption-ready로 과장하면 안 된다.
- Not checked: JetBrains/VS Code 설치 상태, Codex CLI path, GitHub org policy, approval mode, `.github/mcp.json`, OAuth secret storage, remote browser proxy, billing/cost dashboard, usage API access.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 06:04 KST Growth Scan 공개 검색 결과, preflight PASS 결과, GitHub 공식 changelog, OpenAI/Obsidian/Figma/W3C/NN-g/Playwright/Storybook/Threads 중복 확인, 기존 LLM Wiki coverage를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
