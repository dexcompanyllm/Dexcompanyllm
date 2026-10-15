---
type: llm-wiki-readme
status: active
aliases:
  - Dex Company LLM Wiki README
description: 'Human-readable entry note for Dex Company LLM Wiki'
author: Dex
created: 2026-07-02
updated: 2026-07-04
dateCreated: 2026-07-02
dateModified: 2026-07-04
confidence: medium
source:
  - [[LLM_WIKI_OPERATING_GUIDE]]
claimType: prescriptive
evidenceScope: local-test
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/readme
  - dex-company
---

# Dex Company LLM Wiki

이 폴더는 덱스 컴퍼니의 재사용 지식 계층입니다.

프로젝트 진행 상태를 넣는 곳이 아니라, 다음 프로젝트에서도 다시 쓸 수 있는 출처 기반 지식을 저장하는 곳입니다.

## 먼저 볼 문서

- [[index]]
- `20_Codex_Handoff/LLM_WIKI_OPERATING_GUIDE.md`
- `20_Codex_Handoff/LLM_WIKI_VERIFICATION_SCHEMA.md`

## 빠른 점검 명령

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\obsidian-codex-setup\llm-wiki-status.ps1"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\obsidian-codex-setup\llm-wiki-lint.ps1"
powershell.exe -NoProfile -ExecutionPolicy Bypass -File ".\obsidian-codex-setup\llm-wiki-audit.ps1" -Apply
```

## 에던님이 요청할 때 좋은 문장

```text
/지식관리 이 자료를 LLM Wiki 후보로 넣고, 출처와 목적이 충분하면 source note로 승격해줘.
```

```text
덱스, LLM Wiki 기준으로 이 프로젝트 판단에 참고할 만한 source-backed 내용과 Dex inference를 분리해서 알려줘.
```
