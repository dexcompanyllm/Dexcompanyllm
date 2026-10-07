# Schedule Validation Gate

Use with `skills/validation-gates/SKILL.md`.

## Checks
Record PASS / FAIL / Not Checked for each applicable check.

1. **Source precedence** — latest accountable-authority statement is not silently overwritten by lower-priority history; conflicts retain both dated sources and `confirmation required`.
2. **Evidence label** — confirmed / inference / proposal / unknown is explicit.
3. **Date attribution** — each date identifies the correct person/team/scope; individual start/end boundaries are not generalized without evidence.
4. **Calendar integrity** — date/day and relevant working-day/holiday constraints are checked.
5. **Prerequisites** — access, tool, inbound material, decision, lead time, and channel readiness are represented where applicable.
6. **Dependency/downstream** — predecessors and downstream waiters are visible; avoidable idle time has an intermediate deliverable or explicit rationale.
7. **External cadence ownership** — external cycles are named as external and aligned without claiming ownership.
8. **Conditional schedule** — condition, owner, and replan/fallback trigger are explicit.
9. **Decision control** — agreement/review milestones identify approver, venue, and PASS evidence.
10. **Load check** — clustered major deliverables/decisions/reviews are flagged for capacity review.
11. **Communication lead time** — external notice is early enough for coordination, or risk is recorded.
12. **Regression after edit** — every changed field is rechecked against source and affected dependencies.
13. **Plan state** — remains `draft awaiting approval` until Owner approval.

A passing gate does not prove feasibility beyond the evidence and checks above.
