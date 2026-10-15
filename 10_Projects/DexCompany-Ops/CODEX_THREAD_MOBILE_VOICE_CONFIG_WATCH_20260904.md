# Codex Thread / Mobile / Voice / Config Watch — 2026-09-04

## Source and cutoff

Previous canonical provider-watch checkpoint: Runtime PR #182 / Wiki PR #160. The developments below appeared afterward, between 13:45 and 14:22 Asia/Seoul on 2026-09-04.

Quiet-window 23:00–05:59 backlog was already reconciled by the earlier 06:00 catch-up.

Official sources:

- https://github.com/openai/codex/pull/42671
- https://github.com/openai/codex/pull/42674
- https://github.com/openai/codex/pull/42676
- https://github.com/openai/codex/pull/42677
- https://github.com/openai/codex/issues/42672
- https://github.com/openai/codex/issues/42673
- https://github.com/openai/codex/issues/42675
- https://github.com/openai/codex/releases/tag/rust-v0.153.2
- https://learn.chatgpt.com/docs/changelog

## Confirmed upstream changes

### PR #42671 — safer replacement-thread startup

Merged upstream 2026-09-04 13:47:31 Asia/Seoul. Codex now preserves the current TUI thread/config/subscriptions/composer until replacement `thread/start` succeeds, while respecting effective server config and explicit model/reasoning launch overrides.

Dex interpretation: provider-thread replacement should be a two-phase transition. Failed replacement must not erase the canonical Task/checkpoint, require requirement re-entry, or create duplicate execution.

### PR #42674 — persistence for server-advertised experimental selections

Merged 13:57:11 Asia/Seoul. TUI can persist writable `/experimental` selections through `config/batchWrite`, including server-advertised keys unknown to the local client, and surfaces write/readback/override uncertainty.

Dex interpretation: feature advertisement or a writable UI is not authorization. Dex keeps experimental capabilities disabled unless explicitly approved. Any future approved test must distinguish requested, written, read-back, overridden, and effective values; timeout/ambiguity stays `Not Checked` without automatic retry.

### PR #42676 — bounded Voice WebRTC negotiation

Merged 14:08:50 Asia/Seoul. Voice host WebRTC negotiation now includes bounded signaling/candidates/buffers, unexpected-channel rejection, diagnostic redaction, and peer teardown on helper/parent shutdown.

Dex interpretation: positive future security/reliability evidence only. Voice remains disabled until an official stable contains the change and approved-host transport/permission/shutdown E2E passes.

### PR #42677 — narrower async user messaging

Merged 14:22:26 Asia/Seoul. OpenAI removed guidance that used `send_message_to_user_async` to request missing information, preferences, constraints, clarification, or approval. It remains focused on critical blockers, direction-changing findings, and status replies during ongoing work.

Dex interpretation: async updates are not an alternate approval channel. A Task needing new approval remains the same canonical Task in a blocked/approval-required state with its checkpoint preserved.

## Reporter signals

### Issue #42672 — durable remote thread readable while Desktop list/link fails

Reporter environment uses remote CLI/App Server `0.153.2` with ChatGPT Pro. A completed persisted thread can be read/renamed through app APIs and has rollout/state evidence, yet Desktop list/link discovery fails.

- confirmed: official-repository reporter signal on stable `0.153.2`.
- inference: provider list/link/projection state is not canonical Task authority.
- proposal: reconcile canonical Task ID, durable Result/receipt, provider correlation, and supported read API before retry. No duplicate Task or provider DB/cache surgery.
- unknown: maintainer-confirmed cause/fix and approved-host reproduction.

### Issue #42673 — Windows process-running/no-GUI with incomplete CUA staging

A Windows reporter observed `ChatGPT.exe` running without renderer/window and incomplete CUA runtime staging. Restoring the complete packaged runtime was followed by GUI recovery, but the reporter explicitly says the causal chain is unknown.

Dex interpretation: this corroborates #42669's process-vs-window readiness distinction. Do not automatically restore/delete vendor runtime staging or modify WindowsApps/package ACL/ownership.

### Issue #42675 — mobile safety recovery affordance mismatch

A reporter on iPhone connected to a Mac-hosted task repeatedly saw a safety-system block; a suggested `/approve` path did not expose the expected picker in that reported session. Build/model and general applicability are unverified.

Dex interpretation: do not prescribe a surface-specific recovery command unless the capability is verified on the current surface/account/session. Preserve the same Task/checkpoint and use a verified PWA/GitHub Task Bus fallback without bypass attempts or requirement re-entry.

## Stable / model / cost status

- Latest official non-prerelease Codex release remains `0.153.2`.
- Official changelog still lists `0.153.2` as the latest Codex CLI release.
- No newer default-model promotion was identified in this interval.
- No newly dated general pricing/usage-limit policy change requiring a Dex cost-policy change was identified.
- Subscription-first remains mandatory; paid API, automatic paid fallback, automatic extra paid usage, automatic banked reset use, credit purchase, and plan upgrade stay disabled.

## Dex implementation checkpoint

Runtime PR #183 merged as `09724cad9df9ada747e1902f9654636c6d161366`.

- changed scope: one documentation/tracking file; Runtime executable/config/model/permission/billing/capability activation changes: 0.
- branch validation `33841220473`: PASS on attempt 1 — install, static checks, unit/smoke, production dependency audit all PASS.
- branch Vercel: PASS.
- post-merge validation `33841267083`: PASS on attempt 1 — all validation steps including production dependency audit PASS.
- merge Vercel: PASS.
- Runtime #30 supplemented for experimental config, Voice, and Windows Desktop readiness.
- Runtime #34 supplemented for replacement-thread continuity, provider projection recovery, and mobile safety-surface recovery.
- #35 orchestration implications are recorded in the Runtime evidence note; a separate issue-comment write was not required for the behavior to remain tracked.

Operational Gate is unchanged:

- #28 remains OPEN; approved Windows-host Phase 3 E2E remains `Not Checked`.
- #34/#35 remain blocked until #28 PASS.
- known eight-file aggregate pointer drift remains tracked in Wiki #55 and is not rewritten by this watch-only batch.

## PASS / FAIL / Not Checked

- PASS: official PR merge status/scope and issue evidence bounded.
- PASS: latest stable/changelog check.
- PASS: Runtime PR #183 branch validation, post-merge validation, branch/merge Vercel.
- PASS: no experimental/Voice/paid/permission/vendor-runtime activation.
- FAIL: none.
- Not Checked: Wiki automated CI, first stable containing PR #42671/#42674/#42676/#42677, maintainer-confirmed fixes for #42672/#42673/#42675, approved-host E2E.
