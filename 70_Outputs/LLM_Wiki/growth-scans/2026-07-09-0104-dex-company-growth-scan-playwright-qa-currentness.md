---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 01:04 KST"
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
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://github.blog/changelog/2026-07-07-copilot-billing-preview-app-will-be-retired-on-august-3/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/docs/ai/setup"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://obsidian.md/changelog/"
  - "https://www.nngroup.com/articles/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.threads.com/"
  - "https://playwright.dev/docs/release-notes"
  - "https://github.com/microsoft/playwright/releases"
collectionPurpose: "30분 growth scan에서 직전 preflight incident 이후 preflight 통과를 확인하고, 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 판정한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - frontend-qa
  - playwright
---

# Dex Company Growth Scan - 2026-07-09 01:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 01:01-01:04 KST
- 실행 모드: 30분 fast discovery / candidate detection. 직전 00:33 KST 회차는 free RAM preflight FAIL로 incident-only였으므로, 이번 회차는 preflight 회복 후 공개 자료를 다시 확인했습니다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot changelog/app/billing, Storybook 10.4/agentic setup, Figma Agent/custom tools/skills, Obsidian changelog, NN/g latest, W3C WAI news, Threads public search, Playwright release notes/GitHub releases.
- 변경 범위: 기존 Playwright source note 1개 refresh, `PPT Frontend Visual Communication Checklist`, LLM Wiki `index.md`, `log.md`, 이 report.
- 금지 준수: package, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable install을 설치/연결/실행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 14 | 공개 후보 URL/search surface 기준 |
| stored.count | 1 | 기존 Playwright source note refresh + checklist/index/log/report update |
| duplicate.count | 11 | OpenAI, GitHub, Storybook, Figma, Obsidian, NN/g, W3C, Threads 대부분 기존 coverage와 중복 |
| deferred.count | 3 | GitHub Copilot app, Storybook agentic setup, Figma Agent/custom tools |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-010115.md`
- free RAM: 1.48GB
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS

## 오늘의 핵심 발견

1. 직전 free RAM incident 이후 이번 preflight는 PASS로 회복됐습니다. free RAM은 1.48GB라 통과했지만 여유는 계속 크지 않습니다.
2. OpenAI Codex/API, GitHub Copilot app/billing, Storybook 10.4, Figma Agent, Obsidian, NN/g, W3C, Threads 신호는 직전 회차와 대체로 중복입니다. 계정/런타임/저장소 맥락 없이는 adoption으로 올리지 않았습니다.
3. Playwright official release notes는 Version 1.61/1.60에서 passkey, local/session storage, HAR/WebSocket trace, drag-and-drop upload zones, ARIA snapshot boxes, retained video/trace처럼 실제 frontend QA evidence field로 쓸 수 있는 변화가 확인됐습니다.
4. GitHub Playwright releases page는 v1.61.1 최신과 v1.60.0 Drop API를 교차 확인해 주지만 일부 GitHub release page 영역은 loading error가 있어 Playwright official docs를 primary source로 삼았습니다.
5. 이번 변화는 새 도구 설치가 아니라 기존 browser-QA 체크리스트의 evidence field 확장입니다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Playwright release notes 1.60/1.61 | Microsoft Playwright | official docs | stored-source-refresh + checklist-adopted | high | source-backed: passkey/storage/HAR/drop/ARIA snapshot/video trace fields. not checked: local Playwright version/test run |
| Playwright GitHub releases | Microsoft/GitHub | official repo release list | cross-check | medium | source-backed: v1.61.1 latest and v1.60.0 Drop API visible. partial: GitHub page loading errors |
| OpenAI Codex changelog | OpenAI | official changelog | duplicate-currentness | high | 기존 Codex task/currentness lane과 중복 |
| OpenAI API deprecations | OpenAI | official docs | duplicate-currentness | high | 기존 API deprecation/currentness lane과 중복 |
| GitHub Copilot app/billing | GitHub | official changelog | carried/account-adjacent | high | account, plan, org policy, billing/runtime not checked |
| Storybook 10.4/agentic setup | Storybook | official docs/blog | deferred/project-specific | medium | target repo, package delta, generated config, test command, rollback not checked |
| Figma Agent skills/custom tools | Figma | official vendor blog | duplicate/account-adjacent | medium | workspace/file/connector/billing context not checked |
| Obsidian / NN-g / W3C / Threads | mixed | official/SNS | duplicate or discovery-only | mixed | no new operating field beyond existing checklists |

## Stored / Rejected / Deferred

### Stored / Updated

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-03-playwright-release-notes-web-testing.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\PPT Frontend Visual Communication Checklist.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- 이 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0104-dex-company-growth-scan-playwright-qa-currentness.md`

