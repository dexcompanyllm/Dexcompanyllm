---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 02:05 KST"
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
  - "https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://code.visualstudio.com/docs/agents/guides/browser-agent-testing-guide"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://obsidian.md/changelog/"
  - "https://www.indeed.com/careerscout"
  - "https://www.indeed.com/career-advice/finding-a-job/what-is-indeed-career-scout"
  - "https://www.indeed.com/career-advice/resumes-cover-letters/resume-ai"
  - "https://www.threads.com/"
collectionPurpose: "30분 Growth Scan에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, Indeed Career Scout를 Career Ops platform-native AI coach 기준으로 제한 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - career-ops
  - indeed
  - ai-career-coach
---

# Dex Company Growth Scan - 2026-07-09 02:05 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 02:02-02:05 KST
- 실행 모드: 30분 fast discovery / candidate detection after W3C COGA adoption.
- 검색 범위: OpenAI Codex, GitHub Copilot changelog/app/browser/billing, Storybook 10.4, VS Code browser agent docs, W3C WAI, NN/g, Obsidian changelog, Threads public search, Indeed Career Scout / resume AI / ATS guidance.
- 변경 범위: Indeed Career Scout source note 1개, `Dex Company Task Checklists from Growth Scans`, LLM Wiki `index.md`, `log.md`, 이 보고서.
- 금지 준수: package, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable install은 수행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 20 | public search/open surfaces counted from this run |
| stored.count | 1 | Indeed Career Scout source note 1개 |
| duplicate.count | 14 | OpenAI, GitHub browser/usage/billing, Storybook, W3C, NN/g, Obsidian, Threads 대부분 기존 coverage와 중복 |
| deferred.count | 4 | GitHub Copilot app, Storybook agentic setup, Figma/agent account context, Threads primary confirmation |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-run `llm-wiki-lint.ps1` 0 warning |

