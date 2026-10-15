---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Eligible Reduction - 2026-07-03 19:34 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T19:34:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
claimType: historical
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - automation
---

# Dex Company Growth Scan Eligible Reduction - 2026-07-03 19:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 19:34 KST
- 검색 범위: OpenAI Codex 공식 문서, MCP Apps 공식 TypeDoc, GitHub Copilot 공식 문서, Microsoft Agent Framework 공식 문서, GitLab frontend accessibility 문서, 최근 queue 및 직전 2개 보고서.
- 이번 실행의 초점: 19:21 실행의 `eligible-next` 후보를 최소 10개 줄이는 것.
- 제외: X는 제외했다. Threads는 이번 실행에서 별도 확인하지 않았다. 실행 코드, MCP server, skill, plugin, package는 설치하지 않았다.
- 저작권 처리: 원문 전체 복사 없이 URL, 메타데이터, 요약, 확인 범위만 보존했다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 25 |
| stored.count | 12 |
| duplicate.count | 4 |
| deferred.count | 9 |
| blocked.count | 0 |
| lint.warning_count | 0 |

## Today's Core Findings

1. Codex prompting, skills, reusable skills, Agents SDK guide는 덱스 컴퍼니 자동화가 "긴 prompt"보다 검증 가능한 workflow와 skill 승격 루프로 진화해야 한다는 공식 근거를 제공한다.
2. MCP Apps는 권한, CSP, stable origin, app resource registration이 한 세트이므로 단순한 MCP server 설치 후보로 다루면 안 된다.
3. GitHub Copilot 문서는 MCP와 custom agent에서 tool allowlist를 좁게 잡아야 한다는 실무 근거를 제공한다.
4. Microsoft Agent Framework는 agent와 workflow를 구분한다. 덱스 컴퍼니 Growth Scan은 open-ended agent보다 단계가 명확한 workflow로 관리하는 편이 맞다.
5. GitLab Storybook accessibility tests는 WCAG 2.2 일부를 자동 점검하는 실무 QA 근거로 쓸 수 있지만, 자동 axe 결과만으로 전체 접근성 준수라고 말하면 안 된다.

## Stored / Absorbed Sources

