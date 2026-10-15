---
type: llm-wiki-report
status: final
confidence: medium
claimType: mixed
evidenceScope: source-backed-with-dex-inference
verificationStatus: partial
disputed: false
sourceKind: growth-scan-report
source:
  - "https://owasp.org/www-project-agentic-skills-top-10/"
  - "https://owasp.org/www-project-agentic-skills-top-10/proposal.html"
  - "https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/"
  - "https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/"
  - "https://developer.chrome.com/blog/new-in-web-ui-io26"
  - "https://developer.chrome.com/blog/chrome-151-beta"
  - "https://github.blog/changelog/label/copilot/"
  - "https://docs.github.com/en/code-security/concepts/about-code-quality"
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/apps-sdk/changelog"
  - "https://obsidian.md/changelog/"
collectionPurpose: "Dex Company Growth Scan 2026-07-05 07:27 KST 결과와 agentic skill install-audit 보강 기록"
dateCreated: 2026-07-05
dateModified: 2026-07-05
created: 2026-07-05
updated: 2026-07-05
verifiedAt: 2026-07-05
verifiedBy: Dex
tags:
  - llm-wiki/report
  - growth-scan
  - security
  - install-audit
  - ai-agents
---

# Dex Company Growth Scan - Agentic Skill Install Audit

## Original Content

이 보고서는 2026-07-05 07:27 KST 실행 결과입니다. 원문 전체를 복사하지 않고, 공개 URL, 확인 범위, 중복/보류 판단, Dex Company 적용 기준, QA 결과만 남깁니다. 이번 실행은 덱스가 스스로 학습했다는 의미가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수입니다.

## Run Scope and Limits

- 실행 시각: 2026-07-05 07:27 KST
- 임시 집중 모드: 미적용. 지정 종료 시각인 2026-07-05 00:00:00 KST 이후 실행입니다.
- 검색 범위: automation memory, current folder, Vault AGENTS/role docs/LLM Wiki guide/index/log/improvement model, 최근 21:34/21:03/20:33 보고서, 10x candidate queue, OpenAI Codex/Apps SDK changelog, GitHub Copilot changelog/docs, GitHub Code Quality docs, Obsidian changelog, W3C/NN.g/Figma/Chrome frontend sources, OWASP Agentic Skills/Agentic Applications/GenAI exploit roundup, career-ops/job-search public signals, local duplicate search.
- 한계: 실제 package, SDK, MCP server, browser extension, GitHub workflow, connector, scanner, OWASP PDF/PPTX, Chrome beta runtime, GitHub billing/API endpoint, Obsidian app, frontend repo, Storybook, Playwright, screen reader는 실행하지 않았습니다.

## Metrics

| Field | Value | Basis |
|---|---:|---|
| searched.count | 22 | public search/query lanes 16 + local duplicate/status lanes 6 |
| stored.count | 1 | OWASP Agentic Skills Top 10 source note |
| duplicate.count | 8 | OpenAI Codex changelog, Apps SDK changelog, GitHub Copilot July signals, Obsidian changelog, Figma skills/agent, career-ops, NN/g critique, GitHub browser/metrics governance |
| deferred.count | 4 | Chrome Web UI implementation, Chrome 151 beta runtime, GitHub Code Quality enablement/billing, actual artifact/tool QA |
| blocked.count | 1 | X excluded by rule; executable installs blocked without approval packet |
| lint.warning_count | 0 | final lint result |

