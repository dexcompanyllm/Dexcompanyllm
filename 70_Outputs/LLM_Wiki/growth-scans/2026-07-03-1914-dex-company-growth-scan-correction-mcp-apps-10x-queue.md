---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Correction, MCP Apps Audit, and 10x Candidate Queue - 2026-07-03 19:14 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T19:14:32+09:00
runMode: user-correction-continuation
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
  - mcp-apps
---

# Dex Company Growth Scan Correction, MCP Apps Audit, and 10x Candidate Queue - 2026-07-03 19:14 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 19:14 KST
- 실행 이유: 에던님이 10배 성과의 의미를 정정했고, MCP Apps를 계속 후보로만 두지 말고 판단이 설 때까지 분석하라고 지시하셨다.
- 검색 범위: OpenAI Codex/Cookbook 공식 문서, MCP Apps 공식 GitHub/npm/docs/spec, MCP authorization/security, design systems, UX research, frontend testing, Obsidian changelog/CLI/roadmap.
- 실행한 인터넷 확인: OpenAI Developers, MCP Apps docs/GitHub, npm registry, Obsidian, NN/g, Storybook, W3C, USWDS, Maze 등 공개 자료 검색.
- 제한: 10배 목표 전체인 90+ 후보까지는 아직 완료하지 않았다. 이번 실행은 60개 후보 큐를 만들고, MCP Apps 판단을 후보 상태에서 감사 결과 상태로 끌어올린 중간 진전이다.

## Today's Core Findings

1. 18:42 보고서의 10배 해석은 틀렸다. 10배는 운영 품질 은유가 아니라 **자료 후보 수집량 10배**다.
2. MCP Apps는 더 이상 막연한 후보가 아니다. SDK-only는 특정 프로젝트에서 조건부 가능, full repo/global plugin/examples 설치는 현재 blocked/conditional이다.
3. MCP Apps 전체 저장소 개발환경은 `npm audit --package-lock-only` 기준 8개 취약점이 있어 그대로 설치/실행하면 안 된다.
4. MCP Apps의 실제 위험은 SDK 하나보다 examples, skills, system monitor, auth sample, broad scripts, CSP/CORS/permission 처리에 있다.
5. 10배 수집은 source note 60개를 무작정 만드는 일이 아니라, 60-120개 후보를 먼저 큐화하고 중복/승격/제외/설치감사로 나누는 흐름이 맞다.

## Stored / Absorbed

- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company 10x Growth Scan Operating Model.md`
  - 10배 기준을 자료량 10배로 정정했다.
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-mcp-apps-install-audit.md`
  - MCP Apps 설치 판단을 source-backed audit note로 저장했다.
- `00_Inbox/LLM_Wiki/ai-research/2026-07-03-10x-growth-scan-candidate-queue.md`
  - 60개 후보 큐를 저장했다.
- `70_Outputs/LLM_Wiki/growth-scans/2026-07-03-1842-dex-company-growth-scan-10x.md`
  - 기존 보고서에 Correction Notice를 추가하고 status를 `corrected`로 바꿨다.
- `30_Knowledge/LLM_Wiki/index.md`
  - 새 audit note와 10x queue 링크를 추가했다.
- `30_Knowledge/LLM_Wiki/log.md`
  - 정정/감사/큐 생성 기록을 append했다.
- `D:\Program Files\Codex\automations\dex-company-growth-scan\memory.md`
  - 다음 자동화가 잘못된 18:42 해석을 반복하지 않도록 durable memory를 갱신했다.

## LLM Wiki Inbox / Source / Wiki Changes

| Area | Change |
|---|---|
| Inbox | 60-item 10x candidate queue added |
| Sources | MCP Apps install audit source note added |
| Wiki | 10x operating guide replaced with corrected volume-first model |
| Outputs | 18:42 report corrected; this 19:14 continuation report added |
| Index/log | New artifacts linked and logged |
| Automation memory | Correction and MCP Apps decision recorded |

## MCP Apps Install Candidate Decision

| Target | Decision | Install Now? | Reason |
|---|---|---:|---|
| `@modelcontextprotocol/ext-apps` SDK inside a specific project | conditional | No | Needs concrete use case, target host/client, target package audit, CSP/CORS, permissions, auth, rollback, Ethan approval. |
| Full `modelcontextprotocol/ext-apps` repo dev environment | blocked | No | Repo audit found vulnerabilities and broad scripts; full install has unnecessary attack surface. |
| `plugins/mcp-apps/skills` as active Codex skills | blocked | No | Published flow is Claude Code plugin-oriented; Codex compatibility not proven. |
| Individual examples | conditional | No | Each example needs separate dependency/permission/data audit. |
| System monitor example | blocked | No | Reads host/system information. |
| Lazy auth example | conditional | No | Auth/secret handling must be project-specific. |

## Duplicate / Excluded

- Duplicate source coverage: OpenAI Cookbook goals/repair loop, OpenAI web search controls, Codex changelog, MCP security, MCP Apps official repo, W3C design tokens, NN/g AI UX index, React official blog, Playwright release notes, Storybook accessibility, Obsidian changelog/roadmap/Bases.
- Excluded as install now: MCP Apps full repo, global MCP Apps plugin/skills, examples bundle.
- Not promoted yet: 60-item queue items that were only search-result verified remain inbox, not source notes.

## Failures / Blocked / Not Checked

