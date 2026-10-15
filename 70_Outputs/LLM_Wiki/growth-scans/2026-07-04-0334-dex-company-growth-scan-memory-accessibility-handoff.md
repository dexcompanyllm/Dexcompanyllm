---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Memory Accessibility Handoff - 2026-07-04 03:34 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T03:34:58+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/memories/chronicle"
  - "https://developers.openai.com/codex/memories"
  - "https://github.com/santifer/career-ops/blob/main/AGENTS.md"
  - "https://www.w3.org/WAI/about/groups/task-forces/research-questions/minutes/topics/"
  - "https://www.w3.org/WAI/planning/statements/generator/"
  - "https://www.figma.com/blog/config-2026-recap/"
collectionPurpose: "Dex Company의 memory 경계, career-ops 데이터 계층, AI accessibility QA, Figma motion/frontend handoff 기준을 최신 공개 자료로 갱신한다."
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

# Dex Company Growth Scan Memory Accessibility Handoff - 2026-07-04 03:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 03:34 KST
- 검색 범위: automation memory, 현재 작업 폴더, Vault AGENTS/role docs/LLM Wiki guide/index/log/improvement model, 최근 03:02/02:34/02:01 보고서, 10x candidate queue, OpenAI Codex memory/Chronicle/changelog, GitHub career-ops docs, W3C WAI AI/accessibility resources, Figma Config 2026, Obsidian changelog, Storybook 10.3/10.4, Threads snippets.
- 실행 초점: 직전 Next Eval의 Windows/Codex runtime field를 memory/privacy field로 확장하고, design/UX 항목은 WCAG anchor와 motion handoff 기준으로 보강했다.
- 제외: Chronicle, Codex memory feature, career-ops repo, Figma agent/plugin/MCP, Storybook MCP, Obsidian installer, browser extension, API key, token, account connection, cloud resource를 설치/활성화/연결/실행하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 출처 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 17 |
| stored.count | 4 |
| duplicate.count | 7 |
| deferred.count | 4 |
| blocked.count | 2 |
| lint.warning_count | 0 |

## Today's Core Findings

1. OpenAI Chronicle은 화면 캡처 기반 memory 기능이라 Dex Company에서 Obsidian/AGENTS.md를 대체하면 안 된다. memory는 보조 recall layer이고, 반드시 적용되어야 하는 규칙은 Vault 문서에 둬야 한다.
2. career-ops 문서는 Codex slash command가 없을 수 있음을 전제로 자연어 모드 호출과 `codex exec`를 안내한다. Ethan job-search 자동화에는 외부 설치보다 사용자 데이터 계층과 시스템 계층 분리 원칙이 더 즉시 유용하다.
3. W3C RQTF는 AI/accessibility를 반복 연구 의제로 다루고 있다. AI가 만든 UI를 평가할 때는 WCAG 2.2 체크와 함께 `user.barrier`, `statement.owner`, `feedback.channel`, `AI.risk`를 남겨야 한다.
4. Figma Config 2026은 motion, code layers, Dev Mode, MCP-compatible handoff를 강조한다. 디자인 handoff가 agent-friendly해져도 최종 검증은 브라우저 QA, reduced motion, focus/keyboard, timing/easing evidence로 분리해야 한다.
5. Storybook 10.3/10.4, Obsidian CLI, Codex changelog, GitHub Copilot billing/model governance는 이미 최근 source notes가 커버해 새 note를 만들지 않았다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-openai-codex-chronicle-memory-privacy.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-04-career-ops-codex-invocation-data-contract.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-w3c-ai-accessibility-rqtf-statement-gate.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-figma-config-2026-motion-agent-handoff.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 4 source notes for Codex Chronicle, career-ops Codex/data contract, W3C AI accessibility, and Figma Config 2026 motion handoff |
| Index | Added 4 source links and this report link |
| Log | Added this 03:34 scheduled growth scan entry |
| Inbox queue | Preserved old 10x queue at `eligible-next=0`, `not-checked=0`; no broad MCP Apps reopening |
| Installs | No install, feature enablement, account connection, Figma action, Codex memory toggle, plugin, MCP server, CLI update, token, API key, or workflow action |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| OpenAI Codex Chronicle | official docs | source-backed: opt-in preview, screen capture privacy warning, memory file boundary; Dex inference: Obsidian/AGENTS.md remains source of truth; not checked: local account/OS availability | medium |
| career-ops Codex invocation/data contract | GitHub repo docs | source-backed: Codex invocation guidance and user/system data split; Dex inference: absorb patterns only, no install; not checked: scripts/license/runtime | medium |
| W3C AI accessibility RQTF + statement generator | W3C resources | source-backed: repeated AI/accessibility research topics and statement generator fields; Dex inference: QA template fields; not checked: individual minutes/legal obligations | medium |
| Figma Config 2026 motion handoff | official product blog | source-backed: Motion/code layers/Dev Mode/MCP-compatible handoff; Dex inference: motion QA fields; not checked: account feature availability/runtime fidelity | medium |
| Storybook 10.3 MCP/a11y | official blog | duplicate/no-new-signal | existing Storybook 10.4/9/Vitest/GitLab accessibility notes already cover agent-readable component QA |
| Obsidian changelog/CLI | official changelog | duplicate-source | existing Obsidian 1.13/CLI source covers current operational need |
| Codex changelog 0.142.5 | official changelog | duplicate-source | existing 03:02 Windows/trace note covers sensitive trace fix |
| W3C WCAG/laws index | official W3C | duplicate-source | existing WCAG 2.2 and laws/policies notes cover standards/legal separation |
| Threads snippets | public SNS snippets | deferred/source-weak | searched as discovery, not promoted due weak stable source text |
| X | excluded channel | blocked | automation rule excludes X |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| OpenAI Chronicle | feature candidate only | No | Screen capture and unencrypted Markdown memory risk; macOS/Pro/account availability not checked; requires consent/pause/delete rules. |
| career-ops repo update/adoption | due-diligence candidate | No | Contains scripts and job portal automation; requires supply-chain, privacy, portal ToS, Ethan baseline regression audit. |
| Figma Motion/agent/MCP handoff | account-adjacent candidate | No | Requires Figma account/plan/file permissions, design-system ownership, browser QA, WCAG-linked validation. |
| Storybook MCP for React | duplicate due-diligence candidate | No | Existing notes already treat Storybook agent test tooling as project-specific, not default install. |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: Storybook 10.3/10.4, Obsidian CLI/changelog, Codex changelog trace fix, W3C WCAG/laws, Figma agent skills collaboration, GitHub Copilot billing/model governance.
- deferred: Threads snippets, full career-ops repo script/license audit, Chronicle live availability, Figma Config feature live availability.
- blocked: X excluded by automation rule; account-gated Chronicle/Figma/Copilot availability not checked.

