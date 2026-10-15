# Dex 자동화 알림 책임

## 대표 책임

| 자동화 | 대표 사용자 알림 | 나머지 작업 |
|---|---|---|
| OpenAI·Codex 업데이트 추적 | ChatGPT/Codex 제품·정책·플랫폼 변화 | 공식 근거와 rollout 상태 |
| OpenAI·Codex Dex 최적화 | 실제 Dex branch/PR/main 반영, 새 실패·blocker, 에던 행동 필요 | 같은 제품 사실은 링크만 기록 |
| Dex 문서 동기화 주간 | read-only 문서 drift | 수정하지 않고 최소 correction scope |
| Dex 핵심 Gate 감시 | Issue 28과 dependent 34/35의 Gate 변화 | 과거 PR 27/Issue 17 반복 알림 금지 |
| Codex 리셋 사전 알림 | reset teaser·예정 window·확정 신호 | 일반 제품 업데이트와 분리 |
| Dex 스킬 점검·발굴 | Skill source/review/applied/installed lifecycle | 변화 없으면 알림 없음 |

## dedupe key

같은 사실은 아래 조합으로 식별해요.

source authority + source URL/ID + published/observed date + affected surface + canonical commit/Issue + state transition

대표 자동화만 사용자에게 사실을 설명하고 다른 자동화는 아래 중 하나가 있을 때만 별도 알림해요.

- 실제 Dex 변경
- Gate 상태 전이
- 새로운 FAIL 또는 blocker
- 에던이 해야 할 최소 행동

단순 재확인, 같은 Not Checked 유지, 같은 source와 같은 상태는 알림하지 않아요.

## 이번 적용

- OpenAI·Codex 업데이트 추적: 제품 변화 대표 알림과 reset-only 제외를 prompt에 추가했어요.
- OpenAI·Codex Dex 최적화: 실제 Dex 변경·실패·행동이 있을 때만 별도 알림하도록 추가했어요.
- Dex 핵심 Gate 감시: Issue 28/34/35와 필요 시 190을 현재 범위로 지정하고 PR 27/Issue 17 반복을 중단하도록 추가했어요.
- 문서 동기화, reset, skill 자동화는 현재 역할이 이미 분리돼 있어 prompt를 바꾸지 않았어요.

일정, enabled 상태, 요금, 권한, 23:00~05:59 quiet window는 바꾸지 않았어요. 자동화를 pause/delete/reschedule하지 않았어요.

