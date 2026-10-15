---
type: llm-wiki-report
status: final
confidence: high
claimType: mixed
evidenceScope: source-backed-with-dex-inference
verificationStatus: verified
disputed: false
sourceKind: growth-scan-report
source:
  - "https://www.w3.org/WAI/tutorials/tables/"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  - "https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort"
  - "https://designsystem.digital.gov/components/table/"
  - "https://design-system.service.gov.uk/components/table/"
  - "https://carbondesignsystem.com/components/data-table/usage/"
collectionPurpose: "Dex Company Growth Scan 2026-07-04 21:03 KST 결과와 PPT/frontend data table/grid QA checklist 보강 기록"
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
verifiedAt: 2026-07-04
verifiedBy: Dex
tags:
  - llm-wiki/report
  - growth-scan
  - ppt
  - frontend
  - dashboard
  - accessibility
  - data-table
---

# Dex Company Growth Scan - Data Table / Grid QA

## Original Content

이 보고서는 2026-07-04 21:03 KST 실행 결과다. 원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 기준, QA 결과만 보존한다. 이번 실행은 “덱스가 스스로 학습했다”가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Run Scope and Limits

- 실행 시각: 2026-07-04 21:03 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전이다.
- 검색 범위: automation memory, 현재 폴더, Vault 운영 문서, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 20:33/20:00/19:03/18:33 보고서, 10x candidate queue, W3C WAI table/grid 자료, MDN `aria-sort`, USWDS/GOV.UK/Carbon table 자료, local duplicate search.
- 우선순위: design, UX, UI, GUI, PPT, frontend, accessibility QA, dashboard UI, product UI.
- 한계: 실제 PPT 파일, frontend repo, browser accessibility tree, screen reader test, Storybook runtime, Playwright interaction test는 이번 실행에서 돌리지 않았다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 15 | public source lanes 10개와 local duplicate/status lanes 5개 |
| stored.count | 1 | W3C data table/grid accessibility QA source note 1개 |
| duplicate.count | 5 | 기존 large UI performance, interactive control, status message, Carbon general accessibility, generic WCAG coverage |
| deferred.count | 4 | 실제 PPT/frontend artifact QA, Storybook table runtime, screen reader table navigation, package/component adoption |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 검증 기준 |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. 기존 checklist는 큰 리스트/트리 성능과 interactive control target/focus를 다루지만, 데이터 테이블 자체의 caption/header/sort/grid evidence field는 비어 있었다.
2. W3C WAI Tables Tutorial은 데이터 셀과 header cell 관계를 markup으로 표현해야 assistive technology가 맥락을 전달할 수 있다는 기준을 준다.
3. WAI-ARIA APG는 static table과 interactive grid를 구분한다. grid를 선택하면 keyboard focus movement를 직접 책임져야 하므로 “테이블처럼 생겼다”만으로 접근성이 확보되지 않는다.
4. Virtualized table/grid는 DOM에 일부 행만 있으므로 전체 row/column count, visible index, hidden column, sort state 같은 정보를 별도 evidence로 확인해야 한다.
5. PPT와 dashboard 모두 표가 “비교/스캔”을 돕는 구조인지 먼저 판단해야 한다. 빽빽한 표를 축소해서 보여주는 것은 발표 자료와 frontend 양쪽에서 이해 비용을 높인다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WAI Tables Tutorial | https://www.w3.org/WAI/tutorials/tables/ | official docs | stored-source | high | caption/header/data-cell relation QA |
| WAI-ARIA APG Table Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/table/ | official docs | stored-source cross-check | high | static table vs widget distinction |
| WAI-ARIA APG Grid Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/grid/ | official docs | cross-check | high | interactive grid keyboard/focus model |
| WAI-ARIA Grid and Table Properties | https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/ | official docs | cross-check | high | virtualized row/column and sort evidence |
| MDN aria-sort | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort | technical reference | cross-check | medium-high | sortable column announcement field |
| USWDS Table | https://designsystem.digital.gov/components/table/ | design system docs | cross-check | medium-high | table as structured comparison guidance |
| GOV.UK Table | https://design-system.service.gov.uk/components/table/ | design system docs | cross-check | medium-high | caption/header/layout-table guardrail |
| Carbon Data Table | https://carbondesignsystem.com/components/data-table/usage/ | design system docs | cross-check | medium-high | admin table actions, sort, selection, pagination |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-data-table-grid-accessibility-qa.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 queue의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했다.
- Source: W3C data table/grid accessibility QA source note 1개를 추가했다.
- Wiki: PPT/frontend checklist에 data table/grid QA evidence row와 source link를 추가했다.
- Reports: 이 보고서를 추가했다.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|
| W3C table/grid guidance | knowledge-only | no install | checklist를 artifact conformance proof로 과신하면 overreliance |
| MDN aria-sort | cross-check only | no install | implementation reference, not artifact proof |
| USWDS/GOV.UK/Carbon table docs | cross-check only | no package imported | design system docs only; component adoption 아님 |
| Storybook/table runtime QA | carried/project-specific | no package, MCP, CI, server run | supply chain, brittle tests, auth/CI/rollback context 필요 |

