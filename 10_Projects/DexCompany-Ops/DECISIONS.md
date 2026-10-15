# DECISIONS

오래 남겨야 하는 프로젝트 결정을 기록합니다.

## 템플릿

### YYYY-MM-DD - 결정 제목

- Context:
- Decision:
- Alternatives:
- Consequences:

### 2026-07-19 - OneDrive Vault를 canonical로 확정

- Context: OneDrive와 VibeProject Vault가 분기되어 최신 지식과 자동화 출력이 서로 다른 위치에 저장됐습니다.
- Decision: `D:\OneDrive\ObsidianVault`를 유일한 canonical Vault로 사용하고 legacy Vault는 advisory deprecated reference로 보존합니다.
- Alternatives: legacy Vault를 다시 canonical로 지정하거나 즉시 삭제하는 방법을 검토했습니다.
- Consequences: 운영 경로와 자동화는 OneDrive로 전환하며, legacy 삭제는 zero-reference 검증 뒤 별도로 결정합니다.

### 2026-08-21 - GitHub main과 Git Vault를 canonical로 전환

- Context: AI 간 공용 지식과 작업 상태를 Git 이력으로 이어받기 위해 OneDrive 단독 canonical 결정의 후속 전환이 필요했습니다.
- Decision: GitHub `ethanhee890-commits/dex-company-wiki`의 `main`과 로컬 `D:\CodexProjects\codex setup\dex-company-wiki`를 단일 운영 기준으로 사용합니다. 이 결정은 위 2026-07-19 OneDrive canonical 결정을 supersede합니다.
- Alternatives: OneDrive를 계속 쓰거나 Git과 OneDrive를 양방향으로 병행하는 방법을 검토했습니다.
- Consequences: 모든 실행 스크립트·자동화·플러그인은 Git Vault를 사용하며, OneDrive/VibeProject Vault는 삭제하지 않고 read-only reference와 검증 백업으로만 보존합니다.

### 2026-07-19 - 최소 활성 프로젝트 네 개 등록

- Context: `10_Projects/`가 비어 있어 세션 간 인수인계가 작동하지 않았습니다.
- Decision: DexCompany-Ops, JiguRadio, JiguRadio-Renewal, MixedWorkspace-Recovery를 우선 등록합니다.
- Alternatives: 모든 최근 폴더를 자동 등록하는 방법을 검토했습니다.
- Consequences: 개인정보 가능성이 있는 CareerOps와 낮은 우선순위 저장소는 자동 등록하지 않습니다.

### 2026-07-19 - LLM Wiki 첫 화면을 capability 중심으로 압축

- Context: index가 139개 wikilink와 다수 역사 출력 링크를 직접 나열해 실제 작업 진입점으로 쓰기 어려웠습니다.
- Decision: source와 output 파일은 보존하고, index에는 capability map, reusable query, 핵심 guide 17개 링크만 둡니다.
- Alternatives: 기존 index를 유지하거나 역사 출력 전용 archive map을 별도로 만들 수 있었습니다.
- Consequences: 검색 가능한 원본은 그대로 남고 context packet 크기가 줄어듭니다. 새 map은 자동으로 `explored: true`로 바꾸지 않습니다.

### 2026-08-11 - 화면설계서를 전역 로컬 스킬로 표준화

- Context: 반복적인 화면설계 요청에서 화면 목록과 정상 흐름만 작성되고 상태, 권한, 반응형, 접근성, 요구사항 추적성이 누락될 위험이 있습니다.
- Decision: `create-screen-spec`을 `$CODEX_HOME/skills`에 전역 설치하고 한국어 Markdown `SCREEN_SPEC.md`를 기본 산출물로 사용합니다. `/기획자` 라우팅에도 연결합니다.
- Alternatives: 프로젝트별 프롬프트만 두거나 처음부터 PPT/Figma 전용 에이전트로 만드는 방법을 검토했습니다.
- Consequences: 모든 프로젝트에서 동일한 완료 게이트와 템플릿을 재사용할 수 있습니다. PPT/Figma 출력은 실제 필요가 확인될 때 별도 산출 모드로 확장합니다.

### 2026-08-11 - 화면설계서 에이전트를 로컬 ChatGPT Work 플러그인으로 배포

