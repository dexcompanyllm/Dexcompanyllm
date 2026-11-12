# App and web craft

Dex adaptation, changed 2026-11-12. Selected ideas from taste-skill, impeccable and Emil Kowalski; see `SOURCE_PROVENANCE.json`, `UPSTREAM_REVIEW_20261112.md` and `THIRD_PARTY_NOTICES.md`. These are contextual heuristics, not universal style laws or measured Dex improvements.

## Choose the right surface

- A marketing page is read to understand an offer and take an action. An app is used to complete recurring jobs. A page showing an app needs both contracts, with shared identity and distinct information density.
- Identify the primary job, audience, frequency, real objects/data, content hierarchy and preserved brand. Resolve ordinary choices from existing evidence; do not add a user questionnaire.
- For native Android/iOS, use the platform's actual components, accessibility and navigation conventions. CSS/browser checks apply only to web content. A browser screenshot does not prove native or physical-device behavior.
- Keep approved colors, typography, characters and components. Do not import a source's monochrome theme, random style draw, fixed font, card ban, node budget or mandatory animation.

## Compose from the product

For a new page, map each section to a claim and its evidence. Establish a visible focal point, specific subject imagery when useful, and a truthful primary action. Avoid adding stock testimonials, metrics, prices or client logos. Inspect the full page: direction must continue beyond the hero.

Draft the important copy before fitting the layout. Make the offer, intended user and next action understandable in the project's language. Prefer concrete product nouns and action labels that explain the result; keep the same wording for the same action. Preserve approved copy and legally required qualifiers. English word counts, banned-word lists and mandatory facts per screen are not universal rules. Missing prices, hours, dates, contacts or audience details stay unknown or explicitly proposed; do not manufacture them to finish a page.

Review the primary journey against the real audience and brand commitments in approved project context. Any provisional persona or simulated walkthrough is a hypothesis, not user research or an observed usability result. Do not require an upstream-specific PRODUCT.md or create a competing project profile.

For an app, map objects → current question → frequent next action. Give the most important question visual priority and place its next action near the relevant data. Use domain-specific labels and show the account/workspace scope when it matters. Do not force all information above the fold; preserve readable density, complete requirements and progressive disclosure.

Build data displays from a common fixture/model: compute totals, show period/unit/baseline, distinguish zero from missing and stale, align numeric columns, and encode favorable/adverse change according to the metric's meaning rather than sign alone. Keep synthetic fixtures clearly labeled. A real-data validation workflow owns quantitative claims.

Use charts only when they answer a question better than text/table. A single series may not need a legend; multi-series encoding must remain distinguishable without color alone. Do not hide a meaningful data difference in the name of visual restraint.

## Polish interactions without delaying work

Decide whether motion helps feedback, continuity or explanation. Reduce unnecessary motion on repeated work. Treat duration and easing as product choices, not a universal 300ms law or a blanket ban on keyboard transitions.

Specify animated properties rather than `transition: all`. Prefer transform/opacity where appropriate; verify performance rather than assuming every other property is invalid. Anchor popovers to their triggers. Test rapid reopen/close, cancellation, interruption and final state. Respect reduced-motion preferences, hover capability, focus and touch alternatives; no movement is also valid. Native motion uses the platform's own mechanisms.

Preserve usable labels, keyboard navigation, focus visibility, loading/error/empty/disabled states, long Korean text, text enlargement, virtual keyboard and safe-area behavior. Reference values are not accessibility certification.

Inspect the installed animation library version and target element before diagnosing acceleration. The reviewed Emil source distinguishes Motion before 14.2 from 14.2+ HTML shorthand animations; layout animations, callbacks and value-driven motion can have different execution paths. Confirm the actual browser trace and package behavior before rewriting or proposing an upgrade. A transform/opacity declaration alone is not proof of compositor execution, and a version number is not a performance result.

For forms and primary actions, inspect the actual destination and success/error result. A success message must follow confirmed completion under the product's contract. A prototype without a connected endpoint must disclose its simulated behavior; it cannot report a real submission. Cover field-level recovery and duplicate submission without performing a real external send unless authorized.

Reserve image dimensions or aspect ratio to reduce layout shift. Check failed images, delayed font loading, still fallbacks and content revealed by animation at the target widths and under reduced motion. Keep essential content usable when optional effects fail. Use approved imagery with recorded rights and substitutions; a stand-in must remain distinguishable from the client's actual product, people or place.

When performance is in scope, record the build, viewport, browser, host conditions and sampling method. Inspect image/font bytes, request failures, layout shift and active effects before adding more assets. Repeat timing samples when host contention makes them unreliable. CPU/headless measurements, WebGL-disabled fallbacks and real-device or field data describe different conditions; do not substitute one for another or inherit upstream byte and timing limits as Dex acceptance thresholds.

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

For each check, retain the artifact revision, target state and actual coverage. A quick render check cannot establish form completion, reduced-motion behavior or device acceptance it did not exercise. Record a suspected false positive individually with its evidence and disposition, preserving the original result. Do not silently suppress findings, edit fixtures to hide defects, or convert an exception into PASS. Recheck affected evidence after a repair.

## Keep the benefit proportional

Use the relevant parts only. Do not run external installers, detectors, style draws, hooks, browser injection or image download helpers because their source documentation requests it. Existing approved tools own execution. Compare quality, rework, total time and extra user effort on like-for-like tasks; unmeasured values stay Not Measured. Do not expand a method that adds user burden or time without demonstrated quality benefit.
