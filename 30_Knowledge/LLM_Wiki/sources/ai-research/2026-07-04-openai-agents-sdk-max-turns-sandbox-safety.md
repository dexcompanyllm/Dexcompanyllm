---
type: llm-wiki-source
status: active
title: "OpenAI Agents SDK max_turns and Sandbox Safety"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: source-backed
evidenceScope: official-doc-and-github-release
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-release-note
source:
  - "https://openai.github.io/openai-agents-python/release/"
  - "https://github.com/openai/openai-agents-python/releases"
collectionPurpose: "agent 실행 루프 제한과 sandbox archive 안전장치를 덱스 컴퍼니 설치/실행 후보 감사 기준에 반영하기 위한 자료"
tags:
  - llm-wiki/source
  - openai
  - agents-sdk
  - security
---

# OpenAI Agents SDK max_turns and Sandbox Safety

## Original Content

- Source title: Release process/changelog - OpenAI Agents SDK; GitHub releases for openai-agents-python
- URLs: https://openai.github.io/openai-agents-python/release/ and https://github.com/openai/openai-agents-python/releases
- Publisher: OpenAI / GitHub repository
- Collected at: 2026-07-04 KST
- Preserved excerpt: "`Runner.run`, `Runner.run_sync`, and `Runner.run_streamed` now accept `max_turns=None`"
- Confirmation scope: Checked official release notes and GitHub release text for `max_turns=None`, default turn limit preservation, and sandbox archive symlink rejection behavior.

## Easy Summary

Agents SDK는 실행 turn limit을 명시적으로 해제할 수 있게 되었고, sandbox hydration 쪽에는 archive symlink 안전장치가 강화되었다. 덱스 컴퍼니에서는 agent 실행 후보를 볼 때 "끝없이 돌 수 있는 설정인지"와 "압축 파일/작업공간 경계가 안전한지"를 같이 봐야 한다.

## Dex Company Use

- agent/SDK/runtime 후보에는 `turn_limit`, `loop_stop_condition`, `max_turns_override`, `sandbox.archive_policy`, `workspace.escape_check`를 기록한다.
- `max_turns=None` 같은 무제한 설정은 자동화 기본값으로 쓰지 않는다.
- 설치 후보가 tar/zip/project import를 다루면 symlink escape, absolute path, overwrite behavior를 OWASP LLM supply-chain 관점에서 확인한다.

## Evidence Quality

- High: OpenAI Agents SDK 공식 문서와 GitHub release가 같은 변경을 가리킨다.
- Cross-check: 기존 MCP Apps install audit, OpenAI Codex App Server harness note, OWASP LLM Top 10 source note와 연결된다.
- Not checked: package install, local SDK version, release tag signature, 실제 sandbox exploit 재현은 하지 않았다.

## Risk / Security

- Supply chain: package/runtime 설치 후보는 여전히 별도 승인 필요.
- Excessive agency: 무제한 turn 설정은 비용/시간/외부 side effect 위험을 키울 수 있다.
- Insecure output handling: archive hydration은 workspace escape와 overwrite 위험을 점검해야 한다.

## Source Classification

- source-backed: max_turns option, default turn limit preservation, sandbox symlink rejection.
- Dex inference: 덱스 컴퍼니 agent runtime 감사 필드.
- not checked: live SDK install state, actual local runner behavior, package integrity.
