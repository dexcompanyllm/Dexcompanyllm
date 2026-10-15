---
type: llm-wiki-inbox
status: active
title: "10x Growth Scan Candidate Queue - 2026-07-03"
created: 2026-07-03
updated: 2026-07-03
dateCreated: 2026-07-03
dateModified: 2026-07-03
confidence: mixed
claimType: mixed
evidenceScope: multi-source-mixed
verificationStatus: partial
verifiedAt: 2026-07-03
verifiedBy: Dex
disputed: false
sourceKind: search-candidate-queue
source: "Multiple public web search results and official source candidates"
collectionPurpose: "에던님이 정정한 10배 기준에 맞춰 평소보다 훨씬 많은 성장 스캔 후보를 먼저 모으고, 다음 실행에서 원래 기준 적합성, 중복, 저장, 설치 감사를 이어갈 작업판을 만든다."
tags:
  - llm-wiki/inbox
  - growth-scan
  - 10x
  - candidate-queue
---

# 10x Growth Scan Candidate Queue - 2026-07-03

## Scope

- 수집 시각: 2026-07-03 19:14 KST
- 목표: 일반 성장 스캔 후보 5-12개의 약 10배인 50-120개 후보를 향한 1차 큐 작성
- 이번 큐 수: 60개
- 우선 확인: OpenAI Cookbook 반복 수리 루프, Codex Goals, MCP Apps 설치 판단
- 저장 원칙: 이 파일은 inbox queue다. 검증이 끝난 source note가 아니다.

## Status Legend

| Status | Meaning |
|---|---|
| `duplicate-source` | 이미 LLM Wiki source로 저장됨 |
| `audit-done` | 이번 실행에서 별도 설치 감사 노트로 저장됨 |
| `eligible-next` | 다음 실행에서 source note 승격 후보 |
| `install-audit-next` | 설치 가능한 도구라 다음 실행에서 감사 필요 |
| `not-checked` | 검색 결과 수준만 확인. 원문/라이선스/리스크 미검증 |
| `reject-likely` | 품질 또는 출처가 약해 우선순위 낮음 |

## Candidate Table

