# CHANGELOG

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
# Wiki Changelog

## 2026-09-02 — Runtime PR #95 Phase 3 evidence-correction head sync

- Runtime repository head를 documentation-only PR #95 `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`로 동기화
- PR #95 branch validation `33570034722`, post-merge `main` validation `33570148285`, branch/merge Vercel PASS 기록
- PR #88 Phase 3 implementation baseline과 approved-host E2E Not Checked / #28 OPEN 상태는 변경하지 않음

## 2026-09-02 — Runtime PR #94 repository-head pointer follow-up

- Runtime repository head를 watch-only PR #94 `206fee6b53a45d6a34784fecf1d9be17fabdbff1`로 보정
- PR #94 branch validation `33569752219`, branch/merge Vercel PASS와 merge-SHA Actions Not Checked 기록
- #28 Phase 3 implementation baseline PR #88과 approved-host E2E Not Checked 상태는 변경하지 않음

## 2026-09-02 — Runtime PR #88 Phase 3 implementation / PR #92 repository-head synchronization

- Runtime repository head를 PR #92 `5048ca8b92b1c31f012fc8d3efaedce15e2d946c`로 동기화하고 PR #89/#91/#92를 watch-only로 분리
- #28 Phase 3 implementation baseline을 PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`로 기록
- Atomic one-writer bridge, broker-only durable coordination, explicit one-time approval, whole-run timeout/interrupt, built-in file verification, Watchdog와 distinct read-only verifier 구현 반영
- PR #88 validation `33569106659` 235 PASS / 0 FAIL / 1 Windows-only SKIP, audit 0 vulnerabilities와 branch/merge Vercel PASS 기록
- PR #92 validation `33569258684`, branch/merge Vercel PASS 기록
- PR #88/#92 merge-SHA Actions와 approved Windows-host Phase 3 E2E는 Not Checked로 보존
- #28 OPEN, #34/#35 blocked, hosted writes·paid fallback·diagnostic upload·danger-full-access·multi-writer 비활성 유지
- CURRENT_STATE, PROJECT_CONFIG, CURRENT, SESSION_HANDOFF, QA_REPORT, SOURCES와 root HANDOFF를 같은 기준으로 동기화

## 2026-09-02 — Runtime PR #86 repository-head reconciliation

- Runtime repository head를 PR #86 `70eebc56b71210c3960105afc0167b1f5984b30a`로 동기화
- PR #86 branch validation `33561571348`, branch·merge Vercel PASS와 merge-SHA post-merge Actions Not Checked를 기록
- 기능 실행 기준을 #28 Phase 2 PR #67, Phase 1 PR #63, dedicated-host safety PR #60으로 분리 보존
- #28은 Phase 1·2 PASS → Phase 3 approved Windows-host E2E active next, #34/#35는 전체 PASS 대기로 유지
- CURRENT_STATE, PROJECT_CONFIG, CURRENT, SESSION_HANDOFF, QA_REPORT, SOURCES와 root HANDOFF의 포인터·Watchdog를 같은 기준으로 동기화
- PR #68–#86은 watch-only 문서 변경으로 기록하며 Runtime 권한·비용·provider capability를 활성화하지 않음

## 2026-09-01 — Runtime PR #67 / #28 Phase 2 canonical synchronization

