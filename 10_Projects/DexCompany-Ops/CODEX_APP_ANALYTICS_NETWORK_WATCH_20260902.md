# Codex App Analytics / Managed Network Watch — 2026-09-02

- Verification date: 2026-09-02
- Evidence scope: Official OpenAI `openai/codex` repository, official Codex release/changelog, approved Dex Wiki/Runtime `main`
- Claim type: source-backed provider watch + Dex inference/proposal
- Operational effect: watch/gate only; no capability activation

## Official source-backed findings

### `confirmed` — OpenAI Codex PR #42164

Source: https://github.com/openai/codex/pull/42164

PR #42164, **Record result sources in app tool analytics**, was merged after the prior Dex provider-watch cutoff and after official stable `0.152.1`.

OpenAI's merged change:

- adds per-tool `analytics_result_source` requirements, initially supporting `detailed_message_search_v1`;
- attaches trusted host-generated source IDs from accepted app-tool results to executed-tool-call metadata for direct and Code Mode invocations;
- bounds and deduplicates source metadata;
- rejects caller-supplied source values;
- sheds optional source metadata before core tool-call/completion metadata under budget pressure;
- preserves accepted source updates across waits/retries while preventing stale or compacted records from overwriting newer accepted metadata.

### `confirmed` — OpenAI Codex PR #42173

Source: https://github.com/openai/codex/pull/42173

PR #42173, **Support header injections in network requirements**, was merged after `0.152.1`.

OpenAI's merged change:

- adds parsing for `experimental_network.header_injections` requirement rules with host, methods, path prefixes and header mappings;
- carries those rules into `NetworkConstraints`;
- exports the rule type from `codex_config`;
- reports rule counts and hosts in TUI debug configuration while not exposing configured header values;
- implements debug formatting that exposes header names, not values, and includes tests that reject value disclosure in debug output.

The PR establishes the configuration/constraint surface. This evidence does **not** claim that the complete downstream request-application/enforcement lifecycle is verified by this PR alone.

### `confirmed` — OpenAI Codex PR #42178

Source: https://github.com/openai/codex/pull/42178

PR #42178, **Add structured asynchronous user input requests**, was merged after `0.152.1`.

OpenAI's merged change:

- replaces `send_user_message_async` with `request_user_input_async` while retaining capability compatibility for model catalogs that advertise either name;
- accepts one or more structured questions with optional suggested answers while the active turn can continue;
- attaches question metadata to asynchronous agent messages and preserves it through App Server events, thread history and generated schemas while retaining readable fallback text;
- tests tool registration, question validation, emitted items, continued execution, history preservation and backwards-compatible deserialization.

### `confirmed` — PR #42161 / #42174 screened out from operational response

Sources:
- https://github.com/openai/codex/pull/42161
- https://github.com/openai/codex/pull/42174

PR #42161 is a tool JSON Schema code refactor preserving public re-exports. PR #42174 is a Bazel-only cacheable App Server schema-generation bundle with a pinned `zstd` helper. No intended provider-runtime contract or Dex capability change was identified, so neither creates a separate operational change.

### `confirmed` — stable status

Official release: https://github.com/openai/codex/releases/tag/rust-v0.152.1

At this verification cutoff, `0.152.1` remains the latest official non-prerelease Codex release. PRs #42164, #42173 and #42178 are post-`0.152.1` upstream-main evidence and are not approved Dex-host stable capabilities.

Official changelog: https://learn.chatgpt.com/docs/changelog

No new Codex stable model, App/CLI/IDE stable release, or Dex-relevant pricing/usage-limit policy change was identified after the prior watch cutoff.

## Dex classification

### `inference`

- #42164 can improve future app-tool provenance and retry/compaction attribution, which may reduce investigation and rework in Work/plugin flows.
- Result-source IDs create a privacy/identity boundary and should remain bounded observability metadata rather than authentication, authorization, Task identity or billing authority.
- #42173 is security-sensitive groundwork. If injected header values are later applied to outbound requests, those values can carry credentials, privileged routing metadata or account identifiers and therefore need secret-grade handling and exact destination binding.
- #42178 can reduce interruption/rework in long-running Work flows by allowing safe independent work to continue while bounded user input is outstanding, but delayed answers create a Task/attempt/approval timing boundary.

### `proposal`

For #42164, wait for a containing non-prerelease stable and verify trusted-source generation, account/workspace/Task/attempt isolation, bounded metadata, stale-retry resistance and Work/web/desktop/mobile parity before #34 relies on the behavior.

For #42173, keep the capability disabled. Before any later adoption, verify the complete application path and require exact host/method/path matching, redirect safety, secret redaction, managed-policy precedence, rotation/revocation, account/workspace/process isolation, no model visibility of values, and zero network-permission widening.

