---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-09 00:04 KST"
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
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/deprecations"
  - "https://developers.openai.com/codex/llms-full.txt"
  - "https://github.blog/changelog/label/copilot/"
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://github.blog/changelog/2026-07-07-copilot-billing-preview-app-will-be-retired-on-august-3/"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.threads.com/%40meta.ai/post/DaTr09HDRvi/obsidian-codex-your-notes-become-an-ai-coding-workspace-codex-can-read-write"
  - "https://storybook.js.org/blog/"
collectionPurpose: "30분 fast discovery 회차에서 직전 Career Ops 채택 이후 최신 공개 신호가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고 중복/보류/미확인을 기록한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-09 00:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 00:04-00:12 KST
- 실행 모드: 30분 fast discovery / candidate detection. 직전 23:31 KST 회차에서 Career Ops 자동지원 분류가 채택됐으므로, 이번 회차는 새 자료가 실제 운영 필드를 바꾸는지 확인했다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot changelog/app/billing/usage, Storybook blog/search surface, Figma Agent/custom tools/skills, Obsidian changelog, W3C WAI news, Threads public search.
- 변경 범위: 이 growth scan report 1개만 추가했다.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 12 | 공개 후보 URL/search surface 기준 |
| stored.count | 0 | 새 source/wiki/inbox/index/log/candidate-queue 변경 없음 |
| duplicate.count | 10 | Codex changelog, OpenAI deprecations, GitHub Copilot July lane, Figma Agent, Obsidian, W3C, Storybook, Career Ops 분류는 기존 coverage와 중복 |
| deferred.count | 4 | GitHub Copilot app, Storybook agentic setup, Figma Agent/custom tools, Threads public signals |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-000229.md`
- free RAM: 1.23GB
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS

## 오늘의 핵심 발견

1. OpenAI Codex changelog의 최신 공개 항목은 2026-07-06 ChatGPT iOS 1.2026.181이며, conversation에서 Codex task 생성/검색/열기/분기/관리, diff filter, attachment preview, task menu의 usage/credit detail 같은 앱 사용성 신호를 담고 있다. Dex Company 운영에는 "task 상태와 비용 표시를 보고 판단한다"는 currentness 신호지만, 기존 Codex automation/task/checklist coverage를 바꾸지는 않는다.
2. OpenAI API deprecations는 July 2 fine-tuning 제한과 July 23 legacy snapshot shutdown을 다시 확인시킨다. 기존 API deprecation/currentness lane과 중복이며, 새 API 설계 작업이 없으므로 source note를 추가하지 않았다.
3. GitHub Copilot changelog는 2026-07-07 app availability, cost center budget, billing preview retirement, usage API review metrics를 보여준다. 그러나 기존 GitHub usage metrics, AI credit pools, managed settings, Copilot app account-adjacent 판정이 이미 같은 운영 필드를 갖고 있다.
4. Figma Agent custom tools/skills는 팀 prompt와 design context를 skill로 재사용하는 방향을 강화하지만, Figma file/workspace/connector/billing evidence가 없으면 여전히 account-adjacent다.
5. Obsidian changelog 최신 공개 항목은 2026-06-09 1.13.1이고, W3C WAI news 최신 주요 항목은 2025 자료다. 이번 회차에는 Vault/LLM Wiki 운영 규칙을 바꿀 최신 공식 신호가 없었다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Codex changelog 2026-07-06 | OpenAI | official changelog | duplicate-currentness | high | source-backed: iOS task management, diff filter, usage/credit details. Dex inference: local automation report fields는 기존 기준 충분 |
| OpenAI API deprecations | OpenAI | official docs | duplicate-currentness | high | source-backed: fine-tuning availability and legacy snapshot shutdown. not checked: Ethan API org/model usage |
| Codex `llms-full.txt` automation text | OpenAI | official machine-readable docs | duplicate-source | medium-high | source-backed: automations add findings to inbox and require local app/project availability. Dex inference: current automation already follows this |
| GitHub Copilot July changelog label | GitHub | official changelog index | duplicate-source | high | source-backed: July 1/2/7 Copilot governance/currentness items. existing local notes cover metrics, cost, session, model, vision |
| GitHub Copilot app available to all | GitHub | official changelog | carried/account-adjacent | high | source-backed: every Copilot plan/BYOK signal. not checked: Ethan GitHub plan/org/local runtime |
| GitHub Copilot Billing Preview retirement | GitHub | official changelog | duplicate-currentness | high | source-backed: billing settings replacement path. Dex inference: existing cost governance fields sufficient |
| Figma Agent custom tools/context | Figma | official vendor blog | duplicate/account-adjacent | medium | source-backed: custom tools/context/skills direction. not checked: Figma workspace/file/connector/billing |
| Figma Agent skills collaboration | Figma | official vendor blog | duplicate/account-adjacent | medium | source-backed: reusable skills/team sharing. existing source notes already cover permission and human-review caveats |
| Obsidian changelog | Obsidian | official changelog | duplicate/no-new-signal | high | source-backed: latest visible 2026-06-09 release. Dex inference: no new Vault rule |
| W3C WAI news | W3C | official standards/news | duplicate/no-new-signal | high | source-backed: latest visible WAI news items are already covered by existing WCAG/WAI checklist notes |
| Threads Obsidian+Codex signal | Threads/public post | public SNS | deferred/not-checked | low | source-backed: public snippet only. not checked: primary backing, provenance, implementation detail |
| Storybook latest surface | Storybook | official blog/search surface | deferred/project-specific | medium | source-backed: no stronger new field found beyond existing 10.3/10.4 notes. not checked: target repo diff/test |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0004-dex-company-growth-scan-fast-discovery-no-new-signal.md`

