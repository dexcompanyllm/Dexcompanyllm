# Skill — Generative UI Architecture Decision

Decide how an AI system should produce screens or UI specifications (structured spec first, markup first, or a hybrid) using measured evidence instead of familiarity.

## Load when (routing)
Load only when the task requires one of:
- choosing the canonical output format of an AI screen, storyboard, or UI generator
- deciding whether generation must be constrained to a design-system component catalog
- evaluating flat design-tool renders against component-based renders
- planning on-demand UI composition from existing components

Trigger terms (examples, not exhaustive): generative UI, declarative UI spec, component catalog, JSON spec vs HTML, design-system conformance, canonical artifact; 생성형 UI, JSON 지시서, HTML 생성, 정본 형식, 컴포넌트 조합, 디자인시스템 컴포넌트, 피그마 렌더.

Do not load for: visual polish of a single screen (use `skills/design-quality`), writing requirements (use `skills/requirements`).

## Options to compare
- **A. Spec-first:** the model emits a structured spec that may reference only cataloged components; renderers produce HTML, design-tool frames, or code. Public examples: A2UI, json-render, Open-JSON-UI.
- **B. Markup-first:** the model writes HTML or similar markup; other formats are converted from it, often as flat layers without component semantics.
- **C. Hybrid:** one canonical format plus a derived preview or derived structure. Never two canonical sources.

## Criteria (evidence for each, or Unknown)
1. Design-system conformance: share of output elements that are real catalog components using tokens
2. Validation: whether a schema or catalog check can reject invalid output before a person sees it
3. Editability and round-trip: whether edits made in the design tool or document flow back to the canonical source
4. Traceability: whether each element can link to the requirement or source section it came from
5. Multi-target rendering: web, design tool, documentation, code
6. Expressiveness: layouts the catalog cannot express, and how often they occur
7. Reliability: format errors per screen and the model's familiarity with the format
8. Change history: field-level diffs and versioning
9. Security: declarative data versus executable code
10. Cost: tokens, time, and human edits per screen
11. Migration: cost of moving from the current format, including existing outputs

## Procedure
1. Name the canonical artifact and every consumer of it.
2. Check prerequisites. Spec-first needs a machine-readable component catalog; if none exists, its cost belongs to option A.
3. Run a paired pilot: the same representative task (2–3 screens) generated both ways from the same inputs.
4. Measure criteria 1, 2, 3, 7, and 10 on the pilot. Fill the others from documents, or mark them Unknown.
5. List coupled decisions (design-system readiness, on-demand composition, design-tool export, change tracking) and decide them together.
6. Record the decision with its conditions, the evidence, and a revisit trigger.

## Quality rules
- Do not decide from familiarity or from a demo alone.
- On-demand composition from existing components implies catalog-constrained generation. Treat this as inference until a pilot confirms it.
- A flat render loses component semantics; count the rework it creates downstream.

## Confidentiality
Run pilots on approved inputs inside the authorized company environment. Use synthetic screens for any public tool or public example. Never copy client screens, catalogs, or tokens into Dex Company.

## Human review
The canonical-format choice is a high-impact decision. Present it to the decision owner with `skills/human-review`.

## Validation gate
| ID | Check | PASS condition |
|---|---|---|
| U1 | Options | At least options A and B evaluated |
| U2 | Evidence | Every criterion has evidence or says Unknown |
| U3 | Pilot | Paired pilot on the same task, or Not Checked |
| U4 | Conformance | Catalog conformance measured, not estimated |
| U5 | Round-trip | Edit round-trip tested, or Unknown |
| U6 | Coupling | Coupled decisions listed and decided together |
| U7 | Decision | Conditions and revisit trigger recorded |
| U8 | Confidentiality | Pilot data stayed in the authorized environment |

A check not executed is Not Checked, never PASS. Promote recurring failures per `skills/validation-gates`.

## Sources (public; concepts only, no text or code copied)
- A2UI (Apache-2.0): agents render only components from a client-owned catalog of approved components — https://a2ui.org
- json-render (Apache-2.0): catalog-constrained JSON specs mapped to real components — https://github.com/vercel-labs/json-render
- Generative UI ecosystem digests, 2026-10-01 to 2026-10-08: A2UI and OpenUI moving toward 1.0 specifications; json-render focusing on strict catalog validation — https://github.com/linqinghao/agents-radar/issues/176
