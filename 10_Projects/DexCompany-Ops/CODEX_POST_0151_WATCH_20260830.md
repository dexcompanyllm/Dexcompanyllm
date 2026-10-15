# Codex post-0.151 upstream watch — 2026-08-30

## Scope

Codex `0.151.0` remains the approved recommended stable target. This note records meaningful official OpenAI/Codex changes observed after the previous Dex watch baseline. Stable-release evidence and upstream `main` evidence are kept separate: upstream `main` is future-direction evidence, not installed stable capability evidence.

## Findings

### 1. `update_plan` becomes default-enabled on upstream main

- Classification: `confirmed`
- OpenAI PR: https://github.com/openai/codex/pull/41630
- Merge commit: https://github.com/openai/codex/commit/28327355b861ab6cc76b01c7248663eb1be440cf
- Evidence: OpenAI tests now assert that `tools.update_plan.enabled` resolves `true` when omitted, remains `true` when the table exists without an explicit value, and can still be explicitly disabled.

### Why it matters to Dex

- Classification: `inference`
- A default planning tool can improve long-running execution visibility and structured progress management.
- It also changes the default model tool surface, so custom base/developer instructions and tool-list stability must be verified before Dex depends on it.
- The explicit-disable path is valuable as a rollback lever if a future model/tool interaction regresses.

### Dex action

- Classification: `confirmed`
- Runtime Issue #25 tracks stable inclusion and approved-host verification.
- Runtime capability tracking schema `1.2` records `updatePlanDefault` as `upstream-main / watch-disabled`.
- Dex does not force-enable, depend on, or advertise the behavior as stable yet.

### 2. Vim composer search motions on upstream main

- Classification: `confirmed`
- OpenAI merge commit: https://github.com/openai/codex/commit/63d213884daea50e4f74efc192cdc44f549b67d5
- Adds draft-local `/` and `?` literal search, wrapped repeat with `n`/`N`, operator composition, highlighted matches, and configurable `tui.keymap.vim_search` bindings.

### Why it matters to Dex

- Classification: `proposal`
- This is a local CLI/TUI productivity improvement for users editing long prompts or instructions.
- It does not require Dex Runtime integration and should remain optional rather than becoming a canonical workflow dependency.

### Dex action

- Classification: `confirmed`
- Runtime Issue #25 tracks stable inclusion.
- Runtime capability tracking records `vimComposerSearch` as `upstream-main-tui / watch-disabled`.
- No Runtime execution behavior changed.

### 3. Guardian authorization survives compaction/internal context on upstream main

- Classification: `confirmed`
- OpenAI PR/merge commit: https://github.com/openai/codex/commit/0a12b855a0b21068108a8a3b311d492712737e0f
- OpenAI separates a host-owned user-message authorization revision from conversation-history generation.
- Genuine user messages and history resets advance authorization state; compaction and host-injected context preserve it.
- Unknown or incomplete content-kind metadata is conservatively treated as user authorization.
- Upstream tests verify cached Guardian authorization survives compaction/internal context but is invalidated by user input and rollback.

### Why it matters to Dex

- Classification: `inference`
- Long-running Codex tasks can compact history or inject host context without the user granting a new permission. Preserving a still-valid Guardian review across those internal rewrites can reduce redundant review/rework.
- The upstream design still invalidates on genuine user input, rollback or reset, so the intended direction improves continuity without deliberately widening user authorization.
- This is not yet a stable contract, so Dex cannot depend on it for approval semantics.

### Dex action

- Classification: `confirmed`
- Runtime Issue #25 was broadened to track Guardian compaction behavior alongside the workflow changes.
- Dex permission/approval policy is unchanged.
- No prerelease is installed and no Guardian-specific runtime behavior is enabled.
- Stable inclusion plus approved-host long-thread/compaction regression is required before Dex treats this behavior as available.

### 4. `codex doctor` is a stable 0.151 Windows diagnostic surface and is now a Dex preflight

