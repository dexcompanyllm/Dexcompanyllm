# Decision Log

Dex Company 전체에 영향을 주는 주요 결정만 기록합니다. 프로젝트 전용 결정은 각 프로젝트 폴더에서 관리할 수 있습니다.

## DEC-001 — GitHub를 Source of Truth로 사용
- Date: 2026-08-21
- Status: Approved

### Decision
Dex Company의 LLM Wiki와 AI 협업에서 GitHub `main`의 최신 상태를 단일 기준정보(Source of Truth)로 사용합니다.

### Reason
ChatGPT, Codex, Obsidian 등 서로 다른 도구 사이에서 작업 상태를 일관되게 공유하고 변경 이력과 복구 가능성을 확보하기 위함입니다.

---

## DEC-002 — Wiki와 코드 저장소 분리
- Date: 2026-08-21
- Status: Approved

### Decision
`dex-company-wiki`에는 지식과 프로젝트 컨텍스트를 저장하고, 실제 애플리케이션 소스코드는 프로젝트별 별도 repository에서 관리합니다.

### Reason
지식관리와 소스코드 버전관리의 책임을 분리하고 Wiki가 코드 자산 때문에 복잡해지는 것을 방지하기 위함입니다.

---

## DEC-003 — 검증된 별도 Git working copy로 안전 전환
- Date: 2026-08-21
- Status: Approved by migration request

### Decision
기존 `D:\OneDrive\ObsidianVault`를 직접 초기화하거나 덮어쓰지 않고, 전체 백업을 검증한 뒤 clone한 `dex-company-wiki`에 활성 Vault 자료를 보존형으로 병합합니다. 기존 Vault는 전환 검증이 끝날 때까지 변경하지 않습니다.

### Reason
원격 이력과 기존 Vault를 모두 보존하고, 충돌·누락·Secret 유출을 검증한 뒤 안전하게 Obsidian의 활성 Vault를 바꿀 수 있기 때문입니다.

---

## DEC-004 — 실제 Vault의 `10_Projects/` 구조 유지
- Date: 2026-08-21
- Status: Approved by existing source structure

### Decision
초기 원격 문서의 `01_Projects/` 예시 대신 기존 Vault에서 실제로 사용하고 있는 `10_Projects/<ProjectName>/` 구조를 유지합니다.

### Reason
기존 문서, 프로젝트별 `PROJECT_CONFIG.md`, `[[Wiki Link]]`, 운영 가이드가 이미 `10_Projects/`를 기준으로 연결되어 있어 불필요한 대규모 이동과 링크 손상을 피하기 위함입니다.

---

## DEC-005 — 로컬 상태와 백업은 GitHub에서 제외
- Date: 2026-08-21
- Status: Approved

### Decision
`.codex-backups/`, `.obsidian/workspace*.json`, Secret·인증서·임시파일을 Git 추적 대상에서 제외합니다. 안전한 Obsidian 공용 설정과 Wiki 문서는 추적합니다.

### Reason
GitHub `main`에는 AI가 이어받는 데 필요한 재사용 상태만 두고, PC별 UI 상태·중복 백업·민감정보의 유출과 충돌 위험을 줄이기 위함입니다.

---

## DEC-006 — 이중 Vault는 최신 기준과 고유 파일을 함께 보존
- Date: 2026-08-21
- Status: Approved by verified local evidence

### Decision
운영 문서가 Source of Truth 경로로 선언하고 더 많은 최신 자료를 포함한 `D:\OneDrive\ObsidianVault`를 마이그레이션 기준으로 유지합니다. Obsidian registry에 남아 있던 `D:\VibeProject\ObsidianVault\ObsidianVault`의 고유 파일 5개와 더 최근의 그래프 표시 설정은 Git Vault에 추가하고, 내용이 다른 구형 문서는 두 번째 검증 백업에 보존합니다. `.obsidian/workspace.json`은 PC별 세션 상태이므로 병합하거나 Git에 추적하지 않습니다.

### Reason
두 Vault의 공통 파일 369개는 동일했고, OneDrive 쪽에만 140개가 더 있었습니다. 내용이 다른 운영 문서는 OneDrive 쪽이 후속 규칙·프로젝트 등록·QA 기록을 포함했으며, 등록 Vault의 긴 LLM Wiki 인덱스는 이미 존재하는 노트 링크를 나열한 구형 생성 목록이었습니다. 최신 운영 상태를 유지하면서도 등록 Vault에만 있던 사용자 파일을 잃지 않기 위함입니다.

---

## DEC-007 — 모든 실행 경로를 Git Vault로 통일
- Date: 2026-08-21
- Status: Approved

### Decision
로컬 helper 15개, Growth Scan, Dex Company Wiki 플러그인과 Obsidian 등록 경로는 `D:\CodexProjects\codex setup\dex-company-wiki`만 사용합니다. OneDrive와 VibeProject Vault는 read-only reference로 유지합니다. 이 결정은 DEC-006의 OneDrive 사용을 마이그레이션 입력 기준으로만 한정하며 현재 운영 경로를 대체합니다.

### Reason
실행 소비자가 이전 Vault를 계속 읽거나 쓰면 GitHub `main`과 다른 상태가 생성되어 AI 간 인수인계와 단일 Source of Truth가 깨지기 때문입니다.

---

## DEC-008 — 개인정보 제거를 위해 Git 이력 재작성
- Date: 2026-08-21
- Status: Approved by follow-up request

### Decision
현재 파일의 로컬 Windows 계정 경로를 환경 변수 표현으로 바꾸고, 초기 커밋의 개인 이메일과 과거 파일 내용의 계정 경로를 정제한 뒤 `main` 이력을 검증하여 강제 push합니다. 재작성 전 전체 refs Git bundle을 로컬 검증 백업으로 남깁니다.

