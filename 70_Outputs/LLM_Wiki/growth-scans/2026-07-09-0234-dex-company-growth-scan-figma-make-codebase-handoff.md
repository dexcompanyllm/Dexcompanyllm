---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 02:34 KST"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://github.blog/changelog/label/copilot/"
  - "https://obsidian.md/changelog/"
  - "https://www.nngroup.com/articles/"
  - "https://www.figma.com/blog/code-on-the-figma-canvas/"
  - "https://help.figma.com/hc/en-us/articles/40775535020695-Make-in-your-local-codebase"
  - "https://help.figma.com/hc/en-us/articles/35463818346647-Push-from-Figma-Make-to-GitHub"
  - "https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect"
  - "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server"
  - "https://www.threads.com/"
collectionPurpose: "30분 Growth Scan에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, Figma Make/codebase handoff를 knowledge-only approval-risk 기준으로 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - figma
  - design-to-code
  - frontend-qa
---

# Dex Company Growth Scan - 2026-07-09 02:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 02:32-02:34 KST
- 실행 모드: 30분 fast discovery / candidate detection after Career Scout adoption.
- 검색 범위: OpenAI Codex changelog, GitHub Copilot changelog, Storybook, Obsidian changelog, W3C WAI, NN/g latest, Figma Design Agent / code layers / Make local codebase / Code Connect / MCP, Threads public search.
- 변경 범위: Figma Make local codebase source note 1개, `PPT Frontend Visual Communication Checklist`, LLM Wiki `index.md`, `log.md`, 이 보고서.
- 금지 준수: package, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable install은 수행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 18 | public search/open surfaces counted from this run |
| stored.count | 1 | Figma Make/codebase source note 1개 |
| duplicate.count | 12 | OpenAI, GitHub, Obsidian, NN/g design specs, Figma broad agent/code-layer signals, Threads 대부분 기존 coverage와 중복 |
| deferred.count | 5 | GitHub Copilot app, Storybook agentic setup, Figma account/workspace/runtime, Figma Make live repo setup, Threads primary confirmation |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-run `llm-wiki-lint.ps1` 0 warning |

## Preflight

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-023201.md`
- free RAM: 1.54GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Codex changelog의 최신 visible July entry는 2026-07-06 iOS task-management/SSH/usage-limit currentness 신호였고, 기존 Codex mobile/remote/account-adjacent coverage와 겹쳐 새 source로 저장하지 않았습니다.
2. Obsidian changelog 최신 visible entry는 2026-06-09 1.13.1 Desktop/Mobile이며, 기존 Obsidian CLI/Bases/currentness coverage를 바꾸지 않았습니다.
3. NN/g latest에는 2026-07-06 Design Specs와 2026-07-03 AI explanations/outcome reporting이 보였지만, design specs와 outcome reporting은 이미 최근 source/checklist에 반영되어 중복 처리했습니다.
4. Figma code layers 자체는 기존 Config 2026 source와 겹치지만, Figma Make local codebase Help Center가 repository setup, `.figma/make` scripts, dependency/dev-server execution, branch/PR flow, GitHub app, one-way push, Code Connect/MCP context risk를 구체적으로 분리해 새 QA/approval field를 만들었습니다.

## Stored / Absorbed

- Source note added: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-09-figma-make-local-codebase-handoff.md`
- Wiki guide updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\PPT Frontend Visual Communication Checklist.md`
- Index updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- Log updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- Report saved: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0234-dex-company-growth-scan-figma-make-codebase-handoff.md`

## LLM Wiki Inbox / Source / Wiki Change History

