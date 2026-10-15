# Codex incident resolution, Guardian answer context, auth and surface watch — 2026-09-04

## Scope

Source-backed provider watch after Runtime PR #168 / Wiki PR #146. This records official OpenAI/Codex evidence and Dex inference/proposals without activating Runtime behavior, paid usage, broader permissions, Remote, Browser/Computer Use, Slack/external messaging, Skill/Plugin mutation or prerelease capabilities.

## Source-backed facts

### OpenAI Status incident resolved

Source: https://status.openai.com/incidents/01M1KWEDH417T2CF44YYHZDFCR

- `Elevated errors across ChatGPT and Codex` is now marked `Resolved / Degraded performance`.
- OpenAI says the issue causing elevated errors across ChatGPT and Codex has been resolved.
- The resolution notice explicitly says some Codex remote control users may need to pair their mobile device again following the incident.
- The page shows the Resolved update at 2026-09-03 16:55 UTC.

### OpenAI Codex PR #42579 — verified Guardian answers retained in thread context

Source: https://github.com/openai/codex/pull/42579

- Merged 2026-09-03 16:43:31 UTC, merge commit `1d74c3ba1ee98be2025ab066dcc3fd654fe8a3b6`.
- With `GuardianThreadContext` enabled, host-verified `request_user_input` question/answer pairs are retained in thread-owned Guardian authorization context.
- The change is designed to keep Guardian evidence aligned through compaction/resume and removes rolled-back evidence after rollback.
- Missing/oversized answer records make authorization context incomplete and defer cached fast approval rather than silently reusing incomplete evidence.
- Legacy threads without the feature keep the existing runtime-only answer path.
- The PR merged after official non-prerelease `0.153.0`; it is future-stable evidence, not a current Dex installed capability.

### OpenAI Codex issue #42580 — Slack dispatch can fail before runner start

Source: https://github.com/openai/codex/issues/42580

- Open issue labeled `bug` / `codex-web`.
- Reporter says Slack `@Codex` creates a task but produces no repository checkout, environment setup, runner logs or agent activity, while manually launching the same repository/environment in Codex Cloud web works.
- This confirms an official-repository workflow-surface failure signal; root cause/fix/general applicability are not confirmed.

### OpenAI Codex issue #42581 — login success can diverge from actual request authorization

Source: https://github.com/openai/codex/issues/42581

- Reported on Codex CLI `0.153.0` / ARM64 Linux.
- Device-code login completes and login/status says authenticated, yet a fresh process receives `401 token_revoked` for both `codex_apps` MCP and an ordinary Codex request.
- The issue is closed as `completed`; visible comments provide automated duplicate detection only, so this evidence does not establish a maintainer-confirmed root cause/fix.

### OpenAI Codex issue #42582 — Windows browser native-host stale-path signal

Source: https://github.com/openai/codex/issues/42582

- Open issue labeled `bug` / `windows-os` / `app` / `browser`.
- Reporter shows Chrome and Edge both unable to connect to the installed ChatGPT desktop app because the shared native messaging manifest points to a missing extension-host path under a different `CODEX_HOME` than the current plugin cache.
- Repair/reinstall/reinstall-extension attempts reportedly do not repair the path.
- The stale-path diagnosis is reporter evidence; maintainer-confirmed root cause/fix and approved-host applicability remain unknown.

### Release/model/cost screen

Source: https://github.com/openai/codex/releases/tag/rust-v0.153.0

- Latest official non-prerelease Codex remains `0.153.0`.
- No newer merged upstream PR was identified after #42579 at this cutoff.
- No new official model promotion or general Codex pricing/usage-limit change requiring Dex policy/routing changes was identified.

## Classification

### confirmed

- OpenAI officially resolved the ChatGPT/Codex incident and documented a Remote mobile re-pair caveat.
- PR #42579 is merged upstream and adds conservative persistence of verified Guardian answers in thread-owned authorization context.
- #42580/#42581/#42582 are official `openai/codex` issue signals with the states/evidence described above.
- Latest official non-prerelease Codex remains `0.153.0`.

