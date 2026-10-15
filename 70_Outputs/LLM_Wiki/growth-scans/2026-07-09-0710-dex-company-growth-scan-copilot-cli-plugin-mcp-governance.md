---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 07:10 KST"
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
  - "https://github.com/github/copilot-cli/blob/main/changelog.md"
  - "https://docs.github.com/en/copilot/concepts/agents/copilot-cli/about-copilot-cli"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/customize-copilot/add-mcp-servers"
  - "https://docs.github.com/en/copilot/reference/copilot-cli-reference/cli-command-reference"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/allowing-tools"
  - "https://developers.openai.com/codex/changelog"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://code.visualstudio.com/docs/agents/guides/monitoring-agents"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/update/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://www.figma.com/blog/introducing-figma-motion/"
  - "https://www.nngroup.com/articles/"
  - "https://www.indeed.com/careerscout"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료가 Dex Company 운영 체크리스트의 새 승인/QA 필드를 실제로 만드는지 확인하고, 중복은 저장하지 않는다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - github-copilot-cli
  - mcp
  - plugin-governance
  - sandbox
---

# Dex Company Growth Scan - 2026-07-09 07:10 KST

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-09 07:02-07:10 KST
- 실행 모드: 30분 fast discovery / `operational_scope.diff` 확인
- 검색 범위: OpenAI Codex changelog, GitHub July changelog, GitHub Copilot CLI changelog/docs, VS Code Copilot OTel docs, Obsidian changelog, W3C WAI/COGA, Storybook 10.3/10.4/MCP/accessibility, Figma Motion/MCP/release notes, NN/g article index/AI topic, Indeed Career Scout, Threads public snippets.
- 금지 준수: package, CLI, MCP server, plugin, connector, browser extension, workflow, account connection, token, billing setting, sandbox, fetch, OAuth를 설치/실행/변경하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 28 | public URL/search surface와 local duplicate surface 기준 |
| stored.count | 1 | GitHub Copilot CLI 1.0.69 plugin/MCP/sandbox governance source note |
| duplicate.count | 21 | OpenAI, VS Code OTel, Storybook, Figma, NN/g, W3C, Obsidian, Career Ops, Threads/LLM Wiki weak signals |
| deferred.count | 8 | local Copilot CLI, GitHub org policy, plugin marketplace, MCP registry/allowlist, sandbox evidence, saved approvals, billing/audit, Threads primary source |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | 중간 `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-070228.md`
- free RAM: 1.54GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. GitHub Copilot CLI 1.0.69는 `/plugins` dashboard, plugin extension reload, `/mcp list`, `/mcp manager`, repo-scoped plugin MCP disconnect 같은 운영면을 명확히 만들었다.
2. 같은 changelog는 `web_fetch`가 sandbox network policy를 따르고, host opt-in이 있을 때 one-time bypass approval을 받을 수 있다고 설명한다. 이는 fetch/network approval을 별도 필드로 분리해야 한다는 신호다.
3. `auto allow-all mode`는 LLM judge가 acceptable로 본 요청을 자동 승인하는 흐름이므로, Dex Company에서는 기본 허용이 아니라 `blocked_by_default` 또는 별도 승인필드로 봐야 한다.
4. GitHub Docs는 automatic approval options가 사전 승인 없이 shell/tool action을 실행할 수 있어 data loss, corruption, security risk를 높인다고 설명한다. local sandbox, VM/container, permission reset이 교차 검증 근거다.
5. OpenAI/VS Code/Storybook/Figma/NN-g/W3C/Indeed/Obsidian/Threads 신호는 대부분 최근 source notes와 checklist coverage에 이미 흡수되어 새 source note를 만들지 않았다.

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-github-copilot-cli-1069-plugin-mcp-sandbox-governance.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0710-dex-company-growth-scan-copilot-cli-plugin-mcp-governance.md`

## LLM Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: Copilot CLI 1.0.69 plugin/MCP/sandbox governance source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: CLI agent plugin/MCP 승인 필드 추가.
- `30_Knowledge/LLM_Wiki/index.md`: source note 링크와 operating rule 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 실행 변경 이력 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue 직접 확인: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `audit-done=8`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot CLI 1.0.69 plugin/MCP/sandbox surface | knowledge-only / approval-not-ready | No | plugin source, MCP registry/allowlist, sandbox policy, auto approval, saved permissions |
| Copilot CLI plugins / marketplace | install-audit-next only with target project | No | supply chain, repo-scoped extension behavior, plugin reload, local execution |
| Copilot CLI MCP servers | approval-not-ready | No | local command/env vars, remote HTTP headers, OAuth, allowed tools, registry policy |
| Auto allow-all / yolo / one-time fetch bypass | blocked-by-default unless isolated | No | excessive agency, network/data exfiltration, prompt injection |
| Storybook/Figma/Career Ops currentness | duplicate or project/account-specific | No | target repo/file/account required |

## 중복으로 제외한 자료

- OpenAI Codex changelog: 최근 Codex access/remote/plugin/proxy notes와 중복.
- VS Code Copilot OTel docs: 06:35 source note가 collector/content capture/retention fields를 이미 흡수.
- GitHub IDE agent governance: 06:04 source note가 JetBrains/VS Code approval/MCP/OAuth/Workspace Trust fields를 이미 흡수.
- Storybook 10.3/10.4/MCP/accessibility: target repo/package/test/rollback이 없고 기존 frontend QA fields와 중복.
- Figma Motion/MCP/Make/Slides: 최근 Figma source notes와 PPT/frontend checklist coverage에 이미 흡수.
- NN/g articles/AI topic: design specs, AI explanation, AI research notes와 중복.
- W3C WAI/COGA currentness: 기존 COGA/WCAG/PPT frontend QA fields로 충분.
- Indeed/LinkedIn Career Ops 신호: LinkedIn Apply Assistant와 Indeed Career Scout notes가 이미 platform-native human-review assistant 기준을 제공.
- Threads snippets: discovery-only이며 primary source와 provenance가 약해 source-backed note로 승격하지 않았다.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: 에던님 PC의 Copilot CLI 설치/버전, GitHub org policy, plugin marketplace, MCP registry/allowlist, `~/.copilot` config, saved approvals, local sandbox enforcement, billing/audit logs, actual MCP server list, Threads primary source.

## 교차 검증 근거

- GitHub Copilot CLI changelog의 1.0.69 항목을 GitHub Docs의 Copilot CLI overview, MCP server add/manage docs, command reference, permission reset docs와 교차 확인했다.
- GitHub Docs의 automatic approval risk와 sandbox mitigation을 OWASP LLM risk 중 excessive agency, insecure plugin design, sensitive information disclosure, prompt injection, insecure output handling에 매핑했다.
- 기존 LLM Wiki source notes와 최근 2-4회 growth-scan reports를 `rg`로 확인해 Copilot CLI Actions/IDE governance/OTel과 이번 terminal plugin/MCP governance를 분리했다.
- Threads는 public snippet만 확인되어 discovery-only로 유지했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitHub official changelog/docs의 plugin dashboard, plugin reload, `/mcp list`, MCP manager, repo-scoped plugin MCP disconnect, sandbox fetch policy, automatic approval risk, sandbox mitigation, permission reset.
- Dex inference: 이 신호를 Dex Company CLI agent approval checklist의 별도 gate로 흡수해야 한다는 판단.
- not checked: local Copilot CLI, actual plugins/MCP servers, GitHub org/admin policy, config files, billing/audit, runtime behavior.

## 에던님이 바로 사용할 수 있는 예시

터미널 agent나 MCP plugin을 켜자는 제안이 나오면 아래 필드가 채워지기 전에는 승인-ready로 보지 않으시면 됩니다.

```yaml
cli_agent_plugin_mcp_gate:
  cli_version: not_checked
  plugin_dashboard_available: not_checked
  plugin_reload_without_restart: not_checked
  repo_scoped_plugin_mcp_disconnect: not_checked
  mcp_list_status_available: not_checked
  mcp_enable_disable_during_turn: not_checked
  sandbox_network_policy_applies_to_fetch: not_checked
  fetch_one_time_bypass_allowed: no
  auto_allow_all_or_yolo: blocked_by_default
  reset_allowed_tools_path: not_checked
  saved_approval_file_scope: not_checked
  decision: approval_not_ready
