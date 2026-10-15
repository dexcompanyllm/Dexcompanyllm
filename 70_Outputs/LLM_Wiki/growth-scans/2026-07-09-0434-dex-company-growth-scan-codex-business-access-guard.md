---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 04:34 KST"
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
  - "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
  - "https://help.openai.com/en/articles/8801890-managing-workspace-lifecycle-and-migration-in-chatgpt-business"
  - "https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://storybook.js.org/releases/10.4"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/release-notes/"
  - "https://www.nngroup.com/articles/crafting-ai-explanations/"
  - "https://www.w3.org/WAI/news/all/"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료 중 Dex Company 운영 체크리스트를 실제로 바꾸는 항목만 승격하고, 중복·계정별·프로젝트별 신호를 분리하기 위한 보고서."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - codex
  - openai
  - access-governance
---

# Dex Company Growth Scan - 2026-07-09 04:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 04:31-04:34 KST
- 실행 모드: 30분 fast discovery / operational_scope.diff 확인
- 검색 범위: OpenAI ChatGPT/Codex release notes, OpenAI Business workspace lifecycle, Enterprise/Edu release notes, GitHub Copilot July changelog, Storybook 10.4, Obsidian changelog, Figma release notes/MCP posts, NN/g AI explainability, W3C WAI news.
- 변경 범위: source note 1개, Task Checklist 1개, LLM Wiki index/log, growth scan report 1개.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 12 | web search/open result 기준 주요 public source/candidate |
| stored.count | 1 | OpenAI Codex Business access/source note 1개 |
| duplicate.count | 8 | GitHub browser tools/app/billing, Storybook 10.4, Figma agent/MCP/Slides, NN/g explainability, W3C/Obsidian currentness |
| deferred.count | 4 | GitHub Copilot account/runtime, Figma account/file/connector, Storybook target repo, Threads/social discovery |
| blocked.count | 0 | preflight FAIL, 접근 차단, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-report lint 결과 기준 |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-043147.md`
- free RAM: 1.3GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Business workspace lifecycle 문서가 Codex seat availability를 2026-06-24 기준으로 나누고 있어, Codex 사용 가능 여부를 plan/workspace/seat type으로 분리해야 한다.
2. OpenAI ChatGPT release notes의 2026-06-11 Codex updates는 Plus/Pro rate-limit reset banking, Developer mode, `/init`, usage-limit guidance를 한 묶음으로 보여준다. Developer mode는 permission-sensitive browser inspection mode로 다뤄야 한다.
3. Enterprise/Edu release notes는 Codex analytics와 plugin sharing이 workspace/admin policy 영역임을 확인시킨다. 로컬 앱 존재만으로 팀 공유 가능 여부를 판단하면 안 된다.
4. GitHub/Figma/Storybook/NN-g/W3C 신호는 최신성이 있지만 기존 source note와 최근 보고서가 이미 핵심 운영 필드를 커버한다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Codex Business access, limits, Developer mode | OpenAI | official help docs | stored-source | high | source-backed: seat/access/rate-limit/developer-mode/admin-policy docs. Dex inference: precheck fields. not checked: Ethan actual plan/workspace |
| ChatGPT Voice GPT-Live-1 | OpenAI | official release notes | deferred/no-target | medium | source-backed: voice model rollout. not checked: target voice UI; existing COGA AI conversation QA covers generic fields |
| GitHub Copilot browser tools/app | GitHub | official changelog | duplicate/carried | high | existing source covers browser permission and account/runtime remains not checked |
| Storybook 10.4 | Storybook | official release | deferred/project-specific | medium | existing Storybook coverage; target repo dependency delta not checked |
| Figma release notes / agent skills / MCP Slides | Figma | official vendor docs | duplicate/account-specific | medium | existing Figma source notes cover skills, MCP Slides, Make/codebase |
| NN/g AI explanations | NN/g | research/practice article | duplicate-source | medium | existing source note covers enterprise AI explainability by role |
| W3C WAI news/currentness | W3C | official standards/news | duplicate/currentness | high | existing WCAG/WAI/COGA checklist fields sufficient |
| Obsidian changelog | Obsidian | official changelog | duplicate/currentness | high | existing Obsidian source notes and no-new-signal reports sufficient |

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-openai-codex-business-access-limits-developer-mode.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0434-dex-company-growth-scan-codex-business-access-guard.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: OpenAI Codex Business access/source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: Codex access/seat/runtime precheck 섹션 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source note와 Codex access precheck 운영 규칙 링크 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 04:34 실행 항목 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue: 직접 확인 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Codex Developer mode | permission-sensitive runtime mode, project/task specific | No | browser console/network/DOM/style/performance data exposure |
| Codex plugin sharing | approval-not-ready/workspace-admin-specific | No | private context exposure, plugin provenance, workspace sharing policy |
| Business Codex seat changes | not an install; admin/access risk | No | ChatGPT workspace access/history visibility risk |
| GitHub Copilot app/browser tools | carried/account-adjacent | No | account/org policy, browser data scope, billing |
| Figma Agent/MCP/Slides/Make | carried/account-and-file-specific | No | workspace/file permission, connector scope, private context exposure |
| Storybook 10.4 setup | deferred/project-specific | No | dependency/config mutation, generated tests, CI/browser runtime |

## 중복으로 제외한 자료

- GitHub Copilot browser tools GA: 기존 source note와 중복.
- GitHub Copilot app/billing/session metrics: 기존 GitHub governance/source notes와 2026-07-09 최근 보고서들이 account-adjacent로 처리.
- Storybook 10.4: 기존 보고서에서 deferred/project-specific 처리.
- Figma agent skills/MCP/Slides/Make: 기존 Figma agent skills, Make codebase, MCP Slides source notes와 중복.
- NN/g AI explainability: 기존 `2026-07-04-nngroup-ai-explainability-enterprise-roles.md`와 중복.
- W3C/WAI currentness: 기존 PPT/frontend checklist의 WCAG/COGA fields로 충분.
- Obsidian changelog: 기존 Obsidian source notes와 no-new-signal reports로 충분.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: 에던님의 실제 OpenAI plan/workspace, Business Codex seat 상태, rate-limit reset bank 표시 여부, local Codex Developer mode toggle, Enterprise/Edu plugin sharing/admin analytics, GitHub/Figma account/org policy, Storybook target repo.
- 부분 확인: OpenAI Help Center 공식 문서의 plan/workspace 정책은 확인했지만, 이것을 에던님 계정의 현재 권한으로 확정하지 않았다.

## 교차 검증 근거

- OpenAI ChatGPT release notes와 Business workspace lifecycle docs를 교차 확인해 Codex access가 plan/workspace/seat에 종속됨을 확인했다.
- Enterprise/Edu release notes로 Codex analytics와 plugin sharing이 workspace/admin policy 영역임을 대조했다.
- 기존 Dex Company Approval-Ready Install Audit Model과 Task Checklist가 이미 account/workspace, permission, billing, rollback, validation을 요구하므로, 이번 source는 그 구조에 Codex-specific fields를 추가하는 방식으로 흡수했다.
- GitHub/Figma/Storybook/NN-g/W3C 항목은 기존 source notes와 최근 2-4회 보고서에 대해 `rg` 중복 검색을 수행했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: OpenAI official Help Center pages, GitHub changelog, Storybook release page, Figma release/blog pages, NN/g article page, W3C WAI news page를 확인했다.
- Dex inference: Codex work precheck에 `plan_workspace`, `business_codex_seat_grandfathered_before_2026_06_24`, `current_seat_type`, `workspace_history_visibility_risk`, `developer_mode_state`, `plugin_sharing_state`, `codex_admin_analytics_available`를 넣어야 다음 실행 판단이 안전해진다.
- Not checked: 실제 에던님 계정과 워크스페이스 상태, 로컬 앱 toggle, admin console, billing, usage-limit UI는 확인하지 않았다.

## 에던님이 PPT 또는 Frontend 작업에서 바로 사용할 수 있는 예시

```yaml
codex_access_precheck:
  plan_workspace: not_checked
  current_seat_type: not_checked
  rate_limit_reset_bank_available: not_checked
  usage_limit_reset_timing_visible: not_checked
  developer_mode_state: off
  developer_mode_scope_needed: console | network | dom_styles
  plugin_sharing_state: not_checked
  decision: proceed_local_only | request_admin_check | do_not_claim_availability
