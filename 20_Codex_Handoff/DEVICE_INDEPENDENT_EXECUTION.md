# 기기와 실행 환경을 분리하는 Dex 운영 기준

- 승인 방향: 에던의 2026-09-12 전체 개선 요청
- 적용: 승인 main에 병합한 정책·소스부터 적용해요. 실제 경로 활성화에는 해당 증거와 기존 승인이 필요해요.
- 구현/검증 작업: `DEX-PORTABLE-OS-20260912`

## 같은 작업을 어디에서나 이어가는 구조

| 계층 | 책임 | 기준정보 |
|---|---|---|
| 접속 기기·AI 화면 | 목표 입력, 상태·결과 조회, 필요한 승인, 산출물 접근 | Task ID를 전달하고 canonical 상태를 다시 읽어요 |
| Wiki / Control Plane | 정책, 프로젝트 상태, 결정, 출처, 학습·Skill Registry | 승인 Wiki main |
| Runtime / Orchestrator | 필요한 능력·가용성·비용·데이터 경계에 맞는 실행 경로 제안 | 실제 계정·설정·호환성 확인 |
| 실행 환경 | 승인된 범위의 코드·파일·문서·도구 처리 | 전용 worker, 격리, broker, 프로젝트 저장소 |
| QA / Watchdog | 원래 요청·제약·완료 기준과 실제 결과 비교 | 독립 review와 검증 증거 |

Marketplace `dex-company`는 Plugin `dex-company-core`를 배포하는 경로예요. Runtime 실행 엔진을 Marketplace의 하위 구성요소로 취급하지 않아요. `use-dex-company`는 공통 운영 Skill이고 `create-screen-spec`은 선택하는 업무별 Skill이에요. 개발·마케팅·사업·리서치·기획·디자인 등에 필요한 방법을 능력 기준으로 조합해요.

## 세 가지 독립 검증 축

| 축 | 필수 확인 | 다른 축으로 대신할 수 없는 것 |
|---|---|---|
| 공통 기능 | 신원, 비용, canonical Task·승인, 중복 방지, 한 쓰기 담당자, 원래 의도 검증, 결과·복구 | Windows 통과만으로 공통 기능 PASS 금지 |
| 기기별 접근 | Galaxy/Android, iPhone/iOS, Windows, Mac의 실제 로그인·조회·제출·승인·파일·재접속 | 화면 크기 시뮬레이션은 실제 기기·계정 검증이 아니에요 |
| 실행 환경별 | provider+OS+계정+설정+버전에 묶인 sandbox, credential 격리, 실제 cwd·프로세스·취소·범위·복구 | Mac 실행 성공은 Windows 실행, 다른 provider 또는 회사 계정의 승인이 아니에요 |

읽기는 공통 읽기 기준과 해당 접속 경로만 필요해요. 제출은 승인 범위와 idempotency를 더 확인해요. 실제 실행은 공통 실행 기준, 선택한 접근 경로, 선택한 실행 환경의 기준을 모두 통과해야 해요. 사용하지 않는 OS의 Not Checked는 그 조합을 막는 이유가 아니에요.

예: iPhone → PWA → 검증된 Mac worker는 Windows worker의 증거를 요구하지 않아요. Windows PC로 결과만 조회할 때 Windows 로컬 worker 설치가 필요하지 않아요. 단, 이 예시는 현재 통과했다는 선언이 아니에요.

Runtime `packages/core/src/route-acceptance.mjs`는 이 의존관계를 검사하는 순수 판정 함수예요. 모호한 중복 증거·만료·다른 revision·철회·미검수·Not Checked는 실패해요. 이것은 배포 준비용 평가이고 실행 권한을 부여하지 않아요. 브라우저나 Task가 보낸 PASS는 인증된 증거가 아니며, 운영 연결 전 승인된 증거 저장·검수 주체가 필요해요. 기존 broker와 worker 보안 검사는 계속 필수예요.

## 기존 Issue 의존관계 수정

| 작업 | 새 선행 조건 | 현재 확인 상태 |
|---|---|---|
| #28 공통 execution core | 구현·회귀·원래 의도·결과·복구 증거와 독립 검수 | Phase 1~3 소스 구현 완료; 실제 선택 host의 전체 증거 별도 필요 |
| #28 Windows 실행 | Windows 전용 계정·sandbox·cwd·process·scope 및 전체 시나리오 | Not Checked, Issue OPEN 유지 |
| #28 Mac 실행 | 동일 공통 안전 속성 + Mac 고유 계정·권한·프로세스·파일 경계 | Not Checked, Windows 증거 요구하지 않음 |
| #34 기존 PWA/GitHub 경로 | 그 기능의 기존 승인·접근 검증 | 기존 허용 범위 유지 |
| #34 새 hosted submit/control | 공통 안전 + 선택 host + OAuth scope별 승인 + 해당 surface E2E | blocked 유지; 승인 없는 write/control 활성화 금지 |
| #35 reader/verifier 확대 | 공통 안전 + 추가 worker별 capability·데이터·read-only·독립성 검증 | blocked 유지; Windows 전체 완료를 포괄 조건으로 사용하지 않음 |
| PR #97 설치·architecture Skill | 그 PR에 명시된 설치·SVG·Windows 경로·정확한 rollback 검증 | 해당 고유 Gate 유지; 다른 공통 Skill 개선의 선행 조건이 아님 |

#17 완료와 기존 승인·과거 증거는 보존해요. #28을 먼저 닫아야만 별도의 이미 검증된 기능을 쓸 수 있는 구조로 만들지 않아요. 그렇다고 현재 #34/#35를 증거 없이 열린 상태로 바꾸지도 않아요. 새 경로가 실제 통과하면 해당 조합만 판정하고 모든 OS 통과를 기다리지 않아요.

## 접근과 재개

- PWA/GitHub가 공통 우회 경로예요. native plugin·MCP·알림·마이크·로컬 파일 연결은 실제 지원과 정책을 확인한 선택 기능이에요.
- 원래 목표, 완료 기준, 승인 범위, 입력·산출물 참조, 마지막 checkpoint, 결과 receipt, 하지 않을 재실행을 같은 Task에 남겨요.
- 승인도 전체 대화가 아닌 목적·대상·side effect·제약으로 연결해요. 범위가 바뀌지 않았으면 반복 승인하지 않아요.
- 파일은 승인된 저장소/산출물 참조와 접근권한을 이어받아요. 로컬 절대경로, 인증 토큰, 회사 자료를 다른 계정에 무조건 복사하지 않아요.
- 현 PWA 보완은 같은 탭·동일 계정의 30분 임시 입력 복원이에요. 미제출 초안의 기기 간 동기화나 첨부 업로드·완전한 승인 UI까지 구현됐다고 보지 않아요.
- 한도가 끝나거나 host가 꺼지면 checkpoint를 유지해요. 비용·권한·데이터 경계가 맞는 검증된 대체 경로만 사용해요.
