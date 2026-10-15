---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan MCP Apps Maturity Closeout - 2026-07-03 22:04 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T22:04:54+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
confidence: medium
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

# Dex Company Growth Scan MCP Apps Maturity Closeout - 2026-07-03 22:04 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 22:04 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault AGENTS/Dex Company/역할 라우팅/LLM Wiki 운영 문서, LLM Wiki index/log, Growth Scan improvement guide, 최근 21:33/21:03/20:33 보고서, 10x candidate queue, GitHub ext-apps issues/discussions, GitHub REST issue API, MCP draft changelog, SEP-2577, OWASP LLM Top 10, WCAG 2.2, Threads 공개 검색.
- 실행 초점: 직전 Next Eval의 남은 `eligible-next=4` MCP Apps 이슈/디스커션 후보를 현재 상태, maintainer/reproducibility signal, Dex Company 운영 관련성 기준으로 재판정.
- 제외: package, MCP server, browser extension, skill, plugin, npm/npx/bun 실행은 하지 않았다. X는 검색 대상에서 제외했다.
- 저장 원칙: 원문 전체를 복사하지 않고 URL, 메타데이터, 요약, 검증 범위, Dex Company 사용 판단만 보존했다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 14 |
| stored.count | 1 |
| duplicate.count | 0 |
| deferred.count | 0 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. 남은 4개 MCP Apps 후보는 모두 새 기능 도입 근거라기보다 “아직 기본 설치로 삼으면 안 되는 성숙도 리스크”를 보여준다.
2. ext-apps issue list는 2026-07-03 기준 open issues 93개를 보여줬고, 2026년 6-7월에도 host behavior, CLI apps, preferred size, install failure, autoResize 같은 기본 UX/호스트 이슈가 계속 올라오고 있었다.
3. Issue #684는 embedded app을 대화 중 계속 참조하고 싶은 실제 UX 요구를 보여주지만, 아직 open enhancement다. Dex Company는 MCP App UI를 설계할 때 “화면이 뜬다”와 “대화 전체에서 고정/지속된다”를 분리해 QA해야 한다.
4. Discussion #474의 app-side sampling 아이디어는 유용하지만, MCP draft changelog와 SEP-2577은 Sampling을 새 구현 기본값으로 채택하지 말라는 방향을 제시한다. 따라서 Dex Company 기본 설계는 host sampling보다 명시적 provider/tool 경계를 우선한다.
5. Discussion #606의 JSON-LD discovery proposal은 장기적으로 source discovery에 유용할 수 있으나, 현재는 discussion-only라 공식 운영 규칙으로 승격하지 않았다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-mcp-apps-issues-discussions-maturity-audit.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | MCP Apps issues/discussions maturity audit source note 1개 추가 |
| Inbox queue | item 20-23을 `eligible-next`에서 `audit-done`으로 재분류 |
| Queue count | `eligible-next=0`, `audit-done=8`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=8`, `not-checked=8`, `install-audit-next=0` |
| Index | maturity audit source와 이 보고서 링크 추가 |
| Log | 22:04 scheduled growth scan entry 추가 |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| ext-apps issues list | GitHub issue list | source-backed: open issues 93, recent open issue examples; Dex inference: maturity QA required; not checked: full private/login-only metadata | medium |
| Issue #684 Pinned or Split Screen MCP Apps | GitHub issue + REST API | source-backed: open enhancement, opened 2026-06-03, updated 2026-06-11, 1 comment; Dex inference: persistent UI is unsolved host UX gap | high |
| Discussion #474 MCP App Sampling | GitHub discussion + MCP docs | source-backed: proposal and 1 comment; source-backed cross-check: MCP draft/SEP-2577 Sampling deprecation; Dex inference: do not use host sampling as Dex default | medium |
| Discussion #606 JSON-LD MCP App Discovery | GitHub discussion | source-backed: JSON-LD proposal, security considerations, implementation path, open questions; Dex inference: discovery reference only | medium |
| Threads MCP/App search | public search snippets | source-backed: snippets only; Dex inference: discovery-only; not checked: reliable page extraction | low |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| MCP Apps as Dex Company default UI layer | install-audit-conditional | No | Host UX, persistence, CSP/CORS, permissions, model access, and runtime compatibility remain project-specific. |
| App-side host sampling | blocked-by-default | No | MCP official draft/SEP-2577 marks Sampling as a deprecated direction for new implementations. |
| JSON-LD MCP App discovery | research-only | No | Discussion proposal, not stable spec or registry rule. |

## Duplicate / Rejected / Deferred

- duplicate: 없음. 남은 4개 후보는 기존 source note와 완전 중복이 아니어서 하나의 maturity audit source note로 묶었다.
- rejected: 없음. 다만 #474 sampling은 Dex Company 기본 구현 후보에서는 `blocked-by-default`로 분리했다.
- deferred: 0. 10x queue의 `eligible-next`는 이번 실행에서 0으로 닫혔다.

## Failure / Blocked / Not Checked

- blocked: app-side host sampling은 현재 MCP deprecation 방향과 충돌하므로 Dex Company 기본값으로 막았다.
- not checked: GitHub 로그인 뒤 표시될 수 있는 전체 reactions/detail, GraphQL discussion metadata, Codex Desktop에서의 MCP Apps host 호환성, 실제 split screen/pinned UI 지원 여부, package install/runtime.
- Threads: 공개 검색 snippets는 확인했지만 source-backed 흡수 가치가 낮아 승격하지 않았다.

## Cross Verification Evidence

- GitHub issue #684은 공개 HTML과 GitHub REST API로 교차 확인했다.
- Discussion #474는 MCP draft changelog와 SEP-2577의 Sampling deprecation 근거로 교차 검증했다.
- Discussion #606은 자체 보안 고려사항을 확인했지만, 공식 spec rule이 아니므로 confidence를 medium으로 낮췄다.
- 설치/보안 판단은 기존 MCP Apps overview, CSP/CORS, permissions API, resource metadata, registerAppResource, Agent Skills, PDF server audit source notes와 연결했다.
- WCAG 2.2 연결: persistent/split embedded UI는 keyboard operation, focus order, visible focus, name/role/value, reading order를 실제 host 안에서 확인해야 한다. 이 이슈 자체가 WCAG 문서는 아니므로 “간접 QA 기준”으로 연결했다.

## Ethan Can Use This Immediately

- MCP Apps를 도입할지 볼 때 “MCP App이 멋져 보인다”가 아니라 “대화 중 계속 보이는가, 포커스가 유지되는가, 파일/네트워크/모델 접근이 어디서 승인되는가”를 먼저 보시면 됩니다.
- Growth Scan dashboard나 LLM Wiki source explorer를 MCP App으로 만들고 싶다면, 첫 프로토타입 조건은 SDK 설치가 아니라 `host UX capability checklist` 작성입니다.
- Sampling류 기능은 지금은 기본값으로 두지 말고, 명시적 provider API 또는 tool parameter 흐름으로 설계하는 편이 더 안전합니다.

## Improvement Delta

- 10x candidate queue의 `eligible-next`를 4에서 0으로 줄였다.
- “MCP Apps 후보”를 더 이상 넓은 후보로 방치하지 않고, issue/discussion maturity audit source note로 닫았다.
- 다음 실행이 같은 MCP Apps broad scan을 반복하지 않도록 `no default install`, `project-specific conditional`, `sampling blocked-by-default` 결론을 남겼다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=4` 재판정 기준을 수행했다.
- done: issue date, current open state, reproducibility/maintainer signal, Dex Company operational relevance를 분리해 기록했다.
- done: 새 source note가 필요 없으면 no-op으로 끝내라는 기준은 검토했으나, 4개 후보를 닫는 단일 audit note는 재사용 가치가 있어 저장했다.
- carried: future Threads source-backed promotion은 여전히 공식 문서/RSS/GitHub/YouTube transcript 교차 검증이 있을 때만 한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| ext-apps issues list | eligible-next | done | issue list checked; maturity audit source note created |
| Issue #684 pinned/split screen | eligible-next | done | open enhancement metadata checked via GitHub page/API |
| Discussion #474 app sampling | eligible-next | done / blocked-by-default for implementation | checked against MCP draft changelog and SEP-2577 |
| Discussion #606 JSON-LD discovery | eligible-next | done / research-only | proposal checked; not stable spec rule |

