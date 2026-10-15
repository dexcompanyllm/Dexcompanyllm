---
type: llm-wiki-source
status: captured
title: "OpenAI Codex 0.143.0 remote plugin and proxy audit signal"
sourceKind: github-release
source:
  - "https://github.com/openai/codex/releases/tag/rust-v0.143.0"
  - "https://github.com/openai/codex/releases"
  - "https://developers.openai.com/codex/changelog"
publisher: OpenAI GitHub
capturedAt: 2026-07-09T03:04:00+09:00
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
collectionPurpose: "Codex 0.143.0의 remote plugin, npm marketplace source, system proxy, remote-control pairing, MCP tool-search 기본값 변경이 Dex Company 설치/승인 감사 기준을 바꾸는지 확인한다."
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - openai
  - plugin-audit
  - security
---

# OpenAI Codex 0.143.0 remote plugin and proxy audit signal

## Source Snapshot

- Publisher: OpenAI GitHub
- Release: `0.143.0` / `rust-v0.143.0`
- Release time shown by GitHub page: 2026-07-08 01:31 UTC
- Primary source: https://github.com/openai/codex/releases/tag/rust-v0.143.0
- Cross-check source: https://github.com/openai/codex/releases
- Secondary official surface checked: https://developers.openai.com/codex/changelog

## Key Points

- Codex 0.143.0 reports remote plugins enabled by default, richer catalog rows, npm marketplace sources, and visible remote/local versions.
- The release reports system proxy routing for authentication and Responses API traffic on macOS and Windows, including PAC and WPAD configurations.
- The release adds a `codex remote-control pair` command for generating manual pairing codes from a running daemon.
- The release also reports MCP tool search as the default path and explicit session authentication support for ChatGPT-hosted MCP servers.

## Dex Company Use

This source is not approval to install or upgrade Codex. It changes the checklist for any Codex, plugin, MCP, or connector work:

- record whether remote plugins are enabled, disabled, or not checked;
- record plugin catalog source, npm marketplace source, publisher identity, and remote/local version separately;
- record whether system proxy, PAC, or WPAD may route auth/API traffic;
- record whether a remote-control daemon and manual pairing code are in use;
- record whether MCP tool search or session-auth behavior exposes additional tools or identity context.

## Evidence Quality

- source-backed: OpenAI's public GitHub release page lists the 0.143.0 changes.
- Dex inference: Dex Company should treat remote plugin defaults and system proxy routing as approval-gated operational fields.
- not checked: local Codex version, current Desktop app behavior, actual remote plugin catalog, proxy settings on Ethan's machine, pairing-code flow, and MCP session-auth behavior.

## Risk Notes

- Supply-chain: npm marketplace plugin sources need publisher identity, version pin, and provenance checks.
- Insecure plugin design: remote plugins and MCP tools may expand tool surface without a target-specific review.
- Sensitive information disclosure: system proxy and session authentication can affect auth and API traffic boundaries.
- Excessive agency: remote-control pairing and tool-search defaults should not be treated as enabled-safe without local inspection.

## Original Content

This note preserves only source metadata, short paraphrases, and Dex Company verification scope from the public OpenAI Codex GitHub release and official changelog surfaces. It does not copy the full release text and does not claim local runtime availability.
