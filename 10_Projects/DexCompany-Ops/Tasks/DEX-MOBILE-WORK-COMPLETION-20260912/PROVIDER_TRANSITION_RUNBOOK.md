# 2026-10-02 Provider 전환 Runbook

## 결론

GitHub 승인 main을 계속 유일한 기준으로 두고, Claude/Claude Code와 Gemini는 같은 Task Packet을 읽는 교체 가능한 실행 surface로 사용해요. 회사 계정에는 Dex Wiki 전체를 통째로 열지 않고, 회사 정책과 해당 데이터 제공 범위가 허용된 경우에만 필요한 최소 컨텍스트를 제공해요. 비식별 처리만으로 private 자료의 회사 계정 전송이 자동 승인되지는 않아요.

현재 Runtime main에는 Anthropic subscription adapter가 있지만 Gemini adapter는 없어요. 따라서 2026-10-02 첫날 Claude Code는 Runtime 연동 후보, Gemini는 회사 라이선스와 정책을 확인한 뒤 read-only 분석·독립 검수 후보로 시작해요. 설치, 로그인, 실제 회사 seat, Gemini Runtime 연동은 모두 Not Checked예요.

## 현재 확인값

| 항목 | 상태 | 근거 |
|---|---|---|
| Wiki Source of Truth | PASS | dex-company-wiki 승인 main |
| Runtime Anthropic adapter | PASS | config/providers.json과 workers/anthropic-claude/src/adapter.mjs |
| Anthropic API key 차단 | PASS | Runtime이 ANTHROPIC_API_KEY를 거부하고 subscription auth를 검사해요 |
| Gemini Runtime adapter | Not Checked / 현재 tree에서 미확인 | config/providers.json에는 OpenAI와 Anthropic만 있어요 |
| 회사 Claude seat·로그인 | Not Checked | 실제 회사 계정 확인이 필요해요 |
| 회사 Gemini Code Assist Standard/Enterprise license | Not Checked | 실제 Google 조직 확인이 필요해요 |
| Mac/Windows 실제 설치 | Not Checked | 승인 host에서만 확인해요 |

## 회사 계정 데이터 경계

### 기본 허용

- 공개 정보와 공개 소스
- 공개로 배포된 코드·테스트 또는 별도로 회사 계정 제공이 허용된 최소 자료 (private Dex Runtime 전체는 기본 허용 아님)
- 비식별·비고객 provider-independent 운영 규칙
- 해당 Task의 목표, 제약, acceptance criteria와 공개 evidence
- 민감정보가 제거된 화면설계 템플릿과 일반 스킬

### 작업별 별도 확인

- 고객사 전용 요구사항, 비공개 화면설계서, 회의록과 녹취
- 회사 또는 고객의 미공개 코드·계약·일정·계정 정보
- 이력서, 단가, 면접, 개인 프로젝트의 비공개 자료
- Dex Wiki private 문서 전체 또는 여러 프로젝트를 한 번에 제공하는 작업

회사 정책, 고객 계약, 계정 보존·학습 정책을 확인하고 에던이 해당 Task 범위를 승인한 경우에만 최소 부분을 제공해요.

### 제공 금지

- 비밀번호, API key, access/refresh token, OAuth secret, private/signing key
- GitHub credential, credential store 원문, 환경변수 값
- 개인 주소·건강·금융·가족 정보와 불필요한 식별정보
- 고객 인증정보, 운영 DB 원문, 사용자 개인정보
- ChatGPT 전체 export, 전체 대화 기록, raw reasoning
- 승인되지 않은 녹취·첨부 원본

변수 이름이 존재하는지는 확인할 수 있지만 값은 출력·복사하지 않아요.

## 공통 bootstrap

Runtime은 Node 24.x를 사용해요. 실제 경로는 추측하지 않고 에던이 선택한 절대 경로를 사용해요.

### 기존 환경부터 확인

이미 설치된 도구와 승인된 checkout을 먼저 확인해요. 개인 작업 폴더를 초기화하거나 Wiki 전체를 회사 AI의 작업 폴더로 복제하지 않아요. 실제 경로를 발견한 뒤 기존 작업을 보존하며 진행해요.