## Next Eval

다음 실행은 아래 기준을 통과해야 한다.

1. `eligible-next=0` 상태를 유지하고, 낮은 가치의 MCP Apps broad source를 반복 저장하지 않는다.
2. 새 source note를 만들려면 MCP Apps 외 다른 lane에서 공식/고품질 자료 3개 이상이 새로 확인되었거나, 기존 `not-checked=8` 중 최소 2개를 `dropped`, `stored-source`, `carried`로 재판정한다.
3. MCP Apps 관련 작업이 다시 나오면 broad scan이 아니라 구체적 use case 기준의 host/runtime/security checklist로 시작한다.

## Prompt or Template Patch Candidate

```text
When a 10x Growth Scan queue reaches eligible-next=0, switch the next run from broad collection to backlog hygiene. Rejudge not-checked/vendor items or scan other lanes for genuinely new official sources. Do not create another MCP Apps source note unless a concrete Dex Company use case or new official spec change is found.
```

## Questions / Tracking Candidates

- `not-checked=8` vendor/research comparison items 중 Dex Company에 실제 가치가 없는 것은 다음 실행에서 `dropped`로 정리할지 판단한다.
- MCP Apps를 실제로 쓸 후보가 생기면 “PDF review board” 또는 “LLM Wiki source explorer” 중 하나만 골라 project-specific threat model을 만든다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement model checked |
| Recent reports checked | passed | 21:33, 21:03, 20:33 reports and queue checked |
| Public web search | passed | GitHub, MCP docs, OWASP, W3C, Threads searched |
| Duplicate check | passed | index/log/source/queue reviewed before writing |
| Queue reclassification | passed | `eligible-next=0`, `audit-done=8` |
| Source schema | passed | fallback schema check returned 0 warnings |
| Status script | passed | `llm-wiki-status.ps1` completed; source notes count is 88 |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | New/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install commands run |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: MCP Apps issue/discussion evidence is useful for direction but not sufficient for runtime adoption.
- Mitigation: kept MCP Apps as project-specific conditional only, blocked sampling as a default implementation path, and avoided install commands.
- Not checked: package/runtime install, Codex Desktop host compatibility, full GitHub GraphQL discussion metadata, reliable Threads source extraction.
