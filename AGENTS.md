# OpenAI / Codex Adapter Entry

이 파일은 OpenAI·Codex 계열 작업자의 얇은 진입점이다. 공통 규칙의 원본은 루트 `AI_CONTRACT.md`다.

## Bootstrap

1. `AI_CONTRACT.md`를 먼저 읽는다.
2. `CURRENT_STATE.md`를 읽는다.
3. 대상 프로젝트의 `PROJECT_CONFIG.md` → `CURRENT.md` → `SESSION_HANDOFF.md` → 현재 Task Packet 순으로 읽는다.
4. OpenAI 최적화는 `providers/openai.yaml`을 적용한다.
5. 역할과 capability는 `20_Codex_Handoff/ROLE_CAPABILITY_MATRIX.md`를 적용한다.
6. 중요한 운영 작업은 `20_Codex_Handoff/DEX_COMPANY_OVERVIEW.md`와 관련 정책 문서를 확인한다.
7. 기존 Codex local skill이 필요한 작업은 `20_Codex_Handoff/ROLE_TOOL_SKILL_MATRIX.md`, `20_Codex_Handoff/ROLE_SKILL_ROUTING.md`, `20_Codex_Handoff/CODEX_MODEL_ROUTING_GUIDE.md`를 OpenAI adapter 참고자료로 읽되 canonical role 정의보다 우선하지 않는다.
8. 지식관리 작업은 `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md`, `20_Codex_Handoff/LLM_WIKI_VERIFICATION_SCHEMA.md`, `30_Knowledge/LLM_Wiki/index.md`를 먼저 읽는다.

## Plus 유지보수와 같은 작업 이어가기

- Plus 전환·운영 작업은 `20_Codex_Handoff/PLUS_MAINTENANCE_START.md`의 완료 기준선과 다음 실행만 추가로 읽는다.
- 시작 시 승인 main SHA를 확인한다. 같은 세션에서 이미 읽은 파일의 blob SHA가 같으면 내용을 다시 출력하지 않는다. SHA가 바뀌거나 새 세션이면 필요한 원문을 다시 확인한다.
- 여러 상태 문서의 동일한 `DEX_CURRENT_STATUS` 블록은 완전 일치가 확인된 경우 한 번만 문맥에 넣고, 각 파일의 고유 정책·결정·Task 내용은 보존한다. 요약만으로 정책을 대체하지 않는다.
- 날짜가 오래된 공통 스냅샷 때문에 완료된 구현을 반복하지 않는다. 해당 Task의 최신 승인 receipt와 exact SHA 검증을 대조한다.
- Runtime의 Plus 모델 라우팅은 `account/read`와 model catalog를 통과한 worker에만 적용된다. Chat/Work 화면의 모델이 자동으로 바뀌었다고 말하지 않는다.

## 공통 업무와 OpenAI 실행 경로

ChatGPT·Work·Codex·Claude·Claude Code·Gemini 등 모든 AI는 같은 Dex Company의 정책·지식·Task·품질 기준을 사용해 기획·디자인·리서치·문서 작성·개발·QA 등 모든 업무를 수행해요. AI 제품명이나 공급자별로 업무 역할을 고정하거나 독점 배정하지 않아요.

- ChatGPT·Work·Codex는 각각의 실제 도구와 승인 범위에서 모든 업무를 수행해요. 기획 전용·문서 전용·구현 전용으로 나누지 않아요.
- Codex App Server 등은 실제 실행을 연결하는 adapter이며 업무 역할의 독점 주체가 아니에요.
- 현재 환경의 capability가 충분하면 같은 AI에서 완료해요. 부족한 capability만 승인된 실행 경로로 연결하며 원래 Task와 책임·결과를 유지해요. 사용자가 Chat·Work·Codex를 수동으로 순회하는 필수 단계는 없어요.

## 인증과 비용

- Codex는 `Sign in with ChatGPT` 또는 App Server `chatgpt` 인증만 사용한다.
- API key 인증과 자동 유료 fallback은 금지한다.
- `OPENAI_API_KEY`가 설정돼 있으면 subscription-only worker는 실행을 중지한다.
- 사용량 한도에 도달하면 다른 구독 provider로 failover하거나 대기한다.

## 플랫폼 제약

- ChatGPT custom MCP는 현재 플랫폼·요금제에 따라 기능 차이가 있다.
- 지원되지 않는 write action과 모바일 사용은 `dexcompany.app` 또는 GitHub Task Bus로 우회한다.
- Local Work와 로컬 Codex 작업은 연결된 host가 필요하다.

## Local Git 실행 규칙

- 로컬 worker는 작업 전 `git pull --ff-only` 또는 task branch 동기화를 확인한다.
- 같은 파일을 여러 worker가 동시에 수정하지 않는다.
- 충돌은 자동 덮어쓰기하지 않고 변경 의도를 비교한다.
- 장시간 작업은 작은 commit으로 나누고 push 후 원격 ref 일치를 확인한다.

## 변경과 검증

- 요청 범위만 수정한다.
- 삭제·대량 이동·main merge·배포는 에던 승인을 받는다.
- 변경 뒤 diff, 테스트, 링크, UTF-8, secret 검사를 가능한 범위에서 실행한다.
- 결과는 Task/Result Packet과 handoff에 남긴다.
- LLM Wiki 작업에서는 raw source 보존, verification metadata, `source-backed`/`inference`/`not checked` 구분을 유지한다.
- 실질적인 역할 작업은 `20_Codex_Handoff/DEX_QUALITY_LEARNING_RULES.md`와 Watchdog 기준으로 최종 점검한다.
