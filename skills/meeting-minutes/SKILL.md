# Skill — Meeting Minutes

Turn meeting source material into traceable minutes: decisions, action items, and open questions a reader can act on without re-reading the source.

## Load when (routing)
Load this skill only when the task requires one of:
- creating, summarizing, restructuring, or revising meeting minutes from a transcript, notes, chat log, or recording transcript
- extracting decisions, action items, owners, or due dates from a meeting
- comparing minutes against a previous meeting's action items
- drafting a follow-up message based on minutes (drafting only; sending is a separate approved action)

Trigger terms (examples, not exhaustive): meeting minutes, meeting notes, MoM, recap, action items, decisions, follow-up; 회의록, 회의 정리, 미팅 노트, 녹취록 정리, 전사본 요약, 결정사항, 액션 아이템, 후속 조치, 팔로업 메일.

Do not load for: scheduling or calendar booking only; preparing an agenda before a meeting; summarizing non-meeting documents; audio-to-text transcription itself (a capability, not a method).

## Required inputs
- Source: transcript, notes, or chat log as text. If only audio exists and no transcription capability is verified, request a transcript as the single minimal user action.
- Optional metadata: title, date/time, attendees, agenda, previous minutes. Missing metadata is recorded as `unknown`. Ask only when it blocks a required field (e.g., converting relative dates).

## Procedure
1. Assess the source: speaker labels, timestamps, gaps, inaudible parts.
2. Map content to agenda items. If no agenda exists, derive topics and mark them as derived.
3. Label every extracted item as exactly one of: Decision, Action, Discussion, Open question, Information.
4. Attach a source reference (timestamp, speaker + turn, or line) to every Decision and Action.
5. Fill `templates/MEETING_MINUTES.md`.
6. Run the validation gate and record PASS / FAIL / Not Checked.
7. Keep status `Draft` until a human confirms; then `Confirmed`.

## Quality rules
- Fidelity over fluency: never add a decision, owner, date, number, or commitment that is not in the source.
- Decision threshold: record a Decision only when the source shows explicit agreement or an authorized person's conclusion. Tentative language ("let's consider", "검토해보자", "~하면 좋겠다") is Discussion or Open question.
- Every Action has: verb-first action, owner, due date, source ref. A missing owner or due date is written `TBD` and listed in Open questions, never guessed.
- Attribute speakers only when the source identifies them. Do not map diarization labels (Speaker 1) to names without evidence.
- Re-check names, numbers, amounts, dates, and product/system names against the source verbatim. Convert relative dates only when the meeting date is known, and keep the original phrase alongside.
- Flag conflicting statements; do not resolve them as the writer.
- Mark inaudible parts or likely transcription errors as `[unclear]` / `[확인 필요]`.
- Summary of 5 lines or fewer; no transcript reproduction; one idea per bullet.
- Every agenda item appears, or is marked "not discussed".
- Report previous action-item status only when previous minutes are provided.
- Write in the requester's language; keep original proper nouns and technical terms.

## Confidentiality
- Apply this method inside the authorized company environment. Never copy minutes, transcripts, attendee names, or meeting content into Dex Company.
- Minimize personal data. Exclude remarks marked off-the-record.
- Carry the source's sensitivity label if one exists; otherwise mark `unclassified — confirm before sharing`.

## Human review
Required before: sending or posting minutes to anyone; creating tasks or calendar events in shared systems; finalizing minutes that record legal, contractual, HR, financial, or other irreversible decisions. Use `skills/human-review`.

## Validation gate
| ID | Check | PASS condition |
|---|---|---|
| G1 | Source trace | Every Decision and Action has a source reference |
| G2 | No fabrication | No owner, date, number, or commitment absent from the source |
| G3 | Labeling | No tentative language recorded as a Decision |
| G4 | Action completeness | Every Action has action, owner, due, ref — or TBD listed in Open questions |
| G5 | Verbatim facts | Names, numbers, and dates re-checked against the source |
| G6 | Coverage | Every agenda item present or marked not discussed |
| G7 | Uncertainty | Unclear and conflicting parts flagged |
| G8 | Confidentiality | Sensitivity label set; no distribution without approval |

A check not executed is Not Checked, never PASS. Promote recurring failures per `skills/validation-gates`.
