# Plus 유지보수 시작·인계

- Task ID: `DEX-PLUS-READINESS-20260919`
- 기준: 최신 승인 Wiki `main`; 이 문서는 진입점이며 `AI_CONTRACT.md`를 대체하지 않아요.
- 비용: 구독 포함량만 사용. paid API, extra usage, credit 구매, banked reset 자동 사용 금지.
- 결과와 다음 실행: `10_Projects/DexCompany-Ops/Tasks/DEX-PLUS-READINESS-20260919/RESULT.md`와 `SESSION_HANDOFF.md`.

## Pro $200 전환 안전장치

OpenAI는 2026-09-10부터 Pro $200(Pro 20X) 신규 가입·업그레이드를 일시 중단했어요. 기존 Pro $200 갱신과 Pro $100은 영향받지 않아요. 현재 Pro $200에서 Plus로 취소·다운그레이드하면 현 결제 주기 종료까지 유지되고, 종료 전에는 예약 변경을 되돌릴 수 있어요.

접근 종료 뒤 최대 30일의 1회 복귀 경로는 계정별 자격 조건이 있어요. 따라서 자동 취소·다운그레이드·재가입은 하지 않으며, 변경 직전에 [Pro 등급 공식 안내](https://help.openai.com/en/articles/9793128-about-chatgpt-pro-tiers)와 계정 Billing/Pricing UI를 함께 확인해요. 실제 플랜·결제 종료일·복귀 자격은 확인 전까지 `Not Checked`예요.

## 완료된 작업은 반복하지 않아요

| 영역 | 확인한 완료 기준선 | 이어갈 항목 |
|---|---|---|
| Dex Plus 프로필 | Runtime #240 / `438c578307c3af77fa9be05fab8fb84879453ed3`; Wiki #206 | 실제 Plus 계정의 승인 host에서 model 선택·구독 E2E |
| 지구라디오 Plus 소스 | Sites source `ad832edc62da1e7a564ffe7b02fdef875936cfcd` | 운영 smoke와 새 검사 결과; 저장 version과 실제 deployment를 구분 |
| 디자인 품질 | Runtime #235 / `dd461ac508f950bd3757db48795655e623e31b21`; Wiki #192 | 기존 `DEX-DESIGN-QUALITY-20260917`의 승인 host 설치·새 세션·P1~P3 실측 |
| 다른 AI 인계 | 기존 GitHub Task Bus와 handoff schema를 재사용 | receiving provider에서 동일 Task 수신·재개 receipt |

위 SHA는 확인 기준선이에요. 새 작업 시작 시 최신 main/프로젝트 소스와 비교하고 이후 변경을 보존해요. source/CI PASS를 설치·실사용·절감률 PASS로 확대하지 않아요.

## 최소 컨텍스트로 시작해요

1. 계약과 프로젝트 시작 순서를 유지하되 같은 세션에서 SHA가 동일한 원문은 재출력하지 않아요.
2. 같은 내용의 상태 블록은 완전 일치 여부를 확인해 한 번만 읽어요. 고유 정책이나 과거 근거는 삭제하지 않아요.
3. Task의 `RESULT.md` → `SESSION_HANDOFF.md`에서 이미 끝난 일과 다음 실행을 확인해요. 필요한 세부 evidence만 열어요.
4. 검증은 관련 결정적 검사부터 실행하고 실패 원인이나 필수 gate가 요구할 때만 넓혀요. 한 번 성공한 같은 SHA의 build를 이유 없이 반복하지 않아요.
5. 인계에는 Task ID, 목표·제약, 최신 refs, 완료/미완료, 승인 범위, 다음 실행, 검증·rollback만 포함해요. Secret·계정 cookie·원문 진단 dump는 넣지 않아요.

## 모델 선택과 한도

Runtime은 실제 `account/read`의 Plus 확인 뒤 `plus-efficient`를 선택해요. 모델 catalog와 기존 권한·품질 gate를 유지해요. Pro/unknown은 기존 balanced 경로이며 플랜을 추측해서 Plus로 강제하지 않아요.

이 정책은 Chat/Work 화면의 모델을 변경하지 않아요. 해당 화면에서 자동 선택 능력이 확인되지 않으면 작은 작업 범위와 최소 자료로 사용량을 관리해요. 실패가 네트워크·권한·입력 누락 때문이면 큰 모델로 반복 실행하지 않아요.

## 기기·AI가 바뀔 때

기존 Task ID와 미완료 항목을 그대로 이어가요. 승인된 실행 host가 필요한 설치·실기기 검사는 host가 없으면 `Not Checked`로 남기고 다른 작업을 진행해요. 에던에게 같은 목표를 다시 설명하게 하지 않아요.

Claude 계정 접근이 확인되지 않으면 GitHub에 인계 자료를 준비한 상태까지 기록해요. 파일을 만들거나 validator가 통과한 것만으로 Claude가 수신·실행했다고 표시하지 않아요.

## 공식 근거와 측정 범위

[OpenAI 공식 Pricing](https://learn.chatgpt.com/docs/pricing), 2026-09-19 확인: Work/Codex 공유 사용량, 작은 모델·필요한 source·짧은 지침 사용 권고. 특정 절감률이나 요금제 종료 시각은 확인하지 않았어요. 실제 계정 Usage 전후 측정 없이 절감 퍼센트를 보고하지 않아요.
