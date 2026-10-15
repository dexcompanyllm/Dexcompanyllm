---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Canvas Accessibility QA - 2026-07-04 17:04 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T17:04:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://www.figma.com/blog/building-accessibility-into-a-canvas-based-product/"
  - "https://www.w3.org/Talks/2014/0510-canvas-a11y/"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard"
  - "https://www.w3.org/WAI/news/all/"
  - "https://support.microsoft.com/en-us/powerpoint/copilot/keep-your-presentation-on-brand-with-copilot"
collectionPurpose: "30분 간격 Growth Scan에서 임시 design/PPT/frontend 집중 모드에 맞춰 canvas/custom-rendered UI 접근성 자료가 실제 frontend QA 기준을 바꾸는지 확인한다."
confidence: medium
claimType: historical
evidenceScope: web-search-and-local-vault-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/report
  - growth-scan
  - dex-company
  - frontend
  - accessibility
  - canvas
---

# Dex Company Growth Scan Canvas Accessibility QA - 2026-07-04 17:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 17:04 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전이다.
- 검색 범위: automation memory, current folder, automation prompt, Vault 운영 문서, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 16:33/16:04/15:34/15:04 보고서, 10x candidate queue, Figma canvas accessibility, Figma skills/design-agent posts, Microsoft PowerPoint Copilot brand/template docs, W3C WAI news/WCAG-EM, W3C canvas accessibility, MDN keyboard accessibility, local duplicate search.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma/Canva/Microsoft app, account, token, billing, cloud resource, workflow, model switch, file deletion은 설치/연결/실행/생성하지 않았다.

## Original Content

이 보고서는 자동화 실행 기록이다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/저장 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 11 | public candidate lanes plus local duplicate lanes |
| stored.count | 1 | Figma canvas accessibility source note |
| duplicate.count | 6 | W3C WCAG-EM/WCAG overview, Figma skills/agent, Microsoft PowerPoint accessibility/design, Storybook project lane |
| deferred.count | 3 | Figma connector/account, Microsoft Copilot brand kit, future real canvas/frontend QA |
| blocked.count | 1 | X excluded by automation rule |
| lint.warning_count | 0 | status/lint/fallback checks after edits |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. Canvas/custom-rendered UI can lose browser-provided accessibility semantics even when the visual UI looks polished.
2. Figma's Mirror DOM/internal accessibility tree pattern adds a concrete QA field beyond the previous checklist: verify the accessibility model, not only the visible canvas.
3. Focus and selection must stay synchronized. A keyboard or screen reader user should not experience the canvas as one undifferentiated focus target.
4. Live announcements are needed when editing changes are visually obvious but not otherwise perceivable.
5. Microsoft Copilot brand-template guidance is useful but does not add a stronger field than the existing PPT template/representative-sample guidance in this run.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence Quality | Dex Company use |
|---|---|---|---|---|---|
| Figma canvas accessibility Mirror DOM | https://www.figma.com/blog/building-accessibility-into-a-canvas-based-product/ | official engineering blog | stored-source | medium | Adds custom-rendered UI accessibility model, focus-selection sync, live announcement, and manual AT review fields. |
| W3C canvas accessibility | https://www.w3.org/Talks/2014/0510-canvas-a11y/ | W3C talk/reference | cross-check | medium | Confirms canvas has long-standing semantic/focus/fallback accessibility problems. |
| MDN keyboard accessibility | https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Understanding_WCAG/Keyboard | technical reference | cross-check | high | Confirms pointer/touch interactions need keyboard equivalents, focusability, and focus styling. |
| W3C WAI news / WCAG-EM | https://www.w3.org/WAI/news/all/ | standards news | duplicate-source | high | Existing WCAG-EM source already covers product-scope evaluation. |
| Figma agent skills | https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/ | vendor blog | duplicate/account-adjacent | medium | Already stored; no connector/account approval packet. |
| Microsoft Copilot brand presentation | https://support.microsoft.com/en-us/powerpoint/copilot/keep-your-presentation-on-brand-with-copilot | official support doc | deferred/duplicate-adjacent | medium | Useful for representative brand templates, but account/billing/brand-kit state was not checked. |