- Context: 전역 Codex 스킬만으로는 ChatGPT Work에 스킬과 Obsidian 지식 연결을 함께 전달할 수 없습니다.
- Decision: canonical 코드는 linked workspace에 두고, 개인 `eden-local` marketplace에는 설치용 복사본을 배포하는 `dex-company-work` 플러그인을 사용합니다. 플러그인은 화면설계 스킬과 로컬 stdio MCP를 묶습니다.
- Alternatives: 프로젝트별 프롬프트, 전체 Vault 공유, 공개 HTTPS MCP를 검토했습니다.
- Consequences: 새 Work 세션에서 동일한 화면설계 절차와 Wiki 검색을 사용할 수 있습니다. canonical과 marketplace 복사본을 업데이트할 때 버전·cache를 함께 갱신해야 합니다.

### 2026-08-11 - LLM Wiki connector를 최소 read-only allowlist로 제한

- Context: Vault 전체 공유나 write-capable MCP는 프로젝트 정보·운영 지시·비밀정보 노출과 prompt injection 위험이 큽니다.
- Decision: `index.md`, `wiki/**/*.md`, `sources/**/*.md`만 허용하고 표준 `search`, `fetch` 외 모든 도구를 제외합니다. 경로 입력 대신 opaque ID를 사용하고 Wiki 본문은 증거 데이터로만 취급합니다.
- Alternatives: Obsidian REST 플러그인 설치, generic read_file/list_directory, remote write connector를 검토했습니다.
- Consequences: 프로젝트 노트와 운영 폴더는 노출되지 않으며 원격 write는 불가능합니다. query/audit 자료가 필요하면 별도 보안 검토 후 opt-in해야 합니다.

### 2026-08-11 - 웹 ChatGPT 원격 연결은 별도 보안 결정 전 보류

- Context: 웹 ChatGPT는 로컬 `D:` 경로와 stdio 프로세스에 직접 접근할 수 없고, 원격 MCP를 쓰면 query와 반환 본문이 외부 경계를 통과합니다.
- Decision: 이번 구현은 동일 PC의 ChatGPT/Codex 데스크톱 Work에 한정합니다. 공개 endpoint를 만들지 않습니다.
- Alternatives: HTTPS/OAuth live tunnel, 승인 문서 read-only mirror, OneDrive 공개 공유를 검토했습니다.
- Consequences: 웹 사용 전 인증 도메인, OAuth issuer, 사용자/workspace allowlist, tunnel 또는 mirror, 감사 정책을 에던님이 별도로 결정해야 합니다.

### 2026-08-25 - Codex capability는 설치된 stable App Server schema로 판정

- Context: OpenAI Codex main에는 MCP runtime connection status와 unfinished-turn suspension 같은 기능이 추가됐지만, mainline commit의 존재가 현재 설치된 stable App Server에서 호출 가능하다는 뜻은 아닙니다. Runtime이 버전 추정이나 Core 내부 구현만으로 새 기능을 호출하면 worker가 깨지거나 미검증 handoff를 실행할 위험이 있습니다.
- Decision: Dex Codex worker는 `codex app-server --stdio`를 canonical 인터페이스로 유지하고, 설치된 CLI가 `generate-json-schema`로 내보낸 schema에서 `account/read`, `thread/start`, `turn/start`를 확인한 뒤에만 ready로 판정합니다. MCP `runtimeStatus`와 unfinished-turn suspension은 schema에서 감지돼도 별도 구현·검증 전에는 `enabled: false`로 유지합니다. Deprecated `codex mcp-server`는 Runtime dependency로 사용하지 않습니다.
- Alternatives: Codex 버전 번호 allowlist, OpenAI main commit 기준 자동 활성화, JSON-RPC method를 시험 호출해 성공 여부를 추정하는 방법을 검토했습니다.
- Consequences: Codex 업데이트가 들어와도 baseline 불일치 시 account 연결 전에 fail-closed합니다. 선택 capability는 stable App Server export, Task Packet ownership/idempotency, recovery와 UI 검증을 각각 통과한 별도 branch에서만 활성화합니다. 승인된 local host에서 `npm run codex:compatibility`와 `npm run codex:status`를 실제 실행하는 단계는 남습니다.

### 2026-08-26 - Codex 모델은 authenticated model catalog와 공식 retirement mapping으로 관리