- Runtime current head를 PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`로 통일
- #28 Phase 2의 OAuth `dex:read` MCP status/result tools, authenticated PWA status/result API와 진행·결과함 구현·검증을 PASS로 기록
- Canonical Task ID/Issue reference, durable Result/receipt 정합성과 read-only no-start/no-retry 경계를 반영
- PR #67 branch validation `33509769758` 215 total / 214 PASS / 0 FAIL / 1 Windows-only SKIP, branch·merge Vercel PASS를 기록
- PR #67 merge-SHA post-merge GitHub Actions는 run이 조회되지 않아 Not Checked로 보존
- #28을 Phase 1 PASS → Phase 2 PASS → Phase 3 active next로 교정하고 #34/#35 차단 순서를 유지
- CURRENT_STATE, PROJECT_CONFIG, CURRENT, SESSION_HANDOFF, QA_REPORT, SOURCES와 root HANDOFF를 같은 Gate로 동기화
- 인증 scope·Runtime 권한·hosted MCP write·유료 API/fallback·Codex 0.152.0 활성화는 변경하지 않음

## 2026-09-01 — Runtime PR #65 / #28 Phase 1 canonical resynchronization

- Runtime current head를 PR #65 `2edcd406e50b5be42206de10230c4753f3ae96f3`로 통일
- #28 execution baseline PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`과 dedicated-host safety baseline PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`을 분리 기록
- #17을 PASS/closed, #28을 Phase 1 PASS → Phase 2 → Phase 3으로 동기화
- PR #63~#65 validation과 Vercel PASS를 기록하고 PR #65 merge-SHA post-merge Actions는 Not Checked로 보존
- CURRENT_STATE, PROJECT_CONFIG, CURRENT, SESSION_HANDOFF, QA_REPORT, SOURCES와 root HANDOFF의 stale Gate 제거
- Guardian PR #41931을 0.152 stable-confirmed로 교정하고 #42031/#42033은 post-0.152 watch-only로 유지
- Runtime 코드·Issues의 실행 경계·권한·비용·provider capability 활성화는 변경하지 않음

## 2026-09-01 — Runtime PR #52 canonical state and host-safety synchronization

- Runtime current merge를 PR #52 `2ac45ceb907e70a6e6b72d617d9c9105052ae460`으로 통일
- PR #52 branch validation `33436716816`, post-merge `main` validation `33436796747`과 Vercel PASS 기록
- #17의 기능 `PASS_WITH_WARNINGS`, 보안 구현/CI PASS, interactive identity FAIL, 실제 dedicated-host E2E Not Checked를 분리
- root/project handoff의 완료된 Doctor 재실행 지시를 제거하고 dedicated account→credential 격리→registry digest→`worker:host-check`→최소 provider recheck→real result secret scan 순서로 교정
- AI Contract v2.3에 banked reset 자동 사용 금지, provider banner read-only, credit/reset/upgrade/fallback 사전승인 경계 추가
- PR #46~#52의 Sites·Record & Replay·Guardian·MCP event·paginated wake·Voice는 watch-only/disabled로 유지
- #17 전체 PASS와 owner rebaseline/waiver 전 #28 시작 금지, #34/#35는 #28 뒤 순서 유지
- Runtime 코드·Issues·권한·비용·reset·기능 활성화는 변경하지 않음

## 2026-08-30 — Unified orchestration policy and mobile-first Gate synchronization

- canonical 원칙을 `One Task ID / One Accountable Lead / Capability-Routed Workers / Risk-Based Independent Verification / One Canonical Result / Zero User Re-entry`로 확정
- Accountable Lead와 실행 worker를 분리하고 read 병렬화·mutation-scope single writer·risk-based verifier·durable result-before-callback 규칙 추가
- 설치된 plugin의 Chat/Work web·desktop·mobile 지원 범위를 공식 문서로 재검증하고 오래된 mobile custom MCP 미지원 단정 제거
- Runtime PR #27을 최신 main merge ref에서 재검증하고 exact subscription worker child-env isolation 병합
- Runtime PR #33에서 capability tracking schema 1.5와 orchestration policy regression test 병합
- Runtime #34 Work/mobile submit/status/result, #35 capability-routed reader/verifier 확대 Gate 생성
- #17은 `waiting-for-host`, #28 consumer/result E2E와 #34/#35는 미구현·tracked-disabled로 유지

## 2026-08-27 — Codex 0.150 Stable Capability Tracking

- OpenAI Codex stable `0.150.0` 공식 릴리스와 App Server schema 재검증
- MCP `runtimeStatus`와 `notStarted`, `starting`, `connected`, `authenticationRequired`, `failed`, `cancelled`, `disabled` stable schema 포함 확인
- Runtime compatibility probe를 v3로 갱신하고 tested stable minimum `0.150.0` 반영
- stable/prerelease SemVer를 구분하고 prerelease는 approved stable-host gate에서 제외
- Version은 upgrade recommendation으로만 사용하고 generated schema를 capability evidence로 유지
- MCP runtime status를 `supported:true`, `stable-schema`, `tracked-disabled`, `enabled:false`로 반영
- Dex MCP Gateway health와 Codex worker MCP status authority 분리
- Task `@` mentions를 GitHub Task Bus 보조 execution-reference 설계 대상으로 등록
- `Interrupt` hook을 checkpoint/handoff security prototype 대상으로 등록하고 hook configuration은 추가하지 않음
- unfinished-turn suspension과 paginated thread history를 Issue #21의 watch-disabled 상태로 유지
- Runtime capability tracking config와 Issues #17~#21 생성
- Runtime PR #22 merge commit `b156bc6cc2dec8963e1f43d5e066c11fda8ee84d`
- Runtime validation run `33022962598`: 40 syntax checks, 171/171 tests, smoke, Vercel adapter smoke, rollback guard PASS
- Production dependency audit 0 vulnerabilities와 Vercel deployment success 확인
- `CODEX_0150_RESPONSE_20260827.md`, root state, project config, decision, source와 changelog 동기화

## 2026-08-26 — Codex Model Retirement and Dex Skill/Plugin Refresh

- OpenAI 공식 2026-08-31 Codex 모델 종료를 재검증
- `gpt-5.4` → `gpt-5.6-terra`, `gpt-5.4-mini` → `gpt-5.6-luna` 전환 정책 반영
- Runtime compatibility baseline에 stable App Server `model/list` 추가
- hidden model 포함 bounded cursor pagination, unknown model·invalid response·cursor cycle fail-closed 구현
- 종료 모델의 official replacement가 authenticated catalog에 있을 때만 explicit/default 요청을 migration metadata와 함께 이관
- healthy 5.6 catalog의 server default와 capability-class routing 유지
- `thread/turns/list`, `thread/items/list`는 공식 문서상 experimental로 정정하고 `enabled: false` 유지
- MCP `runtimeStatus`와 unfinished-turn suspension도 미검증 상태에서 계속 비활성
- Runtime repo marketplace `.agents/plugins/marketplace.json` 추가
- canonical plugin `plugins/dex-company-core` v1.0.0 추가
- GitHub-first `use-dex-company`와 구현 전달형 `create-screen-spec` Skill 추가
- 화면설계 Skill에 상태·예외·PC/Mobile·접근성·추적성·acceptance criteria guide/template 반영
- 기존 `dex-company-work@eden-local`과 standalone `create-screen-spec`은 source 비교와 approved-host forward test 전 삭제하지 않음
- plugin에 machine path, local knowledge dependency, paid API credential, private MCP duplicate, `.mcp.json`, `.app.json` 없음 확인
- OpenAI Skills API는 API authentication이 필요해 subscription-first 기본 경로에서 미사용
- Runtime PR #15 merge commit `71e75422d9318ea3195f21a6c0df57f93482944c`
- 첫 CI의 legacy 설명문 정책 실패를 test 완화 없이 수정
- 최종 Runtime validation 163/163, smoke, Vercel adapter smoke, rollback guard, secret scan, dependency audit 0 vulnerabilities PASS
- Vercel merge-commit deployment status success 확인
- model routing guide, Skill/Plugin governance, project state, decision, source, QA와 handoff 동기화

## 2026-08-25 — Runtime Provider Integrations and Codex Compatibility Gate

- Runtime PR #14을 merge commit `10013ee530431a03257d81ae00d50cb1be3beb2b`로 `main`에 병합
- GitHub App installation auth, GitHub user OAuth, PWA Task write, MCP OAuth/read/widget, Redis replay/idempotency 보강 반영
- Codex canonical worker 인터페이스를 `codex app-server --stdio`로 유지하고 deprecated `codex mcp-server` 의존성 없음 확인
- 설치된 Codex CLI의 `generate-json-schema` 결과를 검사하는 compatibility gate 추가
- `account/read`, `thread/start`, `turn/start` baseline 누락 시 account 연결 전 fail-closed
- `npm run codex:compatibility`, `npm run codex:status` 운영 명령 추가
- MCP `runtimeStatus`와 unfinished-turn suspension은 감지만 하고 별도 구현·검증 전 `enabled: false` 유지
- 공식 Codex `rust-v0.149.1`에서 두 선택 capability가 stable App Server surface로 제공되지 않음을 확인
- Runtime merge commit GitHub Actions 147/147, smoke, Vercel adapter smoke, rollback guard, secret scan, dependency audit PASS
- Vercel merge-commit deployment status success 확인
- root `CURRENT_STATE.md`, DexCompany-Ops config/decision/source/QA/handoff를 실제 Runtime 상태에 맞게 동기화

## 2026-08-22 — Dex Company v2 Architecture and Portability

- Obsidian을 공식 구성요소에서 제외하는 결정 반영
- GitHub `main` Source of Truth 유지
- `dexcompany.app` Web/PWA를 universal front door로 확정
- 하나의 standards-first MCP Gateway를 ChatGPT와 Claude에 연결하는 구조 확정
- Provider 독립 core + Provider별 최적화 원칙 확정
- Subscription-first와 API 자동 과금 금지 정책 확정
- `AI_CONTRACT.md`, `CLAUDE.md`, `GEMINI.md`, provider adapter 선언 추가
- 역할·capability, 플랫폼 parity, PWA 제품, MCP Gateway 문서 추가
- README, LLM context, state, overview, decisions, handoff와 workflow 갱신
- Obsidian usage guide를 legacy compatibility reference로 전환
- Runtime bootstrap 생성·정적 검증 완료, 별도 `dex-company-runtime` 저장소 생성·배포 작업을 Issue #2로 추적

## 2026-08-21 — Obsidian Vault Migration

- 후속 재검수에서 발견된 운영 경로·문서·개인정보 누락을 보정
- 로컬 helper PowerShell 15개의 기본 Vault를 Git working copy로 통일
- Growth Scan preflight와 자동화 prompt를 Git Vault로 전환하고 `PAUSED` 상태 유지
- Dex Company Wiki 플러그인 원본·개인 marketplace 복사본·설치 cache를 Git Vault로 전환
- Obsidian registry를 Git Vault 단일 등록으로 정리하고 기존 Vault 폴더는 그대로 보존
- 현재 문서 6곳의 로컬 Windows 계정 경로를 `%USERPROFILE%`로 치환
- Git bundle 백업 검증 후 전체 이력에서 개인 이메일과 과거 계정 경로 제거
- Vault health 0 warning, plugin 테스트 12/12, 실제 192개 Wiki 문서 health, LLM Wiki lint 0 warning 확인
- Growth Scan preflight의 Git Vault 경로·status·lint PASS와 free RAM 0.79GB 안전 게이트 FAIL 기록; 자동화는 `PAUSED` 유지
- 새 Git working copy를 Obsidian Vault로 등록하고 UI 문서 표시 및 registry `open: true` 확인
- 마이그레이션 상태를 `canonical-migration-complete`로 전환
- Obsidian registry에서 `D:\VibeProject\ObsidianVault\ObsidianVault`가 등록 Vault였음을 추가 확인
- 등록 Vault 505개 파일을 별도 백업하고 파일별 SHA-256 무결성 검증
- 두 Vault의 공통 동일 369개·OneDrive 고유 140개·등록 Vault 고유 5개·내용 차이 15개를 대조
- 등록 Vault 고유 일지 1개, Canvas 3개, Bases 1개와 최신 그래프 표시 설정을 Git Vault에 보존
- 내용이 다른 운영/LLM Wiki 문서는 후속 변경을 포함한 OneDrive 최신본을 유지하고 구형본 전체는 백업에 보존
- 기존 `D:\OneDrive\ObsidianVault` 전체를 변경 전에 백업하고 파일별 SHA-256으로 무결성 검증
- GitHub `main` 이력을 유지한 별도 working copy에 활성 Vault 524개 파일 병합
- 기존 Markdown, Canvas, Obsidian 설정, 프로젝트 문서, LLM Wiki 자료 보존
- 원격 `AGENTS.md`와 기존 Vault 운영 규칙 통합
- 프로젝트 경로 규칙을 실제 구조인 `10_Projects/`로 정정
- `.codex-backups/`, Obsidian workspace 상태, Secret·인증서·임시파일을 GitHub 제외 대상으로 강화
- 루트 `README.md`, `LLM_CONTEXT.md`, `CURRENT_STATE.md`, `DECISIONS.md`, `HANDOFF.md`를 실제 마이그레이션 상태에 맞게 갱신
- 원본 비충돌 파일 523개의 길이·SHA-256 동일성 검증
- Wiki Link 296개 검사 후 모호한 전역 링크 3개를 전체 경로로 명확화
- LLM Wiki status/lint 통과 및 v5 메타데이터 누락 0건 확인
- Git 추적 551개 파일의 Secret/개인정보·UTF-8·JSON·Canvas 검사 통과

## 2026-08-21 — Initial Infrastructure

- GitHub repository를 Dex Company LLM Wiki의 Source of Truth로 정의
- AI 공통 작업 규칙 추가
- LLM 공통 Context 추가
- Current State 대시보드 추가
- Decision Log 추가
- AI Handoff 문서 추가
- Secret 및 로컬 상태 보호를 위한 `.gitignore` 추가

<!-- DEX_PRESERVED_20260906_END -->
</details>