- Added Figma Make/local codebase as a medium-confidence, partial-verification source note.
- Updated PPT/frontend checklist with Figma Make/codebase handoff evidence fields.
- Updated LLM Wiki index with the Figma Make source link and operating rule.
- Appended log entry for this Growth Scan.
- Candidate queue was not edited because direct count remains closed: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Claim Split |
|---|---|---|---|---|---|
| Figma Make local codebase / code layers / Code Connect / MCP | Figma | official blog + Help Center docs | stored-source + checklist-adopted | medium | source-backed: repo setup, scripts, branch/PR, one-way push, mapping/MCP context. Dex inference: approval/QA field split. not checked: live account/repo |
| OpenAI Codex changelog | OpenAI | official changelog | duplicate-currentness | high | iOS task-management/SSH/usage fields visible; existing coverage sufficient |
| GitHub Copilot changelog | GitHub | official changelog | duplicate/account-adjacent | high | app/browser/billing signals remain account/org/runtime-dependent |
| NN/g latest | NN/g | article/video index | duplicate/no-new-signal | medium | design specs/outcome reporting already adopted |
| Obsidian changelog | Obsidian | official changelog | duplicate-currentness | high | latest visible 1.13.1 does not change Dex Company workflow |
| Storybook agentic setup | Storybook | official docs/blog | deferred/project-specific | medium | target repo/generated config/test output/rollback not checked |
| Threads Obsidian/Codex signals | Threads public search | SNS discovery | deferred/discovery-only | low | primary source confirmation weak |

## Installation Or Due-Diligence Candidates

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Figma Make local codebase | approval-not-ready/account-and-repo-specific | No | closed beta, Mac beta app, GitHub/Figma org permission, `.figma/make` scripts, dependency install, dev server, branch/PR policy, secret/env exposure |
| Figma Code Connect UI | approval-not-ready/account-and-repo-specific | No | design-library owner/admin requirement, GitHub repository mapping, MCP context exposure |
| Figma MCP server | approval-not-ready/account-specific | No | usage-based paid future, design file context exposure, live UI capture, connector scope |
| GitHub Copilot app/browser tools | account-adjacent/project-specific | No | account policy, billing, tool permissions, browser data scope |
| Storybook agentic setup | project-specific conditional | No | dependency/config mutation, generated stories, a11y/runtime tests, rollback |

## Duplicate Exclusions

- OpenAI Codex changelog: no new Dex Company operating field beyond existing mobile/remote/task-management/currentness notes.
- Obsidian changelog: 1.13.1 settings/developer fixes are useful but do not change current Vault workflow.
- NN/g Design Specs and outcome reporting: already adopted in recent reports/checklists.
- Figma broad Design Agent/custom tools/code layer signal: existing Config 2026 and Figma agent notes cover the broad product direction. Only the local-codebase repository handoff fields were newly stored.
- Threads: discovery-only due to weak primary extraction.

## Failed / Blocked / Not Checked

- Failed: none.
- Blocked: none.
- Not checked: Ethan Figma account, closed beta eligibility, Mac beta desktop app, actual local repository setup, GitHub app installation, generated code diff, `.figma/make` scripts execution, dependency installation, dev server behavior, Code Connect mapping, MCP server connection, browser QA, cost after beta, Threads primary pages.

## Cross Verification

- Figma code layer blog was cross-checked with Figma Help Center pages for Make local codebase, Push to GitHub, Code Connect, and Figma MCP server.
- Existing `2026-07-04-figma-config-2026-motion-agent-handoff.md` was checked to avoid duplicating broad code-layer/product-launch coverage.
- OpenAI, Obsidian, NN/g, GitHub, Storybook signals were compared against recent 01:04, 01:39, and 02:05 reports plus the LLM Wiki index/log.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Figma official docs describe code layers, local/GitHub repository workflows, `.figma/make` setup files, GitHub push limitations, Code Connect mappings, and MCP context integration.
- Dex inference: Dex Company should treat Figma Make/local codebase as a repository-risk design-to-code handoff, not a default implementation path.
- not checked: account eligibility, live repo setup, GitHub/Figma app permissions, generated code quality, install/runtime behavior, browser QA, cost after beta.

## Ethan이 바로 쓸 수 있는 예시

Figma Make나 code layer를 frontend 작업에 쓰자는 제안이 나오면 아래 필드가 비어 있으면 승인 요청으로 올리지 마시면 됩니다.

```yaml
figma_make_codebase_handoff:
  feature_availability: closed_beta | available | not_checked
  repository_source: local_repo | github_clone | figma_created_repo | not_checked
  scripts_reviewed: setup_install_dev_verify_env | not_checked
  dependency_install_scope: checked | not_checked
  local_dev_server_scope: checked | not_checked
  branch_pr_flow: checked | not_checked
  one_way_push_risk: checked | not_checked
  mcp_context_exposure: checked | not_checked
  secrets_and_env_redaction: checked | not_checked
  browser_qa_required_after_export: yes | no | not_checked
```

