---
type: llm-wiki-guide
status: active
layer: wiki
explored: false
title: "PPT Frontend Visual Communication Checklist"
created: 2026-07-04
updated: 2026-07-10
dateCreated: 2026-07-04
dateModified: 2026-07-10
confidence: high
claimType: prescriptive
evidenceScope: source-backed-synthesis
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/wiki
  - ppt
  - frontend
  - design
  - ux
  - checklist
---

# PPT Frontend Visual Communication Checklist

## 목적

이 guide는 에던님의 PPT 작업과 frontend 작업을 같은 visual communication 품질 기준으로 묶는다. 좋은 PPT 한 장과 좋은 UI 화면은 모두 사용자의 시선, 이해, 행동을 설계한다.

## Source Notes

- [[2026-07-04-w3c-wai-accessible-presentations]]
- [[2026-07-04-microsoft-powerpoint-accessibility]]
- [[2026-07-04-microsoft-powerpoint-design-ideas-2026]]
- [[2026-07-04-w3c-wcag-em-2-digital-product-evaluation]]
- [[2026-07-04-figma-canvas-accessibility-mirror-dom]]
- [[2026-07-04-figma-layers-panel-large-ui-performance]]
- [[2026-07-04-w3c-carousel-slideshow-accessibility-qa]]
- [[2026-07-04-w3c-coga-alternative-content-complex-info]]
- [[2026-07-04-w3c-wcag22-target-focus-control-qa]]
- [[2026-07-04-w3c-wcag22-status-live-region-qa]]
- [[2026-07-04-w3c-data-table-grid-accessibility-qa]]
- [[2026-07-04-w3c-forms-validation-error-qa]]
- [[2026-07-04-slidev-developer-presentations]]
- [[2026-07-04-revealjs-web-presentations]]
- [[2026-07-04-nngroup-visual-hierarchy-ux]]
- [[2026-07-08-nngroup-design-specs-handoff]]
- [[2026-07-03-storybook-accessibility-testing]]
- [[2026-07-03-storybook-9-component-testing]]
- [[2026-07-10-storybook-env-build-secret-exposure-advisory]]
- [[2026-07-03-playwright-release-notes-web-testing]]
- [[2026-07-09-w3c-coga-research-modules-ai-conversation-safety]]
- [[2026-07-09-figma-make-local-codebase-handoff]]
- [[2026-07-09-figma-mcp-slides-living-deck-refresh]]
- [[2026-07-09-figma-ai-credits-make-slides-cost-gate]]
- [[2026-07-03-carbon-design-system-accessibility]]
- [[2026-07-03-material-design-tokens]]

## 공통 원칙

1. 한 화면에는 하나의 중심 메시지가 있어야 한다.
2. 첫 시선, 두 번째 시선, 행동 유도가 순서대로 설계되어야 한다.
3. hierarchy는 색상만으로 만들지 않고 크기, 대비, 간격, 그룹핑, 라벨을 함께 쓴다.
4. 중요한 시각 정보는 말, 텍스트, alt text, caption, notes 중 하나 이상의 경로로 보완한다.
5. 자료를 보는 사람이 화면을 작게 보거나, 색을 구분하기 어렵거나, 발표 음성을 놓쳐도 핵심을 따라갈 수 있어야 한다.

## PPT 체크리스트

