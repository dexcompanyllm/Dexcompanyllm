---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan GitHub Planning Security - 2026-07-04 02:34 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T02:34:34+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://github.blog/changelog/2026-07-02-issue-fields-are-now-generally-available/"
  - "https://docs.github.com/en/issues/tracking-your-work-with-issues/using-issues/managing-issue-fields-in-your-organization"
  - "https://github.blog/changelog/2026-07-01-secret-scanning-public-monitoring-for-enterprises/"
  - "https://docs.github.com/en/code-security/concepts/secret-security/public-monitoring"
  - "https://github.blog/changelog/2026-07-01-github-models-is-being-fully-retired-on-july-30-2026/"
collectionPurpose: "Dex Company의 GitHub 기반 PL metadata, secret leakage 대응, model/provider retirement gate를 최신 공식 자료로 갱신한다."
confidence: medium
claimType: historical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - automation
---

# Dex Company Growth Scan GitHub Planning Security - 2026-07-04 02:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 02:34 KST
- 검색 범위: automation memory, 현재 작업 폴더, Vault AGENTS/role routing/matrix, LLM Wiki operating guide, index/log, Growth Scan improvement guide, 최근 02:01/01:34/01:03/00:34 보고서, 10x candidate queue, OpenAI Codex changelog/release notes, GitHub July 2026 changelog/docs, Obsidian changelog, Storybook/Next.js, Threads 공개 검색 결과.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지. 새 source note는 Dex Company 운영 판단을 바꾸는 공식/고신뢰 신호에만 제한했다.
- 제외: GitHub app, MCP server, Copilot CLI, Copilot plugin, workflow, secret scanning, Azure AI Foundry, API key, token, BYOK endpoint, cloud resource를 설치/실행/연결/생성하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 출처 URL, 확인 범위, 저장/중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 18 |
| stored.count | 3 |
| duplicate.count | 9 |
| deferred.count | 4 |
| blocked.count | 3 |
| lint.warning_count | 0 |

## Today's Core Findings

1. GitHub Issue Fields GA는 Dex Company PL 운영에서 이슈 우선순위, effort, target date, QA 상태를 라벨이 아니라 조직 레벨 typed metadata로 다룰 수 있게 한다.
2. GitHub Issue Fields는 MCP server를 통한 read/set 가능성이 있어 AI agent 권한 경계가 중요하다. "읽기 가능"과 "자동 쓰기 허용"은 별도 승인으로 분리해야 한다.
3. GitHub Secret Scanning Public Monitoring은 기업 소유 저장소 밖의 공개 GitHub 표면까지 유출 감시 범위를 넓힌다. Dex Company의 비밀값 저장 금지 규칙을 공개 이슈/PR/댓글까지 확장하는 근거가 된다.
4. GitHub Models retirement는 model/provider 의존성을 최신 문서로만 믿으면 안 된다는 신호다. deprecation date, brownout date, migration owner, rollback path를 Growth Scan 템플릿 후보로 올렸다.
5. Threads는 LLM Wiki와 agent workflow 관련 discovery 신호가 있었지만 안정적인 source-backed 텍스트로 승격하기에는 provenance가 약해 저장하지 않았다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-issue-fields-ga-planning-metadata.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-secret-scanning-public-monitoring.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-models-retirement-migration-risk.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 3 source notes for GitHub Issue Fields GA, Secret Scanning Public Monitoring, and GitHub Models retirement |
| Index | Added 3 source links and this report link |
| Log | Added this 02:34 scheduled growth scan entry |
| Inbox queue | Old 10x queue preserved at `eligible-next=0`, `not-checked=0`; no broad queue reopening |
| Installs | No install, API call, workflow run, secret scan enablement, MCP/Copilot/GitHub app setup, token, cloud, BYOK, or model endpoint action |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| GitHub Issue Fields GA | official changelog + docs | source-backed: GA, default fields, visibility, org-level fields, MCP read/set signal; Dex inference: PL metadata standard candidate; not checked: live org/MCP write permission | medium |
| GitHub Secret Scanning Public Monitoring | official changelog + docs | source-backed: public preview, requirements, public GitHub surface, attribution methods; Dex inference: QA/security checklist extension; not checked: enterprise availability and alert UI | medium |
| GitHub Models retirement | official changelog + monthly index | source-backed: July 30 retirement and July 16/23 brownouts; Dex inference: model deprecation gate; not checked: local usage inventory and replacement runtime | medium |
| OpenAI Codex Remote/DigitalOcean | official docs/release notes | duplicate-source | existing remote connection/access token notes already cover no-local-availability caveat |
| GitHub managed-settings/model governance | official changelog/docs | duplicate-source | existing managed-settings, auto model, Kimi, AI credit notes cover this lane |
| GitHub Copilot usage metrics/session/AI credits | official changelog/docs | duplicate-source | covered in 00:04, 01:03, 01:34, 02:01 runs |
| Next.js/Storybook/Obsidian | official docs/blog | duplicate/no-new-signal | existing frontend/Obsidian source notes remain sufficient |
| Threads snippets | public SNS snippets | not checked/source-weak | discovery only; no stable source-backed text promoted |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| GitHub Issue Fields with MCP write access | due-diligence candidate | No | Requires org permission, field schema, write-scope approval, audit log, rollback path, and source-of-truth decision. |
| GitHub Secret Scanning Public Monitoring | security feature candidate | No | Enterprise-only/public preview; requires GHAS or Secret Protection, verified domains, security owner, alert routing, rotation playbook. |
| GitHub Models migration to Azure AI Foundry or Copilot | migration candidate | No | Replacement platform requires account, billing, data retention, model policy, eval, and fallback review. |
| Copilot C++ language server config skill | install-adjacent candidate | No | Plugin/marketplace skill signal only; no Dex Company C++ project need and no supply-chain audit yet. |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: Codex changelog/release notes, Codex Remote, DigitalOcean plugin, GitHub managed-settings, Copilot auto model, Copilot Kimi, Copilot usage metrics, Storybook/Next/Vite, Obsidian, WCAG 2.2, OWASP LLM Top 10.
- rejected/source-weak: Threads posts about LLM Wiki, AI agents, frontend-design, and workflow automation were not promoted because official OpenAI/GitHub sources are stronger.
- deferred: Copilot C++ language server config skill audit, live GitHub Issue Fields org test, live Secret Protection availability, GitHub Models usage inventory.
- blocked: X was excluded by automation rule; GitHub enterprise/account/security availability was not checked; no private org or billing state was accessed.

