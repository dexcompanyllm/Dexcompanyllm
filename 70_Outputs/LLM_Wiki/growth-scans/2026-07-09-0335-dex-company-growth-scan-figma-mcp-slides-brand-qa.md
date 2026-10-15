---
type: llm-wiki-growth-scan-report
status: completed
title: "Dex Company Growth Scan - 2026-07-09 03:35 KST"
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
  - "https://github.com/openai/codex/releases"
  - "https://developers.openai.com/api/docs/changelog"
  - "https://github.blog/changelog/"
  - "https://storybook.js.org/blog/storybook-10-4/"
  - "https://obsidian.md/changelog/"
  - "https://www.w3.org/WAI/update/"
  - "https://www.nngroup.com/articles/"
  - "https://www.figma.com/blog/figma-mcp/"
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make"
  - "https://help.figma.com/hc/en-us/articles/38694569552151-Upload-a-web-font-to-Figma-Make"
  - "https://help.figma.com/hc/en-us/articles/360039956774-Upload-custom-fonts-to-an-organization"
  - "https://www.threads.com/"
collectionPurpose: "30분 Growth Scan에서 최신 공개 자료가 Dex Company 운영 규칙, checklist field, approval field, QA field, acceptance test를 바꾸는지 확인하고, Figma MCP Slides living deck 사례를 PPT/브랜드 QA 기준으로 흡수한다."
tags:
  - llm-wiki/growth-scan
  - dex-company
  - figma
  - figma-mcp
  - figma-slides
  - ppt
  - visual-communication
---

# Dex Company Growth Scan - 2026-07-09 03:35 KST

## Run Scope and Limits

- 실행 시각: 2026-07-09 03:32-03:35 KST
- 실행 모드: 30분 fast discovery / candidate detection after Codex/npm install-security run.
- 검색 범위: OpenAI Codex/API, GitHub Copilot changelog, Storybook, Obsidian, W3C WAI, NN/g, Figma MCP/Slides/custom skills/custom fonts, Threads public search.
- 변경 범위: source note 1개, `PPT Frontend Visual Communication Checklist`, LLM Wiki `index.md`, `log.md`, 이 보고서.
- 금지 준수: package, SDK, MCP, connector, browser extension, GitHub workflow, cloud resource, account connection, token, billing setting, executable install은 수행하지 않았습니다.

## Metrics

| Field | Value | Note |
|---|---:|---|
| searched.count | 18 | public search/open surfaces and recent report/source surfaces counted from this run |
| stored.count | 1 | Figma MCP Slides living deck source note + checklist/index/log/report update |
| duplicate.count | 13 | OpenAI Codex/API, GitHub Copilot app/budget/adoption metrics, Storybook, Obsidian, W3C, NN/g, broad Figma MCP/codebase signals |
| deferred.count | 4 | GitHub/Figma account context, Storybook target repo, Threads primary confirmation, live Figma Slides/MCP runtime |
| blocked.count | 0 | preflight FAIL, access bypass, unauthorized install/connect/account change 없음 |
| lint.warning_count | 0 | final `llm-wiki-lint.ps1` result |

## Preflight

- 결과: PASS
- preflight report: `D:\Program Files\Codex\automations\dex-company-growth-scan\preflight-reports\preflight-20260709-033251.md`
- free RAM: 1.2GB
- `llm-wiki-status.ps1`: PASS during preflight
- `llm-wiki-lint.ps1`: PASS during preflight
- UTF-8 replacement scan: PASS during preflight

## 오늘의 핵심 발견

1. OpenAI Codex/API와 npm install-security 표면은 직전 03:04 보고서와 중복입니다. 이번 회차에서는 새 운영 필드를 추가하지 않았습니다.
2. GitHub Copilot app, per-user budgets, adoption metric changes는 공식 신호지만 account/org/billing context가 없어서 기존 carried/account-adjacent 판정을 유지했습니다.
3. Figma MCP의 June 16 Slides 사례는 Figma Slides deck을 최신 launch 자료와 connector context로 갱신하는 living deck workflow입니다.
4. 이 사례는 review pass, placeholder image 교체, copy edit이 필요하다고 명시하므로, Dex Company에서는 AI deck output을 최종본이 아니라 human-review draft로 다뤄야 합니다.
5. Figma help의 custom skills/custom fonts 문서는 PPT/brand QA에 source freshness, connector source list, custom font availability, font rights, private context exposure 같은 새 evidence field를 만들었습니다.

## Stored / Absorbed

