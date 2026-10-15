---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Design PPT Frontend Focus - 2026-07-04 15:03 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T15:03:27+09:00
runMode: manual-temporary-focus
operator: Dex
sourceKind: automation-report
source:
  - "https://www.w3.org/WAI/teach-advocate/accessible-presentations/"
  - "https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities"
  - "https://sli.dev/"
  - "https://revealjs.com/"
  - "https://www.nngroup.com/articles/visual-hierarchy-ux-definition/"
  - "https://carbondesignsystem.com/data-visualization/dashboards/"
  - "https://storybook.js.org/blog/4-ways-to-document-your-design-system-with-storybook/"
collectionPurpose: "자정 전 임시 design/UX/UI/GUI/PPT/frontend 집중 모드를 시작하고, PPT와 frontend 성장에 직접 도움이 되는 자료를 LLM Wiki에 흡수한다."
confidence: high
claimType: historical
evidenceScope: web-search-and-local-vault-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/report
  - growth-scan
  - dex-company
  - ppt
  - frontend
  - design
  - ux
---

# Dex Company Growth Scan Design PPT Frontend Focus - 2026-07-04 15:03 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 15:03 KST
- 임시 집중 모드: 적용 중. 2026-07-05 00:00 KST 전까지 design, UX, UI, GUI, PPT, frontend, visual communication 중심으로 검색한다.
- 검색 범위: W3C WAI accessible presentations, Microsoft PowerPoint accessibility, Slidev, reveal.js, NN/g visual hierarchy, Carbon dashboard guidance, Storybook design-system documentation.
- 제외/제한: npm install, package install, MCP server, connector, browser extension, GitHub workflow, account/billing/token 작업은 실행하지 않았다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 7 |
| stored.count | 6 |
| duplicate.count | 2 |
| deferred.count | 2 |
| blocked.count | 0 |
| lint.warning_count | 0 |

## 오늘의 핵심 발견

1. PPT 접근성은 별도 장식이 아니라 발표 품질의 기본 구조다. W3C와 Microsoft 모두 slide title, reading order, alt text, contrast, caption/transcript, 중요한 시각 정보 설명을 강조한다.
2. PPT와 frontend UI는 모두 시각 계층을 설계한다. NN/g visual hierarchy 기준은 slide design과 화면 UI review에 같이 적용할 수 있다.
3. Slidev와 reveal.js는 PPT와 frontend 역량을 연결하는 deck-as-code 후보지만, 설치 없이 knowledge-only로만 흡수했다. 실제 도입은 target repo와 export/hosting/accessibility 조건이 필요하다.
4. Storybook과 Carbon dashboard 자료는 이미 LLM Wiki에 다수 흡수되어 있어 새 source note보다는 기존 frontend QA checklist와 교차 사용하도록 처리했다.

## 저장/흡수한 자료

- [[2026-07-04-w3c-wai-accessible-presentations]]
- [[2026-07-04-microsoft-powerpoint-accessibility]]
- [[2026-07-04-slidev-developer-presentations]]
- [[2026-07-04-revealjs-web-presentations]]
- [[2026-07-04-nngroup-visual-hierarchy-ux]]
- [[PPT Frontend Visual Communication Checklist]]

## LLM Wiki 변경 이력

| Area | Change |
|---|---|
| sources/articles | PPT/frontend visual communication source notes 5개 추가 |
| wiki/guides | `PPT Frontend Visual Communication Checklist` 추가 |
| index.md | 새 guide와 report 링크 추가 |
| log.md | 임시 focus mode와 수동 집중 스캔 기록 추가 |

## 설치 후보 또는 실사 후보

| Candidate | Status | Install? | 이유 |
|---|---|---:|---|
| Slidev | approval-ready-conditional | No | deck-as-code 후보지만 target repo, export, theme, dependency, accessibility QA 필요 |
| reveal.js | approval-ready-conditional | No | web deck 후보지만 hosting/export, browser QA, reduced motion, keyboard navigation 확인 필요 |

## 중복으로 제외한 자료

- Storybook design-system documentation: 기존 Storybook accessibility, Storybook 9, Storybook Vitest, Storybook Next.js/Vite notes가 이미 frontend QA 기준을 다루고 있어 새 source note로 만들지 않았다.
- Carbon dashboard guidance: Carbon accessibility/design-system source가 이미 있고, 이번에는 guide의 dashboard QA 항목으로만 반영했다.

## 실패 / 차단 / 미확인

