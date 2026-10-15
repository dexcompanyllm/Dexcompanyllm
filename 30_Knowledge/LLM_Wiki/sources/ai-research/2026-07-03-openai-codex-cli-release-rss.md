---
type: llm-wiki-source
status: captured
title: "OpenAI Codex CLI repository and release feed"
sourceKind: github-repository-release-feed
sourceUrl: "https://github.com/openai/codex"
source:
  - "https://github.com/openai/codex"
  - "https://github.com/openai/codex/releases.atom"
  - "https://developers.openai.com/codex/changelog"
publisher: OpenAI GitHub
capturedAt: 2026-07-03T15:52:53+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "덱스 실행 환경의 기반 도구인 Codex CLI의 설치, 릴리스 흐름, 공식 문서 연결을 추적한다."
confidence: medium
claimType: descriptive
evidenceScope: github-readme-rss
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - openai
  - automation
---

# OpenAI Codex CLI repository and release feed

## Source Snapshot

- Repository: https://github.com/openai/codex
- Releases RSS: https://github.com/openai/codex/releases.atom
- Latest RSS item at capture: rust-v0.143.0-alpha.35, 2026-07-03T02:36:44Z
- Official changelog: https://developers.openai.com/codex/changelog

## Key Notes

GitHub README describes Codex CLI as a local coding agent and links to install paths, docs, desktop app, and cloud Codex Web. The release feed shows rapid alpha activity, so local version drift should be checked before assuming behavior.

## Why It Matters

덱스 컴퍼니 자동화는 Codex의 실제 로컬 기능과 버전 표면에 의존한다. 따라서 문서 기억만으로 판단하지 말고, 공식 changelog, GitHub release feed, 로컬 버전을 함께 확인해야 한다.

## Dex Company Use Example

- 자동화 실패가 생기면 먼저 로컬 `codex --version`, app version, release feed, changelog를 함께 확인한다.
- 새 기능이 보이면 바로 운영 규칙으로 흡수하지 말고 Windows 지원 여부와 로컬 앱 노출 여부를 검증한다.

## Verification

- source-backed: GitHub README, GitHub RSS, OpenAI Developers changelog
- not checked: 해당 alpha 바이너리 설치/실행

## Original Content

원문 전체를 복사하지 않고, GitHub README와 release RSS에서 확인한 메타데이터를 보존한다. Codex CLI는 로컬에서 실행되는 OpenAI coding agent이고, 2026-07-03 캡처 시점에 release feed에서 rust-v0.143.0-alpha.35가 최신 항목으로 확인됐다.
