---
type: llm-wiki-source
status: captured
title: "OpenAI Codex Access Tokens for Programmatic Workflows"
sourceKind: official-docs
sourceUrl: "https://developers.openai.com/codex/enterprise/access-tokens"
source:
  - "https://developers.openai.com/codex/enterprise/access-tokens"
  - "https://developers.openai.com/codex/auth/ci-cd-auth"
publisher: OpenAI
capturedAt: 2026-07-03T23:03:00+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company 자동화가 Codex local을 비대화형으로 실행할 때 API key, ChatGPT-managed auth, Codex access token의 경계를 헷갈리지 않도록 보존한다."
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - automation
  - access-token
  - security
---

# OpenAI Codex Access Tokens for Programmatic Workflows

## Original Content

- Source URL: https://developers.openai.com/codex/enterprise/access-tokens
- Cross-check URL: https://developers.openai.com/codex/auth/ci-cd-auth
- Publisher: OpenAI
- Captured at: 2026-07-03 23:03 KST
- Preservation method: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, 위험 구분, Dex Company 적용 판단만 보존한다.
- Checked scope: Codex access token purpose, workspace support boundary, secret handling risks, CI/CD auth fallback, and recommended credential choice.

## Source-Backed Notes

- OpenAI Codex access tokens are scoped ChatGPT access tokens for trusted automation that runs Codex local with a ChatGPT workspace identity.
- The official docs say Codex access tokens are currently supported for ChatGPT Business and Enterprise workspaces.
- OpenAI says Platform API keys remain the default if they satisfy the automation need; Codex access tokens are for workflows that specifically need ChatGPT workspace access, Codex entitlements, or enterprise controls.
- The docs distinguish Codex access tokens from Workspace Agent access tokens and Platform API keys.
- The official risk list includes leaked secrets, untrusted runners, shared identities, stale credentials, and wrong credential type.
- The CI/CD auth guide says API keys are still recommended for most CI/CD jobs and treats `auth.json` as password-like because it contains access tokens.

## Dex Company Use Example

- Dex Company 자동화에서 "Codex를 scheduled job으로 돌리고 싶다"는 요구가 생기면 먼저 Platform API key로 충분한지 확인한다.
- ChatGPT workspace 권한, Codex entitlement, governance/audit identity가 꼭 필요할 때만 Codex access token을 후보로 본다.
- 토큰은 Obsidian note, Git repo, report, chat log에 저장하지 않는다. 필요한 경우 secret manager 위치와 만료/회전 정책만 문서화한다.
- 자동화 QA에는 runner trust boundary, fork/public CI 금지, token owner, expiration, revocation path, log redaction을 포함한다.

## Evidence Quality

- High for token support boundaries because the source is OpenAI official documentation.
- High for credential risk categories because they are listed in OpenAI official docs and cross-checked with the CI/CD auth guide.
- Medium for Dex Company workflow policy because it is Dex inference from official credential guidance and existing no-secret vault rules.

## Cross Verification

- Cross-checked Codex access token docs against OpenAI CI/CD auth guidance.
- Cross-checked with existing Dex Company AGENTS rule that secrets, API keys, tokens, and passwords must not be stored in notes or code.
- Cross-checked with OWASP LLM risk categories for sensitive information disclosure, excessive agency, and overreliance.

## Risk / License / Install

- Install status: no install performed.
- Secret status: no token, auth file, API key, credential, or password was generated, requested, copied, or stored.
- Risk if adopted later: token leakage can start Codex runs as the token creator; untrusted runners and shared identities make audit ownership weak.
- License risk: not applicable to this documentation-only note.

## Claim Split

- source-backed: OpenAI's description of Codex access token purpose, Business/Enterprise support, credential distinctions, and risk list.
- Dex inference: Dex Company should default to API keys when sufficient and reserve Codex access tokens for trusted workspace-governed automation.
- not checked: current Ethan workspace plan/eligibility, admin permission state, actual access-token UI, local Codex version support, any real CI/CD runner configuration.
