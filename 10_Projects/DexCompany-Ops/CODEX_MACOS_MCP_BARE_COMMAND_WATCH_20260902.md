# Codex macOS MCP Bare-Command Spawn Watch — 2026-09-02

- Status: Canonical provider-watch evidence
- Evidence scope: OpenAI Codex upstream after Runtime PR #100 cutoff
- Latest official non-prerelease Codex at this cutoff: `0.152.1`
- Dex operational gate change: none

## Official sources

- OpenAI Codex PR #42192 — Use native spawning for bare macOS MCP commands: https://github.com/openai/codex/pull/42192
- OpenAI review thread on PR #42192 — fatal PATH-error handling concern: https://github.com/openai/codex/pull/42192#discussion_r3910431930
- OpenAI Codex PR #42194 — Add Vim replace mode to the TUI composer: https://github.com/openai/codex/pull/42194
- Official Codex `0.152.1`: https://github.com/openai/codex/releases/tag/rust-v0.152.1
- Official ChatGPT & Codex changelog: https://learn.chatgpt.com/docs/changelog

## Finding 1 — PR #42192 macOS MCP bare-command spawning

### confirmed

OpenAI merged PR #42192 on 2026-09-02. It extends the macOS MCP native-spawn path introduced for relative executables so bare executable names are also eligible.

The merged behavior:

- searches the child process's configured `PATH` for bare command names;
- preserves empty PATH entries;
- uses `/usr/bin:/bin` when child `PATH` is unset;
- preserves `argv[0]`, script spelling, cwd, environment, piped stdio and process-group behavior;
- retains the existing command launcher as fallback for failed searches and executable text without a shebang;
- adds coverage for child-PATH resolution, default PATH lookup, launch errors and shebang-free fallback.

### confirmed · caution

The merged PR still has an unresolved, non-outdated P2 review thread. The review points out that the native PATH loop continues after `ELOOP` or `ENAMETOOLONG` from an earlier PATH candidate even though `Command`/`execvp` treats those lookup results as fatal. In that edge case a later same-named executable could be selected instead of stopping/falling back at the fatal earlier candidate.

No separate merged follow-up correcting that exact review concern was identified at this cutoff.

### inference

Bare-command native spawning can improve portability and reduce macOS MCP startup/fork-related failures if Dex later introduces an approved Mac worker. The unresolved fatal-PATH edge case means PR #42192 must not be promoted as deterministic executable-selection or security evidence yet.

### proposal

Keep the approved Windows worker baseline unchanged. Treat PR #42192 as future-stable/macOS-host evidence only. Before any Mac-worker promotion, require stable inclusion plus explicit executable-selection tests for PATH ordering, empty/unset PATH, `ENOENT`, `ENOTDIR`, `EACCES`, `ELOOP`, `ENAMETOOLONG`, shebang-free fallback and orphan-process cleanup.

The unresolved upstream review must either be resolved/superseded by an upstream fix or be explicitly demonstrated harmless in the containing stable before Dex relies on bare-command native spawning.

### unknown

- first official non-prerelease stable containing #42192;
- whether OpenAI changes the fatal PATH-error behavior before that stable;
- approved macOS-host reliability/latency benefit for Dex MCP servers;
- final stable process-launch contract across Mac surface variants.

## Finding 2 — PR #42194 Vim Replace mode

### confirmed

PR #42194 adds Vim Replace mode (`R`) to the Codex TUI composer, including grapheme overwrite, Backspace restoration, undo/dot-repeat integration, attachment/completion/paste/history behavior and configurable `vim_normal.enter_replace_mode` binding.

### assessment

This is an optional local-TUI productivity improvement. It does not change Dex Task/Result authority, orchestration, security model, Windows worker behavior, App Server/MCP authority, Work/mobile gate, or subscription cost policy. No Dex Runtime setting/keymap change is warranted before stable inclusion.

## Dex optimization actually applied

Runtime PR #102 records the #42192/#42194 watch as one documentation-only file and was merged after validation.

- Runtime PR #102: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/102
- Runtime merge: `c7626559f6ad20615716e0449da8b83eb61f6bef`
- Runtime validation `33588445625`: PASS — dependency install, static checks, unit tests, smoke test and production dependency audit all passed.
- Merge Vercel: PASS — deployment completed.
- Runtime Issue #80 was extended with #42192 stable/macOS E2E gates and the unresolved PATH-selection concern.
- Runtime Issue #25 was updated to track #42194 as optional TUI productivity only.

No Runtime code, MCP server path/PATH/cwd/configuration, provider setting, permission, plugin/Skill state, billing path, current Windows worker, or deployment behavior was intentionally changed by the provider-watch document.

## Acceptance gates

- [ ] identify first official non-prerelease stable containing #42192;
- [ ] re-check #42192 unresolved review thread and any follow-up fix before Mac promotion;
- [ ] approved macOS host resolves bare executable strictly against configured child PATH semantics;
- [ ] empty PATH entries and unset-PATH default are preserved as intended;
- [ ] `ENOENT`/`ENOTDIR`/`EACCES` fallback behavior is deterministic;
- [ ] `ELOOP`/`ENAMETOOLONG` cannot lead to unintended later same-named executable execution;
- [ ] relative/bare `argv[0]`, script spelling, cwd, environment, stdio and process-group behavior is preserved;
- [ ] shebang-free fallback has no shell-interpretation surprise or permission widening;
- [ ] cancellation/restart/shutdown leaves orphan MCP child count at zero;
- [ ] launch errors/fallbacks cause zero duplicate Task, mutation, worker execution or canonical Result;
- [ ] approved Mac-worker result is recorded PASS/FAIL/Not Checked before promotion.

## Safety boundary

- prerelease/experimental activation: 0
- current Windows worker replacement or Mac worker promotion: 0
- MCP executable/PATH/cwd/server-config mutation: 0
- broader network/filesystem/OAuth/MCP permission: 0
- plugin/Skill auto-install/update/reconcile/delete or legacy removal: 0
- paid API/automatic paid fallback/extra paid usage: 0
- external messaging/destructive migration: 0

GitHub Task ID, `attemptId`, explicit approval where required, mutation lock, project identity, canonical Result/receipt and detached verifier remain Dex authority.

## Verification state

- Official PR #42192 metadata/diff: **PASS**
- Official #42192 unresolved/non-outdated P2 review identified: **PASS**
- Official PR #42194 operational screening: **PASS**
- Latest official non-prerelease Codex: **PASS — 0.152.1**
- Runtime PR #102 scope: **PASS — one Markdown file, no Runtime code/config change**
- Runtime validation `33588445625`: **PASS**
- Runtime merge Vercel: **PASS**
- FAIL: **none**
- #42192 containing future stable: **Not Checked**
- approved macOS-host E2E: **Not Checked**
- specific upstream fatal-PATH concern resolution/follow-up: **Not Checked**
- Runtime merge-SHA separate post-merge GitHub Actions: **Not Checked — no separate run returned**

## Canonical-state note

The functional Dex gate is unchanged: Runtime #28 Phase 3 implementation is merged but approved Windows-host E2E remains Not Checked, so #34/#35 stay blocked. Root aggregate state/head pointers are intentionally not rewritten for every provider-watch commit; Wiki Issue #55 remains the bounded reconciliation tracker. This watch preserves unrelated historical and user changes.
