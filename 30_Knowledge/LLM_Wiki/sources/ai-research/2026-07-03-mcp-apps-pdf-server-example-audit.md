---
type: llm-wiki-source
status: active
title: "MCP Apps PDF Server Example Audit"
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
  - "https://github.com/modelcontextprotocol/ext-apps/blob/main/examples/pdf-server/README.md"
  - "https://raw.githubusercontent.com/modelcontextprotocol/ext-apps/main/examples/pdf-server/README.md"
  - "https://raw.githubusercontent.com/modelcontextprotocol/ext-apps/main/examples/pdf-server/package.json"
collectionPurpose: "MCP Apps PDF server example을 Dex Company에 설치할 수 있는지 판단하기 전에, 공식 README 기준으로 권한, 파일 접근, 원격 URL, 저장 동작, 테스트 조건을 설치 없이 감사한다."
tags:
  - llm-wiki/source
  - mcp-apps
  - pdf
  - install-audit
  - security
---

# MCP Apps PDF Server Example Audit

## Original Content

원문 전체를 복사하지 않습니다. 2026-07-03 21:33 KST 기준으로 `modelcontextprotocol/ext-apps` 공식 저장소의 `examples/pdf-server/README.md`와 관련 package metadata 접근 여부만 확인했습니다.

확인한 범위:

- PDF.js 기반 interactive PDF viewer 예시입니다.
- MCP client 설정은 `npx @modelcontextprotocol/server-pdf --stdio` 실행 경로를 안내합니다.
- large PDF를 HTTP Range request와 chunked tool calls로 나눠 읽는 패턴을 설명합니다.
- viewer가 현재 페이지/텍스트를 model context로 갱신하는 패턴을 포함합니다.
- local files, remote academic URLs, annotation, save, search, screenshot, form filling, fullscreen/inline display, host theme sync를 다룹니다.
- HTTP mode의 client roots는 기본적으로 무시하고, `--use-client-roots`로 명시 opt-in해야 한다고 설명합니다.
- writable uploads root, local file overwrite, remote PDF save path, Playwright E2E, API prompt discovery test가 언급됩니다.

## Easy Explanation

이 예시는 "PDF를 MCP App 안에서 보고, 주석을 달고, 일부 텍스트를 모델에게 알려주는" 고급 샘플입니다. Dex Company PDF 업무와 관련 있어 보이지만, 파일 시스템 roots, remote URL fetch, annotation save, local overwrite, app-only tools, in-memory command queue가 모두 얽혀 있습니다. 따라서 바로 설치할 자료가 아니라, PDF 워크플로우를 MCP App으로 바꿀 때 참고할 수 있는 설치 감사 후보입니다.

## Install Decision

| Candidate | Decision | Install? | Reason |
|---|---|---:|---|
| MCP Apps PDF server example | install-audit-conditional | No | PDF viewer/use-case 가치는 높지만 local roots, remote URLs, writable uploads, annotation save, file overwrite, host compatibility, package supply chain을 프로젝트별로 감사해야 합니다. |
| `@modelcontextprotocol/server-pdf` via `npx` | install-audit-conditional | No | README가 `npx -y` 실행을 안내하지만, 자동화 스캔에서는 원격 패키지 실행과 install을 하지 않습니다. lockfile, package provenance, version pinning, network policy가 필요합니다. |
| HTTP deployment with `interact` | install-audit-blocked-by-default | No | in-memory command queue가 single process에 의존합니다. stateless/multi-instance 환경에서는 기능이 맞지 않으며, remote client roots는 기본 차단이 맞습니다. |

## OWASP LLM Risk Review

| Risk | Assessment |
|---|---|
| Supply chain | conditional/high. `npx`, PDF.js/PDF tooling, Playwright tests, server package provenance를 프로젝트별로 고정해야 합니다. |
| Insecure plugin design | conditional. App-only tools, display tool, server tool, file save boundary가 분리되어야 합니다. |
| Excessive agency | high if unrestricted. 모델이 annotation, form fill, save, overwrite를 수행할 수 있으므로 user confirmation과 root restriction이 필요합니다. |
| Sensitive information disclosure | high for private PDFs. Page text is pushed into model context, so confidential documents need explicit policy. |
| Prompt injection | conditional. PDF contents can influence model context; untrusted PDFs should be treated as hostile input. |
| Insecure output handling | conditional/high. Save paths, overwrite flags, downloaded files, screenshots, annotations, and extracted text need validation. |
| Overreliance | medium. PDF extraction and annotation behavior must be checked against the actual PDF and viewer state. |

## Dex Company Use

- Keep this as a reference for future "PDF inside MCP App" experiments, not as a default Dex Company PDF workflow.
- Current safer path remains local PDF parsing/rendering tools unless Ethan explicitly wants an interactive MCP App PDF viewer.
- Before any project install, require a checklist: target project, host, transport mode, package version pinning, allowed remote domains, local root policy, write policy, secret policy, Playwright evidence, rollback plan.

## Evidence Quality

- high: official `modelcontextprotocol/ext-apps` README was accessible through GitHub raw content.
- partial: package metadata fetch returned limited output through the web tool, so package dependencies/scripts were not fully audited in this run.
- cross-check: existing MCP Apps overview, CSP/CORS, permissions API, Agent Skills audit, OWASP LLM Top 10 source notes.

## Source-Backed / Dex Inference / Not Checked

- source-backed: README describes PDF viewer capabilities, client roots policy, remote URL support, save/annotation behavior, and Playwright/API test surfaces.
- Dex inference: Dex Company should classify this as conditional reference rather than installable default because it touches local files, remote PDFs, model context, and write paths.
- not checked: no package install, `npx`, Bun/Node execution, MCP host runtime, Claude Desktop, Codex Desktop, Playwright run, local file save, remote URL fetch, or PDF annotation persistence was executed.
