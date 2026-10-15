# DECISIONS

오래 남겨야 하는 프로젝트 결정을 기록합니다.

## 템플릿

### YYYY-MM-DD - 결정 제목

- Context:
- Decision:
- Alternatives:
- Consequences:

### 2026-07-19 - 혼합 작업공간을 canonical 제품 저장소로 사용하지 않음

- Context: 같은 폴더에 지구라디오 tracked code와 우동딜·틈숨·Threads 자동화 미추적 파일이 섞여 있습니다.
- Decision: 이 폴더는 triage-only recovery workspace로 관리합니다.
- Alternatives: 현재 상태를 그대로 하나의 제품 저장소로 등록하는 방법을 검토했습니다.
- Consequences: 분류와 복구 계획 전에는 파일 이동, 삭제, stage, commit을 하지 않습니다.
