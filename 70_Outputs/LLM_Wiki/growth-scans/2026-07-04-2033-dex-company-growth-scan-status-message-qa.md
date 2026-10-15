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
  - "https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html"
  - "https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22"
  - "https://www.w3.org/WAI/ARIA/apg/patterns/alert/"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions"
  - "https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role"
  - "https://v10.carbondesignsystem.com/components/notification/accessibility/"
collectionPurpose: "Dex Company Growth Scan 2026-07-04 20:33 KST 결과와 PPT/frontend dynamic status/live region QA checklist 보강 기록"
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
  - notification
---

# Dex Company Growth Scan - Dynamic Status Message QA

## Original Content

이 보고서는 2026-07-04 20:33 KST 실행 결과입니다. 원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 기준, QA 결과만 보존합니다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 기록입니다.

## Run Scope and Limits

- 실행 시각: 2026-07-04 20:33 KST
- 임시 집중 모드: 적용 중입니다. 종료 시각은 2026-07-05 00:00:00 KST 전입니다.
- 검색 범위: automation memory, 현재 폴더, Vault 운영 문서, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 20:00/19:03/18:33/18:04 보고서, 10x candidate queue, W3C WCAG 2.2 Status Messages, W3C ARIA22, WAI-ARIA APG Alert Pattern, MDN ARIA live regions/status role, Carbon notification accessibility, Storybook accessibility lane.
- 우선순위: design, UX, UI, GUI, PPT, frontend, interaction design, accessibility QA, dashboard UI, product UI.
- 제외/한계: 실제 PPT 파일, frontend repo, Storybook runtime, browser QA, screen reader test, mobile device test는 이번 실행에서 돌리지 않았습니다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 12 | public candidate lanes 8개와 local duplicate/status lanes 4개 |
| stored.count | 1 | W3C status message/live region QA source note 1개 |
| duplicate.count | 4 | Storybook accessibility lane, generic WCAG mentions, existing Carbon accessibility, prior carousel aria-live policy |
| deferred.count | 4 | actual PPT/frontend artifact QA, screen reader live-region test, Storybook runtime adoption, Figma/connector contexts |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 확인 기준 |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. 기존 checklist는 loading/empty/error/success 상태를 요구했지만, 상태 변화가 screen reader에 전달되는지 보는 artifact-level evidence field는 부족했습니다.
2. W3C WCAG 2.2 Status Messages는 focus를 옮기지 않는 저장 완료, 검색 결과 수, 진행 상태, 오류 존재 같은 변화도 assistive technology가 알 수 있어야 한다는 Level AA 기준을 제공합니다.
3. W3C ARIA22와 MDN live region 문서는 `role="status"`, `aria-live`, `aria-atomic`, live region timing을 QA field로 분리할 근거를 제공합니다.
4. APG Alert Pattern과 Carbon Notification은 중요한 alert/toast가 focus를 불필요하게 빼앗지 않되, 너무 빨리 사라지거나 잦은 interrupt가 되지 않아야 한다는 실무 판단을 보강합니다.
5. 이번 자료는 PPT 자체보다 web deck, dashboard, product UI, form flow, async job UI에 직접 적용됩니다. PPT에서는 발표/공유 환경 안의 embedded dashboard나 웹형 슬라이드 알림에 적용됩니다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WCAG 2.2 Status Messages | https://www.w3.org/WAI/WCAG22/Understanding/status-messages.html | official guidance | stored-source | high | dynamic status message QA field 근거 |
| W3C ARIA22 role=status | https://www.w3.org/WAI/WCAG22/Techniques/aria/ARIA22 | official technique | cross-check | high | `role=status`, `aria-atomic` implementation evidence |
| WAI-ARIA APG Alert Pattern | https://www.w3.org/WAI/ARIA/apg/patterns/alert/ | official pattern | cross-check | high | focus/interruption/auto-dismiss risk 기준 |
| MDN ARIA live regions | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions | technical reference | cross-check | medium-high | live region timing and politeness implementation caveat |
| MDN status role | https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Roles/status_role | technical reference | cross-check | medium-high | advisory status vs alert 구분 |
| Carbon Notification accessibility | https://v10.carbondesignsystem.com/components/notification/accessibility/ | design-system guidance | cross-check | medium-high | toast/inline notification 실무 component QA |
| Storybook accessibility docs | https://storybook.js.org/docs/writing-tests/accessibility-testing | official project docs | duplicate/project-specific | medium-high | axe 기반 검사는 useful but live announcement는 별도 수동 evidence 필요 |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-wcag22-status-live-region-qa.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 queue는 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지합니다.
- Source: W3C WCAG status message/live region QA source note 1개를 추가했습니다.
- Wiki: PPT/frontend checklist에 dynamic status/notification QA evidence row와 체크 항목을 추가했습니다.
- Reports: 이 보고서를 추가했습니다.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|
| W3C WCAG Status Messages / ARIA22 | knowledge-only | no install | overreliance if treated as actual artifact conformance proof |
| MDN live region/status role | cross-check only | no install | implementation guidance, not artifact evidence |
| Carbon Notification guidance | cross-check only | no package imported | design-system docs only; no component adoption |
| Storybook accessibility testing | carried/project-specific | no package, MCP server, CI, or local server run | supply chain, local server exposure, brittle tests, overreliance |

