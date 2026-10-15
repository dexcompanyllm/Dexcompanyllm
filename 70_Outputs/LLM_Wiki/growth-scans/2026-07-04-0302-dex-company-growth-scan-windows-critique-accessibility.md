---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Windows Critique Accessibility - 2026-07-04 03:02 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T03:02:16+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/cli"
  - "https://developers.openai.com/codex/changelog"
  - "https://www.nngroup.com/articles/ai-era-critique/"
  - "https://www.w3.org/WAI/policies/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
collectionPurpose: "Dex Company의 Windows Codex 실행 경계, AI 디자인 critique, 접근성 정책 QA 필드를 최신 공개 출처로 보강한다."
confidence: medium
claimType: historical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - automation
---

# Dex Company Growth Scan Windows Critique Accessibility - 2026-07-04 03:02 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 03:02 KST
- 검색 범위: automation memory, 현재 작업 폴더, Vault AGENTS/role docs/LLM Wiki guide/index/log/improvement model, 최근 02:34/02:01/01:34/01:03 보고서, 10x candidate queue, OpenAI Codex CLI/changelog/models/security docs, GitHub changelog, Obsidian changelog, Storybook blog, Figma blog, NN/g articles, W3C WAI/WCAG, Threads public search snippets.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지. 새 저장은 기존 source note가 직접 커버하지 않는 공식/고신뢰 운영 신호로 제한했다.
- 제외: Codex CLI, SDK, plugin, security scan, package install, GitHub issue action, Figma connector, browser extension, external account, API key, token, workflow, cloud resource를 설치/실행/연결/생성하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고, 공개 출처 URL, 확인 범위, 저장/중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습"한 것이 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 12 |
| stored.count | 3 |
| duplicate.count | 6 |
| deferred.count | 2 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Codex CLI 공식 문서는 Windows에서 PowerShell native 실행과 WSL2 경계를 분리한다. Dex Company Windows 작업은 `runtime.os`, `shell.surface`, `sandbox.mode`, `codex.version`, `install.source`를 명시해야 한다.
2. Codex changelog의 WebSocket trace payload fix는 자동화 로그가 민감한 요청 payload를 담을 수 있다는 실무 리스크를 보여준다. 다음 보안/자동화 보고서에는 `sensitive_log.risk`와 `version.fixed_in`을 남기는 편이 맞다.
3. NN/g의 AI 시대 design critique 자료는 AI가 디자인 산출을 빠르게 만들수록 사용자 이해, 좋은 결과의 기준, critique evidence를 QA에 남겨야 한다는 기준을 준다.
4. W3C WAI accessibility laws and policies index는 WCAG 기준과 지역별 법·정책 확인을 분리해야 함을 보여준다. 접근성 QA는 `WCAG 2.2`와 `policy.region`, `policy.last_checked`, `legal.not_advice`를 함께 기록해야 한다.
5. Threads 검색은 Obsidian/LLM Wiki 운영 신호를 다시 보여줬지만, 공개 snippet 중심이라 이번에도 source-backed 지식으로 승격하지 않았다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-cli-windows-setup.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-nngroup-ai-era-design-critique.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-accessibility-laws-policies.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 3 source notes for Codex CLI Windows setup, NN/g design critique, and W3C accessibility policy index |
| Index | Added 3 source links and this report link |
| Log | Added this 03:02 scheduled growth scan entry |
| Inbox queue | Preserved old 10x queue at `eligible-next=0`, `not-checked=0`; no broad MCP Apps reopening |
| Installs | No install, package execution, CLI upgrade, security scan, connector, token, workflow, account, or cloud action |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI Codex CLI Windows setup | official docs + changelog | source-backed: local CLI, Windows/PowerShell/WSL2 boundary, changelog trace fix; Dex inference: Windows runtime fields; not checked: local CLI install/version | medium |
| NN/g AI-era design critique | UX article | source-backed: critique/user understanding as AI-era design skill; Dex inference: design QA fields; not checked: article internal data and project impact | medium |
| W3C WAI accessibility laws/policies | official index + WCAG overview | source-backed: policy index limits and WCAG 2.2 anchor; Dex inference: QA legal/policy fields; not checked: region-specific legal obligations | medium |
| OpenAI Codex models | official docs | duplicate-source | existing 02:01/01:34 model governance notes cover model source/local availability separation |
| OpenAI Codex Security plugin changelog | official docs | duplicate-source | existing 22:33 security plugin source covers evidence/confidence/coverage/export/triage pattern |
| Figma Design Agent | official blog | duplicate-source | existing Figma design-agent and agent-skills notes cover design-system agent context |
| Obsidian changelog | official changelog | duplicate-source | existing Obsidian 1.13/Bases/CLI note remains sufficient |
| Storybook release/blog signal | official blog | duplicate/no-new-signal | existing Storybook 9/10.4/Vitest/Next.js notes cover frontend QA currentness |
| GitHub Copilot billing/changelog | official changelog/docs | duplicate-source | existing AI credit, usage metrics, billing/session notes cover this lane |
| Threads Obsidian/LLM Wiki snippets | public SNS snippets | deferred/source-weak | discovery only; no stable source-backed text promoted |
| OpenAI/codex GitHub issues about Windows plugin/runtime | GitHub issue signal | deferred | useful local-risk signal but issue threads are not stable official docs; no source note until reproducible or official doc confirms |
| X | excluded channel | blocked | automation rule excludes X |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| Codex CLI install/upgrade on Windows | due-diligence candidate | No | Requires current local version check, install source choice, PowerShell/WSL2 decision, sandbox review, rollback path. |
| Codex Security plugin scan | existing candidate-only | No | Security scans may read code and produce sensitive findings; project-level approval and output path review required. |
| Figma Design Agent / connector use | account-adjacent candidate | No | Requires Figma plan, file permission, connector scope, design-system ownership, and human critique gate. |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: Codex models, Codex SDK/runtime, Codex Security plugin 0.1.9, Figma Design Agent, Figma 2026 AI report, Obsidian 1.13/CLI, Storybook 9/10.4/Vitest, GitHub Copilot billing/usage metrics/model governance.
- deferred: Threads Obsidian/LLM Wiki snippets; OpenAI/codex GitHub issues about Windows plugin/runtime instability.
- blocked: X was excluded by automation rule.

