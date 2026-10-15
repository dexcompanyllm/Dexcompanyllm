---
type: llm-wiki-growth-scan-report
status: completed
created: 2026-07-03
runAt: 2026-07-03T16:37:55+09:00
mode: manual-test
automationId: dex-company-growth-scan
focus: report-improvement
verifiedBy: Dex
tags:
  - llm-wiki/report
  - dex-company/growth-scan
  - report-quality
---

# Dex Company Growth Scan Test 4 - Report Improvement

## Run Scope and Limits

- 실행 시각: 2026-07-03 16:37:55 +09:00
- 초점: `llm-wiki-growth-scan-report` 기능 개선
- 검색 범위: OpenAI cookbook/docs, NN/g research reporting articles, GitHub Docs issue templates
- 한계: 실제 OpenAI eval run이나 GitHub issue form 적용은 하지 않았다.

## Evidence Table

| Candidate | Type | Decision | Why |
|---|---|---|---|
| OpenAI Agent Improvement Loop | official cookbook | source 저장 | report를 trace/eval/improvement loop로 바꿀 근거 |
| OpenAI Agent Evals + Evaluation Best Practices | official docs | source 저장 | report QA를 반복 가능한 평가 기준으로 만들 근거 |
| NN/g Present Research Responsibly | expert UX source | source 저장 | 검색 범위와 한계를 정직하게 보고할 근거 |
| NN/g Insights Aren't Outcomes | expert UX source | source 저장 | 자료 수집 후 실제 채택 추적 필요성 |
| GitHub Issue Templates | official docs | source 저장 | report를 빠짐없는 template로 구조화할 근거 |

## Stored / Rejected / Deferred

- 저장: source note 5개, wiki guide 1개, report 1개
- 제외: 기존 growth scan report 3개는 재저장하지 않고 개선 근거로만 사용
- 보류: 실제 eval API 실행, GitHub issue form 적용, report template script 생성

## Failure Pattern

- 이전 보고서들은 필수 섹션은 있었지만 `Improvement Delta`, `Adoption Check`, `Next Eval`, `Prompt or Template Patch Candidate`가 고정 섹션이 아니었다.
- 이 때문에 "무엇을 찾았는가"는 남았지만 "다음 실행이 무엇을 더 잘해야 하는가"가 약했다.

## Improvement Delta

- `LLM Wiki Growth Scan Report Improvement Model` guide를 추가했다.
- 보고서 개선용 source 5개를 추가했다.
- growth scan report에 고정해야 할 새 섹션을 정의했다.
- 자동화 프롬프트 보강 후보를 만들었다.

## Adoption Check

- 이전 실행에서 정한 `Threads는 discovery only` 규칙은 이번에도 유지한다.
- 이전 실행에서 보강한 source note schema는 이번 source note에도 처음부터 적용했다.
- 이번 실행의 새 adoption target은 다음 보고서부터 `Improvement Delta`, `Adoption Check`, `Next Eval`, `Patch Candidate`를 포함하는 것이다.

## Next Eval

다음 growth scan은 다음 기준을 통과해야 한다.

- 보고서에 `Improvement Delta`가 있다.
- 보고서에 `Adoption Check`가 있다.
- 보고서에 `Next Eval`이 있다.
- 보고서에 `Prompt or Template Patch Candidate`가 있다.
- QA 결과가 `예정`이 아니라 실제 완료 상태다.

## Prompt or Template Patch Candidate

자동화 프롬프트의 보고서 항목에 아래 항목을 추가한다.

- 이번 실행으로 개선된 운영 규칙 또는 템플릿 변경점
- 이전 실행 action item의 채택 여부
- 다음 실행에서 통과해야 할 작은 eval 기준
- 프롬프트/템플릿 보정 후보

## QA Scorecard

- 중복 검색: 기존 source에 동일 주제 없음
- 설치 작업: 수행하지 않음
- 검증 완료: `llm-wiki-status.ps1` 통과, source notes 21개와 wiki notes 3개 확인
- 검증 완료: `llm-wiki-lint.ps1` 0 warning 통과
- 검증 완료: UTF-8 저장 확인, replacement character 없음
- 자동화 반영 완료: `Improvement Delta`, `Adoption Check`, `Next Eval`, `Prompt or Template Patch Candidate`를 정규 보고서 필수 항목으로 추가
