# ChatGPT Plus 절약형 Dex 운영 프로필

- 적용일: 2026-09-19
- 상태: Runtime source merged / branch CI PASS / main Vercel PASS
- Runtime PR: [#240](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/240)
- Runtime main: `438c578307c3af77fa9be05fab8fb84879453ed3`
- 공식 근거: [OpenAI Docs — Pricing](https://learn.chatgpt.com/docs/pricing)

## 목적과 경계

ChatGPT Plus의 Work·Codex 공유 사용량 안에서 Dex의 일상 운영을 지속할 수 있도록 보통 작업의 모델 비용과 반복 context를 줄여요. 품질·안전 검증을 없애지 않고, paid API·credit·extra usage·automatic paid fallback·Fast mode는 사용하지 않아요.

## 적용한 라우팅

Codex App Server의 `account/read`가 반환한 `planType`과 authenticated model catalog를 읽은 뒤 profile을 선택해요. 수동 plan 환경변수는 추가하지 않았어요. `plus`, `ChatGPT Plus` 등 정규화된 Plus 값만 절약형으로 선택하고, 미확인·Pro·그 밖의 값은 기존 balanced profile을 유지해요.

| workload | Plus profile | effort |
|---|---|---|
| routine | `gpt-5.6-luna` | low |
| standard | `gpt-5.6-terra` | medium |
| complex | `gpt-5.6-sol` | medium |
| critical | `gpt-5.6-sol` | high |

Astra는 Plus의 일반 자동 작업에 사용하지 않아요. Task가 model과 effort를 함께 명시했거나 `reasoning-validation-failure`가 기록된 검수 checkpoint에서만 선택해요. 인증·네트워크·권한·입력 누락 실패는 큰 모델로 우회하지 않고 중지해요.

## context와 검수 절약

- worker는 현재 단계에 필요한 최소 파일만 읽고 관련 없는 저장소 전체 scan을 하지 않아요.
- 이미 받은 증거·canonical reference를 재사용하고 변경되지 않은 증거를 다시 가져오지 않아요.
- 좁은 결정적 검사를 먼저 실행하고 실제 실패가 있을 때만 범위를 넓혀요.
- persistent change의 detached verifier는 유지해요.
- verifier Task에 원본 Task 전체를 두 번째로 복제하지 않고, verifier가 덮어쓰는 원래 objective·base SHA·execution constraint만 별도 보존해요. 기존 acceptance criteria·inputs·validation·allowlist는 같은 cloned packet의 값을 그대로 사용해요.

## 검증 receipt

| 항목 | 결과 |
|---|---|
| Runtime branch CI | [Run 973](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35446160858) PASS — install, static, 전체 unit, smoke, rollback, production dependency audit |
| Vercel preview/main | PASS |
| PR mergeability와 expected head | PASS |
| merge tree | main merge와 검증 head가 동일한 tree `55ad311ae1645c309e07b845b96faa8aa7d2761b` |
| 유료 경로 | disabled 유지 |
| 실제 Plus worker `account/read`·한 작업 E2E | Not Checked — 승인된 subscription worker host가 이 세션에 없음 |
| account Usage 절감 실측 | Not Checked — 적용 전후 동일 업무 표본이 아직 없음 |
| 물리 기기별 접근 | Not Checked — 이 source 변경의 선행 조건은 아님 |

첫 CI Run 971은 구현 결함이 아니라 기존 read-only sandbox guard가 pre-connect 모델 고정 문자열을 검사해 실패했어요. guard를 post-account-detection selector 경계로 갱신한 뒤 Run 973 전체 검사가 PASS했어요.

## rollback과 다음 최소 확인

문제가 있으면 force reset 없이 Runtime PR #240 merge를 revert하는 별도 PR을 사용해요. 라우팅은 매 작업 시작 때 결정되고 migration state가 없으므로 실행 중 worker를 새로 시작한 뒤 balanced profile로 돌아가요.

승인된 Plus worker host를 사용할 수 있을 때 `codex:status`로 `planType: plus`와 model catalog를 확인하고 routine·standard 읽기 전용 작업 각 1건에서 `plus-efficient`·Luna/Terra 선택을 확인해요. 그 전까지 실제 host E2E와 사용량 절감률을 PASS로 바꾸지 않아요.
