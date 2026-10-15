# Codex Work, Windows startup, and attachment persistence watch — 2026-09-03

Status: source-backed provider watch / future-stable and approved-host/surface gates. This note enables no prerelease/experimental capability, paid API, automatic paid fallback, broader permission, Computer Use/browser capability, Work file ingest, attachment-registry mutation, runtime repair, external messaging, destructive migration, or deployment behavior.

## Scope and cutoff

This watch starts after the prior Dex cutoff at OpenAI Issue #42491. Fresh official `openai/codex` checks found no merged `main` commit after PR #42458. The latest official non-prerelease release remains Codex `0.153.0`.

Fresh official issue candidates after that cutoff were screened before selection:

- #42492 — sparse report of unusually high Codex usage for a task that the reporter considered ordinary.
- #42493 — Windows dual-monitor window-size restore UI defect.
- #42494 — proposal to expose richer agent lifecycle/timing/usage events; not a merged capability.
- #42495 — macOS renderer log-noise issue.
- #42496 — community interoperability-spec proposal; not an OpenAI contract.
- #42497 — insufficient-detail generic bug report.
- #42498 — Windows ChatGPT/Codex side-panel attachment persistence can stall after file copy succeeds.
- #42499 — macOS code-block sticky-header UI defect.
- #42500 — macOS desktop manual Chat → Work transfer action can disappear while web still works.
- #42501 — Windows Store/MSIX app can leave responsive background processes without a visible UI when bundled `cua_node` staging is incomplete.

## Findings

### confirmed issue signal / root cause and stable fix unknown — #42501: Windows process liveness can exist without usable Codex startup

OpenAI Issue #42501 is open with `bug`, `windows-os`, `app`, and `computer-use` labels. The reporter uses Windows Store/MSIX app `26.901.1978.0`. Several `ChatGPT.exe` processes remain responsive but no visible window appears. The reported `cua_node` staging directories contain `node.exe` but repeatedly omit `node_repl.exe`; a manual `xcopy /G` reconstruction made the app launch. GitHub automation linked several potentially related Windows runtime-relocation issues, but there is no maintainer-confirmed root cause or stable fix at this cutoff.

Dex inference:

- OS-process responsiveness is not sufficient evidence that an approved Windows worker surface is ready;
- #28 approved-host admission must distinguish process liveness, runtime materialization completeness, and an actually usable Codex/App Server/CLI control path;
- repeated staging failure for the same runtime/content identity must trigger a bounded no-progress stop with mutation 0 rather than a second worker, repeated app launch, or repeated Task execution;
- a visible/usable control surface and the required runtime assets for the chosen capability must be verified before that surface is counted as PASS;
- the reporter's manual runtime copy, staging-directory deletion, downgrade/reinstall, protected-file workaround, antivirus bypass, or permission relaxation is not an approved Dex remediation and must not run automatically.

Official source: https://github.com/openai/codex/issues/42501

### confirmed issue signal / fix unknown — #42500: manual Chat → Work transfer is not surface-stable

OpenAI Issue #42500 is open with `bug` and `app` labels. On ChatGPT desktop `26.901.20858` for macOS, the reporter says the manual action used to continue an existing Chat conversation in Work is absent from the desktop message menu. The same account and conversation still expose the action on chatgpt.com, and AI-initiated handoff reportedly still works in the desktop app.

Dex inference:

- availability of a native `Transfer to Work` menu item is provider-surface capability evidence, not Dex Task authority or a durable handoff guarantee;
- #34 must validate Chat/Work handoff independently on web, desktop, and supported mobile surfaces rather than assuming UI parity from one surface;
- when a native handoff action is missing, an already-authorized Dex PWA/GitHub Task Bus route should preserve the same accepted goal/context without requiring the user to recreate the Task;
- a missing provider UI action must not cause duplicate `submit_task`, duplicate worker execution, broader OAuth/MCP permission, or external/native messaging automation.

Official source: https://github.com/openai/codex/issues/42500

### confirmed issue signal / exact failure threshold and fix unknown — #42498: copied attachment can remain non-durable/non-ready

OpenAI Issue #42498 is open with `bug`, `windows-os`, and `tool-calls` labels. In the Windows ChatGPT Chrome side panel, the reporter observed file transfer/copy operations succeeding while the shared attachment registry write remained pending. One diagnostic snapshot showed `fs/writeFile` waiting for 1,355 seconds with `timeoutMs: 0`. Small synthetic writes succeeded while a larger test did not respond within the reporter's five-second diagnostic window. The exact failing layer and threshold remain unknown.

Dex inference:

- successful file copy is not sufficient evidence that a provider attachment is durably registered and ready for a worker;
- future #34 file-input E2E must require bounded persistence/ready acknowledgement and a stable artifact identity before attaching input to a canonical Task;
- indefinite provider registry writes must be bounded by Dex-side no-progress handling; an ambiguous attachment state cannot trigger repeated submit, duplicate ingest, duplicate worker, or side effects;
- if provider attachment persistence is unavailable, fallback must use an already-approved canonical artifact path/manifest rather than silently resetting shared provider state;
- Work/Chat file ingest remains disabled until MIME, size, malware, retention, account/workspace binding, redaction, and artifact-integrity gates pass;
- do not automatically reset or delete `%USERPROFILE%\.codex\attachments` state, remove attachment files, inject a runtime interception workaround, or broaden filesystem permissions.

