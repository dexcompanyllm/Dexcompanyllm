---
type: llm-wiki-schema
status: active
aliases:
  - Dex Company v5 schema
description: 'Dex Company local adaptation of LLM Wiki v5 verification metadata'
author: Dex
created: 2026-07-02
updated: 2026-07-04
dateCreated: 2026-07-02
dateModified: 2026-07-04
confidence: medium
layer: schema
related:
  - [[LLM Wiki Pattern]]
  - [[Dex Company LLM Wiki Operating Model]]
source:
  - [[LLM_WIKI_VERIFICATION_SCHEMA]]
  - https://llm-wiki.cmdspace.work/
  - https://github.com/johnfkoo951/cmds-llm-wiki
explored: false
claimType: prescriptive
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/schema
  - dex-company
---

# Dex Company v5 Verification Schema

## 목적

이 노트는 덱스 컴퍼니 LLM Wiki가 어떤 검증 메타데이터를 써야 하는지 설명합니다.

실제 운영 체크리스트는 `20_Codex_Handoff/LLM_WIKI_VERIFICATION_SCHEMA.md`에 있습니다. 이 노트는 LLM Wiki 안에서 schema 자체를 검색하고 연결하기 위한 설명용 노트입니다.

## Required v5 Fields

중요한 LLM Wiki note는 다음 key를 갖습니다.

```yaml
claimType:
evidenceScope:
verificationStatus:
verifiedAt:
verifiedBy:
disputed:
```

## Dex Company Rules

- 새 wiki page는 `explored: false`로 시작합니다.
- `confidence: high`에는 Bias Check가 필요합니다.
- `verificationStatus: verified`는 source trace가 분명하고 충돌이 없을 때만 씁니다.
- `verificationStatus: partial`은 유용하지만 아직 완전 검증은 아닌 synthesis의 기본값입니다.
- `disputed: true`는 충돌을 숨기지 않고 보존한다는 뜻입니다.
- raw source note는 provenance와 collectionPurpose를 보존합니다.
- tool output은 `70_Outputs/LLM_Wiki/`에 둡니다.

## Local Helpers

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\obsidian-codex-setup\llm-wiki-verify.ps1" -NotePath "30_Knowledge\LLM_Wiki\wiki\concepts\Example.md" -Apply
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\obsidian-codex-setup\llm-wiki-audit.ps1" -Apply
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\obsidian-codex-setup\llm-wiki-lint.ps1"
```

## Source Notes

- [[LLM_WIKI_VERIFICATION_SCHEMA]]
- [[LLM Wiki Pattern]]
- [[Dex Company LLM Wiki Operating Model]]
