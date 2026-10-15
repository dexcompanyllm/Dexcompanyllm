---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan No New Signal - 2026-07-04 12:02 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T12:02:36+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://github.blog/changelog/label/copilot/"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.figma.com/blog/config-2026-recap/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://storybook.js.org/blog/storybook-bloat-fixed/"
  - "https://www.threads.com/"
collectionPurpose: "30분 간격 Growth Scan에서 직전 11:34 W3C G73 흡수 이후 새 공개 신호가 Dex Company 운영 규칙, QA gate, approval rule, handoff behavior, security boundary, reusable eval field를 실제로 바꾸는지 확인한다."
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

# Dex Company Growth Scan No New Signal - 2026-07-04 12:02 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 12:02 KST
- 검색 범위: automation memory, current folder, durable growth-scan guidance, automation.toml, Vault operating docs, LLM Wiki index/log/improvement guide, recent 11:34/11:03/10:33/10:03 reports, 10x candidate queue, OpenAI Codex changelog, GitHub Copilot/GitHub July changelog, Obsidian changelog, Figma MCP/Config posts, W3C WCAG/WAI pages, NN/g article index, Storybook performance post, Threads snippets.
- 실행 초점: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지하고, 직전 G73 source note 이후 같은 자료를 중복 저장하지 않는지 확인한다.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma app, Obsidian setting, token, API key, account connection, cloud resource, billing action, model switch, workflow, file deletion은 설치, 실행, 연결, 생성하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 URL, 확인 범위, 중복/보류/차단 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 판정한 기록이다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 11 |
| stored.count | 0 |
| duplicate.count | 8 |
| deferred.count | 2 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Codex changelog의 Remote Control, DigitalOcean plugin, remote workspace 신호는 기존 Codex remote/cloud approval notes에 이미 흡수되어 있었다. 이번 실행에서는 local app version, account plan, DigitalOcean billing, SSH/key scope를 확인하지 않았으므로 새 source note로 승격하지 않았다.
2. GitHub July 2026 Copilot 항목은 usage metrics, auto model selection, browser tools, vision, GitHub Models retirement 등 기존 GitHub governance/source notes와 겹친다. 새 운영 규칙 변경은 없었다.
3. Figma MCP practical examples와 Config 2026 신호는 기존 Figma agent/MCP/design-system/source notes와 approval-ready install audit 모델이 이미 다룬다. 실제 workspace, file permission, asset export, connector availability는 not checked다.
4. W3C WCAG/WAI와 직전 G73 source note는 visual/PDF/chart QA 기준으로 이미 반영되었다. 새 접근성 source는 만들지 않고, 다음 실제 UI/PDF 산출물에서 G73-style check를 적용하는 과제로 유지한다.
5. Storybook bloat/performance와 Threads snippets는 각각 project-specific, source-weak 상태다. 구체적인 frontend repo나 안정적인 원문/교차검증 없이 저장하지 않았다.

## Stored / Absorbed Sources

