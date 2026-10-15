# Codex MCP package-style server name watch — 2026-08-31

## Scope

OpenAI/Codex upstream change review for MCP server-name interoperability after Codex `0.151.0` stable.

## Official source

- OpenAI Codex upstream commit: https://github.com/openai/codex/commit/94cbbddafc1776d5e377bca1b05932c697e82238
- PR: https://github.com/openai/codex/pull/41700
- Latest stable release at review time: https://github.com/openai/codex/releases/tag/rust-v0.151.0

## Findings

### confirmed

OpenAI merged upstream `main` commit `94cbbddafc1776d5e377bca1b05932c697e82238` to support package-style MCP server names. MCP server identifiers may contain `:`, `@`, `/`, and `.`, including names such as `npm:@modelcontextprotocol/server-sequential.thinking`.

The upstream change preserves those names across Codex CLI `mcp add`, `get`, `list`, and `remove`, runtime tool namespaces, and OAuth credential lookup. It also quotes non-bare names in generated `config.toml` recovery hints and adds regression coverage for OAuth credential-name collisions.

The latest non-prerelease Codex release remains `0.151.0`; this upstream-main behavior is therefore not treated as installed stable capability evidence.

### inference

Package-style identifiers can reduce aliasing and configuration drift when an MCP server is referenced by its package-qualified name. The OAuth credential-name collision tests are also relevant to future Dex worker interoperability because a server name can participate in credential lookup.

### proposal

Keep this capability watch-only. If a future stable Codex release includes the change, validate an approved host with add/get/list/remove round trips, quoted recovery output, runtime tool namespace preservation, and OAuth credential lookup isolation before Dex relies on package-style identifiers.

### unknown

- The first stable Codex release that will include the upstream change.
- Approved-host behavior with Dex's actual subscription-authenticated Codex installation.
- Whether Dex will ever need package-style MCP identifiers; the current Runtime does not depend on them.

## Dex response

Runtime PR #36 added `mcpPackageStyleServerNames` to `config/codex-capability-tracking.json` with:

- maturity: `upstream-main`
- state: `watch-disabled`
- enabled: `false`
- tracking: Runtime #18
- authority: `codex-worker-mcp-config-interop`

No MCP server was added or renamed, no OAuth credential was accessed, and no paid or experimental capability was enabled.

Runtime validation run `33326106991` passed static checks, unit tests, smoke tests, rollback guard, Vercel adapter smoke, and production dependency audit before PR #36 was merged as `b29ed67a301788afbc4b288836b7c75779e8187a`.

## Validation

- Official upstream change: PASS
- Runtime watch gate: PASS
- Runtime CI / production dependency audit: PASS
- Stable inclusion: Not Checked
- Approved-host MCP package-name round trip: Not Checked
- Approved-host OAuth lookup isolation: Not Checked
- Failure found in current Dex behavior: none
