---
type: llm-wiki-query
status: answered
aliases:
  - 덱스 컴퍼니 현재 학습과 활용법
description: '덱스 컴퍼니가 축적한 운영 지식과 에던님이 바로 요청할 수 있는 작업을 연결한 재사용 답변'
author: Dex
created: 2026-07-19
updated: 2026-08-21
dateCreated: 2026-07-19
dateModified: 2026-08-21
confidence: mixed
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-08-21
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/query
  - dex-company
  - capability
  - playbook
---

# 덱스 컴퍼니는 지금 무엇을 학습했고, 에던님은 무엇을 할 수 있는가?

## Short Answer

덱스 컴퍼니는 현재 **실행 방법은 중상급, 프로젝트별 기억은 사용 가능한 초기 단계, 검증·지식 압축은 중간 단계**입니다. 운영 성숙도를 한 숫자로 표현하면 Dex 추정 약 **3.5/5**입니다.

여기서 학습은 모델 자체를 파인튜닝했다는 뜻이 아닙니다. Codex가 매 작업에서 다시 읽어 적용할 수 있도록 Obsidian에 역할 규칙, 체크리스트, 프로젝트 상태, 출처 기반 지식을 저장했다는 뜻입니다.

## 현재 지식 상태

- canonical Vault는 Git working copy `D:\CodexProjects\codex setup\dex-company-wiki`이며 GitHub `main`을 Source of Truth로 사용합니다. 이전 `D:\OneDrive\ObsidianVault`는 read-only reference입니다.
- 통합 직후 기준 source 183개, 정리 wiki 7개, 재사용 query 1개가 있었습니다.
- 이번 압축으로 capability map 1개와 이 query 1개를 추가해 wiki 8개, query 2개가 됩니다.
- lint 실패와 경고는 0이지만, Bias Check 보완 큐 66개는 실제 재검증이 끝난 것이 아니라 confidence를 낮춰 보수적으로 표시한 상태입니다.
- DexCompany-Ops, JiguRadio, JiguRadio-Renewal, MixedWorkspace-Recovery의 프로젝트 기억 폴더를 등록했습니다.
- 새 map도 `explored: false`로 시작합니다. 보유 지식과 실제 프로젝트 검증은 동일하지 않습니다.

## 학습된 역량 → 가능한 작업

| 학습 영역 | 축적된 규칙 | 에던님이 맡길 수 있는 일 | 근거 |
|---|---|---|---|
| 프로젝트 실행 | 프로젝트 상태, 코드 경로, 결정, QA, 인수인계를 분리 | 기획부터 구현, 검증, 문서화까지 한 흐름으로 진행 | [[20_Codex_Handoff/DEX_COMPANY_OVERVIEW]], [[PROJECT_INDEX]] |
| 역할별 실행 | PM, PL, 기획, 디자인, 퍼블리싱, 개발, QA, 구직, 지식관리 라우팅 | 역할을 지정하거나 요청 성격에 맞춰 자동 라우팅 | [[Dex Company Task Checklists from Growth Scans]] |
| 지식 관리 | Inbox → Source → Wiki → Query → Verify/Audit/Lint | 문서·강의·저장소를 출처 보존 후 재사용 지식으로 정리 | [[LLM Wiki Pattern]], [[Dex Company LLM Wiki Operating Model]] |
| UI·PPT 품질 | 시각 계층, 반응형, 상태, 접근성, 브라우저·산출물 증거 | 웹 화면, 대시보드, 발표 자료를 만들고 실제 품질 점검 | [[PPT Frontend Visual Communication Checklist]] |
| 설치·연동 안전성 | 버전, 권한, 비용, 네트워크, secret, rollback, 검증 패킷 | MCP·plugin·package를 설치 전에 실사하고 승인 가능 여부 판정 | [[Dex Company Approval-Ready Install Audit Model]] |
| 반복 학습 | 넓게 탐색하되 중복 제거, 개선점·다음 평가 기준 기록 | 최신 변화 중 실제 운영 규칙을 바꿀 신호만 압축 | [[Dex Company 10x Growth Scan Operating Model]], [[LLM Wiki Growth Scan Report Improvement Model]] |

## 에던님이 바로 쓸 요청 예시

### 제품·개발

> JiguRadio에 즐겨찾기 기능을 추가하고, lint/build/browser QA를 통과시킨 뒤 Obsidian 인수인계까지 남겨줘.

덱스는 연결된 실제 저장소를 확인하고, 요구사항·구현·테스트·QA·handoff를 같은 프로젝트 기억에 남깁니다.

### 기획·프로젝트 관리

> 이 아이디어를 PRD, 우선순위, WBS, 위험 목록으로 바꾸고 실제 구현 순서까지 정리해줘.

덱스는 `/PM`과 `/PL` 관점의 산출물을 만들고, 가정과 미확인을 분리해 기록합니다.

