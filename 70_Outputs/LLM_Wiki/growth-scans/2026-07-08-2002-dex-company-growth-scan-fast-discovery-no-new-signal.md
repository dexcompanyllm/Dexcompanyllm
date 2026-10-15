---
type: llm-wiki-growth-scan-report
status: completed-no-new-signal
title: "Dex Company Growth Scan - 2026-07-08 20:02 KST"
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
  - "https://github.blog/changelog/month/07-2026/"
  - "https://nextjs.org/blog/next-16-3-ai-improvements"
  - "https://nextjs.org/blog/next-16-3-turbopack"
  - "https://vite.dev/blog"
  - "https://www.nngroup.com/articles/"
  - "https://www.figma.com/blog/got-skills-make-the-figma-agent-a-better-collaborator/"
  - "https://www.jobscan.co/blog/top-resume-keywords-boost-resume/"
  - "https://www.jobscan.co/blog/auto-apply-job-tools/"
collectionPurpose: "Dex Company Growth Scan 재개 회차에서 공개 자료 후보를 빠르게 발견하고, 기존 LLM Wiki 중복 여부와 다음 채택 후보를 분리해 기록한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - no-new-signal
  - fast-discovery
---

# Dex Company Growth Scan - 2026-07-08 20:02 KST

## Run Scope and Limits

- 실행 시각: 2026-07-08 20:02-20:05 KST
- 실행 모드: 30분 간격 fast discovery / candidate detection
- 검색 범위: OpenAI Codex, GitHub Copilot, Next.js/Vite frontend, NN/g UX, Figma Agent/design systems, Obsidian, Threads 공개 검색, career ops/ATS 자동지원 자료
- 제한: 22:30 daily adoption selection 시간이 아니므로 durable source/wiki note 저장은 보류했습니다.
- 설치/연결/권한 변경: 없음. SDK, MCP, connector, browser extension, GitHub workflow, Figma/GitHub/Codex app 연결을 실행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 16 | web search query 16개 |
| stored.count | 0 | 새 source/wiki note 없음 |
| duplicate.count | 8 | 기존 source/report가 이미 커버한 주요 신호 |
| deferred.count | 4 | 22:30 또는 실제 프로젝트 맥락에서 재판정 |
| blocked.count | 0 | preflight PASS, 접근 차단 없음 |
| lint.warning_count | 0 | `llm-wiki-lint.ps1` PASS |

