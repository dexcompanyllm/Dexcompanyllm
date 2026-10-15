---
type: llm-wiki-source
status: captured
title: "OpenAI Codex Python SDK runtime boundary"
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
  - "https://developers.openai.com/codex/sdk"
  - "https://developers.openai.com/codex/changelog"
publisher: "OpenAI"
collectionPurpose: "Codex SDK가 로컬 app-server와 pinned CLI runtime을 다루는 경계를 저장해 자동화/SDK 설치 판단에서 런타임과 버전 고정을 분리한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - sdk
  - automation
  - runtime
---

# OpenAI Codex Python SDK Runtime Boundary

## Original Content

- 수집 시각: 2026-07-04 01:34 KST
- 자료 유형: OpenAI 공식 Codex SDK 문서와 Codex changelog
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, 운영 판단, 미확인 범위만 보존한다.
- 확인 범위: Python SDK는 로컬 Codex app-server를 JSON-RPC로 제어하고, Python 3.10 이상과 pinned Codex CLI runtime dependency를 요구한다는 문서 신호.

## Source-Backed Notes

- OpenAI 문서는 Codex Python SDK가 로컬 Codex app-server를 JSON-RPC로 제어한다고 설명한다.
- SDK 배포물에는 pinned Codex CLI runtime dependency가 포함된다고 설명되어 있다.
- `CodexConfig(codex_bin=...)`는 특정 로컬 Codex executable을 의도적으로 쓰려는 경우에만 쓰는 선택지로 제시된다.
- SDK는 beta 상태로 설명되며, 설치 명령은 `pip install openai-codex`다.

## Dex Company Use Example

- Dex Company 자동화에서 SDK를 쓰고 싶어도 바로 설치하지 않는다. 먼저 `runtime.owner`, `codex_bin.source`, `sdk.version`, `cli.runtime.pinned`, `sandbox.mode`, `rollback.path`를 기록한다.
- 현재 실행에서는 `pip`, `npm`, SDK, app-server, Codex CLI 명령을 설치하거나 실행하지 않았다.
- Obsidian 자동화가 SDK를 쓰는 구조로 바뀐다면, source note가 아니라 프로젝트별 실사 문서와 승인 절차가 필요하다.

## Evidence Quality

- quality: medium
- 이유: OpenAI 공식 문서와 changelog가 근거지만, 로컬 Windows Codex Desktop/계정/SDK 설치 가능성은 확인하지 않았다.
- 교차 검증: 기존 Codex App Server, Codex access tokens, Codex managed configuration source note와 같은 런타임/권한 경계로 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: supply chain, insecure plugin design, excessive agency, sensitive information disclosure, insecure output handling.
- 운영 제한: SDK는 자동화 코드에서 Codex를 조작할 수 있으므로 승인 전에는 패키지 설치, app-server 실행, auth file 생성, credential 전달을 금지한다.

## Claim Split

- source-backed: SDK가 로컬 app-server를 JSON-RPC로 제어하고 pinned CLI runtime dependency를 포함한다는 공식 문서 내용.
- Dex inference: Dex Company가 SDK 기반 자동화를 도입하려면 runtime/source/rollback 필드를 별도 gate로 둬야 한다는 판단.
- not checked: 현재 PC의 SDK 설치 가능성, package metadata, dependency tree, 실제 app-server 동작, 계정 권한, sandbox 동작.