### inference

- Status `Resolved` is necessary recovery evidence but not sufficient evidence that every Dex-relevant endpoint/account/surface is healthy; exact execution-surface health should be rechecked before resuming a blocked canonical Task.
- The Remote re-pair warning corroborates Dex's existing account/workspace/host/device lifecycle model. Re-pairing must not create a new Task, writer or duplicate mutation.
- PR #42579 is directionally safer for long-lived authorization because it keeps verified answers through compaction/resume while failing closed on incomplete records. Dex should not rely on it before a containing stable and approved-host regression.
- #42581 means UI/login status and actual usable authorization are distinct readiness stages.
- #42582 means Browser integration readiness is a chain (configured home → plugin cache → native manifest/host → App Server → handshake), not an installed boolean.
- #42580 means trigger acknowledgement and actual runner start are distinct workflow states.

### proposal

- Keep same-Task outage recovery: bounded endpoint health check, stale-attempt rejection, then one resume of the same canonical Task; no reinstall/reset/model switch/duplicate writer solely because Status changed to Resolved.
- Track PR #42579 in the existing Guardian future-stable gate, including verified-answer retention, rollback invalidation, oversized/missing-answer fail-closed behavior and stale cached-approval rejection.
- Require a harmless core Codex request and any required MCP handshake after login before host readiness can be PASS.
- Keep Remote re-pair under explicit lifecycle/identity checks and prove canonical Task/checkpoint continuity with mutation 0 before resuming execution.
- Keep Slack/external messaging disabled. Any future separately approved Slack integration must require dispatch receipt, runner-start evidence and canonical idempotency.
- Keep Browser/Computer Use disabled. Do not automatically repair manifests/registry/cache/`CODEX_HOME`; future approved Browser E2E should verify the current manifest target and host handshake without broader permissions.

### unknown / not checked

- Incident root cause and whether all user-specific endpoints recovered at the same moment.
- Which Remote users require re-pairing and whether prior pairing metadata is recoverable without re-enrollment.
- First official stable containing PR #42579 and approved-host Guardian E2E.
- #42580 generality/root cause/fix.
- #42581 root cause/fix despite issue closure and user-account applicability.
- #42582 maintainer-confirmed cause/fix and approved Windows-host applicability.

## Dex verification status

- Prior approved heads: Runtime `c5eb0659ad7be71772e544346d19d5c117008d9c` / Wiki `792fd9f02745e9175bf944e21340b8af880b09f1`: **PASS**.
- OpenAI incident Resolved + Remote re-pair caveat: **PASS**.
- PR #42579 merge evidence: **PASS**.
- #42580/#42581/#42582 issue evidence: **PASS — existence/state/report confirmed; causal fix not established**.
- Latest stable: **PASS — `0.153.0`**.
- First stable containing #42579: **Not Checked**.
- Approved-host incident recovery/Remote continuity E2E: **Not Checked**.
- Approved-host login→real-request/MCP auth canary: **Not Checked**.
- Browser native-host end-to-end readiness: **Not Checked / capability disabled**.
- Slack dispatch E2E: **Not Checked / external messaging disabled**.
- Runtime behavior/config/model/permission/billing changes from this watch: **PASS — none**.

## Safety boundary

No Remote re-pair/reset, auth-state deletion, repeated login loop, native-host/registry/manifest repair, `CODEX_HOME` reset, plugin-cache deletion, Slack/external messaging activation, Browser/Computer Use activation, prerelease/experimental feature, broader OAuth/MCP/filesystem/network permission, Skill/Plugin install/update/delete, paid API, automatic paid fallback, automatic credit/reset use, duplicate worker/fork, destructive migration or automatic deploy is authorized by this evidence.