| # | Lane | Candidate | URL | Current Status | Why It Matters |
|---:|---|---|---|---|---|
| 1 | OpenAI / Codex | OpenAI Cookbook - Using Goals in Codex | https://developers.openai.com/cookbook/examples/codex/using_goals_in_codex | duplicate-source | Codex persistent objective and completion audit loop source. |
| 2 | OpenAI / Codex | OpenAI Codex - Follow a goal | https://developers.openai.com/codex/use-cases/follow-goals | duplicate-source | Current Goal mode behavior and validation loop reference. |
| 3 | OpenAI / Codex | Codex changelog | https://developers.openai.com/codex/changelog | duplicate-source | Fast-changing Codex app/CLI feature surface. |
| 4 | OpenAI / Codex | Codex best practices | https://developers.openai.com/codex/learn/best-practices | stored-source | Could improve Dex Company prompting, validation, skills, automations. |
| 5 | OpenAI / Codex | Codex configuration reference | https://developers.openai.com/codex/config-reference | stored-source | Useful for durable config, MCP, goals, and local setup rules. |
| 6 | OpenAI / Codex | Codex prompting | https://developers.openai.com/codex/prompting | stored-source | Useful for goal text, completion criteria, and instruction hygiene. |
| 7 | OpenAI / Codex | Codex subagents | https://developers.openai.com/codex/subagents | stored-source | Useful for future 10x parallel scan design. |
| 8 | OpenAI / API | OpenAI API changelog and migration guidance | https://developers.openai.com/ | duplicate-source | API rules change often; existing source covers migration/deprecations. |
| 9 | OpenAI / API | OpenAI web search controls | https://platform.openai.com/docs/guides/tools-web-search | duplicate-source | Search provenance and source listing behavior. |
| 10 | OpenAI / Apps | OpenAI Apps SDK docs | https://developers.openai.com/apps-sdk/ | duplicate-source | Long-term interactive app comparison with MCP Apps. |
| 11 | MCP Apps | modelcontextprotocol/ext-apps official repo | https://github.com/modelcontextprotocol/ext-apps | audit-done | Official MCP Apps SDK/spec repo; install audit created. |
| 12 | MCP Apps | MCP Apps Overview | https://apps.extensions.modelcontextprotocol.io/api/documents/overview.html | stored-source | Official overview for sandboxed iframe and UI resource model. |
| 13 | MCP Apps | MCP Apps CSP and CORS | https://apps.extensions.modelcontextprotocol.io/api/documents/csp-and-cors.html | stored-source | Required for install gate and network-origin safety. |
| 14 | MCP Apps | MCP Apps permissions API | https://apps.extensions.modelcontextprotocol.io/api/interfaces/app.McpUiResourcePermissions.html | stored-source | Camera, mic, geolocation, clipboard permission gate. |
| 15 | MCP Apps | MCP Apps resource metadata API | https://apps.extensions.modelcontextprotocol.io/api/interfaces/app.McpUiResourceMeta.html | stored-source | Dedicated origin, CORS/OAuth implications. |
| 16 | MCP Apps | MCP Apps registerAppResource helper | https://apps.extensions.modelcontextprotocol.io/api/functions/server-helpers.registerAppResource.html | stored-source | Implementation reference for project-specific MCP UI. |
| 17 | MCP Apps | MCP Apps Agent Skills docs | https://apps.extensions.modelcontextprotocol.io/api/documents/Agent_Skills.html | audit-done | Skill packaging and host compatibility need Codex-specific review. |
| 18 | MCP Apps | ext-apps convert-web-app skill | https://github.com/modelcontextprotocol/ext-apps/blob/main/plugins/mcp-apps/skills/convert-web-app/SKILL.md | audit-done | Potential skill candidate; not Codex-proven. |
| 19 | MCP Apps | ext-apps pdf-server example | https://github.com/modelcontextprotocol/ext-apps/blob/main/examples/pdf-server/README.md | audit-done | Useful reference, but example server install must be audited. |
| 20 | MCP Apps | ext-apps issues list | https://github.com/modelcontextprotocol/ext-apps/issues | audit-done | Audited for maturity signal; open issue count and recent issue activity require project-specific QA before adoption. |
| 21 | MCP Apps | Pinned or Split Screen MCP Apps issue | https://github.com/modelcontextprotocol/ext-apps/issues/684 | audit-done | Audited as persistent/split UI UX gap; no default host capability assumed. |
| 22 | MCP Apps | MCP App sampling discussion | https://github.com/modelcontextprotocol/ext-apps/discussions/474 | audit-done | Audited against MCP draft/SEP-2577; do not build new defaults on Sampling. |
| 23 | MCP Apps | JSON-LD MCP App Discovery discussion | https://github.com/modelcontextprotocol/ext-apps/discussions/606 | audit-done | Audited as discussion-only discovery proposal; not a stable implementation basis yet. |
| 24 | MCP | MCP authorization spec | https://modelcontextprotocol.io/specification/2025-03-26/basic/authorization | duplicate-source | Auth boundary for MCP servers and protected resources. |
| 25 | MCP | MCP security best practices | https://modelcontextprotocol.io/ | duplicate-source | Existing security source covers MCP install gate. |
| 26 | Design Systems | W3C Design Tokens first stable | https://www.w3.org/community/design-tokens/2025/10/28/design-tokens-specification-reaches-first-stable-version/ | duplicate-source | Design token interoperability. |
| 27 | Design Systems | Design Tokens Community Group press kit | https://www.designtokens.org/press-kit/ | duplicate-in-queue | Useful cross-check for W3C token standard messaging. |
| 28 | Design Systems | USWDS design tokens | https://designsystem.digital.gov/design-tokens/ | stored-source | Government-grade token docs and accessibility bias. |
| 29 | Design Systems | VA.gov design tokens | https://design.va.gov/foundation/design-tokens | stored-source | Real product design token application on top of USWDS. |
| 30 | Design Systems | Material Design | https://m3.material.io/ | duplicate-source | Major design system reference; not yet source-note audited. |
| 31 | Design Systems | IBM Carbon Design System | https://carbondesignsystem.com/ | duplicate-source | Enterprise/data-heavy UI patterns. |
| 32 | Design Systems | Microsoft Fluent Design System | https://fluent2.microsoft.design/ | stored-source | Windows/Microsoft interaction patterns. |
| 33 | Design Systems | Adobe Spectrum | https://spectrum.adobe.com/ | stored-source | Creative/pro tool design system reference. |
| 34 | Design Systems | Shopify Polaris | https://polaris.shopify.com/ | stored-source | Commerce/admin workflow design system reference. |
| 35 | Design Systems | Atlassian Design System | https://atlassian.design/ | stored-source | Collaboration and enterprise workflow patterns. |
| 36 | Design Systems | Atlassian design tokens for Trello Power-Ups | https://developer.atlassian.com/cloud/trello/power-ups/color-theme-compliance/using-atlassian-design-tokens/ | stored-source | Fresh token usage example from search result. |
| 37 | Design Systems | GOV.UK Design System | https://design-system.service.gov.uk/ | duplicate-source | Public-service accessibility and content design. |
| 38 | Design Systems | Backlight best design system examples | https://backlight.dev/mastery/best-design-system-examples | dropped-low-signal | Curated index only; existing official design-system source notes are stronger. |
| 39 | UX Research | NN/g AI UX topic index | https://www.nngroup.com/topic/artificial-intelligence/ | duplicate-source | Existing AI UX source. |
| 40 | UX Research | NN/g Context Architecture | https://www.nngroup.com/articles/context-architecture/ | duplicate-source | Existing agent-readable context source. |
| 41 | UX Research | NN/g AI Agents as Users | https://www.nngroup.com/articles/ai-agents-users/ | duplicate-source | Existing AI agent UX source. |
| 42 | UX Research | NN/g Accelerating Research with AI | https://www.nngroup.com/articles/research-with-ai/ | stored-source | Useful for AI-assisted UX research boundaries. |
| 43 | UX Research | Maze Future of User Research Report 2026 | https://maze.co/resources/user-research-report/ | stored-source | Current AI-in-research report; stored with vendor bias/provenance caveat. |
| 44 | UX Research | Frontier UX Research circa May 2026 | https://genpurpose.substack.com/p/frontier-ux-research-circa-may-2026 | carried-research-signal | Personal/Substack synthesis with LLM-assisted research and conversations; useful only as a question generator, not a verified practice source. |
| 45 | UX Research | Dovetail AI tools for UX research | https://dovetail.com/ux/ai-tools-for-ux-research/ | dropped-low-signal | Vendor list article; weaker than existing NN/g, Maze, and official/accessibility-linked UX research notes. |
| 46 | UX Research | Great Question user research tools 2026 | https://greatquestion.co/blog/best-user-research-tools-in-2026-10-platforms-compared | carried-vendor | Vendor comparison; useful ResearchOps/tool-sprawl signal only with bias and pricing/provenance caveat. |
| 47 | Frontend | React official blog | https://react.dev/blog | duplicate-source | Existing React source. |
| 48 | Frontend | Next.js blog | https://nextjs.org/blog | stored-source | Frontend release/change source; stored via official GitHub releases surface. |
| 49 | Frontend | Vite releases | https://github.com/vitejs/vite/releases | stored-source | Build tooling changes and security fixes. |
| 50 | Frontend | Playwright release notes | https://playwright.dev/docs/release-notes | duplicate-source | Existing web QA source. |
| 51 | Frontend | Storybook accessibility testing docs | https://storybook.js.org/docs/writing-tests/accessibility-testing | duplicate-source | Existing frontend QA source. |
| 52 | Frontend | Storybook Vitest addon docs | https://storybook.js.org/docs/writing-tests/integrations/vitest-addon/index | stored-source | Component testing workflow candidate. |
| 53 | Frontend | Storybook 9 blog | https://storybook.js.org/blog/storybook-9/ | stored-source | UI state/test-generation changes. |
| 54 | Frontend | GitLab Storybook accessibility tests | https://docs.gitlab.com/development/fe_guide/accessibility/storybook_tests/ | stored-source | Real engineering practice reference for a11y automation. |
| 55 | Obsidian | Obsidian changelog | https://obsidian.md/changelog/ | duplicate-source | Existing 1.13/Bases/CLI source. |
| 56 | Obsidian | Obsidian CLI help | https://obsidian.md/help/cli | stored-source | Direct operational value for Codex + Obsidian automation. |
| 57 | Obsidian | Obsidian roadmap | https://obsidian.md/roadmap/ | duplicate-source | Existing roadmap source. |
| 58 | Obsidian | Obsidian Bases docs | https://help.obsidian.md/bases | duplicate-source | Existing Bases source. |
| 59 | Career Ops | GitHub skills/open source maintenance pattern | https://openai.com/ | duplicate-source | Existing OpenAI skills source; use for workflow asset framing. |
| 60 | Career Ops | career-ops release candidate | https://github.com/search?q=career-ops+v1.16.0&type=repositories | duplicate-source | Existing release source; future use should focus on Ethan-specific career ops fit. |
| 61 | OpenAI / Codex | Codex Agent Skills | https://developers.openai.com/codex/skills | stored-source | Official skill creation and best-practice source. |
| 62 | OpenAI / Codex | Codex Automations | https://developers.openai.com/codex/app/automations | stored-source | Recurring task and inbox behavior source. |
| 63 | OpenAI / Codex | Codex MCP | https://developers.openai.com/codex/mcp | stored-source | Official MCP boundary source for Codex. |
| 64 | OpenAI / Codex | Use Codex with the Agents SDK | https://developers.openai.com/codex/guides/agents-sdk | stored-source | Codex as MCP server and multi-agent workflow candidate. |
| 65 | OpenAI / Codex | Save workflows as skills | https://developers.openai.com/codex/use-cases/reusable-codex-skills | stored-source | Workflow-to-skill conversion candidate. |
| 66 | OpenAI / Codex | Codex customization concepts | https://developers.openai.com/codex/concepts/customization | stored-source | MCP plus skills trust-boundary source. |
| 67 | Microsoft Agents | Microsoft Agent Framework Overview | https://learn.microsoft.com/en-us/agent-framework/overview/ | stored-source | Enterprise agent framework comparison source. |
| 68 | Microsoft Agents | Microsoft Agent Framework docs | https://learn.microsoft.com/en-us/agent-framework/ | duplicate-source | Official Agent Framework docs hub. |
| 69 | Microsoft Agents | Semantic Kernel documentation | https://learn.microsoft.com/en-us/semantic-kernel/ | duplicate-source | Agent framework lineage and enterprise AI source. |
| 70 | Microsoft Agents | Semantic Kernel Agent Framework | https://learn.microsoft.com/en-us/semantic-kernel/frameworks/agent/ | stored-source | Agentic pattern and SK framework source. |
| 71 | GitHub / MCP | GitHub About MCP | https://docs.github.com/en/copilot/concepts/context/mcp | duplicate-source | Already covered by GitHub Copilot MCP source, but useful cross-check. |
| 72 | GitHub / MCP | Configure MCP servers for repository | https://docs.github.com/copilot/how-tos/copilot-on-github/customize-copilot/configure-mcp-servers | stored-source | Repo-scoped MCP configuration source. |
| 73 | GitHub / Agents | Custom agents configuration | https://docs.github.com/en/copilot/reference/custom-agents-configuration | stored-source | Agent profile and tool/MCP config source. |
| 74 | GitHub / Skills | Adding agent skills for GitHub Copilot | https://docs.github.com/en/copilot/how-tos/copilot-on-github/customize-copilot/customize-cloud-agent/add-skills | stored-source | Agent skill packaging comparison source. |
| 75 | GitHub / MCP | Enhance agent mode with MCP | https://docs.github.com/en/copilot/tutorials/enhance-agent-mode-with-mcp | stored-source | MCP confirmation and custom instruction safety source. |
| 76 | AI Agents | LangChain AI agent frameworks 2026 | https://www.langchain.com/resources/ai-agent-frameworks | carried-vendor | Vendor comparison with ecosystem signal; use only when agent framework selection is active and bias/security checks are needed. |
| 77 | AI Agents | Langfuse open-source AI agent comparison | https://langfuse.com/blog/2025-03-19-ai-agent-comparison | carried-vendor | Observability vendor comparison; useful only for eval/trace stack due diligence with bias caveat. |
| 78 | AI Agents | Microsoft Agent Framework migration context | https://learn.microsoft.com/en-us/agent-framework/overview/ | duplicate-in-queue | Same as item 67; keep as cross-check only. |
| 79 | Design Systems | Material Design tokens | https://m3.material.io/foundations/design-tokens | stored-source | Official Material token source. |
| 80 | Design Systems | Carbon Design System | https://carbondesignsystem.com/ | stored-source | Official IBM design system source, stored via accessibility overview. |
| 81 | Design Systems | Atlassian design tokens | https://atlassian.design/tokens/design-tokens | duplicate-in-queue | Official Atlassian token source. |
| 82 | Design Systems | GC Design System tokens | https://design-system.canada.ca/en/styles/design-tokens/ | stored-source | Government design token source. |
| 83 | Frontend | Storybook Next.js with Vite | https://storybook.js.org/docs/get-started/frameworks/nextjs-vite | stored-source | Official Storybook/Next/Vite integration source. |
| 84 | Frontend | Storybook Vitest Addon | https://storybook.js.org/docs/writing-tests/integrations/vitest-addon | stored-source | Official component test integration source. |
| 85 | Frontend | Vitest 4.1 release | https://vitest.dev/blog/vitest-4-1.html | stored-source | Vite 8 support and testing stack currentness source. |
| 86 | Frontend | Next.js blog | https://nextjs.org/blog | duplicate-in-queue | Same Next.js currentness lane as item 48; use stored GitHub releases source. |
| 87 | Frontend | Vite releases | https://github.com/vitejs/vite/releases | duplicate-in-queue | Build tool release and security signal. |
| 88 | Frontend | GitLab Storybook accessibility tests | https://docs.gitlab.com/development/fe_guide/accessibility/storybook_tests/ | duplicate-source | Duplicate of item 54 and existing source note. |
| 89 | Obsidian | Obsidian CLI Help | https://obsidian.md/help/cli | stored-source | Official CLI and Bases command source. |
| 90 | Obsidian | Obsidian Help Bases | https://help.obsidian.md/bases | duplicate-source | Existing Bases source covers this. |
| 91 | UX Research | Maze Future of User Research 2026 | https://maze.co/resources/user-research-report/ | duplicate-in-queue | Same as item 43; stored with vendor bias caveat. |
| 92 | UX Research | NN/g Accelerating Research with AI | https://www.nngroup.com/articles/research-with-ai/ | duplicate-in-queue | Same as item 42; stored-source. |
| 93 | UX Research | Dovetail What is UX research | https://dovetail.com/ux/what-is-ux-research/ | dropped-low-signal | Basic vendor educational source; NN/g and stored Maze/current UX research notes are more useful. |
| 94 | UX Research | Great Question research tools 2026 | https://greatquestion.co/blog/best-user-research-tools-in-2026-10-platforms-compared | duplicate-in-queue | Duplicate of item 46; keep one carried-vendor row only. |
| 95 | Design Systems | Design Tokens Community Group press kit | https://www.designtokens.org/press-kit/ | duplicate-in-queue | Cross-check for W3C token standard messaging. |

