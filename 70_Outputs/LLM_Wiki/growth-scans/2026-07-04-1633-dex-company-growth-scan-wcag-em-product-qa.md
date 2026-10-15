---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan WCAG-EM Product QA - 2026-07-04 16:33 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T16:33:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://www.w3.org/TR/wcag-em-2/"
  - "https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.w3.org/WAI/tips/designing/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.figma.com/blog/"
  - "https://storybook.js.org/blog/"
collectionPurpose: "30분 간격 Growth Scan에서 임시 design/PPT/frontend 집중 모드에 맞춰 새 자료가 실제 frontend QA 기준을 바꾸는지 확인한다."
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
  - wcag-em
---

# Dex Company Growth Scan WCAG-EM Product QA - 2026-07-04 16:33 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 16:33 KST
- 임시 집중 모드: 적용 중. 종료 시각은 2026-07-05 00:00:00 KST 전이다.
- 검색 범위: automation memory, current folder, durable prompt, Vault 운영 문서, LLM Wiki index/log/checklist, 최근 16:04/15:34/15:04/14:33 보고서, 10x candidate queue, W3C WCAG-EM 2, W3C WAI overview/news/WCAG/design tips, Figma blog, Storybook blog, local duplicate search.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma/Canva/Microsoft app, account, token, billing, cloud resource, workflow, model switch, file deletion은 설치/연결/실행/생성하지 않았다.

## Original Content

이 보고서는 자동화 실행 기록이다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/저장 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 10 | public candidate lanes plus local duplicate lanes |
| stored.count | 1 | W3C WCAG-EM 2 source note |
| duplicate.count | 6 | W3C design tips/WCAG overview, Figma, Storybook, PowerPoint, W3C accessible presentations |
| deferred.count | 3 | Figma connector, Storybook project runtime, future real artifact QA |
| blocked.count | 1 | X excluded by automation rule |
| lint.warning_count | 0 | status/lint/fallback checks after edits |

Queue count from the candidate table remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. WCAG-EM 2 gives a stronger frontend QA rule than a page-level checklist: define product scope, identify common views and essential functionality, select a representative sample, evaluate complete processes, and report limits.
2. The draft is useful but not final. It is source-backed for evaluation framing, not a legal compliance or conformance guarantee.
3. W3C design tips are helpful but mostly duplicate existing checklist fields: contrast, color-not-alone, identifiable interactions, labels, feedback, headings/spacing, responsive design, media alternatives, and controls for auto-start content.
4. Figma and Storybook public signals remain project/account-adjacent for this run; they did not change the approval gate or local install status.
5. The immediate operating improvement is to stop treating one screen, one tool scan, or one Storybook story as whole-product accessibility evidence.

## Stored / Absorbed Sources

