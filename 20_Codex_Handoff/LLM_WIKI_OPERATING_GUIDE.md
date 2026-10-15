# LLM Wiki Operating Guide

이 문서는 모든 AI가 승인 GitHub 상태에서 출처 기반 LLM Wiki를 읽고 개선하는 방법을 설명해요. 특정 편집기나 운영체제는 필수 조건이 아니에요.

## 목적

LLM Wiki는 외부 자료와 프로젝트에서 반복해서 얻은 배움을 출처 기반, AI-readable knowledge base로 바꾸는 계층입니다.

Dex는 원형 LLM Wiki 패턴의 출처 보존과 검증 방식을 공급자에 독립적인 운영에 적용해요.

- Raw Sources -> Wiki -> Schema
- Inbox -> Ingest -> Query -> Verify -> Audit -> Lint
- `index.md`: 진입점
- `log.md`: append-only 변경 기록
- `explored`와 v5 verification fields: 섣부른 확신 방지

Reference sources:

- https://github.com/johnfkoo951/cmds-llm-wiki
- https://llm-wiki.cmdspace.work/
- https://github.com/johnfkoo951/cmds-system-files

## Folder Contract

```text
30_Knowledge/LLM_Wiki/
├── index.md
├── log.md
├── README.md
├── sources/
│   ├── articles/
│   ├── papers/
│   ├── books/
│   ├── transcripts/
│   ├── clippings/
│   └── ai-research/
├── wiki/
│   ├── concepts/
│   ├── entities/
│   ├── guides/
│   └── maps/
├── queries/
├── audit/
├── schema/
└── lint/
```

ingest 전 후보 자료는 LLM Wiki root 밖에 둡니다.

```text
00_Inbox/LLM_Wiki/
└── ai-research/
```

외부 도구 출력물도 wiki body 밖에 둡니다.

```text
70_Outputs/LLM_Wiki/
├── graphify/
└── markdown-formatter/
```

## Operation 0: Inbox

자료가 아직 source note가 되기엔 불완전할 때 씁니다.

규칙:

1. rough capture는 `00_Inbox/LLM_Wiki/`에 둡니다.
2. source, purpose, source kind, uncertainty를 적습니다.
3. inbox note를 verified knowledge로 취급하지 않습니다.
4. purpose와 source provenance가 분명할 때만 `sources/`로 승격합니다.

실행: 승인된 GitHub 파일 도구 또는 현재 host에서 검증된 파일 작업 도구로 위 규칙을 수행해요. 과거 로컬 helper 경로의 존재를 가정하지 않아요. 변경 파일과 실제 검사 결과를 Task evidence에 남겨요.

## Operation 1: Ingest

에던님이 준 자료가 여러 프로젝트에서 다시 쓸 지식이면 ingest합니다.

예시:

- lecture transcript
- GitHub repository
- article or paper
- product/design reference
- reusable project decision

규칙:

1. raw source note를 먼저 만듭니다.
2. source URL, local file path, author/publisher, capture date를 보존합니다.
3. `collectionPurpose`에 왜 모으는지 적습니다.
4. raw source를 summary로 덮어쓰지 않습니다.
5. source note가 생긴 뒤에만 distilled wiki note를 만듭니다.
6. 중요해지면 `index.md`에 연결합니다.
7. `log.md`에 짧게 기록합니다.
8. 새 wiki page는 `explored: false`로 시작합니다.
9. raw source 변경은 삭제 대신 `sourceVersion`, `supersedes`, `supersededBy`로 관리합니다.

실행: 승인된 GitHub 파일 도구 또는 현재 host에서 검증된 파일 작업 도구로 위 규칙을 수행해요. 과거 로컬 helper 경로의 존재를 가정하지 않아요. 변경 파일과 실제 검사 결과를 Task evidence에 남겨요.

## Operation 2: Query

쌓인 지식을 바탕으로 질문에 답할 때 씁니다.

규칙:

1. `index.md`를 먼저 읽습니다.
2. `sources/`와 `wiki/`를 검색합니다.
3. 실제 파일을 읽고 답합니다.
4. source-backed claim과 Dex inference를 분리합니다.
5. 다시 쓸 답변만 `queries/`에 저장합니다.

Query note skeleton:

