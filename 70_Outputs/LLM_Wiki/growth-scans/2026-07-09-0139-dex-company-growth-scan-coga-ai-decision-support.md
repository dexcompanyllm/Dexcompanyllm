---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 01:39 KST"
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
  - "https://developers.openai.com/codex/remote-connections"
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://github.blog/changelog/2026-07-01-browser-tools-for-github-copilot-in-vs-code-are-generally-available/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://www.nngroup.com/articles/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.w3.org/TR/coga-research-modules/"
  - "https://www.w3.org/TR/2026/DNOTE-coga-voice-20260205/"
  - "https://www.w3.org/TR/coga-safety/"
  - "https://www.w3.org/TR/coga-sdm/"
  - "https://obsidian.md/changelog/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://www.threads.com/"
collectionPurpose: "30분 Growth Scan에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, W3C COGA 연구 모듈을 AI 대화/의사결정 지원 QA 필드로 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - cognitive-accessibility
  - ai-agents
  - frontend-qa
---

# Dex Company Growth Scan - 2026-07-09 01:39 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 01:32-01:39 KST
- 실행 모드: 30분 fast discovery / candidate detection after Playwright QA adoption.
- 검색 범위: OpenAI Codex/Remote, GitHub Copilot app/browser tools/billing, Storybook, Figma Agent, NN/g, W3C WAI/COGA, Obsidian changelog, Threads public search.
- 변경 범위: W3C COGA source note 1개, `PPT Frontend Visual Communication Checklist`, LLM Wiki `index.md`, `log.md`, 이 보고서.
- 금지 준수: package, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable install은 수행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 16 | 공개 URL/search surface 기준 |
| stored.count | 1 | W3C COGA source note 1개 |
| duplicate.count | 12 | OpenAI Remote/DigitalOcean, GitHub browser tools/app/billing, Figma, NN/g design specs, Obsidian, Storybook, Threads 대부분 기존 coverage와 중복 |
| deferred.count | 4 | GitHub Copilot app, Storybook agentic setup, Figma Agent, Threads primary confirmation |
| blocked.count | 0 | preflight FAIL, 접근 차단으로 중단된 항목 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` 0 warning |

## Preflight

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-013227.md`
- free RAM: 1.49GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Codex Remote/DigitalOcean plugin 신호는 현재도 중요하지만 이미 `2026-07-03-openai-codex-remote-connections-digitalocean-plugin.md`로 저장되어 있어 중복으로 처리했습니다.
2. GitHub Copilot browser tools와 Copilot app 신호도 기존 source notes와 최근 no-new-signal 보고서에 흡수되어 있어, 계정/조직/runtime evidence 없이 새 adoption으로 올리지 않았습니다.
3. W3C Cognitive Accessibility Research Modules는 기존 COGA complex-information note와 겹치지만, AI assistant, voice UI, online safety, algorithmic privacy, supported decision-making을 별도 QA field로 분리할 수 있어 저장 가치가 있었습니다.
4. Threads는 이번에도 후보 발굴 신호만 있었고, source-backed 승격에 필요한 primary confirmation이 부족했습니다.

## Stored / Absorbed

