# Codex rate-limit warning, executor permission and Guardian watch — 2026-09-02

## Summary

This evidence records meaningful OpenAI Codex changes after the prior Dex cutoff at PR #42140 and corrects the watch after official stable `0.152.1` was published.

Dex comparison baseline before this correction:

- Wiki approved `main`: `978a0c965e24d5a128c5eee9304c50b823e4c614` — Wiki PR #74
- Runtime approved `main`: `dac9cc32383718ddb54cc47638f192f39c970b30` — Runtime PR #89
- Operational gate: Runtime #28 Phase 3 approved Windows-host broker↔worker E2E
- #34 Work/mobile and #35 capability-routed workers remain blocked until #28 passes

Applied low-risk Runtime optimization:

- Runtime PR #87 merged the initial documentation/tracking watch: `692df074d5c3a837503cbf6340b2003342e7f1a3`
- Runtime PR #89 corrected the evidence for stable `0.152.1`: `dac9cc32383718ddb54cc47638f192f39c970b30`
- PR #89 branch validation `33567592792`: PASS — dependency install, static/unit/smoke and production dependency audit all passed
- PR #89 branch Vercel: PASS
- Runtime Issue #37 updated for `0.152.1` non-inclusion of #42142
- Runtime Issue #25 updated with the `0.152.1` validation gate
- Runtime Issues #30/#25 retain future #42146/#42147/#42144 security gates
- Runtime code/config/permission/version/cost/plugin state change: 0

## Official stable `0.152.1`

Official release: https://github.com/openai/codex/releases/tag/rust-v0.152.1

- Published `2026-09-01T22:33:02Z`; non-prerelease.
- Annotated tag `rust-v0.152.1` points to release commit `5adb68a49933ae446bf11935662c83dba55a0804`.
- Official release note: Guardian approval review now honors Node REPL policies supplied through model metadata.
- Official `0.152.0...0.152.1` compare identifies the release-branch cherry-pick of PR #41919 (`Source Guardian REPL policy from model metadata`).
- The same compare does **not** contain PR #42142/#42144/#42146/#42147.
- Release assets include CLI, App Server, SDK npm package, config schema, Windows x86_64/arm64 binaries, Windows sandbox setup and code-mode-host artifacts.

Dex classification:

- `confirmed`: `0.152.1` is the latest official stable at this cutoff and fixes Guardian policy sourcing for Node/CUA REPL reviews.
- `confirmed`: #42142/#42144/#42146/#42147 are **not** included in `0.152.1`; they remain future-stable watches.
- `inference`: the stable fix can improve Guardian policy correctness when an approved REPL capability is used, but it has limited immediate Dex operational effect while those optional capabilities remain disabled.
- `proposal`: treat `0.152.1` as a validation candidate only; do not auto-install/promote. Validate exact version, config/schema, App Server and bounded Windows worker smoke on the approved host first.
- `proposal`: do not enable Node REPL/CUA solely to test this fix. If the capability is not separately approved, keep runtime policy behavior Not Checked.
- `unknown`: approved-host `0.152.1` compatibility and cross-surface behavior.

## Official OpenAI/Codex upstream evidence after the `0.152.1` release branch

### PR #42142 — Add early rate-limit warnings for Plus and Team plans

Official: https://github.com/openai/codex/pull/42142

- Merged `2026-09-01T21:45:00Z`, commit `a876a9e49415beee2c7283b6f715cee6e81d4181`.
- Adds a 50% warning threshold for Plus/Team only when the relevant rate-limit window is approximately five hours.
- Preserves the existing 75%, 90% and 95% warning thresholds and rolling-update deduplication.
- This changes warning logic, not the underlying quota or pricing contract.
- Stable inclusion in `0.152.1`: **No**.

Dex classification:

- `confirmed`: an earlier warning signal exists upstream, but it is not in `0.152.1`.
- `inference`: earlier warning can support safer checkpointing and reduce work interrupted by a short-window limit.
- `proposal`: after a containing stable, validate the warning as read-only advisory telemetry; never trigger automatic credit purchase, banked reset, plan upgrade, extra usage, model change or paid API fallback.
- `unknown`: first containing stable and parity across eligible account/workspace surfaces.

### PR #42144 — Add Guardian V2 analytics events

Official: https://github.com/openai/codex/pull/42144

- Merged `2026-09-01T22:04:30Z`, commit `86b7d127428573c8088ef7ed478e59f7bb28a9db`.
- Emits Guardian V2 classification events with outcome, risk level, duration, model and thread attribution.
- Emits fast-decision events and `guardian_v2_enabled` turn analytics.
- Stable inclusion in `0.152.1`: **No**.

Dex classification:

- `confirmed`: new Guardian V2 observability exists upstream.
- `inference`: it may reduce diagnosis/rework cost when Guardian behavior differs across turns or review paths.
- `proposal`: keep provider analytics diagnostic-only; never use them as Task, approval, completion, billing, quota, writer-selection or authorization authority. Validate bounded/redacted fields before any Dex observability dependency.
- `unknown`: first containing stable and final telemetry retention/export contract.

### PR #42146 — Resolve permission requests in the executor context

Official: https://github.com/openai/codex/pull/42146

- Merged `2026-09-01T22:09:57Z`, commit `cd8bd62c6e289b96d5f8eb0443c6d8561c2e8c54`.
- Resolves relative and home-relative `request_permissions` paths using the selected executor cwd/path convention, home, workspace roots and temporary directories.
- Rejects mismatched conventions and lossy paths.
- Moves grant intersection into the originating executor sandbox context and preserves deny entries conservatively.
- Keeps the originating environment with pending permission requests so delayed responses remain bound to that environment.
- Upstream tests cover POSIX, Windows, UNC, relative/home-relative paths, invalid contexts and workspace-scoped app-server grants.
- Stable inclusion in `0.152.1`: **No**.

