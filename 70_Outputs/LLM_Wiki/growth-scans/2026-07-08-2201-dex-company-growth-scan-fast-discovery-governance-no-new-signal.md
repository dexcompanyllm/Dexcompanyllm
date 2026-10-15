---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-08 22:01 KST"
created: 2026-07-08
updated: 2026-07-08
dateCreated: 2026-07-08
dateModified: 2026-07-08
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-08
verifiedBy: Dex
disputed: false
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/deprecations"
  - "https://github.blog/changelog/2026-07-07-add-review-cycles-and-time-to-adoption-phases-in-the-usage-api/"
  - "https://github.blog/changelog/2026-07-07-per-user-budgets-for-cost-centers-in-the-billing-ui/"
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://www.nngroup.com/videos/what-are-design-specs/"
  - "https://www.nngroup.com/articles/creating-design-specs-for-development/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.jobscan.co/blog/auto-apply-job-tools/"
collectionPurpose: "22:30 daily adoption selection 전 30분 fast discovery 회차에서 최신 공개 신호를 확인하고, 기존 LLM Wiki coverage와 중복되는지 재판정한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-08 22:01 KST

## Run Scope and Limits

- 실행 시각: 2026-07-08 22:01-22:08 KST
- 실행 모드: 30분 fast discovery / candidate detection. 22:30 daily adoption selection 전이므로 durable source/wiki/checklist 변경은 하지 않았다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot usage/billing/app, NN/g design specs, Storybook agent/frontend QA, Figma Agent skills/custom tools, Obsidian changelog, W3C WAI, Jobscan career ops.
- 변경 범위: 이 growth scan report 1개만 추가했다.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 12 | public web search query 12개와 로컬 duplicate search 수행 |
| stored.count | 0 | 새 source/wiki/inbox note 없음 |
| duplicate.count | 11 | OpenAI Codex/API, GitHub usage/billing/model/app, Storybook, Figma Agent, Obsidian, W3C WAI, Jobscan은 기존 coverage와 중복 |
| deferred.count | 4 | NN/g design specs, GitHub Copilot app, Storybook 10.4 setup, Figma Agent skills/custom tools |
| blocked.count | 0 | preflight PASS, 접근 차단 없음 |
| lint.warning_count | 0 | 사후 `llm-wiki-lint.ps1` PASS 기준 |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-220146.md`
- free RAM: 1.25GB, 기준 1GB 이상
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS
- 운영 리스크: free RAM이 기준은 넘었지만 여유가 얇다. 다음 실행도 preflight-first가 필요하다.

## 오늘의 핵심 발견

1. GitHub Copilot usage metrics API는 2026-07-07 기준 adoption phase별 review latency와 review cycle count를 추가했다. Dex Company에는 "AI 도입 효과를 merge count만으로 보지 말고 review 대기/반복도 함께 본다"는 방향을 주지만, 기존 Copilot usage metrics source note가 이미 metric version, telemetry coverage, billing attribution을 요구하므로 새 note를 만들지는 않는다.
2. GitHub cost center per-user budget UI도 2026-07-07 공개 신호다. 다만 기존 AI credit pools source note가 cost center, included pool cap, overage policy, billing owner를 이미 갖고 있어 duplicate/currentness check로 처리한다.
3. OpenAI API deprecations의 2026-07-02 fine-tuning 제한은 여전히 중요하지만, 20:32 회차와 기존 API deprecation lane에서 이미 currentness check가 끝난 항목이다.
4. NN/g design specs 후보는 2026 영상과 2025 detailed article 근거가 유지된다. 지금은 22:30 전이라 `PPT Frontend Visual Communication Checklist` 수정 없이 `carried-for-22:30-checklist-decision`으로 둔다.
5. Storybook/Figma/GitHub app 후보는 실제 repo/account/workspace/runtime 없이는 adoption이 아니라 approval-packet 후보일 뿐이다.

## Evidence Table

| Candidate | Publisher | Type | Status | Evidence Quality | Dex Company 사용 예시 |
|---|---|---|---|---|---|
| Copilot usage API review metrics | GitHub | official changelog | duplicate-currentness | high | AI adoption 효과를 review latency, review cycles, merge-count와 함께 추적 |
| Copilot cost center per-user budgets | GitHub | official changelog | duplicate-currentness | high | agent 비용 승인 시 user budget, cost center, billing owner 확인 |
| OpenAI API deprecations fine-tuning update | OpenAI | official docs | duplicate-source | high | OpenAI API 설계 전 deprecation/currentness check 유지 |
| GitHub Copilot app available to all | GitHub | official changelog | carried/account-adjacent | high | account/plan/org policy/local install 전 adoption 금지 |
| NN/g What are Design Specs? + Creating Design Specs for Development | NN/g | video + article | carried-for-22:30-checklist-decision | medium-high | PPT/frontend handoff에서 layout, interaction, requirement, scope, behavior, appearance, functionality 누락 확인 |
| Storybook 10.4 automated setup with agents | Storybook | official blog | deferred/project-specific | medium | target repo, config diff, test command, rollback이 있을 때만 adoption 판단 |
| Figma Agent skills/custom tools | Figma | official vendor blog | duplicate/account-adjacent | medium | workspace/file/connector/billing 승인 패킷 전에는 지식 후보로만 유지 |
| Obsidian changelog | Obsidian | official changelog | duplicate/no-new-signal | high | Vault 운영 변화 감시. 이번 회차 새 운영 규칙 없음 |
| W3C WAI news | W3C | standards/news | duplicate/no-new-signal | high | 기존 WCAG/WAI 기반 PPT/frontend QA checklist coverage 유지 |
| Jobscan auto-apply tools | Jobscan | vendor article | already rejudged | medium-low | 자동 제출 금지, 사람 검토 후 제출 게이트 유지 |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-08-2201-dex-company-growth-scan-fast-discovery-governance-no-new-signal.md`

