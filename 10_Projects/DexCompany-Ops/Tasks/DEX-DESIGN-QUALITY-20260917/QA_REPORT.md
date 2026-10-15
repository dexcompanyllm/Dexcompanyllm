# QA report

Task: DEX-DESIGN-QUALITY-20260917 · initial review 2026-09-17 KST · latest-main revalidation 2026-09-19 KST

## Scope

This result covers the merged design-quality source, its local evidence-package validator, and latest-main integration. It does not claim completed product design, full accessibility compliance, approved-host installation, provider receipt, or measured design improvement.

## Owner-approved source release — 2026-09-19

This section supersedes the older candidate checkpoint below for current source/approval state. Historical test observations remain scoped to their original commits.

| Check | Result | Exact evidence |
|---|---|---|
| Latest main integration | PASS | Runtime main `5f90b2f2d10bf4baef5a546f806319578304c458` (#239) into head `b786291395e8a064cb7b49c262eeb6f570521f76`; ahead 4 / behind 0, 12 intended paths |
| Independent preservation | PASS | All 12 PR blobs/patches and the 3 new-main blobs/patches preserved; #234/#237/#238/#239 boundaries retained |
| Exact-head full CI | PASS | PR run #957 `35412334776` and push run #956 `35412332564`; 426 total / 425 pass / 0 fail / 1 existing host-only skip; static/smoke/rollback/audit PASS, 0 vulnerabilities |
| Three-OS portability | PASS | Run #2 `35412334762`; Windows/macOS/Ubuntu each 60/60 PASS, fail/skip 0 |
| Runtime source merge | PASS | PR #235 actual merge `dd461ac508f950bd3757db48795655e623e31b21`; tree `8337e53e448ad74df0379e219a1a70d7b187df1c` equals validated head tree |
| Exact merge-SHA main CI | PASS | Main push run #958 `35412400579`; same 426/425/0/1 counts, all steps success, audit 0; Vercel success |
| Wiki canonical proposal | Source gate PASS | Only after the actual Runtime merge and main CI, registry source 1.3.0/merge SHA prepared on current Wiki base `e22c36bb2987cad4f1dd7e83b94286c3b6aaa295`; becomes canonical on Wiki PR #192 main merge |
| Registry preservation | PASS | Stable candidate ID retained; three packaged skills share source version 1.3.0; install fields remain null/Not Checked; unrelated entries/sources, scheduled lastRun, automation, historical manualIntegration retained |
| Wiki exact-head/main CI | External publication gate | Record final head, CI and actual merge SHA on PR #192; no future self-commit is predeclared here |
| Installation/fresh session/pilot | Not Checked / Not Measured | Current Work has no codex executable or connected approved host. Authorized P1-P3 plan is in PILOT_PLAN.md; no installation or fabricated A/B result |

Approval is already granted for the gated source merges, approved-host installation and 3-5 case pilot. This is a capability blocker, not an approval request. Source PASS never substitutes for rendered/WCAG or effectiveness evidence.

## Historical baseline evidence

| Check | Result | Evidence and limit |
|---|---|---|
| Initial baselines | PASS | Wiki `41c7376` / Runtime `e22d350`; retained as intake provenance, not current state |
| Initial candidate | PASS for exact old head | Runtime `e7601e7`; validator 44 + package 8 = 52 PASS and historical CI success |
| Source-only Console analysis | PASS | Seven confirmed/inferred CSS/HTML/JS risks; not a rendered reproduction |
| Independent scenarios | PASS | Three forward scenarios separated structural evidence from design/deploy approval |
| Historical PDF record | Not revalidated | The initial record says 9 rendered pages and records a hash, but the PDF is not in this six-path candidate and has no durable artifact URL; it is not current acceptance evidence |

## Historical candidate integration evidence — before #239 and final source approval

| Check | Result | Evidence and limit |
|---|---|---|
| Current baselines | PASS | Wiki main `75e05586e1f27ca24242e84de0300b50e7658ebc`; Runtime main `ef3ee1d5f5ba5f07643c9a2e76ee1b09166a0fda` |
| Runtime candidate | PASS | exact head `0181e59a13c3a56a77c0730fe083581d89d65502`; draft, source not merged |
| Current-main compare | PASS | explicit `ef3ee1d… → 0181e59…`: ahead 3, behind 0, merge-base=current main, 12 paths (9 added/3 modified), no #237/#238 implementation path delta |
| Runtime full validation | PASS | run 949: 426 total / 425 pass / 0 fail / 1 existing host-only skip; static, unit, smoke, Vercel adapter smoke, rollback guard and production audit passed; 0 vulnerabilities |
| Validator portability | PASS | run 1: Node 24 Ubuntu 60/60, macOS 60/60, Windows 60/60; fail/skip 0 on every OS |
| Vercel status | PASS | exact candidate status succeeded; this does not mean source merge or product design acceptance |
| #234 automatic handoff regression | PASS | `list_handoffs`, `get_task_handoff`, `nextPage`, warning/truncation, `snapshotChanged`, shared-handoff fallback and read-only receipt boundaries retained; existing handoff/PWA/MCP tests and new package markers passed |
| #237 Task context regression | PASS | caller inputs/validation round trip, detailed FAIL precedence over summary PASS, `Not Checked` preservation, and writer/Watchdog/verifier evidence separation passed in full CI |
| #238 guard preservation | PASS | recommended 0.151.0, disabled capability state, and cost/extra-usage guards unchanged by the explicit compare |
| Independent hardening review | PASS | no merge blocker after plan binding, review separation, aggregate cap, Windows path and canonical-symlink fixes |
| Wiki candidate publication | Pending exact-head CI | Record the Wiki head/run after this branch update; do not reuse the old Wiki CI as new-head evidence |

GitHub's PR REST metadata retains the historical creation-time base and can list 52 historical paths that are already in main. The merge DAG and review scope use the explicit current-main compare above; GitHub reports the PR mergeable state as clean. CI checked PR merge ref `65fc0fdd…`, whose tree equals candidate head tree `4d2a6664…` integrated with `ef3ee1d…`.

## Security and provenance

The executable uses Node built-ins and adds no network, subprocess, credential, or write action. Schema v2 binds evidence to canonical plan contents and an immutable revision. Reviewer run IDs differ from author and all check runs, and the review report cannot reuse check artifact path or digest. Limits are 1 MiB per JSON, 25 MiB per artifact, and 64 MiB aggregate. Traversal, URLs, UNC/device/ADS paths, Windows reserved components, input/root/in-root symlinks, mutation and digest mismatch block completion; stable ancestor links are canonicalized.

`EVIDENCE_PACKAGE_COMPLETE` means structural and trusted-local-file integrity only. It never supplies a canonical Task verdict/outcome, removes a detailed FAIL, or upgrades `Not Checked`. Run IDs do not authenticate people, plan hashes are not external signatures, artifact contents can still be dishonest, and this is not a sandbox against a concurrently hostile filesystem.

The implementation is Dex-owned and original. External design references were paraphrased with provenance; no third-party Skill code or asset was copied.

## Not Checked / Not Measured

- Actual Console or product rendering and the originally reported visual defects
- Approved-host installation, marketplace reconciliation, fresh-session Skill discovery, and receiving-provider invocation
- Galaxy/iPhone/physical-device behavior and assistive-technology acceptance
- Visual quality, reviewer identity, truthful execution, and WCAG conformance
- Design-defect reduction across the first 3-5 comparable tasks
- Wiki publication exact-head/main CI: follow the actual PR #192 run and merge record

The three-OS workflow used bounded GitHub Actions minutes. It did not enable a paid model/API, automatic extra usage, new credentials, or a deployment/permission change.

## Evidence links

- Runtime actual merge: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/commit/dd461ac508f950bd3757db48795655e623e31b21
- Runtime final branch CI #957: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35412334776
- Final portability #2: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35412334762
- Runtime merge-SHA main CI #958: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35412400579
- Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/235
- Runtime validation #949: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35404792716
- Portability #1: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35404792776
- Historical initial-head CI: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35160669976
- Historical plan-PDF record only: SHA-256 `b0ed174f46e2c458706dccf6efb69da46abc4d8469c4bc6c1003c93c9ee6f6b5`; artifact presence was not revalidated
