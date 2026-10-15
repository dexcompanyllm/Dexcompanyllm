---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-08 20:32 KST"
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
  - "https://github.blog/changelog/2026-07-07-github-copilot-app-available-to-all/"
  - "https://developers.openai.com/api/docs/deprecations"
  - "https://www.nngroup.com/videos/what-are-design-specs/"
  - "https://www.jobscan.co/blog/auto-apply-job-tools/"
  - "https://www.linkedin.com/legal/user-agreement"
  - "https://www.indeed.com/legal"
  - "https://obsidian.md/changelog/"
  - "https://storybook.js.org/blog/"
collectionPurpose: "30분 fast discovery 회차에서 공개 자료 후보를 빠르게 확인하고, 기존 LLM Wiki와 중복되는 신호 및 다음 adoption selection 후보를 분리한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-08 20:32 KST

## Run Scope and Limits

- 실행 시각: 2026-07-08 20:32-20:38 KST
- 실행 모드: 30분 fast discovery / candidate detection
- 검색 범위: OpenAI Codex/API, GitHub Copilot, NN/g design handoff, Jobscan auto-apply, LinkedIn/Indeed policy, Obsidian, Storybook/frontend
- 변경 범위: source note, wiki note, inbox note, index, log는 변경하지 않았고 이 growth scan report만 저장했다.
- 설치/연결/권한 변경: 없음. SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing, executable package를 설치하거나 실행하지 않았다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 12 | web search query 12개 |
| stored.count | 0 | 새 source/wiki/inbox note 없음 |
| duplicate.count | 6 | Codex changelog, OpenAI deprecations, Obsidian changelog, Storybook agent/frontend, GitHub Copilot governance, Figma/Codex-adjacent 신호는 기존 coverage와 중복 |
| deferred.count | 2 | NN/g design specs, GitHub Copilot app은 각각 checklist 후보와 account-adjacent 후보로 유지 |
| blocked.count | 0 | preflight PASS, 접근 차단 없음 |
| lint.warning_count | 0 | 사후 lint PASS |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-203224.md`
- free RAM: 1.44GB, 기준 1GB 이상
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS
- 운영 리스크: free RAM은 직전 장애보다는 회복됐지만 아직 여유가 크지 않아 다음 회차도 preflight-first가 필요하다.

## 오늘의 핵심 발견

1. NN/g의 "What are Design Specs?"는 2026-07-06 공개 영상이며, design spec의 최소 범위를 layout, interactions, requirements, project scope로 제시한다. 이 신호는 PPT/frontend handoff checklist 후보로 유효하지만, fast discovery 회차라 durable checklist 변경은 보류한다.
2. Jobscan auto-apply 자료는 auto-fill과 auto-apply를 구분하는 데 유용하지만 vendor source다. LinkedIn User Agreement와 Indeed Terms가 자동화 접근/Indeed Apply 자동화를 제한하므로, Ethan career ops에서는 "자동 제출 금지, 사람 검토 후 제출"을 기본 게이트로 유지하는 쪽이 안전하다.
3. GitHub Copilot app은 2026-07-07 기준 모든 Copilot plan에 공개됐고 Windows/macOS/Linux를 언급한다. 다만 GitHub 계정, plan, 조직 정책, local install이 걸려 있어 Dex Company에서는 account-adjacent 후보로만 둔다.
4. OpenAI API fine-tuning self-serve 제한은 2026-07-02 업데이트가 확인됐지만, 이미 API deprecation lane에서 다룬 성격과 겹친다. 새 Dex 운영 규칙을 만들지는 않는다.
5. Obsidian과 Storybook 최신 신호는 기존 LLM Wiki의 Obsidian changelog, Storybook MCP/component QA coverage와 중복이다.

## Evidence Table

| Candidate | Publisher | Type | Status | Evidence Quality | Dex Company 사용 예시 |
|---|---|---|---|---|---|
| NN/g What are Design Specs? | NN/g | video/article listing | carried-verified-summary | medium | 화면별 handoff가 layout, interaction, requirement, scope를 빠뜨리지 않았는지 점검하는 checklist 후보 |
| Jobscan auto-apply tools | Jobscan | vendor article | split: dropped-for-auto-submit / carried-for-human-review-autofill | medium-low | 구직 자동화에서 submit 대행은 피하고, form-fill + 사람 검토 제출만 허용하는 경계 |
| LinkedIn User Agreement automation clauses | LinkedIn | official policy | source-backed cross-check | high | LinkedIn 기반 자동지원 도구를 승인하지 않는 근거 |
| Indeed Terms automation clause | Indeed | official policy | source-backed cross-check | high | Indeed Apply 자동화 도구를 승인하지 않는 근거 |
| GitHub Copilot app available to all | GitHub | official changelog | deferred/account-adjacent | high | GitHub agent desktop 비교 후보. 설치, 로그인, 정책 확인 전에는 adoption 불가 |
| OpenAI API fine-tuning deprecation update | OpenAI | official deprecation docs | duplicate-source | high | API migration/deprecation 주기 점검. 새 운영 규칙은 없음 |
| Obsidian changelog | Obsidian | official changelog | duplicate-source | high | Vault 운영 신호. 이번 회차의 새 변경점 없음 |
| Storybook blog | Storybook | official blog | duplicate/no-new-signal | medium | agent/frontend component QA 신호. 기존 Storybook coverage와 중복 |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-08-2032-dex-company-growth-scan-fast-discovery-career-handoff.md`

