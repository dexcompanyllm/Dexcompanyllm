---
type: growth-scan-report
status: no-new-durable-change
automation: dex-company-growth-scan
created: 2026-07-20 13:05:06 +09:00
updated: 2026-07-20 13:09:00 +09:00
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-20
verifiedBy: Dex
disputed: false
tags:
  - growth-scan
  - dex-company
  - llm-wiki
  - codex
  - currentness-check
  - low-ram-backoff
---

# Dex Company Growth Scan - Low RAM Codex Currentness Alpha Issue No Durable Change

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-20 13:05:06 +09:00
- 회차 성격: 13:00 KST fast discovery / currentness check
- 실행 모드: low-RAM backoff + queue-closed currentness verification
- 확인한 로컬 범위: 현재 작업 폴더, `AGENTS.md`, 자동화 memory 최근 구간, `llm-wiki`/`dex-watchdog` skill, Dex Company handoff docs, LLM Wiki index/log, 10x candidate queue, 최근 Growth Scan 보고서.
- 확인한 공개 출처:
  - OpenAI Codex changelog: https://learn.chatgpt.com/docs/changelog
  - openai/codex GitHub releases: https://github.com/openai/codex/releases
  - openai/codex GitHub issue #34096: https://github.com/openai/codex/issues/34096
- 제한한 범위: broad collection, browser-heavy work, package/tool execution, source note 생성, wiki/index/log/candidate queue 변경, 설치/연결/권한 변경은 수행하지 않았습니다.

## Preflight 결과

