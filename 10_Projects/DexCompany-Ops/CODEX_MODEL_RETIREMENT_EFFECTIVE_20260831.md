# Codex model retirement effective-date check

- Date: 2026-08-31 (Asia/Seoul)
- Scope: OpenAI/Codex official-source watch and Dex Company model-routing readiness
- Status: `PASS_WITH_HOST_VERIFICATION_REQUIRED`
- Canonical Runtime baseline reviewed: `44d99df4b05ece108bd87aa6db9cfe4de566eca8`
- Canonical Wiki baseline reviewed: `b89f8f740670f41021023515b0fa3ed4a11cf7e1`

## Executive decision

OpenAI's announced retirement date for ChatGPT-authenticated Codex use of `gpt-5.4` and `gpt-5.4-mini` is now 2026-08-31. Dex already has the correct fail-closed migration policy, so no Runtime code or model default change is justified by the calendar transition alone.

Dex must continue to treat the authenticated App Server `model/list` as the live authority. Do not assume the source models disappeared at a specific local clock time because OpenAI does not publish a cutoff timezone in the cited guidance.

The next operational priority remains Runtime Issue #17 on the approved Pro host: run `codex:doctor`, `codex:compatibility`, and `codex:status`, record the real post-retirement catalog, and require `retirementReady: true` before dependent worker E2E gates advance.

## Confirmed

1. OpenAI's Codex changelog says that on August 31, 2026, GPT-5.4 and GPT-5.4 mini are no longer available in Codex for users signed in with ChatGPT, with official replacements:
   - `gpt-5.4` → `gpt-5.6-terra`
   - `gpt-5.4-mini` → `gpt-5.6-luna`
2. OpenAI Help repeats the same retirement and explicitly says to update workspace defaults, saved model settings, managed configurations, or automations before August 31.
3. The latest non-prerelease `openai/codex` release remains `0.151.0`.
4. `0.152.0-alpha.4` is a prerelease and does not satisfy the Dex approved stable-host gate.
5. Current Dex Runtime `workers/openai-codex/src/model-policy.mjs` already:
   - maps explicit legacy model requests only to the official replacement;
   - overrides a legacy default only when the official replacement exists;
   - fails closed when the replacement is absent;
   - uses authenticated `model/list` evidence instead of selecting an arbitrary fallback.
6. Current Runtime tests already cover legacy GPT-5.4→Terra and GPT-5.4 mini→Luna migration, missing-replacement failure, and plan-aware retirement readiness.

## Inference

- The retirement date has become operationally urgent, but the actual account-side removal moment cannot be inferred from Asia/Seoul midnight alone because the official sources do not specify a cutoff timezone.
- Dex's catalog-evidence-based policy is safer than adding a hard-coded time-based rejection rule. It remains correct even if OpenAI removes models gradually or a catalog briefly exposes a retired source during rollout.

## Proposal adopted

- Keep recommended stable target at `0.151.0` until a newer non-prerelease release passes the normal Dex compatibility gate.
- Keep `0.152.0-alpha.*` disabled/watch-only.
- Do not add date-driven model-selection code.
- Treat the first approved-host post-retirement `model/list` as the decisive operational evidence.
- If the approved Pro catalog still exposes a retired source, Dex should continue routing requests to the official replacement and record the source/replacement pair in Issue #17 evidence rather than assuming provider failure.
- If a retired source is exposed without its official replacement, keep `retirementReady: false` and block dependent worker activation.

## Upstream watch since the last tracked Guardian change

OpenAI `main` has additional changes after the previously tracked first-Node-REPL Guardian fast-start commit:

- `da23e131e68b171909407f469da1b2f72d9c4f4a` — repairs cursor-style rendering on older JediTerm terminals.
- `88f776588f5e73467e7659c268f8358a9a2378b6` — sets explicit working directories for environment-backed MCP test fixtures.

These are confirmed upstream `main` changes, but neither is stable capability evidence and neither justifies a Dex feature activation or Runtime behavior change now.

## Official-document edge case

The current OpenAI Business/Enterprise/Edu rate card simultaneously states that GPT-5.4 retires in ChatGPT-authenticated Codex on August 31 and lists `Auto review` as using GPT-5.4. The public source does not explain whether Auto review is provider-managed and exempt from user-selectable model retirement or will be migrated separately.

Classification: `unknown` for Dex. Dex does not depend on this provider-internal Auto review model assignment, so no Runtime change is made. Re-check only if OpenAI changes the Auto review contract or Dex begins to depend on it.

## QA

### PASS

- Official OpenAI retirement mapping rechecked.
- Latest non-prerelease release rechecked: `0.151.0`.
- Prerelease boundary rechecked: `0.152.0-alpha.4` remains prerelease.
- Current canonical Runtime model policy inspected.
- Existing migration/fail-closed tests inspected.
- No paid API, automatic paid fallback, prerelease activation, permission expansion, legacy Skill/Plugin removal, or destructive migration performed.

### FAIL

- None in the source-review and canonical-policy scope.

### Not Checked

- Actual post-retirement Pro `model/list` on Ethan's approved host.
- Exact provider-side cutoff timezone/time.
- Approved-host `codex:doctor` → `codex:compatibility` → `codex:status` after the retirement takes effect for the account.
- Whether OpenAI's provider-managed Auto review has already migrated away from GPT-5.4 internally.

## Handoff

On the approved Windows Pro host, use the existing Issue #17 sequence and record the post-retirement evidence without changing paid/subscription policy:

```powershell
npm.cmd run codex:doctor
npm.cmd run codex:compatibility
npm.cmd run codex:status
```

Required evidence:

- stable Codex version and Doctor status;
- `account/read.type=chatgpt`;
- real `model/list` entries for Terra/Luna/Sol as exposed to the Pro account;
- legacy source presence/absence;
- `modelCatalog.retirementReady` and worker `ready`;
- API-key/paid-fallback absence.

Do not advance Runtime #18 or #28 solely because the calendar date has changed; #17 approved-host evidence must still PASS.

## Official sources

- OpenAI Codex changelog — retirement announcement and current stable changelog: https://developers.openai.com/codex/changelog
- OpenAI Help — Using Codex with your ChatGPT plan: https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- OpenAI Help — GPT-5.6 in ChatGPT / Codex availability: https://help.openai.com/en/articles/20001354
- OpenAI rate card — current Codex retirement and model/feature rates: https://help.openai.com/en/articles/11481834-chatgpt-rate-card-business-enterpriseedu
- OpenAI Codex latest stable release: https://github.com/openai/codex/releases/tag/rust-v0.151.0
- OpenAI Codex prerelease `0.152.0-alpha.4`: https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.4
- OpenAI upstream JediTerm fix: https://github.com/openai/codex/commit/da23e131e68b171909407f469da1b2f72d9c4f4a
- OpenAI upstream environment-MCP test cwd change: https://github.com/openai/codex/commit/88f776588f5e73467e7659c268f8358a9a2378b6

## Watchdog verdict

`PASS_WITH_HOST_VERIFICATION_REQUIRED` — Dex's existing catalog-driven migration is already safer than a date-only switch. The meaningful change is the retirement date becoming current; the only missing decisive evidence is the real approved-host post-retirement model catalog and worker readiness.