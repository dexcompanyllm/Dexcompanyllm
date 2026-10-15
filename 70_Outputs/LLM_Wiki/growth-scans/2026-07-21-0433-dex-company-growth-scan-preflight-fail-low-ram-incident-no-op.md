---
title: "Dex Company Growth Scan Preflight Fail Low RAM Incident No-op"
date: 2026-07-21 04:33:30 +09:00
automation: dex-company-growth-scan
status: incident-no-op
preflightStatus: FAIL
verificationStatus: partial
---

# Dex Company Growth Scan Incident No-op - 2026-07-21 04:33 KST

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-21 04:33:30 +09:00
- 회차 성격: fast discovery / currentness check
- 검색 범위: preflight FAIL 때문에 인터넷 검색, public currentness check, 새 source 수집을 실행하지 않음.
- 적용 원칙: 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수는 이번 회차에서 수행하지 않음.

## Preflight 결과

- 결과: FAIL
- Preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260721-043330.md`
- 실패 원인: free RAM 0.48GB. Growth Scan hard threshold 1GB 미만.
- `-RepairSafe`: 실행됨. RAM 부족은 자동 복구 대상이 아니었음.
- 주요 PASS: Codex home, Vault path, config file, skill frontmatter, empty rollout, log DB size, rollout size, `llm-wiki-status.ps1`, `llm-wiki-lint.ps1`, UTF-8 replacement scan.

## Metrics

- searched.count: 0
- stored.count: 0
- duplicate.count: 0
- deferred.count: 0
- blocked.count: 1
- lint.warning_count: 0

## 핵심 발견

1. 이번 회차도 free RAM 0.48GB로 preflight hard threshold에 막혔습니다.
2. preflight 자체의 status/lint/UTF-8 검사는 통과했으나 Growth Scan 실행 조건은 충족하지 못했습니다.
3. 후보 큐는 최근 기록 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0`로 닫힌 상태라 broad collection을 억제해야 하는 흐름입니다.
4. 새 검색, 새 source note, wiki note, index/log, 후보 큐, durable adoption 변경은 수행하지 않았습니다.
5. 최근 회차의 반복 패턴상 다음 실행도 먼저 RAM 상태를 확인해야 합니다.

## 저장/흡수한 자료

- 저장: 이 incident/no-op 보고서만 저장.
- 흡수: 새 공개 자료나 LLM Wiki 지식 흡수 없음.
- 변경하지 않은 항목: LLM Wiki source/wiki/index/log, 후보 큐, 승인 후보, 체크리스트, 자동화 설정.

## 반영하지 않은 자료와 이유

- 공개 자료 검색: preflight FAIL 때문에 실행하지 않음.
- 후보 큐 재분류: preflight FAIL 때문에 실행하지 않음.
- daily adoption 또는 durable checklist 변경: 22:30 회차가 아니며, preflight FAIL 때문에 실행하지 않음.

## Source-backed / Dex inference / Not checked

- source-backed: preflight report의 RAM 수치와 PASS/FAIL 항목.
- Dex inference: 반복된 low-RAM 실패 때문에 다음 회차도 preflight 우선 실행이 필요하다는 판단.
- not checked: 최신 Codex/OpenAI/API/design/frontend/career ops 공개 자료, 신규 교차 검증, 새 adoption 후보.

## Codex portability 판단

- 이번 회차에서 새 후보를 평가하지 않았으므로 후보별 Codex portability 판단은 없음.
- 운영 판단: preflight FAIL 시 no-op 보고서만 남기는 패턴은 Codex의 파일 기반 작업, PowerShell 검증, Obsidian 보고 흐름에 이식 가능하며 이미 적용됨.

## 설치/실행/권한/비용 리스크

- 설치: 없음.
- SDK/MCP/package/browser extension/GitHub workflow 실행: 없음.
- connector/account/API/billing/auth 변경: 없음.
- 비밀값 저장: 없음.
- 비용 발생 작업: 없음.

## 에던님이 바로 쓸 예시

- 다음 Growth Scan 전 확인 문장: "preflight free RAM이 1GB 미만이면 검색하지 말고 incident/no-op만 남긴다."
- 작업 게이트 예시: "새 자료를 찾기 전에 RAM threshold, status/lint, UTF-8 검사를 먼저 통과했는지 확인한다."

## Improvement Delta

- 개선 반영: 없음.
- 이유: preflight FAIL 회차에서는 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수를 진행하지 않는 것이 안전 기준입니다.

## Adoption Check

- adopted: 없음.
- carried: RAM 회복 후 closed queue 상태를 유지하고, broad collection 대신 concrete checklist/approval/QA/acceptance/rollback/validation rule만 검토.
- blocked: free RAM 0.48GB.
- duplicate: 새 검색이 없어 확인하지 않음.
- approval-needed: 없음.

## Next Eval

1. 다음 회차도 `growth-scan-preflight.ps1 -RepairSafe`를 먼저 실행합니다.
2. free RAM이 1GB 미만이면 incident/no-op만 저장합니다.
3. free RAM이 1.0GB 이상 1.3GB 미만이면 low-RAM backoff로 official-currentness check 또는 one-source refresh만 허용합니다.
4. free RAM이 1.3GB 이상이고 후보 큐가 닫힌 상태라면 broad collection은 피하고 실제 운영 판단을 바꾸는 구체 필드만 검토합니다.

## Prompt or Template Patch Candidate

```text
Growth Scan preflight gate:
If free RAM < 1GB, stop before search and LLM Wiki mutation. Write only an incident/no-op report with preflight path, failure reason, non-actions, verification, and next rerun condition.
```

## QA / Lint / Status / Audit / Watchdog

- PASS: post-save `llm-wiki-status.ps1` 통과. Source notes 183, wiki notes 8.
- PASS: post-save `llm-wiki-lint.ps1` 통과, warning_count 0.
- PASS: report UTF-8 replacement scan 통과.
- PASS: report required-section scan 통과.
- Not Checked: 별도 `llm-wiki-audit.ps1`는 source/wiki mutation이 없어 실행하지 않을 예정.
- Watchdog: FAIL for Growth Scan execution because preflight failed. Incident/no-op handling is the allowed safe path.
