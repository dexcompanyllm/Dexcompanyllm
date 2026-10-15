---
type: llm-wiki-growth-scan-report
status: corrected
title: "Dex Company Growth Scan 10x Run - 2026-07-03 18:42 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T18:42:11+09:00
runMode: user-requested-10x
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

# Dex Company Growth Scan 10x Run - 2026-07-03 18:42 KST

## Summary

에던님 지시에 따라 MCP Apps는 후보로만 유지하고, OpenAI Cookbook 반복 수리 루프는 이미 17:27 실행에서 source note로 승격된 것을 확인했다. 이어서 10배 성과 목적의 확장 스캔을 진행해 source note 9개, wiki guide 1개, report 1개를 추가했다.

## Correction Notice - 2026-07-03

이 보고서의 최초 해석은 에던님 의도와 어긋났다. 에던님이 말씀하신 10배 성과는 "운영 품질 10배"가 아니라 **자료를 10배 많이 모으는 것**이다.

따라서 이 보고서의 기존 문구 중 "자료량보다 개선 루프가 중요하다", "링크 수를 늘리지 않는다", "MCP Apps는 계속 후보로만 둔다"는 식의 결론은 폐기한다. 정정된 기준은 `Dex Company 10x Growth Scan Operating Model`에 반영했다.

정정 후 기준:

- 10배 실행은 후보 수집량을 평소보다 약 10배 늘린다.
- 많이 모으되, 원래 성장 스캔 기준을 통과하는지 반드시 분류한다.
- 설치 가능한 후보는 계속 보류하지 않고 README, license, package, scripts, permissions, security, supply-chain risk를 감사해 `pass / conditional / blocked`로 판단한다.
- 기준에 문제가 없는 설치 후보는 `install-audit-pass`로 표시한다. 실제 설치는 에던님 승인 후 진행한다.

## Run Scope and Limits

- 실행 시각: 2026-07-03 18:42 KST
- 목표: "많이 수집"이 아니라 다음 덱스 실행 품질을 키우는 운영 규칙 흡수
- 검색 범위: Codex goals, Codex skills, OpenAI repair loops, GitHub instructions, GitHub agent best practices, MCP governance, AI UX context architecture, Obsidian Bases/CLI, skill standards
- 확인 채널: OpenAI Developers, GitHub Docs, MCP official docs, NN/g, Obsidian official changelog/roadmap, Anthropic docs
- 제외: X
- Threads: 이번 실행에서는 검증 가능한 본문 자료를 확보하지 않아 source note로 승격하지 않았다.

## Today's Core Findings

1. 10배 성과는 자료량보다 `objective + success metric + stop condition + validation evidence`로 관리해야 한다.
2. OpenAI Cookbook 반복 수리 루프는 이미 source-backed로 승격됐고, 이번 실행에서는 그 다음 단계인 goal/skill/instruction 구조를 보강했다.
3. Repo-local instructions와 path-specific instructions는 Dex Company의 AGENTS/project instruction 분리와 잘 맞는다.
4. MCP Apps는 계속 후보로 두되, GitHub/MCP docs 기준으로 permissions, secrets, install scripts, tool poisoning risk를 감사하기 전에는 연결하지 않는다.
5. NN/g context architecture와 AI agents as users는 Vault/report 자체를 사람이 읽는 문서이자 agent-readable interface로 설계해야 함을 보여준다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 18 |
| opened_or_verified.count | 14 |
| stored.source.count | 9 |
| stored.wiki.count | 1 |
| stored.report.count | 1 |
| duplicate.count | 8 |
| deferred.count | 5 |
| blocked.count | 0 |
| install_or_run.count | 0 |
| lint.warning_count | 0 |

## Evidence Table

| Candidate | Type | Evidence quality | Confidence | Status |
|---|---|---:|---:|---|
| OpenAI Codex Goals | official docs | high | high | stored |
| OpenAI Skills for OSS Maintenance | official blog | high | high | stored |
| GitHub Copilot Code Review Custom Instructions | official docs | high | high | stored |
| GitHub Copilot Cloud Agent Best Practices | official docs | high | high | stored |
| GitHub Copilot MCP Documentation | official docs + MCP docs | high | high | stored |
| NN/g Context Architecture | research article | medium | medium | stored |
| NN/g AI Agents as Users | research article | medium | medium | stored |
| Obsidian 1.13 Changelog | official changelog | high | high | stored |
| Anthropic Claude Code Skills | official docs | medium | medium | stored, reference only |

## Stored Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-goals.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-skills-oss-maintenance.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-github-copilot-code-review-custom-instructions.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-github-copilot-cloud-agent-best-practices.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-github-copilot-mcp-docs.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-nngroup-context-architecture.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-nngroup-ai-agents-as-users.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-obsidian-113-changelog-bases-cli.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-anthropic-claude-code-skills-standard.md`

## Wiki Change

- Added `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company 10x Growth Scan Operating Model.md`
- 이 guide는 10배 Growth Scan을 "더 많은 자료"가 아니라 "더 강한 개선 루프"로 정의한다.