Candidate queue remains: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`, `stored-source=43`, `audit-done=8`, `duplicate-source=28`, `duplicate-in-queue=9`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `total_candidates=95`.

## Today's Key Findings

1. 임시 design/PPT/frontend 집중 모드는 종료되었습니다. 이번 실행부터 원래 관심 키워드 전체를 균형 스캔했습니다.
2. OWASP Agentic Skills Top 10은 외부 skill을 "도구 목록"이 아니라 행동/워크플로우 실행 계층으로 봐야 한다는 신호를 줍니다.
3. 기존 Dex Company approval packet은 충분히 보수적이지만, skill-specific field가 부족했습니다. 이번 실행에서 file permission, network egress, shell access, identity-file write access, provenance, content hash/signature, scan status, update drift, audit log를 추가했습니다.
4. Chrome Web UI / Chrome 151 beta는 frontend 구현 후보로 유용하지만, 이미 carousel/slideshow/large UI/form/table QA 기준이 있어 이번에는 새 source note로 올리지 않았습니다.
5. GitHub Code Quality는 2026-07-20 GA와 billing 변화가 있어 유용한 후보지만, GitHub Team/Enterprise repo와 비용/Actions minutes context가 없어서 `approval-not-ready`로 보류했습니다.

## Evidence Table

| Candidate | URL | Type | Classification | Evidence quality | Dex Company use |
|---|---|---|---|---|---|
| OWASP Agentic Skills Top 10 | https://owasp.org/www-project-agentic-skills-top-10/ | OWASP project | stored-source | medium | skill install audit fields |
| OWASP AST10 proposal | https://owasp.org/www-project-agentic-skills-top-10/proposal.html | OWASP project page | cross-check | medium | active development/proposal caveat |
| OWASP Agentic Applications 2026 | https://genai.owasp.org/resource/owasp-top-10-for-agentic-applications-for-2026/ | security framework | cross-check | medium-high | agentic risk taxonomy |
| OWASP GenAI Q1 2026 exploit roundup | https://genai.owasp.org/2026/04/14/owasp-genai-exploit-round-up-report-q1-2026/ | incident roundup | cross-check | medium | supply-chain and unexpected execution examples |
| GitHub Code Quality | https://docs.github.com/en/code-security/concepts/about-code-quality | official docs | deferred | medium-high | repo-specific quality gate candidate |
| Chrome Web UI I/O 2026 | https://developer.chrome.com/blog/new-in-web-ui-io26 | official browser blog | deferred | medium | frontend implementation candidate, not QA proof |
| Chrome 151 beta | https://developer.chrome.com/blog/chrome-151-beta | official beta notes | deferred | medium | browser-support watch item |
| GitHub Copilot changelog | https://github.blog/changelog/label/copilot/ | official changelog | duplicate | high | existing governance notes cover July signals |
| OpenAI Codex changelog | https://developers.openai.com/codex/changelog | official changelog | duplicate | high | existing Codex runtime/governance notes |
| OpenAI Apps SDK changelog | https://developers.openai.com/apps-sdk/changelog | official changelog | duplicate | high | existing Apps/MCP coverage |
| Obsidian changelog | https://obsidian.md/changelog/ | official changelog | duplicate | high | existing Obsidian CLI/Bases/changelog coverage |
| career-ops repo signals | https://github.com/santifer/career-ops | GitHub repo | duplicate/candidate-only | medium | existing career-ops data contract note covers it |

## Stored / Absorbed Sources

- New source note: `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-05-owasp-agentic-skills-top10-install-audit.md`
- Updated wiki guide: `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Approval-Ready Install Audit Model.md`
- Updated index: `30_Knowledge/LLM_Wiki/index.md`
- Updated log: `30_Knowledge/LLM_Wiki/log.md`
- New report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-05-0727-dex-company-growth-scan-agentic-skill-audit.md`

## LLM Wiki Inbox / Source / Wiki Changes

- Inbox queue: 변경 없음. 기존 95개 queue는 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지합니다.
- Source: OWASP Agentic Skills install-audit source note 1개를 추가했습니다.
- Wiki: Approval-ready install audit guide에 skill-specific packet fields와 hard rules를 추가했습니다.
- Reports: 이번 growth scan report를 추가했습니다.

## Approval Decisions

