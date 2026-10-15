---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Design Systems Install Audit - 2026-07-03 21:03 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T21:03:03+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
claimType: historical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - automation
---

# Dex Company Growth Scan Design Systems Install Audit - 2026-07-03 21:03 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 21:03 KST
- 검색 범위: 직전 20:33 report, 20:00/19:34 report, 10x candidate queue, Fluent 2, Adobe Spectrum 2, Shopify Polaris Web Components, Atlassian Design System, MCP Apps Agent Skills, `convert-web-app` skill, MCP Apps testing docs, Threads search 결과.
- 실행 초점: 직전 Next Eval의 `eligible-next=23`에서 최소 5개를 줄이고, `install-audit-next` 중 MCP Apps Agent Skills / `convert-web-app`를 설치 없이 `conditional / blocked / not checked` 기준으로 재판정했습니다.
- 제외: X는 제외했습니다. package, MCP server, browser extension, skill, plugin, framework는 설치하지 않았습니다.
- 저작권 처리: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단만 저장했습니다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 24 |
| stored.count | 5 |
| duplicate.count | 4 |
| deferred.count | 4 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. Fluent 2는 global token과 alias token을 나누고 접근성 문서에서 WCAG 2.1 AA 기반을 말합니다. Dex Company에서는 이를 WCAG 2.2 프로젝트 QA로 확장해야 합니다.
2. Adobe Spectrum 2는 creative/pro tool UI에서 개인화, 플랫폼 적응성, 접근성 방향을 주지만 일부 문서 추출이 제한되어 confidence는 medium으로 유지했습니다.
3. Shopify Polaris는 React 문서와 Web Components 경로를 혼동하면 안 됩니다. 새 앱 검토에서는 Polaris Web Components 접근성 기준과 deprecated React 상태를 분리해야 합니다.
4. Atlassian은 design token, host theme sync, accessibility tooling을 연결합니다. MCP Apps나 iframe 기반 UI에서도 host theme과 접근성 QA를 같이 봐야 합니다.
5. MCP Apps Agent Skills와 `convert-web-app`는 유용한 참조이지만 실행 agent가 app/server 구조를 바꾸는 후보라서 전역 설치는 하지 않고 프로젝트별 조건부 감사 대상으로 남겼습니다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-fluent-2-design-tokens-accessibility.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-adobe-spectrum-2-inclusive-design.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-shopify-polaris-web-components-accessibility.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-atlassian-design-system-accessibility-tokens.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-mcp-apps-agent-skills-convert-web-app-audit.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 5 source notes |
| Inbox queue | Reclassified stale `eligible-next` rows and MCP Apps install-audit rows |
| Queue count | `eligible-next=10`, `stored-source=40`, `duplicate-source=26`, `duplicate-in-queue=7`, `audit-done=3`, `install-audit-next=1`, `not-checked=8` |
| Index | Added 5 source links and this report link |
| Log | Added 21:03 scheduled growth scan entry |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| Fluent 2 tokens/accessibility | official docs | source-backed: token layers and WCAG foundation; Dex inference: WCAG 2.2 project QA expansion; not checked: package/runtime | high |
| Adobe Spectrum 2 inclusive design | official docs | source-backed: accessibility/personalization direction; Dex inference: pro tool QA use; not checked: package/runtime and detailed checklist | medium |
| Shopify Polaris Web Components | official docs + GitHub | source-backed: web components accessibility and React deprecation; Dex inference: Web Components first for new app review; not checked: install/build | high |
| Atlassian Design System | official docs + company blog | source-backed: tokens, theming, accessibility workflow; Dex inference: host theme + accessibility QA rule; not checked: Forge runtime | high |
| MCP Apps Agent Skills / convert-web-app | official docs + GitHub | source-backed: skill scope and testing docs; Dex inference: conditional reference only; not checked: install/runtime/Codex Desktop compatibility | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| MCP Apps Agent Skills docs | conditional-reference | No | 공식 문서로 읽는 것은 가능하지만 install flow는 Claude Code/Vercel Skills CLI 중심이고 Codex Desktop 호환성이 미확인입니다. |
| `convert-web-app` skill | install-audit-conditional | No | 특정 웹앱을 MCP App hybrid로 바꿀 때만 target repo에서 별도 감사가 필요합니다. |
| MCP Apps basic-host testing workflow | conditional-reference | No | Node install, local MCP server, compatible host, possible tunnel exposure가 필요하므로 승인 전 실행하지 않습니다. |
| Fluent/Spectrum/Polaris/Atlassian packages | conditional | No | 디자인 지식은 흡수했지만 패키지 설치는 프로젝트별 license/package/build/a11y audit 후 결정해야 합니다. |

