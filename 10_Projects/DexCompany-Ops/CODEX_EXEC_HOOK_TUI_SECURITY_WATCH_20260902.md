# Codex remote exec / built-in cleanup hook / TUI history 보안 watch — 2026-09-02

## 목적

직전 provider watch 이후 새로 merge된 OpenAI Codex upstream PR #42107, #42110, #42113을 공식 근거로 확인하고, 현재 승인된 Dex Wiki/Runtime `main`과 비교해 future-stable/approved-host Gate로 반영해요.

- 비교 시작 Wiki `main`: `05623ffcebb76dc42c03721679a6ac14cc25c64f`
- 비교 시작 Runtime `main`: `f13f7a83d594436d65ce73363bf6931ade1c3441`
- Runtime 반영 PR: #77
- Runtime 반영 merge: `bbdf6ec6abaa4bd7f7297a6dc4ce6e8f1fcf1de1`
- Runtime tracking: Issue #78, #28 follow-up comment `5498563800`

이번 반영은 watch/evidence만 추가해요. #28 Phase 3 → #34/#35의 운영 Gate 순서, 승인 host stable, 권한, plugin 상태, 비용 정책은 바꾸지 않아요.

## 공식 upstream 확인

### PR #42107 — Show full patches and terminal input in TUI history

- Merged: `2026-09-01T17:40:07Z`
- Merge commit: `6a479e1813fc44c1ea3c85b7b4023ee3d4c21b8f`
- https://github.com/openai/codex/pull/42107
- TUI history가 patch 전체 내용을 직접 렌더링하고 background terminal에 보낸 input도 inline으로 표시해요.
- 기존 preview row/byte limit과 관련 transcript hint를 제거해 inline/transcript view가 같은 전체 내용을 보여주는 방향으로 바뀌었어요.
- 이전 12-row preview보다 긴 patch/input snapshot 회귀 테스트가 추가됐어요.

### PR #42110 — Treat bundled cleanup hooks as built-ins

- Merged: `2026-09-01T18:04:15Z`
- Merge commit: `c7c824dce4da186e5142af5d9a1587ae553efe46`
- https://github.com/openai/codex/pull/42110
- bundled MCP cleanup hook allowlist를 중앙화하고 `unified-computer-use`의 `cua_repl` cleanup까지 포함해요.
- allowlist와 정확히 일치하는 cleanup hook은 trusted built-in으로 취급되어 saved hook trust 없이 실행될 수 있고 ordinary hooks/per-hook state가 disabled여도 유지돼요.
- 다만 plugin enablement와 managed-only policy는 계속 적용돼요.
- built-in cleanup hook은 hook listing과 lifecycle notification에는 숨겨지고 metrics는 유지되며, built-in 분류 자체는 protocol serialization에 노출하지 않아요.
- allowlist 경계, trust/enablement, local/executor plugin, MCP 성공/오류, listing, lifecycle, metrics, serialization 테스트가 포함돼요.

### PR #42113 — Apply remote platform semantics to exec safety checks

- Merged: `2026-09-01T18:27:16Z`
- Merge commit: `1f4c47343a1bff2d8cddc429c5d39503fb5a6c30`
- https://github.com/openai/codex/pull/42113
- Unified Exec가 Codex host OS가 아니라 reported executor platform을 command parsing, executable-name normalization, dangerous-command classification에 전달해요.
- legacy executor가 platform을 생략하면 host platform fallback을 사용하고, 알 수 없는 reported platform은 Windows rule을 보수적으로 적용해요.
- model-facing `exec_command` rejection은 bounded message로 만들고 rejected command 원문을 error에 echo하지 않아요.
- deterministic process ID는 release 뒤에도 reserved 상태를 유지해 rejected test command가 이전 ID를 재사용하지 않게 해요.
- remote Windows executor 대상 long dangerous PowerShell rejection과 deterministic ID advancement 테스트가 포함돼요.

## Dex 분류

### confirmed

- #42107/#42110/#42113은 모두 현재 latest official stable `0.152.0` 이후 upstream `main`에 merge됐어요.
- 따라서 현재 승인 Windows host의 operational capability가 아니라 future-stable evidence로만 취급해요.
- #42113은 host와 executor OS가 다를 때 host semantics만으로 safety check하던 cross-platform gap을 직접 보강해요.
- #42110은 allowlisted provider-owned cleanup hook에 ordinary hook보다 강한 built-in trust/enablement semantics를 의도적으로 부여하지만 plugin-level/managed policy Gate는 유지해요.
- #42107은 TUI에 노출되는 patch와 terminal-input 범위를 실질적으로 확대해요.

### inference

- #42113은 현재 active next인 Runtime #28 Phase 3 broker↔approved Windows worker E2E와 직접 맞닿아 있어요. Broker/host와 worker OS가 다를 때 Windows/PowerShell 위험 명령이 host-oriented heuristic을 우회할 위험을 줄일 가능성이 커요.
- rejected command를 model-facing error에서 제거하는 것은 민감한 command text의 불필요한 반사 노출을 줄이지만 Dex의 secret isolation/output scan을 대체하지 않아요.
- #42110은 Browser/Computer Use 계열의 cleanup 신뢰성을 높일 수 있지만 hidden built-in hook이 ordinary listing/lifecycle surface에서 보이지 않으므로 future stable에서 별도의 audit/allowlist 검증이 필요해요.
- #42107은 운영자가 전체 diff/input을 확인하기 쉬워져 디버깅에는 유리하지만 과거 preview limit을 기밀성 경계로 간주해서는 안 돼요.

