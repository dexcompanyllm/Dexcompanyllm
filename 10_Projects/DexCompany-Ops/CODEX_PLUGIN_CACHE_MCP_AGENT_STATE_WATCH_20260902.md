# Codex Plugin Cache / MCP Schema / Agent State Watch — 2026-09-02

- Classification: provider update evidence
- Runtime companion: `docs/CODEX_PLUGIN_CACHE_MCP_AGENT_STATE_WATCH_20260902.md`
- Runtime PR: #111
- Activation: watch-only

## Confirmed

1. OpenAI Codex PR #42284 was merged to upstream `main` on 2026-09-02 14:17:05 UTC with merge commit `50fffd5ed367aa99491d9ec58575626fce4e9dd4`.
   - Source: https://github.com/openai/codex/pull/42284
   - It invalidates cached plugin loads when recorded plugin roots no longer match the active installation, so Skills can refresh after another process sharing `CODEX_HOME` upgrades or rolls back a plugin.
   - Configuration-based Skill snapshots are bounded to the 32 most recently used entries while caller-held snapshots can outlive eviction.
   - Upstream tests cover external upgrade/rollback, warm-cache reads, eviction/reuse and held-snapshot lifetime.

2. Latest official non-prerelease Codex remains `0.152.1`; #42284 is therefore future-stable evidence, not an approved Dex host capability.
   - Source: https://github.com/openai/codex/releases/tag/rust-v0.152.1

3. OpenAI issue #42283 reports Codex CLI `0.152.1` with GPT-5.6 Sol and `tool_mode=code_mode_only` dropping sibling object properties when projecting an MCP schema with a root-level `oneOf`, causing server validation failure.
   - Source: https://github.com/openai/codex/issues/42283
   - This is an official issue signal, not a maintainer-confirmed root cause or fixed contract.

4. OpenAI issue #42282 reports a macOS Plus user's legacy Chronicle background capture/summarization consuming rate-limited quota without attributable entries in available Usage surfaces; the reporter says disabling the feature stopped the observed idle consumption.
   - Source: https://github.com/openai/codex/issues/42282
   - This is not evidence of a pricing or quota-policy change and is not evidence that Dex currently has the same behavior.

5. OpenAI issues #42286 and #42287 report Desktop/subagent local-state inconsistencies: newly spawned children can exist in App Server before renderer conversation state is hydrated, and archived Symphony-created agent threads can remain in a local thread catalogue as phantom chats.
   - Sources: https://github.com/openai/codex/issues/42286 and https://github.com/openai/codex/issues/42287
   - Both remain issue signals with maintainer-confirmed root cause/fixed stable unknown.

## Dex comparison

- `confirmed`: approved Wiki `main` remains the canonical knowledge/policy/state authority; provider thread, local catalogue, plugin cache and Skill snapshot state are not canonical.
- `confirmed`: Runtime currently packages `dex-company-core` as a Skills-only plugin and keeps hosted Task submit/control disabled under #34. The exact #42283 root-level `oneOf` shape is not an observed current Dex production failure.
- `confirmed`: Runtime #35 remains blocked behind #28 approved Windows-host E2E, so native provider multi-agent UI state is not a production dependency.
- `confirmed`: plugin/Skill automatic install/update/delete, remote marketplace mutation, paid API/automatic paid fallback, background capture and broader permissions remain disabled.

## Inference

- #42284 can improve portability and reduce stale Skill generations once it is present in a stable build and passes approved-host validation, especially when multiple supported processes share `CODEX_HOME`.
- #42283 shows that validating the original MCP JSON Schema alone is insufficient; Dex must validate the actual model/tool-mode projection before promoting a remote MCP/plugin surface.
- #42286/#42287 reinforce the existing Dex rule that provider UI/thread state is presentation/provenance only. Missing UI hydration or stale local catalogue rows must not create duplicate Tasks/workers or supersede a newer GitHub Result.
- #42282 is a negative cost-control signal for future background research/history features: subscription consumption should be attributable before Dex enables such a capability.

## Proposal / tracked gates

Runtime #34 tracking should require:

- first stable containing #42284;
- external plugin A→B and B→A replacement with shared `CODEX_HOME`, proving subsequent `skills/list` uses the active root only;
- Git-backed Dex Skill/Plugin state remains canonical and provider roots/snapshots remain provenance;
- a harmless read-only MCP canary with sibling `properties` plus root-level `oneOf`, verified in the intended model/tool-mode path;
- fail-closed Not Checked/blocked behavior if schema projection loses fields, without automatic model/permission/paid-path changes.

Runtime #35 tracking should require:

- child events arriving before UI hydration do not create duplicate Tasks, attempts or side effects;
- resume/hydration keeps the same Task/attempt/result provenance and cannot reuse stale approval;
- archived child/provider threads reconcile out of visible local state within a bounded lifecycle without deleting Dex canonical evidence;
- account/workspace switches do not treat stale local thread rows as authoritative Dex work.

Runtime #37 tracking should require:

- future background research/history/capture features that consume shared allowance remain disabled until separately approved and usage-attribution evidence passes;
- unexplained idle consumption is treated as unknown/blocked-quota, never as a reason to buy credits, redeem resets, upgrade plans, use paid API fallback or duplicate execution.

## PASS / FAIL / Not Checked

| Check | Result |
|---|---|
| PR #42284 merge and implementation scope verified | PASS |
| #42282/#42283/#42286/#42287 official issue scope verified | PASS |
| Latest official non-prerelease release checked | PASS — `0.152.1` |
| Current Dex plugin/#34/#35/#37 boundaries compared against approved mains | PASS |
| Operational capability, permission, billing or plugin mutation enabled | PASS — none |
| First stable containing #42284 | Not Checked |
| Approved-host plugin upgrade/rollback refresh E2E | Not Checked |
| #42283 maintainer-confirmed root cause/fix and Dex MCP canary | Not Checked |
| #42282 attribution fix / Dex idle-drain reproduction | Not Checked |
| #42286/#42287 fixed stable and Desktop multi-agent E2E | Not Checked |
| FAIL | none |

## Safety boundary

No prerelease/experimental enablement, plugin auto-mutation, hosted MCP write, broader OAuth/filesystem/network scope, automatic model fallback, Chronicle/Computer History activation, paid API/fallback/extra usage/reset redemption, multi-writer, automatic deploy/merge, destructive migration or external messaging is authorized by this evidence.