---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Governance, Budget, Browser QA - 2026-07-04 00:04 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T00:04:12+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/record-and-replay"
  - "https://github.blog/changelog/2026-07-02-copilot-agent-session-streaming-is-now-in-public-preview/"
  - "https://github.blog/changelog/2026-07-01-enterprise-managed-settings-json-is-generally-available/"
  - "https://github.blog/changelog/2026-07-01-set-ai-credit-session-limits-in-copilot-cli-and-sdk/"
  - "https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
collectionPurpose: "agent governance, budget control, browser QA, design skill collaboration 신호를 Dex Company 운영 지식으로 흡수한다."
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

# Dex Company Growth Scan Governance, Budget, Browser QA - 2026-07-04 00:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 00:04 KST
- 검색 범위: automation memory, 현재 폴더, Vault AGENTS, role routing/matrix, LLM Wiki operating guide, LLM Wiki index/log, Growth Scan improvement guide, 최근 23:35/23:03/22:33/22:04 보고서, OpenAI/GitHub/Figma/Next.js/Storybook/Obsidian/NN/g/Threads 공개 자료.
- 실행 초점: 직전 기준인 `eligible-next=0`, `not-checked=0`을 유지하고, 오래된 10x 큐를 재개하지 않으며, 새 공식/고신뢰 자료 중 Dex Company 운영 판단을 바꾸는 것만 저장했습니다.
- 제외: package, plugin, SDK, MCP server, browser extension, cloud resource, access token, import, Figma connector, GitHub Copilot 기능은 설치/실행/활성화하지 않았습니다.

## Original Content

이 파일은 자동화 실행 보고서입니다. 원문 전체를 복사하지 않고, 공식 자료 6개와 중복/보류 판단, QA 결과만 요약했습니다. 이번 실행도 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수입니다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 29 |
| stored.count | 6 |
| duplicate.count | 8 |
| deferred.count | 6 |
| blocked.count | 4 |
| lint.warning_count | 0 |

## Today's Core Findings

1. Codex Record & Replay는 반복 GUI 업무를 skill로 만들 수 있는 공식 신호지만, 현재 문서상 macOS/Computer Use 조건이 있어 Windows 중심 현재 환경에서는 후보로만 봐야 합니다.
2. GitHub Copilot agent session streaming은 agent 활동을 프롬프트, 응답, tool call 수준에서 감사 가능한 증거로 다루는 방향을 보여줍니다.
3. GitHub managed-settings와 AI credit session limits는 agent 실행에서 정책 계층과 비용/세션 한도를 분리해야 한다는 운영 신호입니다.
4. GitHub Copilot browser tools GA는 frontend QA에서 실제 브라우저 증거, console, screenshot, 권한 승인, domain control을 기록해야 한다는 기준을 강화합니다.
5. Figma agent skills는 디자인 시스템만으로는 부족하고 critique, UX writing, research evidence, handoff skill이 별도 운영 지식으로 필요하다는 신호입니다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-record-replay-skill-capture.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-agent-session-streaming.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-enterprise-managed-settings.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-ai-credit-session-limits.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-github-copilot-browser-tools-vscode-ga.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-figma-agent-skills-collaboration.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 6 source notes across Codex skill capture, GitHub agent governance/budget/browser QA, and Figma design skill collaboration |
| Index | Added 6 source links and this report link |
| Log | Added this 00:04 scheduled growth scan entry |
| Inbox queue | Old 10x queue was not reopened; previous `eligible-next=0` and `not-checked=0` decision preserved |
| Installs | No install, connector enablement, import, token, cloud, SDK, MCP, or browser extension action |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI Codex Record & Replay | official docs | source-backed: macOS/Computer Use, record/replay, skill draft; Dex inference: Windows current environment means candidate-only; not checked: live UI/account availability | medium |
| GitHub Copilot session streaming | official changelog | source-backed: enterprise session data streaming/API; Dex inference: trace evidence for Dex QA; not checked: enterprise API | medium |
| GitHub managed-settings.json | official changelog | source-backed: `.github-private` policy source, precedence, supported clients; Dex inference: policy-source checklist; not checked: enterprise config | medium |
| GitHub AI credit session limits | official changelog | source-backed: `/limits`, `--max-ai-credits`, soft cap; Dex inference: budget gate for automations; not checked: CLI/SDK runtime | medium |
| GitHub Copilot browser tools GA | official changelog | source-backed: browser actions, screenshots, console, isolated tabs, domain controls; Dex inference: frontend QA gate; not checked: local VS Code Copilot | medium |
| Figma agent skills | official blog | source-backed: reusable slash skills, design-system complement, connectors, private/shared chats; Dex inference: design critique/handoff templates; not checked: Figma account/seat/connectors | medium |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| Codex Record & Replay | platform-specific candidate | No | macOS + Computer Use requirement; current Windows environment not verified. |
| Copilot session streaming | enterprise observability candidate | No | Enterprise managed users, audit stream/API, privacy retention review required. |
| Copilot managed-settings | enterprise governance candidate | No | Changes plugin/model/marketplace/bypass behavior; requires admin approval. |
| Copilot AI credit limits | budget-control pattern candidate | No | Product-specific preview; useful as Dex automation design pattern only. |
| Copilot browser tools | frontend QA reference candidate | No | VS Code Copilot-specific; local Dex browser/Playwright remains default until project need exists. |
| Figma agent skills/connectors | design workflow candidate | No | Figma permissions, shared chat privacy, connectors, research-data boundary required. |

