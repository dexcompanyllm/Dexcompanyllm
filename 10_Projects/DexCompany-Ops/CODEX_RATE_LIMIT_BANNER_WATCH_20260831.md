# Codex actionable rate-limit banner watch — 2026-08-31

## Scope

Official OpenAI/Codex changes checked after the previous package-style MCP-name watch. This note records only the new rate-limit recovery/banner change and the Dex response.

## Findings

### confirmed

- OpenAI's current Codex Help tells users who hit a usage limit to check the Codex usage page or the limit banner for plan-available options such as adding credits, applying an available reset, upgrading, or waiting for reset.
- OpenAI Codex upstream `main` commit `79b04f1ab5079d65e84e6a8006255a9c2cf9944e` / PR #41742 adds actionable TUI rate-limit banners and carries optional backend-owned banner/account identity data through `account/rateLimits/read`.
- The upstream generated App Server schema adds optional `accountId` and `rateLimitUpsell` fields to the rate-limit response.
- Upstream behavior refreshes usage after limit errors, rejects stale responses, pauses queued input until recovery, filters banner data by authenticated account/user, and can select the first available fallback model when the banner instructs it.
- Latest official non-prerelease Codex release remains `0.151.0`; the protocol change above is not treated as stable Dex capability evidence yet.

### inference

- Identity-bound banners and stale-response rejection can improve limit recovery and reduce confusing or duplicate work.
- Banner-driven credit/reset/upgrade CTAs and provider-selected fallback models create a policy boundary for Dex: provider UI guidance must not become automatic authority for billing, extra usage, or model selection.

### proposal — adopted as watch policy

- Keep banner-specific integration disabled until a stable release and approved-host generated-schema/E2E verification.
- If Dex later surfaces provider limit guidance, keep it read-only/advisory by default.
- Never auto-purchase credits, redeem a banked reset, upgrade a plan, enable extra paid usage, use paid API fallback, or broaden permissions from a provider banner.
- Any provider-suggested fallback model must be revalidated through the authenticated model catalog and current Dex retirement/model policy before execution.
- Preserve account/user identity checks, reject stale usage state, and do not resume queued mutation work before recovery state is current.

### unknown

- First official stable Codex release containing the new App Server fields and TUI behavior.
- Exact approved-host schema/behavior for the user's ChatGPT-managed subscription.
- Which banner/CTA variants the account will actually receive.

## Dex implementation response

- Runtime tracking issue: #37 `[WATCH][Codex] Track actionable rate-limit banners and safe fallback handling`
- Runtime PR: #38 `Gate upstream actionable Codex rate-limit banners`
- Runtime merge: `2bdbbff74ad63ca845c0a012d55940d04afdb68c`
- Runtime validation run: `33344805290` — PASS
- PR diff: one docs-only file; no Runtime execution behavior changed.
- Existing Runtime `account/rateLimits/read` path remains a response passthrough and does not interpret optional banner fields as commands.

## Verification

- Official OpenAI Help current limit-banner guidance: PASS
- OpenAI upstream commit and schema diff: PASS
- Current latest stable = 0.151.0: PASS
- Runtime PR #38 static checks, unit tests, smoke and production dependency audit: PASS
- Runtime PR #38 main merge: PASS
- New banner integration/activation: Not Performed
- Paid API / automatic extra usage / automatic paid fallback: Not Performed
- Credit purchase / reset redemption / plan upgrade: Not Performed
- Approved-host stable schema and positive/negative E2E: Not Checked

## Official sources

- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- https://github.com/openai/codex/commit/79b04f1ab5079d65e84e6a8006255a9c2cf9944e
- https://github.com/openai/codex/releases/latest
