# Codex quiet-window MCP/worktree/Windows watch — 2026-09-06

## Scope

- Check window: developments after the prior permitted run, including the 2026-09-05 23:00–2026-09-06 05:59 Asia/Seoul quiet window and the first post-window changes available by 06:45 KST.
- Evidence classes: official OpenAI product/help pages, official `openai/codex` repository commits, and official `openai/codex` issue reports.
- This is watch/acceptance evidence only. It does not enable prerelease features, paid API use, extra paid usage, banked resets, broader permissions, Browser/Computer Use, managed worktrees, Voice, or experimental Guardian settings.

## Confirmed official product state

- General ChatGPT product release notes still have GPT-6 Astra as the latest major model/product announcement dated 2026-09-03. Astra rollout remains gradual; no newer general ChatGPT Web, Windows, macOS, Android, iOS, Work, pricing, plan, usage-limit, or reset-policy release was found in this window.
- Latest non-prerelease Codex release remains `0.153.4` (`rust-v0.153.4`). Dex must not move to an alpha/prerelease build only to consume the upstream-main changes below.
- Banked reset/credit/plan decisions remain owner-controlled under `AI_CONTRACT.md`; no provider signal in this watch authorizes automatic paid fallback or reset redemption.

Official references:
- https://openai.com/products/release-notes/
- https://help.openai.com/en/articles/6825453-chatgpt-release-notes
- https://github.com/openai/codex/releases/tag/rust-v0.153.4

## Confirmed upstream-main changes during the quiet window

These commits are merged to official `openai/codex` `main`; they are not evidence that the behavior is present in the current stable release.

1. MCP/App tool refresh durability — `32351a7b1ae3d6106fb2b7adccfbd6051e375ce6` / #43031
   - Keeps refreshed MCP tool catalogs with the client that owns them.
   - Rejects stale prepared calls and preserves existing binding snapshots while active calls finish.
   - https://github.com/openai/codex/commit/32351a7b1ae3d6106fb2b7adccfbd6051e375ce6

2. Live thread tool refresh — `2cfee7de25d98b20c55ced2ed82736d4c452f8a0` / #43039
   - `app/installed` with `threadId` and forced refresh updates the live thread tool set for later turns.
   - A failed refresh preserves the last working tool set.
   - https://github.com/openai/codex/commit/2cfee7de25d98b20c55ced2ed82736d4c452f8a0

3. Agent overview startup — `89208f09f819c0ff00c2608a33422a5f6b885c76` / #43043
   - Seeds the agents overview from the state database without triggering a startup filesystem scan for unindexed rollouts.
   - https://github.com/openai/codex/commit/89208f09f819c0ff00c2608a33422a5f6b885c76

4. Managed worktrees for interactive sessions/forks — `3525845978210579572bd8ec4fe8c8296445fb8f` / #43069
   - Adds interactive `--worktree` and fork worktree support behind the `worktrees` feature, local sessions only.
   - Resolves destination configuration/trust before the first turn and binds checkout ownership before execution.
   - This remains feature-gated and must not be auto-enabled by Dex.
   - https://github.com/openai/codex/commit/3525845978210579572bd8ec4fe8c8296445fb8f

5. Apps popup recovery — `51c97f3a67621aab788fb83d6ef90cf795f12177` / #43074
   - Replaces an indefinite loading state after `/apps` failure with a bounded error and Retry action; raw request errors are not shown.
   - https://github.com/openai/codex/commit/51c97f3a67621aab788fb83d6ef90cf795f12177

6. Voice runtime/SDK groundwork — #43079, #43083, #43090, #43097, #43099, #43100
   - Adds opt-in local audio-device handling, managed Opus build dependencies, processed microphone RTP sending, a helper-backed WebRTC session API, receipt-verified SDK export, and bounded incoming Opus RTP handling.
   - These are upstream-main implementation steps, not a stable Voice activation signal for Dex.

