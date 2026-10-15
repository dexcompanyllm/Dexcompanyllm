# CURRENT

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
﻿# CURRENT

## 현재 작업 (2026-09-02, Runtime PR #95 repository head / #28 Phase 3 implementation merged / approved-host E2E pending — 아래 이전 상태를 대체)

### 요청과 scope lock

- 에던 승인: **Phase 3만 진행**
- 포함: bounded broker↔dedicated-worker implementation, PR/CI/merge, approved Windows-host E2E runbook과 canonical evidence synchronization
- 제외·비활성 유지: #34/#35, hosted writes, multi-writer, automatic approval, paid API/fallback, diagnostic upload, `danger-full-access`, automatic merge/deploy, Codex 0.152.1 promotion

### 선택한 역할과 실행 모드

- Role: Developer / QA / Knowledge Manager
- Tool surface: Runtime GitHub repository, GitHub Actions, Vercel status, Runtime Issue #28, Dex Wiki
- Execution mode: Direct implementation / Security review / Verification / Canonical handoff
- Selected local skills: 없음 — repository-native contract, tests, CI와 runbook을 사용했으며 external skill을 추가하지 않음
- Assumption: 이 Work 환경에서는 에던의 승인 Windows host에 접속할 수 없으므로 physical E2E는 PASS로 추정하지 않음

### 확인 기준

- Runtime current `main`: PR #95 merge `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`
- #28 Phase 3 implementation baseline: PR #88 merge `ae9552aa5cbacf78bb4789ce913142397e2a3968`
- PR #88 branch validation `33569106659`: 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP; audit 0 vulnerabilities
- PR #88 branch Vercel / merge-SHA Production Vercel: PASS
- PR #95 branch validation `33570034722`, post-merge `main` validation `33570148285`, branch/merge Vercel: PASS
- PR #88 / #94 merge-SHA post-merge GitHub Actions: Not Checked
- #28 Phase 2 baseline: PR #67; Phase 1 baseline: PR #63; dedicated-host safety baseline: PR #60
- Issue #28 implementation checkpoint: comment `5501642642`

### 구현·검증 완료

- Task/attempt/role/hash/deadline-bound bounded local spool protocol
- atomic one-writer claim, broker-only durable coordination과 PID-bound broker lease
- broker-only GitHub credential, dedicated worker credential/CODEX_HOME/project-registry 경계
- explicit Task-and-attempt-bound one-time approval; environment blanket approval 제거
- ephemeral Codex thread, whole-run deadline, official `turn/interrupt`, App Server stop와 stale late-result rejection
- clean non-default fixture branch, allowlisted one-file/one-commit mutation과 SHA-pinned built-in file verification
- deterministic Watchdog + distinct read-only ephemeral verifier + durable canonical Result
- bridge import 경로의 repository `.env` 비로딩 회귀검증
- approved Windows-host 전용 `docs/PHASE3_LOCAL_BRIDGE.md` runbook

### 현재 Gate

- #17: PASS/closed; 반복 금지
- #28 Phase 1: PASS
- #28 Phase 2: PASS
- #28 Phase 3 implementation: PASS
- #28 Phase 3 approved Windows-host E2E: **Not Checked**
- #28 Issue: OPEN 유지
- #34/#35: #28 전체 PASS 대기

### 다음 행동

1. 승인 Windows host에서 Runtime `main`을 동기화하고 `docs/PHASE3_LOCAL_BRIDGE.md`의 Phase 3 matrix만 실행합니다.
2. offline/resume, read-only no-op, approval pending/deny, explicit one-time one-file mutation, timeout/late-result rejection과 detached verifier를 증명합니다.
3. 같은 Task ID의 PWA/read-only MCP status/result 조회와 operational Runtime/Wiki `main`·Production mutation 0을 기록합니다.
4. 모든 항목 PASS 후에만 #28을 완료하고 #34/#35를 엽니다.

