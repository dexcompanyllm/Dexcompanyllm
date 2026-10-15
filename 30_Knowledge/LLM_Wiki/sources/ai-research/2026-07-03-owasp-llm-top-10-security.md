---
type: llm-wiki-source
status: captured
title: "OWASP Top 10 for Large Language Model Applications"
sourceKind: security-guide
sourceUrl: "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
source:
  - "https://owasp.org/www-project-top-10-for-large-language-model-applications/"
  - "https://genai.owasp.org/llm-top-10/"
  - "https://github.com/OWASP/www-project-top-10-for-large-language-model-applications"
publisher: OWASP Foundation
capturedAt: 2026-07-03T16:58:09+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company 자동화, MCP, 에이전트 실행, 플러그인 검토에서 보안 실패 모드를 사전 체크리스트로 쓰기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-project
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ai-agents
  - security
  - automation
  - mcp
---

# OWASP Top 10 for Large Language Model Applications

## Source Snapshot

- URL: https://owasp.org/www-project-top-10-for-large-language-model-applications/
- Latest Top 10 entry point: https://genai.owasp.org/llm-top-10/
- GitHub repository: https://github.com/OWASP/www-project-top-10-for-large-language-model-applications
- Publisher: OWASP Foundation
- Captured for: Dex Company growth scan, agent automation hardening, LLM Wiki safety gates

## Key Notes

OWASP LLM Top 10은 LLM 애플리케이션에서 반복적으로 나타나는 보안 위험을 정리한 공개 보안 기준이다. 이번 실행에서는 특히 prompt injection, insecure output handling, sensitive information disclosure, insecure plugin design, excessive agency, overreliance가 Dex Company 자동화에 직접 연결된다.

## Why It Matters

Dex Company가 자료 검색, GitHub 후보 평가, Obsidian 저장, 자동 승인까지 수행할수록 "찾은 자료를 실행 가능한 도구로 흡수해도 되는가"를 구분해야 한다. OWASP 기준은 자료 수집과 도구 설치 사이에 보안 게이트를 두는 근거가 된다.

## Dex Company Use Example

- GitHub skill이나 MCP 서버 후보를 발견하면 자동 설치하지 않고, supply chain, excessive agency, insecure plugin design 항목을 먼저 확인한다.
- LLM Wiki에 저장되는 원문에는 비밀값, 개인식별정보, 실행 가능한 공격 절차가 섞이지 않았는지 점검한다.
- 자동화 보고서의 QA Scorecard에 "보안/권한 위험" 항목을 고정으로 둔다.

## Verification

- source-backed: OWASP Foundation 공개 프로젝트 페이지와 GitHub repository 존재를 확인했다.
- Dex inference: Dex Company 자동화에 적용할 보안 게이트는 OWASP 위험 분류를 운영 규칙으로 해석한 것이다.
- not checked: 각 OWASP 세부 항목의 최신 전문 PDF/세부 문서 전체 대조는 이번 실행 범위 밖이다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, GitHub 위치, Dex Company 적용 포인트만 보존한다.
