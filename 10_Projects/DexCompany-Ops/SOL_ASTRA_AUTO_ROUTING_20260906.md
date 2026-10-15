# Sol/Astra 자동 분배 결정 — 2026-09-06

## 상태

- 코드 구현: **PASS**
- Runtime main: `ee4f7a67c9b827d264d573aa626d9230f18b3ea2`
- Runtime PR: [#192](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/192)
- Runtime validation: [#705](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34041400890) — PASS
- Vercel preview: PASS
- 승인 Windows host Astra catalog 확인: **Not Checked**
- 실제 ChatGPT subscription no-op E2E: **Not Checked**

## 결정

Dex의 OpenAI 구독 worker는 Sol을 기본 모델로 사용하고 Astra를 선택적으로 사용해요.

| 작업 등급 | 모델 | 추론 강도 |
|---|---|---|
| routine | gpt-5.6-sol | low |
| standard | gpt-5.6-sol | medium |
| complex | gpt-5.6-sol | high |
| critical | gpt-6-astra | medium |
| critical + high/critical 위험 | gpt-6-astra | high |

`routing.workloadClass` 또는 `execution.complexity`가 있으면 그 값을 사용해요. 둘 다 없으면 실행 위험도가 medium일 때 complex, high/critical일 때 critical, 그 외에는 standard로 자동 판정해요.

Astra 승격은 critical 작업 또는 `reasoning-validation-failure`가 기록된 checkpoint에서만 허용해요. 인증, 네트워크, 권한, 입력 누락은 모델을 바꾸지 않고 중지해요. 전체 작업을 두 모델로 반복 실행하지 않으며 Max/Ultra를 기본값으로 쓰지 않아요.

명시적 override는 모델과 추론 강도를 함께 제공해야 해요. worker는 authenticated App Server `model/list`의 모델과 `supportedReasoningEfforts`를 확인한 뒤 `thread/start.model`과 `turn/start.effort`에 전달하고 결과에 선택 evidence를 기록해요.

## 유지되는 경계

- ChatGPT 관리 구독만 사용해요.
- provider API key, paid API fallback, extra usage, credit/reset 자동 사용은 허용하지 않아요.
- 모델 변경으로 sandbox, approval, worker 또는 OS 권한을 확대하지 않아요.
- 승인 Windows host에서 Astra와 선택 effort가 실제 catalog에 나타나지 않으면 fail-closed하고 Issue [#190](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/190)에 기록해요.

## 다음 확인

승인 Windows host에서 Codex 호환성 검사와 실제 `model/list`를 확인한 뒤 Sol no-op과 Astra no-op을 각각 한 번 실행해 결과의 model/effort evidence를 검증해요. 그 전에는 host rollout을 PASS로 표시하거나 Issue #190을 닫지 않아요.
