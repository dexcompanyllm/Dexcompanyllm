---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan Credential and Remote Hygiene - 2026-07-03 23:03 KST"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
runAt: 2026-07-03T23:03:00+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: growth-scan-report
source:
  - "https://developers.openai.com/codex/remote-connections"
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/codex/enterprise/access-tokens"
  - "https://developers.openai.com/codex/auth/ci-cd-auth"
  - "https://genpurpose.substack.com/p/frontier-ux-research-circa-may-2026"
  - "https://dovetail.com/ux/ai-tools-for-ux-research/"
  - "https://www.langchain.com/resources/ai-agent-frameworks"
  - "https://langfuse.com/blog/2025-03-19-ai-agent-comparison"
collectionPurpose: "Dex Company 성장 스캔의 credential, remote control, vendor backlog hygiene 결과와 다음 검증 기준을 보존한다."
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

# Dex Company Growth Scan Credential and Remote Hygiene - 2026-07-03 23:03 KST

## Run Scope and Limits

- 실행 시각: 2026-07-03 23:03 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault AGENTS/Dex Company/역할 라우팅/LLM Wiki 운영 문서, LLM Wiki index/log, Growth Scan improvement guide, 최근 22:33/22:04/21:33 보고서, 10x candidate queue, OpenAI Codex remote connections/changelog/access tokens/CI-CD auth docs, OpenAI API deprecations, Obsidian changelog, React blog, Frontier UX Research, Dovetail AI tools, LangChain/Langfuse agent framework comparisons, Threads public snippets.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`을 유지하고, 남은 `not-checked=5`를 재판정하며, 새 source note는 공식/고가치 자료가 Dex Company 운영 판단을 바꿀 때만 만든다.
- 제외: package, MCP server, browser extension, skill, plugin, cloud provisioning, token generation, auth file copy, npm/npx/bun 실행은 하지 않았다.
- 저장 원칙: 원문 전체를 복사하지 않고 URL, 메타데이터, 확인 범위, 요약, 교차 검증, Dex Company 적용 판단만 보존했다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 자료 전체를 복사하지 않았고, source note 2건에는 공식 URL, 확인 범위, 요약, 위험 구분, not-checked 범위만 보존했다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 15 |
| stored.count | 2 |
| duplicate.count | 4 |
| deferred.count | 4 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. Codex remote connections는 별도 에이전트 환경이 아니라 host의 projects, files, credentials, permissions, plugins, browser setup, local tools를 원격 기기에서 쓰는 모델이다. 따라서 모바일 연결 전에는 host 상태와 권한 경계를 먼저 확인해야 한다.
2. Codex changelog의 Remote Control QR pairing 및 DigitalOcean plugin 신호는 원격 workspace 운영 가능성을 높이지만, cloud provisioning/SSH/cost/credential scope 때문에 자동 설치나 자동 실행 대상이 아니다.
3. Codex access tokens는 trusted automation을 위한 ChatGPT workspace identity 수단이며, Platform API key로 충분하면 API key를 우선하라는 공식 경계가 있다.
4. 남은 vendor/research comparison 후보는 source note로 승격하지 않았다. LangChain/Langfuse/Great Question은 도입 판단이 있을 때 bias caveat와 함께 다시 볼 보조 신호이고, Dovetail/Backlight류 broad list는 공식·고품질 자료보다 약하다.
5. Threads는 이번에도 source-backed ingestion에 쓸 만한 안정적인 공개 원문을 제공하지 못했다. snippet은 discovery-only로 유지한다.

## Stored / Absorbed Sources

- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-remote-connections-digitalocean-plugin.md`
- `30_Knowledge/LLM_Wiki/sources/ai-research/2026-07-03-openai-codex-access-tokens-programmatic-workflows.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| Sources | OpenAI official source notes 2개 추가 |
| Inbox queue | item 44, 45, 76, 77 재판정 |
| Queue count | `eligible-next=0`, `audit-done=8`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `not-checked=0`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `install-audit-next=0` |
| Index | 새 source notes 2개와 이번 보고서 링크 추가 |
| Log | 23:03 scheduled growth scan entry 추가 |

## Evidence Table

| Candidate | Type | Evidence Split | Confidence |
|---|---|---|---|
| Codex remote connections | OpenAI official docs | source-backed: host/project/credential boundary, mobile setup, QR pairing; Dex inference: host-bound QA checklist; not checked: live local app/account state | high |
| DigitalOcean plugin | OpenAI changelog | source-backed: Droplet/SSH/remote workspace changelog signal; Dex inference: cloud provisioning approval gate; not checked: plugin implementation, billing, SSH behavior | medium |
| Codex access tokens | OpenAI official docs | source-backed: trusted automation, Business/Enterprise support, risk list; Dex inference: Dex Company credential policy; not checked: Ethan workspace eligibility | high |
| OpenAI API deprecations | OpenAI official docs | source-backed: July 2 fine-tuning self-serve update still current; Dex inference: existing note is enough; not checked: local fine-tuning usage | high |
| Obsidian changelog | Official changelog | source-backed: latest visible 1.13.1 entries; Dex inference: existing Obsidian note remains sufficient; not checked: local Obsidian app version | medium |
| Frontier UX Research | Personal Substack | source-backed: author/date/method caveat; Dex inference: question generator only; not checked: underlying private conversations and source list quality | low |
| LangChain framework comparison | Vendor article | source-backed: vendor list and stated MIT/GitHub signal; Dex inference: carried only for framework due diligence; not checked: independent benchmarks/security | low |
| Langfuse framework comparison | Vendor article | source-backed: observability-oriented framework comparison; Dex inference: carried only for eval stack selection; not checked: independent tool fit/runtime | low |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | Reason |
|---|---|---:|---|
| DigitalOcean Codex plugin | due-diligence-candidate | No | Cloud provisioning, SSH access, cost, region/data boundary, and credential scope require explicit Ethan approval. |
| Codex access tokens | credential-policy-candidate | No | Tokens are secrets. No token was generated, requested, copied, stored, or tested. |
| Codex remote/mobile control | operating-candidate | No | Requires live host, account/workspace, app version, admin permission, and connected-device state verification. |
| LangChain/Langfuse frameworks | carried-vendor | No | Vendor comparisons are not install bases; use only when a concrete project decision exists. |

## Duplicate / Rejected / Deferred

- duplicate: OpenAI API deprecations already has an existing source note; the July 2 fine-tuning item was rechecked but not duplicated.
- duplicate: Obsidian changelog/CLI/Bases lane already has source notes; no new Obsidian note was created.
- duplicate: React blog has existing source coverage and no fresh post beyond stored security/governance signals was needed.
- duplicate/no-new-signal: Great Question remains `carried-vendor`; no second Great Question note was created.
- dropped: Dovetail AI tools list is vendor-authored broad listing and weaker than existing NN/g/Maze/Great Question caveated material.
- carried: Frontier UX Research remains a personal research signal, useful for questions but not source-backed operating policy.
- carried: LangChain and Langfuse comparisons remain vendor due-diligence signals, not installation or framework selection evidence.
- deferred: Codex remote/mobile live compatibility check requires actual device/account UI state.
- deferred: DigitalOcean plugin implementation and security audit requires a concrete project and Ethan approval.
- deferred: Codex access token eligibility requires workspace/admin state and must not be guessed.

## Failure / Blocked / Not Checked

- Threads did not provide reliable public source text suitable for source-backed promotion; it remains discovery-only.
- No package, plugin, MCP server, browser extension, cloud resource, token, or auth file was installed, created, copied, or executed.
- DigitalOcean plugin code, license/package metadata, billing behavior, SSH key handling, and remote workspace runtime were not checked.
- Codex access token UI, Ethan workspace eligibility, token expiration settings, runner secret storage, and governance logs were not checked.
- Vendor comparison claims from LangChain, Langfuse, Dovetail, and Great Question were not independently benchmarked.

## Cross Verification Evidence

- Codex remote/mobile source note cross-checks OpenAI remote connections docs with OpenAI Codex changelog.
- Codex access-token source note cross-checks OpenAI access token docs with OpenAI CI/CD auth guidance.
- Credential and remote-operation risks were cross-checked against existing Dex Company no-secret rule and OWASP LLM risk categories.
- UX/frontend/accessibility mapping uses existing WCAG 2.2 source note: remote/Codex credential docs are not UI accessibility docs, so WCAG applies only indirectly when remote UI or embedded app flows are actually implemented.
- Vendor research candidates were compared against existing NN/g, Maze, OpenAI, GitHub, Microsoft, and design-system source notes; low-provenance comparison pages were not promoted.

## Ethan Can Use This Immediately

- 모바일로 Codex를 쓰실 때는 "핸드폰에 새 작업장이 생긴다"가 아니라 "PC의 작업장과 권한을 핸드폰에서 조종한다"고 보시면 됩니다. 그래서 PC가 켜져 있고, 같은 계정/워크스페이스이고, 연결 권한이 살아 있는지 먼저 보셔야 합니다.
- Codex 자동화를 서버에서 돌리고 싶을 때는 먼저 Platform API key로 충분한지 확인하시면 됩니다. ChatGPT workspace 권한과 Codex entitlement가 꼭 필요할 때만 Codex access token을 검토하셔야 합니다.
- DigitalOcean plugin은 편리해 보이지만 cloud 비용과 SSH/credential 범위가 생기므로, 덱스가 자동으로 설치하거나 실행하면 안 됩니다. 프로젝트가 생기면 별도 승인 후 감사해야 합니다.
- LangChain/Langfuse 비교 글은 "무엇을 비교해야 하는가"를 잡는 보조 자료로만 쓰고, 실제 도입은 공식 문서, 보안 이슈, 라이선스, 설치 권한, 운영 비용을 다시 봐야 합니다.

## Improvement Delta

- `not-checked=5`를 `not-checked=0`으로 정리했다. 남은 low-provenance 후보는 carried/dropped로 분리되어 다음 실행이 같은 항목을 반복 확인할 가능성이 낮아졌다.
- Growth Scan이 broad link collection에서 credential/remote-operation hygiene로 좁혀졌다. 자동화·원격 실행에서 가장 위험한 secret/host boundary를 공식 문서 기반으로 보강했다.
- "원격 Codex"를 local-current host state와 cloud/remote-workspace roadmap signal로 분리했다.
- Access token을 source note로 저장하면서 secret을 절대 노트에 저장하지 않는 Dex Company 규칙을 재확인했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0` 상태를 유지했다.
- done: broad MCP Apps scan을 반복하지 않았다.
- done: 남은 `not-checked=5` 중 최소 2개 재판정 기준을 넘어 4개 queue row를 재판정했고, 큐의 `not-checked`를 0으로 만들었다.
- done: 새 source note는 OpenAI official docs 2건으로 제한했다.
- carried: Threads는 안정적인 공개 원문 접근이 가능할 때만 다시 source-backed 승격을 검토한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Frontier UX Research circa May 2026 | not-checked | carried-research-signal | personal/Substack synthesis with explicit method caveat |
| Dovetail AI tools for UX research | not-checked | dropped-low-signal | broad vendor list; stronger NN/g/Maze/Great Question caveated material exists |
| LangChain AI agent frameworks 2026 | not-checked | carried-vendor | useful only for future framework due diligence with bias/security checks |
| Langfuse open-source AI agent comparison | not-checked | carried-vendor | useful only for future observability/eval stack review |

