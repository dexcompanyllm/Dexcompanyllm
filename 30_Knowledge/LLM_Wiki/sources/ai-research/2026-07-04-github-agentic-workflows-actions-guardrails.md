---
type: llm-wiki-source
status: captured
title: "GitHub Agentic Workflows in GitHub Actions"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: technical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog-docs-and-product-site
source:
  - "https://github.blog/changelog/2026-06-11-github-agentic-workflows-is-now-in-public-preview/"
  - "https://docs.github.com/en/copilot/concepts/agents/about-github-agentic-workflows"
  - "https://github.github.com/gh-aw/"
publisher: "GitHub"
collectionPurpose: "Dex Company 자동화가 자연어 Markdown, Actions, safe outputs, sandbox, 비용 통제, human review를 어떻게 분리해야 하는지 확인하기 위해 저장한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - automation
  - ai-agents
  - github-actions
---

# GitHub Agentic Workflows in GitHub Actions

## Original Content

- 수집 시각: 2026-07-04 01:03 KST
- 자료 유형: GitHub 공식 changelog, GitHub Docs, GitHub Agentic Workflows product site
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단, 미확인 범위만 보존한다.
- 확인 범위: public preview 상태, Markdown workflow 정의, Actions lockfile 컴파일, frontmatter guardrails, safe outputs, read-only 기본 권한, firewalled container, AI credits billing, 지원 agent 범위.

## Source-Backed Notes

- GitHub Agentic Workflows는 Markdown으로 정의한 repository automation을 GitHub Actions workflow로 실행하는 public preview 기능이다.
- GitHub Docs는 frontmatter에 trigger, permissions, safe outputs 같은 guardrail을 선언하고, markdown body에 자연어 지시를 둔다고 설명한다.
- 보안 guardrail은 read-only 기본 권한, 선언된 safe outputs, agent runtime 밖의 secrets, threat detection, firewalled execution, role-based access를 포함한다.
- 사용 비용은 GitHub Actions minutes와 inference cost로 나뉘며, inference는 AI Credits로 추적된다.

## Dex Company Use Example

- Dex Company 자동화 템플릿은 "무엇을 하라"보다 먼저 `trigger`, `permissions`, `safe_outputs`, `cost_limit`, `human_review`, `rollback_path`를 분리해야 한다.
- Obsidian Growth Scan처럼 반복 실행되는 작업을 GitHub Actions 계열로 옮길 때도 Markdown 지시는 검토 가능한 소스이고, lockfile/YAML은 실행 아티팩트로 분리해야 한다.
- GitHub Agentic Workflows는 참고 모델일 뿐이며, 현재 Dex Company 자동화를 GitHub Actions로 이전하거나 새 workflow를 생성하지 않았다.

## Evidence Quality

- quality: medium
- 이유: GitHub 공식 changelog, Docs, product site가 서로 같은 방향을 말하지만 public preview라 동작과 정책이 바뀔 수 있다.
- 교차 검증: 기존 LLM Wiki의 GitHub Copilot session streaming, AI credit session limits, enterprise managed settings, OpenAI Codex Automations source note와 방향이 맞는다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, prompt injection, insecure output handling, sensitive information disclosure, overreliance.
- 운영 제한: GitHub Actions, GitHub CLI, AI engine credential, repository permissions, billing policy, safe output declaration을 project-specific으로 감사하기 전에는 실행하지 않는다.

## Claim Split

- source-backed: public preview, Markdown-defined workflow, Actions execution, safe outputs, read-only default, billing structure.
- Dex inference: Dex Company 자동화 템플릿에 `safe_outputs`, `cost_limit`, `human_review`를 고정 gate로 넣어야 한다는 판단.
- not checked: 에던 GitHub 계정/조직의 Agentic Workflows 접근권한, GitHub CLI extension 버전, 실제 lockfile 생성, workflow 실행, 비용 청구.

