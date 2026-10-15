---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Team Workflow Integrations - 2026-07-04 00:34 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T00:34:17+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/guides/build-ai-native-engineering-team"
  - "https://openai.com/index/unlocking-the-codex-harness/"
  - "https://developers.openai.com/codex/changelog"
  - "https://github.blog/changelog/2026-06-25-github-copilot-for-jira-is-now-generally-available/"
  - "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira"
  - "https://github.blog/changelog/2026-06-30-copilot-agent-is-now-available-in-jetbrains-ai-assistant/"
  - "https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-in-jetbrains"
  - "https://blog.jetbrains.com/ai/2026/06/github-copilot-now-an-integrated-agent/"
collectionPurpose: "team workflow, external work-tracking integration, IDE agent boundary, Codex harness architecture 신호를 Dex Company 운영 지식으로 흡수한다."
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

# Dex Company Growth Scan Team Workflow Integrations - 2026-07-04 00:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 00:34 KST
- 검색 범위: automation memory, 현재 폴더, Vault AGENTS/role routing/matrix, LLM Wiki operating guide, LLM Wiki index/log, Growth Scan improvement guide, 최근 00:04/23:35/23:03/22:33 보고서, 10x candidate queue, OpenAI Codex guide/changelog/blog, GitHub changelog/docs, JetBrains blog, OpenAI API deprecations, Obsidian changelog, Threads 공개 검색 결과.
- 실행 초점: 직전 보류 항목인 OpenAI AI-native engineering team guide, GitHub Copilot for Jira GA, JetBrains ACP integration을 재판정하고, 설치 없이 source note로 흡수할지 결정했다.
- 제외: package, plugin, SDK, MCP server, browser extension, Atlassian app, GitHub app, JetBrains plugin, cloud resource, access token, auth file, App Server command를 설치하거나 실행하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고, 공식/고신뢰 출처의 메타데이터, 핵심 확인 범위, 중복/보류 판단, Dex Company 적용 예시와 QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 27 |
| stored.count | 4 |
| duplicate.count | 6 |
| deferred.count | 4 |
| blocked.count | 4 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI AI-native engineering guide는 Dex Company 역할 라우팅을 더 크게 바꾸는 자료가 아니라, 작은 agent workflow를 guardrail과 검증 루프로 누적해야 한다는 현 운영 원칙을 공식 출처로 보강한다.
2. GitHub Copilot for Jira GA는 티켓 기반 agent 운영에서 progress streaming, post-session steering, repository permission, SSO, app authorization을 분리해야 함을 보여준다.
3. JetBrains AI Assistant의 Copilot agent 통합은 ACP/native agent picker가 곧 전체 IDE 기능 대체가 아님을 명확히 한다. chat/agent capability와 completion/review/commit 기능은 분리해서 봐야 한다.
4. Codex App Server 자료는 Desktop, CLI, IDE, web runtime이 event stream, approvals, reconnect 가능한 harness로 정렬되는 방향을 보여준다. 다만 현재 실행에서는 integration 후보로만 기록했다.
5. OpenAI API deprecations, Codex changelog, Obsidian, Storybook/Next.js, WCAG/OWASP는 이미 저장된 coverage로 충분하거나 이번 실행의 직접 의사결정을 바꾸지 않아 중복/참조로 처리했다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-ai-native-engineering-team-guide.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-jira-ga-agent-workflow.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-jetbrains-ai-assistant-acp.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-app-server-json-rpc-harness.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 4 source notes for OpenAI AI-native team workflow, OpenAI Codex App Server, GitHub Copilot for Jira, and GitHub/JetBrains ACP integration |
| Index | Added 4 source links and this report link |
| Log | Added this 00:34 scheduled growth scan entry |
| Inbox queue | Old 10x queue preserved at `eligible-next=0`, `not-checked=0`; no broad MCP Apps reopening |
| Installs | No install, import, token, cloud, SDK, MCP, connector, Atlassian app, GitHub app, or JetBrains action run |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI AI-native engineering team guide | official guide | source-backed: lifecycle-wide workflow, guardrails, iterative expansion; Dex inference: Dex Company role workflow patch; not checked: actual OpenAI deployment support | medium |
| OpenAI Codex App Server | official blog + changelog | source-backed: JSON-RPC harness, event/update/approval/reconnect framing; Dex inference: long-running automation architecture signal; not checked: local command/runtime | medium |
| GitHub Copilot for Jira GA | official changelog + docs | source-backed: GA, progress streaming, follow-up steering, app/org/repo authorization; Dex inference: ticket-agent permission checklist; not checked: live tenant/account | medium |
| GitHub Copilot in JetBrains AI Assistant | GitHub changelog/docs + JetBrains blog | source-backed: ACP/native agent picker and capability limits; Dex inference: IDE agent due-diligence checklist; not checked: local IDE/subscription | medium |
| OpenAI API deprecations | official docs | duplicate/currentness check | existing deprecations note covers this lane; July 2 fine-tuning update unchanged from prior run |
| Codex changelog | official docs | duplicate/currentness check | existing Codex CLI/changelog notes cover current operational issues |
| Obsidian changelog/Bases/CLI | official docs | duplicate/no-new-signal | existing Obsidian notes remain sufficient |
| Threads snippets | public SNS snippets | not checked/source-weak | no stable source-backed text promoted |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| GitHub Copilot for Jira app | external-workflow integration candidate | No | Atlassian app, GitHub app, org/repo access, SSO, write permission, data retention review required. |
| GitHub Copilot in JetBrains AI Assistant | IDE agent integration candidate | No | Requires JetBrains AI Assistant, Copilot subscription, credentials, workspace permissions, command boundary review. |
| Codex App Server | runtime integration candidate | No | App Server commands/protocol/schema were not run; target repo, version, logging, and secret policy required. |
| AI-native team workflow guide | operating-model source | No | Documentation-only; no runtime or connector action. |

