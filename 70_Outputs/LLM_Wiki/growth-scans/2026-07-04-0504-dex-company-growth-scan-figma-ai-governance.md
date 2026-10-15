---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Figma AI Governance - 2026-07-04 05:04 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T05:04:27+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://www.figma.com/blog/figma-is-now-iso-42001-certified/"
  - "https://www.iso.org/standard/42001"
  - "https://www.iso.org/home/insights-news/resources/iso-42001-explained-what-it-is.html"
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/2026-07-02-copilot-cli-no-longer-needs-a-personal-access-token-in-github-actions/"
  - "https://github.blog/changelog/2026-07-02-improved-accuracy-and-coverage-in-copilot-usage-metrics-reports/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/update/"
collectionPurpose: "30분 간격 Dex Company Growth Scan에서 새 고품질 신호 1건을 source note로 저장하고, 나머지 반복 신호를 duplicate/no-new-signal로 분리한다."
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
  - ai-governance
---

# Dex Company Growth Scan Figma AI Governance - 2026-07-04 05:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 05:04 KST
- 검색 범위: automation memory, 현재 작업 폴더, Vault AGENTS/role docs/LLM Wiki guide/index/log/improvement model, 최근 04:34/04:04/03:34/03:02 보고서, 10x candidate queue, OpenAI Codex/API changelog, GitHub Copilot changelog/docs, Obsidian changelog, Figma AI/security blog, ISO official ISO 42001 pages, W3C WAI update, Storybook search, Threads snippets.
- 실행 초점: 직전 no-op 기준을 유지하되, 기존 LLM Wiki에 없는 공식/교차검증 가능한 새 신호만 저장한다.
- 제외: package, SDK, MCP server, browser extension, connector, GitHub app, Figma action, Obsidian setting, token, API key, account connection, cloud resource, billing action, model switch, workflow, file deletion은 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 출처 URL, 확인 범위, 중복/저장/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 평가했다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 16 |
| stored.count | 1 |
| duplicate.count | 9 |
| deferred.count | 3 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. Figma ISO 42001 인증 발표는 기존 Figma Agent/MCP/AI collaboration notes에 없던 vendor AI governance evidence다. source note 1개로 저장했다.
2. ISO 42001은 AI 기능 자체의 안전 보장이 아니라 AI management system의 governance evidence다. Dex Company에서는 기능 승인과 vendor governance evidence를 분리해야 한다.
3. GitHub Copilot CLI Actions, usage metrics, AI credit, model governance 신호는 이미 01:03/01:34/02:01 회차에서 source note로 저장되어 중복 저장하지 않았다.
4. OpenAI Codex/API, Obsidian, W3C WAI, Figma Agent/Config 2026은 직전 04:34 no-op 보고서의 coverage 판단이 여전히 유효했다.
5. Threads는 이번에도 discovery-only 수준이며 stable source text와 교차 검증이 부족해서 source note로 승격하지 않았다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-figma-iso-42001-ai-governance.md`
- `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-0504-dex-company-growth-scan-figma-ai-governance.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/ai-research | Figma ISO 42001 AI governance source note 추가 |
| wiki/ | 변경 없음 |
| index.md | 새 source note와 이번 report 링크 추가 |
| log.md | 05:04 scheduled growth scan 이력 추가 |
| candidate queue | 직접 수정 없음. 기존 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 |
| automation memory | 이번 실행 요약 추가 예정 |

## Evidence Table

