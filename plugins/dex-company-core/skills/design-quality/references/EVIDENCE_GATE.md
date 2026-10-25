# Evidence gate

Run the bundled validator with the Runtime-supported Node 24.x. It uses only Node built-ins and performs no network or subprocess work.

```sh
node scripts/validate-design-evidence.mjs --plan-sha256 PLAN.json
node scripts/validate-design-evidence.mjs PLAN.json EVIDENCE.json
```

The first command returns the canonical plan hash that the agent records as `planSha256`; users should not have to calculate or edit hashes manually. The second exits 0 only with `EVIDENCE_PACKAGE_COMPLETE`; any validation issue exits 1 with `BLOCKED`.

`EVIDENCE_PACKAGE_COMPLETE` means only that the declared version-2 package is structurally complete and its local files match the recorded hashes. It is not a Task `PASS`, verifier verdict, canonical outcome, visual-quality judgment, WCAG certification, reviewer identity proof, truthful-execution proof, merge approval or installation evidence. When linked to a Dex Task, record it as one detailed evidence/check result. Never use it to hide a detailed `FAIL`, change `Not Checked` to PASS, or replace canonical Task validation.

## Plan binding and exact version 2 input

Freeze and review the plan before implementation. The hash detects stale or accidentally substituted plan contents; because an actor can rewrite both files, it is not an external signature or approval attestation. Reducing required checks after a failure is not a repair.

PLAN.json has exactly `schemaVersion` (number 2), `taskId`, `revision`, `authorRunId`, and `requiredChecks`. `revision` must be immutable and formatted as `git:` plus a 40- or 64-character lowercase commit digest, or `sha256:` plus a 64-character lowercase content digest. Each required check has exactly `id`, `kind` (`mechanical`, `visual`, or `accessibility`), `viewport` (integer `width` and `height`), and `state`.

EVIDENCE.json has exactly `schemaVersion` (number 2), `taskId`, `revision`, `planSha256`, `checks`, and `review`. Task and revision must match the plan, and `planSha256` must match the canonical hash of the complete plan object. Each check has exactly `id`, `status` (`PASS`, `FAIL`, or `Not Checked`), `runId`, `artifact`, and `summary`. Review has exactly `status`, `reviewerRunId`, `artifact`, and `summary`.

Plan/check IDs match exactly with no duplicates, omissions, or extras. Every required check and review must be PASS for package completion. The reviewer run ID must differ from the author and every check run ID. Its report must also differ from every check artifact by both path and digest. These declarations document separation; they do not authenticate a person.

Task, check, state, and run identifiers are trimmed single-line strings of at most 128 characters. Summary fields are trimmed single-line strings of at most 4096 characters. Viewport width and height are integers from 1 through 16384.

## Local artifact boundary

Each artifact contains exactly `path` and `sha256`: a forward-slash relative path below EVIDENCE.json's directory and its lowercase SHA-256 digest. The validator accepts regular local files only. It blocks URLs, remote shares, device namespaces, alternate data streams, drive-qualified artifact paths, absolute paths, traversal, empty path segments, leaf or in-root symlinks, and Windows reserved path components.

A stable symlink or junction above the requested input directory is canonicalized so normal platform paths can work. The PLAN/EVIDENCE files, evidence root itself, and every artifact component must not be symlinks. Use a stable trusted local directory: this helper detects several file-replacement races but is not a sandbox against a concurrently hostile filesystem.

Limits are 1 MiB per JSON input, 1-512 checks, 25 MiB per artifact, 64 MiB across distinct declared artifact paths, and 128 reported issues. Reusing the same path does not spend the aggregate budget twice. Missing, unreadable, changed, oversized, stale, failed, or unchecked evidence blocks completion without echoing input contents or unsafe paths.

## Minimal synthetic plan

```json
{"schemaVersion":2,"taskId":"EXAMPLE","revision":"git:aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa","authorRunId":"author-a","requiredChecks":[{"id":"mobile-default","kind":"mechanical","viewport":{"width":360,"height":800},"state":"default"}]}
```

Create EVIDENCE.json only from actual checks and reports, using the hash command above. Package-test fixtures are validator behavior tests, never product acceptance evidence. Runtime focused test command:

```sh
node --test test/design-evidence.test.mjs test/dex-plugin-package.test.mjs test/task-execution.test.mjs
```