```markdown
---
type: llm-wiki-query
status: answered
created: YYYY-MM-DD
updated: YYYY-MM-DD
confidence: mixed
tags:
  - llm-wiki/query
---

# Question

## Short Answer

## Source-Backed Findings

## Dex Inference

## Not Checked

## Source Notes
```

## Operation 3: Lint

LLM Wiki 구조가 건강한지 볼 때 씁니다.

확인 항목:

- 필수 folder/file 존재
- source note의 provenance와 purpose
- wiki note의 source traceability
- `index.md` 연결 상태
- `log.md` 변경 기록
- secret/private credential 부재

실행: 승인된 GitHub 파일 도구 또는 현재 host에서 검증된 파일 작업 도구로 위 규칙을 수행해요. 과거 로컬 helper 경로의 존재를 가정하지 않아요. 변경 파일과 실제 검사 결과를 Task evidence에 남겨요.

## Operation 4: Verify

하나의 note가 프로젝트 결정에 영향을 줄 수 있을 때 씁니다.

검증 관점:

- Eligibility: subject, predicate, object, source, evidence scope, claim type이 분명한가
- Consistency: source note, 다른 wiki page, Dex Company policy와 충돌하지 않는가
- Confirmability: confidence가 실제 evidence와 맞는가

실행: 승인된 GitHub 파일 도구 또는 현재 host에서 검증된 파일 작업 도구로 위 규칙을 수행해요. 과거 로컬 helper 경로의 존재를 가정하지 않아요. 변경 파일과 실제 검사 결과를 Task evidence에 남겨요.

## Operation 5: Audit

LLM Wiki 전체의 epistemic health를 점검할 때 씁니다.

확인 항목:

- v5 metadata 누락
- unexplored pages
- Bias Check 없는 high-confidence notes
- disputed notes
- stale notes

실행: 승인된 GitHub 파일 도구 또는 현재 host에서 검증된 파일 작업 도구로 위 규칙을 수행해요. 과거 로컬 helper 경로의 존재를 가정하지 않아요. 변경 파일과 실제 검사 결과를 Task evidence에 남겨요.

감사 보고서는 필요한 경우 `30_Knowledge/LLM_Wiki/audit/`에 저장해요. 실행하지 않은 lint/audit 도구의 PASS를 기록하지 않아요.

## v5 Verification Fields

중요한 LLM Wiki note에는 다음 field를 둡니다.

```yaml
claimType: definition | empirical | theoretical | historical | prescriptive | interpretive | preference | mixed
evidenceScope: single-source | multi-source-primary | multi-source-mixed | synthesis-only | user-original | local-test | visual-sample | metadata-only | unknown
verificationStatus: verified | partial | unverified | disputed
verifiedAt:
verifiedBy: Dex | Ethan | both
disputed: false
```

## Exploration Gate

새 wiki page는 다음 상태로 시작합니다.

```yaml
explored: false
```

덱스가 note를 만들었다는 이유만으로 `true`로 바꾸지 않습니다. 에던님이 읽었거나, 덱스가 명시적 source-backed verification pass를 완료했을 때만 바꿉니다.

## Bias Check

`confidence: high`를 선언하면 다음 섹션을 추가합니다.

```markdown
> [!note] Bias Check
> Counter-argument:
> Data gap:
```

## Promotion Rule

프로젝트 폴더는 실행 공간입니다. LLM Wiki는 재사용 지식 공간입니다.

다음 조건을 만족할 때만 `10_Projects/<ProjectName>/`에서 LLM Wiki로 승격합니다.

- 둘 이상의 프로젝트에 다시 쓸 수 있음
- source를 이름으로 남길 수 있음
- 민감한 프로젝트 세부사항을 제거하거나 일반화할 수 있음
- uncertainty를 명확히 말할 수 있음

## Safety Rule

secret, API key, password, private credential, personal identifier, confidential client material은 LLM Wiki에 저장하지 않습니다. 에던님이 안전하게 redacted version을 제공한 경우만 예외입니다.

## 사용 가능한 Skill

현재 surface에서 검증된 `llm-wiki` 또는 공통 `use-dex-company` 지침을 사용할 수 있어요. 설치되지 않은 Skill을 필수 조건으로 만들지 않아요. 방법 개선과 검증은 [학습 절차](DEX_GROWTH_PROTOCOL.md)를 따라요.

추천 명령:

```text
/지식관리 이 자료를 LLM Wiki에 원본 보존 + 위키 합성 + lint 기준으로 정리해주세요.
```
