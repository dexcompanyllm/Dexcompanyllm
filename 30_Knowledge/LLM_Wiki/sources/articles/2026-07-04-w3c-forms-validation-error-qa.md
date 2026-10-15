---
type: llm-wiki-source
status: raw
aliases:
  - W3C Forms Validation Error QA
description: "W3C WAI Forms Tutorial and related form error guidance for Dex Company PPT/frontend QA"
author: Dex
sourceKind: article
sourceType: official-doc
title: "W3C Forms Tutorial - Form validation and error recovery QA"
source:
  - "https://www.w3.org/WAI/tutorials/forms/"
  - "https://www.w3.org/WAI/tutorials/forms/labels/"
  - "https://www.w3.org/WAI/tutorials/forms/instructions/"
  - "https://www.w3.org/WAI/tutorials/forms/notifications/"
  - "https://www.w3.org/WAI/WCAG22/Understanding/error-identification.html"
  - "https://design-system.service.gov.uk/components/error-message/"
  - "https://designsystem.digital.gov/components/form/"
collectionPurpose: "PPT/frontend 작업에서 폼, 신청 flow, checkout, settings, dashboard filter의 label, instruction, validation, error recovery를 artifact-level QA 필드로 검증하기 위해 수집"
sourceVersion: "W3C Forms Tutorial updated 2026-03-27; W3C Labels page updated 2024-05-13; GOV.UK/USWDS checked 2026-07-04"
capturedAt: 2026-07-04T21:34:00+09:00
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: high
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - dex-company
  - accessibility
  - frontend
  - form
  - validation
  - ux
---

# W3C Forms Tutorial - Form validation and error recovery QA

## Collection Purpose

에던님의 PPT/frontend 작업에서 폼, 신청 flow, checkout, settings, dashboard filter처럼 입력과 오류 복구가 중요한 화면을 만들 때, 단순히 "에러 메시지가 있다"가 아니라 label, instruction, validation, error summary, focus, required/optional indication, correction guidance를 QA evidence로 남기기 위해 수집했습니다.

## Source Metadata

- Publisher: W3C Web Accessibility Initiative (WAI), GOV.UK Design System, U.S. Web Design System
- Source kind: official accessibility/design-system documentation
- Capture time: 2026-07-04 21:34 KST
- License/security/install risk: 문서형 지식만 흡수했습니다. package, component, SDK, MCP, connector, browser extension, workflow는 설치하지 않았습니다.

## Original Content

이 source note는 원문 전체를 복사하지 않고, 공개 URL과 확인 범위, 짧은 지정 인용, Dex Company 적용 메모만 보존합니다.

Checked source-backed points:

- W3C Forms Tutorial은 accessible form을 labels, grouping, instructions, validation, user notifications, multi-page forms, custom controls로 나누어 설명합니다.
- W3C는 form이 웹 애플리케이션의 user interaction에 흔하고, 모든 forms에 같은 접근성 개념이 적용된다고 설명합니다.
- W3C Labels guidance는 대부분의 경우 `<label>`을 사용해 control과 label을 연결하고, 시각적으로 label이 숨겨져도 code-level label은 유지해야 한다고 설명합니다.
- W3C Instructions guidance는 required/optional input, data format, relevant information을 사용자가 form 작성 전에 이해할 수 있게 제공해야 한다고 설명합니다.
- W3C User Notifications guidance는 form error가 생기면 page top에 식별 가능한 error list를 두고, 각 error가 해당 control label, 쉬운 설명, 수정 방법, in-page link를 포함하는 것이 유용하다고 설명합니다.
- WCAG 2.2 Understanding 3.3.1은 input error를 text로 식별해야 하며, 색상이나 스타일만으로는 충분하지 않다고 설명합니다.
- GOV.UK Error Message component는 visually hidden "Error:" prefix, fieldset/legend, hint, error message를 함께 다루는 component evidence를 제공합니다.
- USWDS Form guidance는 DOM order와 visual order가 일치해야 하며, validation message가 input field와 시각적으로 맞춰져야 한다는 실무 보강 근거를 제공합니다.

Short compliant quote from W3C Forms Tutorial: "Only ask users to enter what is required"

## Dex Company Use

- Frontend form QA: `programmatic_label`, `visible_label`, `required_optional_indicated`, `input_format_instruction`, `hint_connected`, `aria_describedby_targets_valid`, `error_summary_present`, `error_links_to_field`, `field_error_text`, `aria_invalid_set`, `correction_guidance`, `focus_after_submit`, `multi_step_progress`, `no_color_only_error`를 QA evidence로 남깁니다.
- PPT / proposal deck: 가입, 결제, 신청, 설정, dashboard filter flow를 설명하는 slide에서는 입력 전 설명, 오류 후 복구 경로, 필수/선택 구분을 한 장에 과밀하게 넣지 않고 step 또는 annotation으로 분리합니다.
- Dashboard/product UI: filter, inline edit, bulk action form에서 error toast만 보여주지 말고 field-level error와 summary/error count, 수정 link를 분리합니다.

## Cross Verification

- W3C Forms Tutorial과 W3C WCAG 2.2 Error Identification을 대조해 label/instruction/notification guidance가 WCAG input assistance와 연결되는지 확인했습니다.
- GOV.UK Error Message component로 실무 design-system 구현에서 visually hidden prefix, hint, fieldset/legend와 error text를 함께 쓰는지 확인했습니다.
- USWDS Form guidance로 DOM order, validation alignment 같은 product UI implementation caveat를 보강했습니다.
- NN/g form error guidance는 UX 실무 보강 후보로 확인했지만, 이번 source note의 primary evidence는 W3C/GOV.UK/USWDS로 한정했습니다.

## Risk and Limits

- source-backed: W3C/GOV.UK/USWDS 문서는 폼 접근성 QA 필드의 근거입니다.
- Dex inference: 이 필드를 PPT flow 검토와 dashboard filter QA에 함께 쓰는 것은 Dex Company 운영 적용입니다.
- not checked: 실제 에던님의 frontend repo, Storybook story, browser accessibility tree, screen reader, mobile keyboard, PowerPoint deck은 이번 실행에서 테스트하지 않았습니다.
- risk: 문서 기준을 실제 artifact conformance proof처럼 과장하면 overreliance가 됩니다. 실제 UI가 생기면 브라우저와 보조기술 조합으로 별도 QA가 필요합니다.

> [!note] Bias Check
> Counter-argument: Form accessibility criteria can make a flow look compliant on paper while the actual UI still fails because focus, mobile keyboard, autofill, localization, or screen reader behavior was not tested.
> Data gap: No live frontend artifact, browser accessibility tree, assistive technology run, or mobile input-mode test was performed in this scan.

## Verification

- claimType: prescriptive
- evidenceScope: multi-source-primary
- verificationStatus: verified
- disputed: false
