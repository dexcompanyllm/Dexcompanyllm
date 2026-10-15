---
type: llm-wiki-index
status: active
aliases:
  - Dex Company LLM Wiki index
description: 'Entry point for Dex Company reusable LLM Wiki knowledge'
author: Dex
created: 2026-07-02
updated: 2026-07-19
dateCreated: 2026-07-02
dateModified: 2026-07-19
confidence: medium
source:
  - [[LLM_WIKI_OPERATING_GUIDE]]
  - [[LLM_WIKI_VERIFICATION_SCHEMA]]
claimType: prescriptive
evidenceScope: local-test
verificationStatus: partial
verifiedAt: 2026-07-05
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/index
  - dex-company
---

# LLM Wiki Index

이 문서는 덱스 컴퍼니 LLM Wiki의 첫 화면입니다. LLM Wiki는 현재 진행 중인 프로젝트 상태가 아니라, 여러 프로젝트에서 다시 쓸 수 있는 출처 기반 지식과 운영 규칙을 보관합니다.

## Model

- Raw Sources: 원본 출처와 수집 목적을 보존하는 `sources/`
- Wiki: 여러 source를 바탕으로 재사용 지식과 운영 규칙을 정리하는 `wiki/`
- Queries: 나중에 다시 묻고 synthesis할 질문을 남기는 `queries/`
- Lint: 구조와 metadata 점검 기록을 남기는 `lint/`
- Audit: 전체 지식 상태와 오래된/불확실한 노트를 점검하는 `audit/`
- Outputs: Graphify, formatter, growth scan 같은 외부 도구 출력물을 보관하는 `70_Outputs/LLM_Wiki/`

## Core Operations

| Operation | 목적 | 주요 결과물 |
|---|---|---|
| Ingest | 출처를 보존하고 중요한 내용을 기록 | `sources/<kind>/<date>-<title>.md` |
| Query | 누적된 source/wiki 기반으로 답변과 synthesis 수행 | `queries/<date>-<question>.md` |
| Verify | note의 v5 metadata와 source traceability 확인 | note frontmatter update 또는 verification result |
| Audit | v5 gap, unexplored page, stale note, disputed claim 점검 | `audit/<date>-llm-wiki-audit.md` |
| Lint | provenance, traceability, folder health 점검 | `lint/<date>-report.md` |

## Knowledge Areas

- Sources: `sources/articles/`, `sources/papers/`, `sources/books/`, `sources/transcripts/`, `sources/clippings/`, `sources/ai-research/`
- Wiki: `wiki/concepts/`, `wiki/entities/`, `wiki/guides/`, `wiki/maps/`
- Queries: `queries/`
- Historical automation outputs: `70_Outputs/LLM_Wiki/`

Folder paths are written as paths, not wikilinks. Use Obsidian search or filesystem search to inspect individual source and output notes.

## Start Here

- Current capability answer: [[2026-07-19-dex-company-current-learning-and-action-playbook]]
- Operating knowledge map: [[Dex Company Operating Capability Map]]
- Knowledge model: [[LLM Wiki Pattern]]
- Knowledge workflow: [[Dex Company LLM Wiki Operating Model]]
- Task checklists: [[Dex Company Task Checklists from Growth Scans]]
- UI and PPT quality: [[PPT Frontend Visual Communication Checklist]]
- Install and connector safety: [[Dex Company Approval-Ready Install Audit Model]]
- Growth scan method: [[Dex Company 10x Growth Scan Operating Model]]
- Growth report improvement: [[LLM Wiki Growth Scan Report Improvement Model]]
- Historical weekly synthesis: [[2026-07-04-dex-company-growth-scan-weekly-synthesis]]

## Schema Notes

- [[LLM_WIKI_OPERATING_GUIDE]]
- [[LLM_WIKI_VERIFICATION_SCHEMA]]
- [[Dex Company v5 Verification Schema]]

## Operating Rules

- Active project state belongs in `10_Projects/<ProjectName>/`; reusable source-backed knowledge belongs here.
- Preserve a source note before creating or changing synthesized wiki knowledge.
- New wiki pages start with `explored: false`.
- Separate `source-backed`, `Dex inference`, and `not checked` in reusable answers and reports.
- Record `claimType`, `evidenceScope`, `verificationStatus`, `verifiedAt`, `verifiedBy`, and `disputed` on important notes.
- Do not install executable tools, connectors, MCP servers, packages, skills, or account integrations until [[Dex Company Approval-Ready Install Audit Model]] is satisfied for the exact target.
- Start task-specific work from [[Dex Company Operating Capability Map]] instead of scanning every source or historical output.
- Run status, lint, audit, and UTF-8 checks after meaningful knowledge changes.
## Known Limits

- KIST lecture source note는 공개 metadata, repository reference, LLM Wiki documentation 기반이다. 전체 강의 transcript 검증은 아직 완료되지 않았다.
- 영상 속 실제 발화 claim은 transcript, captions, slides, source-backed excerpt가 있을 때만 확정한다.
- 설치 후보는 유용해 보여도 target project, permission, rollback, validation이 확인되기 전에는 승인 요청으로 올리지 않는다.