- Source note added: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-09-w3c-coga-research-modules-ai-conversation-safety.md`
- Wiki guide updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\PPT Frontend Visual Communication Checklist.md`
- Index updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- Log updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- Report saved: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0139-dex-company-growth-scan-coga-ai-decision-support.md`

## LLM Wiki Change History

- Added W3C COGA research module source as medium-confidence, partial verification, multi-source-primary evidence.
- Added `AI conversation / decision support QA` evidence row to the PPT/frontend checklist.
- Added index link and operating rule for AI assistant, chatbot, voice UI, recommendation, and decision-support flow QA.
- Appended log entry for this Growth Scan.
- Candidate queue was not edited because direct count remains closed: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Claim Split |
|---|---|---|---|---|---|
| W3C Cognitive Accessibility Research Modules | W3C WAI | official draft note set | stored-source + checklist-adopted | medium-high for scope, medium for operations | source-backed: module scope/status. Dex inference: QA fields. not checked: live UI tests |
| OpenAI Codex Remote / DigitalOcean plugin | OpenAI | official docs/changelog | duplicate-source | high | existing source already covers host boundary, QR pairing, cloud/SSH risk |
| GitHub Copilot browser tools | GitHub | official changelog | duplicate-source | high | existing source covers isolated tabs, permission, domain controls |
| GitHub Copilot app | GitHub | official changelog | carried/account-adjacent | high | account/plan/org/runtime not checked |
| Figma Agent skills/custom tools | Figma | official vendor blog | duplicate/account-adjacent | medium | workspace/file/connector/billing not checked |
| Storybook 10.4 / agentic setup | Storybook | official blog/docs | deferred/project-specific | medium | target repo/generated config/test command not checked |
| Threads LLM Wiki / Obsidian signals | Threads public search | SNS discovery | deferred/discovery-only | low | source-backed primary confirmation missing |

## Installation Or Due-Diligence Candidates

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| W3C COGA research modules | knowledge-only | No | overreliance if treated as conformance proof |
| DigitalOcean Codex plugin | due-diligence-candidate only | No | cloud cost, SSH key, repository access, region/data boundary |
| GitHub Copilot app/browser tools | account-adjacent / project-specific | No | account policy, billing, tool permissions, browser data scope |
| Figma Agent custom tools/skills | approval-not-ready/account-adjacent | No | workspace permission, sensitive design context, connector scope, billing |
| Storybook agentic setup | project-specific conditional | No | dependency/config mutation, test flake, rollback |

## Duplicate Exclusions

- OpenAI Codex Remote and DigitalOcean plugin: existing source note already covers current operational boundary.
- GitHub Copilot browser tools: existing source note already covers isolated tabs, explicit page sharing, permissions, and network domain controls.
- GitHub Copilot app/billing: carried/account-adjacent; no Ethan account/org evidence.
- Figma Agent skills/custom tools: duplicate/account-adjacent; no file/workspace evidence.
- NN/g Design Specs: done/adopted in the 22:34 run.
- Playwright release notes: done/adopted in the 01:04 run.
- Obsidian changelog: no new operating field beyond existing notes.
- Threads: discovery-only due to weak primary extraction.

## Failed / Blocked / Not Checked

- Failed: none.
- Blocked: none.
- Not checked: live chatbot/voice UI, speech recognition, screen reader behavior, target frontend repo, Ethan GitHub/Figma accounts, Storybook generated config, Threads primary pages, any DigitalOcean cloud provisioning, any package install.
- Confidence caveat: W3C COGA modules are Group Note Drafts, not final W3C Recommendations or WCAG conformance proof.

## Cross Verification

- W3C overview was cross-checked with W3C WAI announcement and three individual module pages: Voice Systems and Conversational Interfaces, Online Safety and Wellbeing, and Supported Decision-Making Online.
- W3C COGA adoption was cross-checked against existing `2026-07-04-w3c-coga-alternative-content-complex-info.md` to ensure this was a narrower AI conversation / online decision-support addition rather than a duplicate.
- OpenAI Remote/DigitalOcean was cross-checked against the existing source note and current OpenAI Codex changelog/Remote Connections docs.
- GitHub browser tools were cross-checked against the existing local source note and GitHub changelog.

## Source-Backed / Dex Inference / Not Checked

- source-backed: W3C published COGA research modules on 2026-02-05 and identifies modules for conversational interfaces, online safety, and supported decision-making.
- Dex inference: Dex Company QA should add separate evidence fields for AI assistant, chatbot, voice UI, recommendation, and decision-support flows.
- not checked: no live product UI, accessibility tree, speech interface, or real user test was executed.

## Ethan이 바로 쓸 수 있는 예시

AI 챗봇이나 자동 추천 UI를 만들 때 아래 필드를 QA_REPORT에 넣으시면 됩니다.

```yaml
ai_conversation_decision_support:
  human_backup_path: checked | not_checked | not_applicable
  memory_load_reduction: checked | not_checked
  timeout_flexibility: checked | not_checked
  plain_language_response: checked | not_checked
  speech_or_text_alternative: checked | not_checked | not_applicable
  error_recovery_loop: checked | not_checked
  algorithmic_risk_notice: checked | not_checked
  privacy_data_use_clarity: checked | not_checked
  user_final_control: checked | not_checked
  supported_decision_level: none | view_only_helper | confirmation_required | delegated_limited | not_checked