## LLM Wiki inbox/source/wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- `00_Inbox/LLM_Wiki/ai-research/2026-07-03-10x-growth-scan-candidate-queue.md`: 변경 없음. 직접 확인 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot app | carried/account-adjacent | No | GitHub account, plan, organization policy, local install, telemetry, cost/billing |
| Storybook 10.4 automated setup | project-specific conditional | No | package/config overwrite, generated story quality, a11y/runtime test, rollback |
| Figma Agent skills/custom tools | approval-not-ready/account-adjacent | No | workspace/file permission, sensitive design context, prompt injection, connector scope, billing |
| GitHub Copilot usage/billing APIs | knowledge-only duplicate | No | Enterprise/organization role, billing data, personal/team usage data, API permission, cost setting mutation |
| Jobscan Auto Apply | blocked/dropped for auto-submit; carried only for human-review autofill | No | platform ToS, account restriction, personal data disclosure, vendor bias |

## 중복으로 제외한 자료

- OpenAI Codex changelog: 기존 Codex changelog/source coverage와 중복.
- OpenAI API deprecations: 기존 API migration/deprecation lane과 중복. fine-tuning update는 이미 20:32 report와 이전 currentness check에서 다뤘다.
- GitHub Copilot usage metrics review fields: 기존 `GitHub Copilot usage metrics coverage update` note와 같은 측정/telemetry governance 계열.
- GitHub Copilot per-user cost center budgets: 기존 `GitHub Copilot AI credit pools for cost centers` note와 같은 cost governance 계열.
- GitHub Kimi K2.7 Business/Enterprise availability: 기존 Kimi model governance note와 중복.
- Storybook 10.3/10.4: 기존 Storybook MCP/component/a11y/agent setup notes와 중복.
- Figma Agent/custom tools/skills: 기존 Figma Agent/MCP/approval-ready notes와 중복.
- Obsidian changelog: 기존 Obsidian 1.13/Bases/CLI coverage와 중복.
- W3C WAI/WCAG: 기존 PPT/frontend accessibility checklist와 중복.
- Jobscan auto-apply: 20:32 보고서에서 플랫폼 정책과 교차 검증 후 이미 재판정.

