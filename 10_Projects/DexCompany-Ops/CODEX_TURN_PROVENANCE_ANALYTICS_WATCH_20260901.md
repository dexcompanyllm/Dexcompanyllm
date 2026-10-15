# Codex turn provenance analytics watch — 2026-09-01

## 확인 범위

직전 provider-watch 이후 OpenAI 공식 Codex upstream과 Dex Company의 승인된 GitHub `main`을 최소 범위로 비교했다.

## confirmed

OpenAI Codex PR #42003, merge commit `2b7c279735d0d096cf7b34fe98938f46792f4d4f`,가 `codex_turn_event` analytics에 `turn_trigger`와 `codex_turn_source`를 추가했다.

- `turn_trigger`는 turn 시작 시 caller가 제공한 trigger다.
- `codex_turn_source`는 effective Responses metadata의 `source`를 따른다.
- configured metadata가 client metadata보다 우선한다.
- accepted steer metadata가 이후 analytics의 source를 갱신할 수 있다.
- 기존 Responses metadata value limit을 넘는 trigger/source는 analytics에서 생략된다.
- upstream test는 serialization, turn lifecycle, configured/client precedence, steering update, size limit을 포함한다.

Official source: https://github.com/openai/codex/pull/42003

최신 official non-prerelease Codex release는 계속 `0.152.0`이며 PR #42003은 0.152.0 release 이후 merge됐다. 따라서 현재 Dex에서는 upstream-main watch evidence이고 stable capability가 아니다.

## inference

향후 stable에 포함되고 public/stable telemetry surface가 확인되면 bounded source/trigger 정보는 Chat·Work·Codex 등 surface 간 routing과 steering 문제를 raw prompt 없이 진단하는 보조 신호가 될 수 있다. 이는 잘못된 route 원인 분석과 재작업을 줄이는 데 유리하다.

## proposal

`turn_trigger`와 `codex_turn_source`는 향후 사용하더라도 advisory observability로만 취급한다.

- Task identity, authentication, authorization, approval, idempotency, filesystem permission, mutation authority로 사용하지 않는다.
- GitHub Task ID, canonical Result/receipt, OAuth/workspace policy, broker state, verifier evidence가 계속 authoritative하다.
- Dex evidence에 복사할 경우 allowlist와 size bound를 적용한다.
- upstream analytics가 필드를 제공한다는 이유만으로 raw chat history나 telemetry 수집 범위를 확대하지 않는다.
- client 또는 steer가 제공한 source metadata가 write 승인이나 retry semantics를 바꾸지 못하게 한다.

## unknown

- PR #42003을 처음 포함할 official stable version
- trigger/source의 최종 documented taxonomy
- Dex가 사용하는 stable App Server/public telemetry surface에서의 실제 노출 형태
- upstream analytics의 retention과 user-facing availability

## Dex 반영

Runtime PR #64를 watch-only 변경으로 검증·merge했다.

- Runtime PR: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/64
- Runtime current main after merge: `9dba47b392f94616f82605e841bdb053367a9303`
- Runtime execution baseline remains PR #63: `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- PR #64 branch validation: 209 total / 208 PASS / 0 FAIL / 1 Windows-only SKIP; static/syntax/JSON/dependency/secret scan, smoke, Vercel adapter smoke, rollback check PASS; production dependency audit 0 vulnerabilities
- PR #64 merge commit Vercel status: PASS
- Runtime #34에 future stable / approved-host telemetry gate를 추가했다.

Runtime #28 Phase 1은 PR #63으로 구현·검증 완료됐고 #28은 계속 OPEN이다. 다음 bounded work는 Phase 2 PWA + read-only MCP canonical status/result retrieval, 이후 Phase 3 broker↔DexWorker + approved Windows-host Unified Task E2E다.

## Future stable / approved-host Gate

- [ ] PR #42003을 포함하는 official stable 식별
- [ ] approved Windows host에서 generated schema/public telemetry surface 확인
- [ ] configured-over-client precedence와 accepted-steer source update 확인
- [ ] oversized/unknown value가 bounded/omitted되어도 Task 실행이 깨지지 않음
- [ ] trigger/source가 auth, approval, filesystem permission, Task state, retry, writer selection, result publication에 영향 0
- [ ] cross-surface source 정보는 optional bounded evidence일 뿐 canonical Task provenance를 대체하지 않음
- [ ] telemetry 부재/실패가 worker replay 또는 duplicate mutation을 유발하지 않음
- [ ] paid API, broader permission, external messaging, 새로운 data-egress가 필요하지 않음

## PASS / FAIL / Not Checked

- PASS: official upstream PR #42003 확인
- PASS: latest stable `0.152.0` 및 post-release merge 판정
- PASS: Runtime PR #64 branch validation/security checks
- PASS: Runtime PR #64 merge + merge-commit Vercel status
- FAIL: 없음
- Not Checked: post-merge Runtime Actions run — merge commit에 별도 workflow run이 생성되지 않음
- Not Checked: future stable inclusion / approved Windows-host telemetry E2E

## 안전 경계

prerelease/experimental capability, paid API, automatic paid fallback, extra paid usage, broader permission, plugin/skill auto-install·update·reconcile·delete, Voice/Realtime, Browser/CDP, Computer Use, Remote Control, external messaging은 이 watch에서 활성화하지 않았다.