```

## Improvement Delta

- 개선 전: COGA는 주로 complex information / cognitive support 체크리스트로만 쓰였습니다.
- 개선 후: AI conversation, voice UI, algorithmic safety, privacy/data clarity, supported decision-making을 별도 QA evidence field로 분리했습니다.
- 운영 규칙 변경: AI/agent UI를 평가할 때 "접근성 있음"이라고 말하기 전에 user final control, human backup, recovery, timeout, privacy clarity를 확인해야 합니다.

## Adoption Check

- 이전 action item: 새 source를 저장하기 전 `operational_scope.diff`가 있는지 확인한다.
- 채택 여부: done.
- 반영 방식: W3C COGA 모듈이 기존 checklist에 없던 AI 대화/의사결정 지원 필드를 만들었으므로 source note와 checklist update로 제한 반영했습니다.

## Previous Deferred / Carried Rejudgment

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | account, plan, org policy, local runtime still not checked |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, generated diff, test output, rollback still missing |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | existing coverage sufficient; account/file context missing |
| Threads Obsidian+Codex signal | deferred/discovery-only | deferred/discovery-only | primary source confirmation still weak |
| W3C cognitive accessibility for AI flows | not previously classified | done/adopted-narrow-field | concrete AI conversation / supported-decision QA fields added |

## Next Eval

1. Run preflight first.
2. Only store a new source if it changes a checklist field, approval field, QA field, or acceptance test.
3. If AI/agent UI appears again, require target artifact plus at least one concrete field: human backup, user final control, privacy/data-use clarity, error recovery, or timeout flexibility.
4. Keep GitHub/Figma/Storybook account-adjacent candidates out of adoption until account/repo/runtime evidence exists.

## Prompt Or Template Patch Candidate

```text
For AI assistant, chatbot, voice UI, recommendation, or decision-support flows, do not treat "AI UX checked" as one field. Split evidence by human backup path, memory-load reduction, timeout flexibility, plain-language response, speech/text alternative, error recovery, algorithmic risk notice, privacy/data-use clarity, final user control, and supported-decision level. Treat W3C COGA research modules as guidance inputs, not WCAG conformance proof.
```

## Failure Pattern / Risk

- 반복 위험: draft research guidance를 final accessibility conformance처럼 과장하는 것.
- 이번 처리: confidence를 medium으로 두고, `not checked`에 live UI/test gaps를 명확히 남겼습니다.
- 운영 위험: free RAM은 1.49GB로 통과했지만 여전히 여유가 크지 않습니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-013227.md` |
| internet search | PASS | public official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki grep, queue direct count |
| source/wiki storage basis | PASS | concrete AI conversation / decision-support QA fields added |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package, account, billing, token change |
| source-backed / Dex inference / not checked split | PASS | Evidence Table and separate section |
| status | PASS | source notes 163, wiki notes 7 |
| lint | PASS | 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 178, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed Korean Markdown files checked after write |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are draft guidance, no live UI test, and unexplored backlog |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit checks passed; no unauthorized installs or account/cloud changes were made; source note includes v5 metadata and `## Original Content`.
- Highest risk: W3C COGA documents are early draft research modules, so they must not be used as conformance proof.
- Not checked: live chatbot/voice UI, speech recognition, screen reader, target repo, account contexts, Threads primary source reliability.
- Rework needed: none.

## Original Content

이 보고서는 2026-07-09 01:39 KST Growth Scan 공개 검색 결과, preflight PASS 결과, W3C Cognitive Accessibility Research Modules 확인 범위, 기존 LLM Wiki 중복 확인, PPT/frontend checklist 변경, status/lint/audit 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
