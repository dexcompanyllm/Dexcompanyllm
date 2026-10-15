# DEX_COMPANY_OVERVIEW

## 이름

Dex Company / 덱스 컴퍼니

## 정의

Dex Company는 에던님이 Codex를 프로젝트 실행 에이전트로 쓰기 위한 역할 기반 운영체계입니다.

구성 요소는 다음과 같습니다.

- Dex/Codex: 실행 에이전트
- `/PM`, `/PL`, `/기획자`, `/디자이너`, `/퍼블리셔`, `/개발자`, `/QA`, `/바이브코딩`, `/구직자`, `/지식관리`: 역할 명령
- Codex local skills와 검토된 외부 skill 후보
- Obsidian project memory와 handoff files
- `30_Knowledge/LLM_Wiki/`: 출처 기반 재사용 지식 계층
- `dex-watchdog`: 실질적인 역할 작업 뒤 최종 점검 gate
- Codex-only execution: 기본 흐름은 Codex와 Obsidian 안에서 끝냅니다.

## 운영 계약

1. 에던님이 가능한 경우 역할 명령으로 작업을 시작합니다.
2. 덱스는 역할, 도구, skill, 프로젝트 context 문서를 읽습니다.
3. 덱스는 선택한 역할, tool surface, execution mode, skills, assumptions, next action을 `CURRENT.md`에 기록합니다.
4. 덱스는 요청된 산출물을 실제로 구현하거나 작성합니다.
5. 덱스는 가능한 가장 강한 증거로 검증합니다.
6. 여러 프로젝트에서 다시 쓸 지식만 `30_Knowledge/LLM_Wiki/`로 승격합니다.
7. 필요하면 `QA_REPORT.md`, `SESSION_HANDOFF.md`, `DECISIONS.md`, `SOURCES.md`를 갱신합니다.
8. 실질적인 `/role` 작업 뒤에는 `dex-watchdog`을 실행합니다.
9. 최종 보고에는 변경 내용, 검증 내용, 남은 리스크, watchdog 판정을 포함합니다.

## 기준 문서

전역 운영 문서는 `20_Codex_Handoff/`에 있습니다.

- `DEX_COMPANY_OVERVIEW.md`
- `DEX_QUALITY_LEARNING_RULES.md`
- `OBSIDIAN_USAGE_GUIDE.md`
- `ROLE_TOOL_SKILL_MATRIX.md`
- `ROLE_SKILL_ROUTING.md`
- `ROLE_SKILL_INSTALL_AUDIT.md`
- `PROMPT_LIBRARY.md`
- `OPERATING_GUIDE.md`
- `SETUP_QA.md`
- `LLM_WIKI_OPERATING_GUIDE.md`
- `LLM_WIKI_VERIFICATION_SCHEMA.md`
- `ONEDRIVE_SYNC_GUIDE.md`
- `DEX_COMPANY_CUSTOM_INSTRUCTIONS_RECOMMENDED.md`

재사용 지식은 `30_Knowledge/LLM_Wiki/`에 있습니다.

- `sources/`: 원본 출처 보존 노트
- `wiki/`: 정리된 concepts, entities, guides, maps
- `queries/`: 다시 쓸 답변과 synthesis notes
- `lint/`: health-check snapshots
- `audit/`: 전체 지식 상태 점검 리포트
- `index.md`: LLM Wiki 진입점
- `log.md`: 변경 로그

프로젝트별 상태는 `10_Projects/<ProjectName>/`에 둡니다.

- `AGENTS.md`
- `PROJECT_CONFIG.md`
- `CONTEXT_MAP.md`
- `PRD.md`
- `SPEC.md`
- `SCREEN_FLOW.md`
- `DATA_MODEL.md`
- `CURRENT.md`
- `SESSION_HANDOFF.md`
- `QA_REPORT.md`
- `DECISIONS.md`
- `SOURCES.md`

## 품질 기준

- 역할 라우팅이 명확해야 합니다.
- 선택한 skill은 실제 작업에 필요한 최소 조합이어야 합니다.
- 기본 운영 모델은 Codex-only입니다.
- LLM Wiki는 synthesis 전에 source provenance를 보존해야 합니다.
- 외부 skill은 검토 가능하고 되돌릴 수 있어야 합니다.
- 외부 채팅 에이전트나 유료 에이전트는 필수 단계가 아닙니다.
- Obsidian Sync는 에던님이 의도적으로 켜기 전까지 꺼진 상태를 유지합니다.
- 검증 결과는 `Success`, `Failed`, `Not Checked`를 구분합니다.
- 실질적인 `/role` 작업 뒤에는 `dex-watchdog`을 실행합니다.

## Ready 상태의 의미

Dex Company가 정상 준비된 상태는 다음을 의미합니다.

- Vault에 필수 handoff files가 있습니다.
- LLM Wiki가 `index.md`, `log.md`, source/wiki/query/lint/audit/schema 구조를 갖습니다.
- 필요한 local skills가 `D:\Program Files\Codex\skills` 아래에 있습니다.
- `career-ops`는 필요한 `modes/` 폴더를 갖습니다.
- `codex-ppt` runtime이 준비되어 있습니다.
- `dex-watchdog` skill validation이 통과합니다.
- 의도하지 않은 외부 에이전트 runtime 흔적이 없습니다.
- Obsidian Sync는 명시적으로 켜기 전까지 꺼져 있습니다.
- project creation dry-run이 role routing, install audit, watchdog, QA, handoff files를 포함합니다.
