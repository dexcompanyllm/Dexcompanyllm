# HANDOFF

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
# AI Handoff

- Last updated: 2026-09-02
- Canonical knowledge repository: `ethanhee890-commits/dex-company-wiki`
- Canonical Runtime repository: `ethanhee890-commits/ethanhee890-commits-dex-company-runtime`
- Canonical branch: `main`
- Current Runtime merge: PR #95 `7fa4a5e651aaae3f0c2b40fffa9ec85e3cf7bf65`
- Current Runtime validation: branch `33570034722` PASS; post-merge `main` `33570148285` PASS
- Current Runtime branch/merge Vercel: PASS
- Current Runtime merge-SHA post-merge GitHub Actions: PASS — `33570148285`
- Current Phase 3 implementation baseline: Runtime PR #88 `ae9552aa5cbacf78bb4789ce913142397e2a3968`
- Phase 3 branch validation: `33569106659` — 236 total / 235 PASS / 0 FAIL / 1 Windows-only SKIP
- Current Phase 2 retrieval baseline: Runtime PR #67 `42e8ab4c8b10f69738a38c4e3dfb04139b786b3c`
- Current Phase 1 execution-core baseline: Runtime PR #63 `181ae294fb5f63eb35f524677bd4d89aa6621c3d`
- Current dedicated-host safety baseline: Runtime PR #60 `f0bd377ad6f00288dd8f1ccc45c1eacc619f3b4b`
- Current protocol: `20_Codex_Handoff/UNIFIED_WORKFLOW_PROTOCOL.md`

## Current handoff

### Confirmed

- Runtime repository head PR #95는 Phase 3 provider-watch 증거를 바로잡은 documentation-only correction이며 operational capability activation은 0건입니다.
- Runtime #28 Phase 3 implementation은 PR #88로 병합됐습니다. Atomic one-writer claim, broker-only durable coordination, Task/attempt/hash/deadline binding, explicit one-time approval, whole-run timeout/interrupt, built-in file verification, deterministic Watchdog와 distinct read-only verifier가 구현·검증됐습니다.
- PR #88 branch CI는 235 PASS / 0 FAIL / 1 Windows-only SKIP, audit 0 vulnerabilities이며 branch/merge Vercel은 PASS입니다.
- Runtime #17은 PASS/closed, #28 Phase 1·2는 PASS입니다. 완료된 Gate를 반복하지 않습니다.
- Hosted MCP writes, paid API/fallback, diagnostic upload, `danger-full-access`, multi-writer와 optional capability auto-activation은 비활성입니다.

### Active Gate

1. #28 Phase 3 approved Windows-host Unified Task E2E
2. #28 전체 PASS 뒤 #34 Work/mobile submit/status/result
3. #28 전체 PASS 뒤 #35 bounded capability-routed readers/risk-based verifier
4. Codex 0.152.1과 marketplace/provider watch capability는 별도 stable/host/security Gate 전 비활성

### Resume instruction

Runtime `main`을 승인 Windows host에 동기화한 뒤 `docs/PHASE3_LOCAL_BRIDGE.md`의 Phase 3 matrix만 실행합니다. Offline/resume, read-only no-op, approval pending/deny, explicit one-time one-file mutation, timeout/late-result rejection, detached verifier, same Task ID PWA/read-only MCP retrieval과 operational Runtime/Wiki `main`·Production mutation 0을 증명합니다. #17과 Phase 1·2는 반복하지 않습니다.

## Historical snapshot

> The 2026-08-22 content below is retained as a superseded historical snapshot. Do not use its Runtime SHA or Next actions as current instructions.

- Last updated: 2026-08-22
- Last worker: Jenny / ChatGPT
- Canonical knowledge repository: `ethanhee890-commits/dex-company-wiki`
- Canonical Runtime repository: `ethanhee890-commits/ethanhee890-commits-dex-company-runtime`
- Canonical branch: `main`
- Wiki v2 merge: `90a110851b884f46679bd6f338e64ec0baea1e8f`

## Approved decisions

- Obsidian is not an official Dex Company component.
- `dexcompany.app` PWA is the universal front door.
- One standards-first MCP Gateway serves ChatGPT and Claude.
- Canonical core is provider-independent; provider adapters retain model/tool/surface optimization.
- Subscription-first is mandatory and API automatic billing is prohibited.
- The current Runtime repository name is accepted as canonical despite the duplicated owner prefix; do not create a duplicate repository.

## Completed in the current implementation batch

- Merged the provider-portable Wiki control plane into `main`
- Added canonical `AI_CONTRACT.md`
- Converted OpenAI/Claude/Gemini files to thin adapter entries
- Added provider optimization declarations
- Added platform parity and fallback matrix
- Added PWA product spec and MCP Gateway architecture
- Added subscription-only policy
- Updated README, context, state, overview, decisions and workflow
- Converted Obsidian guide to legacy reference
- Extended Task/Result Packet
- Reconciled legacy Git, LLM Wiki, security, local capability and completion rules in the provider-neutral structure
- Created and populated the private Runtime repository
- Added PWA shell, Orchestrator, MCP Gateway, GitHub Task Store and subscription workers
- Added GitHub Actions CI, static checks, 5 unit tests, server smoke test and dependency audit
- Hardened Codex/Claude workers so API key credentials are not inherited
- Fixed Runtime worker readiness routing
- Merged Runtime PR #1 and PR #2 into Runtime `main`

## Runtime validation

- Latest Runtime merge: `9f5f2c1f42dea982d780ca00dee42cfd4f56bde5`
- Dependency installation in GitHub Actions: PASS
- Static checks: PASS
- Unit tests: PASS — 5/5
- Server smoke test: PASS
- Production dependency audit: PASS at high severity threshold
- Real Codex subscription login: Not Checked
- Real Claude subscription login: Not Checked
- Public/private HTTPS deployment: Not Deployed
- MCP Inspector: Not Checked
- ChatGPT and Claude client connection: Not Connected

## Important constraints

- Do not place PWA/MCP/Orchestrator source in `dex-company-wiki`.
- Do not restore Obsidian as an operational prerequisite.
- Do not delete legacy Vault, `.obsidian/`, Canvas or Wiki Link files without a separate verified cleanup task.
- Do not enable API keys, Claude extra usage or automatic paid fallback.
- Do not claim deployment before HTTPS endpoint and end-to-end tests pass.
- ChatGPT custom MCP platform limitations must always have a PWA fallback.
- Do not place GitHub tokens or provider subscription credentials in GitHub files or client-side code.

## Next actions

1. Choose a private HTTPS preview host and confirm any non-AI hosting cost before purchase.
2. Configure least-privilege GitHub authentication and production MCP authentication/OAuth.
3. Deploy the private PWA and `/mcp` endpoint.
4. Run MCP Inspector and responsive PC/tablet/mobile browser QA.
5. Connect ChatGPT web and Claude Remote MCP, then test read-only project/task flows.
6. Validate Codex ChatGPT-managed login and Claude subscription login on the approved worker host.
7. Enable write flows only after approval, idempotency and audit tests pass.

<!-- DEX_PRESERVED_20260906_END -->
</details>
