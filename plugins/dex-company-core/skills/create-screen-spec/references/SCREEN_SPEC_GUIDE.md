# Screen Specification Quality Guide

## 1. Evidence, profile, and scope

- Identify the latest approved requirement, design, feedback, and decision sources.
- State the target product, users, channels, release scope, and exclusions.
- Resolve the project's approved screen-spec profile, artifact convention, template, ID ledger, and change-marking rules before choosing an output structure.
- Apply an approved project profile or established artifact before the generic Markdown template.
- Preserve existing identifiers and non-requested content.
- Mark contradictory evidence and choose a source only when approval order supports it.
- Keep `confirmed`, `observed`, `inference`, `proposal`, and `unknown` distinct. Observation and inference are not policy approval.

## 2. Journey and inventory

Build the journey before detailed screens.

For each journey, cover:

- entry point and prerequisite
- normal completion
- cancel/back/close
- authentication or permission interruption
- provider/browser/app transition
- validation or failure recovery
- re-entry after refresh, restart, or timeout

Inventory screens, overlays, mobile split steps, and external-provider screens separately.

## 3. Screen ID

- Reuse the project's approved scheme and register new IDs in its authoritative ledger.
- If no approved project ID scheme exists, mark generic template IDs as provisional; do not treat them as canonical or replace existing IDs.
- Keep a screen ID distinct from a document page, slide, frame, or annotation number.
- Continued slides or frames of one runtime screen keep the same screen ID unless the project policy says otherwise.
- Create a new screen ID only for a distinct route, independent entry/exit, purpose/completion condition, or state-preserving return flow.
- PC and mobile share an ID only when the project policy says they do.
- Use approved suffix rules for dependent overlays, layers, or split steps.
- Never put dates, versions, owners, or task names into the screen ID.
- Never reuse a retired ID.

## 4. Screen description

Write descriptions so a reader can understand the behavior from the current screen.

Recommended sentence structure:

> When **condition**, the **UI element** is shown/enabled with **value or state**. When the user/system **acts**, **result and feedback** occur.

Include copy or labels only when approved or when clearly marked as proposal.

When a visual artifact uses numbered annotations, each numbered description must map to the intended element one-to-one within the project profile's uniqueness scope. Do not renumber unrelated annotations for a text-only change.

## 5. Input and validation

For each field, define where applicable:

- type and format
- required/optional status
- default and placeholder
- minimum/maximum length or range
- allowed characters and normalization
- validation timing
- field-level message
- server validation and duplicate conflict
- retention, masking, and sensitive-data display
- keyboard and autofill behavior

For conditionally visible or enabled fields, also define:

- whether the existing value, selected file, and checked state are retained or discarded when hidden/disabled
- whether the field remains in the saved payload
- whether required and format validation is included or excluded
- whether reactivation restores the previous value or starts from the default
- how an existing stored value behaves in edit mode

Follow approved project policy and explicit user instructions for message presentation and save behavior. Where these leave the behavior open, propose inline messages for field-correctable errors, alerts for screen-level blocking outcomes, and confirmations for choices that require confirmation. Do not turn a recommendation-only field into required input or block saving unless approved policy or the user requests it. Define both confirm and cancel results when a confirmation applies.

When validation or user messages are reused across screens, an approved project profile may use stable message IDs. Link screen/element → message ID and message ID → screen/element, preserve retired IDs, and do not invent a registry layout when the project has none.

Treat these as separate evidence claims:

- **Behavior rule**: required state, validation condition and timing, priority, Inline/Alert/Confirm presentation type, button roles, and confirm/cancel/failure outcomes. Record its evidence status and rule source or an open-decision ID.
- **Exact literal**: the exact visible message and button labels. Record a separate evidence status and literal source; when the wording is not grounded, keep it as `TBD` linked to an open decision even if the behavior rule is confirmed.

Keep presentation type and button-role notation outside the quoted literal. A source may support both claims, but record what it proves for each claim separately. Copy observed in a running product proves only that observed literal and environment unless an approved source also establishes the rule. Trace screen/element ↔ validation or message ID ↔ behavior-rule evidence ↔ exact-literal evidence in both directions, with no orphan or duplicate IDs.

