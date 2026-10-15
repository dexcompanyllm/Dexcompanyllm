---
type: llm-wiki-source
status: captured
title: "Figma canvas accessibility Mirror DOM"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: interpretive
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-engineering-blog
source:
  - "https://www.figma.com/blog/building-accessibility-into-a-canvas-based-product/"
  - "https://www.w3.org/Talks/2014/0510-canvas-a11y/"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard"
collectionPurpose: "Canvas, WebGL, design tool, custom-rendered frontend UI에서 브라우저 기본 접근성을 잃는 위험과 이를 QA 기준으로 되돌리는 방법을 Dex Company frontend/design checklist에 반영한다."
publisher: "Figma"
tags:
  - llm-wiki/source
  - figma
  - frontend
  - accessibility
  - canvas
  - custom-rendered-ui
---

# Figma Canvas Accessibility Mirror DOM

## Original Content

- 수집 시각: 2026-07-04 17:04 KST
- 자료 유형: Figma 공식 engineering/accessibility 블로그와 W3C/MDN 교차 검증
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 핵심 구조, Dex Company 적용 기준, 미확인 범위만 보존한다.
- 핵심 내용 쉬운 설명: canvas로 직접 화면을 그리면 빠르고 강력한 인터페이스를 만들 수 있지만, 브라우저가 자동으로 제공하던 DOM 기반 접근성 정보가 사라질 수 있다. Figma는 이를 보완하기 위해 화면 뒤에 보조기술용 Mirror DOM과 내부 accessibility tree를 만들고, 선택/초점/변경 알림을 동기화하는 방식을 설명한다.

## Source-Backed Notes

- Figma는 canvas 기반 제품이 전통적인 HTML/DOM 렌더링을 쓰지 않기 때문에 기본 접근성 기능을 얻지 못한다고 설명한다.
- Figma는 scenegraph에서 보조기술에 필요한 요약 정보를 만들고, Mirror DOM을 통해 screen reader가 탐색할 수 있는 DOM 구조를 별도로 제공한다고 설명한다.
- Figma는 canvas selection과 system keyboard focus를 양방향으로 동기화하고, sighted user에게 시각적으로 보이는 편집 변경을 live region announcement로 보완한다고 설명한다.
- W3C의 canvas accessibility 자료는 canvas가 fallback content, hit region, focus indication 같은 별도 설계를 필요로 한다는 오래된 접근성 문제를 설명한다.
- MDN keyboard accessibility guidance는 pointer/touch로 조작 가능한 요소는 keyboard로도 조작 가능해야 하며, focusable element에는 focus styling이 있어야 한다고 설명한다.

## Dex Company Use Example

- canvas, WebGL, diagram editor, whiteboard, map, game-like UI, design-to-code preview처럼 DOM이 실제 UI 의미를 표현하지 않는 frontend는 일반 contrast/keyboard checklist만으로 끝내지 않는다.
- QA_REPORT에는 `rendering_model: canvas/custom-rendered`, `accessibility_model: native DOM | mirror DOM | fallback DOM | not provided`, `focus_selection_sync`, `screen_reader_summary`, `live_region_announcements`, `keyboard_equivalent`, `manual_AT_review`를 남긴다.
- PPT 작업에서는 직접 적용 범위가 좁다. 다만 Figma Slides, canvas-based deck editor, web deck animation tool을 쓸 때는 "보이는 화면"과 "보조기술이 읽는 구조"가 같은지 별도로 확인한다.

## WCAG / Accessibility Link

- 직접 연결: WCAG keyboard operability, focus visible, name/role/value, status messages, non-text alternatives와 연결된다.
- Figma 글은 WCAG conformance 문서가 아니다. 따라서 Figma 기능이나 Mirror DOM 패턴 자체를 성공 증거로 보지 않고, 실제 산출물에서 keyboard, screen reader, focus, announcement, visual/semantic parity를 검증해야 한다.

## Evidence Quality

- quality: medium
- 이유: Figma 공식 엔지니어링 사례는 구체적이지만 vendor product implementation이며, 에던님 프로젝트의 canvas UI에 그대로 적용된다는 보장은 없다.
- 교차 검증: W3C canvas accessibility 자료와 MDN keyboard accessibility guidance가 같은 위험을 다른 관점에서 뒷받침한다.

## Risk / License / Security

- 설치 여부: 설치하지 않음. Figma app, connector, MCP server, plugin, package, account, billing, workspace permission을 연결하거나 실행하지 않았다.
- OWASP LLM 위험 분류: overreliance, sensitive information disclosure, prompt injection, insecure output handling.
- 운영 제한: Figma나 agent 기반 디자인 도구가 accessibility issue를 "flag"해도 실제 artifact conformance로 과장하지 않는다. 파일 권한, 디자인 파일 민감도, export path, 보조기술 수동검증 범위가 별도로 필요하다.

## Claim Split

- source-backed: Figma의 Mirror DOM/internal accessibility tree/focus-selection/live-region 설명, W3C canvas accessibility issue, MDN keyboard operability 기준.
- Dex inference: Dex Company frontend QA에 custom-rendered UI 전용 필드를 추가해야 한다는 판단.
- not checked: 실제 Figma 계정 기능 노출, Figma 파일, local canvas/WebGL app, screen reader runtime, browser compatibility, WCAG conformance, legal accessibility requirement.
