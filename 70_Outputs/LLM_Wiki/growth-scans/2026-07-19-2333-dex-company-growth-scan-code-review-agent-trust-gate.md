---
type: growth-scan-report
status: completed
automation: Dex Company Growth Scan
created: 2026-07-19 23:33:40 +09:00
confidence: mixed
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-19
verifiedBy: Dex
disputed: false
tags:
  - dex-company
  - growth-scan
  - llm-wiki
  - code-review
  - ai-agent-governance
---

# Dex Company Growth Scan - Code Review Agent Trust Gate

## Run

- Automation: Dex Company Growth Scan
- Automation ID: `dex-company-growth-scan`
- Run time: 2026-07-19 23:33:40 +09:00
- Mode: 23:30 fast discovery / currentness check
- Scope: mandatory preflight, automation memory, workspace instructions, handoff docs, LLM Wiki index/log, recent Growth Scan reports, closed candidate queue, narrow official currentness check
- Purpose wording: this run performs 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수. It does not claim model-level permanent learning.

## Preflight

- Result: PASS
- Free RAM: 1.59GB
- Backoff state: not low-RAM backoff, but close enough to keep the run narrow
- Preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260719-233113.md`

## Local Context Checked

- Workspace: `D:\CodexProjects\codex setup`
- Workspace instructions: `D:\CodexProjects\codex setup\AGENTS.md`
- Automation memory: `D:\Program Files\Codex\automations\dex-company-growth-scan\memory.md`
- Skills read: `llm-wiki`, `dex-watchdog`
- Handoff docs checked:
  - `20_Codex_Handoff\DEX_COMPANY_OVERVIEW.md`
  - `20_Codex_Handoff\DEX_QUALITY_LEARNING_RULES.md`
  - `20_Codex_Handoff\LLM_WIKI_OPERATING_GUIDE.md`
  - `20_Codex_Handoff\LLM_WIKI_VERIFICATION_SCHEMA.md`
  - `20_Codex_Handoff\ROLE_TOOL_SKILL_MATRIX.md`
  - `20_Codex_Handoff\ROLE_SKILL_ROUTING.md`
- LLM Wiki checked:
  - `30_Knowledge\LLM_Wiki\index.md`
  - `30_Knowledge\LLM_Wiki\log.md`
  - recent Growth Scan reports
  - `00_Inbox\LLM_Wiki\ai-research\2026-07-03-10x-growth-scan-candidate-queue.md`

## Candidate Queue

Current Status count from numeric candidate rows:

- `eligible-next`: 0
- `not-checked`: 0
- `install-audit-next`: 0
- `stored-source`: 43
- `duplicate-source`: 28
- `duplicate-in-queue`: 9
- `audit-done`: 8
- `carried-vendor`: 3
- `carried-research-signal`: 1
- `dropped-low-signal`: 3

Decision: the queue is closed for action states. I did not run broad collection. I refreshed an existing source note and checklist only because the official 2026-07-17 GitHub changelog produces a concrete QA/approval field for code-review agent trust.

## Search Scope

Narrow official currentness check only:

- OpenAI Codex changelog: https://developers.openai.com/codex/changelog
- ChatGPT What's new: https://learn.chatgpt.com/docs/whats-new
- Playwright release notes: https://playwright.dev/docs/release-notes
- Obsidian changelog: https://obsidian.md/changelog/
- W3C WAI update: https://www.w3.org/WAI/update/
- GitHub Copilot changelog label: https://github.blog/changelog/label/copilot/
- GitHub Copilot code review customization changelog: https://github.blog/changelog/2026-07-17-copilot-code-review-customization-and-configurability-improvements/
- GitHub Copilot usage metrics API changelog: https://github.blog/changelog/2026-07-17-repository-level-github-copilot-usage-metrics-generally-available/

No X/Twitter search was used. No login-gated or anti-bot surface was bypassed.

## Metrics

- `searched.count`: 8
- `stored.count`: 1
- `duplicate.count`: 5
- `deferred.count`: 2
- `blocked.count`: 0
- `lint.warning_count`: 0

`stored.count=1` means one existing source note was refreshed with new official-source fields. It does not mean a new standalone source note was created.

## Key Findings

1. Source-backed: GitHub's 2026-07-17 Copilot code review changelog says code review now reads custom instructions from the PR head branch, including `AGENTS.md`, `*.instructions.md`, `copilot-instructions.md`, and agent skills.
2. Source-backed: The same changelog adds support for `REVIEW.md`, `GEMINI.md`, and `CLAUDE.md`, and introduces a review-specific `copilot-code-review.yml` setup file under `.github/workflows/`.
3. Source-backed: Copilot code review now has firewall support enabled by default, but GitHub says self-hosted runners do not currently support the firewall.
4. Source-backed: GitHub's Copilot changelog also shows July 17 repository-level usage metrics and Copilot app usage metrics API changes. These are useful governance signals but remain account/API-specific and were deferred.
5. Dex inference: The portable Dex Company rule is not to adopt Copilot code review. The rule is to treat automated code-review output as untrusted until head-branch instruction diffs, setup YAML, runner, firewall/network, secret exposure, billing owner, rollback, and validation evidence are checked.

## Stored Or Absorbed

- Refreshed source note:
  - `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-03-github-copilot-code-review-custom-instructions.md`
- Updated guide:
  - `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- Updated index/log:
  - `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
  - `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- Stored report:
  - `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-19-2333-dex-company-growth-scan-code-review-agent-trust-gate.md`

