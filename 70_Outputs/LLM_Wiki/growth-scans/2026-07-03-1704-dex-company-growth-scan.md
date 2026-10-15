---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-03 17:04 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T17:04:28+09:00
runMode: scheduled
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
---

# Dex Company Growth Scan - 2026-07-03 17:04 KST

## Summary

이번 실행은 덱스 컴퍼니의 정규 Growth Scan으로, 공개 자료를 통해 운영 지식을 보강했다. 저장은 source note 6개, 보고서 1개이며, 실행 코드나 외부 스킬은 설치하지 않았다.

## Run Scope and Limits

- 실행 시각: 2026-07-03 17:04 KST
- 검색 범위: design systems, AI agents, Codex, OpenAI API, UX research, frontend, Obsidian, LLM Wiki, automation, career ops
- 확인 채널: OpenAI official docs/changelog, GitHub repositories/issues, Obsidian official roadmap/changelog, NN/g topic index, MCP official GitHub repository
- 제외 채널: X
- Threads: 이번 실행에서는 새로 source-backed note로 승격할 만큼 검증 가능한 본문 자료를 확보하지 못했다. 기존 Threads inbox 제한 기록을 유지한다.

## Today's Core Findings

1. OpenAI API 신규/기존 agent 설계는 Responses API, Agents SDK, ChatKit, Workspace Agents 방향으로 정리해야 한다. Agent Builder와 Assistants API는 장기 설계 기본값으로 두면 위험하다.
2. OpenAI web search tool에는 domain filtering, source listing, external web access 같은 성장 스캔 품질에 직접 연결되는 제어 기능이 있다.
3. Codex 0.142.x changelog는 trace logging 보안 fix, plugin recommendation/install 흐름, token budget, multi-agent delegation 설정을 운영 리스크로 보게 만든다.
4. MCP Apps는 인터랙티브 MCP UI의 유력한 후보지만, 실행 코드와 설치 가능한 skill/server를 포함하므로 자동 설치가 아니라 후보 감사 대상이다.
5. Obsidian roadmap과 NN/g AI UX index는 Dex Company가 단순 Markdown 저장소를 넘어 dashboard, context architecture, critique/eval 중심 작업으로 개선될 수 있음을 보여준다.

## Evidence Table

| Candidate | Type | Evidence quality | Confidence | Status |
|---|---|---:|---:|---|
| OpenAI API Deprecations - Agent Builder and Assistants API | official docs | high | high | stored |
| OpenAI Web Search Tool Controls | official docs | high | high | stored |
| OpenAI Codex CLI 0.142.5 and 0.142.0 Changelog | official release notes | high | high | stored |
| MCP Apps ext-apps Official Repository | official GitHub repo | medium | medium | stored, install candidate only |
| Obsidian Roadmap - Bases, Work, and Settings Search | official roadmap | high | high | stored |
| NN/g Artificial Intelligence UX Current Index | article index | medium | medium | stored |

## Stored Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-api-deprecations-agent-builder-assistants.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-web-search-tool-controls.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-cli-01425-changelog.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-mcp-apps-ext-apps-official-repo.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-obsidian-roadmap-bases-work-settings.md`
- `30_Knowledge/LLM_Wiki/sources/articles/2026-07-03-nngroup-ai-ux-current-index.md`

## LLM Wiki Changes

- `30_Knowledge/LLM_Wiki/index.md`: Important Notes에 새 source note와 이번 report를 추가했다.
- `30_Knowledge/LLM_Wiki/log.md`: 이번 scheduled growth scan의 source 저장 내역을 append했다.
- `70_Outputs/LLM_Wiki/growth-scans/`: 이번 실행 report를 추가했다.
- `00_Inbox/LLM_Wiki/`: 새 inbox note는 만들지 않았다. provenance가 충분한 자료만 source note로 저장했다.

## Stored / Rejected / Deferred

### Stored

- OpenAI API deprecations: 신규 agent 설계 기본값을 Responses API/Agents SDK로 잡기 위해 저장했다.
- OpenAI web search tool controls: growth scan의 domain/source control 기준으로 저장했다.
- Codex changelog 0.142.x: trace logging, plugin install, token budget, multi-agent delegation 운영 리스크로 저장했다.
- MCP Apps ext-apps: interactive UI 후보이되 설치 후보로만 저장했다.
- Obsidian roadmap: Bases/Work/Settings search의 future dashboard 방향으로 저장했다.
- NN/g AI UX topic index: AI UX 품질 기준의 current index로 저장했다.

