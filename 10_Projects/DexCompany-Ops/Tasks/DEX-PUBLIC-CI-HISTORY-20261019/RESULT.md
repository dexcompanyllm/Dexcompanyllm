# Public CI history repair — validation checkpoint

- State: candidate prepared; independent review, exact remote CI and main approval/merge receipt belong in the associated PR.
- Root cause: file-only cross-account copy retained an original-repository Git-history dependency. The failure predates the later role-policy merge; the owner's retry failed at the same command.
- Repair: supply exact historical bytes from a reviewed, independently pinned public archive. Seven original source blobs are preserved; one historical status block retains only the previously approved public redaction. All current documents are still compared in full with the unchanged renderer and evidence validator. No test or workflow step is bypassed.

| Check | Result | Scope |
|---|---|---|
| Original failure reproduction | PASS | Native pre-fix command exits nonzero without original history |
| Existing plus new regression suite | PASS: 26/26 | Original 18 checks plus eight real-CLI/path/integrity regressions |
| Actual operations consistency CLI | PASS | All eight current documents; seven original blocks plus one authorized redaction |
| Actual catalog/index | PASS | One public project, ten authority references |
| Real CLI without Git | PASS | No Git directory/executable; no fallback or auto-generated expectation |
| Drift, archive tampering/missing data, duplicate/missing/extra paths, permission promotion and symlinks | PASS | Corrupted scenarios return nonzero with no success output |
| Deleted project scan in decoded archive | PASS | Decoded historical data scanned, not just base64 text |
| Remote latest-head CI / independent review | Pending | Exact receipts belong in PR |
| Physical devices / deployed services / receiving AI behavior | Not Checked | Not part of document-consistency repair |

All eight current documents, `OPS_SNAPSHOT.json`, provider configuration, common contract and the workflow are unchanged. The original private Wiki retains its own Git-history verifier. A successful current-tree verification does not erase old failed runs, prove physical-host readiness or verify application availability.
