# Codex User approval + Windows surface watch — 2026-09-02

## Official source-backed evidence

- OpenAI Codex PR #42256: https://github.com/openai/codex/pull/42256
- OpenAI Codex issue #42259: https://github.com/openai/codex/issues/42259
- OpenAI Codex issue #42262: https://github.com/openai/codex/issues/42262
- OpenAI Codex issue #42264: https://github.com/openai/codex/issues/42264
- Latest non-prerelease Codex release checked: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Dex Runtime evidence: PR #108 and Runtime Issues #25, #28, #34 comments added on 2026-09-02.

## Classification

### confirmed

1. OpenAI merged Codex PR #42256 on 2026-09-02T10:34:43Z at commit `a0dcfe2ada3f5bbd5059a34c0fc6fac244741a67`.
2. In `approvalsReviewer = "user"` mode, Codex skips Guardian prewarming and asynchronous Guardian scoring and automatically accepts ordinary `node_repl.js` execution confirmations. Separate sensitive-action checks and requests for user input retain their existing behavior. Upstream tests cover live reviewer-mode transitions.
3. OpenAI's public `openai/codex` repository contains Windows issue #42259, created after the prior Dex provider-watch cutoff and labeled `bug`, `windows-os`, `app`, `skills`. The reporter describes a Plugins selector that remains loading although internal plugin list/installed calls reportedly succeed.
4. The same repository contains Windows issue #42262, labeled `bug`, `windows-os`, `app`. The reporter describes Medium/High/Extra High reasoning selections snapping back to Instant in desktop while the same account works on web/mobile, and explicitly does not know whether the backend effective reasoning is also changed.
5. The same repository contains issue #42264, labeled `bug`, `windows-os`, `sandbox`, `app`. The reporter describes a Windows sandbox setup/UAC loop and setup helper exiting before expected sandbox state appears.
6. The latest official non-prerelease Codex GitHub release checked remains `0.152.1`; #42256 is therefore upstream-main evidence rather than a promoted Dex stable capability.
7. Dex Runtime PR #108 records the #42256 behavior as docs-only future-stable/approved-host gates. No Runtime capability, permission, reviewer, Node REPL, plugin, reasoning, or sandbox setting is changed.

### inference

- #42256 can reduce latency and redundant Guardian work for interactive user-controlled sessions, but `User approval` must not be interpreted by Dex as proof that every ordinary Node REPL execution received a visible user confirmation.
- #42259 suggests a possible Windows desktop state/reconciliation mismatch between plugin backend readiness and visible UI readiness. Dex should validate actual callable capability rather than infer it from either UI or backend inventory alone.
- #42262 suggests desktop UI state may diverge from requested/effective reasoning policy. Dex should compare active App Server/thread metadata with its provider policy instead of treating the slider position as canonical.
- #42264 reinforces fail-closed Windows sandbox readiness checks, but its reported desktop build is older than current 26.831.* reports, so it does not establish a current-version regression.

### proposal

- Keep Dex broker-owned approval and exact Task ID + `attemptId` + mutation-scope binding independent of provider Guardian/reviewer behavior.
- Treat reviewer mode, plugin UI state, model/reasoning UI state, and provider thread metadata as provenance/capability evidence only, never canonical Task or authorization authority.
- Require approved-host negative-path tests for ordinary Node REPL auto-accept, missing/stale sensitivity metadata, live reviewer transitions, plugin UI/backend divergence, model/reasoning UI/effective-metadata divergence, and incomplete Windows sandbox setup.
- Use PWA/GitHub Task Bus fallback when a supported desktop surface is unavailable; do not auto-repair plugin state or relax sandbox/permission policy.

### unknown

- The first stable Codex release containing #42256.
- OpenAI maintainer-confirmed root cause/fix and affected-build scope for #42259, #42262, and #42264.
- Whether #42262 is UI-only or changes the effective reasoning request.
- Whether the #42264 setup failure affects current 26.831.* Windows desktop builds or the approved Dex worker host.
- Final App/CLI/IDE/App Server/Work/mobile parity for #42256 reviewer semantics.

## Dex impact and retained boundaries

The canonical operational sequence remains unchanged:

1. Runtime #28 Phase 3 implementation is merged.
2. Approved Windows-host #28 E2E remains **Not Checked**.
3. Runtime #34 Work/mobile/plugin integration and #35 capability-routed worker expansion remain blocked until #28 PASS.

Retained safety/cost boundaries:

- GitHub approved `main` remains canonical authority.
- one active writer per mutation scope;
- explicit broker-owned mutation approval;
- deterministic Watchdog + detached verifier for persistent changes;
- `danger-full-access`, automatic approval, unattended destructive operation, hosted MCP writes, and multi-writer remain disabled;
- plugin/Skill auto install/update/reconcile/delete remains disabled;
- sandbox fallback to broader/elevated permissions remains disabled;
- paid API, automatic paid fallback, and extra paid usage remain disabled.

## Runtime gates added/strengthened

### Runtime Issue #25 — Guardian/upstream stable watch

- reviewer mode is provenance only;
- ordinary Node REPL auto-accept must not authorize Dex mutation;
- sensitivity metadata ambiguity fails closed;
- user-input responses remain separate from mutation approval;
- live reviewer transitions cannot widen/reuse approval scope.

### Runtime Issue #28 — approved Windows-host E2E

- #42256 reviewer transitions and ordinary Node REPL auto-accept require independent Dex approval/lock evidence;
- sandbox setup/readiness uncertainty or repeated setup/UAC/helper failure is FAIL;
- no automatic switch to limited/elevated/full access as remediation.

### Runtime Issue #34 — Work/desktop/mobile parity

- plugin UI/backend/callable-tool state must agree before availability is declared;
- stuck/unavailable plugin UI uses bounded PWA/GitHub fallback instead of plugin mutation/reconciliation;
- requested provider model/reasoning policy is compared against active App Server/thread metadata rather than desktop UI alone;
- UI/effective-setting mismatch is explicit FAIL/blocked/fallback, not silent quality downgrade.

## Validation state

- OpenAI PR #42256 merge and scope: **PASS**
- Upstream PR #42256 unresolved review-thread check: **PASS — none found**
- Official latest non-prerelease release check: **PASS — 0.152.1**
- Runtime PR #108 docs/security scope: **PASS — one new Markdown file only**
- Runtime PR #108 validation: **PASS — Runtime validation run 33626192551**
- Runtime PR #108 merge: **PASS**
- #42259/#42262/#42264 existence/labels/report scope: **PASS**
- #42259/#42262/#42264 maintainer-confirmed root cause/fix: **Not Checked**
- #42256 future stable inclusion: **Not Checked**
- approved Windows-host E2E for these paths: **Not Checked**
- Work/web/desktop/mobile parity: **Not Checked**

No Runtime capability was activated by this provider watch.
