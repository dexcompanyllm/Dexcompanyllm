# 주간 스킬 발굴 — 2026-09-14

Task: `DEX-SKILL-MAINTENANCE-20260911`. 기준: 승인 Wiki main, Runtime main `0c86f9cdd0879b4e0ae59585e000b0847ebb5886`. 실제 설치·활성화·권한 확대·유료 API 사용은 하지 않았어요.

## 1차 후보 기록 — 최대 5개

| # | 후보·고정 revision | 분류 | 실제 개선 요구 | 라이선스·실행 경계 |
|---|---|---|---|---|
| 1 | [Anthropic frontend-design](https://github.com/anthropics/skills/blob/34040c9c568585f6929bedeaad110ad08f079624/skills/frontend-design/SKILL.md) @ `34040c9c568585f6929bedeaad110ad08f079624` | SKILL | AI 템플릿처럼 보이지 않는 주제·브리프 기반 시각 방향과 자기비판 | Apache-2.0; `SKILL.md`+라이선스, script/dependency/hook/permission 없음 |
| 2 | [OpenAI playwright-interactive](https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/playwright-interactive/SKILL.md) @ `49f948faa9258a0c61caceaf225e179651397431` | CAPABILITY/SKILL | 반복되는 웹 기능·시각 회귀를 같은 브라우저 세션에서 검증 | Apache-2.0; experimental `js_repl`, `danger-full-access`, npm/browser 설치 요구 |
| 3 | OpenAI-curated Product Design `ideate@0.1.55` | CAPABILITY | 디자인 brief·참조·치수 보존과 이미지 방향 탐색 | Proprietary; 현재 환경에서 이미 제공되는 native capability |
| 4 | OpenAI-curated Data Analytics `analyze-data-quality@1.0.8` | CAPABILITY | GA4·KPI·리서치 데이터의 freshness/grain/누락·중복 검사 | Proprietary; 현재 제공되는 native capability와 connector 의존 |
| 5 | LIVE-AR 실기기 검증 | CAPABILITY | 사진이 아닌 LIVE 카메라, 눈 추적, GPU/열/권한을 Galaxy 기기에서 증명 | 공식 source/revision/license와 승인 Android host 증거 없음 |

## 필터 결과

| 후보 | 업무 관련성·중복/품질 | 보안·라이선스 | 처분 |
|---|---|---|---|
| frontend-design | PASS(조건부): 주제 기반 미학·anti-template 자기비판은 Product Design ideate, 화면설계 작성·검수와 완전 중복이 아님 | PASS: instruction-only, Apache-2.0. 단, memory/자체 추정은 Dex canonical brief보다 앞설 수 없음 | **후보 1개 등록**. sourceReviewed만 기록하고 미적용·미설치·행동 Not Checked |
| playwright-interactive | QA inventory·기능/시각 분리·viewport 검사는 유용 | **FAIL for Dex apply**: 실험 기능, sandbox 해제, dependency/browser 설치가 현재 금지 조건과 충돌 | 제외. 안정 sandbox와 승인 격리 host가 생길 때 capability Gate로 재검토 |
| Product Design ideate | 관련성 높지만 이미 native 제공, 새 Dex Skill은 중복 | Proprietary라 소스 흡수 부적합 | 복제·등록 제외; 가능한 환경에서 native 사용 |
| analyze-data-quality | 사업·리서치에는 유용하나 현재 우선 gap보다 낮고 이미 native 제공 | Proprietary·connector 의존 | 복제·등록 제외 |
| LIVE-AR device validation | 실시간 입력을 다룰 때 실기기 검증 필요 | source·license·실기기 증거 Not Checked | Skill로 만들지 않고 프로젝트 capability/acceptance gap으로 유지 |

## 상세 검토 — 2개

### frontend-design

- 고유 이점: 업종·사용자·목적에서 색·서체·레이아웃을 도출하고, 계획→브리프 대비 자기비판→제작의 두 단계로 generic card/gradient/motion/copy를 걷어내요.
- 기존 방법과 차이: Product Design ideate는 참조를 붙인 3개 이미지 방향 생성, audit는 실제 화면 UX 검수, create-screen-spec은 정책·상태·개발 인계가 중심이에요. anti-template 미학 rubric은 별도 가치가 있어요.
- 경계: 승인된 brief·디자인 시스템·exact reference가 항상 우선이에요. 다른 채팅·기억을 확인 근거로 쓰지 않고, 없는 내용은 proposal/inference 또는 Not Checked로 둬요. 관리자·공공·기존 디자인 시스템에는 독창성보다 일관성·접근성이 우선이에요.
- 검수: 출처·라이선스·보안 PASS. 실제 Dex 결과 비교와 behaviorVerified는 Not Checked예요.

### playwright-interactive

- 고유 이점: 요구/구현/완료 주장으로 QA inventory를 만든 뒤 실제 입력, 기능 QA, 시각 QA, viewport와 탐색 검사를 분리해요.
- 차단: `js_repl` 활성화·새 세션·`danger-full-access`·`npm install playwright`·브라우저/Electron 설치를 요구해 자동 설치·실험 기능·권한 확대 금지와 충돌해요.
- 반례: 브라우저 에뮬레이션은 Galaxy Z Flip5/Tab S10 FE+의 카메라·GPU·열·권한·눈 추적 검증을 대신하지 못해요.
- 검수: 출처·Apache/NOTICE 확인 PASS. Dex 적용 FAIL, 설치·행동 Not Checked예요.

## 결론

새 Runtime Skill을 만들거나 설치하지 않았어요. `frontend-design`의 고유 방법만 향후 비교 검증할 source-reviewed 후보로 registry에 1개 추가했어요. 실제 시각 Task에서 기존 Product Design ideate와 전후 결과를 비교해 이점이 확인될 때만 최소 Dex-owned rubric을 별도 제안해요.
