# SESSION_HANDOFF

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
﻿# SESSION_HANDOFF

## 2026-09-02 - Runtime PR #95 repository head / #28 Phase 3 implementation merged / approved-host E2E pending

### 완료

- Runtime current `main`: PR #95 merge `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`
- #28 Phase 3 implementation: PR #88 merge `ae9552aa5cbacf78bb4789ce913142397e2a3968`
- PR #88 branch validation `33569106659`: 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP; audit 0 vulnerabilities
- PR #88 branch Vercel과 merge-SHA Production Vercel: PASS
- PR #95 branch validation `33570034722`, post-merge `main` validation `33570148285`, branch/merge Vercel: PASS
- #28 Phase 1 PR #63, Phase 2 PR #67과 #17/dedicated-host PR #60 baseline 유지
- bounded local bridge, atomic one-writer claim, broker-only durable coordination, one-time approval, whole-run timeout/interrupt, SHA-pinned built-in verification, deterministic Watchdog와 distinct read-only verifier 구현
- bridge import 경로의 repository `.env` 비로딩 회귀검증
- Issue #28 checkpoint comment `5501642642`과 approved-host runbook 동기화
- Hosted writes, paid API/fallback, diagnostic upload, `danger-full-access`, multi-writer, automatic merge/deploy 활성화: 0건

### 현재 Gate

- #17: PASS/closed; 재실행·재승인 불필요
- #28 Phase 1: PASS
- #28 Phase 2: PASS
- #28 Phase 3 implementation: PASS
- #28 Phase 3 approved Windows-host E2E: Not Checked
- #28: OPEN 유지
- #34/#35: #28 전체 PASS 대기
- Codex 0.152.1과 PR #89/#91/#92/#94 watch capability: 별도 검증 전 비활성

### Not Checked

- PR #88 / #94 merge-SHA post-merge GitHub Actions
- approved-host offline/resume, read-only no-op, approval pending/deny, one-file mutation, timeout/late-result rejection, detached verifier
- same Task ID PWA/read-only MCP status/result retrieval
- host validation 중 operational Runtime/Wiki `main`, Production configuration/deployment mutation 0

### Next Prompt

`Runtime main을 승인 Windows host에 동기화하고 docs/PHASE3_LOCAL_BRIDGE.md의 #28 Phase 3 matrix만 실행해. offline/resume, read-only no-op, approval pending/deny, explicit one-time one-file mutation, timeout/late-result rejection, detached verifier와 같은 Task ID의 PWA/read-only MCP status/result 조회를 증명해. 실행 전후 operational Runtime/Wiki main과 Production configuration/deployment mutation 0을 기록하고, 완료된 #17·Phase 1·2는 반복하지 마. hosted writes·paid fallback·diagnostic upload·danger-full-access·multi-writer·automatic merge/deploy는 활성화하지 마.`

### Watchdog

`PASS_WITH_WARNINGS` — Phase 3 implementation, security review, branch CI, dependency audit, PR merge와 Vercel은 PASS입니다. Physical Windows-host matrix와 merge-SHA GitHub Actions는 Not Checked이므로 #28은 OPEN이고 Phase 3 전체 PASS로 표시하지 않습니다.

> 아래 섹션은 superseded historical handoff입니다. 현재 실행은 위 Next Prompt만 사용합니다.

## 2026-08-30 - 모바일 우선 Unified Task 정책·보안 Gate 동기화

### 완료

- Runtime PR #27 merge `5c3770549ad29fb56d9504c280456e0921d3e2f6`
- PR #27 latest-main merge-ref run `33317627474` PASS
- PR #27 post-merge main run `33317754565` PASS, Vercel success
- Runtime PR #33 merge `44d99df4b05ece108bd87aa6db9cfe4de566eca8`
- PR #33 post-merge main run `33318160221` PASS, Vercel success
- AI Contract v2.2와 Unified Workflow Protocol에 canonical multi-worker 원칙 반영
- Runtime #34 Work/mobile submit/status/result, #35 capability-routed readers/verifier 추적 생성
- 기존 모바일 custom MCP 미지원 단정 제거; installed plugin 사용 가능 여부를 capability check하고 PWA로 fallback

### 현재 Gate

- #17 승인 PC Codex 0.151 Doctor·compatibility·status·model/list: `waiting-for-host` / Not Checked
- #28 Task consumer→one writer→Watchdog→detached verifier→durable Result/PWA inbox: 미구현
- #18 read-only runtimeStatus: #17 PASS 대기
- #34 Work/mobile plugin E2E: #28 PASS 대기
- #35 capability-routed read workers/verifier 확대: #28 PASS 대기
- hosted MCP writes, multi-writer, paid API, automatic extra usage: Disabled

