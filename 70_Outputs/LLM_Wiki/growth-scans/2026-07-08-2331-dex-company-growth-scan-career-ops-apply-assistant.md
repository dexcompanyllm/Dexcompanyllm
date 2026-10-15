---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-08 23:31 KST"
created: 2026-07-08
updated: 2026-07-08
dateCreated: 2026-07-08
dateModified: 2026-07-08
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-08
verifiedBy: Dex
disputed: false
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/deprecations"
  - "https://github.blog/changelog/2026-07-07-add-review-cycles-and-time-to-adoption-phases-in-the-usage-api/"
  - "https://github.blog/changelog/2026-07-07-per-user-budgets-for-cost-centers-in-the-billing-ui/"
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://obsidian.md/changelog/"
  - "https://www.nngroup.com/articles/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.threads.com/"
  - "https://www.linkedin.com/help/linkedin/answer/a11320007"
  - "https://www.linkedin.com/help/linkedin/answer/a1340567"
  - "https://www.linkedin.com/help/linkedin/answer/a1341387"
  - "https://www.indeed.com/legal"
  - "https://www.jobscan.co/blog/auto-apply-job-tools/"
  - "https://www.jobscan.co/auto-apply"
collectionPurpose: "30분 growth scan에서 직전 no-new-signal 이후 최신 공개 자료를 확인하고, career ops 자동지원 후보의 공식 플랫폼 경계가 새 운영 체크리스트 필드를 바꾸는지 평가한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - career-ops
  - automation-policy
---

# Dex Company Growth Scan - 2026-07-08 23:31 KST

## Run Scope and Limits

- 실행 시각: 2026-07-08 23:31-23:49 KST
- 실행 모드: 30분 fast discovery / candidate detection. 직전 23:02 회차의 no-new-signal 기준을 유지하되, 새 source note는 checklist field, approval field, QA field, acceptance test가 실제로 바뀔 때만 저장했다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot app/usage/billing, Storybook 10.3/10.4, Figma Agent/custom tools/skills, Obsidian changelog, NN/g latest, W3C WAI, Threads public search, Jobscan/LinkedIn/Indeed career automation policy.
- 변경 범위: LinkedIn Premium Apply Assistant source note 1개, `Dex Company Task Checklists from Growth Scans`, LLM Wiki `index.md`, `log.md`, 이 report.
- 금지 준수: SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 19 | 공개 후보 URL 기준 |
| stored.count | 1 | LinkedIn 공식 source note 1개 |
| duplicate.count | 13 | OpenAI, GitHub, Storybook, Figma, Obsidian, NN/g design specs, W3C, Jobscan 위험 분류는 기존 coverage와 대부분 중복 |
| deferred.count | 5 | GitHub Copilot app, Storybook agentic setup, Figma Agent, Threads signals, LinkedIn actual account/UI test |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` completed with 0 warning(s) |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-233125.md`
- free RAM: 1.56GB
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS

## 오늘의 핵심 발견

1. LinkedIn Premium Apply Assistant는 공식 Help 기준으로 select Premium members와 supported jobs에 한정되고, draft/prefill을 제공하지만 자동 제출은 하지 않는다. 사용자가 검토, 수정, 승인해야 제출된다.
2. LinkedIn의 별도 자동화 정책은 third-party software, browser extensions, bots, crawlers처럼 scrape/modify/automate activity를 하는 도구를 금지한다. 따라서 native human-review assistant와 third-party auto-submit은 같은 분류로 보면 안 된다.
3. Indeed Terms도 2026-07-07 기준 Agentic AI를 정의하고, Indeed Apply를 포함한 site content submission에 automated systems/bots/scrapers/AI/Agentic AI를 무단 사용하는 것을 금지한다.
4. Jobscan 자료는 human-review copilot과 mass auto-submit 차이를 설명하지만 vendor source다. 이번 저장은 Jobscan이 아니라 LinkedIn/Indeed 공식 정책을 중심으로 했다.
5. OpenAI/GitHub/Storybook/Figma/Obsidian/NN-g/W3C/Threads 신호는 직전 보고서와 중복되거나 account/repo/runtime 맥락이 없어 새 durable note로 저장하지 않았다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| LinkedIn Premium Apply Assistant | LinkedIn | official help | stored-source + checklist-adopted | high for feature boundary, medium for availability | source-backed: select Premium/supported jobs, editable draft, user approval before submit. not checked: Ethan account/UI |
| LinkedIn Automated Activity | LinkedIn | official help/policy | cross-check | high | source-backed: third-party automation/scraping/browser extension automation prohibited. Dex inference: third-party auto-submit stays blocked |
| LinkedIn Prohibited Software and Extensions | LinkedIn | official help/policy | cross-check | high | source-backed: bots, browser plugins, automation, scraping restrictions. not checked: enforcement on Ethan account |
| Indeed Terms of Service | Indeed | official legal terms | cross-check | high | source-backed: Agentic AI definition and automated systems prohibition. Dex inference: Indeed bots stay blocked |
| Jobscan Auto Apply / auto-apply analysis | Jobscan | vendor article/product | duplicate/vendor-context | medium-low | source-backed: vendor says review-before-submit. Dex inference: useful as market signal only, not policy authority |
| GitHub Copilot app/usage/billing | GitHub | official changelog | duplicate-currentness | high | already covered; account/org/billing/runtime not checked |
| Storybook 10.3/10.4 agent setup | Storybook | official docs/blog | deferred/project-specific | medium | target repo, config diff, test command, rollback not checked |
| Figma Agent skills/custom tools | Figma | official vendor blog | duplicate/account-adjacent | medium | workspace/file/connector/billing not checked |
| OpenAI Codex/API currentness | OpenAI | official docs | duplicate-currentness | high | existing Codex/API lanes sufficient for this run |
| W3C/NN-g/Obsidian/Threads | mixed | official/SNS | duplicate or deferred | mixed | no new checklist field beyond existing handoff/accessibility rules |

