---
type: llm-wiki-source
status: captured
title: "OpenAI Cookbook - Build iterative repair loops with Codex"
sourceKind: official-cookbook
sourceUrl: "https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex"
source:
  - "https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex"
  - "https://github.com/openai/openai-cookbook"
  - "https://github.com/openai/openai-cookbook/commits/main.atom"
publisher: OpenAI
capturedAt: 2026-07-03T17:27:12+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company 성장 스캔과 문서/코드 품질 개선을 review-repair-validate 반복 루프로 설계하기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-cookbook
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - openai
  - codex
  - evals
  - automation
---

# OpenAI Cookbook - Build iterative repair loops with Codex

## Source Snapshot

- URL: https://developers.openai.com/cookbook/examples/codex/build_iterative_repair_loops_with_codex
- GitHub repository: https://github.com/openai/openai-cookbook
- Commit feed checked: https://github.com/openai/openai-cookbook/commits/main.atom
- Publisher: OpenAI
- Captured for: Dex Company report improvement, automated repair loops, validation-driven work

## Key Notes

OpenAI Cookbook 예제는 Codex를 "review -> repair -> validate" 루프로 사용하는 방식을 보여준다. 핵심은 Codex가 산출물을 바로 고치는 것이 아니라, 먼저 구조화된 findings를 만들고, 복사본에 집중 수정한 뒤, 실행 또는 평가 결과를 다음 반복의 입력으로 쓰는 것이다.

## Why It Matters

Dex Company의 성장 스캔도 단순히 자료를 많이 저장하는 일에서 끝나면 개선이 누적되지 않는다. 이 자료는 각 실행에서 보류 항목, 실패 패턴, 검증 결과를 다음 실행의 입력으로 넘기는 실무형 루프 설계 근거가 된다.

## Dex Company Use Example

- 보고서마다 `Review`, `Repair`, `Validate` 상태를 붙이고, 실패한 lint나 중복 탐지를 다음 실행의 repair prompt로 넘긴다.
- LLM Wiki source note가 schema를 통과하지 못하면 원인을 finding으로 기록하고, 수정 후 lint 결과를 validation evidence로 남긴다.
- OpenAI Cookbook notebook 자체는 실행 코드와 API 키 전제가 있으므로 자동 실행하지 않고 source note로만 흡수한다.

## Security and Install Gate

- 이 자료는 notebook과 Codex CLI 실행 예제를 포함한다.
- `OPENAI_API_KEY`, Codex CLI, Jupyter/nbconvert 같은 실행 전제가 있으므로 이번 실행에서는 어떤 코드도 실행하지 않았다.
- OWASP 기준상 supply chain, excessive agency, sensitive information disclosure, insecure output handling을 점검하기 전에는 자동화에 그대로 붙이지 않는다.

## Verification

- source-backed: OpenAI Developers Cookbook page, OpenAI Cookbook GitHub repository, GitHub commit Atom feed 접근을 확인했다.
- Dex inference: Dex Company growth scan에 review-repair-validate 구조를 적용하는 부분은 Cookbook 패턴의 운영 해석이다.
- not checked: notebook raw 파일 전체 실행, Codex CLI 실행, API 호출, sample notebook validation은 수행하지 않았다.

## Original Content

원문 전체를 복사하지 않고, 공식 URL, GitHub 위치, 실행 위험, Dex Company 적용 포인트만 보존한다.
