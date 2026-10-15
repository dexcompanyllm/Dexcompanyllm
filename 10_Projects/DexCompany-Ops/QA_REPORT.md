# QA_REPORT

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
﻿# QA_REPORT

## 2026-09-02 - Runtime PR #88 Phase 3 implementation / PR #95 repository-head synchronization

### PASS

- Runtime current `main`: PR #95 `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`
- Runtime #28 Phase 3 implementation baseline: PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`
- PR #88 branch validation `33569106659`: 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP
- PR #88 static/config/secret check, smoke, Vercel adapter smoke, rollback guard: PASS
- PR #88 production dependency audit: 0 vulnerabilities
- PR #88 branch Vercel과 merge-SHA Production Vercel: PASS
- PR #95 branch validation `33570034722`, post-merge `main` validation `33570148285`, branch/merge Vercel: PASS
- Atomic one-writer claim, durable broker-only coordination, Task/attempt/hash/deadline binding과 fail-closed replay boundary: PASS
- Explicit one-time approval, blanket env approval 제거, ephemeral thread, whole-run timeout/`turn/interrupt`/late-result rejection: PASS
- One-file/one-commit allowlist, SHA-pinned built-in file verification, deterministic Watchdog와 distinct read-only verifier: PASS
- Worker adapter import가 repository `.env`를 로드하지 않는 behavioral regression test: PASS
- Runtime #17 closed, #28 Phase 1·2 PASS, #34/#35 blocked 경계 유지: PASS
- Current state, project config, current, session handoff, QA, sources, changelog와 root handoff의 repository-head/functional-baseline 구분: PASS

### FAIL

- 최종 branch/main 구현·자동 검증 범위의 활성 실패 없음

### Not Checked

- PR #88 / #94 merge SHA의 별도 post-merge GitHub Actions
- Runtime #28 Phase 3 approved Windows-host broker↔DexWorker E2E
- host offline/same-Task resume, no-op, approval pending/deny, one-file mutation, timeout/late-result rejection, detached verifier
- same Task ID PWA/read-only MCP retrieval과 host run 중 operational main/Production mutation 0
- Runtime #34/#35와 Codex 0.152.1 promotion

### Watchdog

`PASS_WITH_WARNINGS` — 구현, 보안 경계, regression tests, branch CI, dependency audit, merge와 Vercel은 PASS입니다. 승인 Windows-host E2E와 merge-SHA Actions는 Not Checked이므로 #28과 Phase 3 전체 Gate는 완료로 판정하지 않습니다.

> 아래 날짜별 QA는 historical evidence이며 위 current QA를 대체하지 않습니다.

## 2026-09-02 - Runtime PR #86 repository-head synchronization

### PASS

- Runtime current `main`: PR #86 `70eebc56b71210c3960105afc0167b1f5984b30a`
- PR #86 watch-only documentation scope: PASS — Runtime behavior, config, permissions, version, cost and operational capability activation 0건
- PR #86 branch validation `33561571348`: PASS; branch/merge Vercel PASS
- Runtime #28 Phase 2 retrieval baseline: PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`
- Runtime #28 Phase 1 execution-core baseline: PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- Dedicated-host safety baseline: PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Runtime #17: PASS / closed / completed
- Runtime #28: OPEN / Phase 1 PASS / Phase 2 PASS / Phase 3 active next
- Current state, project config, current, session handoff, QA, sources, changelog와 root handoff의 repository-head/functional-baseline 구분: PASS

### FAIL

- 없음

### Not Checked

- PR #86 merge SHA의 별도 post-merge GitHub Actions
- Runtime #28 Phase 3 approved Windows-host broker↔DexWorker Unified Task E2E
- Runtime #34 Work/mobile plugin과 #35 capability-routed reader/verifier
- PR #68–#86 provider watch capability의 stable inclusion과 approved-host activation E2E

### Watchdog

`PASS` — current repository head PR #86, 기능 실행 기준 PR #67/#63/#60, #17/#28 Gate와 Next Prompt가 명시적으로 분리·정렬됐습니다. Phase 3과 PR #86 merge-SHA Actions는 Not Checked이며 PASS로 추정하지 않습니다.

> 아래 날짜별 QA는 historical evidence이며 위 current QA를 대체하지 않습니다.

## 2026-09-01 - Runtime PR #67 / #28 Phase 2 canonical synchronization

### PASS