## Failure / Blocked / Not Checked

- Chronicle live state, Codex memory setting, actual memory file path, Windows support, account plan, rate-limit impact, and delete workflow were not checked.
- career-ops was not cloned, installed, updated, or executed. No job portal automation, ATS action, email action, or PDF generation was run.
- Figma agent/Motion/code layers/Dev Mode/MCP handoff were not opened in a live Figma account.
- W3C AI/accessibility topic index was checked as research agenda evidence, not as a completed standard or legal requirement.

## Cross Verification Evidence

- Chronicle was cross-checked against OpenAI Codex memories docs and Dex Company's AGENTS.md rule that required team guidance belongs in checked-in docs.
- career-ops was cross-checked against the existing `2026-07-03-career-ops-v1160` source note and Dex Company `/구직자` conservative submission-prep rule.
- W3C AI accessibility RQTF was cross-checked against existing WCAG 2.2, W3C laws/policies, GitLab/Storybook accessibility testing, and WAI barrier resources.
- Figma Config 2026 was cross-checked against existing Figma design-agent/design-system notes and Storybook frontend QA notes.

## Ethan Can Use This Immediately

- Codex memory나 Chronicle을 켜자는 제안이 나오면 먼저 `screen_capture.scope`, `sensitive_view.pause_rule`, `consent.required`, `memory.file_path`, `delete.path`, `AGENTS.source_of_truth`를 확인하시면 됩니다.
- 구직 자동화는 외부 repo 설치보다 사용자 데이터와 시스템 템플릿을 분리하는 것이 우선입니다. Ethan baseline 자료와 생성 문서는 사용자 데이터, 공통 평가식/스크립트는 시스템 계층으로 나누면 됩니다.
- AI가 만든 화면이나 Figma handoff는 "멋있다"가 아니라 `motion.spec`, `reduced_motion.behavior`, `keyboard.path`, `focus.visible`, `user.barrier`, `WCAG.anchor`가 있는지 보시면 됩니다.

## Improvement Delta

- Growth Scan template 후보에 `memory.source_of_truth`, `screen_capture.scope`, `consent.required`, `delete.path`, `user_data.layer`, `system_data.layer`, `motion.spec`, `reduced_motion.behavior`, `statement.owner`, `user.barrier` 필드를 추가할 근거가 생겼다.
- Dex Company memory 운영 규칙을 "memory는 보조, AGENTS/Obsidian은 durable rule"로 더 명확히 분리했다.
- Career ops lane은 설치 후보 확장이 아니라 Ethan baseline 보호와 데이터 계층 분리 기준으로 재정렬했다.
- Frontend/design lane은 Figma/agent handoff 신호를 WCAG-linked runtime QA로 연결했다.

