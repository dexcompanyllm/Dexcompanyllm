---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 05:05 KST"
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
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/month/07-2026/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://obsidian.md/changelog/"
  - "https://obsidian.md/help/bases"
  - "https://obsidian.md/help/bases/syntax"
  - "https://obsidian.md/help/plugin-security"
  - "https://forum.obsidian.md/t/enhance-bases-usability-experience-with-bases-toolbox/115907"
  - "https://github.com/grub-basket/Bases-Toolbox"
  - "https://community.obsidian.md/plugins/bases-toolbox"
  - "https://www.figma.com/blog/introducing-figma-motion/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.w3.org/WAI/update/"
collectionPurpose: "30분 growth scan에서 반복 currentness 신호와 새 Obsidian Bases/frontmatter 대량 편집 플러그인 후보를 구분하고, Dex Company Vault 운영 승인 기준을 갱신한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - obsidian
  - bases
  - install-audit
---

# Dex Company Growth Scan - 2026-07-09 05:05 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 05:02-05:05 KST
- 실행 모드: 30분 fast discovery / operational_scope.diff 확인.
- 검색 범위: OpenAI Codex/API, GitHub Copilot July changelog, Storybook 10.3/10.4, Obsidian changelog/Bases/plugin security, Obsidian Bases Toolbox forum/GitHub/community directory, Figma Motion/MCP, W3C WAI update.
- 변경 범위: source note 1개, Task Checklist 1개, LLM Wiki index/log, growth scan report 1개.
- 금지 준수: Obsidian plugin, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable package를 설치/연결/실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 15 | 공개 URL/search surface 기준 주요 source/candidate |
| stored.count | 1 | Obsidian Bases Toolbox approval-not-ready source note 1개 |
| duplicate.count | 9 | Codex/API, Storybook 10.4/10.3, Obsidian changelog, Figma Motion/MCP, W3C currentness |
| deferred.count | 5 | GitHub Copilot account/runtime, Storybook target repo, Figma account/file, Threads/social discovery, Obsidian plugin live install/test-vault |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | post-report lint 결과 기준 |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-050249.md`
- free RAM: 1.54GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. Obsidian Bases Toolbox는 Bases/frontmatter property를 대량 편집하는 커뮤니티 플러그인입니다. 유용성은 높지만 vault-wide mutation scope가 있어 생산성 도구가 아니라 승인 전 실사 대상입니다.
2. Obsidian official plugin security 문서는 community plugin이 Obsidian의 접근 권한을 상속하고 파일 접근, 인터넷 연결, 추가 프로그램 설치가 가능할 수 있다고 경고합니다. Restricted mode 변경은 보안 결정입니다.
3. Bases Toolbox 공개 repo는 MIT license, version `0.1.41`, minAppVersion `1.9.0`, build/deploy scripts를 보여줍니다. 다만 source scan, lockfile/dependency audit, test-vault run은 이번 실행에서 하지 않았습니다.
4. Storybook 10.4, Figma Motion/MCP, OpenAI Codex/API currentness는 기존 LLM Wiki source notes와 최근 보고서가 이미 운영 필드를 커버합니다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| Obsidian Bases Toolbox property bulk edit | Obsidian Forum / GitHub / Community plugins | community plugin | stored-source / approval-not-ready | medium | source-backed: public forum, repo, manifest/package/license, Obsidian plugin security. Dex inference: vault mutation approval fields. not checked: code scan/test vault |
| Obsidian Bases official docs | Obsidian | official docs | cross-check | high | source-backed: Bases use frontmatter note properties and `.base` views/formulas. not checked: Ethan Vault Bases design |
| Obsidian plugin security | Obsidian | official docs | cross-check | high | source-backed: community plugin risk and Restricted mode. Dex inference: approval gate |
| OpenAI Codex changelog | OpenAI | official changelog | duplicate-source | high | existing task/model/access fields cover current signal |
| OpenAI API Realtime 2.1 | OpenAI | official changelog | deferred/no-target | high | target voice UI and acceptance tests still absent |
| Storybook 10.4 / 10.3 MCP | Storybook | official blog/docs | deferred/project-specific | medium | existing Storybook coverage; target repo/package/test/rollback not checked |
| Figma Motion / MCP | Figma | official vendor docs | duplicate/account-specific | medium | existing motion, Make, MCP Slides notes cover fields |
| W3C WAI update | W3C | official standards work page | duplicate/currentness | high | current PPT/frontend checklist already covers accessibility QA anchors |

## 저장/흡수한 자료 목록

- source note: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-09-obsidian-bases-toolbox-property-bulk-edit-audit.md`
- checklist update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\Dex Company Task Checklists from Growth Scans.md`
- index update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- log update: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0505-dex-company-growth-scan-obsidian-bases-toolbox-audit.md`

