# Codex app-link approval enforcement watch — 2026-09-01

## Purpose

This evidence records a meaningful post-0.152 OpenAI Codex change that resolves the implementation uncertainty left by the prior per-account Apps approval watch. It is a provider-watch/canonical evidence update only and does not activate a new capability.

## Official source

- OpenAI Codex PR #42056: https://github.com/openai/codex/pull/42056
- Title: `Honor app link settings for MCP tool approvals`
- Merge commit: `3a04482645b695085f4daf7c6310ab8592653fea`
- Merged: 2026-09-01 13:45:48 UTC
- Latest official non-prerelease Codex release checked in this run: `0.152.0`

## Confirmed

- PR #42056 passes the resolved Apps `link_id` into MCP tool approval policy evaluation.
- Link-specific `default_tools_approval_mode` is evaluated before app/global defaults.
- Link-specific `approvals_reviewer` is evaluated before app/global defaults.
- Per-tool approval settings and managed policy requirements keep higher precedence, so a permissive link default cannot override a stricter managed/per-tool requirement in the paths covered by upstream tests.
- Upstream tests cover selected account links, reviewer routing, fallback behavior and managed-policy overrides.
- This completes the core upstream-main approval-policy wiring that PR #42047 introduced as config/schema and PR #42054 strengthened with fail-closed explicit account selection.
- The previous statement that link-level approval enforcement was not yet wired is superseded for upstream `main`: **core enforcement is now confirmed upstream-main**.
- It is still **Not Checked as a Dex operational dependency** until the change appears in a non-prerelease stable and approved-host/surface E2E passes.
- Current approved Runtime `main` after Dex response PR #70 is `1ad739c9075f9d1c2fab8be6e7812a71bedbc11d`.
- Runtime PR #70 is documentation-only; branch validation `33520275697` PASSed static checks, unit tests, smoke test and production dependency audit. No merge-SHA GitHub Actions run was returned at verification time, so post-merge Actions is Not Checked.

## Inference

- The #42047 → #42054 → #42056 sequence materially improves the future least-privilege model for Apps with multiple connected accounts: the selected account can carry its own approval posture instead of inheriting only one app-wide policy.
- This should reduce accidental cross-account writes and unnecessary approval friction when stable behavior matches upstream tests.
- Account/link lifecycle remains the main residual risk. Stale links, reconnects, account rotation, cross-workspace IDs or replayed selectors could still create policy drift if Dex treats a `link_id` as identity without binding and revocation checks.

## Proposal applied

- Keep per-link Apps approval under Runtime #34 and do not operationalize it before #28 Phase 3 PASS plus the future-stable/approved-host gate.
- Update the tracking boundary from `upstream enforcement unknown` to `upstream-main core enforcement confirmed; stable/approved-host E2E Not Checked`.
- Retain fail-closed selector requirements from #42054 and require stable precedence, account/workspace binding, stale/replayed-link rejection and disconnect/reconnect revocation tests.
- Do not auto-write `apps.*.links.*`, do not automatically select `approve`, do not broaden OAuth/tool permissions, and do not treat provider link metadata as GitHub Task/Result authority.

## Unknown

- Which future non-prerelease Codex release first contains #42056.
- Whether Chat, Work, desktop and mobile surfaces expose identical selected-account identity and policy precedence when the change becomes stable.
- Final stable lifecycle semantics for link creation, refresh, revocation, reconnect and account rotation.
- Operational ROI until approved-host E2E measures reliability/rework improvement.

## Dex safety boundary

- No prerelease or experimental capability activation.
- No Codex host upgrade.
- No app/link approval configuration mutation.
- No automatic approval or reviewer reassignment.
- No OAuth, filesystem, MCP, plugin, Browser/CDP, Computer Use, Remote Control, Voice/Realtime, deployment or external-messaging permission expansion.
- No paid API, automatic paid fallback, extra paid usage, credit purchase, banked reset or plan change.
- No plugin auto-install/update/reconcile/delete and no legacy Skill/Plugin deletion.
- GitHub Task Bus, canonical Task/Result receipts, one-active-writer and risk-based independent verification remain authoritative.

## Future stable / approved-host gate

1. Identify the first official non-prerelease stable containing #42056 and compare generated App Server schemas.
2. Verify required explicit selectors originate from actual tool arguments and missing/empty/non-string/stale/unknown `link_id` fails closed before approval/execution with zero mutation.
3. Verify stable precedence: managed requirement > per-tool setting > selected-link default > app default > apps default > global policy, matching the released implementation.
4. Prove permissive link settings cannot override stricter managed or per-tool requirements.
5. Bind each link to authenticated account/workspace identity and reject cross-workspace, swapped, replayed or stale IDs.
6. Verify disconnect/reconnect/account rotation refreshes or revokes stale link policy without permissive residue.
7. Verify `user` vs `auto_review` reviewer routing and supported approval modes with positive/negative tool sets.
8. Verify approval evidence identifies the selected account sufficiently without unnecessary sensitive-data persistence.
9. Verify non-Apps MCP and legacy Apps fallback behavior remain within the stable contract.
10. Verify Dex OAuth scopes, Task/Result authority and merge/deploy/delete/control boundaries remain unchanged.
11. Run Chat/Work desktop/mobile E2E only after Runtime #28 Phase 3 passes and #34 becomes executable.

## Tracking

- Runtime tracking issue: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/34
- Runtime evidence: `docs/CODEX_APP_LINK_APPROVAL_ENFORCEMENT_WATCH_20260901.md`
- Runtime response PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/70
- Runtime #34 tracking comment: `5495595173`

## Validation

- Official PR/body/diff review: PASS
- Merge timestamp/commit verification: PASS
- Upstream link-specific mode/reviewer wiring review: PASS
- Upstream precedence regression coverage review: PASS
- Latest non-prerelease release check: PASS (`0.152.0`)
- Current approved Wiki/Runtime main comparison: PASS
- Runtime PR #70 branch validation: PASS (`33520275697`)
- Runtime behavior/config activation: intentionally unchanged
- Future stable containing #42056: Not Checked
- Approved Windows-host per-account selector/approval E2E: Not Checked
- Chat/Work desktop/mobile link-policy E2E: Not Checked
- Runtime PR #70 merge-SHA post-merge GitHub Actions: Not Checked
- FAIL: none identified
