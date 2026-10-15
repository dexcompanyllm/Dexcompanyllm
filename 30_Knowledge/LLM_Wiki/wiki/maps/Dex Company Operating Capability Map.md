---
type: llm-wiki-map
status: active
aliases:
  - Dex Company Capability Map
description: '덱스 컴퍼니 운영 지식을 작업 유형별 진입점으로 연결하는 지도'
author: Dex
created: 2026-07-19
updated: 2026-07-19
dateCreated: 2026-07-19
dateModified: 2026-07-19
confidence: medium
layer: maps
related:
  - [[2026-07-19-dex-company-current-learning-and-action-playbook]]
source:
  - [[LLM Wiki Pattern]]
  - [[Dex Company LLM Wiki Operating Model]]
  - [[Dex Company Task Checklists from Growth Scans]]
  - [[PPT Frontend Visual Communication Checklist]]
  - [[Dex Company Approval-Ready Install Audit Model]]
  - [[Dex Company 10x Growth Scan Operating Model]]
  - [[LLM Wiki Growth Scan Report Improvement Model]]
explored: false
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-19
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/map
  - dex-company
  - capability
---

# Dex Company Operating Capability Map

## 읽는 법

에던님이 하려는 작업과 가장 가까운 영역을 고른 뒤, 연결된 guide와 프로젝트 문서를 실제로 읽습니다. 이 지도는 빠른 진입점이며 실제 검증을 대체하지 않습니다.

## 현재 학습 상태

- 실행 규칙: 역할 라우팅, 산출물 생성, 테스트 증거, handoff까지 연결됨
- 프로젝트 기억: 4개 프로젝트가 canonical Vault에 등록됨
- 장기 지식: 통합 직후 source 183개, wiki 7개, query 1개
- 이번 압축 결과: 이 map과 [[2026-07-19-dex-company-current-learning-and-action-playbook]] 추가
- 남은 핵심 부채: Bias Check 큐 66개 실제 검토, Growth Scan 출력 추가 압축, 새 map의 탐색·검증

## 핵심 역량 지도

### 프로젝트 실행

- 전역 운영 계약: [[20_Codex_Handoff/DEX_COMPANY_OVERVIEW]]
- 현재 프로젝트 목록: [[PROJECT_INDEX]]
- 실제 상태: `10_Projects/<ProjectName>/PROJECT_CONFIG.md`, `CURRENT.md`, `SESSION_HANDOFF.md`, `QA_REPORT.md`
- 적합한 요청: 기능 구현, PRD/WBS, QA, 인수인계, 저장소 정리

### 지식 관리

- 개념: [[LLM Wiki Pattern]]
- 운영 흐름: [[Dex Company LLM Wiki Operating Model]]
- 적합한 요청: 자료 수집, 원본 보존, wiki 합성, 재사용 query, 검증·감사·lint

### 역할별 작업

- 실행 체크리스트: [[Dex Company Task Checklists from Growth Scans]]
- 전역 역할 라우팅: [[20_Codex_Handoff/ROLE_SKILL_ROUTING]]
- 적합한 요청: `/PM`, `/PL`, `/기획자`, `/디자이너`, `/퍼블리셔`, `/개발자`, `/QA`, `/바이브코딩`, `/구직자`, `/지식관리`

### UI·PPT 품질

- 품질 기준: [[PPT Frontend Visual Communication Checklist]]
- 적합한 요청: 반응형 UI, 상태 설계, 접근성, 브라우저 QA, PPT 재구성, 디자인 handoff

### 설치·연동 거버넌스

- 승인 모델: [[Dex Company Approval-Ready Install Audit Model]]
- 적합한 요청: plugin, MCP, connector, package, GitHub workflow, 계정 연동의 설치 전 실사

### 성장 스캔과 반복 개선

- 대량 후보 수집: [[Dex Company 10x Growth Scan Operating Model]]
- 보고서 개선: [[LLM Wiki Growth Scan Report Improvement Model]]
- 적합한 요청: 변화 탐색, 중복 제거, 신호 압축, 다음 평가 기준 설계

## 요청 유형별 시작 노트

| 요청 | 먼저 읽을 노트 |
|---|---|
| "기능을 끝까지 구현해줘" | [[PROJECT_INDEX]], 대상 프로젝트 `CURRENT.md`, [[Dex Company Task Checklists from Growth Scans]] |
| "이 자료를 학습시켜줘" | [[LLM Wiki Pattern]], [[Dex Company LLM Wiki Operating Model]] |
| "UI/PPT 품질을 높여줘" | [[PPT Frontend Visual Communication Checklist]] |
| "이 도구를 설치해도 돼?" | [[Dex Company Approval-Ready Install Audit Model]] |
| "새로운 변화만 찾아줘" | [[Dex Company 10x Growth Scan Operating Model]], [[LLM Wiki Growth Scan Report Improvement Model]] |
| "현재 덱스로 무엇을 할 수 있어?" | [[2026-07-19-dex-company-current-learning-and-action-playbook]] |

## 검증 상태 범례

- `verified`: 명시한 evidence scope 안에서 검증됨
- `partial`: 일부 출처 또는 로컬 조건만 검증됨
- `explored: false`: 아직 사람이 충분히 탐색했다고 표시하지 않음
- `not checked`: 해당 프로젝트·계정·버전에서 다시 확인해야 함

## 다음 지식 압축 후보

1. Bias Check 보완 큐 66개를 주제별로 검토하고 근거가 충분한 노트만 confidence를 다시 올립니다.
2. 158개 Growth Scan 중 no-signal/no-op와 incident/low-RAM 기록을 주간 synthesis로 묶습니다.
3. source를 작업 유형별 map과 reusable query로 계속 압축합니다.

## Not Checked

- 모든 source의 최신성과 실제 프로젝트 적용 결과
- 66개 Bias Check 큐의 개별 편향 검토
- 실제 계정, plan, connector, 비용, 최신 runtime 상태
- 각 제품의 현재 test/build/browser QA 결과

## Source Notes

- [[LLM Wiki Pattern]]
- [[Dex Company LLM Wiki Operating Model]]
- [[Dex Company Task Checklists from Growth Scans]]
- [[PPT Frontend Visual Communication Checklist]]
- [[Dex Company Approval-Ready Install Audit Model]]
- [[Dex Company 10x Growth Scan Operating Model]]
- [[LLM Wiki Growth Scan Report Improvement Model]]
