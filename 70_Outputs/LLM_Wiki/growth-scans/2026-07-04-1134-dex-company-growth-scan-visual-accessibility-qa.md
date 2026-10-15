---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Visual Accessibility QA - 2026-07-04 11:34 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T11:34:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/product-updates/"
  - "https://www.w3.org/WAI/WCAG21/Techniques/general/G73"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://storybook.js.org/blog/"
  - "https://www.threads.net/"
collectionPurpose: "30분 간격 Growth Scan에서 직전 11:03 no-new-signal 이후 새 공개 신호가 Dex Company 운영 규칙을 바꾸는지 확인하고, W3C G73를 이미지/PDF/차트 접근성 QA의 구체 기준으로 보존한다."
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
  - accessibility
---

# Dex Company Growth Scan Visual Accessibility QA - 2026-07-04 11:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 11:34 KST
- 검색 범위: automation memory, growth-scan guidance, automation.toml, Vault AGENTS/role docs/LLM Wiki guide/index/log/improvement model, recent 11:03/10:33/10:03/09:34 reports, 10x candidate queue, OpenAI Codex/API changelogs, GitHub changelog/Copilot Vision, Obsidian changelog, Figma product/agent/MCP posts, W3C WAI/WCAG/G73, NN/g articles, Storybook blog, Threads snippets.
- 실행 초점: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지하되, 기존 vision/frontend QA coverage에 없는 구체적인 W3C long-description 검증 기준만 source note로 저장한다.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub app, Figma action, Obsidian setting, token, API key, account connection, cloud resource, billing action, model switch, workflow, file deletion을 설치, 실행, 생성, 연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/보류/차단 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 기록이다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 12 |
| stored.count | 1 |
| duplicate.count | 8 |
| deferred.count | 2 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. W3C G73는 최신 뉴스는 아니지만 기존 LLM Wiki에 없던 구체 QA 기준이다. 차트, 이미지, PDF, transcript 같은 non-text content에 긴 설명 링크, 정보 동등성, 복귀 경로를 요구하는 실무 테스트로 쓸 수 있다.
2. Copilot Vision, Figma AI/MCP, Storybook/Playwright 같은 시각 입력 또는 UI 자동화 흐름은 "AI가 봤다"와 "사용자가 접근 가능한 정보를 받았다"를 분리해야 한다.
3. OpenAI Codex/API, GitHub Copilot July changelog, Obsidian, Figma Config/Agent/MCP, NN/g AI explanations, WAI Q3 workplan은 기존 source notes/reports와 중복이다.
4. Threads는 안정적인 원문/작성자/교차 검증이 부족해 계속 discovery-only다. X는 자동화 규칙상 제외했다.
5. Storybook performance/minimal install은 여전히 concrete frontend project context가 있을 때만 재판정한다.

## Stored / Absorbed Sources

- source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-g73-long-description-qa.md`
- wiki note: 없음.
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1134-dex-company-growth-scan-visual-accessibility-qa.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | W3C G73 long-description QA source note 1개 추가 |
| wiki/ | 변경 없음 |
| index.md | 이번 G73 source note와 11:34 report 링크 추가 |
| log.md | 11:34 scheduled growth scan 이력 추가 |
| candidate queue | 직접 수정 없음. 기존 `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, total candidates=95 유지 |
| automation memory | 이번 실행 요약 추가 |

## Queue Snapshot

| Status | Count |
|---|---:|
| stored-source | 43 |
| audit-done | 8 |
| duplicate-source | 28 |
| duplicate-in-queue | 9 |
| carried-vendor | 3 |
| carried-research-signal | 1 |
| dropped-low-signal | 3 |
| eligible-next | 0 |
| not-checked | 0 |
| install-audit-next | 0 |
| total_candidates | 95 |

## Evidence Table

