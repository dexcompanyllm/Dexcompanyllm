---
type: llm-wiki-source
status: active
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
disputed: false
sourceKind: official-docs
source:
  - "https://www.w3.org/WAI/tutorials/tables/"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/table/"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/grid/"
  - "https://www.w3.org/WAI/ARIA/apg/practices/grid-and-table-properties/"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-sort"
  - "https://designsystem.digital.gov/components/table/"
  - "https://design-system.service.gov.uk/components/table/"
  - "https://carbondesignsystem.com/components/data-table/usage/"
collectionPurpose: "Dex Company의 frontend, dashboard, product UI, web deck QA에서 데이터 테이블과 상호작용 그리드를 구분하고, caption/header/sort/virtualized-row evidence를 기록하기 위한 출처 기반 QA 필드를 보존한다."
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
verifiedAt: 2026-07-04
verifiedBy: Dex
publisher: "W3C Web Accessibility Initiative; MDN; USWDS; GOV.UK Design System; Carbon Design System"
tags:
  - llm-wiki/source
  - accessibility
  - frontend
  - dashboard
  - data-table
  - interaction-design
---

# W3C Data Table and Grid Accessibility QA

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 21:03 KST에 W3C WAI Tables Tutorial, WAI-ARIA APG table/grid patterns, WAI-ARIA grid and table properties, MDN `aria-sort`, USWDS Table, GOV.UK Table, Carbon Data Table usage를 확인했고, 이 note에는 Dex Company 운영에 필요한 출처 메타데이터, 확인 범위, 요약, QA 필드만 보존한다.

- Source title: W3C WAI Tables Tutorial
- Source title: WAI-ARIA APG Table Pattern
- Source title: WAI-ARIA APG Grid Pattern
- Source title: WAI-ARIA APG Grid and Table Properties
- Cross-check: MDN `aria-sort`, USWDS Table, GOV.UK Table, Carbon Data Table
- Confirmation scope: table purpose/caption, header/data-cell relationship, `scope`/`id`/`headers`, native table vs ARIA table vs grid distinction, keyboard/focus responsibility in grid widgets, virtualized row/column count, sort state announcement, table use for comparison rather than layout.

## 핵심 내용 쉬운 설명

데이터 테이블은 숫자와 항목을 보기 좋게 줄 세우는 장식이 아니라, 사용자가 행과 열의 관계를 이해하고 비교하는 구조다. 스크린 리더 사용자는 각 셀이 어떤 행/열 제목과 연결되는지 알아야 하므로 `caption`, header cell, `scope`, `headers` 같은 구조 정보가 중요하다.

상호작용이 거의 없는 비교 표라면 native HTML table이 우선이다. 각 셀 안에 많은 버튼, 체크박스, 입력이 있고 화살표 이동 같은 스프레드시트식 탐색이 필요하면 ARIA grid가 후보가 될 수 있지만, 이 경우 focus 이동과 keyboard interaction을 직접 책임져야 한다. 큰 테이블을 virtualization으로 일부 행만 DOM에 렌더링하면 보조기술이 전체 행/열 수와 현재 위치를 알 수 있도록 row/column count와 index evidence를 별도로 확인해야 한다.

## Dex Company 사용 예시

- 대시보드 테이블 QA에서 `table_caption`, `column_header_scope`, `row_header_scope`, `sort_state_announced`, `pagination_position`, `virtualized_row_count`, `visible_row_indices`, `keyboard_model`, `grid_focus_management`, `not_layout_table`을 evidence로 기록한다.
- PPT에 큰 표를 넣을 때는 표 자체를 축소해 빽빽하게 넣기보다, 핵심 insight를 제목/주석으로 분리하고 원본 표나 상세 데이터는 부록, speaker notes, 별도 링크로 보낸다.
- frontend에서 sortable column을 만들면 시각적 화살표만 넣지 않고 현재 정렬된 header 하나에만 정렬 상태를 노출하는지 확인한다.
- row selection, batch action, expandable row가 있는 admin UI는 일반 table인지 grid인지 먼저 정하고, grid라면 Tab stop과 arrow-key navigation을 실제로 QA한다.
- virtualized data grid는 빠르게 보이는지뿐 아니라 전체 행 수, 현재 행 index, hidden/skipped columns, sort state가 assistive technology에 전달되는지 확인한다.

