---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-09 05:35 KST"
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
  - "https://developers.openai.com/codex/remote-connections"
  - "https://github.blog/changelog/label/copilot/"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/introducing-figma-motion/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.nngroup.com/articles/"
  - "https://www.w3.org/WAI/about/groups/task-forces/coga/minutes/topics/"
  - "https://playwright.dev/docs/release-notes"
  - "https://www.indeed.com/careerscout"
  - "https://www.linkedin.com/help/linkedin/answer/a6813101"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, 중복/보류/미확인을 기록한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-09 05:35 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 05:32-05:35 KST
- 실행 모드: 30분 fast discovery / operational_scope.diff 확인.
- 검색 범위: OpenAI Codex changelog/remote connections, GitHub Copilot changelog label page, Obsidian changelog/Bases/plugin security lane, Figma Motion/MCP, NN/g latest articles, W3C COGA/WAI currentness, Playwright release notes, LinkedIn/Indeed Career Ops AI assistant pages.
- 변경 범위: 이 growth scan report 1개만 추가했다. 새 source/wiki/inbox/index/log/candidate-queue 변경은 없다.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package, Obsidian plugin을 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 18 | 공개 URL/search surface 기준 주요 source/candidate |
| stored.count | 0 | 새 source/wiki/inbox note 없음 |
| duplicate.count | 15 | Codex Remote/DigitalOcean, GitHub Copilot governance, Figma Motion/MCP, Playwright 1.60/1.61, Indeed/LinkedIn Career Ops, W3C/NN-g/Obsidian currentness |
| deferred.count | 5 | GitHub/Codex account/runtime, Figma account/file, Storybook/Playwright target repo, Career Ops account/app/UI, Threads/social discovery |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-report `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-053254.md`
- free RAM: 1.44GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Codex Remote/DigitalOcean plugin 신호는 여전히 중요하지만, 기존 `2026-07-03-openai-codex-remote-connections-digitalocean-plugin.md` source note와 여러 no-new-signal 보고서가 이미 host boundary, QR pairing, cloud provisioning, SSH, billing, teardown risk를 다루고 있다.
2. GitHub Copilot July changelog의 app availability, usage API review metrics, cost-center budgets, managed settings, auto model, browser tools, session streaming은 기존 GitHub governance/source notes와 중복된다. 실제 계정/조직/비용/로컬 앱 상태는 이번 실행에서도 확인하지 않았다.
3. Figma Motion/MCP/Slides/Make와 NN/g design specs/AI explanation 신호는 최근 PPT/frontend checklist와 Figma source notes가 이미 handoff, motion, reduced motion, private context exposure, deck refresh QA fields로 흡수했다.
4. Playwright release notes의 passkey, storage, HAR/WebSocket, ARIA snapshot, bounding boxes, retained video/trace evidence는 01:04 KST 회차에서 source refresh와 checklist update가 완료되어 새 note가 필요하지 않다.
5. LinkedIn AI-powered resume tips와 Indeed Career Scout 계열 신호는 Career Ops의 native human-review assistant / platform-native AI career coach 분류와 중복된다. 자동 제출 근거로 볼 수 없고, 실제 계정/app/UI 확인 전에는 사용 가능으로 말하면 안 된다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Codex Remote / DigitalOcean plugin | OpenAI | official docs/changelog | duplicate-source | high | source-backed: remote host boundary, QR pairing, SSH/cloud signal. not checked: live app/account/cloud billing |
| GitHub Copilot July changelog lane | GitHub | official changelog index | duplicate/currentness | high | source-backed: app, usage, budget, model, browser-tool signals. Dex inference: existing governance fields sufficient |
| Obsidian changelog / Bases | Obsidian | official changelog/docs | duplicate/currentness | high | existing Obsidian/Bases/Plugin security notes cover operational fields |
| Figma Motion / MCP / Slides / Make | Figma | official vendor docs/blog | duplicate/account-specific | medium | existing Figma notes cover motion, repository/deck handoff, MCP context exposure |
| NN/g latest articles | NN/g | research/practice index | duplicate/no-new-field | medium | design specs and AI explainability already stored or covered |
| W3C COGA/WAI currentness | W3C | standards/task-force pages | duplicate/currentness | medium-high | COGA AI conversation and PPT/frontend QA fields already adopted |
| Playwright release notes | Microsoft Playwright | official docs | duplicate-source | high | 01:04 refresh already added browser-QA evidence fields |
| LinkedIn AI-powered resume tips | LinkedIn | official help | duplicate/career-ops | medium | source-backed: resume-review assistant signal. existing LinkedIn Apply Assistant classification sufficient |
| Indeed Career Scout | Indeed | official product/help | duplicate/career-ops | medium | existing Career Scout note covers platform-native AI coach and resume overwrite risk |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0535-dex-company-growth-scan-no-new-signal.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- 10x candidate queue 직접 확인: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `audit-done=8`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Codex DigitalOcean plugin / remote workspace | duplicate due-diligence candidate | No | cloud provisioning, SSH key, cost, region/data boundary, teardown |
| GitHub Copilot app/browser tools/usage governance | carried/account-adjacent | No | account/org policy, billing owner, usage metrics data, browser data scope |
| Figma Motion/MCP/Slides/Make | carried/account-and-file-specific | No | workspace/file permission, connector scope, private context exposure, export fidelity |
| Storybook/Playwright upgrades | deferred/project-specific | No | package/version delta, browser cache, CI OS, generated artifacts, rollback |
| LinkedIn/Indeed AI career assistants | carried/account-app-specific | No | subscription/region/UI availability, personal data, resume overwrite, user approval before submit |

