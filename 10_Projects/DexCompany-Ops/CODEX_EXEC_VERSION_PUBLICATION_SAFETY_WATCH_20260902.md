# Codex exec-version / publication-safety watch — 2026-09-02

- Verification status: source-backed watch / operational activation 없음
- Dex Runtime evidence: PR #109 / `docs/CODEX_EXEC_VERSION_PUBLICATION_SAFETY_WATCH_20260902.md`
- Runtime head before this watch: `861c80642af7c84a0ff388c5cee734c801d52cd0`

## Source-backed facts

### confirmed — OpenAI Codex PR #42270

PR #42270 (`Report the exec-server release version in environment info`)가 upstream `main`에 merge됐다.

확인된 변경:

- exec-server `EnvironmentInfo`에 `executorVersion` 추가
- `initialize`와 `environment/info`에서 같은 executor release version 제공
- process startup 시 version을 고정해 server lifetime 동안 안정적으로 광고
- legacy/unknown executor에서 값이 없으면 `0.0.0`
- packaged/source initialization, serialization, client metadata caching 테스트 추가

Source: https://github.com/openai/codex/pull/42270

### confirmed signal / unknown root cause — official-repository issues

다음은 OpenAI 공식 `openai/codex` 저장소에 새로 접수된 보고다. 이슈 존재와 보고 내용은 source-backed이지만, root cause·영향 범위·수정 버전은 maintainer가 확정하지 않았으므로 `unknown`으로 둔다.

- #42269 — Windows Desktop에서 edited prompt 이후 reopen/reconnect 시 더 오래된 conversation branch가 보일 수 있다는 보고. 이후 completed turns는 local rollout에 남아 있다고 보고됨.
  - https://github.com/openai/codex/issues/42269
- #42271 — scope drift 뒤 의도하지 않은 repository artifact가 publish됐다는 보고.
  - https://github.com/openai/codex/issues/42271
- #42272 — pending commit/push 전에 들어온 status question이 side effect를 reliably pause하지 않았다는 보고.
  - https://github.com/openai/codex/issues/42272
- #42275 — Plus 5-hour usage가 0에 도달하면 이미 시작된 active task가 validation/finalization 전에 멈출 수 있다는 보고.
  - https://github.com/openai/codex/issues/42275
- #42267 — Windows Desktop에서 기존 Workspace Agent 대화는 열리지만 새 대화에서 Agent discovery/sidebar/`@` 노출이 누락된다는 보고.
  - https://github.com/openai/codex/issues/42267

## Dex inference

- `executorVersion`은 향후 remote/dedicated executor compatibility를 판정할 때 client version 추측보다 더 좋은 evidence가 될 수 있다.
- provider conversation branch rollback은 장시간 Task에서 provider UI를 canonical 상태로 사용하면 stale replay와 중복 작업 위험이 있음을 다시 보여주는 신호다.
- #42271/#42272는 external publication 직전 exact manifest와 late clarification/stop 처리 규칙을 엄격히 유지해야 한다는 신호다.
- #42275는 subscription-first 환경에서 quota exhaustion을 정상적인 recoverable interruption으로 다루고, mutation 뒤 false completion을 막는 checkpoint/verification 경계가 중요하다는 신호다.
- Workspace Agent discovery 문제는 surface UI와 backend capability/authorization을 분리해 판정해야 한다는 신호다.

이 문단은 Dex inference이며 OpenAI가 보장한 사실이 아니다.

## Applied Dex proposal

이번 watch에서는 실행 기능을 켜지 않고 다음 Gate만 강화한다.

1. `executorVersion`은 compatibility provenance로만 사용한다. Task ID, approval, auth, mutation authority가 아니다.
2. version-gated capability에서 missing/unparseable/`0.0.0`은 fail-closed 또는 `Not Checked`다.
3. resume/reconnect 전에 GitHub canonical Task ID, `attemptId`, status/result, base/diff hash와 provider 상태를 재조정한다.
4. external repository publication 전 exact publication manifest를 사용하며 local/generated artifact는 명시 승인 전 제외한다.
5. publication 시작 전에 status/clarification/correction/stop/scope-change가 도착하면 이전 pending publication intent를 무효화하고 남은 side effect에 새 exact instruction/approval을 요구한다.
6. quota interruption 후 deterministic checks와 verifier evidence가 없으면 `completed`를 금지하고 bounded checkpoint를 저장해 recoverable blocked state로 둔다.
7. resume은 같은 canonical Task ID에서 stale attempt 거부 + mutation lock 재획득 후 수행한다. automatic paid fallback은 계속 금지한다.
8. Workspace-Agent/Work discovery UI는 capability evidence일 뿐 canonical auth/availability 증거가 아니다. unsupported surface는 PWA/GitHub Task Bus fallback을 유지한다.

## PASS / FAIL / Not Checked

### PASS

- upstream PR #42270 merge와 핵심 diff 확인
- official repository issue #42267/#42269/#42271/#42272/#42275 존재 및 보고 범위 확인
- 현재 latest non-prerelease Codex release가 `0.152.1`임을 재확인
- Dex Runtime PR #109 docs-only 범위와 branch validation/security checks 확인
- Runtime #28/#34에 future-stable/approved-host Gate 반영

### FAIL

- 없음

### Not Checked

- PR #42270 최초 포함 non-prerelease stable
- approved Windows host의 실제 `executorVersion` 및 legacy/unknown behavior
- #42267/#42269/#42271/#42272/#42275 maintainer-confirmed root cause/fix
- approved Windows host에서 edited-branch rollback / publication pause / quota interruption 재현 및 recovery
- Work/web/desktop/mobile Workspace-Agent discovery parity

## Safety / cost boundary

이번 watch로 다음을 자동 활성화하지 않는다.

- prerelease/experimental capability
- automatic Codex upgrade
- broader filesystem/network/OAuth/MCP permission
- automatic approval / `danger-full-access`
- hosted MCP write / multi-writer
- plugin/Skill install·update·delete·reconcile
- paid API / automatic paid fallback / extra paid usage / banked reset
- automatic merge/deploy
- destructive migration
- external messaging

GitHub `dex-company-wiki` 승인 `main`이 계속 canonical Source of Truth다. Provider UI/thread history, executor metadata, local rollout 파일은 supporting provenance일 뿐 canonical state를 대체하지 않는다.
