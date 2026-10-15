---
title: Dex Company Growth Scan Preflight Fail Low RAM Incident No-op
created: 2026-07-20 20:31:32 +09:00
automation: dex-company-growth-scan
run_type: incident-no-op
status: FAIL
confidence: high
---

# Dex Company Growth Scan Incident/No-op - 2026-07-20 20:31 KST

## 실행 시각과 검색 범위

- 실행 시각: 2026-07-20 20:31:32 +09:00
- 회차 성격: 30분 간격 fast discovery / currentness check 예정 회차
- 검색 범위: preflight FAIL로 인터넷 검색, public currentness check, 신규 source note, wiki note, index/log 변경, 후보 큐 변경을 수행하지 않음
- 목적 표현: 이번 회차는 덱스 모델의 영구 학습이 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수를 시도하기 전 안전 조건을 확인한 회차임

## Preflight 결과

- 결과: FAIL
- 원인: free RAM 0.96GB
- 기준: free RAM 1GB 미만은 hard FAIL
- 자동 복구: `-RepairSafe` 실행됨. RAM 부족은 자동 복구 대상이 아니므로 복구되지 않음
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260720-203115.md`

## Metrics

- searched.count: 0
- stored.count: 0
- duplicate.count: 0
- deferred.count: 0
- blocked.count: 1
- lint.warning_count: 0

## 핵심 발견

1. free RAM이 0.96GB로 1GB 하드 기준보다 낮아 Growth Scan 실행을 중단해야 했다.
2. preflight의 `llm-wiki-status.ps1`와 `llm-wiki-lint.ps1`는 통과했으나, 이는 scan 진행 허가가 아니라 Vault 기본 상태 확인 결과다.
3. `-RepairSafe`는 명확하고 되돌릴 수 있는 항목만 자동 복구하므로 RAM 부족을 임의로 해결하지 않았다.
4. 최근 반복된 low-RAM incident 흐름과 일치하므로 broad collection, 브라우저-heavy 작업, 패키지/도구 실행을 하지 않는 판단이 타당하다.

## 저장/흡수한 자료

- 신규 source note: 없음
- 신규 wiki note: 없음
- 운영 문서 durable 변경: 없음
- 이번 회차 산출물: 이 incident/no-op 보고서 1개

## 반영하지 않은 자료와 이유

- 공식 문서/릴리스 노트/currentness check: preflight FAIL로 not checked
- GitHub/논문/블로그/YouTube/RSS/Threads: preflight FAIL로 not checked
- candidate queue 재분류: preflight FAIL로 not checked

## Source-backed / Dex inference / Not checked

- source-backed: preflight 출력의 free RAM 0.96GB, status/lint PASS, report path
- Dex inference: RAM hard FAIL 조건에서는 검색과 durable LLM Wiki 변경을 중단해야 한다는 운영 판단
- not checked: 외부 최신 자료, 후보 큐 최신 상태, 공개 source 교차 검증, runtime/account behavior

## Codex portability 판단

- 적용 가능성: 높음
- 이유: preflight gate, no-install rule, no-op incident report, status/lint 검증은 Codex의 파일 기반 작업, PowerShell, Obsidian LLM Wiki 운영 흐름에 그대로 이식 가능함
- 채택 형태: 이미 운영 규칙으로 적용 중
- 한계: RAM 부족 자체를 Codex가 안전하게 해결하지 않으므로 사용자 환경 상태 변화가 필요함

## 설치/실행/권한/비용 리스크

- 설치: 없음
- SDK/MCP/package/browser extension 실행: 없음
- connector/account 연결: 없음
- GitHub workflow 변경: 없음
- API 호출/토큰/비밀값 저장: 없음
- 비용 리스크: 없음
- 보안 리스크: 신규 권한 부여나 secret 저장이 없어 낮음

## 에던님이 바로 쓸 예시

- PPT: 이미지-heavy deck 품질 자료를 찾기 전에도 free RAM 1GB 미만이면 조사보다 incident/no-op를 우선한다.
- frontend: Playwright/브라우저 QA는 low-RAM 또는 FAIL 상태에서 미루고, 검증 가능할 때 재개한다.
- UX/UI/GUI: 새 디자인 시스템 자료를 억지로 추가하지 않고, 검증 가능한 checklist field가 있을 때만 흡수한다.
- automation: preflight FAIL이면 `searched.count=0`, `stored.count=0`, `blocked.count=1`로 기록한다.
- career ops: 자동 제출/계정 연결/외부 도구 실행은 preflight 통과와 사람 승인 전에는 수행하지 않는다.

## Improvement Delta

- 이번 회차 개선: 실패 조건을 성공처럼 포장하지 않고 incident/no-op로 분리함
- 운영상 이득: RAM 부족 상태에서 broad search나 설치형 후보 검토를 진행하지 않아 overreliance와 excessive agency 위험을 낮춤
- durable change: 없음

## Adoption Check

- adopted: 없음
- carried: low-RAM backoff / preflight gate 유지
- dropped: 없음
- blocked: Growth Scan 본 실행은 free RAM 0.96GB로 blocked
- approval-needed: 없음

## Next Eval

- 다음 회차도 preflight를 먼저 실행한다.
- free RAM이 1GB 미만이면 incident/no-op만 작성한다.
- free RAM이 1.0GB 이상 1.3GB 미만이면 low-RAM backoff로 official-currentness check, duplicate/no-new-signal, one-source refresh, incident/no-op 중 하나만 수행한다.
- free RAM이 1.3GB 이상이고 candidate queue가 계속 닫힌 상태라면 broad collection을 피하고 concrete checklist, approval, QA, acceptance test, rollback, validation rule, source-backed operating decision만 검토한다.

## Prompt or Template Patch Candidate

```text
Growth Scan preflight gate:
If free RAM < 1GB, stop before search/source/wiki/index/log/candidate-queue changes and write only an incident/no-op report.
If free RAM is 1.0GB-1.3GB, use low-RAM backoff and avoid browser-heavy, broad collection, package/tool execution, and large source creation.
```

## QA / Lint / Status / Audit / Watchdog

- preflight: FAIL, free RAM 0.96GB
- preflight status check: PASS
- preflight lint check: PASS, warning_count 0
- post-report status: PASS, source notes 183 / wiki notes 8
- post-report lint: PASS, warning_count 0
- UTF-8 replacement scan: PASS
- required-section scan: PASS
- audit: not run; source/wiki mutation이 없는 incident/no-op 회차이므로 필요하지 않음
- watchdog: FAIL for Growth Scan execution because preflight failed; incident/no-op handling is the allowed safe path
