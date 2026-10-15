# Dex 데이터 표준

- 분류: POLICY
- 문서 버전: 1.0
- 적용: 검수된 main 병합 이후. 브랜치에서는 수정안이에요.
- 상위 기준: [AI_CONTRACT.md](../AI_CONTRACT.md)
- 작업·진단·미해결 항목: [Task evidence](../10_Projects/DexCompany-Ops/Tasks/DEX-DATA-STANDARDIZATION-20260915/EVIDENCE.md)

## 목표와 범위

표준화는 같은 의미에 같은 이름·형식·판정 기준을 사용하는 일이에요. 정규화는 같은 사실을 여러 곳에서 독립적으로 수정하지 않도록 원본과 참조 관계를 정하는 일이에요. Markdown·YAML·JSON과 GitHub Task Bus를 유지하며 새 데이터베이스를 도입하지 않아요.

이번 적용은 프로젝트 식별·기준 문서 연결·프로젝트 목록 생성과 검사예요. 데이터 전체의 의미 검증, 기존 Task 재작성, LLM Wiki 일괄 변환, Runtime 저장 형식 변경은 완료된 것으로 보지 않아요.

## 데이터 종류와 기준 위치

| 데이터 | 분류 | 기준정보 | 다른 문서의 처리 |
|---|---|---|---|
| 공통 규칙·승인 | POLICY | AI_CONTRACT.md | 원문을 참조하고 하위 규칙으로 완화하지 않아요 |
| 프로젝트 ID·설정 문서 위치 | FACT | DATA_CATALOG.json의 projects | PROJECT_INDEX.md를 생성해요 |
| 요구·현재 상태·인계 | FACT | 각 프로젝트의 PROJECT_CONFIG / CURRENT / SESSION_HANDOFF | 서로 다른 책임을 유지하고 상태를 인덱스에 복사하지 않아요 |
| 특정 날짜·commit의 운영 검증 | FACT | DexCompany-Ops/OPS_SNAPSHOT.json | 기존 scripts/ops-state.mjs가 생성하는 8개 표시 문서는 유지해요 |
| Task·Result | FACT | GitHub Task Bus와 Task/Result Packet v2 | 같은 Task ID로 연결해요 |
| Skill 목록·버전·설치 기록 | FACT | DEX_SKILL_REGISTRY.json | 수행 방법인 SKILL과 목록인 FACT를 구분해요 |
| Skill 수행 방법 | SKILL | 기존 Skill governance가 지정한 소스 | 공급자별 배포본과 원본을 구분해요 |
| 실행 능력·adapter 설정 | CAPABILITY | providers 및 Runtime의 기존 기준 | 설정과 실제 가용성을 따로 검증해요 |
| 재사용 지식·근거 | 내용별 분류 | LLM Wiki sources / wiki 및 verification schema | 프로젝트의 실시간 상태로 사용하지 않아요 |

[DATA_CATALOG.json](DATA_CATALOG.json)은 원본 위치를 정리하며, 각 원문의 정확성·최신성·실제 가용성을 자동 보증하지 않아요.

## 이름·형식·값

| 항목 | 신규 데이터 규칙 | 기존 데이터 호환 |
|---|---|---|
| 문자·줄바꿈 | UTF-8, LF, BOM 없음 | 보존 원문의 BOM/CRLF를 일괄 변환하지 않아요 |
| JSON key | 같은 객체 안에서 중복 금지 | 충돌한 값은 의도를 확인해요 |
| 스키마 버전 | 스키마별 자료형 유지; 새 catalog는 문자열 1.0 | OPS_SNAPSHOT의 숫자 1을 자동 치환하지 않아요 |
| 프로젝트 ID | 승인된 폴더 ID 유지 | 새 이름이나 별칭으로 기존 ID를 교체하지 않아요 |
| 신규 Task | TASK_PACKET v2의 task.id와 project.configPath | 기존 taskId는 읽기 매핑 후보이며 값·파일명은 유지해요 |
| GitHub 참조 | 저장소 전체 이름 + 대상 종류 + 번호 | 단독 #28만으로 다른 저장소 Issue/PR를 연결하지 않아요 |
| 파일 참조 | 저장소 상대 경로, / 구분자, 실제 경로 확인 | 로컬 절대 경로는 host 참고정보이며 전역 필수 조건이 아니에요 |
| 날짜 | 날짜만 알면 YYYY-MM-DD | 날짜에 시각을 만들어 넣지 않아요 |
| 시각 | 실제 시각을 알면 offset 포함 ISO 형식 | 수집일·발생일·검증일·문서 수정일을 구분해요 |
| 시간대 | 원래 offset 유지, 사용자 일정은 Asia/Seoul 명시 | UTC/KST를 이름만 바꾸지 않아요 |
| 미확인 값 | 스키마가 허용하는 null과 이유 | 미확인을 0, 빈 ID, 완료로 치환하지 않아요 |
| 출처 | 저장소·경로·조회 commit/원문 revision | 오래된 main 링크는 실제 사용 전 재확인해요 |
| 이력 | 기존 ID·출처 유지, 필요하면 supersedes/supersededBy 연결 | 이름이 비슷하다는 이유로 합치거나 삭제하지 않아요 |

LLM Wiki의 created/dateCreated, updated/dateModified는 현재 schema에서 함께 요구하는 호환 필드예요. 이번에 제거하지 않아요. 후속 migration에서 날짜의 의미와 값 일치를 검토한 뒤 원본 필드와 생성 alias를 정하고 reader를 함께 검증해요.

