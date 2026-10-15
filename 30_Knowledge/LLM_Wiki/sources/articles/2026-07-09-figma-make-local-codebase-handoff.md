---
type: llm-wiki-source
status: captured
title: "Figma Make local codebase handoff"
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
sourceKind: official-product-docs
source:
  - "https://www.figma.com/blog/code-on-the-figma-canvas/"
  - "https://help.figma.com/hc/en-us/articles/40775535020695-Make-in-your-local-codebase"
  - "https://help.figma.com/hc/en-us/articles/35463818346647-Push-from-Figma-Make-to-GitHub"
  - "https://help.figma.com/hc/en-us/articles/23920389749655-Code-Connect"
  - "https://help.figma.com/hc/en-us/articles/32132100833559-Guide-to-the-Figma-MCP-server"
publisher: "Figma"
collectionPurpose: "Figma Make/code layers/local codebase 기능을 Dex Company frontend/design-to-code handoff에서 source-of-truth, repository permission, script execution, branch/PR, one-way push, MCP context risk로 분리하기 위해 보존한다."
tags:
  - llm-wiki/source
  - figma
  - design-to-code
  - frontend
  - ai-agents
  - github
---

# Figma Make local codebase handoff

## Original Content

- 수집 시각: 2026-07-09 02:34 KST
- 자료 유형: Figma official blog + Figma Help Center product documentation
- 핵심 내용 쉬운 설명: Figma는 code layers와 Figma Make를 통해 디자인 캔버스, 실행 중인 앱, 로컬/GitHub 코드 저장소, branch/PR 흐름을 더 가깝게 연결하고 있습니다. 이 흐름은 디자인 탐색에는 유용하지만, 실제 코드 저장소와 실행 스크립트, GitHub 권한, MCP/Code Connect context가 얽히므로 설치나 계정 연결 없이 지식으로만 흡수합니다.
- 원문 보존 방식: 원문 전체를 복사하지 않고 URL, 확인 범위, 운영 판단, 미확인 항목만 보존합니다.

## Source-Backed Notes

- Figma code layers는 캔버스에서 interactive code를 비교하고, code state를 editable design layers로 추출하며, 코드 편집 뒤 다시 code layer로 되돌리는 흐름을 제시합니다.
- Figma Make local codebase closed beta는 GitHub repository 또는 local repository를 연결해 running app을 보고, branch와 pull request 흐름까지 Figma 안에서 다룰 수 있다고 설명합니다.
- Figma Make local codebase setup에는 repository별 `.figma/make` configuration이 필요하며, `setup`, `install`, `dev`, `verify`, `env` 파일이 dependency install, dev server start, readiness check, environment/port configuration에 관여합니다.
- Figma Make to GitHub 문서는 team/organization 단위 GitHub connection, Figma-created repository push, one-way push, default branch push 같은 제한을 설명합니다.
- Code Connect UI는 Figma library components와 codebase components를 연결하고, 이 mapping context가 Figma MCP server를 통해 AI-enabled tools에 전달될 수 있다고 설명합니다.
- Figma MCP server guide는 design, FigJam, Make file context와 live UI capture가 AI agent/tool context가 될 수 있고, beta 이후 usage-based paid feature가 될 수 있음을 알립니다.

## Dex Company Use Example

Frontend/design-to-code 작업에서 Figma Make 또는 code layer가 등장하면 아래를 먼저 확인합니다.

```yaml
figma_make_codebase_handoff:
  account_or_org_owner: checked | not_checked
  feature_availability: closed_beta | available | not_checked
  platform_requirement: mac_beta_app | web | not_checked
  repository_source: local_repo | github_clone | figma_created_repo | not_checked
  git_provider_support: github | ghec | ghes_not_supported | gitlab_ssh_partial | bitbucket_ssh_partial | not_checked
  figma_make_config_files: checked | not_checked
  scripts_reviewed: setup_install_dev_verify_env | not_checked
  dependency_install_scope: checked | not_checked
  local_dev_server_scope: checked | not_checked
  branch_pr_flow: checked | not_checked
  one_way_push_risk: checked | not_checked
  code_connect_mapping_scope: checked | not_checked
  mcp_context_exposure: checked | not_checked
  secrets_and_env_redaction: checked | not_checked
  browser_qa_required_after_export: yes | no | not_checked
```

## Evidence Quality

- quality: medium
- 이유: Figma 공식 자료와 Help Center 문서를 교차 확인했지만, closed beta / account / platform / organization policy / live repository 동작은 이번 실행에서 확인하지 않았습니다.
- 교차 검증: Figma code layer product blog, local codebase Help Center, Push to GitHub Help Center, Code Connect Help Center, Figma MCP server guide, 기존 `Figma Config 2026 motion agent handoff` source note를 대조했습니다.

## Risk / License / Security

- 설치 여부: 설치하지 않음.
- 계정 연결 여부: 연결하지 않음.
- GitHub/Figma app authorization: 수행하지 않음.
- OWASP LLM 위험 분류: supply chain, insecure plugin/tool design, excessive agency, sensitive information disclosure, prompt injection via design/repo context, insecure output handling, overreliance.
- 운영 제한: 실제 사용은 target repository, account/org owner, permission scope, `.figma/make` script review, dependency install path, dev server behavior, branch/PR policy, rollback, browser QA evidence가 있을 때만 조건부 승인 후보로 올립니다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Figma official docs describe code layers, local/GitHub repository workflows, `.figma/make` configuration files, GitHub push limitations, Code Connect mapping, and MCP context integration.
- Dex inference: Dex Company should treat Figma Make/local codebase as a design-to-code handoff and repository-risk workflow, not as a default frontend implementation path.
- not checked: Ethan Figma account eligibility, closed beta access, Mac beta app availability, live repository setup, GitHub app permissions, generated code quality, local dependency install behavior, browser/runtime QA, cost after beta.