> 아래 섹션은 날짜별 historical evidence입니다. 현재 Gate와 다음 행동은 위 섹션만 사용합니다.

## 현재 작업 (2026-08-30, Work↔Dex 통합 실행 강화 — 아래 이전 상태를 대체)

### 요청

- 어느 surface에서 시작해도 필요한 전문 worker의 장점을 조합하고 하나의 검증된 결과를 받는 Dex 구조 강화
- PC가 꺼진 동안 모바일에서 가능한 안전한 작업 우선 실행

### 완료한 모바일 작업

- OpenAI 공식 Plugins/MCP/App Server/long-running work 경계를 재확인했습니다.
- 기존 protocol의 `ChatGPT mobile custom MCP 미지원` 단정을 제거하고 계정·workspace capability check + PWA fallback으로 교정했습니다.
- Runtime PR #27을 최신-main merge ref에서 다시 검증한 뒤 병합했습니다. Exact child-env allowlist는 model-controlled worker에 Runtime/GitHub/OAuth/Redis/KV/Vercel/proxy/Git/SSH/custom secret가 전파되지 않도록 합니다.
- Runtime PR #33에서 `single-owner` 모호성을 제거하고 accountable lead, capability-routed workers, mutation-scope single writer, risk-based verification, durable canonical result와 zero re-entry 계약을 config/test/docs에 고정했습니다.
- Work/mobile submit/status/result는 Runtime #34, capability-routed readers/verifier 확대는 Runtime #35로 분리해 추적합니다.
- canonical 원칙을 AI Contract, Decision, Unified Workflow Protocol과 상태·QA·handoff에 동기화했습니다.

### 현재 판정

- Runtime PR #27 보안 isolation·latest-main CI·post-merge CI·Vercel: PASS
- Runtime PR #33 정책 config·regression test·CI·Vercel: PASS
- PWA Task 생성/idempotency: PASS
- 자동 Task consumer→writer→verifier→Result/PWA inbox: 미구현 — #28
- Work/mobile Dex plugin 실제 설치·remote MCP submit/status/result: Not Checked — #34
- capability-routed parallel readers/verifier 실행: 미구현 — #35
- 승인 PC Codex 0.151 Doctor·compatibility·status·real model catalog: Not Checked — #17

### 다음 행동

1. PC가 켜질 때 #17을 `doctor → compatibility → status` 순서로 실행합니다.
2. #17 PASS 뒤 #28의 bounded one-writer E2E를 구현합니다.
3. #28 PASS 뒤 #34 Work/mobile flow와 #35 read-worker/verifier 확대를 각각 별도 Gate로 진행합니다.

## 현재 작업 (2026-08-26, Codex 모델·Skill·Plugin 업데이트 대응 — 아래 이전 상태를 대체)

### 요청

- GPT-5.4 계열 종료와 최신 Codex 변화에 대응
- 기존 Dex Skill/Plugin의 업데이트 필요성·가능성·가치를 검토
- Dex Company에 긍정적인 변경을 실행하고 검수까지 완료

### 선택한 역할과 실행 모드

- Role: Developer / Skill Builder / Plugin Engineer / QA / Knowledge Manager
- Tool surface: OpenAI 공식 Help와 `openai/codex`, Dex Runtime, GitHub Actions, Vercel commit status, Dex Wiki
- Execution mode: Official-source verification / Branch / PR / Merge / Verification
- Skills: `deprecation-and-migration`, `plugin-creator`, `skill-creator`, `security-and-hardening`, `test-driven-development`, `git-workflow-and-versioning`, `dex-watchdog`

### 현재 상태