### Next Prompt

`승인 PC를 사용할 수 있게 되면 Runtime main을 fast-forward하고 npm.cmd ci --no-audit --no-fund 뒤 npm.cmd run codex:doctor, npm.cmd run codex:compatibility, npm.cmd run codex:status 순서로 Issue #17 acceptance를 실행해. Doctor가 fail이면 중지하고, API key 없이 ChatGPT subscription·real model/list·child-env canary·generated schema evidence를 #17에 기록해. #17 PASS 전 #28 worker consumer나 hosted write를 활성화하지 마.`

### Watchdog

`PASS_WITH_WARNINGS` — 모바일에서 가능한 정책·보안·추적·문서 동기화는 완료했습니다. 실제 local worker와 cross-surface E2E는 PC/host 및 후속 구현이 필요해 Not Checked 또는 미구현으로 유지합니다.

## 2026-08-26 - Codex 모델 종료 대응과 canonical Skill/Plugin 전환

### 변경 내용

- OpenAI 공식 Help와 `openai/codex` stable source로 GPT-5.4 계열 종료, `model/list`, experimental thread history와 plugin packaging contract를 재검증했습니다.
- Runtime compatibility baseline에 `model/list`를 추가했습니다.
- worker connect 시 hidden model을 포함한 authenticated model catalog를 bounded cursor pagination으로 읽도록 했습니다.
- `gpt-5.4`는 `gpt-5.6-terra`, `gpt-5.4-mini`는 `gpt-5.6-luna`가 catalog에 있을 때만 migration metadata와 함께 이관합니다.
- unknown model, invalid catalog, cursor cycle, missing replacement는 fail-closed합니다.
- healthy 5.6 catalog의 server default와 capability-class routing은 유지합니다.
- paginated thread history는 공식 문서상 experimental로 정정하고 `enabled: false`로 유지했습니다.
- MCP `runtimeStatus`와 unfinished-turn suspension도 계속 비활성입니다.
- Runtime repo에 `.agents/plugins/marketplace.json`과 `plugins/dex-company-core` v1.0.0을 추가했습니다.
- canonical plugin에 `use-dex-company`와 개선된 `create-screen-spec`을 포함했습니다.
- `create-screen-spec` guide/template에 상태·예외·반응형·접근성·추적성·acceptance criteria와 artifact separation을 반영했습니다.
- plugin에서 machine-specific path, local knowledge-vault dependency, provider API credential, private MCP duplicate, `.mcp.json`, `.app.json`을 제외했습니다.
- 기존 `dex-company-work@eden-local`과 standalone `create-screen-spec`은 source 비교와 approved-host forward test 전까지 유지합니다.
- OpenAI Skills API는 API authentication이 필요해 subscription-first 기본 경로에서 사용하지 않았습니다.
- Runtime PR #15를 merge commit `71e75422d9318ea3195f21a6c0df57f93482944c`로 병합했습니다.
- Wiki에 model routing guide, Skill/Plugin governance, current state, project config, current, QA, decisions, sources, changelog를 동기화했습니다.

### 검증한 것

- 공식 2026-08-31 GPT-5.4→Terra, GPT-5.4 mini→Luna retirement mapping 확인
- stable App Server `model/list` schema와 response contract 확인
- paginated history experimental status와 `experimentalApi: true` 요구 확인
- official repo marketplace, plugin manifest, Skill structure와 CLI command 확인
- 기존 canonical Runtime/Wiki에서 5.4 hard-coded default 없음 확인
- Runtime static checks: 13 required files, 39 JavaScript syntax, JSON/dependency/secret scan PASS
- model policy tests 10/10 PASS
- plugin package tests 5/5 PASS
- compatibility/status tests 11/11 PASS
- 전체 Runtime tests 163/163 PASS
- smoke, Vercel adapter smoke, rollback guard PASS
- production dependency audit 0 vulnerabilities
- first CI policy failure의 원인 확인과 test 완화 없는 수정 PASS
- Runtime PR #15 unresolved review thread 0건, P0-P2 잔여 없음
- Runtime PR #15 merge PASS
- Runtime main의 canonical plugin manifest 존재 PASS
- merge commit Vercel status `success`, `Deployment has completed` PASS

### 남은 일

