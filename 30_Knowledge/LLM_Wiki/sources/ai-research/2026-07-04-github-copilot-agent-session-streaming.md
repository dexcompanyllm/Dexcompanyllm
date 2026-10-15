---
type: llm-wiki-source
status: captured
title: "GitHub Copilot agent session streaming public preview"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source: "https://github.blog/changelog/2026-07-02-copilot-agent-session-streaming-is-now-in-public-preview/"
publisher: "GitHub"
collectionPurpose: "에이전트 실행 로그, 프롬프트, 응답, tool call을 감사 가능한 운영 증거로 다루는 기준을 Dex Company 자동화/QA 기록 모델에 반영한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - observability
  - agent-governance
---

# GitHub Copilot agent session streaming public preview

## Original Content

- 수집 시각: 2026-07-04 00:04 KST
- 자료 유형: 공식 changelog
- 핵심 내용 쉬운 설명: GitHub Enterprise Cloud의 enterprise managed users 환경에서 Copilot agent session 데이터를 스트리밍 엔드포인트나 REST API로 볼 수 있게 한 공개 프리뷰입니다. 대상은 cloud agent, Copilot CLI, VS Code, Visual Studio, JetBrains/Eclipse 같은 partner IDE까지 포함됩니다.
- Dex Company 사용 예시: 자동화가 "했다"고 말하는 대신 프롬프트, 응답, tool call, 세션 활동 기록을 감사 증거로 남겨야 한다는 원칙을 강화합니다. 로컬 Dex Company에서는 아직 GitHub Enterprise 기능을 쓴다는 뜻이 아니라, 보고서 QA 섹션에서 trace/evidence를 더 명확히 요구하는 참고 자료입니다.
- source-backed: session activity visibility, streaming endpoint, REST API, 최근 48시간 usage records endpoint는 GitHub changelog에 근거합니다.
- Dex inference: Dex Company 자동화 보고서의 QA Scorecard에 "세션 추적 가능 증거" 항목을 넣는 것은 이 자료에서 유도한 운영 해석입니다.
- not checked: GitHub Enterprise Cloud 계정, AI Controls 설정, streaming endpoint, REST API 응답은 확인하지 않았습니다.

## Evidence Quality

- quality: medium
- 이유: 공식 changelog이지만 public preview이고 enterprise managed users에 한정됩니다.
- 교차 검증: 기존 OpenAI agent improvement loop/evals source note의 trace 기반 개선 루프와 같은 방향입니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: sensitive information disclosure, overreliance, insecure output handling.
- 운영 제한: session stream에는 프롬프트, 응답, tool call 같은 민감 맥락이 포함될 수 있으므로 보존 범위, 접근 권한, 보존 기간을 먼저 정해야 합니다.
