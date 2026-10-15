---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan PowerPoint Design QA - 2026-07-04 16:04 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T16:04:46+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://powerpoint.cloud.microsoft/create/en/blog/powerpoint-design-ideas/"
  - "https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities"
  - "https://www.w3.org/WAI/teach-advocate/accessible-presentations/"
  - "https://www.w3.org/WAI/roles/trainers/"
  - "https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md"
  - "https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/"
  - "https://creativepro.com/event/presentation-design-conference-2026/"
collectionPurpose: "30분 간격 Growth Scan에서 임시 design/PPT/frontend 집중 모드에 맞춰 새 공개 자료가 PPT/frontend QA 기준을 실제로 보강하는지 확인한다."
confidence: medium
claimType: historical
evidenceScope: web-search-and-local-vault-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/report
  - growth-scan
  - dex-company
  - ppt
  - presentation-design
  - frontend
---

# Dex Company Growth Scan PowerPoint Design QA - 2026-07-04 16:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 16:04 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전이다.
- 검색 범위: automation memory, 현재 폴더, durable growth-scan skill, automation.toml, Vault 운영 문서, LLM Wiki index/log/improvement guide, 최근 15:34/15:04/15:03/14:33 보고서, 10x candidate queue, Microsoft PowerPoint 2026 design ideas, Microsoft PowerPoint accessibility, W3C WAI trainer/presentation resources, Storybook changelog, Figma agent canvas, CreativePro presentation conference, local duplicate search.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma/Canva/Microsoft app, account, token, billing, cloud resource, workflow, model switch, file deletion은 설치/연결/실행/생성하지 않았다.

## Original Content

이 보고서는 자동화 실행 기록이다. 원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 중복/저장 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한 것이다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 12 | public candidate lanes plus local duplicate lanes |
| stored.count | 1 | Microsoft PowerPoint design source note |
| duplicate.count | 7 | Microsoft accessibility, W3C presentation/trainer, Storybook, Figma, CreativePro, trend blogs |
| deferred.count | 3 | Storybook MCP/changelog, Figma agent canvas, future real PPT QA |
| blocked.count | 1 | X excluded by automation rule |
| lint.warning_count | 0 | status/lint/fallback checks after edits |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. Microsoft PowerPoint 2026 design guidance adds a concrete QA field missing from the current checklist: a deck must work in async sharing and small-screen reading, not only live presentation mode.
2. The same source strengthens information-design QA: one data slide should communicate one key insight, and chart labels must remain legible without zoom.
3. Microsoft accessibility and W3C accessible presentation guidance remain the accessibility anchors; the new note does not prove any real PPT file is accessible.
4. Storybook and Figma agent signals are still project/account-adjacent; they were not installed, connected, or promoted as runtime capability.
5. Commercial trend/conference pages are useful discovery signals but weaker than Microsoft/W3C/NN-g for durable Dex Company rules.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence Quality | Dex Company use |
|---|---|---|---|---|---|
| Microsoft PowerPoint design ideas and tips for 2026 | https://powerpoint.cloud.microsoft/create/en/blog/powerpoint-design-ideas/ | official product blog | stored-source | high | Adds async/mobile readability, one-idea slide, one-insight data slide, direct chart-label QA. |
| Microsoft PowerPoint accessibility | https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities | official support doc | duplicate-source cross-check | high | Existing source note remains Accessibility Checker/reading-order/alt-text anchor. |
| W3C WAI accessible presentations | https://www.w3.org/WAI/teach-advocate/accessible-presentations/ | standards guidance | duplicate-source cross-check | high | Confirms event/presentation accessibility framing. |
| W3C WAI trainer resources | https://www.w3.org/WAI/roles/trainers/ | standards resource index | duplicate/no-new-signal | high | Useful for training decks, but existing W3C notes cover the operating field. |
| Storybook changelog next | https://github.com/storybookjs/storybook/blob/next/CHANGELOG.md | GitHub changelog | deferred/project-specific | medium | Revisit only inside a concrete frontend repo with Storybook version and CI/browser QA. |
| Figma agent canvas | https://www.figma.com/blog/the-figma-canvas-is-now-open-to-agents/ | official vendor post | carried/account-adjacent | medium | Requires workspace/file/export/billing approval packet before use. |
| CreativePro Presentation Design Conference 2026 | https://creativepro.com/event/presentation-design-conference-2026/ | commercial event/training page | duplicate/discovery-only | low-medium | Useful trend vocabulary, but not strong enough for a new operating rule. |

