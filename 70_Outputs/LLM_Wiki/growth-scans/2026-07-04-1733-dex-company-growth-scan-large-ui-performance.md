---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Large UI Performance - 2026-07-04 17:33 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T17:33:05+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://www.figma.com/blog/improving-performance-in-the-layers-panel/"
  - "https://web.dev/articles/virtualize-long-lists-react-window"
  - "https://reactnative.dev/docs/next/virtualizedlist"
  - "https://developer.mozilla.org/en-US/docs/Web/Performance"
  - "https://www.w3.org/WAI/tips/developing/"
  - "https://www.w3.org/WAI/test-evaluate/preliminary/"
  - "https://storybook.js.org/blog/storybook-bloat-fixed/"
  - "https://support.microsoft.com/en-us/powerpoint/edit-with-copilot-in-powerpoint"
  - "https://www.threads.com/"
collectionPurpose: "30분 간격 Growth Scan에서 임시 design/PPT/frontend 집중 모드에 맞춰, 직전 canvas 접근성 QA 이후 실제 frontend/product UI 체크리스트를 바꿀 수 있는 대형 UI 성능 신호를 확인했다."
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
  - frontend
  - performance
  - design
---

# Dex Company Growth Scan Large UI Performance - 2026-07-04 17:33 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 17:33 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전이다.
- 검색 범위: automation memory, current folder, durable prompt, Vault 운영 문서, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 17:04/16:33/16:04/15:34 보고서, 10x candidate queue, Figma engineering blog, W3C WAI, Storybook, Microsoft PowerPoint/Copilot, web.dev, React Native, MDN, Threads 공개 검색 조각, local duplicate search.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma/Canva/Microsoft app, account, token, billing, cloud resource, workflow, model switch, file deletion은 설치/연결/실행/생성하지 않았다.

## Original Content

이 보고서는 자동화 실행 기록이다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/저장 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 13 | public candidate lanes plus local duplicate lanes |
| stored.count | 1 | Figma layers panel large UI performance source note |
| duplicate.count | 7 | W3C developing/easy checks/update, Storybook 9/performance, Microsoft PowerPoint/Copilot, Figma canvas/accessibility |
| deferred.count | 4 | Figma connector/account, Storybook runtime/MCP, actual frontend profiling, Threads weak signals |
| blocked.count | 1 | X excluded by automation rule |
| lint.warning_count | 0 | status/lint/fallback checks after edits |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. Figma의 레이어 패널 사례는 대형 UI 성능이 단순 렌더링 문제가 아니라 선택, 입력, 드래그 같은 편집 흐름 전체를 느리게 만들 수 있음을 보여준다.
2. 대형 리스트/트리 UI는 작은 mock state만 보면 통과처럼 보인다. QA에는 최대 데이터, 깊은 중첩, 확장된 트리, 실시간 업데이트 상태가 필요하다.
3. windowing/virtualization은 성능을 개선하지만 state preservation, blank content, overscan/memory tradeoff를 함께 확인해야 한다.
4. W3C/Microsoft/Storybook/Threads 신호는 이번 실행에서 기존 체크리스트를 더 바꾸지 못했다.
5. Figma 공식 글은 도구 설치 후보가 아니라 knowledge-only QA 기준으로만 흡수해야 한다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence Quality | Dex Company use |
|---|---|---|---|---|---|
| Figma layers panel performance | https://www.figma.com/blog/improving-performance-in-the-layers-panel/ | official engineering blog | stored-source | medium | Adds large list/tree UI performance fields to frontend QA. |
| web.dev virtualize long lists | https://web.dev/articles/virtualize-long-lists-react-window | web.dev article | cross-check | medium | Confirms windowing and overscan tradeoff for long lists/tables. |
| React Native VirtualizedList | https://reactnative.dev/docs/next/virtualizedlist | official docs | cross-check | medium | Confirms finite render window, async rendering, state/blank-content caveats. |
| MDN Web Performance | https://developer.mozilla.org/en-US/docs/Web/Performance | technical reference | cross-check | high | Grounds runtime responsiveness, scrolling smoothness, and performance budgets. |
| W3C WAI developing / easy checks | https://www.w3.org/WAI/tips/developing/ | standards education | duplicate-source | high | Accessibility fields already covered by current checklist. |
| Storybook bloat/performance | https://storybook.js.org/blog/storybook-bloat-fixed/ | official project blog | duplicate/project-specific | medium | Useful only with concrete Storybook repo/dependency context. |
| Microsoft Copilot PowerPoint editing | https://support.microsoft.com/en-us/powerpoint/edit-with-copilot-in-powerpoint | official support doc | deferred/account-specific | medium | Brand kit/model choice is account-specific and already covered by approval gate. |
| Threads design-system/AI snippets | https://www.threads.com/ | public SNS | source-weak | low | Discovery only; no stable source note. |

