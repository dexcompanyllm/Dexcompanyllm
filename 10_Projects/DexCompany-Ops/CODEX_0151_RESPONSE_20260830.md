# Codex 0.151 Stable Response

- Date: 2026-08-30
- Status: Runtime optimization merged / approved-host E2E Not Checked
- Runtime PR: `#24`
- Runtime merge: `44e4af620ef5cc303cdaf1e192a052474a16795f`
- Runtime validation: `33281400062`

## 1. Official update

OpenAI released Codex CLI `0.151.0` as stable on 2026-08-29.

Meaningful stable changes for Dex Company:

- configurable grace period for optional MCP tool discovery
- extensions can inspect or replace MCP tool results before model consumption
- structured MCP tool/resource errors are preserved in App Server responses
- per-repository plugin catalog configuration is handled more reliably
- restored permission profiles persist across TUI turns
- `/cd` no longer weakens sandbox restrictions
- remote sandbox enforcement uses the actual executor home, OS and path semantics
- model switch/fallback keeps tool availability and reasoning effort aligned
- nested subagent token usage contributes to root goal budgets
- stale Guardian classifications cannot authorize after permission-state changes

No new Codex model, pricing change or default usage-limit change was confirmed in this review.

## 2. Dex impact classification

### confirmed

- `0.151.0` is a stable release, not prerelease.
- The MCP, permission, sandbox, fallback and subagent-budget changes above are part of the stable release.
- Runtime main before this response still treated `0.150.0` as the single recommended stable minimum.
- Runtime Issue #17 already targeted `0.151.0`, so canonical code and issue state were inconsistent.

### inference

- Recommending `0.151.0` should improve reliability and security on the approved host without requiring Dex to enable a new write surface or experimental capability.
- Keeping `0.150.0` as a compatibility floor avoids unnecessarily blocking a host that still satisfies the generated-schema baseline while encouraging an update to the safer current stable.

### proposal

- None requiring separate approval in this response. The low-risk target/floor separation is covered by the standing provider-update optimization policy.

### unknown

- Actual `0.151.0` generated App Server schema on the approved Windows host.
- Actual ChatGPT-managed subscription status and account model catalog after local upgrade.
- Thread-scoped MCP `runtimeStatus` behavior on the approved host.

## 3. Optimization applied

Runtime PR #24 changed release handling from one threshold to two independent thresholds:

```text
compatibility floor:  0.150.0
recommended target:   0.151.0
```

Runtime compatibility probe version is now `4` and reports:

- `compatibilityMinimum`
- `recommendedMinimum`
- `meetsCompatibilityMinimum`
- `meetsRecommendedMinimum`
- `upgradeRecommended`

Expected behavior:

| Installed version | Core compatibility policy | Upgrade recommendation |
|---|---|---|
| `< 0.150.0` stable | below Dex floor | Yes |
| `0.150.x` stable | may remain compatible if schema passes | Yes |
| `0.151.0+` stable | meets current recommendation | No |
| prerelease | does not satisfy stable-host gate | Yes |

This preserves generated schema as the capability authority and avoids treating version number alone as proof of support.

## 4. Capability handling

No optional capability was automatically enabled.

| Capability | State after response |
|---|---|
| MCP `runtimeStatus` | `tracked-disabled` / Issue #18 |
| Task `@` mentions | `design-backlog` / Issue #19 |
| Interrupt hook | `security-design-backlog` / Issue #20 |
| unfinished-turn suspension | `watch-disabled` / Issue #21 |
| paginated thread history | `watch-disabled` / Issue #21 |

Codex 0.151 MCP reliability improvements were added to Issue #18 evidence, but Dex MCP Gateway authority, hosted MCP write policy and authentication scope were not changed.

## 5. Verification

### PASS

- Runtime PR #24 branch and diff review
- GitHub Actions validation run `33281400062`
- Static checks: 13 required files, 40 JavaScript syntax checks, JSON/dependency/secret scan
- Node tests: 171/171
- 0.150 compatibility-floor / 0.151 recommended-target release-policy regression
- prerelease stable-host gate regression
- stable MCP `runtimeStatus` remains tracked-disabled
- Runtime smoke
- Vercel adapter smoke
- rollback guard
- production dependency audit: 0 vulnerabilities
- unresolved PR review threads: 0
- Runtime PR #24 merge to `main`

### FAIL

- None in the implemented and automated verification scope.

### Not Checked

- approved Windows host `0.151.0` install
- real `npm run codex:compatibility`
- real `npm run codex:status`
- real authenticated `model/list`
- 0.151 generated App Server schema/capability diff
- MCP thread-scoped diagnostics E2E
- Plugin marketplace/fresh-session Skill forward tests

## 6. Approved-host handoff

Use PowerShell command shims explicitly rather than weakening persistent execution policy:

```powershell
npm.cmd install -g "@openai/codex@0.151.0"
$npmPrefix = (npm.cmd config get prefix).Trim()
& (Join-Path $npmPrefix "codex.cmd") --version
```

Then enter the actual Runtime Git worktree and run:

```powershell
git pull --ff-only origin main
npm.cmd ci --no-audit --no-fund
npm.cmd run codex:compatibility
npm.cmd run codex:status
```

Expected release-policy evidence:

- `compatibilityMinimum: 0.150.0`
- `recommendedMinimum: 0.151.0`
- `meetsCompatibilityMinimum: true`
- `meetsRecommendedMinimum: true`
- `upgradeRecommended: false`

Do not change PowerShell execution policy, enable paid API fallback, delete legacy plugins/skills, enable experimental App Server APIs or broaden permissions as part of this handoff.

## 7. Post-0.151 upstream watch

These OpenAI main commits are confirmed after the 0.151 stable cut but are not stable installed capability evidence yet:

- thread `cwd` restoration across compaction/fork/resume: `f5636bb733c4653a6b91413fed1aaf8842374f2e`
- goal-continuation turn lineage preservation: `4210c08defe92fe8828f789b6f9fda287ad3709e`
- diagnostic report upload hardening: `aaa7ed042eaa1f8c6c03e41673bdf0efc7851c14`

Re-evaluate when a release contains them. Do not enable or depend on unreleased mainline behavior.

## 8. Sources

- OpenAI Codex changelog: https://developers.openai.com/codex/changelog
- Codex `0.151.0` release: https://github.com/openai/codex/releases/tag/rust-v0.151.0
- `0.150.0...0.151.0` comparison: https://github.com/openai/codex/compare/rust-v0.150.0...rust-v0.151.0
- Runtime PR #24: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/24
- Runtime Issue #17: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/17
- Runtime Issue #18: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/18

## Watchdog Verdict

`PASS_WITH_WARNINGS` — the canonical Runtime now recommends the latest stable without breaking the existing tested compatibility floor, and all optional/high-risk capabilities remain gated. Approved-host install/schema/subscription/MCP E2E is still Not Checked.