## WCAG / Accessibility QA Link

- W3C WAI Tables Tutorial은 데이터 셀과 header cell의 관계를 markup으로 명확히 해야 assistive technology가 맥락을 전달할 수 있다고 설명한다.
- WAI-ARIA APG Table Pattern은 ARIA table이 static tabular structure이며 interactive widget이 아니라고 구분한다. table 내부에 focusable widget이 많으면 tab sequence가 길어질 수 있고, 이때 grid pattern 검토가 필요하다.
- WAI-ARIA APG Grid Pattern은 grid가 composite widget이므로 내부 focus movement를 author가 제공해야 한다고 설명한다.
- WAI-ARIA Grid and Table Properties는 virtualization, hidden columns, row/column spans, sorting처럼 DOM만으로 알기 어려운 정보를 ARIA property로 보완해야 하는 상황을 설명한다.
- MDN `aria-sort`는 정렬 가능한 table/grid에서 현재 정렬된 header의 상태를 assistive technology에 전달하는 구현 근거로 쓴다.
- USWDS와 GOV.UK는 표를 비교/스캔이 필요한 정보에 사용하고 layout 목적으로 사용하지 말라는 운영 기준을 보강한다.
- Carbon Data Table은 sort, expansion, selection, batch action, toolbar, pagination 같은 실무 admin UI 패턴을 cross-check하는 근거다.

## Evidence Quality

- high: W3C WAI와 WAI-ARIA APG는 표/그리드 접근성 구조와 keyboard model의 1차 근거다.
- medium-high: MDN은 frontend 구현 속성인 `aria-sort`의 실제 사용 caveat를 보강한다.
- medium-high: USWDS, GOV.UK, Carbon은 정부/엔터프라이즈 design system의 실무 패턴과 사용/비사용 기준을 제공한다.
- partial: 실제 Ethan 프로젝트의 table, dashboard, PPT, Storybook story, browser accessibility tree, screen reader 조합 테스트는 이번 실행에서 확인하지 않았다.

## License / Install / Security Risk

- 문서형 자료이며 설치가 없다.
- 실행 코드, package, MCP server, connector, browser extension, GitHub workflow를 설치하거나 실행하지 않았다.
- Carbon/USWDS/GOV.UK component 문서는 pattern 참고용이며, 특정 package 도입 근거가 아니다.
- OWASP LLM risk는 낮다. 다만 checklist만 보고 실제 table/grid 접근성 통과로 과장하면 overreliance 위험이 있다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: caption/header relationship, native table 우선, ARIA table과 grid 구분, grid keyboard/focus responsibility, row/column count/index, sort state announcement, layout table 금지.
- Dex inference: PPT 표, dashboard table, admin data grid, web deck comparison table에 같은 evidence field를 적용하는 Dex Company 운영 방식.
- not checked: 실제 artifact conformance, browser/assistive technology 조합, Carbon component runtime, Storybook/Playwright table interaction test, legal accessibility claim.

## Prompt Patch Candidate

Dashboard, admin UI, data-heavy PPT, web deck comparison table을 만들 때는 table을 단순 시각 요소로 보지 말고 `table_caption`, `header_cell_scope`, `row_header_present`, `sort_state_announced`, `selection_model`, `pagination_position`, `virtualized_row_count`, `visible_row_indices`, `keyboard_model`, `grid_focus_management`, `not_layout_table`, `screen_reader_table_navigation_checked`를 QA evidence로 기록한다. Native table로 충분한지, ARIA grid가 필요한지 먼저 판단하고 grid를 선택하면 focus 이동과 keyboard interaction을 실제로 검증한다.
