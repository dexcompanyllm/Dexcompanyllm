---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan No New Signal - 2026-07-04 18:04 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T18:04:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://www.w3.org/WAI/tutorials/images/complex/"
  - "https://www.w3.org/WAI/test-evaluate/preliminary/"
  - "https://support.microsoft.com/en-us/accessibility/office-accessibility/add-alternative-text-to-a-shape-picture-chart-smartart-graphic-or-other-object"
  - "https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities"
  - "https://www.section508.gov/training/presentations/aed-cop-pptx07/"
  - "https://storybook.js.org/docs/writing-tests/interaction-testing"
  - "https://www.figma.com/blog/design-systems/"
  - "https://www.figma.com/blog/"
collectionPurpose: "30분 간격 Growth Scan에서 임시 design/PPT/frontend 집중 모드를 유지하되, 직전 대형 UI 성능 QA 업데이트 이후 새 source note를 만들 만큼 운영 규칙을 바꾸는 공개 자료가 있는지 확인한다."
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
  - no-new-signal
  - ppt
  - frontend
  - accessibility
---

# Dex Company Growth Scan No New Signal - 2026-07-04 18:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 18:04 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전입니다.
- 검색 범위: automation memory, 현재 폴더, 자동화 TOML, Vault 운영 문서, LLM Wiki index/log/improvement model, `PPT Frontend Visual Communication Checklist`, 최근 17:33/17:04/16:33/16:04 보고서, 10x candidate queue, W3C WAI complex images/easy checks/WCAG anchors, Microsoft PowerPoint/Office alt text and accessibility guidance, Section508 PowerPoint alt text training, Storybook interaction testing, Figma blog/design-system lanes, Threads/X 제외 규칙.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma/Canva/Microsoft app, account, token, billing, cloud resource, workflow, model switch, file deletion은 설치/연결/실행/생성하지 않았습니다.

## Original Content

이 보고서는 자동화 실행 기록입니다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존합니다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한 것입니다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 12 | public candidate lanes 8개와 local duplicate/status lanes 4개 |
| stored.count | 0 | 새 source note 없음 |
| duplicate.count | 8 | W3C complex images/G73/easy checks, Microsoft alt text/accessibility, Section508, Figma MCP/design-system, Storybook interaction/a11y |
| deferred.count | 3 | Storybook runtime adoption, Figma MCP/agent connector, actual PPT/dashboard artifact QA |
| blocked.count | 1 | X는 자동화 규칙상 제외 |
| lint.warning_count | 0 | 최종 status/lint/fallback 확인 기준 |

Queue count from the candidate table: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. W3C WAI complex images는 그래프, 차트, 다이어그램에 짧은 alt text와 긴 설명이 함께 필요하다는 기준을 더 직접적으로 보여주지만, 이미 `2026-07-04-w3c-g73-long-description-qa`와 체크리스트에 같은 운영 필드가 반영돼 있습니다.
2. Microsoft Office/PowerPoint alt text 문서는 이미지, 도형, 차트, SmartArt에 대체 텍스트를 넣는 절차와 Accessibility Checker를 확인하지만, 기존 Microsoft PowerPoint accessibility note와 중복입니다.
3. Section508 PowerPoint alt text training은 "시각물의 의미를 충분히 전달하는가"라는 좋은 수동 QA 문장을 제공하지만, 새 운영 규칙으로 승격할 만큼 W3C/Microsoft보다 강한 출처는 아닙니다.
4. Storybook interaction testing은 play function, Vitest addon, CI 실행 경로를 확인했지만, 현재 구체 frontend repo가 없어 project-specific carried로 유지합니다.
5. Figma blog의 MCP/design-system 신호는 design-to-code 관심과 맞지만 account/workspace/export/billing/permission 맥락 없이는 설치나 연결 후보가 아닙니다.

## Candidate Review

