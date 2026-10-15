# Codex Guardian / Sandbox / Plugin / Windows watch — 2026-09-04

- Evidence type: source-backed watch record with Dex inference/proposal separated below.
- Previous cutoff baseline: Wiki `main` `99de7ba0d827c1a5a395c67b046a9f1c7a53fa1f`; Runtime `main` `34421e4491ff7e1714445e56b6382c61a99bbcdc`.
- Official non-prerelease Codex at this cutoff: `0.153.0` (published 2026-09-03).
- No capability is activated by this record.

## Raw source candidates

### Merged upstream changes

1. **OpenAI Codex PR #42588 — Require Guardian review for incompatible compaction checkpoints**
   - Merged `2026-09-03T17:50:36Z`.
   - Records the producer model compatibility hash on compaction history and exposes the latest checkpoint hash.
   - In thread-owned context mode, missing/incompatible checkpoint provenance fails closed and requires synchronous Guardian review rather than allowing cached/asynchronous approval to omit compacted context.
   - Tests cover local, remote, resumed, compacted and rolled-back histories with matching/mismatched/missing/empty hashes.
   - https://github.com/openai/codex/pull/42588

2. **OpenAI Codex PR #42590 — Harden the macOS sandbox against terminal input injection**
   - Merged `2026-09-03T18:02:33Z`.
   - Adds a Seatbelt `file-ioctl` denial for `TIOCSTI` so a sandboxed child cannot queue terminal input into the unsandboxed controlling shell.
   - Adds a macOS PTY test that confirms sandbox rejection with `EPERM`.
   - https://github.com/openai/codex/pull/42590

3. **OpenAI Codex PR #42593 — Reload user config after local plugin installation**
   - Merged `2026-09-03T18:23:18Z`.
   - Loaded threads reload user config after a local plugin install; MCP/hook runtimes refresh only after the new configuration is applied.
   - Installation remains successful if reload fails, with the reload failure logged.
   - Tests cover a plugin MCP tool becoming callable from a pre-existing thread and staged hook config applying to the loaded session.
   - https://github.com/openai/codex/pull/42593

4. **OpenAI Codex PR #42596 — Record Windows sandbox private desktop usage**
   - Merged `2026-09-03T18:27:36Z`.
   - Adds `codex.windows_sandbox.private_desktop` telemetry tagged with whether private desktop isolation is enabled.
   - This is observability, not proof of behavior change or isolation correctness.
   - https://github.com/openai/codex/pull/42596

### Issue signals

1. **#42589 — Windows VS Code multi-window hydration / active-writer conflicts**
   - Reporter: Windows 11, IDE extension `26.825.51511`, bundled `0.151.0-alpha.7.2`.
   - Distinct chats in separate VS Code windows reportedly cause background hydration/resume loops, thousands of resume events, `already has an active writer` conflicts, stale history and failed queued follow-ups even though the same chat was not intentionally opened twice.
   - https://github.com/openai/codex/issues/42589

2. **#42586 — Windows bundled PowerShell process-start delay**
   - One controlled harmless/no-filesystem event reports `104.276s` from external invocation to bundled `pwsh.exe` process creation, followed by normal execution and no residual child.
   - Reporter explicitly leaves cause unresolved among request/queue/scheduler/dispatch/process-launch layers.
   - https://github.com/openai/codex/issues/42586

3. **#42595 — macOS Browser restore fan-out / resource exhaustion**
   - Reporter on Desktop `26.831.20005` observed one owner-sync expanding 8 durable browser pages into 84 persisted routes, creating 76 orphan routes and severe renderer/CPU/memory/swap pressure.
   - Reporter had not stress-reproduced the failure on newer `26.901.20858` at filing time.
   - https://github.com/openai/codex/issues/42595

### Screened

