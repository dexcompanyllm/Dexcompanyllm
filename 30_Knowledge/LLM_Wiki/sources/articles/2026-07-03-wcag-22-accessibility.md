---
type: llm-wiki-source
status: captured
title: "Web Content Accessibility Guidelines 2.2"
sourceKind: web-standard
sourceUrl: "https://www.w3.org/TR/WCAG22/"
source:
  - "https://www.w3.org/TR/WCAG22/"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
  - "https://github.com/w3c/wcag"
publisher: W3C
capturedAt: 2026-07-03T16:58:09+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company의 frontend, UX research, design systems 산출물 QA에서 접근성 기준을 source-backed 체크리스트로 사용하기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: web-standard
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - frontend
  - accessibility
  - ux
  - design-systems
---

# Web Content Accessibility Guidelines 2.2

## Source Snapshot

- URL: https://www.w3.org/TR/WCAG22/
- Overview: https://www.w3.org/WAI/standards-guidelines/wcag/
- GitHub repository: https://github.com/w3c/wcag
- Publisher: W3C
- Captured for: frontend QA, design system review, UX research criteria

## Key Notes

WCAG 2.2는 웹 콘텐츠 접근성 기준을 테스트 가능한 성공 기준 형태로 정리한 W3C Recommendation이다. 이번 실행에서는 Dex Company의 UI 구현, 디자인 시스템, QA 리포트에서 색 대비, 키보드 접근, 포커스 표시, 오류 안내, 입력 도움, 반응형 리플로우 같은 기본 품질 기준으로 활용할 수 있다.

## Why It Matters

Dex Company가 만드는 UI 결과물은 "보기 좋음"만으로 충분하지 않다. 접근성 기준을 체크리스트에 넣으면 디자인 리뷰와 구현 QA가 주관적 취향에서 끝나지 않고, 재사용 가능한 검증 기준을 가진다.

## Dex Company Use Example

- 프론트엔드 작업 후 QA 보고서에 키보드 접근, 포커스 표시, 텍스트 크기 조정, 모바일 리플로우, 오류 메시지 항목을 추가한다.
- 디자인 시스템 컴포넌트는 버튼, 입력, 메뉴, 탭, 모달 단위로 WCAG 관련 기준을 연결한다.
- UX research 결과를 보고할 때 사용성 이슈와 접근성 이슈를 분리해 우선순위를 매긴다.

## Verification

- source-backed: W3C WCAG 2.2 Recommendation 페이지와 WAI overview, GitHub repository를 확인했다.
- Dex inference: Dex Company QA 항목으로 변환한 부분은 W3C 기준을 운영 체크리스트로 해석한 것이다.
- not checked: 특정 프로젝트 UI에 WCAG 2.2 자동 검사나 수동 접근성 테스트를 수행하지는 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, overview, repository, Dex Company 적용 포인트만 보존한다.
