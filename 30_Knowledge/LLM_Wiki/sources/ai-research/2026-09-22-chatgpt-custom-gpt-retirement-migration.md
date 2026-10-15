---
type: source-note
status: active
aliases:
  - ChatGPT custom GPT retirement
  - custom GPT to plugin migration
layer: sources
claimType: historical
evidenceScope: single-source
verificationStatus: verified
verifiedAt: 2026-09-22
verifiedBy: Dex
confidence: high
explored: false
source:
  sourceType: official-openai-release-notes
  sourceVersion: 2026-09-11
  capturedAt: 2026-09-22
  supersedes: null
  supersededBy: null
tags:
  - openai
  - chatgpt
  - plugins
  - migration
  - compatibility
---

# ChatGPT Custom GPT retirement and plugin migration

## Confirmed fact

OpenAI’s ChatGPT release notes dated **2026-09-11** say that custom GPTs are planned for retirement across ChatGPT plans, with a migration path to plugins. Existing GPTs can continue to be used until the retirement date that applies to the user or workspace. Timing and availability may vary by plan and workspace.

## Dex interpretation

- This is a **planned product change**, not a confirmed immediate shutdown for every account.
- Do not delete, rewrite, or bulk-migrate existing custom GPT instructions without an account- or workspace-specific retirement notice.
- When migration becomes available, validate the migrated plugin’s instructions, connected-app permissions, sharing scope, and behavior before treating it as equivalent.
- Keep GitHub `main` as the canonical copy of reusable instructions and decisions; ChatGPT GPT/plugin configuration is an external execution surface.
- Record account, workspace, notice date, migration availability, test result, and rollback path as separate evidence fields.

## Not checked

- Exact retirement date for Ethan’s account or any specific workspace
- Whether migration tooling is visible in Ethan’s ChatGPT Pro account
- Whether plugin availability or permissions differ by Android, iOS, Windows, macOS, or Web
- Whether a given custom GPT has an equivalent plugin implementation

## Minimum action

No immediate user action is required. Before a specific GPT is relied on for production work, export or preserve its instructions and identify its connected apps and sharing scope so migration can be tested without loss.

## Source

- https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- https://openai.com/products/release-notes/
