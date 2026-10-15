---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-08 21:32 KST"
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
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://github.blog/changelog/"
  - "https://www.nngroup.com/videos/what-are-design-specs/"
  - "https://www.nngroup.com/articles/creating-design-specs-for-development/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.jobscan.co/blog/auto-apply-job-tools/"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 신호를 확인하고, 기존 LLM Wiki coverage와 중복되는지 판단하며, 22:30 adoption selection 전 durable 흡수를 보류할 항목을 분리한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-08 21:32 KST

## Run Scope and Limits

- 실행 시각: 2026-07-08 21:30-21:40 KST
- 실행 모드: 30분 fast discovery / candidate detection. 22:30 daily adoption selection 전이므로 durable source/wiki/checklist 변경은 하지 않았다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot, NN/g design specs, Storybook agent/frontend QA, Figma Agent skills/custom tools, Obsidian changelog, W3C WAI, Jobscan career ops.
- 변경 범위: 이 growth scan report 1개만 추가했다.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 8 | web search query 8개와 로컬 duplicate search 수행 |
| stored.count | 0 | 새 source/wiki/inbox note 없음 |
| duplicate.count | 10 | OpenAI Codex, GitHub Copilot app, GitHub Copilot governance, Storybook 10.3/10.4, Figma Agent, Obsidian, W3C WAI, Jobscan auto-apply, Next.js/Figma 기존 coverage |
| deferred.count | 4 | NN/g design specs, GitHub Copilot app, Storybook 10.4 setup, Figma Agent skills/custom tools |
| blocked.count | 0 | preflight PASS, 접근 차단 없음 |
| lint.warning_count | 0 | 사후 `llm-wiki-lint.ps1` PASS 기준 |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-213046.md`
- free RAM: 1.21GB, 기준 1GB 이상
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS
- 운영 리스크: free RAM 여유가 크지 않으므로 다음 회차도 preflight-first가 필요하다.

## 오늘의 핵심 발견

1. GitHub Copilot app은 2026-07-07 기준 모든 Copilot plan에 공개되었고 Windows/macOS/Linux를 언급한다. 하지만 GitHub 계정, plan, organization policy, local install, telemetry/cost policy가 확인되지 않아 Dex Company에서는 계속 `carried/account-adjacent`로 둔다.
2. NN/g "What are Design Specs?"는 2026-07-06 영상 신호이고, 2025 detailed article과 함께 보면 design-to-dev handoff에서 layout, interactions, requirements, project scope, behavior/appearance/functionality를 명시해야 한다는 근거가 강화된다. 다만 지금은 22:30 adoption selection 전이므로 checklist 변경은 보류한다.
3. Storybook 10.4와 10.3은 agent가 실제 components, stories, docs, tests, accessibility checks를 써야 한다는 기존 frontend QA 방향과 일치한다. 새 운영 필드보다는 target repo, config diff, test command, rollback이 있는 project-specific approval packet이 먼저다.
4. Figma Agent skills/custom tools는 팀 컨텍스트를 skill로 재사용한다는 신호를 강화하지만, 기존 Figma Agent/MCP approval-ready 기준의 account/file/workspace/billing 리스크를 바꾸지 않는다.
5. Obsidian, W3C WAI, Jobscan auto-apply 신호는 직전 보고서와 기존 LLM Wiki coverage를 넘는 새 운영 규칙을 만들지 않았다.

## Evidence Table

| Candidate | Publisher | Type | Status | Evidence Quality | Dex Company 사용 예시 |
|---|---|---|---|---|---|
| GitHub Copilot app available to all | GitHub | official changelog | carried/account-adjacent | high | GitHub desktop agent 비교 후보. 계정/조직/비용/설치 검증 전 adoption 금지 |
| NN/g What are Design Specs? + Creating Design Specs for Development | NN/g | video + article | carried-for-22:30-checklist-decision | medium-high | PPT/frontend handoff에서 layout, interaction, requirement, scope, behavior, appearance, functionality 누락 확인 |
| Storybook 10.4 automated setup with agents | Storybook | official blog | deferred/project-specific | medium | 실제 frontend repo에서 generated config, stories, a11y tests, rollback 명령까지 확인할 때만 adoption |
| Storybook 10.3 MCP/a11y improvements | Storybook | official blog | duplicate-source | medium-high | 기존 component/a11y QA 기준과 중복 |
| Figma Agent custom tools/context/skills | Figma | official vendor blog | duplicate/account-adjacent | medium | Figma workspace/file/connector/billing 승인 패킷 전에는 지식 후보로만 유지 |
| OpenAI Codex changelog | OpenAI | official docs | duplicate-source | high | Codex task management 변화 감시. 이번 회차 새 운영 규칙 없음 |
| Obsidian changelog | Obsidian | official changelog | duplicate/no-new-signal | high | Vault 운영 변화 감시. 이번 회차 새 변경점 없음 |
| W3C WAI news | W3C | standards/news | duplicate/no-new-signal | high | 기존 WCAG/WAI 기반 PPT/frontend QA checklist coverage 유지 |
| Jobscan auto-apply tools | Jobscan | vendor article | already rejudged: auto-submit dropped, human-review autofill carried | medium-low | career ops에서 자동 제출 금지, 사람 검토 후 제출 게이트 유지 |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-08-2132-dex-company-growth-scan-fast-discovery-no-new-signal.md`

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
| GitHub Copilot app | carried/account-adjacent | No | GitHub account, plan, org policy, local install, telemetry, cost/billing |
| Storybook 10.4 automated setup | project-specific conditional | No | package/config overwrite, generated story quality, a11y/runtime test, rollback |
| Figma Agent skills/custom tools | approval-not-ready/account-adjacent | No | workspace/file permission, sensitive design context, prompt injection, connector scope, billing |
| Jobscan Auto Apply | blocked/dropped for auto-submit; carried only for human-review autofill | No | platform ToS, account restriction, personal data disclosure, vendor bias |

