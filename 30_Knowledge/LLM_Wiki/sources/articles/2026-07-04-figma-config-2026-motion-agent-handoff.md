---
type: llm-wiki-source
status: captured
title: "Figma Config 2026 motion agent handoff"
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
sourceKind: product-blog
source:
  - "https://www.figma.com/blog/config-2026-recap/"
publisher: "Figma"
collectionPurpose: "Figma Config 2026의 code layers, Motion, design agent, MCP-compatible handoff 신호를 Dex Company design/frontend QA 기준과 연결하기 위해 보존한다."
tags:
  - llm-wiki/source
  - figma
  - design-systems
  - frontend
  - motion
  - ai-agents
---

# Figma Config 2026 Motion Agent Handoff

## Original Content

- 수집 시각: 2026-07-04 03:34 KST
- 자료 유형: Figma official product blog
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 짧은 요약, Dex Company 적용 판단만 보존한다.
- 확인 범위: Config 2026 recap의 code layers, Figma Motion, shader/generative tools, design agent, Dev Mode handoff, MCP-compatible animated frame signal.

## Source-Backed Notes

- Figma는 Config 2026에서 code layers, Figma Motion, shaders, generative plugins, Weave tools, Figma agent를 발표했다.
- Figma Motion은 timeline, keyframes, presets, agent-generated starting point, design-system-level reusable motion, Dev Mode inspectability, CSS/JSON/React code copy, MCP-compatible handoff를 강조한다.
- Code layers는 디자인 캔버스에서 code와 design layer를 왕복하고 여러 방향을 병렬 탐색하는 흐름을 제시한다.

## Dex Company Use Example

- Figma 기반 디자인을 구현으로 넘길 때 static frame만 보지 말고 `motion.spec`, `easing.value`, `duration.value`, `reduced_motion.behavior`, `devmode.inspectable`, `implementation.owner`를 확인한다.
- MCP-compatible 또는 agent handoff가 가능해도 자동 구현 승인으로 보지 않는다. 디자인 시스템 source, component ownership, accessibility evidence, browser QA가 있어야 한다.
- Dex Company frontend 작업에서는 motion이 있으면 WCAG 2.2 관련 `Pause/Stop/Hide`, `Animation from Interactions`, `Focus Appearance`, `Target Size`와 사용자의 motion sensitivity를 QA 항목에 넣는다.

## WCAG / Accessibility Link

- Figma 발표 자체는 WCAG 문서가 아니므로 접근성 적합성을 보장하지 않는다.
- 실무 연결은 motion/animation이 있는 UI에서 reduced motion, focus 유지, keyboard path, pointer target, status feedback, contrast, readable timing을 검증하는 방식으로 해야 한다.
- Figma handoff가 있더라도 최종 증거는 브라우저/디바이스 QA와 접근성 체크 결과다.

## Evidence Quality

- quality: medium
- 이유: 공식 product blog지만 제품 발표 신호이며, 에던님의 Figma 계정/플랜/파일에서 기능이 사용 가능한지 확인하지 않았다.
- 교차 검증: 기존 Figma design agent/design-system context note, Figma agent skills collaboration note, Storybook/agent-readable frontend QA notes, WCAG 2.2 note와 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, overreliance, insecure plugin design, supply chain if generative plugins or MCP tools are adopted.
- 운영 제한: Figma agent, plugin, MCP, Dev Mode는 계정/권한/파일 접근/조직 정책에 묶인다. 실제 사용은 에던 승인과 파일별 권한 확인 후에만 한다.

## Claim Split

- source-backed: Figma Config 2026 recap의 code layers, Motion, agent, Dev Mode/MCP handoff 발표.
- Dex inference: Dex Company QA 템플릿에 motion spec, reduced motion, inspectable handoff, browser QA 필드를 추가해야 한다는 판단.
- not checked: Figma 계정 기능 노출, paid plan requirement, 실제 MCP handoff 품질, generated code accessibility, browser runtime fidelity.