## Failure / Blocked / Not Checked

- 에던님의 GitHub org/enterprise 권한, GitHub Issue Fields 실제 생성/수정, GitHub MCP server write path, enterprise security overview, GHAS/Secret Protection license, verified domain, GitHub Models 사용 여부는 확인하지 않았다.
- Secret scanning public monitoring은 public preview이며 GitHub Enterprise Cloud with data residency에는 제공되지 않는다고 문서에 표시되어 있어, 실제 도입 가능성은 계정/플랜 확인 전까지 partial이다.
- GitHub Models retirement는 공식 종료 일정은 확인했지만, Dex Company 프로젝트가 해당 서비스를 쓰는지 inventory는 확인하지 않았다.

## Cross Verification Evidence

- Issue Fields GA는 GitHub changelog와 GitHub Docs의 managing issue fields 문서를 대조했다.
- Secret Scanning Public Monitoring은 GitHub changelog, public monitoring docs, secret scanning docs를 대조했다.
- GitHub Models retirement는 개별 changelog와 GitHub July 2026 changelog index를 대조했다.
- WCAG 2.2는 이번 3개 저장 자료에는 직접 적용 대상이 아니다. 다만 Issue Fields를 쓰는 GitHub/프로젝트 UI를 설계한다면 필드명/상태값의 접근 가능한 이름, 키보드 탐색, 오류/변경 상태 안내, 색상만으로 priority를 전달하지 않는 기준을 QA에 연결해야 한다.

## Ethan Can Use This Immediately

- GitHub Issues를 프로젝트 실행 표면으로 쓸 때 `Priority`, `Effort`, `Target date`, `QA status`, `Risk`를 issue fields 후보로 두고, 공개 필드에는 내부 리스크나 고객 정보를 넣지 않으시면 됩니다.
- 자동화나 agent가 GitHub issue fields를 수정하게 하려면 "read-only", "suggest-only", "write-after-approval" 중 하나로 권한 단계를 먼저 정하시면 됩니다.
- 프로젝트에서 비밀값을 다룰 때는 코드 저장소뿐 아니라 GitHub issue, PR comment, Discussion, gist 같은 공개 텍스트 표면도 유출 표면으로 보셔야 합니다.
- AI/model 기능을 붙일 때는 `deprecation.date`, `brownout.date`, `replacement.surface`, `migration.owner`, `rollback.path`, `eval.before_after`를 최소 체크리스트로 쓰시면 됩니다.

