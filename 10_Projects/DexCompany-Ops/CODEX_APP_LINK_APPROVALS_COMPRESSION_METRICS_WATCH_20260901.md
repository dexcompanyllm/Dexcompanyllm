# Codex app-account approval + selector + compression metrics watch — 2026-09-01

## Scope

이 문서는 직전 provider watch 이후 OpenAI Codex upstream에 merge된 PR #42047, #42054, #42043을 Dex Company 관점에서 검증·분류한 canonical evidence다. 실행 capability를 활성화하는 문서가 아니다.

- Wiki source baseline at watch start: `main` `1c42723b81bb445c22360776450ebf44d4fe3df4` (PR #59, #28 Phase 2 canonical sync)
- Runtime functional baseline at watch start: `main` `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c` (PR #67, #28 Phase 2 retrieval)
- Runtime initial watch merge: PR #68 `988b1b3f5c5aec35f67d493971790eff0ce82f53`
- Runtime follow-up/correction merge for #42054: PR #69 `7ce373dceb212499f8eed9ac16d14a096bd04250`
- Runtime PR #69 branch validation: GitHub Actions run `33514758115` PASS
- Runtime PR #69 post-merge validation: GitHub Actions run `33514844260` PASS
- Runtime PR #69 merge Vercel status: PASS
- Runtime behavior/config/permission activation: unchanged

## Official upstream findings

### confirmed — OpenAI Codex PR #42047: per-account approval configuration surface for apps

Official source: https://github.com/openai/codex/pull/42047
Merge commit: `0ec375eb7077a417a6a544615bded3544e4799bc`
Merged: 2026-09-01 13:10:18 UTC

Confirmed from the official PR, config types, generated App Server schemas and README:

- New configuration surface: `apps.<app_id>.links.<link_id>`.
- A connected-account link config can carry `approvals_reviewer` and `default_tools_approval_mode` values.
- Link settings are exposed through App Server config protocol/generated JSON and TypeScript schemas.
- `config/read` distinguishes absent (`null`), explicitly empty (`{}`), and populated link maps.

Important implementation boundary:

- #42047 establishes the configuration/schema surface.
- At the #42047 merge commit, core `mcp_approvals_reviewer_from_layers` still resolves reviewer settings by app/connector ID and does not itself consume `link_id`.
- Therefore this watch does **not** claim that every Apps tool-call approval path already enforces link-level settings. Effective link-level precedence/enforcement remains Not Checked until later upstream wiring or stable/approved-host E2E proves it.

### confirmed — OpenAI Codex PR #42054: explicit Apps account selectors fail closed

Official source: https://github.com/openai/codex/pull/42054
Merge commit: `0e37d834d4f2fefea63da419bbc52055af33e888`
Merged: 2026-09-01 13:30:37 UTC

- When Apps tool metadata advertises `_codex_apps.requires_explicit_link_id = true`, Codex resolves `link_id` from the actual tool-call arguments.
- Missing, empty, or non-string required selectors are rejected before approval or execution.
- Catalog-provided account metadata remains the legacy fallback when explicit selection is not required.
- Non-Apps MCP tools are unchanged.
- Upstream added unit coverage for malformed/legacy selector cases and E2E coverage for execution, approval prompts and missing-selector rejection.

Security relevance:

- This is fail-closed account selection: a required selector cannot be silently omitted and fall through to approval/execution against an implicit account.
- It improves account provenance in approval metadata for explicitly selectable Apps tools.
- It still does not prove that #42047 link-level reviewer/mode overrides are fully enforced across every approval-policy path; that remains a separate Gate.

### confirmed — OpenAI Codex PR #42043: compression-state dimension on Codex-home metrics

Official source: https://github.com/openai/codex/pull/42043
Merge commit: `90ae0c4ef944bb80a3c725d15910289dfbb7db51`
Merged: 2026-09-01 12:43:24 UTC

- `codex.app_server.codex_home.size_bytes` now includes `compression_enabled`.
- The upstream implementation explicitly states that the tag reflects effective startup configuration, **not compression completion**.
- This is observability metadata only; it is not evidence that rollout compression completed, recovery is valid, or Dex should enable `LocalThreadStoreCompression`.

### confirmed — stable/model/pricing boundary

- Latest official non-prerelease Codex CLI remains `0.152.0`, released 2026-09-01.
- #42043/#42047/#42054 were merged after the 0.152 release and remain upstream-main watch evidence rather than approved stable Dex dependencies.
- No additional stable Codex release, new Codex model migration, or meaningful new pricing/usage-limit policy was identified in this interval.
- Existing subscription-first policy remains unchanged: paid API, automatic paid fallback and automatic extra usage stay disabled.

## Dex classification

### confirmed

- #42047 introduces a per-connected-account app approval configuration/schema surface.
- #42054 introduces fail-closed required account selection for Apps tool calls before approval/execution.
- #42043 introduces a configuration-state tag for Codex-home size telemetry.
- Operational workflow remains #28 Phase 1 PASS + Phase 2 PASS, with Phase 3 approved-host broker↔DexWorker Unified Task E2E active next.
- Runtime PR #68 and #69 are documentation/watch-only changes and both passed validation; no Runtime behavior/config was activated.

### inference

- The #42047 + #42054 sequence shows OpenAI moving toward stronger per-connected-account policy/provenance for Apps.
- When the same app has work/personal accounts, explicit account selection plus eventual per-link policy could reduce accidental cross-account writes and avoid blunt app-wide policy.
- It also increases policy complexity: stale links, incorrect inheritance, account churn, or unverified link-to-account mapping could create approval drift if Dex adopts it prematurely.
- Compression-state telemetry can reduce guesswork when measuring future storage/recovery ROI, but it cannot establish recovery correctness.

### proposal applied

- Runtime #34 tracks #42047 and #42054 together as a future-stable/approved-host Work/plugin account-approval and selector Gate.
- Required `link_id` malformed/missing must cause zero mutation and rejection before approval/execution.
- Dex will not auto-write `apps.*.links.*`, auto-select `approve`, or use link IDs as authorization authority until stable runtime enforcement, precedence, account-binding and revocation behavior pass E2E.
- Existing OAuth scopes and confirmation boundaries remain authoritative; link-level settings cannot expand `dex:task:submit` into control/merge/deploy/delete privileges.
- Runtime #28 tracks #42043 only as a future compression-observability aid alongside the existing #42039 recovery Gate.
- `local_thread_store_compression` remains disabled and profile-local `CODEX_HOME` isolation remains required.

### unknown

- Which future stable first includes #42043/#42047/#42054.
- The final stable contract for link identity lifecycle, policy precedence, account/workspace binding and disconnect/reconnect/revocation/refresh behavior.
- The exact upstream wiring that makes #42047 link-level reviewer/mode values effective across all Apps approval paths, if not completed elsewhere after #42054.
- Whether either capability provides enough measured Dex ROI to adopt after stabilization.

## Future acceptance gates

### #42047 + #42054 / Runtime #34

1. Confirm stable inclusion and generated App Server schema.
2. Verify required explicit selectors come from actual tool-call arguments; missing, empty, non-string or malformed `link_id` must fail closed before approval/execution with zero mutation.
3. Verify legacy Apps fallback only when explicit selection is not required; non-Apps MCP behavior must remain unchanged.
4. Prove exact workspace/app/link/tool policy precedence and that link overrides cannot bypass stricter deny/managed requirements.
5. Bind `link_id` to authenticated account/workspace identity; stale, unknown, swapped, replayed or cross-workspace selectors must fail closed.
6. Verify disconnect/reconnect/account rotation clears or refreshes stale permissive state.
7. Verify `user`/`auto_review` reviewer routing and `auto`/`prompt`/`writes`/`approve` modes with positive/negative tool sets; prove selected link affects policy only where stable contract says it should.
8. Approval evidence must identify the selected account clearly without retaining sensitive account data beyond bounded metadata.
9. Preserve Dex OAuth scope separation and no destructive/control/deploy/delete privilege expansion.
10. Unsupported/missing link policy must cause no mutation and must not silently broaden permissions.
11. Work/mobile/desktop E2E remains blocked until Runtime #28 Phase 3 PASS.

### #42043 / Runtime #28 compression watch

1. Confirm stable inclusion.
2. Verify `compression_enabled` means configured startup state only.
3. Correlate metrics with deterministic plain/compressed resume, archived fork-chain and cwd recovery tests from #42039 before treating them as optimization evidence.
4. Preserve profile-local `CODEX_HOME` and reject mixed-version shared-home evaluation.
5. GitHub Task/Result receipt remains authoritative regardless of local rollout/metric state.

## Applied Dex changes

### Runtime PR #68

- Initial #42047/#42043 watch evidence, one new documentation file only.
- Branch validation `33513932286`: PASS.
- Merge `988b1b3f5c5aec35f67d493971790eff0ce82f53`: PASS.
- Post-merge validation `33514202839`: PASS.
- Runtime #34 comment `5494784962`: initial future stable/approved-host per-account approval Gate.
- Runtime #28 comment `5494787064`: compression metric correlation Gate.

### Runtime PR #69

- Follow-up after #42054 merged during the same provider-watch window.
- Corrected #42047 enforcement wording and added explicit-selector fail-closed Gate.
- Branch validation `33514758115`: PASS.
- Merge `7ce373dceb212499f8eed9ac16d14a096bd04250`: PASS.
- Post-merge validation `33514844260`: PASS.
- Vercel merge status: PASS.
- Runtime #34 comment `5494869603`: #42054 selector/account-binding Gate recorded.

## Safety boundary

The following remain unchanged/disabled:

- prerelease or experimental capability activation
- `local_thread_store_compression`
- automatic app/link approval configuration
- broader OAuth/filesystem/MCP/plugin/browser/computer-use/remote-control/microphone/realtime permissions
- plugin/Skill auto-install, update, reconcile or deletion
- legacy Skill/Plugin deletion
- paid API, automatic paid fallback, automatic extra usage, credit purchase, banked reset, plan change
- external messaging or destructive migration

GitHub Task Bus, one active writer per mutation scope, durable canonical Result/receipt, OAuth scopes and risk-based independent verification remain authoritative.

## Validation status

### PASS

- Official OpenAI PR #42047 metadata/schema/config documentation review
- #42047 current reviewer-resolution boundary review
- Official OpenAI PR #42054 metadata/diff/E2E-description review
- Official OpenAI PR #42043 metadata/diff review
- Latest non-prerelease release check (`0.152.0`)
- Official Codex changelog check
- Current approved Wiki/Runtime main comparison
- Runtime PR #68 branch/post-merge validation
- Runtime PR #69 one-file scope review, branch/post-merge validation and Vercel
- Runtime #34/#28 tracking updates

### FAIL

- None identified.

### Not Checked

- Future stable containing #42043/#42047/#42054
- Approved Windows-host link selector + approval runtime enforcement/precedence/account-binding/revocation E2E
- Work/mobile/desktop per-account approval E2E
- Approved Windows-host compression metric ↔ recovery correlation E2E

### unknown

- First stable version containing each PR
- Final public per-account approval lifecycle/enforcement contract
- Measured Dex ROI of either capability after stabilization