- `2026-07-03-openai-codex-prompting.md`
- `2026-07-03-openai-codex-agent-skills.md`
- `2026-07-03-openai-codex-agents-sdk-mcp-workflows.md`
- `2026-07-03-openai-codex-reusable-skills-workflow.md`
- `2026-07-03-mcp-apps-resource-permissions-api.md`
- `2026-07-03-mcp-apps-resource-meta-api.md`
- `2026-07-03-mcp-apps-register-app-resource.md`
- `2026-07-03-github-copilot-repository-mcp-config.md`
- `2026-07-03-github-copilot-custom-agents-configuration.md`
- `2026-07-03-github-copilot-agent-skills-install-risk.md`
- `2026-07-03-microsoft-agent-framework-overview.md`
- `2026-07-03-gitlab-storybook-accessibility-tests.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | Added 12 source notes |
| Inbox queue | Reclassified 12 `eligible-next` items to `stored-source` |
| Index | Added 12 source links and this report link |
| Log | Added 19:34 scheduled growth scan entry |
| Automation memory | Updated after final QA |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| OpenAI Codex Agents SDK MCP workflow | conditional | No | Needs local CLI, Python/Node, API key handling, sandbox/approval policy, cost and trace storage plan. |
| MCP Apps resource helpers | conditional | No | Need project-specific package audit, CSP, permission, origin, auth, rollback plan. |
| GitHub Copilot agent skills | conditional | No | Official docs warn skills may include prompt injection, hidden instructions, or malicious scripts. Preview and pinning are required. |
| Microsoft Agent Framework | deferred | No | Useful comparison source, but install requires dependency, cost, data boundary, and third-party risk review. |

## Duplicate / Rejected / Deferred

- duplicate: Codex changelog 0.142.5, existing Codex MCP note, existing Storybook Vitest addon note, existing WCAG 2.2 note.
- deferred: NN/g Accelerating Research with AI, Microsoft local/hosted MCP tools, GitHub MCP tutorial, Carbon accessibility, GOV.UK accessibility, Material/Atlassian/Carbon tokens, Maze 2026 report, vendor comparison sources.
- rejected: none permanently. Vendor comparison sources remain discovery-only until bias/provenance review.

## Failure / Blocked / Not Checked

- Threads was not checked in this run.
- MCP Apps e2e runtime and Codex Desktop host compatibility were not tested.
- No package, MCP server, skill, plugin, or framework was installed.
- Microsoft Agent Framework page showed an authorization notice in the fetched content, so confidence is medium and install decision remains deferred.
- GitLab accessibility note maps to WCAG-related practice, but actual WCAG 2.2 compliance must still be manually verified per project.
- `llm-wiki-status.ps1` and `llm-wiki-lint.ps1` were not found by filesystem search under `D:\VibeProject`, `D:\CodexProjects\codex setup`, or `D:\Program Files\Codex`; fallback schema lint was used instead.

## Cross Verification

- OpenAI Codex sources were cross-checked across prompting, skills, reusable skills, Agents SDK MCP guide, existing best practices, existing automations, existing MCP, and existing subagents notes.
- MCP Apps sources were cross-checked across permissions API, resource metadata API, registerAppResource helper, existing overview, existing CSP/CORS, and existing install audit.
- GitHub sources were cross-checked across repository MCP configuration, custom agent configuration, agent skills install warning, and existing GitHub Copilot MCP docs.
- Microsoft Agent Framework was cross-checked with Microsoft Learn search snippets and Semantic Kernel Agent Framework docs.
- GitLab accessibility source was cross-checked with existing Storybook accessibility, Storybook Vitest addon, and WCAG 2.2 source notes.

## Ethan Can Use This Immediately

- MCP Apps를 검토할 때는 "MCP server가 돌아가나?"보다 먼저 "권한, CSP, origin, resource registration이 설명되는가?"를 보시면 됩니다.
- 덱스 자동화 prompt가 길어질 때는 OpenAI reusable skills 기준에 맞춰 source material, 좋은 출력 예시, 검증 명령을 모아 skill 승격 후보로 보시면 됩니다.
- 프론트엔드 QA는 screenshot 성공만 보지 말고 Storybook/axe/Playwright 또는 수동 대체 검사로 focus, disabled, error, accessibility severity를 남기면 됩니다.

## Improvement Delta

- 직전 19:21 실행의 다음 eval인 `eligible-next` 10개 이상 감소를 충족했다. 이번 실행에서 12개를 source note로 승격했다.
- 설치 후보를 실행하지 않고, OWASP 관점의 supply chain, excessive agency, sensitive information disclosure, prompt injection, insecure plugin design 리스크를 후보별로 분리했다.
- prompt 비대화 문제에 대해 "자동화 prompt 계속 확장"보다 "검증된 반복 workflow를 skill화"하는 공식 근거가 추가됐다.
- frontend/UX 자료는 GitLab Storybook accessibility tests를 통해 WCAG 2.2 일부 자동 점검과 수동 확인의 경계를 명확히 했다.

## Adoption Check

- done: 95개 queue 중 `eligible-next`를 최소 10개 줄이라는 직전 action item을 12개 source note 승격으로 처리했다.
- done: vendor comparison은 bias/provenance note 없이 승격하지 않았다.
- done: installable 후보는 설치하지 않고 conditional/deferred로 남겼다.
- carried: MCP Apps SDK-only install은 구체 프로젝트, host/client, permission, CSP/CORS, auth, rollback, 에던 승인 없이는 진행하지 않는다.
- carried: NN/g Accelerating Research with AI는 유용하지만 이번 12개 cap 때문에 다음 UX research pass 후보로 남겼다.

## Previous Deferred / Carried Rejudgement

- item: `eligible-next` 최소 10개 source/reject 처리
- result: done
- evidence: 12개 source note 추가 및 queue status 변경
- item: vendor comparison bias/provenance 확인
- result: carried
- reason: 이번 실행에서는 공식 문서 중심으로 승격했고 vendor 비교 자료는 승격하지 않았다.

## Next Eval

다음 실행은 아래 기준을 통과해야 한다.

1. 새 source note를 만들기 전에 이번 12개와 직전 10개가 중복되지 않는지 먼저 확인한다.
2. UX research lane에서 NN/g 또는 Maze 후보 중 최소 1개를 source-backed, bias note, not checked로 재판정한다.
3. queue의 남은 `eligible-next` 수를 count하거나, count가 어렵다면 partial로 표시하고 이유를 남긴다.
4. installable 후보가 나오면 `pass / conditional / blocked / not checked` 중 하나로 분류하고 설치는 하지 않는다.

## Prompt or Template Patch Candidate

```text
For every 30-minute Growth Scan, first reduce or rejudge prior eligible-next items before adding more broad candidates. Prefer official/high-provenance sources. If a run stores no new source notes, report no-new-signal rather than forcing low-value notes.

When a source suggests reusable workflow improvement, classify it as prompt patch, template patch, skill candidate, or no-op. Skill candidates must include source material, good output example, validation command, and an install/no-install decision.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Recent reports checked | passed | 19:14 and 19:21 reports inspected |
| Queue reclassification | passed | 12 item status changes applied; remaining `eligible-next.count=47` |
| Source schema | passed | fallback frontmatter lint checked 12 source notes; warning_count=0 |
| Status script | not checked | `llm-wiki-status.ps1` not found in searched local roots |
| Lint script | not checked | `llm-wiki-lint.ps1` not found in searched local roots |
| UTF-8 scan | passed | New/modified Korean Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install commands run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: official lint/status scripts were not present in the searched roots, so only fallback schema lint was available.
- Mitigation: fallback frontmatter/Original Content/UTF-8 checks passed with 0 warnings.
- Not checked: Threads, runtime installs, MCP Apps host compatibility, official llm-wiki status/lint scripts.
