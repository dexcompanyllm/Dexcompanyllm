# dexcompany.app Product Specification

- Status: Approved for implementation
- Product type: Private responsive Web/PWA
- Primary owner: Ethan
- Canonical backend state: GitHub

## 1. 제품 목적

에던이 Chat, Work, Codex, Claude를 직접 오가며 같은 내용을 반복하지 않도록 PC·태블릿·모바일에서 사용하는 하나의 업무 제어 화면을 제공한다.

## 2. 핵심 가치

- 어느 기기에서든 같은 프로젝트와 task를 본다.
- 하나의 명령으로 role·capability·provider를 자동 라우팅한다.
- 플랫폼 기능 차이를 PWA가 흡수한다.
- 승인, 진행 상태, 결과물, diff, evidence를 한곳에서 확인한다.
- AI 공급자 장애나 한도 도달 시 다른 provider가 checkpoint에서 재개한다.
- AI API 자동 과금 없이 구독 worker를 사용한다.

## 3. 사용자 플로우

```text
로그인
 -> 프로젝트 선택 또는 자동 추천
 -> 목표 입력
 -> task preview
 -> 위험·승인·provider 계획 확인
 -> 실행
 -> timeline 확인
 -> 필요한 승인
 -> 결과물·diff·QA 확인
 -> 완료 또는 재작업
```

## 4. MVP 화면

### 4.1 Home

- 활성 프로젝트
- 최근 task
- 승인 대기
- local/remote worker 상태
- provider 사용 가능 상태

### 4.2 New Task

- 자연어 명령 입력
- 프로젝트 자동 추천과 수정
- 기한·우선순위·보존/제외 조건
- 예상 role·capability·worker
- 비용 정책: Subscription only 고정 표시
- task 생성 전 preview

### 4.3 Task Detail

- 상태 timeline
- Task Packet
- 현재 checkpoint
- 실행 worker와 host
- 변경 파일·artifact·PR
- validation과 watchdog
- 실패·미확인·남은 리스크
- failover 또는 resume

### 4.4 Approval Inbox

- 삭제, 외부 전송, push, merge, 배포, 비용 증가 요청
- 변경 요약과 diff
- 승인, 거절, 조건부 승인

### 4.5 Provider & Host Status

- OpenAI/Claude 로그인 상태
- 구독 사용 가능 여부
- API key 감지 여부
- 연결된 local host
- 플랫폼 capability와 fallback 경로

## 5. 반응형 규칙

- 모바일: 단일 컬럼, 하단 action bar, task 중심
- 태블릿: 목록 + 상세 2단 구성
- PC: 프로젝트 navigation + task list + detail 3단 구성
- PWA 설치, offline shell, push 알림은 단계적으로 추가
- offline 상태에서도 기존 task snapshot을 읽고 새 요청은 outbox에 보관한다.

## 6. 인증

### 초기 내부 버전

- GitHub owner 단일 사용자
- backend에 저장한 GitHub credential 또는 GitHub App 설치
- PWA는 backend session만 사용하고 GitHub token을 브라우저에 노출하지 않는다.

### 운영 버전

- GitHub App/OAuth
- short-lived session
- CSRF, rate limit, audit log
- provider credential은 각 local worker 또는 provider account에만 보관

## 7. 플랫폼 우회

- ChatGPT mobile에서 custom MCP를 못 쓰면 PWA deep link를 제공한다.
- ChatGPT Pro에서 MCP write가 막히면 PWA가 task 생성과 승인 작업을 수행한다.
- local host가 꺼져 있으면 task를 queue한다.
- Claude와 ChatGPT는 동일 task URL과 MCP resource를 사용한다.

## 8. API와 데이터

PWA는 Dex Runtime의 REST/SSE API를 사용한다.

- `GET /api/status`
- `GET /api/projects`
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `POST /api/tasks/preview`
- `POST /api/tasks`
- `POST /api/tasks/:id/approve`
- `POST /api/tasks/:id/resume`
- `POST /api/tasks/:id/failover`
- `GET /api/tasks/:id/events`

MCP Gateway와 PWA backend는 같은 core package와 policy engine을 공유한다.

## 9. 품질 기준

- WCAG 2.2 AA를 목표로 한다.
- 모든 mutating action은 idempotency key를 갖는다.
- 모바일에서 task 생성부터 승인까지 3분 이내에 가능해야 한다.
- provider 변경 시 동일 입력을 재작성하지 않는다.
- Secret이 브라우저 bundle, GitHub, 로그에 노출되지 않는다.
- PWA가 없어도 GitHub Task Packet으로 복구 가능해야 한다.

## 10. 배포 목표

- PWA: `https://dexcompany.app`
- MCP endpoint: `https://dexcompany.app/mcp`
- Health: `https://dexcompany.app/health`

도메인 소유권, DNS와 호스팅은 배포 전 별도 확인한다. 코드 생성 완료와 실제 공개 배포 완료를 구분해 보고한다.