## Immediate Decisions

- `audit-done`: MCP Apps official repo has moved from vague candidate to install decision tiers via `2026-07-03-mcp-apps-install-audit`.
- `stored-source`: 10 items from this queue have been promoted into source notes in the continuation run.
- `duplicate-source`: existing LLM Wiki coverage should not be duplicated.
- `eligible-next`: remaining official/high-quality candidates are next-run source note candidates if provenance and relevance hold.
- `install-audit-next`: installable/example/skill candidates need install gates before any execution.
- `not-checked`: vendor comparison and secondary index items are discovery signals only.
- `carried-vendor`: Great Question remains as a possible ResearchOps/tool-sprawl signal, but only with bias and pricing caveats.
- `dropped-low-signal`: Backlight roundup and Dovetail basic education page should not be repeated next run unless Ethan asks for tool/vendor comparison.

## 2026-07-03 22:33 Queue Hygiene

- Rejudged item 38 Backlight as `dropped-low-signal` because official design-system source notes now cover the operational need better.
- Rejudged item 46 Great Question as `carried-vendor` because the page has a concrete ResearchOps/tool-consolidation angle but is vendor-authored.
- Rejudged item 93 Dovetail basic UX research page as `dropped-low-signal` because it is broad vendor education and weaker than existing NN/g/Maze notes.
- Rejudged item 94 Great Question duplicate as `duplicate-in-queue`.
- Current queue count after this hygiene pass: `eligible-next=0`, `audit-done=8`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `not-checked=5`, `carried-vendor=1`, `dropped-low-signal=2`, `install-audit-next=0`.

