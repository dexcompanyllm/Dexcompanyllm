# ChatGPT custom GPT retirement and plugin migration watch

- claimType: POLICY
- evidenceScope: ChatGPT plans and ChatGPT Work/Codex workflow
- verificationStatus: source-backed
- verifiedAt: 2026-09-21 Asia/Seoul
- verifiedBy: ChatGPT·Codex 변화·Dex 최적화
- disputed: false
- lifecycle: planned / timing varies by plan and workspace

## Confirmed

OpenAI's ChatGPT release notes dated 2026-09-11 state that custom GPTs are planned for retirement across ChatGPT plans, with a migration path to plugins. Existing GPTs can continue to be used until the retirement date that applies to the user, and timing/availability may vary by plan and workspace.

Source: https://help.openai.com/en/articles/6825453-chatgpt-release-notes

## Dex operational rule

- Do not auto-migrate, auto-install, broaden permissions, or delete legacy custom GPT/plugin assets.
- Before any migration becomes available, inventory GPTs that are actually used by an active task and record owner, dependencies, connected apps, sharing scope, and replacement test criteria.
- Treat migrated plugins as a new capability requiring explicit review of permissions, sharing, and behavior before activation.
- Keep GitHub `main` as the canonical record; ChatGPT UI state and provider-side migration status are not canonical evidence.
- If a GPT is not used by an active task, track it as watch-only rather than initiating migration.

## Current status

- User account rollout: Not Checked
- Workspace-specific retirement date: Not disclosed in the official note
- Plugin directory availability for the user's account: Not Checked
- Automatic migration or deletion: Not approved and not executed
