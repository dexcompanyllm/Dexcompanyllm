# DEX-PUBLIC-CI-HISTORY-20261019

- Classification: CAPABILITY / verification repair.
- Owner request: analyze and respond to the public repository's repeated failed Wiki operations consistency runs.
- Base: public `dexcompanyllm/Dexcompanyllm` main `359e480d8a16cce53d8235ba7c6f6a706ba53199`.
- Confirmed failure: run `39072905902`, attempt 2, job `117797405511`; `git show 507331d82cc3016373d1e6d351b8f38f41fa4f98:CURRENT_STATE.md` fails because this file-only copy lacks original historical objects. Rerunning unchanged code cannot supply those objects.
- Scope: public historical-data loader, a fixed approved public-history archive, regression tests and this task/provenance record.
- Preserve: all eight current documents and snapshot, common AI policy, existing render/verify semantics and tests, Actions commands/permissions, private repositories, deployed applications and the owner's public project cleanup.
- Acceptance: full existing workflow succeeds without original Git history; all eight full documents still fail on unauthorized status/security/history changes; absent/corrupt/wrong archives and symlink boundary bypasses fail closed; source provenance independently verified; deleted project data not reintroduced.
- Authorization: prepare the owner-requested correction and reviewed PR. Main merge follows AI_CONTRACT §9 and any applicable existing owner approval; do not claim a proposed branch is approved main.
- Recovery: reverting this repair would restore the known missing-history failure. Do not disable Actions, suppress notification settings, import private project history, weaken validation or regenerate a baseline to make a failing check green.