```

Frontend/PPT 작업 예시: Storybook MCP나 Figma MCP가 다시 나오면 “agent가 test를 돌릴 수 있다”가 아니라 target repo/file, permission, plugin/MCP source, sandbox/network, saved approval, browser QA evidence를 먼저 요구하시면 됩니다.

## Improvement Delta

- 개선점: 기존 AI agent checklist가 IDE/OTel 중심이었는데, 이번에는 terminal CLI의 plugin/MCP dashboard, repo-scoped disconnect, mid-turn enable/disable, fetch bypass, auto allow-all, permission reset을 별도 gate로 분리했다.
- 운영 변경: `Dex Company Task Checklists from Growth Scans`와 `index.md`에 CLI plugin/MCP governance rule을 추가했다.
- 중복 방지: Copilot CLI Actions token/billing, IDE governance, OTel observability는 기존 note로 유지하고 이번 source는 terminal plugin/MCP/sandbox 운영면만 저장했다.

## Adoption Check

- 이전 action item: IDE/CLI agent 자료가 다시 나오면 기존 OTel/IDE coverage를 먼저 확인하고, 새 checklist field가 없으면 duplicate/no-new-signal로 둔다.
- 채택 여부: done.
- 반영 방식: 기존 OTel/IDE fields는 중복으로 처리했고, Copilot CLI 1.0.69의 plugin/MCP/sandbox fields만 새 source note로 저장했다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent with CLI plugin/MCP fields adopted | public CLI fields adopted; local account/runtime still not checked |
| IDE/CLI agent observability | done/extended-by-observability-source | done/kept separate | OTel remains separate; this run covers plugin/MCP/sandbox |
| Storybook/Playwright setup | deferred/project-specific | deferred/project-specific | target repo/package/browser evidence still absent |
| Figma Agent/MCP/Slides/Make/Motion | carried/account-and-file-specific | carried/account-and-file-specific | no new field beyond existing repo/deck/motion/private-context fields |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | snippets only; primary source and provenance weak |
| Obsidian Bases Toolbox | carried/approval-not-ready | carried/approval-not-ready | install still requires backup/test-vault/source/dependency/rollback evidence |

## Next Eval

1. preflight를 먼저 실행한다.
2. Copilot/Codex/CLI/MCP/plugin 자료가 다시 나오면 `rg`로 Actions token/billing, IDE governance, OTel observability, CLI plugin/MCP governance coverage를 먼저 확인한다.
3. 새 자료가 CLI version, plugin source, marketplace, MCP registry/allowlist, saved approvals, sandbox network policy, auto approval, reset path, billing/audit, rollback, validation command 중 새 필드를 만들지 않으면 duplicate/no-new-signal로 둔다.
4. 실제 adoption은 target project, local CLI version, config files, plugin/MCP source audit, sandbox evidence, permission reset rehearsal이 있을 때만 검토한다.

## Prompt Or Template Patch Candidate

```text
"CLI agent plugin/MCP" signals are not approval-ready by default. Before storing or enabling them, require operational_scope.diff across CLI version, plugin source, plugin dashboard/reload behavior, repo-scoped plugin MCP disconnect, MCP list/status, mid-turn enable/disable, add/edit/delete/re-auth pause rule, sandbox network policy, fetch bypass approval, auto allow-all/yolo, reset permissions, saved approvals, billing/audit owner, rollback, and validation command. If these fields are already covered, record duplicate/no-new-signal.
```

## Failure Pattern / Risk

- 반복 패턴: CLI나 plugin changelog가 나오면 "생산성 향상"으로 보이지만 실제로는 local execution, permissions, network, saved approval, billing surface가 함께 열린다.
- 이번 처리: 설치/실행 없이 source-backed note와 approval checklist fields만 추가했다.
- 남은 위험: GitHub official docs는 제품 동작의 근거지만 에던님 로컬/계정/조직 정책의 근거가 아니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-070228.md` |
| internet search | PASS | OpenAI/GitHub/VS Code/Obsidian/W3C/Storybook/Figma/NN-g/Indeed/Threads checked |
| duplicate check | PASS | `rg` across LLM Wiki sources, wiki, inbox, reports, and queue |
| source note schema | PASS | required metadata and `## Original Content` included |
| index/log update | PASS | new source link and run entry added |
| install/connect prohibition | PASS | no install, connector, CLI execution, MCP server, plugin, token, billing, sandbox, fetch, OAuth change |
| source-backed / Dex inference / not checked separation | PASS | source note and report split sections |
| status | PASS | `llm-wiki-status.ps1`; source notes 173 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1`; notes checked 188, missing v5 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed files returned `OK_UTF8` before report finalization; report included in final check |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; local Copilot CLI/plugin/MCP/runtime state remains not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, internet search, duplicate check, source note/checklist/index/log/report update, no-install discipline, status/lint/audit/UTF-8 checks completed.
- 최고 위험: Copilot CLI auto approval, plugin, MCP, fetch bypass 신호를 local adoption-ready로 과장하면 과도한 agency와 data exposure 위험이 생긴다.
- Not checked: 에던님 PC의 Copilot CLI, GitHub org policy, plugins/MCP servers, saved approvals, sandbox enforcement, billing/audit logs.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 07:10 KST Growth Scan 공개 검색 결과, preflight PASS 결과, GitHub Copilot CLI 1.0.69 changelog와 GitHub Docs 교차 검증, 기존 LLM Wiki 중복 확인, 변경 파일 검증 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
