---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Agentic Governance - 2026-07-04 01:03 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T01:03:21+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/"
  - "https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows"
  - "https://github.github.com/gh-aw/"
  - "https://github.blog/changelog/2026-06-11-agentic-workflows-no-longer-need-a-personal-access-token/"
  - "https://github.blog/changelog/2026-07-02-cost-centers-now-support-included-usage-caps/"
  - "https://docs.github.com/en/copilot/concepts/billing/usage-based-billing-for-organizations-and-enterprises"
  - "https://github.blog/changelog/2026-07-01-kimi-k2-7-is-now-available-in-github-copilot/"
  - "https://docs.github.com/en/copilot/reference/ai-models/supported-models"
collectionPurpose: "agentic automation, token hygiene, cost center budget control, model governance 신호를 Dex Company 운영 지식으로 흡수한다."
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - automation
---

# Dex Company Growth Scan Agentic Governance - 2026-07-04 01:03 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 01:03 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault AGENTS/역할 라우팅/LLM Wiki 운영 문서, LLM Wiki index/log, Growth Scan improvement guide, 최근 00:34/00:04/23:35/23:03 보고서, 10x candidate queue, OpenAI Codex changelog/remote docs, GitHub changelog/docs/product site, Obsidian changelog, Next.js/Storybook 검색 결과, Threads/X 제외 조건.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 상태를 유지하면서 외부 agent integration이 발견되면 `integration.surface`, `account.permission`, `source_of_truth`, `progress.trace`, `install.status`를 분리한다.
- 제외: GitHub Agentic Workflows CLI, GitHub Actions workflow, GitHub CLI extension, Copilot model picker, billing API, cost center API, token/PAT/secret/auth file, cloud resource, plugin, SDK, MCP server를 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고, 공식 출처 URL, 확인 범위, 후보 판단, 중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 21 |
| stored.count | 4 |
| duplicate.count | 8 |
| deferred.count | 5 |
| blocked.count | 5 |
| lint.warning_count | 0 |

## Today's Core Findings