- [ ] 슬라이드마다 고유하고 의미 있는 제목이 있다.
- [ ] 한 슬라이드의 핵심 주장이 1문장으로 말해진다.
- [ ] 본문 텍스트는 발표자가 말할 내용을 모두 복붙하지 않고, 핵심 구조만 남긴다.
- [ ] 제목, 핵심 수치, 근거, 보조 설명의 크기와 대비가 다르다.
- [ ] 차트/이미지/도형에는 필요한 설명 또는 alt text가 있다.
- [ ] 색 대비, 폰트 크기, reading order, 링크 텍스트를 확인했다.
- [ ] 발표자가 "이 슬라이드를 보시면"이라고만 말하지 않고 중요한 시각 정보를 설명한다.
- [ ] PDF/공유본으로 내보낼 때 접근성 tag, speaker notes, transcript 필요 여부를 확인한다.
- [ ] 비동기 공유나 작은 화면에서도 제목, 핵심 수치, 차트 라벨, 다음 행동이 zoom 없이 읽힌다.
- [ ] 데이터 슬라이드는 한 가지 핵심 insight만 강조하고, 색은 장식이 아니라 주목 유도에만 쓴다.
- [ ] Figma Slides/MCP/AI로 발표 자료를 갱신할 때는 `source_freshness_ledger`, `connector_sources_listed`, `template_adherence_checked`, `custom_font_availability`, `font_license_or_rights_checked`, `placeholder_images_replaced`, `copy_review_completed`, `human_final_approval`, `private_context_exposure_review`를 별도 QA evidence로 남긴다.
- [ ] Figma AI로 Slides를 생성하거나 갱신할 때는 `figma_plan`, `seat_type`, `monthly_credit_balance`, `reset_date`, `actual_prompt_credit_after_run`, `image_heavy_deck`, `admin_usage_dashboard_or_api`, `additional_credit_purchase_owner`를 비용/승인 evidence로 남긴다.

## Frontend 체크리스트

- [ ] primary action과 secondary action이 시각적으로 구분된다.
- [ ] loading, empty, error, disabled, success 상태가 있다.
- [ ] form label, helper text, error message, focus state가 명확하다.
- [ ] 반응형에서 hierarchy가 무너지지 않는다.
- [ ] keyboard navigation, visible focus, name/role/value, contrast를 확인한다.
- [ ] dashboard는 metric 수를 제한하고, 같은 data set에는 일관된 색을 쓴다.
- [ ] chart/card 하나가 하나의 의사결정 insight를 말하고, 라벨은 화면 크기가 줄어도 읽힌다.
- [ ] 디자인 파일 또는 슬라이드만 넘기지 않고, 화면별 `layout`, `interaction`, `requirement`, `scope`, `behavior`, `appearance`, `functionality`, `dev issue context`를 handoff note에 남긴다.
- [ ] QA 범위에는 common views, essential functionality, representative sample, complete process를 기록한다.
- [ ] 자동 접근성 검사 결과를 전체 제품 conformance claim처럼 과장하지 않는다.
- [ ] canvas, WebGL, diagram editor, whiteboard처럼 custom-rendered UI는 DOM 의미가 비어 있지 않은지 확인하고, mirror/fallback DOM, focus-selection sync, live region, keyboard equivalent를 별도 evidence로 남긴다.
- [ ] 대형 리스트, 트리, 레이어 패널, 로그, 대시보드 테이블은 작은 mock만 보지 말고 `large_state.count`, `visible_window`, `update_scope`, `scroll_fps_or_jank`, `state_preservation`, `memory_tradeoff`를 별도 QA evidence로 남긴다.
- [ ] carousel, slideshow, auto-rotating hero, onboarding slider는 `rotation_control`, `pause_on_focus`, `pause_on_hover`, `manual_resume_only`, `previous_next_keyboard`, `slide_accessible_name`, `aria_live_policy`, `focus_preservation`, `reduced_motion`을 별도 QA evidence로 남긴다.
- [ ] compact toolbar, icon-only button, slide picker, dashboard table action, pagination, menu item은 `target_size_minimum`, `target_spacing`, `equivalent_control`, `coarse_pointer_comfort_size`, `focus_visible_present`, `focus_indicator_area`, `focus_change_contrast`, `focus_adjacent_contrast`, `keyboard_path_complete`를 별도 QA evidence로 남긴다.
- [ ] toast, snackbar, 저장 완료, 검색 결과 수, upload/export 진행률, dashboard refresh, form submit 결과처럼 focus를 옮기지 않는 동적 상태 변화는 `status_message_scope`, `status_message_role`, `live_region_politeness`, `aria_atomic`, `announced_message_text`, `focus_not_stolen`, `auto_dismiss_duration`, `manual_dismiss_available`, `interactive_notification_focus_strategy`, `screen_reader_announcement_checked`를 별도 QA evidence로 남긴다.
- [ ] Storybook이 있는 경우 story별 interaction/accessibility/visual evidence를 QA_REPORT에 남긴다.
- [ ] Storybook을 정적 빌드로 게시하는 경우 `storybook_version`, `storybook_build_command`, `env_files_present_at_build`, `storybook_patched_version_threshold_met`, `published_artifact_secret_scan_or_review`, `secret_rotation_required`, `artifact_rebuild_required`, `rollback_or_unpublish_path`를 별도 보안/QA evidence로 남긴다.
- [ ] Playwright를 쓰는 경우 screenshot 성공만 보지 말고 `passkey_login_flow`, `storage_state_mutation`, `drag_drop_or_upload_zone`, `har_or_websocket_trace`, `aria_snapshot_scope`, `aria_snapshot_boxes`, `video_retention_mode`, `flaky_failure_trace_retained`를 실제 QA evidence로 분리한다.
- [ ] Figma Make, code layers, Code Connect, Figma MCP처럼 디자인 도구가 실제 codebase와 연결되는 경우 `repository_source`, `figma_make_config_files`, `scripts_reviewed`, `dependency_install_scope`, `branch_pr_flow`, `one_way_push_risk`, `code_connect_mapping_scope`, `mcp_context_exposure`, `secrets_and_env_redaction`, `browser_qa_required_after_export`를 별도 승인/QA evidence로 남긴다.
- [ ] Figma Make나 agent skills로 prototype/frontend 초안을 만들 때는 `model_or_mode_selected`, `task_complexity`, `attached_files_or_libraries`, `plan_mode_extra_credit`, `actual_prompt_credit_after_run`, `admin_usage_owner`, `private_context_exposure_review`를 비용/권한 evidence로 남긴다.

