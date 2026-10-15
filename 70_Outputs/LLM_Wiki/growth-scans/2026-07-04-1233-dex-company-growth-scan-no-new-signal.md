---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan No New Signal - 2026-07-04 12:33 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T12:33:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/"
  - "https://github.blog/changelog/label/copilot/"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/figma-mcp/"
  - "https://www.figma.com/blog/config-2026-recap/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://storybook.js.org/blog/"
  - "https://www.threads.com/"
collectionPurpose: "30분 간격 Growth Scan에서 직전 12:02 no-new-signal 이후 새 공개 신호가 Dex Company 운영 규칙, QA gate, approval rule, handoff behavior, security boundary, reusable eval field를 실제로 바꾸는지 확인한다."
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
---

# Dex Company Growth Scan No New Signal - 2026-07-04 12:33 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 12:33 KST
- 검색 범위: automation memory, current folder, durable growth-scan guidance, automation.toml, Vault AGENTS/role docs/LLM Wiki index/log, recent 12:02/11:34/11:03/10:33 reports, 10x candidate queue, OpenAI Codex/API changelogs, GitHub/GitHub Copilot changelogs, Obsidian changelog, Figma MCP/Config posts, W3C WCAG/WAI pages, NN/g article index, Storybook blog, Threads snippets.
- 실행 초점: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지하고, 같은 공개 자료를 반복 저장하지 않는지 확인했다.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma app, Obsidian setting, token, API key, account connection, cloud resource, billing action, workflow, file deletion, model switch는 설치, 실행, 생성, 연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/보류/차단 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 재판정한 기록이다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 12 |
| stored.count | 0 |
| duplicate.count | 9 |
| deferred.count | 2 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Codex changelog의 Remote Control, DigitalOcean plugin, remote workspace 신호는 기존 원격/credential hygiene 보고서와 중복된다. local Codex app, mobile pairing, DigitalOcean billing, SSH key scope는 이번 실행에서 확인하지 않았다.
2. GitHub Copilot 2026년 7월 changelog 묶음은 usage metrics, CLI token, session streaming, AI credit pools, managed settings, Copilot Vision, browser tools로 이미 최근 source notes와 no-new-signal reports가 다룬 범위다.
3. Figma MCP/Config 2026/Design Agent 신호는 design context와 code-canvas 흐름을 보강하지만, 실제 Figma workspace/file permission, asset export, connector availability, billing/account state는 not checked다.
4. W3C WCAG/WAI와 NN/g 최신 article index는 직전 W3C G73, NN/g outcome/explainability source notes와 연결된다. 새 QA field가 추가되지 않아 별도 source note를 만들지 않았다.
5. Storybook blog와 Threads snippets는 각각 concrete frontend project, stable source text/cross-check가 있어야 한다. 이번 실행에서는 project-specific 또는 source-weak로 유지했다.

## Stored / Absorbed Sources

