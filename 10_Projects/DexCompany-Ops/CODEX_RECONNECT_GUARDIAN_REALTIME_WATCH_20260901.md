# Codex reconnect, Guardian policy, and realtime durability watch — 2026-09-01

## Summary

Official OpenAI `openai/codex` upstream `main` gained four Dex-relevant changes after the previous provider-watch cutoff: reconnect-safe local-daemon agent navigation, model-metadata-driven Guardian REPL review policy, per-call realtime sideband endpoints, and Core-owned realtime history persistence. Latest non-prerelease remains Codex `0.151.0`, so all four remain watch-only until a future stable and approved-host E2E prove the contracts Dex would depend on.

## Canonical comparison

Checked against approved `main` branches before changes:

- Wiki `main`: `0be801bd7e8cab02e855959c22798ddf4b715942`
- Runtime `main`: `2ac45ceb907e70a6e6b72d617d9c9105052ae460`
- Runtime policy already kept upstream-main capabilities disabled, GitHub Task Bus canonical, paid API/automatic paid fallback disabled, and #17 -> #28 -> #34/#35 sequencing intact.

No current Runtime execution code needed to change for these upstream-only capabilities. The beneficial change is to strengthen future stable/approved-host gates while preserving the existing stable target and authority boundaries.

## Confirmed

### OpenAI PR #41918 — Restore agent navigation after TUI reconnects

Official source: https://github.com/openai/codex/pull/41918

- The agent command center keeps cached inventory and draft visible while reconnecting, then refreshes without losing the selected task.
- Cached unavailable conversations can reattach while preserving drafts, recap progress, and runtime permissions.
- A disappearing rename target is reported instead of silently redirected.
- Queued input remains quarantined and is not automatically resent after reconnect.

Dex relevance: safer recovery for long-running/multi-agent operator workflows if Dex ever consumes this local-daemon surface. It is not a current Dex dependency.

### OpenAI PR #41919 — Source Guardian REPL policy from model metadata

Official source: https://github.com/openai/codex/pull/41919

- Adds `auto_review.node_repl_policy` model metadata for `node_repl` / `cua_repl` review paths.
- Missing metadata falls back to the bundled policy; explicitly empty metadata skips injection.
- Effective review policy participates in reviewer-session reuse checks.
- Unsafe parent-model fallback transitions that would change the effective policy are rejected.

Dex relevance: the review policy becomes part of the reviewer-session trust boundary. Dex must not assume cached Guardian review state remains valid across a policy/model change.

### OpenAI PR #41923 — Allow per-call sideband endpoints for existing realtime calls

Official source: https://github.com/openai/codex/pull/41923

- Existing realtime calls can carry an in-process `sideband_base_url` override.
- Attach/reconnect prefers the per-call endpoint and falls back to configured `experimental_realtime_ws_base_url` when absent.
- Runtime authentication headers are preserved on the selected endpoint without adding bearer authorization.

Dex relevance: improves routing/reconnect flexibility, but the endpoint becomes a security boundary. Dex must not let untrusted task/model content select arbitrary sideband destinations.

### OpenAI PR #41924 — Record realtime conversation history in Core

Official source: https://github.com/openai/codex/pull/41924

- Realtime transcript segmentation, session boundaries, and backing-agent artifact promotion move into Core for paginated threads.
- Canonical realtime items are persisted through the thread store in event order.
- Core emits history lifecycle events; App Server maps them to existing realtime item notifications without persisting them a second time.
- Upstream tests cover repeated/ephemeral sessions, steering outcomes, typed-input ordering, artifact promotion and App Server notification correspondence.

Dex relevance: provider-side durability improves, but provider realtime history is not Dex canonical Task/Result state and needs privacy/retention/provenance rules before integration.

### Stable / pricing / model status

Official latest release: https://github.com/openai/codex/releases/latest

- Latest non-prerelease remains `0.151.0`.
- `0.152.0-alpha.7` remains prerelease and is not promoted.
- No new stable model, Codex subscription pricing/usage-limit, Skills/Plugins/MCP stable contract, or Windows stable release change requiring a Dex policy change was identified in this interval.
- Existing subscription-first policy remains correct: paid API, automatic paid fallback and automatic extra paid usage stay disabled.

## Inference

- #41918 lowers reconnect-related duplicate-action risk because queued input is quarantined instead of replayed automatically. That is consistent with Dex's mutation idempotency and single-writer rules.
- #41919 makes model metadata and fallback behavior security-relevant to Guardian session reuse. Stable-host testing should fingerprint/evaluate the effective policy rather than assuming model identity alone is sufficient.
- #41923 indicates stronger per-call realtime routing, but endpoint provenance and auth-header handling must be explicit before any Dex activation.
- #41924 makes future Voice/realtime history more durable and portable across Core hosts, but increases privacy/retention obligations and cannot replace GitHub Task Bus authority.

## Proposal applied

Low-risk optimization completed under the standing provider-update approval:

1. Runtime branch `watch/codex-reconnect-guardian-realtime-20260901` created from approved main.
2. Added `docs/CODEX_RECONNECT_GUARDIAN_REALTIME_WATCH_20260901.md` only; no runtime capability or permission change.
3. Runtime PR #53 opened and validated.
4. PR branch Runtime validation run `33447518411`: PASS.
   - install dependencies: PASS
   - static checks, unit tests and smoke test: PASS
   - production dependency audit: PASS
5. Runtime PR #53 merged to `main`: `ef5b836ece8358a4b96469abe744cd86d95290a8`.
6. Post-merge Runtime validation run `33447564805`: PASS.
7. Existing tracking authorities were reused, not duplicated:
   - Runtime #25: Guardian model-metadata review-policy stable gate
   - Runtime #30: realtime sideband endpoint + history privacy/retention/security gate
   - Runtime #35: reconnect/fail-closed queued-input gate for future local-daemon multi-agent use
8. No prerelease, realtime/Voice, microphone/audio recording, Browser/CDP, Computer Use, broader filesystem permission, paid API, automatic paid fallback, external messaging, deployment, or Task authority change was enabled.

## Unknown / Not Checked

- Future stable release containing #41918/#41919/#41923/#41924.
- Approved Windows-host E2E for those behaviors.
- Stable/public App Server contract for realtime history lifecycle events and per-call sideband routing.
- Current-account exposure of the relevant realtime/local-daemon surfaces.
- Final privacy/retention semantics for provider-persisted realtime/Voice history.
- #28 long-running Task interaction with reconnect quarantine and realtime history.

## PASS / FAIL / Not Checked

| Item | Result |
|---|---|
| Official upstream evidence | PASS |
| Latest non-prerelease stable verification | PASS — `0.151.0` |
| Current approved Wiki/Runtime main comparison | PASS |
| Runtime documentation/security diff review | PASS |
| Runtime PR #53 branch CI | PASS |
| Runtime PR #53 merge | PASS |
| Runtime post-merge main CI | PASS |
| Tracking issue updates #25/#30/#35 | PASS |
| Runtime capability activation | Not Checked / intentionally unchanged |
| Approved Windows-host E2E | Not Checked |
| New stable inclusion | Not Checked |
| FAIL items | None |

## Decision

Keep the approved stable target at `0.151.0`. Treat all four upstream changes as watch-only inputs. Preserve `#17 -> #28 -> #34/#35` priority, GitHub Task Bus authority, one active writer per mutation scope, fail-closed replay behavior, least privilege, and subscription-first cost control.