## Duplicate / Rejected / Deferred

- duplicate-source: Material general home은 Material Design Tokens source note로 충분하므로 중복 처리했습니다.
- duplicate-source: Carbon general home은 Carbon accessibility source note로 충분하므로 중복 처리했습니다.
- duplicate-source: GOV.UK general home은 GOV.UK accessibility source note로 충분하므로 중복 처리했습니다.
- duplicate-in-queue: Design Tokens Community Group press kit 95번은 27번 후보와 중복이며 기존 W3C Design Tokens source note가 우선입니다.
- deferred: MCP Apps pdf-server example은 아직 `install-audit-next`로 남겼습니다.
- deferred: Microsoft Agent Framework docs hub와 Semantic Kernel docs hub는 기존 overview/specific source로 일부 커버되지만 hub-level 재판정은 다음으로 넘겼습니다.
- rejected: 영구 reject는 없습니다.

## Failure / Blocked / Not Checked

- Threads는 이번 실행에서 공개 검색 신호로 신뢰 가능한 원문을 확보하지 못했습니다. 로그인/동적 차단 가능성이 있어 `blocked/not checked`로 기록합니다.
- Adobe Spectrum 일부 문서는 JavaScript 의존으로 추출 범위가 제한됐습니다.
- Atlassian blog의 정량 성과 수치는 Atlassian 자체 보고이며 독립 검증하지 않았습니다.
- MCP Apps skill/plugin/package/host는 설치하거나 실행하지 않았습니다.
- Shopify Polaris Web Components는 문서만 확인했고 실제 app build는 확인하지 않았습니다.

## Cross Verification Evidence

- Fluent 2는 Microsoft Fluent token/accessibility 문서와 기존 WCAG 2.2, USWDS, VA, GC, GOV.UK, Carbon source notes로 교차 확인했습니다.
- Adobe Spectrum 2는 Spectrum 2 공식 페이지와 Spectrum inclusive design 공식 페이지, 기존 WCAG 2.2 note로 교차 확인했습니다.
- Shopify Polaris는 Shopify Dev Docs, App Home Web Components docs, Polaris React GitHub deprecated 상태, 기존 Storybook/GitLab accessibility notes로 교차 확인했습니다.
- Atlassian은 Atlassian Design System tokens, Forge design tokens/theming, Atlassian accessibility article, 기존 Trello token source note로 교차 확인했습니다.
- MCP Apps Agent Skills는 official docs, GitHub `convert-web-app` SKILL.md, Testing MCP Apps docs, 기존 MCP Apps install audit와 OWASP LLM Top 10 note로 교차 확인했습니다.

## Ethan Can Use This Immediately

- 디자인 시스템을 고를 때 "예쁜 컴포넌트가 있나"보다 `token taxonomy`, `theme sync`, `WCAG QA 연결`, `runtime/package risk`를 같이 보시면 됩니다.
- Shopify 계열 화면은 Polaris React 문서를 그대로 쓰기 전에 Web Components가 현재 기본 경로인지 확인하시면 됩니다.
- MCP Apps 전환을 검토할 때는 "skill을 설치할까"가 아니라 "이 프로젝트에 MCP App UI가 실제로 필요한가, host와 CSP/CORS와 permission이 정의됐는가"부터 보시면 됩니다.
- iframe/host 기반 UI는 theme sync가 접근성과 직결되므로 dark mode만 확인하지 말고 focus, contrast, labels, keyboard path까지 확인하시면 됩니다.

## Improvement Delta

