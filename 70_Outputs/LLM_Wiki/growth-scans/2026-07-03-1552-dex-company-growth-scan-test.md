---
type: llm-wiki-growth-scan-report
status: completed
created: 2026-07-03
runAt: 2026-07-03T15:52:53+09:00
mode: manual-test
automationId: dex-company-growth-scan
verifiedBy: Dex
tags:
  - llm-wiki/report
  - dex-company/growth-scan
---

# Dex Company Growth Scan Test - 2026-07-03 15:52 KST

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-03 15:52:53 +09:00
- 검색 범위: 공식 문서, GitHub 저장소/릴리스/RSS, 디자인 시스템 자료, career ops, Obsidian/LLM Wiki, Threads 공개 검색, YouTube 공개 페이지
- 관심 키워드: design systems, AI agents, Codex, OpenAI API, UX research, frontend, Obsidian, LLM Wiki, automation, career ops

## 오늘의 핵심 발견

1. OpenAI Agents SDK 공식 문서는 Responses API와 Agents SDK의 선택 기준을 분명히 나눈다. 덱스 컴퍼니에서는 단순 질의는 Responses API형, 승인/상태/도구 실행이 있는 자동화는 Agents SDK형으로 분류할 수 있다.
2. OpenAI Agents SDK Python v0.17.7은 tool-call streaming, guardrail task cancellation, SQLite session atomicity 같은 자동화 안정성 관련 변경을 포함한다.
3. Codex CLI release feed는 2026-07-03에도 alpha 릴리스가 이어지고 있어, Codex 관련 판단은 항상 로컬 버전 + 공식 changelog + GitHub release feed를 함께 봐야 한다.
4. awesome-design-md는 AI 에이전트가 읽는 DESIGN.md 패턴을 보여준다. 덱스 컴퍼니 프로젝트에도 `DESIGN.md`를 프로젝트 표준 파일로 둘 가치가 있다.
5. career-ops v1.16.0은 interview modes, ATS prepare-but-don't-submit, Obsidian plugin registry 등 에던님의 구직 자동화 개선 후보를 제공한다.

## 저장/흡수한 자료 목록

- [[2026-07-03-openai-agents-sdk-docs]]
- [[2026-07-03-openai-agents-python-v0177]]
- [[2026-07-03-openai-codex-cli-release-rss]]
- [[2026-07-03-awesome-design-md]]
- [[2026-07-03-career-ops-v1160]]
- [[2026-07-03-obsidian-wiki-agent-framework]]
- Inbox only: [[2026-07-03-threads-obsidian-agent-wiki]]

## LLM Wiki 변경 내역

- `30_Knowledge/LLM_Wiki/sources/ai-research/`에 source note 5개 추가
- `30_Knowledge/LLM_Wiki/sources/clippings/`에 design systems source note 1개 추가
- `00_Inbox/LLM_Wiki/ai-research/`에 Threads 제한 기록 1개 추가
- `30_Knowledge/LLM_Wiki/index.md`와 `log.md`에 이번 테스트 흡수 내역 반영

## 설치 후보 또는 스킬 후보

- `santifer/career-ops`: 직접 설치 금지. 에던님의 기존 구직 자동화와 중복/충돌이 있을 수 있어 interview mode, ATS prepare, channel yield 분석 아이디어만 후보로 유지.
- `ar9av/obsidian-wiki`: 직접 설치 금지. 기존 Dex Company LLM Wiki 구조와 충돌 가능성이 있어 doctor/lint/query 아이디어만 후보로 유지.
- `VoltAgent/awesome-design-md`: 실행 코드보다는 DESIGN.md 참고 자료로 사용. 상표/브랜드 오해 위험 때문에 상업 산출물에는 그대로 복제하지 않음.

## 중복으로 제외한 자료

- 기존 LLM Wiki에는 KIST LLM Wiki lecture, LLM Wiki Pattern, Dex Company LLM Wiki Operating Model만 있어 이번 후보와 직접 중복은 없었다.

## 실패/차단/미확인 항목

- Threads: 검색 결과는 잡혔지만 원문 본문 추출이 비어 있어 inbox에만 저장했다.
- YouTube: 공개 페이지는 열렸으나 transcript가 확인되지 않아 source note로 승격하지 않았다.
- zeroheight article: 검색 결과는 유용했지만 페이지 본문 추출이 제한적이라 이번 자동 흡수에서는 제외했다.
- 실제 GitHub 저장소 설치, pip install, npm install, skill install은 수행하지 않았다.

## 교차 검증 근거

- OpenAI Agents SDK: OpenAI 공식 문서 + `openai/openai-agents-python` GitHub + releases RSS
- Codex: `openai/codex` GitHub README + releases RSS + OpenAI Developers Codex changelog
- Design systems: `VoltAgent/awesome-design-md` README + commit RSS
- Career ops: `santifer/career-ops` README + v1.16.0 release + releases RSS
- Obsidian/LLM Wiki: Karpathy gist + `ar9av/obsidian-wiki` GitHub
- Threads: search result only, 원문 추출 실패

## 에던님 활용 예시

- 디자인 작업: 새 프로젝트를 만들 때 `DESIGN.md`를 프로젝트 루트에 두고, 덱스에게 "이 DESIGN.md를 기준으로 UI를 구현해줘"라고 지시한다.
- 에이전트 자동화: 매일 성장 스캔처럼 후보 평가, 저장, 검증, 보고가 이어지는 작업은 단순 프롬프트보다 상태/승인/검증 단계가 있는 구조로 본다.
- 구직 자동화: career-ops의 `prepare, don't submit` 원칙을 차용해 자동 지원이 아니라 자동 준비와 검증 중심으로 개선한다.
- LLM Wiki 운영: 외부 obsidian-wiki 도구는 바로 설치하지 말고, 기존 `llm-wiki-status.ps1`와 비교해 부족한 doctor/query 기능만 선별한다.

## 다음 실행 때 추적 후보

- Threads 원문 접근 가능성 재확인
- YouTube transcript 추출 가능 여부 확인
- OpenAI Codex changelog 최신 항목과 로컬 Codex 앱 버전 비교
- career-ops Obsidian plugin registry 구조 조사
- DESIGN.md를 Dex Company 프로젝트 템플릿에 넣을지 검토

## QA / Status

- 중복 검색: 기존 LLM Wiki에서 직접 중복 없음
- RSS 확인: 4개 feed 모두 HTTP 200 및 feed 구조 확인
- 설치 작업: 수행하지 않음
- 검증 완료: `llm-wiki-status.ps1` 통과
- 검증 완료: `llm-wiki-lint.ps1` 최초 실패 후 source note 스키마를 보정했고, 최종 0 warning으로 통과
- 검증 완료: 한국어 UTF-8 저장 확인, replacement character 없음
