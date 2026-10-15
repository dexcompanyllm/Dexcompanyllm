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
  - "https://www.w3.org/WAI/tutorials/forms/"
  - "https://www.w3.org/WAI/tutorials/forms/labels/"
  - "https://www.w3.org/WAI/tutorials/forms/instructions/"
  - "https://www.w3.org/WAI/tutorials/forms/notifications/"
  - "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html"
  - "https://design-system.service.gov.uk/components/error-message/"
  - "https://designsystem.digital.gov/components/form/"
  - "https://www.nngroup.com/articles/errors-forms-design-guidelines/"
collectionPurpose: "Dex Company Growth Scan 2026-07-04 21:34 KST 결과와 PPT/frontend form validation QA checklist 보강 기록"
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
  - accessibility
  - form
  - validation
---

# Dex Company Growth Scan - Form Validation QA

## Original Content

이 보고서는 2026-07-04 21:34 KST 실행 결과입니다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 기준, QA 결과만 보존합니다. 이번 실행은 덱스가 스스로 학습했다는 의미가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수입니다.

## Run Scope and Limits

- 실행 시각: 2026-07-04 21:34 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전입니다.
- 검색 범위: automation memory, 현재 작업 폴더, Vault 운영 문서, role routing/matrix, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 21:03/20:33 보고서, 10x candidate queue, W3C Forms Tutorial, WCAG 2.2 Error Identification, GOV.UK Error Message, USWDS Form, NN/g form error guidance, Storybook accessibility lane, local duplicate search.
- 우선순위: design, UX, UI, GUI, PPT, presentation design, information design, frontend, design systems, accessibility QA, dashboard/product UI.
- 한계: 실제 PPT 파일, frontend repo, Storybook runtime, browser accessibility tree, screen reader, mobile keyboard, Playwright test는 이번 실행에서 돌리지 않았습니다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 13 | public source lanes 8개 + local duplicate/status lanes 5개 |
| stored.count | 1 | W3C forms validation/error recovery source note 1개 |
| duplicate.count | 4 | existing status/live-region, cognitive support, generic form label mention, Storybook accessibility lane |
| deferred.count | 4 | actual artifact QA, Storybook/runtime test, screen reader form flow, Figma/connector/account context |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 검증 기준 |

Queue count remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. 기존 checklist는 form label, helper text, error message를 언급했지만 field-level label/instruction/error summary/focus/correction guidance를 artifact evidence로 쪼개지는 않았습니다.
2. W3C Forms Tutorial은 label, grouping, instruction, validation, notification, multi-page form을 같은 form accessibility model 안에서 다룹니다.
3. WCAG Error Identification은 오류를 text로 식별해야 하며 색상이나 스타일만으로 충분하지 않다는 기준을 제공합니다.
4. GOV.UK와 USWDS는 error message, hint, fieldset/legend, DOM order, validation alignment 같은 실무 design-system 근거를 보강합니다.
5. 이 자료는 PPT 자체보다는 frontend form, dashboard filter, web deck embedded form, proposal deck의 form-flow 설명에 바로 적용됩니다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WAI Forms Tutorial | https://www.w3.org/WAI/tutorials/forms/ | official docs | stored-source | high | form QA model root |
| W3C Labeling Controls | https://www.w3.org/WAI/tutorials/forms/labels/ | official docs | stored-source section | high | programmatic/visible label evidence |
| W3C Form Instructions | https://www.w3.org/WAI/tutorials/forms/instructions/ | official docs | stored-source section | high | required/optional, format, hint guidance |
| W3C User Notifications | https://www.w3.org/WAI/tutorials/forms/notifications/ | official docs | stored-source section | high | error summary and links |
| WCAG 2.2 Error Identification | https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html | official standard explanation | cross-check | high | no color-only error, text error identification |
| GOV.UK Error Message | https://design-system.service.gov.uk/components/error-message/ | design-system docs | cross-check | medium-high | component-level error/hint/fieldset evidence |
| USWDS Form | https://designsystem.digital.gov/components/form/ | design-system docs | cross-check | medium-high | DOM order and validation alignment |
| NN/g Form Errors | https://www.nngroup.com/articles/errors-forms-design-guidelines/ | UX article | duplicate/cross-check | medium | UX wording and recovery clarity only |
| Storybook Accessibility Testing | https://storybook.js.org/docs/writing-tests/accessibility-testing | project docs | duplicate/project-specific | medium-high | automation useful, not sufficient for form flow proof |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-forms-validation-error-qa.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`
- New report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-2134-dex-company-growth-scan-form-validation-qa.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 queue의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했습니다.
- Source: W3C forms validation/error recovery QA source note 1개를 추가했습니다.
- Wiki: PPT/frontend checklist에 form validation/error recovery QA evidence row와 checklist section을 추가했습니다.
- Reports: 이번 실행 보고서를 추가했습니다.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|
| W3C Forms Tutorial / WCAG Error Identification | knowledge-only | no install | 실제 artifact conformance proof로 과장하면 overreliance |
| GOV.UK / USWDS form guidance | cross-check only | no package imported | design-system docs only; component adoption 아님 |
| Storybook form accessibility runtime | carried/project-specific | no package, MCP, CI, server run | supply chain, auth/CI/rollback, brittle test risk |
| Figma/connector form audit | carried/account-adjacent | no connector enabled | workspace/file/export/billing approval 필요 |

