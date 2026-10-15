---
type: llm-wiki-source
status: captured
title: "GitHub Copilot Cloud Agent Best Practices"
sourceKind: official-docs
sourceUrl: "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results"
source:
  - "https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results"
  - "https://docs.github.com/en/copilot/responsible-use/agents"
publisher: GitHub
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company가 agent 작업을 맡길 때 build/test/validate 환경과 human verification을 고정 기준으로 삼기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-docs
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - github
  - agents
  - qa
  - automation
---

# GitHub Copilot Cloud Agent Best Practices

## Source Snapshot

- URL: https://docs.github.com/en/copilot/tutorials/cloud-agent/get-the-best-results
- Cross-check: https://docs.github.com/en/copilot/responsible-use/agents
- Publisher: GitHub
- Captured for: Dex Company agent task quality and verification rules

## Key Notes

GitHub Docs는 agent 작업 품질을 높이려면 repository custom instructions로 build, test, validation 방법을 알려주고, generated code는 secure coding/code review/testing 기준으로 검증해야 한다고 설명한다.

## Why It Matters

Dex Company에서 자동화나 sub-agent 성격 작업을 맡길수록 "어떤 명령을 실행해야 성공인지"를 명시해야 한다. build/test/validate를 알려주지 않은 채 agent에게 맡기면 결과 검증이 느슨해진다.

## Dex Company Use Example

- 프로젝트 `CURRENT.md`에는 build/test/verify command를 함께 기록한다.
- `SESSION_HANDOFF.md`에는 "agent가 실제로 검증한 것"과 "사람이 봐야 하는 것"을 분리한다.
- 자동화 보고서는 생성 코드나 명령을 직접 실행하지 않았으면 `not checked`로 남긴다.

## Verification

- source-backed: GitHub 공식 cloud agent best-practices 문서와 responsible-use 문서를 확인했다.
- Dex inference: Dex Company의 handoff/QA 기준으로 변환한 내용은 GitHub agent best-practice를 운영 문서에 적용한 것이다.
- not checked: GitHub Copilot cloud agent를 실제로 구동하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, build/test/validate instruction 원칙, verification risk만 보존한다.
