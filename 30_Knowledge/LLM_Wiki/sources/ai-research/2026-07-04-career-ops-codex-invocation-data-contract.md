---
type: llm-wiki-source
status: captured
title: "career-ops Codex invocation and data contract"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: descriptive
evidenceScope: single-source
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: github-repository-doc
source:
  - "https://github.com/santifer/career-ops/blob/main/AGENTS.md"
  - "https://github.com/santifer/career-ops/blob/main/CLAUDE.md"
publisher: "santifer/career-ops"
collectionPurpose: "Ethan career ops 자동화에서 외부 job-search skill repository를 설치하지 않고도 Codex 호출 방식, 사용자 데이터 보호 계층, 업데이트 경계를 참고하기 위해 보존한다."
tags:
  - llm-wiki/source
  - career-ops
  - codex
  - job-search
  - automation
---

# career-ops Codex Invocation And Data Contract

## Original Content

- 수집 시각: 2026-07-04 03:34 KST
- 자료 유형: GitHub repository documentation
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 짧은 요약, Dex Company 적용 판단만 보존한다.
- 확인 범위: `AGENTS.md`의 Codex invocation, user/system data contract, auto-memory scope, main file layout, update-check guidance.

## Source-Backed Notes

- career-ops 문서는 Codex에서 slash command가 보장되지 않으므로 repo root에서 `codex`를 실행하거나 `codex exec`로 직접 모드 실행 요청을 하라고 안내한다.
- 문서는 사용자 맞춤 데이터와 시스템 업데이트 대상을 분리한다. 사용자 이력/선호/목표는 profile/config/data/report/output 계층에 두고, 공유 모드와 스크립트, 템플릿, dashboard 등은 system layer로 취급한다.
- auto-memory 범위는 행동 steering, 선호, 프로세스 규칙, 운영 상태, 외부 참조 같은 보조 정보로 제한된다고 설명한다.

## Dex Company Use Example

- Ethan job-search rerun에서는 외부 career-ops repo를 설치하지 않고, "Codex slash command가 없으면 자연어로 모드 실행을 요청한다"는 호환성 원칙만 차용할 수 있다.
- 구직 자동화 산출물은 사용자 데이터 계층과 시스템 계층을 분리해야 한다. 예: 기본 이력서/프로필/지원 결과는 사용자 데이터, 템플릿/스크립트/공통 평가식은 시스템 계층.
- 기존 Dex Company 원칙인 "prepare, verify, do not submit automatically"는 유지한다. career-ops의 ATS/portal 자동화 신호는 승인 없는 제출 자동화가 아니라 준비/검증 자동화 후보로만 다룬다.

## Evidence Quality

- quality: medium
- 이유: GitHub repository 문서가 근거이나, release tag나 코드 실행, 보안 audit, 에던님의 기존 Ethan workflow 회귀 테스트는 하지 않았다.
- 교차 검증: 기존 `2026-07-03-career-ops-v1160` source note, Dex Company role routing의 `/구직자` 문서 생성 중심 원칙, automation memory의 conservative Ethan job-search rule과 맞다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: supply chain, excessive agency, sensitive information disclosure, overreliance, insecure plugin design.
- 운영 제한: repo 문서는 실행 스크립트와 ATS/portal 자동화가 포함된 프로젝트이므로 설치 전 README, scripts, package metadata, auth/storage, portal ToS, 개인정보 저장 위치, rollback path를 별도로 audit해야 한다.

## Claim Split

- source-backed: Codex invocation guidance, user/system data layer split, auto-memory scope guidance.
- Dex inference: Ethan workflow에는 설치가 아니라 데이터 경계와 호출 호환성 원칙만 흡수하는 것이 안전하다는 판단.
- not checked: 최신 release 전체, license drift, scripts/package audit, 실제 Codex 실행, Ethan 이력서 기준 회귀 테스트, 포털 약관 적합성.