- Runtime current `main`: PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`
- Runtime #28 Phase 1 execution-core baseline: PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- Dedicated-host safety baseline: PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Runtime #17: owner-approved rebaseline 반영 / closed / completed
- Runtime Issue #28: OPEN / Phase 1 PASS / Phase 2 PASS / Phase 3 active next
- Runtime #28 Phase 1: atomic claim, statusVersion, one writer, fail-closed reconciliation, deterministic Watchdog, detached read-only verifier, durable Result/receipt 구현·검증
- Runtime #28 Phase 2: OAuth `dex:read` MCP `get_task_status`·`get_task_result`, authenticated PWA status/result API와 진행·결과함 구현·검증
- Canonical Task ID, `issue:<number>`와 numeric Issue reference resolution: PASS; 잘못되거나 중복된 Task ID는 fail-closed
- Read surface가 worker 시작·retry·mutation을 유발하지 않음: PASS
- PR #63 validation `33476870379`, `33477009626`: PASS
- PR #64 validation `33488485485`: PASS
- PR #67 branch validation `33509769758`: PASS — 215 total / 214 PASS / 0 FAIL / 1 Windows-only SKIP
- PR #67 static/config/dependency/secret check, smoke, Vercel adapter smoke와 production dependency audit: PASS; 0 vulnerabilities
- PR #67 branch Vercel과 merge Vercel: PASS
- AI Contract의 least-privilege, subscription-first, fail-closed, GitHub canonical Task 경계 유지
- 인증 scope 확대·hosted MCP write·worker retry·비용 정책·provider capability 활성화 변경 0건

### FAIL

- 없음

### Not Checked

- PR #67 merge SHA의 별도 post-merge GitHub Actions
- Runtime #28 Phase 3 approved Windows-host broker↔DexWorker Unified Task E2E
- Runtime #34 Work/mobile plugin과 #35 capability-routed reader/verifier
- Codex 0.152.0 approved-host promotion과 watch-only capability별 activation E2E

### Watchdog

`PASS` — #17 종료와 #28 Phase 1·2 완료가 current state·project config·current·handoff·QA·sources·changelog에 동일하게 반영됩니다. 미검증 Phase 3과 post-merge Actions는 PASS로 추정하지 않습니다.

> 아래 날짜별 QA는 historical evidence이며 위 current QA를 대체하지 않습니다.

## 2026-09-01 - Runtime #17 dedicated Windows worker 최종 E2E

### PASS

- Runtime final E2E 기준 main `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Runtime PR #59 stable App Server sandbox enum 교정: branch CI 195 total / 194 PASS / 0 FAIL / 1 Windows-only SKIP, static/secret/smoke/rollback PASS, dependency audit 0 vulnerabilities, post-merge/Vercel PASS
- Runtime PR #60 read-only Task → actual App Server `read-only` sandbox, normal mutation → `workspace-write`, `danger-full-access`/invalid sandbox fail-closed
- PR #60 branch run `33472784827`: 198 total / 197 PASS / 0 FAIL / 1 Windows-only SKIP
- PR #60 static/config/secret check, smoke, Vercel adapter smoke, rollback guard: PASS
- PR #60 production dependency audit: 0 vulnerabilities
- PR #60 post-merge run `33472864786`: PASS
- PR #60 Vercel status: PASS
- dedicated Windows worker account actual identity: PASS / non-admin
- profile-local `CODEX_HOME` and separate ChatGPT-managed subscription auth: PASS
- Codex 0.151.0 worker-local install: PASS
- `OPENAI_API_KEY` absent: PASS
- GitHub CLI auth on worker: false
- user Git credential helper count: 0
- SSH private key file count: 0
- Windows GitHub credential target count: 0
- forbidden credential environment variable count: 0
- broker-provisioned clean Runtime/Wiki workspaces: PASS
- project→realpath registry + machine-level SHA-256 pin: PASS
- dedicated identity `worker:host-check ready:true`: PASS
- changed identity/auth-home minimal Doctor/compatibility/subscription-model revalidation: PASS
- actual read-only worker result: `DEX_WORKER_E2E_PASS`
- actual App Server sandbox: `read-only`
- approval mode: `deny`
- worker event count: 52
- worker output secret-scan path: PASS
- final Runtime repository mutation: 0 / clean PASS
- final Wiki repository mutation: 0 / clean PASS
- original 0.151 dedicated-host technical/safety Gate: PASS

### FAIL

- Issue #17 historical literal zero-change acceptance criterion: `FAIL (controlled historical changes)` — 이전 prerequisite CLI install, reviewed Runtime PR/main merge, automatic Vercel deployment가 이미 canonical evidence에 controlled change로 기록되어 있으며 owner-approved rebaseline/waiver 전에는 문구 자체를 PASS로 바꾸지 않음

### Not Checked / 미구현

- owner rebaseline/waiver for Issue #17 literal zero-change criterion
- Runtime #28 consumer·atomic claim·checkpoint·one writer·deterministic Watchdog·detached verifier·durable Result/receipt·PWA inbox
- Runtime #34 Work/mobile plugin submit/status/result
- Runtime #35 capability-routed readers/verifier expansion
- Codex 0.152.0 approved-host promotion/revalidation — 별도 next stable candidate, 0.151 Gate를 소급 무효화하지 않음
- watch-only provider capabilities의 별도 activation E2E

