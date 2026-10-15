---
type: llm-wiki-source
status: captured
title: "NN/g Stop Reporting UX Activity and Report Business Outcomes"
sourceKind: ux-research-article
sourceUrl: "https://www.nngroup.com/articles/reporting-ux-business-outcomes/"
source:
  - "https://www.nngroup.com/articles/reporting-ux-business-outcomes/"
publisher: Nielsen Norman Group
capturedAt: 2026-07-04T07:33:07+09:00
dateCreated: 2026-07-04
dateModified: 2026-07-04
created: 2026-07-04
updated: 2026-07-04
collectionPurpose: "Dex Company Growth Scan 보고서가 검색량이나 활동량에 머물지 않고 실제 운영 결과, 비용 절감, 위험 감소, 속도, 유지율 같은 outcome으로 이어졌는지 확인하는 기준으로 사용한다."
confidence: medium
claimType: prescriptive
evidenceScope: expert-ux-source
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - ux-research
  - report-quality
  - outcome-metrics
---

# NN/g Stop Reporting UX Activity and Report Business Outcomes

## Source Snapshot

- URL: https://www.nngroup.com/articles/reporting-ux-business-outcomes/
- Publisher: Nielsen Norman Group
- Author: Lola Famulegun
- Published: 2026-07-03
- Captured: 2026-07-04 07:33 KST

## Key Notes

NN/g는 UX 팀이 인터뷰 수, 테스트 수, SUS 같은 활동/상류 지표만 보고하면 리더가 투자 효과를 판단하기 어렵다고 설명한다. 대신 revenue, cost, risk, speed to market, retention/satisfaction 같은 비즈니스 결과와 연결해야 한다고 제안한다.

## Dex Company Use Example

- Growth Scan의 `Metrics`는 `searched.count`와 `stored.count`만으로 끝내지 않고, `operational_outcome.diff` 또는 `next_eval_passed` 같은 결과형 문장을 함께 남긴다.
- `Improvement Delta`에는 "무엇을 더 많이 저장했는가"보다 "다음 Dex 실행에서 어떤 판단/QA/승인 게이트가 더 좋아졌는가"를 적는다.
- UI/UX 프로젝트 보고서에는 task success, error rate, support contact, conversion, retention, rework reduction처럼 상류 UX 지표와 운영 지표의 연결을 분리한다.

## WCAG / Frontend QA Connection

이 자료는 접근성 표준 문서가 아니라 UX 성과 보고 기준이다. 다만 Dex Company가 frontend나 design-system QA를 보고할 때 WCAG 2.2 통과 여부를 단순 활동 지표로 쓰지 않고, keyboard/focus/error/label/contrast 문제가 실제 사용자 실패, 지원 요청, 리워크, 출시 지연 위험으로 이어지는지 함께 설명하는 데 연결할 수 있다.

## Verification

- source-backed: NN/g 공식 article 페이지에서 제목, 날짜, 요약, 핵심 프레임을 확인했다.
- cross-check: 기존 `NN/g Insights Aren't Outcomes` source note와 `LLM Wiki Growth Scan Report Improvement Model` guide가 adoption/outcome tracking을 이미 요구하고 있어 방향이 일치한다.
- Dex inference: Growth Scan 보고서에 `operational_outcome.diff`를 추가하는 것은 원문 그대로가 아니라 Dex Company 운영에 맞춘 적용이다.
- not checked: NN/g 유료 course 자료, article 전체 표/예시의 완전성, 실제 Ethan 프로젝트의 downstream business data는 확인하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공개 URL, 발행 메타데이터, 확인 가능한 핵심 요약, Dex Company 적용 기준, 미확인 범위만 보존한다.