- [ ] signup, checkout, search filter, settings, bulk edit처럼 입력 오류가 생길 수 있는 form flow는 `programmatic_label`, `visible_label`, `required_optional_indicated`, `input_format_instruction`, `hint_connected`, `aria_describedby_targets_valid`, `error_summary_present`, `error_links_to_field`, `field_error_text`, `aria_invalid_set`, `correction_guidance`, `focus_after_submit`, `multi_step_progress`, `no_color_only_error`를 별도 QA evidence로 남긴다.

## Deck-as-Code 후보 판단

Slidev나 reveal.js 같은 web presentation 도구는 frontend와 발표 자료를 연결하는 데 유용할 수 있다. 하지만 설치나 도입은 자동으로 하지 않는다.

조건부 승인 전 확인:

- target repo가 있는가?
- PowerPoint 파일 제출이 필요한가, web deck이 허용되는가?
- export, hosting, offline playback 경로가 있는가?
- dependency와 license를 확인했는가?
- reduced motion, keyboard navigation, contrast, responsive layout을 확인할 수 있는가?
- 일반 협업자가 수정할 수 있는가?

## Complex Information / Cognitive Support QA

- [ ] 복잡한 차트, 숫자, 절차, 선택지를 다루는 PPT는 `plain_language_summary`, `decision_or_task_context`, `numeric_interpretation`, `choice_tradeoff`, `supplemental_content_link`, `primary_supplement_relation`을 별도 QA evidence로 남긴다.
- [ ] 복잡한 dashboard, report UI, onboarding, 비교표, form flow는 `plain_language_summary`, `step_by_step_support`, `numeric_alternative`, `choice_tradeoff`, `supplemental_content_selection`, `primary_supplement_relation`, `help_visibility`, `external_assistance_risk`를 별도 QA evidence로 남긴다.
- [ ] W3C COGA supplemental guidance는 WCAG conformance proof가 아니라 knowledge-only QA field source로만 사용한다.

## Data Table / Grid QA

- [ ] Dashboard table, admin grid, comparison table, sortable table, row selection, expandable row, pagination, virtualized grid는 `table_caption`, `not_layout_table`, `header_cell_scope`, `row_header_present`, `complex_header_mapping`, `sort_state_announced`, `selection_model`, `pagination_position`, `virtualized_row_count`, `visible_row_indices`, `keyboard_model`, `grid_focus_management`, `screen_reader_table_navigation_checked`를 별도 QA evidence로 남긴다.
- [ ] Native table로 충분한지, ARIA grid가 필요한지 먼저 판단하고 grid를 선택하면 focus 이동과 keyboard interaction을 실제로 검증한다.
- [ ] PPT 표는 표 전체를 축소해 넣기 전에 핵심 insight, 비교 기준, 상세 데이터 위치를 분리한다.