- Result: PASS
- Report path: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260720-130313.md`
- Failures: 0
- Free RAM: 1.01GB
- Interpretation: PASS이지만 1.0GB-1.3GB low-RAM backoff 범위입니다. 이번 회차는 official currentness check와 issue-level regression signal triage로 제한했습니다.

## Metrics

| Metric | Count | Notes |
|---|---:|---|
| searched.count | 3 | OpenAI Codex changelog, openai/codex releases, openai/codex issue #34096을 확인했습니다. |
| stored.count | 1 | 이 report 1개만 저장했습니다. durable source/wiki/checklist/index/log 변경은 0입니다. |
| duplicate.count | 1 | `Codex CLI 0.144.6` stable/latest 신호는 11:05/12:35 및 이전 2026-07-20 보고서와 중복입니다. |
| deferred.count | 2 | `0.145.0-alpha.24` pre-release와 #34096 issue-level regression signal은 watch-only로 보류했습니다. |
| blocked.count | 0 | preflight 통과, 큐 닫힘 상태 확인 완료. |
| lint.warning_count | 0 | 저장 후 `llm-wiki-lint.ps1` 결과로 확정했습니다. |

## Candidate Queue

`2026-07-03-10x-growth-scan-candidate-queue.md`의 직접 상태 기준:

| Status | Count |
|---|---:|
| eligible-next | 0 |
| not-checked | 0 |
| install-audit-next | 0 |
| stored-source | 43 |
| duplicate-source | 28 |
| duplicate-in-queue | 9 |
| audit-done | 8 |
| carried-vendor | 3 |
| carried-research-signal | 1 |
| dropped-low-signal | 3 |

Decision: action 상태가 닫혀 있으므로 broad collection으로 돌아가지 않았습니다.

## 핵심 발견

1. Source-backed: openai/codex GitHub release surface는 `0.144.6`을 `Latest`로 표시하고, `0.145.0-alpha.24`를 `Pre-release`로 표시합니다.
2. Source-backed: `0.144.6` release note의 운영 관련 내용은 GPT-5.6 계열 bundled instruction과 context-window metadata 보정으로, 직전 low-RAM currentness 보고서와 중복입니다.
3. Source-backed: openai/codex issue #34096은 2026-07-19에 열린 issue-level 신고이며, 0.145.x 기반 VS Code extension에서 sidebar loading 회귀를 주장하고 0.144.6 downgrade를 복구 경로로 제시합니다.
4. Dex inference: #34096은 공식 repo 안의 공개 이슈지만 maintainer-confirmed release note가 아니므로 source note나 checklist field로 승격하지 않고, 기존 0.145.x pre-release watch-only 판단을 보강하는 보류 신호로만 둡니다.
5. Not checked: 로컬 Codex CLI/app/VS Code extension 버전, Linux 재현 여부, 에던님 계정 rollout, GPT-5.6 모델 가시성, package-manager 상태, 실제 runtime behavior는 확인하지 않았습니다.

## 저장/흡수한 자료

- 저장: 이 Growth Scan report 1개.
- 흡수 방식: "파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수"로 report-level currentness, pre-release 보류, issue-level 회귀 신호만 기록했습니다.
- 저장하지 않은 것: 새 source note, wiki note, checklist field, approval field, QA field, acceptance test, rollback rule, validation rule.
- 변경하지 않은 것: LLM Wiki index/log, 10x candidate queue, automation config, connector, MCP server, skill, SDK, package, browser extension, GitHub workflow, account setting, token, billing setting, auth file.

## 반영하지 않은 자료와 이유

| Candidate | Decision | Reason |
|---|---|---|
| OpenAI Codex `0.144.6` | duplicate/no-new-signal | stable/latest 신호지만 2026-07-20 이전 currentness 확인과 기존 운영 gate가 이미 포괄합니다. |
| OpenAI Codex `0.145.0-alpha.24` | deferred/pre-release | pre-release이며 운영 기본값이나 durable checklist를 바꿀 근거가 부족합니다. |
| openai/codex issue #34096 | deferred/issue-level | 공개 issue-level 신고입니다. maintainer-confirmed fix/release note가 아니므로 source note 승격 대신 watch-only로 보류합니다. |
| Broader AI agent/frontend/design/PPT/career ops scan | not run | low-RAM backoff이며 candidate queue가 닫혀 있습니다. |
| Local Codex CLI/extension version check | not checked | 이번 회차는 Codex CLI/package-manager/extension command를 실행하지 않았습니다. |

## Source-Backed / Dex Inference / Not Checked

- Source-backed: GitHub release list에서 `0.144.6` latest와 `0.145.0-alpha.24` pre-release 상태를 확인했습니다. GitHub issue #34096의 opened date, labels, affected/recovered version claim을 확인했습니다.
- Dex inference: stable duplicate + pre-release + issue-level regression signal 조합이므로 새 durable checklist/wiki/source 변경은 필요하지 않습니다. 다만 0.145.x adoption은 stable release와 maintainer-confirmed resolution 전까지 계속 watch-only가 맞습니다.
- Not checked: 로컬 설치 버전, 계정별 rollout, 모델 가시성, 실제 runtime behavior, package-manager 상태, VS Code extension 동작, Linux 재현, maintainer triage 결과.

## Codex Portability 판단

- Portability: high for checklist thinking, low for immediate adoption.
- 설치 없이 적용 가능 여부: 이미 적용된 운영 gate로 충분합니다.
- 파일 기반 작업 이식성: report-level currentness, pre-release 분리, issue-level evidence 분리, rollback path 확인은 Codex + Obsidian + PowerShell 흐름에 맞습니다.
- 권한/비용 안정성: 이번 회차는 설치, 연결, 계정 변경, token 생성, billing 변경이 없어 안정적입니다.

## 설치/실행/권한/비용 리스크

- 설치 리스크: 없음. 설치하지 않았습니다.
- 실행 리스크: 없음. Codex CLI/package-manager/MCP/SDK/package 실행을 하지 않았습니다.
- 권한 리스크: 없음. connector, account, auth file, token, billing setting을 변경하지 않았습니다.
- 비용 리스크: 없음. 외부 유료 도구나 계정 기능을 활성화하지 않았습니다.
- 보안 검토: OWASP LLM 기준에서 supply chain, insecure plugin design, excessive agency, sensitive information disclosure, overreliance, prompt injection, insecure output handling 관련 새 노출은 없습니다. #34096은 실행 지시가 아니라 issue-level 회귀 신호로만 취급했습니다.

## 에던님이 바로 쓸 예시

- PPT: AI 도구 버전 표기 시 `stable/latest`, `pre-release`, `open issue`, `local/account not checked`를 분리해서 적습니다.
- Frontend/UX/UI/GUI: extension/webview 회귀 신호가 있으면 UI loading, prompt box render, reconnect loop, rollback version을 QA 항목으로 둡니다.
- Automation: low-RAM backoff에서는 issue를 발견해도 maintainer-confirmed release note가 아니면 source/wiki/checklist로 과잉 승격하지 않습니다.
- Career ops: 플랫폼/IDE assistant 업데이트는 사람 승인 전 자동 적용하지 않고, 기존 정상 버전으로 되돌릴 수 있는지부터 확인합니다.

## Improvement Delta

- Added: 직전 12:35 duplicate currentness 판단에 0.145.x issue-level regression watch signal을 추가로 분리했습니다.
- Avoided: user-reported GitHub issue를 stable 운영 규칙처럼 과잉 채택하지 않았습니다.
- Preserved: 설치/연결/권한/비용 변경 없는 안전한 운영 상태를 유지했습니다.

## Adoption Check

- adopted: 없음.
- carried: 없음.
- dropped: 없음.
- blocked: 없음.
- duplicate: OpenAI Codex `0.144.6` stable/latest 신호.
- approval-needed: 없음.
- deferred: OpenAI Codex `0.145.0-alpha.24` pre-release, openai/codex issue #34096.

## Next Eval

- 다음 회차도 preflight를 먼저 실행합니다.
- free RAM이 1GB 미만이면 incident/no-op만 저장합니다.
- free RAM이 1.0GB-1.3GB이면 low-RAM backoff를 유지합니다.
- free RAM이 1.3GB 이상이고 후보 큐가 계속 닫혀 있으면 broad collection을 피하고 concrete checklist, approval, QA, acceptance-test, rollback, validation field, source-backed operating decision 중 하나가 있을 때만 durable change를 만듭니다.
- `0.145.x`는 stable release가 되거나, #34096이 maintainer-confirmed fix/release note로 연결될 때만 승격 검토합니다.

## Prompt or Template Patch Candidate

새 durable patch 후보 없음. 기존 closed-queue currentness rule과 low-RAM currentness rule이 이번 회차를 충분히 설명합니다.

```text
Low-RAM issue signal rule:
If low-RAM backoff is active and a currentness check finds an open issue for a pre-release/alpha tool version, classify it as issue-level deferred evidence unless it is maintainer-confirmed and changes a concrete Dex Company checklist, approval, QA, rollback, or validation field.
```

## QA / Lint / Status / Audit / Watchdog 결과

- Preflight: PASS. Report `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260720-130313.md`.
- Status: PASS. `llm-wiki-status.ps1` completed after report save with source notes 183 / wiki notes 8.
- Lint: PASS. `llm-wiki-lint.ps1` completed with 0 warning(s) after report save.
- Audit: Not checked. 이번 회차는 low-RAM duplicate/no-new-durable-change 처리라 epistemic-health audit은 실행하지 않습니다.
- UTF-8 replacement scan: PASS. 이 보고서와 자동화 memory에서 replacement character를 찾지 못했습니다.
- Required-section scan: PASS. 필수 보고서 섹션이 모두 있습니다.
- Watchdog: PASS_WITH_WARNINGS. 안전하게 제한했고 설치/연결/권한 변경은 없었습니다. 최고 위험은 issue-level 신호를 stable 운영 변화로 과잉 해석하는 것이며, local runtime/account/extension behavior는 Not Checked입니다.
