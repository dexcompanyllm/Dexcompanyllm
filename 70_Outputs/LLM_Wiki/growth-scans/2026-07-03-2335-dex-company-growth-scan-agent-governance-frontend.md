---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Agent Governance and Frontend QA - 2026-07-03 23:35 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T23:35:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/enterprise/managed-configuration"
  - "https://developers.openai.com/codex/import"
  - "https://nextjs.org/blog/next-16-3-ai-improvements"
  - "https://nextjs.org/blog/next-16-3-turbopack"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://github.blog/changelog/2026-06-17-agent-finder-for-github-copilot-now-available/"
  - "https://github.blog/changelog/2026-06-02-copilot-sdk-is-now-generally-available/"
  - "https://www.figma.com/blog/the-figma-agent-is-here/"
collectionPurpose: "Agent governance, frontend QA, design-system context, install gating 신호를 파일과 검증된 출처로 흡수한다."
confidence: medium
claimType: historical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags: [llm-wiki/output, growth-scan, dex-company, automation]
---

# Dex Company Growth Scan Agent Governance and Frontend QA - 2026-07-03 23:35 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 23:35 KST
- 검색 범위: 자동화 메모리, 현재 폴더, Vault AGENTS/Dex Company/role routing/LLM Wiki 운영 문서, index/log, Growth Scan improvement guide, 최근 23:03/22:33/22:04 보고서, 10x candidate queue, OpenAI/GitHub/Storybook/Next.js/Vite/Figma/NN/g/W3C/Threads 공개 자료.
- 실행 초점: 직전 기준인 `eligible-next=0`, `not-checked=0`를 유지하면서, 새 공식/고신뢰 자료가 Dex Company 운영 판단을 바꾸는 경우에만 저장했다.
- 제외: package, plugin, MCP server, SDK, browser extension, cloud resource, access token, auth file, import flow, npm/npx/bun/pip 명령은 실행하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 source note 7건과 후보 판정 결과만 요약한다. 이번 실행도 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수로 기록한다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 31 |
| stored.count | 7 |
| duplicate.count | 6 |
| deferred.count | 5 |
| blocked.count | 4 |
| lint.warning_count | 0 |

## Today's Core Findings

1. Codex managed configuration은 local AGENTS/project policy와 admin-managed requirements를 분리해서 봐야 한다는 공식 근거다. live effective requirements를 확인하지 않으면 적용 중이라고 말하면 안 된다.
2. Codex import는 다른 agent 설정을 가져올 수 있지만, import 가능성이 곧 신뢰 승인이나 설치 승인을 뜻하지 않는다. hooks, MCP, plugins, skills는 후보 큐로 분리해야 한다.
3. Next.js 16.3과 Storybook 10.4는 frontend 작업이 agent-readable docs, local AGENTS, browser/component introspection, generated stories/tests로 이동하고 있음을 보여준다.
4. GitHub Agent Finder와 Copilot SDK GA는 discovery, registry, allowlist, hook/permission/auth review를 분리하는 방향을 강화한다.
5. Figma Design Agent/Figma MCP 신호는 design-system context가 AI output 품질을 좌우한다는 근거지만, generated design은 사람의 선택과 WCAG 2.2 QA 전까지 구현 승인으로 보지 않는다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-managed-configuration-requirements.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-import-setup-migration.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-nextjs-163-agent-readable-workflows.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-storybook-104-agent-setup-review-filters.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-github-agent-finder-ard.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-github-copilot-sdk-ga-tool-governance.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-figma-design-agent-design-system-context.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 7 source notes across Codex governance, setup import, frontend agent QA, GitHub agent discovery/SDK governance, and Figma design-system context |
| Inbox queue | No queue item changed; `eligible-next=0` and `not-checked=0` preserved |
| Index | Added 7 source links and this report link |
| Log | Added this 23:35 scheduled growth scan entry |
| Installs | No install, import, SDK run, MCP connection, token creation, or cloud provisioning |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI Codex managed configuration | official docs | source-backed: requirements/cache/Appshots fields; Dex inference: policy-source column; not checked: Ethan plan/admin/effective config | high |
| OpenAI Codex import | official docs | source-backed: importable items and follow-up setup; Dex inference: import-audit queue; not checked: live app UI/source-agent list | high |
| Next.js 16.3 AI + Turbopack | official blog | source-backed: AGENTS.md docs, skills, agent browser, memory work; Dex inference: frontend QA expansion; not checked: local install/runtime | high |
| Storybook 10.4 | official blog | source-backed: agent setup, mocks/stories/tests, review filters; Dex inference: component-state coverage gate; not checked: project compatibility | high |
| GitHub Agent Finder | official changelog | source-backed: registry discovery, enterprise controls, no silent connection; Dex inference: local registry idea; not checked: ARD spec details | medium |
| GitHub Copilot SDK GA | official changelog | source-backed: tools/MCP/hooks/auth/tracing; Dex inference: due-diligence candidate only; not checked: SDK code/runtime/license | medium |
| Figma Design Agent | official blog | source-backed: canvas agent and design-system context; Dex inference: generated design review gate; not checked: live permissions/output quality | medium |
| Vite 8.1 | official blog | duplicate/no-new-signal | existing Vite release note already covers this lane |
| Threads snippets | public SNS snippets | not checked/source-weak | snippets only; no stable source-backed ingestion |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| Codex managed requirements | operating-policy candidate | No | Needs live account/admin/effective config verification. |
| Codex import flow | setup-migration candidate | No | Could import hooks, plugins, MCP, skills, and settings. |
| Storybook 10.4 automated setup | project-specific conditional | No | Requires package install, generated story/test review, and project QA. |
| Next.js 16.3 preview/codemods/agent-browser | project-specific conditional | No | Preview/codemod/runtime commands need a target repo and approval. |
| GitHub Copilot SDK | due-diligence candidate | No | SDK, hooks, auth, telemetry, remote sessions, and tool overrides require security review. |
| Figma Design Agent / MCP | connector candidate | No | Requires Figma permissions and design-file privacy boundary review. |

