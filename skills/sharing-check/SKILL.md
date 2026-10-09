# Skill — Sharing Check

Check work content before it leaves its current context: who will read it, what they may see, and whether every audience version tells the same story.

## Load when (routing)
Load only when the task requires one of:
- sending, posting, publishing, or handing off work content to another person, team, organization, or AI tool
- preparing separate versions of one result for different audiences (client, internal team, executives)
- saving work content to a shared or persistent location outside its authorized environment

Trigger terms (examples, not exhaustive): share, send, publish, forward, handoff, external version, executive summary; 공유, 전달, 발송, 보고용, 공유용, 내부용, 외부 공유, 핸드오프.

Do not load for: drafting content that stays in the current private workspace; turning work into Dex knowledge (use `security/SANITIZATION_GUIDE.md`).

## Procedure
1. **Destination.** Name the audience and the channel. Confirm the channel is approved for this content and who else can reach it (administrators, connected tools, link holders).
2. **Content scan.** Remove or mask:
   - credentials and account identifiers (passwords, tokens, keys, account or employee IDs, network access details)
   - personal data beyond what the audience needs
   - customer or end-user records; use synthetic examples instead
   - material restricted to a client environment, internal links, file keys, and screenshots of internal systems
   - internal-only context: negotiation positions, organizational dynamics, evaluations of people, remarks marked off-the-record
3. **Audience versions.** When one result goes to several audiences, keep one fact base. Versions may differ in emphasis and detail, never in facts, verdicts, dates, or commitments. A vision or executive version must not promise scope the agreed plan does not contain.
4. **AI-to-AI handoffs.** A handoff to another AI worker counts as sharing. If that worker is outside the authorized environment, send only generalized methods, public sources, and synthetic examples.
5. **Label.** Carry the source's sensitivity label or add one (for example, `internal — confirm before sharing`).
6. **Egress.** Sending content to an external service, webhook, or AI provider requires an approved channel; otherwise stop and ask per `skills/human-review`.
7. **Approval.** External messages and publishing require human approval unless a standing approval covers the exact scope (`governance/APPROVAL_REGISTRY.md`).

## Validation gate
| ID | Check | PASS condition |
|---|---|---|
| H1 | Destination | Audience, channel, and access scope identified |
| H2 | Secrets | No credential or account identifier remains |
| H3 | Restricted material | No client-restricted or internal-only content in an external version |
| H4 | Consistency | All audience versions share the same facts, verdicts, dates, and commitments |
| H5 | AI handoff | Handoffs to workers outside the authorized environment contain no confidential context |
| H6 | Label | Sensitivity label present |
| H7 | Approval | Required approval recorded before sending |

Never repeat a found secret in a report; state only its type and location. A check not executed is Not Checked, never PASS.
