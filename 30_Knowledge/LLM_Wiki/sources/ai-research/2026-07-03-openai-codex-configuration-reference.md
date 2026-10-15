---
type: llm-wiki-source
status: active
title: "OpenAI Codex Configuration Reference"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: single-source
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://developers.openai.com/codex/config-reference"
collectionPurpose: "Dex Company의 Codex config, requirements, MCP, feature flag, automation 관련 운영 설정을 공식 reference 기준으로 확인한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - configuration
---

# OpenAI Codex Configuration Reference

## Original Content

원문 전체를 복사하지 않는다. OpenAI Developers의 Codex configuration reference URL과 Dex Company 운영 적용 범위만 보존한다.

## Easy Explanation

Codex 설정 파일과 requirements 설정을 확인할 때 쓰는 공식 reference다. Goal, MCP, plugin, automation처럼 설정에 따라 동작이 달라지는 영역에서 기억보다 공식 문서를 우선하게 해준다.

## Dex Company Use

- 자동화가 실패했을 때 prompt 문제가 아니라 config 문제인지 분리한다.
- MCP/skills/goals 관련 기능을 켤 때 근거 문서로 쓴다.
- 개인 지침과 프로젝트 지침이 config와 충돌하는지 확인한다.

## Evidence Quality

- high: OpenAI 공식 reference.
- cross-check: Codex best practices, prompting, MCP 문서와 연결된다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Codex config reference가 config.toml 및 requirements.toml의 검색 가능한 reference라는 점.
- Dex inference: Dex Company 자동화/설치 문제 진단용 기준으로 쓰는 판단.
- not checked: 현재 로컬 Codex config 파일 전체와 대조하지는 않았다.