## Form Validation / Error Recovery QA

- [ ] Signup, checkout, application, settings, dashboard filter, inline edit form은 visual error state만 보지 말고 label, instruction, validation, notification, recovery path를 함께 검증한다.
- [ ] 각 field에는 `programmatic_label`과 `visible_label`을 분리해 확인하고, label을 숨겨야 할 때도 accessible name이 남아 있는지 기록한다.
- [ ] Required/optional, input format, password/date/number constraint, helper text는 사용자가 submit 전에 알 수 있어야 하며 `input_format_instruction`과 `hint_connected`로 evidence를 남긴다.
- [ ] Submit 후 오류가 여러 개면 `error_summary_present`, `error_links_to_field`, `focus_after_submit`을 확인하고, 각 field에는 `field_error_text`, `aria_invalid_set`, `correction_guidance`를 남긴다.
- [ ] 색상, outline, icon만으로 오류를 전달하지 말고 `no_color_only_error`를 확인한다. 동적 오류는 live region/status QA와 충돌하지 않게 page-level summary와 field-level message를 분리한다.
- [ ] Multi-step form은 `multi_step_progress`, current step, completed step, remaining required action을 사용자가 이해할 수 있는지 확인한다.

## Handoff Context QA

- [ ] PPT, frontend, design-to-code 작업을 넘길 때 디자인 파일 링크, 캡처, 최종 화면만으로 충분하다고 보지 않는다.
- [ ] 각 화면이나 슬라이드 변화마다 `layout`, `interaction`, `requirement`, `scope`, `behavior`, `appearance`, `functionality`, `dev issue context` 중 빈 항목을 표시한다.
- [ ] 빈 항목이 있으면 구현 착수 가능 여부를 `ready`, `partial`, `blocked`로 나누고, `partial` 또는 `blocked`는 QA_REPORT나 SESSION_HANDOFF에 보완 질문으로 남긴다.
- [ ] 접근성 요구가 있는 interaction은 label, focus, keyboard path, status message, error recovery 범위를 handoff 단계에서 먼저 분리한다.

## QA Evidence