## Stored / Rejected / Deferred

### Stored

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-08-linkedin-premium-apply-assistant.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md` updated with Career Ops classification fields.
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md` linked the new source and operating rule.
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md` appended the change record.

### Rejected / Duplicate

- OpenAI Codex changelog and OpenAI API deprecations: existing currentness lanes already cover these.
- GitHub Copilot app/usage/billing: existing account-adjacent and cost/metric governance coverage is enough until real account evidence exists.
- Storybook 10.3/10.4: existing Storybook source notes and reports already require target repo, config diff, tests, rollback.
- Figma Agent skills/custom tools: existing Figma source notes already cover account/workspace/connector caveats.
- W3C/NN-g design/accessibility signals: existing PPT/frontend checklist already covers the relevant fields.

### Deferred

- GitHub Copilot app: account/plan/org/local runtime/cost evidence needed.
- Storybook agentic setup: target repo/package manager/generated diff/test output/rollback needed.
- Figma Agent/custom tools: workspace/file/connector/billing/private chat context needed.
- Threads public SNS signals: primary source confirmation needed.
- LinkedIn Premium Apply Assistant actual use: Ethan account, Premium status, supported jobs, local UI, Korean UI copy, and actual permission prompt not checked.

## LLM Wiki 변경 이력

- Source note added: `2026-07-08-linkedin-premium-apply-assistant.md`
- Wiki guide updated: `Dex Company Task Checklists from Growth Scans.md`
- Index updated: `index.md`
- Log updated: `log.md`
- Candidate queue unchanged: `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.
- 설치/connector/MCP/SDK/browser extension/GitHub workflow/account/token/billing 변경: 없음.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| LinkedIn Premium Apply Assistant | knowledge-only / account-check-needed | No | Premium subscription, feature rollout, supported jobs, account policy, personal data, permission prompt |
| Third-party LinkedIn auto-submit bots | blocked / approval-not-ready | No | LinkedIn policy violation, account restriction, personal data disclosure, bulk spam |
| Indeed auto-apply bots | blocked / approval-not-ready | No | Indeed Terms automation prohibition, account/job application risk |
| Jobscan Auto Apply | carried-vendor for human-review pattern only | No | vendor bias, credits/payment, ATS coverage, actual submission flow not checked |

## 중복으로 제외한 자료

- Jobscan auto-apply tools: 20:32, 21:32, 22:01 보고서에서 이미 vendor caveat와 human-review boundary를 다뤘다.
- LinkedIn/Indeed policy는 이전 보고서에서 cross-check로 언급됐지만, 이번에는 LinkedIn Premium Apply Assistant 공식 help가 새 classification field를 만들기 때문에 source note로 저장했다.
- GitHub/Figma/Storybook/OpenAI/Obsidian/W3C/NN-g currentness signals는 직전 22:01/22:34/23:02 보고서와 중복이다.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: Ethan LinkedIn Premium subscription, Premium Apply Assistant rollout eligibility, supported job availability, actual LinkedIn UI, external application permission prompt, Korean UI wording, actual account enforcement.
- 부분 확인: Jobscan claims are vendor-provided and used only as market context, not as source of policy truth.
- 접근 제한: Threads is discovery-only; source-backed note로 승격하지 않았다.

## 교차 검증 근거

- LinkedIn Premium Apply Assistant official help was cross-checked with LinkedIn Automated Activity and Prohibited Software/Extensions official help.
- Indeed Terms cross-checked the broader non-LinkedIn platform risk: unauthorized automated systems, bots, scrapers, AI, or Agentic AI cannot be assumed safe for job application submission.
- Jobscan vendor material was used only to compare market categories and reinforce why independent official platform policy is required.
- Existing LLM Wiki reports and checklist were searched for `auto-submit`, `auto-fill`, `Auto Apply`, `LinkedIn`, and `Premium Apply Assistant` before storing.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: LinkedIn Premium Apply Assistant prepares/prefills drafts and requires approval before submission; LinkedIn third-party automation guidance prohibits scrape/modify/automate activity; Indeed prohibits unauthorized automated systems for site access/data-mining/content submission.
- Dex inference: Dex Company Career Ops should classify tools as `native-human-review-assistant`, `third-party-auto-submit`, `autofill-only`, `resume-tailoring`, and `tracking-only` before considering use.
- Not checked: Ethan account eligibility, live UI, local platform enforcement, actual application outcome, and recruiter-side effects.

