---
type: llm-wiki-source
status: captured
title: "OpenAI Codex CLI 0.142.5 and 0.142.0 Changelog"
sourceKind: official-release-notes
sourceUrl: "https://developers.openai.com/codex/changelog"
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://github.com/openai/codex"
publisher: OpenAI
capturedAt: 2026-07-03T17:04:28+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Codex Desktop and CLI workflow decisions need current release notes for security, plugins, token budgets, and multi-agent delegation."
confidence: medium
claimType: historical
evidenceScope: official-release-notes
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - automation
  - security
---

# OpenAI Codex CLI 0.142.5 and 0.142.0 Changelog

## Source Snapshot

- URL: https://developers.openai.com/codex/changelog
- Cross-check: https://github.com/openai/codex
- Publisher: OpenAI
- Captured for: Dex Company Codex maintenance and automation safety

## Key Notes

Codex changelog에서 0.142.5는 Responses WebSocket request payload가 trace log에 기록되지 않도록 하는 보안성 bug fix를 포함한다. 0.142.0은 `/usage`, `/plugins`, rollout token budgets, app-server multi-agent delegation 설정 등 운영 흐름에 직접 영향을 주는 기능을 포함한다.

## Why It Matters

Dex Company는 Codex Desktop과 자동화를 운영 기반으로 쓰기 때문에, trace logging, plugin install recommendation, token budget, delegation 설정 변화가 곧 운영 리스크와 품질 기준이 된다.

## Dex Company Use Example

- 플러그인 추천/설치 기능은 자동 승인하지 않고 `ROLE_SKILL_INSTALL_AUDIT.md`와 사용자 승인 흐름을 유지한다.
- 긴 자동화에는 rollout token budget 또는 목표 budget을 명시해 중간 종료 기준을 남긴다.
- trace/logging 관련 변경은 비밀값과 사용자 입력 노출 위험 점검 항목으로 둔다.

## Verification

- source-backed: OpenAI 공식 Codex changelog와 openai/codex 저장소를 확인했다.
- Dex inference: token budget, plugin install, multi-agent delegation을 Dex Company 운영 규칙으로 연결한 것은 release note 기반 해석이다.
- not checked: 현재 로컬 Codex Desktop/CLI가 0.142.5 이상인지 이번 실행에서 직접 대조하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 릴리스 URL과 Dex Company 운영에 필요한 변경 유형만 보존한다.
