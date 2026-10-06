# Dex Company — Provider-Neutral AI Operating Knowledge Base

Dex Company는 특정 AI 회사·모델에 종속되지 않는 공통 업무 운영 기준(SSOT)입니다.

현재와 미래의 AI, Agent, 모델, 로컬/클라우드 실행기, 도구 및 자동화 시스템은 실제 capability가 확인되면 동일한 기준 아래 참여할 수 있습니다. 특정 제품명은 호환용 adapter/entry point일 뿐 canonical 범위를 제한하지 않습니다.

## Source of Truth
- 승인된 최신 `main`을 기준으로 합니다.
- AI 대화 기억, 개별 서비스 메모리, 로컬 경로는 canonical source가 아닙니다.
- 충돌 시 최신 `main`의 명시적 규칙을 우선합니다.

## Start
새로운 AI/Agent/Runtime은 먼저 `BOOTSTRAP.md`를 읽습니다. Bootstrap은 Reset이 아니라 **SSOT 로드 + Capability 확인 + 작업 준비**를 뜻합니다.

1. `BOOTSTRAP.md`
2. `AI_INSTRUCTIONS.md`
3. `AGENTS.md`
4. 필요한 `skills/`
5. 필요한 `playbooks/` 및 `templates/`

## Principles
Provider-neutral · Evidence-first · Generate → Execute → Validate · Repeated Error → Validation Gate · Human Review · Least Context · No confidential data.

Provider별 파일은 호환성을 위한 얇은 진입점이며, 새로운 AI를 지원하기 위해 canonical core를 수정할 필요가 없어야 합니다.