### Rejected as Duplicate

- Career Ops v1.16.0: 이미 `2026-07-03-career-ops-v1160.md`가 있다.
- Playwright releases: 이미 `2026-07-03-playwright-release-notes-web-testing.md`가 있다.
- React official blog: 이미 `2026-07-03-react-official-blog-as-frontend-source.md`가 있다.
- OWASP LLM Top 10: 이미 직전 실행에서 저장했다.
- WCAG 2.2: 이미 직전 실행에서 저장했다.
- W3C Design Tokens: 이미 `2026-07-03-w3c-design-tokens-first-stable.md`가 있다.

### Deferred

- MCP Apps actual skill/plugin install: README와 spec 수준은 저장했지만, package files, scripts, permissions, security policy, license 전문 감사 전에는 설치하지 않는다.
- Individual NN/g articles: topic index는 저장했지만, 개별 article은 다음 실행에서 실제로 반복 활용 가치가 높은 글만 별도 source note로 승격한다.
- OpenAI Cookbook iterative repair loops: 직전 보고서의 deferred 후보였고 아직 notebook raw 내용까지 충분히 검토하지 못했다. carried.

## Failure Pattern

- Threads는 공개 SNS 검색 대상으로 유지하지만, 본문 추출/검증이 막히면 source note가 아니라 inbox 또는 not checked로 둔다.
- GitHub 저장소는 가치가 높아도 실행 코드가 섞여 있으면 knowledge ingest와 install decision을 분리해야 한다.
- OpenAI/Codex 자료는 변화가 빠르므로 매번 공식 docs/changelog를 우선 확인해야 한다.

## Installation or Skill Candidates

| Candidate | Status | Reason | Risk |
|---|---|---|---|
| modelcontextprotocol/ext-apps skills | candidate only, not installed | MCP Apps interactive UI and migration helpers may help future Dex Company tools | 실행 코드, npm packages, examples, permissions, license/security review 필요 |

## Cross Verification

- OpenAI deprecations는 OpenAI deprecations page와 migrate-to-Responses guide로 교차 확인했다.
- OpenAI web search controls는 OpenAI web search guide와 API changelog entry point로 교차 확인했다.
- Codex changelog는 OpenAI Codex changelog와 openai/codex GitHub repository 존재로 교차 확인했다.
- MCP Apps는 official GitHub repo, stable spec path, README, release/license/security links 존재로 partial 확인했다.
- Obsidian roadmap은 official roadmap과 changelog entry point로 확인했다.
- NN/g AI UX index는 NN/g topic page의 article list를 확인했으나 개별 article 전문 검토는 partial이다.

## Source-Backed / Dex Inference / Not Checked

- source-backed: 위 source note의 URL, publisher, 공식 문서/공식 repo/공식 roadmap 존재, 주요 변경 방향.
- Dex inference: Dex Company QA 항목, 자동화 프롬프트 후보, 설치 보류 판단, Obsidian dashboard 적용 예시는 출처를 운영 흐름에 적용한 판단이다.
- not checked: 로컬 Codex 버전, 로컬 Obsidian 버전, MCP Apps package/script 보안 전문, NN/g 개별 article 전체, OpenAI API 실제 호출 결과.

## Ethan Can Use This Immediately

- OpenAI API 작업을 시작할 때: "Assistants/Agent Builder로 만들지 말고 Responses API/Agents SDK 기준으로 설계해 주세요"라고 지시하면 된다.
- Growth Scan을 강화할 때: "검색 결과마다 sources field 또는 출처 URL 목록을 남기고, 공식 도메인 필터 여부를 QA에 넣어 주세요"라고 적용할 수 있다.
- Codex 운영을 점검할 때: plugin 추천, token budget, multi-agent delegation, trace logging 노출을 별도 체크리스트로 볼 수 있다.
- MCP Apps를 검토할 때: 설치 전에 README, license, package, scripts, permissions, supply-chain risk를 먼저 감사해야 한다.
- Obsidian 운영을 개선할 때: Bases Kanban/Calendar가 성숙하면 growth scan 후보와 project QA backlog를 Bases view 후보로 검토하면 된다.

## Improvement Delta