### Reason
현재 트리만 고쳐도 Git 과거 객체에는 개인정보가 남으므로 저장소 전체 보안 원칙을 충족하려면 이력 정제가 필요합니다.


---

## DEC-009 — Obsidian을 공식 구성요소에서 제외
- Date: 2026-08-22
- Status: Approved by Ethan

### Decision
Obsidian을 Dex Company의 공식 구성요소, 정상 작동 조건, Source of Truth와 필수 편집기에서 제외한다. 기존 파일은 migration evidence와 legacy compatibility로만 보존한다.

### Reason
로컬 설치 환경에 종속되지 않고 모바일·태블릿·다른 PC와 다른 AI에서 같은 시스템을 사용하기 위함이다.

---

## DEC-010 — `dexcompany.app`을 universal front door로 구축
- Date: 2026-08-22
- Status: Approved by Ethan

### Decision
PC·태블릿·모바일에서 task 요청, 진행 확인, 승인, 결과와 failover를 처리하는 반응형 Web/PWA를 공식 공통 UI로 구축한다.

### Reason
ChatGPT·Claude 등 개별 client의 모바일, MCP write, local file 기능 차이를 한곳에서 흡수하고 사용자의 수동 라우팅을 없애기 위함이다.

---

## DEC-011 — 하나의 MCP Gateway를 ChatGPT와 Claude에 연결
- Date: 2026-08-22
- Status: Approved by Ethan

### Decision
ChatGPT용과 Claude용 비즈니스 로직을 별도 복제하지 않고 하나의 standards-first remote MCP Gateway와 host별 adapter를 만든다.

### Reason
같은 task·schema·권한·evidence를 유지하고 공급자 장애 시 즉시 다른 client가 이어받게 하기 위함이다.

---

## DEC-012 — Provider 독립 core와 Provider별 최적화를 병행
- Date: 2026-08-22
- Status: Approved by Ethan

### Decision
Canonical 문서에는 역할·capability·품질·보안 정책을 두고 현재 선호 모델·surface·tool·추론 강도와 제한은 provider adapter에 둔다.

### Reason
공급자 종속성을 줄이면서도 각 AI의 최고 성능과 고유 기능을 포기하지 않기 위함이다.

---

## DEC-013 — Subscription-first, 자동 API 과금 금지
- Date: 2026-08-22
- Status: Approved by Ethan

### Decision
Codex App Server의 ChatGPT managed login과 Claude/Claude Code 구독 로그인을 우선한다. API key, API credit, extra usage와 유료 fallback은 기본 금지하고 한도 도달 시 failover 또는 대기한다.

### Reason
이미 결제한 구독을 활용하고 예상하지 못한 종량제 비용을 차단하기 위함이다.

---

## DEC-014 — 단일 책임 Lead와 capability-routed worker로 운영

- Date: 2026-08-30
- Status: Approved by Ethan

### Decision

Dex의 canonical 작업 원칙을 다음으로 정한다.

> **One Task ID / One Accountable Lead / Capability-Routed Workers / Risk-Based Independent Verification / One Canonical Result / Zero User Re-entry**

하나의 Task에는 Task ID와 Accountable Lead를 하나씩 두되 Lead를 유일한 실행자로 제한하지 않는다. acceptance criteria에 필요한 worker만 capability에 따라 선택하고 모든 surface를 의무 호출하지 않는다. 독립적인 읽기·조사·분석은 병렬화할 수 있지만 같은 repository·branch·document·artifact·deployment 등 동일 mutation scope에는 active writer 한 명만 허용한다.

지속되는 변경은 writer와 분리된 review run을 사용한다. 보안·권한·배포·데이터·외부 side effect를 포함한 고위험 작업은 별도 identity/run의 verifier, 결정적 evidence와 필요한 사용자 승인이 모두 PASS해야 완료할 수 있다. Verifier는 검수 대상에 write 권한을 갖지 않는다.

Canonical Result와 execution receipt는 callback보다 먼저 영속화한다. callback 실패는 worker 재실행 사유가 아니며 PWA result inbox와 status/result tool로 회수한다. 이미 접수한 요구사항을 다른 surface에서 다시 입력하게 하지 않고 새 권한·결정만 같은 Task ID에서 요청한다.

ChatGPT Work는 intake·기획·artifact·결과 표시 surface이며 GitHub Task Bus를 대체하지 않는다. Hosted Work submit은 Runtime #28 PASS 뒤 #34, bounded read-worker/verifier 확대는 #35의 별도 Gate에서 활성화한다.

### Reason

기존 `One Task / One Owner`와 `단일 실행 owner` 표현은 최종 책임 조정자와 유일한 실행 worker를 구분하지 않았다. 그 결과 capability가 부족한 worker가 작업을 독점하거나 여러 surface가 같은 리소스를 중복 수정할 수 있었다. 책임·실행·검수·결과 계약을 분리하면 하나의 결과와 책임을 유지하면서 전문 capability를 안전하게 조합할 수 있다.

### Rejected alternatives

- 모든 Task를 한 worker만 수행
- 모든 surface를 항상 호출
- 첫 MVP부터 Child Issue·무제한 DAG·multi-writer를 도입

### Consequences

읽기 작업은 안전하게 병렬화할 수 있고 변경 충돌·중복 side effect·quota 낭비를 줄인다. 독립 검수가 필요한 작업은 latency가 늘 수 있다. Runtime #28 PASS 전 hosted Work submit·multi-writer·무제한 worker graph는 활성화하지 않는다.
