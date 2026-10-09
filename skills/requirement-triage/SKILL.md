# Skill — Requirement Triage

Judge requirements written by someone else, item by item: what is feasible within the target horizon, under which conditions, and what to accept, defer, or leave out, with evidence a decision owner can check.

## Load when (routing)
Load only when the task requires one of:
- filling accept/defer/reject, feasibility, or priority judgments for a requirement list, PRD, backlog, or change request set
- preparing a scope in/out position for a kickoff or scope negotiation
- re-judging items after new evidence arrives

Trigger terms (examples, not exhaustive): requirement triage, feasibility, accept/reject, scope negotiation, backlog grooming; 요구사항 판정, 수용/미수용, 실현 가능성, 우선순위 판단, 범위 협의, 인/아웃, PRD 검토, 킥오프 범위.

Do not load for: writing new requirements (use `skills/requirements`), designing tests (use `skills/qa`), analyzing existing systems (run `skills/as-is-analysis` first and feed its evidence here).

## Required inputs
- The latest requirement list with its own IDs and a version or date. Never judge from a summary alone.
- Decision owner, target horizon (milestone or date), and the triage criteria. If criteria are not agreed, propose them and label them `proposal`.
- Evidence base: as-is findings, documents, and meeting records.

## Procedure
1. Agree criteria before verdicts (for example: needed within the horizon, dependency readiness, risk, effort, value). Verdicts given before criteria are agreed tend to be relitigated.
2. Normalize the list: keep source IDs, split compound items, and give each interpretation of an ambiguous item its own row.
3. Type every piece of evidence: O observed hands-on, D document or source, S stated by someone (meeting and time), I inference.
4. Give each row exactly one verdict:
   - F1 Feasible within the horizon. Requires O or D evidence.
   - F2 Feasible with conditions. List each condition, dependency, and owner role.
   - F3 Not feasible within the horizon. Name the blocker and propose a later-phase path.
   - F4 Unknown. Name the evidence needed, who can provide it, and the milestone it is needed by.
   - OUT Out of scope. Cite the scope decision.
5. Size effort as S, M, L, or XL and state the assumption. Give no day-level estimate without O or D evidence.
6. Derive an accept/defer/reject proposal from verdict, criteria, and priority. It remains a proposal until the decision owner confirms it.
7. Doubt pass: re-check the two verdicts most likely to be wrong, and flag every claim that has no source.
8. Turn every F4 into an evidence request and every F2 condition into a tracked dependency.
9. Group coupled items, where one decision changes another, and judge them together.
10. Report the conclusion first (verdict counts, top blockers, decisions needed from the owner), then the table.

## Table
| ID | Requirement | Interpretation | Evidence (type, source) | Gap and risk | Dependencies / conditions | Verdict | Effort (assumption) | Open question → owner role | Proposal |
|---|---|---|---|---|---|---|---|---|---|

## Quality rules
- Plan documents are not evidence of implementation. Verify the actual state before treating a planned feature as done.
- Choose the authoritative source by fact type: official records for contract, assignment, and scope facts; the latest direct statement of the accountable owner for operational facts; plans and roadmaps are context only. When sources conflict, keep both with their dates and mark `confirmation required`; never overwrite one with the other.
- A verdict that rests only on S or I evidence is labeled `S-based, unverified`.
- Do not assume a later horizon, extra budget, or a contract extension.
- A claim such as "only some of these are possible" needs per-item evidence.

## Confidentiality
Apply this method inside the authorized company environment. Never copy requirement lists, requirement IDs, or client decisions into Dex Company.

## Human review
Final accept/reject decisions belong to the decision owner. Present them with `skills/human-review`.

## Validation gate
| ID | Check | PASS condition |
|---|---|---|
| R1 | Criteria | Criteria agreed, or labeled `proposal` |
| R2 | Evidence | Every F1–F3 cites O or D evidence, or is labeled `S-based, unverified` |
| R3 | Unknowns | Every F4 names the evidence, the provider role, and the milestone |
| R4 | Ambiguity | Ambiguous and compound items are split |
| R5 | Conflicts | Conflicting statements are shown, not resolved by the writer |
| R6 | Decisions | No proposal is written as a decision |
| R7 | Effort | Every size states its assumption |
| R8 | Confidentiality | Output stays in the authorized environment |

A check not executed is Not Checked, never PASS. Promote recurring failures per `skills/validation-gates`.

## Sources (concepts only; no text copied)
- addyosmani/agent-skills (MIT): spec-first, interview, and doubt-driven review — https://github.com/addyosmani/agent-skills
- Community PRD acceptance-gate skill: fabricated-evidence check (license unverified; concept only) — https://www.skills.sh/bm629/agent-skills/reviewing-prd
