# Codex Desktop portability watch — 2026-09-03 21:42 KST cutoff

- verificationStatus: source-backed / watch-only
- claimType: provider update evidence
- verifiedAt: 2026-09-03
- verifiedBy: Jenny / ChatGPT automation
- operationalActivation: none

## Canonical context

Dex authority remains the approved GitHub `main`, One Task ID / One Active Writer / One Canonical Result / Zero User Re-entry, and subscription-first cost control. Runtime #28 remains Phase 3 implementation merged with approved Windows-host E2E Not Checked; #34/#35 remain blocked. Runtime Draft PR #157 is user-owned review-only work and is preserved unmodified.

At this cutoff, `openai/codex` upstream `main` still has no merged commit after PR #42458, and latest official non-prerelease Codex remains `0.153.0`.

## New official Codex issue evidence

### #42515 — Windows Desktop permanent white renderer after second launch

Source: https://github.com/openai/codex/issues/42515

Classification:

- confirmed: open issue with `bug`, `windows-os`, `app`; Microsoft Store/MSIX `26.901.1978.0`; bundled App Server/CLI `0.153.0-alpha.5`; Windows 11; ChatGPT Pro mobile-billed account.
- confirmed: reporter says a brand-new empty `CODEX_HOME` works on first onboarding launch but subsequent authenticated relaunches render a permanent white window; repair/reset, reinstall, re-auth, config disable, and clean-profile tests reportedly did not fix it.
- confirmed: report observes an embedded pricing webview and `/payments/payment_methods` 400 but explicitly does not claim causality.
- unknown: root cause, maintainer-confirmed fix, whether mobile-billing entitlement routing is involved, and whether standalone stable CLI `0.153.0` is affected.
- inference: process/frame/auth/App Server readiness must be separated from renderer/control-surface readiness; provider UI failure must not cause duplicate Task/writer creation or paid fallback.
- proposal: approved Windows Desktop E2E, if used, must include two consecutive authenticated launches/restarts and a visible usable renderer/control path. Failure remains fail-closed with canonical PWA/GitHub recovery.

### #42516 — Windows update hides standard Chat while Work/Codex remain available

Source: https://github.com/openai/codex/issues/42516

Classification:

- confirmed: open issue with `bug`, `windows-os`, `app`, `session`; Windows Desktop `26.901.200858`; ChatGPT Plus.
- confirmed: reporter says standard Chat disappears from the mode selector, Desktop Recents/search show no regular chats, while the same cloud chats remain available on `chatgpt.com`; Work and Codex remain usable. Reporter states the general behavior occurred on two Windows PCs after update.
- unknown: whether this is an intentional rollout, UI regression, account cohort behavior, or other cause; no maintainer-confirmed resolution exists at this cutoff.
- inference: native Desktop surface visibility is not canonical Task/history authority. Dex must preserve Task ID/context/result across surface disappearance and avoid user requirement re-entry.
- proposal: #34 surface E2E should independently verify Chat, Work, Codex, web, supported mobile, and PWA fallback; missing Desktop history/search must not be interpreted as deletion or trigger duplicate submit/mutation.

### #42514 — Intel Mac Computer Use/Locked use service missing signal

Source: https://github.com/openai/codex/issues/42514

Classification:

- confirmed: open issue with `bug`, `app`, `computer-use`; Intel macOS x86_64; Desktop `26.901.20858`; reporter says Locked use fails and `SkyComputerUseService` appears absent.
- unknown: Intel support contract, packaging root cause, and maintainer fix.
- current Dex impact: none because Computer Use/Locked use remains disabled and is not a current #28/#34 dependency.
- proposal: if future approved Mac execution needs Computer Use, architecture/support discovery and a separate security/permission Gate must precede activation. No cache manipulation or permission broadening is approved.

## Dex optimization decision

Low-risk beneficial hardening only:

1. Keep GitHub Task/Result authoritative when Desktop renderer, Chat mode, or search/history projection is unavailable.
2. Separate process/auth/App Server readiness from visible renderer/control-path readiness.
3. Add restart/surface-parity recovery evidence to future approved-host #28/#34 E2E.
4. Preserve subscription-first: billing/paywall UI or entitlement errors are diagnostic only and cannot authorize plan changes, credit/reset use, paid API, or automatic paid fallback.
5. Keep Computer Use/Locked use disabled; no prerelease, experimental feature, broader permission, reinstall/downgrade, `CODEX_HOME` reset, provider DB repair, external messaging, or destructive migration is activated.

## Verification status

- latest official non-prerelease Codex: PASS — `0.153.0`
- latest upstream merged `main`: PASS — PR #42458 remains latest
- #42515/#42516/#42514 existence and reported versions: PASS
- maintainer-confirmed root cause/fix for #42514-#42516: Not Checked
- approved Windows Desktop two-launch renderer/control-path E2E: Not Checked
- Chat/Work/Codex/web/mobile/PWA recovery parity E2E: Not Checked
- Intel Mac Computer Use capability: Not Checked / intentionally disabled
- Dex operational mutation from this watch: 0
