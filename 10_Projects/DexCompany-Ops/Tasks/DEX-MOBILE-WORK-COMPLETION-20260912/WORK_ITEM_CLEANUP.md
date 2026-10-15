# Dex 열린 작업·상태 정리표

> Public-copy redaction (2026-10-16): individual project records were removed at the owner’s request. Remaining historical results apply only to their original revision and scope.

> 아래 SHA와 분류는 초기 점검의 역사 기록이에요. 최신 main·CI·병합 처리와 미완료 항목은 [전체 개선 기록](../DEX-PORTABLE-OS-20260912/MERGE_REVIEW.md)이 대체해요. 이 표만으로 과거 PR을 병합하거나 오래된 snapshot으로 되돌리지 않아요.

## 확인 기준

- Wiki main: 8a8d00a5699fe840d740c45dd602eb71b329b260
- Runtime main: 2ce22c07af27071b194150d46c375b5bc56f0c3f
- Runtime main CI: 34527981709 PASS
- 현재 핵심 Gate: Issue 28 OPEN, Issue 34/35 blocked, physical Windows E2E Not Checked

## 상태 문서 drift

CURRENT_STATE.md와 DexCompany-Ops의 PROJECT_CONFIG.md, CURRENT.md, SESSION_HANDOFF.md 상단 snapshot은 Runtime PR 193의 f5f46ccf8f36d0bb2c88d20e959ed4b0e6353b61을 가리켜요. 실제 Runtime main은 이후 PR 23이 병합된 2ce22c07af27071b194150d46c375b5bc56f0c3f예요.

영향은 기능 Gate 변경이 아니라 Runtime head·CI 포인터 불일치예요. PR 23은 screen-spec source를 1.1.0으로 올렸지만 Issue 28/34/35의 상태를 바꾸지 않았어요.

최소 수정안:

1. 생성 원본 OPS_SNAPSHOT 또는 동등한 단일 입력을 Runtime PR 23 / 2ce22c07 / CI 34527981709로 갱신해요.
2. root/project current, handoff, QA, sources, changelog의 생성 snapshot만 fan-out해요.
3. preserved historical section은 수정하지 않아요.
4. physical Windows Not Checked, Issue 28 OPEN, Issue 34/35 blocked, 비용·권한 설정은 유지해요.
5. Runtime PR 194는 draft security change로 별도 표시하고 main 포인터로 오인하지 않아요.
6. Wiki Issue 41의 consistency check로 의도적 stale fixture와 실제 snapshot을 검증해요.

이 Task branch는 같은 current 문서를 수정하는 열린 Wiki PR 12/16과 충돌하지 않도록 수정안만 기록하고 generated snapshot은 직접 덮어쓰지 않아요.

## 열린 Wiki PR

| PR | 분류 | 근거와 처리안 |
|---|---|---|
| 164 | stale/review-needed | late automation watch와 audit 미해결 문구가 현재 CI moderate 2 및 Runtime PR 194보다 오래됐어요. 고유 source만 비교하고 그대로 merge하지 않아요. |
| 84 | superseded draft | PR 23 충돌·과거 PR 97 실패를 전제로 해요. PR 23은 merge, PR 97 최신 CI는 PASS이며 스킬 Task가 main에 반영됐어요. |
| 16 | superseded | PR 27 open, Issue 28 unimplemented라는 과거 상태예요. 현 snapshot과 직접 충돌하므로 merge하지 않아요. |
| 7 | concept retained / rewrite-needed | GitHub Native Bridge 개념은 유효하지만 모바일 plugin/MCP 가정이 현재 Issue 34와 달라요. 최신 surface 근거로 다시 작성해야 해요. |
| 5 | superseded | Runtime PR 14와 137-test 시대의 handoff예요. 현재 상태 문서에 대체됐어요. |

## 열린 Wiki Issue

| Issue | 분류 | 처리안 |
|---|---|---|
| 41 | active | 이번에 확인된 snapshot drift의 대표 추적 Issue로 유지해요. |
| 6 | completed-work residue | Production PWA write/idempotency는 현재 문서에서 PASS예요. Task 결과 연결을 확인한 뒤 수동 close 후보예요. |
| 2 | superseded/split | 초기 preview 배포 항목은 현재 Runtime 이슈와 state에 분리됐어요. 남은 항목을 Issue 28/34와 매핑한 뒤 수동 close 후보예요. |

## 열린 Runtime PR

| PR | 분류 | 근거와 처리안 |
|---|---|---|
| 194 | active draft | Issue 189 moderate 2의 lockfile-only 최소 수정이에요. CI·독립 검수 PASS 전 merge하지 않아요. |
| 97 | active draft / host-blocked | 1.2.0 후보와 CI PASS, 실제 승인 host 설치·렌더·rollback은 Not Checked예요. |
| 186 | tracking-only review-needed | 단일 watch 문서예요. 최신 main과 automation dedupe, PR 194 근거를 비교해 고유 내용만 남겨요. |
| 157 | superseded/merge-conflicted | 32개 파일의 옛 Phase 3 hardening draft이고 mergeable false예요. PR 187/193과 현재 runbook에 흡수된 범위를 비교한 뒤 수동 close 후보예요. |
| 98 | tracking-only stale | 2026-09-02 result-source analytics 단일 문서예요. Issue 99와 최신 provider watch에 고유 근거가 있는지만 확인해요. |

## Runtime Issue 우선순위

1. Issue 28: active P0. 공통 안전과 선택한 실행 환경의 전체 matrix가 해당 경로의 Gate예요. Windows 항목은 Windows 실행에만 적용해요.
2. Issue 189: active security, PR 194 전체 CI는 PASS이고 별도 독립 검수가 남았어요.
3. Issue 34/35: blocked. 공통 안전 + 선택 실행 환경 + 해당 기능·scope의 증거와 승인 전 활성화하지 않아요. 설계·검증 준비는 계속하고 Windows 전체 완료를 포괄 조건으로 삼지 않아요.
4. Issue 190: approved Windows provider 확인이 남은 별도 Gate예요.
5. 나머지 WATCH Issue: stable/capability 변화가 있을 때만 갱신하고 매 실행 반복 알림은 하지 않아요.

삭제, close, merge는 수행하지 않았어요.