## LLM Wiki inbox/source/wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- `70_Outputs/LLM_Wiki/growth-scans/`: report 1개 추가

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot app | deferred/account-adjacent | No | GitHub account, Copilot plan, org policy, local install, telemetry/cost policy 필요 |
| Jobscan Auto Apply | approval-not-ready for auto-submit; knowledge-only for autofill boundary | No | platform ToS, account suppression, personal data disclosure, vendor-reported results |
| Storybook 10.4 agent setup | duplicate/project-specific | No | target repo, package version, test runtime, dependency update risk 필요 |

## 중복으로 제외한 자료

- OpenAI Codex changelog: 기존 Codex changelog/source coverage와 중복.
- OpenAI API deprecations: 기존 API migration/deprecation lane과 중복. 이번 fine-tuning update는 project-specific 영향이 있을 때만 재확인하면 된다.
- Obsidian changelog: 기존 Obsidian 1.13/Bases/CLI coverage와 중복.
- Storybook agent/frontend blog: 기존 Storybook MCP/component/a11y QA coverage와 중복.
- GitHub Copilot governance 신호: 기존 Copilot CLI, usage metrics, token/billing, session streaming notes와 겹친다.

## 실패/차단/미확인 항목

- Not checked: GitHub Copilot app 실제 설치 가능성, Ethan GitHub plan/organization policy, local app runtime, Jobscan 실제 제출 플로우, LinkedIn/Indeed 계정별 enforcement 결과.
- Partial: NN/g design specs는 요약/날짜/주제는 확인됐지만 전체 영상 transcript 기반 세부 항목은 확인하지 않았다.
- Not checked: Threads는 이번 회차에서 별도 신뢰 근거로 쓰지 않았다.
- Blocked: 없음.

## 교차 검증 근거

- Jobscan의 auto-apply 위험 설명은 LinkedIn User Agreement의 automated methods 제한 및 Indeed Terms의 Indeed Apply automation 제한과 교차 확인했다.
- NN/g design specs 후보는 NN/g 자체 페이지와 NN/g 최신 목록 노출로 현재성을 확인했다. 다만 checklist 흡수는 다음 adoption selection에서 영상/요약 범위가 충분한지 재검토해야 한다.
- GitHub Copilot app 후보는 GitHub 공식 changelog로 확인했지만, Dex Company adoption에는 account/plan/policy 확인이 필요하므로 보류했다.
- OpenAI/Obsidian/Storybook 신호는 공식 changelog/blog로 확인했고, 기존 LLM Wiki coverage와 대조해 새 source note를 만들지 않았다.

## Source-Backed / Dex Inference / Not Checked

- Source-backed: LinkedIn과 Indeed는 자동화된 접근 또는 Indeed Apply 자동화를 제한한다. Jobscan 글 자체도 auto-apply가 submit 단계 대행이라는 점과 위험 프로필이 다르다는 점을 구분한다.
- Dex inference: Ethan career ops에서는 `auto-submit`보다 `auto-fill + 사람 검토 + 사람 제출`을 기본 허용선으로 두는 것이 안전하다.
- Not checked: 각 플랫폼이 실제로 어떤 빈도와 방식으로 계정을 제한하는지는 이 회차에서 계정 실험을 하지 않았으므로 확인하지 않았다.

## 에던님이 바로 사용할 수 있는 예시

