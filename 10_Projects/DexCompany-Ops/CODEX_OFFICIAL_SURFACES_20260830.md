# Codex official surfaces and allowance policy — 2026-08-30

## Scope

This note records refreshed official OpenAI guidance that materially affects Dex Company routing, Windows host strategy, Work/mobile integration and security boundaries. Codex `0.151.0` remains the recommended stable target.

Official sources:

- https://help.openai.com/en/articles/11369540-using-codex-with-your-chatgpt-plan
- https://help.openai.com/en/articles/20001275/
- https://learn.chatgpt.com/docs/plugins

## Confirmed findings

### Windows surfaces

- `confirmed`: OpenAI documents Codex Doctor, Remote Control and WSL distribution selection as Windows Codex capabilities.
- `confirmed`: OpenAI documents Browser Developer Mode with full CDP access for deeper browser debugging and explicitly warns that this access can expose sensitive browser internals and requires explicit approval before use on a website.
- `confirmed`: Runtime PR #29 already integrated only the low-risk `codex doctor --json` diagnostic preflight.

### Shared agentic allowance

- `confirmed`: OpenAI states that Codex, ChatGPT Work, ChatGPT for Excel and Workspace Agents use a shared allowance/credit pool when those surfaces are available on the plan.
- `confirmed`: usage can vary with model, execution location, task complexity, context, reasoning, speed and tools.
- `confirmed`: where supported, ChatGPT Desktop can show per-chat Work/Codex usage.
- `confirmed`: tasks started through Voice in Work or Codex draw from the same shared agentic allowance/credit pool, while connected Voice time can be metered separately where flexible pricing applies.

### Work / Codex surface matrix — 2026-09-01 checkpoint

- `confirmed`: Work is available on eligible ChatGPT web, mobile and desktop surfaces. Cloud Work chats sync across those surfaces.
- `confirmed`: Work on web/mobile runs in the cloud. Local Work is desktop-only and web/mobile cannot directly access local files on the user's computer.
- `confirmed`: Codex remains a separate ChatGPT desktop view. Codex is not selectable on web/mobile; supported desktop Codex chats can be accessed from the ChatGPT mobile Remote tab without becoming normal web/mobile chat history.
- `confirmed`: Work Cloud, Work Local and Codex Local are separately controlled workspace permissions.
- `confirmed`: Plugins work in Chat and Work across web/desktop/mobile and in Codex in the ChatGPT desktop app. Mobile can use plugins already available to the account in Chat or Work. The Codex IDE extension does not support plugins.
- `confirmed`: Voice is a desktop capability for Work and Codex on macOS and Windows, uses the selected experience's existing tools/permissions, and may require microphone plus Screen & Audio Recording / Accessibility permissions depending on computer context.
- `confirmed`: Work can run scheduled tasks and, for eligible plans/workspaces, event-triggered tasks. Current documented event sources include new Gmail messages, new Slack channel messages and GitHub pull-request activity. Web/supported mobile can create or edit event triggers; desktop can display existing triggers but cannot create/edit their trigger conditions.
- `unknown`: the Help article reports a recent update, but Dex cannot independently reconstruct which exact bullets changed between the immediately previous hourly provider-check and this checkpoint. These facts are therefore canonicalized as the current official boundary, not all claimed as new-in-this-hour deltas.

## Dex interpretation

- `inference`: duplicating the same task across agentic surfaces does not provide reliable quota savings when the plan uses a shared pool.
- `proposal`: route by capability, expected quality and rework reduction, with one accountable execution owner by default. Use additional surfaces only for complementary work whose expected benefit justifies additional shared-pool usage.
- `proposal`: WSL selection may be evaluated only when WSL already exists on the approved host and there is a concrete reliability/performance reason.
- `proposal`: Remote Control and Browser full CDP remain security-design backlog items and are not enabled by Dex.
- `proposal`: Runtime #34 should use Work/Chat plugins as the cross-device submit/status/result path on web/mobile/desktop. Do not design a direct mobile Codex selector path; mobile Codex belongs to Remote unless OpenAI changes the contract.
- `proposal`: prefer Work Cloud + Dex remote plugin/MCP for cross-device Task intake/status/result, while local filesystem mutation remains behind the dedicated worker/broker boundary.
- `proposal`: Work scheduled/event-triggered tasks are optional future intake adapters only. GitHub Task Bus remains the canonical Dex Task authority, and trigger delivery must not become a second state machine or bypass idempotency, OAuth, approval or durable-result rules.
- `proposal`: Voice can later act as another human Task-intake/coordination surface, but it does not justify microphone automation, always-listening behavior, broader permissions, external messaging or a separate worker execution authority.