| Candidate | URL | Type | Classification | Evidence Quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WAI complex images | https://www.w3.org/WAI/tutorials/images/complex/ | W3C WAI tutorial | duplicate-source | high | PPT chart/dashboard/diagram의 short alt + long description 기준. Existing G73 note covers it. |
| W3C WAI Easy Checks complex images | https://www.w3.org/WAI/test-evaluate/preliminary/ | W3C WAI evaluation guide | duplicate-source | high | Charts/graphs should have short identification plus detailed description elsewhere. Covered by checklist. |
| Microsoft Office alt text | https://support.microsoft.com/en-us/accessibility/office-accessibility/add-alternative-text-to-a-shape-picture-chart-smartart-graphic-or-other-object | official support | duplicate-source | high | Object-level alt text procedure. Existing Microsoft PPT accessibility note covers the QA gate. |
| Microsoft PowerPoint accessibility | https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities | official support | duplicate-source | high | Accessibility Checker, title, reading order, contrast, alt text, screen reader testing. Already stored. |
| Section508 PowerPoint alt text module | https://www.section508.gov/training/presentations/aed-cop-pptx07/ | government training | duplicate/reference-only | medium-high | Good manual review wording, but not stronger than W3C/Microsoft anchors. |
| Storybook interaction testing | https://storybook.js.org/docs/writing-tests/interaction-testing | official docs | carried/project-specific | medium-high | Useful when a real frontend repo has Storybook/Vitest. No install or CI change now. |
| Figma design systems blog lane | https://www.figma.com/blog/design-systems/ | vendor blog index | carried/account-adjacent | medium | MCP/design-system signals remain approval-gated. No account/workspace context. |
| Figma latest blog | https://www.figma.com/blog/ | vendor blog index | duplicate/account-adjacent | medium | July 2026 AI/design workflow signal did not change current checklist fields. |

## Stored / Absorbed Sources

- New source notes: none.
- New wiki notes: none.
- Report stored: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1804-dex-company-growth-scan-no-new-signal.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | No change |
| wiki/guides | No change; existing PPT/frontend checklist already covers alt text, long description, reading order, product-scope QA, canvas accessibility, and large UI performance |
| index.md | Added this report link and backfilled the previous 17:33 report link that was missing from Important Notes |
| log.md | Added 18:04 no-new-signal entry |
| candidate queue | No change; zero eligible/not-checked/install-next preserved |
| automation memory | This run summary appended |

## Install / Due Diligence Candidates

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| Storybook interaction/Vitest testing | project-specific conditional | not installed or run | supply chain, CI cost, local server exposure, brittle tests, overreliance |
| Figma MCP / agent / design-system workflow | approval-not-ready | not connected or run | workspace permission, file sensitivity, asset export, prompt injection, billing |
| Microsoft PowerPoint/Copilot/Designer | account-specific carried | not opened or connected | generated-output review, accessibility overreliance, account/billing/feature availability |
| W3C/Microsoft/Section508 docs | knowledge-only | no install applicable | overreliance if treated as proof that a real deck or UI passed QA |

## Duplicate / Excluded

- duplicate-source: W3C complex images, W3C Easy Checks complex-image guidance, W3C G73, Microsoft PowerPoint accessibility, Microsoft Office alt text.
- duplicate/reference-only: Section508 PowerPoint alt text training.
- carried/project-specific: Storybook interaction tests until a concrete frontend repo, package state, browser QA, CI path, and rollback plan exist.
- carried/account-adjacent: Figma MCP/agent/design-system and Microsoft Copilot/Designer until approved workspace/account context exists.
- blocked: X remains excluded by automation rule.
- source-weak: Threads public snippets were not used as source-backed evidence.

## Failure / Blocked / Not Checked

- No actual PPT, PDF, dashboard, Storybook project, Figma file, or frontend repo was opened.
- No Accessibility Checker, screen reader test, Playwright test, Storybook/Vitest run, browser performance trace, or mobile rendering check was performed.
- Microsoft 365/Copilot/Designer account availability, feature rollout, billing, and generated deck quality were not checked.
- Figma MCP/agent connector availability, permissions, export path, and billing were not checked.
- No new source note was created because the strongest practical signal was already represented in the LLM Wiki.

## Cross Verification Evidence

- W3C WAI complex images was cross-checked against existing W3C G73 source coverage and W3C Easy Checks.
- Microsoft Office object alt text was cross-checked against the existing Microsoft PowerPoint accessibility source note.
- Section508 training was used as a government training cross-check, but not promoted because W3C/Microsoft anchors are already stronger.
- Storybook interaction testing was checked against the existing Storybook/Vitest lane and left project-specific.
- Local duplicate search checked `30_Knowledge/LLM_Wiki`, `00_Inbox/LLM_Wiki`, recent reports, index, log, and the PPT/frontend checklist before deciding no-new-signal.

## Ethan Can Use This Immediately

- PPT 차트나 대시보드 캡처를 넣을 때는 "보이는가"가 아니라 "짧은 설명 + 긴 설명/데이터 표/발표자 노트 중 하나로 같은 정보를 전달하는가"를 확인하시면 됩니다.
- 제안서 PDF나 발표자료를 납품할 때는 PowerPoint Accessibility Checker만 믿지 말고, 중요한 차트 1-2개를 골라 사람이 `description.equivalence`를 수동 확인하는 방식을 쓰시면 됩니다.
- 프론트엔드 카드/차트 컴포넌트는 Storybook interaction test를 바로 도입하기보다, 실제 repo가 있을 때 핵심 상태만 `play` 함수와 a11y check 후보로 잡는 것이 맞습니다.
- Figma MCP나 Copilot/Designer는 "좋아 보이는 새 기능"이 아니라 파일 권한, export 범위, 비용, 산출물 검토 기준이 있는 approval packet이 있을 때만 다루시면 됩니다.

