# Codex Windows scope-isolation security watch — 2026-09-03

## Official source

- https://github.com/openai/codex/issues/42434

This is a final fresh-cutoff security addendum after Wiki PR #124.

## confirmed signal / allegation unverified — Issue #42434

OpenAI's public Codex repository has an open issue labeled `bug`, `windows-os`, `sandbox`, `CLI`, and `tool-calls` reporting Codex CLI `0.151` on Windows 10 x64 accessing system information and Chrome-private files outside the folder scope the reporter believed was granted.

This confirms the existence of a security-relevant report, not its root cause or reproducibility. The exact effective sandbox/approval settings are unverified, there is no maintainer-confirmed fix, and applicability to Codex `0.153.0` or the Dex approved Windows worker is unknown.

The attached reporter log/private material was not ingested.

## Dex classification

- `confirmed`: official issue + Windows/sandbox/tool-call labels.
- `inference`: out-of-scope reads would violate confidentiality even if repository mutation remains bounded.
- `proposal`: add synthetic out-of-scope read canaries to #28 approved-host isolation E2E and fail closed on any breach.
- `unknown / Not Checked`: maintainer root cause/fix, current stable reproduction and Dex approved-host impact.

## Approved-host #28 security Gate

- use only synthetic non-secret canaries outside the approved project realpath but inside the dedicated test worker profile;
- never inspect real browser credentials, personal profile files or production secrets for the test;
- verify direct filesystem, shell/tool and nested-tool reads cannot access the synthetic out-of-scope canaries;
- representative browser-profile/credential-store path patterns use synthetic/empty fixtures only;
- system-information availability must not imply or broaden filesystem authorization;
- provider/tool success text is not sufficient evidence; deterministic broker/Watchdog path evidence is authoritative where available;
- any confirmed out-of-scope read is FAIL and makes the host/profile ineligible for unattended Dex mutation until containment is verified;
- failure never enables broader sandbox, personal-profile execution, out-of-sandbox fallback, `danger-full-access`, alternate credential paths or paid-provider fallback;
- canonical Runtime/Wiki repositories and personal profiles remain untouched by the canary test.

## Existing controls preserved

This Gate supplements the dedicated worker identity, profile-local `CODEX_HOME`, project→realpath registry/digest, child-environment allowlist, output secret scan, broker-owned approval/mutation lock, Windows sandbox/ACL coherence checks, and canonical GitHub Task/Result authority.

## Runtime application

Runtime PR #146 records the same security Gate.

- branch head: `d11c70822fb9bff99f2278c2ef2a2d4f03ff25eb`
- Runtime validation `33712077051`: PASS — install, static/unit/smoke and production dependency audit
- branch Vercel: PASS
- merge commit: `3c74ab0bdb4872bcc238462cdc570c2276f6a934`
- Runtime behavior/config/permission/billing/plugin/deploy change: none; docs-only

## Safety boundary

No personal browser/private data access, ACL/sandbox change, broader read root, out-of-sandbox probe, Codex promotion, paid API/fallback or destructive cleanup is performed.

## Verification status

| Check | Result |
|---|---|
| Issue #42434 official-repository existence | PASS |
| Windows/sandbox/CLI/tool-call labels | PASS |
| Runtime PR #146 validation | PASS — `33712077051` |
| Runtime PR #146 branch Vercel | PASS |
| Runtime PR #146 merge | PASS — `3c74ab0bdb4872bcc238462cdc570c2276f6a934` |
| Maintainer-confirmed root cause/fix | Not Checked |
| Reproduction on Codex 0.153.0 | Not Checked |
| Dex approved-host synthetic scope-isolation E2E | Not Checked |
| Personal/browser credential inspection | Not Checked — intentionally prohibited |
| Wiki change | docs-only |
