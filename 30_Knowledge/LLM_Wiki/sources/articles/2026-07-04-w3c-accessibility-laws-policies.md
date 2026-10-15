---
type: llm-wiki-source
status: captured
title: "W3C WAI web accessibility laws and policies index"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: official-index
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-index
source:
  - "https://www.w3.org/WAI/policies/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
publisher: "W3C Web Accessibility Initiative"
collectionPurpose: "Dex Company frontend/UX QA에서 WCAG 자체와 국가별 접근성 법·정책 확인을 분리해 기록하기 위해 보존한다."
tags:
  - llm-wiki/source
  - accessibility
  - wcag
  - policy
  - frontend-qa
---

# W3C WAI Web Accessibility Laws And Policies Index

## Original Content

- 수집 시각: 2026-07-04 03:02 KST
- 자료 유형: W3C WAI official index
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단만 보존한다.
- 확인 범위: WAI가 웹 접근성 관련 정부 정책 목록을 제공하지만 포괄적·확정적 법률 자문은 아니라고 설명하는 범위.

## Source-Backed Notes

- W3C WAI accessibility laws and policies page는 국가별 접근성 정책을 찾는 색인 역할을 한다.
- 같은 page는 목록이 comprehensive 또는 definitive하지 않다고 밝히며, 각 국가 항목의 "last updated" 정보를 확인하도록 안내한다.
- W3C WCAG overview는 WCAG 2.2가 최신 WCAG 2 계열 기준이며, WCAG 2.2 충족 콘텐츠는 WCAG 2.1과 2.0도 충족하는 backward compatible 구조라고 설명한다.

## Dex Company Use Example

- frontend 프로젝트의 `QA_REPORT.md`에는 `accessibility.standard=WCAG 2.2`, `policy.region`, `policy.last_checked`, `legal.not_advice`, `test.method`를 분리해 남긴다.
- 한국/미국/유럽 등 특정 납품 대상이 생기면 W3C 정책 색인을 시작점으로 쓰되, 최종 법률 판단은 해당 지역 공식 법령과 계약 요구사항으로 다시 확인한다.
- 접근성 이슈를 단순 "디자인 품질"이 아니라 요구 지역, 표준, 테스트 방법, 미확인 법적 리스크로 나누어 관리한다.

## WCAG / Accessibility Link

- 이 source 자체가 접근성 정책 색인이며, 실무 QA 기준은 WCAG 2.2를 기본 anchor로 둔다.
- 디자인 시스템이나 UI 컴포넌트 QA에서는 focus order, focus appearance, target size, error identification, consistent help, accessible name 같은 WCAG 2.2 기준을 연결한다.
- 정책 색인은 법률 자문이 아니므로 `not checked`에 지역별 법령 최신성, 계약 기준, 법무 검토 여부를 남긴다.

## Evidence Quality

- quality: medium
- 이유: W3C WAI 공식 색인이지만, 국가별 법률 최신성은 각 항목의 업데이트 날짜와 지역 공식 출처로 재확인해야 한다.
- 교차 검증: 기존 WCAG 2.2 source note, GOV.UK/USWDS/Carbon/GitLab accessibility source notes와 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance.
- 운영 제한: W3C 색인을 법률 확정 판단으로 오해하면 납품·규제 리스크가 생긴다. 실제 프로젝트에서는 지역별 공식 법령과 계약 요구사항을 확인해야 한다.

## Claim Split

- source-backed: W3C WAI가 국가별 접근성 정책 색인을 제공하며, 그 목록이 확정적 법률 목록은 아니라는 점.
- Dex inference: Dex Company QA에 `policy.region`, `policy.last_checked`, `legal.not_advice` 필드를 추가해야 한다는 판단.
- not checked: 특정 국가/산업/계약의 실제 법률 의무, 최신 법령 개정, 법무 검토.

