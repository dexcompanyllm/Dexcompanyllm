---
type: llm-wiki-source
status: captured
title: "GitHub Copilot enterprise managed-settings governance"
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
source: "https://github.blog/changelog/2026-07-01-enterprise-managed-settings-json-is-generally-available/"
publisher: "GitHub"
collectionPurpose: "agent 설정의 개인 파일, 프로젝트 규칙, enterprise managed policy 우선순위를 Dex Company 설정 진단 모델과 비교하기 위해 보존한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - governance
  - managed-config
---

# GitHub Copilot enterprise managed-settings governance

## Original Content

- 수집 시각: 2026-07-04 00:04 KST
- 자료 유형: 공식 changelog
- 핵심 내용 쉬운 설명: GitHub Enterprise Cloud 고객은 `.github-private` 저장소의 `copilot/managed-settings.json`으로 VS Code와 Copilot CLI의 AI 표준과 확장 정책을 중앙 관리할 수 있습니다. 이 설정은 지원되는 키에 대해 사용자 클라이언트의 파일 기반 설정보다 우선합니다.
- Dex Company 사용 예시: Codex/Copilot 같은 agent 설정을 볼 때 "사용자 로컬 설정", "프로젝트 AGENTS.md", "enterprise/admin managed 설정", "현재 세션 effective behavior"를 분리해서 확인하는 체크리스트 근거로 쓸 수 있습니다.
- source-backed: managed-settings 경로, 우선순위, supported keys, VS Code/Copilot CLI 지원 범위는 GitHub changelog에 근거합니다.
- Dex inference: Dex Company의 `PROJECT_CONFIG.md`나 `AGENTS.md`만 보고 실제 agent 정책을 확정하면 안 된다는 운영 규칙은 이 자료와 OpenAI managed configuration 자료를 함께 보고 유도한 판단입니다.
- not checked: GitHub Enterprise Cloud 설정, `.github-private` 저장소, 실제 managed-settings 적용 여부는 확인하지 않았습니다.

## Evidence Quality

- quality: medium
- 이유: 공식 GA 문서이지만 GitHub Enterprise Cloud와 특정 클라이언트에 한정됩니다.
- 교차 검증: 2026-07-03 OpenAI Codex managed configuration source note와 정책 계층화 관점에서 일치합니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, insecure plugin design, supply chain, sensitive information disclosure.
- 운영 제한: enabled plugins, known marketplaces, model, permissions bypass 관련 키는 agent 권한과 비용에 직접 영향을 줄 수 있으므로 변경 전 승인과 diff 기록이 필요합니다.