### Watchdog

`PASS_WITH_WARNINGS` — 기술/보안 host Gate는 실제 PC에서 완전 PASS했습니다. 남은 #17 blocker는 기술 실패가 아니라 historical acceptance 문구에 대한 owner decision 1건입니다. #28은 해당 승인 후 시작하며 hosted writes, paid API/fallback, `danger-full-access`, optional capability는 계속 비활성입니다.

## 2026-08-31 - 승인 host Codex 0.151 / Runtime Issue #17 기능 Gate

### PASS

- active config/profile/managed-policy 후보 9개 검사에서 unsupported approval-policy reference 0건; config 삭제·권한 변경 0건
- Codex CLI와 Doctor report version `0.151.0`
- Runtime PR #40 merge `ce7136e853e96044fba1472537371ae8feb76a26`, post-merge run `33349292836`, Vercel PASS
- Runtime PR #41 merge `2015c87e40ccfa649418500332ebb2e5a9b116eb`, post-merge run `33350614687`, Vercel PASS
- Runtime `main` local full CI: 188/188 tests, static check, smoke, Vercel adapter smoke, rollback guard PASS
- Doctor `readyForDexValidation: true`, failed check 0개
- compatibility baseline compatible, `upgradeRecommended: false`
- MCP runtime status `supported: true`, `enabled: false`
- real authenticated ChatGPT Pro model catalog total 10개와 blocking migration 0개; `retirementReady: true`, worker `ready: true`
- API-key·paid-fallback 환경변수 사용·전파 0건
- actual child snapshot environment key 32개, forbidden canary 0개, unexpected key 0개, `CODEX_HOME` present
- generated schema baseline과 optional capability diff 확인
- source edits는 disposable worktree에 한정했고 기존 dirty Runtime/Wiki checkout은 직접 수정하지 않음

### FAIL

- Issue #17 literal zero-change acceptance criterion — global CLI 설치, reviewed PR #40/#41 `main` merge와 automatic Vercel Production deployment가 발생했습니다. 이는 controlled change이며 기존 dirty checkout, credential, permission과 manual Production setting은 변경하지 않았지만, owner-approved rebaseline/waiver 없이는 PASS가 아닙니다.

### Not Checked / 미구현

- dedicated worker OS account designation — #17 open
- approved project→realpath registry — #17 open
- broker-only push credential boundary — #17 open
- output secret scan on canonical worker results — #17 open
- thread-scoped MCP runtime-status operational E2E — #18
- Task Issue 자동 consumer·claim·checkpoint·durable Result·PWA inbox — #28
- Work/mobile submit/status/result — #34
- capability-routed readers/verifier 확대 — #35
- Production URL direct HTTP 응답 — CI와 Vercel deployment status만 확인

### Watchdog

`PASS_WITH_WARNINGS` — 승인 host 기능 readiness는 검증됐지만 Doctor의 `git.worktree.dev_drive`·`security.endpoint` warning을 보존합니다. 네 가지 host-safety evidence는 당시 Not Checked였고 literal zero-change acceptance는 controlled FAIL이었습니다. 2026-09-01 dedicated-host E2E가 이 Not Checked 항목을 PASS로 대체합니다.

## 2026-08-30 - 모바일 우선 Unified Task 정책·Runtime 보안 동기화

### PASS

- 공식 Plugins 문서에서 설치된 plugin이 지원되는 Chat/Work web·desktop·mobile에서 Skill·connector·MCP tool을 제공할 수 있음을 확인했습니다.
- 공식 MCP/package/connect 문서에서 hosted Work remote MCP, `.app.json`, HTTPS/auth/schema/confirmation/E2E 요구를 확인했습니다.
- 공식 long-running work 문서의 동일 connected source 동시 write 회피 원칙을 single-writer 정책에 반영했습니다.
- Runtime PR #27 latest-main refresh run `33317627474`, post-merge run `33317754565`, Vercel status PASS
- Runtime PR #27 exact child-env allowlist와 canary/static guard 독립 검수 PASS_WITH_RESIDUAL_RISK
- Runtime PR #33 config schema `1.5`, policy regression test, architecture scope guard, validation `33318160221`, Vercel status PASS
- canonical orchestration 문구, 책임 Lead/worker 분리, mutation-scope single writer, 위험 기반 검수, durable result-before-callback, zero re-entry 정합성 PASS
- Runtime Issues #34·#35이 #28 이후 Work/mobile와 multi-worker 확장을 별도 Gate로 추적함

### FAIL

- 확인·변경·자동 검증 범위의 실패 없음

### Not Checked / 미구현