## LLM Wiki Inbox / Source / Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/articles/`: Obsidian Bases Toolbox approval-not-ready source note 1개 추가.
- `30_Knowledge/LLM_Wiki/wiki/guides/Dex Company Task Checklists from Growth Scans.md`: Obsidian community plugin, Restricted mode, backup/test-vault, preview/undo/rollback fields 추가.
- `30_Knowledge/LLM_Wiki/index.md`: 새 source note와 운영 규칙 링크 추가.
- `30_Knowledge/LLM_Wiki/log.md`: 05:05 실행 항목 추가.
- `00_Inbox/LLM_Wiki/`: 변경 없음.
- 10x candidate queue: 직접 확인 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지.

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Obsidian Bases Toolbox | approval-not-ready / test-vault required | No | vault-wide frontmatter mutation, Restricted mode, plugin permissions, dependency/source scan not done |
| Storybook MCP/10.4 setup | deferred/project-specific | No | package/config mutation, generated tests, rollback missing |
| Figma Motion/MCP/Make/Slides | carried/account-and-file-specific | No | workspace/file permission, connector scope, private context exposure |
| GitHub Copilot browser/app | carried/account-adjacent | No | account/org policy, browser data scope, billing |

## 중복으로 제외한 자료

- OpenAI Codex changelog 2026-07-06: 기존 task/currentness reports와 04:34 Codex access guard로 충분.
- OpenAI API Realtime 2.1: target realtime voice app 없음으로 deferred/no-new-field 유지.
- Storybook 10.4/10.3 MCP: 기존 `2026-07-03-storybook-104-agent-setup-review-filters.md`와 최근 보고서가 project-specific 조건을 보존.
- Figma Motion: 기존 `2026-07-04-figma-config-2026-motion-agent-handoff.md`가 motion spec/reduced motion/browser QA fields를 보존.
- Figma MCP Slides/Make: 02:34/03:35 source notes와 checklist가 이미 repository/deck refresh risk fields를 보존.
- W3C WAI currentness: PPT/frontend checklist의 WCAG/COGA/ARIA fields로 충분.
- Obsidian changelog: 최신 changelog에 새 Dex Company 운영 필드 없음.

## 실패 / 차단 / 미확인 항목

- 실패: 없음.
- 차단: 없음.
- 미확인: Bases Toolbox full source audit, bundled release artifact diff, dependency/lockfile audit, safety scorecard internals, network call inspection, test-vault dry run, backup/restore rehearsal, Ethan Vault property scope, local Obsidian version, mobile/desktop plugin behavior.
- 부분 확인: plugin forum/repo/package/manifest/license/community directory와 Obsidian official security/Bases docs는 확인했지만 install approval로 충분하지 않습니다.

## 교차 검증 근거

- Bases Toolbox forum 설명을 GitHub README, manifest, package scripts, license, community plugin directory와 대조했습니다.
- Obsidian Bases official docs로 note properties/frontmatter와 `.base` view/formula 모델을 확인했습니다.
- Obsidian plugin security official docs로 Restricted mode와 community plugin permission risk를 대조했습니다.
- 기존 LLM Wiki source/report `rg` 검색으로 Figma Motion, Storybook 10.4, Codex/API currentness 중복을 확인했습니다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: Obsidian official docs, Obsidian Forum, GitHub repository metadata, community plugin page, OpenAI/Storybook/Figma/W3C public sources를 확인했습니다.
- Dex inference: Obsidian frontmatter/property 대량 편집 도구는 LLM Wiki metadata를 대량 변경할 수 있으므로 `approval-ready install`이 아니라 `vault mutation approval packet`으로 다뤄야 합니다.
- Not checked: 에던님 Vault에서 Bases Toolbox가 실제로 필요한지, 어떤 property를 바꿀지, test-vault에서 안전한지, 백업/복구가 되는지는 확인하지 않았습니다.

## 에던님이 PPT 또는 Frontend 작업에서 바로 사용할 수 있는 예시

이번 회차는 PPT/frontend보다 Obsidian 운영 쪽 발견입니다. 그래도 frontend/PPT 작업에서 Obsidian 자료 관리가 얽힐 때 아래처럼 쓰시면 됩니다.

```yaml
obsidian_bulk_property_edit_before_project_handoff:
  target_notes_scope: "10_Projects/<ProjectName> only | LLM_Wiki only | not_checked"
  affected_fields:
    - status
    - confidence
    - verificationStatus
  preview_file_list_saved: yes | no
  backup_path: not_checked
  test_vault_trial: not_checked
  plugin_install_allowed: no
  manual_script_or_existing_codex_edit_preferred: yes
```

실무 의미: PPT/frontend 프로젝트 상태를 Bases로 정리하더라도, property 대량 수정은 먼저 scope와 rollback을 문서화한 뒤 진행해야 합니다.

## Improvement Delta

