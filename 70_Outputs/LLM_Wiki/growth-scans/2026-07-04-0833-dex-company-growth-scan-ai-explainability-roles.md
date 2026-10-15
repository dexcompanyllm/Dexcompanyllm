---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - AI Explainability Roles - 2026-07-04 08:33 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T08:33:12+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://www.nngroup.com/articles/crafting-ai-explanations/"
  - "https://www.nngroup.com/articles/ai-explanations/"
  - "https://doi.org/10.48550/arXiv.1909.03012"
  - "https://www.w3.org/TR/WCAG22/"
  - "https://github.blog/changelog/label/copilot/"
  - "https://developers.openai.com/codex/changelog"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
collectionPurpose: "30분 간격 Growth Scan에서 직전 07:33 실행의 NN/g AI explanations deferred item을 다시 확인하고, 본문과 교차 근거가 안정적으로 확인된 경우 source note로 흡수하기 위한 보고서다."
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
  - ux-research
  - ai-explainability
---

# Dex Company Growth Scan - AI Explainability Roles - 2026-07-04 08:33 KST

## Run Scope And Limits

- 실행 시각: 2026-07-04 08:33 KST
- 검색 범위: automation memory, 현재 작업 폴더, Dex Company 운영 문서, LLM Wiki index/log/improvement guide, 최근 08:03/07:33/07:03/06:34 보고서, 10x candidate queue, OpenAI Codex changelog, GitHub Copilot changelog, Obsidian changelog, Figma MCP 글, NN/g 최신 article, AIX360 taxonomy, W3C WCAG 2.2.
- 실행 초점: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지하면서 직전 실행에서 `deferred/partial`이었던 NN/g AI explanations 항목을 다시 판정했다.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub app, Figma action, Obsidian setting, token, API key, account connection, cloud resource, billing action, model switch, workflow, file deletion은 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/보류/저장 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한 것이다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 14 |
| stored.count | 1 |
| duplicate.count | 9 |
| deferred.count | 3 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. NN/g의 2026-07-03 AI explainability article은 직전 실행에서 본문 extraction이 불안정해 `deferred/partial`이었지만, 이번 실행에서는 제목, 저자, 발행일, 본문 핵심 구조, sidebar, 연구 참고문헌을 확인했다.
2. enterprise AI 설명 가능성은 한 가지 설명 방식으로 충분하지 않다. governance lead, builder, domain expert는 각각 audit summary, configuration/debug trace, plain-language policy/context feedback이 필요하다.
3. AIX360 taxonomy paper는 이해관계자별 설명 요구와 taxonomy 필요성을 독립 근거로 보강한다. 따라서 이번 note는 NN/g 단독 의견이 아니라 UX article + research taxonomy cross-check로 저장했다.
4. GitHub Copilot July 항목, OpenAI Codex changelog, Obsidian changelog, Figma MCP practical examples는 기존 source notes/reports와 운영 범위가 겹쳐 새로 저장하지 않았다.
5. WCAG는 이 NN/g 글 자체의 주제가 아니지만, AI 설명 panel, feedback widget, status message, audit dashboard를 구현할 때는 name/role/value, status messages, keyboard/focus/error 기준과 연결된다.

## Stored / Absorbed Sources

- source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-nngroup-ai-explainability-enterprise-roles.md`
- wiki note: 없음
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-0833-dex-company-growth-scan-ai-explainability-roles.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | NN/g AI explainability enterprise roles source note 1개 추가 |
| wiki/ | 변경 없음 |
| index.md | source note와 이번 report 링크 추가 |
| log.md | 08:33 scheduled growth scan 이력 추가 |
| candidate queue | 직접 수정 없음. `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 |
| automation memory | 이번 실행 요약 추가 예정 |

## Evidence Table

| Candidate | Primary evidence | Classification | Confidence |
|---|---|---|---|
| NN/g AI explainability for enterprise roles | NN/g official article + sidebar + AIX360 paper | stored-source | medium |
| AIX360 taxonomy paper | arXiv/DOI and IBM-linked taxonomy reference | cross-check only | medium |
| W3C WCAG 2.2 | W3C official recommendation | QA anchor only | high |
| GitHub Copilot July changelog | GitHub official changelog + existing notes | duplicate-source | high |
| OpenAI Codex changelog | OpenAI official changelog + existing notes | duplicate/no-new-signal | high |
| Obsidian changelog | Obsidian official changelog + existing notes | duplicate-source | high |
| Figma MCP practical examples | Figma official blog + existing notes | duplicate-with-caveat | medium |
| NN/g UX outcome reporting | existing source note | duplicate-source | high |
| Storybook release/search result | official result but no new operating delta | duplicate/no-new-signal | medium |
| W3C WAI update/news | W3C official pages + existing notes | duplicate-source | high |
| Threads snippets | public snippets only | deferred/source-weak | low |
| X | automation rule excludes X | blocked | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| AIX360 toolkit / GitHub package | research cross-check only | No | supply chain, dependency conflicts, overreliance on explainability metrics |
| GitHub Copilot code review MCP/agent skills | carried/project-specific | No | excessive agency, prompt injection through PR/issues, write-scope confusion, sensitive information disclosure |
| Figma MCP / Agent connector workflow | carried/account-adjacent | No | design-file permission leakage, connector context overreach, asset export exposure |

## Duplicate / Rejected / Deferred

- duplicate-source: GitHub Copilot session streaming, usage metrics, AI credit pools, Copilot Vision, auto model governance, Obsidian changelog, W3C WCAG/WAI, NN/g UX outcome reporting.
- duplicate/no-new-signal: OpenAI Codex changelog and Storybook general search result because existing source notes already cover the operational need.
- deferred/source-weak: Threads snippets remain discovery-only because stable source text, author context, and cross-source confirmation were insufficient.
- deferred/account-adjacent: Figma MCP/Agent remains carried until an actual project file, workspace permission, connector context, asset export scope, and human review path exist.
- blocked: X remains excluded by automation rule.

