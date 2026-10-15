---
type: source-note
status: active
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
disputed: false
sourceKind: official-blog
source:
  - "https://www.figma.com/blog/the-figma-agent-is-here/"
  - "https://www.figma.com/blog/design-systems-ai-mcp/"
collectionPurpose: "Figma agent/MCP/design-system context를 Dex Company 디자인 QA와 접근성 검토 기준으로 보존한다."
dateCreated: 2026-07-03
dateModified: 2026-07-03
created: 2026-07-03
updated: 2026-07-03
verifiedAt: 2026-07-03
verifiedBy: Dex
tags: [llm-wiki/source, figma, design-systems, ai-agents, accessibility]
---

# Figma Design Agent and design-system context

## Original Content

- Sources:
  - https://www.figma.com/blog/the-figma-agent-is-here/
  - https://www.figma.com/blog/design-systems-ai-mcp/
- Publisher: Figma
- Collected: 2026-07-03 23:35 KST
- Preserved scope: URLs, metadata, short summary, operational fit, and verification limits. Full source text was not copied.

## Summary

Figma describes a design agent that works directly on the canvas and uses design-system context such as components, tokens, standards, and best practices. Figma also frames MCP/design-system context as a way to make AI output more relevant and on-brand.

## Dex Company Use

Treat Figma/agent output as exploration and structured context, not automatic approval. Preserve chosen components, tokens, states, and accessibility decisions separately from generated alternatives.

## Evidence Quality

- source-backed: Figma official blog describes design agent, Figma MCP, and design-system context.
- Dex inference: Dex Company design QA should ask whether generated UI follows project tokens and accessibility standards.
- not checked: Figma plan availability, connector permissions, output quality, and local Figma MCP behavior.

## Risk / QA

No connector, MCP server, plugin, or Figma action was run. Design agents and MCP can expose private design files, comments, tokens, and implementation context if permissions are too broad.

## WCAG Link

Figma context is not WCAG proof. Dex should verify WCAG 2.2 criteria in implementation: keyboard access, focus visibility, text alternatives, contrast, target size where applicable, predictable states, and error messaging.
