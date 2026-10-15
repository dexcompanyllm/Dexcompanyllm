---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Official Docs Reduction - 2026-07-03 20:33 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T20:33:16+09:00
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

# Dex Company Growth Scan Official Docs Reduction - 2026-07-03 20:33 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 20:33 KST
- 검색 범위: 직전 20:00 report, 19:34/19:21 report, 10x candidate queue, GitHub Docs MCP tutorial, Microsoft Learn Semantic Kernel/Agent Framework, VA.gov/GC/Atlassian design tokens, Storybook Next.js Vite, Vite releases, Vitest 4.1, Threads search 접근.
- 실행 초점: 직전 Next Eval의 `eligible-next=33`에서 최소 5개를 줄이고, design-system general/token 후보와 frontend testing 후보를 공식 문서 중심으로 재판정했습니다.
- 제외: X는 제외했습니다. 실행 코드, package, MCP server, plugin, browser extension, skill은 설치하지 않았습니다.
- 저작권 처리: 원문 전체 복사 없이 URL, 메타데이터, 확인 범위, 요약, Dex Company 사용 예시만 저장했습니다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 19 |
| stored.count | 8 |
| duplicate.count | 2 |
| deferred.count | 4 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. GitHub의 MCP agent mode tutorial은 MCP를 "많이 붙이는 능력"보다 목표, 경계, 최소 권한, OAuth, 연결 감사, 활동 모니터링으로 통제해야 한다는 근거를 제공합니다.
2. Microsoft Semantic Kernel/Agent Framework 문서는 agent를 modular components, human input, process orchestration으로 설명해 Dex Company 역할형 workflow와 잘 맞습니다.
3. GC/VA/Atlassian token 문서는 design token이 정적 색상표가 아니라 component/global/base 구분, theme sync, accessibility QA와 함께 운영되어야 함을 보여줍니다.
4. Storybook Next.js Vite, Vite releases, Vitest 4.1은 frontend QA에서 story, browser trace, release currentness, build tool drift를 분리해 기록해야 한다는 신호입니다.
5. Threads는 이번 실행에서 공개 검색 신호로 직접 확인하지 못했습니다. 로그인/동적 차단 가능성이 있어 `blocked/not checked`로 남겼습니다.

## Stored / Absorbed Sources