- Classification: `confirmed`
- Official OpenAI Windows guidance: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- Stable `0.151.0` source: https://github.com/openai/codex/blob/rust-v0.151.0/codex-rs/cli/src/doctor.rs
- Stable source describes Doctor as intentionally read-mostly, redacted, JSON-capable, bounded diagnostics that do not repair user state or start long-lived services.
- It checks installation/config/auth/network/websocket/MCP/sandbox/terminal/Git/state/thread/app-server/provider reachability and reports failures with a non-zero exit.

### Why it matters to Dex

- Classification: `confirmed`
- The approved Windows host previously encountered PowerShell shim execution-policy failures and a wrong Git working directory before Runtime validation began.
- A structured preflight reduces blind retries, distinguishes host/environment faults from Dex compatibility faults, and gives safer evidence before `codex:compatibility` and `codex:status`.

### Dex action

- Classification: `confirmed`
- Runtime PR #29 added `npm run codex:doctor`, which invokes official `codex doctor --json` through Dex's existing shell-free Codex resolver.
- It enforces subscription-only policy, bounds runtime/output, redacts supported secret patterns, validates the Doctor report shape, preserves warnings/failures, and fails closed on a Doctor failure.
- Runtime validation run `33311981712` passed static checks, unit tests, smoke/Vercel adapter smoke, rollback guard and production dependency audit.
- Runtime PR #29 merged as `a194054e7eb9cdf352d142e015a2146d640645d9`.
- Runtime Issue #17 now requires Doctor PASS/WARNING preflight before compatibility/status on the physical approved host.

## Stable / pricing / model check

- Latest approved stable target remains Codex `0.151.0`.
- No newer stable release was confirmed during this check.
- No new Codex model availability change relevant to the current Dex subscription-first routing was confirmed.
- No new Codex subscription usage-limit or pricing change relevant to the current Dex policy was confirmed.
- GPT-5.4 and GPT-5.4 mini retirement from ChatGPT-login Codex remains scheduled for 2026-08-31; existing Dex replacement readiness policy remains unchanged.

## Safety and cost boundaries

- No prerelease/alpha installation or promotion.
- No paid API or automatic paid fallback.
- No permission or OAuth-scope expansion.
- No hosted MCP write enablement.
- GitHub Task Bus remains canonical task authority.
- No legacy Skill/Plugin removal.

## Verification

### PASS

- Official OpenAI/Codex source review
- Dex Runtime `main` comparison
- `codex doctor` stable 0.151 source contract confirmation
- Runtime PR #29 code review/diff scope
- Runtime validation run `33311981712`
- Static checks, unit tests, smoke tests, Vercel adapter smoke, rollback guard
- Production dependency audit
- Runtime PR #29 merge — `a194054e7eb9cdf352d142e015a2146d640645d9`
- Runtime Issue #17 safe preflight sequence update
- Runtime Issue #25 Guardian/watch update

### FAIL

- None in the implemented/automated verification scope.

### Not Checked

- Physical approved-host `npm.cmd run codex:doctor`
- Physical approved-host `npm.cmd run codex:compatibility` and `npm.cmd run codex:status`
- Real ChatGPT-managed model catalog and worker readiness on the approved host
- Stable release containing `update_plan` default-on
- Approved-host `update_plan` tool-surface verification
- Vim search stable availability
- Stable release containing Guardian PR #41660
- Approved-host long-thread/compaction Guardian regression

## Handoff

On the approved Windows host, sync Runtime `main` at or after merge `a194054e7eb9cdf352d142e015a2146d640645d9`, install stable Codex `0.151.0`, and run in order:

```powershell
npm.cmd run codex:doctor
npm.cmd run codex:compatibility
npm.cmd run codex:status
```

If Doctor returns `overallStatus: fail` or `readyForDexValidation: false`, stop before compatibility/status and remediate the reported host/environment issue. Do not change PowerShell execution policy, enable paid API, activate experimental capabilities, widen permissions, or remove legacy Skill/Plugin as part of this gate.

## Tracking

- Runtime Issue #17: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/17
- Runtime Issue #25: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/25
