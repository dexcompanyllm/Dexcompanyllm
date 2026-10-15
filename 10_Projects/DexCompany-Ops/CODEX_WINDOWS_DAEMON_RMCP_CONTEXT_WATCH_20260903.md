# Codex Windows managed App Server, RMCP OAuth, and experimental context evidence — 2026-09-03

## Official sources

- https://github.com/openai/codex/pull/42381
- https://github.com/openai/codex/pull/42383
- https://github.com/openai/codex/pull/42384
- https://github.com/openai/codex/pull/42385
- https://github.com/openai/codex/releases/tag/rust-v0.152.1

## confirmed

### Windows managed App Server — PR #42381

PR #42381 is merged upstream. It adds Windows support for the PID-managed App Server lifecycle that previously supported Unix: detached daemon launch, explicit failure when the parent Job Object prevents safe detachment, Windows file locking, process creation-time checks against stale/reused PIDs, graceful shutdown followed by bounded termination of the verified process, private daemon-state preparation, and executable-path pinning across installer junction updates.

This is relevant to Dex Runtime #28 because approved Windows-host process identity, restart/reconnect, stale process records and duplicate execution are part of the Phase 3 E2E boundary.

### RMCP 3.2.0 — PR #42383

PR #42383 is merged upstream and upgrades `rmcp` and `rmcp-macros` from 3.1.3 to 3.2.0. The upstream PR itself does not claim a new stable user-facing MCP capability, so effective behavior changes remain a future-stable compatibility question rather than a canonical Dex capability.

### RMCP OAuth credential-store groundwork — PR #42384

PR #42384 is merged upstream and adds a **test-only** RMCP `CredentialStore` adapter over Codex's pinned OAuth credential backend. Mutating save/clear operations require an active refresh transaction guard; the selected backend remains pinned; the runtime credential snapshot updates only after persistence succeeds; scope and expiry metadata are preserved; and credentials whose client/issuer no longer match the connection are rejected.

This is security/reliability-positive evidence, not proof that a production RMCP OAuth refresh integration is enabled in current stable Codex.

### Experimental context management — PR #42385

PR #42385 is merged upstream and adds the under-development `features.context_management.experimental_mode`. When explicitly configured, eligible ChatGPT-authenticated Plus, Pro, and Pro Lite sessions using the Codex backend can activate token-budget context, history notes, and `new_context`. Upstream keeps the feature disabled for custom providers, provider credentials, non-Codex endpoints, and temporary structured threads.

This is a meaningful continuity/Zero User Re-entry signal but remains experimental and is therefore not authorized for automatic Dex activation.

### Stable / model / cost

Latest official non-prerelease Codex remains `0.152.1`. No new stable model promotion or general Codex pricing/usage-limit change was found in this cutoff. Subscription-first remains canonical; paid API and automatic paid fallback remain disabled.

## Dex comparison

### confirmed

- `dex-company-wiki` approved `main` remains canonical knowledge/policy/state authority.
- Before the current Runtime watch, approved Runtime `main` was PR #132 merge `a124e8ed2e78bd9124d5af49c43df879339723f6`.
- Runtime PR #133 is merged at `6838b2e7d59743f8593242952436d8e66aabad1f`.
- PR #133 is docs-only: one Markdown file, +131/-0, with no executable/configuration/model/permission/billing/Plugin/Skill/deployment behavior enabled.
- PR #133 branch Runtime validation `33696316240` PASS: install dependencies, static checks, unit tests, smoke test and production dependency audit all PASS.
- PR #133 branch Vercel PASS; merge-commit Vercel PASS.
- Runtime #28 remains Phase 3 implementation merged / approved Windows-host E2E Not Checked.
- Runtime #34 and #35 remain blocked behind #28.

### inference

PR #42381 can improve Windows worker portability and reduce stale-daemon/reused-PID failure modes, but safe value requires process lifecycle to remain subordinate to canonical Task/attempt identity and to avoid duplicate work after reconnect.

