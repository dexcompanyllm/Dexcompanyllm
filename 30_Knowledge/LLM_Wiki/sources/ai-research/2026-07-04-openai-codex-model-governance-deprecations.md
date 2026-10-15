---
type: llm-wiki-source
status: captured
title: "OpenAI Codex model governance and deprecations"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://developers.openai.com/codex/models"
  - "https://developers.openai.com/codex/config-reference"
publisher: "OpenAI"
collectionPurpose: "Codex 모델 선택, cloud 모델 제한, Chat Completions deprecation, deprecated model 참조 점검을 Dex Company 자동화/설정 점검 기준으로 저장한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - models
  - deprecation
  - governance
---

# OpenAI Codex Model Governance And Deprecations

## Original Content

- 수집 시각: 2026-07-04 01:34 KST
- 자료 유형: OpenAI 공식 Codex model 문서와 config reference
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, 운영 판단, 미확인 범위만 보존한다.
- 확인 범위: 추천 모델, local model config, cloud model 제한, Chat Completions API deprecation, deprecated Codex model 참조 점검.

## Source-Backed Notes

- OpenAI Codex model 문서는 대부분의 Codex 작업에서 추천 모델로 시작하라고 안내하고, 더 빠른/저비용 선택지를 별도로 구분한다.
- Codex CLI와 IDE extension은 같은 `config.toml` 모델 설정을 사용한다고 설명한다.
- Codex cloud task에서는 현재 기본 모델을 바꿀 수 없다고 설명한다.
- Chat Completions API support는 Codex에서 deprecated이며 future release에서 제거될 예정이라고 안내한다.
- ChatGPT sign-in 기준으로 deprecated된 모델 참조는 scripts, config, `codex exec --model`에서 최신 모델로 업데이트해야 한다는 경고가 있다.

## Dex Company Use Example

- Dex Company 자동화 템플릿에는 `model.source`, `model.override`, `auth.mode`, `api.compatibility`, `deprecated_model.scan` 필드를 두는 것이 좋다.
- 모델이 바뀌었다는 공개 문서만으로 에던의 현재 계정에서 사용 가능하다고 말하지 않는다. 계정/플랜/지역/인증 방식별 availability를 별도 확인해야 한다.
- 기존 자동화나 스크립트가 `codex exec --model`을 직접 쓰는 경우, model deprecation scan을 별도 QA 항목으로 둔다.

## Evidence Quality

- quality: medium
- 이유: OpenAI 공식 문서가 근거지만, 현재 로컬 config와 계정 모델 목록은 확인하지 않았다.
- 교차 검증: 기존 Codex config reference, Codex CLI changelog, Codex access token source note와 같은 설정/인증 경계로 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: overreliance, sensitive information disclosure, insecure output handling.
- 운영 제한: 모델 선택은 비용, 성능, auth mode, API compatibility에 영향을 주므로 자동화 보고서에서 source-backed public availability와 local availability를 분리해야 한다.

## Claim Split

- source-backed: Codex 모델 문서의 추천 모델, cloud task 제한, Chat Completions deprecation, deprecated model 참조 업데이트 안내.
- Dex inference: Dex Company 자동화가 model deprecation scan과 auth-mode별 availability 확인을 가져야 한다는 판단.
- not checked: 에던 계정의 실제 모델 picker, local `config.toml`, API-key model availability, cloud task model availability.

