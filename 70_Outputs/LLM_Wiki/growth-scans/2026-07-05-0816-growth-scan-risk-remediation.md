---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Risk Remediation - 2026-07-05"
created: 2026-07-05
updated: 2026-07-05
confidence: high
claimType: operational
evidenceScope: local-audit
verificationStatus: verified
verifiedAt: 2026-07-05
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/growth-scan
  - dex-company
  - maintenance
  - watchdog
---

# Dex Company Growth Scan Risk Remediation - 2026-07-05

## Summary

이번 조치는 Growth Scan 자동화를 계속 돌리기보다, 에던님이 지적하신 네 가지 위험 신호를 먼저 줄이는 데 집중했습니다.

- Growth Scan / Weekly Synthesis 자동화는 모두 `PAUSED` 상태로 멈췄습니다.
- 과거 대형 session rollout 5개를 삭제하지 않고 `codex archive`로 보관 처리했습니다.
- `confidence: high`인데 Bias Check가 없던 LLM Wiki 노트 66개는 허위 검증 도장을 찍지 않고 `confidence: medium`으로 낮췄습니다.
- `D:\CodexProjects\codex setup`의 비정상 `.git` 상태는 `git init`으로 정상 repo 인식 상태까지 복구했습니다.
- `logs_2.sqlite`는 손상은 아니고 압축되지 않은 WAL SQLite DB로 확인했습니다. Codex 종료 후 백업+압축을 실행해 크기를 줄였습니다.

## Automations

| Automation | Status | Note |
|---|---:|---|
| `dex-company-growth-scan` | `PAUSED` | prompt는 UTF-8 TOML 기준 정상 파싱됨 |
| `dex-company-weekly-growth-synthesis` | `PAUSED` | prompt는 UTF-8 TOML 기준 정상 파싱됨 |

Pause 과정에서 Growth Scan prompt가 임시 placeholder로 덮이는 상황이 있었고, 즉시 `logs_2.sqlite`의 이전 실행 payload에서 복구했습니다. 복구 후 TOML 파싱 기준으로 Growth Scan prompt length는 `6493`, Weekly prompt length는 `4165`입니다.

## Risk 1 - logs_2.sqlite

### What It Means

`logs_2.sqlite`는 Codex 실행 로그 DB입니다. 크기가 커지면 app이 로그를 조회하거나 thread 상태를 읽는 과정에서 메모리를 더 많이 쓸 수 있습니다.

### Evidence

- File: `D:\Program Files\Codex\logs_2.sqlite`
- Size before compaction: `552.12MB`
- Size after compaction: `200.99MB`
- SQLite `integrity_check`: `ok`
- Journal mode: `wal`
- Estimated reclaimable free pages before compaction: about `339.6MB`
- Estimated reclaimable free pages after compaction: about `6.69MB`

### Action Taken

- Codex 실행 중에는 DB 압축을 거부하도록 안전장치를 둔 뒤, Codex 종료 후 `-Compact`를 실행했습니다.
- 압축 전 백업이 `D:\Program Files\Codex\maintenance-backups`에 생성됐습니다.
- 안전 압축 스크립트를 유지합니다.

