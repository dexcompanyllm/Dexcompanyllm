# DATA_MODEL

- 분류: POLICY / 논리 데이터 모델
- 적용: 검수된 main 병합 이후. 브랜치에서는 수정안이에요.
- 기준: [데이터 표준](../../20_Codex_Handoff/DATA_STANDARD.md), [데이터 목록](../../20_Codex_Handoff/DATA_CATALOG.json)

## 엔티티

| 엔티티 | 식별 기준 | 보유 정보 | 연결 |
|---|---|---|---|
| Project | 승인된 project ID | 설정 문서 위치 | 여러 Task와 프로젝트 문서 |
| Authority | catalog의 authority ID | 원문 위치·분류·역할 | 해당 원문을 참조하는 문서 |
| Task | 기존 Task ID; 신규 v2는 task.id | 요청·범위·승인·진행 | Project, Result, evidence |
| Result | 같은 Task ID와 보존 revision/attempt 참조 | 결과·검증·미완료·다음 행동 | Task와 근거 |
| Evidence | 원문 위치·대상 revision·검사/실행 ID | 범위·시점·판정 | 검증한 Task/소스/host |
| Skill inventory entry | 기존 registry entry ID | 소스·후보·설치·검증 구분 | canonical revision과 evidence |
| Source / Knowledge | 원문 경로·revision, 기존 note 식별 | 출처·지식·불확실성·이력 | source와 supersedes/supersededBy |

관계를 설명하는 모델이에요. Runtime 저장 schema나 기존 ID를 변경하지 않아요. Task/Result v2와 LLM Wiki verification schema가 상세 필드를 계속 소유해요.

## 필드와 함수 종속

| 기준 | 결정되는 정보 | 정규화 원칙 |
|---|---|---|
| Project ID | PROJECT_CONFIG 경로 | DATA_CATALOG에서 한 번 관리하고 목록을 생성해요 |
| Authority ID | 원문 경로·분류·역할 | 실제 상태값을 다른 목록에 복사하지 않아요 |
| Task ID | 요청의 연속성 | 다른 기기/AI로 이동해도 같은 ID예요 |
| Evidence 대상·revision·검사 범위 | 해당 범위의 판정 | 최신 commit이나 다른 host에 확대하지 않아요 |
| Skill ID + 소스 revision | 해당 소스 버전 | 설치·활성화 상태와 따로 기록해요 |

날짜·대상·의미가 다른 값은 서로 다른 속성으로 유지해요. 여러 프로젝트가 같은 지식을 참조하면 원문 링크를 공유하고 프로젝트 상태는 각각 관리해요.

## 관계

- Project 1 : N Task, Task 1 : N evidence 관계예요.
- Task와 canonical Result는 같은 Task ID로 연결하고 재실행 evidence는 기존 attempt/revision으로 구분해요.
- Knowledge N : M Source 관계는 기존 source 참조로 유지해요. 원문을 summary로 덮어쓰지 않아요.
- 운영 snapshot 1개가 생성하는 8개 문서는 기존 generator가 검증해요.
- PROJECT_INDEX는 DATA_CATALOG의 생성 결과이며 ID·참조·누락·표시 불일치를 CI에서 검사해요.

## 예외와 검증 범위

기존 flat Task YAML, 날짜 alias, wikilink와 Markdown 링크 혼용, role 문서 복사본은 후속 정리 대상이에요. 모든 과거 문서의 의미 충돌을 해결하거나 운영 DB를 정규화했다는 뜻은 아니에요. 세부 진단·보존·완료 기준은 [Task evidence](Tasks/DEX-DATA-STANDARDIZATION-20260915/EVIDENCE.md)를 따라요.

## Mock Data

프로젝트 참조는 승인 main에서 확인한 네 프로젝트를 사용해요. 검사 테스트의 잘못된 ID·누락 링크만 독립 fixture로 만들었어요.