## 중복으로 제외한 자료

- OpenAI Codex changelog: 기존 Codex changelog/source coverage와 중복.
- GitHub Copilot governance/changelog: 기존 token, metrics, billing, session streaming, app availability coverage와 중복.
- Storybook 10.3/10.4: 기존 Storybook MCP/component/a11y/agent setup notes와 중복.
- Figma Agent/custom tools/skills: 기존 Figma Agent/MCP/approval-ready notes와 중복.
- Obsidian changelog: 기존 Obsidian 1.13/Bases/CLI coverage와 중복.
- W3C WAI/WCAG: 기존 PPT/frontend accessibility checklist와 중복.
- Jobscan auto-apply: 직전 20:32 보고서에서 플랫폼 정책과 교차 검증 후 이미 재판정.

## 실패/차단/미확인 항목

- Not checked: GitHub Copilot app local runtime, Ethan GitHub plan, organization policy, telemetry/cost setting.
- Not checked: Figma workspace/file/connector/billing context, custom tool runtime, design file sensitivity.
- Not checked: Storybook 10.4 generated config diff and test output in a real frontend repo.
- Partial: NN/g 2026 design specs 영상은 공개 summary와 2025 article로 교차 확인했지만 full transcript는 확인하지 않았다.
- Not checked: Threads는 이번 회차에서 source-backed evidence로 쓰지 않았다.
- Blocked: 없음.

## 교차 검증 근거

- NN/g design specs는 2026 영상 summary와 2025 detailed article을 교차 확인했다.
- Storybook agent setup은 10.4 automated setup post와 10.3 MCP/a11y post를 교차 확인했다.
- GitHub Copilot app은 July 7 changelog와 GitHub changelog/copilot label 목록을 교차 확인했다.
- Figma Agent skills는 custom tools/context post와 skills collaboration post를 교차 확인했다.
- Jobscan auto-apply 판단은 직전 회차에서 Jobscan vendor article과 LinkedIn/Indeed official policy를 교차 확인한 판단을 유지했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: GitHub Copilot app availability, NN/g design specs의 핵심 범위, Storybook agent/component/a11y 방향, Figma Agent skills/custom tools 존재, Obsidian/W3C pages existence는 공개 source로 확인했다.
- Dex inference: Dex Company에서는 design-to-dev handoff를 design file 하나로 보지 말고 layout, interaction, requirement, scope, behavior, appearance, functionality, development issue context로 나누어야 한다.
- Not checked: 실제 Ethan 계정/조직/파일/저장소/런타임에서 GitHub Copilot app, Figma Agent, Storybook 10.4 setup을 사용할 수 있는지는 확인하지 않았다.