Official source: https://github.com/openai/codex/issues/42498

### confirmed issue existence / billing causality unknown — #42492: sparse usage-anomaly signal

OpenAI Issue #42492 is open with `bug` and `rate-limits` labels and reports unexpectedly high allowance use for one task. The report does not establish actual token/tool accounting, current plan state, task-context size, model, or an OpenAI-confirmed metering defect.

Dex inference:

- this is diagnostic evidence only and does not change the subscription-first policy or define a new usage formula;
- official OpenAI usage guidance and the account/workspace Usage surface remain authoritative immediately before any quota-sensitive decision;
- local/task-level estimates may inform diagnostics but cannot authorize credit purchase, banked reset use, plan change, paid API, or automatic paid fallback;
- repeated no-progress work must still be checkpointed/stopped rather than duplicated to work around shared allowance.

Official source: https://github.com/openai/codex/issues/42492

### screened / no operational Dex gate in this watch

#42493, #42495, and #42499 are UI/layout or log-noise reports without a material change to current Dex execution authority. #42494 and #42496 are proposals, not merged OpenAI capabilities. #42497 lacks enough detail for a reliable Dex decision. They remain source-screened and do not justify configuration or Runtime behavior changes here.

## Proposal / future gates

### Runtime #28 approved Windows-host startup/materialization boundary

- [ ] Record actual Windows app/CLI version and chosen execution surface before E2E; version strings from another surface do not substitute.
- [ ] Separate `process alive`, `runtime materialized`, and `control path usable` checks. A responsive `ChatGPT.exe` with no usable UI/App Server/CLI is FAIL for that surface, not PASS.
- [ ] For any capability that depends on bundled runtime assets, verify the expected runtime/content identity and required executable/helper set is complete before admitting a worker.
- [ ] Repeated materialization/staging failure trips a bounded circuit breaker with Task mutation 0, duplicate worker 0, and duplicate application launch/retry bounded by policy.
- [ ] Startup failure recovery preserves the same canonical Task/checkpoint; it does not use manual protected-package copying, staging deletion, permission relaxation, downgrade/reinstall, or antivirus bypass automatically.
- [ ] Record PASS/FAIL/Not Checked separately for standalone stable CLI/App Server and packaged Desktop behavior; a Desktop prerelease/bundled component cannot silently redefine the approved operational stable.

### Runtime #34 Work/Chat handoff and attachment boundary

- [ ] Record manual Chat → Work handoff availability separately for supported web, desktop, and mobile surfaces; native UI parity is capability evidence only.
- [ ] Missing native handoff falls back to the already-authorized PWA/GitHub Task path with the same accepted intent and zero duplicate Task/worker/mutation.
- [ ] Provider attachment input is admitted only after durable persistence/ready acknowledgement plus stable artifact identity; successful copy/transfer alone is insufficient.
- [ ] Attachment persistence has a bounded timeout/no-progress outcome and cannot leave the canonical Task in a false `ready`/`completed` state.
- [ ] Ambiguous provider attachment state produces mutation 0 and preserves the original artifact; shared registry reset/delete/repair is not automatic.
- [ ] Work file ingest remains disabled until the existing MIME/size/malware/retention/account-workspace/redaction/integrity gate is separately approved and PASS.

## Explicitly not enabled

- manual `xcopy /G` runtime reconstruction, staging-directory cleanup, downgrade/reinstall, EFS/protected-package bypass, or antivirus/permission relaxation;
- attachment-registry reset/delete/repair or provider attachment-file deletion;
- Work file ingest, native Chat → Work UI automation, external messaging, callback injection, Browser/Computer Use;
- prerelease/experimental capabilities;
- broader filesystem/network/OAuth/MCP permissions;
- paid API, automatic paid fallback, credit purchase, banked reset use, plan change;
- duplicate worker/fork, provider-state database repair, destructive migration, automatic deploy.

## Status

- Fresh official `openai/codex` `main` check after PR #42458: PASS — no newer merged commit found at this cutoff.
- Latest official non-prerelease Codex: PASS — `0.153.0`.
- #42501/#42500/#42498/#42492 issue existence/state: PASS.
- #42501 maintainer-confirmed root cause/stable fix: Not Checked.
- #42500 maintainer-confirmed fix and cross-surface parity: Not Checked.
- #42498 exact persistence failure threshold/root cause/fix: Not Checked.
- #42492 OpenAI-confirmed metering defect or new billing rule: Not Checked.
- Approved Windows-host runtime-materialization/startup E2E: Not Checked.
- Work/Chat handoff and attachment persistence/file-ingest E2E: Not Checked.
- Runtime behavior/config/model/permission/billing mutation from this watch: 0.
