# Common skill release verification — 2026-11-12

Package: `dex-company-core` source candidate `1.5.0`. This follows the original 1.4.1 upstream-adaptation review in `UPSTREAM_REVIEW_20261112.md`; it does not rewrite that run's results. The approved comparison base is `90dfe999886048f1f39ba68759f9f965f1fa81b7`.

## Source and package

- The original source record and the 16 old file hashes remain preserved. Eighteen selected current upstream files and the five bundled license texts were independently checked against their recorded hashes.
- `design-quality` contains the selected upstream adaptations, including version-aware Motion diagnosis. The maintenance procedure and adoption/exclusion decisions are bundled with the skill.
- `create-screen-spec` and `use-dex-company` remain the existing Dex-maintained source. Their current public source was reviewed against the current contract and exercised with bounded synthetic tasks. No external replacement lineage or newer equivalent was invented.
- A passive `.agents/plugins/marketplace.json` now exposes exactly the existing local plugin with `AVAILABLE` and `ON_INSTALL`. This resolves the existing marketplace ENOENT without skipping or weakening its test. It enables explicit manual installation, not automatic installation or a new runtime service.
- A minor version increment reflects additive manual installation support and workflow clarification. Existing skill names, artifact boundaries, authority, cost policy, evidence validator and dependencies are retained.

Relevant command: `node --test test/dex-plugin-package.test.mjs test/design-evidence.test.mjs`.

| Snapshot | Result |
|---|---|
| Original public 1.4.0 base | 69 PASS, 1 marketplace-file FAIL |
| First 1.4.1 adaptation candidate | 69 PASS, same 1 FAIL |
| 1.5.0 with explicit marketplace | 70 PASS, 0 FAIL |

The 60 evidence-validator tests pass. Full Runtime CI, deployment, native devices and provider-wide behavior were not tested; no Runtime code or configuration was changed.

## Controlled design comparison

Two synthetic existing artifacts were frozen before the runs: a Korean reservation page and a requirement/diagram report. Ground truth comprised six defects: unconfirmed form completion, meaningful content hidden under reduced motion, narrow-layout overflow, a long mixed-script label outside its node, an obscured connector/arrowhead, and missing RQ-002 design/verification links. Approved violet styling, captions, identifiers and unknown business facts had to remain intact.

Chromium locally captured desktop, mobile and reduced-motion views and exercised the synthetic form without an external send. It observed a 390px viewport with a 790px document, hidden flow content under reduced motion, immediate confirmation with no submission request, and text/mask geometry consistent with the screenshot defects. These are synthetic local observations, not real booking, user research or device/field measurements.

Separate fresh-context runs read the baseline and candidate instruction snapshots against identical source, screenshots and browser observations. A further separate reviewer inspected the raw artifacts and both outputs. Both outputs explicitly identified all six predefined defects, preserved style/IDs/unknown facts, and avoided unsupported real-world verification claims. The candidate initially grouped RQ-002 under another issue, giving it less prominence than the baseline. A general instruction to keep independently actionable defects separate was added in response; no expected finding count or prior verdict was supplied to the subsequent run.

This small comparison demonstrates bounded instruction use and preservation only. It does not establish better general design quality, equivalence, reduced rework, lower token/time use or field effectiveness. Those benefits remain `Not Measured`. Source adoption is justified by the documented version-aware correction, explicit verification boundaries and maintainable provenance; no broader performance gain is claimed.

The subsequent fresh-context candidate output framed the six predefined defects as six separate findings, including RQ-002. This supports the narrow report-clarity correction on this repeated controlled case; it does not erase the first output's limitation or establish general superiority.

## Other skill smoke checks

An isolated worker explicitly read the installed `create-screen-spec` skill, guide and template and produced a Markdown screen specification from a synthetic brief. It preserved `RSV-001` and the exact button label `예약 요청`, separated request receipt from confirmed booking, covered pending duplicate prevention and retained-input retry, and kept consent/retention and unapproved message literals open/TBD. It marked the artifact `READY_FOR_AUDIT`. Separate inspection confirmed those requirements were represented; this is not an independently approved customer artifact or executed product acceptance test.

The same worker explicitly read installed `use-dex-company` and exercised a missing-Task scenario. It discovered no available Dex handoff tools, verified the connected DEX COMPANY GitHub identity and public main, then read the contract and current state at that pin. It did not infer a project, receipt or successful execution, and did not fall back to personal/private repositories. This establishes bounded instruction-following and actual connected reads; it does not prove cross-provider handoff delivery.

## Installation and authentication scope

On this task's managed Linux host, Codex CLI `0.167.0-alpha.4` accepted the local marketplace and installed/enabled `dex-company-core@dex-company` version `1.5.0`. A new app-server process with a forced disk scan returned all three enabled namespaced skills from that version's cache without skill-loading errors. Cache/source byte equality was checked. Registration, cache presence and fresh-process discovery are separate from model invocation.

Two actual Codex CLI model requests failed with HTTP 401 authentication-token parsing after the local login command reported ChatGPT authentication. No credentials were printed or changed and no paid API fallback was used. Thus installed Codex CLI model invocation is `Not Checked` due to authentication failure. The controlled worker invocations above are a different verified surface and do not erase that failure.

The user's other PC, ChatGPT or Claude workspace was not connected for installation verification. Their installed versions and any GitHub-import sync state remain `Not Checked`. No legacy install was removed, no scheduler was activated, and Runtime remains source-only.

## Release interpretation

Source/package checks, bounded worker smoke checks, independent source/artifact inspection, and this host's install/discovery have their scopes stated above. Merge does not convert missing host/model/device checks into PASS. Preserve the initial comparison caveat and the authentication failure in handoff records. Rollback uses the recorded earlier source commit and explicit host installation history; installed cache files are never edited directly.
