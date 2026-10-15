---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan No New Signal - 2026-07-04 14:02 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T14:02:29+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/label/copilot/"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://www.figma.com/blog/the-figma-agent-is-here/"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.w3.org/WAI/policies/australia/"
  - "https://www.nngroup.com/articles/"
  - "https://www.nngroup.com/articles/crafting-ai-explanations/"
  - "https://storybook.js.org/blog/"
  - "https://storybook.js.org/blog/storybook-bloat-fixed/"
  - "https://www.threads.com/"
collectionPurpose: "30분 간격 Growth Scan에서 직전 13:33 no-new-signal 보고서와 14:00 weekly synthesis 이후 새 공개 신호가 Dex Company 운영 규칙, QA gate, 승인 기준, handoff 방식, 보안 경계, reusable eval field를 실제로 바꾸는지 확인한다."
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

# Dex Company Growth Scan No New Signal - 2026-07-04 14:02 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 14:02 KST
- 검색 범위: automation memory, current folder, growth-scan skill guidance, automation.toml, Vault AGENTS/role/LLM Wiki operating docs, LLM Wiki index/log/improvement model, weekly synthesis, recent 13:33/13:03/12:33 reports, 10x candidate queue, OpenAI Codex/API changelog, GitHub July/Copilot changelog, Obsidian changelog, Figma Agent/skills/MCP posts, W3C WCAG/WAI/policies pages, NN/g article index, Storybook blog/performance post, Threads snippets.
- 실행 초점: 14:00 weekly synthesis가 이미 47개 성장 스캔 보고서를 작업별 체크리스트로 정리했으므로, 이번 실행은 새 source note를 늘리기보다 `existing_coverage.note`와 `operational_scope.diff` 기준을 다시 적용했다.
- 제외: package, SDK, MCP server, connector, browser extension, GitHub/Figma app, Obsidian setting, token, API key, account connection, cloud resource, billing action, workflow, model switch, file deletion은 설치, 실행, 연결, 생성하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체 복사가 아니라 공개 URL, 확인 범위, 중복/보류/차단 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 판정한 기록이다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 13 |
| stored.count | 0 |
| duplicate.count | 9 |
| deferred.count | 3 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. 14:00 weekly synthesis가 이미 47개 성장 스캔 보고서를 작업별 체크리스트로 정리했다. 다음 작업에서는 새 자료 검색보다 `Dex Company Task Checklists from Growth Scans`를 먼저 여는 편이 더 실무적이다.
2. OpenAI Codex/API changelog는 Remote Control, DigitalOcean plugin, container billing, model/tool 변화 같은 기존 source note 범위와 겹친다. 로컬 앱 버전, 계정 플랜, billing, DigitalOcean 권한은 이번 실행에서 직접 확인하지 않았다.
3. GitHub July/Copilot changelog의 Copilot usage metrics, CLI Actions, session streaming, AI credit pools, managed settings, Copilot Vision, browser tools는 기존 GitHub governance/source notes보다 새 승인 필드를 추가하지 않았다.
4. Figma Agent skills, Design Agent, MCP posts는 팀 skill, custom tools, live data, design-to-code loop를 강화하지만, 기존 approval-ready packet의 `workspace.permission`, `file.sensitivity`, `asset_export.scope`, `human_review.required`, `account_or_billing.not_checked` 기준을 바꾸지는 않았다.
5. W3C Australia policies page는 최근 갱신 신호로 보였지만, 기존 W3C laws/policies note가 이미 `policy.region`, `policy.last_checked`, `legal.not_advice` 분리를 담고 있어 새 source note로 저장하지 않았다.

## Stored / Absorbed Sources

- source note: 없음.
- wiki note: 없음.
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-1402-dex-company-growth-scan-no-new-signal.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/ | 변경 없음 |
| wiki/ | 변경 없음 |
| index.md | 이번 no-new-signal report 링크 추가 |
| log.md | 14:02 scheduled growth scan 이력 추가 |
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
| Weekly synthesis | local weekly synthesis report + index/log | source-backed local artifact | high |
| OpenAI Codex changelog | OpenAI official changelog + existing Codex source notes | duplicate/no-new-signal | high |
| OpenAI API changelog | OpenAI official API changelog + existing billing/model/tool notes | duplicate-source | high |
| GitHub July/Copilot changelog | GitHub official month/label pages + existing GitHub governance notes | duplicate-source | high |
| Obsidian changelog | Obsidian official changelog + existing Obsidian CLI/Bases/cleanup notes | duplicate-source | high |
| Figma Agent skills / Design Agent / MCP | Figma official posts + existing Figma approval-ready notes | duplicate/account-adjacent | medium |
| W3C WCAG/WAI/policies | W3C official pages + existing WCAG/G73/laws notes | duplicate-source | high |
| NN/g AI explainability / article index | NN/g official pages + existing explainability/outcome notes | duplicate-source | high |
| Storybook blog / bloat fixed | Storybook official blog + existing Storybook 9/Vitest/a11y notes | deferred/project-specific | medium |
| Threads snippets | public search snippets only | deferred/source-weak | low |
| X | automation rule excludes X | blocked | high |

