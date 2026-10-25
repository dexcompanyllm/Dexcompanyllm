# Project design contract

Use this reference only for the fields relevant to the current task. A project contract is a compact decision record, not a questionnaire for the user.

## Direction

Record: primary action; user/context; information priority; selected reference and source/rights; desired traits with observable examples; disallowed patterns with a project reason; preserved elements; approval status and revision.

Avoid arbitrary global bans on purple, gradients, cards, rounded corners or popular fonts. They are defects only when they undermine this project's direction or task. “Premium” and “not AI-like” need a concrete comparison; do not claim provenance detection from appearance.

Example proposal for a task console: show next action before diagnostic detail; quiet surfaces; readable dense lists; precise status language; technical evidence accessible under details. This is not a theme for a media product, donation campaign or live camera kiosk.

## Foundations

| Contract | Record and test |
|---|---|
| Spacing | primitive scale; semantic space for control, field, group, section and page; min/max container width; optical exceptions |
| Typography | font source/license; fallback; language coverage; size/line-height/weight together; text width and wrapping; font loading/failure |
| Color | semantic foreground/background pairs and state meaning; measured contrast for applicable content; do not rely on color alone |
| Components | content inset, gap, minimum height, icon box, label wrapping, focus, disabled, loading, error and empty states |
| Responsive layout | content-driven transitions, order, gutters, sticky/safe-area/keyboard behavior; no device marketing-resolution assumptions |
| Imagery | approved asset identity, crop/focal point, rights, alternative text, anatomical/geometry consistency when applicable |
| Motion | purpose, interruption, reduced-motion behavior; no decorative delay that blocks primary action |

The sample token JSON uses dimension and number tokens with aliases. It intentionally defines no brand colors or required font. Validate compatibility in the chosen token exporter before use; it is not a full DTCG conformance validator.

Suggested starting values for a *new*, ordinary touch interface (proposal only): spacing 4/8/12/16/24/32/48; body 16px with 1.5 line-height; control min-height 48px with 12px vertical and 16px horizontal inset. These are not WCAG mandates. Existing project values and measured typography take precedence. Compact desktop tools and distance-viewed kiosks require different density choices.

Text example: a two-line 16px/24px button with 12px top/bottom insets needs at least 72px content-driven height, not a fixed 48px box. Use min-height plus padding; do not shrink required copy to preserve a fixed height. Test the actual font and language.

## Minimum useful stress cases

Choose from: narrow viewport 320 CSS px; actual mobile viewport; tablet in relevant orientations; desktop; 200% text resize; user text-spacing override; long Korean institution/product name; 80-character unbroken identifier; 64-character hash; amount plus unit; localized long label; zero/one/many list items; missing image; delayed/failed font; loading/error/empty/disabled/offline; keyboard focus; sticky footer with virtual keyboard; reduced motion.

Do not represent a desktop emulator as a physical phone or kiosk test. Do not expose client data or faces in evidence. For a camera product, use approved synthetic content and reserve camera geometry, latency, thermal and viewing-distance checks for actual hardware.

## Pass conditions

| Axis | Blocking issue | Evidence |
|---|---|---|
| Layout | essential text clipped/overlapped; unexplained overflow; unreachable action | rendered screenshot plus measured or interaction result |
| Direction | representative screen conflicts with approved hierarchy, reference or brand constraints | separate reviewer comparison with concrete findings |
| Copy | invented facts; required phrase omitted; language/state ambiguity | source-to-visible-text check |
| Accessibility | relevant contrast/focus/keyboard/resize/reflow failures | manual and automated checks, each scoped |
| Change safety | unrelated behavior or assets changed; baseline overwritten to hide a defect | diff and before/after evidence |

No weighted average can compensate for a blocking failure. Approve baseline screenshots only after review; never automatically update snapshots merely because a comparison failed. Pin viewport, browser/OS, device-pixel ratio, font versions, content, time and animations for meaningful image comparisons. Record tolerances per test and explain exceptions.

## Source-backed facts and limits

- [DTCG 2025.10](https://www.designtokens.org/tr/2025.10/format/): stable Community Group specification for token interchange; not a W3C Standard and not a visual quality guarantee.
- [WCAG reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): 320 CSS px equivalent for ordinary vertical content; meaningful two-dimensional content has exceptions.
- [WCAG text spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html): user overrides at line 1.5, paragraph 2, letter .12 and word .16 em must preserve content/function; these are not mandatory default styling values.
- [WCAG target size minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html): AA uses 24 by 24 CSS px with defined exceptions; larger touch defaults are product choices.
- [WCAG resize text](https://www.w3.org/WAI/WCAG22/Understanding/resize-text.html): text can be resized to 200% without loss, with stated exceptions.
- [W3C evaluation](https://www.w3.org/WAI/test-evaluate/): automated tools alone cannot establish accessibility conformance.
- [Playwright screenshot testing](https://playwright.dev/docs/test-snapshots): rendering environment affects baselines; screenshots detect differences, not beauty.
- [Carbon typography](https://carbondesignsystem.com/elements/typography/overview/): productive and expressive typography serve different tasks. Do not transplant font-specific metrics into Korean without testing.
- [KRDS style](https://www.krds.go.kr/html/site/style/style_01.html): distinguish required and variable rules; reuse behavioral patterns without imposing a government-site appearance.
- [Korean layout requirements](https://www.w3.org/TR/klreq/): draft reference for Korean text edge cases, not a final universal UI styling standard.

Reviewed 2026-09-17 Asia/Seoul. This file paraphrases official guidance and contains original Dex workflow synthesis; no external skill, proprietary asset or third-party executable is copied.