- source note: 없음.
- wiki note: 없음.
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1202-dex-company-growth-scan-no-new-signal.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/ | 변경 없음 |
| wiki/ | 변경 없음 |
| index.md | 이번 no-new-signal report 링크 추가 |
| log.md | 12:02 scheduled growth scan 이력 추가 |
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
| OpenAI Codex changelog | OpenAI official changelog + existing Codex remote notes | duplicate/no-new-signal | high |
| GitHub Copilot July changelog | GitHub official changelog + existing governance/browser/vision/model notes | duplicate-source | high |
| Obsidian changelog | Obsidian official changelog + existing CLI/Bases/cleanup notes | duplicate-source | high |
| Figma MCP practical examples | Figma official blog + existing Figma MCP/agent notes | duplicate/account-adjacent | medium |
| Figma Config 2026 | Figma official blog + existing Figma Config/motion handoff notes | duplicate-source | medium |
| W3C WCAG/WAI/G73 | W3C official pages + existing WCAG/WAI/G73 notes | duplicate-source | high |
| NN/g article index | NN/g official index + existing AI critique/explainability/outcome notes | duplicate-source | high |
| Storybook bloat/performance | Storybook official blog + existing Storybook 9/Vitest/a11y notes | deferred/project-specific | medium |
| Threads snippets | public snippets only | deferred/source-weak | low |
| X | automation rule excludes X | blocked | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM Risk |
|---|---|---:|---|
| Figma MCP / Agent connector workflow | carried/account-adjacent | No | sensitive information disclosure, prompt injection through design context, connector overreach, insecure output handling |
| GitHub Copilot browser/code-review/agent workflows | carried/project-specific | No | excessive agency, prompt injection through web/PR content, sensitive information disclosure, overreliance |
| Storybook minimal/performance install pattern | deferred/project-specific | No | supply-chain drift, dependency script risk, lockfile change, overreliance on generated tests |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: OpenAI Codex changelog, GitHub Copilot July governance/browser/vision/model/billing items, Obsidian changelog, Figma Config/MCP/Agent posts, W3C WCAG/WAI/G73, NN/g AI/UX article index.
- deferred/project-specific: Storybook bloat/performance. 실제 Storybook 도입/업그레이드가 있을 때 dependency delta, lockfile delta, CI runtime, a11y test scope, browser QA, rollback path로 재평가한다.
- deferred/source-weak: Threads snippets. 로그인/anti-bot/rate-limit 환경을 우회하지 않고, 안정적인 원문과 교차 검증이 없으면 source-backed로 올리지 않는다.
- blocked: X는 자동화 규칙상 검색 대상에서 제외한다.

## Failure / Blocked / Not Checked

- OpenAI/GitHub/Figma/Obsidian account plan, organization policy, billing, connector settings, local app versions, runtime availability는 확인하지 않았다.
- Figma MCP, GitHub Copilot browser tools, Storybook package, Obsidian setting, MCP server, SDK, connector는 설치하거나 실행하지 않았다.
- Threads full-context extraction은 수행하지 않았고, snippet은 source-backed evidence로 승격하지 않았다.
- 직전 G73 기준은 QA method일 뿐이며, 현재 실제 UI/PDF/chart artifact의 WCAG conformance는 not checked다.

## Cross Verification Evidence

- OpenAI 항목은 공식 Codex changelog와 기존 `openai-codex-remote-connections-digitalocean-plugin` source note를 대조했다.
- GitHub 항목은 공식 GitHub changelog label/month pages와 기존 Copilot usage metrics, auto model selection, browser tools, vision, GitHub Models retirement notes를 대조했다.
- Figma 항목은 공식 Figma blog와 기존 Figma Design Agent, Figma agent skills, Config 2026, approval-ready install audit notes를 대조했다.
- W3C/NN-g/Storybook 항목은 공식 WAI/WCAG pages, NN/g index, Storybook blog와 기존 source notes/reports를 대조했다.
- Local duplicate search는 `30_Knowledge/LLM_Wiki`와 `00_Inbox/LLM_Wiki`에서 browser tools, Figma MCP, G73, Storybook bloat, AI-era critique, OpenAI remote, GitHub model/governance 키워드로 수행했다.

## Ethan Can Use This Immediately

- 지금은 새 자료를 더 저장하기보다 기존 source notes를 실제 작업 체크리스트에 연결하시면 됩니다. 예: UI/PDF 산출물에는 `WCAG.anchor`, `long_description.link`, `description.equivalence`, `return.path`, `human_review.required`를 QA 항목으로 넣습니다.
- Figma MCP나 GitHub Copilot browser/code-review를 쓰고 싶을 때는 기능 소개가 아니라 `workspace.permission`, `repository.permission`, `asset_export.scope`, `billing/account policy`, `rollback.path`가 채워진 approval packet부터 만드시면 됩니다.
- Storybook 성능/최소 설치는 독립 지식으로 추가하지 말고, 실제 frontend repo에서 lockfile과 CI 시간이 바뀌는 순간에만 실사 후보로 올리면 됩니다.

## Improvement Delta

