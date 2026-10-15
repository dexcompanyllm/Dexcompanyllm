---
type: llm-wiki-growth-scan-report
status: completed
title: "2026-07-08 22:34 Dex Company Growth Scan - Design Specs Adoption"
created: 2026-07-08
updated: 2026-07-08
dateCreated: 2026-07-08
dateModified: 2026-07-08
confidence: medium
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-08
verifiedBy: Dex
disputed: false
sourceKind: growth-scan-report
source:
  - "https://www.nngroup.com/videos/what-are-design-specs/"
  - "https://www.nngroup.com/videos/mistakes-when-creating-design-specs/"
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://github.blog/changelog/2026-07-07-copilot-billing-preview-app-will-be-retired-on-august-3/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/docs/ai/setup"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://obsidian.md/changelog/"
collectionPurpose: "22:30 adoption selection 회차에서 이전 carried 항목인 NN/g design specs를 PPT/frontend handoff checklist에 반영하고, 나머지 agent/tool 후보를 중복/보류로 재판정한다."
tags:
  - llm-wiki/output
  - growth-scan
  - dex-company
  - frontend
  - ppt
  - ux-research
---

# 2026-07-08 22:34 Dex Company Growth Scan - Design Specs Adoption

## Run Scope and Limits

- 실행 시각: 2026-07-08 22:34 KST
- 실행 모드: 22:30 이후 adoption selection. 직전 회차에서 carried였던 NN/g design specs를 durable checklist field로 반영할지 결정했다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot app/billing, NN/g design specs, Storybook agent/frontend QA, Figma Agent skills, Obsidian changelog, Threads 공개 검색.
- preflight: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-223226.md`
- 제한: GitHub/Figma/Storybook/Threads의 실제 계정, 조직 정책, 로컬 런타임, 생성 config diff는 확인하지 않았다. X는 지시대로 제외했다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 11 | 공개 검색/확인 후보 URL 기준 |
| stored.count | 1 | NN/g design specs source note 1개 |
| duplicate.count | 6 | OpenAI Codex changelog, Storybook 10.3/10.4, Figma skills, Obsidian changelog, 기존 GitHub governance/currentness coverage |
| deferred.count | 3 | GitHub Copilot app, Storybook agentic setup, Threads signals |
| blocked.count | 0 | preflight FAIL, 접근 강제 우회, 승인 없는 설치 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` completed with 0 warnings |

## 오늘의 핵심 발견

1. NN/g design specs 후보는 이제 `carried`가 아니라 `done/adopted`로 재판정했다. 디자인 파일 링크만 넘기는 것은 handoff로 부족하며, layout, interaction, requirement, scope, behavior, appearance, functionality, development issue context를 명시하는 체크가 필요하다.
2. Storybook 10.4 agent setup은 기존 source note가 이미 있고, 공식 docs도 React/Vite 한정과 API 변화 가능성을 말하므로 project-specific approval packet 없이는 adoption하지 않는다.
3. GitHub Copilot app은 모든 Copilot plan으로 확대됐지만, Business/Enterprise에서는 admin policy와 계정/조직/비용 조건이 걸린다. Dex Company에서는 설치 후보가 아니라 account-adjacent watch item이다.
4. Figma agent skills는 기존 source note와 중복이다. 팀 skill/connector 패턴은 유용하지만 Figma 파일, seat, shared/private chat, connector scope가 확인되기 전에는 운영 문서만 참고한다.
5. Obsidian changelog는 2026-06-09 이후 새 신호가 검색되지 않았다. 현재 회차에서는 no-new-signal이다.

## Evidence Table

| Candidate | Publisher | Type | Decision | Confidence | Source-backed / Dex inference / not checked |
|---|---|---|---|---|---|
| NN/g What are Design Specs? | NN/g | expert UX video | stored-source + checklist-adopted | medium | source-backed: 날짜/요약/주제 확인. Dex inference: handoff field로 번역. not checked: full transcript |
| NN/g 5 Common Mistakes When Creating Design Specs | NN/g | expert UX video | cross-check | medium | source-backed: 협업/정리/업데이트/가정 실패 유형 확인. not checked: full transcript |
| GitHub Copilot app available to all | GitHub | official changelog | carried/account-adjacent | high | source-backed: plan/platform/admin policy 신호. not checked: Ethan 계정/조직/설치/runtime |
| Copilot Billing Preview app retirement | GitHub | official changelog | duplicate-currentness | medium | source-backed: billing UI 변화. Dex inference: 비용 governance watch. not checked: Ethan billing UI |
| Storybook 10.4 | Storybook | official blog | duplicate-source/project-specific | medium | source-backed: agent setup flow. not checked: target repo diff/test |
| Storybook agentic setup docs | Storybook | official docs | deferred/project-specific | medium | source-backed: React/Vite 제한, API change caveat. not checked: local setup |
| Storybook 10.3 | Storybook | official blog | duplicate-cross-check | medium | source-backed: real components/stories/docs/tests/a11y direction |
| Figma agent skills | Figma | official vendor blog | duplicate/account-adjacent | medium | source-backed: skill/team workflow pattern. not checked: Figma plan/file/connector |
| Obsidian changelog | Obsidian | official changelog | duplicate/no-new-signal | medium | source-backed: latest visible June 9 release. not checked: insider/private release |
| Threads Codex signals | Threads/public posts | public SNS | deferred/not-checked | low | search saw signals, but no reliable primary confirmation; no durable note |
| OpenAI Codex changelog | OpenAI | official docs | duplicate-currentness | medium | existing Codex changelog/source coverage already handles this lane |

