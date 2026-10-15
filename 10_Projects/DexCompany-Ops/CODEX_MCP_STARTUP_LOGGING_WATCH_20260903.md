# Codex MCP startup logging evidence — 2026-09-03

## Official upstream evidence

Source: https://github.com/openai/codex/pull/42370

### confirmed

OpenAI merged PR #42370 on 2026-09-02 21:40:39 UTC. The one-file Rust change logs failed MCP startup outcomes once per startup attempt, including discovery failures that may not emit startup notifications, and preserves the full nested `anyhow` error chain in cloneable startup outcomes. The patch logs `server_name` and the formatted error chain at warning level.

## Dex comparison

### confirmed

- Runtime approved `main` before this watch was PR #128 merge `2cc7608108da2a28d5e0b09bdb762ea72a52fafd`.
- Runtime PR #129 adds one watch-only Markdown file and merged as `bff986d216c0caa3b127aed7c4014f0aab482003`.
- Runtime PR #129 scope: **1 file / +64 / -0**. No executable Runtime code, MCP/plugin/OAuth configuration, permission, billing, model routing, logging configuration, or deployment configuration changed.
- Runtime validation `33686984623` PASS: dependency install, static checks/unit tests/smoke test, and production dependency audit all PASS. A same-head push validation `33686963120` also PASS. Branch Vercel PASS.
- Runtime #34 now tracks future-stable MCP startup diagnostic quality, bounded retry/logging, and synthetic-secret redaction.
- Latest official non-prerelease Codex remains `0.152.1`; PR #42370 is future-stable upstream-main evidence only.

### inference

The richer startup diagnostic can reduce silent MCP discovery failures and shorten diagnosis/rework by retaining the causal chain across transport, configuration, authentication, discovery, and process failures. The same richer error chain can contain data supplied by third-party MCP servers, transports, operating systems, or configuration parsers, so Dex must treat it as potentially sensitive observability until stable-host redaction behavior is proven.

### proposal — tracked, not enabled

Runtime #34 future-stable MCP/plugin E2E now requires:

- exactly one bounded diagnostic outcome for one startup/discovery attempt rather than duplicate/retry log amplification;
- useful distinction among transport, executable, schema/discovery, configuration, and authentication-required errors without raw credential exposure;
- synthetic canary secrets in environment variables, headers, OAuth/token-like fields, query strings, MCP config secrets, and nested server errors do not appear unredacted in Dex-collected logs, GitHub evidence, callbacks, user-visible Result payloads, or Dex-forwarded telemetry;
- unnecessary local absolute paths and account/workspace identifiers are minimized/redacted;
- server name/error text remains observability only and cannot grant MCP trust, OAuth scope, write authority, plugin installation, or Task status;
- authentication-required classification cannot trigger automatic OAuth consent/scope broadening, paid fallback, or cross-account credential reuse;
- retry stays bounded and bound to the same Task/attempt; repeated failures cannot create duplicate Tasks, duplicate MCP writes, or unbounded logs;
- if useful raw detail cannot be stored safely, Dex persists a redacted error class/correlation reference while keeping sensitive raw detail local/non-canonical.

## unknown / Not Checked

- first official non-prerelease stable containing PR #42370;
- stable-host nested-error/redaction behavior for third-party MCP servers;
- whether all OpenAI-native log/telemetry sinks apply additional redaction outside this patch;
- approved Work/Desktop/mobile MCP startup-failure E2E with canary-secret redaction.

## Safety boundary

No MCP server, Plugin, OAuth connection, permission scope, logging verbosity, or Runtime executable behavior was changed. No raw startup log was uploaded to GitHub. No prerelease/experimental capability, paid API/automatic paid fallback, broader permission, destructive migration, deploy, or external messaging was enabled.

## Validation

| Check | Result |
|---|---|
| OpenAI PR #42370 merge/scope | PASS |
| Upstream patch inspection | PASS — one Rust file |
| Latest non-prerelease Codex | PASS — `0.152.1` |
| Runtime PR #129 scope | PASS — docs-only, 1 file / +64 / -0 |
| Runtime validation `33686984623` | PASS |
| Same-head validation `33686963120` | PASS |
| Runtime branch Vercel | PASS |
| Runtime #34 tracking | PASS |
| Stable MCP failure/redaction E2E | Not Checked |
| Wiki automated CI | Not Checked — no workflow evidence expected for this one-file evidence change |

No FAIL is introduced.
