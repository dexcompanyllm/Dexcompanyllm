---
type: llm-wiki-source
status: active
title: "Figma MCP Slides living deck refresh workflow"
aliases:
  - Figma MCP Slides living deck
description: "Figma MCP가 Figma Slides, custom fonts, custom skills, connector context를 통해 살아있는 발표 자료를 갱신하는 방식을 Dex Company PPT/브랜드 QA 기준으로 흡수한 source note"
author: Dex
created: 2026-07-09
updated: 2026-07-09
dateCreated: 2026-07-09
dateModified: 2026-07-09
confidence: medium
claimType: mixed
evidenceScope: multi-source-primary
verificationStatus: partial
verifiedAt: 2026-07-09
verifiedBy: Dex
disputed: false
sourceKind: article
source:
  - "https://www.figma.com/blog/4-ways-were-using-our-mcp-server-at-figma/"
  - "https://www.figma.com/blog/figma-mcp/"
  - "https://help.figma.com/hc/en-us/articles/40283639496599-Custom-skills-for-the-Figma-agent-and-Figma-Make"
  - "https://help.figma.com/hc/en-us/articles/38694569552151-Upload-a-web-font-to-Figma-Make"
  - "https://help.figma.com/hc/en-us/articles/360039956774-Upload-custom-fonts-to-an-organization"
collectionPurpose: "Figma MCP/Slides/skills/custom font 사례가 Dex Company PPT 및 visual communication workflow에서 source freshness, brand font, template adherence, human review, connector exposure QA 필드를 바꾸는지 확인한다."
capturedAt: 2026-07-09T03:35:00+09:00
sourceType: official-blog-and-help
sourceVersion: "Figma blog 2026-06-16 plus help pages checked 2026-07-09"
supersedes:
supersededBy:
tags:
  - llm-wiki/source
  - figma
  - figma-mcp
  - figma-slides
  - ppt
  - visual-communication
  - ai-agents
---

# Figma MCP Slides living deck refresh workflow

## Why This Matters

Figma의 2026-06-16 공식 블로그는 MCP 서버가 Figma Slides, FigJam, Figma Make, Figma agent까지 확장됐고, 발표 자료를 최신 제품/팀 맥락으로 갱신하는 사례를 제시합니다. Dex Company에는 "AI가 슬라이드를 만들었다"보다 "자료 출처, 브랜드 폰트, 템플릿, placeholder, 사람 검토, connector 권한을 QA evidence로 분리한다"는 운영 가치가 큽니다.

## Source-Backed Findings

- Figma는 MCP 서버가 Figma Slides, FigJam, Figma Make, Figma agent across workflows에서 쓰인다고 설명합니다.
- Figma Slides 사례는 제품 출시 deck을 반복 갱신하는 "living deck" 흐름이며, Slack, Google Drive, blog, release notes 같은 최신 팀 자료를 끌어와 새 슬라이드 후보를 만들었습니다.
- 같은 사례는 새 슬라이드가 review pass, placeholder image 교체, copy edit을 필요로 했다고 밝힙니다. 즉 산출물은 사람 검토가 남은 draft입니다.
- Figma help는 custom skills가 반복 workflow를 Markdown 지시로 패키징하며, paid plan, file edit access, manual invocation, team/org publish/disable/delete 관리가 필요하다고 설명합니다.
- Figma Make custom font help는 published app에서 custom font가 browser default로 fallback될 수 있으므로 `.woff` 또는 `.woff2` 업로드와 publish modal warning 확인이 필요하다고 설명합니다.
- Figma organization font help는 org/team font upload에 admin 권한과 font license 확인이 필요하다고 설명합니다.

## Dex Inference

- PPT/Slides automation은 "초안 생성"과 "제출 가능한 deck"을 분리해야 합니다.
- Figma Slides나 MCP 기반 deck refresh를 사용할 때는 source freshness ledger, connector source list, template adherence, custom font availability, font license, placeholder swap, copy review, image/icon export format, human approval을 별도 QA 필드로 남겨야 합니다.
- custom skill은 편의 기능이지만, 외부 connector와 결합되면 Notion/Drive/Slack/GitHub 등 private context가 agent prompt로 들어갈 수 있으므로 data exposure 검토가 필요합니다.

## Not Checked

- 에던님 Figma 계정, paid plan, Full seat, file edit access, Figma MCP availability는 확인하지 않았습니다.
- 실제 Figma Slides 파일, custom fonts, connector connection, Slack/Drive/Notion/GitHub 권한, deck export, browser rendering은 테스트하지 않았습니다.
- Figma community skill, `/figma-use-slides` skill package, Figma MCP runtime, Figma Make local codebase integration은 설치하거나 실행하지 않았습니다.
- Threads는 discovery-only 신호만 확인했고 primary source로 쓰지 않았습니다.

## Operational Use

에던님이 PPT 또는 frontend 발표 자료를 맡기실 때 아래처럼 요청할 수 있습니다.

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

## Installation / Security Risk

- Supply chain: custom skills are Markdown instructions, but team-shared or community-sourced skills still require provenance review before reuse.
- Insecure plugin design: MCP/connector use can expose live workspace context. Scope and connector source must be listed.
- Excessive agency: a deck agent can pull live content and generate slides, but final message, visual hierarchy, placeholder images, and citations need human approval.
- Sensitive information disclosure: Slack, Drive, Notion, GitHub, or analytics sources can include private or client data. Do not connect or reference them without explicit project scope.
- Prompt injection: live docs, release notes, and connected tools can carry hostile or irrelevant instructions. Treat them as sources, not instructions.
- Insecure output handling: exported images/icons/fonts can carry licensing or brand risks if rights are not checked.
- Overreliance: on-brand rendering and a fast first draft do not prove the deck is accurate, accessible, or presentation-ready.

## Cross Verification

- Primary workflow source: Figma official blog "4 ways we're using our MCP server at Figma".
- Current topic index cross-check: Figma MCP tag page lists the June 16 Slides/FigJam/Make workflow and July 1 skills post.
- Skills behavior cross-check: Figma Help custom skills page.
- Font publishing cross-check: Figma Help web font upload and organization font upload pages.
- Existing LLM Wiki duplicate check: no existing source note covered "living deck", custom font, source ledger, and human review fields together.

## Original Content

This note preserves source metadata, short paraphrases, and Dex Company operational implications from Figma official blog/help pages. It does not copy the full Figma article or help pages, does not store private workspace content, and does not claim local Figma MCP or account availability.