## Improvement Delta

- 개선 전: Figma code layers는 broad design-agent/motion handoff 신호로만 저장되어 있었습니다.
- 개선 후: 실제 codebase와 연결될 때 필요한 repository source, `.figma/make` scripts, dependency/dev-server execution, branch/PR, one-way push, Code Connect/MCP context, secrets/env redaction, browser QA fields로 분리했습니다.
- 운영 규칙 변경: Figma Make/local codebase는 디자인 도구가 아니라 repository mutation candidate로 취급합니다. 계정/저장소/스크립트/권한/QA 근거가 없으면 adoption이 아니라 `approval-not-ready`입니다.

## Adoption Check

- 이전 action item: 새 source를 저장하기 전 `operational_scope.diff`가 있는지 확인한다.
- 채택 여부: done.
- 반영 방식: Figma Make local codebase가 기존 checklist에 없던 repository/script/one-way-push/MCP-context evidence fields를 만들었으므로 source note와 checklist update로 제한 반영했습니다.

## Previous Deferred / Carried Rejudgment

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | account, plan, org policy, local runtime still not checked |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, generated diff, test output, rollback still missing |
| Figma Agent skills/custom tools | duplicate/account-adjacent | carried/account-and-repo-specific | Figma Make local codebase adds concrete repo/script fields, but live account/repo remains unchecked |
| Threads Obsidian+Codex signal | deferred/discovery-only | deferred/discovery-only | primary source confirmation still weak |
| Figma code layers broad signal | duplicate broad source | done/adopted-narrow-field | only local codebase handoff risk fields were adopted |

## Next Eval

1. Run preflight first.
2. Only store a new source if it changes a checklist field, approval field, QA field, or acceptance test.
3. If Figma Make/codebase appears again, require target repo path, account/org owner, feature access, `.figma/make` script review, dependency/dev-server impact, branch/PR policy, rollback, and browser QA command before any adoption or approval request.
4. Keep Threads discovery-only until primary source confirmation exists.

## Prompt Or Template Patch Candidate

```text
For design-to-code tools that connect to a real repository, do not treat "Figma/agent/code layer" as a visual handoff only. Split evidence by account/org owner, feature availability, repository source, provider support, .figma/make scripts, dependency install, dev server, branch/PR flow, one-way push risk, Code Connect mapping, MCP context exposure, secrets/env redaction, rollback, and browser QA after export. If these are not checked, keep the tool as knowledge-only or approval-not-ready.
```

## Failure Pattern / Risk

- 반복 위험: design-to-code demos look like visual collaboration features, but repository connection, generated code, scripts, and GitHub app permissions make them executable workflow candidates.
- 이번 처리: no install/no account connection; only a source note and checklist fields were added.
- 운영 위험: Figma docs are official but product/beta docs. They do not prove Ethan account access, repo compatibility, generated code quality, or runtime safety.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-023201.md` |
| internet search | PASS | public official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki grep, existing Figma source note |
| source/wiki storage basis | PASS | concrete repository/script/MCP/QA fields added |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package, account, billing, token change |
| source-backed / Dex inference / not checked split | PASS | Evidence Table and separate section |
| status | PASS | source notes 165, wiki notes 7, query notes 1 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 180, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed Korean Markdown files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are live Figma/GitHub account, beta/repo/runtime, and unexplored backlog |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit, schema, UTF-8 checks passed; no unauthorized installs, connectors, MCP/package execution, GitHub app authorization, account connection, token, billing, or cloud changes were made.
- Highest risk: Figma Make/local codebase is a repository mutation workflow candidate, so it must not be treated as approved or available until account, beta access, repo, scripts, permissions, rollback, and browser QA are checked.
- Not checked: live Figma/GitHub account, beta access, repository setup, `.figma/make` scripts execution, dependency install, runtime, Code Connect mapping, MCP connection, browser QA.
- Rework needed: none.

## Original Content

이 보고서는 2026-07-09 02:34 KST Growth Scan 공개 검색 결과, preflight PASS 결과, Figma Make/code layer/local codebase 확인 범위, 기존 LLM Wiki 중복 확인, PPT/frontend checklist 변경을 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