## Preflight

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-020226.md`
- free RAM: 1.55GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. GitHub Copilot browser tools, usage API, per-user budgets, session limits는 최신 검색에서 다시 보였지만 기존 source notes와 no-new-signal 보고서가 이미 browser permission, session trace, cost governance를 다룹니다.
2. Storybook 10.4 agentic setup은 계속 유용하지만 target repo, generated diff, test command, dependency/rollback evidence가 없으므로 adoption이 아니라 project-specific deferred입니다.
3. W3C WAI July update와 NN/g design specs/current UX items는 직전 COGA/design-specs 채택과 기존 checklist coverage 안에 들어갑니다.
4. Indeed Career Scout는 Career Ops에 새 운영 필드를 추가합니다. 플랫폼 내 AI 코치가 profile/activity/chat context를 쓰고, 생성 이력서 저장이 플랫폼 profile resume에 영향을 줄 수 있으므로 자동 제출이 아니라 human-review resume tailoring / tracking 보조로 분리해야 합니다.

## Stored / Absorbed

- Source note added: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-09-indeed-career-scout-native-ai-career-coach.md`
- Wiki guide updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- Index updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- Log updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- Report saved: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0205-dex-company-growth-scan-career-scout-native-ai-coach.md`

## LLM Wiki Inbox / Source / Wiki Change History

- Added Indeed Career Scout as a medium-confidence, partial verification source note.
- Updated Career Ops checklist with platform-native AI career coach classification and data/resume overwrite checks.
- Updated LLM Wiki index with the Career Scout source link and operating rule.
- Appended log entry for this Growth Scan.
- Candidate queue was not edited because direct count remains closed: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Claim Split |
|---|---|---|---|---|---|
| Indeed Career Scout | Indeed | official product + guide pages | stored-source + checklist-adopted | medium | source-backed: mobile AI coach, resume tailoring, tracking, mock interview, data use. Dex inference: classify as human-review assistant. not checked: Ethan account/app/UI |
| GitHub Copilot browser tools | GitHub / VS Code | official changelog/docs | duplicate-source | high | existing note covers isolated tabs, explicit sharing, permissions, domain controls |
| GitHub Copilot usage/billing | GitHub | official changelog | duplicate-currentness | high | existing cost/session/usage governance fields are sufficient |
| GitHub Copilot app | GitHub | official changelog | carried/account-adjacent | high | account/plan/org/local runtime not checked |
| Storybook 10.4 agentic setup | Storybook | official blog/docs | deferred/project-specific | medium | target repo/generated config/test output/rollback not checked |
| W3C WAI July update / COGA | W3C | official WAI update | duplicate-currentness | high | COGA AI decision-support fields adopted in prior run |
| NN/g articles index | NN/g | article index | duplicate/no-new-signal | medium | design specs adopted; newer signals do not add a field this run |
| Threads Obsidian/Codex signals | Threads public search | SNS discovery | deferred/discovery-only | low | primary source confirmation weak |

## Installation Or Due-Diligence Candidates

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Indeed Career Scout | account/app-specific candidate | No | profile data use, resume overwrite, region/app availability, job scope, privacy policy |
| GitHub Copilot app/browser tools | account-adjacent / project-specific | No | account policy, billing, tool permissions, browser data scope |
| Storybook agentic setup | project-specific conditional | No | dependency/config mutation, generated stories, a11y/runtime tests, rollback |
| VS Code browser agent tools | documentation-only cross-check | No | agent browser permissions, domain allow/deny, workspace trust |

## Duplicate Exclusions

- GitHub Copilot browser tools: existing source note already covers isolated tabs, explicit page sharing, permissions, and network domain controls.
- GitHub usage API and per-user budgets: existing AI credit/session/cost governance notes already cover the operating field.
- OpenAI Codex changelog: no new Dex Company operating field since prior currentness checks.
- Storybook 10.4: existing project-specific deferred status remains correct without a target repo.
- W3C WAI/COGA: AI conversation and supported-decision QA fields were adopted in the 01:39 run.
- NN/g design specs: adopted in the 22:34 run.
- Threads: discovery-only due to weak primary extraction.

## Failed / Blocked / Not Checked

- Failed: none.
- Blocked: none.
- Not checked: Ethan Indeed account, mobile app availability, Career Scout UI, actual resume generation/save behavior, whether saving replaces an existing Indeed resume, region availability, specific job application flow, privacy settings, GitHub/Figma/Storybook account/runtime context, Threads primary page confirmation.

## Cross Verification

- Indeed Career Scout product page was cross-checked against Indeed Career Guide and Indeed resume AI guidance.
- GitHub browser tools were cross-checked against the existing local source note and VS Code browser agent testing guide.
- GitHub July 2026 usage/billing/app signals were compared with recent no-new-signal reports and existing cost/session/browser notes.
- W3C/NN-g/Storybook signals were compared with recent 22:34, 01:04, and 01:39 reports.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Indeed official pages describe Career Scout as an AI-powered career coach for job search, resume tailoring, interview practice, personalized guidance, and My Jobs tracking.
- Dex inference: Dex Company should classify Career Scout as `platform-native AI career coach` and `human-review resume tailoring`, not a default auto-submit tool.
- not checked: live mobile app behavior, actual data settings, region gating, and account eligibility.

## Ethan이 바로 쓸 수 있는 예시

Career Ops에서 Indeed나 유사 플랫폼 AI를 검토할 때 아래 필드를 붙이면 됩니다.

```yaml
platform_ai_career_coach:
  platform_native: checked | not_checked
  auto_submit_claim: absent | present | not_checked
  human_review_required: yes | no | not_checked
  profile_data_used: checked | not_checked
  activity_data_used: checked | not_checked
  chat_context_used: checked | not_checked
  generated_resume_reviewed: checked | not_checked
  resume_overwrite_risk: checked | not_checked
  tracking_scope: saved_jobs | applied_jobs | interviews | not_checked
  mobile_or_desktop_availability: mobile_only | desktop | both | not_checked
