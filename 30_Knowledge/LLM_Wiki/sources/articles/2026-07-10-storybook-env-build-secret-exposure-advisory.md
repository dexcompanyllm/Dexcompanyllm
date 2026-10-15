---
type: llm-wiki-source
status: active
title: "Storybook .env Build Secret Exposure Advisory"
created: 2026-07-10
updated: 2026-07-10
dateCreated: 2026-07-10
dateModified: 2026-07-10
confidence: high
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-10
verifiedBy: Dex
disputed: false
sourceKind: official-security-advisory
source: "https://storybook.js.org/blog/security-advisory/"
crossCheck:
  - "https://github.com/storybookjs/storybook/security/advisories/GHSA-8452-54wp-rmv6"
collectionPurpose: "Dex Company frontend QA에서 Storybook 정적 빌드가 .env secret을 공개 artifact에 포함할 수 있는 조건, patched version, rotation/validation gate를 보존한다."
tags:
  - llm-wiki/source
  - frontend
  - storybook
  - security
  - secret-management
---

# Storybook .env Build Secret Exposure Advisory

## Original Content

- Source: https://storybook.js.org/blog/security-advisory/
- Cross-check: https://github.com/storybookjs/storybook/security/advisories/GHSA-8452-54wp-rmv6
- Publisher: Storybook / GitHub Security Advisory
- Collected: 2026-07-10 11:04 KST
- Preserved scope: URL, publisher, advisory metadata, affected/patched version ranges, Dex Company operational rule, and verification limits. Full source text was not copied.

## Easy Explanation

Storybook disclosed a vulnerability where some built and published Storybooks could unexpectedly include variables from local `.env` files in generated static artifacts. If those variables contained secrets and the Storybook build was published to the web, those secrets should be treated as exposed.

## Source-Backed Findings

- Affected condition: Storybook is built in a directory containing `.env` variants, the file contains sensitive secrets, Storybook version is `7.0.0` or above, and the built Storybook is published to the web.
- Patched versions: `7.6.21`, `8.6.15`, `9.1.17`, and `10.1.10` or later.
- Recommended action: audit for secrets in `.env` files, rotate exposed keys when applicable, and upgrade both local and CI Storybook before publishing again.
- The advisory distinguishes static published builds from `storybook dev` and from deployed applications that merely share the same repository.

## Dex Company Use

- Frontend QA must treat published Storybook output as a deployable artifact, not just a local design/dev preview.
- Before publishing Storybook or Chromatic-style builds, Dex should check whether `.env`, `.env.local`, `.env.dev`, or similar files exist at build time and whether any sensitive values could be bundled.
- If a project uses Storybook `7.x` to `10.x`, QA should record the installed version and patched threshold before publishing.
- If a secret-bearing `.env` may have been included in a previously published Storybook, the correct response is key rotation and artifact invalidation/rebuild, not just a version bump.

## Evidence Quality

- source-backed: Storybook official advisory and GitHub Security Advisory agree on affected versions, patched versions, exposure mechanism, and recommended actions.
- Dex inference: Dex Company should add a frontend QA gate for Storybook static build secret exposure because it maps directly to `secret` handling, published artifact review, rollback, and validation evidence.
- not checked: no local project Storybook version, `.env` file, CI pipeline, Chromatic project, or published artifact was inspected in this run.

## Codex Portability

- Portable to Codex as a file-based frontend/security checklist: inspect package versions, build command, `.env` presence, CI secret source, published artifact scope, and rollback/rotation evidence.
- No Storybook package, Chromatic tool, GitHub workflow, browser extension, connector, SDK, or MCP server was installed or executed.

## QA / Validation Rule

For any project that publishes Storybook:

1. Record `storybook_version`.
2. Record `storybook_build_command`.
3. Check `env_files_present_at_build`.
4. Confirm `storybook_patched_version_threshold_met`.
5. Confirm `published_artifact_secret_scan_or_review`.
6. If exposure is possible, record `secret_rotation_required`, `artifact_rebuild_required`, and `rollback_or_unpublish_path`.

## Bias Check

- Counter-argument: not every project publishes Storybook; local `storybook dev` alone is not the same risk.
- Data gap: this run did not inspect an active repository, CI pipeline, Chromatic account, or published Storybook artifact.