## Duplicate / Rejected / Deferred

- duplicate: OpenAI API deprecations already stored; July 2 fine-tuning update was rechecked but not duplicated.
- duplicate: Codex changelog was rechecked; existing Codex CLI/changelog source note remains sufficient.
- duplicate: Obsidian changelog/Bases/CLI coverage remains sufficient.
- duplicate: Next.js, Storybook, Vite, WCAG 2.2, OWASP LLM Top 10 were used only as existing QA/security anchors.
- blocked/no-new-signal: Threads snippets did not provide stable public source text worth promoting.
- deferred: live availability of Jira integration, JetBrains integration, Copilot subscription, Codex App Server local runtime, and actual current Codex Desktop feature state.

## Failure / Blocked / Not Checked

- No Atlassian Marketplace app, GitHub app, JetBrains plugin, Codex App Server, SDK, MCP server, browser extension, cloud resource, token, or auth file was installed, created, connected, or executed.
- Jira/GitHub/JetBrains/Copilot account and permission state were not checked.
- Codex App Server local command, protocol schema generation, Windows package behavior, and event stream were not checked.
- Threads remained discovery-only because stable source extraction was not available.

## Cross Verification Evidence

- OpenAI AI-native guide was compared with existing Codex Goals, Codex Automations, and Growth Scan improvement model notes.
- Codex App Server was compared with Codex changelog and existing remote/access-token/managed-config notes.
- GitHub Copilot for Jira GA was cross-checked against GitHub Docs integration steps and existing session streaming / managed settings notes.
- JetBrains integration was cross-checked across GitHub changelog, GitHub Docs, and JetBrains blog.
- WCAG 2.2 was not directly applicable to these backend/workflow/IDE integration docs. If Dex Company builds a Jira-like or IDE-like UI later, WCAG-related checks should target focus order, keyboard operation, status update announcements, error messaging, and visible permission states.

## Ethan Can Use This Immediately

- 외부 업무 도구에 agent를 붙일 때는 "티켓에서 agent를 호출할 수 있다"보다 먼저 app 권한, org/repo access, SSO, write permission, follow-up steering이 한 PR에 모이는지 확인하시면 됩니다.
- IDE agent를 평가할 때는 "agent picker에 보인다"와 "completion, code review, commit message까지 모두 제공한다"를 분리해서 보셔야 합니다.
- Dex Company 자동화/역할 작업을 확장할 때는 큰 autonomous agent보다 작은 workflow, 명확한 승인 경계, QA evidence, handoff 파일부터 고정하는 방식이 맞습니다.
- Codex App Server나 ACP 같은 runtime/protocol 자료는 유용하지만, 실제 실행 전에는 버전, 권한, 로그, secret 저장, target repo를 별도 실사해야 합니다.