```

## Improvement Delta

- 개선 전: Career Ops 자동화 후보가 `native-human-review-assistant`, `auto-fill`, `resume-tailoring`, `tracking-only`로만 크게 나뉘었습니다.
- 개선 후: platform-native AI career coach에서 profile/activity/chat data use와 resume overwrite risk를 별도 확인 항목으로 분리했습니다.
- 운영 규칙 변경: Indeed류 플랫폼 도구는 실제 계정/UI를 보기 전까지 자동 지원이나 제출 가능 도구로 부르지 않습니다.

## Adoption Check

- 이전 action item: 새 source를 저장하기 전 `operational_scope.diff`가 있는지 확인한다.
- 채택 여부: done.
- 반영 방식: Indeed Career Scout가 Career Ops 체크리스트에 없던 profile/activity/chat data use와 resume overwrite risk를 추가하므로 source note와 checklist update로 제한 반영했습니다.

## Previous Deferred / Carried Rejudgment

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | account, plan, org policy, local runtime still not checked |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, generated diff, test output, rollback still missing |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | existing coverage sufficient; account/file context missing |
| Threads Obsidian+Codex signal | deferred/discovery-only | deferred/discovery-only | primary source confirmation still weak |
| Indeed / career platform AI assistant | carried-human-review lane | done/adopted-narrow-field | concrete data-use and resume-overwrite checklist fields added |

## Next Eval

1. Run preflight first.
2. Only store a new source if it changes a checklist field, approval field, QA field, or acceptance test.
3. If career automation appears again, classify by `platform-native career coach`, `native human-review assistant`, `third-party auto-submit`, `autofill-only`, `resume-tailoring`, and `tracking-only`.
4. Do not call an Indeed/LinkedIn-style AI tool usable until account, UI, region, data settings, and resume/application save behavior are checked.

## Prompt Or Template Patch Candidate

```text
For Career Ops platform AI tools, do not collapse "AI job search assistant" into auto-apply. Split evidence by platform-native status, auto-submit claim, human review, profile/activity/chat data use, generated resume review, resume overwrite risk, tracking scope, and mobile/desktop availability. If account/UI behavior is not checked, keep the tool as knowledge-only or account-specific candidate.
```

## Failure Pattern / Risk

- 반복 위험: platform-native AI career tools can look like auto-apply products in search snippets, but official pages may describe coaching, tailoring, tracking, or mock interviews instead.
- 이번 처리: Indeed Career Scout was not treated as an auto-submit tool. It was stored only as a Career Ops classification and data-use checklist source.
- 운영 위험: official product performance metrics are vendor-reported and should not be generalized to Ethan's account or Korean job-search context.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-020226.md` |
| internet search | PASS | public official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki grep, queue direct count |
| source/wiki storage basis | PASS | concrete Career Ops data-use and resume-overwrite fields added |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package, account, billing, token change |
| source-backed / Dex inference / not checked split | PASS | Evidence Table and separate section |
| status | PASS | post-run `llm-wiki-status.ps1` passed |
| lint | PASS | post-run `llm-wiki-lint.ps1` 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 179, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed Korean Markdown files checked |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are account/UI/data-setting gaps and vendor-reported metrics |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit checks passed; no unauthorized installs or account/cloud changes were made; source note includes v5 metadata and `## Original Content`.
- Highest risk: Indeed product claims and performance metrics are vendor-sourced and were not verified against Ethan's account or actual application flow.
- Not checked: live Indeed app, resume overwrite behavior, region availability, account privacy settings.
- Rework needed: none.

## Original Content

이 보고서는 2026-07-09 02:05 KST Growth Scan 공개 검색 결과, preflight PASS 결과, Indeed Career Scout 확인 범위, 기존 LLM Wiki 중복 확인, Career Ops checklist 변경, status/lint/audit 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
