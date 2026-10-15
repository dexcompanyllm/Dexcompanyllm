# Codex plugin reconciliation, ChatGPT turn-cost telemetry, extension permissions, and nested tracing watch — 2026-09-01

## Canonical status

- Classification: provider watch / source-backed evidence
- Runtime implementation: documentation/tracking only
- Runtime merge: `5ca5be35a2a6f3720302572a4f5ea59feb085d0e` (PR #56)
- Stable target: Codex CLI `0.151.0`
- Production capability activation: none

## Confirmed

### OpenAI PR #41944 — ChatGPT turn-cost telemetry
Official source: https://github.com/openai/codex/pull/41944

- ChatGPT-authenticated Codex sessions can query workspace-visible turn estimates.
- `codex.turn.cost_microusd` is emitted only for visible, nonnegative estimates whose settlement covers every locally observed response ID.
- Missing/hidden estimates are not treated as zero.
- Error response bodies are kept out of turn-cost worker logs.

Dex interpretation: this is advisory telemetry, not authoritative ChatGPT plan/credit/invoice state.

### OpenAI PR #41946 — extension and skill permission regressions
Official source: https://github.com/openai/codex/pull/41946

- Turn-scoped extension grants expire on the next turn while session-scoped grants persist within session scope.
- Live executor skill reference reads are exercised under current filesystem permissions, including pagination and permission changes.
- Paginated continuation keeps a cached reference snapshot across underlying file edits.
- Oversized live skill prompts warn without replacing already-injected prompt content.

Dex interpretation: strengthens least-privilege and prompt-consistency evidence; it does not justify broader filesystem permission.

### OpenAI PR #41949 — App Server `plugin/reconcile`
Official source: https://github.com/openai/codex/pull/41949

- Adds `plugin/reconcile` JSON-RPC for installed remote plugin bundle synchronization.
- Reports changed plugin IDs plus MCP / Apps / hooks / skills refresh hints.
- Separately reports remote-update and materialization failures.
- Refreshes affected loaded hook runtimes and tests workspace/global installs, changes, removals, failures and disabled plugins.
- Returned category flags are change/refresh hints, not runtime-readiness or capability authorization.

Dex interpretation: potentially useful for reducing plugin drift and stale-hook rework, but provider-installed bundles/cache remain non-canonical. Git-controlled Dex Skill/Plugin source remains authoritative.

### OpenAI PR #41950 — nested tool and exec-process tracing
Official source: https://github.com/openai/codex/pull/41950

- Preserves trace context for Code Mode callbacks that outlive the initiating request.
- Adds nested tool invocation spans in runtime and dispatch broker.
- Streamed gRPC callbacks prefer the per-tool invocation span as W3C parent.
- Exec Server records a process-lifetime span with process ID and completion result without retaining the initiating request span.

Dex interpretation: useful future diagnostic evidence for Runtime #28, but traces do not replace canonical Task state, Result receipts, idempotency checks or verifier evidence.

## Stable / pricing / model check

Official sources:
- https://developers.openai.com/codex/changelog
- https://github.com/openai/codex/releases/latest
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

- Latest non-prerelease Codex CLI remains `0.151.0` (published 2026-08-29).
- No new stable Codex release was identified in this run.
- No new model or pricing/usage-limit change requiring a Dex policy change was identified.
- Shared agentic allowance guidance remains compatible with Dex subscription-first / low-rework routing policy.

## Inference

- Turn-cost telemetry may help compare expensive or rework-heavy execution routes while remaining on ChatGPT subscription auth, but it is best-effort and must be reconciled against official Usage/Credits state before any user-facing quota or cost decision.
- `plugin/reconcile` may lower cross-surface plugin drift, but automatic/background use before stable inclusion and Dex E2E would add a new mutation/synchronization boundary.
- Nested tracing can shorten diagnosis of long-running or nested-tool failures without changing canonical task semantics.

## Proposal applied

The low-risk optimization is tracking-only and is already merged in Runtime PR #56:

1. Runtime #30: future stable cost telemetry is advisory only; it cannot authorize paid API/fallback, credit purchase, banked reset, plan change or extra paid usage. PR #41946 permission regressions are also tracked for approved Windows-host E2E.
2. Runtime #34: future stable `plugin/reconcile` must prove workspace/global isolation, deterministic changed-plugin hints, update/materialization failure handling, hook readiness, disabled-state preservation, canonical Git source preservation and no automatic legacy Skill/Plugin deletion.
3. Runtime #28: future stable nested tracing must prove W3C continuity, bounded/secret-safe attributes and strict separation from canonical Task/Result state.
4. Stable `0.151.0`, GitHub Task Bus authority, one-active-writer mutation rule and subscription-first cost policy are unchanged.

## PASS / FAIL / Not Checked

- Official upstream evidence: **PASS**
- Latest stable verification: **PASS** — `0.151.0`
- Current Wiki/Runtime main comparison: **PASS**
- Runtime PR #56 branch CI/security workflow: **PASS**
- Runtime PR #56 merge: **PASS**
- Runtime post-merge main CI: **pending at evidence-write time; must be checked before final run report**
- New production capability activation: **Not Checked / intentionally unchanged**
- Future stable inclusion of PRs #41944/#41946/#41949/#41950: **Not Checked**
- Approved Windows-host cost/plugin/permission/tracing E2E: **Not Checked**
- FAIL: **none identified**

## Unknown

- Which stable release will include these upstream changes.
- Whether stable `plugin/reconcile` will preserve the current upstream schema/semantics.
- Exact mapping between `codex.turn.cost_microusd` and final ChatGPT plan allowance/credits accounting.
- Approved Windows-host tracing overhead/retention and the extension/skill permission cases skipped by upstream fixtures that require an elevated Windows sandbox backend.

## Safety boundary

- No prerelease/alpha promotion.
- No automatic `plugin/reconcile`, plugin auto-update or provider-cache promotion to Source of Truth.
- No legacy Skill/Plugin deletion.
- No broader filesystem permission.
- No paid API, automatic paid fallback, extra paid usage, credit purchase, banked reset use or plan change.
- No raw prompt, tool argument, credential, local secret or unbounded stdout/stderr persistence in Dex tracing/receipts.
- No deployment, external messaging, Browser/CDP, Computer Use, Remote Control, Voice/Realtime activation.