## Duplicate / Excluded

- duplicate-general: 기존 checklist에 form label/helper/error가 있었지만 form validation/error recovery evidence field는 부족했습니다.
- duplicate-adjacent: status/live-region source는 form submit result announcement를 다루지만 field-level error summary와 correction guidance를 대체하지 않습니다.
- cross-check only: NN/g form error article은 UX wording 보강으로 유용하지만 W3C/GOV.UK/USWDS보다 primary evidence로 강하지 않습니다.
- carried/project-specific: Storybook/runtime QA는 실제 repo, dependency, CI, browser QA, rollback context가 생길 때 재평가합니다.
- blocked: X는 자동화 규칙상 제외했습니다. Threads는 이번 source-backed note에 필요하지 않아 저장하지 않았습니다.

## Failure / Blocked / Not Checked

- 실제 PPT, web deck, dashboard, frontend repo, Storybook story, Playwright/browser QA를 실행하지 않았습니다.
- 실제 screen reader form navigation, mobile keyboard, browser autofill/autocomplete, focus after submit, error link behavior를 테스트하지 않았습니다.
- GOV.UK/USWDS component package를 설치하지 않았고, design-system component adoption도 하지 않았습니다.
- W3C/GOV.UK/USWDS 문서는 강한 기준이지만 실제 UI 접근성 합격 증거는 아닙니다.

## Cross-Verification

- W3C Forms Tutorial과 WCAG Error Identification을 대조해 form notification/error guidance가 WCAG input assistance와 연결되는지 확인했습니다.
- W3C Labeling Controls와 USWDS Form guidance를 대조해 visible/programmatic label, DOM order, mobile/low-vision readability가 연결되는지 확인했습니다.
- W3C User Notifications와 GOV.UK Error Message를 대조해 error summary, field-level error, visually hidden error prefix, hint/fieldset/legend의 실무 구현 근거를 확인했습니다.
- Storybook accessibility docs는 자동화 검사의 보조 수단으로 확인했지만, form recovery flow 전체를 대신하는 증거로 보지 않았습니다.
- Local duplicate search에서 `aria-invalid`, `error_summary`, `input_instruction`, `programmatic_label` 같은 전용 checklist field가 없음을 확인했습니다.

## 에던님이 바로 쓰실 수 있는 예시

- 회원가입/신청 화면을 만들 때 label이 보인다는 이유만으로 통과시키지 말고, label이 code-level로 연결됐는지 `programmatic_label`로 남깁니다.
- 날짜/금액/전화번호 field는 placeholder만 믿지 말고, submit 전에 보이는 format instruction과 오류 후 correction guidance를 분리합니다.
- dashboard filter에서 오류가 3개 이상이면 toast 하나로 끝내지 말고 상단 error summary와 field-level message, 각 field로 가는 link를 둡니다.
- PPT에서 checkout flow를 설명할 때 정상 path만 보여주지 말고 "오류 발생 -> 위치 안내 -> 수정 방법 -> 재제출" 복구 path를 한 단계로 포함합니다.
- multi-step form은 현재 step, 완료 step, 남은 필수 action을 보여주는지 QA_REPORT에 별도 evidence로 기록합니다.

