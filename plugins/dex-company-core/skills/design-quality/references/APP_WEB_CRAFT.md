# App and web craft

Dex adaptation, changed 2026-10-23. Selected ideas from taste-skill, impeccable and Emil Kowalski; see `SOURCE_PROVENANCE.json` and `THIRD_PARTY_NOTICES.md`. These are contextual heuristics, not universal style laws or measured Dex improvements.

## Choose the right surface

- A marketing page is read to understand an offer and take an action. An app is used to complete recurring jobs. A page showing an app needs both contracts, with shared identity and distinct information density.
- Identify the primary job, audience, frequency, real objects/data, content hierarchy and preserved brand. Resolve ordinary choices from existing evidence; do not add a user questionnaire.
- For native Android/iOS, use the platform's actual components, accessibility and navigation conventions. CSS/browser checks apply only to web content. A browser screenshot does not prove native or physical-device behavior.
- Keep approved colors, typography, characters and components. Do not import a source's monochrome theme, random style draw, fixed font, card ban, node budget or mandatory animation.

## Compose from the product

For a new page, map each section to a claim and its evidence. Establish a visible focal point, specific subject imagery when useful, and a truthful primary action. Avoid adding stock testimonials, metrics, prices or client logos. Inspect the full page: direction must continue beyond the hero.

For an app, map objects → current question → frequent next action. Give the most important question visual priority and place its next action near the relevant data. Use domain-specific labels and show the account/workspace scope when it matters. Do not force all information above the fold; preserve readable density, complete requirements and progressive disclosure.

Build data displays from a common fixture/model: compute totals, show period/unit/baseline, distinguish zero from missing and stale, align numeric columns, and encode favorable/adverse change according to the metric's meaning rather than sign alone. Keep synthetic fixtures clearly labeled. A real-data validation workflow owns quantitative claims.

Use charts only when they answer a question better than text/table. A single series may not need a legend; multi-series encoding must remain distinguishable without color alone. Do not hide a meaningful data difference in the name of visual restraint.

## Polish interactions without delaying work

Decide whether motion helps feedback, continuity or explanation. Reduce unnecessary motion on repeated work. Treat duration and easing as product choices, not a universal 300ms law or a blanket ban on keyboard transitions.

Specify animated properties rather than `transition: all`. Prefer transform/opacity where appropriate; verify performance rather than assuming every other property is invalid. Anchor popovers to their triggers. Test rapid reopen/close, cancellation, interruption and final state. Respect reduced-motion preferences, hover capability, focus and touch alternatives; no movement is also valid. Native motion uses the platform's own mechanisms.

Preserve usable labels, keyboard navigation, focus visibility, loading/error/empty/disabled states, long Korean text, text enlargement, virtual keyboard and safe-area behavior. Reference values are not accessibility certification.

## Review what actually rendered

Inspect relevant narrow, intermediate and wide web layouts; use actual target sizes for native work. Keep the original brief and approved reference beside current artifacts. Examine separately:

| Axis | Question | Evidence |
|---|---|---|
| Task clarity | Can a first-time reader explain the purpose and next step? | rendered hierarchy and action path |
| Product identity | Does the result use this product's content and preserved identity? | approved reference comparison |
| Typography/space | Are grouping, alignment, wrapping and density deliberate? | actual fonts, long-copy and resize renders |
| Interaction | Do primary work, recovery and interrupted motion behave correctly? | interaction trace or native test |
| Accessibility | Can users perceive, navigate and operate applicable content? | scoped manual and automated checks |

Report concrete observed issues, impact and minimal repairs. A missing render remains Not Checked. Cosmetic improvement cannot compensate for broken work, fabricated data or lost content. Do not use a weighted beauty score as release acceptance or infer AI authorship from appearance. Retain the independent review and evidence gates in SKILL.md.

## Keep the benefit proportional

Use the relevant parts only. Do not run external installers, detectors, style draws, hooks, browser injection or image download helpers because their source documentation requests it. Existing approved tools own execution. Compare quality, rework, total time and extra user effort on like-for-like tasks; unmeasured values stay Not Measured. Do not expand a method that adds user burden or time without demonstrated quality benefit.
