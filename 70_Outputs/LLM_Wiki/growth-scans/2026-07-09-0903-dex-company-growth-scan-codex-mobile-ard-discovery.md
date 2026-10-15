---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - Codex Mobile and ARD Discovery Governance"
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
  - "https://openai.com/index/work-with-codex-from-anywhere/"
  - "https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan"
  - "https://developers.openai.com/codex/pricing"
  - "https://github.blog/changelog/2026-06-17-agent-finder-for-github-copilot-now-available/"
  - "https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/mcp-management"
  - "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access"
  - "https://github.com/github/agentfinder-catalog"
collectionPurpose: "Codex mobile task controls and agent/resource discovery governance changes that improve Dex Company approval, cost, registry, and no-install-first checklists."
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - codex
  - mcp
  - governance
---

# Dex Company Growth Scan - Codex Mobile and ARD Discovery Governance

## Run Scope and Limits

- 실행 시각: 2026-07-09 09:03 KST
- 자동화: Dex Company Growth Scan, 30분 discovery cadence
- Preflight: PASS
- Preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-090114.md`
- 검색 범위: OpenAI Codex changelog/mobile/help/pricing, GitHub Agent Finder/ARD/MCP registry docs/catalog, GitHub Copilot changelog, Obsidian, Storybook/Playwright, NN/g, W3C WAI, Figma, Threads public snippets.
- 한계: 에던님의 실제 ChatGPT iOS/Android app version, Codex account plan, credit balance, host connection state, GitHub/Copilot org policy, registry URL, Copilot CLI/IDE version은 확인하지 않았다.
- 실행 금지 준수: package, SDK, MCP server, connector, browser extension, GitHub workflow, account connection, SSH host, credit purchase, mobile setting 변경은 하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 17 | 공개 검색 후보 및 공식/문서 페이지 기준 |
| stored.count | 1 | 신규 source note 1개 |
| updated.count | 1 | 기존 Agent Finder / ARD source note refresh |
| duplicate.count | 8 | 기존 Copilot IDE/OTel/MDM/mobile, NN/g design specs, W3C WCAG, Playwright/Storybook, Obsidian currentness 중복 |
| deferred.count | 3 | Threads weak signal, Figma account/file-specific signal, GitHub usage/billing API 세부 항목 |
| blocked.count | 0 | 접근 차단으로 workflow 중단된 항목 없음 |
| lint.warning_count | 0 | 최종 `llm-wiki-lint.ps1` 결과 |

## Core Findings

1. OpenAI Codex iOS 1.2026.181은 모바일에서 Codex task를 만들고, 찾고, 열고, fork/manage하는 표면을 넓혔다. Dex Company에는 모바일 승인 전 `app version`, `account/workspace`, `host connection`, `Needs input`, `diff filter`, `usage/credit state`, `desktop-side final verification`을 확인하는 필드가 필요하다.
2. OpenAI 모바일/요금 문서는 모바일이 긴 작업을 이어가는 표면이라는 점과 plan/credit visibility가 분리되어야 한다는 점을 같이 보여준다. 공개 문서만으로 에던님의 실제 credit balance나 앱 버전은 확인하지 않았다.
3. GitHub Agent Finder / ARD는 이미 2026-07-03 source note가 있었으므로 새로 중복 저장하지 않았다. 대신 GitHub Docs, GitHub catalog repo, Microsoft/Google ARD 발표로 `registry URL`, `manifest/schema validation`, `allowlist policy`, `publisher identity`, `no auto install` 필드를 보강했다.
4. Threads는 이번 회차에도 discovery-only 신호였다. 원문 검증성과 운영 필드가 약해 source note로 승격하지 않았다.
5. NN/g design specs, W3C WCAG, Playwright/Storybook, Obsidian/Figma currentness는 기존 checklist/source coverage가 충분하거나 target project/account가 필요해 no-new-signal 또는 carried로 처리했다.

## Evidence Table

| Candidate | Publisher | Result | Confidence | Evidence split |
|---|---|---|---|---|
| Codex iOS task management / credit visibility | OpenAI | stored-source | medium | source-backed: OpenAI changelog/mobile/help/pricing. Dex inference: mobile approval/cost checklist. not checked: Ethan app/account/credit/host state |
| GitHub Agent Finder / ARD / MCP registry | GitHub, Microsoft, Google | updated-existing-source | medium | source-backed: GitHub changelog/docs/catalog plus ARD announcements. Dex inference: discovery-only adoption gate. not checked: local registry/policy/runtime |
| GitHub Copilot VS Code / MDM / OTel / mobile remote session | GitHub | duplicate | medium | Already covered by 06:04-08:05 source notes and checklist fields |
| NN/g Design Specs | NN/g | duplicate | medium | Already covered by 2026-07-08 design specs handoff note |
| W3C WCAG 2 overview | W3C | duplicate | high | Existing PPT/frontend WCAG anchors already cover practical QA fields |
| Threads AI/LLM Wiki snippets | Threads | deferred/source-weak | low | Discovery signal only; not enough provenance for source-backed note |
| Figma AI/MCP/Slides currentness | Figma/public snippets | deferred/account-specific | medium | Existing Figma Make/Slides/credits notes cover current approval fields |

## Stored / Updated / Rejected / Deferred

### Stored

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-openai-codex-ios-task-management-credit-gate.md`

