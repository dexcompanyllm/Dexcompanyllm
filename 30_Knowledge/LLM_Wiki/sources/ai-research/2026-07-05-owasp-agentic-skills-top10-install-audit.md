---
type: llm-wiki-source
status: raw
aliases:
  - OWASP Agentic Skills Top 10
  - AST10 skill install audit
description: "OWASP Agentic Skills Top 10 source for Dex Company external skill and connector install-audit gating"
author: Dex
sourceKind: security-guide
sourceType: official-project
title: "OWASP Agentic Skills Top 10 - install audit implications"
source:
  - "https://owasp.org/www-project-agentic-skills-top-10/"
  - "https://owasp.org/www-project-agentic-skills-top-10/proposal.html"
  - "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
  - "https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/"
collectionPurpose: "Dex Company가 외부 skill, MCP server, connector, browser extension, GitHub workflow를 승인 후보로 올리기 전에 skill 특화 보안 필드를 더 엄격히 확인하도록 보존한다."
sourceVersion: "OWASP Agentic Skills Top 10 v0.5 / 2026 Edition project page; checked 2026-07-05"
capturedAt: 2026-07-05T07:27:00+09:00
created: 2026-07-05
updated: 2026-07-05
dateCreated: 2026-07-05
dateModified: 2026-07-05
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-05
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - dex-company
  - security
  - skill-install-audit
  - owasp
  - ai-agents
---

# OWASP Agentic Skills Top 10 - install audit implications

## Collection Purpose

외부 skill과 connector는 단순한 문서가 아니라 agent가 실제 파일, 네트워크, shell, 계정, memory를 어떻게 쓰는지 정하는 실행 계층입니다. 이 source note는 Dex Company의 기존 approval-ready install audit에 skill 특화 검증 필드를 추가하기 위해 저장했습니다.

## Source Metadata

- Publisher: OWASP Foundation / OWASP GenAI Security Project
- Source kind: official OWASP project page and related OWASP GenAI resources
- Capture time: 2026-07-05 07:27 KST
- License/security/install risk: 문서와 보안 프레임워크만 흡수했습니다. PDF, PPTX, scanner, code, GitHub repository, MCP server, connector, browser extension, package, workflow는 설치하거나 실행하지 않았습니다.

## Original Content

원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 요약, Dex Company 적용 기준만 보존합니다.

Checked source-backed points:

- OWASP Agentic Skills Top 10은 agent skill을 MCP tool보다 한 단계 위의 행동/워크플로우 계층으로 다룹니다. 즉 MCP가 "무엇을 호출할 수 있는가"라면 skill은 "그 도구들을 어떤 순서와 판단으로 쓰는가"를 정합니다.
- OWASP project page는 skill 설치 전에 publisher 검증, 자동 scanning, permission review, version pinning, sandbox, network restriction, file/network activity monitoring, skill inventory, approval workflow, audit logging, incident response를 요구합니다.
- AST10 summary는 malicious skills, supply-chain compromise, over-privileged skills, insecure metadata, untrusted external instructions, weak isolation, update drift, poor scanning, no governance, cross-platform reuse를 별도 risk로 분류합니다.
- Universal Skill Format proposal은 permission manifest, network allowlist, shell access declaration, content hash, signature, scan status, risk tier, identity-file write denylist 같은 metadata를 제안합니다.
- OWASP Agentic Applications 2026와 OWASP GenAI Q1 2026 exploit roundup은 agentic supply chain, identity/privilege abuse, tool misuse, unexpected code execution, sensitive information disclosure가 실제 incident 분류에 반복 등장한다고 설명합니다.

## Dex Company Use

- 외부 skill 후보는 `SKILL.md`, `manifest.json`, `package.json`, scripts만 보는 것으로 부족합니다. 이제 `skill.permissions.files`, `skill.permissions.network`, `skill.shell`, `identity_file.write_access`, `version.pin`, `content_hash`, `signature_or_provenance`, `scan_status`, `risk_tier`, `sandbox.required`, `audit_log.plan`을 approval packet에 추가합니다.
- `AGENTS.md`, `MEMORY.md`, `SOUL.md`, `.env`, token store, browser profile, Obsidian Vault 같은 identity 또는 sensitive file에 쓰기 권한을 요구하는 skill은 기본값을 `approval-not-ready` 또는 `install-audit-blocked`로 둡니다.
- network egress가 필요한 skill은 "인터넷 가능"으로 뭉뚱그리지 않고 domain allowlist, webhook 여부, external upload 여부, telemetry 여부를 확인해야 합니다.
- scanner 결과만으로 pass 처리하지 않습니다. 자연어 instructions, prompt injection, hidden scripts, update drift, runtime behavior를 함께 봅니다.

## Cross Verification

- OWASP Agentic Applications 2026은 autonomous/agentic AI의 tool misuse, privilege, cascading failure 같은 상위 위험 분류를 제공합니다.
- OWASP GenAI Q1 2026 exploit roundup은 agentic supply chain과 unexpected code execution을 실제 incident taxonomy로 다룹니다.
- 기존 Dex Company source note `2026-07-03-github-copilot-agent-skills-install-risk`는 external skill이 prompt injection, hidden instruction, malicious script를 포함할 수 있음을 GitHub Docs 기반으로 이미 저장했습니다.
- 기존 `Dex Company Approval-Ready Install Audit Model`은 OWASP LLM risk 분류와 approval packet을 요구합니다. 이번 note는 그 모델에 skill-specific fields를 보강합니다.

## Risk and Limits

- source-backed: OWASP project page와 related OWASP GenAI resources가 skill/security risk와 governance checklist를 제시합니다.
- Dex inference: Dex Company approval packet에 구체 field 이름을 추가하는 것은 기존 운영 모델에 맞춘 적용입니다.
- not checked: OWASP AST10의 모든 incident 원문, PDF/PPTX, scanner implementation, linked GitHub repository, third-party reports, CVE 원문은 이번 실행에서 전부 재검증하지 않았습니다.
- limit: OWASP Agentic Skills Top 10은 project page상 active development / proposal 성격이 있습니다. 따라서 최종 표준처럼 단정하지 않고, Dex Company install audit 강화용 보안 프레임워크로만 사용합니다.

## Approval Decision

- Decision: `knowledge-only`
- Installation status: no install
- OWASP LLM / Agentic risk mapping: supply chain, insecure metadata, over-privileged skill, prompt injection, untrusted external instructions, weak isolation, update drift, poor scanning, no governance, sensitive information disclosure, excessive agency.

> [!note] Bias Check
> Counter-argument: OWASP AST10은 아직 active development 성격이 있어 모든 항목을 최종 표준처럼 강제하면 좋은 도구 도입이 과도하게 느려질 수 있습니다.
> Data gap: 이번 실행에서는 AST10의 linked PDF, GitHub repository, scanner, third-party incident reports, CVE details를 모두 독립 검증하지 않았습니다.

## Verification

- claimType: prescriptive
- evidenceScope: multi-source-mixed
- verificationStatus: partial
- disputed: false

