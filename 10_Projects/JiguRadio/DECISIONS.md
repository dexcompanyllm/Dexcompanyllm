# DECISIONS

오래 남겨야 하는 프로젝트 결정을 기록합니다.

## 템플릿

### YYYY-MM-DD - 결정 제목

- Context:
- Decision:
- Alternatives:
- Consequences:

### 2026-07-20 - Sites 인수본을 검증 전 기존 canonical과 병합하지 않음

- Context: `earthradio.kr` 운영 v40과 후속 인수 commit은 기존 `global-radio-pwa` 안정판 및 `global-radio-renewal`과 다른 코드/이력입니다. 인수 package는 현재 ChatGPT Library에만 있고 전문을 아직 읽지 못했습니다.
- Decision: package의 checksum, Git 이력, `AGENTS.md`, `CODEX_HANDOFF.md`, 전체 검증을 완료할 때까지 Sites 인수본을 별도 유입 대기로 취급하며 기존 저장소를 덮어쓰거나 병합하지 않습니다.
- Alternatives: 안정판 또는 리뉴얼 저장소에 바로 덮어쓰기, 현재 혼합 복구 폴더에서 이어서 작업하기.
- Consequences: 즉시 기능 개발보다 보안 사고 대응과 package 확보가 우선이며, import는 새 비공개 저장소/작업공간에서 시작합니다.