- ChatGPT-managed Codex의 2026-08-31 모델 종료를 공식 출처로 재검증했습니다.
- `gpt-5.4` → `gpt-5.6-terra`, `gpt-5.4-mini` → `gpt-5.6-luna` 전환을 Runtime에 반영했습니다.
- App Server baseline에 stable `model/list`를 추가하고 worker 연결 시 authenticated catalog를 읽도록 했습니다.
- hidden model 포함 cursor pagination을 100/page, 20 pages, 1,000 models로 제한했습니다.
- unknown model, invalid response, cursor cycle, missing official replacement는 fail-closed합니다.
- healthy 5.6 catalog의 server default와 capability-class routing은 유지해 불필요한 global hard-code를 피했습니다.
- 이전 알림에서 stable 승격으로 설명했던 `thread/turns/list`와 `thread/items/list`를 공식 문서 기준 experimental로 정정했습니다.
- paginated history, MCP `runtimeStatus`, unfinished-turn suspension은 모두 탐지만 하고 `enabled: false`를 유지합니다.
- 기존 canonical Wiki와 Runtime에서 5.4 hard-coded default는 발견되지 않았고 model routing guide는 이미 5.6 계열을 사용하고 있었습니다.
- 기존 standalone `create-screen-spec`과 `dex-company-work@eden-local`은 현재 local source를 직접 읽을 수 없어 안전한 in-place 업데이트·삭제 대상으로 보지 않았습니다.
- Runtime에 repo marketplace `.agents/plugins/marketplace.json`과 canonical `dex-company-core` v1.0.0을 새로 만들었습니다.
- Plugin에는 GitHub-first `use-dex-company`와 개선된 `create-screen-spec`을 포함했습니다.
- 화면설계 Skill에 element-condition-action-result, Validation/Error/Empty/Loading/Disabled/Offline, PC/Mobile, 접근성, 추적성, acceptance criteria, 개발문서·QA 분리 기준을 반영했습니다.
- Plugin에는 machine-specific path, local knowledge dependency, API credential, private MCP duplicate, `.mcp.json`, `.app.json`을 포함하지 않았습니다.
- OpenAI-managed system Skills는 Dex-owned가 아니므로 수정하지 않았습니다.
- OpenAI Skills API는 API authentication이 필요해 subscription-first 기본 경로에서 사용하지 않았습니다.
- Runtime PR #15를 merge commit `71e75422d9318ea3195f21a6c0df57f93482944c`로 `main`에 병합했습니다.
- 첫 CI는 Plugin 설명의 legacy local product명 1건을 탐지해 실패했고, test를 완화하지 않고 설명문을 수정했습니다.
- 최종 CI에서 static checks, 163/163 tests, smoke, Vercel adapter smoke, rollback guard, dependency audit 0 vulnerabilities가 PASS했습니다.
- merge commit의 Vercel status는 `success`, `Deployment has completed`입니다.

### 기존 Skill/Plugin 판단

| 대상 | 업데이트 필요성 | 실행 결과 |
|---|---|---|
| standalone `create-screen-spec` | 높음 — local-only 배포와 이전 quality contract | canonical plugin의 v2 Skill로 재작성, legacy 삭제는 보류 |
| `dex-company-work@eden-local` | 높음 — machine-local source/cache와 이전 local Wiki connector | Git-backed `dex-company-core` replacement 구현, source diff 전 legacy 유지 |
| legacy local Wiki MCP | architecture 교체 필요 | shared Dex MCP/GitHub bridge를 canonical로 유지, private duplicate 미포함 |
| OpenAI system Skills | Dex update 대상 아님 | provider-managed 상태 유지 |
| 외부 Skill ingestion 절차 | governance 보강 필요 | `DEX_SKILL_PLUGIN_GOVERNANCE.md` 추가 |
| Skills API upload | 기술적으로 가능하나 정책상 불필요 | API key 요구로 미사용 |

### 판정

- GPT-5.4 retirement code response: PASS
- Live model catalog/fail-closed policy: PASS
- Experimental history API correction: PASS
- Canonical Skill/Plugin source 구축: PASS
- Plugin package/security/quality test: PASS
- Runtime PR merge와 Vercel deployment status: PASS
- Legacy local source comparison/install migration: Not Checked
- Legacy removal: Not Performed

### 가정과 한계