## Adoption Check

- done: `eligible-next=0`, `not-checked=0` 상태를 유지하고 old 10x queue를 재개하지 않았다.
- done: 직전 Next Eval의 Windows/Codex runtime field를 memory/privacy field까지 확장했다.
- done: UX/design item에 WCAG anchor, motion/reduced-motion QA, user barrier evidence를 연결했다.
- carried: live account/runtime availability는 실제 사용 요청 전까지 current로 말하지 않는다.
- carried: no-op discipline은 유지했지만, 이번 실행은 새 공식/고품질 신호 4개가 있어 source note를 저장했다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Runtime/account availability checks | carried | carried | Chronicle/Figma/Codex memory live account state not checked |
| UX/design QA gate | carried | done | Figma motion handoff and W3C AI accessibility notes add QA fields |
| Short no-op if no signal | carried | done-with-storage | 4 new high-provenance signals stored; 7 duplicates excluded |
| Old broad queue reopening | blocked-by-default | done | `eligible-next=0`, `not-checked=0` maintained |

## Next Eval

1. Keep `eligible-next=0` and `not-checked=0`; do not reopen old broad queues unless a source changes a prior decision.
2. If memory/Chronicle/source-of-truth items appear, record `memory.source_of_truth`, `screen_capture.scope`, `consent.required`, `sensitive_view.pause_rule`, `memory.file_path`, `delete.path`, and `local_availability.checked`.
3. If career-ops or job-search tooling appears, record `user_data.layer`, `system_data.layer`, `submission.mode`, `portal.tos_risk`, `personal_data.path`, `rollback.path`, and `install.status`.
4. If design/Figma/motion handoff appears, record `motion.spec`, `reduced_motion.behavior`, `devmode.inspectable`, `MCP.handoff_surface`, `WCAG.anchor`, and `browser_qa.required`.
5. If no new official/high-provenance signal appears, write a short no-op report.

## Prompt or Template Patch Candidate

```text
For Growth Scan items involving memory, Chronicle, screen context, or source-of-truth behavior, record: memory.source_of_truth, durable_rule.location, screen_capture.scope, consent.required, sensitive_view.pause_rule, memory.file_path, delete.path, encryption.status, local_availability.checked, and install.status. For career-ops/job-search tools, record: user_data.layer, system_data.layer, submission.mode, portal.tos_risk, personal_data.path, update.path, rollback.path, and Ethan_baseline.regression_checked. For Figma/design/motion handoff, record: motion.spec, reduced_motion.behavior, devmode.inspectable, MCP.handoff_surface, WCAG.anchor, browser_qa.required, and human_review.owner.
```

## Questions / Tracking Candidates

- 에던님이 Codex memory/Chronicle을 실제로 쓰고 싶어 하시면, 기능 사용 가능 여부보다 먼저 "화면 캡처가 어떤 정보를 볼 수 있는가"와 삭제/일시 중지 규칙을 정해야 한다.
- Ethan job-search 자동화에서 외부 career-ops 아이디어를 더 가져오려면 설치 전 repo script/license/privacy/portal ToS audit와 Ethan baseline 회귀 테스트가 필요하다.
- Figma Motion이나 code layers를 실제 프로젝트에 쓰게 되면 브라우저 구현 결과와 reduced-motion 동작을 `QA_REPORT.md`에 증거로 남겨야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 03:02, 02:34, 02:01 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub/career-ops, W3C, Figma, Obsidian, Storybook, Threads searched or checked |
| Duplicate check | passed | `rg` checked existing sources/index/log/reports/queue before writing |
| Previous deferred rejudgement | passed | runtime availability, UX/design QA gate, no-op discipline, broad queue reopening rejudged |
| Source schema | passed | fallback source/report schema check returned 0 missing required fields |
| Status script | passed | `obsidian-codex-setup\llm-wiki-status.ps1` completed |
| Lint script | passed | `obsidian-codex-setup\llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | new/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, feature enablement, account connection, token, API key, plugin, MCP, or workflow action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Chronicle/Figma/career-ops public docs can be mistaken for local availability or approval to enable tooling.
- Mitigation: all items are documentation/source notes only; no runtime, account, plugin, MCP, memory toggle, or job portal action was run.
- Not checked: local/account availability, Chronicle Windows support, Figma plan/file features, career-ops scripts/license, legal/accessibility obligations.

