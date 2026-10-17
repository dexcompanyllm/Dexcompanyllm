# Codex Operating Guide

> Legacy reference only — 아래는 과거 Codex·Obsidian 중심 운영안내이며 현재 Bootstrap 지침으로 적용하지 않아요. 최신 기준은 [AI_CONTRACT](../AI_CONTRACT.md) §5의 모든 AI 공통 업무 원칙과 현재 AI의 진입 문서([AGENTS](../AGENTS.md), [CLAUDE](../CLAUDE.md), [GEMINI](../GEMINI.md))예요. 같은 Task·상태·품질 기준을 이어받고 실제 도구·인증·권한의 가용성을 별도로 확인해요. 과거 본문은 이력 확인용으로 보존해요.

## 목적

이 폴더는 덱스 컴퍼니의 전역 운영 문서, 재사용 프롬프트, 세팅 handoff를 보관하는 곳입니다.

프로젝트별 `CURRENT.md`, `SESSION_HANDOFF.md`, `QA_REPORT.md`는 `10_Projects/<ProjectName>/` 안에 둡니다.

## 기본 작업 흐름

0. Codex 개인 맞춤형 지침에는 `DEX_COMPANY_CUSTOM_INSTRUCTIONS_RECOMMENDED.md`의 내용을 사용합니다.
1. 새 작업은 `new-obsidian-codex-project.ps1`로 프로젝트 폴더를 만듭니다.
2. rough requirements, PRD, spec, screen, data notes, source notes를 프로젝트 폴더에 넣습니다.
3. 구조가 헷갈리면 `OBSIDIAN_USAGE_GUIDE.md`를 읽습니다.
4. 전체 운영 계약은 `DEX_COMPANY_OVERVIEW.md`에서 확인합니다.
5. 역할, tool surface, execution mode, skill 후보는 `ROLE_TOOL_SKILL_MATRIX.md`에서 확인합니다.
6. 설치된 skill과 보류 후보는 `ROLE_SKILL_INSTALL_AUDIT.md`에서 확인합니다.
7. `ROLE_SKILL_ROUTING.md`를 읽고 가장 작은 local skill sequence를 고릅니다.
8. 모델과 추론 레벨은 `CODEX_MODEL_ROUTING_GUIDE.md`를 따릅니다. 토큰 최소화보다 한 번에 제대로 끝내는 것을 우선합니다.
9. 기획/명세가 부족하면 Codex가 프로젝트 폴더 안에서 보강합니다.
10. `PROJECT_CONFIG.md`로 프로젝트 폴더와 실제 코드 저장소를 연결합니다.
11. 구현은 실제 코드 저장소에서 진행합니다.
12. 실질적인 `/role` 작업 뒤에는 `dex-watchdog`으로 최종 점검합니다.
13. handoff, QA summary, watchdog verdict를 프로젝트 폴더에 기록합니다.

## 언어 원칙

- 파일명, 폴더명, YAML/frontmatter key, script name은 영어를 유지합니다.
- 사람이 읽는 설명, 가이드, 예시, 보고 문장은 한국어를 기본으로 합니다.
- 원본 source note는 출처 보존을 위해 원문 언어를 유지할 수 있습니다.