- 현재 환경에서는 승인된 physical Codex host의 installed model catalog와 local plugin registry를 직접 실행하지 못했습니다.
- Legacy local source가 GitHub에 없으므로 unique approved content가 없는지 단정하지 않았습니다.
- Canonical package는 구현·병합됐지만 approved-host install과 fresh-session discovery 전에는 migration 완료로 표현하지 않습니다.

### 다음 행동

1. 승인된 local host에서 Runtime `main`을 동기화하고 `npm run codex:compatibility`, `npm run codex:status`를 실행해 `retirementReady: true`, `ready: true`를 확인합니다.
2. `dex-company` marketplace와 `dex-company-core@dex-company`를 설치하고 두 Skill의 fresh-session forward test를 수행합니다.
3. Legacy source와 canonical package의 unique-content diff를 확인한 뒤에만 legacy plugin/standalone Skill을 disable 또는 remove합니다.
4. ChatGPT Developer Mode와 Claude Remote MCP OAuth/read/widget E2E를 이어서 검증합니다.

## 현재 작업 (2026-08-25, Codex App Server 업데이트 대응 — 아래 이전 상태를 대체)

### 요청

- 최신 Codex 업데이트 중 Dex Company가 대응해야 할 항목을 판단
- 필요한 변경을 계획·검토·실행하고 검수까지 완료

### 선택한 역할과 실행 모드

- Role: Developer / QA / Knowledge Manager
- Tool surface: OpenAI Codex 공식 repository, Dex Runtime, GitHub Actions, Vercel commit status, Dex Wiki
- Execution mode: Branch / PR / Merge / Verification
- Skills: `deprecation-and-migration`, `git-workflow-and-versioning`, `security-and-hardening`, `test-driven-development`, `dex-watchdog`

### 현재 상태

- 공식 Codex `rust-v0.149.1` App Server schema와 OpenAI mainline 변경을 분리해 확인했습니다.
- stable `rust-v0.149.1`에는 MCP `runtimeStatus`가 없고 unfinished-turn suspension도 stable App Server request로 export되지 않음을 확인했습니다.
- Runtime에 설치된 Codex CLI의 `generate-json-schema` 결과를 직접 검사하는 compatibility gate를 추가했습니다.
- baseline `account/read`, `thread/start`, `turn/start`가 없으면 ChatGPT account 연결 전에 fail-closed합니다.
- `npm run codex:compatibility`와 compatibility → subscription login → rate-limit 순서의 `npm run codex:status`를 추가했습니다.
- child process `shell:false`, `OPENAI_API_KEY` 대소문자 무관 제거, timeout, 출력 상한, symlink 제외, 임시 schema cleanup을 적용했습니다.
- MCP `runtimeStatus`와 unfinished-turn suspension은 감지돼도 별도 구현·검증 전까지 `enabled: false`입니다.
- Runtime PR #14를 merge commit `10013ee530431a03257d81ae00d50cb1be3beb2b`로 `main`에 병합했습니다.
- PR CI와 merge-commit CI에서 147/147 tests, 신규 compatibility 10/10, static/secret scan, smoke, Vercel adapter smoke, rollback guard, dependency audit가 모두 PASS했습니다.
- merge commit의 Vercel status는 `success`, `Deployment has completed`입니다.
- `codex mcp-server` legacy reference를 Runtime과 Wiki에서 검색했고 탐지되지 않았습니다.
- root `CURRENT_STATE.md`, PROJECT_CONFIG, DECISIONS, SOURCES, CHANGELOG, QA_REPORT, SESSION_HANDOFF를 이번 결과로 동기화했습니다.

### 판정

- Runtime 구조 변경: 완료
- deprecated `codex mcp-server` 마이그레이션: 추가 작업 없음
- App Server compatibility gate: PASS
- MCP `runtimeStatus` 실제 연동: WAIT — stable 미지원
- unfinished-turn suspend/resume 실제 연동: WAIT — stable App Server export 미지원
- task mention과 Multi-Agent V2 직접 통합: 현재 Dex canonical Task Bus 범위 밖, 변경 없음

