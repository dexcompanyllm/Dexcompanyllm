# PC 실행 패킷

> 전체 개선 Wiki PR #179와 Runtime PR #203을 함께 확인해요. 아래 설치 명령은 즉시 실행 지시가 아니에요. 실제 installed/source revision, 승인 host, 격리 검증과 정확한 rollback을 먼저 확인하고 기존 설치·사용자 작업을 보존해요. PR #203의 source 1.1.1과 PR #97의 1.2.0 후보는 달라요. 설치 직전에 최신 승인 main의 실제 commit과 manifest를 읽고 설치 여부는 별도 증거로 확인해요.

## A. 승인된 공통 스킬 설치 준비

Source와 설치는 별도예요. 과거 Runtime 2ce22c07의 source는 1.1.0이었고 PR #203은 1.1.1이에요. 최신 승인 main의 전체 SHA와 manifest를 먼저 확인하고 그 고정 revision을 설치 대상으로 기록해요. 움직이는 main ref를 과거 버전의 설치 명령으로 사용하지 않아요. 실제 설치는 Not Checked예요.

먼저 현재 host에서 읽기 전용으로 지원 명령을 확인해요.

~~~powershell
codex --version
codex plugin --help
~~~

기존 production profile과 legacy 설치의 path/version/hash, 설치 범위와 정확한 복원 지점을 기록한 뒤, 지원되는 격리 프로필에서 승인된 고정 ref로 marketplace/plugin 설치 명령을 준비해요. 기존 profile을 재사용·초기화하거나 캐시를 직접 편집하지 않아요.

예상 증거:

- 승인 main SHA, manifest version, marketplace resolved commit, installed revision 일치
- 새 Codex 프로세스에서 use-dex-company와 create-screen-spec 발견·대표 호출
- 공통 운영 Skill의 마케팅·리서치·다른 기기/AI 이어하기와 screen-spec 회귀
- API key·paid fallback·권한 확대 0
- 기존 설치·legacy 보존과 시험 profile만 되돌리는 정확한 rollback

## B. PR 97의 1.2.0 후보 격리 검증

검증 ref는 f82b642e31a34d41d23fde65e45d82e0d71a29c7이에요. 실행 직전에 PR 97 head가 같은지 다시 확인하고 다르면 중지해요.

~~~powershell
$QaCodexHome = Join-Path $env:TEMP "dex-pr97-f82b642-qa"
if (Test-Path -LiteralPath $QaCodexHome) { throw "QA profile already exists." }
New-Item -ItemType Directory -Path $QaCodexHome | Out-Null
$env:CODEX_HOME = $QaCodexHome

codex plugin marketplace add ethanhee890-commits/ethanhee890-commits-dex-company-runtime --ref f82b642e31a34d41d23fde65e45d82e0d71a29c7 --json
codex plugin list --marketplace dex-company --available --json
codex plugin add dex-company-core@dex-company --json
~~~

검증:

- manifest 1.2.0과 세 스킬 발견
- create-screen-spec 기존 1.1.0 대표 시나리오 회귀
- explain-system-architecture 긍정 선택
- 일반 함수 설명, 아이콘 SVG, 구현-only, screen-spec 요청의 부정 선택
- 한글·공백 경로
- DTD/entity/script/foreignObject/event handler/link/external resource가 없는 XML
- offline Edge desktop/mobile SVG 렌더, DPI/font
- 입력 root 무변경, 출력 root에 허용 3파일만 생성
- exact-ref 기록과 새 process 재현

종료 시 해당 PowerShell 창을 닫아 production CODEX_HOME으로 돌아가요. QA profile 검증 전 production marketplace upgrade/reconcile을 하지 않아요.

## C. Issue 28 승인 Windows E2E

현재 Runtime main과 실제 설치 경로를 먼저 확인하고 docs/PHASE3_LOCAL_BRIDGE.md와 docs/PHASE3_SAFETY_MATRIX.md를 그대로 사용해요.

필수 시작 순서:

~~~powershell
git status --porcelain=v1
git rev-parse HEAD
# 변경 중인 checkout은 전환·초기화하지 않아요. 별도의 승인된 격리 checkout에서 검증 revision을 준비해요.

npm ci --ignore-scripts --no-audit --no-fund
npm run worker:host-check
npm run codex:doctor
npm run codex:compatibility
npm run codex:status
~~~

worker:host-check가 승인된 전용 DexWorker가 아니면 바로 FAIL로 멈춰요. 개인 계정, 추측 경로, 권한 확대, duplicate worker로 우회하지 않아요.

여섯 기존 시나리오와 P3-PERM/CWD/PROCESS/SCOPE를 모두 실행해요. read-only no-op, one-time one-file approval, deny, offline/resume, timeout/late result, detached verifier, 같은 Task ID의 PWA/status/result, Runtime/Wiki main과 Production mutation 0을 증명해요.

## D. Issue 34 구현 전 test matrix

공통 안전 + 선택한 실행 환경 + 해당 surface·권한 Gate PASS 전에는 아래를 설계 증거로만 사용해요. Windows 전용 검사를 다른 경로의 공통 선행 조건으로 확대하지 않아요. 현재 #34는 blocked이고 이 문서 변경으로 활성화되지 않아요.

| ID | 시나리오 | 기대 결과 |
|---|---|---|
| CAP-01 | web/desktop/mobile에서 plugin visibility 확인 | surface별 supported/unsupported/Not Checked, 추정 금지 |
| CAP-02 | plugin/MCP 미지원 또는 workspace 차단 | PWA deep link, mutation 0, 같은 Task 유지 |
| SUB-01 | direct/indirect submit prompt | submit_task 1회 |
| SUB-02 | 동일 key·동일 payload 10회 | Task 1개, 같은 Task ID/result |
| SUB-03 | 동일 key·다른 payload | conflict, 새 Task·worker 0 |
| AUTH-01 | dex:task:submit scope 없음·만료 | mutation 0, 재로그인/PWA 안내 |
| AUTH-02 | submit scope로 approve/cancel 시도 | 거부, control scope 확대 0 |
| APR-01 | approval pending | commit/push/deploy 0 |
| APR-02 | deny | terminal deny 기록, worker replay 0 |
| OFF-01 | host offline | waiting-for-host, 같은 Task ID로 1회 resume |
| RET-01 | submit response 유실 뒤 retry | idempotency로 Task 1개 |
| RET-02 | callback/result UI 실패 | worker 재실행 0, PWA inbox 회수 |
| RES-01 | PWA/MCP/plugin 조회 | Task ID, statusVersion, receipt hash 일치 |
| RES-02 | stale/out-of-order status | monotonic version으로 거부 |
| RE-01 | 모바일→PC 또는 새 thread 전환 | 기존 목표·제약 재입력 0 |
| DATA-01 | 첨부/고객 파일 | 별도 ingest Gate 전 거부 |

지원 surface capability check는 account/workspace policy, installed plugin visibility, auth/confirmation UI, background/reconnect, PWA fallback을 각각 기록해요.

## E. Runtime PR 194

PR 194는 package-lock.json 한 파일만 바꾸고 hono 4.13.7, qs 6.16.0으로 올려요.

PC 또는 CI에서 확인할 것:

~~~powershell
npm ci --ignore-scripts --no-audit --no-fund
npm run ci
npm run audit:production
npm ls hono qs --omit=dev --all
git diff --check origin/main...HEAD
git diff --name-only origin/main...HEAD
~~~

이전 독립 PR #194의 기대값은 full CI PASS, audit total 0, changed file package-lock.json 1개예요. #203과 결합한 뒤에는 개선 코드·테스트도 포함되므로 전체 결합 CI와 audit을 확인해요. 이미 병합된 보안 변경을 다시 실행·병합하지 않아요. 최신 결과는 전체 개선 MERGE_REVIEW.md를 따라요.

