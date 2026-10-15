# Codex local file-link rendering watch — 2026-09-02

## Status

- `confirmed`: OpenAI Codex PR #42123 merged to upstream `main` on `2026-09-01T19:52:52Z` after official stable `0.152.0`.
- `confirmed`: PR #42123 preserves descriptive Markdown labels alongside canonical local file targets and improves path-equivalence handling for relative/absolute paths, `file://`, percent encoding, separators/case, location suffixes, Windows drive paths and UNC paths.
- `confirmed`: OpenAI PR #42126, merged `2026-09-01T20:19:59Z`, changes only plugin-catalog test helpers to ignore non-JSON fixtures and is not treated as a Dex operational update.
- `confirmed`: Dex Runtime PR #82 merged documentation-only watch evidence at `dd46897753b73ce22b15ca3329ad1fd86cc50622`; Runtime Issue #81 tracks future stable / approved Windows-host E2E.
- `confirmed`: No Codex upgrade, prerelease/experimental capability, permission broadening, paid API/fallback, plugin/Skill mutation, or canonical Task/Result authority change was performed.

## Official sources

- OpenAI Codex PR #42123: https://github.com/openai/codex/pull/42123
- OpenAI Codex PR #42126: https://github.com/openai/codex/pull/42126
- Codex changelog: https://developers.openai.com/codex/changelog
- Latest stable release checked: https://github.com/openai/codex/releases/tag/rust-v0.152.0

## Dex classification

### confirmed

The change is a Codex TUI local-link presentation/reliability improvement. Descriptive labels are no longer discarded, but the canonical target remains visible. Upstream tests cover Windows and UNC path forms as well as path-equivalent label collapse.

Dex canonical authority does not change: GitHub Task/Result state, project realpath/digest boundaries, explicit approvals where required, mutation lock, durable receipt and detached verifier remain authoritative.

### inference

This should reduce review ambiguity and rework when Codex returns artifact links on Windows, especially when the same file appears as drive-letter, UNC, relative, absolute or `file://` forms. The main new risk is visual spoofing: a friendly descriptive label could be mistaken for the trusted path if the canonical target is not checked.

### proposal

When the first official non-prerelease stable containing #42123 is identified, validate on the approved Windows host:

1. Drive-letter, UNC, relative, absolute, `file://`, percent-encoded, trailing-separator and location-suffixed links render deterministically.
2. Equivalent labels collapse without changing the underlying canonical target.
3. Adversarial descriptive labels cannot replace the resolved target used by project binding, worker routing, security checks or canonical receipts.
4. Table wrapping and narrow-width rendering do not obscure provenance.
5. Displayed absolute paths are not unnecessarily persisted/exported into canonical Dex evidence when a bounded relative artifact reference is sufficient.
6. Promotion follows the normal stable-host gate; do not upgrade solely for this presentation improvement.

### unknown

- First official non-prerelease stable containing #42123.
- Approved Windows-host result across all path forms.
- Cross-surface parity across TUI, IDE, app-server clients and other Codex surfaces.
- Persistence/export semantics for rendered local targets outside the TUI.

## Runtime tracking

- Runtime PR #82: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/82
- Runtime Issue #81: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/81

## Verification

| Check | Result |
|---|---|
| Official PR #42123 metadata/diff | PASS |
| Official PR #42126 scan | PASS — test-helper-only / no Dex operational change |
| Latest official stable | PASS — `0.152.0` |
| Runtime PR #82 branch validation | PASS |
| Runtime PR #82 branch Vercel | PASS |
| Runtime change scope | PASS — documentation only |
| Future stable inclusion | Not Checked |
| Approved Windows-host local-link E2E | Not Checked |
| Cross-surface parity | Not Checked |
| FAIL | none |

## Safety boundary

No prerelease/experimental capability, paid API, automatic paid fallback, extra paid usage, broader filesystem/OAuth/MCP permission, plugin/Skill install/update/reconcile/delete, legacy deletion, destructive migration or external messaging was enabled or performed.
