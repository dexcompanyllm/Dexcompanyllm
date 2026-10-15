---
type: llm-wiki-growth-scan-report
status: active
title: "Dex Company Growth Scan Prompt Cost Safety - 2026-07-04 04:04 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
confidence: high
claimType: historical
evidenceScope: web-search-and-local-vault-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
sourceKind: automation-report
source:
  - "https://developers.openai.com/api/docs/guides/prompt-guidance"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://openai.github.io/openai-agents-python/release/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/update/"
collectionPurpose: "30분 간격 Dex Company Growth Scan 결과와 검증/중복/보류 판단 기록"
tags:
  - llm-wiki/report
  - growth-scan
  - dex-company
---

# Dex Company Growth Scan Prompt Cost Safety - 2026-07-04 04:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 04:04 KST
- 검색 범위: automation memory, 현재 작업 폴더, Vault AGENTS/role routing/matrix/LLM Wiki operating guide/index/log, Growth Scan improvement guide, 최근 03:34/03:02/02:34/02:01 보고서, 10x candidate queue, OpenAI API/Codex/Agents SDK docs, GitHub changelog/docs, VS Code agents docs, Obsidian changelog, Storybook releases, W3C WAI update, Threads 공개 검색 결과.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0` 유지. 새 저장은 프롬프트 간소화, agent 비용/세션, SDK loop/sandbox 안전, Vault 삭제/첨부, 접근성 평가 방법론처럼 실제 운영 규칙을 바꾸는 공식 신호로 제한했다.
- 제외: OpenAI Docs Skill, SDK, package, container, hosted shell, Codex plugin, Obsidian 설정, Bases 파일, GitHub/VS Code/Storybook tool, token, API key, billing API, account connection, cloud resource를 설치/활성화/실행하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 출처 URL, 확인 범위, 저장/중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 18 |
| stored.count | 5 |
| duplicate.count | 8 |
| deferred.count | 3 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI GPT-5.5 prompt guidance는 process-heavy prompt보다 outcome-first prompt, 성공 기준, 멈춤 조건, retrieval budget을 강조한다. 덱스 컴퍼니 자동화 프롬프트는 길이보다 검증 가능한 완료 조건이 중요하다.
2. OpenAI API container session 과금 변경은 agent runtime도 비용 단위와 최소 과금 단위를 명시해야 한다는 신호다. "더 싸졌다"가 아니라 실제 pricing/account 확인 전까지 `cost.checked=false`로 둬야 한다.
3. OpenAI Agents SDK의 `max_turns=None`와 sandbox symlink 안전장치는 excessive agency와 workspace escape 점검 항목을 동시에 강화한다.
4. Obsidian attachment cleanup은 Vault 삭제 작업에서 note 삭제와 attachment 삭제를 분리해야 한다는 실무 경고다.
5. W3C WAI Q3 workplan은 WCAG 2.2 체크리스트뿐 아니라 WCAG-EM/ARIA in HTML 변경 감시가 frontend/UX QA에 필요하다는 신호다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-api-gpt55-prompt-guidance.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-api-container-session-billing.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-agents-sdk-max-turns-sandbox-safety.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-obsidian-attachment-cleanup-bases-update.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-wai-q3-2026-accessibility-workplan.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/ai-research | OpenAI prompt guidance, API billing, Agents SDK safety notes added |
| sources/articles | Obsidian attachment cleanup and W3C WAI workplan notes added |
| index.md | Added links for the 5 source notes and this report |
| log.md | Appended Growth Scan entry |
| automation memory | Updated after verification with concise run summary |

## Evidence Table

| Candidate | Primary evidence | Classification | Confidence |
|---|---|---|---|
| OpenAI GPT-5.5 prompt guidance | OpenAI API docs | source-backed: outcome-first/stopping/verbosity guidance; Dex inference: template patch fields; not checked: live eval | high |
| OpenAI container session billing | OpenAI API changelog | source-backed: per-minute billing with 5-minute minimum; Dex inference: cost fields; not checked: account billing | high |
| OpenAI Agents SDK max_turns/sandbox | OpenAI Agents SDK docs + GitHub release | source-backed: max_turns option and symlink rejection; Dex inference: loop/sandbox audit fields; not checked: install/runtime | high |
| Obsidian attachment cleanup | Obsidian changelog | source-backed: delete prompt/settings and Bases improvements; Dex inference: deletion policy fields; not checked: local Obsidian version/settings | high |
| W3C WAI Q3 workplan | W3C WAI update | source-backed: planned WCAG-EM/ARIA in HTML work; Dex inference: QA tracking fields; not checked: final publication/legal duty | high |
| VS Code agents concepts | Microsoft VS Code docs | duplicate/no-new-signal | medium |
| Storybook 10.5 alpha | GitHub release | deferred/pre-release | medium |
| Threads snippets | search snippets | deferred/source-weak | low |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| OpenAI Docs Skill migration command | documentation-only candidate | No | Supply chain and prompt/template drift; requires project-specific diff and approval |
| OpenAI Agents SDK update | SDK/runtime candidate | No | Excessive agency with `max_turns=None`, supply chain, sandbox/workspace boundary |
| Obsidian Bases dashboard | documentation/process candidate | No | Could change Vault structure; requires explicit dashboard request |
| Storybook 10.5 alpha ai-review observability | pre-release candidate | No | Pre-release instability and package install risk |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: Codex DigitalOcean/remote, Codex model governance, GitHub Copilot billing/usage/model governance, Storybook 10.3/10.4, Vite 8.1, Obsidian CLI/Bases broad source, WCAG 2.2, OWASP LLM Top 10.
- deferred/pre-release: Storybook 10.5 alpha `ai-review observability` should be revisited only when stable or when a project uses Storybook review flows.
- deferred/source-weak: Threads snippets did not provide stable source-backed text.
- blocked: X is excluded by automation rule.

## Failure / Blocked / Not Checked

- No OpenAI API call, model migration, prompt eval, container session, billing API, SDK install, package install, Obsidian setting change, file deletion, or W3C draft diff was run.
- 에던님 계정/조직/플랜/지역/runtime availability는 확인하지 않았다.
- Storybook alpha release는 저장하지 않았다 because it is pre-release and install-adjacent.
- Threads는 discovery only로 처리했다.

## Cross Verification

- OpenAI prompt guidance was compared with existing Codex prompting/goals and Growth Scan improvement model notes.
- OpenAI billing changelog was compared with prior GitHub Copilot AI credit/billing governance notes.
- Agents SDK release was checked in both OpenAI-hosted SDK docs and GitHub release text.
- Obsidian changelog was compared with existing Obsidian CLI/Bases notes and Vault deletion safety rules.
- W3C WAI workplan was compared with existing WCAG 2.2, W3C laws/policies, and AI accessibility RQTF notes.

## Ethan Can Use This Immediately

- 자동화 프롬프트가 길어질 때는 "절차를 더 추가"하기보다 `Goal`, `Success criteria`, `Constraints`, `Stop condition`, `Not checked behavior`로 재정리하시면 됩니다.
- agent/SDK/runtime 자료를 볼 때는 `turn_limit=None` 같은 무제한 설정을 승인 전 기본값으로 두지 마시면 됩니다.
- Vault에서 노트 삭제를 요청하실 때는 첨부 파일도 같이 지울지 별도 결정하시면 됩니다.
- UI QA를 맡기실 때는 WCAG 2.2에 더해 `evaluation.method`와 `ARIA in HTML checked`를 요구하시면 됩니다.

## Improvement Delta

- Growth Scan template 후보가 `success.criteria`, `stop.condition`, `retrieval.budget`, `billing.unit`, `minimum.charge`, `turn_limit`, `sandbox.archive_policy`, `attachment.delete`, `evaluation.method`, `aria.html.checked`까지 확장됐다.
- 이전 실행의 memory/privacy/motion 중심 필드에 이번 실행의 prompt/cost/runtime/deletion/accessibility-method 필드를 덧붙였다.
- no-op discipline은 유지하되, 공식 변경 신호 5개만 저장하고 alpha/vendor/중복 자료는 저장하지 않았다.

## Adoption Check

- done: `eligible-next=0`, `not-checked=0` 상태를 유지하고 old broad queue를 재개하지 않았다.
- done: 직전 Next Eval의 memory/source-of-truth, career-ops, Figma/motion 필드 확장 방식을 이번 실행의 prompt/cost/runtime/deletion/accessibility-method 필드로 이어갔다.
- done: 설치 후보는 전부 candidate-only로 표시했고 실행하지 않았다.
- carried: live account/runtime availability는 실제 사용 요청 전까지 current로 말하지 않는다.
- carried: Threads는 계속 discovery-only이며 source-backed로 승격하지 않는다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done-with-limited-storage | 새 공식 운영 신호 5개만 저장, 8개 duplicate/no-new-signal |
| Runtime/account availability checks | carried | carried | local OpenAI/Obsidian/GitHub/VS Code/Storybook state not checked |
| Design/Figma/motion QA gate | carried | carried | 이번 실행은 W3C evaluation/ARIA workplan으로 QA anchor만 보강 |
| Old broad queue reopening | blocked-by-default | done | `eligible-next=0`, `not-checked=0` maintained |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; avoid reopening old broad queues unless a source changes a prior decision.
2. If prompt/model guidance appears, record `success.criteria`, `stop.condition`, `retrieval.budget`, `verbosity.setting`, `eval.before_after`, and `local_model.checked`.
3. If runtime/container/SDK items appear, record `billing.unit`, `minimum.charge`, `turn_limit`, `loop_stop_condition`, `sandbox.archive_policy`, `workspace.escape_check`, and `install.status`.
4. If Vault/Obsidian delete/import/dashboard items appear, record `note.delete`, `attachment.delete`, `cleanup.setting`, `base.file_created`, and `rollback.path`.
5. If accessibility/frontend QA items appear, record `WCAG.anchor`, `evaluation.method`, `aria.html.checked`, `user.barrier`, and `browser_qa.required`.
6. If no new official/high-provenance signal appears, write a short no-op report.

## Prompt or Template Patch Candidate

```text
For Growth Scan items involving prompt/model guidance, record: success.criteria, stop.condition, retrieval.budget, verbosity.setting, grounding.rule, eval.before_after, local_model.checked, and prompt.patch_scope. For runtime/container/SDK items, record: billing.unit, minimum.charge, budget.owner, turn_limit, loop_stop_condition, sandbox.archive_policy, workspace.escape_check, install.status, and rollback.path. For Vault/Obsidian operations, record: note.delete, attachment.delete, cleanup.setting, base.file_created, rollback.path, and local_version.checked. For accessibility/frontend QA, record: WCAG.anchor, evaluation.method, aria.html.checked, user.barrier, browser_qa.required, and legal.not_advice.
```

## Questions / Tracking Candidates

- 에던님 자동화 프롬프트를 다음에 정리할 때, 긴 절차형 지시를 `Goal / Success criteria / Constraints / Stop condition` 형태로 별도 템플릿화할지 결정하면 좋다.
- Storybook 10.5 alpha가 stable이 되면 `ai-review observability`를 component QA 증거 수집 기준으로 다시 볼 수 있다.
- Obsidian Bases로 Growth Scan source/report dashboard를 만들지는 아직 결정하지 않았다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 03:34, 03:02, 02:34, 02:01 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, VS Code, Obsidian, Storybook, W3C, Threads searched or checked |
| Duplicate check | passed | `rg` checked existing sources/index/log/reports/queue before writing |
| Previous deferred rejudgement | passed | no-op discipline, runtime availability, QA gate, old queue reopening rejudged |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed; source notes count is 138 |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, API call, billing action, SDK, MCP, plugin, Obsidian setting change, or deletion |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: public docs can be mistaken for local availability or permission to install/run tools.
- Mitigation: all items are documentation/source notes only; no runtime or account action was executed; status/lint/schema/UTF-8 checks passed.
- Not checked: live account availability, actual API/container billing, SDK runtime behavior, local Obsidian setting/version, final W3C publication status.
