---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 07:38 KST"
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
  - "https://github.blog/changelog/2026-07-08-deploy-managed-copilot-settings-via-mdm-in-vs-code-and-cli/"
  - "https://github.blog/changelog/2026-07-08-enterprise-managed-opentelemetry-export-for-vs-code-and-cli/"
  - "https://github.blog/changelog/2026-07-07-add-review-cycles-and-time-to-adoption-phases-in-the-usage-api/"
  - "https://help.figma.com/hc/en-us/articles/33459875669015-How-AI-credits-work"
  - "https://help.figma.com/hc/en-us/articles/35946832653975-Use-your-design-system-package-in-Make-kits"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
  - "https://help.openai.com/en/articles/11391654-chatgpt-business-release-notes"
  - "https://www.nngroup.com/articles/"
  - "https://www.threads.com/"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료가 Dex Company 운영 체크리스트의 새 승인/비용/QA 필드를 만드는지 확인하고, 중복과 미확인 항목을 분리한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - github-copilot
  - figma
  - managed-settings
  - cost-governance
---

# Dex Company Growth Scan - 2026-07-09 07:38 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 07:31-07:38 KST
- 실행 모드: 30분 fast discovery / `operational_scope.diff` 확인
- 검색 범위: GitHub Copilot July changelog, GitHub MDM managed settings, GitHub OTel managed export, GitHub usage API review metrics, Figma AI credits, Figma Make kits, Figma agent skills, OpenAI Codex/ChatGPT release notes, NN/g latest index, Threads public snippets.
- 금지 준수: package, CLI, MCP server, plugin, connector, browser extension, workflow, account connection, token, billing setting, registry/MDM/file policy, Figma connector를 설치/실행/변경하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 22 | public URL/search surface와 local duplicate surface 기준 |
| stored.count | 2 | GitHub Copilot MDM managed settings, Figma AI credits cost gate |
| duplicate.count | 16 | GitHub OTel, usage API, OpenAI Codex access, Figma Make/Slides/MCP, NN/g, Storybook/Obsidian currentness, Threads weak signals |
| deferred.count | 8 | GitHub org/MDM policy, local registry/settings files, VS Code/Copilot CLI runtime, Figma plan/seat/credit balance, target Figma file, admin usage API, Threads primary source |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` completed with 0 warning(s) before final report save |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-073129.md`
- free RAM: 1.35GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. GitHub Copilot managed settings는 이제 native MDM, file-based config, server-managed channel로 배포될 수 있다. Dex Company에서는 user setting 확인만으로 agent governance를 끝내면 안 된다.
2. GitHub는 managed settings precedence를 native MDM, server-managed, file-based 순서로 설명한다. permission bypass, plugins, marketplace, telemetry settings가 강제될 수 있으므로 rollout owner와 rollback owner를 분리해야 한다.
3. Figma AI credits는 Figma Make, ChatGPT-to-Figma Slides, image-heavy deck, attached files/libraries, model/mode 선택에 따라 달라질 수 있다. PPT/frontend 작업에서 Figma AI를 쓰기 전 비용 gate가 필요하다.
4. 기존 06:35 OTel source와 07:10 CLI plugin/MCP source는 여전히 유효하지만, 이번 MDM source는 "설정이 어디서 강제되는가"를 새 필드로 추가한다.
5. Threads는 공개 snippet을 확인했지만 1차 출처와 provenance가 약해 discovery-only로 유지했다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Copilot MDM managed settings | GitHub | official changelog | stored-source | medium | source-backed: delivery channels, precedence, supported keys. not checked: Ethan org/device policy |
| Figma AI credits for Make/Slides | Figma | official Help Center | stored-source | medium | source-backed: credit allocation/consumption/tracking. not checked: Ethan plan/seat/balance |
| Copilot OTel managed export | GitHub / VS Code | official changelog/docs | duplicate-supporting | medium-high | existing 06:35 source covers collector/content capture/privacy |
| Copilot usage API review metrics | GitHub | official changelog | duplicate-supporting | medium | existing 06:04 source already adopted review latency/cycles |
| Figma Make kits | Figma | official Help Center | supporting-source | medium | package/private registry/admin scope supports Figma cost gate |
| Figma agent skills | Figma | official blog | supporting-source | medium | team reusable instructions imply privacy/cost review |
| OpenAI Codex release notes | OpenAI | official Help Center/docs | duplicate-currentness | high | existing Codex access/Developer mode notes cover fields |
| NN/g latest index | NN/g | research/practice index | duplicate-no-new-field | medium | design specs/explainability already stored |
| Threads public snippets | Threads | public SNS snippets | deferred-discovery-only | low | not checked: primary source, author/context, durable value |

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-github-copilot-mdm-managed-settings-governance.md`
- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-09-figma-ai-credits-make-slides-cost-gate.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\PPT Frontend Visual Communication Checklist.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: Copilot MDM managed settings source note 1개 추가.
- `30_Knowledge/LLM_Wiki/sources/articles/`: Figma AI credits source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/`: AI agent managed settings gate와 Figma AI cost gate 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source links와 operating rules 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 실행 변경 이력 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue 직접 확인: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `audit-done=8`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot MDM managed settings | knowledge-only / approval-not-ready | No | device policy, registry/file config, permission bypass, plugin/marketplace policy |
| Copilot telemetry block / exporter headers | duplicate-supporting / approval-not-ready | No | collector auth headers, content capture, retention/redaction |
| Figma AI credits for Make/Slides | knowledge-only / approval-not-ready | No | usage cost, credit exhaustion, admin purchase, private context exposure |
| Figma Make kits/private packages | supporting-source / approval-not-ready | No | package source, private registry, org admin scope |
| Figma agent skills | supporting-source / approval-not-ready | No | team prompt/style guide/research note exposure |

