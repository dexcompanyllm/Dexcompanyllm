# ROLE_SKILL_ROUTING

이 문서는 덱스 컴퍼니의 역할 명령 라우터입니다.

작업이 특정 도구나 산출물과 관련되면 먼저 `ROLE_TOOL_SKILL_MATRIX.md`를 보고, 그 다음 이 문서에서 실행 순서를 고릅니다.

## Command Rule

에던님 메시지가 아래 명령 중 하나로 시작하면, 그 명령을 현재 작업의 역할로 봅니다.

실질적인 작업 전에는 가능한 경우 `CURRENT.md`에 다음을 기록합니다.

- command
- role
- tool surface
- execution mode
- selected local skills
- external audit candidates
- assumptions
- next action

모든 skill을 한꺼번에 쓰지 않습니다. 실제 요청을 끝내는 데 필요한 최소 sequence만 선택합니다.

## Automatic Watchdog Rule

실질적인 `/role` 작업 뒤에는 최종 보고 전에 `dex-watchdog`을 실행합니다.

대상 역할:

- `/PM`
- `/PL`
- `/기획자`
- `/디자이너`
- `/퍼블리셔`
- `/개발자`
- `/QA`
- `/바이브코딩`
- `/구직자`
- `/지식관리`

watchdog은 role routing, skill selection, QA evidence, Obsidian 기록, final report 신뢰도를 점검합니다.

빠른 질문이거나 에던님이 명시적으로 생략을 요청한 경우에는 생략할 수 있습니다.

## Quality Learning Rule

실질적인 코드, 디버그, 디자인 작업은 `DEX_QUALITY_LEARNING_RULES.md`를 적용합니다.

- `/개발자`와 `/QA` 작업은 테스트 또는 검증 증거 없이는 완료로 보지 않습니다. 버그 수정은 가능한 경우 reproduction test 또는 재현 절차를 먼저 확보합니다.
- 디버그 중에는 실패 경로와 직접 관련된 파일만 수정합니다. 무관한 리팩터링, copy, 디자인 변경은 follow-up으로 분리합니다.
- `/디자이너`, `/퍼블리셔`, `/바이브코딩`, PPT/브랜드 작업에서 이미지 품질이 중요하면 `imagegen` 결과 또는 구체적인 이미지 제작 프롬프트를 산출물에 포함합니다. 외부 채팅 에이전트는 에던님이 명시적으로 요청한 경우에만 사용합니다.

## Role Commands

| Command | Role | 언제 쓰는가 | 기본 local skill sequence | 주요 산출물 |
|---|---|---|---|---|
| `/PM` | PM | 제품 방향, 우선순위, roadmap, KPI, stakeholder decision | `idea-refine` -> `prd-development` -> `prioritization-advisor` -> `roadmap-planning` | PRD, roadmap, KPI table, priority table |
| `/PL` | PL | WBS, 일정, dependency, risk, release control | `planning-with-files` -> `planning-and-task-breakdown` -> `epic-breakdown-advisor` -> `incremental-implementation` | 실행 계획, WBS, risk list, handoff |
| `/기획자` | Planner | 요구사항, 정책, screen flow, 화면설계, case matrix | `design-brief` -> `create-screen-spec` -> `prd-development` -> `problem-statement` -> `user-story` | SCREEN_SPEC, SPEC, screen flow, policy table, case matrix |
| `/디자이너` | Designer | UX/UI review, visual direction, design system, Figma/Canva asset | `frontend-design` -> `design-review` -> `critique` | UI direction, design review, visual assets |
| `/퍼블리셔` | Publisher | HTML/CSS/JS, responsive UI, accessibility, browser rendering | `frontend-ui-engineering` -> `web-design-guidelines` -> `source-driven-development` -> `playwright` | working HTML UI, responsive screens, browser QA |
| `/개발자` | Developer | feature, API, DB, refactor, bug fix, test, PR | `context-engineering` -> `incremental-implementation` -> `test-driven-development` -> `debugging-and-error-recovery` | working code, tests, API/schema notes |
| `/QA` | QA Tester | manual/automated QA, Playwright, defect report | `code-review-and-quality` -> `playwright` -> `browser-testing-with-devtools` -> `test-driven-development` | QA report, test case matrix, bug list |
| `/바이브코딩` | Vibe Coding | 빠른 idea-to-MVP, single HTML app, prototype | `idea-refine` if vague -> `web-prototype` -> `frontend-ui-engineering` -> `playwright` | running prototype, mock data, interaction checks |
| `/구직자` | Job Seeker | job search, resume, self-introduction, portfolio PPT | `career-ops` -> `documents:documents` | job fit table, resume, portfolio deck |
| `/지식관리` | Knowledge Manager | LLM Wiki inbox, ingest, query, verify, audit, synthesis, lint | `llm-wiki` -> `source-driven-development` -> `documentation-and-adrs` | source/wiki/query note, verify/audit/lint report |

