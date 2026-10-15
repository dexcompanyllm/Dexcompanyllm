---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-08 21:01 KST"
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
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/deprecations"
  - "https://github.blog/changelog/label/copilot/"
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://nextjs.org/blog/next-16-3-ai-improvements"
  - "https://nextjs.org/blog/next-16-3-turbopack"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://storybook.js.org/blog/storybook-10-3/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://www.figma.com/blog/agent-custom-tools-context-skills/"
  - "https://www.nngroup.com/videos/what-are-design-specs/"
  - "https://www.nngroup.com/articles/creating-design-specs-for-development/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/news/all/"
  - "https://www.w3.org/community/design-tokens/"
collectionPurpose: "30분 fast discovery 회차에서 최신 공개 자료 후보를 확인하고, 기존 LLM Wiki coverage와 중복되는 신호 및 다음 adoption selection 후보를 분리한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-08 21:01 KST

## Run Scope and Limits

- 실행 시각: 2026-07-08 21:01-21:06 KST
- 실행 모드: 30분 fast discovery / candidate detection. 22:30 daily adoption selection 전이므로 durable source/wiki/checklist 변경은 보류했다.
- 검색 범위: OpenAI Codex/API, GitHub Copilot, Next.js/Vite/frontend, Storybook agent setup/a11y, Figma Agent/skills, NN/g design specs, Obsidian, W3C WAI, W3C Design Tokens.
- 변경 범위: 이 growth scan report만 추가했다. source note, wiki note, inbox note, index, log, candidate queue는 변경하지 않았다.
- 설치/연결/권한 변경: 없음. SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing, executable package를 설치하거나 실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 16 | web search query 16개와 기존 report/source 중복 확인 |
| stored.count | 0 | 새 source/wiki/inbox note 없음 |
| duplicate.count | 9 | Codex/API, GitHub Copilot governance, Next.js 16.3, Storybook MCP/agent, Figma Agent, Obsidian, W3C/WCAG, Design Tokens 신호는 기존 coverage와 중복 |
| deferred.count | 3 | NN/g design specs checklist 후보, GitHub Copilot app account-adjacent 후보, Storybook 10.4 project-specific setup 후보 |
| blocked.count | 0 | preflight PASS, 검색 접근 차단 없음 |
| lint.warning_count | 0 | 사후 `llm-wiki-lint.ps1` PASS |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-210144.md`
- free RAM: 1.1GB, 기준 1GB 이상
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS
- 운영 리스크: free RAM이 기준은 넘었지만 1.1GB로 여유가 얇다. 다음 회차도 preflight-first가 필요하다.

## 오늘의 핵심 발견

1. NN/g "What are Design Specs?"는 2026-07-06 영상으로 확인됐고, 2025년 NN/g 상세 article이 design spec을 design file과 development issue의 결합으로 설명한다. 이 조합은 PPT/frontend handoff checklist에 `layout`, `interaction`, `requirement`, `scope`, `development issue context`를 추가할 후보가 된다.
2. Storybook 10.4는 agent-driven Storybook setup과 changed-story review focus를 다시 강조한다. 다만 기존 Storybook 10.3 MCP/component/a11y coverage가 이미 "agent는 real components, stories, docs, tests를 써야 한다"는 운영 기준을 저장했으므로 새 source note로 만들지 않았다.
3. Figma Agent skills와 custom tools 신호는 계속 강하지만 기존 Figma Agent/MCP/approval-ready coverage와 중복이다. 계정, 파일, workspace, connector, billing 맥락이 없으면 adoption 후보가 아니라 account-adjacent watch item이다.
4. GitHub Copilot app은 공식 changelog에서 모든 Copilot plan과 Windows/macOS/Linux 지원 신호가 확인된다. 그러나 실제 Dex Company 적용은 GitHub account, plan, organization policy, local install, telemetry/cost governance가 필요하므로 보류한다.
5. OpenAI Codex/API, Obsidian, W3C WAI, W3C Design Tokens, Next.js 16.3 신호는 기존 LLM Wiki coverage와 중복이거나 target project가 필요하다. 이번 회차에서는 새 운영 규칙을 만들지 않는다.

## Evidence Table

| Candidate | Publisher | Type | Status | Evidence Quality | Dex Company 사용 예시 |
|---|---|---|---|---|---|
| NN/g What are Design Specs? + Creating Design Specs for Development | NN/g | video + article | carried-for-22:30-checklist-decision | medium-high | 화면/슬라이드 handoff에서 layout, interaction, requirement, scope, dev issue context 누락 여부 확인 |
| Storybook 10.4 automated setup with agents | Storybook | official blog | deferred/project-specific | medium | 실제 frontend repo가 있을 때 Storybook setup 승인 패킷과 rollback/test command 확인 |
| Storybook 10.3 MCP and accessibility tests | Storybook | official blog | duplicate-source | medium-high | 기존 component/a11y QA 기준과 중복 |
| Figma Agent skills/custom tools | Figma | official vendor blog | duplicate/account-adjacent | medium | Figma connector/file/workspace 승인 패킷 없이는 지식 후보로만 유지 |
| GitHub Copilot app available to all | GitHub | official changelog | carried/account-adjacent | high | GitHub desktop agent 비교 후보. 계정/조직/비용 정책 확인 전 adoption 불가 |
| OpenAI Codex changelog and API deprecations | OpenAI | official docs | duplicate-source | high | Codex/API 변경 감시. 이번 회차의 새 운영 규칙 없음 |
| Next.js 16.3 AI/Turbopack posts | Vercel/Next.js | official blog | duplicate/project-specific | high | target Next.js repo가 있을 때만 version/runtime decision |
| Obsidian changelog | Obsidian | official changelog | duplicate/no-new-signal | high | Vault 운영 신호. 새 변경점 없음 |
| W3C WAI and Design Tokens | W3C | standards/news | duplicate/no-new-signal | high | 기존 accessibility/token checklist coverage와 중복 |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-08-2101-dex-company-growth-scan-fast-discovery-design-agent-no-new-signal.md`

