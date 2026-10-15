# 같은 작업 이어가기

> Public-copy redaction (2026-10-16): individual project records were removed at the owner’s request. Remaining historical results apply only to their original revision and scope.

Task: `DEX-PLUS-READINESS-20260919`; child design Task: `DEX-DESIGN-QUALITY-20260917`.

## 시작

최신 승인 Wiki main의 AI_CONTRACT와 프로젝트 순서를 확인한 뒤 이 Task RESULT/QA를 읽어요. 같은 세션에서 같은 blob SHA의 원문을 다시 출력하지 않아요. 원래 목표·제약·승인은 TASK.md에 있어요.

## 완료 제외

- Dex Plus Runtime #240, Wiki #206: 재구현하지 않아요.
- Design #235, Wiki #192 실제 source 병합/CI: 재병합하지 않아요.

## Pro $200 플랜 변경 전 확인

현재 계정이 Pro $200인지 추측하지 않아요. Plus 전환을 실제로 실행하기 직전에 Billing/Pricing UI에서 현재 등급, 결제 주기 종료일, 예약된 다운그레이드, 1회 복귀 자격을 확인해요. 신규 가입·업그레이드 중단이 유지되는 동안에는 자동 취소·다운그레이드·재가입을 실행하지 않아요. 종료 전 되돌리기와 종료 후 30일 복귀는 서로 다른 경로이며, 후자는 계정별 자격과 1회 제한을 공식 도움말·UI에서 다시 확인해요.

## 다음 실행 — capability가 있을 때만

1. **승인 Plus host:** 현재 Runtime의 실제 `codex:status`, 구독 인증, `account/read` planType과 authenticated model catalog를 확인해요. routine/standard 읽기 전용 업무 각각 한 건의 effective profile/model/effort를 기록해요. 실제 Plus가 아니면 미확인으로 남겨요.
2. **승인 디자인 host:** 원래 `DEX-DESIGN-QUALITY-20260917/PILOT_PLAN.md`와 최신 `docs/DEX_PLUGIN_MIGRATION.md`를 사용해 설치·새 세션 discovery/호출을 확인해요. actual CLI help·resolved source·rollback을 확인한 뒤 P1~P3 A/B를 진행해요. 임의 새 화면으로 효과를 대신 측정하지 않아요.
3. **Claude/Gemini:** 승인된 해당 계정의 GitHub/기존 인계 경로로 같은 Task를 읽고 마지막 안전 checkpoint에서 재개해요. 실제 receiver receipt 전에는 수신 완료로 기록하지 않아요. 회사 계정이면 개인 repository 공유 범위와 workspace 정책을 먼저 확인해요.

## 종료와 rollback

소스·실제 실행·수신·효과 측정을 각각 판정하고 RESULT/QA에 exact SHA와 evidence를 기록해요. Runtime·Wiki source 변경이 필요하면 branch/PR/검수 경계를 유지해요. 미측정은 실패로 간주하지 않으며 자동 rollback 사유가 아니에요. 이 Task 변경만 별도 revert하고 기존 Plus #240·디자인 #235·legacy·운영 설정은 보존해요.

## 승인과 비용

현재 요청과 기존 Task의 승인 범위는 유지돼요. 유료 API, extra usage/credit, banked reset 자동 사용, 권한 확대, legacy 삭제와 무관한 배포는 허용되지 않아요. 실행 환경 연결이 없다는 이유로 사용자에게 원래 목표를 다시 입력하게 하지 않아요.