- 승인 local host에서 Runtime main 동기화
- `npm run codex:compatibility`, `npm run codex:status` 실행과 real `model/list` 확인
- `modelCatalog.retirementReady: true`, `ready: true` 확인
- `dex-company` marketplace add/upgrade와 `dex-company-core@dex-company` install
- fresh session에서 `use-dex-company`, `create-screen-spec` forward test
- inaccessible legacy local source와 canonical package의 unique-content diff
- 검증 후 legacy plugin/standalone Skill disable 또는 remove
- ChatGPT Developer Mode와 Claude Remote MCP E2E

### Next Prompt

`승인된 local host에서 Dex Runtime main을 동기화하고 npm run codex:compatibility와 npm run codex:status를 실행해 modelCatalog.retirementReady와 ready를 검증한 뒤, dex-company marketplace에서 dex-company-core를 설치하고 두 Skill을 fresh session으로 forward test해. Legacy source와 unique-content diff를 확인하기 전에는 기존 plugin이나 Skill을 삭제하지 마.`

### Watchdog Verdict

`PASS_WITH_WARNINGS` — 공식 사실 정정, model retirement 구현, fail-closed catalog, Git-backed package, automated verification, PR merge와 deployment status는 PASS입니다. approved-host catalog/plugin E2E와 legacy source comparison은 Not Checked이며 legacy removal은 수행하지 않았습니다.

## 2026-08-25 - Codex App Server 업데이트 대응과 Runtime 병합

### 변경 내용

- OpenAI Codex stable `rust-v0.149.1`과 mainline 변경을 분리해 검토했습니다.
- stable에서 MCP `runtimeStatus`가 아직 제공되지 않고 unfinished-turn suspension도 App Server request로 export되지 않는다고 판정했습니다.
- Runtime에 설치된 Codex CLI의 App Server JSON Schema를 직접 검사하는 compatibility gate를 추가했습니다.
- baseline request가 누락되면 ChatGPT account 연결 전에 fail-closed합니다.
- optional `runtimeStatus`와 unfinished-turn suspension은 발견해도 자동 활성화하지 않습니다.
- `npm run codex:compatibility`와 `npm run codex:status`를 추가했습니다.
- compatibility subprocess에 `shell:false`, API key 제거, timeout, output bound, symlink 제외, 임시 파일 cleanup을 적용했습니다.
- Runtime PR #14를 `main`에 병합했습니다. Merge commit은 `10013ee530431a03257d81ae00d50cb1be3beb2b`입니다.
- Dex Wiki의 root state, project config, current, decision, source, QA, changelog를 최신 Runtime 상태로 동기화했습니다.

### 검증한 것

- 공식 `rust-v0.149.1` App Server README의 version-specific schema generation contract 확인
- stable `ListMcpServerStatusResponse.json`의 `runtimeStatus` 부재 확인
- stable protocol source의 unfinished-turn suspension App Server export 부재 확인
- Runtime/Wiki의 `codex mcp-server` reference 검색 0건
- 신규 compatibility 테스트 10/10 PASS
- PR 전체 Node tests 147/147 PASS
- static syntax/JSON/dependency/secret scan PASS
- Runtime smoke PASS
- Vercel adapter smoke PASS
- rollback guard PASS
- production dependency audit 0 vulnerabilities
- PR unresolved review thread 0건
- Runtime PR #14 merge PASS
- merge-commit GitHub Actions run `32788889580` PASS
- merge-commit Vercel status `success`, `Deployment has completed` PASS

### 남은 일

- 승인된 local host에서 실제 설치 Codex로 `npm run codex:compatibility` 실행
- 같은 host에서 ChatGPT 관리 구독 로그인 상태의 `npm run codex:status` 실행
- ChatGPT Developer Mode OAuth/read/widget 실제 검증
- Claude Remote MCP OAuth/read/widget 실제 검증
- current execution environment에서 확인하지 못한 post-merge Production HTTP endpoint smoke
- stable App Server schema가 선택 capability를 export할 때 별도 branch 구현

### Next Prompt

`Dex Runtime main을 동기화한 승인 local host에서 npm run codex:compatibility와 npm run codex:status를 실행하고, baseline/optional capability와 ChatGPT subscription auth 결과를 PASS/FAIL/Not Checked로 기록해줘.`

### Watchdog Verdict

`PASS_WITH_WARNINGS` — stable/main 구분, fail-closed 설계, 테스트, 보안 검토, PR 병합, merge CI와 Vercel deployment status는 PASS입니다. 실제 subscription host와 ChatGPT/Claude connector E2E, post-merge HTTP endpoint는 Not Checked입니다.

