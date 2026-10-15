---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Manual Run - 2026-07-03 17:27 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T17:27:12+09:00
runMode: manual-after-scheduled
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
---

# Dex Company Growth Scan Manual Run - 2026-07-03 17:27 KST

## Summary

이번 실행은 17:04 scheduled growth scan 직후 이어진 수동 재실행이다. 직전 보고서에서 carried로 남긴 OpenAI Cookbook iterative repair loop를 실제 source note로 승격했고, observability, frontend accessibility, agent architecture 자료를 추가로 흡수했다.

## Run Scope and Limits

- 실행 시각: 2026-07-03 17:27 KST
- 검색 범위: Codex, AI agents, automation, frontend, design systems, UX/accessibility
- 확인 채널: OpenAI Developers Cookbook, GitHub repository/Atom feed, OpenTelemetry docs/repository, Storybook docs/addon page, Anthropic official engineering blog
- 제외: X
- Threads: 이번 실행에서는 source-backed로 승격할 만한 Threads 본문 자료를 확보하지 않았다.

## Today's Core Findings

1. Codex 반복 수리 루프는 Dex Company 보고서를 review-repair-validate 구조로 바꾸는 데 직접 쓸 수 있다.
2. OpenTelemetry GenAI semantic conventions는 agent/MCP/OpenAI 실행 기록을 trace, metric, event 단위로 남기는 관측성 후보 표준이다.
3. Storybook a11y는 WCAG 2.2 원칙을 실제 컴포넌트 QA로 연결하는 도구 후보이며, 설치는 프로젝트별 승인 후에만 해야 한다.
4. Anthropic의 agent 설계 글은 Dex Company가 모든 일을 큰 자율 에이전트로 만들기보다 단순 workflow를 먼저 쓰는 기준을 준다.

## Evidence Table

| Candidate | Type | Evidence quality | Confidence | Status |
|---|---|---:|---:|---|
| OpenAI Cookbook iterative repair loops with Codex | official cookbook | high | high | stored, execution not run |
| OpenTelemetry GenAI Semantic Conventions | official repository | medium | medium | stored, observability candidate |
| Storybook Accessibility Testing | official docs | high | high | stored, install candidate only |
| Anthropic Building Effective Agents | official engineering blog | medium | medium | stored |

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 4 |
| stored.count | 4 |
| duplicate.count | 3 |
| deferred.count | 4 |
| blocked.count | 0 |
| lint.warning_count | 0 |

## Stored Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-iterative-repair-loop.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-opentelemetry-genai-semantic-conventions.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-storybook-accessibility-testing.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-anthropic-building-effective-agents.md`

## LLM Wiki Changes

- `30_Knowledge/LLM_Wiki/index.md`: 이번 source note 4개와 report 링크를 추가했다.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 수동 실행 이력을 추가했다.
- `70_Outputs/LLM_Wiki/growth-scans/`: 이번 report 저장.

## Stored / Rejected / Deferred

### Stored

- OpenAI Cookbook iterative repair loops: 직전 deferred 후보를 done으로 승격했다.
- OpenTelemetry GenAI semantic conventions: 관측성 후보 표준으로 저장했다.
- Storybook Accessibility Testing: WCAG 2.2와 연결되는 frontend QA 자료로 저장했다.
- Anthropic Building Effective Agents: workflow/agent 복잡도 기준으로 저장했다.

### Rejected as Duplicate

- OWASP LLM Top 10: 직전 실행에서 이미 저장했다.
- WCAG 2.2: 직전 실행에서 이미 저장했다.
- OpenAI deprecations/web search controls/Codex CLI changelog: 17:04 scheduled 실행에서 이미 저장했다.

### Deferred

- OpenAI Cookbook notebook execution: API key, Codex CLI, Jupyter/nbconvert 전제가 있어 실행하지 않았다.
- Storybook addon installation: 프로젝트 package 변경이므로 자동 설치하지 않았다.
- OpenTelemetry reference implementation: code/tooling 실행 전 보안과 의존성 감사가 필요하다.
- Anthropic cookbook sample implementations: 이번 실행에서는 official article만 확인했다.

## Failure Pattern

- 보류 항목이 보고서에만 남으면 다음 실행에서 잊히기 쉽다. 이번에는 17:04 report의 carried item을 실제 source note로 승격했다.
- 실행 가능한 자료는 가치가 높아도 source-backed knowledge와 install/run decision을 분리해야 한다.
- 자동화가 이미 17:04에 실행된 직후였기 때문에 중복 감지가 중요했다.

## Installation or Skill Candidates

| Candidate | Status | Reason | Risk |
|---|---|---|---|
| OpenAI Cookbook iterative repair loop notebook | not run | Dex Company repair loop 설계에 유용 | API key, Codex CLI, Jupyter 실행 필요 |
| Storybook addon-a11y | install candidate only | frontend/design system QA에 유용 | package 변경, project-specific setup 필요 |
| OpenTelemetry GenAI reference implementation | audit candidate only | agent observability에 유용 | repository tooling, Python/Jinja/Makefile 실행 감사 필요 |

## Cross Verification