PR #42384 can reduce credential-refresh races and stale auth if the same pinned backend, transaction boundary, account/workspace/client/issuer binding and least-privilege scopes are preserved. OAuth state must remain authentication provenance, not Dex authorization.

PR #42385 could reduce context loss and repeated user input during long work, but provider-generated notes/context are a secondary continuity mechanism. GitHub Task/checkpoint/Result, explicit approval and mutation lock remain higher authority.

## proposal — tracked only

For a future non-prerelease stable containing #42381, Runtime #28 approved Windows-host E2E should verify safe detached launch, Job Object fail-closed behavior, exact executable/PID/creation-time provenance, stale/reused PID rejection, verified-only shutdown/termination, private daemon-state paths, same Task/attempt resume, and zero duplicate mutation/worker/Result after crash or reconnect.

For a future production MCP OAuth integration derived from #42384, Runtime #34 should verify pinned-store continuity, one guarded refresh transaction, persistence-before-runtime-snapshot, client/issuer binding, scope/expiry preservation, failure/concurrency/reconnect safety, absence of secret values in canonical evidence/logs, and no OAuth-driven expansion of Dex submit/control/GitHub/filesystem/merge/deploy/paid authority.

RMCP 3.2.0 remains a compatibility candidate only; Dex must validate the effective stable App Server/MCP contract rather than infer behavior from the dependency version.

For #42385, keep a future-stable experimental-context Gate in Runtime #35. Any future activation requires explicit approval after verifying default-off/explicit opt-in, eligible subscription/Codex-backend binding, no API/custom-provider paid fallback, account/workspace/thread/Task/attempt isolation, canonical checkpoint/approval preservation across compaction/new-context, no stale approval resurrection after rollback/fork/reconnect, retention/privacy/secret handling, and measurable reduction in re-entry/rework.

## unknown / Not Checked

- first non-prerelease stable containing PR #42381/#42383/#42384/#42385;
- production exposure of the test-only PR #42384 adapter;
- material RMCP 3.2.0 interoperability behavior in a stable Codex build;
- approved Windows-host managed App Server lifecycle E2E;
- Work/Desktop/mobile MCP OAuth refresh parity;
- stable support, retention/privacy contract and surface parity for experimental context management;
- Runtime PR #133 merge-SHA separate GitHub Actions — Not Checked because no separate run was emitted;
- Wiki automated CI — Not Checked unless a workflow is emitted for this evidence branch.

## Safety boundary

No prerelease/experimental capability, context-management mode, managed-daemon activation, new MCP/OAuth write path, credential migration, broader filesystem/network/OAuth permission, API-key route, paid API, automatic paid fallback, extra paid usage, Plugin/Skill mutation, destructive migration, multi-writer execution, external messaging, automatic deployment, or other high-risk side effect was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42381 merge/scope | PASS |
| OpenAI PR #42383 merge/scope | PASS |
| OpenAI PR #42384 merge/scope | PASS |
| OpenAI PR #42385 merge/scope | PASS — experimental, not enabled |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #133 scope | PASS — 1 docs file, +131/-0 |
| Runtime validation `33696316240` | PASS |
| Runtime static/unit/smoke/dependency audit | PASS |
| Runtime branch/merge Vercel | PASS |
| Runtime merge-SHA separate Actions | Not Checked |
| Approved Windows managed-daemon E2E | Not Checked |
| Production MCP OAuth refresh E2E | Not Checked |
| Experimental context stable/host/surface E2E | Not Checked |

## Documentation policy

This watch does not rewrite `CURRENT_STATE.md`, QA, handoff, sources and decisions aggregate files because the operational Gate is unchanged. Provider-watch head drift remains bounded and is reconciled through DexCompany-Ops Issue #55 until a functional Gate changes or a meaningful batch-sync boundary is reached.