### 가정과 한계

- OpenAI mainline commit은 stable capability로 간주하지 않았습니다.
- 현재 실행 환경은 승인된 local Codex host와 Vercel 프로젝트 connector를 직접 열 수 없어 실제 `npm run codex:compatibility`, `npm run codex:status`, post-merge HTTP endpoint smoke는 Not Checked입니다.
- GitHub Actions와 Vercel commit status는 merge commit 기준으로 확인했습니다.

### 다음 행동

1. 승인된 local host에서 ChatGPT 구독 로그인 상태로 `npm run codex:compatibility`와 `npm run codex:status`를 실행합니다.
2. ChatGPT Developer Mode OAuth/read/widget와 Claude Remote MCP OAuth/read/widget를 실제 연결 검증합니다.
3. stable App Server schema가 `runtimeStatus` 또는 unfinished-turn suspension request를 export할 때 각각 별도 branch에서 구현합니다.

## 현재 작업 (2026-08-24, Production 로그아웃 회귀 수정 — 아래 이전 상태를 대체)

### 요청

- Dex Company Production PWA에서 로그아웃을 눌러도 로그인 상태로 보이는 문제 수정

### 선택한 역할과 실행 모드

- Role: Developer / QA
- Tool surface: Runtime source, GitHub PR, Vercel Production, HTTP verification
- Execution mode: Direct / Verification
- Skills: `debugging-and-error-recovery`, `dex-watchdog`

### 현재 상태

- Production 로그에서 `POST /auth/logout` 204와 세션 폐기 성공을 확인했습니다.
- 원인은 로그아웃 직후 `/` 이동이 GitHub OAuth를 자동 재시작해 이미 승인된 앱을 곧바로 재인증한 것이었습니다.
- 비인증 `/logged-out` 완료 화면과 명시적 GitHub 재로그인 버튼을 추가했습니다.
- Runtime PR #13을 CI 통과 후 병합했고 Production 배포 `dpl_HeBjSF3toEEbnwHZWoboLqJMPnfN`이 Ready입니다.
- Production `/logged-out`의 200, `Cache-Control: no-store`, 한국어 완료 문구와 로그인 링크를 확인했습니다.
- 에던님이 현재 열린 PWA에서 로그아웃 버튼을 눌러 `/logged-out` 완료 화면으로 전환되는 것을 확인했습니다.

### 다음 행동

1. 필요할 때 명시적 `GitHub로 다시 로그인` 버튼으로 인증을 시작합니다.
2. Dex Company 원격 MCP/ChatGPT 연결의 남은 단계로 복귀합니다.

## 선택한 역할

Knowledge Manager / PL

## 선택한 Skills

- `deprecation-and-migration`
- `git-workflow-and-versioning`
- `llm-wiki`
- `security-and-hardening`
- `dex-watchdog`

## Watchdog Required

Yes

## 현재 초점

- GitHub `main`과 `D:\CodexProjects\codex setup\dex-company-wiki`를 단일 canonical 지식 경로로 사용
- OneDrive/VibeProject legacy Vault는 검증 백업이 있는 read-only reference로 유지
- 로컬 스크립트, Growth Scan, Dex Company Wiki 플러그인의 기본 경로를 Git Vault로 통일
- 활성 프로젝트 4개와 코드 저장소 연결 완료
- capability map/query와 간결한 LLM Wiki index 구축 완료
- Git 이력의 개인 식별 경로와 개인 이메일 메타데이터 제거 및 원격 검증

## 가정

- 에던님의 “다음 권장 사항 작업 진행해”는 경로 통일, 개인정보 제거, Git 이력 재작성과 강제 push를 포함한 후속 조치 승인으로 해석했습니다.
- legacy Vault는 즉시 삭제하지 않고 advisory deprecated 상태로 보존합니다.
- 실제 애플리케이션 소스 저장소는 Wiki 저장소에 합치지 않습니다.

