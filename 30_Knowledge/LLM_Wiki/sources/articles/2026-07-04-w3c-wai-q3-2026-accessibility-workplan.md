---
type: llm-wiki-source
status: active
title: "W3C WAI 2026 Q3 Accessibility Workplan"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: source-backed
evidenceScope: official-standards-workplan
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-standards-update
source: "https://www.w3.org/WAI/update/"
collectionPurpose: "frontend/UX/design-system QA에서 WCAG-EM과 ARIA in HTML 변경 감시 기준을 만들기 위한 W3C 공식 workplan"
tags:
  - llm-wiki/source
  - accessibility
  - wcag
  - frontend-qa
---

# W3C WAI 2026 Q3 Accessibility Workplan

## Original Content

- Source title: What We're Working On | Web Accessibility Initiative (WAI) | W3C
- URL: https://www.w3.org/WAI/update/
- Publisher: W3C Web Accessibility Initiative
- Collected at: 2026-07-04 KST
- Preserved excerpt: "We plan to publish the following documents in 2026 Q3"
- Confirmation scope: Checked W3C WAI's workplan page for Q3 2026 planned publications, including WCAG Evaluation Methodology 2.0 editor's draft, ARIA in HTML update, and WAI translations.

## Easy Summary

W3C WAI는 2026년 3분기에 WCAG 평가 방법론과 ARIA in HTML 업데이트를 예고하고 있다. 덱스 컴퍼니의 UI QA는 WCAG 2.2만 고정 체크리스트로 두지 말고, 평가 방법론과 ARIA 문서 변경도 추적해야 한다.

## Dex Company Use

- frontend/design-system Growth Scan 항목에는 `WCAG.anchor`, `evaluation.method`, `aria.html.checked`, `policy.last_checked`를 기록한다.
- UI QA 보고서에서 접근성 자동화만 통과했다고 전체 접근성 검증이 끝났다고 말하지 않는다.
- W3C 예정 문서는 표준 확정이 아니므로 draft/update 상태를 명확히 표시한다.

## Evidence Quality

- High: W3C WAI 공식 workplan이다.
- Cross-check: 기존 WCAG 2.2, W3C AI accessibility RQTF, W3C laws/policies source notes와 연결된다.
- Not checked: editor's draft 전문 변경사항, 특정 국가/산업 법률 의무, 실제 UI 테스트는 확인하지 않았다.

## WCAG / W3C QA Anchor

- 직접 연결: frontend, UX research, design-system 결과물의 접근성 검증은 WCAG 2.2와 WCAG-EM 관점으로 분리해야 한다.
- ARIA in HTML은 컴포넌트 role/name/value, landmark, dialog, status message 검증에 영향을 줄 수 있다.

## Source Classification

- source-backed: W3C WAI Q3 2026 planned publications.
- Dex inference: Growth Scan/QA template field additions.
- not checked: final publication status, legal obligation, local project accessibility result.
