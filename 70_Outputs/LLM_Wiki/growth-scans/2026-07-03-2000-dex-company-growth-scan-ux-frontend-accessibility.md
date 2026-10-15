---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan UX Frontend Accessibility - 2026-07-03 20:00 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T20:00:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
claimType: historical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - automation
---

# Dex Company Growth Scan UX Frontend Accessibility - 2026-07-03 20:00 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 20:00 KST
- 검색 범위: OpenAI Codex customization, NN/g AI-assisted UX research, Maze 2026 user research report, Storybook 9, Next.js GitHub releases, Material Design tokens, GOV.UK accessibility, Carbon accessibility, 직전 2개 growth scan report, 10x candidate queue.
- 실행 초점: 직전 19:34 run의 UX research lane carried item을 재판정하고, GitLab Storybook accessibility duplicate를 정리하며, frontend/design system 자료를 WCAG 연결 기준으로 보강한다.
- 제외: X는 제외했다. Threads는 이번 실행에서 별도 접근하지 못해 not checked로 남겼다. package, MCP server, plugin, skill, browser extension은 설치하지 않았다.
- 저작권 처리: 원문 전체 복사 없이 URL, 메타데이터, 짧은 요약, 확인 범위, Dex Company 적용 예시만 저장했다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 18 |
| stored.count | 8 |
| duplicate.count | 4 |
| deferred.count | 6 |
| blocked.count | 0 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Codex customization은 project guidance, skills, MCP, subagents를 하나의 긴 prompt가 아니라 분리된 customization layer로 봐야 한다는 공식 근거를 제공한다.
2. NN/g와 Maze는 모두 AI-assisted UX research에서 반복 업무는 가속되지만 인간의 질문 framing, 맥락 해석, 최종 판단이 핵심이라는 방향으로 만난다. 단, Maze는 vendor report라 bias caveat가 필요하다.
3. Storybook 9와 GitLab/Storybook accessibility 자료를 함께 보면 frontend QA는 screenshot pass보다 state별 story, interaction, accessibility, visual test evidence가 더 강하다.
4. Next.js는 blog와 GitHub releases 표면을 같이 봐야 한다. canary/pre-release를 실무 기본값으로 쓰지 않고 currentness/security drift 확인용으로 분리해야 한다.
5. GOV.UK와 Carbon은 design system adoption이 accessibility completion이 아니라는 점을 강화한다. WCAG 2.2 QA는 component, page flow, content, keyboard/focus, errors를 따로 봐야 한다.

## Stored / Absorbed Sources

