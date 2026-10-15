---
type: llm-wiki-source
status: captured
title: "Design Tokens specification first stable version"
sourceKind: official-standard-note
sourceUrl: "https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/"
source:
  - "https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/"
  - "https://www.designtokens.org/"
publisher: W3C Design Tokens Community Group
capturedAt: 2026-07-03T16:19:28+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "덱스 컴퍼니 디자인 시스템과 DESIGN.md 패턴을 토큰 기반으로 구조화할 때 표준 출처로 사용한다."
confidence: medium
claimType: descriptive
evidenceScope: standards-community-doc
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - design-systems
  - design-tokens
  - frontend
---

# Design Tokens specification first stable version

## Source Snapshot

- W3C Community Group note: https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/
- DTCG site: https://www.designtokens.org/

## Key Notes

Design Tokens Community Group는 design system의 스타일 결정을 도구와 코드베이스 사이에서 교환할 수 있는 형식을 표준화한다. 디자인 시스템을 단순 guideline이 아니라 token format으로 관리할 근거가 된다.

## Why It Matters

덱스가 UI를 만들 때 색상/간격/타이포그래피를 매번 임의로 쓰지 않고, 프로젝트별 DESIGN.md와 token 구조를 함께 둬야 일관성이 생긴다.

## Dex Company Use Example

- `DESIGN.md`에 색상/spacing/type token 표를 둔다.
- frontend 구현에서는 CSS custom properties 또는 token JSON으로 연결한다.
- LLM Wiki에는 외부 디자인 시스템 사례를 source로 두고, 프로젝트 repo에는 실제 token만 반영한다.

## Verification

- source-backed: W3C Community Group note, Design Tokens Community Group site
- partial: specification 전문 및 tool compatibility는 이번 테스트 범위 밖
- not checked: 실제 token JSON 생성

## Original Content

원문 전체를 복사하지 않고, 표준화 출처와 덱스 컴퍼니 디자인 시스템 적용 기준만 보존한다.