- 실제 PowerPoint 앱, PowerPoint Accessibility Checker, screen reader, browser deck, Slidev/reveal.js install은 실행하지 않았다.
- Slidev/reveal.js package audit, license dependency tree, export 품질, PDF/PPT 변환 품질은 확인하지 않았다.
- 실제 에던님 PPT 파일이나 frontend repo는 검사하지 않았다.

## 교차 검증 근거

- PPT 접근성: W3C WAI guidance와 Microsoft PowerPoint official support를 함께 확인했다.
- 웹 발표 도구: Slidev official site와 reveal.js official site를 비교했다.
- 시각 계층: NN/g visual hierarchy article을 PPT/frontend 공통 QA 원칙으로 연결했다.
- frontend QA: 기존 Storybook/Carbon/Material source notes와 교차 사용하도록 guide에 연결했다.

## 에던님이 바로 사용할 수 있는 예시

- PPT 제작 요청 시: "슬라이드마다 고유 제목, reading order, alt text, contrast, speaker notes, 핵심 메시지 1문장 기준으로 QA해줘"라고 지시하면 된다.
- frontend UI 제작 요청 시: "첫 시선, primary action, 상태별 UI, keyboard/focus, contrast, responsive hierarchy를 QA_REPORT에 남겨줘"라고 지시하면 된다.
- 웹 발표가 필요할 때: Slidev/reveal.js를 바로 설치하지 말고, 먼저 web deck이 허용되는지, export/hosting/offline playback이 필요한지 확인한다.

## Improvement Delta

- 기존 frontend QA 중심 지식에 PPT/presentation accessibility와 visual hierarchy를 연결했다.
- `PPT Frontend Visual Communication Checklist`를 추가해 PPT와 frontend 작업 전 공통 출발점을 만들었다.
- 임시 focus mode 기간에는 design/UX/UI/GUI/PPT/frontend 자료를 우선 검색하도록 자동화 prompt를 업데이트했다.

## Adoption Check

- done: 에던님 요청에 따라 자정 전까지 focus mode를 automation prompt에 반영했다.
- done: 승인 필요 없는 knowledge-only 자료 5개를 source note로 흡수했다.
- done: 설치 후보인 Slidev/reveal.js는 실행하지 않고 approval-ready-conditional로 분리했다.
- carried: 다음 30분 실행에서 더 최신/고품질 PPT storytelling, deck system, frontend visual QA 자료를 추가로 탐색한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | 이유 |
|---|---|---|---|
| Storybook frontend QA | covered / carried | duplicate | 기존 notes가 충분해 이번에는 guide cross-link만 수행 |
| Carbon dashboard guidance | covered / carried | duplicate-with-use | 새 source note 대신 dashboard QA 항목으로 반영 |
| Web deck tools | not checked | carried / conditional | Slidev/reveal.js 지식 흡수 완료, 설치는 project-specific |

## Next Eval

1. 자정 전 다음 실행에서는 PPT storytelling, slide systems, information design, frontend visual QA 중 기존 LLM Wiki에 약한 자료를 우선 찾는다.
2. 좋은 자료라도 설치나 package 실행이 필요하면 approval-ready packet 없이는 실행하지 않는다.
3. 새 source note를 만들 때는 PPT/frontend 작업에 바로 쓸 체크리스트 항목을 최소 1개 이상 뽑는다.

## Prompt or Template Patch Candidate

```text
For temporary design/PPT/frontend focus runs, require every stored source to produce at least one reusable checklist item for PPT QA, frontend UI QA, visual hierarchy, accessibility, dashboard clarity, or deck-as-code approval boundaries.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Current folder checked | passed | `D:\CodexProjects\codex setup` |
| Automation focus updated | passed | `dex-company-growth-scan` updated via Codex automation tool |
| Public web search | passed | W3C, Microsoft, Slidev, reveal.js, NN/g, Carbon, Storybook checked |
| Duplicate check | passed | existing LLM Wiki and recent reports searched |
| Install control | passed | no package/tool/MCP/connector installed |
| Status script | passed | `llm-wiki-status.ps1` passed; source notes 149, wiki notes 7 |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warnings |
| UTF-8 check | passed | new source notes, guide, report, index, log had no replacement/CJK mojibake |

## Watchdog

- Verdict: PASS
- Highest risk: deck-as-code tools could be mistaken for immediately installable. They are not installed and remain project-specific conditional candidates.
- Not checked: real PPT files, real frontend repo, package audit, browser QA, PowerPoint accessibility checker.