## Failure / Blocked / Not Checked

- 에던님의 GitHub/Figma/OpenAI account plan, organization policy, billing, connector settings, local runtime versions, actual AI explainability UI were not checked.
- NN/g article의 유료 강의 자료, ServiceNow internal example, 실제 enterprise deployment data는 확인하지 않았다.
- AIX360 toolkit code/package was not installed or executed; it was used only as a research taxonomy cross-check.
- Threads full-context extraction was not performed and was not treated as source-backed evidence.

## Cross Verification Evidence

- NN/g primary article was cross-checked with NN/g sidebar article on explanation types.
- The sidebar's taxonomy basis was cross-checked against the AIX360 paper via DOI/arXiv metadata.
- Accessibility linkage was bounded against W3C WCAG 2.2 as an implementation QA anchor, not as a claim that the NN/g article itself is a WCAG standard.
- Local duplicate search checked existing LLM Wiki source notes, reports, index, log, and inbox before creating the new source note.

## Ethan Can Use This Immediately

- AI agent 실사 보고서에서 "설명을 제공한다"라고만 쓰지 말고, 설명 대상자를 `governance lead`, `builder`, `domain expert`, `end user`로 나누시면 좋습니다.
- 자동화/LLM Wiki 보고서에는 `explanation.audience`, `trace.level`, `audit.summary`, `configuration.cause`, `domain_feedback.channel`, `human_review.required`를 추가 후보로 보면 다음 덱스가 왜 승인/차단/보류했는지 더 빨리 판단할 수 있습니다.
- AI 설명 UI를 만들 때는 설명 내용뿐 아니라 피드백 버튼, 상태 메시지, confidence/error 표시가 keyboard, focus, accessible name/role/value, status message 기준을 통과하는지 확인해야 합니다.

## Improvement Delta

- 직전 `deferred/partial`이었던 NN/g AI explanations 항목을 `stored-source`로 재판정했다.
- Growth Scan template 후보에 `explanation.audience`와 role-specific explanation fields를 추가했다.
- AI/agent source note 저장 기준을 "설명 가능성 좋음"이 아니라 "누가 어떤 결정을 내릴 때 필요한 설명인가"로 더 구체화했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했다.
- done: 직전 carried item인 NN/g AI explanations body-access 문제를 다시 확인했고, 본문과 교차 근거가 안정화되어 source note로 저장했다.
- done: 새 official/high-provenance 신호만 저장하고 GitHub/OpenAI/Figma/Obsidian 중복 신호는 재저장하지 않았다.
- carried: GitHub code review MCP/agent skills는 실제 repository PR review workflow가 생길 때만 재평가한다.
- carried: Figma MCP/Agent connector는 실제 workspace permission과 asset export scope가 정해질 때만 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| NN/g AI explanations body-access item | deferred/partial | done | article body, sidebar, AIX360 cross-check confirmed |
| Short no-op if no high signal | carried | done-with-exception | one previously deferred high-value source became verifiable |
| GitHub code review MCP/agent skills | carried/project-specific | carried | no active repo PR review workflow exists |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | no approved connector/file/workspace context |
| Threads snippets | discovery-only | carried/source-weak | stable source text and cross-check still insufficient |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. If no new official/high-provenance signal appears, create only a short no-op report and do not add source notes.
3. For AI explanation, agent audit, or governance sources, record `explanation.audience`, `trace.level`, `audit.summary`, `configuration.cause`, `domain_feedback.channel`, `human_review.required`, and `WCAG.anchor`.
4. Do not install explainability toolkits, MCP servers, connectors, packages, GitHub apps, or Figma actions without explicit approval and project-specific risk review.

## Prompt Or Template Patch Candidate

```text
For AI explanation, agent governance, and enterprise AI adoption sources, do not store the source just because it says "transparency" or "trust." Store only when it changes a Dex Company decision field. Record explanation.audience, trace.level, audit.summary, configuration.cause, domain_feedback.channel, human_review.required, WCAG.anchor, install.status, and account_or_runtime.not_checked.
```

## Questions / Tracking Candidates

- 실제 AI agent 운영 대시보드를 만들 때 governance lead, builder, domain expert별 설명 화면을 분리할지 확인해야 한다.
- GitHub PR review 자동화가 실제 repository에서 열리면 code review MCP/agent skills carried item을 다시 꺼내야 한다.
- Figma MCP/Agent를 실제 디자인 파일에 연결할 때는 workspace permission, asset export scope, design token source, human review, WCAG QA를 먼저 분리해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Growth-scan skill guidance checked | passed | durable growth-scan skill guidance read |
| Vault operating docs checked | passed | AGENTS, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 08:03, 07:33, 07:03, 06:34 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, NN/g, AIX360, W3C, Storybook lanes checked |
| Duplicate check | passed | existing LLM Wiki notes/reports/index/log/inbox searched before writing |
| Previous deferred rejudgement | passed | NN/g AI explanations item rejudged from deferred/partial to done |
| Source schema | passed | official lint passed after report creation |
| Status script | passed | `llm-wiki-status.ps1` passed after report creation |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warning(s) |
| UTF-8 scan | passed | edited Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, model switch, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: NN/g/AIX360 explainability guidance can be overread as proof that an AI system is safe just because it explains itself.
- Mitigation: stored the note as UX/governance guidance only and kept install/runtime/account checks separate.
- Not checked: live enterprise deployment context, actual UI implementation, account/runtime availability, AIX360 package execution, Threads full-context extraction.
