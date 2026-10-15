# Codex Guardian context / MCP metric privacy watch — 2026-09-02

## Summary

OpenAI Codex upstream merged two meaningful post-`0.152.0` Guardian changes after the prior Dex watch cutoff. Dex treats both as watch-only until a future stable release and approved-host E2E confirm the behavior.

## Official sources

1. OpenAI Codex PR #42085 — Centralize Guardian context composition
   - https://github.com/openai/codex/pull/42085
   - merged 2026-09-01T15:56:07Z
   - merge commit `6127478086e611323e3bff40c943588606c1c571`

2. OpenAI Codex PR #42086 — Attribute Guardian reviews to OpenAI app tools
   - https://github.com/openai/codex/pull/42086
   - merged 2026-09-01T16:06:51Z
   - merge commit `f4e6cb78760af4eb75bb370f0f15bd8ca4cb1d3a`

3. Latest official non-prerelease Codex release at this cutoff
   - `0.152.0`
   - https://github.com/openai/codex/releases/tag/rust-v0.152.0

## Findings

### confirmed

- PR #42085 adds `SectionRegistry::compose`, which groups authorization fragments and transcript entries while preserving authorization-fragment boundaries and registration order.
- Core Guardian, Guardian V2 synchronous review, and Guardian V2 asynchronous review use the shared composed context.
- Context contributor failure remains fail-closed: no partial composed context is returned.
- Tests explicitly cover root-conversation role handling, trusted user answers, sync/async targets, empty context, contributor failure, and authorization-fragment preservation.
- PR #42086 adds a sanitized `tool` dimension only to Guardian review-count metrics for the OpenAI Apps MCP server.
- Custom MCP tool names are intentionally excluded from that metric tag because tool names may contain user data.
- Guardian duration and token-usage histograms retain their existing tag set and do not inherit the tool-name dimension.
- Both PRs are upstream-main changes after `0.152.0`; they are not approved Dex stable-host capabilities yet.

### inference

- A single Guardian context composition path should reduce review drift and unnecessary re-approval/rework across Core/V2 sync/V2 async paths, especially for long-running #28 tasks and future #35 verifier expansion.
- The #42086 metric boundary reduces accidental telemetry disclosure from user-defined/custom MCP naming while retaining bounded observability for OpenAI Apps tools.

### proposal

Keep both changes watch-only and require all of the following before Dex depends on them operationally:

- future stable release containing the changes is identified;
- approved Windows host confirms Core/V2 sync/V2 async authorization-context parity;
- assistant-authored text that resembles user authorization never becomes authorization evidence;
- missing/failed context contributors remain fail-closed without silently dropping authorization fragments;
- custom MCP server/tool names do not appear in Guardian metric tags, Dex logs, canonical Task/Result receipts, or user-facing telemetry;
- telemetry remains diagnostic evidence only and never becomes Task, approval, quota, billing, or permission authority.

### unknown

- First stable release containing #42085/#42086.
- Approved Windows-host and Work/mobile/desktop parity.
- Final Guardian telemetry retention/export contract.
- Measured reduction in review drift, re-approval, or rework in Dex production workflows.

## Dex optimization applied

Runtime PR #73 added a documentation-only watch gate and merged after validation:

- Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/73
- Runtime merge: `85c8e73e5ac30825f2e2b512b18caa83c172221f`
- Branch validation run `33532440505`: PASS
  - dependency install: PASS
  - static checks / unit tests / smoke test: PASS
  - production dependency audit: PASS
- Merge-commit Vercel: PASS
- Merge-SHA separate GitHub Actions run: Not Checked; none was returned at verification time.
- Runtime Issue #25 updated with future stable / approved-host gates.

No Runtime execution code, permission policy, model target, paid-use behavior, plugin/skill state, or browser/REPL capability was changed.

## Safety boundary retained

- no prerelease/experimental enablement;
- no paid API, automatic paid fallback, extra paid usage, credit/reset/plan changes;
- no broader MCP/filesystem/OAuth permission;
- no automatic plugin/skill install, update, reconcile, or deletion;
- no Node/CUA REPL, Browser/CDP, Computer Use, Remote Control, Voice/Realtime, or external messaging enablement;
- GitHub Task/Result receipt, `attemptId`, mutation lock, explicit approval, and detached verifier evidence remain canonical authorities;
- subscription-first remains mandatory.

## Validation record

- Official PR #42085 metadata/diff: PASS
- Official PR #42086 metadata/diff: PASS
- Latest non-prerelease release check: PASS — `0.152.0`
- Runtime PR #73 branch validation/security scope: PASS
- Runtime PR #73 merge: PASS
- Runtime merge Vercel: PASS
- Future stable inclusion: Not Checked
- Approved Windows-host Guardian context parity E2E: Not Checked
- Custom MCP metric privacy on approved host: Not Checked
- Work/mobile/desktop parity: Not Checked
- FAIL: none observed in this watch-only assessment
