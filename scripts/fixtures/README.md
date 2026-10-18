# Public history verification data

`ops-history-public.json` is fixed verification data, not a Bootstrap instruction, current Task authority or runtime-generated cache.

- Original reference: private Wiki commit `507331d82cc3016373d1e6d351b8f38f41fa4f98`.
- Reviewed public export: commit `359e480d8a16cce53d8235ba7c6f6a706ba53199`, tree `a7534bb4b34e5a80e6e2881dfb8d0267d928b533`.
- Seven historical blocks match the original source Git blobs exactly. The historical block for `CURRENT_STATE.md` contains only the previously owner-authorized public-copy project-status redaction from cleanup PR #4 / commit `74677096ce490cee3c4efbd71d53d3a9ecaf8657`; it is not claimed identical to the private original.
- Entries preserve exact historical bytes through base64, with source/public Git blob IDs, byte counts, SHA-256 and the redaction flag. The entire archive's exact length and SHA-256 are independently pinned in `ops-state.mjs` before parsing. That pin must not be read from the checked snapshot or supplied by the archive itself.
- The unchanged renderer validates all eight full documents against the snapshot and pinned historical bytes. No Git object lookup, current-file baseline generation, fallback, auto-repin or skipped verification occurs.
- Missing or changed data, current-document drift and file/symlink boundary failures stop the CLI with a nonzero status. Existing security, physical-host, billing and approval evidence remains unchanged.

Do not regenerate this archive from the current documents to silence a failure. Any future baseline change must identify an approved immutable source, independently compare all historical bytes and explicitly review the archive and checker pin together. For a new historical redaction, preserve the owner decision and exact redaction diff. Original private data or deleted project records must not be reintroduced.

The original private repository retains its native Git-history verifier. This public-copy export does not change its history or validation semantics.
