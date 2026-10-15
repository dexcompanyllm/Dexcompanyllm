---
type: llm-wiki-source
status: captured
title: "Figma AI Credits for Make and Slides Cost Gate"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://help.figma.com/hc/en-us/articles/33459875669015-How-AI-credits-work"
  - "https://help.figma.com/hc/en-us/articles/35946832653975-Use-your-design-system-package-in-Make-kits"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
publisher: "Figma"
collectionPurpose: "Figma Make, Figma Slides, Figma MCP, Figma agent skills를 PPT/frontend 작업에 쓰기 전 좌석, 월간 AI credit, prompt별 사용량, 추가 credit 구매, context material cost, admin usage/API 확인을 분리하기 위해 수집했다."
tags:
  - llm-wiki/source
  - figma
  - ai-credits
  - figma-make
  - figma-slides
  - ppt
  - frontend
---

# Figma AI Credits for Make and Slides Cost Gate

## Original Content

- 수집 시각: 2026-07-09 07:34 KST
- 자료 유형: Figma official Help Center / Figma official blog
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 운영 판단, 비용/권한/미확인 항목만 보존한다.
- 확인 범위: Figma AI credits Help Center, Make kits design system package docs, Figma agent skills blog, 기존 Figma Make/Slides/MCP source notes.

## Source-Backed Notes

- Figma는 AI features가 credit system을 사용하며, seat type과 plan에 따라 monthly allocation이 다르다고 설명한다.
- Figma Make 같은 agentic AI features는 model, task complexity, attached files, design libraries 같은 context materials에 따라 credit consumption이 달라진다.
- Figma Make의 plan mode는 plan 작성과 build 실행을 별도 action으로 다루며, build 단계에서 추가 credit이 사용될 수 있다.
- ChatGPT에서 Figma Slides presentation을 생성하면 Figma AI credits가 사용되며, larger/image-heavy deck은 더 많은 credits를 쓸 수 있다고 설명한다.
- 사용자는 완료된 prompt의 AI credit 사용량을 사후 확인할 수 있고, admin은 dashboard 또는 Enterprise plan의 AI Usage API로 team usage를 볼 수 있다.
- credits가 부족하면 추가 AI action을 완료할 수 없고, 사용자는 admin에게 추가 credit을 요청할 수 있다.
- Make kits 문서는 production-ready React design system package를 Figma Make에서 사용할 수 있다고 설명하지만, public/private package, org admin scope, private registry 관리가 함께 필요하다.
- Figma agent skills blog는 team-specific reusable instruction을 agent에 줄 수 있다고 설명한다. 이는 편의 기능이지만, team prompt, style guide, research notes, connector context가 비용과 privacy 검토 대상이 될 수 있다.

## Dex Company Use Example

Figma AI를 PPT나 frontend prototype에 쓰기 전에는 "만들 수 있다"보다 "어떤 seat, credit, context, admin control로 만들 것인가"를 먼저 확인해야 한다.

```yaml
figma_ai_cost_gate:
  target_artifact: slides | make_prototype | make_code_handoff | agent_skill
  figma_plan: not_checked
  seat_type: Full | Dev | Collab | View | not_checked
  monthly_credit_balance: not_checked
  reset_date: not_checked
  estimated_prompt_credit_range: not_predictable
  actual_prompt_credit_after_run: not_checked
  plan_mode_extra_credit: not_checked
  attached_files_or_libraries: not_checked
  image_heavy_deck: not_checked
  admin_usage_dashboard_or_api: not_checked
  additional_credit_purchase_owner: not_checked
  private_context_exposure_review: not_checked
  decision: approval_not_ready
```

## Evidence Quality

- quality: medium
- 이유: Figma 공식 Help Center와 공식 blog를 확인했고, 기존 Figma Make local codebase handoff 및 Figma MCP Slides living deck notes와 교차 확인했다. 다만 에던님의 Figma plan, seat, credit balance, org admin dashboard, target file, actual prompt cost는 확인하지 않았다.
- 기존 자료와의 차이: 기존 notes는 repository handoff, MCP context exposure, deck refresh QA를 다뤘고, 이 note는 Figma AI credit/cost/seat/admin usage gate를 별도 운영 필드로 보강한다.

## Risk / License / Security

- 실제 설치 여부: 설치하지 않았다.
- 계정/권한 변경 여부: Figma account, file, connector, MCP, package, registry를 연결하거나 변경하지 않았다.
- 실행 코드 여부: Figma Make, MCP server, npm package, private registry를 실행하지 않았다.
- 비용 위험: credit use는 사전 정확 예측이 어렵고, complex prompt, high-cost model, attached files, large/image-heavy decks, conversation mode가 usage를 늘릴 수 있다.
- privacy risk: attached files, design libraries, team skills, PRDs, research notes, connector context가 Figma agent/MCP flow에 들어갈 수 있다.
- approval tier: knowledge-only / approval-not-ready until target file, plan, seat, credit balance, admin owner, prompt scope, context materials, and human final approval are known.

## Claim Split

- source-backed: Figma official Help Center의 AI credit allocation, variable consumption, Make/Slides usage, usage tracking, admin dashboard/API, additional credit request/purchase, Make kits plan/seat/private package constraints.
- Dex inference: Dex Company PPT/frontend checklist에 Figma AI cost gate를 추가해야 한다는 판단.
- not checked: 에던님 Figma account/plan/seat, credit balance, reset date, org admin usage, target file, actual prompt credit usage, connector/MCP availability.

