---
type: llm-wiki-source
status: captured
title: "NNG AI era design critique as a core skill"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: analytical
evidenceScope: source-backed-synthesis
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: article
source: "https://www.nngroup.com/articles/ai-era-critique/"
publisher: "Nielsen Norman Group"
collectionPurpose: "AI가 디자인 산출 속도를 높일수록 Dex Company 디자인/기획 작업에서 critique, 사용자 이해, 좋은 결과의 기준 정의를 QA gate로 남기기 위해 보존한다."
tags:
  - llm-wiki/source
  - ux-research
  - design-critique
  - ai
  - dex-company
---

# NNG AI Era Design Critique As A Core Skill

## Original Content

- 수집 시각: 2026-07-04 03:02 KST
- 자료 유형: NN/g UX article
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단만 보존한다.
- 확인 범위: AI-powered dynamic experience가 늘수록 좋은 디자인의 기준을 사용자 이해와 엄격한 critique로 정의해야 한다는 논지.

## Source-Backed Notes

- NN/g article은 AI로 생성·변형되는 경험에서도 디자이너가 좋은 결과의 기준을 판단하고 critique해야 한다는 방향을 제시한다.
- 핵심은 "취향"이 아니라 사용자 이해, 판단 기준, 디자인 critique이다.
- 이 자료는 AI design workflow와 UX research가 빨라질수록 결과물의 provenance, user value, decision rationale을 함께 기록해야 한다는 Dex Company 운영 방향과 맞다.

## Dex Company Use Example

- `/디자이너`, `/기획자`, `/바이브코딩` 작업 후 `QA_REPORT.md`에 `critique.criteria`, `user.evidence`, `decision.rationale`, `accessibility.check`, `tradeoff.accepted`를 기록한다.
- AI가 만든 UI 초안은 "그럴듯함"이 아니라 사용자의 핵심 행동, 오류 회복, 접근성, 정보 구조, 운영 맥락 기준으로 다시 평가한다.
- design system 작업에서는 component/token 저장보다 "왜 이 기준이 좋은가"와 "어떤 사용자 문제를 줄이는가"를 함께 남긴다.

## WCAG / Accessibility Link

- 이 article 자체는 WCAG 기준 문서가 아니라 디자인 판단과 critique에 관한 UX 자료다.
- 다만 Dex Company의 실무 QA에서는 critique 기준을 WCAG 2.2의 keyboard, focus visible, target size, error identification, help, redundant entry 같은 체크와 연결한다.
- AI가 생성한 dynamic UI는 상태 변화와 오류 메시지가 불명확해지기 쉬우므로, critique 단계에서 보조기술 사용자와 키보드 사용자 흐름을 별도 확인해야 한다.

## Evidence Quality

- quality: medium
- 이유: NN/g는 UX 실무 출처로 신뢰도가 높지만, article 성격상 정량 연구 원자료나 프로젝트별 성능 검증은 포함하지 않는다.
- 교차 검증: 기존 NN/g AI UX index, Figma AI collaboration note, zeroheight design systems report, WCAG 2.2 source note와 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, insecure output handling.
- 운영 제한: AI 산출물이 빠르다고 critique를 생략하면 잘못된 사용자 가정과 접근성 누락이 누적될 수 있다.

## Claim Split

- source-backed: AI 시대 디자인에서 critique와 사용자 이해가 중요하다는 NN/g 논지.
- Dex inference: Dex Company 디자인/기획 QA 템플릿에 critique criteria와 accessibility check를 명시해야 한다는 판단.
- not checked: article의 내부 연구 데이터, 에던님 프로젝트에 적용했을 때의 실제 사용자 성과.