### Updated

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-03-github-agent-finder-ard.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`

### Rejected as Duplicate / No-New-Signal

- GitHub Copilot VS Code June release, managed settings, OTel, mobile remote session: 기존 07:34/08:05 notes가 이미 운영 필드를 갖고 있다.
- NN/g Design Specs: 2026-07-08 source note가 이미 design handoff context QA를 반영했다.
- W3C WCAG 2 overview: 기존 PPT/frontend checklist의 WCAG anchors와 중복이다.
- Obsidian/Storybook/Playwright currentness: 이번 회차에는 새 checklist field를 만들 정도의 operational scope diff가 없었다.

### Deferred / Carried

- Threads: discovery-only. 검증 가능한 공식/원문 자료가 연결될 때만 승격.
- Figma account/file-specific items: target Figma file, plan, seat, credit/admin usage가 있을 때 재판정.
- GitHub usage/billing API details: budget/adoption phase fields는 별도 billing governance run에서 target org/account context가 있을 때 재판정.

## Approval Decisions

| Item | Decision | Installed/connected | Reason |
|---|---|---:|---|
| Codex mobile task management | knowledge-only / approval-not-ready | No | Requires Ethan app version, account/workspace, host connection, task state, credit visibility |
| GitHub Agent Finder / ARD registry | knowledge-only / approval-not-ready | No | Requires registry URL, manifest validation, allowlist policy, publisher identity, supported surface, rollback |
| Threads signals | not-checked / discovery-only | No | Public snippet weak and source-backed provenance insufficient |

## Cross-Verification

- OpenAI Codex changelog was cross-checked with OpenAI Codex mobile article and OpenAI help/pricing pages for mobile task-control and credit visibility.
- GitHub Agent Finder changelog was cross-checked with GitHub Enterprise Cloud MCP management docs, GitHub MCP server access docs, GitHub `agentfinder-catalog`, Microsoft ARD announcement, and Google ARD announcement.
- Existing LLM Wiki duplicate check was run against `30_Knowledge/LLM_Wiki` and `00_Inbox/LLM_Wiki`; Agent Finder already existed, so it was refreshed instead of duplicated.

## Failure Pattern / Risk

- Risk: mobile approval can make work feel complete before desktop-side diff/test evidence exists.
- Risk: discovery tools can look safe because they do not auto-install, but registry trust, manifest validation, allowlist enforcement, and publisher identity are still supply-chain controls.
- Risk: low available RAM was close to the preflight risk band at 1.24GB, so broad local/tool execution should stay limited.

## PPT / Frontend Use Example

PPT 또는 frontend 작업을 Codex mobile에서 이어갈 경우, 모바일에서 "승인"하기 전에 데스크톱 결과물 기준으로 다음을 확인한다: branch/diff filter, changed file list, rendered screenshot or browser QA, usage/credit state, and final source path. 모바일 화면에서 보이는 요약만으로 완료 처리하지 않는다.

Agent Finder/ARD식 discovery를 frontend QA에 적용할 경우, "a11y tool"이나 "storybook skill"을 찾았다는 사실은 설치 근거가 아니다. registry source, publisher identity, manifest/schema, allowlist policy, package/install script, rollback, and validation command를 갖춘 뒤에만 approval-ready로 올린다.

## Improvement Delta

- Codex/OpenAI checklist에 mobile task approval and credit visibility fields를 추가했다.
- AI Agents/MCP checklist에 agent/resource discovery registry governance fields를 추가했다.
- 기존 Agent Finder note의 `not checked: ARD specification details, GitHub catalog contents`를 공식 문서와 catalog repo로 일부 보강했다.
- no-install-first 규칙을 discovery layer에도 명시했다.

## Adoption Check

- 이전 action item: 비-Codex AI coding tool 자료는 Codex-portable checklist/approval/QA/prompt/eval field를 만들 때만 승격.
- 판정: done/extended. 이번 회차는 외부 도구 설치가 아니라 discovery governance를 Codex Company approval packet으로 번역했다.
- 이전 carried item: low-RAM backoff prompt update.
- 판정: carried. Preflight PASS였지만 free RAM 1.24GB로 낮아 broad tool execution은 계속 제한한다.
- 이전 deferred/carried item: Threads.
- 판정: carried. 이번에도 source-backed 승격 근거가 약했다.

## Previous Deferred / Carried Rejudgement

- Threads: carried/discovery-only.
- Figma account/file-specific items: carried/account-and-file-specific.
- GitHub usage/billing API details: deferred/billing-governance-specific.

## Next Eval

1. Run preflight first.
2. Only promote Codex mobile sources when they add a new field across app version, account/workspace, host connection, task state, diff filter, approval scope, usage/credit state, desktop verification, or rollback.
3. Only promote agent/resource discovery sources when they add a new field across registry URL, catalog source, publisher identity, manifest/schema validation, allowlist policy, supported surface/version, install/connect step, rollback, audit evidence, or validation command.
4. If free RAM remains near 1.0-1.3GB, prefer one-source refresh/no-op over broad searches or tool execution.

## Prompt or Template Patch Candidate

```text
For Codex mobile or agent/resource discovery signals, do not treat mobile control or discovery as adoption. Promote only when the source creates a concrete approval, cost, registry, allowlist, manifest-validation, rollback, or desktop-verification field. Mobile approval still requires desktop-side evidence; discovery still requires explicit install/connect approval.
```

## QA Scorecard

| Gate | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-090114.md` |
| internet search | PASS | OpenAI/GitHub/ARD/NN-g/W3C/Figma/Threads searches completed |
| duplicate check | PASS | `rg` found existing Agent Finder note; refreshed instead of duplicated |
| source note schema | PASS | New source note includes v5 metadata and `## Original Content` |
| status | PASS | `llm-wiki-status.ps1` passed after changes |
| lint | PASS | `llm-wiki-lint.ps1` passed with 0 warnings |
| audit | PASS_WITH_WARNINGS | `llm-wiki-audit.ps1` passed structurally; unexplored notes remain 13 |
| UTF-8 replacement scan | PASS | No replacement character found in changed files/latest report |
| installs/connections | PASS | None performed |
| watchdog | PASS_WITH_WARNINGS | Valid source-backed update; local mobile/account/registry/runtime state remains not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 최고 위험: 모바일 제어와 discovery 기능을 실제 안전한 승인/설치로 과장하는 것.
- Not checked: Ethan's ChatGPT mobile version, Codex plan/credit balance, host connection, SSH host setup, GitHub org/enterprise policy, registry URL, Copilot CLI/IDE supported surface, actual discovered resources.
- Rework required: 없음. 남은 항목은 local/account/runtime 확인이 필요한 범위다.

## Original Content

이 보고서는 2026-07-09 09:03 KST Growth Scan 공개 검색 결과, preflight PASS 결과, OpenAI/GitHub/ARD 공식 문서, 기존 LLM Wiki 중복 확인, 변경 파일 검증 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
