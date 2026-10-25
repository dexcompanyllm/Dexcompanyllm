---
name: use-dex-company
description: Load and apply the minimum approved Dex Company context from GitHub before developing, marketing, business analysis, researching, planning, reviewing, learning, or handing off work. Use when a request mentions Dex Company, Dex, 덱스, 덱스 컴퍼니, Dex에 저장, Dex에 학습, project state, task intake, handoff, canonical policy, or cross-AI continuation.
---

# Use Dex Company

## Goal

Start Dex work from approved GitHub state instead of chat memory, a local path, or an unverified summary. Load only the context required for the current task and preserve a verifiable handoff. Dex is a personal AI operating system across domains; screen specifications are one optional domain skill.

## Canonical source

- Knowledge and control state: `dexcompanyllm/Dexcompanyllm` approved `main`
- Runtime implementation: `dexcompanyllm/Dexcompanyllm` approved `main`
- Project code and binary artifacts: the project repository named in `PROJECT_CONFIG.md`

A conversation, model memory, cached plugin copy, or one machine's filesystem is not canonical state.

## Context order

Read the minimum useful set in this order:

1. `AI_CONTRACT.md`
2. `CURRENT_STATE.md`
3. Target project's `PROJECT_CONFIG.md`
4. Target project's `CURRENT.md`
5. Target project's `SESSION_HANDOFF.md`
6. Existing `TASK.yaml`, checkpoint, evidence, or linked GitHub Issue
7. Only the relevant `DECISIONS.md`, `QA_REPORT.md`, `SOURCES.md`, specification, or knowledge note

Do not load every file by default.

## Data and normalization

Only for work that changes data standards, schemas, catalogs, data identifiers
such as project, Task, source, or record IDs, or normalization, also read the approved Wiki `20_Codex_Handoff/DATA_STANDARD.md`
and `20_Codex_Handoff/DATA_CATALOG.json`, then the target project's
`DATA_MODEL.md` when present.

- Treat a catalog as a reference map, not proof that its targets are current or correct.
- Preserve existing IDs, provenance, revisions, observation times, and distinct status meanings. Unknown values stay unknown rather than becoming empty, zero, or complete.
- Choose one authoritative fact and reference it instead of copying mutable state. Different dates, commits, hosts, or verification scopes remain separate observations.
- Before converting existing records, verify the reader, field mapping, round trip, rollback, and regression evidence. Do not bulk-delete, rename, move, or normalize source records from similarity alone.

## Tool routing

1. Prefer a connected Dex MCP tool when it provides the required read operation and current identity is verified.
2. Otherwise use the connected GitHub repository as the native bridge.
3. For code, file, build, test, deployment, or local-host work, route to the Runtime or project repository and an execution worker.
4. If neither Dex MCP nor GitHub is available, do not claim that canonical state was checked. Prepare a Task Packet with the missing reads and exact acceptance criteria.

## Design quality routing

For repeated visual defects, generic visual output, design-system work, or design-fidelity review, load `design-quality` after the minimum Dex context. Keep `create-screen-spec` in control of screen-specification structure and the target project's established artifact format. Do not require the design workflow for unrelated Dex tasks.

Treat `EVIDENCE_PACKAGE_COMPLETE` as one bounded evidence-check result only. It does not replace the canonical Task outcome, erase a detailed `FAIL`, convert `Not Checked` to PASS, or prove installation, rendering, accessibility, reviewer identity, or design quality.

## Task intake

For a request to continue or receive work from another AI, discover the available
Dex tools first. If `list_handoffs` and `get_task_handoff` are available, use the
current surface's routing label (`chatgpt` for ChatGPT/Codex, `claude` for
Claude/Claude Code, `gemini` for a connected Gemini environment). The label is
not proof of account identity or data-sharing authority.

- With an existing Task ID, call `get_task_handoff` for that same Task directly.
- Otherwise call `list_handoffs`, follow `nextPage` as needed, and match the
  user's project or objective. An empty partial page is not an empty inbox.
  If multiple tasks fit, ask only which task to continue; do not guess or start
  all of them. Read the selected task with `get_task_handoff`.
- Treat warnings or truncation as incomplete discovery. Do not claim the list is
  exhaustive or the inbox is empty; report affected tasks when relevant and use
  an authorized direct or alternative read without bypassing limits.
- Use the freshly returned context and approved main when `snapshotChanged` is
  true. Preserve incomplete results, approvals and unresolved writer state.
- If these tools are unavailable but an authorized GitHub connector exists,
  read the known Task Issue and its comments. Shared records begin with
  `Dex Company shared handoff v1`; read current Task events/results and current
  approved main before continuing. Never treat a saved snapshot as new authority.
- Do not ask for copied handoff text when an authorized connection can retrieve
  it. Record GitHub storage, context retrieval and execution as separate facts.
  Read-only retrieval never writes an acknowledgement, claims a lease, starts a
  worker or proves receipt by another AI. Existing execution gates still apply.

