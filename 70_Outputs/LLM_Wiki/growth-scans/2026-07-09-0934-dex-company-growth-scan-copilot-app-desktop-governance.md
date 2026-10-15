---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - Copilot App Desktop Agent Governance"
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
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://docs.github.com/en/copilot/how-tos/github-copilot-app/getting-started"
  - "https://docs.github.com/en/copilot/how-tos/github-copilot-app/agent-sessions"
  - "https://docs.github.com/en/copilot/how-tos/github-copilot-app/use-byok-models"
collectionPurpose: "Rejudge the carried GitHub Copilot app desktop signal and convert it into source-backed no-install-first desktop agent app governance fields."
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - ai-agents
  - github-copilot
---

# Dex Company Growth Scan - Copilot App Desktop Agent Governance

## Run Scope and Limits

- 실행 시각: 2026-07-09 09:32-09:34 KST
- 자동화: Dex Company Growth Scan, 30분 cadence
- Preflight: PASS
- Preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-093210.md`
- free RAM: 1.08GB. 기준은 통과했지만 1.0-1.3GB 위험 구간이므로 검색과 변경 범위를 좁혔다.
- 검색 범위: OpenAI Codex changelog, GitHub Copilot changelog/docs, Obsidian changelog, Storybook, Figma, W3C WAI, recent Growth Scan reports, LLM Wiki index/log/source/checklist duplicate surfaces.
- 실행 금지 준수: package, SDK, MCP server, connector, browser extension, GitHub workflow, account connection, desktop app install, BYOK credential entry, billing setting, token, auth-file, organization policy 변경은 하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 13 | public search/opened sources and local duplicate surfaces |
| stored.count | 1 | GitHub Copilot app desktop agent governance source note |
| duplicate.count | 8 | VS Code June release, browser tools, MDM, OTel, mobile session, Codex mobile, Agent Finder/ARD, Obsidian/Storybook currentness |
| deferred.count | 4 | low-RAM backoff automation prompt, Threads, Figma account/file-specific, GitHub usage/billing API details |
| blocked.count | 0 | preflight FAIL 없음 |
| lint.warning_count | 0 | final `llm-wiki-lint.ps1` result |

## 오늘의 핵심 발견

1. GitHub Copilot app availability was repeatedly carried in recent reports, but there was no dedicated LLM Wiki source note. This run promoted it as a desktop agent app governance case, not as an adoption recommendation.
2. GitHub official sources show the app now spans Copilot plans and desktop OS platforms, while docs add prerequisites, organization policy requirements, repository/local-folder selection, isolated sessions, agency modes, and BYOK credential handling.
3. Dex Company should treat desktop agent apps as approval-not-ready until plan/account, local install source/version, organization policy, workspace scope, session isolation, agency mode, model provider, BYOK credential storage/removal, billing owner, validation evidence, and rollback are checked.
4. The 2026-07-08 VS Code June release was not promoted again because the 06:04 source note already covers integrated browser, Workspace Trust, Marketplace model providers, MCP OAuth storage, and session/subagent cost visibility.
5. Low-RAM backoff remains a live operations issue. This run passed preflight, but 1.08GB free RAM justified a one-source focused scan rather than a broad multi-note run.

## Evidence Table

| Candidate | Publisher | Result | Confidence | Evidence split |
|---|---|---|---|---|
| GitHub Copilot app available to all / desktop agent sessions | GitHub | stored-source | medium | source-backed: changelog plus app quickstart/session/BYOK docs. Dex inference: desktop app approval checklist. not checked: Ethan account/install/billing/runtime |
| GitHub Copilot VS Code June release | GitHub | duplicate-source | medium-high | Already covered by 06:04 IDE governance note and 09:03 duplicate check |
| GitHub Mobile live notifications / remote sessions | GitHub | duplicate-source | medium-high | Already covered by 08:05 mobile remote session note |
| GitHub Agent Finder / ARD | GitHub | duplicate-source | medium | Refreshed at 09:03 with docs/catalog cross-checks |
| OpenAI Codex iOS task management | OpenAI | duplicate-source | medium | Stored at 09:03 |
| Obsidian / Storybook / W3C / Figma currentness | mixed official | no-new-signal | medium | No new operational field beyond existing checklists |
| Threads | Threads | deferred/source-weak | low | Public snippet/discovery only; not promoted |

## Stored / Updated / Rejected / Deferred

### Stored

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-github-copilot-app-desktop-agent-governance.md`