- source note: 없음.
- wiki note: 없음.
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1233-dex-company-growth-scan-no-new-signal.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/ | 변경 없음 |
| wiki/ | 변경 없음 |
| index.md | 이번 no-new-signal report 링크 추가 |
| log.md | 12:33 scheduled growth scan 이력 추가 |
| candidate queue | 직접 수정 없음. `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, total candidates=95 유지 |
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
| OpenAI Codex changelog | OpenAI official changelog + existing remote/DigitalOcean notes | duplicate/no-new-signal | high |
| OpenAI API changelog | OpenAI official API changelog + existing billing/model notes | duplicate-source | high |
| GitHub Copilot July changelog | GitHub official changelog + existing usage/session/vision/browser/AI credit notes | duplicate-source | high |
| Obsidian changelog | Obsidian official changelog + existing CLI/Bases/cleanup notes | duplicate-source | high |
| Figma MCP tag and Config 2026 | Figma official blog + existing Figma MCP/agent/design-system notes | duplicate-with-caveat | medium |
| W3C WCAG/WAI update | W3C official pages + existing WCAG/WAI/G73 notes | duplicate-source | high |
| NN/g article index | NN/g official index + existing UX outcome/explainability notes | duplicate-source | high |
| Storybook blog/performance lane | Storybook official blog + existing Storybook 9/10/Vitest/a11y notes | deferred/project-specific | medium |
| Threads snippets | public snippets only | deferred/source-weak | low |
| X | automation rule excludes X | blocked | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| Figma MCP / Design Agent / code layers workflow | carried/account-adjacent | No | prompt injection through design context, sensitive information disclosure, connector overreach, insecure output handling, billing/account ambiguity |
| GitHub Copilot browser/code-review/agent workflows | carried/project-specific | No | excessive agency, PR/web prompt injection, repository secret exposure, overreliance, billing surprise |
| Storybook agent setup/minimal install pattern | deferred/project-specific | No | supply-chain drift, dependency script risk, lockfile change, generated-test overreliance |

## Duplicate / Rejected / Deferred

- duplicate-source: OpenAI Codex/API current changelogs, GitHub Copilot July governance/session/vision/browser/model/billing items, Obsidian changelog, W3C WCAG/WAI, NN/g latest AI/UX articles.
- duplicate-with-caveat: Figma MCP/Config/Design Agent posts. 실제 연결 전에는 `workspace.permission`, `file.sensitivity`, `asset_export.scope`, `design_token.source`, `human_review.required`, `WCAG.anchor`, `account_or_billing.not_checked`를 요구한다.
- deferred/project-specific: Storybook performance/minimal install. 실제 frontend repo에서 Storybook 도입/업그레이드가 생기면 dependency delta, lockfile delta, CI runtime, browser QA, a11y test scope, rollback path로 재평가한다.
- deferred/source-weak: Threads snippets. 안정적인 원문, 작성자 맥락, 공식/문서 교차 검증 없이는 source-backed 지식으로 승격하지 않는다.
- blocked: X는 자동화 규칙상 검색 대상에서 제외한다.

## Failure / Blocked / Not Checked

- OpenAI/GitHub/Figma/Obsidian account plan, organization policy, billing, connector settings, local app versions, runtime availability는 확인하지 않았다.
- Figma MCP, GitHub Copilot browser tools, Storybook package, Obsidian setting, SDK, MCP server, connector는 설치하거나 실행하지 않았다.
- Threads는 검색 snippet 수준만 확인했고 full-context extraction 또는 author provenance를 source-backed로 확정하지 않았다.
- WCAG/WAI 자료는 QA anchor이며, 현재 특정 UI/PDF/chart artifact가 접근성 기준을 통과했다는 증거는 아니다.

## Cross Verification Evidence

- OpenAI 항목은 공식 Codex/API changelog와 기존 OpenAI remote/API billing/model source notes를 대조했다.
- GitHub 항목은 공식 GitHub changelog label/month pages와 기존 Copilot usage metrics, CLI token/billing, session streaming, AI credit pools, browser tools, vision notes를 대조했다.
- Figma 항목은 공식 Figma MCP tag/Config posts와 기존 Figma Design Agent, Figma agent skills, Config 2026, approval-ready install audit notes를 대조했다.
- W3C/NN-g/Storybook 항목은 공식 WCAG/WAI, NN/g article index, Storybook blog와 기존 WCAG/G73, NN/g outcome/explainability, Storybook 9/10/Vitest/a11y notes를 대조했다.
- Local duplicate search는 `30_Knowledge/LLM_Wiki`와 `00_Inbox/LLM_Wiki`에서 DigitalOcean plugin, Copilot CLI Actions, session streaming, Storybook bloat, WCAG Evaluation Methodology, Figma MCP practical, Threads 키워드로 수행했다.

## Ethan Can Use This Immediately

- 지금은 새 자료를 더 저장하기보다 기존 notes를 실제 작업 체크리스트로 쓰시면 됩니다. 예를 들어 Figma MCP를 요청하실 때는 기능 소개보다 `workspace.permission`, `file.sensitivity`, `asset_export.scope`, `human_review.required`, `WCAG.anchor`를 먼저 채우면 됩니다.
- GitHub Copilot/Actions 계열 자동화는 PAT가 줄어도 끝이 아닙니다. `credential.source`, `workflow.trigger.risk`, `permissions`, `billing.owner`, `session.limit`, `safe_outputs`, `rollback.path`가 있어야 승인 검토가 가능합니다.
- UI/PDF/chart 산출물은 W3C G73/WCAG notes를 기준으로 `long_description.link`, `description.equivalence`, `return.path`, `human_review.required`를 QA_REPORT에 넣는 방식으로 바로 적용할 수 있습니다.

## Improvement Delta

- 직전 12:02 no-new-signal discipline을 유지했다. 새 링크가 보여도 `existing_coverage.note`와 `operational_scope.diff`가 없으면 source note를 만들지 않았다.
- Threads를 discovery-only로 다시 분리했다. snippet은 관심 신호일 수 있지만 LLM Wiki source-backed 자료가 아니다.
- Figma MCP/Config 계열은 "쓸 수 있다"가 아니라 account/runtime/billing/permission not-checked가 붙은 approval packet 후보로만 유지했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 기준을 지켰다.
- done: 반복 공식 changelog/blog item에 `existing_coverage.note`와 `operational_scope.diff` 기준을 적용했다.
- done: visual/PDF/chart source는 기존 WCAG/G73 coverage보다 concrete QA field가 늘 때만 저장한다는 기준을 적용했다.
- carried: GitHub code review MCP/agent skills는 active repo PR workflow가 있을 때 재평가한다.
- carried: Figma MCP/Agent connector는 approved workspace/file/asset-export context가 있을 때 재평가한다.
- carried: Storybook performance/minimal install은 concrete frontend project context가 있을 때 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done | stored.count=0, report/index/log/memory only |
| GitHub code review MCP/agent skills | carried/project-specific | carried | no active repo PR workflow exists |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | official signal exists, but approved connector/file/workspace context is absent |
| Threads snippets | discovery-only | carried/source-weak | stable text and cross-check still insufficient |
| Storybook bloat/performance | deferred/project-specific | carried | no concrete Storybook adoption/upgrade context |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. If no new official/high-provenance source changes a Dex Company operating rule, create only a short no-op report.
3. For Figma/GitHub/OpenAI account-adjacent features, do not report local usability without live OS/account/plan/runtime verification.
4. For frontend performance/tooling sources, revisit only when a concrete project has dependency delta, lockfile delta, CI runtime, browser QA, a11y test scope, and rollback path.

## Prompt or Template Patch Candidate

```text
For repeated 30-minute Growth Scan runs, do not treat repeated official product posts, changelog lines, or social snippets as new knowledge unless `operational_scope.diff` changes a Dex Company QA gate, approval rule, handoff behavior, security boundary, or reusable eval field. Keep account/runtime/billing/permission state as `not checked` unless directly verified.
```

## Questions / Tracking Candidates

- 실제 Figma MCP 연결 요청이 오면 approval packet에 `workspace.permission`, `asset_export.scope`, `file.sensitivity`, `billing/account policy`, `human_review.required`, `rollback.path`를 먼저 채운다.
- GitHub PR review automation 요청이 실제 repository에서 열리면 code review MCP/agent skills carried item을 install/security audit로 전환한다.
- Storybook 도입/업그레이드 요청이 생기면 Storybook bloat/performance source를 dependency QA 기준으로 다시 판정한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Growth-scan guidance checked | passed | durable growth-scan guidance read |
| Durable automation prompt checked | passed-with-warning | `automation.toml` checked; prompt text shows mojibake, but active user prompt and memory are readable |
| Vault operating docs checked | passed-with-warning | AGENTS/role docs/LLM Wiki docs checked; some existing console reads show mojibake |
| Recent reports checked | passed | 12:02, 11:34, 11:03, 10:33 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, W3C, NN-g, Storybook, Threads lanes checked |
| Duplicate check | passed | existing source notes/reports/index/log/inbox searched before writing |
| Previous deferred rejudgement | passed | no-op rule, GitHub code review, Figma MCP, Threads, Storybook performance rejudged |
| Queue count | passed | direct queue count: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, total 95 |
| Source schema | passed | no new source notes created; report schema checked by lint |
| Status script | passed | `llm-wiki-status.ps1` passed after report creation |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warning(s) after report creation |
| UTF-8 scan | passed | edited Markdown files had U+FFFD replacement count 0 |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, model switch, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: repeated no-op runs can hide a genuinely new signal if search narrows too much.
- Mitigation: checked official OpenAI/GitHub/Obsidian/Figma/W3C/NN-g/Storybook lanes plus Threads snippets, then compared against source notes, reports, index, log, inbox, and the queue.
- Not checked: live account/runtime availability, connector behavior, cloud billing, GitHub/Figma org policy, Threads full-context extraction, Storybook runtime install, actual UI/PDF/chart conformance.
