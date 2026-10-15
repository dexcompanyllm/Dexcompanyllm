---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Model Docs Governance - 2026-07-04 02:01 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T02:01:43+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/llms.txt"
  - "https://developers.openai.com/codex/changelog"
  - "https://openai.com/index/previewing-gpt-5-6-sol/"
  - "https://github.blog/changelog/2026-07-01-enterprises-can-default-to-auto-model-selection/"
  - "https://github.blog/changelog/2026-07-01-copilot-cli-auto-model-selection-routes-based-on-task"
  - "https://docs.github.com/en/copilot/how-tos/copilot-on-github/set-up-copilot/configure-access-to-ai-models"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
collectionPurpose: "Codex machine-readable docs, OpenAI/GitHub model governance, design-agent 중복 신호를 Dex Company 운영 지식으로 흡수하거나 중복 처리한다."
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

# Dex Company Growth Scan Model Docs Governance - 2026-07-04 02:01 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 02:01 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault AGENTS/role routing/matrix, LLM Wiki operating guide, index/log, Growth Scan improvement guide, 최근 01:34/01:03/00:34/00:04 보고서, 10x candidate queue, OpenAI Codex docs/changelog/llms.txt, OpenAI model announcement, GitHub Copilot changelog/docs, Obsidian changelog, Storybook, Figma, NN/g/Maze, Threads snippets.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`을 유지하면서 SDK/API/CLI/model/metrics 항목에 필요한 기록 필드를 실제 새 후보에 적용했다.
- 제외: package, SDK, GitHub CLI, Copilot CLI, Actions workflow, model picker, browser tool, Figma connector, plugin, MCP server, API key, token, auth file, billing setting, cloud resource를 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고, 공개 출처 URL, 확인 범위, 후보 판단, 저장/중복/보류 결정, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 18 |
| stored.count | 3 |
| duplicate.count | 7 |
| deferred.count | 5 |
| blocked.count | 4 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Codex docs는 `llms.txt`, `llms-full.txt`, `codex-manual.md`, 개별 Markdown twin을 제공한다. Codex 관련 최신 규칙은 일반 검색 결과보다 공식 machine-readable docs를 먼저 확인하는 쪽이 더 안전하다.
2. GitHub Copilot의 모델 선택은 고정 모델명만으로 설명되지 않는다. enterprise managed setting, auto routing, 조직/엔터프라이즈 모델 접근 정책, base/LTS model 개념을 함께 기록해야 한다.
3. OpenAI GPT-5.6 Sol preview는 모델 후보 신호일 뿐이다. system card, API model id, 가격, 계정/플랜/지역/워크스페이스 availability, 작은 eval 전에는 운영 모델로 채택하면 안 된다.
4. Figma agent skills와 design-system collaboration 신호는 이미 직전 source note가 충분히 커버한다. 이번에는 중복으로 저장하지 않고 WCAG-linked QA 기준만 다시 확인했다.
5. Threads 검색은 discovery signal은 있었지만 source text와 provenance가 약했다. 이번 실행에서는 source-backed knowledge로 승격하지 않았다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-llms-machine-readable-docs.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-github-copilot-auto-model-selection-governance.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-gpt-56-sol-preview-model-governance.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 3 source notes for Codex machine-readable docs, Copilot auto model governance, and GPT-5.6 Sol preview governance |
| Index | Added 3 source links and this report link |
| Log | Added this 02:01 scheduled growth scan entry |
| Inbox queue | Preserved old 10x queue at `eligible-next=0`, `not-checked=0`; no broad queue reopening |
| Installs | No install, workflow run, token creation, billing/API call, model enablement, Figma/GitHub connector action, or package command |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI Codex `llms.txt` / `llms-full.txt` | official docs | source-backed: machine-readable docs entrypoint and Markdown docs map; Dex inference: source-driven priority route; not checked: full docs diff and every page completeness | medium |
| GitHub Copilot auto model selection | official changelog + docs | source-backed: enterprise auto default, CLI auto routing, model policy, base/LTS model concepts; Dex inference: model governance fields; not checked: local/enterprise settings | medium |
| OpenAI GPT-5.6 Sol preview | official announcement | source-backed: preview, safeguards, phased release, system card reference; Dex inference: candidate-only model gate; not checked: API/model picker/account availability | medium |
| Codex changelog latest | official docs/RSS | duplicate/currentness check | existing changelog/source notes cover the operational lane; latest UI/system-prompt/latency items did not change local action |
| OpenAI API deprecations | official docs | duplicate/currentness check | July 2 fine-tuning restriction already rechecked in prior reports |
| Figma agent skills | official blog | duplicate-source | existing `2026-07-04-figma-agent-skills-collaboration.md` already stores the source |
| GitHub AI credit/session/usage metrics | official changelog/docs | duplicate-source | existing notes cover session limits, credit pools, metrics coverage, managed settings |
| Obsidian/Storybook/Next.js/WCAG/OWASP | official/existing anchors | duplicate/no-new-signal | no new decision-changing signal in this 30-minute window |
| Threads snippets | public SNS snippets | not checked/source-weak | discovery-only; no stable source-backed text promoted |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| OpenAI Codex machine-readable docs ingestion workflow | documentation-process candidate | No | Use as source lookup route only; do not bulk-copy entire docs into the vault. |
| GitHub Copilot auto model selection | model-governance candidate | No | Requires plan, policy, client, billing, and actual selected model trace before operational use. |
| GPT-5.6 Sol | model candidate only | No | Preview announcement does not prove API/Codex/ChatGPT local availability or cost. |
| Figma agent skills | duplicate due-diligence candidate | No | Existing note already says connector/plan/private chat permissions must be checked before use. |
| Threads-discovered Codex workflow snippets | rejected for source-backed ingest | No | Useful only as discovery; provenance and extraction quality are weak. |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: Codex changelog, Codex model governance, API deprecations, GitHub Copilot managed settings, AI credit session limits, usage metrics, Kimi model governance, Figma skills, Obsidian CLI/Bases, Storybook/Next/Vite, WCAG 2.2, OWASP LLM Top 10.
- rejected/source-weak: Threads posts about Codex workflows, MCP, loop engineering, and AI coding agents were not promoted because official OpenAI/GitHub/Figma sources are stronger.
- deferred: full OpenAI Codex `llms-full.txt` diff workflow, actual local Codex feature availability, GitHub enterprise `managed-settings.json`, Copilot CLI model trace, GPT-5.6 Sol system card/API availability.
- blocked: X remains excluded by automation rule; account-gated vendor/account states were not checked.