| Candidate | Primary evidence | Classification | Confidence |
|---|---|---|---|
| Figma ISO 42001 AI governance certification | Figma official blog + ISO official pages | stored-source | medium |
| OpenAI Codex changelog | OpenAI official changelog | duplicate/no-new-signal: recent Codex remote, Windows, model, llms notes cover it | high |
| OpenAI API changelog | OpenAI official changelog | duplicate/no-new-signal: GPT-5.5 prompt and container billing notes cover it | high |
| Copilot CLI no PAT in Actions | GitHub official changelog + docs | duplicate-source: `github-copilot-cli-actions-token-billing` covers it | high |
| Copilot usage metrics coverage | GitHub official changelog | duplicate-source: `github-copilot-usage-metrics-coverage` covers it | high |
| Gemini model deprecation / GitHub model retirement | GitHub official changelog | duplicate-source: model governance/retirement notes cover it | high |
| Obsidian changelog | Obsidian official changelog | duplicate-source: CLI/Bases/attachment cleanup notes cover it | high |
| W3C WAI Q3/WCAG | W3C official docs | duplicate-source: WAI Q3, WCAG, policy notes cover it | high |
| Figma Agent / Config 2026 | Figma official blog | duplicate-source: existing Figma agent/motion notes cover it | high |
| Storybook 10.5 alpha ai-review observability | Storybook/GitHub search | deferred/pre-release | low |
| Threads snippets | Threads search snippets | deferred/source-weak | low |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| Figma Agent / MCP / connector use | due-diligence candidate | No | insecure plugin design, prompt injection through design context, sensitive information disclosure, overreliance |
| GitHub Copilot code review MCP/agent skills | due-diligence candidate | No | excessive agency, prompt injection through PR/issues, write-scope confusion, secret exposure |
| Storybook alpha AI review tooling | carried pre-release candidate | No | supply chain risk, pre-release instability, overreliance on automated review |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: OpenAI Codex changelog, OpenAI API changelog, GitHub Copilot CLI Actions auth, Copilot usage metrics, GitHub model retirement, Obsidian changelog, W3C WAI/WCAG, Figma Agent, Figma Config 2026.
- deferred/project-specific: GitHub Copilot code review MCP/agent skills는 PR review workflow가 실제로 열릴 때만 write scope와 MCP tool log를 검토한다.
- deferred/pre-release: Storybook 10.5 alpha ai-review observability는 stable 또는 프로젝트 관련성이 생길 때 다시 본다.
- deferred/source-weak: Threads snippets는 discovery-only로 유지한다.
- blocked: X는 자동화 규칙상 제외했다.

## Failure / Blocked / Not Checked

- Figma 인증서 원문, 심사기관 세부 범위, Ethan Figma 계정/워크스페이스 적용 여부는 확인하지 않았다.
- ISO 표준 전문 유료 조항은 확인하지 않았다. 공개 ISO 설명과 Figma 공식 발표만 사용했다.
- Figma Agent, MCP, plugin, connector, AI feature는 실행하거나 연결하지 않았다.
- OpenAI/GitHub/Figma/Obsidian live account/runtime availability는 확인하지 않았다.
- Threads는 안정적인 본문 추출과 교차검증이 부족해 source-backed로 처리하지 않았다.
- PowerShell 기본 실행 정책 때문에 status/lint 스크립트 직접 실행은 1차 차단되었고, 같은 스크립트를 `-ExecutionPolicy Bypass`로 재실행해 통과했다.

## Cross Verification Evidence

- Figma ISO 42001 신호는 Figma 공식 발표와 ISO 공식 ISO/IEC 42001 설명으로 교차 확인했다.
- GitHub 항목은 기존 source notes `github-copilot-cli-actions-token-billing`, `github-copilot-usage-metrics-coverage`, `github-models-retirement-migration-risk`와 대조했다.
- OpenAI/Obsidian/W3C/Figma Agent 항목은 최근 04:34/04:04/03:34/03:02 보고서 및 LLM Wiki index/log와 대조했다.
- frontend/UX 연결: ISO 42001은 WCAG 기준이 아니므로 접근성 직접 증거로 쓰지 않는다. AI 도구 산출물은 별도로 WCAG 2.2 기반 browser QA를 통과해야 한다.

## Ethan Can Use This Immediately

- Figma나 다른 AI 디자인 도구 도입 검토 때 "AI를 책임 있게 쓴다"는 말만 보지 말고 `vendor.ai_governance_evidence`, `certificate.scope`, `auditor.accredited`, `feature.scope`, `data_retention.checked`, `workspace.permission`, `human_review.required`를 분리해서 보시면 됩니다.
- Figma ISO 42001은 "도입해도 된다"가 아니라 "vendor governance evidence가 하나 생겼다"로 보시면 됩니다.
- UI 산출물 검수에는 여전히 WCAG 2.2, reduced motion, keyboard/focus, contrast, target size, error/help 검사를 별도로 요구하시면 됩니다.

## Improvement Delta

