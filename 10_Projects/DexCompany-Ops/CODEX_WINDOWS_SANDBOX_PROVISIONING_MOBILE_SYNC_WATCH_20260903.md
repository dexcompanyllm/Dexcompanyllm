# Codex Windows sandbox provisioning / mobile-sync watch — 2026-09-03

- Verification status: `source-backed + Dex inference/proposal separated`
- Runtime evidence: Runtime PR #114 merge `6d251baa2ebc03e263b27a91c6bf9356eb64f7db` plus final fresh-check PR #115 merge `24a415b6342c1670cba0de37403bc0ca18bbea44`
- Operational gate change: **none** — Runtime #28 approved Windows-host E2E remains Not Checked; #34/#35 remain downstream

## Confirmed

### OpenAI Codex PR #42309

Official source: https://github.com/openai/codex/pull/42309

- Merged 2026-09-02 16:52:07 UTC to `openai/codex` `main` as `1bc8fb16ae53512c0c7723a436e4b11be81ad4a8`.
- Elevated interactive Windows sandbox setup is narrowed to sandbox identity/proxy provisioning and no longer carries caller workspace/ACL roots in the elevated provisioning payload.
- Sandbox activation runs a non-elevated setup refresh using the current permission profile for read/write/deny roots even when provisioning was already completed.
- New `interactive-provision` mode performs provisioning without the full ACL setup path.
- Upstream tests cover omission of caller ACL roots from the elevated provisioning payload and acceptance of the new mode.
- No unresolved PR review threads were observed at verification time.

### OpenAI Codex PR #42314

Official source: https://github.com/openai/codex/pull/42314

- Merged 2026-09-02 17:30:13 UTC to `openai/codex` `main` as `eb078b4f44b0c8099d376440d63ce5bbb11675bd`.
- Permission approval requests now preserve the target environment's native `cwd` representation through core events and App Server protocol with `LegacyAppPathString` instead of forcing host-native `AbsolutePathBuf` semantics.
- The target-native value is converted to `PathUri` when permission grants are materialized.
- JSON/TypeScript protocol schemas were regenerated for the changed field type.
- Upstream tests cover a target-native working directory across differing host path conventions and verify that granted access still unblocks later remote execution.
- No unresolved PR review threads were observed at verification time.

### Official issue signals

- #42308: https://github.com/openai/codex/issues/42308 — Windows Desktop `26.831.2377.0` deterministic startup `0xC0000005` report on Windows 10 25H2 build 26200.9168; labels include `bug/windows-os/app`.
- #42310: https://github.com/openai/codex/issues/42310 — Windows scheduled-task chats reportedly appear in Android and disappear when opened; labels include `bug/windows-os/app/session/automations`.

These issue reports are official repository signals, not maintainer-confirmed root causes or product contracts.

### Stable/model/usage baseline

- Latest official non-prerelease `openai/codex` release remains `0.152.1` (`rust-v0.152.1`).
- Current official OpenAI guidance keeps GPT-5.6 Sol available for eligible Codex paid plans, alongside Terra and Luna.
- Current Codex plan guidance continues to describe shared agentic allowance across supported Codex/Work/Excel/Workspace-Agent usage and directs users to current Usage UI/`/status` evidence for allowance/reset state.
- No new personal-plan pricing/usage-limit or plugin/Skill policy change in this cutoff requires changing Dex subscription-first or permission policy.

## Inference

1. PR #42309 strengthens the Windows privilege boundary by separating durable identity provisioning from mutable workspace ACL refresh. It should reduce dependence on elevated payloads containing per-workspace path policy and reduce stale ACL risk after workspace/profile changes.
2. This does **not** justify enabling elevated sandboxing in Dex. A future non-prerelease stable and approved-host E2E are still required.
3. PR #42314 strengthens remote permission-path correctness when controller/host and target use different path conventions. Provider `cwd` is still provenance, not Dex authorization or permission authority.
4. #42308 reinforces Dex portability: Windows Desktop UI availability cannot be a single point of failure for the approved CLI/App Server worker or canonical Task/Result recovery.
5. #42310 reinforces Dex canonical-result design: native scheduled-task chat visibility/synchronization is presentation evidence only and cannot replace GitHub Task Bus + durable Result/receipt.

