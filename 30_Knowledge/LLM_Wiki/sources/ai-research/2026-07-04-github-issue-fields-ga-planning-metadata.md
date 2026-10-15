---
type: llm-wiki-source
status: active
title: "GitHub Issue Fields GA Planning Metadata"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-changelog-and-docs
source: "https://github.blog/changelog/2026-07-02-issue-fields-are-now-generally-available/"
collectionPurpose: "Dex Company PL/GitHub issue 운영에서 priority, effort, date, visibility, MCP-readable issue metadata를 구조화할 수 있는지 판단하기 위해 저장한다."
publisher: "GitHub"
collectedAt: 2026-07-04T02:34:34+09:00
keywords:
  - GitHub
  - issue fields
  - PL
  - MCP
  - project management
  - automation
tags:
  - llm-wiki/source
  - ai-research
  - github
  - planning
---

# GitHub Issue Fields GA Planning Metadata

## Original Content

- 원문 전체를 복사하지 않고, 공개 GitHub changelog와 GitHub Docs에서 확인한 메타데이터, 요약, 검증 범위만 보존한다.
- Primary source: https://github.blog/changelog/2026-07-02-issue-fields-are-now-generally-available/
- Cross-check source: https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-fields-in-your-organization
- 수집 시각: 2026-07-04 02:34 KST

## Easy Summary

GitHub Issue Fields가 2026-07-02에 일반 제공 상태가 되었다. 조직 단위에서 Priority, Effort, Start date, Target date 같은 기본 필드와 커스텀 필드를 이슈에 붙일 수 있고, 값은 이슈 목록과 프로젝트에서 일관되게 보인다. 공개 프로젝트에서는 필드 가시성을 조직 내부용 또는 공개용으로 나눌 수 있다.

## Source-Backed Notes

- GitHub changelog는 Issue Fields가 Free, Team, Enterprise, Enterprise Cloud with data residency 조직에 제공되며 GitHub Enterprise Server 3.23에도 포함될 예정이라고 밝혔다.
- 새 기능에는 issues list 표시, public project support, GitHub MCP server를 통한 read/set 가능성, 비영어 필드명 지원이 포함된다.
- GitHub Docs는 issue fields가 조직 레벨에 정의되고 전체 저장소의 이슈에 적용된다고 설명한다.
- Docs 기준 기본 필드는 Priority, Effort, Start date, Target date이며, field visibility는 Organization only와 Public로 나뉜다.
- Docs는 project-level custom fields와 issue fields가 공존할 수 있지만 같은 개념을 중복 추적하면 혼란이 생길 수 있다고 경고한다.

## Dex Company Use

- PL 역할에서 GitHub Issues를 쓰는 프로젝트는 label 남발 대신 `Priority`, `Effort`, `Target date`, `Risk`, `QA status` 같은 issue fields를 표준 운영 메타데이터 후보로 볼 수 있다.
- Obsidian이 source of truth인 프로젝트에서는 GitHub issue fields를 실행/트래킹 표면으로만 쓰고, 의사결정 원문은 `10_Projects/<ProjectName>/DECISIONS.md`와 `SESSION_HANDOFF.md`에 남기는 구분이 필요하다.
- MCP 연동을 검토할 때는 "AI가 이슈 필드를 읽고 쓸 수 있다"와 "Dex가 해당 저장소에서 필드를 수정해도 된다"를 분리해서 승인해야 한다.

## Evidence Quality

- evidence quality: high for public feature availability; medium for Dex Company adoption.
- cross verification: GitHub changelog plus GitHub Docs.
- not checked: 에던님의 GitHub 조직 권한, MCP server 연결, 실제 issue field 생성/수정, GitHub Enterprise Server 3.23 환경은 확인하지 않았다.

## Risk Notes

- security/permission: MCP 또는 Copilot이 issue fields를 설정하게 하면 excessive agency와 insecure plugin design 위험이 생긴다. 필드 쓰기 권한은 저장소/조직별로 명시 승인해야 한다.
- data exposure: public visibility field에는 내부 우선순위, 고객명, 일정 리스크, 보안 상태를 넣으면 안 된다.
- reliability: project field와 issue field가 같은 의미로 중복되면 보고 지표가 갈라진다.
- install.status: documentation-only. GitHub 앱, MCP 서버, Copilot 설정, workflow를 설치하거나 실행하지 않았다.

## Classification

- source-backed: GitHub Issue Fields GA, default fields, visibility, organization-level source of truth.
- Dex inference: Dex Company PL 메타데이터 표준 후보와 Obsidian/GitHub source-of-truth 분리.
- not checked: live org availability, account permission, actual MCP write behavior.
