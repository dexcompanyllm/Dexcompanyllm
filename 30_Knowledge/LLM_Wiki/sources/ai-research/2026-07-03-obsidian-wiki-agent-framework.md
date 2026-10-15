---
type: llm-wiki-source
status: captured
title: "Ar9av obsidian-wiki agent framework"
sourceKind: github-repository
sourceUrl: "https://github.com/ar9av/obsidian-wiki"
source:
  - "https://github.com/ar9av/obsidian-wiki"
  - "https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f"
publisher: Ar9av
capturedAt: 2026-07-03T15:52:53+09:00
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Karpathy LLM Wiki 패턴을 Obsidian과 여러 coding agent에 연결하는 외부 구현을 참고하되, 덱스 컴퍼니 기존 file-first 구조와 충돌 여부를 검토한다."
confidence: medium
claimType: descriptive
evidenceScope: github-readme
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - obsidian
  - llm-wiki
  - ai-agents
---

# Ar9av obsidian-wiki agent framework

## Source Snapshot

- Repository: https://github.com/ar9av/obsidian-wiki
- Related base idea: https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f

## Key Notes

이 저장소는 Karpathy LLM Wiki 패턴을 Obsidian vault, CLI, lint/query/doctor, 여러 agent skill 설치 흐름으로 묶는 framework를 제안한다. README는 Codex, Claude Code, Cursor 등 여러 에이전트와의 호환을 설명한다.

## Why It Matters

덱스 컴퍼니는 이미 자체 LLM Wiki 구조를 갖고 있다. 따라서 이 저장소는 대체 설치 대상이라기보다, doctor/lint/query 명령과 multi-agent skill wiring 아이디어를 비교 검토하는 자료로 유용하다.

## Dex Company Use Example

- 기존 `llm-wiki-status.ps1`, `llm-wiki-lint.ps1`, `collect-project-context.ps1`와 기능을 비교한다.
- 바로 설치하지 않고, "doctor 결과 포맷", "wiki query CLI", "vault config protocol"만 후보로 추출한다.

## Verification

- source-backed: GitHub README와 Karpathy gist
- risk: 기존 Dex Company vault 구조와 중복/충돌 가능성
- not checked: pip install, setup.sh, skills symlink 동작

## Original Content

원문 전체를 복사하지 않고, GitHub README와 Karpathy gist에서 확인한 메타데이터를 보존한다. 이 framework는 Obsidian vault, CLI, query/lint/doctor, 여러 coding agent skill wiring을 LLM Wiki 패턴으로 묶는 접근을 제안한다.
