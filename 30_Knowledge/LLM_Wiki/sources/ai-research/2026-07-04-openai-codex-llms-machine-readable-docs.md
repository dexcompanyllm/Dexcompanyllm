---
type: llm-wiki-source
status: captured
title: "OpenAI Codex llms.txt machine-readable docs"
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
  - "https://developers.openai.com/codex/llms.txt"
  - "https://developers.openai.com/codex/llms-full.txt"
  - "https://developers.openai.com/codex/codex-manual.md"
publisher: "OpenAI"
collectionPurpose: "Codex 공개 문서를 검색 결과가 아니라 공식 machine-readable docs entrypoint로 확인하는 방법을 Dex Company source-driven 작업 기준으로 저장한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - source-driven
  - documentation
---

# OpenAI Codex llms.txt Machine-Readable Docs

## Original Content

- 수집 시각: 2026-07-04 02:01 KST
- 자료 유형: OpenAI 공식 Codex 문서의 machine-readable index와 Markdown export
- 핵심 내용 쉬운 설명: OpenAI Codex docs는 `llms.txt`에서 Codex 문서 지도를 제공하고, combined docs인 `llms-full.txt`, condensed manual인 `codex-manual.md`, 각 문서의 Markdown twin을 안내한다. Dex가 Codex 사용법을 확인할 때 검색 결과 조각보다 공식 Markdown 문서를 우선 참조할 수 있다.
- Dex Company 사용 예시: Codex 기능, Windows, automation, security, permissions, pricing, SDK, plugins, skills 같은 항목을 조사할 때 먼저 `llms.txt`로 문서 위치를 찾고, 필요한 개별 `.md` 또는 `llms-full.txt`를 근거로 source note를 작성한다.
- source-backed: `llms.txt`는 combined Codex docs, Codex manual, 개별 Markdown 문서 링크를 공식적으로 나열한다.
- Dex inference: Growth Scan과 일반 Codex 설정 질의에서 `search result -> docs page -> machine-readable markdown` 순서로 검증하면 오래된 블로그나 요약에 끌려갈 위험이 줄어든다.
- not checked: `llms-full.txt` 전체 문서의 모든 항목을 이번 실행에서 끝까지 대조하지는 않았다. 특정 기능 사용 전에는 해당 개별 문서를 다시 읽어야 한다.

## Evidence Quality

- quality: high for source location, medium for operational completeness
- 이유: OpenAI 공식 문서 엔트리포인트이지만, 문서 전체의 최신성이나 특정 기능의 로컬 사용 가능성까지 증명하지는 않는다.
- 교차 검증: 기존 LLM Wiki의 OpenAI Codex config, automation, security, SDK, model governance source notes와 같은 공식 문서 계열이다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, insecure output handling.
- 운영 제한: machine-readable docs는 인용과 요약을 쉽게 만들지만, 긴 문서를 그대로 복사해 저장하지 않는다. 각 source note에는 확인 범위와 not checked를 분리해야 한다.

## Claim Split

- source-backed: OpenAI가 Codex docs용 `llms.txt`, `llms-full.txt`, `codex-manual.md`, 개별 Markdown docs를 제공한다.
- Dex inference: Dex Company는 Codex 관련 규칙이 자주 바뀌므로 이 엔트리포인트를 우선 확인해야 한다.
- not checked: 전체 문서 diff, OpenAI docs generator 버전, 모든 Markdown twin의 완전성.
