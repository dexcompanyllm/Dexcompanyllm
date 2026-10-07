# Schedule Planning — Synthetic Validation Cases

Status: draft awaiting approval

All names, organizations, dates, channels, and artifacts below are synthetic.

## Case F — known failing input
A draft plan copies an older roadmap date over a newer accountable-lead statement; assigns a date stated for the whole team to one analyst; mixes a proposed review date with confirmed dates; places two major deliverables and a decision on the same day; says “agreement” without approver or venue; assumes access is immediate despite a multi-day setup lead time; schedules external notice one day before coordination; uses a channel not yet available; labels a partner team's delivery cycle as our cycle; treats a resource-dependent date as unconditional; delays the first usable output while a downstream team waits; and defines no PASS evidence. A later edit changes the review date without rechecking dependencies.

Expected: FAIL on applicable gate checks.

## Case P — known passing input
A draft awaiting approval records dated sources and evidence labels; retains a source conflict as confirmation required; attributes dates to the correct team scope; checks calendar constraints; includes access/material lead times; identifies dependencies and an early usable intermediate output; names the partner cadence as external; marks resource-dependent dates conditional with a replan trigger; identifies approver and review venue; spreads major decisions where capacity is uncertain; gives external coordination sufficient notice or records the risk; uses an available communication channel; defines PASS evidence; and rechecks edited fields and affected dependencies.

Expected: PASS on the checks represented by the synthetic evidence.

## Gate run
| Check | Case F | Case P | Notes |
|---|---|---|---|
| Source precedence | FAIL | PASS | F silently overwrites newer authority evidence |
| Evidence label | FAIL | PASS | F mixes proposal and confirmed |
| Date attribution | FAIL | PASS | F narrows team-wide date to one person |
| Calendar integrity | Not Checked | PASS | F supplies no calendar-verification evidence |
| Prerequisites | FAIL | PASS | F ignores setup lead time |
| Dependency/downstream | FAIL | PASS | F leaves downstream waiting |
| External cadence ownership | FAIL | PASS | F claims partner cycle as ours |
| Conditional schedule | FAIL | PASS | F hides resource condition |
| Decision control | FAIL | PASS | F lacks approver/venue/PASS evidence |
| Load check | FAIL | PASS | F clusters major work without capacity review |
| Communication lead time | FAIL | PASS | F gives one-day external notice |
| Regression after edit | FAIL | PASS | F does not recheck changed date |
| Plan state | Not Checked | PASS | F input does not state approval status |

False positives observed: none in these synthetic cases.
False negatives observed: none in these synthetic cases.
Limit: this test demonstrates rule detection against constructed evidence; it does not prove real-world schedule feasibility.
