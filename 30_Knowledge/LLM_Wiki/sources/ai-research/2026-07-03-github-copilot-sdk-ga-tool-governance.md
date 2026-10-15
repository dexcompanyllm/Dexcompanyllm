---
type: source-note
status: active
confidence: medium
claimType: prescriptive
evidenceScope: single-source-primary
verificationStatus: partial
disputed: false
sourceKind: official-changelog
source: "https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/"
collectionPurpose: "Agent SDK의 tools, MCP, hooks, auth, tracing, remote session 리스크를 Dex Company 설치 후보 감사 기준으로 보존한다."
dateCreated: 2026-07-03
dateModified: 2026-07-03
created: 2026-07-03
updated: 2026-07-03
verifiedAt: 2026-07-03
verifiedBy: Dex
tags: [llm-wiki/source, github, ai-agents, sdk, security]
---

# GitHub Copilot SDK GA tool governance

## Original Content

- Source: https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/
- Publisher: GitHub
- Collected: 2026-07-03 23:35 KST
- Preserved scope: URL, metadata, short summary, operational fit, and verification limits. Full source text was not copied.

## Summary

GitHub announced Copilot SDK general availability with custom tools and MCP, fine-grained prompt customization, OpenTelemetry tracing, flexible auth, cloud/remote sessions, hooks, and permission-request interception.

## Dex Company Use

SDK-style orchestration should be treated as a runtime product, not a lightweight note. Any future trial needs explicit review of hooks, permissions, auth, tool overrides, traces, and remote sessions.

## Evidence Quality

- source-backed: GitHub official changelog lists GA capabilities.
- Dex inference: Dex Company should classify SDKs as due-diligence candidates.
- not checked: SDK code, package metadata, license, runtime, and Codex compatibility.

## Risk / QA

No SDK was installed. OWASP LLM risks include supply chain, insecure plugin design, excessive agency, sensitive information disclosure, and insecure output handling.

## WCAG Link

Not directly a frontend accessibility source. UI changes produced by SDK agents still need WCAG 2.2-oriented QA.