## Stored / Absorbed Sources

- Source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-microsoft-powerpoint-design-ideas-2026.md`
- Wiki guide updated: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1604-dex-company-growth-scan-powerpoint-design-qa.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | Microsoft PowerPoint 2026 design source note added |
| wiki/guides | PPT/frontend checklist gained async/mobile readability and one-insight chart QA |
| index.md | New source note/report and operating rule link added |
| log.md | 16:04 growth scan entry appended |
| candidate queue | No change; zero eligible/not-checked/install-next preserved |
| automation memory | This run summary appended |

## Approval Decisions / Install Candidates

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| Microsoft PowerPoint/Copilot design features | knowledge-only | not connected or run | account/billing/brand asset/generated-output review required before use |
| Figma agent canvas / MCP | approval-not-ready | not installed or connected | workspace permission, file sensitivity, asset export, billing, prompt injection |
| Storybook changelog/MCP lane | project-specific conditional | not installed or run | supply chain, local server exposure, CI overreliance, rollback required |
| Commercial presentation trend pages | discovery-only | not stored as source note | vendor bias, low provenance for durable QA rules |

## Duplicate / Rejected / Deferred

- duplicate-source: Microsoft PowerPoint accessibility, W3C accessible presentations, NN/g visual hierarchy.
- duplicate/no-new-signal: W3C trainer resources for this run; useful index but does not add a new Dex Company QA field.
- deferred/project-specific: Storybook changelog/MCP lane until a concrete frontend repo exists.
- carried/account-adjacent: Figma agent canvas until approved workspace/file/export/billing context exists.
- discovery-only: CreativePro and trend pages due commercial bias and weaker cross-verification.
- blocked: X remains excluded by automation rule.

## Failure / Blocked / Not Checked

- PowerPoint Accessibility Checker was not run on an actual PPT file.
- No actual deck was opened on mobile, Teams, email, or projector display.
- Microsoft 365/Copilot account availability, billing, Designer/Copilot feature rollout, and generated deck quality were not checked.
- Storybook/Figma runtime, repo dependency delta, CI, browser QA, and connector state were not checked.
- Threads/X full-context SNS search was not used as source-backed evidence.

## Cross Verification Evidence

- Microsoft PowerPoint design guidance was cross-checked against Microsoft PowerPoint accessibility guidance for accessibility-specific QA.
- W3C WAI accessible presentation resources were used as standards cross-check, not as proof of artifact conformance.
- NN/g visual hierarchy already stored in LLM Wiki supports the one-message, hierarchy, grouping, and attention-direction interpretation.
- Local duplicate search checked `30_Knowledge/LLM_Wiki`, `00_Inbox/LLM_Wiki`, recent reports, index, log, and the PPT/frontend checklist before creating a new note.

## Ethan Can Use This Immediately

- PPT를 보내기 전에 `async_readability`: 발표자 없이 열어도 제목, 핵심 문장, 다음 행동이 보이는지 확인하시면 됩니다.
- 데이터 슬라이드는 `one_insight_per_data_slide`: 차트 하나가 한 가지 주장만 말하는지 확인하시면 됩니다.
- 모바일/Teams 공유용으로 `small_screen_readability`: 축 라벨, 수치, 범례, 핵심 문장이 zoom 없이 읽히는지 확인하시면 됩니다.
- frontend dashboard도 같은 방식으로 card/chart 하나가 하나의 의사결정 insight를 말하는지 보시면 됩니다.

## Improvement Delta

- 기존 PPT/frontend checklist가 접근성과 시각 계층 중심이었다면, 이번 실행으로 비동기 공유와 작은 화면 판독성 기준이 추가됐다.
- 데이터 시각화 QA가 `chart description`에서 `one insight per chart`와 `direct chart labels`로 더 구체화됐다.
- PPT 디자인 트렌드 글은 고신뢰/공식 출처가 아니면 바로 흡수하지 않는 기준을 유지했다.

## Adoption Check

- done: 직전 15:34 Next Eval의 "PPT/design/frontend source는 checklist field를 바꿀 때만 추가" 기준을 적용했다.
- done: 새 source note는 실제로 `PPT Frontend Visual Communication Checklist`에 재사용 항목을 추가했다.
- done: queue의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 직접 재확인했다.
- carried: Figma Agent/MCP/Skills/Motion은 approved workspace/file/export/billing context가 있을 때 재평가한다.
- carried: Storybook MCP/performance는 concrete frontend project context가 있을 때 재평가한다.
- carried: 실제 PPT artifact QA는 다음 PPT 파일이 있을 때 Microsoft Checker와 small-screen review로 확인한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add PPT/design/frontend only when QA field changes | carried operating rule | done | Microsoft PowerPoint source added async/mobile and one-insight QA fields. |
| Future PPT artifact QA | carried | carried | No actual PPT file was available in this run. |
| Figma MCP/Agent connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Storybook MCP/performance | carried/project-specific | carried | No concrete frontend repo, package diff, CI runtime, or rollback path. |
| Commercial PPT trend sources | discovery-only | dropped for storage | Vendor/trend signal was weaker than Microsoft/W3C/NN-g anchors. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Does not add another PPT/design/frontend source unless it changes a checklist field beyond async/mobile readability, accessibility, visual hierarchy, one-insight charts, or approval gates.
3. If no high-provenance source changes a rule, creates only a short no-new-signal report.
4. For the next real PPT artifact, records actual `small_screen_readability`, `accessibility_checker`, `one_insight_per_data_slide`, and `direct_chart_labels` evidence.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, a presentation-design source is promotable only if it adds or sharpens a reusable QA field. For PPT/deck work, prefer fields such as async_readability, small_screen_readability, one_idea_per_slide, one_insight_per_data_slide, direct_chart_labels, accessibility_checker, and human_review.required.
```