## 6. Actions and navigation

For each button, link, card, gesture, automatic transition, or system event, define:

- visible/enabled condition
- single or repeated action behavior
- confirmation requirement
- loading/disabled state during processing
- success destination and feedback
- failure destination and retry
- back-stack, deep-link, and callback behavior
- analytics dependency only when an approved event plan exists

## 7. State and exception matrix

Review these dimensions. The table is a quality checklist, not a required section in every established artifact.

| Dimension | Questions |
|---|---|
| Loading | Is the page, region, or action loading? Can the user leave safely? |
| Empty | Is there no content, search result, permission, or prior history? |
| Error | Is the error local, server, provider, timeout, or unknown? |
| Offline | Is cached content safe? What is disabled? How is retry exposed? |
| Disabled | Why is the control disabled and how can the user recover? |
| Permission | Is denial temporary, permanent, or externally managed? |
| Session | What happens on expiry, logout, or account mismatch? |
| Duplicate | Are repeated submits idempotent and visibly locked? |
| Interrupt | What happens on app switch, browser return, refresh, or process termination? |
| Unsaved | Is there draft persistence, warning, discard, or recovery? |

## 8. Responsive and accessibility

Check:

- region order and information priority
- fixed/sticky controls and safe areas
- touch target and pointer target
- keyboard focus order and visible focus
- semantic name, role, state, and error association
- screen reader announcement for dynamic feedback
- color contrast and non-color indicators
- text resize, zoom, reflow, and truncation
- mobile keyboard overlap and orientation
- reduced motion and timeout extension where relevant

## 9. Traceability

Use stable IDs for requirements, policies, screens, and acceptance evidence.

Every Must requirement should connect to:

```text
Requirement → Policy or decision → Screen/element → Acceptance evidence
```

Open decisions must identify an owner, due gate, and affected screens. Put this mapping in the location or linked artifact defined by the project profile instead of forcing a new table into an established screen specification.

## 10. Acceptance evidence

Define observable outcomes using Given/When/Then or an equally testable structure, but do not inject an acceptance-criteria section into an established artifact unless its profile or user requests one.

Good evidence specifies:

- initial condition
- user/system action
- visible or persisted result
- error/recovery result where material

Avoid generic criteria such as “정상 동작한다”, “디자인과 동일하다”, or “개발한다.”

## 11. Artifact separation

Keep the screen specification focused on user-visible behavior and UI policy.

Move detailed API payloads, database design, deployment architecture, and executable test cases/results to their dedicated artifacts. Reference them by stable ID or link when the screen depends on them.

An established artifact does not become incomplete merely because a generic checklist item is stored in a linked artifact. Coverage and placement are separate decisions.

## 12. Established visual artifact integrity

When revising a presentation or other established visual artifact:

- preserve canvas or slide size, masters, layouts, placeholders, object types, native text, run and paragraph formatting, lists, links, notes, and media
- inherit native bullet and indentation formatting instead of typing bullet characters into text
- do not add a new table, box, badge, legend, status system, or identifier label without approval
- preserve internal-link targets and revalidate them after page, slide, or frame changes
- render every page or slide to check clipping, overlap, obscured annotations, font substitution, and media distortion
- reopen the final file in the target format and report repair or compatibility warnings
- compare the final artifact with the original to detect changes outside the approved scope

Use the format-specific skill or tool for these checks when available.

## 13. Final audit

- No unresolved placeholders are presented as approved.
- No screen or action is orphaned from the journey.
- No requirement is missing screen coverage or acceptance evidence.
- No validation or message ID is missing its screen/element, behavior-rule evidence, exact-literal evidence or explicit open decision.
- No link, ID, label, or state term conflicts with another section.
- Channel differences are explicit.
- Changed scope, preserved scope, and Not Checked items are reported.
- No unapproved structure was added to an established artifact.

The author may mark the artifact `READY_FOR_AUDIT` after self-checks. Independent `PASS` requires an actual authorized audit. Unknown privacy, legal, tax, payment, required-value, permission, consent, retention, or success-condition policy remains an audit blocker.