- Context: ChatGPT-managed Codex에서 `gpt-5.4`와 `gpt-5.4-mini`가 2026-08-31 종료되고 각각 Terra와 Luna로 전환됩니다. 저장 설정이나 자동화의 오래된 모델 ID를 단순 문자열 치환하거나 remembered model list에 의존하면 account별 availability와 향후 변경을 검증할 수 없습니다.
- Decision: App Server compatibility baseline에 `model/list`를 포함하고, worker 연결 시 hidden model을 포함한 authenticated catalog를 bounded pagination으로 읽습니다. `gpt-5.4`는 `gpt-5.6-terra`, `gpt-5.4-mini`는 `gpt-5.6-luna`가 catalog에 있을 때만 explicit/default 요청을 migration metadata와 함께 이관합니다. Unknown model, invalid catalog, cursor cycle, missing replacement는 fail-closed합니다.
- Alternatives: Runtime에 Terra를 전역 기본값으로 hard-code, 버전 문자열만 검사, 사용 불가 모델을 임의의 available model로 fallback하는 방법을 검토했습니다.
- Consequences: healthy 5.6 catalog는 server default를 유지하고 model ID drift를 줄입니다. 승인 host에서 `modelCatalog.retirementReady: true`와 `ready: true`를 확인하기 전 worker readiness는 최종 검증되지 않습니다. API key나 paid fallback으로 우회하지 않습니다.

### 2026-08-26 - Dex-owned Skill과 Plugin은 Runtime Git marketplace를 canonical source로 사용

- Context: 기존 standalone `create-screen-spec`과 `dex-company-work@eden-local`은 machine-local source/copy/cache와 local Wiki connector를 전제로 만들었으며, 현재 Dex의 GitHub-first Source of Truth와 shared Runtime MCP architecture보다 이전 구조입니다. 현재 실행 환경에서는 legacy source 파일을 직접 비교할 수 없습니다.
- Decision: Runtime `.agents/plugins/marketplace.json`과 `plugins/dex-company-core`를 canonical distributable source로 사용합니다. `use-dex-company`와 개선된 `create-screen-spec`을 plugin version `1.0.0`으로 관리합니다. Plugin에는 machine path, local knowledge dependency, API credential, private MCP duplicate, `.mcp.json`, `.app.json`을 넣지 않습니다. 기존 local plugin/skill은 approved-host install·fresh-session forward test·unique-content comparison 전까지 삭제하지 않습니다.
- Alternatives: legacy installed cache를 source로 계속 사용, 기존 plugin을 검토 없이 덮어쓰기, shared Dex MCP와 같은 기능의 private local MCP를 새 plugin에 다시 포함, OpenAI Skills API로 업로드하는 방법을 검토했습니다.
- Consequences: Skill/Plugin 변경은 Git source → test → PR → merge → marketplace upgrade → forward test로 배포합니다. OpenAI-managed system Skills는 Dex-owned가 아니므로 복사·수정하지 않습니다. Skills API는 API authentication이 필요해 subscription-first 기본 경로에서 사용하지 않습니다. 2026-08-11의 local plugin canonical 결정은 legacy compatibility history로 남고 이 결정이 후속 운영 방향을 supersede합니다.

### 2026-08-27 - Codex stable capability는 support와 activation을 분리해 추적

- Context: Codex `0.150.0`에서 MCP `runtimeStatus`, task `@` mentions와 `Interrupt` hook이 stable release에 포함됐지만, stable 제공 여부와 Dex Production에서 안전하게 운영할 수 있다는 판단은 동일하지 않습니다. Suspension은 public App Server request가 확인되지 않았고 paginated history는 experimental입니다.
- Decision: Runtime의 tested stable minimum을 `0.150.0`으로 기록하되 version은 upgrade recommendation으로만 사용하고 generated schema를 capability evidence로 유지합니다. MCP `runtimeStatus`는 `supported: true`, `maturity: stable-schema`, `activationState: tracked-disabled`, `enabled: false`로 관리합니다. Task mention은 GitHub Task Bus를 canonical authority로 유지하는 설계 검토 대상으로, `Interrupt`는 security prototype 대상으로 둡니다. Suspension과 pagination은 watch-disabled로 유지합니다. 모든 항목은 Runtime `config/codex-capability-tracking.json`과 Issues #17~#21로 추적합니다.
- Alternatives: 0.150.0 설치만으로 모든 새 기능 자동 활성화, Codex task store를 Task Bus로 병행, Interrupt hook을 즉시 checkpoint script에 연결, experimental pagination을 Production에 켜는 방법을 검토했습니다.
- Consequences: stable 기능을 놓치지 않으면서도 side effect, 이중 Source of Truth와 미검증 recovery를 방지합니다. Approved-host upgrade는 #17, read-only runtime diagnostics는 #18, task mention design은 #19, Interrupt security는 #20, stable suspension/pagination contract는 #21의 acceptance gate를 통과해야 합니다. Gateway health와 worker MCP status는 별도 authority로 표시합니다.

