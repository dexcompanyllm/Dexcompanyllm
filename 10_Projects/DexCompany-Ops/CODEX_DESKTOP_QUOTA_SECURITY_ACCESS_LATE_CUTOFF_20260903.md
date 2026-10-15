# Codex Desktop quota / security-access late cutoff — 2026-09-03

## Confirmed

### #42531 — macOS Desktop Chat reasoning-picker discrepancy after Pro-specific allowance exhaustion

Official source: https://github.com/openai/codex/issues/42531

- OpenAI Codex issue is labeled `bug`, `rate-limits`, `app`.
- Reporter uses macOS Desktop `26.901.20858` on Apple Silicon.
- Same Pro account: Pro-specific allowance is exhausted; iOS and web still expose Medium/High/Extra High; macOS Desktop Chat is Instant-only; Work in the same Mac app retains normal choices.

Classification: **confirmed signal / exact client-state or entitlement causality unknown / fix Not Checked**.

### #42530 — Security Access TAC-status navigation loops to generic Plugins page

Official source: https://github.com/openai/codex/issues/42530

- Issue is labeled `bug`, `CLI`, `tool-calls`, `safety-check`.
- Reporter uses prerelease `0.151.0-alpha.7.2`, WSL2, `gpt-daybreak-blue-latest`, and many experimental app/browser/computer-use flags.
- `codex_apps.codex_security_access.get_tac_status` reportedly opens a connector URL that redirects to the Plugins page and does not yield a usable TAC status; the reporter states similar behavior in Windows Desktop configured for WSL.

Classification: **confirmed issue / current stable Dex applicability unknown / fix Not Checked**.

## Inference

1. Model/reasoning picker state is surface-local evidence, not account-wide entitlement authority. Requested and effective model/reasoning, authenticated catalog/usage and UI picker state must remain separate.
2. One model-specific allowance being exhausted does not prove all other reasoning choices are unavailable.
3. A security-access UI/navigation path is not equivalent to a machine-readable security authorization/status result.
4. #42530's prerelease/experimental environment is materially different from current Dex policy and cannot justify enabling those features.

## Proposal

- Keep automatic model fallback disabled. Re-check authenticated catalog/usage plus target surface before quality/cost-sensitive routing.
- Never create a duplicate canonical Task merely to work around a surface picker or quota discrepancy.
- Keep Codex Security Access / Daybreak Blue / experimental app path disabled. Future use requires stable/public support and machine-readable account/workspace-bound status E2E.
- Ambiguous security-access status fails closed: mutation 0, no safeguard bypass, no broader permission, no API-key fallback, no repeated plugin mutation.

## Cost / policy state

OpenAI current Codex plan guidance says Codex, Work, Excel and Workspace Agents can share allowance/credits and usage varies with model, execution location, task complexity, context, reasoning, speed and tools. No general pricing or usage-limit policy change is inferred from #42531.

Subscription-first remains canonical; paid API, automatic paid fallback and automatic credit/reset use stay disabled.

## Verification

- #42531 source review: **PASS**.
- #42530 source review: **PASS**.
- Maintainer-confirmed fixes: **Not Checked**.
- macOS Chat/Work/web/iOS parity E2E: **Not Checked**.
- Security Access/TAC stable E2E: **Not Checked / capability disabled**.
- Operational Dex change: **PASS — none; evidence/tracking only**.