## 상태를 섞지 않는 규칙

| 구분 | 값 또는 기준 | 의미 |
|---|---|---|
| 판단 근거 | confirmed / inference / proposal / unknown | 주장의 근거 |
| 개별 실행 검사 | PASS / FAIL / Not Checked | 특정 검사의 실제 결과 |
| Task 진행 | 기존 Task schema와 실행 protocol | 대기·진행·승인·완료 등 업무 흐름 |
| 지식 검증 | verified / partial / unverified / disputed | 출처 기반 지식의 검증 수준 |
| 소스·설치·실행 | 소스 버전, 설치 버전, 행동 검증 별도 | 소스 병합이 설치·실기기 PASS를 뜻하지 않아요 |

템플릿의 not-checked와 표시값 Not Checked는 해당 필드에서만 대응시켜요. 작업 blocked, 지식 unverified, 검사 FAIL을 서로 치환하지 않아요. PASS_WITH_WARNINGS 등 기존 복합 판정은 원문과 경고를 보존하며 PASS로 자동 승격하지 않아요.

## 정규화와 참조 무결성

1. 한 사실의 원본을 먼저 정해요. 날짜·commit·host·검사 범위가 다르면 서로 다른 관측으로 유지해요.
2. 프로젝트 목록은 ID와 문서 위치만 소유해요. 상태·버전·로컬 경로를 새 필드로 복제하지 않아요.
3. 사람이 보는 목록은 원본 데이터에서 생성해요. 수동 변경으로 원본과 달라지면 검사에 실패해요.
4. 같은 내용의 복사본이 필요하면 generator와 검사를 함께 둬요. 기존 8개 운영 문서는 이미 이 방식이므로 삭제하지 않아요.
5. Task, Result, evidence, Skill, source는 각자의 식별자로 참조해요. 다른 기기/AI로 이동해도 Task ID를 유지해요.
6. 파일 SHA가 같아도 빈 템플릿·배포본·증거·프로젝트별 수정 책임을 구분한 뒤 처리해요.
7. 과거 snapshot과 현재 정책은 섹션별 효력을 확인해요. 과거 상태값과 함께 유효한 보안 정책을 폐기하지 않아요.
8. 열린 PR에만 있는 데이터는 검토 후보예요. 승인 main 데이터에 몰래 합치지 않아요.

## DATA_CATALOG 필드 사전

| 위치 | 필드 | 자료형과 규칙 |
|---|---|---|
| root | schemaVersion | 문자열 1.0 |
| root | projects | 하나 이상의 Project 참조 배열 |
| root | authorities | 하나 이상의 기준정보 참조 배열 |
| projects[] | id | 기존 프로젝트 ID; 대소문자만 다른 중복도 금지 |
| projects[] | configPath | 10_Projects/{id}/PROJECT_CONFIG.md와 정확히 일치 |
| authorities[] | id | 소문자 영문·숫자·하이픈의 고유 식별자 |
| authorities[] | classification | FACT / POLICY / SKILL / CAPABILITY |
| authorities[] | path | 존재하는 저장소 상대 파일 경로; 중복 금지 |
| authorities[] | purpose | 비어 있지 않은 한 줄 설명 |

추가 key는 허용하지 않아요. 새 필드가 필요하면 schema 변경·reader 영향·검증을 같은 PR에서 검토해요. core-policy는 AI_CONTRACT.md, project-directory는 이 catalog 자체를 가리켜요. 등록 범위는 Git에 추적된 10_Projects/{id}/PROJECT_CONFIG.md 전체예요.

## 현재 자동 검사

기본 명령은 `node scripts/data-catalog.mjs`예요. 파일 수정과 네트워크 호출 없이 다음을 검사해요.

- 정확한 key·자료형·분류·schemaVersion과 중복 JSON key
- 프로젝트/기준정보 ID 및 참조 경로 중복
- 프로젝트 ID와 설정 경로 일치
- 등록 프로젝트의 설정·상태·인계·결정 문서 존재
- Git에 추적된 프로젝트 설정 중 등록 누락
- 상대 경로 규칙과 실제 일반 파일 존재; 삭제·디렉터리 대체·심볼릭 링크 경로는 실패
- PROJECT_INDEX가 catalog에서 생성한 결과와 같은지

PASS는 내용 최신성·상충 정책 해결·외부 URL 가용성·운영 DB·실기기 검증을 뜻하지 않아요. 기존 `node scripts/ops-state.mjs`의 8개 문서 일치·원문 보존 검사는 별도로 유지해요. CI는 읽기 권한만 사용하고 변경·설치·배포를 하지 않아요.

## 후속 정리

Task evidence의 미해결 항목을 따라 원문 보존 → 필드 대응표 → reader 영향 확인 → 변환 후보 → 회귀 검사 → 검수 순서로 진행해요. 운영 DB가 실제 존재하면 해당 schema와 backup/rollback을 확인한 뒤 별도 계획을 세워요.

일괄 삭제·이름 변경·대량 이동·파괴적 migration과 main 병합은 기존 승인 정책을 따라요. 이번 작업은 공급자 업데이트가 아니므로 AI_CONTRACT §12.1을 새로운 병합 권한으로 해석하지 않아요. 외부 계정·자동화 일정·Runtime 동작과 권한은 자동 변경하지 않아요.
