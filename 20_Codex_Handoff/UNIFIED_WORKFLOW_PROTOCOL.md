# Unified Workflow Protocol

- Status: Approved
- Version: 2.0
- Date: 2026-08-30

## 1. 목적

에던이 Chat, Work, Codex, Claude 또는 Dex PWA 어디에서 시작하더라도 같은 내용을 다시 입력하지 않고, 필요한 전문 worker를 안전하게 조합해 하나의 검증된 결과를 받도록 공통 실행 계약을 정의합니다.

## 모든 AI의 공통 업무

ChatGPT·Work·Codex·Claude·Claude Code·Gemini 등 모든 AI는 같은 Dex Company의 정책·지식·Task·품질 기준을 사용해 기획·디자인·리서치·문서 작성·개발·QA 등 모든 업무를 수행해요. AI 제품명이나 공급자별로 업무 역할을 고정하거나 독점 배정하지 않아요.

Lead·Reader·Writer·Verifier는 Task별 책임이며 provider나 제품별 고정 직무가 아니에요. 현재 AI에서 실제 실행 가능한 업무는 완료하고, 필요한 capability가 부족한 경우에만 기존 승인 범위의 경로를 사용해요. 아래 독립 검수와 single-writer 규칙은 그대로 적용해요.

## 1.1 핵심 불변식

> **One Task ID / One Accountable Lead / Capability-Routed Workers / Risk-Based Independent Verification / One Canonical Result / Zero User Re-entry**

- 시작 surface와 native chat은 canonical Task authority가 아닙니다.
- Accountable Lead는 한 명이지만 실행 worker는 capability에 따라 복수일 수 있습니다.
- 모든 surface를 호출하지 않고 acceptance criteria에 필요한 worker만 선택합니다.
- 같은 mutation scope에는 active writer 한 명만 허용합니다.
- canonical Result와 receipt를 callback보다 먼저 영속화합니다.
- 사용자가 이미 접수한 요구사항을 다른 surface에 다시 입력하게 하지 않습니다.

## 2. Front Door와 authority

- 기본 universal front door: `dexcompany.app`
- 편의 front door: 설치된 Dex plugin을 사용하는 ChatGPT Chat·Work, Claude remote MCP connector
- 비상 front door: GitHub Issue/Task Packet
- canonical Task authority: GitHub Task Bus

설치된 plugin은 제품상 지원되는 Chat/Work의 web·desktop·mobile에서 사용할 수 있습니다. 모바일은 계정에 이미 사용 가능한 plugin의 사용 surface로 취급하며, 설치·MCP 연결 생성·workspace policy 지원을 가정하지 않고 capability check합니다. Native chat과 Codex thread는 execution reference일 수 있지만 canonical Task를 대체하지 않습니다.

## 3. 사용자 입력

에던은 목표, 기한·우선순위, 반드시 지킬 제약, 보존·제외 범위와 승인 전에 멈출 행동만 전달합니다. 역할·provider·model·tool·skill·worker plan은 시스템이 기본 선택하고 에던이 필요할 때 override합니다.

## 4. 처리 순서

1. Request intake와 idempotency resolution
2. Canonical Task ID resolution
3. Project와 context loading
4. Accountable Lead assignment
5. Capability·risk·cost 분석
6. Worker plan과 mutation scope 결정
7. Platform·host readiness 확인
8. Approval Gate
9. Reader/research 실행
10. Single-writer 실행
11. Deterministic verification
12. Risk-based independent review
13. Canonical Result 통합·영속화
14. Status update와 callback/outbox delivery
15. State·decision·handoff 갱신

## 4.1 Worker 계약

| 역할 | 책임 |
|---|---|
| Accountable Lead | context·plan·routing·승인·상태·최종 결과 통합 |
| Reader/Research Worker | mutation 없는 독립 조사·분석 |
| Writer | 할당된 mutation scope의 유일한 active 변경 worker |
| Deterministic Watchdog | test·lint·secret scan·diff·acceptance evidence 검사 |
| Independent Verifier | writer와 다른 identity/run에서 read-only 검토 |
| Result Integrator | worker 결과를 하나의 canonical Result로 통합; 최종 책임은 Lead에 유지 |

Worker plan은 선택 worker, 담당 capability, dependency, mutation scope와 선택 이유를 기록합니다. 고려했지만 사용하지 않은 주요 surface는 capability 부적합·중복 실행 방지·quota 보존 등의 사유를 receipt에 기록합니다.