## 실패/차단/미확인 항목

- Not checked: GitHub Copilot usage/billing API 실제 호출, Ethan GitHub plan/organization role, billing UI 접근권한, 실제 비용 데이터.
- Not checked: GitHub Copilot app local runtime, Ethan GitHub plan, organization policy, telemetry/cost setting.
- Not checked: Figma workspace/file/connector/billing context, custom tool runtime, design file sensitivity.
- Not checked: Storybook 10.4 generated config diff and test output in a real frontend repo.
- Partial: NN/g 2026 design specs 영상은 공개 summary와 2025 article로 교차 확인했지만 full transcript는 확인하지 않았다.
- Not checked: Threads는 이번 회차에서 source-backed evidence로 쓰지 않았다.
- Blocked: 없음.

## 교차 검증 근거

- GitHub usage metrics review fields는 GitHub 2026-07-07 changelog와 기존 LLM Wiki의 Copilot usage metrics coverage note를 대조했다.
- GitHub per-user cost center budgets는 GitHub 2026-07-07 changelog와 기존 AI credit pools/cost center source note를 대조했다.
- OpenAI API fine-tuning 제한은 OpenAI official deprecations page와 기존 OpenAI API deprecation lane을 대조했다.
- NN/g design specs는 2026 영상 summary와 2025 detailed article을 교차 확인했다.
- Storybook agent setup은 Storybook 10.4 automated setup post와 Storybook 10.3 MCP/a11y post를 교차 확인했다.
- Figma Agent skills는 custom tools/context post와 skills collaboration post를 교차 확인했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: GitHub usage metrics API의 review latency/review cycle fields, cost center per-user budgets, OpenAI fine-tuning deprecation update, GitHub Copilot app availability, NN/g design specs 범위, Storybook/Figma agent setup 방향은 공개 source로 확인했다.
- Dex inference: Dex Company에서는 AI adoption 성과를 단순 사용량이나 merge count가 아니라 review latency, review cycles, cost owner, budget scope와 함께 봐야 한다.
- Not checked: 실제 Ethan 계정/조직/파일/저장소/런타임에서 GitHub Copilot app, usage API, billing UI, Figma Agent, Storybook 10.4 setup을 사용할 수 있는지는 확인하지 않았다.

## 에던님이 바로 사용할 수 있는 예시

- PPT/frontend handoff 예시: 화면 또는 슬라이드마다 `layout`, `interaction`, `requirement`, `scope`, `behavior`, `appearance`, `functionality`, `dev issue context`를 1줄씩 채우고 비어 있는 줄을 보완 대상으로 표시한다.
- AI tool adoption metric 예시: GitHub/Codex 계열 agent를 팀에 붙일 때 `usage.count`, `merge.count`만 보지 말고 `review_latency`, `review_cycles`, `cost_center`, `per_user_budget`, `billing_owner`를 함께 기록한다.
- Frontend QA 예시: Storybook agent setup은 target repo, package manager, generated config diff, story coverage, accessibility test command, rollback command가 있어야 adoption 후보로 본다.
- Career ops 예시: 자동지원 도구는 `auto-submit`, `auto-fill`, `resume tailoring`, `tracking-only`로 분류하고 `auto-submit`은 기본적으로 blocked/dropped로 둔다.

## Improvement Delta

