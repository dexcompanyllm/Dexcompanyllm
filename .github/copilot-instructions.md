# GitHub Copilot Adapter

- 루트 `AI_CONTRACT.md`가 canonical 규칙이다.
- 작업 전 `CURRENT_STATE.md`와 대상 프로젝트의 `PROJECT_CONFIG.md`, `CURRENT.md`, `SESSION_HANDOFF.md`를 읽는다.
- 요청 범위만 수정하고 기존 사용자 변경을 보존한다.
- Secret, API key, token을 코드·문서·로그에 넣지 않는다.
- 비용이 발생하는 API 또는 배포는 자동 실행하지 않는다.
- 변경 뒤 가능한 테스트와 diff 검증을 수행하고 미확인 항목을 명시한다.