- Source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-wcag-em-2-digital-product-evaluation.md`
- Wiki guide updated: `30_Knowledge/LLM_Wiki/wiki/guides/PPT Frontend Visual Communication Checklist.md`
- Report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1633-dex-company-growth-scan-wcag-em-product-qa.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | Added W3C WCAG-EM 2 digital product evaluation source note |
| wiki/guides | Added frontend product QA scope/sample/complete-process/statement-limit fields |
| index.md | Added source note/report and operating rule |
| log.md | Added 16:33 growth scan entry |
| candidate queue | No change; zero eligible/not-checked/install-next preserved |
| automation memory | This run summary appended |

## Evidence Table

| Candidate | URL | Type | Classification | Evidence Quality | Dex Company use |
|---|---|---|---|---|---|
| W3C WCAG-EM 2 | https://www.w3.org/TR/wcag-em-2/ | official draft | stored-source | medium | Adds frontend product QA scope, representative sample, complete process, and statement-limit fields. |
| W3C WCAG-EM overview | https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/ | official overview | cross-check | high | Confirms WCAG-EM 2 draft applies beyond websites into apps/digital products. |
| W3C WAI news | https://www.w3.org/WAI/news/all/ | official news | cross-check | high | Confirms 2026 WCAG-EM 2 draft publication context. |
| W3C design tips | https://www.w3.org/WAI/tips/designing/ | official design guidance | duplicate/no-new-signal | high | Existing checklist already covers most design-time accessibility fields. |
| W3C WCAG overview | https://www.w3.org/WAI/standards-guidelines/wcag/ | official standard overview | duplicate-source | high | Existing WCAG source notes remain the standard anchor. |
| Figma blog | https://www.figma.com/blog/ | vendor blog | duplicate/account-adjacent | medium | No approved workspace/file/export/billing context. |
| Storybook blog | https://storybook.js.org/blog/ | project blog | carried/project-specific | medium | Revisit only inside a concrete frontend repo. |

## Install / Due Diligence Candidates

| Item | Decision | Installation status | OWASP LLM risk notes |
|---|---|---|---|
| WCAG-EM 2 methodology | knowledge-only | not installed | overreliance risk if draft is treated as final or conformance proof |
| Figma connector / Agent / MCP | approval-not-ready | not installed or connected | workspace permission, file sensitivity, asset export, billing, prompt injection |
| Storybook runtime or addon changes | project-specific conditional | not installed or run | supply chain, dependency delta, CI runtime, insecure output handling |

## Duplicate / Excluded

- duplicate-source: WCAG 2 overview, W3C accessible presentations, Microsoft PowerPoint accessibility/design guidance.
- duplicate/no-new-signal: W3C design tips because current checklist already has contrast, labels, feedback, focus, responsive, media alternatives, and auto-start controls.
- carried/account-adjacent: Figma Agent/MCP until a real workspace/file/export/billing approval packet exists.
- carried/project-specific: Storybook until a frontend repo, package delta, CI/browser QA, and rollback path exist.
- blocked: X remains excluded by automation rule.

## Failure / Blocked / Not Checked

- WCAG-EM 2 is a draft; final publication and legal compliance impact were not checked.
- No actual frontend repo, dashboard, web deck, PPT, PDF, or mobile app was evaluated.
- No Playwright, axe, Storybook, PowerPoint Accessibility Checker, or real-user evaluation was run.
- Figma/Storybook account, connector, billing, package versions, and local runtime were not checked.
- Threads full-context extraction was not used as source-backed evidence.

## Cross Verification Evidence

- WCAG-EM 2 draft was cross-checked with W3C WAI overview and W3C WAI news.
- WCAG 2 overview was used as the stable standard anchor; WCAG-EM 2 was treated as evaluation methodology, not new WCAG requirement.
- Local duplicate search checked LLM Wiki sources, reports, index, log, and candidate queue before creating the source note.
- Existing W3C Q3 workplan note had only signaled WCAG-EM tracking; it did not preserve the digital product evaluation procedure.

## Ethan Can Use This Immediately

- Frontend QA를 하실 때 `evaluation.scope`를 먼저 적으시면 됩니다. 예: "로그인, 대시보드, 설정, 오류 상태, 모바일 390px까지 포함".
- 화면 샘플은 예쁜 첫 화면만 고르지 말고 `common_views`, `essential_functionality`, `empty/error/loading`, `mobile/zoom`을 같이 넣으시면 됩니다.
- 가입, 제출, 결제, export 같은 흐름은 `complete_process`로 묶어 중간 단계의 focus, error, label, keyboard path까지 확인하시면 됩니다.
- 자동 검사 결과는 `tool_result`로 남기고, 최종 문장에는 `statement_limit`: "대표 샘플 기준 부분 평가이며 전체 WCAG 준수 주장 아님"을 넣으시면 됩니다.

## Improvement Delta

- 직전 PPT 중심 체크리스트가 "한 화면/한 슬라이드의 판독성"까지 강화됐다면, 이번 실행은 frontend 산출물을 "전체 제품 범위와 대표 샘플"로 평가하도록 보강했다.
- `PPT Frontend Visual Communication Checklist`에 frontend product QA 행과 scope/sample/complete-process 항목을 추가했다.
- no-new-signal 규칙은 유지하되, W3C 공식 초안이 실제 QA 필드를 추가했으므로 source note 1개만 제한적으로 저장했다.

## Adoption Check

- done: 직전 16:04 Next Eval의 "QA field가 바뀔 때만 추가" 기준을 적용했다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했다.
- done: 새 source note는 실행 코드가 아니라 knowledge-only 평가 방법론으로 저장했다.
- carried: 실제 PPT artifact QA는 파일이 있을 때만 수행한다.
- carried: Figma Agent/MCP는 approved workspace/file/export/billing context가 있을 때만 재평가한다.
- carried: Storybook MCP/performance는 concrete frontend project context가 있을 때만 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Add source only if QA field changes | carried operating rule | done | WCAG-EM 2 added product-scope/sample/process/report-limit fields. |
| Future real PPT artifact QA | carried | carried | No actual PPT file was available. |
| Figma MCP/Agent connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete frontend repo or dependency delta. |
| W3C design tips | possible candidate | dropped for storage | Helpful but already covered by checklist fields. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. Creates only a short no-new-signal report unless a source changes a concrete PPT/frontend QA field beyond accessibility, hierarchy, async/mobile readability, one-insight charts, approval gates, or WCAG-EM product-scope evaluation.
3. For the next real frontend artifact, records `evaluation.scope`, `representative_sample`, `complete_processes`, `tool_result`, `manual_review`, and `statement_limit`.
4. Does not treat WCAG-EM 2 draft as final legal compliance evidence.

## Prompt or Template Patch Candidate

```text
For frontend, dashboard, web deck, and document-style artifact QA, do not present one screen or one automated scan as whole-product accessibility evidence. Record evaluation.scope, common_views, essential_functionality, representative_sample, complete_processes, tool_result, manual_review, and statement_limit. WCAG-EM 2 is a draft methodology signal, not a final conformance guarantee.
```

## Questions / Tracking Candidates

- 다음 실제 frontend repo가 생기면 대표 샘플을 어떤 화면/상태/viewport로 잡을지 정해야 한다.
- 다음 PPT/PDF artifact가 생기면 document 단위 평가와 small-screen readability를 함께 기록할지 확인한다.
- WCAG-EM 2 final publication 또는 W3C status change가 있으면 draft caveat를 갱신한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| durable prompt checked | passed | `automation.toml` temporary focus present, console output mojibake-prone |
| operating docs read | passed | Vault role/LLM Wiki docs, index/log, improvement model, checklist |
| recent reports read | passed | 16:04/15:34/15:04/14:33 reports checked |
| queue counted | passed | direct table count preserved zero eligible/not-checked/install-next |
| internet search | passed | W3C/Figma/Storybook/PowerPoint lanes checked |
| duplicate check | passed | local LLM Wiki/report/inbox search performed |
| source note schema | passed | required frontmatter and `## Original Content` included |
| install ban | passed | no install/enable/connect/create action performed |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 151, wiki notes 7 |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| fallback schema / UTF-8 | passed | source/report/checklist/index/log checked; schema OK and no replacement/mojibake markers |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: WCAG-EM 2 is a draft and can be over-claimed as final conformance proof.
- Mitigation: source note and checklist label it as evaluation methodology, keep conformance/legal/final publication as not checked, and require statement-limit wording in real artifact QA.
- Finalized at: 2026-07-04T16:36:02+09:00
