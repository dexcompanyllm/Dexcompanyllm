---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 03:04 KST"
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: growth-scan-report
source:
  - "https://github.com/openai/codex/releases/tag/rust-v0.143.0"
  - "https://github.com/openai/codex/releases"
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/2026-07-08-npm-install-time-security-and-gat-bypass2fa-deprecation/"
  - "https://github.blog/changelog/2026-06-09-upcoming-breaking-changes-for-npm-v12/"
  - "https://docs.npmjs.com/cli/v11/commands/npm-approve-scripts/"
  - "https://docs.npmjs.com/trusted-publishers/"
  - "https://github.blog/changelog/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/docs/releases"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://www.threads.com/"
collectionPurpose: "30분 Growth Scan에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, Codex remote plugin/proxy 및 npm install-time security 기준을 LLM Wiki에 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - codex
  - npm
  - install-audit
  - security
---

# Dex Company Growth Scan - 2026-07-09 03:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 03:02-03:09 KST
- 실행 모드: 30분 fast discovery / candidate detection after Figma Make codebase handoff.
- 검색 범위: OpenAI Codex GitHub releases/changelog, OpenAI API changelog, GitHub changelog, npm changelog/docs, GitHub Copilot app/mobile/session signals, Storybook release surfaces, Obsidian changelog, W3C WAI update, NN/g latest, Figma agent/MCP signals, Threads public search.
- 변경 범위: source note 2개, `Dex Company Approval-Ready Install Audit Model`, `Dex Company Task Checklists from Growth Scans`, LLM Wiki `index.md`, `log.md`, 이 보고서.
- 금지 준수: package, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable install은 수행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 24 | public search/open surfaces counted from this run |
| stored.count | 2 | Codex 0.143.0 source note, npm v12 install-security source note |
| duplicate.count | 14 | OpenAI Codex app changelog, API realtime, GitHub Copilot app/mobile, Storybook, Obsidian, W3C, NN/g, Figma broad signals, Threads largely covered or account/project-specific |
| deferred.count | 5 | GitHub Copilot app/mobile, Storybook target repo setup, Figma account/repo/MCP, Threads primary confirmation, local Codex runtime version/proxy/plugin state |
| blocked.count | 0 | preflight FAIL, access bypass, unauthorized install/connect/account change 없음 |
| lint.warning_count | 0 | Bias Check 추가 후 `llm-wiki-lint.ps1` 0 warning |