- 개선된 점: GitHub의 2026-07-07 usage/billing 신호를 새 source note로 과잉 저장하지 않고, 기존 cost/metric governance notes가 충분한지 대조했다.
- 운영 규칙 변경: 없음. 다만 다음 실제 agent adoption 평가에서는 review latency/review cycles를 "성과 지표 후보"로 떠올릴 수 있다.
- 템플릿 학습: 30분 fast discovery 회차에서는 "새로운 공식 changelog"라도 기존 source note가 이미 같은 approval/QA field를 담고 있으면 currentness check로만 처리한다.

## Adoption Check

- 이전 action item: 22:30 adoption selection이 오면 NN/g design specs를 `PPT Frontend Visual Communication Checklist`에 handoff context fields로 반영할지 결정한다.
- 채택 여부: carried.
- 이유: 현재는 22:01 fast discovery 회차다. 공개 근거는 유지되지만 daily adoption selection 전 durable checklist 변경을 하지 않는다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| NN/g What are Design Specs? | carried-for-22:30-checklist-decision | carried-for-22:30-checklist-decision | 2026 영상 + 2025 article 근거 유지. adoption selection 전이라 보류 |
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | availability는 유지되지만 account/plan/org/local runtime 미확인 |
| GitHub usage/billing governance | duplicate-source | duplicate-currentness | review/budget 신호가 새로 보였지만 기존 metric/cost governance source notes가 운영 필드를 이미 포함 |
| Storybook 10.4 setup | deferred/project-specific | deferred/project-specific | existing coverage와 중복. target repo approval packet 필요 |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | 기존 Figma Agent/MCP 기준과 중복, 계정/파일 권한 미확인 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. `growth-scan-preflight.ps1 -RepairSafe`를 먼저 실행하고 free RAM 1GB 이상을 확인한다.
2. 22:30 adoption selection 회차라면 NN/g design specs를 checklist에 반영할지 결정한다. 반영한다면 handoff context field를 하나만 작게 추가한다.
3. GitHub/Figma/Storybook agent 후보는 availability가 아니라 target, permission, config diff, test command, rollback, account/billing이 채워졌는지로 판단한다.
4. GitHub usage/billing 신호는 새 note보다 기존 cost/metric governance notes의 currentness check로 처리한다. 실제 조직/계정 맥락이 생기면 API/billing UI 확인은 별도 승인 후 수행한다.

## Prompt or Template Patch Candidate

후보 문구:

```text
For agent adoption and billing candidates, do not promote a new source note solely because a vendor changelog added a metric or budget UI. First compare it with existing cost, telemetry, and approval fields. Promote only when it adds a new decision field, acceptance test, or approval requirement.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-220146.md` |
| internet search | PASS | web search query 12개, official/source pages 확인 |
| duplicate check | PASS | automation memory, recent reports, candidate queue, LLM Wiki index/log/source coverage 검색 |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log/candidate queue 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package execution |
| source-backed / Dex inference / not checked 분리 | PASS | 별도 섹션에 분리 |
| status | PASS | source notes 160, wiki notes 7, status check completed |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 175, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | replacement character 없음 |
| watchdog | PASS_WITH_WARNINGS | no unauthorized install/write; RAM margin and account/project-adjacent candidates remain |

## Watchdog 결과

- Verdict: PASS_WITH_WARNINGS
- Highest risk: GitHub usage/billing changelog가 새롭다는 이유만으로 기존 cost/metric governance coverage를 중복 저장하거나, 실제 계정/조직 권한 없이 adoption 가능으로 오해하는 것.
- Rework needed: 없음.
- Not checked: GitHub Copilot usage API, billing UI, Copilot app local runtime, Ethan GitHub/Figma account policy, Storybook 10.4 generated config diff, NN/g 2026 video full transcript.

## Original Content

이번 보고서는 2026-07-08 22:01 KST Growth Scan 공개 검색 결과, preflight PASS 결과, 기존 LLM Wiki 중복 확인, GitHub usage/billing currentness check, NN/g design specs 후보 유지, GitHub/Figma/Storybook account/project-adjacent 후보 재판정을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
