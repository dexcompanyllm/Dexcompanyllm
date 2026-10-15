---
type: llm-wiki-guide
status: active
layer: wiki
explored: false
title: "Dex Company 10x Growth Scan Operating Model"
created: 2026-07-03
updated: 2026-07-04
dateCreated: 2026-07-03
dateModified: 2026-07-04
confidence: high
claimType: prescriptive
evidenceScope: user-original
verificationStatus: verified
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/wiki
  - growth-scan
  - dex-company
  - automation
---

# Dex Company 10x Growth Scan Operating Model

## 목적

에던님이 말한 10배 성과는 **자료를 10배 많이 모으는 것**이다. 이전 정의처럼 "링크 수가 아니라 운영 품질을 10배 높이는 것"으로만 해석하면 안 된다.

10배 스캔의 목적은 평소 5-12개 후보를 보던 실행보다 훨씬 넓게 후보를 모으고, 그중 원래 Dex Company 성장 스캔 기준을 통과하는 자료만 source note, wiki note, inbox, 설치 후보 감사 기록으로 분류하는 것이다.

## Corrected Rule

1. `10x`는 우선 **candidate volume**으로 측정한다.
2. 일반 실행의 후보 선별 범위가 5-12개라면, 10배 실행은 대략 50-120개 후보를 목표로 한다.
3. 10배 실행에서도 품질 게이트는 낮추지 않는다. 자료가 많아져도 출처, 중복, provenance, 보안, 라이선스, 설치 리스크는 그대로 확인한다.
4. 모든 후보를 source note로 승격하지 않는다. 후보를 많이 모은 뒤 `stored`, `inbox`, `duplicate`, `rejected`, `deferred`, `install-audit`로 분류한다.
5. OpenAI API, Codex, 보안, 자동화처럼 변화가 빠른 영역은 공식 문서와 현재 공개 소스를 우선한다.
6. 설치 가능한 도구, MCP server, skill, plugin, package는 문서 흡수와 실행 설치를 분리한다.
7. 설치 후보는 [[Dex Company Approval-Ready Install Audit Model]]로 판단한다. 실제 설치는 approval-ready packet이 완성되고 에던님이 명시 승인한 뒤에만 진행한다.

## Metrics

| Metric | Meaning |
|---|---|
| `candidate_target.count` | 10배 실행에서 목표로 잡은 후보 수 |
| `candidate_seen.count` | 실제 확인한 후보 수 |
| `candidate_eligible.count` | 원래 성장 스캔 기준에 맞는 후보 수 |
| `stored.source.count` | source note로 승격한 자료 수 |
| `stored.inbox.count` | provenance 또는 목적이 약해 inbox에 둔 자료 수 |
| `duplicate.count` | 기존 source/wiki/report/inbox와 중복된 자료 수 |
| `deferred.count` | 다음 실행에서 재판정해야 하는 자료 수 |
| `install_audit.count` | 설치 가능한 도구로 별도 감사한 후보 수 |
| `approval_ready_pass.count` | 에던님이 승인만 하면 실행 가능한 수준까지 검토된 후보 수 |
| `approval_ready_conditional.count` | 특정 조건이 맞으면 승인 가능한 후보 수 |
| `approval_not_ready.count` | 아직 승인 요청을 하면 안 되는 후보 수 |
| `install_blocked.count` | 보안, 라이선스, 권한, 공급망, 호환성 문제로 막은 후보 수 |

## Candidate Classification

| Status | Definition |
|---|---|
| `stored-source` | 출처와 목적이 명확하고 재사용 가치가 있어 source note로 저장 |
| `stored-wiki` | 여러 source를 바탕으로 Dex Company 운영 규칙이나 개념으로 정리 |
| `inbox` | 흥미롭지만 provenance, 목적, 검증 범위가 약해 후보함에 저장 |
| `duplicate` | 이미 LLM Wiki source/wiki/report/inbox에 있음 |
| `rejected` | 품질, 출처, 관련성, 안전성 부족으로 제외 |
| `deferred` | 지금 판단할 수 없어서 다음 실행에서 재판정 |
| `approval-ready-pass` | 승인 packet이 완성되어 에던님이 승인만 하면 되는 후보 |
| `approval-ready-conditional` | 특정 프로젝트, 버전, 권한, 계정 조건이 맞을 때만 승인 가능한 후보 |
| `approval-not-ready` | 아직 대상 프로젝트, 권한, 비용, rollback, 검증 계획이 부족해 승인하면 안 되는 후보 |
| `install-audit-blocked` | 현재 기준에서는 설치하지 않는 후보 |
| `knowledge-only` | 설치 대상이 아니라 운영 지식으로만 흡수할 자료 |

## Installation Gate

설치 가능한 후보는 다음 항목이 모두 확인되어야 한다.

1. 공식 또는 신뢰 가능한 source URL
2. README 또는 사용 문서
3. license 및 license 충돌 여부
4. 최근 release/tag 또는 활동성
5. package/dependency/audit 결과
6. install script와 postinstall/prepare/prepack 등 실행 스크립트
7. 요구 권한, data access, network access, secret handling
8. sandbox/CSP/CORS/auth 같은 보안 경계
9. rollback 또는 제거 방법
10. Dex Company에서 실제로 쓸 use case

모든 기준이 확인되어도 바로 설치하지 않는다. `approval-ready-pass`는 "에던님이 승인만 하면 되는 상태"이지 "자동 설치 완료"가 아니다.

## Source Notes

- [[2026-07-03-openai-codex-iterative-repair-loop]]
- [[2026-07-03-openai-codex-goals]]
- [[2026-07-03-openai-skills-oss-maintenance]]
- [[2026-07-03-mcp-security-best-practices]]
- [[2026-07-03-mcp-apps-install-audit]]
- [[Dex Company Approval-Ready Install Audit Model]]

## Dex Inference

자료량 10배는 무작정 저장을 뜻하지 않는다. 에던님 요구의 핵심은 더 넓은 표본을 확보한 뒤, 원래 기준에 맞는지 판단하고, 설치 가능한 후보는 승인 직전 판단까지 밀어붙이는 것이다. 따라서 10배 실행의 좋은 결과는 "많이 모았고, 많이 버렸고, 통과한 것은 왜 통과했는지 증거가 있다"에 가깝다.

## Bias Check

- 이 가이드는 에던님의 직접 정정을 최상위 근거로 둔다. 따라서 일반적인 "품질 중심" 해석보다 사용자의 의도를 우선한다.
- 자료량을 늘리는 기준은 과잉 수집으로 변할 수 있으므로 후보 수집과 source note 승격을 분리한다.
- 설치 후보를 빨리 결론내려는 압력이 생길 수 있으므로, `approval-ready-pass`보다 `approval-ready-conditional`, `approval-not-ready`, `install-audit-blocked`를 명확히 쓰는 편을 기본값으로 둔다.
- 10배 목표를 숫자로만 맞추면 저품질 자료가 쌓일 수 있으므로, 다음 실행은 후보 수만큼 제외 근거도 기록해야 한다.

## Not Checked

- 10배 후보 전체 50-120개를 한 번에 모두 source note로 저장할 때의 운영 비용은 아직 별도 측정하지 않았다.
- 후보 대량 수집을 위한 자동 대시보드는 아직 구현하지 않았다.

## Original Content

이 가이드는 에던님의 10배 성장 스캔 정정, 기존 growth scan 운영 규칙, LLM Wiki 중복 방지 원칙, 설치 감사 경험을 종합한 운영 규칙이다.
