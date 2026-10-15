---
title: "Codex MCP server removal and migration boundary"
claimType: CAPABILITY
evidenceScope: "Codex developer documentation"
verificationStatus: confirmed
verifiedAt: "2026-09-23T09:16:25+09:00"
verifiedBy: "Jenny automation run 11"
explored: false
disputed: false
sourceType: source-backed
---

# Codex MCP server removal and migration boundary

## Confirmed

OpenAI's developer documentation states that the Codex MCP server was removed on 2026-09-05 and directs users to the migration guidance for current integration options.

## Dex impact

- Treat the former Codex MCP-server execution path as **deprecated/removed**, not as a generally available capability.
- Do not infer that ChatGPT MCP, third-party MCP servers, Codex App Server, CLI, IDE integrations, or Dex Runtime are removed; those are separate surfaces and require separate verification.
- Existing Dex documents, skills, plugins, and runtime adapters that name a Codex MCP server must be reviewed before use. Do not delete or migrate them automatically.
- Preserve the current subscription-first and least-privilege policies. Do not switch to paid API orchestration or broaden permissions as a fallback.
- Record the exact provider, surface, version, account, and migration evidence before changing any active workflow.

## Device-independent boundary

- ChatGPT Web / Work, Codex App / CLI / IDE, Android / iOS, Windows, and macOS rollout or compatibility are **Not Checked** unless separately verified.
- A documentation change does not prove that any specific account, device, repository, or runtime path is currently installed or working.

## Minimum action for Dex workers

1. Search active Dex configurations and docs for explicit Codex MCP-server references.
2. Classify each reference as historical, documentation-only, or active runtime dependency.
3. For active dependencies, stop automatic execution and route to a migration review task; do not auto-rewrite or enable a replacement.
4. Preserve provenance and keep the task blocked/awaiting-approval when a new permission, host, or integration is required.

## Source

- OpenAI Developers: "OpenAI for developers in 2025" (updated 2026-09-05), stating that the Codex MCP server was removed and linking to migration guidance.
  https://developers.openai.com/blog/openai-for-developers-2025

## Status

- Product fact: confirmed
- Dex active dependency scan: not checked
- Migration completed: not checked
- Runtime or account changes: none