- `2026-07-03-github-copilot-agent-mode-mcp-tutorial.md`
- `2026-07-03-microsoft-semantic-kernel-agent-framework.md`
- `2026-07-03-va-design-system-design-tokens.md`
- `2026-07-03-gc-design-system-design-tokens.md`
- `2026-07-03-atlassian-trello-design-tokens.md`
- `2026-07-03-storybook-nextjs-vite.md`
- `2026-07-03-vite-github-releases.md`
- `2026-07-03-vitest-41-browser-trace.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 8 source notes |
| Inbox queue | Reclassified 10 stored/duplicate queue items; `eligible-next` is now 23 |
| Index | Added 8 source links and this report link |
| Log | Added this 20:33 scheduled growth scan entry |
| Automation memory | Updated after QA |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| GitHub MCP server usage patterns | conditional | No | Requires task-specific MCP server, OAuth scope, tool allowlist, secret handling, audit logging. |
| Microsoft Semantic Kernel / Agent Framework | conditional | No | Requires SDK/package audit, credential boundary, telemetry and data-retention review. |
| Storybook Next.js Vite | conditional | No | Requires project Next.js/Vite version check, package audit, CI build/test, rollback plan. |
| Vite / Vitest upgrade | conditional | No | Requires lockfile diff, Node compatibility, plugin compatibility, browser trace artifact handling. |
| Atlassian/Trello token runtime | conditional | No | Host iframe, CSP, theme subscription, package/license, accessibility regression must be checked. |

## Duplicate / Rejected / Deferred

- duplicate-in-queue: Vite releases item 87 was covered by the stored item 49 source note.
- duplicate-covered: Atlassian design tokens item 81 is covered by the Trello official implementation source note for this run, but a direct Atlassian token reference deep dive can be revisited if extraction improves.
- deferred: Microsoft Agent Framework docs hub item 68 and Semantic Kernel docs hub item 69 remain broader hubs; this run stored the more specific Semantic Kernel Agent Framework page.
- deferred: Storybook Vitest addon item 52 remains covered by the existing source note and the new Vitest 4.1 release source; no new duplicate note was created.
- rejected: none permanently.

## Failure / Blocked / Not Checked

- Threads direct search/open attempt did not produce a reliable public thread source in this run; it remains blocked/not checked.
- Atlassian Design Tokens reference page itself returned limited extractable text through the tool; Atlassian Developer Trello guide was used as the official extractable implementation source.
- Vite GitHub release page had some dynamic loading/error regions; release list and latest tag were visible, full compare/assets were not checked.
- No package, MCP server, plugin, skill, or browser extension was installed.

## Cross Verification Evidence

- GitHub MCP tutorial was cross-checked with existing GitHub MCP source notes and OWASP LLM risk categories.
- Semantic Kernel Agent Framework was cross-checked with existing Microsoft Agent Framework overview and Microsoft migration guide.
- GC tokens were cross-checked with GC start-to-use page, existing W3C Design Tokens, USWDS, GOV.UK, Carbon, and WCAG notes.
- VA tokens were cross-checked with existing public-service design system and WCAG notes.
- Storybook Next.js Vite was cross-checked with existing Storybook 9, Storybook Vitest addon, Storybook accessibility, and GitLab accessibility notes.
- Vite releases and Vitest 4.1 were cross-checked with Vite release policy and Storybook/Vitest source notes.

## Ethan Can Use This Immediately

- MCP 후보를 볼 때 "설치할까요?"보다 먼저 "OAuth인가, 최소 권한인가, 연결 감사가 가능한가, agent가 어떤 도구까지 쓸 수 있는가"를 체크하시면 됩니다.
- 디자인 시스템을 볼 때 "토큰이 있다"만 보지 말고 component/global/base 구분, theme sync, focus/contrast/accessibility 테스트 연결 여부를 보시면 됩니다.
- Next.js 프론트 QA에서는 Storybook `nextjs-vite`, Vitest browser trace, Playwright/axe를 각각 "상태별 story", "상호작용 증거", "WCAG 검증"으로 역할 분리하시면 됩니다.
- Vite/Vitest 같은 build/test tool은 최신 버전 여부보다 release/changelog/npm stable/Node compatibility/lockfile diff를 함께 보는 쪽이 안전합니다.

## Improvement Delta

- 직전 Next Eval의 `eligible-next=33` 축소 기준을 충족했습니다. 이번 실행에서 10개 queue item을 stored/duplicate로 재분류했고, 현재 `eligible-next=23`입니다.
- 디자인 토큰 평가 기준을 "token existence"에서 "semantic token type, theme runtime, accessibility QA linkage"로 좁혔습니다.
- frontend QA evidence model에 Vitest browser trace marker와 Storybook Next.js Vite 사전 점검 항목을 추가했습니다.
- MCP/agent 자료는 설치 후보가 아니라 최소 권한과 도구 경계가 있는 workflow 자료로 흡수했습니다.

## Adoption Check

- done: `eligible-next=33`에서 최소 5개를 줄이는 기준을 10개 재분류로 충족했습니다. 현재 `eligible-next=23`입니다.
- done: design-system general/token 후보 중 GC, VA, Atlassian을 공식 문서 기반으로 재판정했습니다.
- done: Threads 접근은 시도했고, 신뢰 가능한 공개 source로 확인하지 못해 blocked/not checked로 기록했습니다.
- done: installable 후보는 모두 conditional/no-install로 유지했습니다.
- carried: Atlassian Design Tokens reference 자체는 추출이 제한되어 Trello implementation source로만 partial 저장했습니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Design-system general/token candidates | carried | done | GC, VA, Atlassian token sources added |
| `eligible-next=33` reduction | carried | done | 10 queue items reclassified; current `eligible-next=23` |
| Threads public SNS check | carried | blocked | direct Threads search/open did not yield reliable source |
| Storybook/Vite frontend candidates | carried | done | Storybook Next.js Vite, Vite releases, Vitest 4.1 sources added |

## Next Eval

다음 실행은 아래 기준을 통과해야 합니다.

1. 남은 `eligible-next`를 다시 계산하고 최소 5개를 stored, duplicate, carried, dropped 중 하나로 재판정합니다.
2. install-audit-next 항목 중 MCP Apps Agent Skills 또는 ext-apps convert-web-app skill 하나를 `pass / conditional / blocked / not checked`로 재판정하되 설치는 하지 않습니다.
3. vendor comparison source는 bias/provenance note 없이는 source note로 승격하지 않습니다.
4. Threads는 다시 시도하되, 접근 차단이면 정확한 차단 상태를 no-op report에 남깁니다.

## Prompt or Template Patch Candidate

```text
For design-token sources, do not store "has tokens" as the only finding. Record token taxonomy, runtime theme behavior, accessibility QA linkage, and whether WCAG evidence is direct or indirect.

For frontend testing sources, classify each item as build-tool currentness, component-state coverage, interaction trace evidence, accessibility automation, or visual regression. Do not treat one category as proof of the others.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki index/log, improvement model checked |
| Recent reports checked | passed | 20:00, 19:34, 19:21 reports inspected |
| Public web search | passed | GitHub, Microsoft, VA, GC, Atlassian, Storybook, Vite, Vitest, Threads attempted |
| Duplicate check | passed | `rg` checked sources/wiki/inbox before writing |
| Source schema | passed | fallback schema check returned 0 warnings |
| Status script | not checked | `llm-wiki-status.ps1` was not found in searched local roots |
| Lint script | not checked | `llm-wiki-lint.ps1` was not found in searched local roots |
| UTF-8 scan | passed | New/modified Korean Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install commands run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: official llm-wiki status/lint scripts were unavailable, so fallback schema lint was used.
- Mitigation: source frontmatter, `## Original Content`, queue/index/log/report updates, and UTF-8 replacement scan were checked.
- Not checked: actual package installs, MCP runtime, Storybook/Vite/Vitest project execution, Threads source extraction, full Atlassian token reference extraction.