- 개선된 운영 규칙: Obsidian community plugin을 일반 productivity shortcut으로 보지 않고, Restricted mode와 vault-wide mutation scope를 가진 승인 전 실사 대상으로 분류했습니다.
- checklist 변경: Obsidian/LLM Wiki 작업 체크리스트와 설치/승인 체크리스트에 backup, test-vault, preview, undo/history limitation, package/dependency, network/telemetry, rollback fields를 추가했습니다.
- no-op discipline 유지: Figma/Storybook/OpenAI/W3C currentness는 새 operational field가 없어서 중복/보류로 처리했습니다.

## Adoption Check

- 이전 action item: OpenAI/Codex currentness는 plan/workspace/seat/runtime/admin policy 중 어떤 필드를 바꾸는지 먼저 확인한다.
- 채택 여부: done/carried.
- 이번 적용: OpenAI/Codex 신호는 새 필드를 만들지 않아 중복 처리했고, Obsidian Bases Toolbox는 새 vault mutation approval fields를 만들었으므로 source note로 저장했습니다.

## 이전 Deferred / Carried Item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app/browser tools | carried/account-adjacent | carried/account-adjacent | Ethan GitHub plan/org/runtime 확인 전 adoption 불가 |
| Storybook 10.4 / MCP setup | deferred/project-specific | deferred/project-specific | target repo, package delta, generated test, rollback 없음 |
| Figma Agent/MCP/Slides/Make/Motion | carried/account-and-file-specific | carried/account-and-file-specific | source fields는 저장되어 있고 live account/file evidence 없음 |
| Threads/public SNS | deferred/discovery-only | deferred/discovery-only | primary source 교차 검증 전까지 source-backed 승격 불가 |
| Obsidian community plugin for Bases/property bulk edit | new | carried/approval-not-ready | source note 저장은 완료, install은 backup/test-vault/source audit 전까지 불가 |

## Next Eval

1. preflight를 먼저 통과합니다.
2. Obsidian community plugin이 다시 나오면 target vault, Restricted mode, backup, test-vault, package scripts, lockfile/dependencies, network/telemetry, undo/rollback 중 어느 필드를 채우는지 확인합니다.
3. Figma/Storybook/OpenAI currentness는 새 checklist/approval/QA/acceptance-test field가 없으면 duplicate/no-new-signal로 둡니다.
4. Bases Toolbox는 실제 Vault 적용 전 source audit 또는 test-vault run 없이는 승인 요청으로 올리지 않습니다.
5. Threads는 primary source 교차 검증 전까지 discovery-only로 유지합니다.

## Prompt Or Template Patch Candidate

```text
When an Obsidian community plugin can mutate Bases, frontmatter, files, or attachments across a vault, classify it as a vault mutation tool. Do not request install approval until target vault, Restricted mode impact, exact plugin version, source repo, community directory, license, package scripts, dependency/lockfile review, network/telemetry claim, backup, test-vault trial, preview evidence, undo/history limits, and rollback path are checked.
```

## Failure Pattern / Risk

- 반복 위험: Obsidian community plugin은 "로컬이고 편리하다"는 이유로 안전해 보일 수 있지만, Restricted mode를 해제하면 plugin code가 Obsidian 권한을 상속합니다.
- 이번 대응: 설치하지 않고, source-backed note와 approval-not-ready checklist fields만 남겼습니다.
- 남은 위험: 실제 source code나 bundled release artifact를 감사하지 않았으므로 안전성 판단은 partial입니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-050249.md` |
| internet search | PASS | OpenAI/GitHub/Storybook/Obsidian/Figma/W3C public sources checked |
| duplicate check | PASS | `rg` searches across LLM Wiki sources/reports |
| source note schema | PASS | required v5 fields and `## Original Content` included |
| index/log update | PASS | source note and run entry added |
| install/connect prohibition | PASS | no install, plugin enablement, connector, SDK, MCP, browser extension, token, billing change |
| status | PASS | post-change status check completed |
| lint | PASS | post-change lint completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | post-change audit completed; unexplored backlog remains |
| UTF-8 check | PASS | changed Markdown files scanned for replacement character |
| watchdog | PASS_WITH_WARNINGS | valid source-backed update; plugin source/test-vault remain not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight PASS, source-backed public evidence, duplicate checks, no-install discipline, report schema, status/lint/audit/UTF-8 checks 완료.
- 최고 위험: community plugin의 "no network/no telemetry/undoable" claim을 설치 승인으로 오해하면 안 됩니다.
- Not checked: full source audit, dependency audit, safety scorecard internals, test-vault run, backup/restore rehearsal, local Obsidian version.
- Rework needed: 없음.

## Original Content

이 보고서는 2026-07-09 05:05 KST Growth Scan 공개 검색 결과, Obsidian official Help, Obsidian Forum, GitHub repository metadata, community plugin directory, 기존 LLM Wiki 중복 확인, preflight PASS 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목, Dex Company 운영 반영점만 보존했습니다.