## LLM Wiki inbox/source/wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- `00_Inbox/LLM_Wiki/ai-research/2026-07-03-10x-growth-scan-candidate-queue.md`: 직접 확인 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot app | carried/account-adjacent | No | account, plan, organization policy, local install, telemetry, cost/billing |
| Storybook agentic setup | project-specific conditional | No | package/config mutation, generated story quality, a11y/runtime tests, rollback |
| Figma Agent custom tools/skills | approval-not-ready/account-adjacent | No | workspace/file permission, sensitive design context, prompt injection, connector scope, billing |
| Threads Obsidian/Codex workflow posts | not-checked/discovery-only | No | source provenance, primary confirmation, low operational specificity |

## 중복으로 제외한 자료

- OpenAI Codex changelog: 기존 Codex changelog/currentness lane, automation/task rules, recent 23:02 report와 중복.
- OpenAI API deprecations: 기존 API migration/deprecation lane과 22:01/23:31 currentness checks와 중복.
- GitHub Copilot July changelog: existing source notes cover usage metrics, session streaming, AI credit/session limits, managed settings, vision, browser tools, app availability, cost governance.
- Figma Agent skills/custom tools: 기존 Figma Agent/MCP approval-ready notes와 최근 no-new-signal reports가 이미 다룬 범위.
- Obsidian/W3C: 기존 Obsidian CLI/Bases/changelog, WCAG/WAI/PPT/frontend checklist coverage와 중복.
- LinkedIn Premium Apply Assistant: 직전 23:31 회차에서 이미 source note와 Career Ops checklist에 반영.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: Ethan GitHub account/plan/org policy, Copilot app local runtime, GitHub billing UI/API access, Figma workspace/file/connector/billing, Storybook generated config diff/test output, Threads primary confirmation.
- 부분 확인: Threads는 공개 snippet만 확인했으며 source-backed knowledge로 승격하지 않았다.
- 운영 리스크: free RAM 1.23GB로 preflight 기준은 통과했지만 여유가 크지 않다.

## 교차 검증 근거

- OpenAI Codex changelog는 OpenAI `llms-full.txt`의 automation/task 설명과 기존 LLM Wiki Codex automation coverage를 대조했다.
- OpenAI API deprecations는 직전 22:01/23:31 report 및 기존 API deprecation lane과 대조했다.
- GitHub Copilot changelog label page는 기존 Copilot usage metrics, session streaming, AI credit/session limit, managed settings, vision, app availability notes와 로컬 중복 검색으로 대조했다.
- Figma Agent custom tools/skills는 Figma 공식 블로그 두 건과 기존 Figma Agent source/report coverage를 대조했다.
- Obsidian/W3C는 공식 changelog/news의 최신 날짜와 기존 checklist coverage를 대조했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: OpenAI Codex 2026-07-06 changelog, OpenAI API deprecation dates, GitHub Copilot July changelog items, Figma Agent skills/custom tools direction, Obsidian latest visible changelog, W3C WAI latest visible news were checked from public sources.
- Dex inference: 이번 신호들은 Dex Company의 기존 checklist, approval packet, currentness-check 규칙을 강화하지만 새 필드를 추가하지 않는다.
- Not checked: 에던님 계정/조직/워크스페이스/저장소/런타임에서 GitHub Copilot app, Figma Agent, Storybook agent setup, LinkedIn Premium Apply Assistant를 실제로 사용할 수 있는지는 확인하지 않았다.

## 에던님이 바로 사용할 수 있는 예시

PPT 또는 frontend 작업에서는 이번 회차의 결론을 이렇게 적용하시면 됩니다.

