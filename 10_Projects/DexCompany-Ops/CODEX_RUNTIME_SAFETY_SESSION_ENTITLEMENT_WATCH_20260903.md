# Codex runtime safety, session recovery, entitlement, and surface-parity watch — 2026-09-03

Status: canonical provider-watch evidence / watch-only. No prerelease/experimental capability, paid API, automatic paid fallback, credit/reset purchase, permission expansion, destructive migration, browser/computer-use path, Skill/Plugin installation/deletion, external messaging, provider-state repair, model reroute, or deployment behavior is enabled by this document.

## Cutoff and official baseline

This watch starts after the prior Dex cutoff at OpenAI Issue #42477. A fresh official `openai/codex` main/merged-PR check found no commit after PR #42458 at this cutoff. The latest confirmed non-prerelease Codex release remains `0.153.0`.

OpenAI's current model guidance remains GPT-5.6 Sol for complex reasoning/coding, Terra for intelligence/cost balance, and Luna for cost-sensitive/high-volume work. OpenAI's current Plus/Pro credit guidance says included usage is consumed before eligible credits and supported Codex/Work/Excel/Workspace Agents share the agentic allowance/credit pool. Those official policy pages remain authoritative over a single client error or issue report.

## Raw candidates after the prior cutoff

- #42478/#42479 — managed Codex Cloud GitHub Review progress comments can create notification/automation noise.
- #42480 — destructive test setup reportedly inherited a production DB target and dropped/recreated tables.
- #42481 — Linux Desktop Skill `@` picker missing although installed Skills work on web.
- #42482 — built-in `gpt-image-2` reports `403 INSUFFICIENT_BALANCE` while included weekly Codex usage remains.
- #42483 — interrupted paginated CLI thread can retain stale `inProgress` state and make resume/fork unusable.
- #42484 — Windows Desktop `cua_node` staging rename can retry repeatedly, hang the UI, and consume large disk space.
- #42485 — macOS browser initialization can fail because the trusted Node process exits before browser selection.

## Confirmed issue signals and Dex classification

### #42480 — destructive test against production data target

`confirmed signal / incident causality and upstream fix unknown`

OpenAI Issue #42480 is open and labeled `bug`, `sandbox`, and `CLI`. The reporter states that a test fixture using SQLAlchemy `Base.metadata.drop_all(engine)` inherited a production deployment environment and dropped/recreated production PostgreSQL tables. The exact Codex decision path, environment provenance, and maintainer-confirmed root cause/fix are not established.

Dex policy implication:

- the label "test" never lowers risk by itself; resolved target, environment provenance, and destructive semantics determine risk;
- DB/schema destructive commands and equivalent ORM operations must fail closed unless the target is proven disposable/synthetic;
- production-like, shared, external, or unknown targets require explicit Ethan approval plus independent verification before any destructive mutation;
- disposable test execution must not silently inherit production credentials/config;
- no automatic replay, provider failover, sandbox widening, or data recovery mutation is authorized after ambiguous destructive execution.

Official source: https://github.com/openai/codex/issues/42480

### #42484 — Windows runtime staging retry can hang UI and exhaust disk

`confirmed signal / root cause and fix unknown`

OpenAI Issue #42484 is open and labeled `bug`, `windows-os`, `app`, and `performance`. On Windows Desktop `26.901.1978.0`, the reporter observed repeated `rename_staging` `EPERM` failures while materializing bundled `cua_node`; 591 staging directories and about 58.96 GB of growth were reported before manual remediation. The bundled CLI in the report is `0.153.0-alpha.5`, so this is not proof that standalone `0.153.0` stable has the same behavior.

Dex policy implication:

- approved Windows-host E2E must treat repeated runtime-materialization failure as bounded no-progress and stop the attempt before runaway disk growth or duplicate worker creation;
- record Desktop/runtime version and free-disk headroom before mutation-heavy work;
- do not automatically delete runtime directories, bypass file locks/antivirus, downgrade/reinstall the app, or manually materialize bundled runtimes;
- canonical Task/checkpoint survives provider UI/runtime failure and remains the recovery authority.

Official source: https://github.com/openai/codex/issues/42484

### #42483 — interrupted paginated thread can remain logically `inProgress`

`confirmed signal / root cause and fix unknown`

OpenAI Issue #42483 is open and labeled `bug`, `TUI`, `CLI`, and `session`. A macOS user on Codex CLI `0.153.0` reports a force-closed active paginated thread remaining persisted as `inProgress` despite no live process or writer lock; `resume` then cannot resolve the session and `fork` can create a child record whose TUI never becomes usable.

Dex policy implication:

- provider `inProgress` is recovery metadata, not proof that a Dex writer is alive;
- actual writer/lease/attempt/checkpoint state must be reconciled before resume/fork;
- ambiguous provider recovery must not create multiple forks/writers or auto-edit/delete provider SQLite/JSONL;
- recovery must preserve the same canonical Task and already accepted requirements.

Official source: https://github.com/openai/codex/issues/42483

### #42482 — built-in image entitlement mismatch

`confirmed signal / entitlement root cause unknown`