## 2026-08-24 - Production 로그아웃 자동 재로그인 수정

### 변경 내용

- Runtime 로그로 로그아웃 세션 폐기 성공 후 `/` 이동이 GitHub OAuth를 자동 재시작하는 원인을 확정했습니다.
- 프런트 로그아웃 이동 경로를 `/logged-out`으로 변경했습니다.
- 세션이나 프로젝트 데이터를 노출하지 않는 로그아웃 완료 화면과 명시적 GitHub 재로그인 링크를 추가했습니다.
- Runtime PR #13을 병합하고 Production에 배포했습니다.

### 검증한 것

- 수정 전 회귀 테스트: `/logged-out` 404 재현
- 타깃 테스트 14/14 PASS
- 전체 CI 107/107 PASS
- smoke, Vercel adapter smoke, rollback guard PASS
- GitHub/Vercel PR checks PASS
- Production 배포 `dpl_HeBjSF3toEEbnwHZWoboLqJMPnfN` Ready 및 canonical alias 연결
- Production `/logged-out` 200, `no-store`, 완료 문구와 명시적 로그인 링크 PASS
- 비인증 `/`의 기존 OAuth 302 보호 동작 유지 PASS
- 에던님이 실제 열린 PWA에서 로그아웃 버튼 클릭 후 `/logged-out` 완료 화면 렌더링 PASS

### 남은 일

- 완료 화면의 명시적 로그인 버튼으로 재로그인되는 흐름 확인
- 모바일/별도 브라우저의 실제 UI 확인

### Watchdog Verdict

`PASS` — 원인, 범위, 회귀 테스트, Production HTTP 계약과 실제 사용자 브라우저 로그아웃 상호작용을 검증했습니다.

## 2026-08-21 - GitHub Source of Truth 운영 전환 보정

### 변경 내용

- helper 15개, Growth Scan, Dex Company Wiki 플러그인의 기본 경로를 Git Vault로 통일했습니다.
- Obsidian registry에서 기존 Vault 등록만 제거하고 Git Vault를 단일 `open: true` 항목으로 유지했습니다.
- 운영 문서의 OneDrive canonical 표현을 GitHub `main`/Git Vault 기준으로 정정했습니다.
- 현재 파일과 Git 과거 이력의 로컬 계정 경로 및 개인 이메일 메타데이터를 정제했습니다.
- 이력 재작성 전 전체 refs bundle과 외부 설정 파일을 별도 로컬 백업했습니다.

### 검증한 것

- PowerShell 15개 구문 PASS, legacy 기본 경로 0건
- Vault health 0 warning
- LLM Wiki status/lint PASS, audit v5 누락 0건·unexplored 14건·stale 200건
- Growth Scan preflight 경로/status/lint PASS, free RAM 0.79GB로 안전 게이트 FAIL
- 플러그인 source/installed cache 테스트 각각 12/12, 실제 Git Vault 승인 문서 192개 색인
- Obsidian registry 단일 경로 및 기존 Vault 실제 파일 삭제 0건
- Git 현재 트리와 전체 이력 Secret·개인 이메일·로컬 계정 경로 0건

### 남은 일

- Obsidian 앱 재실행 후 단일 Vault GUI 확인
- free RAM 1GB 이상에서 preflight 재실행 후 Growth Scan 재개 여부 결정
- 재개 시 첫 예약 회차 write-path 확인
- 새 Work 세션의 플러그인 UI와 `obsidian://` 링크 확인

### Watchdog Verdict

`PASS_WITH_WARNINGS` — 필수 전환과 보안 검증은 완료했으며 GUI 재실행·예약 자동화·별도 복원 훈련은 Not Checked입니다.

## 이전 변경 내용

- OneDrive canonical Vault에 legacy-only 파일 168개를 복사했습니다.
- 더 최신인 LLM Wiki 파일 67개를 기존 정식본 백업 후 교체했습니다.
- 운영 문서 충돌 5개는 테스트·scope lock·imagegen 원칙으로 수동 병합했습니다.
- Growth Scan 자동화와 preflight의 기본 Vault 경로를 OneDrive로 전환했습니다.
- 활성 프로젝트 4개를 `10_Projects/`에 등록했습니다.
- 전역 운영 문서, 프로젝트 스냅샷, 생성 템플릿을 동일한 품질 규칙으로 동기화했습니다.
- 현재 역량 query와 capability map을 만들고 LLM Wiki index를 139개에서 17개 wikilink로 압축했습니다.
- dex-watchdog의 legacy 외부 에이전트 기준을 Codex `imagegen` 기준으로 교정했습니다.

