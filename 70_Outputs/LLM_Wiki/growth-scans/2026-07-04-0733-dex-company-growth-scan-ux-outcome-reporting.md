---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - UX Outcome Reporting - 2026-07-04 07:33 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T07:33:07+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.w3.org/WAI/news/"
  - "https://www.w3.org/press-releases/2025/wcag22-iso-pas/"
  - "https://www.nngroup.com/articles/"
  - "https://www.nngroup.com/articles/reporting-ux-business-outcomes/"
collectionPurpose: "30분 간격 Growth Scan에서 직전 no-new-signal 기준을 유지하되, 새로 확인된 고신뢰 UX reporting 자료를 Dex Company 보고서 품질 기준으로 흡수한다."
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
---

# Dex Company Growth Scan - UX Outcome Reporting - 2026-07-04 07:33 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 07:33 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault AGENTS/role docs/LLM Wiki guide/index/log/improvement model, 최근 07:03/06:34/06:03/05:35 보고서, 10x candidate queue, OpenAI Codex/API changelog, GitHub changelog, Obsidian changelog, Figma MCP/design-system 글, W3C WAI/news, NN/g 최신 article index와 새 UX reporting article.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 운영 기준을 유지하면서, 중복이 아닌 새 고신뢰 자료만 저장한다.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub app, Figma action, Obsidian setting, token, API key, account connection, cloud resource, billing action, model switch, workflow, file deletion은 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 출처 URL, 확인 범위, 저장/중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습"한 것이 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한 것이다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 12 |
| stored.count | 1 |
| duplicate.count | 7 |
| deferred.count | 3 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. NN/g의 2026-07-03 새 글은 UX 팀이 활동량이 아니라 revenue, cost, risk, speed, retention 같은 결과로 보고해야 한다는 기준을 제시한다. Dex Company Growth Scan도 `searched.count`/`stored.count`를 넘어서 어떤 운영 판단이 좋아졌는지 적어야 한다.
2. OpenAI Codex/API changelog는 이번 30분 구간에 기존 note 범위를 바꾸는 새 신호가 확인되지 않았다. 기존 Codex runtime, prompt/cost, model governance, security boundary notes로 충분하다.
3. GitHub changelog의 Copilot/agent/browser 관련 신호는 기존 06:34 Copilot Vision, 00:04 browser tools, token/billing/session notes와 중복이다.
4. W3C WCAG 2.2 ISO/IEC 40500:2025 보도자료는 공식 근거로 유용하지만, 기존 WCAG 2.2 source note와 W3C accessibility laws/policies note가 이미 운영 기준을 담고 있어 새 source note로 중복 저장하지 않았다.
5. Figma MCP practical examples와 NN/g AI explanations는 유용한 후보지만 각각 기존 Figma MCP/agent notes와 부분 중복, 또는 본문 extraction 미흡으로 이번에는 저장하지 않았다.

## Stored / Absorbed Sources