- 승인 PC의 Codex 0.151 Doctor·compatibility·status·real `model/list` — #17
- dedicated worker OS account, approved realpath, disposable clean worktree, broker-only push credential, output secret scan
- Task Issue 자동 consumer·claim·checkpoint·durable Result·PWA inbox — #28
- Work/mobile Dex plugin 설치·OAuth·submit/status/result E2E — #34
- capability-routed parallel readers와 independent verifier 실행 — #35
- arbitrary native thread completion callback — 제품상 보장 대상 아님
- Production 직접 HTTP smoke — Not Checked

### Watchdog

`PASS_WITH_WARNINGS` — 모바일에서 가능한 low-risk hardening, 최신-main CI, 정책 계약, tracking과 canonical 문서화는 PASS입니다. local host와 실제 cross-surface 실행은 성공으로 간주하지 않습니다.

## 2026-08-26 - Codex 모델·Skill·Plugin 업데이트 대응

### PASS

- OpenAI 공식 Help에서 ChatGPT-managed Codex의 2026-08-31 GPT-5.4 계열 종료와 Terra/Luna replacement를 재검증했습니다.
- 공식 stable `rust-v0.149.1` `ClientRequest.json`에서 `model/list`를 baseline request로 확인했습니다.
- 공식 `ModelListParams`/`ModelListResponse`에서 cursor, hidden model, default, capability catalog contract를 확인했습니다.
- 공식 App Server 문서에서 `thread/turns/list`와 `thread/items/list`가 여전히 experimental이며 `experimentalApi: true`가 필요함을 확인했습니다.
- 이전 알림의 paginated history stable 승격 추정을 canonical Runtime/Wiki에서 정정했습니다.
- Runtime compatibility baseline을 `account/read`, `model/list`, `thread/start`, `turn/start`로 강화했습니다.
- authenticated model catalog를 hidden 포함 100/page, 20 pages, 1,000 models bound로 읽도록 구현했습니다.
- invalid response, repeated cursor, page/model bound, unknown explicit model, missing official replacement를 fail-closed합니다.
- `gpt-5.4` → `gpt-5.6-terra`, `gpt-5.4-mini` → `gpt-5.6-luna` migration을 official replacement 존재 조건과 evidence metadata로 구현했습니다.
- healthy 5.6 catalog에서는 server default를 유지해 불필요한 global hard-code를 추가하지 않았습니다.
- `codex:status`가 compatibility, ChatGPT subscription, model catalog, `retirementReady`, rate limit과 `ready`를 보고합니다.
- paginated history, MCP `runtimeStatus`, unfinished-turn suspension은 감지돼도 `enabled: false`입니다.
- Runtime/Wiki canonical routing에서 GPT-5.4 hard-coded default를 발견하지 않았습니다.
- 공식 Codex plugin marketplace, manifest, Skill structure와 CLI add/upgrade/remove contract를 검토했습니다.
- Runtime `.agents/plugins/marketplace.json`과 `plugins/dex-company-core` v1.0.0을 구현했습니다.
- canonical plugin의 `use-dex-company`와 `create-screen-spec` frontmatter·metadata·guide·template를 검증했습니다.
- `create-screen-spec`에 element-condition-action-result, 상태·예외, duplicate submit, responsive, accessibility, traceability와 acceptance criteria가 포함됐습니다.
- Plugin에서 machine-specific path, local knowledge dependency, `OPENAI_API_KEY`, `ANTHROPIC_API_KEY`, key pattern, `.mcp.json`, `.app.json`이 탐지되지 않았습니다.
- 기존 local Wiki MCP와 같은 private MCP duplicate를 새 plugin에 포함하지 않았습니다.
- OpenAI Skills API는 API authentication을 요구하므로 subscription-first 정책에 따라 사용하지 않았습니다.
- 첫 Runtime CI run `32911624638`의 package policy 실패 1건을 확인했습니다.
- 원인은 plugin 설명에 남은 legacy local product명이었고 test를 완화하지 않고 설명문을 수정했습니다.
- 최종 Runtime validation run `32911751171`에서 static checks가 PASS했습니다.
- JavaScript syntax 39개, JSON, dependency floor, secret-pattern scan이 PASS했습니다.
- 전체 Node tests 163/163 PASS입니다.
- model policy tests 10/10 PASS입니다.
- Dex plugin package tests 5/5 PASS입니다.
- compatibility/status tests 11/11 PASS입니다.
- Runtime smoke, Vercel adapter smoke, rollback guard가 PASS했습니다.
- `npm audit --omit=dev --audit-level=high` 결과 취약점 0건입니다.
- Runtime PR #15 unresolved review thread 0건과 최종 review에서 P0-P2 잔여 없음으로 판정했습니다.
- Runtime PR #15를 merge commit `71e75422d9318ea3195f21a6c0df57f93482944c`로 병합했습니다.
- Runtime `main`에 canonical plugin manifest가 존재하는 것을 재확인했습니다.
- merge commit의 Vercel status가 `success`, `Deployment has completed`입니다.
- Skill/Plugin governance, model routing, current state, decisions, sources, changelog와 handoff를 같은 merge SHA와 판정으로 동기화했습니다.

