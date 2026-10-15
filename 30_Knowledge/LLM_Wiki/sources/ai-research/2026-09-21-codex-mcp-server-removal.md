---
type: llm-wiki-source
status: active
aliases:
  - Codex MCP server removal 2026-09-05
  - Codex App Server migration
created: 2026-09-21
updated: 2026-09-21
explored: false
claimType: policy
evidenceScope: official-documentation
verificationStatus: source-backed
verifiedAt: 2026-09-21
verifiedBy: Jenny/ChatGPT
verifiedTimeZone: Asia/Seoul
source:
  - https://developers.openai.com/docs/mcp-server
  - https://developers.openai.com/blog/openai-for-developers-2025
  - https://openai.com/index/unlocking-the-codex-harness/
disputed: false
tags:
  - llm-wiki/source
  - codex
  - app-server
  - mcp
  - migration
---

# Codex MCP server removal

## Confirmed

- OpenAI's Codex MCP server hosting path has been removed.
- The removed commands are `codex mcp-server` and the standalone `codex-mcp-server` binary.
- The migration target for integrations that need Codex authentication, conversation history, approvals, and event streaming is Codex App Server.
- App Server uses its own JSON-RPC protocol. It is not an MCP server and is not a drop-in replacement for an MCP client; integrations need an explicit adapter/migration.
- Codex still supports connecting to external MCP servers through `codex mcp`. The change removes hosting Codex as an MCP server, not external MCP client support.
- The official migration page states that App Server is experimental and not supported for production workloads at the time of the document update.

## Dex relevance

- `dex-company-runtime` must not assume that `codex mcp-server` or `codex-mcp-server` remains available.
- Existing external MCP connector support and the Dex MCP Gateway are separate concerns and should not be deleted or disabled based on this change alone.
- Any future Codex embedding should use a capability check and an explicit App Server adapter rather than a guessed MCP transport.
- No automatic runtime change is authorized by this note because App Server production support is explicitly marked experimental in the source documentation.

## Verification boundary

- Confirmed: official OpenAI documentation and official OpenAI engineering material.
- Not checked: whether the user's currently installed Codex version still exposes the removed commands locally.
- Not checked: whether any existing Dex worker or local script still invokes those commands.
- Not checked: App Server production readiness for Dex deployment.

## Sources

1. OpenAI Developer Docs — Codex MCP server removal and migration guidance: https://developers.openai.com/docs/mcp-server
2. OpenAI Developers — OpenAI for developers in 2025, updated 2026-09-05: https://developers.openai.com/blog/openai-for-developers-2025
3. OpenAI Engineering — App Server development and the shift away from Codex-as-MCP-server: https://openai.com/index/unlocking-the-codex-harness/
