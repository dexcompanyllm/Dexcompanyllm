# Dex Company — Provider-Neutral AI Operating Knowledge Base

Dex Company는 특정 AI 회사·모델에 종속되지 않는 공통 업무 운영 기준(SSOT)입니다.

현재와 미래의 AI, Agent, 모델, 실행기, 도구 및 자동화 시스템은 실제 capability가 확인되면 동일한 기준 아래 참여할 수 있습니다.

## Source of Truth
기본 브랜치 `main`의 현재 canonical 상태를 기준으로 합니다. 승인 여부는 실제 repository policy/review evidence로 확인될 때만 확정합니다. AI 대화 기억, 개별 서비스 메모리, 로컬 경로는 canonical source가 아닙니다.

## Start
새로운 AI/Agent/Runtime은 `BOOTSTRAP.md`를 따릅니다. Bootstrap은 Reset이 아니라 **SSOT 로드 + Capability 확인 + 작업 준비**입니다.

## Principles
Provider-neutral · Evidence-first · Generate → Execute → Validate · Repeated Error → Validation Gate · Human Review · Least Context · Confidential-data boundary.

Provider별 파일은 선택적 호환 adapter이며 canonical core의 범위를 제한하지 않습니다.