- Source note added: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\sources\articles\2026-07-09-figma-mcp-slides-living-deck-refresh.md`
- Wiki guide updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\wiki\guides\PPT Frontend Visual Communication Checklist.md`
- Index updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\index.md`
- Log updated: `D:\VibeProject\ObsidianVault\ObsidianVault\30_Knowledge\LLM_Wiki\log.md`
- Report saved: `D:\VibeProject\ObsidianVault\ObsidianVault\70_Outputs\LLM_Wiki\growth-scans\2026-07-09-0335-dex-company-growth-scan-figma-mcp-slides-brand-qa.md`

## LLM Wiki Inbox / Source / Wiki Change History

- Added a Figma official source note with medium confidence and partial verification.
- Updated PPT/frontend checklist with Figma Slides/MCP deck refresh fields.
- Updated index/log to link the new source note and operating rule.
- Candidate queue was not edited because direct count remains closed: `eligible-next=0`, `not-checked=0`, `install-audit-next=0`.

## Evidence Table

| Candidate | Publisher | Type | Decision | Evidence Quality | Claim Split |
|---|---|---|---|---|---|
| Figma MCP Slides living deck workflow | Figma | official blog + help docs | stored-source + checklist-adopted | medium | source-backed: workflow/help behavior. Dex inference: QA fields. not checked: live account/runtime |
| Figma custom skills | Figma Help | official help | cross-check | medium | source-backed: skill creation/use/manage limits. not checked: Ethan account/paid plan |
| Figma custom fonts | Figma Help | official help | cross-check | medium | source-backed: web font upload, org font rights. not checked: actual fonts/license |
| OpenAI Codex/API currentness | OpenAI | official changelog/release | duplicate-currentness | high | covered by 03:04 Codex/npm install-security run |
| GitHub Copilot app/budget/adoption signals | GitHub | official changelog | carried/account-adjacent | high | account/org/billing/runtime not checked |
| Storybook 10.4 | Storybook | official release/docs | deferred/project-specific | medium | target repo, dependency/test/rollback missing |
| W3C WAI July update / NN-g latest | W3C, NN/g | official sources | duplicate/no-new-field | mixed | useful signals already covered by recent checklist fields |
| Threads public search | Threads | SNS discovery | deferred/discovery-only | low | primary source confirmation weak |

## Installation Or Due-Diligence Candidates

| Candidate | Decision | Actual Install | Risk |
|---|---|---:|---|
| Figma MCP for Slides/deck refresh | approval-not-ready/account-specific | No | connector sources, private workspace context, file edit access, paid seat, human review |
| Figma custom skills | approval-not-ready | No | skill provenance, team publish scope, non-deterministic output, connector exposure |
| Figma custom font upload | account/file-specific conditional | No | font license, admin rights, WOFF/WOFF2 web font availability, browser fallback |
| Storybook agentic setup | project-specific conditional | No | package/config mutation, generated stories, a11y/runtime tests, rollback |

## Duplicate Exclusions

- OpenAI Codex GitHub release and OpenAI Developers changelog: 03:04 run already adopted Codex remote plugin/proxy fields.
- OpenAI API changelog: no new field beyond existing API currentness and billing/deprecation handling.
- GitHub Copilot app, budgets, usage/adoption metrics: official but account/org/billing context required.
- Storybook 10.4: still project-specific and already deferred.
- Obsidian changelog: no new Vault workflow field.
- W3C WAI July update and NN/g latest index: useful but current checklist already covers the concrete QA fields.
- Broad Figma MCP/codebase items: covered by 02:34 Figma Make/codebase handoff note. This run only kept the Figma Slides/deck refresh delta.

## Failed / Blocked / Not Checked

- Failed: none.
- Blocked: none.
- Not checked: Ethan Figma paid plan, Full seat, file edit access, Figma MCP runtime, Figma Slides file, custom fonts, font licenses, Slack/Drive/Notion/GitHub connector permissions, export rendering, live deck QA, actual accessibility checker, Threads primary pages.

## Cross Verification

- Figma Slides/MCP workflow was checked against the official Figma blog and Figma MCP tag page.
- Custom skill behavior was checked against Figma Help custom skills documentation.
- Custom font publishing risk was checked against Figma Help web font upload and organization font upload documentation.
- Duplicate checks were run against LLM Wiki source/wiki/inbox for Figma Slides, living deck, custom font, uploaded custom fonts, and related terms.
- OpenAI/GitHub/Storybook/Obsidian/W3C/NN-g/Figma candidates were compared against recent 01:04, 01:39, 02:05, 02:34, and 03:04 reports plus index/log.

## Source-Backed / Dex Inference / Not Checked

- source-backed: Figma official blog/help pages describe the MCP/Slides workflow, custom skill behavior, and custom font upload/license/admin constraints.
- Dex inference: Dex Company should convert that workflow into PPT/brand QA fields rather than treating it as permission to connect Figma or auto-generate final decks.
- not checked: no live Figma account, connector, deck file, custom font, MCP runtime, or export/browser QA was tested.

## 에던님이 바로 쓸 수 있는 예시

Figma Slides나 MCP 기반 PPT 갱신을 맡길 때 아래 항목을 QA_REPORT에 요구하시면 됩니다.

```yaml
figma_slides_mcp_qa:
  source_freshness_ledger: checked | not_checked
  connector_sources_listed: checked | not_checked | not_applicable
  template_adherence_checked: checked | not_checked
  custom_font_availability: checked | not_checked | not_applicable
  font_license_or_rights_checked: checked | not_checked | not_applicable
  placeholder_images_replaced: checked | not_checked
  copy_review_completed: checked | not_checked
  human_final_approval: checked | not_checked
  exported_asset_formats: svg_pdf_jpg_png | not_checked | not_applicable
  private_context_exposure_review: checked | not_checked | not_applicable
