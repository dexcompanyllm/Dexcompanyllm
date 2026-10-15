---
type: llm-wiki-source
status: captured
title: "GitHub Copilot Kimi K2.7 Code model governance"
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
  - "https://github.blog/changelog/2026-07-01-kimi-k2-7-is-now-available-in-github-copilot/"
  - "https://docs.github.com/en/copilot/reference/ai-models/supported-models"
publisher: "GitHub"
collectionPurpose: "새 coding model이 등장할 때 Dex Company가 성능 기대보다 model policy, rollout, hosting, billing, compliance, supported surface를 먼저 확인하도록 저장한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - model-governance
  - ai-agents
  - cost-control
---

# GitHub Copilot Kimi K2.7 Code Model Governance

## Original Content

- 수집 시각: 2026-07-04 01:03 KST
- 자료 유형: GitHub 공식 changelog + GitHub Docs
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단, 미확인 범위만 보존한다.
- 확인 범위: Kimi K2.7 Code GA announcement, open-weight model positioning, Azure hosting, usage-based billing, gradual rollout, Business/Enterprise off-by-default policy, supported models docs.

## Source-Backed Notes

- GitHub은 Kimi K2.7 Code를 Copilot model picker에서 선택 가능한 GA 모델로 발표했다.
- GitHub 발표는 해당 모델이 open-weight model이고 Microsoft Azure에서 hosted된다고 설명한다.
- Copilot Business/Enterprise에서는 관리자가 policy를 켜야 조직 사용자가 선택할 수 있다.
- GitHub Docs의 supported models page는 모델 목록과 surface/plan/IDE version dependent availability를 별도 기준으로 제시한다.

## Dex Company Use Example

- 새로운 모델이 보이면 "성능이 좋다"보다 먼저 `model.policy`, `hosting.location`, `billing.rate`, `rollout.status`, `supported.surface`, `admin.enablement`, `data.governance.reviewed`를 확인한다.
- career ops, coding, QA 자동화에서 모델 선택을 바꿀 때는 산출물 품질뿐 아니라 비용과 정책 차단 여부를 보고서에 남긴다.
- 이번 실행에서는 Copilot model picker, IDE, CLI, cloud agent에서 Kimi 모델을 켜거나 테스트하지 않았다.

## Evidence Quality

- quality: medium
- 이유: GitHub 공식 changelog와 GitHub Docs가 교차 확인되지만 rollout, plan, admin policy, client version에 따라 실제 사용 가능성은 달라진다.
- 교차 검증: 기존 GitHub Copilot enterprise managed settings, AI credit session limits, browser tools source note와 같은 governance 흐름이다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, sensitive information disclosure, excessive agency, insecure output handling.
- 운영 제한: open-weight라는 설명은 자동 승인 근거가 아니다. 조직의 compliance, data governance, model policy, billing policy가 먼저 확인되어야 한다.

## Claim Split

- source-backed: Kimi K2.7 Code GA, Azure hosting, usage-based billing, Business/Enterprise admin policy requirement, supported models 목록.
- Dex inference: Dex Company model selection template에 policy/hosting/billing/surface fields를 추가해야 한다는 판단.
- not checked: 에던 Copilot plan, Business/Enterprise policy, client versions, model picker availability, 실제 품질/비용/보안 성능.

