---
type: llm-wiki-source
status: active
title: "GitHub Models Retirement Migration Risk"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: single-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source: "https://github.blog/changelog/2026-07-01-github-models-is-being-fully-retired-on-july-30-2026/"
collectionPurpose: "Dex Company가 AI model/provider 기능을 플랫폼별로 의존할 때 deprecation, brownout, migration owner, rollback plan을 기록하도록 만들기 위해 저장한다."
publisher: "GitHub"
collectedAt: 2026-07-04T02:34:34+09:00
keywords:
  - GitHub Models
  - deprecation
  - model governance
  - migration risk
  - AI agents
  - automation
tags:
  - llm-wiki/source
  - ai-research
  - github
  - model-governance
---

# GitHub Models Retirement Migration Risk

## Original Content

- 원문 전체를 복사하지 않고, 공개 GitHub changelog에서 확인한 종료 일정, 영향 범위, Dex Company 적용 판단만 보존한다.
- Primary source: https://github.blog/changelog/2026-07-01-github-models-is-being-fully-retired-on-july-30-2026/
- Cross-check source: https://github.blog/changelog/month/07-2026/
- 수집 시각: 2026-07-04 02:34 KST

## Easy Summary

GitHub은 GitHub Models를 2026-07-30에 완전히 종료한다고 공지했다. 종료 이후 playground, model catalog, inference API, BYOK endpoints가 모든 고객에게 제공되지 않는다. 2026-07-16과 2026-07-23에는 brownout이 예정되어 있어, 해당 기능에 의존한 자동화는 미리 대체 경로를 정해야 한다.

## Source-Backed Notes

- GitHub changelog는 GitHub Models가 2026-07-30에 fully retired 된다고 명시했다.
- 영향 범위는 playground, model catalog, inference API, BYOK endpoints, 관련 UI다.
- 이 변경은 기존 사용 고객까지 포함해 모든 고객에게 적용된다.
- GitHub은 brownout을 2026-07-16과 2026-07-23에 예고했다.
- 대체 방향으로 Azure AI Foundry와 GitHub Copilot을 언급하지만, 이는 Dex Company가 바로 채택해야 한다는 뜻은 아니다.

## Dex Company Use

- 외부 AI/model platform을 Dex Company에 붙일 때는 `deprecation.date`, `brownout.date`, `replacement.surface`, `migration.owner`, `rollback.path`, `eval.before_after`, `cost.owner`를 기록해야 한다.
- model catalog나 inference API가 문서에 보인다는 이유만으로 안정적인 운영 표면이라고 보면 안 된다.
- GitHub/Copilot/OpenAI 모델 관련 소스 노트는 "public source availability"와 "에던님의 계정/조직/클라이언트에서 실제 사용 가능"을 계속 분리해야 한다.

## Evidence Quality

- evidence quality: high for GitHub Models retirement timeline; medium for migration advice.
- cross verification: specific changelog page plus GitHub July 2026 changelog index.
- not checked: GitHub Models docs 세부 페이지, 에던님의 GitHub Models 사용 여부, Azure AI Foundry/Copilot 대체 가능성, 실제 brownout 테스트는 확인하지 않았다.

## Risk Notes

- OWASP LLM risk mapping: overreliance, excessive agency, sensitive information disclosure if BYOK endpoints were used without migration inventory.
- migration risk: model/provider retirement은 agent workflow failure로 이어질 수 있으므로 runtime command, API endpoint, billing owner, fallback model을 분리해야 한다.
- install.status: documentation-only. Azure, GitHub Copilot, GitHub Models, API key, BYOK endpoint를 사용하거나 연결하지 않았다.

## Classification

- source-backed: retirement date, affected surfaces, brownout dates.
- Dex inference: Dex Company model migration checklist fields.
- not checked: local usage inventory and replacement runtime behavior.
