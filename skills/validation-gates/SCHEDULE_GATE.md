# Schedule Validation Gate

Status: draft awaiting approval

Use with `skills/validation-gates/SKILL.md`.

## Checks
Record PASS / FAIL / Not Checked for each applicable check.

1. **Authority selection** — fact type and accountable authority are identified before source precedence is applied.
2. **Source precedence** — contract/assignment facts use confirmed official records; operational schedule facts use the latest direct statement from that item's accountable authority. Conflicts retain both dated sources and `confirmation required`.
3. **Evidence label** — confirmed / inference / proposal / unknown is explicit.
4. **Date attribution** — each date identifies the correct person/team/scope; individual boundaries are not generalized without evidence.
5. **Calendar integrity** — date/day and relevant working-day/holiday constraints are checked.
6. **Prerequisites** — access, tool, inbound material, decision, lead time, and channel readiness are represented where applicable.
7. **Dependency/downstream** — predecessors and downstream waiters are visible; avoidable idle time has an intermediate deliverable or explicit rationale.
8. **External cadence ownership** — external cycles are named as external and aligned without claiming ownership.
9. **Conditional schedule** — condition, owner, and replan/fallback trigger are explicit.
10. **Decision control** — agreement/review milestones identify approver, venue, and PASS evidence.
11. **Load check** — clustered major deliverables/decisions/reviews are flagged for capacity review.
12. **Communication lead time** — external notice is early enough for coordination, or risk is recorded.
13. **Regression after edit** — every changed field is rechecked against source and affected dependencies.
14. **Plan state** — remains `draft awaiting approval` until Owner approval; merge preparation updates status only after approval evidence exists.

A passing gate does not prove feasibility beyond the evidence and checks above.
