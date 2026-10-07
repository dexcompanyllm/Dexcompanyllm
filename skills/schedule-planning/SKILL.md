# Skill — Schedule Planning

Status: draft awaiting approval

Plan milestones from evidence, dependencies, ownership, and acceptance criteria. Follow `AI_INSTRUCTIONS.md`; use `skills/validation-gates/SKILL.md` and `skills/human-review/SKILL.md`.

## Evidence authority
Determine the fact type and its accountable authority before choosing a source.

- **Contract / assignment facts** — period, start/end date, assignment scope: confirmed official assignment, contract, or role record is authoritative.
- **Operational schedule facts** — meeting, handoff, review, deliverable timing: the latest direct statement from the authority accountable for that item is authoritative.
- Older plans/roadmaps are context, not automatic authority.

If sources conflict, do not silently overwrite. Record both sources and dates, use the authoritative source for the current plan, and mark `confirmation required` until the conflict is resolved. Label schedule statements `confirmed`, `inference`, `proposal`, or `unknown`.

## Procedure
1. Define milestone outcome and scope.
2. Classify each material date/fact and identify its accountable authority.
3. Capture source, source date, evidence label, and the person/team/scope the date applies to.
4. Apply the evidence-authority rule; retain conflicts with `confirmation required`.
5. Verify calendar date/day, relevant working-day/holiday constraints, and person/team start/end boundaries.
6. Capture prerequisites: access, tools, inbound material, decisions, lead time, and communication-channel readiness.
7. Map dependencies and downstream waiters. Add an early intermediate deliverable or quick win when downstream work would otherwise idle.
8. For external coordination, identify the other organization's cadence and owner. Do not describe another organization's cycle as ours.
9. Mark conditional dates with condition, owner, and fallback/replan trigger.
10. Define approver, decision/review venue, and PASS criteria for milestones requiring agreement.
11. Flag dates concentrating multiple major deliverables, decisions, or reviews without capacity evidence.
12. Keep plan state `draft awaiting approval` until Owner approval.
13. After every review edit, re-check each changed field against its source and affected dependencies.
14. Start novel delegation with a narrow pilot; expand only after repeated verified success.

## Planning horizon
Use rolling-wave detail: near-term work is detailed; later work may remain higher-level until evidence and dependencies mature.

## RAID
Track only schedule-relevant Risk, Assumption, Issue, and Dependency, with an owner and next review/resolution date.

## Completion
A milestone passes only when its defined acceptance evidence is present. Before merge, replace draft status text with the approved canonical status only after Owner approval is evidenced.
