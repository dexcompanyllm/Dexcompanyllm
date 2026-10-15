---
title: ChatGPT automatic reasoning change and Work Data agent
claimType: CAPABILITY
evidenceScope: provider-specific
verificationStatus: source-backed
verifiedAt: 2026-09-21
verifiedBy: ChatGPT automation run 11
explored: false
disputed: false
---

# ChatGPT automatic reasoning change and Work Data agent

## Confirmed

- OpenAI release notes dated 2026-09-14 state that automatic switching from Instant to Thinking is being retired globally for ChatGPT Plus and Pro users. Users can still select an available reasoning option in the model picker, and automatic switching may still occur for safety.
- The same release notes state that the Higher intelligence setting is being removed from ChatGPT on the web for Plus and Pro.
- OpenAI release notes dated 2026-09-10 state that the Data plugin is available in ChatGPT Work and Codex. It can analyze connected business data, investigate changes, and create interactive dashboards or reports. Connected sources and authorizations are required, and queries use the connected account's existing permissions.
- OpenAI's product documentation describes the Data agent as a governed Work capability with administrator-controlled data connections and existing table, row, and column restrictions.

## Dex interpretation

- `confirmed`: For personal Plus/Pro use, selecting the reasoning level before a demanding request is now operationally important; asking for deeper reasoning in the prompt is not a substitute for selecting the model-picker option.
- `confirmed`: Work Data is an optional provider capability, not a Dex canonical data source. Connected business data remains external input and must not replace GitHub canonical state.
- `proposal`: Record provider-specific reasoning controls and Data-agent availability as source-backed knowledge only. Do not hard-code plan-specific model IDs or assume account rollout.
- `proposal`: If Dex later integrates Work Data, require explicit source attribution, permission-scope checks, and a read-only evidence path before any canonical-state mutation.

## Not checked

- Actual availability for Ethan's personal Pro account, Work workspace, Codex account, Android/iOS, Windows, or macOS surfaces.
- Which reasoning levels are exposed in the user's current model picker.
- Any Runtime or workflow code change, plugin installation, data-source connection, or external side effect.

## Sources

- https://help.openai.com/en/articles/6825453-chatgpt-plus
- https://openai.com/index/put-data-to-work/
- https://help.openai.com/en/articles/20001516-managing-usage-with-gpt-6-astra-in-work-and-codex
