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
  - "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o7p02-alternative-content/"
  - "https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/"
  - "https://www.w3.org/WAI/cognitive/"
  - "https://www.w3.org/TR/WCAG22/"
  - "https://www.section508.gov/design/digital-content-users-with-cognitive-disabilities/"
  - "https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/"
collectionPurpose: "Dex Company Growth Scan 2026-07-04 19:03 KST 결과와 PPT/frontend cognitive information QA checklist 보강 기록"
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
  - cognitive-accessibility
  - information-design
---

# Dex Company Growth Scan - Cognitive Information QA

## Original Content

이 보고서는 2026-07-04 19:03 KST 실행 결과입니다. 원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 기준, QA 결과만 보존합니다.

## Run Scope and Limits

- 실행 시각: 2026-07-04 19:03 KST
- 임시 집중 모드: 적용 중입니다. 종료 시각은 2026-07-05 00:00:00 KST입니다.
- 검색 범위: W3C WAI Cognitive Accessibility supplemental guidance, W3C clear content objective, W3C cognitive accessibility hub, WCAG 2.2, Section508 cognitive disability design guidance, NN/g form cognitive-load guidance, Storybook interaction testing, Figma Motion/Config, Threads snippets, local duplicate coverage.
- 우선순위: design, UX, UI, PPT, presentation design, information design, frontend, accessibility QA.
- 제외/한계: 실제 PPT 파일, frontend repo, Storybook story, browser QA, PowerPoint Accessibility Checker, user testing은 이번 실행에서 돌리지 않았습니다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 12 | public candidate lanes 8개와 local duplicate/status lanes 4개 |
| stored.count | 1 | W3C COGA complex information source note 1개 |
| duplicate.count | 5 | W3C clear content objective, WCAG 2.2, Section508, NN/g forms, Storybook/Figma lanes |
| deferred.count | 4 | actual PPT/frontend artifact QA, Figma Motion workspace context, Storybook runtime adoption, cognitive user testing |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 확인 기준 |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. W3C WAI의 최근 Cognitive Accessibility supplemental pattern은 복잡한 정보와 작업을 하나의 표현 방식으로만 두지 말고, 사용자가 이해하기 쉬운 대체 형식과 보조 설명을 제공하라고 권장합니다.
2. 이 guidance는 WCAG 2 conformance 필수 기준이 아니라 supplemental guidance입니다. 따라서 실제 산출물 접근성 합격 증거가 아니라 QA field 보강 근거로만 써야 합니다.
3. PPT에서는 복잡한 chart, 시장 수치, 비교표, 단계 설명에 plain-language summary, numeric alternative, choice tradeoff, supplemental content link를 둬야 합니다.
4. Frontend에서는 dashboard, report UI, onboarding, form flow에서 사용자가 외부 도움 없이 이해하고 완료할 수 있는지 확인해야 합니다.
5. 기존 checklist의 chart/long-description 기준은 시각 자료 설명에 강했고, 이번 보강은 복잡한 정보와 작업 절차의 인지 접근성까지 확장합니다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| W3C COGA Alternative Content for Complex Information | https://www.w3.org/WAI/WCAG2/supplemental/patterns/o7p02-alternative-content/ | official guidance | stored-source | high | PPT/frontend complex information QA field 근거 |
| W3C Clear and Understandable Content Objective | https://www.w3.org/WAI/WCAG2/supplemental/objectives/o3-clear-content/ | official guidance | cross-check | high | 쉬운 언어, 요약, instruction 분리 보강 |
| W3C Cognitive Accessibility hub | https://www.w3.org/WAI/cognitive/ | official overview | cross-check | high | supplemental guidance의 위치와 한계 확인 |
| WCAG 2.2 | https://www.w3.org/TR/WCAG22/ | W3C recommendation | cross-check | high | WCAG가 cognitive needs를 일부만 다룬다는 한계 확인 |
| Section508 cognitive disability design guidance | https://www.section508.gov/design/digital-content-users-with-cognitive-disabilities/ | government guidance | cross-check only | medium-high | clear structure, feedback, labels, readable visual design 보강 |
| NN/g cognitive load in forms | https://www.nngroup.com/articles/4-principles-reduce-cognitive-load/ | UX article | cross-check only | medium | form flow의 structure/transparency/clarity/support 실무 보강 |
| Storybook interaction testing | https://storybook.js.org/docs/writing-tests/interaction-testing | official docs | carried/project-specific | medium-high | 실제 repo context가 있을 때 task-flow QA로 연결 |
| Figma Motion / Config 2026 | https://www.figma.com/blog/ | vendor product lane | carried/account-adjacent | medium | motion/agent는 workspace/export/billing context 필요 |
| Threads snippets | https://www.threads.net/ | public SNS snippets | dropped/source-weak | low | source-backed evidence로 저장하지 않음 |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-coga-alternative-content-complex-info.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 queue는 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지합니다.
- Source: W3C COGA complex information source note 1개를 추가했습니다.
- Wiki: PPT/frontend checklist에 complex information / cognitive support QA evidence row와 체크 항목을 추가했습니다.
- Reports: 이 보고서를 추가했습니다.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| W3C COGA supplemental guidance | knowledge-only | no install | overreliance if treated as conformance proof |
| Section508 / NN/g cross-checks | cross-check only | no install | useful practice signal, not artifact evidence |
| Figma Motion / Config | carried/account-adjacent | no account connection | workspace, file, export, billing, sensitive information risk |
| Storybook interaction testing | carried/project-specific | no package or CI change | needs repo dependency review and rollback path |

