---
type: llm-wiki-source
status: active
title: "Shopify Polaris Web Components Accessibility"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://shopify.dev/docs/api/polaris/using-polaris-web-components"
  - "https://shopify.dev/docs/api/app-home/web-components"
  - "https://github.com/Shopify/polaris-react"
collectionPurpose: "Shopify admin/app UI를 참고할 때 Polaris React의 deprecated 상태와 Polaris Web Components 접근성 기준을 분리해 보존한다."
tags:
  - llm-wiki/source
  - design-systems
  - shopify
  - polaris
  - accessibility
---

# Shopify Polaris Web Components Accessibility

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 21:03 KST 기준 Shopify 공식 Polaris Web Components 문서와 Polaris React GitHub 상태의 URL, 확인 범위, Dex Company 적용 판단만 보존한다.

## Easy Explanation

Shopify는 새 앱 개발에서 Polaris Web Components를 기본 경로로 안내한다. 공식 문서는 semantic HTML, keyboard navigation, ARIA, focus management, color contrast, 접근성 속성 누락 경고를 접근성 기반으로 제시한다. 반면 Polaris React 저장소는 deprecated 상태로, 새 프로젝트에서 그대로 채택하기보다 migration risk를 확인해야 한다.

## Dex Company Use

- 커머스/admin UI를 만들 때 Polaris는 commerce workflow, form, table, empty state, merchant-facing wording 기준으로 참고한다.
- Shopify 앱 개발 후보에서는 React Polaris와 Web Components를 혼동하지 않는다.
- 접근성 QA에서는 label, error, heading level, keyboard navigation, hidden visual labels, ARIA role을 체크리스트에 넣는다.

## Evidence Quality

- high: Shopify 공식 개발 문서와 official GitHub repository 상태를 확인했다.
- cross-check: 기존 Storybook accessibility, GitLab accessibility tests, WCAG 2.2 source notes와 교차 사용 가능하다.
- risk: Polaris Web Components의 실제 component coverage나 production readiness는 프로젝트별로 확인해야 한다.

## WCAG / Accessibility QA Link

직접 연결된다. Shopify 문서는 semantic HTML, keyboard navigation, ARIA, focus, contrast를 말한다. Dex Company에서는 WCAG 2.2의 keyboard, focus visible, name/role/value, error identification, contrast, target size를 실제 app flow에서 검증해야 한다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Shopify 공식 문서는 Polaris Web Components 접근성 기반과 React Polaris deprecated 상태를 확인시킨다.
- Dex inference: 새 Shopify 계열 UI는 Web Components first로 검토하고, React Polaris 사용은 legacy compatibility 사유가 있을 때만 후보로 둔다.
- not checked: 실제 Shopify 앱에 Polaris Web Components를 설치하거나 빌드하지 않았다.
