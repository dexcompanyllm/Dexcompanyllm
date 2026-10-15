---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan 10x Expansion - 2026-07-03 19:21 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T19:21:25+09:00
runMode: goal-continuation-10x-volume
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
  - 10x
---

# Dex Company Growth Scan 10x Expansion - 2026-07-03 19:21 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 19:21 KST
- 목표: 에던님이 정정한 "자료를 10배 많이 모으기" 기준에 맞춰 10x queue를 90개 이상으로 확장하고, 최소 10개 후보를 source note로 승격한다.
- 검색 범위: OpenAI Codex 공식 문서, MCP Apps 공식 문서, GitHub/Microsoft agent docs, design systems, frontend testing, Obsidian CLI, UX research reports.
- 제외: X는 제외. Threads는 이번 continuation에서 별도 확인하지 않았다.
- 제한: source note 10개 승격은 완료했지만, 남은 85개 후보 전체를 모두 source/reject로 끝내지는 않았다.

## Core Findings

1. 10x queue는 60개에서 95개로 확장되어 90+ 후보 기준을 통과했다.
2. 10개 후보를 source note로 승격했다. 승격 대상은 공식 문서 중심이라 provenance가 강하다.
3. MCP Apps는 설치 판단이 계속 "후보"에 머무르지 않도록 overview와 CSP/CORS를 별도 source로 보강했다.
4. Codex 운영 쪽은 best practices, config, MCP, automations, subagents를 source로 보강했다.
5. 남은 후보 중 installable 항목은 여전히 실제 설치 전 project-specific audit과 에던님 승인이 필요하다.

## Metrics

| Metric | Value |
|---|---:|
| candidate_target.count | 90+ |
| candidate_seen.count | 95 |
| promoted.source.count | 10 |
| queue.previous.count | 60 |
| queue.delta.count | 35 |
| install_now.count | 0 |
| install_audit_done.count | 1 |
| install_blocked_or_conditional.count | 6 |

## Stored / Absorbed Sources

