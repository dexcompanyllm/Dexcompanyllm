---
type: llm-wiki-source
status: captured
title: "OpenAI Codex App Server JSON-RPC harness"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: technical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-blog-and-changelog-crosscheck
source:
  - "https://openai.com/index/unlocking-the-codex-harness/"
  - "https://developers.openai.com/codex/changelog"
publisher: "OpenAI"
collectionPurpose: "Codex Desktop, CLI, IDE, web runtime이 agent harness를 어떤 protocol/event/approval boundary로 공유하는지 이해해 future integration 후보를 no-install 상태로 판단한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - app-server
  - json-rpc
  - agent-runtime
---

# OpenAI Codex App Server JSON-RPC Harness

## Original Content

- 수집 시각: 2026-07-04 00:34 KST
- 자료 유형: OpenAI 공식 blog + Codex changelog 교차 확인
- 원문 보존 방식: 원문 전체를 복사하지 않고, 공개 설명의 구조, 확인 범위, Dex Company 적용 판단, 설치/실행 제한만 보존한다.
- 확인 범위: Codex App Server가 Codex core thread를 long-lived process로 호스팅하고, client와 JSON-RPC over stdio로 event/update/approval 흐름을 주고받는다는 설명. Codex Desktop, TUI/CLI, web runtime, IDE integration이 같은 harness 쪽으로 정렬되는 방향.

## Source-Backed Notes

- OpenAI는 Codex App Server를 client-friendly bidirectional JSON-RPC API로 설명한다.
- App Server는 thread manager와 core thread를 통해 한 thread의 상태와 event stream을 유지하고, client는 request와 many server notifications를 주고받는다.
- Web runtime은 browser tab이 source of truth가 아니라 server-side state와 streaming/reconnect를 통해 장기 작업을 이어가는 방향으로 설명된다.
- Codex changelog에는 app-server, remote, permission, plugin, goal, resume 등 관련 변경이 지속적으로 등장한다.

## Dex Company Use Example

- Dex Company가 향후 Codex integration이나 runtime bridge를 검토할 때 MCP, plugin, browser extension, App Server를 같은 것으로 보지 않는다.
- 장기 실행 자동화는 "chat window가 열려 있다"가 아니라 thread/session state, event trace, approval point, reconnect behavior가 보존되는지를 봐야 한다.
- App Server 관련 실험은 설치/실행 후보일 뿐이며, 현재 Growth Scan에서는 문서 흡수만 하고 `codex app-server` 같은 명령은 실행하지 않는다.

## Evidence Quality

- quality: medium
- 이유: OpenAI 공식 설명과 Codex changelog를 교차 확인했지만, local App Server command, protocol schema, version compatibility, Windows package behavior는 직접 실행하지 않았다.
- 교차 검증: 기존 Codex managed configuration, Codex import, Codex remote connections, Codex access token, agent session trace source notes와 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, sensitive information disclosure, insecure output handling, insecure plugin design.
- 운영 제한: App Server는 workspace, thread state, approvals, credentials, plugins, MCP, filesystem permissions와 맞물릴 수 있으므로 실험 전 target repo, binary version, protocol scope, logging/secret policy를 정해야 한다.

## Claim Split

- source-backed: OpenAI의 App Server architecture framing, JSON-RPC/event/approval/reconnect 설명.
- Dex inference: Dex Company 장기 작업 자동화와 integration due-diligence에 적용하는 판단.
- not checked: 로컬 `codex app-server` 명령, schema generation, third-party client binding, Windows Desktop packaged runtime, 실제 event stream.

