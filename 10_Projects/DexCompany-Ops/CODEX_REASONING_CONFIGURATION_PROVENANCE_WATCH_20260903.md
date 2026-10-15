# Codex durable reasoning configuration provenance watch — 2026-09-03

## confirmed

- OpenAI Codex PR #42328 (`0d502a423031396a8d11c096e5b9f1cb0d30b3d0`) merged 2026-09-02 18:55:06 UTC.
- It adds typed `configuration_update` response items for reasoning effort, including custom model-defined values.
- Harness-authored updates retain trusted provenance and position through persistence, history reconstruction, thread resume, raw response notifications, and agent forks.
- Untrusted configuration updates are excluded from model history; client-supplied provenance metadata is stripped; configuration updates supplied as turn input are rejected.
- Upstream tests cover serialization, persistence, rollback, resume/restart reconstruction, and injection attempts. No unresolved review thread was observed after merge.
- Runtime PR #117 is merged as `1fcb482d72719c2e9aae8b1464e510f56f782f77`. It is documentation-only. Branch validation `33670629028` PASS: dependency install, static/unit/smoke, production dependency audit; branch Vercel PASS.
- Latest official non-prerelease Codex remains `0.152.1`; #42328 is not automatically promoted.

Official sources:
- https://github.com/openai/codex/pull/42328
- https://github.com/openai/codex/releases/tag/rust-v0.152.1
- https://developers.openai.com/codex/changelog

## inference

- Trusted reasoning-configuration provenance can improve Dex diagnostics across resume/replay/fork because requested reasoning, provider-authored changes, and effective execution evidence can be compared instead of relying on a UI label.
- Provider `configuration_update` remains provenance only. It cannot authorize a Dex Task, mutation, broader permission, higher-cost route, or model-policy override.

## proposal

When a future non-prerelease stable contains #42328, Runtime #34/#35 should prove:

1. requested reasoning, trusted configuration-update history, and effective per-turn reasoning are distinguishable and ordered;
2. client/task/history-injected configuration updates and forged provenance are rejected/ignored with no model/reasoning mutation;
3. resume/replay/fork reconstructs only trusted provider-authored configuration state;
4. rollback cannot revive stale later reasoning settings;
5. child forks cannot escalate model, reasoning, cost or permission through copied history;
6. provider configuration history cannot replace Dex Task ID, `attemptId`, model policy, account/workspace binding, explicit approval, mutation lock, or subscription-first cost policy;
7. conflicting UI/request/history/effective evidence is `unknown`/Not Checked and does not trigger automatic model/reasoning increase, paid fallback or broader permission;
8. retry/reconnect/replay/fork reconciliation creates no duplicate Task, worker, approval, mutation, Result or shared-allowance consumption.

OpenAI Codex issue #42329 is a secondary **confirmed signal / unknown root cause**: an Enterprise user reports Projects visible in Web/Classic but absent in the new desktop app. It reinforces the existing rule that surface discovery is not canonical Task authority, but it does not justify Enterprise-specific Dex changes for the current personal subscription path.

## unknown / Not Checked

- First non-prerelease stable containing #42328.
- Approved-host reasoning-provenance resume/replay/rollback/fork E2E.
- Client-injection negative-path E2E on the future stable.
- #42329 maintainer-confirmed root cause/fixed release.

## validation

| Check | Result |
|---|---|
| #42328 merge/body/provenance scope | PASS |
| #42328 unresolved review threads | PASS — none observed |
| Runtime PR #117 validation `33670629028` | PASS |
| Runtime code/model/reasoning/permission/billing/plugin state changed | PASS — no operational change |
| Future stable + approved-host E2E | Not Checked |
| FAIL | none |

No prerelease/experimental activation, model/reasoning automatic increase, paid API/fallback/extra usage, broader permission, plugin/Skill mutation, multi-writer, destructive migration, automatic publication/deploy, or external messaging is enabled.