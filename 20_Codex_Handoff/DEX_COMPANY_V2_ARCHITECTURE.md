# Dex Company v2 Architecture

- Status: Approved
- Date: 2026-08-22
- Owner: Ethan

## 1. 목표

Dex Company v2는 특정 AI, 특정 기기, 특정 로컬 앱에 종속되지 않는 개인 AI 업무 운영체계다.

1. GitHub `main`을 유일한 영구 기준정보로 유지한다.
2. Obsidian을 공식 구성요소에서 제외한다.
3. `dexcompany.app`을 PC·태블릿·모바일 공통 Front Door로 제공한다.
4. ChatGPT와 Claude에 같은 Dex MCP Gateway를 연결한다.
5. provider 독립 core와 provider별 최적화를 함께 유지한다.
6. AI API 자동 과금 없이 구독 인증을 우선한다.
7. AI·세션·host가 끊겨도 Task Packet과 checkpoint로 재개한다.

## 2. 비목표

- 채팅 기록을 영구 상태로 사용하지 않는다.
- 에던이 Chat, Work, Codex, Claude 사이에서 수동 인수인계를 하지 않는다.
- 모든 AI 기능을 최저공통분모로 축소하지 않는다.
- PWA나 runtime 코드를 Wiki 저장소에 섞지 않는다.
- API key와 자동 유료 fallback을 기본 경로로 두지 않는다.

## 3. 목표 아키텍처

```text
                         Ethan
                           |
       +-------------------+-------------------+
       |                   |                   |
 dexcompany.app        ChatGPT MCP        Claude MCP
 PC/Tablet/Mobile       app (adapter)      connector
       |                   |                   |
       +-------------------+-------------------+
                           |
                    Dex Orchestrator
       +-------------------+-------------------+
       | Context | Role | Capability | Policy |
       | Provider Router | Approval | QA      |
       +-------------------+-------------------+
                           |
                    Dex MCP Gateway
                           |
       +-------------------+-------------------+
       |                                       |
 OpenAI Adapter                          Anthropic Adapter
 Codex App Server                        Claude Code / claude -p
 ChatGPT subscription                    Claude subscription
       |                                       |
       +-------------------+-------------------+
                           |
                 GitHub Task Bus / Workers
                           |
       +-------------------+-------------------+
       |                                       |
 dex-company-wiki                    Project code repositories
 knowledge/control plane             implementation/artifacts
```

## 4. 구성요소

### 4.1 Dex Company Core

- AI Contract
- 역할·capability 정책
- provider adapter 선언
- 프로젝트 상태·결정·지식
- Task/Result Packet
- QA와 handoff

### 4.2 Dex Runtime

별도 `dex-company-runtime` 저장소에 둔다.

```text
apps/console
services/orchestrator
services/mcp-gateway
workers/openai-codex
workers/anthropic-claude
packages/core
packages/policy-engine
packages/schemas
packages/provider-adapters
packages/audit
```

### 4.3 Dex Console

- `https://dexcompany.app`
- 단일 명령 입력
- task timeline
- 승인 대기함
- provider/host 상태
- 결과물·diff·evidence
- failover와 resume

### 4.4 Dex MCP Gateway

- ChatGPT와 Claude가 공유하는 remote MCP endpoint
- `/mcp`
- read tools 기본 활성
- write tools는 계정·플랫폼·승인 정책에 따라 활성

### 4.5 Provider Adapter

Canonical capability를 공급자별 최적 surface, 모델, tool, 추론 강도로 매핑한다. 현재 선호 모델이 사라져도 core 문서를 바꾸지 않고 adapter만 갱신한다.

## 5. 플랫폼 차이 처리

- ChatGPT custom MCP가 모바일에서 보이지 않으면 PWA로 우회한다.
- ChatGPT Pro에서 MCP write가 막히면 PWA가 Task Bus를 갱신한다.
- Local Work와 Codex Remote가 host를 요구하면 task를 queue한다.
- Claude remote MCP는 같은 endpoint를 사용한다.
- 어떤 surface에서도 동일 task id, acceptance criteria와 checkpoint를 유지한다.

## 6. 비용 아키텍처

```text
OpenAI worker -> Codex App Server -> ChatGPT managed login
Claude worker -> Claude Code / claude -p -> Claude subscription login
Quota reached -> checkpoint -> other subscription provider or wait
Paid API -> disabled
Automatic extra usage -> disabled
```

AI API 비용 0원을 기본 목표로 하며 도메인과 호스팅은 별도 비용 항목으로 관리한다.

## 7. Obsidian 전환

- Obsidian은 공식 구성요소가 아니다.
- 기존 `.obsidian/`, Canvas, Wiki Link와 migration 문서는 보존할 수 있다.
- 신규 운영 규칙과 task는 Obsidian 기능에 의존하지 않는다.
- 향후 사용하지 않기로 확정하면 앱과 local 설정을 제거해도 GitHub 데이터에는 영향이 없다.

## 8. 성공 기준

- Obsidian이 없는 환경에서 핵심 운영이 가능하다.
- 모바일에서 task 생성·확인·승인을 할 수 있다.
- 에던이 같은 명령을 여러 AI에 다시 입력하지 않는다.
- ChatGPT와 Claude가 동일 project context와 task를 읽는다.
- 특정 provider가 중단돼도 다른 provider가 checkpoint에서 재개한다.
- API key 없이 OpenAI/Claude 구독 worker가 동작한다.
- 모든 결과와 side effect가 GitHub에서 추적 가능하다.
