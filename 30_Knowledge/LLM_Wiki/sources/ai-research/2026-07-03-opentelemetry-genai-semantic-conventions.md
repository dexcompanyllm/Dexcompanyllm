---
type: llm-wiki-source
status: captured
title: "OpenTelemetry GenAI Semantic Conventions"
sourceKind: official-repository
sourceUrl: "https://github.com/open-telemetry/semantic-conventions-genai"
source:
  - "https://github.com/open-telemetry/semantic-conventions-genai"
  - "https://opentelemetry.io/docs/specs/semconv/gen-ai/"
  - "https://github.com/open-telemetry/semantic-conventions-genai/commits/main.atom"
publisher: OpenTelemetry
capturedAt: 2026-07-03T17:27:12+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company 자동화와 에이전트 실행 기록을 provider-specific 로그가 아니라 재사용 가능한 GenAI trace/metric/event 기준으로 설계하기 위해 보존한다."
confidence: medium
claimType: prescriptive
evidenceScope: official-repository
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - observability
  - ai-agents
  - mcp
  - automation
---

# OpenTelemetry GenAI Semantic Conventions

## Source Snapshot

- Repository: https://github.com/open-telemetry/semantic-conventions-genai
- OpenTelemetry moved page: https://opentelemetry.io/docs/specs/semconv/gen-ai/
- Commit feed checked: https://github.com/open-telemetry/semantic-conventions-genai/commits/main.atom
- Publisher: OpenTelemetry
- Captured for: Dex Company automation observability, agent traces, MCP trace vocabulary

## Key Notes

OpenTelemetry GenAI Semantic Conventions는 GenAI client, agent, MCP, OpenAI 등 provider별 실행을 spans, metrics, events로 기록하기 위한 공통 어휘를 제공하려는 저장소다. 기존 OpenTelemetry 문서의 GenAI 영역이 별도 repository로 이동했다는 점도 확인했다.

## Why It Matters

Dex Company가 "성장했다"는 표현을 신뢰 가능하게 만들려면 실행 결과를 감각적으로만 말하지 않고 trace, metric, event 단위로 남겨야 한다. 이 자료는 growth scan, Codex 작업, MCP 후보 감사, 에이전트 실행을 같은 관측성 언어로 정리할 기준이 된다.

## Dex Company Use Example

- growth scan 보고서에 `run.id`, `source.count`, `stored.count`, `lint.warning_count`, `deferred.count`, `blocked.reason` 같은 최소 메트릭을 넣는다.
- MCP나 OpenAI API 작업은 provider, model, tool call, token, latency, error를 추적할 수 있는 구조로 남긴다.
- 아직 repository schema URL과 release 상태가 안정적으로 보이지 않으므로 바로 강제 표준으로 삼지 않고 "관측성 후보 표준"으로 둔다.

## Security and Install Gate

- repository에는 reference, tooling, Python/Jinja/Makefile 기반 자료가 포함된다.
- 이번 실행에서는 설치, 빌드, reference implementation 실행을 하지 않았다.
- 자동화에는 개념과 vocabulary만 흡수하고, 코드 실행은 별도 감사가 필요하다.

## Verification

- source-backed: OpenTelemetry GitHub repository, moved OpenTelemetry docs page, GitHub commit Atom feed 접근을 확인했다.
- Dex inference: Dex Company 메트릭 필드 예시는 repository 목적을 운영 템플릿으로 해석한 것이다.
- not checked: repository의 YAML model 전문, reference implementation 실행, schema 안정성, release governance 전체.

## Original Content

원문 전체를 복사하지 않고, repository URL, 이동된 공식 문서 URL, Dex Company 관측성 적용 포인트만 보존한다.