| Output | Minimum Evidence |
|---|---|
| PPT | Accessibility Checker, slide title/reading order, contrast, alt text, speaker notes |
| PPT async/mobile | small-screen readability, one idea per slide, one insight per chart, direct chart labels |
| Web deck | browser screenshot, keyboard navigation, reduced motion, responsive viewport, contrast |
| Frontend UI | lint/build, browser QA, state coverage, accessibility check, responsive screenshot |
| Frontend product QA | evaluation scope, representative sample, complete processes, manual review, statement limit |
| Canvas/custom-rendered UI | accessibility model, screen reader summary, focus-selection sync, keyboard equivalent, live announcements, manual assistive-technology review |
| Large list/tree UI | large state count, visible window, update scope, scroll/jank check, state preservation, memory tradeoff |
| Carousel/slideshow UI | rotation control, pause on focus/hover, manual resume, keyboard previous/next, slide accessible name, aria-live policy, focus preservation, reduced motion |
| Complex information / cognitive support | plain-language summary, step-by-step support, numeric alternatives, choice tradeoffs, supplemental content selection, relation between primary and supplemental content, external assistance risk |
| Interactive controls | target size minimum, target spacing, equivalent control, coarse pointer comfort size, visible focus, focus indicator area, focus change contrast, focus adjacent contrast, complete keyboard path |
| Dynamic status / notification UI | status message scope, status role, live region politeness, atomic announcement, announced text, focus not stolen, dismiss timing, interactive notification focus strategy, screen reader announcement check |
| Data table / grid UI | table caption, not layout table, header cell scope, row header, complex header mapping, sort state announcement, selection model, pagination position, virtualized row count, visible row indices, keyboard model, grid focus management, screen reader table navigation check |
| Form validation / error recovery UI | programmatic label, visible label, required/optional indication, input format instruction, connected hint, valid aria-describedby targets, error summary, error link to field, field error text, aria-invalid, correction guidance, post-submit focus, multi-step progress, no color-only error |
| Storybook published artifact security | Storybook version, build command, `.env` files present at build, patched version threshold, published artifact secret scan/review, key rotation requirement, artifact rebuild requirement, rollback or unpublish path |
| Playwright browser QA | passkey login flow, local/session storage mutation, upload/drop zone simulation, HAR/WebSocket trace, page or locator ARIA snapshot, bounding boxes for AI-readable accessibility review, retained trace/video mode for flaky failures |
| Figma Make / codebase handoff | account/org owner, feature availability, platform requirement, repository source, provider support, `.figma/make` config, setup/install/dev/verify/env script review, dependency install scope, local dev server scope, branch/PR flow, one-way push risk, Code Connect mapping scope, MCP context exposure, secrets/env redaction, browser QA after export |
| Figma Slides / MCP deck refresh | source freshness ledger, connector source list, template adherence, custom font availability, font license or rights check, placeholder image replacement, copy review, human final approval, exported asset formats, private context exposure review |
| Figma AI credits / Make / Slides | Figma plan, seat type, monthly balance, reset date, attached context materials, prompt credit after run, plan-mode/build split, image-heavy deck risk, admin usage dashboard/API, additional credit owner, private context exposure review |
| AI conversation / decision support QA | human backup path, memory-load reduction, timeout flexibility, plain-language response, speech/text alternative, error recovery loop, algorithmic risk notice, privacy/data-use clarity, final user control, supported-decision level |
| Dashboard | metric priority, color consistency, chart description, empty/error state |
| Design handoff | layout, interaction, requirement, scope, behavior, appearance, functionality, dev issue context, unresolved assumptions |

## Source-Backed / Dex Inference / Not Checked

- source-backed: W3C, Microsoft, Figma, NN/g, Storybook, Carbon, Material source notes는 접근성, hierarchy, component QA, dashboard/design-system, digital product evaluation, custom-rendered UI 접근성, 대형 리스트/트리 UI 성능, carousel/slideshow 접근성, interactive control target/focus, dynamic status/live region, form validation/error recovery 기준을 제공한다.
- Dex inference: PPT와 frontend는 서로 다른 산출물이지만, 정보 계층과 사용자 이해를 설계한다는 점에서 같은 체크리스트를 공유할 수 있다.
- not checked: 실제 에던님 PPT 파일, frontend repo, PowerPoint Accessibility Checker, browser QA는 이번 실행에서 돌리지 않았다.

- source-backed addition: W3C COGA supplemental guidance provides artifact-level fields for complex information, numeric alternatives, plain-language summaries, supplemental content selection, and primary/supplemental content relationship.
- source-backed addition: W3C WCAG 2.2 Target Size and Focus Appearance guidance provides artifact-level fields for compact interactive control target size, spacing, visible focus, focus indicator area, and focus contrast.
- source-backed addition: W3C WCAG 2.2 Status Messages and ARIA live region guidance provides artifact-level fields for toast, notification, async save/result, loading/progress, dashboard refresh, and form submission status announcement.
- source-backed addition: W3C WAI Forms Tutorial, WCAG Error Identification, GOV.UK Error Message, and USWDS Form guidance provide artifact-level fields for form label, instruction, validation, error summary, field-level error text, correction guidance, and no color-only error QA.
- source-backed addition: NN/g design specs guidance provides handoff-context fields for layout, interactions, requirements, project scope, collaboration assumptions, updates, and development issue context.
- source-backed addition: Playwright 1.60/1.61 release notes provide browser-QA evidence fields for passkeys, storage state, upload/drop zones, HAR/WebSocket traces, ARIA snapshots, bounding boxes, and retained video/trace evidence.
- source-backed addition: W3C Cognitive Accessibility Research Modules provide research-draft fields for AI conversation, voice UI, online safety, algorithmic/data privacy, and supported decision-making QA. They are guidance inputs, not WCAG conformance proof.
- source-backed addition: Figma Make/code layer/Code Connect/MCP documentation provides design-to-code handoff fields for repository source, `.figma/make` scripts, dependency/dev-server execution, branch/PR flow, one-way push risk, GitHub/Figma permissions, MCP context exposure, and post-export browser QA.
- source-backed addition: Figma MCP Slides workflow documentation provides PPT/deck refresh fields for source freshness, connector source list, template adherence, custom font availability, font rights, placeholder image replacement, copy review, human final approval, export format, and private context exposure review.
- source-backed addition: Figma AI credits documentation provides cost/approval fields for Figma Make, Figma Slides generated through ChatGPT, model/mode selection, task complexity, attached files/libraries, prompt credit after run, admin usage dashboard/API, additional credit owner, and private context exposure review.
- source-backed addition: Storybook and GitHub Security Advisory pages provide frontend security QA fields for Storybook static build `.env` exposure, patched version threshold, published artifact review, key rotation, artifact rebuild, and rollback or unpublish path.

