# Dex MCP Gateway Architecture

- Status: Approved for implementation
- Archetype: `interactive-decoupled`
- Principle: one standards-first MCP server, multiple host adapters

## 1. 결정

ChatGPT용 서버와 Claude용 서버를 별도로 복제하지 않는다. 공통 MCP protocol server와 core tool을 한 번 구현하고 host별 metadata, UI extension, 권한 차이만 adapter에서 처리한다.

```text
ChatGPT MCP app ----\
                     > Dex MCP Gateway -> Orchestrator -> GitHub/Workers
Claude connector ---/
Other MCP client ---/
```

## 2. 이유

- 같은 task와 결과가 host마다 달라지는 문제를 막는다.
- 한쪽 AI가 중단돼도 같은 endpoint와 schema를 다른 AI가 사용한다.
- MCP Apps bridge를 우선하면 호환 host에서 같은 UI를 재사용할 수 있다.
- ChatGPT 고유 `window.openai` 기능은 optional extension으로만 사용한다.

## 3. Tool 설계

### 공통 read tools

| Tool | 목적 |
|---|---|
| `search` | Dex Company 문서와 프로젝트 상태 검색 |
| `fetch` | 특정 문서·task·evidence 조회 |
| `list_projects` | 프로젝트 목록과 상태 조회 |
| `get_project_state` | 프로젝트 current/handoff/context 조회 |
| `list_tasks` | 최근·활성·승인 대기 task 조회 |
| `get_provider_status` | provider·host·플랫폼 capability 조회 |
| `render_dashboard` | interactive dashboard widget 표시 |

### Mutating tools

| Tool | 기본 정책 |
|---|---|
| `create_task` | 인증·idempotency·승인 정책 필요 |
| `request_approval` | 안전한 approval record 생성 |
| `approve_task` | 에던 본인 인증 필요 |
| `record_checkpoint` | worker scope와 task lock 필요 |
| `publish_result` | evidence 검증 뒤 허용 |
| `request_failover` | side effect와 checkpoint 확인 뒤 허용 |

## 4. 플랫폼별 동작

### ChatGPT

- Pro에서는 read/fetch 중심으로 연결한다.
- custom MCP가 모바일에서 지원되지 않으면 PWA URL을 반환한다.
- write가 지원되는 workspace에서도 중요한 action은 확인을 요구한다.
- ChatGPT-specific widget extension은 optional이다.

### Claude

- remote custom connector로 같은 `/mcp` endpoint를 연결한다.
- public/reachable endpoint와 server-side authentication이 필요하다.
- Claude client가 interactive UI를 지원하면 같은 MCP Apps resource를 사용하고, 미지원이면 structured content로 fallback한다.

## 5. Data와 UI 분리

- Data tool은 재사용 가능한 `structuredContent`를 반환한다.
- Render tool은 `_meta.ui.resourceUri`로 widget을 연결한다.
- 큰 payload와 host 전용 상태는 `_meta`에 둔다.
- widget이 없어도 모델이 text/structured content로 업무를 완료할 수 있어야 한다.

## 6. 보안

- production endpoint는 HTTPS와 인증을 사용한다.
- browser에 GitHub token이나 provider credential을 노출하지 않는다.
- tool별 read/write annotation과 scope를 정확히 선언한다.
- mutating tool은 user identity, idempotency key, audit log, approval gate를 요구한다.
- prompt injection 위험이 있는 external content는 trust boundary를 표시한다.
- server tool 변경은 versioning과 compatibility review를 거친다.

## 7. 배포 단계

1. local read-only MCP server
2. HTTPS tunnel을 통한 ChatGPT/Claude 연결 시험
3. private hosted endpoint와 authentication
4. PWA와 동일 backend 통합
5. write tool 제한적 활성화
6. production security review

## 8. 완료 기준

- ChatGPT web과 Claude에서 같은 project state를 읽는다.
- 모바일에서는 Claude 또는 PWA에서 같은 task를 읽는다.
- ChatGPT Pro의 write 제한이 PWA 흐름을 막지 않는다.
- provider adapter를 제거해도 canonical data가 남는다.
- tool 재시도에서 중복 side effect가 발생하지 않는다.
