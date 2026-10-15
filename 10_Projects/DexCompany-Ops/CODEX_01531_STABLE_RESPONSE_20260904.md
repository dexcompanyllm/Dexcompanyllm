# Codex 0.153.1 Stable Response — 2026-09-04

Cutoff reviewed: 2026-09-04 06:51 Asia/Seoul.

## Confirmed

- OpenAI published Codex CLI `0.153.1` as a non-prerelease stable release at 2026-09-04 06:02:56 Asia/Seoul.
  - https://github.com/openai/codex/releases/tag/rust-v0.153.1
  - https://developers.openai.com/codex/changelog
- OpenAI's changelog describes `0.153.1` as a focused hotfix adding GPT-6 Astra model-catalog support for API configuration without changing the default model or showing Astra in the model picker.
  - https://github.com/openai/codex/pull/42605
- OpenAI Codex issue #42621 reports a Windows elevated-sandbox credential-context failure on Codex Desktop `26.831.21537` with bundled CLI `0.152.1`: the sandbox identity lacks a profile-backed Windows credential vault, so private Git/Schannel authentication fails with `SEC_E_NO_CREDENTIALS` and private Sites repository operations are blocked. Maintainer-confirmed root cause/fix are Not Checked.
  - https://github.com/openai/codex/issues/42621
- OpenAI Codex issue #42622 requests durable pending approval/user-input operations across App Server restarts. The reproduction is on CLI `0.148.0`; this is an enhancement request, not a current supported capability.
  - https://github.com/openai/codex/issues/42622

## Inference

- `0.153.1` is a safer validation candidate than prerelease builds, but stable publication alone does not prove approved-host compatibility or actual Astra visibility for the authenticated subscription account.
- #42621 supports keeping Dex credential isolation fail-closed. A private-Git/Sites problem should not be solved by weakening the sandbox or granting the unattended worker access to Ethan's personal Windows credential profile.
- #42622 is consistent with Dex keeping pending approval/user-input state in the GitHub Task Bus/checkpoint rather than assuming provider in-memory JSON-RPC continuations are durable across process restart.

## Proposal / Dex gates

### `0.153.1` approved-host validation

- Verify official `0.153.1` package and `codex --version`.
- Run existing `doctor -> compatibility -> status` gate.
- Verify authenticated App Server `model/list`; bundled Astra catalog presence alone is not account availability evidence.
- Run bounded no-op/read-only subscription canary and required regressions before recommended-target promotion.
- Keep Astra tracked-rollout until actual account visibility plus value/allowance canary PASS.

### Windows credential isolation / Sites

- Preserve personal Windows Credential Manager, personal GitHub/SSH/browser credentials outside the unattended worker boundary.
- Do not auto-disable sandboxing, copy credentials, inherit host-user credential vaults, or perform registry/cache surgery.
- If private Git/Sites becomes an approved Dex capability later, require provider-supported isolated/short-lived auth, repository binding, bounded lifetime, revocation/logout behavior, no secret persistence and idempotent mutation E2E.

### Pending-input durability

- GitHub Task Bus/checkpoint remains canonical for pending approval or user-input state across worker/App Server restart.
- Do not assume provider-side pending request IDs survive restart until an official durable contract and approved-host E2E exist.

## Validation

- PASS: official OpenAI `0.153.1` release and changelog verified.
- PASS: release scope cross-checked against upstream #42605.
- PASS: Dex subscription-first, one-writer and credential-isolation policies remain compatible with this release.
- FAIL: none introduced by this evidence update.
- Not Checked: approved Windows-host `0.153.1` install/Doctor/compatibility/status/model-list/canary; actual Astra account visibility; #42621 current-stable reproduction/fix; future durable-input implementation for #42622.

## Safety boundary

No prerelease/experimental capability, Astra auto-selection, Fast tier, API key, paid API, automatic paid fallback, extra paid usage, broader filesystem/OAuth/MCP permission, personal credential inheritance, Sites deployment, Browser/Computer Use, destructive migration, duplicate worker or external messaging is enabled by this update.