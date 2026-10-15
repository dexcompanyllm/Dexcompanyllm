---
type: qa-evidence
status: blocked
created: 2026-09-07
updated: 2026-09-07
claimType: mixed
evidenceScope: local-test
verificationStatus: partial
verifiedAt: 2026-09-07
verifiedBy: Dex
disputed: false
tags:
  - dex-company
  - runtime-190
  - runtime-28
  - codex-0.153.4
  - windows-host
---

# Codex 0.153.4 Windows-host preflight — 2026-09-07

## Scope

Runtime Issue #190을 먼저 검증하고, 모든 선행 검사가 PASS할 때만 Issue #28의 physical Windows-host Unified Task E2E로 진행하는 실행 기록이에요. #34와 #35는 시작하지 않았어요.

검사 기준은 Runtime `main` `ee4f7a67c9b827d264d573aa626d9230f18b3ea2`와 Wiki `main` `28d2544`예요. 기존 수정 중 checkout은 건드리지 않고 최신 `origin/main`의 별도 worktree에서 확인했어요.

## PASS

- 실제 Runtime repository와 활성 Codex command를 로컬에서 확인했어요. 로컬 절대 Runtime 경로는 canonical Wiki에 저장하지 않아요.
- 공식 npm `latest` dist-tag는 비프리릴리스 `0.153.4`였고 `alpha`는 `0.154.0-alpha.3`이었어요. prerelease는 설치하지 않았어요.
- 기존 `0.151.0`이 Astra 최소 조건 `0.153.0+`에 미달함을 확인한 뒤, 변경 범위를 기존 전역 `@openai/codex` 패키지의 `0.153.4` 교체로 제한했어요.
- 업데이트 후 활성 CLI와 설치 manifest가 모두 `0.153.4`를 보고했어요.
- `codex login status`는 ChatGPT 로그인을 보고했고 `OPENAI_API_KEY`는 비어 있었어요.
- paid API, automatic paid fallback, extra usage, credit/reset, prerelease, experimental feature, sandbox/approval 확대는 사용하지 않았어요.

## FAIL

- 첫 `npm run worker:host-check`가 현재 실행 계정이 승인 전용 `DexWorker`가 아니라는 이유로 종료 코드 1을 반환했어요.
- 동일 검사는 반복하지 않았어요. 승인 worker identity를 우회하거나 권한을 넓히지 않았어요.

## Not Checked

- `codex:doctor`, `codex:compatibility`, `codex:status`: 선행 `worker:host-check` FAIL로 미실행
- authenticated App Server `model/list`의 Sol/Astra와 지원 추론 강도
- Sol/Astra 각각의 read-only no-op와 실제 effective model/effort
- Issue #28 Phase 3의 원래 여섯 시나리오와 P3-PERM/P3-CWD/P3-PROCESS/P3-SCOPE
- #34, #35: blocked / 시작하지 않음
- Runtime stable reference `0.151.0`의 승격: 하지 않음

## 재개 조건

승인된 dedicated `DexWorker` 계정의 기존 profile-local ChatGPT 인증과 project registry 환경에서 같은 Runtime `main`을 사용해 `worker:host-check`부터 다시 시작해야 해요. 그 Gate가 PASS하기 전에는 후속 검사나 #28을 실행하지 않아요.

## Sources

- [Runtime Issue #190](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/190)
- [Runtime Issue #28](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28)
- [OpenAI ChatGPT & Codex changelog](https://learn.chatgpt.com/docs/changelog)
- Runtime `docs/WORKER_HOST_SECURITY.md`
- Runtime `docs/PHASE3_LOCAL_BRIDGE.md`
- Runtime `docs/PHASE3_SAFETY_MATRIX.md`

