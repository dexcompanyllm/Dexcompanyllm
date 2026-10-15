---
type: llm-wiki-source
status: active
confidence: medium
claimType: prescriptive
evidenceScope: source-backed
verificationStatus: partial
disputed: false
sourceKind: official-docs
source:
  - "https://www.w3.org/WAI/tutorials/carousels/"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  - "https://webaim.org/techniques/carousels/"
collectionPurpose: "PPT형 웹 슬라이드, hero carousel, onboarding carousel, dashboard carousel UI를 접근성 기준과 연결하기 위해 carousel/slideshow QA 근거를 보존한다."
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
verifiedAt: 2026-07-04
verifiedBy: Dex
publisher: "W3C Web Accessibility Initiative / WAI-ARIA APG; WebAIM cross-check"
tags:
  - llm-wiki/source
  - accessibility
  - frontend
  - presentation
  - carousel
  - slideshow
---

# W3C Carousel Slideshow Accessibility QA

## Original Content

원문 전체는 복사하지 않는다. 2026-07-04 18:33 KST에 W3C WAI Carousel Tutorial, WAI-ARIA APG Carousel Pattern, WebAIM Animation and Carousels를 확인했고, 이 note는 Dex Company의 PPT형 웹 슬라이드, hero carousel, onboarding carousel, dashboard carousel QA에 필요한 확인 범위만 보존한다.

- Source title: Carousels Tutorial | W3C WAI
- Source title: Carousel Pattern | WAI-ARIA APG
- Cross-check: WebAIM Animation and Carousels
- Preserved short excerpt from W3C WAI: "Users must be able to pause carousel movement"
- Preserved short excerpt from APG: "Stops rotating when keyboard focus enters"
- Confirmation scope: 구조, 키보드 조작, 자동 회전 중지, focus 처리, screen reader announcement, role/name/value 기준을 확인했다.

## 핵심 내용 쉬운 설명

Carousel과 slideshow는 한 화면에 여러 슬라이드를 돌아가며 보여주는 UI다. 보기에는 단순한 카드 묶음처럼 보이지만, 자동으로 움직이면 사용자가 읽기 전에 내용이 바뀌고, 키보드 focus가 사라지거나, screen reader 사용자가 현재 슬라이드를 알지 못할 수 있다.

따라서 Dex Company에서 웹 deck, landing hero, onboarding flow, dashboard carousel을 만들 때는 visual polish만 보면 안 된다. 자동 회전은 멈출 수 있어야 하고, 이전/다음/정지/재생 컨트롤은 keyboard와 screen reader로 이해 가능해야 하며, 슬라이드 변경이 사용자에게 예측 가능하게 전달되어야 한다.

## Dex Company 사용 예시

- PPT를 웹 deck으로 만들 때 자동 슬라이드 전환을 넣으면 `rotation_control`, `pause_on_focus`, `pause_on_hover`, `manual_resume_only`를 QA evidence로 기록한다.
- hero carousel을 쓰는 landing page는 CTA가 지나가서 사라지지 않는지, 모든 슬라이드를 keyboard만으로 선택할 수 있는지 확인한다.
- onboarding carousel은 dot indicator만 두지 말고 previous/next button, 현재 슬라이드 이름, 전체 개수 또는 의미 있는 accessible name을 제공한다.
- dashboard의 carousel card는 핵심 metric을 자동으로 넘기지 않는다. 필요하면 기본값을 수동 전환으로 두고, 중요한 정보는 carousel 밖에서도 접근 가능하게 한다.

## WCAG / Accessibility QA Link

- 직접 연결: W3C WAI는 carousel tutorial에서 WCAG 1.3.1 Info and Relationships, 2.1.1 Keyboard, 2.2.2 Pause Stop Hide, 4.1.2 Name Role Value를 연결한다.
- APG는 auto-rotate carousel에서 keyboard focus가 carousel 내부로 들어오면 회전이 멈추고, 사용자가 직접 재시작하기 전에는 자동 재개하지 않는 패턴을 제시한다.
- WebAIM은 자동 움직임을 기본 정지하는 것이 더 접근성 친화적이며, 움직이는 UI에는 keyboard와 mouse로 접근 가능한 pause/stop/hide가 필요하다고 설명한다.

## Evidence Quality

- high: W3C WAI와 WAI-ARIA APG 공식 문서가 핵심 근거다.
- medium-high: WebAIM은 공식 표준기관은 아니지만 접근성 실무 교육 자료로 교차 검증에 유용하다.
- not checked: 실제 Ethan PPT, 웹 deck, frontend repo, Storybook story, Playwright/browser test는 이번 실행에서 돌리지 않았다.

## License / Install / Security Risk

- 문서형 자료이며 설치가 없다.
- 실행 코드, package, MCP server, connector, browser extension, GitHub workflow를 설치하지 않았다.
- W3C/WAI 자료는 W3C permission policy를 따른다. 이 note는 원문 전체가 아니라 URL, 짧은 인용, 확인 범위, 적용 기준만 보존한다.
- 보안 리스크: 없음에 가깝다. 다만 source-backed guidance를 실제 artifact 검증 통과로 과장하면 overreliance 위험이 있다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: pause control, keyboard operation, screen reader announcement, focus management, rotation control, role/name/value 기준.
- Dex inference: PPT형 웹 deck과 frontend carousel을 같은 QA evidence 필드로 묶는 운영 방식.
- not checked: 실제 artifact 접근성 통과, 브라우저별 구현 호환성, 법적 conformance claim, user testing.

## Prompt Patch Candidate

Carousel, slideshow, auto-rotating hero, onboarding slider를 만들면 visual review만으로 통과시키지 않는다. `rotation_control`, `auto_rotate_default`, `pause_on_focus`, `pause_on_hover`, `manual_resume_only`, `previous_next_keyboard`, `slide_picker_semantics`, `slide_accessible_name`, `aria_live_policy`, `focus_preservation`, `reduced_motion`을 QA evidence로 기록한다.
