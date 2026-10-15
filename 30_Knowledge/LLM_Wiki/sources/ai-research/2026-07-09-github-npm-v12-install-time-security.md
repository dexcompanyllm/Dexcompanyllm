---
type: llm-wiki-source
status: captured
title: "GitHub npm v12 install-time security defaults"
sourceKind: official-changelog-and-docs
source:
  - "https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/"
  - "https://github.blog/changelog/2026-06-09-upcoming-breaking-changes-for-npm-v12/"
  - "https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts/"
  - "https://docs.npmjs.com/trusted-publishers/"
publisher: GitHub / npm Docs
capturedAt: 2026-07-09T03:04:00+09:00
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
collectionPurpose: "npm v12 install-time security defaults와 2FA-bypass token deprecation이 Dex Company package/install approval packet 기준을 바꾸는지 확인한다."
confidence: high
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - npm
  - supply-chain
  - install-audit
  - security
---

# GitHub npm v12 install-time security defaults

## Source Snapshot

- Publisher: GitHub / npm Docs
- Primary changelog: https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/
- Prior warning changelog: https://github.blog/changelog/2026-06-09-upcoming-breaking-changes-for-npm-v12/
- npm command docs: https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts/
- Trusted publishing docs: https://docs.npmjs.com/trusted-publishers/

## Key Points

- npm v12 is marked generally available and tagged `latest` in the GitHub changelog.
- Install-time dependency lifecycle scripts and implicit native builds are opt-in unless explicitly allowed.
- Git dependencies and remote URL dependencies are no longer resolved by default unless allowed.
- `npm approve-scripts --allow-scripts-pending` is documented as a read-only way to list packages whose install scripts are not yet covered by `allowScripts`.
- npm 2FA-bypass granular access tokens lose sensitive account/package/org management uses in early August 2026 and direct publish capability around January 2027, per the GitHub changelog.
- npm docs recommend trusted publishing and restricting traditional token publishing where possible.

## Dex Company Use

For any Node/npm package candidate, Dex Company approval packets should now include:

```yaml
npm_install_security:
  npm_major_version: checked | not_checked
  allow_scripts_policy: reviewed | not_checked
  pending_install_scripts: none | listed | not_checked
  git_dependency_allowance: none | scoped | not_checked
  remote_url_dependency_allowance: none | scoped | not_checked
  native_build_approval: reviewed | not_checked | not_applicable
  allowlist_committed: yes | no | not_checked
  ci_strict_install_policy: checked | not_checked
  publish_token_type: none | trusted_publishing_oidc | granular_token | not_checked
  human_2fa_publish_or_stage_gate: checked | not_checked | not_applicable
```

## Evidence Quality

- source-backed: GitHub changelog and npm docs describe the new install-time defaults, approval command, token deprecation direction, and trusted publishing guidance.
- Dex inference: Dex Company should require an npm install-time allowlist review before approving package installs or upgrades.
- not checked: local npm version, target project `package.json`, actual pending scripts, CI install flags, current npm token settings, and publish workflow.

## Risk Notes

- Supply-chain: blocking install scripts reduces one attack surface but does not prove package runtime safety.
- Sensitive information disclosure: publishing tokens and 2FA bypass behavior must be checked before CI release automation changes.
- Insecure output handling: generated package changes should not be merged only because install succeeds; allowlist deltas should be reviewed.
- Overreliance: npm v12 defaults are not a substitute for sandboxing, egress review, package provenance, or runtime tests.

> [!note] Bias Check
> Counter-argument: npm v12 install-time defaults reduce automatic script execution, but malicious packages can still execute at runtime after import or through explicit build/test commands.
> Data gap: This note did not inspect Ethan's local npm version, project dependency tree, pending script list, CI flags, or publish-token settings.

## Original Content

This note preserves source metadata, short paraphrases, and Dex Company approval-packet implications from GitHub/npm public documentation. It does not copy the full changelog or npm docs and does not claim any local project has npm v12 enabled.