## Duplicate / Excluded

- duplicate-general: 기존 `large_state.count`와 `scroll_fps_or_jank`는 큰 UI 성능을 다루지만, header/caption/sort/grid semantics를 직접 다루지 않았다.
- duplicate-adjacent: interactive control target/focus source는 table action button/pagination에 연결되지만, table/grid 구조 evidence를 대체하지 않는다.
- carried/project-specific: Carbon component runtime, Storybook table story, package adoption은 실제 repo와 dependency/CI/rollback context가 있을 때 평가한다.
- source-weak: Threads public snippets는 이번 source-backed note에 필요하지 않았다.
- blocked: X는 자동화 규칙상 제외했다.

## Failure / Blocked / Not Checked

- 실제 PPT, web deck, dashboard, frontend repo, Storybook story, Playwright/browser QA는 실행하지 않았다.
- 실제 screen reader table navigation, browser accessibility tree, virtualized grid row index announcement는 확인하지 않았다.
- Carbon package, design-system package, browser extension, connector, MCP server, GitHub workflow는 설치/연결/실행하지 않았다.
- W3C/APG 문서는 강한 근거지만, 실제 UI 접근성 합격 증거는 아니다.

## Cross-Verification

- W3C Tables Tutorial과 GOV.UK Table을 교차 확인해 caption/header/scope와 layout table 금지 기준을 확인했다.
- WAI-ARIA APG Table Pattern과 Grid Pattern을 교차 확인해 static table과 interactive grid의 책임 차이를 확인했다.
- WAI-ARIA Grid and Table Properties와 MDN `aria-sort`를 교차 확인해 virtualized table/grid의 row/column count, index, sort state announcement 기준을 확인했다.
- USWDS와 Carbon을 교차 확인해 실무 dashboard/admin UI에서 table이 비교, sorting, selection, expansion, pagination, toolbar와 함께 쓰이는 패턴을 확인했다.
- Local duplicate search에서 `data table accessibility`, `aria-sort`, `table_caption`, `grid_focus_management`에 해당하는 전용 checklist field가 없음을 확인했다.

## 에던님이 바로 쓰실 수 있는 예시

- PPT에 큰 비교표를 넣을 때: 첫 줄에 “이 표에서 내려야 할 결정”을 쓰고, 본문 표에는 핵심 열만 남기며, 상세 표는 부록이나 speaker notes로 뺍니다.
- dashboard table QA 때: caption 또는 table title, column header, row header, sort state, pagination 위치, 선택/일괄작업 모델을 QA_REPORT에 따로 적습니다.
- admin grid를 만들 때: native table로 충분한지 먼저 판단하고, spreadsheet식 grid가 필요하면 Tab 한 번으로 들어가서 arrow key로 이동되는지 검증합니다.
- virtualized table을 만들 때: 성능만 보지 말고 전체 행 수, 현재 보이는 행 index, 숨겨진 column, 정렬 상태가 보조기술에 전달되는지 확인합니다.
- sortable header를 만들 때: 화살표 아이콘만 넣지 말고 현재 정렬된 column 하나에만 `aria-sort`가 설정되는지 확인합니다.

