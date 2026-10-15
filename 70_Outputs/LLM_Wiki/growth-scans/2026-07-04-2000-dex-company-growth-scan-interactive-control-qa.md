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
  - "https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html"
  - "https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html"
  - "https://www.w3.org/WAI/WCAG22/quickref/"
  - "https://www.w3.org/WAI/WCAG21/Techniques/css/C45"
  - "https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible"
  - "https://web.dev/articles/accessible-tap-targets"
  - "https://storybook.js.org/blog/storybook-mcp-for-react/"
  - "https://www.figma.com/blog/"
collectionPurpose: "Dex Company Growth Scan 2026-07-04 20:00 KST 결과와 PPT/frontend interactive control target/focus QA checklist 보강 기록"
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
  - interaction-design
  - design-system
---

# Dex Company Growth Scan - Interactive Control Target / Focus QA

## Original Content

이 보고서는 2026-07-04 20:00 KST 실행 결과입니다. 원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 기준, QA 결과만 보존합니다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 기록입니다.

## Run Scope and Limits

- 실행 시각: 2026-07-04 20:00 KST
- 임시 집중 모드: 적용 중입니다. 종료 시각은 2026-07-05 00:00:00 KST 전입니다.
- 검색 범위: automation memory, 현재 폴더, Vault 운영 문서, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 19:03/18:33/18:04/17:33 보고서, 10x candidate queue, W3C WCAG 2.2 Target Size/Focus Appearance/Quick Reference, W3C C45, MDN `:focus-visible`, web.dev tap targets, Storybook MCP, Figma 2026 blog lane.
- 우선순위: design, UX, UI, GUI, PPT, presentation design, frontend, design systems, component systems, accessibility QA, interaction design, dashboard UI, product UI.
- 제외/한계: 실제 PPT 파일, frontend repo, Storybook runtime, browser QA, PowerPoint Accessibility Checker, screen reader test, mobile device tap testing은 이번 실행에서 돌리지 않았습니다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 13 | public candidate lanes 9개와 local duplicate/status lanes 4개 |
| stored.count | 1 | W3C WCAG 2.2 target/focus control QA source note 1개 |
| duplicate.count | 5 | Storybook MCP lane, Figma 2026 agent/motion lane, Microsoft/Section508 presentation accessibility, generic WCAG mentions, existing Storybook accessibility testing |
| deferred.count | 4 | actual PPT/frontend artifact QA, Storybook MCP/runtime adoption, Figma workspace/account context, mobile/device testing |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 확인 기준 |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. 기존 checklist는 keyboard/focus/target size를 일반 검증 항목으로 언급했지만, compact toolbar, icon-only button, dashboard table action처럼 실제 실패가 잦은 control 단위의 측정 필드는 부족했습니다.
2. W3C WCAG 2.2 Target Size (Minimum)는 작은 pointer target과 간격 예외를 명확히 다루므로 frontend, web deck, dashboard UI QA에 바로 연결됩니다.
3. W3C Focus Appearance는 Level AAA이지만, high-polish UI에서는 focus indicator 면적과 대비를 별도 evidence로 남길 가치가 있습니다.
4. MDN과 W3C C45는 `:focus-visible`을 keyboard focus visibility 구현 근거로 보강합니다.
5. Storybook MCP와 Figma 2026 Agent/Motion 신호는 흥미롭지만, 이번 실행에서는 설치/연결이 아니라 target/focus QA field 보강이 더 안전하고 재사용 가치가 높았습니다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WCAG 2.2 Target Size Minimum | https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | official guidance | stored-source | high | compact control target size/spacing QA field 근거 |
| W3C WCAG 2.2 Focus Appearance | https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html | official guidance | stored-source | high | focus indicator area/contrast QA field 근거 |
| W3C WCAG Quick Reference | https://www.w3.org/WAI/WCAG22/quickref/ | official reference | cross-check | high | 2.5.8 Level AA와 2.4.13 Level AAA 구분 |
| W3C Technique C45 | https://www.w3.org/WAI/WCAG21/Techniques/css/C45 | official technique | cross-check | high | CSS `:focus-visible` 구현 보강 |
| MDN `:focus-visible` | https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible | technical reference | cross-check | medium-high | focus ring 제거 위험과 keyboard focus visibility 보강 |
| web.dev accessible tap targets | https://web.dev/articles/accessible-tap-targets | frontend guidance | cross-check | medium-high | mobile/coarse pointer comfort size 보강 |
| Storybook MCP for React | https://storybook.js.org/blog/storybook-mcp-for-react/ | official project blog | carried/project-specific | medium-high | 실제 Storybook repo가 있을 때 component evidence loop로 재평가 |
| Figma latest blog lane | https://www.figma.com/blog/ | vendor product lane | carried/account-adjacent | medium | Motion/Agent/skills는 workspace/export/billing 승인 맥락 필요 |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-wcag22-target-focus-control-qa.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 queue는 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지합니다.
- Source: W3C WCAG 2.2 target/focus control QA source note 1개를 추가했습니다.
- Wiki: PPT/frontend checklist에 interactive control target/focus QA evidence row와 체크 항목을 추가했습니다.
- Reports: 이 보고서를 추가했습니다.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|
| W3C WCAG target/focus guidance | knowledge-only | no install | overreliance if treated as actual artifact conformance proof |
| MDN / web.dev cross-checks | cross-check only | no install | implementation guidance, not artifact evidence |
| Storybook MCP | carried/project-specific | no package, MCP server, CI, or local server run | supply chain, local server exposure, remote MCP authorization, overreliance, insecure plugin design |
| Figma Motion/Agent/Skills | carried/account-adjacent | no account connection | workspace permission, file sensitivity, export scope, prompt injection, billing |

