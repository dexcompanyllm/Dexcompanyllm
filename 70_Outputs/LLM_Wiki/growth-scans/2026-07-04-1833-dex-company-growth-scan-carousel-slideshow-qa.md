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
  - "https://www.w3.org/WAI/tutorials/carousels/"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/carousel/"
  - "https://webaim.org/techniques/carousels/"
collectionPurpose: "Dex Company Growth Scan 2026-07-04 18:33 KST 결과와 PPT/frontend carousel QA checklist 보강 기록"
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
  - carousel
---

# Dex Company Growth Scan - Carousel / Slideshow QA

## Original Content

이 보고서는 2026-07-04 18:33 KST 실행 결과다. 원문 전체를 복사하지 않고, W3C WAI, WAI-ARIA APG, WebAIM 자료의 확인 범위와 Dex Company 적용 기준만 보존한다.

## Run Scope and Limits

- 실행 시각: 2026-07-04 18:33 KST
- 검색 범위: W3C carousel tutorial, WAI-ARIA APG carousel pattern, WebAIM animation/carousel guidance, Chrome Web UI carousel/scroll animation signals, Storybook interaction testing, Figma Motion/Config 2026, Threads 공개 검색 결과, local LLM Wiki 중복 여부.
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전까지다.
- 원래 관심 키워드 중 이번 우선순위: design, UX, UI, PPT, presentation design, frontend, accessibility QA, interaction design.
- 한계: 실제 PPT 파일, web deck, frontend repo, Storybook story, browser QA, PowerPoint Accessibility Checker는 이번 실행에서 돌리지 않았다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 14 | public candidate lanes 10개와 local duplicate/status lanes 4개 |
| stored.count | 1 | W3C/APG carousel source note 1개 |
| duplicate.count | 6 | Storybook interaction, Figma Motion/Config, Chrome carousel/scroll UI, WebAIM separate note, MDN slider, Threads snippets |
| deferred.count | 4 | Figma Motion account/workspace context, Chrome CSS carousel implementation, Storybook runtime adoption, actual artifact QA |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 확인 기준 |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. Carousel/slideshow는 PPT형 웹 deck과 frontend UI 사이의 공통 위험 지점이다. 자동 전환, focus 손실, screen reader announcement 누락 때문에 시각적으로 좋아 보여도 접근성 실패가 생길 수 있다.
2. W3C WAI와 WAI-ARIA APG는 pause control, keyboard operation, screen reader announcement, focus management, role/name/value를 carousel의 필수 QA 필드로 연결한다.
3. WebAIM은 자동 움직임을 기본 정지하거나 사용자가 쉽게 멈출 수 있게 하는 실무 기준을 제공해 W3C 근거를 보강한다.
4. Figma Motion과 Chrome Web UI carousel 자료는 흥미롭지만, 현재 Dex Company에 필요한 것은 도구 도입이 아니라 산출물 QA 필드다. 설치, 계정 연결, runtime adoption은 하지 않았다.
5. Threads 공개 검색 결과는 Figma Motion 사용 팁 수준이라 source-backed 근거로 채택하지 않았다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WAI Carousels Tutorial | https://www.w3.org/WAI/tutorials/carousels/ | official docs | stored-source | high | carousel/slideshow QA 필드의 1차 근거 |
| WAI-ARIA APG Carousel Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/carousel/ | official docs | stored-source cross-check | high | auto-rotate, focus, keyboard, role/name/value 세부 패턴 |
| WebAIM Animation and Carousels | https://webaim.org/techniques/carousels/ | accessibility practice article | cross-check only | medium-high | pause/stop/hide와 reduced motion 실무 보강 |
| Chrome Web UI carousel / scroll animations | https://developer.chrome.com/docs/css-ui | browser docs | deferred | medium | 실제 frontend repo가 있을 때 구현 기술 후보로 재평가 |
| Chrome What's new in Web UI | https://developer.chrome.com/blog/new-in-web-ui-io26 | browser blog | deferred | medium | scroll-driven animation은 motion QA와 연결 가능하지만 이번 source note는 아님 |
| Storybook interaction testing | https://storybook.js.org/docs/writing-tests/interaction-testing | official docs | duplicate/carried | medium-high | 기존 Storybook QA note와 중복. repo context 필요 |
| Figma Motion | https://www.figma.com/blog/introducing-figma-motion/ | vendor product blog | carried/account-adjacent | medium | motion system 신호는 유용하나 workspace/export/billing context 필요 |
| Figma Config 2026 recap | https://www.figma.com/blog/config-2026-recap/ | vendor product blog | duplicate/account-adjacent | medium | Figma Motion과 같은 lane. 설치/연결 없음 |
| Threads public snippets | https://www.threads.net/ | public SNS snippets | source-weak | low | 사용 팁 수준이라 source-backed 저장 제외 |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-carousel-slideshow-accessibility-qa.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 queue는 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했다.
- Source: W3C/APG carousel/slideshow accessibility source note 1개 추가.
- Wiki: PPT/frontend checklist에 carousel/slideshow QA evidence row와 checklist item을 추가.
- Reports: 이 보고서 추가.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| W3C/APG carousel guidance | knowledge-only | no install | overreliance if treated as actual artifact conformance |
| WebAIM carousel guidance | cross-check only | no install | same overreliance risk |
| Chrome CSS carousel / scroll animations | deferred | no install/code adoption | implementation complexity, accessibility regression, browser support assumptions |
| Figma Motion / Config | carried/account-adjacent | no account connection | account/workspace/export/billing/permission context missing |
| Storybook interaction testing | carried/project-specific | no package or CI change | requires repo dependency review, browser QA, rollback path |

