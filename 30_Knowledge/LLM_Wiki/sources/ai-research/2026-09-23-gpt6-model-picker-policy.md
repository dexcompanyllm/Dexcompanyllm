---
title: GPT-6 family expansion and ChatGPT model-picker behavior
slug: 2026-09-23-gpt6-model-picker-policy
claimType: FACT
evidenceScope: provider-product
verificationStatus: source-backed
verifiedAt: 2026-09-23T06:41:08+09:00
verifiedBy: Jenny/ChatGPT
explored: false
disputed: false
supersedes: null
supersededBy: null
sources:
  - https://openai.com/index/gpt-6-astra/
  - https://help.openai.com/en/articles/6825453-chatgpt-release-notes
---

# GPT-6 family expansion and ChatGPT model-picker behavior

## Confirmed

- OpenAI's GPT-6 Astra announcement was updated on 2026-09-22 to state that the GPT-6 family is expanding with GPT-6 Sol and GPT-6 Luna.
- ChatGPT Plus and Pro are moving away from automatic switching from Instant to Thinking globally, and the Higher intelligence setting is being removed on the web. Users should choose an available model/effort option from the model picker when deeper reasoning is needed.
- The cited ChatGPT release notes describe this as a product-level behavior change; actual account rollout and exact model availability remain account-, plan-, region-, and surface-dependent unless separately verified.

## Dex boundary

- Treat model IDs, picker labels, and effort controls as provider capability metadata, not Dex canonical workflow rules.
- Do not silently rewrite task policy, provider routing, or runtime defaults from this notice alone.
- For Dex usage guidance, preserve the user-facing rule: select a deeper reasoning option explicitly for planning, research, coding, or decisions that need more thought; use faster/default options for routine work when appropriate.
- Do not enable experimental context features, paid API fallback, credit purchases, banked reset usage, or permission changes from this notice.

## Device and surface scope

- ChatGPT Web: model-picker and Higher intelligence setting change is explicitly documented for Plus/Pro web.
- ChatGPT mobile and desktop: exact picker labels and rollout are not separately verified here.
- Work and Codex: do not assume the ChatGPT Chat model behavior change applies; the GPT-6 Astra product page and prior release notes distinguish Chat from Work/Codex surfaces.
- Actual Ethan account, plan, region, device, workspace, and runtime configuration: not checked.

## Verification notes

- `confirmed`: source text and publication/update dates were checked in official OpenAI sources.
- `unknown`: individual-account exposure, rollout completion, exact GPT-6 Sol/Luna availability, and any Codex-specific defaults.