## Duplicate / Excluded

- duplicate/cross-check: W3C clear content objective와 WCAG 2.2는 별도 source note보다 이번 COGA source note의 한계와 보강 근거로 쓰는 것이 적절합니다.
- duplicate/cross-check: Section508과 NN/g forms guidance는 실무 보강으로 유용하지만, W3C source보다 우선할 정도의 새 운영 규칙은 아닙니다.
- carried: Storybook interaction testing은 실제 frontend repo가 있을 때 가치가 커집니다.
- carried/account-adjacent: Figma Motion/Agent/MCP는 승인된 workspace/file/export/billing context가 있을 때만 다시 봅니다.
- blocked: X는 자동화 규칙상 제외했습니다.

## Failure / Blocked / Not Checked

- 실제 에던님의 PPT, dashboard, web deck, frontend repo, form flow를 평가하지 않았습니다.
- 인지 접근성 사용자 테스트, screen reader 테스트, PowerPoint Accessibility Checker, browser accessibility tree, Storybook/Playwright 실행은 수행하지 않았습니다.
- W3C supplemental guidance는 WCAG conformance 필수 기준이 아니므로 법적 적합성 또는 실제 artifact 합격으로 말하지 않습니다.

## Cross-Verification

- W3C COGA pattern을 W3C Cognitive Accessibility hub로 교차 확인해 supplemental guidance의 성격과 한계를 확인했습니다.
- WCAG 2.2 문서로 cognitive/language/learning needs가 일부만 다뤄진다는 점과 supplemental guidance를 함께 보라는 맥락을 확인했습니다.
- Section508 guidance와 NN/g forms cognitive-load guidance로 plain language, structure, feedback, support가 실무 UI 품질 기준에도 맞는지 대조했습니다.
- Local duplicate search에서 COGA/alternative content/complex information 직접 source note는 없었고, 기존 long-description 및 checklist 항목과 겹치되 범위가 더 넓은 것으로 판단했습니다.

## 에던님이 바로 쓰실 수 있는 예시

