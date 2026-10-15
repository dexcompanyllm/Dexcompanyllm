# Codex MCP event + native Voice watch — 2026-09-01

## Scope

직전 provider watch 이후 OpenAI `openai/codex` upstream `main`에서 새로 확인된 MCP event subscription lifecycle과 native Voice groundwork를 Dex Company 관점에서 기록해요. 아래 근거는 **upstream-main evidence**이며 current stable capability evidence가 아니에요.

Official sources:

- https://github.com/openai/codex/commit/e51b54b4c03b05680d4b301bce035d92a3e7dbef
- https://github.com/openai/codex/commit/53691bad9878d6e26ba546bc5959d2d49eaecf86
- https://github.com/openai/codex/commit/65237aeca0bf607fb2d940a1fc22cd5d4c43de07
- https://github.com/openai/codex/commit/d60560f14e6271da8ac8f680fcdfb9245d5b9413
- https://github.com/openai/codex/releases/tag/rust-v0.151.0

## Confirmed

### MCP event subscriptions

- PR #41892 / commit `e51b54b4c03b05680d4b301bce035d92a3e7dbef`는 event stream이 완료되거나 취소될 때까지 underlying MCP client를 유지하도록 바꿨어요.
- PR #41899 / commit `53691bad9878d6e26ba546bc5959d2d49eaecf86`는 hosted Apps MCP connection 설정을 task runtime과 분리해 보존하는 `McpEventStreamOpener`를 추가해요. 따라서 task runtime unload/replacement 뒤에도 subscription lifecycle을 유지할 수 있어요.
- subscription cancellation은 account/access change와 task event-server removal에 연결돼요.
- upstream HTTP transport test는 runtime shutdown 뒤 같은 account의 credential refresh를 거친 새 event stream이 current authorization으로 reconnect하고 notification을 받는 흐름을 검증해요.

### Native Voice groundwork

- PR #41894 / commit `65237aeca0bf607fb2d940a1fc22cd5d4c43de07`는 Windows x64/ARM64 native Voice dependency build를 보강해요. x64-emulated Cygwin에서 잘못된 target/path가 섞이지 않도록 `cygpath`, explicit build/host targets, `USERPROFILE` preservation, `/cygdrive/` metadata rejection과 ARM64 Opus NEON 처리가 추가됐어요.
- PR #41897 / commit `d60560f14e6271da8ac8f680fcdfb9245d5b9413`는 private `codex-voice-host` lifecycle helper와 bounded 256-byte JSON control protocol을 추가해요. `hello`/`ready`/`close`/`closed`만 허용하고 protocol/build compatibility, malformed frame, invalid message order, parent pipe loss를 fail-closed로 다뤄요.
- OpenAI는 이 단계가 audio device open, native plugin loading, WebRTC negotiation, TUI Voice enablement를 하지 않는다고 명시해요.
- latest official stable은 계속 Codex `0.151.0`이에요.

## Inference

- MCP event subscription이 task runtime보다 오래 살아남을 수 있다는 점은 future Work/plugin event-trigger intake의 reliability에 직접 유리해요. transient runtime unload 때문에 subscription까지 함께 끊기는 결합도를 낮출 수 있어요.
- 반대로 persistent event stream은 오래 살아있는 authority가 될 수 있으므로 account/workspace change, server removal, duplicate/replay/stale event 처리를 Dex canonical Task state와 강하게 묶어야 해요.
- Voice는 Windows portability와 helper lifecycle이 구체화되고 있지만 아직 stable/user-facing capability로 볼 근거는 없어요.

## Proposal / Dex policy

- MCP event subscription은 stable 포함과 approved-host/plugin E2E 전까지 `watch-only`로 유지해요.
- MCP event는 intake evidence일 뿐이고 GitHub Task Bus가 canonical Task authority예요. event stream 자체가 두 번째 Task state machine이 되면 안 돼요.
- future event consumer는 same-account authorization refresh, account/workspace change cancellation, event-server removal cancellation, duplicate/replay/stale-event rejection, idempotency key, OAuth failure=zero mutation, durable Result independence를 모두 검증해야 해요.
- native Voice는 계속 disabled/watch-only로 유지해요. unreleased Voice probing을 위해 Cygwin, Visual Studio component, pkgconf, media library, microphone/audio permission, prerelease Codex를 자동 설치·활성화하지 않아요.
- paid API, automatic paid fallback, broader permission, hosted MCP write는 계속 비활성으로 유지해요.

## Future gates

### MCP event subscriptions

- [ ] 이 lifecycle 변경이 포함된 stable Codex version을 확인해요.
- [ ] task runtime unload/replacement 뒤 subscription survival이 duplicate Task 없이 PASS해요.
- [ ] same-account credential refresh는 current authorization으로 reconnect하고 account/workspace change는 access를 취소해요.
- [ ] event-server removal 뒤 active subscription이 취소되고 stale event는 mutation을 만들지 않아요.
- [ ] reconnect/replay ordering과 delivery semantics를 Dex idempotency로 회귀검증해요.
- [ ] OAuth expiry/revocation/scope denial/workspace-policy denial은 mutation 0건이에요.
- [ ] durable canonical Result/receipt가 callback/event-stream lifetime과 독립적으로 보존돼요.

### Native Voice

- [ ] stable/user-facing native Voice contract와 supported surface/version이 확인돼요.
- [ ] Windows packaging/runtime dependency가 broader worker privilege 없이 확인돼요.
- [ ] microphone/audio permission, privacy, retention, device selection, interruption, kill switch가 검증돼요.
- [ ] helper/native runtime integration provenance와 rollback/uninstall이 검증돼요.
- [ ] approved-host E2E가 subscription-first로 PASS하고 paid API/fallback은 0회예요.

## Verification

### PASS

- Official OpenAI upstream commits #41892, #41894, #41897, #41899를 검토했어요.
- Official latest stable을 다시 확인했고 `0.151.0`이에요.
- Dex Runtime PR #51 branch CI가 PASS한 뒤 merge `50224cade87bdb6e26392f08916401236622d210`로 반영했어요.
- Runtime #34에는 MCP event subscription gate, Runtime #30에는 native Voice lifecycle gate를 기록했어요.
- prerelease/experimental activation, paid API, automatic paid fallback, broader permission, Voice runtime, hosted MCP write는 활성화하지 않았어요.

### FAIL

- 없음.

### Not Checked

- 어느 future stable에 위 upstream commits가 포함되는지.
- approved Windows host의 stable MCP event-stream E2E.
- 현재 account/workspace에서 hosted Apps MCP event subscriptions가 실제 노출되는지.
- native Voice final package integration, audio behavior, privacy/retention semantics, approved Windows-host E2E.
- Runtime #28 long-running Task consumer와 future MCP event subscription의 실제 상호작용.

## Decision

`proposal accepted under standing provider-optimization approval`: 새 upstream evidence와 future reliability/security gate만 반영해요. stable + approved-host evidence 전에는 기능을 활성화하거나 의존하지 않아요.

현재 우선순위는 그대로 `#17 -> #28 -> #34/#35`예요.