## Preflight

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-030226.md`
- free RAM: 1.81GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Codex `0.143.0` GitHub release는 remote plugins 기본 활성화, npm marketplace source, remote/local version 표시, Windows/macOS system proxy/PAC/WPAD, remote-control pairing, MCP tool search/session-auth scope를 새 감사 필드로 만들었습니다.
2. GitHub/npm 2026-07-08 changelog는 npm v12에서 install-time security defaults가 켜졌다고 공개했고, install script, git dependency, remote URL dependency를 명시적 허용 대상으로 분리하게 만들었습니다.
3. npm 2FA-bypass granular access token의 민감 작업 제한과 직접 publish 제한 일정은 CI release/publish 승인 packet에 long-lived token, trusted publishing, staged publish, human 2FA gate를 분리해야 함을 강화합니다.
4. GitHub Copilot Mobile/Copilot app, Storybook 10.4, Figma agent/MCP 신호는 여전히 account/repo/runtime context가 없어서 adoption이 아니라 carried/deferred가 맞습니다.
5. OpenAI API Realtime 2.1, Obsidian 1.13.1, W3C WAI July update, NN/g Design Specs는 현재 체크리스트를 바꾸지 않아 duplicate/no-new-signal로 처리했습니다.

## Stored / Absorbed

- Source note added: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-openai-codex-0143-remote-plugin-proxy-audit.md`
- Source note added: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\ai-research\2026-07-09-github-npm-v12-install-time-security.md`
- Wiki guide updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Approval-Ready Install Audit Model.md`
- Wiki guide updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- Index updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- Log updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- Report saved: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0304-dex-company-growth-scan-codex-npm-install-security.md`

## LLM Wiki Inbox / Source / Wiki Change History

- Added Codex 0.143.0 remote plugin/proxy audit source note with medium confidence and partial verification.
- Added npm v12 install-time security source note with high confidence, multi-source-primary evidence, and Bias Check.
- Updated approval-ready install audit model with `codex_remote_plugin_audit` and `npm_install_security` fields.
- Updated task checklist fields for Codex/OpenAI, AI Agents/MCP/Connectors, and install approval.
- Updated index/log to link the new source notes and operating rules.
- Candidate queue was not edited because direct count remains closed: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Claim Split |
|---|---|---|---|---|---|
| Codex 0.143.0 remote plugin/proxy release | OpenAI GitHub | official release | stored-source + checklist-adopted | medium | source-backed: release fields. Dex inference: approval fields. not checked: local runtime |
| npm v12 install-time security defaults | GitHub/npm | official changelog + docs | stored-source + checklist-adopted | high | source-backed: install defaults/docs/token direction. Dex inference: approval packet fields. not checked: local npm/project/CI |
| OpenAI Codex app changelog | OpenAI | official changelog | duplicate-currentness | high | task/iOS/SSH/usage fields already covered; no new checklist field this run |
| OpenAI API Realtime 2.1 | OpenAI | official API changelog | deferred/no-new-field | high | realtime voice useful, but no target voice app or acceptance test change beyond existing COGA/AI conversation fields |
| GitHub Copilot app/mobile/session signals | GitHub | official changelog | carried/account-adjacent | high | account/org/runtime/mobile app policy not checked |
| Storybook releases/docs | Storybook/GitHub | official docs/release | deferred/project-specific | medium | target repo, dependency delta, generated config, tests, rollback missing |
| Obsidian changelog | Obsidian | official changelog | duplicate-currentness | high | 1.13.1 does not change current Vault workflow |
| W3C WAI update / NN/g / Figma broad agent signals | W3C, NN/g, Figma | official/vendor | duplicate/no-new-signal | mixed | recent checklist fields already cover them |
| Threads public search | Threads | SNS discovery | deferred/discovery-only | low | primary source confirmation weak |

## Installation Or Due-Diligence Candidates

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Codex 0.143.0 upgrade/use | approval-not-ready/local-runtime-specific | No | remote plugin default, marketplace source, system proxy, pairing, MCP session auth, local version drift |
| Codex remote plugins / npm marketplace plugins | approval-not-ready | No | publisher identity, version pin/hash, tool expansion, remote/local version mismatch, network/auth surface |
| npm package install under v12 | project-specific conditional after audit | No | allowScripts, git/remote dependencies, native builds, CI strict mode, runtime behavior |
| npm publish automation | approval-not-ready | No | 2FA-bypass token deprecation, trusted publishing, staged publish, human 2FA approval |
| GitHub Copilot Mobile/Copilot app | account-adjacent | No | org policy, mobile notifications, agent work start/approval, billing, account context |
| Storybook agentic setup | project-specific conditional | No | package/config mutation, generated stories, a11y/runtime tests, rollback |

## Duplicate Exclusions

- OpenAI Codex app changelog: currentness checked, but no new Dex Company field beyond existing task/mobile/SSH/usage-limits handling.
- OpenAI API Realtime 2.1: no target realtime voice app or acceptance test in this workspace.
- GitHub Copilot app/mobile/session: official and current, but account/org/mobile/runtime policy remains missing.
- Storybook 10.4/GitHub releases: still needs target repo and dependency/test evidence.
- Obsidian 1.13.1: does not change current Vault workflow.
- W3C/NN-g/Figma broad signals: recent reports already adopted the concrete checklist fields.
- Threads: discovery-only because primary extraction remains weak.

## Failed / Blocked / Not Checked

- Failed: initial lint found 1 warning for high-confidence source note without Bias Check; fixed by adding Bias Check and reran lint/audit successfully.
- Blocked: none.
- Not checked: local Codex version, Codex Desktop/app behavior, remote plugin catalog, system proxy settings, PAC/WPAD behavior, remote-control daemon, pairing-code flow, MCP session authentication, local npm version, target project dependency tree, pending install scripts, CI strict flags, npm token/publish settings, GitHub/Figma/Storybook account/repo/runtime context, Threads primary pages.

## Cross Verification

- Codex 0.143.0 was checked against OpenAI GitHub release list and OpenAI Developers Codex changelog.
- npm v12 was checked against GitHub changelog, earlier breaking-change notice, npm `approve-scripts` docs, and npm trusted publishing docs.
- GitHub Copilot mobile/app signals were checked against the GitHub changelog and kept account-adjacent.
- Storybook release signals were checked against Storybook docs and GitHub releases, then deferred because no target repo exists.
- Obsidian, W3C, NN/g, Figma, and Threads were compared against recent 01:04, 01:39, 02:05, and 02:34 reports plus LLM Wiki index/log.

## Source-Backed / Dex Inference / Not Checked

- source-backed: OpenAI GitHub release and GitHub/npm official docs expose the changed surfaces.
- Dex inference: Dex Company should treat these as approval/checklist field changes, not as permission to upgrade, enable, install, connect, or publish.
- not checked: local runtime/account/project/CI/token settings were not inspected beyond the public docs and local LLM Wiki file checks.

## 에던님이 바로 쓸 수 있는 예시

패키지나 Codex 플러그인 후보가 나오면 승인 요청 전에 아래 필드를 비워두지 않으시면 됩니다.

```yaml
codex_remote_plugin_audit:
  codex_version: checked | not_checked
  remote_plugins_default_state: enabled | disabled | not_checked
  plugin_catalog_source: official | npm_marketplace | local | mixed | not_checked
  system_proxy_route: none | macos | windows | pac | wpad | not_checked
  remote_control_daemon: running | not_running | not_checked
  mcp_session_auth_scope: checked | not_checked | not_applicable