## Improvement Delta

- `PPT Frontend Visual Communication Checklist`가 form validation/error recovery QA를 별도 output type으로 다루게 됐습니다.
- 새 QA evidence fields: `programmatic_label`, `visible_label`, `required_optional_indicated`, `input_format_instruction`, `hint_connected`, `aria_describedby_targets_valid`, `error_summary_present`, `error_links_to_field`, `field_error_text`, `aria_invalid_set`, `correction_guidance`, `focus_after_submit`, `multi_step_progress`, `no_color_only_error`.
- 이번 보강은 frontend form, dashboard filter, web deck interaction, proposal deck form-flow critique에서 "보이는 오류"를 "복구 가능한 오류"로 평가 기준을 넓혔습니다.

## Adoption Check

- done: 직전 Next Eval의 "구체 PPT/frontend QA field가 바뀔 때만 source note 추가" 기준을 적용했습니다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 queue file에서 재확인했습니다.
- done: W3C/GOV.UK/USWDS 자료를 knowledge-only로 흡수했고 package/component/tool 설치로 과장하지 않았습니다.
- carried: 실제 PPT/frontend artifact QA는 concrete artifact나 repo가 있을 때 수행합니다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때 재평가합니다.
- carried: Figma/connector/account tools는 approved workspace/file/export/billing context가 있을 때 재평가합니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Form validation/error recovery QA fields were added. |
| Future real PPT/frontend artifact QA | carried | carried | No concrete artifact or repo was available. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, auth scope, or rollback path. |
| Figma Motion/Agent/MCP connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Threads signal | source-weak | dropped for storage | Public snippets were not needed for form validation source-backed note. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, complex image long-description equivalence, carousel/slideshow QA, complex information/cognitive support, interactive control target/focus QA, dynamic status/live region QA, data table/grid QA, or form validation/error recovery QA.
3. If it revisits forms, prioritize actual artifact evidence such as browser accessibility tree, screen reader label/error reading, mobile keyboard/input mode, field focus after summary link, and multi-step progress announcement over adding more general form guidance.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, promote form sources only when they add artifact-level QA evidence. For signup, checkout, application, settings, dashboard filter, inline edit, and multi-step forms, record programmatic_label, visible_label, required_optional_indicated, input_format_instruction, hint_connected, aria_describedby_targets_valid, error_summary_present, error_links_to_field, field_error_text, aria_invalid_set, correction_guidance, focus_after_submit, multi_step_progress, and no_color_only_error. Treat Storybook/axe as useful but insufficient for the full form recovery flow.
```

## Questions / Tracking Candidates

- 다음 실제 frontend 작업에서 form 1개를 골라 label/instruction/error summary/focus evidence를 QA_REPORT에 남길 수 있는지 확인합니다.
- PPT proposal이나 deck에서 checkout/application flow를 설명할 때 happy path와 recovery path를 함께 보여주는 템플릿이 필요한지 봅니다.
- Storybook이 있는 repo에서는 axe 결과와 수동 form recovery QA를 분리해 기록할 수 있는지 재평가합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| operating docs read | passed | AGENTS, role docs, LLM Wiki index/log, improvement model, checklist |
| recent reports checked | passed | 21:03 and 20:33 reports |
| queue recounted from file | passed | `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | W3C/GOV.UK/USWDS/NN-g/Storybook lanes checked |
| duplicate check | passed | local form/error searches found no dedicated checklist fields |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 159, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; `FALLBACK_SCHEMA_CHECK_DONE`, `UTF8_REPLACEMENT_SCAN_DONE` |

## Bias Check

- Counter-argument: Form validation QA fields can create checklist confidence without proving the live flow is accessible.
- Data gap: No actual browser, screen reader, mobile keyboard, Storybook, or Playwright form test was run in this scan.

## Watchdog

PASS_WITH_WARNINGS. W3C/GOV.UK/USWDS form guidance is strong enough for knowledge-only QA field absorption, but it is not proof that any real deck, web deck, dashboard, or frontend artifact has accessible form recovery. The mitigation is explicit: actual artifact QA remains carried, and no implementation code or tool was installed.