## Improvement Delta

- `PPT Frontend Visual Communication Checklist`가 data table/grid QA를 별도 output type으로 다루게 됐다.
- 새 QA evidence fields: `table_caption`, `not_layout_table`, `header_cell_scope`, `row_header_present`, `complex_header_mapping`, `sort_state_announced`, `selection_model`, `pagination_position`, `virtualized_row_count`, `visible_row_indices`, `keyboard_model`, `grid_focus_management`, `screen_reader_table_navigation_checked`.
- 이번 보강은 대시보드/관리자 UI에서 “표가 보이는가”를 넘어 “행/열 관계와 상호작용 모델이 전달되는가”까지 확장한다.

## Adoption Check

- done: 직전 Next Eval의 “구체 PPT/frontend QA field가 바뀔 때만 source note 추가” 기준을 적용했다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 queue file에서 재확인했다.
- done: W3C/MDN/design-system docs를 knowledge-only로 저장하고 package/component adoption으로 과장하지 않았다.
- carried: 실제 PPT/frontend artifact QA는 파일이나 repo가 있을 때 수행한다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때 재평가한다.
- carried: Figma/connector/account tools는 승인된 workspace/file/export/billing context가 있을 때 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Data table/grid QA fields were added. |
| Future real PPT/frontend artifact QA | carried | carried | No concrete artifact or repo was available. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, auth scope, or rollback path. |
| Figma Motion/Agent/MCP connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Threads signal | source-weak | dropped for storage | Public snippets were not needed for data-table source-backed note. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, complex image long-description equivalence, carousel/slideshow QA, complex information/cognitive support, interactive control target/focus QA, dynamic status/live region QA, or data table/grid QA.
3. If it revisits tables, prioritize actual artifact evidence such as browser accessibility tree, screen reader table navigation, row/column count, sort state announcement, keyboard model, and grid focus retention over adding more general guidance.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, promote table/grid sources only when they add artifact-level QA evidence. For dashboard tables, admin data grids, comparison tables, sortable columns, row selection, expandable rows, pagination, and virtualized grids, record table_caption, not_layout_table, header_cell_scope, row_header_present, complex_header_mapping, sort_state_announced, selection_model, pagination_position, virtualized_row_count, visible_row_indices, keyboard_model, grid_focus_management, and screen_reader_table_navigation_checked. Prefer native table when sufficient; if using ARIA grid, verify focus movement and keyboard interaction.
```

## Questions / Tracking Candidates

- 다음 실제 dashboard/frontend 작업에서 table 1개를 골라 native table인지 grid인지 먼저 판정한다.
- PPT 데이터 표 작업이 생기면 “표 전체 표시”보다 “핵심 열과 insight를 분리”하는지 확인한다.
- Storybook이 있는 repo에서는 sortable/virtualized table story에 keyboard와 accessibility-tree evidence를 붙일 수 있는지 본다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| operating docs read | passed | AGENTS, role docs, LLM Wiki index/log, improvement model, checklist |
| recent reports checked | passed | 20:33, 20:00, 19:03, 18:33 reports |
| queue recounted from file | passed | `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | W3C/MDN/USWDS/GOV.UK/Carbon lanes checked |
| duplicate check | passed | local table/grid searches found no dedicated checklist fields |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 158, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked after edits; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

PASS_WITH_WARNINGS. W3C table/grid guidance is strong enough for knowledge-only QA field absorption, but it is not proof that any real deck, dashboard, or frontend artifact is accessible. The mitigation is explicit: actual artifact QA remains carried, and no implementation code or tool was installed.
