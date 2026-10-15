# Dex Company — Shared AI Context

## 목적

AI, 모델, 기기 또는 세션이 바뀌어도 GitHub `main`에서 Dex Company의 작업 방식을 복구하기 위한 공통 컨텍스트다.

## 명칭

- 사용자: 에던 / Ethan
- ChatGPT: 제니 / Jenny
- Codex: 덱스 / Dex

## 운영 모델

- GitHub: 지식·상태·결정·task의 단일 기준정보
- Dex Console PWA: PC·태블릿·모바일 공통 진입점
- Orchestrator: context, role, capability, provider, 승인과 검증 라우팅
- MCP Gateway: ChatGPT·Claude·향후 AI가 같은 기능을 쓰는 표준 인터페이스
- Provider adapter: 각 AI의 모델·도구·surface를 최적화
- Worker: 실제 파일·코드·산출물을 실행
- QA/Watchdog: 완료 기준과 evidence 검증

Obsidian은 공식 구성요소가 아니며 AI 자체 기억과 채팅 기록도 Source of Truth가 아니다.

## 저장소 경계

- `dex-company-wiki`: 프로젝트 상태, 지식, 의사결정, QA, 회의, task, 역할·capability 정책
- `dex-company-runtime`: PWA, Orchestrator, MCP Gateway, provider adapter, worker
- 프로젝트별 코드 저장소: 실제 애플리케이션 소스
- Secret, 인증정보, 개인정보, 로컬 백업과 앱 UI 상태는 Git에 넣지 않는다.

## 공급자 독립성

Canonical 문서는 역할과 capability를 정의한다. 현재 선호 모델, 추론 강도, tool/skill과 플랫폼 제약은 `providers/`에서 관리한다. 이 방식은 공급자 고유 성능을 버리는 것이 아니라 공급자별 최적화를 교체 가능한 계층으로 분리하는 방식이다.

## 프로젝트 등록 규칙

`10_Projects/<ProjectName>/`에 최소 다음을 둔다.

- `PROJECT_CONFIG.md`
- `_index.md` 또는 `README.md`
- `CURRENT.md`
- `SESSION_HANDOFF.md`
- 필요 시 `PRD.md`, `SPEC.md`, `QA_REPORT.md`, `DECISIONS.md`, `SOURCES.md`
- 실질적인 task는 `Tasks/<TaskId>/` 또는 GitHub Issue와 연결한다.

## 현재 확인된 프로젝트

- `DexCompany-Ops`

## 세션 복구 순서

1. GitHub 최신 승인 상태 확인
2. `AI_CONTRACT.md`
3. 현재 provider 진입 파일과 `providers/<provider>.yaml`
4. `CURRENT_STATE.md`
5. 대상 프로젝트 문서
6. 현재 Task Packet, checkpoint와 evidence
7. 작업 뒤 Result Packet, state, handoff, 결정 갱신