- source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-nngroup-ux-business-outcomes-reporting.md`
- wiki note: 없음.
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-0733-dex-company-growth-scan-ux-outcome-reporting.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | NN/g UX business outcome reporting source note 1개 추가 |
| wiki | 변경 없음 |
| index.md | source note와 이번 growth scan report 링크 추가 |
| log.md | 07:33 scheduled growth scan 이력 추가 |
| candidate queue | 직접 수정 없음. 기존 queue hygiene 기준상 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 |
| automation memory | 실행 완료 후 요약 추가 |

## Evidence Table

| Candidate | Primary evidence | Classification | Confidence |
|---|---|---|---|
| NN/g Stop Reporting UX Activity and Report Business Outcomes | NN/g official article, 2026-07-03 | stored-source | medium |
| NN/g Crafting AI Explanations for Every Role | NN/g latest index/search result | deferred/partial: source page body extraction failed this run | low |
| W3C WCAG 2.2 ISO/IEC 40500:2025 | W3C official press release + WAI news | duplicate-source: existing WCAG 2.2 and laws/policies notes cover the operating need | high |
| OpenAI Codex changelog | OpenAI official changelog | duplicate/no-new-signal | high |
| OpenAI API changelog | OpenAI official changelog | duplicate/no-new-signal | high |
| GitHub changelog | GitHub official changelog | duplicate/no-new-signal for current Dex Company coverage | medium |
| Obsidian changelog | Obsidian official changelog | duplicate/no-new-signal | high |
| Figma MCP practical examples | Figma official blog | duplicate-with-caveat: reinforces existing Figma MCP/design-system notes | medium |
| W3C WAI news | W3C official page | duplicate-source: WAI Q3/WCAG notes already cover QA anchor | high |
| Threads snippets | public snippets only | deferred/source-weak | low |
| X | automation rule excludes X | blocked | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| Figma MCP / Agent connector workflow | carried/account-adjacent | No | connector context overreach, design-file permission leakage, prompt injection through design context, insecure output handling |
| GitHub code review MCP/agent skills | carried/project-specific | No | excessive agency, PR/issue prompt injection, write-scope confusion, sensitive information disclosure |
| Threads/SNS source ingestion | deferred/source-weak | No | provenance weakness, overreliance on snippet context, source spoofing |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: OpenAI Codex/API changelogs, GitHub Copilot/browser/agent items already covered, Obsidian changelog, Figma MCP examples, W3C WAI update/news.
- duplicate-source: W3C WCAG 2.2 ISO/IEC 40500:2025 보도자료는 공식성이 높지만 기존 WCAG 2.2와 W3C laws/policies notes로 운영 기준이 이미 저장되어 있다.
- deferred/partial: NN/g AI explanations article은 latest index와 search result로 존재를 확인했지만 본문 extraction이 안정적으로 되지 않아 저장하지 않았다.
- deferred/source-weak: Threads snippets는 discovery-only로 유지한다.
- blocked: X는 자동화 규칙상 제외한다.

## Failure / Blocked / Not Checked

- OpenAI/GitHub/Figma/Obsidian live account, billing, plan, org policy, local runtime availability는 확인하지 않았다.
- Figma MCP connector, GitHub Copilot code review agent, browser tools, any package/runtime은 설치하거나 실행하지 않았다.
- NN/g AI explanations article은 검색 결과와 index에서는 확인했지만 본문이 열리지 않아 source-backed note로 저장하지 않았다.
- W3C ISO/IEC 40500:2025 자체 ISO 문서 전문은 열람하지 않았고 W3C press release와 WAI news를 기준으로만 판단했다.

## Cross Verification Evidence

- NN/g UX outcome reporting은 기존 `NN/g Insights Aren't Outcomes` source note와 `LLM Wiki Growth Scan Report Improvement Model` guide의 adoption/outcome tracking 기준과 교차 확인했다.
- W3C WCAG 2.2 ISO/IEC 40500:2025는 W3C press release와 WAI news에서 확인했고, 기존 WCAG 2.2 source note 및 accessibility laws/policies note와 비교했다.
- Figma MCP practical examples는 기존 Figma agent/design-system context, Figma agent skills, Figma ISO 42001 governance notes와 비교해 새 운영 규칙은 아니라고 판단했다.
- GitHub/OpenAI/Obsidian 항목은 최근 07:03/06:34/06:03 reports와 기존 source notes coverage를 `rg`로 대조했다.

## Ethan Can Use This Immediately

- Growth Scan 결과를 보실 때 `stored.count`가 많다고 좋은 실행으로 보지 말고, 이번처럼 "다음 판단 기준이 무엇으로 좋아졌는가"를 먼저 보시면 됩니다.
- UX/UI 보고서를 맡기실 때는 "테스트 몇 번 했다" 대신 revenue, cost, risk, speed, retention 중 어떤 결과와 연결되는지 요구하시면 됩니다.
- 접근성 QA는 WCAG 2.2 체크 자체를 활동으로 끝내지 말고, 실패 시 사용자 오류, 지원 요청, 리워크, 출시 지연으로 이어지는 위험까지 함께 적게 하시면 됩니다.

