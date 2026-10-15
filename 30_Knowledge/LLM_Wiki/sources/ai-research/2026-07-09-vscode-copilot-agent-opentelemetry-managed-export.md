---
type: llm-wiki-source
status: captured
title: "VS Code Copilot Agent OpenTelemetry Managed Export"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: official-docs
source:
  - "https://code.visualstudio.com/updates/v1_128"
  - "https://code.visualstudio.com/docs/agents/guides/monitoring-agents"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://github.com/open-telemetry/semantic-conventions-genai"
publisher: "Microsoft Visual Studio Code / GitHub / OpenTelemetry"
collectionPurpose: "Copilot/agent IDE 사용을 관측할 때 OTel collector, content capture, managed settings precedence, secret/header handling, local DB export, agent type filtering을 Dex Company 승인/QA 체크리스트로 분리하기 위해 수집했다."
tags:
  - llm-wiki/source
  - vscode
  - github-copilot
  - opentelemetry
  - agent-observability
  - governance
---

# VS Code Copilot Agent OpenTelemetry Managed Export

## Original Content

- 수집 시각: 2026-07-09 06:35 KST
- 자료 유형: 공식 release notes / official documentation / official semantic convention repository
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 발표일, 확인 범위, 운영 판단, 위험 구분만 보존한다.
- 확인 범위: VS Code 1.128의 enterprise-managed Copilot telemetry export, VS Code Copilot Chat OpenTelemetry monitoring guide, GitHub July 2026 changelog surface, 기존 OpenTelemetry GenAI semantic conventions source coverage.

## Source-Backed Notes

- VS Code 1.128 release notes는 조직이 Copilot OTel data export 위치를 중앙에서 지정할 수 있고, 이 managed configuration이 Copilot Chat extension과 agent host process에 적용된다고 설명한다.
- 같은 release notes는 `telemetry` block이 OTLP endpoint/protocol, service name/resource attributes, exporter headers, content capture 여부, developer override 가능 여부를 제어한다고 설명한다.
- VS Code monitoring guide는 Copilot Chat agent interactions가 traces, metrics, events를 내보낼 수 있고, LLM calls, tool executions, token usage, repository/branch/commit, org, agent type 같은 attributes를 포함한다고 설명한다.
- 기본값으로 prompt, response, tool arguments는 capture하지 않으며, full content capture는 별도 setting 또는 environment variable을 켜야 한다고 설명한다.
- content capture에는 code, file contents, user prompts 같은 sensitive information이 들어갈 수 있으므로 trusted environment에서만 켜야 한다고 경고한다.
- managed telemetry value는 policy, environment variable, user setting, default 순서로 우선하며, managed value가 있으면 environment variable과 user setting보다 우선한다고 설명한다.
- OTel이 켜지면 foreground agent, Copilot CLI wrapper/native spans, terminal CLI sessions, Claude agent spans를 구분해서 볼 수 있고, service name과 agent name으로 runtime을 필터링할 수 있다.

## Dex Company Use Example

- 에던님이 VS Code/Copilot/agent observability를 쓰자고 하시면, "trace를 켜자"가 아니라 먼저 어떤 collector로 보낼지, content capture를 끌지 켤지, 누가 managed settings를 소유하는지부터 분리한다.
- agent QA evidence를 만들 때는 screenshot이나 token count만 보지 않고, `trace_enabled`, `collector_endpoint_owner`, `content_capture`, `prompt_response_capture`, `tool_argument_capture`, `secret_header_storage`, `managed_policy_precedence`, `local_db_export`, `agent_type_filter`, `retention_and_redaction`을 기록한다.
- frontend QA나 코드리뷰 agent 평가에서 OTel trace를 쓰더라도 source code, prompt, file contents가 외부 collector로 나갈 수 있으므로 프로젝트/계정/collector trust가 없으면 `approval-not-ready`로 둔다.

## Evidence Quality

- quality: medium
- 이유: VS Code official release notes와 monitoring guide, GitHub changelog surface, 기존 OpenTelemetry semantic convention source를 교차 확인했다. 다만 에던님의 VS Code/Copilot account, enterprise managed settings, collector, OTel backend, local trace output은 확인하지 않았다.
- 교차 검증: 기존 `2026-07-03-opentelemetry-genai-semantic-conventions.md`는 공통 GenAI semantic vocabulary를 다루고, 이번 note는 VS Code/Copilot agent runtime의 managed export, content capture, precedence, privacy guardrail을 다룬다.

## Risk / License / Security

- 실제 설치 여부: 설치하지 않았다.
- 계정/권한 변경 여부: 변경하지 않았다.
- 실행 코드 여부: OTel collector, Aspire, Jaeger, Docker, backend, extension setting을 실행하거나 변경하지 않았다.
- OWASP LLM 위험 기준: sensitive information disclosure, insecure output handling, overreliance, excessive agency, prompt injection, insecure plugin design.
- privacy risk: full content capture가 켜지면 prompt, response, system prompt, tool schema, tool arguments, tool results, code/file contents가 trace backend로 보낼 수 있다.
- approval tier: knowledge-only / approval-not-ready until target IDE, account/org policy, collector endpoint, content capture policy, auth header handling, retention/redaction, export path, rollback, and validation command are known.

## Claim Split

- source-backed: VS Code official docs의 managed OTel export, Copilot Chat OTel signals, content capture behavior, managed settings precedence, runtime/service filtering.
- Dex inference: Dex Company checklist에 agent observability gate를 추가해야 한다는 판단.
- not checked: 에던님 PC의 VS Code/Copilot version, enterprise policy, collector endpoint, auth header, local DB export, OTel backend, retention/redaction, 실제 trace payload.