## Stored / Rejected / Deferred

### Stored

- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-08-nngroup-design-specs-handoff.md`
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\PPT Frontend Visual Communication Checklist.md` updated with `Handoff Context QA`.
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md` linked the source and added the operating rule.
- `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md` appended the change record.

### Rejected / Duplicate

- Storybook 10.4: already stored as `2026-07-03-storybook-104-agent-setup-review-filters.md`.
- Figma agent skills: already stored as `2026-07-04-figma-agent-skills-collaboration.md`.
- Obsidian changelog: no new July signal beyond existing Obsidian coverage.
- OpenAI Codex changelog: existing Codex changelog/source coverage remains sufficient for this run.

### Deferred

- GitHub Copilot app: keep `carried/account-adjacent` until account, plan, org policy, local install, telemetry, and cost controls are checked.
- Storybook agentic setup docs: keep `deferred/project-specific` until a target frontend repo, package manager, generated diff, test command, and rollback path exist.
- Threads public SNS signals: do not promote without primary confirmation.

## LLM Wiki 변경 이력

- Source note added: `2026-07-08-nngroup-design-specs-handoff.md`
- Wiki guide updated: `PPT Frontend Visual Communication Checklist.md`
- Index updated: `index.md`
- Log updated: `log.md`
- 설치/connector/MCP/SDK/browser extension/GitHub workflow/account/token/billing 변경: 없음

## Approval Decisions

| Item | Decision | Install? | Missing approval packet |
|---|---|---|---|
| NN/g design specs guidance | knowledge-only adopted | No | 없음. 문서 지식만 흡수 |
| GitHub Copilot app | approval-not-ready/account-adjacent | No | GitHub account, plan, org policy, local install, telemetry, cost/billing |
| Storybook agentic setup | project-specific conditional | No | target repo, package manager, generated config diff, test output, rollback |
| Figma agent skills/connectors | approval-not-ready/account-adjacent | No | workspace/file permission, connector scope, private/shared chat, billing |
| Threads signals | not-checked | No | primary confirmation, source provenance |

## 중복으로 제외한 자료

- Storybook 10.4 official blog: 기존 source note와 중복.
- Storybook 10.3 MCP/a11y blog: 기존 agent-readable frontend QA 방향과 중복.
- Figma agent skills collaboration: 기존 source note와 중복.
- Obsidian changelog: 기존 Obsidian release source lane과 중복이며 새 운영 규칙 없음.
- OpenAI Codex changelog: 기존 Codex changelog lane과 중복.
- GitHub Copilot billing/app currentness: 이번 회차에서는 source note보다 account/billing watch가 적절하다.

## 실패 / 차단 / 미확인

- 실패: 없음.
- 차단: 없음.
- 미확인: NN/g 2026 video full transcript, GitHub Copilot app local runtime, Ethan GitHub/Figma account policy, Storybook generated config diff, Threads primary source reliability.
- 보안/라이선스 리스크: 실행 코드 설치가 없어서 supply-chain risk는 발생하지 않았다. 다만 GitHub/Figma/Storybook 후보는 실제 도입 시 permission, network egress, identity/file access, prompt injection, overreliance를 다시 봐야 한다.

## 교차 검증 근거

- NN/g 2026 design specs 영상은 같은 NN/g의 2025 design specs mistakes 영상과 교차 확인했다.
- NN/g handoff field는 기존 `PPT Frontend Visual Communication Checklist`, Storybook 10.3/10.4 source notes, WCAG 2.2 기반 frontend QA fields와 연결했다.
- Storybook 10.4 blog는 Storybook agentic setup docs 및 Storybook 10.3 MCP/a11y blog와 대조했다.
- GitHub Copilot app은 GitHub official changelog와 관련 billing/governance currentness 항목을 함께 봤지만, 계정/조직 검증이 없어 adoption하지 않았다.

## 에던님이 바로 사용할 수 있는 예시

PPT 또는 frontend 화면을 넘기기 전, 각 화면에 아래 8줄을 붙여 비어 있는 항목을 보완 대상으로 표시하시면 됩니다.

```markdown
layout:
interaction:
requirement:
scope:
behavior:
appearance:
functionality:
dev issue context:
```

예를 들어 대시보드 카드라면 `layout`에는 카드 위치와 우선순위, `interaction`에는 클릭/필터/hover, `requirement`에는 반드시 보여야 할 수치, `scope`에는 이번 릴리스 포함/제외 범위, `dev issue context`에는 관련 GitHub issue나 QA_REPORT 링크를 넣습니다.

## Improvement Delta

- 개선된 점: 이전 회차에서 `carried-for-22:30-checklist-decision`이었던 NN/g design specs를 이번 22:30 이후 회차에서 `done/adopted`로 확정했다.
- 운영 변화: PPT/frontend checklist에 handoff context QA가 추가되어, 앞으로 디자인 파일만 보고 구현 착수하는 위험을 줄인다.
- 템플릿 변화: report가 단순 최신 검색이 아니라 carried item의 채택/보류 결정을 trace했다.

## Adoption Check

- 이전 action item: 22:30 adoption selection이 오면 NN/g design specs를 `PPT Frontend Visual Communication Checklist`에 handoff context fields로 반영할지 결정한다.
- 채택 여부: done/adopted.
- 반영 방식: source note 1개 저장, checklist field 소폭 추가, index/log 업데이트.
- 보류한 이유가 해소된 범위: 영상 full transcript는 여전히 미확인이지만, 공개 요약과 2025 NN/g cross-check만으로도 "handoff context를 확인하라"는 낮은 위험의 checklist field 추가에는 충분하다고 판단했다.

## 이전 deferred/carried item 재판정

| Item | Previous | New | Reason |
|---|---|---|---|
| NN/g What are Design Specs? | carried-for-22:30-checklist-decision | done/adopted | source note 저장 및 checklist 반영 완료 |
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | 공식 공개는 확인됐지만 account/plan/org/local runtime 미확인 |
| Storybook 10.4 setup | deferred/project-specific | deferred/project-specific | 기존 coverage와 중복, target repo approval packet 필요 |
| Figma Agent skills/custom tools | duplicate/account-adjacent | duplicate/account-adjacent | 기존 Figma source notes와 중복, 계정/파일 권한 미확인 |
| Threads Codex signals | not-checked | deferred/not-checked | primary source로 쓰기 어려움 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. preflight를 먼저 실행한다.
2. 새 source note를 만들기 전, checklist field나 approval field가 실제로 바뀌는지 먼저 묻는다.
3. GitHub Copilot app은 설치 후보로 올리지 말고, account/plan/org policy/runtime/cost 증거가 생길 때만 재판정한다.
4. Storybook agentic setup은 실제 repo와 rollback/test command가 있을 때만 adoption한다.

## Prompt or Template Patch Candidate

```text
PPT/frontend/design-to-code handoff 후보는 디자인 파일 링크만으로 ready 처리하지 않는다. layout, interaction, requirement, scope, behavior, appearance, functionality, dev issue context 중 빈 항목을 표시하고, 빈 항목이 있으면 ready/partial/blocked로 재판정한다.
```

## Failure Pattern

- 반복 패턴: agent/tool release 신호가 많지만 대부분 계정, org policy, repo runtime, install diff가 없으면 adoption으로 갈 수 없다.
- 이번 수리: 설치/도구 후보는 보류하고, 낮은 위험의 운영 체크리스트 필드만 흡수했다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-223226.md` |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table 및 source note |
| duplicate check | PASS | LLM Wiki source/wiki/report grep |
| unauthorized install/connect/account change | PASS | 설치/연결/권한 변경 없음 |
| source note required fields | PASS | lint 0 warnings, source note includes v5 metadata |
| `## Original Content` | PASS | source note and report include section |
| status/lint | PASS | status passed; lint passed with 0 warning(s) |
| audit | PASS_WITH_WARNINGS | 176 notes checked, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 replacement scan | PASS | changed Korean Markdown files returned `OK_UTF8` |
| watchdog | PASS_WITH_WARNINGS | self-audit limitation; remaining risk is unverified account/repo/runtime context |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, status, lint, audit, UTF-8 검사가 실행됐고, 승인 없는 설치/연결/권한 변경은 없었다.
- 최고 위험: GitHub Copilot app, Figma Agent, Storybook agentic setup은 계정/조직/파일/저장소 런타임이 없으면 채택 판단을 과장할 수 있다.
- Not checked: NN/g 2026 영상 full transcript, GitHub/Figma 계정 정책, Storybook generated config diff, Threads primary confirmation.

## Original Content

이번 보고서는 2026-07-08 22:34 KST Growth Scan 공개 검색 결과, preflight PASS 결과, 기존 LLM Wiki 중복 확인, NN/g design specs source note 저장, PPT/frontend checklist handoff context field 반영, GitHub/Figma/Storybook/Threads 후보 재판정을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