- 검색 자동화 기준 개선: OpenAI web search source-listing/domain filtering 개념을 growth scan QA 항목 후보로 추가했다.
- API 설계 기준 개선: Agent Builder/Assistants API deprecation을 신규 OpenAI agent 설계의 마이그레이션 게이트로 반영했다.
- Codex 운영 기준 개선: plugin install, token budget, multi-agent delegation, trace logging을 운영 리스크 항목으로 분리했다.
- 설치 안전성 개선: MCP Apps는 source-backed 지식으로 저장하되 실행 후보는 사용자 승인 전 설치하지 않는 규칙을 재확인했다.
- UX 균형 개선: NN/g AI UX index를 추가해 엔지니어링 release note 중심 스캔을 human-centered QA와 연결했다.

## Adoption Check

- done: 직전 report에서 요구한 `Improvement Delta`, `Adoption Check`, `Next Eval`, `Prompt or Template Patch Candidate`, `QA Scorecard` 섹션을 이번 report에 포함했다.
- done: OWASP/WCAG 기반 "실행 코드 설치 금지"와 "프론트엔드 QA criterion" 규칙을 이번 MCP Apps/UX 후보 판단에 적용했다.
- carried: OpenAI Cookbook iterative repair loop notebook은 아직 충분히 검토하지 못해 다음 실행 후보로 유지한다.
- carried: Threads는 포함 대상이지만 검증 가능한 본문 자료가 없으면 source-backed로 승격하지 않는 정책을 유지한다.

## Next Eval

- 다음 실행은 최소 1개 후보에서 `source` URL 2개 이상 또는 공식 URL + GitHub/Docs 교차 근거를 명시해야 한다.
- 다음 실행은 deferred item 중 하나를 done/carried/dropped/blocked로 반드시 판정해야 한다.
- OpenAI Cookbook iterative repair loop를 raw notebook, official cookbook path, related docs 기준으로 source note 승격 가능 여부를 판단한다.
- MCP Apps 후보가 다시 나오면 license/security/package/scripts 감사 체크리스트를 별도 표로 채운다.

## Prompt or Template Patch Candidate

```text
For each stored source, include a "search/source control" line: whether official-domain filtering, source listing, or cross-source verification was used. If not, mark the confidence as partial or lower.

When a source is about OpenAI agent APIs, check the current deprecations page before recommending new architecture. Treat Assistants API and Agent Builder sources as migration context unless the latest official docs say otherwise.

When a source is a GitHub repository with installable skills, MCP servers, plugins, or examples, store it as knowledge only and add an installation candidate audit table. Do not install without Ethan approval.
```

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| 현재 폴더 확인 | passed | `D:\CodexProjects\codex setup` 확인 |
| Dex Company 문서 확인 | passed | AGENTS, DEX_COMPANY_OVERVIEW, ROLE matrix/router, LLM_WIKI_OPERATING_GUIDE, index/log 확인 |
| Improvement model 확인 | passed | `LLM Wiki Growth Scan Report Improvement Model` guide 확인 |
| 실제 인터넷 검색 | passed | OpenAI, GitHub, Obsidian, NN/g, MCP 자료 검색 및 확인 |
| 후보 5-12개 선별 | passed | 6개 저장, 중복 6개 제외, deferred 3개 |
| 중복 확인 | passed | `rg`로 기존 LLM Wiki/source/inbox/output 검색 |
| 설치 금지 준수 | passed | MCP Apps는 candidate only, not installed |
| Source note schema | passed after write | 6개 모두 필수 frontmatter와 `## Original Content` 포함 |
| Lint/status | passed | 최종 실행에서 status/lint pass, warning 0개 |
| UTF-8 확인 | passed | 추가/수정 파일에서 replacement character 없음 |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: MCP Apps 저장소는 공식 repo이지만 실행 가능한 skills/server examples를 포함하므로 설치 후보 감사 전에는 사용하면 안 된다.
- Not checked: 로컬 Codex 버전, 로컬 Obsidian 버전, MCP Apps package/script/security/license 전문, NN/g 개별 article 전문, OpenAI API 실제 호출.
- Skill note: 현재 세션의 callable skill 목록에는 `llm-wiki` skill 본문이 노출되지 않아, Vault의 `LLM_WIKI_OPERATING_GUIDE.md`, role routing 문서, existing helper/lint/status scripts로 대체했다.

## Decision

이번 실행은 "덱스가 스스로 재학습했다"가 아니라, 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다. 다음 작업에서 OpenAI agent 설계, Codex 운영, MCP 후보 평가, Obsidian dashboard 계획, AI UX QA에 바로 재사용할 수 있다.
