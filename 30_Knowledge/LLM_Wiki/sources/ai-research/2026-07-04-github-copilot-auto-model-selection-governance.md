---
type: llm-wiki-source
status: captured
title: "GitHub Copilot auto model selection governance"
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
sourceKind: official-docs
source:
  - "https://github.blog/changelog/2026-07-01-enterprises-can-default-to-auto-model-selection/"
  - "https://github.blog/changelog/2026-07-01-copilot-cli-auto-model-selection-routes-based-on-task"
  - "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models"
  - "https://docs.github.com/en/copilot/concepts/models/fallback-and-lts-models"
publisher: "GitHub"
collectionPurpose: "Copilot 모델 선택이 수동 고정값만이 아니라 enterprise policy, auto routing, model availability, LTS/base model 정책으로 결정된다는 점을 Dex Company 모델 거버넌스 기준에 반영한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - models
  - governance
  - automation
---

# GitHub Copilot Auto Model Selection Governance

## Original Content

- 수집 시각: 2026-07-04 02:01 KST
- 자료 유형: GitHub 공식 changelog와 GitHub Docs
- 핵심 내용 쉬운 설명: GitHub Copilot은 enterprise `managed-settings.json`에서 새 대화의 기본 모델을 `auto`로 지정할 수 있고, Copilot CLI의 auto model selection은 모델 가용성, 신뢰도, 작업 특성을 고려해 모델을 고른다. 모델 접근 정책은 조직/엔터프라이즈 정책을 따르며, Business/Enterprise에는 base model과 LTS model 개념도 있다.
- Dex Company 사용 예시: Copilot이나 외부 agent 결과를 비교할 때 "무슨 모델을 썼는가"를 단일 문자열로만 보지 않고 `model.mode`, `model.policy_source`, `auto.routing_basis`, `base_or_lts_model`, `user_override_allowed`, `billing_owner`를 기록한다.
- source-backed: GitHub changelog는 enterprise auto default와 CLI auto routing을 설명하고, GitHub Docs는 모델 접근 정책과 base/LTS model 개념을 설명한다.
- Dex inference: Dex Company 자동화 보고서에서 모델 결과 품질을 비교하려면 "auto"가 실제로 어떤 모델을 골랐는지, 정책과 비용 소유자가 누구인지 확인해야 한다.
- not checked: 에던님의 GitHub Enterprise/Business 권한, 실제 `managed-settings.json`, Copilot CLI 버전, 모델 picker, 사용량/비용 결과는 확인하지 않았다.

## Evidence Quality

- quality: medium
- 이유: 공식 문서와 changelog 기반이지만 제품, 플랜, 정책, 클라이언트 버전에 따라 실제 동작이 달라질 수 있다.
- 교차 검증: 기존 `GitHub Copilot enterprise managed-settings governance`, `GitHub Copilot AI credit session limits`, `GitHub Copilot Kimi model governance`, `OpenAI Codex model governance and deprecations` source notes와 같은 모델/비용/정책 계열이다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, excessive agency, sensitive information disclosure.
- 운영 제한: auto model selection은 편의 기능이지만 재현성과 감사 가능성을 낮출 수 있다. 중요한 결과물은 모델 모드, 정책 출처, 비용 한도, human review를 함께 기록해야 한다.

## Claim Split

- source-backed: GitHub는 enterprise auto model default, Copilot CLI auto routing, 모델 접근 정책, base/LTS model 개념을 문서화한다.
- Dex inference: 자동 모델 선택을 쓰는 작업은 결과 품질 평가와 비용 평가에서 별도 추적 필드를 가져야 한다.
- not checked: 로컬 Copilot CLI, VS Code/JetBrains/Xcode 클라이언트 적용 상태, enterprise policy 실제 값, 모델별 비용/품질.