- OpenAI Cookbook: OpenAI Developers page, OpenAI Cookbook GitHub repository, GitHub commit Atom feed를 확인했다.
- OpenTelemetry: official repository, moved OpenTelemetry docs page, commit Atom feed를 확인했다.
- Storybook: accessibility testing docs, addon page, GitHub commit Atom feed를 확인했다.
- Anthropic: official engineering blog를 확인했다. 별도 cookbook/PDF 전문은 이번 실행에서 확인하지 않았다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: 각 공식 URL의 존재, 문서의 핵심 구조, 설치/실행 전제, GitHub/RSS 접근 여부.
- Dex inference: Dex Company report, QA, observability, role routing으로 변환한 운영 규칙.
- not checked: notebook 실행, addon 설치, OpenTelemetry reference code 실행, Anthropic cookbook sample, 실제 프로젝트 적용.

## Ethan Can Use This Immediately

- 성장 스캔 보고서를 볼 때 "이번에 무엇을 찾았나"뿐 아니라 "지난번 carried/deferred가 done이 되었나"를 확인하시면 됩니다.
- UI 프로젝트를 맡길 때 "Storybook a11y 또는 동등한 접근성 검사 기준을 QA_REPORT에 넣어주세요"라고 지시하면 됩니다.
- 자동화나 에이전트 설계가 복잡해질 때 "workflow로 충분한지 먼저 판단하고, autonomous agent는 stopping condition과 human checkpoint가 있을 때만 쓰세요"라고 기준을 줄 수 있습니다.
- Codex가 문서나 코드 수리를 반복할 때는 review findings, repair summary, validation evidence를 한 세트로 남기게 하면 됩니다.

## Improvement Delta

- 보류 항목 처리 개선: 17:04 report의 OpenAI Cookbook carried item을 이번 실행에서 done으로 처리했다.
- 보고서 구조 개선: future runs에서 deferred item을 최소 하나 이상 done/carried/dropped/blocked로 판정하도록 강화할 필요가 확인됐다.
- QA 개선: WCAG 2.2 원칙을 Storybook a11y 같은 실제 컴포넌트 테스트 루프로 연결했다.
- Observability 개선: growth scan report에 최소 metrics block을 추가하는 후보가 생겼다.

## Adoption Check

- done: 17:04 report의 carried item인 OpenAI Cookbook iterative repair loop를 source note로 승격했다.
- done: OWASP install gate를 OpenAI Cookbook, Storybook addon, OpenTelemetry reference implementation에 적용했다.
- done: WCAG mapping을 Storybook accessibility testing note에 적용했다.
- carried: OpenTelemetry semantic conventions는 아직 안정적 실행 표준이 아니라 observability candidate로 유지한다.

## Next Eval

- 다음 실행은 report에 `Metrics` 섹션을 추가해야 한다: searched.count, stored.count, duplicate.count, deferred.count, lint.warning_count.
- 다음 실행은 deferred item 중 최소 하나를 done/carried/dropped/blocked로 다시 판정해야 한다.
- 다음 실행은 Anthropic article의 patterns를 Dex Company role routing에 적용할지 별도 guide 후보로 볼 수 있는지 판단해야 한다.

## Prompt or Template Patch Candidate

아래 후보는 이번 실행 중 실제 `dex-company-growth-scan` 자동화 프롬프트에도 반영했다.

```text
Every growth scan report must include a small Metrics section with searched.count, stored.count, duplicate.count, deferred.count, blocked.count, and lint.warning_count.

Every run must revisit at least one deferred item from the previous run and mark it done, carried, dropped, or blocked with evidence.

When a source describes an executable repair loop, test runner, addon, or observability reference implementation, store the concept as source-backed knowledge but keep execution/install as a separate approval decision.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| 현재 폴더 확인 | passed | `D:\CodexProjects\codex setup` |
| 최신 scheduled report 확인 | passed | `2026-07-03-1704-dex-company-growth-scan.md` 확인 |
| Improvement model 확인 | passed | guide 확인 |
| 실제 인터넷 검색 | passed | OpenAI, OpenTelemetry, Storybook, Anthropic 자료 확인 |
| 중복 확인 | passed | `rg`로 기존 report/source/inbox 중복 확인 |
| 보류 항목 재판정 | passed | OpenAI Cookbook carried -> done |
| 설치 금지 준수 | passed | notebook/addon/reference implementation 실행 및 설치 안 함 |
| Source note schema | passed | source note 4개 모두 필수 frontmatter와 `## Original Content` 포함 |
| 자동화 프롬프트 반영 | passed | Metrics와 deferred/carried 재판정 규칙 반영 확인 |
| Lint/status | passed | `llm-wiki-status.ps1`, `llm-wiki-lint.ps1` 통과, lint warning 0개 |
| UTF-8 확인 | passed | 추가/수정 파일 7개에서 replacement character 없음 |

## Decision

이번 실행은 덱스가 "더 많이 찾는 것"보다 "보류 항목을 다시 꺼내 검증하고 실제 운영 규칙으로 바꾸는 것"을 학습하는 방향으로 진행했다. 이는 모델 자체 학습이 아니라, 파일과 출처 기반으로 덱스 컴퍼니 운영 지식을 흡수하는 방식이다.
