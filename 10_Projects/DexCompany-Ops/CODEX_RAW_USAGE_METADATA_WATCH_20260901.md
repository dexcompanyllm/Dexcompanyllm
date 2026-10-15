# Codex raw response usage metadata watch — 2026-09-01

## Canonical scope

This evidence records the meaningful OpenAI/Codex delta discovered after the Codex 0.152.0 stable-response checkpoint and the Dex response applied under the standing provider-update optimization policy.

- Wiki evaluation base: `51ac489db66554cfc4d65c2530795505d07e15fd`
- Runtime approved `main` observed before this watch: `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Runtime watch PR: #61
- Runtime watch merge: `b5dde885456562fd97d1cde4deb4df7b7ca1e280`
- Runtime PR #61 branch validation: PASS
- Runtime merge-commit validation run `33474094912`: PASS
- Runtime merge-commit Vercel status: PASS
- Current Runtime PR #59/#60 sandbox hardening is preserved; this watch does not revert or supersede those changes.

## Official OpenAI/Codex evidence

### confirmed — PR #41980

- Source: https://github.com/openai/codex/pull/41980
- Merge commit: `e017e93aceafb2fe04bed1c926e448a5fb4f913d`
- Merged: 2026-09-01 05:19:29 UTC
- The merge occurred after the Codex `0.152.0` release cutoff. It is upstream-main evidence, not an operational 0.152.0 stable dependency.
- `ResponseUsageMetadata` preserves the complete upstream `response.usage` object in a new `metadata` field while retaining the existing `amount` field.
- App Server exposes the metadata through `rawResponse/completed` and updates generated JSON/TypeScript schemas.
- Upstream tests cover SSE, WebSocket, normal turn completion, and compaction completion.

### assessed — no Dex migration required

- PR #41974 adds provider telemetry `codex.tui.start` labeled by App Server mode (`in_process`, `local_daemon`, `remote`). It does not change Dex task, permission, provider-auth, or canonical-state contracts.
- PR #41976 makes `tui.disable_paste_burst` the preferred config key while retaining the top-level key as a legacy fallback. Dex Runtime has no dependency on this setting.

## Dex impact classification

- `confirmed`: richer raw response usage metadata is available in upstream App Server main through `rawResponse/completed`.
- `inference`: selected stable usage fields may improve long-running turn/compaction observability and help identify unnecessarily expensive or high-rework execution paths.
- `proposal`: if a future stable exposes the contract, Dex should consume only bounded, explicitly allowlisted fields after approved-host schema/E2E validation. Opaque metadata should not be blindly persisted.
- `unknown`: the first stable release containing PR #41980 and which individual upstream usage fields will have a durable contract across models/backends.

## User-favor optimization

Dex keeps this data as advisory observability rather than a new billing or Task authority:

1. `response.usage`, `amount`, and `codex.turn.cost_microusd` do not become the canonical ChatGPT plan quota, credit balance, reset ledger, invoice, Task state, or Result receipt authority.
2. Official account/workspace Usage UI remains the user-facing allowance/credit authority; unknown mapping fails closed.
3. Future consumption must use an explicit field allowlist and bounded payload size.
4. Raw prompts, tool arguments, credentials, secret-bearing diagnostics, or unbounded provider payloads must not enter canonical Task/Result receipts or logs simply because App Server exposes the metadata.
5. Permanent storage is justified only if measured evidence shows lower rework, better routing, or useful subscription-first cost control without excessive privacy/storage overhead.

## Future gate

- [ ] first official stable containing PR #41980 identified
- [ ] approved Windows host generated App Server schema diff PASS
- [ ] SSE / WebSocket / normal turn / resume / compaction metadata parity and bounds PASS
- [ ] selected-field allowlist and unknown-field handling PASS
- [ ] sensitive-data/secret scan and receipt-boundary regression PASS
- [ ] usage metadata vs official account/workspace Usage UI relationship documented or retained as `unknown`
- [ ] routing/rework benefit and telemetry/storage overhead measured before persistent ingestion

## Result

- PASS — official PR #41980 verified and classified as meaningful upstream-main evidence.
- PASS — current approved Runtime main was read before the change; PR #59/#60 sandbox hardening was preserved.
- PASS — Runtime PR #61 branch validation completed successfully before merge.
- PASS — Runtime PR #61 merged as `b5dde885456562fd97d1cde4deb4df7b7ca1e280` with documentation/tracking only.
- PASS — Runtime merge-commit validation run `33474094912` and Vercel commit status completed successfully.
- PASS — Runtime Issue #30 updated as the existing tracking authority; no duplicate capability authority created.
- PASS — PR #41974/#41976 assessed; no Dex migration required.
- FAIL — none.
- Not Checked — future stable inclusion; approved-host schema/E2E; durable field contract; routing/overhead benefit.

## Non-actions

No Codex prerelease/experimental feature, paid API, automatic paid fallback, extra paid usage, credit/reset/plan action, broader permission, plugin auto-install/reconcile/update/delete, Voice/Realtime, Browser/CDP, Computer Use, Remote Control, external messaging, destructive migration, or legacy Skill/Plugin deletion was enabled.

The `0.152.0` approved-host promotion gate remains separate and unchanged by PR #41980.