## Command Examples

```text
/PM 신규 서비스 아이디어를 PRD와 우선순위표로 정리해줘.
/PL 이 기능을 구현 가능한 작업 단위와 WBS로 쪼개줘.
/기획자 관리자 화면을 PPT 화면설계서 형태로 정리해줘.
/디자이너 이 Figma 화면의 UX/UI 문제를 리뷰해줘.
/퍼블리셔 이 화면을 반응형 HTML/CSS/JS로 구현해줘.
/개발자 로그인 API와 테스트를 구현해줘.
/QA 엑셀 테스트케이스와 브라우저 QA를 같이 진행해줘.
/바이브코딩 예약 서비스 MVP를 바로 실행 가능한 화면으로 만들어줘.
/구직자 이 공고에 맞춰 이력서와 포트폴리오 PPT를 준비해줘.
/지식관리 이 강의 자료를 LLM Wiki 원본/위키/질의 구조로 흡수해줘.
```

## Tool Routing Add-ons

| Tool Surface | Add-on Skills | 메모 |
|---|---|---|
| Excel / Google Sheets | `spreadsheets:Spreadsheets`, `google-drive:google-sheets` | WBS, QA sheet, fit table, policy matrix |
| Word / Docs / Markdown | `documents:documents`, `google-drive:google-docs`, `design-md` | PRD, SPEC, career document, handoff |
| PPT / Slides / Canva | `presentations:Presentations`, `google-drive:google-slides`, `canva:canva-branded-presentation`, `codex-ppt` | editable deck은 `presentations`, visual deck은 `codex-ppt` |
| Figma / FigJam | `figma:figma-use`, `figma:figma-generate-diagram`, `figma:figma-generate-design` | Figma file/link 또는 connector context가 있을 때 |
| GitHub | `github:github`, `github:gh-address-comments`, `github:gh-fix-ci`, `git-workflow-and-versioning`, `ci-cd-and-automation` | repo, issue, PR, CI 작업 |
| Browser QA | `playwright`, `browser:control-in-app-browser`, `browser-testing-with-devtools` | source-only confidence보다 runtime evidence 우선 |
| Obsidian LLM Wiki | `llm-wiki`, `source-driven-development`, `documentation-and-adrs`, `doubt-driven-development` | source-backed ingest/query/lint |
| Security | `security-and-hardening`, `code-review-and-quality` | auth, permission, secret, external input |
| Performance | `performance-optimization` | 먼저 측정하고 최적화 |
| Launch | `shipping-and-launch`, `security-and-hardening`, `performance-optimization`, `ci-cd-and-automation`, `observability-and-instrumentation` | release, rollback, production readiness |

## Default Sequences

### New Service

1. `/PM`
2. `/기획자`
3. `/디자이너`, UI/visual direction이 필요할 때
4. `/PL`
5. `/퍼블리셔` 또는 `/개발자`
6. `/QA`
7. `/PL`로 handoff, risk, next action 정리
8. `dex-watchdog`

### Feature Implementation

1. `/기획자`, 요구사항이 불완전할 때
2. `/PL`
3. `/개발자`
4. `/QA`
5. `dex-watchdog`

### Vibe Coding

1. `/바이브코딩`
2. `/QA`
3. `/PM`, 방향 판단이 필요할 때
4. `dex-watchdog`

### Knowledge Capture And Query

1. `/지식관리`
2. `llm-wiki` inbox, ingest, query, verify, audit, lint
3. 큰 변경이면 `dex-watchdog`

## Obsidian Recording Rule

실질적인 작업에서는 프로젝트 폴더의 다음 파일을 필요에 따라 갱신합니다.

- `CURRENT.md`: command, role, tool surface, execution mode, selected skills, assumptions, next action
- `SESSION_HANDOFF.md`: 변경 내용, 검증 근거, 남은 일, 다음 prompt
- `QA_REPORT.md`: success, failure, not checked, risks
- `DECISIONS.md`: 오래 남을 결정과 이유
- `SOURCES.md`: source files, links, screenshots, research notes

## External Skill Rule

외부 repository는 `ROLE_SKILL_INSTALL_AUDIT.md`에서 installed로 표시된 경우에만 기본 사용합니다.

새 외부 skill을 쓰기 전에는:

1. `SKILL.md`를 확인합니다.
2. scripts, hooks, package files, permission-sensitive instructions를 확인합니다.
3. bulk install보다 selective install을 우선합니다.
4. 기존 local skill을 교체하기 전 backup을 남깁니다.
5. candidate, reason, audit result를 `CURRENT.md`에 기록합니다.