### Rejected / Duplicate

- OpenAI Codex/API: 기존 currentness 및 deprecation coverage와 중복.
- GitHub Copilot app/billing: 기존 account-adjacent 및 cost governance coverage와 중복.
- Storybook/Figma: target repo/account/runtime evidence가 없으므로 adoption 보류.
- Obsidian/NN-g/W3C: 이번 회차에서 새 checklist field를 만들지 않음.
- Threads: primary confirmation 부족으로 discovery-only.

### Deferred

- GitHub Copilot app: account/plan/org policy/local runtime/billing evidence 필요.
- Storybook agentic setup: target repo/package manager/generated diff/test output/rollback 필요.
- Figma Agent/custom tools: workspace/file/connector/billing/private design context 필요.

## LLM Wiki 변경 이력

- Source refresh: `2026-07-03-playwright-release-notes-web-testing.md`
- Wiki guide update: `PPT Frontend Visual Communication Checklist.md`
- Index update: Playwright browser-QA operating rule 추가
- Log update: 2026-07-09 Playwright QA field update 기록
- Candidate queue: 직접 count 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지
- 설치/connector/MCP/SDK/browser extension/GitHub workflow/account/token/billing 변경: 없음

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Playwright 1.61.x upgrade/use | project-specific conditional | No | package version, browser download/cache, CI OS, generated artifacts, test flake, rollback |
| GitHub Copilot app | carried/account-adjacent | No | account, plan, org policy, telemetry, billing |
| Storybook agentic setup | project-specific conditional | No | package/config mutation, generated stories, a11y/runtime tests |
| Figma Agent custom tools/skills | approval-not-ready/account-adjacent | No | workspace permission, sensitive design context, connector scope, billing |

## 중복으로 제외한 자료

- OpenAI Codex changelog와 API deprecations는 00:04 및 이전 보고서와 중복입니다.
- GitHub Copilot app/billing은 account/runtime evidence 없이는 기존 carried 판정을 바꾸지 않습니다.
- Storybook 10.4/agentic setup은 이미 source note와 최근 보고서에서 project-specific conditional로 처리됐습니다.
- Figma Agent skills/custom tools는 기존 account-adjacent coverage가 충분합니다.
- W3C/NN-g design and accessibility signals는 기존 PPT/frontend checklist와 중복입니다.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: 현재 workspace Playwright version, Playwright 1.61.x install/upgrade, 실제 browser test, passkey/storage/drop/HAR/ARIA snapshot/video evidence 실행, GitHub/Figma account context, Storybook target repo diff.
- 부분 확인: GitHub Playwright releases page는 일부 loading error가 있었으나 release list와 docs 교차 확인은 가능했습니다.
- 운영 리스크: free RAM 1.48GB로 기준은 통과했지만 여전히 낮은 편입니다.

## 교차 검증 근거

- Playwright release notes official docs를 primary source로 확인했습니다.
- GitHub `microsoft/playwright` releases page에서 v1.61.1 latest와 v1.60.0 Drop API visibility를 교차 확인했습니다.
- 기존 LLM Wiki에서 `Playwright`, `ariaSnapshot`, `locator.drop`, `HAR`, `bounding box`를 검색해 이번 QA field가 기존 checklist에 없음을 확인했습니다.
- Storybook/Figma/GitHub/OpenAI 후보는 최근 23:02, 23:31, 00:04 보고서와 자동화 메모리의 carried/deferred 판정을 대조했습니다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: Playwright official release notes and GitHub releases show new or current browser automation features relevant to QA evidence.
- Dex inference: Dex Company frontend QA should separate Playwright evidence by login credential state, storage state, upload/drop behavior, network trace, accessibility snapshot, visual video/trace retention, and flaky-failure artifacts.
- Not checked: No local package upgrade, browser download, test execution, screen reader pass, or target repo integration was performed.

## 에던님이 바로 사용할 수 있는 예시

