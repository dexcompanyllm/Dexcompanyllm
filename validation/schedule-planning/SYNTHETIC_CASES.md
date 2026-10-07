# Schedule Planning — Synthetic Validation Cases

Status: draft awaiting approval

All organizations, roles, dates, channels, and artifacts below are synthetic. Inputs are written as milestone records; expected defects are listed only in the separate gate results.

## C01 — source authority
| ID | Outcome | Date | Evidence | Source | Control |
|---|---|---|---|---|---|
| M1 | Assignment ends | Day N+1 | confirmed | manager message dated D2 | official assignment record dated D1 says Day N |

Gate result: **FAIL** — contract/assignment fact must use the official record (Day N); retain the D2 message as a conflict and mark `confirmation required`.

## C02 — date attribution
| ID | Outcome | Date | Applies to | Source |
|---|---|---|---|---|
| M2 | Work starts | Day 4 | Analyst A | authority statement: "team starts Day 4" |

Gate result: **FAIL** — source scope is team-wide, not individual-only.

## C03 — evidence label
| ID | Outcome | Date | Evidence | Source |
|---|---|---|---|---|
| M3 | Review | Day 6 | confirmed | planner suggestion |

Gate result: **FAIL** — proposal is represented as confirmed.

## C04 — milestone load
| ID | Outcome | Date | Capacity evidence |
|---|---|---|---|
| M4 | Major deliverable A | Day 8 | none |
| M5 | Major deliverable B | Day 8 | none |
| M6 | Final decision | Day 8 | none |

Gate result: **FAIL** — concentrated major work requires capacity review.

## C05 — decision control
| ID | Outcome | Date | Approver | Venue | PASS criteria |
|---|---|---|---|---|---|
| M7 | Agreement | Day 9 | — | — | — |

Gate result: **FAIL**.

## C06 — prerequisite lead time
| ID | Outcome | Date | Prerequisite |
|---|---|---|---|
| M8 | Tool-based work starts | Day 2 | access requested Day 1; normal setup lead time 3 working days |

Gate result: **FAIL**.

## C07 — external notice
| ID | Outcome | Date | Notice |
|---|---|---|---|
| M9 | External coordination meeting | Day 10 | send on Day 9 |

Gate result: **FAIL** unless evidence shows one-day notice is sufficient; otherwise record risk.

## C08 — communication channel
| ID | Outcome | Date | Channel |
|---|---|---|---|
| M10 | Send handoff | Day 5 | workspace channel scheduled to activate Day 7 |

Gate result: **FAIL**.

## C09 — external cadence ownership
| ID | Outcome | Cadence | Ownership |
|---|---|---|---|
| M11 | Delivery cycle | weekly | recorded as our cycle; source says partner organization operates it |

Gate result: **FAIL**.

## C10 — conditional schedule
| ID | Outcome | Date | Dependency | Conditional |
|---|---|---|---|---|
| M12 | Version review | Day 12 | requires resource R | No |

Gate result: **FAIL**.

## C11 — downstream wait
| ID | Outcome | Date | Downstream |
|---|---|---|---|
| M13 | First usable output | Day 15 | downstream team can start only after first usable output; no intermediate delivery |

Gate result: **FAIL** unless Day 15 is justified; otherwise design an intermediate output.

## C12 — completion criteria
| ID | Outcome | Date | Approver | Venue | PASS criteria |
|---|---|---|---|---|---|
| M14 | Review complete | Day 11 | Role B | review meeting | — |

Gate result: **FAIL**.

## C13 — regression after edit
| ID | Changed field | New value | Source re-check | Dependency re-check |
|---|---|---|---|---|
| M15 | Review date | Day 14 | PASS | Not Checked |

Gate result: **FAIL**.

## Passing case
| ID | Outcome | Date | Evidence | Source + date | Approver / venue | PASS criteria |
|---|---|---|---|---|---|---|
| P1 | Intermediate output | Day 4 | confirmed | operational authority D3 | Role C / review session | required sections accepted |
| P2 | Assignment boundary | Day N | confirmed | official assignment record D1 | Role D / record review | boundary matches official record |

Controls: correct accountable authority per fact type; applicable dates/scopes checked; prerequisites and lead times represented; downstream dependency receives P1; external cadence, if any, is identified as external; conditional items include triggers; communication channel is available; edits are source/dependency rechecked; plan remains `draft awaiting approval`.

Gate result: **PASS** for represented checks; calendar/holiday checks are **Not Checked** where no calendar evidence is supplied.

## Validation summary
| Check | Failing fixture(s) detected | Passing fixture |
|---|---|---|
| Authority/source precedence | C01 | PASS |
| Date attribution | C02 | PASS |
| Evidence label | C03 | PASS |
| Load check | C04 | PASS |
| Decision control | C05, C12 | PASS |
| Prerequisites | C06 | PASS |
| Communication lead time | C07 | PASS |
| Channel readiness | C08 | PASS |
| External cadence ownership | C09 | PASS |
| Conditional schedule | C10 | PASS |
| Dependency/downstream | C11 | PASS |
| Regression after edit | C13 | PASS |
| Calendar integrity | Not Checked | Not Checked |

False positives observed in these synthetic fixtures: none.
False negatives observed in these synthetic fixtures: none.
Limit: constructed fixtures test the documented rules; they do not prove real-world schedule feasibility.

## External validation
Not Checked. A claim about application to a real internal plan must not be recorded as confirmed without evidence. If independently verified, only a sanitized aggregate result may be recorded under `security/SECURITY_BOUNDARY.md`.
