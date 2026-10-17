# Role Capability Matrix

- Status: Approved
- Canonical contract: `AI_CONTRACT.md`

역할은 업무 책임을 나타내고 capability는 실행에 필요한 능력을 나타낸다. 모델·tool·skill 이름은 provider adapter에서 매핑한다.

ChatGPT·Work·Codex·Claude·Claude Code·Gemini 등 모든 AI는 같은 Dex Company의 정책·지식·Task·품질 기준을 사용해 기획·디자인·리서치·문서 작성·개발·QA 등 모든 업무를 수행해요. AI 제품명이나 공급자별로 업무 역할을 고정하거나 독점 배정하지 않아요.

아래 표는 업무별 필요 능력과 검증 기준이에요. 각 행을 특정 AI에 고정 배정하지 않으며 어느 AI든 현재 Task에서 필요한 역할을 맡을 수 있어요. Writer와 verifier의 독립성은 기존 기준을 유지해요.

| 역할 | 핵심 capability | 주요 산출물 | 기본 검증 |
|---|---|---|---|
| `/PM` | scope-analysis, prioritization, roadmap, risk-management, stakeholder-summary | PRD, roadmap, decision, risk log | 범위·우선순위·의존성 검토 |
| `/PL` | work-breakdown, schedule, dependency-analysis, coordination, handoff | WBS, 일정, 이슈·리스크, handoff | 누락·충돌·소유자 검토 |
| `/기획자` | requirement-analysis, policy-modeling, screen-flow-design, screen-spec-authoring, artifact-authoring | 정책표, 화면 흐름, PPTX 화면설계서 | 요구사항 추적, 화면·디스크립션 QA |
| `/디자이너` | design-direction, visual-review, accessibility-review, prototype-analysis | 디자인 방향, UI 검수, handoff | 일관성·접근성·반응형 검토 |
| `/퍼블리셔` | html-css-js, responsive-implementation, browser-validation | 퍼블리싱 코드, browser evidence | viewport·접근성·회귀 검사 |
| `/개발자` | repository-analysis, implementation, debugging, testing, schema-design | 코드, migration, API/schema, tests | lint·unit·integration·diff |
| `/QA` | test-design, defect-analysis, evidence-capture, regression-review | QA report, defect list, test result | PASS/FAIL/Not Checked 분리 |
| `/바이브코딩` | rapid-prototyping, product-reasoning, implementation, browser-validation | prototype, assumptions, QA note | 핵심 플로우·회귀·안전 검사 |
| `/구직자` | job-analysis, resume-authoring, portfolio-structuring, tracker-management | 이력서, 자기소개, 포트폴리오 | 사실·성과·공고 적합성 검토 |
| `/지식관리` | source-ingestion, provenance, synthesis, verification, retrieval-design | source note, wiki, query, audit | 출처·최신성·중복·논쟁 상태 검사 |
| `/마케팅` | audience-analysis, positioning, campaign-analysis, copywriting, experiment-design | 캠페인 초안, 메시지, 실험·성과 분석 | 근거·브랜드·대상 적합성·집행 승인 |
| `/사업` | business-analysis, scenario-modeling, unit-economics, decision-analysis | 가설, 사업 비교, 의사결정 자료 | 가정·계산·단위·불확실성·비용 |
| `/리서치` | research-web, source-citation, evidence-synthesis, contradiction-analysis | 조사 보고서, 근거 비교표 | 출처·최신성·추론 구분·상충 근거 |

역할 명령은 선택 사항이에요. 위 capability는 업무 요구 분류이며 해당 adapter가 실제 실행할 수 있다는 선언이 아니에요.

## 공통 capability

- `github-read`, `github-write`
- `read-files`, `write-files`
- `run-shell`, `run-tests`
- `research-web`, `source-citation`
- `create-pptx`, `create-docx`, `create-xlsx`, `create-pdf`
- `image-generation`, `visual-analysis`
- `approval-request`, `audit-log`, `checkpoint-resume`

## 라우팅 원칙

1. 요청에서 역할을 추론한다.
2. 역할을 capability 세트로 변환한다.
3. 플랫폼과 계정에서 실제 사용 가능한 capability를 확인한다.
4. 현재 AI에서 가능한 업무는 직접 완료한다. `providers/`의 선호 경로는 실제 capability를 연결하기 위한 최적화이며 역할 독점이나 강제 AI 전환 기준이 아니다.
5. 필요한 capability가 부족하면 조용히 품질을 낮추지 않고 기존 승인·데이터 경계 안의 tool·worker·다른 실행 경로를 사용한다. 같은 Task·요구사항·상태·결과를 유지하며 역할표만을 이유로 사용자를 다른 AI로 이동시키지 않는다.
6. 실행 결과와 실제 선택값은 Result Packet에 기록한다.
