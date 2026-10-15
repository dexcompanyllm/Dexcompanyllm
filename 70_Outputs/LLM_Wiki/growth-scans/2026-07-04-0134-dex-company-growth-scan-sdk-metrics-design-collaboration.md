---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan SDK Metrics Design Collaboration - 2026-07-04 01:34 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T01:34:10+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/sdk"
  - "https://developers.openai.com/codex/models"
  - "https://github.blog/changelog/2026-07-02-copilot-cli-no-longer-needs-a-personal-access-token-in-github-actions/"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli-in-actions"
  - "https://github.blog/changelog/2026-07-02-improved-accuracy-and-coverage-in-copilot-usage-metrics-reports/"
  - "https://www.figma.com/blog/2026-ai-report/"
  - "https://report.zeroheight.com/"
collectionPurpose: "Codex SDK/model governance, GitHub Copilot automation credentials/metrics, AI design collaboration, design system role ownership 신호를 Dex Company 운영 지식으로 흡수한다."
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

# Dex Company Growth Scan SDK Metrics Design Collaboration - 2026-07-04 01:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 01:34 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault AGENTS/role routing/matrix, LLM Wiki 운영 문서, index/log, Growth Scan improvement guide, 최근 01:03/00:34/00:04/23:35 보고서, 10x candidate queue, OpenAI Codex SDK/models/changelog, GitHub Copilot changelog/docs, Obsidian changelog, Storybook/Figma/zeroheight/W3C 자료.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지. 새 공식/고신뢰 신호가 Dex Company 운영 판단을 바꾸는 경우에만 source note로 흡수.
- 제외: SDK, package, GitHub CLI, Copilot CLI, GitHub Actions workflow, token/PAT/secret/auth file, billing API, metrics API, Figma connector, zeroheight account, plugin, MCP server를 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고, 공식/고신뢰 출처 URL, 확인 범위, 후보 판단, 중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 24 |
| stored.count | 6 |
| duplicate.count | 9 |
| deferred.count | 6 |
| blocked.count | 6 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Codex SDK는 로컬 app-server와 pinned CLI runtime을 다루므로, 자동화 도입 전 `runtime.owner`, `codex_bin.source`, `sdk.version`, `sandbox.mode`, `rollback.path`를 분리해야 한다.
2. Codex 모델 문서는 추천 모델/저비용 모델/cloud 제한/Chat Completions deprecation/deprecated model 참조 점검을 한 번에 묶어준다. 자동화는 model availability와 config 참조를 current로 단정하면 안 된다.
3. GitHub Copilot CLI는 Actions에서 `GITHUB_TOKEN`을 쓸 수 있지만, direct CLI workflow step은 workflow environment 접근과 organization billing을 함께 건드린다. PAT 제거는 보안 검토 종료가 아니다.
4. GitHub Copilot usage metrics 개선은 AI 도구 성과/비용 지표가 API version, CLI version, telemetry coverage에 따라 바뀔 수 있음을 보여준다.
5. Figma/zeroheight 자료는 AI 시대의 디자인 시스템이 개인 생산성보다 협업, decision quality, engineering/accessibility ownership을 더 강하게 요구한다는 vendor-sourced 신호다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-python-sdk-runtime-boundary.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-model-governance-deprecations.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-cli-actions-token-billing.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-usage-metrics-coverage.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-figma-2026-ai-report-multiplayer-design.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-zeroheight-design-systems-report-2026.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 6 source notes across Codex SDK/model governance, Copilot Actions credential/billing, Copilot metrics, Figma AI collaboration, and design-system role ownership |
| Index | Added 6 source links and this report link |
| Log | Added this 01:34 scheduled growth scan entry |
| Inbox queue | Preserved old 10x queue at `eligible-next=0`, `not-checked=0`; no broad MCP Apps reopening |
| Installs | No install, workflow run, token creation, billing/API call, connector action, or package command |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI Codex SDK | official docs + changelog | source-backed: SDK/app-server/JSON-RPC/pinned runtime; Dex inference: runtime boundary gate; not checked: local install/app-server/account | medium |
| OpenAI Codex Models | official docs + config reference | source-backed: recommended models, config, cloud limitation, deprecation notes; Dex inference: model governance scan; not checked: local config/account model picker | medium |
| Copilot CLI in Actions with `GITHUB_TOKEN` | official changelog + docs | source-backed: PAT removal, permission, org billing, direct CLI warning; Dex inference: trigger/billing gate; not checked: org policy/runner/CLI version | medium |
| Copilot usage metrics coverage | official changelog + REST docs | source-backed: metrics coverage and AI credit attribution update; Dex inference: metric version field; not checked: actual API response | medium |
| Figma 2026 AI report | vendor research report | source-backed: published sample/interview counts and collaboration signal; Dex inference: design decision log gate; not checked: full dataset/methodology | medium |
| zeroheight Design Systems Report 2026 | vendor industry report | source-backed: public role distribution and accessibility/DesignOps signal; Dex inference: owner matrix; not checked: methodology/product/pricing | medium |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| OpenAI Codex Python SDK | project-specific conditional | No | Requires package/dependency audit, runtime ownership, sandbox check, app-server behavior, rollback path, and Ethan approval. |
| OpenAI Codex model config changes | config-governance candidate | No | Requires live local config and account model availability check. |
| Copilot CLI in GitHub Actions | project-specific conditional | No | Requires workflow trigger, permissions, billing owner, session limit, fork PR risk, runner policy, and CLI version review. |
| Copilot usage metrics API | reporting-governance candidate | No | Requires org/enterprise owner role, API access, privacy/billing data boundary, and API version recording. |
| Figma AI/canvas workflow | design-collaboration candidate | No | Requires file permission, connector/context boundary, and design QA workflow. |
| zeroheight/report tooling | reference-only | No | Vendor report absorbed as source; no SaaS/tool install or account connection. |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: Codex CLI/changelog/general app docs were already covered; only SDK and model governance were newly stored.
- duplicate/no-new-signal: GitHub Agentic Workflows `GITHUB_TOKEN`, AI credit pools, session limits, managed settings, and Kimi model governance were already stored; this run stored Copilot CLI direct Actions and metrics coverage as distinct angles.
- duplicate/no-new-signal: Obsidian changelog/CLI/Bases, Storybook/Next.js/Vite, WCAG 2.2, OWASP LLM Top 10 remain existing anchors.
- rejected/no-new-signal: generic AI/design-system blog posts and YouTube items were not stored because official/vendor report pages had stronger provenance.
- deferred: Codex SDK package/dependency audit, local SDK installability, local model config scan, GitHub org policy, Copilot metrics API response, Figma/zeroheight live account state.
- blocked: X remains excluded by automation rule; Threads was not promoted because prior runs found unstable source extraction and no stronger source-backed signal appeared.

