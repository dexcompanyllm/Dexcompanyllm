# Codex Guardian approval auth/sandbox boundary watch — 2026-09-03

## Official source

- https://github.com/openai/codex/issues/42442
- https://github.com/openai/codex/releases/tag/rust-v0.153.0

This is a final-cutoff addendum after Wiki PR #126 / Runtime PR #147.

## Classification

- `confirmed`: OpenAI issue #42442 is open with `bug`, `windows-os`, `auth`, `sandbox`, `app`, and `config` labels.
- `confirmed`: the reporter uses Windows Desktop with bundled CLI/App Server `0.153.0`, API-key auth, a custom provider, and customized workspace-write sandbox settings; the `Approve for me (guardian-approvals)` UI mode is unavailable while an auto-review path appears active.
- `unknown`: maintainer-confirmed root cause, whether the behavior is intentional, and applicability to subscription-authenticated/default-policy Dex hosts.
- `inference`: provider permission-menu visibility is not reliable authorization evidence when auth/config/model/feature-state gates can differ.
- `proposal applied`: keep Dex explicit approval broker and effective sandbox/approval verification authoritative; never compensate for a missing Guardian UI option by widening permissions or switching auth/provider.

## Dex policy fit

Dex canonical policy is subscription-first. `OPENAI_API_KEY`, custom paid API fallback, automatic extra usage and unapproved provider switching are disabled, so the reported API-key/custom-provider execution path is not an approved Dex route.

The useful future #28 checks are:

- record actual auth type plus effective sandbox/approval state independently from Desktop UI labels;
- Guardian UI presence/absence cannot replace one-time Dex approval or change canonical Task authority;
- missing Guardian mode cannot trigger Full access, elevated/`danger-full-access`, broader writable roots/network, API-key/custom-provider execution or paid fallback;
- runtime auto-review/Guardian evidence remains advisory, not approval/claim/merge/deploy authority;
- UI/effective configuration mismatch blocks or stays `unknown` until verified;
- reconnect/resume/model change cannot silently alter the approval/sandbox profile of an already claimed attempt;
- reproduce separately on the approved subscription-authenticated Windows host before claiming Dex applicability.

## Runtime response

Runtime PR #148:

- one docs-only file: `docs/CODEX_GUARDIAN_APPROVAL_AUTH_BOUNDARY_WATCH_20260903.md`
- validation `33715494312`: **PASS**
  - dependency install: PASS
  - static checks, unit tests, smoke: PASS
  - production dependency audit: PASS
- branch Vercel: PASS
- merge: `2da98ab328ed6a013f08508f79535c452e4de2b9`
- merge-SHA separate GitHub Actions: Not Checked at evidence-preparation time
- functional #28 status unchanged: Phase 3 implementation merged / approved Windows-host E2E Not Checked

## Safety boundary

No change enables Guardian auto-approval, changes sandbox or auth config, activates API-key/custom-provider execution, widens filesystem/network/OAuth/MCP permissions, installs/promotes Codex, enables prerelease/experimental features, uses paid API/fallback/credits/resets, deletes Skills/Plugins, sends external messages, adds multi-writer, auto-deploys or performs destructive migration.

## Verification

| Check | Result |
|---|---|
| #42442 official signal/labels reviewed | PASS |
| API-key/custom-provider route outside approved Dex policy | PASS |
| Runtime PR #148 validation | PASS — `33715494312` |
| Runtime PR #148 merge | PASS — `2da98ab328ed6a013f08508f79535c452e4de2b9` |
| Maintainer-confirmed root cause/intended behavior | Not Checked |
| Approved subscription-host Guardian/UI parity E2E | Not Checked |
| Runtime behavior/config/permission/cost activation | none |
