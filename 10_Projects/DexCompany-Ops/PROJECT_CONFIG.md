# PROJECT_CONFIG

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
# PROJECT_CONFIG

Project name: DexCompany-Ops
Project folder: 10_Projects/DexCompany-Ops
Status: active
Operational status: v2-codex-0151-recommended-tracked-disabled

## Canonical repositories

- Knowledge and control plane: `ethanhee890-commits/dex-company-wiki`
- Runtime and execution plane: `ethanhee890-commits/ethanhee890-commits-dex-company-runtime`
- Canonical branch: `main`
- Current Runtime merge: PR #95 `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`
- Current Unified Task Phase 3 implementation baseline: PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`
- Current Unified Task Phase 2 retrieval baseline: PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`
- Current Unified Task Phase 1 execution-core baseline: PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- Current dedicated-host safety baseline: PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Latest Runtime validation: PR #95 branch run `33570034722` PASS; post-merge `main` run `33570148285` PASS; branch/merge Vercel PASS
- Phase 3 implementation validation: PR #88 branch run `33569106659` — 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP; audit 0 vulnerabilities; branch/merge Vercel PASS; merge-SHA post-merge Actions Not Checked
- Canonical Dex plugin: `plugins/dex-company-core`
- Canonical plugin marketplace: `.agents/plugins/marketplace.json`
- Latest model-readiness evidence: `10_Projects/DexCompany-Ops/CODEX_MODEL_RETIREMENT_EFFECTIVE_20260831.md`
- Latest Codex stable-response evidence: `10_Projects/DexCompany-Ops/CODEX_0152_STABLE_RESPONSE_20260901.md`
- Latest stable correction: Runtime PR #89 — official 0.152.1 validation-only candidate; no auto-promotion
- Latest post-stable watch evidence: `10_Projects/DexCompany-Ops/CODEX_POST_0151_WATCH_20260830.md`
- Latest usage-reset guidance: `10_Projects/DexCompany-Ops/CODEX_USAGE_RESET_GUIDANCE_20260831.md`
- Latest rate-limit banner safety evidence: `10_Projects/DexCompany-Ops/CODEX_RATE_LIMIT_BANNER_WATCH_20260831.md`
- Latest worker-host security evidence: `10_Projects/DexCompany-Ops/WORKER_HOST_SECURITY_20260831.md`
- Latest official-surface/allowance evidence: `10_Projects/DexCompany-Ops/CODEX_OFFICIAL_SURFACES_20260830.md`
- Latest Sites/Record & Replay watch evidence: `10_Projects/DexCompany-Ops/CODEX_SITES_RECORD_REPLAY_WATCH_20260831.md`
- Latest Guardian review-evidence watch: `10_Projects/DexCompany-Ops/CODEX_GUARDIAN_REVIEW_EVIDENCE_WATCH_20260831.md`
- Latest Guardian fast-start watch evidence: `10_Projects/DexCompany-Ops/CODEX_GUARDIAN_REPL_FAST_START_WATCH_20260830.md`
- Latest MCP event/Voice lifecycle watch evidence: `10_Projects/DexCompany-Ops/CODEX_MCP_EVENT_VOICE_WATCH_20260901.md`
- Latest paginated-wake/installed-Voice-host watch evidence: `10_Projects/DexCompany-Ops/CODEX_PAGINATED_WAKE_VOICE_HOST_WATCH_20260901.md`
- Latest reconnect/Guardian-policy/realtime-history watch evidence: `10_Projects/DexCompany-Ops/CODEX_RECONNECT_GUARDIAN_REALTIME_WATCH_20260901.md`
- Latest permission-preapproval/Guardian-budget watch evidence: `10_Projects/DexCompany-Ops/CODEX_PERMISSION_PREAPPROVAL_GUARDIAN_BUDGET_WATCH_20260901.md`
- Latest sandbox-diagnostics/Guardian-feedback watch evidence: `10_Projects/DexCompany-Ops/CODEX_SANDBOX_DIAGNOSTICS_GUARDIAN_FEEDBACK_WATCH_20260901.md`
- Latest plugin-reconcile/cost/trace watch evidence: `10_Projects/DexCompany-Ops/CODEX_PLUGIN_COST_TRACE_WATCH_20260901.md`
- Latest turn-provenance analytics watch evidence: `10_Projects/DexCompany-Ops/CODEX_TURN_PROVENANCE_ANALYTICS_WATCH_20260901.md`
- Latest Guardian retention/diagnostics watch evidence: `10_Projects/DexCompany-Ops/CODEX_GUARDIAN_RETENTION_DIAGNOSTICS_WATCH_20260901.md`
- Latest Codex 0.152 stable response: `10_Projects/DexCompany-Ops/CODEX_0152_STABLE_RESPONSE_20260901.md`
- Latest app-link/session/prewarm watch evidence: `10_Projects/DexCompany-Ops/CODEX_APP_LINK_SESSION_PREWARM_WATCH_20260902.md` — Runtime PR #86 / Issue #85, tracked-disabled
- Runtime capability tracking: `config/codex-capability-tracking.json`