### proposal — 적용한 최적화

기능을 켜는 대신 다음 fail-closed Gate를 추가했어요.

1. #42113 포함 stable에서 broker/host와 다른 Windows executor의 dangerous PowerShell/Windows executable이 실제 executor semantics로 판정되는지 검증해요.
2. unknown reported platform은 conservative Windows rules로 처리되는지 검증해요.
3. legacy missing-platform host fallback은 actual executor OS가 다른 경우 cross-platform safety PASS 근거로 사용하지 않아요.
4. Windows path/executable normalization, PowerShell wrapper parsing, remote shell 선택이 Dex sandbox/approval/managed deny/mutation lock을 우회하지 못하게 회귀검증해요.
5. bounded rejection error에 raw command/secret/credential/unbounded terminal input이 포함되지 않는지 확인하고 canonical Result/receipt에도 저장하지 않아요.
6. deterministic process-ID reservation이 stale attempt/result association, duplicate execution, idempotency ambiguity를 만들지 않는지 #28 fault fixture로 검증해요.
7. #42110은 plugin disabled 상태와 stricter managed policy에서 built-in cleanup이 우회하지 않는지 검증해요.
8. allowlist exactness를 확인해 Dex-owned/custom/spoofed plugin hook이 trusted built-in으로 오분류되지 않게 해요.
9. hidden cleanup hook은 raw sensitive payload를 저장하지 않으면서 incident reconstruction에 충분한 bounded metric/audit evidence가 있는지 확인해요.
10. cleanup 개선만을 이유로 Browser/CDP/Computer Use/`cua_repl`을 활성화하지 않아요.
11. #42107은 현재 확인된 display 변화와 persistence/export/copy 동작을 분리해 검증하고, 확인 전 data-retention 정책을 확대 해석하지 않아요.
12. TUI history와 별개로 GitHub Task ID, `attemptId`, approval, mutation lock, durable Result/receipt, detached verifier를 canonical authority로 유지해요.

### unknown

- #42107/#42110/#42113이 처음 포함될 official stable
- approved Windows host의 remote-platform Unified Exec 실제 E2E 결과
- hidden built-in cleanup hook의 최종 stable audit/visibility contract
- #42107 전체 history 표시가 persistence/export/copy surface에 주는 최종 영향
- App/Work/mobile에서 동일 의미의 history/audit surface가 제공될지 여부

## Dex에 실제 반영한 내용

### Runtime

- PR #77: https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/77
- 변경: `docs/CODEX_EXEC_HOOK_TUI_SECURITY_WATCH_20260902.md` 1개 신규 파일, 실행 코드/설정/권한/plugin 변경 0
- Branch validation run `33544140846`: **PASS**
  - dependency install: PASS
  - static checks, unit tests, smoke: PASS
  - production dependency audit: PASS
- Branch Vercel: **PASS**
- Merge: `bbdf6ec6abaa4bd7f7297a6dc4ce6e8f1fcf1de1`
- Merge Vercel: **PASS**
- Merge SHA 별도 GitHub Actions run: **Not Checked — 생성되지 않음**
- Runtime Issue #78을 future-stable/approved-host tracking authority로 생성했어요.
- Runtime #28에 #42113 Phase 3 cross-platform Windows exec safety Gate를 추가했어요.

### Wiki

이 문서만 신규 canonical evidence로 추가해요. Provider watch 때문에 `CURRENT_STATE.md`, `PROJECT_CONFIG.md`, `CURRENT.md`의 aggregate operational state를 대량 재작성하지 않아요. 이번 변경은 현재 Gate 순서나 실행 상태를 바꾸지 않으며, 비관련 이력/사용자 변경 보존을 우선해요.

## 안전 경계

- prerelease/experimental capability 활성화 0
- Unified Exec policy/sandbox/approval/remote executor/permission 변경 0
- Browser/CDP/Computer Use/`cua_repl`/Remote Control/Voice/Realtime 활성화 0
- plugin/Skill auto-install/update/reconcile/disable/delete 0
- legacy Skill/Plugin 삭제 0
- paid API/automatic paid fallback/extra paid usage/credit/reset/plan 변경 0
- broader OAuth/filesystem/MCP permission 0
- external messaging 0

## 검수 결과

- OpenAI #42107 공식 upstream 확인: **PASS**
- OpenAI #42110 공식 upstream 확인: **PASS**
- OpenAI #42113 공식 upstream 확인: **PASS**
- latest official stable `0.152.0` 확인: **PASS**
- Runtime PR #77 변경 범위/security review: **PASS — docs 1 file / runtime mutation 0**
- Runtime validation `33544140846`: **PASS**
- Runtime branch/merge Vercel: **PASS**
- Runtime Issue #78 / #28 tracking: **PASS**
- FAIL: **없음**
- #42107/#42110/#42113 포함 future stable: **Not Checked**
- approved Windows-host remote-exec/hook/TUI regression E2E: **Not Checked**
- Work/mobile/desktop parity: **Not Checked**
- merge-SHA 별도 Runtime Actions run: **Not Checked**

## 공식 출처

- https://github.com/openai/codex/pull/42107
- https://github.com/openai/codex/pull/42110
- https://github.com/openai/codex/pull/42113
- https://developers.openai.com/codex/changelog
- https://github.com/openai/codex/releases/tag/rust-v0.152.0
