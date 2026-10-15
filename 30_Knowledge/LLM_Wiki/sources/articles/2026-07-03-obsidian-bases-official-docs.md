---
type: llm-wiki-source
status: captured
title: "Obsidian Bases official documentation"
sourceKind: official-doc
sourceUrl: "https://help.obsidian.md/bases"
source:
  - "https://help.obsidian.md/bases"
  - "https://github.com/obsidianmd/obsidian-help/commits/master.atom"
publisher: Obsidian
capturedAt: 2026-07-03T16:13:07+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company vault에서 프로젝트/지식 노트를 구조화해서 조회하는 방법으로 Obsidian Bases를 검토한다."
confidence: medium
claimType: descriptive
evidenceScope: official-doc-rss
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - obsidian
  - llm-wiki
  - automation
---

# Obsidian Bases official documentation

## Source Snapshot

- Official docs: https://help.obsidian.md/bases
- Help repo commit feed: https://github.com/obsidianmd/obsidian-help/commits/master.atom

## Key Notes

Obsidian Bases는 vault 안의 notes를 structured view로 다루는 기능이다. Dex Company에서는 프로젝트 상태, source notes, queries, QA reports를 사람이 보기 쉬운 dashboard로 묶는 데 활용 가능성이 있다.

## Why It Matters

현재 덱스는 파일을 직접 읽고 쓰지만, 에던님이 장기적으로 볼 때는 "어떤 자료가 검증됐는지", "어떤 source가 inbox에 남았는지", "어떤 project가 QA 대기인지"를 Bases view로 보는 편이 운영상 편할 수 있다.

## Dex Company Use Example

- `30_Knowledge/LLM_Wiki/sources`의 `verificationStatus`, `confidence`, `tags`를 Bases에서 필터링한다.
- `10_Projects`의 `CURRENT.md`, `QA_REPORT.md`, `SESSION_HANDOFF.md` 상태를 dashboard화한다.

## Verification

- source-backed: Obsidian official help
- cross-check: obsidian-help GitHub commit feed 접근 확인
- not checked: 실제 Bases view 생성

## Original Content

원문 전체를 복사하지 않고, 공식 문서 URL과 덱스 컴퍼니 적용 가능성만 보존한다.