## Improvement Delta

- 직전 보류 항목 3개를 `done`으로 재판정했다: OpenAI AI-native engineering guide, GitHub Copilot for Jira GA, JetBrains ACP integration.
- Growth Scan template 후보에 `integration.surface`, `account.permission`, `workflow.source_of_truth`, `runtime.command_checked` 필드를 추가할 근거가 생겼다.
- "agent가 외부 도구 안에 보인다"를 성공으로 보지 않고, source of truth, progress trace, follow-up steering, auth boundary를 별도 gate로 보는 운영 규칙이 강화됐다.

## Adoption Check

- done: 직전 Next Eval의 `budget.limit`, `session.trace`, `policy.source` 검토를 이어 받아 이번 실행에서는 `integration.surface`와 `account.permission`까지 확장했다.
- done: `eligible-next=0`, `not-checked=0` 상태를 보존했고, 옛 10x queue를 다시 열지 않았다.
- done: install-adjacent 항목을 모두 documentation-only 또는 due-diligence candidate로만 기록했다.
- done: Jira/JetBrains deferred 항목을 재판정해 source note로 승격하되 설치는 하지 않았다.
- carried: live Codex/GitHub/Jira/JetBrains/Figma feature availability는 계정/OS/권한 확인 전까지 current로 말하지 않는다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| OpenAI AI-native engineering team guide | deferred | done | official guide stored as operating-model source |
| GitHub Copilot for Jira GA | deferred | done | official changelog + GitHub Docs stored as external workflow integration source |
| JetBrains ACP integration | deferred | done | GitHub changelog/docs + JetBrains blog stored as IDE agent integration source |
| Live runtime availability checks | carried | carried | no account/OS/IDE/Jira tenant runtime checks performed |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; only store new sources when they change Dex Company operating decisions.
2. If the next run finds another external agent integration, require `integration.surface`, `account.permission`, `source_of_truth`, `progress.trace`, and `install.status`.
3. Do not report Jira, JetBrains, Copilot, Figma, or Codex App Server features as usable on 에던님의 machine/account until live state is checked.
4. If no new official/high-provenance signal appears, write a shorter no-op report instead of adding low-value source notes.

## Prompt or Template Patch Candidate

```text
For every Growth Scan item involving an external workflow tool, IDE agent, app marketplace integration, runtime protocol, or cross-product agent surface, record: integration.surface, account.permission, workflow.source_of_truth, progress.trace availability, follow-up steering path, install.status, and runtime.command_checked. Official availability is source-backed evidence, but does not prove local account, tenant, OS, IDE, or workspace availability.
```

## Questions / Tracking Candidates

- Jira/Linear/GitHub Projects를 Dex Company 운영에 붙일 때 어느 도구를 source of truth로 둘지 먼저 결정해야 한다.
- JetBrains AI Assistant나 ACP 계열 agent를 실제로 쓸 일이 생기면, Codex/JetBrains/Copilot 중 파일 수정과 명령 실행 주체를 먼저 기록해야 한다.
- Codex App Server 실험은 별도 승인 후 target repo, command list, protocol schema, log/secret policy를 정하고 진행해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 00:04, 23:35, 23:03, 22:33 reports inspected |
| Public web search | passed | OpenAI, GitHub, JetBrains, Obsidian, Threads searched |
| Duplicate check | passed | `rg` checked existing LLM Wiki notes and recent reports before writing |
| Previous deferred rejudgement | passed | 3 deferred items reclassified as done |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, app connection, token, cloud, SDK, MCP, App Server, or IDE action run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: GitHub/Jira/JetBrains/App Server 자료는 공식성이 높지만 local/account/tenant/runtime availability 증거가 아니다.
- Mitigation: 모두 documentation-only 또는 due-diligence candidate로 저장했고, 설치/연결/실행은 하지 않았다.
- Not checked: live Jira tenant, GitHub org/app permissions, Copilot subscription, JetBrains AI Assistant, Codex App Server command, Threads full-source extraction.