### FAIL

- 최종 코드·package·automated verification 범위의 실패 없음.
- 첫 CI failure는 수정·재실행 후 해소됐으며 최종 상태의 FAIL로 남기지 않습니다.

### Not Checked

- 승인된 physical host의 installed Codex CLI에서 `npm run codex:compatibility`
- 승인된 physical host의 ChatGPT-managed account에서 real `model/list`, `retirementReady: true`, `ready: true`
- repo marketplace add/upgrade와 `dex-company-core@dex-company` install
- fresh Codex session에서 `use-dex-company`, `create-screen-spec` discovery와 representative invocation
- legacy `dex-company-work@eden-local`과 standalone `create-screen-spec`의 current local source read
- legacy source와 canonical package의 unique-content diff
- legacy plugin/Skill disable 또는 removal
- ChatGPT Developer Mode와 Claude Remote MCP OAuth/read/widget E2E
- merge 직후 Production endpoint direct HTTP smoke
- OpenAI-managed system Skills의 내부 업데이트 상태; provider-owned이므로 Dex 검수 범위 밖

### Watchdog

`PASS_WITH_WARNINGS` — 공식 사실 정정, model retirement 대응, fail-closed catalog policy, canonical package, security/quality tests, PR review·merge와 deployment status는 PASS입니다. 승인 local host에서만 확인 가능한 model catalog·plugin install·fresh-session forward test와 legacy source comparison은 Not Checked이며 migration 완료로 오인하지 않습니다.

## 2026-08-25 - Codex App Server 업데이트 대응

### PASS

- OpenAI Codex mainline 변경과 stable `rust-v0.149.1`을 별도 근거로 검토했습니다.
- 공식 App Server 문서에서 설치 버전별 `generate-json-schema` 명령을 확인했습니다.
- stable `ListMcpServerStatusResponse.json`에 MCP `runtimeStatus`가 없음을 확인했습니다.
- stable protocol source에서 unfinished-turn suspension을 App Server의 호출 가능한 stable request로 확인할 수 없었습니다.
- Runtime과 Wiki에서 `codex mcp-server` 문자열을 검색해 legacy dependency/reference 0건을 확인했습니다.
- Runtime에 설치 CLI schema 기반 compatibility gate를 구현했습니다.
- baseline `account/read`, `thread/start`, `turn/start` 누락 시 account 연결 전 fail-closed를 구현했습니다.
- optional `runtimeStatus`와 unfinished-turn suspension이 감지돼도 `enabled: false`를 유지합니다.
- compatibility subprocess가 `shell:false`를 사용하고 `OPENAI_API_KEY`를 대소문자와 관계없이 제거합니다.
- schema generation timeout, stdout/stderr 1 MiB bound, symlink 제외, 성공·실패 임시 파일 cleanup을 검증했습니다.
- 신규 compatibility 테스트 10/10 PASS입니다.
- Runtime PR #14 전체 Node tests 147/147 PASS입니다.
- static checks에서 36개 JavaScript syntax, JSON, dependency floor, secret pattern scan이 PASS했습니다.
- Runtime smoke, Vercel adapter smoke, rollback guard가 PASS했습니다.
- `npm audit --omit=dev --audit-level=high` 결과 취약점 0건입니다.
- PR unresolved review thread 0건과 최종 코드 검토에서 P0-P2 잔여 없음으로 판정했습니다.
- Runtime PR #14를 merge commit `10013ee530431a03257d81ae00d50cb1be3beb2b`로 병합했습니다.
- merge-commit GitHub Actions run `32788889580`의 모든 step이 success입니다.
- merge commit의 Vercel status가 `success`, 설명이 `Deployment has completed`임을 확인했습니다.
- Runtime `main`에 `workers/openai-codex/src/compatibility.mjs`가 존재하는 것을 재확인했습니다.
- Dex Wiki의 root state, project config, current, handoff, decision, source, changelog가 같은 merge SHA와 검증 결과를 사용합니다.

### FAIL

- 실행·변경·정적/자동 검수 범위의 실패 없음.

### Not Checked

- 승인된 local host의 실제 설치 Codex CLI로 `npm run codex:compatibility` 실행
- 승인된 local host의 ChatGPT 관리 구독 로그인으로 `npm run codex:status` 실행
- merge 직후 Production `/health`, `/mcp`, OAuth metadata, `/logged-out` 직접 HTTP smoke: 현재 Vercel connector에서 프로젝트가 조회되지 않았고 실행 container의 외부 DNS도 사용할 수 없어 Not Checked
- ChatGPT Developer Mode 실제 OAuth/read/widget
- Claude Web/Desktop/mobile 실제 Remote MCP OAuth/read/widget
- Redis multi-instance 및 forced ambiguous-response/search-index reconciliation
- physical PWA install/offline/accessibility
- stable App Server에서 아직 export되지 않은 `runtimeStatus`와 unfinished-turn suspend/resume 실제 동작

