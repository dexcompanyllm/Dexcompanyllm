# SNS 후보 3종 결합 시험 결과와 인계

> 이 문서는 사전 시험 당시 기록이에요. 이후 1·2위의 운영 코드·규칙 반영은 [후속 통합 결과](INTEGRATION_RESULT.md)를 확인해요. 3위 도입 보류는 유지해요.

**작은 사전 시험을 완료했어요. 1·2위 방식을 이번 시험에 활용했고, 3위의 운영 도입은 보류해요.**

- Task: DEX-SNS-HARNESS-PILOT-20260917
- 검증일: 2026-09-17 UTC
- 기준선: Wiki `baa2984ac441d26702cabddad4172760c1a993ee`, Runtime `e22d350fa6da9786bc45152959f42f826716e119`
- [재현 코드·상세 결과](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/b59769a21fb1c5c59263e9b1cd2ce60256426867/docs/experiments/DEX-SNS-HARNESS-PILOT-20260917/README.md)
- [원시 실행 결과](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/b59769a21fb1c5c59263e9b1cd2ce60256426867/docs/experiments/DEX-SNS-HARNESS-PILOT-20260917/results.json)
- [독립 검수](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/b59769a21fb1c5c59263e9b1cd2ce60256426867/docs/experiments/DEX-SNS-HARNESS-PILOT-20260917/REVIEW.md)
- Runtime [PR #236](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/236)의 CI·병합 상태는 해당 PR의 실제 기록을 따라요.

| 후보 | 확인 | 판단 |
|---|---|---|
| 1위: 완료 주장과 증거 대조 | 파일럿 검증기가 잘못된 합성 완료 주장 4개를 거부하고 오염된 인계문을 성공 근거로 쓰지 않았어요. | 기존 증거 검증 안에서 활용해요. 실제 AI 오류 감소는 미확인이에요. |
| 2위: 업무·계산 기준 재사용 | 고정된 시험용 정의로 작업 3개·시도 4개·완료 2개를 재현하고 기준 충돌을 거부했어요. | 재사용 방식은 작동해요. 실제 업무의 설명·수정 감소는 미확인이에요. |
| 3위: Harness 구독 연결 | 원본 코드의 API/Gateway 우선 선택, 구독 미발견 시 빈 환경 반환을 확인했어요. | 현재 Dex의 구독 전용·승인 기준을 유지한다는 증거가 없어 운영 도입을 보류해요. |

## 검증 범위

- 8개 사례 중 7개 검사 PASS, 실제 구독 AI 작업 1개 Not Checked예요.
- PASS는 위험 동작을 포함한 예상 결과의 재현이에요. 3위의 운영 안전성 통과가 아니에요.
- 원본 TypeScript 5개와 라이선스의 Git blob SHA를 검증했고, 합성 환경·reader와 부작용 의존성 대역으로 실행했어요.
- 독립 검수자가 복사본에서 동일 결과를 재현했고, 다른 검수자가 소스·인증 경계를 대조했어요.
- 실제 Codex/Claude CLI가 PATH에 없고 승인된 실행 host에 연결되지 않아 로그인·AI 실행은 하지 않았어요.
- 실제 구독 한도·과금·Sandbox 비용·기기 호환성·LLM 지시 오염 방어·dex-watchdog 실행은 Not Checked예요.
- 시간·품질·추가 설명·추가 승인·추가 수정의 변화는 각각 Not Checked예요. 이번 작업에서 에던에게 추가 입력을 요청하지 않았지만 개선 효과로 환산하지 않아요.

## 기존 방식과 차이

기존 Runtime에는 이미 API 키 거부, 구독 계정 확인, 환경변수 허용 목록, Watchdog·별도 verifier를 통한 완료 처리와 복구가 있어요. 이번 시험이 이를 처음 만들거나 강화했다고 주장하지 않아요. 운영 코드·정책·설정·의존성 변경은 없어요.

학습 반영 범위는 출처·반례·재현 코드·판단의 보존과 시험 내부의 검증 방법 활용이에요. 모델 자체 재학습이나 Dex 전체의 새 실행 기능 활성화가 아니에요.

- sourceObserved/sourceReviewed: 공식 Vercel `c559a12ec071f69c290f128f062fc3b564343528` 확인·독립 검수 완료
- sourceApplied: 격리 시험에만 적용
- installed: scratch에서 문서 확인용 ai@7.0.105 설치; Runtime dependency·CLI·운영 host 설치 없음
- behaviorVerified: 인증 선택 모듈·합성 검증·집계만 확인
- live behavior: Not Checked

## 인계·복구·다음 최소 행동

3위 도입을 재개하려면 승인된 구독 host에서 API/Gateway 우회 차단과 현재 수준의 승인 통제를 먼저 확인해요. 이후 기존 방식과 같은 작은 작업을 비교하고 기존 Task 기록으로 품질·총 시간·추가 설명/승인/수정을 각각 평가해요.

하나라도 에던의 부담이 늘거나 품질 개선 없이 시간만 늘면 확대하지 않고 축소·복원해요. 기존 사용자 변경과 정상 실행 경로를 보존해요. 새 설문·평가표를 에던에게 요구하지 않아요.

이번 Task에서 필요한 에던의 추가 행동은 없어요. 시험 때문에 미검증 연결·새 권한·추가 요금 활성화를 요청하지 않아요. 재현 자료를 되돌릴 때는 이 Task 기록과 Runtime의 해당 실험 폴더만 제거하면 돼요. 운영 설정은 변경하지 않았어요.