## Confirmed first post-window upstream changes

- #43102 / `47ca4619be10c20c1cec6ee9944738c5b961fa1d`: voice SDK/native runtimes now require GIO across Linux/macOS/Windows packaging and reject packages missing the required library.
  - https://github.com/openai/codex/commit/47ca4619be10c20c1cec6ee9944738c5b961fa1d
- #43104 / `e4ce83419b416f6e8c1cec77f1f6eeef0f304313`: Guardian thread-context configuration moves from `features.guardian_thread_context` to `features.guardianv2.thread_context`, defaulting to false and remaining independent of Guardian V2 enablement.
  - https://github.com/openai/codex/commit/e4ce83419b416f6e8c1cec77f1f6eeef0f304313
- Dex response: do not enable Guardian V2/thread-context or Voice based on upstream-main alone; future stable configuration migration must be tested before any provider configuration change.

## Reporter signals that matter to Dex

The following are confirmed issue reports in the official tracker, not maintainer-confirmed root causes or fixes.

### Windows / Pro / Work / Plugins

- #43088: a Windows ChatGPT Pro report says a Project-only-memory project had no supported route that both preserved the project boundary and used an already authorized custom plugin/MCP connector across Chat, Work Cloud, or Work Local.
  - https://github.com/openai/codex/issues/43088
  - Dex implication: never work around a Project-only boundary by silently exporting context to standalone Work or another surface. Use canonical GitHub Task state/PWA when the supported surface capability is unavailable.

- #43084: Windows bundled `hatch-pet` skill replacement reportedly deleted the working copy before a protected MSIX-source copy failed.
  - https://github.com/openai/codex/issues/43084
  - Dex implication: Skill/Plugin replacement must use stage -> verify -> atomic promote/replace; replacement failure must retain the last known-good version.

- #43073 and #43056: Windows reports show curated/bundled plugin discovery or Chrome native-host reconciliation can claim installed state while a manifest/schema/native-host path is unusable.
  - https://github.com/openai/codex/issues/43073
  - https://github.com/openai/codex/issues/43056
  - Dex implication: Installed/curated status is not readiness. Require authenticated/read-only canary or capability-specific postcondition before routing a real Task.

- #43082: Windows updater reportedly invokes legacy `powershell.exe` rather than preferring `pwsh`, which can break an update on some systems.
  - https://github.com/openai/codex/issues/43082
  - Dex implication: do not auto-repair by changing system PowerShell policy or reinstalling. Keep the approved stable version until an explicit update gate passes.

- #43048: Windows folder-picker path conversion to WSL reportedly breaks project creation in a hybrid Windows/WSL setup.
  - https://github.com/openai/codex/issues/43048
  - Dex implication: keep Windows/WSL host and repository realpath identity checks before mutation; do not treat environment switching as a cosmetic setting.

### Astra long-running work / model discovery / cost containment

- #43062: Windows Pro + GPT-6 Astra Ultra report of automatic compaction hanging for more than 20 minutes and immediately re-entering compaction after manual stop.
  - https://github.com/openai/codex/issues/43062
  - Dex implication: preserve the durable checkpoint before compaction/recovery, bound retries, and never duplicate the writer/mutation attempt merely because the provider UI is stuck.

- #43052: a stale `model_catalog_json` override can reportedly hide newly launched official models even when the account/runtime can use them.
  - https://github.com/openai/codex/issues/43052
  - Dex implication: before concluding that a model is unavailable, check authenticated `model/list` and whether a custom catalog override is active; remembered model names remain noncanonical.

- #43045: a Windows Plus user with purchased Codex credits reports purchased-credit depletion during a GPT-6 Astra WebSocket reconnect loop until HTTPS fallback.
  - https://github.com/openai/codex/issues/43045
  - Status: reporter signal only; billing semantics/root cause are unknown.
  - Dex implication: preserve subscription-first policy, never buy/redeem extra usage automatically, and treat repeated transport retry with no observable progress as a bounded failure condition rather than authorization to spend more.

