---
type: llm-wiki-source
status: captured
title: "Figma agent skills collaboration patterns"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: interpretive
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-blog
source: "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
publisher: "Figma"
collectionPurpose: "디자인 agent skill을 팀 운영, critique, UX writing, research evidence, PM handoff와 연결하는 패턴을 Dex Company 디자인/기획 QA 기준에 반영한다."
tags:
  - llm-wiki/source
  - figma
  - design-systems
  - skills
  - ux-research
  - accessibility
---

# Figma agent skills collaboration patterns

## Original Content

- 수집 시각: 2026-07-04 00:04 KST
- 자료 유형: 공식 블로그
- 핵심 내용 쉬운 설명: Figma agent의 skill은 반복 프롬프트를 팀/조직이 재사용하는 지침으로 만들고, 디자인 시스템 위에 UX writing, critique, research context, project management handoff 같은 팀 지식을 얹는 방식입니다.
- Dex Company 사용 예시: `/디자이너` 또는 `/기획자` 작업에서 "스타일 가이드", "stakeholder critique", "first-time user perspective", "crit recap", "research evidence pull-in"을 각각 skill/체크리스트 후보로 나누어 저장할 수 있습니다.
- source-backed: Figma blog는 skill을 plain English instruction, slash trigger, team/org publish, design-system 보완층, connector 기반 context pull-in으로 설명합니다.
- Dex inference: Dex Company에서는 Figma skill을 바로 설치하거나 연결하지 않고, Obsidian의 `SOURCES.md`, `DECISIONS.md`, `QA_REPORT.md`와 연결되는 디자인 리뷰 템플릿 후보로만 흡수해야 합니다.
- not checked: Figma agent beta, Full seat/Professional/Organization/Enterprise plan, connectors, shared/private chat 설정, MCP server skill availability는 확인하지 않았습니다.

## WCAG / Accessibility Link

- 연결 기준: 이 자료는 WCAG conformance 문서가 아닙니다. 다만 Figma가 accessibility checks를 skill 적용 예시로 들기 때문에 Dex Company에서는 접근성 skill 출력을 성공 증거로 보지 않고, WCAG 2.2 기반 keyboard, focus, contrast, error identification, name/role/value 점검으로 별도 검증해야 합니다.

## Evidence Quality

- quality: medium
- 이유: 공식 Figma 블로그이지만 제품 소개 성격이 있고, 실제 프로젝트 적용 검증은 없습니다.
- 교차 검증: 기존 Figma MCP/design-system source note, NN/g critique/research 책임성 notes, WCAG 2.2 source note와 운영상 연결됩니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: sensitive information disclosure, prompt injection, excessive agency, overreliance.
- 운영 제한: shared-by-default chat과 connector context는 프로젝트 정보, research note, PM 문서가 외부 agent context에 들어갈 수 있으므로 private chat과 권한 경계를 먼저 정해야 합니다.