## Bias Check

- 이 guide는 접근성과 정보 전달을 강하게 본다. 브랜드 감성, 세일즈 설득, 무대 연출 같은 요소는 별도 deck review가 필요할 수 있다.
- web deck 도구는 개발자에게 유리하지만, 일반 협업자가 수정하기 어려울 수 있다.
- 체크리스트 통과가 곧 좋은 디자인을 보장하지는 않는다. 실제 audience, 목적, 발표 상황에 맞춘 판단이 필요하다.

## Original Content

2026-07-04 20:00 KST update: W3C WCAG 2.2 Target Size and Focus Appearance guidance was added as a knowledge-only source for compact interactive control target/focus QA fields.

2026-07-04 20:33 KST update: W3C WCAG 2.2 Status Messages and ARIA live region guidance was added as a knowledge-only source for dynamic status/notification QA fields.

2026-07-04 21:34 KST update: W3C WAI Forms Tutorial and related GOV.UK/USWDS form guidance were added as knowledge-only sources for form validation and error recovery QA fields.

2026-07-08 22:34 KST update: NN/g design specs guidance was added as a knowledge-only source for frontend/PPT handoff context QA fields.

2026-07-09 01:04 KST update: Playwright release notes were refreshed as a knowledge-only source for frontend browser-QA evidence fields covering passkeys, local/session storage, drag-and-drop upload zones, HAR/WebSocket tracing, ARIA snapshots with boxes, and retained video/trace artifacts.

2026-07-09 01:39 KST update: W3C Cognitive Accessibility Research Modules were added as a knowledge-only source for AI conversation, online safety, algorithmic privacy, and supported decision-making QA fields.

2026-07-09 02:34 KST update: Figma Make local codebase/code layer documentation was added as a knowledge-only source for design-to-code handoff, repository permission, script execution, Code Connect, MCP context, and browser-QA-after-export fields.

2026-07-09 03:35 KST update: Figma MCP Slides living deck workflow was added as a knowledge-only source for PPT/deck refresh QA fields covering source freshness, connector source list, template adherence, custom fonts, font rights, placeholder image replacement, copy review, human approval, export format, and private context exposure.

2026-07-09 07:34 KST update: Figma AI credits documentation was added as a knowledge-only source for Figma Make/Slides cost gates covering plan, seat, balance, reset date, attached context, prompt credit after run, plan-mode/build split, admin usage, additional credit owner, and private context exposure.

2026-07-10 11:04 KST update: Storybook `.env` build secret exposure advisory was added as a source-backed frontend security QA gate for published Storybook artifacts.

이 guide는 W3C WAI accessible presentations, W3C WCAG-EM 2 draft, W3C WAI/APG carousel guidance, W3C WCAG 2.2 target/focus/status-message guidance, Microsoft PowerPoint accessibility/design guidance, Figma canvas accessibility engineering note, Figma layers panel performance engineering note, Slidev/reveal.js official project pages, NN/g visual hierarchy article, 기존 Storybook/Carbon/Material source notes를 종합해 만든 Dex Company 운영 체크리스트다.