## LLM Wiki Changes

- `30_Knowledge/LLM_Wiki/index.md`: 새 source note 9개, 새 guide, 이번 report 링크 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 10x 실행 내역 append.
- `70_Outputs/LLM_Wiki/growth-scans/`: 이번 report 저장.
- `00_Inbox/LLM_Wiki/`: 새 inbox note 없음. provenance가 충분한 자료만 source note로 저장.

## Stored / Rejected / Deferred

### Stored

- Codex Goals: 10배 성과를 측정 가능한 objective로 고정하기 위해 저장.
- OpenAI Skills OSS Maintenance: Dex Company skill/AGENTS 운영의 공개 사례로 저장.
- GitHub instruction docs: AGENTS/project/path-specific instruction 분리 근거로 저장.
- GitHub agent best practices: build/test/validate instruction과 human verification 근거로 저장.
- GitHub/MCP docs: MCP Apps 후보 유지 결정의 보안 경계로 저장.
- NN/g Context Architecture: context packet과 LLM Wiki index 개선 근거로 저장.
- NN/g AI Agents as Users: agent-readable report/UI/doc 구조 근거로 저장.
- Obsidian changelog: Bases/CLI/dashboard 후보 추적 근거로 저장.
- Anthropic skills docs: Codex-only 경계를 유지한 skill packaging 참고로 저장.

### Rejected as Duplicate

- OpenAI Cookbook iterative repair loop: 이미 `2026-07-03-openai-codex-iterative-repair-loop.md`로 저장됨.
- OpenAI Agent Improvement Loop with Traces/Evals/Codex: 이미 이전 source note가 있음.
- OpenTelemetry GenAI semantic conventions: 17:27 실행에서 저장됨.
- Storybook accessibility testing: 17:27 실행에서 저장됨.
- Anthropic Building Effective Agents: 17:27 실행에서 저장됨.
- Obsidian roadmap: 17:04 실행에서 저장됨.
- NN/g AI UX current index: 17:04 실행에서 저장됨.
- MCP Apps ext-apps: 17:04 실행에서 저장됨.

### Deferred

- MCP Apps install/audit: candidate only. 다음에 MCP Apps를 실제 검토한다면 license, package files, scripts, permissions, security policy, sandbox behavior를 표로 채운다.
- Obsidian Bases dashboard prototype: 로컬 Obsidian 버전과 Bases 상태 확인 후 별도 작업으로 진행한다.
- GitHub Copilot instruction 적용: Dex Company는 Codex 중심이라 실제 GitHub Copilot 설정은 하지 않는다. 다만 instruction 구조는 참고한다.
- Claude Code skills runtime: 참고만 하고 Dex Company 기본 workflow에는 포함하지 않는다.
- Actual goal-mode automation: Codex goal feature는 이번 실행에서 켜거나 실행하지 않았다.

## Review

- 직전 carried item인 OpenAI Cookbook 반복 수리 루프는 이미 17:27 실행에서 done 처리되어 있었다.
- 이번 실행의 부족한 점은 "좋은 자료"가 report에 흩어질 수 있다는 점이었다.

## Repair

- 10배 성과 기준을 별도 wiki guide로 만들었다.
- report Metrics를 강화했다.
- source note를 9개로 확장하되 설치/실행 후보는 분리했다.
- MCP Apps는 에던님 지시대로 후보 상태를 유지했다.

## Validate

- 최종 검증에서 `llm-wiki-status.ps1`와 `llm-wiki-lint.ps1`를 실행한다.
- 추가/수정 파일은 UTF-8 replacement character scan으로 확인한다.
- lint 실패 시 schema 보정 후 재실행한다.

## Cross Verification

- OpenAI Goals는 Cookbook page와 Codex goal use-case page로 교차 확인했다.
- OpenAI skills 운영 사례는 OpenAI blog와 Codex prompting docs로 확인했다.
- GitHub custom instructions와 cloud agent best practices는 GitHub Docs의 tutorial/responsible-use 문서로 확인했다.
- GitHub MCP는 GitHub Docs, MCP intro, MCP security best practices로 확인했다.
- NN/g articles는 각 article과 NN/g AI topic index로 확인했다.
- Obsidian changelog는 official changelog와 roadmap으로 확인했다.
- Anthropic skills는 Claude Code skills docs와 subagents docs로 확인했지만, Dex Company 기본 runtime에는 포함하지 않았다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: 각 공식 URL, publisher, 문서가 설명하는 기능/운영 원칙, changelog/roadmap 항목.
- Dex inference: 10배 성과 모델, AGENTS/project instruction 분리, MCP 후보 governance, agent-readable Vault/report 설계.
- not checked: 실제 Codex goal feature 실행, GitHub Copilot/Claude Code/MCP runtime 실행, Obsidian Bases dashboard 생성, 로컬 Obsidian 버전 확인.

## Ethan Can Use This Immediately

