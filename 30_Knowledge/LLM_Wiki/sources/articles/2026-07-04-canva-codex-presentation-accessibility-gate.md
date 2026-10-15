---
type: llm-wiki-source
status: captured
layer: source
title: "Canva Codex presentation accessibility gate"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-vendor-and-support-docs
source:
  - "https://www.canva.com/newsroom/news/deep-research-integration-mcp-server/"
  - "https://support.microsoft.com/en-us/accessibility/powerpoint/make-your-powerpoint-presentations-accessible-to-people-with-disabilities"
  - "https://www.w3.org/WAI/standards-guidelines/wcag/"
collectionPurpose: "Canva가 ChatGPT와 Codex 안에서 디자인 생성/편집/미리보기를 제공한다고 발표한 흐름을 Dex Company의 PPT/프레젠테이션 작업에 흡수하되, 계정/커넥터/파일 권한과 PowerPoint 접근성 검수를 분리하기 위한 기준으로 보존한다."
publisher: "Canva, Microsoft Support, W3C WAI"
license: "public web documentation; no raw article copy stored"
tags:
  - llm-wiki/source
  - presentation-design
  - canva
  - codex
  - accessibility
  - approval-gate
---

# Canva Codex Presentation Accessibility Gate

## Source Metadata

- 수집 시각: 2026-07-04 15:04 KST
- 자료 유형: 공식 제품 발표 + Microsoft 접근성 지원 문서 + W3C WCAG 개요
- 핵심 키워드: presentation design, Canva, Codex, ChatGPT, AI design workflow, PowerPoint accessibility, WCAG
- 확인 범위: Canva의 ChatGPT/Codex 내 디자인 생성/편집/미리보기 발표, Microsoft PowerPoint 접근성 권고, W3C WCAG의 web/document/software 접근성 기준 개요

## 쉬운 설명

Canva는 ChatGPT와 Codex 안에서 브랜드 디자인을 생성하고 편집하는 흐름을 공개했습니다. 덱스 컴퍼니 관점에서는 이 자료를 "프레젠테이션 초안 생성 후보"로 볼 수 있지만, 바로 연결하거나 설치할 근거는 아닙니다. Canva 계정, 브랜드 자산, 파일 권한, 결제, 외부 커넥터가 얽히므로 승인 준비 전까지는 지식으로만 흡수합니다.

프레젠테이션 결과물은 예쁘게 보이는지만 보면 부족합니다. Microsoft의 PowerPoint 접근성 문서는 읽기 쉬운 글꼴, 색상 대비, 접근성 검사기, 캡션/자막, 텍스트 정렬과 간격, 템플릿 사용을 강조합니다. W3C WCAG는 비웹 문서와 소프트웨어에도 적용 가능한 접근성 기준으로 참조할 수 있습니다.

## Dex Company 사용 예시

- `codex-ppt` 또는 Canva 계열 도구로 만든 발표 자료를 받을 때 `brand.source`, `asset.permission`, `slide.reading_order`, `contrast.checked`, `alt_text.checked`, `captions.checked`, `accessibility_checker.result`, `human_review.required`를 QA 항목으로 둡니다.
- Canva/Codex 연동 요청이 오면 먼저 `account.owner`, `workspace.permission`, `brand_kit.scope`, `file.sensitivity`, `export.formats`, `billing.owner`, `rollback.path`를 채운 뒤 승인 여부를 판단합니다.
- 에던님 제출용 PPT에서는 AI 생성 결과를 최종물로 보지 않고, Microsoft Accessibility Checker 또는 수동 QA로 텍스트 대비, 읽기 순서, 이미지 대체 텍스트, 영상 캡션을 다시 확인합니다.

## Evidence Quality

- source-backed: Canva 공식 뉴스룸은 ChatGPT와 Codex 안에서 디자인 생성/편집/미리보기를 제공하는 흐름을 설명합니다. Microsoft Support는 PowerPoint 접근성 검사와 읽기 쉬운 글꼴/대비/자막/템플릿 사용을 안내합니다. W3C WCAG 개요는 web, mobile, documents, software까지 적용 가능하다고 설명합니다.
- Dex inference: 덱스 컴퍼니에서는 Canva/Codex 자료를 발표자료 생성 후보로 쓰되, 결과물 품질은 별도 PPT 접근성 QA와 human review로 확인해야 합니다.
- not checked: 에던님의 Canva 계정/플랜, Codex 안의 Canva 앱 가용성, 브랜드 키트 접근권한, 결제 영향, 실제 생성 품질, PowerPoint Accessibility Checker 실행 결과, 생성물의 WCAG 적합성.

## Cross Verification

- Canva 공식 자료는 디자인 생성 기능의 제품 발표 근거입니다.
- Microsoft Support는 PowerPoint 파일 자체의 실무 접근성 검수 기준을 제공합니다.
- W3C WCAG는 접근성 기준을 웹/문서/소프트웨어까지 넓게 연결하는 표준 기준입니다.

## Approval / Security Notes

| Item | Decision | Reason |
|---|---|---|
| Canva app/connector in ChatGPT or Codex | approval-not-ready | 계정, 브랜드 자산, 파일 권한, 결제, 외부 커넥터 범위가 미확인입니다. |
| Canva MCP/server-style workflow | approval-not-ready | supply chain, connector permission, sensitive design data, prompt injection, insecure output handling, overreliance 검토가 필요합니다. |
| Knowledge-only source note | allowed | 실행 코드나 계정 연결 없이 공개 문서의 운영 기준만 보존합니다. |
| PPT accessibility QA checklist | allowed | Microsoft/W3C 기준을 QA anchor로 쓰는 문서형 지식입니다. |

## WCAG / Accessibility Link

- WCAG 1.1.1 Non-text Content: 이미지, 차트, 다이어그램에는 대체 텍스트나 긴 설명 경로가 필요합니다.
- WCAG 1.4.3 Contrast (Minimum): 텍스트와 배경 대비는 PPT에서도 실무 QA 기준으로 연결할 수 있습니다.
- Microsoft PowerPoint 접근성 검사기는 색상 대비와 읽기 순서 등 일부 문제를 찾는 보조 도구입니다. 검사기 통과가 모든 접근성 문제 해결을 의미하지는 않습니다.

## Original Content

이 note는 원문 전체를 복사하지 않습니다. Canva 공식 발표, Microsoft PowerPoint 접근성 지원 문서, W3C WCAG 개요에서 확인한 메타데이터, 핵심 요약, Dex Company 적용 기준, 승인/보안 경계, 접근성 QA anchor만 보존합니다.