## Duplicate / Excluded

- duplicate-general: existing source notes mention keyboard/focus/target size as broad WCAG checks, but did not provide dedicated interactive-control QA fields.
- duplicate/account-adjacent: Figma 2026 Motion/Agent/Skills lane remains covered by prior Figma governance and approval-gate notes.
- carried/project-specific: Storybook MCP is useful only with a concrete frontend repo, dependency state, CI path, browser QA, authorization scope, and rollback plan.
- duplicate-source: Microsoft/Section508 presentation accessibility remains covered by existing PowerPoint accessibility and visual communication checklist notes.
- blocked: X remains excluded by automation rule.

## Failure / Blocked / Not Checked

- 실제 PPT, web deck, dashboard, frontend repo, Storybook story, Playwright/browser QA는 실행하지 않았습니다.
- 실제 mobile tap target 측정, DevTools computed box inspection, screen reader test, keyboard walkthrough, PowerPoint Accessibility Checker는 수행하지 않았습니다.
- Storybook MCP, Figma tools, browser extensions, connector, MCP server, package, GitHub workflow는 설치/연결/실행하지 않았습니다.
- WCAG 2.4.13 Focus Appearance는 Level AAA이므로 WCAG AA conformance proof로 말하지 않습니다. 이번 결과는 high-polish QA field 보강입니다.

## Cross-Verification

- W3C Target Size Understanding을 WCAG Quick Reference로 대조해 2.5.8이 WCAG 2.2 Level AA 항목임을 확인했습니다.
- W3C Focus Appearance Understanding을 WCAG Quick Reference로 대조해 2.4.13이 Level AAA 항목임을 확인했습니다.
- W3C C45와 MDN `:focus-visible`로 keyboard focus indicator 구현 방향과 focus style 제거 위험을 교차 확인했습니다.
- web.dev accessible tap targets로 mobile/coarse pointer에서는 WCAG minimum보다 더 넉넉한 comfort target을 잡는 실무 기준을 보강했습니다.
- Local duplicate search에서 target/focus는 일반 언급이 많았지만, checklist에 `target_size_minimum`, `focus_indicator_area`, `focus_change_contrast` 같은 필드가 없음을 확인했습니다.

## 에던님이 바로 쓰실 수 있는 예시

