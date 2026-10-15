# Codex Recent Session / Cold Resume Watch — 2026-09-02

- Status: Canonical provider-watch evidence
- Provider: OpenAI Codex
- OpenAI PR: #42104
- Wiki baseline: `7b42b2a29be012101aa4ec941660f727c4730065`
- Runtime implementation evidence: PR #76 merge `f13f7a83d594436d65ce73363bf6931ade1c3441`

## Confirmed

OpenAI Codex PR #42104, `Show recent sessions in the agent command center`, merged on `2026-09-01T17:30:23Z` as `f40e08478ce01516e841437e0c9cb051df52e146`.

Official source: https://github.com/openai/codex/pull/42104

- Agent command-center overview에 App Server가 현재 load한 session 외에 최대 20개의 recent root session을 추가해요.
- 발견한 session은 TUI lifetime 동안 유지하고 thread lifecycle notification으로 row를 갱신해요.
- unloaded session을 일반 working-directory selection과 configuration rebuild 경로로 cold resume할 수 있어요.
- explicit runtime permission choice는 cold resume에 이어질 수 있어요.
- 이전에 선택한 task에서 inherited된 setting은 다른 cold resume에 이어지지 않아요.
- older server에서는 `recency_at` 대신 `updated_at`으로 fallback하고, recent-history listing이 실패해도 loaded session은 계속 보여줘요.
- upstream tests는 discovery/retention, notification race, legacy/failed listing fallback, cold-resume cwd/permission, reconnect, unloaded-session selection을 다뤄요.

Latest non-prerelease Codex release는 계속 `0.152.0`이고 #42104는 그 이후 upstream `main` 변경이에요. 현재 승인 Dex host capability로 취급하지 않아요.

## Inference

- completed/unloaded session을 다시 찾고 resume할 수 있어 장시간 작업의 lost-session 재작업을 줄일 가능성이 있어요.
- explicit runtime permission carry-over는 반복 승인 friction을 줄일 수 있지만, Dex canonical authorization으로 승격하면 안 돼요. Provider session의 permission은 해당 Codex session의 보조 상태일 뿐 GitHub Task, repository mutation, deployment, 다른 account/workspace/project에 대한 권한이 아니에요.
- selected-task inherited setting을 cold resume에 넘기지 않는 분리는 Dex의 context isolation 방향과 잘 맞아요.

## Proposal applied

Runtime PR #76은 documentation-only future-stable Gate를 추가하고 실행/설정/권한은 바꾸지 않았어요.

Adoption 전에는 다음을 요구해요.

- recent/unloaded listing은 explicit resume 전 read-only/no-mutation이어야 해요.
- selected session은 expected account/backend/workspace/project와 canonical Task/attempt에 결합되어야 해요.
- cwd/project registry reconstruction이 정확해야 하고 stale/deleted/mismatched root는 fail-closed해야 해요.
- provider permission carry-over가 Dex approval, `attemptId`, mutation lock, App Server sandbox, managed deny, explicit action approval을 덮어쓸 수 없어야 해요.
- reconnect, older-server fallback, stale lifecycle notification, selection race로 permission이 넓어지거나 잘못된 session이 resume되면 안 돼요.
- 이전 selected task의 inherited setting이 다른 resumed session으로 새면 안 돼요.
- completed/canonicalized attempt의 cold resume가 duplicate writer/commit/Result를 만들면 안 돼요.
- provider session ID는 diagnostic provenance로만 쓰고 GitHub Task ID/attempt/receipt/Result를 canonical authority로 유지해요.

Tracking:

- Runtime #28: cold-resume identity/cwd/permission/duplicate-execution Gate 추가
- Runtime #35: future reader/verifier/subagent가 unrelated resumed root-session permission을 상속하지 않는 isolation Gate 추가

## Unknown / Not Checked

- #42104 최초 포함 stable
- stable recent-session listing/cold-resume permission persistence의 장기 public contract
- approved Windows host 실제 동작
- Work/mobile/desktop parity
- subagent/future multi-agent session history가 동일 root-session overview semantics에 포함되는지

## Safety boundary

이번 watch에서 real Codex session resume, runtime permission grant/carry/widen, TUI/App Server setting 변경, prerelease/experimental capability 활성화, GitHub Task authority 변경, paid API/automatic paid fallback/extra paid usage, plugin/Skill mutation, Browser/CDP, Computer Use, Remote Control, Voice/Realtime, 외부 메시징은 실행하지 않았어요.

## Verification

Runtime PR #76:

- changed files: `1`, additions/deletions `+88 / -0`
- unexpected file change: `0`
- branch Runtime validation `33538561714`: **PASS**
  - Install dependencies: PASS
  - Static checks, unit tests, smoke test: PASS
  - Production dependency audit: PASS
- merge: **PASS**
- Runtime main: `f13f7a83d594436d65ce73363bf6931ade1c3441`
- merge Vercel: **PASS — Deployment has completed**
- merge-SHA separate GitHub Actions: **Not Checked — no run returned**

Overall:

- Official upstream verification: **PASS**
- Latest stable verification: **PASS — 0.152.0**
- Runtime branch CI/security: **PASS**
- Runtime merge/Vercel: **PASS**
- FAIL: **none**
- Future stable / approved-host E2E: **Not Checked**