## 에던님이 바로 사용할 수 있는 예시

구직 자동화 후보를 보면 먼저 아래처럼 분류하시면 됩니다.

```markdown
automation_category: native-human-review-assistant | third-party-auto-submit | autofill-only | resume-tailoring | tracking-only
official_platform_feature: yes/no
human_review_before_submit: yes/no
editable_draft: yes/no
bulk_submission: yes/no
account_or_subscription_required:
platform_policy_checked:
final_decision: usable | carried | blocked | not checked
```

실무 결론은 단순합니다. LinkedIn 공식 기능처럼 사람이 검토하고 승인하는 네이티브 보조는 계정/UI 확인 후 검토할 수 있지만, 제3자 봇이 대량 제출하는 방식은 기본적으로 blocked입니다.

## Improvement Delta

- 개선된 점: 이전 `auto-submit blocked / human-review autofill carried` 규칙을 더 정밀하게 나눴다.
- 운영 변화: Career Ops 체크리스트에 `native-human-review-assistant`, `third-party-auto-submit`, `autofill-only`, `resume-tailoring`, `tracking-only` 분류를 추가했다.
- 템플릿 변화: career automation 후보는 앞으로 "자동화 여부"가 아니라 platform-native 여부, 사람 검토, 승인 전 제출 없음, 계정/구독 조건을 별도 필드로 확인한다.

## Adoption Check

- 이전 action item: Career automation candidates should be classified as auto-submit, auto-fill, tailoring, or tracking-only.
- 채택 여부: done/expanded.
- 반영 방식: LinkedIn 공식 Help를 근거로 `native-human-review-assistant` category를 추가했고, third-party auto-submit과 구분했다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| Jobscan / career auto-apply | carried-for-human-review-autofill | done/expanded-classification | LinkedIn official source adds native human-review assistant category |
| LinkedIn platform policy | source-backed cross-check | stored-source via Premium Apply Assistant note | official feature boundary now changes Career Ops checklist |
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | account/org/runtime still not checked |
| Storybook 10.4 setup | deferred/project-specific | deferred/project-specific | target repo evidence still missing |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | existing coverage sufficient; account/file context missing |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. preflight를 먼저 실행한다.
2. LinkedIn Premium Apply Assistant를 다시 다룰 경우 Ethan 계정, Premium 상태, supported job UI, permission prompt가 확인되기 전에는 "사용 가능"으로 말하지 않는다.
3. Career Ops 후보는 `native-human-review-assistant`, `third-party-auto-submit`, `autofill-only`, `resume-tailoring`, `tracking-only` 중 하나로 분류하고, third-party auto-submit은 기본 blocked로 둔다.
4. GitHub/Figma/Storybook agent 후보는 target/account/runtime evidence가 없으면 새 source note보다 carried/deferred로 둔다.

## Prompt or Template Patch Candidate

```text
For career-ops automation candidates, classify the candidate before use: native-human-review-assistant, third-party-auto-submit, autofill-only, resume-tailoring, or tracking-only. Treat third-party auto-submit as blocked by default. Treat native platform assistants as account-check-needed until official feature availability, editable draft, user approval before submit, supported job scope, and subscription/account requirements are verified.
```

## Failure Pattern

- 반복 패턴: "auto apply"라는 이름이 네이티브 사람 검토형 보조, autofill, resume tailoring, tracking, third-party bulk-submit을 섞어서 부른다.
- 이번 처리: 이름이 아니라 제출 권한과 사람 승인 여부로 분리했다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-233125.md` |
| internet search | PASS | official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, source/wiki/index/log grep |
| source/wiki 저장 근거 | PASS | new field in Career Ops checklist |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package, account, billing, token change |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table and separate section |
| status | PASS | source notes 162, wiki notes 7, status check completed |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 177, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed Korean Markdown files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are account/UI not checked and unexplored backlog |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit, UTF-8 검사가 통과했고, source note/checklist/index/log/report 변경은 목적 범위 안에 있었다.
- 최고 위험: LinkedIn Premium Apply Assistant를 실제 사용 가능하다고 단정하면 안 된다. 에던님 계정, Premium 상태, supported job UI, permission prompt, 제출 전 승인 흐름은 아직 확인하지 않았다.
- Not checked: LinkedIn live account/UI, external application permission prompt, recruiter-side effect, actual career outcome, Threads primary confirmation.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-08 23:31 KST Growth Scan 공개 검색 결과, preflight PASS 결과, LinkedIn Premium Apply Assistant 공식 도움말, LinkedIn 자동화 금지 도움말, Indeed Terms, Jobscan vendor context, 기존 LLM Wiki 중복 확인, Career Ops checklist 변경을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
