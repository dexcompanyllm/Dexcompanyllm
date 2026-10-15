# Codex paginated wake + installed Voice host watch — 2026-09-01

## Scope

직전 OpenAI/Codex provider watch 이후 `openai/codex`의 upstream `main`에 추가된 의미 있는 변경을 Dex Company 관점에서 검토한 기록이에요. 이 문서의 upstream commit은 **승인 Windows host의 stable capability 증거가 아니에요.**

Official sources:

- https://github.com/openai/codex/commit/f88ff940c0f5b20628e94abc27d04196a14c5b94
- https://github.com/openai/codex/commit/13bc770eaf0ad8548776bde59c3d6e5316406279
- https://github.com/openai/codex/releases/tag/rust-v0.151.0

## Confirmed

### PR #41901 — paginated empty-wake bounded reconstruction

- Paginated thread에 user-message boundary가 없는 wake turn이 누적돼도, 최신 compaction 뒤 살아남은 full `WorldState` snapshot과 compatible turn context가 함께 있으면 durable baseline으로 사용할 수 있게 됐어요.
- 이 baseline이 충분하면 reverse context scan이 해당 empty wake turn에서 bounded cutoff를 만들 수 있고, upstream test는 bounded reconstruction과 full rollout reconstruction이 동일한 결과를 내는지 successive compaction window까지 검증해요.
- snapshot이 relevant compaction보다 앞에 있거나 patch-only, missing context, incompatible context인 경우에는 더 과거로 scan해서 보수적으로 복구해요.

### PR #41902 — installed Voice host lifecycle

- 설치 package 내부의 물리 경로에서만 `codex-voice-host[.exe]`를 resolve하고 bounded handshake/shutdown, process cleanup을 담당하는 `VoiceHost`가 추가됐어요.
- child process 환경은 allowlist 방식이며 upstream test에서 loader hook, plugin search path, `OPENAI_API_KEY` 같은 app credential을 상속하지 않는 것을 검증해요.
- `third_party/voice/assemble_package.py`는 fresh package copy에 target-compatible helper를 넣고 build provenance와 file hash manifest를 기록해요.
- OpenAI는 이 manifest가 binary authentication/architecture proof가 아니며, helper handshake 성공 역시 active audio session을 뜻하지 않는다고 명시해요. Native runtime loading, media/privacy control, 실제 audio proof는 아직 후속 단계예요.

Latest official stable은 계속 Codex `0.151.0`이에요.

## Inference

- PR #41901은 향후 Dex 장시간 Task, scheduled wake, paginated recovery에서 full-history replay 비용과 불필요한 재작업을 줄이는 데 도움이 될 가능성이 커요.
- 다만 Dex에 더 중요한 것은 최적화 자체보다 **불완전한 baseline에서 context를 버리지 않고 더 넓게 scan하는 fail-closed 동작**이에요.
- PR #41902는 future native Voice의 Windows portability/security 신호를 강화해요. 특히 package 경계, child environment, process lifecycle이 더 명시적이에요. 하지만 아직 stable/user-facing Voice capability로 볼 수 없어요.

## Proposal / Dex decision

- `paginatedThreadHistory`와 unfinished-turn recovery는 계속 `watch-disabled`로 유지해요. Upstream `main` commit만으로 Production `experimentalApi`를 켜지 않아요.
- Future stable/public App Server contract가 확인되면 empty wakes, repeated compaction, world-state patch와 baseline mismatch를 포함해 bounded reconstruction이 full reconstruction과 동등한지 approved-host E2E로 검증해요.
- Native Voice는 계속 `security-watch-disabled`로 유지해요. Cygwin/Visual Studio component/media runtime 설치, microphone/audio permission, prerelease Codex, broader worker permission을 자동 활성화하지 않아요.
- Voice future gate에는 physical package containment, symlink/path escape 방지, build mismatch, child-environment secret isolation, provenance/hash/rollback, native runtime loading, permission/privacy/retention, device selection, interruption/kill switch와 실제 audio E2E를 포함해요.
- Subscription-first, GitHub Task Bus authority, paid API 금지, automatic paid fallback 금지는 그대로 유지해요.

## Verification

### PASS

- Official `openai/codex` PR #41901 / #41902 merge commit 확인
- Latest stable `0.151.0` 재확인
- Current Dex canonical safety/cost boundaries와 충돌하지 않도록 watch-only 정책 유지
- Prerelease/experimental capability, paid API, automatic paid fallback, broader permission, Voice runtime, microphone access, hosted MCP write 미활성화

### FAIL

- 없음

### Not Checked

- PR #41901 / #41902가 포함될 future stable 버전
- Paginated wake/recovery의 stable/public App Server 노출
- Approved Windows host의 bounded-vs-full reconstruction E2E
- Stable 설치본의 Voice helper package layout
- Native Voice runtime/audio/privacy/retention 및 approved Windows-host E2E

## Tracking

- Paginated history/recovery: Runtime Issue #21
- Native/installed Voice security watch: Runtime Issue #30
- Runtime evidence: `docs/CODEX_PAGINATED_WAKE_VOICE_HOST_WATCH_20260901.md`

## Decision

지금은 기능을 활성화하지 않고 future stable Gate와 보안/복구 검증 기준만 강화하는 것이 Dex Company에 가장 유리해요.
