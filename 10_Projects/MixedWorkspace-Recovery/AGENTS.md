# AGENTS.md

## 프로젝트 범위

Project name: MixedWorkspace-Recovery

이 폴더는 덱스 컴퍼니의 독립 프로젝트 노트 영역입니다. 다른 프로젝트의 task, assumption, QA note, decision을 이 폴더에 섞지 않습니다.

Codex는 이 프로젝트 노트를 실제 구현 작업으로 연결하는 책임을 갖습니다.

## 연결된 코드 작업공간

Code path: D:\CodexProjects\고정 파이프 구축

`D:\CodexProjects\고정 파이프 구축`가 `CONFIRM_NEEDED`이면, 코드를 변경하기 전에 에던님에게 실제 코드 폴더를 확인해야 합니다.

## 기준 문서

작업 전에는 가능한 경우 다음 순서로 읽습니다.

1. `ROLE_TOOL_SKILL_MATRIX.md`
2. `ROLE_SKILL_ROUTING.md`
3. `ROLE_SKILL_INSTALL_AUDIT.md`
4. `DEX_COMPANY_OVERVIEW.md`와 전역 `20_Codex_Handoff/DEX_QUALITY_LEARNING_RULES.md`
5. `PRD.md`
6. `SPEC.md`
7. `SCREEN_FLOW.md`
8. `DATA_MODEL.md`
9. `CONTEXT_MAP.md`
10. `PROJECT_CONFIG.md`
11. `DECISIONS.md`
12. `SOURCES.md`
13. `CURRENT.md`
14. `SESSION_HANDOFF.md`
15. `QA_REPORT.md`

## 작업 규칙

- 에던님이 명시적으로 요청하지 않으면 이 프로젝트 폴더 밖을 건드리지 않습니다.
- 현재 작업이 다른 프로젝트를 이름으로 지정하지 않는 한 `10_Projects/`의 다른 프로젝트 폴더를 편집하지 않습니다.
- 중요한 작업 전에는 `DEX_COMPANY_OVERVIEW.md`, `ROLE_TOOL_SKILL_MATRIX.md`, `ROLE_SKILL_ROUTING.md`, `ROLE_SKILL_INSTALL_AUDIT.md`를 읽고 선택한 role/tool surface/execution mode/skills를 `CURRENT.md`에 기록합니다.
- 코드, 디버그, 디자인 작업은 전역 `20_Codex_Handoff/DEX_QUALITY_LEARNING_RULES.md`의 테스트 증거, scope lock, imagegen 기준을 적용합니다.
- 에던님이 `/PM`, `/PL`, `/기획자`, `/디자이너`, `/퍼블리셔`, `/개발자`, `/QA`, `/바이브코딩`, `/구직자`, `/지식관리`로 시작하면 그 역할을 active role로 사용합니다.
- 가정은 명확히 남깁니다.
- `PRD.md`나 `SPEC.md`가 부족하면 구현 전에 프로젝트 폴더 안에서 보강하고 `CURRENT.md`에 가정을 남깁니다.
- 작업 중에는 `CURRENT.md`를 갱신합니다.
- 중요한 작업을 멈추기 전에는 `SESSION_HANDOFF.md`를 갱신합니다.
- 검증 뒤에는 `QA_REPORT.md`를 갱신합니다.
- 실질적인 `/role` 작업 뒤에는 최종 보고 전 `dex-watchdog`을 실행합니다.
- watchdog 판정은 최종 응답에 포함하고, 가능한 경우 `QA_REPORT.md` 또는 `SESSION_HANDOFF.md`에도 기록합니다.
- 구현 작업은 linked code workspace에서 진행합니다. 에던님이 명시한 prototype이 아니라면 note folder 안에 코드를 만들지 않습니다.
- secret, API key, password, private token을 이 폴더에 저장하지 않습니다.
- source document는 `sources/`, 프로젝트 이미지와 파일은 `assets/`에 둡니다.

## 읽기 프로토콜

- Obsidian graph가 자동 context라고 가정하지 않습니다.
- `_index.md`, `ROLE_TOOL_SKILL_MATRIX.md`, `ROLE_SKILL_ROUTING.md`, `CONTEXT_MAP.md`, `PRD.md`, `SPEC.md`부터 읽습니다.
- 배경지식이 필요한 작업은 관련 `[[wikilinks]]`를 따라 실제 노트를 읽습니다.
- 프로젝트 전체 recall이 필요하면 `collect-project-context.ps1`로 context packet을 만듭니다.
- Obsidian CLI가 있으면 vault-aware search와 link-aware reading에 사용합니다.
- Obsidian CLI가 없으면 filesystem search와 explicit file read를 사용합니다.

## 완료 보고 규칙

최종 보고에는 다음을 포함합니다.

- 무엇이 변경되었는지
- 코드나 노트가 어디에서 변경되었는지
- 무엇을 검증했는지
- 무엇이 아직 risky 또는 unverified인지
- 실질적인 `/role` 작업이면 `dex-watchdog` 판정
