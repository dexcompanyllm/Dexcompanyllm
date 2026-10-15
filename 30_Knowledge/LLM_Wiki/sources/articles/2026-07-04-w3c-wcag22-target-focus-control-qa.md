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
  - "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"
  - "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html"
  - "https://www.w3.org/WAI/WCAG22/quickref/"
  - "https://www.w3.org/WAI/WCAG21/Techniques/css/C45"
  - "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible"
  - "https://web.dev/articles/accessible-tap-targets"
collectionPurpose: "Dex Company의 frontend, web deck, dashboard, toolbar, icon button QA에서 작은 인터랙션 타깃과 focus indicator를 측정 가능한 evidence field로 남기기 위해 WCAG 2.2 근거를 보존한다."
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
verifiedAt: 2026-07-04
verifiedBy: Dex
publisher: "W3C Web Accessibility Initiative; MDN and web.dev cross-check"
tags:
  - llm-wiki/source
  - accessibility
  - frontend
  - interaction-design
  - design-system
  - wcag-22
---

# W3C WCAG 2.2 Target And Focus Control QA

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 20:00 KST에 W3C WCAG 2.2 Target Size (Minimum), Focus Appearance, WCAG Quick Reference, W3C CSS `:focus-visible` technique, MDN `:focus-visible`, web.dev accessible tap targets를 확인했고, 이 note는 Dex Company의 frontend, web deck, dashboard, compact toolbar, icon button QA에 필요한 확인 범위만 보존한다.

- Source title: Understanding Success Criterion 2.5.8 Target Size (Minimum)
- Source title: Understanding Success Criterion 2.4.13 Focus Appearance
- Cross-check: W3C WCAG Quick Reference, W3C Technique C45, MDN `:focus-visible`, web.dev accessible tap targets
- Confirmation scope: pointer target minimum, undersized target spacing exception, focus indicator area, focus contrast, keyboard-only visibility, compact UI density risk, mobile/touch target sizing을 확인했다.

## 핵심 내용 쉬운 설명

작은 아이콘 버튼, 툴바, 슬라이드 조작 버튼, 대시보드 필터, 테이블 행 액션은 시각적으로 깔끔해 보여도 사용자가 누르기 어렵거나 keyboard focus를 찾기 어려우면 실패한다.

W3C WCAG 2.2의 Target Size (Minimum)는 pointer input target이 최소 크기 또는 충분한 간격을 가져야 한다고 설명한다. Focus Appearance는 keyboard focus indicator가 충분한 면적과 대비를 가져야 한다고 설명한다. 따라서 Dex Company에서는 버튼이 예쁜지보다 먼저 "누를 수 있는 영역이 충분한가", "키보드로 이동했을 때 지금 위치가 보이는가"를 QA evidence로 남겨야 한다.

## Dex Company 사용 예시

- Icon-only toolbar를 만들 때 visible icon 크기만 보지 말고 실제 clickable/tappable area를 측정한다.
- Web deck의 previous/next, pause/play, slide picker, close button은 `target_size_minimum`과 `target_spacing`을 QA evidence로 남긴다.
- Dashboard filter chip, table row action, pagination button은 compact density 모드에서도 작은 target이 서로 겹치거나 너무 붙지 않는지 확인한다.
- Custom focus style을 만들면 `focus_visible_present`, `focus_indicator_area`, `focus_change_contrast`, `focus_adjacent_contrast`를 기록한다.
- 디자인 시스템 button/icon-button component에는 기본 크기, compact variant, touch/coarse pointer variant를 분리해 acceptance criteria를 둔다.

## WCAG / Accessibility QA Link

- 직접 연결: WCAG 2.2 SC 2.5.8 Target Size (Minimum)는 pointer target의 최소 크기와 예외를 다룬다.
- 직접 연결: WCAG 2.2 SC 2.4.13 Focus Appearance는 keyboard focus indicator의 면적과 상태 변화 대비를 다룬다. 이 항목은 Level AAA지만, Dex Company에서는 high-polish frontend QA field로 사용한다.
- 연결 근거: W3C C45와 MDN `:focus-visible`은 keyboard 사용자가 focus 위치를 볼 수 있게 하는 CSS 구현 방향을 보강한다.
- 실무 보강: web.dev는 mobile tap target을 더 넉넉하게 잡는 실무 기준을 제공한다. 이는 WCAG 2.2 AA minimum보다 큰 comfort target으로 다룬다.

## Evidence Quality

- high: W3C WCAG 2.2 Understanding 문서와 Quick Reference가 핵심 근거다.
- high: W3C Technique C45는 구현 예시 근거다. 단, technique은 필수 구현법이 아니라 가능한 충족 방법이다.
- medium-high: MDN과 web.dev는 browser/frontend 구현 및 mobile touch target 실무 보강에 유용하다.
- not checked: 실제 Ethan PPT, web deck, frontend repo, Storybook story, Playwright/browser test, screen reader test는 이번 실행에서 돌리지 않았다.

## License / Install / Security Risk

- 문서형 자료이며 설치가 없다.
- 실행 코드, package, MCP server, connector, browser extension, GitHub workflow를 설치하지 않았다.
- W3C, MDN, web.dev 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 기준만 보존한다.
- 보안 리스크: 없음에 가깝다. 다만 target/focus checklist를 실제 artifact 접근성 합격 또는 법적 conformance proof로 과장하면 overreliance 위험이 있다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: pointer target minimum, spacing/equivalent/inline/user-agent/essential exceptions, focus indicator area, focus contrast, keyboard focus visibility, `:focus-visible` 구현 방향.
- Dex inference: PPT형 web deck control, dashboard toolbar, design-system icon button, compact table action을 같은 interactive-control QA field로 묶는 운영 방식.
- not checked: 실제 artifact 접근성 통과, browser별 focus rendering, mobile device tap testing, 법적 conformance claim, assistive technology user testing.

## Prompt Patch Candidate

Frontend, dashboard, web deck, PPT형 interactive slide, compact toolbar, icon-only button을 만들면 visual review만으로 통과시키지 않는다. `target_size_minimum`, `target_spacing`, `equivalent_control`, `inline_or_essential_exception`, `coarse_pointer_comfort_size`, `focus_visible_present`, `focus_indicator_area`, `focus_change_contrast`, `focus_adjacent_contrast`, `keyboard_path_complete`를 QA evidence로 기록한다. WCAG 2.4.13 Focus Appearance는 AAA이므로 법적 AA conformance claim이 아니라 고품질 QA field로 분리한다.
