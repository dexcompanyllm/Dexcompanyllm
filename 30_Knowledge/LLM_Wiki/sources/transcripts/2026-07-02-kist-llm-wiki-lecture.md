---
type: llm-wiki-source
status: source-pointer
aliases:
  - KIST LLM Wiki lecture
description: 'KIST lecture source pointer and extraction evidence for Dex Company LLM Wiki setup'
author: Dex
sourceKind: transcript
title: 'KIST LLM Wiki Lecture'
source: 'https://www.youtube.com/live/MRTQwBFURJs'
collectionPurpose: 'Dex Company LLM Wiki operating model'
sourceVersion: v1
supersedes:
supersededBy:
created: 2026-07-02
updated: 2026-07-02
dateCreated: 2026-07-02
dateModified: 2026-07-02
confidence: partial-auto-caption-and-visual-sample
claimType: mixed
evidenceScope: metadata-only
verificationStatus: partial
verifiedAt: 2026-07-02
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - dex-company
  - obsidian
  - codex
---

# KIST LLM Wiki Lecture

## Collection Purpose

덱스 컴퍼니에 LLM Wiki 방식을 흡수할 때 참고할 원천 자료다. 목적은 강의 내용을 그대로 복제하는 것이 아니라, Codex + Obsidian 운영체계에 맞는 source-backed knowledge workflow를 만들기 위한 근거를 보존하는 것이다.

## Source

- YouTube: https://www.youtube.com/live/MRTQwBFURJs
- Title: 에이전트를 위한 지식 베이스 : LLM Wiki 활용
- Channel: 한국과학기술연구원KIST
- Event description observed: 2026년 7월 1일 수요일, 14:00-15:00
- Runtime observed: about 1:24:29
- Speaker label observed in video frame: 구요한 강사

## Original Content

원문 전문은 이 노트에 복사하지 않는다.

Reason:

- YouTube 자동 자막 트랙은 player response에서 `한국어 자동 생성`으로 감지됐지만, timedtext endpoint는 빈 본문을 반환했다.
- Headless Chrome seek sampling에서는 플레이어가 자막 버튼을 `자막 사용 불가`로 보고했고, 10분 이후 재생 오류 상태로 전환됐다.
- 강의 전문을 장문으로 복제하지 않고, 출처 포인터와 검증 가능한 요약만 보존한다.

## Extraction Evidence

Local evidence files:

- `D:\CodexProjects\codex setup\work\kist-llm-wiki-caption-check.json`
- `D:\CodexProjects\codex setup\outputs\kist-llm-wiki-samples\samples.json`
- `D:\CodexProjects\codex setup\outputs\kist-llm-wiki-samples\frame-01-00-05-00.png`

Confirmed:

- YouTube watch page was reachable.
- Player metadata exposed the correct title and runtime.
- Initial player response exposed a Korean automatic caption track.
- Visual sample at 00:05:00 showed the lecture title slide and speaker label.

Not confirmed:

- Full spoken lecture transcript.
- Exact slide order after the first visible sample windows.
- Every claim made by the lecturer.

## Related Public Source Material

- `https://github.com/johnfkoo951/cmds-llm-wiki`
- `https://llm-wiki.cmdspace.work/`
- `https://github.com/johnfkoo951/cmds-system-files`
- `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`

## Source-Backed Takeaways

- The public template presents LLM Wiki as a vault pattern built around Raw Sources, Wiki, and Schema layers.
- The public template uses Ingest, Query, and Lint as core operations.
- The public template treats `index.md` and `log.md` as central files.
- The public template includes Codex-related mirrors, but Dex Company should not bulk-copy upstream harness files.

## Dex Application Notes

- Dex Company should use `30_Knowledge/LLM_Wiki/sources/` for source pointers and source-preserving notes.
- Dex Company should use `30_Knowledge/LLM_Wiki/wiki/` for distilled reusable knowledge.
- Dex Company should use `30_Knowledge/LLM_Wiki/queries/` for reusable answers.
- Dex Company should run `llm-wiki-lint.ps1` after meaningful ingest.

## Candidate Wiki Links

- [[LLM Wiki Pattern]]
- [[Dex Company LLM Wiki Operating Model]]

## Verification

- claimType: mixed
- evidenceScope: metadata-only
- verificationStatus: partial
- disputed: false

