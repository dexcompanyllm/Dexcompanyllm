# 개인용 v1 검증·인계

Task: `DEX-PERSONAL-MVP-20260917`

- Runtime: [PR #234](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/pull/234), head `f7812c919c4b6758cf66444d72826b784e99dc40`
- 상태: 구현·독립 검수 후 draft PR / awaiting-approval. 운영 반영 완료가 아니에요.
- 상세 범위: Runtime의 `docs/PERSONAL_WORKSPACE_V1.md`

## 설명 문구

Dex Company는 프로젝트의 목표와 자료, AI 작업의 진행 상태와 결과를 한곳에 기록하고, 다른 AI에서도 같은 작업을 이어갈 수 있도록 돕는 개인 업무 공간이에요.

## 실제 구현과 제한

프로젝트 선택·등록 요청, HTTPS 자료 링크 최대 10개, 목표·완료 기준 접수, 최근 작업의 프로젝트 필터와 canonical 결과 요약, 같은 Task의 인계문 복사·Markdown 다운로드 UI/API를 연결했어요. 등록은 검토 요청이고 승인 main 반영 이후 사용 가능해요. 자료는 링크 참조이며 원문 자동 수집이 아니에요. 인계는 사용자가 전달하는 방식이에요. 팀 자료·권한 분리와 공동 승인은 후속 범위예요.

## PASS

- 전체 Node tests: 345 total / 344 pass / 0 fail / 1 skipped. skip은 실제 Windows child 환경 검사예요.
- static checks: required files 13, JS syntax 75, JSON/dependency/secret scan.
- Runtime smoke, Vercel adapter smoke, production dependency audit (취약점 0개).
- 실제 localhost HTTP + 합성 GitHub 저장소: unauthenticated 401, missing CSRF 403, write disabled 403, invalid source 400, create 201, exact retry 200, changed payload 409, 승인후 등록 요청 receipt 복구 200, 신규 중복 등록 409, handoff no-store.
- PWA DOM harness: 자료·등록 초안 복원, 중복 방지 key 보존, 필터/프로젝트 유지, 닫힌 인계창의 지연 응답 무시.
- 독립 코드 검수: 비밀값 string leaf 누락, canonical result 요약 계약, 프로젝트명, 잠금 만료 경합을 발견·수정했어요. 최종 재검수에서 잔여 blocker가 없었어요.

## FAIL / Not Checked

- 로컬 rollback guard: FAIL. 인증된 shell git clone이 없어 connector로 검증한 source blob을 재구성했으며, 로컬 snapshot에는 실제 recovery tag/history가 없어요. 가짜 tag 생성이나 guard 완화 없이 full-history PR CI에서 확인해요.
- 실제 브라우저·모바일·클립보드·다운로드: Not Checked. agent-browser는 두 번 startup에 실패했고 상세 원인은 unknown이에요. Chromium 다운로드는 502/timeout, Cloud Browser의 localhost 접근은 ERR_BLOCKED_BY_CLIENT로 확인했어요. 정책을 우회하지 않았어요.
- 실제 production 새 기능, 다른 AI에서의 사용, physical PWA 설치·접근성, Windows host E2E: Not Checked.
- 실제 dex-watchdog tool: Not Checked. 독립 read-only review와 결정적 검사를 수행했으며 실제 도구 실행으로 표시하지 않아요.

## 이어가기

1. [Runtime PR CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35152186867)의 최신 head·결과를 확인해요.
2. 접근 가능한 브라우저에서 신규 등록 요청 → 자료 링크 → 작업 접수 → 상태·결과 → 인계문 복사/다운로드를 확인해요. desktop/mobile 폭, 오류·대기·쓰기 불가 상태도 확인해요.
3. AI_CONTRACT §9의 에던 승인 후 main 병합과 운영 배포를 진행해요. 이번 제품 기능은 공급자 업데이트 standing approval 범위가 아니에요.
4. 운영 반영 뒤 실제 OAuth와 작업 receipt를 확인하고 같은 Task의 evidence를 갱신해요.

Rollback은 Runtime PR reviewed revert예요. 기존 Task Issue와 기록은 보존해요. 기존 emergency write gate와 #28/#34/#35 조건을 유지해요.

## 후속 CI 확인 — 2026-09-16 21:27 UTC

Runtime PR #234의 head `f7812c919c4b6758cf66444d72826b784e99dc40`에서 [GitHub Actions run 35152186867](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35152186867)이 success로 완료됐어요. full-history checkout의 rollback guard를 포함한 CI와 dependency audit가 PASS예요. 로컬 history 한계는 원격 CI로 확인했으며 실제 브라우저·운영의 Not Checked 상태는 유지해요.

별도 read-only reviewer가 로컬 변경·신규 12개 파일의 Git blob SHA를 PR head의 원격 파일 SHA와 비교해 12/12 일치를 확인했어요. PR은 draft/open/미병합이에요.

## 자동 인계 보완 — 2026-09-16T22:06:54Z

사용자가 인계문을 수동 복사·다운로드하는 경로 외에 자동 전달을 요청했어요. 같은 Task ID를 유지해 Runtime PR #234를 보완했어요. 앞의 수동 전달 범위 설명은 최초 버전 기록이며, 현재 범위는 이 절을 따라요.

### 구현

- GitHub 같은 Task Issue의 전용 인계 댓글 저장: 대상 AI 선택 → 서버 자동 게시, 별도 Task 생성 없음.
- `list_handoffs`/`get_task_handoff` read-only MCP로 수신 AI가 인계함을 발견하고 최신 목표·자료·완료 기준·상태·결과·승인 main을 조회해요.
- 공통 Skill 1.1.4 소스에 연결 도구 발견·자동 조회·모호한 Task 선택·부분 조회 경고·미해결 실행자 처리를 반영했어요. 실제 설치와 구분해요.
- 요청/Task별 잠금, nonce CAS fencing, 요청 hash와 snapshot hash 분리, 응답 유실/receipt key 유실/POST 전 coordination·CAS 응답 유실 복구를 구현했어요.
- Task별 인계5개/전체댓글80개 경계, 페이지당20개/동시조회4개, 경고·다음페이지·조회한도 표시를 적용했어요.
- 예전 대상 receipt는 superseded/currentTarget을 표시하고, 명시적으로 다시 인계할 때만 새 요청을 만들어요.
- GitHub 저장, 상대 AI 수신 확인, 실제 실행은 서로 다른 상태예요. read 도구는 댓글·승인·실행 소유권·worker를 변경하지 않아요.

### 검증

- head: `d319f5d5eda2b8f83c2d9c0799e66c3847d5d15e`
- 전체 Node 테스트: **355 total / 354 PASS / 0 FAIL / 1 Windows-only skip**.
- static/secret scan, Runtime smoke, Vercel adapter smoke, production audit(취약점0): PASS.
- [동일 head 원격 CI 35155974873](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35155974873): **PASS**, full-history rollback guard 포함.
- 실제 localhost HTTP + 합성 GitHub + MCP 수신 client: 게시→목록발견→같은 Task 최신맥락 조회 PASS. 외부 AI 호출·실제 이메일 전송은 없어요.
- 독립 read-only 코드 검수: 동시 전송, 일부 Task 오류, 오래된 대상, POST 전 장애·CAS 응답유실을 발견·수정하고 최종 잔여 blocker 없음.
- Skill validator 및 독립 수신 행동 시나리오 검수 PASS. 실제 installed Skill 실행으로 표시하지 않아요.
- 실제 Claude/ChatGPT/Gemini 계정 연결·수신, browser/mobile/production, 실행 host: **Not Checked**.

### 결정과 근거

GitHub를 공통 전달함으로 사용해요. 같은 이메일은 다른 AI의 접근 권한을 증명하지 않으므로 이메일 자동 발송은 넣지 않았어요. 이메일은 별도 인증·수신자 확인 뒤 GitHub 링크 알림을 제공하는 후속 후보예요. 개인/고객 자료를 회사 AI 계정으로 자동 공유하는 권한도 추가하지 않아요.

공식 Claude remote MCP/Claude Code 문서에서 연결된 서버 도구 조회 경로를 확인했어요. Gemini 웹 GitHub import는 자동동기화가 아니므로 별도 connected receiver와 동일시하지 않아요. 근거 URL과 정확한 동작·제한은 [자동 인계 계약](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/d319f5d5eda2b8f83c2d9c0799e66c3847d5d15e/docs/AUTOMATIC_HANDOFF.md)에 정리했어요.

### 다음 단계

최신 PR CI와 필요한 브라우저/수신 계정을 검증한 뒤, AI_CONTRACT §9의 main 병합·운영 배포 승인으로 이어가요. 기존 #28/#34/#35·subscription-only·OAuth scope·hosted MCP 쓰기 비활성은 유지해요. 같은 요청/Task를 재작성하거나 이미 저장한 인계를 재실행하지 않아요.

최종 원격 무결성 검수: 독립 reviewer가 Runtime 자동 인계 보완의 로컬 수정12개·신규3개 파일을 원격 head `d319f5d5eda2b8f83c2d9c0799e66c3847d5d15e`의 Git tree와 비교해 **15/15 SHA 일치**, 누락·내용 불일치0개를 확인했어요.


## 사용자 흐름 재검수·인계 인증 수정 — 2026-09-16T22:52:25.744Z

- Runtime 최신 head: `6d96972ec55e82e9c1b3d9e794b47b6cd114840b`
- [사용자 흐름 재검수·미구현 보완안](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/blob/6d96972ec55e82e9c1b3d9e794b47b6cd114840b/docs/PERSONAL_MVP_UX_REVIEW.md)
- 최초 연결부터 결과 수정·재방문·AI 인계까지 11단계를 소스와 두 독립 검수로 확인했어요. 기준은 목표 달성 단절 여부와 사용자 입력·선택·기억·반복 감소예요.
- 여섯 보완안: 결과 이해·수정, 막힌 이유·다음 행동, 자료 읽기·재사용, 최초 AI 연결·이어가기, 작업 찾기, 입력 축소. 모두 **미구현 제안**이에요. 기존 역할 자동·중복 방지·동일 탭 초안 복원은 재구현하지 않아요.
- 확인된 결함: 실제 PWA handoff POST가 서버가 요구하는 CSRF와 기존 legacy admin header를 전달하지 않았어요. 기존 HTTP test는 직접 header를 주고 PWA harness는 검사하지 않아 이전 PASS로 실제 버튼 경로를 보장하지 못했어요.
- 변경: 현재 session CSRF와 이미 설정된 비상 쓰기 header를 전달해요. 서버의 권한 검증·scope·write flag를 유지하고 service worker cache는 v8로 갱신했어요.
- 회귀: 수정 전 새 UI test **FAIL**, 수정 후 관련 **24/24 PASS**. 세션 변경 후 새 CSRF·동일 idempotency key 유지·legacy header를 확인했어요. 별도 localhost HTTP auth 검사를 유지해요.
- 최신 전체 검사: **356 total / 355 PASS / 0 FAIL / 1 Windows-only skip**, static/syntax/secret PASS.
- [동일 head CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35159646376): **PASS**, smoke·Vercel adapter·full-history rollback guard·production audit 포함.
- 독립 코드 검수 및 보고서 정확성 검수: **PASS**, 잔여 blocker 없음. 전제/미구현/미확인 구분을 확인했어요.
- 공개 무결성: 변경·신규7개 local blob과 원격 Git tree **7/7 일치**.
- 실제 화면 캡처·모바일·provider 수신·운영: **Not Checked**. 스크린샷 기반 visual audit 완료를 주장하지 않아요.
- main 병합·배포·worker 활성화·새 권한·이메일 전송은 하지 않았어요. 같은 Task와 기존 PR을 유지해요.


## 승인 검수·main 병합 — 2026-09-18 KST

이 절이 위 역사적 awaiting-approval 상태를 대체해요. 원래 Task와 이전 검증 기록은 보존해요.

- 승인: 에던의 `PR #234 검수 후 병합 승인`.
- 최신 main `ddcb0dd5858a800659468e954b5e6d77a1b641cd`의 추가 실험 기록 13개와 PR 변경 19개는 서로 겹치지 않았어요. 실제 GitHub API에서 clean merge를 확인했어요. 연결 도구의 초기 normalized mergeable=false는 원본 응답으로 교차 확인했어요.
- 통합 검수 head `9cece557cf82803b24cfb00edb249ab7b6a0d130`; 병합 commit `d173ae3f6ae045013be3b2131eed5f09af5e2a3c`, mergedAt `2026-09-17T22:03:59Z`.
- PASS: 전체 356개 중 355 PASS, 0 FAIL, 1 Windows-only SKIP. 정적·secret·스킬 validator·Runtime smoke·Vercel adapter smoke PASS.
- PASS: 독립 read-only 검수에서 권한·CSRF·동시성·nonce fencing·응답/receipt 유실·최신 Task 조회·MCP 무변이를 확인했고 병합 blocker가 없었어요. 핵심 테스트 14/14 PASS.
- PASS: 로컬 검수본과 원격 통합 head의 변경 19개 Git blob SHA 일치. 최신 main의 비관련 실험 기록도 보존했어요.
- PASS: [통합 PR CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35280003233), [통합 push CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35279997693), [병합 후 main CI](https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/actions/runs/35280097247). Full-history rollback guard 및 production dependency audit 0 vulnerabilities 포함.
- 공식 공통 패키지 **1.1.4**. `use-dex-company` 수신 규칙 반영, `create-screen-spec` 내용은 동일해요. Registry와 maintenance checkpoint를 함께 갱신해요.
- 별도 수동 배포·설정 변경은 하지 않았어요. 기존 Vercel Git 연동 배포는 상태만 조회해요. 운영 기능·실제 provider 수신/설치·모바일/브라우저·Windows host는 **Not Checked**예요.
- 요금·OAuth scope·hosted MCP write·worker 활성화·이메일·레거시 삭제·#28/#34/#35 변경 없음. 여섯 UX 보완안은 미구현 제안으로 유지해요.

다음: 같은 Task에서 실제 연결·설치·수신과 기기별 동작을 검증해요. 소스 병합을 위해 에던에게 추가 승인이나 원래 요청 재입력을 요구하지 않아요. Rollback은 이 PR의 reviewed revert이며 기존 Task/인계 댓글을 삭제하지 않아요.

병합 후 추가 확인: merge commit의 Git tree는 검수한 통합 tree `e60146a01ffae52703240fd32a80b9bc8a409b69`와 동일해요. [해당 커밋 Vercel 상태](https://vercel.com/ethans-projects-48dfc173/dex-company-runtime/BnBEdLrnsMLMVuVoW1p3KvgXoK3e)는 success예요. 이는 기존 Git 연동 상태 확인이며 실제 인증된 운영 기능이나 다른 AI 수신 테스트를 대신하지 않아요.
