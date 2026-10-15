# Subscription-first and No Automatic API Billing Policy

- Status: Approved
- Owner: Ethan
- Effective date: 2026-08-22

## 목표

이미 결제한 ChatGPT와 Claude 구독을 우선 사용하고 예기치 않은 API·추가 사용량 청구를 막는다.

## 우선순위

1. ChatGPT 구독에 포함된 Codex
2. Claude 구독에 포함된 Claude Code, 현재 정책상 허용되는 `claude -p`/Agent SDK
3. 다른 구독 provider로 failover
4. 사용량이 재설정될 때까지 queue
5. 유료 API는 기본적으로 사용하지 않음

## OpenAI

- Codex App Server의 `chatgpt` 또는 `chatgptDeviceCode` 인증을 사용한다.
- `apiKey` 인증을 사용하지 않는다.
- `OPENAI_API_KEY`가 존재하면 subscription-only worker를 중지한다.
- 현재 ChatGPT plan과 rate limit을 확인해 Result Packet에 상태만 기록한다.

## Anthropic

- Claude Code에서 Claude 계정 구독 로그인을 사용한다.
- `ANTHROPIC_API_KEY`가 존재하면 worker를 중지한다.
- API credit, 추가 사용량 또는 Console auto-reload로 자동 전환하지 않는다.
- `claude -p`와 Agent SDK의 구독 적용 정책은 변경 가능성이 있으므로 실행 전 공식 상태를 확인한다.

## Runtime 강제 설정

```text
DEX_SUBSCRIPTION_ONLY=true
DEX_ALLOW_PAID_API=false
DEX_AUTOMATIC_PAID_FALLBACK=false
DEX_ALLOW_EXTRA_USAGE=false
```

이 값은 사용자 승인 없이 runtime에서 완화할 수 없다.

## 한도 도달 시

1. 현재 checkpoint와 실제 파일 상태를 저장한다.
2. 아직 실행되지 않은 side effect를 구분한다.
3. 다른 구독 provider가 capability를 충족하는지 확인한다.
4. 가능하면 failover한다.
5. 불가능하면 `blocked-quota`로 두고 에던에게 재설정 시점을 알린다.

## 별도 비용

AI API 비용 0원을 목표로 하지만 다음 비용은 별개다.

- `dexcompany.app` 도메인 등록 또는 갱신
- remote MCP/PWA 호스팅
- GitHub 유료 기능
- 외부 storage, monitoring, email/SMS

각 비용은 도입 전 예상액과 무료 대안을 제시하고 에던 승인을 받는다.

## 금지

- API key를 코드나 GitHub에 저장
- 사용량 한도 후 API로 자동 전환
- Claude extra usage 자동 활성화
- 결제 수단 또는 auto-reload 자동 변경
- 사용자가 모르는 proxy로 구독 credential 전달