```markdown
new_source_candidate:
adds_new_checklist_field: yes/no
adds_new_approval_field: yes/no
adds_new_qa_field: yes/no
adds_new_acceptance_test: yes/no
account_or_runtime_required: yes/no
existing_coverage:
decision: stored | duplicate | deferred | blocked | not checked
```

GitHub/Figma/Storybook처럼 도구가 새로 보일 때는 "쓸 수 있다"가 아니라 `target`, `permission`, `config diff`, `test command`, `rollback`, `account/billing`을 먼저 채우는 방식으로 판단하시면 됩니다.

## Improvement Delta

- 개선된 점: 새롭게 보이는 Codex/GitHub/Figma currentness 신호를 저장 중심으로 처리하지 않고, 기존 checklist/approval field와 대조한 뒤 no-new-signal로 정리했다.
- 운영 변화: 없음. 직전 22:34 handoff context QA와 23:31 Career Ops 분류 규칙이 계속 유효하다.
- 템플릿 학습: "새 changelog 항목"은 source note 후보가 아니라 먼저 `operational_scope.diff` 확인 대상이다.

## Adoption Check

- 이전 action item: Career Ops 후보는 `native-human-review-assistant`, `third-party-auto-submit`, `autofill-only`, `resume-tailoring`, `tracking-only`로 분류하고, LinkedIn Premium Apply Assistant는 account/UI 확인 전 사용 가능으로 말하지 않는다.
- 채택 여부: carried/done.
- 반영 방식: 이번 회차에서는 Career Ops 새 후보를 저장하지 않았고, LinkedIn Apply Assistant는 직전 source note와 checklist 기준을 그대로 유지했다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | availability는 공식 확인됐지만 Ethan 계정/조직/로컬 런타임/비용 증거가 없다 |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, package manager, generated diff, test output, rollback path가 없다 |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | existing source/report coverage sufficient; workspace/file/account context missing |
| Threads Obsidian+Codex signal | deferred/not-checked | deferred/not-checked | public snippet 수준이며 primary confirmation과 재사용 가능한 방법론이 부족하다 |
| LinkedIn Premium Apply Assistant | done/expanded-classification | done/no-reopen | 직전 회차에서 source note/checklist 반영 완료; live account/UI는 여전히 not checked |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. preflight를 먼저 실행한다.
2. free RAM이 1GB를 넘는지 확인하고, 낮으면 `-RunDoctor` 추가 진단 여부를 판단한다.
3. 새 source note는 checklist field, approval field, QA field, acceptance test 중 하나가 실제로 바뀔 때만 저장한다.
4. GitHub/Figma/Storybook agent 후보는 target/account/runtime evidence 없이는 carried/deferred로 둔다.
5. Threads는 primary source나 공식 문서 교차 확인 전까지 discovery-only로 유지한다.

## Prompt or Template Patch Candidate

```text
For 30-minute fast discovery runs, treat new changelog or social signals as duplicate/no-new-signal unless they create a concrete operational_scope.diff: a new checklist field, approval field, QA field, or acceptance test. For account-adjacent agent tools, require target/account/runtime evidence before adoption.
```

## Failure Pattern

- 반복 패턴: 짧은 주기의 성장 스캔에서는 OpenAI/GitHub/Figma/Storybook currentness 신호가 자주 반복되며, 대부분은 이미 운영 필드로 흡수됐거나 계정/런타임 확인 없이는 adoption할 수 없다.
- 이번 처리: 중복 source note를 만들지 않고, 기존 coverage와 미확인 항목을 분리했다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-000229.md` |
| internet search | PASS | public official/source pages and Threads snippets checked |
| duplicate check | PASS | automation memory, recent reports, candidate queue, LLM Wiki index/log/source coverage searched |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log/candidate queue 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package execution |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table and separate section |
| status | PASS | status script completed after report write |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) after report write |
| audit | PASS_WITH_BACKLOG | notes checked 177, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed report returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are account/repo/runtime context and unexplored backlog |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit, UTF-8 검사가 통과했고, 승인 없는 설치/연결/권한 변경 또는 source/wiki 중복 저장이 없었다.
- 최고 위험: GitHub Copilot app, Figma Agent, Storybook agentic setup은 실제 계정/조직/파일/저장소/runtime evidence 없이 adoption하면 과장될 수 있다.
- Not checked: Ethan GitHub/Figma account policy, Storybook generated config diff, LinkedIn live account/UI, Threads primary confirmation.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 00:04 KST Growth Scan 공개 검색 결과, preflight PASS 결과, OpenAI Codex/API 공식 문서, GitHub Copilot changelog, Figma 공식 블로그, Obsidian changelog, W3C WAI news, Threads 공개 snippet, 기존 LLM Wiki 중복 확인, candidate queue 상태 확인을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