### UI·디자인·PPT

> 이 관리자 화면을 반응형으로 구현하고 로딩·빈 상태·오류·키보드 접근성까지 확인해줘.

> 이 PPT를 한 슬라이드 한 메시지 원칙으로 다시 구성하고 작은 화면 판독성까지 점검해줘.

덱스는 시각 결과물만 만드는 데서 끝내지 않고 상태, 접근성, 브라우저 또는 산출물 증거를 함께 확인합니다.

### 안전한 도구 도입

> 이 MCP를 바로 설치하지 말고, 버전·권한·네트워크·비용·rollback을 확인해서 승인 가능한 상태인지 실사해줘.

덱스는 `approval-ready-pass`, `conditional`, `not-ready`, `blocked`, `knowledge-only` 중 하나로 판정합니다. 실제 설치는 필요한 승인 범위를 따로 제시합니다.

### 지식 관리

> 이 자료가 한 프로젝트용인지 재사용 지식인지 판단하고, 원본 출처를 보존한 뒤 올바른 위치에 정리해줘.

> 최근 Growth Scan에서 중복은 제외하고 실제 운영 규칙을 바꿀 신호만 압축해줘.

덱스는 원본, 합성 지식, 재사용 질의를 분리하고 lint와 출처 추적성을 확인합니다.

### 구직 문서

> 이 공고에 맞춰 확인된 경력과 추론을 분리하고, 면접에서 방어 가능한 이력서·자기소개 문장으로 작성해줘.

개인정보가 있는 실제 Career Ops 프로젝트는 별도 범위 확인 후 연결합니다.

## Source-Backed Findings

- source, wiki, query를 분리하고 verify/audit/lint를 수행하는 운영 방식은 [[LLM Wiki Pattern]]과 [[Dex Company LLM Wiki Operating Model]]에 기록되어 있습니다.
- 역할별 실행, UI QA, 자동화, Career Ops, 설치 승인 기준은 [[Dex Company Task Checklists from Growth Scans]]에 압축되어 있습니다.
- UI와 PPT의 공통 품질 기준과 최소 QA 증거는 [[PPT Frontend Visual Communication Checklist]]에 정리되어 있습니다.
- 실행 코드와 계정 연동 도구의 설치 전 심사 기준은 [[Dex Company Approval-Ready Install Audit Model]]에 정리되어 있습니다.
- canonical Vault와 4개 프로젝트 등록 상태는 [[PROJECT_INDEX]]와 각 프로젝트의 `PROJECT_CONFIG.md`, `CURRENT.md`, `QA_REPORT.md`에서 확인할 수 있습니다.

## Dex Inference

- 운영 성숙도 3.5/5는 공식 측정값이 아니라 현재 파일 구조, 프로젝트 기억, 자동화, 검증 상태를 종합한 Dex 판단입니다.
- 덱스 컴퍼니의 강점은 "정답을 이미 모두 안다"가 아니라, 요청을 역할과 산출물로 바꾸고 실제 파일·코드·QA 증거까지 연결하는 데 있습니다.
- 지금 가장 큰 개선 여지는 source 183개를 더 적은 wiki/query로 압축하고, Bias Check 큐를 실제로 재검증하는 것입니다.

## Not Checked

- source 183개라는 수치는 183개 모두가 최신·완전 검증됐다는 뜻이 아닙니다.
- 기존 wiki 7개는 모두 `explored: false`였고, 대부분 `verificationStatus: partial`입니다.
- 158개 Growth Scan 전체가 현재 체크리스트에 완전히 압축된 것은 아닙니다. 기본 체크리스트는 47개 보고서 합성에서 시작해 일부가 증분 반영됐습니다.
- 실제 프로젝트의 package/app 버전, 계정 권한, 플랜, 비용, connector availability는 작업 시점에 다시 확인해야 합니다.
- 체크리스트가 있다는 사실만으로 구현 품질이 보장되지는 않습니다. 각 프로젝트에서 test, build, browser QA가 필요합니다.
- 변화가 빠른 OpenAI, GitHub, Figma, npm 관련 사실은 중요한 결정 직전에 공식 출처와 로컬 runtime을 다시 확인해야 합니다.
- 개인정보가 포함될 수 있는 Career Ops 자료는 별도 범위 확인 없이 전역 프로젝트 기억으로 연결하지 않습니다.

## Source Notes

- [[Dex Company Operating Capability Map]]
- [[LLM Wiki Pattern]]
- [[Dex Company LLM Wiki Operating Model]]
- [[Dex Company Task Checklists from Growth Scans]]
- [[PPT Frontend Visual Communication Checklist]]
- [[Dex Company Approval-Ready Install Audit Model]]
- [[Dex Company 10x Growth Scan Operating Model]]
- [[LLM Wiki Growth Scan Report Improvement Model]]
- [[PROJECT_INDEX]]