## 4.2 병렬화와 single-writer

- 독립 읽기·검색·분석만 병렬화합니다.
- adapter가 정한 동일 `mutationLockKey`에는 active writer를 하나만 둡니다.
- #28 MVP의 lock 범위는 Task의 repository·branch 전체입니다.
- approval pending, lease 상실, timeout 또는 ambiguous mutation 상태에서는 새 writer나 provider failover를 시작하지 않습니다.
- stale `attemptId`의 event·result·push를 거부합니다.

## 4.3 위험 기반 검수

| 위험 | 완료 Gate |
|---|---|
| Low read-only | 결정적 근거 + Lead 점검 |
| Medium durable change | writer와 분리된 review run + 관련 검사 |
| High security·permission·deploy·data·external side effect | 별도 identity/run verifier + 결정적 evidence + 필요한 사용자 승인 |

#28의 첫 변경 E2E는 위험 등급과 관계없이 detached verifier를 필수로 둡니다. Verifier는 검수 대상 mutation scope의 write credential을 받지 않습니다.

## 5. 표준 상태

| Status | 의미 |
|---|---|
| `queued` | 요청 접수 |
| `resolving-context` | 프로젝트와 기준 문서 탐색 |
| `planning` | Lead·worker·risk·scope 결정 |
| `awaiting-approval` | 에던 승인 대기 |
| `waiting-for-host` | local worker 연결 대기 |
| `blocked-quota` | 구독 한도 재설정 또는 안전한 failover 대기 |
| `executing` | 실제 작업 수행 |
| `verifying` | 결정적 검사와 독립 검수 |
| `completed` | Result 영속화와 모든 필수 Gate 충족 |
| `blocked` | 입력·권한·외부 조건 부족 |
| `failed` | 실패와 복구 정보 기록 완료 |
| `cancelled` | 사용자 또는 정책에 의해 취소 |

모든 상태 전이는 Runtime state machine이 검증하고 `statusVersion`을 단조 증가시킵니다. Result가 durable store에 기록되고 필수 evidence와 review가 PASS하기 전에는 `completed`로 전이할 수 없습니다.

## 6. Task Packet

초기 canonical Task는 하나의 GitHub Issue에 저장합니다. #28 MVP는 Child Issue나 무제한 DAG 대신 bounded `workerRuns[]`를 사용합니다.

```yaml
taskId:
accountableLead:
riskClass:
routingDecision:
  selectedWorkers: []
  notSelected: []
mutationLockKey:
workerRuns: []
attemptId:
status:
statusVersion:
resultRef:
receiptRef:
callbackOutbox:
```

필요하면 worker가 task branch에 다음을 materialize합니다.

```text
10_Projects/<ProjectName>/Tasks/<TaskId>/TASK.yaml
10_Projects/<ProjectName>/Tasks/<TaskId>/RESULT.yaml
10_Projects/<ProjectName>/Tasks/<TaskId>/EVIDENCE.md
10_Projects/<ProjectName>/Tasks/<TaskId>/RUN.jsonl
```

## 6.1 Result와 execution receipt

최소 항목은 다음과 같습니다.

- Task ID, Accountable Lead, run/attempt ID
- 실제 provider·worker·model
- repository·base SHA·branch·commit/diff hash
- artifact·변경 파일
- acceptance criterion별 PASS/FAIL/Not Checked와 evidence
- test·secret scan 결과
- verifier identity·independence class·verdict
- routing decision과 주요 미선택 surface 사유
- callback/outbox 상태
- 남은 위험

Raw reasoning, credential, 전체 stdout/stderr와 local absolute path는 저장하지 않습니다.

## 7. Context Loading

1. `AI_CONTRACT.md`
2. `CURRENT_STATE.md`
3. 현재 provider adapter
4. 프로젝트 `PROJECT_CONFIG.md`
5. 프로젝트 `CURRENT.md`, `SESSION_HANDOFF.md`
6. 현재 Task Packet·checkpoint·evidence
7. 직접 관련된 SPEC·DECISIONS·SOURCES

## 8. 플랫폼 우회

