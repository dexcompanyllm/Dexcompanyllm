# Provider Portability and Failover Policy

- Status: Approved
- Date: 2026-08-22

## 1. 목적

OpenAI, Anthropic 또는 특정 AI 제품을 사용할 수 없게 되더라도 Dex Company의 지식, 작업 상태, 결정, 산출물과 다음 행동을 잃지 않도록 한다.

## 2. Canonical Data

영구 기준정보:

- GitHub `main`의 승인된 Markdown, YAML, JSON
- 프로젝트 source와 artifact
- Git commit, Issue, PR, review, release
- Task/Result Packet, checkpoint, evidence와 audit log

기준정보가 아닌 것:

- ChatGPT, Work, Codex, Claude의 채팅 기록
- 특정 provider memory
- 특정 provider 내부 task id만 있는 상태
- 로컬 앱에만 남은 임시 출력
- 검증되지 않은 AI 요약

## 3. Open Formats

- Markdown: context, decision, handoff, evidence
- YAML: Task/Result, policy, routing
- JSON Schema: validation
- JSONL: event와 audit
- Git diff/patch: 변경
- CSV: 단순 표 교환
- PPTX/DOCX/XLSX/PDF/이미지: artifact와 함께 핵심 상태를 Markdown/YAML로 기록

## 4. AI Contract와 Adapter

```text
AI_CONTRACT.md                  canonical
AGENTS.md                       OpenAI/Codex adapter entry
CLAUDE.md                       Anthropic adapter entry
GEMINI.md                       Google adapter entry
providers/*.yaml                provider-specific optimization
```

Adapter는 공통 규칙을 복제해 독립적으로 발전시키지 않는다.

## 5. Capability-based routing

Canonical routing은 capability로 정의하고 provider adapter가 현재 모델, tool, skill, SDK 또는 CLI에 매핑한다.

Provider adapter는 최소 다음 기능을 제공한다.

```text
health()
capabilities()
estimate(task)
start(taskPacket)
resume(taskPacket, checkpoint)
cancel(taskId)
streamEvents(taskId)
collectResult(taskId)
```

지원하지 않는 capability를 임의로 흉내 내지 않는다.

## 6. MCP와 PWA

- Dex MCP Gateway는 AI client 공통 interface다.
- Dex Console PWA는 client별 MCP·모바일·write 차이를 흡수하는 universal fallback이다.
- ChatGPT와 Claude는 같은 task URL과 canonical data를 사용한다.

## 7. Failover trigger

- provider 장애 또는 인증 실패
- 구독 사용량 한도
- task timeout
- required capability 미지원
- 반복되는 동일 오류
- 플랫폼에서 해당 action 미지원
- 비용·데이터 정책 위반 가능성
- 에던의 provider 변경 요청

## 8. Failover 순서

1. 현재 worker를 안전하게 중지한다.
2. 실제 파일·Git 상태를 확인한다.
3. Task Packet checkpoint를 갱신한다.
4. 완료·미완료·실패 원인·재시도 금지 조건을 분리한다.
5. 대체 provider의 capability, 플랫폼, subscription 상태를 확인한다.
6. 새 provider가 evidence를 재검증한다.
7. 마지막 안전 checkpoint부터 재개한다.
8. idempotency key와 commit으로 중복 side effect를 막는다.

## 9. Availability class

| Class | 의미 |
|---|---|
| `interactive-only` | 사용자가 해당 app을 열어야 함 |
| `remote-mcp` | remote connector를 통해 어느 기기에서든 접근 가능 |
| `local-runner` | 지정 PC와 로그인된 subscription worker가 필요 |
| `remote-runner` | 원격 host가 계속 실행 |
| `paid-api` | 별도 API 과금 필요, 기본 금지 |

## 10. 비용 정책

- subscription-first
- paid API 기본 금지
- automatic paid fallback 금지
- quota 도달 시 failover 또는 대기
- API key 환경변수 감지 시 subscription worker 중지
- 도메인·호스팅 비용은 별도 승인

## 11. 보안

- API key, OAuth token, session secret은 Git에 저장하지 않는다.
- credential은 provider client, OS credential store 또는 secret manager에 둔다.
- Task Packet에는 secret reference만 기록한다.
- provider가 바뀌어도 최소 권한 원칙을 유지한다.
- 고객사 자료는 프로젝트별 provider allowlist를 확인한다.

## 12. Portability test

1. Obsidian 없이 GitHub/PWA에서 핵심 상태 확인
2. OpenAI adapter 없이 Claude에서 project context 조회
3. Anthropic adapter 없이 OpenAI worker에서 task 재개
4. 채팅 기록 없이 Task Packet만으로 다음 행동 복구
5. ChatGPT mobile custom MCP 없이 PWA에서 동일 task 처리
6. local host 중단 뒤 queue와 checkpoint 유지
7. provider adapter 제거 후 canonical 문서와 artifact 보존