## Duplicate / Excluded

- duplicate/carried: Storybook interaction testing은 기존 Storybook accessibility/component testing notes와 겹치며, 실제 repo가 있어야 가치가 커진다.
- carried/account-adjacent: Figma Motion과 Config 2026은 디자인 시스템 motion 신호지만, Figma workspace와 export/Dev Mode/billing 맥락이 없다.
- deferred: Chrome CSS carousel configurator와 scroll-driven animations는 구현 기술 후보일 뿐, 이번에는 W3C/APG 접근성 기준을 먼저 저장했다.
- source-weak: Threads 공개 검색 결과는 링크 검증 가능한 실무 기준이 아니라 팁 수준이다.
- blocked: X는 자동화 규칙상 제외했다.

## Failure / Blocked / Not Checked

- 실제 PPT, web deck, frontend repo, Storybook story, Playwright/browser QA는 실행하지 않았다.
- Carousel 구현 샘플 코드를 가져오거나 설치하지 않았다.
- Figma, Chrome, Storybook 관련 도구, connector, package, MCP server, browser extension, GitHub workflow는 설치/연결/실행하지 않았다.
- 법적 WCAG conformance claim은 하지 않는다. 이번 결과는 QA field 보강이다.

## Cross-Verification

- W3C WAI Carousel Tutorial: pause, keyboard, screen reader announcement, focus management와 WCAG criteria 연결을 확인했다.
- WAI-ARIA APG Carousel Pattern: auto-rotate 중지 조건, rotation control, Tab 순서, role/name/value, aria-live policy를 확인했다.
- WebAIM Animation and Carousels: 자동 움직임, pause/stop/hide, reduced motion, button semantics, accessible names를 실무 관점에서 교차 확인했다.
- Local duplicate check: `carousel`, `slideshow`, `auto-rotat`, `aria-roledescription` 검색 결과 기존 source/wiki 직접 저장이 없었다.

## 에던님이 바로 쓸 수 있는 예시

- PPT를 web deck으로 만들 때 자동 재생을 기본값으로 두지 마십시오. 꼭 필요하면 첫 번째 tab stop에 pause/play button을 두고, focus가 들어오면 멈추며, 사용자가 직접 누르기 전에는 재시작하지 않게 QA합니다.
- landing hero carousel을 만들 때 CTA가 5초 뒤 사라지는 구조는 피하고, 각 슬라이드는 keyboard previous/next와 의미 있는 accessible name을 가져야 합니다.
- dashboard card carousel은 핵심 metric을 자동 전환하지 않는 쪽이 낫습니다. 자동 전환을 쓰면 `rotation_control`, `pause_on_focus`, `aria_live_policy`, `focus_preservation`을 QA_REPORT에 기록합니다.
- onboarding slider의 dot navigation은 장식이 아니라 slide picker control입니다. 현재 슬라이드, 전체 개수, keyboard 조작, screen reader label을 확인합니다.