## LLM Wiki inbox/source/wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- `00_Inbox/LLM_Wiki/ai-research/2026-07-03-10x-growth-scan-candidate-queue.md`: 변경 없음, 현재 queue는 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태 유지
- `70_Outputs/LLM_Wiki/growth-scans/`: report 1개 추가

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot app | deferred/account-adjacent | No | GitHub account, Copilot plan, organization policy, telemetry, cost/billing, local install 필요 |
| Storybook 10.4 automated setup | project-specific conditional | No | target repo, package manager, lockfile delta, config overwrite, test runtime, rollback 필요 |
| Figma Agent skills/custom tools | approval-not-ready/account-adjacent | No | Figma workspace/file permissions, connector scope, billing, prompt injection through design context, export/data boundary 필요 |
| Next.js 16.3 preview/tooling | project-specific conditional | No | preview/stable status, target repo version, browser/runtime compatibility, memory behavior, rollback 필요 |

## 중복으로 제외한 자료

- OpenAI Codex changelog: 기존 Codex changelog/source coverage와 중복.
- OpenAI API deprecations: 기존 API migration/deprecation lane과 중복.
- Next.js 16.3 AI/Turbopack: 기존 agent-readable frontend workflow와 memory-pressure coverage와 중복.
- Storybook 10.3 MCP/a11y: 기존 Storybook component testing/accessibility notes와 중복.
- Figma Agent skills/custom tools: 기존 Figma Agent/MCP/approval-ready notes와 중복.
- Obsidian changelog: 기존 Obsidian 1.13/Bases/CLI coverage와 중복.
- W3C WAI/WCAG and Design Tokens: 기존 PPT/frontend accessibility checklist와 design tokens coverage와 중복.

## 실패/차단/미확인 항목

- Not checked: GitHub Copilot app 실제 설치 가능성, Ethan GitHub plan/organization policy, local app runtime, telemetry/cost policy.
- Not checked: Figma workspace/file/connector/billing context, Figma custom tool runtime, design file sensitivity.
- Not checked: Storybook 10.4 automated setup이 특정 repo에서 만드는 config/lockfile diff와 rollback.
- Partial: NN/g design specs는 2026 영상 summary와 2025 상세 article로 교차 확인했지만, 2026 영상 transcript 전체는 확인하지 않았다.
- Not checked: Threads는 이번 회차에서 신뢰 근거로 쓰지 않았다.
- Blocked: 없음.

## 교차 검증 근거

- NN/g design specs 후보는 2026-07-06 NN/g 영상 summary와 2025 NN/g detailed article을 함께 확인했다. 따라서 이전 회차의 transcript 한계는 남지만 checklist 후보 근거는 강화됐다.
- Storybook agent setup 후보는 Storybook 10.4 blog와 Storybook 10.3 MCP/a11y blog를 대조했다. 둘 다 agent가 실제 component context와 tests를 써야 한다는 방향을 지지하지만, target repo 없이 자동 setup을 adoption하지 않는다.
- Figma Agent skills는 2026-07-01 skills article 및 custom tools/context article을 대조했다. 기존 Dex rule처럼 design-system context는 유용하지만 account/file/permission 확인 전에는 connector adoption 근거가 아니다.
- GitHub Copilot app은 GitHub official changelog label page와 July 7 article로 확인했다. adoption 판단은 local/account/policy 검증 전까지 보류한다.
- OpenAI/Next.js/Obsidian/W3C 신호는 official source와 기존 LLM Wiki coverage를 대조해 no-new-signal로 판정했다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: NN/g는 design spec이 layout, interaction, requirements, project scope 같은 구현 정보를 다뤄야 한다고 설명한다. Storybook/Figma/GitHub/OpenAI/Next.js 후보는 각 공식 출처에서 존재와 방향성이 확인된다.
- Dex inference: Dex Company PPT/frontend handoff에는 "디자인 파일 링크만 던지지 말고, 개발 issue 또는 handoff note에 구현 맥락을 별도 필드로 남긴다"는 체크가 유용하다.
- Not checked: 실제 에던님 프로젝트의 Figma 파일, GitHub 계정, frontend repo, Storybook runtime, Codex/mobile/GitHub app 설치 상태는 이번 회차에서 확인하지 않았다.