## Failure / Blocked / Not Checked

- No SDK/package/GitHub/Copilot/Figma/zeroheight runtime was installed or authenticated.
- No API key, PAT, token, secret, auth file, billing setting, usage metrics API call, GitHub Actions workflow, or cloud resource was created.
- Figma and zeroheight are vendor-sourced; useful for operating hypotheses, not neutral proof.
- OpenAI/GitHub official docs prove public feature documentation, not local availability on 에던's current account, OS, plan, organization, or workspace.

## Cross Verification Evidence

- Codex SDK was cross-checked against existing Codex App Server, access-token, and managed-configuration notes.
- Codex model governance was cross-checked against existing Codex config reference and GitHub model-governance notes.
- Copilot CLI Actions auth was cross-checked against GitHub Docs and the existing Agentic Workflows `GITHUB_TOKEN` note; direct CLI risk remains higher than Agentic Workflows.
- Copilot metrics update was cross-checked against existing AI credit session limits and AI credit pools notes.
- Figma report was cross-checked against existing Figma Design Agent, Figma agent skills, and NN/g critique/research notes.
- zeroheight report was cross-checked against existing GOV.UK, USWDS, Carbon, Atlassian, Shopify Polaris, and WCAG 2.2 source notes.

## Ethan Can Use This Immediately

- Codex SDK 자동화를 제안받으면 "설치하면 편하다"보다 먼저 runtime owner, pinned CLI, sandbox, rollback, auth file 여부를 확인하시면 됩니다.
- Codex/GitHub 모델을 바꿀 때는 "최신 모델"보다 config 위치, deprecated reference, cloud 제한, 계정 사용 가능성, 비용을 먼저 확인하시면 됩니다.
- GitHub Actions에 Copilot CLI를 넣자는 제안은 PAT가 없어도 workflow trigger, fork PR, permission, organization billing, session limit을 따로 보셔야 합니다.
- AI 디자인 작업은 산출 속도보다 decision log, critique, research evidence, WCAG-linked QA, owner matrix를 남기는 쪽이 다음 프로젝트에 더 잘 재사용됩니다.

