# Codex command-center + Windows/MCP/Work resilience watch — 2026-09-03

## Official sources

- https://github.com/openai/codex/pull/42428
- https://github.com/openai/codex/pull/42432
- https://github.com/openai/codex/issues/42426
- https://github.com/openai/codex/issues/42427
- https://github.com/openai/codex/issues/42429
- https://github.com/openai/codex/issues/42430
- https://github.com/openai/codex/issues/42433
- https://github.com/openai/codex/releases/tag/rust-v0.153.0

This evidence begins after the prior cutoff that recorded PR #42425 and Issue #42424.

## Raw candidate screening

| Candidate | Classification | Dex action |
|---|---|---|
| PR #42428 shared agent-command-center composer | confirmed / meaningful | future-stable #35 gate |
| PR #42432 boxed resume-picker future | confirmed / implementation-only | screened; no separate Gate |
| Issue #42426 Windows deny-read ACL sandbox failure | confirmed signal / root cause unknown | #28 negative E2E |
| Issue #42427 MCP OAuth DCR discovery failure | confirmed signal / fix unknown | #34 interoperability Gate |
| Issue #42429 Work source-inventory mismatch | confirmed signal / root cause unknown | #34 source-completeness Gate |
| Issue #42430 reconnect text may mask local IO/deadline pressure | confirmed signal / broad applicability unknown | #28/#35 diagnostic Gate |
| Issue #42433 inline non-blocking questions can lack notification/persistence | confirmed signal / fix unknown | #34 pending-decision Gate |

## confirmed — PR #42428 agent command-center composer

The agent command center now uses the shared chat composer for new-task entry. Upstream documents multiline editing, paste handling, Vim/configured keybindings, validation, draft/editor-state preservation across dashboard refresh/reconnect, whitespace-preserving dispatch, offline submission blocking, and restoration of unsent prompts after dispatch failure.

### inference

This is favorable to Dex Zero User Re-entry and long-running multi-agent operations because task drafts are less likely to be lost during provider-dashboard refreshes or reconnects.

### proposal — tracked only

Provider composer state remains UX/provenance, not Dex Task or approval authority. Before relying on a stable containing #42428:

- offline submit/queue must create zero canonical Task mutation;
- failed/ambiguous dispatch must resolve the existing idempotency key before a retry can create another Task;
- one accepted prompt payload must map to exactly one canonical Task ID;
- exact prompt/whitespace identity must survive canonical payload hashing;
- draft retention must not replay stale queued input or a previous Task intent;
- Vim/keymap/focus state must not influence permission, approval, mutation scope, provider routing or billing.

### unknown / Not Checked

- first non-prerelease stable containing #42428;
- approved-host and Work/Desktop/mobile-connected-host parity.

## screened — PR #42432

PR #42432 is a one-line TUI implementation change that boxes the asynchronous resume-picker future. No new user-visible task, persistence, authorization, Windows, MCP, model, pricing or workflow contract was identified. No Dex operational change is made.

## confirmed signal / unknown root cause — Issue #42426 Windows sandbox ACL failure

The official repository has an open Windows/app/sandbox bug report for Codex App `26.831.21537` on Windows 11 x64 where native sandbox startup fails with `helper_unknown_error: apply deny-read ACLs`. The reporter says `git status` fails and a disposable `apply_patch` probe can be created but cannot subsequently be read/deleted inside the sandbox.

### Dex consequence

Before #28 can PASS on the approved Windows host:

- bounded repository read plus create/read/delete canary must all work in the intended sandbox profile;
- `create succeeds / read-or-delete fails` is incoherent sandbox state and must block canonical mutation;
- ACL failure must not trigger automatic out-of-sandbox/elevated/full-access fallback;
- repeated retry must not leave stale ACLs, probes, duplicate workers/claims or unrelated mutation;
- expected sandbox identity and profile boundaries must be reverified before readiness.

No ACL or sandbox configuration is changed by this evidence update.

## confirmed signal / unknown fix — Issue #42427 MCP DCR discovery

An open bug/auth/MCP/CLI report on `0.152.1` says `codex mcp login ... --oauth-client-registration dcr` can ignore an absolute `resource_metadata` URL from `WWW-Authenticate`, probe the resource origin instead, and attempt registration at the wrong origin.

### Dex consequence

Hosted MCP writes and new OAuth write scopes remain disabled. Future #34 activation must verify:

- challenge-advertised protected-resource metadata is followed when valid;
- issuer/authorization-server/registration endpoint are validated as one chain;
- a delegated registration endpoint is not silently replaced by resource-origin `/register`;
- malformed/conflicting/unreachable metadata produces zero credential/scope mutation;
- discovery cannot broaden OAuth/filesystem/network scope or paid-provider access.

## confirmed signal / unknown root cause — Issue #42429 Work source completeness