## Source-Backed / Dex Inference / Not Checked

- source-backed: OpenAI, GitHub, Obsidian, Figma, W3C, NN/g, Storybook public pages and local LLM Wiki reports/index/log/queue were checked before storage decisions.
- Dex inference: 14:00 weekly synthesis shifts the next useful step from more collection to task-time checklist adoption. That is an operating inference, not proof that every checklist is complete for every future project.
- not checked: live account plans, organization policies, local app versions, connector availability, cloud billing, Figma workspace permissions, GitHub repo settings, Storybook runtime install, Threads full-context extraction, actual UI/PDF/chart conformance. Official status/lint scripts ran successfully but reported `D:\OneDrive\ObsidianVault` as their target, so the actual `D:\VibeProject\ObsidianVault\ObsidianVault` edits were also checked with fallback schema and UTF-8 scans.

## Approval Decisions / Install Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| Figma Agent skills / MCP / Design Agent | approval-not-ready, account-adjacent | No | sensitive information disclosure, prompt injection through design files, connector overreach, insecure output handling, overreliance |
| GitHub Copilot browser/code-review/agent workflows | approval-not-ready, project-specific | No | excessive agency, repository prompt injection, secret exposure, billing surprise, overreliance |
| Storybook minimal/performance install pattern | deferred/project-specific | No | supply-chain drift, dependency script risk, lockfile change, generated-test overreliance |
| Threads social signals | discovery-only | No | source spoofing, low provenance, overreliance on snippets |

## Duplicate / Rejected / Deferred

- duplicate-source: OpenAI Codex/API changelogs, GitHub July Copilot/GitHub items, Obsidian changelog, W3C WCAG/WAI/policies, NN/g AI explainability.
- duplicate/account-adjacent: Figma Agent/MCP posts. 공식 신호는 있지만 실제 workspace, file permission, asset export, billing, connector availability가 직접 확인되지 않았다.
- deferred/project-specific: Storybook bloat/performance. 실제 frontend repo, dependency delta, lockfile delta, CI runtime, browser QA, a11y test scope, rollback path가 있을 때만 다시 평가한다.
- deferred/source-weak: Threads snippets. 안정적인 원문, 작성자 맥락, 공식/GitHub/RSS 교차검증이 부족하다.
- blocked: X는 자동화 규칙상 검색 대상에서 제외한다.

## Failure / Blocked / Not Checked

- OpenAI/GitHub/Figma/Obsidian live account plan, organization policy, billing, connector settings, local app versions, runtime availability는 확인하지 않았다.
- Figma MCP, GitHub Copilot browser tools, Storybook package, Obsidian setting, MCP server, SDK, connector는 설치하거나 실행하지 않았다.
- Threads는 snippet 수준으로만 확인되어 source-backed evidence로 승격하지 않았다.
- W3C/WCAG sources are QA anchors, not evidence that a current artifact passes accessibility testing.

## Cross Verification Evidence

- OpenAI 항목은 official Codex/API changelog와 기존 Codex remote, DigitalOcean, API billing/model/tool notes를 대조했다.
- GitHub 항목은 official GitHub month/Copilot changelog와 기존 Copilot usage metrics, CLI token/billing, session streaming, AI credits, Issue Fields, Vision, browser tools notes를 대조했다.
- Figma 항목은 official Agent skills, Design Agent, MCP posts와 기존 Figma Agent/MCP/Config/approval-ready notes를 대조했다.
- W3C/NN-g/Storybook 항목은 official WAI/WCAG/policies, NN/g article pages, Storybook blog와 기존 source notes/reports를 대조했다.
- Local duplicate search는 `30_Knowledge/LLM_Wiki`, `00_Inbox/LLM_Wiki`, `70_Outputs/LLM_Wiki`, index/log/queue에서 수행했다.

## Ethan Can Use This Immediately

- 새 자료를 찾기 전에 `Dex Company Task Checklists from Growth Scans`에서 작업 유형별 체크리스트를 먼저 열어 보시면 됩니다. 예: frontend 작업이면 target repo, WCAG anchor, browser QA, Storybook 조건부 여부를 먼저 확인합니다.
- Figma/GitHub agent 기능을 쓰고 싶을 때는 기능 소개를 승인 근거로 보지 말고 `workspace.permission`, `repository.permission`, `asset_export.scope`, `billing/account policy`, `human_review.required`, `rollback.path`부터 채우시면 됩니다.
- UI/PDF/chart QA에서는 Copilot Vision/Figma Agent 결과를 접근성 통과 증거로 보지 말고 W3C G73/WCAG notes에 맞춰 long description, equivalent information, return path를 별도 확인하시면 됩니다.

## Improvement Delta

