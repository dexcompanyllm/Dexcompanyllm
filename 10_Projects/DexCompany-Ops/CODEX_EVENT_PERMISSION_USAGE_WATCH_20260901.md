# Codex event/permission/resume-usage watch — 2026-09-01

## Scope

직전 canonical provider watch(`CODEX_PAGINATED_WAKE_VOICE_HOST_WATCH_20260901.md`) 이후 OpenAI `openai/codex` upstream `main`에 병합된 변화 중 Dex Company의 장시간 Task, Windows worker 보안, Work/plugin event intake에 의미 있는 항목만 선별해 검토한 기록이에요. Upstream `main` commit은 승인 Windows host의 stable capability 증거가 아니에요.

Official sources:

- https://github.com/openai/codex/commit/ae0ecd7484a2f9b5420a618e801d03c1f0aead2f — PR #41906 MCP event stream manager
- https://github.com/openai/codex/commit/b51b07785bcd1545f63893f363ee1957949526e0 — PR #41909 executor-path-aware permission transforms
- https://github.com/openai/codex/commit/a7913390f7bbd819d4b80fa2f6a67c15fce6cf53 — PR #41911 TUI draft preservation after external App Server disconnect
- https://github.com/openai/codex/commit/5f79a92e3936274318d2122ae3244e5edd80dd1f — PR #41912 durable response token usage on resume/compaction
- https://github.com/openai/codex/releases/tag/rust-v0.151.0 — latest approved stable reference
- https://github.com/openai/codex/releases/tag/rust-v0.152.0-alpha.7 — current prerelease observed, not approved for Dex

## Confirmed

### PR #41906 — managed MCP event streams

- `McpEventStreamManager`가 thread/subscription별 event worker를 소유하고, start 완료 전에 activation을 확인해요.
- update에는 `stream_attempt_id`를 붙여 replacement/reload 중 이전 attempt의 stale update를 구분할 수 있게 했어요.
- active stream은 originating runtime과 독립적으로 유지되며, reloaded thread를 surviving stream에 다시 연결할 수 있어요.
- cancellation/shutdown이 output queue 여유에 의존하지 않도록 했고, MCP access 변경이나 event server 제거 시 stream을 닫아요.
- upstream tests는 activation, replacement attempt, task reload, activation 전 cancellation, full output queue, access change, shutdown을 포함해요.

### PR #41909 — executor path context 기반 permission transform

- additional filesystem permission의 normalize/materialize/intersection이 executor의 `FileSystemSandboxPolicyContext`를 기준으로 project root, home-relative deny glob, temp dir, filesystem root를 해석하게 바뀌었어요.
- POSIX/Windows/UNC path convention과 symlinked path를 보존하고, grant를 교차할 때 deny constraint를 유지해요.
- executor context가 있을 때 서로 호환되지 않는 path convention은 거부해요.
- upstream tests는 POSIX, Windows, UNC, empty temp context, home-relative/rooted deny glob을 포함해요.

### PR #41911 — external App Server disconnect 시 TUI fail-closed offline state

- external App Server transport가 startup/event streaming/submission 중 끊기면 TUI가 offline state로 전환돼요.
- draft, queued input, expanded paste, attachment, agent-overview input은 보존하지만 submission, remote action, automatic queue replay는 막아요.
- pending async work를 취소하고 stale completion을 무시해 uncertain submission을 자동 재시도하지 않아요.
- embedded App Server 동작은 변경하지 않아요.

### PR #41912 — resume/compaction용 durable token-usage record

- response/turn/thread/session/root-turn attribution을 가진 `TokenUsageRecord`가 rollout history에 영속화돼요.
- resume 시 누적 usage를 복구하고 compaction checkpoint에 latest usage record와 compaction response ID를 보존해요.
- persisted turn context에 root-turn lineage를 유지하지만 forked child thread는 자체 usage total에서 시작해요.
- 이 record는 Codex 내부 thread/turn accounting 근거예요. ChatGPT plan quota, purchased Credits, reset, 청구 금액의 authoritative ledger라는 공식 근거는 아니에요.

### Reviewed, no Dex action

- PR #41908: archived rollout 전체 scan을 피하는 archive-path 성능 개선 — 유용하지만 Dex activation/policy 변경 필요 없음.
- PR #41913: 숨겨진 TUI status row에서도 pause-aware timer와 Windows sandbox setup clock을 보존 — UI timing 정확도 개선이며 Runtime dependency 아님.
- PR #41915: config-schema generator를 전용 crate로 이동하지만 기본 `config.schema.json` 출력 위치는 유지 — 현재 Dex compatibility contract 변경 없음.

