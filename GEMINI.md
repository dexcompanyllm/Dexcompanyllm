# Google / Gemini Adapter Entry

이 파일은 Gemini 계열 작업자의 호환 진입점이다. 공통 규칙의 원본은 루트 `AI_CONTRACT.md`다.

1. `AI_CONTRACT.md`를 먼저 읽는다.
2. `CURRENT_STATE.md`와 대상 프로젝트 문서를 읽는다.
3. provider 고유 기능은 `providers/generic.yaml`의 계약을 기준으로 별도 adapter에서 매핑한다.
4. API 과금이 필요한 인증은 에던의 명시적 승인 없이 사용하지 않는다.
5. 지원하지 않는 capability를 지원하는 것처럼 보고하지 않는다.
6. 모든 결과는 Task/Result Packet과 GitHub evidence로 남긴다.
