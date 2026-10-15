---
type: llm-wiki-source
status: captured
title: "W3C Technique G73 long description QA"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: prescriptive
evidenceScope: official-docs-cross-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-accessibility-technique
source:
  - "https://www.w3.org/WAI/WCAG21/Techniques/general/G73"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://www.w3.org/WAI/update/"
  - "[[2026-07-04-github-copilot-vision-ga]]"
publisher: "W3C Web Accessibility Initiative"
collectionPurpose: "차트, 이미지, PDF, AI vision 기반 QA에서 짧은 대체 텍스트만으로 부족한 시각 정보를 긴 설명 링크와 복귀 경로로 검증하는 실무 기준을 보존한다."
tags:
  - llm-wiki/source
  - accessibility
  - wcag
  - frontend
  - qa
  - vision
---

# W3C Technique G73 long description QA

## Original Content

- 수집 시각: 2026-07-04 11:34 KST
- 자료 유형: W3C WAI 공식 WCAG Technique
- 직접 확인한 최신성: G73 페이지 footer는 "Updated 15 July 2025"로 표시된다. 검색 snippet에서 더 최근 업데이트처럼 보인 신호는 본문 footer와 일치하지 않아 최신 뉴스로 취급하지 않았다.
- 핵심 내용 쉬운 설명: 복잡한 차트, 이미지, 오디오 transcript처럼 짧은 대체 텍스트만으로 충분하지 않은 non-text content는 바로 옆에 긴 설명으로 가는 링크를 두고, 설명이 같은 정보량을 전달하며, 사용자가 원래 위치로 돌아올 수 있어야 한다.
- Dex Company 사용 예시: 화면 QA 보고서, 대시보드 차트, 포트폴리오 이미지, PDF 리뷰, Copilot Vision 같은 이미지/PDF 분석 흐름에서 "AI가 이미지를 봤다"와 "사용자가 접근 가능한 설명을 받는다"를 분리한다.
- source-backed: W3C G73는 WCAG 1.1.1 Non-text Content에 관련된 sufficient technique이며, 링크 위치, 설명 대상, 정보 동등성, 복귀 경로를 테스트 절차로 둔다.
- Dex inference: 덱스 컴퍼니 QA 템플릿은 이미지/PDF/차트가 있으면 `long_description.link`, `description.equivalence`, `return.path`, `visual_input.sensitivity`, `human_review.required`를 별도 필드로 기록하는 편이 좋다.
- not checked: 현재 진행 중인 UI, PDF, 차트, 포트폴리오에 실제 G73 검사를 수행하지 않았다. G73는 WCAG를 만족하는 예시 기법이지 유일한 필수 구현 방식은 아니다.

## Evidence Quality

- quality: medium
- 강점: W3C WAI 공식 문서이고, WCAG overview가 WCAG 2 지원 자료로 Techniques를 설명한다.
- 교차 검증: W3C WCAG overview는 WCAG 2가 이미지, 소리, 코드/마크업을 포함한 web content 접근성을 다루며, supporting material에 Techniques for WCAG 2가 포함된다고 설명한다. WAI Q3 workplan은 WCAG-EM과 ARIA in HTML 업데이트를 추적해야 하는 근거다. 기존 GitHub Copilot Vision source note는 이미지/PDF 입력이 가능해질수록 접근 가능한 설명 QA가 필요하다는 운영 맥락을 제공한다.
- 한계: G73 footer 기준 최신 업데이트는 2025-07-15이다. 이번 실행의 최신 공식 신호라기보다 기존 vision/frontend QA를 구체화하는 안정 기준으로 흡수했다.

## WCAG / Accessibility QA Link

- 직접 연결: G73는 WCAG 1.1.1 Non-text Content 관련 sufficient technique이다.
- 실무 QA 기준:
  - non-text content 바로 전후에 긴 설명 링크가 있는지 확인한다.
  - 링크가 해당 이미지, 차트, PDF excerpt, transcript의 정확한 긴 설명으로 이동하는지 확인한다.
  - 긴 설명이 원본 non-text content와 같은 핵심 정보를 전달하는지 확인한다.
  - 사용자가 원래 위치로 돌아갈 수 있는 back 기능 또는 명시 링크가 있는지 확인한다.
- 적용 주의: G73를 통과해도 전체 WCAG 2.2 준수는 아니다. keyboard, focus, contrast, name/role/value, error handling, responsive behavior는 별도 검사해야 한다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- 라이선스/권한: W3C WAI material은 W3C permission 정책을 따른다. 이 노트는 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, 적용 기준만 보존한다.
- OWASP LLM 위험 분류: overreliance, sensitive information disclosure, insecure output handling.
- 보안 주의: 긴 설명 작성 과정에서 private screenshot, PDF, 고객 데이터, 이력서 개인정보를 AI 도구에 그대로 업로드하지 않는다. 필요한 경우 redaction과 human review를 먼저 수행한다.

## Dex Company Operating Takeaway

- 이미지/PDF/차트 QA는 "시각 입력을 분석했다"가 아니라 "사용자에게 같은 정보를 접근 가능한 방식으로 제공했다"까지 확인해야 한다.
- AI vision 도구가 설명을 생성하더라도 최종 긴 설명은 사람이 정보 동등성, 민감정보, 링크 위치, 복귀 경로를 확인해야 한다.
- 다음 frontend 또는 portfolio QA report에는 `long_description.link`, `description.equivalence`, `return.path`, `WCAG.anchor=1.1.1`, `human_review.required=true`를 넣는 것이 좋다.