```

실무 의미: 브라우저 QA에서 Developer mode가 필요해도 "켜도 된다"가 아니라, 어떤 페이지의 어떤 console/network/DOM 증거가 필요한지 먼저 쓰고 켜야 한다.

## Improvement Delta

- 개선된 운영 규칙: Codex 기능 currentness를 local availability로 바로 해석하지 않고, plan/workspace/seat/usage-limit/runtime mode/admin policy로 쪼개 확인한다.
- checklist 변경: Codex/OpenAI 작업 시작 체크리스트에 Business Codex seat, rate-limit reset, Developer mode, plugin sharing, analytics fields를 추가했다.
- no-op discipline 유지: GitHub/Figma/Storybook/NN-g/W3C 항목은 최신성이 있어도 기존 source coverage와 구체 operational_scope.diff가 없으면 중복/보류로 처리했다.

## Adoption Check

- 이전 action item: "currentness/social 신호는 operational_scope.diff가 있을 때만 source note로 저장한다."
- 채택 여부: done.
- 이번 적용: OpenAI Codex Business access는 새 checklist fields를 만들었으므로 저장했고, GitHub/Figma/Storybook/NN-g/W3C는 새 field가 없어 저장하지 않았다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent | Ethan GitHub plan/org/runtime 확인 전 adoption 불가 |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, package delta, generated test, browser/CI output 없음 |
| Figma Agent/MCP/Slides/Make | carried/account-and-file-specific | carried/account-and-file-specific | live Figma account/file/connector evidence 없음 |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | source-backed로 승격할 primary confirmation 없음 |
| OpenAI Codex access/limits | not previously stored | done/adopted-narrow-field | Business seat/access/Developer mode fields가 checklist를 실제로 바꿈 |

## Next Eval

1. preflight를 먼저 통과한다.
2. OpenAI/Codex 신호는 `plan/workspace/seat/runtime/admin policy` 중 어떤 필드를 바꾸는지 먼저 확인한다.
3. GitHub/Figma/Storybook 반복 신호는 target account/repo/file이 없으면 carried/deferred로 둔다.
4. 새 source note는 checklist field, approval field, QA field, acceptance test 중 하나를 실제로 추가할 때만 만든다.
5. Threads는 primary source 교차 검증 전까지 discovery-only로 둔다.

## Prompt Or Template Patch Candidate

```text
When Codex/OpenAI access or feature availability appears in a public release note, do not treat it as local availability. First split it into plan/workspace, seat type, usage-limit/reset surface, runtime mode, admin policy, billing, and local app version. Store a source note only if the split creates a new checklist or approval field.
```

## Failure Pattern / Risk

- 반복 위험: OpenAI/GitHub/Figma의 빠른 release note가 실제 계정/조직/runtime 증거 없이 adoption 신호처럼 보일 수 있다.
- 이번 대응: official docs는 source-backed로 저장하되, 에던님 계정 상태는 `not checked`로 분리했다.
- 남은 위험: OpenAI Help Center 정책이 이후 바뀔 수 있으므로 실제 접근/seat 판단 전에는 최신 문서를 다시 확인해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-043147.md` |
| internet search | PASS | OpenAI/GitHub/Figma/Storybook/Obsidian/W3C/NN-g public sources checked |
| duplicate check | PASS | `rg` searches across LLM Wiki sources/inbox/reports |
| source note schema | PASS | required v5 fields and `## Original Content` included |
| index/log update | PASS | source note and run entry added |
| install/connect prohibition | PASS | no install, connector, SDK, MCP, browser extension, token, billing change |
| status | PASS | post-change status check completed |
| lint | PASS | post-change lint completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | post-change audit completed; unexplored backlog remains |
| UTF-8 check | PASS | changed Markdown files scanned for replacement character |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; actual account/runtime state remains not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, source-backed official OpenAI docs, duplicate checks, no-install discipline, report schema, status/lint/audit/UTF-8 checks 완료.
- 최고 위험: OpenAI 문서상 가능성을 에던님 계정의 현재 권한으로 오해하면 안 된다.
- Not checked: 실제 OpenAI plan/workspace/seat, local Developer mode, admin console, plugin sharing, rate-limit reset UI.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 04:34 KST Growth Scan 공개 검색 결과, OpenAI Help Center 공식 문서, GitHub/Figma/Storybook/Obsidian/W3C/NN-g 공개 자료, 기존 LLM Wiki source/report 중복 확인, preflight PASS 결과를 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목, Dex Company 운영 반영점만 보존했다.