## Duplicate / Rejected / Deferred

- duplicate: Vite 8.1 reviewed, but existing `2026-07-03-vite-github-releases` covers the lane sufficiently.
- duplicate: Vitest 4.1 browser trace already has a source note.
- duplicate: Next.js GitHub releases already has a source note; this run stored the newer 16.3 AI/Turbopack angle.
- duplicate: WCAG 2.2 and W3C accessibility overview already have source notes and were used only as QA references.
- duplicate: Figma State of the Designer already exists; this run stored a different Figma Design Agent/design-system context angle.
- rejected/no-new-signal: Threads snippets were discovery-only and not stable enough for source-backed promotion.
- deferred: live Codex managed requirements, import UI, SDK installation, Storybook/Next runtime, Figma connector behavior, and GitHub Agent Finder/ARD deep audit.

## Failure / Blocked / Not Checked

- Threads did not yield stable source-backed public text suitable for promotion.
- No installable code was executed; package metadata, dependency trees, licenses, and runtime behavior were not audited.
- Codex managed requirements and import availability were not checked in the live Codex desktop UI or Ethan's account.
- Figma and GitHub connector permissions were not checked.

## Cross Verification Evidence

- OpenAI managed configuration/import docs were compared against Dex Company no-secret/no-auto-install policy and prior Codex remote/access-token notes.
- Next.js and Storybook official posts were compared against stored Storybook/Vitest/Next/Vite notes to separate new agent-readable QA signals from duplicate release coverage.
- GitHub Agent Finder and Copilot SDK were compared against stored GitHub Copilot MCP/custom-agent notes and OWASP LLM risk categories.
- Figma Design Agent was compared against stored Figma/design-system/accessibility notes.
- WCAG 2.2 was used as an external QA anchor, not as conformance proof.

## Ethan Can Use This Immediately

- Codex 설정을 점검할 때는 "AGENTS.md 규칙", "프로젝트 config", "관리자가 강제한 requirements", "현재 세션에 적용된 값"을 분리해서 보시면 됩니다.
- 다른 agent 설정을 Codex로 가져오고 싶을 때는 import 전후 diff와 `instructions/settings/skills/plugins/MCP/hooks/subagents` 후보 감사표를 먼저 만들면 됩니다.
- Next.js/Storybook UI 작업에서는 agent가 만든 stories/tests를 성공 증거로만 보지 말고 실제 브라우저 QA, component state coverage, WCAG 2.2 기준, 메모리 사용량을 함께 보시면 됩니다.
- Figma agent/MCP를 쓰더라도 생성량보다 선택한 방향, 사용한 tokens/components, 접근성 검토 결과를 따로 남기셔야 합니다.