## 다음 행동

1. Growth Scan을 재개하기 전에 새 Git Vault preflight와 dry-run을 확인합니다.
2. 새 Codex/Work 세션에서 Dex Company Wiki 플러그인이 Git Vault를 읽는지 forward test합니다.
3. LLM Wiki의 `explored: false` 14개와 stale note 큐를 실제 검토합니다.
4. 실제 프로젝트 작업을 시작할 때 비어 있는 PRD/SPEC/SCREEN_FLOW/DATA_MODEL을 채웁니다.

## 현재 작업 (2026-08-11, 위 상태를 대체)

### 요청

- 에던님 대신 화면설계서를 작성하는 전담 Codex 에이전트 생성

### 선택한 역할과 실행 모드

- Role: Planner / Skill Builder
- Tool surface: Codex local skill, Markdown, Obsidian
- Execution mode: Specialist / Artifact / Verification

### 선택한 Skills

- `skill-creator`
- `dex-watchdog`

### 현재 상태

- 전역 스킬 `create-screen-spec` 생성 완료
- 화면설계 작성 기준과 재사용 Markdown 템플릿 생성 완료
- canonical handoff와 DexCompany-Ops의 Planner 라우팅에 연결 완료
- 파일 구조, frontmatter, UI metadata, UTF-8, 템플릿 필수 섹션, 라우팅 25개 정적 검사 PASS

### 가정과 한계

- 별도 위치 지정이 없어 `$CODEX_HOME/skills`를 전역 설치 위치로 사용했습니다.
- 산출물은 한국어 Markdown `SCREEN_SPEC.md`를 기본값으로 정했습니다.
- Python 런타임이 없어 공식 `init_skill.py`와 `quick_validate.py`는 실행하지 못했고 표준 구조 수동 생성과 대체 정적 검증을 수행했습니다.
- 새 Codex 세션에서의 자동 검색과 실제 프로젝트 입력을 사용한 forward test는 남아 있습니다.

### 다음 행동

1. 새 Codex 세션에서 `$create-screen-spec` 호출 여부를 확인합니다.
2. 실제 기능 요구사항으로 첫 `SCREEN_SPEC.md`를 생성해 템플릿 밀도와 질문 수를 조정합니다.
3. 필요가 확인되면 Markdown 외 PPT 또는 Figma 산출 모드를 별도 확장합니다.

## 현재 작업 (2026-08-11, ChatGPT Work 확장 — 위 상태를 대체)

### 요청

- 화면설계서 에이전트를 ChatGPT Work에서도 사용
- ChatGPT Work에서 Obsidian의 Dex Company LLM Wiki를 함께 사용

### 선택한 역할과 Skills

- Role: Planner / Plugin Engineer / Knowledge Manager
- Skills: `openai-docs`, `build-chatgpt-app`, `plugin-creator`, `create-screen-spec`, `llm-wiki`, `security-and-hardening`, `test-driven-development`, `incremental-implementation`, `git-workflow-and-versioning`

### 현재 상태

- canonical source: `D:\CodexProjects\codex setup\plugins\dex-company-work`
- personal marketplace source: `%USERPROFILE%\plugins\dex-company-work`
- installed cache: `D:\Program Files\Codex\plugins\cache\eden-local\dex-company-work\0.1.2`
- plugin id: `dex-company-work@eden-local`, enabled
- ChatGPT/Codex Work용 `create-screen-spec`과 `use-dex-company-wiki` 스킬 포함
- MCP surface는 read-only `search`, `fetch`만 제공
- 노출 범위는 LLM Wiki의 `index.md`, `wiki/**/*.md`, `sources/**/*.md`로 제한
- 12개 Node 테스트와 설치본 stdio MCP handshake PASS
- 실제 Vault 192개 승인 문서 색인 및 한국어 검색/fetch PASS

### 가정과 한계