The Runtime repository name includes the owner prefix twice because of the initial mobile creation flow. This does not change its role or behavior. Do not create a duplicate repository merely to shorten the name.

## Optional local workspaces

- Previous operations workspace: `D:\\CodexProjects\\codex setup`
- Previous Git Wiki working copy: `D:\\CodexProjects\\codex setup\\dex-company-wiki`

Local paths are optional execution or recovery adapters. They are not Dex Company prerequisites and are not Source of Truth.

## 실행 기준

- 지식, 정책, 프로젝트 상태와 handoff는 `dex-company-wiki`의 `main`을 기준으로 읽고 기록합니다.
- PWA, MCP Gateway, Orchestrator, subscription worker와 Dex-owned distributable plugin source는 Runtime repository에서 관리합니다.
- Codex worker는 `codex app-server --stdio`를 사용하고 설치본의 App Server schema compatibility gate와 authenticated `model/list` readiness를 통과해야 합니다.
- Compatibility floor는 `0.150.0`, 현재 승인 host 권장 stable target은 `0.151.0`입니다. 0.151 dedicated Windows worker의 technical/safety Gate와 Runtime Issue #17은 2026-09-01 PASS/closed됐습니다. Runtime #28 Phase 1은 PR #63, Phase 2는 PR #67, Phase 3 bounded local bridge 구현은 PR #88로 구현·검증됐습니다. #28은 approved Windows-host Phase 3 E2E가 Not Checked이므로 계속 OPEN입니다.
- 공식 stable `0.152.1`은 2026-09-02 확인된 별도 next validation candidate입니다. 0.151 Gate를 소급 무효화하지 않으며 approved-host `doctor -> compatibility -> status`와 관련 회귀검증 PASS 전까지 자동 설치·승격하지 않습니다.
- 승인 Windows host에서는 공식 stable `codex doctor --json`을 Dex `npm run codex:doctor` preflight로 먼저 실행하고, Doctor가 fail이면 compatibility/status로 진행하지 않습니다.
- `0.150.x`가 baseline을 만족하면 core compatibility는 유지할 수 있지만 승인된 recommended stable target보다 낮으면 `upgradeRecommended: true`입니다.
- 모델은 capability class로 라우팅하고 실제 ID는 current `model/list`에서 검증합니다.
- `retirementReady`는 account catalog에 실제 노출된 retired source와 official replacement의 관계로 plan-aware하게 판정합니다.
- 명시/default retired model은 replacement 누락 시 계속 fail-closed합니다.
- Optional capability는 stable support만으로 자동 활성화하지 않고 Runtime tracking config와 linked Issue의 acceptance gate를 통과해야 합니다.
- MCP runtime-status diagnostics는 Dex MCP Gateway health와 별도 authority로 관리합니다.
- Codex task/thread는 GitHub Task Bus를 대체하지 않습니다.
- Interrupt hook, unfinished-turn suspension과 experimental pagination은 별도 승인 전 비활성입니다.
- Read-only Task는 실제 App Server `read-only` sandbox로 실행하며, normal repository mutation은 bounded `workspace-write`만 허용합니다. `danger-full-access`와 invalid sandbox mode는 fail-closed합니다.
- Dedicated worker는 개인 interactive 계정의 GitHub/SSH/Codex credential을 상속하지 않으며 project→realpath registry + SHA-256 pin, profile-local `CODEX_HOME`, output secret scan과 broker-owned Git publication 경계를 유지합니다.
- Codex 0.152.0은 `update_plan` opt-in/default-false, Vim composer search, Guardian compaction authorization/evidence preservation, package-style MCP server names, per-tool MCP output limits와 long `thread/shellCommand` timeout을 stable code line에 포함합니다. Dex는 stable 포함만으로 활성화하지 않고 Runtime #18/#25/#28의 별도 승인 E2E가 PASS할 때까지 기존 Gate를 유지합니다.
- Guardian review evidence와 trusted `request_user_input` answer를 compaction/eviction 뒤 보존하는 변경은 0.152.0 stable 포함이 확인됐지만 Runtime #25에서 승인 host current/retained history user-answer lookup, oversized-image text retention, reviewer history-tool surface, shared transcript collector의 filtering/budget·standalone tool output·recent-tool retention·Node REPL truncation, retained review-history snapshot 기반 synchronous/asynchronous review, rollback evidence removal, reset/new-user-input invalidation까지 회귀검증하기 전 operational dependency로 사용하지 않습니다.
- OpenAI upstream PR #41931의 Guardian message budget 확대(10k→20k total, 2k→5k per message)는 Codex 0.152.0 stable code line 포함이 확인됐습니다. 다만 Runtime #25의 approved-host retention·rollback/reset invalidation·latency/token regression PASS 전에는 operational dependency로 사용하지 않습니다.
- OpenAI upstream PR #41936의 failed Guardian review diagnostic attachment는 Runtime #25에서 watch-only로 추적합니다. log-enabled `feedback/upload`는 approval-sensitive action/history를 포함할 수 있는 explicit data-egress로 취급하며 자동 upload를 금지하고, future stable/approved-host에서 opt-in 범위·bounded fallback·secret/sensitive-context pre-upload review/redaction·UI consent/retention을 검증하기 전 operational dependency로 사용하지 않습니다.
- OpenAI upstream PR #42031의 Guardian retention parity와 PR #42033의 bounded diagnostic bundle 확장은 0.152.0 이후 upstream-main watch-only입니다. Future stable과 approved-host E2E 전 operational dependency로 사용하지 않으며, 진단 업로드는 explicit user initiation과 전체 attachment bundle의 secret/sensitive-context 사전 검토 없이는 금지합니다.
- first Node REPL Guardian fast-start는 0.152.0 stable code line 포함이 확인됐지만 threat model·승인 host 회귀검증 전 `security-watch-disabled`를 유지하고 Browser/Computer Use/full CDP 활성화 근거로 사용하지 않습니다.
- OpenAI가 문서화한 Windows Remote Control과 Browser full CDP는 권한·민감정보 범위가 크므로 security-design gate 전 비활성입니다.
- WSL distribution selection은 기존 WSL이 있는 승인 host에서 측정 근거가 있을 때만 optional optimization으로 평가하며 자동 설치·배포판 생성·기본 전환을 하지 않습니다.
- OpenAI upstream PR #41928의 executor-context permission preapproval은 Runtime #30에서 watch-only로 추적합니다. `exec_command`·`apply_patch`·extension tool의 cross-host/Windows path preapproval, opaque cwd, symbolic tmp/project-root fail-closed와 deny/least-privilege 유지가 future stable/approved-host에서 PASS하기 전 broader filesystem permission을 자동 부여하지 않습니다.
- OpenAI upstream PR #41933의 sandbox diagnostic labels는 Runtime #30에서 watch-only로 추적합니다. configured policy를 일관되게 표시하되 diagnostic metadata를 authorization evidence로 사용하지 않으며, future stable/approved-host에서 missing/materialized root와 deny rule 진단이 actual filesystem authorization과 독립적으로 유지되는지 검증합니다.
- OpenAI upstream PR #41944의 ChatGPT-authenticated turn-cost telemetry는 Runtime #30에서 watch-only로 추적합니다. `codex.turn.cost_microusd`는 advisory observability로만 취급하고 official plan/workspace Usage/Credits와 재검증하기 전 사용자-facing cost/quota authority로 사용하지 않으며 paid API·automatic paid fallback·extra paid usage·credit 구매·banked reset·plan 변경을 자동 승인하지 않습니다.
- OpenAI upstream PR #41946의 extension/skill permission regression은 Runtime #30에서 watch-only로 추적합니다. turn grant expiry, bounded session grant, current filesystem permission, paginated reference snapshot consistency와 Windows approved-host 회귀검증이 stable에서 PASS하기 전 permission boundary를 확대하지 않습니다.
- OpenAI upstream PR #41949의 App Server `plugin/reconcile`은 Runtime #34에서 watch-only로 추적합니다. provider-installed bundle/cache는 canonical source가 아니며 workspace/global isolation, failures, hook refresh, disabled/removal behavior, Git source preservation과 legacy Skill/Plugin non-deletion E2E 전에는 자동 reconciliation/update를 활성화하지 않습니다.
- OpenAI upstream PR #41950의 nested Code Mode/exec tracing은 Runtime #28에서 watch-only로 추적합니다. trace는 optional diagnostic evidence일 뿐 GitHub Task state·Result receipt·idempotency·verifier authority를 대체하지 않으며 raw prompt/tool args/credential/unbounded stdout을 trace/receipt에 보존하지 않습니다.
- OpenAI upstream PR #41953의 curated plugin marketplace Git-source policy enforcement는 0.152.0 release cutoff 이후 merge된 upstream-main 변경이므로 Runtime #34에서 watch-only로 추적합니다. future stable/approved-host에서 catalog discovery·install·cached activation·Skill loading·startup sync의 source allowlist, exact/shorthand/host-pattern rule, bundled/remote/Dex-owned provenance 분리를 검증하기 전 auto-install/update/reconcile이나 Git allowlist 확대를 하지 않습니다.
- OpenAI upstream PR #42003의 `turn_trigger` / `codex_turn_source` analytics는 Runtime #34에서 watch-only로 추적합니다. client/steer/config metadata는 advisory observability일 뿐 Task provenance, authentication, authorization, approval, idempotency, filesystem permission, retry, writer selection, result publication authority가 아니며 future stable/approved-host에서 bounded value·precedence·steer update·absence/failure no-replay E2E가 PASS하기 전 operational dependency로 사용하지 않습니다.
- Codex Sites는 optional hosting/preview surface로만 평가하고 Dex Console PWA·project repository·현재 deployment provider를 canonical authority로 유지합니다. Sites의 deploy/public publish/DNS/production migration/hosted secret 이동은 explicit owner approval 없이 자동 실행하지 않습니다.
- Record & Replay는 approved macOS·Computer Use security gate 전 `security-watch-disabled`입니다. 생성 skill은 canonical Dex Skill이 아니라 candidate input이며 Dex Skill Ingestion·provenance·test·Git review를 통과해야 승격합니다.
- Codex, ChatGPT Work, ChatGPT for Excel, Workspace Agents가 plan에서 제공될 때 shared allowance/credit pool을 사용할 수 있으므로 같은 작업을 중복 실행해 quota를 우회한다고 가정하지 않습니다. Voice에서 시작한 Work/Codex agentic task도 같은 shared pool을 사용하므로 동일 정책을 적용합니다. Task ID와 Accountable Lead는 하나로 유지하고 필요한 worker만 capability에 따라 선택하며, 독립 read 작업만 병렬화하고 동일 mutation scope의 active writer는 항상 하나로 직렬화합니다.
- Banked reset은 자동 사용하지 않고 에던의 명시적 결정 전에는 보존합니다. Provider rate-limit banner는 read-only 안내이며 credit 구매, reset, plan upgrade, paid fallback, 권한 확대 또는 모델 변경의 실행 권한이 아닙니다.
- Work Cloud는 지원되는 web/mobile/desktop 간 cross-device Task intake/status/result surface로 사용할 수 있지만, web/mobile은 로컬 PC 파일을 직접 접근하지 않습니다. 로컬 파일 mutation은 dedicated worker/broker 경계를 유지합니다.
- Codex는 web/mobile의 직접 selectable surface가 아니며, 모바일의 supported Codex chat 접근은 OpenAI Remote surface로 분리합니다. Runtime #34의 모바일 direct submit/status/result는 Chat 또는 Work의 installed Dex plugin 경로로 설계합니다.
- Work scheduled/event-triggered task는 future optional intake adapter로만 취급하고 GitHub Task Bus를 canonical Task authority로 유지합니다. trigger delivery가 Dex idempotency/OAuth/approval/durable-result 규칙을 우회하지 않도록 별도 E2E 전에는 활성화하지 않습니다.
- Upstream MCP event subscription lifecycle은 task runtime unload/replacement 뒤에도 subscription을 유지할 수 있지만 stable 포함과 approved-host/plugin E2E 전까지 watch-only입니다. future event intake는 same-account auth refresh, account/workspace change cancellation, event-server removal cancellation, duplicate/replay/stale-event rejection과 Dex idempotency를 검증하고 event stream을 별도 Task authority로 사용하지 않습니다.
- Voice는 desktop Work/Codex의 optional human intake/coordination surface로만 취급하고 microphone·Screen & Audio Recording·Accessibility 권한을 자동 부여하지 않으며 별도 실행 authority를 만들지 않습니다.
- Upstream native Voice helper/build groundwork는 stable/user-facing contract 전까지 watch-only이며 Cygwin·Visual Studio component·pkgconf·media runtime·microphone permission을 자동 설치/활성화하지 않습니다.
- Upstream Guardian REPL model-metadata policy, local-daemon reconnect recovery, per-call realtime sideband routing, and Core-owned realtime history remain watch-only until stable inclusion and approved-host security/replay/privacy E2E pass; they do not alter Dex approval semantics or GitHub Task Bus authority.
- Dex-owned Skill/Plugin 변경은 Runtime Git source에서 versioning·test·review한 뒤 marketplace를 통해 배포합니다.
- 설치 cache와 개인 local marketplace copy는 canonical source가 아닙니다.
- 로컬 파일이나 CLI 실행이 필요한 작업만 명시적으로 연결된 worker host에서 수행합니다.
- 모바일·태블릿·다른 PC에서는 GitHub와 배포된 PWA/MCP를 통해 같은 상태를 사용합니다.
- Runtime Issue #28은 Phase 1 execution core, Phase 2 PWA/read-only MCP retrieval과 Phase 3 bounded local bridge 구현을 완료했습니다. Approved Windows-host Phase 3 E2E는 Not Checked이며 #28은 계속 OPEN입니다. #34가 Work/mobile submit/status/result, #35가 capability-routed reader/verifier 확대를 추적하며 둘 다 #28 전체 PASS까지 차단됩니다.
- Sites 평가는 Runtime #44, Record & Replay 평가는 Runtime #45에서 추적하며 기존 #28/#34/#35 우선순위를 변경하지 않습니다.
- 설치된 plugin의 모바일 사용은 제품상 가능하지만 현재 계정의 Dex plugin 연결·호출 E2E는 Not Checked입니다.

