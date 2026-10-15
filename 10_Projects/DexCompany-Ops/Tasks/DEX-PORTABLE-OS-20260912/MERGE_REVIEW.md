# 전체 개선 PR 검수·병합 기록

> Public-copy redaction (2026-10-16): individual project records were removed at the owner’s request. Remaining historical results apply only to their original revision and scope.

- Task: DEX-PORTABLE-OS-20260912
- 검수일: 2026-09-12
- 현재 상태: 핵심 개선 PR 4개 main 병합과 병합 후 CI 완료. 실제 기기·설치·새 worker 활성화는 미검증이에요.
- 승인: 에던의 “Dex 전체 개선 PR을 검수하고, 충돌과 의존관계를 정리한 뒤 안전한 순서대로 main 병합까지 진행해.”
- 이번 검수는 이전 코드 작성 턴과 분리해 원본 diff·관련 전체 함수·호출 경로·회귀 검사를 대조했어요. 별도의 GitHub 승인 review나 실기기 검증을 했다고 표시하지 않아요.


## 실제 병합과 CI receipt

| 순서 | PR | main merge SHA | 검증 |
|---|---|---|---|
| 1 | [Wiki #179](https://github.com/ethanhee890-commits/dex-company-wiki/pull/179) | `4454e0c5caf2ae5e7705775d326176992ee0d8cf` | [main CI 34676907938](https://github.com/ethanhee890-commits/dex-company-wiki/actions/runs/34676907938) PASS |
| 2 | [Runtime #194](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/194) | `c9699e674bfe27dfe64ca0a7c321701b1b238e2d` | [main CI 34676930406](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34676930406) PASS; audit 0 |
| 3 | [Runtime #203](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/203) | `58860eec7f9eed5dc53687b4c3a08323ddf47ece` | [main CI 34676977854](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34676977854) PASS |
| 4 | [Wiki #176](https://github.com/ethanhee890-commits/dex-company-wiki/pull/176) | `c420426b5b6e5f8e354becf8b7f666157312d992` | [main CI 34677012931](https://github.com/ethanhee890-commits/dex-company-wiki/actions/runs/34677012931) PASS |

Runtime 결합 후보 [34676805956](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34676805956)와 병합 후 main 검증 모두 total 286 / PASS 285 / FAIL 0 / Windows-only skip 1이에요. 72개 syntax, JSON·secret 검사, 두 smoke, rollback guard와 production dependency audit total 0을 확인했어요. 실제 main tree `a9659cdd8211cb0e699f6a4352e6cd9ea7cff915`가 검증한 결합 후보 tree와 같아요.

Runtime #203 merge commit의 [Vercel status](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/commit/58860eec7f9eed5dc53687b4c3a08323ddf47ece/checks)는 success예요. 직접 운영 HTTP 확인은 Vercel connector 접근 실패와 web URL 접근 차단으로 Not Checked예요. CI의 HTTP smoke는 실제 Production 로그인/기기 E2E를 대신하지 않아요. 기존 배포 연결의 결과만 확인했고 배포 정책·권한·비용이나 worker 실행 설정은 바꾸지 않았어요.

원래 작성 head, 검수 수정, 병합 부모 이력은 모두 보존했고 강제 push·기존 PR 삭제·사용자 worktree 변경을 수행하지 않았어요.

## 검수와 수정

| 항목 | 확인 결과 |
|---|---|
| 보안 PR #194 | package-lock.json의 hono 4.13.7 / qs 6.16.0과 resolved·integrity 6개 값만 변경. 직접 의존성·설치 script·권한 변화 없음. 기존 CI audit total 0 |
| worker 사전 검사 | adapter 생성 전에 clean worktree·고정 branch·허용 경로·변경 수 확인. 실패 시 사용자 편집 보존 |
| 독립 검수 입력 | 원래 Task 전체를 읽기 전용 verifier에 보존. 원래 목표·완료 기준·제약과 작성 결과를 비교 |
| 작업 격리 | lease/counter/result 모두 owner/repository 범위, 대소문자 동일성 유지. 과거 비구분 lease를 자동 삭제·채택하지 않음 |
| 기기·provider | 접속 label이 worker OS를 결정하지 않음. 지원하지 않거나 unavailable인 명시 provider는 대기. 평가 함수는 실행 권한을 부여하지 않음 |
| 신원·브라우저 | OS 신원 및 선택 UID/SID 확인. 초안은 동일 계정·동일 탭·30분, 로그아웃/다른 계정/만료 보호, 자동 제출 없음 |
| Skill·학습 | 전 분야의 Task·기존 승인·결과 학습. source/검토/적용/설치/실제 효과를 분리. 기존 모의 행동 검사 2건은 실기기 증거가 아님 |
| Wiki #179 | 역할 표의 중간 빈 줄로 깨진 행을 복구. 이번 main 병합 승인과 현재 checkpoint 기록 |
| Wiki #176 | 남은 Windows 포괄 선행 조건, main ref와 고정 설치 버전의 모순, 과거 Gemini 단정과 상태 포인터를 수정 후 검증 |

## 의존관계와 안전한 순서

1. Wiki #179: 공통 계약 2.4와 새 경로/학습 정책을 main에 반영했어요.
2. Runtime #194: 최소 보안 의존성 수정을 먼저 반영했어요.
3. Runtime #203: #194의 실제 commit을 부모로 통합한 후보 53d7baefdcb4ba146e867a44e43e7ad982daaf46에서 전체 CI·보안 audit을 다시 확인하고 병합했어요.
4. Wiki #176: 새 정책과 Runtime source 상태를 반영한 전환 문서를 병합했어요.
5. 실제 merge SHA와 main CI를 근거로 단일 상태 생성기·8개 문서·Task/Result/Skill Registry를 별도 문서 정산 변경으로 동기화해요.

기존 branch 이력은 merge commit으로 보존하고 force push를 사용하지 않아요. 각 PR head와 base 변경을 다시 확인하고 GitHub의 expected_head_sha 조건으로 병합해요.

## 기존 배포 연결과 worker 전환

Runtime main 76aadb9037599a4f2f190d7220c732fa06e7be8f의 GitHub Vercel status는 success예요. main 변경이 기존 웹 배포로 이어질 수 있음을 확인했어요. 이번 main 병합에서 그 기존 연결의 결과를 확인하며 별도 배포 정책·유료 사용·권한 설정은 바꾸지 않아요.

api/index.mjs → Gateway는 TaskRunStore의 getTaskStatus/getTaskResult만 사용해요. task-executor를 import하거나 broker/consumer를 시작하지 않아요. 웹 소스 반영으로 실행 lease migration이 자동 수행되지 않아요. Vercel connector의 프로젝트 조회는 404/목록 없음이어서 관리 설정·실행 상태의 증거로 사용하지 않아요. 배포 상태는 해당 commit의 GitHub status와 가능한 실제 HTTP 검사로 확인해요.

새 coordination key를 실제 broker/consumer에 적용하기 전에는 모든 기존 실행자를 중지·drain하고 Task/lease/receipt를 보존·대조해야 해요. 혼합 버전 실행과 불명확한 lease 삭제는 금지예요. source revert만으로 실행 상태가 복구되지는 않아요.

## 후속 작업 보존

- Runtime #97: Windows/SVG/설치/정확한 rollback Gate가 있는 별도 1.2.0 후보예요. 이번 공통 Skill 1.1.1을 향후 통합 시 보존해요.
- Runtime #200 + Wiki #178: legacy 후보·라이선스·미실행 16개 행동 검사는 별도예요. 일괄 설치·활성화하지 않아요.
- Wiki #16: PR #27 open·#28 미구현이라는 옛 상태를 최신 상태 문서 위에 병합하지 않아요. 기존 PR·branch와 증거는 보존해요.
- #28 OPEN, #34/#35 blocked, 실제 Galaxy/iPhone/Windows/Mac 접근·host·설치 검사는 Not Checked를 유지해요. Windows 고유 미검증을 다른 검증된 경로에 확대하지 않아요.

## 다음 작업과 복원

- 병합과 보안 PR을 반복하지 않아요. 실제 기기가 없는 경우 해당 검사를 보류하고 남은 source/설계/리서치 업무를 계속해요.
- 실제 기기에서 진행할 때는 [DEVICE_CHECKS.md](DEVICE_CHECKS.md)의 같은 Task 이어하기 문장을 사용해요. 개인 자료·회사 계정·비용·권한 범위가 바뀔 때만 새 결정을 받아요.
- Runtime #203 문제의 소스 복원 기준은 보안 #194가 포함된 `c9699e674bfe27dfe64ca0a7c321701b1b238e2d`예요. main reset/force push 대신 검수한 revert PR을 사용해요. 실제 worker를 사용했다면 먼저 stop/drain, Task·lease·receipt 대조가 필요해요.
- 설치본과 전체 autonomous OS 완성 상태는 별도예요. 신뢰된 경로 증거의 scheduler 연결, 자연어 목표 분해·위험 분류, cross-device 미제출 초안/첨부, Claude/Gemini 동등 실행과 실제 업무 효과 측정은 남아 있어요.

## 재사용할 검수 방법

이번에 정책 본문을 고친 뒤에도 전환 Task의 Next Prompt와 설치 명령에 옛 Windows 조건·버전이 남을 수 있음을 확인했어요. 다음 유사 변경에서는 정책 본문 → 실행 packet → 이어하기 prompt → 생성 snapshot → Registry를 같은 기준으로 대조하고 실제 변경 대상의 링크·불변 역사·실행 증거를 확인해요. 이번 후보 방법의 적용 증거는 #176 수정과 이 기록이에요. 이후 업무의 오류 감소·시간 개선은 아직 측정하지 않았어요.
