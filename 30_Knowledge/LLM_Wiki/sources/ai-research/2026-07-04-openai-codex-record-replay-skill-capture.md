---
type: llm-wiki-source
status: captured
title: "OpenAI Codex Record & Replay skill capture"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: prescriptive
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-doc
source: "https://developers.openai.com/codex/record-and-replay"
publisher: "OpenAI"
collectionPurpose: "반복되는 사람 주도 GUI 업무를 skill로 전환할 때 필요한 플랫폼 제약, 녹화 범위, 검증 경계를 Dex Company 운영 지식으로 보존한다."
tags:
  - llm-wiki/source
  - codex
  - skills
  - automation
  - computer-use
---

# OpenAI Codex Record & Replay skill capture

## Original Content

- 수집 시각: 2026-07-04 00:04 KST
- 자료 유형: 공식 문서
- 핵심 내용 쉬운 설명: 사용자가 Mac에서 한 번 보여준 반복 업무를 Codex가 재사용 가능한 skill 초안으로 바꾸는 기능입니다. 녹화 중에는 업무에 필요한 창 내용과 행동을 관찰하고, 녹화 종료 뒤 필요한 입력값, 절차, 검증 방법을 담은 skill을 초안화합니다.
- 중요한 제약: 공식 문서 기준으로 macOS에서 제공되며, EEA/UK/Switzerland는 초기 제공에서 제외됩니다. Computer Use가 사용 가능하고 켜져 있어야 합니다.
- Dex Company 사용 예시: JobKorea/Saramin 입력, 반복 보고서 다운로드, 이슈 생성 같은 GUI 반복 업무를 문서화할 때 "녹화 가능한 안정 절차인지", "비밀값이나 개인정보가 화면에 노출되는지", "검증 조건이 명확한지"를 먼저 따질 수 있습니다.
- source-backed: 플랫폼 조건, 녹화 시작/중지 절차, 녹화 뒤 skill 초안 생성, replay 입력 방식은 OpenAI 공식 문서에 근거합니다.
- Dex inference: Windows 중심인 현재 에던님의 작업 환경에서는 즉시 실행 기능으로 보지 않고, 향후 Mac/Computer Use 조건이 맞을 때 사용할 후보로만 봐야 합니다.
- not checked: 현재 Codex 앱 UI에서 Record & Replay 메뉴 존재 여부, 계정/지역 사용 가능 여부, 실제 녹화 결과물 품질은 확인하지 않았습니다.

## Evidence Quality

- quality: medium
- 이유: 공식 문서이지만 단일 출처이고, 현 작업 환경에서 직접 실행 검증하지 않았습니다.
- 교차 검증: 기존 Dex Company skill 운영 문서, Codex skills/source note들과 개념적으로 일치합니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, sensitive information disclosure, prompt injection, insecure output handling 가능성이 있습니다.
- 운영 제한: 계정, 브라우저, 파일, 사내 도구를 녹화할 때 비밀값과 개인정보가 화면에 나오면 안 됩니다. 생성된 skill은 실행 전에 사람이 읽고 최소 권한으로 검토해야 합니다.