| Item | Decision | Installation status | OWASP LLM / Agentic risk notes |
|---|---|---|---|
| OWASP Agentic Skills Top 10 | knowledge-only | no install | useful framework; not treated as final standard |
| OWASP PDF/PPTX/scanner/tools | not checked | no download/run | file/tool execution not needed for this run |
| Chrome Web UI / Chrome 151 | deferred | no browser/runtime adoption | implementation may affect accessibility, browser support, reduced motion |
| GitHub Code Quality | approval-not-ready | no repo/account/API enabled | billing, Actions minutes, Team/Enterprise, repo scope, ruleset impact |
| career-ops/job-search repos | duplicate/candidate-only | no clone/install | personal data, portal ToS, auto-submit risk, scripts |

## Duplicate / Excluded

- duplicate-source: OpenAI Codex changelog, Apps SDK changelog, Obsidian changelog, GitHub Copilot July governance/billing/model/browser signals, Figma skills/agent posts, career-ops data contract.
- duplicate-adjacent: NN/g AI-era critique and Figma skill collaboration already support "criteria over vibe" and human review rules.
- deferred: Chrome Web UI and Chrome 151 beta remain implementation watch items, not new operating rule sources this run.
- blocked: X is excluded by automation rule. Threads was not needed because stronger official sources existed.

## Failure / Blocked / Not Checked

- OWASP AST10 linked PDF/PPTX, GitHub repository, scanner, linked third-party incident reports, and CVE details were not independently verified.
- GitHub Code Quality was not enabled and no GitHub repo, billing, Actions minutes, ruleset, or API response was checked.
- Chrome beta features were not run in a browser and no frontend artifact was tested.
- No package, SDK, MCP server, connector, browser extension, GitHub workflow, Figma/Canva/GitHub app, Obsidian setting, token, API key, cloud resource, or billing action was installed, enabled, connected, created, or run.

## Cross-Verification

- OWASP Agentic Skills Top 10 was cross-checked against OWASP Agentic Applications 2026 and OWASP GenAI Q1 exploit roundup for agentic supply-chain, privilege, tool misuse, and unexpected execution risk categories.
- Local source notes for GitHub agent skill install risk, MCP Apps audits, and the existing Approval-Ready Install Audit Model already support the no-auto-install rule.
- GitHub Code Quality was checked against official docs and classified as repo/account/billing-specific rather than a general Dex Company default.
- Chrome Web UI was compared with the recent PPT/frontend checklist additions; it does not change an artifact QA field yet.

## 에던님이 바로 쓰실 수 있는 예시

- 외부 skill 설치 후보가 나오면 "README 좋다"로 끝내지 않고 `file_read`, `file_write`, `identity_file_write`, `network_allowlist`, `shell_access`, `content_hash`, `version_pin`, `scan_status`, `rollback`, `validation_command`를 표로 받으시면 됩니다.
- Figma/Storybook/MCP/GitHub connector 후보가 나오면 먼저 `approval-not-ready`로 두고, 정확한 project/account/workspace와 permission scope가 채워질 때만 조건부 승인으로 올리시면 됩니다.
- PPT/frontend 작업에서는 이번 source가 직접 WCAG QA 필드를 추가하지 않았습니다. 대신 도구 설치나 agent skill 도입을 요청받을 때, 산출물 QA와 도구 권한 감사를 분리하는 기준으로 쓰시면 됩니다.

## Improvement Delta

- `Dex Company Approval-Ready Install Audit Model`이 OWASP AST10 기반 skill-specific fields를 갖게 되었습니다.
- 새 approval packet fields: `skill.permissions.files`, `skill.permissions.network`, `skill.shell`, `identity_file.write_access`, `publisher.identity`, `version.pin`, `content_hash`, `signature_or_provenance`, `scan_status`, `risk_tier`, `update.policy`, `sandbox.required`, `audit_log.plan`.
- "scanner pass만으로 승인하지 않는다"는 rule을 명시했습니다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.
- done: source note는 운영 규칙을 바꾸는 경우에만 추가한다는 기준 적용.
- done: 임시 집중 모드 종료 후 원래 관심 키워드 전체로 균형 스캔 전환.
- carried: 실제 PPT/frontend artifact QA는 concrete artifact/repo가 있을 때 수행.
- carried: Storybook runtime/MCP, Figma connector, GitHub Code Quality enablement는 project/account/billing context가 있을 때 재평가.