### Updated

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`

### Rejected as Duplicate / No-New-Signal

- GitHub Copilot VS Code June release: existing IDE governance source already covers the fields.
- GitHub Mobile live notifications: existing mobile remote session source already covers the fields.
- GitHub Agent Finder / ARD: existing source was refreshed at 09:03.
- OpenAI Codex iOS task controls: existing source stored at 09:03.
- Obsidian/Storybook/W3C/Figma currentness: no operational scope diff this run.

### Deferred / Carried

- Low-RAM backoff automation prompt update: carried. The rule is needed, but editing the one-line automation prompt while free RAM is 1.08GB is not necessary for this source-backed run. Patch candidate is recorded below.
- Threads: carried/discovery-only.
- Figma account/file-specific items: carried/account-and-file-specific.
- GitHub usage/billing API details: deferred/billing-governance-specific.

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/ai-research/`: GitHub Copilot app desktop agent governance source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: desktop agent app approval fields 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source link와 desktop agent app operating rule 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 09:34 실행 기록 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue: 직접 확인 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual install/connect | Reason |
|---|---|---:|---|
| GitHub Copilot app | knowledge-only / approval-not-ready | No | Needs account/plan, app install source/version, policy, repo/local folder scope, agency mode, BYOK credentials, billing, validation, rollback |
| BYOK model provider in Copilot app | approval-not-ready | No | Requires provider, base URL, API key handling, credential removal, billing owner, data retention and privacy review |
| Autonomous desktop agent mode | install-audit-risk field | No | Excessive agency risk; must require plan/review or explicit approval evidence before use |

## Failure / Blocked / Not Checked

- 실패: 없음.
- 차단: 없음.
- 미확인: Ethan GitHub account, Copilot plan, org/enterprise policy, app installation, installer hash/source, BYOK provider, credential store, billing, local session logs, generated branch/worktree, diff/test evidence, rollback behavior.
- 운영 위험: free RAM 1.08GB로 통과했지만 매우 낮다. broad search, browser automation, package execution, local app install, heavy audit should remain avoided until resource margin improves.

## Cross-Verification

- GitHub changelog was cross-checked with GitHub app quickstart docs for account, plan/BYOK, Git, policy, and onboarding prerequisites.
- GitHub app session docs were checked for isolated workspace, repository/local-folder selection, parallel sessions, and agency modes.
- GitHub BYOK docs were checked for model-provider setup, credential requirements, and system credential-store note.
- Local duplicate search compared the candidate against recent IDE/CLI/mobile/browser/OTel/MDM/ARD notes; a dedicated desktop app governance note was missing.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitHub official changelog/docs on availability, platform scope, prerequisites, policy, sessions, modes, BYOK provider setup, and credential storage note.
- Dex inference: translating those docs into Dex Company approval fields and no-install-first desktop agent app governance.
- not checked: local app behavior, Ethan account/plan/org policy, actual credentials, local logs, branch/worktree isolation, cost/billing, and rollback.

## 에던님이 바로 사용할 수 있는 예시

PPT 또는 frontend 프로젝트에서 desktop agent app을 쓰자는 제안이 나오면, 먼저 아래처럼 승인 전 필드를 채웁니다.

```yaml
desktop_agent_app_gate:
  app: "GitHub Copilot app"
  decision: "approval-not-ready"
  account_plan: "not_checked"
  installer_source_version: "not_checked"
  org_policy: "not_checked"
  workspace_scope: "repo_or_local_folder_not_checked"
  session_isolation: "not_checked"
  agency_mode: "interactive_or_plan_required_by_default"
  model_provider: "github_hosted_or_byok_not_checked"
  credential_storage_removal: "not_checked"
  billing_owner: "not_checked"
  validation_evidence: "diff_tests_browser_qa_required"
  rollback_path: "not_checked"
```

Frontend 작업에서는 desktop agent의 통합 브라우저나 자동 테스트 요약을 그대로 믿지 말고, Dex의 실제 repo에서 diff, build/test, Playwright/browser screenshot, accessibility evidence, rollback path를 따로 남깁니다. 발표 자료 작업에서는 BYOK나 외부 모델 provider를 켜기 전에 private deck/source exposure와 비용 소유자를 분리합니다.