## Preflight 결과

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260708-200218.md`
- free RAM: 1.16GB, threshold 1GB 이상
- `llm-wiki-status.ps1`: PASS
- `llm-wiki-lint.ps1`: PASS, warning 0
- UTF-8 replacement scan: PASS
- 운영 리스크: 직전 여러 회차가 free RAM 부족으로 실패했으므로, 이번 PASS는 회복 신호이지만 안정 여유가 크지는 않습니다.

## 오늘의 핵심 발견

1. OpenAI Codex changelog의 2026-07-06 iOS 항목은 conversation 안에서 Codex task 생성/검색/열기/포크/관리와 diff filter, attachment preview 같은 task-management 개선을 보여줍니다. 다만 기존 Codex changelog source coverage가 있으므로 새 노트로 저장하지 않았습니다.
2. GitHub July 2026 changelog는 Copilot app availability, usage metrics 개선, Copilot CLI `GITHUB_TOKEN`, agent session streaming, AI credit pools 같은 governance 신호를 다시 보여줍니다. 대부분 기존 GitHub/Copilot notes와 중복입니다.
3. Next.js 16.3 preview는 agent-facing AGENTS.md, first-party skills, agent browser, Markdown docs, Turbopack memory-pressure 개선을 다시 확인시켰습니다. 기존 `2026-07-03-nextjs-163-agent-readable-workflows`가 이미 커버합니다.
4. NN/g 최신 목록의 "What are Design Specs?"는 layout, interactions, requirements, project scope를 명시한 design-to-dev handoff 후보입니다. 영상/본문 검증이 충분하지 않아 이번에는 deferred로 둡니다.
5. Jobscan의 ATS keywords 및 auto-apply 글은 career ops에서 "auto-apply 금지/주의, tailor-first" 기준으로 유용할 수 있으나 vendor source이므로 공식 플랫폼 약관과 교차 검증 전에는 source note로 승격하지 않습니다.

## Evidence Table

| Candidate | Publisher | Type | Status | Evidence Quality | Dex Company 사용 예시 |
|---|---|---|---|---|---|
| Codex changelog 2026-07-06 iOS task management | OpenAI | official changelog | duplicate-source | high | 모바일에서 Codex task를 관리할 수 있다는 공개 신호. 로컬 Windows availability는 not checked. |
| GitHub Copilot app available to all | GitHub | official changelog | deferred/account-adjacent | medium | GitHub 기반 agent desktop 비교 후보. 실제 설치/로그인은 승인 필요. |
| Copilot usage metrics 개선 | GitHub | official changelog | duplicate-source | high | 기존 usage metrics coverage note와 중복. |
| Copilot CLI `GITHUB_TOKEN` in Actions | GitHub | official changelog | duplicate-source | high | 기존 token/billing note와 중복. |
| Copilot agent session streaming | GitHub | official changelog | duplicate-source | high | 기존 session streaming note와 중복. |
| Next.js 16.3 AI Improvements | Vercel / Next.js | official blog | duplicate-source | high | agent-readable frontend workflow 기준은 이미 저장됨. |
| Next.js 16.3 Turbopack memory update | Vercel / Next.js | official blog | duplicate-source | high | dev server memory-pressure QA는 기존 Next.js note와 preflight memory risk에 연결됨. |
| Vite 8.1 | Vite | official blog | duplicate/no-new-signal | medium | target repo 없이는 upgrade candidate로 올리지 않음. |
| NN/g What are Design Specs? | NN/g | article/video listing | deferred/partial | low-medium | design handoff checklist 후보. transcript/body 확인 필요. |
| Figma Agent Skills | Figma | vendor official blog | duplicate/account-adjacent | medium | 기존 Figma agent skills note와 중복. workspace/file/connector permission은 not checked. |
| Jobscan ATS keywords | Jobscan | vendor article | deferred-vendor | low-medium | career ops tailoring checklist 후보. vendor bias 존재. |
| Jobscan auto-apply risk | Jobscan | vendor article | deferred-vendor | low-medium | auto-apply vs auto-fill 구분, human review gate 후보. 플랫폼 약관 교차 검증 필요. |
| Threads Codex/Obsidian snippets | Threads public snippets | SNS discovery | not checked | low | discovery-only. source-backed evidence로 쓰지 않음. |

## 저장/흡수한 자료 목록

- 새 source note: 없음
- 새 wiki note: 없음
- 새 inbox note: 없음
- 새 report: 이 파일만 저장

## LLM Wiki 변경 이력

- `30_Knowledge/LLM_Wiki/sources/`: 변경 없음
- `30_Knowledge/LLM_Wiki/wiki/`: 변경 없음
- `00_Inbox/LLM_Wiki/`: 변경 없음
- `30_Knowledge/LLM_Wiki/index.md`: 변경 없음
- `30_Knowledge/LLM_Wiki/log.md`: 변경 없음
- `70_Outputs/LLM_Wiki/growth-scans/`: 이 no-new-signal report 추가

## 설치 후보 또는 실사 후보

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| GitHub Copilot desktop app | deferred/account-adjacent | No | GitHub account, plan, repo access, local app install, telemetry/cost policy 필요 |
| Next.js 16.3 preview / first-party skills / agent-browser | project-specific conditional | No | preview package, target repo, browser control, local runtime compatibility 필요 |
| Figma Agent skills/connectors | duplicate approval-not-ready | No | workspace permission, file sensitivity, prompt injection through design context, billing/account policy |
| Jobscan auto-apply tools | knowledge-only candidate | No | platform ToS, account suppression risk, personal data disclosure, vendor-reported metrics |

## 중복으로 제외한 자료

- Codex changelog: 기존 OpenAI/Codex changelog source coverage와 중복.
- GitHub Copilot usage metrics, `GITHUB_TOKEN`, agent session streaming, AI credit pools: 2026-07-04 GitHub governance notes와 중복.
- Next.js 16.3 AI/Turbopack: `2026-07-03-nextjs-163-agent-readable-workflows` source note와 중복.
- Figma Agent skills: `2026-07-04-figma-agent-skills-collaboration` 및 Figma Agent/MCP approval notes와 중복.
- Obsidian 1.13.1: 기존 Obsidian changelog/Bases/CLI coverage와 중복.
- Vite 8.1: 기존 Vite release tracking과 겹치며 target repo가 없어 no-new-signal.

## 실패/차단/미확인 항목

- Not checked: 로컬 Codex iOS/mobile pairing 상태, GitHub Copilot app 설치 가능성, GitHub plan/billing, Figma workspace/seat/connectors, Next.js 16.3 local runtime, Jobscan 주장에 대한 독립 검증.
- Partial: NN/g design specs는 최신 목록에서 확인했지만, 영상 transcript 또는 상세 본문까지 확인하지 못했습니다.
- Discovery-only: Threads는 공개 snippet만 확인했습니다. 로그인/차단 우회 없음.
- 운영 리스크: free RAM은 PASS였지만 1.16GB로 여유가 크지 않아, 다음 회차에서 다시 FAIL할 수 있습니다.

## 교차 검증 근거

- GitHub July signals는 공식 changelog와 기존 LLM Wiki GitHub/Copilot source notes를 대조했습니다.
- Next.js 16.3은 official Next.js AI Improvements/Turbopack posts와 기존 source note를 대조했습니다.
- Figma Agent skills는 official Figma blog와 기존 Figma agent skills / design-system context / approval-ready notes를 대조했습니다.
- Career ops 후보는 Jobscan 글 2개만으로는 부족합니다. 채택하려면 LinkedIn/Indeed/Greenhouse/Workday 등 플랫폼 약관 또는 공식 help 문서와 교차 검증해야 합니다.

## 에던님이 바로 사용할 수 있는 예시

- PPT 작업: NN/g design specs 후보는 "화면마다 layout, interaction, requirement, scope를 1줄씩 남긴다"는 handoff 체크로 바꿀 수 있습니다. 다만 이번에는 검증 부족으로 후보만 남깁니다.
- Frontend 작업: Next.js 16.3 신호는 agent가 코드를 쓰기 전에 version-matched docs, AGENTS.md, browser QA loop를 먼저 읽게 하는 기준으로 이미 흡수되어 있습니다.
- Career ops 작업: 자동지원 도구는 바로 쓰지 말고, auto-fill과 auto-apply를 분리한 뒤 "사람 검토 후 제출"을 기본 gate로 두는 쪽이 안전합니다.

## Improvement Delta

- 개선된 점: RAM FAIL 반복 뒤 첫 PASS 회차에서 새 source note를 억지로 만들지 않고, fast discovery 모드에 맞춰 중복/후보/이월을 분리했습니다.
- 운영 규칙 변화: 없음. 기존 "source note는 운영 규칙/승인 필드/QA 필드를 바꿀 때만 저장" 기준을 유지했습니다.
- 리스크 신호: free RAM stop-the-line은 해소됐지만 안정 여유가 작습니다. 다음 회차에서도 preflight-first를 유지해야 합니다.

## Adoption Check

- 이전 action item: preflight PASS 후 carried/deferred item 1개 이상 재판정.
- 채택 여부: done.
- 재판정 항목: Figma Agent/MCP/connector carried item.
- 결과: carried/account-adjacent 유지. 이번 Figma Agent Skills 재확인은 기존 source notes와 중복이고, 실제 workspace/file/export/billing 승인 패킷이 없으므로 연결·설치·사용 후보로 올리지 않았습니다.

## 이전 deferred/carried item 재판정

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| Figma Agent/MCP/connector | carried | carried/account-adjacent | 공식 신호는 계속 나오지만 기존 notes가 충분하고, 실제 파일 권한/connector/billing context가 없음 |
| RAM preflight recovery | blocked | done-with-risk | 이번 preflight는 PASS, 단 free RAM 1.16GB라 다음 회차 재확인 필요 |
| Career ops auto-apply risk | not tracked | deferred-vendor | 새 후보이지만 vendor source라 플랫폼 공식 약관 교차 검증 필요 |

## Next Eval

다음 실행에서 통과해야 할 작은 기준:

1. `growth-scan-preflight.ps1 -RepairSafe`를 먼저 실행하고 free RAM 1GB 이상을 확인합니다.
2. 22:30 daily adoption selection 회차라면 Jobscan auto-apply 후보를 플랫폼 공식 약관 1개 이상과 교차 검증해 `stored`, `carried-vendor`, `dropped`, `blocked` 중 하나로 판정합니다.
3. NN/g "What are Design Specs?"는 transcript/body를 확인할 수 있을 때만 PPT/frontend handoff checklist 후보로 올립니다.
4. GitHub/Figma/Next.js tool 후보는 설치나 connector 연결 없이 approval packet 필드만 점검합니다.

## Prompt or Template Patch Candidate

- 후보: fast discovery 모드 보고서에는 `Durable absorption decision: stored / duplicate / deferred / blocked / no-new-signal` 표를 기본 포함합니다.
- 후보 문구: "In fast discovery mode, do not promote vendor or account-adjacent items unless they add a concrete Dex Company rule; record them as deferred candidates for 22:30 adoption selection."

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260708-200218.md` |
| source/wiki 저장 금지 준수 | PASS | source/wiki/inbox/index/log 변경 없음 |
| 설치/연결 금지 준수 | PASS | no install, no connector, no SDK/MCP/package execution |
| duplicate check | PASS | local `rg` search over LLM Wiki, inbox, growth reports |
| source-backed / Dex inference / not checked 분리 | PASS | Evidence Table 및 미확인 항목에 분리 |
| status | PASS | source notes 160, wiki notes 7, status check completed |
| lint | PASS | 0 warning(s), unexplored notes 13, disputed notes 0, stale notes 0 |
| audit | PASS_WITH_BACKLOG | notes checked 175, missing v5 metadata 0, high confidence without Bias Check 0, disputed 0, stale 0, unexplored 13 |
| UTF-8 check | PASS | replacement character not found |
| report section check | PASS | required sections present |
| watchdog | PASS_WITH_WARNINGS | no unauthorized install/write; RAM margin and deferred vendor/account checks remain |

## Watchdog 결과

- Verdict: PASS_WITH_WARNINGS
- Highest risk: free RAM이 PASS 기준을 가까스로 넘은 상태라 다음 회차에서 다시 stop-the-line이 발생할 수 있습니다.
- Rework needed: 없음. 이번 회차는 fast discovery/no-new-signal로 닫는 것이 맞습니다.
- Not checked: 실제 GitHub/Figma/Codex/Next.js runtime availability, career platform official ToS.

## Original Content

이번 보고서는 2026-07-08 20:02 KST Growth Scan 재개 회차에서 확인한 공개 검색 결과, 기존 LLM Wiki source/report 중복 검색, stop-the-line preflight PASS 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 출처 URL, 확인 범위, 후보 판단, 미확인 범위만 보존합니다.
