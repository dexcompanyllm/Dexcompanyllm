---
type: llm-wiki-source
status: active
title: "Obsidian Attachment Cleanup and Bases Update"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: source-backed
evidenceScope: official-changelog
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog
source: "https://obsidian.md/changelog/"
collectionPurpose: "Obsidian Vault 파일 삭제/첨부 정리와 Bases 기반 LLM Wiki 운영 대시보드 후보를 점검하기 위한 공식 변경 신호"
tags:
  - llm-wiki/source
  - obsidian
  - vault-operations
  - llm-wiki
---

# Obsidian Attachment Cleanup and Bases Update

## Original Content

- Source title: Obsidian Changelog
- URL: https://obsidian.md/changelog/
- Publisher: Obsidian
- Collected at: 2026-07-04 KST
- Preserved excerpt: "When deleting a file, a prompt will ask if you would also like to delete its attachments."
- Confirmation scope: Checked the official Obsidian changelog for automatic attachment cleanup settings and Bases improvements such as search toolbar and drag/drop import.

## Easy Summary

Obsidian은 파일 삭제 시 관련 첨부 파일도 정리할지 묻는 기능과 Bases 검색/가져오기 개선을 추가했다. 덱스 컴퍼니에서는 삭제 작업과 첨부물 정리를 분리해서 기록해야 하며, Growth Scan backlog를 Bases로 보는 후보도 조금 더 현실적이 됐다.

## Dex Company Use

- Vault 파일 삭제 요청이 있으면 `note.delete`, `attachment.delete`, `cleanup.setting`, `rollback.path`를 분리한다.
- 자동화는 `.obsidian` 설정이나 첨부 삭제 동작을 임의로 바꾸지 않는다.
- Bases는 LLM Wiki source/reports 대시보드 후보지만, 실제 Base 파일 생성은 에던님 요청 또는 별도 프로젝트에서 진행한다.

## Evidence Quality

- High: Obsidian 공식 changelog다.
- Cross-check: 기존 Obsidian CLI/Bases source note와 같은 운영 계층이다.
- Not checked: 에던님 Vault의 현재 Obsidian 버전, Files & Links 설정값, Bases UI 동작, Sync 상태는 확인하지 않았다.

## Risk / Security

- 파일 삭제와 첨부 삭제는 되돌리기 어려울 수 있으므로 자동 실행 금지.
- 첨부물에는 private screenshot, PDF, exported docs가 있을 수 있어 민감 정보 노출 위험이 있다.

## Source Classification

- source-backed: Obsidian changelog의 attachment cleanup and Bases update.
- Dex inference: Dex Company deletion/attachment policy fields.
- not checked: local Obsidian version, Vault settings, actual attachment cleanup behavior.