- 프론트엔드 아이콘 버튼을 만들 때 아이콘이 16px이어도 클릭 영역은 최소 기준과 간격을 따로 보시면 됩니다.
- Dashboard table row action은 hover에서만 나타나는 작은 버튼이라도 keyboard focus와 target spacing을 QA_REPORT에 남기셔야 합니다.
- Web deck의 이전/다음/닫기/재생 버튼은 시각적으로 작아도 실제 hit area와 focus ring이 충분해야 합니다.
- Design system에서 `IconButton.compact` variant를 만들면 desktop density와 mobile touch comfort target을 별도 acceptance criteria로 두시면 됩니다.
- PPT 자체에는 WCAG pointer target이 직접 적용되지 않지만, interactive web deck/PDF viewer/embedded dashboard를 만들면 바로 적용됩니다.

## Improvement Delta

- `PPT Frontend Visual Communication Checklist`에 interactive control target/focus QA 항목을 추가했습니다.
- 새 QA evidence fields: `target_size_minimum`, `target_spacing`, `equivalent_control`, `inline_or_essential_exception`, `coarse_pointer_comfort_size`, `focus_visible_present`, `focus_indicator_area`, `focus_change_contrast`, `focus_adjacent_contrast`, `keyboard_path_complete`.
- 이번 보강은 기존 visual hierarchy/accessibility checklist를 "작은 조작 대상과 focus indicator를 실제로 측정하는 QA"까지 확장합니다.

## Adoption Check

- done: 직전 Next Eval의 "구체 PPT/frontend QA field가 바뀔 때만 source note 추가" 기준을 적용했습니다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 queue file에서 직접 재확인했습니다.
- done: W3C 자료를 conformance proof가 아니라 knowledge-only QA field source로 저장했습니다.
- carried: 실제 PPT/frontend artifact QA는 파일이나 repo가 있을 때 수행합니다.
- carried: Storybook MCP/runtime은 concrete frontend project context가 있을 때 재평가합니다.
- carried: Figma Motion/Agent/Skills는 승인된 workspace/file/export/billing context가 있을 때 재평가합니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Interactive target/focus QA fields were added. |
| Future real PPT/frontend artifact QA | carried | carried | No concrete artifact or repo was available. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, auth scope, or rollback path. |
| Figma Motion/Agent/MCP connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Threads signal | source-weak | dropped for storage | Public snippets were not needed for target/focus source-backed note. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, complex image long-description equivalence, carousel/slideshow QA, complex information/cognitive support, or interactive control target/focus QA.
3. If it revisits target/focus, prioritize actual artifact QA evidence such as computed target boxes, keyboard path screenshot/video, browser accessibility tree, or mobile tap target inspection over adding more general guidance.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, promote target/focus sources only when they add artifact-level QA evidence. For compact toolbars, icon-only buttons, dashboard table actions, web deck controls, pagination, menu items, and slide pickers, record target_size_minimum, target_spacing, equivalent_control, inline_or_essential_exception, coarse_pointer_comfort_size, focus_visible_present, focus_indicator_area, focus_change_contrast, focus_adjacent_contrast, and keyboard_path_complete. Treat WCAG 2.4.13 Focus Appearance as AAA high-polish evidence, not AA conformance proof.
```

## Questions / Tracking Candidates

- 다음 실제 frontend 또는 web deck 작업에서 icon-only button 1개를 골라 visible icon size와 actual hit area를 분리해 확인합니다.
- Dashboard/table UI 작업이 생기면 compact density variant의 target spacing과 keyboard path를 QA_REPORT에 남깁니다.
- Storybook MCP는 실제 repo와 승인된 auth/CI/rollback context가 생길 때 install audit packet으로만 재검토합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| operating docs read | passed | AGENTS, role docs, LLM Wiki index/log, improvement model, checklist |
| recent reports checked | passed | 19:03, 18:33, 18:04, 17:33 reports |
| queue recounted from file | passed | `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | W3C/MDN/web.dev/Storybook/Figma/PowerPoint/Section508 lanes |
| duplicate check | passed | local target/focus search found broad mentions but no dedicated checklist fields |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 156, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

PASS_WITH_WARNINGS. W3C WCAG 2.2 target/focus guidance is strong enough for knowledge-only QA field absorption, but it is not proof that any real deck, web deck, dashboard, or frontend artifact is accessible. The mitigation is explicit: actual artifact QA remains carried, and no implementation code or tool was installed.
