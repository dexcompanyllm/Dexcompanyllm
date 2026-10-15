# Codex Windows browser / Sites watch — 2026-09-03 22:37 KST cutoff

- verificationStatus: source-backed / watch-only
- claimType: provider update evidence
- verifiedAt: 2026-09-03
- verifiedBy: Jenny / ChatGPT automation
- operationalActivation: none

## Canonical context

Dex authority remains the approved GitHub `main`, One Task ID / One Accountable Lead / capability-routed workers / one active writer per mutation scope / risk-based independent verification / One Canonical Result / Zero User Re-entry, with subscription-first cost control.

At this cutoff:

- Runtime #28 remains Phase 1 PASS / Phase 2 PASS / Phase 3 implementation merged / approved Windows-host E2E Not Checked. Its GitHub tracking state was found closed despite that canonical status and has been corrected to open; no acceptance result was promoted.
- Runtime Draft PR #157 remains open/draft review-only work with physical Windows FAIL and Not Checked evidence and is preserved unmodified.
- Runtime #34/#35 remain blocked behind #28.
- Sites remains tracked-disabled in Runtime #44 and is not a canonical deployment authority.
- `openai/codex` upstream `main` still has no merged commit after PR #42458.
- Latest official non-prerelease Codex remains `0.153.0`.

## New official Codex issue evidence

### #42520 — Windows Chrome integration can be partially installed while unusable

Source: https://github.com/openai/codex/issues/42520

Classification:

- confirmed: open issue with `bug`, `windows-os`, `app`, `app-server`, `browser`; Windows Desktop AppX `26.901.1978.0`; ChatGPT Plus; bundled CLI `0.153.0-alpha.5`.
- confirmed: reporter says Codex displays Chrome integration as `Installed`, but the ChatGPT Chrome side panel cannot connect because compatible App Server registration is missing/unusable.
- confirmed: reporter found current plugin cache `26.901.20858` while the `latest` NTFS junction targeted removed version `26.818.41705`; repairing the junction restored paths but did not recreate either expected `chrome-native-hosts-v2.json` registration.
- confirmed: the normal Native Messaging manifest existed, and reporter says shipped app code contains Windows schema-v2 App Server registration logic; UI/install state therefore did not prove an end-to-end usable bridge in the report.
- confirmed signal: reporter observed `codex doctor --json` reporting Desktop not running while Desktop-spawned App Server processes were present.
- correlated: OpenAI automation flagged older #41592 as a potential duplicate; #41592 contains similar Windows browser/App Server cache/registration reconciliation reports, but that does not prove identical root cause.
- unknown: maintainer-confirmed root cause/fix, standalone stable `0.153.0` applicability, affected population, and supported repair semantics.
- inference: browser/plugin readiness must require version-coherent cache/native-host/App Server registration plus an actual handshake; provider UI `Installed`, process presence, or Doctor output alone is insufficient.
- proposal: future approved Browser/Chrome capability E2E must fail closed on stale/missing/mismatched registration and must not auto-repair junctions, registry/manifests, caches, reinstall/downgrade, or broaden permissions. Browser/Computer Use stays disabled.

### #42521 — Windows official Sites initializer fails before scaffold creation

Source: https://github.com/openai/codex/issues/42521

Classification:

- confirmed: open issue with `bug`, `windows-os`, `app`; Windows Desktop `26.825.6671.0`; ChatGPT Pro; Sites plugin `0.1.46`; `@openai/create-sites@0.3.0`; Node `v24.19.0`; pnpm `11.19.0`.
- confirmed: reporter says `pnpm create @openai/sites@0.3.0 . --yes --add-ons shadcn --install` fails in an empty Windows directory with `ERR_MODULE_NOT_FOUND` for declared dependency `@clack/prompts` before project files are created.
- confirmed: package reportedly declares `@clack/prompts` `1.7.0`; pnpm creates a Windows junction whose target contains the package, but Node cannot traverse/resolve the linked path in the reported environment; identical retry reuses the failed cached arrangement.
- unknown: maintainer-confirmed root cause/fixed version, environment breadth, current approved-user availability and a successful Windows reproduction.
- current Dex impact: no operational activation because Sites is already tracked-disabled / evaluation backlog in Runtime #44.
- inference: Windows Sites initialization should remain unavailable to Dex until a maintainer-supported path succeeds from a disposable empty target without dependency injection or cache surgery.
- proposal: #44 should require exact supported initializer/plugin provenance, clean disposable target, expected scaffold/file-delta evidence, bounded no-progress handling, and saved-version/review-first behavior. Public deployment/DNS/secrets migration remains separate explicit approval.

### #42519 — screened

Source: https://github.com/openai/codex/issues/42519

The report is too sparse to establish a reproducible Codex compatibility, model, quota or networking issue, so it does not change Dex policy or Gates at this cutoff.

## Official stable / policy state

- Latest open-source Codex non-prerelease release remains `0.153.0`.
- No new upstream merged commit exists after PR #42458 at this cutoff.
- No new official model retirement/promotion or general Codex pricing/usage-limit change was found that requires Dex routing or cost-policy modification.
- Current OpenAI guidance still presents account-visible credit/reset/upgrade/wait options after usage limits; Dex does not auto-select any paid/reset option and remains subscription-first.

## Dex optimization decision

Applied low-risk changes only:

1. Correct Runtime #28 tracking state to open because canonical evidence and Draft PR #157 still require approved Windows-host Phase 3 E2E to remain Not Checked.
2. Track #42520 as a future optional browser/plugin readiness boundary without enabling Browser/Computer Use or any repair behavior.
3. Track #42521 under existing Runtime #44 Sites evaluation rather than creating a new canonical capability or enabling Sites.
4. Preserve Runtime #34/#35 block, Draft PR #157, unrelated changes, subscription-first cost control and all security/permission boundaries.
5. Keep aggregate current-state/QA/handoff files unchanged in this watch-only update under Wiki #55 bounded-drift policy; source evidence and tracking issues are sufficient until the next meaningful aggregate-state batch.

## Verification status

- latest upstream merged `main`: PASS — PR #42458 remains latest;
- latest official non-prerelease Codex: PASS — `0.153.0`;
- #42520 source/labels/reported version and failure chain: PASS;
- #42520 maintainer fix / standalone stable applicability / approved-host browser E2E: Not Checked;
- #42521 source/labels/reported version and failure chain: PASS;
- #42521 maintainer fix / approved Windows Sites E2E: Not Checked;
- Runtime #28 tracking-state correction: PASS — open; Phase 3 E2E remains Not Checked;
- Browser/Computer Use: intentionally disabled / Not Checked;
- Sites: tracked-disabled / Not Checked;
- operational capability, permission, paid-use or deployment activation: 0;
- FAIL introduced by this watch: none.

## Official sources

- OpenAI Codex issue #42520: https://github.com/openai/codex/issues/42520
- OpenAI Codex issue #42521: https://github.com/openai/codex/issues/42521
- Correlated older issue #41592: https://github.com/openai/codex/issues/41592
- OpenAI Codex releases: https://github.com/openai/codex/releases
- OpenAI Codex repository: https://github.com/openai/codex