## Duplicate / Rejected / Deferred

- duplicate: Next.js 16.3 AI/Turbopack already stored in `2026-07-03-nextjs-163-agent-readable-workflows`.
- duplicate: Storybook 10.4 already stored in `2026-07-03-storybook-104-agent-setup-review-filters`.
- duplicate: Figma March 2026 canvas agent and MCP context already covered by prior Figma source note; this run stored only the newer July 1 skill collaboration angle.
- duplicate: Obsidian CLI/Bases/1.13 changelog already covered by earlier Obsidian notes.
- duplicate: WCAG 2.2 and OWASP LLM Top 10 were used as QA anchors, not re-stored.
- rejected/no-new-signal: Threads snippets about Codex hardware, gifts, and design tool lists were not stable enough for source-backed ingestion.
- deferred: OpenAI AI-native engineering team guide is broad and case-study oriented; revisit only if a Dex Company team operating model is being written.
- deferred: GitHub Copilot for Jira GA and JetBrains ACP integration are useful but less directly applicable to current Codex/Obsidian workflow than session trace, governance, budget, and browser QA.

## Failure / Blocked / Not Checked

- Threads was searched and yielded snippets, but no stable source-backed text worth promoting this run.
- No GitHub Enterprise, Figma, VS Code Copilot, Copilot CLI, Codex Record & Replay, or Computer Use runtime check was performed.
- No installable code or connector was executed; dependency/license/runtime audits were not performed.
- Official LLM Wiki scripts passed, but console rendering of some old Korean files still shows mojibake in PowerShell output; new files were verified by replacement-character scan.

## Cross Verification Evidence

- OpenAI Record & Replay was compared with local Dex Company skill policy and no-secret/no-auto-install rules.
- GitHub session streaming, managed-settings, and AI credit limits were compared with existing OpenAI managed configuration, access token, automation, and improvement-loop source notes.
- GitHub browser tools were compared with existing Playwright, Storybook, WCAG 2.2, and frontend QA source notes.
- Figma skills were compared with existing Figma MCP/design-system context, NN/g responsible research, and WCAG 2.2 accessibility source notes.
- Threads was used only as discovery; it did not become source-backed evidence.

## Ethan Can Use This Immediately

