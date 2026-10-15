---
type: llm-wiki-source
status: captured
title: "OpenAI Web Search Tool Controls"
sourceKind: official-docs
sourceUrl: "https://developers.openai.com/api/docs/guides/tools-web-search"
source:
  - "https://developers.openai.com/api/docs/guides/tools-web-search"
  - "https://developers.openai.com/api/docs/changelog"
publisher: OpenAI
capturedAt: 2026-07-03T17:04:28+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Growth scans need stronger source controls, domain filtering, complete source listing, and live-access boundaries when using OpenAI web search integrations."
confidence: medium
claimType: prescriptive
evidenceScope: official-docs
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - openai-api
  - automation
  - source-verification
---

# OpenAI Web Search Tool Controls

## Source Snapshot

- URL: https://developers.openai.com/api/docs/guides/tools-web-search
- Cross-check: https://developers.openai.com/api/docs/changelog
- Publisher: OpenAI
- Captured for: Dex Company growth scan source discipline

## Key Notes

OpenAI의 web search 문서는 Responses API의 hosted `web_search`를 새 통합 기본 경로로 제시하고, domain filtering, sources field, external web access control, search context size, longer research controls를 설명한다.

## Why It Matters

Dex Company Growth Scan은 공개 자료를 찾아 저장하는 자동화이므로, 검색 결과의 출처 목록과 허용 도메인을 남기는 습관이 중요하다. 특히 의료, 법률, 금융, OpenAI API 변경처럼 최신성이 중요한 주제는 공식 도메인 필터와 source listing을 우선해야 한다.

## Dex Company Use Example

- OpenAI API 관련 검색은 `developers.openai.com`과 `github.com/openai`를 우선 도메인으로 둔다.
- 보고서 QA에 "검색 출처 목록이 남았는가"와 "도메인 필터 필요 여부를 판단했는가"를 추가한다.
- Chat Completions 검색 모델 또는 preview 검색 경로가 발견되면 legacy/migration-needed로 표시한다.

## Verification

- source-backed: OpenAI 공식 web search guide와 API changelog entry point를 확인했다.
- Dex inference: 자동화 보고서의 source-listing QA 항목은 공식 기능 설명을 Dex Company 운영 규칙으로 바꾼 것이다.
- not checked: 실제 OpenAI API 호출로 `sources` 필드나 `external_web_access`를 테스트하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL과 Dex Company 검색 검증에 필요한 기능 이름 및 적용 범위만 보존한다.