## Implemented optimization

Runtime PR #31 changed `config/codex-capability-tracking.json` schema `1.2` -> `1.3` and added:

- `usagePolicy.agenticAllowance: shared-when-plan-supports`
- `usagePolicy.routingPrinciple: single-owner-low-rework`
- `usagePolicy.quotaArbitrageAssumption: false`
- paid API and automatic extra usage remain false
- `guardianCompactionAuthorization`: upstream-main / watch-disabled
- `windowsRemoteControl`: security-design-backlog / disabled
- `windowsWslSelection`: host-evaluation / disabled
- `browserFullCdpAccess`: security-design-backlog / disabled

Runtime validation run `33312295800` passed static checks, unit tests, smoke tests, Vercel adapter smoke, rollback guard and production dependency audit. Runtime PR #31 merged as `cde12997fd69aba114fa4f4bf518d4338339455d`.

Runtime Issue #30 tracks Windows/Remote/CDP security and approved-host gates:
https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/30

Runtime Issue #34 tracks Work/mobile/plugin submit/status/result and now contains the current Work/Codex/Voice/scheduled-trigger surface checkpoint:
https://github.com/ethanhee890-commits/ethanhee890-commits-dex-company-runtime/issues/34

## Safety and cost boundaries

- No prerelease activation.
- No paid API, automatic paid fallback or automatic extra paid usage.
- No Remote Control activation.
- No WSL installation, distribution creation or automatic switching.
- No Browser full-CDP activation.
- No permission expansion.
- No duplicated Work/Codex/Agent/Voice-started task execution solely to pursue assumed separate quotas.
- No direct-mobile-Codex selector assumption; use Work/Chat plugin flow or the product-owned Remote surface according to capability.
- No Work scheduled/event-triggered task becomes a canonical Dex task authority.
- No automatic microphone, Screen & Audio Recording, Accessibility or external-messaging permission grant.

## Verification

### PASS

- Official OpenAI guidance review
- Runtime shared-allowance policy/config implementation
- Runtime Issue #34 surface-boundary checkpoint
- Runtime regression tests and CI run `33312295800`
- Production dependency audit
- Runtime PR #31 merge

### FAIL

- None in the implemented/automated scope.

### Not Checked

- Account-specific allowance quantity or reset state
- Current account/workspace Work Cloud, Work Local, plugin and Voice availability
- Actual Dex plugin submit/status/result E2E on Work web/mobile/desktop — Runtime #34
- Work scheduled/event-triggered Dex intake E2E; not required for #34 MVP and remains optional
- Whether the approved Windows host already has WSL and whether it would improve Dex execution
- Remote Control security/E2E gate
- Browser full-CDP security/E2E gate

## Handoff

Keep the approved-host validation order introduced by Runtime PR #29:

```powershell
npm.cmd run codex:doctor
npm.cmd run codex:compatibility
npm.cmd run codex:status
```

For task routing, assume eligible agentic surfaces can share one allowance. Prefer a single execution owner and avoid redundant runs unless a second surface contributes a distinct capability or independent verification value.

For #34, model the supported product paths as:

- Work/Chat web/mobile/desktop + installed Dex plugin -> Dex remote MCP -> canonical GitHub Task Bus
- Codex desktop -> Dex plugin/worker paths as separately supported
- Mobile Codex access -> OpenAI Remote surface only; do not treat it as a normal mobile Codex/plugin selector
- Voice on desktop -> optional human intake/coordination over the selected Work/Codex permission set, sharing the same agentic task allowance
- Work scheduled/event triggers -> optional noncanonical intake adapters requiring their own idempotency/security E2E before Dex use