## Duplicate / Excluded

- duplicate-general: existing checklist mentioned loading/empty/error/success and carousel `aria_live_policy`, but did not cover dynamic status/live region QA fields for general UI status messages.
- duplicate/reference-only: Storybook accessibility docs remain useful for component QA but do not replace screen reader/live announcement evidence.
- carried/project-specific: Storybook runtime remains conditional until a concrete frontend repo, dependency state, CI path, browser QA, authorization scope, and rollback plan exist.
- blocked: X remains excluded by automation rule.
- source-weak: Threads public snippets were not needed for this source-backed note.

## Failure / Blocked / Not Checked

- 실제 PPT, web deck, dashboard, frontend repo, Storybook story, Playwright/browser QA는 실행하지 않았습니다.
- 실제 screen reader announcement, browser/assistive-technology combination test, live region timing test, mobile notification behavior는 수행하지 않았습니다.
- Storybook, Carbon package, browser extension, connector, MCP server, GitHub workflow는 설치/연결/실행하지 않았습니다.
- W3C techniques와 Understanding 문서는 강한 근거지만, 실제 UI 접근성 합격 증거는 아닙니다.

## Cross-Verification

- W3C Status Messages를 W3C ARIA22로 대조해 status message가 `role=status`와 `aria-atomic`으로 전달될 수 있음을 확인했습니다.
- WAI-ARIA APG Alert Pattern으로 alert는 focus를 바꾸지 않지만 auto-dismiss와 잦은 interrupt가 위험하다는 기준을 확인했습니다.
- MDN live regions/status role로 `aria-live` politeness, update timing, advisory status vs alert 구분을 확인했습니다.
- Carbon Notification으로 toast/inline notification component에서 urgent 여부, close button label, color-only warning 금지 같은 실무 기준을 교차 확인했습니다.
- Local duplicate search에서 status/live-region general QA field가 checklist에 없음을 확인했습니다.

## 에던님이 바로 쓰실 수 있는 예시

- 저장 버튼을 누른 뒤 "저장되었습니다" toast만 보이게 하지 말고 screen reader가 같은 메시지를 듣는지 확인하시면 됩니다.
- 검색/필터 결과는 결과 카드만 바꾸지 말고 "18개 결과" 또는 "결과 없음" 같은 status message를 별도로 남기시면 됩니다.
- 업로드/내보내기 진행률은 spinner만 두지 말고 진행/완료/실패 상태가 텍스트와 announcement로 전달되게 하시면 됩니다.
- 토스트 안에 "실행 취소" 버튼이 있으면 단순 status가 아니라 keyboard focus 전략과 수동 dismiss를 함께 보셔야 합니다.
- Storybook/axe 검사가 통과해도 동적 announcement는 놓칠 수 있으므로 QA_REPORT에 수동 screen reader 확인 여부를 따로 쓰시면 됩니다.

