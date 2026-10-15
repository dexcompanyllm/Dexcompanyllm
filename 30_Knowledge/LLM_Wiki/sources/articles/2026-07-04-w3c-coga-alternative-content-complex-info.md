---
type: llm-wiki-source
status: active
confidence: medium
claimType: prescriptive
evidenceScope: official-guidance-with-cross-checks
verificationStatus: partial
disputed: false
sourceKind: official-docs
source: "https://www.w3.org/WAI/WCAG2/supplemental/patterns/o7p02-alternative-content/"
collectionPurpose: "PPT, dashboard, report, onboarding, form, chart UI처럼 복잡한 정보와 절차를 다루는 산출물에서 사용자가 이해 가능한 대체 형식과 보조 설명을 제공하는지 QA 기준을 보강한다."
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
verifiedAt: 2026-07-04
verifiedBy: Dex
tags:
  - llm-wiki/source
  - accessibility
  - cognitive-accessibility
  - ppt
  - frontend
  - information-design
  - dashboard
---

# W3C COGA Alternative Content for Complex Information

## Original Content

- 제목: Provide Alternative Content for Complex Information and Tasks
- URL: https://www.w3.org/WAI/WCAG2/supplemental/patterns/o7p02-alternative-content/
- 기관: W3C Web Accessibility Initiative
- 수집 시각: 2026-07-04 19:03 KST
- 자료 유형: W3C WCAG 2 Supplemental Guidance, Cognitive Accessibility Design Pattern
- 확인 범위: 원문 전체 복사가 아니라 사용자 필요, What to Do, How it Helps, Getting Started의 운영 의미만 보존한다.

## 쉬운 설명

W3C WAI는 복잡한 정보나 복잡한 작업을 하나의 표현 방식으로만 제시하면 인지 접근성 장벽이 커질 수 있다고 설명합니다. 숫자, 그래프, 표, 긴 문서, 선택지의 장단점, 단계별 절차는 사용자가 이해하기 쉬운 요약, 그림, 표, 차트, 보조 설명, 쉬운 언어 버전 같은 대체 형식과 연결되어야 합니다.

이 자료는 WCAG 2 준수 자체의 필수 성공 기준은 아니며, WCAG 2를 보완하는 supplemental guidance입니다. 따라서 법적 conformance 증거로 과장하면 안 되고, PPT/frontend 산출물의 QA field를 보강하는 지식으로만 사용합니다.

## Dex Company 사용 예시

- PPT: 복잡한 시장 규모 차트에는 "한 문장 결론", "숫자 읽는 법", "핵심 비교 표", "발표자 노트"를 함께 둡니다.
- Dashboard UI: KPI 카드와 차트 옆에 수치의 의미, 비교 기준, 잘못 해석하기 쉬운 제한을 표시합니다.
- Form/onboarding: 사용자가 어떤 선택을 해야 하는지, 선택의 단점이나 후속 영향을 쉬운 언어로 제공합니다.
- 보고서/제안서: 긴 문서 맨 앞에 요약과 다음 행동을 두고, 세부 근거와의 관계를 명확히 표시합니다.

## Source-Backed

- W3C WAI supplemental pattern은 복잡한 정보 이해를 돕는 요약, 단계별 정보, 선택지 설명, 표/차트, 익숙한 기호, 구조화된 영상, 정보 그래픽, 숫자 대안을 제시합니다.
- W3C Cognitive Accessibility hub는 이 guidance가 WCAG 2 conformance 필수 기준은 아니지만 더 많은 사용자 요구를 충족하기 위한 추가 guidance라고 설명합니다.
- WCAG 2.2는 cognitive/language/learning needs가 일부만 다뤄지며 모든 사용자 요구를 충족하지 못한다고 밝히고, supplemental guidance와 advisory techniques를 함께 보라고 설명합니다.

## Dex Inference

- PPT와 frontend는 형식은 다르지만 복잡한 정보를 사용자가 이해하고 행동하게 만드는 산출물이라는 공통점이 있습니다. 따라서 "대체 콘텐츠", "한 문장 요약", "숫자 해석", "선택지 장단점", "primary와 supplemental content의 관계"는 두 영역 모두에 적용 가능한 QA field입니다.
- 기존 Dex Company 체크리스트의 long description, chart label, one-insight chart 기준은 이미지/차트 설명에 강했고, 이번 자료는 더 넓은 복잡한 정보와 작업 절차까지 확장합니다.

## Not Checked

- 실제 에던님의 PPT 파일, dashboard UI, frontend repo, Storybook, 브라우저 접근성 트리, PowerPoint Accessibility Checker는 이번 실행에서 검사하지 않았습니다.
- W3C supplemental guidance의 최근 개별 페이지 변경 이력 전체는 별도 diff로 확인하지 않았습니다.
- 이 자료만으로 WCAG conformance, 법적 접근성 적합성, 실제 사용자 테스트 통과를 주장하지 않습니다.

## Evidence Quality

- 품질: high
- 근거: W3C WAI 공식 supplemental guidance이며, W3C Cognitive Accessibility hub와 WCAG 2.2 문서로 위치와 한계를 교차 확인했습니다.
- 한계: supplemental guidance이므로 필수 WCAG conformance 기준으로 취급하면 안 됩니다.

## License / Security / Install Risk

- 문서형 자료입니다. 실행 코드, package, MCP server, connector, browser extension, GitHub workflow, 계정 연결을 설치하거나 실행하지 않았습니다.
- 주요 위험은 supply chain이 아니라 overreliance입니다. W3C guidance를 실제 artifact QA 증거로 착각하지 않도록 `not checked`와 `statement_limit`를 함께 기록해야 합니다.
