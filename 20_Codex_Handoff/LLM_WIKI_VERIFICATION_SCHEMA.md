# LLM Wiki Verification Schema

이 문서는 덱스 컴퍼니 LLM Wiki note가 어떤 메타데이터와 검증 기준을 가져야 하는지 정의합니다.

## 왜 필요한가

LLM Wiki는 단순 요약 저장소가 아닙니다. 나중에 프로젝트 판단에 다시 쓰기 위한 지식 저장소입니다.

따라서 각 note는 다음을 분명히 해야 합니다.

- 이 지식의 출처는 무엇인가
- 얼마나 확인되었는가
- 어떤 종류의 주장인가
- 어떤 evidence scope를 갖는가
- 아직 확인하지 못한 부분은 무엇인가

## Required Core Metadata

중요한 LLM Wiki note에는 다음 key를 둡니다.

```yaml
type:
status:
aliases:
description:
author:
created:
updated:
dateCreated:
dateModified:
confidence:
tags:
```

## Source Metadata

raw source note에는 다음을 우선합니다.

```yaml
source:
sourceType:
sourceVersion:
collectionPurpose:
capturedAt:
supersedes:
supersededBy:
```

## Wiki Metadata

wiki note에는 다음을 둡니다.

```yaml
layer:
related:
source:
explored: false
```

`explored: false`는 실패가 아닙니다. 아직 사람이 읽었거나 명시적으로 검증한 상태가 아니라는 안전 표시입니다.

## v5 Verification Metadata

```yaml
claimType: definition | empirical | theoretical | historical | prescriptive | interpretive | preference | mixed
evidenceScope: single-source | multi-source-primary | multi-source-mixed | synthesis-only | user-original | local-test | visual-sample | metadata-only | unknown
verificationStatus: verified | partial | unverified | disputed
verifiedAt:
verifiedBy: Dex | Ethan | both
disputed: false
```

## Three Quality Gates

1. Eligibility
   note가 무엇을 주장하는지, 어떤 source를 근거로 하는지 분명해야 합니다.

2. Consistency
   source note, 다른 wiki page, Dex Company policy와 충돌하지 않아야 합니다.

3. Confirmability
   confidence와 verificationStatus가 실제 evidence에 비해 과장되면 안 됩니다.

## Bias Check Rule

`confidence: high` note에는 다음 섹션이 필요합니다.

```markdown
> [!note] Bias Check
> Counter-argument:
> Data gap:
```

## Disputed Claim Rule

충돌하는 evidence가 있으면 하나의 결론으로 밀어붙이지 말고 다음처럼 남깁니다.

```yaml
verificationStatus: disputed
disputed: true
```

본문에는 충돌 지점과 아직 필요한 evidence를 적습니다.

## Operations

| Operation | 실행 기준 |
|---|---|
| Inbox | `00_Inbox/LLM_Wiki/`에 후보 저장 |
| Ingest | [운영 가이드의 Ingest 절차](LLM_WIKI_OPERATING_GUIDE.md#operation-1-ingest) |
| Query | `index.md` -> `sources/` -> `wiki/` 순서로 읽기 |
| Verify | [운영 가이드의 Verify 절차](LLM_WIKI_OPERATING_GUIDE.md#operation-4-verify) |
| Audit | [운영 가이드의 Audit 절차](LLM_WIKI_OPERATING_GUIDE.md#operation-5-audit) |
| Lint | [운영 가이드의 Lint 절차](LLM_WIKI_OPERATING_GUIDE.md#operation-3-lint) |

실행 방법은 운영 가이드에서 관리해요. 이 schema는 메타데이터와 판정 기준을 소유해요. 과거 로컬 helper의 존재를 가정하지 않고 현재 사용 가능한 도구와 실제 검사 결과를 기록해요.

## Living Reference Policy

- 30일 이상 지난 source-backed claim은 중요한 결정 전에 다시 확인합니다.
- source URL이 변했거나 superseded 되었으면 `sourceVersion`, `supersedes`, `supersededBy`를 갱신합니다.
- raw source를 삭제하지 말고, 새 version과 연결합니다.