| Candidate | Primary evidence | Classification | Confidence |
|---|---|---|---|
| W3C Technique G73 | W3C G73 + WCAG overview + existing Copilot Vision note | stored-source | medium |
| OpenAI Codex changelog | OpenAI official changelog + existing Codex remote/setup notes | duplicate-source | high |
| OpenAI API changelog | OpenAI official changelog + existing model/billing notes | duplicate-source | medium |
| GitHub changelog/Copilot July items | GitHub official changelog + existing Copilot governance notes | duplicate-source | high |
| Obsidian changelog | Obsidian official changelog + existing CLI/Bases/cleanup notes | duplicate-source | high |
| Figma product/agent/MCP posts | Figma official blog + existing Figma Config/agent/MCP notes | duplicate-source | high |
| W3C WCAG overview/WAI update | W3C official pages + existing WCAG/WAI notes | duplicate-source | high |
| NN/g articles | NN/g official article index + existing AI explanation/outcome notes | duplicate-source | high |
| Storybook blog/performance | Storybook official blog + existing Storybook QA notes | deferred/project-specific | medium |
| Threads snippets | public snippets only | deferred/source-weak | low |
| X | automation rule excludes X | blocked | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| Figma MCP / Agent connector workflow | carried/account-adjacent | No | connector overreach, design-file permission leakage, asset export exposure, prompt injection |
| GitHub Copilot Vision / browser / code review workflows | carried/project-specific | No | sensitive information disclosure, excessive agency, prompt injection through image/PDF/PR content, insecure output handling |
| Storybook minimal/performance install pattern | deferred/project-specific | No | dependency script risk, lockfile drift, overreliance on generated tests |
| W3C G73 | knowledge-only | No | no executable install; overreliance risk if treated as full WCAG proof |

## Duplicate / Rejected / Deferred

- duplicate-source: OpenAI Codex/API current changelogs, GitHub Copilot July governance/vision/model/billing items, Obsidian changelog, Figma Config/Agent/MCP posts, W3C WCAG overview/WAI Q3 workplan, NN/g AI explainability/outcome reporting.
- stored-source: W3C G73 because it adds a concrete QA field set not represented by existing general WCAG notes.
- deferred/project-specific: Storybook performance/minimal install. Revisit only inside a real frontend repository with dependency delta, lockfile delta, CI runtime, a11y test scope, browser QA, rollback path.
- deferred/source-weak: Threads snippets.
- blocked: X is excluded by automation rule.

## Failure / Blocked / Not Checked

- W3C G73 direct page footer says Updated 15 July 2025. It was stored as stable official technique, not as a new 2026 release.
- No current Dex Company UI, chart, PDF, or portfolio artifact was tested against G73.
- OpenAI/GitHub/Figma/Obsidian live account plan, organization policy, connector settings, local app versions, runtime availability, billing, model access were not checked.
- No package, SDK, MCP server, connector, browser extension, GitHub/Figma app, token, API key, billing action, workflow, or model switch was installed, enabled, connected, created, or run.

## Cross Verification Evidence

- W3C G73 was checked against W3C WCAG overview, which frames WCAG 2 supporting materials and Techniques as implementation resources.
- WAI Q3 workplan was checked as the current accessibility-methodology tracking surface, but it did not replace the G73 technique itself.
- Existing GitHub Copilot Vision note was checked to connect image/PDF AI input with non-text content QA.
- Local duplicate search found no existing G73/long-description source note in `30_Knowledge/LLM_Wiki` or `00_Inbox/LLM_Wiki`.

## Ethan Can Use This Immediately

- 차트가 있는 대시보드나 PDF/이미지 기반 보고서를 만들 때, 짧은 alt text만으로 충분한지 먼저 보시고 부족하면 바로 옆 긴 설명 링크와 복귀 경로를 QA 항목으로 넣으시면 됩니다.
- Copilot Vision이나 다른 AI vision 도구가 이미지 설명을 만들어도, 최종 QA에서는 `description.equivalence`, `return.path`, `human_review.required`, `WCAG.anchor=1.1.1`을 따로 확인하시면 됩니다.
- 포트폴리오, 이력서 PDF, 화면 캡처를 공유할 때 민감정보 제거와 긴 설명의 정확성을 분리하면 접근성과 보안 리스크를 같이 줄일 수 있습니다.

## Improvement Delta