### Watchdog

`PASS_WITH_WARNINGS` — 요청 범위의 계획, 공식 근거 확인, 코드 구현, 보안 검토, 자동 테스트, PR 검수, main 병합, merge CI와 배포 상태 확인은 완료됐습니다. 외부 connector·승인 local host·물리 UI에서만 가능한 검증은 Not Checked로 남겼으며 성공으로 오인하지 않습니다.

## 2026-08-24 - Production 로그아웃 자동 재로그인 수정

### PASS

- Production 로그에서 로그아웃 API 204, 세션 폐기 audit, 직후 OAuth 재시작과 재로그인 순서를 확인했습니다.
- 수정 전 `/logged-out` 404 회귀 테스트로 실패 상태를 재현했습니다.
- 프런트의 일반·legacy 로그아웃 경로가 모두 `/logged-out`으로 고정됐습니다.
- `/logged-out`은 인증을 자동 시작하지 않고 명시적 로그인 링크만 제공합니다.
- 타깃 테스트 14/14, 전체 테스트 107/107, smoke, Vercel adapter smoke, rollback guard가 통과했습니다.
- Runtime PR #13의 GitHub CI와 Vercel Preview가 통과했고 merge commit은 `c00b6a02babc9aaf9a149259304a426ef49a392e`입니다.
- Production 배포 `dpl_HeBjSF3toEEbnwHZWoboLqJMPnfN`이 Ready이고 canonical alias가 연결됐습니다.
- Production `/logged-out`은 200과 `Cache-Control: no-store`를 반환하고 완료 문구와 재로그인 링크를 포함합니다.
- 비인증 `/`은 기존처럼 `/auth/github/start?returnTo=%2F`로 302됩니다.
- 에던님이 현재 열린 PWA에서 로그아웃 버튼을 눌러 `/logged-out` 완료 화면으로 전환되는 것을 확인했습니다.

### FAIL

- 없음.

### Not Checked

- 완료 화면에서 명시적 로그인 버튼을 누르는 실제 브라우저 흐름
- 모바일과 별도 브라우저의 화면 렌더링

### Watchdog

`PASS` — 범위 잠금, 재현, 원인, 회귀 테스트, CI, Production HTTP와 실제 사용자 브라우저 로그아웃 검증이 모두 완료됐습니다.

## 2026-08-21 - Git Vault 운영 전환 보정

### PASS

- 15개 PowerShell helper의 기본 경로가 Git Vault이며 구문 오류와 legacy 기본 경로가 0건입니다.
- Growth Scan preflight와 automation prompt가 Git Vault를 사용하고 자동화는 `PAUSED`입니다.
- Dex Company Wiki plugin 원본·개인 복사본·설치 cache의 변경 파일 SHA-256이 일치합니다.
- plugin source와 설치 cache 테스트가 각각 12/12 통과했고 실제 Git Vault 승인 문서 192개를 색인했습니다.
- Vault health check가 0 warning으로 통과했습니다.
- LLM Wiki status/lint가 통과했고 audit의 v5 누락은 0건입니다.
- Obsidian registry는 Git Vault 한 개만 보존하며 기존 Vault 폴더의 파일은 삭제하지 않았습니다.
- 현재 트리와 정제된 전체 Git 이력에서 실제 Secret, 개인 이메일, 로컬 계정 경로가 탐지되지 않았습니다.

### FAIL

- Growth Scan preflight의 free RAM은 0.79GB로 최소 1GB 기준을 충족하지 못했습니다. Git Vault 경로·status·lint 검사는 통과했고 자동화는 `PAUSED`를 유지합니다.

### Not Checked

- Obsidian registry 정리 후 GUI 재실행
- free RAM 1GB 이상에서의 preflight 재검사와 이후 실제 예약 실행
- 새 Codex/Work 세션의 plugin 카드와 `obsidian://` 인용 링크
- backup ZIP/Git bundle의 별도 디렉터리 복원 훈련

### Watchdog

`PASS_WITH_WARNINGS` — 변경 범위와 회귀 검증은 적절하며 런타임 UI·예약 회차·복원 훈련은 후속 확인이 필요합니다.

## Previous Success

- Safe Vault merge applied with backup and CSV manifest.
- OneDrive canonical paths applied to workspace instructions, automation prompt, and preflight default.
- Four project folders created with valid linked code paths.
- Vault health check passed with 0 warnings.
- LLM Wiki status/lint/audit passed: sources 183, wiki 8, queries 2, lint warnings 0, missing v5 metadata 0.
- Context collector returned 31 files for DexCompany-Ops, included quality rules, and reported no missing wikilink section.
- Setup/project/code-link dry-runs passed and setup now preserves an existing PROJECT_INDEX.
- PowerShell parse and UTF-8/mojibake checks passed for changed operational files.

