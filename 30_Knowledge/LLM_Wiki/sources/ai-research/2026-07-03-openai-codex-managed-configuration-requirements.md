---
type: source-note
status: active
confidence: medium
claimType: prescriptive
evidenceScope: single-source-primary
verificationStatus: partial
disputed: false
sourceKind: official-docs
source: "https://developers.openai.com/codex/enterprise/managed-configuration"
collectionPurpose: "Codex managed requirements를 Dex Company 보안/자동화 정책 판단 근거로 보존한다."
dateCreated: 2026-07-03
dateModified: 2026-07-03
created: 2026-07-03
updated: 2026-07-03
verifiedAt: 2026-07-03
verifiedBy: Dex
tags: [llm-wiki/source, codex, security, automation]
---

# OpenAI Codex managed configuration requirements

## Original Content

- Source: https://developers.openai.com/codex/enterprise/managed-configuration
- Publisher: OpenAI
- Collected: 2026-07-03 23:35 KST
- Preserved scope: URL, metadata, short summary, operational fit, and verification limits. Full source text was not copied.

## Summary

OpenAI documents managed requirements for Codex Business/Enterprise users. Admins can define `requirements.toml`-compatible policies such as allowed sandbox modes, approval policies, command rules, and Appshots restrictions. Codex can fetch and cache those requirements locally, but may continue without that layer if no valid cache is available and fetching fails.

## Dex Company Use

Dex should separate local AGENTS/project rules, local config, and cloud-managed requirements. Do not say a managed requirement is active unless live effective requirements or the app/account state has been checked.

## Evidence Quality

- source-backed: OpenAI official docs describe managed configuration, group matching, cache behavior, and Appshots control.
- Dex inference: Dex Company security reviews should add a `policy source` field.
- not checked: Ethan plan, admin settings, local managed cache, and effective requirements.

## Risk / QA

No tool was installed or enabled. OWASP LLM risks mitigated only if the policy is actually enforced; overreliance remains if Dex assumes enforcement without live verification.

## WCAG Link

Not a UI accessibility source. WCAG 2.2 applies only indirectly when managed policy affects browser/Appshots/UI QA workflows.
