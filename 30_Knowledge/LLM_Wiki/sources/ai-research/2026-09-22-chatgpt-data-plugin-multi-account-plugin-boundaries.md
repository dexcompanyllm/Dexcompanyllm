---
title: ChatGPT Data plugin and multi-account plugin connections
date: 2026-09-22
source: https://help.openai.com/en/articles/6825453-chatgpt-plus
claimType: FACT
verificationStatus: source-backed
evidenceScope: OpenAI ChatGPT Release Notes, September 10 and September 17, 2026
verifiedAt: 2026-09-22T17:35:00+09:00
verifiedBy: Jenny/ChatGPT
explored: false
disputed: false
---

## Confirmed

- ChatGPT Work and Codex have a Data plugin for analyzing connected business data, answering business questions, investigating changes, and creating interactive dashboards or reports.
- Queries use the connected account's existing permissions; setup or authorization may be required.
- ChatGPT supports connecting multiple accounts to plugins, including personal and work accounts in the same conversation, across web, mobile, and desktop, with availability varying by plan and rollout.

## Dex boundaries

- These features are input/analysis surfaces, not Dex canonical state or execution authority.
- Connected-account permissions remain the source-system boundary. Do not infer broader access from the ChatGPT conversation surface.
- Do not automatically connect accounts, authorize new data sources, send external actions, or copy connected data into Dex without explicit task scope, provenance, and permission checks.
- Treat account identity, source system, permission scope, workspace/region availability, and retrieval time as required provenance fields.
- If a connected-data result conflicts with GitHub canonical state, preserve both as separate evidence and require explicit reconciliation; do not overwrite canonical Dex files automatically.

## Status

- Official product availability: confirmed.
- Ethan account, workspace, plan, region, and device-level rollout: not checked.
- Runtime/provider routing or permissions: unchanged.