## Failed

- Growth Scan preflight failed only the free-RAM gate: 0.84GB available, minimum 1GB. Other preflight checks passed.

## Not Checked

- Next scheduled Growth Scan run after path migration.
- OneDrive sync completion on other devices.
- Obsidian mobile rendering.
- Obsidian GUI and CLI end-to-end note read/search while the app is running.
- Product-specific PRD, SPEC, SCREEN_FLOW, and DATA_MODEL content; the four registered projects currently contain initial skeletons.
- Official `quick_validate.py` for the edited watchdog skill could not start because its Python environment lacks PyYAML; frontmatter/UTF-8 and health-check validation were performed separately.

## Watchdog Audit

PASS_WITH_WARNINGS — `70_Outputs/DexCompanyAudit/2026-07-19-dex-company-canonical-migration-watchdog.md`

## Risks

- Legacy Vault still exists and may receive writes from an uncorrected external shortcut or process.
- `codex setup` has no commit history or remote yet.
- Bias Check queue 66개는 confidence 하향으로 lint 경고만 제거된 상태이며 실제 편향 검토는 남아 있습니다.
- 새 capability map을 포함해 unexplored note가 14개입니다.

## 2026-08-11 - `create-screen-spec` 화면설계서 에이전트

### PASS

- 글로벌 스킬 패키지의 필수 파일 4개 존재를 확인했습니다.
- `SKILL.md`가 96줄이며 frontmatter에는 `name`, `description`만 존재하고 폴더명과 스킬명이 일치합니다.
- `agents/openai.yaml`의 표시 이름, 26자 설명, `$create-screen-spec` 기본 프롬프트를 확인했습니다.
- 작성 기준과 Markdown 템플릿의 요구사항, 화면 목록, Mermaid 흐름, 화면 상세, 추적성, PASS/FAIL/Not Checked 섹션을 확인했습니다.
- 네 파일 모두 strict UTF-8 디코딩과 한국어 replacement character 검사를 통과했습니다.
- canonical handoff와 DexCompany-Ops의 Planner matrix/router에 `create-screen-spec` 연결을 확인했습니다.
- 총 25개 대체 정적 검사가 모두 PASS였습니다.

### FAIL

- 공식 `init_skill.py`는 이 PC에 실제 Python 런타임이 없어 시작되지 않았습니다. 외부 패키지를 설치하지 않고 같은 표준 구조를 수동 생성했습니다.

### Not Checked

- 같은 Python 제약으로 공식 `quick_validate.py`는 실행하지 못했습니다.
- 새 Codex 세션에서의 자동 검색과 UI 노출은 확인하지 못했습니다.
- 실제 프로젝트 요구사항을 사용한 화면설계서 forward test는 확인하지 못했습니다.

### Watchdog

`PASS_WITH_WARNINGS` — 요청 범위, 최소 스킬 사용, 전역 설치, 역할 라우팅, 정적 검증은 적절합니다. 가장 큰 잔여 위험은 공식 validator와 실제 새 세션 호출이 미확인이라는 점입니다.

## 2026-08-11 - ChatGPT Work + Dex Company LLM Wiki 플러그인

### PASS

- 공식 ChatGPT/Codex plugin 계약에 맞춰 `.codex-plugin/plugin.json`, `skills/`, `.mcp.json`을 구성했습니다.
- `create-screen-spec`과 `use-dex-company-wiki` 두 스킬의 frontmatter, UI metadata, strict UTF-8를 확인했습니다.
- MCP tools/list에는 read-only `search`, `fetch` 두 개만 존재하며 resource, prompt, app UI surface는 없습니다.
- 검색 입력은 512자/2KiB, 결과는 최대 8개이며 fetch는 opaque ID만 받습니다.
- allowlist, root containment, symlink/junction, 민감 파일명·frontmatter·credential fixture, 한국어, 대용량 UTF-8 truncation을 테스트했습니다.
- `structuredContent`와 단일 `content` JSON 문자열의 동등성을 실제 MCP handshake에서 확인했습니다.
- TDD RED 확인 후 strict input schema와 최악 escape wire payload 상한을 포함한 총 12개 테스트가 PASS했습니다.
- 실제 Vault에서 승인 문서 192개를 색인했고 `디자인 시스템`, `화면`, `MCP 보안` 검색과 한국어 fetch가 성공했습니다.
- exact dependency install 및 `npm audit --omit=dev`: 취약점 0건입니다.
- 개인 marketplace에 기존 두 플러그인을 보존한 채 세 번째 항목으로 등록했습니다.
- `codex plugin add dex-company-work@eden-local --json`이 version `0.1.2`, enabled 상태로 성공했습니다.
- 설치 캐시 자체에서 syntax check, 12개 테스트, 실제 Vault health, npm audit를 모두 다시 통과했습니다.
- 설치 캐시의 별도 stdio 프로세스로 strict schema, search/fetch, read-only annotation을 다시 검증했습니다.

