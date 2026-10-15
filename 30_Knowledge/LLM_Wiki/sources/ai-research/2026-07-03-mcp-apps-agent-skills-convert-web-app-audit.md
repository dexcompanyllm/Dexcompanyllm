---
type: llm-wiki-source
status: active
title: "MCP Apps Agent Skills and Convert Web App Audit"
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
sourceKind: install-audit
source:
  - "https://apps.extensions.modelcontextprotocol.io/api/documents/Agent_Skills.html"
  - "https://github.com/modelcontextprotocol/ext-apps/blob/main/plugins/mcp-apps/skills/convert-web-app/SKILL.md"
  - "https://apps.extensions.modelcontextprotocol.io/api/documents/Testing_MCP_Apps.html"
collectionPurpose: "MCP Apps Agent Skills와 convert-web-app skill을 Dex Company에 설치할 수 있는지 OWASP LLM 위험 기준으로 설치 없이 재판정한다."
tags:
  - llm-wiki/source
  - mcp-apps
  - install-audit
  - agent-skills
  - security
---

# MCP Apps Agent Skills and Convert Web App Audit

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 21:03 KST 기준 MCP Apps Agent Skills 문서, `convert-web-app` SKILL.md, Testing MCP Apps 문서의 URL, 확인 범위, 설치 판단만 보존한다.

## Easy Explanation

MCP Apps Agent Skills는 MCP App을 만들거나 기존 웹앱에 MCP App 지원을 붙이는 작업 지침 세트다. `convert-web-app`은 기존 웹앱을 standalone web + MCP App hybrid 구조로 바꾸는 skill이다. 기능 가치는 있지만, 실행 agent가 코드를 분석하고 서버/resource/tool 등록을 바꾸는 방식이므로 덱스 컴퍼니 기본 skill 폴더에 바로 넣으면 과도한 실행 권한과 supply-chain risk가 커진다.

## Install Decision

| Candidate | Decision | Install? | Reason |
|---|---|---:|---|
| MCP Apps Agent Skills docs | conditional-reference | No | 공식 문서로 읽는 것은 유용하지만, 설치 명령은 Claude Code/Vercel Skills CLI 중심이고 Codex Desktop 호환 경로가 증명되지 않았다. |
| `convert-web-app` skill | install-audit-conditional | No | 특정 웹앱에 MCP App 지원이 필요할 때만 target repo에서 별도 audit 후 검토한다. |
| Basic-host testing workflow | conditional-reference | No | local MCP server, Node install, host compatibility, possible tunnel/cloudflared exposure가 필요하므로 프로젝트 승인 전 실행하지 않는다. |

## OWASP LLM Risk Review

| Risk | Assessment |
|---|---|
| Supply chain | conditional/high until target audit. Repository, Skills CLI, Node packages, and examples must be pinned and audited per project. |
| Insecure plugin design | conditional. Skill changes app/server integration and resource registration; permissions and CSP must be explicit. |
| Excessive agency | high if installed globally. The skill asks the coding agent to inspect and modify an existing app. |
| Sensitive information disclosure | conditional. MCP servers, auth, URLs, and app parameters may expose project data if copied blindly. |
| Overreliance | medium. The skill can suggest migration structure, but Dex must verify generated code and host behavior. |
| Prompt injection | conditional. Third-party skill text and app content must be treated as untrusted instructions until audited. |
| Insecure output handling | conditional. Generated server/resource/tool code must be reviewed before execution. |

## Dex Company Use

- Use as reference material when Ethan explicitly asks for an MCP App UI or hybrid web + MCP App conversion.
- Before any install, create a project install checklist: target repo, host/client, Node version, package audit, CSP/CORS, permissions, auth, local/remote tunnel policy, rollback plan, QA commands.
- Do not copy this skill into active Codex skill folders without Ethan approval.

## Evidence Quality

- high: MCP Apps official docs and official GitHub skill file were checked.
- cross-check: existing MCP Apps install audit, MCP Apps overview, CSP/CORS, permissions API, OWASP LLM Top 10 source note.
- risk: Codex Desktop compatibility and runtime behavior were not proven.

## Source-Backed / Dex Inference / Not Checked

- source-backed: MCP Apps docs publish Agent Skills, `convert-web-app`, and testing workflows.
- Dex inference: Dex Company should keep them as audited references, not installed defaults.
- not checked: no Skill CLI, plugin install, Node package install, MCP host, cloudflared tunnel, or Codex runtime compatibility test was run.