## Improvement Delta

- Growth Scan 템플릿 후보에 `planning.metadata_source`, `field.visibility`, `agent.write_scope`, `secret.surface`, `revocation.owner`, `deprecation.date`, `brownout.date`, `migration.owner`를 추가할 근거가 생겼다.
- GitHub를 delivery surface로 쓸 때 Obsidian project notes와 GitHub issue fields의 source-of-truth 역할을 분리해야 한다는 운영 규칙이 강화됐다.
- 비밀값 안전 규칙이 "저장하지 않는다"에서 "공개 협업 표면에 붙지 않도록 감시/회수 owner를 둔다"로 확장됐다.

## Adoption Check

- done: `eligible-next=0`, `not-checked=0` 상태를 유지했고 old 10x queue를 재개하지 않았다.
- done: 직전 Next Eval에 따라 공식/high-provenance 신호만 저장했고, 중복 9개는 source note로 반복 저장하지 않았다.
- done: model-related source는 public source availability와 local availability를 분리했다.
- done: 설치/토큰/API/워크플로우/보안 기능 활성화 없이 documentation-only로 저장했다.
- carried: live account/org/runtime availability 확인은 이번 자동화 범위 밖이므로 실제 도입 요청 때 확인해야 한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done | 새 공식 운영 신호 3개만 저장하고 나머지는 duplicate/no-new-signal로 처리 |
| Model/source deprecation gate | carried | done | GitHub Models retirement note에 retirement/brownout/migration/rollback 필드 적용 |
| Runtime/account availability checks | carried | carried | GitHub org/security/model usage live state not checked |
| Old broad queue reopening | blocked-by-default | done | `eligible-next=0`, `not-checked=0` 유지 |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; do not reopen the 10x queue unless a source changes a prior decision.
2. If GitHub issue/project automation is revisited, record `planning.metadata_source`, `field.visibility`, `agent.write_scope`, `source_of_truth`, and `rollback.path`.
3. If security monitoring is revisited, record `secret.surface`, `detection.scope`, `revocation.owner`, `rotation.status`, `false_positive.status`, and `license.requirement`.
4. If no new official/high-provenance signal appears, write a short no-op report.

## Prompt or Template Patch Candidate

```text
For Growth Scan items involving GitHub Issues, Projects, MCP, or agent-readable planning metadata, record: planning.metadata_source, field.visibility, field.owner, source_of_truth, agent.write_scope, audit_log.path, rollback.path, and install.status. For secret/security monitoring items, record: secret.surface, detection.scope, attribution.method, revocation.owner, rotation.status, false_positive.status, license.requirement, and local_availability.checked. For model/provider retirements, record: deprecation.date, brownout.date, affected.surface, replacement.surface, migration.owner, rollback.path, eval.before_after, and cost.owner.
```

## Questions / Tracking Candidates

- GitHub를 Dex Company 프로젝트 실행 표면으로 본격 사용할 때 Obsidian의 `CURRENT.md`/`SESSION_HANDOFF.md`와 GitHub issue fields 중 어느 쪽을 source of truth로 둘지 먼저 정해야 한다.
- GitHub Secret Protection 또는 Advanced Security가 있는 조직을 쓰게 되면 public monitoring alert routing과 credential rotation owner를 별도 문서화해야 한다.
- GitHub Models를 쓰는 프로젝트가 있는지 확인해야 할 때는 코드, workflow, env, docs에서 endpoint/BYOK/model catalog 의존성을 먼저 inventory해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 02:01, 01:34, 01:03, 00:34 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Storybook/Next.js, Threads searched or checked |
| Duplicate check | passed | `rg` checked existing sources/index/log/reports/queue before writing |
| Previous deferred rejudgement | passed | no-op discipline and model deprecation gate rejudged |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed; source notes count is 126 |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, API, workflow, security enablement, MCP/Copilot/GitHub app action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: GitHub official feature availability may be mistaken for 에던님의 live account/org/security availability.
- Mitigation: all items are documentation/source notes only; no setup or credential action was run.
- Not checked: GitHub org permissions, enterprise license, issue field creation, MCP write behavior, public monitoring alerts, GitHub Models local usage inventory.
