---
type: llm-wiki-source
status: captured
title: "GitHub Copilot Code Review Custom Instructions"
sourceKind: official-docs
sourceUrl: "https://docs.github.com/en/copilot/tutorials/customize-code-review"
source:
  - "https://docs.github.com/en/copilot/tutorials/customize-code-review"
  - "https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot"
  - "https://github.blog/changelog/2026-07-17-copilot-code-review-customization-and-configurability-improvements/"
publisher: GitHub
capturedAt: 2026-07-03T18:42:11+09:00
created: 2026-07-03
updated: 2026-07-19
dateCreated: 2026-07-03
dateModified: 2026-07-19
collectionPurpose: "Dex Company의 AGENTS.md, project instructions, code review criteria를 repo/path-specific instruction 구조로 더 선명하게 만들기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-19
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - github
  - code-review
  - instructions
  - qa
---

# GitHub Copilot Code Review Custom Instructions

## Source Snapshot

- URL: https://docs.github.com/en/copilot/tutorials/customize-code-review
- Cross-check: https://docs.github.com/en/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- Publisher: GitHub
- Captured for: Dex Company review instructions and path-specific QA rules

## Key Notes

GitHub Docs는 Copilot code review에 repository-wide instruction과 path-specific instruction을 줄 수 있음을 설명한다. 문서는 concise instruction, supported/unsupported instruction type, file organization을 강조한다.

## 2026-07-19 Refresh

GitHub의 2026-07-17 changelog는 Copilot code review가 PR head branch의 `copilot-instructions.md`, `*.instructions.md`, agent skills, `AGENTS.md`를 읽는다고 설명한다. 또한 `REVIEW.md`, `GEMINI.md`, `CLAUDE.md` 파일 지원, review 전용 `copilot-code-review.yml` setup, 기본 firewall, self-hosted runner firewall 미지원, cloud agent와 분리된 runner configuration을 공지했다.

Dex Company에 흡수할 규칙은 Copilot 도입이 아니라 code-review agent 환경을 신뢰하기 전 확인해야 하는 QA gate다.

## Why It Matters

Dex Company의 AGENTS.md도 한 파일에 모든 것을 넣으면 무거워진다. project-wide 규칙과 path-specific 규칙을 나누면 덱스가 필요한 문맥만 읽고 더 정확히 검토할 수 있다.

## Dex Company Use Example

- Vault root AGENTS.md는 전역 운영 원칙만 둔다.
- 프로젝트별 `10_Projects/<ProjectName>/AGENTS.md`에는 해당 프로젝트의 build/test/source rules를 둔다.
- 코드 repo에는 `.github/copilot-instructions.md`에 대응되는 Codex용 `AGENTS.md`를 두고, 화면/문서/테스트별 세부 규칙은 별도 instruction note로 나눈다.
- PR review나 자동 code review 결과를 받을 때는 head branch에서 바뀐 `AGENTS.md`, `REVIEW.md`, `*.instructions.md`, agent skill, review setup YAML을 먼저 diff로 확인한다.
- review 환경이 별도 setup이나 runner를 쓰면 dependency install, network/firewall, self-hosted runner 예외, secret 접근, rollback을 QA evidence로 남긴다.

## Verification

- source-backed: GitHub 공식 custom instructions tutorial, 추가 문서, 2026-07-17 GitHub Changelog를 확인했다.
- Dex inference: Copilot instructions 구조를 Dex Company AGENTS/project instruction 구조로 해석한 것이다.
- not checked: GitHub Copilot을 현재 repo에서 실제로 실행하거나 설정하지 않았다. Copilot code review, firewall, runner, usage/billing, organization policy의 에던님 계정 적용 여부도 확인하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, instruction 구조, Dex Company 적용 포인트만 보존한다.

2026-07-19 refresh: 2026-07-17 GitHub Changelog에서 추가된 head-branch instruction, `REVIEW.md` 등 추가 instruction 파일, review 전용 setup YAML, 기본 firewall, self-hosted runner 예외, 분리된 runner configuration을 보존했다.
