# Codex Remote / Tier / History / Portability Watch — 2026-09-04

## Checkpoint

- Runtime PR #181 merged as `29cdcef245946ecba8a6bb8dd7236433af79875c`.
- Branch validation `33835528050`: PASS.
- Post-merge validation `33835598970`: PASS.
- Branch and merge deployment checks: PASS.
- Change scope: documentation and tracking only; no Runtime behavior changed.
- The 2026-09-04 quiet-window catch-up was already reconciled before this interval.

## Official Codex developments

### Remote lifecycle — PR #42668
OpenAI merged a fix so pending Remote Control enrollment is cancelled when App Server stdio shuts down, preventing shutdown from retaining thread-writer resources. Tests verify another App Server can acquire the released writer.

Source: https://github.com/openai/codex/pull/42668

Dex: Remote remains disabled. Future activation must prove bounded shutdown, writer release, timeout and idempotency behavior.

### Multi-agent service tier — PR #41308 and issue #42665
OpenAI PR #41308 deliberately made subagents follow the root thread service tier and removed per-spawn and role-level overrides. New issue #42665 requests restoration of role-specific overrides such as a Standard coordinator with Fast workers; it is a request, not current capability evidence.

Sources:
- https://github.com/openai/codex/pull/41308
- https://github.com/openai/codex/issues/42665

Dex: #35 must not assume different service tiers can be assigned independently to children. Record requested and effective root tier plus observed child tier; require official support and approved-host validation before relying on future overrides.

### Remote SSH IDE portability — issue #42663
A reporter says Codex extension build `26.5901.22334` fails to activate on one Remote SSH environment whose VS Code server uses Node 22. Maintainer-confirmed root cause/fix is not yet available.

Source: https://github.com/openai/codex/issues/42663

Dex: optional IDE/Remote failure must preserve the canonical Task and allow approved CLI/App Server/PWA/Task Bus recovery without requirement re-entry. Do not automatically alter the remote runtime to work around the report.

### Thread-history projection — issue #42662
A reporter says reopening a remote multi-turn task can show only the first turn while later turns still exist in durable rollout history. The reporter uses older CLI `0.145.0`; applicability to stable `0.153.2` is unknown.

Source: https://github.com/openai/codex/issues/42662

Dex: provider history UI/cache is not canonical Task state. Before any replay, reconcile Task ID, attempt/checkpoint and durable Result/receipt. Do not repair provider state automatically.

### Computer Use Accessibility — issue #42666
A macOS reporter says enabling Codex Computer Use Accessibility permission can interfere with an unrelated Qt application. The report uses a prerelease bundled CLI and is not maintainer-confirmed.

Source: https://github.com/openai/codex/issues/42666

Dex: Computer Use remains disabled. Future evaluation must include unrelated-application interference, idle behavior, revocation and least-privilege scope.

### Daybreak/Astra notices — PR #42667
OpenAI changed refusal/eligibility notices for Daybreak/Astra and refreshes eligibility after account changes/reconnects without changing the selected model.

Source: https://github.com/openai/codex/pull/42667

Dex: eligibility UI is evidence only, not model-routing authority.

## Stable / model / cost-policy check

- Latest official non-prerelease Codex release remains `0.153.2`.
- No newer stable entry or default-model promotion was identified in this interval.
- No newly dated general pricing or usage-limit change requiring a Dex policy change was identified.
- Existing subscription-first and no-automatic-paid-fallback boundaries remain unchanged.

Sources:
- https://github.com/openai/codex/releases/tag/rust-v0.153.2
- https://developers.openai.com/codex/changelog
- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan

## Classification

- confirmed: PR #42668 lifecycle fix; PR #41308 root-tier inheritance; #42665 is only a feature request; PR #42667 is UI messaging; Runtime PR #181 validation PASS.
- inference: capability/value routing is safer than assuming independent Fast child tiers; canonical reconciliation before retry reduces duplicate work when provider projections are stale.
- proposal: add root/child effective-tier evidence to #35, Remote shutdown/writer-release evidence to #30, and provider-history fallback/recovery evidence to #34.
- unknown: maintainer fixes for #42663/#42662/#42666, future restoration of per-child tier override, and first stable containing #42668/#42667.

## Gate status

- #28: OPEN; approved Windows-host Phase 3 E2E remains Not Checked.
- #34/#35: remain blocked by #28.
- Known aggregate pointer drift remains tracked in Wiki #55; the eight aggregate state/handoff files are not rewritten by this watch-only batch.

No experimental capability, broader permission, paid fallback, remote-control activation, computer-use activation, provider-state repair, duplicate worker or destructive change is authorized by this evidence.