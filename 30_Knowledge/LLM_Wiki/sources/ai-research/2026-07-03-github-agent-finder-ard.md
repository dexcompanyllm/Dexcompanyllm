---
type: source-note
status: active
confidence: medium
claimType: prescriptive
evidenceScope: multi-source-primary
verificationStatus: partial
disputed: false
sourceKind: official-changelog-and-docs
source:
  - "https://github.blog/changelog/2026-06-17-agent-finder-for-github-copilot-now-available/"
  - "https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/mcp-management"
  - "https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access"
  - "https://github.com/github/agentfinder-catalog"
  - "https://commandline.microsoft.com/agentic-resource-discovery-specification-ard/"
  - "https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/"
collectionPurpose: "MCP/skills/tools를 task-time discovery와 allowlist로 다루는 비교 신호를 Dex Company role routing에 반영하기 위해 보존한다."
dateCreated: 2026-07-03
dateModified: 2026-07-09
created: 2026-07-03
updated: 2026-07-09
verifiedAt: 2026-07-09
verifiedBy: Dex
tags: [llm-wiki/source, github, ai-agents, mcp, skill-routing]
---

# GitHub Agent Finder and Agentic Resource Discovery

## Original Content

- Source: https://github.blog/changelog/2026-06-17-agent-finder-for-github-copilot-now-available/
- Cross-check sources:
  - https://docs.github.com/en/enterprise-cloud@latest/copilot/concepts/mcp-management
  - https://docs.github.com/en/copilot/how-tos/administer-copilot/manage-mcp-usage/configure-mcp-server-access
  - https://github.com/github/agentfinder-catalog
  - https://commandline.microsoft.com/agentic-resource-discovery-specification-ard/
  - https://developers.googleblog.com/announcing-the-agentic-resource-discovery-specification/
- Publisher: GitHub
- Collected: 2026-07-03 23:35 KST
- Refreshed: 2026-07-09 09:03 KST
- Preserved scope: URL, metadata, short summary, operational fit, and verification limits. Full source text was not copied.

## Summary

GitHub announced Agent Finder for Copilot: agents can discover MCP servers, skills, agents, canvases, and tools from a registry at task time, while enterprise settings govern what can be discovered and used. The changelog states discovery does not silently connect resources.

2026-07-09 refresh: GitHub Enterprise Cloud docs now give this a clearer operating surface: MCP registries are catalogs of server manifests, Agent Finder searches catalogs for ranked task-time matches, and MCP policy settings can manage server usage, registry URL, and whether access is restricted to registry servers. GitHub's catalog repository states the catalog is community-editable, MIT licensed, and organized as JSON files under publisher directories. Microsoft and Google describe ARD as a cross-vendor discovery/spec layer for publishing, discovering, and verifying agentic resources.

## Dex Company Use

Dex Company should separate discovery, ranking, approval, and connection. Found resources remain candidates until installation and permission risks are reviewed.

Before adopting any agent/resource discovery mechanism, Dex Company should record registry URL/source, public vs private catalog, publisher identity, manifest/schema validation, allowlist policy, managed setting owner, supported surface/version, discovered resource type, ranking rationale, installation/connection step, rollback path, and audit evidence.

## Evidence Quality

- source-backed: GitHub changelog/docs describe Agent Finder, MCP registry, policy settings, registry URL, allowlist restriction, supported surfaces, and no silent connection; GitHub catalog README describes catalog structure and governance properties; Microsoft/Google announcements describe ARD as a cross-vendor discovery specification.
- Dex inference: Dex Company should model this as discovery-only until a target registry, manifest, allowlist, connection approval, rollback, and validation command are known.
- not checked: Ethan's GitHub/Copilot plan, enterprise/org policy, local Copilot CLI/IDE versions, actual registry URL, catalog entries' package/security quality, and runtime behavior.

## Risk / QA

No registry, MCP, SDK, skill, connector, or tool was installed. Discovery can reduce context bloat but adds supply-chain and insecure plugin-design risk if registry trust, publisher identity, manifest validation, and allowlist enforcement are weak.

## WCAG Link

Not directly a UI accessibility source. If discovered resources modify UI, WCAG 2.2 checks apply to generated artifacts.
