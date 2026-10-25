---
name: create-screen-spec
description: Create or revise an implementation-ready screen specification from approved requirements, designs, feedback, or an existing specification. Use when the user asks for 화면설계서, 화면 정의, UI description, screen flow, PC/mobile specification, policy-to-screen mapping, or a developer/publisher handoff for a digital product.
---

# Create Screen Specification

## Goal

Produce a screen specification that a planner, designer, publisher, and developer can understand from the relevant screen without repeatedly opening unrelated definition pages. Separate confirmed policy, design proposals, development contracts, and QA cases.

## Source and profile order

1. Load the current project context with `$use-dex-company` when this is a Dex project.
2. Resolve any approved project screen-spec profile, artifact convention, ID ledger, or established template named by that context.
3. Read approved requirements, meeting decisions, customer feedback, existing screen specifications, and current designs.
4. Prefer the latest approved source when sources conflict.
5. Preserve existing layout, links, formatting, identifiers, and user edits unless the request explicitly changes them.
6. Record missing policy as an open decision. Do not invent it as confirmed behavior.

An approved project profile or established artifact controls artifact type, channel split, identifier rules, template, description grammar, change marking, and prohibited additions. The generic Markdown template is a fallback and does not override it.

## Default artifact boundary

Update the established artifact supplied by the task. Otherwise follow the requested output format. When the requested format is Markdown, or no format is specified, and the user has not supplied another Markdown structure, create `SCREEN_SPEC.md` from the generic template.

Keep these outside the screen specification:

- backend implementation design and infrastructure detail
- API contract detail that belongs in `SPEC.md`
- database schema that belongs in `DATA_MODEL.md`
- executable QA cases and test results that belong in a spreadsheet or `QA_REPORT.md`

The screen specification may reference those documents and state the UI dependency.

## Required workflow

1. Define the objective, target users, channels, scope, exclusions, approved source set, and applicable project profile.
2. Build the user journey and screen/overlay inventory before detailed descriptions.
3. Reuse the project's approved screen ID system and authoritative ledger. Never renumber an existing approved ID without authorization. If no approved ID scheme exists, generic template IDs are provisional and do not create or replace a canonical ledger entry.
4. Define screen ownership and external-provider boundaries.
5. Write each screen using the element → condition → action → result pattern.
6. Cover applicable states, validation, errors, permissions, interruptions, and channel differences.
7. Connect requirements, policies, screens, and acceptance evidence without forcing a new layout into an established artifact.
8. Review from planner, UX, publisher, developer, accessibility, and QA perspectives.
9. Report `PASS`, `FAIL`, and `Not Checked` separately.

Read `references/SCREEN_SPEC_GUIDE.md` for the detailed quality gate. Start from `assets/SCREEN_SPEC_TEMPLATE.md` for the Markdown fallback defined above.

## Description rule

A useful description contains all four parts where applicable:

- **UI element**: what control, text, component, region, or data is involved
- **Condition**: when it is shown, enabled, required, selected, or changed
- **Action**: what the user or system does
- **Result**: what changes, where navigation goes, what is saved, or what feedback appears

Avoid descriptions that only restate the label, such as “버튼 노출” or “클릭 시 이동.”

## Coverage gate, not a layout mandate

Review the following for each screen, overlay, modal, or mobile split step when applicable. Place the result in the approved project profile's location or a linked artifact; do not mechanically add headings, tables, boxes, badges, or acceptance-criteria sections to an established document.

- screen ID and name
- purpose and entry/exit conditions
- confirmed policy, observed evidence, proposals, and open decisions
- layout regions and component inventory
- field/input rules and validation timing
- action behavior and navigation result
- loading, success, error, empty, disabled, offline, and permission states
- duplicate submission and interrupted-flow handling
- content and data dependencies
- channel differences and responsive behavior
- keyboard, focus, semantic label, touch target, contrast, and large-text considerations
- observable acceptance evidence
- requirement and policy traceability

Record material exclusions as `not applicable` with a reason. Do not add irrelevant content merely to satisfy the list.

## Established artifact preservation

- Reuse the approved artifact type and template before creating a new structure.
- Do not add a new table, box, badge, legend, status system, or identifier label unless the project profile, established artifact, or user authorizes it.
- Keep screen IDs distinct from page, slide, or frame numbers. Continued views of the same runtime screen keep the same screen ID unless the project policy says otherwise.
- Create a new screen ID only for a distinct route, independent entry/exit, purpose/completion condition, or state-preserving return flow. Apply the project's popup or overlay suffix rule.
- When a visual artifact uses numbered annotations, keep annotation-to-description mapping one-to-one within the project's defined uniqueness scope.
- For PPTX work, use the presentation-specific workflow and preserve slide size, masters, layouts, placeholders, object types, run and paragraph formatting, native bullets, links, notes, and media. Recheck internal links after slide changes, render every slide, and reopen the file before handoff.

## State coverage

Check at least these cases where applicable:

- initial/default
- loading and delayed response
- empty or no-result
- success and completion feedback
- field-level validation
- server or provider error
- offline, weak network, timeout, and retry
- disabled and insufficient permission
- session expiry and authentication return
- cancel, back, close, refresh, duplicate tap/click, and re-entry
- partial completion and unsaved changes
- external app/browser transition and callback mismatch

Do not add irrelevant states merely to fill a template; explain exclusions when risk is material.

For a conditionally shown or enabled field, define value/file/selection retention or disposal, payload inclusion, validation inclusion, and reactivation behavior.

For validation and user messaging, trace the behavior-rule evidence separately from the exact-literal evidence. Conditions, timing, presentation type, button roles, and outcomes require a policy or observation source; the exact visible message and button labels require a literal source. Do not treat an observed literal as proof of the behavior rule, and do not combine presentation-type or button-role notation with the quoted literal.

## Responsive and channel rules

- Treat PC and mobile as the same journey only when policy and information architecture are genuinely shared.
- Document component reflow, order changes, sticky controls, truncation, scrolling, keyboard overlap, safe areas, and touch behavior.
- Distinguish a responsive screen from a separate mobile step or external-provider screen.
- Apply the project's screen ID policy before creating new IDs.

## Policy handling

Use explicit labels:

- `confirmed`: approved requirement or decision
- `observed`: directly visible in a source, limited to what is shown
- `inference`: evidence-supported interpretation awaiting confirmation
- `proposal`: planner recommendation awaiting approval
- `open`: unresolved decision with owner and impact
- `not applicable`: reviewed but excluded with reason

Observed evidence and inference do not become confirmed policy automatically. A proposal must not be written in the same grammatical form as an approved requirement.

## Review gate

Before completion, verify:

- every required journey has an entry, completion, cancellation, and recovery path
- every interactive element has condition, action, and result
- destructive or irreversible actions have confirmation and recovery policy
- labels, links, IDs, and referenced artifacts are consistent
- each validation or message ID traces in both directions to its screen/element, behavior-rule source, and exact-literal source or an explicit open decision
- no development-only implementation detail or executable QA table is mixed into the artifact
- acceptance evidence is observable and unique rather than generic
- unknowns and external dependencies are not presented as implemented
- changed scope is the only scope modified
- the established artifact has not gained unapproved structures

An author's completed artifact is `READY_FOR_AUDIT`, not independently approved. Privacy, legal, tax, payment, required values, permissions, consent, retention, and success-condition unknowns remain audit blockers. Report independent `PASS` only when an authorized audit actually ran; otherwise mark it `Not Checked`.

Finish with changed files, preserved areas, evidence, `PASS`/`FAIL`/`Not Checked`, remaining decisions, and the minimum next action.
