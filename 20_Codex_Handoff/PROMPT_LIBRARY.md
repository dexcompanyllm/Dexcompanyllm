# Prompt Library

## Start A Project

덱스, `10_Projects/<ProjectName>/`의 `ROLE_TOOL_SKILL_MATRIX.md`, `ROLE_SKILL_ROUTING.md`, `CONTEXT_MAP.md`, `PRD.md`, `SPEC.md`, `SCREEN_FLOW.md`, `DATA_MODEL.md`를 읽고, 현재 작업에 맞는 `/역할` 명령과 스킬을 `CURRENT.md`에 기록한 뒤 진행해주세요. 부족한 기획/명세는 Codex가 직접 보강한 뒤 실제 코드 저장소의 구조를 확인하고 구현을 시작해주세요. 필요한 경우 위키링크까지 따라가며 관련 문서를 확인하세요. 가정은 `CURRENT.md`에 남기고, 완료 후 `QA_REPORT.md`와 `SESSION_HANDOFF.md`를 업데이트하고 `dex-watchdog` 최종 감사를 실행한 뒤 watchdog 판정을 함께 보고해주세요.

## Role Command Examples

`/PM` 신규 서비스 아이디어를 PRD와 우선순위표로 정리해주세요.

`/PL` 이 기능을 구현 가능한 WBS와 리스크 목록으로 쪼개주세요.

`/기획자` 관리자 화면을 PPT 화면설계서 형태로 정리해주세요.

`/디자이너` 이 화면의 UX/UI 문제와 개선안을 리뷰해주세요.

`/퍼블리셔` 이 화면을 반응형 HTML/CSS/JS로 구현해주세요.

`/개발자` 이 기능을 테스트와 함께 구현해주세요.

`/QA` 엑셀 테스트케이스와 브라우저 QA를 같이 진행해주세요.

`/바이브코딩` 아이디어를 바로 실행 가능한 MVP 화면으로 만들어주세요.

`/구직자` 이 공고에 맞춰 이력서, 자기소개서, 포트폴리오 PPT를 준비해주세요.

`/지식관리` 이 자료를 LLM Wiki에 원본 보존, 위키 합성, 질의 가능 구조, lint 기준으로 흡수해주세요.

`/지식관리` 이 자료를 먼저 `00_Inbox/LLM_Wiki`에 대기 노트로 저장하고, 수집 목적과 출처가 충분하면 Raw Source로 승격해줘.

## Resume A Project

덱스, `10_Projects/<ProjectName>/CURRENT.md`와 `SESSION_HANDOFF.md`를 먼저 읽고 이어서 진행해주세요. 다른 프로젝트 폴더는 건드리지 마세요.

## Watchdog After Role Work

`/역할` 작업이 끝나면 최종 응답 전 `dex-watchdog`으로 역할 라우팅, 스킬 선택, QA 증거, Obsidian 기록, 최종 보고 신뢰도를 감사하고 판정을 함께 알려주세요.

## Build Context Packet

덱스, `collect-project-context.ps1`로 `<ProjectName>`의 컨텍스트 패킷을 만든 뒤, 핵심 문서와 위키링크로 연결된 문서를 함께 검토해주세요.

## LLM Wiki Ingest

덱스, `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md`, `LLM_WIKI_VERIFICATION_SCHEMA.md`, `30_Knowledge/LLM_Wiki/index.md`를 먼저 읽고, 이 자료를 `30_Knowledge/LLM_Wiki/sources/`에 원본 보존 노트로 넣은 뒤 재사용 가능한 개념만 `wiki/`로 합성해주세요. 새 wiki note는 `explored: false`로 시작하고, `claimType`, `evidenceScope`, `verificationStatus`, `disputed`를 기록해주세요. 출처, 수집 목적, 확신도, 확인하지 못한 부분을 분리하고 `log.md`를 업데이트한 뒤 `llm-wiki-verify.ps1`와 `llm-wiki-lint.ps1`로 검증해주세요.

## LLM Wiki Query

덱스, `30_Knowledge/LLM_Wiki/index.md`를 읽고 `sources/`와 `wiki/`를 검색한 다음, 실제 노트 내용을 근거로 답해주세요. 답변은 `source-backed`, `Dex inference`, `not checked`로 구분하고, 재사용 가치가 있으면 `queries/`에 질의 노트를 남겨주세요.

## LLM Wiki Lint

덱스, `llm-wiki-status.ps1`와 `llm-wiki-lint.ps1`를 실행해서 LLM Wiki 폴더, 필수 파일, source provenance, wiki traceability, index/log 상태를 점검해주세요. 실패/경고/미확인 항목을 구분해서 고쳐야 할 순서로 보고해주세요.

## LLM Wiki Verify

덱스, 이 노트를 `llm-wiki-verify.ps1`로 검증하고 v5 필드(`claimType`, `evidenceScope`, `verificationStatus`, `verifiedAt`, `verifiedBy`, `disputed`)와 Bias Check 필요 여부를 확인해주세요. 자동으로 `explored: true`로 바꾸지는 마세요.

## LLM Wiki Audit

덱스, `llm-wiki-audit.ps1 -Apply`를 실행해서 LLM Wiki 전체의 v5 누락, unexplored backlog, high confidence without Bias Check, disputed notes, stale notes를 점검하고 audit report를 남겨주세요.

## Review A Project

덱스, `10_Projects/<ProjectName>/`의 문서와 실제 코드 저장소를 비교해서 요구사항 누락, QA 공백, 보안/데이터 위험을 찾아주세요.

