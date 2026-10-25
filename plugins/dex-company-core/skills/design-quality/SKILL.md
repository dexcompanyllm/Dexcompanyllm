---
name: design-quality
description: Improve and verify app/web interfaces and report or slide design through a project-specific direction, craft checks and rendered evidence. Use for visual quality, generic output, layout defects, design systems or fidelity review; keep screen-specification and artifact-format workflows in control. Do not trigger for a text-only lookup, unrelated bug fix or backend task.
---

# Design Quality

Improve repeatability without giving every product the same appearance. Keep project art direction separate from shared quality checks. This is a method and evidence gate, not an autonomous deployment service or an aesthetic scoring model.

## Start from the actual target

For Dex work, load the minimum approved context through `use-dex-company`. Read the target's current design, implementation, approved assets, project profile and outstanding feedback. Record source revision and capture date. A registry entry or previous installation is not proof that a skill ran or that a screen passed.

Classify findings as confirmed, inference, proposal or unknown. Distinguish source inspection, rendered observation and device verification. If the target cannot be rendered, finish useful source analysis and supporting work, but keep that visual check `Not Checked`. Do not invent an old screenshot or a before/after result.

## Load only the relevant craft reference

For app or web interface work, read `references/APP_WEB_CRAFT.md`; distinguish task interfaces from marketing pages and native UI from browser-rendered UI. For reports, slides or explanatory diagrams, read `references/REPORT_CRAFT.md` alongside the requested artifact-format skill. Mixed deliverables may need both. These references adapt selected source ideas, not their execution authority; see `references/SOURCE_PROVENANCE.json` and `references/THIRD_PARTY_NOTICES.md`.

Do not auto-install external packages, run their commands, fetch guidelines during each invocation, enable hooks/telemetry or introduce paid fallback. Do not add mandatory style-choice questions. Preserve the current evidence gate and record real effectiveness separately from source/package validation.

## Make one compact direction contract

Reuse established decisions; do not ask the user to choose spacing numbers, fonts, tools or checklists. Identify the primary user action, content priority, audience/context, approved visual reference, distinctive traits, unwanted patterns, and elements that must remain unchanged. Mark unapproved values as proposals.

For a new direction, use the available visual ideation workflow before implementing new product screens. Recommend a direction and ask only for a decision that materially changes the result. Do not treat an attractive reference, generated mockup or “AI-free” adjective as an approved design. For scoped repairs, keep the established direction and repair only the demonstrated defect.

Use `references/DESIGN_CONTRACT.md` to turn the brief into practical layout, copy, font and state rules. Keep project preferences in the project contract, not in this generic skill.

## Build a small, real reference first

Complete one representative screen plus its riskiest state before expanding. Use actual or clearly marked synthetic content with realistic length; do not invent metrics, testimonials, logos or product imagery. Keep required copy editable. Image generation can supply approved imagery or direction exploration, but cannot replace exact text, production controls or measurable component geometry.

Reuse approved components. Separate primitive values, semantic roles and component contracts. Treat `assets/foundation.tokens.json` as a provisional DTCG-format example, not a global theme. Keep the existing values during a first token extraction; changing a number to an arbitrary grid multiple is not a bug fix. Record optical exceptions with scope and reason.

Define font source/license and fallback; record measured font, size, weight, line-height and content width together. Prefer reflow and content-aware height over shrinking or clipping essential text. Cover Korean/Latin mixed text, long identifiers, numeric units and translations relevant to the product.

## Verify two independent questions

1. **Does it work and fit?** Reproduce spacing, overflow, clipping, state, keyboard, touch, reflow and content failures with current fixtures and relevant viewports. Use actual render measurements and interaction evidence. Automated accessibility checks cover only part of accessibility.
2. **Does it express the intended product?** Compare the rendered result with the approved direction and content priorities. Review hierarchy, density, rhythm, typography, imagery, brand distinction and task clarity. A pixel match does not establish aesthetic quality. An aesthetic preference cannot waive a functional defect.

Before making changes, write the required check list for the task. Include relevant small, medium and large layouts, text enlargement, long content and error/loading/empty states. Record any excluded case and reason in the plan review. Do not add irrelevant device or platform gates.

For a new direction, release candidate, material change, or any `EVIDENCE_PACKAGE_COMPLETE` claim, use a separate review run to inspect raw artifacts against the original task. Pass references and current artifacts, not the author's desired verdict. Its run ID must differ from the author and every check run, and its report must not reuse a check artifact by path or digest. Those declarations document separation; they are not identity attestation. A bounded low-risk repair may use the established contract and targeted impact checks without claiming package completion, but final release acceptance still needs separate review. Author self-review cannot stand in for that review. Two unsuccessful attempts with the same repair method trigger a cause review and a different approach, not more identical retries.

## Check evidence without pretending to inspect it

Read `references/EVIDENCE_GATE.md` when using the bundled script. Run:

```sh
node scripts/validate-design-evidence.mjs PLAN.json EVIDENCE.json
```

Resolve the script relative to this skill directory. It reads only local JSON and referenced local evidence files and writes a report to stdout. It neither opens a browser nor verifies screenshot meaning. It returns `EVIDENCE_PACKAGE_COMPLETE` only for a structurally complete, plan-bound evidence package with a separately declared review run. Missing, failed, stale or unchecked evidence must block the package. A complete manifest is not design approval, WCAG certification, installation verification or permission to merge/deploy.

Use schema version 2 and an immutable `git:` commit digest or `sha256:` content digest for `revision`. After the plan is reviewed, have the agent run `--plan-sha256 PLAN.json` and place the returned hash in EVIDENCE.json; do not ask the user to calculate or edit it. The hash catches stale or accidentally replaced plan contents but is not an external signature or approval attestation.

The successful status is `EVIDENCE_PACKAGE_COMPLETE`, not Task PASS. Record it as one bounded evidence/check result only. It never replaces the canonical Task outcome, hides a detailed `FAIL`, converts `Not Checked` to PASS, or proves reviewer identity, truthful execution, visual quality, accessibility, installation, merge approval or deployment permission.

Do not create fabricated PASS records to make this command succeed. Keep separate outcomes for mechanical checks, visual review, accessibility review and real devices. Missing material checks remain `Not Checked`; do not convert them to warnings or average them into a score.

## Preserve and learn

Keep the established file type, layout conventions, labels, links, IDs and unrelated edits. Screen specifications continue to use `create-screen-spec`; technical implementation notes and executable QA remain separate. Export to Figma as editable components/text only when requested or useful and available; a flat image import is not an editable design system.

Keep the selected reference and its rights/provenance, token version, content fixtures, rendered output, defects, minimal change, checks and rollback in the project Task. Record observed improvement or `Not Measured`. Add a reusable rule only when the failure and repair justify it; do not promote every stylistic preference to a global ban.

Finish with changed scope, evidence, PASS/FAIL/Not Checked, approval/install state and the minimum next action. Source preparation, deployment, installation, fresh-session invocation and real-device acceptance are distinct milestones.