- 직전 `eligible-next=23`을 `eligible-next=10`으로 줄였습니다. 새 저장 5개와 stale duplicate/stored 상태 정정으로 queue 품질을 높였습니다.
- 디자인 시스템 평가 기준을 "tokens가 있다"에서 "global/alias/semantic token 계층, host theme sync, component accessibility, service-level WCAG QA"로 좁혔습니다.
- MCP Apps Agent Skills는 설치 후보 목록에 남겨두는 대신 `conditional-reference`와 `install-audit-conditional`로 구분했습니다.
- React Polaris처럼 deprecated surface가 섞인 자료는 최신 공식 경로와 legacy 경로를 분리하는 규칙을 추가했습니다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next` 최소 5개 감소 기준을 충족했습니다. 현재 `eligible-next=10`입니다.
- done: `install-audit-next` 중 MCP Apps Agent Skills와 `convert-web-app`를 설치 없이 재판정했습니다.
- done: vendor comparison source는 bias/provenance note 없이 source note로 승격하지 않았습니다.
- done: Threads는 재시도했으나 신뢰 가능한 공개 원문을 확보하지 못해 blocked/not checked로 분리했습니다.
- carried: MCP Apps pdf-server example은 아직 설치 감사가 남아 있습니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| `eligible-next=23` reduction | carried | done | queue count now `eligible-next=10` |
| MCP Apps Agent Skills | install-audit-next | done | new install-audit source note created; no install |
| ext-apps `convert-web-app` skill | install-audit-next | done | conditional install decision recorded; no install |
| Design-system general candidates | carried | done | Fluent, Spectrum, Shopify, Atlassian notes added; Material/Carbon/GOV.UK duplicates reclassified |
| Threads public SNS check | carried | blocked | reliable public source not obtained |

## Next Eval

다음 실행은 아래 기준을 통과해야 합니다.

1. 남은 `eligible-next=10` 중 최소 3개를 stored, duplicate, carried, dropped 중 하나로 재판정합니다.
2. 남은 `install-audit-next=1`인 MCP Apps pdf-server example을 설치 없이 `conditional / blocked / dropped / not checked`로 재판정합니다.
3. Microsoft Agent Framework docs hub와 Semantic Kernel docs hub는 기존 source로 충분한지, 아니면 hub-level note가 필요한지 결정합니다.
4. 새 source note를 만들기 전에는 21:03에서 저장한 5개와 중복되지 않는지 먼저 확인합니다.

## Prompt or Template Patch Candidate

```text
during Growth Scan design-system passes, classify each candidate as token taxonomy, accessibility QA, runtime package, host/theme integration, or general inspiration. Promote only if at least one operational category is clear.

during MCP Apps or skill passes, do not keep "install candidate" as a vague state. Record one of: conditional-reference, install-audit-conditional, install-audit-blocked, dropped, or not-checked. Never install during the scan.
```

## Questions / Tracking Candidates

- 다음 실행에서 MCP Apps pdf-server example을 example-level audit로 내릴지, 아니면 현재 Dex Company PDF workflow가 충분하므로 dropped로 둘지 결정해야 합니다.
- Microsoft Agent Framework hub와 Semantic Kernel hub는 이미 specific source가 있으므로 중복 저장보다 map/wiki note가 더 나은지 확인해야 합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement model checked |
| Recent reports checked | passed | 20:33, 20:00, 19:34 reports inspected |
| Public web search | passed | Microsoft, Adobe, Shopify, Atlassian, MCP Apps, GitHub, Threads attempted |
| Duplicate check | passed | `rg` over LLM Wiki and inbox before writing |
| Queue reclassification | passed | `eligible-next=10`, `install-audit-next=1` |
| Source schema | passed | fallback schema check returned 0 warnings |
| Status script | passed | `llm-wiki-status.ps1` completed |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | New/modified Korean Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install commands run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Adobe Spectrum text extraction was partial, and MCP Apps runtime compatibility was not tested.
- Mitigation: confidence was lowered where extraction was limited, and MCP Apps remained no-install with explicit OWASP risk classification.
- Not checked: package installs, MCP host runtime, cloudflared/tunnel testing, Shopify app build, Fluent/Atlassian package execution, independent verification of Atlassian self-reported accessibility impact.
