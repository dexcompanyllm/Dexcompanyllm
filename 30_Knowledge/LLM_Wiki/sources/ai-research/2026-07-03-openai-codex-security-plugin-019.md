---
type: llm-wiki-source
status: captured
title: "OpenAI Codex Security Plugin 0.1.9 Changelog"
sourceKind: official-docs
sourceUrl: "https://developers.openai.com/codex/security/plugin/changelog"
source:
  - "https://developers.openai.com/codex/security/plugin/changelog"
  - "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
publisher: OpenAI
capturedAt: 2026-07-03T22:33:00+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company security QA reports should preserve finding evidence, confidence, coverage, export format, and triage state rather than summarizing security scans loosely."
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex-security
  - security
  - qa
  - automation
---

# OpenAI Codex Security Plugin 0.1.9 Changelog

## Original Content

- Source URL: https://developers.openai.com/codex/security/plugin/changelog
- Cross-check URL: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Publisher: OpenAI
- Captured at: 2026-07-03 22:33 KST
- Preservation method: no full source copy. This note preserves metadata, verification scope, short paraphrase, risk classification, and Dex Company use.
- Checked scope: 0.1.9 changelog sections for findings workspace, simpler scan setup, portable exports, and backlog triage.

## Source-Backed Notes

- OpenAI's 0.1.9 Codex Security plugin changelog describes a findings workspace that keeps findings, coverage, severity, confidence, scan artifacts, source evidence, validation details, reachability, impact, and remediation guidance together.
- The same changelog describes scan setup improvements for Git repositories, individual folders, and codebases without Git history, plus explicit cancellation, resume behavior, and concurrent deep-scan warnings.
- Export support includes structured completed-scan artifacts and JSON, CSV, or SARIF outputs for follow-up analysis and integration.
- Triage can compare scanner/advisory/bug-bounty/GitHub/Jira/Linear findings against the current codebase and produce an evidence-backed verdict plus prioritized action queue.

## Dex Company Use Example

- For `/QA` or `/개발자` security work, Dex should not report only "security scan passed". The report should include finding evidence, severity, confidence, reachability, coverage, export location, and unresolved triage state.
- For automation scans, use the same structure in `QA_REPORT.md`: `finding`, `evidence`, `confidence`, `coverage`, `triage verdict`, `next action`, `not checked`.
- For LLM Wiki install candidates, keep OWASP LLM risk classes visible: supply chain, excessive agency, sensitive information disclosure, prompt injection, insecure output handling, and overreliance.

## Evidence Quality

- High for the existence and content of the OpenAI changelog because it is official documentation.
- Medium for applying the changelog as a Dex Company report template because that is Dex inference from the official workflow.

## Cross Verification

- Cross-checked against existing Dex Company OWASP LLM Top 10 rule: security tooling and install candidates must separate supply-chain risk, agency scope, sensitive information boundaries, prompt injection, output handling, and overreliance.
- Cross-checked against existing Growth Scan reports that already require `Evidence Table`, `Failure Pattern`, `QA Scorecard`, and install/no-install status.

## Risk / License / Install

- Install status: no install performed.
- Risk if adopted later: Codex Security plugin execution may read source trees and security findings. Project-level approval, data-boundary review, and export destination review are required before use.
- This note is documentation-only and does not grant permission to run the plugin.

## Claim Split

- source-backed: OpenAI changelog content and OWASP risk categories.
- Dex inference: using this as a Dex Company security QA report pattern.
- not checked: local plugin availability, plugin runtime behavior, repository-specific scan output, SARIF/CSV/JSON export content.
