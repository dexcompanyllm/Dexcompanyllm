---
type: operating-guide
status: superseded-guide
aliases:
  - OneDrive Sync Guide
  - Legacy Vault Guide
description: 'GitHub main 기반 Obsidian 운영과 기존 OneDrive Vault의 read-only 보존 기준'
author: Dex
created: 2026-07-04
updated: 2026-08-21
confidence: medium
claimType: prescriptive
evidenceScope: official-docs-and-local-check
verificationStatus: verified
verifiedAt: 2026-08-21
verifiedBy: Dex
disputed: false
source:
  - https://obsidian.md/help/sync-notes
tags:
  - dex-company
  - obsidian
  - onedrive
---

# GitHub Sync and Legacy OneDrive Guide

## 현재 기준

Dex Company의 단일 기준정보는 GitHub `ethanhee890-commits/dex-company-wiki`의 `main`입니다. 현재 PC에서 Obsidian이 여는 Git working copy는 다음과 같습니다.

```text
D:\CodexProjects\codex setup\dex-company-wiki
```

기존 Vault 두 곳은 삭제하지 않고 read-only reference로 보존합니다.

```text
D:\OneDrive\ObsidianVault
D:\VibeProject\ObsidianVault\ObsidianVault
```

Codex, Obsidian, Growth Scan, Dex Company Wiki 플러그인은 모두 Git working copy만 읽고 씁니다. 기존 Vault에 자동화 출력을 쓰거나 양방향 동기화하지 않습니다.

## 표준 작업 흐름

1. 작업 전 `git fetch origin`과 `git pull --ff-only origin main`으로 원격 `main`을 확인합니다.
2. Obsidian에서는 `D:\CodexProjects\codex setup\dex-company-wiki`만 활성 Vault로 사용합니다.
3. 편집 후 `git status`, diff, 링크·lint·Secret 검사를 실행합니다.
4. `CURRENT_STATE.md`, `HANDOFF.md`, `CHANGELOG.md`와 필요한 프로젝트 문서를 갱신합니다.
5. 커밋·push 후 로컬 `main`과 `origin/main`의 커밋 일치를 확인합니다.
6. 다른 PC나 AI는 항상 GitHub `main`을 먼저 동기화한 뒤 작업합니다.

## 기존 OneDrive Vault 처리

- 2026-07-19에 VibeProject Vault를 OneDrive Vault로 비파괴 통합했던 기록은 유효한 역사 자료입니다.
- 2026-08-21에 두 기존 Vault를 검증 백업한 뒤 Git Vault로 최종 병합했습니다.
- 기존 Vault 파일은 임의로 삭제·이동하지 않습니다.
- 필요한 경우 누락 조사나 복원 근거로만 읽으며, 새 문서나 자동화 출력은 저장하지 않습니다.
- 기존 Vault 제거는 별도 요청과 zero-reference 재검증이 있을 때만 검토합니다.

## PC 사용 규칙

- Obsidian Sync core plugin은 명시적으로 전환하기 전까지 끈 상태를 유지합니다.
- 같은 파일을 여러 PC나 AI가 동시에 편집하지 않습니다.
- 편집 전 pull, 편집 후 push를 생략하지 않습니다.
- 충돌이 생기면 한쪽을 자동 덮어쓰지 않고 양쪽 의도를 비교합니다.
- 모바일 Git/Obsidian 운영 방식은 아직 확정하지 않았으며 현재 완료 범위에 포함하지 않습니다.

## 덱스 작업 기준

덱스가 Vault를 읽거나 쓸 때는 다음 순서로 확인합니다.

1. `D:\CodexProjects\codex setup\dex-company-wiki`가 존재하는지 확인합니다.
2. `.obsidian` 폴더가 있는지 확인합니다.
3. 원격 `main`과 로컬 HEAD의 일치를 확인합니다.
4. `vault-health-check.ps1`, LLM Wiki status/lint/audit와 Secret 검사를 실행합니다.
5. 필요한 경우에만 기존 OneDrive/VibeProject Vault를 백업 참조로 읽습니다.

## 위험 신호

- `git status`에 예상하지 않은 변경이 있음
- 로컬 `main`과 `origin/main`이 분기됨
- 자동화나 플러그인 설정에 기존 Vault 경로가 다시 나타남
- 같은 노트에 충돌 파일이 생김
- 파일이 0바이트가 됨
- Obsidian에서 노트가 갑자기 사라져 보임
- Secret 또는 개인 식별 경로가 staged diff나 Git 이력에서 탐지됨

이 경우 즉시 편집을 멈추고 Git 상태, 원격 이력, 검증 백업을 확인합니다.