- `2026-07-03-openai-codex-best-practices.md`
- `2026-07-03-openai-codex-configuration-reference.md`
- `2026-07-03-openai-codex-mcp.md`
- `2026-07-03-openai-codex-automations.md`
- `2026-07-03-openai-codex-subagents.md`
- `2026-07-03-mcp-apps-overview.md`
- `2026-07-03-mcp-apps-csp-cors.md`
- `2026-07-03-uswds-design-tokens.md`
- `2026-07-03-storybook-vitest-addon.md`
- `2026-07-03-obsidian-cli-help.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Source notes | Added 10 source notes |
| Inbox queue | Expanded 60 items to 95 items |
| Index | Added 10 new source links |
| Log | Added continuation entry |
| Automation memory | Updated with 19:21 continuation summary |
| Automation prompt | Added 2026-07-03 10x volume correction block to `automation.toml` |

## Install Candidates / Skill Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| `@modelcontextprotocol/ext-apps` SDK | conditional | No | Project-specific use case, target host/client, package audit, CSP/CORS, permissions, auth, rollback, Ethan approval needed. |
| MCP Apps full repo | blocked | No | Repo dev/example audit risks and broad scripts. |
| MCP Apps agent skills | blocked | No | Claude Code plugin flow, Codex compatibility not proven. |
| MCP Apps examples | conditional | No | Per-example dependency and permission audit needed. |
| Codex subagents | knowledge-only | No | No install. Candidate for future 10x scan parallelization. |
| Storybook Vitest addon | knowledge-only now | No | Would require project-specific frontend stack and package audit. |

## Duplicate / Rejected / Deferred

- duplicate: existing OpenAI Cookbook Goals, Codex changelog, OpenAI web search, W3C Design Tokens, React blog, Playwright release notes, Obsidian changelog/roadmap/Bases.
- deferred: Microsoft Agent Framework, GitHub custom agents, LangChain/Langfuse comparisons, Material/Carbon/Atlassian/GC design tokens, Maze/NNG/Dovetail/Great Question UX research sources.
- rejected now: none permanently. Vendor comparisons remain `not-checked` or discovery-only until bias/provenance review.

## Cross Verification

- OpenAI Codex sources were cross-checked across best practices, config reference, MCP, automations, subagents, skills, and existing Goals source.
- MCP Apps sources were cross-checked across official overview, CSP/CORS, permissions docs, GitHub repo, npm metadata, and install audit.
- USWDS tokens were cross-checked against existing W3C Design Tokens source and queued VA/GC/Material token candidates.
- Storybook Vitest addon was cross-checked against existing Storybook accessibility source and Storybook Next.js/Vite queued candidate.
- Obsidian CLI was cross-checked against existing Obsidian changelog and roadmap/Bases sources.

## Ethan Can Use This Immediately

- "10배 수집이 됐나?"는 이제 `candidate_seen.count = 95`로 답할 수 있다.
- "그중 실제로 좋은 자료가 흡수됐나?"는 `promoted.source.count = 10`으로 답할 수 있다.
- MCP Apps는 "설치 안 함"이 아니라 "SDK-only 조건부 가능, 전체 repo/plugin/examples는 보류/차단"으로 판단하면 된다.
- 다음에는 queue의 `eligible-next`를 계속 줄이는 방식으로 성장 스캔을 이어가면 된다.

## Improvement Delta

- 10x 기준이 말뿐인 정정에서 실제 95개 후보 큐로 바뀌었다.
- 후보 큐와 source note 승격이 분리되어 과잉 저장을 줄인다.
- MCP Apps 설치 판단을 overview/CSP 문서로 보강해 "왜 조건부인가"가 더 선명해졌다.
- Codex automation, MCP, subagents source가 추가되어 다음 스캔 자동화 개선 근거가 늘었다.

## Adoption Check

- done: 10x queue를 90개 이상으로 확장했다.
- done: 최소 10개 high-value 후보를 source note로 승격했다.
- done: OpenAI Cookbook 반복 수리 루프는 기존 source note로 중복 확인했다.
- done: MCP Apps는 계속 후보로 둔 것이 아니라 install audit과 official docs source로 판단을 강화했다.
- carried: 남은 queue 후보의 source 승격/제외를 계속 진행해야 한다.
- carried: 실제 MCP Apps SDK 설치는 구체 프로젝트와 에던님 승인이 있어야 가능하다.

## Next Eval

다음 실행은 아래 기준을 통과해야 한다.

1. 95개 후보 중 `eligible-next`를 최소 10개 더 줄인다.
2. vendor comparison 자료는 `bias note` 없이는 source note로 승격하지 않는다.
3. installable 후보는 `pass / conditional / blocked / not checked` 상태를 반드시 유지한다.
4. MCP Apps SDK-only 설치를 검토할 경우 target project와 rollback plan을 먼저 만든다.
5. report QA는 status/lint/UTF-8 검증 후 결과로 갱신한다.

## Prompt or Template Patch Candidate

```text
In 10x Growth Scan, candidate queue size must be reported explicitly. A run that only improves report quality without expanding candidate count does not satisfy Ethan's 10x volume request.

For every 10x continuation, update: candidate_seen.count, promoted.source.count, duplicate.count, install_audit.count, and remaining eligible-next count.

Do not install MCP Apps globally. If a specific project needs MCP Apps, run a project install gate first: use case, host/client, SDK package audit, permissions, CSP/CORS, auth, storage, rollback, Ethan approval.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Queue 90+ | passed | Candidate table count verified as 95 |
| Source notes 10 | passed | All 10 promoted source files exist |
| Source schema | passed | `llm-wiki-lint.ps1` completed with 0 warnings |
| Index/log | passed | `index.md` and `log.md` updated with new sources/report |
| Automation memory | passed | `dex-company-growth-scan/memory.md` appended with 19:21 continuation |
| Automation prompt | passed | `automation.toml` contains `10x volume correction 2026-07-03` block |
| Status script | passed | `llm-wiki-status.ps1` passed; source notes now 53 |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warnings |
| UTF-8 scan | passed | Checked queue, report, memory, and 10 source files; no replacement character found |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: the 95-item queue still contains vendor comparison and secondary-index material that should not be promoted without bias/provenance notes.
- Current mitigation: only 10 official/high-value items were promoted; weaker candidates remain queue items.
- Not checked: Threads, MCP Apps e2e tests, Codex Desktop MCP Apps host runtime, actual SDK install.