For #42178, keep it watch-only until a containing non-prerelease stable and #34 E2E verify deterministic question provenance, Task/attempt binding, stale/replayed-answer rejection, cancellation/reconnect behavior, multiple-question ordering, and zero mutation before any separately required approval. Suggested answers remain UI convenience only and never imply approval, permission expansion, paid-use consent or destructive-action consent.

### `unknown`

- first non-prerelease stable containing #42164/#42173/#42178;
- final retention/export contract for result-source metadata;
- complete stable header-injection enforcement/application lifecycle, redirect/retry/proxy behavior and rotation/revocation semantics;
- final async-question identity/expiry/reconnect contract;
- approved Windows-host and Chat/Work web/desktop/mobile E2E.

## Dex comparison

Current canonical operational Gate remains unchanged:

- Runtime #28 Phase 1: PASS
- Runtime #28 Phase 2: PASS
- Runtime #28 Phase 3 implementation: PASS
- approved Windows-host Phase 3 E2E: Not Checked
- Runtime #34/#35: blocked until #28 full PASS

The changes in this watch do not justify modifying the Runtime implementation, enabling `experimental_network`, treating async input as approval, broadening permissions, installing/updating plugins, or changing the subscription-first cost policy.

## Safety / acceptance boundary

For app-tool result-source analytics:

- source metadata must be trusted-host generated and caller/model spoofing must fail;
- source IDs must be bounded/deduplicated and exclude raw message content, secrets, authorization headers, tokens, unnecessary PII and local absolute paths;
- retries/waits/compaction must not overwrite newer accepted provenance;
- identity isolation must bind account/workspace/connector/tool/Task/attempt as appropriate;
- result-source analytics remains observability/provenance only, never canonical Task/Result, auth, approval, idempotency or billing authority.

For managed header injections:

- keep `experimental_network.header_injections` disabled until an official stable plus explicit security/E2E gate passes;
- treat every injected header value as secret-grade data;
- do not persist values in Git, TUI/debug, model context, Task/Result receipts, ordinary logs, analytics, diagnostics or errors;
- require deterministic least-privilege destination host/method/path matching and safe behavior across redirects/retries/proxies;
- malformed/ambiguous configuration must not widen network access;
- model/user content must not override managed rules or read injected values;
- account/workspace/process/Task isolation and rotation/revocation must prevent stale or cross-identity reuse;
- no network allowlist, OAuth/filesystem/MCP permission, hosted write, paid API/fallback, plugin mutation or Task authority expansion is allowed by this watch.

For structured asynchronous user input:

- bind every question/answer to originating provider provenance and canonical Dex Task ID/`attemptId`/identity without making provider metadata canonical authority;
- delayed, duplicate, replayed, stale, reconnect-delivered or cross-thread answers must not satisfy another question or mutate a newer attempt;
- suggested answers are non-authoritative and cannot substitute for explicit approval or consent;
- if an operation separately requires approval, mutation remains zero until that approval is satisfied;
- multiple questions must not cause duplicate writer execution or duplicate canonical Result publication;
- cancellation, compaction, resume, mobile/background reconnect and provider failover must preserve safe question state or fail closed;
- question/answer data must be bounded and secret-scanned before GitHub persistence.

## Validation note discovered during this watch

Runtime watch PR #100 initially exposed a pre-existing Phase 3 test-fixture defect: three local-bridge tests used hard-coded live job deadlines ending at `2026-09-02T00:01:00Z`, so the production stale-job guard correctly rejected those fixtures once real time passed that point.

- Runtime validation `33581777144` attempt 1: **FAIL** — three `Local bridge job is stale` unit tests.
- One rerun, attempt 2: **FAIL** — identical failures; no further blind retry.
- Runtime PR #101 changed only the two affected test files to use current-relative timestamps for live write/claim/approval fixtures while preserving explicit stale assertions.
- Runtime PR #101 validation `33582166976`: **PASS**, including static/unit/smoke validation and production dependency audit; Vercel preview Ready.
- Runtime PR #101 merged as `fcffeb936606a94c2954de2b72f74d88a4eecf1d` before the provider-watch PR is eligible to merge.

This was a test-maintenance defect, not a provider-watch code regression. Production local-bridge logic and security semantics were not changed by PR #101.

## Verification

- Official PR #42164 metadata/diff: **PASS**
- Official PR #42173 metadata/diff: **PASS**
- Official PR #42178 metadata/diff: **PASS**
- PR #42161/#42174 operational-screening review: **PASS**
- Latest non-prerelease Codex release: **PASS — 0.152.1**
- Dex Runtime/Wiki approved-main comparison: **PASS**
- Runtime PR #101 test-fixture remediation: **PASS**
- Runtime operational Gate change: **none**
- Capability/config/permission/cost activation: **none**
- Future stable containing #42164/#42173/#42178: **Not Checked**
- Approved Windows-host / Work-mobile E2E: **Not Checked**
- Unresolved FAIL: **none after remediation**

## Provenance

This note records official upstream evidence and Dex-specific inference/proposal separately. It does not promote upstream `main` behavior into current Dex production capability.