### 2026-08-30 - Provider 업데이트는 사용자 이익 기준으로 상시 최적화

- Context: Codex와 주요 AI 공급자의 업데이트가 잦아지면서 매번 동일한 “Dex에 반영할지” 승인을 반복하면 대응 속도가 느려지고, 반대로 새 기능을 무조건 활성화하면 비용·권한·안정성 위험이 커집니다. 에던은 의미 있는 업데이트마다 Dex Company를 자신에게 더 유리하고 유용하며 효율적인 방향으로 최적화해 달라는 상시 지시를 부여했습니다.
- Decision: `AI_CONTRACT.md` v2.1의 §12.1을 standing approval로 사용합니다. 공식 출처와 최신 Dex `main`을 대조해 이득이 명확하고 위험이 낮은 변경은 `branch → 최소 변경 → 테스트/보안 검사 → PR → 검수 → PASS 시 merge → canonical 상태 갱신`까지 반복 승인 없이 실행합니다. 목적은 안정성, 재작업 감소, 품질, portability, 보안, subscription-first 비용 효율, context/artifact 보존과 Skill/Plugin 호환성 향상입니다. 의미 있는 provider 업데이트마다 Dex-owned Skill/Plugin도 함께 검토하되 실제 이득이나 계약 변화가 있을 때만 version/change를 수행합니다.
- Alternatives: 모든 업데이트를 알림만 하고 수동 승인 후 대응, stable 릴리스의 모든 기능 자동 활성화, 공급자 권장 설정을 그대로 적용하는 방법을 검토했습니다.
- Consequences: deprecated migration, compatibility/diagnostics, fail-closed 보강, 검증 가능한 모델 routing, 보안 hardening, Skill/Plugin 호환성 개선 등 저위험 변경은 자동 대응합니다. prerelease/experimental Production 활성화, paid API·추가 사용량, 권한·OAuth scope·write 확대, 외부 메시지, destructive migration, legacy 삭제, 별도 canonical task authority, 검증되지 않은 side effect 자동화는 standing approval에서 제외하고 Issue/backlog로 추적합니다. 의미 있는 새 개발이 없으면 불필요한 알림을 보내지 않습니다.

### 2026-08-30 - Codex compatibility floor와 recommended stable target을 분리

- Context: Codex `0.151.0` stable은 MCP reliability, permission/sandbox hardening, model fallback 정합성, nested subagent budget accounting을 개선했습니다. 기존 Runtime은 `0.150.0`을 compatibility와 recommendation의 단일 기준으로 사용해 최신 안정화 이점을 권장 상태에 반영하지 못했습니다. 반대로 0.151을 즉시 hard minimum으로 올리면 generated schema baseline을 여전히 만족하는 0.150.x host를 불필요하게 차단할 수 있습니다.
- Decision: Runtime의 compatibility floor는 `0.150.0`으로 유지하고, 신규 설치·승인 host 재검증의 recommended stable target은 `0.151.0`으로 올립니다. Release policy는 `meetsCompatibilityMinimum`과 `meetsRecommendedMinimum`을 별도로 보고하고, 0.150.x stable은 schema baseline을 통과할 수 있으나 `upgradeRecommended: true`를 반환합니다. Generated App Server schema는 계속 capability의 최종 증거이며 optional capability는 자동 활성화하지 않습니다.
- Alternatives: 0.151.0을 즉시 hard minimum으로 강제, 기존 0.150.0 recommendation을 유지, version만으로 capability를 판정하는 방법을 검토했습니다.
- Consequences: 사용자에게 최신 stable의 보안·MCP·안정성 이점을 권장하면서도 기존 검증 가능한 host를 불필요하게 깨뜨리지 않습니다. 실제 0.151 generated schema, subscription, model catalog와 MCP E2E는 Runtime #17/#18에서 확인하고, prerelease·experimental·paid API·권한 확대는 계속 별도 gate에 둡니다.

### 2026-09-01 - Issue #17 zero-change acceptance 기준을 검증 실행 경계로 rebaseline