## 2026-07-03 23:03 Queue Hygiene

- Rejudged item 44 Frontier UX Research as `carried-research-signal` because it is useful as a prompt for research-team questions, but it is a personal synthesis with LLM-assisted secondary research and conversation-based evidence.
- Rejudged item 45 Dovetail AI tools as `dropped-low-signal` because existing NN/g, Maze, and Great Question carried-vendor notes already cover the operational question with clearer caveats.
- Rejudged item 76 LangChain agent framework comparison as `carried-vendor` because it can support future framework due diligence, but it is vendor-authored and should not override official OpenAI/GitHub/Microsoft sources.
- Rejudged item 77 Langfuse framework comparison as `carried-vendor` because it is relevant when observability/eval stack selection is active, but it is vendor-authored and not an install basis.
- Current queue count after this hygiene pass: `eligible-next=0`, `audit-done=8`, `stored-source=43`, `duplicate-source=28`, `duplicate-in-queue=9`, `not-checked=0`, `carried-vendor=3`, `carried-research-signal=1`, `dropped-low-signal=3`, `install-audit-next=0`.

## Next Queue Eval

The next 10x run passes only if it:

1. Keeps the queue at 90+ candidates and refreshes currentness before using older items.
2. Promotes additional high-value `eligible-next` items to source notes or explicitly rejects them with evidence.
3. Runs duplicate checks against `sources`, `wiki`, `index`, `log`, and `00_Inbox`.
4. For installable items, records pass/conditional/blocked instead of leaving them as generic candidates.