## Questions / Tracking Candidates

- 다음 실제 PPT 파일이 생기면 작은 화면 캡처 또는 Teams/메일 공유 화면 판독성을 QA evidence로 남길 수 있는지 확인한다.
- PowerPoint Accessibility Checker 결과를 `errors`, `warnings`, `tips`로 구조화해 `QA_REPORT.md`에 남길지 확인한다.
- Storybook MCP는 실제 frontend repo가 있을 때만 dependency, CI, accessibility, rollback 기준으로 다시 본다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| durable prompt checked | passed | `automation.toml` read; temporary focus is present though console output is mojibake-prone |
| operating docs read | passed | growth-scan skill, watchdog skill, Vault/LLM Wiki docs, improvement guide |
| recent reports read | passed | 15:34/15:04/15:03/14:33 reports checked |
| queue counted | passed | direct table count preserved 95 candidates and zero eligible/not-checked/install-next |
| internet search | passed | Microsoft/W3C/Storybook/Figma/CreativePro lanes checked |
| duplicate check | passed | local LLM Wiki/report/inbox search performed before storage |
| source note schema | passed | required frontmatter and `## Original Content` included |
| install ban | passed | no install/enable/connect/create action performed |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 150, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | required source/report metadata and `## Original Content` checked; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Microsoft product blog guidance could be mistaken for actual artifact conformance.
- Mitigation: stored as knowledge-only, cross-checked against Microsoft accessibility and W3C WAI, and left all real PPT/app/account checks as not checked.