- Context: Runtime Issue #17의 기존 literal zero-change 문구는 승인 host 검증 과정에서 필요한 Codex 설치, 검토된 PR/main merge, broker publication과 자동 Vercel deployment까지 모두 실패로 해석할 수 있어, 승인된 정상 변경과 비인가 mutation을 구분하지 못했습니다. 반면 dedicated Windows worker 최종 E2E에서는 실제 validation execution 중 Runtime/Wiki repository mutation 0, read-only sandbox, approval deny, broker-only credential boundary와 output secret scan이 모두 PASS했습니다.
- Decision: 에던은 2026-09-01 다음 기준을 명시적으로 승인했습니다. `Validation execution itself must produce zero unreviewed/unapproved mutation outside its disposable or broker-approved workspace. Separately approved prerequisite installation, reviewed PR/merge, broker publication and automatic deployment are allowed when recorded and verified.` 이 기준으로 #17의 controlled prerequisite/approved changes는 FAIL 사유에서 제외하며, 실제 검증 실행 경계의 비인가 mutation 0을 acceptance로 사용합니다.
- Alternatives: 기존 literal zero-change를 유지해 정상적인 승인 설치·PR·배포도 FAIL로 계속 판정하거나, zero-change 항목을 완전히 삭제하는 방법을 검토했습니다.
- Consequences: #17은 technical/safety evidence와 rebaseline 기준을 모두 만족해 최종 PASS/closed입니다. 이후 bounded Unified Task E2E는 Runtime #28이 next critical Gate입니다. 이 rebaseline은 destructive change, 무승인 main mutation, 권한 확대, paid API/fallback, hosted write, `danger-full-access` 또는 검증되지 않은 side effect를 허용하지 않습니다. Codex 0.152.0 승격 검증은 별도 candidate로 유지하며 완료된 0.151 #17 Gate를 소급 무효화하지 않습니다.

### 2026-09-11 - 스킬 수명주기 관리와 정기 점검 실행

- Context: 공식 패키지·과거 설치·대기 개선안·설치본을 함께 추적할 현재 목록이 없었어요.
- Decision: 에던의 실행 요청에 따라 20_Codex_Handoff/DEX_SKILL_REGISTRY.json에 30개 항목을 구분하고 DEX_SKILL_MAINTENANCE.md에 일일 원본/PR 점검과 월요일 신규 발굴을 연결해요.
- Applied: PR23 source 1.1.0 병합, PR97은 1.2.0 후보로 충돌을 정리하되 physical-host Gate 전 draft예요. 자동 설치·legacy 삭제는 수행하지 않았어요.
- Evidence: Tasks/DEX-SKILL-MAINTENANCE-20260911/RESULT.md와 CHECKPOINT.json에 QA·handoff·다음 작업을 기록해요. 기존 8개 운영 스냅샷은 원문 byte 검사로 보호되어 있어 이 스킬 변경 때문에 검사나 과거 스냅샷을 완화하지 않아요. 현재 스킬 상태는 governance/registry와 Runtime manifest로 확인해요.

### 2026-09-19 - ChatGPT Plus는 plan-aware 절약형 Runtime profile로 운영

- Context: Work와 Codex가 ChatGPT plan 사용량을 공유하고 Plus allowance가 Pro보다 작아, 기존 Sol/Astra 중심 자동 라우팅과 중복 verifier context를 그대로 쓰면 Dex의 일상 운영 지속성이 낮아져요. OpenAI 공식 문서는 작은 모델과 최소 prompt/source/MCP context가 사용량을 늘려 준다고 안내하고 Fast mode는 더 많은 사용량을 소비한다고 명시해요.
- Decision: Codex App Server `account/read` 뒤 authenticated `planType`이 Plus로 확인될 때만 `plus-efficient` profile을 선택해 routine=Luna low, standard=Terra medium, complex=Sol medium, critical=Sol high를 사용해요. Astra는 명시적 model+effort 또는 기록된 reasoning-validation-failure checkpoint에만 사용해요. worker는 최소 파일·기존 증거 재사용·결정적 검사 우선을 적용하고, detached verifier는 유지하되 같은 Task 전체를 중복 첨부하지 않아요. Pro·미확인 plan은 기존 balanced profile을 유지해요.
- Alternatives: 모든 plan에 Terra/Luna를 강제, Plus에서도 기존 Sol/Astra만 사용, Fast mode·credit·paid API·extra usage로 한도를 보충, detached verifier를 제거하는 방법을 검토했어요.
- Consequences: Runtime PR #240 main `438c578307c3af77fa9be05fab8fb84879453ed3`에서 적용되고 branch CI Run 973과 Vercel은 PASS예요. subscription-only·자동 유료 fallback 금지·독립 검수 경계는 유지돼요. 실제 Plus worker의 plan 감지·Luna/Terra E2E와 Usage 절감률은 승인 host에서 확인하기 전까지 Not Checked예요. 상세 receipt와 rollback은 `CHATGPT_PLUS_EFFICIENT_PROFILE_20260919.md`를 사용해요.
