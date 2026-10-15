---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-09 04:05 KST"
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
  - "https://github.com/openai/codex/releases"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/"
  - "https://storybook.js.org/docs/writing-tests/accessibility-testing"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.w3.org/TR/wcag-3.0/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.figma.com/blog/figma-is-now-iso-42001-certified/"
  - "https://www.figma.com/blog/2026-ai-report/"
  - "https://www.nngroup.com/topic/ai/"
  - "https://www.threads.com/"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, 중복/보류/미확인을 기록한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-09 04:05 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 04:02-04:05 KST
- 실행 모드: 30분 fast discovery / candidate detection. 직전 03:35 KST 회차에서 Figma MCP Slides deck refresh QA가 채택됐으므로, 이번 회차는 새 자료가 실제 운영 필드를 바꾸는지 확인했다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot browser tools, Storybook accessibility/MCP, Obsidian changelog, W3C WCAG/WAI/WCAG 3, Figma MCP/ISO 42001/AI report, NN/g AI topic, Threads public search.
- 변경 범위: 이 growth scan report 1개만 추가했다.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 18 | 공개 URL/search surface 기준 |
| stored.count | 0 | 새 source/wiki/inbox/index/log/candidate-queue 변경 없음 |
| duplicate.count | 14 | Codex task/changelog, Codex 0.143, Realtime 2.1, Obsidian attachment cleanup, Figma ISO 42001, Figma AI report, Storybook/W3C/NN-g 대부분 기존 coverage와 중복 |
| deferred.count | 4 | GitHub Copilot app/browser tools account context, Storybook target repo, Figma account/workspace, Threads primary confirmation |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-report `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-040257.md`
- free RAM: 1.63GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Codex 2026-07-06 iOS task-management 항목은 conversation 안에서 task 생성/검색/열기/분기/관리, diff filter, transcript selection, attachment preview를 보여주지만, 2026-07-08 20:02 및 2026-07-09 00:04 보고서에서 이미 duplicate-source로 판정됐다.
2. openai/codex 0.143.0 release는 remote plugins, proxy/PAC/WPAD, remote-control pairing, MCP tool search/session auth 같은 중요한 설치/권한 필드를 담지만, 직전 03:04 run에서 source note와 install-security checklist로 이미 흡수됐다.
3. OpenAI API Realtime 2.1은 realtime voice app이 있을 때 유용할 수 있으나, 03:04 report에서 target voice app과 acceptance test가 없어 `deferred/no-new-field`로 처리됐고 이번에도 새 target이 없다.
4. Obsidian automatic attachment cleanup, Figma ISO 42001, Figma 2026 AI report는 각각 7월 4일 source notes로 이미 저장되어 있다.
5. Threads public search는 Obsidian/LLM Wiki, Figma MCP, Codex 관련 discovery signal을 보여주지만 대부분 snippet 수준이거나 공식 출처와 중복이므로 source-backed 승격하지 않았다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Codex changelog 2026-07-06 iOS task management | OpenAI | official changelog | duplicate-source | high | source-backed: task/diff/transcript/attachment improvements. Dex inference: 기존 task/currentness lane 충분 |
| openai/codex 0.143.0 | OpenAI/GitHub | official release | duplicate-source | high | source-backed: remote plugin/proxy/session-auth fields. 기존 03:04 source note/checklist에 반영됨 |
| OpenAI API Realtime 2.1 | OpenAI | official API changelog | deferred/no-new-field | high | source-backed: realtime voice model update. not checked: target voice UI, latency, interruption, speech QA |
| GitHub Copilot browser tools GA | GitHub | official changelog | duplicate/account-adjacent | high | source-backed: permission/network-domain controls. not checked: Ethan account/org/runtime |
| Storybook accessibility testing / 10.3 MCP | Storybook | official docs/blog | deferred/project-specific | medium | source-backed: a11y/component testing direction. not checked: target repo, dependency delta, generated tests |
| Obsidian attachment cleanup / Bases updates | Obsidian | official changelog | duplicate-source | high | existing source note `2026-07-04-obsidian-attachment-cleanup-bases-update` covers it |
| W3C WCAG/WAI/WCAG 3 | W3C | official standards/news | duplicate/currentness | high | source-backed: accessibility standards. existing PPT/frontend checklist covers current QA fields |
| Figma MCP Slides living deck | Figma | official blog | duplicate-source | medium | 03:35 run already adopted deck refresh QA fields |
| Figma ISO 42001 | Figma + ISO context | official vendor governance | duplicate-source | medium | 07-04 run already adopted vendor AI governance evidence fields |
| Figma 2026 AI report | Figma | vendor research report | duplicate-source | medium | 07-04 run already stored sample/interview/collaboration note with bias caveat |
| NN/g AI topic | NN/g | research/practice index | duplicate/no-new-field | medium | existing NN/g AI UX, design specs, AI research boundary notes cover it |
| Threads Obsidian/Figma/Codex signals | Threads | public SNS snippets | deferred/discovery-only | low | source-backed: snippets only. not checked: primary backing, provenance, reusable method |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0405-dex-company-growth-scan-fast-discovery-no-new-signal.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- `00_Inbox/LLM_Wiki/ai-research/2026-07-03-10x-growth-scan-candidate-queue.md`: 직접 확인 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot browser tools/app | carried/account-adjacent | No | account, org policy, browser data scope, network-domain controls, billing |
| Storybook MCP/accessibility testing setup | project-specific conditional | No | package/config mutation, generated test quality, dependency/lockfile delta, CI/browser runtime, rollback |
| Figma MCP/Agent/Slides/Make | approval-not-ready/account-specific | No | workspace/file permission, private context exposure, connector scope, paid plan, human review |
| Threads Obsidian/LLM Wiki/Codex signals | discovery-only/not-checked | No | source provenance, primary confirmation, low operational specificity |