A Pro Work report says a project Sources panel shows 34 uploaded files while the Work session exposes only 16 citation records and 16 mounted files, with only nine overlapping and 11 sources inaccessible through both paths.

### Dex consequence

This reinforces the existing architecture: Work project files are a convenience surface, not canonical Dex state. Approved GitHub `main`, durable Task references and explicitly ingested artifacts remain authoritative.

Before #34 can depend on Work project sources:

- expected source manifest/count must be reconciled with addressable citation and mounted-file inventories;
- inventory disagreement is `unknown`/incomplete, not a complete evidence corpus;
- already durable Dex/GitHub requirements or artifact references must not be requested again merely because Work materialization is incomplete;
- canonical GitHub/PWA references remain the recovery path;
- file ingest stays disabled until MIME/size/malware/retention/account-workspace binding and manifest parity pass.

## confirmed signal / broad applicability unknown — Issue #42430 reconnect diagnosis

An open CLI/connectivity report argues that generic `Reconnecting... waiting for network` text can also arise from local IO/stream-deadline pressure in a very large long-lived session with concurrent sessions. The report uses CLI `0.151.0` and a custom OpenAI-compatible provider, so its causal diagnosis is not established for Dex subscription execution or stable `0.153.0`.

### Dex consequence

The safe general rule is still useful:

- provider reconnect wording is diagnostic only and cannot authorize a replacement worker/attempt;
- ambiguous reconnect remains on the same Task ID with stale-attempt rejection;
- reachability, host/session health and bounded IO indicators should be separated where possible;
- rollout/log size is diagnostic only; no automatic delete/truncate/database migration is allowed;
- fresh-session handoff cannot re-run already durable mutation;
- paid API/fallback or unapproved provider switching remains forbidden.

## confirmed signal / unknown fix — Issue #42433 pending questions

An app report says non-blocking inline questions outside Plan mode can appear without configured desktop/pet notification and can disappear after task completion if unanswered.

### Dex consequence

A provider question that gates user decision cannot rely on native UI persistence:

- canonical Task must persist `blocked`/`awaiting-approval` before/independently of native notification;
- missed notification cannot erase the pending decision from PWA/status/result recovery;
- unanswered question is not consent and cannot become `completed` or broaden approval;
- provider notification delivery remains best-effort and must not cause worker replay;
- no external messaging capability is enabled by this Gate.

## Stable/model/cost state

- Latest official non-prerelease Codex remains `0.153.0` at this cutoff.
- PR #42428 is post-`0.153.0` evidence and is not installed or promoted here.
- No new official model promotion or general pricing/usage-policy change requiring Dex routing/cost-policy change was confirmed in this cutoff.
- Subscription-first remains canonical; paid API, automatic paid fallback, credit/reset consumption and unapproved provider switching remain disabled.

## Runtime application

Runtime PR #145 records the same gates in `docs/CODEX_COMMAND_CENTER_WINDOWS_MCP_WORK_RESILIENCE_WATCH_20260903.md`.

- branch head: `fbc3c3591f07a9b1629cfc0a80bf8447edb1638e`
- Runtime validation `33711803220`: PASS
- branch Vercel: PASS
- merge commit: `a895a5d99cf8590fec6e2e2ea12df76ed578f1b0`
- Runtime behavior/config/model/permission/billing/plugin/deploy change: none; docs-only

## Safety boundary

No Codex build promotion, experimental activation, Windows ACL/sandbox modification, out-of-sandbox fallback, MCP/OAuth write activation, Work file ingest, session-state deletion/migration, external messaging, extra writer, automatic merge/deploy, destructive migration, paid API/fallback or credit/reset use is enabled.

## Verification status

| Check | Result |
|---|---|
| PR #42428 merge/scope | PASS |
| PR #42428 unresolved review threads | PASS — 0 |
| PR #42432 implementation-only screening | PASS |
| Issue #42426 Windows/sandbox signal | PASS |
| Issue #42427 MCP/auth signal | PASS |
| Issue #42429 Work/codex-web signal | PASS |
| Issue #42430 CLI/connectivity signal | PASS — broad/current-stable causal applicability Not Checked |
| Issue #42433 app notification signal | PASS |
| Latest non-prerelease stable | PASS — 0.153.0 |
| Runtime PR #145 branch validation | PASS — 33711803220 |
| Runtime PR #145 branch Vercel | PASS |
| Runtime PR #145 merge | PASS — `a895a5d99cf8590fec6e2e2ea12df76ed578f1b0` |
| Maintainer fixes for reported issues | Not Checked |
| First stable containing #42428 | Not Checked |
| Approved Windows-host negative E2E | Not Checked |
| Work/MCP/mobile parity E2E | Not Checked |
| Wiki change | docs-only |