## Improvement Delta

- 이번 실행은 체크리스트를 늘리지 않는 것이 개선입니다. W3C/Microsoft/Section508 자료가 기존 `long_description`, `alt text`, `reading_order`, `Accessibility Checker`, `human_review.required` 필드를 강화하지만 새 필드를 만들 정도는 아니었습니다.
- 17:33 보고서 링크가 index Important Notes에 빠져 있던 것을 발견해 이번 report 링크와 함께 보강했습니다.
- 30분 주기에서 약한 반복 자료를 source note로 저장하지 않는 no-new-signal 규칙을 유지했습니다.

## Adoption Check

- done: 직전 Next Eval의 "구체 PPT/frontend QA field가 바뀌지 않으면 short no-new-signal report" 기준을 적용했습니다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 큐 파일에서 직접 재확인했습니다.
- done: W3C/Microsoft/Section508 alt text 신호를 새 note로 중복 저장하지 않았습니다.
- carried: 실제 PPT artifact QA는 파일이 생길 때 수행합니다.
- carried: Storybook runtime/MCP는 concrete frontend project context가 생길 때 재평가합니다.
- carried: Figma MCP/Agent connector는 approved workspace/file/export/billing context가 생길 때 재평가합니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | No field changed; no new source note was created. |
| Future real frontend/canvas/PPT artifact QA | carried | carried | No concrete artifact was available. |
| Figma MCP/Agent connector | carried/account-adjacent | carried | No approved workspace, file, export, billing, or permission context. |
| Storybook runtime/MCP | carried/project-specific | carried | No repo, dependency delta, CI runtime, browser QA, or rollback path. |
| Microsoft alt text / PowerPoint accessibility | duplicate-source | duplicate-source | Existing notes and checklist already cover it. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, WCAG-EM product-scope evaluation, canvas/custom-rendered UI accessibility model, large list/tree UI performance, or complex image long-description equivalence.
3. Does not create another alt-text/complex-image note unless it adds a materially different QA field such as artifact-level automated extraction, screen-reader evidence, or a reusable deck QA template.
4. Keeps Figma/Storybook/Microsoft account and runtime features approval-gated unless there is a real project artifact and explicit approval.

## Prompt or Template Patch Candidate

```text
During the temporary design/PPT/frontend focus, do not promote another alt-text, complex-image, chart-accessibility, or presentation-accessibility source if it only restates existing W3C G73, Microsoft PowerPoint accessibility, or PPT Frontend Visual Communication Checklist fields. Promote only if it adds a new artifact-level QA field, test method, or acceptance evidence.
```

## Questions / Tracking Candidates

- 다음 실제 PPT/PDF 산출물이 생기면 `description.equivalence`와 `screen_reader_or_checker_result`를 QA_REPORT에 어떤 형식으로 남길지 확인합니다.
- 다음 frontend repo가 생기면 Storybook interaction/a11y testing을 설치 후보가 아니라 project-specific test plan으로 먼저 작성합니다.
- Figma/Microsoft/Canva 계정 연동 기능은 파일 권한, 비용, export 범위, rollback, human review가 있는 approval-ready packet이 생길 때만 재검토합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| durable prompt checked | passed-with-warning | `automation.toml` read; console output remains mojibake-prone, user prompt and memory preserve current rules |
| operating docs read | passed | Vault role/LLM Wiki docs, index/log, improvement model, checklist |
| recent reports read | passed | 17:33/17:04/16:33/16:04 reports checked |
| queue counted | passed | direct table count preserved zero eligible/not-checked/install-next |
| internet search | passed | W3C/Microsoft/Section508/Storybook/Figma lanes checked |
| duplicate check | passed | local LLM Wiki/report/inbox search performed before storage decision |
| source note schema | not applicable | no new source note |
| install ban | passed | no install/enable/connect/create action performed |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault` |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | report/index/log/memory checked after edits |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: repeating accessibility source notes can bloat LLM Wiki while adding no new operating rule.
- Mitigation: stored no new source note, preserved duplicate/no-new-signal classification, and kept runtime/account features approval-gated.
- Finalized at: 2026-07-04T18:14:00+09:00 after report/index/log/memory updates and verification.
