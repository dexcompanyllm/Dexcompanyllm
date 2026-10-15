---
type: llm-wiki-source
status: active
title: "GitHub Secret Scanning Public Monitoring"
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
sourceKind: official-changelog-and-docs
source: "https://github.blog/changelog/2026-07-01-secret-scanning-public-monitoring-for-enterprises/"
collectionPurpose: "Dex Company의 비밀값 저장 금지, 외부 공개 표면 유출 감시, GitHub 보안 실사 기준을 강화하기 위해 저장한다."
publisher: "GitHub"
collectedAt: 2026-07-04T02:34:34+09:00
keywords:
  - GitHub
  - secret scanning
  - public monitoring
  - security
  - credential hygiene
  - automation
tags:
  - llm-wiki/source
  - ai-research
  - github
  - security
---

# GitHub Secret Scanning Public Monitoring

## Original Content

- 원문 전체를 복사하지 않고, 공개 GitHub changelog와 GitHub Docs에서 확인한 메타데이터, 요약, 확인 범위만 보존한다.
- Primary source: https://github.blog/changelog/2026-07-01-secret-scanning-public-monitoring-for-enterprises/
- Cross-check source: https://docs.github.com/en/code-security/concepts/secret-security/public-monitoring
- Supporting docs: https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning
- 수집 시각: 2026-07-04 02:34 KST

## Easy Summary

GitHub은 2026-07-01에 Enterprise용 Secret Scanning Public Monitoring을 public preview로 공개했다. 이 기능은 엔터프라이즈가 소유하지 않은 공개 저장소, 이슈, PR 댓글 등에서 기업 구성원 또는 확인된 도메인과 연결된 비밀값 노출을 찾아 enterprise security overview에 알리는 기능이다.

## Source-Backed Notes

- GitHub changelog는 public monitoring이 GitHub Secret Protection이 있는 Enterprise에 추가 비용 없이 public preview로 제공된다고 밝혔다.
- GitHub Docs는 public monitoring이 GitHub Enterprise Cloud에서 GitHub Advanced Security 또는 GitHub Secret Protection이 enabled인 enterprise에 제공되며, data residency 환경에는 제공되지 않는다고 설명한다.
- 감지 범위는 공개 GitHub 표면이며, private repositories를 스캔하는 기능은 아니다.
- attribution은 enterprise membership과 verified domain matching 두 방법으로 연결된다.
- GitHub secret scanning 기본 문서는 issue/PR/discussion/wiki/gist 같은 비코드 표면도 secret scanning 대상이 될 수 있음을 설명한다.

## Dex Company Use

- Dex Company는 "Vault/코드/보고서에 비밀값을 저장하지 않는다"를 넘어서, 공개 이슈/PR/댓글/토론에 실수로 토큰이 붙는 흐름도 QA 리스크로 봐야 한다.
- GitHub를 active delivery surface로 쓰는 프로젝트에서는 `secret.surface`, `detected.location`, `revocation.owner`, `rotation.status`, `public.monitoring.enabled`, `false_positive.status`를 QA_REPORT 또는 security checklist에 둘 수 있다.
- 자동화 보고서가 토큰, API key, auth file, billing API, cloud resource를 언급할 때는 "생성/저장/실행하지 않았다"를 계속 명시하는 현재 규칙이 타당하다.

## Evidence Quality

- evidence quality: high for public preview and requirements; medium for Dex Company adoption.
- cross verification: GitHub changelog plus GitHub Docs public monitoring and secret scanning docs.
- not checked: 에던님의 GitHub Enterprise Cloud, GHAS/Secret Protection, verified domains, enterprise security manager 권한, 실제 alert UI/API는 확인하지 않았다.

## Risk Notes

- OWASP LLM risk mapping: sensitive information disclosure, overreliance, excessive agency, insecure plugin design.
- public monitoring alert가 있다고 해서 토큰이 자동으로 안전해지는 것은 아니다. credential revocation과 rotation owner가 따로 필요하다.
- enterprise-only 기능이므로 개인/소규모 저장소에서는 GitHub secret scanning, push protection, local preflight scan 등 별도 보완이 필요하다.
- install.status: documentation-only. GitHub 보안 기능을 켜거나 API를 호출하지 않았다.

## Classification

- source-backed: public preview, 대상 고객, 공개 표면 스캔, attribution 방식, private repository 제외.
- Dex inference: Dex Company QA/security checklist 필드 제안.
- not checked: live enterprise availability, alert export, 실제 false positive 처리 흐름.
