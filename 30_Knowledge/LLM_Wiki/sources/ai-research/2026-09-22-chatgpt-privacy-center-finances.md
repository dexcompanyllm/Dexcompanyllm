---
title: "ChatGPT Privacy Center and Finances rollout"
claimType: CAPABILITY
evidenceScope: "OpenAI official release notes"
verificationStatus: source-backed
verifiedAt: "2026-09-22T13:55:40+09:00"
verifiedBy: "Jenny/ChatGPT"
explored: false
disputed: false
---

# ChatGPT Privacy Center and Finances rollout

## Confirmed

- OpenAI release notes dated **2026-09-21** state that **Privacy Center** is rolling out to signed-in Free, Go, Plus, and Pro users. It centralizes links and explanations for chat privacy, memory, personalization, data use, connected apps, and account security.
- The same release notes state that **credit-score tracking in Finances** is rolling out to Plus and Pro users in the **United States** on web, iOS, and Android. The Experian connection is separate from bank-account connections through Plaid, and the feature is not evidence of availability in Korea or on Ethan's account.

## Dex boundary

- Privacy Center is a **settings and policy discovery surface**, not a replacement for Dex canonical policy. Dex continues to treat GitHub `main` as the source of truth.
- Connected financial or credit data must remain `external input` with provenance and account/region scope. Do not copy it into Dex FACT or canonical project state without an explicit, source-backed task.
- Do not connect Health, Finances, Experian, Plaid, or other sensitive providers automatically. No permission expansion, paid usage, or account action is implied by this note.

## Not checked

- Ethan's actual ChatGPT account, Korean rollout, device-level visibility, and whether any Finances or Privacy Center control is available in his workspace.

## Sources

- https://openai.com/products/release-notes/
- https://help.openai.com/en/articles/6825453-chatgpt-release-notes
