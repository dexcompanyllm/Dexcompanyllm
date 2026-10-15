---
type: llm-wiki-source
status: active
title: "OpenAI Codex Business access, limits, and Developer mode guardrails"
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
sourceKind: official-help-docs
source:
  - "https://help.openai.com/en/articles/6825453-chatgpt-release-notes"
  - "https://help.openai.com/en/articles/8801890-managing-workspace-lifecycle-and-migration-in-chatgpt-business"
  - "https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes"
collectionPurpose: "Dex Company에서 Codex 작업을 시작하기 전에 plan/workspace/seat/usage-limit/Developer mode/plugin-sharing 상태를 분리해 확인하도록 운영 체크리스트를 보강하기 위한 공식 출처 보존."
tags:
  - llm-wiki/source
  - dex-company
  - codex
  - openai
  - workspace-access
  - governance
---

# OpenAI Codex Business Access, Limits, And Developer Mode Guardrails

## Summary

OpenAI Help Center의 ChatGPT release notes와 Business workspace lifecycle 문서는 Codex 사용 가능 여부를 단순한 "계정 있음"으로 판단하면 안 된다는 신호를 준다. Dex Company에서는 Codex 작업 전 다음을 분리해서 확인해야 한다.

- ChatGPT plan/workspace type
- Business workspace가 2026-06-24 이전에 Codex seat를 보유했는지 여부
- 현재 seat type이 standard ChatGPT seat인지 Codex seat인지
- Plus/Pro rate-limit reset banking이나 usage-limit 안내가 실제 계정에 표시되는지 여부
- Codex Developer mode가 꺼져 있는지, 켜야 한다면 어떤 브라우저/DevTools 접근이 필요한지
- Enterprise/Edu plugin sharing, Codex analytics, workspace agent pricing이 적용되는 조직인지 여부

## Why It Matters For Dex Company

- 에던님의 Codex 실행 환경을 점검할 때 "OpenAI 문서에 기능이 있다"와 "현재 workspace에서 쓸 수 있다"를 분리해야 한다.
- Business workspace migration이나 seat 변경은 ChatGPT workspace access와 history visibility에 영향을 줄 수 있다.
- Developer mode는 브라우저 문제 진단에 유용하지만 Chrome DevTools Protocol 접근을 열기 때문에 기본 off 상태와 사용 목적, 데이터 노출 범위를 확인해야 한다.
- rate-limit reset banking은 개인 Plus/Pro의 사용한도 운용 신호이지, 자동화가 임의로 reset을 전제로 삼아도 된다는 뜻은 아니다.

## Evidence Notes

- Source-backed: OpenAI ChatGPT release notes는 2026-06-11 Codex updates에서 Plus/Pro rate-limit reset banking, Codex Developer mode, `/init`, usage-limit error guidance를 설명한다.
- Source-backed: OpenAI Business workspace lifecycle 문서는 2026-06-24 이후 새 Business workspace의 Codex seat availability가 제한되고, 기존 Codex seat 보유 workspace만 usage-based Codex seats를 계속 관리할 수 있다고 설명한다.
- Source-backed: 같은 Business lifecycle 문서는 standard ChatGPT seat를 Codex seat로 바꾸면 workspace ChatGPT access와 history visibility가 달라질 수 있다고 설명한다.
- Source-backed: Enterprise/Edu release notes는 Codex analytics와 plugin sharing 상태를 workspace admin control과 연결한다.
- Dex inference: Dex Company 자동화와 프로젝트 작업 전에는 `plan_workspace`, `seat_type`, `usage_limit_source`, `developer_mode_state`, `plugin_sharing_state`, `analytics_visibility`를 checklist field로 분리하는 것이 안전하다.
- Not checked: 에던님의 실제 OpenAI plan, workspace seat, rate-limit reset bank, Developer mode toggle, Enterprise/Edu admin state, plugin sharing status는 이번 실행에서 확인하지 않았다.

## Operational Checklist Fields Added

```yaml
codex_access_precheck:
  plan_workspace: personal_plus | personal_pro | business | enterprise | edu | not_checked
  business_codex_seat_grandfathered_before_2026_06_24: yes | no | not_applicable | not_checked
  current_seat_type: standard_chatgpt | codex | mixed | not_checked
  workspace_history_visibility_risk: yes | no | not_checked
  rate_limit_reset_bank_available: yes | no | not_checked
  usage_limit_reset_timing_visible: yes | no | not_checked
  developer_mode_state: off | on | unavailable | not_checked
  developer_mode_scope_needed: none | console | network | dom_styles | performance_profile | not_checked
  plugin_sharing_state: disabled | enabled | not_applicable | not_checked
  codex_admin_analytics_available: yes | no | not_checked
```

## Security / Approval Notes

- Developer mode is not an install candidate, but it is a permission-sensitive runtime mode. Treat it like a browser inspection permission: use only for a target page/task and record why console, network, DOM, style, or performance access is required.
- Plugin sharing is account/workspace-specific. Do not publish or share a local plugin without explicit Ethan approval, source/provenance review, permission review, rollback path, and private context exposure review.
- Business workspace seat changes can affect access. Do not recommend migration or seat changes from public docs alone.

## Cross-Verification

- OpenAI ChatGPT release notes and OpenAI Business workspace lifecycle docs agree that Codex availability and usage behavior are plan/workspace dependent.
- Enterprise/Edu release notes cross-check that admin analytics and plugin sharing are governed at workspace/admin level, not merely by local app presence.
- Existing Dex Company install audit model already requires account/workspace, permissions, billing, rollback, and validation before adoption; this source adds Codex-specific access and seat fields.

## Not Checked

- 에던님의 actual ChatGPT/Codex plan and workspace.
- Whether any active Business workspace has grandfathered Codex seats.
- Whether rate-limit reset banking is visible in the current Codex app.
- Whether Developer mode exists or is enabled in the local app.
- Whether plugin sharing or Codex admin analytics exists in any Ethan-controlled workspace.

## Original Content

Captured metadata and short operational summary from OpenAI official Help Center pages:

- ChatGPT release notes, especially 2026-06-11 Codex updates and nearby Codex release entries.
- Managing workspace lifecycle and migration in ChatGPT Business, especially 2026-06-24 Codex seat availability and seat-type access behavior.
- ChatGPT Enterprise & Edu release notes, especially Codex analytics, plugin sharing, and workspace agent admin controls.

No full article text was copied. This note preserves URL, collection purpose, confirmation scope, and Dex Company operational implications.
