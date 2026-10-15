---
title: ChatGPT Library connectors: Box, Dropbox, SharePoint
slug: chatgpt-library-connectors-2026-09-22
claimType: CAPABILITY
knowledgeClass: source-backed
verificationStatus: confirmed
verifiedAt: 2026-09-22
verifiedBy: Jenny / ChatGPT product monitoring
explored: false
evidenceScope: ChatGPT Web and Work; rollout is plan-, workspace-, region-, and device-dependent
sourceUrls:
  - https://help.openai.com/en/articles/6825453-chatgpt-release-notes
supersedes: null
supersededBy: null
disputed: false
---

# ChatGPT Library connectors: Box, Dropbox, SharePoint

## Confirmed

OpenAI's September 10, 2026 release notes say Box, Dropbox, and SharePoint are joining Google Drive in ChatGPT Library. Users can browse and search available files and folders, add them to a conversation through Library or mentions, keep supported files open beside the conversation, and work across a selected folder. Existing source permissions and workspace controls remain in force. The rollout is described for Go, Plus, Pro, Business, Edu, Healthcare, and Enterprise on the web in Chat and Work; mobile support will follow.

## Dex interpretation

- These connectors are an input/retrieval surface, not a canonical source for Dex state.
- Connected-file content must remain `source-backed` or `not checked` until the exact file, permission scope, and provenance are recorded.
- Do not auto-connect accounts, expand permissions, or copy external files into GitHub without an explicit task and the existing approval/security gates.
- If used for planning or research, preserve the original connector URL or file identity in the task receipt and keep GitHub `main` as the canonical result store.

## User impact

For 에던's planning and research workflow, this can reduce repeated uploads and make source comparison easier. It does not prove that a connector is available in the user's account, workspace, or mobile app.

## Verification state

- Official release-note evidence: PASS
- Account/workspace availability: Not Checked
- Actual mobile availability: Not Checked
- Automatic connection or permission change: Not performed
- Runtime/provider routing change: None