- PPT/frontend handoff: 각 화면 또는 slide interaction마다 `layout`, `interaction`, `requirement`, `scope` 네 줄을 채우는 체크를 다음 체크리스트 후보로 둔다. 이번 회차에서는 후보까지만 기록했다.
- Career ops: 자동지원 도구를 검토할 때 "이 도구가 submit을 대신 누르는가?"를 첫 질문으로 둔다. 대신 누르면 보류/차단, 사용자가 검토 후 제출하면 제한적 보조 도구로만 평가한다.

## Improvement Delta

- 개선된 점: 직전 deferred였던 Jobscan auto-apply 후보를 공식 플랫폼 정책과 교차 검증해 `auto-submit은 dropped/blocked 성격`, `human-review autofill은 carried`로 분리했다.
- 운영 규칙 변경: 없음. 기존 "설치/연결/자동 제출은 승인 전 금지"와 "source note는 concrete operating rule을 바꿀 때만 생성" 규칙을 유지했다.
- 보고서 템플릿 후보: fast discovery에서도 durable absorption decision 표를 유지하면 22:30 adoption selection 때 판단 비용이 줄어든다.

## Adoption Check

- 이전 action item: Jobscan auto-apply 후보를 플랫폼 공식 약관 1개 이상과 교차 검증.
- 채택 여부: done.
- 결과: Jobscan auto-apply는 source note로 승격하지 않는다. career ops 운영에서는 `auto-submit`을 dropped/blocked 성격으로 보고, `auto-fill + 사람 검토 제출`만 carried 후보로 남긴다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| Jobscan auto-apply risk | deferred-vendor | split: dropped-for-auto-submit / carried-for-human-review-autofill | LinkedIn/Indeed 공식 정책이 자동화 제출 위험을 뒷받침함. 단순 autofill은 사람 검토가 있으면 별도 평가 가능 |
| NN/g What are Design Specs? | deferred/partial | carried-verified-summary | NN/g 페이지에서 날짜와 핵심 요약은 확인. 전체 transcript 기반 checklist 승격은 아직 보류 |
| GitHub Copilot app | deferred/account-adjacent | carried/account-adjacent | 공식 공개는 확인됐지만 account/plan/org policy/local install 검증 전 adoption 불가 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. `growth-scan-preflight.ps1 -RepairSafe`를 먼저 실행하고 free RAM 1GB 이상을 확인한다.
2. 22:30 adoption selection 회차라면 NN/g design specs를 PPT/frontend checklist에 반영할지, 아니면 영상-only 근거 부족으로 carried 유지할지 결정한다.
3. Career ops 자동화 후보는 `auto-submit`, `auto-fill`, `resume tailoring`, `tracking only` 네 범주로 분리해 평가한다.
4. GitHub Copilot app은 설치 후보가 아니라 account-adjacent watch item으로만 유지한다.

## Prompt or Template Patch Candidate

후보 문구:

```text
For career-ops automation candidates, classify tools as auto-submit, auto-fill, tailoring, or tracking-only. Treat auto-submit as approval-not-ready or blocked unless official platform policy and Ethan approval explicitly allow it.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-203224.md` |
| internet search | PASS | web search query 12개, source pages opened |
| duplicate check | PASS | 최근 report, queue, index/log, relevant source coverage 확인 |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package execution |
| source-backed / Dex inference / not checked 분리 | PASS | 별도 섹션에 분리 |
| status | PASS | 사후 `llm-wiki-status.ps1` 통과 |
| lint | PASS | 사후 `llm-wiki-lint.ps1` warning 0 |
| audit | PASS_WITH_BACKLOG | unexplored backlog는 남지만 v5/high-confidence/disputed/stale 위험 없음 |
| UTF-8 check | PASS | replacement character 없음 |
| watchdog | PASS_WITH_WARNINGS | 새 durable note를 만들지 않은 판단은 적절하지만 RAM 여유와 account-adjacent 후보는 계속 주의 필요 |

## Watchdog 결과

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Jobscan/auto-apply 같은 career ops 도구는 편의성이 높아 보이지만 account restriction, personal data disclosure, platform policy 위반 가능성이 있으므로 자동 제출은 adoption하지 않는다.
- Rework needed: 없음.
- Not checked: 실제 LinkedIn/Indeed 계정 enforcement, GitHub Copilot app runtime, NN/g 영상 전체 transcript.

## Original Content

이번 보고서는 2026-07-08 20:32 KST Growth Scan 공개 검색 결과, preflight PASS 결과, 기존 LLM Wiki 중복 확인, Jobscan/LinkedIn/Indeed 교차 검증, NN/g design specs 후보 재판정을 요약한 운영 기록이다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존한다.
