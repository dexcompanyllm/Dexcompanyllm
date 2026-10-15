---
type: llm-wiki-source
status: captured
title: "GitHub Copilot Agent in JetBrains AI Assistant through ACP"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog-docs-and-vendor-blog
source:
  - "https://github.blog/changelog/2026-06-30-copilot-agent-is-now-available-in-jetbrains-ai-assistant/"
  - "https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/agents/copilot-in-jetbrains"
  - "https://blog.jetbrains.com/ai/2026/06/github-copilot-now-an-integrated-agent/"
publisher: "GitHub, JetBrains"
collectionPurpose: "IDE agent integration에서 ACP registry, native agent picker, chat-only capability, subscription/credential boundary를 분리하는 due-diligence 기준을 저장한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - jetbrains
  - acp
  - agent-governance
---

# GitHub Copilot Agent in JetBrains AI Assistant through ACP

## Original Content

- 수집 시각: 2026-07-04 00:34 KST
- 자료 유형: GitHub 공식 changelog, GitHub Docs, JetBrains 공식 blog
- 원문 보존 방식: 원문 전체를 복사하지 않고, 출처 메타데이터, 확인 범위, 운영 판단, 위험 구분만 보존한다.
- 확인 범위: JetBrains AI Assistant agent picker 내 Copilot 제공, ACP 기반 통합, 모델/추론 깊이 선택, multi-step coding task handoff, GitHub Docs의 chat/agent capability 범위와 제한.

## Source-Backed Notes

- GitHub는 2026-06-30 Copilot Agent가 JetBrains AI Assistant에서 사용 가능하다고 발표했다.
- GitHub Docs는 이 통합이 chat과 agent capability 중심이며, code completion, next edit suggestions, inline chat, code review, commit message generation은 포함하지 않는다고 구분한다.
- JetBrains는 ACP Registry에서 더 나아가 기본 agent picker에 Copilot을 제공하는 native experience라고 설명한다.

## Dex Company Use Example

- Dex Company에서 IDE agent 통합을 평가할 때는 "agent picker에 보인다"와 "전체 IDE 기능을 대체한다"를 분리한다.
- ACP 또는 registry 기반 통합은 공식/벤더 출처라도 자동 설치 또는 자동 신뢰 대상이 아니다. subscription, credential, workspace, repository permission, command execution boundary를 확인해야 한다.
- 에던이 JetBrains 기반 프로젝트를 요청할 때는 Copilot/AI Assistant/Codex 중 어느 agent가 실제 파일 수정, 명령 실행, review를 담당하는지 먼저 기록한다.

## Evidence Quality

- quality: medium
- 이유: GitHub와 JetBrains 공식 출처를 교차 확인했지만, 실제 IDE 버전, 구독, 계정, repository 권한, agent command execution behavior는 확인하지 않았다.
- 교차 검증: 기존 GitHub Agent Finder, Copilot SDK governance, Codex App Server, MCP/Codex source notes와 같은 integration boundary 문제다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: insecure plugin design, excessive agency, sensitive information disclosure, insecure output handling.
- 운영 제한: IDE agent는 workspace 파일, terminal command, repository credentials, local secrets에 닿을 수 있으므로 project-specific approval과 최소 권한 원칙이 필요하다.

## Claim Split

- source-backed: JetBrains AI Assistant 내 Copilot agent availability, ACP 기반, GitHub Docs의 capability limitation.
- Dex inference: Dex Company IDE agent due-diligence checklist에 반영하는 판단.
- not checked: 에던 PC의 JetBrains 설치 여부, AI Assistant 버전, Copilot 구독/로그인, agent execution 권한, 실제 파일 변경 동작.