Dex classification:

- `confirmed`: this materially strengthens cross-host/Windows permission correctness and least-privilege grant intersection once a containing stable exists.
- `inference`: it can reduce both false permission failures and unsafe host/executor path interpretation during #28 Phase 3.
- `proposal`: future stable/approved-host E2E must cover relative, `~`, drive-letter, UNC, convention mismatch, lossy/opaque paths, delayed grants and deny preservation. The fix must never be used to broaden Dex filesystem permission.
- `unknown`: first containing stable and actual approved-Windows-host behavior.

### PR #42147 — Skip Guardian reviews in Full Access

Official: https://github.com/openai/codex/pull/42147

- Merged `2026-09-01T22:19:14Z`, commit `e5769939113536eb72752660bf7d1903f799d198`.
- Provider Full Access is `approvalPolicy: never` plus unrestricted permissions.
- In that state, confirmation-only Guardian/MCP model review is skipped.
- Pending, failed or restricted selected environments are not considered Full Access; cancellation, explicit denials and forms requiring user input retain their behavior.
- Stable inclusion in `0.152.1`: **No**.

Dex classification:

- `confirmed`: absence of Guardian/MCP review can be expected in provider Full Access, so review absence cannot be interpreted as Dex safety evidence.
- `inference`: the upstream optimization is useful for users who deliberately choose Full Access, but it increases the importance of Dex keeping unattended/Production flows outside that mode.
- `proposal`: continue rejecting/disabling `danger-full-access`; regress this boundary after a containing stable. Any unexpected Full Access observation must fail closed for unattended Dex execution.
- `unknown`: first containing stable and cross-surface parity.

## Pricing / usage conclusion

- No new underlying pricing or usage-limit change was confirmed in this cutoff.
- PR #42142 is an earlier warning threshold, not a quota change, and is not included in `0.152.1`.
- Dex subscription-first policy remains unchanged: no paid API, automatic paid fallback, extra paid usage, automatic credit purchase, automatic banked reset or plan change.
- Cost-sensitive action still requires current official policy plus current account/workspace Usage evidence.

## Dex safety and workflow impact

The operational sequence remains unchanged:

1. Runtime #28 Phase 3 approved Windows-host broker↔DexWorker E2E
2. #28 PASS
3. #34 Work/mobile submit/status/result gate
4. #35 capability-routed readers/verifier gate

Stable `0.152.1` is a validation candidate, not an automatic worker promotion. #42146 permission behavior is reserved for a future containing stable and Phase 3 regression coverage; #42142/#42144/#42147 also remain provider watch gates.

GitHub Task ID, `attemptId`, explicit approval where required, mutation lock, durable Result/receipt, project identity and detached verification remain canonical. Provider warnings, analytics, session state and skipped Guardian review remain advisory/provider-local evidence only.

## Safety boundary preserved

- prerelease/experimental Production activation: 0
- Codex auto-install/promotion: 0
- Node REPL/CUA enablement for testing: 0
- broader filesystem/OAuth/MCP permission: 0
- Full Access / `danger-full-access`: 0
- paid API / automatic paid fallback / extra paid usage: 0
- automatic credit/reset/plan change: 0
- plugin/Skill install/update/reconcile/delete: 0
- hosted MCP write activation: 0
- external messaging/destructive migration: 0

## Verification

### PASS

- Official OpenAI `0.152.1` release/tag/compare verified
- PR #41919 stable bug-fix source identified
- #42142/#42144/#42146/#42147 non-inclusion in `0.152.1` verified
- Official OpenAI PR #42142/#42144/#42146/#42147 metadata/content verified
- Dex approved-main baseline checked before mutation
- Runtime PR #87 initial one-file documentation scope and validation
- Runtime PR #89 one-file correction scope reviewed
- Runtime PR #89 branch validation `33567592792`
- Runtime PR #89 branch Vercel status
- Runtime tracking Issues #37/#30/#25 updated
- unrelated Wiki PR #73 current-state synchronization and PR #74 evidence history preserved

### FAIL

- none

### Not Checked

- approved Windows-host `0.152.1` validation/promotion gate
- first official stable containing #42142/#42144/#42146/#42147
- approved Windows-host future #42146 permission regression E2E
- stable `danger-full-access` rejection / unexpected Full Access fail-closed regression after a containing stable
- Guardian V2 analytics data-retention/export contract
- Chat/Work desktop/mobile parity
- Runtime PR #89 merge-SHA separate Actions/Vercel status if none is emitted for the merge commit

## Sources

- OpenAI Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- OpenAI Codex PR #41919: https://github.com/openai/codex/pull/41919
- OpenAI Codex PR #42142: https://github.com/openai/codex/pull/42142
- OpenAI Codex PR #42144: https://github.com/openai/codex/pull/42144
- OpenAI Codex PR #42146: https://github.com/openai/codex/pull/42146
- OpenAI Codex PR #42147: https://github.com/openai/codex/pull/42147
- OpenAI Codex pricing/usage: https://learn.chatgpt.com/docs/pricing
- Runtime PR #87: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/87
- Runtime PR #89: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/89
- Runtime Issue #37: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/37
- Runtime Issue #30: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/30
- Runtime Issue #25: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/25
