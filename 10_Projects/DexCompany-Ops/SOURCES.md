# SOURCES

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
﻿# SOURCES

이 프로젝트 판단에 사용한 중요한 출처를 기록합니다.

## Source List

| Date | Source | 왜 중요한가 |
|---|---|---|
| 2026-09-02 | [Runtime PR #95](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/95), merge `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65` | 최신 Runtime repository head와 Phase 3 provider-watch concurrency evidence correction; implementation/config/capability activation 0건의 근거 |
| 2026-09-02 | [Runtime validation 33570034722](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33570034722), PR #95 branch/merge Vercel | PR #95 branch validation과 Vercel PASS 근거 |
| 2026-09-02 | [Runtime post-merge validation 33570148285](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33570148285) | PR #95 merge-SHA `main` validation PASS 근거 |
| 2026-09-02 | [Runtime PR #94](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/94), merge `206fee6b53a45d6a34784fecf1d9be17fabdbff1` | PR #94 당시 Runtime repository head와 App Server thread model-metadata watch-only 범위, Phase 3 baseline 불변의 근거 |
| 2026-09-02 | [Runtime validation 33569752219](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33569752219), PR #94 branch/merge Vercel | PR #94 당시 head branch validation과 Vercel PASS 근거; merge-SHA Actions는 Not Checked |
| 2026-09-02 | [Runtime PR #92](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/92), merge `5048ca8b92b1c31f012fc8d3efaedce15e2d946c` | PR #92 당시 Runtime repository head와 remote marketplace watch-only 범위, operational capability activation 0건의 근거 |
| 2026-09-02 | [Runtime validation 33569258684](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33569258684), PR #92 branch/merge Vercel | PR #92 당시 repository-head branch validation과 Vercel PASS 근거; merge-SHA Actions는 Not Checked |
| 2026-09-02 | [Runtime PR #88](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/88), merge `ae9552aa5cbacf78bb4789ce913142397e2a3968` | #28 Phase 3 bounded local broker↔dedicated-worker implementation baseline |
| 2026-09-02 | [Runtime validation 33569106659](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33569106659), PR #88 branch/merge Vercel | 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP, audit 0 vulnerabilities와 Vercel PASS 근거 |
| 2026-09-02 | [Issue #28 implementation checkpoint](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28#issuecomment-5501642642), [Phase 3 runbook](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/main/docs/PHASE3_LOCAL_BRIDGE.md) | Implementation merged와 approved Windows-host E2E Not Checked, #28 OPEN 유지와 exact next gate 근거 |
| 2026-09-02 | [Runtime PR #86](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/86), merge `70eebc56b71210c3960105afc0167b1f5984b30a` | 최신 Runtime repository head와 app-link/session/prewarm watch-only 문서 범위, operational capability activation 0건의 근거 |
| 2026-09-02 | [Runtime validation 33561571348](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33561571348), PR #86 branch/merge Vercel status | branch validation과 Vercel PASS 근거; merge-SHA post-merge Actions는 Not Checked |
| 2026-09-02 | [Wiki PR #72](https://github.com/ethanhee890-commits/dex-company-wiki/pull/72), `10_Projects/DexCompany-Ops/CODEX_APP_LINK_SESSION_PREWARM_WATCH_20260902.md` | PR #86/Issue #85 watch evidence, tracked-disabled 경계와 #28 Phase 3 우선순위 유지 근거 |
| 2026-09-02 | [Runtime Issue #28](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28), [Wiki Issue #55](https://github.com/ethanhee890-commits/dex-company-wiki/issues/55) | Phase 2 PR #67 / Phase 1 PR #63 / dedicated-host PR #60 실행 기준, Phase 3 active next와 문서 포인터 동기화 범위 |
| 2026-09-01 | [Runtime PR #67](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/67), merge `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c` | #28 Phase 2 PWA/read-only MCP canonical Task status-result retrieval 실행 기준 근거 |
| 2026-09-01 | [Runtime validation 33509769758](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33509769758), PR #67 branch/merge Vercel status | 215 total / 214 PASS / 0 FAIL / 1 Windows-only SKIP, 정적·secret·smoke·audit와 Vercel PASS 근거; merge-SHA post-merge Actions는 Not Checked |
| 2026-09-01 | [Runtime Issue #28 Phase-2 evidence](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28#issuecomment-5494209909) | #28 Phase 1·2 PASS, Phase 3 active next와 acceptance checklist 교정 근거 |
| 2026-09-01 | [Runtime PR #65](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/65), merge `2edcd406e50b5be42206de10230c4753f3ae96f3` | Guardian retention/diagnostics watch-only 변경의 이전 Runtime head 근거 |
| 2026-09-01 | [Runtime validation 33504049198](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33504049198), PR #65 merge Vercel status | PR #65 branch validation PASS와 merge Vercel PASS 근거; merge-SHA post-merge Actions는 Not Checked |
| 2026-09-01 | [Runtime PR #63](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/63), merge `181ae294fb5f63eb35f524677bd4d89aa6621c3d`, [Issue #28 Phase-1 evidence](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/28#issuecomment-5490499202) | #28 Phase 1 bounded Task execution core 구현·검증과 Phase 2→3 순서 |
| 2026-09-01 | [Runtime validations 33476870379](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33476870379), [33477009626](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33477009626) | PR #63 validation PASS 근거 |
| 2026-09-01 | [Runtime Issue #17](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/17), `10_Projects/DexCompany-Ops/ISSUE17_ZERO_CHANGE_REBASELINE_20260901.md` | Owner-approved rebaseline과 #17 PASS/closed 근거 |
| 2026-09-01 | `10_Projects/DexCompany-Ops/CODEX_GUARDIAN_RETENTION_DIAGNOSTICS_WATCH_20260901.md` | PR #41931 stable classification 교정과 #42031/#42033 post-0.152 watch-only 보안 경계 |
| 2026-09-01 | [Runtime PR #52](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/52), merge `2ac45ceb907e70a6e6b72d617d9c9105052ae460` | paginated empty-wake·installed Voice host watch-only 변경과 최신 Runtime 기준 |
| 2026-09-01 | [Runtime validation 33436716816](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33436716816), [post-merge 33436796747](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/33436796747) | PR #52 branch와 merge `main`의 정적·테스트·smoke·rollback·audit PASS 근거 |
| 2026-08-31 | [Runtime Issue #17 latest host-security verdict](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/17#issuecomment-5474251964) | 기능 PASS_WITH_WARNINGS, interactive identity FAIL, implementation/CI PASS와 actual host E2E Not Checked 구분 |
| 2026-08-31 | [Runtime PR #42](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/42), [PR #43](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/43) | dedicated-account·credential preflight, realpath registry, SHA pin, profile-local CODEX_HOME, result secret scan 구현 근거 |
| 2026-08-31 | [Runtime PR #46](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/46)–[#51](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/51) | Sites·Record & Replay·Guardian review-evidence·MCP event·native Voice watch-only 추적 |
| 2026-08-31 | [OpenAI Docs — Codex pricing and usage](https://learn.chatgpt.com/docs/pricing) | banked reset·shared usage·credit가 변동 가능한 계정/플랜 정책임을 재검증하는 공식 기준 |
| 2026-08-31 | `10_Projects/DexCompany-Ops/WORKER_HOST_SECURITY_20260831.md` | dedicated worker 실제 E2E 절차와 fail-closed 경계 |
| 2026-08-31 | `10_Projects/DexCompany-Ops/CODEX_USAGE_RESET_GUIDANCE_20260831.md`, `CODEX_RATE_LIMIT_BANNER_WATCH_20260831.md` | banked reset 자동 사용 금지와 banner read-only 권한 경계 |

| 2026-07-19 | `70_Outputs/DexCompanyMigration/2026-07-19-234213-vault-merge.md` | 비파괴 Vault 병합 수량과 복구 경로 |
| 2026-07-19 | `20_Codex_Handoff/ONEDRIVE_SYNC_GUIDE.md` | canonical Vault 결정과 legacy 운영 경계 |
| 2026-07-19 | `D:\CodexProjects\codex setup\obsidian-codex-setup\merge-dex-vault.ps1` | 재실행 가능한 dry-run/apply 병합 도구 |
| 2026-07-19 | `30_Knowledge/LLM_Wiki/queries/2026-07-19-dex-company-current-learning-and-action-playbook.md` | 현재 학습 수준과 실행 가능한 작업을 연결한 재사용 답변 |
| 2026-07-19 | `30_Knowledge/LLM_Wiki/wiki/maps/Dex Company Operating Capability Map.md` | 운영 지식의 작업별 진입점 |
| 2026-07-19 | `30_Knowledge/LLM_Wiki/audit/2026-07-19-llm-wiki-audit.md` | 200개 노트의 v5, unexplored, Bias Check, stale 상태 |
| 2026-07-20 | `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260720-000132.md` | free RAM 실패와 나머지 자동화 사전점검 통과 근거 |
| 2026-07-19 | `70_Outputs/DexCompanyAudit/2026-07-19-dex-company-canonical-migration-watchdog.md` | 최종 독립 QA와 self-audit 판정 |
| 2026-08-11 | `D:\Program Files\Codex\skills\.system\skill-creator\SKILL.md` | Codex 스킬 구조, 초기화, metadata, validation 기준 |
| 2026-08-11 | `D:\Program Files\Codex\skills\.system\skill-creator\references\openai_yaml.md` | `agents/openai.yaml` UI metadata 제약 |
| 2026-08-11 | `D:\Program Files\Codex\skills\create-screen-spec\SKILL.md` | 화면설계서 에이전트의 실제 작업 계약 |
| 2026-08-11 | [OpenAI Plugins concepts](https://developers.openai.com/plugins/concepts/plugins) | ChatGPT와 Codex에서 스킬과 MCP를 함께 배포하는 공식 plugin 모델 |
| 2026-08-11 | [OpenAI Build plugins](https://developers.openai.com/plugins/build/plugins) | `.codex-plugin/plugin.json`, `.mcp.json`, local marketplace 패키징 계약 |
| 2026-08-11 | [OpenAI Build an MCP server](https://developers.openai.com/plugins/build/mcp-server) | 공식 MCP SDK, tool annotation, transport 구현 기준 |
| 2026-08-11 | [OpenAI Connect from ChatGPT](https://developers.openai.com/plugins/deploy/connect-chatgpt) | 로컬 데스크톱과 웹 HTTPS/Secure MCP 연결 경계 |
| 2026-08-11 | [OpenAI MCP and Connectors](https://developers.openai.com/api/docs/mcp) | company knowledge용 표준 read-only `search`/`fetch` 응답 계약과 보안 주의 |
| 2026-08-11 | `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md` | LLM Wiki index/source/wiki 읽기 순서와 source-backed 답변 원칙 |
| 2026-08-11 | `20_Codex_Handoff/LLM_WIKI_VERIFICATION_SCHEMA.md` | claimType, evidenceScope, verificationStatus 등 메타데이터 해석 기준 |
| 2026-08-11 | `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-mcp-security-best-practices.md` | 최소 권한, prompt injection, secret·tool surface 보안 근거 |
| 2026-08-11 | `D:\CodexProjects\codex setup\plugins\dex-company-work` | 실제 플러그인, 테스트, lockfile, MCP 구현 source of truth |
| 2026-08-12 | 에던님 요청 `@dex-company-work` 모바일 앱 로그인 화면설계 | 네이버·카카오톡·Google, 상세 정책, 사용자 여정 flow chart의 확정 요구 |
| 2026-08-12 | `10_Projects/DexCompany-Ops/SCREEN_SPEC.md` | 이번 forward test의 화면·흐름·정책·수용 기준 source of truth |
| 2026-08-12 | [Android Sign in with Google](https://developer.android.com/identity/sign-in/credential-manager-siwg) | Android Credential Manager와 지속 노출 Google 로그인 버튼 기준 |
| 2026-08-12 | [Google Sign-In for iOS](https://developers.google.com/identity/sign-in/ios/start-integrating) | iOS Google 로그인·callback·backend client 기준 |
| 2026-08-12 | [Google ID token 서버 검증](https://developers.google.com/identity/gsi/web/guides/verify-google-id-token) | token 검증과 `sub` 식별자 사용 근거 |
| 2026-08-12 | [카카오 로그인 Android](https://developers.kakao.com/docs/ko/kakaologin/android), [iOS](https://developers.kakao.com/docs/ko/kakaologin/ios), [REST](https://developers.kakao.com/docs/ko/kakaologin/rest-api) | 카카오톡 우선·계정 fallback·취소·동의·state/nonce 근거 |
| 2026-08-12 | [네이버 로그인 iOS](https://developers.naver.com/docs/login/ios/) | 네이버 앱 우선·브라우저 fallback·callback·로그아웃·연동 해제 근거 |
| 2026-08-12 | [Apple App Review Guidelines](https://developer.apple.com/app-store/review/guidelines/) | 제3자 로그인 서비스와 계정 삭제의 iOS 출시 게이트 |
| 2026-08-12 | [Apple 접근성 HIG](https://developer.apple.com/design/human-interface-guidelines/accessibility), [Android 접근성](https://developer.android.com/guide/topics/ui/accessibility/views/apps-views) | 최소 터치 영역과 접근성 설계 기준 |
| 2026-08-12 | [개인정보 보호법 제15조](https://www.law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1029335387), [제30조](https://law.go.kr/lsLinkCommonInfo.do?chrClsCd=010202&lsJoLnkSeq=1020398435) | 개인정보 수집·이용 적법 근거와 처리방침 공개의 구분 |
| 2026-08-25 | `openai/codex` tag `rust-v0.149.1`, `codex-rs/app-server/README.md` | 설치된 Codex 버전별 App Server JSON Schema 생성 명령과 JSON-RPC lifecycle의 공식 기준 |
| 2026-08-25 | `openai/codex@rust-v0.149.1`, `codex-rs/app-server-protocol/schema/json/v2/ListMcpServerStatusResponse.json` | stable schema에 MCP `runtimeStatus`가 없다는 직접 근거 |
| 2026-08-25 | `openai/codex@rust-v0.149.1`, `codex-rs/protocol/src/turn_input.rs` | stable에서 unfinished-turn suspension이 App Server request로 export됐다고 볼 수 없다는 근거 |
| 2026-08-25 | `openai/codex` commit `343074d4207d572809bd8cea15f4be1d09d98e0b` | mainline MCP runtime connection status 기능의 원본 변경 |
| 2026-08-25 | `openai/codex` commit `4f39251a010a8bd7d692d25fb33832ff06f1635a` | mainline unfinished root turn suspension Core 기능의 원본 변경 |
| 2026-08-25 | Runtime PR #14, merge `10013ee530431a03257d81ae00d50cb1be3beb2b` | Dex Runtime provider integrations와 schema-driven compatibility gate의 승인·병합 근거 |
| 2026-08-25 | Runtime GitHub Actions run `32788889580` | merge commit의 static checks, 147 tests, smoke, rollback, audit 재검증 근거 |
| 2026-08-25 | Runtime merge commit status `10013ee530431a03257d81ae00d50cb1be3beb2b` | Vercel deployment `success`와 `Deployment has completed` 상태 근거 |
| 2026-08-26 | [OpenAI Codex plans and model retirement](https://help.openai.com/en/articles/11369540) | ChatGPT-managed Codex의 2026-08-31 GPT-5.4→Terra, GPT-5.4 mini→Luna 전환과 saved/default/managed/automation 업데이트 근거 |
| 2026-08-26 | `openai/codex@rust-v0.149.1`, `codex-rs/app-server-protocol/schema/json/ClientRequest.json` | stable App Server baseline에 `model/list`가 포함된 직접 근거 |
| 2026-08-26 | `openai/codex@rust-v0.149.1`, `codex-rs/app-server-protocol/schema/json/v2/ModelListParams.json`, `ModelListResponse.json` | authenticated model catalog의 cursor, hidden model, default와 capability 응답 계약 |
| 2026-08-26 | `openai/codex@rust-v0.149.1`, `codex-rs/app-server/README.md` | `thread/turns/list`, `thread/items/list`가 experimental API이고 `experimentalApi: true`가 필요하다는 공식 기준 |
| 2026-08-26 | `openai/codex@rust-v0.149.1`, `codex-rs/skills/src/assets/samples/plugin-creator/references/plugin-json-spec.md` | repo marketplace, `.codex-plugin/plugin.json`, Skill/MCP/App packaging 공식 계약 |
| 2026-08-26 | `openai/codex@rust-v0.149.1`, `codex-rs/cli/src/marketplace_cmd.rs`, `plugin_cmd.rs` | GitHub marketplace add/upgrade와 plugin add/remove 명령의 공식 CLI 근거 |
| 2026-08-26 | Runtime PR #15, merge `71e75422d9318ea3195f21a6c0df57f93482944c` | model catalog retirement 대응과 Git-backed `dex-company-core` canonical package의 승인·병합 근거 |
| 2026-08-26 | Runtime GitHub Actions run `32911751171` | static checks, 163 tests, smoke, rollback와 production dependency audit 재검증 근거 |
| 2026-08-26 | Runtime merge commit Vercel status `71e75422d9318ea3195f21a6c0df57f93482944c` | Vercel `success`, `Deployment has completed` 상태 근거 |
| 2026-08-27 | [OpenAI Codex changelog](https://developers.openai.com/codex/changelog) | stable `0.150.0`, task `@` mentions, `Interrupt` hook와 관련 보안 개선의 공식 릴리스 근거 |
| 2026-08-27 | [Codex 0.150.0 stable release](https://github.com/openai/codex/releases/tag/rust-v0.150.0) | 최신 stable tag, published timestamp와 release boundary |
| 2026-08-27 | `openai/codex@rust-v0.150.0`, `codex-rs/app-server-protocol/schema/json/v2/ListMcpServerStatusResponse.json` | MCP `runtimeStatus`와 7개 connection state가 stable schema에 포함된 직접 근거 |
| 2026-08-27 | `openai/codex@rust-v0.150.0`, `codex-rs/config/src/hook_config.rs` | `Interrupt` event와 command/MCP hook handler가 stable source에 포함된 직접 근거 |
| 2026-08-27 | [OpenAI Codex App Server](https://developers.openai.com/codex/app-server) | paginated thread APIs의 experimental maturity와 App Server integration 기준 |
| 2026-08-27 | Runtime Issues #17–#21 | approved-host upgrade, runtime-status diagnostics, task mention, Interrupt와 stable contract 추적 근거 |
| 2026-08-27 | Runtime PR #22, merge `b156bc6cc2dec8963e1f43d5e066c11fda8ee84d` | Codex 0.150 release policy와 capability tracking implementation의 승인·병합 근거 |
| 2026-08-27 | Runtime GitHub Actions run `33022962598` | 40 syntax checks, 171 tests, smoke, rollback와 dependency audit 0 vulnerabilities 근거 |
| 2026-08-27 | Runtime merge commit status `b156bc6cc2dec8963e1f43d5e066c11fda8ee84d` | Vercel deployment success 근거 |
| 2026-08-30 | [OpenAI Plugins](https://learn.chatgpt.com/docs/plugins) | 설치된 plugin의 Skill·connector·MCP tool과 Chat/Work web·desktop·mobile 지원 범위 |
| 2026-08-30 | [OpenAI MCP](https://learn.chatgpt.com/docs/extend/mcp) | hosted ChatGPT Work의 remote MCP plugin 경로와 local Codex MCP 경계 |
| 2026-08-30 | [Package your plugin](https://developers.openai.com/plugins/build/plugins) | `.app.json` registered MCP connection과 `.mcp.json` packaging 계약 |
| 2026-08-30 | [Connect and test your plugin](https://developers.openai.com/plugins/deploy/connect-chatgpt) | HTTPS·auth·schema·confirmation·positive/negative prompt E2E 기준 |
| 2026-08-30 | [OpenAI Long-running work](https://learn.chatgpt.com/docs/long-running-work) | 독립 작업 병렬화와 동일 connected source 동시 write 회피 근거 |
| 2026-08-30 | [OpenAI Plugin guidelines](https://developers.openai.com/plugins/app-guidelines) | read/write/destructive/open-world annotation과 retry side-effect 계약 |
| 2026-08-30 | Runtime PR #27 merge `5c3770549ad29fb56d9504c280456e0921d3e2f6`, runs `33317627474`·`33317754565` | worker child-environment isolation의 최신-main·post-merge 검증 근거 |
| 2026-08-30 | Runtime PR #33 merge `44d99df4b05ece108bd87aa6db9cfe4de566eca8`, run `33318160221` | accountable multi-worker policy config·test·docs 검증 근거 |
| 2026-08-30 | Runtime Issues #17·#18·#28·#34·#35 | 승인 host, diagnostics, first Unified Task E2E, Work/mobile flow와 worker 확대 Gate |

<!-- DEX_PRESERVED_20260906_END -->
</details>
