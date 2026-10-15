# Dex Company

Dex Company는 GitHub를 중심으로 여러 AI와 기기에서 같은 지식·상태·업무 흐름을 이어가는 개인 AI 업무 운영체계다.

## Source of Truth

GitHub `main`의 승인된 최신 상태가 단일 기준정보다.

```text
PC / Tablet / Mobile
        |
        v
 dexcompany.app PWA
        |
        v
 Dex Orchestrator + MCP Gateway
        |
        +--> OpenAI adapter --> ChatGPT / Work / Codex
        +--> Anthropic adapter --> Claude / Claude Code
        +--> Future adapters
        |
        v
 GitHub Task Bus + Project Repositories
```

## 공식 구성요소

- `dex-company-wiki`: 지식·정책·프로젝트 상태·Task/Result Packet
- `dex-company-runtime`: Orchestrator, PWA, MCP Gateway, provider adapter, worker
- `dexcompany.app`: PC·태블릿·모바일 공통 제어 화면
- GitHub Task Bus: Issue, branch, PR, checkpoint, result, evidence
- ChatGPT MCP app와 Claude remote MCP connector
- subscription-first local/remote workers
- QA/Watchdog

## Obsidian 상태

Obsidian은 Dex Company의 공식 구성요소가 아니다. 기존 `.obsidian/`과 관련 문서는 마이그레이션 증거와 개인 호환을 위해 남을 수 있지만 정상 작동 조건, Source of Truth 또는 필수 편집기가 아니다.

## AI 작업 시작 순서

1. `AI_CONTRACT.md`
2. 공급자 진입 파일: `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`
3. `CURRENT_STATE.md`
4. 대상 프로젝트의 `PROJECT_CONFIG.md`, `CURRENT.md`, `SESSION_HANDOFF.md`
5. 현재 Task Packet과 관련 SPEC·DECISIONS·SOURCES

## 주요 구조

- `00_Inbox/` — 캡처와 미분류 입력
- `10_Projects/` — 프로젝트 상태, 결정, QA, task와 인수인계
- `20_Codex_Handoff/` — 전역 운영·라우팅·품질·호환 정책
- `30_Knowledge/LLM_Wiki/` — 출처 기반 재사용 지식
- `40_References/` — 외부 참고자료
- `70_Outputs/` — 도구 결과와 임시 산출물
- `90_Archive/` — 완료·비활성 자료
- `99_Templates/` — Task/Result와 문서 템플릿
- `providers/` — 공급자별 최적화와 인증·플랫폼 제약

## 핵심 원칙

- GitHub-first
- One Front Door
- Provider 독립 + Provider별 최적화
- Subscription-first, API 자동 과금 금지
- Task Packet 기반 재개와 failover
- Supervised autonomy
- 검증 없는 완료 금지

## 저장소 경계

실제 PWA, MCP, Orchestrator와 worker 코드는 별도 `dex-company-runtime` 저장소에서 관리한다. 이 저장소에는 정책·상태·스키마·지식만 둔다.

## 핵심 문서

- `AI_CONTRACT.md` — 모든 AI와 런타임의 공통 계약
- `CURRENT_STATE.md` — 전체 상태 대시보드
- `DECISIONS.md` — 전역 의사결정 로그
- `HANDOFF.md` — 다음 작업자를 위한 인수인계
- `20_Codex_Handoff/DEX_COMPANY_V2_ARCHITECTURE.md` — 목표 아키텍처
- `20_Codex_Handoff/DEXCOMPANY_APP_PRODUCT_SPEC.md` — PWA 제품 명세
- `20_Codex_Handoff/MCP_GATEWAY_ARCHITECTURE.md` — 공통 MCP 구조
- `20_Codex_Handoff/SUBSCRIPTION_FIRST_POLICY.md` — 무API 과금 정책