- Growth Scan template 후보에 vendor AI governance evidence 필드를 추가할 근거가 생겼다.
- no-op 기준은 유지하되, 직전 no-op 이후에도 새로운 공식/교차검증 신호가 있으면 1건만 저장하는 최소 저장 패턴을 적용했다.
- AI 도구 실사에서 기능 사용 가능성, 계정 권한, 데이터 처리, 제3자 인증을 한 덩어리로 보지 않는 기준을 강화했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지 원칙을 지켰고 old queue를 다시 열지 않았다.
- done: 새 고품질 신호가 없으면 no-op를 쓰라는 기준을 따랐으나, 이번에는 중복이 아닌 Figma ISO 42001 신호 1건만 저장했다.
- done: GitHub/OpenAI/Obsidian/W3C/Figma Agent 반복 신호는 duplicate/no-new-signal로 처리했다.
- done: 설치/계정/API/토큰/워크플로우 실행은 하지 않았다.
- carried: live account/runtime availability 확인은 실제 사용 요청 전까지 carried로 둔다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done-with-minimal-storage | 새 source note 1개만 저장하고 9개 반복 신호는 중복 처리 |
| Runtime/account availability checks | carried | carried | Figma/GitHub/OpenAI live account state not checked |
| Storybook 10.5 alpha ai-review observability | deferred/pre-release | carried | stable/project use case not confirmed |
| Threads snippets | discovery-only | carried/source-weak | stable source-backed text not available |
| Old broad queue reopening | blocked-by-default | done | queue direct count keeps `eligible-next=0`, `not-checked=0` |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; avoid reopening old queues unless a source changes a prior decision.
2. For AI vendor governance items, record `vendor.ai_governance_evidence`, `certificate.scope`, `auditor.accredited`, `feature.scope`, `data_retention.checked`, `workspace.permission`, `human_review.required`, and `install.status`.
3. If no new official/high-provenance signal appears, create only a short no-op report and do not add source notes.
4. For Figma/MCP/connector items, do not install or connect anything before Ethan approves a project-specific audit.

## Prompt or Template Patch Candidate

```text
For Growth Scan items involving AI vendor governance or certification, record: vendor.ai_governance_evidence, certificate.scope, auditor.accredited, standard.source, feature.scope, data_retention.checked, workspace.permission, human_review.required, WCAG.anchor, local_availability.checked, and install.status. Treat certifications as vendor governance evidence, not as proof that a specific connector, agent, plugin, or workspace feature is safe or available.
```

## Questions / Tracking Candidates

- Figma Agent/MCP를 실제 프로젝트에 연결할 때는 ISO 42001 note를 vendor governance 참고자료로만 쓰고, 파일 권한/데이터 보존/connector permission/실행 로그는 별도 audit으로 보겠습니다.
- Storybook alpha AI review 신호는 stable release 또는 Dex Company frontend 프로젝트가 생길 때만 재검토하겠습니다.
- GitHub code review MCP/agent skills는 PR workflow가 실제로 열릴 때 `agent.write_scope`, `MCP.tools_called`, `review.session_log`, `secret.surface`, `human_review.required`를 확인하겠습니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 04:34, 04:04, 03:34, 03:02 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, ISO, W3C, Storybook, Threads searched or checked |
| Duplicate check | passed | `rg` checked existing LLM Wiki notes before writing |
| Previous deferred rejudgement | passed | no-op discipline, runtime checks, Storybook alpha, Threads, old queue reopening rejudged |
| Source schema | passed | required source/report frontmatter and `## Original Content` present |
| Status script | passed | `llm-wiki-status.ps1` completed via `-ExecutionPolicy Bypass`; source notes count is 139 |
| Lint script | passed | `llm-wiki-lint.ps1` completed via `-ExecutionPolicy Bypass` with 0 warning(s) |
| Fallback schema | passed | required frontmatter and `## Original Content` check returned 0 warning(s) |
| UTF-8 scan | passed | edited Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: ISO 42001 certification can be overread as proof that every Figma AI feature, connector, or workspace setting is safe.
- Mitigation: source note stores it only as vendor governance evidence; feature/account/runtime checks remain separate.
- Not checked: Figma certificate scope, Figma account/workspace availability, connector behavior, ISO paid standard details, live runtime state.