## 중복으로 제외한 자료

- OpenAI Codex Remote/DigitalOcean: 기존 remote connections source note와 07-04/07-05/07-09 보고서가 이미 no-install cloud approval gate를 보존한다.
- GitHub Copilot July changelog: 기존 managed settings, AI credit pools, usage metrics, browser tools, app availability, model governance notes와 중복된다.
- Obsidian Bases/changelog: 직전 05:05 회차의 Bases Toolbox approval-not-ready note와 기존 Obsidian source notes가 충분하다.
- Figma Motion/MCP: 기존 `2026-07-04-figma-config-2026-motion-agent-handoff.md`, 02:34 Make handoff, 03:35 Slides/MCP source notes와 중복된다.
- NN/g design specs / AI explainability: 07-08 design specs handoff, 07-04 AI explainability source notes와 중복된다.
- Playwright release notes: 01:04 KST source refresh와 PPT/frontend checklist update로 이미 반영했다.
- LinkedIn/Indeed Career Ops AI assistant: LinkedIn Apply Assistant와 Indeed Career Scout source notes가 이미 human-review assistant 분류를 제공한다.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: Ethan OpenAI/GitHub/Figma/LinkedIn/Indeed account state, Codex app/mobile version, GitHub org/billing policy, Figma file/connector access, Storybook/Playwright target repo version, actual Career Ops app/UI behavior, Threads primary confirmation.
- 부분 확인: 공개 공식 문서와 기존 LLM Wiki coverage는 확인했지만, 로컬/계정/런타임 상태는 확인하지 않았다.

## 교차 검증 근거

- Codex Remote/DigitalOcean은 OpenAI Codex changelog와 Remote connections docs를 기존 source note 및 최근 보고서와 대조했다.
- GitHub Copilot July lane은 GitHub Copilot changelog label page와 기존 GitHub governance source notes를 `rg`로 대조했다.
- Figma Motion/MCP는 Figma official blog/docs와 기존 Figma Motion/Make/Slides source notes를 대조했다.
- Playwright release notes는 기존 Playwright source note, index, PPT/frontend checklist update와 대조했다.
- Career Ops 후보는 Indeed Career Scout, LinkedIn resume assistant/help pages와 기존 LinkedIn Apply Assistant / Indeed Career Scout source notes를 대조했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: OpenAI, GitHub, Obsidian, Figma, NN/g, W3C, Playwright, LinkedIn, Indeed 공개 자료를 확인했다.
- Dex inference: 이번 회차의 주요 신호는 기존 체크리스트를 재확인하지만 새 checklist/approval/QA/acceptance-test field를 만들지 않는다. 따라서 새 source note를 만들지 않는 것이 중복 방지 원칙에 맞다.
- Not checked: 실제 계정, 로컬 앱, 저장소, Figma 파일, Career Ops 플랫폼 UI, billing/admin policy, package/runtime은 확인하지 않았다.

## 에던님이 PPT 또는 Frontend 작업에서 바로 사용할 수 있는 예시

새 tool/currentness 신호가 나왔을 때 아래 gate를 그대로 쓰시면 됩니다.

```yaml
operational_scope_diff_gate:
  official_source_checked: yes
  existing_llm_wiki_hit: duplicate
  adds_new_checklist_field: no
  adds_new_approval_field: no
  adds_new_qa_field: no
  adds_new_acceptance_test: no
  requires_account_or_repo_context: yes
  decision: no_new_signal
```

실무 의미: 최신 발표가 있어도 PPT/frontend 산출물 QA 기준을 새로 바꾸지 않으면 저장하지 않고, 실제 프로젝트가 생겼을 때 해당 source note를 다시 읽는 편이 낫습니다.