- 직전 G73 흡수 이후에는 no-new-signal discipline으로 복귀했다.
- 반복 공식 발표는 `existing_coverage.note`와 `operational_scope.diff`가 없으면 저장하지 않는 기준을 적용했다.
- AI/browser/vision/MCP 기능은 local runtime/account availability와 public documentation을 계속 분리했다.

## Adoption Check

- done: 직전 Next Eval의 "visual/PDF/chart source는 concrete QA field 또는 test method가 추가될 때만 저장" 기준을 적용했다. 이번에는 추가 field가 없어 저장하지 않았다.
- done: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 상태를 직접 queue count로 확인했다.
- done: 반복 공식 changelog/blog 신호에 대해 `existing_coverage.note`와 `operational_scope.diff` 기준을 적용했다.
- carried: GitHub code review MCP/agent skills는 active repo PR workflow가 있을 때 재평가한다.
- carried: Figma MCP/Agent connector는 approved workspace/file/asset-export context가 있을 때 재평가한다.
- carried: Storybook performance/minimal install은 concrete frontend project context가 있을 때 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done | stored.count=0, report/index/log/memory only |
| GitHub code review MCP/agent skills | carried/project-specific | carried | no active repo PR workflow exists |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | no approved connector/file/workspace context |
| Threads snippets | discovery-only | carried/source-weak | stable text and cross-check still insufficient |
| Storybook bloat/performance | deferred/project-specific | carried | no concrete Storybook adoption/upgrade context |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. If no new official/high-provenance source changes a Dex Company operating rule, create only a short no-op report.
3. For visual/PDF/chart/AI vision sources, store only if they add a concrete QA field or test method beyond existing WCAG/G73 coverage.
4. For account-adjacent tools, require account/runtime/billing/permission not-checked fields before making any usability claim.

## Prompt or Template Patch Candidate

```text
For repeated official product announcements in Growth Scan, require `existing_coverage.note` and `operational_scope.diff`. If the source does not change a Dex Company QA gate, approval rule, handoff behavior, security boundary, or reusable eval field, classify it as duplicate/no-new-signal. For visual/PDF/chart/AI-vision items, do not create another source note unless it adds a concrete test method beyond existing WCAG/G73 coverage.
```

## Questions / Tracking Candidates

- 다음 실제 frontend/dashboard/portfolio QA에서 G73-style long-description check를 `QA_REPORT.md`에 넣을지 확인한다.
- Figma MCP 연결 요청이 실제 파일과 함께 오면 approval packet부터 작성한다.
- GitHub PR review 자동화 요청이 실제 repo에서 열리면 code review MCP/agent skills carried item을 install/security audit로 전환한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Growth-scan guidance checked | passed | durable growth-scan skill guidance read |
| Durable automation prompt checked | passed | `automation.toml` checked |
| Vault operating docs checked | passed-with-warning | AGENTS/role docs/LLM Wiki docs checked; console read showed mojibake in some existing files, so edited files were UTF-8 validated |
| Recent reports checked | passed | 11:34, 11:03, 10:33, 10:03 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, W3C, NN-g, Storybook, Threads lanes checked |
| Duplicate check | passed | existing source notes/reports/index/log/inbox searched before writing |
| Previous deferred rejudgement | passed | no-op rule, GitHub code review, Figma MCP, Threads, Storybook performance rejudged |
| Queue count | passed | direct queue count: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, total 95 |
| Source schema | passed | official lint passed after report creation |
| Status script | passed | `llm-wiki-status.ps1` passed after report creation |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warning(s) after report creation |
| UTF-8 scan | passed | edited Markdown files had U+FFFD replacement count 0 |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, model switch, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: repeated no-op reports can hide a real source if search narrows too much.
- Mitigation: checked official OpenAI/GitHub/Obsidian/Figma/W3C/NN-g/Storybook lanes plus Threads snippets, then compared against source notes, recent reports, index, log, inbox, and the queue.
- Not checked: live account/runtime availability, connector behavior, billing, org policies, screen reader behavior, actual UI/PDF/chart conformance, Threads full-context extraction.