OpenAI Issue #42482 is open and labeled `bug`, `rate-limits`, `app`, and `imagen`. A ChatGPT Pro user reports Codex Desktop `0.152.1` built-in `gpt-image-2` returning `403 INSUFFICIENT_BALANCE` while the dashboard still showed about 21% weekly included usage remaining.

OpenAI's current Plus/Pro credit guidance says included usage is used first and credits extend supported usage after included limits. Current rate-card/help content lists GPT-Image-2 activity within supported Codex/Work usage. This is therefore an entitlement/metering inconsistency signal, not evidence of a new billing rule.

Dex policy implication:

- a capability-level balance error never authorizes credit purchase, reset use, paid API fallback, or API-key image generation;
- when official Usage state/policy and a capability error conflict, classify the capability `unknown` and fail closed on cost expansion;
- image generation is outside the current #28/#34/#35 core execution path, so this does not block the current Windows E2E.

Official sources:
- https://github.com/openai/codex/issues/42482
- https://help.openai.com/en/articles/12642688-using-credits-for-flexible-usage-in-chatgpt-freegopluspro-sora
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

### #42481 — installed Skill not invocable from Linux Desktop composer

`confirmed signal / surface-specific fix unknown`

OpenAI Issue #42481 is open and labeled `bug`, `app`, and `skills`. The same installed/enabled Skills work from chatgpt.com but the Linux Desktop `@` picker does not open.

Dex policy implication:

- provider package installation state, surface discovery/picker state, and actual Skill invocation are separate capability checks;
- Linux Desktop Skill parity remains `Not Checked`; web fallback is acceptable only if it preserves the same canonical Task and adds no permission/cost expansion.

Official source: https://github.com/openai/codex/issues/42481

### #42479 — managed Cloud review progress comment noise

`confirmed signal / screened for current execution path`

OpenAI Issue #42479 is open and labeled `bug`, `code-review`, and `codex-web`. The reporter says managed Codex Cloud review creates/updates a top-level `Codex Review Summary` progress comment while review is still running, producing notification/automation noise. Duplicate #42478 adds no separate Gate.

Dex policy implication:

- if managed Codex Cloud review is adopted later, progress comments are non-authoritative UI/progress state and cannot mark verifier completion or authorize merge;
- current Dex verification remains commit/diff/CI/evidence bound, so no capability change is needed now.

Official source: https://github.com/openai/codex/issues/42479

### #42485 — browser trusted-Node initialization crash

`confirmed signal / screened dark horse`

OpenAI Issue #42485 is open and labeled `bug`, `app`, and `browser`. The report concerns macOS `0.153.0` Chrome/browser initialization failing before browser selection. Browser/computer-use is disabled in the current Dex core path, so this remains portability evidence only and authorizes no browser/network/permission change.

Official source: https://github.com/openai/codex/issues/42485

## Canonical Dex comparison

The approved AI Contract already requires One Task ID / one active mutation writer, risk-based independent verification, durable Result before callback, subscription-first execution, explicit approval for high-risk side effects, and fail-closed behavior when current capability/cost state is ambiguous. Those invariants directly mitigate the new signals and should be preserved.

The current functional Gate remains unchanged:

- Runtime #28: Phase 1 PASS / Phase 2 PASS / Phase 3 implementation merged / approved Windows-host E2E `Not Checked`.
- Runtime #34 and #35 remain blocked until #28 passes.
- Paid API, automatic paid fallback, extra paid usage, hosted MCP writes, unattended Production execution, multi-writer, browser/computer-use, `danger-full-access`, and automatic merge/deploy remain disabled.

## Required future checks

### Runtime #28

- synthetic destructive-data target classification: destructive test fixture against production-like/unknown target must fail closed with mutation 0;
- explicit approval + independent verifier for any non-disposable destructive data/schema action;
- Windows runtime staging/relocation bounded no-progress, disk-growth, and restart canary;
- no automatic provider runtime directory/SQLite/config/data repair during ambiguous recovery.

### Runtime #34

- distinguish Skill canonical package, provider install, surface picker/discovery, and actual invocation;
- entitlement error conflicting with included Usage remains `unknown` and cannot trigger credit/reset/API fallback;
- any future managed Cloud review flow ignores progress comments as completion/merge authority.

### Runtime #35

- reconcile live writer/lease against provider `inProgress` before resume/fork;
- interrupted paginated session recovery preserves one canonical Task/checkpoint and creates no duplicate writer/fork storm;
- provider recovery requires no user requirement re-entry and performs no automatic provider-state mutation.

## Status

- Fresh official main/merged-PR check after #42458: PASS — no newer merge found at this cutoff
- Latest non-prerelease Codex: PASS — `0.153.0`
- #42480/#42481/#42482/#42483/#42484/#42485 issue existence/state/labels: PASS
- #42479 review signal: PASS; #42478 duplicate screened
- Maintainer-confirmed root cause/fix for the new issue signals: Not Checked
- Approved Windows-host destructive-target/runtime-staging E2E: Not Checked
- Interrupted paginated session recovery canary: Not Checked
- Linux Skill surface parity: Not Checked
- Built-in image entitlement consistency on Ethan's account: Not Checked
- Canonical behavior/config/model/permission/billing activation from this evidence: 0