### FAIL

- `codex plugin list --marketplace eden-local --json`은 기존 `lazyweb` marketplace snapshot에 지원 manifest가 없어 실패합니다. 대상 지정 `plugin add`와 설치본 실행은 성공했으며, 관련 없는 기존 설정은 임의 제거하지 않았습니다.
- 공식 Python `validate_plugin.py`는 실제 Python 런타임이 없어 실행하지 못했습니다. 동일 계약의 Node package 검사와 MCP protocol 테스트로 대체했습니다.

### Not Checked

- 새 ChatGPT/Codex 데스크톱 Work 세션에서 플러그인 카드와 스킬 자동 호출 UI (`computer-use` 안전 규칙이 Codex 앱 UI 자동화를 금지하므로 수동 확인 필요)
- ChatGPT UI에서 `obsidian://` citation 링크 클릭
- Windows OneDrive의 모든 reparse tag 판별과 별도 저권한 서비스 계정 ACL
- 웹 ChatGPT용 공개 HTTPS endpoint, OAuth, workspace allowlist, tunnel/mirror 운영
- 모델 수준 prompt-injection 적대 평가; 도구 표면에 write-capable tool이 없다는 구조적 제한만 검증

### 판정

`PASS_WITH_WARNINGS` — 로컬 ChatGPT/Codex Work용 설치와 read-only Wiki MCP는 실행 가능하고 protocol·보안 회귀 테스트를 통과했습니다. 앱 UI와 웹 원격 연결은 별도 확인이 필요합니다.

### Watchdog

`PASS_WITH_WARNINGS` (31/35) — fresh-context read-only 감사가 원본·개인 source·설치 cache 일치, enabled 설정, 설치본 12/12 테스트, 실제 Vault 192개, 실제 stdio search/fetch를 재현했습니다. Must Fix는 없으며 최고 위험은 앱 UI와 `obsidian://` 링크가 수동 확인 상태라는 점입니다.

## 2026-08-12 - 모바일 SNS 로그인 화면설계서

### PASS

- `SCREEN_SPEC.md` v0.1.1 신규 생성과 네이버·카카오톡·Google 세 제공자 반영을 확인했습니다.
- 앱 소유 `SCR-001~003`과 제공자 소유 `EXT-*` 경계를 확인했습니다.
- 정상·취소·필수정보 거부·오프라인·제공자 오류·검증 실패·신규 약관·계정 연결 흐름을 확인했습니다.
- 요구사항 18개와 정책 13개가 추적성 표에 연결된 것을 확인했습니다.
- 고유 수용 기준은 로그인 9개, 약관 7개, 계정 연결 5개로 총 21개입니다.
- strict UTF-8, U+FFFD 없음, 필수 섹션, 화면 ID, Mermaid 3개/fence 균형, 미완성 표식 0건을 정적 검사했습니다.
- Google Android/iOS·서버 토큰 검증, 카카오 Android/iOS/REST, 네이버 iOS, Apple 4.8, Apple/Android 접근성, 개인정보 보호법 공식 문서를 확인했습니다.
- 초기 watchdog Must Fix인 개인정보 고지/동의 혼합, 취소/동의거부 flow 충돌, 운영 기록 누락을 보정했습니다.

### FAIL

- 출시 승인 게이트: iOS 로그인 서비스 규정 예외/동등 옵션 결정이 없습니다.
- 출시 승인 게이트: 개인정보 처리 적법 근거, 필수 동의 문안, 약관·보유기간 법무 승인이 없습니다.

### Not Checked

- 실제 모바일 앱 저장소, UI 구현, 백엔드 API·세션·데이터 모델
- 실제 네이버·카카오·Google 개발자 콘솔과 scope·검수 상태
- 네이버 Android 최신 SDK 세부 동작과 세 제공자의 최신 브랜드 리소스
- Mermaid의 Obsidian 실제 렌더링
- 실제 기기 성공·취소·거부·앱 종료·약전계·중복 callback 테스트
- VoiceOver·TalkBack·큰 글자·색 대비 자동/수동 테스트
- 법무·보안·PO의 최종 승인

### 판정

- 문서 설계·정적 품질은 `PASS`입니다.
- 실제 제품 출시 준비도는 위 두 출시 게이트로 `FAIL`이며, 미검증 항목을 성공으로 간주하지 않습니다.

### Watchdog

`PASS_WITH_WARNINGS` (41/50) — 최신 0.1.1 재감사에서 산출물의 잔여 Must Fix는 없습니다. 가장 큰 잔여 위험은 제품·법무·스토어 정책과 실제 런타임 검증이 없다는 점입니다.

<!-- DEX_PRESERVED_20260906_END -->
</details>
