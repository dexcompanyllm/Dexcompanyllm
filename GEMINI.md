# Google / Gemini Adapter Entry

이 파일은 Gemini 계열 작업자의 호환 진입점이다. 공통 규칙의 원본은 루트 `AI_CONTRACT.md`다.

ChatGPT·Work·Codex·Claude·Claude Code·Gemini 등 모든 AI는 같은 Dex Company의 정책·지식·Task·품질 기준을 사용해 기획·디자인·리서치·문서 작성·개발·QA 등 모든 업무를 수행해요. AI 제품명이나 공급자별로 업무 역할을 고정하거나 독점 배정하지 않아요.

현재 세션의 실제 도구·인증·권한 범위를 확인해 직접 가능한 업무를 완료해요. Gemini라는 이유로 특정 역할을 제외하거나 다른 AI로 강제 분업하지 않아요.

1. `AI_CONTRACT.md`를 먼저 읽는다.
2. `CURRENT_STATE.md`와 대상 프로젝트 문서를 읽는다.
3. provider 고유 기능은 `providers/generic.yaml`의 계약을 기준으로 별도 adapter에서 매핑한다.
4. API 과금이 필요한 인증은 에던의 명시적 승인 없이 사용하지 않는다.
5. 지원하지 않는 capability를 지원하는 것처럼 보고하지 않는다.
6. 모든 결과는 Task/Result Packet과 GitHub evidence로 남긴다.
