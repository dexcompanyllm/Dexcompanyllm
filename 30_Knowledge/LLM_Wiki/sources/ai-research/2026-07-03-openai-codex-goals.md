---
type: llm-wiki-source
status: captured
title: "OpenAI Codex - Using Goals in Codex"
sourceKind: official-cookbook
sourceUrl: "https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex"
source:
  - "https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex"
  - "https://developers.openai.com/codex/use-cases/follow-goals"
publisher: OpenAI
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company 자동화와 장기 작업이 open-ended backlog가 아니라 성공 조건과 검증 기준을 가진 목표로 운영되게 하기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-docs
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - automation
  - goals
---

# OpenAI Codex - Using Goals in Codex

## Source Snapshot

- URL: https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex
- Cross-check: https://developers.openai.com/codex/use-cases/follow-goals
- Publisher: OpenAI
- Captured for: Dex Company growth scans, long-running tasks, and completion criteria

## Key Notes

OpenAI의 Goals 자료는 Codex 장기 작업에 objective, success check, constraints, stopping condition을 명확히 주는 방식을 설명한다. 좋은 목표는 한 프롬프트보다 크지만 무기한 backlog보다는 작아야 한다.

## Why It Matters

에던님이 "일반의 10배 성과"라고 지시하셨을 때, 덱스가 단순히 오래 검색하거나 파일을 많이 만드는 방향으로 흐르면 품질이 떨어진다. Goal 개념은 10배 성과를 "더 많은 산출"이 아니라 "측정 가능한 고품질 루프"로 바꿀 수 있게 한다.

## Dex Company Use Example

- Growth Scan에 `objective`, `success metric`, `stop condition`, `not-to-change`를 기록한다.
- 장기 자동화는 다음 실행에서 반드시 이어받을 `deferred item`과 검증 명령을 남긴다.
- 완료 보고는 "많이 했다"가 아니라 status/lint/source-backed 비율/채택 항목으로 판단한다.

## Verification

- source-backed: OpenAI Cookbook과 Codex use-case goal 문서를 확인했다.
- Dex inference: Dex Company growth scan의 10배 성과 기준으로 goals를 적용하는 것은 공식 패턴의 운영 해석이다.
- not checked: 현재 Codex Desktop에서 `/goal` UI나 CLI feature flag가 활성화되어 있는지는 확인하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, 목표 설정 원칙, Dex Company 적용 포인트만 보존한다.