Frontend QA를 맡길 때 아래처럼 Playwright evidence를 요구하시면 됩니다.

```markdown
playwright_evidence:
  passkey_login_flow: checked | not_applicable | not_checked
  storage_state_mutation: checked | not_applicable | not_checked
  drag_drop_or_upload_zone: checked | not_applicable | not_checked
  har_or_websocket_trace: checked | not_applicable | not_checked
  aria_snapshot_scope: page | locator | not_checked
  aria_snapshot_boxes: checked | not_checked
  video_retention_mode: on-first-retry | retain-on-failure | not_checked
  flaky_failure_trace_retained: yes | no | not_checked
```

## Improvement Delta

- 개선된 점: broad Playwright currentness note를 구체적인 QA evidence field로 바꿨습니다.
- 운영 변화: frontend 작업에서 Playwright를 사용할 때 screenshot/console만이 아니라 passkey, storage, drop/upload, HAR/WebSocket, ARIA snapshot, boxes, retained video/trace를 evidence 후보로 요구할 수 있게 됐습니다.
- 템플릿 변화: browser-QA evidence row가 PPT/frontend checklist에 추가됐습니다.

## Adoption Check

- 이전 action item: preflight를 먼저 실행하고, PASS 후 새 source note는 checklist field, approval field, QA field, acceptance test 중 하나가 실제로 바뀔 때만 저장한다.
- 채택 여부: done.
- 반영 방식: preflight PASS를 확인했고, Playwright release notes가 실제 QA evidence field를 추가하므로 기존 source note refresh + checklist update로 제한했습니다.

## 이전 Deferred/Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | 공식 availability는 확인돼도 Ethan account/org/runtime/billing evidence가 없음 |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, generated diff, test output, rollback path 없음 |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | existing coverage sufficient; workspace/file/account context missing |
| Threads Obsidian+Codex signal | deferred/not-checked | deferred/discovery-only | primary source confirmation 부족 |
| Playwright release notes | duplicate broad source | done/adopted-narrow-field | 기존 source note를 refresh하고 concrete QA evidence fields로 채택 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. preflight를 먼저 실행합니다.
2. 새 source를 저장하기 전 `operational_scope.diff`를 확인합니다.
3. Playwright를 다시 다룰 경우 실제 target repo와 현재 installed version, test command, browser download/cache, CI OS, rollback path가 없으면 install/upgrade 추천으로 올리지 않습니다.
4. frontend QA 후보는 screenshot만이 아니라 ARIA snapshot, network trace, video/trace retention 중 무엇을 증거로 남길지 명확히 정합니다.

## Prompt or Template Patch Candidate

```text
For frontend browser QA, do not treat "Playwright checked" as one field. Split evidence by flow: passkey/auth, storage state, upload/drop zone, network/HAR/WebSocket, ARIA snapshot, bounding boxes, retained trace/video, and flaky-failure artifact. Only recommend Playwright upgrades when a target repo, current version, test command, browser cache impact, CI OS, and rollback path are known.
```

## Failure Pattern

- 반복 패턴: frontend QA 도구 이름만 적고 실제 evidence surface가 뭉개지는 경우가 있습니다.
- 이번 처리: Playwright를 tool name이 아니라 검증 증거 종류로 분해했습니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-010115.md` |
| internet search | PASS | public official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki index/log/checklists/source grep |
| source/wiki 저장 근거 | PASS | concrete Playwright QA evidence fields added |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package, account, billing, token change |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table and separate section |
| status | PASS | source notes 162, wiki notes 7, status check completed |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 177, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed Korean Markdown files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are local Playwright version/test execution and unexplored backlog |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit, UTF-8 검사가 통과했고, 승인 없는 설치/연결/권한 변경 없이 기존 source note와 checklist만 범위 안에서 갱신했습니다.
- 최고 위험: Playwright release notes가 유용하더라도 현재 프로젝트에 설치하거나 업그레이드하지 않았으므로, local availability나 테스트 성공으로 말하면 안 됩니다.
- Not checked: local Playwright version, actual tests, browser download/cache impact, CI runtime.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 01:04 KST Growth Scan 공개 검색 결과, preflight PASS 결과, Playwright official release notes, GitHub Playwright releases page, 기존 LLM Wiki 중복 확인, PPT/frontend checklist 변경을 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
