# Runtime Issue #17 zero-change rebaseline — 2026-09-01

## Status

`confirmed` — Ethan explicitly approved the Issue #17 zero-change acceptance rebaseline on 2026-09-01.

## Approved criterion

> Validation execution itself must produce zero unreviewed/unapproved mutation outside its disposable or broker-approved workspace. Separately approved prerequisite installation, reviewed PR/merge, broker publication and automatic deployment are allowed when recorded and verified.

## Why this replaces the literal criterion

The previous literal wording treated any change during the broader validation program as a failure, including approved prerequisite Codex installation, reviewed PR/main merges, broker publication and automatic Vercel deployment. That conflated approved lifecycle changes with unauthorized validation-side mutation.

The rebaseline keeps the safety objective and makes the boundary explicit: the model-controlled validation execution may not create unreviewed or unapproved mutation outside its disposable or broker-approved workspace.

## Re-evaluation

### PASS

- dedicated non-admin Windows worker identity
- profile-local `CODEX_HOME` and separate ChatGPT-managed subscription authentication
- worker GitHub CLI authentication: false
- user Git credential helper: 0
- SSH private keys: 0
- Windows GitHub credential targets: 0
- broker project→realpath registry + SHA-256 pin
- `worker:host-check ready:true`
- Codex 0.151 Doctor / compatibility / subscription-model readiness; Doctor failed checks 0
- actual worker result `DEX_WORKER_E2E_PASS`
- actual App Server sandbox `read-only`
- approval mode `deny`
- output secret scan
- final Runtime repository mutation during E2E: 0
- final Wiki repository mutation during E2E: 0
- paid API / automatic paid fallback / hosted MCP write / `danger-full-access` / optional capability activation: 0

### Previous controlled changes now accepted by the rebaseline

- prerequisite Codex installation
- reviewed Runtime PR/main merges
- broker publication
- recorded automatic Vercel deployments

These remain auditable changes; they are not treated as unauthorized validation mutations.

## Final Gate decision

- Runtime Issue #17: `PASS / closed`
- Runtime #28 bounded Unified Task E2E: next critical Gate
- Runtime #34 Work/mobile submit-status-result and #35 capability-routed workers: remain blocked on #28 PASS
- Codex 0.152.0: separate stable-validation candidate; it does not retroactively invalidate the completed 0.151 Gate and is not automatically promoted

## Safety boundaries unchanged

- subscription-first only
- no `OPENAI_API_KEY` paid fallback
- no automatic extra paid usage
- no hosted MCP write enablement
- no `danger-full-access`
- no optional provider capability activation solely because it is stable
- no destructive migration or legacy Skill/Plugin deletion
- Git publication remains broker-owned

## Runtime evidence

- Issue #17 owner-approval/final PASS comment: Runtime Issue #17, comment `5489458445`
- Issue #17 closed as completed on 2026-09-01
- final dedicated-host E2E Runtime baseline: PR #60 merge `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- later Runtime `main` may include watch/docs-only commits; those do not alter this Gate without explicit relevant implementation evidence