## 검증한 것

- 병합 dry-run과 apply manifest
- canonical Vault 구조와 파일 수
- 코드 저장소 path/remote/branch/dirty 상태
- 프로젝트 생성 스크립트 실제 적용
- Vault health PASS, LLM Wiki status/lint/audit PASS
- DexCompany-Ops context packet 31개 파일 수집, quality rules 포함, missing wikilink 없음
- PowerShell 변경 스크립트 parse PASS와 한국어 UTF-8 깨짐 없음

## Watchdog Verdict

PASS_WITH_WARNINGS — canonical 통합과 운영 도구는 사용 가능하며, RAM gate·Bias Check 큐·프로젝트 도메인 skeleton은 후속 검증이 필요합니다.

## 남은 일

- Bias Check 보완 큐 66개 실제 검토
- free RAM 1GB 미만으로 실패한 Growth Scan preflight 재실행
- 자동화의 다음 예약 실행 결과 확인
- Obsidian GUI/CLI end-to-end 확인

## Next Prompt

`DexCompany-Ops`의 CURRENT, SESSION_HANDOFF, QA_REPORT를 읽고 RAM이 1GB 이상인지 확인한 뒤 Growth Scan preflight와 다음 예약 실행을 검증해주세요.

## 2026-08-11 - 화면설계서 에이전트 생성

### 변경 내용

- `D:\Program Files\Codex\skills\create-screen-spec`에 전역 Codex 스킬을 생성했습니다.
- 입력 근거, 화면 ID, 흐름, 컴포넌트/필드/행동, 상태·예외, 반응형, 접근성, 요구사항 추적성, 수용 기준을 강제하는 작업 계약을 작성했습니다.
- 세부 작성 기준 reference와 재사용 Markdown template을 포함했습니다.
- `20_Codex_Handoff`와 `10_Projects/DexCompany-Ops`의 Planner matrix/router에 새 스킬을 연결했습니다.

### 검증한 것

- 필수 파일, frontmatter, 폴더명, UI metadata, 링크, 템플릿 필수 섹션
- 네 파일 strict UTF-8와 한국어 replacement character 없음
- canonical/project 라우팅 반영
- 대체 정적 검사 25개 PASS

### Watchdog Verdict

`PASS_WITH_WARNINGS` — 사용 가능한 상태이며, 공식 Python validator와 새 Codex 세션 자동 검색은 미확인입니다.

### 남은 일

- 새 세션에서 `$create-screen-spec` 자동 검색과 실제 호출 확인
- 에던님의 실제 기능 요구사항으로 첫 화면설계서를 생성해 질문 수와 문서 밀도 보정

### Next Prompt

`$create-screen-spec 회원가입과 로그인 기능을 개발자에게 전달할 수 있는 화면설계서로 만들어줘.`

## 2026-08-11 - ChatGPT Work + Obsidian LLM Wiki 연결

### 변경 내용

- `D:\CodexProjects\codex setup\plugins\dex-company-work`에 tool-only 로컬 플러그인을 구현했습니다.
- 기존 `create-screen-spec`을 플러그인에 포함하고 `use-dex-company-wiki` 스킬을 추가했습니다.
- 승인된 LLM Wiki Markdown만 색인하는 Node MCP 서버를 만들고 `search`, `fetch`만 노출했습니다.
- 개인 `eden-local` marketplace에 플러그인을 등록하고 `dex-company-work@eden-local`을 설치·활성화했습니다.
- 설치 전 marketplace와 Codex config를 `.codex-backups/dex-company-work-20260811/`에 백업했습니다.

### 검증한 것

- TDD RED 후 unit, package, path isolation, secret exclusion, UTF-8, strict input schema, 120KiB wire response limit, in-memory MCP, child stdio MCP 테스트 12개 PASS
- `@modelcontextprotocol/sdk@1.30.0`, `zod@4.4.3` exact pin과 `npm audit --omit=dev` 취약점 0건
- 실제 Vault 승인 범위 192개 문서 색인 PASS
- 설치 캐시에서 `search`/`fetch`만 노출, read-only annotation, 한국어 fetch, 검증 메타데이터, Obsidian citation URL PASS

### 보안 경계

