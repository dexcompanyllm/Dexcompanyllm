# Codex compaction / review / Browser watch — 2026-09-04

## Scope

This is the source-backed Wiki mirror for the provider-watch batch after Runtime PR #184 / Wiki PR #162. The earlier 06:00 catch-up already reconciled the 23:00–05:59 Asia/Seoul quiet window; this batch covers later developments through the 17:00 hour.

No Runtime executable, model routing, prerelease/experimental feature, Browser/Computer Use, plugin/Skill activation, stacked-PR workflow, permission, billing, API-key route, paid fallback, or multi-agent capability was enabled.

## Official OpenAI/Codex developments

### Issue #42695 — cross-thread task authority can be lost after compaction

Source: https://github.com/openai/codex/issues/42695

- `confirmed`: official OpenAI Codex issue opened 2026-09-04 16:34:12 Asia/Seoul. A Windows Codex Desktop reporter describes Task B arriving through `send_message_to_thread`, successfully performing bounded actions, then automatic mid-turn compaction causing the receiving agent to resume older completed Task A and produce a final report contradicting successful Task B execution evidence.
- Repository automation points to #42051 and #42611 as potential duplicates, but maintainer-confirmed root cause/fix is not established.
- `inference`: provider-local visible/reconstructed conversation order is not safe canonical authority after compaction.
- `proposal`: future #35 cross-thread/multi-worker acceptance must bind provider transport to the canonical Task/attempt, preserve durable mutation/result receipts, fail closed on provider-history vs canonical authority conflicts, and prove at-most-once execution across compaction.
- `unknown`: approved Dex-host reproduction and maintainer-confirmed fix.

### Issue #42698 — Cloud Auto review misses a native stacked-PR push

Source: https://github.com/openai/codex/issues/42698

- `confirmed`: Codex Cloud Auto review configured for every push reportedly did not trigger for a GitHub native stacked PR, while explicit `@codex review` on the same PR did trigger and complete.
- `inference`: background auto-review trigger delivery is not verification evidence.
- Dex does not adopt native stacked PRs or automatic Codex Cloud review as a completion dependency. Deterministic CI/security/verifier receipts remain authoritative.

### Issue #42694 — plugin fullscreen acknowledgement can precede usable rendering

Source: https://github.com/openai/codex/issues/42694

- `confirmed`: on Codex Desktop for macOS, a plugin fullscreen request can resolve successfully while the document remains hidden with zero fullscreen bounds; host resize/navigation reportedly restores it.
- `proposal`: any future plugin-surface E2E should verify actual visible/non-zero host bounds and task/result usability, not only a display-mode acknowledgement.
- Current plugin activation remains blocked/not checked.

### Issue #42699 — Browser Use `blob:` iframe readiness failure

Source: https://github.com/openai/codex/issues/42699

- `confirmed`: a macOS Codex Desktop reporter shows Browser Use navigation/reload leaving a browser-generated same-origin `blob:` iframe as empty `about:blank` despite the expected blob URL in `src`; WordPress Gutenberg is a concrete affected flow in the report.
- `inference`: top-level navigation success is insufficient Browser readiness evidence for iframe-heavy applications.
- Browser Use remains disabled. Any future activation requires approved-host iframe/editor DOM/render readiness E2E.

## Screened only

- #42693: experimental `context_management` compaction behavior; reinforces keeping experimental context management disabled.
- #42696: request for scheduled Browser pre-authorization; not an official approval-policy relaxation.
- #42691: request for GPT-5.6 Sol Pro selection; not availability evidence.
- #42692/#42697: presentation/companion UX requests without Dex gate impact.

## Stable / model / pricing state

- Latest official non-prerelease Codex remains `0.153.2`.
- No newer meaningful Codex PR was identified after the already-tracked PR #42682 in this cutoff; the fresh changes were reporter issues.
- No newly dated default-model promotion or general Codex pricing/usage-limit policy change requiring a Dex policy change was identified.
- Subscription-first remains unchanged: no API key, paid API, automatic paid fallback, extra paid usage, credit purchase, plan upgrade, or automatic banked-reset use.

Official release: https://github.com/openai/codex/releases/tag/rust-v0.153.2
Official changelog: https://developers.openai.com/codex/changelog
Official plan guidance: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Dex implementation and verification

Runtime provider-watch evidence was merged as PR #185:

- Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/185
- Runtime merge SHA: `c3e6acf76722feebca0bf9c5efe30b09e552c1a1`
- Change scope: one tracking/evidence file only; no executable/config/dependency/capability activation.
- Branch validation `33852970472`: `PASS` on attempt 1, including install, static checks, unit/smoke tests, rollback check, secret-pattern scan, and production dependency audit.
- Branch Vercel: `PASS`.
- Post-merge Runtime validation `33853299911`: `FAIL` after two allowed attempts. In both attempts, install and all static/unit/smoke/rollback checks passed, but the production dependency audit failed after a network timeout to the npm registry audit endpoint. No third same-method retry was performed.
- Merge-SHA Vercel: `PASS`.
- Because the merged change is documentation-only and the same branch tree had already passed the dependency audit before merge, this is recorded as an unresolved external-audit verification failure, not as proof of a Runtime functional regression. It is still `FAIL`, not PASS, until a future independent validation succeeds.

Runtime #35 received the future **canonical-authority-after-compaction** acceptance gate. #35 remains blocked behind #28; no multi-worker/cross-thread feature was activated.

## Canonical state / bounded drift

At Wiki branch start:

- Wiki approved `main`: PR #162 / `65c2a2168e70073c2a0aa19538b6192c699ad7e9`.
- Runtime approved `main` after this batch: PR #185 / `c3e6acf76722feebca0bf9c5efe30b09e552c1a1`.
- `AI_CONTRACT.md` v2.3 still makes GitHub Wiki `main` canonical and preserves One Task / One Accountable Lead, one writer per mutation scope, canonical Result/receipt before callback, provider-surface independence, fail-closed approval, and subscription-first cost control.
- Runtime #28 remains OPEN with approved Windows-host Phase 3 E2E `Not Checked`; #34/#35 remain blocked until #28 PASS.
- The previously known aggregate current-state pointer drift remains governed by Wiki #55 bounded-drift policy; this watch-only batch does not rewrite the aggregate state/handoff/source set.

## PASS / FAIL / Not Checked

- `PASS`: official #42694/#42695/#42698/#42699 signals verified; latest stable remains `0.153.2`; Runtime PR #185 branch validation; branch/merge Vercel; #35 tracking gate readback.
- `FAIL`: Runtime post-merge validation `33853299911` production dependency audit after two attempts, both due npm audit endpoint network timeout; all other validation steps passed both attempts.
- `Not Checked`: maintainer-confirmed upstream root causes/fixes; first stable containing future fixes; approved-host cross-thread compaction E2E; stacked-PR auto-review E2E; plugin fullscreen E2E; Browser iframe E2E; #28 approved Windows-host Phase 3; Wiki automated CI.

## Safety boundary

This batch does not authorize prerelease/alpha/beta/experimental activation, experimental context management, Browser/Computer Use, stacked PR adoption, automatic code-review dependency, plugin/Skill activation, broader filesystem/network/OAuth permissions, API keys, paid API, automatic paid fallback, extra paid usage, banked reset use, credit purchase, plan upgrade, provider DB/cache surgery, WindowsApps/package ACL changes, duplicate writers, external messaging, destructive migration, or legacy Skill/Plugin deletion.
