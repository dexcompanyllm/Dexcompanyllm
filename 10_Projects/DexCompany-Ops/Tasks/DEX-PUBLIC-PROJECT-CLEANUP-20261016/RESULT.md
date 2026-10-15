# Public project cleanup — validation checkpoint

- State: candidate prepared; independent review and remote persistence pending. Final commit and merge receipts belong in the associated PR.
- Removed: four individual-project directories, 78 tracked files including project specifications, handoffs, design assets and task records.
- Updated: shared records, historical audit subsets, catalog/index and the index registration example. Historical redactions are labelled; original verification results are not reissued as current results.
- Catalog: one retained operating-system project, ten authority references.

| Check | Result | Scope / limitation |
|---|---|---|
| Removed directory and embedded identifier/source-reference search | PASS | Retained tracked text and paths; scan repeated after final changes |
| JSON / UTF-8 / whitespace | PASS | Current changed/retained files |
| Catalog and generated index | PASS | Actual tracked files and authority references |
| Existing unit suite | PASS: 18/18 | Final run passed. Initial run found a test fixture that assumed a second registered project; its wrong-folder input now uses an explicit unrelated fixture path, preserving the same rejection assertion |
| Core policy / providers / preservation checker / workflow | Unchanged | Original Git blobs retained |
| Native historical document consistency | FAIL / known limitation | Public copy already lacks required original historical commit `507331d82cc3016373d1e6d351b8f38f41fa4f98`; the owner-requested status redaction also intentionally differs from original historical bytes. No checker or CI step is skipped or weakened |
| Historical erasure | Not performed | Earlier commits, PRs and branches still retain prior content |
| Deployed applications / private repositories | Not modified | Outside requested public-copy file deletion |
| Independent review | Pending | Writer-separated read-only review before merge |
| dex-watchdog / actual receiving AI tools | Not Checked | No execution or receipt is claimed |

Continue from this same task: review the final tree and tests, persist to a cleanup branch, open and merge the reviewed PR, then read back exact main tree and verify the private original head did not move. Record completed receipts in the PR without pretending the old history-preservation CI is green.
