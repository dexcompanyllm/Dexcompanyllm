---
type: llm-wiki-source
status: active
title: "OpenAI Codex Agent Skills"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: medium
claimType: prescriptive
evidenceScope: source-backed
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source: "https://developers.openai.com/codex/skills"
collectionPurpose: "Codex skill의 구조, progressive disclosure, plugin과 skill의 차이를 덱스 컴퍼니 skill 설치/작성 정책의 공식 근거로 보존한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - skills
  - workflow
---

# OpenAI Codex Agent Skills

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 OpenAI Developers의 Agent Skills 문서를 확인했고, 이 note는 skill 구조와 운영 판단에 필요한 메타데이터만 보존한다.

## Easy Explanation

Codex skill은 특정 작업을 안정적으로 반복하기 위한 지침, 리소스, 선택적 스크립트를 담는 폴더다. `SKILL.md`가 필수이고, scripts, references, assets를 둘 수 있다. Codex는 처음에는 skill 이름, 설명, 경로만 보고 필요할 때 전체 `SKILL.md`를 읽는 방식으로 컨텍스트를 관리한다.

## Dex Company Use

- 반복되는 Growth Scan 절차는 장기적으로 skill화할 수 있지만, 먼저 현재 자동화 보고서와 검증 루프가 안정되어야 한다.
- 외부 skill 후보는 plugin 설치 단위와 skill 작성 형식을 구분해서 평가한다.
- skill 설명은 짧고 트리거가 명확해야 하므로 덱스 컴퍼니 역할 skill도 설명 품질 점검이 필요하다.

## Evidence Quality

- high: OpenAI 공식 Codex 문서다.
- cross-check: GitHub agent skills 문서와 함께 skill 설치 위험 및 provenance 기록 필요성을 교차 확인했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: skill은 `SKILL.md` 중심의 폴더 구조이며, progressive disclosure 방식으로 로드된다.
- Dex inference: 덱스 컴퍼니는 외부 skill 설치보다 로컬 workflow를 먼저 instruction-only skill로 안정화하는 편이 낫다.
- not checked: 이번 실행에서 새 skill을 만들거나 설치하지 않았다.