- 14:00 weekly synthesis를 새 운영 기준으로 채택했다. 앞으로 steady-state Growth Scan은 새 링크 축적보다 작업별 체크리스트 사용 여부를 확인하는 쪽이 더 가치 있다.
- `existing_coverage.note`와 `operational_scope.diff` 기준을 유지했다. 반복 공식 발표라도 QA gate, approval rule, handoff behavior, security boundary, reusable eval field가 바뀌지 않으면 저장하지 않는다.
- W3C 국가별 정책 갱신 신호도 기존 laws/policies note로 충분하면 duplicate-source로 처리한다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 기준을 직접 queue table count로 확인했다.
- done: no-new-signal discipline을 유지해 새 source note를 만들지 않았다.
- done: account/runtime/billing/permission state를 직접 확인하지 않았으므로 `not checked`로 남겼다.
- done: weekly synthesis 이후에는 task-checklist adoption을 다음 운영 기준으로 삼는다.
- carried: GitHub code review MCP/agent skills는 active repo PR workflow가 있을 때 재평가한다.
- carried: Figma MCP/Agent connector는 approved workspace/file/asset-export context가 있을 때 재평가한다.
- carried: Storybook performance/minimal install은 concrete frontend project context가 있을 때 재평가한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done | stored.count=0, report/index/log/memory only |
| Weekly synthesis adoption | new local artifact | done | 14:00 synthesis exists and is linked in index/log |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | official posts exist, but approved connector/file/workspace context is absent |
| GitHub code review MCP/agent skills | carried/project-specific | carried | no active repo PR workflow exists |
| Threads snippets | discovery-only | carried/source-weak | stable text and cross-check still insufficient |
| Storybook bloat/performance | deferred/project-specific | carried | no concrete Storybook adoption/upgrade context |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`.
2. If no new official/high-provenance source changes a Dex Company operating rule, create only a short no-op report.
3. In the next real task, verify whether the relevant section of `Dex Company Task Checklists from Growth Scans` was consulted before adding more source notes.
4. For frontend/design-system/tooling sources, revisit only when a concrete project has dependency delta, lockfile delta, CI runtime, browser QA, a11y test scope, and rollback path.

## Prompt or Template Patch Candidate

```text
After the weekly Growth Scan synthesis exists, steady-state runs should first check whether the synthesized task checklist changes the next operating action. Do not create new source notes for repeated official posts, changelog lines, or social snippets unless `existing_coverage.note` is absent and `operational_scope.diff` changes a Dex Company QA gate, approval rule, handoff behavior, security boundary, or reusable eval field.
```

## Questions / Tracking Candidates

- 다음 실제 frontend, MCP, GitHub, Figma, career ops 작업에서 weekly synthesis의 해당 체크리스트가 먼저 호출되는지 확인한다.
- Figma MCP 연결 요청이 오면 approval packet의 workspace/file/asset-export/billing/rollback 필드를 먼저 채운다.
- Storybook 도입/업그레이드 요청이 생기면 bloat/performance source를 dependency QA 기준으로 다시 평가한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Growth-scan guidance checked | passed | durable growth-scan memory skill read |
| Durable automation prompt checked | passed-with-warning | `automation.toml` checked; console text shows mojibake but active prompt and memory are readable |
| Vault operating docs checked | passed-with-warning | AGENTS/role/LLM Wiki docs checked; some existing console reads show mojibake |
| Recent reports checked | passed | 13:33, 13:03, 12:33 reports plus weekly synthesis and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, W3C, NN-g, Storybook, Threads lanes checked |
| Duplicate check | passed | existing source notes/reports/index/log/inbox searched before writing |
| Previous deferred rejudgement | passed | no-op rule, weekly synthesis, Figma MCP, GitHub code review, Threads, Storybook performance rejudged |
| Queue count | passed | direct queue table count: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, total 95 |
| Source schema | passed | no new source notes created; fallback report schema check returned `REPORT_SCHEMA_OK` |
| Status script | passed-with-warning | `llm-wiki-status.ps1` passed, but script output targeted `D:\OneDrive\ObsidianVault`, not the edited `D:\VibeProject\ObsidianVault\ObsidianVault` path |
| Lint script | passed-with-warning | `llm-wiki-lint.ps1` passed with 0 warning(s), but script output targeted `D:\OneDrive\ObsidianVault`; fallback checks covered the edited files |
| UTF-8 scan | passed | edited Markdown files had U+FFFD replacement count 0 |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, model switch, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: repeated no-op reports can still hide a genuinely new signal if search narrows too much; official status/lint scripts also point at `D:\OneDrive\ObsidianVault`, so script success alone is not enough for the edited Vault path.
- Mitigation: checked official OpenAI/GitHub/Obsidian/Figma/W3C/NN-g/Storybook lanes plus Threads snippets, then compared against source notes, reports, index, log, inbox, weekly synthesis, and queue; ran fallback schema and UTF-8 checks on the actual edited files.
- Not checked: live account/runtime availability, connector behavior, cloud billing, GitHub/Figma org policy, Threads full-context extraction, Storybook runtime install, actual UI/PDF/chart conformance.
