---
type: llm-wiki-weekly-synthesis
status: completed
title: "Dex Company Growth Scan Weekly Synthesis - 2026-07-04"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T14:00:00+09:00
operator: Dex
sourceKind: weekly-synthesis
collectionPurpose: "47개 Dex Company Growth Scan 보고서를 작업별 운영 체크리스트로 압축한다."
confidence: high
claimType: synthesis
evidenceScope: local-growth-reports-and-llm-wiki
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/report
  - weekly-synthesis
  - growth-scan
  - dex-company
---

# Dex Company Growth Scan Weekly Synthesis - 2026-07-04

## 실행 시각과 검토 기간

- 실행 시각: 2026-07-04 KST
- 검토 범위: `70_Outputs/LLM_Wiki/growth-scans/`의 47개 보고서, LLM Wiki source/wiki count, 10x candidate queue, LLM Wiki log, 최근 approval-ready install audit model
- 검토 목적: 성장 스캔 결과를 에던님 작업별 체크리스트로 압축해 다음 작업에서 바로 쓰게 만든다.

## Weekly Metrics

| Metric | Value | Note |
|---|---:|---|
| reports.reviewed | 47 | 2026-07-03 15:52부터 2026-07-04 13:33까지 |
| reports.metrics_parsed | 39 | 초기 실험 보고서 8개는 metrics 형식이 달라 부분 집계 |
| sources.counted | 143 | `sources/` 전체 Markdown count |
| wiki.counted | 5 | `wiki/` 전체 Markdown count |
| approval_audits.counted | 1 | approval-ready install audit |
| no_new_signal_reports.counted | 14 | 반복 저장을 막은 steady-state 보고서 |
| parsed.searched.count | 620 | metrics section 파싱 가능 보고서 기준 |
| parsed.stored.count | 94 | metrics section 파싱 가능 보고서 기준 |
| parsed.duplicate.count | 280 | metrics section 파싱 가능 보고서 기준 |
| parsed.deferred.count | 132 | metrics section 파싱 가능 보고서 기준 |
| parsed.blocked.count | 59 | metrics section 파싱 가능 보고서 기준 |
| parsed.lint.warning_count | 0 | metrics section 파싱 가능 보고서 기준 |

## Queue Outcome

| Status | Count | 의미 |
|---|---:|---|
| stored-source | 43 | source note로 승격 |
| audit-done | 8 | 설치/실행 후보로 실사 완료 |
| duplicate-source | 28 | 이미 source에 있어 중복 |
| duplicate-in-queue | 9 | queue 내부 중복 |
| carried-vendor | 3 | vendor 신호라 보류 |
| carried-research-signal | 1 | 연구 신호라 보류 |
| dropped-low-signal | 3 | 낮은 신호로 제외 |
| eligible-next | 0 | 다음 즉시 승격 후보 없음 |
| not-checked | 0 | 미확인 후보 없음 |
| install-audit-next | 0 | 다음 즉시 설치 감사 후보 없음 |

## 이번 주 판단 기준을 실제로 바꾼 학습

1. `10x`는 추상적인 성과가 아니라 후보 표본을 크게 늘리는 것이다. 다만 많이 모은 뒤 많이 버리는 것까지 성과로 본다.
2. source note 승격보다 중복 판단이 더 중요해졌다. 새 링크라도 `existing_coverage.note`와 `operational_scope.diff`가 없으면 저장하지 않는다.
3. 실행 코드, connector, MCP, SDK, skill은 지식 흡수와 설치를 분리한다. 설치는 approval-ready packet이 완성되고 에던님이 승인한 뒤에만 진행한다.
4. OpenAI, GitHub, Figma, Obsidian 같은 계정/권한/결제 인접 기능은 공식 문서가 있어도 local availability로 말하지 않는다.
5. frontend/design-system 자료는 WCAG/W3C 접근성 기준과 연결해야 한다. 연결이 약하면 QA anchor로만 둔다.
6. Storybook, Vitest, Next.js, MCP Apps SDK 같은 도구는 실제 target repo, 버전, lockfile, rollback이 있을 때만 조건부 승인 후보가 된다.
7. Threads는 discovery-only다. 안정적 본문, 작성자 맥락, 교차 검증이 없으면 source-backed 근거로 쓰지 않는다. X는 제외한다.
8. GitHub Copilot/agent workflow는 repo 권한, token, billing, human review path가 확인되기 전에는 승인 요청으로 올리지 않는다.
9. Figma Agent/MCP는 workspace permission, file sensitivity, asset export scope, human review, account/billing context가 없으면 approval-not-ready다.
10. no-new-signal 보고서도 유효한 학습이다. 성과 없음이 반복되면 탐색 범위, 중복 기준, 다음 eval이 안정화된다.