## 중복으로 제외한 자료

- GitHub OTel managed export: 기존 06:35 source note가 collector/content capture/retention fields를 이미 흡수했다.
- GitHub usage API review metrics: 기존 06:04 IDE agent governance source가 review latency/cycle metric을 already covered로 다룬다.
- OpenAI Codex Business/Developer mode/currentness: 기존 04:34 source note가 access, seat, Developer mode, plugin sharing, analytics fields를 다룬다.
- Figma Make local codebase and Figma MCP Slides: 02:34/03:35 source notes가 repository/deck/private-context fields를 이미 흡수했다. 이번 note는 비용 gate만 추가했다.
- NN/g latest articles: design specs, AI explanations, UX outcome reporting coverage와 중복.
- Threads snippets: discovery-only, source-backed 승격 불가.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: 에던님 GitHub org/plan, MDM/Intune/Jamf/Group Policy owner, Windows registry policy, file-based `managed-settings.json`, local VS Code/Copilot CLI version, Figma account/plan/seat, monthly AI credit balance, reset date, admin dashboard/API, target Figma file, actual prompt credit usage, Threads primary source.

## 교차 검증 근거

- GitHub MDM changelog를 같은 날 GitHub OTel managed export changelog 및 기존 VS Code/GitHub OTel source note와 대조해 policy channel과 telemetry privacy를 분리했다.
- Figma AI credits Help Center를 Figma Make kits docs 및 Figma agent skills blog와 대조해 Make/Slides/skills의 cost와 context exposure를 분리했다.
- 최근 2-4회 보고서와 LLM Wiki `rg` 검색으로 IDE governance, OTel observability, CLI plugin/MCP, Figma Make/Slides coverage와 중복 여부를 확인했다.
- Threads는 검색 결과 snippet만 확인되어 discovery-only로 유지했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitHub와 Figma 공식 자료의 managed settings channel, precedence, supported setting keys, AI credit allocation, variable consumption, usage tracking, admin usage controls.
- Dex inference: Dex Company checklist에 agent managed settings deployment gate와 Figma AI cost gate를 추가해야 한다는 판단.
- not checked: 에던님 로컬/계정/조직/디바이스/파일/청구/사용량 상태.

## 에던님이 바로 사용할 수 있는 예시

PPT나 frontend 작업에서 Figma AI를 쓰자고 할 때는 아래가 비어 있으면 승인-ready가 아닙니다.

```yaml
figma_ai_cost_gate:
  target_artifact: slides | make_prototype | make_code_handoff | agent_skill
  figma_plan: not_checked
  seat_type: not_checked
  monthly_credit_balance: not_checked
  reset_date: not_checked
  actual_prompt_credit_after_run: not_checked
  attached_files_or_libraries: not_checked
  admin_usage_dashboard_or_api: not_checked
  private_context_exposure_review: not_checked
  decision: approval_not_ready
```

IDE/CLI agent 정책도 아래처럼 "사용자 설정"과 "조직/디바이스 강제 설정"을 분리해 보시면 됩니다.

```yaml
managed_agent_settings_gate:
  target_surface: VS Code | Copilot CLI | both
  delivery_channel: native_mdm | server_managed | file_based | not_checked
  precedence_order_checked: not_checked
  permission_bypass_disabled: not_checked
  enabled_plugins_policy: not_checked
  marketplace_allowlist_policy: not_checked
  telemetry_block_owner: not_checked
  rollback_owner: not_checked
  decision: approval_not_ready
```