- PPT 시장 분석 슬라이드: 차트 제목만 두지 말고 "이 숫자가 의미하는 결론", "비교 기준", "주의할 해석"을 한 문장으로 붙입니다.
- 투자/전략 덱: 선택지 A/B/C에는 장점만 나열하지 말고 단점과 후속 리스크를 함께 둡니다.
- Dashboard UI: KPI 카드 옆에 기준 기간, 전월 대비인지 목표 대비인지, 잘못 읽기 쉬운 제한을 표시합니다.
- Form flow: 사용자가 입력 형식을 기억하게 만들지 말고, 예시와 오류 복구 문장을 가까운 곳에 둡니다.
- 보고서/제안서: 긴 문서 앞에는 요약, 결정해야 할 질문, 다음 행동을 먼저 둡니다.

## Improvement Delta

- `PPT Frontend Visual Communication Checklist`에 complex information / cognitive support 항목을 추가했습니다.
- 새 QA evidence fields: `plain_language_summary`, `step_by_step_support`, `numeric_alternative`, `choice_tradeoff`, `supplemental_content_selection`, `primary_supplement_relation`, `help_visibility`, `external_assistance_risk`.
- 이번 보강은 기존 visual accessibility 중심 체크를 "이해 가능한 정보 설계"까지 확장합니다.

## Adoption Check

- done: 직전 Next Eval의 "구체 PPT/frontend QA field가 바뀔 때만 source note 추가" 기준을 적용했습니다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 queue file에서 직접 재확인했습니다.
- done: W3C 자료를 conformance proof가 아니라 knowledge-only QA field source로 저장했습니다.
- carried: 실제 PPT/frontend artifact QA는 파일이나 repo가 있을 때 수행합니다.
- carried: Figma Motion/Agent/MCP connector는 승인된 workspace/file/export/billing context가 있을 때 재평가합니다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 있을 때 재평가합니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | W3C COGA pattern added complex-information QA fields not explicit in the checklist. |
| Future real PPT/frontend artifact QA | carried | carried | No concrete artifact or repo was available. |
| Figma Motion/Agent/MCP connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, or rollback path. |
| Threads signal | source-weak | dropped for storage | Public snippets were not strong enough for source-backed note. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, complex image long-description equivalence, carousel/slideshow rotation/focus/keyboard/aria-live QA, or complex information/cognitive support.
3. If it revisits cognitive accessibility, prioritize actual artifact QA or user-test criteria over adding more general guidance.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, promote cognitive-accessibility sources only when they add artifact-level QA evidence. For complex charts, numbers, reports, onboarding, form flows, and decision tables, record plain_language_summary, step_by_step_support, numeric_alternative, choice_tradeoff, supplemental_content_selection, primary_supplement_relation, help_visibility, and external_assistance_risk. Treat W3C supplemental guidance as knowledge-only and do not claim WCAG conformance from it.
```

## Questions / Tracking Candidates

- 다음 실제 PPT나 dashboard 작업에서 복잡한 차트 1개를 골라 plain-language summary와 numeric alternative가 있는지 확인합니다.
- Form/onboarding UI 작업이 생기면 NN/g cognitive-load 원칙을 Storybook interaction test와 연결할 수 있는지 봅니다.
- COGA guidance는 더 추가 저장하기보다 실제 artifact QA checklist로 쓰는 것이 우선입니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| automation prompt checked | passed with warning | `automation.toml` exists but prompt text is mojibake in console; user prompt and memory remain usable |
| operating docs read | passed | AGENTS, role docs, LLM Wiki index/log, improvement model, checklist |
| recent reports checked | passed | 18:33, 18:04, 17:33, 17:04 reports |
| queue recounted from file | passed | `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | W3C COGA/Clear Content/Cognitive hub/WCAG/Section508/NN-g/Storybook/Figma/Threads lanes |
| duplicate check | passed | local cognitive/COGA/complex information search found no existing direct source note |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 155, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; `FALLBACK_SCHEMA_UTF8_OK` |

## Watchdog

PASS_WITH_WARNINGS. W3C COGA guidance is strong enough for knowledge-only QA field absorption, but it is not proof that any real deck, report, or frontend artifact is cognitively accessible. The mitigation is explicit: actual artifact QA remains carried, and no implementation code or tool was installed.
