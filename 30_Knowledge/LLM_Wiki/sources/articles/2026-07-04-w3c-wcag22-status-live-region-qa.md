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
  - "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
  - "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role"
  - "https://v10.carbondesignsystem.com/components/notification/accessibility/"
collectionPurpose: "Dex Company의 frontend, dashboard, web deck, form flow QA에서 토스트, 저장 완료, 검색 결과 수, 로딩/진행 상태 같은 동적 상태 메시지를 assistive technology에 전달하는 evidence field로 남기기 위해 WCAG 4.1.3과 ARIA live region 근거를 보존한다."
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
verifiedAt: 2026-07-04
verifiedBy: Dex
publisher: "W3C Web Accessibility Initiative; MDN and Carbon Design System cross-check"
tags:
  - llm-wiki/source
  - accessibility
  - frontend
  - interaction-design
  - status-message
  - live-region
  - wcag-22
---

# W3C WCAG 2.2 Status Message Live Region QA

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 20:33 KST에 W3C WCAG 2.2 Status Messages, W3C ARIA22 role=status technique, WAI-ARIA APG Alert Pattern, MDN ARIA live regions, MDN status role, Carbon notification accessibility를 확인했고, 이 note는 Dex Company의 frontend, dashboard, web deck, form flow QA에 필요한 확인 범위만 보존한다.

- Source title: Understanding Success Criterion 4.1.3 Status Messages
- Source title: ARIA22: Using role=status to present status messages
- Cross-check: WAI-ARIA APG Alert Pattern, MDN ARIA live regions/status role, Carbon Design System Notification accessibility
- Confirmation scope: non-focus status changes, live region timing, `role="status"`, `aria-atomic`, `aria-live` politeness, alert interruption risk, auto-dismiss toast risk, interactive notification close button을 확인했다.

## 핵심 내용 쉬운 설명

프론트엔드 UI에서는 저장 완료, 검색 중, 결과 0개, 업로드 진행, 필터 적용, 폼 오류, 토스트 알림처럼 화면 일부가 조용히 바뀌는 경우가 많다. 시각 사용자는 이를 볼 수 있지만 screen reader 사용자는 변화가 자동으로 전달되지 않을 수 있다.

W3C WCAG 2.2의 Status Messages는 focus를 옮기지 않는 상태 변화도 assistive technology가 알 수 있어야 한다고 설명한다. 따라서 Dex Company에서는 "토스트가 보인다"가 아니라 "상태 변화가 프로그램적으로 전달되고, focus를 불필요하게 빼앗지 않으며, 너무 빨리 사라지지 않는가"를 QA evidence로 남겨야 한다.

## Dex Company 사용 예시

- 저장/삭제/복사 완료 toast는 `status_message_role`, `live_region_politeness`, `announced_message_text`, `auto_dismiss_duration`, `manual_dismiss_available`를 QA evidence로 남긴다.
- 검색 결과, 필터 적용, 비동기 로딩 완료는 `result_count_announcement`, `loading_state_announcement`, `empty_state_announcement`를 확인한다.
- form submit 오류는 focus 이동이 필요한 오류 요약과 focus를 옮기지 않는 상태 메시지를 구분한다.
- dashboard refresh, export job, upload progress는 진행률과 완료/실패 상태가 시각 label만으로 끝나지 않게 한다.
- 알림 안에 링크나 버튼이 있으면 단순 live region이 아니라 keyboard navigation과 focus strategy를 별도로 설계한다.

## WCAG / Accessibility QA Link

- 직접 연결: WCAG 2.2 SC 4.1.3 Status Messages는 markup 기반 content에서 status message가 role/properties로 programmatically determinable 해야 한다고 설명한다.
- 구현 연결: W3C ARIA22는 `role="status"`와 `aria-atomic="true"`를 통해 상태 업데이트 전체가 assistive technology에 전달될 수 있음을 설명한다.
- 패턴 연결: WAI-ARIA APG Alert Pattern은 중요한 alert가 keyboard focus를 바꾸지 않되, 자동으로 너무 빨리 사라지는 alert와 잦은 interrupt가 접근성/사용성 위험이 될 수 있음을 설명한다.
- 실무 보강: MDN은 live region이 기존 markup 또는 별도 step으로 먼저 존재한 뒤 content가 업데이트되어야 더 안정적으로 announcement 된다고 설명한다.
- 디자인 시스템 교차 검증: Carbon Notification은 toast/inline notification을 사용자에게 정보를 전달하는 component로 다루고, urgent 여부에 따라 assertive/polite 전략을 구분한다.

## Evidence Quality

- high: W3C WCAG 2.2 Understanding 문서와 W3C ARIA technique이 핵심 근거다.
- high: WAI-ARIA APG Alert Pattern은 alert/notification pattern의 focus와 interruption 기준을 제공한다.
- medium-high: MDN은 browser/frontend 구현 세부와 live region timing caveat를 제공한다.
- medium-high: Carbon Design System은 enterprise UI notification component의 실무 교차 검증 자료다.
- not checked: 실제 Ethan PPT, web deck, frontend repo, Storybook story, Playwright/browser test, screen reader test는 이번 실행에서 돌리지 않았다.

## License / Install / Security Risk

- 문서형 자료이며 설치가 없다.
- 실행 코드, package, MCP server, connector, browser extension, GitHub workflow를 설치하지 않았다.
- W3C, MDN, Carbon 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 기준만 보존한다.
- 보안 리스크: 없음에 가깝다. 다만 live region checklist를 실제 screen reader 호환성 통과나 법적 conformance proof로 과장하면 overreliance 위험이 있다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: status message scope, non-focus announcement, `role="status"`, `aria-live` politeness, `aria-atomic`, alert interruption risk, auto-dismiss alert risk.
- Dex inference: toast, async save result, dashboard refresh, upload/export job, web deck notification을 같은 dynamic status QA field로 묶는 운영 방식.
- not checked: 실제 artifact 접근성 통과, browser/assistive technology 조합별 announcement, Storybook/axe로 잡히지 않는 동적 announcement, 법적 conformance claim, user testing.

## Prompt Patch Candidate

Frontend, dashboard, web deck, form flow, async job UI에서 저장 완료, 검색 결과, 로딩/진행, 오류, toast, snackbar, notification을 만들면 visual review만으로 통과시키지 않는다. `status_message_scope`, `status_message_role`, `live_region_politeness`, `aria_atomic`, `announced_message_text`, `focus_not_stolen`, `auto_dismiss_duration`, `manual_dismiss_available`, `interactive_notification_focus_strategy`, `screen_reader_announcement_checked`를 QA evidence로 기록한다.