- "10배 성과" 작업을 줄 때: "objective, success metric, stop condition, validation evidence를 먼저 잡고 진행해"라고 말하시면 됩니다.
- 프로젝트 시작 때: root AGENTS는 짧게, project AGENTS는 구체적으로, path-specific 규칙은 별도 문서로 쪼개면 됩니다.
- MCP Apps는 계속 "후보"로만 두시면 됩니다. 실제 연결 전에는 권한과 설치 스크립트 감사를 먼저 해야 합니다.
- Growth Scan 보고서를 볼 때는 `stored.count`보다 `deferred item이 줄었는지`, `next eval이 선명한지`, `lint가 통과했는지`를 보시면 됩니다.
- Obsidian dashboard는 당장 만들지 말고, Bases Kanban/Calendar가 충분히 안정화될 때 backlog view 후보로 보시면 됩니다.

## Improvement Delta

- 10배 성과 정의가 생겼다: "많이 수집"이 아니라 measurable improvement loop.
- Growth Scan 구조가 Review -> Repair -> Validate로 강화됐다.
- AGENTS/project instruction을 path-specific instruction처럼 나누는 근거가 생겼다.
- MCP Apps 후보 유지 결정을 GitHub/MCP security docs로 보강했다.
- Vault/report 자체를 agent-readable interface로 보는 기준이 생겼다.

## Adoption Check

- done: 에던님 결정에 따라 MCP Apps는 후보 상태로 유지했다.
- done: OpenAI Cookbook 반복 수리 루프는 이미 source note로 승격된 것을 확인하고, 이번 실행에서는 중복 저장하지 않았다.
- done: 17:27 실행의 Metrics 요구를 이번 18:42 report에 적용했다.
- done: deferred item 재판정 규칙을 이번 report의 Stored/Rejected/Deferred와 Review/Repair/Validate에 반영했다.
- carried: MCP Apps 실제 감사는 에던님 승인 전까지 보류한다.

## Next Eval

- 다음 실행은 `10x guide`를 읽고 report에 objective/success metric/stop condition을 명시해야 한다.
- 다음 실행은 stored.count보다 adoption.count 또는 deferred closure count를 더 중요하게 보고해야 한다.
- 다음 실행은 MCP Apps 후보가 다시 나오면 감사 표를 비워두지 말고 최소 README/license/package/scripts/security/permissions 6칸을 채운다.
- 다음 실행은 LLM Wiki index가 길어질 경우 "Growth Scan Operating" subsection으로 재정렬할지 판단한다.

## Prompt or Template Patch Candidate

```text
When Ethan asks for "10x" growth scan, do not maximize link count. Define objective, success metric, stop condition, and validation evidence first. Measure 10x by adoption.count, deferred_closure.count, source_backed_ratio, lint.warning_count, and next_eval clarity.

Every growth scan must include Review, Repair, and Validate sections. Review checks the previous carried/deferred item. Repair records what changed in operating rules or templates. Validate records status/lint/UTF-8/source schema checks after edits.

MCP Apps remains candidate-only unless Ethan explicitly approves an audit/install task. Any MCP candidate must include README, license, package/scripts, permissions, data access, secret handling, and security policy checks before use.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| 자동화 메모리 확인 | passed | `dex-company-growth-scan/memory.md` read |
| 이전 report 확인 | passed | 17:04, 17:27 report/source 확인 |
| 실제 인터넷 검색 | passed | OpenAI, GitHub, MCP, NN/g, Obsidian, Anthropic 공식 자료 확인 |
| 후보 5-12개 선별 | passed | 9개 source note 저장 |
| 중복 확인 | passed | 기존 source/report/inbox `rg` 확인 |
| 에던님 결정 반영 | passed | MCP Apps candidate-only 유지, Cookbook 중복 저장 안 함 |
| 설치 금지 준수 | passed | GitHub/Copilot/MCP/Claude/Obsidian tools 실행 안 함 |
| Source note schema | passed after write | 9개 source note 모두 필수 frontmatter와 `## Original Content` 포함 |
| Wiki guide 생성 | passed | `Dex Company 10x Growth Scan Operating Model.md` 추가 |
| Lint/status | passed | `llm-wiki-status.ps1`, `llm-wiki-lint.ps1` 통과, lint warning 0개 |
| UTF-8 확인 | passed | 추가/수정 파일 13개에서 replacement character 없음 |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: 10배 성과를 파일 수 증가로 오해하면 다음 실행 품질이 떨어진다.
- Fix applied: 10x guide와 Metrics/Review/Repair/Validate 구조로 품질 기준을 고정했다.
- Not checked: 실제 Codex goal feature 실행, GitHub Copilot/Claude Code/MCP runtime 실행, Obsidian Bases dashboard 생성, 로컬 Obsidian 버전 확인.

## Decision

이번 실행은 덱스가 "스스로 학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다. 결과적으로 다음 덱스 작업은 목표 설정, 반복 수리, instruction 분리, MCP 후보 통제, agent-readable 보고서 구조를 더 잘 쓸 수 있다.