- “ChatGPT Work”는 현재 PC에 설치된 Codex 데스크톱 앱의 Work 환경으로 해석했습니다.
- 로컬 stdio 구조이므로 동일 Windows 사용자 세션에서만 동작합니다.
- 웹 ChatGPT 연결용 HTTPS/OAuth gateway는 로컬 Wiki가 외부 경계를 통과하므로 이번 범위에 포함하지 않았습니다.
- 새 Work 세션의 UI 노출과 `obsidian://` 링크 클릭은 아직 확인하지 않았습니다.

### 다음 행동

1. Codex/ChatGPT Work에서 새 세션을 열고 `Dex LLM Wiki를 참고해서 화면설계서를 만들어줘`로 forward test합니다.
2. 플러그인 카드와 `obsidian://` 인용 링크의 UI 동작을 확인합니다.
3. 웹 ChatGPT 사용이 필요하면 인증 도메인, OAuth issuer, single-user/workspace 범위, live tunnel 또는 read-only mirror를 별도 결정합니다.

## 현재 작업 (2026-08-12, 모바일 SNS 로그인 화면설계 forward test — 위 상태를 대체)

### 요청

- `@dex-company-work`로 모바일 앱 로그인 화면설계서 작성
- 네이버, 카카오톡, Google 로그인 반영
- 상세 description, 정책, 사용자 여정 flow chart 포함

### 선택한 역할과 Skills

- Role: Planner / UI·UX Specification
- Skills: `dex-company-work:create-screen-spec`, `dex-company-work:use-dex-company-wiki`, `dex-watchdog`
- Tool surface: Obsidian Markdown, read-only Dex Company Wiki, 공식 사업자 문서

### 현재 상태

- `SCREEN_SPEC.md` v0.1.1 신규 생성
- 앱 소유 화면 3개와 외부 인증 화면 3개 정의
- 요구사항 18개, 정책 13개, Mermaid 3개, 고유 수용 기준 21개 작성
- 개인정보 수집·이용 동의와 개인정보 처리방침 공개 링크 분리
- 취소와 필수정보 제공 거부의 복구 흐름 분리
- strict UTF-8, U+FFFD, 필수 섹션, 요구사항 추적, 정책 ID, Mermaid fence, 미완성 표식 정적 검사 PASS
- fresh-context watchdog 재감사 `PASS_WITH_WARNINGS`, 잔여 Must Fix 없음

### 가정과 한계

- 실제 모바일 제품명이 없어 화면설계 에이전트의 첫 forward test로 `DexCompany-Ops`에 저장했습니다.
- PRD/SPEC/SCREEN_FLOW/DATA_MODEL이 비어 있어 회사 확정 정책이 아니라 권장안과 열린 결정으로 작성했습니다.
- LLM Wiki에서 로그인 기능에 직접 적용 가능한 노트를 찾지 못해 Wiki 내용을 근거로 사용하지 않았습니다.
- iOS 로그인 서비스 규정 판단과 개인정보 처리 적법 근거·법무 문안은 출시 차단 결정으로 남아 있습니다.
- 실제 앱, 제공자 콘솔, Mermaid 렌더링, 실제 기기·접근성·약전계 테스트는 미확인입니다.

### 다음 행동

1. Q-001~Q-008 중 제품명·목적지, iOS 규정, 법무 동의, 계정 연결, 세션 정책을 PO·법무·개발이 승인합니다.
2. 실제 모바일 제품 프로젝트가 정해지면 `SCREEN_SPEC.md`를 해당 `10_Projects/<제품명>/`으로 이관·구체화합니다.
3. API·세션·동의 기록·계정 연결 데이터 계약은 실제 제품의 `SPEC.md`와 `DATA_MODEL.md`에 작성합니다.
4. 실제 기기에서 세 제공자의 성공·취소·거부·fallback·앱 복귀를 검증합니다.

<!-- DEX_PRESERVED_20260906_END -->
</details>