## Improvement Delta

- Repeated carried item인 GitHub Copilot app signal을 더 이상 막연한 account-adjacent 후보로 두지 않고, desktop agent app approval fields로 정리했다.
- AI Agents/MCP checklist와 LLM Wiki index에 desktop agent app 운영 규칙을 추가했다.
- One-source focused scan 기준을 적용해 low RAM 상태에서 무리한 다중 승격을 피했다.

## Adoption Check

- 이전 action item: Codex mobile/agent discovery sources는 새 approval/cost/registry/rollback/desktop-verification field를 만들 때만 승격.
- 판정: done/extended. 이번 회차는 GitHub desktop agent app을 approval-not-ready governance field로 승격했다.
- 이전 carried item: low-RAM backoff prompt update.
- 판정: carried. Preflight PASS였지만 free RAM 1.08GB라 broad tool execution과 automation prompt rewrite는 보류했다.
- 이전 deferred/carried item: Threads.
- 판정: carried/discovery-only.

## Previous Deferred / Carried Item Rejudgement

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app available to all | carried/account-adjacent | done/source-and-checklist-updated | dedicated source note and desktop agent app checklist fields created |
| Low-RAM backoff prompt update | carried | carried | free RAM 1.08GB; keep as prompt patch candidate, avoid broad automation rewrite this run |
| Threads | carried/discovery-only | carried | source-backed provenance still weak |
| Figma account/file-specific items | carried | carried | target file/account/credit context not available |

## Next Eval

1. Run preflight first.
2. If free RAM remains 1.0-1.3GB, perform one-source refresh/no-op only and do not run broad browser/package/tool work.
3. Only promote desktop agent app sources when they create new fields across installer source/version, account/plan, org policy, repo/local-folder scope, isolated session evidence, agency mode, model provider, credential storage/removal, billing owner, validation evidence, or rollback.
4. If no new source-backed field exists, write a short no-new-signal report rather than another source note.

## Prompt or Template Patch Candidate

```text
If preflight PASSes but free RAM is only 1.0-1.3GB, use low-RAM backoff: prefer one-source refresh, duplicate cleanup, or no-op report; avoid broad search, browser automation, package/tool execution, local app installs, or automation prompt rewrites unless the change is required to prevent data loss or repeated stop-the-line failures.
```

## Next Question / Tracking Candidate

- Check whether low-RAM backoff should be written into `dex-company-growth-scan/automation.toml` when free RAM is above 1.5GB.
- Track GitHub Copilot app only if new official docs add permission, rollback, audit log, billing, or local session validation fields.

## QA Scorecard

| Gate | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-093210.md` |
| internet search | PASS | OpenAI/GitHub/Obsidian/Storybook/Figma/W3C searches completed |
| duplicate check | PASS | `rg` checked recent reports, index, source notes, checklist, queue |
| source note schema | PASS | New source note includes v5 metadata, Bias Check, and `## Original Content` |
| status | PASS | `llm-wiki-status.ps1`; source notes 179 / wiki notes 7 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | `llm-wiki-audit.ps1`; notes checked 194, missing v5 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 replacement scan | PASS | Changed files returned `OK_UTF8_NO_REPLACEMENT` |
| installs/connections | PASS | None performed |
| watchdog | PASS_WITH_WARNINGS | Source-backed update is valid and verified; local account/runtime and low-RAM margin remain not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, targeted internet search, duplicate check, source note/checklist/index/log/report update, no-install discipline, status/lint/audit/UTF-8 checks completed.
- 최고 위험: desktop agent app availability를 실제 local adoption readiness로 과장하는 것.
- Not checked: Ethan GitHub account, Copilot plan, org policy, app install/runtime, BYOK credentials, billing, session logs, branch/worktree evidence, rollback rehearsal.
- Rework needed: 없음. 남은 항목은 account/runtime/resource margin 확인 범위다.

## Original Content

이 보고서는 2026-07-09 09:34 KST Growth Scan 공개 검색 결과, preflight PASS 결과, GitHub 공식 changelog/docs, 기존 LLM Wiki 중복 확인, 변경 파일 검증 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