~~~text
git --version
node --version
npm --version
git status --porcelain=v1
git rev-parse HEAD
~~~

마지막 두 명령은 확인된 checkout에서만 실행해요. 설치가 없으면 필요한 패키지·고정 버전·공식 지원·비용·회사 정책·복원 방법을 준비해 해당 승인 범위에서만 설치해요. 예시 경로에 새 폴더나 clone을 자동 생성하지 않아요. 기기별 시험은 [전체 개선의 기기 검사](../DEX-PORTABLE-OS-20260912/DEVICE_CHECKS.md)를 사용해요.

환경·credential 검사에서는 값이나 전체 환경을 출력하지 않아요. 승인된 provider의 기존 진단과 Runtime의 subscription-only 검사를 사용해요.

회사 계정과 개인 GitHub 인증은 분리해요. provider 자식 프로세스에 GitHub push credential을 넘기지 않고, 변경은 로컬 task branch와 PR로만 환류해요. 회사 Claude Code는 dex-company-wiki root가 아니라 승인된 최소 Task 작업 폴더에서 시작해요.

## Claude/Claude Code

실행 직전에 Anthropic 공식 설치·인증 문서와 현재 계정에서 지원되는 구독 경로를 확인해요. 기존 설치를 우선하고 새 설치·버전 승격을 준비 상태 확인 없이 자동 실행하지 않아요.

~~~bash
claude --version
claude doctor
claude auth status
~~~

첫 실행에서 Claude account with subscription을 선택하고 회사 Team/Enterprise 또는 승인된 subscription seat를 선택해요. Runtime 확인은 다음 순서예요.

~~~bash
claude auth status
cd ethanhee890-commits-dex-company-runtime
npm ci --ignore-scripts --no-audit --no-fund
npm run claude:status
~~~

예상 증거는 authMethod=claude.ai, apiProvider=firstParty, subscriptionType이 pro/max/team/enterprise 중 하나, apiKeySource 없음이에요. 회사 seat가 usage-based Enterprise인지, 추가 credit·API billing이 가능한지는 Not Checked예요. subscription-first에 맞지 않거나 비용 경계가 불명확하면 fail-closed해요.

공식 근거:

- https://docs.anthropic.com/en/docs/claude-code/getting-started
- https://support.claude.com/en/articles/11845131-use-claude-code-with-your-team-or-enterprise-plan

## Gemini

Gemini의 현재 로그인·license·포함 사용량·회사 조직 정책은 실제 재개 시점에 공식 문서와 해당 계정에서 다시 확인해요. 이 문서의 과거 제품 상태를 실행 승인으로 사용하지 않아요. 확인 전 Gemini CLI는 Not Checked예요.

~~~bash
gemini --version
# 기존 설치가 있고 회사 정책과 해당 계정의 허용 경로가 확인된 경우에만 대화형 로그인을 진행해요.
~~~

회사 조직이 허용한 Google OAuth와 Code Assist license만 사용해요. GEMINI_API_KEY, GOOGLE_API_KEY, Vertex AI billing 경로를 자동 설정하지 않아요. 현재 Dex Runtime에는 Gemini adapter가 확인되지 않았으므로 첫날에는 승인된 최소 폴더의 read-only 분석과 독립 검수에만 사용하고, 결과는 같은 Task ID의 evidence로 기록해요.

공식 근거:

- https://developers.google.com/gemini-code-assist/docs/deprecations/code-assist-individuals
- https://github.com/google-gemini/gemini-cli/blob/main/docs/get-started/index.md

## Provider failover

1. 같은 Task ID와 acceptance criteria를 유지해요.
2. 현재 provider를 안전 checkpoint에서 중지해요.
3. 완료, 미완료, 실제 파일 상태, branch와 commit을 기록해요.
4. 대체 provider의 account, capability, 비용과 데이터 경계를 다시 확인해요.
5. 이미 성공한 mutation은 반복하지 않고 마지막 안전 checkpoint부터 재개해요.
6. 대체 provider 결과를 다른 run 또는 deterministic test로 검수해요.
7. canonical Result 하나만 GitHub에 남겨요.

