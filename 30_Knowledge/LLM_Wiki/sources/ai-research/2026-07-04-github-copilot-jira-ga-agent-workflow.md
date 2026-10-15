---
type: llm-wiki-source
status: captured
title: "GitHub Copilot for Jira generally available"
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
source:
  - "https://github.blog/changelog/2026-06-25-github-copilot-for-jira-is-now-generally-available/"
  - "https://docs.github.com/en/copilot/how-tos/use-copilot-agents/cloud-agent/integrate-cloud-agent-with-jira"
publisher: "GitHub"
collectionPurpose: "Jira 같은 외부 업무 도구에서 agent progress, post-session steering, repository permission, SSO, app authorization을 어떻게 분리해 검토해야 하는지 저장한다."
tags:
  - llm-wiki/source
  - github
  - copilot
  - jira
  - agent-governance
  - workflow-integration
---

# GitHub Copilot for Jira Generally Available

## Original Content

- 수집 시각: 2026-07-04 00:34 KST
- 자료 유형: GitHub 공식 changelog + GitHub Docs
- 원문 보존 방식: 원문 전체를 복사하지 않고, 출시 상태, 확인 범위, 설치/권한 위험, Dex Company 적용 판단만 보존한다.
- 확인 범위: GitHub changelog의 GA 발표, Jira issue 안에서의 progress streaming, draft PR 이후 follow-up steering, onboarding 단순화, GitHub Docs의 app 설치, GitHub organization/repository access, SSO, write access 요구.

## Source-Backed Notes

- GitHub Copilot for Jira는 2026-06-25 GA로 발표되었다.
- Jira issue에서 agent progress를 볼 수 있고, draft pull request 이후 Jira chat panel에서 같은 PR에 대한 follow-up instruction을 줄 수 있다는 방향이 제시됐다.
- GitHub Docs 기준으로 app 설치, GitHub organization/repository authorization, SSO, repository write access, Jira/GitHub 관리자 설정이 작동 조건이다.

## Dex Company Use Example

- Dex Company가 Jira/Linear/GitHub Projects 같은 외부 업무 도구와 agent를 연결할 때는 "티켓에서 보인다"와 "코드/저장소에 작업 권한이 있다"를 분리해서 기록한다.
- PM/PL 업무에서 agent ticket automation을 쓰려면 ticket 상태, PR 링크, follow-up steering, repository scope, SSO 상태를 QA_REPORT에 남긴다.
- 에던 승인 없이 Atlassian Marketplace app, GitHub app, organization access, SSO authorization을 설치하거나 연결하지 않는다.

## Evidence Quality

- quality: medium
- 이유: GitHub 공식 changelog와 GitHub Docs를 교차 확인했지만, 실제 Jira tenant, GitHub organization, Copilot entitlement, SSO 상태는 확인하지 않았다.
- 교차 검증: 기존 GitHub Copilot session streaming, enterprise managed settings, repository MCP configuration source note와 같은 "external workflow integration requires policy and permission boundary" 흐름이다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- OWASP LLM 위험 분류: excessive agency, sensitive information disclosure, insecure plugin design, overreliance.
- 운영 제한: Jira/GitHub 연결은 repository metadata, issue content, PR content, SSO/session state, organization app permissions를 포함할 수 있으므로 프로젝트별 승인과 권한 최소화가 필요하다.

## Claim Split

- source-backed: GA 발표, Jira progress/follow-up steering, app 설치와 repository authorization 조건.
- Dex inference: Dex Company ticket automation에서 permission/source-of-truth checklist로 쓰는 판단.
- not checked: 에던의 GitHub/Jira/Copilot 계정 상태, Atlassian tenant 설정, SSO, 실제 app permission manifest, 데이터 보존/감사 로그.

