# Codex Windows / Sites / Recap / Diagnostics Watch — 2026-09-02

- Status: Canonical provider-watch evidence
- Provider: OpenAI Codex
- Previous cutoff: `2026-09-01T16:06:51Z` (OpenAI PR #42086)
- Wiki baseline: `3a88ada6b7a73150264b6fd782e0ef5507dde1ac`
- Runtime baseline: `85c8e73e5ac30825f2e2b512b18caa83c172221f`
- Runtime after this watch: PR #74 merge `30bbdd8cdef60d15c6dddc89f54e6d53be743295`

## Summary

새 stable 릴리스는 없지만 이전 watch 이후 OpenAI Codex upstream `main`에 Dex와 직접 관련된 Windows 보안 가용성, diagnostic upload transport, Sites plugin precedence, TUI recap control 변화가 병합됐어요. 모두 `0.152.0` 이후 변경이라 승인된 Dex host capability로 승격하지 않았고 future stable/approved-host Gate만 추가했어요.

## Confirmed

### PR #42094 — Windows MXC availability

- Merged `2026-09-01T16:41:23Z`, commit `ade0ccacf9182e665cf784de041c51a79e35bc31`
- https://github.com/openai/codex/pull/42094
- native Windows MXC process-security environment 사용 가능 여부를 sandbox selection 시 probe해요.
- `codex.windows_mxc.available` metric을 process당 최대 한 번 기록해요.
- MXC workspace build dependencies와 GNU Windows toolchain용 `tracelogging` pin이 추가됐어요.

### PR #42096 — diagnostic upload resilience

- Merged `2026-09-01T16:51:36Z`, commit `a17ee5705c270ef5f243bd7f22c845341768f365`
- https://github.com/openai/codex/pull/42096
- diagnostic report 하나에 event, attachments, retries, backoff를 공유하는 5분 deadline을 적용해요.
- deadline 또는 Sentry rate limit 이후 남은 attachment read/send를 중단해요.
- App Server는 concurrent report upload를 3개로 제한하고 초과 요청은 overloaded JSON-RPC error로 거부해요.

### PR #42100 — remote Sites over bundled fallback

- Merged `2026-09-01T17:01:14Z`, commit `b6ab99ed87844a357e24c281f092db2bf2b05b9f`
- https://github.com/openai/codex/pull/42100
- remote Sites plugin이 설치되고 local bundle이 있으면 `sites@openai-bundled`를 account/backend scope에서 제외해요.
- catalog, search, direct read/install, runtime loading, hooks, Skill cache에 동일 precedence를 적용해요.
- remote local files가 없으면 bundled fallback을 복구하고 availability check를 60초 throttle해요.
- restart persistence, account/backend isolation, fallback restoration, concurrent checks와 Skill loading 테스트가 포함돼요.

### PR #42101 — TUI automatic recap opt-out

- Merged `2026-09-01T17:11:34Z`, commit `8ea297ff604f358d0e973f1abc34743b56dfcf92`
- https://github.com/openai/codex/pull/42101
- `tui.auto_recap`이 추가되고 upstream default는 `true`예요.
- `false`이면 automatic recap scheduling/request/pending result를 취소·거부·discard하고 retry하지 않아요.
- manual `/recap`은 계속 사용할 수 있어요.

### PR #42102 — reusable OTEL trace WebSocket

- Merged `2026-09-01T17:20:04Z`, commit `9969043b95339ec008b2f2f317f664d763fa4825`
- https://github.com/openai/codex/pull/42102
- code-mode host의 loopback OTLP receiver/WebSocket listener를 reusable crate로 분리하고 lifecycle/shutdown을 통합해요.
- 현재 Dex optional code-mode/REPL capability는 비활성이라 immediate operational change는 없어요.

### Stable / pricing check

- GitHub `openai/codex` latest non-prerelease release는 계속 `0.152.0`, published `2026-09-01T01:58:32Z`예요.
- 위 PR들은 모두 `0.152.0` 이후 merge됐어요.
- 이번 구간에 subscription-first 정책을 바꿔야 할 새로운 공식 Codex pricing/usage-limit 변화는 확인되지 않았어요.

## Inference

- MXC availability metric은 Windows readiness 진단에 유용할 수 있지만 실제 task sandbox enforcement의 증거를 대신할 수 없어요.
- diagnostic upload는 느린 네트워크에서 더 신뢰성 있어졌지만 최대 5분간 egress가 지속될 수 있으므로 explicit consent와 pre-upload secret/sensitive-context scan이 더 중요해요.
- remote Sites precedence는 duplicate catalog/wrong Skill loading을 줄여 재작업 감소에 유리해요. OpenAI Sites 전용 exclusion을 Dex 전체 legacy Skill/Plugin 삭제 정책으로 일반화하면 안 돼요.
- `tui.auto_recap=false`는 provider-local background work를 줄일 가능성이 있지만 subscribed-plan allowance 절감과 long-task recovery 영향을 측정하기 전 기본값을 바꾸면 안 돼요.

## Proposal applied

Runtime PR #74에서 실행 코드나 host 설정을 변경하지 않고 future-stable Gate만 추가했어요.

- Windows MXC probe와 실제 sandbox canary를 교차검증해요.
- diagnostic auto-upload는 금지 유지하고 explicit initiation, attachment inventory/redaction/secret scan, cancel/deadline/concurrency 검증을 요구해요.
- Sites는 account/backend isolation, fallback restoration, cache consistency와 unrelated legacy Skill/Plugin deletion 0을 검증해요.
- TUI recap은 stable 후 usage/rework 측정 결과가 이득일 때만 `auto_recap=false` 권고 후보로 올려요.
- provider telemetry/plugin state/recap state는 canonical Task identity·승인·권한·billing authority로 사용하지 않아요.

Tracking:

- Runtime #30: Windows MXC stable/approved-host Gate
- Runtime #25: diagnostic upload + TUI recap stable/approved-host Gate
- Runtime #75: remote Sites precedence/fallback 전용 watch issue

## Unknown / Not Checked

- #42094/#42096/#42100/#42101/#42102 최초 포함 stable
- approved Windows host의 MXC probe ↔ 실제 sandbox parity
- diagnostic consent UI, cancel/retry behavior, attachment redaction E2E
- approved host의 Sites 설치 상태와 remote/bundled precedence E2E
- `tui.auto_recap`의 실제 subscribed-plan allowance 영향
- Work/mobile/desktop parity
- trace WebSocket의 future public/stable relevance

## Safety boundary

이번 watch에서 prerelease/experimental capability, MXC/Windows policy 변경, diagnostic upload, plugin/Skill auto-install·update·reconcile·delete, legacy cleanup, `tui.auto_recap` host setting 변경, broader filesystem/OAuth/MCP/device permission, paid API·automatic paid fallback·extra paid usage·credit/reset, Browser/CDP·Computer Use·Remote Control·Voice/Realtime·외부 메시징은 실행하지 않았어요.

## Verification

Runtime PR #74:

- changed files: `1`, `+151 / -0`, unexpected file change `0`
- branch validation `33538046127`: **PASS**
  - Install dependencies: PASS
  - Static checks, unit tests, smoke test: PASS
  - Production dependency audit: PASS
- merge: **PASS**
- Runtime main: `30bbdd8cdef60d15c6dddc89f54e6d53be743295`
- merge Vercel: **PASS — Deployment has completed**
- merge-SHA separate GitHub Actions: **Not Checked — no run returned**

Overall:

- Official upstream verification: **PASS**
- Latest stable verification: **PASS — 0.152.0**
- Runtime branch CI/security: **PASS**
- Runtime merge/Vercel: **PASS**
- FAIL: **none**
- Future stable / approved-host E2E: **Not Checked**