## 에던님이 바로 사용할 수 있는 예시

- PPT/frontend handoff 예시: 화면 또는 슬라이드마다 `layout`, `interaction`, `requirement`, `scope`, `behavior`, `appearance`, `functionality`, `dev issue context`를 1줄씩 채우고, 비어 있는 줄이 있으면 개발 착수 전 보완 대상으로 표시한다.
- Frontend QA 예시: Storybook agent setup을 쓰고 싶다면 먼저 target repo, package manager, generated config diff, story coverage, accessibility test command, rollback command를 승인 패킷으로 만든다.
- Career ops 예시: 자동지원 도구는 `auto-submit`, `auto-fill`, `resume tailoring`, `tracking-only`로 먼저 분류하고, `auto-submit`은 기본적으로 blocked/dropped로 둔다.

## Improvement Delta

- 개선된 점: 직전 21:01 회차의 NN/g design specs carried 판단을 유지하되, 22:30 adoption selection 전에는 checklist를 수정하지 않는 fast discovery discipline을 지켰다.
- 운영 규칙 변경: 없음. 새 source note는 concrete operating rule, approval field, QA field, artifact acceptance test를 실제로 바꿀 때만 만든다는 기준을 유지했다.
- 템플릿 학습: account-adjacent agent tool은 availability보다 approval packet completeness가 우선이다.

## Adoption Check

- 이전 action item: 22:30 adoption selection이 오면 NN/g design specs를 `PPT Frontend Visual Communication Checklist`에 handoff context fields로 반영할지 결정한다.
- 채택 여부: carried.
- 이유: 현재는 21:32 fast discovery 회차다. 공개 근거는 충분히 후보성이 있지만 daily adoption selection 전 durable checklist 변경을 하지 않는다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| NN/g What are Design Specs? | carried-for-22:30-checklist-decision | carried-for-22:30-checklist-decision | 2026 영상 + 2025 article 근거 유지. adoption selection 전이라 보류 |
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | availability는 강화됐지만 account/plan/org/local runtime 미확인 |
| Storybook 10.4 setup | deferred/project-specific | deferred/project-specific | existing coverage와 중복. target repo approval packet 필요 |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | 기존 Figma Agent/MCP 기준과 중복, 계정/파일 권한 미확인 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. `growth-scan-preflight.ps1 -RepairSafe`를 먼저 실행하고 free RAM 1GB 이상을 확인한다.
2. 22:30 adoption selection 회차라면 NN/g design specs를 checklist에 반영할지 결정한다. 반영한다면 handoff context field를 하나만 작게 추가한다.
3. GitHub/Figma/Storybook agent 후보는 availability가 아니라 target, permission, config diff, test command, rollback, account/billing이 채워졌는지로 판단한다.
4. 새 source note는 concrete operating rule, approval field, QA field, artifact acceptance test 중 하나가 바뀔 때만 만든다.

## Prompt or Template Patch Candidate

후보 문구:

```text
For design-to-dev handoff candidates, adoption is only ready when the handoff captures layout, interaction, requirements, scope, behavior, appearance, functionality, and development issue context. A design file link alone is not enough.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-213046.md` |
| internet search | PASS | web search query 8개, official/source pages 확인 |
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
- Highest risk: fast discovery 회차에서 adoption selection 판단을 앞당겨 durable checklist를 수정하거나, GitHub/Figma/Storybook account/project-adjacent 신호를 설치 가능으로 오해하는 것.
- Rework needed: 없음.
- Not checked: GitHub Copilot app local runtime, Ethan GitHub/Figma account policy, Storybook 10.4 generated config diff, NN/g 2026 video full transcript.

## Original Content

이번 보고서는 2026-07-08 21:32 KST Growth Scan 공개 검색 결과, preflight PASS 결과, 기존 LLM Wiki 중복 확인, NN/g design specs 후보 유지, GitHub/Figma/Storybook account/project-adjacent 후보 재판정을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
