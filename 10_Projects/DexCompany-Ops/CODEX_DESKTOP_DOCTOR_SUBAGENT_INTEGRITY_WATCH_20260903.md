# Codex Desktop / Doctor / subagent integrity watch — 2026-09-03

## Scope and cutoff

Previous approved heads at cutoff:

- Runtime `main`: `3c74ab0bdb4872bcc238462cdc570c2276f6a934` (PR #146)
- Wiki `main`: `75a55582fdd3b04324c15a2131825d133375f31a` (PR #125)
- newest already-screened upstream `openai/codex` main commit: PR #42432, `498d40b29f6028dec9ef80af672ba1258980b54a`, 2026-09-03T03:25:26Z

The first new official-repository issue after that Dex cutoff was #42435 at 2026-09-03T03:40:28Z.

Official sources:

- https://github.com/openai/codex/issues/42435
- https://github.com/openai/codex/issues/42436
- https://github.com/openai/codex/issues/42437
- https://github.com/openai/codex/issues/42438
- https://github.com/openai/codex/issues/42439
- https://github.com/openai/codex/issues/42440
- https://github.com/openai/codex/issues/42441
- https://github.com/openai/codex/releases/tag/rust-v0.153.0

Runtime implementation/tracking source: PR #147, merge `8a6242f194442e2beca058e6d009630dda4e70e1`, docs-only.

## Raw candidates

| Candidate | Classification | Dex decision |
|---|---|---|
| #42435 Windows app reasoning effort resets from Extra High to Instant | `confirmed` official-repo signal; root cause/current-Dex applicability `unknown` | #34 effective-model/reasoning provenance gate |
| #42436 Windows Desktop sidebar loses recent tasks after restart while local sessions remain | `confirmed` official-repo signal; root cause `unknown` | #34 canonical Task recovery gate |
| #42437 macOS in-app browser directory picker rejects after Select | `confirmed` signal; current Dex dependency absent | screened; no active change |
| #42438 `codex doctor` latest-version probe 403 leaves cached latest stale | `confirmed` official-repo signal; fix `unknown` | #28 stable-version/preflight gate |
| #42439 submitted Desktop text can appear in a different new thread composer | `confirmed` official-repo signal; intermittent/root cause `unknown` | #34 cross-thread intake isolation gate |
| #42440 per-thread model-visible Skill allowlist API | `proposal`; user feature request, not OpenAI commitment | monitor only; no dependency/activation |
| #42441 subagent `Last Turn` can omit earlier substantive edits after follow-up | `confirmed` official-repo signal; fix `unknown` | #35 cumulative delegated-task verification gate |
| merged upstream PR newer than prior cutoff | none confirmed | no provider-contract change |
| stable newer than 0.153.0 | none confirmed | no install/promotion change |
| new model/general pricing/usage policy | none confirmed | preserve current routing and subscription-first policy |

## #42435 — effective reasoning provenance

The Windows reporter uses Codex App `26.901.1978.0`, Business workspace, and says selecting Extra High immediately returns to Instant while chatgpt.com retains Extra High for the same account/workspace/conversation. The issue is open with `bug`, `windows-os`, `app` labels.

Dex interpretation:

- provider UI picker state is requested intent, not proof of effective model/reasoning;
- Task/attempt evidence must distinguish requested and effective values;
- protected mutation that depends on a stronger profile must block/mark unknown if the effective profile cannot be verified;
- no paid API, model upgrade, reset/credit or alternate-provider fallback may be triggered automatically.

Status: source signal `PASS`; maintainer root cause/fix and approved-host reproduction `Not Checked`.

## #42436 — Desktop sidebar/session projection

The Windows reporter uses Codex App `26.825.51511` and says a long multi-day thread loses recent sidebar tasks after restart even though local session transcripts remain. The issue is open with `bug`, `windows-os`, `app`, `session` labels.

Dex interpretation:

- native sidebar/history is a provider projection, not canonical Task state;
- missing sidebar entries must not cause duplicate Task creation, duplicate workers or requirement re-entry;
- GitHub Task Bus, canonical status/result and durable receipt remain recovery authority;
- no provider-session DB repair/delete/truncate/migration is authorized by this signal.

Status: source signal `PASS`; root cause/fix and current Dex reproduction `Not Checked`.

## #42437 — in-app browser directory picker

The macOS report describes `window.showDirectoryPicker()` rejecting after Select in the Codex in-app browser while Chrome works. The reporter also states that the newly published standalone native selection has not yet been manually confirmed and that host permission-handler behavior is a hypothesis.

Dex action: screened. Dex Console PWA and approved worker filesystem authorization do not currently depend on the Codex macOS in-app browser File System Access API.

Status: relevance screening `PASS`; no Runtime gate added.

## #42438 — Doctor latest-version freshness

The Windows/CLI report uses Codex `0.152.1` and shows `codex doctor` reporting update configuration as locally consistent while the latest-version probe fails HTTP 403 and the cached latest remains `0.152.0`. Labels: `bug`, `windows-os`, `CLI`, `connectivity`.

Dex interpretation:

- Doctor remains useful for diagnostics but its cached/latest field is not the stable-release authority;
- evidence must distinguish actual running version, official latest non-prerelease stable, Doctor cached latest, and Dex compatibility target;
- stable promotion requires the official `openai/codex` release plus actual running-version verification;
- update-probe failure stays WARN/unknown and must not trigger automatic updater, prerelease, privilege/proxy change, permission expansion or paid path.

Runtime #28 comment records the future approved-host gate.

Status: source signal `PASS`; approved-host Doctor behavior and maintainer fix `Not Checked`.

## #42439 — cross-thread composer isolation

The macOS Desktop report says an already-submitted message can intermittently appear as editable text in a newly created thread. Labels: `bug`, `app`, `session`.

Dex interpretation:

- native composer state is not durable Task intent;
- every submitted intake remains bound to Task ID/idempotency key/payload hash;
- prior submitted text appearing in another thread must resolve the existing Task/result before any new creation;
- native cross-thread state cannot carry approval, mutation scope, artifact authority or secret-bearing context.

Runtime #34 comment records the future surface-isolation gate.

Status: source signal `PASS`; deterministic reproduction/root cause/fix and Dex surface parity `Not Checked`.

## #42440 — Skill catalog proposal only

The issue proposes an experimental App Server per-thread model-visible Skill catalog with `native | allowList` semantics. It is a user feature request with a described local prototype, not a merged OpenAI capability or release commitment.

Dex action: no dependency and no visibility change. Canonical Dex capability/Skill routing remains authoritative. Revisit only after an official implementation is merged and reaches an approved stable boundary.

Status: classification `PASS`; implementation `Not Checked` because none is official/merged.

## #42441 — cumulative delegated-task verification

The Windows/App/subagent report says a subagent's substantive initial edits disappear from the App's `Last Turn` review after a later small cleanup follow-up, even though those edits remain in the working tree. Labels: `bug`, `code-review`, `windows-os`, `app`, `subagent`.

Dex interpretation:

- provider `Last Turn` is convenience review UI only;
- independent verification must use canonical base SHA → final commit/worktree diff for the entire delegated mutation scope;
- follow-up turns cannot shrink acceptance/security review below all persistent edits for the Task/attempt;
- changed-file manifest and diff hash remain durable Result/receipt evidence;
- mismatch between provider attribution and repository diff blocks completion until reconciled;
- unrelated pre-existing user changes are excluded using task/base-boundary evidence, not destructive reset or provider UI filters.

Runtime #35 comment records the future multi-agent verification gate.

Status: source signal `PASS`; maintainer fix and approved-host multi-agent E2E `Not Checked`.

## Runtime optimization actually applied

Runtime PR #147:

- file: `docs/CODEX_DESKTOP_DOCTOR_SUBAGENT_INTEGRITY_WATCH_20260903.md`
- scope: one docs-only file; no executable/config/model/permission/billing/Skill/Plugin/deploy change
- branch validation: `33715216628` — `PASS`
  - dependency install: `PASS`
  - static checks, unit tests and smoke: `PASS`
  - production dependency audit: `PASS`
- branch Vercel: `PASS`
- merge SHA: `8a6242f194442e2beca058e6d009630dda4e70e1`
- separate merge-SHA GitHub Actions: `Not Checked` — no run emitted at check time
- merge Vercel: `Not Checked` at the time this Wiki evidence was prepared

Runtime tracking updates:

- #28: Doctor release-freshness/version-authority gate
- #34: effective reasoning provenance, native sidebar recovery, cross-thread composer isolation
- #35: cumulative delegated-subagent diff verification

No #28/#34/#35 functional status was promoted. #28 remains Phase 3 implementation merged / approved Windows-host E2E `Not Checked`; #34/#35 remain blocked.

## Stable/model/cost boundary

- latest official non-prerelease Codex: `0.153.0`
- no newer merged `openai/codex` main commit after the prior screened PR #42432 was confirmed at this cutoff
- no new official model promotion or general pricing/usage-policy change requiring Dex routing/cost modification was confirmed
- subscription-first remains mandatory
- paid API, automatic paid fallback, credits/resets, automatic extra usage and unapproved provider switching remain disabled

## Safety boundary

No change in this watch enables:

- Codex install/update/promotion or prerelease/experimental capability;
- Desktop reasoning/model override;
- provider-session repair/delete/migration;
- broader filesystem/network/OAuth/MCP permission;
- Skill catalog override or legacy Skill/Plugin deletion;
- paid API/automatic paid fallback/credits/resets;
- external messaging;
- second active writer, automatic merge/deploy or destructive migration.

## Final verification matrix

| Check | Result |
|---|---|
| Official issue signals #42435/#42436/#42438/#42439/#42441 reviewed | PASS |
| #42437 current-Dex relevance screening | PASS |
| #42440 proposal-only classification | PASS |
| Latest official non-prerelease stable | PASS — `0.153.0` |
| New merged upstream main change after prior cutoff | PASS — none confirmed |
| Runtime PR #147 branch validation | PASS — `33715216628` |
| Runtime branch Vercel | PASS |
| Runtime PR #147 merge | PASS — `8a6242f194442e2beca058e6d009630dda4e70e1` |
| Runtime merge-SHA Actions | Not Checked — no run emitted at check time |
| Runtime merge Vercel | Not Checked at evidence-preparation time |
| Maintainer-confirmed root cause/fix for new bug signals | Not Checked |
| Approved Windows-host Doctor/reasoning/sidebar E2E | Not Checked |
| Desktop/Work/mobile cross-thread/session parity E2E | Not Checked |
| Multi-agent cumulative review E2E | Not Checked |
| Runtime behavior/config/permission/cost activation | none |