- 자동화나 장시간 agent 작업을 만들 때는 "세션 trace", "예산/시간 한도", "중단 시 정리 방식"을 보고서 템플릿에 넣으시면 됩니다.
- frontend QA를 맡길 때는 "브라우저에서 봤다" 대신 URL, 시나리오, 콘솔 오류, screenshot, 권한 승인, domain 제한을 요구하시면 됩니다.
- Figma/디자인 agent를 쓰게 되면 design system context만 믿지 말고 critique, UX writing, research evidence, WCAG 2.2 점검을 별도 gate로 두시면 됩니다.
- GUI 반복 업무를 skill로 만들고 싶을 때는 현재 Windows에서는 Record & Replay를 즉시 사용 가능하다고 보지 말고, Mac/Computer Use 조건 확인 뒤 후보로 검토하시면 됩니다.

## Improvement Delta

- Dex Company agent 운영 기준에 `session trace`, `policy-source hierarchy`, `budget/session cap`, `agent browser permission boundary`, `design skill privacy boundary`를 추가 후보로 정리했습니다.
- Growth Scan 저장 기준은 계속 "새 공식/고신뢰 신호가 운영 판단을 바꿀 때만 저장"으로 유지했습니다.
- Frontend/design QA 기준은 WCAG 2.2 결과 자체가 아니라, 접근성 증거를 수집하는 runtime evidence 방식까지 요구하도록 보강했습니다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 상태를 유지했습니다.
- done: 오래된 MCP Apps/10x queue를 재개하지 않았습니다.
- done: install-adjacent 항목은 모두 documentation-only 또는 due-diligence candidate로만 기록했습니다.
- done: Codex managed config/import availability를 현재 사용 가능하다고 말하지 않았습니다.
- done: frontend QA gate를 browser evidence, component/runtime evidence, WCAG 2.2 검토로 계속 유지했습니다.
- carried: 실제 Codex/Figma/GitHub 기능 availability는 계정/앱/UI 확인 전까지 current로 단정하지 않습니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Threads stable source extraction | carried | blocked | snippets remained source-weak; no source note created |
| Install-adjacent agent tooling | carried | done | six candidates classified without install or enablement |
| Live Codex managed config/import state | carried | carried | no live UI/account check requested or performed |
| Frontend QA gate | carried | done | browser tools GA source added as runtime evidence reinforcement |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; do not reopen the old 10x queue unless new evidence changes a prior decision.
2. Rejudge whether the report template should add optional `budget.limit`, `session.trace`, and `policy.source` fields.
3. If Codex Record & Replay is discussed, verify actual OS/account/region/Computer Use availability before calling it usable.
4. If a frontend project starts, require browser/runtime evidence plus WCAG 2.2 manual checks rather than accepting generated stories or screenshots alone.

## Prompt or Template Patch Candidate

```text
For every Growth Scan item involving agent execution, browser control, connector access, Figma/GitHub integration, or reusable skills, record: policy.source, session.trace availability, budget/time cap, permission boundary, install status, and not-checked runtime state. Official documentation is source-backed evidence, but does not imply that the current local account, OS, plan, or project can use the feature.
```

## Questions / Tracking Candidates

- Dex Company 자동화 보고서 Metrics에 `budget.limit`, `budget.used`, `session.trace`, `policy.source`를 선택 필드로 추가할지 검토해야 합니다.
- Figma agent/skills를 실제로 쓸 경우 shared-by-default chat과 connector context가 어떤 자료까지 읽는지 먼저 확인해야 합니다.
- Record & Replay는 Windows에서 바로 쓸 수 있는 기능이 아니므로 Mac 환경이 생길 때 별도 실사해야 합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 23:35 report and automation memory recent run summaries checked |
| Public web search | passed | OpenAI, GitHub, Figma, Next.js, Storybook, Obsidian, NN/g, Threads searched |
| Duplicate check | passed | `rg` checked existing LLM Wiki notes before writing |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, import, token, cloud, SDK, MCP, connector, browser extension, or Figma action run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Several findings are product/enterprise feature signals, not local availability proof.
- Mitigation: all such items were stored as documentation-only or due-diligence candidates; no runtime action was performed.
- Not checked: live Codex Record & Replay, GitHub Enterprise/Copilot settings, Copilot CLI/SDK, VS Code browser tools, Figma agent skills/connectors.
