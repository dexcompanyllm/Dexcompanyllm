# CURRENT_STATE

<!-- DEX_CURRENT_STATUS_BEGIN -->

### 기기 독립 개선 — 2026-09-12

개발·마케팅·사업·리서치 전 분야와 지속 학습을 대상으로 개선해요. 접속 기기와 실제 실행 환경을 분리하고, Windows 검증을 모든 Dex 사용의 필수 조건으로 확대하지 않아요. 아래 상태·CI는 확인 당시 스냅샷이며 실제 기기 검증을 새로 통과했다는 뜻이 아니에요. [작업과 최신 증거](https://github.com/ethanhee890-commits/dex-company-wiki/blob/main/10_Projects/DexCompany-Ops/Tasks/DEX-PORTABLE-OS-20260912/RESULT.md)와 [새 의존관계](https://github.com/ethanhee890-commits/dex-company-wiki/blob/main/20_Codex_Handoff/DEVICE_INDEPENDENT_EXECUTION.md)를 읽고 승인된 작업을 이어가요. 소스 병합과 실제 설치·실행 검증은 다른 상태예요. 최신 병합 증거는 연결된 Task에서 확인해요.

## 현재 운영 스냅샷 — 2026-09-12

이 블록은 승인 main에 병합된 뒤 현재 기준으로 사용해요. 브랜치에서는 수정안이에요. 아래 보존 원문의 비용·보안·권한·프로젝트 설정과 비활성 역량 정책은 계속 현행 규칙이에요. 대체되는 것은 이전 날짜의 상태값·CI 판정·Next Prompt뿐이고, 이 새 블록의 확인일/대상 SHA와 실행 조건을 사용해요. 원문 전체를 폐기하거나 정책을 과거로 돌리는 변경이 아니며, 충돌 시 AI_CONTRACT.md를 우선해요.

Project name: DexCompany-Ops
Status: active
Operational status: v2-codex-0151-recommended-tracked-disabled
Last updated: 2026-09-12

| 항목 | 확인값 |
|---|---|
| Runtime 검증 스냅샷 | PR #203 / `58860eec7f9eed5dc53687b4c3a08323ddf47ece` |
| 브랜치 검증 | `34676805956` / PASS; tested head `53d7baefdcb4ba146e867a44e43e7ad982daaf46` |
| 병합 후 main 검증 | `34676977854` / PASS; tested head `58860eec7f9eed5dc53687b4c3a08323ddf47ece` |
| 실제 Windows 전체 검사 | **Not Checked** — 문서·CI 통과와 별개 |
| Galaxy / iPhone / Mac 접근·실행 | **Not Checked** — 이번 소스 병합으로 승인하지 않음 |
| 공통 Plugin 소스 | 1.1.1; 실제 설치 Not Checked |
| Runtime 테스트 | total 286 / PASS 285 / FAIL 0 / skip 1 |
| production 의존성 audit | total 0, moderate 0, high 0, critical 0 |
| Vercel / 직접 HTTP | commit status PASS / live HTTP Not Checked |
| 다음 순서 | #28 OPEN; #34/#35는 공통 안전 + 선택 경로 검증 뒤 기능별 판단; 현재 #34 blocked, #35 blocked |
| 승인 Codex 권장 / 최소 호환 버전 | 0.151.0 / 0.150.0 — 변경 없음 |
| 마지막 확인한 provider 검증 후보 | 0.153.4 — 자동 설치·승격 안 함; 실제 사용 전 다시 확인 |
| 요금·권한 | 변경 없음; 유료 API/fallback·credit/reset 자동 사용 없음 |

Wiki 원문 보존 기준은 PR #166 / `507331d82cc3016373d1e6d351b8f38f41fa4f98`예요. 미래 merge SHA나 실시간 Wiki head가 아니에요. [Wiki 수정 PR #167](https://github.com/ethanhee890-commits/dex-company-wiki/pull/167)과 [checkpoint #55](https://github.com/ethanhee890-commits/dex-company-wiki/issues/55)에서 이후 변경을 확인해요. 이 스냅샷의 검증 결과는 위 Runtime SHA에만 적용해요.

### QA와 남은 문제

Runtime #194의 최소 의존성 보안 수정과 #203의 전 분야·기기 독립 개선을 결합해 위 commit에서 검증했어요. 사전 worktree 검사, 원래 Task를 받는 verifier, 저장소별 lease/counter/result, OS 신원, provider 가용성, 동일 탭 초안 복구와 공통 Skill을 포함해요. 자동 검사·smoke·rollback·audit 결과는 위 snapshot에만 적용해요. 운영 credential 기본 검사와 fail-closed 정책은 유지돼요.

2026-09-09의 과거 Windows 검사에서는 승인된 `DexWorker`가 아닌 개인 계정으로 첫 host identity gate가 **FAIL**이었어요. 개인 계정의 read-only 진단에서 stable Codex 0.153.4, ChatGPT Pro 로그인, provider API key 미사용, Sol/Astra catalog와 medium no-op은 확인했지만 승인 worker의 #190/#28 evidence로 승격하지 않아요. 따라서 #190과 #28 physical host는 **Not Checked**, #34/#35는 blocked를 유지해요.

역사적 PR #185의 `33853299911` attempt 2 network timeout과 PR #157/#186 실패, 과거 PR #193의 moderate 2건도 보존해요. 현재 의존성 audit과 과거 결과를 섞지 않으며, audit 0건은 모든 보안 위험이나 실기기 검증의 완료를 뜻하지 않아요.

### 다음 작업 / Next Prompt

먼저 [최신 병합 기록](https://github.com/ethanhee890-commits/dex-company-wiki/blob/main/10_Projects/DexCompany-Ops/Tasks/DEX-PORTABLE-OS-20260912/MERGE_REVIEW.md)을 확인해요. 실제 실행을 검증할 때는 선택한 host의 경로·승인 계정과 위 Runtime commit을 고정하고 worker:host-check → codex:doctor → codex:compatibility → codex:status 및 effective model/계정/service tier를 확인해요. [Phase 3 runbook](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/58860eec7f9eed5dc53687b4c3a08323ddf47ece/docs/PHASE3_LOCAL_BRIDGE.md)의 여섯 시나리오와 [필수 안전검사표](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/58860eec7f9eed5dc53687b4c3a08323ddf47ece/docs/PHASE3_SAFETY_MATRIX.md)를 선택 실행 환경에 맞게 검증해요. Windows NTFS/ACL 명령은 Windows 경로에만 적용하며 Mac에는 동등한 POSIX/ACL·프로세스·파일 경계를 검증해요. 새 worker 버전 기동 전 기존 consumer를 중지·drain하고 lease/receipt를 대조해요. 기기가 없으면 해당 검사는 Not Checked로 남기고 허용된 다른 작업을 계속해요.

| ID | 추가 필수 검사 |
|---|---|
| P3-PERM | 새 작업·이어가기·복원·재시작에서 실제 sandbox/approval 권한 유지 |
| P3-CWD | 실제 child cwd와 repository realpath가 등록된 Task 대상과 일치 |
| P3-PROCESS | PID·creation time·Task 소유권 및 모든 descendants 종료 확인 전 lease 해제·재시도 금지 |
| P3-SCOPE | Task-owned cleanup만 허용; 먼저 no-op 경계 검사, synthetic outside/sibling sentinel 보존 |

실제 home/다른 저장소 삭제 명령을 테스트로 실행하지 않아요. 필요한 속성을 runtime이 검사·강제하지 못하면 **Not Checked로 멈추고 구현 누락을 추적**해요. 경로 추측·권한 확대·중복 worker로 우회하지 않아요. 독립 검수자가 공통 안전과 선택 경로의 전체 증거를 확인하기 전에는 해당 기능을 활성화하지 않아요. #28의 Windows 항목은 별도로 OPEN을 유지하고 #34/#35도 현재 blocked를 유지해요.

### 계속 적용되는 보안·권한 규칙

예상하지 않은 `danger-full-access`, sandbox 해제, `approval=never`, unknown profile 또는 권한 확대는 mutation 전에 FAIL/CANCEL해요. 전용 non-admin worker는 profile-local ChatGPT 로그인만 사용하고 GitHub CLI/Git/SSH push credential, GitHub App secret, provider API key를 받지 않아요. GitHub 인증과 Task 승인·publication은 broker 경계에 유지해요.

Hosted MCP writes, unattended Production consumer, multi-writer, automatic approval, paid API/fallback, credit/reset 자동 사용은 비활성이에요. Browser/Computer Use/full CDP/Remote/Voice/Sites, WSL 전환, experimental 기능, diagnostic upload, plugin 자동 install/update/reconcile와 legacy 삭제도 기존의 별도 승인·검증 없이 활성화하지 않아요. provider cache/UI/history는 Task/승인 authority가 아니에요. 아래 원문에 있는 더 상세한 동일 정책도 계속 유효해요.

### 보존한 기준과 출처

#17 완료, Phase 3 구현 PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`, Phase 2 PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`, Phase 1 PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`, 전용 host PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`를 유지해요. 승인 authenticated PWA write는 그대로, hosted MCP write는 비활성이에요. 모델·요금·API/credit/reset·worker/OS 권한·배포 설정은 바꾸지 않았어요.

[Runtime 수정 PR](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/203) · [브랜치 CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34676805956) · [병합 후 CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/34676977854) · [역사적 실패 로그](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33853299911/job/100962362749) · [현재 #28](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28)

문서 일치·원문 무변경 검사는 `node scripts/ops-state.mjs`로 수행해요. 실제 원격 CI 재실행이나 Windows E2E를 대신하지 않아요.

<!-- DEX_CURRENT_STATUS_END -->

<details>
<summary>원문 보존 — 정책은 계속 유효하며, 이전 상태값과 Next Prompt만 위 블록으로 대체해요</summary>

<!-- DEX_PRESERVED_20260906_BEGIN -->
# Current State

- Last updated: 2026-09-02
- Source of Truth: GitHub `main`

## 2026-09-02 Runtime PR #95 repository head / #28 Phase 3 implementation merged, approved-host E2E pending — authoritative current state

- `confirmed`: Runtime current `main`은 PR #95 merge `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`입니다.
- `confirmed`: PR #89, #91, #92, #94는 Codex stable·marketplace 관련 watch-only 문서 변경입니다. Runtime 코드·권한·비용·plugin/Skill·배포 동작을 활성화하지 않았습니다.
- `confirmed · PASS`: Runtime #28 Phase 3 implementation PR #88이 `ae9552aa5cbacf78bb4789ce913142397e2a3968`로 병합됐습니다. Bounded local broker↔dedicated-worker bridge, atomic one-writer claim, durable broker-only coordination, Task/attempt/hash/deadline binding, explicit one-time approval, whole-run timeout·official `turn/interrupt`, stale-result rejection, deterministic Watchdog, SHA-pinned built-in verification과 distinct read-only ephemeral verifier가 구현됐습니다.
- `confirmed · PASS`: PR #88 branch validation `33569106659`는 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP이고 production dependency audit는 0 vulnerabilities입니다. Branch Vercel과 merge-SHA Production Vercel은 PASS입니다.
- `confirmed · PASS`: PR #95 branch validation `33570034722`, post-merge `main` validation `33570148285`, branch Vercel과 merge Vercel은 PASS입니다.
- `confirmed · PASS`: Runtime #28 Phase 1 execution core는 PR #63, Phase 2 PWA/read-only MCP canonical status-result retrieval은 PR #67, dedicated Windows worker safety baseline은 PR #60입니다.
- Runtime Issue #17: **PASS / closed as completed**.
- Runtime Issue #28: **OPEN / Phase 1 PASS / Phase 2 PASS / Phase 3 implementation merged / approved Windows-host E2E Not Checked**.
- `Not Checked`: PR #88 merge SHA에 연결된 별도 post-merge GitHub Actions는 조회되지 않았습니다. PR #95 post-merge `main` validation은 `33570148285`로 PASS입니다.
- `Not Checked`: approved Windows-host의 offline/resume, no-op, one-file mutation, approval pending/deny, timeout/late-result rejection, detached verifier, same Task ID PWA/read-only MCP retrieval과 operational Runtime/Wiki `main`·Production mutation 0 E2E.
- Runtime #34 Work/mobile submit-status-result와 #35 capability-routed readers/verifier는 #28 전체 PASS까지 차단됩니다.
- Codex 0.152.1은 별도 stable-validation candidate이며 자동 설치·승격하지 않습니다.
- Hosted MCP writes, paid API/automatic fallback, diagnostic auto-upload, `danger-full-access`, multi-writer, automatic merge/deploy와 remote marketplace mutation은 계속 비활성입니다.
- Canonical evidence: Runtime PR #88, validation `33569106659`, Issue #28 comment `5501642642`, `docs/PHASE3_LOCAL_BRIDGE.md`, Runtime PR #95와 branch/post-merge validations `33570034722`/`33570148285`.

The architecture and dated evidence below are retained for context. Any older statement that says #17 is open, #28 is blocked/unimplemented, Phase 3 implementation is absent, or owner approval is still required is superseded by this authoritative section and the final current gate section.

## Dex Company v2

**Status:** Runtime repository head는 PR #95 merge `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`입니다. Phase 3 구현 기준은 PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`, Phase 2 PR #67, Phase 1 PR #63, dedicated-host safety PR #60입니다. #17은 PASS/closed이고 #28은 Phase 3 implementation merged / approved-host E2E Not Checked입니다. Codex 0.152.1과 PR #89/#91/#92/#94 watch-only 변경은 별도 검증 전 자동 활성화하지 않습니다.

### Approved direction

- Obsidian is excluded from the official architecture.
- `dexcompany.app` is the universal PC/tablet/mobile front door.
- ChatGPT and Claude connect to one shared Dex MCP Gateway.
- Canonical routing uses role/capability; provider adapters preserve provider-specific optimization.
- Canonical orchestration uses `One Task ID / One Accountable Lead / Capability-Routed Workers / Risk-Based Independent Verification / One Canonical Result / Zero User Re-entry`.
- Subscription-first execution is mandatory; paid API and automatic paid fallback are disabled.
- GitHub Task Bus and Task/Result Packet preserve state across AI, device and host changes.
- Codex execution uses `codex app-server --stdio`; deprecated `codex mcp-server` is not a Runtime dependency.
- Codex models are discovered from the authenticated App Server `model/list`; remembered model names are not canonical runtime state.
- Dex-owned Skills and Plugins are versioned in Git and distributed from the Runtime repository marketplace.
- Optional Codex capabilities remain disabled until their separate activation gates pass.

### Wiki control plane

- Dex Company v2 control-plane merge: `90a110851b884f46679bd6f338e64ec0baea1e8f`
- `AI_CONTRACT.md` and provider entry files are canonical.
- Platform parity, PWA product spec, MCP architecture and subscription policy are canonical.
- Obsidian guidance remains legacy compatibility reference only.
- Runtime implementation, validation and deployment results are reflected in DexCompany-Ops state and QA records.
- Skill/Plugin governance: `20_Codex_Handoff/DEX_SKILL_PLUGIN_GOVERNANCE.md`
- Plan-aware model readiness evidence: `10_Projects/DexCompany-Ops/MODEL_RETIREMENT_PLAN_AWARE_20260826.md`
- Codex 0.150 response evidence: `10_Projects/DexCompany-Ops/CODEX_0150_RESPONSE_20260827.md`
- Codex 0.151 response evidence: `10_Projects/DexCompany-Ops/CODEX_0151_RESPONSE_20260830.md`
- Codex 0.152 stable response evidence: `10_Projects/DexCompany-Ops/CODEX_0152_STABLE_RESPONSE_20260901.md`
- Post-0.151 upstream watch evidence: `10_Projects/DexCompany-Ops/CODEX_POST_0151_WATCH_20260830.md`
- `update_plan` opt-in correction/watch evidence: `10_Projects/DexCompany-Ops/CODEX_UPDATE_PLAN_OPTIN_WATCH_20260831.md`
- Guardian first-REPL fast-start watch evidence: `10_Projects/DexCompany-Ops/CODEX_GUARDIAN_REPL_FAST_START_WATCH_20260830.md`
- MCP package-style server-name watch evidence: `10_Projects/DexCompany-Ops/CODEX_MCP_PACKAGE_NAMES_WATCH_20260831.md`
- Model-retirement effective-date evidence: `10_Projects/DexCompany-Ops/CODEX_MODEL_RETIREMENT_EFFECTIVE_20260831.md`
- Usage-reset guidance: `10_Projects/DexCompany-Ops/CODEX_USAGE_RESET_GUIDANCE_20260831.md`
- Rate-limit banner safety evidence: `10_Projects/DexCompany-Ops/CODEX_RATE_LIMIT_BANNER_WATCH_20260831.md`
- Worker-host security evidence: `10_Projects/DexCompany-Ops/WORKER_HOST_SECURITY_20260831.md`
- Codex 0.152 alpha.6 watch evidence: `10_Projects/DexCompany-Ops/CODEX_0152_ALPHA6_WATCH_20260831.md`
- Sites/Record & Replay watch evidence: `10_Projects/DexCompany-Ops/CODEX_SITES_RECORD_REPLAY_WATCH_20260831.md`
- Guardian review-evidence watch: `10_Projects/DexCompany-Ops/CODEX_GUARDIAN_REVIEW_EVIDENCE_WATCH_20260831.md`
- MCP event/Voice lifecycle watch: `10_Projects/DexCompany-Ops/CODEX_MCP_EVENT_VOICE_WATCH_20260901.md`
- Paginated-wake/installed-Voice-host watch: `10_Projects/DexCompany-Ops/CODEX_PAGINATED_WAKE_VOICE_HOST_WATCH_20260901.md`

### Runtime

- Repository: `ethanhee890-commits/ethanhee890-commits-dex-company-runtime`
- Visibility: private
- Canonical branch: `main`
- Current merge commit: `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65` — Runtime PR #95
- Current Phase 3 implementation baseline: PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`
- Current Phase 2 retrieval baseline: PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`
- Current Phase 1 execution-core baseline: PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- Dedicated-host safety baseline: PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Runtime PR #15: model retirement and canonical Skill/Plugin package merged
- Runtime PR #16: plan-aware model readiness merged
- Runtime PR #22: Codex 0.150 stable capability tracking merged
- Runtime PR #24: Codex 0.151 recommended stable target sync merged
- Runtime PR #26: post-0.151 upstream workflow watch gates merged
- Runtime PR #29: stable `codex doctor --json` approved-host preflight merged
- Runtime PR #31: Windows control surfaces and shared agentic allowance safety policy merged
- Runtime PR #32: Guardian first Node REPL fast-start watch gate merged
- Runtime PR #27: subscription worker child-environment isolation merged
- Runtime PR #33: accountable multi-worker orchestration policy contract merged
- Runtime PR #36: package-style MCP server-name interoperability watch gate merged
- Runtime PR #38: actionable rate-limit banner safety watch merged
- Runtime PR #39: `update_plan` upstream opt-in/default-false correction merged
- Runtime PR #40: Codex 0.151 Doctor check-map compatibility merged
- Runtime PR #41: approved-host Windows child-environment boundary and real-process canary merged
- Runtime PR #42: dedicated-account/credential preflight, project→realpath registry and output secret scan merged
- Runtime PR #43: registry SHA-256 pin and profile-local `CODEX_HOME` boundary merged
- Runtime PR #46: Sites and Record & Replay watch-only gates merged
- Runtime PR #47–#50: Guardian review-evidence retention watch extensions merged
- Runtime PR #51: MCP event persistence and native Voice groundwork watch merged
- Runtime PR #52: paginated empty-wake reconstruction and installed Voice host isolation watch merged
- Runtime PR #59: stable App Server sandbox enum `workspace-write` correction merged
- Runtime PR #60: read-only Task→actual App Server `read-only` sandbox enforcement and `danger-full-access` rejection merged
- Runtime PR #61: raw usage metadata watch-only tracking merged
- Runtime PR #63: bounded Unified Task execution core merged — #28 Phase 1
- Runtime PR #64: turn-provenance analytics watch-only tracking merged
- Runtime PR #65: Guardian retention parity and diagnostic hardening watch-only tracking merged
- Runtime PR #66: shared-history compression watch-only tracking merged
- Runtime PR #67: canonical PWA/read-only MCP Task status-result retrieval merged — #28 Phase 2
- Runtime PR #68–#87, #89, #91–#92, #94: provider/capability watch-only documentation tracking merged; no operational capability activation
- Runtime PR #88: bounded local broker↔dedicated-worker bridge implementation merged — #28 Phase 3 implementation baseline
- Vercel project: `dex-company-runtime`
- Vercel production URL: `https://dex-company-runtime.vercel.app`
- Runtime validation run `33472254938`: PASS — PR #59 branch
- Runtime PR #59 post-merge validation and Vercel: PASS
- Runtime validation run `33472784827`: PASS — PR #60 branch, 198 total / 197 PASS / 0 FAIL / 1 Windows-only SKIP
- Runtime validation run `33472864786`: PASS — PR #60 post-merge `main`
- Runtime PR #60 merge-commit Vercel deployment status: PASS
- Runtime PR #63 validation `33476870379` and `33477009626`: PASS; merge Vercel PASS
- Runtime PR #64 validation `33488485485`: PASS; merge Vercel PASS
- Runtime PR #65 validation `33504049198`: PASS; merge Vercel PASS; merge-SHA post-merge Actions Not Checked
- Runtime PR #67 validation `33509769758`: PASS; branch/merge Vercel PASS; merge-SHA post-merge Actions Not Checked — #28 Phase 2 baseline
- Runtime PR #88 validation `33569106659`: 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP; branch/merge Vercel PASS; merge-SHA post-merge Actions Not Checked — Phase 3 implementation baseline
- Runtime PR #95 branch validation `33570034722` and post-merge `main` validation `33570148285`: PASS; branch/merge Vercel PASS — current repository head
- Runtime CI (static checks, unit tests, smoke tests, rollback guard, production dependency audit): PASS
- PWA shell, Orchestrator, MCP Gateway, GitHub Task Store and manual OpenAI/Claude subscription worker bootstrap: implemented
- Bounded Task execution core (claim/checkpoint, one writer, Watchdog, detached verifier, durable Result/receipt): implemented and validated — Runtime #28 Phase 1
- PWA/read-only MCP canonical status-result retrieval: implemented and validated — Runtime #28 Phase 2
- Approved-host broker↔worker Unified Task E2E: implementation merged; physical Windows-host matrix Not Checked — Runtime #28 Phase 3
- GitHub App installation authentication: Production PASS
- GitHub user OAuth and private repository read: Production PASS
- PWA Task creation: approved Production flow PASS
- PWA writes: Enabled for approved authenticated Production flow
- Hosted MCP writes: Disabled
- Subscription worker exact child-environment allowlist and actual Windows child canary: PASS — Runtime PR #27, #41
- Dedicated-account preflight, project→realpath registry + SHA-256 pin and output secret scan implementation/CI: PASS — Runtime PR #42, #43
- Personal interactive Windows identity as unattended worker: intentionally unsuitable when usable personal GitHub authentication is present; it remains the broker/interactive boundary, not the worker identity
- Actual dedicated worker identity, broker-only credential boundary, host registry/digest and real worker-result secret-scan E2E: PASS — Runtime #17 final host evidence
- Actual read-only worker App Server sandbox: PASS — `read-only`, approval mode `deny`; final Runtime/Wiki repository mutation 0
- Work/mobile Dex plugin submit/status/result integration: tracked-disabled — Runtime #34
- Capability-routed read workers and independent verifier expansion: tracked-disabled — Runtime #35
- Paid AI API: Disabled
- Automatic paid fallback: Disabled
- ChatGPT Developer Mode OAuth/read/widget: Not Checked
- Claude Remote MCP OAuth/read/widget: Not Checked
- Approved local Codex subscription worker technical/safety readiness: PASS; functional Doctor result remains `PASS_WITH_WARNINGS` with failed check 0 — Runtime #17 PASS/closed after owner-approved rebaseline
- Approved local Claude subscription worker: Not Checked

The Runtime repository name contains the owner prefix twice because of the initial mobile creation flow. It remains the official Runtime repository unless a later controlled rename is approved; no duplicate repository is required.

### Unified Task and Work integration

- Accountable Lead 한 명이 Task context·routing·승인·상태·최종 통합을 책임하지만 필요한 실행 worker는 capability에 따라 복수일 수 있습니다.
- 독립 read/research worker는 병렬화할 수 있고 동일 mutation scope의 active writer는 한 명으로 직렬화합니다.
- Unattended Production consumer activation은 계속 비활성입니다. Phase 1 core는 bounded broker 실행과 fake-adapter CI 경계에서 검증됐습니다.
- Runtime #28 Phase 1 execution core와 Phase 2 PWA/read-only status-result retrieval은 PASS입니다. Phase 3 bounded local bridge implementation은 PR #88로 병합됐으며 approved-host E2E가 남아 있습니다.
- Runtime #34는 #28 PASS 뒤 Work·모바일 plugin의 `submit_task`·status·result 흐름을 추적합니다.
- Runtime #35는 #28 PASS 뒤 capability-routed reader와 independent verifier 확대를 추적합니다.
- 설치된 plugin은 제품상 지원되는 Chat/Work의 web·desktop·mobile에서 사용할 수 있지만 현재 계정의 Dex plugin 설치·remote MCP 연결·workspace policy·실제 호출은 Not Checked입니다.
- native chat callback은 best effort이며 임의의 닫힌 기존 thread로 장기 결과를 강제 삽입하는 기능을 완료 기준으로 삼지 않습니다. PWA result inbox가 canonical fallback입니다.

### Codex stable and model policy

- Compatibility floor: `0.150.0`.
- Recommended stable target for the currently approved host: `0.151.0`.
- Official stable `0.152.1` is a separate next validation candidate; do not auto-install or promote it until approved-host Doctor/compatibility/status and required regressions pass.
- Compatibility probe version: `4`.
- Stable and prerelease SemVer are distinguished; prerelease builds do not satisfy the approved stable-host gate.
- Version is an upgrade recommendation, not capability evidence; generated schema remains authoritative.
- `releasePolicy.meetsCompatibilityMinimum` reports whether a stable host meets the 0.150 floor.
- `releasePolicy.meetsRecommendedMinimum` reports whether a stable host meets the currently configured 0.151 recommended target.
- A compatible 0.150.x host may remain operational while returning `upgradeRecommended: true`.
- Required baseline requests: `account/read`, `model/list`, `thread/start`, `turn/start`.
- Missing baseline capability fails closed before account connection.
- `npm run codex:doctor` runs official `codex doctor --json` through the shell-free resolver and must pass or warn before compatibility/status validation continues.
- `npm run codex:compatibility` performs release-policy and schema inspection.
- `npm run codex:status` performs compatibility, ChatGPT-managed subscription, model catalog, retirement readiness and rate-limit checks.
- Child execution remains `shell:false`; model-controlled Codex/Claude child processes receive only the exact case-insensitive OS/profile allowlist plus `CODEX_HOME` or `CLAUDE_CONFIG_DIR`. Runtime/GitHub/OAuth/Redis/KV/Vercel/cloud/proxy/Git/SSH/custom variables, `NODE_OPTIONS`, provider API credentials and Claude setup token are not propagated.
- Read-only Task execution uses actual App Server `read-only`; bounded repository mutation uses `workspace-write`; `danger-full-access` is not accepted by the Dex adapter.
- Model discovery includes hidden models and bounded cursor pagination: 100/page, 20 pages, 1,000 models.
- Invalid catalog responses, cursor cycles, unknown explicit models and missing required official replacements fail closed.
- `gpt-5.4` maps to `gpt-5.6-terra` and `gpt-5.4-mini` to `gpt-5.6-luna` for the 2026-08-31 retirement when the replacement exists in the authenticated catalog.
- `retirementReady` is plan-aware: a retired source model blocks readiness only when that source is exposed by the account catalog without its official replacement.
- A replacement absent because the plan never exposed the retired source does not block readiness; explicitly requesting that retired model still fails closed without its replacement.
- For Ethan's Pro account, Sol·Terra·Luna are expected in Codex; Free/Go portability does not incorrectly require Luna.
- Healthy 5.6 catalog defaults remain server-controlled; no unnecessary global hard-coded default was added.
- When the active plan uses a shared agentic allowance, Dex routes by capability/value and low rework instead of deliberately duplicating the same execution across Codex, Work, Excel or Workspace Agents.

### Codex 0.151 stable impact

Codex `0.151.0` stable adds changes that are directly useful to Dex without requiring risky activation:

- configurable optional MCP tool-discovery grace period
- extension-side MCP tool-result inspection/replacement support
- structured MCP tool/resource errors preserved in App Server responses
- per-repository plugin catalog configuration fixes
- restored permission profiles preserved across TUI turns
- `/cd` can no longer weaken sandbox restrictions
- remote sandbox enforcement uses executor home/OS/path semantics
- model switch/fallback keeps tool availability and reasoning effort aligned
- nested subagent token usage counts toward root goal budgets
- stale Guardian classification cannot authorize after permission-state changes

Dex uses these as reasons to recommend 0.151 on the approved host, but no new optional capability is automatically enabled.

### Codex capability status

| Capability | Maturity | Runtime state | Tracking |
|---|---|---|---|
| Approved-host upgrade and validation | stable 0.151 | `validated-dedicated-local-runner`; unattended consumer activation disabled | Runtime #17 PASS/closed after owner-approved rebaseline |
| MCP `runtimeStatus` | stable App Server schema | `tracked-disabled` | Runtime #18 |
| MCP package-style server names | stable 0.152 code line | `watch-disabled` | Runtime #18 |
| Task `@` mentions | stable TUI | `design-backlog`, disabled | Runtime #19 |
| `Interrupt` hook | stable CLI | `security-design-backlog`, disabled | Runtime #20 |
| Unfinished-turn suspension | Core support without confirmed public stable App Server request | `watch-disabled` | Runtime #21 |
| Paginated thread history | experimental App Server | `watch-disabled` | Runtime #21 |
| `update_plan` opt-in/default-false behavior | stable 0.152 code line | `watch-disabled` | Runtime #25 |
| Vim composer search motions | stable 0.152 code line | `watch-disabled` | Runtime #25 |
| Guardian authorization across compaction/internal context | stable 0.152 code line | `watch-disabled` | Runtime #25 |
| Windows Remote Control | official Help surface | `security-design-backlog`, disabled | Runtime #30 |
| Windows WSL selection | official Help surface | `host-evaluation`, disabled | Runtime #30 |
| Browser Developer Mode / full CDP | official Help surface | `security-design-backlog`, disabled | Runtime #30 |
| First Node REPL `js` fast-start before Guardian completes | stable 0.152 code line | `security-watch-disabled` | Runtime #30 |

Additional rules:

- MCP `runtimeStatus` support is confirmed since stable `0.150.0`, but operational integration remains disabled.
- Codex 0.151 MCP reliability improvements are inputs to Runtime #18; they do not change Gateway authority or write policy.
- Package-style MCP identifiers are not a Dex dependency; stable 0.152 inclusion alone does not authorize activation. Approved-host add/get/list/remove plus OAuth lookup round-trip tests must pass first.
- Dex MCP Gateway health and Codex worker internal MCP status are different authorities.
- Tool inventory does not prove a live MCP connection.
- Codex task/thread may become execution references only; GitHub Task Bus remains canonical.
- No `Interrupt` hook is configured until security, idempotency and approved-host E2E pass.
- Production `experimentalApi` remains disabled.
- Stable inclusion of an upstream feature does not automatically make it a Dex operational dependency; each linked activation gate remains authoritative.
- `update_plan` is confirmed in the 0.152 stable code line as opt-in/default-false. Dex keeps it disabled/watch-only until approved-host tool-surface and prompt-regression verification pass.
- Browser/Computer Use/full CDP and the 0.152 first-REPL Guardian fast-start are not Dex dependencies; they remain disabled/watch-only until explicit security gates pass.

### Post-0.151 / 0.152 stable watch

OpenAI Codex 0.152.0 stable includes several previously tracked post-0.151 changes, including `update_plan` opt-in/default-false, Vim composer search, Guardian compaction authorization/evidence preservation, package-style MCP server names, per-tool MCP output limits and long `thread/shellCommand` timeout. Dex treats stable inclusion as maturity evidence only, not activation authority. Approved-host promotion to 0.152 and capability-specific regressions remain separate from the completed 0.151 dedicated-host Gate. Changes merged after the 0.152 release cutoff continue to be upstream-main/watch-only evidence.

### Skill and Plugin status

- Canonical marketplace: Runtime `.agents/plugins/marketplace.json`
- Canonical plugin: Runtime `plugins/dex-company-core`, version `1.0.0`
- Canonical skills:
  - `use-dex-company`
  - `create-screen-spec`
- The current plugin contains no machine-specific path, paid API credential, local knowledge-vault dependency, private MCP duplicate, `.mcp.json` or `.app.json`.
- A registered remote Dex MCP `.app.json` connection is a future Runtime #34 deliverable after #28; it is not implemented or enabled.
- The deployed shared Dex MCP Gateway remains the integration surface.
- Legacy `dex-company-work@eden-local` and standalone global `create-screen-spec` have not been removed and remain compatibility fallback pending approved-host forward tests; their current installed/enabled state is Not Checked.
- Legacy source diff, unique-content comparison and removal: Not Checked / Not Performed.
- OpenAI-managed built-in system Skills are provider-owned and were not modified.
- OpenAI Skills API is not used because it requires API authentication and conflicts with the default subscription-first policy.

## Official components

- GitHub Dex Company Core
- Dex Runtime
- `dexcompany.app` PWA
- Dex Orchestrator
- Dex MCP Gateway
- provider adapters and subscription workers
- GitHub Task Bus
- Git-backed Dex Skill/Plugin marketplace
- QA/Watchdog

## Confirmed projects

### DexCompany-Ops

- Status: active
- Operational status: v2-codex-0151-recommended-tracked-disabled

### JiguRadio

- Status: production-maintenance

### JiguRadio-Renewal

- Status: active-experiment

### MixedWorkspace-Recovery

- Status: triage-only

## Validation status

- GitHub Source of Truth: PASS
- Wiki v2 control-plane merge: PASS
- Runtime PR #15 merge: PASS
- Runtime PR #16 merge: PASS
- Runtime PR #22 merge: PASS
- Runtime PR #24 merge: PASS
- Runtime PR #26 merge: PASS — post-0.151 watch gates
- Runtime PR #29 merge: PASS — `codex doctor --json` preflight
- Runtime PR #31 merge: PASS — Windows control/shared allowance safety tracking
- Runtime PR #32 merge: PASS — first Node REPL Guardian fast-start security watch
- Runtime PR #27 merge: PASS — exact subscription worker child-environment isolation
- Runtime PR #33 merge: PASS — accountable multi-worker policy contract
- Runtime PR #36 merge: PASS — package-style MCP server-name interoperability watch
- Runtime PR #38 merge: PASS — actionable rate-limit banner safety watch
- Runtime PR #39 merge: PASS — `update_plan` opt-in/default-false correction
- Runtime PR #40 merge: PASS — Codex 0.151 Doctor check-map compatibility
- Runtime PR #41 merge: PASS — Windows child-environment boundary and actual-process canary
- Runtime PR #42 merge: PASS — dedicated-account/credential preflight, realpath registry and output secret scan implementation
- Runtime PR #43 merge: PASS — registry digest pin and profile-local `CODEX_HOME`
- Runtime PR #46 merge: PASS — Sites/Record & Replay watch-only gates
- Runtime PR #47–#50 merge: PASS — Guardian review-evidence watch extensions
- Runtime PR #51 merge: PASS — MCP event persistence/native Voice watch-only evidence
- Runtime PR #52 merge: PASS — paginated empty-wake/installed Voice host watch-only evidence
- Runtime PR #59 merge: PASS — stable App Server `workspace-write` enum correction
- Runtime PR #60 merge: PASS — read-only Task sandbox enforcement and `danger-full-access` rejection
- Runtime PR #61 merge: PASS — raw usage metadata watch-only tracking
- Runtime PR #63 merge: PASS — bounded Unified Task execution core / #28 Phase 1
- Runtime PR #64 merge: PASS — turn-provenance analytics watch-only tracking
- Runtime PR #65 merge: PASS — Guardian retention parity and diagnostic hardening watch-only tracking
- Runtime PR #66 merge: PASS — shared-history compression watch-only tracking
- Runtime PR #67 merge: PASS — PWA/read-only MCP canonical Task status-result retrieval / #28 Phase 2
- Runtime #17 final dedicated-host evidence: PASS_WITH_WARNINGS for Doctor warnings / technical-safety PASS / owner-approved rebaseline PASS / Issue closed
- Runtime validation run `32911751171`: PASS — model/plugin refresh
- Runtime validation run `32913301010`: PASS — plan-aware readiness
- Runtime validation run `33022962598`: PASS — Codex 0.150 tracking
- Runtime validation run `33281400062`: PASS — Codex 0.151 stable-target sync
- Runtime validation run `33301683108`: PASS — post-0.151 watch gates
- Runtime validation run `33311981712`: PASS — Codex Doctor preflight
- Runtime validation run `33312295800`: PASS — Windows control/shared allowance safety tracking
- Runtime validation run `33314314330`: PASS — first-REPL Guardian watch gate
- Runtime validation run `33317627474`: PASS — PR #27 latest-main merge-ref refresh
- Runtime validation run `33317754565`: PASS — PR #27 post-merge main
- Runtime validation run `33318160221`: PASS — PR #33 post-merge main
- Runtime validation run `33326106991`: PASS — MCP package-style server-name watch
- Runtime validation run `33347689531`: PASS — `update_plan` opt-in/default-false correction
- Runtime validation run `33349292836`: PASS — PR #40 post-merge `main`
- Runtime validation run `33350614687`: PASS — PR #41 post-merge `main`
- Runtime validation run `33361000729`: PASS — PR #42 post-merge `main`
- Runtime validation run `33361420964`: PASS — PR #43 post-merge `main`
- Runtime validation run `33373268611`: PASS — PR #46 post-merge `main`
- Runtime validation run `33403975722`: PASS — PR #47 post-merge `main`
- Runtime validation run `33430847137`: PASS — PR #51 branch
- Runtime validation run `33430915053`: PASS — PR #51 post-merge `main`
- Runtime validation run `33436716816`: PASS — PR #52 branch
- Runtime validation run `33436796747`: PASS — PR #52 post-merge `main`
- Runtime validation run `33472254938`: PASS — PR #59 branch
- Runtime validation run `33472784827`: PASS — PR #60 branch
- Runtime validation run `33472864786`: PASS — PR #60 post-merge main
- Runtime validation runs `33476870379`, `33477009626`: PASS — PR #63
- Runtime validation run `33488485485`: PASS — PR #64
- Runtime validation run `33504049198`: PASS — PR #65 branch
- Runtime PR #65 merge-SHA post-merge GitHub Actions: Not Checked; Vercel PASS
- Runtime validation run `33509769758`: PASS — PR #67 branch
- Runtime PR #67 branch/merge Vercel: PASS; merge-SHA post-merge GitHub Actions: Not Checked
- Runtime static checks: PASS
- Runtime tests: PASS — PR #67 evidence 215 total / 214 PASS / 0 FAIL / 1 Windows-only SKIP
- Plan-aware model readiness edge tests: PASS — 2/2
- Dex plugin package tests: PASS — 5/5
- Codex capability-tracking tests: PASS
- 0.149-style backward-compatible schema: PASS
- 0.150 compatibility floor / 0.151 recommended target release policy: PASS
- Stable MCP runtime-status tracked-disabled regression: PASS
- MCP package-style server-name watch-disabled regression: PASS
- Post-0.151 `update_plan`, Vim-search and Guardian watch-disabled regression: PASS
- `update_plan` opt-in/default-false chronology and prompt-preservation regression: PASS
- First Node REPL Guardian fast-start security-watch-disabled regression: PASS
- Stable/prerelease version ordering and release policy: PASS
- Runtime smoke test: PASS
- Vercel adapter smoke: PASS
- Rollback guard: PASS
- Production dependency audit: PASS — 0 vulnerabilities on PR #59/#60 validation
- Prior merge-commit Vercel deployment status: PASS
- Runtime PR #32 merge deployment status: PASS
- Canonical plugin present on Runtime `main`: PASS
- Runtime `main` capability tracking config: PASS — schema `1.8`
- Active Codex config/profile/managed-policy candidate scan: PASS — 9 files, unsupported approval-policy reference 0건, config mutation 0건
- Approved-host Codex `0.151.0` installation: PASS
- Approved-host `npm run codex:doctor`: PASS_WITH_WARNINGS — `readyForDexValidation: true`, failed check 0개; `git.worktree.dev_drive`·`security.endpoint` warning
- Approved-host `npm run codex:compatibility`: PASS — stable 0.151, generated schema probe PASS, baseline compatible, `upgradeRecommended: false`
- 0.151 generated optional capability diff: PASS — MCP runtime status supported/tracked-disabled, paginated history supported/tracked-disabled, unfinished-turn suspension unsupported
- Approved-host `npm run codex:status` and real `model/list`: PASS — ChatGPT Pro, total 10/visible 8/hidden 2, default `gpt-5.6-sol`, blocking migration 0, `retirementReady: true`, worker `ready: true`
- Approved-host child-environment actual-process canary: PASS — 32 environment keys, forbidden canary 0개, unexpected key 0개, `CODEX_HOME` present
- API-key and paid-fallback environment use/propagation: PASS — prohibited non-empty variable 0개
- Disposable Runtime worktree and operational-checkout isolation: PASS — source edits were confined to the clean worktree and reviewed PRs; existing dirty checkout was not modified
- Dedicated non-admin worker OS account actual execution: PASS
- Dedicated worker profile-local `CODEX_HOME` and separate ChatGPT-managed subscription auth: PASS
- Approved project→realpath registry and SHA-256 pin on actual host: PASS
- Broker-only credential boundary on dedicated worker: PASS — gh auth false, user Git helper 0, SSH private key 0, Windows GitHub credential target 0
- Dedicated identity `worker:host-check`: PASS — `ready:true`
- Real read-only worker result E2E: PASS — `DEX_WORKER_E2E_PASS`, `read-only`, approval `deny`, event count 52
- Output secret scan on canonical worker result: PASS
- Final E2E Runtime/Wiki repository mutation: 0 / PASS; both workspaces clean
- Issue #17 zero-change acceptance: PASS after owner-approved rebaseline; validation execution produced zero unreviewed/unapproved mutation outside disposable or broker-approved workspace
- Codex 0.152.1 approved-host promotion: Not Checked — separate next stable candidate, not a retroactive blocker for the 0.151 Gate
- Thread-scoped MCP runtime-status E2E: Not Checked
- MCP package-style add/get/list/remove and OAuth lookup round-trip: Not Checked
- Dex Console worker MCP diagnostics: Not Checked
- Task mention design/prototype: Not Checked
- Interrupt security prototype/E2E: Not Checked
- Stable suspension contract: Not Checked
- Stable paginated-history maturity: Not Checked
- Approved-host 0.152 `update_plan` tool-surface/prompt diff: Not Checked
- Stable/public `history_ingest_requested` contract and Dex observability value: Not Checked
- Approved-host Vim composer search availability: Not Checked
- Approved-host first Node REPL Guardian first-execution regression: Not Checked
- Browser Developer Mode/full CDP Dex threat model/E2E: Not Checked
- Windows Remote Control Dex threat model/E2E: Not Checked
- Approved-host marketplace add/install/upgrade: Not Checked
- Fresh-session discovery and invocation of both canonical skills: Not Checked
- Legacy plugin/source unique-content comparison: Not Checked
- Legacy plugin removal: Not Performed
- Post-merge direct Production HTTP smoke from the current execution environment: Not Checked
- MCP Inspector: Not Checked after two unsuccessful harness attempts; no third identical retry
- ChatGPT custom MCP end-to-end: Not Checked
- Work/mobile Dex plugin installation and submit/status/result E2E: Not Checked — Runtime #34
- Unified Task execution core (claim → one writer → Watchdog → detached verifier → durable Result/receipt): PASS — Runtime #28 Phase 1
- PWA/read-only MCP status-result retrieval: PASS — Runtime #28 Phase 2; 215 total / 214 PASS / 0 FAIL / 1 Windows-only SKIP
- Approved-host broker↔DexWorker Unified Task E2E: implementation merged; physical host matrix Not Checked — Runtime #28 Phase 3
- Capability-routed parallel readers and independent verifier expansion: Not Implemented — Runtime #35
- Claude Remote MCP end-to-end: Not Checked
- PWA physical install/offline/accessibility: Not Checked
- Redis multi-instance and forced ambiguous-response reconciliation: Not Checked

## Next gate

1. Runtime `main`을 승인 Windows host에 동기화하고 `docs/PHASE3_LOCAL_BRIDGE.md`의 #28 Phase 3 matrix만 실행합니다: offline/resume, no-op, explicit one-time one-file mutation, approval pending/deny, timeout/late-result rejection, detached verifier, same Task ID PWA/read-only MCP retrieval과 운영 main/Production mutation 0을 증명합니다.
2. #28 전체 PASS 뒤 Runtime #34 Work/mobile least-privilege submit/status/result와 #35 bounded read workers/risk-based verifier 확대를 별도 Gate로 진행합니다.
3. Runtime #18은 read-only diagnostics 범위에서만 진행하며 Gateway authority나 hosted write policy를 변경하지 않습니다.
4. Codex 0.152.1, Guardian diagnostics, plugin reconcile, turn provenance와 기타 watch-only capability는 approved-host/security Gate 전 비활성으로 유지합니다.
5. #17 host Gate·owner rebaseline과 완료된 #28 Phase 1·2는 반복하거나 재승인을 요청하지 않습니다.

<!-- DEX_PRESERVED_20260906_END -->
</details>