- Dex plugin/MCP tool이 현재 Chat 또는 Work에 사용 가능하면 직접 사용합니다.
- plugin이 미설치·미연결·정책상 비활성·tool unavailable이면 PWA deep link로 우회합니다.
- hosted write scope가 비활성이면 PWA 또는 GitHub Task Bus로 제출합니다.
- local worker가 필요하고 host가 꺼져 있으면 같은 Task ID를 `waiting-for-host`로 유지합니다.
- 원래 native thread callback을 보장할 수 없으면 PWA result inbox와 read-only status/result tool로 반환합니다.
- callback 실패는 Task 재실행 사유가 아닙니다.
- 이미 접수된 요청을 사용자에게 다시 입력하게 하지 않습니다.

## 8.1 Result delivery

1. canonical Result와 receipt를 먼저 저장하고 hash를 확인합니다.
2. Task 상태를 갱신합니다.
3. 요청 surface callback 또는 notification을 outbox로 시도합니다.
4. callback이 실패해도 Result를 유지하고 worker를 재실행하지 않습니다.
5. 사용자는 PWA result inbox 또는 `get_task_result(taskId)`로 같은 결과를 회수합니다.

원래 열려 있는 chat으로의 즉시 반환은 최적 경로지만, 닫힌 임의의 기존 thread로 결과를 강제 삽입하는 기능은 완료 기준이 아닙니다.

## 9. 승인 정책

| 행동 | 기본 정책 |
|---|---|
| 읽기·검색·분석 | 자동 허용 |
| 초안 생성 | 저위험 범위 허용 |
| 기존 파일 수정 | diff 또는 승인된 정책 기반 |
| 삭제·대량 이동 | 사전 승인 |
| Git push | 승인된 task branch 또는 사전 승인 |
| main merge | `AI_CONTRACT.md` §9·§12.1 |
| 외부 메시지·배포·결제 | 에던 승인 |
| API·추가 사용량 전환 | 금지, 별도 명시 승인 필요 |

## 10. Provider handoff

대화 전문 대신 Task Packet, 마지막 checkpoint, 실제 diff·artifact, evidence, 실패 원인과 do-not-repeat, 남은 acceptance criteria, 승인 상태를 넘깁니다.

## 11. 완료 정의

- acceptance criteria 확인
- 결과물 또는 diff 식별
- validation·독립 검수·source/render evidence 기록
- PASS·FAIL·Not Checked와 잔여 위험 분리
- canonical Result/receipt 영속화
- Task state·decision·handoff 갱신
- 필요한 승인 미완료 시 `completed` 금지

## 12. 단계적 구현 Gate

### Gate 0 — 승인 host와 보안

- Runtime PR #27 child-environment isolation: PASS
- Runtime #17 Codex 0.151 Doctor·compatibility·status·model/list: 기존 승인 완료/closed. 새 host·계정·버전은 별도 검증해요.
- hosted write, paid API와 automatic extra usage: disabled

### Gate 1 — Runtime #28 bounded MVP

- 하나의 Task Issue와 bounded `workerRuns[]`
- 하나의 Codex writer
- deterministic Watchdog와 detached verifier
- durable Result/receipt
- PWA result inbox와 read-only status/result
- Child Issue·DAG·multi-writer 없음

### Gate 2 — Runtime #34 Work/mobile flow

#28의 공통 안전 + 선택한 실행 환경 검증 PASS 뒤 least-privilege `dex:task:submit` scope, idempotent `submit_task`, read-only status/result, plugin `.app.json` connection과 surface E2E를 검증합니다.

### Gate 3 — Task control

별도 `dex:task:control` scope로 one-time approve·decline·cancel만 검토합니다. Submit scope와 합치지 않습니다.

### Gate 4 — Runtime #35 worker 확대

#28의 공통 안전 + 선택한 실행 환경 검증 PASS 뒤 read-only planning/research 병렬화와 risk-based verifier를 bounded fan-out/fan-in으로 검증합니다. Claude reviewer와 file ingest는 각각 독립 Gate이며 multi-writer는 비목표입니다.

## 12.1 Gate의 적용 범위 — 2026-09-12

[기기 독립 기준](DEVICE_INDEPENDENT_EXECUTION.md)이 공통 기능, 기기 접근, 실행 환경별 선행 조건을 정의해요. Windows의 미완료를 Dex 전체 사용의 필수 차단 조건으로 사용하지 않아요. 현재 #28 OPEN, #34/#35 blocked는 실제 증거가 부족하므로 유지해요. 이미 허용된 읽기·PWA·GitHub 및 검증된 경로는 각자의 기준으로 사용할 수 있어요. 배포·hosted write·worker 확대를 단순한 문서 변경으로 활성화하지 않아요.
