# Codex Quiet-Window Watch — 2026-09-04

Quiet window reviewed: 2026-09-03 23:00–2026-09-04 05:59 Asia/Seoul.

## Confirmed

- OpenAI Codex PR #42619 adds GPT-6 Astra to Amazon Bedrock catalogs, including global and US cross-region variants. This is provider-catalog expansion, not a Dex-approved execution route.
  - https://github.com/openai/codex/pull/42619
- OpenAI Codex issue #42611 reports automatic compaction replaying an already-answered user message as a new turn even though no new user event exists after compaction. Captured reproduction: 0.152.1. Current-stable applicability and fix are Not Checked.
  - https://github.com/openai/codex/issues/42611
- OpenAI Codex issue #42612 reports a 0.153.0 custom-agent configuration applying model/reasoning while silently dropping `service_tier = "fast"` when spawned from a Standard parent. Maintainer-confirmed root cause/fix are Not Checked.
  - https://github.com/openai/codex/issues/42612
- OpenAI Codex PR #42605 explicitly prepares a 0.153.1 hotfix backport for the hidden GPT-6 Astra catalog, but the public release list still shows 0.153.0 as the latest non-prerelease release at this cutoff.
  - https://github.com/openai/codex/pull/42605
  - https://github.com/openai/codex/releases

## Inference

- #42611 is a direct long-running-task safety signal: model-visible history cannot be the authority for whether a historical user message is a new mutation intent. Dex Task/attempt/input-event identity must remain authoritative across compaction.
- #42612 is a multi-agent configuration-integrity signal: selected custom-agent configuration does not prove effective child settings. Runtime evidence must verify effective model, reasoning, tier, sandbox, capability inventory and Task/attempt binding.
- #42619 expands Astra provider coverage but does not justify Amazon Bedrock, API-key execution, paid API fallback or broader credentials in Dex.

## Proposal / Dex gates

### #28 long-running Task E2E

- No new canonical Dex input event after compaction => no second mutation, commit, publication, worker run or Result from an already handled historical message.
- Persist canonical input event identity and handled/consumed state outside model-visible history.
- Ambiguous post-compaction ownership => checkpoint/blocked, mutation 0, no duplicate writer/fork.

### #35 worker expansion

- Validate each child worker's effective model, reasoning effort, service tier, sandbox, capability inventory and Task/attempt binding from runtime evidence.
- Missing/dropped tier => `unknown`/Not Checked, not implicit authorization for Fast/Standard.
- Do not compensate with automatic Fast, paid execution, duplicate workers or provider switching.

### Astra/provider boundary

- Keep Astra tracked-rollout until public stable client + authenticated subscription model-list + bounded canary PASS.
- Amazon Bedrock Astra support remains non-approved; subscription-first remains canonical.

## Validation

- PASS: official upstream evidence for #42619/#42611/#42612/#42605 reviewed.
- PASS: current Dex AI Contract still requires One Task ID / One Active Writer / One Canonical Result / Zero User Re-entry and subscription-first execution.
- FAIL: none introduced by this watch.
- Not Checked: #42611 approved-host 0.153.0+ reproduction, #42612 approved-host child-tier behavior, public 0.153.1 release, actual account Astra availability, Bedrock route (intentionally disabled).

## Safety boundary

No prerelease/experimental capability, Amazon Bedrock/API-key route, paid API, automatic paid fallback, Fast tier, model auto-switch, broader permission, duplicate writer, destructive migration or external messaging is enabled by this evidence update.