## Failure / Blocked / Not Checked

- 현재 PC의 `codex` CLI 설치 여부, 버전, PowerShell/WSL2 경로, app/CLI 계정 상태는 확인하지 않았다.
- Codex Security plugin, CLI upgrade, SDK, package, MCP, connector, Figma action, browser extension, GitHub workflow는 실행하지 않았다.
- W3C WAI policy index는 법률 자문이 아니며, 특정 지역/산업/계약의 실제 접근성 의무는 확인하지 않았다.
- Threads는 검색했지만 stable source-backed text가 부족해 저장하지 않았다.

## Cross Verification Evidence

- Codex CLI Windows setup은 OpenAI CLI 공식 문서와 Codex changelog의 trace bug fix를 함께 확인했다.
- NN/g design critique는 기존 NN/g AI UX index, Figma AI collaboration source, WCAG 2.2 source note와 운영 방향을 교차 확인했다.
- W3C policy index는 W3C WCAG overview와 기존 GOV.UK/USWDS/Carbon/GitLab accessibility source notes에 연결했다.
- frontend/UX 항목의 WCAG 연결: AI design critique 자체는 WCAG 문서가 아니지만, Dex Company QA에서는 keyboard/focus/target size/error/help/redundant entry 같은 WCAG 2.2 기준으로 critique 결과를 검증해야 한다.

## Ethan Can Use This Immediately

- Windows에서 Codex CLI나 SDK를 쓰자는 제안이 나오면 먼저 `runtime.os=Windows`, `shell.surface=PowerShell or WSL2`, `codex.version`, `sandbox.mode`, `install.source`, `rollback.path`를 확인하시면 됩니다.
- AI가 만든 디자인은 "예쁘다/빠르다"가 아니라 `critique.criteria`, `user.evidence`, `accessibility.check`, `decision.rationale`가 있는지 보시면 됩니다.
- 접근성 QA는 WCAG만 적지 말고, 납품 지역이 있으면 `policy.region`, `policy.last_checked`, `legal.not_advice`를 같이 남기시면 됩니다.

