---
type: llm-wiki-source
status: captured
title: "GitHub Copilot AI credit pools for cost centers"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog-and-docs
source:
  - "https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/"
  - "https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises"
publisher: "GitHub"
collectionPurpose: "Dex Company에서 agent/automation 비용을 session limit뿐 아니라 cost center, included credit pool, overage policy로 분리해 판단하기 위해 저장한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - cost-control
  - ai-credits
  - governance
---

# GitHub Copilot AI Credit Pools for Cost Centers

## Original Content

- 수집 시각: 2026-07-04 01:03 KST
- 자료 유형: GitHub 공식 changelog + GitHub Docs
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단, 미확인 범위만 보존한다.
- 확인 범위: cost center별 included AI credit pool cap, REST API 우선 제공, pooled AI credits, additional usage budgets, user-level/cost-center/enterprise/organization budget layer.

## Source-Backed Notes

- GitHub은 cost center가 enterprise monthly included AI credits 중 사용할 수 있는 범위를 제한하는 AI credit pool을 발표했다.
- 이 cap은 cost center budget과 다르다. included usage pool을 제한하는 cap과 pool 소진 후 metered charge를 제한하는 budget이 구분된다.
- GitHub Docs는 Copilot usage가 AI credits로 측정되고, model과 token consumption에 따라 비용이 달라진다고 설명한다.
- 비용 통제는 user-level budgets, cost-center budgets, enterprise spending limits, organization-level budgets 같은 여러 층으로 나뉜다.

## Dex Company Use Example

- Dex Company가 GitHub Copilot/agentic workflow를 조직 단위로 쓰게 되면 `session.limit`만으로 충분하지 않다. `cost_center`, `included_pool_cap`, `overage_policy`, `billing_owner`를 함께 기록해야 한다.
- 자동화 보고서의 Metrics에는 실행 횟수뿐 아니라 비용 경계가 확인됐는지 `budget.scope_checked` 같은 필드를 둘 수 있다.
- 이번 실행에서는 GitHub billing API, cost center API, budget 설정을 조회하거나 변경하지 않았다.

## Evidence Quality

- quality: medium
- 이유: GitHub 공식 changelog와 billing docs가 일치하지만 실제 적용은 Copilot Business/Enterprise, Enterprise Cloud, billing role, REST API 상태에 의존한다.
- 교차 검증: 기존 GitHub Copilot AI credit session limits note와 같은 비용 통제 계열이지만, 이번 note는 조직/cost-center pool boundary를 추가한다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, excessive agency, sensitive information disclosure.
- 운영 제한: 비용 cap이 있다고 해도 agent 품질, 권한, 비밀값 노출, unsafe output 위험은 별도 gate로 유지해야 한다.

## Claim Split

- source-backed: cost center AI credit pool, included pool cap과 metered budget의 구분, AI credit 기반 usage billing.
- Dex inference: Dex Company 자동화 템플릿에 `budget.scope`, `billing.owner`, `overage.policy`를 넣어야 한다는 판단.
- not checked: 에던 GitHub Enterprise/Business 보유 여부, billing manager 권한, REST API 설정, 실제 credit 잔액/소진/차단 동작.

