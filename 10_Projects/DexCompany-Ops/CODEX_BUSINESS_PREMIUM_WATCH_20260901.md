# Codex / ChatGPT Business Premium usage watch — 2026-09-01

- Checked at: 2026-09-01 16:27 KST
- Scope: official OpenAI pricing/usage change relevant to Codex capacity and Dex subscription-first policy
- Classification: pricing / usage / workspace capacity
- Operational action: **watch-only; no plan, seat, credit, API, or fallback change**

## Official evidence

OpenAI Help now introduces **Premium seats for ChatGPT Business** alongside Standard seats.

- Premium: USD 100 per user/month when billed annually, or USD 125 per user/month when billed monthly.
- OpenAI states Premium provides **5x more usage than Standard** and **no 5-hour usage limit**.
- Standard and Premium seats both include ChatGPT and Codex; Premium has higher usage limits.
- A Business workspace still requires at least 2 paid Standard/Premium seats; seat types can be mixed.
- Flexible pricing/workspace credits can extend usage beyond included limits, but that is a separately paid path and is not authorized by Dex subscription-first policy.
- Legacy Codex seats remain a separate historical Business seat type for eligible older workspaces and are credit-funded rather than fixed-fee included usage.

Official sources:

- https://help.openai.com/en/articles/8792536-managing-billing-and-seats-in-chatgpt-business
- https://help.openai.com/en/articles/8542115
- https://help.openai.com/en/articles/20001492

## Cutoff check against the previous Codex provider watch

`confirmed`:

- The latest official non-prerelease Codex release remains `0.152.0`.
- The newest merged `openai/codex` commit visible in the current check remains PR #41980 / `e017e93aceafb2fe04bed1c926e448a5fb4f913d` (`Preserve raw response usage metadata`), which was already handled by the previous provider-watch run.
- No newer merged Codex implementation change was found after that previous cutoff.
- The meaningful newly observed delta in this run is therefore the official Business pricing/usage documentation, not a new Codex binary/model/App Server capability.

Because the Help article is a mutable web document, this record does not infer an exact product-launch timestamp beyond the official page being updated and presenting the Premium-seat offer during this check.

## Dex comparison

Current approved repositories at check time:

- Wiki `main`: `55fad51e85a034e3a4f34aceb764510985dc1c75`
- Runtime `main`: `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- Runtime PR #63 has already merged the bounded Unified Task Phase-1 execution core while explicitly leaving unattended Production consumption, hosted writes, paid fallback, automatic extra usage, multi-writer, and `danger-full-access` disabled.

Existing Dex policy already matches the safe response to the pricing change:

- subscription-first remains mandatory;
- paid API and automatic paid fallback remain disabled;
- credits, extra usage, banked resets, seat purchases, and plan changes require explicit owner approval;
- capacity should be optimized by low-rework capability routing rather than duplicated agent execution.

No Runtime code or permission change is needed for this pricing update.

## Classification

### confirmed

- OpenAI officially documents Standard and Premium Business seats with the prices and included Codex access above.
- Premium is documented as 5x Standard usage with no 5-hour usage limit.
- Business has a two-paid-seat minimum and supports mixed Standard/Premium seat allocation.
- Optional workspace credits are a paid extension beyond included limits.

### inference

- Premium can become a relevant fixed-subscription capacity option for a multi-seat Business workspace with sustained high Codex/ChatGPT usage.
- It is not automatically cheaper or more efficient than the current Dex operating path because total value depends on actual usage, required seat count, workspace needs, and the user’s current subscription economics.
- Premium should not be treated as quota arbitrage or as authority to duplicate Work/Codex/agent execution.

### proposal

Only evaluate Business Premium when there is an explicit owner request or sustained measured usage pressure. Before any plan decision, compare:

1. current included usage actually consumed;
2. frequency and business cost of quota blocking;
3. required number of paid seats and annualized total cost;
4. whether Standard/Premium workspace controls provide operational value beyond raw usage;
5. current official pricing/limits and the actual account/workspace Billing/Usage UI immediately before purchase.

Default outcome remains **no purchase / no plan migration / no credit use**.

### unknown

- Exact model/task-specific included-unit quantities behind “5x more usage” are not specified in the cited billing article.
- The long-term relationship between Business Premium limits and all shared agentic-allowance surfaces may change and must be revalidated at decision time.
- This watch does not establish that Business Premium is economically superior for the current Dex owner/workspace.

## Safety boundary

Do not automatically:

- purchase or assign Premium seats;
- create/migrate a Business workspace;
- buy workspace credits or enable automatic reload/top-up;
- switch billing cadence;
- enable paid API or automatic paid fallback;
- increase duplicate agent execution to consume additional capacity;
- change Codex stable target, permissions, plugin state, or Runtime execution authority because of this pricing change.

## Verification

- Official OpenAI Business billing source: **PASS**
- Independent official OpenAI Business FAQ corroboration: **PASS**
- Latest Codex release remains 0.152.0: **PASS**
- New post-#41980 merged Codex implementation change: **none found**
- Dex subscription-first policy compatibility: **PASS / no code change required**
- Current-account/workspace Premium eligibility and Billing UI: **Not Checked**
- Premium-vs-current-plan economic break-even: **Not Checked**
- Any purchase, migration, credit use, or paid fallback: **Not Performed**
