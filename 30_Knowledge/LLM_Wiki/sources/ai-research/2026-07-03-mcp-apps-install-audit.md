---
type: llm-wiki-source
status: active
title: "MCP Apps ext-apps Install Audit"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-repository-audit
source: "https://github.com/modelcontextprotocol/ext-apps"
collectionPurpose: "MCP Apps를 계속 후보로만 두지 않고, Dex Company에서 실제 사용할 수 있는지 설치 판단이 설 때까지 README, license, package, scripts, permissions, security, npm metadata, audit 결과를 확인한다."
tags:
  - llm-wiki/source
  - mcp
  - mcp-apps
  - install-audit
  - dex-company
---

# MCP Apps ext-apps Install Audit

## Original Content

원문 전체를 복사하지 않는다. 이 노트는 공식 GitHub repository, npm registry metadata, repository package files, security docs, specification, examples, 그리고 로컬 감사 명령 결과에서 확인한 설치 판단 근거만 보존한다.

## Source Metadata

| Field | Value |
|---|---|
| Official repository | `https://github.com/modelcontextprotocol/ext-apps` |
| Local audit path | `D:\CodexProjects\codex setup\work\mcp-apps-audit\ext-apps` |
| Audited commit | `fa1274490873f869c9a084e1abb9cf3031d288c7` |
| Latest remote tag observed | `v1.7.4` |
| npm package | `@modelcontextprotocol/ext-apps` |
| npm version observed | `1.7.4` |
| npm package license field | `MIT` |
| README badge | Apache 2.0 |
| LICENSE file | Apache-2.0 transition text, remaining MIT contributions, docs under CC-BY-4.0 except specifications |
| npm runtime dependency observed | `@standard-schema/spec` |
| npm peer dependencies observed | `@modelcontextprotocol/sdk`, `zod`, optional `react`, optional `react-dom` |
| Node engine | `>=20` |

## Easy Explanation

MCP Apps는 MCP 서버가 단순 텍스트만 주는 대신 대화형 UI를 함께 보여줄 수 있게 하는 SDK와 규격이다. Dex Company에서는 LLM Wiki review board, growth scan dashboard, source explorer 같은 인터랙티브 도구를 만들 때 장기적으로 유용할 수 있다.

하지만 이 저장소 전체에는 SDK만 있는 것이 아니라 examples, host implementation, plugin-style skills, Docker/Playwright/Bun 기반 테스트 스크립트, 인증 예제, system monitor 예제가 함께 들어 있다. 그래서 "MCP Apps 전체를 설치"하는 결정과 "특정 프로젝트에서 SDK 패키지만 의존성으로 추가"하는 결정은 분리해야 한다.

## Audit Findings

### Source-Backed

- Official repository and npm metadata both point to `@modelcontextprotocol/ext-apps` version `1.7.4`.
- npm package runtime dependency list is small: direct dependency is `@standard-schema/spec`, with MCP SDK/zod/react peer dependencies.
- Repository `package.json` contains broad development scripts, including build, docs, Playwright e2e, Docker e2e, screenshot generation, and lockfile update scripts.
- Repository lockfile audit found 8 vulnerabilities in the development/example dependency graph: 2 critical, 4 high, 1 moderate, 1 low.
- Notable audit items included `shell-quote` via `concurrently`, `hono`, `undici`, `vite`, `markdown-it`, `linkify-it`, and `@babel/core`.
- Security docs exist and direct vulnerabilities to GitHub Security Advisory rather than public issues.
- MCP Apps docs/spec emphasize sandboxed iframe rendering, JSON-RPC over `postMessage`, CSP/CORS declarations, and explicit UI permissions.
- Permission fields include camera, microphone, geolocation, and clipboard write.
- The repository includes MCP Apps skills under `plugins/mcp-apps/skills`, but their README install commands target Claude Code plugin flow, not Codex Desktop.
- Example servers include packages that may access sensitive local or network state, such as `systeminformation` in the system monitor example and `JWT_SECRET` handling in the lazy auth example.

### Dex Inference

- SDK-only use may be reasonable inside a specific project when there is a real MCP UI requirement and the project has its own audit, CSP, auth, and rollback plan.
- Full repository installation is not appropriate for Dex Company global setup right now because repository examples and dev scripts widen the attack surface.
- Agent skill/plugin installation is not approved because the provided plugin commands are for Claude Code, and Codex Desktop plugin compatibility was not proven.
- Example servers should be audited one by one. They should not be installed globally as a bundle.

### Not Checked

- The MCP Apps e2e security tests were inspected by file search but not executed.
- A working MCP host/client integration in Codex Desktop was not proven.
- No MCP Apps package was installed into an active Dex Company project.
- No repository script was executed except read-only metadata/audit commands.

## Installation Decision

| Target | Decision | Reason |
|---|---|---|
| `@modelcontextprotocol/ext-apps` SDK package in a specific project | `install-audit-conditional` | npm runtime surface is small, but needs a concrete project use case, MCP host, package audit in the target project, CSP/CORS table, permissions table, auth model, and rollback plan. |
| Full `modelcontextprotocol/ext-apps` repository dev environment | `install-audit-blocked` | Development/example dependency graph has current audit findings and broad scripts. Do not run repo-wide install/build/test flows without explicit approval and remediation review. |
| `plugins/mcp-apps/skills` as active Codex skills | `install-audit-blocked` | Skills are packaged for Claude Code plugin flow. Codex Desktop compatibility and safe install path were not proven. |
| Example MCP servers | `install-audit-conditional` | Useful reference material, but each example has different dependencies, permissions, network behavior, and secret/data handling. |
| System monitor example | `install-audit-blocked` | Reads host/system information and should not be installed unless a project explicitly needs local system telemetry. |
| Lazy auth example | `install-audit-conditional` | Useful auth reference, but secret handling and token issuer/audience model must be project-specific. |

## Dex Company Use Examples

- Build an LLM Wiki source review panel that shows candidate status, evidence quality, and install gate state.
- Build a growth scan triage UI that separates `stored-source`, `inbox`, `duplicate`, `install-audit-pass`, and `blocked`.
- Build a project-specific MCP App only after the target project defines the exact UI, server tools, permissions, and data boundaries.

## Security And License Risks

- License metadata is not one clean signal: npm says MIT, README badge says Apache 2.0, LICENSE describes an Apache-2.0 transition with remaining MIT contributions and CC-BY-4.0 docs. This is usable for review, but not "license risk zero."
- Development dependency audit findings block repo-wide install as a default Dex Company action.
- CSP/CORS must be explicit. Any network origin, including local dev origins, must be declared for MCP Apps UI.
- Permissions such as camera, microphone, geolocation, and clipboard write must default to denied unless the app has a narrow user-approved need.
- Auth examples must not copy dev defaults or secrets into Vault, source notes, or automation memory.

## Cross Verification

- GitHub repository HEAD and remote tags were checked with `git`.
- npm package version, license field, dependencies, peers, tarball, and integrity were checked with `npm view`.
- Repository lockfile security state was checked with `npm audit --package-lock-only --json`.
- Repository docs/spec/examples were searched for sandbox, CSP, permissions, system access, and secret handling patterns.

## Next Action

MCP Apps should no longer be described as "candidate only" without a path. The current path is:

1. Do not install the full repository globally.
2. If a real Dex Company MCP UI project is selected, install only the SDK package inside that project after target-specific audit.
3. Before installation, create a project install checklist covering use case, host/client, package audit, permissions, CSP/CORS, auth, data storage, rollback, and user approval.