No automation config, candidate queue, connector, account, package, SDK, MCP, browser extension, GitHub workflow, token, billing setting, or permission setting was changed.

## Not Adopted

| Candidate signal | Reason not adopted |
|---|---|
| GitHub Copilot code review feature | Knowledge-only portability signal; no target repo/account/org approval and no enablement request. |
| Repository-level Copilot usage metrics | Account/API permission and organization policy specific; deferred as governance signal. |
| Copilot app usage metrics API | Account/API permission specific; deferred as governance signal. |
| Visual Studio Copilot MCP trust layer | Duplicate reinforcement of existing MCP update-drift, fingerprint, and approval fields; kept in report only. |
| Obsidian 1.13.2 mobile | Useful currentness signal but no new Dex Company operating rule beyond existing local version/runtime verification. |

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitHub Changelog, OpenAI Codex changelog, ChatGPT What's new, Playwright release notes, Obsidian changelog, W3C WAI update.
- Dex inference: head-branch instructions and review setup files are a supply-chain and review-trust surface, so Dex Company should inspect them before trusting automated review output.
- not checked: Ethan's GitHub plan/org policy, Copilot code review availability, local Visual Studio/JetBrains/VS Code state, repository runner configuration, actual firewall behavior, GitHub API response shape, billing, and any live account/runtime behavior.

## Codex Portability

- Portable: yes, as a checklist and QA gate.
- No-install-first: yes. The rule applies before enabling any external review agent.
- Security posture: improves command/file/network/secret/billing boundary checks.
- Dex Company impact: useful for code review, PR handling, automation governance, and external-agent comparison without installing non-Codex tools.

## Installation / Execution / Permission / Cost Risk

- Install risk: none in this run.
- Execution risk: no GitHub workflow, package, MCP server, connector, or code-review agent was run.
- Permission risk: no account connection or permission change was made.
- Cost risk: GitHub usage metrics and Copilot review features may have billing/account implications, but this run only captured public docs.
- Secret risk: no secret, token, password, private key, or sensitive personal data was stored.

## Ready-To-Use Examples For Ethan

- Code QA: "자동 PR 리뷰가 왔어도 head branch에서 바뀐 `AGENTS.md`, `REVIEW.md`, `*.instructions.md`, agent skill, review setup YAML을 먼저 diff로 확인한 뒤 리뷰를 신뢰한다."
- Frontend: "Storybook/Playwright/AI review 환경이 별도 setup을 설치하면 dependency install, network/firewall, self-hosted runner 예외를 QA evidence에 남긴다."
- Automation: "외부 review agent 결과는 report input일 뿐이며, runner/firewall/secret/billing/rollback이 Not Checked면 PASS로 올리지 않는다."
- Career ops: "이력서/포트폴리오 자동 리뷰 도구도 동일하게 source instruction, data retention, output overwrite, final human approval을 분리한다."
- PPT/UX/UI: "AI가 만든 디자인 리뷰 코멘트는 판단 근거가 아니라 초안으로 보고, 실제 화면/슬라이드의 hierarchy, 접근성, 반응형 evidence를 따로 확인한다."

## Improvement Delta

- Before: Copilot code review custom instructions were stored as instruction-structure guidance.
- After: Dex Company now has a stricter code-review agent trust gate covering head-branch instruction diffs, setup YAML, firewall, self-hosted runner exception, runner separation, secret exposure, billing, rollback, and validation.

## Adoption Check

- adopted: Code-review agent trust gate as a checklist field.
- carried: GitHub usage metrics API governance signals for a future account/API-specific check.
- dropped: none.
- blocked: live account/runtime verification, because no target GitHub organization/repo/account was in scope.
- duplicate: OpenAI Codex desktop/CLI currentness, Playwright QA fields, Storybook security gate, Obsidian local version gates.
- approval-needed: any GitHub Copilot code review enablement, workflow file creation, runner change, firewall setting change, or API usage.

## Next Eval

At the next 09:00 or 17:00 verification-summary run, confirm `llm-wiki-status.ps1`, `llm-wiki-lint.ps1`, and UTF-8 remain clean after this checklist/source refresh. If a real PR review task appears, apply the new gate against actual changed instruction/setup files before trusting automated review comments.

## Prompt Or Template Patch Candidate

```text
Before trusting automated PR/code-review agent output, inspect head-branch instruction and runtime setup diffs: AGENTS.md, REVIEW.md, model-specific instruction files, *.instructions.md, agent skills, review setup YAML, runner type, firewall/network policy, self-hosted runner exceptions, secret exposure, billing owner, rollback path, and validation evidence.
```

## QA / Lint / Status / Audit / Watchdog

- status: PASS. `llm-wiki-status.ps1` passed for `D:\VibeProject\ObsidianVault\ObsidianVault`; source notes 183, wiki notes 7, query notes 1, audit notes 2, lint notes 1.
- lint: PASS. `llm-wiki-lint.ps1` completed with 0 warnings.
- UTF-8 replacement scan: PASS. Search for the Unicode replacement character `U+FFFD` over the changed source/checklist/index/log/report files returned no matches.
- audit: not run; this was a targeted source/checklist refresh, not an epistemic-health audit.
- watchdog: PASS_WITH_WARNINGS. The source/checklist refresh is verified and no installs or account changes occurred, but live GitHub account/org/runtime behavior remains Not Checked.