npm_install_security:
  npm_major_version: checked | not_checked
  pending_install_scripts: none | listed | not_checked
  git_dependency_allowance: none | scoped | not_checked
  remote_url_dependency_allowance: none | scoped | not_checked
  native_build_approval: reviewed | not_checked | not_applicable
  ci_strict_install_policy: checked | not_checked
  human_2fa_publish_or_stage_gate: checked | not_checked | not_applicable
```

## Improvement Delta

- 개선 전: install approval packet이 install script, permission, network, token을 넓게만 확인했습니다.
- 개선 후: Codex remote plugin/proxy/session-auth와 npm v12 install-time security/publish-token fields를 별도 체크 필드로 분리했습니다.
- 운영 규칙 변경: Codex remote plugin 또는 npm package 후보는 source가 공식이어도 local version, catalog source, proxy/pairing/session-auth, install-script allowlist, git/remote dependency, CI/publish gate가 확인되기 전에는 `approval-ready`가 아닙니다.

## Adoption Check

- 이전 action item: 새 source는 checklist field, approval field, QA field, acceptance test 중 하나를 바꿀 때만 저장합니다.
- 채택 여부: done.
- 반영 방식: Codex 0.143.0과 npm v12는 실제 approval/checklist field를 만들었으므로 2개 source note와 가이드 업데이트로 흡수했습니다.

## Previous Deferred / Carried Rejudgment

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | app/mobile availability is official, but account/org/runtime/mobile policy is still not checked |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, generated config, package delta, test output, rollback missing |
| Figma Agent / MCP / Make | carried/account-and-repo-specific | carried/account-and-repo-specific | Figma signals remain useful but live account/repo/MCP context missing |
| Threads Obsidian+Codex signal | deferred/discovery-only | deferred/discovery-only | primary source confirmation still weak |
| npm package install approval | broad install checklist | done/adopted-narrow-field | npm v12 install-time security fields were added |

## Next Eval

1. Run preflight first.
2. Only store a new source if it creates a concrete checklist/approval/QA/acceptance-test field.
3. If Codex plugins, MCP tools, or connector candidates appear again, require local Codex version, remote plugin state, catalog source, publisher/version/hash, proxy route, pairing flow, MCP session-auth scope, and rollback before approval.
4. If npm package installs appear again, require target `package.json`, npm major version, pending scripts, allowScripts diff, git/remote dependency policy, native build approval, CI strict setting, and token/publish path before approval.

## Prompt Or Template Patch Candidate

```text
For Codex/plugin/MCP/package candidates, do not treat official release notes as approval. Split evidence by local version, remote plugin default state, plugin catalog source, npm marketplace source, publisher identity, version pin/hash, system proxy/PAC/WPAD, remote-control pairing, MCP tool search, session auth, npm allowScripts, git/remote dependency allowance, native build approval, CI strict policy, and publish-token/2FA gate. If any target project/account/runtime field is missing, keep the item approval-not-ready or knowledge-only.
```

## Failure Pattern / Risk

- 반복 위험: "공식 릴리스"를 "우리 환경에서 바로 켜도 됨"으로 착각하는 것.
- 이번 처리: public release/docs를 LLM Wiki 운영 지식으로만 흡수했고, 설치/업그레이드/연결/권한 변경은 하지 않았습니다.
- 남은 위험: local Codex/npm/project/CI settings는 이번 회차에서 확인하지 않았습니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-030226.md` |
| internet search | PASS | public official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki grep, index/log |
| source/wiki storage basis | PASS | concrete approval/checklist fields added |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package execution, account, billing, token change |
| source-backed / Dex inference / not checked split | PASS | Evidence Table and separate section |
| status | PASS | source notes 167, wiki notes 7, query notes 1 |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) after Bias Check repair |
| audit | PASS_WITH_BACKLOG | notes checked 182, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | changed Korean Markdown files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | valid run; local runtime/account/project/CI fields remain not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit, UTF-8 checks passed after one safe schema repair; no unauthorized install, connector, MCP/package execution, account connection, token, billing, or cloud change occurred.
- Highest risk: official Codex and npm releases can be mistaken for local approval. This report explicitly keeps them as approval-field updates only.
- Not checked: local Codex/npm versions, remote plugin state, proxy/PAC/WPAD, pairing flow, MCP session auth, target `package.json`, CI/publish settings, account/org context.
- Rework needed: none.

## Original Content

이 보고서는 2026-07-09 03:04 KST Growth Scan 공개 검색 결과, preflight PASS 결과, OpenAI Codex 0.143.0 release, GitHub/npm install-time security docs, 기존 LLM Wiki 중복 확인, install approval checklist 변경, status/lint/audit/UTF-8 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