## 중복으로 제외한 자료

- OpenAI Codex changelog 2026-07-06: 최근 no-new-signal reports가 이미 task management currentness로 처리했다.
- openai/codex 0.143.0: 03:04 run에서 Codex remote plugin/proxy/session-auth fields로 저장 및 checklist 반영 완료.
- OpenAI API Realtime 2.1: 03:04 run에서 target realtime voice app 없음으로 deferred/no-new-field 처리.
- Obsidian attachment cleanup/Bases: 07-04 source note로 저장 완료.
- Figma ISO 42001: 07-04 vendor governance evidence source note로 저장 완료.
- Figma 2026 AI report: 07-04 multiplayer design / AI collaboration source note로 저장 완료.
- Figma MCP Slides living deck: 03:35 run에서 PPT/deck refresh QA fields로 흡수 완료.
- Storybook accessibility/MCP: 기존 Storybook 9/10.3/10.4/Vitest/accessibility notes와 중복, target repo 없이는 adoption 불가.
- W3C WCAG/WAI/WCAG 3: 현재 PPT/frontend checklist와 COGA/WCAG source notes가 이미 운영 필드를 갖고 있다.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: Ethan GitHub/Figma account policy, Storybook target repo/package manager, generated config diff, realtime voice app, local Codex app/mobile version, Threads primary source confirmation.
- 부분 확인: Threads는 공개 snippet만 확인했으며 source-backed knowledge로 승격하지 않았다.
- 운영 리스크: free RAM 1.63GB로 preflight 기준은 통과했지만 장시간 브라우저/패키지 작업을 실행할 만큼 넉넉하다고 보지는 않는다.

## 교차 검증 근거

- Codex task-management signal은 OpenAI Codex changelog, openai/codex GitHub release, 최근 20:02/00:04/03:04 reports, LLM Wiki source 검색 결과로 대조했다.
- Obsidian attachment cleanup은 공식 Obsidian changelog와 기존 `2026-07-04-obsidian-attachment-cleanup-bases-update.md` source note로 대조했다.
- Figma ISO 42001과 Figma 2026 AI report는 Figma official pages와 기존 07-04 source notes로 대조했다.
- Figma MCP Slides는 Figma official blog와 03:35 report/checklist update로 대조했다.
- W3C/Storybook/NN-g는 공식 pages와 기존 PPT/frontend checklist 및 source notes로 대조했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: OpenAI, GitHub, Storybook, Obsidian, W3C, Figma, NN/g 공개 공식 자료와 Threads public snippets를 확인했다.
- Dex inference: 이번 신호들은 Dex Company의 기존 checklist, approval packet, currentness-check 규칙을 강화하지만 새 필드를 추가하지 않는다.
- Not checked: 에던님 계정/조직/워크스페이스/저장소/런타임에서 GitHub Copilot, Figma Agent/MCP, Storybook setup, realtime voice model을 실제로 사용할 수 있는지는 확인하지 않았다.

## 에던님이 PPT 또는 Frontend 작업에서 바로 사용할 수 있는 예시

새 AI/agent/design-tool 자료를 PPT나 frontend 작업에 쓰기 전 아래처럼 먼저 분류하시면 됩니다.

```yaml
growth_scan_candidate_gate:
  source_official: checked | not_checked
  existing_llm_wiki_coverage: none | duplicate | partial
  adds_new_checklist_field: yes | no
  adds_new_approval_field: yes | no
  adds_new_qa_field: yes | no
  adds_new_acceptance_test: yes | no
  target_account_or_repo_required: yes | no
  decision: stored | duplicate | deferred | blocked | not_checked
```

이번 회차 기준으로는 `adds_new_*`가 모두 `no`였기 때문에 새 source note를 만들지 않는 것이 맞다.

