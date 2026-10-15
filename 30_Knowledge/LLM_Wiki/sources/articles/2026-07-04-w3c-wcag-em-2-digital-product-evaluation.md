---
type: llm-wiki-source
status: active
title: "W3C WCAG-EM 2 Digital Product Evaluation"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: source-backed
evidenceScope: official-draft-cross-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-standards-draft
source:
  - "https://www.w3.org/TR/wcag-em-2/"
  - "https://www.w3.org/WAI/test-evaluate/conformance/wcag-em/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
collectionPurpose: "frontend, dashboard, web deck, 문서형 산출물 QA를 단일 페이지 체크가 아니라 제품 범위, 대표 샘플, 완전한 프로세스, 평가 보고 단위로 기록하기 위한 W3C 공식 초안 근거를 보존한다."
tags:
  - llm-wiki/source
  - accessibility
  - wcag
  - wcag-em
  - frontend
  - qa
---

# W3C WCAG-EM 2 Digital Product Evaluation

## Original Content

- Source title: W3C Accessibility Guidelines Evaluation Methodology (WCAG-EM) 2.0
- URL: https://www.w3.org/TR/wcag-em-2/
- Publisher: W3C Accessibility Guidelines Working Group / W3C WAI
- Publication state checked: Group Note Draft, 2026-02-05
- Collected at: 2026-07-04 16:33 KST
- Preserved excerpt: "digital products conform to WCAG 2"
- Confirmation scope: Checked the WCAG-EM 2 draft, W3C WAI WCAG-EM overview, W3C WAI news page, and WCAG 2 overview. This note preserves metadata, short excerpt, summary, and Dex Company application only.

## Easy Summary

WCAG-EM 2는 웹페이지 하나만 보는 접근성 체크가 아니라 웹사이트, 웹 앱, 모바일 앱, 문서 같은 digital product를 범위와 샘플 기준으로 평가하는 방법론 초안이다. 덱스 컴퍼니 frontend QA에서는 "한 화면에서 axe를 돌렸다"를 전체 접근성 검증처럼 말하면 안 되고, 평가 범위, 대표 샘플, 핵심 기능, 완전한 프로세스, 결과 보고를 분리해야 한다.

## Dex Company Use

- frontend QA report에 `evaluation.scope`, `representative_sample`, `complete_processes`, `common_views`, `essential_functionality`, `report.statement_limit`를 추가한다.
- dashboard, web deck, admin tool, portfolio site처럼 화면과 상태가 여러 개인 산출물은 한 페이지만 체크하지 않는다.
- Playwright, axe, Storybook, Lighthouse 같은 도구 결과는 보조 증거로 기록하고, 사람 검토와 complete process 검토를 별도로 남긴다.
- PPT나 PDF 같은 document artifact도 접근성 Checker 결과만으로 전체 접근성 준수를 단정하지 않는다.

## Evidence Quality

- quality: medium
- 강점: W3C 공식 TR 초안이며 WAI overview와 WAI news에서 같은 초안 흐름을 확인했다.
- 한계: Group Note Draft라서 최종 표준이나 법적 의무로 말하면 안 된다.
- Cross-check: 기존 WCAG 2 overview, W3C WAI Q3 workplan note, W3C G73 long-description note, Storybook accessibility source notes와 함께 사용할 수 있다.

## WCAG / Accessibility QA Link

- 직접 연결된다. 이 자료는 WCAG 2 요구사항을 새로 만들지는 않지만, digital product 평가 범위와 보고 방법을 구조화한다.
- 실무 QA 기준:
  - 평가 대상 product와 제외 범위를 명확히 쓴다.
  - 공통 화면, 핵심 기능, 오류/빈 상태, 모바일/확대 화면을 representative sample에 넣는다.
  - 가입, 결제, 제출, export 같은 complete process는 중간 단계까지 포함한다.
  - sample 기반 평가는 전체 WCAG conformance claim으로 과장하지 않는다.
  - 보고서에는 자동 도구, 수동 검사, 사람 검토의 역할과 한계를 분리한다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- 라이선스/권한: W3C 문서는 W3C 문서 사용 정책을 따른다. 이 노트는 원문 전체를 복사하지 않고 URL, 확인 범위, 짧은 인용, 요약, 적용 기준만 보존한다.
- OWASP LLM 위험 분류: overreliance, insecure output handling, sensitive information disclosure.
- 보안 주의: 실제 제품 샘플 선정이나 스크린샷 수집 시 고객 정보, 이력서 개인정보, 내부 URL, 토큰, 계정 화면을 그대로 외부 도구에 업로드하지 않는다.

## Source Classification

- source-backed: WCAG-EM 2 draft metadata, WAI overview, WAI news, WCAG overview.
- Dex inference: Dex Company QA field additions and report wording.
- not checked: actual frontend repo, actual PPT/PDF, legal compliance, final WCAG-EM 2 publication status.

## Dex Company Operating Takeaway

Frontend와 web deck QA는 이제 "체크리스트 항목 몇 개 통과"가 아니라 "평가 범위와 샘플이 대표성을 갖는지"부터 기록해야 한다. 자동 검사 결과를 붙여도 `scope`, `sample`, `complete_process`, `manual_review`, `statement_limit`가 없으면 전체 품질 주장으로 쓰지 않는다.
