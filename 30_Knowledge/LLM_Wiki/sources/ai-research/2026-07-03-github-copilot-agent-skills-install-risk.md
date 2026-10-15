---
type: llm-wiki-source
status: active
title: "GitHub Copilot Agent Skills Install Risk"
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
source: "https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills"
collectionPurpose: "외부 agent skill 설치 전 preview, pin, provenance, malicious script/prompt injection 위험을 덱스 컴퍼니 설치 후보 정책에 반영하기 위해 보존한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - skills
  - supply-chain
---

# GitHub Copilot Agent Skills Install Risk

## Original Content

원문 전체를 복사하지 않는다. 2026-07-03 19:34 KST에 GitHub Docs의 adding agent skills 문서를 확인했고, 이 note는 install risk와 provenance 요약만 보존한다.

## Easy Explanation

GitHub agent skills는 지침, 스크립트, 리소스를 담은 폴더다. GitHub 문서는 skill 설치 전 preview와 검토를 요구하며, skill이 검증되지 않았고 prompt injection, hidden instruction, malicious script를 포함할 수 있다고 경고한다. version pin과 provenance metadata도 다룬다.

## Dex Company Use

- 외부 skill은 절대 자동 설치하지 않는다.
- preview, source repository, ref, tree SHA, script, hidden instruction, license를 확인한 뒤에도 에던 승인 전에는 후보로만 둔다.
- 덱스 컴퍼니 로컬 skill은 공식 OpenAI skill 형식과 GitHub provenance 관점을 모두 참고한다.

## Evidence Quality

- high: GitHub 공식 문서이며 설치 위험을 명시한다.
- cross-check: OpenAI Agent Skills 문서, OWASP LLM Top 10 source note, MCP Apps install audit note와 교차 확인했다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: GitHub는 agent skills 설치 전 검토와 prompt injection/malicious script 위험을 경고한다.
- Dex inference: 덱스 컴퍼니의 skill 설치 후보는 `pass`보다 `conditional`을 기본값으로 두는 편이 안전하다.
- not checked: `gh skill preview`, `gh skill install`, `gh skill update`는 실행하지 않았다.

