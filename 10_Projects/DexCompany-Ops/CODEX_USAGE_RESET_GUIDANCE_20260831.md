# Codex usage reset guidance

- Date: 2026-08-31 (Asia/Seoul)
- Scope: OpenAI/Codex official usage-limit reset guidance and Dex user-benefit policy
- Status: `PASS_WITH_ACCOUNT_ELIGIBILITY_NOT_CHECKED`
- Latest reconciliation verified: 2026-08-31 04:35 KST

## Why this matters

OpenAI's current official Codex Help documents two reset mechanisms that can materially change available Codex usage:

1. one-time resets that OpenAI may apply automatically to eligible users; and
2. banked Codex rate-limit resets that some Plus/Pro promotions may award and that the user can redeem later.

The current official Help now states in two separate official pages that a full banked reset refreshes both the 5-hour and weekly Codex usage windows **and changes the weekly reset date**. This directly affects when a banked reset is most valuable and how Dex should forecast future capacity.

## Reconciliation note

Dex briefly recorded the opposite interpretation at 03:29 KST after an earlier Help snapshot indicated that the scheduled weekly reset date did not change. At 04:32-04:35 KST, the current OpenAI Help was rechecked and both of the following official pages explicitly state that a full banked reset **changes** the weekly reset date:

- `Using Codex with your ChatGPT plan`
- `How banked Codex resets work`

The 03:29 KST Dex statement is superseded by this later, cross-checked official evidence. Because the public Help wording changed during the same monitoring window, reset semantics are treated as a volatile provider policy: Dex must re-check current official Help and account UI before a future redemption recommendation instead of relying on a remembered rule.

## Confirmed

- OpenAI may occasionally provide eligible users with a one-time reset of Codex or ChatGPT Work usage limits.
- Eligibility, affected limits, redemption requirements and expiration can vary by offer; future resets are not guaranteed.
- An automatic reset applies directly to the usage limits covered by the announcement and is not saved for later.
- Some offers may also provide a separate banked reset.
- Some Plus/Pro promotions can award a banked Codex rate-limit reset.
- Redeeming a full banked reset refreshes both the 5-hour and weekly Codex usage windows.
- Current official OpenAI Help states that redeeming a full banked reset changes the weekly reset date; Settings → Usage shows the updated reset time.
- A banked reset is consumed only when it successfully refreshes at least one eligible usage window; if there is nothing to reset, it remains available.
- OpenAI Support does not manually provide courtesy usage resets.

## Inference

- An unexpected increase in available weekly capacity can be caused by an eligible automatic reset or a redeemed banked reset, but public documentation alone cannot determine which mechanism affected a particular account.
- Because banked-reset redemption changes the weekly reset date, redeeming it immediately is not always optimal; its value depends on remaining allowance, expiration, upcoming workload and whether moving the weekly reset schedule is advantageous.
- A banked reset should be treated as a scarce account-level benefit, not as an assumed recurring entitlement.
- The exact resulting weekly reset timestamp is account-specific and should be read from Settings → Usage after redemption rather than calculated by Dex.

## Dex policy adopted

- Monitor official OpenAI Codex Help, release/changelog surfaces and official promotion guidance for changes to one-time reset or banked-reset eligibility and terms.
- Distinguish `automatic reset` from `banked reset` in future Dex usage reports; do not collapse them into a generic `limit reset`.
- Never auto-redeem a banked reset. Redemption consumes a user-controlled benefit and can move the weekly reset schedule, so it requires Ethan's explicit decision at the time of use.
- Before recommending redemption, re-check both official reset guidance pages and the account's current Settings → Usage values.
- If official pages conflict, mark the reset-date effect `unknown`, do not auto-redeem, and treat account UI as the account-specific authority once redemption actually occurs.
- After any confirmed reset, refresh usage forecasts from the account's current Settings → Usage values instead of carrying forward an old reset timestamp.
- Do not assume future free resets will occur, and do not route to paid API or automatic extra paid usage when included usage is exhausted.
- Do not infer that a historical unexplained reset was a referral reward without account evidence.

## User-benefit decision support for a future banked reset

Before recommending redemption, compare at least:

- remaining 5-hour and weekly allowance;
- current scheduled weekly reset time;
- reset expiration/redemption deadline if shown;
- high-priority Codex workload expected before the current reset;
- whether moving the weekly reset date would improve or worsen the next workload window;
- whether preserving the banked reset would provide more value for a later high-load period.

The default recommendation is to preserve a banked reset until it provides clear workload value or approaches expiration.

## Additional current official compatibility note

OpenAI's current `Using Codex with your ChatGPT plan` Help also states that `approval_policy = "untrusted"` is unsupported in Codex CLI `0.149.0+`, ChatGPT desktop app `26.818.31338+`, and the matching VS Code extension. Dex approved-host validation should therefore check active config/profile/managed requirements for legacy `untrusted` approval-policy references before treating startup failures as an installation defect. The project-level `trust_level = "untrusted"` setting is separate and remains supported.

## QA

### PASS

- Current official `Using Codex with your ChatGPT plan` guidance rechecked.
- Current official `How banked Codex resets work` guidance independently rechecked.
- Both current official pages agree that a full banked reset changes the weekly reset date.
- The earlier contradictory Dex statement is explicitly superseded rather than silently deleted from history.
- Existing Dex subscription-first and no-automatic-paid-fallback policy preserved.
- No account reset redeemed, no paid credit purchased, no billing change performed.
- No Runtime execution capability, permission or provider authentication changed.

### FAIL

- None in the documentation and policy scope.

### Not Checked

- Whether Ethan's current Pro account has an active promotion or banked reset.
- Exact expiration or reward terms for any account-specific promotion.
- The exact new weekly reset timestamp that would result from redemption on Ethan's account.
- Whether the approved local Codex host contains any legacy `approval_policy = "untrusted"` reference.
- Why the public Help wording differed between the 03:29 KST snapshot and the later 04:32-04:35 KST recheck.

## Handoff

If a future OpenAI announcement, profile-menu offer or Settings → Usage screen shows a new reset or referral benefit, capture only the non-sensitive offer terms needed for decision-making. Re-check the two official reset guidance pages immediately before recommending redemption. Compare the value of using versus preserving the reset, including the effect of moving the weekly reset date. Do not redeem automatically.

For the pending approved-host Codex validation, check for legacy `approval_policy = "untrusted"` references in user config, active profiles, managed requirements and CLI arguments before diagnosing startup failure.

## Official sources

- OpenAI Help — Using Codex with your ChatGPT plan: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- OpenAI Help — How banked Codex resets work: https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work
- OpenAI Codex usage limits: https://developers.openai.com/codex/usage

## Watchdog verdict

`PASS_WITH_ACCOUNT_ELIGIBILITY_NOT_CHECKED` — current official reset mechanics are cross-checked and the latest public guidance says a full banked reset changes the weekly reset date. Dex now treats this provider policy as volatile and re-verifies it before redemption decisions. Account-specific eligibility, the resulting reset timestamp, and approved-host legacy approval-policy state remain Not Checked.