- 반복 no-new-signal 기준을 유지하되, 기존 general WCAG coverage에 없는 concrete technique은 저장 가능한 예외로 처리했다.
- visual_input QA의 다음 템플릿 후보를 `long_description.link`, `description.equivalence`, `return.path`, `WCAG.anchor`, `human_review.required`로 구체화했다.
- "AI vision 가능"을 "접근성 검증 완료"로 과장하지 않는 운영 규칙을 강화했다.

## Adoption Check

- done: 직전 11:03 기준의 `existing_coverage.note`, `operational_scope.diff`, `revisit.trigger`, `install.status`, `account_or_runtime.not_checked`, `human_review.required` 조건을 적용했다.
- done: 중복 공식 changelog/blog 신호는 source note로 과잉 저장하지 않았다.
- done-with-exception: no-new-signal 원칙은 유지했지만, W3C G73는 기존 coverage와 다른 concrete QA field를 제공해 1개 source note로 저장했다.
- carried: GitHub code review MCP/agent skills는 active repo PR workflow가 있을 때만 재평가한다.
- carried: Figma MCP/Agent connector는 approved workspace/file/asset-export context가 있을 때만 재평가한다.
- carried: Storybook performance는 concrete frontend project context가 있을 때만 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done-with-exception | stored.count=1 because G73 added concrete visual accessibility QA fields |
| GitHub code review MCP/agent skills | carried/project-specific | carried | no active repo PR workflow exists |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | no approved connector/file/workspace context |
| Threads snippets | discovery-only | carried/source-weak | stable text and cross-check still insufficient |
| Storybook bloat/performance | deferred/project-specific | carried | no concrete Storybook project or upgrade request |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. If no new official/high-provenance source changes a Dex Company operating rule, create only a short no-op report.
3. For visual/PDF/chart/AI vision sources, store only if they add a concrete QA field or test method not already covered.
4. If a UI or portfolio artifact appears, run a small G73-style check: long-description link, information equivalence, and return path.

## Prompt or Template Patch Candidate

```text
For visual, PDF, chart, screenshot, or AI-vision QA items, do not treat image analysis as accessibility evidence. Record `WCAG.anchor`, `long_description.link`, `description.equivalence`, `return.path`, `visual_input.sensitivity`, `human_review.required`, and `account_or_runtime.not_checked`. Store a new accessibility source only when it adds a concrete field or test method beyond existing WCAG coverage.
```

## Questions / Tracking Candidates

- 다음 실제 frontend/dashboard/portfolio QA에서 G73 long-description check를 `QA_REPORT.md`에 넣을지 확인한다.
- Copilot Vision이나 Figma Agent를 이미지/PDF 검토에 쓰는 요청이 오면 account policy, attachment retention, sensitive data redaction, long-description equivalence를 먼저 확인한다.
- Storybook 프로젝트가 생기면 G73를 chart/image story QA와 연결할 수 있는지 본다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Growth-scan guidance checked | passed | durable growth-scan skill guidance read |
| Durable automation prompt checked | passed | `automation.toml` checked; active schedule remains every 00/30 KST |
| Vault operating docs checked | passed | AGENTS/role docs/LLM Wiki guide/index/log/improvement guide checked |
| Recent reports checked | passed | 11:03, 10:33, 10:03, 09:34 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, W3C, NN-g, Storybook, Threads lanes checked |
| Duplicate check | passed | G73/long-description searched in sources/wiki/index/log/inbox before writing |
| Previous deferred rejudgement | passed | no-op rule, GitHub code review, Figma MCP, Threads, Storybook performance rejudged |
| Queue count | passed | direct queue count preserved: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, total 95 |
| Source schema | passed | official lint passed after report creation |
| Status script | passed | `llm-wiki-status.ps1` passed after report creation |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warning(s) after report creation |
| UTF-8 scan | passed | edited Markdown files had U+FFFD replacement count 0 |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, model switch, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: W3C Technique storage can be overread as proof that an actual artifact is accessible.
- Mitigation: stored G73 as a QA method only, separated source-backed technique from not-checked local UI/PDF artifacts, and kept account/runtime/install actions out of scope.
- Not checked: live artifact conformance, screen reader behavior, local UI DOM, Copilot/Figma account availability, Threads full-context extraction.