- 10배 target of 90+ candidates is not complete yet. Current progress is 60 candidates.
- MCP Apps e2e tests were not run.
- Codex Desktop MCP Apps host compatibility was not proven.
- No MCP Apps package was installed.
- Several UX/vendor comparison sources in the queue are discovery signals only and need bias/provenance review before source note promotion.
- Threads was not checked in this continuation run.

## Cross Verification

- OpenAI Codex goal material was cross-checked through OpenAI Developers search results and existing source notes.
- MCP Apps was cross-checked through GitHub repository, remote tags, npm metadata, package files, security docs, docs/spec search, and npm audit output.
- Obsidian candidates were cross-checked through official changelog, roadmap, and CLI help search results.
- Frontend candidates were cross-checked through official Storybook docs/blog, Playwright existing source, React existing source, and GitHub/GitLab docs.
- Design system candidates were split between official systems and secondary indexes; secondary indexes remain not checked or discovery-only.

## Ethan Can Use This Immediately

- MCP Apps를 지금 설치하실지 물으시면: "전역 설치는 아니고, 특정 프로젝트에서 SDK-only 조건부 설치만 검토"가 현재 답입니다.
- 다음에 10배 스캔을 시키실 때: "큐를 90개 이상으로 확장하고, 최소 10개를 source note로 승격하거나 근거 있게 제외해"라고 지시하시면 됩니다.
- 설치 후보가 나오면: "후보로 두지 말고 pass/conditional/blocked로 판단해"라고 확인하시면 됩니다.
- LLM Wiki를 볼 때는 source note 숫자보다 inbox queue에서 eligible 후보가 줄고 있는지 보시면 됩니다.

## Improvement Delta

- 10배 운영 모델이 에던님 의도에 맞게 `candidate volume first`로 정정됐다.
- 설치 후보 처리 방식이 `candidate only`에서 `pass / conditional / blocked / not checked` decision tier로 바뀌었다.
- MCP Apps는 vague candidate에서 audited install decision으로 전환됐다.
- 10배 실행을 위한 실제 후보 큐가 생겼다.
- 자동화 memory에 이번 정정이 기록되어 다음 실행의 기준이 바뀌었다.

## Adoption Check

- done: 에던님이 지적한 10배 의미 오해를 guide/report/memory에서 정정했다.
- done: OpenAI Cookbook 반복 수리 루프 우선 확인은 기존 source note와 이번 후보 큐에서 중복으로 확인했다.
- done: MCP Apps를 설치 판단 가능 수준으로 분석해 audit note로 저장했다.
- done: 10배 수집을 향한 60개 후보 큐를 만들었다.
- carried: 후보 큐를 90+까지 확장하고, 최소 10개를 다음 source note로 승격 또는 근거 있게 제외해야 한다.
- carried: SDK-only MCP Apps를 실제 프로젝트에 설치할지는 프로젝트 use case가 정해진 뒤 에던님 승인이 필요하다.

## Next Eval

다음 실행은 아래 조건을 통과해야 한다.

1. 10x queue를 90개 이상으로 확장하거나, 추가 후보의 품질이 낮아 멈춘 근거를 남긴다.
2. `eligible-next` 중 최소 10개를 source note로 승격하거나, 왜 제외했는지 근거를 남긴다.
3. 모든 installable 후보를 `pass / conditional / blocked / not checked` 중 하나로 분류한다.
4. MCP Apps SDK-only 설치가 필요하면 구체 프로젝트, host/client, permission, CSP/CORS, auth, rollback 표를 먼저 만든다.
5. status/lint/UTF-8 검증 결과를 보고서 QA에 반영한다.

## Prompt or Template Patch Candidate

```text
For Dex Company 10x Growth Scan, interpret 10x as source candidate volume. Normal scan target is 5-12 candidates; 10x scan target is roughly 50-120 candidates. Do not replace volume with abstract quality leverage.

After collecting candidates, judge every item against the original growth scan criteria: source provenance, currentness, duplicate state, relevance, evidence quality, license/security risk, and installability. Store good source-backed materials; keep weak-provenance materials in inbox; reject duplicates; audit installable tools.

Installable tools, MCP servers, skills, plugins, and packages must be classified as pass, conditional, blocked, or not checked. If all criteria pass, mark install-audit-pass. Actual execution install still requires Ethan approval.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read/write | passed | `dex-company-growth-scan/memory.md` read and appended with 19:14 correction |
| 10x guide corrected | passed | Guide replaced with `candidate volume first` model and Bias Check added |
| MCP Apps audit note schema | passed | Source note includes required provenance fields and `## Original Content` |
| Candidate queue saved | passed | 60-item inbox queue saved under `00_Inbox/LLM_Wiki/ai-research` |
| Index/log updated | passed | `index.md` and `log.md` updated with audit, queue, and report links |
| Status script | passed | `llm-wiki-status.ps1` completed successfully; source notes 43, wiki notes 4 |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warnings after Bias Check fix |
| UTF-8 replacement scan | passed | Checked changed Korean/Markdown files and automation memory; no replacement character found |

## Decision

이번 실행은 덱스가 스스로 학습한 것이 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다. 정정 후 기준은 명확하다. 10배는 자료량을 넓히는 것이고, 설치 후보는 계속 보류하는 것이 아니라 판단이 설 때까지 감사해 pass/conditional/blocked로 분류한다.
