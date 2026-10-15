# Codex Windows Desktop Startup Watch — 2026-09-04

## Source and status

OpenAI Codex issue #42669 was created 2026-09-04 13:07:31 Asia/Seoul and is open with `bug`, `windows-os`, and `app` labels.

Official source: https://github.com/openai/codex/issues/42669

Reporter environment: Windows 11 and Codex desktop package `26.901.2854.0`. The reporter says launching the app starts processes but no usable window appears, while standalone CLI `0.153.0` and web access still work. Diagnostic output includes an Artifact Session host Unix-socket transport error on Windows. The reporter infers a bootstrap regression; maintainer-confirmed root cause/fix is not yet available.

## Dex interpretation

- confirmed: a fresh official-repository Windows Desktop startup regression signal exists for the reported app build.
- inference: Desktop UI availability should not become a single point of failure when an approved standalone subscription CLI/App Server path remains healthy.
- proposal: distinguish process-start, visible-window readiness, integrated-surface readiness, and clean shutdown in future Windows Desktop validation; preserve the same canonical Task/checkpoint/result when falling back to an already approved standalone path.
- unknown: maintainer-confirmed cause/fix, approved-host reproduction, fixed-build verification, and whether reported incomplete vendor runtime staging directories are causal.

No automatic WindowsApps/package/runtime modification, ACL/ownership change, cache surgery, downgrade, prerelease install, broader permission, paid fallback, or Task replay is authorized by this signal.

## Dex implementation checkpoint

Runtime PR #182 merged as `fe657ed148e9c655ec0bf239a69bac7ec66d7cc6`.

- branch validation `33835960518`: PASS on attempt 1; install, static/unit/smoke, and production dependency audit all PASS.
- branch Vercel: PASS.
- post-merge validation `33836269052`: PASS on attempt 1; all steps including production dependency audit PASS.
- merge Vercel: PASS.
- Runtime executable/config/provider-routing/permission/billing changes: 0.

Runtime tracking was supplemented in #30 and #34 with Desktop process-vs-window readiness and zero-requirement-reentry fallback gates.

Operational state is unchanged:

- #28 remains OPEN; approved Windows-host Phase 3 E2E is Not Checked.
- #34/#35 remain blocked until #28 PASS.
- latest official non-prerelease Codex release remains `0.153.2` at this checkpoint.
- known eight-file aggregate pointer drift remains tracked in Wiki #55 and is not rewritten by this watch-only batch.

## PASS / FAIL / Not Checked

- PASS: issue source/environment bounded; reporter inference separated from confirmed facts.
- PASS: Runtime PR #182 branch and post-merge validations; branch/merge Vercel.
- FAIL: none.
- Not Checked: Wiki automated CI, maintainer-confirmed fix, approved-host reproduction, fixed Desktop build.