Claude quota/auth 실패를 Gemini API key로 우회하지 않아요. Gemini adapter가 없을 때 Gemini 결과는 advisory evidence이며 자동 writer 권한을 갖지 않아요.

## Dry-run matrix

| ID | 시나리오 | 성공 조건 |
|---|---|---|
| TR-01 | 최소 Wiki context 읽기 | AI_CONTRACT → CURRENT_STATE → 대상 프로젝트 순서, 원문 변경 0 |
| TR-02 | 비식별 Task 분석 | 금지 데이터 요청·출력 0, confirmed/inference/proposal/unknown 분리 |
| TR-03 | subscription 확인 | API key 이름이 있으면 중지, subscription/license 근거만 PASS |
| TR-04 | read-only repository 설명 | 파일 변경·commit·push 0 |
| TR-05 | disposable one-file branch | 승인된 파일 1개만 변경, main·production 0 |
| TR-06 | failover | 같은 Task ID 유지, 성공한 mutation 재실행 0 |
| TR-07 | quota/auth failure | blocked 상태와 checkpoint 저장, paid fallback 0 |
| TR-08 | customer boundary canary | 비승인 고객/개인 파일을 열지 않고 Not Checked/blocked 처리 |

## 2026-09-20 보존 체크리스트

- [ ] Wiki와 Runtime main SHA, 열린 PR/Issue, Task checkpoint를 기록해요.
- [ ] GitHub에 없는 중요한 첨부·산출물만 별도 보존해요.
- [ ] ChatGPT Project/Library/대화에만 있는 결정은 FACT/POLICY/SKILL/CAPABILITY로 분류해 GitHub에 환류해요.
- [ ] 전체 ChatGPT export를 회사 계정에 업로드하지 않아요.
- [ ] 자동화의 title, id, prompt, schedule, enabled와 quiet window를 민감값 없이 기록해요.
- [ ] 로컬 설치 스킬·plugin은 path, version, content hash만 기록하고 credential은 제외해요.
- [ ] Mac/Windows clone이 main과 일치하고 worktree가 clean인지 확인해요.
- [ ] 2026-09-21~2026-10-01 공백에는 GitHub Task/Result만 갱신하고 provider memory를 기준정보로 쓰지 않아요.

## 2026-10-02 시작 체크리스트

- [ ] 회사 Claude seat와 Claude Code 포함 여부를 확인해요.
- [ ] 회사 Gemini Code Assist Standard/Enterprise license와 조직 정책을 확인해요.
- [ ] Mac/Windows에서 설치·버전·로그인·데이터 경계를 각각 확인해요.
- [ ] provider API key 변수 이름이 있으면 실행을 중지해요.
- [ ] Claude TR-01~TR-04를 먼저 PASS해요.
- [ ] Gemini는 license PASS 뒤 TR-01~TR-04 read-only만 PASS해요.
- [ ] TR-05와 failover는 disposable fixture에서만 실행해요.
- [ ] 결과를 같은 Task ID에 기록하고 GitHub branch/PR로 환류해요.
- [ ] 실제 설치·로그인·지원하지 않은 기능은 Not Checked로 남겨요.

## Rollback

- provider 실행을 중지하고 같은 Task를 blocked 상태로 남겨요.
- disposable worktree와 QA profile만 격리하고 production profile·legacy 설치는 유지해요.
- main을 reset하거나 force push하지 않아요.
- provider adapter 변경은 해당 task branch/PR만 revert해요.
- ChatGPT 종료 전 보존본은 Claude/Gemini 검증이 끝날 때까지 삭제하지 않아요.


## 전체 개선의 의존관계 — 2026-09-12

공통 기능·접근 기기·실행 환경 검증은 [전체 개선 기준](../../../../20_Codex_Handoff/DEVICE_INDEPENDENT_EXECUTION.md)으로 분리해요. #28 Windows 미검증은 다른 검증된 경로의 포괄 선행 조건이 아니에요. 현재 #28 OPEN과 #34/#35 blocked 및 PR #97의 고유 Gate는 실제 증거가 바뀌기 전까지 유지해요. 새 문서 링크는 Wiki PR #179와 함께 통합해요.