## Improvement Delta

- 개선된 점: 05:05 회차의 Obsidian community plugin 실사 이후, 이번 회차는 반복 currentness를 새 자료처럼 저장하지 않고 기존 source/report에 직접 대조했다.
- 운영 변화: 없음. `operational_scope.diff`가 없으면 no-new-signal로 둔다는 기준을 유지했다.
- 중복 방지: Codex, GitHub, Figma, Career Ops, Playwright lane 모두 이미 저장된 source note 또는 최근 보고서와 hit가 있음을 확인했다.

## Adoption Check

- 이전 action item: Obsidian community plugin이 다시 나오면 target vault, Restricted mode, backup, test-vault, package scripts, lockfile/dependencies, network/telemetry, undo/rollback 중 어느 필드를 채우는지 확인한다.
- 채택 여부: done/carried.
- 반영 방식: 이번 회차에서 Obsidian 신호는 새 plugin 실사 후보가 아니라 기존 changelog/Bases currentness였으므로 중복 처리했다. Bases Toolbox 설치/승인 여부는 계속 approval-not-ready로 carried다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent | 공식 신호는 계속 있지만 Ethan GitHub plan/org/runtime/billing 확인 없음 |
| Storybook 10.4 / MCP / Playwright QA upgrade | deferred/project-specific | deferred/project-specific | target repo, package delta, test command, browser/CI output, rollback 없음 |
| Figma Agent/MCP/Slides/Make/Motion | carried/account-and-file-specific | carried/account-and-file-specific | source fields는 저장되어 있고 live account/file/connector evidence 없음 |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | primary source 교차 검증 전 source-backed 승격 불가 |
| Obsidian Bases Toolbox | carried/approval-not-ready | carried/approval-not-ready | source note 저장 완료, install은 backup/test-vault/source audit 전까지 불가 |
| LinkedIn/Indeed AI career assistants | carried/account-app-specific | carried/account-app-specific | 계정/app/UI/지원 공고 흐름 확인 전 사용 가능성 단정 불가 |

## Next Eval

1. preflight를 먼저 통과한다.
2. 새 source note는 checklist field, approval field, QA field, acceptance test 중 하나가 실제로 바뀔 때만 저장한다.
3. Codex/GitHub/Figma/Playwright/Career Ops currentness는 먼저 기존 source/report coverage를 `rg`로 확인한다.
4. account/repo/runtime이 필요한 항목은 public source만으로 adoption하지 않는다.
5. Obsidian Bases Toolbox는 source audit, backup, test-vault run, rollback path가 없으면 계속 approval-not-ready로 둔다.

## Prompt Or Template Patch Candidate

```text
For 30-minute Growth Scan no-new-signal runs, require a local duplicate search before any source note. If a candidate is already represented and adds no checklist field, approval field, QA field, or acceptance test, write a report-only no-op with explicit carried/not-checked account, repo, runtime, and billing context.
```

## Failure Pattern / Risk

- 반복 패턴: 공식 changelog와 제품 블로그는 짧은 주기에서 같은 기능군을 반복 노출한다.
- 이번 처리: 새 자료 저장 대신 기존 source note와 최근 보고서 coverage를 확인해 중복을 막았다.
- 남은 위험: no-new-signal 판단이 보수적일 수 있다. 다만 이번 후보들은 모두 기존 source/report hit가 있었고, 실제 계정/저장소/런타임 없이는 adoption 판단이 불가능했다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-053254.md` |
| internet search | PASS | OpenAI/GitHub/Obsidian/Figma/NN-g/W3C/Playwright/LinkedIn/Indeed public sources checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki source/report/checklist coverage searched |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log/candidate queue 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package/plugin execution |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table and separate section |
| status | PASS | `llm-wiki-status.ps1` completed; source notes 170 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1` checked 185 notes; missing v5 0, high-confidence-without-Bias-Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | report scan returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid no-new-signal run; account/repo/runtime contexts remain not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, internet search, duplicate check, no-install discipline, report schema, status/lint/audit/UTF-8 checks 완료.
- 최고 위험 후보: 최신 공개 source를 실제 계정/런타임 사용 가능성으로 과장하는 것.
- Not checked: Ethan account/org/app/repo/runtime/billing evidence.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 05:35 KST Growth Scan 공개 검색 결과, preflight PASS 결과, OpenAI/GitHub/Obsidian/Figma/NN-g/W3C/Playwright/LinkedIn/Indeed 공개 자료, 기존 LLM Wiki 중복 확인을 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