Script:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File "D:\Program Files\Codex\automations\dex-company-growth-scan\compact-codex-logs-after-close.ps1" -Compact
```

이 스크립트는 Codex 프로세스가 실행 중이면 압축을 거부합니다. Codex를 완전히 닫은 뒤 실행하면 `maintenance-backups`에 백업을 만들고 `VACUUM`과 `integrity_check`를 수행합니다. 2026-07-05 08:28 KST 실행에서는 백업 생성과 압축이 완료됐습니다.

## Risk 2 - Session Rollouts

### What It Means

session rollout은 Codex 대화/작업 상태 기록입니다. 너무 커지면 thread inventory, app startup, memory use에 부담이 될 수 있습니다.

### Evidence

- Before: `171` files, about `2.53GB`
- After archive: `158` files, about `0.90GB`

### Action Taken

아래 5개 오래된 대형 세션을 삭제하지 않고 `codex archive`로 보관 처리했습니다.

- `019e4d48-4071-71f2-a876-6810325194fc` - about `790.48MB`
- `019e2456-7655-7db3-a259-da81f6ccc6a6` - about `280.51MB`
- `019de8a9-4699-7701-8333-4a33cddbcc43` - about `183.19MB`
- `019e19f8-dcfe-7d93-ba0a-c5ec35bf0280` - about `141.40MB`
- `019df76c-d80f-7823-82a5-1d23e9d8dc0d` - about `100.62MB`

필요하면 `codex unarchive <session-id>`로 되돌릴 수 있습니다.

## Risk 3 - High Confidence Without Bias Check

### What It Means

Bias Check가 없는데 `confidence: high`이면, 아직 편향/한계/반대 근거를 검토하지 않은 자료를 너무 확신하는 상태가 됩니다.

### Action Taken

- `confidence: high` + Bias Check 없음: `66 -> 0`
- 해당 66개 노트는 `confidence: medium`으로 낮췄습니다.
- 재승격 큐를 만들었습니다.

Queue:

```text
D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\audit\2026-07-05-bias-check-remediation-queue.md
```

실제 Bias Check를 추가하고 독립/공식 출처로 재확인한 노트만 다시 `confidence: high`로 올립니다.

## Risk 4 - Git State

### What It Means

`D:\CodexProjects\codex setup`에 `.git` 폴더가 있었지만 비어 있어서 Git이 repository로 인식하지 못하는 상태였습니다. 이 상태에서는 변경 추적, diff, 복구 기준이 약합니다.

### Action Taken

- `git init`을 실행해 repository 인식을 복구했습니다.
- `git rev-parse --show-toplevel`가 `D:/CodexProjects/codex setup`을 반환했습니다.

### Still Not Done

아직 commit, `.gitignore`, 추적 정책은 만들지 않았습니다. 현재 untracked 폴더는 다음과 같습니다.

- `.codex-remote-attachments/`
- `.lazyweb/`
- `drive_uploads/`
- `obsidian-codex-setup/`
- `outputs/`
- `work/`

이 폴더들은 실제 프로젝트 파일인지, 임시/출력/캐시인지 정책 확인이 필요해서 자동 commit하지 않았습니다.

## Final Verification

Latest preflight:

```text
D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260705-083105.md
```

Result:

- Failures: `0`
- Warnings: `0`
- Log DB size: PASS, `200.99MB`
- Rollout size: PASS, `0.9GB`
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS
- UTF-8 replacement scan: PASS

Codex Doctor:

- Thread inventory: PASS, rollout files and state DB agree.
- Remaining doctor failure: `TERM=dumb` in the non-interactive terminal. This is a terminal capability warning, not a thread/database corruption signal.

## Source-Backed Notes

- OpenAI Codex CLI reference confirms `codex archive`, `codex unarchive`, `codex delete`, and `codex doctor` are official CLI commands: https://developers.openai.com/codex/cli/reference
- SQLite WAL documentation explains checkpoint/locking behavior and why aggressive DB maintenance should be treated carefully while another process may be using the DB: https://sqlite.org/wal.html
- Git documentation confirms `git init` can initialize an existing directory and is the correct recovery path for a missing/empty repository skeleton: https://git-scm.com/docs/git-init

## Dex Inference

- The memory allocation screenshot is most likely connected to combined state/log/session pressure rather than a single corrupt file, because SQLite integrity is OK and Codex Doctor reports thread inventory agreement.
- Archive is the right first move for old large sessions because it is reversible, unlike deletion.
- Downgrading confidence is safer than adding fake Bias Check sections, because it preserves epistemic honesty.

## Not Checked

- `.gitignore` and first commit policy were not decided.
- Archived sessions were not reopened one by one after archive. Doctor thread inventory passed after archive.
