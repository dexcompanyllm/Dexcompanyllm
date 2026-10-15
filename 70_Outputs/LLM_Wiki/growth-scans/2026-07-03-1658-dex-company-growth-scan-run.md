---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Run - 2026-07-03 16:58 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T16:58:09+09:00
runMode: manual-test
operator: Dex
claimType: historical
evidenceScope: local-test
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
---

# Dex Company Growth Scan Run - 2026-07-03 16:58 KST

## Summary

이번 실행은 이전 테스트에서 추가한 `LLM Wiki Growth Scan Report Improvement Model`을 실제 보고서 형식에 적용하는 검증 실행이다. 새 자료는 두 개를 source note로 저장했고, 한 개는 보류 후보로 남겼다.

## Search Scope

- 키워드: AI agents, automation, frontend, design systems, UX research, Codex
- 확인 채널: 공식 문서, GitHub, RSS/Atom, 표준 문서
- 제외 채널: X
- Threads: 이번 실행에서는 별도 source note로 승격할 만큼 검증 가능한 본문 자료를 확보하지 못했다.

## Captured Sources

### 1. OWASP Top 10 for Large Language Model Applications

- 저장 위치: `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-owasp-llm-top-10-security.md`
- 쉽게 말하면: LLM 앱과 에이전트가 어떤 방식으로 위험해지는지 정리한 보안 체크리스트다.
- 활용 방법: Dex Company가 GitHub skill, MCP 서버, 자동화 권한을 검토할 때 prompt injection, excessive agency, insecure plugin design, supply chain risk를 먼저 점검한다.
- 예시: "새 MCP 서버를 자동 설치해도 되는가?"라는 질문이 생기면, 기능보다 먼저 권한 범위, 외부 입력 처리, 출력 검증, 공급망 신뢰도를 확인한다.

### 2. Web Content Accessibility Guidelines 2.2

- 저장 위치: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-wcag-22-accessibility.md`
- 쉽게 말하면: 웹 UI가 더 많은 사람이 쓸 수 있도록 만드는 국제 접근성 기준이다.
- 활용 방법: 프론트엔드, 디자인 시스템, UX QA에서 색 대비, 키보드 접근, 포커스 표시, 입력 오류 안내, 모바일 리플로우를 고정 체크 항목으로 둔다.
- 예시: 새 대시보드를 만들면 "예쁘다/아니다"보다 먼저 버튼을 키보드로 이동할 수 있는지, 포커스가 보이는지, 오류 메시지가 입력 필드와 연결되는지 확인한다.

## Deferred Candidate

### OpenAI Cookbook - Build iterative repair loops with Codex

- URL: https://github.com/openai/openai-cookbook/blob/main/examples/codex/Build_iterative_repair_loops_with_Codex.ipynb
- 이유: Codex를 반복 수리 루프에 쓰는 좋은 후보지만, 이번 실행에서는 원문 내용을 충분히 추출해 source note로 정리하기보다 다음 실행에서 별도 분석하는 편이 낫다고 판단했다.
- 다음 처리: notebook raw 내용, 관련 cookbook commit/RSS, OpenAI 공식 문서와 함께 교차 확인한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: OWASP 프로젝트 페이지, W3C WCAG 2.2 Recommendation, W3C WAI overview, 각 GitHub repository 존재.
- Dex inference: OWASP와 WCAG를 Dex Company 자동화 QA 항목으로 변환한 운영 규칙.
- not checked: OWASP 세부 최신 PDF 전문, WCAG 각 성공 기준별 실제 프로젝트 적용 테스트, OpenAI cookbook notebook 전문 분석.

## Improvement Delta

- 이전 보고서 대비 개선: 단순 자료 목록이 아니라 "운영 QA에 어떤 항목으로 들어가는가"를 각 자료마다 예시로 연결했다.
- 보안 개선: GitHub/MCP/skill 후보를 발견했을 때 자동 흡수하지 않고 OWASP 게이트를 거치도록 보고서에 명시했다.
- 프론트엔드 개선: 디자인/구현 품질을 취향 기준이 아니라 WCAG 기반 체크리스트로 연결했다.

## Adoption Check

- 즉시 채택: OWASP LLM Top 10은 자동화/에이전트 보안 QA 항목으로 채택한다.
- 즉시 채택: WCAG 2.2는 frontend/design systems QA 항목으로 채택한다.
- 보류: OpenAI cookbook iterative repair loop는 다음 실행에서 source note 후보로 재검토한다.

## Next Eval

- 다음 테스트 질문 1: 새로 발견한 GitHub 저장소가 실행 코드를 포함할 때, Dex가 자동 승인과 보류를 일관되게 나누는가?
- 다음 테스트 질문 2: 프론트엔드 산출물 보고서에 WCAG 기반 접근성 항목이 실제로 들어가는가?
- 다음 테스트 질문 3: OpenAI cookbook notebook을 source note로 저장할 만큼 충분한 원문/공식 근거를 확보할 수 있는가?

## Prompt or Template Patch Candidate

성장 스캔 자동화 프롬프트에 다음 문장을 추가하는 후보를 남겼고, 이번 실행 중 실제 자동화 프롬프트에도 반영했다.

```text
When a discovered source implies installing code, tools, MCP servers, browser extensions, or skills, do not auto-install it. First classify it with OWASP LLM security risks, especially supply chain, insecure plugin design, excessive agency, sensitive information disclosure, and overreliance. Store it as a candidate unless the user explicitly approves installation.

When a discovered source is related to frontend, UX, or design systems, map at least one practical QA criterion to WCAG 2.2 or explain why WCAG does not apply.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| 중복 확인 | passed | 기존 LLM Wiki에서 OWASP/WCAG source note 중복 없음 |
| 원본 보존 | passed | source note 2개 추가 |
| 교차 검증 | partial | 공식 페이지 + GitHub/RSS 위치 확인 |
| 자동 설치 위험 | passed | OpenAI cookbook/GitHub 실행 후보는 보류 처리 |
| 자동화 프롬프트 반영 | passed | `dex-company-growth-scan`에 OWASP/WCAG 규칙 반영 확인 |
| 한국어 존댓말 보고 | passed | 쉬운 설명과 활용 예시 포함 |
| lint/status | passed | `llm-wiki-status.ps1`, `llm-wiki-lint.ps1` 통과, lint warning 0개 |
| UTF-8 확인 | passed | 추가 파일 3개에서 replacement character 없음 |

## Decision

이번 실행은 "자료를 더 많이 모으는 것"보다 "덱스 컴퍼니 운영 기준을 더 안전하고 검증 가능하게 만드는 것"에 초점을 두었다. OWASP와 WCAG는 각각 에이전트 보안과 프론트엔드 품질의 기준점으로 재사용 가치가 높다.
