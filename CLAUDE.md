# Anthropic / Claude Adapter Entry

이 파일은 Claude·Claude Code 계열 작업자의 얇은 진입점이다. 공통 규칙의 원본은 루트 `AI_CONTRACT.md`다.

## Bootstrap

1. `AI_CONTRACT.md`를 먼저 읽는다.
2. `CURRENT_STATE.md`를 읽는다.
3. 대상 프로젝트의 `PROJECT_CONFIG.md` → `CURRENT.md` → `SESSION_HANDOFF.md` → 현재 Task Packet 순으로 읽는다.
4. Anthropic 최적화는 `providers/anthropic.yaml`을 적용한다.
5. 역할과 capability는 `20_Codex_Handoff/ROLE_CAPABILITY_MATRIX.md`를 적용한다.

## Claude 사용량: 품질 우선

- Claude·Claude Code에서 실제 Anthropic 실행을 할 때는 `providers/anthropic.yaml`의 `usagePolicy`를 적용해요. OpenAI/ChatGPT Plus의 `plus-efficient` 절약형 라우팅을 상속하지 않아요.
- Dex 자체의 입력·출력·추론 토큰 예산이나 답변 길이 상한을 추가하지 않아요. 필요한 원문·예외·대안·검증을 토큰 절약 때문에 생략하거나 약한 모델로 강제하지 않아요.
- 작업에 적합한 가용 모델과 추론 강도를 사용하고, 완료 기준을 충족할 만큼 분석·작성·검증해요. 짧은 요청을 억지로 늘리거나 완료한 검사를 이유 없이 반복하지 않아요.
- 최소 컨텍스트 원칙은 관련성과 보안을 위한 기준이에요. 필요한 근거를 잘라 내는 숫자 예산이 아니며, 불확실성·충돌·검증 필요가 있으면 원문과 검사 범위를 넓혀요.
- 실제 Anthropic 계정·workspace의 사용량·문맥·모델 한도는 준수해요. 구독 포함량이 끝나면 기존 checkpoint/failover/wait 규칙을 따라요. 유료 API·usage credit·추가 결제 자동 사용은 허용하지 않아요.
- Claude에서 OpenAI/Codex로 넘긴 실행은 실제 OpenAI 계정의 정책을 따라요. Claude의 여유 사용량이 OpenAI 사용권으로 이전되지는 않아요.
- 이 정책은 승인 main을 읽은 Claude의 지침이에요. 계정 설정·UI 모델·실행 중 세션·Runtime 기능이 자동 변경되거나 연결이 완료됐다는 뜻은 아니에요.

## Plus 전환 작업 인계

- `20_Codex_Handoff/PLUS_MAINTENANCE_START.md`에서 같은 Task ID와 완료된 기준선을 확인한다.
- 원본 Task의 목표·범위·승인·commit·evidence를 유지하고, 미완료 항목만 재개한다. 외부 AI 수신 확인 전에는 인계 완료로 표시하지 않는다.
- 같은 세션에서 이미 읽은 파일은 승인 main과 blob SHA가 동일할 때 재출력하지 않는다. 새 세션이나 SHA 변경 때는 필요한 원문을 다시 읽는다.
- 회사 workspace에 개인 프로젝트를 연결할 때는 해당 계정의 repository 접근·조직 정책을 확인한다. 계정 전환을 권한 확대나 데이터 전송 승인으로 간주하지 않는다.

## 공통 업무와 Anthropic 실행 경로

ChatGPT·Work·Codex·Claude·Claude Code·Gemini 등 모든 AI는 같은 Dex Company의 정책·지식·Task·품질 기준을 사용해 기획·디자인·리서치·문서 작성·개발·QA 등 모든 업무를 수행해요. AI 제품명이나 공급자별로 업무 역할을 고정하거나 독점 배정하지 않아요.

- Claude·Claude Code는 실제 도구와 승인 범위에서 모든 업무를 수행해요. 분석 전용·코딩 전용·대체 담당으로 고정하지 않아요.
- Remote MCP connector와 Claude Code 등은 기능을 연결하는 실행 경로예요. 현재 세션의 실제 지원·인증·권한·host를 확인하고 기능 미지원과 업무 역할을 구분해요.
- 현재 환경에서 가능한 업무는 직접 완료하고, 필요한 capability가 부족할 때만 승인된 경로로 이어가요. 같은 Task·상태·결과와 기존 독립 검수 기준을 유지해요.

## 인증과 비용

- Claude/Claude Code 구독 로그인을 우선한다.
- `ANTHROPIC_API_KEY`가 설정돼 있으면 subscription-only worker는 실행을 중지한다.
- API credit 또는 추가 사용량으로 자동 전환하지 않는다.
- `claude -p` 또는 Agent SDK의 구독 적용 정책은 실행 전에 현재 공식 정책과 인증 상태를 확인한다.
- 사용량 한도에 도달하면 작업을 checkpoint하고 다른 구독 provider로 failover하거나 대기한다.

## 변경과 검증

- OpenAI worker의 추론을 사실로 그대로 승계하지 않고 실제 파일과 evidence를 다시 확인한다.
- 요청 범위만 수정한다.
- 삭제·대량 이동·main merge·배포는 에던 승인을 받는다.
- 결과는 Task/Result Packet과 handoff에 남긴다.