## Failure / Blocked / Not Checked

- No local Codex version, Codex model picker, GitHub Copilot plan, enterprise policy, Copilot CLI version, Figma connector state, or account availability was checked.
- No system card full audit for GPT-5.6 Sol was completed; the source note remains preview-level and partial.
- Threads was searched but not promoted because source extraction and provenance were not strong enough.
- Official public documentation proves public source availability, not 에던님의 current machine/account/org/workspace availability.

## Cross Verification Evidence

- Codex machine-readable docs were checked against existing Codex config/automation/security/SDK/model source notes.
- GitHub auto model selection was checked against existing managed-settings, AI credit session limits, Kimi model governance, and OpenAI model governance notes.
- GPT-5.6 Sol preview was checked against existing model governance/deprecation notes; it remains candidate-only.
- Figma duplicate was checked against the existing Figma agent skills note and WCAG 2.2 anchor. For future UI work, the practical WCAG link is keyboard operation, focus visibility, contrast, error/status announcement, and accessible name/role/value checks on generated UI, not the Figma article itself.

## Ethan Can Use This Immediately

- Codex 관련 최신 기능을 물으시면 덱스는 일반 검색 요약보다 `developers.openai.com/codex/llms.txt`와 개별 Markdown docs를 먼저 확인하겠습니다.
- 모델 변경 제안이 나오면 `model.mode`, `policy_source`, `actual_selected_model`, `billing_owner`, `availability.surface`, `rollback.model`, `eval.before_after`를 먼저 보시면 됩니다.
- 새 모델 발표가 보여도 바로 적용하지 마시고, 에던님의 계정/플랜/지역/API/Codex 앱에서 가능한지와 비용, system card, 작은 eval을 분리해서 확인하시면 됩니다.
- Figma agent/design-system 자료는 "디자인 시스템이 있으면 에이전트가 더 잘한다"가 아니라, design decision log와 WCAG-linked QA gate를 먼저 갖추는 방향으로 쓰는 것이 안전합니다.

