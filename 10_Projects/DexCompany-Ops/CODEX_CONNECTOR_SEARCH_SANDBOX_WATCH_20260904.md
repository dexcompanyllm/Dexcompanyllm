# Codex Connector / Search / Sandbox Watch — 2026-09-04

## Scope

Source-backed Dex Company provider watch for official OpenAI/Codex developments observed after Runtime PR #183 / Wiki PR #161 through the 2026-09-04 15:57 Asia/Seoul cutoff.

The 23:00–05:59 quiet-window backlog was already reconciled by the earlier 06:00 catch-up. This batch is watch/tracking only and does not change the operational #28 → #34/#35 Gate.

Canonical Runtime evidence: `ethanhee890-commits/ethanhee890-commits-dex-company-runtime` PR #184 / `docs/CODEX_CONNECTOR_SEARCH_SANDBOX_WATCH_20260904.md`

## Source-backed findings

### OpenAI Codex PR #42682 — experimental worktree fixture correction

Source: https://github.com/openai/codex/pull/42682

- `source-backed`: merged 2026-09-04 15:16:35 Asia/Seoul as `8e6a44b428e31f91b21edc97904fcdf4f0931ade`.
- The change updates the `/experimental` snapshot fixture for the worktrees item to use its string feature key and writable field.
- `Dex inference`: supporting evidence that the experimental worktree configuration contract is still evolving; not stable activation evidence.
- `not checked`: first non-prerelease stable containing the final managed-worktree lifecycle/cleanup contract.
- Dex action: no activation, migration, or dependency on experimental worktrees.

### OpenAI Codex Issue #42687 — GitHub connector postcondition ambiguity

Source: https://github.com/openai/codex/issues/42687

- `source-backed reporter signal`: opened 2026-09-04 15:47:43 Asia/Seoul with `codex-web`, `auth`, `tool-calls`, and `connectivity` labels.
- The reporter describes a native GitHub connector that initially exposes authenticated repository authority and later becomes unavailable/disabled after bounded operations while an independent GitHub route still reaches the same repository.
- `Dex inference`: connector disappearance after a mutation request makes the mutation postcondition **unknown**, not failed. Blind retry can duplicate side effects.
- Dex rule tracked in Runtime #34:
  - persist Task/idempotency/target/precondition before mutation;
  - perform one bounded mutation;
  - require independent exact GitHub readback before retry/advance;
  - connector loss before readback => `unknown/postcondition-unverified`, no replay;
  - independent read routes may reconcile state but do not become a second Task authority;
  - unavailable reconciliation => checkpoint/block without user requirement re-entry.
- `not checked`: maintainer-confirmed root cause/fix and reproduction on the approved Dex environment.

### OpenAI Codex Issue #42688 — Windows sandbox credential-store isolation corroboration

Source: https://github.com/openai/codex/issues/42688

- `source-backed reporter signal`: opened 2026-09-04 15:50:50 Asia/Seoul with Windows/auth/sandbox/app labels.
- Reporter says third-party CLI credentials valid in normal PowerShell are unavailable under Codex Desktop's isolated `codexsandboxoffline` identity.
- OpenAI repository automation points to #42621 as a potential duplicate; Dex already tracks that credential-isolation class.
- `Dex inference`: interactive Windows credential-store availability cannot be assumed inside the Codex sandbox account.
- Dex action: preserve sandbox isolation; do not copy the user's credential vault, disable the sandbox, broaden OS/filesystem permissions, or inject personal credentials into unattended workers.
- `not checked`: provider-supported isolated/short-lived third-party CLI auth path and approved-host E2E.

### OpenAI Codex Issue #42689 — keyword web search failure on stable 0.153.2

Source: https://github.com/openai/codex/issues/42689

