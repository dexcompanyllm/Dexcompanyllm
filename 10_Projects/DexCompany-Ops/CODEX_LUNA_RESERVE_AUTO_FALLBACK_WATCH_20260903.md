# Codex Luna Reserve automatic fallback evidence — 2026-09-03

## Official upstream evidence

Sources:

- https://github.com/openai/codex/pull/42372
- https://help.openai.com/en/articles/20001499-luna-reserve-in-codex-and-chatgpt-work
- https://github.com/openai/codex/releases/tag/rust-v0.152.1

### confirmed — OpenAI Codex PR #42372

OpenAI merged PR #42372 on 2026-09-02 21:53:12 UTC. The Codex TUI gains an automatic Luna Reserve path for eligible accounts when an authoritative account-usage read says ordinary included usage is unavailable.

The merged behavior:

- automatically transitions eligible TUI tasks to the backend-provided Luna Reserve quota after ordinary included usage is exhausted;
- preserves the task's previous model and reasoning effort so they can be restored after a fresh authoritative read confirms ordinary-usage recovery;
- constrains model/reasoning selection while Reserve is active to Reserve-supported choices;
- preserves the model already accepted by queued turns rather than silently rewriting those queued requests;
- surfaces Reserve usage in composer and `/status`;
- adds nullable `normalModelSlug` to App Server rate-limit snapshots so a client can use the normal model's display/reasoning metadata for a quota alias without changing the request model;
- increases account-limit polling near exhaustion.

Upstream App Server documentation says missing `normalModelSlug` is `null`. This metadata does not grant model access.

OpenAI's official Luna Reserve guidance says Reserve is available only to selected personal Plus/Pro accounts, availability can change, it provides a separate finite GPT-5.6 Luna allowance after regular usage is exhausted, it is not API credit or a purchase, it does not restore regular usage, and it does not unlock the most capable models.

Latest official non-prerelease Codex remains `0.152.1`; PR #42372 is future-stable evidence only.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was `bff986d216c0caa3b127aed7c4014f0aab482003`.
- Runtime PR #130 merged as `cb5872dbdbe3d5da38653fc88e11bc07b355c40e`.
- Runtime PR #130 is docs-only: one new watch file; no Runtime executable code/configuration, model routing, Plugin/Skill state, permissions, billing, or deployment logic changed.
- Final Runtime branch validation `33688021151` PASS: dependency install, static checks/unit tests/smoke, and production dependency audit all PASS.
- Runtime branch Vercel status PASS before merge.
- Runtime #37 now tracks #42372 as a future-stable subscription/capability gate; Runtime #34 tracks effective-model and Work/Desktop/mobile parity evidence.
- Dex remains subscription-first and keeps paid API, automatic paid fallback, automatic extra usage, credit purchase, banked reset consumption, hidden model substitution, and duplicate quota-arbitrage execution disabled.

### inference

Luna Reserve can improve continuity for an eligible personal Plus/Pro subscription because it is a separate included allowance rather than API credits. But PR #42372 makes the provider-side behavior automatic in TUI and changes the effective model/capability state to GPT-5.6 Luna under quota pressure.

Therefore Dex should not treat Reserve as transparent continuation. The provider may switch its surface automatically, but Dex must independently bind entitlement and effective model/quota to the authenticated account plus Task/attempt, then re-run capability routing before protected mutation or publication continues.

### proposal — tracked, not enabled

After the first official non-prerelease stable containing PR #42372, approved-host/surface E2E should require:

- account/user identity match before Reserve entitlement is trusted;
- `ordinaryUsageAllowed=false` plus Reserve eligibility is capability evidence, not billing/approval authority;
- `normalModelSlug` remains display/reasoning metadata only and cannot authorize access, provider selection, billing, or a hidden model switch;
- any provider-side Reserve transition is detected before the next protected mutation/publication, with actual effective model/quota persisted in the same Task attempt and Dex capability routing re-run;
- unknown, conflicting, or insufficient effective capability checkpoints to `blocked-capability` or `blocked-quota` with protected mutation/publication count 0;
- queued/reconnected turns cannot create duplicate worker, turn, commit, canonical Result, or callback;
- ordinary-usage recovery requires a fresh identity-bound read and any saved model restoration must still be present in the current authenticated catalog and permitted by Dex policy;
- account/workspace changes invalidate saved Reserve/restore state;
- Reserve availability never authorizes paid API, purchased credits, banked-reset redemption, plan upgrade, broader permissions, or duplicate execution;
- any future decision to make Reserve automatic in Dex needs a separate stable-policy activation after capability and quality E2E.

## unknown / Not Checked

- first non-prerelease stable containing PR #42372;
- current user's Luna Reserve eligibility and remaining Reserve allowance;
- Work/Desktop/mobile parity with TUI automatic fallback;
- approved-host effective-model / `normalModelSlug` parity E2E;
- protected-task behavior when ordinary allowance expires mid-turn or between queued turns;
- capability/quality parity of GPT-5.6 Luna for protected Dex workloads;
- Runtime merge-SHA Vercel status at the moment this evidence file was created;
- Wiki automated CI for this one-file evidence change.

## Safety boundary

No Luna Reserve capability or automatic model switching was enabled. No prerelease/experimental capability, paid API, automatic paid fallback, credits/reset consumption, plan change, broader permission, hosted MCP write, Plugin/Skill mutation, multi-writer execution, destructive migration, deploy change, or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42372 merge/scope | PASS |
| App Server `normalModelSlug` semantics | PASS |
| Official Luna Reserve policy cross-check | PASS |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #130 scope | PASS — docs-only, one file |
| Runtime validation `33688021151` | PASS |
| Runtime branch Vercel | PASS |
| Runtime PR #130 merge | PASS — `cb5872dbdbe3d5da38653fc88e11bc07b355c40e` |
| Approved-host Luna Reserve capability/model E2E | Not Checked |
| Work/Desktop/mobile Reserve parity | Not Checked |
| Automatic Dex Reserve activation | Not Enabled |
| Wiki automated CI | Not Checked |