## Improvement Delta

- Growth Scan report 품질 기준에 `operational_outcome.diff` 관점을 추가했다. 이는 "자료를 몇 개 저장했는가"보다 "운영 판단, QA, 승인 게이트가 무엇으로 개선됐는가"를 묻게 만든다.
- no-new-signal 원칙은 유지하되, 중복이 아닌 최신 NN/g outcome-reporting 자료는 저장했다.
- W3C ISO/IEC 40500:2025는 유혹적인 새 공식 신호였지만 기존 coverage가 충분해 duplicate-source로 처리했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 기준을 유지했다.
- done-with-exception: "고신뢰 새 신호 없으면 no-op" 기준을 따르되, NN/g 2026-07-03 article은 새 운영 기준 가치가 있어 source note 1개로 저장했다.
- done: 새 공식 changelog 항목을 저장하기 전 `existing_coverage.note`, `operational_scope.diff`, `revisit.trigger`, `install.status`, `human_review.required` 관점으로 중복을 판정했다.
- carried: GitHub code review MCP/agent skills는 실제 repository PR review workflow가 열릴 때만 재감사한다.
- carried: Figma MCP/Agent connector는 workspace permission, connector context, asset export, WCAG QA, human review가 정해질 때만 재검토한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done-with-exception | NN/g outcome-reporting article은 새 운영 기준 가치가 있어 저장 |
| GitHub code review MCP/agent skills | carried/project-specific | carried | active repo PR workflow 없음 |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | practical examples는 기존 notes 보강 수준, 승인/연결 없음 |
| Threads snippets | discovery-only | carried/source-weak | stable source text와 cross-check 부족 |
| W3C WCAG/ISO signal | potential duplicate | duplicate-source | existing WCAG 2.2/laws notes coverage 충분 |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`; old broad queue를 다시 열지 않는다.
2. 새 source note를 저장할 때는 `operational_outcome.diff`를 한 줄로 기록한다.
3. UX/frontend/design-system 자료는 `activity.metric`, `outcome.metric`, `WCAG.anchor`, `user_or_business_risk`, `human_review.required`를 분리한다.
4. NN/g AI explanations article은 다음 실행에서 본문 접근이 안정적으로 되면 role-based AI explanation 기준으로 재판정한다.

## Prompt or Template Patch Candidate

```text
For each stored Growth Scan source, add operational_outcome.diff: what future Dex Company decision, QA gate, approval rule, or handoff behavior improves because this source was stored. Do not treat searched.count, stored.count, or UX activity metrics as outcomes unless they are tied to cost, risk, speed, retention, quality, or user impact.
```

## Questions / Tracking Candidates

- NN/g AI explanations article 본문이 다음 실행에서 안정적으로 열리면 역할별 AI 설명 기준으로 저장할 가치가 있는지 보겠습니다.
- 다음 UX/UI 프로젝트 보고서에서는 `activity.metric`과 `outcome.metric`을 분리하는 템플릿 패치를 적용할 수 있습니다.
- GitHub PR review 자동화 요청이 실제로 들어오면 carried item을 별도 install/security audit로 꺼내겠습니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 07:03, 06:34, 06:03, 05:35 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, W3C, NN/g, Storybook lanes checked |
| Duplicate check | passed | existing source notes/reports/inbox searched before writing |
| Previous deferred rejudgement | passed | no-op rule, GitHub code review, Figma MCP, Threads, W3C ISO signal rejudged |
| Source schema | passed | official lint passed after report creation |
| Status script | passed | `llm-wiki-status.ps1` passed after report creation |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warning(s) |
| UTF-8 scan | passed | edited Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, model switch, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: NN/g article을 저장했지만 실제 Ethan 프로젝트의 downstream business data는 아직 연결되지 않았다.
- Mitigation: source note를 outcome-reporting 기준으로만 저장하고, 실제 수치 적용은 프로젝트별 `not checked`로 분리했다.
- Not checked: live account/runtime availability, full NN/g AI explanations body, ISO standard full text, actual business metrics.