- #43041: Windows Pro report of a precautionary Astra safety pause after a workflow changed from read-only discussion to explicit implementation authorization.
  - https://github.com/openai/codex/issues/43041
  - Dex implication: keep authorization chronology in the canonical Task/approval receipt and revalidate action-time scope; do not weaken provider safety checks or auto-continue a safety pause.

### Android

- #43066 requests restoration of an Android home-screen `New Remote chat` widget shortcut.
  - https://github.com/openai/codex/issues/43066
  - Status: proposal/feature request only; it is not a released Android capability and must not be treated as available.

## Dex acceptance gates from this watch

These are future-stable acceptance conditions, not capability activation:

1. MCP/app refresh
   - Refresh must be scoped to the correct live thread/client.
   - Tool revisions must not leak across unrelated clients/servers.
   - Failed refresh must leave the last known-good catalog callable.
   - Prepared stale calls must be rejected before execution.

2. Skill/Plugin replacement
   - Stage new bytes outside the active version.
   - Verify manifest/schema/files/hash/readiness before promotion.
   - Atomically promote or swap only after verification.
   - On failure, retain/restore the prior known-good version without deleting legacy Dex Skills/Plugins.

3. Worktree/host identity
   - Experimental managed worktrees remain disabled until a stable release and approved #28 host E2E pass.
   - Before first mutation and after resume/fork/environment switch, verify effective cwd + repository top-level + canonical realpath binding.

4. Long-running recovery
   - Provider UI stall, compaction loop, or reconnect is not a reason to replay a completed or mutation-bearing attempt.
   - Preserve canonical checkpoint/result first; bound reconnect/compaction recovery; fail closed when progress cannot be proved.

5. Project-only context
   - Do not cross a project-only memory boundary to obtain plugin/Work capability.
   - If the supported surface cannot preserve both context boundary and connector capability, mark capability unavailable and use canonical GitHub Task Bus/PWA without re-entering private project content.

6. Cost control
   - Paid API, automatic paid fallback, extra paid usage, banked reset, credit purchase, and plan changes remain disabled without Ethan's explicit action-time decision.
   - Transport retry/readiness failures do not authorize additional spending.

7. Voice/Guardian upstream work
   - Treat as watch-only until included in a non-prerelease stable and bounded platform/security regression tests pass.
   - Do not auto-migrate Guardian configuration or enable Voice/Guardian experimental flags.

## Canonical reconciliation

- Wiki `main` at this check: `d7fdf9feb2bc5f59cf9c6605a3a6aca4631d0d15` (PR #165).
- Runtime `main` at this check: `c3e6acf76722feebca0bf9c5efe30b09e552c1a1` (PR #185).
- No Wiki or Runtime `main` commit occurred during the 2026-09-05 23:00–2026-09-06 05:59 KST quiet window.
- Runtime post-merge validation `33853299911` attempt 2 is currently FAIL: dependency install PASS; static/unit/smoke PASS; Production dependency audit FAIL.
- Therefore no Runtime executable/config change is promoted by this watch. Any Runtime change remains blocked from merge until its complete branch/security validation passes.
- Existing Wiki status documents that still point at Runtime PR #95 / validation `33570148285 PASS` are stale and require a bounded documentation synchronization to PR #185 / validation `33853299911 FAIL`; this watch does not overwrite those multi-file status documents or claim they are synchronized.

## Result

- Official-source scan: PASS
- Quiet-window coverage: PASS
- Canonical head reconciliation: PASS
- Runtime current validation: FAIL (Production dependency audit)
- Upstream-main features activated in Dex: 0
- Pricing/plan/reset/credit changes: 0
- Broader permission changes: 0
- Experimental/prerelease activation: 0
- Windows/Android user-host reproduction: Not Checked
- Maintainer-confirmed root causes/fixed stable for the reporter issues above: Unknown / Not Checked