- `2026-07-03-openai-codex-customization.md`
- `2026-07-03-nngroup-accelerating-research-with-ai.md`
- `2026-07-03-maze-future-user-research-2026.md`
- `2026-07-03-storybook-9-component-testing.md`
- `2026-07-03-nextjs-github-releases.md`
- `2026-07-03-material-design-tokens.md`
- `2026-07-03-govuk-design-system-accessibility.md`
- `2026-07-03-carbon-design-system-accessibility.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 8 source notes |
| Inbox queue | Reclassified 8 stored items, 3 duplicate-in-queue items, and 1 duplicate-source item |
| Index | Added 8 source links and this report link |
| Log | Added 20:00 scheduled growth scan entry |
| Automation memory | Updated after final QA |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| Codex customization layers | knowledge-only | No | Official docs inform operating model, but no local config change was made. |
| Storybook 9 / Vitest / Playwright stack | conditional | No | Requires project-specific framework, package audit, lockfile diff, browser QA, and accessibility test plan. |
| Next.js upgrade path | conditional | No | Requires project dependency audit, release/security review, build/test evidence, and rollback plan. |
| Material/Carbon design system packages | conditional | No | Useful design references; actual package or Figma kit adoption needs license, dependency, and accessibility verification. |

## Duplicate / Rejected / Deferred

- duplicate-source: GitLab Storybook accessibility tests item 88 was reclassified because item 54 and an existing source note already cover it.
- duplicate-in-queue: Maze duplicate item 91, NN/g duplicate item 92, Next.js duplicate item 86.
- deferred: Material Design general home, GOV.UK general home, Storybook Next.js with Vite, Vitest 4.1 release, Vite releases, Design Tokens press kit.
- rejected: none permanently.

## Failure / Blocked / Not Checked

- Threads was not checked in this run.
- Maze full report PDF, raw dataset, full methodology, and download-gated content were not checked; confidence remains medium.
- Next.js specific project dependency status was not checked.
- Storybook 9, Carbon packages, Material packages, MCP, plugin, and skill installs were not run.
- Material Design token page exposed limited extractable text through the browser tool; source is official, but note confidence is based on official page metadata and search/open verification, not a full text extract.

## Cross Verification

- Codex customization was cross-checked against existing OpenAI Codex prompting, agent skills, MCP, automations, and subagents source notes.
- NN/g AI research boundaries were cross-checked against Maze 2026 public report claims and existing NN/g context/reporting source notes.
- Storybook 9 was cross-checked against existing Storybook Vitest, Storybook accessibility, GitLab Storybook accessibility, and WCAG 2.2 source notes.
- Next.js GitHub releases were cross-checked against Next.js blog search results and existing React/Playwright frontend source notes.
- GOV.UK and Carbon accessibility were cross-checked against existing WCAG 2.2 and GitLab accessibility QA source notes.

## Ethan Can Use This Immediately

- UX research에서 AI를 쓸 때는 "AI가 정리했다"를 결론으로 쓰지 말고, "AI가 초안을 만들었고 Dex가 원문/맥락/한계를 확인했다"로 기록하시면 됩니다.
- frontend QA를 맡길 때는 "화면 확인" 대신 "상태별 story, keyboard/focus, accessibility 자동/수동 검사, visual regression 가능성"을 요구하시면 됩니다.
- 디자인 시스템을 적용했다고 접근성이 끝났다고 보지 말고, GOV.UK/Carbon 기준처럼 service-level QA를 별도로 요구하시면 됩니다.
- Next.js 같은 framework는 stable blog와 GitHub releases/security surface를 같이 보게 하면 최신성 판단이 더 정확해집니다.

## Improvement Delta

- 직전 carried item인 UX research lane을 NN/g source-backed note와 Maze vendor-bias note로 분리해 처리했다.
- 직전 19:48 검증에서 발견된 GitLab Storybook accessibility duplicate queue item을 `duplicate-source`로 정리했다.
- frontend/design system source note마다 WCAG 또는 "WCAG가 직접 적용되지 않는 이유"를 명시해 보고서 QA 기준을 더 안정화했다.
- Codex customization 공식 문서를 추가해 AGENTS.md, skills, MCP, subagents를 분리 관리하는 Dex Company 운영 근거가 강화됐다.

## Adoption Check

- done: "UX research lane에서 NN/g 또는 Maze 후보 최소 1개를 source-backed, bias note, not checked로 재판정" 기준을 충족했다.
- done: 직전 검증에서 발견된 GitLab Storybook accessibility queue duplicate를 `duplicate-source`로 처리했다.
- done: installable 후보는 모두 install하지 않고 conditional/knowledge-only로 분류했다.
- done: queue status를 재계산해 `eligible-next=33`, `stored-source=23`, `duplicate-source=23`, `duplicate-in-queue=4`, `not-checked=8`, `install-audit-next=3`, `audit-done=1`로 확인했다.
- carried: Threads 공개 SNS 확인은 접근/시간 제약으로 이번 실행에서 수행하지 못했다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| NN/g Accelerating Research with AI | carried | done | source note created with source-backed / Dex inference / not checked split |
| Maze 2026 report | carried | done | source note created with vendor bias and methodology caveat |
| GitLab Storybook accessibility item 88 | duplicate suspected | done | queue status changed to duplicate-source |
| Vendor comparison sources | deferred | carried | Great Question, Dovetail, LangChain, Langfuse remain not-checked due vendor bias/provenance limits |

## Next Eval

다음 실행은 아래 기준을 통과해야 한다.

1. Design systems lane에서 GOV.UK general home, Carbon general home, Material general home 중 이미 accessibility/token note로 충분히 덮인 항목을 duplicate 또는 carried로 재판정한다.
2. `eligible-next=33`에서 최소 5개를 stored-source, duplicate, carried, dropped 중 하나로 줄인다.
3. Threads는 접근 가능하면 1회 확인하고, 로그인/차단/rate-limit이면 not checked 사유를 명확히 남긴다.
4. 새 source note를 만들기 전 이번 8개 및 직전 12개와 중복되지 않는지 먼저 확인한다.

## Prompt or Template Patch Candidate

```text
For UX research sources in Growth Scan, classify each item as source-backed practice, vendor trend signal, or not-checked discovery. Vendor reports may be stored only with a Bias Check and a method/data gap note.

For frontend/design-system sources, every stored note must include either a WCAG 2.2 QA mapping or a clear explanation of why WCAG does not directly apply to that source.

Before promoting queue duplicates, reclassify duplicate-in-queue and duplicate-source items first; do not count duplicates as new discoveries.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Recent reports checked | passed | 19:21 and 19:34 reports inspected |
| Improvement model checked | passed | `LLM Wiki Growth Scan Report Improvement Model` read |
| Public web search | passed | OpenAI, NN/g, Maze, Storybook, GitHub, Material, GOV.UK, Carbon checked |
| Duplicate check | passed | `rg` over LLM Wiki and inbox before writing |
| Source schema | passed | fallback schema check for 8 source notes returned `SCHEMA_WARNING_COUNT=0` |
| Status script | passed | `llm-wiki-status.ps1` passed; source notes count is 73 |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | New/modified Korean Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install commands run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Maze is a vendor report and Material page text extraction was limited.
- Mitigation: Maze was stored with a bias/methodology caveat; Material was stored as official-docs with a not-checked limitation; status/lint/schema/UTF-8 checks passed.
- Not checked: Threads, actual package installs, project-specific Next.js/Storybook runtime tests, Maze full report PDF/raw methodology.
