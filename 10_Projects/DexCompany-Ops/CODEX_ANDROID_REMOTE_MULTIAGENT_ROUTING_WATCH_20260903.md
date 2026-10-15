# Codex Android Remote and multi-agent routing watch — 2026-09-03

Status: source-backed provider watch / future-stable and approved-surface gates. This note enables no prerelease/experimental capability, custom provider, paid API, automatic paid fallback, broader permission, Remote auto-pairing, external messaging, Skill/Plugin mutation, destructive migration, or deployment behavior.

## Scope and cutoff

This watch starts after the prior Dex cutoff at OpenAI Issue #42485. Fresh official `openai/codex` checks found no merged main commit after PR #42458. The latest official non-prerelease release remains Codex `0.153.0`.

Fresh official issue candidates after that cutoff:

- #42487 — conversation text reportedly missing across laptop app, Edge, and Android.
- #42488 — `multi_agent_v1.spawn_agent` can be rejected as an unsupported flattened dotted tool name with certain custom providers.
- #42489 — Android Remote can disappear from navigation after Android system Back, requiring re-pairing in the reported flow.

## Findings

### confirmed issue signal / root cause and fix unknown — #42489: Android Remote navigation state can be lost after system Back

OpenAI Issue #42489 is open with `bug` and `remote` labels. The reporter uses ChatGPT Android `1.2026.237` on a Pixel 8 with a Windows host on Desktop `26.831.20005`. Pairing succeeds and Remote initially works. With Android three-button navigation, pressing system Back from the Remote home screen minimizes/leaves the surface; restoring the app returns to ordinary ChatGPT home with no Remote entry, and the reporter says re-pairing is then required. By contrast, leaving through Home/Overview preserves Remote, while gesture Back restores through a temporary `Pairing…` state. The same host/account reportedly works from iPad.

Dex inference:

- Remote availability/navigation is a provider-surface projection, not Dex Task authority or durable completion state;
- #34 mobile E2E must test Android three-button Back, gesture Back, Home, Overview, app background/restore, and process relaunch separately rather than treating one successful pairing as mobile parity;
- losing the Remote entry must never cause a second `submit_task`, duplicate worker, duplicate mutation, requirement re-entry, or a broader permission request;
- when Remote is unavailable after restore, Dex should recover the same canonical Task/result through an already-authorized Dex PWA/GitHub Task Bus path rather than re-creating the task;
- do not automatically re-pair a device, alter Android navigation/settings, enable remote-control permissions, or infer host trust from a visible Remote card.

Official source: https://github.com/openai/codex/issues/42489

### confirmed issue signal / current Dex route non-applicable / upstream fix unknown — #42488: custom-provider flattened namespaced tool calls

OpenAI Issue #42488 is open with `bug`, `custom-model`, `tool-calls`, `app`, and `subagent` labels. The reporter says a non-OpenAI custom provider can flatten a namespaced tool call into a dotted name such as `multi_agent_v1.spawn_agent` with no explicit namespace, causing the router to miss the registered namespaced handler. The proposed code fix and end-to-end verification are in the reporter's fork, not merged OpenAI upstream evidence at this cutoff.

Dex inference:

- the current Dex OpenAI path is subscription-first and does not authorize custom-provider/API-key routing, so this issue does not change the active worker route;
- do not cherry-pick or vendor the reporter's external fork under provider-watch standing approval;
- if Dex later approves a custom-provider adapter, namespaced-tool conformance must verify explicit namespace, flattened dotted-name behavior, `spawn_agent`/wait lifecycle, and zero mutation on unsupported calls before that provider can participate in multi-agent routing;
- provider tool-call formatting is capability evidence only and cannot bypass GitHub Task authority, one-writer fencing, or approval rules.

Official source: https://github.com/openai/codex/issues/42488

### confirmed issue existence / Codex applicability unknown — #42487: conversation history reportedly missing across surfaces

OpenAI Issue #42487 is open with `bug` and `session` labels. It reports missing written conversation text across a laptop app, Edge, and Android, but provides no Codex/App version, exact surface, task identifier, or root-cause evidence.

Dex inference:

- this is too sparse to classify as a Codex persistence defect or to introduce a new operational blocker;
- it reinforces the existing rule that provider chat/sidebar history is non-canonical and recoverable Dex work must be bound to GitHub Task/checkpoint/Result evidence;
- do not attempt provider database repair, history deletion, account changes, or task replay from this report.

Official source: https://github.com/openai/codex/issues/42487

## Proposal / future gates

### Runtime #34 Work/mobile/Remote surface boundary

- [ ] On an approved Android device with the supported account/host, establish Remote once and record app/host versions without treating the pairing state as Task authorization.
- [ ] Verify three-button Back, gesture Back, Home, Overview, background/restore, and process relaunch independently.
- [ ] After every navigation/lifecycle transition, the same canonical Dex Task ID/statusVersion/receipt remains recoverable; no transition creates a second `submit_task`, worker, mutation, or callback replay.
- [ ] If the Remote entry disappears or reconnect becomes ambiguous, fallback to the already-authorized PWA/status-result path with mutation 0 and user requirement re-entry 0.
- [ ] Device re-pairing, host trust changes, broader remote-control permission, and account/workspace changes remain explicit user-controlled actions.
- [ ] Record Android/iOS/web/desktop parity as separate PASS/FAIL/Not Checked results; an iPad PASS cannot substitute for Android Remote PASS.

### Runtime #35 future custom-provider multi-agent interoperability

- [ ] No current Dex production dependency on #42488; custom-provider/API-key execution remains disabled.
- [ ] If a custom provider is separately approved later, require official upstream/stable behavior plus conformance tests for namespaced and flattened dotted tool calls before `spawn_agent` can be admitted.
- [ ] Unsupported/ambiguous tool routing fails closed with mutation 0 and cannot trigger provider switching, permission expansion, or duplicate worker creation.

## Explicitly not enabled

- automatic Android Remote re-pairing or navigation/settings changes;
- custom model/provider or API-key routing;
- reporter-fork cherry-pick/vendor patch;
- prerelease/experimental multi-agent capability;
- broader filesystem/network/OAuth/MCP/Remote permissions;
- paid API, automatic paid fallback, credit/reset use;
- provider history/SQLite repair, task replay, duplicate worker/fork;
- Skill/Plugin install/delete, external messaging, automatic merge/deploy.

## Status

- Fresh official main/merged-PR check after #42458: PASS — no newer merge found at this cutoff.
- Latest non-prerelease Codex: PASS — `0.153.0`.
- #42487/#42488/#42489 issue existence/state/labels: PASS.
- #42489 Android Remote root cause/fix: Not Checked.
- #42488 maintainer-approved upstream fix/stable inclusion: Not Checked.
- #42487 Codex-specific causality: Not Checked.
- Approved Android Remote lifecycle/parity E2E: Not Checked.
- Custom-provider multi-agent conformance: Not Checked / current route disabled.
- Runtime behavior/config/model/permission/billing mutation from this watch: 0.