## Source-Backed / Dex Inference / Not Checked

### Source-Backed

- 47개 growth report가 생성되었고, 후반부 14개는 no-new-signal discipline을 반복 적용했다.
- 10x queue는 95개 후보를 `stored-source`, `audit-done`, `duplicate-*`, `carried-*`, `dropped-low-signal`로 닫았다.
- LLM Wiki는 현재 source note 143개, wiki note 5개, query note 1개를 가진다.
- `approval-ready` install audit model이 생성되어 growth-scan report model, 10x operating model, LLM Wiki index에 연결되었다.

### Dex Inference

- 다음 질적 도약은 더 많은 source를 저장하는 것이 아니라, 작업 전에 체크리스트로 호출되는 운영 기억을 만드는 것이다.
- `no-new-signal`이 많아진 것은 실패가 아니라 큐가 닫히고 중복 방지 기준이 작동하기 시작했다는 신호다.
- 작업별 체크리스트는 source note 전체를 매번 읽기 어렵다는 문제를 줄이는 압축 계층이다.

### Not Checked

- 이번 synthesis는 새 인터넷 검색을 수행하지 않았다.
- 모든 source note 본문을 다시 정독하지는 않았다. 보고서, log, queue, count, 최근 source note 목록 중심으로 합성했다.
- GitHub/Figma/OpenAI/Obsidian 계정 상태, billing, connector availability, local app version, package runtime은 직접 확인하지 않았다.

## 작업별 바로 쓰는 운영 규칙 요약

| 작업 유형 | 바로 체크할 핵심 |
|---|---|
| Codex/OpenAI API | 공식 문서/변경 로그 최신 확인, local runtime과 account/billing 분리, secret 저장 금지 |
| AI agents/MCP/connectors | approval-ready packet 없으면 승인 요청 금지, OWASP LLM risk와 권한 범위 먼저 확인 |
| Frontend/design systems | 실제 target UI와 repo 확인, WCAG/W3C QA anchor 연결, Storybook/Vitest는 repo 조건부 |
| UX research/product | insight와 outcome 분리, role별 설명 가능성, source-backed/inference/not checked 구분 |
| Obsidian/LLM Wiki | active project와 reusable knowledge 분리, metadata/lint/status 통과, 중복 저장 금지 |
| Automation/ops | Metrics, Adoption Check, Next Eval, Prompt Patch Candidate를 남기고 no-op도 명시 |
| Career ops | 보수적 claim, 플랫폼별 양식 근거, 확인 안 된 경력/수치/기술 과장 금지 |
| 설치/승인 | `approval-ready-pass`가 되어도 자동 설치가 아니라 에던님 명시 승인 후 실행 |

## Deferred / Carried 재분류

| Item | Current Status | 이유 |
|---|---|---|
| Figma MCP/Agent connector | carried / approval-not-ready | workspace, file sensitivity, export scope, account/billing 미확인 |
| GitHub Copilot code review / agent workflows | carried / approval-not-ready | repo 권한, token, billing, human review path 미확인 |
| Storybook performance/minimal install | carried / project-specific | concrete frontend repo, dependency delta, CI/browser QA 미확인 |
| Threads snippets | carried / source-weak | stable text와 교차 검증 부족 |
| MCP Apps full repo/global skills | install-audit-blocked | 전역 설치 범위가 넓고 project-local SDK 대안이 더 안전 |

