# Codex target-native approval, Remote lifecycle, and Skill validator watch — 2026-09-04

## Scope

Source-backed Dex Company evidence after Runtime PR #167 / Wiki PR #145. This watch records official OpenAI/Codex changes and issue signals without enabling Runtime executable/config/model/permission/billing/Skill/Plugin/Remote/Browser/Computer Use/deployment capabilities.

## Raw official signals

### OpenAI Status

- https://status.openai.com/incidents/01M1KWEDH417T2CF44YYHZDFCR
- `Elevated errors across ChatGPT and Codex` remains `Monitoring / Degraded performance`.
- A fresh Monitoring update at 2026-09-03 15:50 UTC says mitigation has been applied and recovery is being monitored.
- The incident is not marked Resolved at this cutoff.

### OpenAI Codex PR #42577 — target-native command approval paths

- https://github.com/openai/codex/pull/42577
- Merged 2026-09-03 16:23:30 UTC, commit `7a7c188682c3f3aae6c7efabf3acd1a9c7dfd3e6`.
- Passes the selected executor's `PathUri` through user command approval requests rather than converting cwd to a host-native path.
- Makes native-path permission helpers explicitly local and requires executor-aware permission transforms to receive `FileSystemSandboxPolicyContext`.
- Tests approved remote commands so approval requests report the selected remote working directory and execution resumes after approval.
- It merged after official stable `0.153.0`; Dex must not treat it as an active installed stable capability yet.

### Remote lifecycle/account/device signals

- #42574 — https://github.com/openai/codex/issues/42574 — iOS Remote report where previously paired desktop hosts disappear simultaneously and the client falls back to `Set up Remote`.
- #42575 — https://github.com/openai/codex/issues/42575 — Windows Desktop `26.901.20858` report where two ChatGPT Business accounts cannot create Remote Control enrollment while a Personal account works on the same PC/app/network despite workspace settings permitting Remote/local Codex.
- #42576 — https://github.com/openai/codex/issues/42576 — Windows/Android report where QR recognition succeeds but initial Remote device registration immediately fails after fresh QR/network retries.
- All remain open issue signals; exact root causes, scope and fixes are unknown.

### Skill/plugin validator mismatch signal

- #42570 — https://github.com/openai/codex/issues/42570
- Bundled `plugin-creator` validator reportedly rejects `policy.products` in `agents/openai.yaml` as unsupported.
- The same upstream repository's Skill model consumes `policy.products`, while bundled plugin-creator guidance documents `policy.products` as an optional product-gating override.
- This corroborates an internal validator/schema mismatch direction; it is not evidence that restrictive product metadata should be removed.

### Stable/model/cost screen

- Latest official non-prerelease Codex remains `0.153.0`: https://github.com/openai/codex/releases/tag/rust-v0.153.0
- No newer stable changelog entry, new official model promotion, or general Codex pricing/usage-limit policy change requiring a Dex routing/cost-policy change was identified at this cutoff.

## Classification

### confirmed

- The OpenAI incident remains Monitoring and unresolved at this cutoff.
- PR #42577 is merged after `0.153.0` and preserves selected-executor target-native path provenance in command approval requests.
- #42570/#42574/#42575/#42576 are new open official-repository issue signals after the prior cutoff.
- `policy.products` exists in upstream Skill/plugin model/guidance, corroborating #42570's mismatch report.
- Latest official non-prerelease stable remains `0.153.0`.

### inference

- Cross-platform/remote authorization evidence should preserve the selected executor's path convention. Controller-host path conversion can otherwise make the user's approved target ambiguous.
- Remote readiness is multi-dimensional: account/workspace enrollment, host/device registration, discovery, connectivity and session recovery must be checked separately. Provider UI absence is not proof that canonical Dex Task state disappeared.
- Removing a valid restrictive `policy.products` field solely to satisfy an inconsistent validator could broaden product availability, so fail-closed preservation is safer.

### proposal

- Keep #42577 future-stable only; after a containing stable exists, test native Windows, WSL/POSIX, UNC/remote approval paths and verify no permission broadening.
- Bind future Remote capability checks to account/workspace + host + mobile device + enrollment/discovery/session state. `workspace policy allowed` or `QR displayed` alone is not a PASS.
- On ambiguous Remote enrollment/discovery/pairing, keep the same canonical Task/checkpoint, create no duplicate Task/writer/result, make no provider-state repair mutation, and use PWA/GitHub Task Bus fallback where applicable.
- Preserve canonical Dex Skill metadata and restrictive product gates; do not weaken `policy.products` merely to satisfy a currently inconsistent provider validator. Require validator/schema parity plus positive/negative packaging tests before relying on provider-distributed artifacts.
- Preserve the PR #167 provider-incident recovery rule: aggregate Monitoring alone does not authorize mutation resumption; relevant endpoint health and same-Task recovery evidence are required.

### unknown / Not Checked

- Incident root cause/final resolution.
- First non-prerelease stable containing PR #42577.
- Approved Windows/WSL/remote target-native command-approval E2E.
- Root cause/fix and cross-account/device scope for #42574/#42575/#42576.
- Maintainer-confirmed #42570 fix and first containing stable.
- Chat/Work web/desktop/mobile Remote lifecycle parity on the approved Dex environment.

## Dex alignment

- GitHub approved `main` remains canonical.
- One Task ID / One Active Writer / One Canonical Result / Zero User Re-entry remains authoritative.
- Provider Remote state is capability/provenance evidence, not Task authority.
- Approval path provenance is executor-specific and cannot silently become host-path authorization evidence.
- Subscription-first remains mandatory; paid API, automatic paid fallback and automatic credit/reset use remain disabled.
- No prerelease/experimental feature, Remote Control, broader permission, provider DB repair, Skill/Plugin mutation, external messaging or destructive migration is activated.

## Verification

- Prior canonical heads: Runtime `fb57ccf0945f8e632bf72bc937df8747cc96349a` / Wiki `10f30894056129d1729c0c185789088458d3e7f5`: **PASS**.
- Fresh OpenAI Status Monitoring update and unresolved state: **PASS**.
- PR #42577 merge/timestamp/behavior: **PASS**.
- #42570 plus upstream `policy.products` corroboration: **PASS**.
- #42574/#42575/#42576 issue signals: **PASS — source existence/evidence; root cause/fix unknown**.
- Latest non-prerelease stable: **PASS — `0.153.0`**.
- Incident root cause/full resolution: **Not Checked**.
- First stable containing #42577: **Not Checked**.
- Target-native approval E2E: **Not Checked**.
- Remote lifecycle E2E: **Not Checked**.
- Skill validator/schema parity fix and packaging E2E: **Not Checked**.

## Safety decision

No Remote enrollment/pairing reset, provider SQLite repair/delete, registry mutation, reinstall/downgrade, `CODEX_HOME` reset, model auto-switch, broader OAuth/MCP/filesystem/network permission, Skill/Plugin install/update/delete, metadata-policy weakening, paid API/fallback, credit/reset action, duplicate worker/fork, external messaging, destructive migration or automatic deploy is authorized.