## Improvement Delta

- 개선점: 기존 IDE/OTel/CLI plugin governance에 "device-level managed settings delivery channel"을 추가했다.
- 개선점: 기존 Figma Make/Slides handoff checklist에 비용/credit/seat/admin usage gate를 추가했다.
- 중복 방지: Figma Make/Slides와 GitHub OTel을 새 source로 반복 저장하지 않고, 이번에 새 field를 만든 MDM와 AI credits만 좁게 저장했다.

## Adoption Check

- 이전 action item: Copilot/Codex/CLI/MCP/plugin 자료는 기존 Actions token/billing, IDE governance, OTel observability, CLI plugin/MCP coverage를 먼저 확인하고 새 필드가 없으면 duplicate/no-new-signal로 둔다.
- 채택 여부: done.
- 반영 방식: OTel과 CLI plugin/MCP는 중복 처리했고, MDM delivery/preference precedence만 새 source note로 저장했다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser/tools | carried/account-adjacent | carried/account-adjacent with MDM fields adopted | public MDM fields adopted; local org/device/runtime still not checked |
| IDE/CLI agent observability | done/kept separate | done/kept separate | OTel remains separate; this run adds delivery channel governance |
| Storybook/Playwright setup | deferred/project-specific | deferred/project-specific | target repo/package/browser evidence still absent |
| Figma Agent/MCP/Slides/Make/Motion | carried/account-and-file-specific | carried/account-and-file-specific with cost gate adopted | public cost fields adopted; actual account/file/credit not checked |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | snippets only; primary source and provenance weak |
| Obsidian Bases Toolbox | carried/approval-not-ready | carried/approval-not-ready | no new Obsidian plugin audit evidence this run |

## Next Eval

1. preflight를 먼저 실행한다.
2. Copilot managed settings 자료가 다시 나오면 delivery channel, precedence, device policy path, file ownership/symlink, permission bypass, plugin/marketplace policy, telemetry block, rollback 중 새 필드가 있는지 확인한다.
3. Figma AI 자료가 다시 나오면 plan, seat, balance, reset date, prompt cost after run, context materials, admin usage/API, additional credit owner 중 새 필드가 있는지 확인한다.
4. 새 필드가 없으면 report-only no-new-signal로 둔다.

## Prompt Or Template Patch Candidate

```text
++ Before approving IDE/CLI agent managed settings, require operational_scope.diff across delivery channel, precedence, device policy path, managed-settings file ownership/symlink rules, permission bypass disable, model/plugin/marketplace/telemetry policy, rollback owner, and validation command.

++ Before using Figma AI for PPT/frontend output, require plan, seat type, monthly credit balance, reset date, attached context materials, actual prompt credit after run, admin usage dashboard/API owner, additional credit purchase owner, and private context exposure review.
```

## Failure Pattern / Risk

- 반복 패턴: agent governance는 기능 발표보다 "누가 강제 설정하는가"가 더 중요할 때가 있다.
- 반복 패턴: Figma AI는 output quality 신호처럼 보이지만 실제로는 seat, credit, context, admin billing/usage gate가 붙는다.
- 남은 위험: public official source는 제품 동작 근거이지 에던님 로컬/계정/조직 상태의 증거가 아니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-073129.md` |
| internet search | PASS | GitHub/Figma/OpenAI/NN-g/Threads checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki index/source/checklist, queue checked |
| source note schema | PASS | 2 source notes include required metadata and `## Original Content` |
| index/log/checklist update | PASS | links and operating rules added |
| install/connect prohibition | PASS | no install, connector, CLI, MCP, account, registry, MDM, Figma file, billing change |
| source-backed / Dex inference / not checked separation | PASS | Evidence Table and split section |
| status | PASS | `llm-wiki-status.ps1`; source notes 175 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1`; notes checked 190, missing v5 0, high-confidence-without-Bias-Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; local org/device/Figma account/runtime remains not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, public search, duplicate check, source/checklist/index/log updates, no-install discipline, status/lint/audit/UTF-8 checks completed.
- 최고 위험: MDM/managed settings나 Figma AI credits를 local availability 또는 approval-ready 상태로 과장하는 것.
- Not checked: GitHub org/device policy, local registry/config, VS Code/Copilot CLI runtime, Figma plan/seat/credit/admin usage, target file.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 07:38 KST Growth Scan 공개 검색 결과, preflight PASS 결과, GitHub/Figma/OpenAI/NN-g/Threads 공개 자료, 기존 LLM Wiki 중복 확인, 변경 파일 검증 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