## Previous Deferred / Carried Rejudgement

| Item | Previous state | This run | Reason |
|---|---|---|---|
| Future real PPT/frontend artifact QA | carried | carried | No concrete artifact or repo was available. |
| Storybook runtime/MCP | carried/project-specific | carried | No concrete repo, package diff, CI runtime, browser QA, auth scope, or rollback path. |
| Figma Motion/Agent/MCP connector | carried/account-adjacent | carried | No approved workspace/file/export/billing context. |
| Chrome Web UI carousel/scroll animation | deferred | carried | Useful implementation watch item, but no new QA field beyond existing checklist. |
| Add source only if operating rule changes | carried | done | OWASP AST10 changed install audit fields. |

## Next Eval

Next run passes if it:

1. Keeps `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`, or explicitly explains any change.
2. Adds a source note only if it changes a concrete operating rule, approval field, QA field, or artifact acceptance test.
3. If revisiting OWASP AST10, verify the linked GitHub repository/PDF/PPTX or one named incident source before increasing confidence beyond `medium`.
4. If GitHub Code Quality is revisited, check target repo/account/billing/Actions minutes/ruleset impact before any approval request.

## Prompt or Template Patch Candidate

```text
For external skill, connector, MCP server, browser extension, GitHub workflow, or agent package candidates, do not request Ethan approval until the packet includes: target project/account, exact version, publisher identity, file read/write paths, identity-file write access, shell access, network allowlist, external upload/webhook behavior, content hash or signed release, scan status, update policy, OWASP LLM and Agentic Skills risk labels, rollback plan, validation command, and safer no-install alternative. Scanner pass alone is not sufficient.
```

## Questions / Tracking Candidates

- 다음 설치 후보가 나오면 기존 approval packet을 AST10 fields로 채울 수 있는지 확인합니다.
- GitHub Code Quality는 실제 GitHub Team/Enterprise repo와 billing context가 있을 때만 다시 엽니다.
- Chrome Web UI는 실제 frontend project에서 view transition, scroll animation, reduced motion, browser support target이 필요할 때 다시 평가합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| current folder checked | passed | `D:\CodexProjects\codex setup` |
| automation memory read | passed | `dex-company-growth-scan/memory.md` read first |
| operating docs read | passed | AGENTS, role docs, LLM Wiki guide/schema, index/log, improvement model |
| recent reports checked | passed | 21:34, 21:03, 20:33 reports |
| queue checked | passed | existing queue remains `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |
| public search performed | passed | OpenAI, GitHub, Obsidian, W3C/NN.g/Figma/Chrome, OWASP, career-ops lanes |
| duplicate check | passed | local rg across LLM Wiki sources/wiki/reports/inbox |
| source note schema | passed | required frontmatter and `## Original Content` included |
| installs/connectors | passed | none installed, enabled, connected, or run |
| status script | passed | `llm-wiki-status.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault` |
| lint script | passed | `llm-wiki-lint.ps1 -VaultPath D:\VibeProject\ObsidianVault\ObsidianVault`; 0 warnings |
| UTF-8 scan | passed | source/report/guide/index/log/memory checked |

## Watchdog

PASS_WITH_WARNINGS. The update is useful because it strengthens install-audit fields for external skills, but OWASP AST10 is still active-development/proposal material and linked incident claims were not fully independently verified. Mitigation: confidence stays `medium`, installation remains `knowledge-only`, and no executable artifact was installed.