```

## Improvement Delta

- 개선 전: Figma Make/codebase handoff는 repository/script/PR/browser QA 중심이었고, PPT/Slides 갱신에서 source freshness와 brand font QA가 분리되어 있지 않았습니다.
- 개선 후: Figma Slides/MCP deck refresh를 source ledger, connector exposure, template adherence, custom font, font rights, placeholder/copy/human review로 나눴습니다.
- 운영 규칙 변경: Figma Slides AI deck output은 source-backed draft로만 보고, 사람 검토와 brand/accessibility/export QA가 끝나기 전에는 final deck으로 부르지 않습니다.

## Adoption Check

- 이전 action item: 새 source는 checklist field, approval field, QA field, acceptance test 중 하나를 바꿀 때만 저장합니다.
- 채택 여부: done.
- 반영 방식: Figma MCP Slides 사례가 PPT/brand QA field를 새로 만들었으므로 1개 source note와 checklist 업데이트로 흡수했습니다.

## Previous Deferred / Carried Rejudgment

| Item | Previous State | Current Judgment | Reason |
|---|---|---|---|
| GitHub Copilot app | carried/account-adjacent | carried/account-adjacent | official signal remains, but account/org/billing/runtime context is missing |
| Storybook 10.4 / agentic setup | deferred/project-specific | deferred/project-specific | target repo, package delta, test output, rollback missing |
| Figma Agent / MCP / Make | carried/account-and-repo-specific | done/adopted-narrow-field for Slides QA, carried for live adoption | new deck QA fields adopted, but account/runtime remains unchecked |
| Threads Obsidian+Codex / Figma MCP signals | deferred/discovery-only | deferred/discovery-only | discovery useful but primary confirmation weak |

## Next Eval

1. Run preflight first.
2. Only store a new source if it creates a concrete checklist/approval/QA/acceptance-test field.
3. If Figma Slides/MCP appears again, require actual deck file, source ledger, connector list, font rights, placeholder/copy review, human approval, export format, and private-context review before adoption.
4. If no new operational field appears, write no-new-signal rather than repeating Figma/OpenAI/GitHub currentness.

## Prompt Or Template Patch Candidate

```text
For AI-generated decks or Figma Slides/MCP refresh workflows, do not accept "deck generated" as done. Split QA by source freshness ledger, connector source list, template adherence, custom font availability, font license/rights, placeholder image replacement, copy review, human final approval, exported asset format, and private context exposure. If account, connector, or deck file evidence is missing, keep adoption not checked.
```

## Failure Pattern / Risk

- 반복 위험: "Figma MCP가 deck을 갱신했다"를 "제출 가능한 PPT가 완성됐다"로 과장하는 것.
- 이번 처리: Figma 자료를 knowledge-only source로 저장했고, live Figma 계정이나 connector를 연결하지 않았습니다.
- 남은 위험: free RAM은 1.2GB로 통과했지만 여유가 크지 않습니다. Figma connector/account context는 전부 not checked입니다.

## QA Scorecard

| Check | Result | Evidence |
|---|---|---|
| preflight | PASS | `preflight-20260709-033251.md` |
| internet search | PASS | public official/source pages checked |
| duplicate check | PASS | automation memory, recent reports, LLM Wiki grep, index/log/checklist |
| source/wiki storage basis | PASS | concrete PPT/brand QA fields added |
| unauthorized install/connect/account change | PASS | no install, connector, SDK, MCP, package, account, billing, token change |
| source-backed / Dex inference / not checked split | PASS | Evidence Table and separate section |
| status | PASS | final status check completed |
| lint | PASS | final lint completed with 0 warnings |
| audit | PASS_WITH_BACKLOG | final audit completed; unexplored backlog remains |
| UTF-8 check | PASS | changed Korean Markdown files checked |
| watchdog | PASS_WITH_WARNINGS | valid run; remaining risks are account/runtime/deck/export not checked |

## Watchdog

- Verdict: PASS_WITH_WARNINGS.
- 근거: preflight, duplicate check, source/write basis, status/lint/audit/UTF-8 checks passed; no unauthorized install, connector, MCP/package execution, account connection, token, billing, or cloud change occurred.
- Highest risk: Figma MCP/Slides examples are public vendor examples, not proof that Ethan's account can use the workflow or that any deck is final.
- Not checked: Figma account/plan/file access/connectors/custom fonts/export/browser rendering/live deck QA.
- Rework needed: none.

## Original Content

이 보고서는 2026-07-09 03:35 KST Growth Scan 공개 검색 결과, preflight PASS 결과, Figma MCP/Slides/custom skills/custom fonts official pages, 기존 LLM Wiki 중복 확인, PPT/frontend checklist 변경, status/lint/audit/UTF-8 결과를 요약한 운영 기록입니다. 원문 전체를 복사하지 않고 URL, 확인 범위, 판단, 미확인 항목만 보존합니다.
