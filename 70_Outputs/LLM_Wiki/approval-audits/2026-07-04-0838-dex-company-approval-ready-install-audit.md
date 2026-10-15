---
type: dex-company-approval-audit
status: completed
title: "Dex Company Approval-Ready Install Audit - 2026-07-04 08:38 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T08:38:08+09:00
operator: Dex
claimType: mixed
evidenceScope: local-and-official-source-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - approval-audit
  - install-audit
  - dex-company
---

# Dex Company Approval-Ready Install Audit - 2026-07-04 08:38 KST

## Bottom Line

Ethan should not approve any global install today. The current workspace is a Dex/Obsidian setup folder, not a target app repository. Several candidates are safe to use as knowledge or QA rules immediately, but executable tools, connectors, MCP servers, SDKs, and skills need target-specific approval packets.

## Local Context Checked

| Item | Result |
|---|---|
| Workspace | `D:\CodexProjects\codex setup` |
| OS | Windows 11 Home |
| Node | `v24.16.0` |
| npm PowerShell wrapper | blocked by execution policy |
| npm metadata fallback | `npm.cmd view` works |
| Python / py | not available from shell aliases |
| Codex CLI | `codex-cli 0.134.0` |
| App project package.json | none in root setup folder |
| Existing audit folder | `work/mcp-apps-audit/ext-apps` exists |
| LLM Wiki lint | passed, 0 warnings |

## Official / Registry Checks

| Source | Result |
|---|---|
| MCP Apps GitHub | HTTP 200 |
| MCP Apps npm page | direct web page returned 403, npm registry metadata checked via `npm.cmd view` |
| Storybook a11y docs | HTTP 200 |
| Storybook Vitest addon docs | HTTP 200 |
| OpenTelemetry GenAI repository | HTTP 200 |
| OpenAI Codex repair loop cookbook | HTTP 200 |
| GitHub Copilot skills docs | HTTP 200 |
| GitHub repository MCP config docs | HTTP 200 |
| Figma MCP blog | HTTP 200 |
| OpenAI Codex Agents SDK / skills / automations docs | HTTP 200 |

## Package Metadata Checked

| Package | Version | License | Approval Meaning |
|---|---:|---|---|
| `@modelcontextprotocol/ext-apps` | 1.7.4 | MIT in npm metadata | SDK-only can be conditional in a real MCP UI project |
| `@storybook/addon-a11y` | 10.4.6 | MIT | conditional in a real Storybook project |
| `@storybook/addon-vitest` | 10.4.6 | MIT | conditional in a real Storybook/Vitest project |
| `@storybook/nextjs-vite` | 10.4.6 | MIT | conditional only if target Next/Vite/React versions match peers |
| `openai` npm package | 6.45.0 | Apache-2.0 | knowledge only for now; SDK/API use needs project/cost/secrets gate |

## Approval Decisions

| Candidate | Decision | Ethan Approval Needed Now? | Easy Reason |
|---|---|---:|---|
| Growth Scan report rules, Metrics, deferred rejudgement, no-op discipline | `knowledge-only` | No | Already reflected as operating rules, no execution risk |
| OWASP/WCAG/Storybook QA criteria as instructions | `knowledge-only` | No | These are review criteria, not installed code |
| OpenTelemetry GenAI vocabulary for report metrics | `knowledge-only` | No | Use as naming guidance; no package execution |
| OpenAI Cookbook repair-loop pattern | `knowledge-only` | No | Use review-repair-validate pattern, do not run notebook |
| Storybook addon-a11y | `approval-ready-conditional` | Not until frontend repo exists | Safe candidate only inside a real Storybook project with matching versions |
| Storybook addon-vitest / nextjs-vite | `approval-ready-conditional` | Not until frontend repo exists | Peer dependencies and test runner setup are project-specific |
| MCP Apps SDK package only | `approval-ready-conditional` | Not until MCP UI project exists | Package metadata is acceptable, but host, CSP/CORS, permissions, auth, rollback are missing |
| Full MCP Apps repository dev environment | `install-audit-blocked` | No | Prior audit found vulnerable/broad dev dependency surface and broad scripts |
| MCP Apps active Codex skills / Claude plugin flow | `install-audit-blocked` | No | Packaged for Claude Code flow; Codex compatibility not proven |
| MCP Apps example servers | `approval-ready-conditional` | Only per example | Each example has different dependencies, network/data behavior, and permissions |
| MCP Apps system monitor example | `install-audit-blocked` | No | Reads host/system information; too broad for default Dex Company use |
| OpenAI Codex Python SDK / app-server automation | `approval-not-ready` | No | Python alias unavailable, SDK/runtime/credential/sandbox/cost path not approved |
| GitHub Copilot code review, skills, MCP, CLI Actions | `approval-not-ready` | No | Needs exact repository, org policy, billing owner, token/permission scope, human review |
| Figma MCP / Agent connector | `approval-not-ready` | No | Needs exact workspace/file, design sensitivity, export scope, connector permissions, human review |
| Obsidian Bases/CLI dashboard changes | `approval-ready-conditional` | Only for named vault change | No package install, but local Obsidian version/view behavior should be checked before changing files |
| Threads source ingestion | `install-audit-blocked` for source-backed ingest | No | Discovery snippets are not stable source-backed evidence |
| X ingestion | `install-audit-blocked` | No | User rule excludes X |
| Third-party career-ops / obsidian-wiki repo install | `approval-not-ready` | No | Existing Dex Company workflows may conflict; use ideas only unless project-specific audit is requested |

## What Ethan Can Approve Safely

Ethan can safely approve these policy-level defaults:

1. Use approval-ready labels in every future install/connector/tool report.
2. Treat docs, checklists, report templates, and QA criteria as knowledge-only and auto-absorb when source-backed.
3. Require exact project path/account/workspace before any executable install approval request.
4. Keep full repositories, global plugin installs, and account connectors blocked until Dex provides a complete approval packet.

## What Ethan Should Not Approve Yet

- "Install MCP Apps" as a broad request.
- "Connect Figma MCP" without target file/workspace and permission table.
- "Enable GitHub Copilot agent/code review workflow" without repo, org policy, billing, and review gates.
- "Run OpenAI Cookbook notebook" without sandbox, cost cap, API key handling, and rollback.
- "Install Storybook addons" in the Dex setup folder.

## Approval Packet Template

When Dex later asks for approval, the prompt should look like this:

```text
Approval request:
- Action:
- Target project/account:
- Package/tool/version:
- Files or settings to change:
- Permissions/network/secrets/billing:
- Validation:
- Rollback:
- Dex recommendation:
```

If any field is missing, it is not approval-ready.

## QA

| Check | Result |
|---|---|
| Memory and queue context checked | passed |
| Recent reports checked | passed |
| Official docs / registry availability checked | passed |
| Local runtime checked | passed |
| No install / connector / token / API call performed | passed |
| LLM Wiki lint | passed, 0 warning(s) |

## Final Decision

The correct operating rule is: Dex should do all due diligence before asking Ethan, but Ethan should only be asked to approve a named, scoped, reversible action. Today there is no immediate global install I recommend approving.
