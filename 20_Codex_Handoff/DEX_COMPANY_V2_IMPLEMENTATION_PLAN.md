# Dex Company v2 Implementation Plan

- Status: Approved and in progress
- Date: 2026-08-22

## Phase 0 — Architecture decision

### 상태

- 완료

### 확정 결정

- GitHub `main`이 Source of Truth
- Obsidian 공식 구성요소 제외
- `dexcompany.app` PWA 구축
- 하나의 standards-first MCP Gateway를 ChatGPT와 Claude에 연결
- Provider 독립 + Provider별 최적화
- Subscription-first, API 자동 과금 금지

## Phase 1 — Wiki Control Plane Refactor

### 작업

- `AI_CONTRACT.md` 추가
- `AGENTS.md`, `CLAUDE.md`, `GEMINI.md` adapter entry 구성
- `ROLE_CAPABILITY_MATRIX.md` 추가
- `PLATFORM_CAPABILITY_MATRIX.md` 추가
- `SUBSCRIPTION_FIRST_POLICY.md` 추가
- `DEXCOMPANY_APP_PRODUCT_SPEC.md` 추가
- `MCP_GATEWAY_ARCHITECTURE.md` 추가
- `providers/` 선언 추가
- README, LLM_CONTEXT, CURRENT_STATE, DECISIONS, HANDOFF, OVERVIEW 갱신
- Obsidian guide를 legacy reference로 전환
- Task/Result Packet 확장

### 완료 기준

- canonical 문서가 Obsidian이나 Codex-only 흐름에 의존하지 않음
- 모든 공급자가 같은 AI Contract를 읽음
- provider별 최적화가 별도 adapter에 유지됨
- API 자동 과금 금지 규칙이 machine-readable 상태로 존재

## Phase 2 — Runtime bootstrap repository

### 목표

별도 `dex-company-runtime` 저장소에서 PWA, Orchestrator, MCP Gateway와 subscription worker의 실행 가능한 bootstrap을 만든다.

### 초기 구조

```text
apps/console
services/mcp-gateway
services/orchestrator
workers/openai-codex
workers/anthropic-claude
packages/core
config
scripts
```

### 우선 기능

- responsive PWA shell
- GitHub-backed project/task read
- task preview와 안전한 Issue 기반 task 생성
- read-only MCP tools와 dashboard widget
- platform capability reporting
- Codex App Server ChatGPT login guard
- Claude subscription/API-key guard
- static validation script

### blocker

현재 연결 도구는 새 GitHub repository 생성 기능을 제공하지 않는다. 에던이 빈 private `dex-company-runtime` repository를 한 번 생성하면 bootstrap을 push한다.

## Phase 3 — Private deployment

- `dexcompany.app` 도메인 소유·DNS 확인
- HTTPS hosting
- server-side GitHub App/OAuth
- `/mcp`, `/api`, `/health`
- PWA install과 offline shell
- logs, rate limit, audit

## Phase 4 — ChatGPT MCP app

- ChatGPT Developer Mode 연결
- Pro에서는 read/fetch 동작 확인
- mobile·write 제한 시 PWA deep link 확인
- Business/Enterprise 등에서 write tool을 사용할 경우 별도 security review
- tool schema와 widget compatibility test

## Phase 5 — Claude MCP connector

- 같은 remote `/mcp` endpoint 연결
- Claude web/desktop/mobile에서 read flow 확인
- interactive UI 지원 여부에 따른 widget/structured-content fallback
- write action approval과 audit 확인

## Phase 6 — Local subscription workers

### OpenAI

- Codex App Server `chatgpt` 인증
- API key 감지 시 중지
- task 실행, event stream, approval, result capture

### Anthropic

- Claude Code subscription login
- `ANTHROPIC_API_KEY` 감지 시 중지
- 공식 구독 정책 재확인 뒤 `claude -p`/Agent SDK 사용
- quota 도달 시 checkpoint와 failover

## Phase 7 — Orchestrator and failover

- role/capability routing
- provider health와 platform capability
- task lock와 idempotency
- approval gate
- checkpoint resume
- Watchdog 단계별 gate
- provider removal/recovery drill

## 검증 원칙

- 코드 생성과 실제 배포를 구분해 보고한다.
- static check, unit test, MCP Inspector, ChatGPT/Claude end-to-end 순으로 검증한다.
- `PASS`, `FAIL`, `Not Checked`를 분리한다.
- 실제 credential과 비용 전환은 에던 승인 전 실행하지 않는다.