- `source-backed reporter signal`: opened 2026-09-04 15:56:47 Asia/Seoul with Windows/CLI/tool-calls labels.
- Reporter environment: Codex CLI `0.153.2`, ChatGPT Plus, `gpt-5.6-sol`, Windows 11.
- `codex doctor --json` provider HTTP reachability and Responses WebSocket handshake pass, while keyword search repeatedly returns an empty extension result / `Found no tool response`; direct URL opening succeeds in the same session.
- `Dex inference`: provider/network doctor PASS is necessary but insufficient for web-research readiness. Keyword discovery and direct URL retrieval are separate sub-capabilities.
- Dex rule tracked in Runtime #30:
  - record keyword-search and direct-open health independently;
  - valid-query empty/no-tool-response pattern => degraded/unknown tool path, not invalid user input;
  - bounded same-method retries only;
  - known official URLs may use supported direct-source retrieval;
  - if discovery completeness cannot be independently established, mark research coverage `Not Checked` rather than claiming exhaustiveness.
- `not checked`: maintainer-confirmed root cause/fix and approved Dex Windows-host reproduction.

## Stable / models / pricing / usage

Official release: https://github.com/openai/codex/releases/tag/rust-v0.153.2
Official plan guidance: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

- Latest official non-prerelease Codex remains `0.153.2`.
- No newer default-model promotion was identified in this interval.
- No newly dated general pricing/usage-limit change requiring a Dex policy change was identified in this interval.
- Current OpenAI guidance continues to describe shared Work/Codex/Excel/Workspace-Agent allowance behavior and account-specific reset/credit options.
- Dex subscription-first policy is unchanged: no API keys, paid API, automatic paid fallback, automatic extra paid usage, credit purchase, plan upgrade, or automatic banked-reset use.

## Dex application and validation

Runtime PR #184:

- Scope: one documentation/tracking file; Runtime executable/config/model/capability/permission/billing behavior unchanged.
- Branch validation `33847036103`:
  - attempt 1: install/static/unit/smoke PASS; production dependency audit FAIL because `registry.npmjs.org` returned HTTP 503.
  - one bounded retry, attempt 2: PASS including production dependency audit.
- Branch Vercel: PASS.
- Runtime merge SHA: `adc5706c9539c08dc1ae2f9551572b9f04b4d058`.
- Post-merge main validation `33847682276`: PASS on attempt 1, including production dependency audit.
- Merge Vercel: PASS.
- Runtime #34: GitHub connector postcondition/reconciliation Gate added.
- Runtime #30: keyword-search/direct-open sub-capability health and #42688 credential-isolation corroboration added.

## Canonical state

Before this Wiki mirror:

- Runtime `main`: PR #184 / `adc5706c9539c08dc1ae2f9551572b9f04b4d058`.
- Wiki `main`: PR #161 / `bf3d48d85a46ab8b8a56ba23494e28b2e16b0207`.
- Runtime #28 remains OPEN; approved Windows-host Phase 3 E2E remains `Not Checked`.
- #34 and #35 remain blocked until #28 PASS.
- Aggregate state-document pointer drift remains separately governed by Wiki #55; this watch-only mirror does not rewrite the eight aggregate state/handoff files.

## PASS / FAIL / Not Checked

- PASS: official upstream PR/issue metadata and bounded reporter claims verified.
- PASS: latest non-prerelease stable remains `0.153.2`.
- PASS: Runtime PR #184 branch validation after one bounded transient-audit retry.
- PASS: Runtime PR #184 post-merge validation and Vercel.
- PASS: tracking gates added to Runtime #30/#34 with independent readback after issue-comment writes.
- FAIL: none unresolved in this batch.
- Not Checked: Wiki automated CI (no workflow expected), upstream maintainer-confirmed fixes, approved-host reproduction, and the first stable containing the experimental worktree lifecycle contract.

## Safety boundary

No prerelease/experimental activation, managed-worktree adoption, credential copying, sandbox disablement, permission expansion, Browser/Remote/Voice/Computer Use activation, API key, paid route, automatic paid fallback, extra paid usage, reset consumption, credit purchase, plan upgrade, provider DB/cache repair, WindowsApps ACL change, duplicate writer, external messaging, destructive migration, or legacy Skill/Plugin deletion is authorized by this evidence.
