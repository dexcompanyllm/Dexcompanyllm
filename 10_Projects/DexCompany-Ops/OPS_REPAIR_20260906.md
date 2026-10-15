# Dex 운영 문서·점검 복구 — 2026-09-06

Task ID: `DEX-OPS-REPAIR-20260906`

## 승인 범위

에던이 요금 설정은 그대로 두고, 반복 보고된 문제를 찾아 수정하도록 승인했어요. 이번 작업은 추가 provider-watch가 아니라 현재 상태·QA·실행 안내를 실제 검증 근거에 맞추는 일괄 복구예요.

원문 보존 기준 Wiki snapshot: `507331d82cc3016373d1e6d351b8f38f41fa4f98` (PR #166). 동시에 추가된 provider-watch 파일도 보존했어요. Runtime 시작 snapshot은 PR #185 `c3e6acf76722feebca0bf9c5efe30b09e552c1a1`이에요.

## 확인된 점검 실패 원인

Runtime validation `33853299911` attempt 2 / job `100962362749`의 실제 로그를 확인했어요. 설치, static checks, unit/smoke/rollback은 통과했지만 npm bulk-advisory endpoint의 응답이 300초 동안 없어 network timeout으로 중단됐어요. 특정 package/CVE 발견을 증명한 실패가 아니고, 그렇다고 보안 점검이 성공한 것도 아니에요. 역사적 run은 FAIL로 보존하며 더 깊은 네트워크/서비스 원인은 unknown이에요.

## Runtime 수정·검증 완료

Runtime PR #187은 `5a5f69ab64652d33da0b918f2d4561ac69d4bb46`로 병합됐어요. 필수 production dependency audit의 범위와 high-severity 기준은 유지하고 제한된 시간/출력, 연결 오류에만 최대 두 번 시도, 실패·미확인 구분, 비밀정보가 없는 진단을 추가했어요. 검사 생략·severity 완화·audit fix·registry 우회는 하지 않았어요.

첫 head `1c1640708b3cca205d49d5130762e005f010689a`의 CI는 PASS였지만 독립 Codex 검수에서 npm top-level HTTP status 처리 보완이 발견됐어요. `6ffee13c1e948078b57b29c194575255f791480f`에 수정·회귀검사를 추가했고 독립 재검수에서 중대한 추가 문제는 없었어요. 작업 중 병합된 PR #188의 한 파일 변경은 history를 보존한 merge commit `e5f53a999a19771110dc49509b7dba6051a2cc77`로 정합화했어요. 이 최종 tree는 검수된 `6ffee13...`와 같아요.

최종 branch CI `33994826188`과 정확한 병합 SHA의 main CI `33994932959`가 모두 PASS예요. main의 Node 24 검사 결과는 **244 PASS / 0 FAIL / Windows-only 1 SKIP**, static/secret scan, smoke, adapter, rollback과 필수 audit 모두 PASS예요. 실제 audit는 **high 0 / critical 0 / moderate 1**이에요. 중간 등급 한 건의 영향·수정 가능성은 별도 검토 대상이며 ‘전체 취약점 0’이나 ‘실제 Windows 검증 완료’라고 해석하지 않아요.

## 누락된 안전검사 연결

기존 Phase 3 runbook에 `docs/PHASE3_SAFETY_MATRIX.md`를 연결해 기존 여섯 시나리오와 다음 네 검사가 모두 필수임을 명시했어요.

- P3-PERM: 새 작업/이어가기/복원/재시작에서 실제 sandbox·approval 권한 유지
- P3-CWD: 실제 실행 process의 cwd와 repository realpath가 등록된 Task 대상과 일치
- P3-PROCESS: interrupt/timeout 뒤 실제 소유 process와 descendants 종료 확인 전 lease/retry 해제 금지
- P3-SCOPE: Task-owned 범위만 cleanup; 실제 바깥 경로 삭제명령 대신 no-op policy-boundary 검증과 synthetic outside/sibling sentinel 보존

문서·자동 테스트 PASS는 실제 Windows-host E2E PASS를 의미하지 않아요. #28은 OPEN / physical E2E Not Checked, #34/#35는 blocked로 유지해요. PR #88/#67/#63/#60 기능 baseline, approved recommended Codex `0.151.0`은 바꾸지 않았어요. Provider `0.153.4`는 마지막 확인된 별도 검증 후보이지 설치·승격 승인이 아니에요.

## Wiki 현재 상태 동기화와 재발 방지

`OPS_SNAPSHOT.json`의 검증된 값으로 8개 current 블록을 생성했어요. 각 문서의 원문은 접힌 과거 기록 영역에 **바이트 단위로 그대로 보존**했어요. 과거의 Current/PASS/Next Prompt는 현재 지시가 아니며, 기존의 비용·보안·아키텍처 결정은 이번 복구로 취소하지 않아요. 현재 정책의 우선 출처는 AI_CONTRACT.md예요.

`node scripts/ops-state.mjs`는 8개 블록의 값·안전검사 링크와 원문 보존을 실제 비교해요. 별도 테스트는 잘못된 SHA, 거짓 physical PASS, 안전검사 누락, 과거 기록 변조를 일부러 넣으면 실패하는지도 검증해요. 이 검사는 원격 Runtime CI를 재실행하거나 실제 host를 검사하는 기능이 아니에요. 스냅샷은 명시된 Runtime SHA와 확인일에만 적용해요.

Cloud implementation은 Wiki용 환경이 없어 시작되지 않았어요. 대신 기존 GitHub 연결의 별도 repair branch에서 한 번의 제한된 기계적 문서 갱신을 수행했어요. 임시 write workflow는 run `33995156351`에서 성공한 뒤 삭제했고, 최종 변경에는 **contents:read 검증 workflow만** 남겼어요. 새 account/secret/worker 권한을 만들지 않았고 main에 직접 push하지 않았어요. 문서 생성 전 head의 일시적 consistency FAIL은 역사적 결과로 남기고, 최종 변경 head의 검증을 별도로 확인해요.

Wiki PR #167의 최종 CI·독립 검수·병합 결과는 PR과 #55 checkpoint에서 확인해요. 이 파일은 자기 자신의 미래 merge SHA나 미실행 결과를 예측하지 않아요. 기존 PR #157과 #186, 이전 실패 기록, 날짜별 역사, 다른 프로젝트와 사용자 변경을 보존해요.

## 비용·보안

요금제, 결제, 사용량/credit/reset 설정, API key, paid API/fallback, 모델 기본값, worker/OS 권한, hosted MCP write, 배포 설정은 변경하지 않았어요. 실제 Windows host 작업이나 production 데이터 변경을 이 문서 복구로 승인하지 않아요.

## 근거

- [Runtime 복구 PR #187](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/187)
- [역사적 실패 run](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33853299911)
- [최종 브랜치 CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33994826188)
- [병합 후 main CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33994932959)
- [Wiki 수정 PR #167](https://github.com/ethanhee890-commits/dex-company-wiki/pull/167)
- [현재 상태 동기화 Issue #55](https://github.com/ethanhee890-commits/dex-company-wiki/issues/55)
- [Phase 3 Issue #28](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28)

Rollback은 이 복구의 검수된 commit만 revert하는 PR로 진행하며 기존 기록이나 무관한 변경을 되돌리지 않아요.