1. GitHub Agentic Workflows는 자연어 Markdown을 Actions로 컴파일해 실행하는 public preview라서 Dex Company 자동화 설계에 좋은 참고 모델이다. 핵심은 "agent에게 맡김"이 아니라 frontmatter permissions, safe outputs, lockfile, firewalled execution, human review를 분리하는 점이다.
2. Agentic Workflows의 `GITHUB_TOKEN` 지원은 long-lived PAT를 줄이는 credential hygiene 신호다. 다만 이 신호는 Agentic Workflows 범위의 정책이며 모든 Copilot/GitHub CLI 인증에 자동 일반화하면 안 된다.
3. Copilot AI credit pool은 session 단위 제한만으로 비용 통제가 부족하다는 점을 보강한다. cost center included pool cap, user-level budget, enterprise spending limit, overage policy를 별도 필드로 보아야 한다.
4. Kimi K2.7 Code의 Copilot GA는 새 모델을 평가할 때 성능보다 admin policy, rollout, hosting, supported surface, billing, compliance를 먼저 확인해야 한다는 모델 거버넌스 근거다.
5. OpenAI Codex, Obsidian, Storybook, Next.js, WCAG/OWASP는 이번 30분 구간에서 이전 보고서 판단을 바꿀 새 신호가 약해 중복/no-new-signal로 처리했다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-agentic-workflows-actions-guardrails.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-agentic-workflows-github-token-auth.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-ai-credit-pools.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-kimi-model-governance.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 4 GitHub official source notes for agentic workflows, token hygiene, AI credit pool cost control, and model governance |
| Index | Added 4 source links and this report link |
| Log | Added this 01:03 scheduled growth scan entry |
| Inbox queue | Preserved old 10x queue at `eligible-next=0`, `not-checked=0`; no old broad MCP Apps reopening |
| Installs | No install, workflow run, token creation, billing API call, model enablement, cloud action, or connector action |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| GitHub Agentic Workflows | official changelog + docs + product site | source-backed: Markdown workflows, Actions execution, guardrails, safe outputs; Dex inference: Dex Company automation template gate; not checked: local/account availability and workflow execution | medium |
| Agentic Workflows `GITHUB_TOKEN` | official changelog + docs | source-backed: built-in token support and PAT risk reduction; Dex inference: PAT-first should be avoided; not checked: org policy and CLI version | medium |
| Copilot AI credit pools | official changelog + billing docs | source-backed: cost center included credit pool cap and budget layers; Dex inference: Growth Scan budget fields; not checked: enterprise billing state | medium |
| Kimi K2.7 Code in Copilot | official changelog + supported models docs | source-backed: GA, Azure hosting, admin policy, supported models; Dex inference: model governance checklist; not checked: plan/client/model picker availability | medium |
| OpenAI Codex changelog/remote docs | official docs | duplicate/no-new-signal | existing Codex remote/access-token/App Server notes cover current decision boundary |
| GitHub Copilot session streaming/managed settings/session limits | official docs already stored | duplicate/no-new-signal | previous 00:04 and 00:34 notes already cover session trace and enterprise settings |
| Obsidian changelog | official changelog | duplicate/no-new-signal | existing Obsidian 1.13/Bases/CLI source notes remain sufficient |
| Storybook/Next.js/Vite/WCAG/OWASP | official/existing anchors | duplicate/no-new-signal | used as QA/security anchors, not re-stored |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| GitHub Agentic Workflows | project-specific conditional | No | Requires GitHub Actions, CLI extension, workflow lockfile, repo permission, AI engine credential, safe output review, billing owner. |
| Agentic Workflows `GITHUB_TOKEN` auth | credential-policy candidate | No | Reduces PAT need in this feature, but org policy and permissions must be checked before use. |
| Copilot AI credit pools | billing-governance candidate | No | Requires Enterprise/Business billing role and REST API/UI setup; no API call was made. |
| Kimi K2.7 Code | model-governance candidate | No | Requires plan, rollout, admin policy, supported client, billing and data-governance review. |
| GitHub CLI / Agentic Workflows CLI | install-adjacent candidate | No | No `gh`, extension install, upgrade, auth, compile, or workflow run performed. |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: OpenAI Codex App Server/remote/access-token/managed-config lanes were checked but not repeated.
- duplicate/no-new-signal: GitHub Copilot session streaming, enterprise managed settings, AI credit session limits, Jira integration, JetBrains integration were already stored in recent runs.
- duplicate/no-new-signal: Obsidian changelog/CLI/Bases, Storybook/Next.js/Vite, WCAG 2.2, OWASP LLM Top 10 remain existing anchors.
- deferred: GitHub Agentic Workflows live availability, CLI extension version, lockfile compile, workflow execution, and Actions billing.
- deferred: Copilot model picker availability, Kimi Business/Enterprise policy state, client versions, and actual model quality/cost behavior.
- blocked: Threads/X was not used as source-backed ingestion; X is excluded by automation rule and Threads did not produce stable source text in prior runs.

## Failure / Blocked / Not Checked

- GitHub account, organization, enterprise, Copilot plan, billing role, Agentic Workflows entitlement, CLI extension version, Actions runner policy, and audit logs were not checked.
- No token, PAT, secret, auth file, cloud resource, GitHub Actions workflow, lockfile, model setting, billing cap, or cost center setting was created or changed.
- No runtime package or CLI install was performed.
- GitHub Agentic Workflows is public preview, so behavior and policy may change.
- Kimi K2.7 Code availability is rollout/client/plan/policy dependent and was not verified locally.

## Cross Verification Evidence

- Agentic Workflows was cross-checked across GitHub changelog, GitHub Docs, and the GitHub Agentic Workflows product site.
- `GITHUB_TOKEN` auth was cross-checked against the Agentic Workflows Docs permission model and existing Dex Company no-secret rule.
- AI credit pools were cross-checked against GitHub usage-based billing docs and existing Copilot AI credit session limits note.
- Kimi K2.7 Code was cross-checked against GitHub supported models docs and existing managed settings/model governance notes.
- WCAG 2.2 is not directly applicable to these backend/workflow/billing/model governance sources. If Dex Company builds a UI around these controls later, WCAG checks should target keyboard operation, visible focus, status/error announcements, permission disclosure, and billing warning clarity.

## Ethan Can Use This Immediately

- GitHub Actions 계열 자동화를 검토하실 때는 먼저 `permissions`, `safe_outputs`, `secrets_exposure`, `billing_owner`, `human_review`, `rollback_path`가 있는지 보시면 됩니다.
- 토큰이 필요한 자동화는 PAT부터 만들지 말고, built-in token이나 short-lived/scoped token으로 충분한지 먼저 판단하시면 됩니다.
- agent 비용 관리는 "세션 limit" 하나로 끝내지 말고, cost center, included pool, overage policy, billing owner까지 분리해서 보시면 됩니다.
- 새 모델이 좋아 보일 때도 바로 쓰지 말고, plan/rollout/admin policy/hosting/billing/supported client/data governance를 먼저 확인하시면 됩니다.