- Vault 전체가 아니라 `index.md`, `wiki/`, `sources/`만 읽습니다.
- path 대신 opaque ID를 사용하고 symlink/junction·root escape·secret fixture를 차단합니다.
- Wiki 본문은 명령이 아닌 신뢰되지 않은 증거 데이터로 취급합니다.
- 쓰기, 삭제, upload, shell, directory listing, remote reindex는 없습니다.

### 남은 일

- 새 ChatGPT/Codex Work 세션에서 플러그인 카드·스킬 자동 호출 UI 확인
- `obsidian://` citation 클릭 확인
- Windows OneDrive reparse tag 전체와 별도 저권한 ACL 검증
- 웹 ChatGPT가 필요할 경우 HTTPS/OAuth read-only gateway 별도 설계
- 기존 `lazyweb` marketplace snapshot 오류로 전체 `codex plugin list`가 실패하는 문제는 별도 승인 후 정리

### Next Prompt

`Dex LLM Wiki를 참고해서 회원가입과 로그인 기능의 화면설계서를 만들어줘. source-backed, Dex inference, not checked를 구분해줘.`

### Watchdog Verdict

`PASS_WITH_WARNINGS` (31/35) — 로컬 Work 설치와 read-only MCP 실행에는 Must Fix가 없습니다. 새 Work UI 카드·자동 호출, `obsidian://` 클릭, 웹 HTTPS/OAuth, OneDrive 전체 reparse/ACL은 미확인입니다.

## 2026-08-12 - 모바일 SNS 로그인 화면설계 forward test

### 변경 내용

- `SCREEN_SPEC.md` v0.1.1을 만들고 네이버·카카오톡·Google 로그인 여정을 설계했습니다.
- `SCR-001` SNS 로그인, `SCR-002` 필수 약관 동의, `SCR-003` 기존 계정 연결 확인을 상세 정의했습니다.
- 사용자 journey 1개, 전체 분기 flow 1개, 실패·권한·네트워크 flow 1개를 Mermaid로 작성했습니다.
- 화면별 description, 카피, 요소, 상태, 오류, 반응형, 접근성, 수용 기준을 포함했습니다.
- Google·카카오·네이버·Apple·플랫폼 접근성·개인정보 보호법의 공식 문서를 확인했습니다.
- Wiki에는 직접 적용 가능한 로그인 노트가 없어 source-backed 근거로 사용하지 않았습니다.

### 감사 후 보정

- 개인정보 처리방침 자체를 동의 체크박스로 사용하지 않고 개인정보 수집·이용 동의와 상시 공개 링크로 분리했습니다.
- 제공자 화면의 단순 취소와 필수정보 제공 거부를 서로 다른 복구 흐름으로 분리했습니다.
- 계정 연결 화면에 제공자 선택·재인증·검증·연결·오프라인·불일치·충돌 상태를 추가했습니다.
- 로그아웃·연동 해제·탈퇴는 본 문서의 Must 화면이 아니라 출시 전 별도 계정관리 사양 의존성으로 조정했습니다.
- Apple 4.8 판단 책임자를 PO+법무/출시 책임자로 정하고 승인 전 iOS 출시 차단을 명시했습니다.

### 검증한 것

- strict UTF-8와 한국어 replacement character 없음
- `RQ-001~RQ-018`, `POL-001~POL-013`, `SCR-001~003` 추적
- Mermaid 블록 3개와 전체 fence 균형
- 고유 수용 기준 21개와 미완성 template marker 없음
- 공식 문서의 현재 로그인·심사·접근성 근거 확인

### 남은 일

- 제품명·로그인 후 목적지·로그인 강제 여부 승인
- iOS 로그인 서비스 규정 예외 또는 동등 옵션 승인
- 개인정보 처리 적법 근거·약관·연령·보유기간 법무 승인
- 실제 API·세션·계정 연결 data contract 작성
- 제공자 개발자 콘솔과 최신 브랜드 리소스 확인
- Mermaid 실제 렌더링과 실제 기기·접근성·약전계·보안 테스트

### Next Prompt

`SCREEN_SPEC.md의 Q-001~Q-008을 실제 제품 정책으로 확정하고, 승인된 결정을 SPEC.md와 DATA_MODEL.md에 연결해줘.`

### Watchdog Verdict

`PASS_WITH_WARNINGS` (41/50) — 최신 산출물 재감사에서 잔여 Must Fix는 없었습니다. 공식 정책 결정, Mermaid 실제 렌더링, 실제 앱·기기 검증은 남아 있습니다.

<!-- DEX_PRESERVED_20260906_END -->
</details>