## Improvement Delta

- Growth Scan source lookup 기준에 `official_machine_readable_doc`, `docs_markdown_twin`, `full_doc_copy_policy`를 추가할 근거가 생겼다.
- 모델 관련 후보의 기록 필드를 `model.mode`, `model.policy_source`, `auto.routing_basis`, `actual_selected_model`, `base_or_lts_model`, `availability.surface`, `rollback.model`, `eval.before_after`로 확장할 근거가 생겼다.
- 새 모델 발표는 `candidate-signal`과 `local-availability`를 분리해 저장해야 한다는 규칙을 명확히 했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지 기준을 지켰다.
- done: SDK/API/CLI/model/metrics 계열에 필요한 owner/version/credential/billing/install/local availability 분리 원칙을 모델 후보에 적용했다.
- done: 새 공식/high-provenance 신호 3개만 저장하고, 중복 7개는 다시 저장하지 않았다.
- done: Figma/design-system 자료는 WCAG 2.2 QA 연결을 유지하되 중복 source note를 만들지 않았다.
- carried: live account/runtime availability 확인은 이번 자동화 범위 밖이라 다음 실제 사용 요청 때 확인해야 한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| SDK/API/CLI/model source fields | carried | done | Copilot auto model and GPT-5.6 preview notes에 model/policy/availability/eval fields 적용 |
| Metrics/reporting source fields | carried | carried | 이번 실행에는 새 metrics source를 저장하지 않음 |
| Short no-op if no signal | carried | done | 완전 no-op은 아니지만 저장을 3개로 제한하고 duplicate 7개 제외 |
| Live availability checks | carried | carried | account/org/runtime state not checked |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; only store new sources that change Dex Company decisions.
2. For Codex/OpenAI docs, prefer official `llms.txt`, `.md`, or official docs pages before generic search snippets.
3. For model-related sources, record `model.mode`, `model.policy_source`, `actual_selected_model`, `availability.surface`, `billing_owner`, `rollback.model`, and `eval.before_after`.
4. If no new official/high-provenance signal appears, write a short no-op report rather than adding low-value source notes.

## Prompt or Template Patch Candidate

```text
For Codex/OpenAI documentation checks, prefer official machine-readable docs such as `llms.txt`, `llms-full.txt`, `codex-manual.md`, and individual `.md` pages when available. Do not bulk-copy full docs into LLM Wiki. For every model-related Growth Scan item, record: model.mode, model.policy_source, auto.routing_basis, actual_selected_model, availability.surface, account.plan, billing_owner, cost.multiplier, rollback.model, eval.before_after, system_card.checked, and install.status. Public announcements are candidate signals, not local availability proof.
```

## Questions / Tracking Candidates

- Codex/OpenAI docs를 주기적으로 diff할 별도 lightweight script를 만들지, 아니면 source-driven task마다 수동 확인할지 다음 운영 결정이 필요하다.
- 모델 자동 선택을 쓰는 외부 도구가 생기면 actual selected model trace를 어디에 남길지 정해야 한다.
- GPT-5.6 Sol 같은 preview 모델은 실제 사용 가능 요청이 들어올 때 system card/API/model picker/current pricing을 별도 확인해야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 01:34, 01:03, 00:34, 00:04 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Storybook, Figma, NN/g/Maze, Threads searched or checked |
| Duplicate check | passed | `rg` checked existing sources/index/log/reports/queue before writing |
| Previous deferred rejudgement | passed | model/source-field and no-op discipline rejudged |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed; source notes count is 123 |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, billing API, workflow run, model enablement, SDK, MCP, connector, or plugin action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: model and auto-routing sources are easy to overstate as locally usable.
- Mitigation: all items are documentation/source notes only; no install, auth, workflow, billing, model, or connector action was run; status/lint/schema/UTF-8 checks passed.
- Not checked: local/account/org/runtime availability, full system card, live model picker, actual Copilot auto-selected model trace.