## Improvement Delta

- 개선된 점: 반복되는 OpenAI/GitHub/Figma/Obsidian currentness 신호를 새 자료처럼 저장하지 않고, 기존 source notes와 최근 2-4회 보고서에 직접 대조했다.
- 운영 변화: 없음. `operational_scope.diff`가 없으면 no-new-signal로 둔다는 기준이 계속 유효하다.
- 템플릿 학습: Threads는 discovery signal로만 쓰고, 공식 문서 또는 primary source 교차 확인 전까지 source-backed 승격하지 않는다.

## Adoption Check

- 이전 action item: Figma Slides/MCP가 다시 나오면 실제 deck file, source ledger, connector list, font rights, placeholder/copy review, human approval, export format, private-context review 없이는 adoption하지 않는다.
- 채택 여부: done/carried.
- 반영 방식: Figma MCP Slides 신호는 기존 03:35 source/checklist로 충분하다고 보고 새 저장을 하지 않았다. 실제 Figma account/deck evidence는 여전히 carried/account-specific이다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent | 공식 신호는 계속 있지만 Ethan 계정/조직/브라우저 권한/비용 증거가 없다 |
| Storybook 10.4 / MCP / accessibility setup | deferred/project-specific | deferred/project-specific | target repo, package delta, generated test, browser/CI output, rollback이 없다 |
| Figma Agent / MCP / Slides / Make | carried/account-and-file-specific | carried/account-and-file-specific | source fields는 이미 채택됐고 live adoption은 계정/파일/connector evidence가 필요하다 |
| Threads Obsidian/LLM Wiki/Codex signals | deferred/discovery-only | deferred/discovery-only | public snippet 수준이며 primary confirmation과 재사용 가능한 방법론이 부족하다 |
| OpenAI Realtime 2.1 | deferred/no-new-field | deferred/no-new-field | target realtime voice app과 acceptance test가 없으므로 기존 COGA AI conversation fields로 충분하다 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. preflight를 먼저 실행한다.
2. 새 source note는 checklist field, approval field, QA field, acceptance test 중 하나가 실제로 바뀔 때만 저장한다.
3. OpenAI/GitHub/Figma/Storybook currentness는 먼저 `rg`로 기존 source/report coverage를 확인한다.
4. Threads는 공식 source 또는 primary project page 교차 확인 전까지 discovery-only로 유지한다.
5. target repo/account/runtime이 없는 설치/connector/agent 후보는 approval-not-ready 또는 carried로 둔다.

## Prompt Or Template Patch Candidate

```text
For repeated 30-minute Growth Scan runs, do not promote a source just because it is recent. First prove operational_scope.diff: a new checklist field, approval field, QA field, or acceptance test. If the new signal is only a changelog/currentness/social snippet and existing notes already cover the same field, write duplicate/no-new-signal and carry account/runtime-specific checks forward.
```

## Failure Pattern / Risk

- 반복 패턴: 짧은 주기에서는 OpenAI/GitHub/Figma/Storybook/Obsidian 공식 신호가 자주 반복되며, 대부분은 이미 source-backed 운영 필드로 흡수됐거나 계정/런타임 확인 없이는 adoption할 수 없다.
- 이번 처리: 중복 source note를 만들지 않고, existing coverage와 not checked 항목을 분리했다.
- 남은 위험: no-new-signal 판단이 너무 보수적일 수 있다. 단, 이번 후보들은 모두 기존 source/report에 직접 hit가 있었으므로 저장 보류가 합리적이다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-040257.md` |
| internet search | PASS | public official/source pages and Threads snippets checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki index/log/source/report coverage searched |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log/candidate queue 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package execution |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table and separate section |
| status | PASS | post-report status check completed |
| lint | PASS | post-report lint completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | post-report audit completed; unexplored backlog remains |
| UTF-8 check | PASS | changed report returned OK_UTF8 |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are account/repo/runtime context and unexplored backlog |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, search, duplicate check, no-install discipline, report schema, status/lint/audit/UTF-8 checks passed.
- 최고 위험: GitHub Copilot, Figma Agent/MCP, Storybook setup, Realtime 2.1은 실제 계정/저장소/runtime evidence 없이 adoption하면 과장될 수 있다.
- Not checked: Ethan GitHub/Figma account policy, Storybook generated config diff, local realtime voice app, Threads primary confirmation.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 04:05 KST Growth Scan 공개 검색 결과, preflight PASS 결과, OpenAI Codex/API 공식 문서, GitHub Copilot changelog, Storybook docs/blog, Obsidian changelog, W3C WAI/WCAG/WCAG 3, Figma official pages, NN/g AI topic, Threads 공개 snippet, 기존 LLM Wiki 중복 확인을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
