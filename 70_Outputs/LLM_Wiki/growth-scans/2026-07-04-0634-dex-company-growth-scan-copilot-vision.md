---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - Copilot Vision QA Signal - 2026-07-04 06:34 KST"
created: 2026-07-04
updated: 2026-07-04
dateCreated: 2026-07-04
dateModified: 2026-07-04
runAt: 2026-07-04T06:34:45+09:00
runMode: scheduled-30min-growth-scan
operator: Dex
sourceKind: automation-report
source:
  - "https://developers.openai.com/codex/changelog"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/label/copilot/"
  - "https://github.blog/changelog/2026-07-01-copilot-vision-is-generally-available/"
  - "https://docs.github.com/en/copilot/how-tos/copilot-cli/use-copilot-cli/overview"
  - "https://docs.github.com/en/copilot/how-tos/copilot-on-github/use-copilot-agents/research-plan-iterate"
  - "https://obsidian.md/changelog/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/topic/artificial-intelligence/"
collectionPurpose: "30분 간격 Growth Scan에서 기존 no-new-signal 기준을 유지하되, 새로 독립 저장할 만한 공식 고신뢰 신호가 있는지 확인한다."
confidence: medium
claimType: historical
evidenceScope: web-search-and-local-vault-check
verificationStatus: partial
verifiedAt: 2026-07-04
verifiedBy: Dex
disputed: false
tags:
  - llm-wiki/report
  - growth-scan
  - dex-company
  - github
  - copilot
---

# Dex Company Growth Scan - Copilot Vision QA Signal - 2026-07-04 06:34 KST

## Run Scope and Limits

