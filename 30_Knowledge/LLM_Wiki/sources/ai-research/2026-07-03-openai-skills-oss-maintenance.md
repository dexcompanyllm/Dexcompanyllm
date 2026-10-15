---
type: llm-wiki-source
status: captured
title: "OpenAI - Using Skills to Accelerate OSS Maintenance"
sourceKind: official-blog
sourceUrl: "https://developers.openai.com/blog/skills-agents-sdk"
source:
  - "https://developers.openai.com/blog/skills-agents-sdk"
  - "https://developers.openai.com/codex/prompting"
publisher: OpenAI
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company role routing, AGENTS.md, local skills, and repeatable workflow maintenance를 공개 OpenAI 운영 사례와 대조하기 위해 보존한다."
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
  - skills
  - agents
  - automation
---

# OpenAI - Using Skills to Accelerate OSS Maintenance

## Source Snapshot

- URL: https://developers.openai.com/blog/skills-agents-sdk
- Cross-check: https://developers.openai.com/codex/prompting
- Publisher: OpenAI
- Captured for: Dex Company skill routing and durable workflow rules

## Key Notes

OpenAI의 Agents SDK repo 운영 사례는 반복 작업을 repo-local skills, AGENTS.md, GitHub Actions로 구조화하는 방식을 설명한다. 중요한 포인트는 워크플로우를 저장소 안에 두고, 설명을 좋게 쓰고, 반복되는 mechanics는 skill/scripts로 분리하는 것이다.

## Why It Matters

Dex Company는 이미 Obsidian AGENTS, ROLE routing, local skills를 쓰고 있다. 이 자료는 그 방향이 "말 많은 운영문서"가 아니라 반복 가능한 workflow asset이 되어야 함을 확인해준다.

## Dex Company Use Example

- Growth Scan 자동화 프롬프트는 길어지면 `guide + checklist + source note template`로 분리한다.
- 역할별 반복 QA는 각 프로젝트 `AGENTS.md`와 local skill 형태로 승격한다.
- 좋은 skill 후보는 설명, 실행 조건, scripts, references, 검증 명령이 있어야 한다.

## Verification

- source-backed: OpenAI Developers blog와 Codex prompting 문서를 확인했다.
- Dex inference: Dex Company role routing을 repo-local skills pattern으로 강화하는 부분은 OpenAI 사례의 운영 해석이다.
- not checked: OpenAI Agents SDK repo의 실제 최신 skill 파일 전문은 이번 실행에서 읽지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, 운영 패턴, Dex Company 적용 포인트만 보존한다.
