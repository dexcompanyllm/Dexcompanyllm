# Dex Company Overview

## 정의

Dex Company는 에던이 하나의 명령으로 여러 AI와 실행 환경을 사용하고, GitHub에서 상태를 보존하며, 다른 provider가 중단 지점부터 이어받게 하는 개인 AI 업무 운영체계다.

## 공식 구성요소

- GitHub 기반 Dex Company Core
- `dexcompany.app` Web/PWA
- Dex Orchestrator
- Dex MCP Gateway
- Provider adapter
- Subscription worker
- GitHub Task Bus
- QA/Watchdog

Obsidian은 공식 구성요소가 아니다.

## 역할 명령

- `/PM`
- `/PL`
- `/기획자`
- `/디자이너`
- `/퍼블리셔`
- `/개발자`
- `/QA`
- `/바이브코딩`
- `/구직자`
- `/지식관리`

역할은 `ROLE_CAPABILITY_MATRIX.md`에서 capability로 변환되고 `providers/`에서 현재 최적 provider·surface·모델로 매핑된다.

## 운영 계약

1. 에던은 목표와 제약을 한 번 입력한다.
2. Orchestrator가 프로젝트, 역할, capability, 플랫폼, provider, 위험과 승인 정책을 결정한다.
3. 모든 실질적인 작업은 Task Packet과 checkpoint를 갖는다.
4. Worker가 실제 산출물·파일·코드를 처리한다.
5. Watchdog가 가능한 가장 강한 evidence로 검증한다.
6. Result Packet, 상태, 결정과 handoff를 GitHub에 남긴다.
7. provider 장애 또는 한도 도달 시 다른 구독 provider가 안전 checkpoint에서 재개한다.

## 기준 문서

- `AI_CONTRACT.md`
- `LLM_CONTEXT.md`
- `CURRENT_STATE.md`
- `20_Codex_Handoff/DEX_COMPANY_V2_ARCHITECTURE.md`
- `20_Codex_Handoff/UNIFIED_WORKFLOW_PROTOCOL.md`
- `20_Codex_Handoff/ROLE_CAPABILITY_MATRIX.md`
- `20_Codex_Handoff/PLATFORM_CAPABILITY_MATRIX.md`
- `20_Codex_Handoff/SUBSCRIPTION_FIRST_POLICY.md`
- `20_Codex_Handoff/DEXCOMPANY_APP_PRODUCT_SPEC.md`
- `20_Codex_Handoff/MCP_GATEWAY_ARCHITECTURE.md`
- `20_Codex_Handoff/DEX_QUALITY_LEARNING_RULES.md`
- `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md`
- `20_Codex_Handoff/LLM_WIKI_VERIFICATION_SCHEMA.md`
- 기존 OpenAI adapter 참고: `ROLE_TOOL_SKILL_MATRIX.md`, `ROLE_SKILL_ROUTING.md`, `ROLE_SKILL_INSTALL_AUDIT.md`, `CODEX_MODEL_ROUTING_GUIDE.md`

## 지식과 프로젝트 구조

### 재사용 지식

`30_Knowledge/LLM_Wiki/`는 다음 구조를 유지한다.

- `sources/`: 원본 출처 보존
- `wiki/`: 정리된 concept, entity, guide, map
- `queries/`: 재사용 가능한 synthesis와 답변
- `lint/`: health-check snapshot
- `audit/`: 전체 지식 상태 점검
- `index.md`: 진입점
- `log.md`: 변경 기록

### 프로젝트 상태

`10_Projects/<ProjectName>/`에는 필요에 따라 다음을 둔다.

- `AGENTS.md` 또는 provider adapter 지침
- `_index.md` / `README.md`
- `PROJECT_CONFIG.md`, `CONTEXT_MAP.md`
- `PRD.md`, `SPEC.md`, `SCREEN_FLOW.md`, `DATA_MODEL.md`
- `CURRENT.md`, `SESSION_HANDOFF.md`
- `QA_REPORT.md`, `DECISIONS.md`, `SOURCES.md`
- `Tasks/<TaskId>/TASK.yaml`, `RESULT.yaml`, `EVIDENCE.md`, `RUN.jsonl`

실제 application source는 연결된 별도 코드 저장소에서 관리한다.

## Local 실행 호환 계층

기존 로컬 Codex 자산은 공식 core가 아니라 provider-specific capability로 유지한다.

- Codex local skills와 검토된 외부 skill
- `codex-ppt` runtime
- `dex-watchdog` skill
- 기존 role/skill routing과 install audit 문서
- local helper와 Growth Scan

이 자산은 유효할 때 OpenAI adapter가 활용하지만, 설치되지 않은 기기에서도 Dex Company core와 GitHub 상태는 정상 동작해야 한다. Runtime으로 이관되기 전까지 readiness와 실제 경로는 별도 검증한다.

## 품질 기준

- Source of Truth는 GitHub `main`
- canonical role은 capability 기반
- provider 고유 강점은 adapter에서 최대 활용
- API 자동 과금 금지
- 중요한 side effect는 승인·idempotency·audit 적용
- `PASS`, `FAIL`, `Not Checked` 분리
- 채팅 기록 없이도 task 재개 가능
- 특정 AI 또는 로컬 앱 제거 뒤에도 canonical state 보존

## Ready 조건

- AI Contract와 provider adapter가 일치
- PWA와 MCP Gateway health 통과
- GitHub Task Bus read/write 정책 검증
- OpenAI와 Anthropic subscription auth guard 통과
- mobile/platform fallback 검증
- Watchdog와 recovery drill 통과