## Improvement Delta

- Growth Scan template 후보가 `runtime.owner`, `codex_bin.source`, `sdk.version`, `model.source`, `deprecated_model.scan`, `metric.version`, `telemetry.coverage`, `design.owner_matrix`까지 확장됐다.
- 비용/성과 지표는 단일 숫자가 아니라 API version, telemetry coverage, CLI/plugin version, billing attribution과 함께 기록해야 한다는 규칙이 추가됐다.
- 디자인 시스템 자료는 "좋은 사례" 저장보다 owner matrix와 WCAG-linked component release gate로 흡수해야 한다는 방향이 강화됐다.

## Adoption Check

- done: `eligible-next=0`, `not-checked=0` 상태를 유지했다.
- done: 새 자료는 공식/고신뢰 출처 중 Dex Company 운영 판단을 바꾸는 6개로 제한했다.
- done: GitHub/Codex/Copilot 자동화 기능마다 `credential.source`, `billing.owner`, `runtime.command_checked`, `install.status`를 분리했다.
- done: 디자인/UX/design systems 자료를 WCAG 2.2 실무 QA 기준과 연결했다.
- carried: live Codex/GitHub/Copilot/Figma/account/runtime availability는 계정/권한 확인 전까지 current로 말하지 않는다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| GitHub/Codex/Copilot automation fields | carried | done | SDK, model, Copilot CLI Actions, metrics notes에 runtime/credential/billing/metric 필드를 적용 |
| Live availability checks | carried | carried | local/account/org/runtime state was not checked |
| Old 10x queue reopening | blocked-by-default | done | `eligible-next=0`, `not-checked=0` 유지 |
| Vendor/research signals | carried | done | Figma/zeroheight는 source note로 저장하되 vendor bias와 WCAG gate를 명시 |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; do not reopen the old 10x queue unless a source changes a prior decision.
2. If the next run finds SDK/API/CLI automation sources, record `runtime.owner`, `runtime.command_checked`, `credential.source`, `billing.owner`, `sandbox.mode`, `rollback.path`, and `install.status`.
3. If the next run finds metrics/reporting sources, record `metric.version`, `telemetry.coverage`, `api.version`, `owner.role`, and `historical_drift.risk`.
4. If no new official/high-provenance signal appears, write a short no-op report instead of adding low-value notes.

## Prompt or Template Patch Candidate

```text
For every Growth Scan item involving SDKs, CLI automation, model selection, or metrics APIs, record: runtime.owner, runtime.command_checked, credential.source, billing.owner, sandbox.mode, rollback.path, install.status, model.source, deprecated_model.scan, metric.version, telemetry.coverage, and api.version. Public docs prove source-backed public behavior, not local availability on Ethan's account, OS, plan, organization, or workspace.
```

## Questions / Tracking Candidates

- Codex SDK를 실제로 쓸 프로젝트가 생기면 package/dependency audit와 app-server runtime 실사를 별도 문서로 만들지 결정해야 한다.
- 에던의 자동화 보고서 템플릿에 `metric.version`과 `telemetry.coverage`를 정식 필드로 넣을지 다음 실행에서 다시 볼 수 있다.
- 디자인 시스템 프로젝트가 시작되면 owner matrix와 WCAG 2.2 component release gate를 `QA_REPORT.md` 템플릿으로 고정할지 검토한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 01:03, 00:34, 00:04, 23:35 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Storybook, Figma, zeroheight, W3C searched or checked |
| Duplicate check | passed | `rg` checked existing LLM Wiki notes before writing |
| Previous deferred rejudgement | passed | automation fields, live availability, queue reopening, vendor signals rejudged |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, billing API, metrics API, workflow run, SDK, MCP, connector, or plugin action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: SDK/CLI/API/model/metrics sources are install- or account-adjacent. Treating public docs as local availability would be unsafe.
- Mitigation: all items were stored as source-backed documentation or due-diligence candidates only; no install, auth, workflow, billing, or connector action was run.
- Not checked: local Codex SDK installability, app-server behavior, Codex model picker/config, GitHub org policy, Copilot CLI version, Copilot metrics API response, Figma/zeroheight account state.

