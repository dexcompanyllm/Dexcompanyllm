---
type: llm-wiki-source
status: captured
title: "OpenAI Codex CLI Windows setup boundary"
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
  - "https://developers.openai.com/codex/cli"
  - "https://developers.openai.com/codex/changelog"
publisher: "OpenAI"
collectionPurpose: "Dex Company의 Windows 기반 Codex 실행 판단에서 CLI 지원 범위, 설치 경로, 버전 변동, 로컬 실행 권한을 분리하기 위해 보존한다."
tags:
  - llm-wiki/source
  - openai
  - codex
  - windows
  - cli
  - local-runtime
---

# OpenAI Codex CLI Windows Setup Boundary

## Original Content

- 수집 시각: 2026-07-04 03:02 KST
- 자료 유형: OpenAI 공식 Codex CLI 문서와 Codex changelog
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 요약, Dex Company 적용 판단만 보존한다.
- 확인 범위: Codex CLI가 로컬 터미널에서 실행되는 coding agent이며 macOS, Windows, Linux에서 사용할 수 있다는 공식 문서 신호와, changelog의 빠른 버전 변경 신호.

## Source-Backed Notes

- OpenAI 공식 CLI 문서는 Codex CLI가 선택한 디렉터리에서 파일을 읽고 수정하며 명령을 실행할 수 있는 로컬 coding agent라고 설명한다.
- 같은 문서는 Windows에서 PowerShell 기반 native 실행과, Linux-native 환경이 필요할 때 WSL2 사용을 구분한다.
- Codex changelog는 CLI 버전이 자주 바뀌며, 2026-07-01 항목에서 trace log에 민감한 WebSocket payload가 남지 않도록 고친 보안성 bug fix를 안내한다.

## Dex Company Use Example

- Windows 작업에서는 `runtime.os`, `shell.surface`, `sandbox.mode`, `codex.version`, `install.source`, `upgrade.status`, `trace.sensitive_payload`를 분리해 기록한다.
- Codex CLI나 SDK를 설치 후보로 다룰 때는 공식 문서가 "지원"을 말하더라도, 현재 PC의 실제 앱/CLI 버전과 계정 권한, 샌드박스 모드, PowerShell/WSL2 경로를 별도 확인한다.
- trace/log 관련 changelog가 보이면 자동화 보고서에 `sensitive_log.risk`와 `version.fixed_in`을 기록한다.

## Evidence Quality

- quality: medium
- 이유: OpenAI 공식 문서와 changelog가 근거지만, 현재 에던님 PC의 CLI 설치 상태와 실제 버전은 이번 실행에서 확인하지 않았다.
- 교차 검증: 기존 Codex CLI release RSS note, Codex SDK runtime boundary note, Codex model governance note와 같은 로컬 runtime/버전 drift 경계로 연결된다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: supply chain, excessive agency, sensitive information disclosure, insecure output handling, overreliance.
- 운영 제한: CLI는 로컬 파일 읽기/쓰기와 명령 실행 권한을 갖기 때문에, 설치나 upgrade는 프로젝트별 승인과 rollback path가 필요하다.

## Claim Split

- source-backed: Codex CLI의 로컬 실행 성격, Windows/PowerShell/WSL2 지원 경계, changelog의 trace payload bug fix.
- Dex inference: Dex Company 자동화 템플릿에 Windows runtime, shell, sandbox, sensitive log risk 필드를 둬야 한다는 판단.
- not checked: 현재 PC의 `codex` 명령 존재 여부, 설치 경로, 실제 버전, 계정 로그인 상태, CLI upgrade 가능성.