- #42584 Vim escape recovery: TUI productivity/compatibility improvement only.
- #42585 provider-local draft loss after interrupt/fork/resume: Dex canonical Task/Result must not depend on unsent provider drafts.
- #42587 suggested next prompts: product enhancement only.
- #42591 host-signed per-invocation attestation: user proposal, not an implemented upstream contract.
- #42592 Daybreak country identity verification: no current Dex operational impact.
- #42594 macOS window/session restoration: usability only.

## Classification

### confirmed

- PRs #42588/#42590/#42593/#42596 are merged on upstream after the current official `0.153.0` release.
- Issues #42589/#42586/#42595 exist in the official `openai/codex` tracker with the reporter evidence summarized above.
- Latest official non-prerelease release remains `0.153.0` at this cutoff.
- No new official model promotion or general pricing/usage-limit policy change was found for this cutoff.

### inference

- #42588 materially improves Guardian provenance integrity across compaction. Dex should not reuse provider approval/review evidence when checkpoint compatibility provenance is missing or incompatible.
- #42590 closes a macOS terminal-boundary escape path relevant to any future macOS execution worker, but it does not change the current Windows gate.
- #42593 separates `plugin installed` from `plugin ready in an already-loaded thread`; reload failure can leave activation state incomplete even when installation itself succeeded.
- #42589 reinforces that provider-side thread hydration is not authoritative for Dex writer ownership.
- #42586 reinforces that apparent startup stalls must not create duplicate Task/writer retries.
- #42595 reinforces the need for idempotent Browser restore/rebind and hard page/renderer resource budgets before any future Browser activation.

### proposal

- Runtime #25: identify the first stable containing #42588 and require matching checkpoint provenance vs missing/mismatch fail-closed synchronous Guardian E2E.
- Runtime #28: add harmless Windows process-start timing evidence (`accepted/dispatch/process-created/first-instruction/result`) and ensure a stall becomes blocked without a second Task/writer or destructive remediation.
- Runtime #35: before multi-surface worker expansion, negative-test distinct IDE/app windows so background hydration cannot acquire another active Task writer; bound resume retries and preserve queued-follow-up failure evidence.
- Runtime #90: after any future explicitly approved local plugin install, require config reload + MCP/hook refresh + capability re-enumeration before the loaded thread is ready; reload failure means installed/not-ready, with no automatic reinstall or permission expansion.
- Runtime #30: future macOS worker must prove `TIOCSTI` denial on a stable containing #42590; future Browser approval must require idempotent restore and resource budgets.

### unknown

- First stable containing #42588/#42590/#42593/#42596.
- Maintainer-confirmed root cause/fix for #42589/#42586/#42595.
- #42589 applicability to current stable `0.153.0` / current IDE bundles.
- #42595 applicability to Desktop `26.901.20858` or later.
- Approved-host Windows process-start latency distribution and bounded threshold.

## Verification state

| Check | Result |
|---|---|
| Latest official stable | PASS — `0.153.0` |
| Upstream merge evidence | PASS — #42588/#42590/#42593/#42596 |
| Guardian checkpoint behavior in current Dex stable | Not Checked — future stable |
| macOS TIOCSTI denial in Dex | Not Checked — future stable/macOS worker inactive |
| loaded-thread plugin reload in Dex | Not Checked — plugin mutation disabled/future stable |
| Windows provider hydration writer isolation | Not Checked — issue signal/old alpha bundle |
| Windows process-start timing E2E | Not Checked — approved-host #28 pending |
| Browser restore/resource-budget E2E | Not Checked — Browser disabled |
| New operational capability activated | PASS — none |
| FAIL | none in this watch record |

## Safety boundary

No prerelease/experimental promotion; no paid API or automatic paid fallback; no credit/reset use; no broader filesystem/network/OAuth/MCP permissions; no Browser/Computer Use activation; no remote marketplace or plugin/Skill auto mutation; no provider DB/cache destructive repair; no duplicate writer/fork/retry on ambiguous execution; no destructive migration, external messaging, or automatic deploy.
