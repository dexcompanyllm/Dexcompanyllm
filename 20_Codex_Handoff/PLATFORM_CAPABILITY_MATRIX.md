# Platform Capability Matrix and Parity Fallback

- Status: Approved
- Last verified: 2026-08-22

제품별 기능 차이는 에던이 직접 기억하거나 우회하지 않는다. Orchestrator가 현재 플랫폼을 감지하고 공통 PWA 또는 Task Bus로 우회한다.

## 에던이 체감할 수 있는 대표 사례

| 상황 | PC/Web | 모바일·태블릿에서 체감하는 차이 | 자동 우회 |
|---|---|---|---|
| ChatGPT custom MCP | 웹에서는 Dex MCP의 read/fetch 사용 가능 | ChatGPT 모바일에서는 custom MCP app 자체가 보이지 않을 수 있음 | `dexcompany.app`에서 동일 프로젝트·task 조회와 실행 요청 |
| ChatGPT Pro의 MCP 쓰기 | read/fetch 중심 | task 생성·상태 변경 tool을 ChatGPT에서 바로 못 씀 | PWA가 GitHub Task Bus에 안전하게 기록 |
| Local Work | PC의 `D:\...` 파일과 앱을 직접 사용 | 태블릿에서는 그 PC 파일을 직접 열거나 수정할 수 없음 | cloud artifact 또는 GitHub task로 전환, local worker queue 대기 |
| Codex Remote | 연결된 PC에서 실행 중인 Codex를 모바일로 확인·승인 | PC가 꺼져 있거나 host가 끊기면 실행 불가 | task를 GitHub에 queue하고 host 재연결 후 resume |
| Chat/Work/Codex 기록 | 각 surface에서 해당 thread 확인 | 다른 surface에서 대화 이력이 동일한 작업 상태로 자동 합쳐지지 않음 | `TASK.yaml`, checkpoint, `RESULT.yaml`을 canonical 상태로 사용 |
| Claude remote MCP | 공개 remote endpoint를 여러 Claude client에서 사용 가능 | 로컬 MCP만 구성하면 모바일에서 사용할 수 없음 | 항상 같은 remote MCP Gateway URL을 사용 |

## 해결 구조

```text
어느 기기에서든 요청
        |
        v
 dexcompany.app PWA  <---- universal fallback
        |
        v
 GitHub Task Bus / Orchestrator
        |
        +--> ChatGPT MCP (지원 범위 내)
        +--> Claude remote MCP
        +--> Codex/Claude local worker queue
```

## UX 규칙

- 지원되지 않는 기능은 숨기지 않고 `현재 기기에서 직접 실행 불가`로 표시한다.
- 바로 가능한 대체 경로를 한 번의 버튼으로 제공한다.
- 동일 요청을 다른 앱에 다시 입력하게 하지 않는다.
- provider 전환 후에도 task id와 acceptance criteria를 유지한다.
- local host가 필요한 task는 `Waiting for host`로 보이고 자동 재개 여부를 선택할 수 있게 한다.

## Capability 상태값

- `available`: 현재 기기와 계정에서 바로 사용 가능
- `available-read-only`: 조회만 가능
- `requires-host`: 연결된 로컬 PC가 필요
- `requires-plan`: 현재 요금제에서 지원되지 않음
- `requires-approval`: 실행 전 에던 승인 필요
- `queued`: 조건이 충족될 때까지 대기
- `unavailable`: 지원되지 않으며 대체 worker 필요

## 공식 출처 점검 항목

Runtime은 배포 시 다음 정책을 정기적으로 재확인한다.

- ChatGPT custom MCP의 모바일·요금제별 지원
- ChatGPT Work의 로컬 파일 접근 범위
- Codex Remote의 host 요구사항
- Claude remote MCP의 지원 client와 네트워크 요구사항
- Claude Code/Agent SDK의 구독 차감 정책