- 실행 시각: 2026-07-04 06:34 KST
- 검색 범위: 자동화 메모리, 현재 작업 폴더, Vault 운영 문서, LLM Wiki index/log/improvement guide, 최근 06:03/05:35/05:04/04:34 보고서, 10x candidate queue, OpenAI Codex/API changelog, GitHub Copilot changelog/docs, Obsidian changelog, Figma MCP 글, W3C WAI update, NN/g AI UX 자료.
- 실행 초점: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0`를 유지하면서, 반복 저장이 아닌 새 source note 가치가 있는 공식 신호만 승격한다.
- 제외: 패키지, SDK, MCP server, connector, GitHub app, Figma action, Obsidian 설정, token, API key, account connection, cloud resource, billing action, model switch, workflow, file deletion은 설치/실행/생성/연결하지 않았다.

## Original Content

이 파일은 자동화 실행 보고서다. 원문 전체를 복사하지 않고 공개 출처 URL, 확인 범위, 중복/보류 판단, 덱스 컴퍼니 적용 예시, QA 결과만 보존한다. 이번 실행은 "덱스가 스스로 학습했다"가 아니라 파일과 검증된 출처를 통한 덱스 컴퍼니 운영 지식 흡수 여부를 기록한다.

## Metrics

| Metric | Value |
|---|---:|
| searched.count | 12 |
| stored.count | 1 |
| duplicate.count | 8 |
| deferred.count | 2 |
| blocked.count | 1 |
| lint.warning_count | 0 |

## Today's Core Findings

1. GitHub Copilot Vision GA는 기존 LLM Wiki에 독립 source note가 없어 새로 저장할 가치가 있었다. 이미지/PDF 입력은 화면 QA, PDF 검토, PR planning에 직접 연결된다.
2. OpenAI Codex/API changelog의 핵심 신호는 최근 runtime/model/prompt/cost/security source notes에 이미 반영되어 추가 저장하지 않았다.
3. Figma MCP practical examples는 직전 보고서와 기존 Figma source notes를 보강하는 정도라 duplicate-with-caveat로 유지했다.
4. W3C WAI July 2026 update와 NN/g AI UX 자료는 기존 accessibility/critique notes와 같은 운영 방향이므로 중복 처리했다.
5. Threads는 안정적인 본문과 교차 검증이 부족해 이번에도 source-backed 승격 대상으로 보지 않았다. X는 자동화 규칙상 제외했다.

## Stored / Absorbed Sources

- source note: `30_Knowledge/LLM_Wiki/sources/articles/2026-07-04-github-copilot-vision-ga.md`
- wiki note: 없음
- report: `70_Outputs/LLM_Wiki/growth-scans/2026-07-04-0634-dex-company-growth-scan-copilot-vision.md`

## LLM Wiki Changes

| Area | Change |
|---|---|
| sources/articles | GitHub Copilot Vision GA source note 1개 추가 |
| wiki/ | 변경 없음 |
| index.md | source note와 이번 report 링크 추가 |
| log.md | 06:34 scheduled growth scan 이력 추가 |
| candidate queue | 직접 수정 없음. 직접 count 기준 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 유지 |
| automation memory | 이번 실행 요약 추가 |

## Evidence Table

| Candidate | Primary evidence | Classification | Confidence |
|---|---|---|---|
| GitHub Copilot Vision GA | GitHub official changelog + GitHub Docs | stored-source | medium |
| OpenAI Codex changelog | OpenAI official changelog | duplicate/no-new-signal | high |
| OpenAI API changelog | OpenAI official changelog | duplicate/no-new-signal | high |
| GitHub Copilot usage metrics/model/CLI July items | GitHub official changelog | duplicate/no-new-signal | medium |
| Figma MCP practical examples | Figma official blog | duplicate-with-caveat | medium |
| Obsidian changelog | Obsidian official changelog | duplicate-source | high |
| W3C WAI July 2026 update | W3C official page | duplicate-source | high |
| NN/g AI UX topic/articles | NN/g official site | duplicate-source | high |
| Threads public snippets | Threads search snippets | deferred/source-weak | low |
| X | excluded by automation rule | blocked | high |

## Install Candidates / Due Diligence Candidates

| Candidate | Status | Install? | OWASP LLM risk |
|---|---|---:|---|
| GitHub Copilot Vision / image-PDF attachment workflow | documentation-only source | No | sensitive information disclosure, overreliance, prompt injection through image/PDF content, insecure output handling |
| GitHub Copilot code review MCP/agent skills | carried/project-specific | No | excessive agency, write-scope confusion, prompt injection through PR/issues, secret exposure |
| Figma MCP / Agent connector workflow | carried/account-adjacent | No | design-file permission leakage, connector context overreach, asset export exposure |

## Duplicate / Rejected / Deferred

- duplicate/no-new-signal: OpenAI Codex changelog, OpenAI API changelog, GitHub Copilot usage metrics/model/CLI governance items, Obsidian changelog, W3C WAI update, NN/g AI UX topic index.
- duplicate-with-caveat: Figma MCP examples. 기존 Figma MCP/design-system source notes에 `asset_export.scope`, `workspace.permission`, `human_review.required` 기준이 이미 남아 있어 새 note는 만들지 않았다.
- deferred/project-specific: GitHub Copilot code review MCP/agent skills. 실제 repo PR review workflow가 열릴 때 재판정한다.
- deferred/source-weak: Threads snippets. 안정적인 본문, 작성자/퍼블리셔 맥락, 교차 검증이 없으면 source note로 승격하지 않는다.
- blocked: X는 자동화 규칙상 제외했다.

## Failure / Blocked / Not Checked

- 에던님의 GitHub Copilot plan, 조직 정책, Copilot Vision 실제 사용 가능성, VS Code/CLI 버전은 확인하지 않았다.
- GitHub Copilot Vision, Copilot CLI, Copilot cloud agent를 실행하지 않았다.
- 이미지/PDF 업로드가 개인정보, 내부 문서, 토큰을 외부 서비스에 노출할 수 있는지는 실제 계정 정책과 파일별 민감도에 따라 달라진다.
- Threads는 discovery-only로만 확인했고 full-context extraction은 하지 않았다.

## Cross Verification Evidence

- GitHub changelog는 Copilot Vision GA와 이미지/PDF 첨부 가능성을 primary source로 제공했다.
- GitHub Copilot CLI docs는 image/PDF attachment 방식과 지원 확장자를 별도로 설명해 changelog를 교차 확인했다.
- GitHub Copilot cloud agent docs는 task description에 스크린샷, 스케치, 디자인 이미지를 넣는 workflow를 설명해 화면 QA/기획 맥락을 보강했다.
- 기존 LLM Wiki 검색에서 `Copilot vision` 독립 source note는 발견되지 않았고, browser tools/credit/model/security notes와는 운영 범위가 달랐다.

## Ethan Can Use This Immediately

- 화면 QA 요청 때 스크린샷 분석을 보조로 쓸 수 있지만, 최종 통과 기준은 Playwright/브라우저/DOM 접근성 확인으로 남기시면 됩니다.
- 이력서나 포트폴리오 PDF 검토에 쓸 수 있지만, 개인정보 제거와 제출처/계정 정책 확인이 먼저입니다.
- GitHub 이슈나 PR에서 디자인 스케치를 첨부한 planning은 유용하지만, human review와 diff 검토를 필수로 둬야 합니다.

## Improvement Delta

- no-op 기준을 유지하되, 기존 source coverage에 없는 공식 신호는 1건만 저장했다.
- 이미지/PDF 입력 기능을 도구 능력으로 과신하지 않도록 `visual_input.source`, `file.sensitivity`, `account.policy_checked`, `human_review.required`, `WCAG.anchor`, `runtime.verified` 필드를 다음 템플릿 후보로 추가했다.
- 30분 간격 스캔에서 "공식 신호라도 기존 note와 운영 범위가 같으면 duplicate, 범위가 다르면 최소 저장" 기준을 적용했다.

## Adoption Check

- done: 직전 Next Eval의 `eligible-next=0`, `not-checked=0`, `install-audit-next=0` 상태를 유지했다.
- done: 새 고신뢰 신호가 없으면 no-op이라는 기준을 지키되, Copilot Vision처럼 독립 운영 가치가 있는 신호만 저장했다.
- done: GitHub code review MCP/agent skills는 실제 PR workflow 전까지 carried로 유지했다.
- done: Figma MCP/Agent 항목은 connector/action 설치 없이 문서 신호와 권한 리스크만 유지했다.
- carried: live account/runtime availability 확인은 실제 사용 요청 전까지 보류한다.

## Previous Deferred / Carried Rejudgement

| Item | Previous State | Result | Evidence |
|---|---|---|---|
| Short no-op if no high signal | carried | done-with-exception | Copilot Vision GA는 기존 coverage와 다른 공식 신호라 source note 1개만 저장 |
| GitHub Copilot code review MCP/agent skills | carried/project-specific | carried | no active repo PR review workflow exists |
| Figma MCP / Agent connector workflow | carried/account-adjacent | carried | Figma examples remain duplicate-with-caveat; no connector approval |
| Threads snippets | discovery-only | carried/source-weak | stable source text and cross-source confirmation still insufficient |
| Old broad queue reopening | blocked-by-default | done | queue remains `eligible-next=0`, `not-checked=0`, `install-audit-next=0` |

## Next Eval

1. Keep `eligible-next=0`, `not-checked=0`, and `install-audit-next=0`; avoid reopening old broad queues.
2. If no new official/high-provenance signal appears, create only a short no-op report and do not add source notes.
3. For image/PDF/vision-capable agent items, record `visual_input.source`, `file.sensitivity`, `account.policy_checked`, `runtime.surface`, `human_review.required`, `WCAG.anchor`, `output.checked`, and `install.status`.
4. For GitHub code review/MCP/agent skills, revisit only when an actual repository PR review workflow exists.

## Prompt or Template Patch Candidate

```text
For Growth Scan items involving image, PDF, screenshot, or visual-context AI inputs, record visual_input.source, file.sensitivity, account.policy_checked, runtime.surface, supported.file_types, human_review.required, WCAG.anchor, output.checked, and install.status. Treat visual analysis as assistive evidence, not as a replacement for reproducible browser, DOM, accessibility, or source verification.
```

## Questions / Tracking Candidates

- GitHub Copilot Vision을 실제로 쓰게 되면, 먼저 GitHub account/plan/org policy와 민감정보 업로드 정책을 확인해야 한다.
- PDF 기반 Career Ops 검토를 자동화할 경우, 원본 PDF 보존 위치와 개인정보 제거 절차를 별도 규칙으로 둬야 한다.
- 화면 QA에 이미지 입력을 쓰더라도 WCAG 2.2 기준은 브라우저 검증과 함께 남겨야 한다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| Automation memory read | passed | `dex-company-growth-scan/memory.md` read before work |
| Current folder checked | passed | `D:\CodexProjects\codex setup` inspected |
| Vault operating docs checked | passed | AGENTS, role docs, LLM Wiki guide, index/log, improvement guide checked |
| Recent reports checked | passed | 06:03, 05:35, 05:04, 04:34 reports and candidate queue inspected |
| Public web search | passed | OpenAI, GitHub, Obsidian, Figma, W3C, NN/g, Threads lanes checked |
| Duplicate check | passed | existing LLM Wiki notes searched before writing |
| Previous deferred rejudgement | passed | no-op exception, GitHub code review, Figma MCP, Threads, old queue reopening rejudged |
| Source schema | passed | official lint passed after report creation |
| Status script | passed | `llm-wiki-status.ps1` passed after report creation |
| Lint script | passed | `llm-wiki-lint.ps1` passed with 0 warning(s) |
| UTF-8 scan | passed | edited Markdown files had no U+FFFD replacement characters |
| Install control | passed | no install, token, API call, connector, SDK, MCP, workflow, account, billing, or file deletion action |

## Watchdog

- Verdict: PASS_WITH_WARNINGS
- Highest risk: Copilot Vision GA를 실제 계정에서 바로 사용 가능하거나 안전하다고 과신할 수 있다.
- Mitigation: source note를 documentation-only로 저장했고, account policy, file sensitivity, human review, WCAG/browser QA를 별도 조건으로 남겼다.
- Not checked: live GitHub plan/org policy, Copilot CLI/VS Code runtime, actual image/PDF attachment behavior, uploaded-file retention policy.