## Stored / Absorbed Sources

- Source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-figma-layers-panel-large-ui-performance.md`
- Wiki guide updated: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1733-dex-company-growth-scan-large-ui-performance.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | Added Figma layers panel large UI performance source note |
| wiki/guides | Added large list/tree UI performance QA fields |
| index.md | Added source note and operating rule |
| log.md | Added 17:33 growth scan entry |
| candidate queue | No change; zero eligible/not-checked/install-next preserved |
| automation memory | This run summary appended |

## Install / Due Diligence Candidates

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| Figma layers panel performance article | knowledge-only | not installed or connected | overreliance if treated as proof that local UI is fast |
| Figma connector / MCP / Agent | approval-not-ready | not installed, connected, or run | workspace permission, file sensitivity, prompt injection, billing, export scope |
| React virtualization libraries | not selected | not installed | supply chain, dependency bloat, state bugs, accessibility regressions |
| Storybook performance/runtime lane | project-specific conditional | not installed or run | local server exposure, CI cost, overreliance on small stories |

## Duplicate / Excluded

- duplicate-source: W3C WAI developing/easy checks/update, W3C WCAG-EM, Figma canvas accessibility, Microsoft PowerPoint accessibility/design.
- duplicate/project-specific: Storybook 9 performance and component testing signals until a concrete frontend repo exists.
- deferred/account-specific: Microsoft Copilot PowerPoint Brand Kit/model choice because account, enterprise plan, brand asset permission, generated-output review, and billing were not checked.
- source-weak: Threads snippets about Figma/AI/design systems.
- blocked: X remains excluded by automation rule.

## Failure / Blocked / Not Checked

- No actual frontend repo, Storybook, dashboard, log table, file tree, canvas, or Figma file was profiled.
- No browser performance trace, FPS check, INP, memory measurement, Playwright run, or accessibility tree inspection was performed.
- No virtualization package was installed or audited against a target repo.
- Threads full-context extraction remains source-weak.
- The Figma article is vendor-authored and should not be treated as proof that any Dex Company artifact is performant.

## Cross Verification Evidence

- Figma's two-pass/windowed computation pattern was cross-checked with web.dev's long-list virtualization guidance.
- React Native VirtualizedList was used to capture state preservation and blank-content caveats that pure performance guidance can hide.
- MDN Web Performance was used to keep the QA field tied to objective runtime and perceived responsiveness, not only code architecture.
- Local duplicate search checked `30_Knowledge/LLM_Wiki`, `00_Inbox/LLM_Wiki`, `70_Outputs/LLM_Wiki`, index, log, recent reports, and the checklist before storage.

## Ethan Can Use This Immediately

- 대시보드, 리스트, 로그, 파일 트리, 레이어 패널을 만들 때 `small mock`만 승인하지 마시고 `large_state.count`를 먼저 정하시면 됩니다. 예: 1,000 rows, 20 nested levels, 200 expanded nodes.
- QA_REPORT에는 `visible_window`, `update_scope`, `scroll_fps_or_jank`, `state_preservation`, `memory_tradeoff`를 남기시면 됩니다.
- Storybook이 있으면 기본 story와 별개로 `HugeData`, `DeepTree`, `AllExpanded`, `RealtimeUpdates` story를 요구하시면 됩니다.
- PPT에는 직접 적용 범위가 좁지만, 발표용 대시보드 캡처나 Figma Slides/웹 deck이 대형 데이터 UI를 보여줄 때는 "보기 좋은 한 컷"과 "실제 조작 가능한 상태"를 분리해서 판단하시면 됩니다.

## Improvement Delta

- 직전 17:04 실행이 custom-rendered UI 접근성 모델을 추가했다면, 이번 실행은 대형 리스트/트리 UI의 런타임 성능과 상태 보존을 QA 대상으로 추가했다.
- `PPT Frontend Visual Communication Checklist`에 large list/tree UI evidence row를 추가했다.
- 디자인/프론트엔드 자료 저장 기준을 "새 도구 소개"가 아니라 "실제 QA 필드가 바뀌는가"로 유지했다.

## Adoption Check

- done: 직전 Next Eval의 "구체적 QA field를 바꿀 때만 추가" 기준을 적용했다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 직접 재확인했다.
- done: Figma 자료를 connector/agent 설치 후보가 아닌 knowledge-only 성능 QA 기준으로 저장했다.
- carried: 실제 PPT artifact QA는 파일이 있을 때 수행한다.
- carried: Figma Agent/MCP/connector는 승인된 workspace/file/export/billing context가 있을 때 재평가한다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Large list/tree performance QA fields were added. |
| Future real frontend/canvas artifact QA | carried | carried | No concrete repo/artifact was available. |
| Figma MCP/Agent connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, or rollback path. |
| Microsoft Copilot brand template | deferred/account-specific | deferred | Still account/enterprise/asset-specific and not a new checklist field. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, or large list/tree UI performance.
3. For the next real dashboard/list/tree frontend artifact, records `large_state.count`, `visible_window`, `update_scope`, `scroll_fps_or_jank`, `state_preservation`, `memory_tradeoff`, and `statement_limit`.
4. Does not treat Figma vendor implementation notes as evidence that a local artifact is performant.

## Prompt or Template Patch Candidate

```text
For dashboards, log viewers, file trees, layer panels, search results, feeds, and other large list/tree UI, do not approve only the small mock state. Record large_state.count, visible_window, update_scope, scroll_fps_or_jank, state_preservation, memory_tradeoff, and statement_limit. Treat vendor performance articles as QA-field sources, not local artifact performance evidence.
```

## Questions / Tracking Candidates

- 다음 frontend repo에서 대형 리스트/트리 UI가 있으면 Playwright 또는 browser performance trace로 실제 scroll/input responsiveness를 볼지 정한다.
- Storybook이 있는 프로젝트에서는 `HugeData`, `DeepTree`, `AllExpanded`, `RealtimeUpdates` story를 acceptance test로 둘지 확인한다.
- Figma/Canva/PowerPoint 계정 연동 기능은 실제 파일, workspace permission, billing, export path가 있을 때만 approval-ready packet으로 재평가한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| durable prompt checked | passed | `automation.toml` temporary focus present |
| operating docs read | passed | Vault role/LLM Wiki docs, index/log, improvement model, checklist |
| recent reports read | passed | 17:04/16:33/16:04/15:34 reports checked |
| queue counted | passed | direct table count preserved zero eligible/not-checked/install-next |
| internet search | passed | Figma/W3C/Storybook/Microsoft/web.dev/React Native/MDN/Threads lanes checked |
| duplicate check | passed | local LLM Wiki/report/inbox search performed |
| source note schema | passed | required frontmatter and `## Original Content` included |
| install ban | passed | no install/enable/connect/create action performed |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 153, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Figma vendor engineering article can be mistaken for evidence that local Dex Company UI is performant.
- Mitigation: stored as knowledge-only, cross-checked with web.dev/React Native/MDN, and added explicit large-state QA evidence fields.
- Finalized at: 2026-07-04T17:43:00+09:00 after report/index/log/memory updates and verification.