## Improvement Delta

- `PPT Frontend Visual Communication Checklist`에 dynamic status/notification QA 항목을 추가했습니다.
- 새 QA evidence fields: `status_message_scope`, `status_message_role`, `live_region_politeness`, `aria_atomic`, `announced_message_text`, `focus_not_stolen`, `auto_dismiss_duration`, `manual_dismiss_available`, `interactive_notification_focus_strategy`, `screen_reader_announcement_checked`.
- 이번 보강은 기존 frontend state checklist를 "상태가 보이는가"에서 "상태 변화가 focus를 빼앗지 않고 보조기술에도 전달되는가"까지 확장합니다.

## Adoption Check

- done: 직전 Next Eval의 "구체 PPT/frontend QA field가 바뀔 때만 source note 추가" 기준을 적용했습니다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 queue file에서 직접 재확인했습니다.
- done: W3C/MDN/Carbon 자료를 conformance proof가 아니라 knowledge-only QA field source로 저장했습니다.
- carried: 실제 PPT/frontend artifact QA는 파일이나 repo가 있을 때 수행합니다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때 재평가합니다.
- carried: Figma/connector/account tools는 승인된 workspace/file/export/billing context가 있을 때 재평가합니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|
| Add source only if QA field changes | carried operating rule | done | Dynamic status/live region QA fields were added. |
| Future real PPT/frontend artifact QA | carried | carried | No concrete artifact or repo was available. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, auth scope, or rollback path. |
| Figma Motion/Agent/MCP connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Threads signal | source-weak | dropped for storage | Public snippets were not needed for status-message source-backed note. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, complex image long-description equivalence, carousel/slideshow QA, complex information/cognitive support, interactive control target/focus QA, or dynamic status/live region QA.
3. If it revisits notifications/status messages, prioritize actual artifact evidence such as screen reader announcement result, browser accessibility tree, live region DOM timing, focus retention, and auto-dismiss/manual-dismiss behavior over adding more general guidance.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, promote status/toast/notification sources only when they add artifact-level QA evidence. For toast, snackbar, async save result, search result count, loading/progress, dashboard refresh, form submit result, and export/upload job UI, record status_message_scope, status_message_role, live_region_politeness, aria_atomic, announced_message_text, focus_not_stolen, auto_dismiss_duration, manual_dismiss_available, interactive_notification_focus_strategy, and screen_reader_announcement_checked. Treat Storybook/axe as useful but insufficient for live announcement proof.
```

## Questions / Tracking Candidates

- 다음 실제 frontend 또는 web deck 작업에서 toast 1개를 골라 visual message와 screen reader announcement를 분리해 확인합니다.
- Dashboard/export/upload 작업이 생기면 progress, completion, failure message가 focus를 빼앗지 않고 전달되는지 QA_REPORT에 남깁니다.
- Storybook 접근성 검사는 live region announcement를 자동 보장하지 않으므로 실제 repo가 있을 때 수동 보조기술 테스트 후보를 같이 둡니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| operating docs read | passed | AGENTS, role docs, LLM Wiki index/log, improvement model, checklist |
| recent reports checked | passed | 20:00, 19:03, 18:33, 18:04 reports |
| queue recounted from file | passed | `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | W3C/MDN/Carbon/Storybook lanes checked |
| duplicate check | passed | local status/live-region search found no dedicated checklist fields |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 157, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

PASS_WITH_WARNINGS. W3C WCAG 2.2 status message guidance is strong enough for knowledge-only QA field absorption, but it is not proof that any real deck, web deck, dashboard, or frontend artifact announces status changes correctly. The mitigation is explicit: actual artifact QA remains carried, and no implementation code or tool was installed.
