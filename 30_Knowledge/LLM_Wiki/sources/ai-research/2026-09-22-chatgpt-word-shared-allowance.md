---
type: llm-wiki-source
status: source-backed
explored: false
created: 2026-09-22
updated: 2026-09-22
claimType: empirical
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-09-22
verifiedBy: Dex
disputed: false
sourceVersion: 1
collectionPurpose: Track ChatGPT for Word availability and shared usage implications for Dex planning workflows.
tags:
  - chatgpt
  - codex
  - microsoft-word
  - usage-limits
  - cross-surface
---

# ChatGPT for Word and shared usage allowance

## Source-backed findings

- OpenAI's ChatGPT release notes dated **2026-09-17** state that ChatGPT is available inside Microsoft Word through a sidebar for drafting from notes, summarizing documents, revising selected text, and adjusting headings and formatting.
- The release notes state that the Word add-in is available on all ChatGPT plans, including Free.
- For plans that include Codex and other premium features, Word usage draws from the plan's shared usage allowance rather than being an isolated allowance.
- The Codex plan-help page states that, where shared allowances apply, **Codex, ChatGPT Work, ChatGPT for Excel, and Workspace Agents** use a shared allowance and credit pool. Usage varies by model, execution location, task complexity, context, reasoning, speed, and tools.
- The Codex plan-help page distinguishes regular ChatGPT Voice from Voice used inside Work or Codex on desktop: regular Chat Voice has separate limits, while Work/Codex desktop tasks use the shared agentic pool where applicable.

## Dex inference

- Microsoft Word can become a practical intake and review surface for planning documents, but it should not replace GitHub as Dex's canonical source.
- For 에던's workflow, document drafting or review in Word should be treated as a client surface. Final decisions, task state, and approved artifacts should still be returned to the GitHub canonical workflow.
- Because Word can consume the same shared allowance as Codex and other premium features, long document tasks should be scoped before execution and avoided during critical Codex runs when the shared pool is near its reset boundary.

## Safety and boundary

- Do not assume the Word add-in is enabled on 에던's account or Windows installation without a direct account/device check.
- Do not infer that Free, Plus, or Pro have identical Codex/Work allowance behavior from the Word announcement alone; use the account's displayed usage panel and the plan-specific help page.
- Do not purchase credits, use banked resets, change plans, or enable paid fallback as a response to shared-allowance pressure.
- The Word add-in is a supported client surface; it is not a Dex canonical source, runtime host, or authorization to change GitHub state.

## Verification status

- Official release note checked: PASS
- Official Codex plan-help checked: PASS
- Account-specific Word availability: Not Checked
- Account-specific shared allowance and remaining balance: Not Checked
- Windows installation and Microsoft 365 tenant policy: Not Checked

## Sources

1. OpenAI Help Center, ChatGPT Release Notes, **2026-09-17 — ChatGPT for Word**: https://help.openai.com/en/articles/6825453-chatgpt-plus
2. OpenAI Help Center, **Using Codex with your ChatGPT plan**: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
3. OpenAI Help Center, Enterprise/Edu release notes, **2026-09-10 — Data plugin and shared allowance context**: https://help.openai.com/en/articles/10128477-chatgpt-enterprise-edu-release-notes
