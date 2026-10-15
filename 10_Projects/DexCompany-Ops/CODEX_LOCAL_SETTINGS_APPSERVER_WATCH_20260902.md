# Codex Local Settings / App Server Separation Watch — 2026-09-02

- Status: Canonical provider-watch evidence
- Upstream: OpenAI Codex PR #42202
- Upstream merge: `9d57be71ba33bbb2e2dfbed244287f04e01c259f` / 2026-09-02T04:22:57Z
- Latest official non-prerelease Codex at cutoff: `0.152.1`
- Dex operational gate change: none

## Official sources

- OpenAI Codex PR #42202 — Separate TUI preferences from server configuration: https://github.com/openai/codex/pull/42202
- Official Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Official ChatGPT & Codex changelog: https://learn.chatgpt.com/docs/changelog

## Candidate filter

- PR #42199 — shared TUI input-routing refactor: reviewed as behavior-preserving with regression coverage; no separate Dex operational response required.
- PR #42202 — meaningful because it changes ownership/lifecycle boundaries between local client preferences and app-server/thread/account configuration.
- Fresh merged-PR search after #42202 returned no newer merged PR at the cutoff.

## confirmed

OpenAI merged PR #42202 on 2026-09-02T04:22:57Z. The change introduces `LocalSettings` as the TUI-owned source for local UI, history, notice and persistence preferences so that the resolved server/thread `Config` does not replace those local preferences during session lifecycle transitions.

The upstream change and tests show that:

- local preferences are preserved across resume, fork, reconnect, widget replacement and thread switching paths covered by tests;
- preference changes persist to the selected user config file, while switching configuration roots reloads the applicable local settings from disk;
- authentication-dependent onboarding/status UI uses the active app server account response instead of stale local model-provider configuration;
- remote app-server platform family and OS metadata are retained for the client;
- tests cover defaults/overrides, persistence destination, config-root reload, lifecycle preservation, remote platform metadata and server-controlled auth UI.

No unresolved PR review threads were returned at this cutoff.

## inference

Separating TUI-local settings from server-controlled thread/account state should reduce preference clobbering and user rework when Dex later resumes or switches sessions across local and remote App Servers. Using the active app-server account response for auth-dependent UI also reduces stale local-auth presentation risk.

Remote platform/OS metadata can improve capability routing and Windows/Linux/macOS compatibility checks, but it is descriptive provider evidence rather than authorization or worker trust.

## proposal

Keep Runtime #34 blocked behind #28 approved Windows-host E2E. After a containing official stable, verify local-preference preservation, account-state correctness, root isolation and remote platform metadata on the approved host before any Dex workflow depends on the behavior.

Provider thread/account/platform values remain provenance/capability inputs only. Dex Task ID, `attemptId`, explicit approval, OAuth scope, project identity/digest, approved-host registry, mutation lock and canonical GitHub Result/receipt remain authoritative.

## unknown

- first official non-prerelease stable containing #42202;
- final stable behavior across Codex desktop/TUI, App Server, Work and mobile surfaces;
- approved Windows-host behavior across reconnect and local↔remote App Server switching;
- final multi-profile/config-root/account persistence semantics;
- stable cross-surface exposure and trust semantics of remote platform/OS metadata.

## Dex optimization applied

Runtime PR #104 added a single documentation-only future-stable gate and was merged after validation and deployment checks passed.

- Runtime PR #104: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/104
- Runtime branch validation `33591915678`: PASS — dependency install, static checks, unit tests, smoke test and production dependency audit passed.
- Runtime branch Vercel: PASS.
- Runtime merge: `57e6241d4527392b6502b73871a52f9886a7eb1c`.
- Runtime merge Vercel: PASS.
- Runtime Issue #34 was extended with #42202 stable/approved-host/Work parity acceptance gates.

No TUI preference was changed, no automatic config migration was enabled, and no prerelease/experimental capability, broader permission, plugin/Skill mutation, paid path, external messaging or destructive migration was enabled.

## Acceptance gates

- [ ] official non-prerelease stable containing #42202 identified;
- [ ] approved Windows host preserves local UI/history/notice/persistence settings through resume/fork/reconnect/thread switch/app-server replacement unless explicitly changed by the user;
- [ ] selected config-root changes reload only that local root and do not bleed preferences across account/workspace/profile boundaries;
- [ ] local preference writes remain within the intended local config destination and do not mutate Dex canonical repositories/projects/remote server config;
- [ ] auth-dependent UI follows the active app-server account response and fails closed on missing/ambiguous state rather than trusting stale local provider config;
- [ ] provider account/session/platform metadata remains provenance/capability evidence only and cannot replace Task/attempt/approval/OAuth/mutation-lock/host-trust authority;
- [ ] stale/spoofed/mismatched platform metadata cannot bypass approved-host registry, executor-context security, Windows permission normalization or sandbox policy;
- [ ] reconnect/retry/thread switching creates no duplicate Task, worker execution or side effect;
- [ ] Work web/desktop/mobile and connected Windows-host fallback/parity is recorded PASS/FAIL/Not Checked before #34 depends on this behavior.

## Verification state

- Official #42202 metadata/merged state: **PASS**
- #42202 changed-file and test-scope review: **PASS**
- #42202 review-thread scan: **PASS — none returned at cutoff**
- #42199 candidate triage: **PASS — no separate Dex operational change**
- Fresh merged-PR search after #42202: **PASS — no newer merged PR returned at cutoff**
- Latest official non-prerelease stable: **PASS — 0.152.1**
- Runtime PR #104 single-file scope/security review: **PASS**
- Runtime branch validation `33591915678`: **PASS**
- Runtime branch/merge Vercel: **PASS**
- Runtime merge-SHA separate GitHub Actions: **Not Checked — no separate run emitted at cutoff**
- FAIL: **none**
- #42202 containing stable: **Not Checked**
- approved Windows-host / remote App Server E2E: **Not Checked**
- Work/web/desktop/mobile parity: **Not Checked**

## Canonical state

The operational sequence is unchanged: Runtime #28 approved Windows-host Phase 3 E2E remains the active blocking gate; #34 Work/mobile integration and #35 worker expansion remain blocked behind it. Aggregate head-pointer reconciliation remains tracked separately rather than rewriting large current-state documents on every provider-watch merge.
