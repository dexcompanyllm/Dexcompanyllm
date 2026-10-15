---
type: llm-wiki-source
status: captured
title: "OpenAI Codex Remote Connections and DigitalOcean Plugin"
sourceKind: official-docs
sourceUrl: "https://developers.openai.com/codex/remote-connections"
source:
  - "https://developers.openai.com/codex/remote-connections"
  - "https://developers.openai.com/codex/changelog"
publisher: OpenAI
capturedAt: 2026-07-03T23:03:00+09:00
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
collectionPurpose: "Dex Company의 모바일/원격 Codex 사용과 원격 workspace 후보를 현재 공식 문서 기준으로 분리해 기록한다."
confidence: medium
claimType: historical
evidenceScope: multi-source-primary
verificationStatus: verified
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/source
  - codex
  - remote-workflow
  - automation
  - security
---

# OpenAI Codex Remote Connections and DigitalOcean Plugin

## Original Content

- Source URL: https://developers.openai.com/codex/remote-connections
- Cross-check URL: https://developers.openai.com/codex/changelog
- Publisher: OpenAI
- Captured at: 2026-07-03 23:03 KST
- Preservation method: 원문 전체를 복사하지 않고 URL, 메타데이터, 확인 범위, 짧은 요약, Dex Company 적용 판단만 보존한다.
- Checked scope: remote connection setup, mobile pairing, host/credential boundary, and Codex changelog signal for DigitalOcean remote workspace plugin.

## Source-Backed Notes

- OpenAI Codex remote connections 문서는 ChatGPT mobile 또는 다른 Codex App 기기에서 Mac/Windows host의 projects, threads, files, credentials, permissions, plugins, browser setup, local tools를 사용할 수 있다고 설명한다.
- 모바일 setup은 host의 Codex App에서 시작하며, 같은 account/workspace, 최신 ChatGPT mobile app, 최신 Codex App, MFA/SSO/passkey 조건을 확인해야 한다.
- 2026-06-08 이후 사용된 기존 연결은 유지되지만, 그 이후 사용되지 않은 연결은 두 앱을 업데이트하고 다시 pair해야 한다.
- Codex changelog는 Remote Control이 iOS/Android device와 host 사이에서 authenticated one-to-one QR pairing을 사용한다고 설명한다.
- 같은 changelog는 DigitalOcean plugin이 Droplet provisioning, SSH access configuration, Codex App remote workspace 연결을 지원한다고 설명한다.

## Dex Company Use Example

- 에던이 모바일에서 Windows host의 Codex를 조종하려면 "새로운 에이전트 환경"이 아니라 기존 host의 프로젝트, 권한, 파일, 플러그인, 브라우저 설정을 원격으로 쓰는 것으로 봐야 한다.
- 원격 실행 전 QA 체크리스트에는 host awake/online 상태, same account/workspace, admin Remote Control 허용 여부, 연결 기기 목록, Computer Use 허용 상태를 넣는다.
- DigitalOcean plugin은 편리한 remote workspace 후보지만, Droplet 비용, SSH key, cloud secret, repository access, region/data boundary가 생기므로 자동화가 설치하거나 실행하지 않는다.

## Evidence Quality

- High for the existence of the remote connections behavior because the source is OpenAI official documentation.
- High for the DigitalOcean plugin signal because it is recorded in the OpenAI Codex changelog.
- Medium for Dex Company operational rules because they are Dex inference from the official host and credential boundary.

## Cross Verification

- Cross-checked OpenAI remote connections docs against OpenAI Codex changelog.
- Cross-checked the risk model against existing Dex Company OWASP LLM source note categories: excessive agency, sensitive information disclosure, supply chain, and overreliance.
- Cross-checked with existing Dex Company memory preference that live host/runtime state must be verified before remote/mobile compatibility conclusions.

## Risk / License / Install

- Install status: no install performed.
- DigitalOcean plugin status: due-diligence-candidate only. Cloud provisioning, SSH, cost, and credential scope require explicit Ethan approval.
- Security risk: remote host access exposes the host's local files, credentials, plugins, browser setup, and tools through the connected device workflow.
- License risk: not evaluated for plugin implementation because no package or plugin code was installed or inspected in this run.

## Claim Split

- source-backed: OpenAI remote connection setup, host boundary, QR pairing, DigitalOcean plugin changelog signal.
- Dex inference: Dex Company should treat remote/mobile Codex as host-bound access and keep cloud provisioning approval-gated.
- not checked: live Codex app version, current mobile app availability, actual account/workspace admin settings, DigitalOcean plugin package behavior, cloud billing, SSH setup, Windows local UI state.