## Improvement Delta

- `PPT Frontend Visual Communication Checklist`가 carousel/slideshow UI를 별도 output type으로 다루게 됐다.
- 새 QA evidence fields: `rotation_control`, `auto_rotate_default`, `pause_on_focus`, `pause_on_hover`, `manual_resume_only`, `previous_next_keyboard`, `slide_picker_semantics`, `slide_accessible_name`, `aria_live_policy`, `focus_preservation`, `reduced_motion`.
- 이번 개선은 PPT/web deck/frontend interaction design 사이의 공통 위험을 명확히 분리한다.

## Adoption Check

- done: 직전 Next Eval의 "구체 PPT/frontend QA field가 바뀔 때만 source note 추가" 기준을 적용했다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 큐 파일에서 직접 재확인했다.
- done: W3C/APG carousel 자료가 기존 checklist에 없던 artifact-level QA fields를 추가한다고 판단해 1개만 저장했다.
- carried: 실제 PPT/frontend artifact QA는 파일이나 repo가 있을 때 수행한다.
- carried: Figma Motion/Agent/MCP connector는 approved workspace/file/export/billing context가 있을 때 재평가한다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Carousel/slideshow QA fields were added. |
| Future real frontend/PPT artifact QA | carried | carried | No concrete artifact was available. |
| Figma MCP/Agent/Motion connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, or rollback path. |
| Threads signal | source-weak | dropped for storage | Public snippets were not strong enough for source-backed note. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, complex image long-description equivalence, or carousel/slideshow rotation/focus/keyboard/aria-live QA.
3. If it revisits Figma Motion, classify it as account/workspace-specific unless it contributes a concrete QA field such as reduced-motion variant, motion token handoff, timing/easing evidence, or implementation acceptance criteria without requiring connector installation.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, promote a new source only if it changes artifact-level QA evidence. For carousel, slideshow, auto-rotating hero, onboarding slider, or web deck UI, require rotation_control, auto_rotate_default, pause_on_focus, pause_on_hover, manual_resume_only, previous_next_keyboard, slide_picker_semantics, slide_accessible_name, aria_live_policy, focus_preservation, and reduced_motion. Do not install or enable design/code tools without an approval-ready packet.
```

## Questions / Tracking Candidates

- 실제 web deck 또는 landing page 작업이 생기면 carousel을 쓰지 않는 대안이 가능한지 먼저 판단한다.
- Figma Motion은 reduced-motion variant와 motion token handoff 기준을 만들 때만 다시 본다.
- Chrome CSS carousel/scroll animation은 실제 frontend repo와 browser support target이 있을 때만 구현 후보로 재평가한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| automation prompt checked | passed with warning | `automation.toml` exists but prompt text is mojibake in console; user prompt and memory remain usable |
| operating docs read | passed | AGENTS, role docs, LLM Wiki index/log, improvement model, checklist |
| recent reports checked | passed | 18:04, 17:33, 17:04, 16:33 reports |
| queue recounted from file | passed | `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | W3C/APG/WebAIM/Chrome/Storybook/Figma/Threads lanes |
| duplicate check | passed | local `carousel/slideshow/auto-rotat/aria-roledescription` search found no existing direct source note |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status/lint | passed | final command evidence recorded after edits |
| UTF-8 Korean check | passed | final command evidence recorded after edits |

## Watchdog

PASS_WITH_WARNINGS. W3C/APG carousel guidance is strong enough for knowledge-only QA field absorption, but it is not proof that any real deck or frontend artifact is accessible. The mitigation is explicit: actual artifact QA remains carried, and no implementation code or tool was installed.