## Stored / Absorbed Sources

- Source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-figma-canvas-accessibility-mirror-dom.md`
- Wiki guide updated: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1704-dex-company-growth-scan-canvas-accessibility-qa.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | Added Figma canvas accessibility Mirror DOM source note |
| wiki/guides | Added canvas/custom-rendered UI accessibility evidence fields |
| index.md | Added source note/report and operating rule |
| log.md | Added 17:04 growth scan entry |
| candidate queue | No change; zero eligible/not-checked/install-next preserved |
| automation memory | This run summary appended |

## Install / Due Diligence Candidates

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| Figma canvas accessibility article | knowledge-only | not installed or connected | overreliance risk if Figma implementation is treated as artifact conformance |
| Figma connector / Agent / MCP / Check designs | approval-not-ready | not installed, connected, or run | workspace permission, file sensitivity, prompt injection, sensitive information disclosure, billing |
| Microsoft Copilot Brand Kit / PowerPoint templates | deferred/account-specific | not connected or run | brand asset leakage, generated-output review, account/billing availability |
| Canvas/WebGL accessibility implementation packages | not selected | not installed | supply chain, insecure output handling, browser/AT compatibility risk |

## Duplicate / Excluded

- duplicate-source: W3C WCAG-EM product evaluation, W3C WCAG overview, Microsoft PowerPoint accessibility/design guidance.
- duplicate/account-adjacent: Figma agent skills/design-agent/MCP posts because source notes and approval gates already exist.
- deferred/account-specific: Microsoft PowerPoint Copilot brand kit because it needs a real template, brand asset permission, account availability, and generated-output review.
- carried/project-specific: Storybook runtime/MCP until a concrete frontend repo exists.
- blocked: X remains excluded by automation rule.

## Failure / Blocked / Not Checked

- No actual canvas, WebGL, diagram editor, whiteboard, game UI, Figma file, or frontend repo was evaluated.
- No screen reader, keyboard-only pass, browser accessibility tree inspection, axe, Playwright, or Storybook run was performed.
- Figma account, Figma Check Designs, Figma connector/MCP, Microsoft Copilot/Brand Kit, PowerPoint account, billing, file permission, and generated output quality were not checked.
- Figma article is vendor-authored; it is useful for implementation pattern and QA fields, not proof that any Dex Company artifact is accessible.
- Threads full-context extraction was not used as source-backed evidence.

## Cross Verification Evidence

- Figma Mirror DOM article was cross-checked with W3C canvas accessibility material for canvas semantic/focus/fallback issues.
- MDN keyboard accessibility was used to ground keyboard equivalent, focusability, and visible focus requirements.
- Existing WCAG-EM source note was used to keep this as artifact-specific evidence, not whole-product conformance.
- Local duplicate search checked `30_Knowledge/LLM_Wiki`, `00_Inbox/LLM_Wiki`, recent reports, index, log, and the checklist before creating the source note.

## Ethan Can Use This Immediately

- Canvas/WebGL/diagram UI를 만드실 때 `rendering_model`부터 적으시면 됩니다. 예: `native DOM`, `canvas`, `WebGL`, `SVG`, `mixed`.
- custom-rendered UI이면 `accessibility_model`을 비워두지 마십시오. 예: `mirror DOM`, `fallback DOM`, `ARIA layer`, `not provided`.
- QA_REPORT에는 `keyboard_equivalent`, `focus_selection_sync`, `screen_reader_summary`, `live_region_announcements`, `manual_AT_review`를 별도 체크로 남기시면 됩니다.
- Figma나 web deck에서 보기에는 멀쩡한 canvas 화면도 보조기술에는 빈 화면일 수 있으므로, "시각적으로 됨"과 "의미 구조가 읽힘"을 분리해서 검증하시면 됩니다.

## Improvement Delta

- 직전 16:33 실행이 frontend product QA 범위와 representative sample을 강화했다면, 이번 실행은 custom-rendered UI의 accessibility model 자체를 QA 대상으로 추가했다.
- `PPT Frontend Visual Communication Checklist`에 canvas/custom-rendered UI 행과 Mirror DOM/fallback/focus/live-region/keyboard evidence를 추가했다.
- Figma 계열 자료라도 connector나 agent 사용 신호가 아니라 source-backed engineering practice일 때만 knowledge-only로 좁게 흡수하는 기준을 적용했다.

## Adoption Check

- done: 직전 Next Eval의 "새 source는 구체적 QA field를 바꿀 때만 추가" 기준을 적용했다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했다.
- done: 새 source note는 실행 코드가 아니라 knowledge-only 접근성 구현/QA 패턴으로 저장했다.
- carried: 실제 PPT artifact QA는 파일이 있을 때만 수행한다.
- carried: Figma Agent/MCP/connector는 approved workspace/file/export/billing context가 있을 때만 재평가한다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때만 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Figma canvas article added custom-rendered UI accessibility model fields. |
| Future real frontend artifact QA | carried | carried | No concrete frontend repo or canvas artifact was available. |
| Figma MCP/Agent connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete frontend repo or dependency delta. |
| Microsoft Copilot brand template | possible PPT candidate | deferred | Useful, but account-specific and mostly overlaps representative template guidance. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, or canvas/custom-rendered UI accessibility model.
3. For the next real canvas/WebGL/custom-rendered frontend artifact, records `rendering_model`, `accessibility_model`, `keyboard_equivalent`, `focus_selection_sync`, `screen_reader_summary`, `live_region_announcements`, `manual_AT_review`, and `statement_limit`.
4. Does not treat Figma vendor implementation notes as evidence that a local artifact is accessible.

## Prompt or Template Patch Candidate

```text
For canvas, WebGL, diagram editors, whiteboards, games, or other custom-rendered UI, do not rely on visual review alone. Record rendering_model, accessibility_model, keyboard_equivalent, focus_selection_sync, screen_reader_summary, live_region_announcements, manual_AT_review, and statement_limit. Treat vendor implementation articles as QA-field sources, not artifact conformance evidence.
```

## Questions / Tracking Candidates

- 다음 frontend repo에서 canvas/WebGL/custom-rendered UI가 있으면 브라우저 accessibility tree와 keyboard-only flow를 실제로 확인할지 정한다.
- Figma Check Designs나 PowerPoint Copilot Brand Kit는 실제 계정/파일/브랜드 자산 승인 맥락이 생길 때만 approval-ready packet으로 재평가한다.
- Microsoft Copilot brand-template 문서는 실제 PPT 템플릿 제작 작업이 있을 때 대표 샘플 슬라이드/브랜드 키트 QA로 다시 본다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| durable prompt checked | passed | `automation.toml` temporary focus present |
| operating docs read | passed | Vault role/LLM Wiki docs, index/log, improvement model, checklist |
| recent reports read | passed | 16:33/16:04/15:34/15:04 reports checked |
| queue counted | passed | direct table count preserved zero eligible/not-checked/install-next |
| internet search | passed | Figma/W3C/MDN/Microsoft/Storybook lanes checked |
| duplicate check | passed | local LLM Wiki/report/inbox search performed |
| source note schema | passed | required frontmatter and `## Original Content` included |
| install ban | passed | no install/enable/connect/create action performed |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 152, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Figma vendor engineering article can be mistaken for local artifact accessibility proof.
- Mitigation: stored as knowledge-only, cross-checked with W3C/MDN, and added explicit manual assistive-technology review plus statement-limit fields.
- Finalized at: 2026-07-04T17:08:00+09:00
