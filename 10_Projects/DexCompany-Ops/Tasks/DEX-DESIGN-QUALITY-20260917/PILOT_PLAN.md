# DEX-DESIGN-QUALITY-20260917 — 설치·디자인 파일럿 계획

기록일: 2026-09-19 · 상태: 승인 host 연결 대기 · 실행/효과를 완료로 간주하지 않아요.

## 1. 범위와 선행 조건

- 원래 Task `DEX-DESIGN-QUALITY-20260917`을 이어가며 새 중복 Task를 만들지 않아요.
- 승인된 Runtime source merge SHA: `dd461ac508f950bd3757db48795655e623e31b21`.
- 위 SHA의 main CI PASS → Wiki registry canonical-source 반영·병합 확인 → 승인 host 설치 순서를 지켜요.
- 실행 직전에 GitHub 최신 main, 원래 Task의 RESULT/QA/HANDOFF와 설치 runbook을 다시 확인해요.
- 이 문서는 실행 계획이에요. Runtime main CI/Wiki 승격 결과는 해당 실제 기록이 근거예요.
- 현재 승인 host 접근이 없어 설치·fresh-session·실제 렌더·WCAG는 `Not Checked`예요.
- baseline·재작업 감소·시간 변화·사용자 부담 변화는 `Not Measured`예요.
- **미측정은 효과 없음이 아니에요.** 접근 실패나 미완료를 품질 FAIL로 바꾸지 않아요.

## 2. 설치와 fresh-session 확인

1. 승인 host·실행 계정·구독 경로와 기존 설치 위치/버전/revision을 실제로 확인해요.
2. 현재 설치·설정·사용자 수정 파일을 기록하고 복원 가능한 백업을 보존해요.
3. 승인 main의 설치 runbook과 실제 CLI help를 대조해 지원 명령·옵션을 확인해요.
4. runbook의 설치/갱신 절차로 검증된 source를 설치하고 설치 receipt와 hash를 기록해요.
5. 새 세션에서 Skill discovery와 실제 design-quality 호출을 별도로 확인해요.
6. 디자인 요청에는 의도한 Skill이 적용되고 일반 요청에는 불필요한 절차가 붙지 않는지 확인해요.
7. #234 자동 인계, #237 Task context/상세 FAIL 우선, #238 비용 guard와 최신 main 회귀를 확인해요.

설치 경로·CLI 옵션을 추측하지 않아요. help와 runbook이 다르면 해당 단계에서 중단해요.
CLI가 파일을 읽었다는 사실만으로 discovery·호출·provider receipt PASS를 선언하지 않아요.
host 권한 우회, 새 자격증명 추출, 유료 API·유료 fallback·extra usage, 운영 배포는 하지 않아요.

근거 runbook: Runtime `docs/DEX_PLUGIN_MIGRATION.md`, Wiki `20_Codex_Handoff/DEX_SKILL_PLUGIN_GOVERNANCE.md`.
아래는 runbook의 명령 예시이며, actual CLI help 지원 확인과 현재 설치 상태 판별 전에는 실행하지 않아요.

- 신규 marketplace: `codex plugin marketplace add ethanhee890-commits/ethanhee890-commits-dex-company-runtime --ref main --json`
- 기존 marketplace 갱신: `codex plugin marketplace upgrade dex-company --json`
- 후보 확인: `codex plugin list --marketplace dex-company --available --json`
- package 설치/갱신: `codex plugin add dex-company-core@dex-company --json`

설치 전후 resolved SHA와 package subtree를 위 검증 merge와 대조해요. main이 이동했다면 변경분 검증 전 적용을 멈춰요.
신규/갱신 경로를 중복 실행하거나 cache를 직접 편집하지 않아요. 기존 legacy 설치는 삭제하지 않아요.

## 3. 최소 파일럿: 대표 작업 3건

기존 계획의 Dex Console 시범 적용을 기본 대상으로 삼고 승인된 fixture만 사용해요.
실제 화면을 열 수 없으면 접근 blocker를 기록하고 임의의 다른 제품을 대신 측정하지 않아요.

| ID | 같은 난이도로 비교할 작업 | 실제 확인 대상 |
|---|---|---|
| P1 | 긴 제목·기관명·URL/hash와 좁은 폭 대응 | 잘림/겹침/의도치 않은 가로 스크롤, 간격·줄바꿈·폰트 fallback |
| P2 | 목록의 loading/success/empty/error 상태 | skeleton 잔존, 상태별 글자·밀도·안내, 다음 행동과 상태 전환 |
| P3 | 입력/버튼·오류 안내와 글자 확대 | 키보드 이동·포커스, 오류 연결, 버튼 두 줄·재배치·터치 영역 |

기존 브랜드·승인 방향을 고정하고 전면 리뉴얼이나 신규 기능을 끼워 넣지 않아요.
3건으로 판단이 모호하면 같은 기준의 2건만 추가해요. 결론을 맞추기 위한 사례 교체는 하지 않아요.

## 4. 공정한 기존 방식(A) ↔ Skill 방식(B) 비교