## 실패 패턴과 해결 방안

| Pattern | 해결 방식 |
|---|---|
| 같은 공식 changelog를 반복 저장하려는 압력 | `existing_coverage.note`와 `operational_scope.diff`가 없으면 no-new-signal |
| 설치 후보를 빨리 승인 요청하려는 압력 | approval-ready packet이 완성될 때까지 approval-not-ready |
| 계정 기능을 문서만 보고 가능하다고 말하는 위험 | account/runtime/billing/permission을 직접 확인하기 전까지 not checked |
| Threads/SNS 신호의 약한 provenance | discovery-only로 두고 공식 문서/GitHub/RSS 교차 검증 전까지 source note 금지 |
| 보고서가 길어지는 문제 | steady-state에서는 짧은 no-op report 허용 |

## 성공 패턴과 유지할 기준

- 공식 문서와 GitHub/RSS/W3C/NN-g 같은 신뢰 출처를 우선한다.
- 새 자료를 저장하기 전 기존 source/wiki/report/inbox를 검색한다.
- 실행 코드와 문서형 지식을 분리한다.
- 매회 Metrics, Adoption Check, Next Eval을 남긴다.
- source-backed, Dex inference, not checked를 분리한다.
- lint/status/UTF-8를 검증하고 결과를 보고서에 남긴다.

## 다음 주 자동화/프롬프트/템플릿 개선 후보

```text
After a week of 30-minute Growth Scan reports, create a task-checklist synthesis before collecting more low-signal sources. The synthesis must group reusable rules by Ethan's real work modes: Codex/OpenAI API, AI agents/MCP/connectors, frontend/design systems, UX research/product, Obsidian/LLM Wiki, automation/ops, career ops, and install approval. For each group, include source-backed rules, Dex inference, not checked boundaries, and a definition of done.
```

## 에던님이 바로 쓰는 예시

- 프론트엔드 작업을 시작할 때: `Frontend/design systems` 체크리스트를 먼저 보고 target repo, 디자인 시스템, WCAG QA, browser QA, Storybook 조건부 여부를 확인한다.
- MCP나 connector를 설치하고 싶을 때: `AI agents/MCP/connectors`와 `설치/승인` 체크리스트를 보고 approval-ready packet을 완성한 뒤 에던님 승인 요청으로 올린다.
- 이력서/구직 작업을 할 때: `Career ops` 체크리스트를 보고 확인된 경력과 플랫폼별 요구 양식을 분리한다.
- LLM Wiki에 자료를 넣을 때: `Obsidian/LLM Wiki` 체크리스트로 source note인지 inbox인지 wiki guide인지 먼저 분류한다.

## QA / Verification

| Check | Result | Evidence |
|---|---|---|
| reports counted | passed | growth-scans Markdown 47개 |
| metrics parsed | partial | 39/47개 보고서 metrics 파싱 |
| queue counted | passed | 95개 후보 상태 집계 |
| source/wiki counted | passed | sources 143, wiki 5 |
| status script | passed | `llm-wiki-status.ps1` 통과, wiki notes 6개로 증가 |
| lint script | passed | `llm-wiki-lint.ps1` 경고 0개 |
| UTF-8 check | passed | weekly synthesis, task checklist, index, log 모두 replacement/CJK mojibake 없음 |

## Bias Check

- 이번 synthesis는 최근 growth report와 queue/log 중심이라, 오래된 source note 본문 세부사항은 덜 반영될 수 있다.
- no-new-signal을 긍정적으로 해석했지만, 검색 범위가 너무 좁아지면 새 신호를 놓칠 위험이 있다.
- 작업별 체크리스트는 실행 전 압축 도구일 뿐이며, 실제 작업에서는 target repo/account/runtime을 다시 확인해야 한다.

## Original Content

이 문서는 2026-07-03부터 2026-07-04까지 생성된 Dex Company Growth Scan 보고서, 10x candidate queue, LLM Wiki log, source/wiki count, approval-ready install audit model을 바탕으로 작성한 주간 합성 보고서다.
