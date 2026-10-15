---
type: llm-wiki-growth-scan-report
status: completed
created: 2026-07-03
runAt: 2026-07-03T16:19:28+09:00
mode: manual-test
automationId: dex-company-growth-scan
verifiedBy: Dex
tags:
  - llm-wiki/report
  - dex-company/growth-scan
---

# Dex Company Growth Scan Test 3 - 2026-07-03 16:19 KST

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-03 16:19:28 +09:00
- 검색 범위: OpenAI Apps SDK/MCP, MCP security, Playwright, W3C Design Tokens, NN/g AI UX, GitHub/RSS, Threads 공개 검색
- 관심 키워드: design systems, AI agents, Codex, OpenAI API, UX research, frontend, Obsidian, LLM Wiki, automation, career ops

## 오늘의 핵심 발견

1. OpenAI Apps SDK의 MCP server 문서는 덱스 컴퍼니가 장기적으로 interactive tool/UI를 만들 때 핵심 기준점이 된다.
2. MCP는 성장 경로이면서 동시에 보안 게이트가 필요한 영역이다. official security best practices와 NSA security design consideration을 함께 source로 둬야 한다.
3. Playwright release notes는 프론트엔드 QA의 공식 최신성 확인점이다.
4. W3C Design Tokens stable note는 DESIGN.md를 token 구조와 연결할 근거를 준다.
5. NN/g AI UX topic은 AI 기능을 만들 때 사용성, 책임 있는 분석, 출처/신뢰도 표시를 놓치지 않게 한다.

## 저장/흡수한 자료 목록

- [[2026-07-03-openai-apps-sdk-mcp-server]]
- [[2026-07-03-mcp-security-best-practices]]
- [[2026-07-03-playwright-release-notes-web-testing]]
- [[2026-07-03-w3c-design-tokens-first-stable]]
- [[2026-07-03-nngroup-ai-ux-research-topic]]
- Inbox only: [[2026-07-03-threads-third-signal-test]]

## 중복/성과 없음

- 기존 LLM Wiki에는 MCP가 OpenAI Agents SDK 릴리스 note 안에 한 줄만 있었고, 독립 source는 없었다. 이번에는 MCP를 별도 source로 승격했다.
- OpenAI Apps SDK GitHub release feed 후보는 404가 나와 source로 쓰지 않았다. 공식 문서를 source로 삼았다.
- Threads는 세 번째에도 후보 발굴 신호는 있었지만 source-backed 흡수 성과는 없었다. 이 패턴은 이제 운영 규칙으로 굳혀도 된다.

## 설치 후보 또는 스킬 후보

- 이번 테스트에서 실행 코드 설치는 하지 않았다.
- MCP 관련 도구/서버는 앞으로도 설치 후보가 나오면 security best practices source와 함께 승인 게이트를 통과해야 한다.

## 실패/차단/미확인 항목

- OpenAI Apps SDK GitHub release feed로 추정한 URL은 404였다.
- NSA MCP security PDF는 검색/URL 확인만 했고 전문 검토는 하지 않았다.
- Playwright release notes는 source 위치와 RSS를 확인했지만 현재 workspace Playwright 버전과 연결하지는 않았다.
- NN/g topic page는 source index이며 개별 article/video 전문 검토는 다음 실행으로 남겼다.

## 교차 검증 근거

- OpenAI Apps SDK/MCP: OpenAI 공식 문서
- MCP security: Model Context Protocol official security best practices + NSA MCP security PDF URL
- Playwright: official release notes + GitHub releases RSS HTTP 200/feed 확인
- Design tokens: W3C Community Group note + Design Tokens Community Group site
- AI UX: NN/g topic page + Threads의 NN/g 신호는 참고만 함

## 에던님 활용 예시

- MCP 도구 흡수: 새 MCP 서버가 좋아 보여도 바로 설치하지 않고 permission, auth, secret handling, rollback path를 체크한다.
- 프론트엔드 QA: 웹 UI 산출물에는 Playwright screenshot/interaction/console 검증을 기본으로 둔다.
- 디자인 시스템: `DESIGN.md`만 쓰지 말고 token 구조를 함께 둬 색상/간격/타입을 반복 가능하게 만든다.
- AI UX: AI 기능은 결과만 보여주지 말고 출처, confidence, 오류/빈 상태, 사용자가 다음에 할 행동을 설계한다.

## 다음 실행 때 추적 후보

- MCP security checklist를 Dex Company 승인 템플릿으로 만들기
- Playwright 현재 로컬 설치 버전과 release notes 비교
- Design Tokens를 실제 프로젝트 `DESIGN.md` 템플릿에 반영할지 검토
- NN/g AI topic 중 "Use AI Responsibly in Analysis"를 별도 source로 심화 검토

## QA / Status

- 중복 검색: MCP 독립 source 없음 확인, 신규 저장
- RSS 확인: Playwright releases, modelcontextprotocol/typescript-sdk releases HTTP 200/feed 확인
- RSS 실패: openai/openai-apps-sdk-js releases feed는 404
- 설치 작업: 수행하지 않음
- 검증 완료: `llm-wiki-status.ps1` 통과, source notes 16개 확인
- 검증 완료: `llm-wiki-lint.ps1` 0 warning 통과
- 검증 완료: UTF-8 저장 확인, replacement character 없음