## Improvement Delta

- 저장 기준을 "많이 모으기"가 아니라 "운영 판단을 바꾸는 공식/고신뢰 신호만 저장"으로 유지했다.
- Dex Company agent governance에 `policy source`, `import audit queue`, `resource discovery != install approval`, `generated test asset review`, `design-system context != accessibility proof` 판단 기준을 추가했다.
- Frontend QA 기준을 framework-versioned AGENTS/docs, browser/component introspection, component-state coverage, memory pressure, WCAG 2.2 review까지 확장했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 상태를 유지했다.
- done: broad MCP Apps scan을 반복하지 않았다.
- done: vendor-only 자료를 억지로 source note로 만들지 않았다.
- done: 새 source note는 OpenAI/GitHub/Next.js/Storybook/Figma 공식 또는 고신뢰 출처로 제한했다.
- carried: Threads는 안정적인 원문 접근이 가능할 때만 source-backed 승격을 재검토한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Threads public snippets | carried/not-checked pattern | blocked | snippets remained unstable and source-weak; no source note created |
| Vendor comparison lane | carried-vendor | carried | no concrete project decision; not re-promoted |
| Frontend release lane | duplicate/no-new-signal risk | done | Vite/Vitest duplicates avoided; Next.js 16.3 and Storybook 10.4 stored only for new agent-QA signal |
| Remote/credential governance | deferred | carried | managed requirements/import docs stored, but live account/UI verification remains required |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; avoid reopening the old 10x queue unless new evidence changes a prior decision.
2. Check whether any newly stored install-adjacent item has a concrete Ethan project use case. If not, keep it documentation-only.
3. If Codex import or managed requirements are discussed, verify live app/account/effective config before reporting availability as current.
4. If frontend work starts, apply the new QA gate: framework docs/AGENTS, browser evidence, component-state coverage, WCAG 2.2, and memory pressure.

## Prompt or Template Patch Candidate

```text
When Growth Scan finds agent tooling that can import settings, discover resources, install packages, run SDKs, or connect MCP/Figma/GitHub capabilities, classify it as documentation-only, setup-migration candidate, resource-discovery candidate, project-specific conditional, or blocked-by-default. Discovery, importability, or official status never equals approval to install or enable. For frontend/design-system materials, map the source to at least one QA gate: framework-versioned local docs, browser/runtime evidence, component-state coverage, WCAG 2.2 checks, or memory-pressure verification.
```

## Questions / Tracking Candidates

- Codex managed requirements를 실제로 쓰려면 현재 계정/플랜/admin 설정과 effective requirements를 먼저 확인해야 한다.
- Codex import를 시도할 계획이 생기면 import 전후 diff와 candidate audit report가 필요하다.
- Next.js/Storybook 기반 프로젝트가 생기면 agent-readable docs와 component-state QA를 실제 프로젝트 템플릿에 반영할지 검토한다.
- Figma MCP/Design Agent는 디자인 파일 권한과 export boundary를 먼저 정의한 뒤 사용한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 23:03, 22:33, 22:04 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Storybook, Next.js, Vite, Figma, NN/g, W3C, Threads searched |
| Duplicate check | passed | `rg` checked existing LLM Wiki notes before writing |
| Queue preservation | passed | no stale eligible/not-checked rows reopened |
| Source schema | passed | fallback schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed; source notes count is 100 |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, import, token, cloud, SDK, MCP, or connector action run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Several stored items are install-adjacent or connector-adjacent, so treating official documentation as approval would be unsafe.
- Mitigation: stored as source-backed documentation and due-diligence candidates only; no install/import/SDK/cloud/token action was run.
- Not checked: live Codex managed config/import UI, GitHub SDK runtime, Storybook/Next project compatibility, Figma connector permissions, Threads full-source extraction.