## Improvement Delta

- Growth Scan template 후보에 `runtime.os`, `shell.surface`, `sensitive_log.risk`, `version.fixed_in`, `critique.criteria`, `policy.region`, `policy.last_checked`, `legal.not_advice`를 추가할 근거가 생겼다.
- Windows Codex 운영 판단을 "설치 가능 여부"가 아니라 "로컬 runtime, shell, sandbox, trace/log 민감도, rollback"으로 나눠 보도록 보강했다.
- 디자인/UX QA를 산출물 평가에서 critique evidence와 WCAG-linked check로 확장했다.

## Adoption Check

- done: `eligible-next=0`, `not-checked=0` 상태를 유지했고 old 10x queue를 다시 열지 않았다.
- done: 새 저장은 기존 note가 직접 커버하지 않는 3개로 제한했다.
- done: 직전 Next Eval의 GitHub/security/model 필드 확장 방향을 이번 실행에서 Windows runtime, critique, accessibility policy 필드로 이어갔다.
- carried: live account/runtime availability 확인은 별도 요청 전까지 current로 말하지 않는다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done-with-minimal-storage | 새 source note는 3개로 제한하고 6개는 duplicate/no-new-signal 처리 |
| Runtime/account availability checks | carried | carried | local CLI/Figma/GitHub/Codex state not checked |
| Frontend/design QA gate | carried | done | NN/g critique and W3C policy notes add practical QA fields |
| Old broad queue reopening | blocked-by-default | done | `eligible-next=0`, `not-checked=0` maintained |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; avoid reopening old broad queues unless a source changes a prior decision.
2. If a Windows/Codex runtime item appears, record `runtime.os`, `shell.surface`, `codex.version`, `sandbox.mode`, `install.source`, `sensitive_log.risk`, and `rollback.path`.
3. If a UX/design item appears, record `critique.criteria`, `user.evidence`, `accessibility.check`, `decision.rationale`, and `WCAG.anchor`.
4. If an accessibility/legal item appears, record `policy.region`, `policy.last_checked`, `legal.not_advice`, and official regional source.
5. If no new official/high-provenance signal appears, write a short no-op report.

## Prompt or Template Patch Candidate

```text
For Growth Scan items involving local Codex runtime or Windows setup, record: runtime.os, shell.surface, codex.version, install.source, sandbox.mode, sensitive_log.risk, version.fixed_in, rollback.path, and local_availability.checked. For AI design/UX items, record: critique.criteria, user.evidence, decision.rationale, accessibility.check, WCAG.anchor, and human_review.owner. For accessibility policy items, record: policy.region, policy.last_checked, legal.not_advice, official regional source, and test.method.
```

## Questions / Tracking Candidates

- 에던님 PC에서 Codex CLI를 실제 운영 도구로 쓸 필요가 생기면, 현재 설치 경로와 버전을 먼저 확인하고 PowerShell native와 WSL2 중 어떤 표면을 기본으로 할지 정해야 한다.
- 디자인 작업이 시작되면 `QA_REPORT.md`에 critique 기준과 WCAG anchor를 고정 필드로 넣을지 결정하면 좋다.
- 공공/금융/해외 납품 프로젝트가 생기면 W3C WAI policy index를 출발점으로 지역별 공식 법령과 계약 기준을 별도로 확인해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 02:34, 02:01, 01:34, 01:03 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Storybook, Figma, NN/g, W3C, Threads searched or checked |
| Duplicate check | passed | `rg` checked existing LLM Wiki notes before writing |
| Previous deferred rejudgement | passed | no-op discipline, runtime checks, design QA gate, queue reopening rejudged |
| Source schema | passed | fallback schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, scan, workflow, SDK, package, MCP, connector, or plugin action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: OpenAI/Figma/W3C public docs can be mistaken for local account/runtime/legal availability.
- Mitigation: all items are documentation/source notes only; no executable setup, security scan, connector, token, or account action was run.
- Not checked: local Codex CLI version/install, Figma plan/file state, regional legal obligations, GitHub issue reproducibility.