- 작업별 같은 source revision·요구사항·fixture·브라우저·화면 폭·폰트·모델/예산을 고정해요.
- A는 기존 승인 방식, B는 같은 방식에 design-quality만 추가해요. A의 기본 QA를 제거하지 않아요.
- 동일 출발점의 분리된 작업 공간/세션을 사용하고 A의 정답·수정 결과를 B에 넘기지 않아요.
- 작성자 능력과 순서 효과를 줄이도록 담당/순서를 교차 배치하고 남는 차이는 한계로 기록해요.
- 검수자가 가능하면 A/B 표시를 보지 않고 같은 체크리스트로 독립 검수해요.
- 계획·수용 기준·검수 목록은 결과를 보기 전에 고정하고 실패한 검사도 삭제하지 않아요.
- 3~5건 결과는 탐색적 파일럿이에요. 모든 프로젝트나 모델에 대한 일반 효과를 단정하지 않아요.

## 5. 측정과 evidence

| 지표 | 기록 방식 |
|---|---|
| 품질 | 첫 검수의 텍스트/간격/상태/컨셉 결함을 심각도별로 기록하고 재검사해요 |
| 재작업 | 독립 검수 후 수정 횟수·수정 시간·같은 결함 재발을 분리해요 |
| 시간 | 제작+Skill/증거 준비+QA+재작업의 총 실작업 시간과 전체 경과 시간을 모두 기록해요 |
| 사용자 부담 | 에던의 추가 설명·승인·직접 수정 횟수와 소요 시간을 기록해요 |
| 검수 통과 | 첫 검수 통과 여부와 최종 잔여 FAIL/Not Checked를 각각 유지해요 |
| 비교 | A/B 원자료·절대 차이·비율을 함께 표시하고 기준값 0이면 비율은 계산하지 않아요 |

환경·revision·Skill receipt·실행 시각·viewport·fixture·로그·스크린샷과 독립 검토 기록을 연결해요.
schema v2 evidence의 immutable revision/plan hash/독립 run·artifact 조건을 유지해요.
`EVIDENCE_PACKAGE_COMPLETE`는 증거 구조/무결성 판정일 뿐 Task PASS·디자인/WCAG 인증이 아니에요.

## 6. 실제 렌더와 WCAG 범위

- 실제 브라우저에서 PC/모바일 폭, 확대, 긴 한국어·라틴 혼합, 폰트 실패와 각 상태를 확인해요.
- WCAG 2.2의 관련 contrast·resize·reflow·text spacing·keyboard·focus·target 항목을 선별해요.
- 적용 성공기준·레벨·예외·환경을 계획에 명시하고 자동 검사와 수동 검사를 분리해요.
- 수치/예외는 실행 시 공식 원문으로 재확인해요. Dex 제안 44/48px를 AA 일괄 의무로 쓰지 않아요.
- 키보드/포커스·시각적 방향·읽기 순서는 자동 검사 통과만으로 대신하지 않아요.
- 미접속 실기기·스크린리더·다른 페이지는 `Not Checked`로 남겨요. 전체 WCAG 적합성을 주장하지 않아요.

## 7. 유지·중단·rollback 판정

- 유지: 치명/중대 신규 회귀 없이 결함 또는 재작업이 감소하고, 총시간·사용자 부담의 순증이 없어요.
- 품질 이득과 시간 증가가 엇갈리면 원자료로 trade-off를 제시해요. 자동으로 효과 PASS 처리하지 않아요.
- 품질 이득 없이 총시간/추가 설명·승인 부담이 늘거나 기존 기능이 회귀하면 시범 설치를 중단해요.
- baseline 누락/접근 blocker/표본 부족은 `Not Measured` 또는 판단 보류이며 무효과 판정이 아니에요.
- 중단 시 먼저 새 Skill 적용만 멈추고 이전 검증 package로 복원해요. Dex 전체를 비활성화하지 않아요.
- source 회귀가 확인되면 exact merge `dd461ac508f950bd3757db48795655e623e31b21`만 대상으로 revert PR을 준비해요.
- revert 전 parent·이후 의존 commit·보존 범위를 확인하고 전체 CI 후 승인된 rollback 범위 안에서 병합해요.
- 최신 main 전체를 reset/force-push하거나 #234/#237/#238/후속 변경·legacy·기존 evidence를 삭제하지 않아요.
- 결과와 중단/유지 이유를 원래 Task 및 registry에 정확히 반영하고 설치와 source 상태를 분리해요.

## 8. 원래 Task 이어받기 명령

> DEX-DESIGN-QUALITY-20260917을 이어가요. 최신 Wiki 승인 main의 계약·Task RESULT/QA/HANDOFF와 Runtime merge dd461ac508f950bd3757db48795655e623e31b21의 main CI를 확인해요. Wiki canonical-source 반영까지 확인된 뒤 승인 host에서 최신 설치 runbook과 actual CLI help를 대조해 설치·fresh-session discovery/호출을 검증해요. 기존 설정과 #234/#237/#238 및 최신 main 동작을 보존하고 이 PILOT_PLAN의 P1~P3을 동일 조건 A/B로 실행해요. 실제 렌더·관련 WCAG·결함·재작업·총시간·에던의 추가 부담을 기록해요. 미실행은 Not Checked, 효과 미측정은 Not Measured로 유지해요. 비용/권한 확대나 legacy 삭제 없이 가능한 범위까지 진행하고 host blocker면 정확한 원인과 필요한 최소 조작만 남겨요.
