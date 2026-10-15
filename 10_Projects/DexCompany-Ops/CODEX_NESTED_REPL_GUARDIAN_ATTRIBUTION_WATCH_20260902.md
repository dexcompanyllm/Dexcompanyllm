# Codex nested REPL Guardian attribution watch — 2026-09-02

## Official evidence

OpenAI Codex PR #42082 — `Attribute nested REPL reviews to their tool calls`

- https://github.com/openai/codex/pull/42082
- Merge commit: `67cc3c318dc8b5532db6ade4182b1dc6f3870889`
- Merged: 2026-09-01 15:36:23 UTC

## Classification

### confirmed

- Node-backed REPL MCP invocation metadata is retained so nested elicitations can resolve the enclosing tool call.
- A valid current-turn, same-server `callId` can be used as the Guardian assessment target while nested actions/connectors remain independently reviewed.
- Missing, malformed, unknown, wrong-server, or previous-turn IDs fall back to an elicitation-specific target instead of being trusted as the enclosing tool call.
- Upstream tests cover ordinary/strict `node_repl` and `cua_repl`, multiple nested decisions, unrelated servers, and invalid/stale call IDs.
- Latest official non-prerelease Codex remains `0.152.0`; #42082 is post-release upstream-main evidence.
- Dex Runtime PR #72 records the watch-only gate and merged as `04ed123ecf357e8179af4b00c694de8950798b89` after branch Runtime validation `33526977857` and branch Vercel PASS.

### inference

- Accurate enclosing-call attribution should reduce approval ambiguity and investigation/rework for nested REPL actions.
- Rejecting stale/cross-server attribution is security-positive because unrelated `callId` metadata cannot be used to borrow a different review target.
- This does not make Node REPL, CUA, Browser/CDP, or Computer Use safe enough for Dex activation by itself.

### proposal applied

- Keep #42082 under Runtime #25 watch until a future stable and approved Windows-host E2E pass.
- Require same-turn/same-server attribution, invalid/stale/cross-server fallback, independent review for multiple nested actions/connectors, and deny/invalid => zero mutation.
- Provider-local `callId` remains bounded provenance metadata; GitHub Task ID, `attemptId`, explicit approval, mutation lock, Result/receipt and verifier evidence remain canonical authority.
- Do not enable Node REPL, CUA REPL, Browser/CDP, Computer Use, first-REPL fast-start, broader permissions, automatic approval, or paid paths.

### unknown

- First stable release containing #42082.
- Final public/stable nested REPL attribution metadata contract.
- Approved Windows-host behavior and practical productivity/approval-friction benefit.

## Validation

| Check | Result |
|---|---|
| #42082 official PR/body/diff/merge | PASS |
| Latest stable | PASS — `0.152.0` |
| Runtime PR #72 one-file docs scope | PASS |
| Runtime validation `33526977857` | PASS |
| Runtime branch Vercel | PASS |
| Future stable containing #42082 | Not Checked |
| Approved Windows-host Node/CUA REPL E2E | Not Checked |
| Runtime PR #72 merge-SHA GitHub Actions | Not Checked unless a run appears |
| FAIL | none |

## Safety boundary

No prerelease/experimental activation, REPL/CUA/Browser/Computer Use activation, permission expansion, paid API, automatic paid fallback, extra paid usage, plugin/Skill auto-change, diagnostic auto-upload, external messaging, destructive migration, or legacy Skill/Plugin deletion was introduced.

Wiki Issue #55 remains open to reconcile large aggregate Runtime pointers in a bounded pass; this provider-watch note does not mass-rewrite historical/current aggregate documents and therefore preserves unrelated user changes.