## Next Eval

다음 실행은 아래 기준을 통과해야 합니다.

1. `eligible-next=0`과 `not-checked=0`을 유지하고, 큐에 이미 판정된 vendor 항목을 반복 검색하지 않는다.
2. 새 source note를 만들려면 OpenAI/Codex/API/Obsidian/frontend/accessibility/security/career ops 중 공식 또는 고품질 primary source가 Dex Company 운영 판단을 실제로 바꿔야 한다.
3. Codex remote/mobile 또는 access token 관련 질문이 나오면 live app/account/workspace/admin state를 먼저 확인하고, 기억이나 문서만으로 성공처럼 말하지 않는다.
4. DigitalOcean plugin, access tokens, remote workspace, framework/runtime 설치는 모두 승인 전 no-install 상태를 유지한다.

## Prompt or Template Patch Candidate

```text
When Growth Scan discovers Codex remote-control, credential, cloud workspace, or token documentation, classify the item as documentation-only, credential-policy-candidate, due-diligence-candidate, or blocked-by-default. Never create, copy, or store tokens/auth files, and never provision cloud resources during the scan. For mobile/remote Codex claims, verify live host/account/workspace/admin/device state before reporting availability as current.
```

## Questions / Tracking Candidates

- Codex remote/mobile을 실제로 쓰실 계획이 생기면 Windows host, ChatGPT mobile, workspace admin permission, 연결 기기 목록을 실사해야 합니다.
- Codex access token이 필요한 자동화가 생기면 Platform API key로 충분한지 먼저 판단하고, secret manager/만료/회전/runner 신뢰 범위를 설계해야 합니다.
- DigitalOcean plugin은 프로젝트가 생기기 전에는 후보로만 둡니다. 실제 검토 시 비용, region, SSH key, repo access, teardown 절차를 체크해야 합니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, overview, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 22:33, 22:04, 21:33 reports and candidate queue inspected |
| Public web search | passed | OpenAI, Obsidian, React, UX research/vendor, LangChain/Langfuse, Threads searched |
| Duplicate check | passed | `rg` checked sources/index/log/reports/queue before writing |
| Queue reclassification | passed | `not-checked=0` after item 44/45/76/77 rejudgement |
| Source schema | passed | fallback schema check returned 0 warnings |
| Status script | passed | `llm-wiki-status.ps1` completed |
| Lint script | passed | `llm-wiki-lint.ps1` completed with 0 warning(s) |
| UTF-8 scan | passed | New/modified Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, no token creation, no cloud provisioning |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Codex remote/control and access-token docs are official and useful, but actual availability depends on live app/account/workspace/admin/device state.
- Mitigation: stored documentation-only source notes, kept all install/provision/token actions blocked, and recorded not-checked live-state boundaries.
- Not checked: live Codex app/mobile state, Ethan workspace eligibility, access-token UI, DigitalOcean plugin code/runtime/billing, reliable Threads source extraction, independent validation of vendor comparison claims.
