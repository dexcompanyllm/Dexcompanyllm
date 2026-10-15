# ROLE_TOOL_SKILL_MATRIX

이 문서는 덱스 컴퍼니의 역할, 도구, 목적, 실행 모드, skill 후보를 연결하는 표입니다.

작업이 특정 도구나 산출물과 관련되면 `ROLE_SKILL_ROUTING.md`보다 이 문서를 먼저 봅니다.

## Operating Rule

1. 현재 역할을 파악합니다.
2. 관련 tool surface를 파악합니다.
3. tool purpose에 맞춰 execution mode를 고릅니다.
4. 필요한 최소 Dex/Codex local skill sequence를 고릅니다.
5. 외부 추가 skill은 `ROLE_SKILL_INSTALL_AUDIT.md`에서 installed로 표시된 경우에만 사용합니다.
6. 선택한 role, tool surface, execution mode, skills를 `CURRENT.md`에 기록합니다.
7. 코드, 디버그, 디자인 작업은 `DEX_QUALITY_LEARNING_RULES.md`를 적용합니다. 테스트 증거, scope lock, image prompt 필요 여부를 확인합니다.

## Execution Modes

| Level | 의미 |
|---|---|
| Direct | local Codex skills로 바로 진행 |
| Specialist | 역할별 skill sequence를 먼저 선택 |
| Artifact | HTML, DOCX, PPTX, sheet, image, PDF 같은 실제 파일 산출물 생성 |
| Verification | runtime check, test, review evidence, source verification 우선 |

## External Candidate Policy

- 외부 repository는 setup research에서 후보로 확인된 것입니다.
- bulk install하지 않습니다.
- 설치 전 `SKILL.md`, scripts, package files, hooks, permission을 확인합니다.
- local Codex skills가 충분하면 local을 우선합니다.
- 설치한 외부 skill은 되돌릴 수 있게 backup을 남깁니다.
- 설치 후 `ROLE_SKILL_INSTALL_AUDIT.md`를 갱신합니다.

## Role Matrix

| Role | 주 용도 | Tool Surface | Execution Mode | 기본 Local Skills | 주요 산출물 | 검증 기준 |
|---|---|---|---|---|---|---|
| PM | 제품 방향, 우선순위, stakeholder decision | Excel, Sheets, Docs, Slides | Specialist / Artifact | `idea-refine`, `prd-development`, `prioritization-advisor`, `roadmap-planning`, `spreadsheets:Spreadsheets`, `presentations:Presentations` | PRD, roadmap, KPI, priority table, proposal deck | decision rationale와 assumption 명시 |
| PL | 실행 계획, 일정, dependency, risk | GitHub Projects, Sheets, Docs | Specialist / Artifact | `planning-with-files`, `planning-and-task-breakdown`, `epic-breakdown-advisor`, `incremental-implementation`, `github:github` | WBS, task board, risk matrix, handoff | 각 task에 acceptance criteria와 verification 존재 |
| Planner | 요구사항, 정책, 화면 흐름 | Docs, Obsidian, Figma, PPT, Sheets | Specialist / Artifact | `design-brief`, `create-screen-spec`, `prd-development`, `problem-statement`, `user-story`, `user-story-mapping`, `customer-journey-map` | SCREEN_SPEC, SPEC, SCREEN_FLOW, policy table, case matrix | 요구사항 추적성, empty/loading/error/permission state, responsive, accessibility, edge case 포함 |
| Designer | UX/UI, design system, visual direction | Figma, FigJam, Canva, image tools | Specialist / Artifact | `frontend-design`, `design-review`, `critique`, `figma:figma-use`, `imagegen`, `branding` | UI review, design direction, visual assets, image prompt when needed | visual hierarchy, accessibility, responsive behavior, anti-AI-slop, image prompt quality 확인 |
| Publisher | HTML/CSS/JS, responsive UI | Browser, DevTools, code editor | Direct / Verification | `frontend-ui-engineering`, `web-design-guidelines`, `ui-skills`, `playwright`, `browser-testing-with-devtools` | working HTML UI, browser evidence | screenshot, interaction, mobile layout 확인 |
| Developer | feature, API, DB, refactor, test | IDE, Terminal, GitHub, DB tools | Direct / Verification | `context-engineering`, `incremental-implementation`, `test-driven-development`, `debugging-and-error-recovery`, `api-and-interface-design`, `documentation-and-adrs` | working code, tests, API/schema notes | targeted test/regression guard, build pass 또는 failure documented, unrelated diff 없음 |
| QA Tester | manual/automated QA, defect report | Browser, Playwright, Sheets, GitHub Issues | Verification / Artifact | `code-review-and-quality`, `playwright`, `browser-testing-with-devtools`, `spreadsheets:Spreadsheets` | QA report, test case matrix, defect list | expected/actual, severity, evidence link |
| Vibe Coding | 빠른 prototype/MVP | Codex, Browser, HTML/CSS/JS, mock data | Direct | `web-prototype`, `frontend-ui-engineering`, `playwright`, `idea-refine` | single-entry prototype, mock data, QA notes | core flow가 browser에서 동작 |
| Job Seeker | 공고 탐색, 이력서, 포트폴리오 | job portals, Docs, PDF, PPT, Sheets | Specialist / Artifact | `career-ops`, `documents:documents`, `pdf:pdf`, `presentations:Presentations`, `codex-ppt` | fit table, resume, self-introduction, portfolio deck | Korean text, factual claims, platform fields 확인 |
| Knowledge Manager | LLM Wiki ingest/query/verify/audit | Obsidian, Markdown, web sources, local files | Specialist / Verification | `llm-wiki`, `source-driven-development`, `documentation-and-adrs`, `doubt-driven-development` | source note, wiki note, query note, lint/audit report | source-backed, Dex inference, not checked 분리 |

