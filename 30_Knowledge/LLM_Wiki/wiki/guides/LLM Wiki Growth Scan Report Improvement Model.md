---
type: llm-wiki-guide
status: active
layer: wiki
explored: false
title: "LLM Wiki Growth Scan Report Improvement Model"
created: 2026-07-03
updated: 2026-07-04
dateCreated: 2026-07-03
dateModified: 2026-07-04
confidence: medium
claimType: prescriptive
evidenceScope: source-backed-synthesis
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/wiki
  - growth-scan
  - report-quality
  - dex-company
---

# LLM Wiki Growth Scan Report Improvement Model

## 목적

`llm-wiki-growth-scan-report`는 단순한 자료 요약이 아니라 덱스 컴퍼니의 반복 개선 루프를 추적해야 한다. 좋은 보고서는 "무엇을 찾았는가"에서 끝나지 않고, "다음 실행에서 어떤 판단 기준과 방법이 더 좋아졌는가"를 남긴다.

## Source Notes

- [[2026-07-03-openai-agent-improvement-loop-traces-evals-codex]]
- [[2026-07-03-openai-agent-evals-and-evaluation-best-practices]]
- [[2026-07-03-nngroup-present-research-responsibly]]
- [[2026-07-03-nngroup-insights-arent-outcomes]]
- [[2026-07-03-github-issue-templates-structured-feedback]]
- [[Dex Company Approval-Ready Install Audit Model]]

## Required Report Sections

1. `Run Scope and Limits`: 실행 시각, 검색 범위, 접근 실패, 최신성 한계를 기록한다.
2. `Metrics`: searched.count, stored.count, duplicate.count, deferred.count, blocked.count, lint.warning_count를 기록한다. 정확하지 않으면 추정하지 말고 partial 또는 not checked로 둔다.
3. `Evidence Table`: source-backed, Dex inference, not checked를 분리해서 후보를 정리한다.
4. `Stored / Rejected / Deferred`: 저장, 제외, 보류를 같은 무게로 기록한다. 억지 저장보다 명확한 제외가 더 낫다.
5. `Approval Decisions`: 실행 코드, connector, MCP, SDK, skill, 브라우저 확장, GitHub workflow, 계정 연동 후보는 `approval-ready-pass`, `approval-ready-conditional`, `approval-not-ready`, `install-audit-blocked`, `knowledge-only` 중 하나로 표시한다.
6. `Failure Pattern`: 반복되는 막힘을 문제 유형으로 묶는다.
7. `Improvement Delta`: 이번 실행으로 자동화, 템플릿, wiki, policy가 무엇을 배웠는지 기록한다.
8. `Adoption Check`: 이전 report의 action item이 done, carried, dropped, blocked 중 무엇인지 확인한다.
9. `Next Eval`: 다음 실행에서 통과해야 할 작고 검증 가능한 기준을 남긴다.
10. `Prompt or Template Patch Candidate`: 프롬프트나 템플릿 변경이 필요하면 바로 붙여 넣을 수 있는 문구로 남긴다.
11. `QA Scorecard`: lint/status/UTF-8/source schema/중복 방지/설치 금지/approval-ready packet 충족 여부를 기록한다.

## Approval-Ready Rule

설치나 계정 연동이 필요한 후보는 "에던님 승인 필요"라고만 쓰면 부족하다. 보고서 작성자는 [[Dex Company Approval-Ready Install Audit Model]]의 minimum approval packet을 채워야 한다.

approval-ready packet이 불완전하면 에던님에게 승인 요청을 하지 않는다. 대신 무엇이 비어 있는지 쉽게 설명하고, 다음 실행에서 어떤 근거를 확인해야 하는지 남긴다.

## Report Quality Scorecard

| Criterion | Pass Signal |
|---|---|
| Source discipline | source-backed / Dex inference / not checked가 분리됨 |
| Repeat learning | 반복 실패가 다음 운영 규칙으로 연결됨 |
| Adoption tracking | 이전 action item의 상태가 확인됨 |
| Actionability | 다음 실행 기준과 patch 후보가 구체적임 |
| Safety | 실행 코드 설치와 문서성 흡수가 분리됨 |
| Approval readiness | 승인 요청 전 target, permission, rollback, validation이 확인됨 |
| Verification | status/lint/UTF-8 결과가 최종 보고서에 반영됨 |

## Dex Inference

OpenAI eval 자료는 agent 개선을 traces, evals, feedback으로 다루고, NN/g 자료는 연구 결과의 한계와 채택 추적을 강조한다. 따라서 Dex Company growth scan report는 "좋은 자료 목록"보다 "증거가 있는 다음 개선"에 가까워야 한다.

## Bias Check

- 이 가이드는 실행 품질을 높이려는 운영 규칙이므로 보고서가 길어질 위험이 있다. 따라서 반복 자료나 새 신호가 약한 경우 짧은 no-op 보고서를 허용한다.
- 승인 준비도 기준은 보수적이다. 실행 코드와 계정 연동은 한 번 잘못 승인하면 파일, 비밀값, 외부 워크스페이스에 영향을 줄 수 있기 때문이다.
- 보수성이 유용한 도구 도입을 늦출 수 있으므로, 정확한 프로젝트와 권한 범위가 확보되면 `approval-not-ready`를 `approval-ready-conditional`로 재판정해야 한다.

## Not Checked

- 실제 OpenAI eval run은 생성하지 않았다.
- GitHub issue form YAML은 실제 repo에 적용하지 않았다.
- 이 guide가 자동화 실행에서 반복적으로 잘 읽히는지는 다음 정기 실행에서 다시 확인해야 한다.

## Original Content

이 가이드는 이전 growth scan 보고서 개선 실험, 공식 agent/eval 자료, UX research 보고 원칙, GitHub 구조화 피드백 자료, Dex Company 설치 감사 경험을 종합한 운영 규칙이다.