Latest approved stable target은 계속 Codex `0.151.0`이에요. `0.152.0-alpha.7`은 prerelease이므로 설치·승격하지 않아요. 이번 검토에서 별도의 새 stable, 새 모델 retirement, Dex의 subscription-first 정책을 바꿔야 할 새 pricing/usage-limit 발표는 확인하지 못했어요.

## Inference

- PR #41906은 future Work/plugin event intake가 runtime reload나 backpressure를 겪을 때 중복·stale event와 orphan subscription을 줄일 수 있어 Runtime #34의 reliability에 직접 유리해요.
- Dex에는 provider event stream의 생존 자체보다 **activation 확인, attempt identity, cancellation independence, access/server-removal revocation, Dex idempotency**가 더 중요해요. Event stream은 GitHub Task Bus와 별도의 상태 권한자가 되면 안 돼요.
- PR #41909는 dedicated Windows worker에서 path convention/deny scope가 host와 executor 사이에서 잘못 materialize되어 권한이 넓어지는 위험을 줄이는 방향이에요. 특히 UNC/symlink/home-relative deny 처리는 향후 broader filesystem grant를 검토할 때 중요해요.
- PR #41911의 no-auto-replay/stale-completion quarantine 원칙은 Dex의 `Zero User Re-entry`와 충돌하지 않아요. 사용자가 다시 입력하지 않게 하되 uncertain mutation을 자동 반복하지 않고 canonical Task status/result로 복구하는 쪽이 맞아요.
- PR #41912는 long-running Task의 usage observability와 root-goal budget 복구에 유리할 수 있지만, 이것을 plan-credit 회계로 오인하면 비용 제어가 오히려 약해질 수 있어요. Dex 비용 판단은 계속 provider Usage UI/official plan surface를 우선해야 해요.

## Proposal / Dex decision

- MCP event manager는 Runtime #34의 future gate에만 반영하고 `submit_task`나 hosted MCP write를 지금 활성화하지 않아요.
- Future #34 E2E는 activation-before-start, unique attempt ID, stale-attempt rejection, reload reattachment, full-queue cancellation, access/workspace/server removal cancellation, duplicate/replay rejection과 canonical Dex idempotency를 검증해야 해요.
- Permission transform은 upstream watch로만 추적해요. Stable inclusion 전에는 Dex permission model이나 current #17 stable-host gate를 이 upstream behavior에 의존시키지 않아요.
- Future approved Windows-host permission regression은 native Windows/UNC/symlink/project-root/home-relative deny/temp-root와 grant intersection에서 deny 보존 및 incompatible path rejection을 확인해야 해요.
- TUI disconnect safety는 design principle로만 참고해요. Dex Runtime의 direct `codex app-server --stdio` transport에 TUI 동작을 그대로 투영하지 않아요.
- Durable token usage는 future long-running/resume observability gate에만 사용해요. Provider plan quota/Credits/reset/청구 authoritative source로 사용하지 않아요.
- `0.152.0-alpha.7`, experimental App Server, paid API, automatic paid fallback, automatic extra usage, broader filesystem permission, hosted MCP write는 활성화하지 않아요.

## Verification

### PASS

- Official `openai/codex` upstream PR #41906/#41909/#41911/#41912 commit 확인
- Latest approved stable reference `0.151.0` 유지 확인
- Current Dex canonical `main`에서 subscription-first, GitHub Task Bus authority, optional-capability disabled 정책과 충돌 여부 검토
- Runtime `main` `2ac45ceb907e70a6e6b72d617d9c9105052ae460`과 Wiki `main` `fa5d7c8776584933579604901a242fa864997683`를 기준으로 비교
- Prerelease/experimental capability, paid API, automatic paid fallback, broader permission, hosted MCP write 미활성화

### FAIL

- 없음

### Not Checked

- PR #41906/#41909/#41911/#41912가 포함될 future stable 버전
- Stable App Server/CLI surface에서 event-manager lifecycle의 observable contract
- Approved Windows host의 POSIX/Windows/UNC/symlink permission transform regression
- External App Server disconnect behavior가 future stable TUI에 포함되는 버전 및 Dex direct-App-Server transport와의 실제 차이
- Stable resume/compaction에서 token usage/root-turn accounting E2E
- Current account의 provider Usage UI와 internal `TokenUsageRecord` 사이의 정의·집계 단위 대응 관계

## Tracking

- MCP event intake / Work-mobile plugin: Runtime Issue #34
- Paginated/resume history and long-running recovery: Runtime Issue #21
- Windows/security surface watch: Runtime Issue #30
- General post-0.151 stable promotion watch: Runtime Issue #25

## Decision

이번 변화는 의미 있지만 아직 모두 upstream `main` 단계예요. Dex 실행면을 바꾸지 않고 canonical evidence와 future stable/approved-host Gate만 강화하는 것이 reliability, security, lower rework, subscription-first 원칙에 가장 유리해요.