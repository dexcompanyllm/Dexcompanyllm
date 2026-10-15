# Codex global reset — 2026-09-07 response

- Recorded: 2026-09-08 (Asia/Seoul)
- Scope: OpenAI Codex usage-limit/reset policy evidence
- Status: `PASS_WITH_ACCOUNT_APPLICATION_NOT_CHECKED`

## Confirmed

OpenAI Help Center의 `How banked Codex resets work` 문서가 2026-09-08 재확인 시 다음 내용을 명시해요.

- OpenAI는 2026-09-07 Plus, Pro, Business 사용자에게 **global reset**을 제공했어요.
- 이 reset은 계정에 **즉시 적용**되며 나중에 사용할 수 있도록 저장되지 않아요.
- 따라서 `banked reset`으로 표시되지 않아요.
- banked reset과 automatic/global reset은 서로 다른 메커니즘이에요.
- banked reset은 사용자가 직접 적용하지만, automatic/global reset은 eligible usage limit에 직접 적용돼요.
- future reset은 보장되지 않아요.

Official source:
- https://help.openai.com/en/articles/20001498-how-banked-codex-resets-work

## User impact

`confirmed`: Pro 사용자는 이번 2026-09-07 global reset의 공식 대상 plan에 포함돼요.

`unknown`: 특정 계정에서 실제 reset이 적용된 정확한 시각, 적용 전후 사용량, 계정별 예외 여부는 공개 문서만으로 확인할 수 없어요. 실제 계정의 Settings → Usage가 account-specific authority예요.

`inference`: 2026-09-07 전후 Codex 주간/단기 사용량이 예고 없이 회복된 경우, 이번 global reset이 원인일 가능성이 높아요. 다만 계정 Usage evidence 없이 특정 과거 변화를 이 reset으로 단정하지 않아요.

## Dex policy

- `automatic/global reset`과 `banked reset`을 계속 별도 상태로 기록해요.
- global reset은 자동 적용이므로 Dex가 소비하거나 보존할 수 있는 user-controlled entitlement로 취급하지 않아요.
- banked reset은 계속 Ethan의 명시적 결정 없이는 사용하지 않아요.
- global reset 발생 뒤 usage forecast는 이전 reset timestamp/remaining allowance를 이어 계산하지 않고 계정 Usage UI 기준으로 다시 잡아요.
- provider 공지나 Help 문서만으로 특정 계정의 실제 남은 사용량을 추정하지 않아요.
- future free reset을 가정해 workload를 과도하게 배치하지 않아요.
- included usage가 끝나도 paid API, automatic paid fallback, extra paid usage로 자동 전환하지 않아요.

## QA

### PASS
- Official OpenAI Help source rechecked on 2026-09-08.
- September 7 global reset, immediate application, non-bankable semantics recorded.
- Existing subscription-first and banked-reset explicit-decision guardrails preserved.
- No reset redemption, billing change, paid API/fallback, permission change, or Runtime behavior change performed.

### FAIL
- None in this documentation scope.

### Not Checked
- Ethan의 계정에서 실제 2026-09-07 global reset이 적용된 timestamp와 전후 allowance.
- Settings → Usage 현재 값.

## Relationship to prior guidance

이 문서는 `CODEX_USAGE_RESET_GUIDANCE_20260831.md`의 일반 reset 정책을 대체하지 않고, 2026-09-07에 발생한 새로운 official event evidence를 추가해요. 두 문서가 충돌하면 더 최신 공식 OpenAI 문서와 account Usage UI를 다시 확인하고 `unknown`으로 fail-closed해요.