## 에던님이 바로 사용할 수 있는 예시

- PPT/frontend handoff 예시: 한 화면이나 한 슬라이드 변화마다 `layout`, `interaction`, `requirement`, `scope`, `dev issue context` 다섯 줄을 채운 뒤 개발자나 다음 Dex 세션에 넘긴다.
- Frontend QA 예시: Storybook/agent setup을 쓰고 싶다면 먼저 target repo, package version, generated config diff, story coverage, accessibility test command, rollback command를 approval packet에 넣는다.
- 디자인 시스템 예시: Figma Agent skills는 "브랜드 보이스/컴포넌트 사용법/접근성 점검" 같은 knowledge layer로는 좋지만, 실제 file access와 connector는 별도 승인 전까지 쓰지 않는다.

## Improvement Delta

- 개선된 점: 직전 회차에서 `carried-verified-summary`였던 NN/g design specs를 2026 영상 + 2025 detailed article로 다시 확인해 22:30 adoption selection의 구체 후보로 올렸다.
- 운영 규칙 변경: 없음. 30분 fast discovery에서는 durable source/wiki/checklist 변경을 억제하고, concrete operating rule 변경 가능성만 다음 회차로 넘긴다.
- 템플릿 학습: "agent setup"류 자료는 신기능 존재보다 `target repo`, `config diff`, `test command`, `rollback`이 없으면 project-specific conditional로 남긴다.

## Adoption Check

- 이전 action item: 22:30 adoption selection 전까지 NN/g design specs가 PPT/frontend checklist에 들어갈 수준인지 재판정한다.
- 채택 여부: carried.
- 이유: 2026 영상과 2025 article 교차 근거는 충분히 좋아졌지만, 지금은 21:01 fast discovery 회차라 checklist를 즉시 수정하지 않는다. 22:30 회차에서 "handoff context fields"로 반영 여부를 결정한다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| NN/g What are Design Specs? | carried-verified-summary | carried-for-22:30-checklist-decision | 2026 영상 summary와 2025 상세 article로 근거 강화. checklist 변경은 adoption selection까지 보류 |
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | official availability는 확인됐지만 account/plan/org policy/local install 검증 전 adoption 불가 |
| Storybook agent setup | duplicate/project-specific | deferred/project-specific | 10.4 신호는 유효하지만 기존 coverage와 중복. target repo 없이는 자동 setup 승인 불가 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. `growth-scan-preflight.ps1 -RepairSafe`를 먼저 실행하고 free RAM 1GB 이상을 확인한다.
2. 22:30 adoption selection 회차라면 NN/g design specs를 `PPT Frontend Visual Communication Checklist`에 `handoff context fields`로 반영할지 결정한다.
3. Storybook/Next.js/Figma/GitHub agent 후보는 source note보다 approval packet 필드가 먼저다: target, permission, config diff, test command, rollback, account/billing.
4. 새 source note는 concrete operating rule, approval field, QA field, artifact acceptance test 중 하나를 실제로 바꿀 때만 만든다.

## Prompt or Template Patch Candidate

후보 문구:

```text
For design-to-dev handoff candidates, do not treat a design file alone as sufficient. Check whether layout, interactions, requirements, project scope, and development issue context are explicitly recorded before marking a UI/PPT handoff ready.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-210144.md` |
| internet search | PASS | web search query 16개, official/source pages 확인 |
| duplicate check | PASS | automation memory, recent reports, queue, index/log, checklist, source coverage 확인 |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log/candidate queue 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package execution |
| source-backed / Dex inference / not checked 분리 | PASS | 별도 섹션에 분리 |
| status | PASS | source notes 160, wiki notes 7, status check completed |
| lint | PASS | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| audit | PASS_WITH_BACKLOG | notes checked 175, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | replacement character 없음 |
| watchdog | PASS_WITH_WARNINGS | no unauthorized install/write; RAM margin and account/repo-adjacent candidates remain |

## Watchdog 결과

- Verdict: PASS_WITH_WARNINGS
- Highest risk: free RAM PASS margin is thin, and GitHub/Figma/Storybook agent-app signals can look more actionable than they are without account/repo/runtime context.
- Rework needed: 없음.
- Not checked: GitHub Copilot app local runtime, Ethan GitHub/Figma account policy, Storybook 10.4 generated config diff in a real repo, NN/g 2026 video full transcript.

## Original Content

이번 보고서는 2026-07-08 21:01 KST Growth Scan 공개 검색 결과, preflight PASS 결과, 기존 LLM Wiki 중복 확인, NN/g design specs 교차 검증, Storybook/Figma/GitHub/OpenAI/Next.js 후보 재판정을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
