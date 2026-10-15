---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Queue Cleanup PDF Audit - 2026-07-03 21:33 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T21:33:09+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
confidence: medium
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

# Dex Company Growth Scan Queue Cleanup PDF Audit - 2026-07-03 21:33 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 21:33 KST
- 검색 범위: automation memory, current workspace, Vault AGENTS/Dex Company/role routing/LLM Wiki guide/index/log/improvement model, recent 21:03/20:33/20:00 reports, 10x candidate queue, OpenAI Codex config reference, MCP Apps PDF server README/package metadata, Storybook Vitest addon, Obsidian CLI help, NN/g AI index, OWASP LLM Top 10, W3C WCAG 2.2 overview, Threads search snippets.
- 실행 초점: 직전 Next Eval의 `eligible-next=10` 중 최소 3개 재판정, 남은 `install-audit-next=1`인 MCP Apps PDF server example 설치 감사, 과잉 source note 저장 방지.
- 제외: X는 제외했습니다. package, MCP server, browser extension, skill, plugin, framework는 설치하지 않았습니다.
- 저작권 처리: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단만 저장했습니다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 16 |
| stored.count | 1 |
| duplicate.count | 6 |
| deferred.count | 4 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. 이번 실행은 새 자료 수집보다 큐 위생이 더 중요했습니다. 직전 실행에서 이미 저장된 Codex config, Storybook Vitest, Obsidian CLI, Microsoft Agent Framework/Semantic Kernel hub 후보가 큐에 남아 있어 중복으로 재분류했습니다.
2. MCP Apps PDF server example은 Dex Company PDF 업무와 연결될 수 있지만, local roots, remote URL fetch, model context update, annotation save, file overwrite가 모두 포함되어 설치 기본값으로 두면 위험합니다.
3. OpenAI Codex config reference는 이미 source note가 있으므로 새 note를 만들지 않았습니다. 다만 official docs 기준으로 project-scoped config가 일부 user-level/provider/telemetry 키를 override하지 못한다는 점은 Dex Company config 판단에 계속 중요합니다.
4. Storybook Vitest addon은 이미 저장된 component test source로 충분합니다. WCAG 2.2 QA에는 직접 접근성 conformance를 보장하지 않고, component interaction evidence와 Accessibility addon/axe 계열 검증을 함께 써야 합니다.
5. Threads 검색은 공개 snippets만 확보됐고 신뢰 가능한 원문/공식 출처로 승격할 수 없었습니다. 이번에도 discovery-only, blocked/not checked로 유지합니다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-mcp-apps-pdf-server-example-audit.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 1 install-audit source note |
| Inbox queue | Reclassified stale queue rows |
| Queue count | `eligible-next=4`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=8`, `not-checked=8`, `install-audit-next=0`, `audit-done=4` |
| Index | Added PDF server audit source and this report link |
| Log | Added this 21:33 scheduled growth scan entry |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| MCP Apps PDF server example | official GitHub README | source-backed: PDF viewer, chunking, local roots, allowed sources, save/annotation/test surfaces; Dex inference: conditional reference only; not checked: runtime/package install | high |
| Codex configuration reference | official OpenAI docs | source-backed: existing source note and current docs; Dex inference: queue item was stale; not checked: local config audit | high |
| Storybook Vitest addon | official Storybook docs | source-backed: existing source note and current docs; Dex inference: duplicate queue item; not checked: project runtime | high |
| Obsidian CLI help | official Obsidian docs | source-backed: existing source note and current docs; Dex inference: duplicate queue item; not checked: local CLI enabled state | high |
| Microsoft Agent Framework / Semantic Kernel hubs | official Microsoft docs | source-backed: existing overview and specific Semantic Kernel agent source; Dex inference: hub-level candidates are covered enough for now; not checked: SDK install | medium |
| Threads public search snippets | public SNS snippets | source-backed: search snippets only; Dex inference: discovery-only; not checked: reliable source page extraction | low |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| MCP Apps PDF server example | install-audit-conditional | No | Useful reference for interactive PDF viewing, but local roots, remote URLs, save/overwrite, model context, package provenance, and host compatibility require project-level review. |
| `@modelcontextprotocol/server-pdf` via `npx` | install-audit-conditional | No | README suggests remote package execution. Automation scan must not execute it without version pinning, package audit, and Ethan approval. |
| HTTP `interact` mode | install-audit-blocked-by-default | No | In-memory command queue and remote/local root ambiguity make it unsuitable as a default deployment pattern. |

## Duplicate / Rejected / Deferred

- duplicate/stored: Codex configuration reference was already in `2026-07-03-openai-codex-configuration-reference`.
- duplicate-in-queue: Design Tokens Community Group press kit item 27 duplicates item 95 and existing W3C design token source context.
- duplicate/stored: Storybook Vitest addon item 52 is already represented by `2026-07-03-storybook-vitest-addon`.
- duplicate/stored: Obsidian CLI help item 56 is already represented by `2026-07-03-obsidian-cli-help`.
- duplicate-source: Microsoft Agent Framework docs hub item 68 is covered by `2026-07-03-microsoft-agent-framework-overview`.
- duplicate-source: Semantic Kernel docs hub item 69 is covered by `2026-07-03-microsoft-semantic-kernel-agent-framework`.
- deferred/carried: MCP Apps issues list and three issue/discussion candidates remain as `eligible-next=4` because they may reveal maturity/UX limits but need exact issue freshness checks.

## Failure / Blocked / Not Checked

- Threads did not produce a reliable source-backed page suitable for LLM Wiki promotion; snippets were treated as discovery-only.
- MCP Apps PDF server package metadata was not fully audited through the web tool; no install or dependency resolution was run.
- No local Codex config, local Obsidian CLI enabled state, Storybook/Vitest runtime, Microsoft SDK runtime, or MCP host compatibility test was run.
- Existing older reports still display mojibake in the PowerShell console output, but this run checked new/modified files for U+FFFD replacement characters and found none.

## Cross Verification Evidence

- MCP Apps PDF server audit used official GitHub README/raw content and was cross-checked against existing MCP Apps overview, CSP/CORS, permissions API, Agent Skills audit, and OWASP LLM Top 10 notes.
- Codex config queue cleanup was cross-checked against the existing source note, OpenAI official config reference, and current LLM Wiki index.
- Storybook Vitest duplicate cleanup was cross-checked against Storybook official docs and the existing Storybook Vitest source note.
- Obsidian CLI duplicate cleanup was cross-checked against Obsidian official help and the existing Obsidian CLI source note.
- WCAG mapping was kept indirect for Storybook Vitest: component tests provide interaction evidence, while WCAG conformance still needs accessibility-specific checks.

## Ethan Can Use This Immediately

- PDF 업무를 MCP App으로 옮기고 싶을 때는 "PDF가 보인다"보다 먼저 "local root를 어디까지 허용할지, 원격 PDF URL을 허용할지, 저장/덮어쓰기를 누가 승인할지"를 결정하시면 됩니다.
- Dex Company 큐를 볼 때 `eligible-next=4`만 다음 실행의 실제 판단 대상으로 보면 됩니다. 이미 저장된 공식 문서 후보는 새 note로 반복 저장하지 않아도 됩니다.
- Storybook/Vitest는 접근성 통과 증거가 아니라 component state/interaction test 증거로 쓰고, WCAG 2.2 확인은 Accessibility addon, axe, keyboard/focus, error state 검증과 분리하시면 됩니다.

## Improvement Delta

- `install-audit-next=1`을 0으로 줄였습니다. MCP Apps PDF server example은 `audit-done`이며 설치는 여전히 금지/조건부입니다.
- `eligible-next=10`을 `eligible-next=4`로 줄였습니다. 이번 감소는 새 자료 저장보다 중복 정리와 stale status correction에 가깝습니다.
- 설치 후보 표현을 더 구체화했습니다: `install-audit-conditional`, `install-audit-blocked-by-default`, `audit-done`으로 분리했습니다.
- 다음 실행이 다뤄야 할 범위를 MCP Apps issues/discussions 4개로 좁혔습니다.

## Adoption Check

- done: 직전 Next Eval의 "remaining `eligible-next=10` 중 최소 3개 재판정" 기준을 초과 달성했습니다. 6개를 재판정했고 현재 `eligible-next=4`입니다.
- done: 직전 Next Eval의 "remaining `install-audit-next=1` MCP Apps pdf-server example 재판정"을 완료했습니다.
- done: 새 source note 만들기 전에 21:03 저장 자료와 큐 중복을 먼저 확인했습니다.
- carried: MCP Apps issues/discussions의 실제 maturity signal 판정은 다음 실행으로 넘겼습니다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| MCP Apps pdf-server example | install-audit-next | done | new install-audit source note created; no install |
| Codex configuration reference | eligible-next stale | done | existing source note found; queue set to stored-source |
| Storybook Vitest addon | eligible-next stale | done | existing source note found; queue set to stored-source |
| Obsidian CLI help | eligible-next stale | done | existing source note found; queue set to stored-source |
| Microsoft Agent Framework docs hub | eligible-next | done | existing overview source covers hub sufficiently for now |
| Semantic Kernel docs hub | eligible-next | done | existing specific Semantic Kernel Agent Framework source covers current need |

## Next Eval

다음 실행은 아래 기준을 통과해야 합니다.

1. 남은 `eligible-next=4`인 MCP Apps issues/discussions 후보를 각각 `stored-source`, `duplicate-source`, `carried`, `dropped`, `blocked` 중 하나로 재판정합니다.
2. ext-apps issues/discussions를 확인할 때는 issue date, current open/closed state, maintainer response, reproducibility, Dex Company operational relevance를 분리합니다.
3. 새 source note가 필요 없다면 no-op 또는 short cleanup report로 끝내고, 낮은 가치의 반복 source note를 만들지 않습니다.
4. Threads는 신뢰 가능한 공개 원문을 열 수 있을 때만 승격하고, snippet만 있으면 계속 blocked/not checked로 유지합니다.

## Prompt or Template Patch Candidate

```text
During 30-minute Growth Scan runs, check stale queue states before promoting new sources. If an eligible item is already represented in index/log/source notes, reclassify it first and count it as duplicate cleanup, not a new discovery.