## Improvement Delta

- 직전 `integration.surface`, `account.permission`, `workflow.source_of_truth`, `progress.trace`, `install.status` 기준을 GitHub Agentic Workflows 자료에 실제 적용했다.
- Growth Scan template 후보에 `safe_outputs`, `credential.source`, `billing.owner`, `cost_center.pool`, `model.policy`, `admin.enablement`를 추가할 근거가 생겼다.
- 비용 통제를 session-level에서 organization/cost-center-level로 확장했다.
- token hygiene를 "비밀값 저장 금지"에서 "PAT-first 금지, built-in/scoped token 우선 검토"로 구체화했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지 기준을 지켰다.
- done: external agent integration 발견 시 `integration.surface`, `account.permission`, `source_of_truth`, `progress.trace`, `install.status`를 분리했다.
- done: 새 source note는 GitHub 공식/primary source 중 Dex Company 운영 판단을 바꾸는 4개로 제한했다.
- done: GitHub Actions/CLI/model/billing 관련 실행 가능한 표면은 전부 no-install/no-run으로 유지했다.
- carried: live Codex/GitHub/Copilot/account/runtime availability는 계정/권한 확인 전까지 current로 말하지 않는다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| External agent integration gate | carried | done | GitHub Agentic Workflows에 integration/account/source/progress/install 분리 적용 |
| Budget/session trace/policy fields | carried | done | AI credit pools와 `GITHUB_TOKEN` auth source notes로 확장 |
| Live availability checks | carried | carried | GitHub/Copilot/account/runtime state not checked |
| Old 10x queue reopening | blocked-by-default | done | `eligible-next=0`, `not-checked=0` 유지, broad MCP Apps 재개 없음 |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; avoid repeating the old 10x queue unless a source changes a prior decision.
2. If the next run finds GitHub/Codex/Copilot automation features, record `safe_outputs`, `credential.source`, `billing.owner`, `human_review`, `rollback.path`, and `runtime.command_checked`.
3. If no new official/high-provenance signal appears, create a short no-op report instead of adding low-value notes.
4. Do not call GitHub Agentic Workflows, Kimi K2.7 Code, or Copilot cost controls usable for 에던 until live account/plan/org/client state is checked.

## Prompt or Template Patch Candidate

```text
For every Growth Scan item involving agentic automation, repository workflow execution, model selection, or AI billing, record: integration.surface, safe_outputs, credential.source, account.permission, billing.owner, cost_center.pool, model.policy, admin.enablement, human_review, rollback.path, install.status, and runtime.command_checked. Official documentation proves public availability, not local account or runtime availability.
```

## Questions / Tracking Candidates

- GitHub Actions 기반 자동화를 Dex Company에 붙일 일이 생기면, Obsidian-first 자동화와 GitHub repository-first 자동화 중 어느 쪽이 source of truth인지 먼저 정해야 한다.
- Copilot 모델 선택권이 실제로 필요해지면, 품질 벤치마크보다 모델 정책/비용/호스팅/지원 client를 먼저 비교해야 한다.
- 조직 비용 통제를 도입할 때는 AI credits, included pool, metered overage, user-level budget, cost center budget의 차이를 에던 운영 용어로 정리해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 00:34, 00:04, 23:35, 23:03 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Next.js, Storybook, Threads/X policy searched or checked |
| Duplicate check | passed | `rg` checked sources/index/log/reports/queue before writing |
| Previous deferred rejudgement | passed | external integration and budget/policy fields rejudged as done |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, billing API, workflow run, model enablement, SDK, MCP, or connector action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: GitHub Agentic Workflows, `GITHUB_TOKEN`, AI credit pools, and Kimi K2.7 Code are official signals, but local account/org/billing/runtime availability was not checked.
- Mitigation: all items were stored as documentation/source notes or due-diligence candidates only; no executable setup or credential action was run.
- Not checked: GitHub org policy, Copilot plan, billing role, Actions runner policy, Agentic Workflows CLI, model picker, cost center REST API, actual workflow execution.