## 경계

- Wiki에는 지식, 결정, 상태, QA, Task/Result Packet을 둡니다.
- Runtime repository에는 Dex Company 실행 소스, 검증 자동화와 canonical distributable plugin을 둡니다.
- 실제 서비스 프로젝트 코드는 각 프로젝트별 별도 repository에 둡니다.
- Secret, API key, subscription token과 개인 인증정보는 어느 repository에도 저장하지 않습니다.
- OpenAI mainline 기능은 stable App Server schema가 export하고 별도 검증이 끝나기 전까지 Runtime capability로 활성화하지 않습니다.
- Experimental thread history, MCP runtime status의 operational integration과 unfinished-turn suspension은 별도 activation gate 전 비활성입니다.
- Remote Control과 full CDP는 별도 explicit approval·audit·recovery/kill-switch gate 전 자동 활성화하지 않습니다.
- Sites는 public beta이므로 실제 deployment/public sharing/custom domain/DNS/production migration을 standing approval로 자동 실행하지 않습니다.
- Record & Replay를 위해 Computer Use를 자동 활성화하지 않고 recording에는 secret·민감정보를 포함하지 않습니다.
- Work scheduled/event-triggered task, desktop Voice, mobile Remote는 OpenAI-owned optional intake/control surfaces이며 Dex canonical Task/Result state를 대체하지 않습니다.
- Legacy local plugin/skill은 canonical replacement의 approved-host forward test와 unique-content comparison 전에 삭제하지 않습니다.

<!-- DEX_PRESERVED_20260906_END -->
</details>