For MCP Apps examples, classify install risk by file access, remote URL access, model-context exposure, write/overwrite behavior, transport mode, package execution, and host compatibility. Never run npx/bun/npm during the scan without Ethan approval.
```

## Questions / Tracking Candidates

- MCP Apps issues list, pinned/split-screen issue, sampling discussion, and JSON-LD discovery discussion should be one focused maturity scan next time.
- If PDF workflow becomes a real Dex Company need, decide whether the default should stay local PDF tooling or move to an interactive MCP App viewer after a project-specific security review.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement model checked |
| Recent reports checked | passed | 21:03, 20:33, 20:00 reports inspected |
| Public web search | passed | OpenAI, MCP Apps/GitHub, Storybook, Obsidian, NN/g, OWASP, W3C, Threads searched |
| Duplicate check | passed | `rg` checked source/index/queue before writing |
| Queue reclassification | passed | `eligible-next=4`, `install-audit-next=0` |
| Source schema | passed | fallback schema check returned 0 warnings |
| Status script | passed | `llm-wiki-status.ps1` completed; source notes count is 87 |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | New/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install commands run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: MCP Apps PDF server is useful but touches local files, remote PDFs, model context, and write paths; it must remain no-install until a project-specific review.
- Mitigation: classified as `install-audit-conditional` / `install-audit-blocked-by-default`, no execution was run, and queue was reduced without over-promoting duplicates.
- Not checked: package install, MCP host runtime, Codex Desktop compatibility, PDF rendering, annotation persistence, local Obsidian CLI enabled state, Storybook/Vitest runtime, reliable Threads source extraction.
