# Design Quality upstream review — 2026-11-12

Task: `DEX-DESIGN-QUALITY-UPDATE-20261112`. Dex baseline: `90dfe999886048f1f39ba68759f9f965f1fa81b7`. Candidate plugin version: `1.4.1`.

This record describes the first source-adaptation candidate. Subsequent 1.5.0 package, independent review, controlled smoke and install/discovery results are recorded in `RELEASE_VERIFICATION_20261112.md`; initial failures below remain historical results.

This is a selective documentation update prepared for PR review. It does not establish complete upstream synchronization, installation, fresh-session invocation, rendering, device acceptance or measured improvement. The other two common skills are inventoried in `docs/SKILL_MAINTENANCE.md` in the source repository and are unchanged.

## Frozen inputs

Current provenance contains the new pins and reviewed-file hashes. `reviews/2026-10-23.json` preserves the original provenance exactly. All 16 previously recorded source files were retrieved at their old commits and matched their recorded Git blob SHA and SHA-256. Eighteen selected files at the new commits, including the five licenses and the new impeccable NOTICE.md, were retrieved and matched their Git blob SHA; their SHA-256 values are recorded in current provenance. These are file-integrity checks, not semantic or behavioral verification.

| Source | Previously reviewed | Newly reviewed default-branch head |
|---|---|---|
| [taste-skill](https://github.com/Leonxlnx/taste-skill) | `6010f91a9935f1c167dfc500fb1a475681892e6b` | `f6b76575f949707b4e3c37cd86cb44b0b98643e8` |
| [impeccable](https://github.com/pbakaus/impeccable) | `cf9ec0c3769283e5edee088dc61d039b039b7546` | `b4bff1626c344067788c2679f048a20057c7cc5a` |
| [Emil skills](https://github.com/emilkowalski/skills) | `2d228630ba1446365f614a108cb8252f1feda202` | `f7ce8c02d6e3c8f0d980a44c57bcc41a40254349` |
| [diagram-design](https://github.com/cathrynlavery/diagram-design) | `7a12007b5a4246894f342a2e52e78facbc62eca3` | `f6db0decea96de66b901331a0f79a8d4b147ebae` |
| [ppt-master](https://github.com/hugohe3/ppt-master) | `622bf0148bca4f697b0184322c7e2aa2a04520a2` | `01fe549371b98f44be22cd337bbc911013452f09` |

Heads were observed on 2026-11-12 and frozen for this review; they are not a promise about later upstream HEAD. Comparison URLs are in current provenance. The review covers the selected files, not every intervening commit or newly added upstream workflow.

## Three-input decisions

The earlier upstream documents and current Dex references were compared with the newly pinned documents. The current Dex adaptation remains the authority for project conventions and execution boundaries.

| Source change or reviewed topic | Dex decision and reason | Destination |
|---|---|---|
| taste-skill's SKILL.md has substantially changed; old `references/app-screens.md` and `references/critique.md` are absent in the new tree | Retain prior app/workflow, honest-data and rendered-critique principles. They still apply to Dex apps; no one-to-one successor file is claimed. Preserve the older source pin for this retained material. | Existing APP_WEB_CRAFT.md and retained-source record |
| taste-skill's current copy, gate and performance references | Expand review to `copy.md`, `gate.md` and `perf.md`; adapt clear product/action wording, truthful form results, fallback visibility, scope of quick checks, finding-level dispositions, and measurement conditions. These files are newly selected for Dex review, not claimed to be newly introduced upstream. | APP_WEB_CRAFT.md |
| taste-skill's current mandatory animation, one/two-screen sections, palette draws, caption/color bans and copy quotas | Exclude: project direction, Korean copy, approved captions and content completeness control the result. Do not generate plausible business facts or hide synthetic status to satisfy an upstream check. | Existing exclusions retained and clarified in APP_WEB_CRAFT.md |
| taste-skill's Stop hook, gate scripts, kit assets, Chrome restrictions, automatic asset acquisition and upstream verdicts | Exclude execution and asset import. Retain Dex's own tools, evidence gate, authorization and failure semantics; no inherited `GATE: PASS`, waiver mechanism or changed retry limit. | SKILL.md and existing EVIDENCE_GATE.md preserved |
| impeccable's selected critique reference now draws project personas from PRODUCT.md Users/Brand Commitments rather than AGENTS.md Design Context, and handles opted-out report storage | Adapt audience/brand grounding through existing approved Dex context. Retain hypothetical status for personas. Exclude upstream filename mandates, storage commands, scoring and persistence behavior. | APP_WEB_CRAFT.md |
| Emil's two selected files qualify Motion shorthand acceleration by version 14.2 and identify layout/callback/value-driven exceptions | Adapt version-aware diagnosis and require observed traces. Do not make blanket shorthand findings, guarantee GPU execution or install/upgrade a library automatically. | APP_WEB_CRAFT.md |
| diagram-design expands types/imports, adds traceability/event-modeling guidance, corrects installed script paths and label-mask background roles, and includes letter spacing in box checks | Adapt source inventory, explicit traceability gaps, label-spacing/mask and actual-background contrast review. Exclude fixed type/node budgets, new importer support claims, upstream scripts and palette replacement. | REPORT_CRAFT.md |
| ppt-master selected SKILL.md changes version 6.7.3 → 6.9.0 and image-to-PPTX runtime label; plan-core.md delegates illustration split decisions to another reference | Reviewed, no applicable semantic change adopted into the existing Dex report-planning scope. Preserve current format-workflow ownership, editable text and provider independence. Do not import unreviewed image-generation workflows. | REPORT_CRAFT.md retained; provenance review only for this source |

All five reviewed license files are byte-identical to the old pins and bundled license texts. The newly pinned impeccable tree includes NOTICE.md crediting ehmo/platform-design-skills for ios.md and android.md. The complete notice is preserved at `licenses/impeccable-NOTICE.md`; those platform references were not adopted. No external code or assets were imported, and no upstream command was run. Existing license notices remain applicable to the retained older material.

## Author walkthrough of candidate instructions

These are document-level reasoning checks, not executed design tasks, user research, independent review or A/B evidence.

| Representative input | Required candidate behavior | Author review |
|---|---|---|
| Korean business page with approved violet palette, captions and no confirmed prices/hours | Preserve the approved style/copy; leave facts unresolved or proposed instead of applying taste defaults | Consistent with candidate and existing contract |
| Prototype contact form with no connected endpoint | Disclose simulation; no real-submission success claim or unauthorized test send | Consistent |
| Current Motion HTML shorthand with a slow layout animation | Inspect installed version, configuration and trace; do not blame shorthand or promise compositor execution from syntax alone | Consistent |
| An attractive image slot or reveal is blank under reduced motion or failed image loading | Inspect the affected state and preserve essential content; a quick screenshot alone does not pass the behavior | Consistent |
| Busy CPU host or a WebGL-disabled benchmark | Report sampling/host/fallback conditions separately from real-device and field measurements | Consistent |
| Mixed Korean/Latin diagram with long IDs, arrow masks and missing verification links | Preserve entities/IDs and visible gaps; measure actual text/spacing, inspect masks, expand or separate detail | Consistent |
| App review with no rendered target or only a structurally complete manifest | Rendering remains Not Checked; package completeness does not become Task PASS | Consistent with unchanged evidence gate |

## Validation and release state

Environment: Node `v24.22.1`. Dependencies installed from the unchanged lockfile with `npm ci --ignore-scripts --no-audit --no-fund`.

| Check | Baseline | Candidate |
|---|---|---|
| `node --test test/dex-plugin-package.test.mjs test/design-evidence.test.mjs` | 70 tests: 69 PASS, 1 FAIL | 70 tests: 69 PASS, same 1 FAIL; no new failures |
| Evidence-validator tests within that command | 60 PASS | 60 PASS |
| Package tests within that command | 9 PASS, 1 FAIL | 9 PASS, same 1 FAIL |
| Original source file SHA-256 and Git blob SHA | 16 recorded files match | Archived original record preserved byte-for-byte |
| Newly reviewed file SHA-256 and Git blob SHA | Not applicable | 18 files match the frozen source pins |
| License comparison | Five bundled licenses | All five unchanged and match old/new upstream files |
| Local links, archive references and `git diff --check` | Not applicable | PASS |
| Existing validator, EVIDENCE_GATE.md, other two SKILL.md files, AI_CONTRACT.md and package-lock.json | Frozen baseline | Byte-identical |

The existing failing test is `repo marketplace points to the canonical Dex plugin with explicit policy`: `.agents/plugins/marketplace.json` is absent in this public baseline (ENOENT). The test remains enabled and failing; no marketplace registration or installation policy was added to silence it. The manifest version assertion was updated from `1.4.0` to `1.4.1` for this candidate. Full runtime CI was not run because runtime implementation/configuration was not changed. This is not an all-checks-PASS claim.

Source preparation and author document review are complete. Independent review, merge, installation, fresh-session invocation, representative real-task comparison and device verification are `Not Checked`. Effectiveness is `Not Measured`. The scenario table above is not evidence that the skill was installed or produced an improved design.

Rollback: revert the eventual update commit through the repository's reviewed Git process. The archived provenance allows reconstruction of the previous source mapping. No runtime configuration or installation state was changed.