## Default Role Sequences

### New Service

1. PM
2. Planner
3. Designer
4. PL
5. Publisher 또는 Developer
6. QA Tester
7. PL

### Small Code Change

1. Developer
2. QA Tester
3. PL

### Vibe Coding Prototype

1. Vibe Coding
2. Publisher
3. QA Tester
4. PM, 방향 판단이 필요할 때만

### Job Application And Portfolio

1. Job Seeker
2. Korean narrative drafting, document generation, verification
3. PPT/Slides/Canva/PDF가 필요하면 portfolio pass

### LLM Wiki Knowledge Work

1. Knowledge Manager
2. raw source를 `30_Knowledge/LLM_Wiki/sources/`에 보존
3. reusable wiki note를 `30_Knowledge/LLM_Wiki/wiki/`에 정리
4. `explored: false`와 v5 verification fields 추가
5. verify/audit/lint 실행 후 `index.md`, `log.md` 갱신

## Tool Notes

- Slack/Teams: local connector가 없으면 export, pasted thread, meeting notes를 사용합니다.
- Figma: Figma file/link 또는 connector context가 있을 때만 Figma skills를 사용합니다.
- Google Docs/Sheets/Slides: Google Drive 파일이면 Google Drive connector skills를 우선합니다.
- Excel/Word/PPT local files: `spreadsheets:Spreadsheets`, `documents:documents`, `presentations:Presentations`를 우선합니다.
- Browser tasks: source-only confidence보다 Playwright/in-app browser verification을 우선합니다.
- LLM Wiki tasks: distilled knowledge를 쓰기 전에 raw source를 보존합니다.
- External skills: audit 전까지 candidate로만 둡니다.

## Current External Candidates

| Candidate | Use Area | Status |
|---|---|---|
| `openai/skills` | official Codex skill catalog | candidate source |
| `addyosmani/agent-skills` | engineering lifecycle | selective additions installed |
| `OthmanAdi/planning-with-files` | PL, handoff state | candidate; local `planning-with-files` exists |
| `deanpeters/Product-Manager-Skills` | PM and planning | selective additions installed |
| `product-on-purpose/pm-skills` | PM and planning | pending audit |
| `mohitagw15856/pm-claude-skills` | product operations | pending audit |
| `ningzimu/codex-ppt-skill` | PPT workflow | installed as `codex-ppt` |
| `lackeyjb/playwright-skill` | Browser QA | pending audit |
| `fugazi/test-automation-skills-agents` | QA automation | pending audit |
| `santifer/career-ops` | job seeker workflows | installed and repaired |
| `Paramchoudhary/ResumeSkills` | resume extraction | pending audit |
| `joepUI/motion-ref-skill` | motion reference | pending audit |
| `johnfkoo951/cmds-llm-wiki` | LLM Wiki reference | reference only; absorbed locally |