## Proposal / applied Dex optimization

Runtime PR #114 added the #42309 and Windows Desktop/mobile negative-path gates; Runtime PR #115 added the final #42314 target-native permission-path gate. Both are watch-only documentation changes and no runtime capability was enabled.

### Runtime #28 future-stable Windows gate

When a non-prerelease stable includes #42309, verify on the approved Windows host that:

- elevated provisioning payload excludes caller workspace read/write/deny ACL roots;
- already-provisioned activation still refreshes current ACL state non-elevated;
- workspace A→B and deny-rule changes replace stale ACL state deterministically;
- provisioning/setup-marker state never replaces Task ID, `attemptId`, approval, project→realpath registry, mutation lock, or current permission policy;
- setup/refresh ambiguity fails closed with mutation 0 and no broader-permission fallback;
- no repeated UAC/elevation loop is introduced.

Tracking: Runtime Issue #28 comments `5513650537` and `5513742926`.

### Runtime #28/#34 target-native permission cwd gate

When a non-prerelease stable includes #42314, verify that:

- target-native Windows/POSIX cwd survives a controller/App Server using a different path convention;
- approval evidence preserves exact target path identity without silent host-side reinterpretation;
- materialized grant resolves to the same registered project/workspace identity and cannot escape project→realpath boundaries;
- malformed/mismatched path conventions, unknown target environment, or ambiguous materialization fail closed with mutation 0;
- `cwd` does not itself grant access, weaken deny rules, expand permission profile, or replace explicit approval/mutation lock;
- retry/resume preserves Task ID, `attemptId`, and permission-request identity without duplicate approval/side effect.

Tracking: Runtime Issue #34 comment `5513744343`.

### Runtime #34 Desktop/mobile negative-path gate

Verify that Desktop crash/unavailability or native scheduled-chat disappearance:

- does not recreate a Task or worker run;
- does not reuse stale approval;
- leaves canonical Task/Result retrievable through supported status/result/PWA paths;
- keeps callback/native-chat synchronization failure separate from worker/result completion;
- never triggers automatic paid fallback, permission expansion, or external messaging.

Tracking: Runtime Issue #34 comment `5513654130`.

## Unknown / Not Checked

- first official non-prerelease stable containing #42309/#42314;
- approved Windows-host provisioning/ACL-refresh E2E;
- approved-host cross-path-convention permission-approval E2E;
- #42308 maintainer-confirmed root cause/fix and affected-build range;
- #42310 maintainer-confirmed root cause/fix and actual Dex mobile/desktop parity behavior;
- whether either reported issue reproduces on Ethan's approved Windows host/account.

## PASS / FAIL / Not Checked

| Check | Result |
|---|---|
| PR #42309 merge/body/files | PASS |
| PR #42309 unresolved review threads | PASS — none observed |
| PR #42314 merge/body/files | PASS |
| PR #42314 unresolved review threads | PASS — none observed |
| #42308 official issue signal/labels | PASS |
| #42310 official issue signal/labels | PASS |
| latest non-prerelease Codex | PASS — `0.152.1` |
| Dex approved Wiki/Runtime `main` and #28/#34 boundaries compared | PASS |
| Runtime PR #114 branch validation | PASS — run `33661401652` |
| Runtime PR #115 branch validation | PASS — run `33662084046` |
| Runtime code/config/permission/sandbox-mode/billing/plugin state operational change | PASS — none |
| FAIL | none |
| future stable containing #42309/#42314 | Not Checked |
| approved-host Windows provisioning/ACL E2E | Not Checked |
| approved-host target-native cwd permission E2E | Not Checked |
| Windows Desktop crash/scheduled-chat sync root cause/fix | Not Checked |

## Safety boundary retained

No prerelease/experimental activation, elevated-sandbox activation, WSL/remote-host promotion, broader permission, `danger-full-access`, automatic approval, plugin/Skill auto-mutation, paid API/fallback/extra usage, automatic reset/credit use, multi-writer, destructive migration, automatic deploy/merge, or external messaging was enabled.
