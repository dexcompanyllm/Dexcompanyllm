---
type: llm-wiki-report
status: final
confidence: high
claimType: operational-audit
evidenceScope: local-test
verificationStatus: verified
disputed: false
sourceKind: incident-audit
source:
  - "D:\\Program Files\\Codex\\automations\\dex-company-growth-scan\\automation.toml"
  - "D:\\Program Files\\Codex\\automations\\dex-company-weekly-growth-synthesis\\automation.toml"
  - "D:\\Program Files\\Codex\\automations\\dex-company-growth-scan\\growth-scan-preflight.ps1"
  - "D:\\Program Files\\Codex\\automations\\dex-company-growth-scan\\preflight-reports\\preflight-20260705-073651.md"
  - "D:\\CodexProjects\\codex setup\\work\\codex-memory-allocation-diagnostic-2026-07-04.md"
collectionPurpose: "Dex Company Growth Scan watchdog/preflight failure audit and recovery record"
dateCreated: 2026-07-05
dateModified: 2026-07-05
created: 2026-07-05
updated: 2026-07-05
verifiedAt: 2026-07-05
verifiedBy: Dex
tags:
  - llm-wiki/report
  - growth-scan
  - incident
  - watchdog
  - preflight
---

# Dex Company Growth Scan Watchdog / Preflight Audit

## Original Content

이 보고서는 2026-07-05 KST에 수행한 Dex Company Growth Scan 오류 재점검 결과입니다. 덱스가 스스로 학습했다는 의미가 아니라, 파일과 검증된 로컬 증거를 통한 덱스 컴퍼니 운영 지식 흡수입니다.

## Verdict

`NEEDS_DEX_REWORK`였고, 이번 회차에서 핵심 rework를 적용했습니다.

watchdog은 이전까지 최종 보고의 품질 감사로만 작동했고, 성장 스캔 실행 전 위험 신호를 차단하는 preflight gate가 아니었습니다. 그래서 `llm-wiki` skill 로드 실패, 0바이트 rollout, 로그/세션 비대화, `lint`가 잡지 못하는 audit risk가 PASS_WITH_WARNINGS로만 남았습니다.

## Root Cause

1. watchdog이 사후 감사 중심이었습니다.
2. 성장 스캔 프롬프트가 `가능한 경우 status/lint 실행`처럼 조건부 검증을 허용했습니다.
3. `llm-wiki` skill frontmatter 누락은 2026-07-04 19:30 로그에 이미 있었지만, 자동 중단 조건이 아니었습니다.
4. `llm-wiki-lint.ps1`는 schema/status 중심이라 `confidence: high` without Bias Check 66개를 warning으로 잡지 않았습니다.
5. 30분 간격 실행으로 reports/source/log/rollout이 빠르게 커졌지만, 용량/메모리 preflight가 없었습니다.
6. 2026-07-04 자정 전 임시 디자인 집중 모드가 prompt에 남아 있었고, 날짜 조건으로 무시 가능하더라도 stale prompt risk가 있었습니다.

## Applied Fixes

- Added preflight script:
  - `D:\Program Files\Codex\automations\dex-company-growth-scan\growth-scan-preflight.ps1`
- Updated `Dex Company Growth Scan` automation prompt:
  - removed stale temporary focus block
  - added mandatory `growth-scan-preflight.ps1 -RepairSafe`
  - changed watchdog from final comment to blocking quality gate
  - added audit risk handling for high confidence without Bias Check
- Updated `Dex Company Weekly Growth Synthesis` automation prompt:
  - added the same preflight stop-the-line gate
  - added weekly risk handling for preflight/watchdog signals
- Preserved previous safe repairs:
  - `llm-wiki` skill frontmatter fixed
  - 0-byte rollout session removed via official Codex CLI

## Current Metrics

| Field | Value | Basis |
|---|---:|---|
| llm_wiki.source_notes | 160 | `llm-wiki-status.ps1` |
| llm_wiki.wiki_notes | 7 | `llm-wiki-status.ps1` |
| growth_reports.count | 63 | local file count |
| preflight.failures | 0 | `preflight-20260705-073651.md` |
| preflight.warnings | 2 | log DB size and rollout size |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` |
| audit.high_confidence_without_bias_check | 66 | `llm-wiki-audit.ps1` |
| empty_rollout.count | 0 | local session scan |
| log_db.size_mb | 552.12 | `D:\Program Files\Codex\logs_2.sqlite` |
| rollout.size_gb | 2.53 | preflight |

## Verification

- `growth-scan-preflight.ps1 -RepairSafe`: PASS with 2 WARN
- `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`: PASS
- `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`: PASS with 0 warnings
- `llm-wiki-audit.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`: partial risk found, 66 high-confidence notes without Bias Check
- Automation prompt contains `Stop-the-line preflight`: PASS
- Automation prompt contains `growth-scan-preflight.ps1`: PASS
- Automation prompt contains `Watchdog gate`: PASS
- Automation prompt contains stale `임시 집중 모드`: FAIL not found, which is intended
- UTF-8 replacement scan: PASS

## Not Automatically Changed

- `logs_2.sqlite` was not compacted or deleted. It may affect performance, but log deletion/compaction while Codex is running can affect diagnostics.
- 2.53GB session rollouts were not archived or deleted. They may affect scan speed, but they are conversation/work history and need a retention policy.
- 66 high-confidence notes were not bulk-edited. Bias Check should be added note by note from evidence, not mass-stamped.
- Workspace `.git` corruption was not repaired. It is related to local project hygiene, not directly to Growth Scan execution, and needs a separate repository decision.

## New Operating Rule

Growth Scan must now stop before search or write if preflight has any FAIL. `PASS_WITH_WARNINGS` is allowed only when the remaining issue is not data integrity, runtime, security, provenance, encoding, or unauthorized-change related.

## Next Eval

The next scheduled Growth Scan must:

1. Run `growth-scan-preflight.ps1 -RepairSafe` first.
2. Include the preflight report path in its report.
3. Treat log DB and rollout size as warnings, not invisible background facts.
4. Avoid new source notes unless a source changes a concrete Dex Company operating rule or artifact QA field.
5. Reclassify at least one high-confidence-without-Bias-Check note as done/carried/blocked.
