---
title: Dex Company Growth Scan Preflight Fail Low RAM Incident
date: 2026-07-20 06:32:17 +09:00
automation: dex-company-growth-scan
status: incident-no-op
confidence: source-backed-local-verification
verificationStatus: blocked-by-preflight
verifiedAt: 2026-07-20 06:32:17 +09:00
verifiedBy: Dex
---

# Dex Company Growth Scan - Preflight Fail Low RAM Incident

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-20 06:32:17 +09:00
- 회차 성격: 06:30 KST fast discovery / currentness check 예정 회차
- 검색 범위: preflight FAIL로 인터넷 검색, public currentness check, source note 생성, wiki/index/log/candidate queue 변경을 수행하지 않음
- 처리 방식: stop-the-line 규칙에 따라 incident/no-op 보고서만 저장

## Preflight 결과

- 결과: FAIL
- 원인: free RAM 0.95GB, hard threshold 1GB 미만
- 자동 복구: -RepairSafe 실행됨. RAM 부족은 자동 복구되지 않음
- Preflight report: $preflightReport
- 재실행 조건: 다음 회차에서 preflight를 먼저 다시 실행. free RAM이 1GB 미만이면 incident/no-op만 반복. 1.0GB 이상 1.3GB 미만이면 low-RAM backoff. 1.3GB 이상이면 큐 상태 확인 후 제한적 currentness/checklist 후보만 검토

## Metrics

- searched.count: 0
- stored.count: 0
- duplicate.count: 0
- deferred.count: 0
- blocked.count: 1
- lint.warning_count: preflight 단계 lint 0, report 저장 후 재검증 예정

## 핵심 발견

1. Growth Scan 본 실행은 시작하지 않았습니다. free RAM이 0.95GB라 hard stop 조건에 걸렸습니다.
2. llm-wiki-status.ps1와 llm-wiki-lint.ps1는 preflight 내부에서 PASS로 확인됐습니다.
3. 최근 memory 기준으로 2026-07-20 새벽 회차들에서 저메모리 FAIL이 반복되고 있습니다.
4. 이번 회차는 새 자료를 수집하거나 Dex Company 운영 지식으로 흡수하지 않았습니다.
5. 승인 없는 설치, 연결, 계정 변경, MCP/SDK/package 실행은 없었습니다.

## 저장/흡수한 자료

- 저장: 이 incident/no-op 보고서 1개
- LLM Wiki source note: 없음
- Wiki note/checklist/index/log/candidate queue 변경: 없음
- 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수: preflight 결과만 운영 상태로 기록. 외부 출처 흡수 없음

## 반영하지 않은 자료와 이유

- OpenAI API, Codex, design systems, frontend, UX research, automation, career ops 등 public currentness check: preflight FAIL로 blocked
- Daily/adoption 후보 검토: 현재 회차가 22:30이 아니며, preflight FAIL로 blocked
- 새 source-backed rule/checklist/approval field: preflight FAIL로 blocked

## Source-Backed / Dex Inference / Not Checked

- Source-backed local verification: preflight output, preflight report path, local automation memory의 최근 회차 요약
- Dex inference: RAM 부족이 반복되므로 다음 회차도 preflight-first와 low-RAM/incident 분기 유지가 필요함
- Not checked: 인터넷 공개 자료 최신성, 후보 큐 현재 파일 내용, 외부 문서/릴리스 상태, 브라우저 기반 검증

## Codex Portability 판단

- Portability: 적용 보류
- 이유: 이번 회차는 새 원칙이나 체크리스트 후보를 검토하지 못했습니다.
- 안전한 운영 판단: Codex의 파일 기반 작업, Obsidian LLM Wiki, PowerShell 검증 흐름은 유지하되, hard threshold 미만에서는 검색과 변경을 막는 현재 게이트를 계속 적용합니다.

## 설치/실행/권한/비용 리스크

- 설치: 없음
- SDK/MCP/package/browser extension/GitHub workflow 실행: 없음
- connector/account 권한 변경: 없음
- API call/token/billing/auth-file 변경: 없음
- 비용 리스크: 없음
- 비밀값 저장: 없음

## 에던님이 바로 쓸 예시

- Automation: ree RAM < 1GB이면 조사 품질보다 시스템 안정성을 우선하여 incident/no-op만 남깁니다.
- Frontend/GUI 작업: 브라우저 QA나 Playwright 같은 메모리 사용 작업은 다음 회차에서 1.3GB 이상일 때만 진행하는 편이 안전합니다.
- PPT/UX/UI/Career ops: 이번 회차에서 새 기준은 추가하지 않았으므로 기존 검증 기준을 그대로 사용하시면 됩니다.

## Improvement Delta

- Added: 저메모리 preflight FAIL 상태를 새 incident/no-op 보고서로 기록
- Changed: 없음
- Removed: 없음
- Durable operating knowledge: 없음

## Adoption Check

- adopted: 없음
- carried: low-RAM backoff/incident 분기 유지
- dropped: 없음
- blocked: public currentness check, source/wiki/checklist 변경
- duplicate: 없음
- approval-needed: 없음

## Next Eval

1. 다음 회차도 preflight를 가장 먼저 실행합니다.
2. free RAM이 1GB 미만이면 incident/no-op만 저장합니다.
3. free RAM이 1.0GB 이상 1.3GB 미만이면 broad search 없이 one-source official currentness 또는 duplicate/no-new-signal만 수행합니다.
4. free RAM이 1.3GB 이상이면 candidate queue가 닫힌 상태인지 확인하고, durable checklist/QA/approval/rollback/validation rule 후보가 있을 때만 저장합니다.

## Prompt or Template Patch Candidate

- 후보 없음. 이번 회차는 preflight FAIL이라 prompt/template 변경 근거를 만들지 않았습니다.

## QA/lint/status/audit/watchdog 결과

- Preflight: FAIL, free RAM 0.95GB
- Status: preflight 내부 PASS
- Lint: preflight 내부 PASS, warning_count 0
- UTF-8 replacement scan: preflight 내부 PASS
- Audit: Not checked, incident/no-op 범위에서는 추가 audit 불필요
- Watchdog: FAIL for Growth Scan execution because preflight failed; PASS for stop-the-line incident/no-op handling path

## 변경 금지 준수

- 새 검색 없음
- 새 source note 없음
- wiki/index/log/candidate queue 변경 없음
- 설치/연결/권한 변경 없음
- MCP/SDK/package/Codex CLI/package-manager 실행 없음
