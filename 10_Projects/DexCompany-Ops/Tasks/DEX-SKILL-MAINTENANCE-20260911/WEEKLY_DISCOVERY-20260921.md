# Weekly skill discovery checkpoint — 2026-09-21

## Scope
- Task: `DEX-SKILL-MAINTENANCE-20260911`
- Source of truth: approved Wiki `main`
- Runtime canonical source: `dd461ac508f950bd3757db48795655e623e31b21` / package `1.3.0`
- Discovery policy: maximum 5 initial candidates, maximum 2 detailed reviews, maximum 1 new/exception candidate
- No installation, marketplace reconcile, legacy deletion, paid API/fallback, permission expansion, or experimental activation

## Initial shortlist (5)

| Candidate | Source / revision | Work relevance | Duplicate / quality screen | Security / license screen | Decision |
|---|---|---|---|---|---|
| `frontend-design` | `anthropics/skills` / `d79e2a5bb4df4a386c2adcdd9ab8709bba28c3f6` | Frontend/UI quality and anti-template work | Strong overlap with Dex `design-quality`; possible useful examples only | Official source observed; per-skill license not independently verified in this run; scripts/dependencies not yet reviewed | Detailed review 1; no apply |
| `pptx` | `anthropics/skills` / `64529c8b3f35fe632b7256bd2f6d46e4b40160ce` | Presentation generation and portfolio/report work | Potential overlap with existing PPT workflow; could add reusable QA patterns | Official source observed; per-skill license not independently verified; scripts/dependencies not yet reviewed | Detailed review 2; no apply |
| `docx` | `anthropics/skills` / `6e6f5b95c1de6e803cc07b214f5059b074d64e0c` | Resume, reports, contracts and long-form artifacts | Existing document tooling and Dex document policies reduce incremental value | Official source observed; license and execution surface not yet verified | Hold |
| `brand-guidelines` | `anthropics/skills` / `1dc8bd3584b80568edae7da16382363e24ecf0f0` | Creative assets and brand-system work | Overlaps project-specific brand/design work; generic layer may be useful but not yet evidenced | Official source observed; license and asset/resource behavior not yet verified | Hold |
| `mcp-builder` | `anthropics/skills` / `b866bcfb57b780c10b587c7b543e871a91661ce0` | Runtime/MCP implementation and connector design | Capability/engineering method rather than a direct end-user skill; overlaps existing runtime docs | Official source observed; may contain executable/build guidance; not reviewed in detail | Exclude for this cycle |

## New / exception candidate (max 1)
- `OpenAI openai/skills` current status: **deprecated catalog**. Its README directs current Codex plugin/skill work to `openai/plugins`; the old catalog is not a safe source for new activation. No candidate registered from it.

## Detailed review status

### 1) `frontend-design`
- `sourceObserved`: `d79e2a5bb4df4a386c2adcdd9ab8709bba28c3f6`
- `sourceReviewed`: `Not Checked` (only directory presence/revision observed)
- `sourceApplied`: `null`
- `installed`: `Not Checked`
- `behaviorVerified`: `Not Checked`
- Reason for hold: strong overlap with canonical `design-quality`; detailed content, scripts, dependency and permission behavior were not yet inspected. Do not copy or activate from directory presence alone.

### 2) `pptx`
- `sourceObserved`: `64529c8b3f35fe632b7256bd2f6d46e4b40160ce`
- `sourceReviewed`: `Not Checked` (only directory presence/revision observed)
- `sourceApplied`: `null`
- `installed`: `Not Checked`
- `behaviorVerified`: `Not Checked`
- Reason for hold: potentially useful for presentation QA, but existing Dex/PPT workflow overlap and unverified scripts/dependencies/licensing prevent adoption.

## Security and governance result
- Runtime marketplace and manifest remain aligned with the three canonical Runtime skills; no Runtime source change was applied in this checkpoint.
- `design-quality` remains canonical source `1.3.0`; actual installed revision remains `Not Checked`.
- PR #97 remains draft with its Windows install, fresh-session, XML/render and exact-ref rollback gates.
- Open Runtime PRs inspected: PR #186 is tracking/documentation-only and does not change Skill/package/permission behavior; no duplicate Skill PR created.
- Existing unresolved host-validation blockers remain unchanged and are not repeated as new findings.

## Outcome
- `weeklyDiscovery`: `PASS`
- `shortlisted`: `5`
- `detailedReviewed`: `2` (source presence/revision level only; not content-level approval)
- `registeredCandidates`: `0`
- `sourceApplied`: `0`
- `installed`: `0`
- `behaviorVerified`: `0`
- `actualImprovement`: `Not Measured`

## Next action
Use the existing Task and an approved execution host to inspect the two detailed candidates' actual `SKILL.md`, scripts, dependencies, license files, and permission/side-effect surfaces before any proposal to adapt or register. No user re-entry is required.
