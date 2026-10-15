# Provider Adapters

Canonical 업무 정의는 루트 `AI_CONTRACT.md`와 `ROLE_CAPABILITY_MATRIX.md`에 둔다. 이 폴더는 각 공급자의 고유 강점을 실제 모델·surface·tool·인증 방식에 매핑한다.

## 원칙

- Provider 독립은 최저공통분모가 아니다.
- 공급자별 최적 모델, 추론 강도, tool과 platform limitation을 여기에서 명시한다.
- 모델 ID가 바뀌면 adapter만 갱신한다.
- Runtime은 가능한 경우 모델 목록과 capability를 동적으로 발견한다.
- 고정 모델이 사라지면 임의의 약한 모델로 조용히 대체하지 않고 fallback 근거를 기록한다.
- API key와 자동 유료 fallback은 기본 금지다.

## 파일

- `openai.yaml`
- `anthropic.yaml`
- `generic.yaml`