This behavior requires the skill/instructions and connection to be available in
the receiving environment; source updates alone do not install them, wake an
idle AI, or start a consumer chat. Built-in GitHub imports may be snapshots.
The same email address across services does not establish shared permissions.

Before execution, identify:

- objective and user-visible outcome
- target project and repositories
- files or artifacts to preserve
- requested changes and explicit exclusions
- approvals and side effects
- completion criteria
- security, cost, and rollback risks
- capabilities required from the execution worker

Use existing task identity and evidence when present. Do not create a parallel task for the same side effect.

## Actionable recovery

When a command, tool, menu path, or execution route does not match the current
environment, make recovery easy to understand and act on:

1. Explain the mismatch in plain language and show the actual check and failure point first.
2. Label the cause as `confirmed`, `inference`, or `unknown`.
3. Complete any safe action already inside the recorded approval and permission scope before asking Ethan to act.
4. If new permission is required, name the exact permission, why it is needed, and what Dex will do after it is granted.
5. If Ethan must enter something, provide one complete copy-ready command. Do not invent a menu, button, path, or command that was not checked.
6. Do not ask for a setting, value, or input already verified for the same failure. Try one failure method at most twice, then use or record a different verifiable route.
7. If an approved execution host is unavailable, preserve the objective, scope, completion criteria, evidence, rollback, and next command in the same Task. Do not require the original request to be re-entered.

This recovery rule does not expand authority. External writes, installation,
credentials, paid paths, permission changes, device-specific acceptance, and
other gated actions still require their recorded evidence or approval.

## Device and provider continuity

Separate the intake device, AI surface and execution environment. Galaxy, iPhone,
Windows and Mac are access clients; the worker can run elsewhere. A Windows-only
acceptance gap blocks that route, not unrelated verified reading or execution.
Use the approved Wiki `20_Codex_Handoff/DEVICE_INDEPENDENT_EXECUTION.md` when
present; if absent, propose the revised dependency separately and preserve active
gates. Never claim a route is accepted from CI, a product announcement, a ready
flag, or a different account's result.

For continuation, restore the same Task ID, original objective, acceptance
criteria, approvals, artifact references, current revision and checkpoint. Check
the receipt before replaying a side effect. Existing approval remains valid only
inside its recorded scope; ask only for a changed decision or missing authority.
Do not require a role command or retyping the original request.

Company-managed AI accounts require an allowed data boundary. Do not transfer
personal or client data into an employer workspace without existing authority.
Unavailable providers remain queued or use a permitted verified surface; never
enable a paid fallback or claim Gemini/Claude execution parity without evidence.

## Learning from work

After a material outcome or correction, inspect whether it exposes a reusable
gap. Within existing authority, capture a candidate with source/Task references,
scope and uncertainty; do not wait for the user to say "learn this." Keep project
facts and personal preferences out of generic skills.

Apply the approved Wiki `20_Codex_Handoff/DEX_GROWTH_PROTOCOL.md` when present.
Compare a candidate method against the current method on representative and
failure cases; keep source revision, license, before/after evidence, independent
review and rollback. Separate observed, reviewed, applied, installed and
behavior-verified status. A failed test keeps the candidate inactive. Never
label source edits as installed or model-weight training.

Record the measured improvement or "not measured" and update the existing
maintenance Task/checkpoint. Do not create duplicate schedules, install a whole
catalog, broaden permissions, or copy secrets. Reuse approved learning across
devices and providers through canonical records, then check whether it helps.

## Evidence labels

Keep these labels distinct in analysis and records:

- `confirmed`: verified in a current file, official source, tool result, test, diff, or deployment
- `inference`: conclusion supported by confirmed evidence
- `proposal`: optional recommendation not yet approved
- `unknown`: not verified in the available environment

Never promote an inference or prior AI summary to canonical fact without evidence.

## Change policy

- Change only the approved scope.
- Preserve unrelated user edits, links, structure, formatting, and UTF-8 text.
- Do not delete, rename, or mass-move without explicit approval.
- Use branch → change → verification → pull request → approved merge for important changes.
- Never store passwords, API keys, tokens, private keys, signing keys, or customer credentials in Git, artifacts, logs, or responses.
- Keep paid AI API use and automatic paid fallback disabled unless Ethan explicitly approves an exception.

## Knowledge classification

Route incoming information to the correct layer:

- `FACT`: current project state, requirement, result, or decision evidence
- `POLICY`: security, cost, approval, governance, or operating rule
- `SKILL`: reusable method for performing work
- `CAPABILITY`: executable ability such as GitHub, MCP, Codex, testing, build, or deployment

Do not turn every note into a Skill. Reusable knowledge must preserve source provenance and verification state.

## Completion

A response alone is not completion. Verify what is possible and report:

- what changed
- where it changed
- evidence and tests
- `PASS`, `FAIL`, and `Not Checked`
- remaining risks
- approval or merge state
- the user's minimum next action, or that no action is required

Update the relevant project state, QA, source, decision, and handoff records when the change is material.
